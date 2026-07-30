# Farih Muwaffaq portfolio

Static Astro + TypeScript portfolio. The original `PRD_Portfolio_Farih_Muwaffaq_EN.md` remains the content source and is not modified.

## Architecture

- `src/content/work/` — six validated Markdown case studies.
- `src/content.config.ts` — collection schema including safe structured `relatedAssets`.
- `src/layouts/` — global SEO shell and case-study layout.
- `src/components/` — reusable cards, filter grid, and accessible lightbox.
- `src/pages/` — Home, Work, six generated work routes, About, Resume, Contact, and 404.
- `src/styles/global.css` — global design tokens and responsive styles; component behavior remains lightweight.
- `public/` — local abstract SVGs, favicon, manifest, robots, and a 1200×630 social card.

## Setup

```sh
npm install
npm run dev
npm run check
npm run build
npm run audit:links
```

Copy `.env.example` to `.env` only if connecting a privacy-respecting form endpoint. With no endpoint, the contact form clearly enters demo mode and directs visitors to email. The honeypot field provides basic spam deterrence; production protection should also be configured at the chosen service.

Analytics uses a local event abstraction (`window.portfolioAnalytics.track`) and emits `portfolio:analytics` browser events. No external analytics service, cookies, or tracking requests are enabled.

## Pre-launch configuration

Replace `https://example.com` in `astro.config.mjs` and `public/robots.txt` with the final domain. Add only confirmed social URLs and approved assets. A PDF resume download is deliberately disabled until a verified CV file is supplied.

See `CONTENT_GUIDE.md` for claim, asset, and confidentiality validation rules.
