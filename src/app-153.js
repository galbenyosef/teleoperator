// app 153 — math
// Lines 95177-95515 of readable/app.pretty.js (statement-aligned).
function yj(i) {
  let t = i.terrain,
    e = i.edges.filter(
      (d) => d.elev && !d.inner && !d.tunnel && !d.tunnelR && d.n >= 2,
    ),
    s = {},
    n = [];
  if (!e.length) return 0;
  let o = new Map(
      e.map((d) => {
        let p = 1e9,
          m = 1e9,
          g = -1e9,
          b = -1e9;
        for (let x = 0; x < d.n; x++)
          ((p = Math.min(p, d.P[x * 3])),
            (g = Math.max(g, d.P[x * 3])),
            (m = Math.min(m, d.P[x * 3 + 1])),
            (b = Math.max(b, d.P[x * 3 + 1])));
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
      let m = i.juns[p];
      if (m.legs.length !== 2 || m.plate) return null;
      let [g, b] = m.legs.find(([x]) => x !== d) || [];
      return g && a(g) ? [m, g, b] : null;
    },
    l = (d, p, m = 3) => {
      let g = r(d, p);
      if (!g || !m) return 0;
      let [, b, x] = g;
      return b.L + l(b, x === "a" ? b.jb : b.ja, m - 1);
    },
    c = new Set(),
    h = (d) => {
      !t?.h || d.region || vj(t, d, i);
    },
    f = (d, p) => {
      if (d.drop) for (let m = 0; m < d.n; m++) d.drop[m] += p[m];
      else ((d.drop = p), (i.dropped ||= []).push(d));
      ((d.underpass = !0), c.add(d));
    },
    u = (d, p, m, g, b = 3) => {
      if (g < 0.01) return;
      d.y -= g;
      for (let M of d.rings) for (let S = 0; S < M.y.length; S++) M.y[S] -= g;
      Yd(p, 3);
      let x = new Float32Array(p.n);
      for (let M = 0; M < p.n; M++) {
        let S = m === "a" ? p.S[M] : p.L - p.S[M],
          w = Math.max(0, g - j7 * S);
        ((x[M] = w), (p.P[M * 3 + 2] -= w));
      }
      f(p, x);
      let v = m === "a" ? p.n - 1 : 0,
        y = x[v];
      if (y > 0.01) {
        let M = r(p, m === "a" ? p.jb : p.ja);
        M && b && u(M[0], M[1], M[2], y, b - 1);
      }
    };
  for (let d of i.edges) {
    if (!a(d) || d.n < 2) continue;
    let p = 1 / 0,
      m = 1 / 0,
      g = -1 / 0,
      b = -1 / 0;
    for (let _ = 0; _ < d.n; _++) {
      let R = d.P[_ * 3],
        T = d.P[_ * 3 + 1];
      ((p = Math.min(p, R)),
        (g = Math.max(g, R)),
        (m = Math.min(m, T)),
        (b = Math.max(b, T)));
    }
    let x = new Set();
    for (let _ of [d.ja, d.jb])
      if (_ >= 0) for (let [R] of i.juns[_].legs) x.add(R);
    let v = null,
      y = {};
    for (let _ of e) {
      if (x.has(_)) continue;
      let R = o.get(_);
      if (!(g < R[0] || p > R[2] || b < R[1] || m > R[3]))
        for (let T = 1; T < d.L - 1; T += 2) {
          Ot(d, T, y);
          let E = y.y;
          if (y.x < R[0] || y.x > R[2] || y.z < R[1] || y.z > R[3]) continue;
          let A = 1e9;
          for (let C of [0, -y.w, y.w]) {
            let P = y.x + y.nx * C,
              I = y.z + y.nz * C;
            if (
              (vs(_, P, I, s),
              (C ? s.d > s.w + 0.3 : s.d > s.w + y.w) ||
                s.s < 0.3 ||
                s.s > _.L - 0.3)
            )
              continue;
            let L = s.y - E;
            L < 0.3 || L >= Kd - 0.02 || (A = Math.min(A, s.y - Kd));
          }
          A < 1e9 && (v ||= []).push([T, A]);
        }
    }
    if (!v) continue;
    Yd(d, 3);
    let M = l(d, d.ja),
      S = l(d, d.jb),
      w = new Float32Array(d.n),
      z = 0;
    for (let _ = 0; _ < d.n; _++) {
      let R = d.P[_ * 3 + 2];
      for (let [T, E] of v)
        R = Math.min(R, E - 0.3 + j7 * Math.abs(d.S[_] - T));
      ((R = Math.max(
        R,
        d.P[_ * 3 + 2] - j7 * Math.min(d.S[_] + M, d.L - d.S[_] + S),
      )),
        R < d.P[_ * 3 + 2] - 0.01 &&
          ((w[_] = d.P[_ * 3 + 2] - R), (d.P[_ * 3 + 2] = R), z++));
    }
    if (z) {
      (f(d, w), n.push(d));
      for (let [_, R] of [
        [d.ja, 0],
        [d.jb, d.n - 1],
      ]) {
        if (w[R] < 0.01) continue;
        let T = r(d, _);
        T && u(T[0], T[1], T[2], w[R]);
      }
    }
  }
  for (let d of c) h(d);
  return n.length;
}
function wj(i) {
  let t = i.terrain;
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
    o = {};
  for (let a of i.embank || [])
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
            (vs(a, t.x0 + m * t.step, t.z0 + p * t.step, o),
              !(o.d > o.w + 1.01) &&
                (t.h[g] < e.y - 0.45 || t.h[g] > e.y - 0.2) &&
                ((t.h[g] = e.y - 0.3), s++));
          }
      }
    }
  for (let a of i.edges)
    if (!(!a.elev || a.inner || a.custom || a.tunnel || a.tunnelR || a.region))
      for (let r = 0; r <= a.L; r += 1) {
        Ot(a, r, e);
        let l = e.w + 0.6;
        for (let c = -l; c <= l + 0.01; c += 1)
          n(e.x + e.nx * c, e.z + e.nz * c, e.y - 0.35);
      }
  for (let a of i.juns) {
    if (!a.plate || !a.tri || a.region) continue;
    let { flat: r, ys: l } = a.tri;
    for (let c = 0; c < l.length; c++) n(r[c * 2], r[c * 2 + 1], l[c] - 0.35);
  }
  return s;
}
function Mj(i) {
  let t = 0,
    e = {},
    s = (n, o) => {
      if (n < 0) return null;
      let a = i.juns[n];
      if (a.legs.length !== 2 || !a.rings.length) return null;
      let r = a.legs.find(([c]) => c !== o)?.[0];
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
      let l = i.juns[r.ja === n ? r.jb : r.ja];
      return l && l.flat ? { JJ: a, F: r, y: l.y } : null;
    };
  for (let n of i.edges) {
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
    let o = s(n.ja, n),
      a = s(n.jb, n);
    if (!(!o && !a)) {
      for (let r of [o, a]) {
        if (!r) continue;
        let { JJ: l, F: c, y: h } = r,
          f = new Float32Array(c.n);
        for (let u = 0; u < c.n; u++)
          ((f[u] = Math.abs(c.P[u * 3 + 2] - h) + 0.06), (c.P[u * 3 + 2] = h));
        ((c.drop = f), (i.dropped ||= []).push(c), (l.y = h));
        for (let u of l.rings) u.y.fill(h);
      }
      if (o && a && n.L < 40) {
        Yd(n, 3);
        for (let r = 0; r < n.n; r++)
          n.P[r * 3 + 2] = o.y + ((a.y - o.y) * n.S[r]) / n.L;
      }
    }
  }
  for (let n of i.juns) {
    if (n.legs.length !== 2 || !n.rings.length) continue;
    let [[o, a], [r, l]] = n.legs;
    if (
      o.inner ||
      r.inner ||
      o.custom ||
      r.custom ||
      o.tunnel ||
      r.tunnel ||
      o.tunnelR ||
      r.tunnelR
    )
      continue;
    let c =
      o.elev && !r.elev
        ? [o, a, r, l]
        : r.elev && !o.elev
          ? [r, l, o, a]
          : null;
    if (!c) continue;
    let [h, f, u, d] = c;
    if (h.n < 2 || u.n < 2 || h.hwy || u.hwy) continue;
    let p = d === "a" ? 0 : u.n - 1,
      m = u.P[p * 3 + 2];
    Ot(u, d === "a" ? Math.min(u.L, 3) : Math.max(0, u.L - 3), e);
    let g = (e.y - m) / Math.min(3, u.L);
    Yd(h, 3);
    let b = Math.min(15, h.L / 3),
      x = f === "a" ? b : h.L - b;
    Ot(h, x, e);
    let v = e.y,
      y = {};
    Ot(h, f === "a" ? Math.min(h.L, x + 2) : Math.max(0, x - 2), y);
    let M = (y.y - v) / 2,
      S = -g;
    for (let w = 0; w < h.n; w++) {
      let z = f === "a" ? h.S[w] : h.L - h.S[w];
      if (z >= b) continue;
      let _ = z / b,
        R = 2 * _ ** 3 - 3 * _ ** 2 + 1,
        T = _ ** 3 - 2 * _ ** 2 + _,
        E = -2 * _ ** 3 + 3 * _ ** 2,
        A = _ ** 3 - _ ** 2;
      h.P[w * 3 + 2] = R * m + T * b * S + E * v + A * b * M;
    }
    ((n.bridgeJoin = !0), t++);
  }
  for (let n of i.juns) {
    if (n.legs.length < 3 || !n.rings.length) continue;
    let o = n.legs.filter(([p]) => p.elev);
    if (o.length !== 1) continue;
    let [a, r] = o[0];
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
    Yd(a, 3);
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
        x = -2 * g ** 3 + 3 * g ** 2,
        v = g ** 3 - g ** 2;
      a.P[p * 3 + 2] = b * n.y + x * u + v * f * d;
    }
    ((n.bridgeLand = !0), t++);
  }
  return t;
}
