// app 218 — math
// Lines 115754-116083 of readable/app.pretty.js (statement-aligned).
function Qa(i, t, e, s, n, o, a, r, l) {
  yo(
    i,
    t,
    e,
    [
      [o, s],
      [a, n],
    ],
    r,
    l,
  );
}
function Yb(i, t, e, s, n) {
  let o = t.length;
  if (o < 2) return;
  let a = i.v,
    r = 0;
  for (let l = 0; l < o; l++) {
    let c = t[Math.max(0, l - 1)],
      h = t[Math.min(o - 1, l + 1)],
      f = new Kh(h[0] - c[0], h[1] - c[1], h[2] - c[2]).normalize(),
      u = new Kh().crossVectors(f, new Kh(0, 1, 0)).normalize(),
      d = new Kh().crossVectors(u, f).normalize();
    l &&
      (r += Math.hypot(
        t[l][0] - t[l - 1][0],
        t[l][1] - t[l - 1][1],
        t[l][2] - t[l - 1][2],
      ));
    let p = typeof e == "function" ? e(l) : e;
    for (let m = 0; m <= s; m++) {
      let g = (m / s) * Math.PI * 2,
        b = Math.cos(g),
        x = Math.sin(g),
        v = u.x * b + d.x * x,
        y = u.y * b + d.y * x,
        M = u.z * b + d.z * x;
      i.vert(
        t[l][0] + v * p,
        t[l][1] + y * p,
        t[l][2] + M * p,
        v,
        y,
        M,
        g * p,
        r,
        n,
      );
    }
  }
  for (let l = 0; l + 1 < o; l++)
    for (let c = 0; c < s; c++) {
      let h = a + l * (s + 1) + c,
        f = h + s + 1;
      (i.tri(h, f, h + 1), i.tri(h + 1, f, f + 1));
    }
}
function LX(i, t, e, s, n, o) {
  let a = [(e[0] * n) / 2, (e[1] * n) / 2, (e[2] * n) / 2],
    r = (u, d) => [
      [t[0] - a[0] * u, t[1] - a[1] * u, t[2] - a[2] * u],
      [t[0] + a[0] * u, t[1] + a[1] * u, t[2] + a[2] * u],
    ],
    [l, c] = r(1),
    [h, f] = r(1.04);
  Yb(i, [h, l, c, f], (u) => (u === 0 || u === 3 ? s - 0.06 : s), 10, o);
}
function Ga(i, t, e, s, n, o, a, r = null) {
  let l = (Math.cos(e) * s) / 2,
    c = (Math.sin(e) * s) / 2,
    h = [t[0] - l, t[1], t[2] - c],
    f = [t[0] + l, t[1], t[2] + c],
    u = [f[0], t[1] + n, f[2]],
    d = [h[0], t[1] + n, h[2]],
    p = r || [-Math.sin(e), 0.35, Math.cos(e)],
    m = Math.hypot(...p),
    g = p.map((M) => M / m),
    b = i.vert(...h, ...g, o[0], o[3], a),
    x = i.vert(...f, ...g, o[2], o[3], a),
    v = i.vert(...u, ...g, o[2], o[1], a),
    y = i.vert(...d, ...g, o[0], o[1], a);
  (i.tri(b, x, v), i.tri(b, v, y));
}
var Wa = (i) => [
  (i % 4) * 0.25 + 0.002,
  Math.floor(i / 4) * 0.5 + 0.004,
  (i % 4) * 0.25 + 0.248,
  Math.floor(i / 4) * 0.5 + 0.496,
];
function Aa(i, t, e, s, n, o, a, r, l, c = null) {
  let h = Math.max(1, Math.ceil((s - t) / o)),
    f = Math.max(1, Math.ceil((n - e) / o)),
    u = (s - t) / h,
    d = (n - e) / f,
    p = new Float32Array((h + 1) * (f + 1));
  for (let _ = 0; _ <= f; _++)
    for (let R = 0; R <= h; R++) p[_ * (h + 1) + R] = a(t + R * u, e + _ * d);
  let m = 0.3,
    g = (_, R) => {
      let T = r(_, R),
        E = typeof l == "function" ? l(_, R) : l;
      if (c) {
        let I = c(_, R);
        return i.vert(_, T, R, I[0], I[1], I[2], _, R, E);
      }
      let A = (r(_ + m, R) - r(_ - m, R)) / (2 * m),
        C = (r(_, R + m) - r(_, R - m)) / (2 * m),
        P = Math.hypot(A, 1, C);
      return i.vert(_, T, R, -A / P, 1 / P, -C / P, _, R, E);
    },
    b = new Map(),
    x = new Float64Array((h + 1) * (f + 1)).fill(NaN),
    v = (_, R) => {
      let T = R * (h + 1) + _,
        E = x[T];
      return (E !== E && (E = x[T] = r(t + _ * u, e + R * d)), E);
    },
    y = (_, R) => {
      let T = t + _ * u,
        E = e + R * d,
        A = typeof l == "function" ? l(T, E) : l;
      if (c) {
        let H = c(T, E);
        return i.vert(T, v(_, R), E, H[0], H[1], H[2], T, E, A);
      }
      let C = Math.max(0, _ - 1),
        P = Math.min(h, _ + 1),
        I = Math.max(0, R - 1),
        L = Math.min(f, R + 1),
        F = (v(P, R) - v(C, R)) / ((P - C) * u),
        N = (v(_, L) - v(_, I)) / ((L - I) * d);
      if (!Number.isFinite(F) || !Number.isFinite(N)) return g(T, E);
      let B = Math.hypot(F, 1, N);
      return i.vert(T, v(_, R), E, -F / B, 1 / B, -N / B, T, E, A);
    },
    M = (_, R) => {
      let T = R * (h + 1) + _,
        E = b.get(T);
      return (E === void 0 && b.set(T, (E = y(_, R))), E);
    },
    S = new Map(),
    w = (_, R, T, E) => {
      let A =
          _ < T || (_ === T && R < E)
            ? `${_},${R},${T},${E}`
            : `${T},${E},${_},${R}`,
        C = S.get(A);
      if (C !== void 0) return C;
      let P = p[R * (h + 1) + _],
        I = p[E * (h + 1) + T],
        L = P / (P - I),
        F = t + _ * u,
        N = e + R * d,
        B = t + T * u,
        H = e + E * d,
        O = 0,
        D = 1,
        U = P,
        G = I,
        q = L;
      for (let W = 0; W < 2; W++) {
        let V = a(F + (B - F) * q, N + (H - N) * q);
        (V > 0 == U > 0 ? ((O = q), (U = V)) : ((D = q), (G = V)),
          (q = O + ((D - O) * U) / (U - G)));
      }
      return ((C = g(F + (B - F) * q, N + (H - N) * q)), S.set(A, C), C);
    },
    z = (_, R, T) => {
      let E = p[_[1] * (h + 1) + _[0]],
        A = p[R[1] * (h + 1) + R[0]],
        C = p[T[1] * (h + 1) + T[0]],
        P = [E > 0, A > 0, C > 0],
        I = P.filter(Boolean).length;
      if (I === 0) return;
      if (I === 3) {
        i.tri(M(..._), M(...R), M(...T));
        return;
      }
      let L = [_, R, T],
        F = 0;
      for (let U = 0; U < 3; U++) (I === 1) === P[U] && (F = U);
      let N = L[F],
        B = L[(F + 1) % 3],
        H = L[(F + 2) % 3],
        O = w(...N, ...B),
        D = w(...N, ...H);
      I === 1
        ? i.tri(M(...N), O, D)
        : (i.tri(O, M(...B), M(...H)), i.tri(O, M(...H), D));
    };
  for (let _ = 0; _ < f; _++)
    for (let R = 0; R < h; R++) {
      let T = [R, _],
        E = [R + 1, _],
        A = [R + 1, _ + 1],
        C = [R, _ + 1];
      (z(T, C, A), z(T, A, E));
    }
}
function Lk(i) {
  let t = [],
    e = 0;
  for (let s = 0; s < i.length; s++) {
    let n = i[Math.max(0, s - 1)],
      o = i[Math.min(i.length - 1, s + 1)],
      a = o[0] - n[0],
      r = o[1] - n[1],
      l = Math.hypot(a, r) || 1;
    (s && (e += Math.hypot(i[s][0] - i[s - 1][0], i[s][1] - i[s - 1][1])),
      t.push({
        x: i[s][0],
        z: i[s][1],
        tx: a / l,
        tz: r / l,
        nx: r / l,
        nz: -a / l,
        s: e,
      }));
  }
  return t;
}
Oa();
En();
var qc = 4.6,
  rp = 0.32,
  hl = 0.2,
  Yy = 0.6,
  uC = 0.52,
  gr = 8.9;
