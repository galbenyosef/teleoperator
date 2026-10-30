// app 248 — math
// Lines 126406-126575 of readable/app.pretty.js (statement-aligned).
function PJ(o, t) {
  let e = new Set();
  for (let s of o) {
    if (s.h < 40 || (s.name && RJ.test(s.name))) continue;
    let n = AJ(...fI(s.pts));
    n && e.add(`${n[0]},${n[1]}`);
  }
  for (let s = 0; s + 1 < xn; s++)
    for (let n = 0; n + 1 < ks; n++) {
      let i = Hi(s, n),
        a = S3((i.x0 + i.x1) / 2, (i.z0 + i.z1) / 2);
      (a === Bi.FIDI || a === Bi.DOWNTOWN) && e.add(`${s},${n}`);
    }
  for (let s of t) e.delete(s);
  return e;
}
function CJ(o) {
  let t = new Set(),
    e = 45;
  for (let s of o) {
    let [n, i] = fI(s.pts);
    i > pe[ks - 1] + 20 && t.add(Math.floor(n / e) * 7919 + Math.floor(i / e));
  }
  return (s, n) => {
    let i = Math.floor(s / e),
      a = Math.floor(n / e);
    for (let r = -1; r <= 1; r++)
      for (let l = -1; l <= 1; l++)
        if (t.has((i + r) * 7919 + a + l)) return !0;
    return !1;
  };
}
function LJ({ data: o, blocks: t, C: e, G: s }) {
  let n = 0,
    i = pe[ks - 1] + ns[ks - 1].hw + ns[ks - 1].sw,
    a = new Map();
  for (let r of o) {
    let l = 1e9;
    for (let c of r.pts) l = Math.min(l, Vo(c[0], c[1], !1));
    a.set(r.id, Math.min(a.get(r.id) ?? 1e9, l));
  }
  for (let r of o) {
    if (r.name && RJ.test(r.name)) continue;
    let l = fI(r.pts);
    if (hI(l[0], l[1])) continue;
    let c = r.pts,
      h = AJ(l[0], l[1]);
    if (h) {
      if (!t.has(`${h[0]},${h[1]}`)) continue;
      c = Lvt(c, Hi(h[0], h[1]));
    } else if (
      !(l[1] > i + 4 && l[0] > he[0] - 140 && l[0] < Ye.x - 2) ||
      Ni(l[0], l[1], 14)
    )
      continue;
    if (c.length < 3) continue;
    let f = 0;
    for (let z = 0; z < c.length; z++) {
      let A = c[z],
        T = c[(z + 1) % c.length];
      f += A[0] * T[1] - T[0] * A[1];
    }
    if (Math.abs(f) < 20) continue;
    f > 0 && (c = c.slice().reverse());
    let u = a.get(r.id),
      d = u + (r.mh || 0) - (r.mh ? 0 : 0.4),
      p = u + Math.max(r.h, (r.mh || 0) + 3),
      { cell: m, tint: g } = Cvt(r),
      b = [...g, (m + 0.5) / 32],
      v = e(l[0], l[1]),
      x = s(v, "office"),
      y = s(v, "roofT"),
      M = (r.id % 97) * 7.3;
    for (let z = 0; z < c.length; z++) {
      let A = c[z],
        T = c[(z + 1) % c.length],
        E = Math.hypot(T[0] - A[0], T[1] - A[1]);
      E < 0.05 ||
        (x.wall(A[0], A[1], T[0], T[1], d, d, p, p, b, M, u), (M += E));
    }
    let S = So.triangulateShape(
        c.map((z) => new Pe(z[0], z[1])),
        [],
      ),
      w = [0.9, 0.9, 0.9, 1 / 7],
      _ = y.v;
    for (let z of c) y.vert(z[0], p, z[1], 0, 1, 0, z[0], z[1], w);
    for (let [z, A, T] of S) y.tri(_ + z, _ + T, _ + A);
    if (r.mh) {
      let z = y.v;
      for (let A of c)
        y.vert(A[0], d, A[1], 0, -1, 0, A[0], A[1], [0.35, 0.35, 0.35, 1 / 7]);
      for (let [A, T, E] of S) y.tri(z + A, z + T, z + E);
    }
    n++;
  }
  return n;
}
Pn();
var IJ = 3,
  Ivt = (o, t) =>
    `${Math.floor((o - he[0]) / (IJ * 105))},${Math.floor((t - pe[1]) / (IJ * 84))}`,
  tM = (o) => {
    let t = new It(o);
    return [t.r, t.g, t.b];
  },
  uI = [
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
  ].map(tM),
  Yz = [
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
  ].map(tM),
  DJ = [
    "#c7c2b6",
    "#b8b2a4",
    "#d6d0c2",
    "#9d9a92",
    "#a9a295",
    "#8e8a82",
    "#cfc8b8",
  ].map(tM),
  Fvt = ["#8a4a36", "#7b3f2e", "#94583f", "#6f3a2b", "#a0624a"].map(tM),
  Ovt = ["#6f8ea3", "#5b7584", "#7c96a2", "#4d6474", "#8ea6b0"].map(tM),
  dI = [
    [0.8, 0.79, 0.75],
    [0.75, 0.74, 0.7],
    [0.62, 0.6, 0.55],
  ],
  ad = (o, t) => o[Math.floor(t * o.length) % o.length],
  i2 = null,
  Ls = {
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
  Qw = (o) => (o + 0.5) / 16;
