import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, CloudSun, FolderArchive, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClubEvent, yearLabels } from "@/content/calendarData";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { formatEventDateRange, formatMonthGroup, getEventStatus, groupEventsByMonth } from "@/lib/calendar";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";

const evidenceLabelByLanguage: Record<LanguageCode, Record<ClubEvent["evidence"], string>> = {
  ca: { "original-site": "Web original", "gallery-title": "Recull del club", "media-inferred": "Data inferida de fotos", mixed: "Fonts combinades" },
  es: { "original-site": "Web original", "gallery-title": "Archivo del club", "media-inferred": "Fecha inferida por fotos", mixed: "Fuentes combinadas" },
  fr: { "original-site": "Site original", "gallery-title": "Archive du club", "media-inferred": "Date déduite des photos", mixed: "Sources combinées" },
  en: { "original-site": "Original website", "gallery-title": "Club archive", "media-inferred": "Date inferred from photos", mixed: "Combined sources" },
  pt: { "original-site": "Site original", "gallery-title": "Arquivo do clube", "media-inferred": "Data inferida por fotos", mixed: "Fontes combinadas" },
  de: { "original-site": "Originalseite", "gallery-title": "Club-Archiv", "media-inferred": "Aus Fotos abgeleitet", mixed: "Kombinierte Quellen" },
  ru: { "original-site": "Оригинальный сайт", "gallery-title": "Архив клуба", "media-inferred": "Дата восстановлена по фото", mixed: "Смешанные источники" },
};

const categoryLabelByLanguage: Record<LanguageCode, Record<ClubEvent["category"], string>> = {
  ca: { sortida: "sortida", esmorzar: "esmorzar", "cars-coffee": "cars & coffee", rally: "rally", viatge: "viatge", sopar: "sopar", historica: "històrica" },
  es: { sortida: "salida", esmorzar: "desayuno", "cars-coffee": "cars & coffee", rally: "rally", viatge: "viaje", sopar: "cena", historica: "histórica" },
  fr: { sortida: "sortie", esmorzar: "petit-déjeuner", "cars-coffee": "cars & coffee", rally: "rallye", viatge: "voyage", sopar: "dîner", historica: "historique" },
  en: { sortida: "outing", esmorzar: "breakfast", "cars-coffee": "cars & coffee", rally: "rally", viatge: "trip", sopar: "dinner", historica: "historic" },
  pt: { sortida: "passeio", esmorzar: "pequeno-almoço", "cars-coffee": "cars & coffee", rally: "rally", viatge: "viagem", sopar: "jantar", historica: "histórica" },
  de: { sortida: "Ausfahrt", esmorzar: "Frühstück", "cars-coffee": "cars & coffee", rally: "Rallye", viatge: "Reise", sopar: "Abendessen", historica: "historisch" },
  ru: { sortida: "выезд", esmorzar: "завтрак", "cars-coffee": "cars & coffee", rally: "ралли", viatge: "поездка", sopar: "ужин", historica: "история" },
};

