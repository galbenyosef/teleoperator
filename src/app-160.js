// app 160 — math
// Lines 97986-98138 of readable/app.pretty.js (statement-aligned).
function oz(o, t) {
  if (o._road !== void 0) return o._road;
  let e = 0;
  if (t?.EH) {
    let s = o[0],
      n = s.length / 2,
      i = 0;
    for (let a = 0; a < n && e < 1; a++) {
      let r = (a + 1) % n,
        l = s[a * 2],
        c = s[a * 2 + 1],
        h = s[r * 2] - l,
        f = s[r * 2 + 1] - c,
        u = Math.hypot(h, f);
      if (!(u < 0.001)) {
        for (let d = 2 - i; d < u && e < 1; d += 2) {
          let p = l + (h * d) / u,
            m = c + (f * d) / u;
          for (let g of [-1, 1]) {
            let b = p - (f / u) * g,
              v = m + (h / u) * g;
            if (rn(s, b, v)) {
              Pp(t, b, v) && e++;
              break;
            }
          }
        }
        i = (i + u) % 2;
      }
    }
  }
  if (!e && t?.EH) {
    let s = o[0];
    for (let n = 0; n < s.length && !e; n += 2) Pp(t, s[n], s[n + 1]) && e++;
  }
  if (((o._road = e >= 1), o._road)) {
    let s = o[0],
      n = 1e9,
      i = 1e9,
      a = -1e9,
      r = -1e9;
    for (let l = 0; l < s.length; l += 2)
      ((n = Math.min(n, s[l])),
        (a = Math.max(a, s[l])),
        (i = Math.min(i, s[l + 1])),
        (r = Math.max(r, s[l + 1])));
    o._bb = [n - 1, i - 1, a + 1, r + 1];
  }
  return o._road;
}
function Ymt(o, t, e) {
  if (o._dk !== void 0) return o._dk;
  let s = o[0],
    n = 1e9,
    i = 1e9,
    a = -1e9,
    r = -1e9;
  for (let f = 0; f < s.length; f += 2)
    ((n = Math.min(n, s[f])),
      (a = Math.max(a, s[f])),
      (i = Math.min(i, s[f + 1])),
      (r = Math.max(r, s[f + 1])));
  let l = 1e9,
    c = -1e9;
  for (let f of e.ys) ((l = Math.min(l, f)), (c = Math.max(c, f)));
  let h = new Set();
  if (t?.EH)
    for (let f = Math.floor(n / t.HC); f <= Math.floor(a / t.HC); f++)
      for (let u = Math.floor(i / t.HC); u <= Math.floor(r / t.HC); u++)
        for (let d of t.EH.get(t.hk(f, u)) || []) {
          let p = t.edges[Math.floor(d / 65536)],
            m = d % 65536;
          if (!p.elev || p.inner || p.tunnel || p.tunnelR || m + 1 >= p.n)
            continue;
          let g = p.P[m * 3 + 2],
            b = p.P[m * 3 + 5];
          Math.max(g, b) < l - 1 || Math.min(g, b) > c + 1 || h.add(p);
        }
  return (o._dk = [...h]);
}
function Jmt(o, t, e) {
  let { flat: s, ys: n, tris: i } = e,
    a = Ymt(o, t, e);
  if (!oz(o, t) && !a.length) return e;
  let r = {},
    l = (b, v, x) => {
      for (let y of a)
        if (
          (ys(y, b, v, r),
          r.d < r.w - 0.2 && r.s > y.s0 && r.s < y.s1 && Math.abs(r.y - x) < 1)
        )
          return !0;
      return !1;
    },
    c = (b, v, x) => Pp(t, b, v) || (a.length > 0 && l(b, v, x)),
    h = Array.from(s),
    f = Array.from(n),
    u = [],
    d = (b, v, x) => {
      let y = h[b * 2],
        M = h[b * 2 + 1],
        S = h[v * 2],
        w = h[v * 2 + 1],
        _ = h[x * 2],
        z = h[x * 2 + 1],
        A = (y + S + _) / 3,
        T = (M + w + z) / 3,
        E = (f[b] + f[v] + f[x]) / 3,
        R = c(A, T, E) ? 1 : 0;
      for (let [P, C, I] of [
        [y, M, f[b]],
        [S, w, f[v]],
        [_, z, f[x]],
      ])
        c((A + P) / 2, (T + C) / 2, (E + I) / 2) && R++;
      return R;
    },
    p = (b, v) => (
      h.push((h[b * 2] + h[v * 2]) / 2, (h[b * 2 + 1] + h[v * 2 + 1]) / 2),
      f.push((f[b] + f[v]) / 2),
      f.length - 1
    ),
    m = (b, v, x, y) => {
      let M = d(b, v, x);
      if (M === 4) return;
      if (M === 0 || y === 0) {
        M < 3 && u.push([b, v, x]);
        return;
      }
      let S = p(b, v),
        w = p(v, x),
        _ = p(x, b);
      (m(b, S, _, y - 1),
        m(S, v, w, y - 1),
        m(_, w, x, y - 1),
        m(S, w, _, y - 1));
    },
    g = (b, v) => Math.hypot(h[b * 2] - h[v * 2], h[b * 2 + 1] - h[v * 2 + 1]);
  for (let [b, v, x] of i)
    m(
      b,
      v,
      x,
      Math.min(
        4,
        Math.max(
          2,
          Math.ceil(Math.log2(Math.max(g(b, v), g(v, x), g(x, b)) / 2)),
        ),
      ),
    );
  return { flat: h, ys: f, tris: u };
}
