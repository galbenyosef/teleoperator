// app 41 — max
// Lines 50458-51033 of readable/app.pretty.js (statement-aligned).
var PU =
    Ec +
    fct +
    `
struct BOut { @builtin(position) pos: vec4f, @location(0) ndc: vec2f };
@vertex fn vsBg(@builtin(vertex_index) vi: u32) -> BOut {
  let xy = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0;
  var o: BOut; o.pos = vec4f(xy, 1.0, 1.0); o.ndc = xy; return o;
}
fn bgAt(i: BOut) -> vec3f {
  let w = F.invViewProj * vec4f(i.ndc, 1.0, 1.0);
  var d = normalize(w.xyz / w.w - F.camPos.xyz);
  if (F.probeBoxMin.w > 0.5) {   // studio: the room is the probe itself, box-projected from the camera (exact for every wall)
    let rs = select(d, select(vec3f(1e-6), vec3f(-1e-6), d < vec3f(0.0)), abs(d) < vec3f(1e-6));
    let tf = max((F.probeBoxMin.xyz - F.camPos.xyz) / rs, (F.probeBoxMax.xyz - F.camPos.xyz) / rs);
    d = normalize(F.camPos.xyz + max(min(tf.x, min(tf.y, tf.z)), 0.0) * d - F.probeC.xyz);
  }
  var c = textureSampleLevel(bgTex, envSamp, equirectUV(d), 0.0).rgb;
  if (F.probeC.w > 0.0) { c = (exp2(c * F.probeC.w) - 1.0) / F.probeBoxMax.w; }   // log-encoded 8-bit background
  return c * F.misc.y;
}
@fragment fn fsBg(i: BOut) -> FOut { return outMain(bgAt(i)); }
@fragment fn fsBgLin(i: BOut) -> @location(0) vec4f { return vec4f(bgAt(i), 1.0); }
`,
  bct = `
struct SkyU { sun: vec4f, a: vec4f, c: vec4f, d: vec4f };   // sun xyz, _; rayleigh, turbidity, mieCoef, mieG; cloud scale, speed, coverage, density; elevation, showSun, time, _
@group(1) @binding(0) var<uniform> SU: SkyU;
struct SV { @builtin(position) pos: vec4f };
@vertex fn vsSky(@builtin(vertex_index) vi: u32) -> SV {
  var o: SV; o.pos = vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 1.0, 1.0); return o;
}
const SE = 2.718281828459045; const SPI = 3.141592653589793;
const totalRayleigh = vec3f(5.804542996261093e-6, 1.3562911419845635e-5, 3.0265902468824876e-5);
const MieConst = vec3f(1.8399918514433978e14, 2.7798023919660528e14, 4.0790479543861094e14);
fn sunIntensity(zc: f32) -> f32 { let z = clamp(zc, -1.0, 1.0); return 1000.0 * max(0.0, 1.0 - pow(SE, -((1.6110731556870734 - acos(z)) / 1.5))); }
fn gradient(i: vec2f) -> vec2f { var p = fract(i.xyx * vec3f(0.1031, 0.1030, 0.0973)); p += dot(p, p.yzx + 33.33); return fract((p.xx + p.yz) * p.zy) * 2.0 - 1.0; }
fn noise2(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p); let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  let a = dot(gradient(i), f); let b = dot(gradient(i + vec2f(1.0, 0.0)), f - vec2f(1.0, 0.0));
  let c = dot(gradient(i + vec2f(0.0, 1.0)), f - vec2f(0.0, 1.0)); let d = dot(gradient(i + vec2f(1.0, 1.0)), f - vec2f(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 1.6;
}
fn fbm(p0: vec2f, drift: f32) -> f32 { var r = 0.0; var amp = 1.0; var p = p0; for (var i = 0; i < 4; i++) { r += amp * noise2(p); amp *= 0.5; p = p * 2.0 + drift; } return r; }
@fragment fn fsSky(i: SV) -> FOut {
  let ndc = vec2f(i.pos.x * F.screen.x * 2.0 - 1.0, 1.0 - i.pos.y * F.screen.y * 2.0);
  let w = F.invViewProj * vec4f(ndc, 1.0, 1.0);
  let direction = normalize(w.xyz / w.w - F.camPos.xyz);
  // vertex stage terms (constant over the dome)
  let sunDir = normalize(SU.sun.xyz); let sunE = sunIntensity(sunDir.y);
  let sunfade = 1.0 - clamp(1.0 - exp(SU.sun.y / 450000.0), 0.0, 1.0);
  let betaR = totalRayleigh * (SU.a.x - (1.0 - sunfade));
  let betaM = 0.434 * (0.2 * SU.a.y * 1e-17) * MieConst * SU.a.z;
  // fragment stage
  let zenithAngle = acos(max(0.0, direction.y));
  let inv = 1.0 / (cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / SPI), -1.253));
  let Fex = exp(-(betaR * (8.4e3 * inv) + betaM * (1.25e3 * inv)));
  let cosTheta = dot(direction, sunDir);
  let rPhase = 0.05968310365946075 * (1.0 + pow(cosTheta * 0.5 + 0.5, 2.0));
  let g = SU.a.w; let g2 = g * g;
  let mPhase = 0.07957747154594767 * ((1.0 - g2) / pow(1.0 - 2.0 * g * cosTheta + g2, 1.5));
  let bt = (betaR * rPhase + betaM * mPhase) / (betaR + betaM);
  var Lin = pow(max(sunE * bt * (1.0 - Fex), vec3f(0.0)), vec3f(1.5));
  Lin *= mix(vec3f(1.0), pow(max(sunE * bt * Fex, vec3f(0.0)), vec3f(0.5)), clamp(pow(1.0 - sunDir.y, 5.0), 0.0, 1.0));
  let L0 = vec3f(0.1) * Fex;
  let sundisc = clamp((cosTheta - 0.9999566769464484) * 50000.0, 0.0, 1.0) * SU.d.y;
  let sundiscColor = (760.0 * sundisc) * min(sunE * Fex, vec3f(80.0));
  var texColor = (Lin + L0) * 0.04 + sundiscColor + vec3f(0.0, 0.0003, 0.00075);
  let cov0 = SU.c.z;
  if (direction.y > 0.0 && cov0 > 0.0) {
    let elevation = mix(1.0, 0.1, SU.d.x);
    let cloudUV = direction.xz / (direction.y * elevation) * SU.c.x + SU.d.z * SU.c.y;
    let evolve = SU.d.z * SU.c.y * 300.0;
    let cloudNoise = clamp(fbm(cloudUV * 1000.0, evolve) * 0.7 + 0.5, 0.0, 1.0);
    let region = noise2(cloudUV * 300.0) * 0.37 + 0.5;
    let cov = clamp(cov0 + (region - 0.5) * 0.6, 0.0, 1.0);
    let threshold = 1.0 - cov;
    var cloudMask = smoothstep(threshold, threshold + 0.3, cloudNoise);
    let horizonFade = smoothstep(0.0, 0.03 + 0.06 * SU.d.x, direction.y);
    cloudMask *= horizonFade;
    let dayFactor = smoothstep(-0.08, 0.3, sunDir.y);
    let sunColor = sunE * Fex * 0.22 * 0.04;
    let skyAmbient = Lin * 0.04 + vec3f(0.0, 0.0003, 0.00075);
    let depth = max(0.0, cloudNoise - threshold);
    let beer = exp(depth * -4.0); let powder = 1.0 - beer * beer;
    let shade = mix(0.45, 1.0, clamp(beer * powder * 2.6, 0.0, 1.0));
    let silver = clamp(0.51 / pow(1.49 - cosTheta * 1.4, 1.5), 0.0, 3.0);
    let edge = cloudMask * (1.0 - cloudMask) * 4.0;
    var cloudColor = skyAmbient + sunColor * shade;
    cloudColor += sunColor * silver * edge * 0.6;
    cloudColor *= max(dayFactor, 0.03);
    let alpha = (1.0 - exp(depth * SU.c.w * -12.0)) * horizonFade;
    texColor -= L0 * 0.04 * alpha;
    let cloudAerial = mix(texColor, cloudColor, Fex);
    texColor = mix(texColor, cloudAerial, alpha);
  }
  return outMain(texColor);
}
`,
  QA = `
@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var smp: sampler;
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  return vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 0.0, 1.0);
}
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let dst = floor(vec2f(textureDimensions(src)) * 0.5);
  return textureSampleLevel(src, smp, pos.xy / dst, 0.0);
}
`,
  xct = `
@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var smp: sampler;
@group(0) @binding(2) var dst: texture_storage_2d<rgba16float, write>;
@group(0) @binding(3) var fine: texture_2d<f32>;   // up: this level's own down-sampled image
@group(0) @binding(4) var<uniform> PP: vec4f;       // glare spread (tent width in texels of the coarser level)
@compute @workgroup_size(8, 8) fn down(@builtin(global_invocation_id) g: vec3u) {
  let dd = textureDimensions(dst); if (g.x >= dd.x || g.y >= dd.y) { return; }
  textureStore(dst, g.xy, textureSampleLevel(src, smp, (vec2f(g.xy) + 0.5) / vec2f(dd), 0.0));   // bilinear at half size = 2x2 box
}
// glare's first level with a soft threshold (PP.y, knee PP.z): the default glare takes only what is brighter than white
@compute @workgroup_size(8, 8) fn downT(@builtin(global_invocation_id) g: vec3u) {
  let dd = textureDimensions(dst); if (g.x >= dd.x || g.y >= dd.y) { return; }
  let c = textureSampleLevel(src, smp, (vec2f(g.xy) + 0.5) / vec2f(dd), 0.0).rgb;
  let br = max(c.r, max(c.g, c.b)); let kn = max(PP.z, 1e-4);
  let sq = clamp(br - PP.y + kn, 0.0, 2.0 * kn); let wgt = max(sq * sq / (4.0 * kn), br - PP.y) / max(br, 1e-4);
  textureStore(dst, g.xy, vec4f(c * select(1.0, max(wgt, 0.0), PP.y > 0.0), 1.0));
}
// glare down-sample: the 13-tap filter of Jimenez 2014 (Call of Duty: Advanced Warfare), a wide soft kernel per level
@compute @workgroup_size(8, 8) fn down13(@builtin(global_invocation_id) g: vec3u) {
  let dd = textureDimensions(dst); if (g.x >= dd.x || g.y >= dd.y) { return; }
  let t = 1.0 / vec2f(textureDimensions(src)); let uv = (vec2f(g.xy) + 0.5) / vec2f(dd);
  let a = textureSampleLevel(src, smp, uv + t * vec2f(-2.0, -2.0), 0.0); let b = textureSampleLevel(src, smp, uv + t * vec2f(0.0, -2.0), 0.0);
  let c = textureSampleLevel(src, smp, uv + t * vec2f(2.0, -2.0), 0.0); let d = textureSampleLevel(src, smp, uv + t * vec2f(-2.0, 0.0), 0.0);
  let e = textureSampleLevel(src, smp, uv, 0.0); let f = textureSampleLevel(src, smp, uv + t * vec2f(2.0, 0.0), 0.0);
  let gg = textureSampleLevel(src, smp, uv + t * vec2f(-2.0, 2.0), 0.0); let h = textureSampleLevel(src, smp, uv + t * vec2f(0.0, 2.0), 0.0);
  let i = textureSampleLevel(src, smp, uv + t * vec2f(2.0, 2.0), 0.0);
  let j = textureSampleLevel(src, smp, uv + t * vec2f(-1.0, -1.0), 0.0); let k = textureSampleLevel(src, smp, uv + t * vec2f(1.0, -1.0), 0.0);
  let l = textureSampleLevel(src, smp, uv + t * vec2f(-1.0, 1.0), 0.0); let m = textureSampleLevel(src, smp, uv + t * vec2f(1.0, 1.0), 0.0);
  let o = e * 0.125 + (a + c + gg + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  textureStore(dst, g.xy, vec4f(max(o.rgb, vec3f(0.0)), 1.0));
}
@compute @workgroup_size(8, 8) fn up(@builtin(global_invocation_id) g: vec3u) {   // the coarser level, tent-filtered, added onto this one
  let dd = textureDimensions(dst); if (g.x >= dd.x || g.y >= dd.y) { return; }
  let sp = PP.x; let t = sp / vec2f(textureDimensions(src)); let uv = (vec2f(g.xy) + 0.5) / vec2f(dd);   // tent width: renderer.glareSpread
  if (sp > 2.5) {   // wide (UnrealBloomPass radius): a 16-tap disc, smooth where a 9-tap tent would ring
    var w = textureSampleLevel(src, smp, uv, 0.0).rgb; var ws = 1.0;
    for (var k = 0; k < 15; k++) { let a = f32(k) * 2.39996; let r = sqrt((f32(k) + 0.5) / 15.0); let wk = 1.0 - 0.6 * r;
      w += textureSampleLevel(src, smp, uv + vec2f(cos(a), sin(a)) * r * t, 0.0).rgb * wk; ws += wk; }
    textureStore(dst, g.xy, vec4f(w / ws + textureLoad(fine, g.xy, 0).rgb, 1.0)); return;
  }
  var c = textureSampleLevel(src, smp, uv, 0.0).rgb * 4.0;
  c += (textureSampleLevel(src, smp, uv + vec2f(t.x, 0.0), 0.0).rgb + textureSampleLevel(src, smp, uv - vec2f(t.x, 0.0), 0.0).rgb
      + textureSampleLevel(src, smp, uv + vec2f(0.0, t.y), 0.0).rgb + textureSampleLevel(src, smp, uv - vec2f(0.0, t.y), 0.0).rgb) * 2.0;
  c += textureSampleLevel(src, smp, uv + t, 0.0).rgb + textureSampleLevel(src, smp, uv - t, 0.0).rgb
     + textureSampleLevel(src, smp, uv + vec2f(t.x, -t.y), 0.0).rgb + textureSampleLevel(src, smp, uv + vec2f(-t.x, t.y), 0.0).rgb;
  textureStore(dst, g.xy, vec4f(c / 16.0 + textureLoad(fine, g.xy, 0).rgb, 1.0));
}
`,
  vct = `
const PI = 3.141592653589793;
struct DynP { vp: array<mat4x4f, 6>, c: vec4f, lv: vec4f };   // face view-projections, probe centre, (exponent, samples, lod, _)
@group(0) @binding(0) var faces: texture_2d_array<f32>;
@group(0) @binding(1) var smp: sampler;
@group(0) @binding(2) var<uniform> DP: DynP;
@group(0) @binding(3) var dst: texture_storage_2d<rgba16float, write>;
fn faceSample(d: vec3f, lod: f32) -> vec3f {
  let a = abs(d); var f = 0;
  if (a.x >= a.y && a.x >= a.z) { f = select(1, 0, d.x > 0.0); } else if (a.y >= a.z) { f = select(3, 2, d.y > 0.0); } else { f = select(5, 4, d.z > 0.0); }
  let q = DP.vp[f] * vec4f(DP.c.xyz + d, 1.0);
  let uv = vec2f(q.x / q.w * 0.5 + 0.5, 0.5 - q.y / q.w * 0.5);
  return textureSampleLevel(faces, smp, clamp(uv, vec2f(0.001), vec2f(0.999)), f, lod).rgb;
}
@compute @workgroup_size(8, 8) fn prefilter(@builtin(global_invocation_id) g: vec3u) {
  let sz = textureDimensions(dst); if (g.x >= sz.x || g.y >= sz.y) { return; }
  let phi = ((f32(g.x) + 0.5) / f32(sz.x) - 0.5) * 2.0 * PI; let th = (f32(g.y) + 0.5) / f32(sz.y) * PI;
  let d = vec3f(cos(phi) * sin(th), cos(th), sin(phi) * sin(th));   // inverse of equirectUV
  let n = DP.lv.x; let M = u32(DP.lv.y);
  if (n <= 0.0) { textureStore(dst, g.xy, vec4f(faceSample(d, 0.0), 1.0)); return; }
  let up = select(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), abs(d.y) > 0.99); let tx = normalize(cross(up, d)); let ty = cross(d, tx);
  var acc = vec3f(0.0);
  for (var i = 0u; i < M; i++) {   // (d.s)^n lobe: cos = u^(1/(n+1)), golden-angle azimuths
    let ct = pow((f32(i) + 0.5) / f32(M), 1.0 / (n + 1.0)); let st = sqrt(max(0.0, 1.0 - ct * ct)); let ph = 2.0 * PI * fract(f32(i) * 0.618034);
    acc += faceSample(tx * (st * cos(ph)) + ty * (st * sin(ph)) + d * ct, DP.lv.z);
  }
  textureStore(dst, g.xy, vec4f(acc / f32(M), 1.0));
}
`,
  yct = `
const PI = 3.141592653589793;
struct EP { p: vec4f };   // exponent, samples, lod, flags (1 = source is sRGB-encoded 8 bit)
@group(0) @binding(0) var eqSrc: texture_2d<f32>;
@group(0) @binding(1) var cubeSrc: texture_2d_array<f32>;
@group(0) @binding(2) var smp: sampler;
@group(0) @binding(3) var<uniform> P: EP;
@group(0) @binding(4) var dst: texture_storage_2d<rgba16float, write>;
fn dec(c: vec3f) -> vec3f { return select(c, select(pow((c + 0.055) / 1.055, vec3f(2.4)), c / 12.92, c <= vec3f(0.04045)), P.p.w > 0.5); }
fn eqAt(d: vec3f, lod: f32) -> vec3f {
  return dec(textureSampleLevel(eqSrc, smp, vec2f(atan2(d.z, d.x) * (0.5 / PI) + 0.5, acos(clamp(d.y, -1.0, 1.0)) / PI), lod).rgb);
}
fn cubeAt(d0: vec3f, lod: f32) -> vec3f {   // GL cube convention, x mirrored as three.js does for CubeTexture environments
  let d = vec3f(-d0.x, d0.y, d0.z); let a = abs(d); var f = 0; var sc = 0.0; var tc = 0.0; var ma = 1.0;
  if (a.x >= a.y && a.x >= a.z) { ma = a.x; if (d.x > 0.0) { f = 0; sc = -d.z; } else { f = 1; sc = d.z; } tc = -d.y; }
  else if (a.y >= a.z) { ma = a.y; if (d.y > 0.0) { f = 2; tc = d.z; } else { f = 3; tc = -d.z; } sc = d.x; }
  else { ma = a.z; if (d.z > 0.0) { f = 4; sc = d.x; } else { f = 5; sc = -d.x; } tc = -d.y; }
  return dec(textureSampleLevel(cubeSrc, smp, vec2f(sc / ma, tc / ma) * 0.5 + 0.5, f, lod).rgb);
}
fn lobe(d: vec3f, cube: bool) -> vec3f {
  let n = P.p.x; let M = u32(P.p.y);
  if (n <= 0.0) { return select(eqAt(d, 0.0), cubeAt(d, 0.0), cube); }
  let up = select(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), abs(d.y) > 0.99); let tx = normalize(cross(up, d)); let ty = cross(d, tx);
  var acc = vec3f(0.0);
  for (var i = 0u; i < M; i++) {
    let ct = pow((f32(i) + 0.5) / f32(M), 1.0 / (n + 1.0)); let st = sqrt(max(0.0, 1.0 - ct * ct)); let ph = 2.0 * PI * fract(f32(i) * 0.618034);
    let s = tx * (st * cos(ph)) + ty * (st * sin(ph)) + d * ct;
    acc += select(eqAt(s, P.p.z), cubeAt(s, P.p.z), cube);
  }
  return acc / f32(M);
}
fn dirOf(g: vec2u, sz: vec2u) -> vec3f {
  let phi = ((f32(g.x) + 0.5) / f32(sz.x) - 0.5) * 2.0 * PI; let th = (f32(g.y) + 0.5) / f32(sz.y) * PI;
  return vec3f(cos(phi) * sin(th), cos(th), sin(phi) * sin(th));
}
@compute @workgroup_size(8, 8) fn fromEq(@builtin(global_invocation_id) g: vec3u) {
  let sz = textureDimensions(dst); if (g.x >= sz.x || g.y >= sz.y) { return; }
  textureStore(dst, g.xy, vec4f(lobe(dirOf(g.xy, sz), false), 1.0));
}
@compute @workgroup_size(8, 8) fn fromCube(@builtin(global_invocation_id) g: vec3u) {
  let sz = textureDimensions(dst); if (g.x >= sz.x || g.y >= sz.y) { return; }
  textureStore(dst, g.xy, vec4f(lobe(dirOf(g.xy, sz), true), 1.0));
}
`,
  UU = `
@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var smp: sampler;
@group(0) @binding(2) var<uniform> BP: vec4f;   // glare strength, vignette amount, exposure, aspect
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  return vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 0.0, 1.0);
}
fn acesThree(c0: vec3f, exposure: f32) -> vec3f {
  var c = c0 * (exposure / 0.6);
  c = mat3x3f(vec3f(0.59719, 0.07600, 0.02840), vec3f(0.35458, 0.90834, 0.13383), vec3f(0.04823, 0.01566, 0.83777)) * c;
  let a = c * (c + 0.0245786) - 0.000090537;
  let b = c * (0.983729 * c + 0.4329510) + 0.238081;
  c = mat3x3f(vec3f(1.60475, -0.10208, -0.00327), vec3f(-0.53108, 1.10813, -0.07276), vec3f(-0.07367, -0.00605, 1.07602)) * (a / b);
  return clamp(c, vec3f(0.0), vec3f(1.0));
}
fn srgbOETF(c: vec3f) -> vec3f { return select(1.055 * pow(c, vec3f(1.0 / 2.4)) - 0.055, c * 12.92, c <= vec3f(0.0031308)); }
@fragment fn fsUp(@builtin(position) pos: vec4f) -> @location(0) vec4f {   // the coarser level, tent-filtered, added onto this one
  let d = vec2f(textureDimensions(src)); let uv = pos.xy / (d * 2.0); let t = 1.0 / d;
  var c = textureSampleLevel(src, smp, uv, 0.0).rgb * 4.0;
  c += (textureSampleLevel(src, smp, uv + vec2f(t.x, 0.0), 0.0).rgb + textureSampleLevel(src, smp, uv - vec2f(t.x, 0.0), 0.0).rgb
      + textureSampleLevel(src, smp, uv + vec2f(0.0, t.y), 0.0).rgb + textureSampleLevel(src, smp, uv - vec2f(0.0, t.y), 0.0).rgb) * 2.0;
  c += textureSampleLevel(src, smp, uv + t, 0.0).rgb + textureSampleLevel(src, smp, uv - t, 0.0).rgb
     + textureSampleLevel(src, smp, uv + vec2f(t.x, -t.y), 0.0).rgb + textureSampleLevel(src, smp, uv + vec2f(-t.x, t.y), 0.0).rgb;
  return vec4f(c / 16.0, 1.0);
}
@fragment fn fsComp(@builtin(position) pos: vec4f) -> @location(0) vec4f {   // rgb = glow (display), a = vignette (blend: rgb + dst * a)
  let d = vec2f(textureDimensions(src)); let uv = pos.xy / (d * 2.0);
  let g = textureSampleLevel(src, smp, uv, 0.0).rgb * BP.x;
  let q = (uv - 0.5) * vec2f(BP.w, 1.0) * 2.0 / sqrt(BP.w * BP.w + 1.0);
  return vec4f(srgbOETF(acesThree(g, BP.z)), 1.0 - BP.y * smoothstep(0.35, 1.05, length(q)));
}
`,
  wct =
    UU.replace(
      "@group(0) @binding(2) var<uniform> BP: vec4f;",
      `@group(0) @binding(2) var<uniform> BP: vec4f;
@group(0) @binding(3) var glow: texture_2d<f32>;`,
    ) +
    `
fn lum(c: vec3f) -> f32 { return dot(c, vec3f(0.299, 0.587, 0.114)); }
fn tap(uv: vec2f) -> vec3f { return textureSampleLevel(src, smp, uv, 0.0).rgb; }
// sf-drive: camera motion blur (depth reprojected through last frame's view-projection; pixels that moved with the camera,
// e.g. the chased car, stay sharp) and a grade (saturation, contrast, warmth), after AA
struct FU { invVP: mat4x4f, prevVP: mat4x4f, p: vec4f, s: vec4f, g: vec4f, sh: vec4f, hi: vec4f, fl: vec4f, fc: vec4f, sc: vec4f };   // sc (sf-drive, tod51): the sun's shafts' colour, strength (renderer.shafts)   // p: blur strength, max blur (uv), radial blur, _; g: saturation, contrast, warmth, lift; sh / hi: shadow / highlight tints (rgb), vibrance / S-curve; fl: the sun's uv, flare strength, _; fc: its colour, facing
@group(0) @binding(4) var fdep: texture_depth_2d;
@group(0) @binding(5) var fvel: texture_2d<f32>;
@group(0) @binding(6) var<uniform> FT: FU;
fn mblur(uv: vec2f, c: vec3f, pos: vec2f) -> vec3f {
  if (FT.p.x <= 0.0) { return c; }
  let dd = vec2i(textureDimensions(fdep));
  let pi = clamp(vec2i(pos), vec2i(0), dd - 1);
  let z = textureLoad(fdep, pi, 0);
  if (z >= 1.0) { return c; }
  let ndc = vec4f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, z, 1.0);
  var w = FT.invVP * ndc; w = w / w.w;
  let pc = FT.prevVP * w; let pu = vec2f(pc.x / pc.w * 0.5 + 0.5, 0.5 - pc.y / pc.w * 0.5);
  var v = (uv - pu) * FT.p.x;
  let ov = textureLoad(fvel, clamp(vec2i(pos * vec2f(textureDimensions(fvel)) / vec2f(dd)), vec2i(0), vec2i(textureDimensions(fvel)) - 1), 0);
  if (ov.b > 0.5) { v = ov.xy * FT.p.x; }   // moving objects: their own motion
  v = v * smoothstep(0.18, 0.62, length((uv - 0.5) * vec2f(FT.s.x * FT.s.w, 1.0)));   // sf-drive: the frame's edges only (the centre, the car, stay sharp)
  let L = length(v); if (L < 0.0008) { return c; }
  v = v * min(1.0, FT.p.y / L);
  var acc = c; var n = 1.0;
  for (var k = 1; k <= 7; k++) { let t = f32(k) / 7.0 - 0.5; acc += tap(uv - v * t); n += 1.0; }
  return acc / n;
}
// sf-drive: the sun's glare and lens flare (renderer.flare): a halo, an anamorphic streak, ghosts along the axis through
// the centre and a faint ring, scaled by how much of the sun shows (taps round it: sky depth and a bright sky; clouds and
// buildings dim it) and a veil over the frame when driving into it. Off screen, the edge's taps and a falloff.
fn flare(uv: vec2f) -> vec3f {
  let S = FT.fl.z; if (S <= 0.0) { return vec3f(0.0); }
  let su = FT.fl.xy; let asp = FT.s.x * FT.s.w;
  let sc = clamp(su, vec2f(0.004), vec2f(0.996)); let outK = exp(-length((su - sc) * vec2f(asp, 1.0)) * 7.0);
  let dd = vec2i(textureDimensions(fdep));
  var vis = 0.0;
  for (var k = 0; k < 9; k++) {
    let q = clamp(sc + vec2f(f32(k % 3) - 1.0, f32(k / 3) - 1.0) * 4.0 * FT.s.zw, vec2f(0.0), vec2f(0.999));
    let z = textureLoad(fdep, clamp(vec2i(q * vec2f(dd)), vec2i(0), dd - 1), 0);
    vis += select(0.0, smoothstep(0.55, 0.95, lum(tap(q))), z >= 1.0);
  }
  vis = vis / 9.0 * outK * S;
  if (vis <= 0.001) { return vec3f(0.0); }
  let d = (uv - su) * vec2f(asp, 1.0); let r = length(d);
  let col = FT.fc.rgb;
  var o = col * (0.5 * exp(-r * 10.0) + 0.2 * exp(-r * 3.0));
  o += col * vec3f(0.85, 0.93, 1.1) * exp(-abs(d.y) * 110.0) * exp(-abs(d.x) * 2.6) * 0.3;
  let ax = vec2f(0.5) - su;
  var gt = array<vec4f, 5>(vec4f(0.55, 0.05, 0.0, 0.0), vec4f(1.25, 0.028, 1.0, 0.0), vec4f(1.55, 0.085, 2.0, 0.0), vec4f(1.9, 0.04, 3.0, 0.0), vec4f(2.3, 0.13, 4.0, 0.0));
  var tints = array<vec3f, 5>(vec3f(1.0, 0.7, 0.35), vec3f(0.5, 1.0, 0.6), vec3f(0.35, 0.55, 1.0), vec3f(1.0, 0.45, 0.7), vec3f(0.6, 0.8, 1.0));
  for (var k = 0; k < 5; k++) {
    let g = gt[k]; let gd = length((uv - (su + ax * g.x)) * vec2f(asp, 1.0));
    o += tints[k] * (smoothstep(g.y, g.y * 0.55, gd) * 0.6 + smoothstep(g.y * 1.06, g.y * 0.92, gd) * smoothstep(g.y * 0.8, g.y * 0.95, gd) * 0.5) * 0.08;
  }
  o += vec3f(0.7, 0.85, 1.0) * exp(-pow((r - 0.42) * 16.0, 2.0)) * 0.025;
  return o * vis + col * 0.035 * vis * FT.fc.w;
}
// sf-drive (tod51): the sun's shafts through the haze (renderer.shafts: Karl the Fog's light through the crowns and between
// the towers, golden hour's rays): the sky's light marched toward the sun on screen (20 taps, sky depth only: what stands
// in front of it casts its dark wedge down the rays), faded off the sun's side of the frame and with the sun out of view
fn shafts(uv: vec2f, pos: vec2f) -> vec4f {
  let S = FT.sc.w; if (S <= 0.0) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let su = FT.fl.xy; let asp = FT.s.x * FT.s.w;
  var dv = su - uv; let L = length(dv * vec2f(asp, 1.0));
  let fall = exp(-L * 1.6); if (fall < 0.02) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  dv = dv * min(1.0, 0.5 / max(L, 1e-4));   // (the march's reach: half the frame's height toward the sun)
  let j = fract(52.9829189 * fract(dot(pos, vec2f(0.06711056, 0.00583715))));   // (interleaved gradient noise: the taps' offset a pixel, no ghost copies of the crowns along the rays)
  let dd = vec2i(textureDimensions(fdep));
  var acc = 0.0; var w = 1.0; var wsum = 0.0;
  for (var k = 0; k < 20; k++) {
    let q = uv + dv * (f32(k) + j) / 20.0;
    if (q.x >= 0.0 && q.y >= 0.0 && q.x <= 1.0 && q.y <= 1.0) {
      let z = textureLoad(fdep, clamp(vec2i(q * vec2f(dd)), vec2i(0), dd - 1), 0);
      acc += select(0.0, smoothstep(0.35, 0.9, lum(tap(q))), z >= 1.0) * w;
    } else { acc += 0.5 * w; }   // (off the frame: half the sky's, no hard edge at the border)
    wsum += w; w *= 0.95;
  }
  // (the lit haze toward the sun brightened, the shadowed rays - a crown's, a tower's wedge - darkened: an even veil alone
  // only greyed the frame)
  let v = acc / wsum;
  return vec4f(FT.sc.rgb * v * v * fall * S * 0.6, 1.0 - (1.0 - v) * fall * S * 0.5);
}
// sf-drive: radial blur toward the frame's edges (NFS speed: the centre, the car, stay sharp), strength FT.p.z
fn rblur(uv: vec2f, c: vec3f) -> vec3f {
  let k = FT.p.z; if (k <= 0.0) { return c; }
  let d = (uv - vec2f(0.5, 0.52)); let e = smoothstep(0.42, 0.95, length(d * vec2f(FT.s.x * FT.s.w, 1.0) / 0.9));   // (round 43: the outer frame only - was from 0.22)
  let v = d * k * e; if (length(v) < 0.0006) { return c; }
  var acc = c; for (var j = 1; j <= 6; j++) { acc += tap(uv - v * (f32(j) / 6.0)); }
  return acc / 7.0;
}
fn grade(c0: vec3f) -> vec3f {
  let g = FT.g; if (g.x == 0.0 && g.y == 0.0 && FT.hi.w == 0.0 && FT.p.w == 0.0) { return c0; }
  var c = c0;
  if (FT.p.w != 0.0) { c = pow(max(c, vec3f(0.0)), vec3f(1.0 / (1.0 + FT.p.w))); }   // sf-drive: grade.mids, a gamma lift (the midtones up, black and white stay put)
  var l = lum(c);
  // vibrance: the dull colours gain more than the already saturated (skin, the red car, neon stay in gamut)
  let sat0 = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
  c = mix(vec3f(l), c, 1.0 + g.x + FT.sh.w * (1.0 - smoothstep(0.0, 0.6, sat0)));
  // contrast: a linear pivot (g.y) and a filmic S (hi.w: the smoothstep curve, soft at both ends: no clipped blacks or whites)
  c = (c - 0.5) * (1.0 + g.y) + 0.5;
  let cc = clamp(c, vec3f(0.0), vec3f(1.0)); c = mix(c, cc * cc * (3.0 - 2.0 * cc), FT.hi.w);
  // split toning: a tint in the shadows, another in the highlights (luminance-weighted, their sum keeps the midtones)
  l = clamp(lum(c), 0.0, 1.0);
  c += FT.sh.rgb * (1.0 - l) * (1.0 - l) + FT.hi.rgb * l * l;
  c = c * vec3f(1.0 + g.z, 1.0, 1.0 - g.z) + g.w;
  // sf-drive (round 11): a film shoulder over 0.8 (the clouds, the white fronts and the sun on the paint roll off as in
  // NFS's frames instead of clipping: their 99.5th percentile 0.92, ours was 0.995)
  c = select(c, 0.78 + 0.17 * tanh((c - 0.78) / 0.17), c > vec3f(0.78));
  return clamp(c, vec3f(0.0), vec3f(1.0));
}
@fragment fn fsFinal(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let d = vec2f(textureDimensions(src)); let uv = pos.xy / d; let px = 1.0 / d;
  let cM = tap(uv); let lM = lum(cM);
  let lNW = lum(tap(uv + vec2f(-px.x, -px.y))); let lNE = lum(tap(uv + vec2f(px.x, -px.y)));
  let lSW = lum(tap(uv + vec2f(-px.x, px.y))); let lSE = lum(tap(uv + vec2f(px.x, px.y)));
  let lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE))); let lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
  var c = cM;
  if (lMax - lMin > max(0.0312, lMax * 0.125)) {   // an edge: blur along it
    var dir = vec2f(-((lNW + lNE) - (lSW + lSE)), (lNW + lSW) - (lNE + lSE));
    let red = max((lNW + lNE + lSW + lSE) * 0.03125, 1.0 / 128.0);
    dir = clamp(dir / (min(abs(dir.x), abs(dir.y)) + red), vec2f(-8.0), vec2f(8.0)) * px;
    let a = 0.5 * (tap(uv - dir / 6.0) + tap(uv + dir / 6.0));
    let b = a * 0.5 + 0.25 * (tap(uv - dir * 0.5) + tap(uv + dir * 0.5));
    let lb = lum(b);
    c = select(b, a, lb < lMin || lb > lMax);
  }${
    (globalThis.MB_SHARPEN_FX || 0) > 0
      ? `
  { // sf-drive (round 25): globalThis.MB_SHARPEN_FX - the phones' frame (FXAA, no TAA, upscaled) sharpened as fsFinalT's
    let n = tap(uv + vec2f(0.0, -px.y)); let s = tap(uv + vec2f(0.0, px.y)); let e = tap(uv + vec2f(px.x, 0.0)); let w = tap(uv + vec2f(-px.x, 0.0));
    let mn = min(c, min(min(n, s), min(e, w))); let mx = max(c, max(max(n, s), max(e, w)));
    let k = -sqrt(clamp(min(mn, 1.0 - mx) / max(mx, vec3f(1e-3)), vec3f(0.0), vec3f(1.0))) * ${globalThis.MB_SHARPEN_FX.toFixed(3)};
    c = clamp((c + (n + s + e + w) * k) / (1.0 + 4.0 * k), vec3f(0.0), vec3f(1.0)); }`
      : ""
  }
  c = grade(rblur(uv, mblur(uv, c, pos.xy)));
  let g = textureSampleLevel(glow, smp, uv, 0.0).rgb * BP.x; let sh = shafts(uv, pos.xy);
  let q = (uv - 0.5) * vec2f(BP.w, 1.0) * 2.0 / sqrt(BP.w * BP.w + 1.0);
  return vec4f(srgbOETF(acesThree(g, BP.z)) + c * sh.a * (1.0 - BP.y * smoothstep(0.35, 1.05, length(q))) + flare(uv) + sh.rgb, 1.0);
}
// after TAA: no edge blur; a light contrast-adaptive sharpen gives back what the history's resampling softens
@fragment fn fsFinalT(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let d = vec2f(textureDimensions(src)); let uv = pos.xy / d; let px = 1.0 / d;
  let cM = tap(uv);
  let n = tap(uv + vec2f(0.0, -px.y)); let s = tap(uv + vec2f(0.0, px.y)); let e = tap(uv + vec2f(px.x, 0.0)); let w = tap(uv + vec2f(-px.x, 0.0));
  let mn = min(cM, min(min(n, s), min(e, w))); let mx = max(cM, max(max(n, s), max(e, w)));
  let amt = clamp(min(mn, 1.0 - mx) / max(mx, vec3f(1e-3)), vec3f(0.0), vec3f(1.0));
  let mA = textureSampleLevel(src, smp, uv, 0.0).a;   // sf-drive (round 43): the TAA's motion (fsTAA .a) - globalThis.MB_SHARPEN_MOTION more where the history moved
  let k = -sqrt(amt) * (${(globalThis.MB_SHARPEN ?? 0.14).toFixed(3)} + ${(globalThis.MB_SHARPEN_MOTION ?? 0).toFixed(3)} * mA);   // sf-drive: globalThis.MB_SHARPEN (config.js)
  let c = grade(rblur(uv, mblur(uv, clamp((cM + (n + s + e + w) * k) / (1.0 + 4.0 * k), vec3f(0.0), vec3f(1.0)), pos.xy)));
  let g = textureSampleLevel(glow, smp, uv, 0.0).rgb * BP.x; let sh = shafts(uv, pos.xy);
  let q = (uv - 0.5) * vec2f(BP.w, 1.0) * 2.0 / sqrt(BP.w * BP.w + 1.0);
  return vec4f(srgbOETF(acesThree(g, BP.z)) + c * sh.a * (1.0 - BP.y * smoothstep(0.35, 1.05, length(q))) + flare(uv) + sh.rgb, 1.0);
}
`,
  Mct = `
@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var<uniform> U: vec4f;
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  return vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 0.0, 1.0);
}
var<private> hi: vec2i;
fn ld(p: vec2i) -> vec3f { return textureLoad(src, clamp(p, vec2i(0), hi), 0).rgb; }
fn lu(c: vec3f) -> f32 { return c.g + 0.5 * (c.r + c.b); }
fn setF(w: f32, lA: f32, lB: f32, lC: f32, lD: f32, lE: f32, dir: ptr<function, vec2f>, len: ptr<function, f32>) {
  let dc = lD - lC; let cb = lC - lB; let lx = 1.0 / max(max(abs(dc), abs(cb)), 1e-5); let dx = lD - lB;
  let ec = lE - lC; let ca = lC - lA; let ly = 1.0 / max(max(abs(ec), abs(ca)), 1e-5); let dy = lE - lA;
  *dir += vec2f(dx, dy) * w;
  let sx = clamp(abs(dx) * lx, 0.0, 1.0); let sy = clamp(abs(dy) * ly, 0.0, 1.0);
  *len += (sx * sx + sy * sy) * w;
}
fn tapF(off: vec2f, dir: vec2f, len: vec2f, lob: f32, clp: f32, c: vec3f, aC: ptr<function, vec3f>, aW: ptr<function, f32>) {
  let v = vec2f(off.x * dir.x + off.y * dir.y, off.x * -dir.y + off.y * dir.x) * len;
  let d2 = min(dot(v, v), clp);
  var wB = 0.4 * d2 - 1.0; var wA = lob * d2 - 1.0; wB = wB * wB; wA = wA * wA;
  wB = 1.5625 * wB - 0.5625;
  let w = wB * wA; *aC += c * w; *aW += w;
}
@fragment fn fsUp(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  hi = vec2i(textureDimensions(src)) - 1;
  let pp0 = pos.xy * U.zw * U.xy - 0.5; let fp = floor(pp0); let pp = pp0 - fp; let i = vec2i(fp);
  //    b c
  //  e f g h
  //  i j k l
  //    n o
  let b = ld(i + vec2i(0, -1)); let c = ld(i + vec2i(1, -1));
  let e = ld(i + vec2i(-1, 0)); let f = ld(i); let g = ld(i + vec2i(1, 0)); let h = ld(i + vec2i(2, 0));
  let ii = ld(i + vec2i(-1, 1)); let j = ld(i + vec2i(0, 1)); let k = ld(i + vec2i(1, 1)); let l = ld(i + vec2i(2, 1));
  let n = ld(i + vec2i(0, 2)); let o = ld(i + vec2i(1, 2));
  let bL = lu(b); let cL = lu(c); let eL = lu(e); let fL = lu(f); let gL = lu(g); let hL = lu(h);
  let iL = lu(ii); let jL = lu(j); let kL = lu(k); let lL = lu(l); let nL = lu(n); let oL = lu(o);
  var dir = vec2f(0.0); var len = 0.0;
  setF((1.0 - pp.x) * (1.0 - pp.y), bL, eL, fL, gL, jL, &dir, &len);
  setF(pp.x * (1.0 - pp.y), cL, fL, gL, hL, kL, &dir, &len);
  setF((1.0 - pp.x) * pp.y, fL, iL, jL, kL, nL, &dir, &len);
  setF(pp.x * pp.y, gL, jL, kL, lL, oL, &dir, &len);
  let dr = dot(dir, dir); let zro = dr < 1.0 / 32768.0;
  dir = select(dir * inverseSqrt(max(dr, 1e-12)), vec2f(1.0, 0.0), zro);
  len = len * 0.5; len = len * len;
  let stretch = dot(dir, dir) / max(abs(dir.x), abs(dir.y));
  let len2 = vec2f(1.0 + (stretch - 1.0) * len, 1.0 - 0.5 * len);
  let lob = 0.5 + ((1.0 / 4.0 - 0.04) - 0.5) * len; let clp = 1.0 / lob;
  var aC = vec3f(0.0); var aW = 0.0;
  tapF(vec2f(0.0, -1.0) - pp, dir, len2, lob, clp, b, &aC, &aW); tapF(vec2f(1.0, -1.0) - pp, dir, len2, lob, clp, c, &aC, &aW);
  tapF(vec2f(-1.0, 1.0) - pp, dir, len2, lob, clp, ii, &aC, &aW); tapF(vec2f(0.0, 1.0) - pp, dir, len2, lob, clp, j, &aC, &aW);
  tapF(vec2f(0.0, 0.0) - pp, dir, len2, lob, clp, f, &aC, &aW); tapF(vec2f(-1.0, 0.0) - pp, dir, len2, lob, clp, e, &aC, &aW);
  tapF(vec2f(1.0, 1.0) - pp, dir, len2, lob, clp, k, &aC, &aW); tapF(vec2f(2.0, 1.0) - pp, dir, len2, lob, clp, l, &aC, &aW);
  tapF(vec2f(2.0, 0.0) - pp, dir, len2, lob, clp, h, &aC, &aW); tapF(vec2f(1.0, 0.0) - pp, dir, len2, lob, clp, g, &aC, &aW);
  tapF(vec2f(1.0, 2.0) - pp, dir, len2, lob, clp, o, &aC, &aW); tapF(vec2f(0.0, 2.0) - pp, dir, len2, lob, clp, n, &aC, &aW);
  let mn = min(min(f, g), min(j, k)); let mx = max(max(f, g), max(j, k));
  return vec4f(clamp(aC / aW, mn, mx), 1.0);
}
`,
  Sct = `
struct TU { invVPj: mat4x4f, prevVP: mat4x4f, p: vec4f, s: vec4f };   // invVPj: this frame's clip -> last frame's (sf-drive); p: _, _, blend, reset; s: W, H, 1/W, 1/H
@group(0) @binding(0) var cur: texture_2d<f32>;
@group(0) @binding(1) var hist: texture_2d<f32>;
@group(0) @binding(2) var dep: texture_depth_2d;
@group(0) @binding(3) var smp: sampler;
@group(0) @binding(4) var<uniform> T: TU;
@group(0) @binding(5) var vel: texture_2d<f32>;   // moving objects' motion (uv), b = 1 where written
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  return vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 0.0, 1.0);
}
fn yc(c: vec3f) -> vec3f { return vec3f(dot(c, vec3f(0.25, 0.5, 0.25)), dot(c, vec3f(0.5, 0.0, -0.5)), dot(c, vec3f(-0.25, 0.5, -0.25))); }
fn rgb(c: vec3f) -> vec3f { return vec3f(c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z); }
fn histCR(uv: vec2f) -> vec3f {   // Catmull-Rom from 5 bilinear taps (Jimenez)
  let sp = uv * T.s.xy; let tp = floor(sp - 0.5) + 0.5; let f = sp - tp;
  let w0 = f * (-0.5 + f * (1.0 - 0.5 * f)); let w1 = 1.0 + f * f * (-2.5 + 1.5 * f); let w2 = f * (0.5 + f * (2.0 - 1.5 * f)); let w3 = f * f * (-0.5 + 0.5 * f);
  let w12 = w1 + w2; let t12 = (tp + w2 / w12) * T.s.zw; let t0 = (tp - 1.0) * T.s.zw; let t3 = (tp + 2.0) * T.s.zw;
  var c = textureSampleLevel(hist, smp, vec2f(t12.x, t0.y), 0.0).rgb * (w12.x * w0.y);
  c += textureSampleLevel(hist, smp, vec2f(t0.x, t12.y), 0.0).rgb * (w0.x * w12.y);
  c += textureSampleLevel(hist, smp, t12, 0.0).rgb * (w12.x * w12.y);
  c += textureSampleLevel(hist, smp, vec2f(t3.x, t12.y), 0.0).rgb * (w3.x * w12.y);
  c += textureSampleLevel(hist, smp, vec2f(t12.x, t3.y), 0.0).rgb * (w12.x * w3.y);
  let ws = w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  return max(c / ws, vec3f(0.0));
}
@fragment fn fsTAA(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let ip = vec2i(pos.xy); let mx = vec2i(T.s.xy) - 1;
  let c0 = textureLoad(cur, ip, 0).rgb;
  var m1 = vec3f(0.0); var m2 = vec3f(0.0); var zmin = 1.0;
  for (var y = -1; y <= 1; y++) { for (var x = -1; x <= 1; x++) {
    let q = clamp(ip + vec2i(x, y), vec2i(0), mx);
    let c = yc(textureLoad(cur, q, 0).rgb); m1 += c; m2 += c * c;
    zmin = min(zmin, textureLoad(dep, q, 0));
  } }
  if (T.p.w > 0.5) { return vec4f(c0, 0.0); }   // (sf-drive (round 43): .a the final pass's extra sharpen in motion - none without a history)
  let uv = pos.xy * T.s.zw;
  // where a moving object is (the 3x3 neighbourhood: its edges too), its own motion; elsewhere the camera's, through depth
  var mv = vec3f(0.0); var react = 0.0;
  for (var y = -1; y <= 1; y++) { for (var x = -1; x <= 1; x++) {
    let m = textureLoad(vel, clamp(ip + vec2i(x, y), vec2i(0), mx), 0);
    react = max(react, m.a);
    if (m.b > 0.5 && (mv.z < 0.5 || dot(m.xy, m.xy) > dot(mv.xy, mv.xy))) { mv = vec3f(m.xy, 1.0); }
  } }
  var puv: vec2f; var ok = true;
  if (mv.z > 0.5) { puv = uv - mv.xy; }
  else {
    let ndc = vec2f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
    let pc = T.invVPj * vec4f(ndc, zmin, 1.0);   // (sf-drive: last frame's clip space straight from this frame's, one matrix)
    puv = vec2f(pc.x / pc.w * 0.5 + 0.5, 0.5 - pc.y / pc.w * 0.5); ok = pc.w > 0.0;
    if (all(abs(puv - uv) * T.s.xy < vec2f(0.01))) { puv = uv; }   // a still camera: the history as it is, not resampled
  }
  if (!ok || any(puv < vec2f(0.0)) || any(puv > vec2f(1.0))) { return vec4f(c0, 0.0); }
  let mean = m1 / 9.0; let sig = sqrt(max(m2 / 9.0 - mean * mean, vec3f(0.0)));
  let bmin = mean - 1.25 * sig; let bmax = mean + 1.25 * sig;
  var h = yc(histCR(puv));
  // clip towards the box centre (Playdead)
  let cen = 0.5 * (bmax + bmin); let ext = max(0.5 * (bmax - bmin), vec3f(1e-4));
  let v = h - cen; let a = abs(v / ext); let mxa = max(a.x, max(a.y, a.z));
  if (mxa > 1.0) { h = cen + v / mxa; }
  let motion = length((puv - uv) * T.s.xy);
  let k = max(clamp(T.p.z + motion * 0.008, T.p.z, 0.25), react * 0.6);   // moving particles / sprites: mostly this frame (sf-drive: less of the new frame in motion, 0.02 / 0.4 let driving shimmer; the clip keeps ghosts off)
  // sf-drive (round 43): .a - how far the history moved (0 still, 1 at 6+ px a frame): the final pass sharpens that much more
  // (the history resampled every frame in motion softens what a still view keeps: the road, the rails at speed)
  return vec4f(rgb(mix(h, yc(c0), k)), clamp((motion - 0.5) / 5.5, 0.0, 1.0));
}
`,
  CU =
    Ec.split("struct Bones")[0] +
    HU +
    `
@group(0) @binding(0) var<uniform> F: Frame;
@group(0) @binding(1) var<uniform> LB: Lights;
@group(0) @binding(2) var<storage, read_write> CLU: array<u32>;
@compute @workgroup_size(4, 3, 4) fn build(@builtin(global_invocation_id) g: vec3u) {
  if (g.x >= CL_X || g.y >= CL_Y || g.z >= CL_Z) { return; }
  let idx = ((g.z * CL_Y + g.y) * CL_X + g.x) * (CL_MAX + 1u);
  let near = F.clusterP.x; let far = F.clusterP.y; let ty = F.clusterP.z; let tx = ty * F.clusterP.w;
  let z0 = near * pow(far / near, f32(g.z) / f32(CL_Z)); let z1 = near * pow(far / near, f32(g.z + 1u) / f32(CL_Z));
  let x0 = f32(g.x) / f32(CL_X) * 2.0 - 1.0; let x1 = f32(g.x + 1u) / f32(CL_X) * 2.0 - 1.0;
  let y0 = 1.0 - f32(g.y + 1u) / f32(CL_Y) * 2.0; let y1 = 1.0 - f32(g.y) / f32(CL_Y) * 2.0;
  let xs = vec4f(x0 * z0, x1 * z0, x0 * z1, x1 * z1) * tx; let ys = vec4f(y0 * z0, y1 * z0, y0 * z1, y1 * z1) * ty;
  let mn = vec3f(min(min(xs.x, xs.y), min(xs.z, xs.w)), min(min(ys.x, ys.y), min(ys.z, ys.w)), -z1);
  let mx = vec3f(max(max(xs.x, xs.y), max(xs.z, xs.w)), max(max(ys.x, ys.y), max(ys.z, ys.w)), -z0);
  var n = 0u;
  for (var i = u32(LB.info.x); i < u32(LB.info.y); i++) {
    let L = LB.l[i];
    let c = (F.view * vec4f(L.pos.xyz, 1.0)).xyz;
    let d = c - clamp(c, mn, mx);
    if (dot(d, d) <= L.pos.w * L.pos.w && n < CL_MAX) { CLU[idx + 1u + n] = i; n++; }
  }
  CLU[idx] = n;
}
`;
