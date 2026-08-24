// Extract the trimmed logo source SVGs from commit d0c9f11 (before the
// black-plate sources were swapped in at 5ba92e3) into assets-src/, then
// apply the post-commit Pantene swap from 2188e10.
import { execFileSync } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const TRIM = 'd0c9f11';
const PANTENE = '2188e10';

const show = (rev, path) => execFileSync('git', ['show', `${rev}:${path}`], { cwd: root });
const list = (rev, dir) =>
  execFileSync('git', ['ls-tree', '-r', '--name-only', rev, '--', dir], { cwd: root, encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter((p) => p.endsWith('.svg'));

const dirs = [
  ['public/images/logos/professional', 'assets-src/logos/professional'],
  ['public/images/logos/education', 'assets-src/logos/education'],
];

for (const [srcDir, outDir] of dirs) {
  await mkdir(join(root, outDir), { recursive: true });
  for (const p of list(TRIM, srcDir)) {
    const name = p.split('/').pop();
    await writeFile(join(root, outDir, name), show(TRIM, p));
    console.log('restored', name);
  }
}

// Pantene was re-exported with a transparent background after the trim.
const pantene = show(PANTENE, 'public/images/logos/professional/pantene.svg');
await writeFile(join(root, 'assets-src/logos/professional/pantene.svg'), pantene);
console.log('applied pantene swap from', PANTENE);
