// app 219 — math
// Lines 116084-116544 of readable/app.pretty.js (statement-aligned).
function NX(i, t) {
  let { colliders: e, inst: s } = i,
    n = Oi.z,
    o = Oi.x0,
    a = Oi.x1,
    r = Oi.hz,
    l = a2t(),
    c = r2t(l),
    h = Lk(l),
    f = (w, z) => Yt(w, z) + IT(w),
    u = (w, z) => w > o + 0.3 && w < a - 0.3 && Math.abs(z - n) < gr,
    d = (w, z) => {
      let _ = c(w, z);
      return (
        f(w, z) +
        hl +
        0.03 +
        0.28 * Math.min(1, Math.max(0, (_ - qc / 2 - 1.2) / 3)) ** 1.5
      );
    },
    p = (w) => t.G("lombard", w),
    m = [0.92, 0.9, 0.9, To.pavers];
  (Aa(
    p("ground"),
    o,
    n - gr,
    a,
    n + gr,
    0.3,
    (w, z) => qc / 2 + 0.1 - c(w, z),
    f,
    m,
  ),
    Aa(
      p("ground"),
      o + 0.25,
      n - gr,
      a - 0.25,
      n + gr,
      0.35,
      (w, z) =>
        Math.min(
          c(w, z) - (qc / 2 + rp - 0.04),
          gr - Math.abs(z - n),
          w - o - 0.3,
          a - 0.3 - w,
        ),
      d,
      (w, z) => [
        0.95 + 0.1 * Ws(Math.floor(w), Math.floor(z)),
        0.95,
        0.95,
        To.bed,
      ],
    ));
  let g = [0.62, 0.36, 0.3, hi.brick],
    b = [0.82, 0.95, 0.8, hi.hedge];
  for (let w of [-1, 1]) {
    let z = null,
      _ = 0;
    for (let R of h) {
      let T = (qc / 2) * w,
        E = (qc / 2 + rp) * w,
        A = [R.x + R.nx * T, R.z + R.nz * T],
        C = [R.x + R.nx * E, R.z + R.nz * E],
        P = { f: R, p0: A, p1: C, ok: u(C[0], C[1]) || u(A[0], A[1]) };
      if (z && z.ok && P.ok) {
        let I = f(z.p0[0], z.p0[1]),
          L = f(P.p0[0], P.p0[1]),
          F = f(z.p1[0], z.p1[1]),
          N = f(P.p1[0], P.p1[1]),
          B = [-R.nx * w, 0, -R.nz * w];
        (js(
          p("wall"),
          [z.p0[0], I - 0.05, z.p0[1]],
          [P.p0[0], L - 0.05, P.p0[1]],
          [P.p0[0], L + hl, P.p0[1]],
          [z.p0[0], I + hl, z.p0[1]],
          [z.f.s, 0],
          [R.s, 0],
          [R.s, hl],
          [z.f.s, hl],
          g,
          B,
        ),
          js(
            p("wall"),
            [z.p0[0], I + hl, z.p0[1]],
            [P.p0[0], L + hl, P.p0[1]],
            [P.p1[0], N + hl + 0.02, P.p1[1]],
            [z.p1[0], F + hl + 0.02, z.p1[1]],
            [z.f.s, hl],
            [R.s, hl],
            [R.s, hl + rp],
            [z.f.s, hl + rp],
            g,
            [0, 1, 0],
          ));
        let H = (qc / 2 + rp - 0.03) * w,
          O = (qc / 2 + rp - 0.03 + Yy) * w,
          D = (V, Y) => [V.x + V.nx * Y, V.z + V.nz * Y],
          U = D(z.f, H),
          G = D(z.f, O),
          q = D(R, H),
          W = D(R, O);
        if (
          Math.abs(G[1] - n) < gr - 0.15 &&
          Math.abs(W[1] - n) < gr - 0.15 &&
          u(G[0], G[1]) &&
          u(W[0], W[1])
        ) {
          let V = d(...U) - 0.05,
            Y = d(...q) - 0.05,
            $ = [
              [0, 0],
              [0.06, uC * 0.8],
              [0.3, uC],
              [0.54, uC * 0.8],
              [0.6, 0],
            ],
            st = (Q, j, X, [K, nt]) => [
              Q[0] + ((j[0] - Q[0]) * K) / Yy,
              X + nt,
              Q[1] + ((j[1] - Q[1]) * K) / Yy,
            ];
          for (let Q = 0; Q + 1 < $.length; Q++) {
            let j = $.slice(0, Q + 1).reduce(
                (et, tt, it) =>
                  et +
                  (it
                    ? Math.hypot(tt[0] - $[it - 1][0], tt[1] - $[it - 1][1])
                    : 0),
                0,
              ),
              X = j + Math.hypot($[Q + 1][0] - $[Q][0], $[Q + 1][1] - $[Q][1]),
              K = ($[Q][0] + $[Q + 1][0]) / 2 - Yy / 2,
              nt = $[Q + 1][1] - $[Q][1],
              Z = [
                R.nx * w * Math.sign(K) * Math.abs(nt) + 0,
                Math.abs($[Q + 1][0] - $[Q][0]) + 0.2,
                R.nz * w * Math.sign(K) * Math.abs(nt),
              ];
            js(
              p("wall"),
              st(U, G, V, $[Q]),
              st(q, W, Y, $[Q]),
              st(q, W, Y, $[Q + 1]),
              st(U, G, V, $[Q + 1]),
              [z.f.s, j],
              [R.s, j],
              [R.s, X],
              [z.f.s, X],
              b,
              Z,
            );
          }
        }
      }
      if (
        P.ok &&
        ((_ += z ? Math.hypot(R.x - z.f.x, R.z - z.f.z) : 99), _ >= 1.2)
      ) {
        _ = 0;
        let I = (qc / 2 + 0.2) * w,
          L = R.x + R.nx * I,
          F = R.z + R.nz * I,
          N = Math.atan2(R.tx, R.tz);
        e.push({
          t: "obb",
          x: L,
          z: F,
          hx: 0.22,
          hz: 0.75,
          c: Math.cos(N),
          s: Math.sin(N),
        });
      }
      z = P;
    }
  }
  for (let w of [o + 0.3, a - 0.3]) {
    let z = w < (o + a) / 2 ? -1 : 1;
    for (let _ = n - gr; _ < n + gr - 0.01; _ += 0.5) {
      let R = Math.min(_ + 0.5, n + gr);
      if (c(w, (_ + R) / 2) < qc / 2 + rp - 0.05) continue;
      let T = d(w - z * 0.05, _),
        E = d(w - z * 0.05, R),
        A = f(w, _) - 0.1;
      (js(
        p("wall"),
        [w, A, _],
        [w, A, R],
        [w, E, R],
        [w, T, _],
        [_, A],
        [R, A],
        [R, E],
        [_, T],
        g,
        [z, 0, 0],
      ),
        e.push({
          t: "obb",
          x: w - z * 0.1,
          z: (_ + R) / 2,
          hx: 0.2,
          hz: 0.3,
          c: 1,
          s: 0,
        }));
    }
  }
  let x = [0.78, 0.76, 0.74, hi.granite];
  for (let w of [-1, 1]) {
    let z = n + w * gr;
    for (let _ = o + 0.3; _ < a - 0.3; _ += 0.6) {
      let R = Math.min(_ + 0.6, a - 0.3),
        T = d(_, z - w * 0.02) + 0.08,
        E = d(R, z - w * 0.02) + 0.08,
        A = Yt(_, z) - 0.2,
        C = Yt(R, z) - 0.2;
      (js(
        p("wall"),
        [_, A, z],
        [R, C, z],
        [R, E, z],
        [_, T, z],
        [_, A],
        [R, C],
        [R, E],
        [_, T],
        g,
        [0, 0, w],
      ),
        js(
          p("wall"),
          [_, T, z - w * 0.25],
          [R, E, z - w * 0.25],
          [R, E, z + w * 0.02],
          [_, T, z + w * 0.02],
          [_, z],
          [R, z],
          [R, z + 0.27],
          [_, z + 0.27],
          x,
          [0, 1, 0],
        ));
    }
  }
  let v = ka(4242),
    y = p("foliage");
  for (let w = o + 1; w < a - 1; w += 0.95)
    for (let z = n - gr + 0.5; z < n + gr - 0.4; z += 0.95) {
      let _ = w + (v() - 0.5) * 0.7,
        R = z + (v() - 0.5) * 0.7;
      if (
        c(_, R) < qc / 2 + rp + Yy + 0.35 ||
        !u(_, R) ||
        Math.abs(R - n) > gr - 0.45 ||
        v() < 0.12
      )
        continue;
      let E = Ws(Math.floor(_ / 4), Math.floor(R / 4), 5) < 0.5 != v() < 0.2,
        A = E ? 1 : 0,
        C = 0.85 + v() * 0.55,
        P = d(_, R) - 0.12,
        I = v() * Math.PI,
        L =
          v() < 0.15
            ? [1.15, 0.85, 1.05]
            : v() < 0.1
              ? [1.2, 1.2, 1.2]
              : [1, 1, 1];
      for (let F = 0; F < 3; F++)
        Ga(y, [_, P, R], I + (F * Math.PI) / 3, C * 1.25, C, Wa(A), [...L, 1]);
    }
  let M = p("foliage");
  for (let w = 0; w < 9; w++) {
    let z = o + 8 + w * 9.6 + (v() - 0.5) * 2,
      _ = w % 2 ? 1 : -1,
      R = n + _ * (gr - 1.3);
    if (c(z, R) < qc / 2 + 2.2 || !u(z, R)) continue;
    let T = d(z, R) - 0.1,
      E = 6.5 + v() * 3,
      A = 0.75 + v() * 0.25;
    Qa(p("paint"), z, R, T, T + 1.2, 0.12, 0.09, 6, [0.25, 0.19, 0.13, 1]);
    for (let C = 0; C < 7; C++) {
      let P = T + 0.4 + ((E - 0.4) * C) / 7,
        I = A * 2 * Math.sin(Math.PI * (0.25 + 0.75 * (1 - C / 7))) + 0.3;
      for (let L = 0; L < 3; L++)
        Ga(
          M,
          [z, P, R],
          C * 0.7 + (L * Math.PI) / 3,
          I,
          (E / 7) * 1.9,
          Wa(3),
          [0.75, 0.85, 0.7, 1],
        );
    }
  }
  let S = [0.74, 0.72, 0.69, hi.granite];
  for (let w of [-1, 1]) {
    let z = n + w * gr,
      _ = n + w * r,
      R = Math.min(z, _),
      T = Math.max(z, _),
      E = o;
    for (; E < a - 0.01;) {
      let I = Math.min(E + 0.42, a),
        L = Math.max(Yt(E, R), Yt(E, T)) + Ke + 0.02,
        F = Math.min(Yt(I, R), Yt(I, T)) - 0.05;
      (Ne(
        p("wall"),
        (E + I) / 2,
        (R + T) / 2,
        1,
        0,
        (I - E) / 2,
        (T - R) / 2,
        F,
        L,
        S,
        [0, 1, 1, 1, 1, 0],
      ),
        (E = I));
    }
    e.push({
      t: "box",
      x0: o,
      z0: R + (w > 0 ? -0.15 : 0),
      x1: a,
      z1: T + (w < 0 ? 0.15 : 0),
    });
    let A = z + w * 0.12,
      C = [0.08, 0.08, 0.08, 0],
      P = null;
    for (let I = o + 0.5; I <= a - 0.4; I += 2.1) {
      let L = Math.max(Yt(I, R), Yt(I, T)) + Ke + 0.02;
      (ii(p("metal"), [I, L, A], [I, L + 0.95, A], 0.05, 0.05, C),
        P &&
          ii(
            p("metal"),
            [P[0], P[1] + 0.95, A],
            [I, L + 0.95, A],
            0.05,
            0.05,
            C,
          ),
        (P = [I, L]));
    }
  }
  for (let [w, z] of [
    [o + 5, 1],
    [o + 40, -1],
    [o + 72, 1],
    [a - 4, -1],
  ]) {
    let _ = n + z * (r - 0.4);
    (s.push({
      kind: "lamp",
      x: w,
      y: Yt(w, _) + Ke,
      z: _,
      rot: z > 0 ? Math.PI : 0,
    }),
      e.push({ t: "circ", x: w, z: _, r: 0.18 }));
  }
  (FX(i, t, 3, 3, "s"), FX(i, t, 3, 4, "n"));
  for (let [w, z, _] of [
    [ae[3] + ls[3].hw + 0.7, n + Qe[4].hw + 2.2, Math.PI / 2],
    [ae[3] - ls[3].hw - 0.7, n - Qe[4].hw - 2.2, -Math.PI / 2],
  ]) {
    let R = Yt(w, z) + Ke,
      T = p("paint");
    (Qa(T, w, z, R, R + 2.9, 0.045, 0.045, 8, [0.3, 0.3, 0.3, 1]),
      Ne(
        T,
        w,
        z,
        Math.cos(_),
        Math.sin(_),
        0.02,
        0.28,
        R + 2.2,
        R + 2.85,
        [0.28, 0.14, 0.05, 1],
        [1, 1, 1, 1, 1, 1],
      ),
      Ne(
        T,
        w,
        z,
        Math.cos(_),
        Math.sin(_),
        0.025,
        0.24,
        R + 2.42,
        R + 2.56,
        [0.8, 0.78, 0.7, 1],
        [1, 1, 0, 0, 0, 0],
      ),
      Ne(
        T,
        w,
        z,
        Math.cos(_),
        Math.sin(_),
        0.03,
        0.29,
        R + 2.14,
        R + 2.2,
        [0.85, 0.72, 0.1, 1],
        [1, 1, 1, 1, 1, 1],
      ),
      e.push({ t: "circ", x: w, z, r: 0.1 }));
    let E = w,
      A = z + (_ > 0 ? 3 : -3);
    (Ne(
      T,
      E,
      A,
      0,
      1,
      0.9,
      0.22,
      R + 0.42,
      R + 0.48,
      [0.2, 0.13, 0.08, 1],
      [1, 1, 1, 1, 1, 1],
    ),
      Ne(
        T,
        E + (_ > 0 ? 0.2 : -0.2),
        A,
        0,
        1,
        0.9,
        0.03,
        R + 0.5,
        R + 0.9,
        [0.2, 0.13, 0.08, 1],
        [1, 1, 1, 1, 1, 1],
      ));
    for (let C of [-0.75, 0.75])
      Ne(
        T,
        E,
        A + C,
        0,
        1,
        0.04,
        0.2,
        R,
        R + 0.42,
        [0.1, 0.1, 0.1, 1],
        [1, 1, 1, 1, 0, 0],
      );
    e.push({ t: "obb", x: E, z: A, hx: 0.25, hz: 0.95, c: 1, s: 0 });
  }
}
