// app 128 — math
// Lines 87159-87517 of readable/app.pretty.js (statement-aligned).
function E7(i, t) {
  let e = Ei(8, 5),
    s = Ca(8, 5),
    n = new Ce(),
    o = (e.x0 + e.x1) / 2,
    a = e.z1 - 6,
    r = a - 50,
    l = 16,
    c = 8,
    h = 7.6,
    f = Math.max(Yt(o - l, a), Yt(o + l, a), Yt(o - l, r), Yt(o + l, r)),
    u = Math.min(Yt(o - l, a), Yt(o + l, a), Yt(o - l, r), Yt(o + l, r)),
    d = f + Ke + 0.4,
    p = nl(be.stucco, 0.95, 0.94, 60),
    m = nl(be.stucco, 0.88, 0.87, 20),
    g = yn(sn.GLASS, be.stainedglass, 0.9),
    b = It(Lt.glass, 0.03, 0.03, 0.035),
    x = 21,
    v = 29;
  ys(
    n,
    [
      [o - l + 0.5, r],
      [o + l - 0.5, r],
      [o + l - 0.5, a - h],
      [o - l + 0.5, a - h],
    ],
    u - 1,
    d + x,
    p,
    { vBase: d },
  );
  for (let y of [-1, 1]) {
    let M = o + y * (l - 0.5);
    ne(
      n,
      [
        [M, d + x, r],
        [M, d + x, a - h],
        [o, d + v, a - h],
        [o, d + v, r],
      ],
      Be(be.slate, 0.8),
      [y, 1, 0],
      (S) => [S[2], Math.abs(S[0] - o) * 1.2 + S[1] * 0.3],
    );
    for (let S = 0; S < 6; S++) {
      let w = r + 5 + (S * (a - h - 3 - (r + 5))) / 5;
      (pb(n, M + y * 0.09, w, 0, y, y, 0, d + 5, 2.4, d + 13, g),
        Ze(
          n,
          y < 0 ? M - 0.6 : M - 0.15,
          u - 1,
          w + 3.2,
          y < 0 ? M + 0.15 : M + 0.6,
          d + x,
          w + 4.2,
          p,
        ));
    }
    Ze(
      n,
      y < 0 ? M - 0.5 : M,
      d + x - 0.8,
      r,
      y < 0 ? M : M + 0.5,
      d + x + 0.06,
      a - h,
      m,
    );
  }
  (ne(
    n,
    [
      [o - l + 0.5, d + x, r],
      [o + l - 0.5, d + x, r],
      [o, d + v, r],
    ],
    p,
    [0, 0, -1],
  ),
    Oe(
      n,
      o,
      r,
      [
        [9, u - 1],
        [9, d + 16],
        [0.01, d + 22],
      ],
      16,
      p,
    ));
  {
    let y = a,
      M = 20;
    (n.wall(
      o - c,
      y - 0.6,
      o + c,
      y - 0.6,
      u - 1,
      u - 1,
      d + M,
      d + M,
      p,
      0,
      d,
    ),
      ne(
        n,
        [
          [o - c, d, y + 0.02],
          [o + c, d, y + 0.02],
          [o + c, d + M, y + 0.02],
          [o - c, d + M, y + 0.02],
        ],
        yn(sn.ELEV, cb.sspp, 1),
        [0, 0, 1],
        (R) => [(R[0] - o + c) / (2 * c), (R[1] - d) / M],
      ));
    for (let R of [-1, 1])
      Ze(
        n,
        R < 0 ? o - c - 0.3 : o + c - 0.3,
        u - 1,
        y - 0.6,
        R < 0 ? o - c + 0.3 : o + c + 0.3,
        d + M,
        y + 0.18,
        p,
      );
    (Ze(
      n,
      o - c - 0.2,
      d + M - 0.3,
      y - 0.6,
      o + c + 0.2,
      d + M + 0.4,
      y + 0.35,
      p,
    ),
      ne(
        n,
        [
          [o - c, d + M + 0.4, y - 0.3],
          [o + c, d + M + 0.4, y - 0.3],
          [o, d + M + 6.5, y - 0.3],
        ],
        p,
        [0, 0, 1],
      ),
      Ae(
        n,
        [o, d + M + 6.5, y - 0.3],
        [o, d + M + 9, y - 0.3],
        0.1,
        It(Lt.gold, 0.85, 0.65, 0.25),
        4,
      ),
      Ae(
        n,
        [o - 0.7, d + M + 8.2, y - 0.3],
        [o + 0.7, d + M + 8.2, y - 0.3],
        0.09,
        It(Lt.gold, 0.85, 0.65, 0.25),
        4,
      ));
    for (let R of [-1, 1]) {
      let T = R < 0 ? o - c - h : o + c,
        E = T + h,
        A = (T + E) / 2,
        C = y - h,
        P = y + 0.3,
        I = 31;
      ys(
        n,
        [
          [T, C],
          [E, C],
          [E, P],
          [T, P],
        ],
        u - 1,
        d + I,
        p,
        { vBase: d },
      );
      for (let D of [T, E])
        Ze(n, D - 0.45, u - 1.1, P - 0.1, D + 0.45, d + I - 0.1, P + 0.5, p);
      for (let D of [d + 9.5, d + 20, d + I - 0.6])
        Ze(n, T - 0.62, D, C - 0.4, E + 0.62, D + 0.6, P + 0.6, m);
      (pb(n, A, P + 0.51, 1, 0, 0, 1, d + 12, 1.8, d + 17, g),
        pb(
          n,
          A,
          P + 0.51,
          1,
          0,
          0,
          1,
          d + 0,
          2.2,
          d + 5,
          It(Lt.matte, 0.2, 0.12, 0.07),
        ),
        pb(n, A, P + 0.51, 1, 0, 0, 1, d + 23, 1.4, d + 27, g));
      let L = d + I;
      ys(
        n,
        [
          [T + 0.4, C + 0.4],
          [E - 0.4, C + 0.4],
          [E - 0.4, P - 0.4],
          [T + 0.4, P - 0.4],
        ],
        L,
        L + 8,
        p,
        { vBase: L },
      );
      for (let [D, U] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        let G = A + D * (h / 2 - 0.31),
          q = (C + P) / 2 + U * (h / 2 - 0.31);
        for (let W of [-2.2, 0, 2.2])
          pb(n, G + -U * W, q + D * W, -U, D, D, U, L + 1.2, 1.4, L + 5.6, b);
      }
      Ze(n, T - 0.1, L + 8, C - 0.1, E + 0.1, L + 8.8, P + 0.1, m);
      for (let [D, U] of [
        [T + 0.4, C + 0.4],
        [E - 0.4, C + 0.4],
        [T + 0.4, P - 0.4],
        [E - 0.4, P - 0.4],
      ])
        Oe(
          n,
          D,
          U,
          [
            [0.5, L + 8.8],
            [0.5, L + 10.2],
            [0.02, L + 13],
          ],
          4,
          p,
          { flat: !0 },
        );
      let F = L + 8.8,
        N = h / 2 - 1.1,
        B = (C + P) / 2;
      Oe(
        n,
        A,
        B,
        [
          [N, F],
          [N, F + 6.2],
          [N + 0.3, F + 6.4],
          [N + 0.3, F + 6.9],
          [N - 0.2, F + 7],
        ],
        8,
        p,
        { flat: !0 },
      );
      for (let D = 0; D < 8; D++) {
        let U = (-(D + 0.5) / 8) * Math.PI * 2,
          G = Math.cos(U),
          q = Math.sin(U),
          W = N * Math.cos(Math.PI / 8) + 0.09;
        pb(n, A + G * W, B + q * W, -q, G, G, q, F + 1.2, 1, F + 4.4, b);
      }
      Oe(
        n,
        A,
        B,
        [
          [N - 0.2, F + 7],
          [0.15, d + 57],
        ],
        8,
        p,
        { flat: !0 },
      );
      let H = d + 57,
        O = It(Lt.gold, 0.85, 0.65, 0.25);
      (Ae(n, [A, H, B], [A, H + 2.8, B], 0.09, O, 4),
        Ae(n, [A - 0.8, H + 2, B], [A + 0.8, H + 2, B], 0.08, O, 4),
        Ze(
          n,
          A - 0.25,
          H + 2.8,
          B - 0.25,
          A + 0.25,
          H + 3.2,
          B + 0.25,
          bn(1, 0.05, 0.02),
        ));
    }
    let S = y + 0.3,
      w = Math.max(3, Math.ceil((d - (Yt(o, e.z1) + Ke)) / 0.17)),
      z = e.z1 - S,
      _ = (d - Yt(o, e.z1) - Ke) / w;
    for (let R = 0; R < w; R++)
      Ze(
        n,
        o - l - 1,
        u - 1,
        S + (z * R) / w,
        o + l + 1,
        d - _ * R,
        S + (z * (R + 1)) / w,
        Be(be.granite, 0.95),
      );
  }
  for (let [y, M, S] of [
    [e.x0, o - l - 3, 15.5],
    [o + l + 3, e.x1, 12.5],
  ]) {
    let w = e.z0,
      z = e.z1 - 1.5,
      _ = Math.max(Yt(y, z), Yt(M, z)) + Ke,
      R = Math.min(Yt(y, w), Yt(M, w), Yt(y, z), Yt(M, z)) - 1;
    (ys(
      n,
      [
        [y, w],
        [M, w],
        [M, z],
        [y, z],
      ],
      R,
      _ + S,
      yn(sn.WIN, be.stucco, 0.93, 0.9, 0.84),
      { vBase: _ },
    ),
      n.quad(
        [y, _ + S, z],
        [M, _ + S, z],
        [M, _ + S, w],
        [y, _ + S, w],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        It(Lt.stone, 0.3, 0.3, 0.29),
        [0, 1, 0],
      ),
      Ze(n, y - 0.3, _ + S, w - 0.3, M + 0.3, _ + S + 0.8, z + 0.3, m));
  }
  (i.colliders.push({ t: "box", x0: e.x0, z0: e.z0, x1: e.x1, z1: e.z1 }),
    Gh(i, s),
    gn(i.group, n, t.lm, "SaintsPeterPaul"));
}
