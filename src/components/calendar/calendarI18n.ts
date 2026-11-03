import { ClubEvent, ClubLocation, yearLabels } from "@/content/calendarData";
import { LanguageCode } from "@/lib/i18n";

// Calendar and weather data is stored in Catalan (calendarData.ts and the backoffice); these helpers
// translate the generic parts at render time. Event titles and real place names are never translated.

// ---------- Weather (Open-Meteo WMO weather codes) ----------

const weatherConditionByCode: Record<number, Record<LanguageCode, string>> = {
  0: { ca: "Cel net", es: "Cielo despejado", fr: "Ciel dégagé", en: "Clear sky", pt: "Céu limpo", de: "Klarer Himmel", ru: "Ясно" },
  1: { ca: "Majoritàriament serè", es: "Mayormente despejado", fr: "Plutôt dégagé", en: "Mainly clear", pt: "Predominantemente limpo", de: "Überwiegend klar", ru: "Преимущественно ясно" },
  2: { ca: "Intervals de núvols", es: "Intervalos nubosos", fr: "Partiellement nuageux", en: "Partly cloudy", pt: "Parcialmente nublado", de: "Teilweise bewölkt", ru: "Переменная облачность" },
  3: { ca: "Ennuvolat", es: "Nublado", fr: "Couvert", en: "Overcast", pt: "Nublado", de: "Bedeckt", ru: "Пасмурно" },
  45: { ca: "Boira", es: "Niebla", fr: "Brouillard", en: "Fog", pt: "Nevoeiro", de: "Nebel", ru: "Туман" },
  48: { ca: "Boira gebradora", es: "Niebla con escarcha", fr: "Brouillard givrant", en: "Freezing fog", pt: "Nevoeiro com geada", de: "Gefrierender Nebel", ru: "Туман с изморозью" },
  51: { ca: "Plugim lleuger", es: "Llovizna ligera", fr: "Bruine légère", en: "Light drizzle", pt: "Chuvisco fraco", de: "Leichter Nieselregen", ru: "Слабая морось" },
  53: { ca: "Plugim moderat", es: "Llovizna moderada", fr: "Bruine modérée", en: "Moderate drizzle", pt: "Chuvisco moderado", de: "Mäßiger Nieselregen", ru: "Умеренная морось" },
  55: { ca: "Plugim intens", es: "Llovizna intensa", fr: "Bruine dense", en: "Heavy drizzle", pt: "Chuvisco intenso", de: "Starker Nieselregen", ru: "Сильная морось" },
  56: { ca: "Plugim gelat lleuger", es: "Llovizna helada ligera", fr: "Bruine verglaçante légère", en: "Light freezing drizzle", pt: "Chuvisco gelado fraco", de: "Leichter gefrierender Nieselregen", ru: "Слабая ледяная морось" },
  57: { ca: "Plugim gelat intens", es: "Llovizna helada intensa", fr: "Bruine verglaçante dense", en: "Heavy freezing drizzle", pt: "Chuvisco gelado intenso", de: "Starker gefrierender Nieselregen", ru: "Сильная ледяная морось" },
  61: { ca: "Pluja feble", es: "Lluvia débil", fr: "Pluie faible", en: "Light rain", pt: "Chuva fraca", de: "Leichter Regen", ru: "Небольшой дождь" },
  63: { ca: "Pluja moderada", es: "Lluvia moderada", fr: "Pluie modérée", en: "Moderate rain", pt: "Chuva moderada", de: "Mäßiger Regen", ru: "Умеренный дождь" },
  65: { ca: "Pluja intensa", es: "Lluvia intensa", fr: "Pluie forte", en: "Heavy rain", pt: "Chuva forte", de: "Starker Regen", ru: "Сильный дождь" },
  66: { ca: "Pluja gelada feble", es: "Lluvia helada débil", fr: "Pluie verglaçante faible", en: "Light freezing rain", pt: "Chuva gelada fraca", de: "Leichter gefrierender Regen", ru: "Слабый ледяной дождь" },
  67: { ca: "Pluja gelada intensa", es: "Lluvia helada intensa", fr: "Pluie verglaçante forte", en: "Heavy freezing rain", pt: "Chuva gelada forte", de: "Starker gefrierender Regen", ru: "Сильный ледяной дождь" },
  71: { ca: "Neu feble", es: "Nevada débil", fr: "Neige faible", en: "Light snow", pt: "Neve fraca", de: "Leichter Schneefall", ru: "Небольшой снег" },
  73: { ca: "Neu moderada", es: "Nevada moderada", fr: "Neige modérée", en: "Moderate snow", pt: "Neve moderada", de: "Mäßiger Schneefall", ru: "Умеренный снег" },
  75: { ca: "Neu intensa", es: "Nevada intensa", fr: "Neige forte", en: "Heavy snow", pt: "Neve forte", de: "Starker Schneefall", ru: "Сильный снег" },
  77: { ca: "Neu granulada", es: "Nieve granulada", fr: "Neige en grains", en: "Snow grains", pt: "Neve granulada", de: "Schneegriesel", ru: "Снежные зёрна" },
  80: { ca: "Ruixat feble", es: "Chubasco débil", fr: "Averse faible", en: "Light showers", pt: "Aguaceiro fraco", de: "Leichter Regenschauer", ru: "Небольшой ливневый дождь" },
  81: { ca: "Ruixat moderat", es: "Chubasco moderado", fr: "Averse modérée", en: "Moderate showers", pt: "Aguaceiro moderado", de: "Mäßiger Regenschauer", ru: "Умеренный ливневый дождь" },
  82: { ca: "Ruixat intens", es: "Chubasco intenso", fr: "Forte averse", en: "Heavy showers", pt: "Aguaceiro forte", de: "Starker Regenschauer", ru: "Сильный ливневый дождь" },
  85: { ca: "Ruixat de neu feble", es: "Chubasco de nieve débil", fr: "Averse de neige faible", en: "Light snow showers", pt: "Aguaceiro de neve fraco", de: "Leichter Schneeschauer", ru: "Небольшой ливневый снег" },
  86: { ca: "Ruixat de neu intens", es: "Chubasco de nieve intenso", fr: "Forte averse de neige", en: "Heavy snow showers", pt: "Aguaceiro de neve forte", de: "Starker Schneeschauer", ru: "Сильный ливневый снег" },
  95: { ca: "Tempesta", es: "Tormenta", fr: "Orage", en: "Thunderstorm", pt: "Trovoada", de: "Gewitter", ru: "Гроза" },
  96: { ca: "Tempesta amb pedra", es: "Tormenta con granizo", fr: "Orage avec grêle", en: "Thunderstorm with hail", pt: "Trovoada com granizo", de: "Gewitter mit Hagel", ru: "Гроза с градом" },
  99: { ca: "Tempesta forta amb pedra", es: "Tormenta fuerte con granizo", fr: "Orage violent avec grêle", en: "Severe thunderstorm with hail", pt: "Trovoada forte com granizo", de: "Schweres Gewitter mit Hagel", ru: "Сильная гроза с градом" },
};

