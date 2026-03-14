export type Lang = 'en' | 'es' | 'de' | 'fr';

export const defaultLang: Lang = 'en';

export const languages: Record<Lang, { label: string; locale: string; ogLocale: string; dateLocale: string }> = {
  en: {
    label: 'English',
    locale: 'en-GB',
    ogLocale: 'en_GB',
    dateLocale: 'en-GB',
  },
  es: {
    label: 'Español',
    locale: 'es-ES',
    ogLocale: 'es_ES',
    dateLocale: 'es-ES',
  },
  de: {
    label: 'Deutsch',
    locale: 'de-DE',
    ogLocale: 'de_DE',
    dateLocale: 'de-DE',
  },
  fr: {
    label: 'Français',
    locale: 'fr-FR',
    ogLocale: 'fr_FR',
    dateLocale: 'fr-FR',
  },
};
