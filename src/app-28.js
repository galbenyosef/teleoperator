// app 28 — a4t
// Lines 46321-46595 of readable/app.pretty.js (statement-aligned).
var qA = `
struct PU {
  model: mat4x4f,     // pool -> world
  inv: mat4x4f,       // world -> pool (water at rest: y = 0; interior x in [-hx, hx], z in [-hz, hz], floor y = -depth)
  size: vec4f,        // hx, hz, depth, rim height above the water
  sim: vec4f,         // nx, nz, cell (m), damping
  sun: vec4f,         // towards the sun (pool space), sun on
  water: vec4f,       // extinction rgb (1/m), scattering albedo
  tile: vec4f,        // tile size (m), grout width (m), colour variation, caustic gain
  tileCol: vec4f,     // tile albedo rgb, grout albedo
  band: vec4f,        // water-line band colour rgb, band height (m)
  cam: vec4f,         // camera in pool space, underwater
  misc: vec4f,        // drop count, env layer, reflection strength, time
  wave: vec4f,        // wind ripples: strength (m/s per step), scale (m), drift (m/s), _
  drops: array<vec4f, 16>,   // x, z (pool metres), radius (m), height (m)
};
@group(1) @binding(0) var<uniform> PP: PU;
`,
  A4t =
    qA +
    `
@group(1) @binding(1) var hIn: texture_2d<f32>;
@group(1) @binding(2) var hOut: texture_storage_2d<rgba32float, write>;
@group(1) @binding(3) var<storage, read_write> imp: array<atomic<i32>>;
@group(1) @binding(4) var sOut: texture_storage_2d<rgba16float, write>;
fn dims() -> vec2i { return vec2i(PP.sim.xy); }
fn H(c: vec2i) -> vec4f { return textureLoad(hIn, clamp(c, vec2i(0), dims() - 1), 0); }
// drops (cosine bumps) and the particles' impacts
@compute @workgroup_size(8, 8) fn dropK(@builtin(global_invocation_id) g: vec3u) {
  let c = vec2i(g.xy); let n = dims(); if (any(c >= n)) { return; }
  var v = H(c);
  let p = (vec2f(c) + 0.5) * PP.sim.z - PP.size.xy;
  for (var k = 0; k < i32(PP.misc.x); k++) {
    let d = PP.drops[k];
    let x = max(0.0, 1.0 - length(p - d.xy) / d.z);
    v.r += (0.5 - cos(x * PI) * 0.5) * d.w;
  }
  // wind: a drifting noise field nudges the surface; the waves it raises make the caustic net
  if (PP.wave.x > 0.0) {
    let q = p / PP.wave.y; let t = PP.misc.w * PP.wave.z / PP.wave.y;
    let n1 = textureSampleLevel(tNoise, sRep, vec3f(q.x + t, q.y * 1.07 + t * 0.4, t * 0.21), 0.0);
    let n2 = textureSampleLevel(tNoise, sRep, vec3f(q.x * 2.3 - t * 0.7, q.y * 2.1 + t * 0.9, 0.5 + t * 0.33), 0.0);
    v.g += ((n1.g - 0.5) + (n2.b - 0.5) * 0.6) * PP.wave.x;
  }
  let i = u32(c.y * n.x + c.x);
  let a = atomicExchange(&imp[i], 0);
  if (a != 0) { v.r += f32(a) / 65536.0 * 0.0015; }
  textureStore(hOut, c, v);
}
// one step of the wave equation (neighbour average pulls the height, velocity damped); walls reflect
@compute @workgroup_size(8, 8) fn stepK(@builtin(global_invocation_id) g: vec3u) {
  let c = vec2i(g.xy); if (any(c >= dims())) { return; }
  var v = H(c);
  let avg = (H(c - vec2i(1, 0)).r + H(c + vec2i(1, 0)).r + H(c - vec2i(0, 1)).r + H(c + vec2i(0, 1)).r) * 0.25;
  v.g += (avg - v.r) * 2.0;
  v.g *= PP.sim.w;
  v.r += v.g;
  v.r *= 0.9995;
  textureStore(hOut, c, v);
}
// height + normal for rendering (filterable)
@compute @workgroup_size(8, 8) fn normK(@builtin(global_invocation_id) g: vec3u) {
  let c = vec2i(g.xy); if (any(c >= dims())) { return; }
  let h = H(c).r; let cs = PP.sim.z;
  let dx = vec3f(cs, H(c + vec2i(1, 0)).r - h, 0.0);
  let dz = vec3f(0.0, H(c + vec2i(0, 1)).r - h, cs);
  let nrm = normalize(cross(dz, dx));
  textureStore(sOut, c, vec4f(h, nrm.x, nrm.z, 0.0));
}
`,
  cU = `
const IOR_W = 1.333;
fn BLO() -> vec3f { return vec3f(-PP.size.x, -PP.size.z, -PP.size.y); }   // the pool box (open far above the rim)
fn BHI() -> vec3f { return vec3f(PP.size.x, 100.0, PP.size.y); }
fn refrLight() -> vec3f { return refract(-PP.sun.xyz, vec3f(0.0, 1.0, 0.0), 1.0 / IOR_W); }   // sunlight inside flat water (downwards)
fn surfUV(xz: vec2f) -> vec2f { return (xz + PP.size.xy) / (2.0 * PP.size.xy); }
// where a point (on a wall or the floor) projects along the flat refracted sun onto the floor plane -> caustics texture uv
fn causticUV(p: vec3f) -> vec2f {
  let rl = refrLight();
  let proj = p.xz - (p.y + PP.size.z) * rl.xz / rl.y;
  let ctr = -PP.size.z * 0.5 * rl.xz / rl.y;
  return (proj - ctr) / (2.8 * PP.size.xy) + 0.5;
}
`,
  R4t =
    qA +
    cU +
    `
@group(1) @binding(1) var tSurf: texture_2d<f32>;
struct CO { @builtin(position) pos: vec4f, @location(0) oldP: vec3f, @location(1) newP: vec3f };
fn project(o: vec3f, ray: vec3f, rl: vec3f) -> vec3f {
  let t = rayBox(o, ray, BLO(), BHI());
  let q = o + ray * t.y;
  return q + rl * ((-PP.size.z - q.y) / rl.y);
}
@vertex fn vsC(@builtin(vertex_index) vi: u32) -> CO {
  let gx = u32(PP.sim.x); let gz = u32(PP.sim.y);
  let q = vi / 6u; let k = vi % 6u;
  let ci = array<vec2u, 6>(vec2u(0u, 0u), vec2u(1u, 0u), vec2u(1u, 1u), vec2u(0u, 0u), vec2u(1u, 1u), vec2u(0u, 1u));
  let nq = gx - 1u;
  let cell = vec2u(q % nq, q / nq) + ci[k];
  let uv = (vec2f(cell) + 0.5) / vec2f(f32(gx), f32(gz));
  let s = textureSampleLevel(tSurf, sClamp, uv, 0.0);
  let nxz = s.yz;
  let nrm = vec3f(nxz.x, sqrt(max(1.0 - dot(nxz, nxz), 0.0)), nxz.y);
  let rl = refrLight();
  let ray = refract(-PP.sun.xyz, nrm, 1.0 / IOR_W);
  let p = vec3f((uv * 2.0 - 1.0) * PP.size.xy, 0.0).xzy;
  var o: CO;
  o.oldP = project(p, rl, rl);
  o.newP = project(p + vec3f(0.0, s.x, 0.0), ray, rl);
  let cuv = causticUV(o.newP);
  o.pos = vec4f(cuv.x * 2.0 - 1.0, 1.0 - cuv.y * 2.0, 0.0, 1.0);
  return o;
}
@fragment fn fsC(i: CO) -> @location(0) vec4f {
  let oldA = length(dpdx(i.oldP)) * length(dpdy(i.oldP));
  let newA = length(dpdx(i.newP)) * length(dpdy(i.newP));
  var c = oldA / max(newA, 1e-12);
  // the rim: light that entered the water outside the pool never reaches this point
  let rl = refrLight();
  let t = rayBox(i.newP, -rl, BLO(), BHI());
  let yExit = i.newP.y - rl.y * t.y;
  c *= 1.0 / (1.0 + exp(-60.0 / PP.size.z * (yExit - PP.size.w)));
  return vec4f(min(c, 12.0), 0.0, 0.0, 1.0);
}
`,
  P4t =
    qA +
    cU +
    `
@group(1) @binding(1) var tSurf: texture_2d<f32>;
@group(1) @binding(2) var tCaus: texture_2d<f32>;
@group(1) @binding(3) var tEnvP: texture_2d_array<f32>;
struct PO { @builtin(position) pos: vec4f, @location(0) lp: vec3f, @location(1) wp: vec3f };
fn h2(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn toWorldDir(d: vec3f) -> vec3f { return normalize((PP.model * vec4f(d, 0.0)).xyz); }
fn skyRad(dl: vec3f) -> vec3f {   // environment radiance towards a pool-space direction
  let d = toWorldDir(dl);
  let e = textureSampleLevel(tEnvP, sRep, equirectUV(d), i32(PP.misc.y), 0.0).rgb * G.misc.y;
  return e + ambientDir(d) * select(1.0, 0.0, G.misc.y > 0.0);
}
// tiles: square tiles with grout, a darker band at the water line, per-tile variation
fn tileAlbedo(p: vec3f, nrm: vec3f) -> vec3f {
  var uv: vec2f;
  if (abs(nrm.y) > 0.5) { uv = p.xz; } else if (abs(nrm.x) > 0.5) { uv = vec2f(p.z, p.y); } else { uv = vec2f(p.x, p.y); }
  let ts = PP.tile.x; let q = uv / ts; let cell = floor(q); let f = fract(q) * ts;
  let gw = PP.tile.y;
  let grout = 1.0 - (smoothstep(gw * 0.5, gw, f.x) * smoothstep(gw * 0.5, gw, f.y) * smoothstep(gw * 0.5, gw, ts - f.x) * smoothstep(gw * 0.5, gw, ts - f.y));
  let v = 1.0 + (h2(cell + vec2f(nrm.x * 7.0, nrm.z * 13.0)) - 0.5) * PP.tile.z;
  var alb = PP.tileCol.rgb * v;
  if (abs(nrm.y) < 0.5 && p.y > -PP.band.w) { alb = PP.band.rgb * v; }
  // a lane line on the floor
  if (abs(nrm.y) > 0.5 && abs(p.z) < ts * 1.5 && abs(p.x) < PP.size.x - 0.6) { alb = PP.band.rgb * v; }
  return mix(alb, vec3f(PP.tileCol.a), grout);
}
fn wallNormal(p: vec3f) -> vec3f {
  let dx = PP.size.x - abs(p.x); let dz = PP.size.y - abs(p.z); let dy = p.y + PP.size.z;
  if (dy < min(dx, dz)) { return vec3f(0.0, 1.0, 0.0); }
  if (dx < dz) { return vec3f(-sign(p.x), 0.0, 0.0); }
  return vec3f(0.0, 0.0, -sign(p.z));
}
fn waterH(xz: vec2f) -> f32 { return textureSampleLevel(tSurf, sClamp, surfUV(xz), 0.0).r; }
// radiance leaving a point on the pool's walls / floor (towards the water surface or the camera)
fn wallColor(p: vec3f) -> vec3f {
  let nrm = wallNormal(p);
  let alb = tileAlbedo(p, nrm);
  // ambient occlusion in the corners and edges
  let dx = PP.size.x - abs(p.x); let dz = PP.size.y - abs(p.z); let dy = p.y + PP.size.z;
  var ed = 0.0;
  if (abs(nrm.y) > 0.5) { ed = min(dx, dz); } else if (abs(nrm.x) > 0.5) { ed = min(dy, dz); } else { ed = min(dy, dx); }
  let ao = 1.0 - 0.55 * exp(-ed / 0.25);
  let hw = waterH(p.xz);
  let under = p.y < hw;
  let rl = refrLight();
  var sunE = vec3f(0.0);
  if (PP.sun.w > 0.5 && PP.sun.y > 0.0) {
    if (under) {
      let cs = textureSampleLevel(tCaus, sClamp, causticUV(p), 0.0).r;
      let path = (hw - p.y) / max(-rl.y, 0.05);
      let fr = 1.0 - pow(1.0 - max(PP.sun.y, 0.0), 5.0) * 0.9;
      sunE = VLt.sunIrr.rgb * max(dot(-rl, nrm), 0.0) * cs * PP.tile.w * exp(-PP.water.xyz * path) * fr;
    } else {
      let t = rayBox(p, PP.sun.xyz, BLO(), BHI());
      let y = p.y + PP.sun.y * t.y;
      let lit = 1.0 / (1.0 + exp(-80.0 * (y - PP.size.w)));
      sunE = VLt.sunIrr.rgb * max(dot(PP.sun.xyz, nrm), 0.0) * lit;
    }
  }
  // sky: a pool sees a smaller sky the deeper it goes; under water it is filtered by the depth
  let skyVis = select(0.55 + 0.35 * sat((p.y + PP.size.z) / PP.size.z), 0.5, abs(nrm.y) > 0.5) * ao;
  var skyE = VLt.skyIrr.rgb * skyVis;
  if (under) { skyE *= exp(-PP.water.xyz * (hw - p.y) * 1.2); }
  return alb / PI * (sunE + skyE);
}
fn absorb(c: vec3f, len: f32) -> vec3f {
  let tr = exp(-PP.water.xyz * len);
  let scat = (VLt.skyIrr.rgb * 0.5 + VLt.sunIrr.rgb * max(PP.sun.y, 0.0) * 0.35) / PI * PP.water.w * vec3f(0.35, 0.75, 0.85);
  return c * tr + scat * (1.0 - tr);
}
// what a ray from the surface sees: through the water to a wall, or out of the pool (above the rim: the sky)
fn surfaceRay(o: vec3f, ray: vec3f) -> vec3f {
  let t = rayBox(o, ray, BLO(), BHI());
  if (ray.y < 0.0) {
    let hit = o + ray * t.y;
    return absorb(wallColor(hit), t.y);
  }
  let hit = o + ray * t.y;
  if (hit.y < PP.size.w) { return wallColor(hit); }
  var c = skyRad(ray) * PP.misc.z;
  let sd = dot(ray, PP.sun.xyz);
  if (PP.sun.w > 0.5) { c += VLt.sunIrr.rgb * pow(max(sd, 0.0), 3000.0) * 480.0; }   // the sun's glint (normalised lobe)
  return c;
}
fn outP(lin: vec3f, wp: vec3f) -> FOut { return FOut(present(lin), vec4f(lin, viewDepth(wp))); }
// the pool box: five inner faces (from the rim down)
@vertex fn vsPool(@builtin(vertex_index) vi: u32) -> PO {
  let f = vi / 6u; let k = vi % 6u;
  let q = array<vec2f, 6>(vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0), vec2f(0.0, 0.0), vec2f(1.0, 1.0), vec2f(0.0, 1.0))[k];
  let hx = PP.size.x; let hz = PP.size.y; let y0 = -PP.size.z; let y1 = PP.size.w;
  var p: vec3f;
  if (f == 0u) { p = vec3f(mix(-hx, hx, q.x), y0, mix(hz, -hz, q.y)); }
  else if (f == 1u) { p = vec3f(-hx, mix(y0, y1, q.y), mix(-hz, hz, q.x)); }
  else if (f == 2u) { p = vec3f(hx, mix(y0, y1, q.y), mix(hz, -hz, q.x)); }
  else if (f == 3u) { p = vec3f(mix(hx, -hx, q.x), mix(y0, y1, q.y), -hz); }
  else { p = vec3f(mix(-hx, hx, q.x), mix(y0, y1, q.y), hz); }
  var o: PO;
  let w = (PP.model * vec4f(p, 1.0)).xyz;
  o.pos = F.viewProj * vec4f(w, 1.0); o.lp = p; o.wp = w;
  return o;
}
@fragment fn fsPool(i: PO) -> FOut {
  var c = wallColor(i.lp);
  if (PP.cam.w > 0.5) { c = absorb(c, length(i.lp - PP.cam.xyz)); }
  return outP(c, i.wp);
}
@vertex fn vsWater(@builtin(vertex_index) vi: u32) -> PO {
  let gx = u32(PP.sim.x); let gz = u32(PP.sim.y);
  let nq = gx - 1u;
  let q = vi / 6u; let k = vi % 6u;
  let ci = array<vec2u, 6>(vec2u(0u, 0u), vec2u(0u, 1u), vec2u(1u, 1u), vec2u(0u, 0u), vec2u(1u, 1u), vec2u(1u, 0u));
  let cell = vec2u(q % nq, q / nq) + ci[k];
  let uv = vec2f(cell) / vec2f(f32(gx - 1u), f32(gz - 1u));
  let s = textureSampleLevel(tSurf, sClamp, uv, 0.0);
  let p = vec3f((uv.x * 2.0 - 1.0) * PP.size.x, s.x, (uv.y * 2.0 - 1.0) * PP.size.y);
  var o: PO;
  let w = (PP.model * vec4f(p, 1.0)).xyz;
  o.pos = F.viewProj * vec4f(w, 1.0); o.lp = p; o.wp = w;
  return o;
}
@fragment fn fsWater(i: PO, @builtin(front_facing) ff: bool) -> FOut {
  var uv = surfUV(i.lp.xz);
  var s = textureSampleLevel(tSurf, sClamp, uv, 0.0);
  for (var k = 0; k < 4; k++) { uv += s.yz * 0.004; s = textureSampleLevel(tSurf, sClamp, uv, 0.0); }   // peakier crests
  var nrm = vec3f(s.y, sqrt(max(1.0 - dot(s.yz, s.yz), 0.0)), s.z);
  let inc = normalize(i.lp - PP.cam.xyz);
  var col: vec3f;
  if (PP.cam.w < 0.5) {
    let rfl = reflect(inc, nrm); let rfr = refract(inc, nrm, 1.0 / IOR_W);
    let c = max(dot(nrm, -inc), 0.0);
    let fres = 0.02 + 0.98 * pow(1.0 - c, 5.0);
    col = mix(surfaceRay(i.lp, rfr), surfaceRay(i.lp, rfl), fres);
  } else {
    nrm = -nrm;
    let rfl = reflect(inc, nrm); let rfr = refract(inc, nrm, IOR_W);
    let c = max(dot(nrm, -inc), 0.0);
    let fres = select(0.02 + 0.98 * pow(1.0 - c, 5.0), 1.0, dot(rfr, rfr) < 1e-6);
    var up = vec3f(0.0);
    if (dot(rfr, rfr) > 1e-6) { up = skyRad(rfr) * PP.misc.z; }
    col = mix(up, absorb(surfaceRay(i.lp, rfl), 0.0), fres);
    col = absorb(col, length(i.lp - PP.cam.xyz));
  }
  return outP(col, i.wp);
}
`;
