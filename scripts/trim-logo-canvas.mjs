import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Trim oversized square canvas from logo SVGs.
// Each source SVG is a 750x750 viewBox with the actual logo occupying a small
// central region. We extract the content bounds and rewrite the viewBox so the
// canvas hugs the logo. No re-encoding of the embedded PNG - pure metadata.

const PAD_RATIO = 0.06; // 6% of max dimension as breathing room

const clipRe = /<clipPath id="[^"]+"[^>]*>\s*<path d="M ([\d.]+)[ ,]([\d.]+) L ([\d.]+)[ ,]([\d.]+) L ([\d.]+)[ ,]([\d.]+) L ([\d.]+)[ ,]([\d.]+)/;
const imageRe = /<image x="([\d.-]+)" y="([\d.-]+)" width="([\d.-]+)"/;
const matrixRe = /transform="matrix\(([\d.]+), 0, 0, ([\d.]+), ([\d.-]+), ([\d.-]+)\)"/;

function boundsFromClip(content) {
  const m = content.match(clipRe);
  if (!m) return null;
  const x1 = parseFloat(m[1]), y1 = parseFloat(m[2]);
  const x2 = parseFloat(m[3]), y2 = parseFloat(m[6]);
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1, source: 'clipPath' };
}

function boundsFromImageMatrix(content) {
  const img = content.match(imageRe);
  const mat = content.match(matrixRe);
  if (!img || !mat) return null;
  const imgW = parseFloat(img[3]);
  const sx = parseFloat(mat[1]), sy = parseFloat(mat[2]);
  const tx = parseFloat(mat[3]), ty = parseFloat(mat[4]);
  // assume square image scaled uniformly
  const w = imgW * sx, h = imgW * sy;
  return { x: tx, y: ty, w, h, source: 'imageMatrix' };
}

function trimSvg(content) {
  const bounds = boundsFromClip(content) || boundsFromImageMatrix(content);
  if (!bounds) return { content, changed: false, reason: 'no-bounds' };

  const pad = Math.max(bounds.w, bounds.h) * PAD_RATIO;
  const vx = Math.max(0, bounds.x - pad);
  const vy = Math.max(0, bounds.y - pad);
  const vw = bounds.w + pad * 2;
  const vh = bounds.h + pad * 2;

  const r = (n) => Math.round(n * 100) / 100;
  const newViewBox = `${r(vx)} ${r(vy)} ${r(vw)} ${r(vh)}`;

  // Replace viewBox
  let out = content.replace(/viewBox="0 0 [\d.]+ [\d.]+"/, `viewBox="${newViewBox}"`);
  // Replace width/height attributes to match aspect ratio (scaled to height 200 baseline)
  const scale = 200 / vh;
  const newW = Math.round(vw * scale);
  const newH = 200;
  out = out.replace(/width="1000"/, `width="${newW}"`).replace(/height="1000"/, `height="${newH}"`);

  const changed = out !== content;
  return {
    content: out,
    changed,
    reason: bounds.source,
    viewBox: newViewBox,
    ratio: Math.round((vw / vh) * 100) / 100,
  };
}

async function processDir(dir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.svg'));
  const results = [];
  for (const file of files) {
    const path = join(dir, file);
    const content = await readFile(path, 'utf8');
    const res = trimSvg(content);
    if (res.changed) {
      await writeFile(path, res.content, 'utf8');
    }
    results.push({ file, ...res, content: undefined });
  }
  return results;
}

const professional = await processDir(fileURLToPath(new URL('../public/images/logos/professional/', import.meta.url)));
const education = await processDir(fileURLToPath(new URL('../public/images/logos/education/', import.meta.url)));

console.log('=== professional ===');
for (const r of professional) {
  console.log(`${r.changed ? 'TRIMMED' : 'SKIP   '} ${r.file}  ${r.viewBox || ''}  ratio=${r.ratio ?? '-'}  via=${r.reason}`);
}
console.log('=== education ===');
for (const r of education) {
  console.log(`${r.changed ? 'TRIMMED' : 'SKIP   '} ${r.file}  ${r.viewBox || ''}  ratio=${r.ratio ?? '-'}  via=${r.reason}`);
}
const trimmed = [...professional, ...education].filter((r) => r.changed).length;
const total = professional.length + education.length;
console.log(`\n${trimmed}/${total} trimmed.`);
if (trimmed !== total) {
  console.error('WARNING: some files were not trimmed');
  process.exit(1);
}
