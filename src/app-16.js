// app 16 — math
// Lines 41239-41587 of readable/app.pretty.js (statement-aligned).
function Ict(i, t, e, s, n) {
  let o = At([0.62, 0.17, 0.06], Tt.paint),
    a = At([0.86, 0.86, 0.84], Tt.paint),
    r = At([0.5, 0.52, 0.53], Tt.corr),
    l = At([0.08, 0.28, 0.62], Tt.paint),
    c = At([0.16, 0.2, 0.22], Tt.glass),
    h = At([0.5, 0.32, 0.18], Tt.planks),
    f = At([1, 0.9, 0.7], Tt.lamp),
    u = 3,
    d = 9,
    p = 11.4,
    m = s - n,
    g = s + n;
  for (let [S, w] of [
    [m - 0.8, s],
    [g + 0.8, s],
  ]) {
    let z = d - 0.15,
      _ = p;
    (xs(
      i,
      [t - 0.8, z, S],
      [e + 0.8, z, S],
      [e + 0.8, _, w],
      [t - 0.8, _, w],
      r,
      [(t + e) / 2, 40, s],
    ),
      xs(
        i,
        [t - 0.8, z - 0.12, S],
        [e + 0.8, z - 0.12, S],
        [e + 0.8, _ - 0.12, w],
        [t - 0.8, _ - 0.12, w],
        a,
        [(t + e) / 2, -40, s],
      ));
  }
  let b = Math.max(3, Math.round((e - t) / 4));
  for (let S = 0; S <= b; S++) {
    let w = t + ((e - t) * S) / b,
      z = d - 0.95;
    for (let _ of [-1, 1]) {
      let R = s + _ * (n + 0.6);
      ss(i, [w, d - 0.35, R], [w, p - 0.35, s], 0.22, 0.32, o);
      for (let T = 1; T < 6; T++) {
        let E = T / 6,
          A = R + (s - R) * E,
          C = d - 0.35 + (p - d) * E;
        (ss(i, [w, z, A], [w, C, A], 0.1, 0.1, o),
          T < 5 &&
            ss(
              i,
              [w, z, A],
              [
                w,
                d - 0.35 + ((p - d) * (T + 1)) / 6,
                R + ((s - R) * (T + 1)) / 6,
              ],
              0.08,
              0.08,
              o,
            ));
      }
      S % 2 === 0 &&
        (es(i, w, s + _ * n, 0.2, u, z, 10, o),
        Ms(
          i,
          w - 0.35,
          u,
          s + _ * n - 0.35,
          w + 0.35,
          u + 0.25,
          s + _ * n + 0.35,
          a,
        ));
    }
    ss(i, [w, z, m - 0.6], [w, z, g + 0.6], 0.2, 0.26, o);
    for (let _ of [s - n * 0.5, s + n * 0.5])
      Ms(i, w - 0.25, z - 0.32, _ - 0.25, w + 0.25, z - 0.12, _ + 0.25, f, {
        bottom: !0,
      });
  }
  for (let S of [-1, 1])
    for (let w of [0, 0.5]) {
      let z = s + S * (n + 0.6) * (1 - w),
        _ = d - 0.2 + (p - d) * w;
      ss(i, [t - 0.5, _, z], [e + 0.5, _, z], 0.14, 0.2, o);
    }
  ss(i, [t - 0.5, p - 0.2, s], [e + 0.5, p - 0.2, s], 0.16, 0.24, o);
  let x = t + 3,
    v = t + 12,
    y = s - 7,
    M = s - 1;
  for (let [S, w] of [
    [
      [x, y],
      [v, y],
    ],
    [
      [v, y],
      [v, M],
    ],
    [
      [v, M],
      [x, M],
    ],
    [
      [x, M],
      [x, y],
    ],
  ]) {
    xs(
      i,
      [S[0], u, S[1]],
      [w[0], u, w[1]],
      [w[0], u + 3.2, w[1]],
      [S[0], u + 3.2, S[1]],
      c,
      [
        (x + v) / 2 + (S[0] + w[0] - x - v) * 4,
        u + 1.6,
        (y + M) / 2 + (S[1] + w[1] - y - M) * 4,
      ],
    );
    let z = Math.hypot(w[0] - S[0], w[1] - S[1]),
      _ = Math.max(1, Math.round(z / 1.5));
    for (let R = 0; R <= _; R++) {
      let T = S[0] + ((w[0] - S[0]) * R) / _,
        E = S[1] + ((w[1] - S[1]) * R) / _;
      Ms(i, T - 0.07, u, E - 0.07, T + 0.07, u + 3.2, E + 0.07, l);
    }
    (ss(i, [S[0], u + 2.2, S[1]], [w[0], u + 2.2, w[1]], 0.1, 0.1, l),
      ss(i, [S[0], u + 0.9, S[1]], [w[0], u + 0.9, w[1]], 0.1, 0.1, l));
  }
  Ms(i, x - 0.3, u + 3.2, y - 0.3, v + 0.3, u + 3.5, M + 0.3, l, {
    bottom: !0,
  });
  for (let S of [s + 2.5, s + 6.5])
    for (let w of [t + 5, t + 11, t + 17])
      if (!(w > e - 3)) {
        (Ms(i, w - 1.6, u + 0.42, S - 0.25, w + 1.6, u + 0.48, S + 0.25, h),
          Ms(i, w - 1.6, u + 0.5, S + 0.2, w + 1.6, u + 0.95, S + 0.26, h));
        for (let z of [-1.3, 1.3])
          Ms(
            i,
            w + z - 0.05,
            u,
            S - 0.2,
            w + z + 0.05,
            u + 0.45,
            S + 0.2,
            At([0.15, 0.15, 0.15], Tt.metal),
          );
      }
  (Ms(
    i,
    t + 7,
    u,
    s + 3.7,
    t + 9,
    u + 0.6,
    s + 5.3,
    At([0.55, 0.53, 0.5], Tt.conc),
  ),
    Ms(
      i,
      t + 7.1,
      u + 0.6,
      s + 3.8,
      t + 8.9,
      u + 1.1,
      s + 5.2,
      At([0.15, 0.3, 0.1], Tt.paint),
    ));
}
function Fct(i, t, e, s, n, o, a, r) {
  Ms(i, t - s, n, e - s, t + s, n + 0.25, e + s, a);
  let l = [
    t - s - 0.1,
    n + o - 0.22,
    e - s - 0.1,
    t + s + 0.1,
    n + o,
    e + s + 0.1,
  ];
  for (let [c, h, f, u] of [
    [l[0], l[2], l[3], l[2] + 0.45],
    [l[0], l[5] - 0.45, l[3], l[5]],
    [l[0], l[2] + 0.45, l[0] + 0.45, l[5] - 0.45],
    [l[3] - 0.45, l[2] + 0.45, l[3], l[5] - 0.45],
  ])
    Ms(i, c, l[1], h, f, l[4], u, a, { bottom: !0 });
  for (let c = -s + 0.3; c < s - 0.2; c += 0.5)
    for (let [h, f] of [
      [t + c, e - s + 0.2],
      [t + c, e + s - 0.2],
      [t - s + 0.2, e + c],
      [t + s - 0.2, e + c],
    ])
      Ms(i, h - 0.1, n + 0.25, f - 0.1, h + 0.1, n + o - 0.22, f + 0.1, r, {
        top: !1,
      });
}
function Nr(i, t, e, s, n, { h: o = 1.1, step: a = 2.5 } = {}) {
  (ss(i, [t[0], s + o, t[1]], [e[0], s + o, e[1]], 0.07, 0.07, n),
    ss(i, [t[0], s + o * 0.5, t[1]], [e[0], s + o * 0.5, e[1]], 0.04, 0.04, n));
  let r = Math.hypot(e[0] - t[0], e[1] - t[1]),
    l = Math.max(1, Math.round(r / a));
  for (let c = 0; c <= l; c++) {
    let h = c / l,
      f = t[0] + (e[0] - t[0]) * h,
      u = t[1] + (e[1] - t[1]) * h;
    ss(i, [f, s, u], [f, s + o, u], 0.06, 0.06, n);
  }
}
function Nct(i, t, e, s) {
  let n = Math.cos(s),
    o = Math.sin(s),
    a = n,
    r = o,
    l = At([0.86, 0.87, 0.86], Tt.paint),
    c = At([0.06, 0.18, 0.4], Tt.paint),
    h = At([0.05, 0.07, 0.08], Tt.glass),
    f = At([0.35, 0.35, 0.35], Tt.metal);
  for (let u of [-1, 1]) {
    let d = t - r * u * 4.2,
      p = e + a * u * 4.2;
    (Us(i, d, p, a, r, 19, 1.4, -1, 1.2, l, { bottom: !0 }),
      Us(i, d + a * 19.85, p + r * 19.85, a, r, 0.85, 0.9, -0.5, 1.2, l),
      Us(i, d, p, a, r, 19.05, 1.45, 0.5, 0.9, c));
  }
  Us(i, t, e, a, r, 18.5, 5.6, 1.2, 2, l, { bottom: !0 });
  for (let [u, d, p, m] of [
    [2, 2.9, l, !1],
    [2.9, 4.1, h, !1],
    [4.1, 4.6, l, !0],
  ])
    Us(i, t + a * -2, e + r * -2, a, r, 13, 5.3, u, d, p, { top: m });
  for (let [u, d, p, m] of [
    [4.6, 5.3, l, !1],
    [5.3, 6.4, h, !1],
    [6.4, 6.8, l, !0],
  ])
    Us(i, t + a * -4, e + r * -4, a, r, 8, 4.6, u, d, p, { top: m });
  for (let [u, d, p, m] of [
    [6.8, 7.5, l, !1],
    [7.5, 8.3, h, !1],
    [8.3, 8.6, l, !0],
  ])
    Us(i, t + a * 2.5, e + r * 2.5, a, r, 2.2, 2.6, u, d, p, { top: m });
  es(i, t + a * 1.8, e + r * 1.8, 0.08, 8.6, 11.5, 5, f);
}
function Bct(i, t, e, s, n) {
  for (let r = 0; r < 13; r++)
    ((i.fillStyle = r % 2 ? "#f2f0ea" : "#b22234"),
      i.fillRect(t, e + (r * n) / 13, s, n / 13 + 1));
  let o = s * 0.4,
    a = (n * 7) / 13;
  ((i.fillStyle = "#3c3b6e"),
    i.fillRect(t, e, o, a),
    (i.fillStyle = "#f2f0ea"));
  for (let r = 0; r < 9; r++)
    for (let l = 0; l < (r % 2 ? 5 : 6); l++)
      (i.beginPath(),
        i.arc(
          t + o * ((l + (r % 2 ? 1 : 0.5)) / 6),
          e + a * ((r + 0.5) / 9.2),
          3,
          0,
          Math.PI * 2,
        ),
        i.fill());
}
function oS(i, t, e, s, n) {
  let o = t + s / 2,
    a = e + n / 2,
    r = s / 2 - 4;
  ((i.fillStyle = "#f3ecd8"),
    i.beginPath(),
    i.arc(o, a, r, 0, Math.PI * 2),
    i.fill(),
    (i.strokeStyle = "#1b1a18"),
    (i.lineWidth = 8),
    i.beginPath(),
    i.arc(o, a, r - 6, 0, Math.PI * 2),
    i.stroke(),
    (i.lineWidth = 2),
    i.beginPath(),
    i.arc(o, a, r - 50, 0, Math.PI * 2),
    i.stroke());
  for (let h = 0; h < 60; h++) {
    let f = (h / 60) * Math.PI * 2,
      u = r - 14,
      d = h % 5 ? r - 24 : r - 34;
    ((i.lineWidth = h % 5 ? 3 : 6),
      i.beginPath(),
      i.moveTo(o + Math.sin(f) * u, a - Math.cos(f) * u),
      i.lineTo(o + Math.sin(f) * d, a - Math.cos(f) * d),
      i.stroke());
  }
  let l = [
    "XII",
    "I",
    "II",
    "III",
    "IIII",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
  ];
  ((i.fillStyle = "#1b1a18"),
    (i.font = "bold 42px Georgia, serif"),
    (i.textAlign = "center"),
    (i.textBaseline = "middle"),
    l.forEach((h, f) => {
      let u = (f / 12) * Math.PI * 2,
        d = r - 82;
      (i.save(),
        i.translate(o + Math.sin(u) * d, a - Math.cos(u) * d),
        i.rotate(u),
        i.fillText(h, 0, 0),
        i.restore());
    }));
  let c = (h, f, u) => {
    (i.save(),
      i.translate(o, a),
      i.rotate(h),
      i.beginPath(),
      i.moveTo(-u / 2, 20),
      i.lineTo(-u / 3, -f),
      i.lineTo(0, -f - 14),
      i.lineTo(u / 3, -f),
      i.lineTo(u / 2, 20),
      i.closePath(),
      i.fill(),
      i.restore());
  };
  (c(((10 + 10 / 60) / 12) * Math.PI * 2, r * 0.5, 16),
    c((10 / 60) * Math.PI * 2, r * 0.78, 10),
    i.beginPath(),
    i.arc(o, a, 12, 0, Math.PI * 2),
    i.fill(),
    (i.textAlign = "start"));
}
