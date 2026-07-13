import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { clubEvents } from "@/content/calendarData";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";
import { formatEventDateRange, getNextEvent } from "@/lib/calendar";

const Meteo = () => {
  const nextEvent = useMemo(() => getNextEvent() ?? clubEvents.at(-1) ?? null, []);
  const [selectedId, setSelectedId] = useState(nextEvent?.id ?? clubEvents[0]?.id ?? "");
  const selectedEvent = clubEvents.find((event) => event.id === selectedId) ?? nextEvent ?? clubEvents[0];

  return (
    <PageShell>
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Meteo de sortides</p>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Origen i destí, cara a cara</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La meteo ja no és un widget genèric. Ara la web compara l'origen i el destí de cada sortida amb dades d'arxiu o pronòstic en viu, segons la data de l'esdeveniment.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <CountdownToNextEvent />
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 space-y-6">
          <div className="max-w-5xl mx-auto">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Selecciona una sortida</h2>
                <p className="text-muted-foreground">
                  Per a esdeveniments futurs dins finestra, la web mostra pronòstic. Per a sortides ja realitzades, mostra l'arxiu meteorològic del dia recuperat des del servei meteo.
                </p>
              </div>
              <select
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm"
              >
                {clubEvents
                  .filter((event) => Boolean(event.start))
                  .map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.year} · {event.title} · {event.displayDate}
                    </option>
                  ))}
              </select>
              {selectedEvent ? (
                <div className="text-sm text-muted-foreground">
                  <strong>{selectedEvent.title}</strong> · {formatEventDateRange(selectedEvent)}
                </div>
              ) : null}
            </Card>
          </div>

          {selectedEvent ? (
            <div className="max-w-5xl mx-auto">
              <RouteWeatherPanel event={selectedEvent} />
            </div>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
};

export default Meteo;
