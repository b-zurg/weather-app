import { logError } from "../lib/logging";
export const translations = {
  highAbbreviation: {
    en: "H",
  },
  lowAbbreviation: {
    en: "L",
  },
  degreesSymbol: {
    en: "{{value}}°",
  },
  currentTemperature: {
    en: "Current Temperature",
  },
  feelsLike: {
    en: "Feels Like",
  },
  minMaxTemp: {
    en: "Min/Max Temperature",
  },
  humidity: {
    en: "Humidity",
  },
  temperature: {
    en: "Temperature (celsius)",
  },
  weatherFor: {
    en: "Weather for {{name}} - {{description}}",
  },
  wind: {
    en: "Wind",
  },
  degrees: {
    en: "Degrees (direction)",
  },
  windSpeed: {
    en: "Speed (meters/second)",
  },
  windGust: {
    en: "Wind gust",
  },
  hourlyTemperature5Days: {
    en: "Hourly temperature for next 5 days",
  },
  high: {
    en: "H: {{value}}",
  },
  low: {
    en: "L: {{value}}",
  },
  searchHere: {
    en: "Search here to get started",
  },
  countryCode: {
    en: "Country: {{code}}",
  },
};

export type TranslationKey = keyof typeof translations;
export type SupportedLanguage = "en";

export const getTranslation = (
  key: TranslationKey,
  language: SupportedLanguage,
  variables?: { [key: string]: string }
) => {
  try {
    const translationValue = translations[key][language];
    if (!variables) {
      return translationValue;
    } else {
      return Object.entries(variables).reduce(
        (prev, [key, value]) => prev.replace(`{{${key}}}`, value),
        translationValue
      );
    }
  } catch (error) {
    logError(
      `Could not get translation with key ${key} for language ${language}`
    );
    logError(error);
    return "";
  }
};
