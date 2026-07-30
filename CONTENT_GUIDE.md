# Content validation and publishing guide

The six case studies are Astro Content Collection entries in `src/content/work`. Their frontmatter is validated by `src/content.config.ts`.

## Before publishing a change

1. Keep `evidenceType` accurate: Professional Experience, Project-Based Internship, or Technical Assessment.
2. Add a metric only when its definition, period, source, baseline, attribution, and public-use approval are known.
3. Keep client/operating data, screenshots, queries, names, and credentials out of the repository unless sanitized and approved.
4. Set `confidential: true` and write a specific `confidentialityNote` for restricted work.
5. For `relatedAssets`, use `available: false` without an `href` until a real local asset or confirmed public URL exists. Never use `#` or invented links.
6. Mark sample/training data explicitly. Distinguish assessments and internships from production deployments.
7. Revalidate changing methodologies, regulations, and external facts before publication.
8. Run `npm run check` and `npm run build`.

## Known claims intentionally withheld

- SKINTIFIC operational metrics and visuals.
- Future Creative Network client names, visuals, and exact time saved.
- Lifepack delivery-cost and aggregator-growth claims.
- FMCG production and profit figures until definitions and approval are confirmed.
- The undocumented Kimia Farma 20% efficiency claim.
- Selasar Kampus incubation, traction, milestone, and funding claims pending evidence.
- Carbon simulation figures as real forecasts or outcomes.

The loan model's AUC 0.857 and KS 0.5675 are presented only as project-dataset results and not as production performance.
