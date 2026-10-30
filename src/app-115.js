// app 115 — light
// Lines 83579-83900 of readable/app.pretty.js (statement-aligned).
var we = {
    precast: 0,
    sfskin: 1,
    coit: 2,
    granite: 3,
    grace: 4,
    terracotta: 5,
    greentile: 6,
    perforated: 7,
    redbeam: 8,
    bronze: 9,
    polgranite: 10,
    stucco: 11,
    lawn: 12,
    copper: 13,
    slate: 14,
    stainedglass: 15,
  },
  ln = {
    TILE: 0,
    TAPY: 1,
    HOTEL: 2,
    SFT: 3,
    OFFICE: 4,
    LIGHT: 5,
    GLASS: 6,
    ELEV: 7,
    PAINT: 8,
    LED: 9,
    ROSE: 10,
    WIN: 11,
    FLOOD: 12,
    BAYS: 13,
    SPIRE: 14,
  },
  zl = (o, t = 1, e = t, s = 0) => [t, e, s / 256, jP(ln.FLOOD, o)],
  rj = (o, t, e, s) => [t, e / 16, s / 256, jP(ln.SPIRE, o)],
  Ct = {
    matte: 0,
    gloss: 1,
    metal: 2,
    gold: 3,
    glass: 4,
    stone: 5,
    leaf: 6,
    water: 7,
  },
  Jb = { rose: 0, doors: 1, sspp: 2, store: 3 },
  jP = (o, t) => (o * 16 + t + 0.5) / 256,
  Tn = (o, t, e = 1, s = e, n = e) => [e, s, n, jP(o, t)],
  We = (o, t = 1, e = t, s = t) => Tn(ln.TILE, o, t, e, s),
  Lt = (o, t, e, s) => Tn(ln.PAINT, o, t, e, s),
  wn = (o, t, e) => Tn(ln.LIGHT, 0, o, t, e),
  Hk = (o, t, e) => Tn(ln.LIGHT, 1, o, t, e),
  S1t = (o) =>
    mw +
    `
fn lmH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn lmN(p: vec2f) -> f32 { let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(lmH(i), lmH(i + vec2f(1.0, 0.0)), u.x), mix(lmH(i + vec2f(0.0, 1.0)), lmH(i + vec2f(1.0, 1.0)), u.x), u.y); }
fn lmB(x: f32, a: f32, b: f32, aa: f32) -> f32 { return clamp(min(x - a, b - x) / aa + 0.5, 0.0, 1.0); }
// metres per tile repeat, roughness
var<private> LM_SC: array<f32, 16> = array<f32, 16>(3.0, 2.4, 3.2, 4.8, 3.6, 3.0, 2.2, 2.6, 2.4, 1.6, 1.8, 3.0, 3.0, 3.0, 2.0, 1.6);
var<private> LM_RO: array<f32, 16> = array<f32, 16>(0.72, 0.4, 0.85, 0.75, 0.82, 0.45, 0.35, 0.5, 0.5, 0.45, 0.28, 0.85, 0.95, 0.6, 0.7, 0.2);
fn lmTile(cell: f32, s: vec2f, gx: vec2f, gy: vec2f) -> vec4f {
  let cx = cell - 4.0 * floor(cell / 4.0); let cy = floor(cell / 4.0);
  let k = 480.0 / 2048.0; let o = 16.0 / 2048.0;
  let f = fract(vec2f(s.x, -s.y));
  let a = vec2f(cx, cy) * 0.25 + o + f * k;
  return textureSampleGrad(matMap, matSamp, a, gx * k, -gy * k);
}
// a lit room behind the glass (interior mapping, after city/shaders.js sfRoom): p metres on the glass, vt view in (T, B, N)
fn lmRoom(p: vec2f, vt: vec3f, seed: f32, night: f32, rs: vec3f, warmK: f32) -> vec3f {
  let cell = floor(p / rs.xy); let f = fract(p / rs.xy);
  let h = lmH(cell + vec2f(seed * 13.1, seed * 7.3));
  let rd = vec3f(-vt.x / rs.x, -vt.y / rs.y, -max(vt.z, 0.05) / rs.z);
  let tx = (select(0.0, 1.0, rd.x > 0.0) - f.x) / rd.x;
  let ty = (select(0.0, 1.0, rd.y > 0.0) - f.y) / rd.y;
  let tz = 1.0 / -rd.z;
  let t = min(min(tx, ty), tz);
  let hp = vec3f(f + rd.xy * t, t * -rd.z);
  let wallC = mix(vec3f(0.62, 0.58, 0.5), vec3f(0.45 + 0.3 * lmH(cell + 2.1), 0.42 + 0.25 * lmH(cell + 5.3), 0.36 + 0.3 * lmH(cell + 8.7)), 0.5);   // (as city/shaders.js sfRoomL: no pastel paint chips)
  var c = wallC;
  if (t == ty) { if (rd.y < 0.0) { c = vec3f(0.3, 0.26, 0.22); } else { c = vec3f(0.85) + vec3f(1.2) * step(0.8, fract(hp.x * 2.0)) * step(0.6, fract(hp.z * 3.0)); } }
  else if (t == tx) { c = wallC * 0.8; }
  else { c = mix(wallC, vec3f(0.12, 0.13, 0.15), step(hp.y, 0.3)); }
  let lit = step(0.5, fract(h * 23.7));
  let warm = mix(vec3f(0.95, 0.95, 0.9), vec3f(1.0, 0.75, 0.48), step(1.0 - warmK, fract(h * 5.1)));
  // a lit room at the city's level (city/shaders.js SF_ROOM_K 0.45: bright at blue hour's exposure, never clipped; 2.0
  // blew the hotels' windows out to flat white)
  var rad = c * (1.0 - 0.55 * hp.z) * ((1.0 - night) * 0.14 + night * lit * 0.5 * (0.7 + 0.6 * fract(h * 3.3)) * warm);
  if (fract(h * 41.0) < 0.3) { let dn = 0.3 + 0.6 * fract(h * 17.0); rad = mix(rad, vec3f(0.75, 0.72, 0.66) * (0.2 * (1.0 - night) + night * lit * 0.9 * warm), step(1.0 - dn, f.y)); }
  return rad;
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let id = floor(col.a * 256.0);
  let mode = floor(id / 16.0); let cell = id - mode * 16.0;
  let tint = col.rgb;
  let night = bc.b; let wet = bc.g;
  let gx = dpdx(uv); let gy = dpdy(uv);
  let fw = max(abs(gx) + abs(gy), vec2f(1e-4));
  let px = dpdx(wp); let py = dpdy(wp);
  let V = normalize(F.camPos.xyz - wp);
  let dist = length(F.camPos.xyz - wp);
  // the surface frame (u, v) from the derivatives (for the windows' parallax)
  let det = gx.x * gy.y - gx.y * gy.x;
  let Tr = (px * gy.y - py * gx.y) / det; let Br = (py * gx.x - px * gy.x) / det;
  let Tu = Tr / max(length(Tr), 1e-4); let Bv = Br / max(length(Br), 1e-4);
  var N = normalize(cross(Tu, Bv)); if (dot(N, V) < 0.0) { N = -N; }
  let vt = vec3f(dot(V, Tu), dot(V, Bv), max(dot(V, N), 0.05));
  let hasTex = textureDimensions(matMap).x > 4u;
  var c = tint; var rough = 0.8; var metal = 0.0; var emit = vec3f(0.0);
  let sc = LM_SC[u32(min(cell, 15.0))];
  var tc = vec4f(0.8, 0.8, 0.8, 1.0);
  if (hasTex) { tc = lmTile(cell, uv / sc, gx / sc, gy / sc); }
  // distance: tiles fade to their mean (no shimmer)
  if (mode < 0.5) {
    c = tc.rgb * tint; rough = LM_RO[u32(cell)];
    if (cell == 12.0) { c = sfLawn(c, wp); }   // (round 22: the mowed lawns, city/ground_wgsl.js LAWN_WGSL)
    if (cell == 13.0) { metal = 0.3; }
    if (cell == 9.0) { metal = 0.7; }
    if (cell == 15.0) { emit = tc.rgb * night * 1.4; c *= 0.4; }
    if (cell == 7.0) { let l = dot(tc.rgb, vec3f(0.33)); emit = vec3f(1.0, 0.85, 0.65) * smoothstep(0.45, 0.2, l) * night * 1.6; }
  } else if (mode > 13.5) {
    // (polish) the Transamerica's spire: aluminium panels washed by the uplights on the top floor's roof and lit round
    // the crown lantern near the tip - a gradient up it, its panel joints and fins drawn (the flood tile's 0.55 of the
    // albedo blew it out to a flat white cone against the night sky). uv: u metres across the face, v metres up
    let H = tint.b * 256.0; let hb = tint.g * 16.0; let t = clamp(uv.y / max(H, 1.0), 0.0, 1.0);
    let hwv = max(mix(hb, 0.3, t), 0.05);
    let uu = clamp(uv.x / hwv, -1.0, 1.0);
    c = tc.rgb * tint.r * vec3f(1.0, 0.99, 0.97); rough = 0.5; metal = 0.25;
    let dk = 1.0 - smoothstep(180.0, 700.0, dist);   // (the joints fade to their mean far off: no shimmer)
    let joint = (1.0 - lmB(fract(uv.y / 2.667), 0.05, 0.95, fw.y / 2.667 * 1.5)) * dk;
    let fin = (1.0 - lmB(fract((uu + 1.0) * 2.0), 0.07, 0.93, fw.x / hwv * 3.0)) * dk;
    c *= (1.0 - 0.3 * joint) * (1.0 - 0.2 * fin);
    let wash = 0.18 + 0.82 * exp(-uv.y / 16.0);
    let halo = exp(-abs(uv.y - (H - 14.0)) / 3.0) * 0.8;
    let lum = (wash * (1.0 - 0.5 * uu * uu) + halo) * (1.0 - 0.6 * joint) * (1.0 - 0.35 * fin);
    emit = c * vec3f(1.0, 0.88, 0.7) * night * 0.14 * lum;
  } else if (mode > 12.5) {
    // 555 California: carnelian granite piers and dark glass in narrow vertical strips (u: metres along the sawtooth
    // bays, 1.7 m a facet), a thin spandrel at every 3.9 m floor
    let gr = tc.rgb * tint;
    let fu = fract(uv.x / 1.7); let fv = fract(uv.y / 3.9) * 3.9;
    let glass = lmB(fu, 0.22, 0.78, fw.x / 1.7 * 1.5) * lmB(fv, 0.45, 3.9, fw.y * 1.5);
    c = mix(gr, vec3f(0.018, 0.017, 0.016), glass);
    rough = mix(0.22, 0.04, glass); metal = 0.0;
    let room = lmRoom(uv, vt, 13.0, night, vec3f(3.4, 3.9, 6.0), 0.4);
    let far = smoothstep(300.0, 900.0, dist);
    let fl = floor(uv.y / 3.9); let fh = lmH(vec2f(fl, floor(uv.x / 10.0)));
    emit = mix(room, step(0.5, fh) * night * 1.3 * vec3f(1.0, 0.9, 0.75), far) * glass * (1.0 - pow(1.0 - vt.z, 5.0));
  } else if (mode > 11.5) {
    // floodlit masonry (Coit Tower, the Transamerica's spire, the church towers): the tile, washed by uplights at night,
    // brighter toward the foot of the flood (col.b > 0: its height / 256 above uv.y = 0)
    c = tc.rgb * vec3f(tint.r, tint.g, tint.r); rough = LM_RO[u32(cell)];
    let fl = select(1.0, 1.0 - 0.55 * clamp(uv.y / max(tint.b * 256.0, 1.0), 0.0, 1.0), tint.b > 0.0);
    emit = c * vec3f(1.0, 0.86, 0.66) * night * 0.55 * fl;
  } else if (mode < 1.5) {
    // Transamerica: precast faces, a column of windows every 1.52 m, floors of 3.96 m from v = 16; col.rgb = the face's
    // half width at v = 0 / 64, at the top / 64, height / 256 (no windows closer than 0.9 m to the sloping edges)
    let base = tint.r * 64.0; let top = tint.g * 64.0; let H = tint.b * 256.0;
    let hwv = base + (top - base) * clamp(uv.y / H, 0.0, 1.0);
    c = tc.rgb * vec3f(0.93, 0.92, 0.89); rough = 0.7;
    let bu = uv.x / 1.52 + 0.5; let fu = fract(bu) * 1.52; let fv = fract((uv.y - 16.0) / 3.96) * 3.96;
    let inWin = lmB(fu, 0.34, 1.18, fw.x * 1.5) * lmB(fv, 1.0, 3.0, fw.y * 1.5) * step(16.0, uv.y) * step(abs(floor(bu) * 1.52), hwv - 1.1);
    // the reveal: the glass 0.25 m in, its jamb shadow toward the light
    let o = -vt.xy / vt.z * 0.25;
    let inG = lmB(fu + o.x, 0.34, 1.18, fw.x * 1.5) * lmB(fv + o.y, 1.0, 3.0, fw.y * 1.5);
    let glass = inWin * inG;
    c = mix(c, c * 0.4, inWin * (1.0 - inG));
    // (round 19) the precast's ribs: the piers between the window columns stand proud (lit), the spandrels under each
    // window recessed (in shade): the photos' vertical striping, which the flat precast lost
    let rib = lmB(fu, 0.24, 1.28, fw.x * 1.5); c *= 1.0 - 0.16 * rib * step(16.0, uv.y) * step(abs(floor(bu) * 1.52), hwv - 1.1);
    c = mix(c, vec3f(0.035, 0.042, 0.05), glass);
    let near = 1.0 - smoothstep(250.0, 700.0, dist);
    let room = lmRoom(vec2f(uv.x, uv.y - 16.0) + o, vt, cell + 3.0, night, vec3f(3.04, 3.96, 6.0), 0.2);
    let fl = floor((uv.y - 16.0) / 3.96); let fh = lmH(vec2f(fl, floor(uv.x / 9.0) + tint.r * 99.0));
    let farLit = step(0.4, fh) * night * 1.6 * vec3f(1.0, 0.95, 0.85);
    emit = mix(farLit * 0.8, room, near) * glass * (1.0 - pow(1.0 - vt.z, 5.0));
    rough = mix(rough, 0.06, glass);
    // (round 18) far off, the windows' columns average the precast to the photos' light grey (it stood a white sliver from Columbus)
    c = mix(c, c * 0.68, smoothstep(200.0, 900.0, dist) * (1.0 - glass));
  } else if (mode < 2.5) {
    // the Fairmont: white glazed-terracotta ashlar (fine joints, a rusticated base), tall sash windows 2.2 m apart on floors
    // of 3.7 m above a 7 m base, white sash bars, moulded surrounds with a hood over every other floor, pilaster strips
    // between the window pairs (u from the facade's corner)
    c = tc.rgb * tint; rough = 0.45;
    let fu = fract(uv.x / 2.2) * 2.2; let fv = fract((uv.y - 7.2) / 3.7) * 3.7; let flr = floor((uv.y - 7.2) / 3.7);
    let up = step(7.2, uv.y);
    let joint = (1.0 - lmB(fract(uv.y / 0.62) * 0.62, 0.03, 0.6, fw.y * 1.5)) * (1.0 - smoothstep(0.02, 0.06, fw.y));
    c *= 1.0 - 0.12 * joint * up;
    let win = lmB(fu, 0.55, 1.65, fw.x * 1.5) * lmB(fv, 0.8, 2.95, fw.y * 1.5) * up;
    let sur = lmB(fu, 0.4, 1.8, fw.x) * lmB(fv, 0.62, 3.12, fw.y) * up - win;
    let hood = lmB(fu, 0.3, 1.9, fw.x) * lmB(fv, 3.12, 3.34, fw.y) * up * step(0.5, fract(flr * 0.5));
    let pil = (1.0 - lmB(fract(uv.x / 4.4) * 4.4, 0.18, 4.22, fw.x)) * up;
    c = mix(c, c * 1.1, sur); c = mix(c, c * 0.72, hood * 0.8); c = mix(c, c * 0.9, pil * 0.6);
    let o = -vt.xy / vt.z * 0.22;
    let inG = lmB(fu + o.x, 0.55, 1.65, fw.x * 1.5) * lmB(fv + o.y, 0.8, 2.95, fw.y * 1.5);
    let glass = win * inG;
    c = mix(c, c * 0.45, win * (1.0 - inG));
    let sash = max(1.0 - lmB(fu, 0.58, 1.62, fw.x), max(lmB(fu, 1.07, 1.13, fw.x), lmB(fv, 1.84, 1.92, fw.y)));
    c = mix(c, mix(vec3f(0.07, 0.08, 0.09), vec3f(0.14, 0.16, 0.19), smoothstep(0.0, 1.0, vt.y * 0.5 + 0.5)), glass);
    c = mix(c, tc.rgb * 0.95, glass * sash);
    let room = lmRoom(uv + o, vt, 7.0, night, vec3f(2.2, 3.7, 5.0), 0.8);
    emit = room * glass * (1.0 - sash) * (1.0 - pow(1.0 - vt.z, 5.0));
    // the rusticated base: deep horizontal channels every 0.62 m
    c *= 1.0 - 0.3 * joint * (1.0 - up) * step(0.4, uv.y);
    // the base: tall arched openings every 6.6 m (the lobby, lit at night)
    // (round 27: they drew as flat brown slabs, the tree's shadow across them - the desktop's first pickup) a moulded
    // archivolt round each, a 0.35 m stone reveal in parallax, bronze-framed glazing (mullions, a transom at the spring)
    // over the lit lobby
    let bf = fract(uv.x / 6.6) * 6.6; let low = step(0.4, uv.y) * (1.0 - up);
    let ar = vec2f(bf - 3.3, max(0.0, uv.y - 3.2)); let rr = length(ar);
    let archO = lmB(bf, 1.35, 5.25, fw.x) * step(uv.y, 3.2 + sqrt(max(0.0, 3.8 - (bf - 3.3) * (bf - 3.3)))) * low;
    let arch = lmB(bf, 1.6, 5.0, fw.x) * step(uv.y, 3.2 + sqrt(max(0.0, 2.89 - (bf - 3.3) * (bf - 3.3)))) * low;
    c = mix(c, c * 1.12, (archO - arch) * (0.6 + 0.4 * step(0.8, abs(ar.x) / max(rr, 0.01) + step(uv.y, 3.2))));   // the archivolt
    let oR = -vt.xy / max(vt.z, 0.08) * 0.35; let bi = bf + oR.x; let yi = uv.y + oR.y;
    let inA = lmB(bi, 1.6, 5.0, fw.x) * step(yi, 3.2 + sqrt(max(0.0, 2.89 - (bi - 3.3) * (bi - 3.3)))) * step(0.4, yi);
    let reveal = arch * (1.0 - inA);
    let gA = arch * inA;
    let mul = max(max(lmB(fract((bi - 1.6) / 0.85) * 0.85, -0.04, 0.04, fw.x) + lmB(fract((bi - 1.6) / 0.85) * 0.85, 0.81, 0.89, fw.x), lmB(yi, 3.15, 3.27, fw.y)), lmB(yi, 0.4, 0.62, fw.y));
    let lobby = lmRoom(vec2f(bi, yi) * 0.6, vt, 11.0, 1.0, vec3f(3.4, 5.0, 6.0), 0.9);
    c = mix(c, c * 0.5, reveal);
    c = mix(c, mix(vec3f(0.04, 0.045, 0.05) + lobby * 0.12, vec3f(0.11, 0.09, 0.06), mul), gA);
    emit += gA * (1.0 - mul) * (lobby * (0.03 + night * 1.2) + vec3f(1.0, 0.75, 0.45) * night * 0.4);
    rough = mix(rough, mix(0.06, 0.4, mul), gA);
    rough = mix(rough, 0.08, glass * (1.0 - sash));
  } else if (mode < 3.5) {
    // Salesforce Tower: floor-to-ceiling glass, pearlescent white vertical fins every 1.52 m and a white sunshade band at
    // every floor (4.15 m); u metres around the tower
    let sk = tc.rgb;
    let fu = fract(uv.x / 1.52); let fv = fract(uv.y / 4.15) * 4.15;
    let aaU = fw.x / 1.52 * 1.5;
    let fin = 1.0 - lmB(fu, 0.07, 0.93, aaU);
    let band = 1.0 - lmB(fv, 0.55, 3.75, fw.y * 1.5);
    let white = max(fin, band);
    let far = smoothstep(300.0, 1400.0, dist);
    let w2 = mix(white, 0.42, far);   // far: the average of the skin
    let o = -vt.xy / vt.z * 0.5;
    let room = lmRoom(uv + o, vt, 11.0, night, vec3f(4.56, 4.15, 9.0), 0.1);
    let glassC = vec3f(0.26, 0.31, 0.36) * (0.9 + 0.2 * lmN(uv / vec2f(9.0, 30.0)));
    c = mix(glassC, sk * vec3f(0.95, 0.95, 0.93) * 1.05, w2);
    rough = mix(0.04, 0.3, w2); metal = mix(0.35, 0.25, w2);
    let fl = floor(uv.y / 4.15); let fh = lmH(vec2f(fl, floor(uv.x / 4.56)));
    let farLit = step(0.62, fh) * night * (0.7 + 0.9 * fract(fh * 7.3)) * vec3f(0.95, 0.96, 1.0);
    emit = mix(room, farLit * 0.7, far) * (1.0 - w2) * (1.0 - pow(1.0 - vt.z, 5.0));
  } else if (mode < 4.5) {
    // plain office tower (the Fairmont's tower, the Transit Center's glass): ribbon windows, floors of 3.3 m
    let fv = fract(uv.y / 3.3) * 3.3; let fu = fract(uv.x / 1.5);
    let glass = lmB(fv, 1.05, 3.05, fw.y * 1.5) * lmB(fu, 0.04, 0.96, fw.x / 1.5 * 1.5);
    c = mix(tc.rgb * tint, vec3f(0.07, 0.085, 0.1), glass); rough = mix(0.7, 0.06, glass);
    let room = lmRoom(uv, vt, 5.0 + cell, night, vec3f(4.5, 3.3, 6.0), 0.3);
    emit = room * glass * (1.0 - pow(1.0 - vt.z, 5.0));
  } else if (mode < 5.5) {
    // a light: its colour glows at night (and a little by day: bc.r)
    // cell 1: a paper lantern (its colour by day, a softer glow at night)
    if (cell > 0.5) { c = tint / max(max(tint.r, max(tint.g, tint.b)), 1e-3) * 0.5; rough = 0.8; emit = tint * night * 1.6; }
    else { c = tint * 0.35; rough = 0.3; emit = tint * (night * 7.0 + bc.r * 1.5); }
  } else if (mode < 6.5) {
    // stained glass: dark by day, lit from inside at night
    c = tc.rgb * tint * 0.3; rough = 0.08;
    emit = tc.rgb * tint * (0.04 + night * 2.2);
  } else if (mode < 7.5 || (mode > 9.5 && mode < 10.5)) {
    // an elevation image (uv 0..1 over the cell of elev.webp)
    let ex = cell - 2.0 * floor(cell / 2.0); let ey = floor(cell / 2.0);
    let a = (vec2f(ex, ey) + clamp(vec2f(uv.x, 1.0 - uv.y), vec2f(0.002), vec2f(0.998))) * 0.5;
    var t = vec4f(0.7);
    if (textureDimensions(matExtra).x > 4u) { t = textureSampleGrad(matExtra, matSamp, a, gx * vec2f(0.5, -0.5), gy * vec2f(0.5, -0.5)); }
    c = t.rgb * tint; rough = 0.6;
    if (cell == 1.0) { metal = 0.85; rough = 0.35; }
    if (mode > 9.5) {   // the rose window: the saturated glass glows at night
      let mx = max(t.r, max(t.g, t.b)); let mn = min(t.r, min(t.g, t.b));
      let sat = (mx - mn) / (mx + 1e-3);
      let g = smoothstep(0.25, 0.5, sat) * step(length(uv - 0.5), 0.49);
      emit = t.rgb * g * (0.05 + night * 3.0); c = mix(c, c * 0.4, g); rough = mix(rough, 0.1, g);
    }
  } else if (mode < 8.5) {
    // plain paint / materials by preset
    c = tint;
    if (cell < 0.5) { rough = 0.6; }
    else if (cell < 1.5) { rough = 0.3; }
    else if (cell < 2.5) { rough = 0.3; metal = 1.0; }
    else if (cell < 3.5) { rough = 0.22; metal = 1.0; c = tint * (0.85 + 0.3 * lmN(uv * 4.0)); }
    else if (cell < 4.5) { rough = 0.05; }
    else if (cell < 5.5) { rough = 0.85; c = tint * (0.85 + 0.3 * lmN(uv * 1.3)); }
    else if (cell < 6.5) { rough = 0.9; c = tint * (0.6 + 0.8 * lmN(uv * 2.5 + wp.xz * 0.3)); }
    else { rough = 0.04; }
  } else if (mode < 9.5) {
    // Salesforce Tower's crown screen: 11,000 LEDs behind the lattice; a slow drifting pattern at night (static)
    let p = uv / vec2f(40.0, 30.0);
    let n = lmN(p * 3.0 + vec2f(3.0, 1.0)) * 0.6 + lmN(p * 9.0) * 0.4;
    let led = mix(vec3f(0.9, 0.95, 1.0), vec3f(0.35, 0.6, 1.0), smoothstep(0.3, 0.7, n));
    c = vec3f(0.34, 0.37, 0.4) * (1.0 - 0.8 * night); rough = 0.3;
    emit = led * (0.02 + night * 2.2) * (0.6 + 0.6 * n);
  } else {
    // mode 11: punched windows in a wall tile (church offices, hotel wings, shops): 2.6 m bays, 3.4 m floors above 4 m;
    // the reveal (glass 0.18 m in, its jamb and head in shade) and a stone sill (1.1 m wide windows read as a blank wall)
    c = tc.rgb * tint; rough = LM_RO[u32(cell)];
    let fu = fract(uv.x / 2.6) * 2.6; let fv = fract((uv.y - 4.0) / 3.4) * 3.4; let up = step(4.0, uv.y);
    let win = lmB(fu, 0.55, 2.05, fw.x * 1.5) * lmB(fv, 0.7, 2.8, fw.y * 1.5) * up;
    let sill = lmB(fu, 0.45, 2.15, fw.x * 1.5) * lmB(fv, 0.55, 0.7, fw.y * 1.5) * up;
    let o = -vt.xy / vt.z * 0.18;
    let inG = lmB(fu + o.x, 0.55, 2.05, fw.x * 1.5) * lmB(fv + o.y, 0.7, 2.8, fw.y * 1.5);
    let glass = win * inG;
    c = mix(c, c * 1.12, sill); c = mix(c, c * 0.5, win * (1.0 - inG)); c = mix(c, vec3f(0.05, 0.055, 0.06), glass); rough = mix(rough, 0.08, glass);
    emit = lmRoom(uv + o, vt, 9.0, night, vec3f(2.6, 3.4, 5.0), 0.8) * glass * (1.0 - pow(1.0 - vt.z, 5.0));
  }
  c *= 1.0 - 0.18 * wet;
  ${
    o
      ? `
  // far away (Sutro Tower, Twin Peaks): the material skips the scene's fog; a lighter aerial perspective here
  let k = 1.0 - exp(-pow(dist * F.fogP.z * ${o.toFixed(3)}, 2.0));
  c *= 1.0 - k; emit = emit * (1.0 - k * 0.6) + F.fog.rgb * k * 1.1 / max(F.camPos.w, 0.3);`
      : ""
  }
  gHE = emit;
  gHK = vec4f(clamp(rough, 0.03, 1.0), metal, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  gw = null;
