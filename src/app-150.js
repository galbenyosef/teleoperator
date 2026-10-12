// app 150 — math
// Lines 94231-94406 of readable/app.pretty.js (statement-aligned).
function gj(i, t) {
  if (i.deckGroundConformed !== void 0) return;
  let e = new Set(),
    s = (l, c, h, f) => {
      for (let u = Math.floor(l / 256); u <= Math.floor(h / 256); u++)
        for (let d = Math.floor(c / 256); d <= Math.floor(f / 256); d++)
          e.add(`${u},${d}`);
    };
  for (let l of new Set([
    ...(i.embank || []),
    ...(i.dropped || []),
    ...i.edges.filter((c) => c.groundBridge || (c.hwy && !c.layered)),
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
    o = i.edges.filter((l) => {
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
    a = i.juns.filter((l) => n(...l.bb)),
    r = new Map(
      [...i.walks].map(([l, c]) => [
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
  i.deckGroundConformed = qut(
    { ...i, edges: o, juns: a, walks: r },
    i.terrain,
    t,
  );
}
var Fy = (i) =>
    !i.inner &&
    !i.custom &&
    !i.tunnel &&
    !i.tunnelR &&
    i.n >= 2 &&
    (i.hwy ||
      /^(Presidio Parkway|Veterans Boulevard|Central Freeway|Octavia Boulevard)$/.test(
        i.name || "",
      )),
  bj = (i) => i.elev && Fy(i),
  V7 = 3,
  $7 = 2.5,
  Kd = 5.2,
  jut = 3,
  Vut = 4.5,
  j7 = 0.1,
  YS = 0.085;
function Yd(i, t) {
  let e = i.P,
    s = i.W,
    n = i.n,
    o = [],
    a = [];
  for (
    let f = 0;
    f < n &&
    (o.push(e[f * 3], e[f * 3 + 1], e[f * 3 + 2]), a.push(s[f]), !(f + 1 >= n));
    f++
  ) {
    let u = i.S[f + 1] - i.S[f],
      d = Math.ceil(u / t);
    for (let p = 1; p < d; p++) {
      let m = p / d;
      (o.push(
        e[f * 3] + (e[f * 3 + 3] - e[f * 3]) * m,
        e[f * 3 + 1] + (e[f * 3 + 4] - e[f * 3 + 1]) * m,
        e[f * 3 + 2] + (e[f * 3 + 5] - e[f * 3 + 2]) * m,
      ),
        a.push(s[f] + (s[f + 1] - s[f]) * m));
    }
  }
  if (o.length / 3 === n) return;
  let r = i.s0,
    l = i.s1,
    c = i.L;
  ((i.P = new Float32Array(o)),
    (i.W = new Float32Array(a)),
    dr(i),
    (i._gb = null));
  let h = i.L / c;
  ((i.s0 = r * h),
    (i.s1 = i.L - (c - l) * h),
    (i.ta = i.s0),
    (i.tb = i.L - i.s1));
}
var fu = (i) => (i <= 0 ? 0 : i >= 1 ? 1 : i * i * (3 - 2 * i));
function $ut(i) {
  let t = i.P,
    e = i.W,
    s = i.n;
  if (s < 3) return;
  let n = [0];
  for (let f = 1; f < s - 1; f++) {
    let u = n[n.length - 1],
      d = f + 1,
      p = t[u * 3],
      m = t[u * 3 + 1],
      g = t[u * 3 + 2],
      b = t[d * 3],
      x = t[d * 3 + 1],
      v = t[d * 3 + 2],
      y = b - p,
      M = x - m,
      S = y * y + M * M,
      w = S > 1e-6 && Math.sqrt(S) < 12;
    for (let z = u + 1; z < d && w; z++) {
      let _ = ((t[z * 3] - p) * y + (t[z * 3 + 1] - m) * M) / S;
      if (_ <= 0 || _ >= 1) {
        w = !1;
        break;
      }
      let R = p + y * _ - t[z * 3],
        T = m + M * _ - t[z * 3 + 1];
      (R * R + T * T > 0.02 * 0.02 ||
        Math.abs(g + (v - g) * _ - t[z * 3 + 2]) > 0.01 ||
        Math.abs(e[u] + (e[d] - e[u]) * _ - e[z]) > 0.02) &&
        (w = !1);
    }
    w || n.push(f);
  }
  if ((n.push(s - 1), n.length === s)) return;
  let o = new Float32Array(n.length * 3),
    a = new Float32Array(n.length);
  n.forEach((f, u) => {
    ((o[u * 3] = t[f * 3]),
      (o[u * 3 + 1] = t[f * 3 + 1]),
      (o[u * 3 + 2] = t[f * 3 + 2]),
      (a[u] = e[f]));
  });
  let r = i.s0,
    l = i.s1,
    c = i.L;
  ((i.P = o), (i.W = a), dr(i), (i._gb = null));
  let h = i.L / c;
  ((i.s0 = r * h),
    (i.s1 = i.L - (c - l) * h),
    (i.ta = i.s0),
    (i.tb = i.L - i.s1));
}
