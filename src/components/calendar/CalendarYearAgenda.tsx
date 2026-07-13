import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClubEvent, yearLabels } from "@/content/calendarData";
import { formatEventDateRange, getEventStatus, groupEventsByMonth } from "@/lib/calendar";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";

const evidenceLabel: Record<ClubEvent["evidence"], string> = {
  "original-site": "Web original",
  "gallery-title": "Recull del club",
  "media-inferred": "Data inferida de fotos",
  mixed: "Fonts combinades",
};

const statusLabel = (status: ReturnType<typeof getEventStatus>) => {
  if (status === "live") return "En curs";
  if (status === "upcoming") return "Per fer";
  if (status === "done") return "Realitzada";
  return "Històrica";
};

const statusClass = (status: ReturnType<typeof getEventStatus>) => {
  if (status === "live") return "bg-emerald-100 text-emerald-800";
  if (status === "upcoming") return "bg-sky-100 text-sky-800";
  if (status === "done") return "bg-zinc-100 text-zinc-700";
  return "bg-amber-100 text-amber-800";
};

const EventCard = ({ event }: { event: ClubEvent }) => {
  const status = getEventStatus(event);
  const [showWeather, setShowWeather] = useState(event.featured ?? false);

  return (
    <Card className="p-5 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(status)}`}>{statusLabel(status)}</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground">{evidenceLabel[event.evidence]}</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold bg-secondary text-secondary-foreground">{event.category}</span>
          </div>
          <h3 className="text-2xl font-bold">{event.title}</h3>
          <p className="text-muted-foreground">{formatEventDateRange(event)}</p>
          <p className="text-sm text-muted-foreground">
            <strong>Origen:</strong> {event.source.label ?? event.source.name}
            {event.destination ? <> · <strong>Destí:</strong> {event.destination.label ?? event.destination.name}</> : null}
          </p>
          {event.summary ? <p className="text-sm text-muted-foreground">{event.summary}</p> : null}
          {event.notes?.length ? (
            <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
              {event.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Button variant="outline" size="sm" onClick={() => setShowWeather((value) => !value)}>
            {showWeather ? "Amagar meteo" : "Veure meteo"}
          </Button>
          {event.galleryHref ? (
            <Link to={event.galleryHref}>
              <Button variant="outline" size="sm">Fotos</Button>
            </Link>
          ) : null}
          {event.legacyHref ? (
            <a href={event.legacyHref} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm">Original</Button>
            </a>
          ) : null}
        </div>
      </div>

      {showWeather ? <RouteWeatherPanel event={event} /> : null}
    </Card>
  );
};

export const CalendarYearAgenda = ({ year, events }: { year: number; events: ClubEvent[] }) => {
  const grouped = useMemo(() => groupEventsByMonth(events), [events]);

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 space-y-8">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Agenda pública</p>
          <h1 className="text-4xl md:text-5xl font-bold">{yearLabels[year]}</h1>
          <p className="text-muted-foreground">
            Calendari públic amb les sortides recuperades de la web original, la galeria històrica i les dades inferides de les fotos quan el calendari antic no era accessible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {grouped.map(([month, monthEvents]) => (
            <div key={month} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-muted-foreground">{month}</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="space-y-4">
                {monthEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
