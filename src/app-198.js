// app 198 — math
// Lines 110246-110512 of readable/app.pretty.js (statement-aligned).
var Ju = We(we.stucco, 0.93, 0.93, 0.91),
  CK = We(we.stucco, 0.8, 0.8, 0.79),
  pL = Lt(Ct.stone, 0.55, 0.54, 0.52),
  t2 = Lt(Ct.glass, 0.04, 0.05, 0.06),
  mL = Lt(Ct.matte, 0.24, 0.25, 0.26),
  Mz = Lt(Ct.gloss, 0.86, 0.87, 0.87),
  LK = Lt(Ct.metal, 0.75, 0.75, 0.76);
function jgt(o, t) {
  let { D: e, L: s } = t,
    n = Wgt(e, mh.maritime);
  if (!n) return;
  let i = n.rings[0],
    a = [];
  for (let T = 0; T < i.length; T += 2) a.push([i[T], i[T + 1]]);
  let r = 0,
    l = a[0],
    c = a[0];
  for (let T of a)
    for (let E of a) {
      let R = Math.hypot(T[0] - E[0], T[1] - E[1]);
      R > r && ((r = R), (l = T), (c = E));
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
    v = b + 5.4,
    x = v + 4.4,
    y = x + 3.6,
    M = y + 2.8,
    S = (T, E) => [h[0] + f[0] * T + u[0] * E, h[1] + f[1] * T + u[1] * E],
    w = Bp(h, f, u, p, d, 9);
  (Ss(o, w, m - 0.5, b, CK),
    Ss(o, w, b, v, Ju, { vBase: b }),
    wz(
      o,
      w,
      b + 1.4,
      b + 3.6,
      t2,
      0.09,
      (T, E) => Math.abs(T) < p - 9.5 && E < 0,
      h,
      f,
      u,
    ));
  for (let T = -p + 11; T <= p - 11; T += 3.2)
    for (let E of [-1, 1]) {
      if (E > 0 && Math.abs(T) < 8) continue;
      let R = S(T, E * (d + 0.05));
      Ce(o, [R[0], b + 1.4, R[1]], [R[0], b + 3.6, R[1]], 0.07, Ju, 4);
    }
  {
    let T = 0;
    for (let P = 0; P < w.length; P++) {
      let C = w[P],
        I = w[(P + 1) % w.length];
      T += C[0] * I[1] - I[0] * C[1];
    }
    let E = T > 0 ? w.slice().reverse() : w,
      R = 1.1;
    for (let P = 0; P < E.length; P++) {
      let C = E[P],
        I = E[(P + 1) % E.length],
        L = I[0] - C[0],
        F = I[1] - C[1],
        O = Math.hypot(L, F);
      if (O < 0.05) continue;
      let B = -F / O,
        H = L / O;
      for (let N = R; N < O; N += 2.3) {
        let D = C[0] + (L / O) * N,
          U = C[1] + (F / O) * N,
          G = (D - h[0]) * f[0] + (U - h[1]) * f[1];
        if (Math.abs(G) < p - 9.2) continue;
        let W = -H,
          V = B,
          $ = 0.55,
          J = (tt, Z) => [
            D + W * Math.cos(tt) * Z + B * 0.12,
            b + 2.6 + Math.sin(tt) * Z,
            U + V * Math.cos(tt) * Z + H * 0.12,
          ],
          X = J(0, 0);
        for (let tt = 0; tt < 12; tt++) {
          let Z = (tt / 12) * Math.PI * 2,
            q = ((tt + 1) / 12) * Math.PI * 2;
          (o.quad(
            J(Z, $),
            J(q, $),
            J(q, $ + 0.14),
            J(Z, $ + 0.14),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            Mz,
            [B, 0, H],
          ),
            o.quad(
              [D + B * 0.12, X[1], U + H * 0.12],
              J(Z, $),
              J(q, $),
              [D + B * 0.12, X[1], U + H * 0.12],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              t2,
              [B, 0, H],
            ));
        }
      }
      R = (((R - O) % 2.3) + 2.3) % 2.3;
    }
  }
  {
    let T = d + 0.09,
      E = (L, F, O = 0) => {
        let B = S(L, T + O);
        return [B[0], F, B[1]];
      };
    o.quad(
      E(-7, b),
      E(7, b),
      E(7, b + 4.2),
      E(-7, b + 4.2),
      [0, 0],
      [14, 0],
      [14, 4.2],
      [0, 4.2],
      mL,
      [u[0], 0, u[1]],
    );
    for (let L of [-5, -2.5, 0, 2.5, 5])
      o.quad(
        E(L - 0.9, b, 0.08),
        E(L + 0.9, b, 0.08),
        E(L + 0.9, b + 3, 0.08),
        E(L - 0.9, b + 3, 0.08),
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        t2,
        [u[0], 0, u[1]],
      );
    for (let L of [-1, 1])
      for (let F of [0, 1, 2]) {
        let O = L * (9.5 + F * 1.6),
          B = E(O - 0.35, b + 0.6, 0),
          H = E(O + 0.35, b + 0.6, 0),
          N = E(O + 0.35, v - 0.6, 0),
          D = E(O - 0.35, v - 0.6, 0);
        o.quad(B, H, N, D, [0, 0], [1, 0], [1, 1], [0, 1], t2, [u[0], 0, u[1]]);
      }
    let R = S(-8, d),
      P = S(8, d),
      C = S(8, d + 2.4),
      I = S(-8, d + 2.4);
    (Ta(o, [R, P, C, I], b + 4.75, mL),
      Ss(o, [R, P, C, I], b + 4.35, b + 4.75, mL));
  }
  {
    let T = Bp(h, f, u, p + 0.25, d + 0.25, 9.25);
    (Ss(o, T, v - 0.3, v + 0.05, Ju),
      Ta(o, T, v + 0.05, pL),
      dL(o, T, v + 0.05, Mz, 0.95));
  }
  let _ = Bp(h, f, u, p - 2.4, d - 2.2, 7.5);
  (Ss(o, _, v, x, Ju, { vBase: v }),
    wz(
      o,
      _,
      v + 1,
      v + 3.2,
      t2,
      0.03,
      (T, E) =>
        Math.abs(T) > p - 13 || (Math.abs(T) < p - 15 && Math.abs(T) > 4),
      h,
      f,
      u,
    ));
  {
    let T = Bp(h, f, u, p - 2.15, d - 1.95, 7.75);
    (Ss(o, T, x - 0.25, x + 0.05, Ju),
      Ta(o, T, x + 0.05, pL),
      dL(o, T, x + 0.05, Mz, 0.95));
  }
  let z = Bp(h, f, u, p * 0.52, d - 5.2, 5.5);
  (Ss(o, z, x, y, Ju, { vBase: x }),
    wz(o, z, x + 0.9, x + 2.7, t2, 0.03, null, h, f, u));
  {
    let T = Bp(h, f, u, p * 0.52 + 0.2, d - 5, 5.7);
    (Ss(o, T, y - 0.2, y + 0.05, Ju),
      Ta(o, T, y + 0.05, pL),
      dL(o, T, y + 0.05, Mz, 0.95));
  }
  let A = Bp(S(-2, -1), f, u, 7.5, 3.6, 3.5);
  (Ss(o, A, y, M, Ju, { vBase: y }),
    wz(o, A, y + 0.9, y + 2.1, t2, 0.03, null, h, f, u));
  {
    let T = Bp(S(-2, -1), f, u, 7.7, 3.8, 3.7);
    (Ss(o, T, M - 0.2, M + 0.05, Ju), Ta(o, T, M + 0.05, CK));
  }
  for (let T of [-1, 1]) {
    let E = S(T * (p * 0.52 - 2), 0);
    Ce(o, [E[0], y, E[1]], [E[0], y + 9, E[1]], 0.08, LK, 6);
  }
  {
    let T = S(-2, -1);
    Ce(o, [T[0], M, T[1]], [T[0], M + 4, T[1]], 0.06, LK, 6);
  }
  qgt(t, a, m - 3, M + 2);
}
var $gt = We(we.granite, 0.78, 0.76, 0.72),
  Xgt = We(we.granite, 0.6, 0.58, 0.55),
  Kgt = We(we.lawn, 0.8, 0.9, 0.75),
  IK = Lt(Ct.matte, 0.2, 0.17, 0.14),
  Ygt = Lt(Ct.leaf, 0.13, 0.2, 0.07),
  Jgt = Lt(Ct.gloss, 0.86, 0.86, 0.84),
  FK = Lt(Ct.gloss, 0.03, 0.035, 0.035),
  Zgt = (o, t, e) => {
    let s = !1;
    for (let n = 0, i = o.length - 1; n < o.length; i = n++) {
      let [a, r] = o[n],
        [l, c] = o[i];
      r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
    }
    return s;
  };
function OK(o, t, e, s, n, i, a, r, l, c, h, f, u = 0.06) {
  let d = (p, m) => [e[0] + s[0] * p + n[0] * m, e[1] + s[1] * p + n[1] * m];
  for (let p = i; p < a - 1e-6; p += c)
    for (let m = r; m < l - 1e-6; m += c) {
      let [g, b] = d(p + c / 2, m + c / 2);
      if (!h(p + c / 2, m + c / 2, g, b)) continue;
      let v = [d(p, m), d(p + c, m), d(p + c, m + c), d(p, m + c)].map(
        ([x, y]) => [x, t.terrainAt(x, y) + u, y],
      );
      o.quad(
        v[0],
        v[3],
        v[2],
        v[1],
        [v[0][0], v[0][2]],
        [v[3][0], v[3][2]],
        [v[2][0], v[2][2]],
        [v[1][0], v[1][2]],
        f,
        [0, 1, 0],
      );
    }
}
