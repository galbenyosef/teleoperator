// app 205 — math
// Lines 112316-112584 of readable/app.pretty.js (statement-aligned).
function SL(o, t, e, s, n, i, a, r, l, c) {
  let h = {},
    u = l === "upper",
    d = (_, z) => (Ot(e, _, h), [h.x + h.nx * z * i, h.y, h.z + h.nz * z * i]);
  for (let _ = s; _ <= n + 0.01; _ += 2)
    for (let z of [a, r]) {
      let A = d(Math.min(_, n), z),
        T = t.L.probe(A[0], A[2]);
      if (T.road && (T.road.J || T.road.E.name !== "Market Street")) return !1;
    }
  let p = Math.max(4, Math.round((n - s) / 2.5)),
    m = (_) => s + ((n - s) * _) / p,
    g = (_, z, A, T, E) => {
      let R = d(m(_), z),
        P = d(m(_), A),
        C = d(m(_ + 1), z),
        I = d(m(_ + 1), A),
        L = (F) => [F[0], F[1] + 0.26 + E, F[2]];
      oe(o, [L(R), L(C), L(I), L(P)], T, [0, 1, 0], (F) => [F[0], F[2]]);
    };
  for (let _ = 0; _ < p; _++) {
    (g(_, a, r, Obt, 0),
      g(_, a, a + 0.6, Hbt, 0.01),
      u && g(_, r - 0.9, r - 0.25, Gbt, 0.01));
    let z = d(m(_), a),
      A = d(m(_), r),
      T = d(m(_ + 1), a),
      E = d(m(_ + 1), r);
    for (let [R, P, C] of [
      [z, T, -1],
      [A, E, 1],
    ])
      (Ot(e, m(_), h),
        oe(
          o,
          [
            [R[0], R[1] - 0.05, R[2]],
            [P[0], P[1] - 0.05, P[2]],
            [P[0], P[1] + 0.26, P[2]],
            [R[0], R[1] + 0.26, R[2]],
          ],
          ZK,
          [h.nx * i * C, 0, h.nz * i * C],
        ));
  }
  for (let _ of [s, n]) {
    let z = d(_, a),
      A = d(_, r);
    Ot(e, _, h);
    let T = _ === s ? -1 : 1;
    oe(
      o,
      [
        [z[0], z[1] - 0.05, z[2]],
        [A[0], A[1] - 0.05, A[2]],
        [A[0], A[1] + 0.26, A[2]],
        [z[0], z[1] + 0.26, z[2]],
      ],
      ZK,
      [h.dx * T, 0, h.dz * T],
    );
  }
  let b = u ? Dbt : Az,
    v = (_) => {
      let z = d(_, r - 0.15);
      return [z[0], z[1] + 0.26, z[2]];
    };
  for (let _ = s + 0.4; _ <= n - 0.3; _ += 2.4) {
    let z = v(_);
    Ce(o, z, [z[0], z[1] + 1.05, z[2]], 0.035, b, 4);
  }
  for (let _ of [0.5, 1.05])
    for (let z = s + 0.4; z < n - 0.4; z += 2.4) {
      let A = v(z),
        T = v(Math.min(n - 0.4, z + 2.4));
      Ce(o, [A[0], A[1] + _, A[2]], [T[0], T[1] + _, T[2]], 0.025, b, 4);
    }
  {
    let _ = c > 0 ? n - 0.4 : s + 0.4,
      z = d(_, a + 0.3),
      A = d(_, r - 0.15);
    for (let T of [0.5, 1.05])
      Ce(
        o,
        [z[0], z[1] + 0.26 + T, z[2]],
        [A[0], A[1] + 0.26 + T, A[2]],
        0.025,
        b,
        4,
      );
    Ce(
      o,
      [z[0], z[1] + 0.26, z[2]],
      [z[0], z[1] + 0.26 + 1.05, z[2]],
      0.035,
      b,
      4,
    );
  }
  let x = (s + n) / 2,
    y = d(x, (a + r) / 2);
  Ot(e, x, h);
  let M = [h.dx, h.dz],
    S = [h.nx * i, h.nz * i],
    w = y[1] + 0.26;
  if (u) {
    let _ = n - s > 22 ? 3 : 2;
    for (let z = 0; z < _; z++) {
      let A = x + (z - (_ - 1) / 2) * 4.2;
      Ot(e, A, h);
      let T = d(A, (a + r) / 2),
        E = [h.dx, h.dz];
      for (let R of [-1.3, 1.3]) {
        let P = [T[0] + E[0] * R, T[2] + E[1] * R];
        Ce(
          o,
          [P[0], T[1] + 0.26, P[1]],
          [P[0], T[1] + 0.26 + 3.05, P[1]],
          0.07,
          Vbt,
          4,
        );
      }
      cn(
        o,
        [T[0], T[2]],
        E,
        S,
        1.75,
        0.8,
        T[1] + 0.26 + 3,
        T[1] + 0.26 + 3.45,
        Ubt,
      );
    }
  } else {
    let _ = [y[0] + S[0] * 0.75, y[2] + S[1] * 0.75];
    (cn(o, _, M, S, 3, 0.03, w + 0.1, w + 2.25, Bbt),
      cn(
        o,
        [y[0] + S[0] * 0.25, y[2] + S[1] * 0.25],
        M,
        S,
        3.3,
        0.85,
        w + 2.3,
        w + 2.45,
        Nbt,
      ));
    for (let z of [-3, -1, 1, 3]) {
      let A = [_[0] + M[0] * z, _[1] + M[1] * z];
      Ce(o, [A[0], w, A[1]], [A[0], w + 2.3, A[1]], 0.045, QK, 6);
    }
    cn(o, _, M, S, 3.05, 0.05, w + 2.15, w + 2.3, QK);
  }
  {
    let _ = d(c > 0 ? s + 1.2 : n - 1.2, (a + r) / 2 + 0.3);
    (Ce(
      o,
      [_[0], _[1] + 0.26, _[2]],
      [_[0], _[1] + 0.26 + 3.1, _[2]],
      0.04,
      Az,
      6,
    ),
      cn(
        o,
        [_[0], _[2]],
        M,
        S,
        0.02,
        0.22,
        _[1] + 0.26 + 2.45,
        _[1] + 0.26 + 3,
        u ? Lt(Ct.gloss, 0.08, 0.2, 0.5) : Lt(Ct.gloss, 0.62, 0.1, 0.07),
      ),
      cn(
        o,
        [_[0], _[2]],
        M,
        S,
        0.025,
        0.05,
        _[1] + 0.26 + 1,
        _[1] + 0.26 + 2.4,
        Lt(Ct.gloss, 0.8, 0.62, 0.1),
      ));
  }
  for (let _ = s; _ < n - 0.01; _ += 6.25) {
    let z = Math.min(n, _ + 6.25),
      A = d(_, (a + r) / 2),
      T = d(z, (a + r) / 2),
      E = T[0] - A[0],
      R = T[2] - A[2],
      P = Math.hypot(E, R) || 1;
    Fbt(
      t,
      [(A[0] + T[0]) / 2, (A[2] + T[2]) / 2],
      [E / P, R / P],
      P / 2,
      (r - a) / 2,
      Math.min(A[1], T[1]) - 1,
      Math.max(A[1], T[1]) + 1.3,
      { island: !0 },
    );
  }
}
function Wbt(o, t) {
  let { D: e } = t,
    s = {},
    n = new Set(mc.stops),
    i = new Set(mc.upper),
    a = new Map();
  for (let l of e.edges)
    if (l.twin) {
      let c = Ot(l, l.L / 2, {}),
        h = l.twin,
        f = null,
        u = 1e9;
      for (let d = h.s0; d <= h.s1; d += 2) {
        Ot(h, d, s);
        let p = Math.hypot(s.x - c.x, s.z - c.z);
        p < u &&
          ((u = p), (f = Math.sign((c.x - s.x) * s.nx + (c.z - s.z) * s.nz)));
      }
      if (f) {
        let d = a.get(h) || new Set();
        (d.add(f), a.set(h, d));
      }
    }
  let r = 0;
  for (let l of e.edges) {
    if (
      l.name !== "Market Street" ||
      l.inner ||
      l.elev ||
      !(l.flags & 32) ||
      l.s1 - l.s0 < 22
    )
      continue;
    let c = Ot(l, (l.s0 + l.s1) / 2, {});
    if (!l.oneway && c.x > -1700 && c.x < -100)
      for (let h of ["a", "b"]) {
        let f = e.juns[h === "a" ? l.ja : l.jb];
        if (!f || !f.legs.some(([m]) => n.has(m.name))) continue;
        let u = h === "b" ? 1 : -1;
        if (a.get(l)?.has(u)) continue;
        let d = Math.min(25, l.s1 - l.s0 - 6),
          p = h === "b" ? l.s1 - 4 - d : l.s0 + 4;
        SL(o, t, l, p, p + d, u, 5.5, 7.4, "down", u) !== !1 && r++;
      }
    else if (l.oneway && c.x < -2950 && c.x > -3750) {
      let h = (u) => u && u.legs.some(([d]) => i.has(d.name)),
        f = Math.min(28, l.s1 - l.s0 - 8);
      if (h(e.juns[l.jb])) {
        let u = l.s1 - 5 - f;
        SL(o, t, l, u, u + f, 1, -0.95, 0.95, "upper", 1) !== !1 && r++;
      } else if (h(e.juns[l.ja])) {
        let u = l.s0 + 5;
        SL(o, t, l, u, u + f, 1, -0.95, 0.95, "upper", -1) !== !1 && r++;
      }
    }
  }
  return (globalThis.SF_R20N && console.log("r20 islands", r), r);
}
var kL = Lt(Ct.gloss, 0.5, 0.26, 0.085),
  zL = Lt(Ct.gloss, 0.33, 0.16, 0.055),
  qbt = wn(1, 0.86, 0.62),
  jbt = We(we.granite, 0.62, 0.6, 0.57);
