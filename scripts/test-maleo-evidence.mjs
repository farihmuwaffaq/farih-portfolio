import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [schema, content, layout, reports, dashboards, css, guide] = await Promise.all([
  readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/content/work/analytics-automation.md', import.meta.url), 'utf8'),
  readFile(new URL('../src/layouts/CaseStudyLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/ReportEvidence.astro', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../src/components/DashboardEvidence.astro', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../CONTENT_GUIDE.md', import.meta.url), 'utf8'),
]);

assert.match(schema, /reportEvidence:/, 'schema must support selected report evidence');
assert.match(schema, /dashboardEvidence:/, 'schema must support campaign dashboard evidence');
assert.match(content, /cardEvidence: 30\+ reports · 3 brand deep dives · 3 campaign dashboards/, 'work card must preserve the 30+ umbrella total');
assert.equal((content.match(/^    - brand:/gm) ?? []).length, 3, 'must publish exactly three report records');
assert.equal((content.match(/^    - campaign:/gm) ?? []).length, 3, 'must publish exactly three dashboard records');
assert.equal((content.match(/documentId:/g) ?? []).length, 8, 'must preserve eight additional approved previews');
assert.match(content, /These examples represent only part of the broader portfolio handled during the engagement/, 'overview must state the evidence is representative');

for (const expected of [
  /brand: CONCERTO[\s\S]*period: February–October 2025/,
  /brand: BlueBand Professional[\s\S]*period: January–September 2025/,
  /brand: SilverQueen[\s\S]*period: January–October 2025/,
]) assert.match(content, expected, 'all three report periods must be explicit and accurate');

for (const expected of [
  /campaign: Festive Ramadan 2026[\s\S]*brand: BlueBand/,
  /campaign: Festive Ramadan 2026[\s\S]*brand: BlueBand Professional/,
  /campaign: Lovefest 2026[\s\S]*brand: SilverQueen/,
]) assert.match(content, expected, 'all three campaign dashboards must be represented');

assert.match(content, /9\.16M[\s\S]*273% of engagement KPI/, 'CONCERTO KPI evidence missing');
assert.match(content, /9,611[\s\S]*Instagram engagements/, 'BlueBand Professional report evidence missing');
assert.match(content, /26\.1M[\s\S]*campaign reach/, 'SilverQueen report evidence missing');
assert.match(content, /44\.5M[\s\S]*TikTok impressions/, 'BlueBand dashboard evidence missing');
assert.match(content, /88,446[\s\S]*Instagram impressions/, 'BlueBand Professional dashboard evidence missing');
assert.match(content, /76\.5%[\s\S]*TikTok impression contribution/, 'SilverQueen dashboard evidence missing');
assert.match(content, /context: "actual versus 409,568 KPI"/, 'dashboard KPI context must preserve thousands separators');
assert.match(content, /context: "net growth of 8,692 during the comparison period"/, 'report growth context must preserve thousands separators');

assert.doesNotMatch(content, /150\.17%|95\.73%|9,724\.3%/, 'known inconsistent dashboard percentages must stay excluded');
assert.doesNotMatch(content, /^\s+image(?:Alt|Width|Height)?:/gm, 'dashboard evidence must not depend on screenshot fields');
assert.doesNotMatch(content, /I (?:increased|generated|drove)\b/i, 'brand performance must not be presented as sole analyst causation');
assert.match(content, /Performance figures are brand- or campaign-level outcomes observed during the engagement/, 'team-level attribution boundary missing');

assert.match(layout, /<ReportEvidence/, 'case-study layout must render report evidence');
assert.match(layout, /<DashboardEvidence/, 'case-study layout must render dashboard evidence');
assert.ok(layout.indexOf('<ReportEvidence') < layout.indexOf('<DashboardEvidence'), 'report deep dives must precede campaign dashboards');
assert.ok(layout.indexOf('<DashboardEvidence') < layout.indexOf('<DeckLibrary'), 'campaign dashboards must precede additional previews');
assert.match(reports, /report-evidence-grid/, 'report evidence component missing');
assert.match(dashboards, /dashboard-evidence-grid/, 'dashboard evidence component missing');
assert.doesNotMatch(dashboards, /<img|<figure|Open sanitized crop/, 'dashboard evidence must render as text-only cards');
assert.match(css, /\.report-evidence-grid/, 'report evidence styles missing');
assert.match(css, /\.dashboard-evidence-grid/, 'dashboard evidence styles missing');
assert.match(guide, /three selected 2025 brand reports/i, 'publishing guide must document report boundary');
assert.match(guide, /three 2026 campaign-monitoring dashboards/i, 'publishing guide must document dashboard boundary');

console.log('Maleo evidence contract passed.');
