import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calendarYears, clubEvents, yearLabels } from "@/content/calendarData";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { getEventsByYear } from "@/lib/calendar";

export const CalendarLanding = () => {
  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-5 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Calendari públic del club</p>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Sortides, esdeveniments i temporada viva</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La nova web recupera el calendari públic del club, els anys anteriors que hem pogut reconstruir i la meteo comparada d'origen i destí per a cada sortida.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/calendari/2026">
                <Button variant="hero" size="lg">Obrir 2026</Button>
              </Link>
              <Link to="/meteo">
                <Button variant="outline" size="lg">Meteo origen / destí</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <CountdownToNextEvent />
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {calendarYears.map((year) => {
              const events = getEventsByYear(year);
              const upcoming = events.filter((event) => event.start && new Date(event.start) > new Date()).length;
              return (
                <Card key={year} className="p-6 space-y-4 hover:shadow-elegant transition-all">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary">{year}</p>
                    <h2 className="text-2xl font-bold">{yearLabels[year]}</h2>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{events.length} esdeveniments recuperats</p>
                    <p>{upcoming} pendents a partir d'avui</p>
                  </div>
                  <Link to={`/calendari/${year}`}>
                    <Button variant="outline" className="w-full">Veure calendari</Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto mt-10">
            <Card className="p-6 space-y-3">
              <h2 className="text-2xl font-bold">Cobertura actual</h2>
              <p className="text-muted-foreground">
                Hem carregat {clubEvents.length} sortides i activitats públiques a partir del calendari original, els títols recuperats del recull del club i les dates inferides de les fotos quan el calendari antic retornava error.
              </p>
              <p className="text-sm text-muted-foreground">
                Les dates confirmades per la web original conserven enllaç a l'original. Les dates inferides queden marcades per evitar confusions.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
