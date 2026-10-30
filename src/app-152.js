// app 152 — math
// Lines 95447-95785 of readable/app.pretty.js (statement-aligned).
function M$(o) {
  let t = o.terrain,
    e = o.edges.filter(
      (d) => d.elev && !d.inner && !d.tunnel && !d.tunnelR && d.n >= 2,
    ),
    s = {},
    n = [];
  if (!e.length) return 0;
  let i = new Map(
      e.map((d) => {
        let p = 1e9,
          m = 1e9,
          g = -1e9,
          b = -1e9;
        for (let v = 0; v < d.n; v++)
          ((p = Math.min(p, d.P[v * 3])),
            (g = Math.max(g, d.P[v * 3])),
            (m = Math.min(m, d.P[v * 3 + 1])),
            (b = Math.max(b, d.P[v * 3 + 1])));
        return [d, [p - 12, m - 12, g + 12, b + 12]];
      }),
    ),
    a = (d) =>
      !(
        d.elev ||
        d.inner ||
        d.tunnel ||
        d.tunnelR ||
        d.custom ||
        d.walkY ||
        d.n < 2 ||
        d.cls === "footway" ||
        d.cls === "path"
      ),
    r = (d, p) => {
      if (p < 0) return null;
      let m = o.juns[p];
      if (m.legs.length !== 2 || m.plate) return null;
      let [g, b] = m.legs.find(([v]) => v !== d) || [];
      return g && a(g) ? [m, g, b] : null;
    },
    l = (d, p, m = 3) => {
      let g = r(d, p);
      if (!g || !m) return 0;
      let [, b, v] = g;
      return b.L + l(b, v === "a" ? b.jb : b.ja, m - 1);
    },
    c = new Set(),
    h = (d) => {
      !t?.h || d.region || w$(t, d, o);
    },
    f = (d, p) => {
      if (d.drop) for (let m = 0; m < d.n; m++) d.drop[m] += p[m];
      else ((d.drop = p), (o.dropped ||= []).push(d));
      ((d.underpass = !0), c.add(d));
    },
    u = (d, p, m, g, b = 3) => {
      if (g < 0.01) return;
      d.y -= g;
      for (let M of d.rings) for (let S = 0; S < M.y.length; S++) M.y[S] -= g;
      Tp(p, 3);
      let v = new Float32Array(p.n);
      for (let M = 0; M < p.n; M++) {
        let S = m === "a" ? p.S[M] : p.L - p.S[M],
          w = Math.max(0, g - MC * S);
        ((v[M] = w), (p.P[M * 3 + 2] -= w));
      }
      f(p, v);
      let x = m === "a" ? p.n - 1 : 0,
        y = v[x];
      if (y > 0.01) {
        let M = r(p, m === "a" ? p.jb : p.ja);
        M && b && u(M[0], M[1], M[2], y, b - 1);
      }
    };
  for (let d of o.edges) {
    if (!a(d) || d.n < 2) continue;
    let p = 1 / 0,
      m = 1 / 0,
      g = -1 / 0,
      b = -1 / 0;
    for (let z = 0; z < d.n; z++) {
      let A = d.P[z * 3],
        T = d.P[z * 3 + 1];
      ((p = Math.min(p, A)),
        (g = Math.max(g, A)),
        (m = Math.min(m, T)),
        (b = Math.max(b, T)));
    }
    let v = new Set();
    for (let z of [d.ja, d.jb])
      if (z >= 0) for (let [A] of o.juns[z].legs) v.add(A);
    let x = null,
      y = {};
    for (let z of e) {
      if (v.has(z)) continue;
      let A = i.get(z);
      if (!(g < A[0] || p > A[2] || b < A[1] || m > A[3]))
        for (let T = 1; T < d.L - 1; T += 2) {
          Ot(d, T, y);
          let E = y.y;
          if (y.x < A[0] || y.x > A[2] || y.z < A[1] || y.z > A[3]) continue;
          let R = 1e9;
          for (let P of [0, -y.w, y.w]) {
            let C = y.x + y.nx * P,
              I = y.z + y.nz * P;
            if (
              (ys(z, C, I, s),
              (P ? s.d > s.w + 0.3 : s.d > s.w + y.w) ||
                s.s < 0.3 ||
                s.s > z.L - 0.3)
            )
              continue;
            let L = s.y - E;
            L < 0.3 || L >= Ep - 0.02 || (R = Math.min(R, s.y - Ep));
          }
          R < 1e9 && (x ||= []).push([T, R]);
        }
    }
    if (!x) continue;
    Tp(d, 3);
    let M = l(d, d.ja),
      S = l(d, d.jb),
      w = new Float32Array(d.n),
      _ = 0;
    for (let z = 0; z < d.n; z++) {
      let A = d.P[z * 3 + 2];
      for (let [T, E] of x)
        A = Math.min(A, E - 0.3 + MC * Math.abs(d.S[z] - T));
      ((A = Math.max(
        A,
        d.P[z * 3 + 2] - MC * Math.min(d.S[z] + M, d.L - d.S[z] + S),
      )),
        A < d.P[z * 3 + 2] - 0.01 &&
          ((w[z] = d.P[z * 3 + 2] - A), (d.P[z * 3 + 2] = A), _++));
    }
    if (_) {
      (f(d, w), n.push(d));
      for (let [z, A] of [
        [d.ja, 0],
        [d.jb, d.n - 1],
      ]) {
        if (w[A] < 0.01) continue;
        let T = r(d, z);
        T && u(T[0], T[1], T[2], w[A]);
      }
    }
  }
  for (let d of c) h(d);
  return n.length;
}
function S$(o) {
  let t = o.terrain;
  if (!t?.h) return 0;
  let e = {},
    s = 0,
    n = (a, r, l) => {
      let c = Math.floor((a - t.x0) / t.step),
        h = Math.floor((r - t.z0) / t.step);
      for (let f = h; f <= h + 1; f++)
        for (let u = c; u <= c + 1; u++) {
          if (u < 0 || f < 0 || u >= t.nx || f >= t.nz) continue;
          let d = f * t.nx + u;
          t.h[d] > l && ((t.h[d] = l), s++);
        }
    },
    i = {};
  for (let a of o.embank || [])
    for (let r = 0; r <= a.L; r += 1) {
      Ot(a, r, e);
      let l = e.w + 1;
      for (let c = -l; c <= l + 0.01; c += 1) {
        let h = e.x + e.nx * c,
          f = e.z + e.nz * c,
          u = Math.floor((h - t.x0) / t.step),
          d = Math.floor((f - t.z0) / t.step);
        for (let p = d; p <= d + 1; p++)
          for (let m = u; m <= u + 1; m++) {
            if (m < 0 || p < 0 || m >= t.nx || p >= t.nz) continue;
            let g = p * t.nx + m;
            (ys(a, t.x0 + m * t.step, t.z0 + p * t.step, i),
              !(i.d > i.w + 1.01) &&
                (t.h[g] < e.y - 0.45 || t.h[g] > e.y - 0.2) &&
                ((t.h[g] = e.y - 0.3), s++));
          }
      }
    }
  for (let a of o.edges)
    if (!(!a.elev || a.inner || a.custom || a.tunnel || a.tunnelR || a.region))
      for (let r = 0; r <= a.L; r += 1) {
        Ot(a, r, e);
        let l = e.w + 0.6;
        for (let c = -l; c <= l + 0.01; c += 1)
          n(e.x + e.nx * c, e.z + e.nz * c, e.y - 0.35);
      }
  for (let a of o.juns) {
    if (!a.plate || !a.tri || a.region) continue;
    let { flat: r, ys: l } = a.tri;
    for (let c = 0; c < l.length; c++) n(r[c * 2], r[c * 2 + 1], l[c] - 0.35);
  }
  return s;
}
function k$(o) {
  let t = 0,
    e = {},
    s = (n, i) => {
      if (n < 0) return null;
      let a = o.juns[n];
      if (a.legs.length !== 2 || !a.rings.length) return null;
      let r = a.legs.find(([c]) => c !== i)?.[0];
      if (
        !r ||
        r.elev ||
        r.inner ||
        r.hwy ||
        r.custom ||
        r.tunnel ||
        r.L >= 8 ||
        r.n < 2
      )
        return null;
      let l = o.juns[r.ja === n ? r.jb : r.ja];
      return l && l.flat ? { JJ: a, F: r, y: l.y } : null;
    };
  for (let n of o.edges) {
    if (
      !n.elev ||
      n.hwy ||
      n.inner ||
      n.custom ||
      n.tunnel ||
      n.tunnelR ||
      n.n < 2
    )
      continue;
    let i = s(n.ja, n),
      a = s(n.jb, n);
    if (!(!i && !a)) {
      for (let r of [i, a]) {
        if (!r) continue;
        let { JJ: l, F: c, y: h } = r,
          f = new Float32Array(c.n);
        for (let u = 0; u < c.n; u++)
          ((f[u] = Math.abs(c.P[u * 3 + 2] - h) + 0.06), (c.P[u * 3 + 2] = h));
        ((c.drop = f), (o.dropped ||= []).push(c), (l.y = h));
        for (let u of l.rings) u.y.fill(h);
      }
      if (i && a && n.L < 40) {
        Tp(n, 3);
        for (let r = 0; r < n.n; r++)
          n.P[r * 3 + 2] = i.y + ((a.y - i.y) * n.S[r]) / n.L;
      }
    }
  }
  for (let n of o.juns) {
    if (n.legs.length !== 2 || !n.rings.length) continue;
    let [[i, a], [r, l]] = n.legs;
    if (
      i.inner ||
      r.inner ||
      i.custom ||
      r.custom ||
      i.tunnel ||
      r.tunnel ||
      i.tunnelR ||
      r.tunnelR
    )
      continue;
    let c =
      i.elev && !r.elev
        ? [i, a, r, l]
        : r.elev && !i.elev
          ? [r, l, i, a]
          : null;
    if (!c) continue;
    let [h, f, u, d] = c;
    if (h.n < 2 || u.n < 2 || h.hwy || u.hwy) continue;
    let p = d === "a" ? 0 : u.n - 1,
      m = u.P[p * 3 + 2];
    Ot(u, d === "a" ? Math.min(u.L, 3) : Math.max(0, u.L - 3), e);
    let g = (e.y - m) / Math.min(3, u.L);
    Tp(h, 3);
    let b = Math.min(15, h.L / 3),
      v = f === "a" ? b : h.L - b;
    Ot(h, v, e);
    let x = e.y,
      y = {};
    Ot(h, f === "a" ? Math.min(h.L, v + 2) : Math.max(0, v - 2), y);
    let M = (y.y - x) / 2,
      S = -g;
    for (let w = 0; w < h.n; w++) {
      let _ = f === "a" ? h.S[w] : h.L - h.S[w];
      if (_ >= b) continue;
      let z = _ / b,
        A = 2 * z ** 3 - 3 * z ** 2 + 1,
        T = z ** 3 - 2 * z ** 2 + z,
        E = -2 * z ** 3 + 3 * z ** 2,
        R = z ** 3 - z ** 2;
      h.P[w * 3 + 2] = A * m + T * b * S + E * x + R * b * M;
    }
    ((n.bridgeJoin = !0), t++);
  }
  for (let n of o.juns) {
    if (n.legs.length < 3 || !n.rings.length) continue;
    let i = n.legs.filter(([p]) => p.elev);
    if (i.length !== 1) continue;
    let [a, r] = i[0];
    if (
      a.inner ||
      a.hwy ||
      a.custom ||
      a.tunnel ||
      a.tunnelR ||
      a.n < 2 ||
      n.legs.some(([p]) => p.hwy || (p.layered && p !== a))
    )
      continue;
    let l = r === "a" ? a.s0 : a.s1;
    if ((Ot(a, l, e), Math.abs(e.y - n.y) < 0.05)) continue;
    Tp(a, 3);
    let c = r === "a" ? a.s0 : a.L - a.s1,
      h = (p) => (Ot(a, r === "a" ? p : a.L - p, e), e.y),
      f = 15;
    for (; f < a.L / 2 - c && Math.abs(h(c + f) - n.y) / f > 0.09;) f += 1;
    let u = h(c + f),
      d = (h(c + f + 2) - u) / 2;
    for (let p = 0; p < a.n; p++) {
      let m = r === "a" ? a.S[p] : a.L - a.S[p];
      if (m >= c + f) continue;
      let g = Math.max(0, (m - c) / f),
        b = 2 * g ** 3 - 3 * g ** 2 + 1,
        v = -2 * g ** 3 + 3 * g ** 2,
        x = g ** 3 - g ** 2;
      a.P[p * 3 + 2] = b * n.y + v * u + x * f * d;
    }
    ((n.bridgeLand = !0), t++);
  }
  return t;
}
