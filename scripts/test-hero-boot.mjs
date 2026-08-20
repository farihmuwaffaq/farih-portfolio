import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [page, css, js] = await Promise.all([
  readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/animations.js', import.meta.url), 'utf8'),
]);

assert.match(page, /data-system-boot/, 'hero card needs boot-sequence hook');
assert.equal((page.match(/data-count-to=/g) || []).length, 3, 'three hero metrics need count-up metadata');
assert.match(page, /data-count-suffix="%"/, 'growth metric needs percent formatting');
assert.match(page, /data-count-suffix="\+"/, 'pipeline metric needs plus formatting');
assert.match(page, /data-count-pad="2"/, 'decision metric needs zero padding');

assert.match(css, /\.system-boot\.is-booted[\s\S]*\.signal-path/, 'CSS needs booted chart state');
assert.match(css, /stroke-dashoffset/, 'chart needs path drawing');
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/, 'reduced-motion final state required');

assert.match(js, /\[data-system-boot\]/, 'JS needs boot target');
assert.match(js, /bootObserver\.unobserve/, 'boot sequence must run once');
assert.match(js, /requestAnimationFrame/, 'metric count-up should use animation frames');
assert.match(js, /data-count-to/, 'JS needs metric metadata');
assert.match(js, /if \(!reduced && 'IntersectionObserver' in window\)/, 'motion and observer support must gate boot initialization');

console.log('Hero system boot contract passed.');
