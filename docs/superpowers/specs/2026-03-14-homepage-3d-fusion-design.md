# Safari Tanzania — Homepage 3D Fusion Design Spec

**Date:** 2026-03-14
**Project:** safaritanzania.info
**Scope:** Merge 3D immersive homepage into existing Astro project + expand i18n to 4 languages

---

## 1. Overview

The standalone 3D homepage (`/Documents/3d 1/`) replaces the current `index.astro` in the Astro project (`/Downloads/safari-tanzania/`). The homepage becomes a fully immersive visual experience with Three.js holograms, GSAP scroll animations, TikTok embeds, neon pricing cards, and Apple-style video scrubbing. The remaining 28 page templates × 4 languages = 112 non-homepage pages retain the MC design system.

The i18n system inverts from ES-default to EN-default (British English) and expands from 2 to 4 languages: EN, ES, DE, FR.

**Goal:** Visually captivate visitors into falling in love with Tanzania safaris. Not a sales funnel — an emotional magnet.

---

## 2. Architecture

### 2.1 Homepage 3D (Immersive Experience)

**Layout:** `HomepageLayout.astro` — standalone layout, does NOT extend `BaseLayout.astro`.

**What it loads:**
- `homepage.css` (adapted from the neon/dark `style.css`)
- `homepage-3d.ts` (Three.js + shaders, adapted from `main.js`)
- GSAP + ScrollTrigger via npm
- Three.js via npm (no CDN, no import maps)
- TikTok embed script via `<script is:inline>`
- Font: African (self-hosted woff2, converted from ttf) + Montserrat (self-hosted woff2, not Google Fonts — GDPR compliance for DE users)

**What it does NOT load:**
- `global.css` (MC design system)
- `Header.astro` (MC navigation)

**HomepageLayout.astro `<head>` contents:**
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<title>` (per language)
- `<meta name="description">` (per language)
- `<link rel="canonical">` (per language)
- Hreflang links (EN, ES, DE, FR, x-default)
- Open Graph tags (og:title, og:description, og:image, og:url, og:locale, og:site_name)
- Twitter Card tags (summary_large_image)
- `<link rel="icon" href="/favicon.svg">`
- Font preloads (African woff2, Montserrat woff2)
- Lightweight Schema JSON-LD: `WebSite` + `Organization` (minimal but present for structured data)
- `<meta name="theme-color" content="#ffaa00">`
- `homepage.css` import

**Sections (preserved from 3D project):**
1. Hero — "Wild Tanzania" + Three.js holographic animal point clouds + scroll indicator
2. Details — "Tanzania Safari" descriptive text in glass-box
3. TikTok Grid — 6 TikTok embeds in responsive grid
4. Immersion — "The Migration" text in glass-box
5. Pricing Cards — Classic $1,299 / Adventure $2,499 / VIP $4,999 with safari images
6. Cerveza Safari — Apple-style video scrubbing with multiply blend mode on white background
7. Conclusion — "Awaken Africa"
8. Footer — MC Footer component (only shared element with rest of site)

**3D Features preserved:**
- Three.js point cloud holograms (lion, zebra, giraffe) from emoji pixel sampling
- Custom GLSL vertex/fragment shaders with undulation, mouse/touch interaction, click explosion
- UnrealBloomPass post-processing with colour-shifting tint
- GSAP ScrollTrigger: animal opacity transitions, bloom intensity, container rotation
- Savannah firefly particle system
- Cursor parallax tilt on the animal container
- Mobile performance optimisations (reduced particle count, lower pixel ratio, half-res bloom)
- Video background with Three.js VideoTexture as scene background
- Native HTML5 video scrubbing for Cerveza Safari section

### 2.2 Homepage Navigation (HomepageNav.astro)

**Behaviour:**
- Position: fixed, top, full width, high z-index
- On page load: logo at low opacity, links barely visible — hero 3D dominates
- On scroll (scroll listener): nav solidifies with `backdrop-filter: blur(12px)`, glass border, links become fully visible with neon accent
- Style: glassmorphism matching the dark/neon homepage aesthetic

**Contents:**
- Logo: "Safari Tanzania" text or SVG in neon style
- Links: Safaris, Prices, Contact (pointing to MC site pages)
- Language selector: dropdown with EN / ES / DE / FR flags or codes
- All links use neon hover effects consistent with homepage aesthetic

### 2.3 Footer Bridge

The MC `Footer.astro` component is the only design system element on the homepage. It requires:
- Extracting its required CSS into a `footer-standalone.css` partial
- `HomepageLayout.astro` loads this partial after `homepage.css`

This ensures the footer renders correctly without loading the full 2,036-line `global.css`.

### 2.4 Rest of Site (28 page templates × 4 languages = 112 pages)

No changes to the design system. Pages continue using:
- `BaseLayout.astro` with full `<head>` (SEO, OG, hreflang, Schema)
- `Header.astro` (MC navigation with dropdowns)
- `Footer.astro`
- `global.css` (MC design tokens)
- All 14 existing components

---

## 3. i18n Expansion

### 3.1 Language Configuration

| Language | Code | Locale | Path prefix | Status |
|---|---|---|---|---|
| English (British) | en | en-GB | `/` (default) | Invert from secondary to default |
| Spanish | es | es-ES | `/es/` | Invert from default to secondary |
| German | de | de-DE | `/de/` | New |
| French | fr | fr-FR | `/fr/` | New |

**Astro config:** i18n is handled via file-based routing (manual), NOT Astro's built-in `i18n` config. This matches the existing approach. `astro.config.mjs` gets updated for sitemap language awareness but routing remains file-based.

### 3.2 British English Standards

All English content uses British spelling:
- colour, favour, honour (not color, favor, honor) — in text content only, CSS properties remain American (`color`, `center`)
- travelling, cancelled (not traveling, canceled)
- organisation, specialise (not organization, specialize)
- programme (not program, except computer program)
- centre, metre (not center, meter) — in text content only
- licence (noun), license (verb)

### 3.3 Files Updated

```
src/i18n/
  config.ts    ← 4 languages, en as default, en-GB locale
  nav.ts       ← Navigation links in EN, ES, DE, FR
  routes.ts    ← Route mapping across 4 languages (all pages including blog silos)
  schema.ts    ← Schema.org functions (unchanged logic)
  ui.ts        ← All UI strings in 4 languages
  utils.ts     ← Helpers adapted for 4 languages
  videos.ts    ← Video metadata in 4 languages
