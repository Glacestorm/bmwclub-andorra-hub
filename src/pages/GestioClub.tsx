import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CalendarRange,
  Copy,
  Database,
  ExternalLink,
  FolderOpen,
  Globe,
  HardDrive,
  Images,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MapPinned,
  Plus,
  RefreshCw,
  Rocket,
  Save,
  ShieldCheck,
  Trash2,
  UploadCloud,
  WandSparkles,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clubEvents, type ClubEvent } from "@/content/calendarData";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { itineraryGuide } from "@/content/itineraryGuide";
import {
  buildCmsPublicPath,
  buildEventPreviewUrl,
  canRole,
  clubCmsConfig,
  collectionKeyByGalleryHref,
  duplicateClubEntryDraft,
  formatDateTimeLocalInput,
  galleryCollectionOptions,
  galleryHrefByCollectionKey,
  hardDeleteClubEntry,
  restoreClubEntry,
  roleLabel,
  saveClubEntry,
  saveEventPreview,
  signInClubAdmin,
  signOutClubAdmin,
  slugify,
  trashClubEntry,
  uploadClubMedia,
  useClubAdminEntries,
  useClubAdminRole,
  useCmsSession,
  useClubVisitStats,
  usePhotoFeedbackOverview,
} from "@/lib/clubCms";

const defaultGalleryDraft = () => ({
  recordId: "",
  slug: "",
  status: "published" as const,
  sortOrder: 0,
  scheduledFor: "",
  publishedAt: "",
  collectionKey: "sortides_2026",
  title: "Nova col·lecció",
  sourceFolder: "sortides/2026",
  note: "",
  images: [] as { src: string; alt: string; filename: string }[],
});

const defaultItineraryDraft = () => ({
  recordId: "",
  slug: "nova-ruta-club",
  status: "published" as const,
  sortOrder: 0,
  scheduledFor: "",
  publishedAt: "",
  title: "Nova ruta premium del club",
  profile: "both" as const,
  strapline: "Ruta pensada per conduir, parar bé i fotografiar els cotxes.",
  rhythm: "Touring",
  duration: "3 h",
  distance: "65 km",
  bestSeason: "Primavera i tardor",
  start: "Andorra la Vella",
  finish: "Ordino",
  waypointsText: "Andorra la Vella, Escaldes, Canillo, Ordino",
  highlightsText: "Miradors nets\nRitme molt fluid\nParades premium per al club",
  bmwAngle: "Perfecta per a una sortida oficial amb molt bon ADN BMW.",
  notesText: "Comprovar meteo\nEvitar neu acumulada\nBon punt per esmorzar",
  clubRecommended: true,
  clubRecommendation: "Molt bona candidata per a una sortida oficial del club.",
  imageSrc: "",
  imageAlt: "",
  creditName: "BMW Club Andorra",
  creditHref: "",
  licenseLabel: "Fitxer del club",
  licenseHref: "",
});

const defaultEventDraft = () => ({
  recordId: "",
  slug: "nova-sortida-2026",
  status: "published" as const,
  sortOrder: 0,
  scheduledFor: "",
  publishedAt: "",
  year: 2026,
  title: "Nova sortida BMW Club Andorra",
  category: "sortida",
  start: "2026-09-20T09:00:00+02:00",
  end: "2026-09-20T15:00:00+02:00",
  displayDate: "20/09/2026",
  sourceName: "Andorra la Vella",
  sourceLabel: "",
  sourceLat: "42.5063",
  sourceLon: "1.5218",
  sourceTimezone: "Europe/Andorra",
  destinationName: "Ordino",
  destinationLabel: "",
  destinationLat: "42.5562",
  destinationLon: "1.5332",
  destinationTimezone: "Europe/Andorra",
  galleryHref: "/galeria/sortides/2026",
  summary: "Sortida oficial del club amb parada per esmorzar i fotografia.",
  briefing: "Briefing premium de la sortida amb to, ritme i punts clau.",
  meetingPoint: "Parking principal Andorra la Vella",
  meetingTime: "08:30",
  highlightsText: "Ruta panoràmica\nParada gastronòmica\nFoto oficial del club",
  checklistText: "Confirmar meteo\nCompartir punt de trobada\nRevisar galeria i roadbook",
  timelineText: "08:30 | Trobada | Parking principal\n09:00 | Briefing | Distribució de cotxes i ràdios\n10:30 | Coffee stop | Parada curta i fotos\n13:30 | Dinar | Restaurant partner",
  sponsorsText: "BMW Andorra|https://bmwclubandorra.com\nPartner local",
  roadbookLabel: "Descarregar roadbook",
  roadbookHref: "",
  ctaLabel: "Reserva la teva plaça",
  ctaHref: "",
  heroImage: "",
  notesText: "",
  evidence: "mixed",
  featured: true,
});

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const parseTimelineLines = (value: string) =>
  splitLines(value)
    .map((line) => {
      const [time = "", title = "", ...rest] = line.split("|").map((item) => item.trim());
      if (!time && !title) return null;
      return { time, title: title || time, note: rest.join(" | ") || undefined };
    })
    .filter(Boolean) as { time: string; title: string; note?: string }[];

const parseSponsorsLines = (value: string) =>
  splitLines(value)
    .map((line) => {
      const [name = "", href = ""] = line.split("|").map((item) => item.trim());
      if (!name) return null;
      return { name, href: href || undefined };
    })
    .filter(Boolean) as { name: string; href?: string }[];

const galleryEntryToDraft = (entry: any) => ({
  recordId: entry.id,
  slug: entry.slug,
  status: entry.status,
  sortOrder: entry.sort_order ?? 0,
  scheduledFor: formatDateTimeLocalInput(entry.scheduled_for),
  publishedAt: formatDateTimeLocalInput(entry.published_at),
  collectionKey: entry.collection_key || "sortides_2026",
  title: entry.title,
  sourceFolder: String(entry.payload?.sourceFolder ?? ""),
  note: String(entry.payload?.note ?? ""),
  images: Array.isArray(entry.payload?.images)
    ? entry.payload.images.map((image: any) => ({ src: String(image?.src ?? ""), alt: String(image?.alt ?? ""), filename: String(image?.filename ?? "") }))
    : [],
});

const itineraryEntryToDraft = (entry: any) => ({
  recordId: entry.id,
  slug: entry.slug,
  status: entry.status,
  sortOrder: entry.sort_order ?? 0,
  scheduledFor: formatDateTimeLocalInput(entry.scheduled_for),
  publishedAt: formatDateTimeLocalInput(entry.published_at),
  title: entry.title,
  profile: entry.payload?.profile ?? "both",
  strapline: String(entry.payload?.strapline ?? ""),
  rhythm: String(entry.payload?.rhythm ?? "Touring"),
  duration: String(entry.payload?.duration ?? ""),
  distance: String(entry.payload?.distance ?? ""),
  bestSeason: String(entry.payload?.bestSeason ?? ""),
  start: String(entry.payload?.start ?? ""),
  finish: String(entry.payload?.finish ?? ""),
  waypointsText: Array.isArray(entry.payload?.waypoints) ? entry.payload.waypoints.join(", ") : "",
  highlightsText: Array.isArray(entry.payload?.highlights) ? entry.payload.highlights.join("\n") : "",
  bmwAngle: String(entry.payload?.bmwAngle ?? ""),
  notesText: Array.isArray(entry.payload?.notes) ? entry.payload.notes.join("\n") : "",
  clubRecommended: Boolean(entry.payload?.clubRecommended),
  clubRecommendation: String(entry.payload?.clubRecommendation ?? ""),
  imageSrc: String(entry.payload?.image?.src ?? entry.cover_image_url ?? ""),
  imageAlt: String(entry.payload?.image?.alt ?? ""),
  creditName: String(entry.payload?.image?.creditName ?? "BMW Club Andorra"),
  creditHref: String(entry.payload?.image?.creditHref ?? ""),
  licenseLabel: String(entry.payload?.image?.licenseLabel ?? "Fitxer del club"),
  licenseHref: String(entry.payload?.image?.licenseHref ?? ""),
});

const eventEntryToDraft = (entry: any) => ({
  recordId: entry.id,
  slug: entry.slug,
  status: entry.status,
  sortOrder: entry.sort_order ?? 0,
  scheduledFor: formatDateTimeLocalInput(entry.scheduled_for),
  publishedAt: formatDateTimeLocalInput(entry.published_at),
  year: Number(entry.year ?? 2026),
  title: entry.title,
  category: String(entry.payload?.category ?? "sortida"),
  start: String(entry.payload?.start ?? ""),
  end: String(entry.payload?.end ?? ""),
  displayDate: String(entry.payload?.displayDate ?? ""),
  sourceName: String(entry.payload?.source?.name ?? "Andorra la Vella"),
  sourceLabel: String(entry.payload?.source?.label ?? ""),
  sourceLat: String(entry.payload?.source?.lat ?? "42.5063"),
  sourceLon: String(entry.payload?.source?.lon ?? "1.5218"),
  sourceTimezone: String(entry.payload?.source?.timezone ?? "Europe/Andorra"),
  destinationName: String(entry.payload?.destination?.name ?? "Ordino"),
  destinationLabel: String(entry.payload?.destination?.label ?? ""),
  destinationLat: String(entry.payload?.destination?.lat ?? "42.5562"),
  destinationLon: String(entry.payload?.destination?.lon ?? "1.5332"),
  destinationTimezone: String(entry.payload?.destination?.timezone ?? "Europe/Andorra"),
  galleryHref: String(entry.payload?.galleryHref ?? (entry.collection_key ? galleryHrefByCollectionKey[entry.collection_key] ?? "" : "")),
  summary: String(entry.payload?.summary ?? ""),
  briefing: String(entry.payload?.briefing ?? ""),
  meetingPoint: String(entry.payload?.meetingPoint ?? ""),
  meetingTime: String(entry.payload?.meetingTime ?? ""),
  highlightsText: Array.isArray(entry.payload?.highlights) ? entry.payload.highlights.join("\n") : "",
  checklistText: Array.isArray(entry.payload?.checklist) ? entry.payload.checklist.join("\n") : "",
  timelineText: Array.isArray(entry.payload?.timeline)
    ? entry.payload.timeline.map((item: any) => [String(item?.time ?? ""), String(item?.title ?? ""), String(item?.note ?? "")].filter(Boolean).join(" | ")).join("\n")
    : "",
  sponsorsText: Array.isArray(entry.payload?.sponsors)
    ? entry.payload.sponsors.map((item: any) => [String(item?.name ?? ""), String(item?.href ?? "")].filter(Boolean).join("|")).join("\n")
    : "",
  roadbookLabel: String(entry.payload?.roadbook?.label ?? ""),
  roadbookHref: String(entry.payload?.roadbook?.href ?? ""),
  ctaLabel: String(entry.payload?.callToAction?.label ?? ""),
  ctaHref: String(entry.payload?.callToAction?.href ?? ""),
  heroImage: String(entry.payload?.heroImage ?? entry.cover_image_url ?? ""),
  notesText: Array.isArray(entry.payload?.notes) ? entry.payload.notes.join("\n") : "",
  evidence: String(entry.payload?.evidence ?? "mixed"),
  featured: Boolean(entry.payload?.featured),
});

