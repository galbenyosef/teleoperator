// app 127 — math
// Lines 87427-87785 of readable/app.pretty.js (statement-aligned).
function iC(o, t) {
  let e = Hi(8, 5),
    s = Wa(8, 5),
    n = new Be(),
    i = (e.x0 + e.x1) / 2,
    a = e.z1 - 6,
    r = a - 50,
    l = 16,
    c = 8,
    h = 7.6,
    f = Math.max($t(i - l, a), $t(i + l, a), $t(i - l, r), $t(i + l, r)),
    u = Math.min($t(i - l, a), $t(i + l, a), $t(i - l, r), $t(i + l, r)),
    d = f + Ze + 0.4,
    p = zl(we.stucco, 0.95, 0.94, 60),
    m = zl(we.stucco, 0.88, 0.87, 20),
    g = Tn(ln.GLASS, we.stainedglass, 0.9),
    b = Lt(Ct.glass, 0.03, 0.03, 0.035),
    v = 21,
    x = 29;
  Ss(
    n,
    [
      [i - l + 0.5, r],
      [i + l - 0.5, r],
      [i + l - 0.5, a - h],
      [i - l + 0.5, a - h],
    ],
    u - 1,
    d + v,
    p,
    { vBase: d },
  );
  for (let y of [-1, 1]) {
    let M = i + y * (l - 0.5);
    oe(
      n,
      [
        [M, d + v, r],
        [M, d + v, a - h],
        [i, d + x, a - h],
        [i, d + x, r],
      ],
      We(we.slate, 0.8),
      [y, 1, 0],
      (S) => [S[2], Math.abs(S[0] - i) * 1.2 + S[1] * 0.3],
    );
    for (let S = 0; S < 6; S++) {
      let w = r + 5 + (S * (a - h - 3 - (r + 5))) / 5;
      (tx(n, M + y * 0.09, w, 0, y, y, 0, d + 5, 2.4, d + 13, g),
        ss(
          n,
          y < 0 ? M - 0.6 : M - 0.15,
          u - 1,
          w + 3.2,
          y < 0 ? M + 0.15 : M + 0.6,
          d + v,
          w + 4.2,
          p,
        ));
    }
    ss(
      n,
      y < 0 ? M - 0.5 : M,
      d + v - 0.8,
      r,
      y < 0 ? M : M + 0.5,
      d + v + 0.06,
      a - h,
      m,
    );
  }
  (oe(
    n,
    [
      [i - l + 0.5, d + v, r],
      [i + l - 0.5, d + v, r],
      [i, d + x, r],
    ],
    p,
    [0, 0, -1],
  ),
    qe(
      n,
      i,
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
      i - c,
      y - 0.6,
      i + c,
      y - 0.6,
      u - 1,
      u - 1,
      d + M,
      d + M,
      p,
      0,
      d,
    ),
      oe(
        n,
        [
          [i - c, d, y + 0.02],
          [i + c, d, y + 0.02],
          [i + c, d + M, y + 0.02],
          [i - c, d + M, y + 0.02],
        ],
        Tn(ln.ELEV, Jb.sspp, 1),
        [0, 0, 1],
        (A) => [(A[0] - i + c) / (2 * c), (A[1] - d) / M],
      ));
    for (let A of [-1, 1])
      ss(
        n,
        A < 0 ? i - c - 0.3 : i + c - 0.3,
        u - 1,
        y - 0.6,
        A < 0 ? i - c + 0.3 : i + c + 0.3,
        d + M,
        y + 0.18,
        p,
      );
    (ss(
      n,
      i - c - 0.2,
      d + M - 0.3,
      y - 0.6,
      i + c + 0.2,
      d + M + 0.4,
      y + 0.35,
      p,
    ),
      oe(
        n,
        [
          [i - c, d + M + 0.4, y - 0.3],
          [i + c, d + M + 0.4, y - 0.3],
          [i, d + M + 6.5, y - 0.3],
        ],
        p,
        [0, 0, 1],
      ),
      Ce(
        n,
        [i, d + M + 6.5, y - 0.3],
        [i, d + M + 9, y - 0.3],
        0.1,
        Lt(Ct.gold, 0.85, 0.65, 0.25),
        4,
      ),
      Ce(
        n,
        [i - 0.7, d + M + 8.2, y - 0.3],
        [i + 0.7, d + M + 8.2, y - 0.3],
        0.09,
        Lt(Ct.gold, 0.85, 0.65, 0.25),
        4,
      ));
    for (let A of [-1, 1]) {
      let T = A < 0 ? i - c - h : i + c,
        E = T + h,
        R = (T + E) / 2,
        P = y - h,
        C = y + 0.3,
        I = 31;
      Ss(
        n,
        [
          [T, P],
          [E, P],
          [E, C],
          [T, C],
        ],
        u - 1,
        d + I,
        p,
        { vBase: d },
      );
      for (let D of [T, E])
        ss(n, D - 0.45, u - 1.1, C - 0.1, D + 0.45, d + I - 0.1, C + 0.5, p);
      for (let D of [d + 9.5, d + 20, d + I - 0.6])
        ss(n, T - 0.62, D, P - 0.4, E + 0.62, D + 0.6, C + 0.6, m);
      (tx(n, R, C + 0.51, 1, 0, 0, 1, d + 12, 1.8, d + 17, g),
        tx(
          n,
          R,
          C + 0.51,
          1,
          0,
          0,
          1,
          d + 0,
          2.2,
          d + 5,
          Lt(Ct.matte, 0.2, 0.12, 0.07),
        ),
        tx(n, R, C + 0.51, 1, 0, 0, 1, d + 23, 1.4, d + 27, g));
      let L = d + I;
      Ss(
        n,
        [
          [T + 0.4, P + 0.4],
          [E - 0.4, P + 0.4],
          [E - 0.4, C - 0.4],
          [T + 0.4, C - 0.4],
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
        let G = R + D * (h / 2 - 0.31),
          W = (P + C) / 2 + U * (h / 2 - 0.31);
        for (let V of [-2.2, 0, 2.2])
          tx(n, G + -U * V, W + D * V, -U, D, D, U, L + 1.2, 1.4, L + 5.6, b);
      }
      ss(n, T - 0.1, L + 8, P - 0.1, E + 0.1, L + 8.8, C + 0.1, m);
      for (let [D, U] of [
        [T + 0.4, P + 0.4],
        [E - 0.4, P + 0.4],
        [T + 0.4, C - 0.4],
        [E - 0.4, C - 0.4],
      ])
        qe(
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
        O = h / 2 - 1.1,
        B = (P + C) / 2;
      qe(
        n,
        R,
        B,
        [
          [O, F],
          [O, F + 6.2],
          [O + 0.3, F + 6.4],
          [O + 0.3, F + 6.9],
          [O - 0.2, F + 7],
        ],
        8,
        p,
        { flat: !0 },
      );
      for (let D = 0; D < 8; D++) {
        let U = (-(D + 0.5) / 8) * Math.PI * 2,
          G = Math.cos(U),
          W = Math.sin(U),
          V = O * Math.cos(Math.PI / 8) + 0.09;
        tx(n, R + G * V, B + W * V, -W, G, G, W, F + 1.2, 1, F + 4.4, b);
      }
      qe(
        n,
        R,
        B,
        [
          [O - 0.2, F + 7],
          [0.15, d + 57],
        ],
        8,
        p,
        { flat: !0 },
      );
      let H = d + 57,
        N = Lt(Ct.gold, 0.85, 0.65, 0.25);
      (Ce(n, [R, H, B], [R, H + 2.8, B], 0.09, N, 4),
        Ce(n, [R - 0.8, H + 2, B], [R + 0.8, H + 2, B], 0.08, N, 4),
        ss(
          n,
          R - 0.25,
          H + 2.8,
          B - 0.25,
          R + 0.25,
          H + 3.2,
          B + 0.25,
          wn(1, 0.05, 0.02),
        ));
    }
    let S = y + 0.3,
      w = Math.max(3, Math.ceil((d - ($t(i, e.z1) + Ze)) / 0.17)),
      _ = e.z1 - S,
      z = (d - $t(i, e.z1) - Ze) / w;
    for (let A = 0; A < w; A++)
      ss(
        n,
        i - l - 1,
        u - 1,
        S + (_ * A) / w,
        i + l + 1,
        d - z * A,
        S + (_ * (A + 1)) / w,
        We(we.granite, 0.95),
      );
  }
  for (let [y, M, S] of [
    [e.x0, i - l - 3, 15.5],
    [i + l + 3, e.x1, 12.5],
  ]) {
    let w = e.z0,
      _ = e.z1 - 1.5,
      z = Math.max($t(y, _), $t(M, _)) + Ze,
      A = Math.min($t(y, w), $t(M, w), $t(y, _), $t(M, _)) - 1;
    (Ss(
      n,
      [
        [y, w],
        [M, w],
        [M, _],
        [y, _],
      ],
      A,
      z + S,
      Tn(ln.WIN, we.stucco, 0.93, 0.9, 0.84),
      { vBase: z },
    ),
      n.quad(
        [y, z + S, _],
        [M, z + S, _],
        [M, z + S, w],
        [y, z + S, w],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        Lt(Ct.stone, 0.3, 0.3, 0.29),
        [0, 1, 0],
      ),
      ss(n, y - 0.3, z + S, w - 0.3, M + 0.3, z + S + 0.8, _ + 0.3, m));
  }
  (o.colliders.push({ t: "box", x0: e.x0, z0: e.z0, x1: e.x1, z1: e.z1 }),
    xf(o, s),
    vn(o.group, n, t.lm, "SaintsPeterPaul"));
}
