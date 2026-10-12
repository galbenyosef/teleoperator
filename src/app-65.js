// app 65 — math
// Lines 66426-66962 of readable/app.pretty.js (statement-aligned).
function EG(i, t, e, s, n, o, a, r, l, c = null) {
  let h = (R, T, E) => [n + Math.cos(T) * R, E, o + Math.sin(T) * R],
    f = r + 0.55,
    u = r + 3.85,
    d = r + 7,
    p = r + 8.45,
    m = a - 0.35;
  (Gs(
    i,
    n,
    o,
    [
      [a + 0.45, r],
      [a + 0.45, r + 0.12],
      [a + 0.25, r + 0.14],
      [a + 0.25, r + 0.5],
      [a + 0.18, r + 0.55],
      [m, r + 0.55],
    ],
    l ? 40 : 20,
    ue.cream,
  ),
    l &&
      Gs(
        i,
        n,
        o,
        [
          [a + 0.26, r + 0.22],
          [a + 0.26, r + 0.4],
        ],
        40,
        ue.red,
      ),
    l ||
      (Gs(
        i,
        n,
        o,
        [
          [a - 0.2, f],
          [a - 0.2, d],
        ],
        16,
        ue.gold,
      ),
      Gs(
        i,
        n,
        o,
        [
          [a + 0.25, d],
          [a + 0.25, p],
        ],
        16,
        ue.cream,
      )));
  let g = l ? 16 : 0;
  for (let R = 0; R < g; R++) {
    let T = (R / g) * Math.PI * 2 + 0.1,
      [E, , A] = h(a - 0.12, T, 0);
    if (
      (es(i, E, A, 0.075, r + 0.55, d, 8, ue.brass),
      es(i, E, A, 0.12, r + 0.55, r + 0.85, 8, ue.gold),
      es(i, E, A, 0.11, d - 0.3, d, 8, ue.gold),
      R % 4 === 1)
    ) {
      let P = [Math.cos(T) * 0.16, Math.sin(T) * 0.16];
      Wi(
        i,
        [
          [E + P[0], d - 0.05, A + P[1]],
          [E + P[0], d - 1.2, A + P[1]],
          [E + P[0], r + 2.7, A + P[1]],
          [E + P[0] * 1.15, r + 1.9, A + P[1] * 1.15],
        ],
        [0.2, 0.12, 0.06, 0.13],
        7,
        ue.drape,
      );
    }
  }
  let b = 12;
  if (l) {
    (lht(t, n, o, a + 0.25, d + 0.18, p - d - 0.18),
      Gs(
        i,
        n,
        o,
        [
          [a + 0.3, d - 0.02],
          [a + 0.36, d + 0.08],
          [a + 0.3, d + 0.18],
        ],
        48,
        ue.gold,
      ),
      Gs(
        i,
        n,
        o,
        [
          [a + 0.3, d - 0.02],
          [a - 0.3, d - 0.02],
        ],
        48,
        ue.cream,
      ));
    for (let R = 0; R < b; R++) {
      let T = (R / b) * Math.PI * 2,
        E = ((R + 1) / b) * Math.PI * 2,
        A = [],
        C = 9;
      for (let L = 0; L <= 12; L++) {
        let F = L / 12,
          N = T + (E - T) * F;
        A.push(h(a + 0.33, N, p + 0.05 + 0.32 * Math.sin(Math.PI * F)));
      }
      Wi(i, A, 0.07, 5, ue.gold);
      for (let L = 1; L < C; L++) {
        let F = L / C,
          N = T + (E - T) * F,
          [B, H, O] = h(a + 0.4, N, p + 0.05 + 0.32 * Math.sin(Math.PI * F));
        Kg(i, B, H, O);
      }
      let [P, , I] = h(a + 0.34, T, 0);
      Gs(
        i,
        P,
        I,
        [
          [0.01, p - 0.05],
          [0.2, p + 0.15],
          [0.22, p + 0.45],
          [0.12, p + 0.62],
          [0.01, p + 0.7],
        ],
        6,
        ue.shield,
      );
      for (let L = 0; L < 6; L++) {
        let F = T + ((E - T) * (L + 0.5)) / 6,
          [N, , B] = h(a + 0.33, F, 0);
        Kg(i, N, d + 0.1, B);
      }
    }
    for (let R = 0; R < 32; R++) {
      let T = (R / 32) * Math.PI * 2,
        E = ((R + 1) / 32) * Math.PI * 2,
        A = R % 2 ? ue.red : ue.redDk;
      xs(
        i,
        h(a - 0.25, T, d - 0.02),
        h(a - 0.25, E, d - 0.02),
        h(1.6, E, d + 0.9),
        h(1.6, T, d + 0.9),
        A,
        [n, r, o],
      );
    }
    for (let R = 0; R < 16; R++) {
      let T = (R / 16) * Math.PI * 2,
        E = ((R + 1) / 16) * Math.PI * 2,
        A = [];
      for (let C = 0; C <= 8; C++) {
        let P = C / 8;
        A.push(
          h(a - 0.3, T + (E - T) * P, d - 0.12 - 0.42 * Math.sin(Math.PI * P)),
        );
      }
      Wi(i, A, 0.05, 4, ue.gold);
      for (let C = 1; C < 6; C++) {
        let P = C / 6,
          [I, L, F] = h(
            a - 0.36,
            T + (E - T) * P,
            d - 0.12 - 0.42 * Math.sin(Math.PI * P),
          );
        Kg(i, I, L - 0.06, F);
      }
    }
  }
  let x = l ? 32 : 12,
    v = p + 0.15;
  for (let R = 0; R < x; R++) {
    let T = (R / x) * Math.PI * 2,
      E = ((R + 1) / x) * Math.PI * 2,
      A = R % 2 ? ue.white : ue.cblue,
      C = [
        [a + 0.2, v],
        [a * 0.78, v + 0.65],
        [a * 0.45, v + 1.25],
        [1.75, v + 1.6],
      ];
    for (let P = 0; P + 1 < C.length; P++) {
      let [I, L] = C[P],
        [F, N] = C[P + 1];
      xs(i, h(I, T, L), h(I, E, L), h(F, E, N), h(F, T, N), A, [
        n + Math.cos((T + E) / 2) * 30,
        v + 30,
        o + Math.sin((T + E) / 2) * 30,
      ]);
    }
  }
  let y = v + 1.6;
  if (
    (Gs(
      i,
      n,
      o,
      [
        [1.75, y],
        [1.75, y + 0.12],
        [1.62, y + 0.14],
        [1.62, y + 0.55],
      ],
      l ? 24 : 10,
      ue.cream,
    ),
    Gs(
      i,
      n,
      o,
      [
        [1.64, y + 0.55],
        [1.64, y + 0.75],
      ],
      l ? 24 : 10,
      ue.red,
    ),
    Gs(
      i,
      n,
      o,
      [
        [1.64, y + 0.75],
        [1.64, y + 0.85],
      ],
      l ? 24 : 10,
      ue.white,
    ),
    l)
  )
    for (let R = 0; R < 8; R++) {
      let T = (R / 8) * Math.PI * 2,
        [E, , A] = h(1.635, T, 0);
      Us(
        i,
        E,
        A,
        -Math.sin(T),
        Math.cos(T),
        0.14,
        0.02,
        y + 0.2,
        y + 0.48,
        [ue.red, ue.cblue, ue.gold, ue.green][R % 4],
      );
    }
  let M = l ? 16 : 8;
  for (let R = 0; R < M; R++) {
    let T = (R / M) * Math.PI * 2,
      E = ((R + 1) / M) * Math.PI * 2,
      A = R % 2 ? ue.white : ue.cblue,
      C = [
        [1.7, y + 0.85],
        [1.25, y + 1.25],
        [0.85, y + 1.9],
        [0.55, y + 2.7],
        [0.06, y + 4.3],
      ];
    for (let P = 0; P + 1 < C.length; P++) {
      let [I, L] = C[P],
        [F, N] = C[P + 1],
        B = P >= 2 && R % 2 === 0 && P === 3 ? ue.white : A;
      xs(i, h(I, T, L), h(I, E, L), h(F, E, N), h(F, T, N), B, [
        n + Math.cos((T + E) / 2) * 30,
        y + 3,
        o + Math.sin((T + E) / 2) * 30,
      ]);
    }
  }
  if (
    (Gs(
      i,
      n,
      o,
      [
        [0.02, y + 4.2],
        [0.3, y + 4.32],
        [0.4, y + 4.6],
        [0.3, y + 4.88],
        [0.02, y + 5],
      ],
      l ? 12 : 6,
      ue.red,
    ),
    !l)
  )
    return;
  (TG(t, n, o, 1.45, f, u - 0.75),
    TG(t, n, o, 1.45, u, d + 0.9),
    Gs(
      i,
      n,
      o,
      [
        [1.6, f],
        [1.6, f + 0.25],
        [1.45, f + 0.3],
      ],
      20,
      ue.gold,
    ),
    Gs(
      i,
      n,
      o,
      [
        [1.45, u - 0.75],
        [1.6, u - 0.7],
        [1.6, u - 0.55],
      ],
      20,
      ue.gold,
    ),
    Gs(
      e,
      n,
      o,
      [
        [m, f - 0.25],
        [m, f],
        [1.5, f + 0.001],
      ],
      40,
      ue.plankDk,
    ),
    Gs(
      e,
      n,
      o,
      [
        [m + 0.02, f - 0.24],
        [m + 0.02, f - 0.02],
      ],
      40,
      ue.gold,
    ));
  let S = a - 0.75;
  (Gs(
    e,
    n,
    o,
    [
      [S, u - 0.12],
      [S, u],
      [1.5, u + 0.001],
    ],
    40,
    ue.plankDk,
  ),
    Gs(
      e,
      n,
      o,
      [
        [1.5, u - 0.75],
        [S - 0.05, u - 0.74],
      ],
      40,
      ue.cream,
    ));
  for (let R = 0; R < 20; R++) {
    let T = (R / 20) * Math.PI * 2,
      E = ((R + 1) / 20) * Math.PI * 2,
      A = [];
    for (let I = 0; I <= 6; I++) {
      let L = I / 6,
        F = T + (E - T) * L;
      A.push(h(S + 0.02, F, u - 0.55 - 0.22 * Math.sin(Math.PI * L)));
    }
    for (let I = 0; I < 6; I++) {
      let L = A[I],
        F = A[I + 1];
      xs(e, [L[0], u - 0.02, L[2]], [F[0], u - 0.02, F[2]], F, L, ue.valance, [
        n + Math.cos((T + E) / 2) * 40,
        u,
        o + Math.sin((T + E) / 2) * 40,
      ]);
    }
    Wi(e, A, 0.04, 4, ue.gold);
    for (let I = 1; I < 5; I++) {
      let L = I / 5,
        [F, N, B] = h(
          S + 0.07,
          T + (E - T) * L,
          u - 0.55 - 0.22 * Math.sin(Math.PI * L),
        );
      Kg(e, F, N, B);
    }
    let [C, , P] = h(S + 0.07, T, 0);
    Kg(e, C, u - 0.18, P);
  }
  (Gs(
    e,
    n,
    o,
    [
      [S + 0.03, u - 0.3],
      [S + 0.03, u - 0.22],
    ],
    40,
    ue.red,
  ),
    Gs(
      e,
      n,
      o,
      [
        [S + 0.04, u - 0.22],
        [S + 0.04, u - 0.02],
      ],
      40,
      ue.gold,
    ));
  let w = 0.35;
  for (let R = 0; R < 56; R++) {
    let T = (R / 56) * Math.PI * 2,
      E = ((R + 1) / 56) * Math.PI * 2;
    if (
      !(
        Math.abs(((T - w + Math.PI * 3) % (Math.PI * 2)) - Math.PI) >
        Math.PI - 0.22
      )
    ) {
      (ss(e, h(S - 0.08, T, u + 1), h(S - 0.08, E, u + 1), 0.08, 0.06, ue.red),
        ss(
          e,
          h(S - 0.08, T, u + 0.15),
          h(S - 0.08, E, u + 0.15),
          0.05,
          0.04,
          ue.gold,
        ));
      for (let A = 0; A < 3; A++) {
        let [C, , P] = h(S - 0.08, T + ((E - T) * A) / 3, 0);
        es(e, C, P, 0.018, u + 0.15, u + 1, 4, ue.brass);
      }
    }
  }
  {
    let R = S - 0.55,
      T = 14,
      E = 0.075;
    for (let A = 0; A < T; A++) {
      let C = w + (T - A) * E,
        P = f + ((u - f) * (A + 1)) / T,
        I = h(R - 0.45, C, P),
        L = h(R + 0.45, C, P),
        F = h(R + 0.45, C - E, P),
        N = h(R - 0.45, C - E, P);
      (Fi(e, [I, L, F, N], ue.red),
        xs(
          e,
          I,
          L,
          [L[0], P - (u - f) / T, L[2]],
          [I[0], P - (u - f) / T, I[2]],
          ue.redDk,
          h(R, C + 0.5, P),
        ));
    }
    for (let A of [-0.5, 0.5]) {
      let C = [];
      for (let P = 0; P <= T; P++)
        C.push(h(R + A, w + (T - P) * E, f + ((u - f) * P) / T + 0.95));
      Wi(e, C, 0.03, 4, ue.brass);
      for (let P = 0; P <= T; P += 2) {
        let [I, , L] = h(R + A, w + (T - P) * E, 0),
          F = f + ((u - f) * P) / T;
        es(e, I, L, 0.02, F, F + 0.95, 4, ue.brass);
      }
    }
  }
  let z = [
      [f, a - 0.95, 16, u - 0.75, 0],
      [f, a - 2.25, 12, u - 0.75, 0.13],
      [u, a - 1.45, 14, d + 0.6, 0.07],
    ],
    _ = 0;
  for (let [R, T, E, A, C] of z)
    for (let P = 0; P < E; P++) {
      let I = (P / E) * Math.PI * 2 + C;
      if (
        (R === u &&
          Math.abs(((I - w + Math.PI * 3) % (Math.PI * 2)) - Math.PI) >
            Math.PI - 0.5) ||
        (R === f &&
          T > a - 1.5 &&
          Math.abs(((I - w - 0.5 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) >
            Math.PI - 0.6)
      )
        continue;
      let [L, , F] = h(T, I, 0),
        N = Math.sin(I),
        B = -Math.cos(I);
      if ((T < a - 2 || R === u) && P % 4 === 2) {
        hht(e, L, F, N, B, R, P);
        continue;
      }
      (es(e, L, F, 0.03, R, A, 6, ue.brass),
        Gs(
          e,
          L,
          F,
          [
            [0.03, A - 0.02],
            [0.07, A - 0.1],
            [0.03, A - 0.18],
          ],
          6,
          ue.gold,
        ),
        cht(
          s[_++ % 2],
          L,
          F,
          N,
          B,
          R + (R === f ? 1.15 : 1.05),
          P + Math.round(T * 7),
          T > a - 1.5 || R === u,
        ),
        c?.push({ x: L, z: F, hx: N, hz: B }));
    }
}
