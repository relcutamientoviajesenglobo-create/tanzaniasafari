import type { Lang } from './config';
import { defaultLang } from './config';
import { ui } from './ui';

export function getLangFromPath(path: string): Lang {
  if (path.startsWith('/es/') || path === '/es') return 'es';
  if (path.startsWith('/de/') || path === '/de') return 'de';
  if (path.startsWith('/fr/') || path === '/fr') return 'fr';
  return 'en';
}

export function t(key: string, lang: Lang = defaultLang): string {
  return (ui[lang] as Record<string, string>)?.[key]
    ?? (ui[defaultLang] as Record<string, string>)?.[key]
    ?? key;
}
