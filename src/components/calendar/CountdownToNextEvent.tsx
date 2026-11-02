import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, MapPin, PauseCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { useCountdownConfig, useMergedEvents } from "@/lib/clubCms";
import { formatEventDateRange, getCountdownParts, getLastCompletedEventFromList, getNextEventFromList } from "@/lib/calendar";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { title: "Temps fins a la propera sortida", noFutureTitle: "Properes sortides", noFutureBody: "Encara no hi ha noves sortides anunciades. Quan es publiquin les dates, les trobaràs aquí.", pausedTitle: "Properes sortides", pausedBody: "Consulta el calendari per conèixer les properes sortides del club.", secondaryTitle: "Altra cita destacada", buttonCalendar: "Obrir calendari", buttonWeather: "Veure meteo origen / destí", eventDetail: "Obrir fitxa", lastEventPrefix: "L'última sortida completada va ser", days: "Dies", hours: "Hores", minutes: "Min", seconds: "Seg", route: "Ruta", season: "Temporada viva" },
  es: { title: "Tiempo hasta la próxima salida", noFutureTitle: "Próximas salidas", noFutureBody: "Todavía no hay nuevas salidas anunciadas. Cuando se publiquen las fechas, las encontrarás aquí.", pausedTitle: "Próximas salidas", pausedBody: "Consulta el calendario para conocer las próximas salidas del club.", secondaryTitle: "Otra cita destacada", buttonCalendar: "Abrir calendario", buttonWeather: "Ver meteo origen / destino", eventDetail: "Abrir ficha", lastEventPrefix: "La última salida completada fue", days: "Días", hours: "Horas", minutes: "Min", seconds: "Seg", route: "Ruta", season: "Temporada viva" },
  fr: { title: "Temps avant la prochaine sortie", noFutureTitle: "Prochaines sorties", noFutureBody: "Aucune nouvelle sortie n'est encore annoncée. Dès que les dates seront publiées, vous les trouverez ici.", pausedTitle: "Prochaines sorties", pausedBody: "Consultez le calendrier pour découvrir les prochaines sorties du club.", secondaryTitle: "Autre rendez-vous à la une", buttonCalendar: "Ouvrir le calendrier", buttonWeather: "Voir météo origine / destination", eventDetail: "Ouvrir le détail", lastEventPrefix: "La dernière sortie terminée était", days: "Jours", hours: "Heures", minutes: "Min", seconds: "Sec", route: "Itinéraire", season: "Saison active" },
  en: { title: "Time until the next outing", noFutureTitle: "Upcoming outings", noFutureBody: "No new outings have been announced yet. Once the dates are published, you'll find them here.", pausedTitle: "Upcoming outings", pausedBody: "Check the calendar for the club's next outings.", secondaryTitle: "Also featured", buttonCalendar: "Open calendar", buttonWeather: "View origin / destination weather", eventDetail: "Open detail", lastEventPrefix: "The last completed outing was", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", route: "Route", season: "Live season" },
  pt: { title: "Tempo até ao próximo passeio", noFutureTitle: "Próximos passeios", noFutureBody: "Ainda não há novos passeios anunciados. Quando as datas forem publicadas, vai encontrá-las aqui.", pausedTitle: "Próximos passeios", pausedBody: "Consulte o calendário para conhecer os próximos passeios do clube.", secondaryTitle: "Outro encontro em destaque", buttonCalendar: "Abrir calendário", buttonWeather: "Ver meteorologia origem / destino", eventDetail: "Abrir ficha", lastEventPrefix: "O último passeio concluído foi", days: "Dias", hours: "Horas", minutes: "Min", seconds: "Seg", route: "Rota", season: "Temporada ativa" },
  de: { title: "Zeit bis zur nächsten Ausfahrt", noFutureTitle: "Nächste Ausfahrten", noFutureBody: "Neue Ausfahrten wurden noch nicht angekündigt. Sobald die Termine veröffentlicht sind, erscheinen sie hier.", pausedTitle: "Nächste Ausfahrten", pausedBody: "Die nächsten Ausfahrten des Clubs stehen im Kalender.", secondaryTitle: "Weiterer Termin im Fokus", buttonCalendar: "Kalender öffnen", buttonWeather: "Wetter Start / Ziel ansehen", eventDetail: "Detail öffnen", lastEventPrefix: "Die letzte abgeschlossene Ausfahrt war", days: "Tage", hours: "Stunden", minutes: "Min", seconds: "Sek", route: "Route", season: "Aktive Saison" },
  ru: { title: "Время до следующего выезда", noFutureTitle: "Ближайшие выезды", noFutureBody: "Новые выезды пока не объявлены. Как только даты будут опубликованы, они появятся здесь.", pausedTitle: "Ближайшие выезды", pausedBody: "Ближайшие выезды клуба смотрите в календаре.", secondaryTitle: "Ещё одно событие", buttonCalendar: "Открыть календарь", buttonWeather: "Погода старта / финиша", eventDetail: "Открыть карточку", lastEventPrefix: "Последний завершённый выезд:", days: "Дни", hours: "Часы", minutes: "Мин", seconds: "Сек", route: "Маршрут", season: "Активный сезон" },
};

