# Farih Muwaffaq portfolio

Static Astro + TypeScript portfolio for a Jakarta-based Data Analyst. Production: https://farih-portfolio.vercel.app. Source: https://github.com/farihmuwaffaq/farih-portfolio.

`PRD_Portfolio_Farih_Muwaffaq_EN.md` preserves the original product brief and includes a dated implementation addendum. Current implementation contracts live in `PRODUCT.md` and `DESIGN.md`; claim and confidentiality rules live in `CONTENT_GUIDE.md`.

## Architecture

- `src/content/work/` - nine validated Markdown case studies spanning professional experience, technical assessments, project-based work, and sample/training data.
- `src/content.config.ts` - collection schema, evidence provenance, and structured related assets.
- `src/layouts/` - global SEO shell, SQL query interface, generated case-study layout, and evidence presentation variants.
- `src/components/` - reusable project grids, evidence surfaces, icons, accessible lightbox, and lazy-loaded approved deck preview.
- `src/pages/` - Home, Work, nine generated Work Detail routes, About, Resume, Contact, and 404; 15 static pages total.
- `src/styles/global.css` - design tokens, component styling, and content-specific responsive behavior.
- `public/js/animations.js` - identity intro, navigation, SQL transition and console, reveal, lightbox, filter, and interaction behavior.
- `public/images/` - approved portrait, project evidence, interface studies, and generated visual assets.
- `public/Farih-Muwaffaq-Resume.pdf` - verified downloadable resume.

## Current product surface

- 15 generated pages: five primary routes, nine case-study detail pages, and a custom 404 page.
- Nine validated case studies across professional experience, project-based internships, and technical assessments.
- Four selected credentials served as local PDF evidence from the About page.
- Session-scoped identity intro with explicit entry and a no-script bypass.
- Homepage operating-layer boot sequence and operating-model toolchain interaction.
- Route-aware SQL transition for eligible internal links: `950 ms` desktop and `700 ms` mobile.
- Optional `SQL_` query console with bounded commands, build-time case-study search, session-scoped five-query history, and `EXPLAIN <project>` analytical summaries; `/` opens it outside editable controls.
- Every case study exposes a governed evidence status, assumptions/constraints, and decision log; domain-heavy studies add a compact metric dictionary.
- Work filters, image lightbox, contact route with direct-email fallback, downloadable resume, sitemap, manifest, robots directives, and lightweight analytics hooks.

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

Run the full source-contract gate after changes to shared layouts, interactions, content counts, or responsive behavior:

```sh
npm run test:identity-intro
npm run test:hero-boot
npm run test:operating-toolchain
npm run test:selected-credentials
npm run test:v1-launch
npm run test:query-interface
npm run test:analyst-credibility
npm run test:deck-library
npm run check
npm run build
npm run audit:links
```

## Runtime behavior

- Static output deploys to Vercel with sitemap and canonical metadata.
- Mobile navigation is an independent fixed viewport layer, outside the floating navbar containing block.
- Project filtering, lightbox behavior, motion, and navigation use lightweight client JavaScript.
- Internal navigation uses a route-aware SQL query exit transition; native external, download, modified-click, same-page hash, and reduced-motion behavior remains untouched.
- The optional `SQL_` console indexes validated case-study content at build time and exposes bounded commands without a backend or free-form SQL execution.
- The Maleo case study includes eight approved representative Google Slides from 30+ client-facing decks and reports. One native dialog keeps the iframe inert until click and preserves direct-link fallbacks.
- Query console commands include `help`, `work`, `projects`, `experience`, `skills`, `about`, `resume`, `contact`, `email`, and `linkedin`; unmatched text searches project title, slug, summary, and categories.
- Analytics hooks cover contact actions, project navigation, filters, evidence views, query transition starts, console opens, console submits, and console result clicks. They safely no-op when no analytics provider is configured.
- Analytics uses `window.portfolioAnalytics.track` and emits local `portfolio:analytics` events. GA4 loads only when `PUBLIC_GA_MEASUREMENT_ID` is configured; without it, no external analytics request is made.
- Contact uses direct email and LinkedIn; no form endpoint is configured.

## External configuration

- Canonical Vercel production URL, LinkedIn, GitHub, portrait, resume, and approved evidence assets are configured.
- Custom domain remains optional. To enable GA4, set `PUBLIC_GA_MEASUREMENT_ID` (for example, `G-XXXXXXXXXX`) in the deployment environment. A contact form would require a separate explicit product and implementation decision.
- Never publish raw source assets, operational data, customer/SKU/account identifiers, credentials, private URLs, or unsupported impact claims.

See `CONTENT_GUIDE.md` before changing project claims or evidence.
