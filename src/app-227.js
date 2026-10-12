// app 227 — math
// Lines 118884-119193 of readable/app.pretty.js (statement-aligned).
function Jy(i, t, e) {
  let s = t[0] - i[0],
    n = t[1] - i[1],
    o = Math.hypot(s, n),
    a = [-n / o, 0, s / o],
    r = (i[0] + t[0]) / 2 - e.x,
    l = (i[1] + t[1]) / 2 - e.z;
  return a[0] * r + a[2] * l >= 0 ? a : a.map((c) => -c);
}
function m2t(i, t) {
  if (Ye.vista?.skip) return;
  let e = (S) => Fh("gg", S),
    {
      s0: s,
      s1: n,
      v0: o,
      v1: a,
      Y: r,
    } = Ye.vista || { s0: 2022, s1: 2056, v0: 30, v1: 96, Y: 58 },
    l = e(s),
    c = l.ux,
    h = l.uz,
    f = -h,
    u = c,
    d = (S, w) => {
      let z = e(S);
      return [z.x + f * w, z.z + u * w];
    },
    p = t.G("vista", "wall"),
    m = t.G("vista", "paint"),
    g = t.G("vista", "metal"),
    b = t.G("vista", "ground"),
    x = [d(s, o), d(n, o), d(n, a), d(s, a)],
    v = i.mats.road ? t.G("vista", "road") : null;
  if (v) {
    t.M.road = i.mats.road;
    let [S, w, z, _] = x;
    js(
      v,
      [S[0], r, S[1]],
      [w[0], r, w[1]],
      [z[0], r, z[1]],
      [_[0], r, _[1]],
      [0, 0],
      [n - s, 0],
      [n - s, a - o],
      [0, a - o],
      [30 / 32, 0, 0.65, 0.25],
      [0, 1, 0],
    );
  }
  for (let S = 0; S < 4; S++) {
    let w = x[S],
      z = x[(S + 1) % 4],
      _ = Math.hypot(z[0] - w[0], z[1] - w[1]),
      R = Math.ceil(_ / 5);
    for (let T = 0; T < R; T++) {
      let E = [w[0] + ((z[0] - w[0]) * T) / R, w[1] + ((z[1] - w[1]) * T) / R],
        A = [
          w[0] + ((z[0] - w[0]) * (T + 1)) / R,
          w[1] + ((z[1] - w[1]) * (T + 1)) / R,
        ],
        C = di(E[0], E[1]) - 1,
        P = di(A[0], A[1]) - 1,
        I = (x[0][0] + x[2][0]) / 2,
        L = (x[0][1] + x[2][1]) / 2,
        F = [-(A[1] - E[1]), 0, A[0] - E[0]],
        N = Math.hypot(F[0], F[2]),
        B =
          ((E[0] + A[0]) / 2 - I) * F[0] + ((E[1] + A[1]) / 2 - L) * F[2] > 0
            ? [F[0] / N, 0, F[2] / N]
            : [-F[0] / N, 0, -F[2] / N];
      js(
        p,
        [E[0], Math.min(C, r - 1.5), E[1]],
        [A[0], Math.min(P, r - 1.5), A[1]],
        [A[0], r + 0.9, A[1]],
        [E[0], r + 0.9, E[1]],
        [(_ * T) / R, r - 1.5],
        [(_ * (T + 1)) / R, r - 1.5],
        [(_ * (T + 1)) / R, r + 0.9],
        [(_ * T) / R, r + 0.9],
        [0.74, 0.72, 0.68, hi.granite],
        B,
      );
      let H = (G) => {
          let q = 0;
          for (
            ;
            q < 60 && r - 1.5 - 1.25 * q > di(G[0] + B[0] * q, G[1] + B[2] * q);
          )
            q += 0.5;
          return [
            G[0] + B[0] * (q + 1),
            r - 1.5 - 1.25 * (q + 1),
            G[1] + B[2] * (q + 1),
          ];
        },
        O = H(E),
        D = H(A),
        U = [0.72, 0.62, 0.42, To.sand];
      ((O[1] < r - 1.6 || D[1] < r - 1.6) &&
        js(
          t.G("vista", "ground"),
          [E[0], r - 1.5, E[1]],
          [A[0], r - 1.5, A[1]],
          D,
          O,
          [E[0], E[1]],
          [A[0], A[1]],
          [D[0], D[2]],
          [O[0], O[2]],
          U,
          [B[0], 0.8, B[2]],
        ),
        js(
          p,
          [E[0] - B[0] * 0.4, r + 0.9, E[1] - B[2] * 0.4],
          [A[0] - B[0] * 0.4, r + 0.9, A[1] - B[2] * 0.4],
          [A[0] - B[0] * 0.4, r, A[1] - B[2] * 0.4],
          [E[0] - B[0] * 0.4, r, E[1] - B[2] * 0.4],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0.74, 0.72, 0.68, hi.granite],
          B.map((G) => -G),
        ));
    }
  }
  let y = [0.1, 0.1, 0.1, 0.4];
  for (let S = o + 1; S < a - 0.5; S += 2) {
    let w = d(s + 0.25, S);
    ii(g, [w[0], r + 0.9, w[1]], [w[0], r + 1.9, w[1]], 0.06, 0.06, y);
  }
  {
    let S = d(s + 0.25, o + 1),
      w = d(s + 0.25, a - 1);
    for (let z of [1.45, 1.9])
      ii(g, [S[0], r + z, S[1]], [w[0], r + z, w[1]], 0.05, 0.05, y);
  }
  let M = (() => {
    let S = 77;
    return () => (S = (S * 16807) % 2147483647) / 2147483647;
  })();
  for (let S = o + 6; S < a - 4; S += 2.7)
    for (let [w, z] of [
      [s + 9, s + 14],
      [n - 5.5, n - 0.5],
    ]) {
      let _ = d(w, S - 1.35),
        R = d(z, S - 1.35);
      if (
        (ii(
          m,
          [_[0], r + 0.01, _[1]],
          [R[0], r + 0.01, R[1]],
          0.12,
          0.01,
          [0.8, 0.8, 0.78, 0.6],
        ),
        M() < 0.6)
      ) {
        let T = d((w + z) / 2, S);
        i.inst.push({
          kind: "car",
          x: T[0],
          y: r,
          z: T[1],
          rot: Math.atan2(c, h) + (M() < 0.5 ? Math.PI : 0),
          color: M(),
          type: [0, 0, 1, 2, 3][Math.floor(M() * 5)],
        });
      }
    }
  for (let S of [o + 8, o + 26, o + 44, a - 8]) {
    let w = d(s + 2.2, S);
    Ne(
      m,
      w[0],
      w[1],
      f,
      u,
      0.9,
      0.22,
      r + 0.42,
      r + 0.48,
      [0.3, 0.2, 0.12, 0.6],
      [1, 1, 1, 1, 1, 1],
    );
    let z = d(s + 1, S + 9);
    (Qa(g, z[0], z[1], r, r + 1.15, 0.06, 0.06, 6, [0.25, 0.3, 0.26, 0.4]),
      Ne(
        g,
        z[0],
        z[1],
        c,
        h,
        0.28,
        0.13,
        r + 1.15,
        r + 1.45,
        [0.25, 0.3, 0.26, 0.4],
        [1, 1, 1, 1, 1, 1],
      ));
  }
  for (let [S, w] of [
    [s + 3, o + 3],
    [s + 3, a - 3],
    [n - 3, (o + a) / 2],
  ]) {
    let z = d(S, w);
    i.inst.push({
      kind: "lamp",
      x: z[0],
      y: r,
      z: z[1],
      rot: Math.atan2(c, h),
    });
  }
  {
    let S = d(n - 6, a - 12);
    (Ne(
      p,
      S[0],
      S[1],
      c,
      h,
      3.5,
      6,
      r,
      r + 3.2,
      [0.85, 0.82, 0.76, hi.stone],
      [1, 1, 1, 1, 0, 0],
    ),
      Ne(
        m,
        S[0],
        S[1],
        c,
        h,
        4,
        6.5,
        r + 3.2,
        r + 3.5,
        [0.25, 0.22, 0.2, 0.6],
        [1, 1, 1, 1, 1, 1],
      ));
  }
  {
    let S = d(s + 5, o + 20);
    (Ne(
      p,
      S[0],
      S[1],
      c,
      h,
      0.8,
      0.8,
      r,
      r + 2.2,
      [0.8, 0.78, 0.74, hi.granite],
      [1, 1, 1, 1, 1, 0],
    ),
      yo(
        m,
        S[0],
        S[1],
        [
          [0.45, r + 2.2],
          [0.5, r + 2.6],
          [0.28, r + 2.8],
          [0.2, r + 3],
          [0.22, r + 3.25],
          [0.05, r + 3.4],
        ],
        10,
        [0.18, 0.13, 0.08, 0.35],
      ));
  }
}
En();
var Zh = {
    shaft: 0,
    capital: 1,
    dome: 2,
    coffer: 3,
    stone: 4,
    dentil: 5,
    hall: 6,
    fret: 7,
  },
  g2t = (i) => 0.25 + (i + 0.5) / 32,
  B0 = (i, t, e, s = Zh.stone) => [i, t, e, g2t(s)],
  tr = B0(1, 0.93, 0.85),
  jr = B0(0.88, 0.8, 0.72),
  br = B0(1.05, 0.98, 0.9),
  Fk = B0(0.92, 0.84, 0.76),
  b2t = B0(1, 0.93, 0.85, Zh.shaft),
  HX = B0(0.97, 0.9, 0.81, Zh.capital),
  Zy = B0(0.97, 0.9, 0.82, Zh.dentil),
  x2t = B0(0.98, 0.91, 0.83, Zh.fret),
  v2t = B0(1.12, 0.71, 0.55, Zh.dome),
  y2t = B0(1.16, 0.82, 0.64, Zh.dome),
  w2t = B0(1, 0.9, 0.78, Zh.coffer),
  dC = B0(0.76, 0.73, 0.68, Zh.hall),
  Mu = (i, t, e) => {
    let s = Math.min(1, Math.max(0, (e - i) / (t - i)));
    return s * s * (3 - 2 * s);
  };
