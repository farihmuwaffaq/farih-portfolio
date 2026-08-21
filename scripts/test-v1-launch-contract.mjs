import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const [layout, base, card, lightbox, resumePage, contactPage, css, js] = await Promise.all([
  readFile(new URL('../src/layouts/CaseStudyLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/ProjectCard.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/Lightbox.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/resume.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/contact.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/animations.js', import.meta.url), 'utf8'),
]);

assert.match(layout, /caseOrder/, 'case studies need an explicit deterministic order');
assert.match(layout, /case-nav-compact|case-navigation/, 'case studies need previous and next navigation');
assert.match(layout, /data-case-progress/, 'case studies need a reading-progress hook');
assert.match(js, /--case-progress/, 'reading progress must update a CSS custom property');
assert.match(js, /\[50, 90\]/, 'reading progress must define midpoint and completion thresholds');
assert.match(js, /'case_study_' \+ threshold/, 'reading progress must emit final engagement event names');

assert.doesNotMatch(js, /--focus-x/, 'Commercial Health must not follow the pointer');
assert.doesNotMatch(css, /connector-flow[^}]*infinite/, 'Commercial Health must not run an infinite connector animation');

assert.match(base, /PUBLIC_GA_MEASUREMENT_ID/, 'GA4 must be configurable through a public environment variable');
assert.match(base, /googletagmanager\.com\/gtag\/js/, 'configured builds must load GA4');
assert.match(card, /data-event="project_card_click"/, 'project cards need final event taxonomy');
assert.match(layout, /data-event="related_work_click"/, 'related work links need final event taxonomy');
assert.match(lightbox, /evidence_open/, 'lightbox opens need evidence tracking');
assert.match(resumePage, /data-event="resume_download"/, 'resume download needs final event taxonomy');
assert.match(base, /href\$="Farih-Muwaffaq-Resume\.pdf"/, 'unlabeled resume links need delegated tracking');
assert.match(contactPage, /data-event="contact_cta_click"/, 'contact CTA needs final event taxonomy');
assert.match(contactPage, /data-event="email_click"/, 'email detail needs final event taxonomy');
assert.match(contactPage, /data-event="linkedin_click"/, 'LinkedIn detail needs final event taxonomy');
assert.doesNotMatch(contactPage, /data-event="contact_(email|linkedin|github)"/, 'legacy contact event names must be removed');

assert.match(layout, /image={`\/social\/cases\/\$\{d\.slug\}\.png`}/, 'case studies need crawler-compatible slug-specific social images');
for (const slug of ['analytics-automation', 'nexus-bi-platform', 'loan-default-model', 'lifepack-delivery-margin-analysis', 'healthtech-data-infrastructure', 'fmcg-operations-analytics', 'carbon-methodology-assessment', 'retail-sales-datamart', 'shopee-pricing-tracker']) {
  await access(new URL(`../public/social/cases/${slug}.png`, import.meta.url));
}

console.log('V1 launch contract passed.');
