import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import {
  clubEvents,
  type ClubEvent,
  type ClubEventLink,
  type ClubEventSponsor,
  type ClubEventTimelineStop,
  type ClubLocation,
  calendarYears,
  type ClubLocation as ClubLocationType,
} from "@/content/calendarData";
import { galleryMediaByPage, type GalleryMediaImage, type GalleryMediaSection } from "@/content/galleryMedia";
import { itineraryGuide, type ClubItinerary, type ItineraryProfile, type LocalizedText } from "@/content/itineraryGuide";
import { type LanguageCode } from "@/lib/i18n";

export type ClubCmsContentType = "gallery" | "itinerary" | "event";
export type ClubCmsStatus = "draft" | "published" | "scheduled" | "archived";
export type ClubAdminRole = "admin" | "editor" | "viewer";

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
  scheduled_for: string | null;
  published_at: string | null;
  deleted_at: string | null;
  deleted_by_email: string | null;
  payload: Record<string, any>;
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

export type ClubPageViewRow = {
  id: string;
  pathname: string;
  referrer: string | null;
  locale: string | null;
  page_title: string | null;
  user_agent: string | null;
  created_at: string;
};

export type ClubAdminRoleRow = {
  user_id: string;
  role: ClubAdminRole;
  display_name: string | null;
  created_at: string;
  updated_at: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || "");
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET?.trim() || "club-media";
const CLUB_ENTRIES_TABLE = "club_admin_entries";
const CLUB_PHOTO_FEEDBACK_TABLE = "gallery_photo_feedback";
const CLUB_PAGE_VIEWS_TABLE = "club_page_views";
const CLUB_USER_ROLES_TABLE = "club_admin_user_roles";

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

const toEventTimeline = (value: unknown): ClubEventTimelineStop[] =>
  Array.isArray(value)
    ? value
        .map((item) => {
          const raw = typeof item === "object" && item !== null ? (item as Record<string, unknown>) : {};
          const time = typeof raw.time === "string" ? raw.time.trim() : "";
          const title = typeof raw.title === "string" ? raw.title.trim() : "";
          const note = typeof raw.note === "string" ? raw.note.trim() : "";
          if (!time && !title) return null;
          return { time, title: title || time, note: note || undefined };
        })
        .filter(Boolean) as ClubEventTimelineStop[]
    : [];

const toEventLinks = (value: unknown): ClubEventLink | undefined => {
  const raw = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  const label = typeof raw.label === "string" ? raw.label.trim() : "";
  const href = typeof raw.href === "string" ? raw.href.trim() : "";
  return label && href ? { label, href } : undefined;
};

const toEventSponsors = (value: unknown): ClubEventSponsor[] =>
  Array.isArray(value)
    ? value
        .map((item) => {
          const raw = typeof item === "object" && item !== null ? (item as Record<string, unknown>) : {};
          const name = typeof raw.name === "string" ? raw.name.trim() : "";
          const href = typeof raw.href === "string" ? raw.href.trim() : "";
          if (!name) return null;
          return { name, href: href || undefined };
        })
        .filter(Boolean) as ClubEventSponsor[]
    : [];

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
    briefing: typeof payload.briefing === "string" && payload.briefing ? payload.briefing : undefined,
    notes: toStringArray(payload.notes),
    highlights: toStringArray(payload.highlights),
    checklist: toStringArray(payload.checklist),
    timeline: toEventTimeline(payload.timeline),
    source: toLocation(payload.source, "Andorra la Vella"),
    destination: payload.destination ? toLocation(payload.destination, "Andorra la Vella") : undefined,
    meetingPoint: typeof payload.meetingPoint === "string" && payload.meetingPoint ? payload.meetingPoint : undefined,
    meetingTime: typeof payload.meetingTime === "string" && payload.meetingTime ? payload.meetingTime : undefined,
    galleryHref: typeof payload.galleryHref === "string" && payload.galleryHref ? payload.galleryHref : (entry.collection_key ? galleryHrefByCollectionKey[entry.collection_key] : undefined),
    legacyHref: typeof payload.legacyHref === "string" && payload.legacyHref ? payload.legacyHref : undefined,
    roadbook: toEventLinks(payload.roadbook),
    callToAction: toEventLinks(payload.callToAction),
    sponsors: toEventSponsors(payload.sponsors),
    heroImage: typeof payload.heroImage === "string" && payload.heroImage ? payload.heroImage : entry.cover_image_url || undefined,
    evidence,
    featured: Boolean(payload.featured),
  };
};

