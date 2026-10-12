// app 161 — math
// Lines 97750-97902 of readable/app.pretty.js (statement-aligned).
function ok(i, t) {
  if (i._road !== void 0) return i._road;
  let e = 0;
  if (t?.EH) {
    let s = i[0],
      n = s.length / 2,
      o = 0;
    for (let a = 0; a < n && e < 1; a++) {
      let r = (a + 1) % n,
        l = s[a * 2],
        c = s[a * 2 + 1],
        h = s[r * 2] - l,
        f = s[r * 2 + 1] - c,
        u = Math.hypot(h, f);
      if (!(u < 0.001)) {
        for (let d = 2 - o; d < u && e < 1; d += 2) {
          let p = l + (h * d) / u,
            m = c + (f * d) / u;
          for (let g of [-1, 1]) {
            let b = p - (f / u) * g,
              x = m + (h / u) * g;
            if (en(s, b, x)) {
              Qd(t, b, x) && e++;
              break;
            }
          }
        }
        o = (o + u) % 2;
      }
    }
  }
  if (!e && t?.EH) {
    let s = i[0];
    for (let n = 0; n < s.length && !e; n += 2) Qd(t, s[n], s[n + 1]) && e++;
  }
  if (((i._road = e >= 1), i._road)) {
    let s = i[0],
      n = 1e9,
      o = 1e9,
      a = -1e9,
      r = -1e9;
    for (let l = 0; l < s.length; l += 2)
      ((n = Math.min(n, s[l])),
        (a = Math.max(a, s[l])),
        (o = Math.min(o, s[l + 1])),
        (r = Math.max(r, s[l + 1])));
    i._bb = [n - 1, o - 1, a + 1, r + 1];
  }
  return i._road;
}
function zdt(i, t, e) {
  if (i._dk !== void 0) return i._dk;
  let s = i[0],
    n = 1e9,
    o = 1e9,
    a = -1e9,
    r = -1e9;
  for (let f = 0; f < s.length; f += 2)
    ((n = Math.min(n, s[f])),
      (a = Math.max(a, s[f])),
      (o = Math.min(o, s[f + 1])),
      (r = Math.max(r, s[f + 1])));
  let l = 1e9,
    c = -1e9;
  for (let f of e.ys) ((l = Math.min(l, f)), (c = Math.max(c, f)));
  let h = new Set();
  if (t?.EH)
    for (let f = Math.floor(n / t.HC); f <= Math.floor(a / t.HC); f++)
      for (let u = Math.floor(o / t.HC); u <= Math.floor(r / t.HC); u++)
        for (let d of t.EH.get(t.hk(f, u)) || []) {
          let p = t.edges[Math.floor(d / 65536)],
            m = d % 65536;
          if (!p.elev || p.inner || p.tunnel || p.tunnelR || m + 1 >= p.n)
            continue;
          let g = p.P[m * 3 + 2],
            b = p.P[m * 3 + 5];
          Math.max(g, b) < l - 1 || Math.min(g, b) > c + 1 || h.add(p);
        }
  return (i._dk = [...h]);
}
function Edt(i, t, e) {
  let { flat: s, ys: n, tris: o } = e,
    a = zdt(i, t, e);
  if (!ok(i, t) && !a.length) return e;
  let r = {},
    l = (b, x, v) => {
      for (let y of a)
        if (
          (vs(y, b, x, r),
          r.d < r.w - 0.2 && r.s > y.s0 && r.s < y.s1 && Math.abs(r.y - v) < 1)
        )
          return !0;
      return !1;
    },
    c = (b, x, v) => Qd(t, b, x) || (a.length > 0 && l(b, x, v)),
    h = Array.from(s),
    f = Array.from(n),
    u = [],
    d = (b, x, v) => {
      let y = h[b * 2],
        M = h[b * 2 + 1],
        S = h[x * 2],
        w = h[x * 2 + 1],
        z = h[v * 2],
        _ = h[v * 2 + 1],
        R = (y + S + z) / 3,
        T = (M + w + _) / 3,
        E = (f[b] + f[x] + f[v]) / 3,
        A = c(R, T, E) ? 1 : 0;
      for (let [C, P, I] of [
        [y, M, f[b]],
        [S, w, f[x]],
        [z, _, f[v]],
      ])
        c((R + C) / 2, (T + P) / 2, (E + I) / 2) && A++;
      return A;
    },
    p = (b, x) => (
      h.push((h[b * 2] + h[x * 2]) / 2, (h[b * 2 + 1] + h[x * 2 + 1]) / 2),
      f.push((f[b] + f[x]) / 2),
      f.length - 1
    ),
    m = (b, x, v, y) => {
      let M = d(b, x, v);
      if (M === 4) return;
      if (M === 0 || y === 0) {
        M < 3 && u.push([b, x, v]);
        return;
      }
      let S = p(b, x),
        w = p(x, v),
        z = p(v, b);
      (m(b, S, z, y - 1),
        m(S, x, w, y - 1),
        m(z, w, v, y - 1),
        m(S, w, z, y - 1));
    },
    g = (b, x) => Math.hypot(h[b * 2] - h[x * 2], h[b * 2 + 1] - h[x * 2 + 1]);
  for (let [b, x, v] of o)
    m(
      b,
      x,
      v,
      Math.min(
        4,
        Math.max(
          2,
          Math.ceil(Math.log2(Math.max(g(b, x), g(x, v), g(v, b)) / 2)),
        ),
      ),
    );
  return { flat: h, ys: f, tris: u };
}
