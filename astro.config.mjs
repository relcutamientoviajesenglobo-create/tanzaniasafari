import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://safaritanzania.info',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2026-03-10'),
    })
  ],
  build: {
    assets: '_astro'
  }
});