const uniqueByKey = <T,>(items: T[], getKey: (item: T) => string) => {
  const map = new Map<string, T>();
  items.forEach((item) => map.set(getKey(item), item));
  return Array.from(map.values());
};

const roleRank: Record<ClubAdminRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
};

export const roleLabel: Record<ClubAdminRole, string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

export const canRole = (currentRole: ClubAdminRole | null | undefined, requiredRole: ClubAdminRole) => {
  if (!currentRole) return false;
  return roleRank[currentRole] >= roleRank[requiredRole];
};

const isEntryLive = (entry: ClubAdminEntryRow) => {
  if (entry.deleted_at) return false;
  if (entry.status === "published") return true;
  if (entry.status === "scheduled") {
    if (!entry.scheduled_for) return false;
    return new Date(entry.scheduled_for).getTime() <= Date.now();
  }
  return false;
};

export const mergeRoutes = (staticRoutes: ClubItinerary[], dynamicRoutes: ClubItinerary[]) =>
  uniqueByKey([...staticRoutes, ...dynamicRoutes], (item) => item.id);

export const mergeEvents = (staticEvents: ClubEvent[], dynamicEvents: ClubEvent[]) =>
  uniqueByKey([...staticEvents, ...dynamicEvents], (item) => item.id).sort((a, b) => (a.start ?? "9999").localeCompare(b.start ?? "9999"));

export const mergeGallerySections = (staticSections: GalleryMediaSection[], dynamicSections: GalleryMediaSection[]) => [...staticSections, ...dynamicSections];

