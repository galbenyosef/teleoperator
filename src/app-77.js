// app 77 — math
// Lines 70046-70627 of readable/app.pretty.js (statement-aligned).
function Pht(i, t = 0) {
  let e = ny[i],
    s = new HR();
  s.hip = e.hip;
  let n = [
      { ring: 16, limb: 10, head: 20, hv: 12 },
      { ring: 10, limb: 7, head: 12, hv: 8 },
      { ring: 6, limb: 4, head: 8, hv: 5 },
    ][t],
    o = e.hip,
    a = e.sh,
    r = o + (a - o) * 0.33,
    l = a - (a - o) * 0.3,
    c = e.neck,
    [h, f, u] = e.head.map((P) => P * 1.07),
    d = c + f * 0.92,
    p = d - f,
    m = d + f,
    g = (P, I = 0.8) => Math.cos(P) > I,
    b = (P) => Zg(r - 0.05, l, P),
    x = [
      [o - 0.075, 0, -0.012, e.hipR[0] * 0.8, e.hipR[1] * 0.62],
      [o - 0.045, 0, -0.012, e.hipR[0] * 0.93, e.hipR[1] * 0.78],
      [o + 0.01, 0, -0.01, e.hipR[0], e.hipR[1] * 0.95],
      [
        o + 0.07,
        0,
        -0.004,
        (e.hipR[0] + e.waist[0]) / 2,
        (e.hipR[1] + e.waist[1]) / 2,
      ],
      [r + 0.02, 0, 0, e.waist[0] * 1.02, e.waist[1] * 1.02],
    ];
  for (let P = 0; P < 3; P++)
    if (
      (s.piece(0, [0, o, 0], ["bottom", P], null, 0, b),
      s.loft(
        x,
        n.ring,
        (I, L) => (P < 2 && I > r - 0.035 && t < 2 ? Ys.belt : Ys.bottom),
        { capBottom: !0 },
      ),
      P === 2)
    ) {
      let I = o - (o - e.knee) * 0.75;
      s.loft(
        [
          [I, 0, 0.005, e.hipR[0] * 1.45, e.hipR[1] * 1.75],
          [I + 0.08, 0, 0.003, e.hipR[0] * 1.32, e.hipR[1] * 1.5],
          [o - 0.02, 0, -0.004, e.hipR[0] * 1.1, e.hipR[1] * 1.15],
          [o + 0.06, 0, -0.006, e.hipR[0] * 1.02, e.hipR[1] * 1.04],
          [r + 0.02, 0, 0, e.waist[0] * 1.05, e.waist[1] * 1.05],
        ],
        n.ring,
        Ys.bottom,
      );
    }
  let v = (P) => {
    let I = P === 2 || P === 3 ? 1.06 : 1,
      L = [
        [r - 0.03, 0, 0, e.waist[0] * 1.05 * I, e.waist[1] * 1.06 * I],
        [r + 0.05, 0, 0.002, e.waist[0] * 1.02 * I, e.waist[1] * 1.03 * I],
        [l, 0, 0.008, e.chest[0] * I, e.chest[1] * I],
        [
          a - 0.06,
          0,
          0,
          ((e.chest[0] + e.shX * 1.05) / 2) * I,
          e.chest[1] * 0.95 * I,
        ],
        [a - 0.015, 0, -0.008, e.shX * 1.02 * I, e.chest[1] * 0.85 * I],
        [a + 0.015, 0, -0.012, e.shX * 0.78, e.chest[1] * 0.68],
        [a + 0.035, 0, -0.012, e.shX * 0.45, e.chest[1] * 0.55],
        [c - 0.035, 0, -0.012, 0.06, 0.058],
        [c + 0.03, 0, -0.008, 0.05, 0.05],
      ];
    (s.piece(0, [0, o, 0], ["top", P], null, 0, b),
      s.loft(L, n.ring, (F, N) =>
        F > a + 0.01
          ? P === 3
            ? F < a + 0.03
              ? Ys.topacc
              : Ys.skin
            : P === 1 && F < a + 0.035
              ? Ys.topacc
              : Ys.skin
          : P === 0 && F > a - 0.02 && g(N, 0.6)
            ? Ys.skin
            : P === 2 && g(N, 0.985 - 0.06 * Zg(a - 0.2, a, F))
              ? Ys.shirt
              : (P === 3 && t === 0 && F < r + 0.12 && F > r && g(N, 0.82)) ||
                  (P === 1 && F < r)
                ? Ys.topacc
                : P === 2
                  ? Ys.jacket
                  : Ys.top,
      ),
      P === 2 &&
        t < 2 &&
        s.loft(
          [
            [a - 0.02, 0, -0.015, e.shX * 0.62, e.chest[1] * 0.78],
            [a + 0.03, 0, -0.022, 0.08, 0.068],
            [c + 0, 0, -0.03, 0.072, 0.062],
          ],
          n.ring,
          (F, N) => (g(N, 0.7) ? Ys.shirt : Ys.jacket),
        ),
      P === 3 &&
        t < 2 &&
        s.ell(
          0,
          a + 0.02,
          -e.chest[1] * 0.85,
          e.shX * 0.6,
          0.075,
          0.065,
          n.limb,
          5,
          Ys.top,
          { lat0: 0, lat1: Math.PI },
        ));
  };
  for (let P = 0; P < 4; P++) v(P);
  for (let [P, I] of [
    [1, 1],
    [2, -1],
  ]) {
    let L = I * e.legX,
      F = [L, o, 0],
      N = o - e.knee,
      B = (U) => Zg(e.knee + 0.035, e.knee - 0.035, U),
      H = e.knee,
      O = (U) => {
        let G = U ? 1.18 : 1;
        return [
          [0.075, L, 0, 0.036 * G * (U ? 1.25 : 1), 0.04 * G * (U ? 1.2 : 1)],
          [0.16, L, -0.004, e.calf * 0.75 * G, e.calf * 0.8 * G],
          [H - (H - 0.075) * 0.35, L, -0.012, e.calf * G, e.calf * 1.08 * G],
          [H - 0.03, L, -0.004, e.calf * 0.92 * G, e.calf * 0.95 * G],
          [H + 0.03, L, 0.004, e.thigh * 0.72 * G, e.thigh * 0.75 * G],
          [H + (o - H) * 0.5, L, 0.002, e.thigh * 0.92 * G, e.thigh * 0.95 * G],
          [o + 0.02, L * 0.9, 0, e.thigh * 1.15 * G, e.thigh * 1.12 * G],
        ];
      };
    (s.piece(P, F, ["bottom", 0], null, N, B),
      s.loft(
        O(!0),
        n.limb,
        (U, G) => (
          t === 0 && U > o - 0.13 && Math.abs(Math.sin(G)) * I > 0.97,
          Ys.bottom
        ),
        { capTop: !0 },
      ));
    let D = e.knee + (o - e.knee) * 0.42;
    (s.piece(P, F, ["bottom", 1], null, N, B),
      s.loft(
        O(!1).map((U) =>
          U[0] > D ? [U[0], U[1], U[2], U[3] * 1.2, U[4] * 1.2] : U,
        ),
        n.limb,
        (U) => (U > D ? Ys.bottom : Ys.skin),
        { capTop: !0 },
      ),
      s.piece(P, F, ["bottom", 2], null, N, B),
      s.loft(O(!1), n.limb, Ys.tights, { capTop: !0 }),
      s.piece(P, F, null, null, N, () => 1),
      s.ell(
        L,
        0.048,
        0.035 * (e.kid ? 0.8 : 1),
        0.047 * (e.kid ? 0.8 : 1),
        0.05,
        0.125 * (e.kid ? 0.75 : 1),
        n.limb,
        Math.max(3, n.hv / 2),
        (U, G, q) =>
          G < -0.026 || (t === 0 && q > 0.09 * (e.kid ? 0.75 : 1) && G < 0)
            ? Ys.sole
            : Ys.shoes,
      ));
  }
  for (let [P, I] of [
    [3, 1],
    [4, -1],
  ]) {
    let L = I * (e.shX + e.arm * 0.35),
      F = a - 0.03,
      N = [L, F, 0],
      B = F - e.ua,
      H = B - e.fa,
      O = (q) => Zg(B + 0.03, B - 0.03, q),
      D = (q) => [
        [H, L, 0, e.fore * 0.68 * q, e.fore * 0.75 * q],
        [B - e.fa * 0.4, L, -0.004, e.fore * 0.9 * q, e.fore * q],
        [B, L, -0.008, e.fore * q, e.fore * 1.05 * q],
        [B + e.ua * 0.45, L, -0.006, e.arm * 0.95 * q, e.arm * q],
        [F - 0.005, L - I * 0.004, -0.004, e.arm * 1.02 * q, e.arm * 1.06 * q],
        [F + 0.012, L - I * 0.014, -0.006, e.arm * 0.55 * q, e.arm * 0.7 * q],
      ];
    for (let q = 0; q < 4; q++) {
      let W = q === 2 || q === 3 ? 1.15 : q === 1 ? 1.06 : 1,
        V = q === 0 ? B + e.ua * 0.5 : H + 0.035;
      (s.piece(P, N, ["top", q], null, e.ua, O),
        s.loft(
          D(W).map((Y) =>
            q === 0 && Y[0] > V
              ? [Y[0], Y[1], Y[2], Y[3] * 1.25, Y[4] * 1.25]
              : Y,
          ),
          n.limb,
          (Y) =>
            Y < V
              ? Ys.skin
              : q > 0 && Y < V + 0.03
                ? q === 2
                  ? Ys.jacket
                  : Ys.topacc
                : q === 2
                  ? Ys.jacket
                  : Ys.top,
          { capTop: !0, capBottom: !0 },
        ));
    }
    let U = e.hand * 1.2,
      G = H - 0.06 * U;
    (s.piece(P, N, null, null, e.ua, () => 1),
      s.ell(
        L,
        G,
        0.006,
        0.026 * U,
        0.07 * U,
        0.044 * U,
        Math.max(6, n.limb),
        Math.max(3, n.hv / 2),
        Ys.skin,
      ),
      t < 2 &&
        s.ell(
          L - I * 0.006,
          G + 0.02 * U,
          0.04 * U,
          0.014 * U,
          0.032 * U,
          0.016 * U,
          6,
          4,
          Ys.skin,
          { rot: -0.5 },
        ),
      P === 4 &&
        t < 2 &&
        (s.piece(P, N, ["prop", 1], null, e.ua, () => 1),
        s.box(L - I * 0, G - 0.01, 0.045 * U, 0.036, 0.07, 0.006, Ys.phone)),
      P === 3 &&
        t < 2 &&
        (s.piece(P, N, ["bag", 3], null, e.ua, () => 1),
        s.box(L + I * 0.02, G - 0.2, 0, 0.05, 0.15, 0.16, Ys.bag),
        s.box(L + I * 0.02, G - 0.035, 0, 0.006, 0.03, 0.08, Ys.bagacc)));
  }
  if (t < 2) {
    s.piece(0, [0, o, 0], ["bag", 1], null, 0, () => 1);
    let P = -(e.chest[1] + 0.06);
    if (
      (s.loft(
        [
          [r, 0, P + 0.01, e.chest[0] * 0.72, 0.055],
          [r + 0.04, 0, P, e.chest[0] * 0.8, 0.07],
          [a - 0.08, 0, P, e.chest[0] * 0.8, 0.07],
          [a - 0.03, 0, P + 0.01, e.chest[0] * 0.65, 0.055],
        ],
        n.limb,
        (I, L) =>
          t === 0 && Math.cos(L) < -0.85 && I < r + 0.15 ? Ys.bagacc : Ys.bag,
        { capBottom: !0, capTop: !0 },
      ),
      t === 0)
    )
      for (let I of [-1, 1])
        s.loft(
          [
            [r + 0.04, I * e.chest[0] * 0.55, e.chest[1] * 0.9, 0.012, 0.01],
            [l, I * e.chest[0] * 0.6, e.chest[1] * 1.08, 0.012, 0.01],
            [a - 0.005, I * e.shX * 0.6, 0, 0.016, e.chest[1] * 0.9],
            [a - 0.04, I * e.shX * 0.6, P * 0.8, 0.014, 0.012],
          ],
          4,
          Ys.bagacc,
        );
    s.piece(0, [0, o, 0], ["bag", 2], null, 0, () => 1);
    {
      let I = [];
      for (let L = 8; L >= 0; L--) {
        let F = L / 8,
          N = a - 0.01 - F * (a - o - 0.06),
          B = -e.shX * 0.62 + F * (e.hipR[0] + e.shX * 0.62) * 0.95,
          H =
            (e.chest[1] + 0.012) * (0.92 + 0.12 * Math.sin(F * Math.PI)) -
            (e.chest[1] * 0.92 + 0.012) * 0.5 * (1 - Math.min(1, F * 6));
        I.push([N, B, H * 0.5 + (F < 0.17 ? 0 : H * 0.5), 0.028, 0.008]);
      }
      s.loft(I, 4, Ys.bagacc);
    }
    s.box(e.hipR[0] + 0.03, o - 0.02, 0, 0.03, 0.09, 0.12, Ys.bag);
  }
  let y = [0, c, -0.01];
  s.piece(5, y, null, null, 0, () => 1);
  let M = [],
    S = t === 0 ? 11 : t === 1 ? 7 : 5;
  for (let P = 0; P <= S; P++) {
    let I = P / S,
      L = -Math.PI / 2 + I * Math.PI,
      F = d + Math.sin(L) * f,
      N = Math.max(0.02, Math.cos(L)),
      B = 1 - 0.18 * Zg(0.45, 0, I);
    M.push([
      F,
      0,
      0.006 * (1 - I) + 0.004,
      h * N * B,
      u * N * (1 - 0.06 * Zg(0.4, 0, I)),
    ]);
  }
  if (
    ((M[0][3] = M[0][4] = 0.004),
    s.loft(
      M,
      n.head,
      (P, I) =>
        Math.cos(I) > 0.25 && P > p + 0.01 && P < d + f * 0.62
          ? Ys.face
          : Ys.skin,
      {
        capBottom: !0,
        capTop: !0,
        face: { w: h * 1.9, y0: p, y1: p + 2 * f * 0.83 },
      },
    ),
    s.loft(
      [
        [c - 0.06, 0, -0.012, 0.045, 0.045],
        [d - f * 0.5, 0, -0.012, 0.047, 0.046],
      ],
      Math.max(6, n.limb),
      Ys.skin,
    ),
    t < 2)
  ) {
    for (let I of [-1, 1])
      s.ell(
        I * h * 0.98,
        d - 0.005,
        -0.006,
        0.012,
        0.026,
        0.018,
        6,
        4,
        Ys.skin,
      );
    let P = u * 0.97;
    s.ell(0, d - f * 0.22, P + 0.002, 0.012, 0.016, 0.013, 6, 4, Ys.face);
  }
  let w = (P, I) => {
      let L = (I - d) / f,
        F = P / h;
      return u * Math.sqrt(Math.max(0, 1 - F * F - L * L)) + 0.005;
    },
    z = p + 2 * f * 0.83 * 0.56,
    _ = (P) => {
      s.piece(5, y, ["hair", P], null, 0, () => 1);
    },
    R = (P, I, L, { k: F = 1.07, jit: N = 0, cy: B = 0, sv: H = n.hv } = {}) =>
      s.ell(
        0,
        d + 0.008 + B,
        -0.004,
        h * F,
        f * (F - 0.01),
        u * F,
        n.head,
        H,
        Ys.hair,
        {
          jit: N,
          latAt: (O) => {
            let D = Math.cos(O),
              U = Math.max(0, D),
              G = Math.max(0, -D);
            return I + (P - I) * Math.pow(U, 1.5) + (L - I) * Math.pow(G, 0.8);
          },
        },
      );
  t < 2
    ? (_(1),
      R(0.95, 1.45, 2, { jit: t ? 0 : 0.02 }),
      _(2),
      R(0.95, 1.45, 2),
      s.ell(
        0.02,
        d + f * 0.72,
        u * 0.45,
        h * 0.75,
        0.04,
        u * 0.5,
        n.limb,
        4,
        Ys.hair,
        { rot: -0.35 },
      ),
      _(3),
      R(0.9, 1.95, 2.35),
      s.loft(
        [
          [c - 0.1, 0, -u * 0.55, h * 0.95, 0.03],
          [c + 0.02, 0, -u * 0.7, h * 1.02, 0.045],
          [d, 0, -u * 0.55, h * 1.04, u * 0.5],
        ],
        n.limb,
        Ys.hair,
        { capBottom: !0 },
      ),
      _(4),
      R(0.95, 1.5, 1.95),
      s.ell(0, d + f * 0.85, -u * 0.55, 0.045, 0.042, 0.045, 8, 5, Ys.hair),
      _(5),
      R(1, 1.5, 1.9, { k: 1.22, jit: t ? 0.04 : 0.09, cy: 0.012 }),
      _(6),
      R(0.85, 2.05, 2.15, { k: 1.09 }),
      _(7),
      R(0.95, 1.5, 1.95),
      s.ell(0, d - 0.02, -u * 1.05, 0.032, 0.09, 0.03, 8, 5, Ys.hair, {
        rot: 0.35,
      }))
    : (_(15), R(0.95, 1.5, 1.9));
  let T = (P) => s.piece(5, y, ["hat", P], null, 0, () => 1);
  if (t < 2) {
    (T(1),
      s.ell(
        0,
        d + 0.02,
        -0.004,
        h * 1.1,
        f * 0.98,
        u * 1.1,
        n.head,
        Math.max(4, n.hv / 2),
        (P, I) => (I > f * 0.9 ? Ys.hatacc : Ys.hat),
        { lat1: 1.45 },
      ),
      s.ell(
        0,
        d + f * 0.3,
        u * 0.98,
        h * 0.95,
        0.008,
        0.09,
        n.limb,
        3,
        Ys.hatacc,
        { rot: 0.12 },
      ),
      T(2),
      s.ell(
        0,
        d + 0.015,
        -0.004,
        h * 1.12,
        f * 1.02,
        u * 1.12,
        n.head,
        Math.max(4, n.hv / 2),
        (P, I) => (I < f * 0.15 ? Ys.hatacc : Ys.hat),
        { lat1: 1.6 },
      ),
      t === 0 && s.ell(0, d + f * 1.12, 0, 0.03, 0.03, 0.03, 8, 5, Ys.hatacc),
      T(3),
      s.ell(
        0,
        d + f * 0.38,
        -0.004,
        h * 2.2,
        0.012,
        u * 2.3,
        n.head,
        3,
        Ys.hat,
      ),
      s.ell(
        0,
        d + f * 0.35,
        -0.004,
        h * 1.08,
        f * 0.75,
        u * 1.08,
        n.head,
        Math.max(4, n.hv / 2),
        (P, I) => (I < 0.03 ? Ys.hatacc : Ys.hat),
        { lat1: 1.5 },
      ),
      T(4),
      s.loft([[d + f * 1.08, 0, 0, h * 0.15, 0.02]], 4, Ys.hat));
    for (let P = 0; P < 7; P++) {
      let I = -Math.PI / 2 + (Math.PI * P) / 6;
      s.box(
        Math.sin(I) * h * 1.12,
        d + Math.cos(I) * f * 1.08,
        0,
        0.01,
        0.01,
        0.018,
        Ys.hat,
      );
    }
    for (let P of [-1, 1])
      s.ell(P * h * 1.08, d, 0, 0.022, 0.04, 0.036, 8, 5, Ys.hatacc);
  }
  s.piece(5, y, ["glasses", 1], null, 0, () => 1);
  for (let P of [-1, 1]) {
    let I = P * h * 0.4;
    (s.ell(
      I,
      z,
      w(I, z) + 0.004,
      h * 0.33,
      0.024,
      0.006,
      t < 2 ? 10 : 6,
      4,
      Ys.lens,
    ),
      t < 2 &&
        s.box(
          P * h * 0.93,
          z + 0.008,
          w(h * 0.75, z) * 0.45,
          0.003,
          0.004,
          w(h * 0.75, z) * 0.55,
          Ys.glasses,
        ));
  }
  (s.box(0, z + 0.01, w(0, z) + 0.004, h * 0.12, 0.004, 0.004, Ys.glasses),
    s.piece(5, y, ["cloud", 1], null, 0, () => 1));
  let E = (P, I, L, F) =>
      s.ell(P, I, L, F, F * 0.85, F, t < 2 ? 10 : 6, t < 2 ? 6 : 4, Ys.cloud),
    A = m + 0.06;
  (E(0, A + 0.06, 0, 0.085),
    E(-0.08, A + 0.02, 0.01, 0.065),
    E(0.085, A + 0.025, -0.005, 0.068),
    t < 2 &&
      (E(0.01, A + 0.13, -0.01, 0.06),
      s.loft(
        [
          [m - 0.02, 0, 0, 0.025, 0.025],
          [A, 0, 0, 0.03, 0.03],
        ],
        6,
        Ys.cloud,
      )));
  let C = new De();
  return (
    C.setAttribute("position", new ze(s.p, 3)),
    C.setAttribute("normal", new ze(s.n, 3)),
    C.setAttribute("uv", new ze(s.uv, 2)),
    C.setAttribute("skinIndex", new Cr(s.j, 4)),
    C.setAttribute("skinWeight", new ze(s.w, 4)),
    C.setIndex(s.v > 65535 ? new w0(s.ix, 1) : new Cr(s.ix, 1)),
    (C.boundingSphere = new _n(new xt(0, 0.9, 0), 1.4)),
    (C.userData.vox = {
      build: e.name,
      lod: t,
      verts: s.v,
      tris: s.ix.length / 3,
      height: m,
      hip: e.hip,
    }),
    C
  );
}
