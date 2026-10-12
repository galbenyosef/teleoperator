// app 107 — math
// Lines 80675-81024 of readable/app.pretty.js (statement-aligned).
function l7(i, t, e = !1) {
  let s = i.tunnels?.filter((u) => !u.tn.open);
  if (!s?.length || !t || t.empty) return 0;
  let n = t.p.a,
    o = t.v,
    a = new Uint8Array(o),
    r = new Uint8Array(o),
    l = !1;
  for (let u of s) {
    if (u.noClip) continue;
    let d = (u.tn.shape === "box" ? au(u.tn) : Ic(u.tn) + Wl(u.tn)) + 0.3,
      p = u.W + lo + 0.3,
      m = Math.min(u.Ja.x, u.Jb.x) - p,
      g = Math.max(u.Ja.x, u.Jb.x) + p,
      b = Math.min(u.Ja.z, u.Jb.z) - p,
      x = Math.max(u.Ja.z, u.Jb.z) + p;
    for (let v = 0; v < o; v++) {
      let y = n[v * 3],
        M = n[v * 3 + 2];
      if (y < m || y > g || M < b || M > x) continue;
      let [S, w] = Ud(u, y, M);
      if (Math.abs(w) > p) continue;
      let z = n[v * 3 + 1];
      if (S > 0 && S < 10 && Math.abs(z - L0(u, 0)) < 0.35) {
        ((n[v * 3] -= u.ux * S), (n[v * 3 + 2] -= u.uz * S));
        continue;
      }
      if (S < u.L && S > u.L - 10 && Math.abs(z - L0(u, u.L)) < 0.35) {
        let _ = u.L - S;
        ((n[v * 3] += u.ux * _), (n[v * 3 + 2] += u.uz * _));
        continue;
      }
      if (S >= 1 && S <= u.L - 1) {
        let _ = L0(u, S);
        z > _ - 0.6 &&
          z < _ + d &&
          (e && S > Lc && S < u.L - Lc
            ? ((n[v * 3 + 1] = _ + d), (t.lifted = (t.lifted || 0) + 1))
            : ((a[v] = 1), (l = !0), S > Lc && S < u.L - Lc && (r[v] = 1)));
      } else if (
        e &&
        u.tn.portals &&
        ((S > -10 && S < 1) || (S > u.L - 1 && S < u.L + 10))
      ) {
        let _ = S < 1 ? 0 : 1,
          R = L0(u, _ ? u.L : 0);
        z > R - 0.6 && z < u.top[_] - 0.2 && ((a[v] = 1), (l = !0));
      }
    }
  }
  if (!l) return 0;
  let c = t.ix.a,
    h = 0,
    f = 0;
  for (let u = 0; u + 2 < t.ix.n; u += 3) {
    let d = c[u],
      p = c[u + 1],
      m = c[u + 2];
    if (a[d] || a[p] || a[m]) {
      (f++, (r[d] || r[p] || r[m]) && (t.cutMid = (t.cutMid || 0) + 1));
      continue;
    }
    ((c[h++] = d), (c[h++] = p), (c[h++] = m));
  }
  return ((t.ix.n = h), f);
}
function c7(i, t) {
  if (!t || t.t !== "poly") return t;
  let e = i.terrain,
    s = e?.tubeBox,
    n = t.bb;
  if (!s || n[2] < s[0] || n[0] > s[2] || n[3] < s[1] || n[1] > s[3]) return t;
  for (let o of i.tunnels || []) {
    if (o.tn.open || !o.box) continue;
    let a = o.box;
    if (n[2] < a[0] || n[0] > a[2] || n[3] < a[1] || n[1] > a[3]) continue;
    let r = Math.max(...o.bores.map((c) => Math.max(-c.v0, c.v1))) + 0.5,
      l = -1 / 0;
    for (let c = n[0]; c <= n[2] + 0.99; c += 1)
      for (let h = n[1]; h <= n[3] + 0.99; h += 1) {
        let f = Math.min(c, n[2]),
          u = Math.min(h, n[3]);
        if (!en(t.pts, f, u)) continue;
        let [d, p] = Gd(o, f, u);
        d < 0 || d > o.L || Math.abs(p) > r || (l = Math.max(l, L0(o, d)));
      }
    l > -1 / 0 && t.y0 < l + 2 && (t.y0 = l + 2);
  }
  return t;
}
function Lft(i) {
  if (i._bldBB) return i._bldBB;
  let t = i.bld,
    e = (i._bldBB = new Float64Array(t.n * 4));
  for (let s = 0; s < t.n; s++) {
    let n = t.bRing[s],
      o = t.rStart[n] * 2,
      a = t.rStart[n + 1] * 2,
      r = t.pts,
      l = 1e9,
      c = 1e9,
      h = -1e9,
      f = -1e9;
    for (let u = o; u < a; u += 2) {
      let d = r[u],
        p = r[u + 1];
      (d < l && (l = d), d > h && (h = d), p < c && (c = p), p > f && (f = p));
    }
    ((e[s * 4] = l),
      (e[s * 4 + 1] = c),
      (e[s * 4 + 2] = h),
      (e[s * 4 + 3] = f));
  }
  return e;
}
function $W(i, t) {
  let e = i.bld,
    s = 0;
  for (let n of i.tunnels || []) {
    if (!n.tn.portals) continue;
    let o = n.W + lo + 1,
      a = [];
    for (let [u, d] of [
      [-4, Lc],
      [n.L - Lc, n.L + 4],
    ])
      for (let p = u; p <= d; p += 2)
        for (let m = -o; m <= o; m += 2)
          a.push([
            n.Ja.x + n.ux * p - n.uz * m,
            n.Ja.z + n.uz * p + n.ux * m,
            p < n.L / 2 ? 0 : 1,
          ]);
    let r = 1e9,
      l = 1e9,
      c = -1e9,
      h = -1e9;
    for (let [u, d] of a)
      ((r = Math.min(r, u)),
        (c = Math.max(c, u)),
        (l = Math.min(l, d)),
        (h = Math.max(h, d)));
    let f = Lft(i);
    for (let u = 0; u < e.n; u++) {
      if (t.bSkip[u]) continue;
      let d = f[u * 4],
        p = f[u * 4 + 1],
        m = f[u * 4 + 2],
        g = f[u * 4 + 3];
      if (m < r || d > c || g < l || p > h) continue;
      let b = e.bRing[u],
        x = e.pts.subarray(e.rStart[b] * 2, e.rStart[b + 1] * 2);
      a.some(
        ([v, y, M]) =>
          v >= d &&
          v <= m &&
          y >= p &&
          y <= g &&
          e.bF[u * 3] < n.top[M] &&
          en(x, v, y),
      ) && ((t.bSkip[u] = 1), s++);
    }
  }
  {
    let n = i.props,
      o = i.terrain?.tubeBox,
      a = (i.tunnels || []).filter((l) => !l.tn.open).map((l) => l.box),
      r = 0;
    if (o)
      for (let l = 0; l < n.n; l++) {
        let c = n.pf[l * 5],
          h = n.pf[l * 5 + 1];
        c < o[0] - 40 ||
          c > o[2] + 40 ||
          h < o[1] - 40 ||
          h > o[3] + 40 ||
          t.pSkip[l] ||
          !a.some(
            (f) =>
              c > f[0] - 40 && c < f[2] + 40 && h > f[1] - 40 && h < f[3] + 40,
          ) ||
          (rb(i, n.pf[l * 5], n.pf[l * 5 + 1], n.pf[l * 5 + 2]) &&
            ((t.pSkip[l] = 1), r++));
      }
    t.list.push({ name: "tunnel bores", np: r });
  }
  {
    let n = i.props,
      o = i.edges.filter((l) => l.split),
      a = {},
      r = 0;
    for (let l of o) {
      let c = 1e9,
        h = -1e9,
        f = 1e9,
        u = -1e9;
      for (let d = 0; d < l.n; d++)
        ((c = Math.min(c, l.P[d * 3])),
          (h = Math.max(h, l.P[d * 3])),
          (f = Math.min(f, l.P[d * 3 + 1])),
          (u = Math.max(u, l.P[d * 3 + 1])));
      for (let d = 0; d < n.n; d++) {
        if (t.pSkip[d] || n.kinds[n.pk[d]] !== "car") continue;
        let p = n.pf[d * 5],
          m = n.pf[d * 5 + 1];
        p < c - 15 ||
          p > h + 15 ||
          m < f - 15 ||
          m > u + 15 ||
          (vs(l, p, m, a),
          a.s > 0.5 &&
            a.s < l.L - 0.5 &&
            a.d > a.w - 1.2 &&
            a.d < a.w + 6 &&
            Math.abs(n.pf[d * 5 + 2] - a.y) < 1.6 &&
            ((t.pSkip[d] = 1), r++));
      }
    }
    t.list.push({ name: "split-level approaches", np: r });
  }
  if (i.duboce) {
    let n = i.props,
      o = 0;
    for (let a = 0; a < n.n; a++)
      by(i, n.pf[a * 5], n.pf[a * 5 + 1], 2) && ((t.pSkip[a] = 1), o++);
    for (let a = 0; a < e.n; a++) {
      if (t.bSkip[a]) continue;
      let r = e.bRing[a],
        l = e.pts.subarray(e.rStart[r] * 2, e.rStart[r + 1] * 2);
      for (let c = 0; c < l.length; c += 2)
        if (by(i, l[c], l[c + 1], 8)) {
          ((t.bSkip[a] = 1), s++);
          break;
        }
    }
  }
  return (t.list.push({ name: "tunnel portals", nb: s }), s);
}
function rb(i, t, e, s) {
  let n = i.terrain;
  if (!n?.tubeBox) return !1;
  let o = n.tubeBox;
  if (t < o[0] - 40 || t > o[2] + 40 || e < o[1] - 40 || e > o[3] + 40)
    return !1;
  for (let a of i.tunnels || []) {
    if (a.tn.open) continue;
    let r = a.box;
    if (t < r[0] - 40 || t > r[2] + 40 || e < r[1] - 40 || e > r[3] + 40)
      continue;
    let [l, c] = Gd(a, t, e),
      h = Math.max(...a.bores.map((p) => Math.max(-p.v0, p.v1)));
    if (l >= -1 && l <= a.L + 1) {
      if (
        Math.abs(c) < h + 4 &&
        s < L0(a, Math.max(0, Math.min(a.L, l))) + a.roof + 0.3
      )
        return !0;
      continue;
    }
    if (a.tn.portals !== "hood") continue;
    let f = l < 0 ? 0 : 1,
      u = f ? l - a.L : -l,
      d = a.hw?.[f]?.[c < 0 ? 0 : 1] ?? a.W + 6;
    if (u < 30 && Math.abs(c) < d && s < L0(a, f ? a.L : 0) + 3) return !0;
  }
  return !1;
}
function h7(i, t, e, s) {
  for (let n of i.tunnels || []) {
    if (n.tn.open) continue;
    let o = n.W + 20 + s;
    if (
      t > Math.min(n.Ja.x, n.Jb.x) - o &&
      t < Math.max(n.Ja.x, n.Jb.x) + o &&
      e > Math.min(n.Ja.z, n.Jb.z) - o &&
      e < Math.max(n.Ja.z, n.Jb.z) + o
    )
      return !0;
  }
  return !1;
}
var f7 = [
    [-2811.4, 2809.7, -2821.1, 2817.6, -2841.2, 2830.6, -2851.5, 2838.8],
    [-3064.1, 2881.6, -3056.1, 2880.2, -3047.4, 2877.4, -3042, 2876.6],
    [-2960.8, 2880.4, -2928.5, 2879, -2915.8, 2879, -2902.5, 2878.1],
    [
      -2876.8, 2863.6, -2881.6, 2867.9, -2885.7, 2870.5, -2895.7, 2873.9,
      -2900.8, 2874.5, -2907.3, 2874, -2923.1, 2869.2, -2935.2, 2868.4, -3076.3,
      2879.2, -3082.8, 2880.2, -3086.1, 2881.4, -3098.9, 2888.5, -3104.1,
      2890.5, -3109.9, 2891.7,
    ],
    [
      -3105.3, 2895.2, -3100, 2894.4, -3095.9, 2893.1, -3078.5, 2883.8, -3074.5,
      2882.7, -3064.1, 2881.6, -2935.6, 2872, -2925.7, 2872.8, -2910.7, 2877.2,
      -2902.5, 2878.1,
    ],
    [
      -2349, 2340.9, -2365, 2356.2, -2388.7, 2376.2, -2396.8, 2383.8, -2495.6,
      2482.6, -2534.7, 2519.4, -2595.1, 2580.1, -2603.3, 2588.7, -2613.4,
      2600.8, -2643.4, 2631.9, -2875.3, 2862.1, -3114.9, 3101.6, -3132.5, 3120,
      -3409.9, 3396, -3419.3, 3406.4, -3431.5, 3421.4, -3474.3, 3465, -3479.9,
      3471.6, -3483.5, 3476.9, -3485.7, 3482.6, -3487.2, 3490.6, -3487.5,
      3501.4, -3476.7, 3638.6, -3476.9, 3642.6, -3477.9, 3646.2, -3480.2,
      3649.1, -3482.9, 3651.4, -3486.9, 3653.2, -3490.7, 3653.9,
    ],
    [
      -3638.4, 3667.9, -3642.8, 3667.7, -3647.6, 3665.4, -3650.5, 3662.7,
      -3652.9, 3658.2, -3653.5, 3653.3, -3652.4, 3648.6, -3649.4, 3643.9,
      -3646.1, 3640.1, -3615.4, 3610.6, -3509.1, 3505.2, -3485.7, 3482.6,
      -3315.4, 3311.6, -3302.8, 3300.1, -3234.8, 3231.7, -3132.6, 3130.5,
      -3107.8, 3104.9, -3085.6, 3083.6, -3025.4, 3021.2, -2774.1, 2772.6,
      -2640.1, 2638.9, -2626.4, 2623.9, -2588.5, 2591.2, -2561.8, 2565.1,
      -2388.4, 2391, -2377, 2377.9, -2361.9, 2359.2, -2354.7, 2351.5, -2290.6,
      2288.2,
    ],
    [-2902.5, 2878.1, -2881.7, 2875.8, -2878.8, 2874.6, -2871.4, 2869],
    [-3105.4, 3624.1, -3490.7, 3653.9],
    [
      -3105.5, 3627.3, -3098.6, 3627.2, -3094.7, 3627.9, -3088.2, 3631.5,
      -3085.9, 3634, -3084.1, 3637.2, -3081.8, 3649.8,
    ],
    [
      -3477.8, 3624.1, -3474.2, 3642, -3472.8, 3645.8, -3470.7, 3649.4, -3468.2,
      3651.9, -3465.3, 3653.3, -3461.7, 3654.3, -3457.1, 3654.5,
    ],
    [
      -3085.5, 3600.6, -3086.2, 3610.5, -3087.3, 3613.5, -3089.4, 3616.9,
      -3091.8, 3619.3, -3095.1, 3621.1, -3098.8, 3622.6, -3105.4, 3624.1,
    ],
    [
      -3105.5, 3627.3, -3094.2, 3625.6, -3088, 3622.4, -3086, 3620.5, -3082.7,
      3615, -3081.7, 3611.1, -3081.6, 3606.9,
    ],
    [
      -3078.9, 3642.5, -3080, 3634.9, -3081.1, 3632.2, -3085.3, 3626.8, -3090.5,
      3623.8, -3096.7, 3623.5, -3105.4, 3624.1,
    ],
    [-3594.4, 3664.5, -3575.7, 3664, -3457.1, 3654.5],
    [-3457.1, 3654.5, -3105.5, 3627.3],
    [-3569.5, 3660.1, -3588.4, 3663.9, -3594.4, 3664.5],
    [
      -3117.7, 3133.1, -3117.1, 3122, -3116.3, 3118.8, -3113.9, 3113.1, -3107.8,
      3104.9,
    ],
    [-3594.4, 3664.5, -3619.1, 3666.4],
    [-3490.7, 3653.9, -3569.5, 3660.1],
    [-3634.7, 3667.7, -3638.4, 3667.9],
    [-3619.1, 3666.4, -3634.7, 3667.7],
  ],
  xy = null;
