// app 15 — solid
// Lines 40648-41238 of readable/app.pretty.js (statement-aligned).
function iS({ B: i, A: t, colliders: e }) {
  let s = i.R("ferry"),
    { x0: n, x1: o, z0: a, z1: r, zc: l } = Ki,
    c = 2.9,
    h = 21,
    f = [0.64, 0.6, 0.52],
    u = At(f, Tt.stone),
    d = T0(u),
    p = At([0.5, 0.47, 0.41], Tt.stone),
    m = At([0.2, 0.24, 0.22], Tt.copper),
    g = At([0.1, 0.12, 0.13], Tt.glass),
    b = At([0.03, 0.03, 0.03], Tt.paint),
    x = T0(Ha("ferry_arcade")),
    v = Ha("ferry_rear"),
    y = o + 26;
  (Ms(
    s.solid,
    n - 0.2,
    1.2,
    a - 8,
    y,
    3,
    r + 8,
    At([0.42, 0.41, 0.38], Tt.conc),
    { bottom: !0 },
  ),
    uG(
      s.solid,
      n + 2,
      a - 6,
      y - 1,
      r + 6,
      6,
      1.2,
      At([0.3, 0.28, 0.25], Tt.pile),
      { r: 0.35, edgeOnly: !0 },
    ));
  let M = 16,
    S = 20,
    w = a + M,
    z = l - S / 2,
    _ = l + S / 2,
    R = r - M;
  (s.atlas.wall(n, w, n, z, c, c, h, h, x, 0, c),
    s.atlas.wall(n, _, n, R, c, c, h, h, x, 0, c));
  let T = (Q, j, X, K) => {
    let nt = n - 1.2;
    (s.atlas.wall(nt, Q, nt, j, c, c, X, X, x, K, c),
      s.atlas.wall(n, Q, nt, Q, c, c, X, X, x, 0, c),
      s.atlas.wall(nt, j, n, j, c, c, X, X, x, 0, c),
      s.atlas.wall(o, Q, n, Q, c, c, X, X, v, 0, c),
      s.atlas.wall(n, j, o, j, c, c, X, X, v, 0, c),
      s.atlas.wall(o, j, o, Q, c, c, X, X, v, 0, c),
      Ms(s.solid, nt - 0.8, X - 0.9, Q - 0.8, o + 0.8, X, j + 0.8, d, {
        bottom: !0,
      }),
      Ms(s.solid, nt - 0.3, X, Q - 0.3, nt + 1.6, X + 1.6, j + 0.3, d),
      Ms(s.solid, nt + 1.6, X, Q - 0.3, o + 0.3, X + 1, Q + 0.5, u),
      Ms(s.solid, nt + 1.6, X, j - 0.5, o + 0.3, X + 1, j + 0.3, u),
      Ms(s.solid, o - 0.5, X, Q + 0.5, o + 0.3, X + 1, j - 0.5, u));
    let Z = (Q + j) / 2,
      et = (j - Q) / 2 + 0.3,
      tt = X + 1.6,
      it = X + 1.6 + Math.min(3.2, (j - Q) * 0.17);
    (xs(
      s.solid,
      [nt - 0.3, tt, Z - et],
      [nt - 0.3, tt, Z + et],
      [nt - 0.3, it, Z],
      [nt - 0.3, it, Z],
      d,
      [nt - 10, X, Z],
    ),
      xs(
        s.solid,
        [nt + 1.6, tt, Z - et],
        [nt + 1.6, tt, Z + et],
        [nt + 1.6, it, Z],
        [nt + 1.6, it, Z],
        u,
        [nt + 10, X, Z],
      ),
      xs(
        s.solid,
        [nt - 0.5, tt, Z - et - 0.2],
        [nt + 1.6, tt, Z - et - 0.2],
        [nt + 1.6, it + 0.15, Z],
        [nt - 0.5, it + 0.15, Z],
        d,
        [nt, X + 10, Z - 20],
      ),
      xs(
        s.solid,
        [nt - 0.5, tt, Z + et + 0.2],
        [nt + 1.6, tt, Z + et + 0.2],
        [nt + 1.6, it + 0.15, Z],
        [nt - 0.5, it + 0.15, Z],
        d,
        [nt, X + 10, Z + 20],
      ),
      Ms(s.solid, nt - 0.5, c, Q - 0.5, nt + 0.2, c + 1.1, j + 0.5, p));
  };
  (T(a, w, h + 2.5, 0), T(R, r, h + 2.5, 8), T(z, _, h + 2, 2));
  for (let [Q, j] of [
    [w, z],
    [_, R],
  ]) {
    (Ms(s.solid, n - 0.9, h - 0.8, Q, n + 0.4, h, j, d, { bottom: !0 }),
      Ms(s.solid, n - 0.25, h, Q, n + 0.6, h + 1.3, j, d, {
        sides: [1, 1, 1, 0],
      }),
      Ms(s.solid, n - 0.35, c, Q, n + 0.1, c + 0.9, j, p),
      s.solid.wall(n - 0.25, Q, n - 0.25, j, h, h, h + 0.25, h + 0.25, d),
      s.solid.wall(
        n - 0.25,
        Q,
        n - 0.25,
        j,
        h + 1,
        h + 1,
        h + 1.3,
        h + 1.3,
        d,
      ));
    let X = Q;
    for (let K = Q + 1.2; K < j - 0.8; K += 1.6)
      (s.solid.wall(
        n - 0.25,
        X,
        n - 0.25,
        K,
        h + 0.25,
        h + 0.25,
        h + 1,
        h + 1,
        d,
      ),
        s.solid.wall(
          n - 0.25,
          K,
          n - 0.25,
          K + 0.8,
          h + 0.25,
          h + 0.25,
          h + 1,
          h + 1,
          p,
        ),
        (X = K + 0.8));
    s.solid.wall(n - 0.25, X, n - 0.25, j, h + 0.25, h + 0.25, h + 1, h + 1, d);
  }
  (s.atlas.wall(o, R, o, _, c, c, h, h, v, 0, c),
    s.atlas.wall(o, z, o, w, c, c, h, h, v, 0, c),
    Ms(s.solid, o - 0.3, h - 0.7, w, o + 0.7, h, R, u, {
      top: !1,
      bottom: !0,
      sides: [0, 1, 0, 0],
    }),
    Ms(
      s.solid,
      n + 0.3,
      h,
      a + 0.3,
      o - 0.2,
      h + 0.4,
      r - 0.3,
      At([0.3, 0.3, 0.29], Tt.tar),
      { sides: [0, 0, 0, 0] },
    ));
  let E = n + 9,
    A = o - 7,
    C = h + 0.4;
  (X5(s.solid, E, a + 18, A, r - 18, C + 2.2, 4.2, m, !1, u, 0.6),
    Ms(s.solid, E, C, a + 18, A, C + 2.2, r - 18, v, {
      top: !1,
      sides: [1, 0, 1, 0],
    }),
    s.atlas.wall(E, a + 18, E, r - 18, C, C, C + 2.2, C + 2.2, v, 0, C - 14.5),
    s.atlas.wall(A, r - 18, A, a + 18, C, C, C + 2.2, C + 2.2, v, 0, C - 14.5));
  for (let Q of [-1, 1]) {
    let j = (E + A) / 2,
      X = j + Q * (A - E) * 0.22,
      K = j + Q * (A - E) * 0.05,
      nt = C + 2.2 + 4.2 * (1 - 0.44) + 0.05,
      Z = C + 2.2 + 4.2 * (1 - 0.1) + 0.05;
    xs(
      s.solid,
      [X, nt, a + 22],
      [X, nt, r - 22],
      [K, Z, r - 22],
      [K, Z, a + 22],
      g,
      [j + Q * 30, C + 60, l],
    );
  }
  let P = n + 7.8,
    I = l,
    L = 6.5,
    F = h + 1.5,
    N = 52,
    B = T0(Ha("ferry_shaft"));
  {
    let Q = P - L,
      j = P + L,
      X = I - L,
      K = I + L;
    (s.atlas.wall(j, X, Q, X, F - 3, F - 3, N, N, B, 0, F - 3),
      s.atlas.wall(j, K, j, X, F - 3, F - 3, N, N, B, 0, F - 3),
      s.atlas.wall(Q, K, j, K, F - 3, F - 3, N, N, B, 0, F - 3),
      s.atlas.wall(Q, X, Q, K, F - 3, F - 3, N, N, B, 0, F - 3));
    for (let [nt, Z] of [
      [Q, X],
      [j, X],
      [j, K],
      [Q, K],
    ])
      Ms(s.solid, nt - 0.75, F - 3, Z - 0.75, nt + 0.75, N, Z + 0.75, d, {
        top: !1,
      });
    Ms(s.solid, Q - 0.9, F - 3, X - 0.9, j + 0.9, F - 1.8, K + 0.9, d);
  }
  let H = N,
    O = 59,
    D = 55.6;
  (Ms(
    s.solid,
    P - L - 0.5,
    H - 0.8,
    I - L - 0.5,
    P + L + 0.5,
    H,
    I + L + 0.5,
    d,
    { bottom: !0 },
  ),
    Ms(s.solid, P - L - 0.1, H, I - L - 0.1, P + L + 0.1, O, I + L + 0.1, d, {
      top: !1,
    }));
  for (let [Q, j] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ])
    Ms(
      s.solid,
      P + Q * (L + 0.1) - 0.8,
      H + 0.8,
      I + j * (L + 0.1) - 0.8,
      P + Q * (L + 0.1) + 0.8,
      O,
      I + j * (L + 0.1) + 0.8,
      d,
      { top: !1 },
    );
  (Ms(
    s.solid,
    P - L - 0.9,
    O,
    I - L - 0.9,
    P + L + 0.9,
    O + 0.9,
    I + L + 0.9,
    d,
    { bottom: !0 },
  ),
    Fct(s.solid, P, I, L + 0.6, O + 0.9, 1.25, d, p));
  let U = t.add("clock", 512, 512, oS);
  for (let [Q, j] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    let X = P + Q * (L + 0.12),
      K = I + j * (L + 0.12);
    si(s.text, t, U, X, D, K, Q, j, 6.6, 6.6, Da(!0, [1, 0.97, 0.9]));
    let nt = [];
    for (let Z = 0; Z <= 32; Z++) {
      let et = (Z / 32) * Math.PI * 2,
        tt = 3.45;
      nt.push([
        X + j * Math.cos(et) * tt + Q * 0.1,
        D + Math.sin(et) * tt,
        K - Q * Math.cos(et) * tt + j * 0.1,
      ]);
    }
    Wi(s.solid, nt, 0.28, 6, d);
  }
  let G = O + 0.9,
    q = 67.5,
    W = 5.2;
  fR(s.solid, P, I, W, G, q, 2, d, {
    pier: 1.5,
    depth: 1,
    back: At([0.035, 0.032, 0.03], Tt.paint),
  });
  for (let [Q, j] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ])
    Gs(
      s.solid,
      P + Q * (L + 0.3),
      I + j * (L + 0.3),
      [
        [0.55, O + 0.9],
        [0.55, O + 1.6],
        [0.8, O + 2.2],
        [0.45, O + 3],
        [0.1, O + 3.8],
        [0.02, O + 4],
      ],
      8,
      d,
    );
  Ms(
    s.solid,
    P - W - 0.5,
    q,
    I - W - 0.5,
    P + W + 0.5,
    q + 1.3,
    I + W + 0.5,
    d,
    { bottom: !0 },
  );
  let V = q + 1.3,
    Y = V + 3.4,
    $ = 3.9;
  (fR(s.solid, P, I, $, V, Y, 1, d, {
    pier: 1.3,
    depth: 0.6,
    back: At([0.035, 0.032, 0.03], Tt.paint),
  }),
    Ms(
      s.solid,
      P - $ - 0.4,
      Y,
      I - $ - 0.4,
      P + $ + 0.4,
      Y + 0.7,
      I + $ + 0.4,
      d,
      { bottom: !0 },
    ));
  let st = Y + 0.7;
  (Gs(
    s.solid,
    P,
    I,
    [
      [3.3, st],
      [3.3, st + 1.2],
      [3.5, st + 1.2],
      [3.5, st + 1.5],
    ],
    8,
    d,
    { rot: Math.PI / 8 },
  ),
    Gs(
      s.solid,
      P,
      I,
      [
        [3.3, st + 1.5],
        [3.25, st + 2.2],
        [3, st + 3],
        [2.5, st + 3.7],
        [1.8, st + 4.2],
        [0.9, st + 4.55],
        [0.5, st + 4.65],
      ],
      8,
      T0(At([0.6, 0.58, 0.52], Tt.stone)),
      { rot: Math.PI / 8 },
    ),
    es(s.solid, P, I, 0.6, st + 4.6, st + 5.8, 8, d),
    Gs(
      s.solid,
      P,
      I,
      [
        [0.8, st + 5.8],
        [0.5, st + 6.3],
        [0.08, st + 6.7],
      ],
      8,
      d,
    ),
    es(
      s.solid,
      P,
      I,
      0.07,
      st + 6.6,
      st + 11,
      5,
      At([0.3, 0.3, 0.3], Tt.metal),
    ));
  {
    let Q = t.add("usflag", 380, 200, Bct),
      j = st + 10.9,
      X = 3.6,
      K = 1.9,
      nt = P + 0.08,
      [Z, et, tt, it] = t.uv(Q),
      rt = (lt) => Math.sin(lt * 1.9) * 0.18;
    for (let lt = 0; lt < 3; lt++) {
      let ct = nt + (X * lt) / 3,
        dt = nt + (X * (lt + 1)) / 3,
        ut = Z + ((tt - Z) * lt) / 3,
        ot = Z + ((tt - Z) * (lt + 1)) / 3,
        at = I + rt(lt),
        yt = I + rt(lt + 1);
      (s.text.quad(
        [ct, j - K, at],
        [dt, j - K, yt],
        [dt, j, yt],
        [ct, j, at],
        [ut, it],
        [ot, it],
        [ot, et],
        [ut, et],
        Da(!1),
        [0, 0, 1],
      ),
        s.text.quad(
          [dt, j - K, yt],
          [ct, j - K, at],
          [ct, j, at],
          [dt, j, yt],
          [ot, it],
          [ut, it],
          [ut, et],
          [ot, et],
          Da(!1),
          [0, 0, -1],
        ));
    }
  }
  {
    let Q = n - 1.75,
      j = _ - z,
      X = 4.2,
      K = (j - 3 * X) / 4,
      nt = [],
      Z = 0;
    for (let et = 0; et < 3; et++)
      (nt.push({ a: Z, b: Z + K }),
        (Z += K),
        nt.push({ a: Z, b: Z + X, ys: c + 6.4, depth: 1 }),
        (Z += X));
    (nt.push({ a: Z, b: j }),
      hR(s.solid, [Q, z], [0, 1], c, c + 10.6, nt, d, {
        back: At([0.07, 0.08, 0.08], Tt.glass),
      }),
      Ms(s.solid, Q - 0.3, c + 10.6, z - 0.3, n - 1.2, c + 11.4, _ + 0.3, d, {
        bottom: !0,
      }));
    for (let et of [z, _])
      Ms(s.solid, Q - 0.2, c, et - 0.4, n - 1.2, c + 10.6, et + 0.4, d, {
        top: !1,
      });
    Ms(s.solid, Q, c, z, n - 1.2, c + 10.6, z + 0.01, d, {
      top: !1,
      sides: [0, 0, 0, 0],
    });
  }
  {
    let Q = (E + A) / 2 + 0.6,
      j = C + 2.2 + 4.2 + 0.3,
      X = 4.8,
      K = At([0.1, 0.11, 0.11], Tt.metal),
      nt = oo([0.08, 0.08, 0.09]),
      Z = 'bold 120px Georgia, "Times New Roman", serif';
    for (let [et, tt] of [
      ["PORT OF", 1],
      ["SAN FRANCISCO", -1],
    ]) {
      let it = t.word(et, { font: Z, h: 130, spacing: 12 }),
        rt = (X * it.w) / it.h,
        lt = l + tt * (L + 5 + rt / 2);
      si(s.text, t, it, Q + 0.12, j + X / 2 + 0.3, lt, 1, 0, rt, X, nt);
      for (let ct = lt - rt / 2; ct <= lt + rt / 2 + 0.1; ct += 3)
        (ss(s.solid, [Q, j - 1.5, ct], [Q, j + X + 0.4, ct], 0.14, 0.14, K),
          ss(
            s.solid,
            [Q - 2.2, j - 2.4, ct],
            [Q, j + X * 0.6, ct],
            0.1,
            0.1,
            K,
          ));
      (ss(
        s.solid,
        [Q, j + 0.3, lt - rt / 2],
        [Q, j + 0.3, lt + rt / 2],
        0.1,
        0.1,
        K,
      ),
        ss(
          s.solid,
          [Q, j + X + 0.3, lt - rt / 2],
          [Q, j + X + 0.3, lt + rt / 2],
          0.1,
          0.1,
          K,
        ));
    }
  }
  for (let [Q, j] of [
    [a + 20, !1],
    [r - 26, !0],
  ]) {
    let X = y,
      K = y + 34,
      nt = 11;
    (Ms(
      s.solid,
      X,
      -0.4,
      Q - nt / 2,
      K,
      1.2,
      Q + nt / 2,
      At([0.32, 0.33, 0.33], Tt.conc),
      { bottom: !1 },
    ),
      ss(
        s.solid,
        [X - 16, 3.1, Q],
        [X + 8, 1.5, Q],
        4.2,
        0.5,
        At([0.36, 0.38, 0.4], Tt.metal),
      ));
    for (let Z of [-1, 1])
      ss(
        s.solid,
        [X - 16, 4.2, Q + Z * 2.1],
        [X + 8, 2.6, Q + Z * 2.1],
        0.08,
        0.08,
        At([0.2, 0.22, 0.24], Tt.metal),
      );
    for (let Z of [-1, 1])
      Ms(
        s.solid,
        X - 1.5,
        1.2,
        Q + Z * 4.2 - 0.5,
        X - 0.5,
        12,
        Q + Z * 4.2 + 0.5,
        At([0.18, 0.32, 0.45], Tt.metal),
      );
    (Ms(
      s.solid,
      X - 1.7,
      11,
      Q - 5,
      X - 0.3,
      12.2,
      Q + 5,
      At([0.18, 0.32, 0.45], Tt.metal),
    ),
      Ict(s.solid, o + 2.5, X - 1.5, Q, 13.5),
      j && Nct(s.solid, K + 22, Q - 16, 0));
  }
  for (let [Q, j] of [
    [
      [o + 1, a - 7.5],
      [y - 0.5, a - 7.5],
    ],
    [
      [y - 0.5, a - 7.5],
      [y - 0.5, r + 7.5],
    ],
    [
      [y - 0.5, r + 7.5],
      [n + 1, r + 7.5],
    ],
  ])
    Nr(s.solid, Q, j, 3, At([0.12, 0.14, 0.13], Tt.metal));
  e.push({ t: "box", x0: Ve.x - 1.5, z0: a, x1: o, z1: r });
}
