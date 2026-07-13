import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClubEvent, yearLabels } from "@/content/calendarData";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { formatEventDateRange, getEventStatus, groupEventsByMonth } from "@/lib/calendar";
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
  ca: { live: "En curs", upcoming: "Per fer", done: "Realitzada", historic: "Històrica", showWeather: "Veure meteo", hideWeather: "Amagar meteo", photos: "Fotos", original: "Original", origin: "Origen", destination: "Destí", agenda: "Agenda pública", intro: "Calendari públic amb les sortides recuperades de la web original, la galeria històrica i les dades inferides de les fotos quan el calendari antic no era accessible.", exactDate: "Sense data exacta" },
  es: { live: "En curso", upcoming: "Pendiente", done: "Realizada", historic: "Histórica", showWeather: "Ver meteo", hideWeather: "Ocultar meteo", photos: "Fotos", original: "Original", origin: "Origen", destination: "Destino", agenda: "Agenda pública", intro: "Calendario público con las salidas recuperadas de la web original, la galería histórica y los datos inferidos de las fotos cuando el calendario antiguo no era accesible.", exactDate: "Sin fecha exacta" },
  fr: { live: "En cours", upcoming: "À venir", done: "Réalisée", historic: "Historique", showWeather: "Voir météo", hideWeather: "Masquer météo", photos: "Photos", original: "Original", origin: "Origine", destination: "Destination", agenda: "Agenda public", intro: "Calendrier public avec les sorties récupérées du site original, la galerie historique et les données déduites des photos lorsque l'ancien calendrier n'était pas accessible.", exactDate: "Sans date exacte" },
  en: { live: "Live", upcoming: "Upcoming", done: "Completed", historic: "Historic", showWeather: "View weather", hideWeather: "Hide weather", photos: "Photos", original: "Original", origin: "Origin", destination: "Destination", agenda: "Public agenda", intro: "Public calendar with outings recovered from the original site, the historical gallery and dates inferred from photos when the old calendar was not accessible.", exactDate: "No exact date" },
  pt: { live: "Em curso", upcoming: "Por fazer", done: "Realizado", historic: "Histórica", showWeather: "Ver meteorologia", hideWeather: "Ocultar meteorologia", photos: "Fotos", original: "Original", origin: "Origem", destination: "Destino", agenda: "Agenda pública", intro: "Calendário público com os passeios recuperados do site original, a galeria histórica e os dados inferidos das fotos quando o calendário antigo não estava acessível.", exactDate: "Sem data exata" },
  de: { live: "Läuft", upcoming: "Bevorstehend", done: "Abgeschlossen", historic: "Historisch", showWeather: "Wetter ansehen", hideWeather: "Wetter ausblenden", photos: "Fotos", original: "Original", origin: "Start", destination: "Ziel", agenda: "Öffentliche Agenda", intro: "Öffentlicher Kalender mit Ausfahrten von der Originalseite, der historischen Galerie und aus Fotos abgeleiteten Daten, wenn der alte Kalender nicht erreichbar war.", exactDate: "Ohne genaues Datum" },
  ru: { live: "Сейчас", upcoming: "Предстоит", done: "Завершено", historic: "Историческое", showWeather: "Показать погоду", hideWeather: "Скрыть погоду", photos: "Фото", original: "Источник", origin: "Старт", destination: "Финиш", agenda: "Публичная афиша", intro: "Публичный календарь с выездами, восстановленными с оригинального сайта, исторической галереей и данными, собранными по фотографиям, когда старый календарь был недоступен.", exactDate: "Без точной даты" },
};

const EventCard = ({ event }: { event: ClubEvent }) => {
  const status = getEventStatus(event);
  const [showWeather, setShowWeather] = useState(event.featured ?? false);
  const { language } = useLanguage();
  const ui = uiTranslations[language];

  const statusLabel = status === "live" ? ui.live : status === "upcoming" ? ui.upcoming : status === "done" ? ui.done : ui.historic;
  const statusClass = status === "live" ? "bg-emerald-100 text-emerald-800" : status === "upcoming" ? "bg-sky-100 text-sky-800" : status === "done" ? "bg-zinc-100 text-zinc-700" : "bg-amber-100 text-amber-800";

  return (
    <Card className="p-5 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground">{evidenceLabelByLanguage[language][event.evidence]}</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground">{categoryLabelByLanguage[language][event.category]}</span>
          </div>
          <h3 className="text-2xl font-bold">{event.title}</h3>
          <p className="text-muted-foreground">{formatEventDateRange(event, language)}</p>
          <p className="text-sm text-muted-foreground"><strong>{ui.origin}:</strong> {event.source.label ?? event.source.name}{event.destination ? <> · <strong>{ui.destination}:</strong> {event.destination.label ?? event.destination.name}</> : null}</p>
          {event.summary ? <p className="text-sm text-muted-foreground">{event.summary}</p> : null}
          {event.notes?.length ? <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">{event.notes.map((note) => <li key={note}>{note}</li>)}</ul> : null}
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Button variant="outline" size="sm" onClick={() => setShowWeather((value) => !value)}>{showWeather ? ui.hideWeather : ui.showWeather}</Button>
          {event.galleryHref ? <Link to={event.galleryHref}><Button variant="outline" size="sm">{ui.photos}</Button></Link> : null}
          {event.legacyHref ? <a href={event.legacyHref} target="_blank" rel="noreferrer"><Button variant="outline" size="sm">{ui.original}</Button></a> : null}
        </div>
      </div>

      {showWeather ? <RouteWeatherPanel event={event} /> : null}
    </Card>
  );
};

export const CalendarYearAgenda = ({ year, events }: { year: number; events: ClubEvent[] }) => {
  const { language } = useLanguage();
  const ui = uiTranslations[language];
  const grouped = useMemo(() => groupEventsByMonth(events, language), [events, language]);

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 space-y-8">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">{ui.agenda}</p>
          <h1 className="text-4xl md:text-5xl font-bold">{yearLabels[year]}</h1>
          <p className="text-muted-foreground">{ui.intro}</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {grouped.map(([month, monthEvents]) => (
            <div key={month} className="space-y-4">
              <div className="flex items-center gap-3"><div className="h-px flex-1 bg-border" /><h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-muted-foreground">{month === "Sense data exacta" ? ui.exactDate : month}</h2><div className="h-px flex-1 bg-border" /></div>
              <div className="space-y-4">{monthEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
