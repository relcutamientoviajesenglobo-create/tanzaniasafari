import type { Lang } from './config';

const routeMap: Record<string, Record<Lang, string>> = {
  '/': { en: '/', es: '/es/', de: '/de/', fr: '/fr/' },
  '/safaris/': { en: '/safaris/', es: '/es/safaris/', de: '/de/safaris/', fr: '/fr/safaris/' },
  '/safaris/classic-safari/': { en: '/safaris/classic-safari/', es: '/es/safaris/safari-clasico/', de: '/de/safaris/klassische-safari/', fr: '/fr/safaris/safari-classique/' },
  '/safaris/photo-safari/': { en: '/safaris/photo-safari/', es: '/es/safaris/safari-fotografico/', de: '/de/safaris/foto-safari/', fr: '/fr/safaris/safari-photo/' },
  '/safaris/night-safari/': { en: '/safaris/night-safari/', es: '/es/safaris/safari-nocturno/', de: '/de/safaris/nacht-safari/', fr: '/fr/safaris/safari-nocturne/' },
  '/activities/': { en: '/activities/', es: '/es/actividades/', de: '/de/aktivitaeten/', fr: '/fr/activites/' },
  '/activities/wildlife-watching/': { en: '/activities/wildlife-watching/', es: '/es/actividades/avistamiento-fauna/', de: '/de/aktivitaeten/wildtierbeobachtung/', fr: '/fr/activites/observation-faune/' },
  '/activities/bush-walks/': { en: '/activities/bush-walks/', es: '/es/actividades/caminatas-bush/', de: '/de/aktivitaeten/buschwanderungen/', fr: '/fr/activites/marches-brousse/' },
  '/activities/safari-photography/': { en: '/activities/safari-photography/', es: '/es/actividades/fotografia-safari/', de: '/de/aktivitaeten/safari-fotografie/', fr: '/fr/activites/photographie-safari/' },
  '/activities/hot-air-balloon/': { en: '/activities/hot-air-balloon/', es: '/es/actividades/globo-aerostatico/', de: '/de/aktivitaeten/heissluftballon/', fr: '/fr/activites/montgolfiere/' },
  '/lodging/': { en: '/lodging/', es: '/es/hospedaje/', de: '/de/unterkuenfte/', fr: '/fr/hebergement/' },
  '/lodging/lodges/': { en: '/lodging/lodges/', es: '/es/hospedaje/lodges/', de: '/de/unterkuenfte/lodges/', fr: '/fr/hebergement/lodges/' },
  '/lodging/camps/': { en: '/lodging/camps/', es: '/es/hospedaje/campamentos/', de: '/de/unterkuenfte/zeltcamps/', fr: '/fr/hebergement/camps/' },
  '/national-parks/': { en: '/national-parks/', es: '/es/parques-nacionales/', de: '/de/nationalparks/', fr: '/fr/parcs-nationaux/' },
  '/prices/': { en: '/prices/', es: '/es/precios/', de: '/de/preise/', fr: '/fr/prix/' },
  '/how-to-get-here/': { en: '/how-to-get-here/', es: '/es/como-llegar/', de: '/de/anreise/', fr: '/fr/comment-venir/' },
  '/contact/': { en: '/contact/', es: '/es/contacto/', de: '/de/kontakt/', fr: '/fr/contact/' },
  '/lodges/': { en: '/lodges/', es: '/es/lodges/', de: '/de/lodges/', fr: '/fr/lodges/' },
  '/camps/': { en: '/camps/', es: '/es/campamentos/', de: '/de/zeltcamps/', fr: '/fr/camps/' },
  '/privacy-policy/': { en: '/privacy-policy/', es: '/es/aviso-privacidad/', de: '/de/datenschutz/', fr: '/fr/politique-confidentialite/' },
  '/terms/': { en: '/terms/', es: '/es/terminos/', de: '/de/agb/', fr: '/fr/conditions-generales/' },
  '/blog/': { en: '/blog/', es: '/es/blog/', de: '/de/blog/', fr: '/fr/blog/' },
  '/blog/tanzania-safaris/': { en: '/blog/tanzania-safaris/', es: '/es/blog/safaris-tanzania/', de: '/de/blog/safari-tansania/', fr: '/fr/blog/safaris-tanzanie/' },
  '/blog/adventure-activities/': { en: '/blog/adventure-activities/', es: '/es/blog/actividades-aventura/', de: '/de/blog/abenteuer-aktivitaeten/', fr: '/fr/blog/activites-aventure/' },
  '/blog/lodges-camps/': { en: '/blog/lodges-camps/', es: '/es/blog/hospedaje-lodges/', de: '/de/blog/lodges-camps/', fr: '/fr/blog/lodges-camps/' },
  '/blog/travel-guides/': { en: '/blog/travel-guides/', es: '/es/blog/guias-viaje/', de: '/de/blog/reisefuehrer/', fr: '/fr/blog/guides-voyage/' },
  '/blog/masai-culture/': { en: '/blog/masai-culture/', es: '/es/blog/cultura-masai/', de: '/de/blog/masai-kultur/', fr: '/fr/blog/culture-masai/' },
};

export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  for (const [_key, langs] of Object.entries(routeMap)) {
    for (const [_lang, path] of Object.entries(langs)) {
      if (path === currentPath) {
        return langs[targetLang] || currentPath;
      }
    }
  }
  const cleanPath = currentPath.replace(/^\/(es|de|fr)\//, '/');
  if (targetLang === 'en') return cleanPath;
  return `/${targetLang}${cleanPath === '/' ? '/' : cleanPath}`;
}

export function getHreflangs(currentPath: string, currentLang: Lang): Record<Lang, string> {
  for (const [_key, langs] of Object.entries(routeMap)) {
    for (const [_lang, path] of Object.entries(langs)) {
      if (path === currentPath) {
        return langs as Record<Lang, string>;
      }
    }
  }
  const cleanPath = currentPath.replace(/^\/(es|de|fr)\//, '/');
  return {
    en: cleanPath,
    es: `/es${cleanPath === '/' ? '/' : cleanPath}`,
    de: `/de${cleanPath === '/' ? '/' : cleanPath}`,
    fr: `/fr${cleanPath === '/' ? '/' : cleanPath}`,
  };
}