const uiTranslations: Record<LanguageCode, Record<string, string>> = {
  ca: { live: "En curs", upcoming: "Per fer", done: "Realitzada", historic: "Històrica", showWeather: "Veure meteo", hideWeather: "Amagar meteo", photos: "Fotos", original: "Original", detail: "Obrir fitxa", origin: "Origen", destination: "Destí", agenda: "Agenda pública", intro: "Calendari públic amb les sortides recuperades de la web original, la galeria històrica i les dades inferides de les fotos quan el calendari antic no era accessible.", exactDate: "Sense data exacta", events: "esdeveniments", routes: "Rutes del club", archiveLink: "Enllaç original" },
  es: { live: "En curso", upcoming: "Pendiente", done: "Realizada", historic: "Histórica", showWeather: "Ver meteo", hideWeather: "Ocultar meteo", photos: "Fotos", original: "Original", detail: "Abrir ficha", origin: "Origen", destination: "Destino", agenda: "Agenda pública", intro: "Calendario público con las salidas recuperadas de la web original, la galería histórica y los datos inferidos de las fotos cuando el calendario antiguo no era accesible.", exactDate: "Sin fecha exacta", events: "eventos", routes: "Rutas del club", archiveLink: "Enlace original" },
  fr: { live: "En cours", upcoming: "À venir", done: "Réalisée", historic: "Historique", showWeather: "Voir météo", hideWeather: "Masquer météo", photos: "Photos", original: "Original", detail: "Ouvrir la fiche", origin: "Origine", destination: "Destination", agenda: "Agenda public", intro: "Calendrier public avec les sorties récupérées du site original, la galerie historique et les données déduites des photos lorsque l'ancien calendrier n'était pas accessible.", exactDate: "Sans date exacte", events: "événements", routes: "Parcours du club", archiveLink: "Lien original" },
  en: { live: "Live", upcoming: "Upcoming", done: "Completed", historic: "Historic", showWeather: "View weather", hideWeather: "Hide weather", photos: "Photos", original: "Original", detail: "Open detail", origin: "Origin", destination: "Destination", agenda: "Public agenda", intro: "Public calendar with outings recovered from the original site, the historical gallery and dates inferred from photos when the old calendar was not accessible.", exactDate: "No exact date", events: "events", routes: "Club routes", archiveLink: "Original link" },
  pt: { live: "Em curso", upcoming: "Por fazer", done: "Realizado", historic: "Histórica", showWeather: "Ver meteorologia", hideWeather: "Ocultar meteorologia", photos: "Fotos", original: "Original", detail: "Abrir ficha", origin: "Origem", destination: "Destino", agenda: "Agenda pública", intro: "Calendário público com os passeios recuperados do site original, a galeria histórica e os dados inferidos das fotos quando o calendário antigo não estava acessível.", exactDate: "Sem data exata", events: "eventos", routes: "Rotas do clube", archiveLink: "Ligação original" },
  de: { live: "Läuft", upcoming: "Bevorstehend", done: "Abgeschlossen", historic: "Historisch", showWeather: "Wetter ansehen", hideWeather: "Wetter ausblenden", photos: "Fotos", original: "Original", detail: "Detail öffnen", origin: "Start", destination: "Ziel", agenda: "Öffentliche Agenda", intro: "Öffentlicher Kalender mit Ausfahrten von der Originalseite, der historischen Galerie und aus Fotos abgeleiteten Daten, wenn der alte Kalender nicht erreichbar war.", exactDate: "Ohne genaues Datum", events: "Termine", routes: "Club-Routen", archiveLink: "Original-Link" },
  ru: { live: "Сейчас", upcoming: "Предстоит", done: "Завершено", historic: "Историческое", showWeather: "Показать погоду", hideWeather: "Скрыть погоду", photos: "Фото", original: "Источник", detail: "Открыть карточку", origin: "Старт", destination: "Финиш", agenda: "Публичная афиша", intro: "Публичный календарь с выездами, восстановленными с оригинального сайта, исторической галереей и данными, собранными по фотографиям, когда старый календарь был недоступен.", exactDate: "Без точной даты", events: "событий", routes: "Маршруты клуба", archiveLink: "Оригинальная ссылка" },
};

