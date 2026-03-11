import type { Lang } from './config';

export function getNavItems(lang: Lang) {
  if (lang === 'en') {
    return [
      {
        label: 'Safaris', href: '/en/safaris/',
        children: [
          { label: '🦁 Classic Safari',     href: '/en/safaris/classic-safari/' },
          { label: '📸 Photo Safari',        href: '/en/safaris/photo-safari/' },
          { label: '🌙 Night Safari',        href: '/en/safaris/night-safari/' },
        ]
      },
      {
        label: 'Activities', href: '/en/activities/',
        children: [
          { label: '🐘 Wildlife Watching',      href: '/en/activities/wildlife-watching/' },
          { label: '🥾 Bush Walks',              href: '/en/activities/bush-walks/' },
          { label: '🎈 Hot Air Balloon',         href: '/en/activities/hot-air-balloon/' },
          { label: '📷 Safari Photography',      href: '/en/activities/safari-photography/' },
        ]
      },
      {
        label: 'Lodging', href: '/en/lodging/',
        children: [
          { label: '🏨 Safari Lodges',  href: '/en/lodging/safari-lodges/' },
          { label: '⛺ Tented Camps',    href: '/en/lodging/tented-camps/' },
        ]
      },
      { label: 'Prices',          href: '/en/prices/' },
      { label: 'How to Get Here', href: '/en/how-to-get-here/' },
      { label: 'Blog',            href: '/en/blog/' },
    ];
  }

  // Spanish (default)
  return [
    {
      label: 'Safaris', href: '/safaris/',
      children: [
        { label: '🦁 Safari Clásico',       href: '/safaris/safari-clasico/' },
        { label: '📸 Safari Fotográfico',    href: '/safaris/safari-fotografico/' },
        { label: '🌙 Safari Nocturno',       href: '/safaris/safari-nocturno/' },
      ]
    },
    {
      label: 'Actividades', href: '/actividades/',
      children: [
        { label: '🐘 Avistamiento de Fauna',  href: '/actividades/avistamiento-fauna/' },
        { label: '🥾 Caminatas Bush',          href: '/actividades/caminatas-bush/' },
        { label: '🎈 Globo Aerostático',       href: '/actividades/globo-aerostatico/' },
        { label: '📷 Fotografía Safari',       href: '/actividades/fotografia-safari/' },
      ]
    },
    {
      label: 'Hospedaje', href: '/hospedaje/',
      children: [
        { label: '🏨 Safari Lodges',    href: '/hospedaje/lodges/' },
        { label: '⛺ Campamentos',       href: '/hospedaje/campamentos/' },
      ]
    },
    { label: 'Precios',       href: '/precios/' },
    { label: 'Cómo Llegar',   href: '/como-llegar/' },
    { label: 'Blog',           href: '/blog/' },
  ];
}
