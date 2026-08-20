import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [base, css, js] = await Promise.all([
  readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/animations.js', import.meta.url), 'utf8'),
]);

assert.match(base, /data-query-transition/, 'shared layout needs query transition overlay');
assert.match(base, /data-query-console/, 'shared layout needs query console dialog');
assert.equal((base.match(/data-query-console-open/g) || []).length, 2, 'desktop and mobile need console triggers');
assert.match(base, /queryProjectIndex/, 'console needs a static project index');
assert.match(base, /replace\(\/<\/g/, 'project index JSON must be safe inside a script element');

assert.match(js, /getRouteQuery/, 'transition needs route-aware query mapping');
assert.match(js, /SELECT \* FROM portfolio LIMIT 1;/, 'home query missing');
assert.match(js, /SELECT \* FROM work WHERE evidence = TRUE;/, 'work query missing');
assert.match(js, /FROM case_studies/, 'case-study query missing');
assert.match(js, /event\.metaKey \|\| event\.ctrlKey \|\| event\.shiftKey \|\| event\.altKey/, 'modified clicks must remain native');
assert.match(js, /anchor\.hasAttribute\('download'\)/, 'downloads must bypass transition');
assert.match(js, /url\.origin !== window\.location\.origin/, 'external URLs must bypass transition');
assert.match(js, /url\.hash && url\.pathname === window\.location\.pathname/, 'same-page hashes must bypass transition');
assert.match(js, /queryRunning \|\| reduced/, 'reduced motion must bypass transition');
assert.match(js, /contenteditable|INPUT|TEXTAREA|SELECT/, 'slash shortcut must ignore editable controls');
assert.match(js, /classList\.contains\('intro-pending'\)/, 'slash shortcut must inspect current intro state');
assert.match(js, /addEventListener\('cancel'/, 'Escape must close console through focus-restoring path');
assert.match(js, /mobile-query-trigger.*nav-toggle/, 'mobile close must restore focus outside the hidden menu');
assert.match(js, /consoleResults\.addEventListener\('click'.*queryConsole\.close\(\)/, 'result click must close the top-layer dialog before transition');
assert.match(js, /query_transition_start/, 'transition analytics missing');
assert.match(js, /query_console_open/, 'console-open analytics missing');
assert.match(js, /query_console_submit/, 'console-submit analytics missing');
assert.match(js, /query_console_result_click/, 'console-result analytics missing');
assert.match(js, /revealDelay = mobile \? 100 : 120/, 'query should appear promptly on both breakpoints');
assert.match(js, /resultDelay = mobile \? 400 : 560/, 'query result needs a readable execution beat');
assert.match(js, /navigateDelay = mobile \? 700 : 950/, 'transition needs enough total reading time');

assert.match(css, /\.query-transition/, 'transition styles missing');
assert.match(css, /\.query-console/, 'console styles missing');
assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.query-transition/, 'mobile transition treatment missing');
assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.query-transition/, 'reduced-motion transition treatment missing');

console.log('Query interface contract passed.');
