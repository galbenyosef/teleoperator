// derive.mjs — rebuild the derived layers (readable/ + src/ + split-spec.json)
// from the teleoperator capture (PLAN §3/§5). TELEOPERATOR
// (https://mindblown.ai/games/teleoperator) is capture-class: a single-file
// production bundle of a WebGPU driving game (real San Francisco, Waymo taxi
// and supercars), served by its own host https://teleoperator.mindblown.ai —
// the mindblown.ai/games/teleoperator page is the publisher's portal and
// embeds the game host as a cross-origin iframe with /?mb=game. §0.4
// fork-over-mirror was checked on 2026-10-13 (see README): the capture
// references no public source repository, so the mirror stands. The capture is
// untouched; every source file is re-hashed against .upstream/manifest.json
// before it is rendered, so a drifted capture fails loudly instead of being
// silently re-derived.
//
// Pipeline:
//   each capture *.js -> pinned prettier 3.9.6 (module API — the CLI respects
//                        .gitignore and can silently echo its input), single
//                        pass, verified idempotent -> readable/<name>.pretty.js
//                        (capture-root-relative name, dirs flattened with __).
//   the capture *.css -> readable/style.pretty.css, wholeFile section
//                        (stylesheet rule: stylesheets are never sliced).
//   vendor regions     -> readable/ + wholeFile sections (vendor rule): the
//                        three.js r186 regions merged into app.js (the core
//                        module + its export table, the WebGLRenderer module,
//                        the addon bundle — CopyShader/EffectComposer/
//                        MeshoptSimplifier, the BufferGeometryUtils fragment,
//                        the GLTFLoader module) are indexed whole, never
//                        sliced; __mb/app/worker.js (the platform PWA worker)
//                        is wholeFile platform machinery.
//   app code           -> statement-aligned slices src/<name>-NN.js at
//                        top-level declaration boundaries, ~250-350 line
//                        windows (oversized single declarations stay whole),
//                        exact 2-line provenance header; every slice is
//                        parse-checked with `node --input-type=module
//                        --check -` and round-trips byte-exact to its
//                        readable line range.
//   HTML documents     -> inline <script>/<style> scan (byte ranges + sha256):
//                        index.html carries 3 inline platform shims, shell.html
//                        and shell-index.html carry 5 inline scripts + 2 inline
//                        styles each -> readable/<doc>-inline-N.pretty.{js,css}
//                        twins + readable/index-inline-map.json.
//
// Non-standalone parts are indexed but never sliced (skipped sections): the
// captured bundle is a single esbuild-style concatenation whose statements are
// all top-level calls/declarations, so in practice every non-vendor line lands
// in a slice; the derive still supports skipped sections for export tables
// should a future capture add one.
//
// The three.js regions inside app.js are content-anchored and asserted (a
// missing anchor fails the run): each claim re-checks its own markers and the
// boundaries (the app's minified prelude before the core module, the app's
// WGSL shader tables after the renderer/addon blocks, the app's car-material
// and WGSL code around the BufferGeometryUtils and GLTFLoader fragments).
//
// Identifiers in src/ are the bundle's own minified names — the rename
// campaign (PLAN §5) is recorded as an open task in README.md. usage:
//   node tools/derive.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
// ── --check: prove the committed derived layer is current, writing NOTHING ─
// This tool used to ignore its command line entirely, so `node tools/derive.mjs
// --check` was a full in-place re-derivation: it rewrote readable/ + src/ +
// split-spec.json and (on a mirror whose derive does not re-apply the recorded
// rename map) stripped the rename layer off src/ -- damage that looks
// legitimate, because the files still parse. --check now runs the mirror's
// documented rebuild chain in a throwaway scratch copy OUTSIDE the mirror and
// compares the result with the committed tree; it writes nothing here.
if (process.argv.includes("--check")) {
  const { runDeriveCheck } = await import("./derive-check.mjs");
  process.exit(await runDeriveCheck());
}

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const PINNED = "3.9.6";
const MAX_WINDOW = 350;
const TODAY = "2026-10-13";
const ROOT = ""; // root-served capture: served path == disk rel

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const readLines = (abs) => {
  const t = fs.readFileSync(abs, "utf8");
  const l = t.split("\n");
  if (l.length && l[l.length - 1] === "") l.pop();
  return l;
};
const linesOf = (text) => text.replace(/\n$/, "").split("\n");
const lineOf = (text, offset) => text.slice(0, offset).split("\n").length;

// capture-relative name -> readable twin name (dirs flattened with __)
const tagOf = (capRel) => {
  const rel = capRel.startsWith(ROOT) ? capRel.slice(ROOT.length) : capRel;
  return rel.replace(/\.(js|css)$/i, "").split("/").join("__");
};
const prettyRelFor = (capRel) =>
  "readable/" + tagOf(capRel) + (/\.css$/i.test(capRel) ? ".pretty.css" : ".pretty.js");