function a2t() {
  let i = Oi.z,
    t = Oi.x0,
    e = Oi.x1,
    s = 8,
    n = 9.5,
    o = 5,
    a = (e - 3 - (t + 3)) / (s + 1),
    r = [
      [t - 6, i],
      [t + 3, i],
    ];
  for (let f = 1; f <= s; f++) r.push([t + 3 + f * a, i + (f % 2 ? -n : n)]);
  r.push([e - 3, i], [e + 6, i]);
  let l = [r[0]],
    c = (f, u) => {
      let d = Math.hypot(u[0] - f[0], u[1] - f[1]),
        p = Math.max(1, Math.ceil(d / 0.3));
      for (let m = 1; m <= p; m++)
        l.push([
          f[0] + ((u[0] - f[0]) * m) / p,
          f[1] + ((u[1] - f[1]) * m) / p,
        ]);
    },
    h = r[0];
  for (let f = 1; f < r.length - 1; f++) {
    let u = r[f - 1],
      d = r[f],
      p = r[f + 1],
      m = [d[0] - u[0], d[1] - u[1]],
      g = [p[0] - d[0], p[1] - d[1]],
      b = Math.hypot(...m),
      x = Math.hypot(...g);
    ((m[0] /= b), (m[1] /= b), (g[0] /= x), (g[1] /= x));
    let v = Math.acos(Math.max(-1, Math.min(1, m[0] * g[0] + m[1] * g[1]))),
      y = o,
      M = y * Math.tan(v / 2),
      S = Math.min(b, x) * 0.5 - 0.05;
    M > S && ((M = S), (y = M / Math.tan(v / 2)));
    let w = [d[0] - m[0] * M, d[1] - m[1] * M],
      z = [d[0] + g[0] * M, d[1] + g[1] * M];
    c(h, w);
    let _ = Math.sign(m[0] * g[1] - m[1] * g[0]),
      R = [w[0] - m[1] * _ * y, w[1] + m[0] * _ * y],
      T = Math.atan2(w[1] - R[1], w[0] - R[0]),
      A = Math.atan2(z[1] - R[1], z[0] - R[0]) - T;
    for (; A > Math.PI;) A -= 2 * Math.PI;
    for (; A < -Math.PI;) A += 2 * Math.PI;
    let C = Math.max(2, Math.ceil((Math.abs(A) * y) / 0.3));
    for (let P = 1; P <= C; P++) {
      let I = T + (A * P) / C;
      l.push([R[0] + Math.cos(I) * y, R[1] + Math.sin(I) * y]);
    }
    h = z;
  }
  return (c(h, r[r.length - 1]), l);
}
function r2t(i, t = 6) {
  let s = new Map(),
    n = (a, r) => a * 7919 + r;
  for (let a = 0; a + 1 < i.length; a++) {
    let r = Math.floor(Math.min(i[a][0], i[a + 1][0]) / 2),
      l = Math.floor(Math.min(i[a][1], i[a + 1][1]) / 2),
      c = Math.floor(Math.max(i[a][0], i[a + 1][0]) / 2),
      h = Math.floor(Math.max(i[a][1], i[a + 1][1]) / 2);
    for (let f = r; f <= c; f++)
      for (let u = l; u <= h; u++) {
        let d = n(f, u),
          p = s.get(d);
        (p || s.set(d, (p = [])), p.push(a));
      }
  }
  let o = Math.ceil(t / 2);
  return (a, r) => {
    let l = Math.floor(a / 2),
      c = Math.floor(r / 2),
      h = t * t;
    for (let f = l - o; f <= l + o; f++)
      for (let u = c - o; u <= c + o; u++) {
        let d = s.get(n(f, u));
        if (d)
          for (let p of d) {
            let m = i[p],
              g = i[p + 1],
              b = g[0] - m[0],
              x = g[1] - m[1],
              v = b * b + x * x,
              y = Math.max(
                0,
                Math.min(1, ((a - m[0]) * b + (r - m[1]) * x) / (v || 1)),
              ),
              M = a - m[0] - b * y,
              S = r - m[1] - x * y,
              w = M * M + S * S;
            w < h && (h = w);
          }
      }
    return Math.sqrt(h);
  };
}
