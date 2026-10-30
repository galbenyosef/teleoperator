// app 226 — math
// Lines 119140-119449 of readable/app.pretty.js (statement-aligned).
function jw(o, t, e) {
  let s = t[0] - o[0],
    n = t[1] - o[1],
    i = Math.hypot(s, n),
    a = [-n / i, 0, s / i],
    r = (o[0] + t[0]) / 2 - e.x,
    l = (o[1] + t[1]) / 2 - e.z;
  return a[0] * r + a[2] * l >= 0 ? a : a.map((c) => -c);
}
function Hxt(o, t) {
  if (Qe.vista?.skip) return;
  let e = (S) => ff("gg", S),
    {
      s0: s,
      s1: n,
      v0: i,
      v1: a,
      Y: r,
    } = Qe.vista || { s0: 2022, s1: 2056, v0: 30, v1: 96, Y: 58 },
    l = e(s),
    c = l.ux,
    h = l.uz,
    f = -h,
    u = c,
    d = (S, w) => {
      let _ = e(S);
      return [_.x + f * w, _.z + u * w];
    },
    p = t.G("vista", "wall"),
    m = t.G("vista", "paint"),
    g = t.G("vista", "metal"),
    b = t.G("vista", "ground"),
    v = [d(s, i), d(n, i), d(n, a), d(s, a)],
    x = o.mats.road ? t.G("vista", "road") : null;
  if (x) {
    t.M.road = o.mats.road;
    let [S, w, _, z] = v;
    $s(
      x,
      [S[0], r, S[1]],
      [w[0], r, w[1]],
      [_[0], r, _[1]],
      [z[0], r, z[1]],
      [0, 0],
      [n - s, 0],
      [n - s, a - i],
      [0, a - i],
      [30 / 32, 0, 0.65, 0.25],
      [0, 1, 0],
    );
  }
  for (let S = 0; S < 4; S++) {
    let w = v[S],
      _ = v[(S + 1) % 4],
      z = Math.hypot(_[0] - w[0], _[1] - w[1]),
      A = Math.ceil(z / 5);
    for (let T = 0; T < A; T++) {
      let E = [w[0] + ((_[0] - w[0]) * T) / A, w[1] + ((_[1] - w[1]) * T) / A],
        R = [
          w[0] + ((_[0] - w[0]) * (T + 1)) / A,
          w[1] + ((_[1] - w[1]) * (T + 1)) / A,
        ],
        P = Ei(E[0], E[1]) - 1,
        C = Ei(R[0], R[1]) - 1,
        I = (v[0][0] + v[2][0]) / 2,
        L = (v[0][1] + v[2][1]) / 2,
        F = [-(R[1] - E[1]), 0, R[0] - E[0]],
        O = Math.hypot(F[0], F[2]),
        B =
          ((E[0] + R[0]) / 2 - I) * F[0] + ((E[1] + R[1]) / 2 - L) * F[2] > 0
            ? [F[0] / O, 0, F[2] / O]
            : [-F[0] / O, 0, -F[2] / O];
      $s(
        p,
        [E[0], Math.min(P, r - 1.5), E[1]],
        [R[0], Math.min(C, r - 1.5), R[1]],
        [R[0], r + 0.9, R[1]],
        [E[0], r + 0.9, E[1]],
        [(z * T) / A, r - 1.5],
        [(z * (T + 1)) / A, r - 1.5],
        [(z * (T + 1)) / A, r + 0.9],
        [(z * T) / A, r + 0.9],
        [0.74, 0.72, 0.68, yi.granite],
        B,
      );
      let H = (G) => {
          let W = 0;
          for (
            ;
            W < 60 && r - 1.5 - 1.25 * W > Ei(G[0] + B[0] * W, G[1] + B[2] * W);
          )
            W += 0.5;
          return [
            G[0] + B[0] * (W + 1),
            r - 1.5 - 1.25 * (W + 1),
            G[1] + B[2] * (W + 1),
          ];
        },
        N = H(E),
        D = H(R),
        U = [0.72, 0.62, 0.42, Ho.sand];
      ((N[1] < r - 1.6 || D[1] < r - 1.6) &&
        $s(
          t.G("vista", "ground"),
          [E[0], r - 1.5, E[1]],
          [R[0], r - 1.5, R[1]],
          D,
          N,
          [E[0], E[1]],
          [R[0], R[1]],
          [D[0], D[2]],
          [N[0], N[2]],
          U,
          [B[0], 0.8, B[2]],
        ),
        $s(
          p,
          [E[0] - B[0] * 0.4, r + 0.9, E[1] - B[2] * 0.4],
          [R[0] - B[0] * 0.4, r + 0.9, R[1] - B[2] * 0.4],
          [R[0] - B[0] * 0.4, r, R[1] - B[2] * 0.4],
          [E[0] - B[0] * 0.4, r, E[1] - B[2] * 0.4],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0.74, 0.72, 0.68, yi.granite],
          B.map((G) => -G),
        ));
    }
  }
  let y = [0.1, 0.1, 0.1, 0.4];
  for (let S = i + 1; S < a - 0.5; S += 2) {
    let w = d(s + 0.25, S);
    ci(g, [w[0], r + 0.9, w[1]], [w[0], r + 1.9, w[1]], 0.06, 0.06, y);
  }
  {
    let S = d(s + 0.25, i + 1),
      w = d(s + 0.25, a - 1);
    for (let _ of [1.45, 1.9])
      ci(g, [S[0], r + _, S[1]], [w[0], r + _, w[1]], 0.05, 0.05, y);
  }
  let M = (() => {
    let S = 77;
    return () => (S = (S * 16807) % 2147483647) / 2147483647;
  })();
  for (let S = i + 6; S < a - 4; S += 2.7)
    for (let [w, _] of [
      [s + 9, s + 14],
      [n - 5.5, n - 0.5],
    ]) {
      let z = d(w, S - 1.35),
        A = d(_, S - 1.35);
      if (
        (ci(
          m,
          [z[0], r + 0.01, z[1]],
          [A[0], r + 0.01, A[1]],
          0.12,
          0.01,
          [0.8, 0.8, 0.78, 0.6],
        ),
        M() < 0.6)
      ) {
        let T = d((w + _) / 2, S);
        o.inst.push({
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
  for (let S of [i + 8, i + 26, i + 44, a - 8]) {
    let w = d(s + 2.2, S);
    Ge(
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
    let _ = d(s + 1, S + 9);
    (mr(g, _[0], _[1], r, r + 1.15, 0.06, 0.06, 6, [0.25, 0.3, 0.26, 0.4]),
      Ge(
        g,
        _[0],
        _[1],
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
    [s + 3, i + 3],
    [s + 3, a - 3],
    [n - 3, (i + a) / 2],
  ]) {
    let _ = d(S, w);
    o.inst.push({
      kind: "lamp",
      x: _[0],
      y: r,
      z: _[1],
      rot: Math.atan2(c, h),
    });
  }
  {
    let S = d(n - 6, a - 12);
    (Ge(
      p,
      S[0],
      S[1],
      c,
      h,
      3.5,
      6,
      r,
      r + 3.2,
      [0.85, 0.82, 0.76, yi.stone],
      [1, 1, 1, 1, 0, 0],
    ),
      Ge(
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
    let S = d(s + 5, i + 20);
    (Ge(
      p,
      S[0],
      S[1],
      c,
      h,
      0.8,
      0.8,
      r,
      r + 2.2,
      [0.8, 0.78, 0.74, yi.granite],
      [1, 1, 1, 1, 1, 0],
    ),
      To(
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
Pn();
var Pf = {
    shaft: 0,
    capital: 1,
    dome: 2,
    coffer: 3,
    stone: 4,
    dentil: 5,
    hall: 6,
    fret: 7,
  },
  Dxt = (o) => 0.25 + (o + 0.5) / 32,
  al = (o, t, e, s = Pf.stone) => [o, t, e, Dxt(s)],
  gr = al(1, 0.93, 0.85),
  l0 = al(0.88, 0.8, 0.72),
  Cr = al(1.05, 0.98, 0.9),
  Fz = al(0.92, 0.84, 0.76),
  Uxt = al(1, 0.93, 0.85, Pf.shaft),
  GY = al(0.97, 0.9, 0.81, Pf.capital),
  $w = al(0.97, 0.9, 0.82, Pf.dentil),
  Gxt = al(0.98, 0.91, 0.83, Pf.fret),
  Vxt = al(1.12, 0.71, 0.55, Pf.dome),
  Wxt = al(1.16, 0.82, 0.64, Pf.dome),
  qxt = al(1, 0.9, 0.78, Pf.coffer),
  VL = al(0.76, 0.73, 0.68, Pf.hall),
  nd = (o, t, e) => {
    let s = Math.min(1, Math.max(0, (e - o) / (t - o)));
    return s * s * (3 - 2 * s);
  };
