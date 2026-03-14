# Homepage 3D Fusion + i18n Expansion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the 3D immersive homepage into the existing Astro project and expand from 2 languages (ES/EN) to 4 (EN-default/ES/DE/FR) with full content across 116 pages + 44 blog posts.

**Architecture:** The 3D homepage gets its own layout (`HomepageLayout.astro`) isolated from the MC design system. The i18n system inverts (EN becomes default at `/`, ES moves to `/es/`) and expands with DE (`/de/`) and FR (`/fr/`). All pages, blog posts, and UI strings are fully translated. 301 redirects preserve existing URL equity.

**Tech Stack:** Astro 4.16 (SSG), Three.js 0.160.0, GSAP 3.12.2, CSS (no framework), Cloudflare Pages

**Spec:** `docs/superpowers/specs/2026-03-14-homepage-3d-fusion-design.md`

---

## Chunk 1: Foundation — i18n Inversion + Expansion

This chunk restructures the i18n system from ES-default/EN to EN-default/ES/DE/FR. Everything else depends on this.

### Task 1.1: Install New Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add Three.js and GSAP**

```bash
cd /Users/seosecreto/Downloads/safari-tanzania
npm install three@0.160.0 gsap@3.12.2 --save-exact
```

- [ ] **Step 2: Verify package.json has exact versions (no caret)**

```bash
cat package.json | grep -E "three|gsap"
```

Expected: `"three": "0.160.0"` and `"gsap": "3.12.2"` (no `^`)

- [ ] **Step 3: Verify build still passes**

```bash
npx astro build
```

Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add three.js 0.160.0 and gsap 3.12.2 for 3D homepage"
```

---

### Task 1.2: Update i18n Config — 4 Languages, EN Default

**Files:**
- Modify: `src/i18n/config.ts`

- [ ] **Step 1: Rewrite config.ts with 4 languages, EN as default**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/config.ts
git commit -m "i18n: expand to 4 languages with EN-GB as default"
```

---

### Task 1.3: Update i18n Utils — Language Detection

**Files:**
- Modify: `src/i18n/utils.ts`

- [ ] **Step 1: Update getLangFromPath to handle 4 languages with EN as default (root)**

The current logic detects `/en/` prefix for English. Now:
- Root paths (`/safaris/`, `/blog/`) → `en`
- `/es/` prefix → `es`
- `/de/` prefix → `de`
- `/fr/` prefix → `fr`

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/utils.ts
git commit -m "i18n: update utils for 4-language detection with EN default"
```

---

### Task 1.4: Update Routes — Full 4-Language Mapping

**Files:**
- Modify: `src/i18n/routes.ts`

- [ ] **Step 1: Rewrite routes.ts with complete 4-language route mapping**

The current file maps ES↔EN bidirectionally. Replace with a 4-language route map. The structure should be:

```typescript
import type { Lang } from './config';

// Each route maps all 4 language versions
// Key is the EN path (default), values are translations
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
  '/lodging/': { en: '/lodging/', es: '/es/hospedaje/', de: '/de/unterkunft/', fr: '/fr/hebergement/' },
  '/lodging/lodges/': { en: '/lodging/lodges/', es: '/es/hospedaje/lodges/', de: '/de/unterkunft/lodges/', fr: '/fr/hebergement/lodges/' },
  '/lodging/camps/': { en: '/lodging/camps/', es: '/es/hospedaje/campamentos/', de: '/de/unterkunft/camps/', fr: '/fr/hebergement/campements/' },
  '/national-parks/': { en: '/national-parks/', es: '/es/parques-nacionales/', de: '/de/nationalparks/', fr: '/fr/parcs-nationaux/' },
  '/prices/': { en: '/prices/', es: '/es/precios/', de: '/de/preise/', fr: '/fr/prix/' },
  '/how-to-get-here/': { en: '/how-to-get-here/', es: '/es/como-llegar/', de: '/de/anreise/', fr: '/fr/comment-venir/' },
  '/contact/': { en: '/contact/', es: '/es/contacto/', de: '/de/kontakt/', fr: '/fr/contact/' },
  '/lodges/': { en: '/lodges/', es: '/es/lodges/', de: '/de/lodges/', fr: '/fr/lodges/' },
  '/camps/': { en: '/camps/', es: '/es/campamentos/', de: '/de/camps/', fr: '/fr/campements/' },
  '/privacy-policy/': { en: '/privacy-policy/', es: '/es/aviso-privacidad/', de: '/de/datenschutz/', fr: '/fr/politique-confidentialite/' },
  '/terms/': { en: '/terms/', es: '/es/terminos/', de: '/de/agb/', fr: '/fr/conditions/' },
  '/blog/': { en: '/blog/', es: '/es/blog/', de: '/de/blog/', fr: '/fr/blog/' },
  '/blog/tanzania-safaris/': { en: '/blog/tanzania-safaris/', es: '/es/blog/safaris-tanzania/', de: '/de/blog/tansania-safaris/', fr: '/fr/blog/safaris-tanzanie/' },
  '/blog/adventure-activities/': { en: '/blog/adventure-activities/', es: '/es/blog/actividades-aventura/', de: '/de/blog/abenteuer-aktivitaeten/', fr: '/fr/blog/activites-aventure/' },
  '/blog/lodges-camps/': { en: '/blog/lodges-camps/', es: '/es/blog/hospedaje-lodges/', de: '/de/blog/lodges-camps/', fr: '/fr/blog/lodges-campements/' },
  '/blog/travel-guides/': { en: '/blog/travel-guides/', es: '/es/blog/guias-viaje/', de: '/de/blog/reisefuehrer/', fr: '/fr/blog/guides-voyage/' },
  '/blog/masai-culture/': { en: '/blog/masai-culture/', es: '/es/blog/cultura-masai/', de: '/de/blog/masai-kultur/', fr: '/fr/blog/culture-masai/' },
};