const unknownWeatherCondition: Record<LanguageCode, string> = {
  ca: "Sense classificació",
  es: "Sin clasificar",
  fr: "Non classé",
  en: "Unclassified",
  pt: "Sem classificação",
  de: "Nicht klassifiziert",
  ru: "Без классификации",
};

export const getWeatherConditionLabel = (code: number | undefined, language: LanguageCode) =>
  (code === undefined ? undefined : weatherConditionByCode[code]?.[language]) ?? unknownWeatherCondition[language];

// ---------- Places "per confirmar" ----------

const placeholderKindLabels: Record<"destinació" | "punt", Record<LanguageCode, string>> = {
  "destinació": {
    ca: "destinació per confirmar",
    es: "destino por confirmar",
    fr: "destination à confirmer",
    en: "destination to be confirmed",
    pt: "destino por confirmar",
    de: "Ziel noch offen",
    ru: "пункт назначения уточняется",
  },
  punt: {
    ca: "punt per confirmar",
    es: "punto por confirmar",
    fr: "lieu à confirmer",
    en: "location to be confirmed",
    pt: "local por confirmar",
    de: "Ort noch offen",
    ru: "место уточняется",
  },
};

// Only the countries used as a prefix of a placeholder ("Espanya · destinació per confirmar").
const placeholderCountryNames: Record<string, Record<LanguageCode, string>> = {
  Andorra: { ca: "Andorra", es: "Andorra", fr: "Andorre", en: "Andorra", pt: "Andorra", de: "Andorra", ru: "Андорра" },
  Espanya: { ca: "Espanya", es: "España", fr: "Espagne", en: "Spain", pt: "Espanha", de: "Spanien", ru: "Испания" },
  "França": { ca: "França", es: "Francia", fr: "France", en: "France", pt: "França", de: "Frankreich", ru: "Франция" },
};

