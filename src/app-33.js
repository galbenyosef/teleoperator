// app 33 — indexof
// Lines 48476-48934 of readable/app.pretty.js (statement-aligned).
var NV = `  var thinCov = 1.0;
  if (O.skin.z > 0.0 && F.sunB.w < 0.5 && max(v.col.r, max(v.col.g, v.col.b)) < 0.06 && v.col.a < 0.01) {   // (swollen along the corners' radial normals: O.skin.z px across)
    let add = max(0.0, o.pos.w) * 2.0 * F.clusterP.z * F.screen.y * O.skin.z; thinCov = 0.035 / (0.035 + add);   // Preserve minimum pixel coverage; linear physical coverage avoids overstating a thin wire's darkness.
    w = vec4f(w.xyz + normalize(wn) * add * 0.5, w.w); o.pos = stableClip(F.viewProj * w); }
`,
  HV = `  if (thinCov < 1.0) { o.col = vec4f(mix(vec3f(0.3, 0.32, 0.36), o.col.rgb, thinCov), o.col.a); o.uv = vec2f(0.76); o.wnrm = vec3f(0.0, 1.0, 0.0); }   // (the rest of it the sky's grey: a fainter line, as a TAA'd one; one even shade along it - its round sides lit apart read as beads)
`,
  sh = `
struct Frame {
  viewProj: mat4x4f,
  invViewProj: mat4x4f,
  camPos: vec4f,        // xyz, exposure
  sunDir: vec4f,        // xyz towards the sun, irradiance
  misc: vec4f,          // envIntensity, bgIntensity, pass kind (0 main, 1 planar), relit (sun moved off its baked direction)
  lightVP: mat4x4f,     // shadow-map view-projection of the pass being drawn (sun, or a spot in the spot passes)
  shadow: vec4f,        // texel (uv), depth range (m), uv per metre, tan(sun half angle)
  occl: array<vec4f, 4>,// moving-object occluder spheres (xyz, radius; radius 0 = unused)
  dynRect: vec4f,       // shadow-map uv rectangle that moving casters can darken (min.xy, max.xy); empty = none
  prevViewProj: mat4x4f,// last frame's view-projection (screen-space refraction reads last frame's opaque colour)
  screen: vec4f,        // 1/width, 1/height of the main target, planar reflection available, _
  planarLod: vec4f,     // mip of the planar reflection per prior level (mirror .. broad)
  view: mat4x4f,        // world -> view (cluster lookup)
  clusterP: vec4f,      // near, far, tan(fovY/2), aspect
  fog: vec4f,           // colour (linear), kind (0 none, 1 linear, 2 exp2)
  fogP: vec4f,          // near, far, density, tone mapping (three.js constant: 0 none, 1 linear, 2 Reinhard, 4 ACES, 7 neutral)
  hemiSky: vec4f,       // hemisphere light sky colour * intensity (three.js units)
  hemiGround: vec4f,    // hemisphere light ground colour * intensity
  ambient: vec4f,       // ambient light colour * intensity
  probeBoxMin: vec4f,   // studio bundles: the room box the probe is projected onto (min xyz, 1 = on)
  probeBoxMax: vec4f,   // room box max xyz
  probeC: vec4f,        // the probe's centre (box-projected background)
  ssr: vec4f,           // screen-space reflections of last frame's image: on, max distance (m), thickness (m), strength
  gbounce: vec4f,       // moved sun: floor albedo x (cos new - cos baked), on, no glints, no sun glints
  floorRefl: vec4f,     // the floor lit by the lamps, seen in reflections: albedo rgb, floor height (albedo 0 = off)
  sunOld: vec4f,        // the baked sun's direction, 1 when the sun has moved (its floor light in reflections is swapped)
  glassT: vec4f,        // thin glass in the shadow maps: transmittance, sun map valid, spot map valid, back-face TIR
  sunB: vec4f,          // sun shadow: normal offset (m), depth bias, no sun shadow (1), _
  sunC: vec4f,          // sun colour (the standard path; neural bundles bake theirs), _
  aoP: vec4f,           // screen-space AO on, SSR on the standard path, specular AA on, AO debug view
  vpu: mat4x4f,         // this frame's view-projection without the TAA jitter (motion vectors)
  pvpu: mat4x4f,        // last frame's, without jitter
  tubeInfo: vec4f,      // studio tubes (renderer.tubes): count; renderer.mirrorEnv: the probe in mirror-like reflections (1)
  tubeInfo2: vec4f,     // renderer.metalEnv (the probe in polished metal), tubeDiffuse (their light on the car), tubeFloor (on the floor), _
  tubes: array<vec4f, ${kb * 3}>,   // per tube: end A + radius, end B, radiance rgb
  nf: mat4x4f,          // sf-drive: world -> the player car's body frame (renderer.carFrameInv: its paint's flakes and rain beads; the neural car's tyre atlas)
  fogS: vec4f,          // sf-drive (renderer.fogScatter): the fog's colour toward the sun (display), on (w > 0)
  fogA: vec4f,          // sf-drive: the fog's colour away from the sun (display), height falloff (1/m; 0 = uniform)
  fogH: vec4f,          // sf-drive: fog base height (m), aerial reach (m: distance where the far colour takes over), sun lobe power, the linear term (1/m)
  skyF: vec4f,          // sf-drive (renderer.skyField): the baked sky-visibility field's origin x, z and 1 / its size x, z (0: none)
  skyG: vec4f,          // sf-drive: its strength (0 off .. 1), its contrast (exponent), the neural car's strength, debug view (1, 2: x GTAO)
  skyH: vec4f,          // sf-drive: the floor (the light that reaches an occluded surface anyway: bounce off lit facades and the street), renderer.neuralEnv, renderer.coatFloor (the learned clear-coat occlusion's floor), renderer.coatSat (the coat's reflection saturation, 0: as is)
  lightVPD: mat4x4f,    // sf-drive: the near cascade (smDyn): every caster within ~24 m of the view's foreground and the moving ones, ~1.2 cm a texel (the view-wide map: ~7 cm)
  shadowD: vec4f,       // sf-drive: its texel (uv; 0: none this frame), depth range (m), uv per metre, tan(sun half angle)
  shadowM: vec4f,       // sf-drive: the movers' map (smMove: the traffic, drawn every frame at the cached sun map's projection): its texel (uv; 0: none), _, renderer.carWet, renderer.carWarm
  depthProj: vec4f,     // perspective depth from clip w: A, B, enabled, _
};
struct Obj {
  model: mat4x4f,
  normalMat: mat4x4f,
  params: vec4f,        // latent layer, dynamic, probe blend, surface (1 planar floor, 2 solid glass, 3 thin glass, 4 clear coat)
  baseColor: vec4f,
  mr: vec4f,            // roughness, metalness, analytic direct light (0 learned, 1 + clear-coat weight: Principled), coat roughness
  emissive: vec4f,
  probe: vec4f,         // probe A centre xyz, layer
  probe2: vec4f,        // probe B centre xyz, layer (moving objects blend two path probes)
  proxyC: vec4f,        // refraction proxy (oriented box) centre xyz, 1 if present
  proxyX: vec4f,        // box axes (xyz) and half extents (w)
  proxyY: vec4f,
  proxyZ: vec4f,
  skin: vec4f,          // skinned, first bone matrix, _, _
  uvT0: vec4f,          // material uv transform (three.js map.matrix) rows
  uvT1: vec4f,
  mflags: vec4f,        // has map, normal detail (0 none, 1 normal map, 2 bump map), alphaTest, shading (0 std, 1 lambert, 2 unlit, 3 normal, 4 matcap)
  mflags2: vec4f,       // vertex colours, fog, normal/bump scale, instance colours
  mflags3: vec4f,       // light map: intensity (0 = none), log range (0 = linear), log k, baked indirect (1: replaces ambient, .a = sun visibility)
  mflags4: vec4f,       // transmission (0 = none), thickness (m), ior, no tone mapping (material.toneMapped = false)
  mflags5: vec4f,       // attenuation colour rgb, attenuation distance (0 = none)
  mflags6: vec4f,       // alpha map (1), specular intensity, unresolved normal-map slope variance (tiled detail), sf-drive: baked sky visibility (1 per vertex: uv2.x, 2 the world field)
  mflags7: vec4f,       // maps: roughness, metalness, ambient occlusion (intensity; 0 none), emissive
  mflags8: vec4f,       // clear coat, clear-coat roughness, clear-coat map, clear-coat roughness map
  mflags9: vec4f,       // clear-coat normal map, its scale, flat normals (no normals / flatShading), sheen
  mflags10: vec4f,      // specular colour rgb (Physical specularColor, Phong specular), shininess (Phong)
  mflags11: vec4f,      // maps: specular intensity (Phong specular map), specular colour, transmission, thickness
  mflags12: vec4f,      // env map intensity (0 = no environment), env combine (Phong / Lambert / Basic: 1 + reflectivity, sign: mode), receive shadow, glass alpha mode (1 opaque, 2 blended)
  mflags13: vec4f,      // sheen colour rgb, sheen roughness
  mflags14: vec4f,      // ior (physical F0), AO map on uv2, side (0 front, 1 back, 2 double), mirrored transform
  prevModel: mat4x4f,   // last frame's model matrix (motion vectors)
  dyn: vec4f,           // moved since last frame (skinned, animated, morphed), normalScale y / x, clearcoatNormalScale y / x, _
  whA: vec4f,           // sf-drive: the wheels' hubs (material userData.mbWheels, sfWheel): front left / right (y, z)
  whB: vec4f,           //   rear left / right (y, z)
  whC: vec4f,           //   the hubs' x (front left, front right, rear left, rear right: the steering's pivots)
  whD: vec4f,           //   on (1; 2: the trucks' axles: whA-whC and whD.yz seven (y, z), whD.w the steering pivots' |x|)
  sfx: vec4f,           // sf-drive (crash80): x - a crash's scuffs on this surface (material userData.mbScuff: the vertex colour's alpha), _, _, _
};
struct Bones { m: array<mat4x4f, ${wb}> };
@group(0) @binding(0) var<uniform> F: Frame;
@group(0) @binding(1) var<uniform> BN: Bones;
@group(1) @binding(0) var<uniform> O: Obj;

const PI = 3.14159265358979;
// Computing z and w independently from a combined world/view/projection matrix
// loses their small difference at city coordinates. Derive z from the SAME w
// in every camera vertex pass, preserving the near-plane term and depth order.
fn stableClip(clip: vec4f) -> vec4f {
  if (F.depthProj.z > 0.5) { return vec4f(clip.xy, fma(clip.w, F.depthProj.x, F.depthProj.y), clip.w); }
  return clip;
}
fn equirectUV(d: vec3f) -> vec2f {
  return vec2f(atan2(d.z, d.x) * (0.5 / PI) + 0.5, acos(clamp(d.y, -1.0, 1.0)) * (1.0 / PI));
}
// three.js ACESFilmicToneMapping + sRGB OETF, so both renderers put identical pixels on screen.
fn acesThree(c0: vec3f, exposure: f32) -> vec3f {
  var c = c0 * (exposure / 0.6);
  c = mat3x3f(vec3f(0.59719, 0.07600, 0.02840), vec3f(0.35458, 0.90834, 0.13383), vec3f(0.04823, 0.01566, 0.83777)) * c;
  let a = c * (c + 0.0245786) - 0.000090537;
  let b = c * (0.983729 * c + 0.4329510) + 0.238081;
  c = mat3x3f(vec3f(1.60475, -0.10208, -0.00327), vec3f(-0.53108, 1.10813, -0.07276), vec3f(-0.07367, -0.00605, 1.07602)) * (a / b);
  return clamp(c, vec3f(0.0), vec3f(1.0));
}
fn srgbOETF(c: vec3f) -> vec3f {
  return select(1.055 * pow(c, vec3f(1.0 / 2.4)) - 0.055, c * 12.92, c <= vec3f(0.0031308));
}
fn neutralTM(c0: vec3f) -> vec3f {   // Khronos PBR Neutral (three.js NeutralToneMapping)
  var c = c0; let x = min(c.r, min(c.g, c.b)); c -= select(0.04, x - 6.25 * x * x, x < 0.08);
  let peak = max(c.r, max(c.g, c.b)); if (peak < 0.76) { return c; }
  let np = 1.0 - 0.0576 / (peak - 0.52); c *= np / peak;
  return mix(c, vec3f(np), 1.0 - 1.0 / (0.15 * (peak - np) + 1.0));
}
fn toneMap(c: vec3f) -> vec3f {   // renderer.toneMapping, as WebGLRenderer (Cineon / AgX / custom fall back to ACES)
  let m = F.fogP.w; let e = F.camPos.w;
  if (m < 0.5) { return clamp(c, vec3f(0.0), vec3f(1.0)); }
  if (m < 1.5) { return clamp(c * e, vec3f(0.0), vec3f(1.0)); }
  if (m < 2.5) { let x = c * e; return clamp(x / (1.0 + x), vec3f(0.0), vec3f(1.0)); }
  if (m > 6.5) { return clamp(neutralTM(c * e), vec3f(0.0), vec3f(1.0)); }
  return acesThree(c, e);
}
fn present(lin: vec3f) -> vec4f { return vec4f(srgbOETF(toneMap(lin)), 1.0); }
// main pass writes the displayed colour and the linear colour (next frame's refraction source, glass masked out)
struct FOut { @location(0) color: vec4f, @location(1) lin: vec4f };
fn outMain(lin: vec3f) -> FOut { return FOut(present(lin), vec4f(lin, 60000.0)); }   // the linear target's alpha: view depth (background: far)
fn viewDepth(p: vec3f) -> f32 { return max(-(F.view * vec4f(p, 1.0)).z, 1e-3); }

struct VOut {
  @invariant @builtin(position) pos: vec4f,   // invariant: the depth pre-pass and the shading pass rasterise identically
  @location(0) wpos: vec3f,
  @location(1) wnrm: vec3f,
  @location(2) uv: vec2f,
  @location(3) col: vec4f,
  @location(4) uv2: vec2f,   // light-map channel
};
// per-material textures (group 3): colour map, normal or bump map
@group(3) @binding(0) var matMap: texture_2d<f32>;
@group(3) @binding(1) var matDetail: texture_2d<f32>;
@group(3) @binding(2) var matSamp: sampler;
@group(3) @binding(3) var matLight: texture_2d<f32>;   // light map (three.js lightMap, usually on uv1)
@group(3) @binding(4) var matExtra: texture_2d<f32>;   // an extra texture for material hooks (userData.mbExtraMap)
fn cofactor(m: mat3x3f) -> mat3x3f {   // inverse-transpose up to scale: normals under non-uniform instance scaling
  return mat3x3f(cross(m[1], m[2]), cross(m[2], m[0]), cross(m[0], m[1]));
}
// three.js fog is applied after tone mapping / output encoding; match it. sf-drive (renderer.fogScatter): aerial
// perspective: the fog's colour turns warm toward the sun and cool away from it, and it thins with height (exponential
// height fog: the ray's optical depth averaged over its climb), so tall towers and hills stand out of the haze
fn fogged(c: vec4f, p: vec3f) -> vec4f {
  if (F.fog.w < 0.5 || O.mflags2.y < 0.5) { return c; }
  let d = max(-(F.view * vec4f(p, 1.0)).z, 0.0);   // three.js fog depth: -mvPosition.z
  var k = 0.0;
  if (F.fog.w < 1.5) { k = smoothstep(F.fogP.x, F.fogP.y, d); return vec4f(mix(c.rgb, F.fog.rgb, k), c.a); }
  let dq = select(d * d, 2250000.0 + 1050.0 * (d - 1500.0), d > 1500.0);   // sf-drive (round 11): the exp2 haze's d^2 grows at 0.35 of its slope past 1.5 km (SF's clear air: the skyline reads from Twin Peaks, Bernal, Alamo Square, Treasure Island; the streets' first 1.5 km unchanged)
  var od = F.fogP.z * F.fogP.z * dq + F.fogH.w * min(d, 1300.0);   // sf-drive: + a linear term (renderer.fogScatter.linear: a veil from the first few hundred metres, NFS's layered distance; whole by 1.3 km, so the far skyline still reads from the hills and parks)
  // sf-drive (renderer.fogScatter.elev [y0, y1]: fogP.x / y for exp2 fog): seen from high ground (Twin Peaks, the decks of
  // the bridges) the ray runs over the street-level haze, not through it: the veil thinned to an eighth from y0 up to y1
  // and (the same flag) the bay's clear marine air: the islands, the water and the far shores north of the Wharf and east
  // of the Embarcadero through a twelfth of the street's veil (Alcatraz, Angel Island, Marin, Yerba Buena read as they do)
  if (F.fogP.y > F.fogP.x + 1.0) { let bay = ${globalThis.MB_BAY_FOG || "max(smoothstep(-1500.0, -2300.0, p.z), smoothstep(600.0, 1400.0, p.x))"};   // (MB_BAY_FOG: the page's own clear-air area, '0.0' none)
    od *= min(mix(1.0, 0.12, smoothstep(F.fogP.x, F.fogP.y, F.camPos.y)), mix(1.0, 0.16, bay)); }   // (round 17: 0.08 -> 0.16: Angel Island and the headlands under the photos' blue veil)
  var fc = F.fog.rgb;
  if (F.fogS.w > 0.0) {
    let b = F.fogA.w;
    if (b > 0.0) {
      let y0 = F.camPos.y - F.fogH.x; let dy = p.y - F.camPos.y;
      let bdy = b * dy;
      let avg = select((1.0 - exp(-bdy)) / bdy, 1.0 - 0.5 * bdy, abs(bdy) < 1e-3);
      od *= exp(-b * max(y0, 0.0)) * clamp(avg, 0.0, 8.0);
    }
    let v = normalize(p - F.camPos.xyz);
    let mu = dot(v, F.sunDir.xyz);
    let w = pow(clamp(0.5 + 0.5 * mu, 0.0, 1.0), F.fogH.z);
    fc = mix(mix(F.fog.rgb, F.fogA.rgb, smoothstep(0.0, F.fogH.y, d)), F.fogS.rgb, w);
  }
  k = 1.0 - exp(-od);
  return vec4f(mix(c.rgb, fc, k), c.a);
}
fn skinMat(j: vec4u, w: vec4f) -> mat4x4f {
  let b = u32(O.skin.y);
  return BN.m[b + j.x] * w.x + BN.m[b + j.y] * w.y + BN.m[b + j.z] * w.z + BN.m[b + j.w] * w.w;
}
struct VIn {
  @location(0) p: vec3f, @location(1) n: vec3f, @location(2) uv: vec4f, @location(3) j: vec4u, @location(4) jw: vec4f,
  @location(5) col: vec4f,                                                   // vertex colour (zeros when absent)
  @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f,   // instance matrix
  @location(10) icol: vec3f,                                                 // instance colour (ones when absent)
};
// sf-drive: wind on vegetation (material userData.mbWind -> O.dyn.w = flutter cm (integer part) + sway m at 10 m (fraction);
// F.sunC.w: the clock). The crown bends with the square of the height above the instance's foot; leaves flutter.
fn sfWind(w: vec4f, p: vec3f, org: vec3f) -> vec4f {
  let a = O.dyn.w; if (a <= 0.0) { return w; }
  let t = F.sunC.w; let sway = fract(a); let flut = floor(a) * 0.01;
  let h = max(p.y, 0.0); let ph = dot(org.xz, vec2f(0.37, 0.23));
  let g = 0.55 + 0.3 * sin(t * 0.31 + ph * 0.05) + 0.15 * sin(t * 0.83 + ph * 0.11);   // gusts
  let s = (sin(t * 1.3 + ph) * 0.55 + sin(t * 2.7 + ph * 1.7) * 0.25 + 0.4) * g;
  var d = vec3f(1.0, 0.0, 0.3) * (sway * h * h * 0.01 * s);
  // (round 21) the branch layer between the trunk's sway and the leaves' flutter: a smooth field over the model's own
  // space (~2 m clumps move together, each its own phase - the limbs and their leaves alike, so they stay joined), its
  // reach growing out from the trunk's axis and up the crown (pivot-painter-like, from the position alone: every pass
  // - depth, shadow, colour - moves a vertex the same)
  if (sway > 0.0) {
    let ph1 = 2.2 * (sin(p.x * 0.83 + p.z * 0.31 + 1.7) + sin(p.z * 0.91 - p.y * 0.47)) + ph * 0.13;
    let ph2 = 2.2 * (sin(p.z * 0.77 + p.y * 0.39 + 0.4) + sin(p.x * 0.69 - p.y * 0.53 + 2.1)) + ph * 0.11;
    let reach = smoothstep(0.6, 3.5, length(p.xz)) * smoothstep(1.2, 3.5, h);
    d += vec3f(sin(t * 1.63 + ph1), 0.4 * sin(t * 2.21 + ph2), 0.8 * cos(t * 1.37 + ph2)) * (sway * 0.65 * g * reach * (0.6 + 0.6 * s));
  }
  if (flut > 0.0) { let q = dot(w.xyz, vec3f(1.7, 2.3, 1.3));
    d += flut * g * vec3f(sin(t * 2.9 + q), 0.6 * sin(t * 3.7 + q * 1.3), cos(t * 3.3 + q * 0.7)) * min(h * 0.25, 1.0); }
  return vec4f(w.xyz + d, w.w);
}
// sf-drive: pedestrians (material userData.mbWind < 0; city/pedmesh.js): a walk cycle in the vertex stage. The figure's
// parts lie side by side in its geometry (x + 8 m per part: 0 the torso and head, 1 / 2 the left / right leg, 3 / 4 the
// arms; +z forward, the feet at y 0, 1.75 m tall) and are put back in place here, each limb turned about its joints (the
// shins / forearms blended across the knees / elbows). The instance matrix's spare row carries the gait (and is cleared
// before the matrix is used): i0.w the phase (a leap's progress), i1.w the cadence (rad/s, 0 standing), i2.w the pose
// (0 walk / stand, 1 leaping aside, 2 a phone in the hand).
struct SfWalk { p: vec3f, r: mat3x3f };
fn sfRx(a: f32) -> mat3x3f { let c = cos(a); let s = sin(a); return mat3x3f(vec3f(1.0, 0.0, 0.0), vec3f(0.0, c, s), vec3f(0.0, -s, c)); }
fn sfRz(a: f32) -> mat3x3f { let c = cos(a); let s = sin(a); return mat3x3f(vec3f(c, s, 0.0), vec3f(-s, c, 0.0), vec3f(0.0, 0.0, 1.0)); }
fn sfRy(a: f32) -> mat3x3f { let c = cos(a); let s = sin(a); return mat3x3f(vec3f(c, 0.0, -s), vec3f(0.0, 1.0, 0.0), vec3f(s, 0.0, c)); }
// sf-drive (round 20): the vehicles' wheels turn (material userData.mbWheels, city/cars.js wheelTag): a wheel's vertices
// carry its number in the low three bits of x's mantissa (1-4: front left, front right, rear left, rear right; 0 the body,
// < 1 um off), each spun about its hub's axle (x) by the instance's i0.w (rad), the front ones steered about the hub's
// vertical by i1.w (rad, + to the car's left); the spare row is cleared before the matrix is used (sfIM). The motion
// vectors take last frame's angles (vsVelI): the spinning wheels blur with the TAA and the motion blur.
fn sfWheel(p0: vec3f, spin: f32, steer: f32) -> SfWalk {
  var o: SfWalk; o.p = p0; o.r = mat3x3f(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), vec3f(0.0, 0.0, 1.0));
  let id = bitcast<u32>(p0.x) & 7u;
  if (id == 0u) { return o; }
  // (selects, no indexed arrays: a private array in the vertex stage can cost every draw its registers)
  let yz = select(select(select(select(select(select(O.whD.yz, O.whC.zw, id == 6u), O.whC.xy, id == 5u), O.whB.zw, id == 4u), O.whB.xy, id == 3u), O.whA.zw, id == 2u), O.whA.xy, id == 1u);
  var hub: vec3f; var st = 0.0;
  var sp = spin;
  if (O.whD.x < 1.5) {   // the generated cars: four hubs of their own
    // (tyres49: 5 / 6 the front calipers, city/tyres.js - on wheel 1 / 2's hub, steered with it, not spun)
    if (id > 6u) { return o; }
    let w = select(id, id - 4u, id > 4u); sp = select(spin, 0.0, id > 4u);
    let wyz = select(select(select(O.whB.zw, O.whB.xy, w == 3u), O.whA.zw, w == 2u), O.whA.xy, w == 1u);
    let hx = select(select(select(O.whC.w, O.whC.z, w == 3u), O.whC.y, w == 2u), O.whC.x, w == 1u);
    hub = vec3f(hx, wyz.x, wyz.y); st = select(0.0, steer, w < 3u);
  } else {   // the built trucks (2): up to seven axles (y, z), the first one steered, its pivots at +-whD.w
    hub = vec3f(sign(p0.x) * O.whD.w, yz.x, yz.y); st = select(0.0, steer, id == 1u);
  }
  let R = sfRy(st) * sfRx(sp);
  o.p = hub + R * (p0 - hub); o.r = R; return o;
}
fn sfIM(i0: vec4f, i1: vec4f, i2: vec4f, i3: vec4f) -> mat4x4f { let m = sfIM3(i0, i1, i2); return mat4x4f(vec4f(m[0], 0.0), vec4f(m[1], 0.0), vec4f(m[2], 0.0), i3); }
// (chars62) the voxel people's instances carry four more numbers in their matrix's zeros (a heading and a scale: i0.y, i1.x,
// i1.z, i2.y - the options, the head's turn, the pose's weight, its progress): cleared here
fn sfIM3(i0: vec4f, i1: vec4f, i2: vec4f) -> mat3x3f {
  if (O.dyn.w < -1.5) { return mat3x3f(vec3f(i0.x, 0.0, i0.z), vec3f(0.0, i1.y, 0.0), vec3f(i2.x, 0.0, i2.z)); }
  return mat3x3f(i0.xyz, i1.xyz, i2.xyz);
}
fn sfWalkJ(p0: vec3f, j: vec4u, jw: vec4f, i0: vec4f, i1: vec4f, i2: vec4f) -> SfWalk {
  if (O.dyn.w < -2.5 && O.whD.x < 0.5) { return sfHum(p0, j, jw, i0, i1, i2); }   // (chars63: the stylized people)
  if (O.dyn.w < -1.5 && O.whD.x < 0.5) { return sfVox(p0, j, jw, i0, i1, i2); }
  return sfWalk(p0, i0, i1, i2);
}
${mV}
${gV}
fn sfWalk(p0: vec3f, i0: vec4f, i1: vec4f, i2: vec4f) -> SfWalk {
  var o: SfWalk; o.p = p0; o.r = mat3x3f(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), vec3f(0.0, 0.0, 1.0));
  if (O.whD.x > 0.5) { return sfWheel(p0, i0.w, i1.w); }
  if (O.dyn.w >= 0.0) { return o; }
  let part = floor(p0.x / 8.0 + 0.5); var p = vec3f(p0.x - part * 8.0, p0.y, p0.z);
  let t = F.sunC.w; let cad = i1.w; let pose = i2.w; let ph = t * cad + i0.w;
  let walk = select(0.0, 1.0, cad > 0.01);
  let off = select(0.0, PI, part == 2.0 || part == 4.0);
  let a = sin(ph + off) * walk;
  var th = 0.40 * a; var kn = walk * (0.08 + 0.9 * pow(max(0.0, cos(ph + off + 0.3)), 2.0)) + (1.0 - walk) * 0.03;
  // (sf-drive: the arms swing from the shoulder, the forearm a beat behind and bent more on the forward swing, never locked straight)
  let al = sin(ph + off - 0.5) * walk;
  var aa = -0.36 * a + (1.0 - walk) * 0.03 * sin(t * 0.9 + i0.w * 3.0 + off); var eb = 0.22 + walk * (0.14 + 0.38 * max(0.0, -al) + 0.06 * al);
  var bob = walk * (0.018 * cos(2.0 * ph) - 0.008) + (1.0 - walk) * 0.004 * sin(t * 1.7 + i0.w);
  if (pose > 0.5 && pose < 1.5) {   // leaping aside: a running jump, the arms flung up
    let k = sin(PI * clamp(i0.w * 1.15, 0.0, 1.0)); let lf = part == 1.0 || part == 3.0;
    th = mix(0.0, select(-0.5, 0.8, lf), k); kn = mix(0.05, select(1.2, 0.5, lf), k);
    aa = mix(0.0, select(1.9, 2.5, lf), k); eb = mix(0.2, 0.5, k); bob = 0.0;
  } else if (pose > 3.5 && pose < 4.5) {   // (round 35, sf-drive) seated on a bench: thighs level, shins down, hands in the lap
    th = 1.5; kn = 1.5; aa = 0.55 + 0.05 * sin(t * 0.7 + i0.w * 5.0); eb = 0.95; bob = -0.43;
  } else if (pose > 4.5) {   // (round 35, sf-drive) a performer on a stage: the arms flung up and out in turn, a step from foot to foot
    let g1 = sin(t * 1.7 + i0.w); let g2 = sin(t * 1.1 + i0.w * 2.0 + 1.3);
    aa = select(0.9 + 0.75 * g1, 1.2 + 0.7 * g2, part == 3.0); eb = 0.35 + 0.3 * max(0.0, -g1); th = 0.08 * sin(t * 0.8 + off); bob = 0.0;
  } else if (pose > 2.5 && part > 2.5) { aa = 1.2; eb = 0.75; bob = 0.0;   // (round 32) taking a photo: both hands up in front of the face
  } else if (pose > 1.5 && part == 4.0) { aa = 0.35; eb = 1.75; }   // a phone in the right hand
  var R = o.r;
  if (part > 0.5 && part < 2.5) {
    let ws = 1.0 - smoothstep(0.43, 0.57, p.y);
    let Rk = sfRx(kn); let pk = vec3f(0.0, 0.5, 0.0);
    let p1 = mix(p, pk + Rk * (p - pk), ws);
    let Rh = sfRx(-th); let pj = vec3f(0.0, 0.93, 0.0);
    p = pj + Rh * (p1 - pj); R = Rh; if (ws > 0.5) { R = Rh * Rk; }
  } else if (part > 2.5) {
    let we = 1.0 - smoothstep(1.07, 1.19, p.y);
    let Re = sfRx(-eb); let pe = vec3f(0.0, 1.13, 0.0);
    let p1 = mix(p, pe + Re * (p - pe), we);
    let Rs = sfRz(select(-0.07, 0.07, part == 3.0)) * sfRx(-aa); let ps = vec3f(select(-0.17, 0.17, part == 3.0), 1.43, 0.0);   // (a little out from the body: clear of a coat)
    p = ps + Rs * (p1 - ps); R = Rs; if (we > 0.5) { R = Rs * Re; }
  }
  // sf-drive: a person's walk, not a mannequin's: the shoulders turn against the hips (the arms with them), the pelvis
  // the other way, the head kept to the front; the body sways over the stance foot and leans a touch into the stride
  if (walk > 0.5 && pose < 0.5) {
    let tw = 0.11 * sin(ph);   // (the left leg forward: the right shoulder forward)
    var ang = 0.0;
    if (part < 0.5) { ang = tw * smoothstep(0.95, 1.35, p.y) * (1.0 - smoothstep(1.5, 1.6, p.y)) - 0.045 * sin(ph) * (1.0 - smoothstep(0.85, 1.05, p.y)); }
    else if (part > 2.5) { ang = tw; } else { ang = -0.045 * sin(ph); }
    let Ry = sfRy(ang); p = Ry * p; R = Ry * R;
    let sway = 0.018 * cos(ph); let lean = 0.035;
    p = vec3f(p.x + sway * smoothstep(0.0, 0.9, p.y), p.y, p.z + lean * max(p.y - 0.9, 0.0));
  }
  o.p = p + vec3f(0.0, bob, 0.0); o.r = R; return o;
}
@vertex fn vs(v: VIn) -> VOut {
  var o: VOut;
  let sw = sfWalkJ(v.p, v.j, v.jw, v.i0, v.i1, v.i2); let IM = sfIM(v.i0, v.i1, v.i2, v.i3);
  var w = sfWind(O.model * (IM * vec4f(sw.p, 1.0)), sw.p, v.i3.xyz);
  var wn = (O.normalMat * vec4f(cofactor(sfIM3(v.i0, v.i1, v.i2)) * (sw.r * v.n), 0.0)).xyz;
  if (O.skin.x > 0.5) { let M = skinMat(v.j, v.jw); w = M * vec4f(v.p, 1.0); wn = (M * vec4f(v.n, 0.0)).xyz; }
  // sf-drive (lowtier63): without TAA (F.sunB.w 0) the overhead wires (object.userData.mbThin: the street's walk mesh; its
  // near-black, alpha-0 vertex colours) at least ~a pixel thick - their 2-5 cm drew as a broken dotted line
  o.pos = stableClip(F.viewProj * w);
${NV}  o.wpos = w.xyz;
  o.wnrm = wn;
  o.uv = v.uv.xy; o.uv2 = v.uv.zw;
  o.col = select(vec4f(1.0), v.col, O.mflags2.x > 0.5) * vec4f(select(vec3f(1.0), v.icol, O.mflags2.w > 0.5), 1.0); if (O.sfx.x > 0.5) { o.col.a = v.col.a; }
${HV}  return o;
}
`,
  PV =
    sh.split("struct Bones")[0] +
    `@group(0) @binding(0) var<uniform> F: Frame;
` +
    sh.slice(sh.indexOf("const PI"), sh.indexOf("struct VOut")),
  DV = `
struct VInD { @location(0) p: vec3f, @location(3) j: vec4u, @location(4) jw: vec4f,
  @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f };
struct VOutD { @invariant @builtin(position) pos: vec4f };
@vertex fn vsDepth(v: VInD) -> VOutD {
  let sw = sfWalkJ(v.p, v.j, v.jw, v.i0, v.i1, v.i2); let IM = sfIM(v.i0, v.i1, v.i2, v.i3);
  var w = sfWind(O.model * (IM * vec4f(sw.p, 1.0)), sw.p, v.i3.xyz);
  if (O.skin.x > 0.5) { let M = skinMat(v.j, v.jw); w = M * vec4f(v.p, 1.0); }
  var o: VOutD; o.pos = stableClip(F.viewProj * w); return o;
}
`,
  CV =
    sh +
    `
@vertex fn vsShadow(@location(0) p: vec3f, @location(3) j: vec4u, @location(4) jw: vec4f,
    @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f) -> @builtin(position) vec4f {
  let sw = sfWalkJ(p, j, jw, i0, i1, i2);
  var w = sfWind(O.model * (sfIM(i0, i1, i2, i3) * vec4f(sw.p, 1.0)), sw.p, i3.xyz);
  if (O.skin.x > 0.5) { w = skinMat(j, jw) * vec4f(p, 1.0); }
  return F.lightVP * w;
}
// motion vectors for TAA: moving objects (transformed / skinned since last frame) write their screen-space motion over the
// main pass's depth; everything else is reprojected through the depth buffer
@group(0) @binding(2) var<uniform> BNP: Bones;   // last frame's bone matrices (same offsets)
struct VV { @invariant @builtin(position) pos: vec4f, @location(0) cur: vec4f, @location(1) prv: vec4f };
@vertex fn vsVel(@location(0) p: vec3f, @location(3) j: vec4u, @location(4) jw: vec4f,
    @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f) -> VV {
  let sw = sfWalkJ(p, j, jw, i0, i1, i2); let IM = sfIM(i0, i1, i2, i3);
  var w = sfWind(O.model * (IM * vec4f(sw.p, 1.0)), sw.p, i3.xyz);
  var wp = sfWind(O.prevModel * (IM * vec4f(sw.p, 1.0)), sw.p, i3.xyz);
  if (O.skin.x > 0.5) {
    w = skinMat(j, jw) * vec4f(p, 1.0);
    let b = u32(O.skin.y); wp = (BNP.m[b + j.x] * jw.x + BNP.m[b + j.y] * jw.y + BNP.m[b + j.z] * jw.z + BNP.m[b + j.w] * jw.w) * vec4f(p, 1.0);
  }
  var o: VV; o.pos = stableClip(F.viewProj * w); o.cur = F.vpu * w; o.prv = F.pvpu * wp; return o;
}
// sf-drive: instanced meshes whose instances move (traffic): last frame's instance matrices in a second stream
// (object.userData.mbPrevInstance), each instance's own motion; before, they had none: TAA reprojected them with the
// camera's (a moving car ghosted grey) and the camera's motion blur smeared those beside the player at the frame's edge
@vertex fn vsVelI(@location(0) p: vec3f, @location(3) j: vec4u, @location(4) jw: vec4f,
    @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f,
    @location(11) q0: vec4f, @location(12) q1: vec4f, @location(13) q2: vec4f, @location(14) q3: vec4f) -> VV {
  let sw = sfWalkJ(p, j, jw, i0, i1, i2); var swp = sw; if (O.whD.x > 0.5) { swp = sfWalk(p, q0, q1, q2); }
  let w = sfWind(O.model * (sfIM(i0, i1, i2, i3) * vec4f(sw.p, 1.0)), sw.p, i3.xyz);
  let wp = sfWind(O.prevModel * (sfIM(q0, q1, q2, q3) * vec4f(swp.p, 1.0)), swp.p, q3.xyz);
  var o: VV; o.pos = stableClip(F.viewProj * w); o.cur = F.vpu * w; o.prv = F.pvpu * wp; return o;
}
@fragment fn fsVel(i: VV) -> @location(0) vec4f {
  let a = i.cur.xy / i.cur.w; let b = i.prv.xy / i.prv.w;
  return vec4f((a - b) * vec2f(0.5, -0.5), 1.0, 0.0);   // uv-space motion (this frame - last), flag (a: reactive, below)
}
// alpha-tested casters (alphaTest with a colour / alpha map: leaves, fences, cut-out spheres): discard where see-through
struct SA { @builtin(position) pos: vec4f, @location(0) uv: vec2f, @location(1) cb: f32 };
@vertex fn vsShadowA(@location(0) p: vec3f, @location(2) uv: vec4f, @location(3) j: vec4u, @location(4) jw: vec4f, @location(5) vc: vec4f,
    @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f, @location(10) ic: vec3f) -> SA {
  let sw = sfWalkJ(p, j, jw, i0, i1, i2);
  var w = sfWind(O.model * (sfIM(i0, i1, i2, i3) * vec4f(sw.p, 1.0)), sw.p, i3.xyz);
  if (O.skin.x > 0.5) { w = skinMat(j, jw) * vec4f(p, 1.0); }
  var o: SA; o.pos = F.lightVP * w; o.uv = uv.xy;
  o.cb = select(1.0, vc.b, O.mflags2.x > 0.5) * select(1.0, ic.b, O.mflags2.w > 0.5);   // (sf-drive veg50: the colour's blue - a 4 x 4 atlas' cell step)
  return o;
}
@fragment fn fsShadowA(i: SA) {
  var muv = vec2f(dot(O.uvT0.xyz, vec3f(i.uv, 1.0)), dot(O.uvT1.xyz, vec3f(i.uv, 1.0)));
  // sf-drive (veg50): a 4 x 4 atlas whose cell the instance picks (userData.mbAtlas4: the shrubs, city/veg.js SHRUB_WGSL) -
  // the geometry's own cell + the colour's blue x 16, as its hook: the shadow was the base cell's plant, not the shrub's
  if (O.uvT0.w > 0.5) { let b0 = floor(muv * 4.0); let cell = b0.x + 4.0 * b0.y + floor(i.cb * 16.0); muv = (muv * 4.0 - b0 + vec2f(cell % 4.0, floor(cell / 4.0))) * 0.25; }
  var a = O.baseColor.a;
  let t = textureSample(matMap, matSamp, muv); let am = textureSample(matExtra, matSamp, muv);
  if (O.mflags.x > 0.5) { a *= t.a; }
  if (O.mflags6.x > 0.5) { a *= am.g; }
  if (a < O.mflags.z) { discard; }
}
// translucent shadow maps: thin glass writes its transmittance towards the light, multiplied over every layer
// (Cycles: the transparent tint x (1 - Fresnel) per surface; grazing light through a side window is mostly reflected)
struct GT { @builtin(position) pos: vec4f, @location(0) w: vec3f, @location(1) n: vec3f };
@vertex fn vsGlassT(@location(0) p: vec3f, @location(1) nrm: vec3f,
    @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f) -> GT {
  let w = O.model * (mat4x4f(i0, i1, i2, i3) * vec4f(p, 1.0));
  var o: GT; o.pos = F.lightVP * w; o.w = w.xyz; o.n = (O.normalMat * vec4f(nrm, 0.0)).xyz; return o;
}
fn fresnelExact(ci: f32, eta: f32) -> f32 {   // unpolarised dielectric Fresnel, eta = n_t / n_i (1 on total internal reflection)
  let st2 = (1.0 - ci * ci) / (eta * eta); if (st2 >= 1.0) { return 1.0; }
  let ct = sqrt(1.0 - st2); let rs = (ci - eta * ct) / (ci + eta * ct); let rp = (eta * ci - ct) / (eta * ci + ct);
  return 0.5 * (rs * rs + rp * rp);
}
fn glassTrans(n: vec3f, l: vec3f) -> vec4f {
  let c = abs(dot(normalize(n), l));
  // F.glassT.w: the bake's glass has no back-face fix, so light leaving the pane from inside meets Blender's Fresnel node
  // at 1 / 1.5 and is totally reflected past ~42 deg (the P3 scene); otherwise one ordinary air-glass interface
  let f = select(fresnelExact(c, 1.5), fresnelExact(c, 1.0 / 1.5), F.glassT.w > 0.5);
  return vec4f(O.baseColor.rgb * (1.0 - f), 1.0);
}
@fragment fn fsGlassTSun(i: GT) -> @location(0) vec4f { return vec4f(glassTrans(i.n, normalize(F.sunDir.xyz)).rgb, i.pos.z); }
@fragment fn fsGlassTSpot(i: GT) -> @location(0) vec4f { return vec4f(glassTrans(i.n, normalize(F.camPos.xyz - i.w)).rgb, i.pos.z); }
`,
  UV = `
struct Light {
  pos: vec4f,           // xyz, cutoff distance (0 = unbounded: evaluated for every pixel)
  color: vec4f,         // rgb * intensity (W/sr, three.js physically-correct units), a street lamp's batwing (sf-drive)
  dir: vec4f,           // spot axis / directional light's travel (away from the light), cos(outer) (-2 point, -3 floor bounce, -4 directional)
  extra: vec4f,         // cos(inner), spot shadow tile (-1 none), floor-bounce radius^2 (a street lamp's shield angle, sf-drive), decay exponent
  extra2: vec4f,        // spot map layer (-1 none), point shadow index (-1 none), shadow depth bias, shadow normal bias (m)
};
struct Lights { info: vec4f, shadowVP: array<mat4x4f, ${QS}>, mapVP: array<mat4x4f, ${H5}>,
  pointVP: array<mat4x4f, ${6 * _b}>, l: array<Light, ${ZS}> };   // info: #unbounded, #all
const CL_X = ${eh.x}u; const CL_Y = ${eh.y}u; const CL_Z = ${eh.z}u; const CL_MAX = ${eh.max}u;
`,
  cp = !1,
  Mb = !1,
  Sb = !1;
