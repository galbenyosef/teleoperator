// app 217 — math
// Lines 116010-116339 of readable/app.pretty.js (statement-aligned).
function mr(o, t, e, s, n, i, a, r, l) {
  To(
    o,
    t,
    e,
    [
      [i, s],
      [a, n],
    ],
    r,
    l,
  );
}
function Ox(o, t, e, s, n) {
  let i = t.length;
  if (i < 2) return;
  let a = o.v,
    r = 0;
  for (let l = 0; l < i; l++) {
    let c = t[Math.max(0, l - 1)],
      h = t[Math.min(i - 1, l + 1)],
      f = new Tf(h[0] - c[0], h[1] - c[1], h[2] - c[2]).normalize(),
      u = new Tf().crossVectors(f, new Tf(0, 1, 0)).normalize(),
      d = new Tf().crossVectors(u, f).normalize();
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
        v = Math.sin(g),
        x = u.x * b + d.x * v,
        y = u.y * b + d.y * v,
        M = u.z * b + d.z * v;
      o.vert(
        t[l][0] + x * p,
        t[l][1] + y * p,
        t[l][2] + M * p,
        x,
        y,
        M,
        g * p,
        r,
        n,
      );
    }
  }
  for (let l = 0; l + 1 < i; l++)
    for (let c = 0; c < s; c++) {
      let h = a + l * (s + 1) + c,
        f = h + s + 1;
      (o.tri(h, f, h + 1), o.tri(h + 1, f, f + 1));
    }
}
function OY(o, t, e, s, n, i) {
  let a = [(e[0] * n) / 2, (e[1] * n) / 2, (e[2] * n) / 2],
    r = (u, d) => [
      [t[0] - a[0] * u, t[1] - a[1] * u, t[2] - a[2] * u],
      [t[0] + a[0] * u, t[1] + a[1] * u, t[2] + a[2] * u],
    ],
    [l, c] = r(1),
    [h, f] = r(1.04);
  Ox(o, [h, l, c, f], (u) => (u === 0 || u === 3 ? s - 0.06 : s), 10, i);
}
function nr(o, t, e, s, n, i, a, r = null) {
  let l = (Math.cos(e) * s) / 2,
    c = (Math.sin(e) * s) / 2,
    h = [t[0] - l, t[1], t[2] - c],
    f = [t[0] + l, t[1], t[2] + c],
    u = [f[0], t[1] + n, f[2]],
    d = [h[0], t[1] + n, h[2]],
    p = r || [-Math.sin(e), 0.35, Math.cos(e)],
    m = Math.hypot(...p),
    g = p.map((M) => M / m),
    b = o.vert(...h, ...g, i[0], i[3], a),
    v = o.vert(...f, ...g, i[2], i[3], a),
    x = o.vert(...u, ...g, i[2], i[1], a),
    y = o.vert(...d, ...g, i[0], i[1], a);
  (o.tri(b, v, x), o.tri(b, x, y));
}
var ir = (o) => [
  (o % 4) * 0.25 + 0.002,
  Math.floor(o / 4) * 0.5 + 0.004,
  (o % 4) * 0.25 + 0.248,
  Math.floor(o / 4) * 0.5 + 0.496,
];
function Da(o, t, e, s, n, i, a, r, l, c = null) {
  let h = Math.max(1, Math.ceil((s - t) / i)),
    f = Math.max(1, Math.ceil((n - e) / i)),
    u = (s - t) / h,
    d = (n - e) / f,
    p = new Float32Array((h + 1) * (f + 1));
  for (let z = 0; z <= f; z++)
    for (let A = 0; A <= h; A++) p[z * (h + 1) + A] = a(t + A * u, e + z * d);
  let m = 0.3,
    g = (z, A) => {
      let T = r(z, A),
        E = typeof l == "function" ? l(z, A) : l;
      if (c) {
        let I = c(z, A);
        return o.vert(z, T, A, I[0], I[1], I[2], z, A, E);
      }
      let R = (r(z + m, A) - r(z - m, A)) / (2 * m),
        P = (r(z, A + m) - r(z, A - m)) / (2 * m),
        C = Math.hypot(R, 1, P);
      return o.vert(z, T, A, -R / C, 1 / C, -P / C, z, A, E);
    },
    b = new Map(),
    v = new Float64Array((h + 1) * (f + 1)).fill(NaN),
    x = (z, A) => {
      let T = A * (h + 1) + z,
        E = v[T];
      return (E !== E && (E = v[T] = r(t + z * u, e + A * d)), E);
    },
    y = (z, A) => {
      let T = t + z * u,
        E = e + A * d,
        R = typeof l == "function" ? l(T, E) : l;
      if (c) {
        let H = c(T, E);
        return o.vert(T, x(z, A), E, H[0], H[1], H[2], T, E, R);
      }
      let P = Math.max(0, z - 1),
        C = Math.min(h, z + 1),
        I = Math.max(0, A - 1),
        L = Math.min(f, A + 1),
        F = (x(C, A) - x(P, A)) / ((C - P) * u),
        O = (x(z, L) - x(z, I)) / ((L - I) * d);
      if (!Number.isFinite(F) || !Number.isFinite(O)) return g(T, E);
      let B = Math.hypot(F, 1, O);
      return o.vert(T, x(z, A), E, -F / B, 1 / B, -O / B, T, E, R);
    },
    M = (z, A) => {
      let T = A * (h + 1) + z,
        E = b.get(T);
      return (E === void 0 && b.set(T, (E = y(z, A))), E);
    },
    S = new Map(),
    w = (z, A, T, E) => {
      let R =
          z < T || (z === T && A < E)
            ? `${z},${A},${T},${E}`
            : `${T},${E},${z},${A}`,
        P = S.get(R);
      if (P !== void 0) return P;
      let C = p[A * (h + 1) + z],
        I = p[E * (h + 1) + T],
        L = C / (C - I),
        F = t + z * u,
        O = e + A * d,
        B = t + T * u,
        H = e + E * d,
        N = 0,
        D = 1,
        U = C,
        G = I,
        W = L;
      for (let V = 0; V < 2; V++) {
        let $ = a(F + (B - F) * W, O + (H - O) * W);
        ($ > 0 == U > 0 ? ((N = W), (U = $)) : ((D = W), (G = $)),
          (W = N + ((D - N) * U) / (U - G)));
      }
      return ((P = g(F + (B - F) * W, O + (H - O) * W)), S.set(R, P), P);
    },
    _ = (z, A, T) => {
      let E = p[z[1] * (h + 1) + z[0]],
        R = p[A[1] * (h + 1) + A[0]],
        P = p[T[1] * (h + 1) + T[0]],
        C = [E > 0, R > 0, P > 0],
        I = C.filter(Boolean).length;
      if (I === 0) return;
      if (I === 3) {
        o.tri(M(...z), M(...A), M(...T));
        return;
      }
      let L = [z, A, T],
        F = 0;
      for (let U = 0; U < 3; U++) (I === 1) === C[U] && (F = U);
      let O = L[F],
        B = L[(F + 1) % 3],
        H = L[(F + 2) % 3],
        N = w(...O, ...B),
        D = w(...O, ...H);
      I === 1
        ? o.tri(M(...O), N, D)
        : (o.tri(N, M(...B), M(...H)), o.tri(N, M(...H), D));
    };
  for (let z = 0; z < f; z++)
    for (let A = 0; A < h; A++) {
      let T = [A, z],
        E = [A + 1, z],
        R = [A + 1, z + 1],
        P = [A, z + 1];
      (_(T, P, R), _(T, R, E));
    }
}
function Lz(o) {
  let t = [],
    e = 0;
  for (let s = 0; s < o.length; s++) {
    let n = o[Math.max(0, s - 1)],
      i = o[Math.min(o.length - 1, s + 1)],
      a = i[0] - n[0],
      r = i[1] - n[1],
      l = Math.hypot(a, r) || 1;
    (s && (e += Math.hypot(o[s][0] - o[s - 1][0], o[s][1] - o[s - 1][1])),
      t.push({
        x: o[s][0],
        z: o[s][1],
        tx: a / l,
        tz: r / l,
        nx: r / l,
        nz: -a / l,
        s: e,
      }));
  }
  return t;
}
Ya();
Pn();
var yh = 4.6,
  Hp = 0.32,
  Cl = 0.2,
  qw = 0.6,
  GL = 0.52,
  Pr = 8.9;
