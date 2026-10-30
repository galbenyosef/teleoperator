// app 123 — math
// Lines 85841-86534 of readable/app.pretty.js (statement-aligned).
function eC(o, t) {
  let e = Hi(8, 20),
    s = Wa(8, 20),
    n = new Be(),
    i = (e.x0 + e.x1) / 2,
    a = (e.z0 + e.z1) / 2,
    r = $t(i, a) + Ze + 0.6,
    l = 7,
    c = { x0: e.x0 + l, x1: e.x1 - l, z0: e.z0 + l, z1: e.z1 - l },
    h = (x, y) => r + 0.4 * ($t(x, y) + Ze - r),
    f = We(we.granite),
    u = We(we.polgranite, 0.85),
    d = We(we.lawn, 0.75, 0.9, 0.7);
  fj(
    n,
    c.x0,
    c.z0,
    c.x1,
    c.z1,
    h,
    We(we.granite, 1.02, 1, 0.97),
    We(we.polgranite, 0.42, 0.42, 0.44),
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
    m = We(we.polgranite, 0.72);
  for (let x of p) {
    let y = Math.hypot(x.bx - x.ax, x.bz - x.az),
      M = (x.bx - x.ax) / y,
      S = (x.bz - x.az) / y,
      w = Math.round((y - 2 * l) / 9),
      _ = !1,
      z = (A) => {
        if (A < 0 || A >= w) return !1;
        let T = l + ((y - 2 * l) * (A + 0.5)) / w,
          E = x.ax + M * T,
          R = x.az + S * T,
          P = E + x.nx * l,
          C = R + x.nz * l;
        return A % 3 === 1 || h(P, C) - ($t(E, R) + Ze) < -0.3;
      };
    for (let A = 0; A < w; A++) {
      let T = l + ((y - 2 * l) * A) / w,
        E = l + ((y - 2 * l) * (A + 1)) / w,
        R = (T + E) / 2,
        P = (U, G) => [x.ax + M * U + x.nx * G, x.az + S * U + x.nz * G],
        [C, I] = P(R, 0),
        [L, F] = P(R, l),
        O = $t(C, I) + Ze,
        B = h(L, F),
        H = B - O;
      if (A % 3 === 1 || H < -0.3) {
        let U = Math.max(O, B) + 0.5,
          G = P(T, 0),
          W = P(E, 0),
          V = P(E, l),
          $ = P(T, l);
        (Ss(n, [G, W, V, $], Math.min(O, B) - 1.5, U, m, { cap: !1 }),
          Ta(
            n,
            [G, W, V, $].map((X) => [X[0], X[1]]),
            U,
            d,
          ));
        for (let X = 0; X < 3; X++) {
          let tt = (X + 0.5) / 3,
            Z = G[0] + (W[0] - G[0]) * tt + (x.nx * l) / 2,
            q = G[1] + (W[1] - G[1]) * tt + (x.nz * l) / 2;
          qe(
            n,
            Z,
            q,
            [
              [0.9, U],
              [1.1, U + 0.6],
              [0.7, U + 1.2],
              [0.05, U + 1.4],
            ],
            7,
            Lt(Ct.leaf, 0.05, 0.1, 0.035),
          );
        }
        let J = [G, W, V, $];
        (o.colliders.push({
          t: "box",
          x0: Math.min(...J.map((X) => X[0])),
          z0: Math.min(...J.map((X) => X[1])),
          x1: Math.max(...J.map((X) => X[0])),
          z1: Math.max(...J.map((X) => X[1])),
        }),
          (_ = !1));
        continue;
      }
      let N = Math.max(1, Math.ceil(Math.max(H, 0.01) / 0.165)),
        D = l / N;
      for (let U = 0; U < N; U++) {
        let G = O + (H * (U + 1)) / N,
          W = P(T + 0.3, U * D),
          V = P(E - 0.3, U * D),
          $ = P(E - 0.3, (U + 1) * D),
          J = P(T + 0.3, (U + 1) * D);
        Ss(n, [W, V, $, J], O - 0.8, G, f, { cap: !0 });
      }
      for (let U of [...(_ || z(A - 1) ? [] : [T]), ...(z(A + 1) ? [] : [E])]) {
        let G = P(U - 0.3, 0),
          W = P(U + 0.3, 0),
          V = P(U + 0.3, l - 0.1),
          $ = P(U - 0.3, l - 0.1);
        Ss(n, [G, W, V, $], O - 0.5, Math.max(O, B) + 0.55, m, { cap: !0 });
      }
      _ = !0;
    }
    {
      let A = $t(x.ax, x.az) + Ze,
        [T, E] = [x.ax + (M + x.nx) * l, x.az + (S + x.nz) * l],
        R = h(T, E),
        P = R - A,
        C = Math.max(1, Math.min(14, Math.ceil(Math.abs(P) / 0.165))),
        I = l / C,
        L = (F, O) => [
          [x.ax + M * F + x.nx * F, x.az + S * F + x.nz * F],
          [x.ax + M * O + x.nx * F, x.az + S * O + x.nz * F],
          [x.ax + M * O + x.nx * O, x.az + S * O + x.nz * O],
          [x.ax + M * F + x.nx * O, x.az + S * F + x.nz * O],
        ];
      for (let F = 0; F < C; F++) {
        let O = P >= 0 ? L(F * I, l) : L(0, (C - F) * I),
          B = F === C - 1,
          H =
            P >= 0
              ? [
                  [O[0], O[1]],
                  [O[3], O[0]],
                ]
              : [
                  [O[1], O[2]],
                  [O[2], O[3]],
                ],
          N = B
            ? null
            : (D, U) =>
                H.some(
                  ([G, W]) => (D === G && U === W) || (D === W && U === G),
                );
        Ss(
          n,
          O,
          Math.min(A, R) - 1.2,
          P >= 0 ? A + (P * (F + 1)) / C : R - (P * (F + 1)) / C,
          f,
          { cap: !0, keep: N },
        );
      }
      for (let [F, O] of [
        [l + 1.2, l + 3.4],
        [l + 3.4, l + 1.2],
      ]) {
        let B = x.ax + M * F + x.nx * O,
          H = x.az + S * F + x.nz * O,
          N = h(B, H);
        (qe(
          n,
          B,
          H,
          [
            [0.75, N - 0.1],
            [0.8, N + 0.6],
            [0.7, N + 0.62],
            [0.7, N + 0.5],
            [0.01, N + 0.5],
          ],
          14,
          m,
        ),
          o.inst.push({
            kind: "flowers",
            x: B,
            y: N + 0.5,
            z: H,
            rot: js(B, H, 5) * 6.28,
            scale: 0.9,
          }));
      }
    }
  }
  for (let x of [c.z0 + 3, c.z1 - 3])
    for (let y = 0; y < 5; y++) {
      let M = c.x0 + 6 + (y * (c.x1 - c.x0 - 12)) / 4,
        S = h(M, x);
      Math.abs(M - i) < 8 ||
        (qe(
          n,
          M,
          x,
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
        o.inst.push({
          kind: "palm",
          x: M,
          y: S + 0.3,
          z: x,
          rot: js(M, x, 2) * 6.28,
          scale: 1.05 + 0.2 * js(x, M),
        }),
        o.colliders.push({ t: "circ", x: M, z: x, r: 1.3 }));
    }
  for (let x of [c.x0 + 3, c.x1 - 3])
    for (let y of [-16, 16]) {
      let M = a + y,
        S = h(x, M);
      (qe(
        n,
        x,
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
        o.inst.push({
          kind: "palm",
          x,
          y: S + 0.3,
          z: M,
          rot: js(x, M, 3) * 6.28,
          scale: 1 + 0.2 * js(M, x),
        }),
        o.colliders.push({ t: "circ", x, z: M, r: 1.3 }));
    }
  let g = We(we.lawn, 0.42, 0.36, 0.26),
    b = (x, y, M, S) => {
      let w = h((x + M) / 2, (y + S) / 2),
        _ = w + 0.55;
      (Ss(
        n,
        [
          [x, y],
          [M, y],
          [M, S],
          [x, S],
        ],
        w - 0.3,
        _,
        m,
        { cap: !1 },
      ),
        Ss(
          n,
          [
            [x + 0.3, y + 0.3],
            [M - 0.3, y + 0.3],
            [M - 0.3, S - 0.3],
            [x + 0.3, S - 0.3],
          ],
          _ - 0.08,
          _,
          m,
        ));
      for (let [E, R, P, C] of [
        [x, y, M, y + 0.3],
        [x, S - 0.3, M, S],
        [x, y + 0.3, x + 0.3, S - 0.3],
        [M - 0.3, y + 0.3, M, S - 0.3],
      ])
        Ta(
          n,
          [
            [E, R],
            [P, R],
            [P, C],
            [E, C],
          ],
          _,
          m,
        );
      Ta(
        n,
        [
          [x + 0.3, y + 0.3],
          [M - 0.3, y + 0.3],
          [M - 0.3, S - 0.3],
          [x + 0.3, S - 0.3],
        ],
        _ - 0.08,
        g,
      );
      let z = M - x >= S - y,
        A = z ? M - x : S - y,
        T = Math.max(2, Math.round(A / 1.6));
      for (let E = 0; E < T; E++) {
        let R = (E + 0.5) / T,
          P = z ? x + (M - x) * R : (x + M) / 2,
          C = z ? (y + S) / 2 : y + (S - y) * R,
          I = E % 3 === 1;
        if (
          (o.inst.push({
            kind: I ? "flowers" : "shrub",
            x: P,
            y: _ - 0.08,
            z: C,
            rot: js(P, C, 7) * 6.28,
            scale: I ? 1 : 0.75 + 0.2 * js(C, P, 8),
          }),
          !I)
        )
          for (let L of [-0.55, 0.55])
            o.inst.push({
              kind: "flowers",
              x: z ? P + 0.5 : P + L,
              y: _ - 0.08,
              z: z ? C + L : C + 0.5,
              rot: js(P, C, 9 + L) * 6.28,
              scale: 0.6,
            });
      }
      o.colliders.push({ t: "box", x0: x, z0: y, x1: M, z1: S });
    };
  for (let x of [c.z0 + 5.2, c.z1 - 8.2])
    (b(c.x0 + 9, x, i - 9, x + 3), b(i + 9, x, c.x1 - 9, x + 3));
  for (let x of [c.x0 + 5.2, c.x1 - 8.2]) b(x, a - 9, x + 3, a + 9);
  {
    let x =
        Math.max(
          ...[
            [-5.2, -5.2],
            [5.2, -5.2],
            [5.2, 5.2],
            [-5.2, 5.2],
          ].map(([I, L]) => h(i + I, a + L)),
        ) +
        hj() -
        0.12,
      y = We(we.polgranite, 0.9),
      M = zl(we.polgranite, 0.84, 0.82, 32);
    for (let I = 0; I < 3; I++) {
      let L = 5.2 - I * 0.55;
      ss(
        n,
        i - L,
        I ? x + 0.35 * I : x - 0.4,
        a - L,
        i + L,
        x + 0.35 * (I + 1),
        a + L,
        y,
      );
    }
    let S = x + 1.05;
    (ss(n, i - 3.2, S, a - 3.2, i + 3.2, S + 0.6, a + 3.2, M),
      ss(n, i - 2.6, S + 0.6, a - 2.6, i + 2.6, S + 3.6, a + 2.6, M));
    for (let [I, L] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      let F = i + I * 2.69,
        O = a + L * 2.69,
        B = -L,
        H = I;
      oe(
        n,
        [
          [F - B * 0.9, S + 1.3, O - H * 0.9],
          [F + B * 0.9, S + 1.3, O + H * 0.9],
          [F + B * 0.9, S + 2.7, O + H * 0.9],
          [F - B * 0.9, S + 2.7, O - H * 0.9],
        ],
        We(we.bronze, 0.7),
        [I, 0, L],
      );
    }
    (ss(n, i - 2.95, S + 3.6, a - 2.95, i + 2.95, S + 4.1, a + 2.95, M),
      ss(n, i - 2.2, S + 4.1, a - 2.2, i + 2.2, S + 5.2, a + 2.2, M));
    let w = S + 5.2,
      _ = 16.5,
      z = 0.95,
      A = 0.8;
    qe(
      n,
      i,
      a,
      [
        [1.3, w],
        [1.3, w + 0.25],
        [1.15, w + 0.35],
        [1.2, w + 0.5],
        [1.02, w + 0.62],
        [z, w + 0.7],
      ],
      32,
      M,
    );
    let T = [];
    for (let I = 0; I <= 8; I++) {
      let L = I / 8;
      T.push([z + (A - z) * (L * L * 0.7 + 0.3 * L), w + 0.7 + (_ - 0.7) * L]);
    }
    qe(n, i, a, T, 144, M, {
      rf: (I, L) => I * (1 - 0.05 * Math.pow(Math.abs(Math.cos(L * 12)), 0.5)),
    });
    let E = w + _;
    (qe(
      n,
      i,
      a,
      [
        [A + 0.05, E],
        [A + 0.05, E + 0.15],
        [0.95, E + 0.5],
        [1.15, E + 1.1],
        [1.4, E + 1.5],
      ],
      24,
      M,
      {
        rf: (I, L, F, O) =>
          O > E + 0.3 ? I * (0.92 + 0.12 * Math.abs(Math.sin(L * 8))) : I,
      },
    ),
      ss(n, i - 1.45, E + 1.5, a - 1.45, i + 1.45, E + 1.85, a + 1.45, M));
    let R = We(we.bronze, 0.42, 0.37, 0.3),
      P = E + 1.85;
    (qe(
      n,
      i,
      a,
      [
        [0.9, P],
        [0.9, P + 0.5],
        [0.6, P + 0.6],
      ],
      16,
      M,
    ),
      qe(
        n,
        i,
        a,
        [
          [0.01, P + 0.55],
          [0.5, P + 0.75],
          [0.62, P + 1.1],
          [0.5, P + 1.45],
          [0.01, P + 1.6],
        ],
        14,
        R,
      ));
    let C = P + 1.55;
    (qe(
      n,
      i,
      a,
      [
        [0.55, C],
        [0.5, C + 0.8],
        [0.36, C + 1.6],
        [0.3, C + 2.1],
        [0.36, C + 2.4],
        [0.2, C + 2.62],
        [0.12, C + 2.7],
      ],
      12,
      R,
      { rf: (I, L) => I * (1 + 0.18 * Math.sin(L * 3 + 1)) },
    ),
      qe(
        n,
        i,
        a,
        [
          [0.12, C + 2.66],
          [0.16, C + 2.8],
          [0.15, C + 3],
          [0.02, C + 3.1],
        ],
        10,
        R,
      ));
    for (let I of [-1, 1]) {
      let L = [i + 0.12 * I, C + 2.3, a - 0.15],
        F = [i + 1.35 * I, C + 3.6, a - 0.55],
        O = [i + 0.9 * I, C + 1.5, a - 0.4];
      (oe(n, [L, F, O], R, [0, 0, -1]), oe(n, [L, F, O], R, [0, 0, 1]));
    }
    (Ce(
      n,
      [i - 0.3, C + 2.35, a + 0.1],
      [i - 0.55, C + 3.3, a + 0.2],
      0.08,
      R,
      5,
      !0,
    ),
      qe(
        n,
        i - 0.58,
        a + 0.2,
        [
          [0.3, C + 3.3],
          [0.34, C + 3.36],
          [0.3, C + 3.42],
          [0.22, C + 3.36],
          [0.3, C + 3.3],
        ],
        10,
        R,
      ),
      Ce(
        n,
        [i + 0.35, C + 2.3, a + 0.05],
        [i + 0.55, C + 1.6, a + 0.1],
        0.08,
        R,
        5,
        !0,
      ),
      Ce(
        n,
        [i + 0.6, C - 0.2, a + 0.1],
        [i + 0.6, C + 3.9, a + 0.1],
        0.035,
        R,
        4,
        !0,
      ));
    for (let I of [-0.16, 0, 0.16])
      Ce(
        n,
        [i + 0.6 + I, C + 3.75, a + 0.1],
        [i + 0.6 + I, C + 4.2, a + 0.1],
        0.025,
        R,
        4,
        !0,
      );
    (Ce(
      n,
      [i + 0.44, C + 3.75, a + 0.1],
      [i + 0.76, C + 3.75, a + 0.1],
      0.03,
      R,
      4,
      !0,
    ),
      o.colliders.push({
        t: "box",
        x0: i - 5.2,
        z0: a - 5.2,
        x1: i + 5.2,
        z1: a + 5.2,
      }));
  }
  let v = Lt(Ct.metal, 0.16, 0.12, 0.08);
  for (let [x, y, M] of [
    [c.x0 + 16, c.z1 - 13, 1],
    [c.x1 - 16, c.z0 + 13, -1],
  ]) {
    let S = h(x, y),
      w = 4.2,
      _ = 2.8,
      z = 3.4;
    (ss(
      n,
      x - w - 0.15,
      S - 0.3,
      y - _ - 0.15,
      x + w + 0.15,
      S + 0.12,
      y + _ + 0.15,
      m,
    ),
      Ss(
        n,
        [
          [x - w, y - _],
          [x + w, y - _],
          [x + w, y + _],
          [x - w, y + _],
        ],
        S + 0.12,
        S + z,
        Tn(ln.OFFICE, we.polgranite, 0.3),
      ));
    for (let A = 0; A <= 6; A++)
      for (let T of [y - _ - 0.03, y + _ + 0.03]) {
        let E = x - w + (2 * w * A) / 6;
        Ce(n, [E, S + 0.12, T], [E, S + z, T], 0.05, v, 4);
      }
    for (let A = 0; A <= 4; A++)
      for (let T of [x - w - 0.03, x + w + 0.03]) {
        let E = y - _ + (2 * _ * A) / 4;
        Ce(n, [T, S + 0.12, E], [T, S + z, E], 0.05, v, 4);
      }
    (ss(
      n,
      x - w - 0.9,
      S + z,
      y - _ - 0.9,
      x + w + 0.9,
      S + z + 0.28,
      y + _ + 0.9,
      Lt(Ct.matte, 0.16, 0.16, 0.17),
    ),
      ss(
        n,
        x - w + 0.4,
        S + z - 0.5,
        y - _ - 0.06,
        x + w - 0.4,
        S + z - 0.12,
        y - _ - 0.02,
        wn(1, 0.82, 0.55),
      ),
      ss(
        n,
        x - w + 0.4,
        S + z - 0.5,
        y + _ + 0.02,
        x + w - 0.4,
        S + z - 0.12,
        y + _ + 0.06,
        wn(1, 0.82, 0.55),
      ),
      o.colliders.push({
        t: "box",
        x0: x - w,
        z0: y - _,
        x1: x + w,
        z1: y + _,
      }));
    for (let A = 0; A < 3; A++)
      for (let T = 0; T < 3; T++) {
        let E = x + M * (w + 3.2 + A * 3.1),
          R = y + (T - 1) * 3.2 + 0.4 * (js(A, T, x) - 0.5),
          P = h(E, R);
        o.inst.push({
          kind: (A + T) % 2 ? "cafe1" : "cafe0",
          x: E,
          y: P,
          z: R,
          rot: js(E, R, 4) * 6.28,
        });
      }
  }
  for (let x = 0; x < 8; x++) {
    let y = (x / 8) * Math.PI * 2 + Math.PI / 8,
      M = 9.5,
      S = i + Math.cos(y) * M,
      w = a + Math.sin(y) * M;
    o.inst.push({
      kind: "bench",
      x: S,
      y: h(S, w),
      z: w,
      rot: Math.atan2(-Math.cos(y), -Math.sin(y)),
    });
  }
  for (let [x, y] of [
    [c.z0 + 9.2, 1],
    [c.z1 - 9.2, -1],
  ])
    for (let M of [c.x0 + 14, i - 15, i + 15, c.x1 - 14])
      Math.abs(M - (y > 0 ? c.x1 - 16 : c.x0 + 16)) < 12 ||
        o.inst.push({
          kind: "bench",
          x: M,
          y: h(M, x),
          z: x,
          rot: y > 0 ? 0 : Math.PI,
        });
  (xf(o, s), vn(o.group, n, t.lm, "UnionSquare"));
}
