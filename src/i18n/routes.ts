/** Bidirectional URL mapping: Spanish path → English path */
export const routeMap: Record<string, string> = {
  '/': '/en/',
  '/safaris/': '/en/safaris/',
  '/safaris/safari-clasico/': '/en/safaris/classic-safari/',
  '/safaris/safari-fotografico/': '/en/safaris/photo-safari/',
  '/safaris/safari-nocturno/': '/en/safaris/night-safari/',
  '/actividades/': '/en/activities/',
  '/actividades/avistamiento-fauna/': '/en/activities/wildlife-watching/',
  '/actividades/caminatas-bush/': '/en/activities/bush-walks/',
  '/actividades/globo-aerostatico/': '/en/activities/hot-air-balloon/',
  '/actividades/fotografia-safari/': '/en/activities/safari-photography/',
  '/hospedaje/': '/en/lodging/',
  '/hospedaje/lodges/': '/en/lodging/safari-lodges/',
  '/hospedaje/campamentos/': '/en/lodging/tented-camps/',
  '/precios/': '/en/prices/',
  '/como-llegar/': '/en/how-to-get-here/',
  '/contacto/': '/en/contact/',
  '/parques-nacionales/': '/en/national-parks/',
  '/aviso-privacidad/': '/en/privacy-policy/',
  '/terminos/': '/en/terms/',
  '/lodges/': '/en/safari-lodges/',
  '/campamentos/': '/en/tented-camps/',
  '/blog/': '/en/blog/',
  '/blog/safaris-tanzania/': '/en/blog/tanzania-safaris/',
  '/blog/actividades-aventura/': '/en/blog/adventure-activities/',
  '/blog/hospedaje-lodges/': '/en/blog/lodging-lodges/',
  '/blog/guias-viaje/': '/en/blog/travel-guides/',
  '/blog/cultura-masai/': '/en/blog/masai-culture/',
};

/** Reverse map: English path → Spanish path */
const reverseMap: Record<string, string> = Object.fromEntries(
  Object.entries(routeMap).map(([es, en]) => [en, es])
);

/** Get the alternate-language path */
export function getAlternatePath(currentPath: string, currentLang: 'es' | 'en'): string {
  if (currentLang === 'es') {
    return routeMap[currentPath] || `/en${currentPath}`;
  }
  return reverseMap[currentPath] || currentPath.replace(/^\/en/, '') || '/';
}

/** Get hreflang URLs for both languages */
export function getHreflangs(currentPath: string, currentLang: 'es' | 'en') {
  if (currentLang === 'es') {
    return { es: currentPath, en: routeMap[currentPath] || `/en${currentPath}` };
  }
  const esPath = reverseMap[currentPath] || currentPath.replace(/^\/en/, '') || '/';
  return { es: esPath, en: currentPath };
}
