import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClubEvent, ClubLocation } from "@/content/calendarData";
import { getEventEnd, getEventStart, isForecastWindowOpen } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode, localeByLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type WeatherKind = "forecast" | "archive" | "unavailable";
type WeatherTheme = "clear" | "partly" | "cloudy" | "fog" | "drizzle" | "rain" | "snow" | "storm";

type WeatherPayload = {
  kind: WeatherKind;
  location: ClubLocation;
  summary?: {
    label: string;
    weatherCode?: number;
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
  ca: { title: "Meteo origen / destí", subtitle: "Comparativa meteorològica per a la ruta de la sortida. Si la sortida és llunyana, el pronòstic s'activarà dins la finestra disponible.", origin: "Origen", destination: "Destí", loading: "Carregant meteo…", unavailable: "Sense dades disponibles encara.", current: "Ara", humidity: "Humitat", precipitation: "Precipitació", wind: "Vent", sunrise: "Sortida del sol", sunset: "Posta de sol", liveNote: "Pronòstic viu per al dia de la sortida.", archiveNote: "Dades d'arxiu per al dia de la sortida.", exactDateMissing: "Sense data horària prou precisa per calcular la meteo d'aquesta ruta.", tooFar: "El pronòstic detallat s'activarà quan la sortida entri dins de la finestra de 16 dies.", error: "No s'ha pogut carregar la meteo en viu ara mateix.", forecast: "Pronòstic", archive: "Arxiu", details: "Més informació", feelsLike: "Sensació", thermalRange: "Amplitud", location: "Ubicació", openDetails: "Toca per ampliar", probability: "Probabilitat", condition: "Condició", updatedView: "Vista ampliada", currentWind: "Vent actual" },
  es: { title: "Meteo origen / destino", subtitle: "Comparativa meteorológica para la ruta de la salida. Si la salida es lejana, el pronóstico se activará dentro de la ventana disponible.", origin: "Origen", destination: "Destino", loading: "Cargando meteo…", unavailable: "Todavía no hay datos disponibles.", current: "Ahora", humidity: "Humedad", precipitation: "Precipitación", wind: "Viento", sunrise: "Salida del sol", sunset: "Puesta del sol", liveNote: "Pronóstico en vivo para el día de la salida.", archiveNote: "Datos de archivo para el día de la salida.", exactDateMissing: "No hay suficiente precisión horaria para calcular la meteo de esta ruta.", tooFar: "El pronóstico detallado se activará cuando la salida entre dentro de la ventana de 16 días.", error: "No se ha podido cargar la meteo en vivo ahora mismo.", forecast: "Pronóstico", archive: "Archivo", details: "Más información", feelsLike: "Sensación", thermalRange: "Amplitud", location: "Ubicación", openDetails: "Pulsa para ampliar", probability: "Probabilidad", condition: "Condición", updatedView: "Vista ampliada", currentWind: "Viento actual" },
  fr: { title: "Météo origine / destination", subtitle: "Comparatif météo pour l'itinéraire de la sortie. Si la sortie est encore lointaine, la prévision détaillée s'activera dans la fenêtre disponible.", origin: "Origine", destination: "Destination", loading: "Chargement météo…", unavailable: "Aucune donnée disponible pour le moment.", current: "Maintenant", humidity: "Humidité", precipitation: "Précipitations", wind: "Vent", sunrise: "Lever du soleil", sunset: "Coucher du soleil", liveNote: "Prévision en direct pour le jour de la sortie.", archiveNote: "Données d'archive pour le jour de la sortie.", exactDateMissing: "La date horaire n'est pas assez précise pour calculer la météo de cet itinéraire.", tooFar: "La prévision détaillée s'activera lorsque la sortie entrera dans la fenêtre des 16 jours.", error: "Impossible de charger la météo en direct pour le moment.", forecast: "Prévision", archive: "Archive", details: "Plus d'informations", feelsLike: "Ressenti", thermalRange: "Amplitude", location: "Lieu", openDetails: "Touchez pour agrandir", probability: "Probabilité", condition: "Condition", updatedView: "Vue détaillée", currentWind: "Vent actuel" },
  en: { title: "Origin / destination weather", subtitle: "Weather comparison for the outing route. If the outing is still far away, the detailed forecast will activate within the available forecast window.", origin: "Origin", destination: "Destination", loading: "Loading weather…", unavailable: "No data available yet.", current: "Now", humidity: "Humidity", precipitation: "Precipitation", wind: "Wind", sunrise: "Sunrise", sunset: "Sunset", liveNote: "Live forecast for the outing day.", archiveNote: "Archive data for the outing day.", exactDateMissing: "There is not enough timing precision to calculate the weather for this route.", tooFar: "The detailed forecast will activate when the outing enters the 16-day window.", error: "The live weather could not be loaded right now.", forecast: "Forecast", archive: "Archive", details: "More info", feelsLike: "Feels like", thermalRange: "Range", location: "Location", openDetails: "Tap to expand", probability: "Probability", condition: "Condition", updatedView: "Expanded view", currentWind: "Current wind" },
  pt: { title: "Meteorologia origem / destino", subtitle: "Comparação meteorológica para a rota do passeio. Se o passeio estiver distante, a previsão detalhada será ativada dentro da janela disponível.", origin: "Origem", destination: "Destino", loading: "A carregar meteorologia…", unavailable: "Ainda não há dados disponíveis.", current: "Agora", humidity: "Humidade", precipitation: "Precipitação", wind: "Vento", sunrise: "Nascer do sol", sunset: "Pôr do sol", liveNote: "Previsão em tempo real para o dia do passeio.", archiveNote: "Dados de arquivo para o dia do passeio.", exactDateMissing: "Não existe precisão horária suficiente para calcular a meteorologia desta rota.", tooFar: "A previsão detalhada será ativada quando o passeio entrar na janela de 16 dias.", error: "Não foi possível carregar a meteorologia em tempo real neste momento.", forecast: "Previsão", archive: "Arquivo", details: "Mais informação", feelsLike: "Sensação", thermalRange: "Amplitude", location: "Localização", openDetails: "Toque para ampliar", probability: "Probabilidade", condition: "Condição", updatedView: "Vista ampliada", currentWind: "Vento atual" },
  de: { title: "Wetter Start / Ziel", subtitle: "Wettervergleich für die Route der Ausfahrt. Liegt die Ausfahrt noch zu weit in der Zukunft, wird die Detailvorhersage innerhalb des verfügbaren Zeitfensters aktiviert.", origin: "Start", destination: "Ziel", loading: "Wetter wird geladen…", unavailable: "Noch keine Daten verfügbar.", current: "Jetzt", humidity: "Luftfeuchtigkeit", precipitation: "Niederschlag", wind: "Wind", sunrise: "Sonnenaufgang", sunset: "Sonnenuntergang", liveNote: "Live-Vorhersage für den Tag der Ausfahrt.", archiveNote: "Archivdaten für den Tag der Ausfahrt.", exactDateMissing: "Es gibt nicht genügend zeitliche Präzision, um das Wetter für diese Route zu berechnen.", tooFar: "Die Detailvorhersage wird aktiviert, sobald die Ausfahrt in das 16-Tage-Fenster fällt.", error: "Das Live-Wetter konnte gerade nicht geladen werden.", forecast: "Prognose", archive: "Archiv", details: "Mehr Informationen", feelsLike: "Gefühlt", thermalRange: "Spanne", location: "Ort", openDetails: "Zum Erweitern tippen", probability: "Wahrscheinlichkeit", condition: "Bedingung", updatedView: "Erweiterte Ansicht", currentWind: "Aktueller Wind" },
  ru: { title: "Погода старта / финиша", subtitle: "Сравнение погоды для маршрута выезда. Если событие ещё далеко, подробный прогноз появится, когда дата войдёт в доступное окно прогноза.", origin: "Старт", destination: "Финиш", loading: "Загрузка погоды…", unavailable: "Данные пока недоступны.", current: "Сейчас", humidity: "Влажность", precipitation: "Осадки", wind: "Ветер", sunrise: "Восход", sunset: "Закат", liveNote: "Актуальный прогноз на день выезда.", archiveNote: "Архивные данные за день выезда.", exactDateMissing: "Недостаточно точных данных по времени, чтобы рассчитать погоду для этого маршрута.", tooFar: "Подробный прогноз появится, когда выезд войдёт в 16-дневное окно прогноза.", error: "Не удалось загрузить погоду прямо сейчас.", forecast: "Прогноз", archive: "Архив", details: "Подробнее", feelsLike: "Ощущается", thermalRange: "Размах", location: "Локация", openDetails: "Нажмите для деталей", probability: "Вероятность", condition: "Состояние", updatedView: "Подробный вид", currentWind: "Текущий ветер" },
};

const weatherCodeMap: Record<number, string> = { 0: "Cel net", 1: "Majoritàriament serè", 2: "Intervals de núvols", 3: "Ennuvolat", 45: "Boira", 48: "Boira gebradora", 51: "Plugim lleuger", 53: "Plugim moderat", 55: "Plugim intens", 61: "Pluja feble", 63: "Pluja moderada", 65: "Pluja intensa", 71: "Neu feble", 73: "Neu moderada", 75: "Neu intensa", 80: "Ruixat feble", 81: "Ruixat moderat", 82: "Ruixat intens", 95: "Tempesta", 96: "Tempesta amb pedra", 99: "Tempesta forta amb pedra" };

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

const formatTime = (value: string | undefined, language: LanguageCode) => {
  if (!value) return "--:--";
  const date = new Date(value);
  return new Intl.DateTimeFormat(localeByLanguage[language], { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Andorra" }).format(date);
};

const formatCoordinate = (value: number) => value.toFixed(4);
const formatTemp = (value: number | undefined) => (value === undefined ? "--" : `${Math.round(value)}°`);
const formatSpeed = (value: number | undefined) => (value === undefined ? "--" : `${Math.round(value)} km/h`);
const formatMm = (value: number | undefined) => (value === undefined ? "--" : `${value.toFixed(1)} mm`);
const formatPercent = (value: number | undefined) => (value === undefined ? "--" : `${Math.round(value)}%`);

const buildUnavailable = (location: ClubLocation, note: string): WeatherPayload => ({ kind: "unavailable", location, note });
const pickBestDailyIndex = (dates: string[], eventDate: string) => { const idx = dates.indexOf(eventDate); return idx >= 0 ? idx : 0; };

const weatherCodeToTheme = (code?: number): WeatherTheme => {
  if (code === undefined) return "cloudy";
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partly";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code === 51 || code === 53 || code === 55) return "drizzle";
  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) return "rain";
  if (code === 71 || code === 73 || code === 75) return "snow";
  if (code === 95 || code === 96 || code === 99) return "storm";
  return "cloudy";
};

const weatherSceneSvg = (theme: WeatherTheme) => {
  const palette: Record<WeatherTheme, { skyTop: string; skyBottom: string; accent: string; cloud: string; ground: string; extra: string }> = {
    clear: { skyTop: "#0b4d9b", skyBottom: "#80d3ff", accent: "#ffd978", cloud: "rgba(255,255,255,0.18)", ground: "rgba(255,255,255,0.10)", extra: "rgba(255,255,255,0.22)" },
    partly: { skyTop: "#1c5ca8", skyBottom: "#8fd3ff", accent: "#ffd36b", cloud: "rgba(255,255,255,0.36)", ground: "rgba(255,255,255,0.10)", extra: "rgba(255,255,255,0.16)" },
    cloudy: { skyTop: "#3d546d", skyBottom: "#90a6bb", accent: "#dde6ee", cloud: "rgba(255,255,255,0.40)", ground: "rgba(255,255,255,0.10)", extra: "rgba(255,255,255,0.18)" },
    fog: { skyTop: "#5f7285", skyBottom: "#bbc7d1", accent: "#eef5fb", cloud: "rgba(255,255,255,0.28)", ground: "rgba(255,255,255,0.18)", extra: "rgba(255,255,255,0.28)" },
    drizzle: { skyTop: "#36516d", skyBottom: "#6f93ae", accent: "#d4ecff", cloud: "rgba(255,255,255,0.38)", ground: "rgba(255,255,255,0.12)", extra: "rgba(122,204,255,0.42)" },
    rain: { skyTop: "#24394f", skyBottom: "#55738f", accent: "#c5e7ff", cloud: "rgba(255,255,255,0.36)", ground: "rgba(255,255,255,0.10)", extra: "rgba(76,170,255,0.55)" },
    snow: { skyTop: "#60748b", skyBottom: "#cdd9e7", accent: "#ffffff", cloud: "rgba(255,255,255,0.50)", ground: "rgba(255,255,255,0.20)", extra: "rgba(255,255,255,0.62)" },
    storm: { skyTop: "#131b2a", skyBottom: "#44566f", accent: "#ffd45f", cloud: "rgba(255,255,255,0.22)", ground: "rgba(255,255,255,0.08)", extra: "rgba(255,212,95,0.44)" },
  };

  const p = palette[theme];
  const overlays: Record<WeatherTheme, string> = {
    clear: `<circle cx="664" cy="96" r="62" fill="${p.accent}" fill-opacity="0.95" /><circle cx="640" cy="78" r="74" fill="${p.extra}" fill-opacity="0.28" />`,
    partly: `<circle cx="660" cy="96" r="58" fill="${p.accent}" fill-opacity="0.95" /><g fill="${p.cloud}"><circle cx="592" cy="130" r="44" /><circle cx="648" cy="132" r="36" /><circle cx="626" cy="108" r="46" /><rect x="570" y="132" width="122" height="38" rx="19" /></g>`,
    cloudy: `<g fill="${p.cloud}"><circle cx="258" cy="124" r="40" /><circle cx="322" cy="112" r="52" /><circle cx="384" cy="130" r="46" /><rect x="224" y="132" width="210" height="44" rx="22" /><circle cx="538" cy="162" r="50" /><circle cx="606" cy="150" r="42" /><circle cx="666" cy="170" r="48" /><rect x="492" y="170" width="218" height="44" rx="22" /></g>`,
    fog: `<g fill="${p.extra}" fill-opacity="0.72"><rect x="80" y="164" width="640" height="20" rx="10" /><rect x="46" y="214" width="706" height="18" rx="9" /><rect x="72" y="264" width="632" height="18" rx="9" /><rect x="30" y="314" width="734" height="18" rx="9" /></g>`,
    drizzle: `<g fill="${p.cloud}"><circle cx="264" cy="124" r="44" /><circle cx="322" cy="110" r="54" /><circle cx="386" cy="126" r="48" /><rect x="224" y="132" width="214" height="48" rx="24" /></g><g stroke="${p.extra}" stroke-width="7" stroke-linecap="round"><line x1="250" y1="212" x2="230" y2="254" /><line x1="302" y1="212" x2="282" y2="254" /><line x1="354" y1="212" x2="334" y2="254" /><line x1="406" y1="212" x2="386" y2="254" /></g>`,
    rain: `<g fill="${p.cloud}"><circle cx="262" cy="122" r="46" /><circle cx="324" cy="108" r="56" /><circle cx="390" cy="126" r="50" /><rect x="218" y="134" width="224" height="50" rx="25" /></g><g stroke="${p.extra}" stroke-width="9" stroke-linecap="round"><line x1="248" y1="208" x2="224" y2="278" /><line x1="306" y1="208" x2="282" y2="278" /><line x1="364" y1="208" x2="340" y2="278" /><line x1="422" y1="208" x2="398" y2="278" /></g>`,
    snow: `<g fill="${p.cloud}"><circle cx="268" cy="120" r="44" /><circle cx="328" cy="106" r="54" /><circle cx="392" cy="124" r="48" /><rect x="226" y="132" width="220" height="48" rx="24" /></g><g fill="${p.extra}"><circle cx="246" cy="230" r="7" /><circle cx="300" cy="250" r="8" /><circle cx="350" cy="226" r="6" /><circle cx="402" cy="252" r="9" /><circle cx="450" cy="230" r="7" /><circle cx="520" cy="198" r="5" /><circle cx="584" cy="248" r="8" /></g>`,
    storm: `<g fill="${p.cloud}"><circle cx="264" cy="116" r="48" /><circle cx="330" cy="102" r="58" /><circle cx="398" cy="122" r="52" /><rect x="220" y="132" width="230" height="52" rx="26" /></g><polygon points="362,196 332,260 372,260 336,334 434,232 388,232 424,196" fill="${p.accent}" />`,
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p.skyTop}" />
          <stop offset="100%" stop-color="${p.skyBottom}" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#sky)" />
      <circle cx="130" cy="74" r="150" fill="rgba(255,255,255,0.10)" />
      <circle cx="744" cy="-12" r="186" fill="rgba(255,255,255,0.08)" />
      ${overlays[theme]}
      <path d="M0 376 C120 332 236 340 332 374 C454 418 576 422 800 356 L800 500 L0 500 Z" fill="${p.ground}" />
      <path d="M0 408 C150 378 278 384 392 420 C510 456 620 454 800 394 L800 500 L0 500 Z" fill="rgba(255,255,255,0.08)" />
    </svg>`;

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

const weatherVisualByTheme: Record<WeatherTheme, { icon: typeof Sun; pill: string; overlay: string; card: string }> = {
  clear: { icon: Sun, pill: "from-amber-300/30 to-white/10", overlay: "from-[#0b4d9b]/30 via-[#0f68b9]/40 to-[#0d1728]/80", card: "border-white/15 bg-slate-950 text-white" },
  partly: { icon: CloudSun, pill: "from-sky-300/25 to-white/10", overlay: "from-[#1d5ea8]/25 via-[#3186cf]/34 to-[#0f172a]/82", card: "border-white/15 bg-slate-950 text-white" },
  cloudy: { icon: Cloud, pill: "from-slate-200/20 to-white/10", overlay: "from-[#5a6b82]/22 via-[#51657b]/34 to-[#111827]/84", card: "border-white/12 bg-slate-950 text-white" },
  fog: { icon: CloudFog, pill: "from-slate-100/24 to-white/10", overlay: "from-[#73879a]/18 via-[#8d9aa8]/30 to-[#1f2937]/82", card: "border-white/12 bg-slate-950 text-white" },
  drizzle: { icon: CloudDrizzle, pill: "from-cyan-200/25 to-white/10", overlay: "from-[#36516d]/25 via-[#3d6988]/34 to-[#101826]/84", card: "border-white/12 bg-slate-950 text-white" },
  rain: { icon: CloudRain, pill: "from-sky-200/25 to-white/10", overlay: "from-[#24394f]/24 via-[#375a75]/38 to-[#0f172a]/86", card: "border-white/12 bg-slate-950 text-white" },
  snow: { icon: CloudSnow, pill: "from-white/30 to-sky-100/12", overlay: "from-[#65798d]/22 via-[#93a6ba]/24 to-[#172030]/84", card: "border-white/14 bg-slate-950 text-white" },
  storm: { icon: Zap, pill: "from-amber-300/28 to-white/8", overlay: "from-[#1b2232]/20 via-[#2a3546]/34 to-[#090d16]/88", card: "border-white/12 bg-slate-950 text-white" },
};

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
      weatherCode,
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

const WeatherMetric = ({ icon: Icon, label, value, subdued = false }: { icon: typeof Thermometer; label: string; value: string; subdued?: boolean }) => (
  <div className={cn("rounded-2xl border border-white/10 bg-white/6 p-3", subdued && "bg-white/4") }>
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/58">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
    <div className="mt-2 text-sm font-semibold text-white">{value}</div>
  </div>
);

const WeatherLocationCard = ({ title, payload, language }: { title: string; payload: WeatherPayload | null; language: LanguageCode }) => {
  const ui = uiTranslations[language];

  if (!payload) {
    return <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm"><p className="text-sm text-muted-foreground">{ui.loading}</p></Card>;
  }

  if (!payload.summary) {
    return (
      <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
        <h3 className="mt-3 text-xl font-semibold">{payload.location.label ?? payload.location.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{payload.note ?? ui.unavailable}</p>
      </Card>
    );
  }

  const theme = weatherCodeToTheme(payload.summary.weatherCode);
  const visual = weatherVisualByTheme[theme];
  const HeroIcon = visual.icon;
  const thermalRange = payload.summary.tempMax !== undefined && payload.summary.tempMin !== undefined
    ? `${Math.round(payload.summary.tempMax - payload.summary.tempMin)}°`
    : "--";
  const heroBackground = `${weatherSceneSvg(theme)}, linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))`;

  const trigger = (
    <button className={cn("group relative h-full overflow-hidden rounded-[2rem] border text-left shadow-elegant transition-base hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.28)]", visual.card)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", visual.overlay)} />
      <div className="absolute inset-0 opacity-90" style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/72 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/84">{title}</span>
              <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur", payload.kind === "forecast" ? "bg-emerald-400/20" : "bg-white/10")}>{payload.kind === "forecast" ? ui.forecast : ui.archive}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{payload.location.label ?? payload.location.name}</h3>
            <p className="mt-2 text-sm text-white/72">{payload.note}</p>
          </div>
          <div className={cn("rounded-2xl border border-white/16 bg-gradient-to-br px-3 py-3 text-white/90 shadow-lg backdrop-blur-sm", visual.pill)}>
            <HeroIcon className="h-8 w-8" />
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-3xl font-bold leading-none text-white md:text-4xl">{payload.summary.label}</p>
            <p className="mt-2 text-sm text-white/78">{formatTemp(payload.summary.tempMin)} min · {formatTemp(payload.summary.tempMax)} max</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <WeatherMetric icon={Thermometer} label={ui.current} value={formatTemp(payload.summary.currentTemp)} />
            <WeatherMetric icon={Gauge} label={ui.feelsLike} value={formatTemp(payload.summary.apparentTemp)} />
            <WeatherMetric icon={Droplets} label={ui.precipitation} value={formatMm(payload.summary.precip)} subdued />
            <WeatherMetric icon={Wind} label={ui.wind} value={formatSpeed(payload.summary.wind)} subdued />
          </div>

          <div className="flex items-center justify-between border-t border-white/12 pt-4 text-sm text-white/70">
            <span>{ui.openDetails}</span>
            <span className="inline-flex items-center gap-2 font-medium text-white">{ui.details} <Eye className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl overflow-hidden border-0 bg-slate-950 p-0 text-white">
        <div className="relative overflow-hidden">
          <div className={cn("absolute inset-0 bg-gradient-to-br", visual.overlay)} />
          <div className="absolute inset-0 opacity-95" style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/74 to-transparent" />
          <div className="relative z-10 p-6 md:p-8">
            <DialogHeader className="text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82">{title}</span>
                <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90", payload.kind === "forecast" ? "bg-emerald-400/20" : "bg-white/10")}>{payload.kind === "forecast" ? ui.forecast : ui.archive}</span>
              </div>
              <DialogTitle className="mt-4 text-3xl font-bold text-white">{payload.location.label ?? payload.location.name}</DialogTitle>
              <DialogDescription className="mt-2 max-w-2xl text-white/74">{ui.updatedView} · {payload.note}</DialogDescription>
            </DialogHeader>

            <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.6rem] border border-white/12 bg-black/22 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/58">{ui.condition}</p>
                    <p className="mt-2 text-3xl font-bold">{payload.summary.label}</p>
                    <p className="mt-2 text-sm text-white/70">{formatTemp(payload.summary.tempMin)} min · {formatTemp(payload.summary.tempMax)} max</p>
                  </div>
                  <div className={cn("rounded-3xl border border-white/16 bg-gradient-to-br p-4", visual.pill)}>
                    <HeroIcon className="h-10 w-10 text-white/92" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <WeatherMetric icon={Thermometer} label={ui.current} value={formatTemp(payload.summary.currentTemp)} />
                  <WeatherMetric icon={Gauge} label={ui.feelsLike} value={formatTemp(payload.summary.apparentTemp)} />
                  <WeatherMetric icon={Droplets} label={ui.humidity} value={formatPercent(payload.summary.humidity)} subdued />
                  <WeatherMetric icon={CloudRain} label={ui.probability} value={formatPercent(payload.summary.precipProbability)} subdued />
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/12 bg-black/22 p-5 backdrop-blur-sm">
                <div className="grid gap-3">
                  <WeatherMetric icon={Wind} label={ui.wind} value={formatSpeed(payload.summary.wind)} />
                  <WeatherMetric icon={Wind} label={ui.currentWind} value={formatSpeed(payload.summary.currentWind)} subdued />
                  <WeatherMetric icon={Droplets} label={ui.precipitation} value={formatMm(payload.summary.precip)} subdued />
                  <WeatherMetric icon={Thermometer} label={ui.thermalRange} value={thermalRange} subdued />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.4rem] border border-white/12 bg-white/6 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/58"><MapPin className="h-3.5 w-3.5" />{ui.location}</div>
                <p className="mt-3 text-sm font-medium text-white">{payload.location.name}</p>
                <p className="mt-1 text-xs text-white/60">{formatCoordinate(payload.location.lat)}, {formatCoordinate(payload.location.lon)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/12 bg-white/6 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/58"><Sunrise className="h-3.5 w-3.5" />{ui.sunrise}</div>
                <p className="mt-3 text-sm font-medium text-white">{formatTime(payload.summary.sunrise, language)}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/12 bg-white/6 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/58"><Sunset className="h-3.5 w-3.5" />{ui.sunset}</div>
                <p className="mt-3 text-sm font-medium text-white">{formatTime(payload.summary.sunset, language)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{ui.title}</h3>
        <p className="text-sm text-muted-foreground">{ui.subtitle}</p>
      </div>
      {error ? <Card className="rounded-[1.5rem] border-0 bg-amber-50 p-4 text-sm text-amber-700 shadow-sm">{error}</Card> : null}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WeatherLocationCard title={ui.origin} payload={originWeather} language={language} />
        <WeatherLocationCard title={ui.destination} payload={destinationWeather} language={language} />
      </div>
    </div>
  );
};
