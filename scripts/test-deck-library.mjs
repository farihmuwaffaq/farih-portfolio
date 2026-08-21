import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [schema, content, component, projectCard, workPage, layout, css, guide] = await Promise.all([
  readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/content/work/analytics-automation.md', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/DeckLibrary.astro', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../src/components/ProjectCard.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/work/index.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/layouts/CaseStudyLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../CONTENT_GUIDE.md', import.meta.url), 'utf8'),
]);

assert.match(schema, /deckLibrary:\s*z\.object/, 'schema must support an optional deck library');
assert.match(schema, /documentId:\s*z\.string/, 'deck records must validate Google document IDs');
assert.match(schema, /thumbnail:\s*z\.string/, 'deck records must require a local thumbnail');
assert.match(schema, /thumbnailAlt:\s*z\.string/, 'deck thumbnails must have descriptive alternative text');
assert.match(schema, /hrefDocumentId !== deck\.documentId/, 'deck href must resolve to its declared document ID');
assert.match(schema, /\.min\(1\)\.max\(12\)/, 'schema must support bounded approved deck libraries');
assert.match(content, /totalProduced:\s*["']30\+["']/, 'Maleo case study must state 30+ decks and reports');
assert.match(content, /ownership:\s*Lead Analytics Author/, 'deck ownership must be explicit');
assert.equal((content.match(/documentId:/g) || []).length, 8, 'Maleo library must list eight representative decks');
assert.equal((content.match(/docs\.google\.com\/presentation\/d\//g) || []).length, 8, 'every deck needs validated private Google Slides source metadata');
assert.equal((content.match(/thumbnail: \/images\/projects\/maleo\/decks\//g) || []).length, 8, 'every deck needs a local first-slide thumbnail');
assert.equal((content.match(/thumbnailAlt:/g) || []).length, 8, 'every deck thumbnail needs alt text');

assert.match(layout, /<DeckLibrary[^>]*library=\{d\.deckLibrary\}/, 'case-study layout must render configured deck libraries');
assert.match(component, /<dialog[^>]*data-deck-dialog/, 'deck preview must use a native dialog');
assert.match(component, /data-deck-frame/, 'deck dialog must expose one reusable iframe');
assert.doesNotMatch(component, /<iframe[^>]+src=/, 'iframe must remain inert before user interaction');
assert.equal((component.match(/<img/g) || []).length, 1, 'deck cards must render one mapped local thumbnail image');
assert.match(component, /src=\{deck\.thumbnail\}/, 'deck card image must use local content metadata');
assert.match(component, /class="deck-card-trigger"[^>]*data-deck-open/, 'whole deck card must expose a full-card preview button');
assert.match(css, /\.deck-card-trigger\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0/, 'preview button must cover the whole deck card');
assert.match(component, /\/preview/, 'preview URL must use Google Slides preview mode');
assert.match(component, /frame\.replaceWith\(cleanFrame\)/, 'closing preview must replace and unload the Google iframe');
assert.match(component, /cloneNode\(false\)[\s\S]*cleanFrame\.removeAttribute\('src'\)[\s\S]*frame\.replaceWith/, 'replacement iframe must discard the loaded Google URL');
assert.match(component, /activePreviewUrl[\s\S]*dialog\?\.open[\s\S]*boundFrame\.src !== activePreviewUrl/, 'iframe load handling must ignore stale requests');
assert.match(component, /const boundFrame = frame[\s\S]*event\.currentTarget !== boundFrame[\s\S]*boundFrame !== frame/, 'iframe load listener must remain bound to the active node');
assert.match(component, /referrerpolicy="no-referrer"/, 'Google previews must not receive the portfolio URL');
assert.match(component, /dialog\?\.addEventListener\('close'[\s\S]*trigger\?\.focus\(\)/, 'dialog must restore focus and clean up on close');
assert.match(component, /event\.target === dialog/, 'backdrop click must close preview');
assert.match(component, /deck_preview_open/, 'preview opens must be tracked');
assert.match(component, /deck_preview_error/, 'preview failures must be tracked');
assert.doesNotMatch(component, /Open in Google Slides/, 'deck UI must remain preview-only');
assert.doesNotMatch(component, /<a[^>]*docs\.google\.com/, 'deck UI must expose no direct Google links');
assert.doesNotMatch(component, /deck_external_open|data-deck-external/, 'deck UI must not retain external-link behavior');
assert.doesNotMatch(component, /open (the deck )?directly/i, 'preview errors must not promise a removed direct-link fallback');
assert.match(projectCard, /d\.deckLibrary\s*\?/, 'project cards must expose deck-library proof when available');
assert.match(projectCard, /approved previews/, 'Maleo project proof must advertise approved previews');
assert.doesNotMatch(workPage, /deckLibrary|Google Slides|deck preview/i, 'Dashboard Lab must not duplicate approved client decks');
assert.match(css, /\.deck-library-grid/, 'deck library needs responsive grid styling');
assert.match(css, /\.deck-preview-frame/, 'deck preview needs bounded responsive styling');
assert.match(css, /94vh - 10rem/, 'desktop preview width must account for viewport height');
assert.match(guide, /eight approved Google Slides/i, 'publishing guide must document approved public deck boundary');

console.log('Deck library contract passed.');
