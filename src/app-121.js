// app 121 — math
// Lines 85304-85839 of readable/app.pretty.js (statement-aligned).
function tC(o, t) {
  let e = Hi(11, 5),
    s = new Be(),
    n = 1188,
    i = 371.5,
    a = 12.5,
    r = Math.max(
      ...[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([C, I]) => $t(n + C * a, i + I * a)),
    ),
    l = r + Ze + 0.4,
    c = !!o.real,
    [h, f] = c && o.site?.loopL ? o.site.loopL : [n + a + 19, i + 4],
    u = 13,
    d = c ? 4.8 : 5.5;
  Vu(
    o,
    (C, I) =>
      (Math.abs(C - n) < a + 6 && Math.abs(I - i) < a + 6) ||
      Math.hypot(C - h, I - f) < u + 2,
    ["tree", "lamp", "hydrant", "car"],
  );
  let p = zl(we.coit, 0.97, 0.95, 70),
    m = zl(we.coit, 0.9, 0.88, 12),
    g = 7.2;
  (Ss(
    s,
    [
      [n - a, i - a],
      [n + a, i - a],
      [n + a, i + a],
      [n - a, i + a],
    ],
    r - 3,
    l + g,
    m,
    { vBase: l },
  ),
    s.quad(
      [n - a, l + g, i + a],
      [n + a, l + g, i + a],
      [n + a, l + g, i - a],
      [n - a, l + g, i - a],
      [0, 0],
      [2 * a, 0],
      [2 * a, 2 * a],
      [0, 2 * a],
      We(we.granite, 0.85),
      [0, 1, 0],
    ));
  let b = (C, I, L, F) => ss(s, C, l + g, I, L, l + g + 1.05, F, m);
  (b(n - a, i - a, n + a, i - a + 0.35),
    b(n - a, i + a - 0.35, n + a, i + a),
    b(n - a, i - a + 0.35, n - a + 0.35, i + a - 0.35),
    b(n + a - 0.35, i - a + 0.35, n + a, i + a - 0.35),
    ss(
      s,
      n - a - 0.15,
      l + g + 1.05,
      i - a - 0.15,
      n + a + 0.15,
      l + g + 1.25,
      i - a + 0.5,
      m,
    ),
    ss(
      s,
      n - a - 0.15,
      l + g + 1.05,
      i + a - 0.5,
      n + a + 0.15,
      l + g + 1.25,
      i + a + 0.15,
      m,
    ),
    ss(
      s,
      n - a - 0.15,
      l + g + 1.05,
      i - a + 0.5,
      n - a + 0.5,
      l + g + 1.25,
      i + a - 0.5,
      m,
    ),
    ss(
      s,
      n + a - 0.5,
      l + g + 1.05,
      i - a + 0.5,
      n + a + 0.15,
      l + g + 1.25,
      i + a - 0.5,
      m,
    ),
    ss(
      s,
      n - a - 0.3,
      l + g - 0.6,
      i - a - 0.3,
      n + a + 0.3,
      l + g - 0.1,
      i + a + 0.3,
      m,
    ));
  {
    let C = n + a + 0.6;
    ss(s, n + a, r - 1, i - 4.2, C, l + g - 0.6, i + 4.2, m);
    let I = (L, F, O, B, H, N, D) => {
      let U = [];
      U.push([L, B, F - O / 2]);
      for (let W = 0; W <= 10; W++) {
        let V = Math.PI - (W / 10) * Math.PI;
        U.push([
          L,
          H - O / 2 + (Math.sin(V) * O) / 2,
          F + (Math.cos(V) * O) / 2,
        ]);
      }
      (U.push([L, B, F + O / 2]),
        oe(s, U, N, [D, 0, 0], (W) => [W[2], W[1] - B]));
    };
    I(C + 0.09, i, 3.2, l - 0.2, l + 4.6, Lt(Ct.metal, 0.12, 0.08, 0.05), 1);
    for (let L of [-8.5, 8.5])
      I(
        n + a + 0.09,
        i + L,
        1.4,
        l + 1.2,
        l + 4.2,
        Lt(Ct.glass, 0.03, 0.035, 0.04),
        1,
      );
    for (let L = 0; L < 4; L++)
      ss(
        s,
        C,
        L < 3 ? l - 0.2 - (L + 1) * 0.18 : r - 1,
        i - 3.5 - L * 0.3,
        C + 1.4 + L * 0.45,
        l - 0.2 - L * 0.18,
        i + 3.5 + L * 0.3,
        We(we.granite, 0.8),
      );
  }
  for (let [C, I] of [
    [-1, 0],
    [0, -1],
    [0, 1],
  ])
    for (let L of [-7, 0, 7]) {
      let F = n + C * (a + 0.09),
        O = i + I * (a + 0.09),
        B = -I,
        H = C,
        N = [F + B * (L - 0.7), l + 1.4, O + H * (L - 0.7)],
        D = [F + B * (L + 0.7), l + 1.4, O + H * (L + 0.7)],
        U = [N, D];
      for (let G = 0; G <= 8; G++) {
        let W = (G / 8) * Math.PI;
        U.push([
          F + B * (L + 0.7 * Math.cos(W)),
          l + 4.2 + 0.7 * Math.sin(W),
          O + H * (L + 0.7 * Math.cos(W)),
        ]);
      }
      (U.push(N),
        oe(s, U.slice(0, -1), Lt(Ct.glass, 0.03, 0.035, 0.04), [C, 0, I]));
    }
  o.colliders.push({
    t: "box",
    x0: n - a,
    z0: i - a,
    x1: n + a + 2,
    z1: i + a,
  });
  let v = l + g,
    x = l + 57.5,
    y = 5.6,
    M = 5.15,
    S = 20,
    w = S * 8,
    _ = (C, I) =>
      C * (1 - 0.045 * Math.pow(Math.abs(Math.cos((I * S) / 2)), 0.6)),
    z = [];
  for (let C = 0; C <= 8; C++) {
    let I = C / 8,
      L = v + (x - v) * I;
    z.push([y + (M - y) * (I * I * 0.6 + I * 0.4), L]);
  }
  (qe(
    s,
    n,
    i,
    [
      [y + 0.45, v],
      [y + 0.45, v + 1.1],
      [y + 0.1, v + 1.3],
    ],
    48,
    p,
  ),
    qe(s, n, i, z, w, p, { rf: (C, I) => _(C, I) }));
  let A = x,
    T = x + 5.6,
    E = M + 0.15,
    R = 12;
  qe(
    s,
    n,
    i,
    [
      [M + 0.35, A - 0.4],
      [M + 0.35, A + 0.3],
      [E, A + 0.35],
    ],
    48,
    p,
  );
  let P = ((2 * Math.PI * E) / R) * 0.58;
  for (let C = 0; C < R; C++) {
    let I = -(C / R) * Math.PI * 2,
      L = P / E / 2,
      F = Math.PI / R,
      O = I + L,
      B = I + 2 * F - L,
      H = [];
    for (let V of [O, B]) H.push(V);
    let N = (V, $, J) => [n + Math.cos(V) * $, J, i + Math.sin(V) * $],
      D = I - L,
      U = I - 2 * F + L;
    (s.quad(
      N(D, E, A),
      N(U, E, A),
      N(U, E, T),
      N(D, E, T),
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      p,
    ),
      s.quad(
        N(U, E, A),
        N(U, E - 0.9, A),
        N(U, E - 0.9, T),
        N(U, E, T),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        p,
      ),
      s.quad(
        N(D, E - 0.9, A),
        N(D, E, A),
        N(D, E, T),
        N(D, E - 0.9, T),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        p,
      ));
    let G = T - P / 2 - 0.2,
      W = 8;
    for (let V = 0; V < W; V++) {
      let $ = V / W,
        J = (V + 1) / W,
        X = I + L - 2 * L * $,
        tt = I + L - 2 * L * J,
        Z = G + (Math.sin($ * Math.PI) * P) / 2,
        q = G + (Math.sin(J * Math.PI) * P) / 2;
      (s.quad(
        N(X, E, Z),
        N(tt, E, q),
        N(tt, E, T),
        N(X, E, T),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        p,
      ),
        s.quad(
          N(tt, E, q),
          N(X, E, Z),
          N(X, E - 0.9, Z),
          N(tt, E - 0.9, q),
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          p,
        ));
    }
  }
  (qe(
    s,
    n,
    i,
    [
      [E - 0.9, A],
      [E - 0.9, T],
    ],
    48,
    Tn(ln.LIGHT, 0, 0.16, 0.13, 0.1),
  ),
    qe(
      s,
      n,
      i,
      [
        [E, T],
        [E + 0.55, T + 0.35],
        [E + 0.55, T + 0.9],
        [E + 0.2, T + 1],
        [E + 0.2, T + 2.5],
        [E + 0.5, T + 2.7],
        [E + 0.5, T + 3],
        [E - 0.3, T + 3.05],
      ],
      64,
      p,
    ),
    qe(
      s,
      n,
      i,
      [
        [E - 0.3, T + 3.05],
        [E - 0.3, T + 2.6],
        [0.01, T + 2.6],
      ],
      32,
      We(we.granite, 0.6),
    ),
    ss(
      s,
      n - 0.25,
      T + 3.05,
      i - 0.25,
      n + 0.25,
      T + 3.5,
      i + 0.25,
      wn(1, 0.05, 0.02),
    ));
  {
    let C = Lt(Ct.stone, 0.085, 0.085, 0.09),
      I = Lt(Ct.stone, 0.42, 0.41, 0.39),
      L = (D, U) => $t(D, U) + Ze + 0.03,
      F = 40,
      O = [u, d];
    if (!c) {
      let D = O.map((G) => {
          let W = [];
          for (let V = 0; V < F; V++) {
            let $ = -(V / F) * Math.PI * 2,
              J = h + Math.cos($) * G,
              X = f + Math.sin($) * G;
            W.push([J, L(J, X), X]);
          }
          return W;
        }),
        U = new Be();
      for (let G = 0; G < F; G++) {
        let W = D[0][G],
          V = D[0][(G + 1) % F],
          $ = D[1][(G + 1) % F],
          J = D[1][G];
        oe(s, [W, V, $, J], C, [0, 1, 0], (X) => [X[0], X[2]]);
      }
    }
    let B = $t(h, f) + Ze + 0.2;
    (qe(
      s,
      h,
      f,
      [
        [d, B - 0.6],
        [d, B],
        [d - 0.5, B],
      ],
      40,
      I,
    ),
      fc(s, h, B, f, d - 0.5, 40, We(we.lawn, 0.8, 0.9, 0.75)),
      ss(
        s,
        h - 1.6,
        B - 0.3,
        f - 1.6,
        h + 1.6,
        B + 0.5,
        f + 1.6,
        We(we.polgranite, 0.75),
      ),
      ss(
        s,
        h - 1.2,
        B + 0.5,
        f - 1.2,
        h + 1.2,
        B + 3.2,
        f + 1.2,
        We(we.polgranite, 0.75),
      ),
      ss(
        s,
        h - 1.4,
        B + 3.2,
        f - 1.4,
        h + 1.4,
        B + 3.5,
        f + 1.4,
        We(we.polgranite, 0.75),
      ));
    let H = We(we.bronze, 0.75),
      N = B + 3.5;
    if (
      (qe(
        s,
        h,
        f,
        [
          [0.62, N],
          [0.66, N + 0.5],
          [0.55, N + 1.2],
          [0.42, N + 1.9],
          [0.5, N + 2.5],
          [0.55, N + 2.9],
          [0.28, N + 3.15],
          [0.16, N + 3.25],
        ],
        12,
        H,
      ),
      qe(
        s,
        h,
        f,
        [
          [0.16, N + 3.2],
          [0.2, N + 3.35],
          [0.21, N + 3.55],
          [0.14, N + 3.75],
          [0.02, N + 3.8],
        ],
        10,
        H,
      ),
      Ce(
        s,
        [h - 0.5, N + 2.7, f + 0.15],
        [h - 0.95, N + 1.9, f + 0.35],
        0.12,
        H,
        5,
        !0,
      ),
      Ce(
        s,
        [h - 0.95, N + 1.85, f + 0.35],
        [h - 1.05, N + 0.2, f + 0.45],
        0.05,
        H,
        4,
        !0,
      ),
      Ce(
        s,
        [h + 0.5, N + 2.7, f - 0.1],
        [h + 0.7, N + 2, f - 0.3],
        0.12,
        H,
        5,
        !0,
      ),
      o.colliders.push({ t: "circ", x: h, z: f, r: d }),
      !c)
    )
      for (let D = 0; D < F; D++) {
        let U = -(D / F) * Math.PI * 2,
          G = -((D + 1) / F) * Math.PI * 2,
          W = u + 0.25,
          V = h + Math.cos(U) * W,
          $ = f + Math.sin(U) * W,
          J = h + Math.cos(G) * W,
          X = f + Math.sin(G) * W;
        s.wall(
          V,
          $,
          J,
          X,
          $t(V, $),
          $t(J, X),
          $t(V, $) + Ze + 0.15,
          $t(J, X) + Ze + 0.15,
          I,
        );
      }
    c ||
      _l(
        s,
        n + a + 2.5,
        i - 3,
        h - u + 0.5,
        i + 3,
        3,
        (D, U) => $t(D, U) + Ze + 0.04,
        C,
      );
  }
  for (let C = 0, I = 0; C < 200 && I < 22 && !c; C++) {
    let L = e.x0 + 3 + js(C, 5, 17) * (e.x1 - e.x0 - 6),
      F = e.z0 + 3 + js(C, 6, 17) * (e.z1 - e.z0 - 6);
    (Math.abs(L - n) < a + 7 && Math.abs(F - i) < a + 7) ||
      Math.hypot(L - h, F - f) < u + 4 ||
      (Math.abs(F - i) < 5 && L < h && L > n) ||
      (o.inst.push({
        kind: "tree",
        x: L,
        y: $t(L, F) + Ze,
        z: F,
        rot: js(C, 7) * 6.28,
        scale: 1.3 + 0.6 * js(C, 8),
      }),
      o.colliders.push({ t: "circ", x: L, z: F, r: 0.4 }),
      I++);
  }
  vn(o.group, s, t.lm, "CoitTower");
}