/**
 * Given any path in any language, return the path for the target language.
 */
export function getAlternatePath(currentPath: string, targetLang: Lang): string {
  // Exact match first (most reliable)
  for (const [_key, langs] of Object.entries(routeMap)) {
    for (const [_lang, path] of Object.entries(langs)) {
      if (path === currentPath) {
        return langs[targetLang] || currentPath;
      }
    }
  }
  // Fallback: construct from prefix pattern
  const cleanPath = currentPath.replace(/^\/(es|de|fr)\//, '/');
  if (targetLang === 'en') return cleanPath;
  return `/${targetLang}${cleanPath === '/' ? '/' : cleanPath}`;
}

/**
 * Return all hreflang paths for a given path.
 */
export function getHreflangs(currentPath: string, currentLang: Lang): Record<Lang, string> {
  for (const [_key, langs] of Object.entries(routeMap)) {
    for (const [_lang, path] of Object.entries(langs)) {
      if (path === currentPath) {
        return langs as Record<Lang, string>;
      }
    }
  }
  // Fallback: construct from prefix pattern
  const cleanPath = currentPath.replace(/^\/(es|de|fr)\//, '/');
  return {
    en: cleanPath,
    es: `/es${cleanPath === '/' ? '/' : cleanPath}`,
    de: `/de${cleanPath === '/' ? '/' : cleanPath}`,
    fr: `/fr${cleanPath === '/' ? '/' : cleanPath}`,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/routes.ts
git commit -m "i18n: complete 4-language route mapping with EN as default"
```

---

### Task 1.5: Expand UI Strings — DE + FR

**Files:**
- Modify: `src/i18n/ui.ts`

- [ ] **Step 1: Add `de` and `fr` objects to the ui export**

The existing file has `es` and `en` objects with 156+ keys each. Add complete `de` and `fr` translations for every key. This is the largest single translation task — all button labels, navigation text, footer text, blog labels, category names, silo names, breadcrumb labels, WhatsApp messages, back-to-top labels, etc.

Key sections to translate:
- Navigation: Safaris, Aktivitäten/Activités, Unterkunft/Hébergement, etc.
- Footer: CTA text, column titles, legal links, social text
- Blog: Category names, silo names, "read more", "reading time", "related posts"
- Pricing: Banner items, CTA text
- Forms: Contact labels, WhatsApp messages
- Accessibility: Skip link, back-to-top, aria labels

The `de` and `fr` objects must have exactly the same keys as `en` and `es`.

- [ ] **Step 2: Commit**

```bash
git add src/i18n/ui.ts
git commit -m "i18n: add complete DE and FR UI translations (156+ keys each)"
```

---

### Task 1.6: Expand Nav — DE + FR

**Files:**
- Modify: `src/i18n/nav.ts`

- [ ] **Step 1: Add DE and FR navigation structures**

Add `de` and `fr` cases to the nav function. Each has the same 6 top-level items with translated labels and localised paths:

DE example:
```
Safaris → /de/safaris/ (children: Klassische Safari, Foto-Safari, Nacht-Safari)
Aktivitäten → /de/aktivitaeten/ (children: Wildtierbeobachtung, Buschwanderungen, Safari-Fotografie, Heißluftballon)
Unterkunft → /de/unterkunft/ (children: Lodges, Camps)
Preise → /de/preise/
Anreise → /de/anreise/
Blog → /de/blog/
```

FR example:
```
Safaris → /fr/safaris/ (children: Safari Classique, Safari Photo, Safari Nocturne)
Activités → /fr/activites/ (children: Observation de la Faune, Marches en Brousse, Photographie Safari, Montgolfière)
Hébergement → /fr/hebergement/ (children: Lodges, Campements)
Prix → /fr/prix/
Comment Venir → /fr/comment-venir/
Blog → /fr/blog/
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/nav.ts
git commit -m "i18n: add DE and FR navigation with localised paths"
```

---

### Task 1.7: Expand Videos — DE + FR Metadata

**Files:**
- Modify: `src/i18n/videos.ts`

- [ ] **Step 1: Add DE and FR translations to each video's metadata**

Each video currently has `es` and `en` objects for `src`, `alt`, and `title`. Add `de` and `fr` objects. Video `src` files use symlinks — create DE and FR symlinks pointing to the same MP4 files.

- [ ] **Step 2: Create DE and FR video symlinks in public/media/**

```bash
cd /Users/seosecreto/Downloads/safari-tanzania/public/media
# DE symlinks
ln -s safari-cebras-prado-verde.mp4 safari-tansania-zebras-gruene-weide.mp4
ln -s safari-elefantes-caminando-sabana.mp4 safari-tansania-elefanten-savanne.mp4
ln -s safari-guepardos-bebedero.mp4 safari-tansania-geparden-wasserstelle.mp4
ln -s safari-jirafa-bebiendo-agua.mp4 safari-tansania-giraffe-trinkend.mp4
ln -s safari-jirafa-cebras-estampida.mp4 safari-tansania-giraffe-zebras-stampede.mp4
ln -s safari-jirafa-comiendo-hojas.mp4 safari-tansania-giraffe-blaetter-fressend.mp4
ln -s safari-leon-macho-sabana.mp4 safari-tansania-loewe-savanne.mp4
ln -s safari-leon-retrato-sol.mp4 safari-tansania-loewe-portrait-sonne.mp4
ln -s safari-manada-leones-caminando.mp4 safari-tansania-loewenrudel-wanderung.mp4
ln -s safari-rinoceronte-pastando.mp4 safari-tansania-nashorn-grasend.mp4
# FR symlinks
ln -s safari-cebras-prado-verde.mp4 safari-tanzanie-zebres-prairie-verte.mp4
ln -s safari-elefantes-caminando-sabana.mp4 safari-tanzanie-elephants-savane.mp4
ln -s safari-guepardos-bebedero.mp4 safari-tanzanie-guepards-point-eau.mp4
ln -s safari-jirafa-bebiendo-agua.mp4 safari-tanzanie-girafe-buvant.mp4
ln -s safari-jirafa-cebras-estampida.mp4 safari-tanzanie-girafe-zebres-stampede.mp4
ln -s safari-jirafa-comiendo-hojas.mp4 safari-tanzanie-girafe-feuilles.mp4
ln -s safari-leon-macho-sabana.mp4 safari-tanzanie-lion-savane.mp4
ln -s safari-leon-retrato-sol.mp4 safari-tanzanie-lion-portrait-soleil.mp4
ln -s safari-manada-leones-caminando.mp4 safari-tanzanie-troupe-lions-marche.mp4
ln -s safari-rinoceronte-pastando.mp4 safari-tanzanie-rhinoceros-broutant.mp4
```

- [ ] **Step 3: Commit**

```bash
git add src/i18n/videos.ts public/media/
git commit -m "i18n: add DE and FR video metadata and symlinks"
```

---

### Task 1.8: Update Content Config — DE + FR Languages

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Expand the blog schema lang enum and silo enum**

Add `'de'` and `'fr'` to the `lang` enum. Add DE/FR silo names to the silo enum:

```typescript
lang: z.enum(['en', 'es', 'de', 'fr']).default('en'),
silo: z.enum([
  // EN silos (used by EN and DE posts — DE posts share EN silo slugs since the silo is a content grouping, not a URL)
  'tanzania-safaris', 'adventure-activities', 'lodges-camps', 'travel-guides', 'masai-culture',
  // ES silos
  'safaris-tanzania', 'actividades-aventura', 'hospedaje-lodges', 'guias-viaje', 'cultura-masai',
  // DE silos (use translated slugs matching DE blog silo routes)
  'tansania-safaris', 'abenteuer-aktivitaeten', 'reisefuehrer', 'masai-kultur',
  // FR silos (use translated slugs matching FR blog silo routes)
  'safaris-tanzanie', 'activites-aventure', 'lodges-campements', 'guides-voyage', 'culture-masai-fr',
]),
```

- [ ] **Step 2: Commit**

```bash
git add src/content/config.ts
git commit -m "i18n: expand content schema for DE and FR languages and silos"
```

---

### Task 1.9: Update astro.config.mjs

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update sitemap config with i18n locales**

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://safaritanzania.info',
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
```

- [ ] **Step 2: Commit**

```bash
git add astro.config.mjs
git commit -m "config: update sitemap with 4-language i18n support"
```

---

### Task 1.10: Update BaseLayout.astro — 4-Language Hreflang

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Update hreflang links to output all 4 languages + x-default**

In the `<head>`, replace the current 3 hreflang links (es, en, x-default) with 5:

```astro
<link rel="alternate" hreflang="en" href={`${siteUrl}${hreflangs.en}`} />
<link rel="alternate" hreflang="es" href={`${siteUrl}${hreflangs.es}`} />
<link rel="alternate" hreflang="de" href={`${siteUrl}${hreflangs.de}`} />
<link rel="alternate" hreflang="fr" href={`${siteUrl}${hreflangs.fr}`} />
<link rel="alternate" hreflang="x-default" href={`${siteUrl}${hreflangs.en}`} />
```

Note: `x-default` now points to EN (the default language).

- [ ] **Step 2: Verify the lang attribute on `<html>` uses the correct locale**

The current code: `<html lang={langConfig.locale}>` — this is already correct since it reads from the languages config.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "i18n: update BaseLayout hreflang for 4 languages"
```

---

### Task 1.11: Restructure Pages — Move ES to /es/, EN to Root

**Files:**
- Move: All `src/pages/*.astro` (ES) → `src/pages/es/`
- Move: All `src/pages/en/*.astro` → `src/pages/` (root)

This is the most delicate task. The file moves must be done carefully.

- [ ] **Step 1: Create backup branch**

```bash
git checkout -b backup/pre-i18n-restructure
git checkout -
```

- [ ] **Step 2: Move current EN pages from /en/ to a temporary holding directory**

```bash
cd /Users/seosecreto/Downloads/safari-tanzania/src/pages
mkdir -p _temp_en
cp -r en/* _temp_en/
```

- [ ] **Step 3: Move current ES root pages to /es/**

Move all ES page directories and files (except `index.astro` and `en/`) into a new `es/` directory:

```bash
mkdir -p es
# Move ES directories
mv safaris es/
mv actividades es/
mv hospedaje es/
mv parques-nacionales es/
mv precios es/
mv como-llegar es/
mv contacto es/
mv aviso-privacidad es/
mv terminos es/
mv campamentos es/
mv lodges es/
mv blog es/
# Move ES index to es/index.astro
mv index.astro es/index.astro
```

- [ ] **Step 4: Move EN pages from temp to root**

```bash
# Move EN pages to root
cp -r _temp_en/* .
rm -rf _temp_en
rm -rf en
```

- [ ] **Step 5: Update all internal references in moved pages**

Every ES page that imports from `../layouts/` or `../components/` now needs `../../` since it's one directory deeper. Similarly, EN pages that were at `../../layouts/` now need `../layouts/`.

This requires updating import paths in EVERY moved `.astro` file. Use search and replace:

For ES pages (now deeper by 1 level):
- `../layouts/BaseLayout.astro` → `../../layouts/BaseLayout.astro`
- `../components/` → `../../components/`
- `../i18n/` → `../../i18n/`

For EN pages (now shallower by 1 level):
- `../../layouts/BaseLayout.astro` → `../layouts/BaseLayout.astro`
- `../../components/` → `../components/`
- `../../i18n/` → `../i18n/`

Also update any `lang` prop values: ES pages should pass `lang="es"`, EN pages should pass `lang="en"` (verify these are correct after the move).

- [ ] **Step 6: Build and verify 0 errors**

```bash
npx astro build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "i18n: restructure pages — EN at root, ES at /es/"
```

---

### Task 1.12: Rename Author Files

**Files:**
- Rename: `src/content/authors/equipo-safari.json` → `es-equipo-safari.json`
- Rename: `src/content/authors/guia-local.json` → `es-guia-local.json`

- [ ] **Step 1: Rename files**

```bash
cd /Users/seosecreto/Downloads/safari-tanzania/src/content/authors
mv equipo-safari.json es-equipo-safari.json
mv guia-local.json es-guia-local.json
```

- [ ] **Step 2: Update any references to old filenames in blog posts**

Search all blog post frontmatter for `authorSlug: 'equipo-safari'` or `authorSlug: 'guia-local'` and update to `es-equipo-safari` / `es-guia-local` for ES posts. EN posts already use `en-` prefix.

- [ ] **Step 3: Update blog `[slug].astro` and `authors/[slug].astro` to handle the new naming pattern**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "i18n: rename author files to consistent {lang}-{slug} pattern"
```

---

### Task 1.13: Build Verification

- [ ] **Step 1: Full build test**

```bash
cd /Users/seosecreto/Downloads/safari-tanzania
npx astro build
```

Expected: 0 errors. All ES pages now live under `/es/`, EN pages at root.

- [ ] **Step 2: Dev server smoke test**

```bash
npx astro dev
```

Verify in browser:
- `http://localhost:4321/` → EN homepage
- `http://localhost:4321/es/` → ES homepage
- `http://localhost:4321/safaris/` → EN safaris (was at /en/safaris/)
- `http://localhost:4321/es/safaris/` → ES safaris (was at /safaris/)

- [ ] **Step 3: Commit if any fixes were needed**

---

## Chunk 2: 3D Homepage Integration

This chunk creates the 3D immersive homepage within the Astro project.

### Task 2.1: Prepare Homepage Assets

**Files:**
- Create: `public/media/homepage/` directory
- Create: `public/fonts/african.woff2`

- [ ] **Step 1: Create homepage media directory and copy assets**

```bash
mkdir -p /Users/seosecreto/Downloads/safari-tanzania/public/media/homepage
cp "/Users/seosecreto/Documents/3d 1/video_fondo_negro.mp4" /Users/seosecreto/Downloads/safari-tanzania/public/media/homepage/
cp "/Users/seosecreto/Documents/3d 1/safari_classic.jpg" /Users/seosecreto/Downloads/safari-tanzania/public/media/homepage/
cp "/Users/seosecreto/Documents/3d 1/safari_balloon.jpg" /Users/seosecreto/Downloads/safari-tanzania/public/media/homepage/
cp "/Users/seosecreto/Documents/3d 1/safari_luxury.jpg" /Users/seosecreto/Downloads/safari-tanzania/public/media/homepage/
```

- [ ] **Step 2: Convert African font to woff2 and copy**

```bash
# If woff2_compress is available:
# woff2_compress "/Users/seosecreto/Documents/3d 1/fonts/african.ttf"
# Otherwise copy the ttf and convert via an online tool or npm package
cp "/Users/seosecreto/Documents/3d 1/fonts/african.ttf" /Users/seosecreto/Downloads/safari-tanzania/public/fonts/african.ttf
```

- [ ] **Step 3: Copy the compressed background video**

Once the user selects a fragment and it's extended to 60s:

```bash
cp "/Users/seosecreto/Documents/3d 1/video-fragments/[SELECTED]-60s.mp4" /Users/seosecreto/Downloads/safari-tanzania/public/media/homepage/safari-bg.mp4
```

**Note:** This step is blocked until the user selects a video fragment. Use placeholder path for now and update later.

- [ ] **Step 4: Download and self-host Montserrat woff2 files (GDPR compliance for DE users)**

```bash
# Download Montserrat weights 400, 600, 800 from google-webfonts-helper or fontsource
npm install @fontsource/montserrat
cp node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2 public/fonts/
cp node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff2 public/fonts/
cp node_modules/@fontsource/montserrat/files/montserrat-latin-800-normal.woff2 public/fonts/
npm uninstall @fontsource/montserrat
```

- [ ] **Step 5: Commit**

```bash
git add public/media/homepage/ public/fonts/
git commit -m "assets: add 3D homepage media, fonts, and video"
```

---

### Task 2.2: Create homepage.css

**Files:**
- Create: `src/styles/homepage.css`

- [ ] **Step 1: Adapt the 3D project's style.css into homepage.css**

Take the full `style.css` from `/Documents/3d 1/style.css` (535 lines) and adapt:
- Update font-face `src` paths to `/fonts/african.ttf` (or woff2)
- Update Montserrat to use self-hosted `@font-face` instead of Google Fonts link
- Update asset paths: `safari_classic.jpg` → `/media/homepage/safari_classic.jpg` etc.
- Keep all responsive breakpoints
- Keep all glassmorphism, neon, and animation styles intact

- [ ] **Step 2: Commit**

```bash
git add src/styles/homepage.css
git commit -m "styles: create homepage.css with neon/dark theme"
```

---

### Task 2.3: Extract Footer Standalone CSS

**Files:**
- Create: `src/styles/footer-standalone.css`

- [ ] **Step 1: Extract footer-related CSS from global.css**

Read `src/styles/global.css` lines 1039-1130 (footer section) plus any dependent variables/tokens from lines 1-50 (CSS custom properties). Create `footer-standalone.css` containing:

1. The CSS custom properties needed by the footer (colors, radius, gap, shadows, font families)
2. All `.footer*` classes
3. `.whatsapp-fab*` classes
4. `.lang-selector*` classes
5. `.back-to-top` class
6. Responsive footer rules from the end of global.css
7. Button classes used by the footer (`.btn`, `.btn--primary`, `.btn--outline`)

This file is loaded by `HomepageLayout.astro` to render the Footer correctly without the full global.css.

- [ ] **Step 2: Commit**

```bash
git add src/styles/footer-standalone.css
git commit -m "styles: extract footer standalone CSS for 3D homepage"
```

---

### Task 2.4: Create HomepageNav.astro

**Files:**
- Create: `src/components/HomepageNav.astro`

- [ ] **Step 1: Create the glassmorphism navigation component**

```astro
---
import type { Lang } from '../i18n/config';
import { languages } from '../i18n/config';
import { t } from '../i18n/utils';
import { getAlternatePath } from '../i18n/routes';

interface Props {
  lang?: Lang;
}

const lang: Lang = Astro.props.lang || 'en';
---

<nav class="hp-nav" id="hp-nav" aria-label="Main navigation">
  <div class="hp-nav__inner">
    <a href={lang === 'en' ? '/' : `/${lang}/`} class="hp-nav__logo" aria-label="Safari Tanzania Home">
      Safari Tanzania
    </a>
    <div class="hp-nav__links">
      <a href={getAlternatePath('/safaris/', lang)}>{t('nav.safaris', lang)}</a>
      <a href={getAlternatePath('/prices/', lang)}>{t('nav.prices', lang)}</a>
      <a href={getAlternatePath('/contact/', lang)}>{t('nav.contact', lang)}</a>
      <div class="hp-nav__lang">
        {Object.entries(languages).map(([code, config]) => (
          <a
            href={code === 'en' ? '/' : `/${code}/`}
            class:list={['hp-nav__lang-item', { active: code === lang }]}
          >
            {code.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  </div>
</nav>

<style>
  .hp-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 1rem 5%;
    transition: all 0.4s ease;
  }
  .hp-nav.scrolled {
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .hp-nav__inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hp-nav__logo {
    font-family: 'African', sans-serif;
    font-size: 1.5rem;
    color: #fff;
    text-decoration: none;
    opacity: 0.6;
    transition: opacity 0.3s, text-shadow 0.3s;
    text-shadow: 0 0 10px rgba(255, 170, 0, 0.3);
  }
  .hp-nav.scrolled .hp-nav__logo {
    opacity: 1;
    text-shadow: 0 0 15px rgba(255, 170, 0, 0.6);
  }
  .hp-nav__links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  .hp-nav__links a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: color 0.3s, text-shadow 0.3s;
  }
  .hp-nav.scrolled .hp-nav__links a {
    color: rgba(255, 255, 255, 0.85);
  }
  .hp-nav__links a:hover {
    color: #ffaa00;
    text-shadow: 0 0 10px rgba(255, 170, 0, 0.5);
  }
  .hp-nav__lang {
    display: flex;
    gap: 0.5rem;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    padding-left: 1.5rem;
  }
  .hp-nav__lang-item {
    font-size: 0.75rem !important;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    border: 1px solid transparent;
  }
  .hp-nav__lang-item.active {
    border-color: rgba(255, 170, 0, 0.5);
    color: #ffaa00 !important;
  }
  @media (max-width: 768px) {
    .hp-nav__links { gap: 1rem; }
    .hp-nav__links a { font-size: 0.75rem; }
    .hp-nav__lang { padding-left: 0.75rem; }
  }
</style>

<script>
  const nav = document.getElementById('hp-nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav?.classList.add('scrolled');
        } else {
          nav?.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HomepageNav.astro
git commit -m "feat: create HomepageNav glassmorphism component"
```

---

### Task 2.5: Create HomepageLayout.astro

**Files:**
- Create: `src/layouts/HomepageLayout.astro`

- [ ] **Step 1: Create the standalone homepage layout**

This layout does NOT extend BaseLayout. It has its own `<head>` with minimal SEO, loads homepage.css + footer-standalone.css, and includes the Footer at the bottom.

```astro
---
import type { Lang } from '../i18n/config';
import { languages } from '../i18n/config';
import { getHreflangs } from '../i18n/routes';
import { t } from '../i18n/utils';
import Footer from '../components/Footer.astro';
import HomepageNav from '../components/HomepageNav.astro';
import '../styles/homepage.css';
import '../styles/footer-standalone.css';

export interface Props {
  title: string;
  description: string;
  lang?: Lang;
}

const { title, description } = Astro.props;
const lang: Lang = Astro.props.lang || 'en';
const langConfig = languages[lang];
const siteUrl = 'https://safaritanzania.info';
const hreflangs = getHreflangs(Astro.url.pathname, lang);
const canonicalUrl = `${siteUrl}${Astro.url.pathname}`;

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Safari Tanzania",
    "url": siteUrl,
    "inLanguage": langConfig.locale,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Safari Tanzania",
    "url": siteUrl,
    "telephone": "+255753000000",
    "email": "info@safaritanzania.info",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Arusha",
      "addressCountry": "TZ"
    }
  }
];
---
<!DOCTYPE html>
<html lang={langConfig.locale}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="canonical" href={canonicalUrl}>
  <!-- Hreflang -->
  <link rel="alternate" hreflang="en" href={`${siteUrl}${hreflangs.en}`} />
  <link rel="alternate" hreflang="es" href={`${siteUrl}${hreflangs.es}`} />
  <link rel="alternate" hreflang="de" href={`${siteUrl}${hreflangs.de}`} />
  <link rel="alternate" hreflang="fr" href={`${siteUrl}${hreflangs.fr}`} />
  <link rel="alternate" hreflang="x-default" href={`${siteUrl}${hreflangs.en}`} />
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content={canonicalUrl}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:locale" content={langConfig.ogLocale}>
  <meta property="og:site_name" content="Safari Tanzania">
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Fonts: self-hosted -->
  <link rel="preload" href="/fonts/african.ttf" as="font" type="font/truetype" crossorigin>
  <link rel="preload" href="/fonts/montserrat-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <!-- Schema -->
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
  <meta name="theme-color" content="#ffaa00">
</head>
<body>
  <HomepageNav lang={lang} />
  <slot />
  <Footer lang={lang} />

  <script>
    // Back to top (shared with BaseLayout behaviour)
    const backToTopBtn = document.getElementById('back-to-top');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 400) {
            backToTopBtn?.classList.add('is-visible');
          } else {
            backToTopBtn?.classList.remove('is-visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  </script>
</body>
</html>

<!-- CSS loaded via frontmatter imports above -->
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/HomepageLayout.astro
git commit -m "feat: create HomepageLayout with isolated head and footer bridge"
```

---

### Task 2.6: Create homepage-3d.ts (Three.js Module)

**Files:**
- Create: `src/scripts/homepage-3d.ts`

- [ ] **Step 1: Convert main.js to TypeScript module**

Take the full `/Documents/3d 1/main.js` (448 lines) and adapt:
- Change CDN imports to npm: `import * as THREE from 'three'` (Vite resolves from node_modules)
- Change `three/addons/` to `three/examples/jsm/`
- Change `gsap` CDN to npm import: `import gsap from 'gsap'` and `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
- Update video `src` references: `videoplaybackkkk.mp4` → `/media/homepage/safari-bg.mp4`
- Keep ALL shader code, particle systems, bloom pass, interaction handlers, and scroll animations intact
- Keep ALL mobile performance optimisations

The file should be a self-executing module (everything runs on import).

- [ ] **Step 2: Commit**

```bash
git add src/scripts/homepage-3d.ts
git commit -m "feat: convert 3D homepage main.js to TypeScript module"
```

---

### Task 2.7: Create EN Homepage (index.astro)

**Files:**
- Create: `src/pages/index.astro` (replaces the current EN homepage that was moved from /en/)

- [ ] **Step 1: Create the 3D homepage with all 7 sections**

The homepage uses `HomepageLayout.astro` and contains all the HTML from the original 3D project's `index.html`, adapted for Astro:
- All glass-box sections
- TikTok grid with 6 embeds
- Pricing cards with safari images (paths updated to `/media/homepage/`)
- Cerveza Safari video scrubbing section
- Conclusion section
- The `<script type="module">` that imports `homepage-3d.ts`
- TikTok script as `<script is:inline src="https://www.tiktok.com/embed.js" async>`

All text content in British English.

- [ ] **Step 2: Verify in browser**

```bash
npx astro dev
```

Visit `http://localhost:4321/` — should show the full 3D experience.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: create 3D immersive homepage (EN)"
```

---

### Task 2.8: Create ES/DE/FR Homepage Variants

**Files:**
- Create: `src/pages/es/index.astro`
- Create: `src/pages/de/index.astro`
- Create: `src/pages/fr/index.astro`

- [ ] **Step 1: Create ES homepage**

Copy the EN `index.astro` and translate all text content to Spanish. Update `lang="es"` prop on HomepageLayout.

- [ ] **Step 2: Create DE homepage**

Same structure, all text translated to German. Pass `lang="de"`.

- [ ] **Step 3: Create FR homepage**

Same structure, all text translated to French. Pass `lang="fr"`.

- [ ] **Step 4: Verify all 4 homepages in browser**

- `http://localhost:4321/` → EN
- `http://localhost:4321/es/` → ES
- `http://localhost:4321/de/` → DE
- `http://localhost:4321/fr/` → FR

- [ ] **Step 5: Commit**

```bash
git add src/pages/es/index.astro src/pages/de/index.astro src/pages/fr/index.astro
git commit -m "feat: create 3D homepage in ES, DE, FR"
```

---

## Chunk 3: DE + FR Page Creation

This chunk creates all 28 non-homepage page templates for DE and FR. These can be created in parallel.

### Task 3.1: Create DE Pages — Safaris

**Files:**
- Create: `src/pages/de/safaris/index.astro`
- Create: `src/pages/de/safaris/klassische-safari/index.astro`
- Create: `src/pages/de/safaris/foto-safari/index.astro`
- Create: `src/pages/de/safaris/nacht-safari/index.astro`

- [ ] **Step 1: Create each page**

Base each on the EN equivalent (`src/pages/safaris/*.astro`). Translate all content to German. Update:
- `lang="de"` prop
- Import paths (relative to `de/safaris/`)
- All text content to German
- Schema JSON-LD in German
- Breadcrumb labels in German
- Internal links to use `/de/` prefix

- [ ] **Step 2: Commit**

```bash
git add src/pages/de/safaris/
git commit -m "pages: create DE safari pages (hub + 3 subpages)"
```

---

### Task 3.2: Create DE Pages — Activities

**Files:** 5 files in `src/pages/de/aktivitaeten/`

- [ ] **Step 1: Create hub + 4 subpages (wildtierbeobachtung, buschwanderungen, safari-fotografie, heissluftballon)**

Base on EN equivalents. Full German translation.

- [ ] **Step 2: Commit**

```bash
git add src/pages/de/aktivitaeten/
git commit -m "pages: create DE activity pages (hub + 4 subpages)"
```

---

### Task 3.3: Create DE Pages — Remaining (Lodging, Parks, Prices, Contact, Legal, Blog, Extras)

**Files:** 19 remaining DE page files

- [ ] **Step 1: Create all remaining DE pages**

Pages to create:
- `de/unterkunft/` (hub + lodges + camps)
- `de/nationalparks/index.astro`
- `de/preise/index.astro`
- `de/anreise/index.astro`
- `de/kontakt/index.astro`
- `de/datenschutz/index.astro`
- `de/agb/index.astro`
- `de/lodges/index.astro`
- `de/camps/index.astro`
- `de/blog/index.astro`
- `de/blog/tansania-safaris/index.astro`
- `de/blog/abenteuer-aktivitaeten/index.astro`
- `de/blog/lodges-camps/index.astro`
- `de/blog/reisefuehrer/index.astro`
- `de/blog/masai-kultur/index.astro`
- `de/blog/autoren/[slug].astro`
- `de/blog/[slug].astro`

- [ ] **Step 2: Commit**

```bash
git add src/pages/de/
git commit -m "pages: create all remaining DE pages (19 templates)"
```

---

### Task 3.4: Create FR Pages — All 28 Templates

**Files:** 28 files in `src/pages/fr/`

- [ ] **Step 1: Create all FR pages**

Same process as DE. Full French translation. Pages follow the FR route structure from the spec:
- `fr/safaris/` (hub + safari-classique, safari-photo, safari-nocturne)
- `fr/activites/` (hub + observation-faune, marches-brousse, photographie-safari, montgolfiere)
- `fr/hebergement/` (hub + lodges, campements)
- `fr/parcs-nationaux/`
- `fr/prix/`
- `fr/comment-venir/`
- `fr/contact/`
- `fr/politique-confidentialite/`
- `fr/conditions/`
- `fr/lodges/`
- `fr/campements/`
- `fr/blog/` (hub + 5 silos + auteurs/[slug] + [slug])

- [ ] **Step 2: Commit**

```bash
git add src/pages/fr/
git commit -m "pages: create all FR pages (28 templates)"
```

---

## Chunk 4: Blog Content — DE + FR Posts + New Lodges Post

### Task 4.1: Create DE Blog Posts (11)

**Files:**
- Create: 11 files in `src/content/blog/de-*.md`

- [ ] **Step 1: Translate all 10 existing posts to German + create 1 new lodges post**

Each post follows the Zod schema with `lang: 'de'`, German silo names, translated frontmatter and content. Posts:

1. `de-was-ist-ein-safari-tansania.md`
2. `de-grosse-migration-serengeti.md`
3. `de-beste-zeit-safari-tansania.md`
4. `de-safari-preise-2026.md`
5. `de-anreise-tansania.md`
6. `de-was-mitnehmen-safari.md`
7. `de-safari-mit-kindern.md`
8. `de-sicherheit-safari.md`
9. `de-wandern-kilimanjaro.md`
10. `de-masai-kultur-tansania.md`
11. `de-beste-safari-lodges-serengeti.md` (NEW — fills lodges-camps silo)

- [ ] **Step 2: Commit**

```bash
git add src/content/blog/de-*
git commit -m "blog: add 11 German blog posts with full translations"
```

---

### Task 4.2: Create FR Blog Posts (11)

**Files:**
- Create: 11 files in `src/content/blog/fr-*.md`

- [ ] **Step 1: Translate all 10 existing posts to French + create 1 new lodges post**

1. `fr-quest-ce-quun-safari-tanzanie.md`
2. `fr-grande-migration-serengeti.md`
3. `fr-meilleure-periode-safari-tanzanie.md`
4. `fr-prix-safari-2026.md`
5. `fr-comment-aller-tanzanie.md`
6. `fr-que-emporter-safari.md`
7. `fr-safari-avec-enfants.md`
8. `fr-securite-safari.md`
9. `fr-randonnee-kilimandjaro.md`
10. `fr-culture-masai-tanzanie.md`
11. `fr-meilleurs-lodges-safari-serengeti.md` (NEW — fills lodges-campements silo)

- [ ] **Step 2: Commit**

```bash
git add src/content/blog/fr-*
git commit -m "blog: add 11 French blog posts with full translations"
```

---

### Task 4.3: Create New EN + ES Lodges Post

**Files:**
- Create: `src/content/blog/en-best-safari-lodges-serengeti.md`
- Create: `src/content/blog/es-mejores-lodges-safari-serengeti.md`

- [ ] **Step 1: Create EN post (fills lodges-camps silo)**

Frontmatter:
```yaml
title: "Best Safari Lodges in the Serengeti"
silo: "lodges-camps"
lang: "en"
# ... full frontmatter
```

- [ ] **Step 2: Create ES post (fills hospedaje-lodges silo)**

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/en-best-safari-lodges-serengeti.md src/content/blog/es-mejores-lodges-safari-serengeti.md
git commit -m "blog: add lodges post in EN and ES (fills empty silo)"
```

---

### Task 4.4: Create DE + FR Author Files

**Files:**
- Create: `src/content/authors/de-safari-team.json`
- Create: `src/content/authors/de-lokaler-guide.json`
- Create: `src/content/authors/fr-equipe-safari.json`
- Create: `src/content/authors/fr-guide-local.json`

- [ ] **Step 1: Create all 4 author files**

Translate name, role, bio, expertise from EN originals.

- [ ] **Step 2: Commit**

```bash
git add src/content/authors/
git commit -m "blog: add DE and FR author profiles"
```

---

## Chunk 5: Polish — Redirects, 404, Schema, British English

### Task 5.0: Update LanguageSelector + Header for 4 Languages

**Files:**
- Modify: `src/components/LanguageSelector.astro`
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Update LanguageSelector.astro to show 4 languages (EN/ES/DE/FR)**

The existing component handles EN/ES toggle. Expand to render 4 language options using the `languages` config. Each option links to the `getAlternatePath()` for that language.

- [ ] **Step 2: Verify Header.astro works with the updated LanguageSelector**

The Header imports LanguageSelector — verify it renders correctly with 4 options.

- [ ] **Step 3: Commit**

```bash
git add src/components/LanguageSelector.astro src/components/Header.astro
git commit -m "i18n: update LanguageSelector and Header for 4-language support"
```

---

### Task 5.1: Create _redirects File

**Files:**
- Create: `public/_redirects`

- [ ] **Step 1: Create the complete 301 redirect map from the spec (section 3.6)**

Include all ES root-to-/es/ redirects, EN /en/-to-root redirects, and ES blog post slug redirects.

- [ ] **Step 2: Commit**

```bash
git add public/_redirects
git commit -m "seo: add 301 redirect map for i18n URL inversion"
```

---

### Task 5.2: Create 404 Page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create a 4-language 404 page**

Uses `BaseLayout.astro`. Auto-detects browser language via `navigator.language` in a small client-side script. Shows a safari-themed "Lost in the savannah?" message with a link to the homepage. Shows message in EN by default, with a language selector to switch.

- [ ] **Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: create 4-language 404 page with safari theme"
```

---

### Task 5.3: Fill Empty EN Schema

**Files:**
- Modify: 9 EN pages that currently have `schema={[]}` empty

Pages to fix:
1. `/blog/index.astro` (EN hub) → CollectionPage schema
2. `/blog/tanzania-safaris/index.astro` → CollectionPage
3. `/blog/adventure-activities/index.astro` → CollectionPage
4. `/blog/lodges-camps/index.astro` → CollectionPage
5. `/blog/travel-guides/index.astro` → CollectionPage
6. `/blog/masai-culture/index.astro` → CollectionPage
7. `/blog/authors/[slug].astro` → Person schema
8. `/privacy-policy/index.astro` → WebPage
9. `/terms/index.astro` → WebPage

**Note:** These are now at root (EN default) after the restructure in Task 1.11.

- [ ] **Step 1: Add real schema to each page**

- [ ] **Step 2: Commit**

```bash
git add src/pages/blog/ src/pages/privacy-policy/ src/pages/terms/
git commit -m "seo: fill empty schema JSON-LD in 9 pages"
```

---

### Task 5.4: British English Content Review

- [ ] **Step 1: Search and fix American English spellings in EN content**

```bash
grep -rn "color\b" src/pages/ --include="*.astro" | grep -v "\.css\|style\|background-color\|border-color"
grep -rn "center\b" src/pages/ --include="*.astro" | grep -v "\.css\|style\|text-align"
grep -rn "traveling\|organization\|license[^d]\|program[^m]" src/pages/ --include="*.astro"
```

Fix any American spellings in text content (not CSS properties).

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "content: British English spelling review across EN pages"
```

---

### Task 5.5: Final Build + Full Verification

- [ ] **Step 1: Full build**

```bash
cd /Users/seosecreto/Downloads/safari-tanzania
npx astro build
```

Expected: 0 errors

- [ ] **Step 2: Count output pages**

```bash
find dist -name "index.html" | wc -l
```

Expected: ~116+ pages (29 per language × 4 + blog posts)

- [ ] **Step 3: Verify sitemap**

```bash
cat dist/sitemap-index.xml
```

Expected: references to sitemap files with URLs for all 4 languages

- [ ] **Step 4: Dev server smoke test of key pages**

```
http://localhost:4321/           → EN 3D homepage
http://localhost:4321/es/        → ES 3D homepage
http://localhost:4321/de/        → DE 3D homepage
http://localhost:4321/fr/        → FR 3D homepage
http://localhost:4321/safaris/   → EN safaris (MC design)
http://localhost:4321/es/safaris/ → ES safaris
http://localhost:4321/de/safaris/ → DE safaris
http://localhost:4321/fr/safaris/ → FR safaris
http://localhost:4321/blog/      → EN blog hub
http://localhost:4321/de/blog/   → DE blog hub
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "build: verified full 4-language build — 116+ pages, 0 errors"
```

---

## Task Dependency Graph

```
Chunk 1 (Foundation) ─────────────────────┐
  Tasks 1.1-1.13 (sequential)              │
                                           ▼
                                    ┌──────────────┐
                                    │              │
                              Chunk 2         Chunk 3
                            (3D Homepage)   (DE+FR Pages)
                              Tasks 2.1-2.8   Tasks 3.1-3.4
                                    │              │
                                    │         Chunk 4
                                    │       (Blog Content)
                                    │        Tasks 4.1-4.4
                                    │              │
                                    └──────┬───────┘
                                           ▼
                                      Chunk 5
                                      (Polish)
                                    Tasks 5.1-5.5
```

**Parallelism:** After Chunk 1 completes:
- Chunk 2 and Chunk 3 can run in parallel
- Chunk 4 can start after Chunk 3 (needs page templates for blog routes)
- Chunk 5 runs last (depends on everything else)

Within Chunk 3, DE and FR pages can be created in parallel (Tasks 3.1-3.3 and Task 3.4).
