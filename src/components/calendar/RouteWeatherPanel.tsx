import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { ClubEvent, ClubLocation } from "@/content/calendarData";
import { getEventEnd, getEventStart, isForecastWindowOpen } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode, localeByLanguage } from "@/lib/i18n";

type WeatherKind = "forecast" | "archive" | "unavailable";

type WeatherPayload = {
  kind: WeatherKind;
  location: ClubLocation;
  summary?: {
    label: string;
    tempMax?: number;
    tempMin?: number;
    precip?: number;
    precipProbability?: number;
    wind?: number;
    sunrise?: string;
    sunset?: string;
    currentTemp?: number;
    apparentTemp?: number;
    humidity?: number;
    currentWind?: number;
  };
  note?: string;
};

const uiTranslations: Record<LanguageCode, Record<string, string>> = {
  ca: { title: "Meteo origen / destí", subtitle: "Comparativa meteorològica per a la ruta de la sortida. Si la sortida és llunyana, el pronòstic s'activarà dins la finestra disponible.", origin: "Origen", destination: "Destí", loading: "Carregant meteo…", unavailable: "Sense dades disponibles encara.", current: "Ara", humidity: "Humitat", precipitation: "Precipitació", wind: "Vent", sunrise: "Sortida del sol", sunset: "Posta de sol", liveNote: "Pronòstic viu per al dia de la sortida.", archiveNote: "Dades d'arxiu per al dia de la sortida.", exactDateMissing: "Sense data horària prou precisa per calcular la meteo d'aquesta ruta.", tooFar: "El pronòstic detallat s'activarà quan la sortida entri dins de la finestra de 16 dies.", error: "No s'ha pogut carregar la meteo en viu ara mateix." },
  es: { title: "Meteo origen / destino", subtitle: "Comparativa meteorológica para la ruta de la salida. Si la salida es lejana, el pronóstico se activará dentro de la ventana disponible.", origin: "Origen", destination: "Destino", loading: "Cargando meteo…", unavailable: "Todavía no hay datos disponibles.", current: "Ahora", humidity: "Humedad", precipitation: "Precipitación", wind: "Viento", sunrise: "Salida del sol", sunset: "Puesta del sol", liveNote: "Pronóstico en vivo para el día de la salida.", archiveNote: "Datos de archivo para el día de la salida.", exactDateMissing: "No hay suficiente precisión horaria para calcular la meteo de esta ruta.", tooFar: "El pronóstico detallado se activará cuando la salida entre dentro de la ventana de 16 días.", error: "No se ha podido cargar la meteo en vivo ahora mismo." },
  fr: { title: "Météo origine / destination", subtitle: "Comparatif météo pour l'itinéraire de la sortie. Si la sortie est encore lointaine, la prévision détaillée s'activera dans la fenêtre disponible.", origin: "Origine", destination: "Destination", loading: "Chargement météo…", unavailable: "Aucune donnée disponible pour le moment.", current: "Maintenant", humidity: "Humidité", precipitation: "Précipitations", wind: "Vent", sunrise: "Lever du soleil", sunset: "Coucher du soleil", liveNote: "Prévision en direct pour le jour de la sortie.", archiveNote: "Données d'archive pour le jour de la sortie.", exactDateMissing: "La date horaire n'est pas assez précise pour calculer la météo de cet itinéraire.", tooFar: "La prévision détaillée s'activera lorsque la sortie entrera dans la fenêtre des 16 jours.", error: "Impossible de charger la météo en direct pour le moment." },
  en: { title: "Origin / destination weather", subtitle: "Weather comparison for the outing route. If the outing is still far away, the detailed forecast will activate within the available forecast window.", origin: "Origin", destination: "Destination", loading: "Loading weather…", unavailable: "No data available yet.", current: "Now", humidity: "Humidity", precipitation: "Precipitation", wind: "Wind", sunrise: "Sunrise", sunset: "Sunset", liveNote: "Live forecast for the outing day.", archiveNote: "Archive data for the outing day.", exactDateMissing: "There is not enough timing precision to calculate the weather for this route.", tooFar: "The detailed forecast will activate when the outing enters the 16-day window.", error: "The live weather could not be loaded right now." },
  pt: { title: "Meteorologia origem / destino", subtitle: "Comparação meteorológica para a rota do passeio. Se o passeio estiver distante, a previsão detalhada será ativada dentro da janela disponível.", origin: "Origem", destination: "Destino", loading: "A carregar meteorologia…", unavailable: "Ainda não há dados disponíveis.", current: "Agora", humidity: "Humidade", precipitation: "Precipitação", wind: "Vento", sunrise: "Nascer do sol", sunset: "Pôr do sol", liveNote: "Previsão em tempo real para o dia do passeio.", archiveNote: "Dados de arquivo para o dia do passeio.", exactDateMissing: "Não existe precisão horária suficiente para calcular a meteorologia desta rota.", tooFar: "A previsão detalhada será ativada quando o passeio entrar na janela de 16 dias.", error: "Não foi possível carregar a meteorologia em tempo real neste momento." },
  de: { title: "Wetter Start / Ziel", subtitle: "Wettervergleich für die Route der Ausfahrt. Liegt die Ausfahrt noch zu weit in der Zukunft, wird die Detailvorhersage innerhalb des verfügbaren Zeitfensters aktiviert.", origin: "Start", destination: "Ziel", loading: "Wetter wird geladen…", unavailable: "Noch keine Daten verfügbar.", current: "Jetzt", humidity: "Luftfeuchtigkeit", precipitation: "Niederschlag", wind: "Wind", sunrise: "Sonnenaufgang", sunset: "Sonnenuntergang", liveNote: "Live-Vorhersage für den Tag der Ausfahrt.", archiveNote: "Archivdaten für den Tag der Ausfahrt.", exactDateMissing: "Es gibt nicht genügend zeitliche Präzision, um das Wetter für diese Route zu berechnen.", tooFar: "Die Detailvorhersage wird aktiviert, sobald die Ausfahrt in das 16-Tage-Fenster fällt.", error: "Das Live-Wetter konnte gerade nicht geladen werden." },
  ru: { title: "Погода старта / финиша", subtitle: "Сравнение погоды для маршрута выезда. Если событие ещё далеко, подробный прогноз появится, когда дата войдёт в доступное окно прогноза.", origin: "Старт", destination: "Финиш", loading: "Загрузка погоды…", unavailable: "Данные пока недоступны.", current: "Сейчас", humidity: "Влажность", precipitation: "Осадки", wind: "Ветер", sunrise: "Восход", sunset: "Закат", liveNote: "Актуальный прогноз на день выезда.", archiveNote: "Архивные данные за день выезда.", exactDateMissing: "Недостаточно точных данных по времени, чтобы рассчитать погоду для этого маршрута.", tooFar: "Подробный прогноз появится, когда выезд войдёт в 16-дневное окно прогноза.", error: "Не удалось загрузить погоду прямо сейчас." },
};

