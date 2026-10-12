// app 137 — math
// Lines 90303-90651 of readable/app.pretty.js (statement-aligned).
function Fq(i, t, e) {
  let { D: s, L: n } = e,
    o = new Ce(),
    a = s.bld,
    r = a.seed.indexOf(32858754);
  if (r < 0) return;
  let l = a.rStart[a.bRing[r]],
    c = a.rStart[a.bRing[r] + 1],
    h = c - l,
    f = null;
  for (let A = 0; A < h; A++) {
    let C = a.pts[(l + A) * 2],
      P = a.pts[(l + A) * 2 + 1],
      I = a.pts[(l + ((A + 1) % h)) * 2],
      L = a.pts[(l + ((A + 1) % h)) * 2 + 1],
      F = Math.hypot(I - C, L - P);
    if (F < 6) continue;
    let N = n.roadAt((C + I) / 2, (P + L) / 2, 25);
    !N ||
      N.E.name !== "Columbus Avenue" ||
      ((!f || N.d < f.d) &&
        (f = { ax: C, az: P, bx: I, bz: L, l: F, d: N.d, r: N }));
  }
  if (!f) return;
  let { ax: u, az: d, bx: p, bz: m, l: g, r: b } = f,
    x = (p - u) / g,
    v = (m - d) / g,
    y = -v,
    M = x,
    S = Ot(b.E, b.s, {});
  (S.x - (u + p) / 2) * y + (S.z - (d + m) / 2) * M < 0 && ((y = -y), (M = -M));
  let w = n.driveHeight((u + p) / 2 + y * 2, (d + m) / 2 + M * 2) + 0.15,
    z = g / 2,
    _ = Math.min(g - 1, 13),
    R = x * M - v * y > 0 ? 1 : -1,
    T = (A, C, P = 0.12) => [
      u + x * (z + A * R) + y * P,
      w + 3.85 + C,
      d + v * (z + A * R) + M * P,
    ],
    E = It(Lt.gloss, 0.025, 0.025, 0.03);
  for (let [A, C, P, I, L] of [[-_ / 2, _ / 2, -0.5, 0.5, 0.1]]) {
    let F = T(A, P, 0.09),
      N = T(C, P, 0.09),
      B = T(C, I, 0.09),
      H = T(A, I, 0.09);
    o.quad(
      ...(R > 0 ? [F, N, B, H] : [N, F, H, B]),
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      E,
      [y, 0, M],
    );
  }
  (_y(
    o,
    "CITY LIGHTS",
    (A, C) => T(A, C, 0.07),
    0.12,
    0.2,
    0.035,
    bn(1, 0.86, 0.6),
    !1,
  ),
    gn(i.group, o, t.lm, "CityLights", { shadow: !1 }));
}
var Cq = [
  "CONDOR",
  "BIG ALS",
  "HUNGRY I",
  "ROARING 20'S",
  "JAZZ",
  "EDEN",
  "CLUB",
  "LIVE SHOWS",
  "BEAT",
  "LOUNGE",
  "DANCERS",
  "BAR",
  "SHOWS",
];
function Lq(i, t, e, s, n, o, a, r, l, c, h) {
  let f = o.length,
    u = (p, m, g) => e(p, m, g),
    d = [];
  for (let [p, m, g] of [
    [0.35, -n / 2, -0.18],
    [0.35 + s, -n / 2, -0.18],
    [0.35 + s, n / 2, -0.18],
    [0.35, n / 2, -0.18],
    [0.35, -n / 2, 0.18],
    [0.35 + s, -n / 2, 0.18],
    [0.35 + s, n / 2, 0.18],
    [0.35, n / 2, 0.18],
  ])
    d.push(u(p, m, g));
  for (let [p, m, g, b] of [
    [0, 1, 2, 3],
    [5, 4, 7, 6],
    [1, 5, 6, 2],
    [4, 0, 3, 7],
    [3, 2, 6, 7],
    [4, 5, 1, 0],
  ]) {
    let x = d[p],
      v = d[m],
      y = d[g],
      M = d[b],
      S = v[0] - x[0],
      w = v[1] - x[1],
      z = v[2] - x[2],
      _ = M[0] - x[0],
      R = M[1] - x[1],
      T = M[2] - x[2],
      E = w * T - z * R,
      A = z * _ - S * T,
      C = S * R - w * _,
      P = Math.hypot(E, A, C) || 1;
    i.quad(x, v, y, M, [0, 0], [1, 0], [1, 1], [0, 1], l, [
      E / P,
      A / P,
      C / P,
    ]);
  }
  for (let p of [-n / 2 + 0.5, n / 2 - 0.5])
    Ae(i, e(0, p, 0), e(0.4, p, 0), 0.05, c, 4);
  for (let p of [-1, 1])
    if (
      (_y(
        i,
        o,
        (m, g) => e(0.35 + s / 2 + m * p, g, p * 0.2),
        r,
        r * 1.3,
        Math.max(0.045, r * 0.3),
        a,
      ),
      h)
    )
      for (let [m, g, b, x] of [
        [0.45, -n / 2 + 0.1, 0.25 + s, -n / 2 + 0.1],
        [0.25 + s, -n / 2 + 0.1, 0.25 + s, n / 2 - 0.1],
        [0.25 + s, n / 2 - 0.1, 0.45, n / 2 - 0.1],
        [0.45, n / 2 - 0.1, 0.45, -n / 2 + 0.1],
      ]) {
        let v = Math.hypot(b - m, x - g),
          y = Math.max(1, Math.round(v / 0.32));
        for (let M = 0; M < y; M++) {
          let S = (M + 0.5) / y,
            w = e(m + (b - m) * S, g + (x - g) * S, p * 0.21);
          Ze(
            i,
            w[0] - 0.05,
            w[1] - 0.05,
            w[2] - 0.05,
            w[0] + 0.05,
            w[1] + 0.05,
            w[2] + 0.05,
            h,
          );
        }
      }
}
function Nq(i, t, e) {
  let { D: s, L: n } = e,
    o = new Ce(),
    a = {},
    r = [
      [1, 0.12, 0.42],
      [0.1, 0.85, 1],
      [1, 0.2, 0.08],
      [1, 0.78, 0.12],
      [0.55, 0.25, 1],
      [0.25, 1, 0.3],
    ].map((d) => bn(...d)),
    l = [
      It(Lt.gloss, 0.03, 0.03, 0.035),
      It(Lt.gloss, 0.5, 0.06, 0.05),
      It(Lt.gloss, 0.8, 0.76, 0.66),
      It(Lt.gloss, 0.05, 0.08, 0.3),
    ],
    c = It(Lt.metal, 0.4, 0.4, 0.42),
    h = bn(0.6, 0.5, 0.33),
    f = 0;
  for (let d of s.edges)
    if (!(d.name !== "Broadway" || d.inner || d.elev || d.sunk)) {
      for (let p = d.s0 + 6; p < d.s1 - 6; p += 15)
        if ((Ot(d, p, a), !(a.x < -1250 || a.x > -880)))
          for (let m of [1, -1]) {
            if ((Math.round(p / 15) * 7 + (m > 0 ? 0 : 3)) % 5 === 0) {
              f++;
              continue;
            }
            let g = a.w + d.sw - 0.1,
              b = a.x + a.nx * m * g,
              x = a.z + a.nz * m * g,
              v = n.driveHeight(b - a.nx * m * 1.5, x - a.nz * m * 1.5) + 4;
            if (n.surfaceAt(b + a.nx * m * 3, x + a.nz * m * 3) === "road")
              continue;
            let y = Cq[(f * 5 + Math.round(p)) % Cq.length],
              M = y.length,
              S = M > 9 ? 0.15 : M > 6 ? 0.18 : 0.22,
              w = M * (6 * S + S * 1.3) + 0.6,
              z = r[(f * 3) % r.length];
            f++;
            let _ = -a.nx * m,
              R = -a.nz * m,
              T = Math.sign(_ * a.dz - R * a.dx || 1);
            Lq(
              o,
              e,
              (A, C, P) => [
                b + _ * A + a.dx * P,
                v + w / 2 + C,
                x + R * A + a.dz * P,
              ],
              1.5 + S * 2,
              w,
              y,
              z,
              S,
              l[(f * 7) % l.length],
              c,
              f % 2 ? h : null,
            );
          }
    }
  let u = s.juns.find(
    (d) =>
      d.legs.some(([p]) => p.name === "Broadway") &&
      d.legs.some(([p]) => p.name === "Columbus Avenue"),
  );
  if (u) {
    let d = null,
      p = null;
    for (let [m, g] of u.legs) {
      let b = Ot(m, g === "a" ? m.s0 + 1 : m.s1 - 1, {}),
        x = (g === "a" ? 1 : -1) * b.dx,
        v = (g === "a" ? 1 : -1) * b.dz;
      (m.name === "Broadway" && x > 0.7 && (d = [x, v]),
        m.name === "Columbus Avenue" && v > 0.3 && x > 0.2 && (p = [x, v]));
    }
    if (d && p) {
      let m = d[0] + p[0],
        g = d[1] + p[1],
        b = Math.hypot(m, g);
      ((m /= b), (g /= b));
      let x = u.x + m * 14,
        v = u.z + g * 14;
      for (let P = 0; P < 40 && n.surfaceAt(x, v) !== "walk"; P++)
        ((x += m * 0.5), (v += g * 0.5));
      for (
        let P = 0;
        P < 30 && n.surfaceAt(x + m * 0.6, v + g * 0.6) === "walk";
        P++
      )
        ((x += m * 0.5), (v += g * 0.5));
      let y = n.driveHeight(x, v) + 4.2,
        M = 6 * (6 * 0.2 + 0.26) + 0.6,
        S = bn(1, 0.08, 0.06),
        w = bn(1, 0.35, 0.6),
        z = bn(1, 0.92, 0.85),
        _ = -m,
        R = -g,
        T = -R,
        E = _,
        A = (P, I, L) => [x + _ * P + T * L, y + M / 2 + I, v + R * P + E * L];
      Lq(o, e, A, 2, M, "CONDOR", S, 0.2, It(Lt.gloss, 0.84, 0.8, 0.7), c, h);
      let C = [
        [
          [0, 0.9],
          [0.25, 1.6],
          [0.1, 2.4],
          [-0.15, 3.2],
          [0.1, 3.9],
        ],
        [
          [0, 0.9],
          [-0.35, 0],
          [-0.3, -1.1],
        ],
        [
          [0, 0.9],
          [0.35, 0.1],
          [0.55, -1],
        ],
        [
          [0.05, 3.5],
          [-0.6, 4.4],
          [-0.8, 5],
        ],
        [
          [0.05, 3.5],
          [0.7, 4.3],
          [0.85, 4.9],
        ],
      ];
      for (let P of [-1, 1]) {
        let I = (F, N) => A(1.35 + F * P, M / 2 + 1.1 + N * 0.75, P * 0.2);
        for (let F of C)
          for (let N = 0; N + 1 < F.length; N++)
            Ae(o, I(...F[N]), I(...F[N + 1]), 0.07, w, 4);
        let L = [0.12, 4.45];
        for (let F = 0; F < 10; F++) {
          let N = (F / 10) * 6.283,
            B = ((F + 1) / 10) * 6.283;
          Ae(
            o,
            I(L[0] + Math.cos(N) * 0.42, L[1] + Math.sin(N) * 0.48),
            I(L[0] + Math.cos(B) * 0.42, L[1] + Math.sin(B) * 0.48),
            0.06,
            z,
            4,
          );
        }
      }
      Ae(
        o,
        [x, y + M + 1, v],
        [x + _ * 1.5, y + M + 1, v + R * 1.5],
        0.06,
        c,
        4,
      );
    }
  }
  gn(i.group, o, t.lm, "BroadwayNeon", { shadow: !1 });
}
var Ey = {
    c: [-2264.5, 1805.5],
    dome: [
      494810783, 494810785, 494810787, 494810790, 494810820, 494810823,
      494810826, 494810839, 494810841,
    ],
  },
  Ty = {
    c: [-3198.95, 1161.7],
    ids: [
      1458363734, 1457621863, 1458346185, 1458366354, 1458366355, 1458366356,
      1458366357, 1458366358,
    ],
  },
  ol = It(Lt.stone, 0.74, 0.72, 0.66),
  WS = It(Lt.stone, 0.6, 0.58, 0.53),
  hut = It(Lt.stone, 0.12, 0.125, 0.14),
  zy = It(Lt.gold, 0.95, 0.72, 0.32),
  I7 = It(Lt.glass, 0.04, 0.045, 0.05);
