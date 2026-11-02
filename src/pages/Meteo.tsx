import { useMemo, useState } from "react";
import { CalendarDays, Flag, MapPin, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";
import { formatEventDateRange, getNextEventFromList, hasExactEventDate } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { fallbackCalendarYears, getCalendarYearsFromEvents, useMergedEvents } from "@/lib/clubCms";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Meteo de sortides", title: "Origen i destí, cara a cara", subtitle: "Consulta el temps al punt de sortida i al destí de cada sortida del club.", choose: "Selecciona una sortida", chooseDesc: "Per a les properes sortides es mostra la previsió quan la data s'acosta. Per a les sortides ja fetes, es mostren les dades meteorològiques d'aquell dia.", livePanel: "Sortida seleccionada", seasons: "temporades", outings: "sortides", route: "Ruta", compare: "Comparació", compareValue: "Origen i destí" },
  es: { eyebrow: "Meteo de salidas", title: "Origen y destino, cara a cara", subtitle: "Consulta el tiempo en el punto de salida y en el destino de cada salida del club.", choose: "Selecciona una salida", chooseDesc: "Para las próximas salidas se muestra la previsión cuando la fecha se acerca. Para las salidas ya realizadas, se muestran los datos meteorológicos de ese día.", livePanel: "Salida seleccionada", seasons: "temporadas", outings: "salidas", route: "Ruta", compare: "Comparación", compareValue: "Origen y destino" },
  fr: { eyebrow: "Météo des sorties", title: "Origine et destination, face à face", subtitle: "Consultez la météo au point de départ et à destination de chaque sortie du club.", choose: "Sélectionnez une sortie", chooseDesc: "Pour les prochaines sorties, la prévision s'affiche à l'approche de la date. Pour les sorties déjà réalisées, ce sont les données météo du jour qui s'affichent.", livePanel: "Sortie sélectionnée", seasons: "saisons", outings: "sorties", route: "Itinéraire", compare: "Comparaison", compareValue: "Origine et destination" },
  en: { eyebrow: "Outing weather", title: "Origin and destination, side by side", subtitle: "Check the weather at the starting point and destination of each club outing.", choose: "Select an outing", chooseDesc: "For upcoming outings, the forecast appears as the date gets closer. For past outings, you'll see the weather recorded on that day.", livePanel: "Selected outing", seasons: "seasons", outings: "outings", route: "Route", compare: "Comparison", compareValue: "Origin and destination" },
  pt: { eyebrow: "Meteorologia dos passeios", title: "Origem e destino, frente a frente", subtitle: "Consulte o tempo no ponto de partida e no destino de cada passeio do clube.", choose: "Selecione um passeio", chooseDesc: "Para os próximos passeios, a previsão aparece quando a data se aproxima. Para os passeios já realizados, são mostrados os dados meteorológicos desse dia.", livePanel: "Passeio selecionado", seasons: "temporadas", outings: "passeios", route: "Rota", compare: "Comparação", compareValue: "Origem e destino" },
  de: { eyebrow: "Wetter der Ausfahrten", title: "Start und Ziel im direkten Vergleich", subtitle: "Sehen Sie das Wetter am Start- und Zielort jeder Clubausfahrt.", choose: "Ausfahrt auswählen", chooseDesc: "Für kommende Ausfahrten wird die Vorhersage angezeigt, sobald der Termin näher rückt. Für vergangene Ausfahrten werden die Wetterdaten des jeweiligen Tages angezeigt.", livePanel: "Ausgewählte Ausfahrt", seasons: "Saisons", outings: "Ausfahrten", route: "Route", compare: "Vergleich", compareValue: "Start und Ziel" },
  ru: { eyebrow: "Погода выездов", title: "Старт и финиш лицом к лицу", subtitle: "Погода в точке старта и в пункте назначения каждого выезда клуба.", choose: "Выберите выезд", chooseDesc: "Для предстоящих выездов прогноз появляется по мере приближения даты. Для уже прошедших выездов показываются погодные данные за тот день.", livePanel: "Выбранный выезд", seasons: "сезонов", outings: "выездов", route: "Маршрут", compare: "Сравнение", compareValue: "Старт и финиш" },
};

const Meteo = () => {
  const { data: events } = useMergedEvents();
  const nextEvent = useMemo(() => getNextEventFromList(events) ?? events.at(-1) ?? null, [events]);
  const [selectedId, setSelectedId] = useState(nextEvent?.id ?? events[0]?.id ?? "");
  const { language } = useLanguage();
  const t = translations[language];

  const availableEvents = events.filter(hasExactEventDate);
  const selectedEvent = availableEvents.find((event) => event.id === selectedId) ?? nextEvent ?? availableEvents[0];
  const years = getCalendarYearsFromEvents(events).length ? getCalendarYearsFromEvents(events) : fallbackCalendarYears;

  return (
    <PageShell>
      <section className="section-shell pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="glass-dark relative overflow-hidden rounded-[2rem] p-8 text-white shadow-elegant md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(125,211,252,.18),transparent_22%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,.12),transparent_18%)]" />
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="glass-panel rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">{t.eyebrow}</span>
                  <span className="rounded-full border border-white/14 bg-white/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/82">{events.length} {t.outings}</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-balance md:text-6xl">{t.title}</h1>
                  <p className="mt-4 max-w-3xl text-lg text-white/78 md:text-xl">{t.subtitle}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/58">{t.seasons}</p>
                    <p className="mt-2 text-3xl font-bold">{years.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/58">{t.outings}</p>
                    <p className="mt-2 text-3xl font-bold">{availableEvents.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/58">{t.compare}</p>
                    <p className="mt-2 text-lg font-semibold">{t.compareValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="premium-card rounded-[2rem] border-0 p-7 shadow-elegant md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t.livePanel}
              </div>
              <h2 className="mt-4 text-3xl font-bold text-balance">{selectedEvent?.title ?? t.choose}</h2>
              {selectedEvent ? (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4 text-primary" /> {formatEventDateRange(selectedEvent, language)}</div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {selectedEvent.source.name}{selectedEvent.destination ? ` → ${selectedEvent.destination.name}` : ""}</div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><Flag className="h-4 w-4 text-primary" /> {t.route}: {selectedEvent.category}</div>
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-12"><div className="container mx-auto px-4"><CountdownToNextEvent /></div></section>

      <section className="pb-20">
        <div className="container mx-auto space-y-6 px-4">
          <div className="mx-auto max-w-5xl">
            <Card className="premium-card rounded-[2rem] border-0 p-6 shadow-sm">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{t.choose}</h2>
                <p className="text-muted-foreground">{t.chooseDesc}</p>
              </div>
              <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="mt-5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm">
                {availableEvents.map((event) => <option key={event.id} value={event.id}>{event.year} · {event.title} · {event.displayDate}</option>)}
              </select>
              {selectedEvent ? <div className="mt-4 text-sm text-muted-foreground"><strong>{selectedEvent.title}</strong> · {formatEventDateRange(selectedEvent, language)}</div> : null}
            </Card>
          </div>
          {selectedEvent ? <div className="mx-auto max-w-5xl"><RouteWeatherPanel event={selectedEvent} /></div> : null}
        </div>
      </section>
    </PageShell>
  );
};

export default Meteo;
