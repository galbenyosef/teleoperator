// app 76 — math
// Lines 70277-70858 of readable/app.pretty.js (statement-aligned).
function Zdt(o, t = 0) {
  let e = Z5[o],
    s = new mP();
  s.hip = e.hip;
  let n = [
      { ring: 16, limb: 10, head: 20, hv: 12 },
      { ring: 10, limb: 7, head: 12, hv: 8 },
      { ring: 6, limb: 4, head: 8, hv: 5 },
    ][t],
    i = e.hip,
    a = e.sh,
    r = i + (a - i) * 0.33,
    l = a - (a - i) * 0.3,
    c = e.neck,
    [h, f, u] = e.head.map((C) => C * 1.07),
    d = c + f * 0.92,
    p = d - f,
    m = d + f,
    g = (C, I = 0.8) => Math.cos(C) > I,
    b = (C) => Ub(r - 0.05, l, C),
    v = [
      [i - 0.075, 0, -0.012, e.hipR[0] * 0.8, e.hipR[1] * 0.62],
      [i - 0.045, 0, -0.012, e.hipR[0] * 0.93, e.hipR[1] * 0.78],
      [i + 0.01, 0, -0.01, e.hipR[0], e.hipR[1] * 0.95],
      [
        i + 0.07,
        0,
        -0.004,
        (e.hipR[0] + e.waist[0]) / 2,
        (e.hipR[1] + e.waist[1]) / 2,
      ],
      [r + 0.02, 0, 0, e.waist[0] * 1.02, e.waist[1] * 1.02],
    ];
  for (let C = 0; C < 3; C++)
    if (
      (s.piece(0, [0, i, 0], ["bottom", C], null, 0, b),
      s.loft(
        v,
        n.ring,
        (I, L) => (C < 2 && I > r - 0.035 && t < 2 ? en.belt : en.bottom),
        { capBottom: !0 },
      ),
      C === 2)
    ) {
      let I = i - (i - e.knee) * 0.75;
      s.loft(
        [
          [I, 0, 0.005, e.hipR[0] * 1.45, e.hipR[1] * 1.75],
          [I + 0.08, 0, 0.003, e.hipR[0] * 1.32, e.hipR[1] * 1.5],
          [i - 0.02, 0, -0.004, e.hipR[0] * 1.1, e.hipR[1] * 1.15],
          [i + 0.06, 0, -0.006, e.hipR[0] * 1.02, e.hipR[1] * 1.04],
          [r + 0.02, 0, 0, e.waist[0] * 1.05, e.waist[1] * 1.05],
        ],
        n.ring,
        en.bottom,
      );
    }
  let x = (C) => {
    let I = C === 2 || C === 3 ? 1.06 : 1,
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
    (s.piece(0, [0, i, 0], ["top", C], null, 0, b),
      s.loft(L, n.ring, (F, O) =>
        F > a + 0.01
          ? C === 3
            ? F < a + 0.03
              ? en.topacc
              : en.skin
            : C === 1 && F < a + 0.035
              ? en.topacc
              : en.skin
          : C === 0 && F > a - 0.02 && g(O, 0.6)
            ? en.skin
            : C === 2 && g(O, 0.985 - 0.06 * Ub(a - 0.2, a, F))
              ? en.shirt
              : (C === 3 && t === 0 && F < r + 0.12 && F > r && g(O, 0.82)) ||
                  (C === 1 && F < r)
                ? en.topacc
                : C === 2
                  ? en.jacket
                  : en.top,
      ),
      C === 2 &&
        t < 2 &&
        s.loft(
          [
            [a - 0.02, 0, -0.015, e.shX * 0.62, e.chest[1] * 0.78],
            [a + 0.03, 0, -0.022, 0.08, 0.068],
            [c + 0, 0, -0.03, 0.072, 0.062],
          ],
          n.ring,
          (F, O) => (g(O, 0.7) ? en.shirt : en.jacket),
        ),
      C === 3 &&
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
          en.top,
          { lat0: 0, lat1: Math.PI },
        ));
  };
  for (let C = 0; C < 4; C++) x(C);
  for (let [C, I] of [
    [1, 1],
    [2, -1],
  ]) {
    let L = I * e.legX,
      F = [L, i, 0],
      O = i - e.knee,
      B = (U) => Ub(e.knee + 0.035, e.knee - 0.035, U),
      H = e.knee,
      N = (U) => {
        let G = U ? 1.18 : 1;
        return [
          [0.075, L, 0, 0.036 * G * (U ? 1.25 : 1), 0.04 * G * (U ? 1.2 : 1)],
          [0.16, L, -0.004, e.calf * 0.75 * G, e.calf * 0.8 * G],
          [H - (H - 0.075) * 0.35, L, -0.012, e.calf * G, e.calf * 1.08 * G],
          [H - 0.03, L, -0.004, e.calf * 0.92 * G, e.calf * 0.95 * G],
          [H + 0.03, L, 0.004, e.thigh * 0.72 * G, e.thigh * 0.75 * G],
          [H + (i - H) * 0.5, L, 0.002, e.thigh * 0.92 * G, e.thigh * 0.95 * G],
          [i + 0.02, L * 0.9, 0, e.thigh * 1.15 * G, e.thigh * 1.12 * G],
        ];
      };
    (s.piece(C, F, ["bottom", 0], null, O, B),
      s.loft(
        N(!0),
        n.limb,
        (U, G) => (
          t === 0 && U > i - 0.13 && Math.abs(Math.sin(G)) * I > 0.97,
          en.bottom
        ),
        { capTop: !0 },
      ));
    let D = e.knee + (i - e.knee) * 0.42;
    (s.piece(C, F, ["bottom", 1], null, O, B),
      s.loft(
        N(!1).map((U) =>
          U[0] > D ? [U[0], U[1], U[2], U[3] * 1.2, U[4] * 1.2] : U,
        ),
        n.limb,
        (U) => (U > D ? en.bottom : en.skin),
        { capTop: !0 },
      ),
      s.piece(C, F, ["bottom", 2], null, O, B),
      s.loft(N(!1), n.limb, en.tights, { capTop: !0 }),
      s.piece(C, F, null, null, O, () => 1),
      s.ell(
        L,
        0.048,
        0.035 * (e.kid ? 0.8 : 1),
        0.047 * (e.kid ? 0.8 : 1),
        0.05,
        0.125 * (e.kid ? 0.75 : 1),
        n.limb,
        Math.max(3, n.hv / 2),
        (U, G, W) =>
          G < -0.026 || (t === 0 && W > 0.09 * (e.kid ? 0.75 : 1) && G < 0)
            ? en.sole
            : en.shoes,
      ));
  }
  for (let [C, I] of [
    [3, 1],
    [4, -1],
  ]) {
    let L = I * (e.shX + e.arm * 0.35),
      F = a - 0.03,
      O = [L, F, 0],
      B = F - e.ua,
      H = B - e.fa,
      N = (W) => Ub(B + 0.03, B - 0.03, W),
      D = (W) => [
        [H, L, 0, e.fore * 0.68 * W, e.fore * 0.75 * W],
        [B - e.fa * 0.4, L, -0.004, e.fore * 0.9 * W, e.fore * W],
        [B, L, -0.008, e.fore * W, e.fore * 1.05 * W],
        [B + e.ua * 0.45, L, -0.006, e.arm * 0.95 * W, e.arm * W],
        [F - 0.005, L - I * 0.004, -0.004, e.arm * 1.02 * W, e.arm * 1.06 * W],
        [F + 0.012, L - I * 0.014, -0.006, e.arm * 0.55 * W, e.arm * 0.7 * W],
      ];
    for (let W = 0; W < 4; W++) {
      let V = W === 2 || W === 3 ? 1.15 : W === 1 ? 1.06 : 1,
        $ = W === 0 ? B + e.ua * 0.5 : H + 0.035;
      (s.piece(C, O, ["top", W], null, e.ua, N),
        s.loft(
          D(V).map((J) =>
            W === 0 && J[0] > $
              ? [J[0], J[1], J[2], J[3] * 1.25, J[4] * 1.25]
              : J,
          ),
          n.limb,
          (J) =>
            J < $
              ? en.skin
              : W > 0 && J < $ + 0.03
                ? W === 2
                  ? en.jacket
                  : en.topacc
                : W === 2
                  ? en.jacket
                  : en.top,
          { capTop: !0, capBottom: !0 },
        ));
    }
    let U = e.hand * 1.2,
      G = H - 0.06 * U;
    (s.piece(C, O, null, null, e.ua, () => 1),
      s.ell(
        L,
        G,
        0.006,
        0.026 * U,
        0.07 * U,
        0.044 * U,
        Math.max(6, n.limb),
        Math.max(3, n.hv / 2),
        en.skin,
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
          en.skin,
          { rot: -0.5 },
        ),
      C === 4 &&
        t < 2 &&
        (s.piece(C, O, ["prop", 1], null, e.ua, () => 1),
        s.box(L - I * 0, G - 0.01, 0.045 * U, 0.036, 0.07, 0.006, en.phone)),
      C === 3 &&
        t < 2 &&
        (s.piece(C, O, ["bag", 3], null, e.ua, () => 1),
        s.box(L + I * 0.02, G - 0.2, 0, 0.05, 0.15, 0.16, en.bag),
        s.box(L + I * 0.02, G - 0.035, 0, 0.006, 0.03, 0.08, en.bagacc)));
  }
  if (t < 2) {
    s.piece(0, [0, i, 0], ["bag", 1], null, 0, () => 1);
    let C = -(e.chest[1] + 0.06);
    if (
      (s.loft(
        [
          [r, 0, C + 0.01, e.chest[0] * 0.72, 0.055],
          [r + 0.04, 0, C, e.chest[0] * 0.8, 0.07],
          [a - 0.08, 0, C, e.chest[0] * 0.8, 0.07],
          [a - 0.03, 0, C + 0.01, e.chest[0] * 0.65, 0.055],
        ],
        n.limb,
        (I, L) =>
          t === 0 && Math.cos(L) < -0.85 && I < r + 0.15 ? en.bagacc : en.bag,
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
            [a - 0.04, I * e.shX * 0.6, C * 0.8, 0.014, 0.012],
          ],
          4,
          en.bagacc,
        );
    s.piece(0, [0, i, 0], ["bag", 2], null, 0, () => 1);
    {
      let I = [];
      for (let L = 8; L >= 0; L--) {
        let F = L / 8,
          O = a - 0.01 - F * (a - i - 0.06),
          B = -e.shX * 0.62 + F * (e.hipR[0] + e.shX * 0.62) * 0.95,
          H =
            (e.chest[1] + 0.012) * (0.92 + 0.12 * Math.sin(F * Math.PI)) -
            (e.chest[1] * 0.92 + 0.012) * 0.5 * (1 - Math.min(1, F * 6));
        I.push([O, B, H * 0.5 + (F < 0.17 ? 0 : H * 0.5), 0.028, 0.008]);
      }
      s.loft(I, 4, en.bagacc);
    }
    s.box(e.hipR[0] + 0.03, i - 0.02, 0, 0.03, 0.09, 0.12, en.bag);
  }
  let y = [0, c, -0.01];
  s.piece(5, y, null, null, 0, () => 1);
  let M = [],
    S = t === 0 ? 11 : t === 1 ? 7 : 5;
  for (let C = 0; C <= S; C++) {
    let I = C / S,
      L = -Math.PI / 2 + I * Math.PI,
      F = d + Math.sin(L) * f,
      O = Math.max(0.02, Math.cos(L)),
      B = 1 - 0.18 * Ub(0.45, 0, I);
    M.push([
      F,
      0,
      0.006 * (1 - I) + 0.004,
      h * O * B,
      u * O * (1 - 0.06 * Ub(0.4, 0, I)),
    ]);
  }
  if (
    ((M[0][3] = M[0][4] = 0.004),
    s.loft(
      M,
      n.head,
      (C, I) =>
        Math.cos(I) > 0.25 && C > p + 0.01 && C < d + f * 0.62
          ? en.face
          : en.skin,
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
      en.skin,
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
        en.skin,
      );
    let C = u * 0.97;
    s.ell(0, d - f * 0.22, C + 0.002, 0.012, 0.016, 0.013, 6, 4, en.face);
  }
  let w = (C, I) => {
      let L = (I - d) / f,
        F = C / h;
      return u * Math.sqrt(Math.max(0, 1 - F * F - L * L)) + 0.005;
    },
    _ = p + 2 * f * 0.83 * 0.56,
    z = (C) => {
      s.piece(5, y, ["hair", C], null, 0, () => 1);
    },
    A = (C, I, L, { k: F = 1.07, jit: O = 0, cy: B = 0, sv: H = n.hv } = {}) =>
      s.ell(
        0,
        d + 0.008 + B,
        -0.004,
        h * F,
        f * (F - 0.01),
        u * F,
        n.head,
        H,
        en.hair,
        {
          jit: O,
          latAt: (N) => {
            let D = Math.cos(N),
              U = Math.max(0, D),
              G = Math.max(0, -D);
            return I + (C - I) * Math.pow(U, 1.5) + (L - I) * Math.pow(G, 0.8);
          },
        },
      );
  t < 2
    ? (z(1),
      A(0.95, 1.45, 2, { jit: t ? 0 : 0.02 }),
      z(2),
      A(0.95, 1.45, 2),
      s.ell(
        0.02,
        d + f * 0.72,
        u * 0.45,
        h * 0.75,
        0.04,
        u * 0.5,
        n.limb,
        4,
        en.hair,
        { rot: -0.35 },
      ),
      z(3),
      A(0.9, 1.95, 2.35),
      s.loft(
        [
          [c - 0.1, 0, -u * 0.55, h * 0.95, 0.03],
          [c + 0.02, 0, -u * 0.7, h * 1.02, 0.045],
          [d, 0, -u * 0.55, h * 1.04, u * 0.5],
        ],
        n.limb,
        en.hair,
        { capBottom: !0 },
      ),
      z(4),
      A(0.95, 1.5, 1.95),
      s.ell(0, d + f * 0.85, -u * 0.55, 0.045, 0.042, 0.045, 8, 5, en.hair),
      z(5),
      A(1, 1.5, 1.9, { k: 1.22, jit: t ? 0.04 : 0.09, cy: 0.012 }),
      z(6),
      A(0.85, 2.05, 2.15, { k: 1.09 }),
      z(7),
      A(0.95, 1.5, 1.95),
      s.ell(0, d - 0.02, -u * 1.05, 0.032, 0.09, 0.03, 8, 5, en.hair, {
        rot: 0.35,
      }))
    : (z(15), A(0.95, 1.5, 1.9));
  let T = (C) => s.piece(5, y, ["hat", C], null, 0, () => 1);
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
        (C, I) => (I > f * 0.9 ? en.hatacc : en.hat),
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
        en.hatacc,
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
        (C, I) => (I < f * 0.15 ? en.hatacc : en.hat),
        { lat1: 1.6 },
      ),
      t === 0 && s.ell(0, d + f * 1.12, 0, 0.03, 0.03, 0.03, 8, 5, en.hatacc),
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
        en.hat,
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
        (C, I) => (I < 0.03 ? en.hatacc : en.hat),
        { lat1: 1.5 },
      ),
      T(4),
      s.loft([[d + f * 1.08, 0, 0, h * 0.15, 0.02]], 4, en.hat));
    for (let C = 0; C < 7; C++) {
      let I = -Math.PI / 2 + (Math.PI * C) / 6;
      s.box(
        Math.sin(I) * h * 1.12,
        d + Math.cos(I) * f * 1.08,
        0,
        0.01,
        0.01,
        0.018,
        en.hat,
      );
    }
    for (let C of [-1, 1])
      s.ell(C * h * 1.08, d, 0, 0.022, 0.04, 0.036, 8, 5, en.hatacc);
  }
  s.piece(5, y, ["glasses", 1], null, 0, () => 1);
  for (let C of [-1, 1]) {
    let I = C * h * 0.4;
    (s.ell(
      I,
      _,
      w(I, _) + 0.004,
      h * 0.33,
      0.024,
      0.006,
      t < 2 ? 10 : 6,
      4,
      en.lens,
    ),
      t < 2 &&
        s.box(
          C * h * 0.93,
          _ + 0.008,
          w(h * 0.75, _) * 0.45,
          0.003,
          0.004,
          w(h * 0.75, _) * 0.55,
          en.glasses,
        ));
  }
  (s.box(0, _ + 0.01, w(0, _) + 0.004, h * 0.12, 0.004, 0.004, en.glasses),
    s.piece(5, y, ["cloud", 1], null, 0, () => 1));
  let E = (C, I, L, F) =>
      s.ell(C, I, L, F, F * 0.85, F, t < 2 ? 10 : 6, t < 2 ? 6 : 4, en.cloud),
    R = m + 0.06;
  (E(0, R + 0.06, 0, 0.085),
    E(-0.08, R + 0.02, 0.01, 0.065),
    E(0.085, R + 0.025, -0.005, 0.068),
    t < 2 &&
      (E(0.01, R + 0.13, -0.01, 0.06),
      s.loft(
        [
          [m - 0.02, 0, 0, 0.025, 0.025],
          [R, 0, 0, 0.03, 0.03],
        ],
        6,
        en.cloud,
      )));
  let P = new Le();
  return (
    P.setAttribute("position", new Re(s.p, 3)),
    P.setAttribute("normal", new Re(s.n, 3)),
    P.setAttribute("uv", new Re(s.uv, 2)),
    P.setAttribute("skinIndex", new Yr(s.j, 4)),
    P.setAttribute("skinWeight", new Re(s.w, 4)),
    P.setIndex(s.v > 65535 ? new j0(s.ix, 1) : new Yr(s.ix, 1)),
    (P.boundingSphere = new _n(new dt(0, 0.9, 0), 1.4)),
    (P.userData.vox = {
      build: e.name,
      lod: t,
      verts: s.v,
      tris: s.ix.length / 3,
      height: m,
      hip: e.hip,
    }),
    P
  );
}
