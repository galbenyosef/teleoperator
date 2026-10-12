// app 196 — math
// Lines 109212-109414 of readable/app.pretty.js (statement-aligned).
function d1t(i, t) {
  let { D: e, L: s } = t,
    n = z$(e, Wy.mint);
  if (!n) return;
  let o = va(n),
    a = Xo(o),
    r = 1e9,
    l = -1e9;
  for (let [T, E] of o) {
    let A = s.driveHeight(T, E);
    ((r = Math.min(r, A)), (l = Math.max(l, A)));
  }
  let c = l + 3.4,
    h = c + 12.4,
    f = h + 1.6;
  (ys(i, o, r - 0.6, c, b$, { vBase: r }),
    vo(i, a, 0.25, c - 0.4, c - 0.06, vk),
    ys(i, o, c, h, f1t, { vBase: c - 1.2 }),
    vo(i, a, 0.95, h, h + 0.75, cm),
    vo(i, a, 0.5, h - 0.45, h, vk),
    ys(i, o, h + 0.75, f, cm),
    Ua(i, o, f, x$));
  let u = hm(s, a, "5th Street"),
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
    x = 11.2,
    v = (T, E, A) => [
      m[0] + d[0] * T + p[0] * E,
      A,
      m[1] + d[1] * T + p[1] * E,
    ];
  nn(
    i,
    [m[0] + (p[0] * b) / 2, m[1] + (p[1] * b) / 2],
    d,
    p,
    x + 0.6,
    b / 2 + 0.05,
    r - 0.4,
    c,
    b$,
  );
  for (let T = 0; T < 6; T++) {
    let E = -x + 1.1 + (T * (2 * x - 2.2)) / 5,
      A = v(E, b - 0.9, 0);
    (Oe(
      i,
      A[0],
      A[2],
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
      cm,
    ),
      t.colliders.push({
        t: "circ",
        x: A[0],
        z: A[2],
        r: 0.75,
        y0: c - 1,
        y1: h,
      }));
  }
  nn(
    i,
    [m[0] + (p[0] * b) / 2, m[1] + (p[1] * b) / 2],
    d,
    p,
    x + 0.4,
    b / 2 + 0.1,
    h,
    h + 1.7,
    cm,
  );
  let y = h + 1.7,
    M = 3.6,
    S = -0.3,
    w = b + 0.2;
  for (let T of [w, S])
    ne(i, [v(-x - 0.4, T, y), v(x + 0.4, T, y), v(0, T, y + M)], cm, [
      p[0] * (T > 0 ? 1 : -1),
      0,
      p[1] * (T > 0 ? 1 : -1),
    ]);
  for (let T of [-1, 1])
    ne(
      i,
      [
        v(T * (x + 0.7), w + 0.3, y - 0.05),
        v(0, w + 0.3, y + M + 0.25),
        v(0, S, y + M + 0.25),
        v(T * (x + 0.7), S, y - 0.05),
      ],
      x$,
      [d[0] * T * 0.6, 1, d[1] * T * 0.6],
    );
  for (let T of [-5, 0, 5])
    ne(
      i,
      [
        v(T - 1.1, 0.06, c),
        v(T + 1.1, 0.06, c),
        v(T + 1.1, 0.06, c + 4.8),
        v(T - 1.1, 0.06, c + 4.8),
      ],
      E$,
      [p[0], 0, p[1]],
    );
  let z = Math.max(1, Math.round((c - r) / 0.18)),
    _ = Math.min(0.34, (g * 0.55) / z);
  for (let T = 0; T < z; T++) {
    let E = c - (T * (c - r)) / z,
      A = b + T * _;
    nn(
      i,
      [m[0] + p[0] * (A + _ / 2), m[1] + p[1] * (A + _ / 2)],
      d,
      p,
      x - 1.5,
      _ / 2,
      r - 0.4,
      E,
      T % 2 ? cm : vk,
    );
  }
  let R = a.reduce((T, E) =>
    E.n[0] * p[0] + E.n[1] * p[1] < T.n[0] * p[0] + T.n[1] * p[1] ? E : T,
  );
  for (let T of [-1, 1]) {
    let E = [
      R.m[0] - R.n[0] * 9 + d[0] * T * 14,
      R.m[1] - R.n[1] * 9 + d[1] * T * 14,
    ];
    (nn(i, E, d, p, 1.4, 1.4, f - 0.5, f + 8.5, u1t),
      nn(i, E, d, p, 1.7, 1.7, f + 8.5, f + 9.2, vk));
  }
  for (let T of a) {
    if (T.L < 10 || T === u) continue;
    let E = Math.floor(T.L / 7.5);
    for (let A = 1; A < E; A++) {
      let C = (A / E) * T.L,
        P = [
          T.a[0] + T.u[0] * C + T.n[0] * 0.18,
          T.a[1] + T.u[1] * C + T.n[1] * 0.18,
        ];
      nn(i, P, T.u, T.n, 0.55, 0.18, c, h, cm, !1);
    }
  }
  (NP(t, o, r - 3, f + 10),
    NP(
      t,
      [
        v(-x - 0.6, -0.2, 0),
        v(x + 0.6, -0.2, 0),
        v(x + 0.6, b + z * _ * 0.4, 0),
        v(-x - 0.6, b + z * _ * 0.4, 0),
      ].map((T) => [T[0], T[2]]),
      r - 3,
      c + 0.1,
    ));
}
var IP = Be(be.terracotta, 0.46, 0.2, 0.14),
  v$ = Be(be.terracotta, 0.38, 0.17, 0.12),
  Ub = Be(be.granite, 0.62, 0.58, 0.52),
  p1t = Be(be.slate, 0.42, 0.42, 0.45),
  y$ = It(Lt.glass, 0.05, 0.05, 0.07),
  w$ = It(Lt.matte, 0.06, 0.05, 0.045);
function yk(i, t, e, s, n, o, a, r, l) {
  let c = [t(s - o / 2, n, a), t(s + o / 2, n, a), t(s + o / 2, n, r)];
  for (let h = 1; h < 6; h++) {
    let f = h / 6,
      u = (f * Math.PI) / 2;
    c.push(
      t(s + o / 2 - ((1 - Math.cos(u)) * o) / 2, n, r + Math.sin(u) * o * 0.75),
    );
  }
  c.push(t(s, n, r + o * 0.75));
  for (let h = 5; h >= 1; h--) {
    let f = h / 6,
      u = (f * Math.PI) / 2;
    c.push(
      t(s - o / 2 + ((1 - Math.cos(u)) * o) / 2, n, r + Math.sin(u) * o * 0.75),
    );
  }
  (c.push(t(s - o / 2, n, r)), ne(i, c, l, e));
}
