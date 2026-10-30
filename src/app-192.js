// app 192 — math
// Lines 108484-108819 of readable/app.pretty.js (statement-aligned).
function zgt(o, t, e) {
  let { L: s } = t,
    n = Ko,
    i = n.court,
    a = n.stair,
    r = (R, P, C) => {
      let I = n.at(R, P);
      return [I[0], C, I[1]];
    },
    l = [n.e[0], 0, n.e[1]],
    c = [n.n[0], 0, n.n[1]],
    h = (R) => [-R[0], 0, -R[2]],
    f = 0,
    u = 0;
  for (let [R, P] of [
    [-20, -12],
    [-30, -19],
    [-14, -8],
  ]) {
    let C = n.at(R - 3, P - 3),
      I = s.probe(C[0], C[1]);
    I.walk && ((f += I.walk.y), u++);
  }
  f = u ? f / u : 11.2;
  let d = f - 4.6,
    p = (R, P) => {
      let C = n.at(R, P);
      return Math.max(f + 0.03, s.terrainAt(C[0], C[1]) + 0.12);
    },
    m = (R, P, C) => R > C.e0 && R < C.e1 && P > C.n0 && P < C.n1;
  for (let R = i.e0; R < i.e1; R += 1.5)
    for (let P = i.n0; P < i.n1; P += 1.5) {
      let C = Math.min(i.e1, R + 1.5),
        I = Math.min(i.n1, P + 1.5),
        L =
          Math.abs((R - i.e0) % 4.5) < 0.01 ||
          Math.abs((P - i.n0) % 4.5) < 0.01;
      oe(
        o,
        [r(R, P, d), r(C, P, d), r(C, I, d), r(R, I, d)],
        L ? Op : xK,
        [0, 1, 0],
        (F) => [F[0] * 3, F[2] * 3],
      );
    }
  for (let R = -63; R < -10.5; R += 1)
    for (let P = -22; P < 13; P += 1) {
      let C = R + 0.5,
        I = P + 0.5;
      if (m(C, I, i) || m(C, I, a)) continue;
      let L = [
          [R, P],
          [R + 1, P],
          [R + 1, P + 1],
          [R, P + 1],
        ],
        F = L.filter(([O, B]) => n.inside(O, B)).length;
      !F ||
        (F < 4 && !n.inside(C, I)) ||
        (oe(
          o,
          L.map(([O, B]) => r(O, B, p(O, B))),
          kgt,
          [0, 1, 0],
          (O) => [O[0] * 3, O[2] * 3],
        ),
        F === 4 &&
          (Math.round(R) % 6 === 0 &&
            oe(
              o,
              [
                r(R, P, p(R, P) + 0.006),
                r(R + 0.35, P, p(R, P) + 0.006),
                r(R + 0.35, P + 1, p(R, P + 1) + 0.006),
                r(R, P + 1, p(R, P + 1) + 0.006),
              ],
              Op,
              [0, 1, 0],
              (O) => [O[0], O[2]],
            ),
          Math.round(P) % 6 === 0 &&
            oe(
              o,
              [
                r(R, P, p(R, P) + 0.007),
                r(R + 1, P, p(R + 1, P) + 0.007),
                r(R + 1, P + 0.35, p(R + 1, P) + 0.007),
                r(R, P + 0.35, p(R, P) + 0.007),
              ],
              Op,
              [0, 1, 0],
              (O) => [O[0], O[2]],
            )));
    }
  let g = (R, P, C) =>
      Array.from({ length: C + 1 }, (I, L) => [
        R[0] + ((P[0] - R[0]) * L) / C,
        R[1] + ((P[1] - R[1]) * L) / C,
      ]),
    b = (R, P) => {
      for (let C = 0; C + 1 < R.length; C++) {
        let [I, L] = R[C],
          [F, O] = R[C + 1];
        oe(
          o,
          [
            r(I, L, d - 0.1),
            r(F, O, d - 0.1),
            r(F, O, p(F, O)),
            r(I, L, p(I, L)),
          ],
          aL,
          P,
          (B) => [B[0] + B[2], B[1]],
        );
      }
    };
  (b(g([i.e0, i.n0], [i.e1, i.n0], 12), c),
    b(g([i.e0, i.n1], [i.e1, i.n1], 12), h(c)),
    b(g([i.e0, i.n0], [i.e0, i.n1], 8), l),
    b(
      [
        [i.e1, i.n0],
        [i.e1, a.n0],
      ],
      h(l),
    ),
    b(
      [
        [i.e1, a.n1],
        [i.e1, i.n1],
      ],
      h(l),
    ));
  let v = p(a.e1, (a.n0 + a.n1) / 2),
    x = Math.max(8, Math.round((v - d) / 0.17));
  for (let R = 0; R < x; R++) {
    let P = a.e1 - ((a.e1 - a.e0) * R) / x,
      C = a.e1 - ((a.e1 - a.e0) * (R + 1)) / x,
      I = v + ((d - v) * (R + 1)) / x,
      L = v + ((d - v) * R) / x;
    (oe(
      o,
      [r(P, a.n0, I), r(C, a.n0, I), r(C, a.n1, I), r(P, a.n1, I)],
      Op,
      [0, 1, 0],
      (F) => [F[0], F[2]],
    ),
      oe(
        o,
        [r(P, a.n0, I), r(P, a.n1, I), r(P, a.n1, L), r(P, a.n0, L)],
        aL,
        h(l),
      ));
  }
  for (let [R, P] of [
    [a.n0, c],
    [a.n1, h(c)],
  ]) {
    let C = g([a.e1, R], [a.e0, R], 6);
    for (let I = 0; I + 1 < C.length; I++) {
      let [L] = C[I],
        [F] = C[I + 1],
        O = v + ((d - v) * (a.e1 - L)) / (a.e1 - a.e0),
        B = v + ((d - v) * (a.e1 - F)) / (a.e1 - a.e0);
      oe(
        o,
        [
          r(L, R, O - 0.05),
          r(F, R, B - 0.05),
          r(F, R, p(F, R)),
          r(L, R, p(L, R)),
        ],
        aL,
        P,
        (H) => [H[0] + H[2], H[1]],
      );
    }
  }
  let y = [
    [a.e1, a.n1],
    [i.e1, a.n1],
    [i.e1, i.n1],
    [i.e0, i.n1],
    [i.e0, i.n0],
    [i.e1, i.n0],
    [i.e1, a.n0],
    [a.e1, a.n0],
  ];
  for (let R = 0; R + 1 < y.length; R++) {
    let [P, C] = y[R],
      [I, L] = y[R + 1],
      F = Math.max(1, Math.round(Math.hypot(I - P, L - C) / 3));
    for (let O = 0; O < F; O++) {
      let B = [P + ((I - P) * O) / F, C + ((L - C) * O) / F],
        H = [P + ((I - P) * (O + 1)) / F, C + ((L - C) * (O + 1)) / F],
        N = r(B[0], B[1], p(B[0], B[1])),
        D = r(H[0], H[1], p(H[0], H[1]));
      (Ce(o, [N[0], N[1] + 0.25, N[2]], [D[0], D[1] + 0.25, D[2]], 0.22, Op, 4),
        xz(
          o,
          [
            [N[0], N[1] + 0.45, N[2]],
            [D[0], D[1] + 0.45, D[2]],
          ],
          0.75,
          _x,
          1.6,
        ));
    }
  }
  {
    let R = (i.e0 + i.e1) / 2,
      P = 6.5,
      C = i.n0 + 0.03,
      I = d + 3.2;
    oe(
      o,
      [r(R - P, C, d), r(R + P, C, d), r(R + P, C, I), r(R - P, C, I)],
      Lt(Ct.glass, 0.05, 0.06, 0.07),
      c,
    );
    for (let F = R - P; F <= R + P + 0.01; F += 1.625) {
      let O = n.at(F, C + 0.04);
      ba(o, O, n.e, n.n, 0.05, 0.05, d, I, _x);
    }
    (oe(
      o,
      [
        r(R - P + 1, C + 0.06, d + 0.3),
        r(R + P - 1, C + 0.06, d + 0.3),
        r(R + P - 1, C + 0.06, d + 2.4),
        r(R - P + 1, C + 0.06, d + 2.4),
      ],
      wn(0.55, 0.5, 0.42),
      c,
    ),
      ba(o, n.at(R, C + 1.3), n.e, n.n, P + 0.4, 1.3, I + 0.1, I + 0.35, _x, {
        bottom: !0,
      }));
    let L = n.at(R, C + 2.62);
    (ba(o, L, n.e, n.n, 1.6, 0.04, I + 0.4, I + 1.1, bK),
      lL(
        o,
        "BART",
        [L[0] + n.n[0] * 0.09, I + 0.52, L[1] + n.n[1] * 0.09],
        [n.e[0], n.e[1]],
        c,
        0.46,
        cL,
        0.07,
      ));
  }
  for (let [R, P] of [
    [-50, -8],
    [-50, 1.5],
    [-41, 1.5],
    [-34, -8],
    [-34, 1.5],
  ]) {
    let C = n.at(R, P);
    (ba(o, C, n.e, n.n, 0.9, 0.9, d, d + 0.5, Op),
      e.inst.push({
        kind: "tree",
        x: C[0],
        y: d + 0.5,
        z: C[1],
        rot: R * 1.7,
        scale: 1.05,
      }));
  }
  let M = Lt(Ct.matte, 0.75, 0.06, 0.05),
    S = Lt(Ct.matte, 0.85, 0.84, 0.8),
    w = Lt(Ct.metal, 0.12, 0.3, 0.18);
  for (let [R, P] of [
    [-45, -3],
    [-38, -3],
    [-42, -9],
    [-45, 3],
    [-37, 3.2],
  ]) {
    let [C, I] = n.at(R, P);
    Ce(o, [C, d, I], [C, d + 2.3, I], 0.03, _x, 4);
    for (let L = 0; L < 8; L++) {
      let F = (L / 8) * Math.PI * 2,
        O = ((L + 1) / 8) * Math.PI * 2,
        B = 1.25;
      oe(
        o,
        [
          [C, d + 2.55, I],
          [C + Math.cos(F) * B, d + 2.1, I + Math.sin(F) * B],
          [C + Math.cos(O) * B, d + 2.1, I + Math.sin(O) * B],
        ],
        L % 2 ? M : S,
        [0, 1, 0],
      );
    }
    (fc(o, C, d + 0.74, I, 0.45, 10, w),
      Ce(o, [C, d, I], [C, d + 0.74, I], 0.04, w, 4));
    for (let L = 0; L < 3; L++) {
      let F = L * 2.1 + R,
        O = C + Math.cos(F) * 0.85,
        B = I + Math.sin(F) * 0.85;
      (ba(
        o,
        [O, B],
        [Math.cos(F), Math.sin(F)],
        [-Math.sin(F), Math.cos(F)],
        0.22,
        0.22,
        d + 0.44,
        d + 0.48,
        w,
      ),
        Ce(o, [O, d, B], [O, d + 0.44, B], 0.02, w, 4));
    }
  }
  let _ = n.poly.map(([R, P]) => n.at(R, P)),
    z = 1e9,
    A = -1e9,
    T = 1e9,
    E = -1e9;
  for (let [R, P] of _)
    ((z = Math.min(z, R)),
      (A = Math.max(A, R)),
      (T = Math.min(T, P)),
      (E = Math.max(E, P)));
  t.colliders.push({
    t: "poly",
    pts: Float32Array.from(_.flat()),
    bb: [z, T, A, E],
    y0: d - 2,
    y1: f + 3,
  });
}
