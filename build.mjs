// Static site build: every module in src/pages exports pages() → [{ route, title, main, ... }].
// Each page is wrapped by src/layout.mjs and written to dist/<route>.html; public/ is copied as is.
import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from './src/layout.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const PAGES = path.join(ROOT, 'src', 'pages');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else if (e.name.endsWith('.mjs')) out.push(p);
  }
  return out;
}

const version = Date.now().toString(36);
await rm(DIST, { recursive: true, force: true });
await cp(path.join(ROOT, 'public'), DIST, { recursive: true });

let count = 0;
for (const file of (await walk(PAGES)).sort()) {
  const mod = await import(pathToFileURL(file).href);
  for (const page of await mod.pages()) {
    const rel = page.route === '/' ? 'index.html' : page.route.replace(/^\//, '') + '.html';
    const dest = path.join(DIST, rel);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, layout(page, { version }), 'utf8');
    count++;
  }
}
console.log(`built ${count} pages → dist/`);
