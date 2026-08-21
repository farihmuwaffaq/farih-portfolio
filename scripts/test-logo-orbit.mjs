import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const [home, about, css, resume, professionalAssets, educationAssets] = await Promise.all([
  readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/about.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/resume.astro', import.meta.url), 'utf8'),
  readdir(new URL('../public/images/logos/professional/', import.meta.url)).catch(() => []),
  readdir(new URL('../public/images/logos/education/', import.meta.url)).catch(() => []),
]);

assert.match(home, /Professional Orbit/i, 'Home must introduce professional logo evidence');
assert.match(home, /Organizations where I worked[\s\S]*brands or projects I supported/i, 'Home must distinguish professional relationships');
assert.match(home, /Worked at/i, 'Home must label workplace logos');
assert.match(home, /Client &amp; project exposure/i, 'Home must label client and project logos');
assert.match(home, /data-orbit-toggle[\s\S]*Pause motion/i, 'moving logo tracks must provide a pause control');
assert.match(home, /aria-hidden="true"/, 'visual marquee duplicate must be hidden from assistive technology');
assert.match(home, /loading="lazy"/, 'logo assets must load lazily below hero');
assert.match(home, /decoding="async"/, 'logo assets must decode asynchronously');
assert.match(css, /professional-orbit-track[\s\S]*animation:/, 'professional logo track must animate');
assert.match(css, /prefers-reduced-motion[\s\S]*professional-orbit-track/, 'professional logo motion must stop for reduced motion');
assert.equal(professionalAssets.filter(name => name.endsWith('.svg')).length, 21, 'must publish all 21 professional logos');
assert.equal(educationAssets.filter(name => name.endsWith('.svg')).length, 2, 'must publish both education logos');
assert.match(about, /education-mark/i, 'About Foundation must display education marks');
assert.match(about, /class="education-mark"[\s\S]*alt=""/, 'education marks must be decorative beside institution headings');
assert.doesNotMatch(home, /Institut Teknologi Bandung\.svg|PPM School of Management\.svg|\/logos\/education\//i, 'education marks must not appear on Home');
assert.doesNotMatch(resume, /education-mark|\/logos\/education\//i, 'Resume must remain text-first without education logos');

console.log('Logo orbit contract passed.');
