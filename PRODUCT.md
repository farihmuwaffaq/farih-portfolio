# Farih Muwaffaq Portfolio

## Product definition

Personal static portfolio that persuades recruiters and hiring managers in data analytics to connect with Farih Muwaffaq. It presents six validated case studies while protecting confidential client information, commercial metrics, credentials, and operational data. The site demonstrates analytical competence, trustworthy craft, and professional credibility without revealing sensitive business artifacts.

## Positioning

Portfolio of a Jakarta-based data analyst building analytics systems, automated reporting, dashboards, and commercial insights across FMCG, healthcare, and marketing. The work is real, validated, and sanitized. No client secrets, no fabricated metrics, no speculative claims—only measurable value with disciplined boundaries.

## Operating context

- **Primary users:** Recruiters (tech/data), hiring managers, principal/staff data leads
- **Industries:** FMCG/consumer retail, health-tech/digital health, e-commerce/logistics, marketing analytics, financial services (sanitized outputs)
- **Devices:** Desktop, tablet, mobile; static hosting; no server-side dependencies for browsing
- **Data governance:** Never commit or publish PRDs, `.env`, secrets, credentials, raw data, internal docs, customer SKUs, account names, private URLs, or operational data. `.gitignore` enforces these boundaries.

## Goals and conversions (KPIs)

Primary CTA: send email through contact form or reach via LinkedIn/GitHub. Secondary CTAs: navigate to case studies for depth; download final CV PDF; explore capabilities overview.

- Click → Case Study: visitor moves to evidence pages
- Download Resume: visitor obtains verified PDF
- Contact Form Submit: request sent to provider endpoint
- Email Link Click: direct mailto action

## Evidence on hand

Six Astro Content Collection case studies (validated Markdown): Analytics and Reporting Automation, Health-Tech Data Infrastructure and Dashboards, Loan Default Prediction, and three additional aligned with PRD. Each includes Snapshot, situation/problem, responsibility, approach, solution, outcome, learnings, and related assets (sanitized).

**Evidence rules (from CONTENT_GUIDE.md):**
- `evidenceType` stays accurate: Professional Experience, Project-Based Internship, or Technical Assessment.
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

- Platform: Astro static site with TypeScript and Content Collections (Markdown case studies)
- Production domain: `https://farih-portfolio.vercel.app`
- Sitemap: `https://farih-portfolio.vercel.app/sitemap-index.xml`
- Robots.txt: configured for crawler access; no tracking cookies enabled
- Analytics: local event abstraction emitting `portfolio:analytics`; no external trackers required
- Quality gates: `npm run check`, `build`, `audit:links`, `npm audit` must pass before deploy

## Placeholder boundaries

- **Professional:** LinkedIn URL, GitHub URL, professional headshot
- **Asset:** PDF resume (verified), sanitized project visuals, social preview PNG (1200×630)
- **Configuration:** contact form endpoint, analytics provider if used, custom domain if adopted

## Next steps

After this product context is written, proceed to shape new surfaces or refine existing ones under the incumbent visual system, preserving identity outside scope. Redesign replaces old appearance but keeps product truth, content, function, native affordances, and constraints.
