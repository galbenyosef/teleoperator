// app 229 — math
// Lines 120789-121026 of readable/app.pretty.js (statement-aligned).
es();
Pn();
Ya();
var VY = [0.55, 0.5, 0.43, 1],
  WY = [0.2, 0.15, 0.11, 1];
function qY(o, t, e, s, n, i, a) {
  let r = [(a() - 0.5) * 0.08 * i, (a() - 0.5) * 0.08 * i];
  To(
    o,
    e,
    n,
    [
      [(0.5 * i) / 24, s - 0.3],
      [(0.42 * i) / 24, s + 1],
      [(0.3 * i) / 24, s + i * 0.45],
      [(0.14 * i) / 24, s + i * 0.8],
    ],
    7,
    VY,
  );
  let l = [e + r[0], s + i * 0.8, n + r[1]],
    c = 12 + Math.floor(a() * 6);
  for (let h = 0; h < c; h++) {
    let f = a() * Math.PI * 2,
      u = (0.08 + 0.2 * Math.sqrt(a())) * i,
      d = s + i * (0.42 + 0.55 * a()),
      p = [
        e + Math.cos(f) * u * 0.8 + (r[0] * (d - s)) / i,
        d,
        n + Math.sin(f) * u * 0.8 + (r[1] * (d - s)) / i,
      ];
    h < 5 &&
      ci(
        o,
        [e + r[0] * 0.5, s + i * (0.35 + 0.1 * a()), n + r[1] * 0.5],
        p,
        0.14,
        0.14,
        VY,
      );
    let m = i * (0.14 + 0.08 * a()),
      g = 0.75 + 0.35 * a();
    for (let b = 0; b < 2; b++)
      nr(
        t,
        [p[0], p[1] - m * 0.55, p[2]],
        f + (b * Math.PI) / 2 + a(),
        m * 1.1,
        m,
        ir(2),
        [g * 0.95, g, g * 0.95, 1],
      );
  }
}
function jY(o, t, e, s, n, i, a) {
  let r = i * (0.45 + 0.15 * a()),
    l = [(a() - 0.5) * 0.3 * r, (a() - 0.5) * 0.3 * r];
  To(
    o,
    e,
    n,
    [
      [(0.4 * i) / 16, s - 0.3],
      [(0.32 * i) / 16, s + i * 0.35],
    ],
    6,
    WY,
  );
  let c = 16 + Math.floor(a() * 6);
  for (let h = 0; h < c; h++) {
    let f = a() * Math.PI * 2,
      u = r * Math.sqrt(a()),
      d = a(),
      p = s + i * (0.35 + 0.55 * d * (1 - 0.6 * (u / r) ** 2)),
      m = [
        e + Math.cos(f) * u + l[0] * d,
        p,
        n + Math.sin(f) * u * 0.85 + l[1] * d,
      ];
    h < 6 &&
      ci(o, [e, s + i * 0.3, n], [m[0], m[1] - 0.5, m[2]], 0.18, 0.18, WY);
    let g = i * (0.2 + 0.1 * a()),
      b = 0.6 + 0.35 * a();
    for (let v = 0; v < 2; v++)
      nr(
        t,
        [m[0], m[1] - g * 0.45, m[2]],
        f + (v * Math.PI) / 2,
        g * 1.2,
        g * 0.8,
        ir(3),
        [b * 0.8, b, b * 0.75, 1],
      );
    nr(
      t,
      [m[0], m[1] - g * 0.1, m[2]],
      f,
      g * 1.2,
      g * 0.4,
      ir(3),
      [b * 0.8, b, b * 0.75, 1],
      [0, 1, 0],
    );
  }
}
function WL(o) {
  let t = new Be();
  if (o === 0) {
    for (let s = 0; s < 3; s++)
      nr(
        t,
        [0, 2.2, 0],
        (s * Math.PI) / 3 + 0.2,
        14,
        9.5,
        ir(3),
        [0.62, 0.75, 0.6, 1],
        [Math.cos(s * 2.1) * 0.5, 1, Math.sin(s * 2.1) * 0.5],
      );
    nr(t, [0, 1.2, 0], 1, 3.4, 4, ir(3), [0.25, 0.22, 0.18, 1], [0, 1, 0]);
  } else {
    for (let s = 0; s < 3; s++)
      nr(
        t,
        [0, 7, 0],
        (s * Math.PI) / 3 + 0.5,
        10,
        17,
        ir(2),
        [0.8, 0.85, 0.8, 1],
        [Math.cos(s * 2.1) * 0.5, 1, Math.sin(s * 2.1) * 0.5],
      );
    nr(t, [0, 1.5, 0], 1.3, 4, 8, ir(2), [0.55, 0.6, 0.55, 1], [0, 1, 0]);
  }
  let e = t.geometry();
  return (e.computeBoundingSphere(), e);
}
var jL = {
    shore0: -120,
    shoreMax: -700,
    green: [-1300, -760, -330, -160, -168],
    mounds: !0,
    wave: [-1382, -433],
    docks: [-1800, -1440, 60, -405],
    club: [-1990, -1936, null, null],
    clubY: 3.3,
    beach: !0,
    drift: [-4150, 2100],
    presidio: !0,
  },
  XY = {
    real: !0,
    shore0: -1150,
    shoreMax: -1700,
    green: [-4262, -3760, -1340, -1150, -1170],
    mounds: !1,
    wave: [-4112, -1440],
    docks: [-4700, -4340, 60, -1250],
    club: [-4722, -4634, -1322, -1288],
    beach: !1,
    drift: [-6700, 1800],
    presidio: !1,
  },
  br = jL,
  qL = new Map();
