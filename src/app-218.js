// app 218 — math
// Lines 116340-116800 of readable/app.pretty.js (statement-aligned).
function HY(o, t) {
  let { colliders: e, inst: s } = o,
    n = Yi.z,
    i = Yi.x0,
    a = Yi.x1,
    r = Yi.hz,
    l = Axt(),
    c = Pxt(l),
    h = Lz(l),
    f = (w, _) => $t(w, _) + rR(w),
    u = (w, _) => w > i + 0.3 && w < a - 0.3 && Math.abs(_ - n) < Pr,
    d = (w, _) => {
      let z = c(w, _);
      return (
        f(w, _) +
        Cl +
        0.03 +
        0.28 * Math.min(1, Math.max(0, (z - yh / 2 - 1.2) / 3)) ** 1.5
      );
    },
    p = (w) => t.G("lombard", w),
    m = [0.92, 0.9, 0.9, Ho.pavers];
  (Da(
    p("ground"),
    i,
    n - Pr,
    a,
    n + Pr,
    0.3,
    (w, _) => yh / 2 + 0.1 - c(w, _),
    f,
    m,
  ),
    Da(
      p("ground"),
      i + 0.25,
      n - Pr,
      a - 0.25,
      n + Pr,
      0.35,
      (w, _) =>
        Math.min(
          c(w, _) - (yh / 2 + Hp - 0.04),
          Pr - Math.abs(_ - n),
          w - i - 0.3,
          a - 0.3 - w,
        ),
      d,
      (w, _) => [
        0.95 + 0.1 * js(Math.floor(w), Math.floor(_)),
        0.95,
        0.95,
        Ho.bed,
      ],
    ));
  let g = [0.62, 0.36, 0.3, yi.brick],
    b = [0.82, 0.95, 0.8, yi.hedge];
  for (let w of [-1, 1]) {
    let _ = null,
      z = 0;
    for (let A of h) {
      let T = (yh / 2) * w,
        E = (yh / 2 + Hp) * w,
        R = [A.x + A.nx * T, A.z + A.nz * T],
        P = [A.x + A.nx * E, A.z + A.nz * E],
        C = { f: A, p0: R, p1: P, ok: u(P[0], P[1]) || u(R[0], R[1]) };
      if (_ && _.ok && C.ok) {
        let I = f(_.p0[0], _.p0[1]),
          L = f(C.p0[0], C.p0[1]),
          F = f(_.p1[0], _.p1[1]),
          O = f(C.p1[0], C.p1[1]),
          B = [-A.nx * w, 0, -A.nz * w];
        ($s(
          p("wall"),
          [_.p0[0], I - 0.05, _.p0[1]],
          [C.p0[0], L - 0.05, C.p0[1]],
          [C.p0[0], L + Cl, C.p0[1]],
          [_.p0[0], I + Cl, _.p0[1]],
          [_.f.s, 0],
          [A.s, 0],
          [A.s, Cl],
          [_.f.s, Cl],
          g,
          B,
        ),
          $s(
            p("wall"),
            [_.p0[0], I + Cl, _.p0[1]],
            [C.p0[0], L + Cl, C.p0[1]],
            [C.p1[0], O + Cl + 0.02, C.p1[1]],
            [_.p1[0], F + Cl + 0.02, _.p1[1]],
            [_.f.s, Cl],
            [A.s, Cl],
            [A.s, Cl + Hp],
            [_.f.s, Cl + Hp],
            g,
            [0, 1, 0],
          ));
        let H = (yh / 2 + Hp - 0.03) * w,
          N = (yh / 2 + Hp - 0.03 + qw) * w,
          D = ($, J) => [$.x + $.nx * J, $.z + $.nz * J],
          U = D(_.f, H),
          G = D(_.f, N),
          W = D(A, H),
          V = D(A, N);
        if (
          Math.abs(G[1] - n) < Pr - 0.15 &&
          Math.abs(V[1] - n) < Pr - 0.15 &&
          u(G[0], G[1]) &&
          u(V[0], V[1])
        ) {
          let $ = d(...U) - 0.05,
            J = d(...W) - 0.05,
            X = [
              [0, 0],
              [0.06, GL * 0.8],
              [0.3, GL],
              [0.54, GL * 0.8],
              [0.6, 0],
            ],
            tt = (Z, q, j, [K, nt]) => [
              Z[0] + ((q[0] - Z[0]) * K) / qw,
              j + nt,
              Z[1] + ((q[1] - Z[1]) * K) / qw,
            ];
          for (let Z = 0; Z + 1 < X.length; Z++) {
            let q = X.slice(0, Z + 1).reduce(
                (et, st, ot) =>
                  et +
                  (ot
                    ? Math.hypot(st[0] - X[ot - 1][0], st[1] - X[ot - 1][1])
                    : 0),
                0,
              ),
              j = q + Math.hypot(X[Z + 1][0] - X[Z][0], X[Z + 1][1] - X[Z][1]),
              K = (X[Z][0] + X[Z + 1][0]) / 2 - qw / 2,
              nt = X[Z + 1][1] - X[Z][1],
              Q = [
                A.nx * w * Math.sign(K) * Math.abs(nt) + 0,
                Math.abs(X[Z + 1][0] - X[Z][0]) + 0.2,
                A.nz * w * Math.sign(K) * Math.abs(nt),
              ];
            $s(
              p("wall"),
              tt(U, G, $, X[Z]),
              tt(W, V, J, X[Z]),
              tt(W, V, J, X[Z + 1]),
              tt(U, G, $, X[Z + 1]),
              [_.f.s, q],
              [A.s, q],
              [A.s, j],
              [_.f.s, j],
              b,
              Q,
            );
          }
        }
      }
      if (
        C.ok &&
        ((z += _ ? Math.hypot(A.x - _.f.x, A.z - _.f.z) : 99), z >= 1.2)
      ) {
        z = 0;
        let I = (yh / 2 + 0.2) * w,
          L = A.x + A.nx * I,
          F = A.z + A.nz * I,
          O = Math.atan2(A.tx, A.tz);
        e.push({
          t: "obb",
          x: L,
          z: F,
          hx: 0.22,
          hz: 0.75,
          c: Math.cos(O),
          s: Math.sin(O),
        });
      }
      _ = C;
    }
  }
  for (let w of [i + 0.3, a - 0.3]) {
    let _ = w < (i + a) / 2 ? -1 : 1;
    for (let z = n - Pr; z < n + Pr - 0.01; z += 0.5) {
      let A = Math.min(z + 0.5, n + Pr);
      if (c(w, (z + A) / 2) < yh / 2 + Hp - 0.05) continue;
      let T = d(w - _ * 0.05, z),
        E = d(w - _ * 0.05, A),
        R = f(w, z) - 0.1;
      ($s(
        p("wall"),
        [w, R, z],
        [w, R, A],
        [w, E, A],
        [w, T, z],
        [z, R],
        [A, R],
        [A, E],
        [z, T],
        g,
        [_, 0, 0],
      ),
        e.push({
          t: "obb",
          x: w - _ * 0.1,
          z: (z + A) / 2,
          hx: 0.2,
          hz: 0.3,
          c: 1,
          s: 0,
        }));
    }
  }
  let v = [0.78, 0.76, 0.74, yi.granite];
  for (let w of [-1, 1]) {
    let _ = n + w * Pr;
    for (let z = i + 0.3; z < a - 0.3; z += 0.6) {
      let A = Math.min(z + 0.6, a - 0.3),
        T = d(z, _ - w * 0.02) + 0.08,
        E = d(A, _ - w * 0.02) + 0.08,
        R = $t(z, _) - 0.2,
        P = $t(A, _) - 0.2;
      ($s(
        p("wall"),
        [z, R, _],
        [A, P, _],
        [A, E, _],
        [z, T, _],
        [z, R],
        [A, P],
        [A, E],
        [z, T],
        g,
        [0, 0, w],
      ),
        $s(
          p("wall"),
          [z, T, _ - w * 0.25],
          [A, E, _ - w * 0.25],
          [A, E, _ + w * 0.02],
          [z, T, _ + w * 0.02],
          [z, _],
          [A, _],
          [A, _ + 0.27],
          [z, _ + 0.27],
          v,
          [0, 1, 0],
        ));
    }
  }
  let x = Fa(4242),
    y = p("foliage");
  for (let w = i + 1; w < a - 1; w += 0.95)
    for (let _ = n - Pr + 0.5; _ < n + Pr - 0.4; _ += 0.95) {
      let z = w + (x() - 0.5) * 0.7,
        A = _ + (x() - 0.5) * 0.7;
      if (
        c(z, A) < yh / 2 + Hp + qw + 0.35 ||
        !u(z, A) ||
        Math.abs(A - n) > Pr - 0.45 ||
        x() < 0.12
      )
        continue;
      let E = js(Math.floor(z / 4), Math.floor(A / 4), 5) < 0.5 != x() < 0.2,
        R = E ? 1 : 0,
        P = 0.85 + x() * 0.55,
        C = d(z, A) - 0.12,
        I = x() * Math.PI,
        L =
          x() < 0.15
            ? [1.15, 0.85, 1.05]
            : x() < 0.1
              ? [1.2, 1.2, 1.2]
              : [1, 1, 1];
      for (let F = 0; F < 3; F++)
        nr(y, [z, C, A], I + (F * Math.PI) / 3, P * 1.25, P, ir(R), [...L, 1]);
    }
  let M = p("foliage");
  for (let w = 0; w < 9; w++) {
    let _ = i + 8 + w * 9.6 + (x() - 0.5) * 2,
      z = w % 2 ? 1 : -1,
      A = n + z * (Pr - 1.3);
    if (c(_, A) < yh / 2 + 2.2 || !u(_, A)) continue;
    let T = d(_, A) - 0.1,
      E = 6.5 + x() * 3,
      R = 0.75 + x() * 0.25;
    mr(p("paint"), _, A, T, T + 1.2, 0.12, 0.09, 6, [0.25, 0.19, 0.13, 1]);
    for (let P = 0; P < 7; P++) {
      let C = T + 0.4 + ((E - 0.4) * P) / 7,
        I = R * 2 * Math.sin(Math.PI * (0.25 + 0.75 * (1 - P / 7))) + 0.3;
      for (let L = 0; L < 3; L++)
        nr(
          M,
          [_, C, A],
          P * 0.7 + (L * Math.PI) / 3,
          I,
          (E / 7) * 1.9,
          ir(3),
          [0.75, 0.85, 0.7, 1],
        );
    }
  }
  let S = [0.74, 0.72, 0.69, yi.granite];
  for (let w of [-1, 1]) {
    let _ = n + w * Pr,
      z = n + w * r,
      A = Math.min(_, z),
      T = Math.max(_, z),
      E = i;
    for (; E < a - 0.01;) {
      let I = Math.min(E + 0.42, a),
        L = Math.max($t(E, A), $t(E, T)) + Ze + 0.02,
        F = Math.min($t(I, A), $t(I, T)) - 0.05;
      (Ge(
        p("wall"),
        (E + I) / 2,
        (A + T) / 2,
        1,
        0,
        (I - E) / 2,
        (T - A) / 2,
        F,
        L,
        S,
        [0, 1, 1, 1, 1, 0],
      ),
        (E = I));
    }
    e.push({
      t: "box",
      x0: i,
      z0: A + (w > 0 ? -0.15 : 0),
      x1: a,
      z1: T + (w < 0 ? 0.15 : 0),
    });
    let R = _ + w * 0.12,
      P = [0.08, 0.08, 0.08, 0],
      C = null;
    for (let I = i + 0.5; I <= a - 0.4; I += 2.1) {
      let L = Math.max($t(I, A), $t(I, T)) + Ze + 0.02;
      (ci(p("metal"), [I, L, R], [I, L + 0.95, R], 0.05, 0.05, P),
        C &&
          ci(
            p("metal"),
            [C[0], C[1] + 0.95, R],
            [I, L + 0.95, R],
            0.05,
            0.05,
            P,
          ),
        (C = [I, L]));
    }
  }
  for (let [w, _] of [
    [i + 5, 1],
    [i + 40, -1],
    [i + 72, 1],
    [a - 4, -1],
  ]) {
    let z = n + _ * (r - 0.4);
    (s.push({
      kind: "lamp",
      x: w,
      y: $t(w, z) + Ze,
      z,
      rot: _ > 0 ? Math.PI : 0,
    }),
      e.push({ t: "circ", x: w, z, r: 0.18 }));
  }
  (NY(o, t, 3, 3, "s"), NY(o, t, 3, 4, "n"));
  for (let [w, _, z] of [
    [he[3] + ps[3].hw + 0.7, n + ns[4].hw + 2.2, Math.PI / 2],
    [he[3] - ps[3].hw - 0.7, n - ns[4].hw - 2.2, -Math.PI / 2],
  ]) {
    let A = $t(w, _) + Ze,
      T = p("paint");
    (mr(T, w, _, A, A + 2.9, 0.045, 0.045, 8, [0.3, 0.3, 0.3, 1]),
      Ge(
        T,
        w,
        _,
        Math.cos(z),
        Math.sin(z),
        0.02,
        0.28,
        A + 2.2,
        A + 2.85,
        [0.28, 0.14, 0.05, 1],
        [1, 1, 1, 1, 1, 1],
      ),
      Ge(
        T,
        w,
        _,
        Math.cos(z),
        Math.sin(z),
        0.025,
        0.24,
        A + 2.42,
        A + 2.56,
        [0.8, 0.78, 0.7, 1],
        [1, 1, 0, 0, 0, 0],
      ),
      Ge(
        T,
        w,
        _,
        Math.cos(z),
        Math.sin(z),
        0.03,
        0.29,
        A + 2.14,
        A + 2.2,
        [0.85, 0.72, 0.1, 1],
        [1, 1, 1, 1, 1, 1],
      ),
      e.push({ t: "circ", x: w, z: _, r: 0.1 }));
    let E = w,
      R = _ + (z > 0 ? 3 : -3);
    (Ge(
      T,
      E,
      R,
      0,
      1,
      0.9,
      0.22,
      A + 0.42,
      A + 0.48,
      [0.2, 0.13, 0.08, 1],
      [1, 1, 1, 1, 1, 1],
    ),
      Ge(
        T,
        E + (z > 0 ? 0.2 : -0.2),
        R,
        0,
        1,
        0.9,
        0.03,
        A + 0.5,
        A + 0.9,
        [0.2, 0.13, 0.08, 1],
        [1, 1, 1, 1, 1, 1],
      ));
    for (let P of [-0.75, 0.75])
      Ge(
        T,
        E,
        R + P,
        0,
        1,
        0.04,
        0.2,
        A,
        A + 0.42,
        [0.1, 0.1, 0.1, 1],
        [1, 1, 1, 1, 0, 0],
      );
    e.push({ t: "obb", x: E, z: R, hx: 0.25, hz: 0.95, c: 1, s: 0 });
  }
}
