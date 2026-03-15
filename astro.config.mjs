import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tanzaniasafari.info',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-GB',
          es: 'es-ES',
          de: 'de-DE',
          fr: 'fr-FR',
        },
      },
    })
  ],
  build: {
    assets: '_astro'
  }
});
