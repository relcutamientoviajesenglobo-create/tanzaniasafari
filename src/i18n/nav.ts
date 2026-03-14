import type { Lang } from './config';

export function getNavItems(lang: Lang) {
  if (lang === 'en') {
    return [
      {
        label: 'Safaris', href: '/safaris/',
        children: [
          { label: '🦁 Classic Safari',     href: '/safaris/classic-safari/' },
          { label: '📸 Photo Safari',        href: '/safaris/photo-safari/' },
          { label: '🌙 Night Safari',        href: '/safaris/night-safari/' },
        ]
      },
      {
        label: 'Activities', href: '/activities/',
        children: [
          { label: '🐘 Wildlife Watching',      href: '/activities/wildlife-watching/' },
          { label: '🥾 Bush Walks',              href: '/activities/bush-walks/' },
          { label: '🎈 Hot Air Balloon',         href: '/activities/hot-air-balloon/' },
          { label: '📷 Safari Photography',      href: '/activities/safari-photography/' },
        ]
      },
      {
        label: 'Lodging', href: '/lodging/',
        children: [
          { label: '🏨 Safari Lodges',  href: '/lodging/lodges/' },
          { label: '⛺ Tented Camps',    href: '/lodging/camps/' },
        ]
      },
      { label: 'Prices',          href: '/prices/' },
      { label: 'How to Get Here', href: '/how-to-get-here/' },
      { label: 'Blog',            href: '/blog/' },
    ];
  }

  if (lang === 'de') {
    return [
      {
        label: 'Safaris', href: '/de/safaris/',
        children: [
          { label: '🦁 Klassische Safari',  href: '/de/safaris/klassische-safari/' },
          { label: '📸 Foto-Safari',         href: '/de/safaris/foto-safari/' },
          { label: '🌙 Nacht-Safari',        href: '/de/safaris/nacht-safari/' },
        ]
      },
      {
        label: 'Aktivitäten', href: '/de/aktivitaeten/',
        children: [
          { label: '🐘 Wildtierbeobachtung',    href: '/de/aktivitaeten/wildtierbeobachtung/' },
          { label: '🥾 Buschwanderungen',         href: '/de/aktivitaeten/buschwanderungen/' },
          { label: '🎈 Heißluftballon',           href: '/de/aktivitaeten/heissluftballon/' },
          { label: '📷 Safari-Fotografie',        href: '/de/aktivitaeten/safari-fotografie/' },
        ]
      },
      {
        label: 'Unterkünfte', href: '/de/unterkuenfte/',
        children: [
          { label: '🏨 Safari Lodges',  href: '/de/unterkuenfte/lodges/' },
          { label: '⛺ Zeltcamps',       href: '/de/unterkuenfte/zeltcamps/' },
        ]
      },
      { label: 'Preise',    href: '/de/preise/' },
      { label: 'Anreise',   href: '/de/anreise/' },
      { label: 'Blog',      href: '/de/blog/' },
    ];
  }

  if (lang === 'fr') {
    return [
      {
        label: 'Safaris', href: '/fr/safaris/',
        children: [
          { label: '🦁 Safari Classique',   href: '/fr/safaris/safari-classique/' },
          { label: '📸 Safari Photo',        href: '/fr/safaris/safari-photo/' },
          { label: '🌙 Safari Nocturne',     href: '/fr/safaris/safari-nocturne/' },
        ]
      },
      {
        label: 'Activités', href: '/fr/activites/',
        children: [
          { label: '🐘 Observation de la Faune',  href: '/fr/activites/observation-faune/' },
          { label: '🥾 Marches en Brousse',         href: '/fr/activites/marches-brousse/' },
          { label: '🎈 Montgolfière',               href: '/fr/activites/montgolfiere/' },
          { label: '📷 Photographie Safari',        href: '/fr/activites/photographie-safari/' },
        ]
      },
      {
        label: 'Hébergement', href: '/fr/hebergement/',
        children: [
          { label: '🏨 Lodges',       href: '/fr/hebergement/lodges/' },
          { label: '⛺ Camps',         href: '/fr/hebergement/camps/' },
        ]
      },
      { label: 'Prix',            href: '/fr/prix/' },
      { label: 'Comment Venir',   href: '/fr/comment-venir/' },
      { label: 'Blog',            href: '/fr/blog/' },
    ];
  }

  // Spanish (default fallback)
  return [
    {
      label: 'Safaris', href: '/es/safaris/',
      children: [
        { label: '🦁 Safari Clásico',       href: '/es/safaris/safari-clasico/' },
        { label: '📸 Safari Fotográfico',    href: '/es/safaris/safari-fotografico/' },
        { label: '🌙 Safari Nocturno',       href: '/es/safaris/safari-nocturno/' },
      ]
    },
    {
      label: 'Actividades', href: '/es/actividades/',
      children: [
        { label: '🐘 Avistamiento de Fauna',  href: '/es/actividades/avistamiento-fauna/' },
        { label: '🥾 Caminatas Bush',          href: '/es/actividades/caminatas-bush/' },
        { label: '🎈 Globo Aerostático',       href: '/es/actividades/globo-aerostatico/' },
        { label: '📷 Fotografía Safari',       href: '/es/actividades/fotografia-safari/' },
      ]
    },
    {
      label: 'Hospedaje', href: '/es/hospedaje/',
      children: [
        { label: '🏨 Safari Lodges',    href: '/es/hospedaje/lodges/' },
        { label: '⛺ Campamentos',       href: '/es/hospedaje/campamentos/' },
      ]
    },
    { label: 'Precios',       href: '/es/precios/' },
    { label: 'Cómo Llegar',   href: '/es/como-llegar/' },
    { label: 'Blog',           href: '/es/blog/' },
  ];
}
