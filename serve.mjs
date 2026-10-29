// Local preview of dist/ that behaves like Vercel: clean URLs, 404.html, and HTTP Range for video scrubbing.
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.env.PORT || process.argv[2] || 4321);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.mp4': 'video/mp4', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
};

async function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  const base = path.join(DIST, clean);
  if (!base.startsWith(DIST)) return null;
  for (const p of [base, base + '.html', path.join(base, 'index.html')]) {
    try { const s = await stat(p); if (s.isFile()) return { p, s }; } catch { }
  }
  return null;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let hit = await resolve(url.pathname), status = 200;
  if (!hit) { hit = await resolve('/404.html'); status = 404; }
  if (!hit) { res.writeHead(404).end('not found'); return; }
  const type = TYPES[path.extname(hit.p)] || 'application/octet-stream';
  const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
  if (range && status === 200) {
    const start = range[1] ? +range[1] : 0, end = range[2] ? Math.min(+range[2], hit.s.size - 1) : hit.s.size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${hit.s.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    createReadStream(hit.p, { start, end }).pipe(res);
    return;
  }
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': hit.s.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' });
  createReadStream(hit.p).pipe(res);
}).listen(PORT, () => console.log(`Tre Fiamme preview → http://localhost:${PORT}`));
