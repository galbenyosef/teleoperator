// app 88 — math
// Lines 73213-73859 of readable/app.pretty.js (statement-aligned).
function XR(i, t) {
  if (i._fm !== void 0) return i._fm;
  let e = null;
  for (let O of i.seawall) {
    let [D, U] = sW(O, ...Ght),
      [G, q] = sW(O, ...Wht);
    if (!(U > 8 || q > 8 || D >= G)) {
      e = [];
      for (let W = D; W <= G; W++) e.push([O[W * 2], O[W * 2 + 1]]);
      break;
    }
  }
  if (!e) return ((i._fm = null), null);
  let s = [...e, ...kS.slice(1, -1)],
    n = s.flat(),
    o = 1e9,
    a = 1e9,
    r = -1e9,
    l = -1e9;
  for (let [O, D] of s)
    ((o = Math.min(o, O)),
      (r = Math.max(r, O)),
      (a = Math.min(a, D)),
      (l = Math.max(l, D)));
  let c = (O, D) => O >= o && O <= r && D >= a && D <= l && en(n, O, D),
    h = [];
  for (let O = 0; O < i.bld.n; O++) {
    let D = Number(i.bld.seed[O]);
    if (!yS[D] && !wS[D] && !VR.includes(D)) continue;
    let U = i.bld.bRing[O],
      G = Array.from(
        i.bld.pts.subarray(i.bld.rStart[U] * 2, i.bld.rStart[U + 1] * 2),
      );
    h.push({ R: G, bb: ry(ly(G)) });
  }
  let f = (O, D) =>
      h.some(
        (U) =>
          O > U.bb[0] - 2 &&
          O < U.bb[2] + 2 &&
          D > U.bb[1] - 2 &&
          D < U.bb[3] + 2 &&
          (en(U.R, O, D) || tm(U.R, O, D) < 2),
      ),
    u = 3,
    d = o - 6,
    p = a - 6,
    m = Math.ceil((r - d + 6) / u) + 1,
    g = Math.ceil((l - p + 6) / u) + 1,
    b = new Float32Array(m * g).fill(NaN),
    x = new Uint8Array(m * g);
  for (let O = 0; O < g; O++) {
    let D = p + O * u,
      U = [];
    for (let G = 0, q = n.length - 2; G < n.length; q = G, G += 2) {
      let W = n[q + 1],
        V = n[G + 1];
      W > D != V > D && U.push(n[q] + ((D - W) / (V - W)) * (n[G] - n[q]));
    }
    U.sort((G, q) => G - q);
    for (let G = 0; G + 1 < U.length; G += 2)
      for (
        let q = Math.max(0, Math.ceil((U[G] - d) / u));
        q < m && d + q * u <= U[G + 1];
        q++
      )
        x[O * m + q] = 1;
  }
  for (let O = 0; O < g; O++)
    for (let D = 0; D < m; D++) {
      let U = d + D * u,
        G = p + O * u;
      if (!x[O * m + D]) continue;
      let q = t.terrainAt(U, G);
      q >= 4.6 && q < 8.2 && !f(U, G) && SS($R, U, G) > 5 && (b[O * m + D] = q);
    }
  {
    let O = [];
    for (let D = 0; D < b.length; D++) isNaN(b[D]) || O.push(D);
    for (; O.length;) {
      let D = [];
      for (let U of O) {
        let G = U % m,
          q = (U - G) / m;
        for (let [W, V] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          let Y = G + W,
            $ = q + V;
          if (Y < 0 || $ < 0 || Y >= m || $ >= g) continue;
          let st = $ * m + Y;
          isNaN(b[st]) && ((b[st] = 1 / 0), D.push(st));
        }
      }
      for (let U of D) {
        let G = U % m,
          q = (U - G) / m,
          W = 0,
          V = 0;
        for (let [Y, $] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          let st = G + Y,
            Q = q + $;
          if (st < 0 || Q < 0 || st >= m || Q >= g) continue;
          let j = b[Q * m + st];
          isFinite(j) && ((W += j), V++);
        }
        b[U] = V ? W / V : NaN;
      }
      O = D.filter((U) => !isNaN(b[U]));
    }
  }
  for (let O = 0; O < b.length; O++) isNaN(b[O]) && (b[O] = 5.2);
  for (let O = 0; O < 3; O++) {
    let D = b.slice();
    for (let U = 1; U < g - 1; U++)
      for (let G = 1; G < m - 1; G++) {
        let q = 0;
        for (let W = -1; W <= 1; W++)
          for (let V = -1; V <= 1; V++) q += b[(U + W) * m + G + V];
        D[U * m + G] = q / 9;
      }
    b = D;
  }
  for (let O = 0; O < b.length; O++) b[O] = Math.max(4.9, b[O]);
  let v = 0,
    y = 0;
  for (let O = 0.1; O <= 0.9; O += 0.1) {
    let D = eb[0][0] + (eb[1][0] - eb[0][0]) * O,
      U = eb[0][1] + 1.5,
      G = t.driveHeight(D, U);
    t.surfaceAt(D, U) === "walk" && ((v += G), y++);
  }
  v = y ? v / y : 7.3;
  let M = (O, D) => {
      let U = Math.max(0, Math.min(m - 1.001, (O - d) / u)),
        G = Math.max(0, Math.min(g - 1.001, (D - p) / u)),
        q = Math.floor(U),
        W = Math.floor(G),
        V = U - q,
        Y = G - W,
        $ = W * m + q;
      return (
        (b[$] * (1 - V) + b[$ + 1] * V) * (1 - Y) +
        (b[$ + m] * (1 - V) + b[$ + m + 1] * V) * Y
      );
    },
    S = (O, D) => {
      let U = SS(eb, O, D),
        G = M(O, D);
      if (U >= 16) return G;
      let q = U / 16,
        W = q * q * (3 - 2 * q);
      return v + (G - v) * W;
    },
    w = {
      poly: s,
      flat: n,
      ring: e,
      bb: [o, a, r, l],
      inPad: c,
      yAt: S,
      cap: Vht,
      entrance: eb,
      entranceY: v,
      land: kS,
      meadow: iu,
    },
    z = i.bld,
    _ = [],
    R = [],
    T = [],
    E = [],
    A = [],
    C = null;
  for (let O = 0; O < z.n; O++) {
    let D = Number(z.seed[O]),
      U = z.bRing[O],
      G = z.rStart[U] * 2;
    if (
      !yS[D] &&
      !wS[D] &&
      D !== eW &&
      !VR.includes(D) &&
      !(
        z.pts[G] > Hd[0] - 60 &&
        z.pts[G] < Hd[2] + 60 &&
        z.pts[G + 1] > Hd[1] - 60 &&
        z.pts[G + 1] < Hd[3] + 60
      )
    )
      continue;
    let q = Array.from(z.pts.subarray(G, z.rStart[U + 1] * 2)),
      W = ly(q),
      V = 0,
      Y = 0;
    for (let st of W) ((V += st[0] / W.length), (Y += st[1] / W.length));
    let $ = {
      id: D,
      i: O,
      ring: q,
      P: W,
      c: [V, Y],
      h: z.bF[O * 3 + 1] - z.bF[O * 3],
      base: z.bF[O * 3],
    };
    yS[D]
      ? (($.n = yS[D]), _.push($), A.push(D))
      : wS[D]
        ? (($.n = wS[D]), R.push($), A.push(D))
        : D === eW
          ? ((C = $), A.push(D))
          : VR.includes(D)
            ? (T.push($), A.push(D))
            : !qht.has(D) &&
              V > Hd[0] &&
              V < Hd[2] &&
              Y > Hd[1] &&
              Y < Hd[3] &&
              $.h > 2.5 &&
              W.length >= 4 &&
              (E.push($), A.push(D));
  }
  w.ids = A;
  let P = (O) => {
      let D = 1e9;
      for (let U of O.P) D = Math.min(D, S(U[0], U[1]));
      return D;
    },
    I = {
      1: { He: 10.6, pitch: 0.3 },
      2: { He: 11.2, pitch: 0.3 },
      3: { He: 11, pitch: 0.26 },
    };
  for (let O of _) {
    let D = ay(O.P);
    (D.d[1] > 0 && (D.d = [-D.d[0], -D.d[1]]),
      (O.o = D),
      (O.y = P(O)),
      (O.He = I[O.n].He),
      (O.rise = D.hw * I[O.n].pitch),
      (O.head = [D.c[0] - D.d[0] * D.hl, D.c[1] - D.d[1] * D.hl]));
  }
  _.sort((O, D) => O.n.localeCompare(D.n));
  for (let O of R)
    ((O.o = ay(O.P)),
      (O.y = P(O)),
      (O.He = O.n === "A" ? 9.6 : 12.6),
      (O.rise = Math.min(3.4, O.o.hw * 0.42)));
  R.sort((O, D) => O.n.localeCompare(D.n));
  for (let O of T)
    ((O.o = ay(O.P)),
      (O.y = O.P.every((D) => c(...D))
        ? P(O)
        : Math.min(...O.P.map((D) => t.terrainAt(...D)))),
      (O.He =
        O.id === 858625782 || O.id === 641730766 || O.id === 856437188
          ? 3.2
          : O.id === 1297982561
            ? 3
            : 5.6),
      (O.rise = Math.min(2.2, O.o.hw * 0.5)),
      (O.gate = O.He < 4));
  for (let O of E) {
    let [D, U] = O.c;
    O.o = ay(O.P);
    let G = 1e9;
    for (let V of O.P) G = Math.min(G, t.terrainAt(V[0], V[1]));
    O.y = Math.min(G, O.base > 0 ? O.base : G);
    let q = Math.max(1, Math.min(3, Math.round(O.h / 3.6)));
    ((O.He = Math.max(3.2, q * 3.4)), (O.rise = Math.min(3.6, O.o.hw * 0.55)));
    let W = tm(iu, D, U) < 45 || en(iu, D, U);
    O.kind =
      O.id === 288387353 || (O.o.hl > 22 && q >= 2)
        ? "hall"
        : (W && O.o.hl < 22) || u0(O.id, 3) < 0.15
          ? "mission"
          : "house";
  }
  if (
    ((w.sheds = _),
    (w.wh = R),
    (w.small = T),
    (w.upper = E),
    (w.bridges = []),
    C)
  ) {
    let O = ay(C.P);
    w.bridges.push({
      c: O.c,
      d: O.d,
      hl: O.hl + 0.6,
      hw: O.hw,
      y0: P(C) + 4.4,
      y1: P(C) + 12.2,
    });
  }
  {
    let O = R.find((U) => U.n === "B"),
      D = R.find((U) => U.n === "C");
    if (O && D) {
      let U = Math.min(O.y, D.y);
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
  for (let O of [..._, ...R, ...T])
    L.push({
      t: "poly",
      pts: Float32Array.from(O.ring),
      bb: ry(O.P),
      y0: O.y - 3,
      y1: O.y + O.He + 8,
      fm: !0,
    });
  for (let O of E)
    L.push({
      t: "poly",
      pts: Float32Array.from(O.ring),
      bb: ry(O.P),
      y0: O.y - 3,
      y1: O.y + O.He + 8,
      fm: !0,
    });
  let F = (O, D, U = 0) =>
    [..._, ...R, ...T].some((G) => {
      let q = ry(G.P);
      return (
        O > q[0] - U &&
        O < q[2] + U &&
        D > q[1] - U &&
        D < q[3] + U &&
        (en(G.ring, O, D) || (U > 0 && tm(G.ring, O, D) < U))
      );
    });
  ((w.inBld = F), (w.docks = []));
  for (let O of R) {
    let { c: D, d: U, hl: G, hw: q } = O.o,
      W = [-U[1], U[0]];
    for (let V of [-1, 1]) {
      let Y = [D[0] + W[0] * V * (q + 1.6), D[1] + W[1] * V * (q + 1.6)],
        $ = 0;
      for (let Q of [-0.6, 0, 0.6]) {
        let j = Y[0] + U[0] * G * Q + W[0] * V * 6,
          X = Y[1] + U[1] * G * Q + W[1] * V * 6;
        c(j, X) && !F(j, X, 0.5) && $++;
      }
      if ($ < 3 || (O.n === "A" && V * W[0] > 0 && !1)) continue;
      let st = {
        q: O,
        c: Y,
        d: U,
        w: [W[0] * V, W[1] * V],
        hl: G - 1.5,
        hw: 1.5,
        y: O.y + 1.1,
      };
      (w.docks.push(st),
        L.push({
          t: "obb",
          x: Y[0],
          z: Y[1],
          hx: 1.5,
          hz: G - 1.5,
          c: U[1],
          s: U[0],
          y0: O.y - 2,
          y1: O.y + 4.6,
          fm: !0,
        }));
    }
  }
  let N = (O, D, U = 0) =>
      w.docks.some((G) => {
        let q = O - G.c[0],
          W = D - G.c[1],
          V = q * G.d[0] + W * G.d[1],
          Y = q * G.w[0] + W * G.w[1];
        return Math.abs(V) < G.hl + U && Math.abs(Y) < G.hw + U;
      }),
    B = (O, D) => Math.min(...MS.map((U) => SS(U, O, D)));
  ((w.stalls = []), (w.cars = []), (w.lamps = []));
  let H = (O, D, U, G) => {
    for (let [q, W] of [
      [-1.3, -2.65],
      [1.3, -2.65],
      [1.3, 2.65],
      [-1.3, 2.65],
      [0, 0],
    ]) {
      let V = O + U[0] * q + G[0] * W,
        Y = D + U[1] * q + G[1] * W;
      if (
        !c(V, Y) ||
        tm(n, V, Y) < 1.2 ||
        F(V, Y, 0.8) ||
        N(V, Y, 0.6) ||
        B(V, Y) < 4.3
      )
        return !1;
    }
    return !0;
  };
  for (let [O, D, U = [-1, 1]] of jht) {
    let G = Math.hypot(D[0] - O[0], D[1] - O[1]),
      q = [(D[0] - O[0]) / G, (D[1] - O[1]) / G],
      W = [-q[1], q[0]];
    for (let V of U)
      for (let Y = 1.5; Y < G - 1.2; Y += 2.6) {
        let $ = O[0] + q[0] * Y + W[0] * V * 6.15,
          st = O[1] + q[1] * Y + W[1] * V * 6.15,
          Q = [W[0] * V, W[1] * V];
        if (
          !H($, st, q, Q) ||
          w.stalls.some((X) => Math.hypot(X.x - $, X.z - st) < 2.4)
        )
          continue;
        let j = { x: $, z: st, u: q, v: Q, y: S($, st) };
        (w.stalls.push(j),
          u0($, st) < 0.78 &&
            w.cars.push({
              x: $,
              z: st,
              rot: Math.atan2(Q[0], Q[1]) + (u0(st, $) < 0.5 ? Math.PI : 0),
              y: j.y,
              color: u0($ * 1.7, st),
              type: ((X) => (X < 0.5 ? 0 : X < 0.7 ? 1 : X < 0.92 ? 2 : 3))(
                u0(st * 1.3, $),
              ),
            }));
      }
    for (let [V, Y] of [
      [O, -1],
      [D, 1],
    ]) {
      let $ = V[0] + q[0] * Y * 2 + W[0] * 3.9,
        st = V[1] + q[1] * Y * 2 + W[1] * 3.9;
      c($, st) &&
        !F($, st, 1) &&
        !N($, st, 0.5) &&
        B($, st) > 4 &&
        !w.lamps.some((Q) => Math.hypot(Q[0] - $, Q[1] - st) < 14) &&
        w.lamps.push([$, st]);
    }
  }
  for (let O = 0; O + 1 < MS[1].length; O++) {
    let [D, U] = MS[1][O],
      [G, q] = MS[1][O + 1],
      W = Math.hypot(G - D, q - U),
      V = -(q - U) / W,
      Y = (G - D) / W;
    for (let $ of [1, -1]) {
      let st = (D + G) / 2 + V * $ * 7,
        Q = (U + q) / 2 + Y * $ * 7;
      c(st, Q) &&
        tm(n, st, Q) < 4 &&
        B(st, Q) > 5.5 &&
        !F(st, Q, 1) &&
        !w.lamps.some((j) => Math.hypot(j[0] - st, j[1] - Q) < 26) &&
        w.lamps.push([st, Q]);
    }
  }
  for (let [O, D] of w.lamps)
    L.push({
      t: "circ",
      x: O,
      z: D,
      r: 0.22,
      y0: S(O, D) - 1,
      y1: S(O, D) + 8,
      fm: !0,
    });
  for (let O of w.cars) O.y = S(O.x, O.z);
  w.wall = [];
  {
    let O = kS.slice(4),
      D = 0;
    for (let U = 0; U + 1 < O.length; U++) {
      let G = O[U],
        q = O[U + 1],
        W = Math.hypot(q[0] - G[0], q[1] - G[1]),
        V = Bh(n, G, q);
      for (let Y = 0; Y < W - 1e-6; Y += 2) {
        let $ = Math.min(W, Y + 2),
          st = [G[0] + ((q[0] - G[0]) * Y) / W, G[1] + ((q[1] - G[1]) * Y) / W],
          Q = [G[0] + ((q[0] - G[0]) * $) / W, G[1] + ((q[1] - G[1]) * $) / W],
          j = [(st[0] + Q[0]) / 2, (st[1] + Q[1]) / 2],
          X = S(j[0], j[1]),
          K = t.terrainAt(j[0] + V[0] * 9, j[1] + V[1] * 9);
        w.wall.push({
          a: st,
          b: Q,
          n: V,
          y: X,
          top: Math.max(X + 1.4, Math.min(X + 7.5, K)),
          u: D + Y,
        });
      }
      D += W;
    }
  }
  {
    let O = w.wall.map((D) => D.top);
    w.wall.forEach((D, U) => {
      let G = 0,
        q = 0;
      for (let W = Math.max(0, U - 3); W <= Math.min(O.length - 1, U + 3); W++)
        ((G += O[W]), q++);
      D.top = Math.max(D.y + 1.4, G / q);
    });
  }
  {
    let O = i.terrain,
      [D, U, G, q] = ry($R).map((W, V) => W + (V < 2 ? -12 : 12));
    for (
      let W = Math.max(0, Math.floor((U - O.z0) / O.step));
      W <= Math.min(O.nz - 1, Math.ceil((q - O.z0) / O.step));
      W++
    )
      for (
        let V = Math.max(0, Math.floor((D - O.x0) / O.step));
        V <= Math.min(O.nx - 1, Math.ceil((G - O.x0) / O.step));
        V++
      ) {
        let Y = O.x0 + V * O.step,
          $ = O.z0 + W * O.step;
        if (c(Y, $)) continue;
        let st = SS($R, Y, $);
        if (st > 9.5) continue;
        let Q = null,
          j = 1e9;
        for (let nt of w.wall) {
          let Z = Math.hypot(
            (nt.a[0] + nt.b[0]) / 2 - Y,
            (nt.a[1] + nt.b[1]) / 2 - $,
          );
          Z < j && ((j = Z), (Q = nt));
        }
        if (!Q || j > 12) continue;
        let X = W * O.nx + V,
          K = Q.top - 0.2 - Math.max(0, st - 8) * 0.3;
        O.h[X] < K && (O.h[X] = K);
      }
  }
  ((w.stairs = $ht.map(([O, D]) => {
    let U = c(...O) ? S(...O) : t.terrainAt(...O),
      G = t.terrainAt(...D);
    return { a: O, b: D, ya: U, yb: G };
  })),
    (w.trees = []));
  {
    let O = ly(iu),
      D = 0;
    for (let U = 0; U < O.length; U++) {
      let G = O[U],
        q = O[(U + 1) % O.length],
        W = Math.hypot(q[0] - G[0], q[1] - G[1]),
        V = Bh(iu, G, q);
      for (let Y = (13 - (D % 13)) % 13; Y < W; Y += 13) {
        let $ = G[0] + ((q[0] - G[0]) * Y) / W - V[0] * (4 + u0(Y, U) * 6),
          st = G[1] + ((q[1] - G[1]) * Y) / W - V[1] * (4 + u0(U, Y) * 6),
          Q = u0($, st),
          j = st < -1080 || $ < -3300;
        (!j && Q < 0.45) ||
          (j && Q < 0.22) ||
          (en(iu, $, st) &&
            w.trees.push({
              x: $,
              z: st,
              sp: j
                ? Q < 0.8
                  ? "cypress"
                  : "pine"
                : Q < 0.55
                  ? "cypress"
                  : Q < 0.8
                    ? "euc"
                    : "pine",
              scale: 0.95 + u0(st, $) * 0.5,
            }));
      }
      D += W;
    }
    for (let [U, G] of [
      [-3236, -1032],
      [-3229, -1027],
      [-3243, -1025],
      [-3170, -1090],
      [-3164, -1097],
    ])
      w.trees.push({ x: U, z: G, sp: "palm", scale: 1 + u0(U, G) * 0.2 });
    for (let [U, G] of [
      [-3290, -1010],
      [-3150, -1160],
      [-3260, -940],
      [-3120, -1090],
    ])
      for (let q = 0; q < 3; q++)
        w.trees.push({
          x: U + (u0(q, U) - 0.5) * 12,
          z: G + (u0(G, q) - 0.5) * 12,
          sp: q ? "cypress" : "pine",
          scale: 1 + u0(q, G) * 0.4,
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
    ].map(([O, D, U]) => ({ x: O, z: D, a: U, y: t.terrainAt(O, D) }))),
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
    (w.inMeadow = (O, D) => en(iu, O, D)),
    (i._fm = w),
    w
  );
}
