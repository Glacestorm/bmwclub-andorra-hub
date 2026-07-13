import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, CalendarDays, FolderArchive, Image as ImageIcon, MapPin, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { archiveItems, featuredEventMeta } from "@/content/siteExperience";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { formatEventDateRange, getEventById, getEventStatus } from "@/lib/calendar";

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
  ca: { back: "Tornar a destacats", agenda: "Calendari", weather: "Meteo", photos: "Fotos", officialSource: "Font original", route: "Ruta", source: "Origen", destination: "Destí", status: "Estat", archive: "Arxiu relacionat", galleryPreview: "Previsualització de galeria", noArchive: "Encara no hi ha material documental relacionat per a aquest esdeveniment.", noGallery: "Aquest esdeveniment encara no té previsualització pròpia, però es pot consultar dins la galeria anual.", live: "En curs", upcoming: "Per fer", done: "Realitzada", historic: "Històrica", evidence: "Traçabilitat", archiveCount: "peces d'arxiu", galleryCount: "imatges de previsualització" },
  es: { back: "Volver a destacados", agenda: "Calendario", weather: "Meteo", photos: "Fotos", officialSource: "Fuente original", route: "Ruta", source: "Origen", destination: "Destino", status: "Estado", archive: "Archivo relacionado", galleryPreview: "Previsualización de galería", noArchive: "Todavía no hay material documental relacionado con este evento.", noGallery: "Este evento aún no tiene previsualización propia, pero puede consultarse dentro de la galería anual.", live: "En curso", upcoming: "Pendiente", done: "Realizada", historic: "Histórica", evidence: "Trazabilidad", archiveCount: "piezas de archivo", galleryCount: "imágenes de previsualización" },
  fr: { back: "Retour aux temps forts", agenda: "Calendrier", weather: "Météo", photos: "Photos", officialSource: "Source originale", route: "Itinéraire", source: "Origine", destination: "Destination", status: "État", archive: "Archive liée", galleryPreview: "Aperçu de galerie", noArchive: "Il n'y a pas encore de contenu documentaire associé à cet événement.", noGallery: "Cet événement n'a pas encore d'aperçu propre, mais il peut être consulté dans la galerie annuelle.", live: "En cours", upcoming: "À venir", done: "Réalisée", historic: "Historique", evidence: "Traçabilité", archiveCount: "pièces d'archive", galleryCount: "images d'aperçu" },
  en: { back: "Back to highlights", agenda: "Calendar", weather: "Weather", photos: "Photos", officialSource: "Original source", route: "Route", source: "Origin", destination: "Destination", status: "Status", archive: "Related archive", galleryPreview: "Gallery preview", noArchive: "There is no related documentary material for this event yet.", noGallery: "This event does not have its own preview yet, but it can be explored inside the annual gallery.", live: "Live", upcoming: "Upcoming", done: "Completed", historic: "Historic", evidence: "Traceability", archiveCount: "archive pieces", galleryCount: "preview images" },
  pt: { back: "Voltar aos destaques", agenda: "Calendário", weather: "Meteorologia", photos: "Fotos", officialSource: "Fonte original", route: "Rota", source: "Origem", destination: "Destino", status: "Estado", archive: "Arquivo relacionado", galleryPreview: "Pré-visualização da galeria", noArchive: "Ainda não existe material documental relacionado com este evento.", noGallery: "Este evento ainda não tem pré-visualização própria, mas pode ser consultado dentro da galeria anual.", live: "Em curso", upcoming: "Por fazer", done: "Realizado", historic: "Histórica", evidence: "Rastreabilidade", archiveCount: "peças de arquivo", galleryCount: "imagens de pré-visualização" },
  de: { back: "Zurück zu Highlights", agenda: "Kalender", weather: "Wetter", photos: "Fotos", officialSource: "Originalquelle", route: "Route", source: "Start", destination: "Ziel", status: "Status", archive: "Zugehöriges Archiv", galleryPreview: "Galerie-Vorschau", noArchive: "Für dieses Ereignis gibt es noch kein zugehöriges Dokumentmaterial.", noGallery: "Für dieses Ereignis gibt es noch keine eigene Vorschau, es kann aber in der Jahresgalerie angesehen werden.", live: "Läuft", upcoming: "Bevorstehend", done: "Abgeschlossen", historic: "Historisch", evidence: "Nachvollziehbarkeit", archiveCount: "Archivstücke", galleryCount: "Vorschaubilder" },
  ru: { back: "Назад к главному", agenda: "Календарь", weather: "Погода", photos: "Фото", officialSource: "Оригинальный источник", route: "Маршрут", source: "Старт", destination: "Финиш", status: "Статус", archive: "Связанный архив", galleryPreview: "Предпросмотр галереи", noArchive: "Связанных документальных материалов для этого события пока нет.", noGallery: "У этого события пока нет собственного превью, но его можно посмотреть в годовой галерее.", live: "Сейчас", upcoming: "Скоро", done: "Завершено", historic: "Историческое", evidence: "Прослеживаемость", archiveCount: "архивных материалов", galleryCount: "изображений превью" },
};

