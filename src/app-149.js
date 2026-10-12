// app 149 — math
// Lines 93930-94230 of readable/app.pretty.js (statement-aligned).
function pj(i, t) {
  let e = {};
  for (let s of t) {
    let n = (l) => {
        let c = 0;
        for (let [h] of i.juns[l].legs)
          if (h !== s && !h.elev && !h.inner) {
            let f = h.ja === l ? 0 : h.n - 1;
            c = Math.max(c, h.W[f] + (h.sw || 0));
          }
        return c || s.W[0] + (s.sw || 2);
      },
      o = n(s.ja),
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
          w = Math.max(e.w + 1.2, o + (a - o) * S);
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
      let g = hu(c[0], c[1]),
        b = i.walks.get(g);
      (b || i.walks.set(g, (b = [])), b.push(m));
      let x = new Float32Array(c);
      x.ys = new Float32Array(f);
      let v = i.curbs.get(g);
      (v || i.curbs.set(g, (v = [])), v.push(x));
    }
  }
}
function mj(i, t, e) {
  let s = (t - i.x0) / i.step,
    n = (e - i.z0) / i.step,
    o = Math.min(i.nx - 2, Math.max(0, Math.floor(s))),
    a = Math.min(i.nz - 2, Math.max(0, Math.floor(n))),
    r = Math.min(1, Math.max(0, s - o)),
    l = Math.min(1, Math.max(0, n - a)),
    c = i.h,
    h = i.nx,
    f = c[a * h + o],
    u = c[a * h + o + 1],
    d = c[(a + 1) * h + o],
    p = c[(a + 1) * h + o + 1];
  return r >= l ? f + (u - f) * r + (p - u) * l : f + (p - d) * r + (d - f) * l;
}
var Xd = {};
function Uut(i, t, e) {
  if (i.flat || !i.legs.length) return i.y;
  if (i.region && i.type === "x" && i.legs.length > 2) {
    let o = 0,
      a = 0;
    for (let [r] of i.legs) {
      vs(r, t, e, Xd);
      let l = Xd.d * Xd.d,
        c = 1 / (l * l + 0.05);
      ((o += c), (a += c * Xd.y));
    }
    return a / o;
  }
  let s = 1e9,
    n = i.y;
  for (let [o] of i.legs)
    (vs(o, t, e, Xd), Xd.d < s && ((s = Xd.d), (n = Xd.y)));
  return n;
}
function Gut(i, t, e = null, s = !1, n = !0, o = 1) {
  let a = {},
    r = (l, c) => !e || (l >= e[0] && c >= e[1] && l <= e[2] && c <= e[3]);
  for (let l of i.edges)
    if (!(l.inner || l.tunnel || l.layered || l.custom || l.s1 - l.s0 < 0.5)) {
      if (e) {
        let c = l.bb || null;
        if (c && (c[2] < e[0] || c[0] > e[2] || c[3] < e[1] || c[1] > e[3]))
          continue;
      }
      for (let c = l.s0; c <= l.s1 + 1e-6; c += Math.min(o, l.s1 - c || o)) {
        if ((Ot(l, Math.min(c, l.s1), a), !r(a.x, a.z))) {
          if (c >= l.s1) break;
          continue;
        }
        let h = Math.max(1, Math.ceil((a.w * 2) / o));
        for (let f = 0; f <= h; f++) {
          let u = -a.w + (2 * a.w * f) / h;
          t(a.x + a.nx * u, a.z + a.nz * u, a.y, l);
        }
        if (n && l.sw > 0 && !l.hwy)
          for (let f of [-1, 1])
            for (let u = a.w + o / 2; u <= a.w + l.sw + 1e-6; u += o)
              t(a.x + a.nx * u * f, a.z + a.nz * u * f, a.y + uj, l, null, !0);
        if (c >= l.s1) break;
      }
    }
  for (let l of i.juns) {
    if (l.layered || !l.polys.length) continue;
    let [c, h, f, u] = l.bb;
    if (!(e && (f < e[0] || c > e[2] || u < e[1] || h > e[3]))) {
      for (let d = Math.ceil(c / o) * o; d <= f; d += o)
        for (let p = Math.ceil(h / o) * o; p <= u; p += o)
          if (r(d, p)) {
            for (let m of l.polys)
              if (
                en(m[0].pts, d, p) &&
                !m.slice(1).some((g) => en(g.pts, d, p))
              ) {
                t(d, p, Uut(l, d, p), null, l);
                break;
              }
          }
    }
  }
  if (s)
    for (let l of i.walks.values())
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
            for (let x = Math.ceil(d); x <= m; x += 1) {
              if (
                !r(b, x) ||
                !en(h, b, x) ||
                c.slice(1).some((M) => en(M, b, x))
              )
                continue;
              let v = 1e18,
                y = g;
              for (let M = 0; M < h.length; M += 2) {
                let S = (h[M] - b) ** 2 + (h[M + 1] - x) ** 2;
                S < v && ((v = S), (y = f[M / 2]));
              }
              t(b, x, y + uj, null, null, !0);
            }
      }
}
function Wut(i, t, e, s = null, n = 1) {
  for (let o of i.walks.values())
    for (let a of o) {
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
          for (let x = 0, v = b.length - 2; x < b.length; v = x, x += 2) {
            let y = b[x + 1],
              M = b[v + 1];
            y > m != M > m &&
              g.push(b[v] + ((m - M) * (b[x] - b[v])) / (y - M));
          }
        g.sort((b, x) => b - x);
        for (let b = 0; b + 1 < g.length; b += 2)
          for (let x = Math.ceil(g[b] / n) * n + n / 2; x < g[b + 1]; x += n) {
            if (s && (x < s[0] || x > s[2] || m < s[1] || m > s[3])) continue;
            let v;
            if (p) {
              let y = 1e18;
              v = u;
              for (let M = 0; M < a.length; M++) {
                let S = a[M],
                  w = a.ys[M];
                for (let z = 0; z < S.length; z += 2) {
                  let _ = (S[z] - x) ** 2 + (S[z + 1] - m) ** 2;
                  _ < y && ((y = _), (v = w[z / 2]));
                }
              }
            } else v = t.streetY(x, m);
            e(x, m, v + t.CURB);
          }
      }
    }
}
function qut(i, t = i.terrain, e = null) {
  let s = [t.x0, t.z0, t.x0 + (t.nx - 1) * t.step, t.z0 + (t.nz - 1) * t.step],
    n = t.h,
    o = t.nx,
    a = t.holes,
    r = (f, u) => {
      if (t !== i.terrain) return !0;
      for (let d of i.terrain.regions || [])
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
      let x = null;
      if (m?.plate && e) {
        x = e.probe(f, u);
        let A = x.all.find((C) => C.J === m);
        A && (d = A.y);
      }
      if (
        !r(f, u) ||
        Dut(f, u) ||
        mj(t, f, u) <= d - 0.1 ||
        (e &&
          ((x ||= e.probe(f, u)),
          (b && x.road) ||
            (g && (x.road || x.all.some((A) => A.y > d))) ||
            x.all.some((A) => A.y > d + 0.5 && A.y < d + 6)))
      )
        return;
      let v = (f - t.x0) / t.step,
        y = (u - t.z0) / t.step,
        M = Math.min(t.nx - 2, Math.max(0, Math.floor(v))),
        S = Math.min(t.nz - 2, Math.max(0, Math.floor(y)));
      if (a && a.has(S * o + M)) return;
      let w = Math.min(1, Math.max(0, v - M)),
        z = Math.min(1, Math.max(0, y - S)),
        _ = S * o + M,
        R = (S + 1) * o + M + 1,
        T = b || g ? d - 0.12 : d - 0.15,
        E = d - 0.2;
      w >= z
        ? l.push(T, E, _, 1 - w, S * o + M + 1, w - z, R, z)
        : l.push(T, E, _, 1 - z, (S + 1) * o + M, z - w, R, w);
    };
  (Gut(i, c, s, !1, !0, 0.5),
    e && Wut(i, e, (f, u, d) => c(f, u, d, null, null, !1, !0), s));
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
      let x = g - p;
      if (x <= 0.001 || b <= 0) continue;
      u++;
      let v = x / Math.max(b, 0.05);
      for (let y = 2; y < 8; y += 2) {
        let M = l[d + y];
        n[M] > m && ((n[M] -= Math.min(n[M] - m, v)), h.add(M));
      }
    }
    if (!u) break;
  }
  return h.size;
}
