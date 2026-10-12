// update.mjs — read-only drift probe against the live origin. Never rewrites the capture.
// usage: node tools/update.mjs [--json]
//
// TELEOPERATOR (https://mindblown.ai/games/teleoperator) is capture-class. The
// mindblown.ai game page is the publisher's platform SPA; the GAME itself is
// served by its own host, https://teleoperator.mindblown.ai (the SPA embeds it
// as a cross-origin iframe with ?mb=game). The mirror captures the game host's
// route closure, so ORIGIN is the game host.
//
// Route quirks (verified 2026-10-12, all header-independent):
//   - GET /            -> the feed shell (splash + rail + same-origin iframe
//                         of /?mb=game); captured verbatim as shell.html.
//   - GET /?mb=game    -> the game document (39,043 B); captured verbatim as
//                         index.html — the mirror's entry, served at / (and at
//                         /?mb=game) by a plain static server.
//   - GET /index.html  -> the SHELL again (51,907 B), identical to `/` except its
//                         self-referential twitter:player meta points at /index.html
//                         (captured as shell-index.html); so the entry document must
//                         be probed through its real route, /?mb=game.
//   - GET /robots.txt  -> 200, 1,248 B (captured).
// Re-verified 2026-10-13: all four routes byte-exact against the capture; the
// discovery page https://mindblown.ai/games/teleoperator is a publisher portal
// (mindblown.ai SPA) that embeds the game host in a cross-origin iframe with
// /?mb=game — the mirror serves the game host, not the portal.
// Everything else is probed directly at ORIGIN/<rel>; the manifest is the
// authoritative closure. Rotating per-response noise is normalized on HTML
// (this host serves static documents, so in practice nothing rotates).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const ORIGIN = "https://teleoperator.mindblown.ai";
const ENTRY = "index.html";                 // disk path of the entry document
const ENTRY_ROUTE = "/?mb=game";            // the route that serves it upstream
const DISK_PREFIX = "";                     // capture files sit at repo root
const ROUTE_OVERRIDES = {                   // disk rel -> served path
  "index.html": ENTRY_ROUTE,
  "shell.html": "/",                        // the bare-/ feed shell document
  "shell-index.html": "/index.html",        // the same shell served at /index.html
};                                          // (identical but for its self-referential
                                            //  twitter:player meta — 51,907 B vs 51,867 B)
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0" };
const MAX_PROBES = 800;

const sha = (b) => crypto.createHash("sha256").update(b).digest("hex");
async function getBuf(url) {
  const r = await fetch(url, { headers: UA });
  return { status: r.status, buf: r.ok ? Buffer.from(await r.arrayBuffer()) : null };
}
// disk rel -> served path ("" = origin root)
const servedOf = (rel) => ROUTE_OVERRIDES[rel] ?? (rel.startsWith(DISK_PREFIX) ? rel.slice(DISK_PREFIX.length) : rel);
// Rotating per-response noise — everything else must be byte-identical.
const normalize = (s) =>
  s
    .replace(/ nonce="[^"]*"/g, "")
    .replace(/window\.__CF\$cv\$params=\{[^}]*\}/g, "window.__CF$cv$params=<token>")
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, "<uuid>");

const manifest = JSON.parse(fs.readFileSync(path.join(proj, ".upstream", "manifest.json"), "utf8"));

const live = {};
const entryUrl = ORIGIN + servedOf(ENTRY);
const entry = await getBuf(entryUrl);
if (entry.status !== 200) {
  console.error(`live entry ${entryUrl} -> HTTP ${entry.status}`);
  process.exit(2);
}
live[ENTRY] = { buf: entry.buf };

// Probe every captured file directly — the manifest is the authoritative closure.
const rels = Object.keys(manifest.files)
  .filter((r) => r !== ENTRY && !r.endsWith("_mirror-report.json"))
  .sort()
  .slice(0, MAX_PROBES);
for (const rel of rels) {
  const served = servedOf(rel);
  const r = await getBuf(ORIGIN + "/" + served.replace(/^\//, ""));
  if (r.status === 200 && !live[rel]) live[rel] = { buf: r.buf };
}

const rows = [];
for (const [n, m] of Object.entries(manifest.files).sort()) {
  if (n.endsWith("_mirror-report.json")) continue;
  const l = live[n];
  if (!l) {
    rows.push({ file: n, state: "live-missing" });
    continue;
  }
  if (m.dynamic) continue; // presence-only file
  if (n.endsWith(".html")) {
    const cap = path.join(proj, n);
    if (!fs.existsSync(cap)) continue;
    const a = normalize(l.buf.toString("utf8"));
    const b = normalize(fs.readFileSync(cap, "utf8"));
    if (a !== b) rows.push({ file: n, state: "changed" });
  } else if (m.sha256 !== sha(l.buf)) {
    rows.push({ file: n, state: "changed", mirror: m.sha256.slice(0, 12), live: sha(l.buf).slice(0, 12) });
  }
}
const changed = rows.filter((r) => r.state === "changed").length;
const missing = rows.filter((r) => r.state === "live-missing").length;
if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ origin: ORIGIN, checked: Object.keys(manifest.files).length, changed, missing, rows }, null, 2));
} else if (!rows.length) {
  console.log(`up to date: ${Object.keys(manifest.files).length} captured files identical upstream`);
} else {
  console.log(`DRIFT: ${changed} changed, ${missing} live-missing (of ${Object.keys(manifest.files).length} captured)`);
  for (const r of rows.slice(0, 40)) console.log(`  ${r.state.padEnd(14)} ${r.file}`);
  process.exit(1);
}
