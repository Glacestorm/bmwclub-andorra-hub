import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarRange, FolderOpen, Images, LockKeyhole, LogOut, MapPinned, Plus, Save, ShieldCheck, Trash2, UploadCloud, WandSparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clubEvents } from "@/content/calendarData";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { itineraryGuide } from "@/content/itineraryGuide";
import {
  clubCmsConfig,
  collectionKeyByGalleryHref,
  deleteClubEntry,
  galleryCollectionOptions,
  galleryHrefByCollectionKey,
  saveClubEntry,
  signInClubAdmin,
  signOutClubAdmin,
  slugify,
  uploadClubMedia,
  useClubAdminEntries,
  useCmsSession,
} from "@/lib/clubCms";

const defaultGalleryDraft = () => ({
  recordId: "",
  slug: "",
  status: "published" as const,
  sortOrder: 0,
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
  notesText: "",
  evidence: "mixed",
  featured: true,
});

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const galleryEntryToDraft = (entry: any) => ({
  recordId: entry.id,
  slug: entry.slug,
  status: entry.status,
  sortOrder: entry.sort_order ?? 0,
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
  notesText: Array.isArray(entry.payload?.notes) ? entry.payload.notes.join("\n") : "",
  evidence: String(entry.payload?.evidence ?? "mixed"),
  featured: Boolean(entry.payload?.featured),
});

