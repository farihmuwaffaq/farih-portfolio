# Farih Muwaffaq Portfolio

## Product definition

Personal static portfolio that persuades recruiters and hiring managers in data analytics to connect with Farih Muwaffaq. It presents nine validated case studies with explicit evidence and provenance boundaries while protecting confidential client information, commercial metrics, credentials, and operational data. The site demonstrates analytical competence, trustworthy craft, and professional credibility without revealing sensitive business artifacts.

Current production surface contains 15 generated pages: five primary routes, nine case-study detail pages, and one custom 404 page. Supporting evidence includes four selected credential PDFs, a downloadable resume, and sanitized repository links where public artifacts are available.

## Positioning

Portfolio of a Jakarta-based data analyst building analytics systems, automated reporting, dashboards, and commercial insights across FMCG, healthcare, and marketing. The work is real, validated, and sanitized. No client secrets, no fabricated metrics, no speculative claims—only measurable value with disciplined boundaries.

## Operating context

- **Primary users:** Recruiters (tech/data), hiring managers, principal/staff data leads
- **Industries:** FMCG/consumer retail, health-tech/digital health, e-commerce/logistics, marketing analytics, financial services (sanitized outputs)
- **Devices:** Desktop, tablet, mobile; static hosting; no server-side dependencies for browsing
- **Data governance:** Never commit or publish PRDs, `.env`, secrets, credentials, raw data, internal docs, customer SKUs, account names, private URLs, or operational data. `.gitignore` enforces these boundaries.

## Goals and conversions (KPIs)

Primary CTA: send email directly or connect through LinkedIn/GitHub. Secondary CTAs: navigate to case studies for depth, download the verified CV PDF, and explore the capabilities overview. Production intentionally uses direct contact; adding a provider-backed form requires a separate product and implementation decision.

- Click → Case Study: visitor moves to evidence pages
- Download Resume: visitor obtains verified PDF
- Contact Form Submit: not part of current production behavior
- Email Link Click: direct mailto action
- Exploratory signals: SQL transition starts, query console opens, bounded command submissions, and result clicks

## Evidence on hand

Nine Astro Content Collection case studies (validated Markdown): Analytics and Reporting Automation, NEXUS BI Platform, Shopee Pricing Tracker, Health-Tech Data Infrastructure, Delivery Margin Analysis, FMCG Operations Analytics, Loan Default Model, Retail Sales Datamart, and Carbon Methodology Assessment. Each includes a snapshot, evidence classification, assumptions/constraints, decision log, situation/problem, responsibility, approach, solution, outcome, learnings, and sanitized related assets where approved. Domain-heavy studies may include a metric dictionary.

**Evidence rules (from CONTENT_GUIDE.md):**
- `evidenceType` stays accurate: Professional Experience, Project-Based Internship, or Technical Assessment. Sample/training-data context belongs in provenance copy rather than a new evidence-type label.
- Metrics only when definition, period, source, baseline, attribution, and public-use approval are known.
- Keep client/operating data, screenshots, queries, names, and credentials out unless sanitized and approved.
- `confidential: true` + specific `confidentialityNote` for restricted work.
- `relatedAssets` use `available: false` until a real local asset or confirmed public URL exists.
- Distinguish training/sample/assessment data from production deployments. Never present assessment or sample dashboards as deployed client work.
- Revalidate changing methodologies, regulations, and external facts before publication.

**Withheld claims:** SKINTIFIC operational metrics, Future Creative Network client names/timelines, Lifepack delivery-cost/aggregator-growth claims, FMCG profit/provision figures pending definitions/approval, undocumented Kimia Farma claim, Selasar Kampus incubation/traction/funding claims, Carbon simulation projections. Loan model's AUC 0.857 and KS 0.5675 are project-dataset results only.

## Product principles

1. **Analytical, not administrative:** Clean structure without admin-dashboard sterility.
2. **Trust through restraint:** No invented metrics; confidentiality is a feature, not an obstacle.
3. **Evidence over embellishment:** Every claim traceable to source; every boundary explicit.
4. **Accessibility as craft:** Keyboard navigation, focus management, lightbox a11y, readable contrast.
5. **Privacy by default:** No trackers unless user opts in; analytics abstraction stays local.
6. **Responsive without compromise:** Mobile, tablet, desktop all earn the same care.

## Brand and visual system (for DESIGN.md)

Tone: analytical, calm, modern, credible, editorial, spacious, professional. Avoid admin-dashboard look despite clean structure. Use teal/zinc/slate palette, white/gray background rhythm, restrained accent usage, ample whitespace, and typographic hierarchy that guides skimming. No saturated decorative patterns over content.

## Technical and operational truth

- Internal page navigation frames the portfolio as queryable evidence through a brief route-aware SQL transition. It replaces generic page transition motion rather than stacking another animation layer.
- Eligible internal links use a `950 ms` desktop or `700 ms` mobile sequence. Query text appears promptly, the result state receives a readable beat, then full-document Astro navigation proceeds.
- The optional `SQL_` query console supports bounded route and project discovery commands, local matching against the build-time case-study index, `EXPLAIN <project>` analytical summaries, and up to five tab-scoped history entries. It does not execute arbitrary SQL, call a search backend, or replace primary navigation.
- Query console results remain native links. External, download, modified-click, same-page hash, current-page, `mailto:`, and `tel:` behavior remains native; reduced-motion users bypass transition animation.
- `/` opens the console only outside editable controls and after the identity intro has cleared. Native dialog behavior provides focus containment, `Escape` close, backdrop close, and focus restoration.
- The first session visit presents an explicit identity-intro gate. It does not block no-script users and does not replay during the same tab session.
- The homepage operating layer uses a one-shot boot sequence to clarify analytical hierarchy; it never represents live production data.
- The About page exposes four selected credentials as approved local PDF evidence.

- Platform: Astro static site with TypeScript and Content Collections (Markdown case studies)
- Production domain: `https://farih-portfolio.vercel.app`
- Sitemap: `https://farih-portfolio.vercel.app/sitemap-index.xml`
- Robots.txt: configured for crawler access; no tracking cookies enabled
- Analytics: local event abstraction emitting `portfolio:analytics`; no external trackers required
- Quality gates: all six `test:*` source contracts, `npm run check`, `npm run build`, `npm run audit:links`, and `npm audit` must pass before deploy

## Configuration boundaries

- **Configured:** LinkedIn URL, GitHub URL, professional headshot, verified PDF resume, sanitized project visuals, and social preview.
- **Optional:** external analytics provider and custom domain. A contact form requires a new explicit decision.
- **Prohibited:** secrets, raw operational data, customer/SKU/account identifiers, private URLs, unsupported metrics, and unsanitized source materials.

## Next steps

Refine existing surfaces under `DESIGN.md`, preserving product truth, evidence provenance, native affordances, and confidentiality constraints. Validate responsive behavior in a real browser before deployment; source-level CSS assertions alone are insufficient for fixed overlays and visual hierarchy.
