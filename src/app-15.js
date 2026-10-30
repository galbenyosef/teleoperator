// app 15 — solid
// Lines 40732-41322 of readable/app.pretty.js (statement-aligned).
function ak({ B: o, A: t, colliders: e }) {
  let s = o.R("ferry"),
    { x0: n, x1: i, z0: a, z1: r, zc: l } = io,
    c = 2.9,
    h = 21,
    f = [0.64, 0.6, 0.52],
    u = Rt(f, Tt.stone),
    d = J0(u),
    p = Rt([0.5, 0.47, 0.41], Tt.stone),
    m = Rt([0.2, 0.24, 0.22], Tt.copper),
    g = Rt([0.1, 0.12, 0.13], Tt.glass),
    b = Rt([0.03, 0.03, 0.03], Tt.paint),
    v = J0(Ja("ferry_arcade")),
    x = Ja("ferry_rear"),
    y = i + 26;
  (zs(
    s.solid,
    n - 0.2,
    1.2,
    a - 8,
    y,
    3,
    r + 8,
    Rt([0.42, 0.41, 0.38], Tt.conc),
    { bottom: !0 },
  ),
    pW(
      s.solid,
      n + 2,
      a - 6,
      y - 1,
      r + 6,
      6,
      1.2,
      Rt([0.3, 0.28, 0.25], Tt.pile),
      { r: 0.35, edgeOnly: !0 },
    ));
  let M = 16,
    S = 20,
    w = a + M,
    _ = l - S / 2,
    z = l + S / 2,
    A = r - M;
  (s.atlas.wall(n, w, n, _, c, c, h, h, v, 0, c),
    s.atlas.wall(n, z, n, A, c, c, h, h, v, 0, c));
  let T = (Z, q, j, K) => {
    let nt = n - 1.2;
    (s.atlas.wall(nt, Z, nt, q, c, c, j, j, v, K, c),
      s.atlas.wall(n, Z, nt, Z, c, c, j, j, v, 0, c),
      s.atlas.wall(nt, q, n, q, c, c, j, j, v, 0, c),
      s.atlas.wall(i, Z, n, Z, c, c, j, j, x, 0, c),
      s.atlas.wall(n, q, i, q, c, c, j, j, x, 0, c),
      s.atlas.wall(i, q, i, Z, c, c, j, j, x, 0, c),
      zs(s.solid, nt - 0.8, j - 0.9, Z - 0.8, i + 0.8, j, q + 0.8, d, {
        bottom: !0,
      }),
      zs(s.solid, nt - 0.3, j, Z - 0.3, nt + 1.6, j + 1.6, q + 0.3, d),
      zs(s.solid, nt + 1.6, j, Z - 0.3, i + 0.3, j + 1, Z + 0.5, u),
      zs(s.solid, nt + 1.6, j, q - 0.5, i + 0.3, j + 1, q + 0.3, u),
      zs(s.solid, i - 0.5, j, Z + 0.5, i + 0.3, j + 1, q - 0.5, u));
    let Q = (Z + q) / 2,
      et = (q - Z) / 2 + 0.3,
      st = j + 1.6,
      ot = j + 1.6 + Math.min(3.2, (q - Z) * 0.17);
    (Ms(
      s.solid,
      [nt - 0.3, st, Q - et],
      [nt - 0.3, st, Q + et],
      [nt - 0.3, ot, Q],
      [nt - 0.3, ot, Q],
      d,
      [nt - 10, j, Q],
    ),
      Ms(
        s.solid,
        [nt + 1.6, st, Q - et],
        [nt + 1.6, st, Q + et],
        [nt + 1.6, ot, Q],
        [nt + 1.6, ot, Q],
        u,
        [nt + 10, j, Q],
      ),
      Ms(
        s.solid,
        [nt - 0.5, st, Q - et - 0.2],
        [nt + 1.6, st, Q - et - 0.2],
        [nt + 1.6, ot + 0.15, Q],
        [nt - 0.5, ot + 0.15, Q],
        d,
        [nt, j + 10, Q - 20],
      ),
      Ms(
        s.solid,
        [nt - 0.5, st, Q + et + 0.2],
        [nt + 1.6, st, Q + et + 0.2],
        [nt + 1.6, ot + 0.15, Q],
        [nt - 0.5, ot + 0.15, Q],
        d,
        [nt, j + 10, Q + 20],
      ),
      zs(s.solid, nt - 0.5, c, Z - 0.5, nt + 0.2, c + 1.1, q + 0.5, p));
  };
  (T(a, w, h + 2.5, 0), T(A, r, h + 2.5, 8), T(_, z, h + 2, 2));
  for (let [Z, q] of [
    [w, _],
    [z, A],
  ]) {
    (zs(s.solid, n - 0.9, h - 0.8, Z, n + 0.4, h, q, d, { bottom: !0 }),
      zs(s.solid, n - 0.25, h, Z, n + 0.6, h + 1.3, q, d, {
        sides: [1, 1, 1, 0],
      }),
      zs(s.solid, n - 0.35, c, Z, n + 0.1, c + 0.9, q, p),
      s.solid.wall(n - 0.25, Z, n - 0.25, q, h, h, h + 0.25, h + 0.25, d),
      s.solid.wall(
        n - 0.25,
        Z,
        n - 0.25,
        q,
        h + 1,
        h + 1,
        h + 1.3,
        h + 1.3,
        d,
      ));
    let j = Z;
    for (let K = Z + 1.2; K < q - 0.8; K += 1.6)
      (s.solid.wall(
        n - 0.25,
        j,
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
        (j = K + 0.8));
    s.solid.wall(n - 0.25, j, n - 0.25, q, h + 0.25, h + 0.25, h + 1, h + 1, d);
  }
  (s.atlas.wall(i, A, i, z, c, c, h, h, x, 0, c),
    s.atlas.wall(i, _, i, w, c, c, h, h, x, 0, c),
    zs(s.solid, i - 0.3, h - 0.7, w, i + 0.7, h, A, u, {
      top: !1,
      bottom: !0,
      sides: [0, 1, 0, 0],
    }),
    zs(
      s.solid,
      n + 0.3,
      h,
      a + 0.3,
      i - 0.2,
      h + 0.4,
      r - 0.3,
      Rt([0.3, 0.3, 0.29], Tt.tar),
      { sides: [0, 0, 0, 0] },
    ));
  let E = n + 9,
    R = i - 7,
    P = h + 0.4;
  (V5(s.solid, E, a + 18, R, r - 18, P + 2.2, 4.2, m, !1, u, 0.6),
    zs(s.solid, E, P, a + 18, R, P + 2.2, r - 18, x, {
      top: !1,
      sides: [1, 0, 1, 0],
    }),
    s.atlas.wall(E, a + 18, E, r - 18, P, P, P + 2.2, P + 2.2, x, 0, P - 14.5),
    s.atlas.wall(R, r - 18, R, a + 18, P, P, P + 2.2, P + 2.2, x, 0, P - 14.5));
  for (let Z of [-1, 1]) {
    let q = (E + R) / 2,
      j = q + Z * (R - E) * 0.22,
      K = q + Z * (R - E) * 0.05,
      nt = P + 2.2 + 4.2 * (1 - 0.44) + 0.05,
      Q = P + 2.2 + 4.2 * (1 - 0.1) + 0.05;
    Ms(
      s.solid,
      [j, nt, a + 22],
      [j, nt, r - 22],
      [K, Q, r - 22],
      [K, Q, a + 22],
      g,
      [q + Z * 30, P + 60, l],
    );
  }
  let C = n + 7.8,
    I = l,
    L = 6.5,
    F = h + 1.5,
    O = 52,
    B = J0(Ja("ferry_shaft"));
  {
    let Z = C - L,
      q = C + L,
      j = I - L,
      K = I + L;
    (s.atlas.wall(q, j, Z, j, F - 3, F - 3, O, O, B, 0, F - 3),
      s.atlas.wall(q, K, q, j, F - 3, F - 3, O, O, B, 0, F - 3),
      s.atlas.wall(Z, K, q, K, F - 3, F - 3, O, O, B, 0, F - 3),
      s.atlas.wall(Z, j, Z, K, F - 3, F - 3, O, O, B, 0, F - 3));
    for (let [nt, Q] of [
      [Z, j],
      [q, j],
      [q, K],
      [Z, K],
    ])
      zs(s.solid, nt - 0.75, F - 3, Q - 0.75, nt + 0.75, O, Q + 0.75, d, {
        top: !1,
      });
    zs(s.solid, Z - 0.9, F - 3, j - 0.9, q + 0.9, F - 1.8, K + 0.9, d);
  }
  let H = O,
    N = 59,
    D = 55.6;
  (zs(
    s.solid,
    C - L - 0.5,
    H - 0.8,
    I - L - 0.5,
    C + L + 0.5,
    H,
    I + L + 0.5,
    d,
    { bottom: !0 },
  ),
    zs(s.solid, C - L - 0.1, H, I - L - 0.1, C + L + 0.1, N, I + L + 0.1, d, {
      top: !1,
    }));
  for (let [Z, q] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ])
    zs(
      s.solid,
      C + Z * (L + 0.1) - 0.8,
      H + 0.8,
      I + q * (L + 0.1) - 0.8,
      C + Z * (L + 0.1) + 0.8,
      N,
      I + q * (L + 0.1) + 0.8,
      d,
      { top: !1 },
    );
  (zs(
    s.solid,
    C - L - 0.9,
    N,
    I - L - 0.9,
    C + L + 0.9,
    N + 0.9,
    I + L + 0.9,
    d,
    { bottom: !0 },
  ),
    sdt(s.solid, C, I, L + 0.6, N + 0.9, 1.25, d, p));
  let U = t.add("clock", 512, 512, rk);
  for (let [Z, q] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    let j = C + Z * (L + 0.12),
      K = I + q * (L + 0.12);
    ri(s.text, t, U, j, D, K, Z, q, 6.6, 6.6, Za(!0, [1, 0.97, 0.9]));
    let nt = [];
    for (let Q = 0; Q <= 32; Q++) {
      let et = (Q / 32) * Math.PI * 2,
        st = 3.45;
      nt.push([
        j + q * Math.cos(et) * st + Z * 0.1,
        D + Math.sin(et) * st,
        K - Z * Math.cos(et) * st + q * 0.1,
      ]);
    }
    Qi(s.solid, nt, 0.28, 6, d);
  }
  let G = N + 0.9,
    W = 67.5,
    V = 5.2;
  U7(s.solid, C, I, V, G, W, 2, d, {
    pier: 1.5,
    depth: 1,
    back: Rt([0.035, 0.032, 0.03], Tt.paint),
  });
  for (let [Z, q] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ])
    Ws(
      s.solid,
      C + Z * (L + 0.3),
      I + q * (L + 0.3),
      [
        [0.55, N + 0.9],
        [0.55, N + 1.6],
        [0.8, N + 2.2],
        [0.45, N + 3],
        [0.1, N + 3.8],
        [0.02, N + 4],
      ],
      8,
      d,
    );
  zs(
    s.solid,
    C - V - 0.5,
    W,
    I - V - 0.5,
    C + V + 0.5,
    W + 1.3,
    I + V + 0.5,
    d,
    { bottom: !0 },
  );
  let $ = W + 1.3,
    J = $ + 3.4,
    X = 3.9;
  (U7(s.solid, C, I, X, $, J, 1, d, {
    pier: 1.3,
    depth: 0.6,
    back: Rt([0.035, 0.032, 0.03], Tt.paint),
  }),
    zs(
      s.solid,
      C - X - 0.4,
      J,
      I - X - 0.4,
      C + X + 0.4,
      J + 0.7,
      I + X + 0.4,
      d,
      { bottom: !0 },
    ));
  let tt = J + 0.7;
  (Ws(
    s.solid,
    C,
    I,
    [
      [3.3, tt],
      [3.3, tt + 1.2],
      [3.5, tt + 1.2],
      [3.5, tt + 1.5],
    ],
    8,
    d,
    { rot: Math.PI / 8 },
  ),
    Ws(
      s.solid,
      C,
      I,
      [
        [3.3, tt + 1.5],
        [3.25, tt + 2.2],
        [3, tt + 3],
        [2.5, tt + 3.7],
        [1.8, tt + 4.2],
        [0.9, tt + 4.55],
        [0.5, tt + 4.65],
      ],
      8,
      J0(Rt([0.6, 0.58, 0.52], Tt.stone)),
      { rot: Math.PI / 8 },
    ),
    os(s.solid, C, I, 0.6, tt + 4.6, tt + 5.8, 8, d),
    Ws(
      s.solid,
      C,
      I,
      [
        [0.8, tt + 5.8],
        [0.5, tt + 6.3],
        [0.08, tt + 6.7],
      ],
      8,
      d,
    ),
    os(
      s.solid,
      C,
      I,
      0.07,
      tt + 6.6,
      tt + 11,
      5,
      Rt([0.3, 0.3, 0.3], Tt.metal),
    ));
  {
    let Z = t.add("usflag", 380, 200, idt),
      q = tt + 10.9,
      j = 3.6,
      K = 1.9,
      nt = C + 0.08,
      [Q, et, st, ot] = t.uv(Z),
      rt = (lt) => Math.sin(lt * 1.9) * 0.18;
    for (let lt = 0; lt < 3; lt++) {
      let ht = nt + (j * lt) / 3,
        pt = nt + (j * (lt + 1)) / 3,
        ut = Q + ((st - Q) * lt) / 3,
        it = Q + ((st - Q) * (lt + 1)) / 3,
        at = I + rt(lt),
        yt = I + rt(lt + 1);
      (s.text.quad(
        [ht, q - K, at],
        [pt, q - K, yt],
        [pt, q, yt],
        [ht, q, at],
        [ut, ot],
        [it, ot],
        [it, et],
        [ut, et],
        Za(!1),
        [0, 0, 1],
      ),
        s.text.quad(
          [pt, q - K, yt],
          [ht, q - K, at],
          [ht, q, at],
          [pt, q, yt],
          [it, ot],
          [ut, ot],
          [ut, et],
          [it, et],
          Za(!1),
          [0, 0, -1],
        ));
    }
  }
  {
    let Z = n - 1.75,
      q = z - _,
      j = 4.2,
      K = (q - 3 * j) / 4,
      nt = [],
      Q = 0;
    for (let et = 0; et < 3; et++)
      (nt.push({ a: Q, b: Q + K }),
        (Q += K),
        nt.push({ a: Q, b: Q + j, ys: c + 6.4, depth: 1 }),
        (Q += j));
    (nt.push({ a: Q, b: q }),
      D7(s.solid, [Z, _], [0, 1], c, c + 10.6, nt, d, {
        back: Rt([0.07, 0.08, 0.08], Tt.glass),
      }),
      zs(s.solid, Z - 0.3, c + 10.6, _ - 0.3, n - 1.2, c + 11.4, z + 0.3, d, {
        bottom: !0,
      }));
    for (let et of [_, z])
      zs(s.solid, Z - 0.2, c, et - 0.4, n - 1.2, c + 10.6, et + 0.4, d, {
        top: !1,
      });
    zs(s.solid, Z, c, _, n - 1.2, c + 10.6, _ + 0.01, d, {
      top: !1,
      sides: [0, 0, 0, 0],
    });
  }
  {
    let Z = (E + R) / 2 + 0.6,
      q = P + 2.2 + 4.2 + 0.3,
      j = 4.8,
      K = Rt([0.1, 0.11, 0.11], Tt.metal),
      nt = xo([0.08, 0.08, 0.09]),
      Q = 'bold 120px Georgia, "Times New Roman", serif';
    for (let [et, st] of [
      ["PORT OF", 1],
      ["SAN FRANCISCO", -1],
    ]) {
      let ot = t.word(et, { font: Q, h: 130, spacing: 12 }),
        rt = (j * ot.w) / ot.h,
        lt = l + st * (L + 5 + rt / 2);
      ri(s.text, t, ot, Z + 0.12, q + j / 2 + 0.3, lt, 1, 0, rt, j, nt);
      for (let ht = lt - rt / 2; ht <= lt + rt / 2 + 0.1; ht += 3)
        (rs(s.solid, [Z, q - 1.5, ht], [Z, q + j + 0.4, ht], 0.14, 0.14, K),
          rs(
            s.solid,
            [Z - 2.2, q - 2.4, ht],
            [Z, q + j * 0.6, ht],
            0.1,
            0.1,
            K,
          ));
      (rs(
        s.solid,
        [Z, q + 0.3, lt - rt / 2],
        [Z, q + 0.3, lt + rt / 2],
        0.1,
        0.1,
        K,
      ),
        rs(
          s.solid,
          [Z, q + j + 0.3, lt - rt / 2],
          [Z, q + j + 0.3, lt + rt / 2],
          0.1,
          0.1,
          K,
        ));
    }
  }
  for (let [Z, q] of [
    [a + 20, !1],
    [r - 26, !0],
  ]) {
    let j = y,
      K = y + 34,
      nt = 11;
    (zs(
      s.solid,
      j,
      -0.4,
      Z - nt / 2,
      K,
      1.2,
      Z + nt / 2,
      Rt([0.32, 0.33, 0.33], Tt.conc),
      { bottom: !1 },
    ),
      rs(
        s.solid,
        [j - 16, 3.1, Z],
        [j + 8, 1.5, Z],
        4.2,
        0.5,
        Rt([0.36, 0.38, 0.4], Tt.metal),
      ));
    for (let Q of [-1, 1])
      rs(
        s.solid,
        [j - 16, 4.2, Z + Q * 2.1],
        [j + 8, 2.6, Z + Q * 2.1],
        0.08,
        0.08,
        Rt([0.2, 0.22, 0.24], Tt.metal),
      );
    for (let Q of [-1, 1])
      zs(
        s.solid,
        j - 1.5,
        1.2,
        Z + Q * 4.2 - 0.5,
        j - 0.5,
        12,
        Z + Q * 4.2 + 0.5,
        Rt([0.18, 0.32, 0.45], Tt.metal),
      );
    (zs(
      s.solid,
      j - 1.7,
      11,
      Z - 5,
      j - 0.3,
      12.2,
      Z + 5,
      Rt([0.18, 0.32, 0.45], Tt.metal),
    ),
      edt(s.solid, i + 2.5, j - 1.5, Z, 13.5),
      q && ndt(s.solid, K + 22, Z - 16, 0));
  }
  for (let [Z, q] of [
    [
      [i + 1, a - 7.5],
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
    s0(s.solid, Z, q, 3, Rt([0.12, 0.14, 0.13], Tt.metal));
  e.push({ t: "box", x0: Ye.x - 1.5, z0: a, x1: i, z1: r });
}
