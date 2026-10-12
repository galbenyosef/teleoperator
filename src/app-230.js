// app 230 — math
// Lines 120533-120770 of readable/app.pretty.js (statement-aligned).
as();
En();
Oa();
var DX = [0.55, 0.5, 0.43, 1],
  UX = [0.2, 0.15, 0.11, 1];
function GX(i, t, e, s, n, o, a) {
  let r = [(a() - 0.5) * 0.08 * o, (a() - 0.5) * 0.08 * o];
  yo(
    i,
    e,
    n,
    [
      [(0.5 * o) / 24, s - 0.3],
      [(0.42 * o) / 24, s + 1],
      [(0.3 * o) / 24, s + o * 0.45],
      [(0.14 * o) / 24, s + o * 0.8],
    ],
    7,
    DX,
  );
  let l = [e + r[0], s + o * 0.8, n + r[1]],
    c = 12 + Math.floor(a() * 6);
  for (let h = 0; h < c; h++) {
    let f = a() * Math.PI * 2,
      u = (0.08 + 0.2 * Math.sqrt(a())) * o,
      d = s + o * (0.42 + 0.55 * a()),
      p = [
        e + Math.cos(f) * u * 0.8 + (r[0] * (d - s)) / o,
        d,
        n + Math.sin(f) * u * 0.8 + (r[1] * (d - s)) / o,
      ];
    h < 5 &&
      ii(
        i,
        [e + r[0] * 0.5, s + o * (0.35 + 0.1 * a()), n + r[1] * 0.5],
        p,
        0.14,
        0.14,
        DX,
      );
    let m = o * (0.14 + 0.08 * a()),
      g = 0.75 + 0.35 * a();
    for (let b = 0; b < 2; b++)
      Ga(
        t,
        [p[0], p[1] - m * 0.55, p[2]],
        f + (b * Math.PI) / 2 + a(),
        m * 1.1,
        m,
        Wa(2),
        [g * 0.95, g, g * 0.95, 1],
      );
  }
}
function WX(i, t, e, s, n, o, a) {
  let r = o * (0.45 + 0.15 * a()),
    l = [(a() - 0.5) * 0.3 * r, (a() - 0.5) * 0.3 * r];
  yo(
    i,
    e,
    n,
    [
      [(0.4 * o) / 16, s - 0.3],
      [(0.32 * o) / 16, s + o * 0.35],
    ],
    6,
    UX,
  );
  let c = 16 + Math.floor(a() * 6);
  for (let h = 0; h < c; h++) {
    let f = a() * Math.PI * 2,
      u = r * Math.sqrt(a()),
      d = a(),
      p = s + o * (0.35 + 0.55 * d * (1 - 0.6 * (u / r) ** 2)),
      m = [
        e + Math.cos(f) * u + l[0] * d,
        p,
        n + Math.sin(f) * u * 0.85 + l[1] * d,
      ];
    h < 6 &&
      ii(i, [e, s + o * 0.3, n], [m[0], m[1] - 0.5, m[2]], 0.18, 0.18, UX);
    let g = o * (0.2 + 0.1 * a()),
      b = 0.6 + 0.35 * a();
    for (let x = 0; x < 2; x++)
      Ga(
        t,
        [m[0], m[1] - g * 0.45, m[2]],
        f + (x * Math.PI) / 2,
        g * 1.2,
        g * 0.8,
        Wa(3),
        [b * 0.8, b, b * 0.75, 1],
      );
    Ga(
      t,
      [m[0], m[1] - g * 0.1, m[2]],
      f,
      g * 1.2,
      g * 0.4,
      Wa(3),
      [b * 0.8, b, b * 0.75, 1],
      [0, 1, 0],
    );
  }
}
function pC(i) {
  let t = new Ce();
  if (i === 0) {
    for (let s = 0; s < 3; s++)
      Ga(
        t,
        [0, 2.2, 0],
        (s * Math.PI) / 3 + 0.2,
        14,
        9.5,
        Wa(3),
        [0.62, 0.75, 0.6, 1],
        [Math.cos(s * 2.1) * 0.5, 1, Math.sin(s * 2.1) * 0.5],
      );
    Ga(t, [0, 1.2, 0], 1, 3.4, 4, Wa(3), [0.25, 0.22, 0.18, 1], [0, 1, 0]);
  } else {
    for (let s = 0; s < 3; s++)
      Ga(
        t,
        [0, 7, 0],
        (s * Math.PI) / 3 + 0.5,
        10,
        17,
        Wa(2),
        [0.8, 0.85, 0.8, 1],
        [Math.cos(s * 2.1) * 0.5, 1, Math.sin(s * 2.1) * 0.5],
      );
    Ga(t, [0, 1.5, 0], 1.3, 4, 8, Wa(2), [0.55, 0.6, 0.55, 1], [0, 1, 0]);
  }
  let e = t.geometry();
  return (e.computeBoundingSphere(), e);
}
var gC = {
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
  jX = {
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
  er = gC,
  mC = new Map();
function jc(i, t = 0) {
  let e = Math.round(i / 4) + ":" + t + ":" + er.shore0;
  if (mC.has(e)) return mC.get(e);
  let s = er.shore0;
  for (; s > er.shoreMax && di(i, s) > t;) s -= 1;
  return (mC.set(e, s), s);
}
function Bk(i, t, e = gC) {
  er = e;
  let s = ka(2718);
  try {
    (M2t(i, t), S2t(i, t, s), _2t(i, t, s), e.presidio && z2t(i, t, s));
  } finally {
    er = gC;
  }
}
var qX = (i, t, e) => !i.clear || i.clear(t, e);
function M2t(i, t) {
  let e = t.G("marina", "ground"),
    s = t.G("marina", "wall"),
    [n, o, a, r, l] = er.green;
  Aa(
    e,
    n,
    a,
    o,
    r,
    2.5,
    (c, h) =>
      Math.min(
        h - jc(c, 2.9) - 0.2,
        l - h,
        c - n,
        o - c,
        qX(i, c, h) ? 1 : -1,
        er.real ? jc(c, 2.9) + 6.5 - h : 1,
      ),
    (c, h) => di(c, h) + 0.07,
    (c, h) =>
      h < jc(c, 2.9) + 7
        ? [0.52, 0.52, 0.5, To.sand]
        : [0.52, 0.6, 0.45, To.lawn],
    Kb,
  );
  for (let c = n; c < o; c += 4) {
    let h = [c, jc(c, 2.9)],
      f = [c + 4, jc(c + 4, 2.9)];
    js(
      s,
      [h[0], -3, h[1]],
      [f[0], -3, f[1]],
      [f[0], di(...f) + 0.3, f[1]],
      [h[0], di(...h) + 0.3, h[1]],
      [c, -3],
      [c + 4, -3],
      [c + 4, 3.5],
      [c, 3.5],
      [0.7, 0.68, 0.64, hi.granite],
      [0, 0, -1],
    );
  }
  for (let c = n + 20; c < o; c += 36) {
    let h = jc(c, 2.9) + 5.5;
    qX(i, c, h) &&
      i.inst.push({
        kind: "lamp",
        x: c,
        y: di(c, h) + 0.07,
        z: h,
        rot: Math.PI,
      });
  }
}
