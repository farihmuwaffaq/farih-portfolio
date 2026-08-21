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
assert.match(home, /professional-orbit-label[\s\S]*Organizations[\s\S]*professional-orbit-label[\s\S]*Brands/i, 'Home must split organizations and brands into separate labeled groups');
assert.match(home, /workplaceLogos[\s\S]*role:/i, 'Workplace logos must carry role context');
assert.match(home, /clientLogos[\s\S]*context:/i, 'Client logos must carry context labels');
assert.match(home, /logo-context/i, 'Home must include context labels for hover reveal');
assert.match(home, /data-orbit-toggle[\s\S]*Pause motion/i, 'moving logo tracks must provide a pause control');
assert.match(home, /aria-hidden="true"/, 'visual marquee duplicate must be hidden from assistive technology');
assert.match(home, /loading="lazy"/, 'logo assets must load lazily below hero');
assert.match(home, /decoding="async"/, 'logo assets must decode asynchronously');
assert.match(css, /\.professional-orbit img[\s\S]*opacity:\s*\.7[5-9]/, 'logo default opacity must be at least 75%');
assert.match(css, /\.professional-orbit li:hover img[\s\S]*opacity:\s*1/, 'logo opacity must reach 100% on hover');
assert.match(css, /\.professional-orbit img[\s\S]*height:\s*clamp\(/, 'logo size must use optical height normalization');
assert.match(css, /data-logo-type="combination"[\s\S]*height:\s*clamp\(/, 'combination logos need distinct optical height');
assert.match(css, /data-logo-type="compact"[\s\S]*height:\s*clamp\(/, 'compact logos need distinct optical height');
assert.match(home, /data-logo-type=/, 'logos must carry optical type classification');
assert.match(home, /data-tone=/, 'logos must carry recolor tone classification');
assert.match(home, /career-timeline/, 'organizations must render as a career timeline');
assert.match(home, /timeline-years/, 'timeline nodes must carry year ranges');
assert.match(home, /timeline-summary/, 'timeline nodes must carry role summaries');
assert.equal((home.match(/years:'/g) || []).length, 5, 'timeline must carry 5 organization year ranges');
assert.equal((home.match(/summary:'/g) || []).length, 5, 'timeline must carry 5 organization summaries');
assert.match(home, /professional-orbit-light/, 'brands must render on a light surface');
assert.match(css, /\.career-timeline::after[\s\S]*scaleX/, 'timeline line must grow on reveal');
assert.match(css, /\.professional-orbit\.is-visible \.career-timeline::after/, 'timeline growth must trigger on section visibility');
assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.career-timeline \{ grid-template-columns: 1fr/, 'timeline must stack vertically on mobile');
assert.match(css, /prefers-reduced-motion[\s\S]*\.timeline-dot \{ opacity: 1/, 'timeline must be fully visible for reduced motion');
assert.match(css, /\.professional-orbit-light \{ --orbit-bg: #f2f5f1/, 'brands surface must be off-white');
assert.match(css, /img\[data-tone="mono"\][\s\S]*brightness\(0\) invert\(1\)/, 'mono-safe logos forced to off-white');
assert.match(css, /img\[data-tone="color"\][\s\S]*saturate\(/, 'multicolor logos keep identity, desaturated not recolored');
assert.doesNotMatch(css, /\.professional-orbit img \{[^}]*brightness\(0\) invert\(1\)/, 'forced monochrome must not apply globally');
assert.match(css, /\.logo-context[\s\S]*opacity:\s*0/, 'context label must be hidden by default');
assert.match(css, /\.professional-orbit li:hover \.logo-context[\s\S]*opacity:\s*1/, 'context label must appear on hover');
assert.match(css, /professional-orbit-track[\s\S]*animation:/, 'professional logo track must animate');
assert.match(css, /prefers-reduced-motion[\s\S]*professional-orbit-track/, 'professional logo motion must stop for reduced motion');
assert.equal(professionalAssets.filter(name => name.endsWith('.svg')).length, 21, 'must publish all 21 professional logos');
assert.equal(educationAssets.filter(name => name.endsWith('.svg')).length, 2, 'must publish both education logos');
assert.match(about, /education-mark/i, 'About Foundation must display education marks');
assert.match(about, /class="education-mark"[\s\S]*alt=""/, 'education marks must be decorative beside institution headings');
assert.doesNotMatch(home, /Institut Teknologi Bandung\.svg|PPM School of Management\.svg|\/logos\/education\//i, 'education marks must not appear on Home');
assert.doesNotMatch(resume, /education-mark|\/logos\/education\//i, 'Resume must remain text-first without education logos');

// Polish: current-role endpoint + readability
assert.match(home, /' is-current'/, 'last timeline node must be marked is-current');
assert.match(home, /class="timeline-current mono">Current</, 'current role must carry a CURRENT micro-label');
assert.match(css, /\.career-node \.timeline-logo\[data-tone="color"\]\s*\{[^}]*opacity:\s*1/, 'timeline color logos must be lifted to full opacity');
assert.match(css, /\.is-current \.timeline-dot\s*\{[^}]*background:\s*var\(--signal\)/, 'current node dot must be filled green');
assert.match(css, /\.timeline-current\s*\{[^}]*color:\s*var\(--signal\)/, 'CURRENT label must use the signal color');
assert.match(css, /\.career-timeline::after\s*\{[^}]*linear-gradient/, 'progress line must use a gradient so the run-up to current is brighter');
assert.match(css, /\.professional-orbit-marquee::before\s*\{[^}]*22%/, 'brand rail edges must use a stepped soft-fade, not a hard crop');

console.log('Logo orbit contract passed.');
