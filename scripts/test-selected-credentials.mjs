import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const [data, about, resume, home, css] = await Promise.all([
  readFile(new URL('../src/data/credentials.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/about.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/resume.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
]);

assert.equal((data.match(/href:/g) || []).length, 4, 'exactly four credentials should be featured');
for (const title of ['Big Data Analytics', 'Data Scientist', 'Data Analyst', 'Microsoft Power BI Desktop for Business Intelligence']) {
  assert.match(data, new RegExp(title), `${title} needs curated credential data`);
}
for (const file of ['kimia-farma-big-data-analytics.pdf', 'idx-data-scientist.pdf', 'myskill-data-analyst.pdf', 'power-bi-business-intelligence.pdf']) {
  assert.match(data, new RegExp(`/credentials/${file}`), `${file} needs a public link`);
  await access(new URL(`../public/credentials/${file}`, import.meta.url));
}

assert.match(about, /Selected credentials/, 'About needs selected credentials section');
assert.match(about, /credential-grid/, 'About needs visual credential cards');
assert.match(resume, /Certifications &amp; Professional Training/, 'Resume needs accurate credential heading');
assert.match(resume, /credential-list/, 'Resume needs compact credential list');
assert.match(about + resume, /target="_blank" rel="noopener noreferrer"/, 'credential links must open safely');
assert.doesNotMatch(home, /Selected credentials|credential-grid|credential-list/, 'homepage must keep work above credentials');
assert.doesNotMatch(data, /Excel|WebHozz|Python Programming/, 'additional training must stay out of featured credentials');
assert.match(css, /\.credential-grid/, 'credential cards need visual treatment');
assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.credential-grid/, 'credential cards need mobile treatment');

console.log('Selected credentials contract passed.');
