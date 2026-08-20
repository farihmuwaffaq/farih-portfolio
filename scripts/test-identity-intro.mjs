import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [layout, css, js] = await Promise.all([
  readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/animations.js', import.meta.url), 'utf8'),
]);

assert.match(layout, /sessionStorage\.getItem\('fm-intro-seen'\)/, 'head gate must check session before first paint');
assert.match(layout, /class="identity-intro"/, 'global layout needs identity intro');
assert.match(layout, /data-intro-skip/, 'intro needs a skip control');
assert.match(layout, /<noscript>[\s\S]*identity-intro/, 'no-JS must hide overlay');

assert.match(css, /\.identity-intro\s*\{[^}]*display:\s*none/, 'overlay must be hidden by default');
assert.match(css, /\.intro-pending \.identity-intro/, 'session gate must activate overlay');
assert.match(css, /\.identity-intro\.is-leaving/, 'intro needs a vertical exit state');
assert.match(css, /@media \(max-width:\s*600px\)[\s\S]*identity-intro/, 'mobile needs shorter choreography');

assert.match(js, /sessionStorage\.setItem\('fm-intro-seen',\s*'true'\)/, 'controller must persist session state');
assert.match(js, /intro:complete/, 'intro must signal hero handoff');
assert.match(js, /data-intro-skip/, 'controller must handle Skip');
assert.match(js, /querySelector\('#main'\)\?\.focus/, 'focus must move into revealed page');
assert.match(js, /systemBoot[\s\S]*intro:complete/, 'hero boot must wait for intro completion');

console.log('Identity intro contract passed.');