const placeholderPattern = /^(?:(.+?)\s*·\s*)?(destinació|punt) per confirmar$/i;

// Translates placeholder names such as "França · destinació per confirmar"; real place names are returned as they are.
export const localizeLocationName = (name: string, language: LanguageCode) => {
  const match = name.trim().match(placeholderPattern);
  if (!match) return name;
  const [, place, kind] = match;
  const kindLabel = placeholderKindLabels[kind.toLowerCase() as keyof typeof placeholderKindLabels][language];
  if (!place) return kindLabel.charAt(0).toLocaleUpperCase() + kindLabel.slice(1);
  return `${placeholderCountryNames[place]?.[language] ?? place} · ${kindLabel}`;
};

// Display name of a location (its label when it has one).
export const getLocationLabel = (location: ClubLocation, language: LanguageCode) => localizeLocationName(location.label ?? location.name, language);

// Destination shown for an event: the destination when there is one, otherwise the origin.
export const getEventDestinationLabel = (event: ClubEvent, language: LanguageCode) => getLocationLabel(event.destination ?? event.source, language);

// ---------- Calendar year titles ----------

const calendarWordByLanguage: Record<LanguageCode, string> = {
  ca: "Calendari",
  es: "Calendario",
  fr: "Calendrier",
  en: "Calendar",
  pt: "Calendário",
  de: "Kalender",
  ru: "Календарь",
};

// "Calendari 2026" / "Calendari 2011 / 2012" from yearLabels, translated; a custom label that does not start with "Calendari" is kept.
export const getCalendarYearTitle = (year: number, language: LanguageCode) => {
  const label = yearLabels[year] ?? `Calendari ${year}`;
  const match = label.match(/^Calendari\s+(.+)$/);
  return match ? `${calendarWordByLanguage[language]} ${match[1]}` : label;
};

// ---------- Event categories ----------

const categoryLabelByLanguage: Record<LanguageCode, Record<ClubEvent["category"], string>> = {
  ca: { sortida: "sortida", esmorzar: "esmorzar", "cars-coffee": "cars & coffee", rally: "rally", viatge: "viatge", sopar: "sopar", historica: "històrica" },
  es: { sortida: "salida", esmorzar: "desayuno", "cars-coffee": "cars & coffee", rally: "rally", viatge: "viaje", sopar: "cena", historica: "histórica" },
  fr: { sortida: "sortie", esmorzar: "petit-déjeuner", "cars-coffee": "cars & coffee", rally: "rallye", viatge: "voyage", sopar: "dîner", historica: "historique" },
  en: { sortida: "outing", esmorzar: "breakfast", "cars-coffee": "cars & coffee", rally: "rally", viatge: "trip", sopar: "dinner", historica: "historic" },
  pt: { sortida: "passeio", esmorzar: "pequeno-almoço", "cars-coffee": "cars & coffee", rally: "rally", viatge: "viagem", sopar: "jantar", historica: "histórica" },
  de: { sortida: "Ausfahrt", esmorzar: "Frühstück", "cars-coffee": "cars & coffee", rally: "Rallye", viatge: "Reise", sopar: "Abendessen", historica: "historisch" },
  ru: { sortida: "выезд", esmorzar: "завтрак", "cars-coffee": "cars & coffee", rally: "ралли", viatge: "поездка", sopar: "ужин", historica: "история" },
};

export const getEventCategoryLabel = (category: ClubEvent["category"], language: LanguageCode) => categoryLabelByLanguage[language][category] ?? category;
