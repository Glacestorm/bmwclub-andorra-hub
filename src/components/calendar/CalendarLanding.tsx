import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, CloudSun, Flag, FolderArchive } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { getCalendarYearTitle } from "@/components/calendar/calendarI18n";
import { getEventsByYearFromList } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { fallbackCalendarYears, getCalendarYearsFromEvents, useMergedEvents } from "@/lib/clubCms";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Calendari públic del club", title: "Sortides, esdeveniments i temporada viva", subtitle: "Consulta les sortides i trobades del club any per any, amb la meteo a l'origen i al destí de cada ruta.", open2026: "Obrir 2026", weather: "Meteo origen / destí", events: "esdeveniments", pending: "pendents a partir d'avui", viewCalendar: "Veure calendari", seasonsLabel: "Temporades", spotlight: "Destacat", spotlightBody: "Consulta la data, la ruta i la meteo de cada sortida.", gallery: "Galeria de fotos" },
  es: { eyebrow: "Calendario público del club", title: "Salidas, eventos y temporada viva", subtitle: "Consulta las salidas y encuentros del club año por año, con la meteo en el origen y el destino de cada ruta.", open2026: "Abrir 2026", weather: "Meteo origen / destino", events: "eventos", pending: "pendientes a partir de hoy", viewCalendar: "Ver calendario", seasonsLabel: "Temporadas", spotlight: "Destacado", spotlightBody: "Consulta la fecha, la ruta y la meteo de cada salida.", gallery: "Galería de fotos" },
  fr: { eyebrow: "Calendrier public du club", title: "Sorties, événements et saison vivante", subtitle: "Retrouvez les sorties et rencontres du club année par année, avec la météo au départ et à l'arrivée de chaque parcours.", open2026: "Ouvrir 2026", weather: "Météo origine / destination", events: "événements", pending: "à venir à partir d'aujourd'hui", viewCalendar: "Voir le calendrier", seasonsLabel: "Saisons", spotlight: "À la une", spotlightBody: "Consultez la date, le parcours et la météo de chaque sortie.", gallery: "Galerie photos" },
  en: { eyebrow: "Public club calendar", title: "Outings, events and a live season", subtitle: "Browse the club's outings and meetups year by year, with the weather at the start and destination of each route.", open2026: "Open 2026", weather: "Origin / destination weather", events: "events", pending: "upcoming from today", viewCalendar: "View calendar", seasonsLabel: "Seasons", spotlight: "Featured", spotlightBody: "Check the date, route and weather for every outing.", gallery: "Photo gallery" },
  pt: { eyebrow: "Calendário público do clube", title: "Passeios, eventos e temporada viva", subtitle: "Consulte os passeios e encontros do clube ano a ano, com a meteorologia na origem e no destino de cada rota.", open2026: "Abrir 2026", weather: "Meteorologia origem / destino", events: "eventos", pending: "pendentes a partir de hoje", viewCalendar: "Ver calendário", seasonsLabel: "Temporadas", spotlight: "Em destaque", spotlightBody: "Consulte a data, a rota e a meteorologia de cada passeio.", gallery: "Galeria de fotos" },
  de: { eyebrow: "Öffentlicher Club-Kalender", title: "Ausfahrten, Veranstaltungen und eine lebendige Saison", subtitle: "Alle Ausfahrten und Treffen des Clubs Jahr für Jahr, mit dem Wetter an Start und Ziel jeder Route.", open2026: "2026 öffnen", weather: "Wetter Start / Ziel", events: "Termine", pending: "noch ausstehend ab heute", viewCalendar: "Kalender ansehen", seasonsLabel: "Saisons", spotlight: "Im Fokus", spotlightBody: "Datum, Route und Wetter jeder Ausfahrt auf einen Blick.", gallery: "Fotogalerie" },
  ru: { eyebrow: "Публичный календарь клуба", title: "Выезды, события и живой сезон", subtitle: "Выезды и встречи клуба по годам — с погодой в точке старта и на финише каждого маршрута.", open2026: "Открыть 2026", weather: "Погода старта / финиша", events: "событий", pending: "ещё впереди с сегодняшнего дня", viewCalendar: "Открыть календарь", seasonsLabel: "Сезоны", spotlight: "В центре внимания", spotlightBody: "Дата, маршрут и погода для каждого выезда.", gallery: "Фотогалерея" },
};

export const CalendarLanding = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { data: events } = useMergedEvents();
  const years = getCalendarYearsFromEvents(events).length ? getCalendarYearsFromEvents(events) : fallbackCalendarYears;
  const nextYearEvents = getEventsByYearFromList(events, 2026);

  return (
    <>
      <section className="section-shell pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
            <div className="glass-dark rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-elegant">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(207_100%_55%_/_0.28),_transparent_32%)]" />
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="glass-panel rounded-full px-4 py-1 text-xs font-semibold tracking-[0.24em] text-slate-900 uppercase">{t.eyebrow}</span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">{events.length} {t.events}</span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
                  <p className="mt-4 text-lg md:text-xl text-white/78 max-w-3xl">{t.subtitle}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.seasonsLabel}</p>
                    <p className="mt-2 text-3xl font-bold">{years.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">2026</p>
                    <p className="mt-2 text-3xl font-bold">{nextYearEvents.length}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to="/calendari/2026"><Button variant="hero" size="lg">{t.open2026}</Button></Link>
                  <Link to="/meteo"><Button variant="outline" size="lg" className="bg-white/8 text-white border-white/20 hover:bg-white/15">{t.weather}</Button></Link>
                </div>
              </div>
            </div>

            <Card className="premium-card rounded-[2rem] border-0 p-7 md:p-8 shadow-elegant">
              <div className="flex items-center gap-3 text-primary">
                <Flag className="h-5 w-5" />
                <p className="text-xs uppercase tracking-[0.25em] font-semibold">{t.spotlight}</p>
              </div>
              <h2 className="mt-4 text-3xl font-bold text-balance">2026 · {getCalendarYearTitle(2026, language)}</h2>
              <p className="mt-4 text-muted-foreground">{t.spotlightBody}</p>
              <div className="mt-6 space-y-3">
                <div className="premium-card rounded-2xl border-0 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4 text-primary" /> {nextYearEvents.length} {t.events}</div>
                </div>
                <div className="premium-card rounded-2xl border-0 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><CloudSun className="h-4 w-4 text-primary" /> {t.weather}</div>
                </div>
                <div className="premium-card rounded-2xl border-0 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><FolderArchive className="h-4 w-4 text-primary" /> {t.gallery}</div>
                </div>
              </div>
              <Link to="/calendari/2026" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-base">{t.viewCalendar} <ArrowUpRight className="h-4 w-4" /></Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-12"><div className="container mx-auto px-4"><CountdownToNextEvent /></div></section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {years.map((year) => {
              const eventsForYear = getEventsByYearFromList(events, year);
              const upcoming = eventsForYear.filter((event) => event.start && new Date(event.start) > new Date()).length;
              return (
                <Card key={year} className="premium-card rounded-[1.75rem] border-0 p-6 space-y-5 shadow-sm transition-base hover:-translate-y-1 hover:shadow-elegant">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">{year}</p>
                      <h2 className="mt-2 text-2xl font-bold text-balance">{getCalendarYearTitle(year, language)}</h2>
                    </div>
                    <span className="stat-pill">{eventsForYear.length}</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{eventsForYear.length} {t.events}</p>
                    {upcoming > 0 ? <p>{upcoming} {t.pending}</p> : null}
                  </div>
                  <Link to={`/calendari/${year}`}><Button variant="outline" className="w-full">{t.viewCalendar}</Button></Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