export const CountdownToNextEvent = () => {
  const [now, setNow] = useState(new Date());
  const { language } = useLanguage();
  const t = translations[language];
  const { data: events } = useMergedEvents();
  const { data: countdownConfig } = useCountdownConfig();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const previousEvent = useMemo(() => getLastCompletedEventFromList(events, now), [events, now]);
  const automaticNextEvent = useMemo(() => getNextEventFromList(events, now), [events, now]);

  const primaryEvent = useMemo(() => {
    if (countdownConfig.mode === "off") return null;
    if (countdownConfig.mode === "manual") {
      return (countdownConfig.primaryEventId ? events.find((event) => event.id === countdownConfig.primaryEventId) : null) ?? automaticNextEvent;
    }
    return automaticNextEvent;
  }, [automaticNextEvent, countdownConfig.mode, countdownConfig.primaryEventId, events]);

  const secondaryEvent = useMemo(() => {
    if (!countdownConfig.showSecondary || !countdownConfig.secondaryEventId) return null;
    const candidate = events.find((event) => event.id === countdownConfig.secondaryEventId) ?? null;
    if (!candidate || candidate.id === primaryEvent?.id) return null;
    return candidate;
  }, [countdownConfig.secondaryEventId, countdownConfig.showSecondary, events, primaryEvent?.id]);

  if (countdownConfig.mode === "off") {
    return (
      <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 max-w-5xl mx-auto shadow-elegant">
        <div className="flex items-center gap-3 text-primary">
          <PauseCircle className="h-5 w-5" />
          <h2 className="text-2xl font-bold">{t.pausedTitle}</h2>
        </div>
        <p className="text-muted-foreground mt-2">{t.pausedBody}</p>
      </Card>
    );
  }

  if (!primaryEvent) {
    return (
      <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 max-w-5xl mx-auto shadow-elegant">
        <h2 className="text-2xl font-bold">{t.noFutureTitle}</h2>
        <p className="text-muted-foreground mt-2">{t.noFutureBody}</p>
      </Card>
    );
  }

  const target = primaryEvent.start ? new Date(primaryEvent.start) : null;
  const countdown = target ? getCountdownParts(target, now) : null;
  const destination = primaryEvent.destination?.label ?? primaryEvent.destination?.name ?? primaryEvent.source.label ?? primaryEvent.source.name;
  const secondaryTarget = secondaryEvent?.start ? new Date(secondaryEvent.start) : null;
  const secondaryCountdown = secondaryTarget ? getCountdownParts(secondaryTarget, now) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 overflow-hidden shadow-elegant transition-base hover:-translate-y-1">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_hsl(var(--primary)/0.16),_transparent_32%)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="stat-pill">{t.title}</span>
              <span className="stat-pill stat-pill-dark">{t.season}</span>
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-balance">{primaryEvent.title}</h2>
              <p className="mt-3 text-muted-foreground">{formatEventDateRange(primaryEvent, language)}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
                  <MapPin className="h-4 w-4" /> {t.route}
                </div>
                <p className="mt-2 font-semibold text-foreground">{primaryEvent.source.label ?? primaryEvent.source.name} → {destination}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
                  <CalendarDays className="h-4 w-4" /> {primaryEvent.year}
                </div>
                {previousEvent ? <p className="mt-2 text-sm text-muted-foreground">{`${t.lastEventPrefix} ${previousEvent.title} (${previousEvent.displayDate}).`}</p> : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to={`/calendari/${primaryEvent.year}`}><Button variant="hero">{t.buttonCalendar} {primaryEvent.year}</Button></Link>
              <Link to={`/esdeveniments/${primaryEvent.id}`}><Button variant="outline">{t.eventDetail} <ArrowUpRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/meteo"><Button variant="outline">{t.buttonWeather}</Button></Link>
            </div>
          </div>

          {countdown ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-[280px] lg:max-w-[360px] w-full lg:w-auto">
              {[
                { label: t.days, value: countdown.days },
                { label: t.hours, value: countdown.hours },
                { label: t.minutes, value: countdown.minutes },
                { label: t.seconds, value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="premium-card rounded-2xl border-0 p-4 text-center shadow-sm transition-base hover:-translate-y-1">
                  <div className="text-3xl font-bold tabular-nums text-foreground">{String(item.value).padStart(2, "0")}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Card>

      {secondaryEvent && secondaryCountdown ? (
        <Card className="rounded-[1.6rem] border-0 bg-white/78 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t.secondaryTitle}</div>
              <div className="mt-2 text-2xl font-bold text-balance">{secondaryEvent.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{formatEventDateRange(secondaryEvent, language)}</div>
            </div>
            <div className="grid grid-cols-4 gap-2 min-w-[260px]">
              {[
                { label: t.days, value: secondaryCountdown.days },
                { label: t.hours, value: secondaryCountdown.hours },
                { label: t.minutes, value: secondaryCountdown.minutes },
                { label: t.seconds, value: secondaryCountdown.seconds },
              ].map((item) => (
                <div key={`secondary-${item.label}`} className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center">
                  <div className="text-2xl font-bold tabular-nums">{String(item.value).padStart(2, "0")}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
};
