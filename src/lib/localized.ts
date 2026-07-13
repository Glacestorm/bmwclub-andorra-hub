import { defaultLanguage, LanguageCode } from "@/lib/i18n";
import { LocalizedText } from "@/content/siteExperience";

export const getLocalizedText = (value: LocalizedText, language: LanguageCode) => {
  return value[language] ?? value[defaultLanguage] ?? Object.values(value)[0] ?? "";
};
