// app 54 — math
// Lines 62676-62874 of readable/app.pretty.js (statement-aligned).
function Y7({ B: o, colliders: t }, e = {}) {
  let s = o.R("cupid"),
    n = s.solid,
    i = he[xn - 1] + ps[xn - 1].hw,
    a = i + 1,
    r = Ye.x - 0.2,
    l = pe[ks - 1] + 62,
    c = pe[ks - 1] + 112,
    h = e.y ?? 3.22;
  e.at ||
    ($i(
      n,
      [
        [a, h, l],
        [r - 5, h, l],
        [r - 5, h, c],
        [a, h, c],
      ],
      Rt([0.1, 0.17, 0.05], Tt.lawn),
    ),
    $i(
      n,
      [
        [r - 5, h - 0.02, l - 2],
        [r, h - 0.02, l - 2],
        [r, h - 0.02, c],
        [r - 5, h - 0.02, c],
      ],
      Rt([0.48, 0.47, 0.44], Tt.conc),
    ),
    zs(
      n,
      a - 0.3,
      2.6,
      l - 0.3,
      r,
      h - 0.03,
      c + 0.3,
      Rt([0.55, 0.53, 0.5], Tt.conc),
      { top: !1 },
    ),
    $i(
      n,
      [
        [a - 1.2, h - 0.03, pe[ks - 1] + 18],
        [r, h - 0.03, pe[ks - 1] + 18],
        [r, h - 0.03, l],
        [a - 1.2, h - 0.03, l],
      ],
      Rt([0.44, 0.43, 0.41], Tt.conc),
    ));
  let f = e.at ? e.at[0] : (a + r - 5) / 2 + 1,
    u = e.at ? e.at[1] : l + 8,
    d = (P, C, I = 0) => [f + I, h + C, u + P],
    p = (P, C, I, L) =>
      [0, 1].map(
        (F) => (1 - L) * (1 - L) * P[F] + 2 * L * (1 - L) * C[F] + L * L * I[F],
      ),
    m = [0, -3],
    g = [26, -2],
    b = [30, 19],
    v = [],
    x = [];
  for (let P = 0; P <= 40; P++) {
    let C = P / 40,
      [I, L] = p(m, g, b, C);
    (v.push(d(I, L)),
      x.push(
        0.35 + 0.55 * Math.exp(-Math.pow((C - 0.5) / 0.16, 2)) + 0.12 * (1 - C),
      ));
  }
  let y = Rt([0.62, 0.42, 0.12], Tt.metal),
    M = Rt([0.85, 0.84, 0.8], Tt.paint),
    S = Rt([0.55, 0.06, 0.04], Tt.paint);
  (Qi(n, v, x, 10, y, { caps: !0 }), Qi(n, [d(...m), d(...b)], 0.09, 6, M));
  let w = p(m, g, b, 0.5),
    _ = [(m[0] + b[0]) / 2, (m[1] + b[1]) / 2],
    z = [w[0] - _[0], w[1] - _[1]],
    A = Math.hypot(...z),
    T = [z[0] / A, z[1] / A],
    E = [w[0] + T[0] * 6, w[1] + T[1] * 6],
    R = [_[0] - T[0] * 9, _[1] - T[1] * 9];
  Qi(n, [d(...E), d(...R)], 0.3, 8, M, { caps: !0 });
  for (let P = 0; P < 3; P++) {
    let C = (P / 3) * Math.PI * 2 + 0.3,
      I = Math.cos(C),
      L = Math.sin(C),
      F = [R[0] + T[0] * 0.5, R[1] + T[1] * 0.5],
      O = [R[0] + T[0] * 4.2, R[1] + T[1] * 4.2],
      B = [-T[1], T[0]],
      H = (N, D) => [
        f + L * D,
        h + N[1] + B[1] * I * D,
        u + N[0] + B[0] * I * D,
      ];
    (Ms(
      n,
      H(F, 0.3),
      H(O, 0.3),
      H([O[0] - T[0] * 1, O[1] - T[1] * 1], 1.15),
      H(F, 1.25),
      S,
      null,
    ),
      Ms(
        n,
        H(F, 1.25),
        H([O[0] - T[0] * 1, O[1] - T[1] * 1], 1.15),
        H(O, 0.3),
        H(F, 0.3),
        S,
        null,
      ));
  }
  for (let P of [0.35, 0.45, 0.55]) {
    let [C] = p(m, g, b, P);
    t.push({ t: "circ", x: f, z: u + C, r: 1.3 });
  }
  t.push({ t: "circ", x: f, z: u + w[0] + T[0] * 3, r: 0.6 });
}
es();
Pn();
es();
Ya();
Pn();
var Fb = dt;
function Xo(o, t, e, s, n, i) {
  let a = new Fb(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    r = a.length();
  if (r < 1e-4) return;
  a.divideScalar(r);
  let l = Math.abs(a.y) > 0.95 ? new Fb(1, 0, 0) : new Fb(0, 1, 0),
    c = new Fb().crossVectors(a, l).normalize(),
    h = new Fb().crossVectors(c, a).normalize(),
    f = (p, m, g) => [
      p[0] + (c.x * m * s) / 2 + (h.x * g * n) / 2,
      p[1] + (c.y * m * s) / 2 + (h.y * g * n) / 2,
      p[2] + (c.z * m * s) / 2 + (h.z * g * n) / 2,
    ],
    u = [f(t, -1, -1), f(t, 1, -1), f(t, 1, 1), f(t, -1, 1)],
    d = [f(e, -1, -1), f(e, 1, -1), f(e, 1, 1), f(e, -1, 1)];
  for (let p = 0; p < 4; p++) {
    let m = (p + 1) % 4;
    o.quad(u[p], u[m], d[m], d[p], [0, 0], [s, 0], [s, r], [0, r], i);
  }
}
function Ha(o, t, e, s, n, i, a, r, l, c) {
  let h = -n,
    f = s,
    u = (p, m, g) => [t + s * i * p + h * a * m, g, e + n * i * p + f * a * m],
    d = (p, m, g, b) => o.quad(p, m, g, b, [0, 0], [1, 0], [1, 1], [0, 1], c);
  (d(u(-1, -1, r), u(1, -1, r), u(1, -1, l), u(-1, -1, l)),
    d(u(1, 1, r), u(-1, 1, r), u(-1, 1, l), u(1, 1, l)),
    d(u(1, -1, r), u(1, 1, r), u(1, 1, l), u(1, -1, l)),
    d(u(-1, 1, r), u(-1, -1, r), u(-1, -1, l), u(-1, 1, l)),
    d(u(-1, -1, l), u(1, -1, l), u(1, 1, l), u(-1, 1, l)),
    d(u(-1, 1, r), u(1, 1, r), u(1, -1, r), u(-1, -1, r)));
}
function oh(o, t) {
  t = Math.max(0, Math.min(o.len - 0.001, t));
  let e = 0,
    s = 0,
    n = o.s.length - 1;
  for (; n - s > 1;) {
    let c = (s + n) >> 1;
    o.s[c] <= t ? (s = c) : (n = c);
  }
  e = s;
  let i = o.pts[e],
    a = o.pts[e + 1],
    r = o.s[e + 1] - o.s[e],
    l = (t - o.s[e]) / r;
  return {
    x: i[0] + (a[0] - i[0]) * l,
    z: i[2] + (a[2] - i[2]) * l,
    y: i[1] + (a[1] - i[1]) * l,
    ux: (a[0] - i[0]) / r,
    uz: (a[2] - i[2]) / r,
  };
}
var J7 = {},
  Z7 = null;
function Q7(o) {
  Z7 = o;
}
function ff(o, t) {
  if (Z7) return Z7(o, t);
  let e = uo.find((n) => n.id === (o === "gg" ? "101" : "80")),
    s = o === "gg" ? Qe.at(0) : ts.at(0);
  if (J7[o] === void 0) {
    let n = 1e9;
    for (let i = 0; i < e.len; i += 1) {
      let a = oh(e, i),
        r = Math.hypot(a.x - s[0], a.z - s[1]);
      r < n && ((n = r), (J7[o] = i));
    }
  }
  return oh(e, J7[o] + t);
}
