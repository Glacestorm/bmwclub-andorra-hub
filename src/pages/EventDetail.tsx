import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  FolderArchive,
  Image as ImageIcon,
  MapPin,
  Route,
  Sparkles,
  Ticket,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";
import { localizeEventNote } from "@/components/calendar/eventNotes";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { archiveItems, featuredEventMeta } from "@/content/siteExperience";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { formatEventDateRange, getCountdownParts, getEventByIdFromList, getEventStart, getEventStatus, hasExactEventDate } from "@/lib/calendar";
import {
  buildEventPreviewUrl,
  collectionKeyByGalleryHref,
  loadEventPreview,
  mergeGallerySections,
  useMergedEvents,
  usePublishedGallerySections,
} from "@/lib/clubCms";

const galleryPageByHref: Record<string, string> = {
  "/galeria/historiques/2011-2012": "historiques_2011_2012",
  "/galeria/historiques/2013-2015": "historiques_2013_2015",
  "/galeria/historiques/2016-2021": "historiques_2016_2021",
  "/galeria/historiques/2022": "historiques_2022",
  "/galeria/sortides/2024": "sortides_2024",
  "/galeria/sortides/2025": "sortides_2025",
  "/galeria/sortides/2026": "sortides_2026",
};

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    back: "Tornar al calendari",
    agenda: "Calendari",
    weather: "Meteo",
    photos: "Fotos",
    officialSource: "Enllaç extern",
    route: "Ruta",
    date: "Data",
    source: "Origen",
    destination: "Destí",
    status: "Estat",
    archive: "Arxiu relacionat",
    live: "En curs",
    upcoming: "Per fer",
    done: "Realitzada",
    historic: "Històrica",
    about: "Sobre la sortida",
    highlights: "Punts forts",
    checklist: "Abans de sortir",
    timeline: "Pla del dia",
    sponsors: "Patrocinadors i partners",
    meetingPoint: "Punt de trobada",
    meetingTime: "Hora de trobada",
    countdown: "Compte enrere",
    previewMode: "Vista prèvia privada",
    previewNote: "Aquesta fitxa s'està mostrant des del backoffice i encara no és pública.",
    openPreview: "Obrir preview",
    roadbook: "Roadbook",
    callToAction: "Acció principal",
  },
  es: {
    back: "Volver al calendario",
    agenda: "Calendario",
    weather: "Meteo",
    photos: "Fotos",
    officialSource: "Enlace externo",
    route: "Ruta",
    date: "Fecha",
    source: "Origen",
    destination: "Destino",
    status: "Estado",
    archive: "Archivo relacionado",
    live: "En curso",
    upcoming: "Pendiente",
    done: "Realizada",
    historic: "Histórica",
    about: "Sobre la salida",
    highlights: "Puntos fuertes",
    checklist: "Antes de salir",
    timeline: "Plan del día",
    sponsors: "Patrocinadores y partners",
    meetingPoint: "Punto de encuentro",
    meetingTime: "Hora de encuentro",
    countdown: "Cuenta atrás",
    previewMode: "Vista previa privada",
    previewNote: "Esta ficha se está mostrando desde el backoffice y todavía no es pública.",
    openPreview: "Abrir preview",
    roadbook: "Roadbook",
    callToAction: "Acción principal",
  },
  fr: {
    back: "Retour au calendrier",
    agenda: "Calendrier",
    weather: "Météo",
    photos: "Photos",
    officialSource: "Lien externe",
    route: "Itinéraire",
    date: "Date",
    source: "Origine",
    destination: "Destination",
    status: "État",
    archive: "Archive liée",
    live: "En cours",
    upcoming: "À venir",
    done: "Réalisée",
    historic: "Historique",
    about: "À propos de la sortie",
    highlights: "Points forts",
    checklist: "Avant de partir",
    timeline: "Plan de la journée",
    sponsors: "Sponsors et partenaires",
    meetingPoint: "Point de rendez-vous",
    meetingTime: "Heure de rendez-vous",
    countdown: "Compte à rebours",
    previewMode: "Aperçu privé",
    previewNote: "Cette fiche est affichée depuis le backoffice et n'est pas encore publique.",
    openPreview: "Ouvrir l'aperçu",
    roadbook: "Roadbook",
    callToAction: "Action principale",
  },
  en: {
    back: "Back to calendar",
    agenda: "Calendar",
    weather: "Weather",
    photos: "Photos",
    officialSource: "External link",
    route: "Route",
    date: "Date",
    source: "Origin",
    destination: "Destination",
    status: "Status",
    archive: "Related archive",
    live: "Live",
    upcoming: "Upcoming",
    done: "Completed",
    historic: "Historic",
    about: "About this outing",
    highlights: "Highlights",
    checklist: "Before you go",
    timeline: "Day plan",
    sponsors: "Sponsors and partners",
    meetingPoint: "Meeting point",
    meetingTime: "Meeting time",
    countdown: "Countdown",
    previewMode: "Private preview",
    previewNote: "This detail page is being rendered from the backoffice and is not public yet.",
    openPreview: "Open preview",
    roadbook: "Roadbook",
    callToAction: "Primary action",
  },
  pt: {
    back: "Voltar ao calendário",
    agenda: "Calendário",
    weather: "Meteorologia",
    photos: "Fotos",
    officialSource: "Ligação externa",
    route: "Rota",
    date: "Data",
    source: "Origem",
    destination: "Destino",
    status: "Estado",
    archive: "Arquivo relacionado",
    live: "Em curso",
    upcoming: "Por fazer",
    done: "Realizado",
    historic: "Histórica",
    about: "Sobre o passeio",
    highlights: "Pontos fortes",
    checklist: "Antes de sair",
    timeline: "Plano do dia",
    sponsors: "Patrocinadores e parceiros",
    meetingPoint: "Ponto de encontro",
    meetingTime: "Hora de encontro",
    countdown: "Contagem decrescente",
    previewMode: "Pré-visualização privada",
    previewNote: "Esta ficha está a ser mostrada desde o backoffice e ainda não é pública.",
    openPreview: "Abrir preview",
    roadbook: "Roadbook",
    callToAction: "Ação principal",
  },
  de: {
    back: "Zurück zum Kalender",
    agenda: "Kalender",
    weather: "Wetter",
    photos: "Fotos",
    officialSource: "Externer Link",
    route: "Route",
    date: "Datum",
    source: "Start",
    destination: "Ziel",
    status: "Status",
    archive: "Zugehöriges Archiv",
    live: "Läuft",
    upcoming: "Bevorstehend",
    done: "Abgeschlossen",
    historic: "Historisch",
    about: "Über die Ausfahrt",
    highlights: "Highlights",
    checklist: "Vor der Abfahrt",
    timeline: "Tagesplan",
    sponsors: "Sponsoren und Partner",
    meetingPoint: "Treffpunkt",
    meetingTime: "Treffzeit",
    countdown: "Countdown",
    previewMode: "Private Vorschau",
    previewNote: "Diese Detailseite wird aus dem Backoffice gerendert und ist noch nicht öffentlich.",
    openPreview: "Vorschau öffnen",
    roadbook: "Roadbook",
    callToAction: "Hauptaktion",
  },
  ru: {
    back: "Назад к календарю",
    agenda: "Календарь",
    weather: "Погода",
    photos: "Фото",
    officialSource: "Внешняя ссылка",
    route: "Маршрут",
    date: "Дата",
    source: "Старт",
    destination: "Финиш",
    status: "Статус",
    archive: "Связанный архив",
    live: "Сейчас",
    upcoming: "Скоро",
    done: "Завершено",
    historic: "Историческое",
    about: "О выезде",
    highlights: "Ключевые пункты",
    checklist: "Перед выездом",
    timeline: "План дня",
    sponsors: "Спонсоры и партнёры",
    meetingPoint: "Точка сбора",
    meetingTime: "Время сбора",
    countdown: "Обратный отсчёт",
    previewMode: "Приватный предпросмотр",
    previewNote: "Эта страница рендерится из backoffice и ещё не является публичной.",
    openPreview: "Открыть предпросмотр",
    roadbook: "Roadbook",
    callToAction: "Основное действие",
  },
};

