// app 114 — tofixed
// Lines 83329-83578 of readable/app.pretty.js (statement-aligned).
var Ww = {};
Kh(Ww, {
  CLEAR: () => HL,
  NAME: () => bxt,
  NAMED: () => DL,
  RESERVE: () => xxt,
  SKY_MATS: () => Vw,
  build: () => vxt,
  buildReal: () => kxt,
  realClaims: () => Sxt,
});
await No();
var WP = On("local"),
  pw = WP
    ? [
        [-3615, 2115, 90, 80, 0],
        [-2121, 1786, 85, 50, 1.414],
        [-3860, -1290, 300, 160, 0.03],
        [-2955, 3960, 110, 200, 1.5708],
        [-4620, 2560, 450, 50, -0.05],
        [-1255, -470, 70, 70, 0],
      ]
    : [[1e7, 1e7, 1, 1, 0]],
  mw = `
fn sfLwH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn sfLwN(p: vec2f) -> f32 { let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(sfLwH(i), sfLwH(i + vec2f(1.0, 0.0)), u.x), mix(sfLwH(i + vec2f(0.0, 1.0)), sfLwH(i + vec2f(1.0, 1.0)), u.x), u.y); }
const SF_LAWNS = array<vec4f, ${pw.length}>(${pw.map(([o, t, e, s]) => `vec4f(${o.toFixed(1)}, ${t.toFixed(1)}, ${e.toFixed(1)}, ${s.toFixed(1)})`).join(", ")});
const SF_LAWNA = array<vec2f, ${pw.length}>(${pw.map((o) => `vec2f(${Math.cos(o[4]).toFixed(5)}, ${Math.sin(o[4]).toFixed(5)})`).join(", ")});
// c: the lawn's albedo (linear), wp: the point -> the mowed lawn's
fn sfLawn(c0: vec3f, wp: vec3f) -> vec3f {
  let p = wp.xz; let d = length(F.camPos.xyz - wp); var c = c0;
  let fine = 1.0 - smoothstep(5.0, 28.0, d);
  if (fine > 0.0) {
    let n = sfLwN(p * 9.3) * 0.55 + sfLwN(p * 23.7 + 4.1) * 0.45;
    c *= 1.0 + (n - 0.5) * 0.3 * fine;
    let cl = sfLwN(p * 1.7 + 2.3); c = mix(c, c * vec3f(0.86, 1.0, 0.84), smoothstep(0.62, 0.8, cl) * fine * 0.8);   // (clover, thicker grass)
  }
  let m = sfLwN(p / 60.0 + 3.1); let m2 = sfLwN(p / 15.0 + 7.7);
  c *= mix(vec3f(0.9, 0.98, 0.88), vec3f(1.06, 1.03, 0.9), m) * (0.92 + 0.16 * m2);
  // the formal lawns: which (if any), the axis
  var ax = vec2f(0.0); var inF = 0.0;
  for (var k = 0; k < ${pw.length}; k++) {
    let L = SF_LAWNS[k]; let a = SF_LAWNA[k]; let q = p - L.xy;
    let u = dot(q, a); let v = dot(q, vec2f(-a.y, a.x));
    if (abs(u) < L.z && abs(v) < L.w) { ax = a; inF = 1.0; }
  }
  if (inF > 0.0) {
    let across = dot(p, vec2f(-ax.y, ax.x)) / 1.5;
    let fw = d * 0.0016 / max(abs(F.camPos.y - wp.y) / max(d, 1e-3), 0.06) / 1.5;   // (a band's pixel footprint from the distance and the view's slant: no derivatives in this non-uniform branch)
    let band = clamp((abs(fract(across * 0.5) * 2.0 - 1.0) - 0.5) / fw + 0.5, 0.0, 1.0) * 2.0 - 1.0;   // (+-1, anti-aliased)
    let vd = normalize((F.camPos.xyz - wp).xz + vec2f(1e-4));
    let k = band * dot(vd, ax) * (1.0 - smoothstep(0.35, 0.9, fw));   // (sub-pixel bands: none)
    c *= 1.0 + 0.14 * k;   // (veg49: 0.3 -> 0.14 - Dolores Park's stripes read as painted bands)
    // the desire lines: thin ridges of a broad noise, broken up by another
    let w = 1.0 - smoothstep(0.0, 0.025 + 0.02 * (1.0 - fine), abs(sfLwN(p / 38.0 + 11.0) - 0.5));
    let wear = w * smoothstep(0.45, 0.6, sfLwN(p / 90.0 + 5.0)) * (0.55 + 0.45 * sfLwN(p * 2.1));
    c = mix(c, vec3f(0.115, 0.09, 0.06) * (0.8 + 0.4 * sfLwN(p * 6.0)), wear * 0.7);
  }
  return c;
}
// (veg49) a lawn's turf (hq): ~25 m and ~7 m patches lusher (deeper, cooler) or thinner (paler, straw), clumps of ~0.3-1 m
// (darker hearts: the shade between the blades), thin scuffed spots with the soil showing; p: world x, z, d: the distance
fn sfTurf(c0: vec3f, p: vec2f, d: f32, dry: f32) -> vec3f {
  var c = c0;
  let a = sfLwN(p * 0.043 + 1.9) * 0.55 + sfLwN(p * 0.14 + 4.4) * 0.3 + sfLwN(p * 0.5 + 8.2) * 0.15;
  let lush = smoothstep(0.3, 0.72, a);
  c *= mix(vec3f(1.1, 1.04, 0.78), vec3f(0.78, 0.9, 0.82), lush);
  let fc = 1.0 - smoothstep(16.0, 45.0, d);
  let k = sfLwN(p * 1.4 + 7.1) * 0.55 + sfLwN(p * 3.9 + 2.2) * 0.45;
  c *= 1.0 + (k - 0.5) * 0.42 * fc;
  let th = smoothstep(0.7, 0.92, sfLwN(p * 0.27 + 3.3) * 0.65 + sfLwN(p * 2.1 + 0.4) * 0.35) * (1.0 - dry) * (1.0 - lush * 0.7);
  c = mix(c, vec3f(0.15, 0.115, 0.075) * (0.75 + 0.5 * k), th * 0.4);
  return c;
}
`,
  qP = (o = 0, t = o === 0) =>
    mw +
    `
const SF_CARPET = ${o.toFixed(1)};
const SF_HQ = ${t ? "true" : "false"};
const SF_FARST = vec3f(0.62, 0.6, 0.58);   // the far streets' asphalt tint (matched to the road meshes' at the radius they end)
fn gH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn gN(p: vec2f) -> f32 { let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(gH(i), gH(i + vec2f(1.0, 0.0)), u.x), mix(gH(i + vec2f(0.0, 1.0)), gH(i + vec2f(1.0, 1.0)), u.x), u.y); }
// one cell of a 2 x 2 atlas, tiled (the gradients of the unwrapped uv: no seam at the wrap)
fn gCell(t: texture_2d<f32>, uv: vec2f, cell: i32, dx: vec2f, dy: vec2f) -> vec4f {
  let c = vec2f(f32(cell & 1), f32(cell >> 1));
  return textureSampleGrad(t, matSamp, (c + 0.003 + fract(uv) * 0.994) * 0.5, dx * 0.497, dy * 0.497);
}
const R30 = mat2x2f(0.866, 0.5, -0.5, 0.866);
struct GS { c: vec3f, n: vec2f, h: f32 };
// a surface at two scales (tile metres s, the second 2.6x larger and rotated), blended by a noise
// (dx, dy: the uv's screen derivatives, taken in uniform control flow)
fn gSurf(atl: texture_2d<f32>, nrm: texture_2d<f32>, cell: i32, uv: vec2f, dx: vec2f, dy: vec2f, s: f32, k: f32, near: f32) -> GS {
  let u1 = uv / s; let u2 = R30 * uv / (s * 2.6) + 0.37;
  let d1x = dx / s; let d1y = dy / s; let d2x = R30 * dx / (s * 2.6); let d2y = R30 * dy / (s * 2.6);
  var o: GS; o.c = vec3f(0.0);   // (each scale sampled only where it shows)
  if (k < 0.995) { o.c = gCell(atl, u1, cell, d1x, d1y).rgb * (1.0 - k); }
  if (k > 0.005) { o.c += gCell(atl, u2, cell, d2x, d2y).rgb * k; }
  if (near > 0.01) { let na = gCell(nrm, u1, cell, d1x, d1y); o.n = (na.rg * 2.0 - 1.0) * near; o.h = na.b; } else { o.n = vec2f(0.0); o.h = 0.5; }
  return o;
}
// a paving (the material code: 0 concrete, 1 brick, 2 granite, 3 decomposed granite, 4 asphalt, 5 mulch), graded to SF's
// weathered tones (the photos are clean and bright)
struct GHd { c: vec3f, n: vec2f, h: f32, r: f32 };
fn gHard(m: i32, uv: vec2f, dx: vec2f, dy: vec2f, kb: f32, near: f32) -> GHd {
  var S: GS; var o: GHd;
  if (m == 3) { S = gSurf(matMap, matDetail, 3, uv, dx, dy, 3.0, kb, near); o.r = 0.95; S.c *= vec3f(0.85, 0.82, 0.78); }
  else if (m >= 5) { S = gSurf(matMap, matDetail, 2, uv, dx, dy, 2.2, kb, near); o.r = 0.97; }
  else if (m == 1) { S = gSurf(matExtra, matLight, 1, uv, dx, dy, 1.6, 0.0, near); o.r = 0.8; let l = dot(S.c, vec3f(0.3, 0.55, 0.15)); S.c = mix(vec3f(l), S.c, 0.7) * vec3f(0.85, 0.8, 0.8); }
  else if (m == 2) { S = gSurf(matExtra, matLight, 2, uv, dx, dy, 3.4, 0.0, near); o.r = 0.72; S.c *= 0.82; }
  else if (m == 4) { S = gSurf(matExtra, matLight, 3, uv, dx, dy, 4.0, kb, near); o.r = 0.9; }
  else { S = gSurf(matExtra, matLight, 0, uv, dx, dy, 3.85, 0.0, near); o.r = 0.86; S.c *= 0.72; }
  o.c = S.c; o.n = S.n; o.h = S.h; return o;
}
// (veg49) the hard / bare ground's wear (hq): the mulch's damp, darker patches and dry chips, the decomposed granite's
// worn centre and pebbly edges, the pavings' grime; m: the material code
fn sfHardVar(m: i32, p: vec2f, d: f32) -> vec3f {
  let a = gN(p * 0.37 + 2.7); let b = gN(p * 1.9 + 5.1); let fc = 1.0 - smoothstep(20.0, 60.0, d);
  if (m >= 5) { return vec3f(mix(0.72, 1.12, a)) * mix(vec3f(1.0), vec3f(1.08, 1.0, 0.9), smoothstep(0.55, 0.8, b) * fc) * (1.0 - 0.18 * smoothstep(0.5, 0.75, gN(p * 6.3)) * fc); }
  if (m == 3) { return vec3f(mix(0.82, 1.08, a)) * (1.0 + (b - 0.5) * 0.18 * fc) * mix(vec3f(1.0), vec3f(0.9, 0.86, 0.82), smoothstep(0.6, 0.85, gN(p * 0.9 + 1.3))); }
  return vec3f(0.92 + 0.14 * a) * (1.0 - 0.12 * smoothstep(0.62, 0.85, b) * fc);
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let dist = length(wp - F.camPos.xyz); let dx = dpdx(uv); let dy = dpdy(uv);
  let fn_ = normalize(cross(dpdx(wp), dpdy(wp)));   // (the face's own slope: cliffs, the sea wall's face)
  let near = 1.0 - smoothstep(25.0, 70.0, dist);   // normal detail fades out
  let n1 = gN(uv * 0.021 + 3.7); let n2 = gN(uv * 0.11 + 9.1); let n3 = gN(uv * 0.53 + 1.3);
  let kb = smoothstep(0.3, 0.7, n2);   // the two scales' blend
  // the mask (0.5 m texels, the chunk's own; far chunks: an empty 1 x 1)
  let mdim = textureDimensions(matEmit);
  let muv = fract(uv / 256.0);
  let mk = textureSampleGrad(matEmit, matSamp, muv, dx / 256.0, dy / 256.0);
  // material codes do not interpolate: the 2 x 2 texels' codes, the two with the most weight blended by it
  let mf = muv * vec2f(mdim) - 0.5; let mi = vec2i(floor(mf)); let fr = mf - floor(mf); let mx = vec2i(mdim) - 1;
  let t00 = textureLoad(matEmit, clamp(mi, vec2i(0), mx), 0); let t10 = textureLoad(matEmit, clamp(mi + vec2i(1, 0), vec2i(0), mx), 0);
  let t01 = textureLoad(matEmit, clamp(mi + vec2i(0, 1), vec2i(0), mx), 0); let t11 = textureLoad(matEmit, clamp(mi + vec2i(1, 1), vec2i(0), mx), 0);
  let c4 = vec4i(i32(round(t00.b * 5.1)), i32(round(t10.b * 5.1)), i32(round(t01.b * 5.1)), i32(round(t11.b * 5.1)));
  let hard4 = vec4f(t00.g, t10.g, t01.g, t11.g) * vec4f((1.0 - fr.x) * (1.0 - fr.y), fr.x * (1.0 - fr.y), (1.0 - fr.x) * fr.y, fr.x * fr.y);
  var hm = -1; var wA = 0.0; var wB2 = 0.0; var hm2 = -1;
  for (var q = 0; q < 4; q++) {
    if (hard4[q] <= 0.0) { continue; }
    if (hm < 0) { hm = c4[q]; }
    if (c4[q] == hm) { wA += hard4[q]; } else { if (hm2 < 0) { hm2 = c4[q]; } wB2 += hard4[q]; }
  }
  if (hm < 0) { hm = c4.x; }
  if (wB2 > wA) { let tq = hm; hm = hm2; hm2 = tq; let tw = wA; wA = wB2; wB2 = tw; }
  let kHard2 = smoothstep(0.3, 0.7, wB2 / max(wA + wB2, 1e-4));   // the second paving's share (0: one material)
  let dryT = t00.b * (1.0 - fr.x) * (1.0 - fr.y) + t10.b * fr.x * (1.0 - fr.y) + t01.b * (1.0 - fr.x) * fr.y + t11.b * fr.x * fr.y;
  var wG = mk.r; var wH = mk.g; var dry = select(dryT, 0.0, mk.g > 0.5);
  var soil = 5;   // bare ground under worn grass: mulch / earth
  var tint = vec3f(1.0); var scrubK = 0.0;
  if (wG + wH < 0.02) {   // no mask: the land-cover class
    let cls = col.a;
    // (between a lawn and a street's corridor the class ramps over the 4 m grid: a soft, broken edge, not a zigzag)
    let pv = smoothstep(0.82, 0.98, cls + (n3 - 0.5) * 0.12);
    // (round 26, qa26: a street's corridor - beyond the road meshes' reach, terrain.js STREET - the asphalt photo, not the
    // lots' concrete darkened: from the hills the far streets read as concrete)
    if (pv > 0.01 && cls > 0.8) { let st = col.r < 0.25; wH = pv; wG = 1.0 - pv; hm = select(0, 4, st); tint = mix(vec3f(1.0), select(col.rgb / 0.36, SF_FARST, st), pv); }   // paved lots (downtown), street corridors
    else if (cls > 0.65) { wG = 0.62 + 0.38 * smoothstep(0.35, 0.65, n2); dry = 0.25; }     // gardens: grass, beds
    else if (cls > 0.4) { wH = 1.0; hm = 3; tint = vec3f(1.25, 1.12, 0.95); }             // sand: the gravel photo, pale
    else if (cls > 0.15) { wG = 0.35 * smoothstep(0.45, 0.8, n2 + 0.3 * n1); dry = 0.8; } // forest floor: litter, dry grass patches
    else { wG = 1.0; dry = select(0.0, 0.35, col.g - col.b < 0.05);                         // lawns (a greyer tint: dry)
      // (round 40) Marin's open hills (city/real/distant.js marinColour): the gold grass dry, the coastal scrub dark green
      if (col.r > col.g * 1.12) { dry = 0.92; } else if (col.g > col.r * 1.25 && col.g < 0.07) { dry = 0.55; scrubK = 1.0; } }
  }
  // grass: the lawn photo, dry in patches (and where the mask says), a macro tint
  dry = clamp(dry + (smoothstep(0.6, 0.9, n1 * 0.7 + n2 * 0.45) * (0.12 + 0.4 * dry)) * (1.0 - wH), 0.0, 1.0);   // (a watered lawn: barely)
  var cG = vec3f(0.0); var nG = vec2f(0.0); var hG = 0.5;
  if (wG > 0.01) {
    let L = gSurf(matMap, matDetail, 0, uv, dx, dy, 2.4, kb, near);
    cG = L.c; nG = L.n; hG = L.h;
    if (dry > 0.15) { let D = gSurf(matMap, matDetail, 1, uv + 17.0, dx, dy, 2.8, kb, near); cG = mix(cG, D.c, dry); nG = mix(nG, D.n, dry); }
    else { cG = mix(cG, cG * vec3f(1.25, 1.1, 0.7), dry * 1.5); }   // (a touch of yellowing: no dry photo needed)
    cG *= mix(vec3f(0.86, 0.92, 0.82), vec3f(1.06, 1.04, 0.94), n1) * (0.9 + 0.2 * n3);
    // SF's lawns: (round 21) the parks' watered lawns greener and fuller than the muted 0.8 (the photos: Alamo Square
    // (160, 170, 45) in the sun, the Panhandle (100, 125, 45)), the dry ones as they were
    let lum = dot(cG, vec3f(0.3, 0.55, 0.15)); cG = mix(vec3f(lum), cG, mix(select(1.0, 0.86, SF_HQ), 0.8, dry)) * mix(select(vec3f(0.96, 1.05, 0.86), vec3f(0.97, 1.01, 0.88), SF_HQ), vec3f(1.0), dry);   // (veg49, hq: less lime)
    if (dry < 0.4) { cG = mix(sfLawn(cG, wp), cG, dry * 2.5); }   // (round 22: the mowed lawns, LAWN_WGSL)
    if (SF_HQ) { cG = sfTurf(cG, uv, dist, dry); }
    cG = mix(cG, cG * vec3f(0.42, 0.56, 0.36), scrubK);
  }
  // hard / bare surface: paving by material, or mulch / earth
  var cH = vec3f(0.0); var nH = vec2f(0.0); var hH = 0.5; var rH = 0.85;
  let wB = clamp(1.0 - wG - wH, 0.0, 1.0);   // worn grass: the ground beneath
  if (wH > 0.01) {
    let S = gHard(hm, uv, dx, dy, kb, near); cH = S.c; nH = S.n; hH = S.h; rH = S.r;
    if (kHard2 > 0.01 && hm2 >= 0) { let S2 = gHard(hm2, uv, dx, dy, kb, near); cH = mix(cH, S2.c, kHard2); nH = mix(nH, S2.n, kHard2); rH = mix(rH, S2.r, kHard2); }
    cH *= tint * (0.9 + 0.2 * n2);
    if (SF_HQ) { cH *= sfHardVar(hm, uv, dist); }
  }
  var cB = vec3f(0.0);
  if (wB > 0.01) { let S = gSurf(matMap, matDetail, 2, uv + 5.0, dx, dy, 2.2, 0.0, 0.0); cB = mix(S.c, S.c * vec3f(1.1, 1.0, 0.85), n3); }
  // height-blended edges: grass tufts over the paving's joints, the path's gravel into the grass
  // (veg49, hq: a ragged edge - tufts of grass spilling over the mulch and the paths, bare bites into the turf - from two
  // finer noises, not the mask's straight 0.5 m ramp)
  var jag = 0.0; var ek = 2.5;
  if (SF_HQ) { jag = (gN(uv * 2.9 + 0.7) * 0.55 + gN(uv * 8.7 + 3.1) * 0.45 - 0.5) * (1.0 - smoothstep(25.0, 60.0, dist)); ek = 4.5; }
  let e = clamp((hG - hH) * 0.6 + (n3 - 0.5) * 0.35 + jag * 1.4, -0.5, 0.5);
  let gW = clamp(wG + e * wG * wH * ek, 0.0, 1.0); let hW = clamp(wH - e * wG * wH * ek, 0.0, 1.0);
  let sum = max(gW + hW + wB, 1e-3);
  var c = (cG * gW + cH * hW + cB * wB) / sum;
  let n = (nG * gW + nH * hW) / sum;
  // the trees' shade (the mask), a touch greener and darker; the grass a little rougher up close
  // (veg49, hq: as ambient occlusion - the sun's own shadow maps draw the crowns' shade; a dark disc in the albedo under
  // every tree, whatever the sun, read as a blotch that matched no crown at golden hour)
  let ao = mk.a;
  if (SF_HQ) { c *= mix(1.0, ao, 0.3); gHAO = mix(1.0, ao, 0.85); } else { c *= ao; }
  c = mix(c, c * vec3f(0.92, 1.02, 0.9), (1.0 - ao) * gW);
  var rough = (0.96 * gW + rH * hW + 0.97 * wB) / sum;
  if (SF_CARPET > 0.0 && mk.r + mk.g < 0.02) {   // (no mask: the far ground)
    let cls = col.a; let kc = smoothstep(SF_CARPET - 100.0, SF_CARPET + 300.0, dist) * select(0.0, 1.0, (cls > 0.65 && cls < 0.85) || (cls > 0.9 && col.r > 0.25));
    if (kc > 0.0) {
      let q = floor(wp.xz / vec2f(9.0, 13.0) + vec2f(gH(floor(wp.xz / 40.0)) * 0.5, 0.0)); let h1 = gH(q); let h2 = gH(q + 7.31);
      var roof = mix(vec3f(0.17, 0.165, 0.16), vec3f(0.36, 0.33, 0.29), h1);
      roof = mix(roof, vec3f(0.30, 0.15, 0.10), step(0.88, h2)); roof = mix(roof, vec3f(0.48, 0.47, 0.45), step(0.72, h2) * step(h2, 0.88));
      c = mix(c, mix(c, roof, step(0.16, h2)), kc); rough = mix(rough, 0.8, kc);
    }
  }
  let wet = bc.g; c *= 1.0 - 0.3 * wet; rough = mix(rough, 0.25, wet * 0.6);
  // faces too steep for turf: bare rock and earth; in the Presidio Parkway's cutting board-formed concrete retaining walls
  var cliff = 1.0 - smoothstep(0.42, 0.6, abs(fn_.y));
  // (round 40) the Pacific's and the Golden Gate's bluffs west of Baker Beach and Marin's sea cliffs: bare from ~35 degrees
  // under ~70 m (Sea Cliff's and Lands End's sandstone and serpentine, the Headlands' greywacke), their scrub in patches
  let bluff = ${WP ? "max(step(wp.x, -7600.0) * step(wp.z, 1850.0), step(wp.z, -2600.0))" : "0.0"} * (1.0 - smoothstep(45.0, 80.0, wp.y));
  if (bluff > 0.0) { cliff = max(cliff, (1.0 - smoothstep(0.64, 0.82, abs(fn_.y))) * bluff * (1.0 - 0.45 * smoothstep(0.55, 0.75, n2))); }
  if (cliff > 0.0) {
    let pres = ${WP ? "step(wp.x, -5300.0) * step(-6500.0, wp.x)" : "0.0"};
    var rock = vec3f(0.2, 0.18, 0.15) * (0.7 + 0.5 * n1) * (0.85 + 0.3 * n3);
    if (bluff > 0.0) { rock = mix(rock, vec3f(0.34, 0.29, 0.21) * (0.75 + 0.45 * n1) * (0.85 + 0.3 * n3), bluff * smoothstep(0.3, 0.6, n2 + 0.2 * n3)); }
    let board = 1.0 - 0.12 * smoothstep(0.8, 0.95, fract(wp.y / 0.3));
    let conc = vec3f(0.42, 0.41, 0.38) * (0.85 + 0.2 * n2) * board * (1.0 - 0.25 * smoothstep(0.6, 0.9, gN(vec2f(uv.x * 0.5, wp.y * 0.08))));
    c = mix(c, mix(rock, conc, pres), cliff * mix(0.75, 1.0, pres));
    rough = mix(rough, 0.9, cliff);
  }
  // the shore's splash zone: faces that drop to the water, sand and the sea floor dark and wet up to ~1.3 m, weed at the line
  let shoreK = max(cliff, select(0.0, 1.0, col.a > 0.2 && col.a < 0.6 && wG + wH < 0.02));
  let sp = (1.0 - smoothstep(0.8 + 0.35 * n1, 1.3 + 0.35 * n1, wp.y)) * shoreK;
  c = mix(c, c * vec3f(0.4, 0.43, 0.4), sp); c = mix(c, vec3f(0.03, 0.045, 0.028), (1.0 - smoothstep(-0.2, 0.45, wp.y)) * 0.7 * shoreK);
  rough = mix(rough, 0.3, sp);
  gHN = vec4f(vec3f(n.x, 0.0, n.y) * 0.9, 1.0);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  B9t = qP(0);
es();
Ya();
Pn();
