// app 95 — rpt
// Lines 77325-77926 of readable/app.pretty.js (statement-aligned).
var RP = (o = null) => o0 + Sq + Tpt(o) + Rpt,
  Rpt = `
// the cell's uv painted over (dress.js replaces what was there): the source point in the cell, z = 1 where smeared (no
// glass there: a streak of a window row lit at night read as a neon bar)
fn sfErase(gq: f32, cell: f32, p: vec2f) -> vec3f {
  if (gq < 0.5) { return vec3f(p, 0.0); }
  let k = u32(gq - 1.0) * 32u + u32(cell);
  if (k >= SF_ERN) { return vec3f(p, 0.0); }
  let e = SF_ERI[k]; let a = e & 65535u; let n = e >> 16u;
  var q = vec3f(p, 0.0);
  for (var i = 0u; i < n; i++) {
    let r = SF_ERR[a + i];
    if (p.x >= r.x && p.x <= r.z && p.y >= r.y && p.y <= r.w) {
      let d = SF_ERD[a + i];
      q = vec3f(clamp(p.x + d.x, 0.004, 0.996), clamp(select(p.y + d.y, r.w + d.y, d.z > 0.5), 0.003, 0.997), d.z);
    }
  }
  return q;
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let gq = floor(col.a * 0.5); let ca = col.a - 2.0 * gq;   // (+ 2 x (group + 1): the dressing's painted-over regions)
  let code = floor(ca * 64.0);   // stored as (cell + 32 x shop + 0.5) / 64
  let shop = step(31.5, code); let cell = code - 32.0 * shop;
  let dim = vec2f(textureDimensions(matMap));
  let rows = max(1.0, round(dim.y / (dim.x * 0.3)));   // (cells 2:3, five across)
  let cx = cell - 5.0 * floor(cell / 5.0); let cy = floor(cell / 5.0);
  let fr = sfFrame(uv, wp);
  let du = dpdx(uv); let dv = dpdy(uv);
  let gdx = du * vec2f(0.2, -1.0 / rows); let gdy = dv * vec2f(0.2, -1.0 / rows);
  let lp = sfErase(gq, cell, vec2f(fract(uv.x), uv.y)); let smear = select(0.0, lp.z, uv.y >= 0.0);
  let lu = lp.x; let lv = select(uv.y, lp.y, uv.y >= 0.0);
  let a = vec2f((cx + clamp(lu, 0.004, 0.996)) / 5.0, (cy + 1.0 - clamp(lv, 0.003, 0.997)) / rows);
  let t = textureSampleGrad(matMap, matSamp, a, gdx, gdy);
  var c = t.rgb * col.rgb;
  let win = textureSampleGrad(matExtra, matSamp, a, gdx * 3.0 + vec2f(0.0008, 0.0), gdy * 3.0 + vec2f(0.0, 0.0008)).r * (1.0 - smear);   // the opening at the wall's face (the mask softened: no speckle)
  // the window this texel belongs to: its centre in the cell (u, v up; the mask's G / B, dilated past the opening so the
  // unfiltered level never mixes two windows)
  let ctr = textureSampleLevel(matExtra, matSamp, a, 0.0).gb;
  let night = bc.b; let wet = bc.g;
  var rough = 0.85; var emit = vec3f(0.0); var gz = 0.0;
  // (round 19) weathering: the generated photos are clean, SF's fronts are not (the 40 chase frames against the photos).
  // Rain streaks washed down from the sills (the window mask 0.45 m and 1.1 m above, run down in thin vertical streaks),
  // the sill's lit top, and a patina by building: a mottle over the wall in world metres, darker and browner, its amount
  // the building's own (the photo colour's tint: per building and lot)
  if (lv >= 0.0 && smear < 0.5) {
    let bs = sfH(floor(col.rg * 997.0));
    let vA = (cy + 1.0) / rows;
    let w1 = textureSampleLevel(matExtra, matSamp, vec2f(a.x, vA - clamp(lv + 0.45 / fr.mv, 0.003, 0.997) / rows), 2.0).r;
    let w2 = textureSampleLevel(matExtra, matSamp, vec2f(a.x, vA - clamp(lv + 1.1 / fr.mv, 0.003, 0.997) / rows), 2.0).r;
    let ws = textureSampleLevel(matExtra, matSamp, vec2f(a.x, vA - clamp(lv + 0.08 / fr.mv, 0.003, 0.997) / rows), 1.0).r;
    let open = 1.0 - smoothstep(0.1, 0.4, win);
    let sx = lu * fr.mu + floor(uv.x) * 7.3;
    let st = smoothstep(0.42, 0.85, sfN(vec2f(sx * 6.5, lv * fr.mv * 0.4))) * (0.55 + 0.45 * sfN(vec2f(sx * 1.7, 3.0)));
    let streak = st * max(w1, 0.65 * w2) * open;
    let mot = sfN(vec2f((wp.x + wp.z) * 0.45, wp.y * 0.45)) * 0.6 + sfN(vec2f((wp.x - wp.z) * 1.7, wp.y * 1.9)) * 0.4;
    let pat = (0.35 + 0.65 * bs) * smoothstep(0.35, 0.8, mot);
    c *= (1.0 - (0.3 + 0.15 * bs) * streak) * (1.0 - 0.16 * pat) * (1.0 - 0.1 * smoothstep(0.86, 0.98, lv) * (0.5 + bs));   // (and the soot under the cornice)
    c = mix(c, c * vec3f(0.95, 0.93, 0.9), 0.5 * pat + 0.4 * streak);   // (round 20: soot greyer, less brown: the row houses read warm)
    c = mix(c, c * 1.18 + vec3f(0.015), smoothstep(0.35, 0.7, ws) * open * 0.55);   // the sill's top, lit
  }
  // level of detail from the pixel's footprint (metres): the room's small parts, then the parallax and rooms
  let fp = sfFoot(wp);
  let fpA = sqrt(length(dpdx(wp)) * length(dpdy(wp)));   // (the rooms' level of detail by the pixel's area: seen along the street a front's pixels stretch one way only, and the rooms went flat)
  let lodD = smoothstep(0.012, 0.04, fpA);
  let near = 1.0 - smoothstep(0.1, 0.22, fpA);
  let sharp = 1.0 - smoothstep(0.03, 0.1, fp);   // the mask's edge sharpened while its texels are bigger than a pixel
  if (lv >= 0.0 && win > 0.02) {
    // the glass 0.16 m behind the face: where the view through the opening lands on the wall instead, that is the reveal
    // (a shopfront's glass sits nearly flush: 0.06 m; the offset held to 0.3 m: seen along the street a deep reveal hid whole
    // windows behind a flat patch of wall)
    let dep = select(select(0.2, 0.27, gq > 3.5 && gq < 5.5), 0.06, shop > 0.5 || ctr.y * fr.mv < 3.2);   // (round 19: the brick lofts' and the apartment blocks' masonry openings deeper)
    var o = -fr.vt.xy / fr.vt.z * dep;
    o *= min(1.0, 0.4 / max(length(o), 1e-4));
    let lu2 = clamp(lu + o.x / fr.mu, 0.004, 0.996); let lv2 = clamp(lv + o.y / fr.mv, 0.003, 0.997);
    let a2 = vec2f((cx + lu2) / 5.0, (cy + 1.0 - lv2) / rows);
    let win2 = textureSampleGrad(matExtra, matSamp, a2, gdx * 3.0 + vec2f(0.0008, 0.0), gdy * 3.0 + vec2f(0.0, 0.0008)).r;
    let glassV = mix(win2, smoothstep(0.35, 0.6, win2), sharp) * near + (1.0 - near);
    let wallAvg = textureSampleLevel(matMap, matSamp, a, 6.0).rgb * col.rgb;
    // the reveal's faces: the head and a jamb in shade, the sill lit from above
    let rv = mix(wallAvg * 0.4, wallAvg * 0.75, step(0.0, fr.vt.y));
    // the room behind this window, centred on it: a home's room ~4.2 m wide, 3.1 m high (a shop's floor 8 m, 4 m);
    // who is in by the window's floor (its centre's height in the world: stacked floors differ) and its place on the front
    let dm = vec2f((lu - ctr.x) * fr.mu, (lv - ctr.y) * fr.mv) + o;   // metres from the window's centre, on the glass
    // a shop: the shopfront atlas, or a ground-floor window (its centre under 3.2 m: the photo's display, lit)
    let low = max(shop, 1.0 - step(3.2, ctr.y * fr.mv));
    let rs = mix(vec3f(4.2, 3.1, 4.5), vec3f(8.0, 4.0, 7.0), step(0.5, low));
    let rf = clamp(vec2f(0.5, 0.56) + dm / rs.xy, vec2f(0.02), vec2f(0.98));
    let wy = wp.y + (ctr.y - lv) * fr.mv;
    let rc = vec2f(floor(ctr.x * 255.0 + 0.5) + fract(floor(uv.x) * 0.618) * 997.0, floor(wy / 3.2 + 0.5));
    let bseed = floor(uv.x) * 0.37 + cell * 7.0;
    let rFar = sfRoomFarF(rc, rf, bseed, night, 0.0, 0.0);
    let room = sfRoomL(rf, rc, rs, fr.vt, bseed, night, 0.0, lodD, 0.0);
    let fres = pow(1.0 - fr.vt.z, 5.0);
    let graze = 1.0 - 0.85 * smoothstep(0.4, 0.06, fr.vt.z);   // (along the street the glass is its reflection, the room a trace)
    let g = mix(win, smoothstep(0.35, 0.65, win), sharp);
    let glass = g * glassV;
    c = mix(c, rv, g * (1.0 - glassV));
    // the photo's own glass: by day most of the look (its panes, curtains and reflections; the room faint behind it), at
    // night a dark trace under the room's light
    c = mix(c, t.rgb * col.rgb * mix(0.62, 0.32, night), glass);   // (round 27: 0.18 -> 0.32 at night: the unlit panes not black)
    // the head's shadow on the glass (the reveal's soffit: the glass under it darker, deeper in its recess), fading afar
    let hsh = textureSampleLevel(matExtra, matSamp, vec2f(a2.x, a2.y - dep * 0.9 / max(fr.mv, 0.1) / rows), 1.0).r;
    c *= 1.0 - 0.35 * glass * (1.0 - smoothstep(0.3, 0.7, hsh)) * near * (1.0 - night);
    let rNear = room.rgb * mix(0.45, 1.0, night);
    emit = mix(rFar.rgb * mix(0.45, 1.0, night), rNear, near) * glass * (1.0 - fres) * graze;
    if (low > 0.5) {   // a shop (the shopfront atlas, or a front's ground-floor displays): its displays lit (dimly by day, bright at night), the room behind as the shop floor
      let sc = sfH(vec2f(floor(uv.x), cell)); var warm = mix(vec3f(1.0, 0.76, 0.5), vec3f(0.95, 0.95, 0.9), step(0.55, sc));   // 3000 K / 4000 K, a neon-lit one now and then
      warm = mix(warm, select(vec3f(1.0, 0.3, 0.55), vec3f(0.3, 0.75, 1.0), fract(sc * 7.0) > 0.5), step(0.86, sc) * 0.35);   // (tod50: 0.7 -> 0.35 - a whole display a flat cyan slab at night)
      // the photo's own display (flowers, bread, jewellery: the masks are drawn to the display windows, tools/gen_textures.py
      // SHOP_GLASS) behind the glass, lit: dimly by day, its lamps at night (brightest high, under the display lights; a
      // few shops closed, their shutters' dark); a room only where the photo is dark
      let disp = t.rgb * col.rgb; let dl = dot(disp, vec3f(0.3, 0.55, 0.15));
      let open = step(0.12, fract(sc * 13.1)) * (0.55 + 0.45 * fract(sc * 5.3));   // (a few closed, the rest from dim to bright)
      let hi = 0.7 + 0.5 * smoothstep(0.1, 0.9, rf.y);
      c = mix(c, disp * 0.5, glass);
      // (round 8, the NFS pass: the shops lit by day too - their displays and ceiling lights read through the glass from the street;
      // round 23: at night x1.1, not 2.6 - the displays blew out to flat white panels)
      // (tod50) at night the display under its downlights: pools every ~3 m along the window, brightest under the ceiling -
      // the big panes of a modern front were each one flat glowing slab
      let pools = mix(1.0, (0.45 + 0.55 * (0.5 + 0.5 * cos(dm.x * 2.1))) * (0.5 + 0.5 * smoothstep(-1.6, 1.0, dm.y)), smoothstep(0.5, 1.0, night));
      // (tod51) at night the display read in its own light, not one even pale slab (the generated photos' displays are pale
      // and even: x1.1 at night they glowed flat cream): its goods by their contrast to the display's average (what stands
      // out of its blur, steepened: dark shapes against lit ones), the light under the spots along the window and from the
      // ceiling down (the pools above, stronger), the shop floor behind (sfRoomL) where the goods are dark
      let nk = smoothstep(0.5, 1.0, night);
      let avg = dot(textureSampleLevel(matMap, matSamp, a, 5.0).rgb * col.rgb, vec3f(0.3, 0.55, 0.15));
      let goods = clamp(pow(dl / max(avg, 0.02), 2.2), 0.08, 2.2);
      let spots = (0.3 + 0.7 * pow(0.5 + 0.5 * cos(dm.x * 2.6 + sc * 6.0), 2.0)) * (0.3 + 0.7 * smoothstep(-1.8, 1.1, dm.y));
      // (and the shelves behind it: rows of goods ~0.5 m high in blocks ~0.35 m wide, lit and dark, a dark counter low -
      // gone into their average with the distance)
      let gx = dm.x / 0.35 + sc * 37.0; let gy = (dm.y + 2.2) / 0.5;
      let blk = mix(0.2, 1.5, sfH(vec2f(floor(gx), floor(gy) + sc * 13.0))) * (0.55 + 0.45 * smoothstep(0.0, 0.15, fract(gy))) * (0.6 + 0.4 * step(0.12, fract(gx)));
      let shelf = mix(1.0, mix(0.35, blk, smoothstep(-0.9, -0.6, dm.y)), near);
      let dispN = mix(pow(disp, vec3f(1.5)) * 2.6, (disp / max(dl, 0.02) * avg * goods + vec3f(max(avg, 0.25) * 0.4)) * spots * shelf * 0.38, nk);   // (a floor of the shop's own light: a dark photo's display not black; x0.38: under the shoulder at the night's exposure - brighter, the detail clipped back to a flat panel)
      emit = (mix(disp, dispN, night) * warm * (0.15 + 0.9 * night * open) * mix(hi * pools, 1.0, nk) * mix(1.0, graze, 0.7) + room.rgb * (0.22 + 0.08 * night) * near * graze * mix(1.0 - smoothstep(0.02, 0.08, dl), 1.0 - smoothstep(0.3, 1.0, goods), nk) * shop + warm * (0.035 + mix(0.1, 0.04, nk) * night * open) * shop * hi * (0.7 + 0.6 * sc) * (0.75 + 0.25 * sin(lu * 12.6 + sc * 6.0)) * mix(1.0, spots * 0.6, nk) * graze) * glass * (1.0 - 0.45 * fres);
    }
    rough = mix(rough, mix(0.05, 0.14, low), glass); gz = glass;   // (display glass a little hazier: the street's lights smeared, the display through it)
  }
  if (lv < 0.0) {   // foundation
    let n = sfN(vec2f(uv.x * 9.0, lv * 40.0)); c = vec3f(0.3, 0.29, 0.27) * (0.85 + 0.3 * n);
  }
  // street grime and contact shade at the foot of the wall
  let hm = lv * fr.mv;
  c *= 1.0 - 0.18 * (1.0 - smoothstep(0.0, 1.2, hm)) - 0.08 * (1.0 - smoothstep(0.0, 4.0, hm)) * sfN(vec2f(uv.x * fr.mu * 0.7, 1.0));
  c *= 1.0 - 0.1 * wet;
  gHE = emit;
  gHK = vec4f(rough, 0.0, gz, 1.0);
  return vec4f(c, 1.0);
}
`,
  KTt = RP(null),
  kq =
    o0 +
    Sq +
    `
const SF_OG = array<vec4f, 16>(vec4f(182.0, 23.0, 248.0, 30.0), vec4f(184.0, 16.0, 283.0, -7.0), vec4f(187.0, -3.0, 271.0, -15.0), vec4f(182.0, 0.0, 299.0, 21.0),
  vec4f(182.0, 0.0, 256.0, 0.0), vec4f(190.0, 0.0, 256.0, 0.0), vec4f(195.0, 45.0, 232.0, -72.0), vec4f(188.0, 2.0, 252.0, 8.0),
  vec4f(118.0, 32.0, 264.0, 70.5), vec4f(268.0, 61.0, 227.0, 47.0), vec4f(102.0, 0.0, 152.0, 129.0), vec4f(66.0, 47.7, 309.0, 11.0),   // (8-15: gen_textures.py --pack-facades)
  vec4f(170.0, 8.0, 262.0, 80.0), vec4f(148.0, 131.0, 330.0, 329.0), vec4f(194.0, 17.0, 290.0, 24.0), vec4f(176.0, 46.0, 205.0, 177.0));
const SF_GV = array<vec4f, 8>(vec4f(1.5, 4.0, 0.2, 0.0), vec4f(1.5, 3.9, 0.36, 0.0), vec4f(1.5, 4.0, 0.18, 1.0), vec4f(1.25, 3.8, 0.3, 2.0),
  vec4f(1.8, 4.1, 0.0, 4.0), vec4f(1.5, 4.0, 0.25, 3.0), vec4f(1.35, 4.0, 0.12, 4.0), vec4f(2.0, 4.2, 0.3, 1.0));
fn sfTan(uv: vec2f, wp: vec3f) -> vec3f {   // the surface's +u direction in the world
  let gx = dpdx(uv); let gy = dpdy(uv); let det = gx.x * gy.y - gx.y * gy.x;
  let t = (dpdx(wp) * gy.y - dpdy(wp) * gx.y) * sign(det);
  return t / max(length(t), 1e-6);
}
// the lobby hall behind the glass: f the point on the glass (0..1 across a bay, 0..1 up), rs the hall (bay width, height, depth)
fn sfLobby(f: vec2f, bay: f32, rs: vec3f, vt: vec3f, seed: f32, lod: f32) -> vec3f {
  let dd = 1.0 - lod;
  let rd = vec3f(-vt.x / rs.x, -vt.y / rs.y, -vt.z / rs.z);
  let ty = (select(0.0, 1.0, rd.y > 0.0) - f.y) / rd.y; let tz = 1.0 / -rd.z;
  let t = min(ty, tz);   // one hall along the whole front (no walls between the bays: seen along the street they were flat panels)
  let hp = vec3f(f + rd.xy * t, t * -rd.z);
  let h = sfH(vec2f(seed, 3.7));
  let stone = mix(vec3f(0.66, 0.6, 0.52), vec3f(0.24, 0.23, 0.23), step(0.55, h));   // travertine / dark granite
  let wood = vec3f(0.36, 0.22, 0.12);
  var c = stone;
  let m = vec2f((hp.x + bay) * rs.x, hp.z * rs.z);   // metres across the hall and into it
  if (t == ty) {
    if (rd.y < 0.0) { c = stone * 0.75 + vec3f(0.35) * dd * step(length(fract(m / 2.4) - 0.5), 0.1); }   // polished floor (the lights in it)
    else { c = vec3f(0.5) + vec3f(2.4) * mix(0.03, step(length(fract(m / 2.4) - 0.5), 0.09), dd); }   // ceiling, downlights
  } else {   // the back wall: the lift lobby (bronze doors), a reception desk
    let lift = step(abs(fract(m.x / 3.2) - 0.5), 0.22) * step(hp.y, 0.52) * dd;
    c = mix(mix(stone, wood * 0.8, step(0.6, fract(h * 3.0))), vec3f(0.42, 0.3, 0.16), lift);
    c *= 0.9 + 0.1 * step(0.04, fract(m.x / 1.2)) * dd;   // the panels' joints
    // the downlights' scallops washing the wall (no flat panel of light)
    let sx = fract(m.x / 2.4) - 0.5;
    c *= 0.45 + 1.1 * exp(-sx * sx * 18.0) * smoothstep(0.25, 0.95, hp.y) * mix(0.6, 1.0, dd) + 0.25 * (1.0 - hp.y);
  }
  let desk = step(hp.y, 0.22) * step(abs(hp.z - 0.45), 0.08) * dd;   // (seen as the band low in the hall)
  c = mix(c, wood * 0.8, desk * step(t, 0.6));
  return c * (1.05 - 0.45 * hp.z);
}
// the city the glass reflects (renderer gHR): the reflected ray r from p (y0: the street under the wall) meets the
// buildings across the street - a skyline of facades by azimuth (each ~7 degrees its own distance, height and finish:
// stone with punched windows, glass with ribbon windows), the street below them, the sky above. -> albedo, share (a);
// gHRe their lit windows at night
fn sfCityRefl(p: vec3f, r: vec3f, y0: f32, night: f32) -> vec4f {
  let hz = length(r.xz); if (hz < 0.05 || r.y > 0.75) { return vec4f(0.0); }
  let az = atan2(r.z, r.x) + 3.14159; let bw = 0.12; let bi = floor(az / bw);
  let hb = sfH(vec2f(bi, 3.1 + floor(p.x / 90.0))); let hd = sfH(vec2f(bi, 7.7 + floor(p.z / 90.0)));
  let D = 20.0 + 75.0 * hd * hd;   // the facade across: its distance
  let top = 18.0 + 120.0 * hb * hb * hb;   // its height over the street
  let t = D / hz; let rel = p.y + r.y * t - y0;   // where the ray meets that plane, over the street
  let ux = (az - bi * bw) * D;   // metres along it
  let edge = smoothstep(0.0, 1.2, min(ux, bw * D - ux));   // (a narrow gap of sky between the buildings)
  if (rel > top) { return vec4f(0.0); }
  if (rel < 0.0) { return vec4f(vec3f(0.07, 0.07, 0.075), 1.0); }   // the street
  let glassy = step(0.62, fract(hb * 13.7)); let pale = step(0.7, fract(hd * 29.1));
  var alb = mix(mix(vec3f(0.5, 0.46, 0.4), vec3f(0.68, 0.67, 0.64), pale) * (0.8 + 0.4 * fract(hd * 17.3)), vec3f(0.22, 0.26, 0.32), glassy);
  let fh = mix(3.6, 4.0, glassy); let fv = fract(rel / fh); let cw = mix(1.6, 3.0, glassy); let fu = fract(ux / cw);
  let win = step(0.14, fu) * step(fu, mix(0.86, 0.97, glassy)) * step(mix(0.3, 0.22, glassy), fv) * step(fv, 0.92) * step(4.5, rel);
  alb = mix(alb, vec3f(0.07, 0.08, 0.1), win * (1.0 - glassy * 0.6));
  let lit = step(0.55, sfH(vec2f(floor(ux / cw) + bi * 37.0, floor(rel / fh))));
  gHRe = vec3f(1.0, 0.82, 0.6) * win * lit * night * 0.35;
  let sh = 1.0 - smoothstep(top - 2.0, top, rel) * 0.0;   // (the cornice line: sharp)
  return vec4f(alb, edge * sh * (1.0 - smoothstep(0.55, 0.75, r.y)));
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let cell = floor(col.a * 32.0);   // stored as (cell + 0.5) / 32
  let fr = sfFrame(uv, wp);
  let fp = sfFoot(wp);
  let fw = max(fwidth(uv), vec2f(0.001));
  let night = bc.b;
  let bseed = cell * 1.31 + floor(dot(col.rgb, vec3f(97.1, 57.3, 23.9)) * 8.0);   // the building (its tint), for who is in
  // level of detail from the pixel's footprint (metres): the room's small parts, then the room itself, then whole floors
  let lodD = smoothstep(0.012, 0.04, fp);
  let lodR = smoothstep(0.1, 0.25, fp);
  let near = 1.0 - smoothstep(0.25, 0.6, fp);
  let fres = pow(1.0 - fr.vt.z, 5.0);
  let tanU = sfTan(uv, wp); let duv = dpdx(uv); let dvv = dpdy(uv);   // (derivatives in uniform control flow)
  var c = vec3f(0.0); var g = 0.0; var eU = vec3f(0.0); var rough = 0.8; var metal = 0.0; var nOff = vec3f(0.0);
  var bw = 3.0; var xm = uv.x; var stone = vec3f(0.5); var dayK = 1.0 - 0.45 * (1.0 - night);
  if (cell < 15.5) {   // ---- a photographed section
    let cx = cell - 4.0 * floor(cell / 4.0); let cy = floor(cell / 4.0);
    let q = uv / vec2f(18.0, 15.2);
    let lu = fract(q.x); let lv = fract(q.y);
    let du = duv / vec2f(18.0, 15.2); let dv = dvv / vec2f(18.0, 15.2);
    let gdx = du * vec2f(0.25, -0.25); let gdy = dv * vec2f(0.25, -0.25);
    let a = vec2f((cx + clamp(lu, 0.002, 0.998)) / 4.0, (cy + 1.0 - clamp(lv, 0.002, 0.998)) / 4.0);
    let t = textureSampleGrad(matMap, matSamp, a, gdx, gdy);
    c = t.rgb * col.rgb; let win = textureSampleGrad(matExtra, matSamp, a, gdx, gdy).r;
    // the glass: the mask's edge sharpened while its texels are bigger than a pixel, its coverage (the mip's average) beyond
    g = mix(smoothstep(0.3, 0.7, win), win, smoothstep(0.035, 0.12, fp));
    let G = SF_OG[u32(cell)];
    let px = lu * 1024.0 - G.y; let py = (1.0 - lv) * 1024.0 - G.w;
    let rc = vec2f(floor(px / G.x), floor(py / G.z)) + vec2f(floor(q.x) * 7.0, floor(q.y) * 5.0);
    let rf = vec2f(fract(px / G.x), 1.0 - fract(py / G.z));
    let rs = vec3f(G.x / 1024.0 * 18.0, G.z / 1024.0 * 15.2, 7.0);
    let zone = floor(q.x) * 2.0 + step(0.5, lu);   // (the lit stretches of a floor: half a section, ~9 m)
    let rFar = sfRoomFarF(rc, rf, bseed, night, 1.0, zone).rgb;
    let room = mix(sfRoomL(rf, rc, rs, fr.vt, bseed, night, 1.0, lodD, zone).rgb, rFar, lodR);
    eU = mix(rFar * night + c * 0.2 * (1.0 - night), room, near) * mix(1.0, 0.7, night);   // (night48: the offices' light a little under the punched windows', not clipped)
    c = mix(c, c * 0.45, g);   // (the photo's glass, dimmed: its painted interiors under the room)
    rough = mix(0.8, 0.04, g);
    bw = G.x / 1024.0 * 18.0; xm = uv.x - G.y / 1024.0 * 18.0;
    stone = textureSampleLevel(matMap, matSamp, a, 9.0).rgb * col.rgb * 1.35 * (0.9 + 0.2 * sfNf(uv * vec2f(0.8, 2.0), fp * 2.0));
  } else {   // ---- a glass curtain wall
    let gv = SF_GV[u32(cell - 16.0) % 8u];
    let mw = gv.x; let fh = gv.y; let sp = gv.z; let pat = gv.w;
    let x = uv.x; let y = uv.y;
    let pane = vec2f(floor(x / mw), floor(y / fh));
    let fx = fract(x / mw); let fy = fract(y / fh);
    var fv = sfPer(x + 0.035, mw, 0.0, 0.07, fw.x);
    var fz = max(sfPer(y + 0.04, fh, 0.0, 0.08, fw.y), select(0.0, sfPer(y - sp * fh + 0.03, fh, 0.0, 0.06, fw.y), sp > 0.01));
    if (pat > 3.5) { fv *= 0.35; fz *= 0.35; }   // flush glazing: hairline joints
    var fin = 0.0; var pier = 0.0;
    if (pat > 0.5 && pat < 1.5) { fin = sfPer(x + 0.1, mw * 2.0, 0.0, 0.2, fw.x); }   // vertical fins every two modules
    if (pat > 1.5 && pat < 2.5) { fz = max(fz, sfPer(y + 0.13, fh, 0.0, 0.26, fw.y)); }   // deep horizontal transoms
    if (pat > 2.5 && pat < 3.5) { pier = sfPer(x + 0.35, mw * 3.0, 0.0, 0.7, fw.x); }   // piers every three modules
    let frame = clamp(max(max(fv, fz), max(fin, pier)), 0.0, 1.0);
    let spand = sfPer(y, fh, 0.0, sp * fh, fw.y) * (1.0 - frame);
    let vis = (1.0 - frame) * (1.0 - spand);
    let hp = sfH(pane + vec2f(cell * 3.1, 17.0));
    let tint = col.rgb * (0.975 + 0.05 * mix(hp, 0.5, smoothstep(0.05, 0.3, fp)));   // (+-7 % read as a quilt of panes on the flush walls)
    // the offices behind the vision glass: two modules wide, a floor tall
    let rw = mw * 2.0;
    let rc = vec2f(floor(x / rw), pane.y);
    let rf = vec2f(fract(x / rw), clamp((fy - sp) / max(1.0 - sp, 0.1), 0.0, 1.0));
    let zone = floor(x / 12.0);
    let rFar = sfRoomFarF(rc, rf, bseed, night, 1.0, zone).rgb;
    let room = mix(sfRoomL(rf, rc, vec3f(rw, fh * (1.0 - sp), 8.0), fr.vt, bseed, night, 1.0, lodD, zone).rgb, rFar, lodR);
    // (offices light up by the floor: sfLit; seen through tinted, coated glass a little dimmer than the punched windows)
    eU = mix(rFar * night, room, near) * mix(0.8, 0.42, night) * vis;   // (night48: x0.8 -> x0.42 at night - a lit floor of full-height glass clipped to a flat white slab)
    dayK = 0.1 + 0.9 * night;   // by day the glass is the sky's and the city's reflection, the offices faint behind it (0.3: a quilt of rooms)
    let light = (pat > 0.5 && pat < 1.5) || (pat > 2.5 && pat < 3.5);
    let mull = select(vec3f(0.5, 0.52, 0.55), vec3f(0.8, 0.8, 0.78), light);
    c = mix(mix(tint, tint * 0.6, spand), mull, frame);
    g = vis;
    metal = mix(0.82, 0.85, frame); rough = mix(mix(0.035, 0.07, spand), select(0.35, 0.5, light), frame);
    // each pane its own slight tilt and a pillow (the oil-can waviness), gone before the panes shrink under a few pixels
    let amp = (0.003 + 0.006 * fract(hp * 7.3)) * (1.0 - smoothstep(0.03, 0.2, fp));
    let tilt = (vec2f(fract(hp * 13.1), fract(hp * 5.7)) - 0.5) * 0.006 * (1.0 - smoothstep(0.12, 0.6, fp));
    let off = (vec2f(fx - 0.5, fy - 0.5) * amp * 2.0 + tilt) * (1.0 - frame);
    nOff = tanU * off.x + vec3f(0.0, off.y, 0.0);
    bw = mw * 2.0; xm = uv.x; stone = mull * 0.6;
  }
  // ---- the lobby (under 5.2 m): the tower's piers carried down on its bay grid, glass between them with a mullion
  // mid-bay and a transom, a stone base; a deep hall behind
  let lobby = 1.0 - sfR(uv.y, 5.2, 1e5, fw.y);
  let pier = sfPer(xm + 0.3, bw, 0.0, 0.6, fw.x);
  let mul = sfPer(xm + 0.04 - 0.5 * bw, bw, 0.0, 0.08, fw.x);
  let tra = sfB(uv.y, 4.1, 0.1, fw.y);
  let base = 1.0 - sfR(uv.y, 0.35, 1e5, fw.y);
  let lg = (1.0 - pier) * (1.0 - mul) * (1.0 - tra) * (1.0 - base);
  let lx = floor(xm / bw);
  let hall = sfLobby(vec2f(fract(xm / bw), clamp(uv.y / 5.2, 0.0, 1.0)), lx, vec3f(bw, 5.2, 14.0), fr.vt, cell + 17.0 + floor(uv.x / 60.0), lodD);
  let lw = mix(vec3f(1.0, 0.86, 0.68), vec3f(0.95, 0.95, 0.92), step(0.5, sfH(vec2f(cell, 5.0))));
  let lk = 0.07 + 0.08 * night;   // (night48: 0.36 -> 0.08 at night - the halls clipped to flat white slabs down Market St) (by day the hall is dim behind the glass: the street's reflection reads first)
  let lfar = lw * lk * (0.1 + 0.22 * smoothstep(0.2, 0.95, uv.y / 5.2)) * (0.8 + 0.4 * step(0.5, fract(xm / bw)));   // (afar: the ceiling's light high, the hall darker low)
  let eL = mix(hall * lw * lk, lfar, lodR) * near + (1.0 - near) * lfar;
  let cL = mix(mix(vec3f(0.06, 0.058, 0.055), stone, max(pier, base)), vec3f(0.03, 0.032, 0.035), lg);
  c = mix(c, cL, lobby);
  let gl = mix(g, lg, lobby);
  gHE = mix(eU * dayK, eL, lobby) * gl * (1.0 - fres);
  gHN = vec4f(nOff * (1.0 - lobby), 1.0);
  // the reflection: the buildings across the street and the street, by the reflected ray (gHR; the old canyon dimming,
  // gHK.z, only where none is found)
  let Nw = normalize(cross(dpdx(wp), dpdy(wp))); let Vw = normalize(F.camPos.xyz - wp);
  let Nf = select(Nw, -Nw, dot(Nw, Vw) < 0.0);
  let cr = sfCityRefl(wp, reflect(-Vw, normalize(Nf + nOff * 4.0)), wp.y - uv.y, night);
  gHR = vec4f(cr.rgb, cr.a * gl * (1.0 - lobby * 0.5));
  gHK = vec4f(mix(rough, mix(0.8, 0.03, lg), lobby), mix(metal, 0.12 * lg, lobby), gl * select(1.0, 0.45, cell > 15.5) * (1.0 - cr.a), 1.0);   // (canyon reflections: curtain walls keep more of the sky)
  return vec4f(c, 1.0);
}
`,
  zq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let s = select(1.0 / 3.2, col.a, col.a > 0.0);
  let t = textureSample(matMap, matSamp, uv * s);
  let g = 0.85 + 0.3 * sfN(uv * 0.07);
  var c = t.rgb * col.rgb * g;
  if (uv.y < 0.0 && col.a == 0.0) { c *= 0.8; }
  c *= 1.0 - 0.15 * bc.g;
  gHK = vec4f(0.88, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  _q =
    o0 +
    `
fn sfSeam(x: f32, w: f32, fw: f32) -> f32 { let f = abs(fract(x) - 0.5) * 2.0; return 1.0 - smoothstep(1.0 - w - fw, 1.0 - w + fw, 1.0 - f); }
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fw2 = fwidth(uv); let fw = max(fw2.x, fw2.y);
  let s = select(select(1.0 / 3.2, col.a, col.a > 0.0), 0.21, col.a >= 0.5);
  let grit = textureSample(matMap, matSamp, uv * s).rgb;   // (sampled before any branch: uniform control flow)
  if (col.a < 0.5) {   // the photo tile (as TILEWALL_WGSL)
    var c = grit * col.rgb * (0.85 + 0.3 * sfN(uv * 0.07));
    if (uv.y < 0.0 && col.a == 0.0) { c *= 0.8; }
    c *= 1.0 - 0.15 * bc.g;
    gHK = vec4f(0.88, 0.0, 0.0, 1.0);
    return vec4f(c, 1.0);
  }
  let kind = floor((col.a - 0.5) * 16.0);
  let gl = dot(grit, vec3f(0.33));
  let n1 = sfN(uv * 0.11); let n2 = sfNf(uv * 0.9, fw * 0.9); let n3 = sfN(uv * 0.031 + 7.3);
  var c = col.rgb; var rough = 0.85;
  if (kind < 0.5) {   // tar and gravel
    c = grit * col.rgb * 1.9 * (0.85 + 0.3 * n1);
  } else if (kind < 1.5) {   // white TPO: 1.83 m sheets, lapped seams, dirt toward the drains, ponding rings
    let seam = sfSeam(uv.x / 1.83 + 0.5 * sfH(vec2f(floor(uv.y / 30.0), 3.0)), 0.05, fw / 1.83);
    let dirt = smoothstep(0.35, 0.85, n3 * 0.7 + n1 * 0.4);
    let pond = smoothstep(0.62, 0.66, n1) * (1.0 - smoothstep(0.66, 0.74, n1));
    c = col.rgb * (0.93 + 0.07 * n2) * mix(1.0, 0.72, dirt) * (1.0 - 0.1 * seam) * (1.0 - 0.18 * pond) * mix(1.0, 0.8 + 0.4 * gl, 0.25);
    rough = 0.55 - 0.15 * pond;
  } else if (kind < 2.5) {   // modified bitumen: 1 m rolls, their laps, patches of newer cap sheet, granules
    let lap = sfSeam(uv.y + 0.3 * sfH(vec2f(floor(uv.x / 9.0), 1.0)), 0.06, fw);
    let pc = floor(uv / vec2f(3.2, 2.1)); let pat = step(0.86, sfH(pc + 4.1));
    c = col.rgb * (0.75 + 0.5 * gl) * (0.9 + 0.2 * n2) * (1.0 - 0.25 * lap) * mix(1.0, 1.45, pat) * mix(1.0, 1.25, smoothstep(0.5, 0.9, n3));
    rough = 0.8;
  } else if (kind < 3.5) {   // a roof deck: 0.6 m concrete pavers on pedestals, open joints
    let t = floor(uv / 0.6);
    let j = max(sfSeam(uv.x / 0.6 + 0.5, 0.06, fw / 0.6), sfSeam(uv.y / 0.6 + 0.5, 0.06, fw / 0.6));
    c = col.rgb * (0.86 + 0.28 * sfH(t)) * (0.85 + 0.3 * gl) * (1.0 - 0.75 * j) * (1.0 - 0.2 * smoothstep(0.5, 0.9, n3));
    rough = 0.8;
  } else if (kind < 4.5) {   // sedum trays: greens, reds and bare substrate in patches, the trays' grid
    let t = floor(uv / 0.6);
    let g = sfN(uv * 1.7 + 3.0) * 0.6 + sfNf(uv * 6.0, fw * 6.0) * 0.4;
    var veg = mix(vec3f(0.06, 0.11, 0.035), vec3f(0.12, 0.14, 0.04), g);
    veg = mix(veg, vec3f(0.18, 0.07, 0.04), smoothstep(0.55, 0.8, sfN(uv * 0.5 + 9.0)) * 0.7);   // red sedum
    let bare = smoothstep(0.6, 0.8, sfN(uv * 0.8 + 1.7) * 0.6 + sfH(t) * 0.4);
    c = mix(veg, vec3f(0.2, 0.17, 0.13) * (0.8 + 0.4 * gl), bare * 0.7);
    c *= 1.0 - 0.3 * max(sfSeam(uv.x / 0.6 + 0.5, 0.04, fw / 0.6), sfSeam(uv.y / 0.6 + 0.5, 0.04, fw / 0.6));
    rough = 0.95;
  } else if (kind < 5.5) {   // a helipad: uv metres from its centre, r the pad's half size in col.r (x 20)
    let R = col.r * 20.0; let d = length(uv); let q = abs(uv);
    c = vec3f(0.11, 0.115, 0.12) * (0.85 + 0.3 * gl);
    let aa = fw * 1.5;
    let ring = smoothstep(R * 0.66 - aa, R * 0.66, d) * (1.0 - smoothstep(R * 0.74, R * 0.74 + aa, d));
    let edge = 1.0 - smoothstep(R - 0.5 - aa, R - 0.5, max(q.x, q.y));
    let hx = R * 0.22; let hy = R * 0.3; let bw = R * 0.055;
    let H = max(step(q.x, hx) * step(hx - bw * 2.0, q.x) * step(q.y, hy), step(q.x, hx) * step(q.y, bw));
    c = mix(c, vec3f(0.75, 0.62, 0.1), ring);
    c = mix(c, vec3f(0.8, 0.8, 0.78), max(H, 1.0 - edge));
    rough = 0.7;
  } else if (kind < 6.5) {   // grey EPDM / single-ply: 3 m sheets, seam tape
    let seam = sfSeam(uv.y / 3.05 + 0.5, 0.03, fw / 3.05);
    c = col.rgb * (0.9 + 0.2 * n2) * (1.0 - 0.3 * seam) * mix(1.0, 0.8, smoothstep(0.4, 0.9, n3));
    rough = 0.7;
  } else {   // wood decking: 14 cm boards, weathered grey-brown
    let b = floor(uv.x / 0.14);
    c = col.rgb * (0.75 + 0.5 * sfH(vec2f(b, floor(uv.y / 3.6 + sfH(vec2f(b, 2.0)))))) * (1.0 - 0.6 * sfSeam(uv.x / 0.14, 0.12, fw / 0.14)) * (0.85 + 0.3 * n2);
    rough = 0.8;
  }
  c *= 1.0 - 0.25 * bc.g; rough = mix(rough, 0.2, bc.g * 0.7);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  Eq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let n1 = sfN(uv * 0.33); let n2 = sfN(uv * 0.061 + vec2f(3.1, 7.7)); let fwt = fwidth(uv); let n3 = sfNf(uv * 1.9 + 11.0, max(fwt.x, fwt.y) * 1.9); let n4 = sfN(uv * 0.013 + 5.0);
  let photo = textureDimensions(matMap).x > 600u;
  let tx = textureSample(matMap, matSamp, uv * select(0.21, 0.26, photo));
  // earth / vegetation: clumps and dry patches (SF's summer gold in the grass)
  let dry = smoothstep(0.45, 0.8, n2 * 0.7 + n4 * 0.5);
  var veg = col.rgb * (0.7 + 0.45 * n1) * (0.85 + 0.3 * n3);
  veg = mix(veg, veg * vec3f(1.55, 1.25, 0.8), dry * 0.55 * smoothstep(0.02, 0.06, col.g - col.b));
  let paved = tx.rgb * (col.rgb / 0.42) * (0.82 + 0.3 * n2) * select(vec3f(1.0), vec3f(0.95), n3 > 0.7);
  let pv = step(0.9, col.a);   // (the class in the alpha: 1 paved)
  var c = mix(veg, paved, pv);
  var rough = mix(0.97, 0.88, pv);
  let wet = bc.g; c *= 1.0 - 0.3 * wet; rough = mix(rough, 0.25, wet * 0.6);
  // the shore's splash zone: the sea wall's face and the rocks dark and wet up to ~1.3 m over the bay, weed at the waterline
  let tl = 1.25 + 0.35 * n1;
  // (only the faces that drop to the water, the sand and the sea floor: low lawns and lots inland stay dry)
  let fn_ = normalize(cross(dpdx(wp), dpdy(wp)));
  let shoreK = max(1.0 - smoothstep(0.55, 0.85, abs(fn_.y)), select(0.0, 1.0, col.a > 0.2 && col.a < 0.6));
  let sp = (1.0 - smoothstep(tl - 0.5, tl, wp.y)) * shoreK;
  // faces too steep for turf: bare rock and earth; in the Presidio Parkway's cutting board-formed concrete retaining walls
  let cliff = 1.0 - smoothstep(0.42, 0.6, abs(fn_.y));
  if (cliff > 0.0) {
    let pres = ${Ept ? "step(wp.x, -5300.0) * step(-6500.0, wp.x)" : "0.0"};
    let rock = vec3f(0.2, 0.18, 0.15) * (0.7 + 0.5 * n1) * (0.85 + 0.3 * n3);
    let board = 1.0 - 0.12 * smoothstep(0.8, 0.95, fract(wp.y / 0.3)) ;
    let conc = vec3f(0.42, 0.41, 0.38) * (0.85 + 0.2 * n2) * board * (1.0 - 0.25 * smoothstep(0.6, 0.9, sfN(vec2f(uv.x * 0.5, wp.y * 0.08))));
    c = mix(c, mix(rock, conc, pres), cliff * mix(0.75, 1.0, pres));
    rough = mix(rough, 0.9, cliff);
  }
  c = mix(c, c * vec3f(0.4, 0.43, 0.4), sp); c = mix(c, vec3f(0.03, 0.045, 0.028), (1.0 - smoothstep(-0.2, 0.45, wp.y)) * 0.7 * shoreK);
  rough = mix(rough, 0.3, sp);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  Tq =
    o0 +
    `
const SF_STRIPE = array<vec3f, 7>(vec3f(0.0), vec3f(0.72, 0.66, 0.52), vec3f(0.8, 0.8, 0.78), vec3f(0.05, 0.16, 0.08), vec3f(0.45, 0.04, 0.04), vec3f(0.03, 0.05, 0.14), vec3f(0.02, 0.02, 0.02));
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let code = floor(col.a * 256.0); let kind = floor(code / 16.0); let sub = code - 16.0 * kind;
  let night = bc.b; let wet = bc.g;
  let fw = max(fwidth(uv), vec2f(1e-4));
  let fp = sfFoot(wp);
  // the sign board (sampled for every kind: derivatives in uniform control flow)
  // (the atlas: 4 x 8 cells; the blade signs rows 0-3, Chinatown's generated boards (kind 8) rows 4-7)
  let sc = vec2f(sub - 4.0 * floor(sub / 4.0), floor(sub / 4.0) + select(0.0, 4.0, kind > 7.5));
  let sa = vec2f((sc.x + clamp(uv.x, 0.01, 0.99)) / 4.0, (sc.y + clamp(uv.y, 0.005, 0.995)) / 8.0);
  let st = textureSampleGrad(matMap, matSamp, sa, dpdx(uv) * vec2f(0.25, 0.125), dpdy(uv) * vec2f(0.25, 0.125)).rgb;
  let n = sfNf(uv * 4.0, fp * 4.0);
  var c = col.rgb * (0.92 + 0.16 * n);
  var rough = 0.75; var metal = 0.0; var emit = vec3f(0.0);
  if (kind < 0.5) {   // paint
  } else if (kind < 1.5) {   // canvas: stripes down the slope, the weave, grime toward the valance
    let si = u32(sub);
    if (si > 0u) { let s = sfPer(uv.x, 0.5, 0.0, 0.25, fw.x); c = mix(c, SF_STRIPE[min(si, 6u)] * (0.92 + 0.16 * n), s); }
    c *= 0.95 + 0.05 * sfPer(uv.x * 40.0 + uv.y * 40.0, 1.0, 0.0, 0.5, max(fw.x, fw.y) * 40.0);
    c *= 1.0 - 0.12 * smoothstep(0.6, 1.6, uv.y);
    rough = 0.92;
  } else if (kind < 2.5) {   // painted steel
    c = col.rgb * (0.85 + 0.3 * n); rough = 0.45; metal = 0.15;
  } else if (kind < 3.5 || kind > 7.5) {   // blade sign: the board, lit (a lightbox / neon) at dusk and night
    c = st * 0.9; rough = 0.35;
    emit = pow(st, vec3f(1.4)) * (0.015 + 1.1 * night);
    // neon (the vertex colour: the tube's): the board's lettering (what stands out of its own blurred average) as glass
    // tubes on a dark board, glowing by night (a hint by day)
    if (min(col.r, min(col.g, col.b)) < 0.95) {
      let avg = textureSampleLevel(matMap, matSamp, sa, 6.0).rgb;
      let m = smoothstep(0.1, 0.3, length(st - avg));
      c = mix(vec3f(0.025, 0.022, 0.03), col.rgb * 0.35, m); rough = mix(0.5, 0.15, m);
      emit = col.rgb * m * (0.06 + 3.2 * night) + col.rgb * 0.05 * night;
    }
  } else if (kind < 4.5) {   // paper lantern: the ribs, a glow inside at night
    let rib = sfPer(uv.y * 8.0, 1.0, 0.0, 0.15, fw.y * 8.0);
    c = col.rgb * (1.0 - 0.35 * rib); rough = 0.6;
    emit = vec3f(1.0, 0.28, 0.1) * (0.01 + 0.9 * night) * (1.0 - 0.6 * rib);
  } else if (kind < 5.5) {   // AC unit: louvres
    c = col.rgb * (0.8 + 0.2 * sfPer(uv.y, 0.035, 0.0, 0.018, fw.y)); rough = 0.55;
  } else if (kind < 6.5) {   // glazed roll tiles: ridges down the slope
    let r = abs(fract(uv.x / 0.22) - 0.5) * 2.0;
    c = col.rgb * mix(0.62 + 0.55 * (1.0 - r * r), 0.85, smoothstep(0.02, 0.08, fp)) * (0.9 + 0.2 * n); rough = 0.3;
  } else {   // flag / banner: two colours, a band or a field
    let f = u32(sub) % 4u;
    let A = array<vec3f, 4>(vec3f(0.02, 0.06, 0.25), vec3f(0.55, 0.03, 0.03), vec3f(0.03, 0.2, 0.08), vec3f(0.6, 0.45, 0.08));
    let B = array<vec3f, 4>(vec3f(0.7, 0.5, 0.1), vec3f(0.8, 0.8, 0.78), vec3f(0.8, 0.8, 0.78), vec3f(0.03, 0.05, 0.2));
    let band = select(step(0.66, uv.y), step(abs(uv.x - 0.35), 0.1), f == 1u || f == 2u);
    c = mix(A[f], B[f], band) * (0.9 + 0.1 * n); rough = 0.85;
  }
  c *= 1.0 - 0.15 * wet;
  gHE = emit;
  gHK = vec4f(mix(rough, 0.2, wet * 0.6), metal, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  AP =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let t = textureSample(matMap, matSamp, uv);
  gHK = vec4f(0.5, 0.15, 0.0, 1.0);
  return vec4f(col.rgb * (0.8 + 0.2 * t.g) * (1.0 - 0.15 * bc.g), t.a);
}
`,
  Rq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let a = col.a; let wet = bc.g; let night = bc.b;
  let foot = sfFoot(wp);
  let fine = 1.0 - smoothstep(0.004, 0.02, foot);   // (the fine wear fades out beyond ~25 m: no shimmer)
  // world-locked noise on all three axes (the parts face every way)
  let p = wp * 7.0;
  let n1 = sfN(p.xz + vec2f(p.y * 0.73, p.y * 0.41)) * 0.5 + sfN(p.zy * 0.55 + vec2f(3.1, 1.7)) * 0.5;
  let n2 = sfN(wp.xz * 41.0 + vec2f(wp.y * 29.0, wp.y * 17.0)) * 0.6 + sfN(wp.zy * 53.0 + vec2f(wp.x * 31.0, 0.0)) * 0.4;
  var c = col.rgb; var rough = 0.55; var metal = 0.0; var emit = vec3f(0.0);
  let t = textureSample(matMap, matSamp, uv).rgb;   // (sampled for every part: uniform control flow)
  if (a < 0.45) {   // a printed face: the image, a glossy print under scratched plastic / a poster behind glass
    c = t * col.rgb;
    rough = mix(0.32, 0.22, step(a, 0.2)) + 0.25 * smoothstep(0.55, 0.9, n2) * fine;
    if (a < 0.2) { emit = t * mix(0.06, 1.25, night); }   // (backlit: a faint glow by day, bright at night)
    c *= 1.0 - 0.18 * smoothstep(0.5, 0.9, n1);
  } else {
    let h = uv.x; let bare = step(a, 0.9);
    // splash grime from the gutter and the sidewalk's dirt, thickest at the foot; drips and streaks under the edges
    let foot0 = 1.0 - smoothstep(0.0, 0.42 + 0.15 * n1, h);
    let streak = smoothstep(0.62, 0.9, sfN(vec2f((wp.x + wp.z) * 23.0, wp.y * 1.6))) * (1.0 - smoothstep(0.2, 1.4, h));
    let dust = smoothstep(0.45, 0.85, n1) * 0.35;
    let dirt = clamp(foot0 * (0.55 + 0.45 * n1) + streak * 0.45 + dust, 0.0, 1.0);
    // chipped paint: specks of grey primer / rust on the paint, bright scuffs on the bare metal
    let ch = smoothstep(0.74, 0.82, n2 * 0.7 + n1 * 0.3) * fine;
    let rust = smoothstep(0.6, 0.85, n1) * foot0;
    if (bare > 0.5) {
      metal = 0.55; rough = 0.42 + 0.25 * n1;
      c = mix(c, c * 1.35 + vec3f(0.04), ch * 0.6);
    } else {
      rough = 0.5 + 0.18 * n1;
      c = mix(c, mix(vec3f(0.3, 0.29, 0.27), vec3f(0.26, 0.13, 0.06), rust), ch * 0.8);
      c *= 0.92 + 0.12 * n2;   // (the paint's orange peel and touch-ups)
    }
    let grime = vec3f(0.085, 0.075, 0.062) * (0.8 + 0.4 * n2);
    c = mix(c, grime, dirt * 0.62);
    rough = mix(rough, 0.92, dirt * 0.85);
    metal *= 1.0 - dirt;
  }
  c *= 1.0 - 0.25 * wet; rough = mix(rough, 0.18, wet * 0.75);
  gHE = emit;
  gHK = vec4f(rough, metal, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  Aq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fq = max(length(fwidth(wp)), 1e-3); let far = smoothstep(0.25, 1.5, fq);
  let tone = clamp(col.r / 0.46, 0.55, 1.2);
  let q = wp.xz + vec2f(wp.y * 0.61, -wp.y * 0.37);
  let n = sfN(q * 0.05) * 0.55 + sfN(q * 0.31 + vec2f(3.1, 7.7)) * 0.45;
  var c = vec3f(0.34, 0.355, 0.37) * tone * (0.88 + 0.24 * n);
  let st = smoothstep(0.6, 0.88, sfNf(vec2f((wp.x - wp.z) * 1.3, wp.y * 0.09), fq * 1.3)) * smoothstep(0.35, 0.7, sfN(vec2f((wp.x + wp.z) * 0.11, wp.y * 0.05 + 2.0)));
  c = mix(c, vec3f(0.29, 0.21, 0.15), st * 0.5 * (1.0 - far));
  let sp = smoothstep(0.8, 0.95, sfNf(q * 0.9 + vec2f(wp.y * 0.7, 1.3), fq * 0.9));
  c = mix(c, vec3f(0.32, 0.18, 0.1), sp * 0.4 * (1.0 - 0.6 * far));
  let seam = sfPer(uv.y, 2.4, 0.0, 0.045, fwidth(uv.y) * 1.5 + 0.002) * (1.0 - far);
  c *= 1.0 - 0.3 * seam;
  gHK = vec4f(0.5 + 0.2 * n + 0.15 * st, 0.12, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  Pq =
    o0 +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fq = max(length(fwidth(wp)), 1e-3); let far = smoothstep(0.2, 1.2, fq);
  let lift = floor(wp.y / 1.5);
  let ph = sfH(vec2f(lift, floor((wp.x + wp.z) / 9.0)));
  let n = sfN((wp.xz + vec2f(wp.y * 0.5)) * 0.07) * 0.6 + sfN((wp.xz - vec2f(wp.y * 0.8)) * 0.43 + vec2f(5.2, 1.3)) * 0.4;
  var c = col.rgb * (0.9 + 0.12 * ph * (1.0 - far)) * (0.86 + 0.26 * n);
  let jt = sfPer(wp.y, 1.5, 0.0, 0.03, fwidth(wp.y) * 1.5 + 0.002) * (1.0 - far);
  c *= 1.0 - 0.18 * jt;
  let streak = smoothstep(0.55, 0.85, sfNf(vec2f((wp.x - wp.z) * 0.9, wp.y * 0.05), fq * 0.9)) * smoothstep(0.3, 0.7, sfN(vec2f((wp.x + wp.z) * 0.07, 4.0)));
  c *= 1.0 - 0.22 * streak;
  let tide = 1.0 - smoothstep(-0.5, 3.2 + 0.8 * n, wp.y);
  c = mix(c, vec3f(0.12, 0.13, 0.09) * (0.8 + 0.4 * n), tide * 0.85 * step(wp.y, 4.5));
  gHK = vec4f(0.88 - 0.25 * tide, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
