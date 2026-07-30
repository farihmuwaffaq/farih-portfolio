import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = 'dist';
const files = [];
const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    entry.isDirectory() ? walk(file) : files.push(file);
  }
};
walk(root);

const broken = [];
for (const file of files.filter((item) => item.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const pathname = url.split(/[?#]/)[0];
    let target = join(root, pathname);
    if (pathname.endsWith('/')) target = join(target, 'index.html');
    else if (!extname(pathname)) target = join(target, 'index.html');
    if (!existsSync(target)) broken.push(`${relative(root, file)} -> ${url}`);
  }
}

if (broken.length) {
  console.error(broken.join('\n'));
  process.exit(1);
}
console.log(`Internal link and asset audit passed across ${files.filter((file) => file.endsWith('.html')).length} HTML files.`);
