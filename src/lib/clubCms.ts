import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { clubEvents, type ClubEvent, type ClubLocation, calendarYears, type ClubLocation as ClubLocationType } from "@/content/calendarData";
import { galleryMediaByPage, type GalleryMediaImage, type GalleryMediaSection } from "@/content/galleryMedia";
import { itineraryGuide, type ClubItinerary, type ItineraryProfile, type LocalizedText } from "@/content/itineraryGuide";
import { type LanguageCode } from "@/lib/i18n";

export type ClubCmsContentType = "gallery" | "itinerary" | "event";
export type ClubCmsStatus = "draft" | "published";

export type ClubAdminEntryRow = {
  id: string;
  slug: string;
  content_type: ClubCmsContentType;
  status: ClubCmsStatus;
  title: string;
  collection_key: string | null;
  year: number | null;
  sort_order: number;
  cover_image_url: string | null;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type ClubPhotoFeedbackRow = {
  id: string;
  photo_src: string;
  author_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || "");
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET?.trim() || "club-media";
const CLUB_ENTRIES_TABLE = "club_admin_entries";
const CLUB_PHOTO_FEEDBACK_TABLE = "gallery_photo_feedback";

export const galleryCollectionOptions = [
  { key: "historiques", href: "/galeria/historiques", label: "Històriques" },
  { key: "historiques_2011_2012", href: "/galeria/historiques/2011-2012", label: "Històriques 2011-2012" },
  { key: "historiques_2013_2015", href: "/galeria/historiques/2013-2015", label: "Històriques 2013-2015" },
  { key: "historiques_2016_2021", href: "/galeria/historiques/2016-2021", label: "Històriques 2016-2021" },
  { key: "historiques_2022", href: "/galeria/historiques/2022", label: "Històriques 2022" },
  { key: "sortides_2024", href: "/galeria/sortides/2024", label: "Sortides 2024" },
  { key: "sortides_2025", href: "/galeria/sortides/2025", label: "Sortides 2025" },
  { key: "sortides_2026", href: "/galeria/sortides/2026", label: "Sortides 2026" },
] as const;

export const galleryHrefByCollectionKey = Object.fromEntries(galleryCollectionOptions.map((item) => [item.key, item.href])) as Record<string, string>;
export const collectionKeyByGalleryHref = Object.fromEntries(galleryCollectionOptions.map((item) => [item.href, item.key])) as Record<string, string>;

let supabaseClient: SupabaseClient | null = null;

const localizedLanguages: LanguageCode[] = ["ca", "es", "fr", "en", "pt", "de", "ru"];

const defaultLocation: ClubLocationType = {
  name: "Andorra la Vella",
  lat: 42.5063,
  lon: 1.5218,
  timezone: "Europe/Andorra",
};

export const clubCmsConfig = {
  enabled: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  bucket: SUPABASE_BUCKET,
  table: CLUB_ENTRIES_TABLE,
};

export const isClubCmsEnabled = () => clubCmsConfig.enabled;

export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `entry-${Date.now()}`;

export const getSupabaseClient = () => {
  if (!clubCmsConfig.enabled) return null;
  if (!supabaseClient) {
    supabaseClient = createClient(clubCmsConfig.url, clubCmsConfig.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseClient;
};

const toLocalizedText = (value: unknown, fallback = "") => {
  if (typeof value === "object" && value !== null) {
    const record = value as Partial<Record<LanguageCode, string>>;
    return localizedLanguages.reduce((acc, language) => {
      acc[language] = record[language] || record.ca || record.es || fallback;
      return acc;
    }, {} as LocalizedText);
  }

  const text = typeof value === "string" ? value : fallback;
  return localizedLanguages.reduce((acc, language) => {
    acc[language] = text;
    return acc;
  }, {} as LocalizedText);
};

const toStringArray = (value: unknown) => (Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : []);
const toLocalizedArray = (value: unknown) => toStringArray(value).map((item) => toLocalizedText(item, item));

const toLocation = (value: unknown, fallbackName: string): ClubLocation => {
  const raw = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  return {
    name: typeof raw.name === "string" && raw.name ? raw.name : fallbackName,
    label: typeof raw.label === "string" && raw.label ? raw.label : undefined,
    lat: typeof raw.lat === "number" ? raw.lat : defaultLocation.lat,
    lon: typeof raw.lon === "number" ? raw.lon : defaultLocation.lon,
    timezone: typeof raw.timezone === "string" && raw.timezone ? raw.timezone : defaultLocation.timezone,
  };
};

const normalizeGalleryImage = (image: unknown, index: number): GalleryMediaImage | null => {
  const raw = typeof image === "object" && image !== null ? (image as Record<string, unknown>) : {};
  const src = typeof raw.src === "string" ? raw.src.trim() : "";
  if (!src) return null;
  return {
    src,
    alt: typeof raw.alt === "string" && raw.alt.trim() ? raw.alt.trim() : `Image ${index + 1}`,
    filename: typeof raw.filename === "string" && raw.filename.trim() ? raw.filename.trim() : src.split("/").pop() || `image-${index + 1}.jpg`,
  };
};

export const mapGalleryEntryToSection = (entry: ClubAdminEntryRow): GalleryMediaSection | null => {
  const images = Array.isArray(entry.payload.images)
    ? entry.payload.images.map((image, index) => normalizeGalleryImage(image, index)).filter(Boolean) as GalleryMediaImage[]
    : [];

  if (!images.length) return null;

  return {
    title: entry.title,
    sourceFolder: typeof entry.payload.sourceFolder === "string" ? entry.payload.sourceFolder : "",
    note: typeof entry.payload.note === "string" && entry.payload.note ? entry.payload.note : undefined,
    images,
  };
};

export const mapItineraryEntryToRoute = (entry: ClubAdminEntryRow): ClubItinerary => {
  const payload = entry.payload;
  const image = typeof payload.image === "object" && payload.image !== null ? (payload.image as Record<string, unknown>) : {};
  const profile = payload.profile === "car" || payload.profile === "motorcycle" || payload.profile === "both" ? (payload.profile as ItineraryProfile) : "both";

  return {
    id: entry.slug,
    profile,
    title: toLocalizedText(entry.title, entry.title),
    strapline: toLocalizedText(payload.strapline, ""),
    rhythm: toLocalizedText(payload.rhythm, profile === "motorcycle" ? "Dynamic" : "Touring"),
    duration: typeof payload.duration === "string" ? payload.duration : "",
    distance: typeof payload.distance === "string" ? payload.distance : "",
    bestSeason: toLocalizedText(payload.bestSeason, ""),
    start: typeof payload.start === "string" ? payload.start : "",
    finish: typeof payload.finish === "string" ? payload.finish : "",
    waypoints: toStringArray(payload.waypoints),
    clubRecommended: Boolean(payload.clubRecommended),
    clubRecommendation: payload.clubRecommendation ? toLocalizedText(payload.clubRecommendation, "") : undefined,
    image: {
      src: typeof image.src === "string" ? image.src : entry.cover_image_url || "",
      alt: toLocalizedText(image.alt, entry.title),
      creditName: typeof image.creditName === "string" ? image.creditName : "BMW Club Andorra",
      creditHref: typeof image.creditHref === "string" ? image.creditHref : "",
      licenseLabel: typeof image.licenseLabel === "string" ? image.licenseLabel : "Fitxer club",
      licenseHref: typeof image.licenseHref === "string" ? image.licenseHref : "",
    },
    highlights: toLocalizedArray(payload.highlights),
    bmwAngle: toLocalizedText(payload.bmwAngle, ""),
    notes: toLocalizedArray(payload.notes),
  };
};

export const mapEventEntryToClubEvent = (entry: ClubAdminEntryRow): ClubEvent => {
  const payload = entry.payload;
  const category = ["sortida", "esmorzar", "cars-coffee", "rally", "viatge", "sopar", "historica"].includes(String(payload.category))
    ? (payload.category as ClubEvent["category"])
    : "sortida";
  const evidence = ["original-site", "gallery-title", "media-inferred", "mixed"].includes(String(payload.evidence))
    ? (payload.evidence as ClubEvent["evidence"])
    : "mixed";

  return {
    id: entry.slug,
    year: typeof entry.year === "number" ? entry.year : Number(payload.year || new Date().getFullYear()),
    title: entry.title,
    start: typeof payload.start === "string" && payload.start ? payload.start : undefined,
    end: typeof payload.end === "string" && payload.end ? payload.end : undefined,
    displayDate: typeof payload.displayDate === "string" ? payload.displayDate : "",
    category,
    summary: typeof payload.summary === "string" && payload.summary ? payload.summary : undefined,
    notes: toStringArray(payload.notes),
    source: toLocation(payload.source, "Andorra la Vella"),
    destination: payload.destination ? toLocation(payload.destination, "Andorra la Vella") : undefined,
    galleryHref: typeof payload.galleryHref === "string" && payload.galleryHref ? payload.galleryHref : (entry.collection_key ? galleryHrefByCollectionKey[entry.collection_key] : undefined),
    legacyHref: typeof payload.legacyHref === "string" && payload.legacyHref ? payload.legacyHref : undefined,
    evidence,
    featured: Boolean(payload.featured),
  };
};

const uniqueByKey = <T,>(items: T[], getKey: (item: T) => string) => {
  const map = new Map<string, T>();
  items.forEach((item) => map.set(getKey(item), item));
  return Array.from(map.values());
};

export const mergeRoutes = (staticRoutes: ClubItinerary[], dynamicRoutes: ClubItinerary[]) =>
  uniqueByKey([...staticRoutes, ...dynamicRoutes], (item) => item.id);

export const mergeEvents = (staticEvents: ClubEvent[], dynamicEvents: ClubEvent[]) =>
  uniqueByKey([...staticEvents, ...dynamicEvents], (item) => item.id).sort((a, b) => (a.start ?? "9999").localeCompare(b.start ?? "9999"));

export const mergeGallerySections = (staticSections: GalleryMediaSection[], dynamicSections: GalleryMediaSection[]) => [...staticSections, ...dynamicSections];

const fetchEntries = async (contentType?: ClubCmsContentType, filters?: { status?: ClubCmsStatus; collectionKey?: string }) => {
  const client = getSupabaseClient();
  if (!client) return [] as ClubAdminEntryRow[];

  let query = client
    .from(CLUB_ENTRIES_TABLE)
    .select("id, slug, content_type, status, title, collection_key, year, sort_order, cover_image_url, payload, created_at, updated_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (contentType) query = query.eq("content_type", contentType);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.collectionKey) query = query.eq("collection_key", filters.collectionKey);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as ClubAdminEntryRow[];
};

export const useCmsSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!clubCmsConfig.enabled);

  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      setReady(true);
      return;
    }

    let mounted = true;
    client.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setReady(true);
    });

    const { data: subscription } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setReady(true);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { session, ready, client: getSupabaseClient() };
};

