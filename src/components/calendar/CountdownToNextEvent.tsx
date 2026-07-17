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
  ca: { title: "Temps fins a la propera sortida", noFutureTitle: "Compte enrere de temporada", noFutureBody: "No hi ha més sortides futures carregades ara mateix. Quan es publiquin noves dates, el comptador s'engegarà automàticament.", pausedTitle: "Compte enrere pausat", pausedBody: "El comptador està aturat des del backoffice i no mostra cap sortida activa ara mateix.", secondaryTitle: "Següent focus", buttonCalendar: "Obrir calendari", buttonWeather: "Veure meteo origen / destí", eventDetail: "Obrir fitxa", afterLast: "Aquest comptador comença quan acaba una sortida i s'atura quan comença la següent.", lastEventPrefix: "L'última sortida completada va ser", days: "Dies", hours: "Hores", minutes: "Min", seconds: "Seg", route: "Ruta", season: "Temporada viva" },
  es: { title: "Tiempo hasta la próxima salida", noFutureTitle: "Cuenta atrás de temporada", noFutureBody: "No hay más salidas futuras cargadas ahora mismo. Cuando se publiquen nuevas fechas, el contador se activará automáticamente.", pausedTitle: "Cuenta atrás pausada", pausedBody: "El contador está detenido desde el backoffice y ahora mismo no muestra ninguna salida activa.", secondaryTitle: "Siguiente foco", buttonCalendar: "Abrir calendario", buttonWeather: "Ver meteo origen / destino", eventDetail: "Abrir ficha", afterLast: "Este contador empieza cuando termina una salida y se detiene cuando empieza la siguiente.", lastEventPrefix: "La última salida completada fue", days: "Días", hours: "Horas", minutes: "Min", seconds: "Seg", route: "Ruta", season: "Temporada viva" },
  fr: { title: "Temps avant la prochaine sortie", noFutureTitle: "Compte à rebours de la saison", noFutureBody: "Aucune autre sortie future n'est chargée pour le moment. Lorsque de nouvelles dates seront publiées, le compteur démarrera automatiquement.", pausedTitle: "Compte à rebours en pause", pausedBody: "Le compteur a été stoppé depuis le backoffice et n'affiche aucune sortie active pour le moment.", secondaryTitle: "Prochain focus", buttonCalendar: "Ouvrir le calendrier", buttonWeather: "Voir météo origine / destination", eventDetail: "Ouvrir le détail", afterLast: "Ce compteur démarre quand une sortie se termine et s'arrête quand la suivante commence.", lastEventPrefix: "La dernière sortie terminée était", days: "Jours", hours: "Heures", minutes: "Min", seconds: "Sec", route: "Itinéraire", season: "Saison active" },
  en: { title: "Time until the next outing", noFutureTitle: "Season countdown", noFutureBody: "There are no more future outings loaded right now. When new dates are published, the countdown will start automatically.", pausedTitle: "Countdown paused", pausedBody: "The countdown has been stopped from the back office and is not showing any active outing right now.", secondaryTitle: "Secondary focus", buttonCalendar: "Open calendar", buttonWeather: "View origin / destination weather", eventDetail: "Open detail", afterLast: "This countdown starts when one outing ends and stops when the next one begins.", lastEventPrefix: "The last completed outing was", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", route: "Route", season: "Live season" },
  pt: { title: "Tempo até ao próximo passeio", noFutureTitle: "Contagem decrescente da temporada", noFutureBody: "Não há mais passeios futuros carregados neste momento. Quando novas datas forem publicadas, a contagem começará automaticamente.", pausedTitle: "Contagem em pausa", pausedBody: "A contagem foi parada no backoffice e não mostra nenhum passeio ativo neste momento.", secondaryTitle: "Segundo foco", buttonCalendar: "Abrir calendário", buttonWeather: "Ver meteorologia origem / destino", eventDetail: "Abrir ficha", afterLast: "Esta contagem começa quando um passeio termina e para quando o seguinte começa.", lastEventPrefix: "O último passeio concluído foi", days: "Dias", hours: "Horas", minutes: "Min", seconds: "Seg", route: "Rota", season: "Temporada ativa" },
  de: { title: "Zeit bis zur nächsten Ausfahrt", noFutureTitle: "Saison-Countdown", noFutureBody: "Derzeit sind keine weiteren zukünftigen Ausfahrten geladen. Sobald neue Termine veröffentlicht werden, startet der Countdown automatisch.", pausedTitle: "Countdown pausiert", pausedBody: "Der Countdown wurde im Backoffice gestoppt und zeigt aktuell keine aktive Ausfahrt.", secondaryTitle: "Zweiter Fokus", buttonCalendar: "Kalender öffnen", buttonWeather: "Wetter Start / Ziel ansehen", eventDetail: "Detail öffnen", afterLast: "Dieser Countdown startet, wenn eine Ausfahrt endet, und stoppt, wenn die nächste beginnt.", lastEventPrefix: "Die letzte abgeschlossene Ausfahrt war", days: "Tage", hours: "Stunden", minutes: "Min", seconds: "Sek", route: "Route", season: "Aktive Saison" },
  ru: { title: "Время до следующего выезда", noFutureTitle: "Обратный отсчёт сезона", noFutureBody: "Сейчас больше нет загруженных будущих выездов. Когда будут опубликованы новые даты, отсчёт запустится автоматически.", pausedTitle: "Отсчёт остановлен", pausedBody: "Счётчик остановлен из бэкофиса и сейчас не показывает активный выезд.", secondaryTitle: "Второй фокус", buttonCalendar: "Открыть календарь", buttonWeather: "Погода старта / финиша", eventDetail: "Открыть карточку", afterLast: "Этот счётчик запускается после окончания одного выезда и останавливается в момент начала следующего.", lastEventPrefix: "Последний завершённый выезд:", days: "Дни", hours: "Часы", minutes: "Мин", seconds: "Сек", route: "Маршрут", season: "Активный сезон" },
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
                <p className="mt-2 text-sm text-muted-foreground">{previousEvent ? `${t.lastEventPrefix} ${previousEvent.title} (${previousEvent.displayDate}).` : t.afterLast}</p>
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
