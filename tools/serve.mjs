// serve.mjs — dependency-free static server for the TELEOPERATOR mirror.
//
// Usage: node tools/serve.mjs [port] [root]
//   port  defaults to 4984, bound to 127.0.0.1 only
//   root  defaults to the repo root (the directory holding index.html)
//
// Directory index (/ -> index.html, /x/ -> x/index.html), honest 404 for any
// missing file, no SPA fallback. Gzipped capture payloads (.gz) are served as
// stored bytes (application/gzip) — the game's DecompressionStream decodes
// them; the server never sets Content-Encoding nor re-compresses anything.

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.argv[2] || 4984);
const ROOT = normalize(process.argv[3] || join(fileURLToPath(import.meta.url), '..', '..'));

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.wasm': 'application/wasm',
  '.gz': 'application/gzip', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg',
  '.wav': 'audio/wav', '.mp4': 'video/mp4', '.bin': 'application/octet-stream',
  '.dat': 'application/octet-stream', '.hdr': 'application/octet-stream',
  '.ktx2': 'image/ktx2', '.webmanifest': 'application/manifest+json',
};

function resolvePath(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const abs = normalize(join(ROOT, p));
  if (abs !== ROOT && !abs.startsWith(ROOT + sep)) return null;
  return abs;
}

const server = createServer(async (req, res) => {
  const target = resolvePath(req.url || '/');
  const log = (status) => console.log(`${req.method} ${req.url} ${status}`);
  if (!target) { log(403); res.writeHead(403).end('Forbidden'); return; }
  try {
    const info = await stat(target);
    if (info.isDirectory()) { log(404); res.writeHead(404).end('Not Found'); return; }
    const type = TYPES[extname(target).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': info.size, 'Cache-Control': 'no-cache' });
    log(200);
    createReadStream(target).on('error', () => res.destroy()).pipe(res);
  } catch {
    log(404);
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found');
  }
});

server.listen(PORT, '127.0.0.1', () => console.log(`serving ${ROOT} on http://127.0.0.1:${PORT}/`));