function Axt() {
  let o = Yi.z,
    t = Yi.x0,
    e = Yi.x1,
    s = 8,
    n = 9.5,
    i = 5,
    a = (e - 3 - (t + 3)) / (s + 1),
    r = [
      [t - 6, o],
      [t + 3, o],
    ];
  for (let f = 1; f <= s; f++) r.push([t + 3 + f * a, o + (f % 2 ? -n : n)]);
  r.push([e - 3, o], [e + 6, o]);
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
      v = Math.hypot(...g);
    ((m[0] /= b), (m[1] /= b), (g[0] /= v), (g[1] /= v));
    let x = Math.acos(Math.max(-1, Math.min(1, m[0] * g[0] + m[1] * g[1]))),
      y = i,
      M = y * Math.tan(x / 2),
      S = Math.min(b, v) * 0.5 - 0.05;
    M > S && ((M = S), (y = M / Math.tan(x / 2)));
    let w = [d[0] - m[0] * M, d[1] - m[1] * M],
      _ = [d[0] + g[0] * M, d[1] + g[1] * M];
    c(h, w);
    let z = Math.sign(m[0] * g[1] - m[1] * g[0]),
      A = [w[0] - m[1] * z * y, w[1] + m[0] * z * y],
      T = Math.atan2(w[1] - A[1], w[0] - A[0]),
      R = Math.atan2(_[1] - A[1], _[0] - A[0]) - T;
    for (; R > Math.PI;) R -= 2 * Math.PI;
    for (; R < -Math.PI;) R += 2 * Math.PI;
    let P = Math.max(2, Math.ceil((Math.abs(R) * y) / 0.3));
    for (let C = 1; C <= P; C++) {
      let I = T + (R * C) / P;
      l.push([A[0] + Math.cos(I) * y, A[1] + Math.sin(I) * y]);
    }
    h = _;
  }
  return (c(h, r[r.length - 1]), l);
}
function Pxt(o, t = 6) {
  let s = new Map(),
    n = (a, r) => a * 7919 + r;
  for (let a = 0; a + 1 < o.length; a++) {
    let r = Math.floor(Math.min(o[a][0], o[a + 1][0]) / 2),
      l = Math.floor(Math.min(o[a][1], o[a + 1][1]) / 2),
      c = Math.floor(Math.max(o[a][0], o[a + 1][0]) / 2),
      h = Math.floor(Math.max(o[a][1], o[a + 1][1]) / 2);
    for (let f = r; f <= c; f++)
      for (let u = l; u <= h; u++) {
        let d = n(f, u),
          p = s.get(d);
        (p || s.set(d, (p = [])), p.push(a));
      }
  }
  let i = Math.ceil(t / 2);
  return (a, r) => {
    let l = Math.floor(a / 2),
      c = Math.floor(r / 2),
      h = t * t;
    for (let f = l - i; f <= l + i; f++)
      for (let u = c - i; u <= c + i; u++) {
        let d = s.get(n(f, u));
        if (d)
          for (let p of d) {
            let m = o[p],
              g = o[p + 1],
              b = g[0] - m[0],
              v = g[1] - m[1],
              x = b * b + v * v,
              y = Math.max(
                0,
                Math.min(1, ((a - m[0]) * b + (r - m[1]) * v) / (x || 1)),
              ),
              M = a - m[0] - b * y,
              S = r - m[1] - v * y,
              w = M * M + S * S;
            w < h && (h = w);
          }
      }
    return Math.sqrt(h);
  };
}
