// app 199 — math
// Lines 109990-110256 of readable/app.pretty.js (statement-aligned).
var gu = Be(be.stucco, 0.93, 0.93, 0.91),
  A$ = Be(be.stucco, 0.8, 0.8, 0.79),
  OP = It(Lt.stone, 0.55, 0.54, 0.52),
  fm = It(Lt.glass, 0.04, 0.05, 0.06),
  HP = It(Lt.matte, 0.24, 0.25, 0.26),
  Mk = It(Lt.gloss, 0.86, 0.87, 0.87),
  R$ = It(Lt.metal, 0.75, 0.75, 0.76);
function M1t(i, t) {
  let { D: e, L: s } = t,
    n = y1t(e, Hc.maritime);
  if (!n) return;
  let o = n.rings[0],
    a = [];
  for (let T = 0; T < o.length; T += 2) a.push([o[T], o[T + 1]]);
  let r = 0,
    l = a[0],
    c = a[0];
  for (let T of a)
    for (let E of a) {
      let A = Math.hypot(T[0] - E[0], T[1] - E[1]);
      A > r && ((r = A), (l = T), (c = E));
    }
  let h = [(l[0] + c[0]) / 2, (l[1] + c[1]) / 2],
    f = [(c[0] - l[0]) / r, (c[1] - l[1]) / r];
  f[0] < 0 && (f = [-f[0], -f[1]]);
  let u = [-f[1], f[0]];
  u[1] < 0 && (u = [-u[0], -u[1]]);
  let d = 0;
  for (let T of a)
    d = Math.max(d, Math.abs((T[0] - h[0]) * u[0] + (T[1] - h[1]) * u[1]));
  let p = r / 2,
    m = 1e9,
    g = -1e9;
  for (let T of a) {
    let E = s.terrainAt(T[0], T[1]);
    ((m = Math.min(m, E)), (g = Math.max(g, E)));
  }
  let b = Math.max(g, n.base) + 0.1,
    x = b + 5.4,
    v = x + 4.4,
    y = v + 3.6,
    M = y + 2.8,
    S = (T, E) => [h[0] + f[0] * T + u[0] * E, h[1] + f[1] * T + u[1] * E],
    w = op(h, f, u, p, d, 9);
  (ys(i, w, m - 0.5, b, A$),
    ys(i, w, b, x, gu, { vBase: b }),
    wk(
      i,
      w,
      b + 1.4,
      b + 3.6,
      fm,
      0.09,
      (T, E) => Math.abs(T) < p - 9.5 && E < 0,
      h,
      f,
      u,
    ));
  for (let T = -p + 11; T <= p - 11; T += 3.2)
    for (let E of [-1, 1]) {
      if (E > 0 && Math.abs(T) < 8) continue;
      let A = S(T, E * (d + 0.05));
      Ae(i, [A[0], b + 1.4, A[1]], [A[0], b + 3.6, A[1]], 0.07, gu, 4);
    }
  {
    let T = 0;
    for (let C = 0; C < w.length; C++) {
      let P = w[C],
        I = w[(C + 1) % w.length];
      T += P[0] * I[1] - I[0] * P[1];
    }
    let E = T > 0 ? w.slice().reverse() : w,
      A = 1.1;
    for (let C = 0; C < E.length; C++) {
      let P = E[C],
        I = E[(C + 1) % E.length],
        L = I[0] - P[0],
        F = I[1] - P[1],
        N = Math.hypot(L, F);
      if (N < 0.05) continue;
      let B = -F / N,
        H = L / N;
      for (let O = A; O < N; O += 2.3) {
        let D = P[0] + (L / N) * O,
          U = P[1] + (F / N) * O,
          G = (D - h[0]) * f[0] + (U - h[1]) * f[1];
        if (Math.abs(G) < p - 9.2) continue;
        let q = -H,
          W = B,
          V = 0.55,
          Y = (st, Q) => [
            D + q * Math.cos(st) * Q + B * 0.12,
            b + 2.6 + Math.sin(st) * Q,
            U + W * Math.cos(st) * Q + H * 0.12,
          ],
          $ = Y(0, 0);
        for (let st = 0; st < 12; st++) {
          let Q = (st / 12) * Math.PI * 2,
            j = ((st + 1) / 12) * Math.PI * 2;
          (i.quad(
            Y(Q, V),
            Y(j, V),
            Y(j, V + 0.14),
            Y(Q, V + 0.14),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            Mk,
            [B, 0, H],
          ),
            i.quad(
              [D + B * 0.12, $[1], U + H * 0.12],
              Y(Q, V),
              Y(j, V),
              [D + B * 0.12, $[1], U + H * 0.12],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              fm,
              [B, 0, H],
            ));
        }
      }
      A = (((A - N) % 2.3) + 2.3) % 2.3;
    }
  }
  {
    let T = d + 0.09,
      E = (L, F, N = 0) => {
        let B = S(L, T + N);
        return [B[0], F, B[1]];
      };
    i.quad(
      E(-7, b),
      E(7, b),
      E(7, b + 4.2),
      E(-7, b + 4.2),
      [0, 0],
      [14, 0],
      [14, 4.2],
      [0, 4.2],
      HP,
      [u[0], 0, u[1]],
    );
    for (let L of [-5, -2.5, 0, 2.5, 5])
      i.quad(
        E(L - 0.9, b, 0.08),
        E(L + 0.9, b, 0.08),
        E(L + 0.9, b + 3, 0.08),
        E(L - 0.9, b + 3, 0.08),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        fm,
        [u[0], 0, u[1]],
      );
    for (let L of [-1, 1])
      for (let F of [0, 1, 2]) {
        let N = L * (9.5 + F * 1.6),
          B = E(N - 0.35, b + 0.6, 0),
          H = E(N + 0.35, b + 0.6, 0),
          O = E(N + 0.35, x - 0.6, 0),
          D = E(N - 0.35, x - 0.6, 0);
        i.quad(B, H, O, D, [0, 0], [1, 0], [1, 1], [0, 1], fm, [u[0], 0, u[1]]);
      }
    let A = S(-8, d),
      C = S(8, d),
      P = S(8, d + 2.4),
      I = S(-8, d + 2.4);
    (xa(i, [A, C, P, I], b + 4.75, HP),
      ys(i, [A, C, P, I], b + 4.35, b + 4.75, HP));
  }
  {
    let T = op(h, f, u, p + 0.25, d + 0.25, 9.25);
    (ys(i, T, x - 0.3, x + 0.05, gu),
      xa(i, T, x + 0.05, OP),
      BP(i, T, x + 0.05, Mk, 0.95));
  }
  let z = op(h, f, u, p - 2.4, d - 2.2, 7.5);
  (ys(i, z, x, v, gu, { vBase: x }),
    wk(
      i,
      z,
      x + 1,
      x + 3.2,
      fm,
      0.03,
      (T, E) =>
        Math.abs(T) > p - 13 || (Math.abs(T) < p - 15 && Math.abs(T) > 4),
      h,
      f,
      u,
    ));
  {
    let T = op(h, f, u, p - 2.15, d - 1.95, 7.75);
    (ys(i, T, v - 0.25, v + 0.05, gu),
      xa(i, T, v + 0.05, OP),
      BP(i, T, v + 0.05, Mk, 0.95));
  }
  let _ = op(h, f, u, p * 0.52, d - 5.2, 5.5);
  (ys(i, _, v, y, gu, { vBase: v }),
    wk(i, _, v + 0.9, v + 2.7, fm, 0.03, null, h, f, u));
  {
    let T = op(h, f, u, p * 0.52 + 0.2, d - 5, 5.7);
    (ys(i, T, y - 0.2, y + 0.05, gu),
      xa(i, T, y + 0.05, OP),
      BP(i, T, y + 0.05, Mk, 0.95));
  }
  let R = op(S(-2, -1), f, u, 7.5, 3.6, 3.5);
  (ys(i, R, y, M, gu, { vBase: y }),
    wk(i, R, y + 0.9, y + 2.1, fm, 0.03, null, h, f, u));
  {
    let T = op(S(-2, -1), f, u, 7.7, 3.8, 3.7);
    (ys(i, T, M - 0.2, M + 0.05, gu), xa(i, T, M + 0.05, A$));
  }
  for (let T of [-1, 1]) {
    let E = S(T * (p * 0.52 - 2), 0);
    Ae(i, [E[0], y, E[1]], [E[0], y + 9, E[1]], 0.08, R$, 6);
  }
  {
    let T = S(-2, -1);
    Ae(i, [T[0], M, T[1]], [T[0], M + 4, T[1]], 0.06, R$, 6);
  }
  w1t(t, a, m - 3, M + 2);
}
var S1t = Be(be.granite, 0.78, 0.76, 0.72),
  k1t = Be(be.granite, 0.6, 0.58, 0.55),
  _1t = Be(be.lawn, 0.8, 0.9, 0.75),
  P$ = It(Lt.matte, 0.2, 0.17, 0.14),
  z1t = It(Lt.leaf, 0.13, 0.2, 0.07),
  E1t = It(Lt.gloss, 0.86, 0.86, 0.84),
  C$ = It(Lt.gloss, 0.03, 0.035, 0.035),
  T1t = (i, t, e) => {
    let s = !1;
    for (let n = 0, o = i.length - 1; n < i.length; o = n++) {
      let [a, r] = i[n],
        [l, c] = i[o];
      r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
    }
    return s;
  };
function L$(i, t, e, s, n, o, a, r, l, c, h, f, u = 0.06) {
  let d = (p, m) => [e[0] + s[0] * p + n[0] * m, e[1] + s[1] * p + n[1] * m];
  for (let p = o; p < a - 1e-6; p += c)
    for (let m = r; m < l - 1e-6; m += c) {
      let [g, b] = d(p + c / 2, m + c / 2);
      if (!h(p + c / 2, m + c / 2, g, b)) continue;
      let x = [d(p, m), d(p + c, m), d(p + c, m + c), d(p, m + c)].map(
        ([v, y]) => [v, t.terrainAt(v, y) + u, y],
      );
      i.quad(
        x[0],
        x[3],
        x[2],
        x[1],
        [x[0][0], x[0][2]],
        [x[3][0], x[3][2]],
        [x[2][0], x[2][2]],
        [x[1][0], x[1][2]],
        f,
        [0, 1, 0],
      );
    }
}
