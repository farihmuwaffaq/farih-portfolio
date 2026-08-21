import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const [schema, content, component, projectCard, guide] = await Promise.all([
  readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/content/work/fmcg-operations-analytics.md', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/DeckLibrary.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/ProjectCard.astro', import.meta.url), 'utf8'),
  readFile(new URL('../CONTENT_GUIDE.md', import.meta.url), 'utf8'),
]);

const documentIds = [
  '1pUogV2v46tMrycUaua4lbImCLuL9y0o94ues7O55vTc',
  '1--cwAhJnk2I_I7irRB1fG6MlugfvjiJXOiQtC5sL_Kg',
  '1MVYs3DKAbQcEEGdJC1jtmOg0kUgJMG3OgiGVgwM3ygM',
  '15N3nac9ZiwHQJlLdguS4_oQR5ZW3v2z5cg0EgeW0_fY',
];
const thumbnails = [
  'wispish-social-activation-2024.webp',
  'wispish-sales-april-2024.webp',
  'indomaret-b2b-q1-2024.webp',
  'marketplace-users-2024.webp',
];

assert.match(schema, /images\\\/projects\\\/\[\\w-\]\+\\\/decks/, 'deck thumbnails must support project-specific directories');
assert.match(schema, /items:[\s\S]*\.min\(1\)\.max\(12\)/, 'deck libraries must support variable approved set sizes');
assert.match(schema, /cardEvidence/, 'deck libraries need configurable Work-card evidence');
assert.match(schema, /eyebrow/, 'deck-library presentation copy must be configurable');
assert.match(schema, /heading/, 'deck-library presentation copy must be configurable');
assert.match(schema, /dialogLabel/, 'deck dialog classification must be configurable');

for (const documentId of documentIds) assert.match(content, new RegExp(documentId), `missing approved document ${documentId}`);
for (const thumbnail of thumbnails) {
  assert.match(content, new RegExp(`/images/projects/fmcg-operations/decks/${thumbnail}`), `missing thumbnail metadata ${thumbnail}`);
  await access(new URL(`../public/images/projects/fmcg-operations/decks/${thumbnail}`, import.meta.url));
}

assert.equal((content.match(/thumbnailAlt:/g) || []).length, 4, 'all four thumbnails need alt text');
assert.match(content, /cardEvidence: 4 approved decision-deck previews/, 'Work card needs accurate Gajahpangan evidence');
assert.match(content, /dialogLabel: Approved internal work/, 'dialog must identify the approved internal boundary');
assert.match(content, /evidenceStatus: APPROVED INTERNAL WORK/, 'evidence status must reflect publication approval');
assert.match(content, /shown with permission/i, 'disclosure must state permission boundary');
assert.match(content, /original Gajahpangan Data team attribution/i, 'disclosure must preserve team attribution');
assert.match(content, /led[^\n]*analysis[^\n]*visualization[^\n]*recommendation[^\n]*deck production[^\n]*stakeholder presentation/i, 'responsibility must state end-to-end ownership');
assert.equal((content.match(/^  - /gm) || []).length >= 6, true, 'content must retain six contribution bullets');
assert.match(content, /production and profit bottlenecks/i, 'existing operational-scaling contribution must remain');
assert.match(content, /product, channel, and supply-chain analysis/i, 'existing product/channel contribution must remain');
assert.match(content, /decision-ready reporting/i, 'existing reporting contribution must remain');
assert.match(content, /social-media activation/i, 'activation-planning contribution must be added');
assert.match(content, /Shopee, Tokopedia, and TikTok Shop/i, 'marketplace contribution must be added');

assert.match(component, /library\.eyebrow/, 'deck section must render configurable eyebrow');
assert.match(component, /library\.heading/, 'deck section must render configurable heading');
assert.match(component, /library\.dialogLabel/, 'deck dialog must render configurable classification');
assert.match(projectCard, /d\.deckLibrary\.cardEvidence/, 'Work card must render configured evidence copy');
assert.match(guide, /four approved internal decision decks/i, 'publishing guide must document Gajahpangan boundary');

console.log('Gajahpangan deck contract passed.');
