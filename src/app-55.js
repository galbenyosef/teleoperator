// app 55 — math
// Lines 62445-62643 of readable/app.pretty.js (statement-aligned).
function yR({ B: i, colliders: t }, e = {}) {
  let s = i.R("cupid"),
    n = s.solid,
    o = ae[mn - 1] + ls[mn - 1].hw,
    a = o + 1,
    r = Ve.x - 0.2,
    l = fe[ws - 1] + 62,
    c = fe[ws - 1] + 112,
    h = e.y ?? 3.22;
  e.at ||
    (Fi(
      n,
      [
        [a, h, l],
        [r - 5, h, l],
        [r - 5, h, c],
        [a, h, c],
      ],
      At([0.1, 0.17, 0.05], Tt.lawn),
    ),
    Fi(
      n,
      [
        [r - 5, h - 0.02, l - 2],
        [r, h - 0.02, l - 2],
        [r, h - 0.02, c],
        [r - 5, h - 0.02, c],
      ],
      At([0.48, 0.47, 0.44], Tt.conc),
    ),
    Ms(
      n,
      a - 0.3,
      2.6,
      l - 0.3,
      r,
      h - 0.03,
      c + 0.3,
      At([0.55, 0.53, 0.5], Tt.conc),
      { top: !1 },
    ),
    Fi(
      n,
      [
        [a - 1.2, h - 0.03, fe[ws - 1] + 18],
        [r, h - 0.03, fe[ws - 1] + 18],
        [r, h - 0.03, l],
        [a - 1.2, h - 0.03, l],
      ],
      At([0.44, 0.43, 0.41], Tt.conc),
    ));
  let f = e.at ? e.at[0] : (a + r - 5) / 2 + 1,
    u = e.at ? e.at[1] : l + 8,
    d = (C, P, I = 0) => [f + I, h + P, u + C],
    p = (C, P, I, L) =>
      [0, 1].map(
        (F) => (1 - L) * (1 - L) * C[F] + 2 * L * (1 - L) * P[F] + L * L * I[F],
      ),
    m = [0, -3],
    g = [26, -2],
    b = [30, 19],
    x = [],
    v = [];
  for (let C = 0; C <= 40; C++) {
    let P = C / 40,
      [I, L] = p(m, g, b, P);
    (x.push(d(I, L)),
      v.push(
        0.35 + 0.55 * Math.exp(-Math.pow((P - 0.5) / 0.16, 2)) + 0.12 * (1 - P),
      ));
  }
  let y = At([0.62, 0.42, 0.12], Tt.metal),
    M = At([0.85, 0.84, 0.8], Tt.paint),
    S = At([0.55, 0.06, 0.04], Tt.paint);
  (Wi(n, x, v, 10, y, { caps: !0 }), Wi(n, [d(...m), d(...b)], 0.09, 6, M));
  let w = p(m, g, b, 0.5),
    z = [(m[0] + b[0]) / 2, (m[1] + b[1]) / 2],
    _ = [w[0] - z[0], w[1] - z[1]],
    R = Math.hypot(..._),
    T = [_[0] / R, _[1] / R],
    E = [w[0] + T[0] * 6, w[1] + T[1] * 6],
    A = [z[0] - T[0] * 9, z[1] - T[1] * 9];
  Wi(n, [d(...E), d(...A)], 0.3, 8, M, { caps: !0 });
  for (let C = 0; C < 3; C++) {
    let P = (C / 3) * Math.PI * 2 + 0.3,
      I = Math.cos(P),
      L = Math.sin(P),
      F = [A[0] + T[0] * 0.5, A[1] + T[1] * 0.5],
      N = [A[0] + T[0] * 4.2, A[1] + T[1] * 4.2],
      B = [-T[1], T[0]],
      H = (O, D) => [
        f + L * D,
        h + O[1] + B[1] * I * D,
        u + O[0] + B[0] * I * D,
      ];
    (xs(
      n,
      H(F, 0.3),
      H(N, 0.3),
      H([N[0] - T[0] * 1, N[1] - T[1] * 1], 1.15),
      H(F, 1.25),
      S,
      null,
    ),
      xs(
        n,
        H(F, 1.25),
        H([N[0] - T[0] * 1, N[1] - T[1] * 1], 1.15),
        H(N, 0.3),
        H(F, 0.3),
        S,
        null,
      ));
  }
  for (let C of [0.35, 0.45, 0.55]) {
    let [P] = p(m, g, b, C);
    t.push({ t: "circ", x: f, z: u + P, r: 1.3 });
  }
  t.push({ t: "circ", x: f, z: u + w[0] + T[0] * 3, r: 0.6 });
}
as();
En();
as();
Oa();
En();
var Vg = xt;
function Oo(i, t, e, s, n, o) {
  let a = new Vg(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    r = a.length();
  if (r < 1e-4) return;
  a.divideScalar(r);
  let l = Math.abs(a.y) > 0.95 ? new Vg(1, 0, 0) : new Vg(0, 1, 0),
    c = new Vg().crossVectors(a, l).normalize(),
    h = new Vg().crossVectors(c, a).normalize(),
    f = (p, m, g) => [
      p[0] + (c.x * m * s) / 2 + (h.x * g * n) / 2,
      p[1] + (c.y * m * s) / 2 + (h.y * g * n) / 2,
      p[2] + (c.z * m * s) / 2 + (h.z * g * n) / 2,
    ],
    u = [f(t, -1, -1), f(t, 1, -1), f(t, 1, 1), f(t, -1, 1)],
    d = [f(e, -1, -1), f(e, 1, -1), f(e, 1, 1), f(e, -1, 1)];
  for (let p = 0; p < 4; p++) {
    let m = (p + 1) % 4;
    i.quad(u[p], u[m], d[m], d[p], [0, 0], [s, 0], [s, r], [0, r], o);
  }
}
function Ta(i, t, e, s, n, o, a, r, l, c) {
  let h = -n,
    f = s,
    u = (p, m, g) => [t + s * o * p + h * a * m, g, e + n * o * p + f * a * m],
    d = (p, m, g, b) => i.quad(p, m, g, b, [0, 0], [1, 0], [1, 1], [0, 1], c);
  (d(u(-1, -1, r), u(1, -1, r), u(1, -1, l), u(-1, -1, l)),
    d(u(1, 1, r), u(-1, 1, r), u(-1, 1, l), u(1, 1, l)),
    d(u(1, -1, r), u(1, 1, r), u(1, 1, l), u(1, -1, l)),
    d(u(-1, 1, r), u(-1, -1, r), u(-1, -1, l), u(-1, 1, l)),
    d(u(-1, -1, l), u(1, -1, l), u(1, 1, l), u(-1, 1, l)),
    d(u(-1, 1, r), u(1, 1, r), u(1, -1, r), u(-1, -1, r)));
}
function Rc(i, t) {
  t = Math.max(0, Math.min(i.len - 0.001, t));
  let e = 0,
    s = 0,
    n = i.s.length - 1;
  for (; n - s > 1;) {
    let c = (s + n) >> 1;
    i.s[c] <= t ? (s = c) : (n = c);
  }
  e = s;
  let o = i.pts[e],
    a = i.pts[e + 1],
    r = i.s[e + 1] - i.s[e],
    l = (t - i.s[e]) / r;
  return {
    x: o[0] + (a[0] - o[0]) * l,
    z: o[2] + (a[2] - o[2]) * l,
    y: o[1] + (a[1] - o[1]) * l,
    ux: (a[0] - o[0]) / r,
    uz: (a[2] - o[2]) / r,
  };
}
var wR = {},
  MR = null;
function SR(i) {
  MR = i;
}
function Fh(i, t) {
  if (MR) return MR(i, t);
  let e = Qi.find((n) => n.id === (i === "gg" ? "101" : "80")),
    s = i === "gg" ? Ye.at(0) : Je.at(0);
  if (wR[i] === void 0) {
    let n = 1e9;
    for (let o = 0; o < e.len; o += 1) {
      let a = Rc(e, o),
        r = Math.hypot(a.x - s[0], a.z - s[1]);
      r < n && ((n = r), (wR[i] = o));
    }
  }
  return Rc(e, wR[i] + t);
}
