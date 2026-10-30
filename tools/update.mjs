// update.mjs — drift probe (read-only, default) + GATED refresh (--pull).
// usage:
//   node tools/update.mjs [--json] [--limit N]     read-only drift probe
//   node tools/update.mjs --dry-run [--json]       full fetch + per-file trust gate, WRITES NOTHING
//   node tools/update.mjs --pull --date YYYY-MM-DD gated refresh (legacy archive + re-cut manifest)
//        optional gate expectations: --expect-identical N --expect-changed N --expect-gone N
//   node tools/update.mjs --closure                probe the runtime closure of the local capture
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
// Re-verified 2026-10-13 and 2026-10-30: the routes are byte-exact / the entry
// route is the only one that answers with the game document.
//
// Refresh contract (PLAN §3, mirror-local):
//   * --dry-run fetches every manifest file and classifies it. It is the TRUST
//     GATE: a file the origin still serves must reproduce the capture
//     byte-for-byte, or the tool is wrong. Nothing is written.
//   * --pull refuses to write unless that same gate passes in the same run.
//   * every replaced or upstream-gone file is copied to legacy/<date>/<rel>
//     BEFORE the tree changes; gone files are recorded, never invented.
//   * the manifest is re-cut from the freshly fetched bytes.
//   * rebuilt from a 2026-10-30 run that died on ECONNRESET with the old
//     sequential probe: fetches are now pooled with retries/backoff.
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
// Presence-only documents (see classify): the publisher's feed shell is rendered
// per request with a randomly chosen variant (game iframe + signed mb_rec token,
// or not), so it can never reproduce byte-for-byte.
const DYNAMIC = new Set(["shell.html", "shell-index.html"]);

const ARGS = process.argv.slice(2);
const has = (f) => ARGS.includes(f);
const opt = (f, d) => {
  const i = ARGS.indexOf(f);
  return i >= 0 && i + 1 < ARGS.length ? ARGS[i + 1] : d;
};
const DRY = has("--dry-run");
const PULL = has("--pull");
const CLOSURE = has("--closure");
const JSON_OUT = has("--json");
const DATE = opt("--date", new Date().toISOString().slice(0, 10));
const LIMIT = Number(opt("--limit", "0")) || 0;
const CONCURRENCY = Number(opt("--concurrency", "6")) || 6;
const RETRIES = Number(opt("--retries", "4")) || 4;

const sha = (b) => crypto.createHash("sha256").update(b).digest("hex");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// One pooled, retrying GET. Returns { status, buf, error }. A status 0 means the
// request never completed (network error) even after every retry.
async function getBuf(url) {
  let lastErr = null;
  let lastStatus = 0;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.ok) return { status: r.status, buf: Buffer.from(await r.arrayBuffer()) };
      // 404/410 are authoritative answers, not transient failures.
      if (r.status === 404 || r.status === 410) return { status: r.status, buf: null };
      lastStatus = r.status;
      lastErr = new Error(`HTTP ${r.status}`);
      if (r.status < 500 && r.status !== 429) return { status: r.status, buf: null };
    } catch (e) {
      lastErr = e;
      lastStatus = 0;
    }
    if (attempt < RETRIES) await sleep(600 * (attempt + 1) + Math.floor(Math.random() * 300));
  }
  return { status: lastStatus, buf: null, error: String(lastErr && (lastErr.code || lastErr.message)) };
}

async function pool(items, worker, concurrency = CONCURRENCY) {
  const out = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      out[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return out;
}

// disk rel -> served path ("" = origin root)
const servedOf = (rel) =>
  ROUTE_OVERRIDES[rel] ?? (rel.startsWith(DISK_PREFIX) ? rel.slice(DISK_PREFIX.length) : rel);
const urlOf = (rel) => ORIGIN + "/" + servedOf(rel).replace(/^\//, "");

// Rotating per-response noise — everything else must be byte-identical.
const normalize = (s) =>
  s
    .replace(/ nonce="[^"]*"/g, "")
    .replace(/window\.__CF\$cv\$params=\{[^}]*\}/g, "window.__CF$cv$params=<token>")
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, "<uuid>");

