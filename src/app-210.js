// app 210 — math
// Lines 113607-114131 of readable/app.pretty.js (statement-aligned).
function lxt(o, t) {
  let { D: e, L: s } = t,
    n = pY(e, bh.ign);
  if (!n) return;
  let i = Ra(n),
    a = null;
  for (let C of ia(i)) (!a || C.L > a.L) && (a = C);
  let r = a.u[1] > 0 ? a.u : [-a.u[0], -a.u[1]],
    l = [-r[1], r[0]],
    c = (C) => C[0] * r[0] + C[1] * r[1],
    h = (C) => C[0] * l[0] + C[1] * l[1],
    f = Math.min(...i.map(c)),
    u = Math.max(...i.map(c)),
    d = Math.min(...i.map(h)),
    p = Math.max(...i.map(h)),
    m = (C, I) => [r[0] * C + l[0] * I, r[1] * C + l[1] * I],
    [g, b] = mY(s, i),
    v = g,
    x = b,
    y = (d + p) / 2,
    M = (p - d) / 2,
    S = (C, I, L, F, O, B, H, N = !0) =>
      cn(
        o,
        m((C + I) / 2, (L + F) / 2),
        r,
        l,
        (I - C) / 2,
        (F - L) / 2,
        O,
        B,
        H,
        N,
      ),
    w = u - 2,
    _ = f + 12,
    z = 10.5,
    A = x + 15,
    T = x + 25;
  (S(_, w - z, d, p, v - 0.6, A, td), S(_, w - z, y - 9, y + 9, A, T, td));
  let E = (C, I, L) => {
    let F = m(C, I);
    return [F[0], L, F[1]];
  };
  for (let C of [-1, 1])
    oe(
      o,
      [
        E(_, y + C * 9.3, T),
        E(w - z, y + C * 9.3, T),
        E(w - z, y, T + 3.5),
        E(_, y, T + 3.5),
      ],
      uY,
      [l[0] * C, 3, l[1] * C],
    );
  let R = 5.4,
    P = Math.floor((w - z - _) / R);
  for (let C of [-1, 1]) {
    let I = C < 0 ? d : p,
      L = C * 0.35,
      F = [l[0] * C, l[1] * C];
    for (let O = 0; O <= P; O++) {
      let B = _ + O * R + (w - z - _ - P * R) / 2;
      S(B - 0.5, B + 0.5, I + L - 0.35, I + L + 0.35, v - 0.6, A - 2, pr);
    }
    for (let O = 0; O < P; O++) {
      let B = _ + (O + 0.5) * R + (w - z - _ - P * R) / 2,
        H = m(B, I + C * 0.09),
        N = [];
      N.push([H[0] - r[0] * 1.8, x + 0.5, H[1] - r[1] * 1.8]);
      for (let G = 0; G <= 8; G++) {
        let W = (Math.PI * G) / 8;
        N.push([
          H[0] - r[0] * 1.8 * Math.cos(W),
          x + 7.5 + 1.8 * Math.sin(W),
          H[1] - r[1] * 1.8 * Math.cos(W),
        ]);
      }
      (N.push([H[0] + r[0] * 1.8, x + 0.5, H[1] + r[1] * 1.8]),
        oe(o, N, rxt, [F[0], 0, F[1]]));
      let D = m(B, I + C * 0.14);
      oe(
        o,
        Array.from({ length: 10 }, (G, W) => {
          let V = (W / 10) * Math.PI * 2;
          return [
            D[0] + r[0] * Math.cos(V) * 0.9,
            x + 11.3 + Math.sin(V) * 0.9,
            D[1] + r[1] * Math.cos(V) * 0.9,
          ];
        }),
        gh,
        [F[0], 0, F[1]],
      );
      let U = m(B, y + C * 9.04);
      oe(
        o,
        Array.from({ length: 10 }, (G, W) => {
          let V = (W / 10) * Math.PI * 2;
          return [
            U[0] + r[0] * Math.cos(V) * 1.1,
            A + 5 + Math.sin(V) * 1.1,
            U[1] + r[1] * Math.cos(V) * 1.1,
          ];
        }),
        gh,
        [F[0], 0, F[1]],
      );
    }
    S(_, w - z, I - (C < 0 ? 0.6 : 0), I + (C > 0 ? 0.6 : 0), A - 2, A - 1, pr);
    for (let O = _ + 0.4; O < w - z; O += 0.7)
      S(
        O - 0.12,
        O + 0.12,
        I - C * 0.3 - 0.12,
        I - C * 0.3 + 0.12,
        A,
        A + 0.9,
        pr,
        !1,
      );
    (S(_, w - z, I - C * 0.3 - 0.25, I - C * 0.3 + 0.25, A + 0.9, A + 1.15, pr),
      S(_, w - z, y + C * 9 - 0.3, y + C * 9 + 0.3, T - 1, T, pr));
  }
  {
    let C = m(_, y);
    (qe(
      o,
      C[0],
      C[1],
      [
        [M * 0.55, v - 0.6],
        [M * 0.55, A],
      ],
      16,
      td,
    ),
      qe(
        o,
        C[0],
        C[1],
        [
          [M * 0.57, A],
          [M * 0.3, A + 4],
          [0.1, A + 5],
        ],
        16,
        uY,
      ));
  }
  {
    let C = _ + (w - z - _) * 0.22,
      I = m(C, y),
      L = 8,
      F = T + 1;
    (qe(
      o,
      I[0],
      I[1],
      [
        [L + 0.6, T - 2],
        [L + 0.6, F],
      ],
      16,
      td,
    ),
      qe(
        o,
        I[0],
        I[1],
        [
          [L, F],
          [L, F + 6],
        ],
        16,
        td,
      ));
    for (let H = 0; H < 8; H++) {
      let N = ((H + 0.5) / 8) * Math.PI * 2,
        D = [I[0] + Math.cos(N) * (L + 0.05), I[1] - Math.sin(N) * (L + 0.05)];
      cn(
        o,
        D,
        [Math.sin(N), Math.cos(N)],
        [Math.cos(N), -Math.sin(N)],
        0.9,
        0.1,
        F + 1.6,
        F + 4.8,
        gh,
      );
    }
    let O = [];
    for (let H = 0; H <= 8; H++) {
      let N = ((H / 8) * Math.PI) / 2;
      O.push([(L + 0.3) * Math.cos(N) + 0.05, F + 6.2 + Math.sin(N) * 9]);
    }
    qe(o, I[0], I[1], O, 16, Dw);
    for (let H = 0; H < 12; H++) {
      let N = (H / 12) * Math.PI * 2;
      for (let D = 0; D + 1 < O.length; D++)
        Ce(
          o,
          [
            I[0] + Math.cos(N) * (O[D][0] + 0.1),
            O[D][1],
            I[1] - Math.sin(N) * (O[D][0] + 0.1),
          ],
          [
            I[0] + Math.cos(N) * (O[D + 1][0] + 0.1),
            O[D + 1][1],
            I[1] - Math.sin(N) * (O[D + 1][0] + 0.1),
          ],
          0.18,
          pr,
          3,
        );
    }
    let B = F + 15.2;
    (qe(
      o,
      I[0],
      I[1],
      [
        [1.6, B - 0.3],
        [1.6, B + 3],
      ],
      8,
      pr,
    ),
      qe(
        o,
        I[0],
        I[1],
        [
          [1.9, B + 3],
          [0.2, B + 5.5],
          [0.06, B + 7.5],
        ],
        8,
        Dw,
      ));
  }
  for (let C of [d + z / 2, p - z / 2]) {
    let I = w - z / 2;
    S(I - z / 2, I + z / 2, C - z / 2, C + z / 2, v - 0.6, x + 30, td);
    for (let F of [x + 15, x + 30])
      S(
        I - z / 2 - 0.3,
        I + z / 2 + 0.3,
        C - z / 2 - 0.3,
        C + z / 2 + 0.3,
        F - 1,
        F + 0.06,
        pr,
      );
    for (let [F, O] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ])
      S(
        I + (F * z) / 2 - 0.9,
        I + (F * z) / 2 + 0.9,
        C + (O * z) / 2 - 0.9,
        C + (O * z) / 2 + 0.9,
        v - 0.6,
        x + 29,
        pr,
        !1,
      );
    for (let [F, O] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      let B = [r[0] * F + l[0] * O, r[1] * F + l[1] * O],
        H = [-B[1], B[0]],
        N = m(I + F * (z / 2 + 0.09), C + O * (z / 2 + 0.09));
      oe(
        o,
        [
          [N[0] - H[0] * 0.9, x + 6, N[1] - H[1] * 0.9],
          [N[0] + H[0] * 0.9, x + 6, N[1] + H[1] * 0.9],
          [N[0] + H[0] * 0.9, x + 10.5, N[1] + H[1] * 0.9],
          [N[0], x + 11.4, N[1]],
          [N[0] - H[0] * 0.9, x + 10.5, N[1] - H[1] * 0.9],
        ],
        gh,
        [B[0], 0, B[1]],
      );
    }
    for (let [F, O] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      let B = [r[0] * F + l[0] * O, r[1] * F + l[1] * O],
        H = [-B[1], B[0]],
        N = m(I + F * (z / 2 + 0.09), C + O * (z / 2 + 0.09));
      oe(
        o,
        [
          [N[0] - H[0] * 1.3, x + 19, N[1] - H[1] * 1.3],
          [N[0] + H[0] * 1.3, x + 19, N[1] + H[1] * 1.3],
          [N[0] + H[0] * 1.3, x + 25.5, N[1] + H[1] * 1.3],
          [N[0], x + 26.8, N[1]],
          [N[0] - H[0] * 1.3, x + 25.5, N[1] - H[1] * 1.3],
        ],
        gh,
        [B[0], 0, B[1]],
      );
    }
    S(
      I - z / 2 + 0.8,
      I + z / 2 - 0.8,
      C - z / 2 + 0.8,
      C + z / 2 - 0.8,
      x + 30,
      x + 41,
      td,
    );
    for (let [F, O] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      let B = [r[0] * F + l[0] * O, r[1] * F + l[1] * O],
        H = [-B[1], B[0]],
        N = m(I + F * (z / 2 - 0.71), C + O * (z / 2 - 0.71));
      oe(
        o,
        [
          [N[0] - H[0] * 1.6, x + 32, N[1] - H[1] * 1.6],
          [N[0] + H[0] * 1.6, x + 32, N[1] + H[1] * 1.6],
          [N[0] + H[0] * 1.6, x + 38, N[1] + H[1] * 1.6],
          [N[0], x + 39.4, N[1]],
          [N[0] - H[0] * 1.6, x + 38, N[1] - H[1] * 1.6],
        ],
        gh,
        [B[0], 0, B[1]],
      );
    }
    S(
      I - z / 2 + 0.4,
      I + z / 2 - 0.4,
      C - z / 2 + 0.4,
      C + z / 2 - 0.4,
      x + 41,
      x + 42.2,
      pr,
    );
    let L = m(I, C);
    qe(
      o,
      L[0],
      L[1],
      [
        [3.4, x + 42.2],
        [3.4, x + 49],
        [3.8, x + 49],
        [3.8, x + 49.8],
      ],
      8,
      pr,
    );
    for (let F = 0; F < 8; F++) {
      let O = ((F + 0.5) / 8) * Math.PI * 2,
        B = [L[0] + Math.cos(O) * 3.42, L[1] - Math.sin(O) * 3.42];
      cn(
        o,
        B,
        [Math.sin(O), Math.cos(O)],
        [Math.cos(O), -Math.sin(O)],
        0.65,
        0.06,
        x + 43.5,
        x + 48,
        gh,
      );
    }
    (qe(
      o,
      L[0],
      L[1],
      [
        [3.6, x + 49.8],
        [2.4, x + 53.5],
        [0.9, x + 55.5],
      ],
      8,
      Dw,
    ),
      qe(
        o,
        L[0],
        L[1],
        [
          [0.9, x + 55.5],
          [0.9, x + 57.5],
          [1.1, x + 57.5],
          [0.12, x + 60.5],
          [0.05, x + 62.5],
        ],
        8,
        pr,
      ),
      Ce(o, [L[0], x + 61.6, L[1]], [L[0], x + 64, L[1]], 0.08, Dw, 4),
      Ce(
        o,
        [L[0] - l[0] * 0.6, x + 63.2, L[1] - l[1] * 0.6],
        [L[0] + l[0] * 0.6, x + 63.2, L[1] + l[1] * 0.6],
        0.07,
        Dw,
        4,
      ));
  }
  {
    let C = w,
      I = d + z,
      L = p - z;
    S(C - 5, C - 1.5, I, L, v - 0.6, x + 24, td);
    {
      let H = m(C - 1.48, (I + L) / 2),
        N = [];
      for (let D = 0; D <= 10; D++) {
        let U = (Math.PI * D) / 10;
        N.push([
          H[0] - l[0] * 2.6 * Math.cos(U),
          x + 21 + 2.6 * Math.sin(U),
          H[1] - l[1] * 2.6 * Math.cos(U),
        ]);
      }
      oe(
        o,
        [
          [H[0] - l[0] * 2.6, x + 18.5, H[1] - l[1] * 2.6],
          ...N,
          [H[0] + l[0] * 2.6, x + 18.5, H[1] + l[1] * 2.6],
        ],
        gh,
        [r[0], 0, r[1]],
      );
      for (let D of [-1, 1])
        for (let U of [4.2, 8.5])
          S(
            C - 1.6,
            C - 1,
            (I + L) / 2 + D * U - 0.5,
            (I + L) / 2 + D * U + 0.5,
            x + 17.7,
            x + 24,
            pr,
            !1,
          );
      S(C - 1.9, C - 0.9, I, L, x + 24, x + 25.2, pr);
    }
    for (let H = 0; H <= 4; H++) {
      let N = I + ((L - I) * (H + 0.5)) / 5.5 + 0.6,
        D = m(C - 4.96, N);
      oe(
        o,
        [
          [D[0] - l[0] * 1.5, x + 0.6, D[1] - l[1] * 1.5],
          [D[0] + l[0] * 1.5, x + 0.6, D[1] + l[1] * 1.5],
          [D[0] + l[0] * 1.5, x + 7.5, D[1] + l[1] * 1.5],
          [D[0], x + 9, D[1]],
          [D[0] - l[0] * 1.5, x + 7.5, D[1] - l[1] * 1.5],
        ],
        gh,
        [r[0], 0, r[1]],
      );
    }
    for (let H = 0; H < 8; H++) {
      let N = I + 0.8 + ((L - I - 1.6) * H) / 7,
        D = m(C - 0.2, N);
      qe(
        o,
        D[0],
        D[1],
        [
          [0.8, x],
          [0.75, x + 13.5],
          [1, x + 14],
          [1, x + 14.4],
        ],
        10,
        pr,
      );
    }
    S(C - 1.6, C + 0.9, I - 0.4, L + 0.4, x + 14.4, x + 16.4, pr);
    for (let H = I; H < L; H += 0.7)
      S(C + 0.1, C + 0.6, H - 0.12, H + 0.12, x + 16.4, x + 17.4, pr, !1);
    S(C - 1.6, C + 0.8, I - 0.4, L + 0.4, x + 17.4, x + 17.7, pr);
    for (let H = 0; H < 6; H++)
      S(
        C - 0.6 + H * 0.33,
        C - 0.3 + H * 0.33,
        I - 0.3,
        L + 0.3,
        v + H * 0.18 - 0.6,
        x - 0.05 - (5 - H) * 0.18 + 0.18,
        cxt,
      );
    let F = m(C - 1.5, I),
      O = m(C - 1.5, L),
      B = m(C - 1.5, (I + L) / 2);
    oe(
      o,
      [
        [F[0], x + 25.2, F[1]],
        [O[0], x + 25.2, O[1]],
        [B[0], x + 29, B[1]],
      ],
      td,
      [r[0], 0, r[1]],
    );
  }
  LL(t, i, v - 3, x + 45);
}