const EventDetail = () => {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language];
  const previewRequested = searchParams.get("preview") === "1";

  const { data: events } = useMergedEvents();

  const liveEvent = eventId ? getEventByIdFromList(events, eventId) : null;
  const previewEvent = useMemo(() => (eventId && previewRequested ? loadEventPreview(eventId) : null), [eventId, previewRequested]);
  const event = previewEvent ?? liveEvent;
  const isPreview = Boolean(previewEvent && previewRequested);
  const [galleryPath, galleryQuery] = (event?.galleryHref ?? "").split("?");
  const galleryAlbum = new URLSearchParams(galleryQuery).get("album");
  const galleryKey = galleryPageByHref[galleryPath] ?? collectionKeyByGalleryHref[galleryPath] ?? "";
  const { data: dynamicSections } = usePublishedGallerySections(galleryKey);
  const meta = event && !isPreview ? featuredEventMeta.find((item) => item.eventId === event.id) : null;
  const gallerySections = event && galleryKey ? mergeGallerySections(galleryMediaByPage[galleryKey] ?? [], dynamicSections) : [];
  const previewImages = gallerySections.filter((section) => !galleryAlbum || section.id === galleryAlbum).flatMap((section) => section.images).slice(0, 6);
  const relatedArchive = meta ? archiveItems.filter((item) => meta.archiveIds?.includes(item.id)) : [];
  const status = event ? getEventStatus(event) : "historic";
  const statusLabel = status === "live" ? t.live : status === "upcoming" ? t.upcoming : status === "done" ? t.done : t.historic;
  const destination = event?.destination?.label ?? event?.destination?.name ?? event?.source.label ?? event?.source.name ?? "";
  const heroImage = event?.heroImage || meta?.heroImage || previewImages[0]?.src;
  const countdown = useMemo(() => {
    if (!event) return null;
    const start = getEventStart(event);
    if (!start || status !== "upcoming") return null;
    return getCountdownParts(start);
  }, [event, status]);

  useEffect(() => {
    if (typeof document === "undefined" || !event) return;
    document.title = `${event.title} · BMW Club Andorra`;
  }, [event]);

  if (!eventId) return <Navigate to="/calendari" replace />;
  if (!event) return <Navigate to="/calendari" replace />;

  const quickLinks = [
    { label: `${t.agenda} ${event.year}`, href: `/calendari/${event.year}`, internal: true },
    event.galleryHref ? { label: t.photos, href: event.galleryHref, internal: true } : null,
    event.roadbook ? { label: event.roadbook.label || t.roadbook, href: event.roadbook.href, internal: false } : null,
    event.callToAction ? { label: event.callToAction.label || t.callToAction, href: event.callToAction.href, internal: false } : null,
    event.legacyHref ? { label: t.officialSource, href: event.legacyHref, internal: false } : null,
  ].filter(Boolean) as { label: string; href: string; internal: boolean }[];

  const heroSummary = event.summary || (meta ? getLocalizedText(meta.summary, language) : "");
  const aboutText = event.briefing ?? event.summary;
  const hasAbout = Boolean(aboutText || event.highlights?.length || event.notes?.length);
  const hasChecklist = Boolean(event.checklist?.length);
  const hasArchive = relatedArchive.length > 0;
  const hasSponsors = Boolean(event.sponsors?.length);

  return (
    <PageShell>
      <section className="pt-28 pb-14 section-shell">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
            <div className="glass-dark rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-elegant">
              <div className="absolute inset-0 opacity-35" style={{ backgroundImage: heroImage ? `url(${heroImage})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/35 to-primary/35" />
              <div className="relative z-10 space-y-6">
                <Link to="/calendari" className="inline-flex items-center text-sm text-white/80 hover:text-white transition-base">← {t.back}</Link>
                <div className="flex flex-wrap items-center gap-3">
                  {meta ? <span className="glass-panel rounded-full px-4 py-1 text-xs font-semibold text-slate-900">{getLocalizedText(meta.tag, language)}</span> : null}
                  <span className="rounded-full bg-white/10 border border-white/15 px-4 py-1 text-xs font-semibold">{statusLabel}</span>
                  {isPreview ? <span className="rounded-full border border-amber-300/30 bg-amber-300/15 px-4 py-1 text-xs font-semibold text-amber-100">{t.previewMode}</span> : null}
                </div>

                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-balance">{event.title}</h1>
                  {heroSummary ? <p className="mt-4 text-lg text-white/78 max-w-3xl">{heroSummary}</p> : null}
                  {isPreview ? <p className="mt-3 inline-flex rounded-2xl border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/82">{t.previewNote}</p> : null}
                </div>

                <div className={`grid gap-3 ${countdown ? "sm:grid-cols-2" : ""}`}>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.route}</p>
                    <p className="mt-2 font-semibold">{event.source.label ?? event.source.name} → {destination}</p>
                  </div>
                  {countdown ? (
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.countdown}</p>
                      <p className="mt-2 text-3xl font-bold">{`${countdown.days}d`}</p>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3">
                  {quickLinks.map((link) =>
                    link.internal ? (
                      <Link key={`${link.label}-${link.href}`} to={link.href}><Button variant="hero">{link.label}</Button></Link>
                    ) : (
                      <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer"><Button variant="outline" className="bg-white/8 text-white border-white/20 hover:bg-white/15">{link.label}</Button></a>
                    ),
                  )}
                  {isPreview ? (
                    <a href={buildEventPreviewUrl(event.id)} target="_blank" rel="noreferrer"><Button variant="outline" className="bg-white/8 text-white border-white/20 hover:bg-white/15">{t.openPreview}</Button></a>
                  ) : null}
                </div>
              </div>
            </div>

            <Card className="premium-card rounded-[2rem] p-8 border-0 shadow-elegant">
              <div className="space-y-5">
                <div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-primary" /><div><p className="text-sm text-muted-foreground">{t.status}</p><p className="font-semibold">{statusLabel}</p></div></div>
                <div className="h-px metal-line" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t.date}</p>
                  <p className="font-semibold">{formatEventDateRange(event, language)}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-secondary/70 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {t.source}</div>
                    <p className="mt-2 font-semibold">{event.source.label ?? event.source.name}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/70 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><Flag className="h-4 w-4" /> {t.destination}</div>
                    <p className="mt-2 font-semibold">{destination}</p>
                  </div>
                </div>
                {event.meetingPoint || event.meetingTime ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {event.meetingPoint ? (
                      <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Ticket className="h-4 w-4 text-primary" /> {t.meetingPoint}</div>
                        <p className="mt-2 font-semibold">{event.meetingPoint}</p>
                      </div>
                    ) : null}
                    {event.meetingTime ? (
                      <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="h-4 w-4 text-primary" /> {t.meetingTime}</div>
                        <p className="mt-2 font-semibold">{event.meetingTime}</p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {countdown ? (
                  <div className="rounded-2xl bg-primary/8 p-4">
                    <div className="text-sm text-muted-foreground">{t.countdown}</div>
                    <div className="mt-2 grid grid-cols-4 gap-3 text-center">
                      <MetricPill value={countdown.days} label="d" />
                      <MetricPill value={countdown.hours} label="h" />
                      <MetricPill value={countdown.minutes} label="m" />
                      <MetricPill value={countdown.seconds} label="s" />
                    </div>
                  </div>
                ) : null}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {hasAbout || hasChecklist ? (
        <section className="pb-12">
          <div className={`container mx-auto px-4 max-w-6xl grid gap-6 ${hasAbout && hasChecklist ? "lg:grid-cols-[1fr_1fr]" : ""}`}>
            {hasAbout ? (
              <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
                <div className="flex items-center gap-3 mb-5"><Sparkles className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.about}</h2></div>
                {aboutText ? <p className="text-base text-muted-foreground">{aboutText}</p> : null}
                {event.highlights?.length ? (
                  <div className={aboutText ? "mt-5" : ""}>
                    <div className="text-sm font-semibold">{t.highlights}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {event.highlights.map((item) => <span key={item} className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm">{item}</span>)}
                    </div>
                  </div>
                ) : null}
                {event.notes?.length ? <ul className={`${aboutText || event.highlights?.length ? "mt-5 " : ""}space-y-2 text-sm text-muted-foreground list-disc pl-5`}>{event.notes.map((note) => <li key={note}>{localizeEventNote(note, language)}</li>)}</ul> : null}
              </Card>
            ) : null}

            {hasChecklist ? (
              <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
                <div className="flex items-center gap-3 mb-5"><CheckCircle2 className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.checklist}</h2></div>
                <div className="space-y-3">
                  {event.checklist?.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasExactEventDate(event) ? (
        <section className="pb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
              <RouteWeatherPanel event={event} />
            </Card>
          </div>
        </section>
      ) : null}

      {event.timeline?.length ? (
        <section className="pb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
              <div className="flex items-center gap-3 mb-6"><Route className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.timeline}</h2></div>
              <div className="space-y-4">
                {event.timeline.map((stop, index) => (
                  <div key={`${stop.time}-${stop.title}-${index}`} className="grid grid-cols-[92px_1fr] gap-4 rounded-2xl border border-border/70 bg-background/70 p-4">
                    <div className="text-sm font-semibold text-primary">{stop.time}</div>
                    <div>
                      <div className="font-semibold">{stop.title}</div>
                      {stop.note ? <div className="mt-1 text-sm text-muted-foreground">{stop.note}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      ) : null}

      {previewImages.length ? (
        <section className={hasArchive || hasSponsors ? "pb-12" : "pb-20"}>
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
              <div className="flex items-center gap-3 mb-6"><ImageIcon className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.photos}</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewImages.map((image, index) => (
                  <a key={image.src} href={image.src} target="_blank" rel="noreferrer" className="group block rounded-2xl overflow-hidden hover-tilt relative">
                    <img src={image.src} alt={image.alt} className="h-52 w-full object-cover transition-slow group-hover:scale-[1.04]" loading="lazy" referrerPolicy="no-referrer" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent p-4 text-white text-sm opacity-0 transition-base group-hover:opacity-100">#{String(index + 1).padStart(2, "0")}</div>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </section>
      ) : null}

      {hasArchive || hasSponsors ? (
        <section className="pb-20">
          <div className={`container mx-auto px-4 max-w-6xl grid gap-6 ${hasArchive && hasSponsors ? "lg:grid-cols-[1fr_1fr]" : ""}`}>
            {hasArchive ? (
              <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
                <div className="flex items-center gap-3 mb-6"><FolderArchive className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.archive}</h2></div>
                <div className="grid gap-4">
                  {relatedArchive.map((item) => (
                    <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-border bg-white/70 p-5 hover:shadow-elegant transition-base block hover:-translate-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{item.accent}</div>
                          <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition-base">{item.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{getLocalizedText(item.summary, language)}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-primary shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
            ) : null}

            {hasSponsors ? (
              <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
                <div className="flex items-center gap-3 mb-6"><Sparkles className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.sponsors}</h2></div>
                <div className="flex flex-wrap gap-3">
                  {event.sponsors?.map((item) =>
                    item.href ? (
                      <a key={`${item.name}-${item.href}`} href={item.href} target="_blank" rel="noreferrer" className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-base">{item.name}</a>
                    ) : (
                      <span key={item.name} className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium">{item.name}</span>
                    ),
                  )}
                </div>
              </Card>
            ) : null}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
};

const MetricPill = ({ value, label }: { value: number; label: string }) => (
  <div className="rounded-2xl bg-white/10 px-3 py-3">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs uppercase tracking-[0.18em] text-white/65">{label}</div>
  </div>
);

export default EventDetail;