function wh(o, t = 0) {
  let e = Math.round(o / 4) + ":" + t + ":" + br.shore0;
  if (qL.has(e)) return qL.get(e);
  let s = br.shore0;
  for (; s > br.shoreMax && Ei(o, s) > t;) s -= 1;
  return (qL.set(e, s), s);
}
function Bz(o, t, e = jL) {
  br = e;
  let s = Fa(2718);
  try {
    (jxt(o, t), $xt(o, t, s), Kxt(o, t, s), e.presidio && Yxt(o, t, s));
  } finally {
    br = jL;
  }
}
var $Y = (o, t, e) => !o.clear || o.clear(t, e);
function jxt(o, t) {
  let e = t.G("marina", "ground"),
    s = t.G("marina", "wall"),
    [n, i, a, r, l] = br.green;
  Da(
    e,
    n,
    a,
    i,
    r,
    2.5,
    (c, h) =>
      Math.min(
        h - wh(c, 2.9) - 0.2,
        l - h,
        c - n,
        i - c,
        $Y(o, c, h) ? 1 : -1,
        br.real ? wh(c, 2.9) + 6.5 - h : 1,
      ),
    (c, h) => Ei(c, h) + 0.07,
    (c, h) =>
      h < wh(c, 2.9) + 7
        ? [0.52, 0.52, 0.5, Ho.sand]
        : [0.52, 0.6, 0.45, Ho.lawn],
    Fx,
  );
  for (let c = n; c < i; c += 4) {
    let h = [c, wh(c, 2.9)],
      f = [c + 4, wh(c + 4, 2.9)];
    $s(
      s,
      [h[0], -3, h[1]],
      [f[0], -3, f[1]],
      [f[0], Ei(...f) + 0.3, f[1]],
      [h[0], Ei(...h) + 0.3, h[1]],
      [c, -3],
      [c + 4, -3],
      [c + 4, 3.5],
      [c, 3.5],
      [0.7, 0.68, 0.64, yi.granite],
      [0, 0, -1],
    );
  }
  for (let c = n + 20; c < i; c += 36) {
    let h = wh(c, 2.9) + 5.5;
    $Y(o, c, h) &&
      o.inst.push({
        kind: "lamp",
        x: c,
        y: Ei(c, h) + 0.07,
        z: h,
        rot: Math.PI,
      });
  }
}