export const useClubAdminEntries = (contentType: ClubCmsContentType, enabled = true) =>
  useQuery({
    queryKey: ["club-cms-admin", contentType],
    queryFn: () => fetchEntries(contentType),
    enabled: enabled && clubCmsConfig.enabled,
    staleTime: 15_000,
  });

export const usePublishedGallerySections = (collectionKey: string) => {
  const query = useQuery({
    queryKey: ["club-cms-gallery", collectionKey],
    queryFn: async () => {
      const entries = await fetchEntries("gallery", { status: "published", collectionKey });
      return entries.map(mapGalleryEntryToSection).filter(Boolean) as GalleryMediaSection[];
    },
    enabled: clubCmsConfig.enabled && Boolean(collectionKey),
    staleTime: 60_000,
  });

  return { ...query, data: query.data ?? [] };
};

export const usePhotoFeedback = (photoSrc: string, enabled = true) => {
  const query = useQuery({
    queryKey: ["club-photo-feedback", photoSrc],
    queryFn: async () => {
      const client = getSupabaseClient();
      if (!client) return [] as ClubPhotoFeedbackRow[];

      const { data, error } = await client
        .from(CLUB_PHOTO_FEEDBACK_TABLE)
        .select("id, photo_src, author_name, rating, comment, created_at")
        .eq("photo_src", photoSrc)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as ClubPhotoFeedbackRow[];
    },
    enabled: clubCmsConfig.enabled && enabled && Boolean(photoSrc),
    staleTime: 15_000,
  });

  const entries = query.data ?? [];
  const averageRating = entries.length ? entries.reduce((acc, item) => acc + item.rating, 0) / entries.length : 0;

  return {
    ...query,
    data: entries,
    totalRatings: entries.length,
    averageRating,
  };
};

