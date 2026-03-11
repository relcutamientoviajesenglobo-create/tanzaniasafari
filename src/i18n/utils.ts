import { ui } from './ui';
import { defaultLang, type Lang } from './config';

/** Get a translated UI string */
export function t(key: string, lang: Lang = defaultLang): string {
  return (ui[lang] as Record<string, string>)[key]
    || (ui[defaultLang] as Record<string, string>)[key]
    || key;
}

/** Detect language from URL path */
export function getLangFromPath(path: string): Lang {
  return path.startsWith('/en/') || path === '/en' ? 'en' : 'es';
}
