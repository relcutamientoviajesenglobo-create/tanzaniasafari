export const languages = {
  es: { label: 'Español', locale: 'es-MX', ogLocale: 'es_MX', dateLocale: 'es-MX' },
  en: { label: 'English', locale: 'en', ogLocale: 'en_US', dateLocale: 'en-US' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';