export const usePublishedItineraries = () => {
  const query = useQuery({
    queryKey: ["club-cms-itineraries"],
    queryFn: async () => {
      const entries = await fetchEntries("itinerary", { status: "published" });
      return entries.map(mapItineraryEntryToRoute);
    },
    enabled: clubCmsConfig.enabled,
    staleTime: 60_000,
  });

  return { ...query, data: query.data ?? [] };
};

export const usePublishedEvents = () => {
  const query = useQuery({
    queryKey: ["club-cms-events"],
    queryFn: async () => {
      const entries = await fetchEntries("event", { status: "published" });
      return entries.map(mapEventEntryToClubEvent);
    },
    enabled: clubCmsConfig.enabled,
    staleTime: 60_000,
  });

  return { ...query, data: query.data ?? [] };
};

export const useMergedItineraries = () => {
  const { data: dynamicRoutes, ...query } = usePublishedItineraries();
  return { ...query, data: useMemo(() => mergeRoutes(itineraryGuide, dynamicRoutes), [dynamicRoutes]) };
};

export const useMergedEvents = () => {
  const { data: dynamicEvents, ...query } = usePublishedEvents();
  return { ...query, data: useMemo(() => mergeEvents(clubEvents, dynamicEvents), [dynamicEvents]) };
};

