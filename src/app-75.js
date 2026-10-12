// app 75 — foreach
// Lines 69546-69725 of readable/app.pretty.js (statement-aligned).
function DG() {
  if (BR) return BR;
  let i = 16,
    t = 40,
    e = new Uint8Array(i * t * 4).fill(255),
    s = (a, r, l) => {
      let c = (r * i + a) * 4,
        h = parseInt(l.slice(1), 16);
      ((e[c] = h >> 16),
        (e[c + 1] = (h >> 8) & 255),
        (e[c + 2] = h & 255),
        (e[c + 3] = 255));
    },
    n = (a) => a;
  (OR.forEach((a, r) => {
    (a.c.forEach((l, c) => s(c, r, n(l))),
      s(12, r, a.f.includes("s") ? "#ffffff" : "#000000"));
  }),
    _ht.forEach((a, r) => s(r, 32, n(a))),
    zht.forEach((a, r) => s(r, 33, n(a))));
  let o = new Xi(e, i, t, no);
  return (
    (o.colorSpace = is),
    (o.magFilter = o.minFilter = so),
    (o.generateMipmaps = !1),
    (o.wrapS = o.wrapT = $i),
    (o.flipY = !1),
    (o.needsUpdate = !0),
    (o.name = "voxPalette"),
    (BR = o),
    o
  );
}
var sy = 24,
  UG = `
fn vxPal(c: f32, r: f32) -> vec3f { return textureSampleLevel(matMap, matSamp, vec2f((c + 0.5) / 16.0, (r + 0.5) / 40.0), 0.0).rgb; }
fn vxE(p: vec2f, c: vec2f, r: vec2f) -> f32 { return length((p - c) / r) - 1.0; }
fn vxHeart(p0: vec2f) -> f32 {
  let p = vec2f(abs(p0.x), p0.y);
  if (p.y + p.x > 1.0) { return length(p - vec2f(0.25, 0.75)) - 0.35355; }
  return sqrt(min(dot(p - vec2f(0.0, 1.0), p - vec2f(0.0, 1.0)), dot(p - 0.5 * max(p.x + p.y, 0.0), p - 0.5 * max(p.x + p.y, 0.0)))) * sign(p.x - p.y);
}
fn vxStar(p0: vec2f, r: f32, rf: f32) -> f32 {
  let k1 = vec2f(0.809017, -0.587785); let k2 = vec2f(-k1.x, k1.y);
  var p = vec2f(abs(p0.x), p0.y);
  p -= 2.0 * max(dot(k1, p), 0.0) * k1; p -= 2.0 * max(dot(k2, p), 0.0) * k2;
  p.x = abs(p.x); p.y -= r;
  let ba = rf * vec2f(-k1.y, k1.x) - vec2f(0.0, 1.0); let h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
  return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
}
// the emoji: q the face's pixel centre (0..1 across, 0 the chin), e the expression; over the head's colour
fn vxFace(q: vec2f, e: i32, t: f32, sd: f32, skin: vec3f) -> vec3f {
  let DK = vec3f(0.11, 0.045, 0.012); let WH = vec3f(0.92, 0.92, 0.9); let MO = vec3f(0.2, 0.025, 0.012); let TG = vec3f(0.9, 0.25, 0.3);
  var c = skin;
  let L = vec2f(0.31, 0.57); let R = vec2f(0.69, 0.57);
  let blink = fract(t * 0.23 + sd * 7.3) < 0.035;
  // cheeks
  if (e == 0 || e == 1 || e == 4 || e == 5 || e == 9 || e == 11 || e == 12) {
    if (min(vxE(q, vec2f(0.19, 0.4), vec2f(0.09, 0.055)), vxE(q, vec2f(0.81, 0.4), vec2f(0.09, 0.055))) < 0.0) { c = mix(c, vec3f(1.0, 0.32, 0.3), 0.4); }
  }
  if (e == 8) { c = mix(c, vec3f(0.3, 0.5, 1.0), 0.75 * smoothstep(0.6, 0.98, q.y)); }   // (scared: the forehead gone blue)
  // eyes
  let oval = e == 0 || e == 1 || e == 7 || e == 9 || e == 10 || e == 12 || e == 13;
  if (oval) {
    for (var k = 0; k < 2; k++) {
      let ce = select(L, R, k == 1);
      if (e == 9 && k == 0) { if (abs(vxE(q, ce + vec2f(0.0, -0.04), vec2f(0.08, 0.075))) < 0.3 && q.y > ce.y - 0.03) { c = DK; } continue; }   // (the wink)
      if (blink) { if (abs(q.y - ce.y) < 0.022 && abs(q.x - ce.x) < 0.065) { c = DK; } continue; }
      if (vxE(q, ce, vec2f(0.06, 0.095)) < 0.0) { c = DK; if (vxE(q, ce + vec2f(-0.018, 0.04), vec2f(0.024, 0.03)) < 0.0) { c = WH; } }
    }
    if (e == 7 && abs(q.y - (0.73 + 0.25 * (q.x - 0.2))) < 0.022 && abs(q.x - 0.31) < 0.09) { c = DK; }   // (thinking: a brow up)
  } else if (e == 2 || e == 8) {   // wide white eyes (mind-blown: big pupils; scared: pinpricks)
    for (var k = 0; k < 2; k++) {
      let ce = select(L, R, k == 1);
      if (vxE(q, ce, vec2f(0.125, 0.135)) < 0.0) { c = WH; if (vxE(q, ce + vec2f(0.0, -0.01), select(vec2f(0.06, 0.07), vec2f(0.035, 0.04), e == 8)) < 0.0) { c = DK; } }
    }
    if (e == 8) { for (var k = 0; k < 2; k++) { let ce = select(L, R, k == 1); let sg = select(1.0, -1.0, k == 1);
      if (abs(q.y - (ce.y + 0.16 + 0.35 * sg * (q.x - ce.x))) < 0.022 && abs(q.x - ce.x) < 0.09) { c = DK; } } }
  } else if (e == 3) {   // cool: the shades are the geometry's (kit.js); a frame painted under them for the far ones
    if (abs(q.y - 0.6) < 0.07 && abs(q.x - 0.5) < 0.38) { c = DK; }
  } else if (e == 4) {   // laughing: eyes shut tight, tears
    for (var k = 0; k < 2; k++) { let ce = select(L, R, k == 1);
      if (abs(vxE(q, ce + vec2f(0.0, -0.035), vec2f(0.08, 0.075))) < 0.3 && q.y > ce.y - 0.03) { c = DK; } }
    if (min(vxE(q, vec2f(0.12, 0.47), vec2f(0.05, 0.08)), vxE(q, vec2f(0.88, 0.47), vec2f(0.05, 0.08))) < 0.0) { c = vec3f(0.25, 0.55, 1.0); }
  } else if (e == 5) {   // heart eyes
    for (var k = 0; k < 2; k++) { let ce = select(L, R, k == 1); if (vxHeart((q - ce) / 0.14 + vec2f(0.0, 0.55)) < 0.0) { c = vec3f(0.85, 0.04, 0.08); } }
  } else if (e == 6) {   // surprised: round eyes, brows up
    for (var k = 0; k < 2; k++) { let ce = select(L, R, k == 1);
      if (vxE(q, ce + vec2f(0.0, 0.01), vec2f(0.06, 0.07)) < 0.0) { c = DK; }
      if (abs(vxE(q, ce + vec2f(0.0, 0.08), vec2f(0.1, 0.07))) < 0.28 && q.y > ce.y + 0.13) { c = DK; } }
  } else if (e == 14) {   // (chars63) dizzy: spiral eyes
    for (var k = 0; k < 2; k++) { let ce = select(L, R, k == 1); let d = q - ce; let r = length(d) / 0.11; let a = atan2(d.y, d.x) / 6.2832 + select(0.0, 0.5, k == 1);
      if (r < 1.0 && abs(fract(r * 2.2 - a + t * 1.5) - 0.5) < 0.2) { c = DK; } }
  } else if (e == 15) {   // (chars63) angry: eyes under brows pulled down to the middle
    c = mix(c, vec3f(1.0, 0.35, 0.25), 0.35 * smoothstep(0.55, 1.0, q.y));
    for (var k = 0; k < 2; k++) { let ce = select(L, R, k == 1); let sg = select(1.0, -1.0, k == 1);
      if (vxE(q, ce + vec2f(0.0, -0.01), vec2f(0.055, 0.06)) < 0.0) { c = DK; }
      if (abs(q.y - (ce.y + 0.12 + 0.45 * sg * (q.x - ce.x))) < 0.025 && abs(q.x - ce.x) < 0.1) { c = DK; } }
  } else if (e == 11) {   // star-struck
    for (var k = 0; k < 2; k++) { let ce = select(L, R, k == 1); if (vxStar(q - ce, 0.13, 0.45) < 0.0) { c = vec3f(1.0, 0.62, 0.06); } }
  }
  // mouths
  let m = vec2f(0.5, 0.4);
  if (e == 1 || e == 4 || e == 5 || e == 11) {   // a grin, open
    let r = select(vec2f(0.24, 0.2), vec2f(0.27, 0.23), e == 4);
    if (vxE(q, m, r) < 0.0 && q.y < 0.385) { c = MO; if (q.y > 0.32) { c = WH; } else if (vxE(q, vec2f(0.5, m.y - r.y), vec2f(0.11, 0.07)) < 0.0) { c = TG; } }
  } else if (e == 0 || e == 9 || e == 12) {   // a smile
    if (abs(vxE(q, m, vec2f(0.21, 0.19))) < 0.14 && q.y < 0.37) { c = DK; }
    if (e == 12 && vxE(q, vec2f(0.57, 0.24), vec2f(0.075, 0.09)) < 0.0 && q.y < 0.3) { c = TG; }
    if (e == 9 && vxE(q, vec2f(0.5, 0.235), vec2f(0.07, 0.06)) < 0.0 && q.y < 0.25) { c = TG; }
  } else if (e == 2 || e == 6) {   // an 'O'
    if (vxE(q, vec2f(0.5, 0.25), select(vec2f(0.085, 0.105), vec2f(0.06, 0.075), e == 6)) < 0.0) { c = MO; }
  } else if (e == 3) {   // a smirk
    if (abs(vxE(q, vec2f(0.55, 0.42), vec2f(0.17, 0.15))) < 0.16 && q.y < 0.36 && q.x > 0.4) { c = DK; }
  } else if (e == 14) {   // a wobbly line
    if (abs(q.y - (0.28 + 0.025 * sin(q.x * 40.0 + t * 6.0))) < 0.022 && abs(q.x - 0.5) < 0.13) { c = DK; }
  } else if (e == 15) {   // a frown
    if (abs(vxE(q, vec2f(0.5, 0.2), vec2f(0.16, 0.1))) < 0.18 && q.y > 0.24) { c = DK; }
  } else if (e == 13) {   // talking: open and shut
    let o = max(0.0, sin(t * 11.0 + sd * 9.0)) * max(0.0, sin(t * 2.3 + sd * 3.0) + 0.3);
    if (vxE(q, vec2f(0.5, 0.28), vec2f(0.09, 0.02 + 0.06 * o)) < 0.0) { c = MO; }
  } else if (e == 7 || e == 10) {   // flat
    if (abs(q.y - 0.29) < 0.022 && abs(q.x - select(0.5, 0.56, e == 7)) < select(0.12, 0.09, e == 7)) { c = DK; }
  } else if (e == 8) {   // a grimace, teeth clenched
    if (abs(q.x - 0.5) < 0.2 && abs(q.y - 0.27) < 0.075) { c = WH; if (abs(q.x - 0.5) > 0.18 || abs(q.y - 0.27) > 0.055 || abs(fract((q.x - 0.5) / 0.08 + 0.5) - 0.5) < 0.12 || abs(q.y - 0.27) < 0.012) { c = DK; } }
  }
  return c;
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fdx = dpdx(uv); let fdy = dpdy(uv);   // (peds68: the face's footprint a pixel - taken here, where the flow is uniform)
  let zone = floor(uv.x); let u = uv.x - zone; let v = uv.y;
  let ex = floor(col.r + 0.5); let hcI = floor(ex / 16.0); let e = i32(ex - hcI * 16.0);
  let og = floor(col.g + 0.5); let toneI = floor(og / 32.0); let look = og - toneI * 32.0; let sd = col.b;
  let tone = vxPal(toneI, 32.0);
  let t = F.sunC.w;
  var c = vec3f(0.5); var rough = 0.8; var metal = 0.0;
  if (zone < 1.5) {   // the head: the emoji's yellow (or a tone), warmer to the chin, lighter over the crown
    c = tone * mix(vec3f(1.0, 0.72, 0.52), vec3f(1.08, 1.05, 1.0), smoothstep(0.0, 1.0, v)); rough = 0.58;
    // (peds68) the face's pixels: one look a screen pixel when they are bigger than it; four, averaged, when a screen pixel
    // spans one or more (a face across the street): no crawling, sparkling eyes and mouth as the person walks or turns
    if (zone > 0.5) {
      let fp = max(length(fdx), length(fdy)) * ${sy}.0;
      if (fp < 0.7) { let q = (floor(vec2f(u, v) * ${sy}.0) + 0.5) / ${sy}.0; c = vxFace(q, e, t, sd, c); }
      else { var acc = vec3f(0.0); let fs = min(fp, 6.0) / max(fp, 1e-4);
        for (var k = 0; k < 4; k++) { let o = (vec2f(f32(k & 1), f32(k >> 1u)) - 0.5) * 0.75 * fs; let uk = vec2f(u, v) + fdx * o.x + fdy * o.y;
          acc += vxFace((floor(uk * ${sy}.0) + 0.5) / ${sy}.0, e, t, sd, c); }
        c = acc * 0.25; }
    }
  }
  else if (zone < 3.5) { c = tone * 0.92; rough = 0.5; }   // hands, bare legs
  else if (zone < 4.5) {   // the top (striped: the trim's colour every other two voxels)
    c = vxPal(0.0, look); rough = 0.8;
    if (vxPal(12.0, look).r > 0.5 && fract(v / 0.24) > 0.5) { c = vxPal(1.0, look); }
  }
  else if (zone < 5.5) { c = vxPal(1.0, look); }
  else if (zone < 6.5) { c = vxPal(2.0, look); rough = 0.7; }
  else if (zone < 7.5) { c = vxPal(3.0, look); rough = 0.85; }
  else if (zone < 8.5) { c = vxPal(4.0, look); rough = 0.55; }
  else if (zone < 9.5) { c = vxPal(5.0, look); rough = 0.6; }
  else if (zone < 10.5) { c = vxPal(hcI, 33.0) * (0.8 + 0.25 * smoothstep(1.2, 1.9, v)); rough = 0.6; }   // hair: lighter over the crown
  else if (zone < 11.5) { c = vxPal(6.0, look); rough = 0.75; }
  else if (zone < 12.5) { c = vxPal(7.0, look); rough = 0.75; }
  else if (zone < 13.5) { c = vxPal(8.0, look); rough = 0.7; }
  else if (zone < 14.5) { c = vxPal(9.0, look); rough = 0.7; }
  else if (zone < 15.5) { c = vec3f(0.02, 0.02, 0.025); rough = 0.35; }   // the shades' frame
  else if (zone < 16.5) { c = vec3f(0.78, 0.88, 1.0); rough = 0.9; gHE = vec3f(0.06, 0.07, 0.09) * F.sunDir.w * 0.0 + c * 0.02; }   // the mind-blown cloud
  else if (zone < 17.5) { c = vec3f(0.03, 0.03, 0.035); rough = 0.3; }   // a phone
  else if (zone < 18.5) { c = vxPal(10.0, look); rough = 0.7; }
  else if (zone < 19.5) { c = vxPal(11.0, look); rough = 0.5; }
  else if (zone < 20.5) { c = vec3f(0.015, 0.02, 0.03); rough = 0.12; metal = 0.0; }   // the lenses
  else if (zone > 21.5) { c = vec3f(1.0, 0.8, 0.15); rough = 0.4; gHE = c * 0.6; }   // (chars63) the dizzy stars
  else { c = vec3f(0.75, 0.68, 0.45); rough = 0.3; metal = 1.0; }   // a buckle
  // a soft rim from the sky (toys in the street, not cut-outs: the silhouette catches the environment's light)
  let vd = normalize(F.camPos.xyz - wp); let rim = pow(1.0 - clamp(dot(gNw, vd), 0.0, 1.0), 3.0);
  gHE += c * rim * envDiffuse(gNw) * 0.5;
  gHK = vec4f(rough, metal, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
as();
