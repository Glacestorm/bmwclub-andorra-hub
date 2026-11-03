import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, CloudSun, FolderArchive, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClubEvent } from "@/content/calendarData";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { formatEventDateRange, formatMonthGroup, getEventStatus, groupEventsByMonth, hasExactEventDate } from "@/lib/calendar";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";
import { localizeEventNote } from "@/components/calendar/eventNotes";
import { getCalendarYearTitle, getEventCategoryLabel, getEventDestinationLabel, getLocationLabel } from "@/components/calendar/calendarI18n";

const uiTranslations: Record<LanguageCode, Record<string, string>> = {
  ca: { live: "En curs", upcoming: "Per fer", done: "Realitzada", historic: "Històrica", showWeather: "Veure meteo", hideWeather: "Amagar meteo", photos: "Fotos", detail: "Obrir fitxa", origin: "Origen", destination: "Destí", agenda: "Agenda pública", intro: "Sortides i trobades del club ordenades per mes, amb l'origen, el destí i la meteo de cada ruta.", events: "esdeveniments", months: "Mesos amb activitat", archiveLink: "Enllaç extern" },
  es: { live: "En curso", upcoming: "Pendiente", done: "Realizada", historic: "Histórica", showWeather: "Ver meteo", hideWeather: "Ocultar meteo", photos: "Fotos", detail: "Abrir ficha", origin: "Origen", destination: "Destino", agenda: "Agenda pública", intro: "Salidas y encuentros del club ordenados por mes, con el origen, el destino y la meteo de cada ruta.", events: "eventos", months: "Meses con actividad", archiveLink: "Enlace externo" },
  fr: { live: "En cours", upcoming: "À venir", done: "Réalisée", historic: "Historique", showWeather: "Voir météo", hideWeather: "Masquer météo", photos: "Photos", detail: "Ouvrir la fiche", origin: "Origine", destination: "Destination", agenda: "Agenda public", intro: "Sorties et rencontres du club classées par mois, avec le départ, la destination et la météo de chaque parcours.", events: "événements", months: "Mois d'activité", archiveLink: "Lien externe" },
  en: { live: "Live", upcoming: "Upcoming", done: "Completed", historic: "Historic", showWeather: "View weather", hideWeather: "Hide weather", photos: "Photos", detail: "Open detail", origin: "Origin", destination: "Destination", agenda: "Public agenda", intro: "Club outings and meetups by month, with the start, destination and weather for each route.", events: "events", months: "Active months", archiveLink: "External link" },
  pt: { live: "Em curso", upcoming: "Por fazer", done: "Realizado", historic: "Histórica", showWeather: "Ver meteorologia", hideWeather: "Ocultar meteorologia", photos: "Fotos", detail: "Abrir ficha", origin: "Origem", destination: "Destino", agenda: "Agenda pública", intro: "Passeios e encontros do clube organizados por mês, com a origem, o destino e a meteorologia de cada rota.", events: "eventos", months: "Meses com atividade", archiveLink: "Ligação externa" },
  de: { live: "Läuft", upcoming: "Bevorstehend", done: "Abgeschlossen", historic: "Historisch", showWeather: "Wetter ansehen", hideWeather: "Wetter ausblenden", photos: "Fotos", detail: "Detail öffnen", origin: "Start", destination: "Ziel", agenda: "Öffentliche Agenda", intro: "Ausfahrten und Treffen des Clubs nach Monaten, mit Start, Ziel und Wetter jeder Route.", events: "Termine", months: "Monate mit Terminen", archiveLink: "Externer Link" },
  ru: { live: "Сейчас", upcoming: "Предстоит", done: "Завершено", historic: "Историческое", showWeather: "Показать погоду", hideWeather: "Скрыть погоду", photos: "Фото", detail: "Открыть карточку", origin: "Старт", destination: "Финиш", agenda: "Публичная афиша", intro: "Выезды и встречи клуба по месяцам — со стартом, финишем и погодой для каждого маршрута.", events: "событий", months: "Месяцы с событиями", archiveLink: "Внешняя ссылка" },
};

