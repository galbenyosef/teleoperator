// app 64 — math
// Lines 66657-67193 of readable/app.pretty.js (statement-aligned).
function RW(o, t, e, s, n, i, a, r, l, c = null) {
  let h = (A, T, E) => [n + Math.cos(T) * A, E, i + Math.sin(T) * A],
    f = r + 0.55,
    u = r + 3.85,
    d = r + 7,
    p = r + 8.45,
    m = a - 0.35;
  (Ws(
    o,
    n,
    i,
    [
      [a + 0.45, r],
      [a + 0.45, r + 0.12],
      [a + 0.25, r + 0.14],
      [a + 0.25, r + 0.5],
      [a + 0.18, r + 0.55],
      [m, r + 0.55],
    ],
    l ? 40 : 20,
    ge.cream,
  ),
    l &&
      Ws(
        o,
        n,
        i,
        [
          [a + 0.26, r + 0.22],
          [a + 0.26, r + 0.4],
        ],
        40,
        ge.red,
      ),
    l ||
      (Ws(
        o,
        n,
        i,
        [
          [a - 0.2, f],
          [a - 0.2, d],
        ],
        16,
        ge.gold,
      ),
      Ws(
        o,
        n,
        i,
        [
          [a + 0.25, d],
          [a + 0.25, p],
        ],
        16,
        ge.cream,
      )));
  let g = l ? 16 : 0;
  for (let A = 0; A < g; A++) {
    let T = (A / g) * Math.PI * 2 + 0.1,
      [E, , R] = h(a - 0.12, T, 0);
    if (
      (os(o, E, R, 0.075, r + 0.55, d, 8, ge.brass),
      os(o, E, R, 0.12, r + 0.55, r + 0.85, 8, ge.gold),
      os(o, E, R, 0.11, d - 0.3, d, 8, ge.gold),
      A % 4 === 1)
    ) {
      let C = [Math.cos(T) * 0.16, Math.sin(T) * 0.16];
      Qi(
        o,
        [
          [E + C[0], d - 0.05, R + C[1]],
          [E + C[0], d - 1.2, R + C[1]],
          [E + C[0], r + 2.7, R + C[1]],
          [E + C[0] * 1.15, r + 1.9, R + C[1] * 1.15],
        ],
        [0.2, 0.12, 0.06, 0.13],
        7,
        ge.drape,
      );
    }
  }
  let b = 12;
  if (l) {
    (Rdt(t, n, i, a + 0.25, d + 0.18, p - d - 0.18),
      Ws(
        o,
        n,
        i,
        [
          [a + 0.3, d - 0.02],
          [a + 0.36, d + 0.08],
          [a + 0.3, d + 0.18],
        ],
        48,
        ge.gold,
      ),
      Ws(
        o,
        n,
        i,
        [
          [a + 0.3, d - 0.02],
          [a - 0.3, d - 0.02],
        ],
        48,
        ge.cream,
      ));
    for (let A = 0; A < b; A++) {
      let T = (A / b) * Math.PI * 2,
        E = ((A + 1) / b) * Math.PI * 2,
        R = [],
        P = 9;
      for (let L = 0; L <= 12; L++) {
        let F = L / 12,
          O = T + (E - T) * F;
        R.push(h(a + 0.33, O, p + 0.05 + 0.32 * Math.sin(Math.PI * F)));
      }
      Qi(o, R, 0.07, 5, ge.gold);
      for (let L = 1; L < P; L++) {
        let F = L / P,
          O = T + (E - T) * F,
          [B, H, N] = h(a + 0.4, O, p + 0.05 + 0.32 * Math.sin(Math.PI * F));
        Nb(o, B, H, N);
      }
      let [C, , I] = h(a + 0.34, T, 0);
      Ws(
        o,
        C,
        I,
        [
          [0.01, p - 0.05],
          [0.2, p + 0.15],
          [0.22, p + 0.45],
          [0.12, p + 0.62],
          [0.01, p + 0.7],
        ],
        6,
        ge.shield,
      );
      for (let L = 0; L < 6; L++) {
        let F = T + ((E - T) * (L + 0.5)) / 6,
          [O, , B] = h(a + 0.33, F, 0);
        Nb(o, O, d + 0.1, B);
      }
    }
    for (let A = 0; A < 32; A++) {
      let T = (A / 32) * Math.PI * 2,
        E = ((A + 1) / 32) * Math.PI * 2,
        R = A % 2 ? ge.red : ge.redDk;
      Ms(
        o,
        h(a - 0.25, T, d - 0.02),
        h(a - 0.25, E, d - 0.02),
        h(1.6, E, d + 0.9),
        h(1.6, T, d + 0.9),
        R,
        [n, r, i],
      );
    }
    for (let A = 0; A < 16; A++) {
      let T = (A / 16) * Math.PI * 2,
        E = ((A + 1) / 16) * Math.PI * 2,
        R = [];
      for (let P = 0; P <= 8; P++) {
        let C = P / 8;
        R.push(
          h(a - 0.3, T + (E - T) * C, d - 0.12 - 0.42 * Math.sin(Math.PI * C)),
        );
      }
      Qi(o, R, 0.05, 4, ge.gold);
      for (let P = 1; P < 6; P++) {
        let C = P / 6,
          [I, L, F] = h(
            a - 0.36,
            T + (E - T) * C,
            d - 0.12 - 0.42 * Math.sin(Math.PI * C),
          );
        Nb(o, I, L - 0.06, F);
      }
    }
  }
  let v = l ? 32 : 12,
    x = p + 0.15;
  for (let A = 0; A < v; A++) {
    let T = (A / v) * Math.PI * 2,
      E = ((A + 1) / v) * Math.PI * 2,
      R = A % 2 ? ge.white : ge.cblue,
      P = [
        [a + 0.2, x],
        [a * 0.78, x + 0.65],
        [a * 0.45, x + 1.25],
        [1.75, x + 1.6],
      ];
    for (let C = 0; C + 1 < P.length; C++) {
      let [I, L] = P[C],
        [F, O] = P[C + 1];
      Ms(o, h(I, T, L), h(I, E, L), h(F, E, O), h(F, T, O), R, [
        n + Math.cos((T + E) / 2) * 30,
        x + 30,
        i + Math.sin((T + E) / 2) * 30,
      ]);
    }
  }
  let y = x + 1.6;
  if (
    (Ws(
      o,
      n,
      i,
      [
        [1.75, y],
        [1.75, y + 0.12],
        [1.62, y + 0.14],
        [1.62, y + 0.55],
      ],
      l ? 24 : 10,
      ge.cream,
    ),
    Ws(
      o,
      n,
      i,
      [
        [1.64, y + 0.55],
        [1.64, y + 0.75],
      ],
      l ? 24 : 10,
      ge.red,
    ),
    Ws(
      o,
      n,
      i,
      [
        [1.64, y + 0.75],
        [1.64, y + 0.85],
      ],
      l ? 24 : 10,
      ge.white,
    ),
    l)
  )
    for (let A = 0; A < 8; A++) {
      let T = (A / 8) * Math.PI * 2,
        [E, , R] = h(1.635, T, 0);
      Vs(
        o,
        E,
        R,
        -Math.sin(T),
        Math.cos(T),
        0.14,
        0.02,
        y + 0.2,
        y + 0.48,
        [ge.red, ge.cblue, ge.gold, ge.green][A % 4],
      );
    }
  let M = l ? 16 : 8;
  for (let A = 0; A < M; A++) {
    let T = (A / M) * Math.PI * 2,
      E = ((A + 1) / M) * Math.PI * 2,
      R = A % 2 ? ge.white : ge.cblue,
      P = [
        [1.7, y + 0.85],
        [1.25, y + 1.25],
        [0.85, y + 1.9],
        [0.55, y + 2.7],
        [0.06, y + 4.3],
      ];
    for (let C = 0; C + 1 < P.length; C++) {
      let [I, L] = P[C],
        [F, O] = P[C + 1],
        B = C >= 2 && A % 2 === 0 && C === 3 ? ge.white : R;
      Ms(o, h(I, T, L), h(I, E, L), h(F, E, O), h(F, T, O), B, [
        n + Math.cos((T + E) / 2) * 30,
        y + 3,
        i + Math.sin((T + E) / 2) * 30,
      ]);
    }
  }
  if (
    (Ws(
      o,
      n,
      i,
      [
        [0.02, y + 4.2],
        [0.3, y + 4.32],
        [0.4, y + 4.6],
        [0.3, y + 4.88],
        [0.02, y + 5],
      ],
      l ? 12 : 6,
      ge.red,
    ),
    !l)
  )
    return;
  (AW(t, n, i, 1.45, f, u - 0.75),
    AW(t, n, i, 1.45, u, d + 0.9),
    Ws(
      o,
      n,
      i,
      [
        [1.6, f],
        [1.6, f + 0.25],
        [1.45, f + 0.3],
      ],
      20,
      ge.gold,
    ),
    Ws(
      o,
      n,
      i,
      [
        [1.45, u - 0.75],
        [1.6, u - 0.7],
        [1.6, u - 0.55],
      ],
      20,
      ge.gold,
    ),
    Ws(
      e,
      n,
      i,
      [
        [m, f - 0.25],
        [m, f],
        [1.5, f + 0.001],
      ],
      40,
      ge.plankDk,
    ),
    Ws(
      e,
      n,
      i,
      [
        [m + 0.02, f - 0.24],
        [m + 0.02, f - 0.02],
      ],
      40,
      ge.gold,
    ));
  let S = a - 0.75;
  (Ws(
    e,
    n,
    i,
    [
      [S, u - 0.12],
      [S, u],
      [1.5, u + 0.001],
    ],
    40,
    ge.plankDk,
  ),
    Ws(
      e,
      n,
      i,
      [
        [1.5, u - 0.75],
        [S - 0.05, u - 0.74],
      ],
      40,
      ge.cream,
    ));
  for (let A = 0; A < 20; A++) {
    let T = (A / 20) * Math.PI * 2,
      E = ((A + 1) / 20) * Math.PI * 2,
      R = [];
    for (let I = 0; I <= 6; I++) {
      let L = I / 6,
        F = T + (E - T) * L;
      R.push(h(S + 0.02, F, u - 0.55 - 0.22 * Math.sin(Math.PI * L)));
    }
    for (let I = 0; I < 6; I++) {
      let L = R[I],
        F = R[I + 1];
      Ms(e, [L[0], u - 0.02, L[2]], [F[0], u - 0.02, F[2]], F, L, ge.valance, [
        n + Math.cos((T + E) / 2) * 40,
        u,
        i + Math.sin((T + E) / 2) * 40,
      ]);
    }
    Qi(e, R, 0.04, 4, ge.gold);
    for (let I = 1; I < 5; I++) {
      let L = I / 5,
        [F, O, B] = h(
          S + 0.07,
          T + (E - T) * L,
          u - 0.55 - 0.22 * Math.sin(Math.PI * L),
        );
      Nb(e, F, O, B);
    }
    let [P, , C] = h(S + 0.07, T, 0);
    Nb(e, P, u - 0.18, C);
  }
  (Ws(
    e,
    n,
    i,
    [
      [S + 0.03, u - 0.3],
      [S + 0.03, u - 0.22],
    ],
    40,
    ge.red,
  ),
    Ws(
      e,
      n,
      i,
      [
        [S + 0.04, u - 0.22],
        [S + 0.04, u - 0.02],
      ],
      40,
      ge.gold,
    ));
  let w = 0.35;
  for (let A = 0; A < 56; A++) {
    let T = (A / 56) * Math.PI * 2,
      E = ((A + 1) / 56) * Math.PI * 2;
    if (
      !(
        Math.abs(((T - w + Math.PI * 3) % (Math.PI * 2)) - Math.PI) >
        Math.PI - 0.22
      )
    ) {
      (rs(e, h(S - 0.08, T, u + 1), h(S - 0.08, E, u + 1), 0.08, 0.06, ge.red),
        rs(
          e,
          h(S - 0.08, T, u + 0.15),
          h(S - 0.08, E, u + 0.15),
          0.05,
          0.04,
          ge.gold,
        ));
      for (let R = 0; R < 3; R++) {
        let [P, , C] = h(S - 0.08, T + ((E - T) * R) / 3, 0);
        os(e, P, C, 0.018, u + 0.15, u + 1, 4, ge.brass);
      }
    }
  }
  {
    let A = S - 0.55,
      T = 14,
      E = 0.075;
    for (let R = 0; R < T; R++) {
      let P = w + (T - R) * E,
        C = f + ((u - f) * (R + 1)) / T,
        I = h(A - 0.45, P, C),
        L = h(A + 0.45, P, C),
        F = h(A + 0.45, P - E, C),
        O = h(A - 0.45, P - E, C);
      ($i(e, [I, L, F, O], ge.red),
        Ms(
          e,
          I,
          L,
          [L[0], C - (u - f) / T, L[2]],
          [I[0], C - (u - f) / T, I[2]],
          ge.redDk,
          h(A, P + 0.5, C),
        ));
    }
    for (let R of [-0.5, 0.5]) {
      let P = [];
      for (let C = 0; C <= T; C++)
        P.push(h(A + R, w + (T - C) * E, f + ((u - f) * C) / T + 0.95));
      Qi(e, P, 0.03, 4, ge.brass);
      for (let C = 0; C <= T; C += 2) {
        let [I, , L] = h(A + R, w + (T - C) * E, 0),
          F = f + ((u - f) * C) / T;
        os(e, I, L, 0.02, F, F + 0.95, 4, ge.brass);
      }
    }
  }
  let _ = [
      [f, a - 0.95, 16, u - 0.75, 0],
      [f, a - 2.25, 12, u - 0.75, 0.13],
      [u, a - 1.45, 14, d + 0.6, 0.07],
    ],
    z = 0;
  for (let [A, T, E, R, P] of _)
    for (let C = 0; C < E; C++) {
      let I = (C / E) * Math.PI * 2 + P;
      if (
        (A === u &&
          Math.abs(((I - w + Math.PI * 3) % (Math.PI * 2)) - Math.PI) >
            Math.PI - 0.5) ||
        (A === f &&
          T > a - 1.5 &&
          Math.abs(((I - w - 0.5 + Math.PI * 3) % (Math.PI * 2)) - Math.PI) >
            Math.PI - 0.6)
      )
        continue;
      let [L, , F] = h(T, I, 0),
        O = Math.sin(I),
        B = -Math.cos(I);
      if ((T < a - 2 || A === u) && C % 4 === 2) {
        Pdt(e, L, F, O, B, A, C);
        continue;
      }
      (os(e, L, F, 0.03, A, R, 6, ge.brass),
        Ws(
          e,
          L,
          F,
          [
            [0.03, R - 0.02],
            [0.07, R - 0.1],
            [0.03, R - 0.18],
          ],
          6,
          ge.gold,
        ),
        Adt(
          s[z++ % 2],
          L,
          F,
          O,
          B,
          A + (A === f ? 1.15 : 1.05),
          C + Math.round(T * 7),
          T > a - 1.5 || A === u,
        ),
        c?.push({ x: L, z: F, hx: O, hz: B }));
    }
}
