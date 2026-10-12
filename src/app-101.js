// app 101 — math
// Lines 78857-79039 of readable/app.pretty.js (statement-aligned).
var Ho = {
  o: [-1246.3, 1222],
  n: [-Math.sin((9.3 * Math.PI) / 180), -Math.cos((9.3 * Math.PI) / 180)],
  court: { e0: -54, e1: -30, n0: -12, n1: 5 },
  stair: { e0: -30, e1: -18, n0: -6, n1: 3 },
  poly: [
    [-63, 13],
    [-10.5, 13],
    [-10.5, -3.5],
    [-15.5, -6.2],
    [-26, -13.5],
    [-36.5, -21],
    [-50, -21.5],
    [-63, -14],
  ],
};
Ho.e = [-Ho.n[1], Ho.n[0]];
Ho.at = (i, t) => [
  Ho.o[0] + Ho.n[0] * t + Ho.e[0] * i,
  Ho.o[1] + Ho.n[1] * t + Ho.e[1] * i,
];
Ho.frame = (i, t) => {
  let e = i - Ho.o[0],
    s = t - Ho.o[1];
  return [e * Ho.e[0] + s * Ho.e[1], e * Ho.n[0] + s * Ho.n[1]];
};
Ho.inside = (i, t) => {
  let e = Ho.poly,
    s = !1;
  for (let n = 0, o = e.length - 1; n < e.length; o = n++) {
    let [a, r] = e[n],
      [l, c] = e[o];
    r > t != c > t && i < ((l - a) * (t - r)) / (c - r) + a && (s = !s);
  }
  return s;
};
function Sft(i) {
  let t = i.terrain;
  if (!t) return;
  t.holes ||= new Set();
  let e = Ho;
  for (let s = 0; s < t.nz - 1; s++) {
    let n = t.z0 + s * t.step;
    if (!(n < 1150 || n > 1300))
      for (let o = 0; o < t.nx - 1; o++) {
        let a = t.x0 + o * t.step;
        if (a < -1340 || a > -1220) continue;
        let r = !0;
        for (let [l, c] of [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]) {
          let [h, f] = e.frame(a + l * t.step, n + c * t.step);
          if (!e.inside(h, f)) {
            r = !1;
            break;
          }
        }
        r && t.holes.add(s * t.nx + o);
      }
  }
}
var kft = {
    a: [-3045, 2888.9],
    m: [-2963.1, 2883],
    hw: 4.6,
    s0: 14,
    depth: 7.2,
    apron: 6.5,
  },
  i7 = (i, t, e) => {
    let s = t - i.a[0],
      n = e - i.a[1];
    return [s * i.ux + n * i.uz, -s * i.uz + n * i.ux];
  };
function by(i, t, e, s = 0) {
  let n = i.duboce;
  if (!n) return !1;
  let [o, a] = i7(n, t, e);
  return o > n.s0 - 8 - s && o < n.L + 1 + s && Math.abs(a) < n.hw + s;
}
function _ft(i) {
  let t = i.terrain;
  if (!t) return;
  t.holes ||= new Set();
  let e = { ...kft };
  if (
    ((e.L = Math.hypot(e.m[0] - e.a[0], e.m[1] - e.a[1])),
    (e.ux = (e.m[0] - e.a[0]) / e.L),
    (e.uz = (e.m[1] - e.a[1]) / e.L),
    e.a[0] < t.x0 || e.m[0] > t.x0 + (t.nx - 1) * t.step)
  )
    return;
  let s = (y, M) => {
      let S = (y - t.x0) / t.step,
        w = (M - t.z0) / t.step,
        z = Math.max(0, Math.min(t.nx - 2, Math.floor(S))),
        _ = Math.max(0, Math.min(t.nz - 2, Math.floor(w))),
        R = S - z,
        T = w - _,
        E = (A, C) => t.h[C * t.nx + A];
      return (
        (E(z, _) * (1 - R) + E(z + 1, _) * R) * (1 - T) +
        (E(z, _ + 1) * (1 - R) + E(z + 1, _ + 1) * R) * T
      );
    },
    n = (y, M) => [e.a[0] + e.ux * y - e.uz * M, e.a[1] + e.uz * y + e.ux * M],
    o = -60,
    a = e.L + 6,
    r = [];
  for (let y = o - 10; y <= a + 10; y += 2)
    r.push(0.5 * (s(...n(y, -10)) + s(...n(y, 10))));
  let l = (y) => {
      let M = (Math.max(o - 10, Math.min(a + 10, y)) - (o - 10)) / 2,
        S = Math.min(r.length - 2, Math.floor(M));
      return r[S] + (r[S + 1] - r[S]) * (M - S);
    },
    c = [];
  for (let y = o; y <= a; y += 2) {
    let M = 0,
      S = 0;
    for (let w = -10; w <= 10; w += 2) ((M += l(y + w)), S++);
    c.push(M / S);
  }
  ((e.lip = (y) => {
    let M = (Math.max(o, Math.min(a, y)) - o) / 2,
      S = Math.min(c.length - 2, Math.floor(M));
    return c[S] + (c[S + 1] - c[S]) * (M - S);
  }),
    (e.yM = e.lip(e.L) - e.depth),
    (e.floor = (y) => {
      let M = e.lip(e.s0),
        S = Math.max(0, Math.min(1, (y - e.s0) / (e.L - e.s0)));
      return y < e.s0
        ? e.lip(y) + 0.02
        : M + (e.yM - M) * 0.5 * (S + S * S * (3 - 2 * S));
    }));
  let h = Math.min(e.a[0], e.m[0]) - 90,
    f = Math.max(e.a[0], e.m[0]) + 30,
    u = Math.min(e.a[1], e.m[1]) - 40,
    d = Math.max(e.a[1], e.m[1]) + 40,
    p = Math.max(0, Math.floor((h - t.x0) / t.step)),
    m = Math.min(t.nx - 2, Math.ceil((f - t.x0) / t.step)),
    g = Math.max(0, Math.floor((u - t.z0) / t.step)),
    b = Math.min(t.nz - 2, Math.ceil((d - t.z0) / t.step)),
    x = e.hw + 8,
    v = e.hw + 18;
  for (let y = g; y <= b + 1; y++)
    for (let M = p; M <= m + 1; M++) {
      let [S, w] = i7(e, t.x0 + M * t.step, t.z0 + y * t.step),
        z = y * t.nx + M,
        _ = Math.abs(w);
      if (_ > v || S < o - 8 || S > a + 8) continue;
      let R = Math.min(
          1,
          Math.max(0, (S - (o - 8)) / 8),
          Math.max(0, (a + 8 - S) / 8),
        ),
        T = _ < x ? 1 : 1 - (_ - x) / (v - x),
        E = R * T;
      t.h[z] = t.h[z] + (e.lip(S) - t.h[z]) * E;
    }
  for (let y = g; y <= b; y++)
    for (let M = p; M <= m; M++) {
      let S = !1;
      for (let [w, z] of [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]) {
        let [_, R] = i7(e, t.x0 + (M + w) * t.step, t.z0 + (y + z) * t.step);
        if (_ > e.s0 - 6 && _ < e.L - 0.3 && Math.abs(R) < e.hw) {
          S = !0;
          break;
        }
      }
      S && t.holes.add(y * t.nx + M);
    }
  i.duboce = e;
}
