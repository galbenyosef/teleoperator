// app 195 — math
// Lines 109468-109670 of readable/app.pretty.js (statement-aligned).
function Bgt(o, t) {
  let { D: e, L: s } = t,
    n = RK(e, Nw.mint);
  if (!n) return;
  let i = Ra(n),
    a = ia(i),
    r = 1e9,
    l = -1e9;
  for (let [T, E] of i) {
    let R = s.driveHeight(T, E);
    ((r = Math.min(r, R)), (l = Math.max(l, R)));
  }
  let c = l + 3.4,
    h = c + 12.4,
    f = h + 1.6;
  (Ss(o, i, r - 0.6, c, yK, { vBase: r }),
    Eo(o, a, 0.25, c - 0.4, c - 0.06, vz),
    Ss(o, i, c, h, Fgt, { vBase: c - 1.2 }),
    Eo(o, a, 0.95, h, h + 0.75, Zm),
    Eo(o, a, 0.5, h - 0.45, h, vz),
    Ss(o, i, h + 0.75, f, Zm),
    sr(o, i, f, wK));
  let u = Qm(s, a, "5th Street"),
    d = u.u,
    p = u.n,
    m = u.m,
    g = 0.5;
  for (
    ;
    g < 20 &&
    s.surfaceAt(m[0] + p[0] * (g + 0.5), m[1] + p[1] * (g + 0.5)) !== "road";
  )
    g += 0.5;
  g = Math.max(4, g - 1.6);
  let b = Math.min(5.5, g * 0.45),
    v = 11.2,
    x = (T, E, R) => [
      m[0] + d[0] * T + p[0] * E,
      R,
      m[1] + d[1] * T + p[1] * E,
    ];
  cn(
    o,
    [m[0] + (p[0] * b) / 2, m[1] + (p[1] * b) / 2],
    d,
    p,
    v + 0.6,
    b / 2 + 0.05,
    r - 0.4,
    c,
    yK,
  );
  for (let T = 0; T < 6; T++) {
    let E = -v + 1.1 + (T * (2 * v - 2.2)) / 5,
      R = x(E, b - 0.9, 0);
    (qe(
      o,
      R[0],
      R[2],
      [
        [0.78, c],
        [0.72, c + 0.3],
        [0.7, c + 0.4],
        [0.62, h - 1],
        [0.58, h - 0.6],
        [0.8, h - 0.35],
        [0.8, h],
      ],
      12,
      Zm,
    ),
      t.colliders.push({
        t: "circ",
        x: R[0],
        z: R[2],
        r: 0.75,
        y0: c - 1,
        y1: h,
      }));
  }
  cn(
    o,
    [m[0] + (p[0] * b) / 2, m[1] + (p[1] * b) / 2],
    d,
    p,
    v + 0.4,
    b / 2 + 0.1,
    h,
    h + 1.7,
    Zm,
  );
  let y = h + 1.7,
    M = 3.6,
    S = -0.3,
    w = b + 0.2;
  for (let T of [w, S])
    oe(o, [x(-v - 0.4, T, y), x(v + 0.4, T, y), x(0, T, y + M)], Zm, [
      p[0] * (T > 0 ? 1 : -1),
      0,
      p[1] * (T > 0 ? 1 : -1),
    ]);
  for (let T of [-1, 1])
    oe(
      o,
      [
        x(T * (v + 0.7), w + 0.3, y - 0.05),
        x(0, w + 0.3, y + M + 0.25),
        x(0, S, y + M + 0.25),
        x(T * (v + 0.7), S, y - 0.05),
      ],
      wK,
      [d[0] * T * 0.6, 1, d[1] * T * 0.6],
    );
  for (let T of [-5, 0, 5])
    oe(
      o,
      [
        x(T - 1.1, 0.06, c),
        x(T + 1.1, 0.06, c),
        x(T + 1.1, 0.06, c + 4.8),
        x(T - 1.1, 0.06, c + 4.8),
      ],
      AK,
      [p[0], 0, p[1]],
    );
  let _ = Math.max(1, Math.round((c - r) / 0.18)),
    z = Math.min(0.34, (g * 0.55) / _);
  for (let T = 0; T < _; T++) {
    let E = c - (T * (c - r)) / _,
      R = b + T * z;
    cn(
      o,
      [m[0] + p[0] * (R + z / 2), m[1] + p[1] * (R + z / 2)],
      d,
      p,
      v - 1.5,
      z / 2,
      r - 0.4,
      E,
      T % 2 ? Zm : vz,
    );
  }
  let A = a.reduce((T, E) =>
    E.n[0] * p[0] + E.n[1] * p[1] < T.n[0] * p[0] + T.n[1] * p[1] ? E : T,
  );
  for (let T of [-1, 1]) {
    let E = [
      A.m[0] - A.n[0] * 9 + d[0] * T * 14,
      A.m[1] - A.n[1] * 9 + d[1] * T * 14,
    ];
    (cn(o, E, d, p, 1.4, 1.4, f - 0.5, f + 8.5, Ogt),
      cn(o, E, d, p, 1.7, 1.7, f + 8.5, f + 9.2, vz));
  }
  for (let T of a) {
    if (T.L < 10 || T === u) continue;
    let E = Math.floor(T.L / 7.5);
    for (let R = 1; R < E; R++) {
      let P = (R / E) * T.L,
        C = [
          T.a[0] + T.u[0] * P + T.n[0] * 0.18,
          T.a[1] + T.u[1] * P + T.n[1] * 0.18,
        ];
      cn(o, C, T.u, T.n, 0.55, 0.18, c, h, Zm, !1);
    }
  }
  (uL(t, i, r - 3, f + 10),
    uL(
      t,
      [
        x(-v - 0.6, -0.2, 0),
        x(v + 0.6, -0.2, 0),
        x(v + 0.6, b + _ * z * 0.4, 0),
        x(-v - 0.6, b + _ * z * 0.4, 0),
      ].map((T) => [T[0], T[2]]),
      r - 3,
      c + 0.1,
    ));
}
var hL = We(we.terracotta, 0.46, 0.2, 0.14),
  MK = We(we.terracotta, 0.38, 0.17, 0.12),
  Ex = We(we.granite, 0.62, 0.58, 0.52),
  Ngt = We(we.slate, 0.42, 0.42, 0.45),
  SK = Lt(Ct.glass, 0.05, 0.05, 0.07),
  kK = Lt(Ct.matte, 0.06, 0.05, 0.045);
function yz(o, t, e, s, n, i, a, r, l) {
  let c = [t(s - i / 2, n, a), t(s + i / 2, n, a), t(s + i / 2, n, r)];
  for (let h = 1; h < 6; h++) {
    let f = h / 6,
      u = (f * Math.PI) / 2;
    c.push(
      t(s + i / 2 - ((1 - Math.cos(u)) * i) / 2, n, r + Math.sin(u) * i * 0.75),
    );
  }
  c.push(t(s, n, r + i * 0.75));
  for (let h = 5; h >= 1; h--) {
    let f = h / 6,
      u = (f * Math.PI) / 2;
    c.push(
      t(s - i / 2 + ((1 - Math.cos(u)) * i) / 2, n, r + Math.sin(u) * i * 0.75),
    );
  }
  (c.push(t(s - i / 2, n, r)), oe(o, c, l, e));
}
