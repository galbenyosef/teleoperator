// app 136 — math
// Lines 90571-90919 of readable/app.pretty.js (statement-aligned).
function Bj(o, t, e) {
  let { D: s, L: n } = e,
    i = new Be(),
    a = s.bld,
    r = a.seed.indexOf(32858754);
  if (r < 0) return;
  let l = a.rStart[a.bRing[r]],
    c = a.rStart[a.bRing[r] + 1],
    h = c - l,
    f = null;
  for (let R = 0; R < h; R++) {
    let P = a.pts[(l + R) * 2],
      C = a.pts[(l + R) * 2 + 1],
      I = a.pts[(l + ((R + 1) % h)) * 2],
      L = a.pts[(l + ((R + 1) % h)) * 2 + 1],
      F = Math.hypot(I - P, L - C);
    if (F < 6) continue;
    let O = n.roadAt((P + I) / 2, (C + L) / 2, 25);
    !O ||
      O.E.name !== "Columbus Avenue" ||
      ((!f || O.d < f.d) &&
        (f = { ax: P, az: C, bx: I, bz: L, l: F, d: O.d, r: O }));
  }
  if (!f) return;
  let { ax: u, az: d, bx: p, bz: m, l: g, r: b } = f,
    v = (p - u) / g,
    x = (m - d) / g,
    y = -x,
    M = v,
    S = Ot(b.E, b.s, {});
  (S.x - (u + p) / 2) * y + (S.z - (d + m) / 2) * M < 0 && ((y = -y), (M = -M));
  let w = n.driveHeight((u + p) / 2 + y * 2, (d + m) / 2 + M * 2) + 0.15,
    _ = g / 2,
    z = Math.min(g - 1, 13),
    A = v * M - x * y > 0 ? 1 : -1,
    T = (R, P, C = 0.12) => [
      u + v * (_ + R * A) + y * C,
      w + 3.85 + P,
      d + x * (_ + R * A) + M * C,
    ],
    E = Lt(Ct.gloss, 0.025, 0.025, 0.03);
  for (let [R, P, C, I, L] of [[-z / 2, z / 2, -0.5, 0.5, 0.1]]) {
    let F = T(R, C, 0.09),
      O = T(P, C, 0.09),
      B = T(P, I, 0.09),
      H = T(R, I, 0.09);
    i.quad(
      ...(A > 0 ? [F, O, B, H] : [O, F, H, B]),
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      E,
      [y, 0, M],
    );
  }
  (vw(
    i,
    "CITY LIGHTS",
    (R, P) => T(R, P, 0.07),
    0.12,
    0.2,
    0.035,
    wn(1, 0.86, 0.6),
    !1,
  ),
    vn(o.group, i, t.lm, "CityLights", { shadow: !1 }));
}
var Ij = [
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
function Fj(o, t, e, s, n, i, a, r, l, c, h) {
  let f = i.length,
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
    let v = d[p],
      x = d[m],
      y = d[g],
      M = d[b],
      S = x[0] - v[0],
      w = x[1] - v[1],
      _ = x[2] - v[2],
      z = M[0] - v[0],
      A = M[1] - v[1],
      T = M[2] - v[2],
      E = w * T - _ * A,
      R = _ * z - S * T,
      P = S * A - w * z,
      C = Math.hypot(E, R, P) || 1;
    o.quad(v, x, y, M, [0, 0], [1, 0], [1, 1], [0, 1], l, [
      E / C,
      R / C,
      P / C,
    ]);
  }
  for (let p of [-n / 2 + 0.5, n / 2 - 0.5])
    Ce(o, e(0, p, 0), e(0.4, p, 0), 0.05, c, 4);
  for (let p of [-1, 1])
    if (
      (vw(
        o,
        i,
        (m, g) => e(0.35 + s / 2 + m * p, g, p * 0.2),
        r,
        r * 1.3,
        Math.max(0.045, r * 0.3),
        a,
      ),
      h)
    )
      for (let [m, g, b, v] of [
        [0.45, -n / 2 + 0.1, 0.25 + s, -n / 2 + 0.1],
        [0.25 + s, -n / 2 + 0.1, 0.25 + s, n / 2 - 0.1],
        [0.25 + s, n / 2 - 0.1, 0.45, n / 2 - 0.1],
        [0.45, n / 2 - 0.1, 0.45, -n / 2 + 0.1],
      ]) {
        let x = Math.hypot(b - m, v - g),
          y = Math.max(1, Math.round(x / 0.32));
        for (let M = 0; M < y; M++) {
          let S = (M + 0.5) / y,
            w = e(m + (b - m) * S, g + (v - g) * S, p * 0.21);
          ss(
            o,
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
function Nj(o, t, e) {
  let { D: s, L: n } = e,
    i = new Be(),
    a = {},
    r = [
      [1, 0.12, 0.42],
      [0.1, 0.85, 1],
      [1, 0.2, 0.08],
      [1, 0.78, 0.12],
      [0.55, 0.25, 1],
      [0.25, 1, 0.3],
    ].map((d) => wn(...d)),
    l = [
      Lt(Ct.gloss, 0.03, 0.03, 0.035),
      Lt(Ct.gloss, 0.5, 0.06, 0.05),
      Lt(Ct.gloss, 0.8, 0.76, 0.66),
      Lt(Ct.gloss, 0.05, 0.08, 0.3),
    ],
    c = Lt(Ct.metal, 0.4, 0.4, 0.42),
    h = wn(0.6, 0.5, 0.33),
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
              v = a.z + a.nz * m * g,
              x = n.driveHeight(b - a.nx * m * 1.5, v - a.nz * m * 1.5) + 4;
            if (n.surfaceAt(b + a.nx * m * 3, v + a.nz * m * 3) === "road")
              continue;
            let y = Ij[(f * 5 + Math.round(p)) % Ij.length],
              M = y.length,
              S = M > 9 ? 0.15 : M > 6 ? 0.18 : 0.22,
              w = M * (6 * S + S * 1.3) + 0.6,
              _ = r[(f * 3) % r.length];
            f++;
            let z = -a.nx * m,
              A = -a.nz * m,
              T = Math.sign(z * a.dz - A * a.dx || 1);
            Fj(
              i,
              e,
              (R, P, C) => [
                b + z * R + a.dx * C,
                x + w / 2 + P,
                v + A * R + a.dz * C,
              ],
              1.5 + S * 2,
              w,
              y,
              _,
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
        v = (g === "a" ? 1 : -1) * b.dx,
        x = (g === "a" ? 1 : -1) * b.dz;
      (m.name === "Broadway" && v > 0.7 && (d = [v, x]),
        m.name === "Columbus Avenue" && x > 0.3 && v > 0.2 && (p = [v, x]));
    }
    if (d && p) {
      let m = d[0] + p[0],
        g = d[1] + p[1],
        b = Math.hypot(m, g);
      ((m /= b), (g /= b));
      let v = u.x + m * 14,
        x = u.z + g * 14;
      for (let C = 0; C < 40 && n.surfaceAt(v, x) !== "walk"; C++)
        ((v += m * 0.5), (x += g * 0.5));
      for (
        let C = 0;
        C < 30 && n.surfaceAt(v + m * 0.6, x + g * 0.6) === "walk";
        C++
      )
        ((v += m * 0.5), (x += g * 0.5));
      let y = n.driveHeight(v, x) + 4.2,
        M = 6 * (6 * 0.2 + 0.26) + 0.6,
        S = wn(1, 0.08, 0.06),
        w = wn(1, 0.35, 0.6),
        _ = wn(1, 0.92, 0.85),
        z = -m,
        A = -g,
        T = -A,
        E = z,
        R = (C, I, L) => [v + z * C + T * L, y + M / 2 + I, x + A * C + E * L];
      Fj(i, e, R, 2, M, "CONDOR", S, 0.2, Lt(Ct.gloss, 0.84, 0.8, 0.7), c, h);
      let P = [
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
      for (let C of [-1, 1]) {
        let I = (F, O) => R(1.35 + F * C, M / 2 + 1.1 + O * 0.75, C * 0.2);
        for (let F of P)
          for (let O = 0; O + 1 < F.length; O++)
            Ce(i, I(...F[O]), I(...F[O + 1]), 0.07, w, 4);
        let L = [0.12, 4.45];
        for (let F = 0; F < 10; F++) {
          let O = (F / 10) * 6.283,
            B = ((F + 1) / 10) * 6.283;
          Ce(
            i,
            I(L[0] + Math.cos(O) * 0.42, L[1] + Math.sin(O) * 0.48),
            I(L[0] + Math.cos(B) * 0.42, L[1] + Math.sin(B) * 0.48),
            0.06,
            _,
            4,
          );
        }
      }
      Ce(
        i,
        [v, y + M + 1, x],
        [v + z * 1.5, y + M + 1, x + A * 1.5],
        0.06,
        c,
        4,
      );
    }
  }
  vn(o.group, i, t.lm, "BroadwayNeon", { shadow: !1 });
}
var ww = {
    c: [-2264.5, 1805.5],
    dome: [
      494810783, 494810785, 494810787, 494810790, 494810820, 494810823,
      494810826, 494810839, 494810841,
    ],
  },
  Mw = {
    c: [-3198.95, 1161.7],
    ids: [
      1458363734, 1457621863, 1458346185, 1458366354, 1458366355, 1458366356,
      1458366357, 1458366358,
    ],
  },
  El = Lt(Ct.stone, 0.74, 0.72, 0.66),
  Vk = Lt(Ct.stone, 0.6, 0.58, 0.53),
  C1t = Lt(Ct.stone, 0.12, 0.125, 0.14),
  yw = Lt(Ct.gold, 0.95, 0.72, 0.32),
  fC = Lt(Ct.glass, 0.04, 0.045, 0.05);
