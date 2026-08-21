import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [page, css, js] = await Promise.all([
  readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/animations.js', import.meta.url), 'utf8'),
]);

assert.match(page, /data-system-boot/, 'hero card needs boot-sequence hook');
assert.equal((page.match(/data-count-to=/g) || []).length, 3, 'three hero metrics need count-up metadata');
assert.match(page, /data-count-suffix="%"/, 'impact metric needs percent formatting');
assert.match(page, /data-count-suffix="\+"/, 'touchpoint metric needs plus formatting');
assert.match(page, /data-count-pad="2"/, 'project metric needs zero padding');
assert.match(page, /Case studies documented across/, 'first metric must reference case studies and domains');
assert.match(page, /Brand &amp; org touchpoints across/, 'second metric must reference touchpoints and organizations');
assert.match(page, /Production capacity growth supported/, 'third metric must reference impact');
assert.match(page, /Portfolio span/, 'cockpit footer must show portfolio span');
assert.match(page, /2024 - present/, 'cockpit footer must show timeline');

assert.match(css, /\.system-boot\.is-booted[\s\S]*\.signal-path/, 'CSS needs booted chart state');
assert.match(css, /stroke-dashoffset/, 'chart needs path drawing');
assert.match(css, /signal-pulse/, 'chart needs post-boot pulse animation');
assert.match(css, /\.system-boot\.is-booted \.signal-path[\s\S]*animation:\s*signal-pulse/, 'pulse must trigger after boot');
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/, 'reduced-motion final state required');

assert.match(js, /\[data-system-boot\]/, 'JS needs boot target');
assert.match(js, /bootObserver\.unobserve/, 'boot sequence must run once');
assert.match(js, /requestAnimationFrame/, 'metric count-up should use animation frames');
assert.match(js, /data-count-to/, 'JS needs metric metadata');
assert.match(js, /bootMetrics\.forEach/, 'JS must iterate metrics from DOM');
assert.match(js, /if \(!reduced && 'IntersectionObserver' in window\)/, 'motion and observer support must gate boot initialization');

console.log('Hero system boot contract passed.');
