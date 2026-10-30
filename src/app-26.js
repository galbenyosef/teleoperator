// app 26 — math
// Lines 46057-46375 of readable/app.pretty.js (statement-aligned).
es();
var x7 = `
struct VG {
  time: vec4f,     // seconds, dt, frame, _
  screen: vec4f,   // main target W, H, 1/W, 1/H
  half: vec4f,     // half-resolution volume buffer W, H, 1/W, 1/H
  sun: vec4f,      // directional light colour x intensity (irradiance), 1 = a sun
  misc: vec4f,     // sky-ocean active, env intensity, _, _
  sunDir: vec4f,   // towards the sun (the sky's sun when a Sky is in the scene), sun above the horizon
};
struct VL { sunIrr: vec4f, skyIrr: vec4f, groundIrr: vec4f, sunDir: vec4f, horizon: vec4f, sunHigh: vec4f };
@group(0) @binding(2) var<uniform> G: VG;
@group(0) @binding(3) var<storage, read> VLt: VL;
@group(0) @binding(5) var sClamp: sampler;
@group(0) @binding(6) var sRep: sampler;
@group(0) @binding(7) var tNoise: texture_3d<f32>;    // 128^3 tiling: Perlin-Worley, Worley fbm x3
@group(0) @binding(8) var tDetail: texture_3d<f32>;   // 32^3 tiling: Worley fbm x3
@group(0) @binding(9) var tBlackbody: texture_2d<f32>; // 256 x 1: rgb at unit luminance, log10 luminance
fn sat(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
fn remap(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return nlo + (v - lo) * (nhi - nlo) / (hi - lo); }
fn ign(p: vec2f) -> f32 { return fract(52.9829189 * fract(dot(p, vec2f(0.06711056, 0.00583715)))); }
fn hg(c: f32, g: f32) -> f32 { let g2 = g * g; return (1.0 - g2) / (4.0 * PI * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
fn lum(c: vec3f) -> f32 { return dot(c, vec3f(0.2126, 0.7152, 0.0722)); }
// normalised temperature (0 = 600 K .. 1 = 3000 K) -> emitted radiance colour; k compresses Planck's range (1 = physical)
fn blackbody(t: f32, k: f32) -> vec3f {
  let b = textureSampleLevel(tBlackbody, sClamp, vec2f(clamp(t, 0.0, 1.0) * (255.0 / 256.0) + 0.5 / 256.0, 0.5), 0.0);
  return b.rgb * pow(10.0, b.a * k);
}
fn rayBox(ro: vec3f, rd: vec3f, bmin: vec3f, bmax: vec3f) -> vec2f {
  let inv = 1.0 / select(rd, vec3f(1e-9), abs(rd) < vec3f(1e-9));
  let a = (bmin - ro) * inv; let b = (bmax - ro) * inv;
  let lo = min(a, b); let hi = max(a, b);
  return vec2f(max(max(lo.x, lo.y), lo.z), min(min(hi.x, hi.y), hi.z));
}
// camera ray through a main-target pixel position (pixels, y down)
fn pixelDir(px: vec2f) -> vec3f {
  let ndc = vec2f(px.x * G.screen.z * 2.0 - 1.0, 1.0 - px.y * G.screen.w * 2.0);
  let h = F.invViewProj * vec4f(ndc, 1.0, 1.0);
  return normalize(h.xyz / h.w - F.camPos.xyz);
}
// distance along the camera ray to a depth-buffer value at a pixel
fn depthDist(px: vec2f, z: f32) -> f32 {
  if (z >= 1.0) { return 1e9; }
  let ndc = vec2f(px.x * G.screen.z * 2.0 - 1.0, 1.0 - px.y * G.screen.w * 2.0);
  let h = F.invViewProj * vec4f(ndc, z, 1.0);
  return length(h.xyz / h.w - F.camPos.xyz);
}
fn ambientDir(d: vec3f) -> vec3f {   // sky / ground radiance for a direction (irradiance / pi, blended by d.y)
  return mix(VLt.groundIrr.rgb, VLt.skyIrr.rgb, d.y * 0.5 + 0.5) / PI;
}
`,
  lV = `
struct Amb { skyIrr: vec4f, sunIrr: vec4f, horizon: vec4f, sunCloud: vec4f, zenith: vec4f };
@group(1) @binding(0) var<storage, read> AMB: Amb;
@group(1) @binding(1) var<storage, read_write> OUT: VL;
@group(1) @binding(2) var tEnvP: texture_2d_array<f32>;
var<workgroup> acc: array<vec4f, 64>;
@compute @workgroup_size(64) fn lightPrep(@builtin(local_invocation_index) li: u32) {
  // env: 64 directions, cosine weighted over each hemisphere (broadest prior level)
  let layers = textureNumLayers(tEnvP);
  let k = f32(li);
  let phi = k * 2.39996323; let z = (k + 0.5) / 64.0;
  let r = sqrt(1.0 - z * z);
  let du = vec3f(cos(phi) * r, z, sin(phi) * r);
  let uvU = equirectUV(du); let uvD = equirectUV(vec3f(du.x, -du.y, du.z));
  let ly = max(i32(layers) - 1, 0);
  let eu = textureSampleLevel(tEnvP, sRep, uvU, ly, 0.0).rgb;
  let ed = textureSampleLevel(tEnvP, sRep, uvD, ly, 0.0).rgb;
  acc[li] = vec4f(eu * z, 0.0); workgroupBarrier();
  var s = vec3f(0.0); if (li == 0u) { for (var i = 0u; i < 64u; i++) { s += acc[i].rgb; } } workgroupBarrier();
  acc[li] = vec4f(ed * z, 0.0); workgroupBarrier();
  if (li != 0u) { return; }
  var g = vec3f(0.0); for (var i = 0u; i < 64u; i++) { g += acc[i].rgb; }
  // sum(L cos) / N x 2 pi = irradiance
  let envI = G.misc.y * select(0.0, 1.0, layers > 0u);
  let skyE = s * (2.0 * PI / 64.0) * envI; let gndE = g * (2.0 * PI / 64.0) * envI;
  let hemiS = F.hemiSky.rgb; let hemiG = F.hemiGround.rgb; let amb = F.ambient.rgb;
  var o: VL;
  o.sunDir = vec4f(normalize(G.sunDir.xyz + vec3f(0.0, 1e-6, 0.0)), G.sunDir.w);
  if (G.misc.x > 0.5) {   // sky-ocean: its sun and sky, and the sea as the ground (dark, bluish)
    o.sunIrr = vec4f(AMB.sunIrr.rgb, 1.0); o.skyIrr = vec4f(AMB.skyIrr.rgb + hemiS + amb, 0.0);
    o.groundIrr = vec4f((AMB.skyIrr.rgb * 0.06 + AMB.sunIrr.rgb * max(G.sunDir.y, 0.0) * 0.03) + hemiG + amb, 0.0);
    o.horizon = vec4f(AMB.horizon.rgb, 1.0); o.sunHigh = vec4f(AMB.sunCloud.rgb, 0.0);
  } else {
    let sunE = G.sun.rgb * G.sunDir.w;
    o.sunIrr = vec4f(sunE, 1.0); o.sunHigh = vec4f(sunE, 0.0);
    o.skyIrr = vec4f(skyE + hemiS + amb, 0.0);
    o.groundIrr = vec4f(gndE + hemiG + amb + sunE * max(G.sunDir.y, 0.0) * 0.12, 0.0);
    o.horizon = vec4f(F.fog.rgb, F.fog.w);
  }
  OUT = o;
}
`;
function cV(o = 256) {
  let t = (c, h, f, u) => {
      let d = (c - h) / (c < h ? f : u);
      return Math.exp(-0.5 * d * d);
    },
    e = (c) =>
      1.056 * t(c, 599.8, 37.9, 31) +
      0.362 * t(c, 442, 16, 26.7) -
      0.065 * t(c, 501.1, 20.4, 26.2),
    s = (c) =>
      0.821 * t(c, 568.8, 46.9, 40.5) + 0.286 * t(c, 530.9, 16.3, 31.1),
    n = (c) => 1.217 * t(c, 437, 11.8, 36) + 0.681 * t(c, 459, 26, 13.8),
    i = (c, h) => {
      let f = c * 1e-9;
      return 1 / (Math.pow(f, 5) * (Math.exp(0.014388 / (f * h)) - 1));
    },
    a = (c) => {
      let h = 0,
        f = 0,
        u = 0;
      for (let d = 380; d <= 780; d += 5) {
        let p = i(d, c);
        ((h += p * e(d)), (f += p * s(d)), (u += p * n(d)));
      }
      return [h, f, u];
    },
    r = a(1500)[1],
    l = new Float32Array(o * 4);
  for (let c = 0; c < o; c++) {
    let h = 600 + (2400 * c) / (o - 1),
      [f, u, d] = a(h),
      p = 3.2406 * f - 1.5372 * u - 0.4986 * d,
      m = -0.9689 * f + 1.8758 * u + 0.0415 * d,
      g = 0.0557 * f - 0.204 * u + 1.057 * d;
    ((p = Math.max(p, 0)), (m = Math.max(m, 0)), (g = Math.max(g, 0)));
    let b = 0.2126 * p + 0.7152 * m + 0.0722 * g;
    ((l[4 * c] = p / b),
      (l[4 * c + 1] = m / b),
      (l[4 * c + 2] = g / b),
      (l[4 * c + 3] = Math.log10(u / r)));
  }
  return l;
}
function hV(o) {
  let t = new Uint16Array(o.length),
    e = new Float32Array(1),
    s = new Uint32Array(e.buffer);
  for (let n = 0; n < o.length; n++) {
    e[0] = o[n];
    let i = s[0],
      a = (i >>> 16) & 32768,
      r = ((i >>> 23) & 255) - 127 + 15,
      l = i & 8388607;
    r <= 0
      ? (t[n] = a)
      : r >= 31
        ? (t[n] = a | 31744)
        : (t[n] = a | (r << 10) | (l >>> 13));
  }
  return t;
}
var K0 = {
    UNIFORM: 64,
    STORAGE: 128,
    COPY_DST: 8,
    COPY_SRC: 4,
    MAP_READ: 1,
    VERTEX: 32,
    INDEX: 16,
  },
  za = { TB: 4, SB: 8, RA: 16, CD: 2, CS: 1 };
