// app 206 — math
// Lines 112060-112328 of readable/app.pretty.js (statement-aligned).
function $P(i, t, e, s, n, o, a, r, l, c) {
  let h = {},
    u = l === "upper",
    d = (z, _) => (Ot(e, z, h), [h.x + h.nx * _ * o, h.y, h.z + h.nz * _ * o]);
  for (let z = s; z <= n + 0.01; z += 2)
    for (let _ of [a, r]) {
      let R = d(Math.min(z, n), _),
        T = t.L.probe(R[0], R[2]);
      if (T.road && (T.road.J || T.road.E.name !== "Market Street")) return !1;
    }
  let p = Math.max(4, Math.round((n - s) / 2.5)),
    m = (z) => s + ((n - s) * z) / p,
    g = (z, _, R, T, E) => {
      let A = d(m(z), _),
        C = d(m(z), R),
        P = d(m(z + 1), _),
        I = d(m(z + 1), R),
        L = (F) => [F[0], F[1] + 0.26 + E, F[2]];
      ne(i, [L(A), L(P), L(I), L(C)], T, [0, 1, 0], (F) => [F[0], F[2]]);
    };
  for (let z = 0; z < p; z++) {
    (g(z, a, r, umt, 0),
      g(z, a, a + 0.6, mmt, 0.01),
      u && g(z, r - 0.9, r - 0.25, xmt, 0.01));
    let _ = d(m(z), a),
      R = d(m(z), r),
      T = d(m(z + 1), a),
      E = d(m(z + 1), r);
    for (let [A, C, P] of [
      [_, T, -1],
      [R, E, 1],
    ])
      (Ot(e, m(z), h),
        ne(
          i,
          [
            [A[0], A[1] - 0.05, A[2]],
            [C[0], C[1] - 0.05, C[2]],
            [C[0], C[1] + 0.26, C[2]],
            [A[0], A[1] + 0.26, A[2]],
          ],
          K$,
          [h.nx * o * P, 0, h.nz * o * P],
        ));
  }
  for (let z of [s, n]) {
    let _ = d(z, a),
      R = d(z, r);
    Ot(e, z, h);
    let T = z === s ? -1 : 1;
    ne(
      i,
      [
        [_[0], _[1] - 0.05, _[2]],
        [R[0], R[1] - 0.05, R[2]],
        [R[0], R[1] + 0.26, R[2]],
        [_[0], _[1] + 0.26, _[2]],
      ],
      K$,
      [h.dx * T, 0, h.dz * T],
    );
  }
  let b = u ? gmt : Rk,
    x = (z) => {
      let _ = d(z, r - 0.15);
      return [_[0], _[1] + 0.26, _[2]];
    };
  for (let z = s + 0.4; z <= n - 0.3; z += 2.4) {
    let _ = x(z);
    Ae(i, _, [_[0], _[1] + 1.05, _[2]], 0.035, b, 4);
  }
  for (let z of [0.5, 1.05])
    for (let _ = s + 0.4; _ < n - 0.4; _ += 2.4) {
      let R = x(_),
        T = x(Math.min(n - 0.4, _ + 2.4));
      Ae(i, [R[0], R[1] + z, R[2]], [T[0], T[1] + z, T[2]], 0.025, b, 4);
    }
  {
    let z = c > 0 ? n - 0.4 : s + 0.4,
      _ = d(z, a + 0.3),
      R = d(z, r - 0.15);
    for (let T of [0.5, 1.05])
      Ae(
        i,
        [_[0], _[1] + 0.26 + T, _[2]],
        [R[0], R[1] + 0.26 + T, R[2]],
        0.025,
        b,
        4,
      );
    Ae(
      i,
      [_[0], _[1] + 0.26, _[2]],
      [_[0], _[1] + 0.26 + 1.05, _[2]],
      0.035,
      b,
      4,
    );
  }
  let v = (s + n) / 2,
    y = d(v, (a + r) / 2);
  Ot(e, v, h);
  let M = [h.dx, h.dz],
    S = [h.nx * o, h.nz * o],
    w = y[1] + 0.26;
  if (u) {
    let z = n - s > 22 ? 3 : 2;
    for (let _ = 0; _ < z; _++) {
      let R = v + (_ - (z - 1) / 2) * 4.2;
      Ot(e, R, h);
      let T = d(R, (a + r) / 2),
        E = [h.dx, h.dz];
      for (let A of [-1.3, 1.3]) {
        let C = [T[0] + E[0] * A, T[2] + E[1] * A];
        Ae(
          i,
          [C[0], T[1] + 0.26, C[1]],
          [C[0], T[1] + 0.26 + 3.05, C[1]],
          0.07,
          vmt,
          4,
        );
      }
      nn(
        i,
        [T[0], T[2]],
        E,
        S,
        1.75,
        0.8,
        T[1] + 0.26 + 3,
        T[1] + 0.26 + 3.45,
        bmt,
      );
    }
  } else {
    let z = [y[0] + S[0] * 0.75, y[2] + S[1] * 0.75];
    (nn(i, z, M, S, 3, 0.03, w + 0.1, w + 2.25, dmt),
      nn(
        i,
        [y[0] + S[0] * 0.25, y[2] + S[1] * 0.25],
        M,
        S,
        3.3,
        0.85,
        w + 2.3,
        w + 2.45,
        pmt,
      ));
    for (let _ of [-3, -1, 1, 3]) {
      let R = [z[0] + M[0] * _, z[1] + M[1] * _];
      Ae(i, [R[0], w, R[1]], [R[0], w + 2.3, R[1]], 0.045, Y$, 6);
    }
    nn(i, z, M, S, 3.05, 0.05, w + 2.15, w + 2.3, Y$);
  }
  {
    let z = d(c > 0 ? s + 1.2 : n - 1.2, (a + r) / 2 + 0.3);
    (Ae(
      i,
      [z[0], z[1] + 0.26, z[2]],
      [z[0], z[1] + 0.26 + 3.1, z[2]],
      0.04,
      Rk,
      6,
    ),
      nn(
        i,
        [z[0], z[2]],
        M,
        S,
        0.02,
        0.22,
        z[1] + 0.26 + 2.45,
        z[1] + 0.26 + 3,
        u ? It(Lt.gloss, 0.08, 0.2, 0.5) : It(Lt.gloss, 0.62, 0.1, 0.07),
      ),
      nn(
        i,
        [z[0], z[2]],
        M,
        S,
        0.025,
        0.05,
        z[1] + 0.26 + 1,
        z[1] + 0.26 + 2.4,
        It(Lt.gloss, 0.8, 0.62, 0.1),
      ));
  }
  for (let z = s; z < n - 0.01; z += 6.25) {
    let _ = Math.min(n, z + 6.25),
      R = d(z, (a + r) / 2),
      T = d(_, (a + r) / 2),
      E = T[0] - R[0],
      A = T[2] - R[2],
      C = Math.hypot(E, A) || 1;
    fmt(
      t,
      [(R[0] + T[0]) / 2, (R[2] + T[2]) / 2],
      [E / C, A / C],
      C / 2,
      (r - a) / 2,
      Math.min(R[1], T[1]) - 1,
      Math.max(R[1], T[1]) + 1.3,
      { island: !0 },
    );
  }
}
function ymt(i, t) {
  let { D: e } = t,
    s = {},
    n = new Set(Xl.stops),
    o = new Set(Xl.upper),
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
        $P(i, t, l, p, p + d, u, 5.5, 7.4, "down", u) !== !1 && r++;
      }
    else if (l.oneway && c.x < -2950 && c.x > -3750) {
      let h = (u) => u && u.legs.some(([d]) => o.has(d.name)),
        f = Math.min(28, l.s1 - l.s0 - 8);
      if (h(e.juns[l.jb])) {
        let u = l.s1 - 5 - f;
        $P(i, t, l, u, u + f, 1, -0.95, 0.95, "upper", 1) !== !1 && r++;
      } else if (h(e.juns[l.ja])) {
        let u = l.s0 + 5;
        $P(i, t, l, u, u + f, 1, -0.95, 0.95, "upper", -1) !== !1 && r++;
      }
    }
  }
  return (globalThis.SF_R20N && console.log("r20 islands", r), r);
}
var XP = It(Lt.gloss, 0.5, 0.26, 0.085),
  KP = It(Lt.gloss, 0.33, 0.16, 0.055),
  wmt = bn(1, 0.86, 0.62),
  Mmt = Be(be.granite, 0.62, 0.6, 0.57);
