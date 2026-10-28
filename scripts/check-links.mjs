import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';

const root = resolve('dist');
const base = process.env.BASE_PATH || '/';
const errors = [];
let checked = 0;
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : join(dir, entry.name)))).flat();
}
const files = await walk(root);
for (const file of files.filter(file => /\.(html|css)$/.test(file))) {
  const content = await readFile(file, 'utf8');
  const route = relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '');
  const origin = new URL(`${base}${route}`, 'https://local.test');
  const refs = file.endsWith('.html')
    ? [
        ...[...content.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(match => match[1]),
        ...[...content.matchAll(/\bsrcset="([^"]+)"/g)].flatMap(match => match[1].split(',').map(item => item.trim().split(/\s+/)[0])),
      ]
    : [...content.matchAll(/url\(["']?([^\)"']+)["']?\)/g)].map(match => match[1]);
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|data:|tel:)/.test(ref)) continue;
    checked++;
    const url = new URL(ref.replaceAll('&amp;', '&'), origin);
    if (!url.pathname.startsWith(base)) { errors.push(`${route}: outside base: ${ref}`); continue; }
    let target = resolve(root, decodeURIComponent(url.pathname.slice(base.length)));
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const html = await readFile(target, 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!html.includes(`id="${id}"`)) errors.push(`${route}: missing anchor: ${ref}`);
      }
    } catch { errors.push(`${route}: missing file: ${ref}`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK: ${checked} internal links/assets checked across ${files.filter(file => file.endsWith('.html')).length} HTML pages, base=${base}`);
