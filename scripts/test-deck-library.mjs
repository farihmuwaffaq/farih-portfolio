import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [schema, content, component, layout, css, guide] = await Promise.all([
  readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/content/work/analytics-automation.md', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/DeckLibrary.astro', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../src/layouts/CaseStudyLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../CONTENT_GUIDE.md', import.meta.url), 'utf8'),
]);

assert.match(schema, /deckLibrary:\s*z\.object/, 'schema must support an optional deck library');
assert.match(schema, /documentId:\s*z\.string/, 'deck records must validate Google document IDs');
assert.match(schema, /hrefDocumentId !== deck\.documentId/, 'deck href must resolve to its declared document ID');
assert.match(schema, /\.length\(8\)/, 'representative library must contain eight approved decks');
assert.match(content, /totalProduced:\s*["']30\+["']/, 'Maleo case study must state 30+ decks and reports');
assert.match(content, /ownership:\s*Lead Analytics Author/, 'deck ownership must be explicit');
assert.equal((content.match(/documentId:/g) || []).length, 8, 'Maleo library must list eight representative decks');
assert.equal((content.match(/docs\.google\.com\/presentation\/d\//g) || []).length, 8, 'every deck needs a direct Google Slides fallback');

assert.match(layout, /<DeckLibrary[^>]*library=\{d\.deckLibrary\}/, 'case-study layout must render configured deck libraries');
assert.match(component, /<dialog[^>]*data-deck-dialog/, 'deck preview must use a native dialog');
assert.match(component, /data-deck-frame/, 'deck dialog must expose one reusable iframe');
assert.doesNotMatch(component, /<iframe[^>]+src=/, 'iframe must remain inert before user interaction');
assert.match(component, /\/preview/, 'preview URL must use Google Slides preview mode');
assert.match(component, /frame\.replaceWith\(cleanFrame\)/, 'closing preview must replace and unload the Google iframe');
assert.match(component, /activePreviewUrl[\s\S]*dialog\?\.open[\s\S]*boundFrame\.src !== activePreviewUrl/, 'iframe load handling must ignore stale requests');
assert.match(component, /const boundFrame = frame[\s\S]*event\.currentTarget !== boundFrame[\s\S]*boundFrame !== frame/, 'iframe load listener must remain bound to the active node');
assert.match(component, /referrerpolicy="no-referrer"/, 'Google previews must not receive the portfolio URL');
assert.match(component, /dialog\?\.addEventListener\('close'[\s\S]*trigger\?\.focus\(\)/, 'dialog must restore focus and clean up on close');
assert.match(component, /event\.target === dialog/, 'backdrop click must close preview');
assert.match(component, /deck_preview_open/, 'preview opens must be tracked');
assert.match(component, /deck_preview_error/, 'preview failures must be tracked');
assert.match(component, /rel="noopener noreferrer"/, 'direct deck links must isolate external tabs');
assert.match(css, /\.deck-library-grid/, 'deck library needs responsive grid styling');
assert.match(css, /\.deck-preview-frame/, 'deck preview needs bounded responsive styling');
assert.match(css, /94vh - 10rem/, 'desktop preview width must account for viewport height');
assert.match(guide, /eight approved Google Slides/i, 'publishing guide must document approved public deck boundary');

console.log('Deck library contract passed.');