// ── pinned prettier (module API, exactly 3.9.6) ─────────────────────────
async function loadPrettier() {
  const candidates = [
    process.env.PRETTIER_MJS,
    path.join(proj, "node_modules", "prettier", "index.mjs"),
    "D:/repos/mirrors/metropolygonia/node_modules/prettier/index.mjs",
  ].filter(Boolean);
  for (const c of candidates) {
    if (!fs.existsSync(c)) continue;
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(c), "package.json"), "utf8"));
      if (pkg.version !== PINNED) continue;
      const mod = (await import(pathToFileURL(c).href)).default;
      if (mod.version === PINNED) return { mod, at: c };
    } catch {
      /* try next */
    }
  }
  throw new Error(`pinned prettier ${PINNED} not found (set PRETTIER_MJS to its index.mjs)`);
}

// single pass + idempotency proof: prettier output must be a fixed point of
// the same call, so audit's one-pass re-render is byte-exact by construction
async function formatOnce(prettier, text, parser) {
  const out = await prettier.format(text, { parser });
  const again = await prettier.format(out, { parser });
  if (again !== out) throw new Error(`prettier ${parser} is not idempotent on this input`);
  return out;
}

// ── parse check: the exact standalone gate (ESM stdin) ──────────────────
function parses(text) {
  const r = spawnSync(process.execPath, ["--input-type=module", "--check", "-"], {
    input: text,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return { ok: r.status === 0, why: (r.stderr || "").trim().split("\n").slice(-3).join(" | ") };
}

// ── markers for titles (top tokens, lowercase; fleet convention) ────────
const STOP = new Set(
  ("function return typeof undefined object string number boolean prototype length value default " +
    "exports import this that with from then else case break continue delete instanceof constructor " +
    "arguments void null true false call apply name type text target window document globalthis self " +
    "require module async await yield static class const let var new for while switch throw try catch " +
    "finally extends super using debugger of in do if has own hasown get set")
    .split(" ")
    .filter(Boolean),
);
function markers(text, n = 2) {
  const code = text.replace(/`[^`]*`|"[^"\n]*"|'[^'\n]*'/g, " ");
  const counts = new Map();
  for (const m of code.matchAll(/[A-Za-z][A-Za-z0-9_]{2,}/g)) {
    const w = m[0].toLowerCase();
    if (STOP.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
}
const markerText = (ms) => ms.map(([w, c]) => `${w}(${c})`).join(", ");

// ── windowize: cut only at statement starts; ≤350 lines, a single ───────
// ── oversized declaration is a window of its own ────────────────────────
function windowize(stmts) {
  const out = [];
  let cur = null;
  for (const s of stmts) {
    if (!cur) {
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
      continue;
    }
    const projected = s.endLine - cur.startLine + 1;
    if (projected > MAX_WINDOW) {
      out.push(cur);
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
    } else {
      cur.last = s;
      cur.count++;
      cur.endLine = s.endLine;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// ── inline block scan (byte-exact, over the raw entry buffer) ───────────
function scanBlocks(buf) {
  const blocks = [];
  for (const [open, close, kind] of [
    ["<script", "</script", "script"],
    ["<style", "</style", "style"],
  ]) {
    let p = 0;
    let n = 0;
    while (true) {
      const i = buf.indexOf(open, p);
      if (i < 0) break;
      const after = buf[i + open.length];
      const boundary =
        after === 0x3e || after === 0x2f || after === 0x20 || after === 0x09 || after === 0x0a || after === 0x0d;
      if (!boundary) {
        p = i + open.length;
        continue;
      }
      const tagEnd = buf.indexOf(">", i);
      if (tagEnd < 0) break;
      const j = buf.indexOf(close, tagEnd + 1);
      if (j < 0) throw new Error(`unterminated <${kind}> opened at byte ${i}`);
      const tag = buf.subarray(i, tagEnd + 1).toString("utf8");
      const external = /\bsrc\s*=\s*["']/i.test(tag);
      if (external) {
        blocks.push({ kind, external: true, tag, openStart: i, contentStart: tagEnd + 1, contentEnd: j });
      } else {
        n++;
        const content = buf.subarray(tagEnd + 1, j);
        blocks.push({
          kind: /\btype\s*=\s*["']importmap["']/i.test(tag) ? "importmap" : kind,
          external: false,
          block: n,
          tag,
          openStart: i,
          contentStart: tagEnd + 1,
          contentEnd: j,
          bytes: content.length,
          sha256: sha256(content),
          text: content.toString("utf8"),
        });
      }
      p = j + close.length;
    }
  }
  return blocks.sort((a, b) => a.openStart - b.openStart);
}

// ── file-level vendor classes (wholeFile, never sliced) ─────────────────
const WHOLE_FILE = {
  "__mb__app__worker": {
    title: "__mb__app__worker — mindblown platform PWA service worker (platform machinery, whole-file, never sliced)",
    desc:
      "The mindblown platform's service worker (__mb/app/worker.js: install/activate lifecycle, the platform's " +
      "registration glue) shipped by the host, not the game — platform machinery. Platform rule — indexed " +
      "whole-file in readable/, never sliced.",
    guard: (t) => /addEventListener/.test(t) && /(install|activate|fetch)/.test(t),
    what: "mindblown platform PWA service worker",
  },
};

// ── content-anchored vendor regions inside app.js ───────────────────────
// Each entry: find the statement range by anchors, then guard the claimed text.
function claimAppVendor(rel, tag, stmts, claim) {
  if (tag !== "app") return;
  const idx = (re, from = 0) => stmts.findIndex((s, i) => i >= from && re.test(s.text));
  const idxLast = (re, from, to) => {
    for (let i = Math.min(to, stmts.length - 1); i >= from; i--) if (re.test(stmts[i].text)) return i;
    return -1;
  };
  const iCore = idx(/^var L9,\s+aH,\s+rH,\s+I9,/);
  const iCoreEnd = idx(/ACESFilmicToneMapping: \(\) =>/, iCore + 1);
  const iWebglStart = iCoreEnd + 1;
  const iWebglEnd = idx(/three\.js r\$\{/, iWebglStart);
  const iAddonsStart = iWebglEnd + 1;
  const iBguStart = idx(/function wi\(i, t = !1\)/);
  const iBguEnd = idx(/^function xC\(i, t\)/, iBguStart);
  const iAddonsEnd = idxLast(/b9H79Tebbbe/, iAddonsStart, iBguStart - 1);
  const iGltfStart = idx(/setDRACOLoader\(/);
  const iWgsl = idx(/fn crH\(p: vec2f\)/);
  const iGltfEnd = iWgsl - 1;
  const region = (a, b) => stmts.slice(a, b + 1).map((s) => s.text).join("\n");
  const need = (cond, why) => {
    if (!cond) throw new Error(`${rel}: vendor anchor failed — ${why}`);
  };
  need(iCore > 0, "three.js core module anchor (`var L9, aH, rH, I9,`) not found");
  need(iCoreEnd > iCore, "three.js core export table anchor (ACESFilmicToneMapping) not found after the core module");
  need(iWebglEnd > iWebglStart, "three.js WebGLRenderer module anchor (`three.js r${...}`) not found");
  need(iAddonsEnd > iAddonsStart, "three.js addon bundle anchor (MeshoptSimplifier) not found");
  need(iBguStart > 0 && iBguEnd > iBguStart, "BufferGeometryUtils anchors not found");
  need(iGltfStart > 0 && iWgsl > iGltfStart, "GLTFLoader anchors not found");
  need(iBguStart > iAddonsEnd && iBguEnd < iGltfStart, "vendor regions are not in the expected order");
  need(iCore - 1 >= 0 && !/^\s*$/.test(stmts[iCore - 1].text), "prelude statement before the core module missing");
  need(/^var xm = `/.test(stmts[iWgsl].text), "app WGSL resume anchor (`var xm = ...fn crH`) not found after GLTFLoader");

  const guards = [
    ["three-core", [/(L9 = "186")/, /window\.__THREE__/, /isShaderMaterial/, /ACESFilmicToneMapping/]],
    ["three-webgl", [/isWebGLRenderer/, /WEBGL_multisampled_render_to_texture/, /three\.js r\$\{/]],
    ["three-addons", [/name: "CopyShader"/, /EffectComposer: \(\) => XA/, /MeshoptSimplifier: \(\) => act/, /b9H79Tebbbe/]],
    ["three-buffergeometry", [/THREE\.BufferGeometryUtils/, /function wi\(i, t = !1\)/, /mergeAttributes|toTrianglesDrawMode|toNonIndexed/]],
    ["three-gltfloader", [/setDRACOLoader\(/, /KHR_BINARY_GLTF/, /THREE\.GLTFLoader/, /setKTX2Loader\(/]],
  ];
  const claims = [
    ["three-core", iCore, iCoreEnd, "three.js r186 core module (three.core.js) + its export table"],
    ["three-webgl", iWebglStart, iWebglEnd, "three.js r186 WebGLRenderer module (three.module.js) + its WebGL internals"],
    ["three-addons", iAddonsStart, iAddonsEnd, "three.js addon bundle (CopyShader, shader passes, EffectComposer, MeshoptSimplifier)"],
    ["three-buffergeometry", iBguStart, iBguEnd, "three.js BufferGeometryUtils fragment (mergeGeometries/mergeAttributes/toTrianglesDrawMode)"],
    ["three-gltfloader", iGltfStart, iGltfEnd, "three.js GLTFLoader module (parser, extensions, DRACO/KTX2/Meshopt hooks)"],
  ];
  for (const [name, a, b, what] of claims) {
    const text = region(a, b);
    const [, res] = guards.find(([n]) => n === name);
    for (const re of res)
      need(re.test(text), `${name} guard failed (${re}) — readable changed shape`);
    claim(a, b, {
      kind: "whole",
      file: `app-${name}-vendor.js`,
      title: `app — ${what} (vendor region, whole-file, never sliced)`,
      body:
        `the ${what} merged into the app.js bundle by the build — third-party three.js code ` +
        `(MIT, not app code), content-anchored between app statements and guarded. Vendor rule — indexed ` +
        `whole-file in readable/, never sliced or rewritten.`,
    });
  }
}

async function main() {
  const { mod: prettier, at } = await loadPrettier();
  console.log(`pinned prettier ${PINNED} (${at})`);

  const manifest = JSON.parse(fs.readFileSync(path.join(proj, ".upstream", "manifest.json"), "utf8"));
  const captured = Object.keys(manifest.files).map((r) => r.split(path.sep).join("/")).sort();
  const captureBytes = (rel) => {
    const abs = path.join(proj, rel);
    if (!fs.existsSync(abs)) throw new Error(`capture file missing: ${rel}`);
    const buf = fs.readFileSync(abs);
    if (sha256(buf) !== manifest.files[rel].sha256)
      throw new Error(`${rel} on disk does not match .upstream/manifest.json — re-verify the capture first`);
    return buf;
  };

  const readableDir = path.join(proj, "readable");
  const srcDir = path.join(proj, "src");
  fs.mkdirSync(readableDir, { recursive: true });
  fs.mkdirSync(srcDir, { recursive: true });
  const written = { readable: new Set(), src: new Set() };

  const sources = [];
  const sections = [];
  const notRendered = [];
  let inlineFiles = [];
  let slicedTotal = 0;
  let skippedTotal = 0;

  const jsRelsAll = captured.filter((r) => /\.js$/i.test(r));
  const cssRels = captured.filter((r) => /\.css$/i.test(r));
  const htmlRels = captured.filter((r) => /\.html$/i.test(r));
  // reading order: the entry bundle first, then the page's first script, the
  // workers, the platform worker — a reading order, not a build order
  const rank = (rel) =>
    rel === "app.js" ? 0 : rel === "boot.js" ? 1 : /^workers\//.test(rel) ? 2 : 3;
  const jsRels = jsRelsAll.slice().sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  // non-code payloads ride along in the manifest but are never rendered
  for (const rel of captured) {
    if (/\.(js|css|html)$/i.test(rel)) continue;
    const buf = captureBytes(rel);
    notRendered.push({
      capture: rel,
      kind: "payload",
      bytes: buf.length,
      sha256: sha256(buf),
      rendered: false,
      reason: "non-code payload — recorded with bytes + sha256, no pretty/slice pass",
    });
  }

  // ── 1) JS: vendor -> wholeFile; app -> statement-aligned slices ─────────
  for (const rel of jsRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    if (!Buffer.from(text, "utf8").equals(buf)) throw new Error(`${rel} does not round-trip through utf8`);
    const pretty = await formatOnce(prettier, text, "babel");
    if (pretty === text)
      throw new Error(`${rel}: prettier output is byte-identical to the capture — nothing to derive`);
    const sourceFile = prettyRelFor(rel);
    fs.writeFileSync(path.join(proj, sourceFile), pretty);
    written.readable.add(path.basename(sourceFile));
    const lines = linesOf(pretty);
    const tag = tagOf(rel);
    const cls = WHOLE_FILE[tag];

    if (cls) {
      const region = pretty;
      if (cls.guard && !cls.guard(region))
        throw new Error(`${rel}: whole-file guard failed — readable changed shape`);
      sections.push({
        file: `${tag}-vendor.js`,
        wholeFile: true,
        title: cls.title,
        desc: `Lines 1-${lines.length} of ${sourceFile}: ${cls.desc}`,
        note: "whole-file (vendor rule): indexed in readable/, never sliced",
        startLine: 1,
        endLine: lines.length,
        sourceFile,
      });
      sources.push({
        sourceFile,
        capture: rel,
        captureKind: "file",
        captureSha256: manifest.files[rel].sha256,
        captureBytes: buf.length,
        prettyLines: lines.length,
        prettyBytes: Buffer.byteLength(pretty, "utf8"),
        tag,
        slices: 0,
        derived: "readable only (vendor bundle, wholeFile)",
        what: cls.what,
      });
      console.log(`derive: ${rel} -> ${sourceFile} (${lines.length} lines, wholeFile vendor)`);
      continue;
    }

    // ── app chunk: statement-aligned slicing ────────────────────────────
    const dbg = await prettier.__debug.parse(pretty, { parser: "babel" });
    const top = (dbg.ast.program || dbg.ast).body;
    const stmts = top.map((n) => ({
      node: n,
      startLine: lineOf(pretty, n.start),
      endLine: lineOf(pretty, n.end),
      text: pretty.slice(n.start, n.end),
    }));
    for (let i = 1; i < stmts.length; i++)
      if (stmts[i].startLine <= stmts[i - 1].endLine)
        throw new Error(`${rel}: statements ${i - 1}/${i} share a line — cannot slice at line boundaries`);

    const specials = [];
    const covered = new Array(stmts.length).fill(false);
    const claim = (a, b, block) => {
      if (a < 0 || b < a || b >= stmts.length) throw new Error(`${rel}: bad ${block.file} range ${a}-${b}`);
      for (let i = a; i <= b; i++) {
        if (covered[i]) throw new Error(`${rel}: ${block.file} overlaps another block at statement ${i}`);
        covered[i] = true;
      }
      specials.push({ ...block, A: stmts[a].startLine, B: stmts[b].endLine });
    };

    claimAppVendor(rel, tag, stmts, claim);

    // a FINAL bare `export {…}` table would be skipped here (non-standalone
    // tail); the teleoperator bundle ends with a function declaration, so in
    // practice exportSkip stays null.
    let exportSkip = null;
    const lastStmt = stmts[stmts.length - 1];
    if (
      lastStmt &&
      lastStmt.node.type === "ExportNamedDeclaration" &&
      !covered[stmts.length - 1] &&
      /^export\s*\{[\s\S]*\}\s*;?$/.test(lastStmt.text.trim()) &&
      !/\bfrom\b/.test(lastStmt.text)
    ) {
      claim(stmts.length - 1, stmts.length - 1, {
        kind: "skip",
        file: `${tag}-tail-export.js`,
        title: `${tag} — final export table (not sliced)`,
        desc: `Lines ${lastStmt.startLine}-${lastStmt.endLine}. The chunk's final export {…} table — the exported bindings live in the earlier slices; a standalone tail carries no new statements, so it is indexed only.`,
      });
      exportSkip = true;
    }

    // runs of uncovered statements -> windows
    const runs = [];
    for (let i = 0; i < stmts.length; i++) {
      if (covered[i]) continue;
      const run = [stmts[i]];
      while (i + 1 < stmts.length && !covered[i + 1]) run.push(stmts[++i]);
      runs.push(run);
    }
    const slices = [];
    for (const run of runs) for (const w of windowize(run)) slices.push(w);

    // blocks in line order, then re-tile so every line of the pretty is owned
    const blocks = [...specials, ...slices.map((w) => ({ kind: "slice", A: w.startLine, B: w.endLine, count: w.count }))];
    blocks.sort((a, b) => a.A - b.A);
    for (let i = 0; i < blocks.length; i++) {
      if (i === 0) blocks[i].A = 1;
      if (i + 1 < blocks.length) blocks[i].B = blocks[i + 1].A - 1;
      else blocks[i].B = lines.length;
    }

    let nn = 0;
    let perFileSkipped = 0;
    let perFileVendor = 0;
    for (const b of blocks) {
      if (b.kind === "slice") {
        nn++;
        const num = String(nn).padStart(2, "0");
        const body = lines.slice(b.A - 1, b.B).join("\n") + "\n";
        const ms = markers(body);
        const topWord = ms.length ? ms[0][0] : /^\s*import\b/.test(body) ? "imports" : tag.toLowerCase();
        const oversized = b.count === 1 && b.B - b.A + 1 > MAX_WINDOW;
        const file = `${tag}-${num}.js`;
        const sliceText =
          `// ${tag} ${num} — ${topWord}\n` +
          `// Lines ${b.A}-${b.B} of ${sourceFile} (statement-aligned).\n` +
          body;
        const chk = parses(sliceText);
        if (!chk.ok) throw new Error(`generated src/${file} does not parse standalone: ${chk.why}`);
        fs.writeFileSync(path.join(srcDir, file), sliceText);
        written.src.add(file);
        sections.push({
          file,
          title: `${tag} ${num} — ${topWord}`,
          desc: `${oversized ? "Oversized single declaration (kept whole). " : ""}Lines ${b.A}-${b.B}. Markers: ${markerText(ms)}.`,
          startLine: b.A,
          endLine: b.B,
          sourceFile,
        });
      } else if (b.kind === "whole") {
        perFileVendor++;
        sections.push({
          file: b.file,
          wholeFile: true,
          title: b.title,
          desc: `Lines ${b.A}-${b.B} of ${sourceFile}: ${b.body}`,
          note: "whole-file region (vendor rule): indexed in readable/, never sliced",
          startLine: b.A,
          endLine: b.B,
          sourceFile,
        });
      } else {
        perFileSkipped++;
        sections.push({
          file: b.file,
          skipped: true,
          title: b.title,
          desc: b.desc,
          startLine: b.A,
          endLine: b.B,
          sourceFile,
          firstLine: lines[b.A - 1],
          lastLine: lines[b.B - 1],
        });
      }
    }
    slicedTotal += nn;
    skippedTotal += perFileSkipped;
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyPasses: 1,
      idempotent: true,
      tag,
      slices: nn,
      derived:
        `readable + ${nn} statement-aligned slice(s)` +
        (perFileVendor ? ` + ${perFileVendor} wholeFile region(s)` : "") +
        (perFileSkipped ? ` + ${perFileSkipped} skipped section(s)` : ""),
    });
    console.log(
      `derive: ${rel} -> ${sourceFile} (${lines.length} lines, ${nn} slices, ${perFileVendor} wholeFile, ${perFileSkipped} skipped)`,
    );
  }

  // ── 2) CSS: readable pretty, wholeFile section (stylesheet rule) ────────
  for (const rel of cssRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    const pretty = await formatOnce(prettier, text, "css");
    if (pretty === text) throw new Error(`${rel}: prettier output is byte-identical to the capture`);
    const sourceFile = prettyRelFor(rel);
    fs.writeFileSync(path.join(proj, sourceFile), pretty);
    written.readable.add(path.basename(sourceFile));
    const lines = linesOf(pretty);
    const tag = tagOf(rel);
    sections.push({
      file: `${tag}.css`,
      wholeFile: true,
      title: `${tag} — stylesheet (whole-file, never sliced)`,
      desc: `Lines 1-${lines.length} of ${sourceFile}. Whole-file (stylesheet rule): the capture stylesheet is indexed whole in readable/, never sliced.`,
      note: "whole-file (stylesheet, not sliced): CSS is indexed whole in readable/",
      startLine: 1,
      endLine: lines.length,
      sourceFile,
    });
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyPasses: 1,
      idempotent: true,
      tag,
      slices: 0,
      derived: "readable only (stylesheet, wholeFile)",
    });
    console.log(`derive: ${rel} -> ${sourceFile} (${lines.length} lines, wholeFile stylesheet)`);
  }

  // ── 3) HTML documents: inline <script>/<style> scan + twins + map ──────
  const inlineMap = { capture: htmlRels.length === 1 ? htmlRels[0] : htmlRels, generated: TODAY, note: "", blocks: [] };
  for (const rel of htmlRels) {
    const buf = captureBytes(rel);
    const blocks = scanBlocks(buf);
    const inline = blocks.filter((b) => !b.external);
    const external = blocks.filter((b) => b.external);
    inlineFiles.push(rel);
    for (const b of external)
      console.log(`derive: ${rel}: external ${b.kind} (not derived): ${b.tag.slice(0, 90)}`);
    if (!inline.length) {
      console.log(`derive: ${rel}: no inline <script>/<style> content blocks — no inline twins`);
      continue;
    }
    const entryTag = rel.replace(/\.html$/i, "").split("/").join("__");
    for (const b of inline) {
      const isImportmap = b.kind === "importmap";
      const parser = isImportmap ? "json" : b.kind === "style" ? "css" : "babel";
      const DATA_TYPES = new Set(["application/ld+json", "application/json", "importmap", "speculationrules"]);
      const type = (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(b.tag)?.[1] ?? "").toLowerCase();
      if (parser === "script" && DATA_TYPES.has(type)) {
        notRendered.push({
          capture: rel,
          kind: "inline-data",
          type,
          byteStart: b.contentStart,
          byteEnd: b.contentEnd,
          bytes: b.bytes,
          sha256: b.sha256,
          rendered: false,
          reason: `typed data block (<script type="${type}">) — data, not JS/CSS; recorded with range + sha256, no pretty pass`,
        });
        continue;
      }
      const tag = `${entryTag}-inline-${b.block}`;
      const prettyFile = `${tag}.pretty.${isImportmap ? "json" : b.kind === "style" ? "css" : "js"}`;
      const pretty = await formatOnce(prettier, b.text, parser);
      if (pretty === b.text)
        throw new Error(`readable/${prettyFile} would be byte-identical to its capture source`);
      fs.writeFileSync(path.join(readableDir, prettyFile), pretty);
      written.readable.add(prettyFile);
      const lines = linesOf(pretty);
      const prettyBuf = Buffer.from(pretty, "utf8");
      const secFile = `${tag}.${isImportmap ? "json" : b.kind === "style" ? "css" : "js"}`;
      sections.push({
        file: secFile,
        wholeFile: true,
        title: `${tag} — inline ${b.kind} block (whole-file, never sliced)`,
        desc: `Lines 1-${lines.length} of readable/${prettyFile}. Whole-file: the captured document's inline ${b.kind} block (${b.bytes} B at bytes ${b.contentStart}-${b.contentEnd} of ${rel}) is indexed whole and never sliced.`,
        note: `whole-file (entry inline ${b.kind} block, not sliced)`,
        startLine: 1,
        endLine: lines.length,
        sourceFile: `readable/${prettyFile}`,
      });
      sources.push({
        sourceFile: `readable/${prettyFile}`,
        capture: rel,
        captureKind: `inline-${b.kind}`,
        captureByteStart: b.contentStart,
        captureByteEnd: b.contentEnd,
        captureSha256: b.sha256,
        captureBytes: b.bytes,
        prettyLines: lines.length,
        prettyBytes: prettyBuf.length,
        prettySha256: sha256(prettyBuf),
        tag,
        slices: 0,
        derived: "readable only (inline block, wholeFile)",
      });
      inlineMap.blocks.push({
        file: `readable/${prettyFile}`,
        source: rel,
        section: secFile,
        kind: b.kind,
        block: b.block,
        byteStart: b.contentStart,
        byteEnd: b.contentEnd,
        bytes: b.bytes,
        sha256: b.sha256,
      });
    }
  }
  if (inlineMap.blocks.length) {
    inlineMap.note =
      "byte ranges + sha256 of every inline <script>/<style> content block in the captured HTML " +
      "documents; twins are the prettified (prettier 3.9.6, module API) renderings and are never shipped " +
      "to a browser.";
    fs.writeFileSync(path.join(readableDir, "index-inline-map.json"), JSON.stringify(inlineMap, null, 2) + "\n");
  }

  // ── 4) prune orphan derived files (capture untouched) ──────────────────
  let pruned = 0;
  for (const [dir, keep, exts] of [
    [readableDir, written.readable, /\.(pretty\.js|pretty\.css)$/],
    [srcDir, written.src, /\.js$/],
  ]) {
    for (const f of fs.readdirSync(dir)) {
      if (exts.test(f) && !keep.has(f)) {
        fs.rmSync(path.join(dir, f));
        pruned++;
        console.log(`derive: pruned orphan derived file ${path.join(path.basename(dir), f)}`);
      }
    }
  }

  // ── 5) split-spec.json (2-space indent + trailing newline) ─────────────
  const appJs = sources.filter((s) => s.derived.startsWith("readable +"));
  const vendorJsS = sources.filter((s) => /wholeFile\)$/.test(s.derived) && s.capture.endsWith(".js"));
  const cssSources = sources.filter((s) => s.sourceFile.endsWith(".pretty.css") && s.captureKind === "file");
  const spec = {
    project: "teleoperator",
    kind: "statement-aligned-slices",
    defaultFile: `src/${sections.find((s) => !s.wholeFile && !s.skipped).file}`,
    note:
      "TELEOPERATOR (https://mindblown.ai/games/teleoperator) is capture-class: the game is served by its " +
      "own host https://teleoperator.mindblown.ai (the discovery page embeds it as a cross-origin iframe " +
      "with /?mb=game) as a WebGPU driving game over real San Francisco — a single-file production bundle " +
      "(app.js, 4.0 MB) plus boot.js, four web workers, a platform PWA worker and a stylesheet. §0.4 " +
      "fork-over-mirror was checked on 2026-10-13 — the capture references no public source repository " +
      "(no github.com/gitlab.com references in the page or its JS; the credits name the studio, not a " +
      "repo), so the mirror stands. Derived pipeline: capture → pinned prettier 3.9.6 (module API, default " +
      "options, single pass verified idempotent — never the CLI: it respects .gitignore and can silently " +
      "echo its input) → readable/<name>.pretty.js|css per captured JS/CSS file (capture-root-relative " +
      "name, dirs flattened with __; every pretty provably NOT byte-identical to its capture source) → " +
      "statement-aligned slices src/<name>-NN.js of the app code (top-level declaration boundaries only, " +
      "~250-350 line windows; oversized single declarations stay whole) with an exact 2-line provenance " +
      "header. Every slice parses standalone under `node --input-type=module --check -` and round-trips " +
      "byte-exact to its recorded readable line range. Vendor rule — wholeFile sections, never sliced: " +
      "the three.js r186 regions merged into app.js (the core module + its export table, the WebGLRenderer " +
      "module, the addon bundle with CopyShader/EffectComposer/MeshoptSimplifier, the BufferGeometryUtils " +
      "fragment, the GLTFLoader module) — content-anchored, guarded and asserted; and the platform's PWA " +
      "worker __mb/app/worker.js (platform machinery). Stylesheet rule — style.css is wholeFile. Inline " +
      "scan: index.html (3 inline platform shims), shell.html and shell-index.html (5 inline scripts + 2 " +
      "inline styles each) → readable/<doc>-inline-N.pretty.{js,css} twins recorded in " +
      "readable/index-inline-map.json with byte ranges + sha256. Identifiers in src/ are the bundle's own " +
      "minified names — the rename campaign (PLAN §5) is recorded as an open task in README.md, not " +
      "claimed here. Capture bytes are untouched by everything above; re-cut with `node tools/derive.mjs` " +
      "after any capture refresh. `node tools/audit.js` is the gate.",
    renderOptions: {
      _default:
        "prettier 3.9.6, module API, default options, single pass (re-format verified idempotent at derive time) — never the CLI: it respects .gitignore and can silently echo its input",
      js: "parser babel, no plugins",
      css: "parser css, no plugins",
      json: "parser json, no plugins (inline importmap blocks, if any)",
    },
    source:
      `readable/: ${sources.filter((s) => s.sourceFile?.endsWith(".pretty.js")).length} JS pretties ` +
      `(${appJs.length} app file(s) sliced, ${vendorJsS.length} vendor wholeFile) + ` +
      `${cssSources.length} CSS pretties + ${inlineMap.blocks.length} inline block twin(s); ` +
      `src/: ${appJs.reduce((n, s) => n + s.slices, 0)} statement-aligned slices across ${appJs.length} app file(s); ` +
      `${sections.filter((s) => s.skipped).length} skipped section(s); ` +
      `${sections.filter((s) => s.wholeFile).length} wholeFile section(s); ` +
      `capture: ${captured.length} files under .upstream/manifest.json; inline scan: ${inlineFiles.join(", ")} ` +
      `(${inlineMap.blocks.length} inline content blocks); notRendered: ${notRendered.length} payload(s).`,
    inline: {
      scanned: inlineFiles,
      contentBlocks: inlineMap.blocks.length,
      notRendered: notRendered.length,
      note: inlineMap.blocks.length
        ? "inline content blocks exist — prettified into readable/<doc>-inline-N.pretty.{js,css} twins and recorded in readable/index-inline-map.json (byte ranges + sha256)."
        : "no inline <script>/<style> content blocks in the captured documents.",
    },
    sources,
    sections,
    notRendered,
  };
  fs.writeFileSync(path.join(proj, "split-spec.json"), JSON.stringify(spec, null, 2) + "\n");

  // ── 6) self-check (tools/audit.js is the authoritative gate) ────────────
  let bad = 0;
  const bySource = new Map();
  for (const s of sections) {
    if (!bySource.has(s.sourceFile)) bySource.set(s.sourceFile, []);
    bySource.get(s.sourceFile).push(s);
  }
  for (const [sourceFile, list] of bySource) {
    const lines = readLines(path.join(proj, sourceFile));
    const sorted = [...list].sort((a, b) => a.startLine - b.startLine);
    if (sorted[0].startLine !== 1) {
      console.error(`TILING FAIL ${sourceFile}: starts at line ${sorted[0].startLine}`);
      bad++;
    }
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i].startLine !== sorted[i - 1].endLine + 1) {
        console.error(`TILING FAIL ${sourceFile}: gap/overlap at ${sorted[i].file}`);
        bad++;
      }
    if (sorted[sorted.length - 1].endLine !== lines.length) {
      console.error(`TILING FAIL ${sourceFile}: does not reach EOF (${lines.length})`);
      bad++;
    }
  }
  let parsed = 0;
  let ranged = 0;
  let roundOK = 0;
  for (const s of sections) {
    if (s.wholeFile || s.skipped) continue;
    ranged++;
    const abs = path.join(srcDir, s.file);
    const text = fs.readFileSync(abs, "utf8");
    const nl2 = text.indexOf("\n", text.indexOf("\n") + 1);
    const body = text.slice(nl2 + 1);
    const expected = readLines(path.join(proj, s.sourceFile)).slice(s.startLine - 1, s.endLine).join("\n") + "\n";
    if (body !== expected) {
      console.error(`ROUND-TRIP FAIL ${s.file}`);
      bad++;
    } else roundOK++;
    if (!parses(text).ok) {
      console.error(`PARSE FAIL src/${s.file}`);
      bad++;
    } else parsed++;
  }
  let prettyParsed = 0;
  for (const s of sources) {
    if (!s.sourceFile?.endsWith(".pretty.js")) continue;
    if (!parses(fs.readFileSync(path.join(proj, s.sourceFile), "utf8")).ok) {
      console.error(`PARSE FAIL ${s.sourceFile}`);
      bad++;
    } else prettyParsed++;
  }
  console.log(
    `derive: ${written.readable.size} readable file(s), ${written.src.size} src slices ` +
      `(${parsed}/${ranged} parse standalone, ${roundOK}/${ranged} round-trip byte-exact), ` +
      `${skippedTotal} skipped, ${sections.filter((s) => s.wholeFile).length} wholeFile, ` +
      `${prettyParsed} pretty js parse clean, ${notRendered.length} notRendered, ${pruned} orphan(s) pruned — ` +
      `self-check ${bad ? bad + " FAILURE(S)" : "clean"}`,
  );
  if (bad) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
