// app 37 — ndc
// Lines 49341-49881 of readable/app.pretty.js (statement-aligned).
function JA(i = !1, t = "", e = !1) {
  let s = (o, a) =>
      e ? `@group(3) @binding(${a}) var ${o}: texture_2d<f32>;` : "",
    n = (o, a) => (e ? `textureSample(${o}, matSamp, uv)` : a);
  return (
    Ec +
    OU +
    tR(i, e) +
    (t || pU + mU + gU) +
    `
// sf-drive: material hooks may also set the surface (gHK: roughness, metalness, _, on) and add emission (gHE)
var<private> gHK: vec4f = vec4f(1.0, 0.0, 0.0, 0.0);
// sf-drive (tyres49): a hook's scale on the dielectric base's specular (1: as is). A clear-coated paint's pigment layer is
// a diffuser under the coat - the coat (gHC) is its reflection; F0 4 % on the base too drew a second, broad sun lobe over
// the coat's (a burnt blob on the cars' tailgates, the dark paints grey)
var<private> gHF0: f32 = 1.0;
// sf-drive (round 20): hooks may lay a clear coat over the surface (gHC: its weight, its roughness), on the shading normal
var<private> gHC: vec2f = vec2f(0.0);
// sf-drive (round 21): hooks may weaken the screen-space AO on their surface (gHSS: 1 as is, 0 none) - the generated cars'
// lumpy, thin-shelled meshes occluded themselves in blotches, the clear coat's specular occlusion showing every one
var<private> gHSS: f32 = 1.0;
var<private> gHE: vec3f = vec3f(0.0);
var<private> gHN: vec4f = vec4f(0.0);   // sf-drive: a hook's world-space normal offset (w = on), added after the detail normal
// sf-drive: what a hook's glass reflects where its reflected ray meets the city (not the sky): the facade's albedo and
// that share (a), lit here like a facade facing back along the ray (the environment's diffuse light, the sun), plus its
// own light (gHRe: lit windows at night); the screen-space reflection still wins where it hits
var<private> gHR: vec4f = vec4f(0.0);
var<private> gHRe: vec3f = vec3f(0.0);
var<private> gHCR: f32 = 0.0;   // sf-drive (night48): the clear coat's share of that city (gHR's L) in its reflection (car paint at night: the street's lights in the coat)
var<private> gHT: vec4f = vec4f(0.0);   // sf-drive: a hook's diffuse transmission (thin leaves lit through from behind: rgb, w = on)
// sf-drive (car paint, car/paint.js): what a hook sees besides its arguments - the shading normal (view-facing, before
// any detail normal) and the second uv set (uv1: the car's baked vertex AO in x) - and what it may set: an ambient /
// specular occlusion (gHAO: x the material's AO map) and an offset to the clear coat's normal (gHCN, w = on: rain beads)
var<private> gNw: vec3f = vec3f(0.0, 1.0, 0.0);
var<private> gUV2: vec2f = vec2f(0.0);
var<private> gHAO: f32 = 1.0;
var<private> gHCN: vec4f = vec4f(0.0);
// sf-drive (round 27): a wet road's streaks (gHAN: 0 none .. 1): the lamps' highlight stretched toward the viewer (an
// anisotropic lobe along the view's direction over the surface) and the screen-space reflection smeared down the screen
// (a vertical kernel over last frame's image at the hit) - NFS's long lamp streaks, not round glints
var<private> gHAN: f32 = 0.0;
// sf-drive (round 27): a hook's share of the city glow's warm ground term from every side and height (the hemisphere's
// ground colour, not faded by renderer.glowFall; 0 none): the crowns at blue hour lit by the street's bounce scattering
// through them - not black cut-outs away from the lamps (the hemisphere is off by day: no change then)
var<private> gHGF: f32 = 0.0;
var<private> gHPL: vec2f = vec2f(1.0, 0.0);   // sf-drive: the lamps' (point / spot lights') weight on a hook's surface (the car: street lamps 8 m over it), and the least roughness they see (a lamp's size: no pin-point blob on a mirror-smooth coat)
${e ? "" : "@group(3) @binding(8) var matEmit: texture_2d<f32>;"}
${s("matRough", 5)} ${s("matMetal", 6)} ${s("matAO", 7)} ${e ? "@group(3) @binding(8) var matEmit: texture_2d<f32>;" : ""}
${s("matCC", 9)} ${s("matCCR", 10)} ${s("matCCN", 11)} ${s("matSpecI", 12)} ${s("matSpecC", 13)} ${s("matTrans", 14)} ${s("matThick", 15)}
fn mRough(uv: vec2f) -> vec4f { return ${n("matRough", "vec4f(1.0)")}; }
fn mMetal(uv: vec2f) -> vec4f { return ${n("matMetal", "vec4f(1.0)")}; }
fn mAO(uv: vec2f) -> vec4f { return ${n("matAO", "vec4f(1.0)")}; }
fn mEmit(uv: vec2f) -> vec4f { return textureSample(matEmit, matSamp, uv); }
fn mCC(uv: vec2f) -> vec4f { return ${n("matCC", "vec4f(1.0)")}; }
fn mCCR(uv: vec2f) -> vec4f { return ${n("matCCR", "vec4f(1.0)")}; }
fn mCCN(uv: vec2f) -> vec4f { return ${n("matCCN", "vec4f(0.5, 0.5, 1.0, 1.0)")}; }
fn mSpecI(uv: vec2f) -> vec4f { return ${n("matSpecI", "vec4f(1.0)")}; }
fn mSpecC(uv: vec2f) -> vec4f { return ${n("matSpecC", "vec4f(1.0)")}; }
fn mTrans(uv: vec2f) -> vec4f { return ${n("matTrans", "vec4f(1.0)")}; }
fn mThick(uv: vec2f) -> vec4f { return ${n("matThick", "vec4f(1.0)")}; }
fn envSpec(r: vec3f, rough: f32) -> vec3f {
  ${
    i
      ? `let t = clamp(rough, 0.0, 1.0) * 3.0;            // neural priors: levels 0..3 span mirror..broad
  let l0 = i32(floor(t)); let f = t - f32(l0);
  return mix(prior(r, l0), prior(r, min(l0 + 1, 3)), f);`
      : `let NL = i32(textureNumLayers(priors));
  if (NL < 7) {   // five-level priors (neural bundles): mirror, 400, 64, 8, cosine
    let t = clamp(rough, 0.0, 1.0) * 3.0; let l0 = i32(floor(t)); let f = t - f32(l0);
    return mix(prior(r, l0), prior(r, min(l0 + 1, 3)), f);
  }
  // seven levels (three.js scenes): mirror, 3000, 600, 120, 24, 5, cosine; GGX alpha -> Phong n = 2 / a^2 - 2
  let a = max(rough * rough, 1e-3); let lg = log2(2.0 / (a * a) - 1.0);
  let E = array<f32, 6>(14.0, 11.55, 9.23, 6.92, 4.64, 2.58);
  var t = 5.0;
  for (var k = 0; k < 5; k++) { if (lg >= E[k + 1]) { t = f32(k) + clamp((E[k] - lg) / (E[k] - E[k + 1]), 0.0, 1.0); break; } }
  let l0 = i32(floor(t)); let f = t - f32(l0);
  return mix(prior(r, l0), prior(r, min(l0 + 1, 5)), f);`
  }
}
fn envDiffuse(n: vec3f) -> vec3f { ${i ? "return prior(n, 4);" : "return prior(n, i32(textureNumLayers(priors)) - 1);"} }
fn envBRDF(rough: f32, ndv: f32) -> vec2f {   // Karis' analytic fit of the split-sum DFG terms: F0 scale, F90 bias
  let c0 = vec4f(-1.0, -0.0275, -0.572, 0.022); let c1 = vec4f(1.0, 0.0425, 1.04, -0.04);
  let r = rough * c0 + c1;
  let a004 = min(r.x * r.x, exp2(-9.28 * ndv)) * r.x + r.y;
  return vec2f(-1.04, 1.04) * a004 + r.zw;
}
fn envBRDFApprox(spec: vec3f, rough: f32, ndv: f32) -> vec3f { let ab = envBRDF(rough, ndv); return spec * ab.x + ab.y; }
fn fresnel(f0: vec3f, f90: f32, c: f32) -> vec3f { return f0 + (f90 - f0) * pow(1.0 - c, 5.0); }
fn aoMB(a: f32, alb: vec3f) -> vec3f {
  let A = 2.0404 * alb - 0.3324; let B = -4.7951 * alb + 0.6417; let C = 2.7552 * alb + 0.6903;
  return max(vec3f(a), ((a * A + B) * a + C) * a);
}
// sf-drive (round 29): the light's source as a sphere (gLR: its radius over its distance; lightAtten's near radius): the
// lobe widened by it (Karis 2013) - a street lamp's head on a glossy tailgate a lamp-sized glint, not a burnt round blob
var<private> gLR: f32 = 0.0;
fn ggxSpec(n: vec3f, v: vec3f, l: vec3f, f0: vec3f, f90: f32, rough: f32) -> vec3f {   // GGX / Smith (height-correlated) / Schlick
  let h = normalize(l + v);
  let ndl = max(dot(n, l), 0.0); let ndv = max(dot(n, v), 1e-4); let ndh = max(dot(n, h), 0.0);
  let a = min(max(rough * rough, 1e-3) + gLR * 0.5, 1.0); let a2 = a * a;
  let dd = ndh * ndh * (a2 - 1.0) + 1.0;
  let D = a2 / (PI * dd * dd);
  let gv = ndl * sqrt(ndv * ndv * (1.0 - a2) + a2); let gl = ndv * sqrt(ndl * ndl * (1.0 - a2) + a2);
  let V = 0.5 / max(gv + gl, 1e-6);
  return fresnel(f0, f90, max(dot(v, h), 0.0)) * (D * V);
}
// sf-drive (round 27): anisotropic GGX (Burley's normalised D) stretched along t, the view's direction projected on the
// surface: a lamp's highlight on a wet road runs down the screen toward the viewer (the water's ripples tilt the facets
// mostly toward and away from the eye at a grazing view); the energy is the isotropic lobe's, spread
fn ggxStreak(n: vec3f, v: vec3f, l: vec3f, f0: vec3f, f90: f32, rough: f32, k: f32) -> vec3f {
  let h = normalize(l + v);
  let ndl = max(dot(n, l), 0.0); let ndv = max(dot(n, v), 1e-4); let ndh = max(dot(n, h), 0.0);
  let tv = v - n * dot(n, v); let t = tv * inverseSqrt(max(dot(tv, tv), 1e-8)); let b = cross(n, t);
  // (round 29) only a lamp beyond the point (away from the viewer) streaks toward the viewer: the stretched lobe's long tail
  // also lit the road from lamps behind the camera or abeam of it - white bars to the screen's foot, worst on the phones
  let fw = smoothstep(-0.05, 0.3, -dot(l, t));
  let a = max(rough * rough, 1e-3); let at = max(a, k * 0.32 * fw); let ab = max(a, k * 0.03 * fw);   // (round 28: across the streak at least the lamp's own size and the ripples' sway - a puddle's 1e-3 drew a lamp near the car as a one-pixel bright bar down to the screen's foot)
  let ht = dot(h, t) / at; let hb = dot(h, b) / ab; let dd = ht * ht + hb * hb + ndh * ndh;
  let D = min(1.0 / (PI * at * ab * dd * dd), 5.0);   // (round 29: the streak's core capped - a lamp's streak a soft glow down the road, not a white bar burnt to the screen's foot, worst on the phones)
  let a2 = a * a;
  let gv = ndl * sqrt(ndv * ndv * (1.0 - a2) + a2); let gl = ndv * sqrt(ndl * ndl * (1.0 - a2) + a2);
  let V = 0.5 / max(gv + gl, 1e-6);
  return fresnel(f0, f90, max(dot(v, h), 0.0)) * (D * V);
}
struct Mat {
  model: f32, diff: vec3f, f0: vec3f, f90: f32, rough: f32,
  cc: f32, ccRough: f32, ccN: vec3f, specP: vec3f, shin: f32, ms: vec3f,
};
// radiance leaving towards v for unit irradiance from l (times cos), by material model
fn brdf(m: Mat, n: vec3f, v: vec3f, l: vec3f) -> vec3f {
  let ndl = max(dot(n, l), 0.0);
  if (m.model > 5.5) {   // toon: two tones across the terminator (three.js default gradient), no cosine
    let c = dot(n, l) * 0.5 + 0.5;
    return m.diff / PI * mix(0.7, 1.0, smoothstep(0.69, 0.71, c));
  }
  if (m.model > 4.5) {   // Blinn-Phong (three.js BRDF_BlinnPhong: Schlick x 1/4 x normalised lobe)
    let h = normalize(l + v);
    let D = (m.shin * 0.5 + 1.0) / PI * pow(max(dot(n, h), 0.0), m.shin);
    return (m.diff / PI + fresnel(m.specP, 1.0, max(dot(v, h), 0.0)) * 0.25 * D) * ndl;
  }
  if (m.model > 0.5) { return m.diff / PI * ndl; }   // Lambert
  // sf-drive (round 27); (round 29) the streak hidden where the reflected ray meets something close (SSR) or the light's way
  // crosses the player's car (carRay): the analytic lobe knew no occluder
  if (gHAN > 0.0) { return (m.diff / PI + ggxStreak(n, v, l, m.f0, m.f90, m.rough, gHAN) * m.ms * (1.0 - max(gSsrNear, carRay(gP, l)))) * ndl; }
  var c = (m.diff / PI + ggxSpec(n, v, l, m.f0, m.f90, m.rough) * m.ms) * ndl;
  if (m.cc > 0.0) {   // clear coat: a second GGX layer over the base, which it dims by its Fresnel
    let ccl = max(dot(m.ccN, l), 0.0); let fc = fresnel(vec3f(0.04), 1.0, max(dot(m.ccN, v), 0.0)).x * m.cc;
    c = c * (1.0 - fc) + ggxSpec(m.ccN, v, l, vec3f(0.04), 1.0, m.ccRough) * m.cc * ccl;
  }
  return c;
}
${
  e
    ? `
fn pointShadow(idx: i32, lp: vec3f, p: vec3f, n: vec3f, px: vec2f, nb: f32) -> f32 {
  let q = p + n * nb;
  let d = q - lp; let ad = abs(d);
  var f = 0;
  if (ad.x >= ad.y && ad.x >= ad.z) { f = select(1, 0, d.x > 0.0); } else if (ad.y >= ad.z) { f = select(3, 2, d.y > 0.0); } else { f = select(5, 4, d.z > 0.0); }
  let c = LB.pointVP[idx * 6 + f] * vec4f(q, 1.0);
  if (c.w <= 1e-5) { return 1.0; }
  let ndc = c.xyz / c.w;
  let uv = vec2f(ndc.x * 0.5 + 0.5, 0.5 - ndc.y * 0.5);
  let off = vec2f(f32(f % 3), f32(f / 3));
  let a = ign(px); let cs = vec2f(cos(a), sin(a)); let rot = mat2x2f(cs.x, cs.y, -cs.y, cs.x);
  let r = 1.8 / ${K6}.0;
  var s = 0.0;
  for (var i = 0; i < 8; i++) {
    let u = (clamp(uv + rot * POISSON[i * 2] * r, vec2f(0.002), vec2f(0.998)) + off) / vec2f(3.0, 2.0);
    s += textureSampleCompareLevel(pointSM, shadowSamp, u, idx, ndc.z - 0.00015);
  }
  return s / 8.0;
}
var<private> gDpx: vec3f; var<private> gDpy: vec3f;   // the shaded point's screen derivatives (set where control flow is uniform)
fn spotMapColor(layer: i32, p: vec3f) -> vec3f {
  let c = LB.mapVP[layer] * vec4f(p, 1.0);
  if (c.w <= 1e-5) { return vec3f(0.0); }
  let ndc = c.xy / c.w;
  if (abs(ndc.x) > 1.0 || abs(ndc.y) > 1.0) { return vec3f(0.0); }
  let cx = LB.mapVP[layer] * vec4f(p + gDpx, 1.0); let cy = LB.mapVP[layer] * vec4f(p + gDpy, 1.0);
  let du = (cx.xy / cx.w - ndc) * 256.0; let dv = (cy.xy / cy.w - ndc) * 256.0;   // texels (512 across) per pixel
  let lod = 0.5 * log2(max(max(dot(du, du), dot(dv, dv)), 1e-8));
  // three.js samples the map at the light's clip xy / w: GL texture convention, v up (textures upload with flipY)
  return textureSampleLevel(spotMaps, linSamp, vec2f(ndc.x * 0.5 + 0.5, ndc.y * 0.5 + 0.5), layer, clamp(lod, 0.0, 9.0)).rgb;
}`
    : ""
}
fn stdLightM(i: u32, p: vec3f, n: vec3f, v: vec3f, px: vec2f, m: Mat, recv: bool) -> vec3f {
  let L = LB.l[i]; var l = vec3f(0.0); let a = lightAtten(L, p, &l);
  // sf-drive (round 23): a leaf card lit from behind by a lamp (a street light under a crown) lets half of it through:
  // the crowns round the lamps lit at night, not black cut-outs (the sun's own translucency is gHT's, below)
  if (gHT.w > 0.5 && a > 0.0 && dot(n, l) < 0.0 && L.dir.w > -2.5) { return L.color.rgb * a * m.diff * (-dot(n, l) * 0.5 / PI); }
  if (a <= 0.0 || (dot(n, l) <= 0.0 && m.cc <= 0.0 && m.model < 5.5)) { return vec3f(0.0); }
  if (L.dir.w < -2.5 && L.dir.w > -3.5) { return L.color.rgb * a * m.diff * (max(dot(n, l), 0.0) / PI); }   // floor bounce: broad, diffuse only
  var sh = 1.0;
  if (recv) {
    let t = i32(L.extra.y);
    if (t >= 0) { sh = spotShadow(t, p + n * L.extra2.w, n, px); }
    ${e ? "let pi = i32(L.extra2.y); if (pi >= 0) { sh = pointShadow(pi, L.pos.xyz, p, n, px, L.extra2.w); }" : ""}
  }
  var col = L.color.rgb;
  ${e ? "let ml = i32(L.extra2.x); if (ml >= 0) { col *= spotMapColor(ml, p); }" : ""}
  let cd = L.extra.w / 8.0; gLR = (cd - 1000.0 * floor(cd / 1000.0) - fract(cd)) * 0.01 / max(length(L.pos.xyz - p), 0.05) * select(0.0, 1.0, L.dir.w > -3.5);
  // sf-drive (glare63): a low beam (a car's headlamps; 'burning of lights still too much'). Its specular a quarter and
  // held under ~0.04 of radiance (a car's beam aimed up a grade at the camera lit the asphalt and the hood toward the
  // viewer as a white bar - at grazing the lobe runs to tens; now a soft glare), its glint at least a lamp's breadth (no
  // pin-point speckles on glossy paint), no damp-road streak; and what it lights past ~0.06 rolled off logarithmically
  // (the road's pool, the next car's white nose no longer burn white at the night's exposure; the dim pools beyond as
  // they were, the gradients kept)
  let lb = cd >= 1000.0; let han = gHAN;
  if (lb) { gLR = max(gLR, 0.12); gHAN = 0.0; }
  var r = col * a * sh * brdf(m, n, v, l); gLR = 0.0; gHAN = han;
  if (lb) {
    var d0 = col * a * sh * (m.diff / PI * max(dot(n, l), 0.0)); var s0 = max(r - d0, vec3f(0.0)) * 0.25;
    s0 = s0 / (1.0 + dot(s0, vec3f(0.2126, 0.7152, 0.0722)) / 0.04);
    let y = dot(d0, vec3f(0.2126, 0.7152, 0.0722));
    if (y > 0.06) { d0 = d0 * ((0.06 + 0.1 * log(1.0 + (y - 0.06) / 0.1)) / y); }
    r = d0 + s0;
  }
  return r;
}
${DU}
fn ccNormal(n0: vec3f, p: vec3f, uv: vec2f) -> vec3f {   // clear-coat normal map (tangent space, derivative frame)
  if (O.mflags9.x < 0.5) { return n0; }
  let dp1 = dpdx(p); let dp2 = -dpdy(p); let du1 = dpdx(uv); let du2 = -dpdy(uv);
  let dp2p = cross(dp2, n0); let dp1p = cross(n0, dp1);
  let Tt = dp2p * du1.x + dp1p * du2.x; let Bt = dp2p * du1.y + dp1p * du2.y;
  let inv = inverseSqrt(max(max(dot(Tt, Tt), dot(Bt, Bt)), 1e-20));
  let sc = O.mflags9.y; let t = mCCN(uv);
  return normalize(mat3x3f(Tt * inv, Bt * inv, n0) * ((t.xyz * 2.0 - 1.0) * vec3f(sc, sc * O.dyn.z, 1.0)));
}
fn shadeA(i: VOut) -> vec4f {
  ${e ? "gDpx = dpdx(i.wpos); gDpy = dpdy(i.wpos);" : ""}
  var n = normalize(i.wnrm);
  if (O.mflags9.z > 0.5) { n = normalize(cross(dpdx(i.wpos), dpdy(i.wpos))); }   // flat shading / no normals: the facet's normal
  let v = normalize(F.camPos.xyz - i.wpos);
  if (dot(n, v) < 0.0) { n = -n; }
  let ng = n;
  let muv = vec2f(dot(O.uvT0.xyz, vec3f(i.uv, 1.0)), dot(O.uvT1.xyz, vec3f(i.uv, 1.0)));
  // only the maps this material has: each fetch sits in a branch on a uniform flag (legal for textureSample, and a plain
  // material pays for none of the thirteen slots)
  var tex = vec4f(1.0); if (O.mflags.x > 0.5) { tex = textureSample(matMap, matSamp, muv); }
  var lm = vec4f(0.0); if (O.mflags3.x > 0.0) { lm = textureSample(matLight, matSamp, i.uv2); }
  var amap = 1.0; if (O.mflags6.x > 0.5) { amap = textureSample(matExtra, matSamp, muv).g; }   // three.js alphaMap (green channel)
  var tRough = vec4f(1.0); if (O.mflags7.x > 0.5) { tRough = mRough(muv); }
  var tMetal = vec4f(1.0); if (O.mflags7.y > 0.5) { tMetal = mMetal(muv); }
  var tAO = vec4f(1.0); if (O.mflags7.z > 0.0) { tAO = mAO(muv); }
  var tEmit = vec4f(1.0); if (O.mflags7.w > 0.5) { tEmit = mEmit(muv); }
  var tCC = vec4f(1.0); if (O.mflags8.z > 0.5) { tCC = mCC(muv); }
  var tCCR = vec4f(1.0); if (O.mflags8.w > 0.5) { tCCR = mCCR(muv); }
  var tSI = vec4f(1.0); if (O.mflags11.x > 0.5) { tSI = mSpecI(muv); }
  var tSC = vec4f(1.0); if (O.mflags11.y > 0.5) { tSC = mSpecC(muv); }
  var tTr = vec4f(1.0); if (O.mflags11.z > 0.5) { tTr = mTrans(muv); }
  var tTh = vec4f(1.0); if (O.mflags11.w > 0.5) { tTh = mThick(muv); }
  var base = O.baseColor.rgb * i.col.rgb; var alpha = O.baseColor.a * i.col.a;
  if (O.mflags.x > 0.5) { base *= tex.rgb; alpha *= tex.a; }
  if (O.mflags6.x > 0.5) { alpha *= amap; }
  ALBEDO_HOOK
  // sf-drive (studio67): in the Garage's studio (renderer.tubes on) the hooks' street canyon (gHR: the city a car's glass and
  // coat mirror) is not there - the studio's own room, tubes and floor are
  if (F.tubeInfo.x > 0.5) { gHR = vec4f(0.0); gHRe = vec3f(0.0); gHCR = 0.0; }
  if (O.mflags.z > 0.0 && alpha < O.mflags.z) { discard; }
  // sf-drive (round 22): foliage (a hook with transmission) keeps its bent normal - out of the crown and up - seen from
  // either face: a frond or a spray seen from below is lit as its crown is, and the sun comes through it (gHT), never the
  // flipped normal's dark underside; only its part facing away from the eye is projected out (no specular from behind)
  if (gHT.w > 0.5) { let n0 = normalize(i.wnrm); let dv = dot(n0, v); n = select(n0, normalize(n0 + v * (0.05 - dv)), dv < 0.05); }
  n = detailNormal(n, i.wpos, muv);
  if (gHN.w > 0.5) { n = normalize(n + gHN.xyz); }
  var ccN = ccNormal(ng, i.wpos, muv);
  if (gHCN.w > 0.5) { ccN = normalize(ccN + gHCN.xyz); }
  let dnx = dpdx(n); let dny = dpdy(n);
  let kRough = min(0.25 * (dot(dnx, dnx) + dot(dny, dny)), 0.05) * F.aoP.z;
  let gnx = dpdx(ng); let gny = dpdy(ng); let kRoughG = min(0.25 * (dot(gnx, gnx) + dot(gny, gny)), 0.05) * F.aoP.z;   // (the geometry's alone: a hook's own sub-pixel normals - the paint's flakes - stay its own business)   // specular AA: the normal's variance across the pixel (Kaplanyan 2016), gentle
  var emit = O.emissive.rgb + gHE;
  if (O.mflags7.w > 0.5) { emit *= tEmit.rgb; }
  let shading = O.mflags.w;
  if (shading > 2.5 && shading < 4.5) {   // MeshNormalMaterial (view-space normal as colour) / MeshMatcapMaterial (map = the matcap, looked up by it)
    let vn = normalize((F.view * vec4f(n, 0.0)).xyz);
    if (shading < 3.5) { return vec4f(vn * 0.5 + 0.5, O.baseColor.a); }   // three.js packs it as linear, then output-encodes
    let vd = normalize((F.view * vec4f(v, 0.0)).xyz); let x = normalize(vec3f(vd.z, 0.0, -vd.x)); let y = cross(vd, x);
    let mc = textureSample(matMap, matSamp, vec2f(dot(x, vn), dot(y, vn)) * 0.495 + 0.5);
    return vec4f(O.baseColor.rgb * i.col.rgb * select(vec3f(1.0), mc.rgb, O.mflags.x > 0.5), alpha);
  }
  let r = reflect(-v, n);
  let rfw = length(fwidth(r)) * 0.7;   // sf-drive (studio67): the studio tubes' reflection: the ray's footprint a pixel
  let envI = O.mflags12.x * F.misc.x;
  if (shading > 1.5 && shading < 2.5) {   // MeshBasicMaterial: unlit; an env map mirrors the environment (multiply / mix / add)
    var bc = base;
    let ec = O.mflags12.y;
    if (abs(ec) > 0.5) {
      let refl = envSpec(r, 0.0) * F.misc.x; let k = abs(ec) - 1.0;
      if (ec > 2.5) { bc += refl * k; } else if (ec > 0.0) { bc *= mix(vec3f(1.0), refl, k); } else { bc = mix(bc, refl, k); }
    }
    let ao0 = select(1.0, mix(1.0, tAO.r, O.mflags7.z), O.mflags7.z > 0.0);
    if (O.mflags3.x > 0.0) { bc *= mix(vec3f(1.0), lm.rgb * O.mflags3.x, 1.0) * ao0; }
    return vec4f(bc + emit, alpha);
  }
  let ndv = max(dot(n, v), 1e-4);
  var m: Mat;
  m.model = select(0.0, shading, shading > 0.5); m.cc = 0.0; m.ccN = ccN; m.shin = O.mflags10.w; m.ms = vec3f(1.0);
  m.rough = 1.0; m.f0 = vec3f(0.0); m.f90 = 1.0; m.diff = base; m.specP = vec3f(0.0); m.ccRough = 0.0;
  var metal = 0.0;
  if (m.model < 0.5) {
    m.rough = clamp(O.mr.x * select(1.0, tRough.g, O.mflags7.x > 0.5), 0.03, 1.0);
    m.rough = sqrt(sqrt(m.rough * m.rough * m.rough * m.rough + kRough));
    metal = clamp(O.mr.y * select(1.0, tMetal.b, O.mflags7.y > 0.5), 0.0, 1.0);
    // Physical: F0 from the ior, tinted by specularColor, scaled by specularIntensity (Standard: ior 1.5, white, 1)
    let ior = max(O.mflags14.x, 1.0); let f0d = pow((ior - 1.0) / (ior + 1.0), 2.0);
    let si = O.mflags6.y * select(1.0, tSI.a, O.mflags11.x > 0.5);
    let sc = O.mflags10.rgb * select(vec3f(1.0), tSC.rgb, O.mflags11.y > 0.5);
    if (gHK.w > 0.5) { m.rough = clamp(gHK.x, 0.03, 1.0); metal = gHK.y; }
    m.f0 = mix(min(vec3f(f0d) * sc, vec3f(1.0)) * si * gHF0, base, metal); m.f90 = mix(si * gHF0, 1.0, metal);
    m.diff = base * (1.0 - metal);
    m.cc = O.mflags8.x * select(1.0, tCC.r, O.mflags8.z > 0.5);
    m.ccRough = clamp(O.mflags8.y * select(1.0, tCCR.g, O.mflags8.w > 0.5), 0.03, 1.0);
    if (gHC.x > 0.0) { m.cc = gHC.x; m.ccRough = clamp(gHC.y, 0.03, 1.0); m.ccN = n; }
    // (sf-drive, tyres49) the hooks' roughness through the specular AA too (it took the surface's own and skipped it: the
    // cars' paint and coat sparkled - white speckles along the lumpy generated panels, a noisy grain on the bodies)
    if (gHK.w > 0.5) { m.rough = sqrt(sqrt(m.rough * m.rough * m.rough * m.rough + kRoughG)); }
    // (taa50) every clear coat, a material's own too (the traffic's glTF paint): its sun glint, a fraction of a pixel wide
    // on a curved panel, flashed on and off with the TAA's jitter
    m.ccRough = sqrt(sqrt(m.ccRough * m.ccRough * m.ccRough * m.ccRough + kRoughG));
  } else if (m.model > 4.5 && m.model < 5.5) {
    m.specP = O.mflags10.rgb * select(1.0, tSI.r, O.mflags11.x > 0.5);   // Phong: specular colour x specular map
  }
  var ssao = 1.0; var bounce = vec3f(0.0);
  ${e ? "if (F.aoP.x > 0.5 && gHT.w < 0.5) { let at = textureSampleLevel(aoTex, linSamp, i.pos.xy * F.screen.xy, 0.0); ssao = mix(1.0, at.a, gHSS); bounce = at.rgb * gHSS; }" : ""}   // (sf-drive: not on alpha-tested foliage: the AO's depth never saw it)
  let aoMap = select(1.0, mix(1.0, tAO.r, O.mflags7.z), O.mflags7.z > 0.0) * gHAO;
  // sf-drive: baked sky visibility (tools/real/skyvis.mjs): the sky's share each surface sees, the canyons' and alleys'
  // shade; per vertex (uv2.x, 0 = none) or the street-level field by world position; GTAO keeps the contact detail
  var skyV = 1.0;
  if (O.mflags6.w > 0.5) {
    if (O.mflags6.w < 1.5) { if (i.uv2.x > 0.0) { skyV = i.uv2.x; } } else { skyV = skyFieldAt(i.wpos); }
    skyV = mix(1.0, F.skyH.x + (1.0 - F.skyH.x) * pow(skyV, F.skyG.y), F.skyG.x);
  }
  let ao = aoMap * ssao * skyV;
  if (F.skyG.w > 0.5) { return vec4f(vec3f(skyV * select(1.0, ssao, F.skyG.w > 1.5)), 1.0); }   // renderer.skyVis.debug (2: x GTAO)
  let aoD = aoMB(ao, m.diff);   // multi-bounce: bright surfaces lose less to occlusion (Jimenez 2016)
  if (F.aoP.w > 0.5) { return vec4f(select(vec3f(ssao), bounce * 4.0, F.aoP.w > 1.5), 1.0); }   // renderer.aoDebug (2: the bounce)
  let recv = O.mflags12.z > 0.5;
  // ---- indirect light
  var c = vec3f(0.0);
  // sf-drive (round 11): the hemisphere (the city's night glow fill) fades past ~400 m: it lights the canyons round the camera; on the skyline seen from the hills and the bay it washed every tower cream between its lit windows
  // sf-drive (round 23): its warm ground term (the lit street's bounce) fades with the height over the street round the camera
  // (renderer.glowFall { y, h, floor }: hemiSky.w, hemiGround.w, ambient.w): the street-level storeys lit, the upper floors
  // in the sky's cool light - before, every facade glowed one flat amber up to its cornice
  var hG = F.hemiGround.rgb;
  if (F.hemiGround.w > 0.0) { hG *= mix(F.ambient.w, 1.0, exp(-max(i.wpos.y - F.hemiSky.w, 0.0) / F.hemiGround.w)); }
  var irr = F.ambient.rgb + mix(hG, F.hemiSky.rgb, 0.5 * n.y + 0.5) * (1.0 - 0.8 * smoothstep(400.0, 1200.0, length(F.camPos.xyz - i.wpos)));   // three.js ambient + hemisphere (irradiance)
  if (gHGF > 0.0) { irr += (F.hemiGround.rgb + 2.0 * F.hemiSky.rgb) * gHGF; }   // (its own cool sky share too: grey-green crowns, not olive)
  var sunVis = 1.0; var baked = false;
  if (O.mflags3.x > 0.0) {   // light map: three.js irradiance semantics, or a baked indirect term (+ sun visibility in .a)
    var e = lm.rgb;
    if (O.mflags3.y > 0.0) { e = (exp2(e * O.mflags3.y) - 1.0) / O.mflags3.z; }
    e *= O.mflags3.x;
    if (O.mflags3.w > 0.5) { sunVis = lm.a; baked = true; irr = e * PI; } else { irr += e; }
  }
  // sf-drive (studio67): the studio tubes' direct light (renderer.tubes, x renderer.tubeDiffuse), live - the cars' own
  // materials lit by the Garage's LED tubes as the reveal film's car is (rendering.mindblown.ai)
  let pl1 = O.params.w > 0.5 && O.params.w < 1.5;   // a planar floor (userData.mbPlanar): the reflection pass' mirror
  if (F.tubeInfo.x > 0.5 && F.tubeInfo2.y > 0.0) { irr += tubeIrr(i.wpos, n, false, vec3f(0.0), vec3f(1.0)) * F.tubeInfo2.y; }
  if (m.model < 0.5) {
    // split-sum environment with multiple-scattering energy compensation (Fdez-Aguera 2019), specular occlusion from AO
    let ab = envBRDF(m.rough, ndv);
    let fss = m.f0 * ab.x + m.f90 * ab.y;
    let ess = ab.x + ab.y; let ems = 1.0 - ess;
    let favg = m.f0 + (1.0 - m.f0) * 0.047619;
    let fms = fss * favg / (1.0 - ems * favg);
    let specW = fss + fms * ems;
    m.ms = 1.0 + m.f0 * (1.0 / max(ess, 1e-3) - 1.0);   // direct light gets the same compensation
    let so = clamp(pow(ndv + ao, exp2(-16.0 * m.rough - 1.0)) - 1.0 + ao, 0.0, 1.0);
    var envD = vec3f(0.0); var envS = vec3f(0.0);
    if (envI > 0.0) { envD = envDiffuse(n) * envI; envS = envSpec(r, m.rough) * envI; }
    // sf-drive (studio67): the tubes in every glossy-to-rough reflection (the lobe widens with the roughness); before the
    // screen-space and planar reflections, which hide them where something nearer is in the way
    if (F.tubeInfo.x > 0.5) { let tr = select(m.rough, max(m.rough, 0.42), metal > 0.5); envS += tubeReflF(i.wpos, r, select(0.003 + tr * tr * 0.85, 0.002 + m.rough * m.rough * 0.2, pl1), rfw, pl1) * select(select(F.tubeInfo.w, 1.0, metal > 0.5), 1.0, pl1); }   // (studio69: bare metal - the wheels, the trim - a satin silver under the tubes, not chrome; only the paint's coat takes renderer.tubeSpec)   // (a planar floor: narrow streaks, the floor's stretch is its length)
    // sf-drive: a window in a street canyon (gHK.z: its share) reflects the buildings across the street, not the sky's
    // horizon: the environment's reflection dimmed toward level rays (the screen-space reflection, where it hits, wins)
    if (gHK.w > 0.5 && gHK.z > 0.0) { envS *= mix(1.0, 0.18 + 0.82 * smoothstep(0.02, 0.5, r.y), gHK.z); }
    var cityL = vec3f(0.0);
    if (gHR.a > 0.0) {
      let fr = normalize(vec3f(-r.x, 0.0, -r.z) + vec3f(0.0, 1e-4, 0.0));
      let L = gHR.rgb * (envDiffuse(fr) * envI + F.sunC.rgb * F.sunDir.w * max(dot(fr, normalize(F.sunDir.xyz)), 0.0) * 0.55 / PI + (F.hemiGround.rgb * 0.5 + F.hemiSky.rgb) * 0.5 / PI) + gHRe;   // (sf-drive, round 27: + the city's night glow on the facades across: unlit glass not black at blue hour; the hemisphere is off by day)
      envS = mix(envS, L, gHR.a); cityL = L;
    }
    // sf-drive: a glossy clear coat (car paint) traces its own reflection instead: one trace a pixel, the coat's
    var ccHit = vec4f(0.0);
    if (F.aoP.y > 0.5 && m.cc > 0.0 && m.ccRough < 0.3 && F.misc.z < 0.5) { ccHit = ssrTrace(i.wpos, reflect(-v, m.ccN), i.pos.xy, m.ccN); ccHit.a *= clamp(1.0 - m.ccRough / 0.3, 0.0, 1.0) * F.ssr.w; }
    // sf-drive (night49): only the glossy surfaces trace (roughness under 0.34, fading in under it): the march returns one
    // sharp texel, so a semi-rough surface (the day's damp sheen on dry asphalt, a patch, the night's damp) mirrored the
    // player's car crisp - and last frame's image of a car that moved since: a smeared, stretched block with dark bands
    // under and behind it - where its own roughness should blur it away; those keep the environment's reflection
    else if (F.aoP.y > 0.5 && m.rough < 0.34 && F.misc.z < 0.5 && !(pl1 && F.screen.z > 0.5)) {   // screen-space reflections of last frame's image (glossy surfaces)
      var hit = ssrTrace(i.wpos, r, i.pos.xy, n);
      gSsrNear = hit.a * (1.0 - smoothstep(4.0, 15.0, gSsrT));
      ${e ? "if (gHAN > 0.0 && hit.a > 0.0) { hit = vec4f(ssrStreak(hit.rgb, i.pos.xy, gHAN), hit.a); } if (gHAN > 0.0 && hit.a < 0.98) { envS += wetFar(i.wpos, r, i.pos.xy, gHAN, envS) * (1.0 - hit.a) * clamp(1.0 - m.rough / 0.45, 0.0, 1.0) * F.ssr.w; }" : ""}   // sf-drive (round 27): the wet road's streaks
      envS = mix(envS, hit.rgb, hit.a * smoothstep(0.34, 0.1, m.rough) * F.ssr.w);
    }
    // sf-drive (studio67): a planar floor (the Garage's): the scene mirrored in it (the reflection pass, half resolution,
    // mipped), blurred by its roughness and stretched down the screen at grazing angles (a wet floor's streaks); where the
    // mirror holds nothing, the environment and the tubes
    if (pl1 && F.screen.z > 0.5 && F.misc.z < 0.5) {
      let tq = clamp(m.rough / 0.9, 0.0, 1.0) * 3.0; let l0 = i32(floor(tq)); let lod = mix(F.planarLod[l0], F.planarLod[min(l0 + 1, 3)], fract(tq));   // (studio69: a crisper mirror)
      let pl = planarAniso(i.pos.xy, lod, 1.0 + 0.8 * (1.0 - ndv));
      envS = envS * (1.0 - pl.a) + pl.rgb * 0.8;   // (studio69: a darker image of the car - a dark floor's, not a mirror's)
    }
    if (pl1 && O.mflags7.x > 0.5) { envS *= 0.12 + 1.5 * (1.0 - smoothstep(0.6, 0.8, tRough.g)); }   // (studio67: the floor's wet and dry patches - its mottled gloss - break its reflections up, as a polished concrete's)   // (the floor's wet and dry patches: its reflections broken up, as a polished concrete's)
    c = m.diff * (1.0 - specW) * ((envD + irr / PI) * aoD + bounce * aoMap) + envS * specW * so;
    if (m.cc > 0.0) {
      let fc = fresnel(vec3f(0.04), 1.0, max(dot(m.ccN, v), 0.0)).x * m.cc;
      var ccS = vec3f(0.0); if (envI > 0.0) { ccS = envSpec(reflect(-v, m.ccN), m.ccRough) * envI; }
      if (gHCR > 0.0) { ccS = mix(ccS, cityL, gHCR); }
      if (F.tubeInfo.x > 0.5) { ccS += tubeRefl(i.wpos, reflect(-v, m.ccN), 0.0015 + m.ccRough * m.ccRough * 0.85, rfw) * F.tubeInfo.w; }   // (studio67: the tubes, sharp in the coat)
      ccS = mix(ccS, ccHit.rgb, ccHit.a);
      c = c * (1.0 - fc) + ccS * envBRDFApprox(vec3f(0.04), m.ccRough, max(dot(m.ccN, v), 1e-4)) * m.cc * so;
    }
  } else {
    c = m.diff * (irr / PI * aoD + bounce * aoMap);
    let ec = O.mflags12.y;   // Phong / Lambert with an env map: reflectivity, combine mode
    if (abs(ec) > 0.5) {
      let refl = envSpec(r, 0.0) * F.misc.x; let k = abs(ec) - 1.0;
      if (ec > 2.5) { c += refl * k; } else if (ec > 0.0) { c *= mix(vec3f(1.0), refl, k); } else { c = mix(c, refl, k); }
    }
  }
  if (!baked) { c *= occluderAO(i.wpos, n); }
  // (studio68) the studio's rim: the tubes all round a car seen at grazing angles (the reveal film's bright edges) - what
  // keeps a dark paint or a dark AI-made body reading against the black room; not on the floor
  if (F.tubeInfo.x > 0.5 && F.tubeInfo.z > 0.0 && !pl1 && m.model < 0.5) { let fr = pow(1.0 - ndv, 4.0); c += vec3f(0.62, 0.86, 1.0) * (F.tubeInfo.z * fr * (0.35 + 0.65 * smoothstep(-0.3, 0.6, n.y)) * ao * (0.3 + 0.7 * (1.0 - smoothstep(0.03, 0.3, dot(m.diff + m.f0, vec3f(0.2126, 0.7152, 0.0722)))))); }   // (full on the dark ones)
  // sf-drive (round 21): foliage - the sky's fill weaker on a crown's side away from the sun, a touch fuller toward it (the
  // crown's own shade: NFS's and the photos' crowns have a lit side and a dark side, ours read flat in the ambient), by the
  // sun's strength (none in the fog, at night)
  if (gHT.w > 0.5 && F.sunDir.w > 0.0) {
    let fs = smoothstep(-0.55, 0.65, dot(n, normalize(F.sunDir.xyz)));
    c *= mix(1.0, mix(0.66, 1.08, fs), smoothstep(0.6, 3.0, F.sunDir.w));
  }
  gP = i.wpos;   // (round 29: brdf's wet streaks test the light's way past the player's car)
  gFolL = gHT.w;
  // ---- direct light
  if (F.sunDir.w > 0.0) {
    let l = normalize(F.sunDir.xyz);
    // baked surfaces: Cycles' sun visibility x the moving casters' shadow map; others: real-time shadows
    var sh = sunVis;
    // (sf-drive: foliage: the same shadow taps at every pixel, pushed off the card - the per-pixel noise read as streaks in the leaves)
    let fol = gHT.w > 0.5;
    if (recv && F.sunB.z < 0.5 && (dot(n, l) > 0.0 || m.cc > 0.0 || fol)) { sh *= sunShadow(i.wpos + ng * F.sunB.x * select(1.0, 4.0, fol), select(i.pos.xy, vec2f(0.0), fol), !baked); }
    if (recv && !baked) { sh *= citySun(i.wpos, ng); }   // sf-drive (bridges49): the far city's baked sun shadows
    // (round 29) the sun under the horizon (blue hour's low warm light) is the twilight's glow, a broad patch of sky, not a
    // disc: its glint on glossy paint was a burnt round blob on the Waymo's tailgate
    gLR = 0.8 * smoothstep(0.03, -0.04, l.y);
    c += brdf(m, n, v, l) * F.sunDir.w * F.sunC.rgb * sh; gLR = 0.0;
    if (gHT.w > 0.5) { let bl = clamp(dot(-v, l), 0.0, 1.0); c += gHT.rgb * (0.3 * clamp(0.3 - dot(n, l), 0.0, 1.0) + 0.7 * pow(bl, 6.0) + 0.3 * bl * bl) * F.sunDir.w * F.sunC.rgb * sh; }   // sf-drive (round 22: + a broad lobe - the crown's rim glows with the sun anywhere behind it, not only straight behind)
  }
  var cl = vec3f(0.0); var ml = m; ml.ccRough = max(m.ccRough, gHPL.y); ml.rough = max(m.rough, gHPL.y);
  for (var k = 0u; k < u32(LB.info.x); k++) { cl += stdLightM(k, i.wpos, n, v, i.pos.xy, ml, recv); }
  if (F.misc.z < 0.5 && LB.info.y > LB.info.x) {
    let b = clusterBase(i.pos.xy, i.wpos); let cnt = CLU[b];
    for (var k = 0u; k < cnt; k++) { cl += stdLightM(CLU[b + 1u + k], i.wpos, n, v, i.pos.xy, ml, recv); }
  }
  c += cl * gHPL.x;
  let trans = O.mflags4.x * select(1.0, tTr.r, O.mflags11.z > 0.5);
  if (trans > 0.0 && F.misc.z < 0.5) {   // MeshPhysicalMaterial.transmission: what is behind, refracted through the thickness
    let ior = max(O.mflags4.z, 1.0); let thick = O.mflags4.y * select(1.0, tTh.g, O.mflags11.w > 0.5);
    let rd = refract(-v, n, 1.0 / ior);
    let q = i.wpos + rd * max(thick, 0.0);
    var behind = sceneBlur(q, envSpec(rd, m.rough) * F.misc.x, m.rough * m.rough * 24.0);
    if (O.mflags5.w > 0.0) { behind *= pow(max(O.mflags5.rgb, vec3f(1e-4)), vec3f(max(thick, 0.0) / O.mflags5.w)); }
    let fr = envBRDFApprox(m.f0, m.rough, ndv);
    let refl = envSpec(r, m.rough) * fr * envI;
    c = mix(c, refl + (1.0 - fr) * base * behind, trans);
  }
  return vec4f(c + emit, alpha);
}
// THREE.Sprite: a camera-facing quad (proxyC = rotation, size attenuation, centre.xy)
@vertex fn vsSprite(v: VIn) -> VOut {
  var o: VOut;
  let c = O.model[3].xyz;
  var sc = vec2f(length(O.model[0].xyz), length(O.model[1].xyz));
  let mv = F.view * vec4f(c, 1.0);
  if (O.proxyC.y < 0.5) { sc *= -mv.z; }
  let a = (v.p.xy - (O.proxyC.zw - 0.5)) * sc;
  let cr = cos(O.proxyC.x); let sr = sin(O.proxyC.x);
  let d = vec2f(cr * a.x - sr * a.y, sr * a.x + cr * a.y);
  let right = vec3f(F.view[0].x, F.view[1].x, F.view[2].x); let up = vec3f(F.view[0].y, F.view[1].y, F.view[2].y);
  let w = c + right * d.x + up * d.y;
  o.pos = stableClip(F.viewProj * vec4f(w, 1.0)); o.wpos = w; o.wnrm = -vec3f(F.view[0].z, F.view[1].z, F.view[2].z); o.uv = v.uv.xy; o.uv2 = v.uv.zw; o.col = vec4f(1.0);
  return o;
}
// THREE.Points: one screen-aligned quad per point (proxyC = size px, size attenuation, drawing-buffer height / 2)
@vertex fn vsPoints(@builtin(vertex_index) vi: u32, @location(11) p: vec3f, @location(12) c: vec4f) -> VOut {
  var o: VOut;
  let q = array<vec2f, 6>(vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0), vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0))[vi];
  let w = O.model * vec4f(p, 1.0);
  var clip = stableClip(F.viewProj * w);
  var size = O.proxyC.x;
  if (O.proxyC.y > 0.5) { size *= O.proxyC.z / max(-(F.view * w).z, 1e-4); }
  size = max(size, 1.0);   // GL rasterizes points at least a pixel wide (distant stars stay visible)
  clip = vec4f(clip.xy + q * size * F.screen.xy * clip.w, clip.zw);
  o.pos = clip; o.wpos = w.xyz; o.wnrm = vec3f(0.0, 1.0, 0.0); o.uv = vec2f(q.x * 0.5 + 0.5, 0.5 - q.y * 0.5); o.uv2 = o.uv;
  o.col = select(vec4f(1.0), c, O.mflags2.x > 0.5);
  return o;
}
// three.js material.side: FrontSide / BackSide cull the other face (winding flips under a mirroring transform)
// sf-drive (polish): and so does the planar pass' mirrored camera (F.misc.z 1 with the reflection on; the dynamic probe's
// pass - pass kind 1, no reflection - is not mirrored): a FrontSide mesh in the mirror drew only its back faces (the Palace
// of Fine Arts' rotunda black in its lagoon)
fn culled(ff: bool) -> bool {
  let mir = F.misc.z > 0.5 && F.screen.z > 0.5;
  let front = (ff != (O.mflags14.w > 0.5)) != mir; let side = O.mflags14.z;
  return (side < 0.5 && !front) || (side > 0.5 && side < 1.5 && front);
}
@fragment fn fs(i: VOut, @builtin(front_facing) ff: bool) -> FOut {
  if (culled(ff)) { discard; }
  // sf-drive (round 30): renderer.skyVis.debug 3 - which side of each surface is seen: green its outside (the normal toward
  // the camera), red its inside, blue a double-sided material's (leaves, fronds: either); test/facing.cjs counts them
  if (F.skyG.w > 2.5) { let fo = dot(i.wnrm, F.camPos.xyz - i.wpos) >= 0.0; let c = select(select(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), fo), vec3f(0.0, 0.0, 1.0), O.mflags14.z > 1.5) * select(0.5, 1.0, ff != (O.mflags14.w > 0.5)) + select(vec3f(0.0), vec3f(0.0, 0.0, 0.5), O.mflags14.w > 0.5);
    return FOut(vec4f(c, 1.0), vec4f(c, viewDepth(i.wpos))); }
  var s = shadeA(i);
  s = vec4f(select(vec3f(0.0), s.rgb, s.rgb == s.rgb), s.a);   // sf-drive (round 29): a NaN (a degenerate leaf normal, ...) never reaches the screen or the reflections
  if (F.skyG.w > 0.5) { return FOut(vec4f(srgbOETF(clamp(s.rgb, vec3f(0.0), vec3f(1.0))), 1.0), vec4f(s.rgb, viewDepth(i.wpos))); }   // sf-drive: renderer.skyVis.debug, as is
  if (O.mflags12.w > 0.5) { if (O.mflags12.w < 1.5) { s.a = 1.0; } else if (s.a < 0.004) { discard; } }   // glass: see-through cut-outs show what is behind
  var disp = select(present(s.rgb).rgb, srgbOETF(clamp(s.rgb, vec3f(0.0), vec3f(1.0))), O.mflags4.w > 0.5);   // toneMapped = false
  if (O.mflags.w > 2.5 && O.mflags.w < 3.5) { disp = s.rgb; }   // MeshNormalMaterial: the packed normal as is (no tone mapping, no encoding)
  return FOut(fogged(vec4f(disp, s.a), i.wpos), vec4f(s.rgb, viewDepth(i.wpos)));
}
@fragment fn fsLin(i: VOut, @builtin(front_facing) ff: bool) -> @location(0) vec4f { if (culled(ff)) { discard; } return vec4f(shadeA(i).rgb, 1.0); }
// TAA reactive mask: moving blended surfaces (particles, sprites, glass) write their coverage; the resolve trusts history less there
@fragment fn fsReact(i: VOut) -> @location(0) vec4f {
  let muv = vec2f(dot(O.uvT0.xyz, vec3f(i.uv, 1.0)), dot(O.uvT1.xyz, vec3f(i.uv, 1.0)));
  var a = O.baseColor.a * i.col.a;
  let t = textureSample(matMap, matSamp, muv);
  if (O.mflags.x > 0.5) { a *= select(t.a, max(t.r, max(t.g, t.b)), t.a > 0.99); }   // opaque-alpha (additive) textures: brightness
  return vec4f(0.0, 0.0, 0.0, clamp(a * 2.0, 0.0, 1.0));
}
`
  ).replace(
    "ALBEDO_HOOK",
    t
      ? "{ gNw = n; gUV2 = i.uv2; let a = mbAlbedo(muv, i.wpos, i.col, O.baseColor); base = a.rgb; alpha = a.a; }"
      : "if (O.uvT1.w > 4.5) { base = landmarkFallback(muv, i.wpos, i.col, O.baseColor, O.uvT1.w - 5.0); alpha = O.baseColor.a; } else if (O.uvT1.w > 3.5) { base = i.col.rgb; alpha = O.baseColor.a; } else if (O.uvT1.w > 2.5) { base = trafficFallback(muv, i.col, O.baseColor); alpha = O.baseColor.a; } else if (O.uvT1.w > 0.5) { base = crowdPaletteFallback(i.uv, i.col.rgb, O.uvT1.w > 1.5); alpha = O.baseColor.a; }",
  );
}