```

### 3.4 Route Structure (complete)

| EN (default) | ES | DE | FR |
|---|---|---|---|
| `/` | `/es/` | `/de/` | `/fr/` |
| `/safaris/` | `/es/safaris/` | `/de/safaris/` | `/fr/safaris/` |
| `/safaris/classic-safari/` | `/es/safaris/safari-clasico/` | `/de/safaris/klassische-safari/` | `/fr/safaris/safari-classique/` |
| `/safaris/photo-safari/` | `/es/safaris/safari-fotografico/` | `/de/safaris/foto-safari/` | `/fr/safaris/safari-photo/` |
| `/safaris/night-safari/` | `/es/safaris/safari-nocturno/` | `/de/safaris/nacht-safari/` | `/fr/safaris/safari-nocturne/` |
| `/activities/` | `/es/actividades/` | `/de/aktivitaeten/` | `/fr/activites/` |
| `/activities/wildlife-watching/` | `/es/actividades/avistamiento-fauna/` | `/de/aktivitaeten/wildtierbeobachtung/` | `/fr/activites/observation-faune/` |
| `/activities/bush-walks/` | `/es/actividades/caminatas-bush/` | `/de/aktivitaeten/buschwanderungen/` | `/fr/activites/marches-brousse/` |
| `/activities/safari-photography/` | `/es/actividades/fotografia-safari/` | `/de/aktivitaeten/safari-fotografie/` | `/fr/activites/photographie-safari/` |
| `/activities/hot-air-balloon/` | `/es/actividades/globo-aerostatico/` | `/de/aktivitaeten/heissluftballon/` | `/fr/activites/montgolfiere/` |
| `/lodging/` | `/es/hospedaje/` | `/de/unterkunft/` | `/fr/hebergement/` |
| `/lodging/lodges/` | `/es/hospedaje/lodges/` | `/de/unterkunft/lodges/` | `/fr/hebergement/lodges/` |
| `/lodging/camps/` | `/es/hospedaje/campamentos/` | `/de/unterkunft/camps/` | `/fr/hebergement/campements/` |
| `/national-parks/` | `/es/parques-nacionales/` | `/de/nationalparks/` | `/fr/parcs-nationaux/` |
| `/prices/` | `/es/precios/` | `/de/preise/` | `/fr/prix/` |
| `/how-to-get-here/` | `/es/como-llegar/` | `/de/anreise/` | `/fr/comment-venir/` |
| `/contact/` | `/es/contacto/` | `/de/kontakt/` | `/fr/contact/` |
| `/lodges/` | `/es/lodges/` | `/de/lodges/` | `/fr/lodges/` |
| `/camps/` | `/es/campamentos/` | `/de/camps/` | `/fr/campements/` |
| `/privacy-policy/` | `/es/aviso-privacidad/` | `/de/datenschutz/` | `/fr/politique-confidentialite/` |
| `/terms/` | `/es/terminos/` | `/de/agb/` | `/fr/conditions/` |
| `/blog/` | `/es/blog/` | `/de/blog/` | `/fr/blog/` |
| `/blog/tanzania-safaris/` | `/es/blog/safaris-tanzania/` | `/de/blog/tansania-safaris/` | `/fr/blog/safaris-tanzanie/` |
| `/blog/adventure-activities/` | `/es/blog/actividades-aventura/` | `/de/blog/abenteuer-aktivitaeten/` | `/fr/blog/activites-aventure/` |
| `/blog/lodges-camps/` | `/es/blog/hospedaje-lodges/` | `/de/blog/lodges-camps/` | `/fr/blog/lodges-campements/` |
| `/blog/travel-guides/` | `/es/blog/guias-viaje/` | `/de/blog/reisefuehrer/` | `/fr/blog/guides-voyage/` |
| `/blog/masai-culture/` | `/es/blog/cultura-masai/` | `/de/blog/masai-kultur/` | `/fr/blog/culture-masai/` |
| `/blog/authors/[slug]/` | `/es/blog/autores/[slug]/` | `/de/blog/autoren/[slug]/` | `/fr/blog/auteurs/[slug]/` |
| `/blog/[slug]/` | `/es/blog/[slug]/` | `/de/blog/[slug]/` | `/fr/blog/[slug]/` |

**Note:** The standalone `/lodges/` and `/camps/` pages are intentional duplicates of `/lodging/lodges/` and `/lodging/camps/` — they exist for SEO (capturing direct keyword searches). They are maintained across all 4 languages.

### 3.5 Hreflang on Every Page

```html
<link rel="alternate" hreflang="en" href="https://safaritanzania.info/{path}" />
<link rel="alternate" hreflang="es" href="https://safaritanzania.info/es/{path}" />
<link rel="alternate" hreflang="de" href="https://safaritanzania.info/de/{path}" />
<link rel="alternate" hreflang="fr" href="https://safaritanzania.info/fr/{path}" />
<link rel="alternate" hreflang="x-default" href="https://safaritanzania.info/{path}" />
```

### 3.6 301 Redirect Map (URL Inversion)

The i18n inversion breaks every existing indexed URL. A `_redirects` file for Cloudflare Pages handles this:

**ES pages moving from root to `/es/`:**
```
/safaris/*                    /es/safaris/:splat         301
/actividades/*                /es/actividades/:splat     301
/hospedaje/*                  /es/hospedaje/:splat       301
/parques-nacionales/          /es/parques-nacionales/    301
/precios/                     /es/precios/               301
/como-llegar/                 /es/como-llegar/           301
/contacto/                    /es/contacto/              301
/aviso-privacidad/            /es/aviso-privacidad/      301
/terminos/                    /es/terminos/              301
/campamentos/                 /es/campamentos/           301
/blog/safaris-tanzania/*      /es/blog/safaris-tanzania/:splat  301
/blog/actividades-aventura/*  /es/blog/actividades-aventura/:splat 301
/blog/hospedaje-lodges/*      /es/blog/hospedaje-lodges/:splat 301
/blog/guias-viaje/*           /es/blog/guias-viaje/:splat 301
/blog/cultura-masai/*         /es/blog/cultura-masai/:splat 301
/blog/autores/*               /es/blog/autores/:splat    301
/blog/                        /es/blog/                  301
/lodges/                      /es/lodges/                301
/campamentos/                 /es/campamentos/           301
```

**EN pages moving from `/en/` to root:**
```
/en/                          /                          301
/en/safaris/*                 /safaris/:splat             301
/en/activities/*              /activities/:splat          301
/en/lodging/*                 /lodging/:splat             301
/en/national-parks/           /national-parks/            301
/en/prices/                   /prices/                    301
/en/how-to-get-here/          /how-to-get-here/           301
/en/contact/                  /contact/                   301
/en/privacy-policy/           /privacy-policy/            301
/en/terms/                    /terms/                     301
/en/camps/                    /camps/                     301
/en/lodges/                   /lodges/                    301
/en/blog/*                    /blog/:splat                301
```

**ES blog post slugs** also redirect (individual posts that had ES slugs at root):
```
/blog/que-es-safari-tanzania/       /es/blog/que-es-safari-tanzania/       301
/blog/gran-migracion-serengeti/     /es/blog/gran-migracion-serengeti/     301
/blog/mejor-epoca-safari-tanzania/  /es/blog/mejor-epoca-safari-tanzania/  301
/blog/precios-safari-2026/          /es/blog/precios-safari-2026/          301
/blog/como-llegar-tanzania/         /es/blog/como-llegar-tanzania/         301
/blog/que-llevar-safari/            /es/blog/que-llevar-safari/            301
/blog/safari-con-ninos/             /es/blog/safari-con-ninos/             301
/blog/seguridad-safari/             /es/blog/seguridad-safari/             301
/blog/senderismo-kilimanjaro/       /es/blog/senderismo-kilimanjaro/       301
/blog/cultura-masai-tanzania/       /es/blog/cultura-masai-tanzania/       301
```

### 3.7 Homepage Content Translation

Each homepage `index.astro` (EN/ES/DE/FR) contains its translated text inline within the Astro template. The homepage texts are short and evocative (7 section titles + pricing card content), so they are hardcoded per-language file rather than routed through `ui.ts`. This keeps the homepage self-contained.

The `HomepageNav.astro` component receives `lang` as a prop and pulls its link labels from `ui.ts` (shared with the rest of the site's nav labels).

---

## 4. Content Inventory (Complete)

### 4.1 Pages per Language: 29

| Category | Count | Pages |
|---|---|---|
| Homepage | 1 | index (3D immersive) |
| Safaris | 4 | hub + classic + photo + night |
| Activities | 5 | hub + wildlife + bush walks + photography + balloon |
| Lodging | 3 | hub + lodges + camps |
| National Parks | 1 | national-parks |
| Prices | 1 | prices |
| How to Get Here | 1 | how-to-get-here |
| Contact | 1 | contact |
| Legal | 2 | privacy-policy + terms |
| Blog | 8 | hub + 5 silos + authors/[slug] + [slug] |
| Extra | 2 | lodges + camps (standalone, intentional SEO duplicates) |
| **Total** | **29** | × 4 languages = **116 pages** |

### 4.2 Blog Posts per Language: 11

All 11 posts translated into all 4 languages = **44 blog posts total**.

| # | EN Slug | Topic | Silo |
|---|---|---|---|
| 1 | what-is-tanzania-safari | What is a Safari | tanzania-safaris |
| 2 | great-migration-serengeti | Great Migration | tanzania-safaris |
| 3 | best-time-safari | Best Time | travel-guides |
| 4 | safari-prices-2026 | Prices 2026 | travel-guides |
| 5 | how-to-get-tanzania | How to Get There | travel-guides |
| 6 | what-to-bring-safari | What to Bring | travel-guides |
| 7 | safari-with-kids | With Kids | travel-guides |
| 8 | safari-safety-tips | Safety Tips | travel-guides |
| 9 | hiking-kilimanjaro | Kilimanjaro | adventure-activities |
| 10 | masai-culture-tanzania | Masai Culture | masai-culture |

**Note on lodges-camps silo:** Currently has 0 posts assigned. This fusion adds 1 post per language to fill it:
- EN: `best-safari-lodges-serengeti` → silo: lodges-camps
- ES: `mejores-lodges-safari-serengeti` → silo: hospedaje-lodges
- DE: `beste-safari-lodges-serengeti` → silo: lodges-camps
- FR: `meilleurs-lodges-safari-serengeti` → silo: lodges-campements

This brings the total to **44 blog posts** (11 per language).

### 4.3 Author Files: 2 per Language = 8 Total

Existing files are renamed to follow a consistent pattern: `{lang}-{slug}.json`

| EN | ES | DE | FR |
|---|---|---|---|
| en-safari-team.json | es-equipo-safari.json | de-safari-team.json | fr-equipe-safari.json |
| en-local-guide.json | es-guia-local.json | de-lokaler-guide.json | fr-guide-local.json |

**Renames from current state:**
- `equipo-safari.json` → `es-equipo-safari.json`
- `guia-local.json` → `es-guia-local.json`
- `en-safari-team.json` → stays (already prefixed)
- `en-local-guide.json` → stays (already prefixed)

### 4.4 Schema JSON-LD: Real on Every Page

No more empty `schema={[]}`. Every page gets appropriate schema:
- Homepage: WebSite + Organization (lightweight, present in HomepageLayout)
- Safaris/Activities: TouristAttraction
- Lodging: LodgingBusiness
- Blog posts: Article + BreadcrumbList
- Blog silos: CollectionPage
- FAQ sections: FAQPage
- Author pages: Person
- Legal: WebPage

---

## 5. Technical Integration

### 5.1 New Dependencies

```json
{
  "three": "0.160.0",
  "gsap": "3.12.2"
}
```

**Exact pinning** (no caret `^`). Three.js has frequent breaking changes between minor versions. GSAP pinned for reproducibility.

**GSAP licence:** GSAP 3.12.2 free licence includes ScrollTrigger. The site is not behind a paywall, so the standard (free) licence applies. No GSAP Club plugins used.

### 5.2 New Files

```
src/
  layouts/
    HomepageLayout.astro
  components/
    HomepageNav.astro
  styles/
    homepage.css
    footer-standalone.css       ← extracted footer styles for homepage
  scripts/
    homepage-3d.ts
  pages/
    index.astro                  (3D homepage EN)
    es/index.astro               (3D homepage ES)
    de/index.astro               (3D homepage DE)
    fr/index.astro               (3D homepage FR)
    de/safaris/...               (all DE pages — 28 templates)
    de/aktivitaeten/...
    de/unterkunft/...
    de/...
    fr/safaris/...               (all FR pages — 28 templates)
    fr/activites/...
    fr/hebergement/...
    fr/...
    404.astro                    (uses BaseLayout, 4-language fallback EN/ES/DE/FR with safari humour, auto-detects browser language, links to homepage)
  content/
    blog/
      de-*.md                    (11 DE blog posts)
      fr-*.md                    (11 FR blog posts)
      en-best-safari-lodges-serengeti.md   (new, fills lodges-camps silo)
      es-mejores-lodges-safari-serengeti.md (new, fills hospedaje-lodges silo)
    authors/
      de-safari-team.json
      de-lokaler-guide.json
      fr-equipe-safari.json
      fr-guide-local.json
public/
  _redirects                     (Cloudflare Pages 301 redirect map)
```

### 5.3 Assets Moved to public/

```
public/
  media/
    homepage/
      video_fondo_negro.mp4      (705KB — well under 25MB limit)
      safari_classic.jpg
      safari_balloon.jpg
      safari_luxury.jpg
  fonts/
    african.woff2                (converted from ttf to woff2 for performance)
    montserrat-latin-400.woff2   (self-hosted, not Google Fonts — GDPR)
    montserrat-latin-600.woff2
    montserrat-latin-800.woff2
```

**Background video (`videoplaybackkkk.mp4` — 322MB) strategy:**
This file exceeds Cloudflare Pages' 25MB single-file limit. Options:
1. **Compress to under 25MB** using ffmpeg (target: 720p, CRF 28-32, H.264). A safari landscape video can look excellent at 15-20MB in 720p.
2. **Host on Cloudflare R2** (object storage, same CDN edge network, no egress fees) and reference via R2 public URL.
3. **Replace with a lighter video** — the `new_safari_video.mp4` (9.4MB) already in the 3D project could work.

**Chosen strategy:** Trim to 60 seconds of the most visually impactful section at 720p CRF 28 (~6-10MB). The best 30s fragment is selected from 4 candidate excerpts (0:00, 5:00, 11:00, 18:00), then extended to 60s. The video loops seamlessly as a background. If compression quality is unacceptable, fall back to Cloudflare R2 hosting.

**Explicitly excluded assets:**
- `videoplayback.webm` (880MB) — redundant, not used
- `user_video.mp4` (6MB) — not used in the homepage
- `new_safari_video.mp4` (9.4MB) — backup candidate for background video, not primary
- `pricing_basic.png`, `pricing_pro.png`, `pricing_vip.png` — superseded by safari_classic/balloon/luxury.jpg
- `safari_beer_bottle.png`, `safari_beer_white.png` — not used in current homepage
- `cat.svg`, `dragon.svg`, `hippo.svg` — dev assets, not used

### 5.4 Existing Pages Restructured

Current ES pages at root (`/safaris/`, `/actividades/`, etc.) move to `/es/` prefix.
Current EN pages at `/en/` move to root `/`.
New DE pages created at `/de/`.
New FR pages created at `/fr/`.

All old URLs handled by 301 redirects in `public/_redirects` (see section 3.6).

### 5.5 astro.config.mjs Changes

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://safaritanzania.info',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(), // Dynamic: uses build date automatically on each deploy
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

No Astro built-in `i18n` routing — file-based routing is maintained manually.

### 5.6 Build and Deploy

- Astro 4.16 SSG (unchanged)
- @astrojs/sitemap 3.2.1 (with i18n config for 4 languages)
- Cloudflare Pages (unchanged)
- All assets under 25MB each (background video compressed or hosted on R2)
- 0 build errors required before deploy

### 5.7 Performance Considerations

- Three.js (~150KB gzipped) + GSAP (~30KB gzipped) only loaded on homepage
- Homepage total JS budget target: < 250KB gzipped
- Homepage LCP target: < 3s on 4G (hero text renders immediately, 3D loads progressively)
- TikTok embeds deferred via `content-visibility: auto` (already implemented)
- Cerveza Safari video is only 705KB — loads fast
- Background video is the heaviest asset — compression critical

---

## 6. What Is NOT Changing

- Design system MC (global.css) — untouched for non-homepage pages
- All 14 existing components — untouched (except Footer gets CSS extracted)
- BlogPostLayout.astro — untouched
- Safari video assets in public/media/ (10 unique + 10 symlinks) — untouched
- Fonts (Savior Sans + Lexend woff2) — untouched
- robots.txt, llms.txt, favicon.svg — untouched

---

## 7. Pending Items Addressed

From PENDIENTES-PRIORIDAD.md, this fusion addresses:
- [x] Schema JSON-LD in 9 EN pages → all pages get real schema (4 languages)
- [x] 404 page → create 404.astro (BaseLayout, bilingual EN fallback, safari humour)
- [x] Empty lodges-camps blog silo → new post added (4 languages)
- Other pending items (local WebP images, OG image, author photos) remain independent tasks

---

## 8. Risk Mitigation

| Risk | Mitigation |
|---|---|
| Footer CSS breaks without global.css | Extract footer styles into `footer-standalone.css` partial |
| Three.js bundle size bloats Astro build | Only loaded on homepage via page-specific `<script>` |
| TikTok embeds slow page load | `content-visibility: auto` + `is:inline` script (already implemented) |
| 116+ pages × sitemap generation | Astro sitemap handles this natively with i18n config |
| Background video 322MB exceeds Cloudflare 25MB | Compress with ffmpeg to <25MB or host on Cloudflare R2 |
| GSAP ScrollTrigger conflicts with Astro | GSAP runs client-side only in `<script>` tag, no SSR conflict |
| URL inversion breaks existing indexed URLs | Complete 301 redirect map in `public/_redirects` |
| Three.js breaking changes on update | Exact version pinning (no caret) |
| Montserrat from Google Fonts violates GDPR (DE) | Self-host Montserrat woff2 files |
| GSAP licence concerns | Free licence confirmed — ScrollTrigger included, no paywall on site |