const parseFloatSafe = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const GestioClub = () => {
  const queryClient = useQueryClient();
  const { client, ready, session } = useCmsSession();
  const galleryEntries = useClubAdminEntries("gallery", Boolean(session));
  const itineraryEntries = useClubAdminEntries("itinerary", Boolean(session));
  const eventEntries = useClubAdminEntries("event", Boolean(session));

  const [banner, setBanner] = useState<{ tone: "success" | "danger" | "info"; text: string } | null>(null);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [galleryDraft, setGalleryDraft] = useState(defaultGalleryDraft());
  const [itineraryDraft, setItineraryDraft] = useState(defaultItineraryDraft());
  const [eventDraft, setEventDraft] = useState(defaultEventDraft());

  const staticPhotoCount = useMemo(() => Object.values(galleryMediaByPage).flat().reduce((acc, section) => acc + section.images.length, 0), []);
  const staticRouteCount = itineraryGuide.length;
  const staticEventCount = clubEvents.length;

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
    ]);
  };

  const setSuccess = (text: string) => setBanner({ tone: "success", text });
  const setError = (error: unknown, fallback: string) => {
    const message = error instanceof Error ? error.message : fallback;
    setBanner({ tone: "danger", text: message || fallback });
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
    if (!client || !session) {
      setBanner({ tone: "info", text: "Has d'entrar com a admin abans de pujar fotos." });
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
    if (!client || !session) {
      setBanner({ tone: "info", text: "Has d'entrar com a admin abans de pujar la imatge." });
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

  const deleteCurrent = async (type: "gallery" | "itinerary" | "event") => {
    const recordId = type === "gallery" ? galleryDraft.recordId : type === "itinerary" ? itineraryDraft.recordId : eventDraft.recordId;
    if (!recordId) {
      setBanner({ tone: "info", text: "Aquest element encara no existeix a base de dades." });
      return;
    }

    try {
      setBusy(true);
      await deleteClubEntry(recordId);
      await invalidateCms();
      if (type === "gallery") setGalleryDraft(defaultGalleryDraft());
      if (type === "itinerary") setItineraryDraft(defaultItineraryDraft());
      if (type === "event") setEventDraft(defaultEventDraft());
      setSuccess("Element eliminat.");
    } catch (error) {
      setError(error, "No s'ha pogut eliminar l'element.");
    } finally {
      setBusy(false);
    }
  };

  const galleryItems = galleryEntries.data ?? [];
  const itineraryItems = itineraryEntries.data ?? [];
  const eventItems = eventEntries.data ?? [];

  return (
    <PageShell>
      <section className="pt-10 pb-8">
        <div className="container mx-auto max-w-6xl px-4">
          <Card className="glass-dark relative overflow-hidden rounded-[2.5rem] border-0 p-8 text-white shadow-elegant md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.32),transparent_34%)]" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78">
                  <LockKeyhole className="h-4 w-4" />
                  Accés club
                </div>
                <h1 className="mt-5 max-w-4xl text-3xl font-bold text-balance sm:text-4xl md:text-6xl">
                  Backoffice real amb auth, storage i persistència.
                </h1>
                <p className="mt-5 max-w-3xl text-lg text-white/72">
                  Aquesta zona ja està pensada per treballar contra Supabase: login, CRUD de fotos, itineraris i calendari, i pujada de fitxers al bucket públic del club.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
                  <ShieldCheck className="h-4 w-4" />
                  {clubCmsConfig.enabled ? "Capa backend preparada" : "Falta connectar variables d'entorn"}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <StatCard value={staticPhotoCount} label="fotos actuals" />
                <StatCard value={staticRouteCount} label="rutes actuals" />
                <StatCard value={staticEventCount} label="esdeveniments actuals" />
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
              <pre className="mt-4 overflow-x-auto rounded-[1.2rem] bg-slate-950 p-4 text-xs text-white">VITE_SUPABASE_URL=...{"\n"}VITE_SUPABASE_ANON_KEY=...{"\n"}VITE_SUPABASE_STORAGE_BUCKET=club-media</pre>
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
              <p className="mt-3 text-sm text-muted-foreground">Entra amb un usuari autenticat de Supabase. Amb la política actual, qualsevol usuari autenticat pot gestionar el contingut. Si vols rols fins, ho fem al següent pas.</p>
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
          <div className="container mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Tabs defaultValue="photos" className="space-y-5">
                <TabsList className="h-auto flex-wrap rounded-[1.25rem] bg-white/70 p-2">
                  <TabsTrigger value="photos" className="rounded-xl px-4 py-2">Fotos</TabsTrigger>
                  <TabsTrigger value="itineraries" className="rounded-xl px-4 py-2">Itineraris</TabsTrigger>
                  <TabsTrigger value="calendar" className="rounded-xl px-4 py-2">Calendari</TabsTrigger>
                </TabsList>

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
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={galleryDraft.status} onChange={(event) => setGalleryDraft((current) => ({ ...current, status: event.target.value as "draft" | "published" }))}>
                          <option value="draft">draft</option>
                          <option value="published">published</option>
                        </select>
                      </Field>
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
                    <ActionsRow onSave={saveGallery} onDelete={() => deleteCurrent("gallery")} busy={busy} />
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
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={itineraryDraft.status} onChange={(event) => setItineraryDraft((current) => ({ ...current, status: event.target.value as "draft" | "published" }))}>
                          <option value="draft">draft</option>
                          <option value="published">published</option>
                        </select>
                      </Field>
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
                    <ActionsRow onSave={saveItinerary} onDelete={() => deleteCurrent("itinerary")} busy={busy} />
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
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={eventDraft.status} onChange={(event) => setEventDraft((current) => ({ ...current, status: event.target.value as "draft" | "published" }))}>
                          <option value="draft">draft</option>
                          <option value="published">published</option>
                        </select>
                      </Field>
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
                    <Field label="Resum" className="mt-4"><Textarea value={eventDraft.summary} onChange={(event) => setEventDraft((current) => ({ ...current, summary: event.target.value }))} /></Field>
                    <Field label="Notes" className="mt-4"><Textarea value={eventDraft.notesText} onChange={(event) => setEventDraft((current) => ({ ...current, notesText: event.target.value }))} /></Field>
                    <ActionsRow onSave={saveEvent} onDelete={() => deleteCurrent("event")} busy={busy} />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid gap-6">
              <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Sessió admin activa
                </div>
                <p className="mt-4 text-sm text-muted-foreground break-all">{session.user.email}</p>
                <div className="mt-5 grid gap-3">
                  <StatusLine icon={FolderOpen} text={`${galleryItems.length} registres dinàmics de galeria`} />
                  <StatusLine icon={MapPinned} text={`${itineraryItems.length} registres dinàmics d'itinerari`} />
                  <StatusLine icon={CalendarRange} text={`${eventItems.length} registres dinàmics de calendari`} />
                </div>
                <Button variant="outline" className="mt-5 rounded-full" disabled={busy} onClick={handleSignOut}><LogOut className="h-4 w-4" />Tancar sessió</Button>
              </Card>

              <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
                <h2 className="text-xl font-bold">Com funciona ara</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground list-disc pl-5">
                  <li>Les entrades en <strong>published</strong> apareixen al frontend públic.</li>
                  <li>Les entrades en <strong>draft</strong> queden només al backoffice.</li>
                  <li>Les rutes i esdeveniments dinàmics se sobreposen al contingut estàtic sense trencar-lo.</li>
                  <li>Les galeries dinàmiques s'afegeixen a les col·leccions existents.</li>
                </ul>
              </Card>

              {banner ? <Banner tone={banner.tone} text={banner.text} /> : null}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
};

const StatCard = ({ value, label }: { value: number; label: string }) => (
  <Card className="rounded-[1.5rem] border-0 bg-white/70 p-5 shadow-sm">
    <div className="text-3xl font-bold text-slate-950">{value}</div>
    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
  </Card>
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
      {items.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.status}</option>)}
    </select>
    <Button variant="outline" className="rounded-full" onClick={onNew}><Plus className="h-4 w-4" />Nou</Button>
  </div>
);

const ActionsRow = ({ onSave, onDelete, busy }: { onSave: () => void; onDelete: () => void; busy: boolean }) => (
  <div className="mt-6 flex flex-wrap gap-3">
    <Button variant="hero" className="rounded-full" disabled={busy} onClick={onSave}><Save className="h-4 w-4" />Guardar</Button>
    <Button variant="outline" className="rounded-full" disabled={busy} onClick={onDelete}><Trash2 className="h-4 w-4" />Eliminar</Button>
  </div>
);

const StatusLine = ({ icon: Icon, text }: { icon: typeof Images; text: string }) => (
  <div className="flex items-center gap-3 rounded-[1.1rem] border border-border/70 bg-white/80 px-4 py-3 text-sm text-foreground/84">
    <Icon className="h-4 w-4 text-primary" />
    <span>{text}</span>
  </div>
);

const Banner = ({ tone, text }: { tone: "success" | "danger" | "info"; text: string }) => {
  const toneClass = tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : tone === "danger" ? "border-red-200 bg-red-50 text-red-700" : "border-sky-200 bg-sky-50 text-sky-700";
  return <div className={`rounded-[1.2rem] border px-4 py-3 text-sm ${toneClass}`}>{text}</div>;
};

export default GestioClub;
