// app 249 — math
// Lines 126147-126316 of readable/app.pretty.js (statement-aligned).
function TK(i, t) {
  let e = new Set();
  for (let s of i) {
    if (s.h < 40 || (s.name && zK.test(s.name))) continue;
    let n = EK(...FC(s.pts));
    n && e.add(`${n[0]},${n[1]}`);
  }
  for (let s = 0; s + 1 < mn; s++)
    for (let n = 0; n + 1 < ws; n++) {
      let o = Ei(s, n),
        a = Ev((o.x0 + o.x1) / 2, (o.z0 + o.z1) / 2);
      (a === zi.FIDI || a === zi.DOWNTOWN) && e.add(`${s},${n}`);
    }
  for (let s of t) e.delete(s);
  return e;
}
function AK(i) {
  let t = new Set(),
    e = 45;
  for (let s of i) {
    let [n, o] = FC(s.pts);
    o > fe[ws - 1] + 20 && t.add(Math.floor(n / e) * 7919 + Math.floor(o / e));
  }
  return (s, n) => {
    let o = Math.floor(s / e),
      a = Math.floor(n / e);
    for (let r = -1; r <= 1; r++)
      for (let l = -1; l <= 1; l++)
        if (t.has((o + r) * 7919 + a + l)) return !0;
    return !1;
  };
}
function RK({ data: i, blocks: t, C: e, G: s }) {
  let n = 0,
    o = fe[ws - 1] + Qe[ws - 1].hw + Qe[ws - 1].sw,
    a = new Map();
  for (let r of i) {
    let l = 1e9;
    for (let c of r.pts) l = Math.min(l, Io(c[0], c[1], !1));
    a.set(r.id, Math.min(a.get(r.id) ?? 1e9, l));
  }
  for (let r of i) {
    if (r.name && zK.test(r.name)) continue;
    let l = FC(r.pts);
    if (IC(l[0], l[1])) continue;
    let c = r.pts,
      h = EK(l[0], l[1]);
    if (h) {
      if (!t.has(`${h[0]},${h[1]}`)) continue;
      c = cgt(c, Ei(h[0], h[1]));
    } else if (
      !(l[1] > o + 4 && l[0] > ae[0] - 140 && l[0] < Ve.x - 2) ||
      Hi(l[0], l[1], 14)
    )
      continue;
    if (c.length < 3) continue;
    let f = 0;
    for (let _ = 0; _ < c.length; _++) {
      let R = c[_],
        T = c[(_ + 1) % c.length];
      f += R[0] * T[1] - T[0] * R[1];
    }
    if (Math.abs(f) < 20) continue;
    f > 0 && (c = c.slice().reverse());
    let u = a.get(r.id),
      d = u + (r.mh || 0) - (r.mh ? 0 : 0.4),
      p = u + Math.max(r.h, (r.mh || 0) + 3),
      { cell: m, tint: g } = lgt(r),
      b = [...g, (m + 0.5) / 32],
      x = e(l[0], l[1]),
      v = s(x, "office"),
      y = s(x, "roofT"),
      M = (r.id % 97) * 7.3;
    for (let _ = 0; _ < c.length; _++) {
      let R = c[_],
        T = c[(_ + 1) % c.length],
        E = Math.hypot(T[0] - R[0], T[1] - R[1]);
      E < 0.05 ||
        (v.wall(R[0], R[1], T[0], T[1], d, d, p, p, b, M, u), (M += E));
    }
    let S = mo.triangulateShape(
        c.map((_) => new Re(_[0], _[1])),
        [],
      ),
      w = [0.9, 0.9, 0.9, 1 / 7],
      z = y.v;
    for (let _ of c) y.vert(_[0], p, _[1], 0, 1, 0, _[0], _[1], w);
    for (let [_, R, T] of S) y.tri(z + _, z + T, z + R);
    if (r.mh) {
      let _ = y.v;
      for (let R of c)
        y.vert(R[0], d, R[1], 0, -1, 0, R[0], R[1], [0.35, 0.35, 0.35, 1 / 7]);
      for (let [R, T, E] of S) y.tri(_ + R, _ + T, _ + E);
    }
    n++;
  }
  return n;
}
En();
var PK = 3,
  hgt = (i, t) =>
    `${Math.floor((i - ae[0]) / (PK * 105))},${Math.floor((t - fe[1]) / (PK * 84))}`,
  ow = (i) => {
    let t = new $t(i);
    return [t.r, t.g, t.b];
  },
  NC = [
    "#8fb3c9",
    "#a7c4a0",
    "#e8d9a8",
    "#d9a7a0",
    "#c6c8cc",
    "#f1ede4",
    "#7d9bb5",
    "#b6a3c7",
    "#e0c07a",
    "#9cb8a9",
    "#d7b8a2",
    "#5f7d8e",
    "#c9d6df",
    "#e6cfd4",
    "#bfb08f",
    "#86a3a0",
    "#d4c5a8",
    "#f2e6c9",
  ].map(ow),
  Yk = [
    "#e9e1d0",
    "#ddd3bf",
    "#efe8da",
    "#d5cab4",
    "#e7d6c0",
    "#cfc7b8",
    "#e3dccf",
    "#d9c3a5",
    "#c9beaa",
    "#f0eadf",
  ].map(ow),
  BK = [
    "#c7c2b6",
    "#b8b2a4",
    "#d6d0c2",
    "#9d9a92",
    "#a9a295",
    "#8e8a82",
    "#cfc8b8",
  ].map(ow),
  fgt = ["#8a4a36", "#7b3f2e", "#94583f", "#6f3a2b", "#a0624a"].map(ow),
  ugt = ["#6f8ea3", "#5b7584", "#7c96a2", "#4d6474", "#8ea6b0"].map(ow),
  BC = [
    [0.8, 0.79, 0.75],
    [0.75, 0.74, 0.7],
    [0.62, 0.6, 0.55],
  ],
  _u = (i, t) => i[Math.floor(t * i.length) % i.length],
  mm = null,
  Rs = {
    VIC: 0,
    APT: 1,
    MIX: 2,
    OFF: 3,
    RIB: 4,
    CUR: 5,
    BRK: 6,
    PIER: 7,
    BLANK: 8,
    EDW: 9,
    CHN: 10,
  },
  iw = (i) => (i + 0.5) / 16;