const weatherCodeMap: Record<number, string> = { 0: "Cel net", 1: "Majoritàriament serè", 2: "Intervals de núvols", 3: "Ennuvolat", 45: "Boira", 48: "Boira gebradora", 51: "Plugim lleuger", 53: "Plugim moderat", 55: "Plugim intens", 61: "Pluja feble", 63: "Pluja moderada", 65: "Pluja intensa", 71: "Neu feble", 73: "Neu moderada", 75: "Neu intensa", 80: "Ruixat feble", 81: "Ruixat moderat", 82: "Ruixat intens", 95: "Tempesta", 96: "Tempesta amb pedra", 99: "Tempesta forta amb pedra" };

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

const formatTime = (value: string | undefined, language: LanguageCode) => {
  if (!value) return "--:--";
  const date = new Date(value);
  return new Intl.DateTimeFormat(localeByLanguage[language], { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Andorra" }).format(date);
};

const buildUnavailable = (location: ClubLocation, note: string): WeatherPayload => ({ kind: "unavailable", location, note });
const pickBestDailyIndex = (dates: string[], eventDate: string) => { const idx = dates.indexOf(eventDate); return idx >= 0 ? idx : 0; };

const fetchWeather = async (event: ClubEvent, location: ClubLocation, ui: Record<string, string>): Promise<WeatherPayload> => {
  const start = getEventStart(event);
  const end = getEventEnd(event) ?? start;
  if (!start || !end) return buildUnavailable(location, ui.exactDateMissing);

  const startDate = toDateString(start);
  const endDate = toDateString(end);
  const today = new Date();
  const isPast = end.getTime() < today.getTime();
  if (!isPast && !isForecastWindowOpen(event, today)) return buildUnavailable(location, ui.tooFar);

  const baseUrl = isPast ? "https://archive-api.open-meteo.com/v1/archive" : "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({ latitude: String(location.lat), longitude: String(location.lon), timezone: "auto", start_date: startDate, end_date: endDate, daily: isPast ? "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset" : "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset" });
  if (!isPast) params.set("current", "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m");

  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  const idx = pickBestDailyIndex(data.daily?.time ?? [], startDate);
  const weatherCode = data.daily?.weather_code?.[idx];

  return {
    kind: isPast ? "archive" : "forecast",
    location,
    summary: {
      label: weatherCodeMap[weatherCode] ?? "Sense classificació",
      tempMax: data.daily?.temperature_2m_max?.[idx],
      tempMin: data.daily?.temperature_2m_min?.[idx],
      precip: data.daily?.precipitation_sum?.[idx],
      precipProbability: data.daily?.precipitation_probability_max?.[idx],
      wind: data.daily?.wind_speed_10m_max?.[idx],
      sunrise: data.daily?.sunrise?.[idx],
      sunset: data.daily?.sunset?.[idx],
      currentTemp: data.current?.temperature_2m,
      apparentTemp: data.current?.apparent_temperature,
      humidity: data.current?.relative_humidity_2m,
      currentWind: data.current?.wind_speed_10m,
    },
    note: isPast ? ui.archiveNote : ui.liveNote,
  };
};

const WeatherLocationCard = ({ title, payload, language }: { title: string; payload: WeatherPayload | null; language: LanguageCode }) => {
  const ui = uiTranslations[language];
  if (!payload) return <Card className="p-5"><p className="text-sm text-muted-foreground">{ui.loading}</p></Card>;

  return (
    <Card className="p-5 space-y-3 h-full">
      <div><p className="text-xs uppercase tracking-[0.2em] text-primary">{title}</p><h3 className="text-xl font-semibold">{payload.location.label ?? payload.location.name}</h3><p className="text-sm text-muted-foreground">{payload.note}</p></div>
      {payload.summary ? <><div><p className="text-2xl font-bold">{payload.summary.label}</p><p className="text-sm text-muted-foreground">{payload.summary.tempMin?.toFixed(0)}° min · {payload.summary.tempMax?.toFixed(0)}° max</p></div><div className="grid grid-cols-2 gap-3 text-sm">{payload.summary.currentTemp !== undefined ? <div><p className="text-muted-foreground">{ui.current}</p><p className="font-medium">{payload.summary.currentTemp.toFixed(0)}° · {payload.summary.apparentTemp?.toFixed(0)}°</p></div> : null}{payload.summary.humidity !== undefined ? <div><p className="text-muted-foreground">{ui.humidity}</p><p className="font-medium">{payload.summary.humidity}%</p></div> : null}<div><p className="text-muted-foreground">{ui.precipitation}</p><p className="font-medium">{payload.summary.precip?.toFixed(1)} mm{payload.summary.precipProbability !== undefined ? ` · ${payload.summary.precipProbability}%` : ""}</p></div><div><p className="text-muted-foreground">{ui.wind}</p><p className="font-medium">{payload.summary.wind?.toFixed(0)} km/h{payload.summary.currentWind !== undefined ? ` · ${payload.summary.currentWind.toFixed(0)} km/h` : ""}</p></div><div><p className="text-muted-foreground">{ui.sunrise}</p><p className="font-medium">{formatTime(payload.summary.sunrise, language)}</p></div><div><p className="text-muted-foreground">{ui.sunset}</p><p className="font-medium">{formatTime(payload.summary.sunset, language)}</p></div></div></> : <p className="text-sm text-muted-foreground">{ui.unavailable}</p>}
    </Card>
  );
};

export const RouteWeatherPanel = ({ event }: { event: ClubEvent }) => {
  const [originWeather, setOriginWeather] = useState<WeatherPayload | null>(null);
  const [destinationWeather, setDestinationWeather] = useState<WeatherPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const destination = useMemo(() => event.destination ?? event.source, [event.destination, event.source]);
  const { language } = useLanguage();
  const ui = uiTranslations[language];

  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      setError(null); setOriginWeather(null); setDestinationWeather(null);
      try {
        const [origin, destinationPayload] = await Promise.all([fetchWeather(event, event.source, ui), fetchWeather(event, destination, ui)]);
        if (!isCancelled) { setOriginWeather(origin); setDestinationWeather(destinationPayload); }
      } catch {
        if (!isCancelled) setError(ui.error);
      }
    };
    void load();
    return () => { isCancelled = true; };
  }, [destination, event, ui]);

  return (
    <div className="space-y-4">
      <div><h3 className="text-2xl font-bold">{ui.title}</h3><p className="text-sm text-muted-foreground">{ui.subtitle}</p></div>
      {error ? <Card className="p-4 text-sm text-amber-700">{error}</Card> : null}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"><WeatherLocationCard title={ui.origin} payload={originWeather} language={language} /><WeatherLocationCard title={ui.destination} payload={destinationWeather} language={language} /></div>
    </div>
  );
};
