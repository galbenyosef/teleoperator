// app 25 — math
// Lines 44354-46056 of readable/app.pretty.js (statement-aligned).
var dut = `
fn acesThree(c0: vec3f, exposure: f32) -> vec3f {
  var c = c0 * (exposure / 0.6);
  c = mat3x3f(vec3f(0.59719, 0.07600, 0.02840), vec3f(0.35458, 0.90834, 0.13383), vec3f(0.04823, 0.01566, 0.83777)) * c;
  let a = c * (c + 0.0245786) - 0.000090537;
  let b = c * (0.983729 * c + 0.4329510) + 0.238081;
  c = mat3x3f(vec3f(1.60475, -0.10208, -0.00327), vec3f(-0.53108, 1.10813, -0.07276), vec3f(-0.07367, -0.00605, 1.07602)) * (a / b);
  return clamp(c, vec3f(0.0), vec3f(1.0));
}
fn srgbOETF(c: vec3f) -> vec3f { return select(1.055 * pow(c, vec3f(1.0 / 2.4)) - 0.055, c * 12.92, c <= vec3f(0.0031308)); }
fn neutralTM(c0: vec3f) -> vec3f {
  var c = c0; let x = min(c.r, min(c.g, c.b)); c -= select(0.04, x - 6.25 * x * x, x < 0.08);
  let peak = max(c.r, max(c.g, c.b)); if (peak < 0.76) { return c; }
  let np = 1.0 - 0.0576 / (peak - 0.52); c *= np / peak;
  return mix(c, vec3f(np), 1.0 - 1.0 / (0.15 * (peak - np) + 1.0));
}
fn toneMap(c: vec3f) -> vec3f {
  let m = S.tone.y; let e = S.tone.x;
  if (m < 0.5) { return clamp(c, vec3f(0.0), vec3f(1.0)); }
  if (m < 1.5) { return clamp(c * e, vec3f(0.0), vec3f(1.0)); }
  if (m < 2.5) { let x = c * e; return clamp(x / (1.0 + x), vec3f(0.0), vec3f(1.0)); }
  if (m > 6.5) { return clamp(neutralTM(c * e), vec3f(0.0), vec3f(1.0)); }
  return acesThree(c, e);
}
struct FOut { @location(0) color: vec4f, @location(1) lin: vec4f };
fn outMain(c: vec3f) -> FOut { let l = max(c, vec3f(0.0)); return FOut(vec4f(srgbOETF(toneMap(l)), 1.0), vec4f(l, 1.0)); }
`,
  WS = (o) => `
const PI = 3.14159265358979;
const RG = 6360.0;          // planet radius (km)
const RT = 6460.0;          // top of the atmosphere (km)
const RGM = 6360000.0;      // planet radius (m)
const NN = ${o.N}u;         // FFT size
const NC = 3u;              // cascades
const DOME_EMIN = -0.035;   // dome elevation range (rad): a little below the horizon .. zenith
const DOME_EMAX = 1.5707963;
struct SO {
  viewProj: mat4x4f,
  invViewProj: mat4x4f,
  cam: vec4f,     // camera xyz (m), time (s)
  sun: vec4f,     // unit vector towards the sun, top-of-atmosphere illuminance (x gain)
  wind: vec4f,    // wind direction xz (unit), speed (m/s), choppiness
  cloud: vec4f,   // coverage, type (0 stratus .. 1 cumulus), wind offset xz (m)
  cloud2: vec4f,  // cloud bottom, top (m), extinction per metre at density 1, first dome phase
  tone: vec4f,    // exposure, tone mapping (three.js constant), foam amount, water turbidity
  screen: vec4f,  // 1/W, 1/H, planar reflection available, sea level (m)
  casc: vec4f,    // cascade sizes L0, L1, L2 (m), frame time step (s)
  atm: vec4f,     // Mie scale (haze), Rayleigh scale, ground albedo, fog per metre
  dome: vec4f,    // dome W, H, phases this frame, cloud steps
  grid: vec4f,    // polar grid: first ring radius, ring ratio, segments, rings
  misc: vec4f,    // foam decay per frame, foam threshold, camera height (m), frame
  water: vec4f,   // water colour (linear, deep scattering tint), sun-lit crest scattering
  // sf-drive: lit as the scene is (skyOcean.scene(): the renderer's environment, sun, fog), the shore field (setShore)
  shore: vec4f,   // the shore field's x0, z0 (m), 1 / its width, 1 / its depth (m)
  shore2: vec4f,  // on, range (m: the field's +-), shore foam, the sun's glitter (scene-lit: 0 under an overcast)
  scene: vec4f,   // the scene's sun irradiance (rgb: colour x intensity), scene-lit (1)
  sdir: vec4f,    // the scene's sun direction (xyz), the wash's time (s)
  fogC: vec4f,    // the renderer's fog (frame uniform): colour (display), kind
  fogP: vec4f,    // near, far, density, _
  fogS: vec4f,    // toward the sun (display), on
  fogA: vec4f,    // away from the sun (display), height falloff
  fogH: vec4f,    // base, reach, sun lobe power, linear term
  bl: vec4f,      // sf-drive: the Bay Lights' plane (skyOcean.bayLights): origin x, z, direction x, z
  bl2: vec4f,     // the lit span's s0, s1, on (night), brightness
  blC: array<vec4f, 8>,   // the main cable's height at 32 points along s0..s1 (the LED lines' tops)
  blD: array<vec4f, 8>,   // the deck's (their feet)
};
@group(0) @binding(0) var<uniform> S: SO;
fn sat(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
fn remap(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return nlo + (v - lo) * (nhi - nlo) / (hi - lo); }
fn safeN2(v: vec2f) -> vec2f { let l = length(v); return select(vec2f(1.0, 0.0), v / l, l > 1e-6); }
fn raySphere(ro: vec3f, rd: vec3f, r: f32) -> vec2f {   // (near, far) along the ray; (-1, -1) when it misses
  let b = dot(ro, rd); let c = dot(ro, ro) - r * r; let d = b * b - c;
  if (d < 0.0) { return vec2f(-1.0); }
  let s = sqrt(d); return vec2f(-b - s, -b + s);
}
fn toSub(u: f32, res: f32) -> f32 { return (u + 0.5 / res) * (res / (res + 1.0)); }
fn fromSub(u: f32, res: f32) -> f32 { return (u - 0.5 / res) * (res / (res - 1.0)); }
// ---- atmosphere (km^-1)
struct Med { sr: vec3f, sm: f32, s: vec3f, t: vec3f };
fn medium(h: f32) -> Med {
  let dr = exp(-max(h, 0.0) / 8.0); let dm = exp(-max(h, 0.0) / 1.2); let dz = max(0.0, 1.0 - abs(h - 25.0) / 15.0);
  var m: Med;
  m.sr = vec3f(5.802e-3, 13.558e-3, 33.1e-3) * dr * S.atm.y;
  m.sm = 3.996e-3 * dm * S.atm.x;
  m.s = m.sr + vec3f(m.sm);
  m.t = m.s + vec3f(0.444e-3 * dm * S.atm.x) + vec3f(0.650e-3, 1.881e-3, 0.085e-3) * dz;
  return m;
}
fn phaseR(c: f32) -> f32 { return 3.0 / (16.0 * PI) * (1.0 + c * c); }
fn phaseM(c: f32, g: f32) -> f32 {   // Cornette-Shanks
  let g2 = g * g; return 3.0 / (8.0 * PI) * (1.0 - g2) * (1.0 + c * c) / ((2.0 + g2) * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5));
}
fn hg(c: f32, g: f32) -> f32 { let g2 = g * g; return (1.0 - g2) / (4.0 * PI * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
fn transUV(r: f32, mu: f32) -> vec2f {   // Bruneton's parameterisation of transmittance to the top of the atmosphere
  let H = sqrt(RT * RT - RG * RG); let rho = sqrt(max(r * r - RG * RG, 0.0));
  let disc = r * r * (mu * mu - 1.0) + RT * RT; let d = max(0.0, -r * mu + sqrt(max(disc, 0.0)));
  let dmin = RT - r; let dmax = rho + H;
  return vec2f(toSub((d - dmin) / (dmax - dmin), 256.0), toSub(rho / H, 64.0));
}
fn planetShadow(p: vec3f, l: vec3f) -> f32 { return select(1.0, 0.0, raySphere(p, l, RG).x > 0.0); }
`,
  rV = `
@group(0) @binding(1) var tTrans: texture_2d<f32>;
@group(0) @binding(2) var tMs: texture_2d<f32>;
@group(0) @binding(3) var tSky: texture_2d<f32>;
@group(0) @binding(4) var sLin: sampler;
fn trans(r: f32, mu: f32) -> vec3f { return textureSampleLevel(tTrans, sLin, transUV(r, mu), 0.0).rgb; }
fn msAt(r: f32, mu: f32) -> vec3f {
  return textureSampleLevel(tMs, sLin, vec2f(toSub(mu * 0.5 + 0.5, 32.0), toSub((r - RG) / (RT - RG), 32.0)), 0.0).rgb;
}
fn camR() -> f32 { return RG + max(S.misc.z, 0.5) * 0.001; }
fn skyUV(cosZ: f32, cosPhi: f32, r: f32) -> vec2f {   // Hillaire's sky-view mapping (horizon-weighted)
  let vH = sqrt(max(r * r - RG * RG, 0.0)); let beta = acos(clamp(vH / r, -1.0, 1.0)); let zh = PI - beta;
  let vza = acos(clamp(cosZ, -1.0, 1.0));
  var v: f32;
  if (vza < zh) { var c = vza / zh; c = sqrt(max(1.0 - c, 0.0)); v = (1.0 - c) * 0.5; }
  else { v = sqrt(max((vza - zh) / beta, 0.0)) * 0.5 + 0.5; }
  return vec2f(toSub(sqrt(max(0.5 - 0.5 * cosPhi, 0.0)), 192.0), toSub(v, 108.0));
}
// sky radiance towards d (world, y up) for the camera's height, x illuminance x gain
fn skyRad(d: vec3f) -> vec3f {
  let cphi = dot(safeN2(d.xz), safeN2(S.sun.xz));
  return textureSampleLevel(tSky, sLin, skyUV(d.y, cphi, camR()), 0.0).rgb * S.sun.w;
}
fn sunRadiance(d: vec3f) -> vec3f {   // the sun's disc (0.53 deg), limb darkened, through the atmosphere
  let c = dot(d, S.sun.xyz); let cr = 0.999989;   // cos(0.2666 deg)
  if (c < cr) { return vec3f(0.0); }
  let x = sat((1.0 - c) / (1.0 - cr)); let mu = sqrt(1.0 - x);
  let limb = vec3f(0.397, 0.503, 0.652) + vec3f(0.603, 0.497, 0.348) * mu;   // Neckel & Labs, RGB-ish
  let r = camR(); let p = vec3f(0.0, r, 0.0);
  return trans(r, S.sun.y) * planetShadow(p, S.sun.xyz) * limb * (S.sun.w / 6.8e-5);
}
`,
  put = (o) =>
    WS(o) +
    `
@group(0) @binding(1) var tTrans: texture_2d<f32>;
@group(0) @binding(2) var tMs: texture_2d<f32>;
@group(0) @binding(4) var sLin: sampler;
@group(0) @binding(5) var oTrans: texture_storage_2d<rgba16float, write>;
@group(0) @binding(6) var oMs: texture_storage_2d<rgba16float, write>;
@group(0) @binding(7) var oSky: texture_storage_2d<rgba16float, write>;
fn trans(r: f32, mu: f32) -> vec3f { return textureSampleLevel(tTrans, sLin, transUV(r, mu), 0.0).rgb; }
fn msAt(r: f32, mu: f32) -> vec3f {
  return textureSampleLevel(tMs, sLin, vec2f(toSub(mu * 0.5 + 0.5, 32.0), toSub((r - RG) / (RT - RG), 32.0)), 0.0).rgb;
}
@compute @workgroup_size(8, 8) fn transLut(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= 256u || g.y >= 64u) { return; }
  let uv = vec2f(fromSub((f32(g.x) + 0.5) / 256.0, 256.0), fromSub((f32(g.y) + 0.5) / 64.0, 64.0));
  let H = sqrt(RT * RT - RG * RG); let rho = H * uv.y; let r = sqrt(rho * rho + RG * RG);
  let dmin = RT - r; let dmax = rho + H; let d = dmin + uv.x * (dmax - dmin);
  var mu = 1.0; if (d > 0.0) { mu = clamp((H * H - rho * rho - d * d) / (2.0 * r * d), -1.0, 1.0); }
  let ro = vec3f(0.0, r, 0.0); let rd = vec3f(sqrt(max(1.0 - mu * mu, 0.0)), mu, 0.0);
  let tt = raySphere(ro, rd, RT).y;
  var od = vec3f(0.0); let n = 40;
  for (var i = 0; i < n; i++) { let t = (f32(i) + 0.5) / f32(n) * tt; od += medium(length(ro + rd * t) - RG).t; }
  textureStore(oTrans, g.xy, vec4f(exp(-od * tt / f32(n)), 1.0));
}
// multiple scattering (Hillaire, section 5.5): second order over the sphere of directions, then the geometric series
@compute @workgroup_size(8, 8) fn msLut(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= 32u || g.y >= 32u) { return; }
  let uv = (vec2f(g.xy) + 0.5) / 32.0;
  let muS = uv.x * 2.0 - 1.0; let r = RG + max(uv.y, 0.002) * (RT - RG);
  let sd = vec3f(sqrt(max(1.0 - muS * muS, 0.0)), muS, 0.0); let ro = vec3f(0.0, r, 0.0);
  var L2 = vec3f(0.0); var FMS = vec3f(0.0);
  for (var a = 0; a < 8; a++) { for (var b = 0; b < 8; b++) {
    let th = (f32(a) + 0.5) / 8.0 * 2.0 * PI; let ph = acos(1.0 - 2.0 * (f32(b) + 0.5) / 8.0);
    let rd = vec3f(cos(th) * sin(ph), cos(ph), sin(th) * sin(ph));
    let tg = raySphere(ro, rd, RG); let ground = tg.x > 0.0;
    let tMax = select(raySphere(ro, rd, RT).y, tg.x, ground);
    var T = vec3f(1.0); var L = vec3f(0.0); var f = vec3f(0.0); let n = 20; let dt = tMax / f32(n);
    for (var i = 0; i < n; i++) {
      let p = ro + rd * (f32(i) + 0.5) * dt; let pr = length(p); let up = p / pr;
      let m = medium(pr - RG); let st = exp(-m.t * dt);
      let Ts = trans(pr, dot(up, sd)) * planetShadow(p, sd);
      let Sc = m.s * Ts / (4.0 * PI);
      L += T * (Sc - Sc * st) / max(m.t, vec3f(1e-9));
      f += T * (m.s - m.s * st) / max(m.t, vec3f(1e-9));
      T *= st;
    }
    if (ground) { let p = ro + rd * tMax; let up = normalize(p); L += T * trans(RG, dot(up, sd)) * max(dot(up, sd), 0.0) * S.atm.z / PI; }
    L2 += L; FMS += f;
  } }
  L2 /= 64.0; FMS /= 64.0;
  textureStore(oMs, g.xy, vec4f(L2 / (1.0 - FMS), 1.0));
}
fn skyUVtoDir(uv: vec2f, r: f32) -> vec3f {
  let vH = sqrt(max(r * r - RG * RG, 0.0)); let beta = acos(clamp(vH / r, -1.0, 1.0)); let zh = PI - beta;
  var vza: f32;
  if (uv.y < 0.5) { var c = 1.0 - 2.0 * uv.y; c = 1.0 - c * c; vza = zh * c; }
  else { var c = uv.y * 2.0 - 1.0; vza = zh + beta * c * c; }
  let cphi = 1.0 - 2.0 * uv.x * uv.x; let sphi = sqrt(max(1.0 - cphi * cphi, 0.0));
  return vec3f(sin(vza) * cphi, cos(vza), sin(vza) * sphi);
}
@compute @workgroup_size(8, 8) fn skyLut(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= 192u || g.y >= 108u) { return; }
  let uv = vec2f(fromSub((f32(g.x) + 0.5) / 192.0, 192.0), fromSub((f32(g.y) + 0.5) / 108.0, 108.0));
  let r = RG + max(S.misc.z, 0.5) * 0.001; let ro = vec3f(0.0, r, 0.0);
  let rd = skyUVtoDir(uv, r);
  let sd = vec3f(sqrt(max(1.0 - S.sun.y * S.sun.y, 0.0)), S.sun.y, 0.0);
  let tg = raySphere(ro, rd, RG); let tMax = min(select(raySphere(ro, rd, RT).y, tg.x, tg.x > 0.0), 9000.0);
  let c = dot(rd, sd); let pr = phaseR(c); let pm = phaseM(c, 0.76);
  var L = vec3f(0.0); var T = vec3f(1.0); var t0 = 0.0; let n = 32;
  for (var i = 0; i < n; i++) {
    let t1 = tMax * pow((f32(i) + 1.0) / f32(n), 2.0); let dt = t1 - t0; let t = 0.5 * (t0 + t1); t0 = t1;
    let p = ro + rd * t; let prr = length(p); let up = p / prr;
    let m = medium(prr - RG); let muS = dot(up, sd);
    let Ts = trans(prr, muS) * planetShadow(p, sd);
    let Sc = Ts * (m.sr * pr + vec3f(m.sm * pm)) + msAt(prr, muS) * m.s;
    let st = exp(-m.t * dt);
    L += T * (Sc - Sc * st) / max(m.t, vec3f(1e-9)); T *= st;
  }
  textureStore(oSky, g.xy, vec4f(L, 1.0));
}
`,
  b7 = `
fn pcg3(v0: vec3u) -> vec3u {
  var v = v0 * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> vec3u(16u);
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}
fn h3(c: vec3i, per: i32, seed: u32) -> vec3f {   // hash of a lattice cell, periodic
  let w = ((c % per) + per) % per;
  return vec3f(pcg3(vec3u(w) + vec3u(seed, seed * 7u, seed * 13u))) / 4294967295.0;
}
fn worley(p: vec3f, per: i32, seed: u32) -> f32 {   // 1 - F1 distance, periodic over per cells (p in cells)
  let ip = vec3i(floor(p)); let fp = fract(p); var d = 1.0;
  for (var z = -1; z <= 1; z++) { for (var y = -1; y <= 1; y++) { for (var x = -1; x <= 1; x++) {
    let o = vec3i(x, y, z); let q = vec3f(o) + h3(ip + o, per, seed) - fp; d = min(d, dot(q, q));
  } } }
  return 1.0 - sqrt(d);
}
fn grad3(c: vec3i, per: i32, seed: u32) -> vec3f { return normalize(h3(c, per, seed) * 2.0 - 1.0 + 1e-4); }
fn perlin(p: vec3f, per: i32, seed: u32) -> f32 {   // periodic gradient noise, ~[-1, 1]
  let ip = vec3i(floor(p)); let f = fract(p); let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  var n: array<f32, 8>;
  for (var k = 0; k < 8; k++) { let o = vec3i(k & 1, (k >> 1) & 1, (k >> 2) & 1); n[k] = dot(grad3(ip + o, per, seed), f - vec3f(o)); }
  let x0 = mix(n[0], n[1], u.x); let x1 = mix(n[2], n[3], u.x); let x2 = mix(n[4], n[5], u.x); let x3 = mix(n[6], n[7], u.x);
  return mix(mix(x0, x1, u.y), mix(x2, x3, u.y), u.z) * 1.6;
}
fn wfbm(p: vec3f, per: i32, seed: u32) -> f32 {
  return worley(p, per, seed) * 0.625 + worley(p * 2.0, per * 2, seed + 1u) * 0.25 + worley(p * 4.0, per * 4, seed + 2u) * 0.125;
}
@group(0) @binding(0) var oBase: texture_storage_3d<rgba8unorm, write>;
@group(0) @binding(1) var oDetail: texture_storage_3d<rgba8unorm, write>;
@group(0) @binding(2) var oWeather: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(3) var oFoam: texture_storage_2d<rgba8unorm, write>;
@compute @workgroup_size(4, 4, 4) fn base(@builtin(global_invocation_id) g: vec3u) {
  if (any(g >= vec3u(128u))) { return; }
  let p = (vec3f(g) + 0.5) / 128.0;
  var pf = 0.0; var a = 1.0; var fr = 4.0; var nrm = 0.0;
  for (var o = 0; o < 4; o++) { pf += perlin(p * fr, i32(fr), 3u + u32(o)) * a; nrm += a; a *= 0.5; fr *= 2.0; }
  pf = sat(pf / nrm * 0.5 + 0.5);
  let w1 = wfbm(p * 4.0, 4, 11u);
  let pw = sat(remap(pf, w1 - 1.0, 1.0, 0.0, 1.0));   // Perlin-Worley: billowy Perlin
  textureStore(oBase, g, vec4f(pw, wfbm(p * 8.0, 8, 21u), wfbm(p * 16.0, 16, 31u), wfbm(p * 32.0, 32, 41u)));
}
@compute @workgroup_size(4, 4, 4) fn detail(@builtin(global_invocation_id) g: vec3u) {
  if (any(g >= vec3u(32u))) { return; }
  let p = (vec3f(g) + 0.5) / 32.0;
  textureStore(oDetail, g, vec4f(wfbm(p * 2.0, 2, 51u), wfbm(p * 4.0, 4, 61u), wfbm(p * 8.0, 8, 71u), 1.0));
}
@compute @workgroup_size(8, 8) fn weather(@builtin(global_invocation_id) g: vec3u) {
  if (any(g.xy >= vec2u(512u))) { return; }
  let p = vec3f((vec2f(g.xy) + 0.5) / 512.0, 0.37);
  var c = 0.0; var a = 1.0; var fr = 5.0; var nrm = 0.0;
  for (var o = 0; o < 5; o++) { c += perlin(vec3f(p.xy * fr, p.z * 3.0), i32(fr), 81u + u32(o)) * a; nrm += a; a *= 0.5; fr *= 2.0; }
  c = c / nrm * 0.5 + 0.5;
  let cells = worley(vec3f(p.xy * 12.0, 0.5), 12, 91u);
  let cov = sat(c * 0.75 + cells * 0.45 - 0.1);
  let ty = sat(perlin(vec3f(p.xy * 3.0, 1.7), 3, 97u) * 0.5 + 0.5);
  textureStore(oWeather, g.xy, vec4f(cov, ty, 0.0, 1.0));
}
@compute @workgroup_size(8, 8) fn foamTex(@builtin(global_invocation_id) g: vec3u) {
  if (any(g.xy >= vec2u(256u))) { return; }
  let p = vec3f((vec2f(g.xy) + 0.5) / 256.0, 0.0);
  let a = worley(vec3f(p.xy * 10.0, 0.3), 10, 101u); let b = worley(vec3f(p.xy * 24.0, 0.7), 24, 103u);
  let n = perlin(vec3f(p.xy * 6.0, 0.2), 6, 107u) * 0.5 + 0.5;
  let bubbles = pow(sat(a), 3.0) * 0.6 + pow(sat(b), 4.0) * 0.5;   // cell rims -> lacy foam
  textureStore(oFoam, g.xy, vec4f(sat(bubbles * 1.3 + n * 0.35 - 0.1), n, 0.0, 1.0));
}
`,
  mut = `
@group(0) @binding(5) var tBase: texture_3d<f32>;
@group(0) @binding(6) var tDetail: texture_3d<f32>;
@group(0) @binding(7) var tWeather: texture_2d<f32>;
@group(0) @binding(8) var sRep: sampler;
struct Amb { skyIrr: vec4f, sunIrr: vec4f, horizon: vec4f, sunCloud: vec4f, zenith: vec4f };
fn cloudCover(xz: vec2f) -> vec2f {   // local coverage and type at a world position (weather map, 64 km tile)
  let wm = textureSampleLevel(tWeather, sRep, (xz + S.cloud.zw) / 64000.0, 0.0);
  let c = S.cloud.x;
  let cov = sat(smoothstep(1.0 - c - 0.18, 1.0 - c + 0.32, wm.r)) * sat(c * 4.0);
  return vec2f(cov, sat(S.cloud.y + (wm.g - 0.5) * 0.7));
}
fn heightGrad(hf: f32, ty: f32) -> f32 {   // vertical profile: stratus .. stratocumulus .. cumulus
  let st = vec4f(0.0, 0.08, 0.15, 0.3); let sc = vec4f(0.0, 0.18, 0.45, 0.65); let cu = vec4f(0.0, 0.12, 0.72, 0.98);
  let p = select(mix(sc, cu, (ty - 0.5) * 2.0), mix(st, sc, ty * 2.0), ty < 0.5);
  return smoothstep(p.x, p.y, hf) * (1.0 - smoothstep(p.z, p.w, hf));
}
fn cloudDensity(pw: vec3f, full: bool) -> f32 {   // pw: world x, altitude, world z (m)
  let hf = (pw.y - S.cloud2.x) / (S.cloud2.y - S.cloud2.x);
  if (hf <= 0.0 || hf >= 1.0) { return 0.0; }
  let wd = S.wind.xy;
  let q = vec3f(pw.x + wd.x * hf * 600.0, pw.y, pw.z + wd.y * hf * 600.0);   // shear: tops lean downwind
  let cc = cloudCover(q.xz); if (cc.x <= 0.001) { return 0.0; }
  let b = textureSampleLevel(tBase, sRep, vec3f((q.x + S.cloud.z) / 13000.0, q.y / 5200.0, (q.z + S.cloud.w) / 13000.0), 0.0);
  let low = b.g * 0.625 + b.b * 0.25 + b.a * 0.125;
  var d = remap(b.r, low - 1.0, 1.0, 0.0, 1.0) * heightGrad(hf, cc.y);
  let ch = cc.x * mix(1.0, 0.55, pow(hf, 1.3));   // coverage erodes with height: rounded, narrowing tops
  d = sat(remap(d, 1.0 - ch, 1.0, 0.0, 1.0)) * ch;
  d *= mix(0.45, 1.0, sat(hf * 4.0));             // denser with height: soft, wispy bases
  if (d <= 0.0 || !full) { return d; }
  let dn = textureSampleLevel(tDetail, sRep, vec3f(q.x + S.cloud.z * 1.3, q.y, q.z + S.cloud.w * 1.3) / 1600.0, 0.0);
  let hfb = dn.r * 0.625 + dn.g * 0.25 + dn.b * 0.125;
  let dm = mix(hfb, 1.0 - hfb, sat(hf * 6.0));   // wispy at the base, billowy above
  return sat(remap(d, dm * 0.38, 1.0, 0.0, 1.0));
}
fn domeUV(d: vec3f) -> vec2f {
  let u = fract(atan2(d.z, d.x) / (2.0 * PI) + 1.0);
  let e = asin(clamp(d.y, -1.0, 1.0));
  return vec2f(u, sqrt(sat((e - DOME_EMIN) / (DOME_EMAX - DOME_EMIN))));
}
fn domeDir(uv: vec2f) -> vec3f {
  let az = uv.x * 2.0 * PI; let e = DOME_EMIN + (DOME_EMAX - DOME_EMIN) * uv.y * uv.y;
  return vec3f(cos(az) * cos(e), sin(e), sin(az) * cos(e));
}
`,
  gut = (o) =>
    WS(o) +
    rV +
    mut +
    `
@group(0) @binding(9) var<storage, read_write> AMB: Amb;
@group(0) @binding(10) var oDome: texture_storage_2d<rgba16float, write>;
@group(0) @binding(11) var tDome: texture_2d<f32>;
@group(0) @binding(12) var oEnv: texture_storage_2d<rgba16float, write>;
@group(0) @binding(13) var sDome: sampler;
// ambient light for this frame: sky irradiance (cosine-weighted over the upper hemisphere), sun irradiance at sea level and
// at the clouds, the horizon's radiance
@compute @workgroup_size(1) fn ambient() {
  var irr = vec3f(0.0); var hor = vec3f(0.0); var zen = vec3f(0.0);
  for (var i = 0; i < 64; i++) {
    let u1 = (f32(i % 8) + 0.5) / 8.0; let u2 = (f32(i / 8) + 0.5) / 8.0;
    let rr = sqrt(u1); let ph = 2.0 * PI * u2;
    let d = vec3f(rr * cos(ph), sqrt(max(1.0 - u1, 0.0)), rr * sin(ph));
    irr += skyRad(d);
  }
  for (var i = 0; i < 16; i++) { let a = f32(i) / 16.0 * 2.0 * PI; hor += skyRad(normalize(vec3f(cos(a), 0.02, sin(a)))); }
  zen = skyRad(vec3f(0.0, 1.0, 0.0));
  let r = camR(); let rc = RG + (S.cloud2.x + S.cloud2.y) * 0.0005;
  let su = S.sun.xyz;
  AMB.skyIrr = vec4f(irr / 64.0 * PI, 0.0);
  AMB.sunIrr = vec4f(trans(r, su.y) * planetShadow(vec3f(0.0, r, 0.0), su) * S.sun.w, 0.0);
  AMB.horizon = vec4f(hor / 16.0, 0.0);
  AMB.sunCloud = vec4f(trans(rc, su.y) * planetShadow(vec3f(0.0, rc, 0.0), su) * S.sun.w, 0.0);
  AMB.zenith = vec4f(zen, 0.0);
}
fn ign(p: vec2f) -> f32 { return fract(52.9829189 * fract(dot(p, vec2f(0.06711056, 0.00583715)))); }
// one dome texel: the clouds along d from the camera -> (in-scattered radiance, transmittance)
// one segment of a dome ray (each ray is split over NSEG threads: a ray is a long serial loop, so the pass is bound by its
// latency, not by the number of rays; segments composited front to back cut it several-fold, same result)
const NSEG = 8u;   // threads per ray
struct Seg { L: vec3f, T: f32, tw: f32, ws: f32 };
fn marchSeg(d: vec3f, seg: u32, jitter: f32) -> Seg {
  var o: Seg; o.L = vec3f(0.0); o.T = 1.0; o.tw = 0.0; o.ws = 0.0;
  let ro = vec3f(0.0, RGM + S.misc.z, 0.0);
  if (d.y < -0.02) { return o; }
  let tb = raySphere(ro, d, RGM + S.cloud2.x).y; let tt = raySphere(ro, d, RGM + S.cloud2.y).y;
  if (tb <= 0.0) { return o; }
  let tEnd = min(tt, tb + 70000.0);
  let span = (tEnd - tb) / f32(NSEG); let t0 = tb + span * f32(seg); let t1 = t0 + span;
  let horizon = 1.0 - sat(d.y * 3.0);
  let n = max(i32(mix(S.dome.w * 0.55, S.dome.w, horizon) / f32(NSEG)), 3);
  let dt = span / f32(n);
  let su = S.sun.xyz; let cth = dot(d, su);
  // phase per multiple-scattering octave, dual-lobe for the silver lining
  var ph: array<f32, 5>;
  for (var k = 0; k < 5; k++) { let c = pow(0.6, f32(k)); ph[k] = mix(hg(cth, 0.8 * c), hg(cth, -0.25 * c), 0.2); }
  let powderW = sat(0.5 - 0.5 * cth);   // powder darkening only on the sides facing away from the sun (keeps the silver lining)
  let sunC = AMB.sunCloud.rgb; let amb = AMB.skyIrr.rgb / PI;
  let sig = S.cloud2.z;
  var L = vec3f(0.0); var T = 1.0; var tw = 0.0; var ws = 0.0;
  var t = t0 + dt * jitter;
  let cxz = S.cam.xz;
  // adaptive: coarse steps through empty sky; inside a cloud fine steps, so the thin sun-lit shell is sampled (a coarse
  // sample lands deep inside, where the sun no longer reaches, and the cloud turns grey)
  let dtf = clamp(dt * 0.18 * f32(NSEG), 25.0, 140.0);
  var fine = 0;
  for (var i = 0; i < 100; i++) {
    if (t > t1 || T < 0.02) { break; }
    let p = ro + d * t; let alt = length(p) - RGM;
    let pw = vec3f(cxz.x + p.x, alt, cxz.y + p.z);
    let dc = cloudDensity(pw, false);
    if (dc <= 0.0) {
      if (fine > 0) { fine--; t += dtf; } else { t += dt; }
      continue;
    }
    if (fine == 0 && i > 0) { t = max(t - dt, t0); fine = 10; continue; }   // entered a cloud: back up, go fine
    fine = 10;
    let den = cloudDensity(pw, true);
    if (den > 0.002) {
      // light: five cone samples towards the sun (the far ones without detail noise)
      var od = 0.0; var s = 0.0;
      let LS = array<f32, 5>(45.0, 120.0, 280.0, 600.0, 1250.0);
      for (var k = 0; k < 5; k++) {
        let q = p + su * (s + LS[k] * 0.5); s += LS[k];
        od += cloudDensity(vec3f(cxz.x + q.x, length(q) - RGM, cxz.y + q.z), k < 2) * LS[k];
      }
      od *= sig;
      let hf = sat((alt - S.cloud2.x) / (S.cloud2.y - S.cloud2.x));
      var sl = 0.0;
      // multiple scattering: octaves that keep 70 percent of the energy and see 30 percent of the optical depth each (a thick
      // cumulus reflects ~70 percent of the sun; single scattering alone leaves it grey)
      for (var k = 0; k < 5; k++) { sl += pow(0.7, f32(k)) * ph[k] * exp(-pow(0.3, f32(k)) * od); }
      let powder = mix(1.0, 1.0 - exp(-den * sig * 250.0), powderW * 0.8);
      let S_ = den * sig * (sunC * sl * powder + amb * mix(0.45, 1.5, hf));
      let st = exp(-den * sig * dtf);
      L += T * (S_ - S_ * st) / (den * sig); let wa = T * (1.0 - st); tw += wa * t; ws += wa;
      T *= st;
    }
    t += dtf;
  }
  o.L = L; o.T = T; o.tw = tw; o.ws = ws; return o;
}
var<workgroup> SEGL: array<vec4f, 64>;
var<workgroup> SEGW: array<vec2f, 64>;
@compute @workgroup_size(64) fn clouds(@builtin(local_invocation_index) li: u32, @builtin(workgroup_id) wg: vec3u) {
  // this frame's phases of the interleave: 8x8 (Bayer order) or 16x8 (the 8x8 order twice, side by side): 1/64 or 1/128 of
  // the dome per phase, a full refresh every ~1-2 s (clouds drift a fraction of a texel meanwhile). 8 rays x 8 segments.
  let BAY = array<u32, 64>(0u, 36u, 4u, 32u, 18u, 54u, 22u, 50u, 2u, 38u, 6u, 34u, 16u, 52u, 20u, 48u, 9u, 45u, 13u, 41u, 27u, 63u, 31u, 59u, 11u, 47u, 15u, 43u, 25u, 61u, 29u, 57u, 1u, 37u, 5u, 33u, 19u, 55u, 23u, 51u, 3u, 39u, 7u, 35u, 17u, 53u, 21u, 49u, 8u, 44u, 12u, 40u, 26u, 62u, 30u, 58u, 10u, 46u, 14u, 42u, 24u, 60u, 28u, 56u);
  let NP = u32(S.misc.w);   // phases in the interleave (64 or 128)
  let pi = (u32(S.cloud2.w) + wg.z) % NP; let ph = BAY[pi % 64u];
  let W = u32(S.dome.x); let H = u32(S.dome.y);
  let PX = select(8u, 16u, NP > 64u); let GW = W / PX;
  let id = wg.x * (64u / NSEG) + li / NSEG; let seg = li % NSEG;
  let gxy = vec2u(id % GW, id / GW);
  let tx = select(gxy * 8u + vec2u(ph % 8u, ph / 8u), gxy * vec2u(16u, 8u) + vec2u((ph % 8u) * 2u + pi / 64u, ph / 8u), NP > 64u);
  let ok = tx.x < W && tx.y < H;
  let uv = (vec2f(tx) + 0.5) / vec2f(f32(W), f32(H));
  let d = domeDir(uv);
  var sg: Seg; sg.L = vec3f(0.0); sg.T = 1.0; sg.tw = 0.0; sg.ws = 0.0;
  if (ok) { sg = marchSeg(d, seg, ign(vec2f(tx))); }
  SEGL[li] = vec4f(sg.L, sg.T); SEGW[li] = vec2f(sg.tw, sg.ws);
  workgroupBarrier();
  if (!ok || seg != 0u) { return; }
  var L = vec3f(0.0); var T = 1.0; var tw = 0.0; var ws = 0.0;
  for (var k = 0u; k < NSEG; k++) { let a = SEGL[li + k]; let w = SEGW[li + k]; L += T * a.rgb; tw += T * w.x; ws += T * w.y; T *= a.a; }
  // aerial perspective: distant clouds fade into the sky's own colour
  let tb = raySphere(vec3f(0.0, RGM + S.misc.z, 0.0), d, RGM + S.cloud2.x).y;
  let dist = select(max(tb, 0.0) + 20000.0, tw / max(ws, 1e-6), ws > 1e-4);
  let fog = exp(-dist * (0.00002 + S.atm.w * 0.6));
  L = L * fog + skyRad(d) * (1.0 - T) * (1.0 - fog);
  textureStore(oDome, tx, vec4f(L, T));
}
// the environment: sky + clouds (no sun disc: the sun is lit analytically), the sea below the horizon (equirect, row 0 up)
fn seaFar(d: vec3f) -> vec3f {
  let m = normalize(vec3f(d.x, max(-d.y, 0.002), d.z));
  let f = 0.02 + 0.98 * pow(1.0 - sat(-d.y), 5.0);
  let cl = textureSampleLevel(tDome, sDome, domeUV(m), 0.0);
  let up = (AMB.skyIrr.rgb + AMB.sunIrr.rgb * max(S.sun.y, 0.0)) * S.water.rgb;
  return f * (skyRad(m) * cl.a + cl.rgb) + (1.0 - f) * up;
}
@compute @workgroup_size(8, 8) fn env(@builtin(global_invocation_id) g: vec3u) {
  let dims = textureDimensions(oEnv); if (g.x >= dims.x || g.y >= dims.y) { return; }
  let uv = (vec2f(g.xy) + 0.5) / vec2f(dims);
  let th = uv.y * PI; let ph = (uv.x - 0.5) * 2.0 * PI;
  let d = vec3f(sin(th) * cos(ph), cos(th), sin(th) * sin(ph));
  var c: vec3f;
  if (d.y > -0.01) { let cl = textureSampleLevel(tDome, sDome, domeUV(d), 0.0); c = skyRad(d) * cl.a + cl.rgb; }
  else { c = seaFar(d); }
  textureStore(oEnv, g.xy, vec4f(c, 1.0));
}
`,
  but = `
@group(0) @binding(0) var src: texture_2d_array<f32>;
@group(0) @binding(1) var dst: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(2) var src2: texture_2d_array<f32>;
@group(0) @binding(3) var dst2: texture_storage_2d_array<rgba16float, write>;
@compute @workgroup_size(8, 8, 1) fn mip(@builtin(global_invocation_id) g: vec3u) {
  let dd = textureDimensions(dst); if (g.x >= dd.x || g.y >= dd.y) { return; }
  let p = vec2i(g.xy * 2u); let l = i32(g.z);
  textureStore(dst, g.xy, g.z, 0.25 * (textureLoad(src, p, l, 0) + textureLoad(src, p + vec2i(1, 0), l, 0) + textureLoad(src, p + vec2i(0, 1), l, 0) + textureLoad(src, p + vec2i(1, 1), l, 0)));
}
@compute @workgroup_size(8, 8, 1) fn mip2(@builtin(global_invocation_id) g: vec3u) {
  let dd = textureDimensions(dst); if (g.x >= dd.x || g.y >= dd.y) { return; }
  let p = vec2i(g.xy * 2u); let l = i32(g.z);
  textureStore(dst, g.xy, g.z, 0.25 * (textureLoad(src, p, l, 0) + textureLoad(src, p + vec2i(1, 0), l, 0) + textureLoad(src, p + vec2i(0, 1), l, 0) + textureLoad(src, p + vec2i(1, 1), l, 0)));
  textureStore(dst2, g.xy, g.z, 0.25 * (textureLoad(src2, p, l, 0) + textureLoad(src2, p + vec2i(1, 0), l, 0) + textureLoad(src2, p + vec2i(0, 1), l, 0) + textureLoad(src2, p + vec2i(1, 1), l, 0)));
}
`,
  xut = (o) =>
    WS(o) +
    `
@group(0) @binding(1) var<storage, read_write> H0: array<vec2f>;        // h0(k) per cascade
@group(0) @binding(2) var<storage, read_write> FB: array<vec4f>;        // 4 complex fields per texel (2 x vec4)
@group(0) @binding(3) var<storage, read_write> FOAM: array<f32>;
@group(0) @binding(4) var oDisp: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(5) var oSlope: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(6) var<uniform> SP: vec4f;   // spectrum: wind speed, fetch (m), spread mix, seed
fn cascL(c: u32) -> f32 { return select(select(S.casc.z, S.casc.y, c == 1u), S.casc.x, c == 0u); }
fn pcg(v0: u32) -> u32 { let s = v0 * 747796405u + 2891336453u; let w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u; return (w >> 22u) ^ w; }
fn rnd(a: u32) -> f32 { return (f32(pcg(a)) + 0.5) / 4294967296.0; }
fn jonswap(w: f32, U: f32, F: f32) -> f32 {
  let alpha = 0.076 * pow(U * U / (F * 9.81), 0.22);
  let wp = 22.0 * pow(9.81 * 9.81 / (U * F), 1.0 / 3.0);
  let sg = select(0.09, 0.07, w <= wp);
  let r = exp(-(w - wp) * (w - wp) / (2.0 * sg * sg * wp * wp));
  return alpha * 9.81 * 9.81 / pow(w, 5.0) * exp(-1.25 * pow(wp / w, 4.0)) * pow(3.3, r);
}
fn spreading(w: f32, wp: f32, th: f32) -> f32 {   // Donelan-Banner
  let x = w / wp;
  var b: f32;
  if (x < 0.95) { b = 2.61 * pow(x, 1.3); } else if (x < 1.6) { b = 2.28 * pow(x, -1.3); }
  else { b = pow(10.0, -0.4 + 0.8393 * exp(-0.567 * log(x * x))); }
  let ch = cosh(b * th);
  return b / (2.0 * tanh(b * PI)) / (ch * ch);
}
@compute @workgroup_size(8, 8, 1) fn initSpectrum(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= NN || g.y >= NN) { return; }
  let c = g.z; let L = cascL(c); let dk = 2.0 * PI / L;
  let kv = vec2f(f32(i32(g.x) - i32(NN / 2u)), f32(i32(g.y) - i32(NN / 2u))) * dk;
  let k = length(kv);
  // each cascade owns a band of wavenumbers (no energy counted twice)
  let b1 = 2.0 * PI / S.casc.y * 6.0; let b2 = 2.0 * PI / S.casc.z * 6.0;
  let lo = select(select(b2, b1, c == 1u), 0.0, c == 0u); let hi = select(select(1e9, b2, c == 1u), b1, c == 0u);
  var h = vec2f(0.0);
  if (k > 1e-5 && k >= lo && k < hi) {
    let U = SP.x; let w = sqrt(9.81 * k); let dwdk = 9.81 / (2.0 * w);
    let wp = 22.0 * pow(9.81 * 9.81 / (U * SP.y), 1.0 / 3.0);
    let wa = atan2(S.wind.y, S.wind.x);
    var th = atan2(kv.y, kv.x) - wa; th = th - 2.0 * PI * floor((th + PI) / (2.0 * PI));
    let D = mix(spreading(w, wp, th), 1.0 / (2.0 * PI), SP.z);
    let Sp = jonswap(w, U, SP.y) * D * exp(-k * k * 0.0001);   // capillary cut
    let amp = sqrt(max(2.0 * Sp * dwdk / k * dk * dk, 0.0));
    let s = (c * NN + g.y) * NN + g.x + u32(SP.w) * 7919u;
    let u1 = rnd(s * 2u + 1u); let u2 = rnd(s * 2u + 2u);
    let rr = sqrt(-2.0 * log(u1)); let gz = vec2f(rr * cos(2.0 * PI * u2), rr * sin(2.0 * PI * u2));
    h = gz * amp * 0.70710678;
  }
  H0[(c * NN + g.y) * NN + g.x] = h;
}
fn cmul(a: vec2f, b: vec2f) -> vec2f { return vec2f(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
fn pack(a: vec2f, b: vec2f) -> vec2f { return vec2f(a.x - b.y, a.y + b.x); }   // a + i b
@compute @workgroup_size(8, 8, 1) fn spectrum(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= NN || g.y >= NN) { return; }
  let c = g.z; let L = cascL(c); let dk = 2.0 * PI / L;
  let kv = vec2f(f32(i32(g.x) - i32(NN / 2u)), f32(i32(g.y) - i32(NN / 2u))) * dk;
  let k = max(length(kv), 1e-6);
  let i0 = (c * NN + g.y) * NN + g.x;
  let im = (c * NN + (NN - g.y) % NN) * NN + (NN - g.x) % NN;
  let w = sqrt(9.81 * k) * S.cam.w;
  let e = vec2f(cos(w), sin(w));
  let a = H0[i0]; let bm = H0[im];
  let h = cmul(a, e) + cmul(vec2f(bm.x, -bm.y), vec2f(e.x, -e.y));
  let ih = vec2f(-h.y, h.x);
  let dx = ih * (kv.x / k); let dz = ih * (kv.y / k);
  let hx = ih * kv.x; let hz = ih * kv.y;
  let dxx = -h * (kv.x * kv.x / k); let dzz = -h * (kv.y * kv.y / k); let dxz = -h * (kv.x * kv.y / k);
  FB[i0 * 2u] = vec4f(pack(dx, h), pack(dz, dxz));
  FB[i0 * 2u + 1u] = vec4f(pack(hx, hz), pack(dxx, dzz));
}
// inverse FFT of one row (or column) of one cascade, all four fields, in workgroup memory (radix 2, in place)
var<workgroup> SA: array<vec4f, NN>;
var<workgroup> SB: array<vec4f, NN>;
fn rev(i: u32) -> u32 { return reverseBits(i) >> (32u - ${Math.log2(o.N)}u); }
fn fftLine(tid: u32, base: u32, stride: u32) {
  for (var e = tid; e < NN; e += NN / 2u) { let j = rev(e); let s = base + e * stride; SA[j] = FB[s * 2u]; SB[j] = FB[s * 2u + 1u]; }
  workgroupBarrier();
  for (var s = 0u; s < ${Math.log2(o.N)}u; s++) {
    let h = 1u << s; let grp = tid >> s; let pos = tid & (h - 1u);
    let i = grp * 2u * h + pos; let j = i + h;
    let ang = PI * f32(pos) / f32(h);
    let w = vec2f(cos(ang), sin(ang));
    let a = SA[i]; let b = SA[j]; let bw = vec4f(cmul(b.xy, w), cmul(b.zw, w));
    SA[i] = a + bw; SA[j] = a - bw;
    let c = SB[i]; let d = SB[j]; let dw = vec4f(cmul(d.xy, w), cmul(d.zw, w));
    SB[i] = c + dw; SB[j] = c - dw;
    workgroupBarrier();
  }
  for (var e = tid; e < NN; e += NN / 2u) { let s = base + e * stride; FB[s * 2u] = SA[e]; FB[s * 2u + 1u] = SB[e]; }
}
@compute @workgroup_size(${o.N / 2}) fn fftRows(@builtin(local_invocation_id) l: vec3u, @builtin(workgroup_id) w: vec3u) {
  fftLine(l.x, (w.y * NN + w.x) * NN, 1u);
}
@compute @workgroup_size(${o.N / 2}) fn fftCols(@builtin(local_invocation_id) l: vec3u, @builtin(workgroup_id) w: vec3u) {
  fftLine(l.x, w.y * NN * NN + w.x, NN);
}
@compute @workgroup_size(8, 8, 1) fn assemble(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= NN || g.y >= NN) { return; }
  let c = g.z; let i0 = (c * NN + g.y) * NN + g.x;
  let sg = select(-1.0, 1.0, ((g.x + g.y) & 1u) == 0u);
  let A = FB[i0 * 2u] * sg; let B = FB[i0 * 2u + 1u] * sg;
  let lam = S.wind.w;
  let dxx = lam * B.z; let dzz = lam * B.w; let dxz = lam * A.w;
  let sx = B.x / (1.0 + dxx); let sz = B.y / (1.0 + dzz);
  let J = (1.0 + dxx) * (1.0 + dzz) - dxz * dxz;
  // whitecaps: born where the surface folds (Jacobian below a threshold), then they decay (a trail of old foam)
  let born = sat((S.misc.y - J) * 3.0);
  let f = max(FOAM[i0] * S.misc.x, born);
  FOAM[i0] = f;
  textureStore(oDisp, g.xy, c, vec4f(lam * A.x, A.y, lam * A.z, f));
  textureStore(oSlope, g.xy, c, vec4f(sx, sz, sx * sx, sz * sz));
}
`,
  vut = (o) =>
    WS(o) +
    rV +
    dut +
    `
@group(0) @binding(5) var tDisp: texture_2d_array<f32>;
@group(0) @binding(6) var tSlope: texture_2d_array<f32>;
@group(0) @binding(7) var tEnv: texture_2d<f32>;
@group(0) @binding(8) var tDome: texture_2d<f32>;
@group(0) @binding(9) var tWeather: texture_2d<f32>;
@group(0) @binding(10) var tFoam: texture_2d<f32>;
@group(0) @binding(11) var tPlanar: texture_2d<f32>;
@group(0) @binding(12) var sRep: sampler;
@group(0) @binding(13) var sAniso: sampler;
@group(0) @binding(14) var sDome: sampler;
struct Amb { skyIrr: vec4f, sunIrr: vec4f, horizon: vec4f, sunCloud: vec4f, zenith: vec4f };
@group(0) @binding(15) var<storage, read> AMB: Amb;
@group(0) @binding(16) var tShore: texture_2d<f32>;   // sf-drive: the shore's signed distance (setShore)
@group(0) @binding(17) var tPrior: texture_2d<f32>;   // sf-drive: the scene's environment (mips: mirror, Phong 400 / 64 / 8, cosine)
// sf-drive: metres to the nearest thing standing in the water (negative: the land side of the sea wall); far: the range
fn shoreD(xz: vec2f) -> f32 {
  if (S.shore2.x < 0.5) { return 1e3; }
  let uv = (xz - S.shore.xy) * S.shore.zw;
  if (any(uv < vec2f(0.0)) || any(uv > vec2f(1.0))) { return S.shore2.y; }
  let v = textureSampleLevel(tShore, sLin, uv, 0.0).r;
  let d = (v - 0.5) * 2.0 * S.shore2.y;
  return select(d, 1e3, d > S.shore2.y - 0.5);
}
// sf-drive: the renderer's fog (renderer.js fogged(): exp2 + the linear veil, aerial colour toward / away from the sun,
// thinning with height), on the displayed colour as three.js applies it
fn sceneFog(disp: vec3f, p: vec3f, d: f32) -> vec3f {
  if (S.fogC.w < 1.5) { return disp; }
  let dq = select(d * d, 2250000.0 + 1050.0 * (d - 1500.0), d > 1500.0);
  var od = S.fogP.z * S.fogP.z * dq + S.fogH.w * min(d, 1300.0);   // (as fogged())
  if (S.fogP.y > S.fogP.x + 1.0) { let bay = ${globalThis.MB_BAY_FOG || "max(smoothstep(-1500.0, -2300.0, p.z), smoothstep(600.0, 1400.0, p.x))"};   // (renderer fogged(): high ground, the bay)
    od *= min(mix(1.0, 0.12, smoothstep(S.fogP.x, S.fogP.y, S.cam.y)), mix(1.0, 0.16, bay)); }   // (round 17: as the renderer's fogged)
  var fc = S.fogC.rgb;
  if (S.fogS.w > 0.0) {
    let b = S.fogA.w;
    if (b > 0.0) {
      let y0 = S.cam.y - S.fogH.x; let dy = p.y - S.cam.y; let bdy = b * dy;
      let avg = select((1.0 - exp(-bdy)) / bdy, 1.0 - 0.5 * bdy, abs(bdy) < 1e-3);
      od *= exp(-b * max(y0, 0.0)) * clamp(avg, 0.0, 8.0);
    }
    let mu = dot(normalize(p - S.cam.xyz), S.sdir.xyz);
    let w = pow(clamp(0.5 + 0.5 * mu, 0.0, 1.0), S.fogH.z);
    fc = mix(mix(S.fogC.rgb, S.fogA.rgb, smoothstep(0.0, S.fogH.y, d)), S.fogS.rgb, w);
  }
  return mix(disp, fc, 1.0 - exp(-od));
}
// sf-drive: the Bay Lights in the water: the reflected ray met with the plane of the suspenders' LED lines, lit where it
// passes between the deck and the cable, each line (every 12 m) spread over the chop's scatter (sp, m) - a shimmering
// sheet of streaks under the span
fn bayLight(p: vec3f, r: vec3f, ang: f32) -> vec3f {
  if (S.bl2.z < 0.5) { return vec3f(0.0); }
  let N = vec2f(-S.bl.w, S.bl.z); let den = dot(r.xz, N);
  if (abs(den) < 1e-4) { return vec3f(0.0); }
  let t = dot(S.bl.xy - p.xz, N) / den;
  if (t < 0.0) { return vec3f(0.0); }
  let h = p + r * t; let s = dot(h.xz - S.bl.xy, S.bl.zw);
  if (s < S.bl2.x || s > S.bl2.y) { return vec3f(0.0); }
  let f = (s - S.bl2.x) / (S.bl2.y - S.bl2.x) * 31.0; let i0 = u32(floor(f)); let i1 = min(i0 + 1u, 31u); let ft = fract(f);
  let cy = mix(S.blC[i0 / 4u][i0 % 4u], S.blC[i1 / 4u][i1 % 4u], ft); let dy = mix(S.blD[i0 / 4u][i0 % 4u], S.blD[i1 / 4u][i1 % 4u], ft);
  let vin = smoothstep(dy, dy + 2.0, h.y) * (1.0 - smoothstep(cy - 1.0, cy + 0.5, h.y));
  if (vin <= 0.0) { return vec3f(0.0); }
  let q = s - S.bl2.x - 12.0; let k = fract(q / 12.0); let dd = min(k, 1.0 - k) * 12.0;
  let sg = max(t * ang, 0.35);   // (the chop's angular scatter at the plane's distance)
  let line = mix(exp(-0.5 * dd * dd / (sg * sg)) * 0.08 / (sg * 2.5), 0.08 / 12.0, smoothstep(3.0, 7.0, sg));   // (one line, or their sum once they blur together)
  let T = S.sdir.w;
  let w1 = 0.5 + 0.5 * sin(s * 0.011 - T * 0.35 + sin(s * 0.0023 + T * 0.05) * 3.0);
  let w2 = 0.5 + 0.5 * sin(h.y * 0.09 + T * 1.1 + s * 0.004);
  return vec3f(0.95, 0.97, 1.0) * 16.0 * (0.15 + 0.85 * pow(w1, 3.0) * (0.55 + 0.45 * w2)) * line * vin * S.bl2.w;
}
fn priorAt(d: vec3f, lod: f32) -> vec3f {
  return textureSampleLevel(tPrior, sRep, vec2f(atan2(d.z, d.x) * (0.5 / PI) + 0.5, acos(clamp(d.y, -1.0, 1.0)) / PI), lod).rgb;
}
fn domeUV(d: vec3f) -> vec2f {
  let u = fract(atan2(d.z, d.x) / (2.0 * PI) + 1.0);
  let e = asin(clamp(d.y, -1.0, 1.0));
  return vec2f(u, sqrt(sat((e - DOME_EMIN) / (DOME_EMAX - DOME_EMIN))));
}
fn cascL(c: i32) -> f32 { return select(select(S.casc.z, S.casc.y, c == 1), S.casc.x, c == 0); }
fn cloudShadow(p: vec3f) -> f32 {   // soft shadows of the clouds on the sea, from the weather map along the sun
  let su = S.sun.xyz; let hm = (S.cloud2.x + S.cloud2.y) * 0.5;
  let q = p.xz + su.xz / max(su.y, 0.08) * (hm - p.y);
  let wm = textureSampleLevel(tWeather, sRep, (q + S.cloud.zw) / 64000.0, 0.0);
  let c = S.cloud.x;
  let cov = sat(smoothstep(1.0 - c - 0.18, 1.0 - c + 0.32, wm.r)) * sat(c * 4.0);
  return mix(1.0, 0.18, sat(cov * 1.6) * sat(S.cloud2.z / 0.04));
}
fn aerial(c: vec3f, d: vec3f, dist: f32) -> vec3f {   // haze towards the horizon's own colour: the sea meets the sky seamlessly
  let T = exp(-dist * S.atm.w);
  let h = skyRad(normalize(vec3f(d.x, max(d.y, 0.0015), d.z)));
  let cl = textureSampleLevel(tDome, sDome, domeUV(normalize(vec3f(d.x, 0.0015, d.z))), 0.0);
  return c * T + (h * cl.a + cl.rgb) * (1.0 - T);
}
// Smith shadowing for a Gaussian slope distribution (Bruneton et al. 2010)
fn lambda(cosT: f32, sig2: f32) -> f32 {
  let a = cosT / sqrt(max(2.0 * sig2 * (1.0 - cosT * cosT), 1e-8));
  let t = 1.0 / (1.0 + 0.47047 * a);
  let ec = (0.3480242 * t - 0.0958798 * t * t + 0.7478556 * t * t * t);   // erfc(a) = ec * exp(-a^2) (Abramowitz-Stegun 7.1.26)
  return max(0.0, exp(-a * a) * (1.0 / (a * 1.7724539) - ec) * 0.5);
}

// sf-drive: where the sea is (1) and is not (0: land, the ocean sinks out of sight under it; calm against the seawall).
// globalThis.MB_SEA_MASK: a WGSL body for fn seaMask(xz) (default: sea everywhere)
${globalThis.MB_SEA_FNS || ""}
fn seaMask(xz: vec2f) -> f32 { ${globalThis.MB_SEA_MASK || "return 1.0;"} }
struct OV { @builtin(position) pos: vec4f, @location(0) wpos: vec3f, @location(1) uv: vec2f, @location(2) h: f32 };
@vertex fn vsOcean(@builtin(vertex_index) vi: u32) -> OV {
  let S1 = u32(S.grid.z) + 1u; let seg = vi % S1; let ring = vi / S1;
  let th = f32(seg) / S.grid.z * 2.0 * PI;
  let r = S.grid.x * pow(S.grid.y, f32(ring)) - S.grid.x * 0.98;
  let cam = S.cam.xyz;
  let xz = cam.xz + r * vec2f(cos(th), sin(th));
  let spacing = max(r * (S.grid.y - 1.0), 2.0 * PI * r / S.grid.z) + 0.02;
  var disp = vec3f(0.0);
  for (var c = 0; c < 3; c++) {
    let L = cascL(c); let lod = max(log2(spacing / (L / f32(NN))) + 0.5, 0.0);
    disp += textureSampleLevel(tDisp, sRep, xz / L, c, lod).xyz;
  }
  let sm = seaMask(xz);
  // sf-drive: calmer against the wall and round the piles (the waves never climb through them)
  var dm = sm;
  if (S.shore2.x > 0.5) { let sd = shoreD(xz); if (sd < 60.0) { dm *= mix(0.25, 1.0, smoothstep(0.0, 9.0, sd)); } }
  var p = vec3f(xz.x + disp.x * dm, S.screen.w + disp.y * dm - (1.0 - sm) * 40.0, xz.y + disp.z * dm);
  let q = p.xz - cam.xz; p.y -= dot(q, q) / (2.0 * RGM);   // the planet's curvature: the sea drops below the horizon
  var o: OV; o.pos = S.viewProj * vec4f(p, 1.0); o.wpos = p; o.uv = xz; o.h = disp.y; return o;
}
@fragment fn fsOcean(i: OV) -> FOut {
  // slopes and their unresolved variance (the mips average s and s^2): three cascades, anisotropic filtering
  var sl = vec2f(0.0); var v2 = vec2f(0.0); var foam = 0.0;
  let FW = array<f32, 3>(1.0, 0.8, 0.35);
  for (var c = 0; c < 3; c++) {
    let L = cascL(c);
    let t = textureSample(tSlope, sAniso, i.uv / L, c); sl += t.xy; v2 += max(t.zw - t.xy * t.xy, vec2f(0.0));
    foam += textureSample(tDisp, sAniso, i.uv / L, c).w * FW[c];
  }
  let fp = textureSample(tFoam, sRep, i.uv / 9.0).r * 0.6 + textureSample(tFoam, sRep, i.uv / 3.1 + 0.37).r * 0.4;
  let cam = S.cam.xyz; let dv = cam - i.wpos; let dist = length(dv); let v = dv / dist;
  let U = S.wind.z;
  let sd = shoreD(i.uv);   // sf-drive: metres to the wall / the piles
  let near = 1.0 - smoothstep(0.0, 9.0, sd);
  // (against the wall the water is calmer: its slopes flattened a little, and a touch rougher from the backwash)
  sl *= mix(1.0, 0.6, near);
  let sig2 = v2 * mix(1.0, 0.6, near) + vec2f(0.0008 + 0.00012 * U + near * 0.002);   // capillaries below the smallest cascade
  let n = normalize(vec3f(-sl.x, 1.0, -sl.y));
  let su = S.sun.xyz;
  let shadow = cloudShadow(i.wpos);
  let lit = S.scene.w > 0.5;   // sf-drive: lit as the scene (its sky, its sun), fogged as the scene
  let Esun = select(AMB.sunIrr.rgb * shadow, S.scene.rgb * mix(1.0, shadow, 0.5), lit);
  let Esky = select(AMB.skyIrr.rgb, priorAt(vec3f(0.0, 1.0, 0.0), 4.0) * PI, lit);
  let sunD = select(su, S.sdir.xyz, lit);
  // sky + clouds reflected, blurred by the slope variance; planar reflection of real objects on top
  let nv = max(dot(n, v), 0.0);
  var r = reflect(-v, n); r.y = abs(r.y) + 0.002; r = normalize(r);
  let sg = sqrt(sig2.x + sig2.y);
  let envDims = vec2f(textureDimensions(tEnv));
  let lod = clamp(log2(max(sg * 2.2 * envDims.y / PI, 1.0)), 0.0, 7.0);
  let euv = vec2f(atan2(r.z, r.x) * (0.5 / PI) + 0.5, acos(clamp(r.y, -1.0, 1.0)) / PI);
  // (the scene's environment: its lobe lifted clear of the painted city below the horizon, which would darken the sea's far rim)
  let plod = clamp((log2(sg) + 5.6) * 0.9, 0.0, 3.0);
  var refl = select(textureSampleLevel(tEnv, sRep, euv, lod).rgb, priorAt(normalize(vec3f(r.x, max(r.y, 0.045 * (exp2(plod) - 1.0)), r.z)), plod), lit);
  if (S.screen.z > 0.5) {
    // the scene mirrored in the water: wobbled by the slopes, streaked down the screen by the chop (a lamp's long
    // reflection at night: a few taps along the vertical, wider the rougher the water)
    let suv = i.pos.xy * S.screen.xy + n.xz * vec2f(0.06, -0.06);
    var pl = textureSampleLevel(tPlanar, sRep, suv, 0.0);
    if (lit) {
      // (seen at a grazing angle the chop spreads a reflection down the screen ~1 / the view's elevation times more than across)
      let st = clamp(sg * 0.05 / max(v.y, 0.04), 0.0, 0.035) * vec2f(0.12, 1.0);
      pl = pl * 0.3 + (textureSampleLevel(tPlanar, sRep, suv + st, 1.0) + textureSampleLevel(tPlanar, sRep, suv - st, 1.0)) * 0.2
         + (textureSampleLevel(tPlanar, sRep, suv + st * 2.3, 1.0) + textureSampleLevel(tPlanar, sRep, suv - st * 2.3, 1.0)) * 0.15;
    }
    refl = mix(refl, pl.rgb, pl.a);
  }
  if (lit) { refl += bayLight(i.wpos, r, sg * 0.6); }
  let F = 0.02 + 0.98 * pow(1.0 - nv, 5.0) / (1.0 + 18.0 * (sig2.x + sig2.y));
  // the sun's glitter: Gaussian slope distribution around the mean slope, widened by the variance (Bruneton 2010)
  var spec = vec3f(0.0);
  if (sunD.y > -0.02) {
    let h = normalize(sunD + v);
    let zx = -h.x / h.y - sl.x; let zz = -h.z / h.y - sl.y;   // the facet slope that mirrors the sun, relative to the mean
    let p = exp(-0.5 * (zx * zx / sig2.x + zz * zz / sig2.y)) / (2.0 * PI * sqrt(sig2.x * sig2.y));
    let fh = 0.02 + 0.98 * pow(1.0 - sat(dot(v, h)), 5.0);
    let s2 = 0.5 * (sig2.x + sig2.y);
    let Gs = 1.0 / (1.0 + lambda(max(v.y, 0.01), s2) + lambda(max(sunD.y, 0.01), s2));
    spec = Esun * fh * p * Gs / (4.0 * pow(h.y, 4.0) * max(v.y, 0.02));
  }
  // light scattered up from under the surface: deep-water colour, plus sun through the thin crests (towards the sun);
  // sf-drive: the scene-lit water's colour is an albedo (lit / PI), turbid and greener against the shore
  var wc = S.water.rgb;
  if (lit) { wc = mix(wc, wc * vec3f(1.25, 1.2, 0.9), 1.0 - smoothstep(0.0, 30.0, sd)) / PI; spec *= S.shore2.w; }
  let Ed = Esky + Esun * max(sunD.y, 0.0);
  var body = Ed * wc;
  // crests lit from behind: light refracted into the thin top of a wave leaves towards the viewer (green-blue)
  let back = pow(sat(dot(-v, sunD)), 4.0) * sat(i.h * 0.3 + 0.05) * sat(1.0 - abs(n.y - 0.9) * 2.0);
  body += Esun * S.water.a * select(vec3f(0.0015, 0.018, 0.014), vec3f(0.004, 0.012, 0.009), lit) * back;
  var col = F * refl + (1.0 - F) * body + spec;
  let dbg = i32(S.tone.w);
  if (dbg == 1) { return outMain(refl); } if (dbg == 2) { return outMain(vec3f(F)); } if (dbg == 3) { return outMain(body * 10.0); }
  if (dbg == 4) { return outMain(textureSampleLevel(tEnv, sRep, euv, 0.0).rgb); } if (dbg == 5) { return outMain(spec); }
  if (dbg == 6) { return outMain(n * 0.5 + 0.5); }
  if (dbg == 7) { let pl = textureSampleLevel(tPlanar, sRep, i.pos.xy * S.screen.xy, 0.0); return outMain(pl.rgb + vec3f(0.0, 0.0, pl.a * 0.5 + S.screen.z * 0.2)); }
  if (dbg == 8) { return outMain(vec3f(sat(sd / 30.0), sat(-sd / 30.0), near)); }
  // foam: the Jacobian's coverage breaks up through a lacy pattern; diffuse white under sun and sky
  var fm = sat(foam * S.tone.z * 1.4 - (1.0 - fp) * 0.85) * sat(foam * 3.0);
  // sf-drive: the shore's foam: a white wash hugging the wall and the piles, and lines of old foam drifting off it
  if (S.shore2.x > 0.5 && sd < 20.0) {
    let t = S.sdir.w;
    let wob = textureSampleLevel(tFoam, sRep, i.uv / 23.0 + vec2f(t * 0.004, 0.0), 0.0).g;
    let ds = max(sd, 0.0);
    let wash = 1.0 - smoothstep(0.2, 1.6 + 1.8 * wob, ds + 0.35 * sin(t * 1.3 + i.uv.x * 0.21 + i.uv.y * 0.17));
    let ph = ds * 0.7 - t * 0.45 + wob * 5.0;
    let lines = smoothstep(0.55, 0.95, 0.5 + 0.5 * sin(ph)) * (1.0 - smoothstep(2.0, 13.0, ds));
    let lace = sat(fp * 1.6 - 0.15);
    let shoreF = sat(wash * mix(0.55, 1.0, lace) + lines * lace * 0.8) * S.shore2.z * select(1.0, 0.0, sd < -1.0);
    fm = max(fm, shoreF);
  }
  let foamC = (Esun * max(dot(n, sunD), 0.0) + Esky) * (0.85 / PI);
  col = mix(col, foamC, sat(fm));
  // sf-drive (round 28): over land (the sea's mask ~0: there the ocean has sunk 40 m under the ground) it is only ever seen
  // through the city's holes - tiles not streamed in yet after a teleport or a phone's drive back - and is shaded as the far
  // ground (a dull khaki lit by the sky and the sun, then fogged as the scene), not as water
  let land = 1.0 - smoothstep(0.02, 0.25, seaMask(i.uv));
  if (land > 0.0) { col = mix(col, (Esky + Esun * max(sunD.y, 0.0)) * vec3f(0.15, 0.14, 0.11) * select(1.0, 1.0 / PI, lit), land); }
  if (lit) {   // the scene's fog on the displayed colour; the linear target's alpha: the view depth (the renderer's SSR reads it)
    let l = max(col, vec3f(0.0));
    let vd = (S.viewProj * vec4f(i.wpos, 1.0)).w;
    return FOut(vec4f(sceneFog(srgbOETF(toneMap(l)), i.wpos, vd), 1.0), vec4f(l, vd));
  }
  return outMain(aerial(col, -v, dist));
}

struct SV { @builtin(position) pos: vec4f, @location(0) ndc: vec2f };
@vertex fn vsSky(@builtin(vertex_index) vi: u32) -> SV {
  let xy = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0;
  var o: SV; o.pos = vec4f(xy, 1.0, 1.0); o.ndc = xy; return o;
}
@fragment fn fsSky(i: SV) -> FOut {
  let w = S.invViewProj * vec4f(i.ndc, 1.0, 1.0);
  let d = normalize(w.xyz / w.w - S.cam.xyz);
  let dip = -sqrt(2.0 * max(S.misc.z, 0.5) / RGM);
  var col: vec3f;
  if (d.y > dip) {
    let cl = textureSampleLevel(tDome, sDome, domeUV(d), 0.0);
    col = (skyRad(d) + sunRadiance(d)) * cl.a + cl.rgb;
  } else {
    col = aerial(vec3f(0.0), d, 1e9);
  }
  return outMain(col);
}
`,
  VS = class {
    constructor(t, { quality: e } = {}) {
      ((this.r = t), (this.d = t.device));
      let s = e === "mobile";
      ((this.Q = s
        ? {
            N: 128,
            domeW: 1024,
            domeH: 256,
            steps: 48,
            seg: 160,
            rings: 300,
            phases: 64,
          }
        : {
            N: 256,
            domeW: 2048,
            domeH: 512,
            steps: 72,
            seg: 256,
            rings: 420,
            phases: 128,
          }),
        (this.params = {
          coverage: 0.45,
          cloudType: 0.75,
          cloudBottom: 1400,
          cloudTop: 4200,
          cloudDensity: 0.035,
          wind: 9,
          windDir: 30,
          fetch: 25e4,
          choppiness: 1.1,
          foam: 1,
          haze: 1,
          spread: 0.12,
          waterColor: [0.0024, 0.016, 0.026],
          crest: 0.9,
          gain: 1,
          cloudSpeed: 1,
        }),
        (this._frame = 0),
        (this._windOff = [0, 0]),
        (this._lastT = null),
        (this.ready = this._init().catch((n) => {
          ((this.failed = n), console.warn("SkyOcean: not compiled", n));
        })));
    }
    async _init() {
      let t = this.d,
        e = this.Q,
        s = GPUTextureUsage,
        n = (C, I, L = {}) =>
          t.createTexture({
            size: C,
            format: I,
            usage: s.TEXTURE_BINDING | s.STORAGE_BINDING,
            ...L,
          });
      ((this.ubuf = t.createBuffer({
        size: 768,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      })),
        (this.u = new Float32Array(192)),
        (this.spBuf = t.createBuffer({
          size: 16,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })),
        (this.amb = t.createBuffer({
          size: 80,
          usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
        })),
        (this.tTrans = n([256, 64], "rgba16float")),
        (this.tMs = n([32, 32], "rgba16float")),
        (this.tSky = n([192, 108], "rgba16float")),
        (this.tBase = n([128, 128, 128], "rgba8unorm", { dimension: "3d" })),
        (this.tDetail = n([32, 32, 32], "rgba8unorm", { dimension: "3d" })),
        (this.tWeather = n([512, 512], "rgba8unorm")),
        (this.tFoam = n([256, 256], "rgba8unorm")),
        (this.tDome = n([e.domeW, e.domeH], "rgba16float", {
          usage:
            s.TEXTURE_BINDING |
            s.STORAGE_BINDING |
            s.RENDER_ATTACHMENT |
            s.COPY_SRC,
        })),
        (this.envLevels = 8),
        (this.tEnv = n([512, 256], "rgba16float", {
          mipLevelCount: this.envLevels,
        })));
      let i = Math.log2(e.N) + 1;
      ((this.fftLevels = i),
        (this.tDisp = n([e.N, e.N, 3], "rgba16float", { mipLevelCount: i })),
        (this.tSlope = n([e.N, e.N, 3], "rgba16float", { mipLevelCount: i })));
      let a = e.N * e.N * 3;
      ((this.h0 = t.createBuffer({
        size: a * 8,
        usage: GPUBufferUsage.STORAGE,
      })),
        (this.fb = t.createBuffer({
          size: a * 32,
          usage: GPUBufferUsage.STORAGE,
        })),
        (this.foam = t.createBuffer({
          size: a * 4,
          usage: GPUBufferUsage.STORAGE,
        })),
        (this.sLin = t.createSampler({
          magFilter: "linear",
          minFilter: "linear",
          addressModeU: "clamp-to-edge",
          addressModeV: "clamp-to-edge",
        })),
        (this.sRep = t.createSampler({
          magFilter: "linear",
          minFilter: "linear",
          mipmapFilter: "linear",
          addressModeU: "repeat",
          addressModeV: "repeat",
          addressModeW: "repeat",
        })),
        (this.sAniso = t.createSampler({
          magFilter: "linear",
          minFilter: "linear",
          mipmapFilter: "linear",
          addressModeU: "repeat",
          addressModeV: "repeat",
          maxAnisotropy: 16,
        })),
        (this.sDome = t.createSampler({
          magFilter: "linear",
          minFilter: "linear",
          addressModeU: "repeat",
          addressModeV: "clamp-to-edge",
        })));
      let r = new Tm(),
        l = new Map(),
        c = (C, I) => {
          let L = t.createShaderModule({ code: C, label: I });
          return (l.set(L, { code: C, label: I }), L);
        },
        h = (C, I) =>
          I
            ? t.createShaderModule({
                ...l.get(C),
                code:
                  l.get(C).code +
                  `
// retry ${I}`,
              })
            : C,
        f = (C, I) =>
          r.run((L) =>
            t.createComputePipelineAsync({
              label: `so-${I}`,
              layout: "auto",
              compute: { module: h(C, L), entryPoint: I },
            }),
          ),
        u = (C, { targets: I, ...L }) =>
          r.run((F) => {
            let O = h(v, F);
            return t.createRenderPipelineAsync({
              ...L,
              label: `so-${C}`,
              vertex: { module: O, entryPoint: "vs" + C },
              fragment: { module: O, entryPoint: "fs" + C, targets: I },
            });
          }),
        d = c(
          b7 +
            `fn sat(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
fn remap(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return nlo + (v - lo) * (nhi - nlo) / (hi - lo); }`,
          "so-noise",
        ),
        p = c(put(e), "so-lut"),
        m = c(gut(e), "so-frame"),
        g = c(but, "so-mip"),
        b = c(xut(e), "so-fft"),
        v = c(vut(e), "so-draw"),
        x = await Promise.all([
          f(d, "base"),
          f(d, "detail"),
          f(d, "weather"),
          f(d, "foamTex"),
          f(p, "transLut"),
          f(p, "msLut"),
          f(p, "skyLut"),
          f(m, "ambient"),
          f(m, "clouds"),
          f(m, "env"),
          f(g, "mip"),
          f(g, "mip2"),
          f(b, "initSpectrum"),
          f(b, "spectrum"),
          f(b, "fftRows"),
          f(b, "fftCols"),
          f(b, "assemble"),
        ]);
      [
        this.pBase,
        this.pDetail,
        this.pWeather,
        this.pFoamTex,
        this.pTrans,
        this.pMs,
        this.pSkyLut,
        this.pAmb,
        this.pClouds,
        this.pEnv,
        this.pMip,
        this.pMip2,
        this.pInit,
        this.pSpec,
        this.pRows,
        this.pCols,
        this.pAsm,
      ] = x;
      let y = this.r,
        M = { count: y.samples },
        S = [{ format: y.format }, { format: "rgba16float" }],
        w = t.createBindGroupLayout({
          entries: [
            { binding: 0, visibility: 3, buffer: { type: "uniform" } },
            ...[1, 2, 3].map((C) => ({
              binding: C,
              visibility: 3,
              texture: {},
            })),
            { binding: 4, visibility: 3, sampler: {} },
            {
              binding: 5,
              visibility: 3,
              texture: { viewDimension: "2d-array" },
            },
            {
              binding: 6,
              visibility: 3,
              texture: { viewDimension: "2d-array" },
            },
            ...[7, 8, 9, 10, 11].map((C) => ({
              binding: C,
              visibility: 3,
              texture: {},
            })),
            ...[12, 13, 14].map((C) => ({
              binding: C,
              visibility: 3,
              sampler: {},
            })),
            {
              binding: 15,
              visibility: 3,
              buffer: { type: "read-only-storage" },
            },
            { binding: 16, visibility: 3, texture: {} },
            { binding: 17, visibility: 3, texture: {} },
          ],
        });
      this.drawLayout = w;
      let _ = t.createPipelineLayout({ bindGroupLayouts: [w] });
      [this.pOcean, this.pSky] = await Promise.all([
        u("Ocean", {
          layout: _,
          targets: S,
          primitive: { topology: "triangle-list", cullMode: "none" },
          multisample: M,
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !0,
            depthCompare: "less",
          },
        }),
        u("Sky", {
          layout: _,
          targets: S,
          primitive: { topology: "triangle-list" },
          multisample: M,
          depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: !1,
            depthCompare: "less-equal",
          },
        }),
      ]);
      let z = e.seg + 1,
        A = new Uint32Array(e.seg * (e.rings - 1) * 6),
        T = 0;
      for (let C = 0; C < e.rings - 1; C++)
        for (let I = 0; I < e.seg; I++) {
          let L = C * z + I,
            F = L + 1,
            O = L + z,
            B = O + 1;
          ((A[T++] = L),
            (A[T++] = O),
            (A[T++] = F),
            (A[T++] = F),
            (A[T++] = O),
            (A[T++] = B));
        }
      ((this.ibuf = t.createBuffer({
        size: A.byteLength,
        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
      })),
        t.queue.writeBuffer(this.ibuf, 0, A),
        (this.nIdx = A.length),
        this._groups(),
        this._writeUniforms({ camera: null }));
      let E = t.createCommandEncoder(),
        R = E.beginComputePass(),
        P = (C, I) =>
          t.createBindGroup({
            layout: C.getBindGroupLayout(0),
            entries: I.map(([L, F]) => ({ binding: L, resource: F })),
          });
      (R.setPipeline(this.pBase),
        R.setBindGroup(0, P(this.pBase, [[0, this.tBase.createView()]])),
        R.dispatchWorkgroups(32, 32, 32),
        R.setPipeline(this.pDetail),
        R.setBindGroup(0, P(this.pDetail, [[1, this.tDetail.createView()]])),
        R.dispatchWorkgroups(8, 8, 8),
        R.setPipeline(this.pWeather),
        R.setBindGroup(0, P(this.pWeather, [[2, this.tWeather.createView()]])),
        R.dispatchWorkgroups(64, 64),
        R.setPipeline(this.pFoamTex),
        R.setBindGroup(0, P(this.pFoamTex, [[3, this.tFoam.createView()]])),
        R.dispatchWorkgroups(32, 32),
        R.end(),
        E.beginRenderPass({
          colorAttachments: [
            {
              view: this.tDome.createView(),
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 0, g: 0, b: 0, a: 1 },
            },
          ],
        }).end(),
        t.queue.submit([E.finish()]),
        (this._lutsDirty = !0),
        (this._specKey = ""),
        (this._full = 8),
        (this.isReady = !0));
    }
    _groups() {
      let t = this.d,
        e = this.Q,
        s = (l, c) =>
          t.createBindGroup({
            layout: l.getBindGroupLayout(0),
            entries: c.map(([h, f]) => ({ binding: h, resource: f })),
          }),
        n = { buffer: this.ubuf };
      ((this.gTrans = s(this.pTrans, [
        [0, n],
        [5, this.tTrans.createView()],
      ])),
        (this.gMs = s(this.pMs, [
          [0, n],
          [1, this.tTrans.createView()],
          [4, this.sLin],
          [6, this.tMs.createView()],
        ])),
        (this.gSkyLut = s(this.pSkyLut, [
          [0, n],
          [1, this.tTrans.createView()],
          [2, this.tMs.createView()],
          [4, this.sLin],
          [7, this.tSky.createView()],
        ])));
      let i = [
        [0, n],
        [1, this.tTrans.createView()],
        [3, this.tSky.createView()],
        [4, this.sLin],
      ];
      this.gAmb = s(this.pAmb, [...i, [9, { buffer: this.amb }]]);
      let a = [
        [0, n],
        [3, this.tSky.createView()],
        [4, this.sLin],
      ];
      ((this.gClouds = s(this.pClouds, [
        ...a,
        [5, this.tBase.createView()],
        [6, this.tDetail.createView()],
        [7, this.tWeather.createView()],
        [8, this.sRep],
        [9, { buffer: this.amb }],
        [10, this.tDome.createView()],
      ])),
        (this.gEnv = s(this.pEnv, [
          ...a,
          [9, { buffer: this.amb }],
          [11, this.tDome.createView()],
          [12, this.tEnv.createView({ baseMipLevel: 0, mipLevelCount: 1 })],
          [13, this.sDome],
        ])));
      let r = (l, c, h = "2d-array") =>
        l.createView({ dimension: h, baseMipLevel: c, mipLevelCount: 1 });
      this.gEnvMips = [];
      for (let l = 1; l < this.envLevels; l++)
        this.gEnvMips.push(
          s(this.pMip, [
            [
              0,
              this.tEnv.createView({
                dimension: "2d-array",
                baseMipLevel: l - 1,
                mipLevelCount: 1,
              }),
            ],
            [
              1,
              this.tEnv.createView({
                dimension: "2d-array",
                baseMipLevel: l,
                mipLevelCount: 1,
              }),
            ],
          ]),
        );
      ((this.gInit = s(this.pInit, [
        [0, n],
        [1, { buffer: this.h0 }],
        [6, { buffer: this.spBuf }],
      ])),
        (this.gSpec = s(this.pSpec, [
          [0, n],
          [1, { buffer: this.h0 }],
          [2, { buffer: this.fb }],
        ])),
        (this.gRows = s(this.pRows, [[2, { buffer: this.fb }]])),
        (this.gCols = s(this.pCols, [[2, { buffer: this.fb }]])),
        (this.gAsm = s(this.pAsm, [
          [0, n],
          [2, { buffer: this.fb }],
          [3, { buffer: this.foam }],
          [4, r(this.tDisp, 0)],
          [5, r(this.tSlope, 0)],
        ])),
        (this.gFftMips = []));
      for (let l = 1; l < this.fftLevels; l++)
        this.gFftMips.push(
          s(this.pMip2, [
            [0, r(this.tDisp, l - 1)],
            [1, r(this.tDisp, l)],
            [2, r(this.tSlope, l - 1)],
            [3, r(this.tSlope, l)],
          ]),
        );
      this._drawGroup = null;
    }
    setShore(t) {
      if (
        (this._shoreTex?.destroy(),
        (this._shoreTex = null),
        (this.shore = t || null),
        (this._drawGroup = null),
        !t)
      )
        return;
      this._shoreTex = this.d.createTexture({
        size: [t.w, t.h],
        format: "r8unorm",
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      });
      let e = Math.ceil(t.w / 256) * 256;
      if (e === t.w)
        this.d.queue.writeTexture(
          { texture: this._shoreTex },
          t.data,
          { bytesPerRow: t.w },
          [t.w, t.h],
        );
      else {
        let s = new Uint8Array(e * t.h);
        for (let n = 0; n < t.h; n++)
          s.set(t.data.subarray(n * t.w, (n + 1) * t.w), n * e);
        this.d.queue.writeTexture(
          { texture: this._shoreTex },
          s,
          { bytesPerRow: e },
          [t.w, t.h],
        );
      }
    }
    _drawGroupFor(t) {
      let e =
        this.scene?.on &&
        this.r._nbPriorOwn &&
        this.r.neural?.priorTex === this.r._nbPriorOwn
          ? this.r._nbPriorOwn
          : null;
      if (
        ((this._lit = !!e),
        this._drawGroup && this._drawPlanar === t && this._drawPrior === e)
      )
        return this._drawGroup;
      let s = this.d;
      return (
        (this._drawPlanar = t),
        (this._drawPrior = e),
        (this._dummy2 ||= s.createTexture({
          size: [1, 1],
          format: "rgba8unorm",
          usage: GPUTextureUsage.TEXTURE_BINDING,
        })),
        (this._drawGroup = s.createBindGroup({
          layout: this.drawLayout,
          entries: [
            { binding: 0, resource: { buffer: this.ubuf } },
            { binding: 1, resource: this.tTrans.createView() },
            { binding: 2, resource: this.tMs.createView() },
            { binding: 3, resource: this.tSky.createView() },
            { binding: 4, resource: this.sLin },
            {
              binding: 5,
              resource: this.tDisp.createView({ dimension: "2d-array" }),
            },
            {
              binding: 6,
              resource: this.tSlope.createView({ dimension: "2d-array" }),
            },
            { binding: 7, resource: this.tEnv.createView() },
            { binding: 8, resource: this.tDome.createView() },
            { binding: 9, resource: this.tWeather.createView() },
            { binding: 10, resource: this.tFoam.createView() },
            { binding: 11, resource: t },
            { binding: 12, resource: this.sRep },
            { binding: 13, resource: this.sAniso },
            { binding: 14, resource: this.sDome },
            { binding: 15, resource: { buffer: this.amb } },
            {
              binding: 16,
              resource: (this._shoreTex || this._dummy2).createView(),
            },
            { binding: 17, resource: (e || this._dummy2).createView() },
          ],
        })),
        this._drawGroup
      );
    }
    _writeUniforms({
      camera: t,
      vp: e,
      ivp: s,
      sky: n,
      water: i,
      time: a,
      W: r = 1,
      H: l = 1,
      planar: c = !1,
      exposure: h = 1,
      toneMapping: f = 4,
      fogU: u = null,
    }) {
      let d = this.u,
        p = this.params,
        m = this.Q;
      (d.fill(0), e && (d.set(e, 0), d.set(s, 16)));
      let g = t
          ? t.matrixWorld.elements
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 1],
        b = i ? i.position.y : 0;
      ((d[32] = g[12]), (d[33] = g[13]), (d[34] = g[14]), (d[35] = a || 0));
      let v = n?.material?.uniforms?.sunPosition?.value ||
          i?.material?.uniforms?.sunDirection?.value || {
            x: 0.3,
            y: 0.3,
            z: -0.9,
          },
        x = Math.hypot(v.x, v.y, v.z) || 1;
      ((d[36] = v.x / x),
        (d[37] = v.y / x),
        (d[38] = v.z / x),
        (d[39] = (p.gain * this._autoGain(v.y / x)) / Math.max(h, 0.001)));
      let y = (p.windDir * Math.PI) / 180;
      ((d[40] = Math.cos(y)),
        (d[41] = Math.sin(y)),
        (d[42] = p.wind),
        (d[43] = p.choppiness),
        (d[44] = p.coverage),
        (d[45] = p.cloudType),
        (d[46] = this._windOff[0]),
        (d[47] = this._windOff[1]),
        (d[48] = p.cloudBottom),
        (d[49] = p.cloudTop),
        (d[50] = p.cloudDensity),
        (d[51] = this._frame % m.phases),
        (d[52] = h),
        (d[53] = f),
        (d[54] = p.foam),
        (d[55] = p.debug || 0),
        (d[56] = 1 / r),
        (d[57] = 1 / l),
        (d[58] = c ? 1 : 0),
        (d[59] = b));
      let M = m.N >= 256 ? [251, 37.3, 6.9] : [233, 31.7, 5.9];
      ((d[60] = M[0]),
        (d[61] = M[1]),
        (d[62] = M[2]),
        (d[63] = this._dt || 1 / 60),
        (d[64] = p.haze),
        (d[65] = 1),
        (d[66] = 0.1),
        (d[67] = (0.012 + 0.05 * p.haze) / 1e3),
        (d[68] = m.domeW),
        (d[69] = m.domeH),
        (d[70] = 1),
        (d[71] = m.steps));
      let S = Math.max(g[13] - b, 0.5),
        w = Math.sqrt(2 * 636e4 * S),
        _ = w * 1.25 + 2e3,
        z = 0.35;
      ((d[72] = z),
        (d[73] = Math.pow(_ / z, 1 / (m.rings - 1))),
        (d[74] = m.seg),
        (d[75] = m.rings),
        (d[76] = Math.exp(-(this._dt || 1 / 60) / 2.6)),
        (d[77] = 0.72 + 0.05 * Math.min(p.wind / 20, 1)),
        (d[78] = S),
        (d[79] = m.phases),
        (d[80] = p.waterColor[0]),
        (d[81] = p.waterColor[1]),
        (d[82] = p.waterColor[2]),
        (d[83] = p.crest));
      let A = this.shore,
        T = this.scene;
      (A &&
        this._shoreTex &&
        ((d[84] = A.x0),
        (d[85] = A.z0),
        (d[86] = 1 / (A.w * A.cell)),
        (d[87] = 1 / (A.h * A.cell)),
        (d[88] = 1),
        (d[89] = A.range),
        (d[90] = p.shoreFoam ?? 1)),
        (d[91] = p.glitter ?? 1),
        T &&
          this._lit &&
          ((d[92] = T.sun[0]),
          (d[93] = T.sun[1]),
          (d[94] = T.sun[2]),
          (d[95] = 1),
          (d[96] = T.dir[0]),
          (d[97] = T.dir[1]),
          (d[98] = T.dir[2])),
        (d[99] = (performance.now() / 1e3) % 3600),
        u && d.set(u, 100));
      let E = this.bayLights;
      (E &&
        this._lit &&
        ((d[120] = E.o[0]),
        (d[121] = E.o[1]),
        (d[122] = E.d[0]),
        (d[123] = E.d[1]),
        (d[124] = E.s0),
        (d[125] = E.s1),
        (d[126] = E.on ? 1 : 0),
        (d[127] = E.gain ?? 1),
        d.set(E.cable, 128),
        d.set(E.deck, 160)),
        this.d.queue.writeBuffer(this.ubuf, 0, d),
        (this._sunY = v.y / x),
        (this._camH = S));
    }
    _autoGain(t) {
      let e = Math.asin(Math.max(-1, Math.min(1, t))),
        s =
          1 /
          (Math.max(Math.sin(e), 0) +
            0.15 *
              Math.pow(Math.max(93.885 - (e * 180) / Math.PI, 0.1), -1.253)),
        i =
          Math.exp(-0.12 * Math.min(s, 40)) * Math.max(Math.sin(e), 0) +
          0.08 * Math.max(Math.sin(e + 0.1), 0.002) +
          0.004;
      return 1.5 / Math.pow(i, 0.68);
    }
    update(
      t,
      {
        camera: e,
        vp: s,
        ivp: n,
        sky: i,
        water: a,
        time: r,
        W: l,
        H: c,
        planar: h,
        exposure: f,
        toneMapping: u,
        timestampWrites: d,
        fogU: p,
      },
    ) {
      if (!this.isReady) return !1;
      let m = this.d,
        g = this.Q,
        b = this.params,
        v = performance.now() / 1e3;
      ((this._dt =
        this._lastT === null
          ? 1 / 60
          : Math.min(Math.max(v - this._lastT, 1 / 240), 0.1)),
        (this._lastT = v));
      let x = (b.windDir * Math.PI) / 180,
        y = b.wind * 0.6 * b.cloudSpeed * this._dt;
      ((this._windOff[0] += Math.cos(x) * y),
        (this._windOff[1] += Math.sin(x) * y));
      let M =
        [
          Math.round(e.matrixWorld.elements[13]),
          b.coverage,
          b.cloudType,
          b.cloudBottom,
          b.cloudTop,
          b.cloudDensity,
          b.haze,
        ].join() +
        "|" +
        (i?.material?.uniforms?.sunPosition?.value
          ?.toArray?.()
          .map((A) => A.toFixed(3))
          .join() || "");
      (M !== this._cloudKey &&
        ((this._cloudKey = M), (this._full = Math.max(this._full, 8))),
        this._writeUniforms({
          camera: e,
          vp: s,
          ivp: n,
          sky: i,
          water: a,
          time: r,
          W: l,
          H: c,
          planar: h,
          exposure: f,
          toneMapping: u,
          fogU: p,
        }));
      let S = t.beginComputePass(d ? { timestampWrites: d } : {});
      (this._lutsDirty &&
        (S.setPipeline(this.pTrans),
        S.setBindGroup(0, this.gTrans),
        S.dispatchWorkgroups(32, 8),
        S.setPipeline(this.pMs),
        S.setBindGroup(0, this.gMs),
        S.dispatchWorkgroups(4, 4),
        (this._lutsDirty = !1)),
        S.setPipeline(this.pSkyLut),
        S.setBindGroup(0, this.gSkyLut),
        S.dispatchWorkgroups(24, 14),
        S.setPipeline(this.pAmb),
        S.setBindGroup(0, this.gAmb),
        S.dispatchWorkgroups(1));
      let w = this._full > 0 ? g.phases / 8 : 1;
      ((this._full = Math.max(0, this._full - (w > 1 ? 1 : 0))),
        (this.u[51] = this._frame % g.phases),
        (this.u[70] = w),
        m.queue.writeBuffer(
          this.ubuf,
          204,
          new Float32Array([this._frame % g.phases]),
        ));
      let _ = this.skip || {};
      ((this._warm = (this._warm || 0) + 1),
        !_.clouds &&
          this._warm > 2 &&
          (S.setPipeline(this.pClouds),
          S.setBindGroup(0, this.gClouds),
          S.dispatchWorkgroups(
            Math.ceil((g.domeW * g.domeH) / g.phases / 8),
            1,
            w,
          )),
        (this._frame += w),
        _.env ||
          (S.setPipeline(this.pEnv),
          S.setBindGroup(0, this.gEnv),
          S.dispatchWorkgroups(64, 32),
          S.setPipeline(this.pMip),
          this.gEnvMips.forEach((A, T) => {
            (S.setBindGroup(0, A),
              S.dispatchWorkgroups(
                Math.ceil((512 >> (T + 1)) / 8),
                Math.ceil((256 >> (T + 1)) / 8),
                1,
              ));
          })));
      let z = [b.wind, b.windDir, b.fetch, b.spread].join();
      return (
        z !== this._specKey &&
          ((this._specKey = z),
          m.queue.writeBuffer(
            this.spBuf,
            0,
            new Float32Array([Math.max(b.wind, 0.5), b.fetch, b.spread, 1]),
          ),
          S.setPipeline(this.pInit),
          S.setBindGroup(0, this.gInit),
          S.dispatchWorkgroups(g.N / 8, g.N / 8, 3)),
        _.fft ||
          (S.setPipeline(this.pSpec),
          S.setBindGroup(0, this.gSpec),
          S.dispatchWorkgroups(g.N / 8, g.N / 8, 3),
          S.setPipeline(this.pRows),
          S.setBindGroup(0, this.gRows),
          S.dispatchWorkgroups(g.N, 3),
          S.setPipeline(this.pCols),
          S.setBindGroup(0, this.gCols),
          S.dispatchWorkgroups(g.N, 3),
          S.setPipeline(this.pAsm),
          S.setBindGroup(0, this.gAsm),
          S.dispatchWorkgroups(g.N / 8, g.N / 8, 3),
          S.setPipeline(this.pMip2),
          this.gFftMips.forEach((A, T) => {
            let E = Math.max(1, g.N >> (T + 1));
            (S.setBindGroup(0, A),
              S.dispatchWorkgroups(Math.ceil(E / 8), Math.ceil(E / 8), 3));
          })),
        S.end(),
        !0
      );
    }
    envKey() {
      return `${this._cloudKey}|${this._full > 0 ? "fill" + this._frame : Math.floor(this._frame / this.Q.phases)}`;
    }
    drawOcean(t, e) {
      (t.setPipeline(this.pOcean),
        t.setBindGroup(0, this._drawGroupFor(e)),
        t.setIndexBuffer(this.ibuf, "uint32"),
        t.drawIndexed(this.nIdx));
    }
    drawSky(t, e) {
      (t.setPipeline(this.pSky),
        t.setBindGroup(0, this._drawGroupFor(e)),
        t.draw(3));
    }
  };
