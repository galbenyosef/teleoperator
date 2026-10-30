// app 93 — ept
// Lines 76371-77287 of readable/app.pretty.js (statement-aligned).
var Ept = On("local"),
  o0 = `
fn sfH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn sfH3(p: vec3f) -> f32 { return fract(sin(dot(p, vec3f(127.1, 311.7, 74.7))) * 43758.5453); }
fn sfN(p: vec2f) -> f32 { let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(sfH(i), sfH(i + vec2f(1.0, 0.0)), u.x), mix(sfH(i + vec2f(0.0, 1.0)), sfH(i + vec2f(1.0, 1.0)), u.x), u.y); }
// anti-aliased band of width w centred on c (aa: the pixel's footprint along x): the band's coverage of the footprint (a
// box filter), so a line thinner than a pixel fades to its share instead of flickering at half strength
fn sfB(x: f32, c: f32, w: f32, aa: f32) -> f32 { return clamp((min(c + 0.5 * w, x + 0.5 * aa) - max(c - 0.5 * w, x - 0.5 * aa)) / aa, 0.0, 1.0); }
fn sfR(x: f32, a: f32, b: f32, aa: f32) -> f32 { return clamp((min(b, x + 0.5 * aa) - max(a, x - 0.5 * aa)) / aa, 0.0, 1.0); }
// a periodic band [a, b] (0 <= a < b <= p) repeated every p, box-filtered over the footprint aa (exact: the integral of the
// square wave), so stripes, joints and window grids smaller than a pixel settle to their duty instead of shimmering
fn sfPI(t: f32, p: f32, a: f32, b: f32) -> f32 { let k = floor(t / p); return k * (b - a) + clamp(t - k * p - a, 0.0, b - a); }
fn sfPer(x: f32, p: f32, a: f32, b: f32, aa: f32) -> f32 {
  let w = max(aa, 1e-4); return clamp((sfPI(x + 0.5 * w, p, a, b) - sfPI(x - 0.5 * w, p, a, b)) / w, 0.0, 1.0); }
// fine value noise that fades to its mean once its cells shrink under ~2 pixels (fw: the footprint in the noise's units)
fn sfNf(p: vec2f, fw: f32) -> f32 { return mix(sfN(p), 0.5, smoothstep(0.35, 0.9, fw)); }
// the pixel's footprint on a surface in metres (the larger axis: grazing views count their long side)
fn sfFoot(wp: vec3f) -> f32 { return max(length(dpdx(wp)), length(dpdy(wp))); }
`,
  xq =
    o0 +
    `
struct SfDec { c: vec4f, n: vec2f };
// one decal of the atlas (matDetail: 4 x 2 cells of 512, the image in the central 500; matLight: its normals). p: metres
// from the decal's centre in the road's (u, v); sz: its size; rot: quarter turns. Gradients passed in: any control flow.
fn sfDecal(p: vec2f, sz: vec2f, cell: f32, rot: f32, gx: vec2f, gy: vec2f) -> SfDec {
  var m = mat2x2f(1.0, 0.0, 0.0, 1.0);
  if (rot > 2.5) { m = mat2x2f(0.0, -1.0, 1.0, 0.0); } else if (rot > 1.5) { m = mat2x2f(-1.0, 0.0, 0.0, -1.0); } else if (rot > 0.5) { m = mat2x2f(0.0, 1.0, -1.0, 0.0); }
  let q = m * (p / sz);
  if (abs(q.x) > 0.5 || abs(q.y) > 0.5) { return SfDec(vec4f(0.0), vec2f(0.0)); }
  let cx = cell - 4.0 * floor(cell / 4.0); let cy = floor(cell / 4.0);
  let k = 500.0 / 512.0;
  let a = vec2f((cx + 0.5 + q.x * k) / 4.0, (cy + 0.5 + q.y * k) / 2.0);
  let s = vec2f(0.25, 0.5) * k;
  let dx = (m * (gx / sz)) * s; let dy = (m * (gy / sz)) * s;
  let c = textureSampleGrad(matDetail, matSamp, a, dx, dy);
  let nn = textureSampleGrad(matLight, matSamp, a, dx, dy).xy * 2.0 - 1.0;
  return SfDec(c, transpose(m) * nn);
}
// distance-like measure to the nearest Voronoi edge (cells of 1): d2 - d1
fn sfCell(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p);
  var d1 = 8.0; var d2 = 8.0;
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let g = vec2f(f32(x), f32(y)); let o = vec2f(sfH(i + g), sfH(i + g + vec2f(17.3, 5.1)));
      let d = length(g + o - f);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
  }
  return d2 - d1;
}
// the bike stencil (a cyclist in side view laid across the lane, the head toward the traffic's way, stretched 2x along it so
// it reads at a low angle), with an arrow ahead (arrow) or the sharrow's two chevrons; p: (across, forward) metres
fn sfBikeSym(p: vec2f, aa: f32, arrow: bool) -> f32 {
  let q = vec2f(p.x, p.y / 2.0);
  var d = min(abs(length(q - vec2f(-0.4, -0.35)) - 0.24), abs(length(q - vec2f(0.4, -0.35)) - 0.24));
  d = min(d, sfSegD(q, vec2f(-0.4, -0.35), vec2f(-0.02, -0.33)));
  d = min(d, sfSegD(q, vec2f(-0.02, -0.33), vec2f(-0.15, 0.02)));
  d = min(d, sfSegD(q, vec2f(-0.15, 0.02), vec2f(-0.4, -0.35)));
  d = min(d, sfSegD(q, vec2f(-0.15, 0.02), vec2f(0.28, 0.04)));
  d = min(d, sfSegD(q, vec2f(0.28, 0.04), vec2f(-0.02, -0.33)));
  d = min(d, sfSegD(q, vec2f(0.28, 0.04), vec2f(0.4, -0.35)));
  d = min(d, sfSegD(q, vec2f(-0.12, 0.08), vec2f(0.08, 0.42)));
  d = min(d, sfSegD(q, vec2f(0.08, 0.42), vec2f(0.28, 0.1)));
  d = min(d, length(q - vec2f(0.12, 0.6)) - 0.07);
  var s = 1.0 - smoothstep(0.035 - aa, 0.035 + aa, d);
  if (arrow) {
    let a = sfSegD(p, vec2f(0.0, 1.4), vec2f(0.0, 2.6)) - 0.07;
    let t = p.y - 2.6; let tri = max(abs(p.x) - 0.3 * (1.0 - t / 0.9), max(-t, t - 0.9));
    s = max(s, 1.0 - smoothstep(-aa, aa, min(a, tri)));
  } else {
    for (var k = 0; k < 2; k++) { let y0 = 1.5 + f32(k) * 0.9; let e = min(sfSegD(p, vec2f(-0.45, y0), vec2f(0.0, y0 + 0.55)), sfSegD(p, vec2f(0.45, y0), vec2f(0.0, y0 + 0.55))) - 0.07; s = max(s, 1.0 - smoothstep(-aa, aa, e)); }
  }
  return s;
}
fn sfRect(p: vec2f, c: vec2f, h: vec2f, aa: vec2f) -> f32 { let d = abs(p - c) - h; return clamp(-max(d.x / aa.x, d.y / aa.y) + 0.5, 0.0, 1.0); }
// "BUS ONLY" in the transit lanes: block letters as strokes (segments in a unit letter, x across, y forward), B U S / O N L Y
const SF_GS = array<vec4f, 26>(
  vec4f(0.0, 0.0, 0.0, 1.0), vec4f(0.0, 1.0, 0.8, 1.0), vec4f(0.8, 1.0, 0.8, 0.5), vec4f(0.0, 0.5, 1.0, 0.5), vec4f(1.0, 0.5, 1.0, 0.0), vec4f(1.0, 0.0, 0.0, 0.0),
  vec4f(0.0, 0.0, 1.0, 0.0), vec4f(0.0, 1.0, 0.0, 0.0), vec4f(1.0, 0.0, 1.0, 1.0),
  vec4f(1.0, 1.0, 0.0, 1.0), vec4f(0.0, 1.0, 0.0, 0.5), vec4f(0.0, 0.5, 1.0, 0.5), vec4f(1.0, 0.5, 1.0, 0.0), vec4f(1.0, 0.0, 0.0, 0.0),
  vec4f(0.0, 0.0, 1.0, 0.0), vec4f(1.0, 0.0, 1.0, 1.0), vec4f(1.0, 1.0, 0.0, 1.0), vec4f(0.0, 1.0, 0.0, 0.0),
  vec4f(0.0, 0.0, 0.0, 1.0), vec4f(0.0, 1.0, 1.0, 0.0), vec4f(1.0, 0.0, 1.0, 1.0),
  vec4f(0.0, 1.0, 0.0, 0.0), vec4f(0.0, 0.0, 1.0, 0.0),
  vec4f(0.0, 1.0, 0.5, 0.5), vec4f(1.0, 1.0, 0.5, 0.5), vec4f(0.5, 0.5, 0.5, 0.0));
const SF_GI = array<vec2u, 7>(vec2u(0u, 6u), vec2u(6u, 3u), vec2u(9u, 5u), vec2u(14u, 4u), vec2u(18u, 3u), vec2u(21u, 2u), vec2u(23u, 3u));
fn sfSegD(p: vec2f, a: vec2f, b: vec2f) -> f32 { let pa = p - a; let ba = b - a; let h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0); return length(pa - ba * h); }
// q: metres from the legend's near centre (x to the driver's right, y forward); lw: the letters' width (height 4 x)
fn sfBusOnly(q: vec2f, lw: f32, aa: f32) -> f32 {
  let lh = lw * 4.0; let gap = lw * 0.45; let row = select(-1, select(1, 0, q.y < lh), q.y >= 0.0 && q.y < 2.0 * lh + 1.3);
  if (row < 0 || (row == 1 && q.y < lh + 1.3)) { return 0.0; }
  let n = select(4.0, 3.0, row == 0); let ww = n * lw + (n - 1.0) * gap;
  let x = q.x + 0.5 * ww; if (x < -0.1 || x > ww + 0.1) { return 0.0; }
  let k = clamp(floor(x / (lw + gap)), 0.0, n - 1.0);
  let lp = vec2f(x - k * (lw + gap), q.y - select(lh + 1.3, 0.0, row == 0));
  let li = u32(k) + select(3u, 0u, row == 0);
  let g = SF_GI[li]; var d = 9.0;
  for (var i = 0u; i < g.y; i++) { let sg = SF_GS[g.x + i]; d = min(d, sfSegD(lp, sg.xy * vec2f(lw, lh), sg.zw * vec2f(lw, lh))); }
  let sw = 0.075; return 1.0 - smoothstep(sw - aa, sw + aa, d);
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let gx = dpdx(uv); let gy = dpdy(uv);
  let fw = max(abs(gx) + abs(gy), vec2f(0.001));
  let aav = fw.y * 1.3 + 0.003; let aau = fw.x * 1.3 + 0.003; let aa2 = vec2f(aau, aav); let fwm = max(fw.x, fw.y);
  // the road's frame in the world (T = dP/du, B = dP/dv) from the derivatives
  let px = dpdx(wp); let py = dpdy(wp);
  let det = gx.x * gy.y - gx.y * gy.x;
  let Tr = (px * gy.y - py * gx.y) * sign(det); let Br = (py * gx.x - px * gy.x) * sign(det);
  let T = select(vec3f(1.0, 0.0, 0.0), normalize(Tr), dot(Tr, Tr) > 1e-24);
  let B = select(vec3f(0.0, 0.0, 1.0), normalize(Br), dot(Br, Br) > 1e-24);
  let dist = length(wp - F.camPos.xyz);
  let photo = textureDimensions(matExtra).x > 4u;
  // asphalt: the 2k photo tile in world space at 3.2 m and a second tap rotated at 4.3 m, blended by a 30 m noise
  let w1 = wp.xz / 3.2;
  let w2 = vec2f(wp.x * 0.8 - wp.z * 0.6, wp.x * 0.6 + wp.z * 0.8) / 4.3 + vec2f(0.31, 0.17);
  let t1 = textureSample(matMap, matSamp, w1); let t2 = textureSample(matMap, matSamp, w2);
  let n1 = textureSample(matExtra, matSamp, w1); let n2 = textureSample(matExtra, matSamp, w2);
  let old = textureSample(matEmit, matSamp, wp.xz / 5.0 + vec2f(0.5, 0.2));   // weathered, cracked
  let bl = smoothstep(0.3, 0.7, sfN(wp.xz / 30.0));
  let n2w = vec2f(0.8 * (n2.x * 2.0 - 1.0) + 0.6 * (n2.y * 2.0 - 1.0), -0.6 * (n2.x * 2.0 - 1.0) + 0.8 * (n2.y * 2.0 - 1.0));
  var nA = mix(n1.xy * 2.0 - 1.0, n2w, bl);   // world (x, z) slope of the aggregate
  let hgt = mix(n1.z, n2.z, bl);              // 0.5 = the mean surface
  var c = mix(t1.rgb, t2.rgb, bl);
  if (!photo) { c = vec3f(t1.g * 0.98, t1.g * 0.98, t1.g * 1.03); nA = vec2f(0.0); }
  let mac = 0.84 + 0.3 * (sfN(wp.xz / 45.0) * 0.6 + sfN(wp.xz / 150.0 + 7.0) * 0.4);
  // whole stretches of older, weathered, cracked surface
  let wz = smoothstep(0.42, 0.62, sfN(wp.xz / 55.0 + vec2f(11.0, 3.0))) * select(0.0, 1.0, photo);
  c = mix(c, old.rgb * 0.58, wz * 0.9); nA *= 1.0 - 0.5 * wz;
  c *= mac;
  c *= vec3f(1.08, 1.0, 0.88);   // (round 7: SF's greyer asphalt, was 1.14 / 1.0 / 0.8) warmer asphalt (NFS's streets read tan-grey; the blue sky in the shade and the damp turned ours navy)
  c *= 0.86;   // (round 8: the NFS pass - a darker, charcoal asphalt, the far road's sheen doing the brightening)
  var rough = 0.68 + 0.18 * hgt + 0.05 * wz;
  // aggregate glints: the odd polished stone of the chip seal catching the sky and the sun, near the camera
  let spk = step(0.94, sfH(floor(wp.xz * 45.0))) * step(0.5, hgt) * (1.0 - smoothstep(0.006, 0.022, fwm));
  c = mix(c, c * 1.35, spk * 0.6); rough = mix(rough, 0.18, spk * 0.85);
  var metal = 0.0;
  var nD = vec2f(0.0);   // decal / seam slopes in the road's (u, v)
  let hw = col.r * 32.0; let kind = col.b; let lraw0 = round(col.a * 4.0); let bcode = floor(lraw0 / 64.0 + 0.01); let lraw = lraw0 - 64.0 * bcode;
  let tcode = floor(lraw / 16.0 + 0.01); let lanes = max(1.0, lraw - 16.0 * tcode);   // (tcode: SF's red transit-only lanes, roads.js transitCode; bcode: the bikeways, roads.js bikeCode)
  let gg = col.g * 256.0; let rfl = floor(gg / 4096.0 + 0.0001); let len = gg - rfl * 4096.0; let fl = u32(rfl);
  let noA = (fl & 1u) != 0u; let noB = (fl & 2u) != 0u; let noPk = (fl & 4u) != 0u; let ow = (fl & 8u) != 0u; let exPk = (fl & 16u) != 0u;
  let tram = (fl & 32u) != 0u; let inJ = (fl & 64u) != 0u; let xing = (fl & 128u) != 0u;
  let u = uv.x; let v = uv.y; let av = abs(v); let side = select(-1.0, 1.0, v > 0.0);
  // a per-road seed: the road's point at the start of its 64 m block in the world (round 12: from its origin, a long curved
  // road's estimate T u drifted by u x the curvature - on the James Lick's 1.1-1.5 km curves the seed changed every few
  // centimetres: its repaving, cuts and tar snakes a striped noise over the lane lines)
  let u0 = floor(u / 64.0) * 64.0;
  let rid = sfH(round((wp.xz - T.xz * (u - u0) - B.xz * v) / 8.0) * 0.1 + vec2f(u0 * 0.0137, 0.0));
  var white = 0.0; var yellow = 0.0; var tp = 0.0; var gut = 0.0; var trk = 0.0; var redL = 0.0;
  let wet = bc.g; let damp = max(bc.r, 0.0); let dayP = max(-bc.r, 0.0);   // (bc.r < 0: the day's damp patches only)
  // repaving: lane by lane in 23 m runs (tone, or the older, ravelled mix), utility cuts and trench strips
  var laneI = 0.0; var laneW = 3.0; var med = 0.0; var park = 0.0;
  let hwy = kind > 0.5 && kind < 0.55;   // highway / bridge deck: a median barrier, shoulders, no crossings
  let bw = select(0.0, select(1.7, 2.5, bcode > 2.5), ((bcode > 0.5 && bcode < 1.5) || bcode > 2.5) && !hwy);   // (a bike lane's room beside the parking lane)
  if (kind < 0.55) {
    med = select(select(0.0, 1.6, kind > 0.2 && kind < 0.4), 0.8, hwy);
    park = select(select(select(0.0, 2.3, hw >= 5.8 || exPk), 0.0, noPk), 0.9, hwy);
    if (ow) { med = 0.0; }
    laneW = max(select(hw - park - med - bw, 2.0 * (hw - park) - bw, ow) / lanes, 2.6);
    laneI = min(floor(max(select(av, v + hw - park, ow) - med, 0.0) / laneW), lanes);
  }
  // across the lanes: |v| on a two-way street (from the centre line out), from the left edge of the lanes on a one-way
  let aq = select(av, v + hw - park, ow);
  let seg = floor(u / 23.0 + sfH(vec2f(laneI, side + rid)) * 0.7);
  let rp = sfH(vec2f(laneI * 2.0 + side + rid * 31.0, seg));
  if (rp < 0.22) { c = mix(c, old.rgb * 0.62 * mac, 0.9); rough = 0.9; nA *= 1.3; }
  else if (rp > 0.82) { c *= 0.78; rough -= 0.06; }
  else { c *= 0.9 + 0.22 * fract(rp * 7.3); }
  // (veg50) the residential side streets (one lane each way or one-way) each their own surface age (seeded by the segment: its length and width): a third
  // the sun-bleached, ravelled grey of SF's old asphalt (the aggregate showing in broad patches), a fifth a fresh dark
  // slurry seal, the rest as they were - the side streets read as one flat charcoal
  if (kind < 0.2 && hw < 8.0 && lanes < 1.5) {
    let sa = sfH(vec2f(len * 0.371 + hw * 3.17, 4.2));
    let lum = dot(c, vec3f(0.3, 0.55, 0.15));
    if (sa < 0.34) {
      let rav = 0.45 + 0.3 * smoothstep(0.35, 0.7, sfN(wp.xz / 6.0 + vec2f(sa * 40.0, 1.0)));
      c = mix(c, vec3f(lum) * vec3f(1.56, 1.47, 1.3), rav); rough += 0.06;
    } else if (sa > 0.8) { c *= 0.78; rough -= 0.06; }
  }
  // utility cuts: 11 x 7 m cells, a third hold a sawcut rectangle of new asphalt with a sealed tar rim
  let pc = floor(vec2f(u / 11.0, v / 7.0)); let ph = sfH(pc + vec2f(rid * 13.0, 3.0));
  if (ph < 0.3 && dist < 400.0) {
    let ctr = (pc + vec2f(0.3 + 0.4 * sfH(pc + 1.7), 0.3 + 0.4 * sfH(pc + 4.1))) * vec2f(11.0, 7.0);
    let hs = vec2f(0.5 + 1.4 * sfH(pc + 2.3), 0.4 + 1.0 * sfH(pc + 8.9));
    let inR = sfRect(vec2f(u, v), ctr, hs, aa2); let outR = sfRect(vec2f(u, v), ctr, hs + 0.05, aa2);
    c = mix(c, c * 0.8, inR); rough = mix(rough, rough - 0.04, inR);
    let rim = (outR - inR) * (0.35 + 0.4 * sfNf(vec2f(u, v) * 3.0, fwm * 3.0)) * (1.0 - smoothstep(300.0, 400.0, dist)); c = mix(c, c * 0.45, rim); rough = mix(rough, 0.35, rim);   // a worn tar seal, not a painted line
  }
  // trench strips across half the road
  let tc = floor(u / 37.0); let th = sfH(vec2f(tc, rid * 7.0 + 2.0));
  if (th < 0.35 && kind < 0.55 && v * select(-1.0, 1.0, fract(th * 9.1) > 0.5) > 0.0) {
    let tu = tc * 37.0 + 6.0 + 25.0 * fract(th * 3.7); let tw = 0.35 + 0.25 * fract(th * 5.3);
    let inS = sfR(u, tu - tw, tu + tw, aau); let outS = sfR(u, tu - tw - 0.05, tu + tw + 0.05, aau);
    c = mix(c, c * 0.7, inS); let rim = outS - inS; c = mix(c, c * 0.35, rim * 0.9); rough = mix(rough, 0.3, rim);
  }
  // tar snakes: crack sealant along the edges of a warped Voronoi field, in patches of the road
  let fade = 1.0 - smoothstep(0.012, 0.04, fwm);
  if (fade > 0.0) {
    let cp = uv / 2.4 + vec2f(rid * 50.0, 0.0);
    let wq = cp + 0.35 * vec2f(sfN(cp * 1.7), sfN(cp * 1.7 + 5.0));
    let e = sfCell(wq) * 2.4 * 0.5;
    let region = smoothstep(0.52, 0.62, sfN(uv / 17.0 + vec2f(rid * 9.0, 0.3))) * step(0.45, sfN(wq * 0.9 + 3.0));
    let tw = 0.013 + 0.009 * sfN(uv * 3.0);   // (round 29: 2.6-4.4 cm across, was 3.6-6)
    // (round 27) the line's coverage of the pixel, not a line widened to the pixel: at the phones' render scale (a pixel
    // ~3 cm on the road by the car) the snakes drew as thick black scribbles across the lanes
    let ln = clamp((tw - e) / max(fwm, 1e-4) + 0.5, 0.0, 1.0) * min(1.0, 2.0 * tw / max(fwm, 1e-4)) * region * fade;
    // (round 29) the sealant a darker, glossier asphalt - not black ink: up close the snakes read as thick black cracks
    c = mix(c, c * vec3f(0.36, 0.36, 0.38), ln * 0.92); rough = mix(rough, 0.24, ln);
  }
  if (kind < 0.55) {
    // tyre polish, oil down the lane centres
    for (var k = 0.0; k < lanes; k += 1.0) {
      let lc = med + (k + 0.5) * laneW;
      let oil = sfB(aq, lc, 0.6, 0.35);
      c *= 1.0 - 0.16 * oil; rough -= 0.1 * oil;
      let t = sfB(aq, lc - 0.8, 0.5, 0.3) + sfB(aq, lc + 0.8, 0.5, 0.3);
      tp = max(tp, t);
    }
    c *= 1.0 - 0.1 * tp; rough -= 0.14 * tp; nA *= 1.0 - 0.4 * tp;
    if (ow) { yellow = 0.0; } else if (med < 0.1) { yellow = max(sfB(v, 0.13, 0.1, aav), sfB(v, -0.13, 0.1, aav)); } else { yellow = sfB(av, med - 0.25, 0.1, aav); }
    let dash = sfPer(u, 9.0, 0.0, 3.0, aau);
    for (var k = 1.0; k < lanes; k += 1.0) { white = max(white, sfB(aq, med + k * laneW, 0.1, aav) * dash); }
    if (lanes > 1.5 && park > 0.0) { white = max(white, sfB(av, hw - park, 0.1, aav)); }
    // bikeways (roads.js bikeCode): the lane between the parking lane and the traffic (two-way: both sides; one-way: the
    // right), a painted lane (1: white stripes, green through the conflict zones at the block's ends) or a protected one
    // (3: continuous green, a hatched buffer on the traffic side where the flexi-posts stand); 2: green-backed sharrows
    // down the kerb lane
    if (bcode > 0.5 && !hwy && (kind < 0.2 || (kind > 0.2 && kind < 0.5))) {
      let bfwd = select(u, len - u, !ow && v < 0.0);
      let bs = select(av, v, ow); let b1 = hw - park; let b0 = b1 - bw;
      let mine = select(1.0, step(0.0, v), ow);
      let blk = sfR(bfwd, 5.4, len - 5.4, aau);
      if (bcode < 1.5 || bcode > 2.5) {
        let lane0 = select(b0, b1 - 1.6, bcode > 2.5);
        white = max(white, (sfB(bs, b0, 0.15, aav) + sfB(bs, b1, 0.12, aav) + select(0.0, sfB(bs, lane0, 0.12, aav), bcode > 2.5)) * mine * blk);
        var gz = sfR(bs, lane0 + 0.1, b1 - 0.08, aav) * mine * blk;
        if (bcode < 1.5) { gz *= max(1.0 - sfR(bfwd, 18.0, len - 24.0, aau), 0.0) * sfPer(bfwd, 3.2, 0.0, 1.9, aau); }
        if (bcode > 2.5) {   // the buffer's hatching
          let hz = sfR(bs, b0 + 0.15, lane0 - 0.1, aav) * mine * blk;
          white = max(white, hz * sfPer(bfwd + bs * 1.2, 4.0, 0.0, 0.25, max(aau, aav) * 1.5));
        }
        let gw = smoothstep(0.2, 0.55, hgt * 0.6 + 0.45 * sfNf(vec2f(u * 0.8, v * 2.0) + rid * 7.0, fwm * 2.0) - 0.3 * tp + 0.2);
        c = mix(c, vec3f(0.07, 0.24, 0.1) * (0.8 + 0.4 * hgt) * mac, gz * gw * 0.92); rough = mix(rough, 0.55, gz); nA *= 1.0 - 0.6 * gz;
        let cell = floor(bfwd / 55.0); let yq = bfwd - (cell * 55.0 + 26.0);
        if (len > 30.0 && bfwd > 10.0 && bfwd < len - 12.0 && abs(yq) < 4.5 && mine > 0.5) { white = max(white, sfBikeSym(vec2f(bs - 0.5 * (lane0 + b1), yq + 1.2), fwm * 0.9 + 0.01, true)); }
      } else {   // green-backed sharrows down the kerb lane: a green box, the bike, two chevrons
        let lc = med + laneW * (lanes - 0.5);
        let cell = floor(bfwd / 40.0); let yq = bfwd - (cell * 40.0 + 20.0);
        if (len > 26.0 && bfwd > 8.0 && bfwd < len - 8.0 && abs(yq) < 3.4) {
          let box = sfR(aq, lc - 0.8, lc + 0.8, aav) * sfR(yq, -3.2, 3.2, aau) * select(1.0, step(0.0, v), false);
          let gw = smoothstep(0.2, 0.55, hgt * 0.6 + 0.45 * sfNf(vec2f(u * 0.8, v * 2.0) + rid * 7.0, fwm * 2.0) - 0.3 * tp + 0.2);
          c = mix(c, vec3f(0.07, 0.24, 0.1) * (0.8 + 0.4 * hgt) * mac, box * gw * 0.9); rough = mix(rough, 0.55, box); nA *= 1.0 - 0.6 * box;
          white = max(white, sfBikeSym(vec2f(aq - lc, yq + 0.9), fwm * 0.9 + 0.01, false) * box);
        }
      }
    }
    let cw = max(select(sfR(u, 1.0, 4.4, aau), 0.0, noA), select(sfR(u, len - 4.4, len - 1.0, aau), 0.0, noB)) * sfR(av, 0.0, hw - 0.25, aav) * select(1.0, 0.0, hwy);
    white = max(white, cw * sfPer(v + 0.3125, 1.25, 0.0, 0.62, aav));
    let sl = select(sfR(u, len - 5.2, len - 4.75, aau) * select(sfR(v, med, hw - park, aav), sfR(v, park - hw, hw - park, aav), ow), 0.0, noB)
      + select(sfR(u, 4.75, 5.2, aau) * sfR(-v, med, hw - park, aav), 0.0, noA || ow);
    white = max(white, sl * select(1.0, 0.0, hwy));
    if (hwy) { white = max(white, sfB(av, hw - park, 0.15, aav)); c *= 1.0 - 0.12 * sfR(av, hw - park, hw + 1.0, aav); }   // solid edge line, a darker shoulder
    // oil and grime pooled where cars wait at the stop lines
    let wait = max(sfR(u, len - 22.0, len - 5.2, 2.0) * step(0.0, v), sfR(u, 5.2, 22.0, 2.0) * step(v, 0.0)) * select(1.0, 0.0, hwy);
    c *= 1.0 - 0.12 * wait * sfB(av, med + 0.5 * laneW, 1.2, 0.5) * select(1.0, 0.0, xing);
    if (xing) { white = 0.0; yellow = 0.0; }
    // cable-car tracks: a concrete bed, 3'6" gauge rails and the cable slot down the inner lane
    if (kind > 0.4 && kind < 0.5) {
      let tcn = select(select(med + 0.5 * laneW, 2.2, tram), 0.0, ow);   // (a one-way: the track down the middle)
      let ga = select(0.54, 0.72, tram);   // half the gauge: 3'6" cable car, 4'8.5" streetcar
      let bed = sfB(av, tcn, select(1.5, 1.9, tram), aav);
      let jn = 1.0 - sfPer(u + 0.015, 4.5, 0.0, 0.03, aau) * 0.6;
      c = mix(c, mix(c * 1.4, vec3f(0.13, 0.127, 0.12) * (0.6 + 0.6 * old.g), 0.6) * jn, bed); rough = mix(rough, 0.85, bed);
      let rails = clamp(sfB(av, tcn - ga, 0.075, aav) + sfB(av, tcn + ga, 0.075, aav), 0.0, 1.0);
      let groove = clamp(sfB(av, tcn - ga + 0.07, 0.045, aav) + sfB(av, tcn + ga - 0.07, 0.045, aav), 0.0, 1.0);   // the flangeways
      c = mix(c, vec3f(0.006), groove); rough = mix(rough, 0.6, groove);
      // (round 15: the photos' rail heads polished bright by the wheels - they drew as dark lines - in a dull web)
      let head = clamp(sfB(av, tcn - ga, 0.032, aav) + sfB(av, tcn + ga, 0.032, aav), 0.0, 1.0);
      c = mix(c, vec3f(0.3, 0.29, 0.28), rails); rough = mix(rough, 0.32, rails); metal = max(metal, rails * 0.85);
      c = mix(c, vec3f(0.62, 0.6, 0.58), head); rough = mix(rough, 0.16, head);
      let slot = sfB(av, tcn, 0.03, aav) * select(1.0, 0.0, tram);
      c = mix(c, vec3f(0.004), slot);
      trk = clamp(rails + groove + slot, 0.0, 1.0);
    }
    // the gutter pan against each curb: concrete with joints, a grime line and a damp streak
    gut = sfR(av, hw - 0.45, hw + 1.0, aav) * select(1.0, 0.0, hwy || inJ);
    if (gut > 0.0) {
      let gj = 1.0 - 0.5 * sfPer(u + 0.01, 3.0, 0.0, 0.02, aau);
      let gc = vec3f(0.36, 0.35, 0.33) * (0.62 + 0.55 * old.g) * gj * mac;
      let grime = smoothstep(hw - 0.45, hw - 0.1, av) * 0.35 + (1.0 - smoothstep(0.0, 0.06, abs(av - hw + 0.45))) * 0.5;
      c = mix(c, gc * (1.0 - grime * 0.6) * (0.85 + 0.25 * sfN(vec2f(u * 0.4, v))), gut);
      rough = mix(rough, 0.88, gut); nA *= 1.0 - 0.6 * gut; white *= 1.0 - gut; yellow *= 1.0 - gut;
    }
  } else if (kind > 0.8) {   // brick (Lombard's crooked block; round 32, Commons' photos: running bond, red to maroon and plum
    // bricks mixed, worn a little glossy)
    let bw = 0.22; let bh = 0.11;
    let row = floor(v / bh); let bu = u / bw + 0.5 * (row % 2.0);
    let mortar = max(1.0 - sfPer(bu, 1.0, 0.05, 0.95, fw.x / bw * 1.5), 1.0 - sfPer(v / bh, 1.0, 0.08, 0.92, fw.y / bh * 1.5));
    let bid = vec2f(floor(bu), row); let fa = smoothstep(0.3, 1.0, fw.x / bw); let h1 = mix(sfH(bid), 0.5, fa); let h2 = mix(sfH(bid + vec2f(17.0, 3.0)), 0.5, fa);
    let bcol = mix(vec3f(0.27, 0.075, 0.055), vec3f(0.19, 0.055, 0.06), h2) * (0.72 + 0.56 * h1);
    c = mix(bcol, vec3f(0.26, 0.245, 0.225), mortar) * (0.85 + 0.3 * t1.g); rough = 0.62 + 0.14 * mortar; nA = vec2f(0.0);
    nD = vec2f(0.0, 0.25 * (sfB(fract(v / bh), 0.0, 0.16, 0.05) - sfB(fract(v / bh), 1.0, 0.16, 0.05))) * (1.0 - smoothstep(0.015, 0.05, fw.y));
  } else {   // intersection box: polished in broad sweeps where the turning traffic runs
    let pol = smoothstep(0.4, 0.8, sfN(uv / 3.5 + rid * 9.0));
    c *= 1.0 - 0.1 * pol; rough -= 0.1 * pol;
  }
  // SF's red transit-only lanes (tcode 1: the curb lane, 2: the inner lane (Market St's track lanes), 3: the whole roadway
  // (Van Ness's BRT, Market's busway)): a worn red coat stopping short of the crosswalks, BUS ONLY every 70 m
  if (tcode > 0.5 && kind < 0.55 && !hwy) {
    var r0 = 0.0; var r1 = 0.0;
    if (tcode > 2.5) { r0 = select(0.0, 0.0, ow); r1 = select(hw - 0.3, 2.0 * hw - 0.3, ow); }
    else if (tcode > 1.5) { r0 = med + 0.22; r1 = med + min(laneW, 3.6) - 0.1; }
    else { r0 = med + (lanes - 1.0) * laneW + 0.1; r1 = med + lanes * laneW - 0.1; }
    let fwd = select(u, len - u, !ow && v < 0.0);   // (metres along the driver's way)
    var red = sfR(aq, r0, r1, aav) * sfR(fwd, 5.6, len - 5.6, aau) * (1.0 - gut);
    let rw = smoothstep(0.25, 0.6, hgt * 0.6 + 0.5 * sfNf(vec2f(u * 0.7, v * 2.0) + rid * 13.0, fwm * 2.0) - 0.4 * tp + 0.18);
    redL = red;
    c = mix(c, vec3f(0.26, 0.052, 0.04) * (0.82 + 0.36 * hgt) * mac, red * rw * 0.9); rough = mix(rough, 0.6, red * rw); nA *= 1.0 - 0.6 * red;
    let cell = floor(fwd / 70.0); let yq = fwd - (cell * 70.0 + 30.0);
    if (red > 0.0 && len > 45.0 && fwd > 12.0 && fwd < len - 14.0 && abs(yq) < 12.0) {
      let lc = 0.5 * (r0 + r1); let lw = clamp((r1 - r0 - 0.5) / 3.3 * 0.55, 0.3, 0.55);
      white = max(white, sfBusOnly(vec2f(aq - lc, yq), lw, fwm * 0.9 + 0.01));
    }
  }
  // paint: breaks up on the aggregate and where the tyres run; thermoplastic sits proud
  let pw = smoothstep(0.2, 0.55, hgt * 0.7 + 0.45 * sfNf(vec2f(u * 1.1, v * 3.0) + rid * 20.0, max(fw.x * 1.1, fw.y * 3.0)) - 0.35 * tp + 0.12);
  let paintW = white * pw * (1.0 - trk); let paintY = yellow * pw * (1.0 - trk);   // no paint on the rails
  let pb = 0.82 + 0.36 * hgt;
  c = mix(c, vec3f(0.72, 0.72, 0.68) * pb, paintW * 0.95);
  c = mix(c, vec3f(0.78, 0.55, 0.08) * pb, paintY * 0.95);
  rough = mix(rough, 0.5, max(paintW, paintY)); nA *= 1.0 - 0.7 * max(paintW, paintY);
  // decals from the atlas: 0 manhole, 1 valve, 2 storm grate, 3 steel plate, 4 oil, 5 patch, 6 tar, 7 litter
  let c0 = c; let rough0 = rough; let metal0 = metal; let nD0 = nD; let nA0 = nA;
  if (photo && dist < 220.0) {
    var d: SfDec;
    if (kind < 0.5) {
      // covers down the lane centres, every 13 m cell a chance
      let mc = floor(u / 13.0); let hm = sfH(vec2f(mc, rid * 97.0 + 1.0));
      if (hm < 0.32) {
        let big = hm < 0.2; let lc = (med + (floor(fract(hm * 7.0) * lanes) + 0.5) * laneW) * select(-1.0, 1.0, fract(hm * 3.0) > 0.5);
        let sz = select(0.46, 0.92, big);
        d = sfDecal(vec2f(u - (mc * 13.0 + 6.5), v - lc), vec2f(sz), select(1.0, 0.0, big), floor(fract(hm * 11.0) * 4.0), gx, gy);
        c = mix(c, d.c.rgb, d.c.a); rough = mix(rough, 0.42, d.c.a); metal = mix(metal, 0.55, d.c.a); nD = mix(nD, d.n * 0.8, d.c.a); nA *= 1.0 - d.c.a;
        white *= 1.0 - d.c.a;
      }
      // storm grates in the gutter near each corner
      let gu = select(len - 7.5, 7.5, u < len * 0.5);
      d = sfDecal(vec2f(u - gu, av - (hw - 0.3)), vec2f(0.95, 0.55), 2.0, 1.0, gx, gy);
      if (inJ) { d.c = vec4f(0.0); }
      c = mix(c, d.c.rgb * 0.8, d.c.a); rough = mix(rough, 0.5, d.c.a); metal = mix(metal, 0.4, d.c.a); nD = mix(nD, d.n, d.c.a); nA *= 1.0 - d.c.a;
      // steel trench plates, rare
      let sc = floor(u / 41.0); let hs = sfH(vec2f(sc, rid * 5.0 + 9.0));
      if (hs < 0.14) {
        let lc = (med + 0.5 * laneW) * select(-1.0, 1.0, hs < 0.07);
        d = sfDecal(vec2f(u - (sc * 41.0 + 12.0 + 18.0 * fract(hs * 13.0)), v - lc), vec2f(2.4, 1.8), 3.0, floor(fract(hs * 29.0) * 2.0) * 2.0, gx, gy);
        c = mix(c, d.c.rgb * 0.9, d.c.a); rough = mix(rough, 0.35, d.c.a); metal = mix(metal, 0.75, d.c.a); nD = mix(nD, d.n * 0.6, d.c.a); nA *= 1.0 - d.c.a;
        white *= 1.0 - d.c.a; yellow *= 1.0 - d.c.a;
      }
      // litter in the gutter
      let lcell = floor(u / 5.0); let hl = sfH(vec2f(lcell, rid * 3.0 + side * 5.0));
      if (hl < 0.35 && !inJ) {
        d = sfDecal(vec2f(u - (lcell * 5.0 + 1.0 + 3.0 * fract(hl * 17.0)), av - (hw - 0.35)), vec2f(0.9 + 0.5 * fract(hl * 5.0)), 7.0, floor(fract(hl * 7.0) * 4.0), gx, gy);
        c = mix(c, d.c.rgb * 0.75, d.c.a); rough = mix(rough, 0.8, d.c.a); nA *= 1.0 - d.c.a;
      }
    }
    // oil stains in the lanes, thicker before the stop lines
    let oc = floor(uv / vec2f(5.0, 3.0)); let ho = sfH(oc + vec2f(rid * 11.0, 4.0));
    let near = select(0.0, 0.3, kind < 0.55 && (u > len - 20.0 || u < 20.0));
    if (ho < 0.14 + near) {
      let oz = 0.6 + 0.9 * fract(ho * 19.0);
      d = sfDecal(uv - (oc + vec2f(0.5, 0.5)) * vec2f(5.0, 3.0), vec2f(oz), 4.0, floor(fract(ho * 23.0) * 4.0), gx, gy);
      let a = d.c.a * (1.0 - gut) * 0.85;
      c = mix(c, c * 0.35, a); rough = mix(rough, 0.25, a);
    }
    // utility patches from the atlas and loose tar snakes
    let qc = floor(uv / vec2f(19.0, 6.0)); let hq = sfH(qc + vec2f(rid * 17.0, 8.0));
    if (hq < 0.18) {
      let ctr = (qc + vec2f(0.5, 0.5)) * vec2f(19.0, 6.0) + vec2f(4.0 * (fract(hq * 13.0) - 0.5), 0.0);
      d = sfDecal(uv - ctr, vec2f(1.6 + 1.6 * fract(hq * 7.0), 1.4 + 1.2 * fract(hq * 3.0)), 5.0, 0.0, gx, gy);
      let a = d.c.a * (1.0 - gut);
      c = mix(c, d.c.rgb * 0.8, a); rough = mix(rough, 0.72, a); nD = mix(nD, d.n * 0.5, a);
      white *= 1.0 - a; yellow *= 1.0 - a;
    } else if (hq < 0.36) {
      let ctr = (qc + vec2f(0.5, 0.5)) * vec2f(19.0, 6.0);
      d = sfDecal(uv - ctr, vec2f(3.5 + 2.0 * fract(hq * 7.0)), 6.0, floor(fract(hq * 29.0) * 4.0), gx, gy);
      // (round 29) the decal's band narrowed to its core (its soft rim was a 10 cm black worm up close) and a darker, glossier
      // asphalt rather than black
      let a = smoothstep(0.35, 0.8, d.c.a) * (1.0 - gut) * 0.95;
      c = mix(c, c * vec3f(0.36, 0.36, 0.38), a); rough = mix(rough, 0.38, a);   // (night49: 0.24 -> 0.38 - at 0.24 the screen-space reflection mirrored the cars in each patch: a sharp, smeared block on dry asphalt)
    }
  }
  // (the decals fade out over their last 50 m instead of popping at 220 m)
  let dfade = 1.0 - smoothstep(170.0, 220.0, dist);
  c = mix(c0, c, dfade); rough = mix(rough0, rough, dfade); metal = mix(metal0, metal, dfade); nD = mix(nD0, nD, dfade); nA = mix(nA0, nA, dfade);
  // water: damp (dusk) and rain darken and gloss the road; puddles in the gutters, the ruts and the low spots
  let wa = max(wet, damp);
  let pn = sfN(wp.xz / 7.0) * 0.6 + sfN(wp.xz / 1.9 + 3.0) * 0.4;
  // (round 9, NFS's wet nights: the film of water near black and near mirror between the aggregate's peaks, the puddles
  // wider in the rain; SSR and the lamps' streaks do the rest)
  // (round 27) Karl the Fog's damp (by day, no rain): fewer, softer-edged pools, less glassy and the film between them
  // glossier - under the fog's white sky the mirror pools and the dark film between them read as black blocks with hard,
  // stepped edges at 60-150 m; now a sheen. Rain and blue hour as before
  let fogD = step(0.02, damp) * (1.0 - step(0.02, wet)) * (1.0 - step(0.5, bc.b));
  // (night48) the night's damp (no rain): a light sheen over the whole street and puddles only in the gutters and the
  // deepest ruts - the open lanes' mirror pools read as black blotches under the lamps ('muddy, blotchy' at night)
  let nightD = step(0.02, damp) * (1.0 - step(0.02, wet)) * step(0.5, bc.b);
  let thr = 0.74 - 0.36 * wa - 0.3 * gut - 0.12 * tp + 0.1 * fogD + 0.22 * nightD * (1.0 - gut);
  let pud = smoothstep(thr, thr + 0.05 + 0.3 * fogD, pn + 0.08 * (0.5 - hgt) * (1.0 - fogD)) * step(0.02, wa) * (1.0 - 0.45 * fogD);
  let rim = (smoothstep(thr - 0.06, thr, pn) * step(0.02, wa) - pud) * (1.0 - fogD);
  c *= 1.0 - 0.45 * wa * (1.0 - 0.45 * fogD); rough = mix(rough, mix(0.06 + 0.2 * hgt, 0.16, fogD), wa * mix(0.9, 1.0, fogD)); nA *= 1.0 - 0.45 * wa;
  rough = mix(rough, 0.36 + 0.14 * hgt, nightD * 0.75); nA *= 1.0 - 0.45 * nightD;   // (the aggregate's bump softer under it: no glitter near the camera)   // (night48: the open lanes an even damp sheen instead - the sky's glow and the lamps along it, the lines on it)
  c *= 1.0 - 0.35 * pud; rough = mix(rough, mix(0.02, 0.07, fogD), pud); rough = mix(rough, min(rough, 0.18), max(rim, 0.0));
  metal *= 1.0 - pud;
  // (round 27) NFS's wet streets: the lamps' and the reflections' long streaks down the screen (renderer gHAN), the
  // film's ripples more than a still puddle's
  gHAN = wa * (1.0 - 0.5 * pud) * step(0.02, wa) * max(step(0.02, wet), step(0.5, bc.b));   // (rain and the night: the fog's damp keeps its look)
  // the day's damp (sky.js 'patches', NFS Unbound's streets): dark glossy patches (a street sweeper's run, the shade's last
  // dew, a leak by the gutter) and a sheen in runs along the tyre tracks; near mirrors, so SSR puts the sky and the
  // buildings in them. No overall darkening (dry asphalt between them)
  if (dayP > 0.0 && dist < 320.0) {
    // (stretched along the road: u along, v across; sparse, gathered toward the gutters and the tracks)
    let pa = vec2f(u / 16.0 + rid * 9.0, v / 3.2); let pb = vec2f(u / 4.5, v / 1.4 + 3.0);
    let pn2 = sfN(pa) * 0.62 + sfN(pb) * 0.26 + sfN(wp.xz / 0.8) * 0.12;
    let th2 = 0.74 - 0.12 * dayP - 0.2 * gut - 0.08 * tp;
    let pt = smoothstep(th2, th2 + 0.07, pn2);
    let run = smoothstep(0.55, 0.75, sfN(vec2f(u / 11.0, rid * 17.0 + laneI * 3.0 + side)) * 0.8 + sfN(vec2f(u / 2.5, v * 2.0)) * 0.2);
    // (night48) a soft sheen, not dark mirrors: at roughness 0.07 the screen-space reflection put the trees' and the
    // facades' shade in them - dark blotches all down Market St's red lanes; none on the red coat or the paint now
    let dk = max(pt, tp * run * 0.7) * min(dayP * 1.6, 1.0) * (1.0 - smoothstep(180.0, 320.0, dist)) * (1.0 - white) * (1.0 - yellow) * (1.0 - redL) * 0.7;
    c *= 1.0 - 0.1 * dk; rough = mix(rough, 0.3 + 0.12 * (1.0 - pt), dk); nA *= 1.0 - 0.5 * dk; nD *= 1.0 - 0.4 * dk;
  }
  // far away: no glare off the grazing asphalt, no sparkle
  rough = mix(rough, max(rough, 0.62), smoothstep(250.0, 900.0, dist) * (1.0 - wa * 0.6));
  let nk = (1.0 - pud) * (1.0 - 0.7 * smoothstep(40.0, 160.0, dist));
  let off = (vec3f(nA.x, 0.0, nA.y) * 0.2 + T * nD.x + B * nD.y) * nk;   // the aggregate: subtle (low sun turned stronger bump into corduroy; night49: 0.26 -> 0.2, its glints a grain on the road into a low sun)
  gHN = vec4f(off, 1.0);
  gHK = vec4f(clamp(rough, 0.03, 1.0), metal, 0.0, 1.0);
  // (night48) the lines' glass beads at night: the paint returns the cars' lamps toward the driver (retroreflection), so
  // the lane lines read down the dark street past the lamps' pools - a faint glow of their own, fading out past ~250 m
  gHE = (vec3f(0.72, 0.72, 0.68) * paintW + vec3f(0.78, 0.55, 0.08) * paintY) * smoothstep(0.5, 1.0, bc.b) * 0.03 * (1.0 - smoothstep(150.0, 260.0, dist)) * dfade;
  return vec4f(c, 1.0);
}
`,
  vq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fw = max(fwidth(uv), vec2f(0.002));
  let photo = textureDimensions(matMap).x > 600u;
  let tx = textureSample(matMap, matSamp, uv * select(0.21, 0.26, photo));
  let tx2 = textureSample(matMap, matSamp, uv * 0.047 + vec2f(0.3, 0.7));
  var c = col.rgb * (0.75 + 0.5 * tx.r);
  var rough = 0.85;
  if (col.a > 0.06 && col.a < 0.2) {   // Market St: red brick in running bond along the street, granite at the kerb and in bands across
    let dir = normalize(col.rg * 2.0 - 1.0 + vec2f(1e-4, 0.0));
    let q = vec2f(dot(uv, dir), dot(uv, vec2f(-dir.y, dir.x))); let kd = col.b * 16.0;
    let fq = max(fw.x, fw.y);
    let row = floor(q.y / 0.1); let bu = q.x / 0.21 + 0.5 * (row - 2.0 * floor(row * 0.5));
    let far = smoothstep(0.03, 0.09, fq);
    let mortar = max(1.0 - sfPer(bu, 1.0, 0.04, 0.96, fq / 0.21 * 1.5), 1.0 - sfPer(q.y / 0.1, 1.0, 0.08, 0.92, fq / 0.1 * 1.5)) * (1.0 - far);
    let bh = sfH(vec2f(floor(bu), row));
    let brick = vec3f(0.19, 0.085, 0.06) * mix(0.72 + 0.56 * bh, 1.0, far) * mix(vec3f(1.0), vec3f(0.85, 1.0, 1.1), step(0.86, bh) * (1.0 - far));
    c = mix(brick, vec3f(0.2, 0.19, 0.17), mortar * 0.8) * (0.8 + 0.4 * tx2.g) * (0.9 + 0.2 * tx.r);
    let gb = max(1.0 - smoothstep(0.55, 0.6, kd), sfPer(q.x, 12.0, 0.0, 0.45, fq * 1.5));
    let gj = 1.0 - sfPer(q.x + 0.01, 0.6, 0.0, 0.02, fq * 1.5) * (1.0 - far);
    c = mix(c, vec3f(0.33, 0.325, 0.31) * (0.8 + 0.4 * tx.r) * gj, gb);
    rough = mix(0.8, 0.7, gb);
  } else if (photo && col.a < 0.25) {   // the photographed slabs (their own joints and stains), a broad mottle
    let wc = select(col.rgb, vec3f(0.35, 0.345, 0.33), col.a > 0.001);   // (a triangle half on Market's brick: the slabs' own grey)
    c = tx.rgb * (wc / 0.45) * (0.8 + 0.4 * tx2.g) * (0.9 + 0.2 * sfN(uv * 0.13));
    // (veg49) SF's 5 ft panels scored into the pour (the photo's own ~0.96 m joints painted out: tools/gen_sidewalk_clean.py):
    // each panel its pour's tone and cast, now and then a newer, paler slab or a cracked one; dirt in the joints and a few cm
    // along them, drink and oil stains, broad grime
    let fq = max(fw.x, fw.y); let P = 1.524; let far = smoothstep(0.02, 0.08, fq);
    let cell = floor(uv / P); let hc = sfH(cell + 0.37); let hc2 = sfH(cell * 1.7 + 3.1);
    c *= mix(vec3f(1.0), (0.9 + 0.18 * hc) * mix(vec3f(1.0), vec3f(1.03, 1.0, 0.95), step(0.5, hc2)), 1.0 - 0.5 * far);
    c = mix(c, c * vec3f(1.1, 1.1, 1.08), step(0.93, hc2));
    let jx = 1.0 - sfPer(uv.x, P, 0.012, P - 0.012, fw.x * 1.5 + 0.002);
    let jz = 1.0 - sfPer(uv.y, P, 0.012, P - 0.012, fw.y * 1.5 + 0.002);
    c *= 1.0 - 0.5 * max(jx, jz) * (1.0 - 0.6 * far);
    let fr = fract(uv / P); let ed = min(min(fr.x, 1.0 - fr.x), min(fr.y, 1.0 - fr.y)) * P;
    c *= 1.0 - 0.12 * (1.0 - smoothstep(0.0, 0.07, ed)) * (1.0 - far);
    let cq = uv * 1.3 + cell * 3.3; let crk = step(0.94, hc) * 0.7 * (1.0 - smoothstep(0.0, 0.006 + fq * 1.2, abs(sfN(cq) - 0.5 + (sfN(cq * 7.0) - 0.5) * 0.06))) * (1.0 - far);
    c *= 1.0 - 0.45 * crk;
    let st = smoothstep(0.6, 0.82, sfN(uv * 0.45 + vec2f(4.7, 1.3))) * smoothstep(0.35, 0.7, sfN(uv * 1.7 + vec2f(2.0, 0.0)));
    c = mix(c, c * vec3f(0.74, 0.72, 0.69), st * 0.6);
    c *= 0.9 + 0.16 * sfN(uv * 0.06 + vec2f(9.1, 0.0));
    rough = 0.85 - 0.12 * st;
  } else if (col.a < 0.25) {
    let jx = 1.0 - sfPer(uv.x, 1.52, 0.02, 1.5, fw.x * 1.5 + 0.004);
    let jz = 1.0 - sfPer(uv.y, 1.52, 0.02, 1.5, fw.y * 1.5 + 0.004);
    let j = max(jx, jz);
    c *= 1.0 - 0.45 * j;
    // gum and stains
    c *= 1.0 - 0.18 * smoothstep(0.62, 0.8, tx.g);
  } else if (col.a < 0.75) {   // the curb's face (uv: metres along, up from under the road): weathered concrete or its
    // faded paint worn through in patches, the gutter's grime splashed up the bottom, black tyre rubs where cars park
    // against it, chips and stains
    let fq = max(fw.x, fw.y);
    let n = sfN(vec2f(uv.x * 2.3, uv.y * 7.0)); let nf = sfNf(vec2f(uv.x * 19.0, uv.y * 27.0), fq * 27.0);
    let sat = max(col.r, max(col.g, col.b)) - min(col.r, min(col.g, col.b));
    let worn = smoothstep(0.55, 0.8, n * 0.7 + nf * 0.3) * step(0.08, sat);
    c = mix(c * 1.05, vec3f(0.44, 0.43, 0.41) * (0.75 + 0.5 * tx.r), worn * 0.75) * (0.88 + 0.24 * n);
    let low = 1.0 - smoothstep(0.03, 0.15, uv.y + 0.04 * nf);
    let rub = smoothstep(0.62, 0.8, sfN(vec2f(uv.x * 0.45, 1.7))) * smoothstep(0.35, 0.6, sfN(vec2f(uv.x * 3.1, 5.3)))
      * smoothstep(0.05, 0.09, uv.y) * (1.0 - smoothstep(0.12, 0.17, uv.y));
    c = mix(c, vec3f(0.06, 0.055, 0.05) * (0.8 + 0.4 * nf), clamp(low * 0.5 + rub * 0.65, 0.0, 1.0));
    c *= 1.0 - 0.2 * smoothstep(0.62, 0.9, nf);
    rough = mix(0.88, 0.62, rub);
  } else if (col.a > 0.79 && col.a < 0.9) {   // (freeways43) the viaducts' concrete (city/real/roads.js deck): walls,
    // columns and caps (uv: metres along / round, metres up from the foot) - formwork lifts and tie holes, a tone per pour,
    // rain streaks, grime splashed up the foot; the soffit (uv: metres along the deck, across it) - plywood sheets, damp
    // patches and efflorescence
    let fq = max(fw.x, fw.y);
    let soff = col.a > 0.845;
    let far = smoothstep(0.04, 0.12, fq);
    let pu = select(4.88, 2.44, soff); let pv = 1.22;
    let jt = max(1.0 - sfPer(uv.x, pu, 0.015, pu - 0.015, fw.x * 1.5 + 0.003), 1.0 - sfPer(uv.y, pv, 0.012, pv - 0.012, fw.y * 1.5 + 0.003));
    let ph = sfH(floor(uv / vec2f(pu, pv * select(3.0, 1.0, soff))));
    let n = sfN(uv * vec2f(0.31, 0.47)); let nf = sfNf(uv * 5.0, fq * 5.0);
    var cc = col.rgb * (0.86 + 0.28 * tx.r) * (0.88 + 0.24 * n) * (0.94 + 0.12 * ph) * (0.93 + 0.14 * nf);
    cc *= 1.0 - select(0.2, 0.09, soff) * jt * (1.0 - far);
    // (bridges49) the deck's expansion joints every 37 m along it (the soffit's and the fascias' uv.x: metres along the
    // deck): a dark seam, and on the fascia the rust-brown drip stain run down from it
    let ej = sfPer(uv.x + 18.0, 37.0, 0.0, 0.09, fw.x * 1.5 + 0.002);
    cc *= 1.0 - 0.55 * ej * (1.0 - 0.5 * far);
    if (!soff) { let dj = abs(fract((uv.x + 18.0) / 37.0 + 0.5) - 0.5) * 37.0;
      let drip = (1.0 - smoothstep(0.1, 0.9 + 0.6 * n, dj)) * smoothstep(0.3, 0.7, sfN(vec2f(uv.x * 3.0, uv.y * 0.4 + 9.0)));
      cc = mix(cc, cc * vec3f(0.62, 0.55, 0.47), drip * 0.55); }
    if (soff) {
      let damp = smoothstep(0.62, 0.85, sfN(uv * 0.11 + vec2f(3.1, 0.7)));
      cc = mix(cc, cc * 0.72, damp * 0.7);
      let eff = smoothstep(0.7, 0.9, sfN(uv * vec2f(0.6, 1.9) + vec2f(7.3, 1.1))) * (1.0 - far * 0.5);
      cc = mix(cc, vec3f(0.62, 0.61, 0.58), eff * 0.35);
    } else {
      let streak = smoothstep(0.5, 0.85, sfN(vec2f(uv.x * 2.3, uv.y * 0.09 + 4.0))) * smoothstep(0.3, 0.75, sfN(vec2f(uv.x * 0.4, 2.0)));
      cc *= 1.0 - 0.26 * streak;
      let tie = sfPer(uv.x + 0.6, 1.22, 0.0, 0.035, fw.x * 1.5) * sfPer(uv.y + 0.6, 1.22, 0.0, 0.035, fw.y * 1.5) * (1.0 - far);
      cc *= 1.0 - 0.45 * tie;
      let foot = 1.0 - smoothstep(0.0, 0.9 + 0.5 * nf, uv.y);
      cc = mix(cc, cc * vec3f(0.55, 0.53, 0.5), foot * 0.6);
    }
    c = cc; rough = 0.9;
  } else {   // grass
    let g = sfN(uv * 3.0) * 0.5 + sfNf(uv * 13.0, max(fw.x, fw.y) * 13.0) * 0.5;
    c = col.rgb * (0.75 + 0.5 * g) * (0.85 + 0.3 * sfN(uv * 0.02)); rough = 0.95;
  }
  let wet = bc.g; c *= 1.0 - 0.3 * wet; rough = mix(rough, 0.2, wet * 0.7);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  yq =
    o0 +
    `
// window coverage, frame coverage, the reveal's shade inside the opening (lintel and jamb shadows), sash bars, the sill
struct SfWin { m: f32, fr: f32, sh: f32, bar: f32, sill: f32, lp: vec2f };   // (lp: the point in its window, 0..1 across and up)
fn sfWin(u: f32, v: f32, bay: f32, w: f32, fl: f32, sill: f32, h: f32, aau: f32, aav: f32, frame: f32) -> SfWin {
  // (periodic bands box-filtered exactly: far facades' windows settle to their share instead of shimmering)
  let fu = fract(u / bay) * bay - 0.5 * bay; let fv = fract(v / fl) * fl; let uu = u + 0.5 * bay;
  let inW = sfPer(uu, bay, 0.5 * (bay - w), 0.5 * (bay + w), aau) * sfPer(v, fl, sill, min(sill + h, fl), aav);
  let inF = sfPer(uu, bay, max(0.5 * (bay - w) - frame, 0.0), min(0.5 * (bay + w) + frame, bay), aau) * sfPer(v, fl, max(sill - frame * 1.6, 0.0), min(sill + h + frame * 1.3, fl), aav);
  let lx = (fu + 0.5 * w) / w; let ly = (fv - sill) / h;
  // the small parts (shade in the reveal, sash bars, sills) fade out as the window shrinks under ~6 pixels
  let fine = 1.0 - smoothstep(0.08, 0.2, max(aau / w, aav / h));
  let sh = mix(0.85, (1.0 - 0.6 * smoothstep(0.8, 1.0, ly)) * (1.0 - 0.4 * (1.0 - smoothstep(0.0, 0.1, lx))), fine);
  var bar = sfB(ly, 0.52, 0.06 / h, aav / h) + sfB(fv, sill + 0.03, 0.06, aav) + sfB(fv, sill + h - 0.03, 0.06, aav);
  if (w > 1.3) { bar += sfB(lx, 0.5, 0.05 / w, aau / w); }
  let sl = sfPer(uu, bay, max(0.5 * (bay - w) - frame * 1.6, 0.0), min(0.5 * (bay + w) + frame * 1.6, bay), aau) * sfPer(v, fl, max(sill - frame * 1.6 - 0.1, 0.0), max(sill - frame * 1.6 + 0.02, 0.01), aav);
  return SfWin(inW, max(inF - inW, 0.0), sh, clamp(bar, 0.0, 1.0) * inW * fine, sl * fine, vec2f(lx, ly));
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fw = max(fwidth(uv), vec2f(0.001));
  let aau = fw.x * 1.2 + 0.002; let aav = fw.y * 1.2 + 0.002;
  let style = floor(col.a * 16.0);
  let u = uv.x; let v = uv.y;
  let tx = textureSample(matMap, matSamp, uv * vec2f(0.19, 0.19));
  var wall = col.rgb * (0.85 + 0.3 * tx.r);
  var trim = vec3f(0.72, 0.71, 0.68);
  var glass = 0.0; var fr = 0.0; var shop = 0.0; var door = 0.0; var wsh = 1.0; var wbar = 0.0; var wsill = 0.0;
  var fl = 3.2; var g0 = 3.2; var wl = vec2f(0.5, 0.7);   // (wl: the point in its window, for the lit room's light across it)
  let night = bc.b;
  var lit = 0.0;
  if (style < 0.5) {   // Victorian: raised basement / garage, tall narrow windows in pairs, belt courses
    g0 = 2.9; fl = 3.5;
    let vv = v - g0;
    let w = sfWin(u, vv, 1.27, 0.78, fl, 0.75, 2.05, aau, aav, 0.13);
    let up = step(0.0, vv);
    glass = w.m * up; fr = w.fr * up; wsh = w.sh; wbar = w.bar * up; wsill = w.sill * up; wl = w.lp;
    // belt courses and a frieze under the cornice
    fr = max(fr, sfPer(vv, fl, 0.0, 0.16, aav) * up);
    // the street level: garage door on a 7.6 m lot rhythm, the entry door and stairs beside it
    let gar = sfPer(u, 7.6, 2.5, 5.2, aau) * sfR(v, 0.0, 2.35, aav);
    let dr = sfPer(u, 7.6, 6.0, 7.1, aau) * sfR(v, 0.6, 2.8, aav);
    door = max(gar, dr);
    wall = mix(wall, wall * 0.92, 1.0 - up);
    lit = sfH(vec2f(floor(u / 1.27), floor(vv / fl)));
  } else if (style < 1.5) {   // stucco apartments: punched windows, a lobby
    g0 = 3.4; fl = 3.0;
    let vv = v - g0; let up = step(0.0, vv);
    let w = sfWin(u, vv, 3.0, 1.55, fl, 0.85, 1.45, aau, aav, 0.07);
    glass = w.m * up; fr = w.fr * up; wsh = w.sh; wbar = w.bar * up; wsill = w.sill * up; wl = w.lp;
    door = sfPer(u, 21.0, 9.0, 11.2, aau) * sfR(v, 0.0, 2.7, aav);
    let gw = sfWin(u, v, 3.0, 1.9, 20.0, 0.9, 1.6, aau, aav, 0.05);
    glass = max(glass, gw.m * (1.0 - up) * (1.0 - door));
    lit = sfH(vec2f(floor(u / 3.0), floor(vv / fl)));
  } else if (style < 2.5 || (style > 9.5 && style < 10.5)) {   // mixed use: storefronts under flats (North Beach / Chinatown)
    g0 = 4.3; fl = 3.3;
    let vv = v - g0; let up = step(0.0, vv);
    let w = sfWin(u, vv, 2.6, 1.15, fl, 0.8, 1.7, aau, aav, 0.1);
    glass = w.m * up; fr = w.fr * up; wsh = w.sh; wbar = w.bar * up; wsill = w.sill * up; wl = w.lp;
    let sid = floor(u / 6.5);
    shop = sfPer(u, 6.5, 0.35, 6.15, aau) * sfR(v, 0.35, 3.05, aav);
    let sign = sfPer(u, 6.5, 0.2, 6.3, aau) * sfR(v, 3.25, 3.95, aav);
    let sc = vec3f(sfH(vec2f(sid, 3.1)), sfH(vec2f(sid, 7.7)), sfH(vec2f(sid, 1.3)));
    wall = mix(wall, mix(vec3f(0.5, 0.06, 0.04), sc * 0.6, step(0.5, sfH(vec2f(sid, 9.0)))), sign * (1.0 - up));
    if (style > 9.5) {   // Chinatown: balconies in red and green
      let bal = sfPer(vv, fl, 0.48, 0.62, aav) * up;
      fr = max(fr, bal); trim = mix(vec3f(0.55, 0.05, 0.03), vec3f(0.05, 0.3, 0.12), step(0.5, sfH(vec2f(floor(u / 7.0), 1.0))));
    }
    lit = sfH(vec2f(floor(u / 2.6), floor(vv / fl)));
  } else if (style < 3.5) {   // office, punched
    g0 = 5.0; fl = 3.8;
    let vv = v - g0; let up = step(0.0, vv);
    let w = sfWin(u, vv, 3.05, 2.1, fl, 0.8, 2.25, aau, aav, 0.05);
    glass = w.m * up; fr = w.fr * up * 0.5; wl = w.lp;
    shop = (1.0 - up) * sfPer(u, 9.0, 0.5, 8.5, aau) * sfR(v, 0.2, 4.2, aav);
    trim = wall * 0.75;
    lit = sfH(vec2f(floor(u / 6.1), floor(vv / fl)));
  } else if (style < 4.5) {   // office, ribbon windows
    g0 = 5.0; fl = 3.8;
    let vv = v - g0; let up = step(0.0, vv);
    glass = sfPer(vv, fl, 1.0, 3.3, aav) * up * (1.0 - sfPer(u + 0.03, 1.5, 0.0, 0.06, aau)); wl = vec2f(fract(u / 4.5), (fract(vv / fl) * fl - 1.0) / 2.3);
    shop = (1.0 - up) * sfR(v, 0.2, 4.4, aav);
    lit = sfH(vec2f(floor(u / 4.5), floor(vv / fl)));
  } else if (style < 5.5) {   // curtain wall
    fl = 3.9; g0 = 0.0;
    let mu = sfPer(u + 0.035, 1.5, 0.0, 0.07, aau);
    let spand = sfPer(v, fl, 0.0, 0.85, aav);
    glass = (1.0 - clamp(mu, 0.0, 1.0)) * (1.0 - spand * 0.7); wl = vec2f(fract(u / 4.5), (fract(v / fl) * fl - 0.85) / 3.05);
    fr = clamp(mu, 0.0, 1.0);
    trim = vec3f(0.18, 0.19, 0.2);
    lit = sfH(vec2f(floor(u / 4.5), floor(v / fl)));
  } else if (style < 6.5) {   // brick warehouse: running bond, tall windows with brick arches
    g0 = 4.0; fl = 4.0;
    let bw = 0.23; let bh = 0.075; let row = floor(v / bh); let bu = u / bw + 0.5 * (row % 2.0);
    let mortar = max(1.0 - sfPer(bu, 1.0, 0.04, 0.96, fw.x / bw * 1.5), 1.0 - sfPer(v / bh, 1.0, 0.12, 0.92, fw.y / bh * 1.5));
    let bv = mix(sfH(vec2f(floor(bu), row)), 0.5, smoothstep(0.3, 1.0, fw.x / bw));   // (per-brick tones: their mean once bricks are sub-pixel)
    wall = mix(col.rgb * (0.8 + 0.4 * bv), vec3f(0.33, 0.31, 0.28), mortar * 0.8);
    let vv = v - g0; let up = step(0.0, vv);
    let w = sfWin(u, vv, 3.4, 1.45, fl, 0.9, 2.4, aau, aav, 0.16);
    glass = w.m * up; fr = w.fr * up; trim = col.rgb * 0.7; wl = w.lp;
    shop = (1.0 - up) * sfPer(u, 6.8, 0.6, 6.2, aau) * sfR(v, 0.2, 3.4, aav);
    lit = sfH(vec2f(floor(u / 3.4), floor(vv / fl)));
  } else if (style < 7.5) {   // pier shed: big arch doors, clerestory
    door = sfPer(u, 12.0, 2.0, 10.0, aau) * sfR(v, 0.0, 6.5, aav);
    glass = sfPer(u, 12.0, 1.2, 10.8, aau) * sfR(v, 8.2, 10.4, aav) * (1.0 - sfPer(u + 0.05, 1.2, 0.0, 0.1, aau));
    fr = sfB(v, 7.5, 0.5, aav) + sfPer(u, 12.0, 0.6, 1.4, aau) + sfPer(u, 12.0, 10.6, 11.4, aau);
    lit = 0.9;
  } else if (style < 8.5) {   // blank side wall with a rare small window
    let w = sfWin(u, v - 3.0, 6.0, 0.8, 6.3, 1.0, 1.0, aau, aav, 0.05);
    let keep = step(0.8, sfH(vec2f(floor(u / 6.0), floor((v - 3.0) / 6.3) + 3.0)));
    glass = w.m * keep * step(0.0, v - 3.0);
    wall *= 0.9 + 0.1 * sfN(uv * 0.5);
    lit = 0.5;
  } else {   // Edwardian: flat front, wide windows, a heavy cornice line
    g0 = 3.0; fl = 3.4;
    let vv = v - g0; let up = step(0.0, vv);
    let w = sfWin(u, vv, 2.53, 1.75, fl, 0.7, 2.0, aau, aav, 0.14);
    glass = w.m * up; fr = w.fr * up; wsh = w.sh; wbar = w.bar * up; wsill = w.sill * up; wl = w.lp;
    door = max(sfPer(u, 7.6, 1.0, 3.8, aau) * sfR(v, 0.0, 2.3, aav), sfPer(u, 7.6, 5.4, 6.6, aau) * sfR(v, 0.3, 2.6, aav));
    lit = sfH(vec2f(floor(u / 2.53), floor(vv / fl)));
  }
  // grime: darker toward the street, streaks under the sills
  let grime = (1.0 - smoothstep(0.0, 6.0, v)) * 0.12 + 0.1 * smoothstep(0.55, 0.9, tx.g);
  wall *= 1.0 - grime;
  var c = mix(wall, trim, clamp(fr, 0.0, 1.0));
  var rough = 0.88; var metal = 0.0;
  // doors (painted wood / garage roll-ups)
  let dcol = mix(vec3f(0.05, 0.12, 0.08), vec3f(0.24, 0.07, 0.04), step(0.5, sfH(vec2f(floor(u / 7.6), 5.0))));
  c = mix(c, dcol * (0.8 + 0.2 * sfPer(v, 1.0 / 3.0, 1.0 / 6.0, 1.0 / 3.0, aav)), door);
  // glass: dark, glossy (the sky in it comes from the environment), some with curtains or lit rooms
  // per-window choices (curtains, lit rooms) at their mean once windows shrink to a few pixels (no twinkling far away)
  let litF = smoothstep(0.15, 0.5, max(aau, aav) / 2.5);
  let cur = mix(step(0.62, lit), 0.38, litF);
  let gcol = mix(vec3f(0.012, 0.014, 0.016), vec3f(0.3, 0.26, 0.2), cur * 0.55);
  let g = clamp(max(glass, shop), 0.0, 1.0);
  c = mix(c, trim * 1.08, clamp(wsill, 0.0, 1.0));
  c = mix(c, gcol * mix(1.0, wsh, glass), g);
  c = mix(c, trim * 0.9, wbar);
  rough = mix(rough, mix(0.04, 0.5, cur * 0.6), g * (1.0 - wbar));
  if (style > 4.5 && style < 5.5) {   // curtain wall: coated glass in the building's tint (colour), a mirror (as OFFICE_WGSL's)
    c = mix(vec3f(0.5, 0.52, 0.55), col.rgb * mix(1.0, 0.6, sfPer(v, fl, 0.0, 0.85, aav)), glass); metal = 0.82; rough = mix(0.35, 0.045, glass);
  }
  // night: rooms and shops lit
  let on = mix(step(0.62, fract(lit * 13.7)) * (0.6 + 0.8 * fract(lit * 7.0)), 0.38, litF) * glass;
  // (round 11: the far LOD's rooms at the near rooms' level - SF_ROOM_K x their light, ~0.35 - not 1.4: from the bay and the
  // hills every far front glowed a flat cream at blue hour; the offices' and the curtain walls' light the cool 4000-5000 K)
  // (round 23) each lit room its own light - 2700 / 3000 K bulbs, a cooler LED, a TV's blue now and then (offices: 4000 /
  // 5000 K, a warm floor) - from dim to bright, the ceiling's light high in the window, the floor dark, curtains drawn at
  // the sides of some: not one flat cream panel per window (the near fronts' sfLit / sfRoomFarF); at their mean afar
  let office = style > 2.5 && style < 5.5;
  let t = fract(lit * 29.31); let hl = fract(lit * 53.7);
  var lc = mix(vec3f(1.0, 0.62, 0.34), vec3f(1.0, 0.74, 0.5), step(0.45, t));
  lc = mix(lc, vec3f(0.96, 0.86, 0.72), step(0.78, t)); lc = mix(lc, vec3f(0.42, 0.56, 1.0) * 0.6, step(0.94, t));
  if (office) { lc = mix(mix(vec3f(0.82, 0.9, 1.0), vec3f(0.98, 0.95, 0.86), step(0.45, t)), vec3f(1.0, 0.78, 0.55), step(0.88, hl)); }
  let wq = clamp(wl, vec2f(0.0), vec2f(1.0));
  var wk = (0.55 + 0.75 * smoothstep(0.1, 0.95, wq.y)) * (0.55 + 0.45 * hl);
  if (!office) { wk *= 1.0 - 0.5 * smoothstep(0.3, 0.45, abs(wq.x - 0.5)) * step(0.6, fract(lit * 17.3)); }
  let nf = smoothstep(0.5, 1.0, night) * (1.0 - litF);   // (the rain's half-light keeps round 14's)
  wk = mix(1.0, wk * 1.2, nf);
  let lcm = mix(select(vec3f(1.0, 0.72, 0.42), vec3f(0.9, 0.93, 0.95), office), lc, nf);
  // (round 14: the street's shops bright at night, warm, a few closed: the photos' streets are lit by their windows)
  // (night48) not one flat white panel per shop (0.7 flat: clipped at the night's exposure, the Geary and Market fronts a
  // row of white slabs): each 4.2 m bay its own light (2700 K .. 4000 K, a neon-lit bar now and then) and level, the
  // ceiling's light high and the goods' dark shapes low, the mullions dark, a few closed (a night light)
  let sb = floor(u / 4.2); let sh1 = sfH(vec2f(sb, 7.3 + floor(u / 60.0))); let sh2 = sfH(vec2f(sb, 11.9));
  var scol = mix(vec3f(1.0, 0.68, 0.4), vec3f(1.0, 0.83, 0.64), step(0.4, sh1));
  scol = mix(scol, vec3f(0.86, 0.92, 1.0), step(0.76, sh1));
  scol = mix(scol, mix(vec3f(1.0, 0.3, 0.55), vec3f(0.25, 0.85, 1.0), step(0.5, sh2)), step(0.94, sh1));
  let vy = clamp(v / 3.4, 0.0, 1.0);
  let sfine = 1.0 - smoothstep(0.2, 0.8, max(aau, aav));
  let goods = 1.0 - 0.6 * sfine * smoothstep(0.45, 0.7, sfNf(vec2f(u * 1.4, v * 0.9) + sb * 3.1, max(aau, aav) * 1.4)) * (1.0 - smoothstep(0.45, 0.7, vy));
  let mull = 1.0 - 0.85 * sfPer(u, 2.1, 0.0, 0.07, aau);
  let sopen = step(0.15, fract(lit * 5.3)) * step(0.14, sh2);
  let sk = mix(0.025, (0.16 + 0.2 * sh2) * (0.3 + 0.7 * smoothstep(0.1, 0.95, vy)) * goods, sopen) * mull;
  // (night48) the curtain walls' storey-high panes lit as one: a third of the punched windows' level (a lit floor of them
  // read as flat white slabs down Market St), the troffers' rows across them
  let cwK = select(1.0, 0.3 * (0.75 + 0.5 * sfPer(v, 1.2, 0.0, 0.25, aav)), style > 4.5 && style < 5.5);
  gHE = lcm * (on * night * 0.35 * wk * cwK) + scol * shop * night * sk;
  let wet = bc.g; c *= 1.0 - 0.12 * wet;
  gHK = vec4f(rough, metal, g, 1.0);
  return vec4f(c, 1.0);
}
`,
  wq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fw = fwidth(uv);
  let n = sfN(uv * 0.7) * 0.6 + sfNf(uv * 5.0, max(fw.x, fw.y) * 5.0) * 0.4;
  let c = col.rgb * (0.75 + 0.5 * n);
  gHK = vec4f(0.9, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  pf =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHE = col.rgb * (bc.b * 5.5 + bc.r * 3.0);   // (round 14: the heads bright enough at night to bloom into their halos, as the photos' lamps)
  gHK = vec4f(0.3, 0.0, 0.0, 1.0);
  return vec4f(col.rgb * 0.5, 1.0);
}
`,
  Mq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let st = col.r; let id = col.b;
  let red = id < 0.35; let amb = id >= 0.35 && id < 0.65;
  let lc = select(select(vec3f(0.12, 1.0, 0.62), vec3f(1.0, 0.42, 0.0), amb), vec3f(1.0, 0.05, 0.03), red);
  let on = select(select(step(st, 0.25), step(0.25, st) * step(st, 0.75), amb), step(0.75, st), red);
  gHE = lc * on * 3.2;
  gHK = vec4f(mix(0.45, 0.15, on), 0.0, 0.0, 1.0);   // (unlit: a dull lens, not a mirror of the sky)
  return vec4f(lc * mix(0.02, 0.3, on), 1.0);
}
`,
  Sq = `
// who is home: the lights behind the windows at dusk / night, by building type. Offices light up by the floor (a floor
// mostly on or off, its lit stretch in clusters of a few bays, 22-60 % of the floors by the building, a late worker here
// and there), cool 4000-5000 K fluorescent / LED with a warm 3000 K floor now and then; homes scattered (20-42 % of the
// rooms by the building), warm 2700-3000 K, a TV's blue now and then. fl: the floor, zone: a cluster of bays along the
// floor, room: the room's column, seed: the building. rgb: the light's colour x its level (~1), a: on (0 / 1).
const SF_ROOM_K = 0.45;   // a lit room's level (radiance per unit albedo): bright at blue hour's exposure, never clipped
fn sfLit(fl: f32, zone: f32, room: f32, seed: f32, office: f32, n: f32) -> vec4f {
  let hb = sfH(vec2f(seed * 0.37 + 3.1, 11.9));
  if (office > 0.5) {
    let occ = 0.22 + 0.38 * hb;
    let fOn = step(sfH(vec2f(fl * 1.13 + seed * 5.3, 2.7)), occ);
    let zOn = step(0.28, sfH(vec2f(zone * 1.37 + seed * 0.61, fl * 0.71 + 5.1)));
    let late = step(0.955, sfH(vec2f(room * 1.9 + seed * 17.0, fl * 0.37 + 1.3)));
    let t = sfH(vec2f(seed * 2.3 + fl * 0.013, 7.7));
    let tz = sfH(vec2f(zone + seed, fl + 9.1));
    var col = mix(vec3f(0.82, 0.9, 1.0), vec3f(0.98, 0.95, 0.86), step(0.45, t));   // 5000 K / 4000 K
    col = mix(col, vec3f(1.0, 0.78, 0.55), step(0.86, tz));   // a warm floor (3000 K)
    return vec4f(col * (0.7 + 0.3 * sfH(vec2f(zone, fl + seed))), max(fOn * zOn, late));
  }
  let occ = 0.3 + 0.25 * hb;   // (blue hour: people home)
  let h = sfH(vec2f(room * 1.7 + seed * 0.83, fl * 3.1 + 0.4));
  let t = sfH(vec2f(room + seed * 7.0, fl + 3.3));
  var col = mix(vec3f(1.0, 0.62, 0.34), vec3f(1.0, 0.74, 0.5), step(0.5, t));   // 2700 K / 3000 K
  col = mix(col, vec3f(0.96, 0.86, 0.72), step(0.8, t));   // a cooler LED bulb (3500-4000 K)
  col = mix(col, vec3f(0.42, 0.56, 1.0) * 0.6, step(0.93, t));   // a TV
  var lv = 0.55 + 0.45 * fract(h * 7.3);
  // (round 23) at full night more of the city's mix: LED retrofits (4000 K) and a few cold 5000 K rooms, a lamp alone in a
  // corner (dim) - lit windows read one by one, warm and cool, not a row of one cream (n: the night factor; the rain's
  // half-light keeps the old mix)
  let w2 = fract(t * 7.31 + h * 3.7);
  col = mix(col, mix(vec3f(0.9, 0.9, 0.86), vec3f(0.8, 0.88, 1.0), step(0.75, w2)), step(0.55, w2) * step(t, 0.93) * step(0.5, n));
  lv = mix(lv, lv * (0.45 + 0.55 * step(0.25, fract(h * 13.7))), step(0.5, n));
  return vec4f(col * lv, step(h, occ));
}
// a home's walls: warm white, cream, pale grey, sage, dusty blue, terracotta, a wood-panelled den (not one cream)
fn sfWallC(cell: vec2f, office: f32) -> vec3f {
  if (office > 0.5) { return mix(vec3f(0.6, 0.6, 0.58), vec3f(0.45 + 0.3 * sfH(cell + 2.1), 0.42 + 0.25 * sfH(cell + 5.3), 0.36 + 0.3 * sfH(cell + 8.7)), 0.15); }
  let k = sfH(cell + vec2f(4.3, 1.9));
  var w = vec3f(0.7, 0.68, 0.64);
  if (k < 0.18) { w = vec3f(0.68, 0.62, 0.5); } else if (k < 0.32) { w = vec3f(0.55, 0.56, 0.56); }
  else if (k < 0.44) { w = vec3f(0.46, 0.52, 0.42); } else if (k < 0.54) { w = vec3f(0.42, 0.5, 0.58); }
  else if (k < 0.62) { w = vec3f(0.6, 0.4, 0.3); } else if (k < 0.7) { w = vec3f(0.34, 0.22, 0.13); }
  return w * (0.9 + 0.2 * sfH(cell + 6.1));
}
struct SfFrame { vt: vec3f, mu: f32, mv: f32 };
fn sfFrame(uv: vec2f, wp: vec3f) -> SfFrame {
  let gx = dpdx(uv); let gy = dpdy(uv); let px = dpdx(wp); let py = dpdy(wp);
  let det = gx.x * gy.y - gx.y * gy.x;
  let Tr = (px * gy.y - py * gx.y) / det; let Br = (py * gx.x - px * gy.x) / det;
  let mu = max(length(Tr), 1e-3); let mv = max(length(Br), 1e-3);
  let T = Tr / mu; let B = Br / mv;
  var N = normalize(cross(T, B));
  let V = normalize(F.camPos.xyz - wp);
  if (dot(N, V) < 0.0) { N = -N; }
  return SfFrame(vec3f(dot(V, T), dot(V, B), max(dot(V, N), 0.05)), mu, mv);
}
// f: the point in its room (0..1 across, 0..1 up); cell: the room's id; rs: the room's size in metres (width, height,
// depth); vt: the view in (T, B, N); lod: 0 every detail, 1 the details (planks, troffers, slats, folds, pictures) at their
// average (they shrink under a few pixels: box-filtering them here would cost more than they add); returns rgb, a = lit
fn sfRoomL(f: vec2f, cell: vec2f, rs: vec3f, vt: vec3f, seed: f32, night: f32, office: f32, lod: f32, zone: f32) -> vec4f {
  let dd = 1.0 - lod;
  let h = sfH(cell + vec2f(seed * 13.1, seed * 7.3));
  let rd = vec3f(-vt.x / rs.x, -vt.y / rs.y, -vt.z / rs.z);
  let tx = (select(0.0, 1.0, rd.x > 0.0) - f.x) / rd.x;
  let ty = (select(0.0, 1.0, rd.y > 0.0) - f.y) / rd.y;
  let tz = 1.0 / -rd.z;
  let t = min(min(tx, ty), tz);
  let hp = vec3f(f + rd.xy * t, t * -rd.z);   // hit point (x, y in room units, z depth 0..1)
  // (offices: white and grey walls, a touch of colour; homes: sfWallC)
  let wallC = sfWallC(cell, office);
  var c = wallC;
  if (t == ty) {
    if (rd.y < 0.0) { c = select(mix(vec3f(0.3, 0.19, 0.11), vec3f(0.5, 0.4, 0.3), step(0.6, fract(h * 23.0))), vec3f(0.32, 0.32, 0.34), office > 0.5) * (0.9 + 0.1 * dd * (2.0 * step(0.5, fract(hp.x * 6.0)) - 1.0)); }   // floor (boards / a rug)
    else { c = vec3f(0.62, 0.62, 0.6); if (office > 0.5) { c += vec3f(0.9) * mix(0.08, step(0.8, fract(hp.x * 2.0)) * step(0.6, fract(hp.z * 3.0)), dd); } }   // ceiling (office troffers: bright, never blown)
  } else if (t == tx) { c = wallC * 0.78 * (0.5 + 0.5 * (1.0 - hp.z)) * mix(1.0, 0.8 + 0.2 * step(0.35, fract(hp.z * 2.3 + h)), dd); }   // (a side wall: a door, a cabinet along it)
  else {   // back wall: a picture / a bookcase / a doorway
    let fr = step(abs(hp.x - 0.3 - 0.4 * h), 0.14) * step(abs(hp.y - 0.55), 0.12) * dd;
    c = mix(wallC, vec3f(0.2 + 0.6 * fract(h * 11.0), 0.25, 0.3 + 0.4 * fract(h * 5.0)), fr * step(0.4, h));
    if (office > 0.5) { c = mix(c, vec3f(0.12, 0.13, 0.15), step(hp.y, 0.3)); }   // desks / partitions
    else {
      let bk = step(abs(hp.x - 0.8 + 0.6 * fract(h * 3.7)), 0.13) * step(hp.y, 0.72) * step(0.55, fract(h * 29.0));   // a bookcase
      c = mix(c, vec3f(0.22, 0.14, 0.09) * (0.8 + 0.4 * dd * step(0.5, fract(hp.y * 9.0))), bk);
      let dw = step(abs(hp.x - 0.15 - 0.7 * fract(h * 5.3)), 0.1) * step(hp.y, 0.7) * step(fract(h * 31.0), 0.3);   // a doorway to a darker hall
      c = mix(c, wallC * 0.25, dw);
    }
  }
  // furniture: a sofa / a table / a bed low in the room, dark against the light (homes)
  if (office < 0.5) {
    let fx0 = 0.2 + 0.5 * fract(h * 13.0);
    let sofa = step(abs(hp.x - fx0), 0.18 + 0.1 * fract(h * 3.0)) * step(hp.y, 0.26) * step(0.35, hp.z);
    c = mix(c, vec3f(0.3 + 0.3 * fract(h * 17.0), 0.22 + 0.2 * fract(h * 19.0), 0.18) * 0.45, sofa * step(0.25, fract(h * 37.0)));
  }
  // light: a fitting on the ceiling (or a floor lamp in a corner), its pool falling off over the walls; deeper is dimmer
  let lampP = select(vec3f(0.5, 0.97, 0.55), vec3f(0.15 + 0.7 * step(0.5, fract(h * 43.0)), 0.55, 0.85), office < 0.5 && fract(h * 7.9) < 0.45);
  let dl = (hp - lampP) * vec3f(rs.x, rs.y, rs.z) / 2.2;
  let pool = 1.0 / (1.0 + dot(dl, dl) * 2.2);
  var lvl = mix(1.0 - 0.55 * hp.z, 0.3 + 1.0 * pool, select(0.8, 0.35, office > 0.5));
  let L = sfLit(cell.y, zone, cell.x, seed, office, night);
  let lit = L.a;
  let day = (1.0 - night) * 0.16;
  let nl = night * lit * SF_ROOM_K;
  let warm = L.rgb;
  var rad = c * (day * (1.0 - 0.55 * hp.z) + nl * lvl * warm) + night * (1.0 - lit) * 0.01 * wallC;   // (dark rooms: a trace of the street's light)
  // blinds / curtains (a share of the windows), drawn on the glass
  let bl = fract(h * 41.0);
  if (bl < 0.26) {   // venetian blinds down to a random height, the light through their slats
    let dn = 0.35 + 0.6 * fract(h * 17.0);
    let slat = mix(0.875, 0.75 + 0.25 * step(0.5, fract(f.y * 28.0)), dd);
    rad = mix(rad, vec3f(0.75, 0.72, 0.66) * slat * (day * 1.4 + nl * 0.5 * warm), step(1.0 - dn, f.y));
  } else if (bl < 0.46 && office < 0.5) {   // curtains drawn to the sides
    let op = 0.25 + 0.2 * fract(h * 9.0);
    let cc = vec3f(0.5 + 0.4 * fract(h * 3.0), 0.35 + 0.3 * fract(h * 7.0), 0.3) * (0.85 + 0.15 * dd * sin(f.x * 60.0));
    rad = mix(rad, cc * (day * 1.2 + nl * 0.7 * warm), step(abs(f.x - 0.5), 0.5) * (1.0 - step(abs(f.x - 0.5), op)));
  } else if (bl < 0.6 && office < 0.5) {   // sheer curtains across the window: the room a blur behind them, their folds glowing
    let fold = 0.8 + 0.2 * mix(0.5, 0.5 + 0.5 * sin(f.x * 70.0 + h * 9.0), dd);
    rad = mix(rad, vec3f(0.85, 0.82, 0.76) * fold * (day * 1.3 + nl * 0.85 * warm) + rad * 0.3, 0.72);
  } else if (bl < 0.68 && office < 0.5) {   // a roller shade half down
    let dn = 0.3 + 0.4 * fract(h * 21.0);
    rad = mix(rad, vec3f(0.8, 0.76, 0.66) * (day * 1.2 + nl * 0.45 * warm), step(1.0 - dn, f.y));
  }
  return vec4f(rad, lit);
}
// the room's look from afar (no geometry: one light per room, so a room smaller than a few pixels cannot sparkle), shaded
// across the window f (0..1: the ceiling light's glow high, the floor dark, the curtains' edges) so it never reads as a flat
// panel
fn sfRoomFar(cell: vec2f, seed: f32, night: f32, office: f32, zone: f32) -> vec4f {
  let L = sfLit(cell.y, zone, cell.x, seed, office, night);
  return vec4f(sfWallC(cell, office) * 0.72 * ((1.0 - night) * 0.16 + night * L.a * SF_ROOM_K * L.rgb), L.a);
}
fn sfRoomFarF(cell: vec2f, f: vec2f, seed: f32, night: f32, office: f32, zone: f32) -> vec4f {
  let r = sfRoomFar(cell, seed, night, office, zone);
  let h = sfH(cell + vec2f(seed * 13.1, seed * 7.3));
  let ff = clamp(f, vec2f(0.0), vec2f(1.0));
  var k = 0.55 + 0.75 * smoothstep(0.1, 0.95, ff.y);   // the ceiling's light high, the floor low
  if (office > 0.5) {   // an office: the troffers' bright ceiling strip, the desks and partitions dark below, the far wall between
    k = 0.3 + 0.35 * smoothstep(0.3, 0.6, ff.y) + 0.9 * smoothstep(0.78, 0.92, ff.y);
    k *= 0.75 + 0.25 * step(0.5, fract(ff.x * 2.0 + h));   // (desk clusters and a partition)
  } else { k *= 1.0 - 0.45 * smoothstep(0.28, 0.5, abs(ff.x - 0.5)) * step(0.26, fract(h * 41.0)) * step(fract(h * 41.0), 0.46); }   // curtains at the sides
  return vec4f(r.rgb * k, r.a);
}
// p: metres on the glass plane (x along the facade, y up), rooms on a regular grid of rs
fn sfRoom(p: vec2f, vt: vec3f, seed: f32, night: f32, office: f32, lod: f32) -> vec4f {
  let rs = select(vec3f(3.6, 3.3, 4.5), vec3f(4.5, 3.8, 7.0), office > 0.5);
  return sfRoomL(fract(p / rs.xy), floor(p / rs.xy), rs, vt, seed, night, office, lod, 0.0);
}
`;
