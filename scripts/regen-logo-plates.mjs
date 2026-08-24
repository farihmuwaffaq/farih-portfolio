import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Rebuild public logo webps from the trimmed source SVGs.
// Transparent-background lockups (Garnier, Selasar Kampus, SKINTIFIC, ...)
// vanish on the dark career track, so any logo whose corners are empty
// (transparent or near-white) gets a light rounded chip composited behind
// it. Logos with a full-bleed backdrop (Garuda, Kimia Farma, Top Coffee)
// pass through untouched.

const root = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(root, 'assets-src', 'logos', 'professional');
const OUT = join(root, 'public', 'images', 'logos', 'professional');

const CORNER_DARK = 64;   // luminance below this counts as a dark corner
const TARGET = 720;       // height of the trimmed raster before padding

async function build(name) {
  const srcPath = join(SRC, name);
  const raster = await sharp(srcPath, { density: 240 })
    .trim({ threshold: 12 })
    .resize({ height: TARGET, withoutEnlargement: true })
    .png()
    .toBuffer();

  const meta = await sharp(raster).metadata();
  const { width: w, height: h } = meta;

  // Chips: dark-on-transparent lockups (Garnier, Selasar Kampus, SKINTIFIC)
  // vanish on the dark career track, so they get a light rounded plate.
  const radius = Math.round(Math.min(w, h) * 0.16);
  const padX = Math.round(h * 0.09);
  const padY = Math.round(h * 0.14);
  const chip = (cw, ch) =>
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}"><rect width="${cw}" height="${ch}" rx="${radius}" fill="#f4f6f2"/></svg>`
    );

  // Sample the four corners: a corner counts as "empty" when the pixel is
  // transparent OR near-white (the page background).
  let empty = 0;
  for (const [x, y] of [[2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3]]) {
    const px = await sharp(raster).extract({ left: x, top: y, width: 1, height: 1 }).raw().toBuffer();
    const lum = 0.2126 * px[0] + 0.7152 * px[1] + 0.0722 * px[2];
    const alpha = px.length > 3 ? px[3] : 255;
    if (alpha < 24 || lum > 200) empty++;
  }

  let out;
  let tagged;
  if (empty >= 3) {
    out = await sharp(chip(w + 2 * padX, h + 2 * padY))
      .composite([{ input: raster, left: padX, top: padY }])
      .webp({ quality: 82 })
      .toBuffer();
    tagged = 'chip';
  } else {
    out = await sharp(raster).webp({ quality: 82 }).toBuffer();
    tagged = 'plain';
  }

  await writeFile(join(OUT, name.replace(/\.svg$/, '.webp')), out);
  console.log(`${tagged.padEnd(6)} ${name}  (${w}x${h})`);
}

await mkdir(OUT, { recursive: true });
const svgs = (await readdir(SRC)).filter((f) => f.endsWith('.svg'));
for (const f of svgs) await build(f);
console.log(`\n${svgs.length} logos rebuilt.`);