const EventDetail = () => {
  const { eventId } = useParams();
  const { language } = useLanguage();
  const t = translations[language];

  if (!eventId) return <Navigate to="/destacats" replace />;
  const event = getEventById(eventId);
  if (!event) return <Navigate to="/destacats" replace />;

  const meta = featuredEventMeta.find((item) => item.eventId === event.id);
  const galleryKey = event.galleryHref ? galleryPageByHref[event.galleryHref] : undefined;
  const gallerySections = galleryKey ? galleryMediaByPage[galleryKey] ?? [] : [];
  const previewImages = gallerySections.flatMap((section) => section.images).slice(0, 6);
  const relatedArchive = archiveItems.filter((item) => meta?.archiveIds?.includes(item.id));
  const status = getEventStatus(event);
  const statusLabel = status === "live" ? t.live : status === "upcoming" ? t.upcoming : status === "done" ? t.done : t.historic;
  const destination = event.destination?.label ?? event.destination?.name ?? event.source.label ?? event.source.name;

  return (
    <PageShell>
      <section className="pt-28 pb-14 section-shell">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
            <div className="glass-dark rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-elegant">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: meta?.heroImage ? `url(${meta.heroImage})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/25 to-primary/35" />
              <div className="relative z-10 space-y-6">
                <Link to="/destacats" className="inline-flex items-center text-sm text-white/80 hover:text-white transition-base">← {t.back}</Link>
                <div className="flex flex-wrap items-center gap-3">
                  {meta ? <span className="glass-panel rounded-full px-4 py-1 text-xs font-semibold text-slate-900">{getLocalizedText(meta.tag, language)}</span> : null}
                  <span className="rounded-full bg-white/10 border border-white/15 px-4 py-1 text-xs font-semibold">{statusLabel}</span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-balance">{event.title}</h1>
                  <p className="mt-4 text-lg text-white/78 max-w-3xl">{meta ? getLocalizedText(meta.summary, language) : event.summary ?? event.title}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.route}</p>
                    <p className="mt-2 font-semibold">{event.source.label ?? event.source.name} → {destination}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.galleryPreview}</p>
                    <p className="mt-2 text-3xl font-bold">{previewImages.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.archive}</p>
                    <p className="mt-2 text-3xl font-bold">{relatedArchive.length}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/calendari/${event.year}`}><Button variant="hero">{t.agenda} {event.year}</Button></Link>
                  {event.galleryHref ? <Link to={event.galleryHref}><Button variant="outline" className="bg-white/8 text-white border-white/20 hover:bg-white/15">{t.photos}</Button></Link> : null}
                  {event.legacyHref ? <a href={event.legacyHref} target="_blank" rel="noreferrer"><Button variant="outline" className="bg-white/8 text-white border-white/20 hover:bg-white/15">{t.officialSource}</Button></a> : null}
                </div>
              </div>
            </div>

            <Card className="premium-card rounded-[2rem] p-8 border-0 shadow-elegant">
              <div className="space-y-5">
                <div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-primary" /><div><p className="text-sm text-muted-foreground">{t.status}</p><p className="font-semibold">{statusLabel}</p></div></div>
                <div className="h-px metal-line" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t.route}</p>
                  <p className="font-semibold">{formatEventDateRange(event, language)}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-secondary/70 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {t.source}</div>
                    <p className="mt-2 font-semibold">{event.source.label ?? event.source.name}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/70 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {t.destination}</div>
                    <p className="mt-2 font-semibold">{destination}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> {t.evidence}</div>
                    <p className="mt-2 font-semibold">{event.evidence}</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><ImageIcon className="h-4 w-4 text-primary" /> {t.galleryCount}</div>
                    <p className="mt-2 font-semibold">{previewImages.length}</p>
                  </div>
                </div>
                {event.notes?.length ? <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">{event.notes.map((note) => <li key={note}>{note}</li>)}</ul> : null}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
            <RouteWeatherPanel event={event} />
          </Card>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
            <div className="flex items-center gap-3 mb-6"><ImageIcon className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.galleryPreview}</h2></div>
            {previewImages.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewImages.map((image, index) => (
                  <a key={image.src} href={image.src} target="_blank" rel="noreferrer" className="group block rounded-2xl overflow-hidden hover-tilt relative">
                    <img src={image.src} alt={image.alt} className="h-52 w-full object-cover transition-slow group-hover:scale-[1.04]" loading="lazy" referrerPolicy="no-referrer" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent p-4 text-white text-sm opacity-0 transition-base group-hover:opacity-100">#{String(index + 1).padStart(2, "0")}</div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{t.noGallery}</p>
            )}
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3"><FolderArchive className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">{t.archive}</h2></div>
              <span className="stat-pill">{relatedArchive.length} {t.archiveCount}</span>
            </div>
            {relatedArchive.length ? (
              <div className="grid md:grid-cols-2 gap-4">
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
            ) : (
              <p className="text-muted-foreground">{t.noArchive}</p>
            )}
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default EventDetail;