function Cu(o, t, e, s) {
  return o.createBuffer({
    size: Math.max(16, Math.ceil(t / 16) * 16),
    usage: e,
    label: s,
  });
}
function Sl(o, t, e, s, n = {}) {
  return o.createTexture({ size: t, format: e, usage: s, ...n });
}
function k0(o, t, e) {
  return o.createBindGroup({
    layout: t,
    entries: e.map(([s, n]) => ({
      binding: s,
      resource: n && n instanceof GPUBuffer ? { buffer: n } : n,
    })),
  });
}
var qS = `
@group(1) @binding(0) var ioRG: texture_storage_2d<r32uint, read_write>;
@group(1) @binding(1) var ioBA: texture_storage_2d<r32uint, read_write>;
@group(1) @binding(2) var ioD: texture_2d<f32>;
@group(1) @binding(3) var ioRH: texture_storage_2d<r32uint, read_write>;   // TAA reactive mask (flicker), heat haze (hot air along the ray)
fn reactWrite(q: vec2i, v: f32) {
  if (v > 0.004) { let o = unpack2x16float(textureLoad(ioRH, q).x); textureStore(ioRH, q, vec4u(pack2x16float(vec2f(max(o.x, v), o.y)), 0u, 0u, 0u)); }
}
fn hazeAdd(q: vec2i, v: f32) {
  if (v > 1e-4) { let o = unpack2x16float(textureLoad(ioRH, q).x); textureStore(ioRH, q, vec4u(pack2x16float(vec2f(o.x, o.y + v)), 0u, 0u, 0u)); }
}
fn volRead(q: vec2i) -> vec4f { return vec4f(unpack2x16float(textureLoad(ioRG, q).x), unpack2x16float(textureLoad(ioBA, q).x)); }
fn volWrite(q: vec2i, v: vec4f) {
  textureStore(ioRG, q, vec4u(pack2x16float(v.rg), 0u, 0u, 0u)); textureStore(ioBA, q, vec4u(pack2x16float(v.ba), 0u, 0u, 0u));
}
// half-resolution texel -> main-target pixel position of its centre
fn halfPx(q: vec2i) -> vec2f { return (vec2f(q) + 0.5) * 2.0; }
`;
var xzt =
  qS +
  `
struct FRU {
  w2g: mat4x4f,     // world -> grid uvw
  res: vec4f,       // nx, ny, nz, world cell size (m)
  look: vec4f,      // soot extinction (1/m at density 1), albedo, fire intensity, emission compression
  smoke: vec4f,     // soot tint rgb, fire-light strength on smoke
  rect: vec4f,      // half-resolution rectangle x0, y0, w, h
  flame: vec4f,     // flame noise (heat units), noise frequency (1/m), flow period (s), max steps
  misc: vec4f,      // sun phase g, ambient scale, fuel extinction, step (cells)
  misc2: vec4f,     // smoke erosion (0..1), heat where flames start to glow, flame edge width (heat), erosion density scale
  ms: vec4f,        // multiple scattering (0..1), powder (0..1), fine-edge frequency multiplier, vertical stretch of flame noise
  fl: vec4f,        // flame gain, heat where hot gas glows without burning, glow ramp, colour noise (heat units)
  fl2: vec4f,       // flame temperature (heat units), TAA reactive (0..1), heat haze (per metre of hot air), _
};
@group(2) @binding(0) var<uniform> R: FRU;
@group(2) @binding(1) var tS: texture_3d<f32>;
@group(2) @binding(2) var tL: texture_3d<f32>;
@group(2) @binding(3) var tGl: texture_3d<f32>;
@group(2) @binding(4) var tV: texture_3d<f32>;
// noise carried by the flow (two phases, each dragged along the local velocity for one period, crossfaded where the other
// resets): detail that moves with the gas instead of sliding through it
fn flowN(pm: vec3f, vm0: vec3f, fr: vec3f) -> vec4f {
  let per = R.flame.z; let tt = G.time.x / per;
  // drag at most a third of a noise tile per period: fast jets would otherwise shear the noise into streaks
  let dm = 0.35 / fr.x; let vl = length(vm0) * per;
  let vm = vm0 * min(1.0, dm / max(vl, 1e-4));
  let ph = fract(tt); let ph2 = fract(tt + 0.5);
  let w = 1.0 - abs(2.0 * ph - 1.0);
  let a = textureSampleLevel(tNoise, sRep, (pm - vm * (ph * per)) * fr + vec3f(0.13, 0.71, 0.37) * floor(tt), 0.0);
  let b = textureSampleLevel(tNoise, sRep, (pm - vm * (ph2 * per)) * fr + vec3f(0.57, 0.29, 0.83) * floor(tt + 0.5), 0.0);
  return (a * w + b * (1.0 - w) - 0.5) * inverseSqrt(w * w + (1.0 - w) * (1.0 - w)) + 0.5;
}
fn emissionR(drive: f32, t: f32) -> vec3f {   // flame radiance per metre: blackbody, with a steep onset (flames have edges)
  let e = smoothstep(R.misc2.y, R.misc2.y + R.misc2.z, drive);
  if (e <= 0.0) { return vec3f(0.0); }
  return blackbody(t * 0.625, R.look.w) * R.look.z * e;
}
@compute @workgroup_size(8, 8) fn march(@builtin(global_invocation_id) g: vec3u) {
  if (any(g.xy >= vec2u(R.rect.zw))) { return; }
  let q = vec2i(g.xy) + vec2i(R.rect.xy);
  if (any(vec2f(q) >= G.half.xy)) { return; }
  var acc = volRead(q);
  if (acc.a < 0.004) { return; }
  let rd = pixelDir(halfPx(q)); let ro = F.camPos.xyz;
  let o = (R.w2g * vec4f(ro, 1.0)).xyz; let dd = (R.w2g * vec4f(rd, 0.0)).xyz;
  let tb = rayBox(o, dd, vec3f(0.0), vec3f(1.0));
  let t0 = max(tb.x, 0.0); let t1 = min(tb.y, textureLoad(ioD, q, 0).r);
  if (t1 <= t0) { return; }
  let h = R.res.w; let st = h * R.misc.w;
  let nmax = i32(R.flame.w);
  var t = t0 + st * ign(vec2f(q) + vec2f(fract(G.time.z * 0.618034)) * vec2f(113.0, 71.0));
  let boxM = R.res.xyz * h;                          // grid uvw -> metres
  let cth = dot(rd, VLt.sunDir.xyz);
  // sun: multiple-scattering octaves (Wrenninge 2013): each octave scatters less forward and sees a thinner medium
  let g0 = R.misc.x;
  let ph0 = mix(hg(cth, g0), hg(cth, -0.25), 0.25);
  let ph1 = mix(hg(cth, g0 * 0.5), hg(cth, -0.12), 0.25);
  let ph2 = 1.0 / (4.0 * PI);
  let msA = R.ms.x * 0.6;
  let sunE = VLt.sunIrr.rgb; let skyL = VLt.skyIrr.rgb / PI * R.misc.y; let gndL = VLt.groundIrr.rgb / PI * R.misc.y;
  let fr = vec3f(R.flame.y, R.flame.y * R.ms.w, R.flame.y);
  var L = vec3f(0.0); var T = 1.0; var haze = 0.0;
  for (var i = 0; i < nmax; i++) {
    if (t > t1 || T < 0.01) { break; }
    let u = o + dd * t;
    let gl = textureSampleLevel(tGl, sClamp, u, 0.0);
    if (gl.a < 0.012) { t += st * 5.0; continue; }   // empty quarter cell (occupancy is its 2x2x2 max): skip ahead
    let s = textureSampleLevel(tS, sClamp, u, 0.0);
    var soot = s.r; var heat = max(s.g, R.fl2.x * sat(s.a * R.fl.x * 1.5));   // burning gas: the flame's own temperature
    var drive = max(s.a * R.fl.x, sat((s.g - R.fl.y) / max(R.fl.z, 1e-3)));
    // smoke without flames is smooth at the step scale: longer steps there, full resolution where flames are
    let stp = st * mix(mix(2.6, 1.8, sat(soot * 8.0)), 1.0, sat(drive * 8.0));   // thin smoke is smooth: long steps
    let flameZone = drive > 0.02;
    let erodeZone = R.misc2.x > 0.0 && soot > 1e-4 && soot < R.misc2.w * 1.6;
    if (flameZone || erodeZone) {
      let vm = textureSampleLevel(tV, sClamp, u, 0.0).xyz * h;          // m/s
      let n = flowN(u * boxM, vm, fr);
      // flames: the heat field wrinkled by the flow noise, big lobes plus fine licks, strongest at the flame's edge
      let nf = n.r * 0.55 + n.g * 0.3 + n.b * 0.15 - 0.5;
      drive = drive + nf * R.flame.x * sat(drive * 3.0 + 0.15);
      heat = heat + nf * R.fl.w;
      // smoke: billows eroded out of the density by Perlin-Worley (as the cloud), fine Worley at the rims
      if (erodeZone) {
        let fine = textureSampleLevel(tDetail, sRep, (u * boxM - vm * 0.25) * fr * R.ms.z, 0.0);
        let en = mix(n.r, n.g * 0.625 + n.b * 0.25 + n.a * 0.125, 0.35) * 0.8 + (fine.r * 0.6 + fine.g * 0.4) * 0.2;
        let b0 = sat(soot / R.misc2.w);
        let e = R.misc2.x * (1.0 - en) * (1.0 - 0.6 * b0) * smoothstep(0.02, 0.3, b0);   // thin haze stays smooth (no speckle)
        let b1 = sat((b0 - e) / max(1.0 - e, 1e-3));
        soot = soot * b1 / max(b0, 1e-4);
      }
    }
    let ext = soot * R.look.x + s.b * R.misc.z;
    var src = emissionR(drive, heat);
    if (ext > 1e-5) {
      let lt = textureSampleLevel(tL, sClamp, u, 0.0);
      let tsun = max(lt.r, 0.0);
      let t1s = sqrt(tsun); let t2s = sqrt(t1s);
      var sunS = ph0 * tsun + msA * ph1 * t1s + msA * msA * ph2 * t2s;
      // powder: thin rims facing away from the sun catch less in-scattered light (dark edges on billows seen against it)
      sunS *= mix(1.0, 1.0 - exp(-soot * R.look.x * h * 6.0), R.ms.y * (0.5 - 0.5 * cth));
      let amb = skyL * (0.3 + 0.7 * lt.g) * (1.0 + msA) + gndL * 0.5;
      src += soot * R.look.x * R.look.y * R.smoke.rgb * (sunE * sunS + amb + gl.rgb * R.smoke.w);
    }
    haze += sat(s.g - 0.05) * T * stp;   // hot air in front of whatever is behind it
    let tr = exp(-ext * stp);
    L += T * src * select(stp, (1.0 - tr) / max(ext, 1e-6), ext > 1e-4);
    T *= tr;
    t += stp;
  }
  let hz = haze * R.fl2.z * acc.a;
  reactWrite(q, max(R.fl2.y * (1.0 - T), sat(hz * 3.0)) * acc.a);
  hazeAdd(q, hz);
  acc = vec4f(acc.rgb + acc.a * L, acc.a * T);
  volWrite(q, acc);
}
`;
