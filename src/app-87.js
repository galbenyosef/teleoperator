// app 87 — math
// Lines 73447-74093 of readable/app.pretty.js (statement-aligned).
function kP(o, t) {
  if (o._fm !== void 0) return o._fm;
  let e = null;
  for (let N of o.seawall) {
    let [D, U] = iq(N, ...cpt),
      [G, W] = iq(N, ...hpt);
    if (!(U > 8 || W > 8 || D >= G)) {
      e = [];
      for (let V = D; V <= G; V++) e.push([N[V * 2], N[V * 2 + 1]]);
      break;
    }
  }
  if (!e) return ((o._fm = null), null);
  let s = [...e, ..._k.slice(1, -1)],
    n = s.flat(),
    i = 1e9,
    a = 1e9,
    r = -1e9,
    l = -1e9;
  for (let [N, D] of s)
    ((i = Math.min(i, N)),
      (r = Math.max(r, N)),
      (a = Math.min(a, D)),
      (l = Math.max(l, D)));
  let c = (N, D) => N >= i && N <= r && D >= a && D <= l && rn(n, N, D),
    h = [];
  for (let N = 0; N < o.bld.n; N++) {
    let D = Number(o.bld.seed[N]);
    if (!Mk[D] && !Sk[D] && !MP.includes(D)) continue;
    let U = o.bld.bRing[N],
      G = Array.from(
        o.bld.pts.subarray(o.bld.rStart[U] * 2, o.bld.rStart[U + 1] * 2),
      );
    h.push({ R: G, bb: sw(nw(G)) });
  }
  let f = (N, D) =>
      h.some(
        (U) =>
          N > U.bb[0] - 2 &&
          N < U.bb[2] + 2 &&
          D > U.bb[1] - 2 &&
          D < U.bb[3] + 2 &&
          (rn(U.R, N, D) || Hm(U.R, N, D) < 2),
      ),
    u = 3,
    d = i - 6,
    p = a - 6,
    m = Math.ceil((r - d + 6) / u) + 1,
    g = Math.ceil((l - p + 6) / u) + 1,
    b = new Float32Array(m * g).fill(NaN),
    v = new Uint8Array(m * g);
  for (let N = 0; N < g; N++) {
    let D = p + N * u,
      U = [];
    for (let G = 0, W = n.length - 2; G < n.length; W = G, G += 2) {
      let V = n[W + 1],
        $ = n[G + 1];
      V > D != $ > D && U.push(n[W] + ((D - V) / ($ - V)) * (n[G] - n[W]));
    }
    U.sort((G, W) => G - W);
    for (let G = 0; G + 1 < U.length; G += 2)
      for (
        let W = Math.max(0, Math.ceil((U[G] - d) / u));
        W < m && d + W * u <= U[G + 1];
        W++
      )
        v[N * m + W] = 1;
  }
  for (let N = 0; N < g; N++)
    for (let D = 0; D < m; D++) {
      let U = d + D * u,
        G = p + N * u;
      if (!v[N * m + D]) continue;
      let W = t.terrainAt(U, G);
      W >= 4.6 && W < 8.2 && !f(U, G) && zk(SP, U, G) > 5 && (b[N * m + D] = W);
    }
  {
    let N = [];
    for (let D = 0; D < b.length; D++) isNaN(b[D]) || N.push(D);
    for (; N.length;) {
      let D = [];
      for (let U of N) {
        let G = U % m,
          W = (U - G) / m;
        for (let [V, $] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          let J = G + V,
            X = W + $;
          if (J < 0 || X < 0 || J >= m || X >= g) continue;
          let tt = X * m + J;
          isNaN(b[tt]) && ((b[tt] = 1 / 0), D.push(tt));
        }
      }
      for (let U of D) {
        let G = U % m,
          W = (U - G) / m,
          V = 0,
          $ = 0;
        for (let [J, X] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          let tt = G + J,
            Z = W + X;
          if (tt < 0 || Z < 0 || tt >= m || Z >= g) continue;
          let q = b[Z * m + tt];
          isFinite(q) && ((V += q), $++);
        }
        b[U] = $ ? V / $ : NaN;
      }
      N = D.filter((U) => !isNaN(b[U]));
    }
  }
  for (let N = 0; N < b.length; N++) isNaN(b[N]) && (b[N] = 5.2);
  for (let N = 0; N < 3; N++) {
    let D = b.slice();
    for (let U = 1; U < g - 1; U++)
      for (let G = 1; G < m - 1; G++) {
        let W = 0;
        for (let V = -1; V <= 1; V++)
          for (let $ = -1; $ <= 1; $++) W += b[(U + V) * m + G + $];
        D[U * m + G] = W / 9;
      }
    b = D;
  }
  for (let N = 0; N < b.length; N++) b[N] = Math.max(4.9, b[N]);
  let x = 0,
    y = 0;
  for (let N = 0.1; N <= 0.9; N += 0.1) {
    let D = Vb[0][0] + (Vb[1][0] - Vb[0][0]) * N,
      U = Vb[0][1] + 1.5,
      G = t.driveHeight(D, U);
    t.surfaceAt(D, U) === "walk" && ((x += G), y++);
  }
  x = y ? x / y : 7.3;
  let M = (N, D) => {
      let U = Math.max(0, Math.min(m - 1.001, (N - d) / u)),
        G = Math.max(0, Math.min(g - 1.001, (D - p) / u)),
        W = Math.floor(U),
        V = Math.floor(G),
        $ = U - W,
        J = G - V,
        X = V * m + W;
      return (
        (b[X] * (1 - $) + b[X + 1] * $) * (1 - J) +
        (b[X + m] * (1 - $) + b[X + m + 1] * $) * J
      );
    },
    S = (N, D) => {
      let U = zk(Vb, N, D),
        G = M(N, D);
      if (U >= 16) return G;
      let W = U / 16,
        V = W * W * (3 - 2 * W);
      return x + (G - x) * V;
    },
    w = {
      poly: s,
      flat: n,
      ring: e,
      bb: [i, a, r, l],
      inPad: c,
      yAt: S,
      cap: dpt,
      entrance: Vb,
      entranceY: x,
      land: _k,
      meadow: Hu,
    },
    _ = o.bld,
    z = [],
    A = [],
    T = [],
    E = [],
    R = [],
    P = null;
  for (let N = 0; N < _.n; N++) {
    let D = Number(_.seed[N]),
      U = _.bRing[N],
      G = _.rStart[U] * 2;
    if (
      !Mk[D] &&
      !Sk[D] &&
      D !== nq &&
      !MP.includes(D) &&
      !(
        _.pts[G] > xp[0] - 60 &&
        _.pts[G] < xp[2] + 60 &&
        _.pts[G + 1] > xp[1] - 60 &&
        _.pts[G + 1] < xp[3] + 60
      )
    )
      continue;
    let W = Array.from(_.pts.subarray(G, _.rStart[U + 1] * 2)),
      V = nw(W),
      $ = 0,
      J = 0;
    for (let tt of V) (($ += tt[0] / V.length), (J += tt[1] / V.length));
    let X = {
      id: D,
      i: N,
      ring: W,
      P: V,
      c: [$, J],
      h: _.bF[N * 3 + 1] - _.bF[N * 3],
      base: _.bF[N * 3],
    };
    Mk[D]
      ? ((X.n = Mk[D]), z.push(X), R.push(D))
      : Sk[D]
        ? ((X.n = Sk[D]), A.push(X), R.push(D))
        : D === nq
          ? ((P = X), R.push(D))
          : MP.includes(D)
            ? (T.push(X), R.push(D))
            : !fpt.has(D) &&
              $ > xp[0] &&
              $ < xp[2] &&
              J > xp[1] &&
              J < xp[3] &&
              X.h > 2.5 &&
              V.length >= 4 &&
              (E.push(X), R.push(D));
  }
  w.ids = R;
  let C = (N) => {
      let D = 1e9;
      for (let U of N.P) D = Math.min(D, S(U[0], U[1]));
      return D;
    },
    I = {
      1: { He: 10.6, pitch: 0.3 },
      2: { He: 11.2, pitch: 0.3 },
      3: { He: 11, pitch: 0.26 },
    };
  for (let N of z) {
    let D = ew(N.P);
    (D.d[1] > 0 && (D.d = [-D.d[0], -D.d[1]]),
      (N.o = D),
      (N.y = C(N)),
      (N.He = I[N.n].He),
      (N.rise = D.hw * I[N.n].pitch),
      (N.head = [D.c[0] - D.d[0] * D.hl, D.c[1] - D.d[1] * D.hl]));
  }
  z.sort((N, D) => N.n.localeCompare(D.n));
  for (let N of A)
    ((N.o = ew(N.P)),
      (N.y = C(N)),
      (N.He = N.n === "A" ? 9.6 : 12.6),
      (N.rise = Math.min(3.4, N.o.hw * 0.42)));
  A.sort((N, D) => N.n.localeCompare(D.n));
  for (let N of T)
    ((N.o = ew(N.P)),
      (N.y = N.P.every((D) => c(...D))
        ? C(N)
        : Math.min(...N.P.map((D) => t.terrainAt(...D)))),
      (N.He =
        N.id === 858625782 || N.id === 641730766 || N.id === 856437188
          ? 3.2
          : N.id === 1297982561
            ? 3
            : 5.6),
      (N.rise = Math.min(2.2, N.o.hw * 0.5)),
      (N.gate = N.He < 4));
  for (let N of E) {
    let [D, U] = N.c;
    N.o = ew(N.P);
    let G = 1e9;
    for (let $ of N.P) G = Math.min(G, t.terrainAt($[0], $[1]));
    N.y = Math.min(G, N.base > 0 ? N.base : G);
    let W = Math.max(1, Math.min(3, Math.round(N.h / 3.6)));
    ((N.He = Math.max(3.2, W * 3.4)), (N.rise = Math.min(3.6, N.o.hw * 0.55)));
    let V = Hm(Hu, D, U) < 45 || rn(Hu, D, U);
    N.kind =
      N.id === 288387353 || (N.o.hl > 22 && W >= 2)
        ? "hall"
        : (V && N.o.hl < 22) || E0(N.id, 3) < 0.15
          ? "mission"
          : "house";
  }
  if (
    ((w.sheds = z),
    (w.wh = A),
    (w.small = T),
    (w.upper = E),
    (w.bridges = []),
    P)
  ) {
    let N = ew(P.P);
    w.bridges.push({
      c: N.c,
      d: N.d,
      hl: N.hl + 0.6,
      hw: N.hw,
      y0: C(P) + 4.4,
      y1: C(P) + 12.2,
    });
  }
  {
    let N = A.find((U) => U.n === "B"),
      D = A.find((U) => U.n === "C");
    if (N && D) {
      let U = Math.min(N.y, D.y);
      w.bridges.push({
        c: [-3355.6, -1238],
        d: [-0.986, -0.165],
        hl: 6.2,
        hw: 2.4,
        y0: U + 4.4,
        y1: U + 12.2,
      });
    }
  }
  let L = (w.colliders = []);
  for (let N of [...z, ...A, ...T])
    L.push({
      t: "poly",
      pts: Float32Array.from(N.ring),
      bb: sw(N.P),
      y0: N.y - 3,
      y1: N.y + N.He + 8,
      fm: !0,
    });
  for (let N of E)
    L.push({
      t: "poly",
      pts: Float32Array.from(N.ring),
      bb: sw(N.P),
      y0: N.y - 3,
      y1: N.y + N.He + 8,
      fm: !0,
    });
  let F = (N, D, U = 0) =>
    [...z, ...A, ...T].some((G) => {
      let W = sw(G.P);
      return (
        N > W[0] - U &&
        N < W[2] + U &&
        D > W[1] - U &&
        D < W[3] + U &&
        (rn(G.ring, N, D) || (U > 0 && Hm(G.ring, N, D) < U))
      );
    });
  ((w.inBld = F), (w.docks = []));
  for (let N of A) {
    let { c: D, d: U, hl: G, hw: W } = N.o,
      V = [-U[1], U[0]];
    for (let $ of [-1, 1]) {
      let J = [D[0] + V[0] * $ * (W + 1.6), D[1] + V[1] * $ * (W + 1.6)],
        X = 0;
      for (let Z of [-0.6, 0, 0.6]) {
        let q = J[0] + U[0] * G * Z + V[0] * $ * 6,
          j = J[1] + U[1] * G * Z + V[1] * $ * 6;
        c(q, j) && !F(q, j, 0.5) && X++;
      }
      if (X < 3 || (N.n === "A" && $ * V[0] > 0 && !1)) continue;
      let tt = {
        q: N,
        c: J,
        d: U,
        w: [V[0] * $, V[1] * $],
        hl: G - 1.5,
        hw: 1.5,
        y: N.y + 1.1,
      };
      (w.docks.push(tt),
        L.push({
          t: "obb",
          x: J[0],
          z: J[1],
          hx: 1.5,
          hz: G - 1.5,
          c: U[1],
          s: U[0],
          y0: N.y - 2,
          y1: N.y + 4.6,
          fm: !0,
        }));
    }
  }
  let O = (N, D, U = 0) =>
      w.docks.some((G) => {
        let W = N - G.c[0],
          V = D - G.c[1],
          $ = W * G.d[0] + V * G.d[1],
          J = W * G.w[0] + V * G.w[1];
        return Math.abs($) < G.hl + U && Math.abs(J) < G.hw + U;
      }),
    B = (N, D) => Math.min(...kk.map((U) => zk(U, N, D)));
  ((w.stalls = []), (w.cars = []), (w.lamps = []));
  let H = (N, D, U, G) => {
    for (let [W, V] of [
      [-1.3, -2.65],
      [1.3, -2.65],
      [1.3, 2.65],
      [-1.3, 2.65],
      [0, 0],
    ]) {
      let $ = N + U[0] * W + G[0] * V,
        J = D + U[1] * W + G[1] * V;
      if (
        !c($, J) ||
        Hm(n, $, J) < 1.2 ||
        F($, J, 0.8) ||
        O($, J, 0.6) ||
        B($, J) < 4.3
      )
        return !1;
    }
    return !0;
  };
  for (let [N, D, U = [-1, 1]] of upt) {
    let G = Math.hypot(D[0] - N[0], D[1] - N[1]),
      W = [(D[0] - N[0]) / G, (D[1] - N[1]) / G],
      V = [-W[1], W[0]];
    for (let $ of U)
      for (let J = 1.5; J < G - 1.2; J += 2.6) {
        let X = N[0] + W[0] * J + V[0] * $ * 6.15,
          tt = N[1] + W[1] * J + V[1] * $ * 6.15,
          Z = [V[0] * $, V[1] * $];
        if (
          !H(X, tt, W, Z) ||
          w.stalls.some((j) => Math.hypot(j.x - X, j.z - tt) < 2.4)
        )
          continue;
        let q = { x: X, z: tt, u: W, v: Z, y: S(X, tt) };
        (w.stalls.push(q),
          E0(X, tt) < 0.78 &&
            w.cars.push({
              x: X,
              z: tt,
              rot: Math.atan2(Z[0], Z[1]) + (E0(tt, X) < 0.5 ? Math.PI : 0),
              y: q.y,
              color: E0(X * 1.7, tt),
              type: ((j) => (j < 0.5 ? 0 : j < 0.7 ? 1 : j < 0.92 ? 2 : 3))(
                E0(tt * 1.3, X),
              ),
            }));
      }
    for (let [$, J] of [
      [N, -1],
      [D, 1],
    ]) {
      let X = $[0] + W[0] * J * 2 + V[0] * 3.9,
        tt = $[1] + W[1] * J * 2 + V[1] * 3.9;
      c(X, tt) &&
        !F(X, tt, 1) &&
        !O(X, tt, 0.5) &&
        B(X, tt) > 4 &&
        !w.lamps.some((Z) => Math.hypot(Z[0] - X, Z[1] - tt) < 14) &&
        w.lamps.push([X, tt]);
    }
  }
  for (let N = 0; N + 1 < kk[1].length; N++) {
    let [D, U] = kk[1][N],
      [G, W] = kk[1][N + 1],
      V = Math.hypot(G - D, W - U),
      $ = -(W - U) / V,
      J = (G - D) / V;
    for (let X of [1, -1]) {
      let tt = (D + G) / 2 + $ * X * 7,
        Z = (U + W) / 2 + J * X * 7;
      c(tt, Z) &&
        Hm(n, tt, Z) < 4 &&
        B(tt, Z) > 5.5 &&
        !F(tt, Z, 1) &&
        !w.lamps.some((q) => Math.hypot(q[0] - tt, q[1] - Z) < 26) &&
        w.lamps.push([tt, Z]);
    }
  }
  for (let [N, D] of w.lamps)
    L.push({
      t: "circ",
      x: N,
      z: D,
      r: 0.22,
      y0: S(N, D) - 1,
      y1: S(N, D) + 8,
      fm: !0,
    });
  for (let N of w.cars) N.y = S(N.x, N.z);
  w.wall = [];
  {
    let N = _k.slice(4),
      D = 0;
    for (let U = 0; U + 1 < N.length; U++) {
      let G = N[U],
        W = N[U + 1],
        V = Math.hypot(W[0] - G[0], W[1] - G[1]),
        $ = df(n, G, W);
      for (let J = 0; J < V - 1e-6; J += 2) {
        let X = Math.min(V, J + 2),
          tt = [G[0] + ((W[0] - G[0]) * J) / V, G[1] + ((W[1] - G[1]) * J) / V],
          Z = [G[0] + ((W[0] - G[0]) * X) / V, G[1] + ((W[1] - G[1]) * X) / V],
          q = [(tt[0] + Z[0]) / 2, (tt[1] + Z[1]) / 2],
          j = S(q[0], q[1]),
          K = t.terrainAt(q[0] + $[0] * 9, q[1] + $[1] * 9);
        w.wall.push({
          a: tt,
          b: Z,
          n: $,
          y: j,
          top: Math.max(j + 1.4, Math.min(j + 7.5, K)),
          u: D + J,
        });
      }
      D += V;
    }
  }
  {
    let N = w.wall.map((D) => D.top);
    w.wall.forEach((D, U) => {
      let G = 0,
        W = 0;
      for (let V = Math.max(0, U - 3); V <= Math.min(N.length - 1, U + 3); V++)
        ((G += N[V]), W++);
      D.top = Math.max(D.y + 1.4, G / W);
    });
  }
  {
    let N = o.terrain,
      [D, U, G, W] = sw(SP).map((V, $) => V + ($ < 2 ? -12 : 12));
    for (
      let V = Math.max(0, Math.floor((U - N.z0) / N.step));
      V <= Math.min(N.nz - 1, Math.ceil((W - N.z0) / N.step));
      V++
    )
      for (
        let $ = Math.max(0, Math.floor((D - N.x0) / N.step));
        $ <= Math.min(N.nx - 1, Math.ceil((G - N.x0) / N.step));
        $++
      ) {
        let J = N.x0 + $ * N.step,
          X = N.z0 + V * N.step;
        if (c(J, X)) continue;
        let tt = zk(SP, J, X);
        if (tt > 9.5) continue;
        let Z = null,
          q = 1e9;
        for (let nt of w.wall) {
          let Q = Math.hypot(
            (nt.a[0] + nt.b[0]) / 2 - J,
            (nt.a[1] + nt.b[1]) / 2 - X,
          );
          Q < q && ((q = Q), (Z = nt));
        }
        if (!Z || q > 12) continue;
        let j = V * N.nx + $,
          K = Z.top - 0.2 - Math.max(0, tt - 8) * 0.3;
        N.h[j] < K && (N.h[j] = K);
      }
  }
  ((w.stairs = ppt.map(([N, D]) => {
    let U = c(...N) ? S(...N) : t.terrainAt(...N),
      G = t.terrainAt(...D);
    return { a: N, b: D, ya: U, yb: G };
  })),
    (w.trees = []));
  {
    let N = nw(Hu),
      D = 0;
    for (let U = 0; U < N.length; U++) {
      let G = N[U],
        W = N[(U + 1) % N.length],
        V = Math.hypot(W[0] - G[0], W[1] - G[1]),
        $ = df(Hu, G, W);
      for (let J = (13 - (D % 13)) % 13; J < V; J += 13) {
        let X = G[0] + ((W[0] - G[0]) * J) / V - $[0] * (4 + E0(J, U) * 6),
          tt = G[1] + ((W[1] - G[1]) * J) / V - $[1] * (4 + E0(U, J) * 6),
          Z = E0(X, tt),
          q = tt < -1080 || X < -3300;
        (!q && Z < 0.45) ||
          (q && Z < 0.22) ||
          (rn(Hu, X, tt) &&
            w.trees.push({
              x: X,
              z: tt,
              sp: q
                ? Z < 0.8
                  ? "cypress"
                  : "pine"
                : Z < 0.55
                  ? "cypress"
                  : Z < 0.8
                    ? "euc"
                    : "pine",
              scale: 0.95 + E0(tt, X) * 0.5,
            }));
      }
      D += V;
    }
    for (let [U, G] of [
      [-3236, -1032],
      [-3229, -1027],
      [-3243, -1025],
      [-3170, -1090],
      [-3164, -1097],
    ])
      w.trees.push({ x: U, z: G, sp: "palm", scale: 1 + E0(U, G) * 0.2 });
    for (let [U, G] of [
      [-3290, -1010],
      [-3150, -1160],
      [-3260, -940],
      [-3120, -1090],
    ])
      for (let W = 0; W < 3; W++)
        w.trees.push({
          x: U + (E0(W, U) - 0.5) * 12,
          z: G + (E0(G, W) - 0.5) * 12,
          sp: W ? "cypress" : "pine",
          scale: 1 + E0(W, G) * 0.4,
        });
    for (let U of w.trees) U.y = t.terrainAt(U.x, U.z);
  }
  return (
    (w.benches = [
      [-3203, -1003, -0.6],
      [-3172, -1058, -0.9],
      [-3108, -1064, -0.4],
      [-3218, -982, -0.7],
      [-3160, -1100, -1],
      [-3125, -1050, -0.5],
    ].map(([N, D, U]) => ({ x: N, z: D, a: U, y: t.terrainAt(N, D) }))),
    (w.statue = [-3236, -1100]),
    (w.statueY = t.terrainAt(-3236, -1100)),
    (w.cove = {
      gang: [
        [-3405.5, -1196],
        [-3420, -1199],
      ],
      main: [
        [-3423, -1168],
        [-3436, -1252],
      ],
      fingers: 7,
    }),
    (w.inMeadow = (N, D) => rn(Hu, N, D)),
    (o._fm = w),
    w
  );
}
