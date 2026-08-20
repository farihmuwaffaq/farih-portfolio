import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const [schema, layout, base, css, js, files] = await Promise.all([
  readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/layouts/CaseStudyLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/animations.js', import.meta.url), 'utf8'),
  readdir(new URL('../src/content/work/', import.meta.url)),
]);

const workFiles = files.filter((file) => file.endsWith('.md'));
assert.equal(workFiles.length, 9, 'credibility contract expects nine case studies');

assert.match(schema, /evidenceStatus:\s*z\.enum/, 'schema must constrain evidence status vocabulary');
assert.match(schema, /evidenceNote:\s*z\.string/, 'schema must require evidence note');
assert.match(schema, /assumptionsConstraints:\s*z\.array/, 'schema must require assumptions and constraints');
assert.match(schema, /decisionLog:\s*z\.array/, 'schema must require decision log');
assert.match(schema, /dictionary:\s*z\.array[\s\S]*optional/, 'schema must support optional data dictionary');

for (const file of workFiles) {
  const source = await readFile(new URL(`../src/content/work/${file}`, import.meta.url), 'utf8');
  assert.match(source, /^evidenceStatus:/m, `${file} needs evidence status`);
  assert.match(source, /^evidenceNote:/m, `${file} needs evidence note`);
  assert.match(source, /^assumptionsConstraints:/m, `${file} needs assumptions and constraints`);
  assert.match(source, /^decisionLog:/m, `${file} needs decision log`);
}

assert.match(layout, /Evidence status/, 'case-study layout must render evidence status');
assert.match(layout, /Assumptions \/ constraints/, 'case-study layout must render assumptions and constraints');
assert.match(layout, /class="assumptions-title"[\s\S]*class="sr-only">Assumptions \/ constraints<[\s\S]*class="assumptions-title-lines" aria-hidden="true"><span>Assumptions<\/span><span>\/<\/span><span>constraints<\/span>/, 'assumptions heading must use intentional accessible line breaks');
assert.match(layout, /Decision log/, 'case-study layout must render decision log');
assert.match(layout, /Metric dictionary/, 'case-study layout must render optional metric dictionary');
assert.match(css, /\.evidence-status/, 'evidence status styling missing');
assert.match(css, /\.decision-log/, 'decision log styling missing');
assert.match(css, /\.assumptions-title\s*\{[^}]*font-size:\s*clamp\(2\.25rem,2\.8vw,3\.25rem\)/, 'assumptions heading needs panel-safe responsive type');
assert.match(css, /\.assumptions-title-lines span\s*\{[^}]*white-space:\s*nowrap/, 'assumptions heading lines must not split mid-word');
assert.match(css, /\.data-dictionary/, 'data dictionary styling missing');

assert.match(base, /summary: project\.data\.summary/, 'query index must expose project summary');
assert.match(base, /decisions: project\.data\.decisionLog/, 'query index must expose decision log');
assert.match(base, /constraints: project\.data\.assumptionsConstraints/, 'query index must expose constraints');
assert.match(base, /evidenceStatus: project\.data\.evidenceStatus/, 'query index must expose evidence status');
assert.match(js, /EXPLAIN\s+<project>/, 'console help must document EXPLAIN');
assert.match(js, /sessionStorage/, 'query history must stay session-scoped');
assert.match(js, /slice\(-5\)/, 'query history must be capped at five entries');
assert.match(js, /typeof item === 'string'/, 'stored query history must reject malformed entries');
assert.match(js, /QUERY HISTORY/, 'console must render query history');
assert.match(js, /matches\.length > 1[\s\S]*AMBIGUOUS PROJECT/, 'EXPLAIN must disambiguate partial matches');
assert.match(js, /PROBLEM[\s\S]*SYSTEM[\s\S]*DECISION USE[\s\S]*EVIDENCE/, 'EXPLAIN must return analyst-facing structure');
assert.match(js, /curiosity\s*=\s*TRUE/i, 'curiosity easter egg missing');
assert.match(js, /SELECT coffee FROM analyst/i, 'coffee easter egg missing');

console.log('Analyst credibility contract passed.');
