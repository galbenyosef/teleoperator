// app 27 — z4t
// Lines 46169-46320 of readable/app.pretty.js (statement-aligned).
var lU = (i) => `
struct CU {
  size: vec4f,      // box size (m) xyz, base height (m)
  res: vec4f,       // density grid xyz, max puffs
  shape: vec4f,     // noise tile (m), erosion, puff profile steepness, base fade (m)
  sunL: vec4f,      // towards the sun in cloud space, puff count
  drift: vec4f,     // base noise offset (m) xyz, _
};
@group(${i}) @binding(0) var<uniform> C: CU;
`,
  _4t =
    lU(1) +
    `
struct Puff { c: vec4f, e: vec4f };   // centre xyz, radius; vertical scale, strength, _, _
@group(1) @binding(1) var<storage, read> puffs: array<Puff>;
@group(1) @binding(2) var oDen: texture_storage_3d<rgba16float, write>;
@group(1) @binding(3) var tDen: texture_3d<f32>;
@group(1) @binding(4) var oLight: texture_storage_3d<rgba16float, write>;
fn smax(a: f32, b: f32, k: f32) -> f32 { let h = sat(0.5 + 0.5 * (b - a) / k); return mix(a, b, h) + k * h * (1.0 - h); }
// density (0..1) and distance to the nearest puff (m) for a voxel
@compute @workgroup_size(4, 4, 4) fn bake(@builtin(global_invocation_id) g: vec3u) {
  let n = vec3u(C.res.xyz); if (any(g >= n)) { return; }
  let p = (vec3f(g) + 0.5) / vec3f(n) * C.size.xyz;
  var cov = 0.0; var sdf = 1e6;
  for (var i = 0u; i < u32(C.sunL.w); i++) {
    let P = puffs[i];
    let q = (p - P.c.xyz) * vec3f(1.0, 1.0 / max(P.e.x, 0.05), 1.0);
    let d = length(q);
    sdf = min(sdf, (d - P.c.w) * min(P.e.x, 1.0));
    cov = smax(cov, sat((1.0 - d / P.c.w) * C.shape.z) * P.e.y, 0.1);
  }
  let base = sat((p.y - C.size.w) / C.shape.w);                 // flat bottom
  let top = sat((C.size.y - p.y) / (C.size.y * 0.06));
  cov = cov * base * top;
  var den = 0.0;
  if (cov > 0.0) {   // Nubis: billowy Perlin-Worley, eroded where the shape thins out
    let nz = textureSampleLevel(tNoise, sRep, (p + C.drift.xyz) / C.shape.x, 0.0);
    let wf = nz.g * 0.625 + nz.b * 0.25 + nz.a * 0.125;
    let nb = nz.r * 0.55 + wf * 0.45;
    den = mix(cov, sat(remap(nb, 1.0 - cov * 0.85, 1.0, 0.0, 1.0)), C.shape.y);
    den = sat(den * 2.2) * mix(0.8, 1.0, sat((p.y - C.size.w) / (C.size.y * 0.5)));   // crisp edges, a little thinner at the base
  }
  textureStore(oDen, g, vec4f(den, max(sdf, 0.0), cov, 0.0));
}
// optical depth (density x m) towards the sun and straight up, half resolution
@compute @workgroup_size(4, 4, 4) fn light(@builtin(global_invocation_id) g: vec3u) {
  let n = vec3u(textureDimensions(oLight)); if (any(g >= n)) { return; }
  let S = C.size.xyz;
  let p0 = (vec3f(g) + 0.5) / vec3f(n) * S;
  let ds = max(S.x, max(S.y, S.z)) / 96.0;
  var od = 0.0; var p = p0 + C.sunL.xyz * ds * 0.5;
  for (var i = 0; i < 160; i++) {
    if (any(p < vec3f(0.0)) || any(p > S)) { break; }
    od += textureSampleLevel(tDen, sClamp, p / S, 0.0).r * ds;
    p += C.sunL.xyz * ds;
  }
  var ou = 0.0; p = p0 + vec3f(0.0, ds, 0.0);
  for (var i = 0; i < 64; i++) {
    if (p.y > S.y) { break; }
    ou += textureSampleLevel(tDen, sClamp, p / S, 0.0).r * ds * 1.5;
    p.y += ds * 1.5;
  }
  textureStore(oLight, g, vec4f(od, ou, 0.0, 0.0));
}
`,
  z4t =
    lU(3) +
    W6 +
    `
struct CR {
  w2l: mat4x4f,     // world -> cloud space (metres, box from 0 to size)
  look: vec4f,      // extinction (1/m at density 1), detail erosion, detail tile (m), ambient
  wind: vec4f,      // detail offset (m) xyz, aerial perspective distance (m)
  rect: vec4f,      // half-resolution rectangle
  misc: vec4f,      // world units per cloud metre, max steps, sky-ocean sun, powder
  wind2: vec4f,     // sun brightness, _, _, _
};
@group(2) @binding(0) var<uniform> R: CR;
@group(2) @binding(1) var tDen: texture_3d<f32>;
@group(2) @binding(2) var tLight: texture_3d<f32>;
fn detailAt(p: vec3f) -> f32 {
  let d = textureSampleLevel(tDetail, sRep, (p + R.wind.xyz) / R.look.z, 0.0);
  return d.r * 0.625 + d.g * 0.25 + d.b * 0.125;
}
@compute @workgroup_size(8, 8) fn march(@builtin(global_invocation_id) g: vec3u) {
  if (any(g.xy >= vec2u(R.rect.zw))) { return; }
  let q = vec2i(g.xy) + vec2i(R.rect.xy);
  if (any(vec2f(q) >= G.half.xy)) { return; }
  var acc = volRead(q);
  if (acc.a < 0.004) { return; }
  let rd = pixelDir(halfPx(q));
  let o = (R.w2l * vec4f(F.camPos.xyz, 1.0)).xyz; let dd0 = (R.w2l * vec4f(rd, 0.0)).xyz;
  let sc = length(dd0); let dd = dd0 / sc;                  // cloud-space unit direction; t in cloud metres
  let S = C.size.xyz;
  let tb = rayBox(o, dd, vec3f(0.0), S);
  let t0 = max(tb.x, 0.0); let t1 = min(tb.y, textureLoad(ioD, q, 0).r * sc);
  if (t1 <= t0) { return; }
  let vox = S.y / C.res.y;
  let fine = vox * 0.55;
  let cth = dot(dd, C.sunL.xyz);
  var ph: array<f32, 5>;
  // dual lobe (silver lining forwards, a real backward lobe), the higher scattering orders progressively isotropic
  for (var k = 0; k < 5; k++) { let c = pow(0.5, f32(k)); ph[k] = mix(hg(cth, 0.8 * c), hg(cth, -0.3 * c), 0.4); }
  let powderW = sat(0.5 - 0.5 * cth);
  let sunC = select(VLt.sunIrr.rgb, VLt.sunHigh.rgb, R.misc.z > 0.5) * VLt.sunDir.w * R.wind2.x;
  let skyA = VLt.skyIrr.rgb / PI * R.look.w; let gndA = VLt.groundIrr.rgb / PI * R.look.w;
  let sig = R.look.x;
  var L = vec3f(0.0); var T = 1.0; var tw = 0.0; var ws = 0.0;
  var t = t0 + fine * ign(vec2f(q) + vec2f(fract(G.time.z * 0.618034)) * vec2f(97.0, 131.0));
  let nmax = i32(R.misc.y);
  for (var i = 0; i < nmax; i++) {
    if (t > t1 || T < 0.01) { break; }
    let p = o + dd * t;
    let b = textureSampleLevel(tDen, sClamp, p / S, 0.0);
    if (b.r < 0.004) {
      t += max(b.g * 0.8, fine * 1.5);   // sphere tracing through empty sky
      continue;
    }
    let den = sat(remap(b.r, detailAt(p) * R.look.y, 1.0, 0.0, 1.0));
    if (den > 0.003) {
      // light: two near samples towards the sun with the fine erosion (the billows shadow each other), the baked optical
      // depth beyond them
      let lt = textureSampleLevel(tLight, sClamp, p / S, 0.0);
      let q1 = p + C.sunL.xyz * vox * 0.8; let q2 = p + C.sunL.xyz * vox * 2.6;
      let n1 = sat(remap(textureSampleLevel(tDen, sClamp, q1 / S, 0.0).r, detailAt(q1) * R.look.y, 1.0, 0.0, 1.0));
      let n2 = sat(remap(textureSampleLevel(tDen, sClamp, q2 / S, 0.0).r, detailAt(q2) * R.look.y, 1.0, 0.0, 1.0));
      let far = textureSampleLevel(tLight, sClamp, (p + C.sunL.xyz * vox * 3.4) / S, 0.0).r;
      let od = (n1 * vox * 1.6 + n2 * vox * 1.8 + far) * sig;
      var sl = 0.0;
      for (var k = 0; k < 5; k++) { sl += pow(0.7, f32(k)) * ph[k] * exp(-pow(0.3, f32(k)) * od); }
      let powder = mix(1.0, 1.0 - exp(-den * sig * 2.0 * vox), powderW * R.misc.w);
      let hf = sat(p.y / S.y);
      let amb = skyA * exp(-lt.g * sig * 0.25) * mix(0.55, 1.2, hf) + gndA * (1.0 - hf) * 0.6;
      let e = den * sig;
      let Ssrc = e * (sunC * sl * powder + amb);
      let st = exp(-e * fine);
      L += T * Ssrc * (1.0 - st) / e;
      let wa = T * (1.0 - st); tw += wa * t; ws += wa;
      T *= st;
    }
    t += fine;
  }
  if (T > 0.999) { return; }
  // aerial perspective: fade what the cloud adds towards the horizon colour by its distance (world metres)
  let dist = (tw / max(ws, 1e-6)) / sc;
  let air = exp(-dist / R.wind.w);
  let hz = select(VLt.skyIrr.rgb / PI, VLt.horizon.rgb, G.misc.x > 0.5);
  L = L * air + hz * (1.0 - T) * (1.0 - air);
  acc = vec4f(acc.rgb + acc.a * L, acc.a * T);
  volWrite(q, acc);
}
`;
