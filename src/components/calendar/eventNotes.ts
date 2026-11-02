import { LanguageCode } from "@/lib/i18n";

// Standard event notes are stored in Catalan in calendarData.ts; known ones are translated here.
// Any other note (e.g. typed in the backoffice) is shown as written.
const knownEventNotes: Record<string, Record<LanguageCode, string>> = {
  "Data exacta desconeguda.": {
    ca: "Data exacta desconeguda.",
    es: "Fecha exacta desconocida.",
    fr: "Date exacte inconnue.",
    en: "Exact date unknown.",
    pt: "Data exata desconhecida.",
    de: "Genaues Datum unbekannt.",
    ru: "Точная дата неизвестна.",
  },
  "Hora i destinació per confirmar.": {
    ca: "Hora i destinació per confirmar.",
    es: "Hora y destino por confirmar.",
    fr: "Horaire et destination à confirmer.",
    en: "Time and destination to be confirmed.",
    pt: "Hora e destino por confirmar.",
    de: "Uhrzeit und Ziel werden noch bestätigt.",
    ru: "Время и место назначения уточняются.",
  },
};

export const localizeEventNote = (note: string, language: LanguageCode) => knownEventNotes[note.trim()]?.[language] ?? note;
