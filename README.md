# Farih Muwaffaq portfolio

Static Astro + TypeScript portfolio for a Jakarta-based Data Analyst. Production: https://farih-portfolio.vercel.app.

`PRD_Portfolio_Farih_Muwaffaq_EN.md` preserves the original product brief and includes a dated implementation addendum. Current implementation contracts live in `PRODUCT.md` and `DESIGN.md`; claim and confidentiality rules live in `CONTENT_GUIDE.md`.

## Architecture

- `src/content/work/` - nine validated Markdown case studies spanning professional experience, technical assessments, project-based work, and sample/training data.
- `src/content.config.ts` - collection schema, evidence provenance, and structured related assets.
- `src/layouts/` - global SEO shell, generated case-study layout, and evidence presentation variants.
- `src/components/` - reusable project grids, evidence surfaces, icons, and accessible lightbox.
- `src/pages/` - Home, Work, nine generated Work Detail routes, About, Resume, Contact, and 404; 15 static pages total.
- `src/styles/global.css` - design tokens, component styling, and content-specific responsive behavior.
- `public/js/animations.js` - progressive navigation, reveal, lightbox, filter, and interaction behavior.
- `public/images/` - approved portrait, project evidence, interface studies, and generated visual assets.
- `public/Farih-Muwaffaq-Resume.pdf` - verified downloadable resume.

## Commands

```sh
npm install
npm run dev
npm run check
npm run build
npm run audit:links
npm run preview
```

Run `npm run check`, `npm run build`, and `npm run audit:links` before completion. Browser-test navigation and responsive changes at approximately 390px, 768px, and 1440px.

## Runtime behavior

- Static output deploys to Vercel with sitemap and canonical metadata.
- Mobile navigation is an independent fixed viewport layer, outside the floating navbar containing block.
- Project filtering, lightbox behavior, motion, and navigation use lightweight client JavaScript.
- Internal navigation uses a route-aware SQL query exit transition; native external, download, modified-click, same-page hash, and reduced-motion behavior remains untouched.
- The optional `SQL_` console indexes validated case-study content at build time and exposes bounded commands without a backend or free-form SQL execution.
- Analytics uses `window.portfolioAnalytics.track` and emits local `portfolio:analytics` events. GA4 loads only when `PUBLIC_GA_MEASUREMENT_ID` is configured; without it, no external analytics request is made.
- Contact uses direct email and LinkedIn; no form endpoint is configured.

## External configuration

- Canonical Vercel production URL, LinkedIn, GitHub, portrait, resume, and approved evidence assets are configured.
- Custom domain remains optional. To enable GA4, set `PUBLIC_GA_MEASUREMENT_ID` (for example, `G-XXXXXXXXXX`) in the deployment environment. A contact form would require a separate explicit product and implementation decision.
- Never publish raw source assets, operational data, customer/SKU/account identifiers, credentials, private URLs, or unsupported impact claims.

See `CONTENT_GUIDE.md` before changing project claims or evidence.
