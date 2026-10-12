// app 216 — e2t
// Lines 115064-115412 of readable/app.pretty.js (statement-aligned).
var yu = `
fn lgH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn lgN(p: vec2f) -> f32 { let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(lgH(i), lgH(i + vec2f(1.0, 0.0)), u.x), mix(lgH(i + vec2f(0.0, 1.0)), lgH(i + vec2f(1.0, 1.0)), u.x), u.y); }
// a cell of a 2 x 2 atlas at tile coordinate q: each cell holds its tile inside a wrapped gutter of 1/32 (gen_lm_lombard_gg.py),
// so filtering and the mips stay seamless (gradients passed in: the fract() seams do not pick the smallest mip)
fn lgAt(q: vec2f, cell: f32, gx: vec2f, gy: vec2f) -> vec2f {
  let o = vec2f(cell - 2.0 * floor(cell / 2.0), floor(cell / 2.0)) * 0.5;
  return o + (fract(q) * 0.9375 + 0.03125) * 0.5;
}
// the surface's frame from the derivatives: T = dP/du, B = dP/dv (normalised)
fn lgTB(uv: vec2f, wp: vec3f) -> mat2x3f {
  let gx = dpdx(uv); let gy = dpdy(uv); let px = dpdx(wp); let py = dpdy(wp);
  let det = gx.x * gy.y - gx.y * gy.x;
  let Tr = (px * gy.y - py * gx.y) * sign(det); let Br = (py * gx.x - px * gy.x) * sign(det);
  let T = select(vec3f(1.0, 0.0, 0.0), normalize(Tr), dot(Tr, Tr) > 1e-24);
  let B = select(vec3f(0.0, 1.0, 0.0), normalize(Br), dot(Br, Br) > 1e-24);
  return mat2x3f(T, B);
}
// Karl the Fog is a marine layer: uniform below Y0 = 60 m (as the renderer's own fog, which is uniform everywhere), thinning
// above it with a scale height of 35 m, so the Golden Gate's tower tops stand out of it seen from the approaches, the deck
// or Vista Point. (Materials with fog: false.) Returns the fog amount along the view ray to wp (three.js exp2 convention).
fn lgFog(wp: vec3f) -> f32 {
  if (F.fog.w < 1.5) { return 0.0; }
  let dens = F.fogP.z;
  let d = max(-(F.view * vec4f(wp, 1.0)).z, 0.0);
  let lo = min(F.camPos.y, wp.y); let hi = max(F.camPos.y, wp.y);
  let Y0 = 60.0; let Hs = 35.0;
  var avg = 1.0;
  if (hi - lo > 0.5) {
    let below = max(min(hi, Y0) - lo, 0.0);
    let above = Hs * (exp(-max(lo - Y0, 0.0) / Hs) - exp(-max(hi - Y0, 0.0) / Hs));
    avg = (below + above) / (hi - lo);
  } else { avg = exp(-max(lo - Y0, 0.0) / Hs); }
  let e = dens * d * mix(1.0, avg, smoothstep(0.0015, 0.0035, dens));
  return 1.0 - exp(-e * e);
}
`,
  yX =
    yu +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let cell = floor(col.a * 4.0);
  var sz = 2.6; var rough = 0.72; var nk = 0.9;
  if (cell > 0.5) { sz = 2.2; rough = 0.8; nk = 0.5; }
  if (cell > 1.5) { sz = 4.2; rough = 0.95; nk = 0.35; }
  if (cell > 2.5) { sz = 4.5; rough = 0.9; nk = 0.4; }
  let q = uv / sz;
  let gx = dpdx(q) * 0.46875; let gy = dpdy(q) * 0.46875;
  let a = lgAt(q, cell, gx, gy);
  var t = textureSampleGrad(matMap, matSamp, a, gx, gy);
  var nn = textureSampleGrad(matExtra, matSamp, a, gx, gy).xy * 2.0 - 1.0;
  if (cell > 0.5) {   // lawns, beds and sand: a second rotated tap, blended by a broad noise (no visible repeat)
    let q2 = mat2x2f(0.8, -0.6, 0.6, 0.8) * q * 0.73 + vec2f(0.37, 0.61);
    let a2 = lgAt(q2, cell, gx * 0.73, gy * 0.73);
    let t2 = textureSampleGrad(matMap, matSamp, a2, gx * 0.73, gy * 0.73);
    let bl = smoothstep(0.3, 0.7, lgN(uv / 11.0));
    t = mix(t, t2, bl); nn *= 1.0 - 0.5 * bl;
  }
  var c = t.rgb * col.rgb * (0.86 + 0.28 * lgN(uv / 27.0 + 3.0));
  if (cell > 0.5 && cell < 1.5) {   // beds: drifts of leaf between the blooms (hydrangea and box foliage)
    let gl = smoothstep(0.4, 0.75, lgN(uv / 1.6 + 3.0) * 0.7 + lgN(uv / 0.5) * 0.3);
    c = mix(c, vec3f(0.045, 0.085, 0.03) * (0.7 + 0.8 * t.g), gl * 0.7);
  }
  if (cell > 1.5 && cell < 2.5) { c *= (0.82 + 0.3 * lgN(uv / 7.0)) * (0.85 + 0.3 * lgN(uv / 41.0 + 7.0)); }   // lawn: wear, patches
  let dist = length(wp - F.camPos.xyz);
  let wet = bc.g;
  c *= 1.0 - 0.3 * wet; rough = mix(rough, 0.18, wet * select(0.4, 0.8, cell < 0.5));
  let k = nk * (1.0 - smoothstep(30.0, 120.0, dist)) * (1.0 - 0.5 * wet);
  gHN = vec4f(nn.x * k, 0.0, nn.y * k, 1.0);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  wX =
    yu +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let cell = floor(col.a * 4.0);
  var sz = vec2f(3.2, 3.2); var rough = 0.86; var nk = 0.7;
  if (cell > 0.5) { sz = vec2f(4.0, 4.0); rough = 0.8; nk = 0.35; }
  if (cell > 1.5) { sz = vec2f(1.3, 1.3); rough = 0.92; nk = 1.1; }
  if (cell > 2.5) { sz = vec2f(2.6, 2.6); rough = 0.78; nk = 0.6; }
  let q = uv / sz;
  let gx = dpdx(q) * 0.46875; let gy = dpdy(q) * 0.46875;
  let a = lgAt(q, cell, gx, gy);
  let t = textureSampleGrad(matMap, matSamp, a, gx, gy);
  let nn = textureSampleGrad(matExtra, matSamp, a, gx, gy).xy * 2.0 - 1.0;
  var c = t.rgb * col.rgb * (0.88 + 0.24 * lgN(uv / 7.0 + wp.xz * 0.01));
  let tb = lgTB(uv, wp);
  let dist = length(wp - F.camPos.xyz);
  let k = nk * (1.0 - smoothstep(25.0, 100.0, dist));
  let off = (tb[0] * nn.x + tb[1] * nn.y) * k;
  let wet = bc.g; c *= 1.0 - 0.25 * wet; rough = mix(rough, 0.3, wet * 0.6);
  gHN = vec4f(off, 1.0);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  MX =
    yu +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let row = floor(col.a * 2.0);
  let q = vec2f(fract(uv.x) * 0.996 + 0.002, (row + 1.0 - clamp(uv.y, 0.002, 0.998)) * 0.5);
  let t = textureSampleGrad(matMap, matSamp, q, dpdx(uv) * vec2f(1.0, 0.5), dpdy(uv) * vec2f(1.0, 0.5));
  var c = t.rgb * col.rgb;
  let wet = bc.g; c *= 1.0 - 0.2 * wet;
  gHE = c * vec3f(1.0, 0.72, 0.42) * bc.b * 0.2 * row;   // the Palace's reliefs are floodlit with the rest of it (palace62: as its stone)
  gHK = vec4f(mix(0.85, 0.35, wet), 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  SX = `
fn ggPer(x: f32, P: f32) -> f32 { return (fract(x / P + 0.5) - 0.5) * P; }
fn ggBev(d: f32, W: f32, bw: f32) -> f32 { let a = abs(d); return sign(d) * step(W, a) * (1.0 - step(W + bw, a)); }
fn ggSteel(wp: vec3f, col: vec4f) -> vec4f {
  let px = dpdx(wp); let py = dpdy(wp);
  let n = select(vec3f(0.0, 1.0, 0.0), normalize(gNw), dot(gNw, gNw) > 1e-8);   // (the renderer's world normal)
  let fq = max(max(length(px), length(py)), 1e-4);   // metres a pixel
  var t = vec3f(-n.z, 0.0, n.x); t = select(vec3f(1.0, 0.0, 0.0), normalize(t), dot(t, t) > 0.04);
  let b = cross(t, n);   // up the face (a vertical face: +y)
  let h = dot(wp, t); let v = dot(wp, b);
  let vert = 1.0 - smoothstep(0.5, 0.8, abs(n.y));
  var f = vec3f(1.0); var r = 0.0; var off = vec3f(0.0);
  let wx = lgN(vec2f(h * 0.08, v * 0.03) + wp.xz * 0.002);   // broad weathering
  if (col.a < 0.2) {
    let id = vec2f(floor(h / 1.25), floor(v / 2.5));
    let ph = lgH(id + vec2f(floor(wp.x / 40.0), floor(wp.z / 40.0)));
    f *= 0.95 + 0.08 * ph;
    f = mix(f, vec3f(1.08, 1.04, 1.0), step(0.9, ph) * 0.8);   // a fresh patch
    let dh = ggPer(h, 1.25); let dv = ggPer(v, 2.5); let W = 0.1; let bw = 0.025;
    let sh = 1.0 - step(W + bw, abs(dh)); let sv = 1.0 - step(W + bw, abs(dv));
    // the straps (a touch lighter: proud, catching the light), their bevels, the rivets' domes (two rows, 0.2 m pitch) - near only
    let kr = 1.0 - smoothstep(0.02, 0.08, fq); let kd = 1.0 - smoothstep(0.01, 0.03, fq);
    f *= 1.0 + 0.04 * max(sh, sv) * (1.0 - smoothstep(0.05, 0.2, fq));
    off += (t * ggBev(dh, W, bw) + b * ggBev(dv, W, bw)) * 0.8 * kr;
    let qa = vec2f(dh - 0.055 * sign(dh), ggPer(v, 0.2)); let qb = vec2f(ggPer(h, 0.2), dv - 0.055 * sign(dv));
    let ra = length(qa); let rb = length(qb); let R = 0.03;
    let da = step(ra, R) * sh; let db = step(rb, R) * sv * (1.0 - sh);
    off += (t * qa.x + b * qa.y) / R * 0.9 * da * kd + (t * qb.x + b * qb.y) / R * 0.9 * db * kd;
    // the seams' grime lines at the straps' edges (filtered: a line a pixel wide at most), the rivets a touch darker
    let lw = max(0.015, fq * 1.2); let fl = 1.0 - smoothstep(0.04, 0.25, fq);
    let line = max(1.0 - smoothstep(0.0, lw, abs(abs(dh) - W - bw)), 1.0 - smoothstep(0.0, lw, abs(abs(dv) - W - bw)));
    f *= 1.0 - 0.3 * line * fl - 0.15 * (da + db) * kd;
    // rust weeping down from each horizontal strap (vertical faces), faded with the streak's length
    let below = (0.5 - fract(v / 2.5 + 0.5)) * 2.5 + 1.25;   // metres under the strap above
    let st = smoothstep(0.62, 0.9, lgN(vec2f(h * 5.0, v * 0.25))) * exp(-below / 1.1) * (1.0 - step(2.4, below)) * vert;
    f = mix(f, vec3f(0.55, 0.42, 0.36), st * 0.55 * (1.0 - smoothstep(0.05, 0.3, fq)));
    r += 0.12 * st + 0.05 * line;
  } else if (col.a < 0.6) {
    // the cable: the wrapping wire's rings (round the axis: the cable runs along the GG axis, rising), near only
    let s = dot(wp.xz, vec2f(-0.0924, -0.9957));
    let kw = 1.0 - smoothstep(0.0015, 0.005, fq);
    off += vec3f(0.0, 1.0, 0.0) * sin(s * 6.2832 / 0.05) * 0.12 * kw * vert;
    f *= 0.97 + 0.05 * lgN(vec2f(s * 0.3, wp.y * 2.0));
  } else { r += 0.18; }   // (plain: railings, ropes - matte, no glints along them)
  // chalking (lighter, greyer, the tops of things), salt grime toward the water, streaked by the rain
  let chalk = smoothstep(0.55, 0.85, wx) * (0.5 + 0.5 * max(n.y, 0.0));
  f = mix(f, f * vec3f(1.12, 1.18, 1.2), chalk * 0.35);
  let rain = smoothstep(0.55, 0.85, lgN(vec2f(h * 1.7, v * 0.06) + 9.0)) * vert;
  f *= 1.0 - 0.1 * rain - 0.25 * (1.0 - smoothstep(4.0, 22.0, wp.y));
  gHN = vec4f(off, 1.0);
  return vec4f(f, r + 0.1 * chalk);
}
`,
  kX =
    yu +
    SX +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let n = lgN(vec2f(wp.x + wp.z, wp.y) * 0.15) * 0.7 + lgN(vec2f(wp.x - wp.z, wp.y * 0.1) * 0.9) * 0.3;
  let sd = ggSteel(wp, col);
  var c = col.rgb * (0.94 + 0.1 * n) * sd.rgb;
  let k = lgFog(wp);
  let wet = bc.g;
  gHE = F.fog.rgb * k * 0.55;
  gHK = vec4f(mix(0.6 + 0.12 * n + sd.a, 0.25, wet), 0.08, 0.0, 1.0);
  return vec4f(c * (1.0 - k), 1.0);
}
`,
  _X =
    yu +
    SX +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let n = lgN(vec2f(wp.x + wp.z, wp.y) * 0.15) * 0.7 + lgN(vec2f(wp.x - wp.z, wp.y * 0.1) * 0.9) * 0.3;
  let sd = ggSteel(wp, col);
  gHK = vec4f(mix(0.6 + 0.12 * n + sd.a, 0.25, bc.g), 0.08, 0.0, select(1.0, 0.0, col.a >= 0.6));   // (plain - the ropes, the rails: the material's own surface, as before: no glints strung along the thin ropes)
  return vec4f(col.rgb * (0.94 + 0.1 * n) * sd.rgb, 1.0);
}
`,
  zX =
    yu +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let k = lgFog(wp);
  let on = bc.b * 7.0 + col.a * 5.0;
  gHE = col.rgb * on * (1.0 - k * 0.85) + F.fog.rgb * k * 0.55;
  gHK = vec4f(0.35, 0.0, 0.0, 1.0);
  return vec4f(col.rgb * 0.4 * (1.0 - k), 1.0);
}
`,
  EX =
    yu +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let k = lgFog(wp);
  gHE = F.fog.rgb * k * 0.55;
  gHK = vec4f(mix(clamp(col.a, 0.05, 1.0), 0.25, bc.g), 0.1, 0.0, 1.0);
  return vec4f(col.rgb * (1.0 - k), 1.0);
}
`,
  TX =
    yu +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let p = wp.xz * 0.35;
  let e = 0.35;
  let h0 = lgN(p) * 0.6 + lgN(p * 2.7 + 5.0) * 0.4;
  let hx = lgN(p + vec2f(e, 0.0)) * 0.6 + lgN((p + vec2f(e, 0.0)) * 2.7 + 5.0) * 0.4;
  let hz = lgN(p + vec2f(0.0, e)) * 0.6 + lgN((p + vec2f(0.0, e)) * 2.7 + 5.0) * 0.4;
  let dist = length(wp - F.camPos.xyz);
  let s = 0.003 * (1.0 - smoothstep(20.0, 80.0, dist)) + 0.05 * bc.g;
  gHN = vec4f(-(hx - h0) / e * s, 0.0, -(hz - h0) / e * s, 1.0);
  gHK = vec4f(0.06, 0.0, 0.0, 1.0);
  return vec4f(col.rgb, 1.0);
}
`,
  e2t =
    yu +
    `
