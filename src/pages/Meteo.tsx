import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { clubEvents } from "@/content/calendarData";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { RouteWeatherPanel } from "@/components/calendar/RouteWeatherPanel";
import { formatEventDateRange, getNextEvent } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Meteo de sortides", title: "Origen i destí, cara a cara", subtitle: "La meteo ja no és un widget genèric. Ara la web compara l'origen i el destí de cada sortida amb dades d'arxiu o pronòstic en viu, segons la data de l'esdeveniment.", choose: "Selecciona una sortida", chooseDesc: "Per a esdeveniments futurs dins finestra, la web mostra pronòstic. Per a sortides ja realitzades, mostra l'arxiu meteorològic del dia recuperat des del servei meteo." },
  es: { eyebrow: "Meteo de salidas", title: "Origen y destino, cara a cara", subtitle: "La meteo ya no es un widget genérico. Ahora la web compara el origen y el destino de cada salida con datos de archivo o pronóstico en vivo, según la fecha del evento.", choose: "Selecciona una salida", chooseDesc: "Para eventos futuros dentro de ventana, la web muestra pronóstico. Para salidas ya realizadas, muestra el archivo meteorológico del día recuperado desde el servicio meteo." },
  fr: { eyebrow: "Météo des sorties", title: "Origine et destination, face à face", subtitle: "La météo n'est plus un widget générique. Le site compare désormais l'origine et la destination de chaque sortie avec des données d'archive ou des prévisions en direct selon la date de l'événement.", choose: "Sélectionnez une sortie", chooseDesc: "Pour les événements futurs dans la fenêtre disponible, le site affiche la prévision. Pour les sorties déjà réalisées, il affiche l'archive météo du jour." },
  en: { eyebrow: "Outing weather", title: "Origin and destination, side by side", subtitle: "Weather is no longer a generic widget. The site now compares the origin and destination of each outing using archive data or a live forecast, depending on the event date.", choose: "Select an outing", chooseDesc: "For future events inside the forecast window, the website shows a forecast. For completed outings, it shows the archived weather for that day." },
  pt: { eyebrow: "Meteorologia dos passeios", title: "Origem e destino, frente a frente", subtitle: "A meteorologia já não é um widget genérico. O site compara agora a origem e o destino de cada passeio com dados de arquivo ou previsão em tempo real, consoante a data do evento.", choose: "Selecione um passeio", chooseDesc: "Para eventos futuros dentro da janela disponível, o site mostra previsão. Para passeios já realizados, mostra o arquivo meteorológico desse dia." },
  de: { eyebrow: "Wetter der Ausfahrten", title: "Start und Ziel im direkten Vergleich", subtitle: "Das Wetter ist kein generisches Widget mehr. Die Website vergleicht jetzt Start und Ziel jeder Ausfahrt mit Archivdaten oder Live-Prognosen – je nach Veranstaltungsdatum.", choose: "Ausfahrt auswählen", chooseDesc: "Für zukünftige Termine innerhalb des Vorhersagefensters zeigt die Website eine Prognose. Für bereits abgeschlossene Ausfahrten zeigt sie das Wetterarchiv dieses Tages." },
  ru: { eyebrow: "Погода выездов", title: "Старт и финиш лицом к лицу", subtitle: "Погода больше не представлена общим виджетом. Теперь сайт сравнивает точку старта и финиша каждого выезда по архивным данным или актуальному прогнозу в зависимости от даты события.", choose: "Выберите выезд", chooseDesc: "Для будущих событий в доступном окне сайт показывает прогноз. Для уже завершённых выездов отображается архив погоды за тот день." },
};

const Meteo = () => {
  const nextEvent = useMemo(() => getNextEvent() ?? clubEvents.at(-1) ?? null, []);
  const [selectedId, setSelectedId] = useState(nextEvent?.id ?? clubEvents[0]?.id ?? "");
  const selectedEvent = clubEvents.find((event) => event.id === selectedId) ?? nextEvent ?? clubEvents[0];
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageShell>
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4"><div className="max-w-5xl mx-auto text-center space-y-5"><p className="text-sm uppercase tracking-[0.25em] text-primary">{t.eyebrow}</p><h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1><p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p></div></div>
      </section>

      <section className="pb-12"><div className="container mx-auto px-4"><CountdownToNextEvent /></div></section>

      <section className="pb-20">
        <div className="container mx-auto px-4 space-y-6">
          <div className="max-w-5xl mx-auto"><Card className="p-6 space-y-4"><div className="space-y-2"><h2 className="text-2xl font-bold">{t.choose}</h2><p className="text-muted-foreground">{t.chooseDesc}</p></div><select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm">{clubEvents.filter((event) => Boolean(event.start)).map((event) => <option key={event.id} value={event.id}>{event.year} · {event.title} · {event.displayDate}</option>)}</select>{selectedEvent ? <div className="text-sm text-muted-foreground"><strong>{selectedEvent.title}</strong> · {formatEventDateRange(selectedEvent, language)}</div> : null}</Card></div>
          {selectedEvent ? <div className="max-w-5xl mx-auto"><RouteWeatherPanel event={selectedEvent} /></div> : null}
        </div>
      </section>
    </PageShell>
  );
};

export default Meteo;
