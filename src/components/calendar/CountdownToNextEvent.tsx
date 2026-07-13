import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clubEvents } from "@/content/calendarData";
import { formatEventDateRange, getCountdownParts, getLastCompletedEvent, getNextEvent } from "@/lib/calendar";

export const CountdownToNextEvent = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const nextEvent = useMemo(() => getNextEvent(now), [now]);
  const previousEvent = useMemo(() => getLastCompletedEvent(now), [now]);

  if (!nextEvent) {
    return (
      <Card className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold">Compte enrere de temporada</h2>
        <p className="text-muted-foreground mt-2">No hi ha més sortides futures carregades ara mateix. Quan es publiquin noves dates, el comptador s'engegarà automàticament.</p>
      </Card>
    );
  }

  const target = nextEvent.start ? new Date(nextEvent.start) : null;
  const countdown = target ? getCountdownParts(target, now) : null;

  return (
    <Card className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Temps fins a la propera sortida</p>
          <h2 className="text-3xl md:text-4xl font-bold">{nextEvent.title}</h2>
          <p className="text-muted-foreground">{formatEventDateRange(nextEvent)}</p>
          <p className="text-sm text-muted-foreground">
            {previousEvent ? `L'última sortida completada va ser ${previousEvent.title} (${previousEvent.displayDate}).` : "Aquest comptador comença quan acaba una sortida i s'atura quan comença la següent."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/calendari/${nextEvent.year}`}>
              <Button variant="hero">Obrir calendari {nextEvent.year}</Button>
            </Link>
            <Link to="/meteo">
              <Button variant="outline">Veure meteo origen / destí</Button>
            </Link>
          </div>
        </div>

        {countdown ? (
          <div className="grid grid-cols-4 gap-3 min-w-[280px]">
            {[
              { label: "Dies", value: countdown.days },
              { label: "Hores", value: countdown.hours },
              { label: "Min", value: countdown.minutes },
              { label: "Seg", value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-background/90 p-4 text-center shadow-sm border border-border/70">
                <div className="text-3xl font-bold tabular-nums">{String(item.value).padStart(2, "0")}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};
