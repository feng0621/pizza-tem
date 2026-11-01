# Tre Fiamme 三分焰 — Neapolitan pizzeria website

A complete restaurant website template for a fictional Neapolitan pizzeria in Shanghai. It is a static site with zero dependencies: a small Node build script (`build.mjs`) turns content in `src/` into plain HTML in `dist/`, and Vercel deploys that output. English is the default language at the bare routes; the Chinese version of every page lives under `/zh`.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Scroll-driven hero (a slice bursts into its ingredients, then lands back on a plate), signature pizzas, kitchen teaser, story, events, journal, locations |
| `/menu` | Full menu with filters; every dish opens a detail dialog (ingredients, origin, allergens, sizes) and can be added to a cart (demo checkout) |
| `/craft` | The kitchen film: scroll scrubs real kitchen footage from dough to table, with a kitchen ticket and live station cards |
| `/about` | Name story, timeline, values, team (click for bios), ingredient origins |
| `/locations` | Two stores with live open/closed status in Shanghai time, hours, FAQ, contact form (demo) |
| `/events` | Pizza class sign-up, private dinner enquiry, gift card designer with live preview (all demo) |
| `/journal` + 4 articles | Long-form posts with reading progress |
| `/reserve` | Reservation flow: store → date → time → party → seating, with simulated availability (demo) |
| `/credits` | Photo and video sources |

## Run locally

```bash
npm run dev
```

This builds into `dist/` and serves it at http://localhost:4321 with clean URLs and HTTP range support (needed for video scrubbing). Node 18 or newer, nothing to install.

## Edit content

- **Chinese text and shared facts (prices, hours, photos, tags):** `src/data.mjs`
- **English text:** `src/data.en.mjs`, overlaid by id in `src/content.mjs`
- **Page markup:** `src/pages/*.mjs` (each exports `pages(lang)` returning one or more pages; UI strings sit inline as `tr('中文', 'English')`)
- **Shared head, navigation, footer:** `src/layout.mjs`
- **Styles:** `public/css/site.css` (shared), `home.css`, `craft.css`, `pages.css`
- **Behaviour:** `public/js/site.js` (nav, dialogs, store hours, the `TF.tr` string helper), `fx.js` (motion layer), plus one script per interactive page
- **Photos:** `public/media/photos/<name>.webp` (1600 px) and `<name>-sm.webp` (800 px); register new ones in `src/photos.json`

## Deploy

The repo is ready for Vercel: `vercel.json` sets the build command (`npm run build`), the output directory (`dist`) and clean URLs. Import the repository at vercel.com/new and every push to `main` redeploys.

## Notes

- Tre Fiamme 三分焰 is fictional. Names, addresses, phone numbers, prices and all ordering, booking and sign-up flows are demonstrations and do not send anything.
- Photos and kitchen footage come from Pexels; the basil and tomato cut-outs come from Pixabay. See `/credits` for each source.
- Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis) 1.1.13 (MIT), vendored in `public/js/vendor/`.
