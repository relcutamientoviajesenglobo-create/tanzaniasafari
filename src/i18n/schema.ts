// src/i18n/schema.ts — Reusable Schema.org JSON-LD helpers for Tanzania Safari

const siteUrl = 'https://tanzaniasafari.info';

export const business = {
  name: 'Tanzania Safari',
  telephone: '+255753000000',
  email: 'info@tanzaniasafari.info',
  url: siteUrl,
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Sokoine Road',
    addressLocality: 'Arusha',
    addressRegion: 'Arusha Region',
    addressCountry: 'TZ',
  },
  geo: {
    '@type': 'GeoCoordinates' as const,
    latitude: -3.3869,
    longitude: 36.6830,
  },
  openingHours: {
    '@type': 'OpeningHoursSpecification' as const,
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '06:00',
    closes: '18:00',
  },
  image: `${siteUrl}/media/safari-tanzania-serengeti-panoramica.webp`,
  priceRange: '$$$',
  sameAs: [
    'https://www.facebook.com/safaritanzaniainfo',
    'https://www.instagram.com/safaritanzaniainfo',
    'https://www.tiktok.com/@safaritanzaniainfo',
    'https://www.pinterest.com/safaritanzaniainfo',
  ],
};

/** TouristAttraction schema — for safari/activity pages */
export function touristAttraction(overrides: Record<string, any> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: business.name,
    url: overrides.url || business.url,
    telephone: business.telephone,
    address: business.address,
    geo: business.geo,
    openingHoursSpecification: [business.openingHours],
    image: overrides.image || business.image,
    priceRange: business.priceRange,
    ...overrides,
  };
}

/** LocalBusiness schema — for contact/main business pages */
export function localBusiness(overrides: Record<string, any> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    address: business.address,
    geo: business.geo,
    openingHoursSpecification: [business.openingHours],
    image: business.image,
    priceRange: business.priceRange,
    sameAs: business.sameAs,
    ...overrides,
  };
}

/** LodgingBusiness / Campground schema */
export function lodging(type: 'LodgingBusiness' | 'Campground', overrides: Record<string, any> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: overrides.name || business.name,
    url: overrides.url || business.url,
    telephone: business.telephone,
    address: business.address,
    geo: business.geo,
    image: overrides.image || business.image,
    priceRange: business.priceRange,
    checkinTime: '14:00',
    checkoutTime: '10:00',
    ...overrides,
  };
}

/** FAQPage schema from array of {question, answer} */
export function faqPage(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Generic WebPage schema — for legal/info pages */
export function webPage(overrides: Record<string, any> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: overrides.name,
    url: overrides.url,
    description: overrides.description,
    publisher: { '@type': 'Organization', name: business.name, url: business.url },
    ...overrides,
  };
}

/** Place schema with directions info */
export function place(overrides: Record<string, any> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: business.name,
    address: business.address,
    geo: business.geo,
    hasMap: 'https://maps.google.com/?q=-3.3869,36.6830',
    image: overrides.image || business.image,
    ...overrides,
  };
}