const manifestPath = path.join(proj, ".upstream", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
let rels = Object.keys(manifest.files)
  .filter((r) => r !== "_mirror-report.json" && !r.endsWith("_mirror-report.json"))
  .sort();
if (LIMIT) rels = rels.slice(0, LIMIT);

// ── fetch every captured file (entry through its real route) ───────────────
const live = {};
await pool(rels, async (rel) => {
  live[rel] = await getBuf(urlOf(rel));
});

// ── classify ───────────────────────────────────────────────────────────────
const rows = [];
for (const rel of rels) {
  const l = live[rel];
  const capAbs = path.join(proj, rel);
  const capExists = fs.existsSync(capAbs);
  if (!capExists) {
    rows.push({ file: rel, state: "capture-missing" });
    continue;
  }
  if (l.status === 404 || l.status === 410) {
    rows.push({ file: rel, state: "gone", status: l.status });
    continue;
  }
  if (l.status !== 200 || !l.buf) {
    rows.push({ file: rel, state: "unreachable", status: l.status, error: l.error });
    continue;
  }
  // Per-request-variable documents are PRESENCE-ONLY. The two feed-shell
  // documents carry a randomly chosen variant: sometimes the game iframe with a
  // freshly signed `mb_rec=v1.0<uuid>.<uuid>.<ts>.<sig>` token, sometimes not
  // (observed 2026-10-30: 37,131 / 36,845 / 36,805 B across consecutive GETs).
  // A fixed sha can never match them, so the drift probe checks they are
  // served, and the snapshot on disk stays as captured.
  if (DYNAMIC.has(rel) || manifest.files[rel].dynamic) {
    rows.push({ file: rel, state: "present", liveBytes: l.buf.length });
    continue;
  }
  const cap = fs.readFileSync(capAbs);
  if (rel.endsWith(".html")) {
    const a = normalize(l.buf.toString("utf8"));
    const b = normalize(cap.toString("utf8"));
    rows.push(
      a === b
        ? { file: rel, state: "identical" }
        : { file: rel, state: "changed", captureBytes: cap.length, liveBytes: l.buf.length }
    );
  } else {
    const h = sha(l.buf);
    rows.push(
      h === manifest.files[rel].sha256
        ? { file: rel, state: "identical" }
        : {
            file: rel,
            state: "changed",
            captureBytes: cap.length,
            liveBytes: l.buf.length,
            mirror: manifest.files[rel].sha256.slice(0, 12),
            live: h.slice(0, 12),
          }
    );
  }
}

const byState = (s) => rows.filter((r) => r.state === s);
const identical = byState("identical");
const changed = byState("changed");
const gone = byState("gone");
const present = byState("present");
const unreachable = byState("unreachable").concat(byState("capture-missing"));

// ── closure scan: path-like literals in the LIVE text captures ─────────────
// The drift probe cannot see files a redeploy newly references (PLAN §4), so a
// refresh re-runs a fixpoint scan over the freshly fetched entry, bundle, boot
// script, stylesheet, workers and JSON manifests. Any candidate that answers
// 200 and is not already in the manifest is a real closure addition; anything
// else 404s (the origin is a plain static host with honest 404s).
const KNOWN_EXT =
  /\.(js|mjs|css|html|json|wasm|glb|gltf|bin|gz|png|jpe?g|webp|avif|svg|ico|ktx2?|hdr|mp3|wav|ogg|mp4|woff2?|webmanifest|txt)$/i;
const PATH_ROOTS = /^(?:\.\/)?(?:assets|workers|fonts|__mb)\//;
const junk = (s) => /[<>"'{}\\^$`|*]/.test(s) || /\s/.test(s) || s.length > 200;

function candidatesFrom(text) {
  const out = new Set();
  // Scan each delimiter separately. A single /["'`](... )["'`]/ pass mis-pairs
  // across template literals: an opening backtick in minified code swallowed
  // ordinary "..." literals whole, so `assets/real/yards.bin` never surfaced and
  // the 2026-10-30 refresh silently missed its served twin
  // `assets/real/yards.bin.gz`. Same-delimiter scans cannot cross-pair.
  const LITERALS = [/"([^"\n]{2,200})"/g, /'([^'\n]{2,200})'/g, /`([^`\n]{2,200})`/g];
  for (const re of LITERALS) {
    for (const m of text.matchAll(re)) {
      let s = m[1];
      if (junk(s) || !KNOWN_EXT.test(s)) continue;
      if (!PATH_ROOTS.test(s) && !s.startsWith("/")) continue;
      s = s.replace(/^\.\//, "").replace(/^\//, "").split("?")[0].split("#")[0];
      if (!s || !KNOWN_EXT.test(s)) continue;
      out.add(s);
    }
  }
  return out;
}

const MEDIA_EXT = /\.(mp3|wav|ogg|oga|m4a|aac|flac|mp4|webm)$/i;
const urlFor = (p) => ORIGIN + "/" + p.split("/").map(encodeURIComponent).join("/");

// Every string value in a captured JSON asset manifest is relative to that
// manifest's own directory (audio.json: {"file":"rd_mot_lo.mp3"}, tex.json,
// impostors.json). The bare-name sweep below finds those; the path sweep above
// finds absolute/assets-rooted literals in code. Both are needed: the 2026-10-30
// refresh added 19 rd_*.mp3 files that no JS literal names — only audio.json does.
function jsonNameCandidates(rel, text) {
  let doc;
  try {
    doc = JSON.parse(text);
  } catch {
    return [];
  }
  const dir = path.posix.dirname(rel);
  const out = new Set();
  const walk = (x) => {
    if (typeof x === "string") {
      if (KNOWN_EXT.test(x) && !/[/\\]/.test(x) && x.length < 120) {
        out.add((dir === "." ? "" : dir + "/") + x);
      }
    } else if (x && typeof x === "object") {
      for (const v of Object.values(x)) walk(v);
    }
  };
  walk(doc);
  return [...out];
}

async function closureScan() {
  const textRels = rels.filter(
    (r) =>
      /\.(js|mjs|css|html|json|webmanifest)$/i.test(r) &&
      (live[r].status === 200 ? live[r].buf : fs.existsSync(path.join(proj, r)))
  );
  const cands = new Set();
  const constructed = new Set();
  for (const rel of textRels) {
    const buf = live[rel].status === 200 ? live[rel].buf : fs.readFileSync(path.join(proj, rel));
    const text = buf.toString("utf8");
    for (const c of candidatesFrom(text)) cands.add(c);
    if (/\.json$/i.test(rel)) for (const c of jsonNameCandidates(rel, text)) cands.add(c);
    if (/\.js$/i.test(rel)) {
      // Constructed runtime paths: the garage renders `dir + "turntable.webp"`
      // for every car and mission, and only the dir literal is in the bundle
      // (`var Jet="assets/roadster/"`). The 2026-10-30 offline boot caught
      // assets/roadster/ and assets/missions/ 404ing locally for exactly this
      // reason — no literal probe could see them. Expand the one documented
      // template (`.dir + "turntable.webp"`) over every assets/<x>/ literal.
      for (const m of text.matchAll(/(["'])(assets\/[a-z0-9_.-]+\/)\1/gi)) {
        cands.add(m[2] + "turntable.webp");
        constructed.add(m[2] + "turntable.webp");
      }
    }
  }
  const known = new Set(rels);
  const unknown = [...cands].filter((c) => !known.has(c) && !c.endsWith("/")).sort().slice(0, 1200);

  // The dist is a data-gz build: the code names `assets/x/y.bin` while the host
  // serves `assets/x/y.bin.gz`. Probe the literal first; on a 404/410 try the
  // `.gz` twin. Both answers are recorded — nothing is invented.
  const results = await pool(unknown, async (c) => {
    const r = await getBuf(urlFor(c));
    if ((r.status === 404 || r.status === 410) && !/\.gz$/i.test(c)) {
      const gz = c + ".gz";
      if (!known.has(gz)) {
        const r2 = await getBuf(urlFor(gz));
        if (r2.status === 200) return { path: gz, via: c + " (gzip twin)", r: r2 };
      }
    }
    return { path: c, r, via: constructed.has(c) ? "constructed dir template (.dir + turntable.webp)" : undefined };
  });
  const added = results
    .filter((x) => x.r.status === 200 && x.r.buf && x.r.buf.length > 0)
    .map((x) => ({ rel: x.path, buf: x.r.buf, via: x.via }));
  const notFound = results.filter((x) => x.r.status === 404 || x.r.status === 410).map((x) => x.path);
  const unresolved = results
    .filter((x) => x.r.status !== 200 && x.r.status !== 404 && x.r.status !== 410)
    .map((x) => ({ path: x.path, status: x.r.status, error: x.r.error }));
  return { candidates: unknown.length, added, notFound, unresolved };
}

// ── reporting ──────────────────────────────────────────────────────────────
function report(gateOk, extra = {}) {
  const summary = {
    origin: ORIGIN,
    mode: PULL ? "pull" : DRY ? "dry-run" : CLOSURE ? "closure" : "probe",
    checked: rels.length,
    identical: identical.length,
    changed: changed.length,
    gone: gone.length,
    present: present.length,
    unreachable: unreachable.length,
    trustGate: gateOk ? "PASS" : "FAIL",
    rows,
    ...extra,
  };
  if (JSON_OUT) {
    console.log(JSON.stringify(summary, null, 2));
    return summary;
  }
  if (PULL || DRY) {
    console.log(
      `${gateOk ? "TRUST GATE PASS" : "TRUST GATE FAIL"}: ${identical.length}/${rels.length} ` +
        `still-served files reproduced byte-for-byte; ${present.length} presence-only (dynamic); ` +
        `${changed.length} changed; ${gone.length} upstream-gone; ${unreachable.length} unreachable`
    );
    for (const r of [...changed, ...gone, ...unreachable]) {
      const size = r.captureBytes !== undefined ? ` (${r.captureBytes} -> ${r.liveBytes} B)` : "";
      console.log(`  ${r.state.padEnd(15)} ${r.file}${size}`);
    }
  } else if (!rows.some((r) => r.state !== "identical" && r.state !== "present")) {
    console.log(`up to date: ${identical.length} captured files identical upstream, ${present.length} presence-only`);
  } else {
    console.log(`DRIFT: ${changed.length} changed, ${gone.length} live-missing (of ${rels.length} captured)`);
    for (const r of [...changed, ...gone].slice(0, 40)) console.log(`  ${r.state.padEnd(14)} ${r.file}`);
  }
  return summary;
}

// ── --closure (standalone) ─────────────────────────────────────────────────
if (CLOSURE) {
  const c = await closureScan();
  console.log(
    `closure: ${c.candidates} candidate path literals, ${c.added.length} live-but-uncaptured, ` +
      `${c.notFound.length} 404, ${c.unresolved.length} unresolved`
  );
  for (const a of c.added) console.log(`  UNCAPPED 200  ${a.rel} (${a.buf.length} B)`);
  for (const u of c.unresolved) console.log(`  STATUS ${u.status}  ${u.path}`);
  process.exit(c.added.length || c.unresolved.length ? 1 : 0);
}

// ── trust gate verdict ─────────────────────────────────────────────────────
// The trust gate: at least one still-served file reproduced byte-for-byte
// (proves the fetch path + routing are right), and nothing failed to answer.
const gatePassed = identical.length > 0 && unreachable.length === 0;
const expectations = {
  identical: opt("--expect-identical", null),
  changed: opt("--expect-changed", null),
  gone: opt("--expect-gone", null),
};
const expectationMismatch = Object.entries(expectations)
  .filter(([, v]) => v !== null)
  .filter(([k, v]) => Number(v) !== { identical, changed, gone }[k].length)
  .map(([k, v]) => `${k}: expected ${v}, got ${{ identical, changed, gone }[k].length}`);

if (!PULL) {
  report(gatePassed && !expectationMismatch.length, expectationMismatch.length ? { expectationMismatch } : {});
  if (DRY) {
    // dry-run is a gate, not a probe: it exits non-zero when it cannot vouch.
    process.exit(gatePassed && !expectationMismatch.length ? 0 : 1);
  }
  if (!rows.some((r) => r.state !== "identical")) process.exit(0);
  process.exit(1);
}

// ── --pull: gated refresh ──────────────────────────────────────────────────
if (!gatePassed) {
  report(false);
  console.error("\nREFUSING TO WRITE: the trust gate did not pass.");
  process.exit(2);
}
if (expectationMismatch.length) {
  report(false, { expectationMismatch });
  console.error(`\nREFUSING TO WRITE: ${expectationMismatch.join("; ")}`);
  process.exit(2);
}

const legacyDir = path.join(proj, "legacy", DATE);
const archived = [];
let wrote = 0;
// 1) archive every file we are about to replace or retire, then write/remove
for (const r of [...changed, ...gone]) {
  const src = path.join(proj, r.file);
  const dst = path.join(legacyDir, r.file);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  archived.push(r.file);
}
for (const r of changed) {
  const dst = path.join(proj, r.file);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  const tmp = dst + ".partial";
  fs.writeFileSync(tmp, live[r.file].buf);
  fs.renameSync(tmp, dst);
  wrote++;
}
for (const r of gone) fs.unlinkSync(path.join(proj, r.file));

// 2) re-probe the closure from the freshly written tree
const closure = await closureScan();
for (const a of closure.added) {
  const dst = path.join(proj, a.rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, a.buf);
  wrote++;
}

// 3) re-cut the manifest from the bytes now on disk
const nextFiles = {};
const goneSet = new Set(gone.map((g) => g.file));
for (const rel of Object.keys(manifest.files).sort()) {
  if (goneSet.has(rel)) continue;
  const buf = fs.readFileSync(path.join(proj, rel));
  const entry = { bytes: buf.length, sha256: sha(buf) };
  // presence-only documents keep their captured snapshot + its sha, and the
  // `dynamic` flag (the drift probe compares presence, verify.mjs still hashes
  // the snapshot it actually ships)
  if (DYNAMIC.has(rel) || manifest.files[rel].dynamic) entry.dynamic = true;
  nextFiles[rel] = entry;
}
for (const a of closure.added) {
  const buf = fs.readFileSync(path.join(proj, a.rel));
  nextFiles[a.rel] = { bytes: buf.length, sha256: sha(buf) };
}
const nextManifest = {
  generated: DATE,
  origin: ORIGIN,
  files: Object.fromEntries(Object.keys(nextFiles).sort().map((k) => [k, nextFiles[k]])),
};
fs.writeFileSync(manifestPath, JSON.stringify(nextManifest, null, 2) + "\n");

// 4) record the refresh in _mirror-report.json (never invent content)
const reportPath = path.join(proj, "_mirror-report.json");
if (fs.existsSync(reportPath)) {
  const rep = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  rep.paths = Object.keys(nextManifest.files).sort();
  rep.fetched = rep.paths.length;
  rep.bytes = rep.paths.reduce((a, k) => a + nextManifest.files[k].bytes, 0);
  (rep.refreshes ||= []).push({
    date: DATE,
    trustGate: "PASS",
    checked: rels.length,
    identical: identical.length,
    presenceOnly: present.map((r) => r.file),
    changed: changed.map((r) => r.file),
    upstreamGone: gone.map((r) => ({ file: r.file, status: r.status, note: "404/410 on the live origin at refresh time; bytes preserved under legacy/" + DATE + "/, entry removed from the manifest — not replaced, not invented" })),
    added: closure.added.map((a) => ({ file: a.rel, bytes: a.buf.length, via: a.via || "path literal" })),
    closure: {
      candidates: closure.candidates,
      added: closure.added.length,
      notFound404: closure.notFound.length,
      notFoundSample: closure.notFound.slice(0, 200),
      unresolved: closure.unresolved,
      note:
        "path literals in the freshly fetched HTML/JS/CSS/JSON plus every bare filename in the captured JSON " +
        "asset manifests (audio.json); a `.bin` literal is retried as its served `.gz` twin. 404s are genuine " +
        "upstream absences (recorded, never invented).",
    },
    legacy: `legacy/${DATE}/`,
  });
  (rep.notes ||= []).push(
    `Refresh ${DATE}: trust gate passed (${identical.length}/${rels.length} still-served files byte-exact), ` +
      `${changed.length} replaced (originals in legacy/${DATE}/), ${gone.length} upstream-gone recorded, ` +
      `${closure.added.length} closure addition(s).`
  );
  fs.writeFileSync(reportPath, JSON.stringify(rep, null, 2) + "\n");
}

console.log(
  `\nREFRESH ${DATE}: ${wrote} file(s) written, ${archived.length} archived to legacy/${DATE}/, ` +
    `${Object.keys(nextManifest.files).length} files in the new manifest`
);
for (const g of gone) console.log(`  upstream-gone ${g.file} (HTTP ${g.status})`);
for (const a of closure.added) console.log(`  closure add   ${a.rel} (${a.buf.length} B)`);
report(true, { pull: { wrote, archived, added: closure.added.map((a) => a.rel), gone: gone.map((g) => g.file) } });
