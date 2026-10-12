// app 124 — math
// Lines 85573-86266 of readable/app.pretty.js (statement-aligned).
function k7(i, t) {
  let e = Ei(8, 20),
    s = Ca(8, 20),
    n = new Ce(),
    o = (e.x0 + e.x1) / 2,
    a = (e.z0 + e.z1) / 2,
    r = Yt(o, a) + Ke + 0.6,
    l = 7,
    c = { x0: e.x0 + l, x1: e.x1 - l, z0: e.z0 + l, z1: e.z1 - l },
    h = (v, y) => r + 0.4 * (Yt(v, y) + Ke - r),
    f = Be(be.granite),
    u = Be(be.polgranite, 0.85),
    d = Be(be.lawn, 0.75, 0.9, 0.7);
  cq(
    n,
    c.x0,
    c.z0,
    c.x1,
    c.z1,
    h,
    Be(be.granite, 1.02, 1, 0.97),
    Be(be.polgranite, 0.42, 0.42, 0.44),
    7.5,
    0.7,
    1.4,
  );
  let p = [
      { ax: e.x0, az: e.z0, bx: e.x1, bz: e.z0, nx: 0, nz: 1 },
      { ax: e.x1, az: e.z0, bx: e.x1, bz: e.z1, nx: -1, nz: 0 },
      { ax: e.x1, az: e.z1, bx: e.x0, bz: e.z1, nx: 0, nz: -1 },
      { ax: e.x0, az: e.z1, bx: e.x0, bz: e.z0, nx: 1, nz: 0 },
    ],
    m = Be(be.polgranite, 0.72);
  for (let v of p) {
    let y = Math.hypot(v.bx - v.ax, v.bz - v.az),
      M = (v.bx - v.ax) / y,
      S = (v.bz - v.az) / y,
      w = Math.round((y - 2 * l) / 9),
      z = !1,
      _ = (R) => {
        if (R < 0 || R >= w) return !1;
        let T = l + ((y - 2 * l) * (R + 0.5)) / w,
          E = v.ax + M * T,
          A = v.az + S * T,
          C = E + v.nx * l,
          P = A + v.nz * l;
        return R % 3 === 1 || h(C, P) - (Yt(E, A) + Ke) < -0.3;
      };
    for (let R = 0; R < w; R++) {
      let T = l + ((y - 2 * l) * R) / w,
        E = l + ((y - 2 * l) * (R + 1)) / w,
        A = (T + E) / 2,
        C = (U, G) => [v.ax + M * U + v.nx * G, v.az + S * U + v.nz * G],
        [P, I] = C(A, 0),
        [L, F] = C(A, l),
        N = Yt(P, I) + Ke,
        B = h(L, F),
        H = B - N;
      if (R % 3 === 1 || H < -0.3) {
        let U = Math.max(N, B) + 0.5,
          G = C(T, 0),
          q = C(E, 0),
          W = C(E, l),
          V = C(T, l);
        (ys(n, [G, q, W, V], Math.min(N, B) - 1.5, U, m, { cap: !1 }),
          xa(
            n,
            [G, q, W, V].map(($) => [$[0], $[1]]),
            U,
            d,
          ));
        for (let $ = 0; $ < 3; $++) {
          let st = ($ + 0.5) / 3,
            Q = G[0] + (q[0] - G[0]) * st + (v.nx * l) / 2,
            j = G[1] + (q[1] - G[1]) * st + (v.nz * l) / 2;
          Oe(
            n,
            Q,
            j,
            [
              [0.9, U],
              [1.1, U + 0.6],
              [0.7, U + 1.2],
              [0.05, U + 1.4],
            ],
            7,
            It(Lt.leaf, 0.05, 0.1, 0.035),
          );
        }
        let Y = [G, q, W, V];
        (i.colliders.push({
          t: "box",
          x0: Math.min(...Y.map(($) => $[0])),
          z0: Math.min(...Y.map(($) => $[1])),
          x1: Math.max(...Y.map(($) => $[0])),
          z1: Math.max(...Y.map(($) => $[1])),
        }),
          (z = !1));
        continue;
      }
      let O = Math.max(1, Math.ceil(Math.max(H, 0.01) / 0.165)),
        D = l / O;
      for (let U = 0; U < O; U++) {
        let G = N + (H * (U + 1)) / O,
          q = C(T + 0.3, U * D),
          W = C(E - 0.3, U * D),
          V = C(E - 0.3, (U + 1) * D),
          Y = C(T + 0.3, (U + 1) * D);
        ys(n, [q, W, V, Y], N - 0.8, G, f, { cap: !0 });
      }
      for (let U of [...(z || _(R - 1) ? [] : [T]), ...(_(R + 1) ? [] : [E])]) {
        let G = C(U - 0.3, 0),
          q = C(U + 0.3, 0),
          W = C(U + 0.3, l - 0.1),
          V = C(U - 0.3, l - 0.1);
        ys(n, [G, q, W, V], N - 0.5, Math.max(N, B) + 0.55, m, { cap: !0 });
      }
      z = !0;
    }
    {
      let R = Yt(v.ax, v.az) + Ke,
        [T, E] = [v.ax + (M + v.nx) * l, v.az + (S + v.nz) * l],
        A = h(T, E),
        C = A - R,
        P = Math.max(1, Math.min(14, Math.ceil(Math.abs(C) / 0.165))),
        I = l / P,
        L = (F, N) => [
          [v.ax + M * F + v.nx * F, v.az + S * F + v.nz * F],
          [v.ax + M * N + v.nx * F, v.az + S * N + v.nz * F],
          [v.ax + M * N + v.nx * N, v.az + S * N + v.nz * N],
          [v.ax + M * F + v.nx * N, v.az + S * F + v.nz * N],
        ];
      for (let F = 0; F < P; F++) {
        let N = C >= 0 ? L(F * I, l) : L(0, (P - F) * I),
          B = F === P - 1,
          H =
            C >= 0
              ? [
                  [N[0], N[1]],
                  [N[3], N[0]],
                ]
              : [
                  [N[1], N[2]],
                  [N[2], N[3]],
                ],
          O = B
            ? null
            : (D, U) =>
                H.some(
                  ([G, q]) => (D === G && U === q) || (D === q && U === G),
                );
        ys(
          n,
          N,
          Math.min(R, A) - 1.2,
          C >= 0 ? R + (C * (F + 1)) / P : A - (C * (F + 1)) / P,
          f,
          { cap: !0, keep: O },
        );
      }
      for (let [F, N] of [
        [l + 1.2, l + 3.4],
        [l + 3.4, l + 1.2],
      ]) {
        let B = v.ax + M * F + v.nx * N,
          H = v.az + S * F + v.nz * N,
          O = h(B, H);
        (Oe(
          n,
          B,
          H,
          [
            [0.75, O - 0.1],
            [0.8, O + 0.6],
            [0.7, O + 0.62],
            [0.7, O + 0.5],
            [0.01, O + 0.5],
          ],
          14,
          m,
        ),
          i.inst.push({
            kind: "flowers",
            x: B,
            y: O + 0.5,
            z: H,
            rot: Ws(B, H, 5) * 6.28,
            scale: 0.9,
          }));
      }
    }
  }
  for (let v of [c.z0 + 3, c.z1 - 3])
    for (let y = 0; y < 5; y++) {
      let M = c.x0 + 6 + (y * (c.x1 - c.x0 - 12)) / 4,
        S = h(M, v);
      Math.abs(M - o) < 8 ||
        (Oe(
          n,
          M,
          v,
          [
            [1.3, S - 0.2],
            [1.3, S + 0.45],
            [1.1, S + 0.45],
            [1.1, S + 0.3],
            [0.01, S + 0.3],
          ],
          16,
          m,
        ),
        i.inst.push({
          kind: "palm",
          x: M,
          y: S + 0.3,
          z: v,
          rot: Ws(M, v, 2) * 6.28,
          scale: 1.05 + 0.2 * Ws(v, M),
        }),
        i.colliders.push({ t: "circ", x: M, z: v, r: 1.3 }));
    }
  for (let v of [c.x0 + 3, c.x1 - 3])
    for (let y of [-16, 16]) {
      let M = a + y,
        S = h(v, M);
      (Oe(
        n,
        v,
        M,
        [
          [1.3, S - 0.2],
          [1.3, S + 0.45],
          [1.1, S + 0.45],
          [1.1, S + 0.3],
          [0.01, S + 0.3],
        ],
        16,
        m,
      ),
        i.inst.push({
          kind: "palm",
          x: v,
          y: S + 0.3,
          z: M,
          rot: Ws(v, M, 3) * 6.28,
          scale: 1 + 0.2 * Ws(M, v),
        }),
        i.colliders.push({ t: "circ", x: v, z: M, r: 1.3 }));
    }
  let g = Be(be.lawn, 0.42, 0.36, 0.26),
    b = (v, y, M, S) => {
      let w = h((v + M) / 2, (y + S) / 2),
        z = w + 0.55;
      (ys(
        n,
        [
          [v, y],
          [M, y],
          [M, S],
          [v, S],
        ],
        w - 0.3,
        z,
        m,
        { cap: !1 },
      ),
        ys(
          n,
          [
            [v + 0.3, y + 0.3],
            [M - 0.3, y + 0.3],
            [M - 0.3, S - 0.3],
            [v + 0.3, S - 0.3],
          ],
          z - 0.08,
          z,
          m,
        ));
      for (let [E, A, C, P] of [
        [v, y, M, y + 0.3],
        [v, S - 0.3, M, S],
        [v, y + 0.3, v + 0.3, S - 0.3],
        [M - 0.3, y + 0.3, M, S - 0.3],
      ])
        xa(
          n,
          [
            [E, A],
            [C, A],
            [C, P],
            [E, P],
          ],
          z,
          m,
        );
      xa(
        n,
        [
          [v + 0.3, y + 0.3],
          [M - 0.3, y + 0.3],
          [M - 0.3, S - 0.3],
          [v + 0.3, S - 0.3],
        ],
        z - 0.08,
        g,
      );
      let _ = M - v >= S - y,
        R = _ ? M - v : S - y,
        T = Math.max(2, Math.round(R / 1.6));
      for (let E = 0; E < T; E++) {
        let A = (E + 0.5) / T,
          C = _ ? v + (M - v) * A : (v + M) / 2,
          P = _ ? (y + S) / 2 : y + (S - y) * A,
          I = E % 3 === 1;
        if (
          (i.inst.push({
            kind: I ? "flowers" : "shrub",
            x: C,
            y: z - 0.08,
            z: P,
            rot: Ws(C, P, 7) * 6.28,
            scale: I ? 1 : 0.75 + 0.2 * Ws(P, C, 8),
          }),
          !I)
        )
          for (let L of [-0.55, 0.55])
            i.inst.push({
              kind: "flowers",
              x: _ ? C + 0.5 : C + L,
              y: z - 0.08,
              z: _ ? P + L : P + 0.5,
              rot: Ws(C, P, 9 + L) * 6.28,
              scale: 0.6,
            });
      }
      i.colliders.push({ t: "box", x0: v, z0: y, x1: M, z1: S });
    };
  for (let v of [c.z0 + 5.2, c.z1 - 8.2])
    (b(c.x0 + 9, v, o - 9, v + 3), b(o + 9, v, c.x1 - 9, v + 3));
  for (let v of [c.x0 + 5.2, c.x1 - 8.2]) b(v, a - 9, v + 3, a + 9);
  {
    let v =
        Math.max(
          ...[
            [-5.2, -5.2],
            [5.2, -5.2],
            [5.2, 5.2],
            [-5.2, 5.2],
          ].map(([I, L]) => h(o + I, a + L)),
        ) +
        lq() -
        0.12,
      y = Be(be.polgranite, 0.9),
      M = nl(be.polgranite, 0.84, 0.82, 32);
    for (let I = 0; I < 3; I++) {
      let L = 5.2 - I * 0.55;
      Ze(
        n,
        o - L,
        I ? v + 0.35 * I : v - 0.4,
        a - L,
        o + L,
        v + 0.35 * (I + 1),
        a + L,
        y,
      );
    }
    let S = v + 1.05;
    (Ze(n, o - 3.2, S, a - 3.2, o + 3.2, S + 0.6, a + 3.2, M),
      Ze(n, o - 2.6, S + 0.6, a - 2.6, o + 2.6, S + 3.6, a + 2.6, M));
    for (let [I, L] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      let F = o + I * 2.69,
        N = a + L * 2.69,
        B = -L,
        H = I;
      ne(
        n,
        [
          [F - B * 0.9, S + 1.3, N - H * 0.9],
          [F + B * 0.9, S + 1.3, N + H * 0.9],
          [F + B * 0.9, S + 2.7, N + H * 0.9],
          [F - B * 0.9, S + 2.7, N - H * 0.9],
        ],
        Be(be.bronze, 0.7),
        [I, 0, L],
      );
    }
    (Ze(n, o - 2.95, S + 3.6, a - 2.95, o + 2.95, S + 4.1, a + 2.95, M),
      Ze(n, o - 2.2, S + 4.1, a - 2.2, o + 2.2, S + 5.2, a + 2.2, M));
    let w = S + 5.2,
      z = 16.5,
      _ = 0.95,
      R = 0.8;
    Oe(
      n,
      o,
      a,
      [
        [1.3, w],
        [1.3, w + 0.25],
        [1.15, w + 0.35],
        [1.2, w + 0.5],
        [1.02, w + 0.62],
        [_, w + 0.7],
      ],
      32,
      M,
    );
    let T = [];
    for (let I = 0; I <= 8; I++) {
      let L = I / 8;
      T.push([_ + (R - _) * (L * L * 0.7 + 0.3 * L), w + 0.7 + (z - 0.7) * L]);
    }
    Oe(n, o, a, T, 144, M, {
      rf: (I, L) => I * (1 - 0.05 * Math.pow(Math.abs(Math.cos(L * 12)), 0.5)),
    });
    let E = w + z;
    (Oe(
      n,
      o,
      a,
      [
        [R + 0.05, E],
        [R + 0.05, E + 0.15],
        [0.95, E + 0.5],
        [1.15, E + 1.1],
        [1.4, E + 1.5],
      ],
      24,
      M,
      {
        rf: (I, L, F, N) =>
          N > E + 0.3 ? I * (0.92 + 0.12 * Math.abs(Math.sin(L * 8))) : I,
      },
    ),
      Ze(n, o - 1.45, E + 1.5, a - 1.45, o + 1.45, E + 1.85, a + 1.45, M));
    let A = Be(be.bronze, 0.42, 0.37, 0.3),
      C = E + 1.85;
    (Oe(
      n,
      o,
      a,
      [
        [0.9, C],
        [0.9, C + 0.5],
        [0.6, C + 0.6],
      ],
      16,
      M,
    ),
      Oe(
        n,
        o,
        a,
        [
          [0.01, C + 0.55],
          [0.5, C + 0.75],
          [0.62, C + 1.1],
          [0.5, C + 1.45],
          [0.01, C + 1.6],
        ],
        14,
        A,
      ));
    let P = C + 1.55;
    (Oe(
      n,
      o,
      a,
      [
        [0.55, P],
        [0.5, P + 0.8],
        [0.36, P + 1.6],
        [0.3, P + 2.1],
        [0.36, P + 2.4],
        [0.2, P + 2.62],
        [0.12, P + 2.7],
      ],
      12,
      A,
      { rf: (I, L) => I * (1 + 0.18 * Math.sin(L * 3 + 1)) },
    ),
      Oe(
        n,
        o,
        a,
        [
          [0.12, P + 2.66],
          [0.16, P + 2.8],
          [0.15, P + 3],
          [0.02, P + 3.1],
        ],
        10,
        A,
      ));
    for (let I of [-1, 1]) {
      let L = [o + 0.12 * I, P + 2.3, a - 0.15],
        F = [o + 1.35 * I, P + 3.6, a - 0.55],
        N = [o + 0.9 * I, P + 1.5, a - 0.4];
      (ne(n, [L, F, N], A, [0, 0, -1]), ne(n, [L, F, N], A, [0, 0, 1]));
    }
    (Ae(
      n,
      [o - 0.3, P + 2.35, a + 0.1],
      [o - 0.55, P + 3.3, a + 0.2],
      0.08,
      A,
      5,
      !0,
    ),
      Oe(
        n,
        o - 0.58,
        a + 0.2,
        [
          [0.3, P + 3.3],
          [0.34, P + 3.36],
          [0.3, P + 3.42],
          [0.22, P + 3.36],
          [0.3, P + 3.3],
        ],
        10,
        A,
      ),
      Ae(
        n,
        [o + 0.35, P + 2.3, a + 0.05],
        [o + 0.55, P + 1.6, a + 0.1],
        0.08,
        A,
        5,
        !0,
      ),
      Ae(
        n,
        [o + 0.6, P - 0.2, a + 0.1],
        [o + 0.6, P + 3.9, a + 0.1],
        0.035,
        A,
        4,
        !0,
      ));
    for (let I of [-0.16, 0, 0.16])
      Ae(
        n,
        [o + 0.6 + I, P + 3.75, a + 0.1],
        [o + 0.6 + I, P + 4.2, a + 0.1],
        0.025,
        A,
        4,
        !0,
      );
    (Ae(
      n,
      [o + 0.44, P + 3.75, a + 0.1],
      [o + 0.76, P + 3.75, a + 0.1],
      0.03,
      A,
      4,
      !0,
    ),
      i.colliders.push({
        t: "box",
        x0: o - 5.2,
        z0: a - 5.2,
        x1: o + 5.2,
        z1: a + 5.2,
      }));
  }
  let x = It(Lt.metal, 0.16, 0.12, 0.08);
  for (let [v, y, M] of [
    [c.x0 + 16, c.z1 - 13, 1],
    [c.x1 - 16, c.z0 + 13, -1],
  ]) {
    let S = h(v, y),
      w = 4.2,
      z = 2.8,
      _ = 3.4;
    (Ze(
      n,
      v - w - 0.15,
      S - 0.3,
      y - z - 0.15,
      v + w + 0.15,
      S + 0.12,
      y + z + 0.15,
      m,
    ),
      ys(
        n,
        [
          [v - w, y - z],
          [v + w, y - z],
          [v + w, y + z],
          [v - w, y + z],
        ],
        S + 0.12,
        S + _,
        yn(sn.OFFICE, be.polgranite, 0.3),
      ));
    for (let R = 0; R <= 6; R++)
      for (let T of [y - z - 0.03, y + z + 0.03]) {
        let E = v - w + (2 * w * R) / 6;
        Ae(n, [E, S + 0.12, T], [E, S + _, T], 0.05, x, 4);
      }
    for (let R = 0; R <= 4; R++)
      for (let T of [v - w - 0.03, v + w + 0.03]) {
        let E = y - z + (2 * z * R) / 4;
        Ae(n, [T, S + 0.12, E], [T, S + _, E], 0.05, x, 4);
      }
    (Ze(
      n,
      v - w - 0.9,
      S + _,
      y - z - 0.9,
      v + w + 0.9,
      S + _ + 0.28,
      y + z + 0.9,
      It(Lt.matte, 0.16, 0.16, 0.17),
    ),
      Ze(
        n,
        v - w + 0.4,
        S + _ - 0.5,
        y - z - 0.06,
        v + w - 0.4,
        S + _ - 0.12,
        y - z - 0.02,
        bn(1, 0.82, 0.55),
      ),
      Ze(
        n,
        v - w + 0.4,
        S + _ - 0.5,
        y + z + 0.02,
        v + w - 0.4,
        S + _ - 0.12,
        y + z + 0.06,
        bn(1, 0.82, 0.55),
      ),
      i.colliders.push({
        t: "box",
        x0: v - w,
        z0: y - z,
        x1: v + w,
        z1: y + z,
      }));
    for (let R = 0; R < 3; R++)
      for (let T = 0; T < 3; T++) {
        let E = v + M * (w + 3.2 + R * 3.1),
          A = y + (T - 1) * 3.2 + 0.4 * (Ws(R, T, v) - 0.5),
          C = h(E, A);
        i.inst.push({
          kind: (R + T) % 2 ? "cafe1" : "cafe0",
          x: E,
          y: C,
          z: A,
          rot: Ws(E, A, 4) * 6.28,
        });
      }
  }
  for (let v = 0; v < 8; v++) {
    let y = (v / 8) * Math.PI * 2 + Math.PI / 8,
      M = 9.5,
      S = o + Math.cos(y) * M,
      w = a + Math.sin(y) * M;
    i.inst.push({
      kind: "bench",
      x: S,
      y: h(S, w),
      z: w,
      rot: Math.atan2(-Math.cos(y), -Math.sin(y)),
    });
  }
  for (let [v, y] of [
    [c.z0 + 9.2, 1],
    [c.z1 - 9.2, -1],
  ])
    for (let M of [c.x0 + 14, o - 15, o + 15, c.x1 - 14])
      Math.abs(M - (y > 0 ? c.x1 - 16 : c.x0 + 16)) < 12 ||
        i.inst.push({
          kind: "bench",
          x: M,
          y: h(M, v),
          z: v,
          rot: y > 0 ? 0 : Math.PI,
        });
  (Gh(i, s), gn(i.group, n, t.lm, "UnionSquare"));
}
