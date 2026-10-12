// app 80 — floor
// Lines 71039-71309 of readable/app.pretty.js (statement-aligned).
function jG() {
  if (UR) return UR;
  let i = 16,
    t = 40,
    e = new Uint8Array(i * t * 4).fill(255),
    s = (o, a, r) => {
      let l = (a * i + o) * 4,
        c = parseInt(r.slice(1), 16);
      ((e[l] = c >> 16),
        (e[l + 1] = (c >> 8) & 255),
        (e[l + 2] = c & 255),
        (e[l + 3] = 255));
    };
  (bS.forEach((o, a) => {
    (o.c.forEach((r, l) => s(l, a, r)),
      s(
        12,
        a,
        `#${o.f.includes("s") ? "ff" : "00"}${o.f.includes("d") ? "ff" : "00"}${o.f.includes("k") ? "ff" : "00"}`,
      ));
  }),
    Cht.forEach((o, a) => s(a, 32, o)),
    Lht.forEach((o, a) => s(a, 33, o)));
  let n = new Xi(e, i, t, no);
  return (
    (n.colorSpace = is),
    (n.magFilter = n.minFilter = so),
    (n.generateMipmaps = !1),
    (n.wrapS = n.wrapT = $i),
    (n.flipY = !1),
    (n.needsUpdate = !0),
    (n.name = "humPalette"),
    (UR = n),
    n
  );
}
var VG = `
fn hPal(c: f32, r: f32) -> vec3f { return textureSampleLevel(matMap, matSamp, vec2f((c + 0.5) / 16.0, (r + 0.5) / 40.0), 0.0).rgb; }
// distances in the face's units (its width 1): an ellipse (approximate), coverage with the pixel's footprint aa
fn hE(p: vec2f, c: vec2f, r: vec2f) -> f32 { return (length((p - c) / r) - 1.0) * min(r.x, r.y); }
fn hC(d: f32, aa: f32) -> f32 { return clamp(0.5 - d / aa, 0.0, 1.0); }
fn hHeart(p0: vec2f) -> f32 {
  let p = vec2f(abs(p0.x), p0.y);
  if (p.y + p.x > 1.0) { return length(p - vec2f(0.25, 0.75)) - 0.35355; }
  return sqrt(min(dot(p - vec2f(0.0, 1.0), p - vec2f(0.0, 1.0)), dot(p - 0.5 * max(p.x + p.y, 0.0), p - 0.5 * max(p.x + p.y, 0.0)))) * sign(p.x - p.y);
}
fn hStar(p0: vec2f, r: f32, rf: f32) -> f32 {
  let k1 = vec2f(0.809017, -0.587785); let k2 = vec2f(-k1.x, k1.y);
  var p = vec2f(abs(p0.x), p0.y);
  p -= 2.0 * max(dot(k1, p), 0.0) * k1; p -= 2.0 * max(dot(k2, p), 0.0) * k2;
  p.x = abs(p.x); p.y -= r;
  let ba = rf * vec2f(-k1.y, k1.x) - vec2f(0.0, 1.0); let h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
  return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
}
// an arc: the ring of ellipse (c, r), thickness th, its lower (dn > 0) or upper part below / above the centre by cut
fn hArc(p: vec2f, c: vec2f, r: vec2f, th: f32, dn: f32, cut: f32) -> f32 { return max(abs(hE(p, c, r)) - th, dn * (p.y - (c.y - dn * cut))); }
fn hFace(q: vec2f, e: i32, t: f32, sd: f32, skin: vec3f, hair: vec3f, aa: f32) -> vec3f {
  let DK = vec3f(0.035, 0.022, 0.018); let WH = vec3f(0.85, 0.85, 0.83); let MO = vec3f(0.22, 0.03, 0.03); let TG = vec3f(0.78, 0.26, 0.28);
  let BR = hair * 0.85 + vec3f(0.01); let LN = mix(skin * 0.35, vec3f(0.15, 0.05, 0.04), 0.5);
  var c = skin;
  let L = vec2f(0.3, 0.6); let R = vec2f(0.7, 0.6);
  let blink = fract(t * 0.23 + sd * 7.3) < 0.03;
  // cheeks
  if (e == 0 || e == 1 || e == 4 || e == 5 || e == 9 || e == 11 || e == 12) { c = mix(c, c * vec3f(1.0, 0.72, 0.7), 0.55 * hC(min(hE(q, vec2f(0.2, 0.4), vec2f(0.09, 0.05)), hE(q, vec2f(0.8, 0.4), vec2f(0.09, 0.05))), aa * 6.0)); }
  if (e == 8) { c = mix(c, vec3f(0.35, 0.5, 0.85) * length(skin), 0.5 * smoothstep(0.75, 1.1, q.y)); }
  // brows: arcs over the eyes - raised (surprise, wow, scared), one up (thinking), flat (cool, neutral)
  var by = 0.775; var bk = 0.04;
  if (e == 2 || e == 6) { by = 0.84; bk = 0.06; } else if (e == 3 || e == 10) { bk = 0.0; } else if (e == 4) { by = 0.8; }
  for (var k = 0; k < 2; k++) {
    let ce = select(L, R, k == 1); let sg = select(1.0, -1.0, k == 1); var y0 = by; var tilt = 0.0;
    if (e == 7 && k == 0) { y0 = by + 0.05; } if (e == 8) { tilt = 0.25 * sg; y0 = by + 0.02; }
    let dx = q.x - ce.x; let yb = y0 + bk * (1.0 - (dx / 0.09) * (dx / 0.09)) - tilt * dx;
    c = mix(c, BR, hC(max(abs(q.y - yb) - 0.016, abs(dx) - 0.085), aa));
  }
  // eyes
  let oval = e == 0 || e == 1 || e == 7 || e == 9 || e == 10 || e == 12 || e == 13;
  for (var k = 0; k < 2; k++) {
    let ce = select(L, R, k == 1);
    if ((e == 9 && k == 0) || e == 4) { c = mix(c, DK, hC(hArc(q, ce + vec2f(0.0, -0.035), vec2f(0.065, 0.055), 0.011, -1.0, 0.0), aa)); continue; }   // shut: a wink, laughing
    if (oval) {
      if (blink) { c = mix(c, DK, hC(max(abs(q.y - ce.y + 0.01) - 0.008, abs(q.x - ce.x) - 0.05), aa)); continue; }
      let py = select(0.0, 0.015, e == 7);
      c = mix(c, DK, hC(hE(q, ce + vec2f(0.0, py), vec2f(0.042, 0.062)), aa));
      c = mix(c, WH, hC(hE(q, ce + vec2f(-0.013, 0.024 + py), vec2f(0.014, 0.017)), aa));
    } else if (e == 2 || e == 8) {
      c = mix(c, WH, hC(hE(q, ce, vec2f(0.075, 0.085)), aa));
      c = mix(c, DK, hC(hE(q, ce + vec2f(0.0, -0.005), select(vec2f(0.04, 0.048), vec2f(0.02, 0.024), e == 8)), aa));
      c = mix(c, LN, hC(abs(hE(q, ce, vec2f(0.075, 0.085))) - 0.005, aa));
    } else if (e == 5) { c = mix(c, vec3f(0.8, 0.04, 0.07), hC(hHeart((q - ce) / 0.11 + vec2f(0.0, 0.55)) * 0.11, aa)); }
    else if (e == 11) { c = mix(c, vec3f(1.0, 0.62, 0.05), hC(hStar(q - ce, 0.085, 0.45), aa)); }
    else if (e == 6) { c = mix(c, DK, hC(hE(q, ce + vec2f(0.0, 0.01), vec2f(0.036, 0.042)), aa)); c = mix(c, WH, hC(hE(q, ce + vec2f(-0.01, 0.024), vec2f(0.011, 0.012)), aa)); }
    else if (e == 3) { c = mix(c, DK, hC(max(abs(q.y - ce.y) - 0.035, abs(q.x - ce.x) - 0.09), aa)); }   // (the shades' shadow, for the far ones)
  }
  if (e == 4) { c = mix(c, vec3f(0.35, 0.62, 1.0), hC(min(hE(q, vec2f(0.15, 0.48), vec2f(0.03, 0.05)), hE(q, vec2f(0.85, 0.48), vec2f(0.03, 0.05))), aa)); }   // tears of joy
  // mouths
  let m = vec2f(0.5, 0.3);
  var talk = 0.0; if (e == 13) { talk = max(0.0, sin(t * 11.0 + sd * 9.0)) * max(0.0, sin(t * 2.3 + sd * 3.0) + 0.3); }
  if (e == 1 || e == 4 || e == 5 || e == 11 || (e == 13 && talk > 0.15)) {   // open: a grin, laughing, talking
    let r = select(select(vec2f(0.16, 0.13), vec2f(0.19, 0.16), e == 4), vec2f(0.08, 0.03 + 0.06 * talk), e == 13);
    let d = max(hE(q, m + vec2f(0.0, 0.035), r), q.y - (m.y + 0.035 - select(0.0, r.y, e == 13)));
    c = mix(c, MO, hC(d, aa));
    if (e != 13) { c = mix(c, WH, hC(max(d, (m.y + 0.0) - q.y), aa)); c = mix(c, TG, hC(max(d, hE(q, vec2f(0.5, m.y + 0.035 - r.y), vec2f(0.08, 0.05))), aa)); }
  } else if (e == 0 || e == 9 || e == 12) {   // a smile
    c = mix(c, LN, hC(hArc(q, m + vec2f(0.0, 0.07), vec2f(0.13, 0.11), 0.011, 1.0, 0.045), aa));
    if (e != 0) { c = mix(c, TG, hC(max(hE(q, vec2f(select(0.5, 0.55, e == 12), 0.22), vec2f(0.045, 0.05)), q.y - 0.255), aa)); }
  } else if (e == 2 || e == 6) {   // an O
    c = mix(c, MO, hC(hE(q, vec2f(0.5, 0.25), select(vec2f(0.055, 0.07), vec2f(0.035, 0.045), e == 6)), aa));
  } else if (e == 3) {   // a smirk
    c = mix(c, LN, hC(max(hArc(q, vec2f(0.55, 0.36), vec2f(0.1, 0.08), 0.01, 1.0, 0.03), 0.43 - q.x), aa));
  } else if (e == 7 || e == 10 || e == 13) {   // flat (talking: closed between words)
    c = mix(c, LN, hC(max(abs(q.y - 0.28) - 0.009, abs(q.x - select(0.5, 0.55, e == 7)) - select(0.07, 0.05, e == 7)), aa));
  } else if (e == 8) {   // a grimace
    let d = max(abs(q.x - 0.5) - 0.12, abs(q.y - 0.26) - 0.045);
    c = mix(c, WH, hC(d, aa)); c = mix(c, LN, hC(abs(d) - 0.007, aa)); c = mix(c, LN, hC(max(d, abs(q.y - 0.26) - 0.004), aa));
  }
  return c;
}
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fw = fwidth(uv); let aa = max(fw.x, fw.y) * 1.2 + 0.002;
  let zone = floor(uv.x); let u = uv.x - zone; let v = uv.y;
  let ex = floor(col.r + 0.5); let hcI = floor(ex / 16.0); let e = i32(ex - hcI * 16.0);
  let og = floor(col.g + 0.5); let toneI = floor(og / 32.0); let look = og - toneI * 32.0; let sd = col.b;
  let skin = hPal(toneI, 32.0); let hair = hPal(hcI, 33.0); let fl = hPal(12.0, look);
  let t = F.sunC.w;
  var c = vec3f(0.5); var rough = 0.85; var sheen = 0.0;
  if (zone < 1.5) {   // skin; the face
    c = skin; rough = 0.55; sheen = 0.25;
    if (zone > 0.5) { c = hFace(vec2f(u, v), e, t, sd, skin, hair, aa); }
  }
  else if (zone < 2.5 || (zone > 2.5 && zone < 3.5) || (zone > 3.5 && zone < 4.5)) {   // the top, its trim, a jacket
    let ci = select(select(0.0, 1.0, zone > 2.5), 2.0, zone > 3.5); c = hPal(ci, look);
    if (zone < 2.5 && fl.r > 0.5 && fract(v / 0.06) > 0.5) { c = hPal(1.0, look); }   // stripes
    if (fl.b > 0.5 && zone < 2.5) { c *= 0.92 + 0.08 * smoothstep(0.2, 0.8, abs(sin(u * 120.0))); }   // a knit's rib
    c *= 1.0 - 0.12 * pow(abs(sin(6.2832 * u)), 6.0);   // (the shade under the arms, at the sides)
    rough = select(0.85, 0.6, zone > 3.5);
  }
  else if (zone < 5.5) { c = mix(hPal(0.0, look), vec3f(0.9), 0.55); rough = 0.85; }   // the shirt under a jacket
  else if (zone < 6.5) {   // the bottoms: denim's twill and seams, the creases at the knee and the hem
    c = hPal(3.0, look); rough = 0.9;
    if (fl.g > 0.5) { c *= 0.9 + 0.1 * fract((u * 60.0 + v * 40.0)); c *= 1.0 - 0.25 * (1.0 - smoothstep(0.0, 0.012, abs(fract(u * 2.0 + 0.25) - 0.5) - 0.24)); }
    c *= 1.0 - 0.12 * smoothstep(0.6, 1.0, sin(v * 70.0 + u * 3.0)) * (1.0 - smoothstep(0.0, 0.07, abs(v - 0.48)));
  }
  else if (zone < 7.5) { c = hPal(4.0, look); rough = 0.6; }
  else if (zone < 8.5) { c = hPal(5.0, look); rough = 0.7; }
  else if (zone < 9.5) { c = hair * (0.8 + 0.3 * smoothstep(-0.6, 0.9, sin(u * 90.0 + v * 8.0)) * 0.6 + 0.15 * smoothstep(0.0, 0.2, fract(v * 3.0))); rough = 0.5; sheen = 0.4; }   // hair: strands' light and dark
  else if (zone < 10.5) { c = hPal(6.0, look); rough = 0.8; }
  else if (zone < 11.5) { c = hPal(7.0, look); rough = 0.8; }
  else if (zone < 12.5) { c = hPal(8.0, look); rough = 0.65; }
  else if (zone < 13.5) { c = hPal(9.0, look); rough = 0.65; }
  else if (zone < 14.5) { c = vec3f(0.02); rough = 0.3; }
  else if (zone < 15.5) { c = vec3f(0.82, 0.9, 1.0); rough = 0.95; gHE = c * 0.03; }   // the mind-blown cloud
  else if (zone < 16.5) { c = vec3f(0.025); rough = 0.25; }
  else if (zone < 17.5) { c = hPal(10.0, look); rough = 0.7; }
  else if (zone < 18.5) { c = hPal(11.0, look); rough = 0.45; }
  else { c = vec3f(0.01, 0.012, 0.018); rough = 0.08; }   // lenses
  // a soft rim from the sky, a cloth's sheen at grazing angles (stylized, not cut out)
  let vd = normalize(F.camPos.xyz - wp); let fr = pow(1.0 - clamp(dot(gNw, vd), 0.0, 1.0), 3.0);
  gHE += c * fr * envDiffuse(gNw) * (0.3 + sheen);
  gHK = vec4f(rough, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
var ba = { on: !1, env: { car: null } },
  XG =
    typeof location < "u"
      ? new URLSearchParams(location.search)
      : new URLSearchParams(),
  Iht = XG.has("smoothpeds") ? "hum" : "vox",
  Z1 = Iht === "hum",
  Fht = 13,
  $G = [16, 45],
  nu = null;
function Nht() {
  return (
    nu ||
    ((nu = new Ee({
      color: 16777215,
      roughness: 0.7,
      metalness: 0,
      map: Z1 ? jG() : DG(),
    })),
    (nu.userData.mbAlbedo = Z1 ? VG : UG),
    (nu.userData.mbWind = -3),
    (nu.userData.mbSkyVis = 2),
    (nu.name = Z1 ? "people" : "voxPeople"),
    (nu.userData.mbPaletteFallback = Z1 ? 2 : 1),
    nu)
  );
}
var bo = (i, t) => {
  let e = 0;
  for (let n of t) e += n;
  let s = i() * e;
  for (let n = 0; n < t.length; n++) if ((s -= t[n]) <= 0) return n;
  return t.length - 1;
};
function Nh(i, { kid: t = null } = {}) {
  if (Z1) return Bht(i, t);
  let e =
      t === !0 ? 3 : t === !1 ? bo(i, [4, 4, 1.5]) : bo(i, [4, 4, 1.5, 1.1]),
    s = e === 1 || (e === 3 && i() < 0.5),
    n = s
      ? bo(i, [0.3, 0.5, 0, 3, 1.5, 1, 2, 1.8])
      : bo(i, [1.2, 3, 2, 0.3, 0.2, 1, 0.2, 0.2]),
    o = bo(i, [5, 1.4, 0.8, 0.7, 0.6]);
  (n === 5 || n === 4 || n === 7) && (o === 1 || o === 2 || o === 3) && (o = 0);
  let a = e === 3 ? bo(i, [3, 2, 0, 0]) : bo(i, [4, 1.6, 1.2, 1]),
    r = bo(i, [3.5, 2, 2.5, 2]),
    l = s ? bo(i, [2.5, 1.2, 2.5]) : bo(i, [5.5, 2, 0]),
    c = bo(i, [5.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.35, 0.35, 0.35, 0.35]),
    h = bo(i, [3, 3, 2, 1.5, 1, 1, 1, 0.4]),
    f = bo(i, [3, 1.2, 0, 1, 0.5, 0.25, 0.4, 0.5, 0, 0.5, 1.4, 0.2, 0.5]),
    u = Jg[e].scale,
    d = u[0] + i() * (u[1] - u[0]);
  return {
    b: e,
    hair: n,
    hat: o,
    bag: a,
    top: r,
    bottom: l,
    outfit: Math.floor(i() * OR.length),
    tone: c,
    hc: h,
    mood: f,
    seed: Math.floor(i() * 256),
    sc: d,
    sw: 0.95 + i() * 0.1,
    stride: (1.45 * (3 + Jg[e].shin + Jg[e].thigh)) / 27,
    cheer: i() < 0.55,
    ph: i() * 6.283,
  };
}
function Bht(i, t) {
  let e =
      t === !0 ? 3 : t === !1 ? bo(i, [4, 4, 1.5]) : bo(i, [4, 4, 1.5, 1.1]),
    s = e === 1 || (e === 3 && i() < 0.5),
    n = s
      ? bo(i, [0, 0.4, 0, 3, 1.5, 1, 2, 1.6])
      : bo(i, [0.8, 3, 2, 0.15, 0.1, 0.9, 0, 0.15]),
    o = bo(i, [6, 1.3, 0.7, 0.5, 0.4]);
  (n === 5 || n === 4) && (o === 1 || o === 2 || o === 3) && (o = 0);
  let a = e === 3 ? bo(i, [3, 2, 0, 0]) : bo(i, [4, 1.6, 1.2, 0.8]),
    r = bo(i, [3, 1.8, 2.4, 2]),
    l = s ? bo(i, [2.2, 1, 1.6]) : bo(i, [4.5, 1.3, 0]),
    c = Math.floor(i() * bS.length);
  (c === 20 || c === 21) && l !== 2 && (c = (c + 3) % bS.length);
  let h = i() < 0.04 ? 8 : bo(i, [1, 1.2, 1.2, 1.1, 1, 0.9, 0.8, 0.7]),
    f = bo(i, [3, 2.5, 2, 1.2, 1, 0.6, e === 3 ? 0 : 0.8, 0.15]),
    u = bo(i, [3, 1.2, 0, 0.6, 0.4, 0.2, 0.4, 0.5, 0, 0.5, 2.2, 0.15, 0.4]),
    d = ny[e].scale,
    p = d[0] + i() * (d[1] - d[0]);
  return {
    b: e,
    hair: n,
    hat: o,
    bag: a,
    top: r,
    bottom: l,
    outfit: c,
    tone: h,
    hc: f,
    mood: u,
    seed: Math.floor(i() * 256),
    sc: p,
    sw: 0.96 + i() * 0.08,
    stride: (1.5 * ny[e].hip) / 0.9,
    cheer: i() < 0.55,
    ph: i() * 6.283,
  };
}
