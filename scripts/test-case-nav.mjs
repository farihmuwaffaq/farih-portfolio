import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [layout, css] = await Promise.all([
  readFile(new URL('../src/layouts/CaseStudyLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
]);

// ── Stream A: dedup + compact nav ──────────────────────────────
assert.match(layout, /excludeSequential|excludedSlugs|previousCase.*nextCase.*filter|\.filter\(entry=>!excluded/, 'Other evidence must exclude previous + next case slugs');
assert.match(layout, /relatedProjects[\s\S]*?\.slice\(0,\s*2\)/, 'Other evidence must cap at 2 recommendations');
assert.doesNotMatch(layout, /class="case-navigation-grid"[^>]*>[\s\S]*previous[\s\S]*next[\s\S]*<\/nav>/i, 'Previous/Next two-sided grid must be replaced with minimal nav');

// Compact nav: back to work + next case only
assert.match(layout, /Back to all work/i, 'Nav must offer a back-to-work anchor');
assert.match(layout, /Next case/i, 'Nav must offer next case only');
assert.match(css, /\.case-nav-compact/, 'CSS must define a compact case-nav style');
assert.match(css, /\.case-nav-compact[\s\S]*font-size/, 'Compact nav must have restrained typography');

// ── Stream B: code surface ─────────────────────────────────────
assert.match(css, /\.code-surface/, 'CSS must define a reusable code surface class');
assert.match(css, /\.code-surface[\s\S]*?background:\s*var\(--paper-deep\)/, 'Code surface must have a light elevated background');
assert.match(css, /\.code-surface-label/, 'Code surface must support a language label');
assert.match(css, /\.code-surface,\s*\.prose pre/, 'Prose pre blocks must share the code surface treatment');

console.log('Case nav + code surface contract passed.');
