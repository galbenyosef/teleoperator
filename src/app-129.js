// app 129 — math
// Lines 87518-87864 of readable/app.pretty.js (statement-aligned).
En();
function T7(i, t) {
  let e = new Ce(),
    s = ae[10],
    n = ls[10].hw,
    o = ls[10].sw,
    a = fe[18] - Qe[18].hw - 7.5,
    r = Yt(s, a),
    l = n + 0.45,
    c = n + o - 0.4;
  ru(i, (S, w) => Math.abs(S - s) < n + o + 0.5 && Math.abs(w - a) < 7);
  let h = Be(be.polgranite, 0.8),
    f = It(Lt.gloss, 0.45, 0.03, 0.02),
    u = Be(be.redbeam, 1),
    d = Be(be.greentile, 0.9),
    p = It(Lt.gold, 0.55, 0.38, 0.1),
    m = It(Lt.gloss, 0.05, 0.3, 0.14),
    g = [];
  for (let S of [-1, 1]) for (let w of [l, c]) g.push(s + S * w);
  for (let S of g) {
    let w = Yt(S, a) + Ke,
      z = Math.abs(S - s) < n + 1,
      _ = r + (z ? 7.4 : 5.2);
    (Ze(e, S - 0.55, w - 0.3, a - 0.55, S + 0.55, w + 1.1, a + 0.55, h),
      Ze(e, S - 0.38, w + 1.1, a - 0.38, S + 0.38, _, a + 0.38, f),
      i.colliders.push({ t: "circ", x: S, z: a, r: 0.6 }));
  }
  let b = (S, w, z, _, R, T) => {
    let C = a;
    for (let P of [-1, 1]) {
      let I = [];
      for (let F = 0; F <= 3; F++) {
        let N = [],
          B = F / 3;
        for (let H = 0; H <= 8; H++) {
          let O = H / 8,
            D = S + (w - S) * O,
            U = T * Math.pow(Math.abs(O - 0.5) * 2, 4) * (1 - B),
            G = z + _ * (1 - Math.pow(1 - B, 1.6)) + U;
          N.push([
            D + (O - 0.5) * 2 * T * 0.6 * (1 - B),
            G,
            C + P * R * (1 - B),
          ]);
        }
        I.push(P < 0 ? N.slice().reverse() : N);
      }
      let L = I;
      for (let F = 0; F < 3; F++)
        for (let N = 0; N < 8; N++)
          ne(
            e,
            [L[F][N], L[F][N + 1], L[F + 1][N + 1], L[F + 1][N]],
            d,
            [0, 1, P * 0.5],
            (B) => [B[0] * 1, B[1] + Math.abs(B[2] - C)],
          );
      ne(
        e,
        [L[0][0], L[0][8], [w, z - 0.15, C], [S, z - 0.15, C]],
        f,
        [0, -1, 0],
      );
    }
    return (
      Ze(e, S + 0.3, z + _ - 0.1, a - 0.2, w - 0.3, z + _ + 0.45, a + 0.2, d),
      z + _ + 0.45
    );
  };
  {
    let S = s - l - 0.6,
      w = s + l + 0.6,
      z = r + 7.4;
    (Ze(e, S, z - 1.4, a - 0.45, w, z - 0.6, a + 0.45, u),
      Ze(e, S, z - 0.6, a - 0.55, w, z + 0.1, a + 0.55, f));
    for (let R = 0; R < 13; R++) {
      let T = S + 0.4 + (R * (w - S - 0.8)) / 12;
      Ze(
        e,
        T - 0.18,
        z + 0.1,
        a - 0.7,
        T + 0.18,
        z + 0.55,
        a + 0.7,
        R % 2 ? d : u,
      );
    }
    for (let R of [-1, 1]) {
      let T = a + R * 0.62;
      (Ze(e, s - 1.25, z - 1.5, T - 0.07, s + 1.25, z + 1, T + 0.07, p),
        ne(
          e,
          [
            [s - 1.08, z - 1.33, T + R * 0.16],
            [s + 1.08, z - 1.33, T + R * 0.16],
            [s + 1.08, z + 0.83, T + R * 0.16],
            [s - 1.08, z + 0.83, T + R * 0.16],
          ],
          It(Lt.gloss, 0.3, 0.015, 0.012),
          [0, 0, R],
        ));
      for (let E = 0; E < 4; E++) {
        let A = z + 0.45 - E * 0.52;
        Ze(
          e,
          s - 0.2,
          A - 0.2,
          T + R * 0.21 - 0.03,
          s + 0.2,
          A + 0.2,
          T + R * 0.21 + 0.03,
          p,
        );
      }
    }
    for (let R of [-1, 1])
      for (let T = 0; T < 5; T++) {
        let E = S + 0.8 + (T * (w - S - 1.6)) / 4;
        Ze(
          e,
          E - 0.12,
          z + 0.35,
          a + R * 1.9 - 0.12,
          E + 0.12,
          z + 0.55,
          a + R * 1.9 + 0.12,
          bn(1, 0.75, 0.4),
        );
      }
    let _ = b(S - 1, w + 1, z + 0.55, 1.9, 2.3, 0.9);
    for (let R of [-1, 1]) {
      let T = [];
      for (let A = 0; A <= 10; A++) {
        let C = A / 10;
        T.push([
          s + R * (0.6 + C * 3.8),
          _ +
            0.25 +
            0.45 * Math.sin(C * Math.PI * 2.2) * (1 - C * 0.4) +
            C * 0.2,
          a,
        ]);
      }
      for (let A = 0; A < 10; A++)
        Ae(e, T[A], T[A + 1], 0.16 - A * 0.008, m, 5, !0);
      (Ze(
        e,
        s + R * 0.35 - 0.25,
        _ + 0.4,
        a - 0.2,
        s + R * 0.35 + 0.25,
        _ + 0.85,
        a + 0.2,
        m,
      ),
        Ae(
          e,
          [s + R * 0.4, _ + 0.85, a],
          [s + R * 0.75, _ + 1.25, a],
          0.04,
          p,
          3,
          !0,
        ),
        Ae(e, T[10], [T[10][0] + R * 0.4, T[10][1] + 0.7, a], 0.08, m, 4, !0));
      let E = s + R * (l + 1.4);
      Oe(
        e,
        E,
        a,
        [
          [0.01, _],
          [0.22, _ + 0.3],
          [0.2, _ + 0.9],
          [0.05, _ + 1.25],
          [0.3, _ + 1.5],
        ],
        6,
        m,
      );
    }
    (Oe(
      e,
      s,
      a,
      [
        [0.01, _ + 0.1],
        [0.32, _ + 0.4],
        [0.3, _ + 0.8],
        [0.01, _ + 1],
      ],
      10,
      p,
    ),
      Ae(e, [s, _, a], [s, _ + 0.15, a], 0.1, p, 6));
  }
  for (let S of [-1, 1]) {
    let w = s + S * (l - 0.5),
      z = s + S * (c + 0.5),
      _ = Math.min(w, z),
      R = Math.max(w, z),
      T = r + 5.2;
    (Ze(e, _, T - 1, a - 0.4, R, T - 0.4, a + 0.4, u),
      Ze(e, _, T - 0.4, a - 0.5, R, T + 0.05, a + 0.5, f));
    let E = b(_ - 0.6, R + 0.6, T + 0.3, 1.1, 1.6, 0.5);
    for (let I of [_ - 0.2, R + 0.2])
      Oe(
        e,
        I,
        a,
        [
          [0.01, E],
          [0.14, E + 0.2],
          [0.12, E + 0.55],
          [0.18, E + 0.75],
        ],
        6,
        m,
      );
    let A = s + S * c,
      C = a + 1.3,
      P = Yt(A, C) + Ke;
    (Ze(e, A - 0.5, P, C - 0.6, A + 0.5, P + 0.8, C + 0.6, h),
      Oe(
        e,
        A,
        C + 0.05,
        [
          [0.35, P + 0.8],
          [0.42, P + 1.2],
          [0.3, P + 1.55],
          [0.34, P + 1.8],
          [0.3, P + 2.05],
          [0.05, P + 2.2],
        ],
        8,
        Be(be.polgranite, 0.95),
      ),
      Oe(
        e,
        A,
        C + 0.35,
        [
          [0.05, P + 0.8],
          [0.18, P + 0.95],
          [0.12, P + 1.3],
          [0.01, P + 1.35],
        ],
        6,
        Be(be.polgranite, 0.95),
      ),
      i.colliders.push({ t: "circ", x: A, z: C, r: 0.6 }));
  }
  if ((gn(i.group, e, t.lm, "DragonGate"), i.real)) return;
  let x = new Ce(),
    v = bq(),
    y = s - n - o + 0.2,
    M = s + n + o - 0.2;
  for (let S = 10; S < 18; S++) {
    let w = fe[S] + Qe[S].hw + 5,
      z = fe[S + 1] - Qe[S + 1].hw - (S === 17 ? 14 : 5),
      _ = Math.max(1, Math.round((z - w) / 10));
    for (let R = 0; R <= _; R++) {
      let T = w + ((z - w) * R) / _;
      xq(x, v, [y, Yt(y, T) + 7.2, T], [M, Yt(M, T) + 7.2, T], S, R);
    }
  }
  gn(i.group, x, t.lm, "GrantLanterns", { shadow: !1 });
}
function bq() {
  let i = OS(0.55, 0.07, 0.022),
    t = It(Lt.gold, 0.7, 0.5, 0.15),
    e = It(Lt.matte, 0.7, 0.05, 0.03),
    s = new Ce();
  return (
    Oe(
      s,
      0,
      0,
      [
        [0.01, -0.12],
        [0.1, -0.12],
        [0.1, -0.18],
      ],
      6,
      t,
    ),
    Oe(
      s,
      0,
      0,
      [
        [0.1, -0.18],
        [0.3, -0.3],
        [0.37, -0.52],
        [0.3, -0.76],
        [0.1, -0.9],
      ],
      8,
      i,
    ),
    Oe(
      s,
      0,
      0,
      [
        [0.1, -0.9],
        [0.1, -0.95],
        [0.01, -0.95],
      ],
      6,
      t,
    ),
    Ae(s, [0, -0.95, 0], [0, -1.35, 0], 0.03, e, 4, !0),
    s
  );
}
function xq(i, t, e, s, n, o) {
  let a = It(Lt.metal, 0.05, 0.05, 0.05),
    r = 0.9,
    l = 7,
    c = [],
    h = (u) => [
      e[0] + (s[0] - e[0]) * u,
      e[1] + (s[1] - e[1]) * u - r * 4 * u * (1 - u),
      e[2] + (s[2] - e[2]) * u,
    ];
  for (let u = 0; u <= l; u++) c.push(h(u / l));
  for (let u = 0; u < l; u++) Ae(i, c[u], c[u + 1], 0.012, a, 3);
  let f = Math.max(
    6,
    Math.round(Math.hypot(s[0] - e[0], s[2] - e[2]) / 2.2) - 1,
  );
  for (let u = 1; u <= f; u++) {
    let d = h(u / (f + 1));
    rq(
      i,
      t,
      d[0],
      d[1] - 0.05 * Ws(n, o, u),
      d[2],
      Ws(o, u, n) * 6.28,
      0.85 + 0.3 * Ws(u, o, n),
    );
  }
}
