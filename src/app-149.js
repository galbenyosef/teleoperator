// app 149 — math
// Lines 94501-94676 of readable/app.pretty.js (statement-aligned).
function x$(o, t) {
  if (o.deckGroundConformed !== void 0) return;
  let e = new Set(),
    s = (l, c, h, f) => {
      for (let u = Math.floor(l / 256); u <= Math.floor(h / 256); u++)
        for (let d = Math.floor(c / 256); d <= Math.floor(f / 256); d++)
          e.add(`${u},${d}`);
    };
  for (let l of new Set([
    ...(o.embank || []),
    ...(o.dropped || []),
    ...o.edges.filter((c) => c.groundBridge || (c.hwy && !c.layered)),
  ]))
    if (!l.region)
      for (let c = 0; c < l.n; c++) {
        let h = l.P[c * 3],
          f = l.P[c * 3 + 1],
          u = l.W[c] + (l.sw || 0) + 12;
        s(h - u, f - u, h + u, f + u);
      }
  let n = (l, c, h, f) => {
      for (let u = Math.floor(l / 256); u <= Math.floor(h / 256); u++)
        for (let d = Math.floor(c / 256); d <= Math.floor(f / 256); d++)
          if (e.has(`${u},${d}`)) return !0;
      return !1;
    },
    i = o.edges.filter((l) => {
      for (let c = 0; c < l.n; c++) {
        let h = l.W[c] + (l.sw || 0) + 4;
        if (
          n(
            l.P[c * 3] - h,
            l.P[c * 3 + 1] - h,
            l.P[c * 3] + h,
            l.P[c * 3 + 1] + h,
          )
        )
          return !0;
      }
      return !1;
    }),
    a = o.juns.filter((l) => n(...l.bb)),
    r = new Map(
      [...o.walks].map(([l, c]) => [
        l,
        c.filter((h) => {
          let f = h[0],
            u = 1 / 0,
            d = 1 / 0,
            p = -1 / 0,
            m = -1 / 0;
          for (let g = 0; g < f.length; g += 2)
            ((u = Math.min(u, f[g])),
              (d = Math.min(d, f[g + 1])),
              (p = Math.max(p, f[g])),
              (m = Math.max(m, f[g + 1])));
          return n(u, d, p, m);
        }),
      ]),
    );
  o.deckGroundConformed = umt(
    { ...o, edges: i, juns: a, walks: r },
    o.terrain,
    t,
  );
}
var Rw = (o) =>
    !o.inner &&
    !o.custom &&
    !o.tunnel &&
    !o.tunnelR &&
    o.n >= 2 &&
    (o.hwy ||
      /^(Presidio Parkway|Veterans Boulevard|Central Freeway|Octavia Boulevard)$/.test(
        o.name || "",
      )),
  v$ = (o) => o.elev && Rw(o),
  SC = 3,
  kC = 2.5,
  Ep = 5.2,
  dmt = 3,
  pmt = 4.5,
  MC = 0.1,
  Yk = 0.085;
function Tp(o, t) {
  let e = o.P,
    s = o.W,
    n = o.n,
    i = [],
    a = [];
  for (
    let f = 0;
    f < n &&
    (i.push(e[f * 3], e[f * 3 + 1], e[f * 3 + 2]), a.push(s[f]), !(f + 1 >= n));
    f++
  ) {
    let u = o.S[f + 1] - o.S[f],
      d = Math.ceil(u / t);
    for (let p = 1; p < d; p++) {
      let m = p / d;
      (i.push(
        e[f * 3] + (e[f * 3 + 3] - e[f * 3]) * m,
        e[f * 3 + 1] + (e[f * 3 + 4] - e[f * 3 + 1]) * m,
        e[f * 3 + 2] + (e[f * 3 + 5] - e[f * 3 + 2]) * m,
      ),
        a.push(s[f] + (s[f + 1] - s[f]) * m));
    }
  }
  if (i.length / 3 === n) return;
  let r = o.s0,
    l = o.s1,
    c = o.L;
  ((o.P = new Float32Array(i)),
    (o.W = new Float32Array(a)),
    Tr(o),
    (o._gb = null));
  let h = o.L / c;
  ((o.s0 = r * h),
    (o.s1 = o.L - (c - l) * h),
    (o.ta = o.s0),
    (o.tb = o.L - o.s1));
}
var $u = (o) => (o <= 0 ? 0 : o >= 1 ? 1 : o * o * (3 - 2 * o));
function mmt(o) {
  let t = o.P,
    e = o.W,
    s = o.n;
  if (s < 3) return;
  let n = [0];
  for (let f = 1; f < s - 1; f++) {
    let u = n[n.length - 1],
      d = f + 1,
      p = t[u * 3],
      m = t[u * 3 + 1],
      g = t[u * 3 + 2],
      b = t[d * 3],
      v = t[d * 3 + 1],
      x = t[d * 3 + 2],
      y = b - p,
      M = v - m,
      S = y * y + M * M,
      w = S > 1e-6 && Math.sqrt(S) < 12;
    for (let _ = u + 1; _ < d && w; _++) {
      let z = ((t[_ * 3] - p) * y + (t[_ * 3 + 1] - m) * M) / S;
      if (z <= 0 || z >= 1) {
        w = !1;
        break;
      }
      let A = p + y * z - t[_ * 3],
        T = m + M * z - t[_ * 3 + 1];
      (A * A + T * T > 0.02 * 0.02 ||
        Math.abs(g + (x - g) * z - t[_ * 3 + 2]) > 0.01 ||
        Math.abs(e[u] + (e[d] - e[u]) * z - e[_]) > 0.02) &&
        (w = !1);
    }
    w || n.push(f);
  }
  if ((n.push(s - 1), n.length === s)) return;
  let i = new Float32Array(n.length * 3),
    a = new Float32Array(n.length);
  n.forEach((f, u) => {
    ((i[u * 3] = t[f * 3]),
      (i[u * 3 + 1] = t[f * 3 + 1]),
      (i[u * 3 + 2] = t[f * 3 + 2]),
      (a[u] = e[f]));
  });
  let r = o.s0,
    l = o.s1,
    c = o.L;
  ((o.P = i), (o.W = a), Tr(o), (o._gb = null));
  let h = o.L / c;
  ((o.s0 = r * h),
    (o.s1 = o.L - (c - l) * h),
    (o.ta = o.s0),
    (o.tb = o.L - o.s1));
}
