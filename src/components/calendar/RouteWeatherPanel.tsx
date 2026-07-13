import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { ClubEvent, ClubLocation } from "@/content/calendarData";
import { getEventEnd, getEventStart, isForecastWindowOpen } from "@/lib/calendar";

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

const weatherCodeMap: Record<number, string> = {
  0: "Cel net",
  1: "Majoritàriament serè",
  2: "Intervals de núvols",
  3: "Ennuvolat",
  45: "Boira",
  48: "Boira gebradora",
  51: "Plugim lleuger",
  53: "Plugim moderat",
  55: "Plugim intens",
  61: "Pluja feble",
  63: "Pluja moderada",
  65: "Pluja intensa",
  71: "Neu feble",
  73: "Neu moderada",
  75: "Neu intensa",
  80: "Ruixat feble",
  81: "Ruixat moderat",
  82: "Ruixat intens",
  95: "Tempesta",
  96: "Tempesta amb pedra",
  99: "Tempesta forta amb pedra",
};

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

const formatTime = (value?: string) => {
  if (!value) return "--:--";
  const date = new Date(value);
  return new Intl.DateTimeFormat("ca-AD", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Andorra",
  }).format(date);
};

const buildUnavailable = (location: ClubLocation, note: string): WeatherPayload => ({
  kind: "unavailable",
  location,
  note,
});

const pickBestDailyIndex = (dates: string[], eventDate: string) => {
  const idx = dates.indexOf(eventDate);
  return idx >= 0 ? idx : 0;
};

const fetchWeather = async (event: ClubEvent, location: ClubLocation): Promise<WeatherPayload> => {
  const start = getEventStart(event);
  const end = getEventEnd(event) ?? start;

  if (!start || !end) {
    return buildUnavailable(location, "Sense data horària prou precisa per calcular la meteo d'aquesta ruta.");
  }

  const startDate = toDateString(start);
  const endDate = toDateString(end);
  const today = new Date();
  const isPast = end.getTime() < today.getTime();

  if (!isPast && !isForecastWindowOpen(event, today)) {
    return buildUnavailable(location, "El pronòstic detallat s'activarà quan la sortida entri dins de la finestra de 16 dies.");
  }

  const baseUrl = isPast ? "https://archive-api.open-meteo.com/v1/archive" : "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: String(location.lat),
    longitude: String(location.lon),
    timezone: "auto",
    start_date: startDate,
    end_date: endDate,
    daily: isPast
      ? "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset"
      : "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset",
  });

  if (!isPast) {
    params.set(
      "current",
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m"
    );
  }

  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

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
    note: isPast
      ? "Dades d'arxiu per al dia de la sortida."
      : "Pronòstic viu per al dia de la sortida.",
  };
};

const WeatherLocationCard = ({ title, payload }: { title: string; payload: WeatherPayload | null }) => {
  if (!payload) {
    return (
      <Card className="p-5">
        <p className="text-sm text-muted-foreground">Carregant meteo…</p>
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-3 h-full">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
        <h3 className="text-xl font-semibold">{payload.location.label ?? payload.location.name}</h3>
        <p className="text-sm text-muted-foreground">{payload.note}</p>
      </div>

      {payload.summary ? (
        <>
          <div>
            <p className="text-2xl font-bold">{payload.summary.label}</p>
            <p className="text-sm text-muted-foreground">
              {payload.summary.tempMin?.toFixed(0)}° min · {payload.summary.tempMax?.toFixed(0)}° max
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {payload.summary.currentTemp !== undefined ? (
              <div>
                <p className="text-muted-foreground">Ara</p>
                <p className="font-medium">{payload.summary.currentTemp.toFixed(0)}° · sensació {payload.summary.apparentTemp?.toFixed(0)}°</p>
              </div>
            ) : null}
            {payload.summary.humidity !== undefined ? (
              <div>
                <p className="text-muted-foreground">Humitat</p>
                <p className="font-medium">{payload.summary.humidity}%</p>
              </div>
            ) : null}
            <div>
              <p className="text-muted-foreground">Precipitació</p>
              <p className="font-medium">
                {payload.summary.precip?.toFixed(1)} mm
                {payload.summary.precipProbability !== undefined ? ` · ${payload.summary.precipProbability}%` : ""}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Vent</p>
              <p className="font-medium">
                {payload.summary.wind?.toFixed(0)} km/h
                {payload.summary.currentWind !== undefined ? ` · ara ${payload.summary.currentWind.toFixed(0)} km/h` : ""}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Sortida del sol</p>
              <p className="font-medium">{formatTime(payload.summary.sunrise)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Posta de sol</p>
              <p className="font-medium">{formatTime(payload.summary.sunset)}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Sense dades disponibles encara.</p>
      )}
    </Card>
  );
};

export const RouteWeatherPanel = ({ event }: { event: ClubEvent }) => {
  const [originWeather, setOriginWeather] = useState<WeatherPayload | null>(null);
  const [destinationWeather, setDestinationWeather] = useState<WeatherPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const destination = useMemo(() => event.destination ?? event.source, [event.destination, event.source]);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      setError(null);
      setOriginWeather(null);
      setDestinationWeather(null);

      try {
        const [origin, destinationPayload] = await Promise.all([
          fetchWeather(event, event.source),
          fetchWeather(event, destination),
        ]);

        if (!isCancelled) {
          setOriginWeather(origin);
          setDestinationWeather(destinationPayload);
        }
      } catch (loadError) {
        if (!isCancelled) {
          setError("No s'ha pogut carregar la meteo en viu ara mateix.");
        }
      }
    };

    void load();

    return () => {
      isCancelled = true;
    };
  }, [destination, event]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold">Meteo origen / destí</h3>
        <p className="text-sm text-muted-foreground">
          Comparativa meteorològica per a la ruta del {event.displayDate}. Si la sortida és llunyana, el pronòstic s'activarà dins la finestra disponible.
        </p>
      </div>

      {error ? <Card className="p-4 text-sm text-amber-700">{error}</Card> : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeatherLocationCard title="Origen" payload={originWeather} />
        <WeatherLocationCard title="Destí" payload={destinationWeather} />
      </div>
    </div>
  );
};
