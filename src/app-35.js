// app 35 — f32
// Lines 48947-49481 of readable/app.pretty.js (statement-aligned).
var T7 = (o, t = !1) =>
    UV +
    (Mb && !cp
      ? `
@group(2) @binding(22) var<storage, read> skyBuf: array<u32>;  // sf-drive (round 31): the field's bytes (renderer.setSkyField)
fn skyByte(x: u32, y: u32, w: u32) -> f32 { let k = y * w + x; return f32((skyBuf[2u + (k >> 2u)] >> ((k & 3u) * 8u)) & 255u); }
fn skyFieldAt(p: vec3f) -> f32 {
  if (F.skyF.z <= 0.0) { return 1.0; }
  let q = (p.xz - F.skyF.xy) * F.skyF.zw;
  if (q.x < 0.0 || q.y < 0.0 || q.x > 1.0 || q.y > 1.0) { return 1.0; }
  let w = skyBuf[0]; let h = skyBuf[1];
  let u = max(q * vec2f(f32(w), f32(h)) - 0.5, vec2f(0.0)); let i0 = vec2u(u); let f = u - vec2f(i0);
  let x1 = min(i0.x + 1u, w - 1u); let y1 = min(i0.y + 1u, h - 1u);
  let a = mix(skyByte(i0.x, i0.y, w), skyByte(x1, i0.y, w), f.x); let b = mix(skyByte(i0.x, y1, w), skyByte(x1, y1, w), f.x);
  return mix(a, b, f.y) / 255.0;
}
`
      : cp
        ? `
@group(2) @binding(20) var skyTex: texture_2d<f32>;          // sf-drive: baked sky visibility at street level (renderer.setSkyField)
fn skyFieldAt(p: vec3f) -> f32 {
  if (F.skyF.z <= 0.0) { return 1.0; }
  let q = (p.xz - F.skyF.xy) * F.skyF.zw;
  if (q.x < 0.0 || q.y < 0.0 || q.x > 1.0 || q.y > 1.0) { return 1.0; }
  return textureSampleLevel(skyTex, linSamp, q, 0.0).r;
}
`
        : `
fn skyFieldAt(p: vec3f) -> f32 { return 1.0; }
`) +
    (t
      ? `
@group(2) @binding(17) var pointSM: texture_depth_2d_array;  // point-light cube shadows: 6 faces in a 3x2 atlas per layer
@group(2) @binding(18) var spotMaps: texture_2d_array<f32>;   // SpotLight.map, one layer per mapped spot
@group(2) @binding(19) var aoTex: texture_2d<f32>;           // screen-space AO (GTAO, half resolution)
@group(2) @binding(21) var smMove: texture_depth_2d;         // sf-drive: sun shadow map of the movers (the traffic) at the cached map's projection
`
      : "") +
    `
@group(2) @binding(15) var dynProbe: texture_2d<f32>;       // the lamps' light seen from the global probe, prefiltered as the priors
@group(2) @binding(0) var priors: texture_2d_array<f32>;   // prefiltered probe(s): mirror..cosine as layers, or as mips per probe
@group(2) @binding(1) var envSamp: sampler;                  // u repeat, v clamp, linear
@group(2) @binding(2) var latents: texture_2d_array<f32>;   // neural latent textures (layer*groups + g)
@group(2) @binding(3) var latSamp: sampler;
@group(2) @binding(4) var bgTex: texture_2d<f32>;            // full-res background equirect
@group(2) @binding(5) var smStatic: texture_depth_2d;        // sun shadow map: static casters (cached)
@group(2) @binding(6) var smDyn: texture_depth_2d;           // sun shadow map: moving casters (every frame)
@group(2) @binding(7) var shadowSamp: sampler_comparison;
@group(2) @binding(8) var planarTex: texture_2d<f32>;        // planar reflection of the scene in the floor (mipped)
@group(2) @binding(9) var scenePrev: texture_2d<f32>;        // last frame's linear opaque colour
@group(2) @binding(10) var linSamp: sampler;                 // clamp, linear, linear mips
@group(2) @binding(11) var<uniform> LB: Lights;
@group(2) @binding(12) var<storage, read> CLU: array<u32>;   // per cluster: count, then light indices
@group(2) @binding(13) var spotStatic: texture_depth_2d;     // spot shadow atlas: static casters (cached)
@group(2) @binding(14) var spotDyn: texture_depth_2d;        // spot shadow atlas: moving casters (every frame)
@group(2) @binding(16) var glassT: texture_2d_array<f32>;    // translucent shadow maps (layer 0 sun, 1 spot atlas): rgb the glass
                                                             // layers' transmittance product, a the nearest glass depth
fn planarAt(px: vec2f, level: i32) -> vec4f { return textureSampleLevel(planarTex, linSamp, px * F.screen.xy, F.planarLod[level]); }
// the same, smoothed: four trilinear taps half a texel apart hide the blocks of the coarse box mips (studio floor; not trained on)
// Studio tubes (LED line lights, renderer.tubes): what a reflected ray r from p sees of them. Each tube is a segment of
// radius R; seen from p at distance t it is a strip of angular half-width R / t, widened by the surface's lobe (spread,
// radians) and by the pixel's footprint (fw: how fast r changes across a pixel; thin lines otherwise sparkle).
fn tubeRefl(p: vec3f, r: vec3f, spread: f32, fw: f32) -> vec3f { return tubeReflF(p, r, spread, fw, false); }
// (sf-drive studio67: floor - not the tubes marked noFloor, the overhead ones the Garage's camera would see as bars at its feet)
fn tubeReflF(p: vec3f, r: vec3f, spread: f32, fw: f32, floor: bool) -> vec3f {
  var c = vec3f(0.0);
  for (var k = 0; k < i32(F.tubeInfo.x); k++) {
    if (floor && F.tubes[3 * k + 1].w > 0.5) { continue; }
    let A = F.tubes[3 * k]; let B = F.tubes[3 * k + 1].xyz;
    let ab = B - A.xyz; let ap = p - A.xyz;
    let mc = 0.5 * ab - ap; let md = dot(mc, r); let hl = 0.5 * length(ab) + A.w + 0.05;   // the tube's bounding sphere: off the ray, skip
    if (md < -hl || dot(mc, mc) - md * md > hl * hl) { continue; }
    let L = F.tubes[3 * k + 2].rgb;
    let bb = dot(r, ab); let cc = max(dot(ab, ab), 1e-8); let d = dot(r, ap); let e = dot(ab, ap);
    let den = cc - bb * bb;
    var u = select(e / cc, (e - bb * d) / den, den > 1e-6 * cc); u = clamp(u, 0.0, 1.0);
    let q = A.xyz + u * ab; let t = dot(q - p, r);
    if (t <= 0.02) { continue; }
    let th = length(p + t * r - q) / t; let w = A.w / t;
    // (studio68) on the floor the reflection softens and fades up the tube (the higher its point, the farther the glossy
    // floor's blur spreads it): short soft streaks at the tubes' feet, not hard bars the length of the room
    let hq = select(0.0, max(q.y - p.y, 0.0), floor);
    let sw = sqrt(w * w + (spread + 0.0025 * hq) * (spread + 0.0025 * hq) + fw * fw);
    c += L * (w / sw) * (1.0 - smoothstep(0.35 * sw, 1.25 * sw, th)) * select(1.0, 1.7 * exp(-0.38 * hq), floor);   // (studio70: longer, stronger - the film's floor)
  }
  return c;
}
fn vnoise2(p: vec2f) -> f32 {   // value noise in 0..1 (the studio's concrete floor)
  let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  let h = vec4f(dot(i, vec2f(127.1, 311.7)), dot(i + vec2f(1.0, 0.0), vec2f(127.1, 311.7)), dot(i + vec2f(0.0, 1.0), vec2f(127.1, 311.7)), dot(i + vec2f(1.0, 1.0), vec2f(127.1, 311.7)));
  let r = fract(sin(h) * 43758.5453);
  return mix(mix(r.x, r.y, u.x), mix(r.z, r.w, u.x), u.y);
}
// the tubes' direct light at p (normal n): each tube as three short segments of a line source; occ: soft shadow of an
// ellipsoid (centre, semi-axes) for points on the floor (the car's shadow from every tube, soft by construction)
fn tubeIrr(p: vec3f, n: vec3f, occ: bool, oc: vec3f, oa: vec3f) -> vec3f {
  // closed form per tube: a strip of width 2R along A..B: E = L 2R cos / h (atan(t1 / h) - atan(t0 / h)), the receiver's
  // cosine taken towards the segment's closest point; occ: the closest point's visibility past the ellipsoid (soft)
  var e = vec3f(0.0);
  for (var k = 0; k < i32(F.tubeInfo.x); k++) {
    let A = F.tubes[3 * k]; let B = F.tubes[3 * k + 1].xyz;
    let ab = B - A.xyz; let len = length(ab); let u = ab / max(len, 1e-5);
    let t = dot(p - A.xyz, u); let q = A.xyz + u * clamp(t, 0.0, len); let dv = q - p; let dq = length(dv);
    let c = dot(n, dv) / max(dq, 1e-4); if (c <= 0.0) { continue; }
    let h = max(length(p - (A.xyz + u * t)), 0.05);
    let ang = atan((len - t) / h) - atan(-t / h);
    var vis = 1.0;
    if (occ) { let o = (p - oc) / oa; let dd = dv / oa; let s = clamp(-dot(o, dd) / max(dot(dd, dd), 1e-6), 0.0, 1.0); vis = smoothstep(0.7, 1.15, length(o + dd * s)); }
    e += F.tubes[3 * k + 2].rgb * (2.0 * A.w * c * vis * ang / h);
  }
  return e;
}
// the floor's shadow ratio from the tubes (occluded / open light, luminance), one pass: the car as an ellipsoid
fn tubeShadow(p: vec3f, oc: vec3f, oa: vec3f) -> f32 {
  var e0 = 0.0; var e1 = 0.0;
  for (var k = 0; k < i32(F.tubeInfo.x); k++) {
    let A = F.tubes[3 * k]; let B = F.tubes[3 * k + 1].xyz;
    let ab = B - A.xyz; let len = length(ab); let u = ab / max(len, 1e-5);
    let t = dot(p - A.xyz, u); let q = A.xyz + u * clamp(t, 0.0, len); let dv = q - p; let dq = length(dv);
    let c = dv.y / max(dq, 1e-4); if (c <= 0.0) { continue; }
    let h = max(length(p - (A.xyz + u * t)), 0.05);
    let w = dot(F.tubes[3 * k + 2].rgb, vec3f(0.333)) * A.w * c * (atan((len - t) / h) - atan(-t / h)) / h;
    let o = (p - oc) / oa; let dd = dv / oa; let s = clamp(-dot(o, dd) / max(dot(dd, dd), 1e-6), 0.0, 1.0);
    e0 += w; e1 += w * smoothstep(0.5, 1.35, length(o + dd * s));
  }
  return e1 / max(e0, 1e-5);
}
fn planarAtSmooth(px: vec2f, level: i32) -> vec4f { return planarAtLod(px, F.planarLod[level]); }
// glossy floor at grazing view: the reflection stretches along screen y (x st); four taps spread over that length
fn planarAniso(px: vec2f, lod: f32, st: f32) -> vec4f {
  let l = max(lod, 0.8); let uv = px * F.screen.xy;
  if (st < 1.05) { return textureSampleLevel(planarTex, linSamp, uv, l); }
  let h = exp2(l) * 2.0 * F.screen.y * (st - 1.0) / 3.0;   // three taps along screen y
  return (textureSampleLevel(planarTex, linSamp, uv - vec2f(0.0, h), l) + textureSampleLevel(planarTex, linSamp, uv, l) + textureSampleLevel(planarTex, linSamp, uv + vec2f(0.0, h), l)) / 3.0;
}
fn planarAtLod(px: vec2f, lod: f32) -> vec4f {
  let uv = px * F.screen.xy;
  if (lod < 1.0) { return textureSampleLevel(planarTex, linSamp, uv, lod); }
  let o = exp2(lod) * F.screen.xy;   // half a texel of that level (the reflection is half resolution)
  return 0.25 * (textureSampleLevel(planarTex, linSamp, uv + vec2f(-o.x, -o.y), lod) + textureSampleLevel(planarTex, linSamp, uv + vec2f(o.x, -o.y), lod)
               + textureSampleLevel(planarTex, linSamp, uv + vec2f(-o.x, o.y), lod) + textureSampleLevel(planarTex, linSamp, uv + vec2f(o.x, o.y), lod));
}
fn sceneAt(q: vec3f, fallback: vec3f) -> vec3f {   // project into last frame; probe value when off screen / no data
  let c = F.prevViewProj * vec4f(q, 1.0);
  if (c.w <= 1e-4) { return fallback; }
  let uv = vec2f(c.x / c.w * 0.5 + 0.5, 0.5 - c.y / c.w * 0.5);
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) { return fallback; }
  let sc = textureSampleLevel(scenePrev, linSamp, uv, 0.0);
  return select(fallback, sc.rgb, sc.a > 0.0);
}
// Screen-space reflection against last frame's opaque image (rgb) and view depth (alpha): exponential march with the previous
// camera, then a binary refinement. Returns (radiance, confidence).
var<private> gSsrUV: vec2f = vec2f(0.0);   // sf-drive (round 27): the last hit's uv in last frame's image
var<private> gSsrT: f32 = 0.0;   // sf-drive (round 29): the last hit's distance along the ray
var<private> gP: vec3f = vec3f(0.0);
var<private> gSsrNear: f32 = 0.0;   // (round 29) the wet road's reflected ray blocked close by (a car, a wall): no lamp streak through it
fn ssrTrace(p: vec3f, r: vec3f, px: vec2f, nrm: vec3f) -> vec4f {
  let dims = vec2f(textureDimensions(scenePrev));
  let gk = max(1.17, pow(F.ssr.y / 0.06, 1.0 / 28.0));   // sf-drive: the march reaches the max distance in 28 steps
  // sf-drive: the march's steps dithered per pixel and per frame (the TAA jitter, read off the jittered matrix, turns the
  // pattern): a fixed exponential march left the same step boundaries in every pixel, stripes across glossy facades that
  // crawled as the camera moved; dithered, TAA averages them out
  let ja = F.viewProj * vec4f(p, 1.0); let jb = F.vpu * vec4f(p, 1.0);
  let jit = (ja.xy / ja.w - jb.xy / jb.w) * 0.5 * dims;
  let dn = fract(ign(px) * 0.15915494 + fract(jit.x * 3.7 + jit.y * 5.3 + 7.0) * 0.61803399);
  var t = 0.03 * pow(gk, dn); var tPrev = 0.0; var found = false; var front = true;
  for (var k = 0; k < 28; k++) {
    let c = F.prevViewProj * vec4f(p + r * t, 1.0);
    if (c.w <= 1e-3) { break; }
    let uv = vec2f(c.x / c.w * 0.5 + 0.5, 0.5 - c.y / c.w * 0.5);
    if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) { break; }
    let sd = textureLoad(scenePrev, vec2i(uv * dims), 0).a;
    let dz = c.w - sd;
    // sf-drive: a crossing from in front to behind counts however long the step was (the long far steps jumped over
    // thin surfaces in some pixels and not their neighbours); the refinement below finds the surface and checks it
    if (sd > 0.0 && dz > 0.0 && dz < F.ssr.z + t * 0.1 + select(0.0, t - tPrev, front)) { found = true; break; }
    front = sd <= 0.0 || dz <= 0.0;
    tPrev = t; t = t * gk + 0.01;
    if (t > F.ssr.y) { break; }
  }
  if (!found) { return vec4f(0.0); }
  var lo = tPrev; var hi = t;
  for (var k = 0; k < 5; k++) {
    let m = 0.5 * (lo + hi); let c = F.prevViewProj * vec4f(p + r * m, 1.0);
    let uv = vec2f(c.x / c.w * 0.5 + 0.5, 0.5 - c.y / c.w * 0.5);
    let sd = textureLoad(scenePrev, vec2i(clamp(uv, vec2f(0.0), vec2f(0.9999)) * dims), 0).a;
    if (sd > 0.0 && c.w > sd) { hi = m; } else { lo = m; }
  }
  let c = F.prevViewProj * vec4f(p + r * hi, 1.0);
  let uv = clamp(vec2f(c.x / c.w * 0.5 + 0.5, 0.5 - c.y / c.w * 0.5), vec2f(0.0), vec2f(0.9999));
  let hitc = textureLoad(scenePrev, vec2i(uv * dims), 0);
  if (hitc.a > 30000.0) { return vec4f(0.0); }   // the background: the probe knows it better
  // sf-drive (round 29): a non-finite pixel (a half-float bulb overflowed to inf; inf x 0 in a mix is NaN) is no hit: read
  // by the wet road's or a car's reflection it became NaN there, read back the next frame by its neighbours' rays - black
  // cut-outs of the parked cars in wet roads and black scribbles on their paint that fed themselves frame after frame
  if (!all(hitc.rgb == hitc.rgb) || any(hitc.rgb > vec3f(60000.0))) { return vec4f(0.0); }
  gSsrUV = uv; gSsrT = hi;
  // sf-drive: the refined point off every surface (the ray passed behind something) counts less the further off it is
  // (soft, so the hit / miss boundary does not flicker from frame to frame)
  var conf = 1.0 - smoothstep(0.5, 1.0, (c.w - hitc.a) / (F.ssr.z + hi * 0.1));
  // sf-drive: a hit on the ray's own plane is the surface finding itself (a glancing ray over a flat facade or road, last
  // frame's jittered depth a hair behind it): where the depth there is the plane's own depth, no reflection
  let cd = normalize(p + r * hi - F.camPos.xyz); let den = dot(cd, nrm);
  if (abs(den) > 1e-4) {
    let pc = F.prevViewProj * vec4f(F.camPos.xyz + cd * (dot(p - F.camPos.xyz, nrm) / den), 1.0);
    conf *= smoothstep(0.03, 0.07, (abs(hitc.a - pc.w) - 0.05) / pc.w);
  }
  let edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  let fade = clamp(edge * 10.0, 0.0, 1.0) * (1.0 - smoothstep(F.ssr.y * 0.6, F.ssr.y, hi)) * clamp(r.z * 0.0 + 1.0, 0.0, 1.0) * conf;
  return vec4f(hitc.rgb, fade);
}
// sf-drive (round 27): the reflection at a wet road's hit smeared along the screen's vertical (8 taps over up to ~20 % of
// the height, dithered per pixel for the TAA to smooth; taps on the sky or off screen keep the hit's own colour): a
// lamp's bulb or a lit window becomes a long streak down the road, the facades' reflections blur the way rippled water
// blurs them
// (round 29) each tap's highlights compressed by its largest channel (hue kept): a tail lamp's or a near bulb's pixels,
// tens of times the street's level, smeared down the screen burnt to white-yellow bars; now they keep their colour
fn hiK(c: vec3f) -> vec3f {   // identity up to 0.5, then a knee toward 0.5 + 1.0
  let m = max(c.x, max(c.y, c.z)); if (m <= 0.5) { return c; }
  let e = m - 0.5; return c * ((0.5 + e / (1.0 + e)) / m);
}
fn ssrStreak(c0: vec3f, px: vec2f, an: f32) -> vec3f {
  let dims = vec2f(textureDimensions(scenePrev));
  let len = 0.2 * an; let j = fract(ign(px) * 0.15915494 + 0.5);
  var s = vec3f(0.0); var w = 0.0;
  for (var k = 0; k < 8; k++) {
    let o = ((f32(k) + j) / 8.0 - 0.5) * len;
    let uv = gSsrUV + vec2f((fract(j * 7.31 + f32(k) * 0.618034) - 0.5) * len * 0.07 * F.screen.x / F.screen.y, o);   // (a little wider than the bulb: soft, not a thin line)
    let tw = 1.0 - abs(o) / (0.5 * len + 1e-4); let wk = 0.04 + tw * tw;   // (a tent, squared: the streak brightest at the bulb's own place, tapering off)
    if (uv.y < 0.0 || uv.y > 1.0) { s += hiK(c0) * wk; w += wk; continue; }
    let sc = textureSampleLevel(scenePrev, linSamp, uv, 0.0);
    s += hiK(select(c0, sc.rgb, sc.a > 0.0 && sc.a < 30000.0 && all(sc.rgb == sc.rgb) && all(sc.rgb < vec3f(60000.0)))) * wk; w += wk;
  }
  return s / max(w, 1e-4);
}
// sf-drive (round 28): the far lamps' streaks on a wet road, past the march's reach (the ray to a lamp from a road point
// d m off runs ~3x d: lamps past ~100 m had none). The reflected ray read where it crosses a lamp's height (3.5-10 m over
// the road: acorns to cobra-heads) - a short span of last frame's screen column - smeared down the screen as ssrStreak's;
// only what stands out over the sky's reflection there (bulbs, lit windows) is added, and only beyond the march's reach
fn wetFar(p: vec3f, r: vec3f, px: vec2f, an: f32, base: vec3f) -> vec3f {
  if (r.y < 0.003) { return vec3f(0.0); }
  let tA = 3.5 / r.y; let tB = 10.0 / r.y;
  if (tB < F.ssr.y * 0.5) { return vec3f(0.0); }
  let cA = F.prevViewProj * vec4f(p + r * tA, 1.0); let cB = F.prevViewProj * vec4f(p + r * tB, 1.0);
  if (cA.w <= 1e-3 || cB.w <= 1e-3) { return vec3f(0.0); }
  let uA = vec2f(cA.x / cA.w * 0.5 + 0.5, 0.5 - cA.y / cA.w * 0.5); let uB = vec2f(cB.x / cB.w * 0.5 + 0.5, 0.5 - cB.y / cB.w * 0.5);
  let ja = F.viewProj * vec4f(p, 1.0); let jb = F.vpu * vec4f(p, 1.0);   // (the pattern turned per frame by the TAA's jitter, as the march's: TAA averages the taps)
  let jit = (ja.xy / ja.w - jb.xy / jb.w) * 0.5 * vec2f(textureDimensions(scenePrev));
  let len = 0.1 * an; let j = fract(ign(px) * 0.15915494 + fract(jit.x * 3.7 + jit.y * 5.3 + 7.0) * 0.61803399);
  let bl = max(dot(base, vec3f(0.2126, 0.7152, 0.0722)), 0.02);
  let own = dot(p - F.camPos.xyz, normalize(p - F.camPos.xyz));
  var s = vec3f(0.0);
  for (var k = 0; k < 12; k++) {
    let f = (f32(k) + j) / 12.0;
    let h = fract(f * 2.618034 + j);   // (a second stratum: the lamp's height along the ray)
    let o = (f - 0.5) * len;
    let uv = mix(uA, uB, h) + vec2f((fract(j * 5.17 + f32(k) * 0.618034) - 0.5) * len * 0.07 * F.screen.x / F.screen.y, o);
    if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) { continue; }
    let t = mix(tA, tB, h); let dw = mix(cA.w, cB.w, h);
    let sc = textureSampleLevel(scenePrev, linSamp, uv, 0.0);
    let ok = sc.a > own * 1.1 && sc.a > dw * 0.55 && sc.a < dw * 1.8 && sc.a < 30000.0;
    let lum = dot(sc.rgb, vec3f(0.2126, 0.7152, 0.0722));
    let w = smoothstep(1.5, 4.0, lum / bl) * smoothstep(F.ssr.y * 0.5, F.ssr.y * 0.8, t) * (1.0 - abs(f - 0.5) * 1.4);
    s += select(vec3f(0.0), min(sc.rgb, vec3f(64.0)) * w, ok);   // (a half-float bulb can be inf: inf x 0 is NaN, spread by the TAA as black blots)
  }
  let o4 = s * (4.0 / 12.0); return select(vec3f(0.0), o4, all(o4 == o4));
}
fn sceneBlur(q: vec3f, fallback: vec3f, px: f32) -> vec3f {   // sceneAt with a small disc blur of px pixels
  let c = F.prevViewProj * vec4f(q, 1.0);
  if (c.w <= 1e-4) { return fallback; }
  let uv = vec2f(c.x / c.w * 0.5 + 0.5, 0.5 - c.y / c.w * 0.5);
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) { return fallback; }
  var acc = vec3f(0.0); var wsum = 0.0;
  let o = F.screen.xy * px;
  for (var k = 0; k < 5; k++) {
    let d = select(vec2f(0.0), vec2f(cos(f32(k) * 1.2566), sin(f32(k) * 1.2566)), k > 0);
    let sc = textureSampleLevel(scenePrev, linSamp, clamp(uv + d * o, vec2f(0.0), vec2f(1.0)), 0.0);
    let w = select(0.0, 1.0, sc.a > 0.0); acc += sc.rgb * w; wsum += w;
  }
  return select(fallback, acc / max(wsum, 1e-4), wsum > 0.5);
}
fn priorAt(d: vec3f, level: i32, layer: i32) -> vec3f {
  ${o ? "return textureSampleLevel(priors, envSamp, equirectUV(d), layer, f32(level)).rgb;" : "return textureSampleLevel(priors, envSamp, equirectUV(d), level, 0.0).rgb;"}
}
fn prior(d: vec3f, level: i32) -> vec3f { return priorAt(d, level, i32(O.probe.w)); }

const POISSON = array<vec2f, 16>(
  vec2f(-0.9420, -0.3991), vec2f(0.9456, -0.7689), vec2f(-0.0942, -0.9294), vec2f(0.3450, 0.2939),
  vec2f(-0.9159, 0.4577), vec2f(-0.8154, -0.8791), vec2f(-0.3828, 0.2768), vec2f(0.9748, 0.7565),
  vec2f(0.4432, -0.9751), vec2f(0.5374, -0.4737), vec2f(-0.2650, -0.4189), vec2f(0.7920, 0.1909),
  vec2f(-0.2419, 0.9971), vec2f(-0.8141, 0.9144), vec2f(0.1998, 0.7864), vec2f(0.1438, -0.1410));
fn shadowCoord(p: vec3f) -> vec3f {
  let c = F.lightVP * vec4f(p, 1.0);
  return vec3f(c.x * 0.5 + 0.5, 0.5 - c.y * 0.5, c.z);
}
fn ign(px: vec2f) -> f32 { return fract(52.9829189 * fract(dot(px, vec2f(0.06711056, 0.00583715)))) * 6.2831853; }
// Percentage-closer soft shadows sized to the sun's angular diameter: blocker search, then a penumbra-wide PCF.
fn pcss(smap: texture_depth_2d, sc: vec3f, ang: f32, SH: vec4f, bias: f32) -> f32 {   // SH: the map's F.shadow (texel, depth range, uv per metre, tan)
  if (sc.x <= 0.0 || sc.y <= 0.0 || sc.x >= 1.0 || sc.y >= 1.0 || sc.z >= 1.0) { return 1.0; }
  let taa = F.sunB.w > 0.5;
  if (!taa) {
    // The low tiers have no temporal history to average stochastic blocker searches.
    // A 3x3 tent of hardware-filtered comparisons keeps coarse-map edges smooth and stable.
    var lit = 0.0;
    for (var y = -1; y <= 1; y++) { for (var x = -1; x <= 1; x++) {
      let weight = select(1.0, 2.0, x == 0) * select(1.0, 2.0, y == 0);
      lit += weight * textureSampleCompareLevel(smap, shadowSamp, sc.xy + vec2f(f32(x), f32(y)) * SH.x, sc.z - bias);
    } }
    return lit * 0.0625;
  }
  let dim = vec2f(textureDimensions(smap));
  // the pattern turns every frame with TAA (F.sunB.w: the frame's index) for the history to integrate
  let a2 = ang + F.sunB.w * 2.39996;
  let cs = vec2f(cos(a2), sin(a2));
  let rot = mat2x2f(cs.x, cs.y, -cs.y, cs.x);
  // sf-drive (veg50): the search spans the penumbra of a blocker up to ~6 m above (a street tree's crown), not 1.2 m: under
  // the crowns the few taps of a 2.5 cm search missed the leaves' gaps' edges and returned 'lit' at random - the dappled
  // shade's rims a salt-and-pepper speckle that the TAA could not settle in motion
  let searchR = 6.0 * 2.0 * SH.w * SH.z + 2.0 * SH.x;
  var sum = 0.0; var cnt = 0.0; var tot = 0.0;
  for (var i = 0; i < 12; i++) {   // (sf-drive (taa50): all 12 with TAA too - 6 made a dappled shade's blocker depth, so its penumbra's width, a per-pixel lottery)
    let uv = sc.xy + rot * POISSON[i] * searchR;
    let d = textureLoad(smap, vec2i(clamp(uv, vec2f(0.0), vec2f(0.9999)) * dim), 0);
    if (d < sc.z - bias) { sum += d; cnt += 1.0; }
    tot += 1.0;
  }
  if (cnt < 0.5) { return 1.0; }
  if (cnt > tot - 0.5) { return 0.0; }   // every search tap blocked: umbra (the search spans the widest penumbra)
  let pen = (sc.z - sum / cnt) * SH.y * SH.w * SH.z;
  let r = max(pen, 1.5 * SH.x);
  var lit = 0.0;
  // sf-drive (taa50): the taps by the penumbra's area in texels, on a Vogel spiral (any count evenly spread) turned per
  // pixel and per frame: a leafy crown's dappled shade on the near cascade (~1 cm texels) spans a ~5 cm penumbra, ~80
  // texels - 8 taps over it (half of 16 with TAA) left a grain on the car's paint and dash that the history could not
  // settle while the shade swept over a moving car (its history clipped there). A penumbra of a texel or two (most of
  // the city's map) takes the fewest
  let tr = r / SH.x;
  // With temporal accumulation: 8 to renderer.shadowTaps (F.shadowM.y, 32 by default).
  let nt = clamp(i32(tr * tr * 0.6), 8, max(i32(F.shadowM.y), 8));
  let ga = vec2f(-0.7373688, 0.6754903);   // (cos, sin) of the golden angle
  var dr = cs;
  for (var i = 0; i < nt; i++) {
    lit += textureSampleCompareLevel(smap, shadowSamp, sc.xy + dr * (sqrt((f32(i) + 0.5) / f32(nt)) * r), sc.z - bias);
    dr = vec2f(dr.x * ga.x - dr.y * ga.y, dr.x * ga.y + dr.y * ga.x);
  }
  return lit / f32(nt);
}
// sf-drive: the cached view-wide sun map, and the movers' map over it (the traffic: every frame, the city's map only when it moved)
fn sunStatic(sc: vec3f, a: f32, bias: f32) -> f32 {
  let v = pcss(smStatic, sc, a, F.shadow, bias);
  ${t ? "if (F.shadowM.x > 0.0 && v > 0.0) { return min(v, pcss(smMove, sc, a, vec4f(F.shadowM.x, F.shadow.yzw), bias)); }" : ""}
  return v;
}
fn sunShadow(p: vec3f, px: vec2f, useStatic: bool) -> f32 {
  let sc = shadowCoord(p); let a = ign(px);
  var v = 1.0;
  if (F.glassT.y > 0.5 && all(sc.xy > vec2f(0.0)) && all(sc.xy < vec2f(1.0))) {
    let gt = textureLoad(glassT, vec2i(sc.xy * f32(textureDimensions(glassT, 0).x)), 0, 0);   // sf-drive: the sun maps' size live (renderer.setShadowRes)
    if (sc.z > gt.a + 0.001) { v = dot(gt.rgb, vec3f(0.2126, 0.7152, 0.0722)); }
  }
  var bias = select(max(0.0006, F.sunB.y), F.sunB.y, F.sunB.x > 0.0 && F.sunB.y > 0.0);   // sf-drive: a fitted sun's bias as given (renderer.shadowBiasM)
  // sf-drive (round 30): with no near cascade (the phones' tiers) a crown's leaves (double-sided) are shaded only by the
  // view-wide map, ~1 m a texel, which holds the trees' coarse leaf masses (mbFarShadow): every near crown sat inside its
  // own mass's shadow - near-black blobs on the phones. Their receiver bias ~3 m (a crown's depth): the crown's own mass no longer shades
  // it, a building's shadow still does
  if (F.shadowD.x <= 0.0 && O.mflags14.z > 1.5) { bias = bias * 60.0; }
  let R = F.dynRect;   // moving casters only matter inside their (penumbra-padded) footprint
  if (F.shadowD.x > 0.0) {   // sf-drive: the near cascade holds every caster there (static and moving): it alone inside, blended to the view-wide map over its rim
    let cd = F.lightVPD * vec4f(p, 1.0); let sd = vec3f(cd.x * 0.5 + 0.5, 0.5 - cd.y * 0.5, cd.z);
    let e = min(min(sd.x, 1.0 - sd.x), min(sd.y, 1.0 - sd.y));
    if (e > 0.0 && sd.z < 1.0 && useStatic) {
      let near = pcss(smDyn, sd, a, F.shadowD, bias * F.shadow.y / F.shadowD.y);
      // (veg49: blended over 30 % of its half-width, was 12 %: the view-wide map's coarse crowns and the cascade's fine ones
      // met along a straight seam a metre or two wide - a lit patch cut off by a line of shade)
      let t = smoothstep(0.0, 0.3, e);
      if (t > 0.999) { return v * near; }
      return v * mix(sunStatic(sc, a + 1.7, bias), near, t);
    }
    if (useStatic) { v *= sunStatic(sc, a + 1.7, bias); }
    return v;
  }
  if (sc.x >= R.x && sc.y >= R.y && sc.x <= R.z && sc.y <= R.w) { v = pcss(smDyn, sc, a, F.shadow, bias); }
  if (useStatic) { v *= sunStatic(sc, a + 1.7, bias); }
  return v;
}
// sf-drive (bridges49): the baked city shadow at p (normal ng: the lookup moved 1.5 cells off the surface, out of its own
// building's cell), faded in where the live sun maps end (everywhere when there are none: the safe tier)
${
  Sb
    ? `@group(2) @binding(23) var<storage, read> sunBuf: array<u32>;
