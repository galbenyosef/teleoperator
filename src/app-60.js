// app 60 — math
// Lines 64251-64467 of readable/app.pretty.js (statement-aligned).
function PR(i, t) {
  if (i._p39) return i._p39;
  let e = null,
    s = null;
  for (let [E, A] of i.seawall.entries()) {
    let [C, P] = RR(A, ...ER),
      [I, L] = RR(A, ...AR),
      [F, N] = RR(A, ...TR);
    if (P > 6 || L > 6 || N > 25) continue;
    let B = Math.min(C, I),
      H = Math.max(C, I);
    if (!(F > B && F < H)) continue;
    let O = [];
    for (let D = C; C < I ? D <= I : D >= I; D += C < I ? 1 : -1)
      O.push([A[D * 2], A[D * 2 + 1]]);
    ((e = O), (s = { li: E, a: C, b: I }));
    break;
  }
  if (!e) return ((i._p39 = null), null);
  let n = [],
    o = {},
    a = null;
  for (let E = AR[0]; E <= ER[0] + 0.01; E += 2.5) {
    let A = t.roadAt(E, -1430, 40);
    if (!A || A.E.name !== "The Embarcadero") continue;
    ((a = A.E), vs(A.E, E, -1440, o), Ot(A.E, o.s, o));
    let C = null;
    for (let P of [1, -1]) {
      let I = o.w + (A.E.sw || 0),
        L = o.x + o.nx * P * I,
        F = o.z + o.nz * P * I;
      (!C || F < C[1]) && (C = [L, F]);
    }
    n.push([C[0], C[1] + 0.35, o.y + (t.CURB ?? 0.15)]);
  }
  if (n.length < 4 || !a) return ((i._p39 = null), null);
  let r = n.reduce((E, A) => E + A[2], 0) / n.length,
    l = [
      ...e,
      [AR[0], n[0][1]],
      ...n.map((E) => [E[0], E[1]]),
      [ER[0], n[n.length - 1][1]],
    ],
    c = l.flat(),
    h = 1e9,
    f = 1e9,
    u = -1e9,
    d = -1e9;
  for (let [E, A] of l)
    ((h = Math.min(h, E)),
      (u = Math.max(u, E)),
      (f = Math.min(f, A)),
      (d = Math.max(d, A)));
  let p = (E) => {
      let A = Math.max(
        0,
        Math.min(n.length - 2, Math.floor((E - n[0][0]) / 2.5)),
      );
      for (; A < n.length - 2 && n[A + 1][0] < E;) A++;
      for (; A > 0 && n[A][0] > E;) A--;
      let C = n[A],
        P = n[A + 1],
        I = Math.max(0, Math.min(1, (E - C[0]) / (P[0] - C[0] || 1)));
      return [C[1] + (P[1] - C[1]) * I, C[2] + (P[2] - C[2]) * I];
    },
    m = (E, A) => {
      let [C, P] = p(E),
        I = Math.max(0, C - A),
        L = Math.min(1, I / 12),
        F = L * L * (3 - 2 * L);
      return P + (r - P) * F;
    },
    g = i.bld,
    b = [],
    x = new Set(mS);
  for (let E = 0; E < g.n; E++) {
    let A = Number(g.seed[E]);
    if (!x.has(A)) continue;
    let C = g.bRing[E],
      P = Array.from(g.pts.subarray(g.rStart[C] * 2, g.rStart[C + 1] * 2)),
      I = 0,
      L = 0,
      F = 1e9,
      N = 1e9,
      B = -1e9,
      H = -1e9,
      O = P.length / 2;
    for (let U = 0; U < P.length; U += 2)
      ((I += P[U] / O),
        (L += P[U + 1] / O),
        (F = Math.min(F, P[U])),
        (B = Math.max(B, P[U])),
        (N = Math.min(N, P[U + 1])),
        (H = Math.max(H, P[U + 1])));
    let D = g.bF[E * 3 + 1] - g.bF[E * 3];
    b.push({
      id: A,
      i: E,
      ring: P,
      c: [I, L],
      bb: [F, N, B, H],
      h: D,
      name: sht[A] || "",
    });
  }
  let v = b.find((E) => E.id === wG),
    y = b.filter((E) => E.id !== wG),
    M = null;
  if (v) {
    let E = 0;
    for (let A = 0; A < v.ring.length; A += 2)
      E = Math.max(E, Math.hypot(v.ring[A] - v.c[0], v.ring[A + 1] - v.c[1]));
    M = { x: v.c[0], z: v.c[1], r: Math.max(5.2, Math.min(7, E)) };
  }
  let S = TR[0] - -1466,
    w = TR[1] - -1520,
    z = Math.hypot(S, w),
    _ = [S / z, w / z],
    R = [-_[1], _[0]],
    T = {
      lions: iht,
      wall: s,
      poly: l,
      flat: c,
      bb: [h, f, u, d],
      ring: e,
      edge: n,
      Yd: r,
      yAt: m,
      houses: y,
      carousel: M,
      axis: { o: [-1466, -1520], u: _, w: R, len: z },
      cap: nht,
    };
  if (
    ((T.colliders = y.map((E) => ({
      t: "poly",
      pts: Float32Array.from(E.ring),
      bb: E.bb,
      y0: r - 3,
      y1: r + 16,
      p39: !0,
    }))),
    M)
  ) {
    let { x: E, z: A, r: C } = M,
      P = (M.gate = 0.9),
      I = (F, N) => [E + Math.cos(N) * F, A + Math.sin(N) * F];
    T.colliders.push({
      t: "circ",
      x: E,
      z: A,
      r: C + 1.15,
      y0: r - 3,
      y1: r + 14,
      p39: !0,
    });
    let L = I(C + 1.25, P);
    ((M.booth = {
      x: L[0],
      z: L[1],
      ux: -Math.sin(P),
      uz: Math.cos(P),
      nx: Math.cos(P),
      nz: Math.sin(P),
    }),
      T.colliders.push({
        t: "obb",
        x: L[0],
        z: L[1],
        hx: 0.6,
        hz: 1.25,
        c: Math.cos(P),
        s: -Math.sin(P),
        y0: r - 1,
        y1: r + 2.6,
        p39: !0,
      }),
      (M.umbrella = I(C + 0.8, P + 0.2)));
  }
  return (
    (T.inDeck = (E, A) => E >= h && E <= u && A >= f && A <= d && en(c, E, A)),
    (T.inHouse = (E, A, C = 0) =>
      y.some(
        (P) =>
          E >= P.bb[0] - C &&
          E <= P.bb[2] + C &&
          A >= P.bb[1] - C &&
          A <= P.bb[3] + C &&
          (en(P.ring, E, A) || (C > 0 && Y1(P.ring, E, A) < C)),
      )),
    oht(T),
    (i._p39 = T),
    T
  );
}
var Xg = (i) => {
  let t = [];
  for (let e = 0; e < i.length; e += 2) t.push([i[e], i[e + 1]]);
  return (
    t.length > 1 &&
      Math.hypot(t[0][0] - t[t.length - 1][0], t[0][1] - t[t.length - 1][1]) <
        0.01 &&
      t.pop(),
    t
  );
};
function Hl(i, t, e) {
  let s = e[0] - t[0],
    n = e[1] - t[1],
    o = Math.hypot(s, n) || 1,
    a = -n / o,
    r = s / o,
    l = (t[0] + e[0]) / 2,
    c = (t[1] + e[1]) / 2;
  return en(i, l + a * 0.15, c + r * 0.15) ? [-a, -r] : [a, r];
}
