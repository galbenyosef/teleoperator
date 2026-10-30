// app 29 — azt
// Lines 46803-47086 of readable/app.pretty.js (statement-aligned).
var dV = `
struct Part { pos: vec3f, age: f32, vel: vec3f, life: f32, col: vec4f, size: f32, seed: f32, kind: f32, temp: f32 };
struct Batch { p0: vec4f, p1: vec4f, dir: vec4f, sp: vec4f, sz: vec4f, col: vec4f, vel: vec4f, idx: vec4u };
struct PSU {
  model: mat4x4f,
  grav: vec4f,      // gravity xyz, drag (1/s)
  wind: vec4f,      // wind xyz (m/s), turbulence (m/s)
  turb: vec4f,      // turbulence scale (1/m), speed, flow coupling, ground height (world)
  gnd: vec4f,       // restitution, friction, ground (1 bounce, 2 absorb), spark cooling (1/s)
  rnd: vec4f,       // streak shutter (s), intensity, soft distance (m), smoke growth (1/s)
  flowInv: mat4x4f, // world -> flow grid uvw
  flow: vec4f,      // m/s per grid unit, flow on, smoke albedo, emissive compression
  poolInv: mat4x4f, // world -> pool (water plane y = 0)
  pool: vec4f,      // half size x, half size z, on, splash strength
  pool2: vec4f,     // pool grid nx, nz, _, _
  cnt: vec4u,       // spawn count, ring head, capacity (CPU-spawned region), batches
  trail: vec4f,     // sparks per second shed by a comet star, by a willow star, their life (s), size (m)
  cap2: vec4u,      // first GPU-spawned slot, GPU-spawned slots, flashes, _
  flashP: array<vec4f, 8>,   // recent bursts lighting the smoke: position (world), intensity (cd)
  flashC: array<vec4f, 8>,   // their colour
};
@group(1) @binding(0) var<uniform> S: PSU;
`,
  Azt =
    dV +
    `
@group(1) @binding(1) var<storage, read_write> parts: array<Part>;
@group(1) @binding(2) var<storage, read> batches: array<Batch>;
@group(1) @binding(3) var tFlow: texture_3d<f32>;
@group(1) @binding(4) var<storage, read_write> poolImp: array<atomic<i32>>;
@group(1) @binding(5) var<storage, read_write> ctr: array<atomic<u32>, 4>;   // GPU-spawned ring head
fn rnd(s: ptr<function, u32>) -> f32 {
  *s = *s * 747796405u + 2891336453u;
  var w = ((*s >> ((*s >> 28u) + 4u)) ^ *s) * 277803737u; w = (w >> 22u) ^ w;
  return f32(w) / 4294967295.0;
}
fn basis(n: vec3f) -> mat3x3f {
  let s = select(-1.0, 1.0, n.z >= 0.0); let a = -1.0 / (s + n.z); let b = n.x * n.y * a;
  return mat3x3f(vec3f(1.0 + s * n.x * n.x * a, s * b, -s * n.x), vec3f(b, s + n.y * n.y * a, -n.y), n);
}
@compute @workgroup_size(64) fn spawn(@builtin(global_invocation_id) g: vec3u) {
  let i = g.x; if (i >= S.cnt.x) { return; }
  var b = 0u;
  for (var k = 0u; k < S.cnt.w; k++) { let q = batches[k].idx; if (i >= q.x && i < q.x + q.y) { b = k; break; } }
  let B = batches[b];
  var s = i * 9781u + u32(G.time.z) * 6271u + S.cnt.y * 131u + 7u;
  _ = rnd(&s);
  // position: along the segment p0 -> p1, inside a ball / on a disc / on a sphere of radius p0.w
  var pos = mix(B.p0.xyz, B.p1.xyz, rnd(&s));
  let shape = u32(B.vel.w);
  let u1 = rnd(&s); let u2 = rnd(&s); let u3 = rnd(&s);
  let ph = u1 * 6.2831853;
  if (shape == 1u) {        // disc (xz)
    let rr = sqrt(u2) * B.p0.w; pos += vec3f(cos(ph) * rr, 0.0, sin(ph) * rr);
  } else {                  // ball (0) or sphere shell (2)
    let z = u2 * 2.0 - 1.0; let rxy = sqrt(max(1.0 - z * z, 0.0));
    let rr = select(pow(u3, 1.0 / 3.0), 1.0, shape == 2u) * B.p0.w;
    pos += vec3f(cos(ph) * rxy, z, sin(ph) * rxy) * rr;
  }
  // direction: inside a cone around dir (cos half-angle dir.w)
  let ct = mix(1.0, B.dir.w, rnd(&s)); let st = sqrt(max(1.0 - ct * ct, 0.0)); let p2 = rnd(&s) * 6.2831853;
  let dl = basis(normalize(B.dir.xyz + vec3f(1e-6))) * vec3f(cos(p2) * st, sin(p2) * st, ct);
  let wpos = (S.model * vec4f(pos, 1.0)).xyz;
  let wdir = normalize((S.model * vec4f(dl, 0.0)).xyz + vec3f(1e-7));
  var p: Part;
  p.pos = wpos; p.age = 0.0;
  p.vel = wdir * mix(B.sp.x, B.sp.y, rnd(&s)) + B.vel.xyz;
  p.life = mix(B.sp.z, B.sp.w, rnd(&s));
  p.col = B.col; p.size = mix(B.sz.x, B.sz.y, rnd(&s)); p.seed = rnd(&s); p.kind = B.sz.z;
  p.temp = B.sz.w * mix(0.85, 1.15, rnd(&s));
  parts[(S.cnt.y + i) % S.cnt.z] = p;
}
fn curl(p: vec3f) -> vec3f {   // curl of a noise vector potential (Worley fbm channels), finite differences
  let e = 0.02;
  let dx = textureSampleLevel(tNoise, sRep, p + vec3f(e, 0.0, 0.0), 0.0) - textureSampleLevel(tNoise, sRep, p - vec3f(e, 0.0, 0.0), 0.0);
  let dy = textureSampleLevel(tNoise, sRep, p + vec3f(0.0, e, 0.0), 0.0) - textureSampleLevel(tNoise, sRep, p - vec3f(0.0, e, 0.0), 0.0);
  let dz = textureSampleLevel(tNoise, sRep, p + vec3f(0.0, 0.0, e), 0.0) - textureSampleLevel(tNoise, sRep, p - vec3f(0.0, 0.0, e), 0.0);
  // potential (g, b, a): curl = (dA/dy - dB/dz, dG/dz - dA/dx, dB/dx - dG/dy)
  return vec3f(dy.a - dz.b, dz.g - dx.a, dx.b - dy.g) / (2.0 * e) * 0.15;
}
fn child() -> u32 { return S.cap2.x + atomicAdd(&ctr[0], 1u) % max(S.cap2.y, 1u); }
@compute @workgroup_size(64) fn update(@builtin(global_invocation_id) g: vec3u) {
  let i = g.x; if (i >= S.cap2.x + S.cap2.y) { return; }
  var p = parts[i]; if (p.life <= 0.0) { return; }
  let dt = G.time.y;
  p.age += dt; if (p.age >= p.life) { p.life = 0.0; parts[i] = p; return; }
  let kind = u32(p.kind + 0.5);
  var drag = S.grav.w; var gs = 1.0;
  if (kind == 3u) { drag = max(drag, 1.6); gs = -0.06; }            // smoke: buoyant, carried by the air
  else if (kind == 2u) { drag = max(drag, 2.0); gs = 0.0; }         // motes float
  else if (kind == 6u) { drag = max(drag, 3.0); gs = 0.12; }        // snow: ~1 m/s terminal speed
  else if (kind == 1u) { drag = max(drag, 1.2); gs = 0.25; }        // embers: light, ride the plume
  else if (kind == 8u) { drag = max(drag, 1.3); }                    // willow stars: slow, heavy droop
  var air = S.wind.xyz;
  if (S.flow.y > 0.5) {
    let uvw = (S.flowInv * vec4f(p.pos, 1.0)).xyz;
    if (all(uvw > vec3f(0.0)) && all(uvw < vec3f(1.0))) {
      air += textureSampleLevel(tFlow, sClamp, uvw, 0.0).xyz * S.flow.x * S.turb.z;
      drag = max(drag, 2.5);
    }
  }
  if (S.wind.w > 0.0) { air += curl(p.pos * S.turb.x + vec3f(0.0, -G.time.x * S.turb.y, G.time.x * S.turb.y * 0.37)) * S.wind.w; }
  p.vel += (S.grav.xyz * gs + (air - p.vel) * drag) * dt;
  let prev = p.pos;
  p.pos += p.vel * dt;
  if (S.gnd.z > 0.5 && p.pos.y < S.turb.w) {
    if (kind == 4u || kind == 5u || S.gnd.z > 1.5) { p.life = 0.0; }
    else if (kind == 6u) { p.vel = vec3f(0.0); p.pos.y = S.turb.w; }
    else {
      p.pos.y = S.turb.w + (S.turb.w - p.pos.y) * S.gnd.x;
      p.vel = vec3f(p.vel.x * S.gnd.y, abs(p.vel.y) * S.gnd.x, p.vel.z * S.gnd.y);
      if (kind <= 1u) { p.temp *= 0.8; }
    }
  }
  if (S.pool.z > 0.5) {
    let a0 = (S.poolInv * vec4f(prev, 1.0)).xyz; let a1 = (S.poolInv * vec4f(p.pos, 1.0)).xyz;
    if (a0.y > 0.0 && a1.y <= 0.0 && abs(a1.x) < S.pool.x && abs(a1.z) < S.pool.y) {
      let res = vec2u(S.pool2.xy);
      let c = min(vec2u((vec2f(a1.x / S.pool.x, a1.z / S.pool.y) * 0.5 + 0.5) * vec2f(res)), res - 1u);
      let m = p.size * min(length(p.vel), 12.0) * S.pool.w;
      atomicAdd(&poolImp[c.y * res.x + c.x], -i32(m * 65536.0));
      if (kind == 4u || kind == 5u) { p.life = 0.0; }
    }
  }
  if (kind <= 1u || kind >= 7u) { p.temp *= exp(-S.gnd.w * dt); }
  // stars that shed sparks: charcoal / titanium sparks left hanging along the path (they fall, cool from gold to red)
  if ((kind == 7u || kind == 8u) && S.cap2.y > 0u) {
    var sd = i * 1973u + u32(G.time.z) * 9277u + 11u;
    let wil = kind == 8u;
    let rate = select(S.trail.x, S.trail.y, wil) * (1.0 - 0.6 * p.age / p.life);
    let n = min(u32(floor(rate * dt + rnd(&sd))), 6u);
    for (var k = 0u; k < n; k++) {
      var c: Part;
      c.pos = mix(prev, p.pos, rnd(&sd));
      let z = rnd(&sd) * 2.0 - 1.0; let ph = rnd(&sd) * 6.2831853; let r = sqrt(max(1.0 - z * z, 0.0));
      c.vel = p.vel * select(0.12, 0.3, wil) + vec3f(cos(ph) * r, z, sin(ph) * r) * select(1.4, 0.5, wil);
      c.age = 0.0; c.life = S.trail.z * mix(0.45, 1.15, rnd(&sd)) * select(1.0, 2.4, wil);
      c.col = select(vec4f(1.0, 0.86, 0.66, 0.85), vec4f(1.0, 0.64, 0.3, 0.9), wil);
      c.size = S.trail.w * mix(0.6, 1.25, rnd(&sd)); c.seed = rnd(&sd); c.kind = 0.0;
      c.temp = p.temp * select(0.93, 0.8, wil);
      parts[child()] = c;
    }
  }
  // crossette: at ~40% of its life the star breaks into four, flung sideways
  if (kind == 9u && p.age > p.life * 0.4 && S.cap2.y > 0u) {
    var sd = i * 7919u + u32(G.time.z) * 104729u + 3u;
    let f = normalize(p.vel + vec3f(1e-5)); let b = basis(f);
    let a0 = rnd(&sd) * 6.2831853;
    for (var k = 0u; k < 4u; k++) {
      let a = a0 + f32(k) * 1.5707963;
      var c = p;
      c.vel = p.vel * 0.5 + (b[0] * cos(a) + b[1] * sin(a)) * 14.0;
      c.age = 0.0; c.life = (p.life - p.age) * mix(1.0, 1.4, rnd(&sd)); c.kind = 7.0; c.seed = rnd(&sd);
      parts[child()] = c;
    }
    p.life = 0.0;
  }
  parts[i] = p;
}
`,
  Pzt =
    dV +
    `
@group(1) @binding(1) var<storage, read> parts: array<Part>;
@group(0) @binding(4) var tDepth: DEPTH_T;
struct VO {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
  @location(1) wpos: vec3f,
  @location(2) @interpolate(flat) col: vec4f,
  @location(3) @interpolate(flat) info: vec4f,   // kind, age / life, seed, energy (sub-pixel streaks keep their energy)
  @location(4) @interpolate(flat) aux: vec4f,    // temperature, size, _, _
};
fn corner(vi: u32) -> vec2f {
  let c = array<vec2f, 6>(vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(-1.0, 1.0));
  return c[vi];
}
@vertex fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VO {
  var o: VO;
  let p = parts[ii];
  o.pos = vec4f(2.0, 2.0, 2.0, 1.0);
  if (p.life <= 0.0) { return o; }
  let kind = u32(p.kind + 0.5); let a01 = p.age / p.life;
  let c = corner(vi);
  let right = vec3f(F.view[0][0], F.view[1][0], F.view[2][0]); let up = vec3f(F.view[0][1], F.view[1][1], F.view[2][1]);
  var size = p.size; var energy = 1.0;
  if (kind == 3u) { size *= 1.0 + S.rnd.w * p.age; }
  var wp = p.pos;
  let streak = kind == 0u || kind == 1u || kind == 4u || kind == 5u || kind >= 7u;
  if (streak) {
    // motion blur: a quad from where the particle was one shutter ago to where it is, at least ~1.5 px wide
    var sh = S.rnd.x; if (kind == 5u) { sh = 0.018; } if (kind == 1u) { sh *= 0.5; }
    let tail = p.pos - p.vel * sh;
    let vd = max(-(F.view * vec4f(p.pos, 1.0)).z, 0.05);
    let pxm = 0.5 * G.screen.y / (F.clusterP.z * vd);   // pixels per metre at this depth
    let wpx = size * pxm; let wcl = max(wpx, 1.5);
    energy = wpx / wcl; size = wcl / pxm;
    let ax = p.pos - tail; let lax = length(ax);
    let cp = F.camPos.xyz;
    let vdir = normalize(p.pos - cp);
    var side = cross(ax, vdir); if (length(side) < 1e-6) { side = right; } side = normalize(side);
    var along = normalize(ax + vec3f(1e-7)); if (lax < 1e-5) { along = up; }
    let half = size * 0.5;
    let t = c.y * 0.5 + 0.5;   // 0 at the tail, 1 at the head
    wp = mix(tail - along * half, p.pos + along * half, t) + side * c.x * half;
    o.uv = vec2f(c.x, t * (lax + size) / max(size, 1e-6));   // across in [-1, 1], along in widths from the tail
    o.aux = vec4f(p.temp, (lax + size) / max(size, 1e-6), 0.0, 0.0);
  } else {
    var cc = c;
    if (kind == 3u) { let a = p.seed * 6.2831853 + p.age * (p.seed - 0.5) * 0.6; cc = vec2f(c.x * cos(a) - c.y * sin(a), c.x * sin(a) + c.y * cos(a)); }
    wp = p.pos + (right * cc.x + up * cc.y) * size;
    o.uv = c; o.aux = vec4f(p.temp, size, 0.0, 0.0);
  }
  o.pos = F.viewProj * vec4f(wp, 1.0);
  o.wpos = wp; o.col = p.col;
  o.info = vec4f(f32(kind), a01, p.seed, energy);
  return o;
}
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let ip = vec2i(i.pos.xy);
  let sd = depthDist(i.pos.xy, textureLoad(tDepth, ip, 0));
  let pd = length(i.wpos - F.camPos.xyz);
  if (pd > sd) { discard; }
  let soft = sat((sd - pd) / S.rnd.z);
  let kind = u32(i.info.x + 0.5); let a01 = i.info.y; let seed = i.info.z;
  var L = vec3f(0.0); var a = 0.0;
  if (kind <= 1u || kind >= 7u) {
    // hot spark: a bright core across the streak, fading towards the tail; blackbody by temperature
    let across = exp(-i.uv.x * i.uv.x * 3.0);
    let len = i.aux.y; let t = i.uv.y / len;
    let ends = sat(i.uv.y * 2.0) * sat((len - i.uv.y) * 2.0 + 0.3);
    // colour: blackbody by temperature, or a metal-salt colour (fireworks) at the blackbody's brightness
    let bb = blackbody(i.aux.x, S.flow.w);
    let mx = max(i.col.r, max(i.col.g, i.col.b)); let mn = min(i.col.r, min(i.col.g, i.col.b));
    let sat_ = select(0.0, 1.0 - mn / mx, mx > 0.0);
    var e = mix(bb * i.col.rgb, i.col.rgb / max(lum(i.col.rgb), 1e-3) * lum(bb), sat_) * S.rnd.y * abs(i.col.a) * mix(0.35, 1.0, t);
    if (kind == 1u) { e *= 0.75 + 0.25 * sin(G.time.x * 23.0 + seed * 61.0); }
    if (i.col.a < 0.0) {   // glitter: strobing stars
      e *= step(0.62, fract(sin(seed * 91.37 + floor(G.time.x * 22.0 + seed * 5.0) * 7.13) * 43758.547)) * 2.6;
    }
    L = e * across * ends * i.info.w;
  } else if (kind == 2u) {
    let r2 = dot(i.uv, i.uv); if (r2 > 1.0) { discard; }
    let fade = sat(a01 * 8.0) * (1.0 - a01);
    L = i.col.rgb * i.col.a * S.rnd.y * (exp(-r2 * 5.0) + 0.15 * exp(-r2 * 1.2)) * fade;
  } else if (kind == 3u) {
    // smoke puff: noise-eroded disc, lit as a soft sphere (sun wrap + sky / ground) and by its own emissive tint
    let r = length(i.uv); if (r > 1.0) { discard; }
    let q = vec3f(i.uv * 0.23 + vec2f(seed * 7.1, seed * 3.3), a01 * 0.15 + seed);
    let n = textureSampleLevel(tDetail, sRep, q, 0.0);
    let body = sat(1.0 - r * r);
    let den = sat(body * 1.6 - (1.0 - (n.r * 0.6 + n.g * 0.3 + n.b * 0.1)) * 1.1);
    let fade = sat(a01 * 6.0) * pow(1.0 - a01, 1.3);
    a = den * i.col.a * fade * soft;
    let right = vec3f(F.view[0][0], F.view[1][0], F.view[2][0]); let up = vec3f(F.view[0][1], F.view[1][1], F.view[2][1]);
    let back = normalize(F.camPos.xyz - i.wpos);
    let nrm = normalize(right * i.uv.x + up * i.uv.y + back * sqrt(max(1.0 - r * r, 0.05)));
    let sd2 = VLt.sunDir.xyz;
    let wrap = sat(dot(nrm, sd2) * 0.6 + 0.4);
    let fwd = hg(dot(-back, sd2), 0.45) * 4.0 * PI;
    var light = VLt.sunIrr.rgb / PI * wrap * mix(1.0, fwd, 0.35) * (0.55 + 0.45 * den) + ambientDir(nrm);
    for (var k = 0u; k < S.cap2.z; k++) {   // bursts light the smoke they leave (the classic coloured glow of a show)
      let dl = S.flashP[k].xyz - i.wpos; let d2 = max(dot(dl, dl), 1.0);
      light += S.flashC[k].rgb * S.flashP[k].w / d2 * (0.35 + 0.65 * sat(dot(nrm, dl * inverseSqrt(d2)) * 0.5 + 0.5)) * (0.6 + 0.4 * den);
    }
    L = light * i.col.rgb * S.flow.z * a;
    L += blackbody(i.aux.x, S.flow.w) * max(1.0 - a01 * 4.0, 0.0) * S.rnd.y * 0.4 * a;   // a hot puff (fireworks) glows at first
  } else if (kind == 4u || kind == 5u) {
    // water: a thin bright streak (sky reflection + a sun glint), mostly transparent
    let across = exp(-i.uv.x * i.uv.x * 2.5);
    let len = i.aux.y;
    let ends = sat(i.uv.y * 1.5) * sat((len - i.uv.y) * 1.5);
    let k = select(0.55, 0.16, kind == 5u);
    a = across * ends * k * soft * i.col.a * i.info.w;
    let refl = ambientDir(vec3f(0.0, 1.0, 0.0)) * 0.9 + VLt.sunIrr.rgb * 0.012;
    L = refl * i.col.rgb * a;
  } else {
    let r2 = dot(i.uv, i.uv); if (r2 > 1.0) { discard; }
    a = sat(1.0 - r2) * sat(1.0 - r2) * i.col.a * soft * sat((1.0 - a01) * 8.0);
    L = (VLt.sunIrr.rgb / PI * 0.8 + ambientDir(vec3f(0.0, 1.0, 0.0)) * 1.1) * i.col.rgb * a;
  }
  return vec4f(L, a);
}
`;
