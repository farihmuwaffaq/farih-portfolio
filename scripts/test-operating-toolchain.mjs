import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [page, css] = await Promise.all([
  readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
]);

assert.match(page, /const capabilities = \[/, 'operating stages need structured capability data');
assert.equal((page.match(/tools:/g) || []).length, 4, 'each operating stage needs tool context');
assert.match(page, /class="capability-tools"/, 'operating cards need semantic tool lists');
assert.match(page, /aria-label={`Tools used for \$\{stage\}`}/, 'tool lists need stage context');
assert.doesNotMatch(page, /tool-marquee|tool-carousel/, 'tools must not become a generic marquee');

const expected = ['SQL', 'BigQuery', 'PostgreSQL', 'Apps Script', 'REST APIs', 'Git', 'Python', 'Pandas', 'Excel', 'Power BI', 'Tableau', 'Looker Studio'];
expected.forEach((tool) => assert.match(page, new RegExp(`['"]${tool.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`), `${tool} needs operating-stage placement`));

assert.match(css, /\.capability-tools/, 'toolchain needs visual treatment');
assert.match(css, /\.capability-step\.is-active[\s\S]*\.capability-tools li/, 'tools need progress-driven reveal');
assert.match(css, /prefers-reduced-motion:[\s\S]*\.capability-tools li/, 'reduced motion needs static tool state');

console.log('Operating toolchain contract passed.');