fn pfaFlute(t: f32) -> vec2f {   // across one flute (t 0..1, fillets at the edges): (slope of the depth, depth)
  let inF = step(0.1, t) * step(t, 0.9);
  let x = clamp((t - 0.1) / 0.8, 0.0, 1.0) * 2.0 - 1.0;
  let d = sqrt(max(1.0 - x * x, 0.0));
  return vec2f(-x / max(d, 0.3), d) * inF;
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let a4 = col.a * 4.0; let cell = floor(a4);
  let f = select(4.0, floor((a4 - 1.0) * 8.0 + 0.001), cell > 0.5 && cell < 1.5);
  let px = dpdx(wp); let py = dpdy(wp); let ux = dpdx(uv); let uy = dpdy(uv);
  let tb = lgTB(uv, wp);
  let fn0 = cross(px, py); let fnn = fn0 / max(length(fn0), 1e-12);
  let foot = max(length(px), length(py));
  let dist = length(wp - F.camPos.xyz);
  // the texture's coordinates: lathes by uv, flat faces by world position (horizontal: x, z; walls: along, up)
  let lathe = f < 3.5;
  let hz = abs(fnn.y) > 0.7;
  let tg = normalize(vec2f(-fnn.z, fnn.x) + vec2f(1e-6, 0.0));
  var q = select(vec2f(dot(wp.xz, tg), wp.y), wp.xz, hz) * 0.25;
  var gx = select(vec2f(dot(px.xz, tg), px.y), px.xz, hz) * 0.25; var gy = select(vec2f(dot(py.xz, tg), py.y), py.xz, hz) * 0.25;
  let qs = select(0.25, 0.6, f > 2.5 && f < 3.5);
  if (lathe) { q = uv * qs; gx = ux * qs; gy = uy * qs; }
  let tc = select(1.0, 3.0, cell > 2.5);
  let gx2 = gx * 0.46875; let gy2 = gy * 0.46875;
  let a = lgAt(q, tc, gx2, gy2);
  let t = textureSampleGrad(matMap, matSamp, a, gx2, gy2);
  let nn = textureSampleGrad(matExtra, matSamp, a, gx2, gy2).xy * 2.0 - 1.0;
  var c = t.rgb * col.rgb;
  var nk = 0.45 * (1.0 - smoothstep(25.0, 90.0, dist));
  var off = (tb[0] * nn.x + tb[1] * nn.y) * nk;
  var rough = 0.8;
  // the stone's moods: warmer (salmon) and greyer patches, a finer mottling
  let hc = select(dot(wp.xz, tg), uv.x, lathe);
  let n1 = lgN(wp.xz * 0.04 + vec2f(wp.y * 0.025, 3.0)); let n2 = lgN(vec2f(hc, wp.y) * 0.35 + 7.0);
  c *= mix(vec3f(1.05, 0.97, 0.9), vec3f(0.93, 0.94, 0.95), smoothstep(0.3, 0.75, n1)) * (0.93 + 0.14 * n2);
  // rain streaks down the walls (not on the tops and the soffits)
  let st = lgN(vec2f(hc * 1.7, wp.y * 0.07)) * 0.6 + lgN(vec2f(hc * 6.0, wp.y * 0.25 + 3.0)) * 0.4;
  let wall = 1.0 - smoothstep(0.5, 0.8, abs(fnn.y));
  c *= 1.0 - 0.2 * smoothstep(0.52, 0.85, st) * wall;
  let near = 1.0 - smoothstep(30.0, 120.0, dist);
  if (f < 0.5) {   // the shaft's flutes
    let ph = uv.x / 0.2; let fl = pfaFlute(fract(ph));
    let k = 1.0 - smoothstep(0.3, 0.8, length(vec2f(ux.x, uy.x)) / 0.2);
    off += tb[0] * fl.x * 0.6 * k;
    c *= mix(0.93, 1.0 - 0.22 * fl.y + 0.08 * (1.0 - step(0.1, fract(ph)) * step(fract(ph), 0.9)), k);
  } else if (f < 1.5) {   // the acanthus: two rows of leaves round the bell, their tips curling out
    let row = floor(uv.y / 0.8);
    let lx = fract(uv.x / 0.6 + 0.5 * row) - 0.5; let ly = fract(uv.y / 0.8);
    let e = vec2f(lx * 1.25, (ly - 0.5) * 0.8); let rr = length(e);
    let leaf = 1.0 - smoothstep(0.3, 0.48, rr);
    let rib = (1.0 - smoothstep(0.0, 0.05, abs(lx))) * smoothstep(0.1, 0.9, ly) * leaf;
    let k = 1.0 - smoothstep(0.15, 0.45, length(vec2f(ux.x, uy.x)) / 0.6);
    let sl = normalize(e + vec2f(1e-4, 0.0)) * (smoothstep(0.15, 0.45, rr) - smoothstep(0.45, 0.52, rr));
    off += (tb[0] * sl.x + tb[1] * sl.y) * 0.7 * k;
    c *= mix(0.92, (0.8 + 0.2 * leaf) * (1.0 - 0.1 * rib) * (1.0 + 0.1 * smoothstep(0.75, 0.95, ly) * leaf), k);
  } else if (f < 2.5) {   // the dome: tile courses and staggered joints, patina toward the foot, sheen
    let cy = abs(fract(uv.y / 0.5) - 0.5); let row = floor(uv.y / 0.5);
    let jx = abs(fract(uv.x / 0.9 + 0.5 * row) - 0.5);
    let k = 1.0 - smoothstep(0.1, 0.3, length(vec2f(ux.y, uy.y)));
    let line = max(smoothstep(0.43, 0.49, cy), smoothstep(0.45, 0.49, jx) * 0.7) * k;
    c *= 1.0 - 0.22 * line;
    off += tb[1] * (fract(uv.y / 0.5) - 0.5) * 0.25 * k;
    let pat = lgN(vec2f(uv.x * 0.6, uv.y * 0.15) + 11.0);
    c = mix(c, c * vec3f(0.8, 0.82, 0.78), smoothstep(0.55, 0.85, pat) * 0.6);
    rough = 0.62;
  } else if (f < 3.5) {   // coffers: a stepped frame round a deep recess, a rosette in each
    let cu = fract(uv.x) - 0.5; let cv = fract(uv.y) - 0.5; let m = max(abs(cu), abs(cv));
    var d = 1.0; var dd = 0.0;
    if (m > 0.4) { d = 0.0; } else if (m > 0.35) { d = (0.4 - m) / 0.05 * 0.5; dd = -10.0; } else if (m > 0.31) { d = 0.5; } else if (m > 0.26) { d = 0.5 + (0.31 - m) / 0.05 * 0.5; dd = -10.0; }
    let dir = select(vec2f(0.0, sign(cv)), vec2f(sign(cu), 0.0), abs(cu) > abs(cv));
    let k = 1.0 - smoothstep(0.05, 0.2, max(length(vec2f(ux.x, uy.x)), length(vec2f(ux.y, uy.y))));
    off += (tb[0] * dir.x + tb[1] * dir.y) * dd * 0.06 * k;
    let r = length(vec2f(cu, cv)); let ros = (1.0 - smoothstep(0.075, 0.1, r)) * (0.75 + 0.25 * cos(atan2(cv, cu) * 8.0));
    c *= mix(0.8, (1.0 - 0.38 * d) * (1.0 + 0.1 * step(m, 0.4) * step(0.35, m)), k);
    c = mix(c, c * vec3f(1.3, 1.15, 0.85), ros * k);
  } else if (f > 4.5 && f < 5.5) {   // dentils (along the band, 0.32 m)
    let p = fract(uv.x / 0.32);
    let k = 1.0 - smoothstep(0.08, 0.25, length(vec2f(ux.x, uy.x)));
    let gap = smoothstep(0.6, 0.64, p) * (1.0 - smoothstep(0.96, 1.0, p));
    c *= mix(0.86, 1.0 - 0.5 * gap, k);
    off += tb[0] * ((1.0 - smoothstep(0.0, 0.05, abs(p - 0.62))) - (1.0 - smoothstep(0.0, 0.05, abs(p - 0.98)))) * 0.8 * k;
  } else if (f > 5.5 && f < 6.5) {   // the hall: cast panels, pilasters every 7.2 m, a string course
    let p = fract(uv.x / 7.2); let pil = smoothstep(0.0, 0.01, p) * (1.0 - smoothstep(0.1, 0.11, p));
    let sc = 1.0 - smoothstep(0.0, 0.08, abs(fract(uv.y / 4.2) - 0.5) - 0.42);
    let jx = 1.0 - smoothstep(0.0, 0.03, abs(fract(uv.x / 2.4) - 0.5) - 0.47);
    let k = 1.0 - smoothstep(0.1, 0.4, foot);
    c *= mix(0.95, (1.0 + 0.08 * pil) * (1.0 - 0.12 * max(sc, jx)), k);
    off += tb[0] * ((1.0 - smoothstep(0.0, 0.006, abs(p - 0.005))) - (1.0 - smoothstep(0.0, 0.006, abs(p - 0.105)))) * 0.8 * k;
    c *= 1.0 - 0.15 * smoothstep(0.45, 0.8, lgN(vec2f(uv.x * 0.8, uv.y * 0.05)));   // heavier streaking
  } else if (f > 6.5) {   // the Greek fret (5 x 5 cells a repeat, the band 5 cells high)
    let cs = 1.0 / 5.0; let gxp = floor(uv.x / (cs * 1.05)); let gyp = floor(clamp(uv.y, 0.0, 0.999) * 5.0);
    let idx = u32(gyp) * 5u + u32(gxp - 5.0 * floor(gxp / 5.0));
    let on = f32((33054269u >> idx) & 1u);
    let k = 1.0 - smoothstep(0.06, 0.2, length(vec2f(ux.x, uy.x)));
    c *= mix(0.88, 0.72 + 0.32 * on, k);
  }
  // wet, floodlit at night
  let wet = bc.g; c *= 1.0 - 0.25 * wet; rough = mix(rough, 0.3, wet * 0.6);
  gHN = vec4f(off * near + off * (1.0 - near) * 0.3, 1.0);
  // floodlit at night: warm, the walls more than the soffits and tops, fading up the dome (palace62: x 0.7 had it a white
  // blaze - no stone, no columns)
  let up = select(0.75, 1.0, wall > 0.5) * (1.0 - 0.4 * smoothstep(3.0, 20.0, uv.y) * select(0.0, 1.0, f > 1.5 && f < 2.5));
  gHE = c * vec3f(1.0, 0.72, 0.42) * bc.b * 0.2 * up;
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  AX = e2t;
var Kh = xt,
  s2t = "assets/tex/lm/lombard_gg/",
  PX = typeof document < "u",
  To = { pavers: 0.125, bed: 0.375, lawn: 0.625, sand: 0.875 },
  hi = { brick: 0.125, stone: 0.375, hedge: 0.625, granite: 0.875 },
  CX = (i) => {
    let t = new $t(i);
    return [t.r, t.g, t.b];
  };
