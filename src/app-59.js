// app 59 — math
// Lines 64482-64698 of readable/app.pretty.js (statement-aligned).
function rP(o, t) {
  if (o._p39) return o._p39;
  let e = null,
    s = null;
  for (let [E, R] of o.seawall.entries()) {
    let [P, C] = aP(R, ...nP),
      [I, L] = aP(R, ...oP),
      [F, O] = aP(R, ...iP);
    if (C > 6 || L > 6 || O > 25) continue;
    let B = Math.min(P, I),
      H = Math.max(P, I);
    if (!(F > B && F < H)) continue;
    let N = [];
    for (let D = P; P < I ? D <= I : D >= I; D += P < I ? 1 : -1)
      N.push([R[D * 2], R[D * 2 + 1]]);
    ((e = N), (s = { li: E, a: P, b: I }));
    break;
  }
  if (!e) return ((o._p39 = null), null);
  let n = [],
    i = {},
    a = null;
  for (let E = oP[0]; E <= nP[0] + 0.01; E += 2.5) {
    let R = t.roadAt(E, -1430, 40);
    if (!R || R.E.name !== "The Embarcadero") continue;
    ((a = R.E), ys(R.E, E, -1440, i), Ot(R.E, i.s, i));
    let P = null;
    for (let C of [1, -1]) {
      let I = i.w + (R.E.sw || 0),
        L = i.x + i.nx * C * I,
        F = i.z + i.nz * C * I;
      (!P || F < P[1]) && (P = [L, F]);
    }
    n.push([P[0], P[1] + 0.35, i.y + (t.CURB ?? 0.15)]);
  }
  if (n.length < 4 || !a) return ((o._p39 = null), null);
  let r = n.reduce((E, R) => E + R[2], 0) / n.length,
    l = [
      ...e,
      [oP[0], n[0][1]],
      ...n.map((E) => [E[0], E[1]]),
      [nP[0], n[n.length - 1][1]],
    ],
    c = l.flat(),
    h = 1e9,
    f = 1e9,
    u = -1e9,
    d = -1e9;
  for (let [E, R] of l)
    ((h = Math.min(h, E)),
      (u = Math.max(u, E)),
      (f = Math.min(f, R)),
      (d = Math.max(d, R)));
  let p = (E) => {
      let R = Math.max(
        0,
        Math.min(n.length - 2, Math.floor((E - n[0][0]) / 2.5)),
      );
      for (; R < n.length - 2 && n[R + 1][0] < E;) R++;
      for (; R > 0 && n[R][0] > E;) R--;
      let P = n[R],
        C = n[R + 1],
        I = Math.max(0, Math.min(1, (E - P[0]) / (C[0] - P[0] || 1)));
      return [P[1] + (C[1] - P[1]) * I, P[2] + (C[2] - P[2]) * I];
    },
    m = (E, R) => {
      let [P, C] = p(E),
        I = Math.max(0, P - R),
        L = Math.min(1, I / 12),
        F = L * L * (3 - 2 * L);
      return C + (r - C) * F;
    },
    g = o.bld,
    b = [],
    v = new Set(bk);
  for (let E = 0; E < g.n; E++) {
    let R = Number(g.seed[E]);
    if (!v.has(R)) continue;
    let P = g.bRing[E],
      C = Array.from(g.pts.subarray(g.rStart[P] * 2, g.rStart[P + 1] * 2)),
      I = 0,
      L = 0,
      F = 1e9,
      O = 1e9,
      B = -1e9,
      H = -1e9,
      N = C.length / 2;
    for (let U = 0; U < C.length; U += 2)
      ((I += C[U] / N),
        (L += C[U + 1] / N),
        (F = Math.min(F, C[U])),
        (B = Math.max(B, C[U])),
        (O = Math.min(O, C[U + 1])),
        (H = Math.max(H, C[U + 1])));
    let D = g.bF[E * 3 + 1] - g.bF[E * 3];
    b.push({
      id: R,
      i: E,
      ring: C,
      c: [I, L],
      bb: [F, O, B, H],
      h: D,
      name: Sdt[R] || "",
    });
  }
  let x = b.find((E) => E.id === SW),
    y = b.filter((E) => E.id !== SW),
    M = null;
  if (x) {
    let E = 0;
    for (let R = 0; R < x.ring.length; R += 2)
      E = Math.max(E, Math.hypot(x.ring[R] - x.c[0], x.ring[R + 1] - x.c[1]));
    M = { x: x.c[0], z: x.c[1], r: Math.max(5.2, Math.min(7, E)) };
  }
  let S = iP[0] - -1466,
    w = iP[1] - -1520,
    _ = Math.hypot(S, w),
    z = [S / _, w / _],
    A = [-z[1], z[0]],
    T = {
      lions: zdt,
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
      axis: { o: [-1466, -1520], u: z, w: A, len: _ },
      cap: kdt,
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
    let { x: E, z: R, r: P } = M,
      C = (M.gate = 0.9),
      I = (F, O) => [E + Math.cos(O) * F, R + Math.sin(O) * F];
    T.colliders.push({
      t: "circ",
      x: E,
      z: R,
      r: P + 1.15,
      y0: r - 3,
      y1: r + 14,
      p39: !0,
    });
    let L = I(P + 1.25, C);
    ((M.booth = {
      x: L[0],
      z: L[1],
      ux: -Math.sin(C),
      uz: Math.cos(C),
      nx: Math.cos(C),
      nz: Math.sin(C),
    }),
      T.colliders.push({
        t: "obb",
        x: L[0],
        z: L[1],
        hx: 0.6,
        hz: 1.25,
        c: Math.cos(C),
        s: -Math.sin(C),
        y0: r - 1,
        y1: r + 2.6,
        p39: !0,
      }),
      (M.umbrella = I(P + 0.8, C + 0.2)));
  }
  return (
    (T.inDeck = (E, R) => E >= h && E <= u && R >= f && R <= d && rn(c, E, R)),
    (T.inHouse = (E, R, P = 0) =>
      y.some(
        (C) =>
          E >= C.bb[0] - P &&
          E <= C.bb[2] + P &&
          R >= C.bb[1] - P &&
          R <= C.bb[3] + P &&
          (rn(C.ring, E, R) || (P > 0 && Im(C.ring, E, R) < P)),
      )),
    _dt(T),
    (o._p39 = T),
    T
  );
}
var Bb = (o) => {
  let t = [];
  for (let e = 0; e < o.length; e += 2) t.push([o[e], o[e + 1]]);
  return (
    t.length > 1 &&
      Math.hypot(t[0][0] - t[t.length - 1][0], t[0][1] - t[t.length - 1][1]) <
        0.01 &&
      t.pop(),
    t
  );
};
function ac(o, t, e) {
  let s = e[0] - t[0],
    n = e[1] - t[1],
    i = Math.hypot(s, n) || 1,
    a = -n / i,
    r = s / i,
    l = (t[0] + e[0]) / 2,
    c = (t[1] + e[1]) / 2;
  return rn(o, l + a * 0.15, c + r * 0.15) ? [-a, -r] : [a, r];
}
