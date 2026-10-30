// app 16 — math
// Lines 41323-41671 of readable/app.pretty.js (statement-aligned).
function edt(o, t, e, s, n) {
  let i = Rt([0.62, 0.17, 0.06], Tt.paint),
    a = Rt([0.86, 0.86, 0.84], Tt.paint),
    r = Rt([0.5, 0.52, 0.53], Tt.corr),
    l = Rt([0.08, 0.28, 0.62], Tt.paint),
    c = Rt([0.16, 0.2, 0.22], Tt.glass),
    h = Rt([0.5, 0.32, 0.18], Tt.planks),
    f = Rt([1, 0.9, 0.7], Tt.lamp),
    u = 3,
    d = 9,
    p = 11.4,
    m = s - n,
    g = s + n;
  for (let [S, w] of [
    [m - 0.8, s],
    [g + 0.8, s],
  ]) {
    let _ = d - 0.15,
      z = p;
    (Ms(
      o,
      [t - 0.8, _, S],
      [e + 0.8, _, S],
      [e + 0.8, z, w],
      [t - 0.8, z, w],
      r,
      [(t + e) / 2, 40, s],
    ),
      Ms(
        o,
        [t - 0.8, _ - 0.12, S],
        [e + 0.8, _ - 0.12, S],
        [e + 0.8, z - 0.12, w],
        [t - 0.8, z - 0.12, w],
        a,
        [(t + e) / 2, -40, s],
      ));
  }
  let b = Math.max(3, Math.round((e - t) / 4));
  for (let S = 0; S <= b; S++) {
    let w = t + ((e - t) * S) / b,
      _ = d - 0.95;
    for (let z of [-1, 1]) {
      let A = s + z * (n + 0.6);
      rs(o, [w, d - 0.35, A], [w, p - 0.35, s], 0.22, 0.32, i);
      for (let T = 1; T < 6; T++) {
        let E = T / 6,
          R = A + (s - A) * E,
          P = d - 0.35 + (p - d) * E;
        (rs(o, [w, _, R], [w, P, R], 0.1, 0.1, i),
          T < 5 &&
            rs(
              o,
              [w, _, R],
              [
                w,
                d - 0.35 + ((p - d) * (T + 1)) / 6,
                A + ((s - A) * (T + 1)) / 6,
              ],
              0.08,
              0.08,
              i,
            ));
      }
      S % 2 === 0 &&
        (os(o, w, s + z * n, 0.2, u, _, 10, i),
        zs(
          o,
          w - 0.35,
          u,
          s + z * n - 0.35,
          w + 0.35,
          u + 0.25,
          s + z * n + 0.35,
          a,
        ));
    }
    rs(o, [w, _, m - 0.6], [w, _, g + 0.6], 0.2, 0.26, i);
    for (let z of [s - n * 0.5, s + n * 0.5])
      zs(o, w - 0.25, _ - 0.32, z - 0.25, w + 0.25, _ - 0.12, z + 0.25, f, {
        bottom: !0,
      });
  }
  for (let S of [-1, 1])
    for (let w of [0, 0.5]) {
      let _ = s + S * (n + 0.6) * (1 - w),
        z = d - 0.2 + (p - d) * w;
      rs(o, [t - 0.5, z, _], [e + 0.5, z, _], 0.14, 0.2, i);
    }
  rs(o, [t - 0.5, p - 0.2, s], [e + 0.5, p - 0.2, s], 0.16, 0.24, i);
  let v = t + 3,
    x = t + 12,
    y = s - 7,
    M = s - 1;
  for (let [S, w] of [
    [
      [v, y],
      [x, y],
    ],
    [
      [x, y],
      [x, M],
    ],
    [
      [x, M],
      [v, M],
    ],
    [
      [v, M],
      [v, y],
    ],
  ]) {
    Ms(
      o,
      [S[0], u, S[1]],
      [w[0], u, w[1]],
      [w[0], u + 3.2, w[1]],
      [S[0], u + 3.2, S[1]],
      c,
      [
        (v + x) / 2 + (S[0] + w[0] - v - x) * 4,
        u + 1.6,
        (y + M) / 2 + (S[1] + w[1] - y - M) * 4,
      ],
    );
    let _ = Math.hypot(w[0] - S[0], w[1] - S[1]),
      z = Math.max(1, Math.round(_ / 1.5));
    for (let A = 0; A <= z; A++) {
      let T = S[0] + ((w[0] - S[0]) * A) / z,
        E = S[1] + ((w[1] - S[1]) * A) / z;
      zs(o, T - 0.07, u, E - 0.07, T + 0.07, u + 3.2, E + 0.07, l);
    }
    (rs(o, [S[0], u + 2.2, S[1]], [w[0], u + 2.2, w[1]], 0.1, 0.1, l),
      rs(o, [S[0], u + 0.9, S[1]], [w[0], u + 0.9, w[1]], 0.1, 0.1, l));
  }
  zs(o, v - 0.3, u + 3.2, y - 0.3, x + 0.3, u + 3.5, M + 0.3, l, {
    bottom: !0,
  });
  for (let S of [s + 2.5, s + 6.5])
    for (let w of [t + 5, t + 11, t + 17])
      if (!(w > e - 3)) {
        (zs(o, w - 1.6, u + 0.42, S - 0.25, w + 1.6, u + 0.48, S + 0.25, h),
          zs(o, w - 1.6, u + 0.5, S + 0.2, w + 1.6, u + 0.95, S + 0.26, h));
        for (let _ of [-1.3, 1.3])
          zs(
            o,
            w + _ - 0.05,
            u,
            S - 0.2,
            w + _ + 0.05,
            u + 0.45,
            S + 0.2,
            Rt([0.15, 0.15, 0.15], Tt.metal),
          );
      }
  (zs(
    o,
    t + 7,
    u,
    s + 3.7,
    t + 9,
    u + 0.6,
    s + 5.3,
    Rt([0.55, 0.53, 0.5], Tt.conc),
  ),
    zs(
      o,
      t + 7.1,
      u + 0.6,
      s + 3.8,
      t + 8.9,
      u + 1.1,
      s + 5.2,
      Rt([0.15, 0.3, 0.1], Tt.paint),
    ));
}
function sdt(o, t, e, s, n, i, a, r) {
  zs(o, t - s, n, e - s, t + s, n + 0.25, e + s, a);
  let l = [
    t - s - 0.1,
    n + i - 0.22,
    e - s - 0.1,
    t + s + 0.1,
    n + i,
    e + s + 0.1,
  ];
  for (let [c, h, f, u] of [
    [l[0], l[2], l[3], l[2] + 0.45],
    [l[0], l[5] - 0.45, l[3], l[5]],
    [l[0], l[2] + 0.45, l[0] + 0.45, l[5] - 0.45],
    [l[3] - 0.45, l[2] + 0.45, l[3], l[5] - 0.45],
  ])
    zs(o, c, l[1], h, f, l[4], u, a, { bottom: !0 });
  for (let c = -s + 0.3; c < s - 0.2; c += 0.5)
    for (let [h, f] of [
      [t + c, e - s + 0.2],
      [t + c, e + s - 0.2],
      [t - s + 0.2, e + c],
      [t + s - 0.2, e + c],
    ])
      zs(o, h - 0.1, n + 0.25, f - 0.1, h + 0.1, n + i - 0.22, f + 0.1, r, {
        top: !1,
      });
}
function s0(o, t, e, s, n, { h: i = 1.1, step: a = 2.5 } = {}) {
  (rs(o, [t[0], s + i, t[1]], [e[0], s + i, e[1]], 0.07, 0.07, n),
    rs(o, [t[0], s + i * 0.5, t[1]], [e[0], s + i * 0.5, e[1]], 0.04, 0.04, n));
  let r = Math.hypot(e[0] - t[0], e[1] - t[1]),
    l = Math.max(1, Math.round(r / a));
  for (let c = 0; c <= l; c++) {
    let h = c / l,
      f = t[0] + (e[0] - t[0]) * h,
      u = t[1] + (e[1] - t[1]) * h;
    rs(o, [f, s, u], [f, s + i, u], 0.06, 0.06, n);
  }
}
function ndt(o, t, e, s) {
  let n = Math.cos(s),
    i = Math.sin(s),
    a = n,
    r = i,
    l = Rt([0.86, 0.87, 0.86], Tt.paint),
    c = Rt([0.06, 0.18, 0.4], Tt.paint),
    h = Rt([0.05, 0.07, 0.08], Tt.glass),
    f = Rt([0.35, 0.35, 0.35], Tt.metal);
  for (let u of [-1, 1]) {
    let d = t - r * u * 4.2,
      p = e + a * u * 4.2;
    (Vs(o, d, p, a, r, 19, 1.4, -1, 1.2, l, { bottom: !0 }),
      Vs(o, d + a * 19.85, p + r * 19.85, a, r, 0.85, 0.9, -0.5, 1.2, l),
      Vs(o, d, p, a, r, 19.05, 1.45, 0.5, 0.9, c));
  }
  Vs(o, t, e, a, r, 18.5, 5.6, 1.2, 2, l, { bottom: !0 });
  for (let [u, d, p, m] of [
    [2, 2.9, l, !1],
    [2.9, 4.1, h, !1],
    [4.1, 4.6, l, !0],
  ])
    Vs(o, t + a * -2, e + r * -2, a, r, 13, 5.3, u, d, p, { top: m });
  for (let [u, d, p, m] of [
    [4.6, 5.3, l, !1],
    [5.3, 6.4, h, !1],
    [6.4, 6.8, l, !0],
  ])
    Vs(o, t + a * -4, e + r * -4, a, r, 8, 4.6, u, d, p, { top: m });
  for (let [u, d, p, m] of [
    [6.8, 7.5, l, !1],
    [7.5, 8.3, h, !1],
    [8.3, 8.6, l, !0],
  ])
    Vs(o, t + a * 2.5, e + r * 2.5, a, r, 2.2, 2.6, u, d, p, { top: m });
  os(o, t + a * 1.8, e + r * 1.8, 0.08, 8.6, 11.5, 5, f);
}
function idt(o, t, e, s, n) {
  for (let r = 0; r < 13; r++)
    ((o.fillStyle = r % 2 ? "#f2f0ea" : "#b22234"),
      o.fillRect(t, e + (r * n) / 13, s, n / 13 + 1));
  let i = s * 0.4,
    a = (n * 7) / 13;
  ((o.fillStyle = "#3c3b6e"),
    o.fillRect(t, e, i, a),
    (o.fillStyle = "#f2f0ea"));
  for (let r = 0; r < 9; r++)
    for (let l = 0; l < (r % 2 ? 5 : 6); l++)
      (o.beginPath(),
        o.arc(
          t + i * ((l + (r % 2 ? 1 : 0.5)) / 6),
          e + a * ((r + 0.5) / 9.2),
          3,
          0,
          Math.PI * 2,
        ),
        o.fill());
}
function rk(o, t, e, s, n) {
  let i = t + s / 2,
    a = e + n / 2,
    r = s / 2 - 4;
  ((o.fillStyle = "#f3ecd8"),
    o.beginPath(),
    o.arc(i, a, r, 0, Math.PI * 2),
    o.fill(),
    (o.strokeStyle = "#1b1a18"),
    (o.lineWidth = 8),
    o.beginPath(),
    o.arc(i, a, r - 6, 0, Math.PI * 2),
    o.stroke(),
    (o.lineWidth = 2),
    o.beginPath(),
    o.arc(i, a, r - 50, 0, Math.PI * 2),
    o.stroke());
  for (let h = 0; h < 60; h++) {
    let f = (h / 60) * Math.PI * 2,
      u = r - 14,
      d = h % 5 ? r - 24 : r - 34;
    ((o.lineWidth = h % 5 ? 3 : 6),
      o.beginPath(),
      o.moveTo(i + Math.sin(f) * u, a - Math.cos(f) * u),
      o.lineTo(i + Math.sin(f) * d, a - Math.cos(f) * d),
      o.stroke());
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
  ((o.fillStyle = "#1b1a18"),
    (o.font = "bold 42px Georgia, serif"),
    (o.textAlign = "center"),
    (o.textBaseline = "middle"),
    l.forEach((h, f) => {
      let u = (f / 12) * Math.PI * 2,
        d = r - 82;
      (o.save(),
        o.translate(i + Math.sin(u) * d, a - Math.cos(u) * d),
        o.rotate(u),
        o.fillText(h, 0, 0),
        o.restore());
    }));
  let c = (h, f, u) => {
    (o.save(),
      o.translate(i, a),
      o.rotate(h),
      o.beginPath(),
      o.moveTo(-u / 2, 20),
      o.lineTo(-u / 3, -f),
      o.lineTo(0, -f - 14),
      o.lineTo(u / 3, -f),
      o.lineTo(u / 2, 20),
      o.closePath(),
      o.fill(),
      o.restore());
  };
  (c(((10 + 10 / 60) / 12) * Math.PI * 2, r * 0.5, 16),
    c((10 / 60) * Math.PI * 2, r * 0.78, 10),
    o.beginPath(),
    o.arc(i, a, 12, 0, Math.PI * 2),
    o.fill(),
    (o.textAlign = "start"));
}
