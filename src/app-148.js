// app 148 — math
// Lines 94200-94500 of readable/app.pretty.js (statement-aligned).
function g$(o, t) {
  let e = {};
  for (let s of t) {
    let n = (l) => {
        let c = 0;
        for (let [h] of o.juns[l].legs)
          if (h !== s && !h.elev && !h.inner) {
            let f = h.ja === l ? 0 : h.n - 1;
            c = Math.max(c, h.W[f] + (h.sw || 0));
          }
        return c || s.W[0] + (s.sw || 2);
      },
      i = n(s.ja),
      a = n(s.jb),
      r = Math.max(2, Math.ceil((s.s1 - s.s0) / 2) + 1);
    for (let l of [-1, 1]) {
      let c = [],
        h = [],
        f = [],
        u = [];
      for (let y = 0; y < r; y++) {
        let M = s.s0 + ((s.s1 - s.s0) * y) / (r - 1);
        Ot(s, M, e);
        let S = M / (s.L || 1),
          w = Math.max(e.w + 1.2, i + (a - i) * S);
        (c.push(e.x + e.nx * e.w * l, e.z + e.nz * e.w * l),
          h.push(e.x + e.nx * w * l, e.z + e.nz * w * l),
          f.push(e.y),
          u.push(e.y - 0.025));
      }
      let d = new Float32Array(c.length * 2),
        p = new Float32Array(r * 2);
      for (let y = 0; y < r; y++)
        ((d[y * 2] = c[y * 2]),
          (d[y * 2 + 1] = c[y * 2 + 1]),
          (p[y] = f[y] - 0.025));
      for (let y = 0; y < r; y++) {
        let M = r - 1 - y;
        ((d[(r + y) * 2] = h[M * 2]),
          (d[(r + y) * 2 + 1] = h[M * 2 + 1]),
          (p[r + y] = u[M]));
      }
      let m = [d];
      m.ys = [p];
      let g = ju(c[0], c[1]),
        b = o.walks.get(g);
      (b || o.walks.set(g, (b = [])), b.push(m));
      let v = new Float32Array(c);
      v.ys = new Float32Array(f);
      let x = o.curbs.get(g);
      (x || o.curbs.set(g, (x = [])), x.push(v));
    }
  }
}
function b$(o, t, e) {
  let s = (t - o.x0) / o.step,
    n = (e - o.z0) / o.step,
    i = Math.min(o.nx - 2, Math.max(0, Math.floor(s))),
    a = Math.min(o.nz - 2, Math.max(0, Math.floor(n))),
    r = Math.min(1, Math.max(0, s - i)),
    l = Math.min(1, Math.max(0, n - a)),
    c = o.h,
    h = o.nx,
    f = c[a * h + i],
    u = c[a * h + i + 1],
    d = c[(a + 1) * h + i],
    p = c[(a + 1) * h + i + 1];
  return r >= l ? f + (u - f) * r + (p - u) * l : f + (p - d) * r + (d - f) * l;
}
var _p = {};
function cmt(o, t, e) {
  if (o.flat || !o.legs.length) return o.y;
  if (o.region && o.type === "x" && o.legs.length > 2) {
    let i = 0,
      a = 0;
    for (let [r] of o.legs) {
      ys(r, t, e, _p);
      let l = _p.d * _p.d,
        c = 1 / (l * l + 0.05);
      ((i += c), (a += c * _p.y));
    }
    return a / i;
  }
  let s = 1e9,
    n = o.y;
  for (let [i] of o.legs)
    (ys(i, t, e, _p), _p.d < s && ((s = _p.d), (n = _p.y)));
  return n;
}
function hmt(o, t, e = null, s = !1, n = !0, i = 1) {
  let a = {},
    r = (l, c) => !e || (l >= e[0] && c >= e[1] && l <= e[2] && c <= e[3]);
  for (let l of o.edges)
    if (!(l.inner || l.tunnel || l.layered || l.custom || l.s1 - l.s0 < 0.5)) {
      if (e) {
        let c = l.bb || null;
        if (c && (c[2] < e[0] || c[0] > e[2] || c[3] < e[1] || c[1] > e[3]))
          continue;
      }
      for (let c = l.s0; c <= l.s1 + 1e-6; c += Math.min(i, l.s1 - c || i)) {
        if ((Ot(l, Math.min(c, l.s1), a), !r(a.x, a.z))) {
          if (c >= l.s1) break;
          continue;
        }
        let h = Math.max(1, Math.ceil((a.w * 2) / i));
        for (let f = 0; f <= h; f++) {
          let u = -a.w + (2 * a.w * f) / h;
          t(a.x + a.nx * u, a.z + a.nz * u, a.y, l);
        }
        if (n && l.sw > 0 && !l.hwy)
          for (let f of [-1, 1])
            for (let u = a.w + i / 2; u <= a.w + l.sw + 1e-6; u += i)
              t(a.x + a.nx * u * f, a.z + a.nz * u * f, a.y + p$, l, null, !0);
        if (c >= l.s1) break;
      }
    }
  for (let l of o.juns) {
    if (l.layered || !l.polys.length) continue;
    let [c, h, f, u] = l.bb;
    if (!(e && (f < e[0] || c > e[2] || u < e[1] || h > e[3]))) {
      for (let d = Math.ceil(c / i) * i; d <= f; d += i)
        for (let p = Math.ceil(h / i) * i; p <= u; p += i)
          if (r(d, p)) {
            for (let m of l.polys)
              if (
                rn(m[0].pts, d, p) &&
                !m.slice(1).some((g) => rn(g.pts, d, p))
              ) {
                t(d, p, cmt(l, d, p), null, l);
                break;
              }
          }
    }
  }
  if (s)
    for (let l of o.walks.values())
      for (let c of l) {
        let h = c[0],
          f = c.ys?.[0];
        if (!f) continue;
        let u = 1e9,
          d = 1e9,
          p = -1e9,
          m = -1e9,
          g = 1e9;
        for (let b = 0; b < h.length; b += 2)
          ((u = Math.min(u, h[b])),
            (p = Math.max(p, h[b])),
            (d = Math.min(d, h[b + 1])),
            (m = Math.max(m, h[b + 1])),
            (g = Math.min(g, f[b / 2])));
        if (!(e && (p < e[0] || u > e[2] || m < e[1] || d > e[3])))
          for (let b = Math.ceil(u); b <= p; b += 1)
            for (let v = Math.ceil(d); v <= m; v += 1) {
              if (
                !r(b, v) ||
                !rn(h, b, v) ||
                c.slice(1).some((M) => rn(M, b, v))
              )
                continue;
              let x = 1e18,
                y = g;
              for (let M = 0; M < h.length; M += 2) {
                let S = (h[M] - b) ** 2 + (h[M + 1] - v) ** 2;
                S < x && ((x = S), (y = f[M / 2]));
              }
              t(b, v, y + p$, null, null, !0);
            }
      }
}
function fmt(o, t, e, s = null, n = 1) {
  for (let i of o.walks.values())
    for (let a of i) {
      if (!a.ys) continue;
      let r = a[0],
        l = 1e9,
        c = 1e9,
        h = -1e9,
        f = -1e9,
        u = 1e9,
        d = -1e9;
      for (let m = 0; m < r.length; m += 2)
        ((l = Math.min(l, r[m])),
          (h = Math.max(h, r[m])),
          (c = Math.min(c, r[m + 1])),
          (f = Math.max(f, r[m + 1])));
      if (s && (h < s[0] || l > s[2] || f < s[1] || c > s[3])) continue;
      for (let m of a.ys)
        for (let g = 0; g < m.length; g++)
          ((u = Math.min(u, m[g])), (d = Math.max(d, m[g])));
      let p = d - u < 0.35;
      for (let m = Math.floor(c) + n / 2; m < f; m += n) {
        let g = [];
        for (let b of a)
          for (let v = 0, x = b.length - 2; v < b.length; x = v, v += 2) {
            let y = b[v + 1],
              M = b[x + 1];
            y > m != M > m &&
              g.push(b[x] + ((m - M) * (b[v] - b[x])) / (y - M));
          }
        g.sort((b, v) => b - v);
        for (let b = 0; b + 1 < g.length; b += 2)
          for (let v = Math.ceil(g[b] / n) * n + n / 2; v < g[b + 1]; v += n) {
            if (s && (v < s[0] || v > s[2] || m < s[1] || m > s[3])) continue;
            let x;
            if (p) {
              let y = 1e18;
              x = u;
              for (let M = 0; M < a.length; M++) {
                let S = a[M],
                  w = a.ys[M];
                for (let _ = 0; _ < S.length; _ += 2) {
                  let z = (S[_] - v) ** 2 + (S[_ + 1] - m) ** 2;
                  z < y && ((y = z), (x = w[_ / 2]));
                }
              }
            } else x = t.streetY(v, m);
            e(v, m, x + t.CURB);
          }
      }
    }
}
function umt(o, t = o.terrain, e = null) {
  let s = [t.x0, t.z0, t.x0 + (t.nx - 1) * t.step, t.z0 + (t.nz - 1) * t.step],
    n = t.h,
    i = t.nx,
    a = t.holes,
    r = (f, u) => {
      if (t !== o.terrain) return !0;
      for (let d of o.terrain.regions || [])
        if (
          f >= d.x0 &&
          u >= d.z0 &&
          f <= d.x0 + (d.nx - 1) * d.step &&
          u <= d.z0 + (d.nz - 1) * d.step
        )
          return !1;
      return !0;
    },
    l = [],
    c = (f, u, d, p, m, g, b = !1) => {
      let v = null;
      if (m?.plate && e) {
        v = e.probe(f, u);
        let R = v.all.find((P) => P.J === m);
        R && (d = R.y);
      }
      if (
        !r(f, u) ||
        lmt(f, u) ||
        b$(t, f, u) <= d - 0.1 ||
        (e &&
          ((v ||= e.probe(f, u)),
          (b && v.road) ||
            (g && (v.road || v.all.some((R) => R.y > d))) ||
            v.all.some((R) => R.y > d + 0.5 && R.y < d + 6)))
      )
        return;
      let x = (f - t.x0) / t.step,
        y = (u - t.z0) / t.step,
        M = Math.min(t.nx - 2, Math.max(0, Math.floor(x))),
        S = Math.min(t.nz - 2, Math.max(0, Math.floor(y)));
      if (a && a.has(S * i + M)) return;
      let w = Math.min(1, Math.max(0, x - M)),
        _ = Math.min(1, Math.max(0, y - S)),
        z = S * i + M,
        A = (S + 1) * i + M + 1,
        T = b || g ? d - 0.12 : d - 0.15,
        E = d - 0.2;
      w >= _
        ? l.push(T, E, z, 1 - w, S * i + M + 1, w - _, A, _)
        : l.push(T, E, z, 1 - _, (S + 1) * i + M, _ - w, A, w);
    };
  (hmt(o, c, s, !1, !0, 0.5),
    e && fmt(o, e, (f, u, d) => c(f, u, d, null, null, !1, !0), s));
  let h = new Set();
  for (let f = 0; f < 8; f++) {
    let u = 0;
    for (let d = 0; d < l.length; d += 8) {
      let p = l[d],
        m = l[d + 1],
        g = 0,
        b = 0;
      for (let y = 2; y < 8; y += 2) {
        let M = l[d + y],
          S = l[d + y + 1];
        ((g += n[M] * S), n[M] > m && (b += S));
      }
      let v = g - p;
      if (v <= 0.001 || b <= 0) continue;
      u++;
      let x = v / Math.max(b, 0.05);
      for (let y = 2; y < 8; y += 2) {
        let M = l[d + y];
        n[M] > m && ((n[M] -= Math.min(n[M] - m, x)), h.add(M));
      }
    }
    if (!u) break;
  }
  return h.size;
}
