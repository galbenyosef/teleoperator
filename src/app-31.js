// app 31 — bag
// Lines 47807-48155 of readable/app.pretty.js (statement-aligned).
var pV = `
struct AOU {
  p: vec4f,        // world radius (m), intensity (exponent), full W, full H
  q: vec4f,        // frame index, max radius (px), falloff start (fraction of radius), thickness heuristic
  r: vec4f,        // sf-drive (round 29): the camera's near, far, projection x and y scale (P00, P11)
  s: vec4f,        // the projection's x / y offset less this frame's TAA jitter (ndc), _, _
};
@group(0) @binding(0) var<uniform> F: Frame;
@group(1) @binding(0) var<uniform> A: AOU;
@group(1) @binding(1) var tDepth: texture_depth_2d;
@group(1) @binding(2) var oAO: texture_storage_2d<rgba16float, write>;
@group(1) @binding(3) var tAOin: texture_2d<f32>;
@group(1) @binding(4) var tPrev: texture_2d<f32>;   // last frame's linear colour (rgb), view depth (a)
fn prevRadiance(w: vec3f) -> vec3f {   // world point -> last frame's colour there (zero off screen / on the background)
  let c = F.prevViewProj * vec4f(w, 1.0);
  if (c.w <= 1e-4) { return vec3f(0.0); }
  let uv = vec2f(c.x / c.w * 0.5 + 0.5, 0.5 - c.y / c.w * 0.5);
  if (any(uv < vec2f(0.0)) || any(uv > vec2f(1.0))) { return vec3f(0.0); }
  let s = textureLoad(tPrev, vec2i(uv * vec2f(textureDimensions(tPrev))), 0);
  let r = s.rgb; let ok = all(r == r) && all(abs(r) < vec3f(1e4)) && s.a <= 30000.0;   // sf-drive: NaN / inf never feed back
  return select(vec3f(0.0), clamp(r, vec3f(0.0), vec3f(32.0)), ok);
}
fn arc(h: f32, n: f32, cosN: f32) -> f32 { return 0.25 * (cosN + 2.0 * h * sin(n) - cos(2.0 * h - n)); }
const PI_ = 3.14159265358979;
// sf-drive (round 29): view-space positions straight from the depth and the projection. Through invViewProj the world
// point carried the city's coordinates (5-7 km from the origin in the west) and came back to view space by a subtraction
// in f32: centimetre steps on grazing asphalt that GTAO read as a herringbone of occluders (Arguello Blvd, the Sunset)
fn viewPos(px: vec2f, z: f32) -> vec3f {   // main-target pixel (y down) + depth -> view (camera looks down -z)
  let n = A.r.x; let f = A.r.y;
  let d = n * f / max(f * (1.0 - z) + z * n, 1e-12);   // (1 - z) exact for depth near 1
  let ndc = vec2f(px.x / A.p.z * 2.0 - 1.0, 1.0 - px.y / A.p.w * 2.0);
  return vec3f((ndc + A.s.xy) * d / A.r.zw, -d);
}
fn worldOf(v: vec3f) -> vec3f {   // view -> world (only the bounce's reprojection needs it)
  let R = mat3x3f(F.view[0].xyz, F.view[1].xyz, F.view[2].xyz);
  return F.camPos.xyz + transpose(R) * v;
}
fn depthAt(q: vec2i) -> f32 { return textureLoad(tDepth, clamp(q, vec2i(0), vec2i(A.p.zw) - 1), 0); }
@compute @workgroup_size(8, 8) fn gtao(@builtin(global_invocation_id) g: vec3u) {
  let hd = vec2u(textureDimensions(oAO)); if (any(g.xy >= hd)) { return; }
  let fp = vec2i(g.xy) * 2;                 // the full-resolution pixel this texel stands for
  let z = depthAt(fp);
  if (z >= 1.0) { textureStore(oAO, g.xy, vec4f(0.0, 0.0, 0.0, 1.0)); return; }
  let px = vec2f(fp) + 0.5;
  let P = viewPos(px, z);
  // normal from depth: the flatter neighbour on each axis (no bleeding across silhouettes)
  let pl = viewPos(px - vec2f(1.0, 0.0), depthAt(fp - vec2i(1, 0))); let pr = viewPos(px + vec2f(1.0, 0.0), depthAt(fp + vec2i(1, 0)));
  let pu = viewPos(px - vec2f(0.0, 1.0), depthAt(fp - vec2i(0, 1))); let pd = viewPos(px + vec2f(0.0, 1.0), depthAt(fp + vec2i(0, 1)));
  let dx = select(P - pl, pr - P, abs(pr.z - P.z) < abs(P.z - pl.z));
  let dy = select(P - pu, pd - P, abs(pd.z - P.z) < abs(P.z - pu.z));
  var N = normalize(cross(dy, dx));
  let V = normalize(-P);
  if (dot(N, V) < 0.0) { N = -N; }
  // radius on screen
  let pxPerM = 0.5 * A.p.w / (F.clusterP.z * max(-P.z, 1e-3));
  let rPx = min(A.p.x * pxPerM, A.q.y);
  if (rPx < 1.5) { textureStore(oAO, g.xy, vec4f(0.0, 0.0, 0.0, 1.0)); return; }
  // per-pixel rotation and step jitter: a 4x4 interleaved pattern the blur averages away
  let ij = vec2u(g.xy) % vec2u(4u);
  let noise = f32((ij.x * 4u + ij.y * 11u + u32(A.q.x) * 5u) % 16u) / 16.0;
  let jit = fract(f32(ij.x * 7u + ij.y * 3u) * 0.3125 + 0.13);
  let STEPS = 6; let SLICES = 2;   // two slices a pixel: the 4x4 interleave and TAA integrate 32 directions
  var vis = 0.0; var gi = vec3f(0.0);
  for (var s = 0; s < SLICES; s++) {
    let phi = (f32(s) + noise) * PI_ / f32(SLICES);
    let dir = vec2f(cos(phi), sin(phi));
    let dirV = vec3f(dir.x, -dir.y, 0.0);                   // screen y down -> view y up
    let ortho = dirV - dot(dirV, V) * V;
    let axis = normalize(cross(ortho, V));
    let pN = N - axis * dot(N, axis);
    let pLen = length(pN);
    let sgn = sign(dot(ortho, pN));
    let cosN = clamp(dot(pN, V) / max(pLen, 1e-4), -1.0, 1.0);
    let n = sgn * acos(cosN);
    var hc = vec2f(-1.0, -1.0);
    for (var side = 0; side < 2; side++) {
      let sd = select(-1.0, 1.0, side == 0);
      var best = -1.0;
      // the arc still open on this side, as a horizon angle from the view vector (starts at the normal's limit)
      var hPrev = select(n - PI_ * 0.5, n + PI_ * 0.5, side == 0);
      for (var k = 0; k < STEPS; k++) {
        let t = (f32(k) + jit) / f32(STEPS);
        let off = dir * sd * max(t * t * rPx, 1.0 + f32(k));
        let qi = vec2i(px + off);   // the texel's centre: its depth belongs there (a fractional position lifts floors off their plane)
        let S = viewPos(vec2f(qi) + 0.5, depthAt(qi)); let Sw = worldOf(S);
        let dv = S - P; let dl = length(dv);
        let ch = dot(dv / max(dl, 1e-5), V);
        let w = clamp((A.p.x - dl) / (A.p.x * (1.0 - A.q.z)), 0.0, 1.0);   // fade out beyond the radius
        let cand = mix(-1.0, ch, w);
        if (cand > best && A.q.w > 0.0) {   // a new horizon: the arc it closes sees this sample's surface
          let hs = select(n + max(-acos(cand) - n, -PI_ * 0.5), n + min(acos(cand) - n, PI_ * 0.5), side == 0);
          let da = abs(arc(hs, n, cosN) - arc(hPrev, n, cosN));
          let el = dot(dv / max(dl, 1e-5), N);   // how far the sample rises above this surface: none on a flat floor (depth noise)
          gi += prevRadiance(Sw) * da * pLen * w * smoothstep(0.08, 0.3, el);
          hPrev = hs;
        }
        best = max(best, cand);
      }
      if (side == 0) { hc.x = best; } else { hc.y = best; }
    }
    let h0 = n + max(-acos(hc.y) - n, -PI_ * 0.5);
    let h1 = n + min(acos(hc.x) - n, PI_ * 0.5);
    let a0 = cosN + 2.0 * h0 * sin(n) - cos(2.0 * h0 - n);
    let a1 = cosN + 2.0 * h1 * sin(n) - cos(2.0 * h1 - n);
    vis += pLen * 0.25 * (a0 + a1);
  }
  let ao = pow(clamp(vis / f32(SLICES), 0.0, 1.0), A.p.y);
  var go = gi / f32(SLICES) * A.q.w; var ao2 = ao;   // sf-drive: sky samples (depth 1) and acos edge cases can make NaN / inf
  if (any(go != go) || any(abs(go) > vec3f(1e4))) { go = vec3f(0.0); }
  if (ao2 != ao2) { ao2 = 1.0; }
  textureStore(oAO, g.xy, vec4f(go, ao2));
}
// depth-aware 4x4 box blur (the interleaved pattern's period), half resolution
@compute @workgroup_size(8, 8) fn blur(@builtin(global_invocation_id) g: vec3u) {
  let hd = vec2i(textureDimensions(oAO)); let c = vec2i(g.xy); if (any(c >= hd)) { return; }
  let zc = depthAt(c * 2);
  if (zc >= 1.0) { textureStore(oAO, c, vec4f(0.0, 0.0, 0.0, 1.0)); return; }
  let Pc = viewPos(vec2f(c * 2) + 0.5, zc);
  var s = vec4f(0.0); var ws = 0.0;
  for (var y = -1; y <= 2; y++) { for (var x = -1; x <= 2; x++) {
    let q = clamp(c + vec2i(x, y), vec2i(0), hd - 1);
    let a = textureLoad(tAOin, q, 0);
    let zq = depthAt(q * 2);
    let Pq = viewPos(vec2f(q * 2) + 0.5, zq);
    let w = exp(-abs(Pq.z - Pc.z) / max(0.02 * abs(Pc.z), 1e-3));
    s += a * w; ws += w;
  } }
  textureStore(oAO, c, s / max(ws, 1e-4));
}
`;
var Rn = {
    walk: 0,
    leap: 1,
    phone: 2,
    photo: 3,
    sit: 4,
    perform: 5,
    wave: 6,
    duck: 7,
    point: 8,
    talk: 9,
    cross: 10,
    cheer: 11,
    cower: 12,
    think: 13,
    knock: 14,
  },
  lp = {
    hair: [0, 7],
    hat: [3, 7],
    glasses: [6, 1],
    cloud: [7, 1],
    bag: [8, 3],
    top: [10, 3],
    bottom: [12, 3],
  },
  Lu = {
    hair: 1,
    hat: 2,
    glasses: 3,
    cloud: 4,
    bag: 5,
    top: 6,
    bottom: 7,
    prop: 8,
    stars: 9,
  },
  mV = `
fn voxOk(c: u32, opts: u32, pose: f32) -> bool {
  if (c == 0u) { return true; }
  let g = c >> 4u; let v = c & 15u;
  if (g == 8u) { return (pose > 1.5 && pose < 3.5); }   // the phone / camera in the hand: on the phone, taking a photo
  if (g == 9u) { return (pose > 13.5 && pose < 14.5); }   // (chars63) the dizzy stars: knocked
  var sh = 12u; var mk = 3u;
  if (g == 1u) { sh = 0u; mk = 7u; } else if (g == 2u) { sh = 3u; mk = 7u; } else if (g == 3u) { sh = 6u; mk = 1u; }
  else if (g == 4u) { sh = 7u; mk = 1u; } else if (g == 5u) { sh = 8u; mk = 3u; } else if (g == 6u) { sh = 10u; mk = 3u; }
  let x = (opts >> sh) & mk;
  return select(x == v, x != 0u, v == 15u);
}
// a pose's angles: the legs' swing (forward +), each arm's raise (forward +), abduction (out +), turn in (+); the head's
// turn (to its left +), nod (down +), tilt; the body's lean (forward +), roll, drop (m); the bounce (m)
struct VoxA { legL: f32, legR: f32, armL: vec3f, armR: vec3f, head: vec3f, body: vec3f, bob: f32 };
fn voxMix(a: VoxA, b: VoxA, w: f32) -> VoxA {
  var o: VoxA; o.legL = mix(a.legL, b.legL, w); o.legR = mix(a.legR, b.legR, w); o.armL = mix(a.armL, b.armL, w); o.armR = mix(a.armR, b.armR, w);
  o.head = mix(a.head, b.head, w); o.body = mix(a.body, b.body, w); o.bob = mix(a.bob, b.bob, w); return o;
}
fn voxBase(t: f32, ph: f32, spd: f32, sd: f32) -> VoxA {
  var a: VoxA;
  let walk = smoothstep(0.05, 0.7, spd); let run = smoothstep(2.6, 3.8, spd); let id = 1.0 - walk;
  let s = sin(ph); let c = cos(ph);
  let amp = 0.62 + 0.2 * run;
  a.legL = amp * s * walk; a.legR = -a.legL;
  let sw = (0.55 + 0.45 * run) * s * walk;
  let br = id * 0.04 * sin(t * 2.1 + sd * 31.0);   // (breathing: the arms a touch out and in)
  a.armL = vec3f(-sw + 0.5 * run, 0.07 + br, 0.0); a.armR = vec3f(sw + 0.5 * run, 0.07 + br, 0.0);
  // idle: a look about now and then (held, not a metronome), the weight from foot to foot
  let lk = sin(t * 0.31 + sd * 47.0) + 0.6 * sin(t * 0.83 + sd * 13.0); let look = sign(lk) * smoothstep(0.7, 1.15, abs(lk));
  a.head = vec3f(0.5 * look * id, -0.03 * walk + id * 0.05 * sin(t * 0.47 + sd * 9.0), -0.05 * s * walk + id * 0.04 * sin(t * 0.61 + sd * 5.0));
  a.body = vec3f(0.05 * walk + 0.2 * run, 0.075 * s * walk + id * 0.025 * sin(t * 0.7 + sd * 11.0), 0.0);
  a.bob = (0.07 * abs(c) - 0.025) * walk * (1.0 + 0.6 * run) + id * 0.004 * sin(t * 2.1 + sd * 31.0);
  return a;
}
fn voxPose(pose: f32, t: f32, sd: f32, k: f32, hip: f32, b: VoxA) -> VoxA {
  var a = b;   // (the upper body's poses keep the legs' gait: on the phone while walking)
  let q = t + sd * 20.0;
  if (pose < 1.5) {   // leaping aside: arms flung up, legs split, k the leap's progress
    let e = sin(3.14159 * clamp(k, 0.0, 1.0));
    a.armL = vec3f(2.6, 0.6, 0.0); a.armR = vec3f(2.4, 0.7, 0.0); a.legL = 0.75 * e; a.legR = -0.55 * e; a.body = vec3f(-0.15, 0.1, 0.0); a.head = vec3f(0.0, -0.25, 0.1);
  } else if (pose < 2.5) {   // on the phone: the right hand up in front, the head down to it
    a.armR = vec3f(1.2, 0.0, 0.42); a.armL = vec3f(0.25, 0.08, 0.1); a.head = vec3f(-0.1, 0.42, 0.0);
  } else if (pose < 3.5) {   // taking a photo: both hands up in front of the face
    a.armL = vec3f(1.5, 0.0, 0.5); a.armR = vec3f(1.5, 0.0, 0.5); a.head = vec3f(0.0, 0.05, 0.0); a.legL *= 0.4; a.legR *= 0.4;
  } else if (pose < 4.5) {   // seated: the legs out level, hands on the knees, the body dropped onto the seat (~0.46 m)
    a.legL = 1.5; a.legR = 1.5; a.armL = vec3f(0.55, 0.05, 0.05); a.armR = vec3f(0.55, 0.05, 0.05); a.body = vec3f(-0.05, b.body.y * 0.3, hip - 0.46); a.head = b.head;
  } else if (pose < 5.5) {   // a performer: arms up and out in turn, a bounce
    a.legL = 0.0; a.legR = 0.0; a.armL = vec3f(2.0 + 0.6 * sin(q * 3.1), 0.7, 0.0); a.armR = vec3f(2.0 + 0.6 * sin(q * 3.1 + 2.0), 0.7, 0.0); a.bob = 0.05 * abs(sin(q * 3.1)); a.head = vec3f(0.2 * sin(q * 1.3), -0.1, 0.1 * sin(q * 3.1));
  } else if (pose < 6.5) {   // waving / hailing a taxi: the right arm up, the hand waving
    a.armR = vec3f(2.75, 0.35 + 0.35 * sin(q * 9.0), 0.0); a.armL = vec3f(0.1, 0.1, 0.0); a.head = vec3f(b.head.x * 0.3, -0.12, 0.06); a.body = vec3f(-0.04, -0.05, 0.0); a.bob = 0.02 * abs(sin(q * 4.5));
  } else if (pose < 7.5) {   // ducking into a car (k: in)
    let e = clamp(k, 0.0, 1.0); a.body = vec3f(0.55 * e, 0.0, 0.12 * e); a.head = vec3f(0.0, 0.3 * e, 0.0); a.armL = vec3f(0.8 * e, 0.1, 0.0); a.armR = vec3f(0.9 * e, 0.1, 0.0); a.legL = 0.5 * e;
  } else if (pose < 8.5) {   // pointing at something
    a.armR = vec3f(1.6, 0.15, 0.0); a.armL = vec3f(0.15, 0.08, 0.0); a.head = vec3f(-0.15, -0.08, 0.0);
  } else if (pose < 9.5) {   // talking: the hands going
    a.armL = vec3f(0.5 + 0.45 * max(0.0, sin(q * 2.3)), 0.2, 0.25); a.armR = vec3f(0.45 + 0.5 * max(0.0, sin(q * 1.9 + 1.0)), 0.2, 0.25); a.head = vec3f(b.head.x * 0.5, 0.06 * sin(q * 3.0), 0.08 * sin(q * 0.9));
  } else if (pose < 10.5) {   // arms crossed
    a.armL = vec3f(1.2, -0.05, 0.85); a.armR = vec3f(1.05, -0.05, 0.85); a.head = b.head;
  } else if (pose < 11.5) {   // cheering (a drift, a jump): arms up in a V, hopping
    a.armL = vec3f(2.85, 0.55 + 0.2 * sin(q * 8.0), 0.0); a.armR = vec3f(2.85, 0.55 + 0.2 * sin(q * 8.0 + 1.0), 0.0); a.legL = 0.0; a.legR = 0.0; a.bob = 0.09 * abs(sin(q * 6.5)); a.head = vec3f(0.0, -0.18, 0.0);
  } else if (pose < 12.5) {   // cowering: hands up over the face, crouched
    a.armL = vec3f(2.3, 0.0, 0.55); a.armR = vec3f(2.3, 0.0, 0.55); a.body = vec3f(0.25, 0.04 * sin(q * 30.0), 0.06); a.head = vec3f(0.0, 0.25, 0.0); a.legL = 0.25; a.legR = -0.1;
  } else {   // thinking: a hand to the chin
    a.armR = vec3f(2.0, -0.1, 0.85); a.armL = vec3f(1.1, -0.05, 0.85); a.head = vec3f(0.12, -0.12, 0.14);
  }
  return a;
}
fn sfVox(p0: vec3f, j: vec4u, jw: vec4f, i0: vec4f, i1: vec4f, i2: vec4f) -> SfWalk {
  var o: SfWalk; o.p = p0; o.r = mat3x3f(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), vec3f(0.0, 0.0, 1.0));
  let opts = u32(max(i0.y, 0.0) + 0.5); let pose = floor(i2.w + 0.5); let w = clamp(i1.z, 0.0, 1.0);
  if (!voxOk(j.y, opts, pose) || !voxOk(j.z, opts, pose)) { o.p = jw.xyz; return o; }
  let t = F.sunC.w; let sd = f32(opts >> 14u) / 256.0;
  var a = voxBase(t, i0.w, i1.w, sd);
  if (pose > 0.5) { a = voxMix(a, voxPose(pose, t, sd, i2.y, jw.w, a), w); }
  if (abs(i1.x) > 1e-4) { a.head.x = i1.x; }   // looking at something (the car)
  let part = j.x; let pv = jw.xyz; var p = p0; var R = o.r;
  if (part == 1u || part == 2u) { let Rl = sfRx(-select(a.legR, a.legL, part == 1u)); p = pv + Rl * (p - pv); R = Rl; }
  else if (part == 3u || part == 4u) {
    let L = part == 3u; let A = select(a.armR, a.armL, L); let sg = select(-1.0, 1.0, L);
    let Ra = sfRy(-sg * A.z) * sfRx(-A.x) * sfRz(sg * A.y); p = pv + Ra * (p - pv); R = Ra;
  } else if (part == 5u) { let Rh = sfRy(a.head.x) * sfRx(a.head.y) * sfRz(a.head.z); p = pv + Rh * (p - pv); R = Rh; }
  if (part != 1u && part != 2u) { let hp = vec3f(0.0, jw.w, 0.0); let Rb = sfRx(a.body.x); p = hp + Rb * (p - hp); R = Rb * R; }
  let Rr = sfRz(a.body.y); p = Rr * p; R = Rr * R;
  o.p = p + vec3f(0.0, a.bob - a.body.z, 0.0); o.r = R; return o;
}
`;
var gV = `
struct HumA { thL: f32, thR: f32, knL: f32, knR: f32, armL: vec3f, armR: vec3f, elL: f32, elR: f32, head: vec3f, body: vec3f, tw: f32, bob: f32 };
fn humMix(a: HumA, b: HumA, w: f32) -> HumA {
  var o: HumA; o.thL = mix(a.thL, b.thL, w); o.thR = mix(a.thR, b.thR, w); o.knL = mix(a.knL, b.knL, w); o.knR = mix(a.knR, b.knR, w);
  o.armL = mix(a.armL, b.armL, w); o.armR = mix(a.armR, b.armR, w); o.elL = mix(a.elL, b.elL, w); o.elR = mix(a.elR, b.elR, w);
  o.head = mix(a.head, b.head, w); o.body = mix(a.body, b.body, w); o.tw = mix(a.tw, b.tw, w); o.bob = mix(a.bob, b.bob, w); return o;
}
fn humBase(t: f32, ph: f32, spd: f32, sd: f32) -> HumA {
  var a: HumA;
  let walk = smoothstep(0.05, 0.7, spd); let run = smoothstep(2.6, 3.8, spd); let id = 1.0 - walk;
  let sL = sin(ph); let sR = sin(ph + 3.14159);
  let amp = 0.4 + 0.25 * run;
  a.thL = amp * sL * walk; a.thR = amp * sR * walk;
  a.knL = walk * (0.06 + (0.85 + 0.6 * run) * pow(max(0.0, cos(ph + 0.35)), 2.0)) + id * 0.04;
  a.knR = walk * (0.06 + (0.85 + 0.6 * run) * pow(max(0.0, cos(ph + 3.14159 + 0.35)), 2.0)) + id * 0.04;
  let aw = (0.38 + 0.3 * run) * walk;
  let br = id * 0.025 * sin(t * 1.9 + sd * 31.0);
  a.armL = vec3f(-aw * sin(ph - 0.25) + 0.25 * run, 0.06 + br, 0.0); a.armR = vec3f(-aw * sin(ph + 3.14159 - 0.25) + 0.25 * run, 0.06 + br, 0.0);
  a.elL = 0.2 + walk * (0.12 + 0.3 * max(0.0, -sin(ph - 0.6))) + run * 1.0; a.elR = 0.2 + walk * (0.12 + 0.3 * max(0.0, -sin(ph + 3.14159 - 0.6))) + run * 1.0;
  let lk = sin(t * 0.31 + sd * 47.0) + 0.6 * sin(t * 0.83 + sd * 13.0); let look = sign(lk) * smoothstep(0.7, 1.15, abs(lk));
  a.head = vec3f(0.45 * look * id - 0.05 * sL * walk, -0.02 * walk + id * 0.04 * sin(t * 0.47 + sd * 9.0), id * 0.03 * sin(t * 0.61 + sd * 5.0));
  a.body = vec3f(0.03 * walk + 0.15 * run, 0.02 * cos(ph) * walk + id * 0.018 * sin(t * 0.7 + sd * 11.0), 0.0);
  a.tw = 0.12 * sL * walk;
  a.bob = (0.022 * cos(2.0 * ph) - 0.012) * walk * (1.0 + 1.2 * run) + id * 0.003 * sin(t * 1.9 + sd * 31.0);
  return a;
}
fn humPose(pose: f32, t: f32, sd: f32, k: f32, hip: f32, b: HumA) -> HumA {
  var a = b; let q = t + sd * 20.0;
  if (pose < 1.5) {   // stepping aside (chars63: a quick sidestep, not a leap): the arms up a little, a knee bent, a lean away
    let e = sin(3.14159 * clamp(k, 0.0, 1.0));
    a.armL = vec3f(0.5, 0.45, 0.0); a.armR = vec3f(0.5, 0.45, 0.0); a.elL = 0.9; a.elR = 0.9; a.thL = 0.3 * e; a.knL = 0.5 * e; a.thR = -0.1 * e; a.knR = 0.2 * e; a.body = vec3f(-0.05, 0.08 * e, 0.0); a.head = vec3f(0.3, -0.05, 0.0); a.tw = 0.0;
  } else if (pose < 2.5) {   // on the phone: the right forearm up, the head down to it
    a.armR = vec3f(0.35, 0.02, 0.3); a.elR = 1.8; a.armL = vec3f(0.1, 0.06, 0.05); a.elL = 0.35; a.head = vec3f(-0.05, 0.38, 0.0);
  } else if (pose < 3.5) {   // a photo: both hands up in front of the face
    a.armL = vec3f(1.0, 0.0, 0.4); a.armR = vec3f(1.0, 0.0, 0.4); a.elL = 1.2; a.elR = 1.2; a.head = vec3f(0.0, 0.03, 0.0); a.thL *= 0.4; a.thR *= 0.4;
  } else if (pose < 4.5) {   // seated: thighs level, shins down, hands on the thighs
    a.thL = 1.45; a.thR = 1.45; a.knL = 1.45; a.knR = 1.45; a.armL = vec3f(0.45, 0.05, 0.0); a.armR = vec3f(0.45, 0.05, 0.0); a.elL = 0.9; a.elR = 0.9; a.body = vec3f(-0.03, b.body.y * 0.3, hip - 0.47); a.tw = 0.0; a.bob = 0.0;
  } else if (pose < 5.5) {   // a performer
    a.thL = 0.0; a.thR = 0.0; a.knL = 0.05; a.knR = 0.05; a.armL = vec3f(2.0 + 0.6 * sin(q * 3.1), 0.7, 0.0); a.armR = vec3f(2.0 + 0.6 * sin(q * 3.1 + 2.0), 0.7, 0.0); a.elL = 0.3; a.elR = 0.3; a.bob = 0.03 * abs(sin(q * 3.1)); a.head = vec3f(0.2 * sin(q * 1.3), -0.1, 0.08 * sin(q * 3.1));
  } else if (pose < 6.5) {   // waving / hailing: the right arm up, the forearm waving
    a.armR = vec3f(2.5, 0.35, 0.0); a.elR = 0.45 + 0.4 * sin(q * 8.0); a.armL = vec3f(0.05, 0.08, 0.0); a.elL = 0.25; a.head = vec3f(b.head.x * 0.3, -0.1, 0.05); a.body = vec3f(-0.03, -0.04, 0.0);
  } else if (pose < 7.5) {   // ducking into a car
    let e = clamp(k, 0.0, 1.0); a.body = vec3f(0.6 * e, 0.0, 0.1 * e); a.head = vec3f(0.0, 0.3 * e, 0.0); a.armL = vec3f(0.8 * e, 0.1, 0.0); a.armR = vec3f(0.9 * e, 0.1, 0.0); a.elL = 0.5; a.elR = 0.5; a.thL = 0.6 * e; a.knL = 0.9 * e; a.knR = 0.4 * e;
  } else if (pose < 8.5) {   // pointing
    a.armR = vec3f(1.5, 0.15, 0.0); a.elR = 0.08; a.armL = vec3f(0.1, 0.06, 0.0); a.head = vec3f(-0.12, -0.08, 0.0);
  } else if (pose < 9.5) {   // talking: the hands going
    a.armL = vec3f(0.3 + 0.3 * max(0.0, sin(q * 2.3)), 0.12, 0.2); a.armR = vec3f(0.3 + 0.35 * max(0.0, sin(q * 1.9 + 1.0)), 0.12, 0.2); a.elL = 1.2 + 0.3 * sin(q * 2.3); a.elR = 1.1 + 0.3 * sin(q * 1.9 + 1.0); a.head = vec3f(b.head.x * 0.5, 0.05 * sin(q * 3.0), 0.07 * sin(q * 0.9));
  } else if (pose < 10.5) {   // arms crossed
    a.armL = vec3f(0.3, 0.12, 0.55); a.armR = vec3f(0.3, 0.12, 0.55); a.elL = 1.75; a.elR = 1.6;
  } else if (pose < 11.5) {   // cheering
    a.thL = 0.0; a.thR = 0.0; a.armL = vec3f(2.75, 0.5 + 0.15 * sin(q * 8.0), 0.0); a.armR = vec3f(2.75, 0.5 + 0.15 * sin(q * 8.0 + 1.0), 0.0); a.elL = 0.25; a.elR = 0.25; a.bob = 0.05 * abs(sin(q * 6.5)); a.knL = 0.1 + 0.2 * abs(sin(q * 6.5)); a.knR = a.knL; a.head = vec3f(0.0, -0.15, 0.0);
  } else if (pose < 12.5) {   // cowering
    a.armL = vec3f(1.5, 0.0, 0.45); a.armR = vec3f(1.5, 0.0, 0.45); a.elL = 1.9; a.elR = 1.9; a.body = vec3f(0.3, 0.03 * sin(q * 30.0), 0.1); a.head = vec3f(0.0, 0.3, 0.0); a.thL = 0.5; a.knL = 0.9; a.thR = 0.3; a.knR = 0.7; a.tw = 0.0;
  } else if (pose > 13.5) {   // (chars63) knocked off a car: limbs flopping (the tumble itself: sfHum, by k)
    a.armL = vec3f(2.1 + 0.5 * sin(q * 9.0), 0.9, 0.0); a.armR = vec3f(1.9 + 0.5 * sin(q * 9.0 + 1.3), 0.9, 0.0); a.elL = 0.5 + 0.3 * sin(q * 7.0); a.elR = 0.6;
    a.thL = 0.9; a.knL = 1.1; a.thR = 0.35; a.knR = 0.6 + 0.3 * sin(q * 8.0); a.head = vec3f(0.3 * sin(q * 4.0), -0.15, 0.2 * sin(q * 6.0)); a.tw = 0.0; a.bob = 0.0; a.body = vec3f(0.0);
  } else {   // thinking: a hand to the chin
    a.armR = vec3f(0.75, -0.05, 0.4); a.elR = 2.2; a.armL = vec3f(0.35, 0.05, 0.6); a.elL = 1.6; a.head = vec3f(0.1, -0.1, 0.1);
  }
  return a;
}
fn sfHum(p0: vec3f, j: vec4u, jw: vec4f, i0: vec4f, i1: vec4f, i2: vec4f) -> SfWalk {
  var o: SfWalk; o.p = p0; o.r = mat3x3f(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), vec3f(0.0, 0.0, 1.0));
  let opts = u32(max(i0.y, 0.0) + 0.5); let pose = floor(i2.w + 0.5); let w = clamp(i1.z, 0.0, 1.0);
  if (!voxOk(j.y, opts, pose) || !voxOk(j.z, opts, pose)) { o.p = jw.xyz; return o; }
  let t = F.sunC.w; let sd = f32(opts >> 14u) / 256.0;
  var a = humBase(t, i0.w, i1.w, sd);
  if (pose > 0.5) { a = humMix(a, humPose(pose, t, sd, i2.y, jw.w, a), w); }
  if (abs(i1.x) > 1e-4) { a.head.x = i1.x; }
  let part = j.x; let pv = jw.xyz; let wq = f32(j.w % 101u) / 100.0; let L = f32(j.w / 101u) / 100.0;
  var p = p0; var R = o.r;
  if (part == 1u || part == 2u) {
    let lf = part == 1u; let kp = pv - vec3f(0.0, L, 0.0);
    let Rk = sfRx(select(a.knR, a.knL, lf)); let p1 = mix(p, kp + Rk * (p - kp), wq);
    let Rh = sfRx(-select(a.thR, a.thL, lf)); p = pv + Rh * (p1 - pv); R = Rh; if (wq > 0.5) { R = Rh * Rk; }
    let Rp = sfRy(-0.4 * a.tw); p = Rp * p; R = Rp * R;   // (the pelvis turns a little against the shoulders)
  } else if (part == 3u || part == 4u) {
    let lf = part == 3u; let A = select(a.armR, a.armL, lf); let sg = select(-1.0, 1.0, lf); let ep = pv - vec3f(0.0, L, 0.0);
    let Re = sfRx(-select(a.elR, a.elL, lf)); let p1 = mix(p, ep + Re * (p - ep), wq);
    let Ra = sfRy(-sg * A.z) * sfRx(-A.x) * sfRz(sg * A.y); p = pv + Ra * (p1 - pv); R = Ra; if (wq > 0.5) { R = Ra * Re; }
  } else if (part == 5u) {
    if ((j.y >> 4u) == 9u) { let Rs = sfRy(t * 4.5); p = pv + Rs * (p - pv); }   // (the dizzy stars circling)
    let Rh = sfRy(a.head.x) * sfRx(a.head.y) * sfRz(a.head.z); p = pv + Rh * (p - pv); R = Rh; }
  // the spine's twist: the chest, arms and head with the shoulders; the pelvis a little the other way
  if (part == 0u) { let Rt = sfRy(a.tw * mix(-0.4, 1.0, wq)); p = Rt * p; R = Rt * R; }
  else if (part >= 3u) { let Rt = sfRy(a.tw * select(1.0, 0.4, part == 5u)); p = Rt * p; R = Rt * R; }
  if (part != 1u && part != 2u) { let hp = vec3f(0.0, jw.w, 0.0); let Rb = sfRx(a.body.x * select(wq, 1.0, part != 0u)); p = hp + Rb * (p - hp); R = Rb * R; }
  let Rr = sfRz(a.body.y); p = Rr * p; R = Rr * R;
  if (pose > 13.5 && pose < 14.5) {   // (chars63) the tumble: the whole figure turned backward by k (rad) about its middle, lowered as it lies
    let kk = i2.y * w; let cm = vec3f(0.0, jw.w * 1.15, 0.0); let Rt = sfRx(-kk); p = cm + Rt * (p - cm); R = Rt * R;
    p.y -= (cm.y - 0.15) * smoothstep(0.0, 1.0, abs(sin(kk)));
  }
  o.p = p + vec3f(0.0, a.bob - a.body.z, 0.0); o.r = R; return o;
}
`;
