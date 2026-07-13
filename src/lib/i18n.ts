export type LanguageCode = "ca" | "es" | "fr" | "en" | "pt" | "de" | "ru";

export const defaultLanguage: LanguageCode = "ca";
export const languageStorageKey = "bmwclub-language";

export const supportedLanguages: Array<{ code: LanguageCode; name: string }> = [
  { code: "ca", name: "Català" },
  { code: "es", name: "Castellano" },
  { code: "fr", name: "Français" },
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "ru", name: "Русский" },
];

export const localeByLanguage: Record<LanguageCode, string> = {
  ca: "ca-AD",
  es: "es-ES",
  fr: "fr-FR",
  en: "en-GB",
  pt: "pt-PT",
  de: "de-DE",
  ru: "ru-RU",
};