const EventCard = ({ event }: { event: ClubEvent }) => {
  const status = getEventStatus(event);
  const [showWeather, setShowWeather] = useState(event.featured ?? false);
  const { language } = useLanguage();
  const ui = uiTranslations[language];

  const statusLabel = status === "live" ? ui.live : status === "upcoming" ? ui.upcoming : status === "done" ? ui.done : ui.historic;
  const statusClass = status === "live" ? "bg-emerald-100 text-emerald-800" : status === "upcoming" ? "bg-sky-100 text-sky-800" : status === "done" ? "bg-zinc-100 text-zinc-700" : "bg-amber-100 text-amber-800";
  const destination = getEventDestinationLabel(event, language);

  return (
    <Card className="premium-card event-card-premium rounded-[1.75rem] border-0 p-6 md:p-7 shadow-sm transition-base hover:-translate-y-1 hover:shadow-elegant">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</span>
            <span className="stat-pill stat-pill-dark">{getEventCategoryLabel(event.category, language)}</span>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-balance">{event.title}</h3>
            <p className="mt-2 text-muted-foreground">{formatEventDateRange(event, language)}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary"><MapPin className="h-4 w-4" /> {ui.origin}</div>
              <p className="mt-2 font-semibold">{getLocationLabel(event.source, language)}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary"><MapPin className="h-4 w-4" /> {ui.destination}</div>
              <p className="mt-2 font-semibold">{destination}</p>
            </div>
          </div>

          {event.summary ? <p className="text-sm text-muted-foreground leading-relaxed">{event.summary}</p> : null}
          {event.notes?.length ? <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">{event.notes.map((note) => <li key={note}>{localizeEventNote(note, language)}</li>)}</ul> : null}
        </div>

        <div className="flex flex-wrap gap-2 lg:max-w-[220px] lg:justify-end">
          <Link to={`/esdeveniments/${event.id}`}><Button variant="hero" size="sm">{ui.detail} <ArrowUpRight className="ml-2 h-4 w-4" /></Button></Link>
          {hasExactEventDate(event) ? <Button variant="outline" size="sm" onClick={() => setShowWeather((value) => !value)}>{showWeather ? ui.hideWeather : ui.showWeather}</Button> : null}
          {event.galleryHref ? <Link to={event.galleryHref}><Button variant="outline" size="sm">{ui.photos}</Button></Link> : null}
          {event.legacyHref ? <a href={event.legacyHref} target="_blank" rel="noreferrer"><Button variant="outline" size="sm">{ui.archiveLink}</Button></a> : null}
        </div>
      </div>

      {showWeather && hasExactEventDate(event) ? (
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
  const yearTitle = getCalendarYearTitle(year, language);

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 space-y-8">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
          <div className="glass-dark rounded-[2rem] p-8 md:p-10 text-white overflow-hidden relative shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(207_100%_55%_/_0.25),_transparent_34%)]" />
            <div className="relative z-10 space-y-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/65">{ui.agenda}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">{yearTitle}</h1>
              <p className="text-white/78 max-w-3xl">{ui.intro}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">{ui.events}</p>
                  <p className="mt-2 text-3xl font-bold">{events.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">{ui.months}</p>
                  <p className="mt-2 text-3xl font-bold">{monthCount}</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="premium-card rounded-[2rem] border-0 p-7 md:p-8 shadow-elegant">
            <div className="flex items-center gap-3 text-primary"><CalendarDays className="h-5 w-5" /><p className="text-xs uppercase tracking-[0.25em] font-semibold">{year}</p></div>
            <h2 className="mt-4 text-3xl font-bold text-balance">{nextUpcoming?.title ?? yearTitle}</h2>
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
                <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-muted-foreground">{month}</h2>
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