const parseFloatSafe = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const percent = (part: number, total: number) => (total > 0 ? Math.round((part / total) * 100) : 0);

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sense data";
  return new Intl.DateTimeFormat("ca-AD", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatShortDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ca-AD", { day: "2-digit", month: "2-digit" }).format(date);
};

const GestioClub = () => {
  const queryClient = useQueryClient();
  const { client, ready, session } = useCmsSession();
  const [showDeleted, setShowDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const galleryEntries = useClubAdminEntries("gallery", Boolean(session), { includeDeleted: showDeleted });
  const itineraryEntries = useClubAdminEntries("itinerary", Boolean(session), { includeDeleted: showDeleted });
  const eventEntries = useClubAdminEntries("event", Boolean(session), { includeDeleted: showDeleted });
  const roleQuery = useClubAdminRole(session?.user?.id, Boolean(session));
  const visitStatsQuery = useClubVisitStats(Boolean(session));
  const feedbackOverviewQuery = usePhotoFeedbackOverview(Boolean(session));

  const [banner, setBanner] = useState<{ tone: "success" | "danger" | "info"; text: string } | null>(null);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [activeTab, setActiveTab] = useState("cockpit");
  const [galleryDraft, setGalleryDraft] = useState(defaultGalleryDraft());
  const [itineraryDraft, setItineraryDraft] = useState(defaultItineraryDraft());
  const [eventDraft, setEventDraft] = useState(defaultEventDraft());

  const staticPhotoCount = useMemo(() => Object.values(galleryMediaByPage).flat().reduce((acc, section) => acc + section.images.length, 0), []);
  const staticRouteCount = itineraryGuide.length;
  const staticEventCount = clubEvents.length;

  const galleryItems = galleryEntries.data ?? [];
  const itineraryItems = itineraryEntries.data ?? [];
  const eventItems = eventEntries.data ?? [];
  const visitStats = visitStatsQuery.data;
  const feedbackOverview = feedbackOverviewQuery.data;
  const currentRole = roleQuery.data?.role ?? null;
  const roleRow = roleQuery.data?.row ?? null;
  const effectiveRole = currentRole ?? "admin";
  const canEdit = Boolean(session) && canRole(effectiveRole, "editor");
  const canDelete = Boolean(session) && canRole(effectiveRole, "admin");

  useEffect(() => {
    if (!galleryDraft.slug && galleryDraft.title) {
      setGalleryDraft((current) => ({ ...current, slug: slugify(`${current.collectionKey}-${current.title}`) }));
    }
  }, [galleryDraft.slug, galleryDraft.title, galleryDraft.collectionKey]);

  useEffect(() => {
    if (!itineraryDraft.slug && itineraryDraft.title) {
      setItineraryDraft((current) => ({ ...current, slug: slugify(current.title) }));
    }
  }, [itineraryDraft.slug, itineraryDraft.title]);

  useEffect(() => {
    if (!eventDraft.slug && eventDraft.title) {
      setEventDraft((current) => ({ ...current, slug: slugify(current.title) }));
    }
  }, [eventDraft.slug, eventDraft.title]);

  const invalidateCms = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["club-cms-admin"] }),
      queryClient.invalidateQueries({ queryKey: ["club-cms-gallery"] }),
      queryClient.invalidateQueries({ queryKey: ["club-cms-itineraries"] }),
      queryClient.invalidateQueries({ queryKey: ["club-cms-events"] }),
      queryClient.invalidateQueries({ queryKey: ["club-cms-page-views"] }),
    ]);
  };

  const setSuccess = (text: string) => setBanner({ tone: "success", text });
  const setError = (error: unknown, fallback: string) => {
    const message = error instanceof Error ? error.message : fallback;
    setBanner({ tone: "danger", text: message || fallback });
  };

  const requireRole = (requiredRole: "editor" | "admin") => {
    if (!session) {
      setBanner({ tone: "info", text: "Has d'obrir sessió primer." });
      return false;
    }

    if (!canRole(effectiveRole, requiredRole)) {
      setBanner({ tone: "info", text: `Aquesta acció demana rol ${requiredRole}.` });
      return false;
    }

    return true;
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setSuccess(`${label} copiat al porta-retalls.`);
    } catch {
      setBanner({ tone: "info", text: `No s'ha pogut copiar ${label.toLowerCase()} automàticament.` });
    }
  };

  const openExternal = (url: string) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSignIn = async () => {
    if (!authForm.email || !authForm.password) {
      setBanner({ tone: "info", text: "Falta email o contrasenya." });
      return;
    }

    try {
      setBusy(true);
      await signInClubAdmin(authForm.email, authForm.password);
      setSuccess("Sessió d'administrador oberta.");
    } catch (error) {
      setError(error, "No s'ha pogut iniciar sessió.");
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setBusy(true);
      await signOutClubAdmin();
      setSuccess("Sessió tancada.");
    } catch (error) {
      setError(error, "No s'ha pogut tancar sessió.");
    } finally {
      setBusy(false);
    }
  };

  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    if (!client || !session || !canEdit) {
      setBanner({ tone: "info", text: "Has de tenir permisos d'edició abans de pujar fotos." });
      return;
    }

    try {
      setBusy(true);
      const uploaded = [] as { src: string; alt: string; filename: string }[];
      for (const file of Array.from(files)) {
        const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
        const base = file.name.replace(/\.[^.]+$/, "");
        const path = `gallery/${slugify(galleryDraft.collectionKey)}/${Date.now()}-${slugify(base)}.${extension}`;
        const url = await uploadClubMedia(file, path);
        uploaded.push({ src: url, alt: `${galleryDraft.title} - ${base}`, filename: file.name });
      }
      setGalleryDraft((current) => ({ ...current, images: [...current.images, ...uploaded] }));
      setSuccess(`${uploaded.length} fitxer(s) pujats al bucket ${clubCmsConfig.bucket}.`);
    } catch (error) {
      setError(error, "No s'han pogut pujar les fotos.");
    } finally {
      setBusy(false);
    }
  };

  const handleItineraryImageUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!client || !session || !canEdit) {
      setBanner({ tone: "info", text: "Has de tenir permisos d'edició abans de pujar la imatge." });
      return;
    }

    try {
      setBusy(true);
      const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
      const path = `itineraries/${slugify(itineraryDraft.slug || itineraryDraft.title)}/${Date.now()}.${extension}`;
      const url = await uploadClubMedia(file, path);
      setItineraryDraft((current) => ({ ...current, imageSrc: url, imageAlt: current.imageAlt || current.title }));
      setSuccess("Imatge d'itinerari pujada correctament.");
    } catch (error) {
      setError(error, "No s'ha pogut pujar la imatge de l'itinerari.");
    } finally {
      setBusy(false);
    }
  };

  const saveGallery = async () => {
    if (!requireRole("editor")) return;

    try {
      setBusy(true);
      const saved = await saveClubEntry({
        id: galleryDraft.recordId || undefined,
        slug: galleryDraft.slug || slugify(`${galleryDraft.collectionKey}-${galleryDraft.title}`),
        contentType: "gallery",
        status: galleryDraft.status,
        title: galleryDraft.title,
        collectionKey: galleryDraft.collectionKey,
        sortOrder: galleryDraft.sortOrder,
        scheduledFor: galleryDraft.scheduledFor,
        publishedAt: galleryDraft.publishedAt,
        payload: {
          sourceFolder: galleryDraft.sourceFolder,
          note: galleryDraft.note || undefined,
          images: galleryDraft.images,
        },
      });
      setGalleryDraft(galleryEntryToDraft(saved));
      await invalidateCms();
      setSuccess("Col·lecció guardada a Supabase.");
    } catch (error) {
      setError(error, "No s'ha pogut guardar la col·lecció.");
    } finally {
      setBusy(false);
    }
  };

  const saveItinerary = async () => {
    if (!requireRole("editor")) return;

    try {
      setBusy(true);
      const saved = await saveClubEntry({
        id: itineraryDraft.recordId || undefined,
        slug: itineraryDraft.slug || slugify(itineraryDraft.title),
        contentType: "itinerary",
        status: itineraryDraft.status,
        title: itineraryDraft.title,
        sortOrder: itineraryDraft.sortOrder,
        coverImageUrl: itineraryDraft.imageSrc || null,
        scheduledFor: itineraryDraft.scheduledFor,
        publishedAt: itineraryDraft.publishedAt,
        payload: {
          profile: itineraryDraft.profile,
          strapline: itineraryDraft.strapline,
          rhythm: itineraryDraft.rhythm,
          duration: itineraryDraft.duration,
          distance: itineraryDraft.distance,
          bestSeason: itineraryDraft.bestSeason,
          start: itineraryDraft.start,
          finish: itineraryDraft.finish,
          waypoints: itineraryDraft.waypointsText.split(",").map((item) => item.trim()).filter(Boolean),
          highlights: splitLines(itineraryDraft.highlightsText),
          bmwAngle: itineraryDraft.bmwAngle,
          notes: splitLines(itineraryDraft.notesText),
          clubRecommended: itineraryDraft.clubRecommended,
          clubRecommendation: itineraryDraft.clubRecommendation || undefined,
          image: {
            src: itineraryDraft.imageSrc,
            alt: itineraryDraft.imageAlt || itineraryDraft.title,
            creditName: itineraryDraft.creditName,
            creditHref: itineraryDraft.creditHref || undefined,
            licenseLabel: itineraryDraft.licenseLabel,
            licenseHref: itineraryDraft.licenseHref || undefined,
          },
        },
      });
      setItineraryDraft(itineraryEntryToDraft(saved));
      await invalidateCms();
      setSuccess("Itinerari guardat a Supabase.");
    } catch (error) {
      setError(error, "No s'ha pogut guardar l'itinerari.");
    } finally {
      setBusy(false);
    }
  };

  const saveEvent = async () => {
    if (!requireRole("editor")) return;

    try {
      setBusy(true);
      const collectionKey = collectionKeyByGalleryHref[eventDraft.galleryHref] ?? null;
      const saved = await saveClubEntry({
        id: eventDraft.recordId || undefined,
        slug: eventDraft.slug || slugify(eventDraft.title),
        contentType: "event",
        status: eventDraft.status,
        title: eventDraft.title,
        collectionKey,
        year: Number(eventDraft.year),
        sortOrder: eventDraft.sortOrder,
        coverImageUrl: eventDraft.heroImage || null,
        scheduledFor: eventDraft.scheduledFor,
        publishedAt: eventDraft.publishedAt,
        payload: {
          category: eventDraft.category,
          start: eventDraft.start,
          end: eventDraft.end || undefined,
          displayDate: eventDraft.displayDate,
          source: {
            name: eventDraft.sourceName,
            label: eventDraft.sourceLabel || undefined,
            lat: parseFloatSafe(eventDraft.sourceLat, 42.5063),
            lon: parseFloatSafe(eventDraft.sourceLon, 1.5218),
            timezone: eventDraft.sourceTimezone || "Europe/Andorra",
          },
          destination: eventDraft.destinationName
            ? {
                name: eventDraft.destinationName,
                label: eventDraft.destinationLabel || undefined,
                lat: parseFloatSafe(eventDraft.destinationLat, 42.5562),
                lon: parseFloatSafe(eventDraft.destinationLon, 1.5332),
                timezone: eventDraft.destinationTimezone || "Europe/Andorra",
              }
            : undefined,
          galleryHref: eventDraft.galleryHref || undefined,
          summary: eventDraft.summary || undefined,
          briefing: eventDraft.briefing || undefined,
          meetingPoint: eventDraft.meetingPoint || undefined,
          meetingTime: eventDraft.meetingTime || undefined,
          highlights: splitLines(eventDraft.highlightsText),
          checklist: splitLines(eventDraft.checklistText),
          timeline: parseTimelineLines(eventDraft.timelineText),
          sponsors: parseSponsorsLines(eventDraft.sponsorsText),
          roadbook: eventDraft.roadbookLabel && eventDraft.roadbookHref ? { label: eventDraft.roadbookLabel, href: eventDraft.roadbookHref } : undefined,
          callToAction: eventDraft.ctaLabel && eventDraft.ctaHref ? { label: eventDraft.ctaLabel, href: eventDraft.ctaHref } : undefined,
          heroImage: eventDraft.heroImage || undefined,
          notes: splitLines(eventDraft.notesText),
          evidence: eventDraft.evidence,
          featured: eventDraft.featured,
        },
      });
      setEventDraft(eventEntryToDraft(saved));
      await invalidateCms();
      setSuccess("Esdeveniment guardat a Supabase.");
    } catch (error) {
      setError(error, "No s'ha pogut guardar l'esdeveniment.");
    } finally {
      setBusy(false);
    }
  };

  const trashCurrent = async (type: "gallery" | "itinerary" | "event") => {
    if (!requireRole("admin")) return;
    const recordId = type === "gallery" ? galleryDraft.recordId : type === "itinerary" ? itineraryDraft.recordId : eventDraft.recordId;
    if (!recordId) {
      setBanner({ tone: "info", text: "Aquest element encara no existeix a base de dades." });
      return;
    }

    try {
      setBusy(true);
      await trashClubEntry(recordId, session?.user?.email ?? null);
      await invalidateCms();
      if (type === "gallery") setGalleryDraft(defaultGalleryDraft());
      if (type === "itinerary") setItineraryDraft(defaultItineraryDraft());
      if (type === "event") setEventDraft(defaultEventDraft());
      setSuccess("Element enviat a paperera.");
    } catch (error) {
      setError(error, "No s'ha pogut enviar a paperera.");
    } finally {
      setBusy(false);
    }
  };

  const restoreCurrent = async (type: "gallery" | "itinerary" | "event") => {
    if (!requireRole("admin")) return;
    const recordId = type === "gallery" ? galleryDraft.recordId : type === "itinerary" ? itineraryDraft.recordId : eventDraft.recordId;
    if (!recordId) return;

    try {
      setBusy(true);
      await restoreClubEntry(recordId);
      await invalidateCms();
      setSuccess("Element restaurat de la paperera.");
    } catch (error) {
      setError(error, "No s'ha pogut restaurar l'element.");
    } finally {
      setBusy(false);
    }
  };

  const hardDeleteCurrent = async (type: "gallery" | "itinerary" | "event") => {
    if (!requireRole("admin")) return;
    const recordId = type === "gallery" ? galleryDraft.recordId : type === "itinerary" ? itineraryDraft.recordId : eventDraft.recordId;
    if (!recordId) return;

    try {
      setBusy(true);
      await hardDeleteClubEntry(recordId);
      await invalidateCms();
      if (type === "gallery") setGalleryDraft(defaultGalleryDraft());
      if (type === "itinerary") setItineraryDraft(defaultItineraryDraft());
      if (type === "event") setEventDraft(defaultEventDraft());
      setSuccess("Element eliminat definitivament.");
    } catch (error) {
      setError(error, "No s'ha pogut eliminar definitivament.");
    } finally {
      setBusy(false);
    }
  };

  const duplicateCurrent = (type: "gallery" | "itinerary" | "event") => {
    if (type === "gallery") {
      setGalleryDraft((current) => duplicateClubEntryDraft({ ...current, title: `${current.title} copy` }));
      setSuccess("Galeria duplicada al formulari.");
      return;
    }

    if (type === "itinerary") {
      setItineraryDraft((current) => duplicateClubEntryDraft({ ...current, title: `${current.title} copy` }));
      setSuccess("Itinerari duplicat al formulari.");
      return;
    }

    setEventDraft((current) => duplicateClubEntryDraft({ ...current, title: `${current.title} copy` }));
    setSuccess("Esdeveniment duplicat al formulari.");
  };

  const buildEventPreviewModel = (): ClubEvent => ({
    id: eventDraft.slug || slugify(eventDraft.title),
    year: Number(eventDraft.year) || new Date().getFullYear(),
    title: eventDraft.title,
    start: eventDraft.start || undefined,
    end: eventDraft.end || undefined,
    displayDate: eventDraft.displayDate,
    category: eventDraft.category as ClubEvent["category"],
    summary: eventDraft.summary || undefined,
    briefing: eventDraft.briefing || undefined,
    notes: splitLines(eventDraft.notesText),
    highlights: splitLines(eventDraft.highlightsText),
    checklist: splitLines(eventDraft.checklistText),
    timeline: parseTimelineLines(eventDraft.timelineText),
    source: {
      name: eventDraft.sourceName,
      label: eventDraft.sourceLabel || undefined,
      lat: parseFloatSafe(eventDraft.sourceLat, 42.5063),
      lon: parseFloatSafe(eventDraft.sourceLon, 1.5218),
      timezone: eventDraft.sourceTimezone || "Europe/Andorra",
    },
    destination: eventDraft.destinationName
      ? {
          name: eventDraft.destinationName,
          label: eventDraft.destinationLabel || undefined,
          lat: parseFloatSafe(eventDraft.destinationLat, 42.5562),
          lon: parseFloatSafe(eventDraft.destinationLon, 1.5332),
          timezone: eventDraft.destinationTimezone || "Europe/Andorra",
        }
      : undefined,
    meetingPoint: eventDraft.meetingPoint || undefined,
    meetingTime: eventDraft.meetingTime || undefined,
    galleryHref: eventDraft.galleryHref || undefined,
    roadbook: eventDraft.roadbookLabel && eventDraft.roadbookHref ? { label: eventDraft.roadbookLabel, href: eventDraft.roadbookHref } : undefined,
    callToAction: eventDraft.ctaLabel && eventDraft.ctaHref ? { label: eventDraft.ctaLabel, href: eventDraft.ctaHref } : undefined,
    sponsors: parseSponsorsLines(eventDraft.sponsorsText),
    heroImage: eventDraft.heroImage || undefined,
    legacyHref: undefined,
    evidence: eventDraft.evidence as ClubEvent["evidence"],
    featured: eventDraft.featured,
  });

  const openEventPreview = async () => {
    if (!eventDraft.title) {
      setBanner({ tone: "info", text: "Posa com a mínim un títol abans d'obrir la preview." });
      return;
    }

    const previewEvent = buildEventPreviewModel();
    saveEventPreview(previewEvent);
    const previewUrl = buildEventPreviewUrl(previewEvent.id);
    await copyText(`${window.location.origin}${previewUrl}`, "URL de preview privada");
    openExternal(previewUrl);
  };

  const projectRef = useMemo(() => {
    try {
      return new URL(clubCmsConfig.url).hostname.split(".")[0] ?? "";
    } catch {
      return "";
    }
  }, []);

  const allDynamicEntries = useMemo(() => [...galleryItems, ...itineraryItems, ...eventItems], [galleryItems, itineraryItems, eventItems]);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredEntries = useMemo(
    () =>
      !normalizedSearch
        ? allDynamicEntries
        : allDynamicEntries.filter((item) => {
            const haystack = [item.title, item.slug, item.content_type, item.status, item.collection_key ?? "", String(item.year ?? "")]
              .join(" ")
              .toLowerCase();
            return haystack.includes(normalizedSearch);
          }),
    [allDynamicEntries, normalizedSearch],
  );
  const totalDynamicCount = allDynamicEntries.length;
  const publishedCount = allDynamicEntries.filter((item) => item.status === "published").length;
  const draftCount = allDynamicEntries.filter((item) => item.status === "draft").length;
  const scheduledCount = allDynamicEntries.filter((item) => item.status === "scheduled").length;
  const archivedCount = allDynamicEntries.filter((item) => item.status === "archived").length;
  const trashedCount = allDynamicEntries.filter((item) => Boolean(item.deleted_at)).length;
  const latestUpdatedAt = useMemo(() => allDynamicEntries.map((item) => item.updated_at).filter(Boolean).sort((a, b) => b.localeCompare(a))[0] ?? null, [allDynamicEntries]);

  const dynamicGalleryImageCount = useMemo(
    () => galleryItems.reduce((acc, item) => acc + (Array.isArray(item.payload?.images) ? item.payload.images.length : 0), 0),
    [galleryItems],
  );

  const publicationStats = useMemo(
    () => [
      {
        key: "gallery",
        title: "Galeria",
        icon: Images,
        total: galleryItems.length,
        published: galleryItems.filter((item) => item.status === "published").length,
        drafts: galleryItems.filter((item) => item.status === "draft").length,
        staticFootprint: `${staticPhotoCount} fotos estàtiques`,
        dynamicFootprint: `${dynamicGalleryImageCount} fotos dinàmiques`,
      },
      {
        key: "itinerary",
        title: "Itineraris",
        icon: MapPinned,
        total: itineraryItems.length,
        published: itineraryItems.filter((item) => item.status === "published").length,
        drafts: itineraryItems.filter((item) => item.status === "draft").length,
        staticFootprint: `${staticRouteCount} rutes estàtiques`,
        dynamicFootprint: `${itineraryItems.length} rutes CMS`,
      },
      {
        key: "event",
        title: "Calendari",
        icon: CalendarRange,
        total: eventItems.length,
        published: eventItems.filter((item) => item.status === "published").length,
        drafts: eventItems.filter((item) => item.status === "draft").length,
        staticFootprint: `${staticEventCount} esdeveniments estàtics`,
        dynamicFootprint: `${eventItems.length} esdeveniments CMS`,
      },
    ],
    [galleryItems, itineraryItems, eventItems, staticPhotoCount, dynamicGalleryImageCount, staticRouteCount, staticEventCount],
  );

  const recentContent = useMemo(
    () =>
      [...filteredEntries]
        .sort((a, b) => (b.updated_at ?? "").localeCompare(a.updated_at ?? ""))
        .slice(0, 7),
    [filteredEntries],
  );

  const reviewQueue = useMemo(
    () =>
      [...filteredEntries]
        .filter((item) => !item.deleted_at && (item.status === "draft" || item.status === "scheduled" || item.status === "archived"))
        .sort((a, b) => (a.scheduled_for ?? a.updated_at ?? "").localeCompare(b.scheduled_for ?? b.updated_at ?? ""))
        .slice(0, 8),
    [filteredEntries],
  );

  const mediaLibrary = useMemo(
    () =>
      [
        ...galleryItems.flatMap((entry) =>
          Array.isArray(entry.payload?.images)
            ? entry.payload.images.map((image: any, index: number) => ({
                key: `${entry.id}-${index}`,
                src: String(image?.src ?? ""),
                alt: String(image?.alt ?? entry.title),
                title: entry.title,
                source: "gallery" as const,
              }))
            : [],
        ),
        ...itineraryItems
          .filter((entry) => String(entry.payload?.image?.src ?? entry.cover_image_url ?? ""))
          .map((entry) => ({
            key: `${entry.id}-cover`,
            src: String(entry.payload?.image?.src ?? entry.cover_image_url ?? ""),
            alt: String(entry.payload?.image?.alt ?? entry.title),
            title: entry.title,
            source: "itinerary" as const,
          })),
      ].filter((item) => item.src),
    [galleryItems, itineraryItems],
  );

  const lowTrafficPages = useMemo(() => {
    if (!visitStats?.supported) return [] as { title: string; path: string; visits: number; status: string }[];
    const visitsByPath = new Map(visitStats.topPaths.map((item) => [item.pathname, item.visits]));
    return allDynamicEntries
      .filter((entry) => !entry.deleted_at && entry.status !== "draft")
      .map((entry) => {
        const path = buildCmsPublicPath(entry);
        return { title: entry.title, path, visits: visitsByPath.get(path) ?? 0, status: entry.status };
      })
      .sort((a, b) => a.visits - b.visits)
      .slice(0, 6);
  }, [allDynamicEntries, visitStats]);

  const upcomingEvents = useMemo(
    () =>
      [...eventItems]
        .filter((item) => {
          const raw = String(item.payload?.start ?? "");
          const time = new Date(raw).getTime();
          return Number.isFinite(time) && time >= Date.now() - 6 * 60 * 60 * 1000;
        })
        .sort((a, b) => String(a.payload?.start ?? "").localeCompare(String(b.payload?.start ?? "")))
        .slice(0, 6),
    [eventItems],
  );

  const cockpitNotes = useMemo(() => {
    const notes: { tone: "neutral" | "warning" | "success"; title: string; text: string }[] = [];

    if (draftCount > 0) {
      notes.push({
        tone: "warning",
        title: `${draftCount} peça(es) en draft`,
        text: "Tens contingut preparat però encara no visible al frontend públic.",
      });
    }

    if (publishedCount > 0) {
      notes.push({
        tone: "success",
        title: `${publishedCount} peça(es) publicades`,
        text: "El CMS ja està empenyent contingut real cap al site públic sense tocar el codi estàtic.",
      });
    }

    if (!visitStats?.supported) {
      notes.push({
        tone: "neutral",
        title: "Telemetria pendent d'activar",
        text: "El codi de tracking ja està preparat. Només falta aplicar l'extensió SQL per veure visites reals aquí dins.",
      });
    }

    if (!upcomingEvents.length) {
      notes.push({
        tone: "neutral",
        title: "Cap esdeveniment futur al CMS",
        text: "Ara mateix el calendari viu sobretot del catàleg estàtic. Pots usar el CMS per fer-lo més viu i immediat.",
      });
    }

    return notes.slice(0, 4);
  }, [draftCount, publishedCount, visitStats?.supported, upcomingEvents.length]);

  const quickCreateActions = [
    {
      label: "Nova galeria",
      body: "Crea una col·lecció i salta directe a la zona de fotos.",
      icon: Images,
      action: () => {
        setGalleryDraft(defaultGalleryDraft());
        setActiveTab("photos");
      },
    },
    {
      label: "Nova ruta",
      body: "Obre una fitxa nova per a una ruta premium del club.",
      icon: MapPinned,
      action: () => {
        setItineraryDraft(defaultItineraryDraft());
        setActiveTab("itineraries");
      },
    },
    {
      label: "Nou esdeveniment",
      body: "Prepara el següent esmorzar, sortida o cars & coffee.",
      icon: CalendarRange,
      action: () => {
        setEventDraft(defaultEventDraft());
        setActiveTab("calendar");
      },
    },
  ];

  const supabaseLinks = projectRef
    ? [
        {
          title: "Projecte Supabase",
          body: "Dashboard general del projecte i salut de serveis.",
          icon: Database,
          url: `https://supabase.com/dashboard/project/${projectRef}`,
        },
        {
          title: "Auth users",
          body: "Usuaris, accessos i comptes del backoffice.",
          icon: ShieldCheck,
          url: `https://supabase.com/dashboard/project/${projectRef}/auth/users`,
        },
        {
          title: "Storage",
          body: `Bucket ${clubCmsConfig.bucket} i fitxers públics del club.`,
          icon: HardDrive,
          url: `https://supabase.com/dashboard/project/${projectRef}/storage/buckets`,
        },
        {
          title: "Table editor",
          body: "Dades de club_admin_entries, feedback i telemetria.",
          icon: LayoutDashboard,
          url: `https://supabase.com/dashboard/project/${projectRef}/editor`,
        },
        {
          title: "SQL Editor",
          body: "Per ampliar esquemes, policies i automatitzacions.",
          icon: WandSparkles,
          url: `https://supabase.com/dashboard/project/${projectRef}/sql/new`,
        },
        {
          title: "API / Logs",
          body: "API config, diagnòstic i exploració ràpida.",
          icon: Activity,
          url: `https://supabase.com/dashboard/project/${projectRef}/api`,
        },
      ]
    : [];

  const publicLinks = [
    { title: "Web pública", url: "https://bmwclubandorra.com", icon: Globe },
    { title: "Galeria pública", url: "https://bmwclubandorra.com/galeria", icon: Images },
    { title: "Itineraris", url: "https://bmwclubandorra.com/itineraris", icon: MapPinned },
    { title: "Calendari", url: "https://bmwclubandorra.com/calendari", icon: CalendarRange },
  ];

  return (
    <PageShell>
      <section className="pt-10 pb-8">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="glass-dark relative overflow-hidden rounded-[2.5rem] border-0 p-8 text-white shadow-elegant md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.32),transparent_34%)]" />
            <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,.08),transparent_65%)] lg:block" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78">
                  <LockKeyhole className="h-4 w-4" />
                  Control tower del club
                </div>
                <h1 className="mt-5 max-w-4xl text-3xl font-bold text-balance sm:text-4xl md:text-6xl">
                  Backoffice BMW molt més seriós, ràpid i visual.
                </h1>
                <p className="mt-5 max-w-3xl text-lg text-white/72">
                  Ara ja no és només un formulari: tens una cabina d'operacions amb accés directe a Supabase, lectura del contingut viu, salut editorial i telemetria preparada per créixer.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="secondary" className="rounded-full border-white/15 bg-white/10 text-white hover:bg-white/18" onClick={() => openExternal("https://bmwclubandorra.com/gestio-club") }>
                    <Rocket className="h-4 w-4" />
                    Obrir backoffice live
                  </Button>
                  <Button variant="secondary" className="rounded-full border-white/15 bg-white/10 text-white hover:bg-white/18" onClick={() => projectRef && openExternal(`https://supabase.com/dashboard/project/${projectRef}`)}>
                    <Database className="h-4 w-4" />
                    Supabase projecte
                  </Button>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
                  <ShieldCheck className="h-4 w-4" />
                  {clubCmsConfig.enabled ? "Capa backend activa" : "Falta connectar variables d'entorn"}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                <HeroMetric value={totalDynamicCount} label="registres CMS" help="peces dinàmiques vives al backoffice" />
                <HeroMetric value={publishedCount} label="publicats" help="contingut visible al frontend" />
                <HeroMetric value={draftCount} label="drafts" help="peces en preparació" />
                <HeroMetric value={visitStats?.last30d ?? 0} label="visites 30d" help={visitStats?.supported ? "telemetria real" : "pendent d'activar SQL"} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {!clubCmsConfig.enabled ? (
        <section className="pb-20">
          <div className="container mx-auto max-w-6xl px-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-[2rem] border-0 bg-white/80 p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <WandSparkles className="h-4 w-4" />
                Setup pendent
              </div>
              <h2 className="mt-4 text-2xl font-bold">Per activar-lo de veritat</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                El codi ja està cablejat. Ara només falta posar les variables del frontend i aplicar l'SQL a Supabase.
              </p>
              <div className="mt-5 rounded-[1.4rem] border border-border/70 bg-slate-950 p-4 text-sm text-white">
                <div>1. Copia <strong>.env.example</strong> a <strong>.env.local</strong>.</div>
                <div>2. Omple <strong>VITE_SUPABASE_URL</strong> i <strong>VITE_SUPABASE_ANON_KEY</strong>.</div>
                <div>3. Aplica <strong>supabase/club-cms.sql</strong>.</div>
                <div>4. Torna a desplegar la web.</div>
              </div>
            </Card>
            <Card className="rounded-[2rem] border-0 bg-white/80 p-6 shadow-sm">
              <h3 className="text-lg font-bold">Variables esperades</h3>
              <pre className="mt-4 overflow-x-auto rounded-[1.2rem] bg-slate-950 p-4 text-xs text-white">VITE_SUPABASE_URL=...{"\n"}VITE_SUPABASE_ANON_KEY=***{"\n"}VITE_SUPABASE_STORAGE_BUCKET=club-media</pre>
              <p className="mt-4 text-sm text-muted-foreground">Bucket per defecte: <strong>{clubCmsConfig.bucket}</strong>.</p>
            </Card>
          </div>
        </section>
      ) : !ready ? (
        <section className="pb-20"><div className="container mx-auto max-w-6xl px-4"><Card className="rounded-[2rem] border-0 bg-white/80 p-8 shadow-sm">Carregant sessió d'administrador…</Card></div></section>
      ) : !session ? (
        <section className="pb-20">
          <div className="container mx-auto max-w-6xl px-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="rounded-[2rem] border-0 bg-white/80 p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Login admin</h2>
              <p className="mt-3 text-sm text-muted-foreground">Entra amb un usuari autenticat de Supabase. Aquesta fase ja suporta rols reals admin/editor/viewer quan el SQL nou està aplicat.</p>
              <div className="mt-5 grid gap-4">
                <Field label="Email"><Input value={authForm.email} onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))} /></Field>
                <Field label="Contrasenya"><Input type="password" value={authForm.password} onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))} /></Field>
                <Button variant="hero" className="rounded-full" disabled={busy} onClick={handleSignIn}>Entrar</Button>
              </div>
            </Card>
            <Card className="rounded-[2rem] border-0 bg-white/80 p-6 shadow-sm">
              <h3 className="text-xl font-bold">Què queda connectat</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground list-disc pl-5">
                <li>CRUD de galeries a la taula <strong>club_admin_entries</strong>.</li>
                <li>Uploads al bucket públic <strong>{clubCmsConfig.bucket}</strong>.</li>
                <li>Itineraris i calendari visibles al frontend quan l'entrada està en estat <strong>published</strong>.</li>
                <li>Fallback: el contingut estàtic actual continua viu encara que Supabase falli.</li>
              </ul>
            </Card>
          </div>
        </section>
      ) : (
        <section className="pb-16">
          <div className="container mx-auto grid max-w-7xl gap-6 px-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      <BarChart3 className="h-4 w-4" />
                      Cockpit editorial
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">Vista operativa estratosfèrica</h2>
                    <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                      Accesos directes, mètriques, radar editorial i palanques ràpides per moure contingut sense perdre temps dins del dashboard de Supabase.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-full" onClick={() => invalidateCms()}>
                      <RefreshCw className="h-4 w-4" />
                      Refrescar dades
                    </Button>
                    <Button variant="outline" className="rounded-full" onClick={() => copyText(clubCmsConfig.url, "URL de Supabase")}>
                      <Copy className="h-4 w-4" />
                      Copiar URL API
                    </Button>
                    <Button variant="hero" className="rounded-full" onClick={() => openExternal("https://bmwclubandorra.com") }>
                      <ExternalLink className="h-4 w-4" />
                      Obrir web pública
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2rem] border-0 bg-white/78 p-5 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
                  <Field label="Buscador global">
                    <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="slug, títol, estat, tipus..." />
                  </Field>
                  <Field label="Paperera">
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={showDeleted ? "all" : "active"} onChange={(event) => setShowDeleted(event.target.value === "all")}>
                      <option value="active">Només actius</option>
                      <option value="all">Actius + paperera</option>
                    </select>
                  </Field>
                  <div className="rounded-[1.2rem] border border-border/70 bg-white/80 px-4 py-3 text-sm text-muted-foreground">
                    {filteredEntries.length} resultat(s) · {scheduledCount} programats · {trashedCount} a paperera
                  </div>
                </div>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
                <TabsList className="h-auto flex-wrap rounded-[1.25rem] bg-white/70 p-2">
                  <TabsTrigger value="cockpit" className="rounded-xl px-4 py-2">Cockpit</TabsTrigger>
                  <TabsTrigger value="photos" className="rounded-xl px-4 py-2">Fotos</TabsTrigger>
                  <TabsTrigger value="itineraries" className="rounded-xl px-4 py-2">Itineraris</TabsTrigger>
                  <TabsTrigger value="calendar" className="rounded-xl px-4 py-2">Calendari</TabsTrigger>
                </TabsList>

                <TabsContent value="cockpit" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <KpiCard icon={LayoutDashboard} label="Registres CMS" value={totalDynamicCount} note="suma de galeries, rutes i esdeveniments" />
                    <KpiCard icon={Rocket} label="Published" value={publishedCount} note={`${percent(publishedCount, totalDynamicCount)}% del contingut dinàmic`} />
                    <KpiCard icon={WandSparkles} label="Drafts" value={draftCount} note={draftCount ? "hi ha treball en preparació" : "sense cues pendents"} />
                    <KpiCard icon={Activity} label="Visites 7d" value={visitStats?.last7d ?? 0} note={visitStats?.supported ? `${visitStats?.uniquePaths ?? 0} rutes úniques` : "activar SQL de telemetria"} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {quickCreateActions.map((action) => (
                      <ActionCard key={action.label} icon={action.icon} title={action.label} body={action.body} cta="Obrir" onClick={action.action} />
                    ))}
                  </div>

                  <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold">Accessos directes Supabase</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Entrades ràpides al projecte real sense navegar a cegues dins del dashboard.</p>
                      </div>
                      <Button variant="outline" className="rounded-full" onClick={() => copyText(projectRef, "Project ref") } disabled={!projectRef}>
                        <Copy className="h-4 w-4" />
                        Copiar ref
                      </Button>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {supabaseLinks.map((link) => (
                        <QuickLinkCard key={link.title} icon={link.icon} title={link.title} body={link.body} url={link.url} onOpen={() => openExternal(link.url)} />
                      ))}
                    </div>
                  </Card>

                  <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">Radar editorial</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Què tens viu, què tens a mig fer i com es reparteix el pes entre estàtic i dinàmic.</p>
                      <div className="mt-5 space-y-4">
                        {publicationStats.map((stat) => (
                          <div key={stat.key} className="rounded-[1.4rem] border border-border/70 bg-white/80 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                  <stat.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-semibold">{stat.title}</div>
                                  <div className="text-xs text-muted-foreground">{stat.staticFootprint} · {stat.dynamicFootprint}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">{stat.published}/{stat.total}</div>
                                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">published</div>
                              </div>
                            </div>
                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${percent(stat.published, Math.max(stat.total, 1))}%` }} />
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                              <Chip>{stat.total} registres</Chip>
                              <Chip>{stat.published} publicats</Chip>
                              <Chip>{stat.drafts} drafts</Chip>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">Intel·ligència de visites</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Quan la telemetria estigui activada, aquí veuràs el pols real del site.</p>

                      {visitStats?.supported ? (
                        <div className="mt-5 space-y-5">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <MiniStat value={visitStats.total} label="Total acumulat" />
                            <MiniStat value={visitStats.last30d} label="Últims 30 dies" />
                            <MiniStat value={visitStats.last7d} label="Últims 7 dies" />
                            <MiniStat value={visitStats.uniquePaths} label="Rutes amb trànsit" />
                          </div>

                          <div>
                            <div className="text-sm font-semibold">Activitat per dia</div>
                            <div className="mt-3 flex items-end gap-2 rounded-[1.2rem] border border-border/70 bg-white/80 p-4">
                              {visitStats.daily.length ? visitStats.daily.map((day) => {
                                const max = Math.max(...visitStats.daily.map((item) => item.visits), 1);
                                const height = Math.max(16, Math.round((day.visits / max) * 90));
                                return (
                                  <div key={day.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                                    <div className="text-[11px] font-semibold text-slate-500">{day.visits}</div>
                                    <div className="w-full rounded-full bg-primary/18" style={{ height }}>
                                      <div className="h-full w-full rounded-full bg-primary" />
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">{formatShortDate(day.day)}</div>
                                  </div>
                                );
                              }) : <p className="text-sm text-muted-foreground">Encara no hi ha punts de dades.</p>}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-semibold">Top pàgines</div>
                            <div className="mt-3 space-y-2">
                              {visitStats.topPaths.map((item) => (
                                <div key={item.pathname} className="flex items-center justify-between rounded-[1.1rem] border border-border/70 bg-white/80 px-4 py-3 text-sm">
                                  <span className="font-medium">{item.pathname}</span>
                                  <span className="text-muted-foreground">{item.visits} visites</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 rounded-[1.5rem] border border-dashed border-border/80 bg-slate-50 p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                              <GaugeIcon />
                            </div>
                            <div>
                              <div className="font-semibold">Telemetria preparada, però falta l'últim pas</div>
                              <p className="mt-2 text-sm text-muted-foreground">
                                He deixat el tracking de visites implementat al codi. Per veure dades reals aquí dins, només cal relançar l'SQL del fitxer <strong>supabase/club-cms.sql</strong> perquè inclogui la nova taula <strong>club_page_views</strong>.
                              </p>
                              <div className="mt-4 flex flex-wrap gap-3">
                                <Button variant="outline" className="rounded-full" onClick={() => copyText("supabase/club-cms.sql", "ruta SQL") }>
                                  <Copy className="h-4 w-4" />
                                  Copiar ruta SQL
                                </Button>
                                {projectRef ? (
                                  <Button variant="outline" className="rounded-full" onClick={() => openExternal(`https://supabase.com/dashboard/project/${projectRef}/sql/new`)}>
                                    <ExternalLink className="h-4 w-4" />
                                    Obrir SQL Editor
                                  </Button>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">Agenda immediata</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Els propers esdeveniments dinàmics que tens ja al radar del club.</p>
                      <div className="mt-5 space-y-3">
                        {upcomingEvents.length ? upcomingEvents.map((item) => (
                          <div key={item.id} className="rounded-[1.2rem] border border-border/70 bg-white/80 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="font-semibold">{item.title}</div>
                                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.status} · {String(item.payload?.category ?? "sortida")}</div>
                              </div>
                              <div className="text-sm text-muted-foreground">{String(item.payload?.displayDate ?? "") || formatDateTime(String(item.payload?.start ?? ""))}</div>
                            </div>
                          </div>
                        )) : <p className="text-sm text-muted-foreground">No hi ha esdeveniments futurs creats des del CMS ara mateix.</p>}
                      </div>
                    </Card>

                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">Activitat recent</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Últimes peces tocades dins del backoffice.</p>
                      <div className="mt-5 space-y-3">
                        {recentContent.length ? recentContent.map((item) => (
                          <div key={item.id} className="rounded-[1.2rem] border border-border/70 bg-white/80 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="font-semibold">{item.title}</div>
                                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.content_type} · {item.status}</div>
                              </div>
                              <div className="text-right text-xs text-muted-foreground">
                                <div>{formatDateTime(item.updated_at)}</div>
                              </div>
                            </div>
                          </div>
                        )) : <p className="text-sm text-muted-foreground">Encara no hi ha activitat dinàmica registrada.</p>}
                      </div>
                    </Card>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">Contingut pendent de revisar</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Drafts, programats i arxivats que demanen ull humà.</p>
                      <div className="mt-5 space-y-3">
                        {reviewQueue.length ? reviewQueue.map((item) => (
                          <div key={item.id} className="rounded-[1.2rem] border border-border/70 bg-white/80 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="font-semibold">{item.title}</div>
                                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.content_type} · {item.status}</div>
                              </div>
                              <div className="text-right text-xs text-muted-foreground">
                                <div>{item.scheduled_for ? formatDateTime(item.scheduled_for) : formatDateTime(item.updated_at)}</div>
                              </div>
                            </div>
                          </div>
                        )) : <p className="text-sm text-muted-foreground">La cua de revisió està bastant neta.</p>}
                      </div>
                    </Card>

                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">SEO i pàgines fluixes</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Les peces publicades amb menys tracció per prioritzar millores.</p>
                      <div className="mt-5 space-y-3">
                        {lowTrafficPages.length ? lowTrafficPages.map((item) => (
                          <div key={`${item.path}-${item.title}`} className="rounded-[1.2rem] border border-border/70 bg-white/80 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="font-semibold">{item.title}</div>
                                <div className="mt-1 text-xs text-muted-foreground">{item.path}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">{item.visits}</div>
                                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">visites</div>
                              </div>
                            </div>
                          </div>
                        )) : <p className="text-sm text-muted-foreground">Quan hi hagi dades reals de visites, aquí sortirà el contingut més feble.</p>}
                      </div>
                    </Card>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">Mètriques per idioma i secció</h3>
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-sm font-semibold">Idiomes</div>
                          <div className="mt-3 space-y-2">
                            {(visitStats?.topLocales ?? []).length ? visitStats?.topLocales.map((item) => (
                              <div key={item.locale} className="flex items-center justify-between rounded-[1.1rem] border border-border/70 bg-white/80 px-4 py-3 text-sm">
                                <span>{item.locale}</span>
                                <span className="text-muted-foreground">{item.visits}</span>
                              </div>
                            )) : <p className="text-sm text-muted-foreground">Sense dades encara.</p>}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold">Seccions</div>
                          <div className="mt-3 space-y-2">
                            {(visitStats?.topSections ?? []).length ? visitStats?.topSections.map((item) => (
                              <div key={item.section} className="flex items-center justify-between rounded-[1.1rem] border border-border/70 bg-white/80 px-4 py-3 text-sm">
                                <span>{item.section}</span>
                                <span className="text-muted-foreground">{item.visits}</span>
                              </div>
                            )) : <p className="text-sm text-muted-foreground">Sense dades encara.</p>}
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                      <h3 className="text-xl font-bold">Feedback de galeria</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Pulse de les fotos més comentades i valorades.</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <MiniStat value={feedbackOverview?.total ?? 0} label="Feedback total" />
                        <MiniStat value={feedbackOverview?.recent?.length ?? 0} label="Recents" />
                        <MiniStat value={feedbackOverview?.topPhotos?.length ?? 0} label="Fotos amb tracció" />
                      </div>
                      <div className="mt-5 space-y-3">
                        {(feedbackOverview?.topPhotos ?? []).length ? feedbackOverview?.topPhotos.map((item) => (
                          <div key={item.photo_src} className="flex items-center justify-between rounded-[1.1rem] border border-border/70 bg-white/80 px-4 py-3 text-sm">
                            <span className="truncate pr-4">{item.photo_src.split("/").pop()}</span>
                            <span className="text-muted-foreground">{item.reviews} reviews · {item.averageRating.toFixed(1)}★</span>
                          </div>
                        )) : <p className="text-sm text-muted-foreground">Encara no hi ha feedback registrat.</p>}
                      </div>
                    </Card>
                  </div>

                  <Card className="rounded-[2rem] border-0 bg-white/78 p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Biblioteca media central</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Visió compacta de totes les imatges pujades via CMS.</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {mediaLibrary.slice(0, 12).map((item) => (
                        <div key={item.key} className="overflow-hidden rounded-[1.2rem] border border-border/70 bg-white/80">
                          <div className="aspect-[4/3] bg-slate-100">
                            <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                          </div>
                          <div className="p-3">
                            <div className="truncate text-sm font-semibold">{item.title}</div>
                            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.source}</div>
                          </div>
                        </div>
                      ))}
                      {!mediaLibrary.length ? <p className="text-sm text-muted-foreground">Encara no hi ha mitjans dinàmics al CMS.</p> : null}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="photos">
                  <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8">
                    <SectionHeader icon={Images} title="Galeria real" body="Puja fitxers al bucket i guarda la col·lecció com a draft o published." />
                    <EditorToolbar
                      items={galleryItems}
                      onNew={() => setGalleryDraft(defaultGalleryDraft())}
                      onPick={(id) => {
                        const entry = galleryItems.find((item) => item.id === id);
                        if (entry) setGalleryDraft(galleryEntryToDraft(entry));
                      }}
                    />
                    <div className="grid gap-4 md:grid-cols-2 mt-5">
                      <Field label="Slug"><Input value={galleryDraft.slug} onChange={(event) => setGalleryDraft((current) => ({ ...current, slug: slugify(event.target.value) }))} /></Field>
                      <Field label="Status">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={galleryDraft.status} onChange={(event) => setGalleryDraft((current) => ({ ...current, status: event.target.value as typeof current.status }))}>
                          <option value="draft">draft</option>
                          <option value="scheduled">scheduled</option>
                          <option value="published">published</option>
                          <option value="archived">archived</option>
                        </select>
                      </Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Programar publicació"><Input type="datetime-local" value={galleryDraft.scheduledFor} onChange={(event) => setGalleryDraft((current) => ({ ...current, scheduledFor: event.target.value }))} /></Field>
                      <Field label="Published at"><Input type="datetime-local" value={galleryDraft.publishedAt} onChange={(event) => setGalleryDraft((current) => ({ ...current, publishedAt: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Col·lecció pública">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={galleryDraft.collectionKey} onChange={(event) => setGalleryDraft((current) => ({ ...current, collectionKey: event.target.value }))}>
                          {galleryCollectionOptions.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
                        </select>
                      </Field>
                      <Field label="Ordre"><Input type="number" value={galleryDraft.sortOrder} onChange={(event) => setGalleryDraft((current) => ({ ...current, sortOrder: Number(event.target.value) || 0 }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Títol visible"><Input value={galleryDraft.title} onChange={(event) => setGalleryDraft((current) => ({ ...current, title: event.target.value }))} /></Field>
                      <Field label="Carpeta origen"><Input value={galleryDraft.sourceFolder} onChange={(event) => setGalleryDraft((current) => ({ ...current, sourceFolder: event.target.value }))} /></Field>
                    </div>
                    <Field label="Nota editorial" className="mt-4"><Input value={galleryDraft.note} onChange={(event) => setGalleryDraft((current) => ({ ...current, note: event.target.value }))} /></Field>
                    <div className="mt-5 rounded-[1.5rem] border border-dashed border-border/80 bg-background/60 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">Pujar fotos al bucket</div>
                          <div className="text-sm text-muted-foreground">Les imatges pujades s'afegeixen directament a aquesta col·lecció.</div>
                        </div>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
                          <UploadCloud className="h-4 w-4" />
                          Seleccionar fitxers
                          <input type="file" accept="image/*" multiple className="hidden" onChange={(event) => handleGalleryUpload(event.target.files)} />
                        </label>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      {galleryDraft.images.map((image, index) => (
                        <div key={`${image.src}-${index}`} className="grid gap-3 rounded-[1.2rem] border border-border/70 bg-white/70 p-4 md:grid-cols-[1fr_1fr_auto]">
                          <Input value={image.src} onChange={(event) => setGalleryDraft((current) => ({ ...current, images: current.images.map((item, itemIndex) => itemIndex === index ? { ...item, src: event.target.value } : item) }))} placeholder="URL pública" />
                          <Input value={image.alt} onChange={(event) => setGalleryDraft((current) => ({ ...current, images: current.images.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item) }))} placeholder="ALT" />
                          <div className="flex items-center gap-2">
                            <Input value={image.filename} onChange={(event) => setGalleryDraft((current) => ({ ...current, images: current.images.map((item, itemIndex) => itemIndex === index ? { ...item, filename: event.target.value } : item) }))} placeholder="filename.jpg" />
                            <Button variant="ghost" size="icon" onClick={() => setGalleryDraft((current) => ({ ...current, images: current.images.filter((_, itemIndex) => itemIndex !== index) }))}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                      {!galleryDraft.images.length ? <p className="text-sm text-muted-foreground">Encara no hi ha imatges en aquesta col·lecció.</p> : null}
                    </div>
                    <ActionsRow onSave={saveGallery} onDuplicate={() => duplicateCurrent("gallery")} onTrash={() => trashCurrent("gallery")} onRestore={() => restoreCurrent("gallery")} onHardDelete={() => hardDeleteCurrent("gallery")} busy={busy} canDelete={canDelete} isDeleted={Boolean(galleryDraft.recordId && galleryItems.find((item) => item.id === galleryDraft.recordId)?.deleted_at)} />
                  </Card>
                </TabsContent>

                <TabsContent value="itineraries">
                  <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8">
                    <SectionHeader icon={MapPinned} title="Itineraris reals" body="Quan guardes en published, la ruta apareix a /itineraris sense tocar el codi estàtic." />
                    <EditorToolbar
                      items={itineraryItems}
                      onNew={() => setItineraryDraft(defaultItineraryDraft())}
                      onPick={(id) => {
                        const entry = itineraryItems.find((item) => item.id === id);
                        if (entry) setItineraryDraft(itineraryEntryToDraft(entry));
                      }}
                    />
                    <div className="grid gap-4 md:grid-cols-2 mt-5">
                      <Field label="Slug"><Input value={itineraryDraft.slug} onChange={(event) => setItineraryDraft((current) => ({ ...current, slug: slugify(event.target.value) }))} /></Field>
                      <Field label="Status">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={itineraryDraft.status} onChange={(event) => setItineraryDraft((current) => ({ ...current, status: event.target.value as typeof current.status }))}>
                          <option value="draft">draft</option>
                          <option value="scheduled">scheduled</option>
                          <option value="published">published</option>
                          <option value="archived">archived</option>
                        </select>
                      </Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Programar publicació"><Input type="datetime-local" value={itineraryDraft.scheduledFor} onChange={(event) => setItineraryDraft((current) => ({ ...current, scheduledFor: event.target.value }))} /></Field>
                      <Field label="Published at"><Input type="datetime-local" value={itineraryDraft.publishedAt} onChange={(event) => setItineraryDraft((current) => ({ ...current, publishedAt: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Títol"><Input value={itineraryDraft.title} onChange={(event) => setItineraryDraft((current) => ({ ...current, title: event.target.value }))} /></Field>
                      <Field label="Perfil">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={itineraryDraft.profile} onChange={(event) => setItineraryDraft((current) => ({ ...current, profile: event.target.value as "car" | "motorcycle" | "both" }))}>
                          <option value="car">car</option>
                          <option value="motorcycle">motorcycle</option>
                          <option value="both">both</option>
                        </select>
                      </Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Pitch"><Input value={itineraryDraft.strapline} onChange={(event) => setItineraryDraft((current) => ({ ...current, strapline: event.target.value }))} /></Field>
                      <Field label="Ritme"><Input value={itineraryDraft.rhythm} onChange={(event) => setItineraryDraft((current) => ({ ...current, rhythm: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4 mt-4">
                      <Field label="Durada"><Input value={itineraryDraft.duration} onChange={(event) => setItineraryDraft((current) => ({ ...current, duration: event.target.value }))} /></Field>
                      <Field label="Distància"><Input value={itineraryDraft.distance} onChange={(event) => setItineraryDraft((current) => ({ ...current, distance: event.target.value }))} /></Field>
                      <Field label="Temporada"><Input value={itineraryDraft.bestSeason} onChange={(event) => setItineraryDraft((current) => ({ ...current, bestSeason: event.target.value }))} /></Field>
                      <Field label="Ordre"><Input type="number" value={itineraryDraft.sortOrder} onChange={(event) => setItineraryDraft((current) => ({ ...current, sortOrder: Number(event.target.value) || 0 }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Sortida"><Input value={itineraryDraft.start} onChange={(event) => setItineraryDraft((current) => ({ ...current, start: event.target.value }))} /></Field>
                      <Field label="Final"><Input value={itineraryDraft.finish} onChange={(event) => setItineraryDraft((current) => ({ ...current, finish: event.target.value }))} /></Field>
                    </div>
                    <Field label="Waypoints" className="mt-4"><Input value={itineraryDraft.waypointsText} onChange={(event) => setItineraryDraft((current) => ({ ...current, waypointsText: event.target.value }))} /></Field>
                    <Field label="Highlights" className="mt-4"><Textarea value={itineraryDraft.highlightsText} onChange={(event) => setItineraryDraft((current) => ({ ...current, highlightsText: event.target.value }))} /></Field>
                    <Field label="Per què és molt BMW" className="mt-4"><Textarea value={itineraryDraft.bmwAngle} onChange={(event) => setItineraryDraft((current) => ({ ...current, bmwAngle: event.target.value }))} /></Field>
                    <Field label="Notes" className="mt-4"><Textarea value={itineraryDraft.notesText} onChange={(event) => setItineraryDraft((current) => ({ ...current, notesText: event.target.value }))} /></Field>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Ruta oficial recomanada">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={itineraryDraft.clubRecommended ? "yes" : "no"} onChange={(event) => setItineraryDraft((current) => ({ ...current, clubRecommended: event.target.value === "yes" }))}>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </select>
                      </Field>
                      <Field label="Text recomanació"><Input value={itineraryDraft.clubRecommendation} onChange={(event) => setItineraryDraft((current) => ({ ...current, clubRecommendation: event.target.value }))} /></Field>
                    </div>
                    <div className="mt-5 rounded-[1.5rem] border border-dashed border-border/80 bg-background/60 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">Imatge de l'itinerari</div>
                          <div className="text-sm text-muted-foreground">Pots pujar una imatge al bucket o enganxar una URL manualment.</div>
                        </div>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white">
                          <UploadCloud className="h-4 w-4" />
                          Pujar imatge
                          <input type="file" accept="image/*" className="hidden" onChange={(event) => handleItineraryImageUpload(event.target.files)} />
                        </label>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Image src"><Input value={itineraryDraft.imageSrc} onChange={(event) => setItineraryDraft((current) => ({ ...current, imageSrc: event.target.value }))} /></Field>
                      <Field label="Image alt"><Input value={itineraryDraft.imageAlt} onChange={(event) => setItineraryDraft((current) => ({ ...current, imageAlt: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Crèdit"><Input value={itineraryDraft.creditName} onChange={(event) => setItineraryDraft((current) => ({ ...current, creditName: event.target.value }))} /></Field>
                      <Field label="Enllaç crèdit"><Input value={itineraryDraft.creditHref} onChange={(event) => setItineraryDraft((current) => ({ ...current, creditHref: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Llicència"><Input value={itineraryDraft.licenseLabel} onChange={(event) => setItineraryDraft((current) => ({ ...current, licenseLabel: event.target.value }))} /></Field>
                      <Field label="Enllaç llicència"><Input value={itineraryDraft.licenseHref} onChange={(event) => setItineraryDraft((current) => ({ ...current, licenseHref: event.target.value }))} /></Field>
                    </div>
                    <ActionsRow onSave={saveItinerary} onDuplicate={() => duplicateCurrent("itinerary")} onTrash={() => trashCurrent("itinerary")} onRestore={() => restoreCurrent("itinerary")} onHardDelete={() => hardDeleteCurrent("itinerary")} busy={busy} canDelete={canDelete} isDeleted={Boolean(itineraryDraft.recordId && itineraryItems.find((item) => item.id === itineraryDraft.recordId)?.deleted_at)} />
                  </Card>
                </TabsContent>

                <TabsContent value="calendar">
                  <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8">
                    <SectionHeader icon={CalendarRange} title="Calendari real" body="Quan guardes en published, l'esdeveniment apareix a /calendari i a la fitxa /esdeveniments/:slug." />
                    <EditorToolbar
                      items={eventItems}
                      onNew={() => setEventDraft(defaultEventDraft())}
                      onPick={(id) => {
                        const entry = eventItems.find((item) => item.id === id);
                        if (entry) setEventDraft(eventEntryToDraft(entry));
                      }}
                    />
                    <div className="grid gap-4 md:grid-cols-2 mt-5">
                      <Field label="Slug"><Input value={eventDraft.slug} onChange={(event) => setEventDraft((current) => ({ ...current, slug: slugify(event.target.value) }))} /></Field>
                      <Field label="Status">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={eventDraft.status} onChange={(event) => setEventDraft((current) => ({ ...current, status: event.target.value as typeof current.status }))}>
                          <option value="draft">draft</option>
                          <option value="scheduled">scheduled</option>
                          <option value="published">published</option>
                          <option value="archived">archived</option>
                        </select>
                      </Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Programar publicació"><Input type="datetime-local" value={eventDraft.scheduledFor} onChange={(event) => setEventDraft((current) => ({ ...current, scheduledFor: event.target.value }))} /></Field>
                      <Field label="Published at"><Input type="datetime-local" value={eventDraft.publishedAt} onChange={(event) => setEventDraft((current) => ({ ...current, publishedAt: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4 mt-4">
                      <Field label="Any"><Input type="number" value={eventDraft.year} onChange={(event) => setEventDraft((current) => ({ ...current, year: Number(event.target.value) || 2026 }))} /></Field>
                      <Field label="Categoria"><Input value={eventDraft.category} onChange={(event) => setEventDraft((current) => ({ ...current, category: event.target.value }))} /></Field>
                      <Field label="Ordre"><Input type="number" value={eventDraft.sortOrder} onChange={(event) => setEventDraft((current) => ({ ...current, sortOrder: Number(event.target.value) || 0 }))} /></Field>
                      <Field label="Featured">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={eventDraft.featured ? "yes" : "no"} onChange={(event) => setEventDraft((current) => ({ ...current, featured: event.target.value === "yes" }))}>
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </select>
                      </Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Títol"><Input value={eventDraft.title} onChange={(event) => setEventDraft((current) => ({ ...current, title: event.target.value }))} /></Field>
                      <Field label="Data visible"><Input value={eventDraft.displayDate} onChange={(event) => setEventDraft((current) => ({ ...current, displayDate: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Start ISO"><Input value={eventDraft.start} onChange={(event) => setEventDraft((current) => ({ ...current, start: event.target.value }))} /></Field>
                      <Field label="End ISO"><Input value={eventDraft.end} onChange={(event) => setEventDraft((current) => ({ ...current, end: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Origen"><Input value={eventDraft.sourceName} onChange={(event) => setEventDraft((current) => ({ ...current, sourceName: event.target.value }))} /></Field>
                      <Field label="Destí"><Input value={eventDraft.destinationName} onChange={(event) => setEventDraft((current) => ({ ...current, destinationName: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 mt-4">
                      <Field label="Source lat"><Input value={eventDraft.sourceLat} onChange={(event) => setEventDraft((current) => ({ ...current, sourceLat: event.target.value }))} /></Field>
                      <Field label="Source lon"><Input value={eventDraft.sourceLon} onChange={(event) => setEventDraft((current) => ({ ...current, sourceLon: event.target.value }))} /></Field>
                      <Field label="Source timezone"><Input value={eventDraft.sourceTimezone} onChange={(event) => setEventDraft((current) => ({ ...current, sourceTimezone: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 mt-4">
                      <Field label="Destination lat"><Input value={eventDraft.destinationLat} onChange={(event) => setEventDraft((current) => ({ ...current, destinationLat: event.target.value }))} /></Field>
                      <Field label="Destination lon"><Input value={eventDraft.destinationLon} onChange={(event) => setEventDraft((current) => ({ ...current, destinationLon: event.target.value }))} /></Field>
                      <Field label="Destination timezone"><Input value={eventDraft.destinationTimezone} onChange={(event) => setEventDraft((current) => ({ ...current, destinationTimezone: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Galeria associada">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={eventDraft.galleryHref} onChange={(event) => setEventDraft((current) => ({ ...current, galleryHref: event.target.value }))}>
                          {galleryCollectionOptions.map((option) => <option key={option.href} value={option.href}>{option.label}</option>)}
                        </select>
                      </Field>
                      <Field label="Evidència">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={eventDraft.evidence} onChange={(event) => setEventDraft((current) => ({ ...current, evidence: event.target.value }))}>
                          <option value="original-site">original-site</option>
                          <option value="gallery-title">gallery-title</option>
                          <option value="media-inferred">media-inferred</option>
                          <option value="mixed">mixed</option>
                        </select>
                      </Field>
                    </div>
                    <div className="mt-5 rounded-[1.5rem] border border-primary/15 bg-primary/5 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Microsite preview</div>
                          <p className="mt-2 text-sm text-muted-foreground">Genera una vista privada immediata amb els camps del formulari, sense guardar ni tocar el routing.</p>
                          <div className="mt-3 rounded-xl bg-white/80 px-3 py-2 text-xs text-muted-foreground break-all">{buildEventPreviewUrl(eventDraft.slug || slugify(eventDraft.title || "nova-sortida"))}</div>
                        </div>
                        <Button variant="outline" className="rounded-full" onClick={openEventPreview}>
                          <Rocket className="h-4 w-4" />
                          Obrir preview
                        </Button>
                      </div>
                    </div>
                    <Field label="Resum" className="mt-4"><Textarea value={eventDraft.summary} onChange={(event) => setEventDraft((current) => ({ ...current, summary: event.target.value }))} /></Field>
                    <Field label="Briefing / hero copy" className="mt-4"><Textarea value={eventDraft.briefing} onChange={(event) => setEventDraft((current) => ({ ...current, briefing: event.target.value }))} /></Field>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Punt de trobada"><Input value={eventDraft.meetingPoint} onChange={(event) => setEventDraft((current) => ({ ...current, meetingPoint: event.target.value }))} /></Field>
                      <Field label="Hora de trobada"><Input value={eventDraft.meetingTime} onChange={(event) => setEventDraft((current) => ({ ...current, meetingTime: event.target.value }))} /></Field>
                    </div>
                    <Field label="Hero image URL" className="mt-4"><Input value={eventDraft.heroImage} onChange={(event) => setEventDraft((current) => ({ ...current, heroImage: event.target.value }))} /></Field>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="Roadbook label"><Input value={eventDraft.roadbookLabel} onChange={(event) => setEventDraft((current) => ({ ...current, roadbookLabel: event.target.value }))} /></Field>
                      <Field label="Roadbook href"><Input value={eventDraft.roadbookHref} onChange={(event) => setEventDraft((current) => ({ ...current, roadbookHref: event.target.value }))} /></Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <Field label="CTA label"><Input value={eventDraft.ctaLabel} onChange={(event) => setEventDraft((current) => ({ ...current, ctaLabel: event.target.value }))} /></Field>
                      <Field label="CTA href"><Input value={eventDraft.ctaHref} onChange={(event) => setEventDraft((current) => ({ ...current, ctaHref: event.target.value }))} /></Field>
                    </div>
                    <Field label="Highlights (una línia = un punt)" className="mt-4"><Textarea value={eventDraft.highlightsText} onChange={(event) => setEventDraft((current) => ({ ...current, highlightsText: event.target.value }))} /></Field>
                    <Field label="Checklist (una línia = un ítem)" className="mt-4"><Textarea value={eventDraft.checklistText} onChange={(event) => setEventDraft((current) => ({ ...current, checklistText: event.target.value }))} /></Field>
                    <Field label="Timeline (format: hora | títol | nota)" className="mt-4"><Textarea value={eventDraft.timelineText} onChange={(event) => setEventDraft((current) => ({ ...current, timelineText: event.target.value }))} /></Field>
                    <Field label="Sponsors (format: nom|url opcional)" className="mt-4"><Textarea value={eventDraft.sponsorsText} onChange={(event) => setEventDraft((current) => ({ ...current, sponsorsText: event.target.value }))} /></Field>
                    <Field label="Notes" className="mt-4"><Textarea value={eventDraft.notesText} onChange={(event) => setEventDraft((current) => ({ ...current, notesText: event.target.value }))} /></Field>
                    <ActionsRow onSave={saveEvent} onDuplicate={() => duplicateCurrent("event")} onTrash={() => trashCurrent("event")} onRestore={() => restoreCurrent("event")} onHardDelete={() => hardDeleteCurrent("event")} busy={busy} canDelete={canDelete} isDeleted={Boolean(eventDraft.recordId && eventItems.find((item) => item.id === eventDraft.recordId)?.deleted_at)} />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid gap-6 content-start">
              <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Sessió admin activa
                </div>
                <p className="mt-4 text-sm text-muted-foreground break-all">{session.user.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip>{roleRow ? roleLabel[effectiveRole] : "Legacy auth"}</Chip>
                  <Chip>{canEdit ? "Pot editar" : "Sense edició"}</Chip>
                  <Chip>{canDelete ? "Pot esborrar" : "Sense esborrat"}</Chip>
                </div>
                <div className="mt-5 grid gap-3">
                  <StatusLine icon={FolderOpen} text={`${galleryItems.length} registres dinàmics de galeria`} />
                  <StatusLine icon={MapPinned} text={`${itineraryItems.length} registres dinàmics d'itinerari`} />
                  <StatusLine icon={CalendarRange} text={`${eventItems.length} registres dinàmics de calendari`} />
                  <StatusLine icon={WandSparkles} text={`${scheduledCount} programats · ${archivedCount} arxivats · ${trashedCount} a paperera`} />
                  <StatusLine icon={RefreshCw} text={latestUpdatedAt ? `Última actualització: ${formatDateTime(latestUpdatedAt)}` : "Cap actualització registrada encara"} />
                </div>
                <Button variant="outline" className="mt-5 rounded-full" disabled={busy} onClick={handleSignOut}><LogOut className="h-4 w-4" />Tancar sessió</Button>
              </Card>

              <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
                <h2 className="text-xl font-bold">Infra i connexions</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <StatusLine icon={Database} text={`Project ref: ${projectRef || "no detectat"}`} />
                  <StatusLine icon={HardDrive} text={`Bucket: ${clubCmsConfig.bucket}`} />
                  <StatusLine icon={LayoutDashboard} text={`Taula principal: ${clubCmsConfig.table}`} />
                </div>
                <div className="mt-5 grid gap-3">
                  <Button variant="outline" className="justify-between rounded-2xl" onClick={() => copyText(clubCmsConfig.url, "URL de Supabase")}>
                    <span>Copiar URL API</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between rounded-2xl" onClick={() => projectRef && openExternal(`https://supabase.com/dashboard/project/${projectRef}`)} disabled={!projectRef}>
                    <span>Obrir dashboard Supabase</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
                <h2 className="text-xl font-bold">Accessos públics</h2>
                <div className="mt-4 grid gap-3">
                  {publicLinks.map((link) => (
                    <Button key={link.title} variant="outline" className="justify-between rounded-2xl" onClick={() => openExternal(link.url)}>
                      <span className="flex items-center gap-2"><link.icon className="h-4 w-4" />{link.title}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
                <h2 className="text-xl font-bold">Radar ràpid</h2>
                <div className="mt-4 space-y-3">
                  {cockpitNotes.map((note) => (
                    <InsightCard key={note.title} tone={note.tone} title={note.title} text={note.text} />
                  ))}
                </div>
              </Card>

              {banner ? <Banner tone={banner.tone} text={banner.text} /> : null}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
};

const HeroMetric = ({ value, label, help }: { value: number; label: string; help: string }) => (
  <Card className="rounded-[1.5rem] border-0 bg-white/12 p-5 shadow-sm backdrop-blur">
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/82">{label}</div>
    <div className="mt-2 text-xs text-white/60">{help}</div>
  </Card>
);

const KpiCard = ({ icon: Icon, label, value, note }: { icon: typeof Images; label: string; value: number; note: string }) => (
  <Card className="rounded-[1.5rem] border-0 bg-white/78 p-5 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-2 text-3xl font-bold text-slate-950">{value}</div>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-3 text-sm text-muted-foreground">{note}</div>
  </Card>
);

const ActionCard = ({ icon: Icon, title, body, cta, onClick }: { icon: typeof Images; title: string; body: string; cta: string; onClick: () => void }) => (
  <Card className="rounded-[1.6rem] border-0 bg-white/78 p-5 shadow-sm">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div className="mt-4 text-lg font-bold">{title}</div>
    <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    <Button variant="outline" className="mt-4 rounded-full" onClick={onClick}>
      <ArrowUpRight className="h-4 w-4" />
      {cta}
    </Button>
  </Card>
);

const QuickLinkCard = ({ icon: Icon, title, body, url, onOpen }: { icon: typeof Images; title: string; body: string; url: string; onOpen: () => void }) => (
  <Card className="rounded-[1.6rem] border border-border/70 bg-white/80 p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <Button variant="ghost" size="icon" onClick={onOpen}>
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </div>
    <div className="mt-4 text-lg font-bold">{title}</div>
    <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    <div className="mt-4 truncate text-xs text-muted-foreground">{url}</div>
  </Card>
);

const MiniStat = ({ value, label }: { value: number; label: string }) => (
  <div className="rounded-[1.2rem] border border-border/70 bg-white/80 p-4">
    <div className="text-2xl font-bold">{value}</div>
    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, body }: { icon: typeof Images; title: string; body: string }) => (
  <div className="mb-5">
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
      <Icon className="h-3.5 w-3.5" />
      {title}
    </div>
    <p className="mt-3 text-sm text-muted-foreground">{body}</p>
  </div>
);

const Field = ({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) => (
  <div className={className}>
    <label className="mb-2 block text-sm font-medium">{label}</label>
    {children}
  </div>
);

const EditorToolbar = ({ items, onNew, onPick }: { items: any[]; onNew: () => void; onPick: (id: string) => void }) => (
  <div className="grid gap-3 rounded-[1.4rem] border border-border/70 bg-white/70 p-4 md:grid-cols-[1fr_auto]">
    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="" onChange={(event) => event.target.value && onPick(event.target.value)}>
      <option value="">Carregar registre existent…</option>
      {items.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.status}{item.deleted_at ? " · trash" : ""}</option>)}
    </select>
    <Button variant="outline" className="rounded-full" onClick={onNew}><Plus className="h-4 w-4" />Nou</Button>
  </div>
);

const ActionsRow = ({
  onSave,
  onDuplicate,
  onTrash,
  onRestore,
  onHardDelete,
  busy,
  canDelete,
  isDeleted,
}: {
  onSave: () => void;
  onDuplicate: () => void;
  onTrash: () => void;
  onRestore: () => void;
  onHardDelete: () => void;
  busy: boolean;
  canDelete: boolean;
  isDeleted: boolean;
}) => (
  <div className="mt-6 flex flex-wrap gap-3">
    <Button variant="hero" className="rounded-full" disabled={busy} onClick={onSave}><Save className="h-4 w-4" />Guardar</Button>
    <Button variant="outline" className="rounded-full" disabled={busy} onClick={onDuplicate}><Copy className="h-4 w-4" />Duplicar</Button>
    {canDelete ? (
      isDeleted ? (
        <>
          <Button variant="outline" className="rounded-full" disabled={busy} onClick={onRestore}><RefreshCw className="h-4 w-4" />Restaurar</Button>
          <Button variant="outline" className="rounded-full" disabled={busy} onClick={onHardDelete}><Trash2 className="h-4 w-4" />Borrar definitivo</Button>
        </>
      ) : (
        <Button variant="outline" className="rounded-full" disabled={busy} onClick={onTrash}><Trash2 className="h-4 w-4" />Enviar a papelera</Button>
      )
    ) : null}
  </div>
);

const StatusLine = ({ icon: Icon, text }: { icon: typeof Images; text: string }) => (
  <div className="flex items-center gap-3 rounded-[1.1rem] border border-border/70 bg-white/80 px-4 py-3 text-sm text-foreground/84">
    <Icon className="h-4 w-4 text-primary" />
    <span>{text}</span>
  </div>
);

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{children}</span>
);

const InsightCard = ({ tone, title, text }: { tone: "neutral" | "warning" | "success"; title: string; text: string }) => {
  const toneClass = tone === "success"
    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
    : tone === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : "border-slate-200 bg-slate-50 text-slate-800";

  return (
    <div className={`rounded-[1.2rem] border px-4 py-3 ${toneClass}`}>
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm opacity-90">{text}</div>
    </div>
  );
};

const GaugeIcon = () => <BarChart3 className="h-5 w-5" />;

const Banner = ({ tone, text }: { tone: "success" | "danger" | "info"; text: string }) => {
  const toneClass = tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : tone === "danger" ? "border-red-200 bg-red-50 text-red-700" : "border-sky-200 bg-sky-50 text-sky-700";
  return <div className={`rounded-[1.2rem] border px-4 py-3 text-sm ${toneClass}`}>{text}</div>;
};

export default GestioClub;