const fetchEntries = async (
  contentType?: ClubCmsContentType,
  filters?: { status?: ClubCmsStatus; statuses?: ClubCmsStatus[]; collectionKey?: string; includeDeleted?: boolean },
) => {
  const client = getSupabaseClient();
  if (!client) return [] as ClubAdminEntryRow[];

  let query = client
    .from(CLUB_ENTRIES_TABLE)
    .select("id, slug, content_type, status, title, collection_key, year, sort_order, cover_image_url, scheduled_for, published_at, deleted_at, deleted_by_email, payload, created_at, updated_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (contentType) query = query.eq("content_type", contentType);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.statuses?.length) query = query.in("status", filters.statuses);
  if (filters?.collectionKey) query = query.eq("collection_key", filters.collectionKey);
  if (!filters?.includeDeleted) query = query.is("deleted_at", null);

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

export const useClubAdminRole = (userId?: string | null, enabled = true) =>
  useQuery({
    queryKey: ["club-cms-admin-role", userId],
    queryFn: async () => {
      const client = getSupabaseClient();
      if (!client || !userId) return { role: null as ClubAdminRole | null, row: null as ClubAdminRoleRow | null };

      const { data, error } = await client
        .from(CLUB_USER_ROLES_TABLE)
        .select("user_id, role, display_name, created_at, updated_at")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        if (/club_admin_user_roles|schema cache|does not exist/i.test(error.message)) {
          return { role: null as ClubAdminRole | null, row: null as ClubAdminRoleRow | null };
        }
        throw error;
      }

      const row = (data ?? null) as ClubAdminRoleRow | null;
      return { role: row?.role ?? null, row };
    },
    enabled: enabled && clubCmsConfig.enabled && Boolean(userId),
    staleTime: 60_000,
  });

export const useClubAdminEntries = (
  contentType: ClubCmsContentType,
  enabled = true,
  options?: { includeDeleted?: boolean },
) =>
  useQuery({
    queryKey: ["club-cms-admin", contentType, options?.includeDeleted ? "with-deleted" : "active-only"],
    queryFn: () => fetchEntries(contentType, { includeDeleted: options?.includeDeleted }),
    enabled: enabled && clubCmsConfig.enabled,
    staleTime: 15_000,
  });

export const usePublishedGallerySections = (collectionKey: string) => {
  const query = useQuery({
    queryKey: ["club-cms-gallery", collectionKey],
    queryFn: async () => {
      const entries = await fetchEntries("gallery", { statuses: ["published", "scheduled"], collectionKey });
      return entries.filter(isEntryLive).map(mapGalleryEntryToSection).filter(Boolean) as GalleryMediaSection[];
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

export const usePhotoFeedbackOverview = (enabled = true) =>
  useQuery({
    queryKey: ["club-photo-feedback-overview"],
    queryFn: async () => {
      const client = getSupabaseClient();
      if (!client) {
        return {
          total: 0,
          recent: [] as ClubPhotoFeedbackRow[],
          topPhotos: [] as { photo_src: string; reviews: number; averageRating: number }[],
        };
      }

      const { data, error } = await client
        .from(CLUB_PHOTO_FEEDBACK_TABLE)
        .select("id, photo_src, author_name, rating, comment, created_at")
        .order("created_at", { ascending: false })
        .limit(5000);

      if (error) throw error;

      const entries = (data ?? []) as ClubPhotoFeedbackRow[];
      const grouped = new Map<string, { reviews: number; ratingSum: number }>();
      entries.forEach((entry) => {
        const current = grouped.get(entry.photo_src) ?? { reviews: 0, ratingSum: 0 };
        current.reviews += 1;
        current.ratingSum += entry.rating;
        grouped.set(entry.photo_src, current);
      });

      const topPhotos = Array.from(grouped.entries())
        .map(([photo_src, value]) => ({
          photo_src,
          reviews: value.reviews,
          averageRating: value.reviews ? value.ratingSum / value.reviews : 0,
        }))
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 8);

      return {
        total: entries.length,
        recent: entries.slice(0, 10),
        topPhotos,
      };
    },
    enabled: enabled && clubCmsConfig.enabled,
    staleTime: 30_000,
  });

export const usePublishedItineraries = () => {
  const query = useQuery({
    queryKey: ["club-cms-itineraries"],
    queryFn: async () => {
      const entries = await fetchEntries("itinerary", { statuses: ["published", "scheduled"] });
      return entries.filter(isEntryLive).map(mapItineraryEntryToRoute);
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
      const entries = await fetchEntries("event", { statuses: ["published", "scheduled"] });
      return entries.filter(isEntryLive).map(mapEventEntryToClubEvent);
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

const emptyVisitStats = {
  supported: false,
  total: 0,
  last7d: 0,
  last30d: 0,
  uniquePaths: 0,
  topPaths: [] as { pathname: string; visits: number }[],
  topSections: [] as { section: string; visits: number }[],
  topLocales: [] as { locale: string; visits: number }[],
  recent: [] as ClubPageViewRow[],
  daily: [] as { day: string; visits: number }[],
};

export const formatDateTimeLocalInput = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

export const normalizeDateTimeInput = (value?: string | null) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

export const duplicateClubEntryDraft = <T extends { recordId: string; slug: string; title?: string }>(draft: T) => ({
  ...draft,
  recordId: "",
  slug: slugify(`${draft.slug || draft.title || "copia"}-copia`),
});

export const buildCmsPublicPath = (entry: ClubAdminEntryRow) => {
  if (entry.content_type === "gallery") {
    return entry.collection_key ? galleryHrefByCollectionKey[entry.collection_key] ?? "/galeria" : "/galeria";
  }
  if (entry.content_type === "itinerary") return "/itineraris";
  if (entry.content_type === "event") return `/esdeveniments/${entry.slug}`;
  return "/";
};

const EVENT_PREVIEW_STORAGE_KEY = "club-event-preview";

export const buildEventPreviewUrl = (eventId: string) => `/esdeveniments/${eventId}?preview=1`;

export const saveEventPreview = (event: ClubEvent) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EVENT_PREVIEW_STORAGE_KEY, JSON.stringify({ event, savedAt: Date.now() }));
};

export const loadEventPreview = (eventId: string) => {
  if (typeof window === "undefined") return null as ClubEvent | null;
  const raw = window.localStorage.getItem(EVENT_PREVIEW_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { event?: ClubEvent };
    return parsed?.event?.id === eventId ? parsed.event : null;
  } catch {
    return null;
  }
};

const getSectionFromPath = (pathname: string) => {
  if (!pathname || pathname === "/") return "home";
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "altres";
  return firstSegment;
};

const summarizePageViews = (entries: ClubPageViewRow[]) => {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const perPath = new Map<string, number>();
  const perDay = new Map<string, number>();
  const perSection = new Map<string, number>();
  const perLocale = new Map<string, number>();

  let last7d = 0;
  let last30d = 0;

  entries.forEach((entry) => {
    const createdAt = new Date(entry.created_at).getTime();
    if (Number.isFinite(createdAt)) {
      if (createdAt >= sevenDaysAgo) last7d += 1;
      if (createdAt >= thirtyDaysAgo) last30d += 1;
      const day = new Date(createdAt).toISOString().slice(0, 10);
      perDay.set(day, (perDay.get(day) ?? 0) + 1);
    }

    perPath.set(entry.pathname, (perPath.get(entry.pathname) ?? 0) + 1);
    const section = getSectionFromPath(entry.pathname);
    perSection.set(section, (perSection.get(section) ?? 0) + 1);
    const locale = entry.locale?.trim() || "unknown";
    perLocale.set(locale, (perLocale.get(locale) ?? 0) + 1);
  });

  const topPaths = Array.from(perPath.entries())
    .map(([pathname, visits]) => ({ pathname, visits }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 6);

  const topSections = Array.from(perSection.entries())
    .map(([section, visits]) => ({ section, visits }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 6);

  const topLocales = Array.from(perLocale.entries())
    .map(([locale, visits]) => ({ locale, visits }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 6);

  const daily = Array.from(perDay.entries())
    .map(([day, visits]) => ({ day, visits }))
    .sort((a, b) => a.day.localeCompare(b.day))
    .slice(-14);

  return {
    supported: true,
    total: entries.length,
    last7d,
    last30d,
    uniquePaths: perPath.size,
    topPaths,
    topSections,
    topLocales,
    recent: entries.slice(0, 8),
    daily,
  };
};

export const useClubVisitStats = (enabled = true) =>
  useQuery({
    queryKey: ["club-cms-page-views"],
    queryFn: async () => {
      const client = getSupabaseClient();
      if (!client) return emptyVisitStats;

      const { data, error } = await client
        .from(CLUB_PAGE_VIEWS_TABLE)
        .select("id, pathname, referrer, locale, page_title, user_agent, created_at")
        .order("created_at", { ascending: false })
        .limit(5000);

      if (error) {
        if (/club_page_views|schema cache|does not exist/i.test(error.message)) {
          return emptyVisitStats;
        }
        throw error;
      }

      return summarizePageViews((data ?? []) as ClubPageViewRow[]);
    },
    enabled: enabled && clubCmsConfig.enabled,
    staleTime: 60_000,
  });

export const trackClubVisit = async (input: {
  pathname: string;
  referrer?: string | null;
  locale?: string | null;
  pageTitle?: string | null;
  userAgent?: string | null;
}) => {
  const client = getSupabaseClient();
  if (!client || !input.pathname || typeof window === "undefined") return;

  const dedupeKey = `club-page-view:${input.pathname}`;
  if (window.sessionStorage.getItem(dedupeKey)) return;

  const { error } = await client.from(CLUB_PAGE_VIEWS_TABLE).insert({
    pathname: input.pathname,
    referrer: input.referrer ?? null,
    locale: input.locale ?? null,
    page_title: input.pageTitle ?? null,
    user_agent: input.userAgent ?? null,
  });

  if (error) {
    if (/club_page_views|schema cache|does not exist/i.test(error.message)) return;
    throw error;
  }

  window.sessionStorage.setItem(dedupeKey, String(Date.now()));
};

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
  scheduledFor?: string | null;
  publishedAt?: string | null;
  payload: Record<string, unknown>;
}) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");

  const normalizedScheduledFor = input.status === "scheduled" ? normalizeDateTimeInput(input.scheduledFor) : null;
  const normalizedPublishedAt = input.status === "published"
    ? normalizeDateTimeInput(input.publishedAt) ?? new Date().toISOString()
    : input.status === "scheduled"
      ? null
      : normalizeDateTimeInput(input.publishedAt);

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
    scheduled_for: normalizedScheduledFor,
    published_at: normalizedPublishedAt,
    payload: input.payload,
  };

  const { data, error } = await client.from(CLUB_ENTRIES_TABLE).upsert(record).select().single();
  if (error) throw error;
  return data as ClubAdminEntryRow;
};

export const trashClubEntry = async (id: string, deletedByEmail?: string | null) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");
  const { error } = await client
    .from(CLUB_ENTRIES_TABLE)
    .update({ deleted_at: new Date().toISOString(), deleted_by_email: deletedByEmail ?? null })
    .eq("id", id);
  if (error) throw error;
};

export const restoreClubEntry = async (id: string) => {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured");
  const { error } = await client
    .from(CLUB_ENTRIES_TABLE)
    .update({ deleted_at: null, deleted_by_email: null })
    .eq("id", id);
  if (error) throw error;
};

export const hardDeleteClubEntry = async (id: string) => {
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