export const getCalendarYearsFromEvents = (events: ClubEvent[]) => Array.from(new Set(events.map((event) => event.year))).sort((a, b) => b - a);
export const fallbackCalendarYears = Array.from(calendarYears);

export const uploadClubMedia = async (file: File, path: string) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");

  const { error } = await client.storage.from(clubCmsConfig.bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });

  if (error) throw error;

  const { data } = client.storage.from(clubCmsConfig.bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const savePhotoFeedback = async (input: {
  photoSrc: string;
  authorName?: string;
  rating: number;
  comment?: string;
}) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");

  const rating = Math.max(1, Math.min(5, Math.round(input.rating)));
  const authorName = input.authorName?.trim() || "Anònim";
  const comment = input.comment?.trim() || null;

  const { data, error } = await client
    .from(CLUB_PHOTO_FEEDBACK_TABLE)
    .insert({
      photo_src: input.photoSrc,
      author_name: authorName,
      rating,
      comment,
    })
    .select("id, photo_src, author_name, rating, comment, created_at")
    .single();

  if (error) throw error;
  return data as ClubPhotoFeedbackRow;
};

export const saveClubEntry = async (input: {
  id?: string;
  slug: string;
  contentType: ClubCmsContentType;
  status: ClubCmsStatus;
  title: string;
  collectionKey?: string | null;
  year?: number | null;
  sortOrder?: number;
  coverImageUrl?: string | null;
  payload: Record<string, unknown>;
}) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");

  const record = {
    id: input.id,
    slug: input.slug,
    content_type: input.contentType,
    status: input.status,
    title: input.title,
    collection_key: input.collectionKey ?? null,
    year: input.year ?? null,
    sort_order: input.sortOrder ?? 0,
    cover_image_url: input.coverImageUrl ?? null,
    payload: input.payload,
  };

  const { data, error } = await client.from(CLUB_ENTRIES_TABLE).upsert(record).select().single();
  if (error) throw error;
  return data as ClubAdminEntryRow;
};

export const deleteClubEntry = async (id: string) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");
  const { error } = await client.from(CLUB_ENTRIES_TABLE).delete().eq("id", id);
  if (error) throw error;
};

export const signInClubAdmin = async (email: string, password: string) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const signOutClubAdmin = async () => {
  const client = getSupabaseClient();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) throw error;
};