fn sunQ(x: u32, y: u32, w: u32) -> f32 { let k = y * w + x; return f32((sunBuf[8u + (k >> 1u)] >> ((k & 1u) * 16u)) & 65535u) * 0.125 - 64.0; }
fn citySun(p: vec3f, ng: vec3f) -> f32 {
  let w = sunBuf[0]; if (w < 2u) { return 1.0; }
  let h = sunBuf[1]; let ic = bitcast<f32>(sunBuf[4]);
  var cover = 0.0;
  if (F.sunB.z < 0.5) { let sc = shadowCoord(p); let e = min(min(sc.x, 1.0 - sc.x), min(sc.y, 1.0 - sc.y)); cover = select(0.0, smoothstep(0.0, 0.1, e), sc.z < 1.0); }
  if (cover > 0.999) { return 1.0; }
  let o = ng.xz * (1.5 / ic);
  let q = (p.xz + o - vec2f(bitcast<f32>(sunBuf[2]), bitcast<f32>(sunBuf[3]))) * ic;
  if (q.x < 0.0 || q.y < 0.0 || q.x >= f32(w - 1u) || q.y >= f32(h - 1u)) { return 1.0; }
  let i0 = vec2u(q); let f = q - vec2f(i0);
  let s = mix(mix(sunQ(i0.x, i0.y, w), sunQ(i0.x + 1u, i0.y, w), f.x), mix(sunQ(i0.x, i0.y + 1u, w), sunQ(i0.x + 1u, i0.y + 1u, w), f.x), f.y);
  // (soft over ~3 m of height: the cells' bilinear edge; the sun's penumbra at a few hundred metres is metres wide too)
  // (the lookup's offset toward the sun raised the shadow height by its run x tan(elevation): taken off again)
  let L = F.sunDir.xyz; let lh = max(dot(L.xz, L.xz), 1e-4);
  let lit = smoothstep(-1.6, 1.6, p.y + 0.6 - (s - dot(o, L.xz) * L.y / lh));
  return mix(lit, 1.0, cover);
}`
    : "fn citySun(p: vec3f, ng: vec3f) -> f32 { return 1.0; }"
}
// Moving objects darken the (baked) ambient around them: analytic sphere occlusion.
// sf-drive (round 29): does the ray p + r t meet the player's car (a box round its body in its own frame, F.nf; every
// tier - the phones have no SSR)? A lamp's wet streak on the road whose light passes through the car is hidden: the
// lamps down the street drew bars from under the player's car to the screen's foot (the car casts no lamp shadows)
fn carRay(p: vec3f, r: vec3f) -> f32 {
  let o = (F.nf * vec4f(p, 1.0)).xyz; let d = (F.nf * vec4f(r, 0.0)).xyz;
  let lo = vec3f(-0.95, 0.0, -2.25); let hi = vec3f(0.95, 1.35, 2.25);
  let inv = 1.0 / select(d, vec3f(1e-6), abs(d) < vec3f(1e-6));
  let t0 = (lo - o) * inv; let t1 = (hi - o) * inv;
  let tn = max(max(min(t0.x, t1.x), min(t0.y, t1.y)), min(t0.z, t1.z)); let tf = min(min(max(t0.x, t1.x), max(t0.y, t1.y)), max(t0.z, t1.z));
  return select(0.0, 1.0, tf > max(tn, 0.0) && tn < 40.0);
}
fn occluderAO(p: vec3f, n: vec3f) -> f32 {
  var occ = 0.0;
  for (var i = 0; i < 4; i++) {
    let s = F.occl[i];
    if (s.w > 0.0) {
      let d = s.xyz - p; let l = max(length(d), s.w * 1.05);
      occ += clamp(dot(n, d / l) * (s.w * s.w) / (l * l), 0.0, 1.0);
    }
  }
  return clamp(1.0 - occ, 0.0, 1.0);
}
// ---- punctual lights: three.js light model (inverse-square with optional cutoff window, smoothstep spot cone)
var<private> gFolL: f32 = 0.0;   // sf-drive (round 30): the surface is foliage (shade sets it from gHT.w)
fn lightAtten(L: Light, p: vec3f, lo: ptr<function, vec3f>) -> f32 {
  if (L.dir.w < -3.5) { *lo = -L.dir.xyz; return 1.0; }   // a directional light other than the sun
  let dl = L.pos.xyz - p; let d2 = max(dot(dl, dl), 1e-8); let d = sqrt(d2);
  *lo = dl / d;
  // a lamp's bounce off the floor (dir.w = -3): a Lambertian disc facing dir, radius^2 in extra.z (soft, no singularity)
  if (L.dir.w < -2.5) { return max(dot(-(*lo), L.dir.xyz), 0.0) / (d2 + L.extra.z); }
  // sf-drive (round 29): extra.w = decay + 8 x (the source's radius in cm + 1000 for a low beam), light.userData.mbNear /
  // mbLowBeam: a lamp's lens is no point - within a metre or two the light no longer climbs as 1 / d^decay (pale concrete
  // a metre off the headlamps turned flat white), 1 / (d^2 + r^2)^(decay / 2); the low beam's cut-off (below)
  let code = floor(L.extra.w / 8.0); let decay = L.extra.w - code * 8.0; let nr = (code - 1000.0 * floor(code / 1000.0)) * 0.01;
  var a = 1.0 / max(pow(d2 + nr * nr, decay * 0.5), 0.01);   // three.js getDistanceAttenuation: 1 / d^decay
  if (L.pos.w > 0.0) { let q = d / L.pos.w; let w = clamp(1.0 - q * q * q * q, 0.0, 1.0); a *= w * w; }
  // sf-drive (round 30): a crown round a street lamp's head (foliage: gHT.w) takes no more than the light ~9 m off - the
  // leaves a metre or two from the bulb burned pale yellow-white at dusk, a blown patch in the crown over every lamp
  if (gFolL > 0.5) { a = a * inverseSqrt(1.0 + a * a / (0.012 * 0.012)); }
  if (L.dir.w > -1.5) { a *= smoothstep(L.dir.w, L.extra.x, dot(-(*lo), L.dir.xyz)); }
  // (round 29) a low beam: a sharp horizontal cut-off a little under the lamp's level (SAE / ECE: ~0.6 deg down), the
  // kerb side's step-up past ~10 deg right of the axis (to ~2 deg up), a few percent above it (a wall ahead lit in a band
  // below the lamps, not a flat white wall); the foreground (the road a few metres ahead) dimmer than the hot spot under the
  // cut-off
  if (code >= 1000.0 && L.dir.w > -1.5) {
    let q = -(*lo); let ax = normalize(vec3f(L.dir.x, 0.0, L.dir.z)); let rt = vec3f(-ax.z, 0.0, ax.x);
    let hz = max(dot(q, ax), 1e-3); let side = dot(q, rt) / hz;
    let cut = -0.011 + 0.018 * smoothstep(0.1, 0.45, side);   // (glare63: the kerb side's step-up 0.045 -> 0.018, eased over a wider angle - on a grade that climbs ahead of the car its wedge alone was lit: a narrow hard-edged bar of light up the road)
    let el = q.y / length(vec2f(hz, dot(q, rt))) - L.extra.z;   // (glare63: above the car's own level - extra.z its pitch's tangent)
    a = a * inverseSqrt(1.0 + a * a / (0.03 * 0.03));   // (and a knee: nothing nearer than ~9 m takes much more than the light at ~9 m - pale walls and kerbs a few metres off no longer burn white; the road ahead 15-30 m off loses 8-2 %)
    a *= mix(0.05, 1.0, 1.0 - smoothstep(cut - 0.02, cut + 0.03, el)) * mix(0.4, 1.0, smoothstep(-0.22, -0.05, el));
  }
  // sf-drive (round 23): a street lamp's optics (light.userData.mbStreetLamp { k, shield }: color.w, extra.z): a batwing
  // that throws the light out along the street (its intensity rising toward the cone's edge as 1 / cos^2.5, to 4.5x: the
  // street lit evenly between the lamps instead of a hot spot under each), and a house-side shield (a third toward the
  // fronts behind the pole: no flat bright walls)
  if (L.dir.w > -1.5 && L.color.w > 0.0) {
    let q = -(*lo); let c = max(dot(q, L.dir.xyz), 0.05);
    var side = 1.0;
    if (L.extra.z != 0.0) {
      let hz = vec2f(q.x, q.z); let sh = length(hz);
      let hs = -dot(vec2f(cos(L.extra.z), sin(L.extra.z)), hz) / max(sh, 1e-3);
      side = mix(1.0, 0.3, smoothstep(0.0, 0.8, hs) * smoothstep(0.2, 0.5, sh));
    }
    a *= mix(1.0, min(pow(c, -2.5), 4.5), L.color.w) * side;   // (night49: the shield whole, the batwing by its weight - 0 now: pools, not an evenly lit street)
    // (night49) a street lamp's head is a lantern, not a point: nothing a metre or two off it (a palm's trunk, the pole's
    // neighbour, a bench) takes much more than the street under it - the trunks by the lamps burned white-orange
    a = a * inverseSqrt(1.0 + a * a / (0.028 * 0.028));
  }
  return a;
}
fn spotShadow(tile: i32, p: vec3f, n: vec3f, px: vec2f) -> f32 {
  let c = LB.shadowVP[tile] * vec4f(p, 1.0);
  if (c.w <= 1e-4) { return 1.0; }
  let ndc = c.xyz / c.w;
  if (abs(ndc.x) >= 1.0 || abs(ndc.y) >= 1.0 || ndc.z >= 1.0) { return 1.0; }
  let uv = vec2f(ndc.x * 0.5 + 0.5, 0.5 - ndc.y * 0.5);
  let off = vec2f(f32(tile % 2), f32(tile / 2)) * 0.5;
  let a = ign(px); let cs = vec2f(cos(a), sin(a)); let rot = mat2x2f(cs.x, cs.y, -cs.y, cs.x);
  let r = 2.0 / ${zb / 2}.0;
  var s = 0.0;
  for (var i = 0; i < 8; i++) {
    let u = clamp(uv + rot * POISSON[i * 2] * r, vec2f(0.001), vec2f(0.999)) * 0.5 + off;
    s += textureSampleCompareLevel(spotStatic, shadowSamp, u, ndc.z) * textureSampleCompareLevel(spotDyn, shadowSamp, u, ndc.z);
  }
  var g = 1.0;
  if (F.glassT.z > 0.5) {
    let gt = textureLoad(glassT, vec2i((clamp(uv, vec2f(0.001), vec2f(0.999)) * 0.5 + off) * ${zb}.0), 1, 0);
    if (ndc.z > gt.a + 0.0005) { g = dot(gt.rgb, vec3f(0.2126, 0.7152, 0.0722)); }
  }
  return s / 8.0 * g;
}
fn clusterBase(px: vec2f, p: vec3f) -> u32 {
  let vz = -(F.view * vec4f(p, 1.0)).z;
  let cx = min(u32(px.x * F.screen.x * f32(CL_X)), CL_X - 1u); let cy = min(u32(px.y * F.screen.y * f32(CL_Y)), CL_Y - 1u);
  let cz = u32(clamp(log(max(vz, 1e-4) / F.clusterP.x) / log(F.clusterP.y / F.clusterP.x) * f32(CL_Z), 0.0, f32(CL_Z - 1u)));
  return ((cz * CL_Y + cy) * CL_X + cx) * (CL_MAX + 1u);
}
`,
  Put = T7(!1),
  GV = `
// normal detail without tangents: cotangent frame from screen-space derivatives (normal maps) / three.js bump mapping
fn detailNormal(n0: vec3f, p: vec3f, uv: vec2f) -> vec3f {
  // screen y runs down in WebGPU (up in GL, where three.js' perturbNormal2Arb was written): flip the y derivatives
  let kind = O.mflags.y; let sc = O.mflags2.z;
  if (kind < 0.5) { return n0; }   // no normal / bump map: no derivatives, no fetch (a uniform branch)
  let dp1 = dpdx(p); let dp2 = -dpdy(p); let du1 = dpdx(uv); let du2 = -dpdy(uv);
  let t = textureSample(matDetail, matSamp, uv);
  if (kind < 1.5) {
    let dp2p = cross(dp2, n0); let dp1p = cross(n0, dp1);
    let T = dp2p * du1.x + dp1p * du2.x; let B = dp2p * du1.y + dp1p * du2.y;
    let inv = inverseSqrt(max(max(dot(T, T), dot(B, B)), 1e-20));
    let m = (t.xyz * 2.0 - 1.0) * vec3f(sc, sc * O.dyn.y, 1.0);   // normalScale.x, normalScale.y (as a ratio)
    return normalize(mat3x3f(T * inv, B * inv, n0) * m);
  }
  // bump: height derivatives in screen space (three.js perturbNormalArb)
  let hx = textureSample(matDetail, matSamp, uv + du1).x - t.x; let hy = textureSample(matDetail, matSamp, uv + du2).x - t.x;
  let dh = vec2f(hx, hy) * sc;
  let sx = normalize(dp1); let sy = normalize(dp2);
  let r1 = cross(sy, n0); let r2 = cross(n0, sx); let det = dot(sx, r1);
  let grad = sign(det) * (dh.x * r1 + dh.y * r2);
  return normalize(abs(det) * n0 - grad);
}
`;
