import { useMemo, useState } from "react";
import { CalendarDays, Flag, MapPin, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";
import { formatEventDateRange, getNextEventFromList } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { fallbackCalendarYears, getCalendarYearsFromEvents, useMergedEvents } from "@/lib/clubCms";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Meteo de sortides", title: "Origen i destí, cara a cara", subtitle: "La meteo ja no és un widget genèric. Ara la web compara l'origen i el destí de cada sortida amb dades d'arxiu o pronòstic en viu, segons la data de l'esdeveniment.", choose: "Selecciona una sortida", chooseDesc: "Per a esdeveniments futurs dins finestra, la web mostra pronòstic. Per a sortides ja realitzades, mostra l'arxiu meteorològic del dia recuperat des del servei meteo.", livePanel: "Targetes visuals", livePanelDesc: "Cada bloc adapta la imatge de fons a la condició meteorològica i permet ampliar detalls amb un toc.", seasons: "temporades", outings: "sortides", route: "Ruta", compare: "Comparativa visual" },
  es: { eyebrow: "Meteo de salidas", title: "Origen y destino, cara a cara", subtitle: "La meteo ya no es un widget genérico. Ahora la web compara el origen y el destino de cada salida con datos de archivo o pronóstico en vivo, según la fecha del evento.", choose: "Selecciona una salida", chooseDesc: "Para eventos futuros dentro de ventana, la web muestra pronóstico. Para salidas ya realizadas, muestra el archivo meteorológico del día recuperado desde el servicio meteo.", livePanel: "Tarjetas visuales", livePanelDesc: "Cada bloque adapta la imagen de fondo a la condición meteorológica y permite ampliar detalles con un toque.", seasons: "temporadas", outings: "salidas", route: "Ruta", compare: "Comparativa visual" },
  fr: { eyebrow: "Météo des sorties", title: "Origine et destination, face à face", subtitle: "La météo n'est plus un widget générique. Le site compare désormais l'origine et la destination de chaque sortie avec des données d'archive ou des prévisions en direct selon la date de l'événement.", choose: "Sélectionnez une sortie", chooseDesc: "Pour les événements futurs dans la fenêtre disponible, le site affiche la prévision. Pour les sorties déjà réalisées, il affiche l'archive météo du jour.", livePanel: "Cartes visuelles", livePanelDesc: "Chaque bloc adapte l'image de fond à la condition météo et permet d'ouvrir plus de détails d'un simple geste.", seasons: "saisons", outings: "sorties", route: "Itinéraire", compare: "Comparatif visuel" },
  en: { eyebrow: "Outing weather", title: "Origin and destination, side by side", subtitle: "Weather is no longer a generic widget. The site now compares the origin and destination of each outing using archive data or a live forecast, depending on the event date.", choose: "Select an outing", chooseDesc: "For future events inside the forecast window, the website shows a forecast. For completed outings, it shows the archived weather for that day.", livePanel: "Visual cards", livePanelDesc: "Each block adapts its background image to the weather condition and opens richer detail on tap.", seasons: "seasons", outings: "outings", route: "Route", compare: "Visual comparison" },
  pt: { eyebrow: "Meteorologia dos passeios", title: "Origem e destino, frente a frente", subtitle: "A meteorologia já não é um widget genérico. O site compara agora a origem e o destino de cada passeio com dados de arquivo ou previsão em tempo real, consoante a data do evento.", choose: "Selecione um passeio", chooseDesc: "Para eventos futuros dentro da janela disponível, o site mostra previsão. Para passeios já realizados, mostra o arquivo meteorológico desse dia.", livePanel: "Cartões visuais", livePanelDesc: "Cada bloco adapta a imagem de fundo à condição meteorológica e permite abrir mais detalhe com um toque.", seasons: "temporadas", outings: "passeios", route: "Rota", compare: "Comparação visual" },
  de: { eyebrow: "Wetter der Ausfahrten", title: "Start und Ziel im direkten Vergleich", subtitle: "Das Wetter ist kein generisches Widget mehr. Die Website vergleicht jetzt Start und Ziel jeder Ausfahrt mit Archivdaten oder Live-Prognosen – je nach Veranstaltungsdatum.", choose: "Ausfahrt auswählen", chooseDesc: "Für zukünftige Termine innerhalb des Vorhersagefensters zeigt die Website eine Prognose. Für bereits abgeschlossene Ausfahrten zeigt sie das Wetterarchiv dieses Tages.", livePanel: "Visuelle Karten", livePanelDesc: "Jeder Block passt das Hintergrundbild an die Wetterlage an und öffnet per Tipp zusätzliche Details.", seasons: "Saisons", outings: "Ausfahrten", route: "Route", compare: "Visueller Vergleich" },
  ru: { eyebrow: "Погода выездов", title: "Старт и финиш лицом к лицу", subtitle: "Погода больше не представлена общим виджетом. Теперь сайт сравнивает точку старта и финиша каждого выезда по архивным данным или актуальному прогнозу в зависимости от даты события.", choose: "Выберите выезд", chooseDesc: "Для будущих событий в доступном окне сайт показывает прогноз. Для уже завершённых выездов отображается архив погоды за тот день.", livePanel: "Визуальные карточки", livePanelDesc: "Каждый блок подстраивает фоновое изображение под погодные условия и открывает больше деталей по нажатию.", seasons: "сезонов", outings: "выездов", route: "Маршрут", compare: "Визуальное сравнение" },
};

const Meteo = () => {
  const { data: events } = useMergedEvents();
  const nextEvent = useMemo(() => getNextEventFromList(events) ?? events.at(-1) ?? null, [events]);
  const [selectedId, setSelectedId] = useState(nextEvent?.id ?? events[0]?.id ?? "");
  const { language } = useLanguage();
  const t = translations[language];

  const availableEvents = events.filter((event) => Boolean(event.start));
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
                    <p className="mt-2 text-lg font-semibold">Origen + destino</p>
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
              <p className="mt-3 text-muted-foreground">{t.livePanelDesc}</p>
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