const EventCard = ({ event }: { event: ClubEvent }) => {
  const status = getEventStatus(event);
  const [showWeather, setShowWeather] = useState(event.featured ?? false);
  const { language } = useLanguage();
  const ui = uiTranslations[language];

  const statusLabel = status === "live" ? ui.live : status === "upcoming" ? ui.upcoming : status === "done" ? ui.done : ui.historic;
  const statusClass = status === "live" ? "bg-emerald-100 text-emerald-800" : status === "upcoming" ? "bg-sky-100 text-sky-800" : status === "done" ? "bg-zinc-100 text-zinc-700" : "bg-amber-100 text-amber-800";
  const destination = event.destination?.label ?? event.destination?.name ?? event.source.label ?? event.source.name;

  return (
    <Card className="premium-card event-card-premium rounded-[1.75rem] border-0 p-6 md:p-7 shadow-sm transition-base hover:-translate-y-1 hover:shadow-elegant">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</span>
            <span className="stat-pill">{evidenceLabelByLanguage[language][event.evidence]}</span>
            <span className="stat-pill stat-pill-dark">{categoryLabelByLanguage[language][event.category]}</span>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-balance">{event.title}</h3>
            <p className="mt-2 text-muted-foreground">{formatEventDateRange(event, language)}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary"><MapPin className="h-4 w-4" /> {ui.origin}</div>
              <p className="mt-2 font-semibold">{event.source.label ?? event.source.name}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary"><MapPin className="h-4 w-4" /> {ui.destination}</div>
              <p className="mt-2 font-semibold">{destination}</p>
            </div>
          </div>

          {event.summary ? <p className="text-sm text-muted-foreground leading-relaxed">{event.summary}</p> : null}
          {event.notes?.length ? <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">{event.notes.map((note) => <li key={note}>{note}</li>)}</ul> : null}
        </div>

        <div className="flex flex-wrap gap-2 lg:max-w-[220px] lg:justify-end">
          <Link to={`/esdeveniments/${event.id}`}><Button variant="hero" size="sm">{ui.detail} <ArrowUpRight className="ml-2 h-4 w-4" /></Button></Link>
          <Button variant="outline" size="sm" onClick={() => setShowWeather((value) => !value)}>{showWeather ? ui.hideWeather : ui.showWeather}</Button>
          {event.galleryHref ? <Link to={event.galleryHref}><Button variant="outline" size="sm">{ui.photos}</Button></Link> : null}
          {event.legacyHref ? <a href={event.legacyHref} target="_blank" rel="noreferrer"><Button variant="outline" size="sm">{ui.archiveLink}</Button></a> : null}
        </div>
      </div>

      {showWeather ? (
        <div className="mt-5 rounded-[1.5rem] border border-border/70 bg-white/50 p-4 md:p-5">
          <RouteWeatherPanel event={event} />
        </div>
      ) : null}
    </Card>
  );
};

export const CalendarYearAgenda = ({ year, events }: { year: number; events: ClubEvent[] }) => {
  const { language } = useLanguage();
  const ui = uiTranslations[language];
  const grouped = useMemo(() => groupEventsByMonth(events, language), [events, language]);
  const nextUpcoming = events.find((event) => getEventStatus(event) === "upcoming" || getEventStatus(event) === "live");
  const monthCount = new Set(events.map((event) => formatMonthGroup(event, language))).size;

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 space-y-8">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
          <div className="glass-dark rounded-[2rem] p-8 md:p-10 text-white overflow-hidden relative shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(207_100%_55%_/_0.25),_transparent_34%)]" />
            <div className="relative z-10 space-y-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/65">{ui.agenda}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">{yearLabels[year] ?? `Calendari ${year}`}</h1>
              <p className="text-white/78 max-w-3xl">{ui.intro}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">{ui.events}</p>
                  <p className="mt-2 text-3xl font-bold">{events.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">{ui.routes}</p>
                  <p className="mt-2 text-3xl font-bold">{monthCount}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">{year}</p>
                  <p className="mt-2 text-3xl font-bold">{grouped.length}</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="premium-card rounded-[2rem] border-0 p-7 md:p-8 shadow-elegant">
            <div className="flex items-center gap-3 text-primary"><CalendarDays className="h-5 w-5" /><p className="text-xs uppercase tracking-[0.25em] font-semibold">{year}</p></div>
            <h2 className="mt-4 text-3xl font-bold text-balance">{nextUpcoming?.title ?? yearLabels[year] ?? `Calendari ${year}`}</h2>
            <p className="mt-3 text-muted-foreground">{nextUpcoming ? formatEventDateRange(nextUpcoming, language) : ui.intro}</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><CloudSun className="h-4 w-4 text-primary" /> {ui.showWeather}</div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><FolderArchive className="h-4 w-4 text-primary" /> {ui.photos}</div>
              </div>
            </div>
            {nextUpcoming ? <Link to={`/esdeveniments/${nextUpcoming.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-base">{ui.detail} <ArrowUpRight className="h-4 w-4" /></Link> : null}
          </Card>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {grouped.map(([month, monthEvents]) => (
            <div key={month} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 metal-line" />
                <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-muted-foreground">{month === "Sense data exacta" ? ui.exactDate : month}</h2>
                <div className="h-px flex-1 metal-line" />
              </div>
              <div className="space-y-4">{monthEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
