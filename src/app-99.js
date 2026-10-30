// app 99 — math
// Lines 78757-79092 of readable/app.pretty.js (statement-aligned).
function Vq(o) {
  let t = [],
    e = o.terrain;
  for (let s of Hpt) {
    let n = Bq(o, s.a[0], s.a[1], 6),
      i = Bq(o, s.b[0], s.b[1], 6);
    if (!n || !i || n === i) {
      console.warn("tunnels: ends not found", s.key);
      continue;
    }
    let a = (C) =>
        o.edges.find((I) => (I.ja === C.id || I.jb === C.id) && !I.synthetic),
      r = a(n),
      l = a(i),
      c = (C, I) => (C ? C.W[C.ja === I.id ? 0 : C.n - 1] : 5);
    for (let [C, I] of [
      [r, n],
      [l, i],
    ])
      C &&
        (C.ja === I.id ? ((C.ta = 0), (C.s0 = 0)) : ((C.tb = 0), (C.s1 = C.L)));
    for (let C of [r, l]) C && (Vpt(o, C), s.open || Wpt(o, C));
    let h = [[n.x, n.z], ...(s.mid || []), [i.x, i.z]],
      f = [0];
    for (let C = 1; C < h.length; C++)
      f.push(
        f[C - 1] + Math.hypot(h[C][0] - h[C - 1][0], h[C][1] - h[C - 1][1]),
      );
    let u = f[f.length - 1],
      d = [],
      p = [],
      m = [],
      g = c(r, n),
      b = c(l, i);
    for (let C = 0; C + 1 < h.length; C++) {
      let I = Math.max(1, Math.ceil((f[C + 1] - f[C]) / 6));
      for (let L = 0; L < I; L++) {
        let F = L / I,
          O = f[C] + (f[C + 1] - f[C]) * F;
        (d.push([
          h[C][0] + (h[C + 1][0] - h[C][0]) * F,
          h[C][1] + (h[C + 1][1] - h[C][1]) * F,
        ]),
          p.push(O));
      }
    }
    (d.push(h[h.length - 1]), p.push(u));
    let v = d.length,
      x = new Float32Array(v * 3),
      y = new Float32Array(v),
      M = (r || l)?.lanes ?? 2,
      S = s.open
        ? null
        : Math.min(
            Math.max(g, b),
            Math.max(1, M) * 3.4 * ((r || l)?.oneway ? 0.5 : 1) +
              (s.twin ? 1.6 : 0.3),
          ),
      w = (C, I) => (C ? C.P[(C.ja === I.id ? 0 : C.n - 1) * 3 + 2] : I.y),
      _ = w(r, n),
      z = w(l, i);
    if (
      (d.forEach((C, I) => {
        let L = p[I] / u;
        ((x[I * 3] = C[0]),
          (x[I * 3 + 1] = C[1]),
          (x[I * 3 + 2] = _ + (z - _) * L),
          (y[I] =
            S === null
              ? g + (b - g) * L
              : S +
                (g - S) * Math.max(0, 1 - p[I] / 12) +
                (b - S) * Math.max(0, 1 - (u - p[I]) / 12)));
      }),
      !s.open)
    ) {
      let C = Ok(s) + 0.4,
        I = (S ?? Math.max(g, b)) + wo + 0.5,
        L = {},
        F = [],
        O = (i.x - n.x) / u,
        B = (i.z - n.z) / u,
        H = (o._edgeBox ||= o.edges.map((N) => {
          let D = 1e9,
            U = -1e9,
            G = 1e9,
            W = -1e9;
          for (let V = 0; V < N.n; V++)
            ((D = Math.min(D, N.P[V * 3])),
              (U = Math.max(U, N.P[V * 3])),
              (G = Math.min(G, N.P[V * 3 + 1])),
              (W = Math.max(W, N.P[V * 3 + 1])));
          return [D, U, G, W];
        }));
      for (let N of o.edges) {
        if (N.layered || N.inner || N.synthetic || N === r || N === l) continue;
        let [D, U, G, W] = H[N.id] || [1e9, -1e9, 1e9, -1e9];
        if (!(
          U < Math.min(n.x, i.x) - 20 ||
          D > Math.max(n.x, i.x) + 20 ||
          W < Math.min(n.z, i.z) - 20 ||
          G > Math.max(n.z, i.z) + 20
        ))
          for (let V = 0; V <= N.L; V += 2) {
            Ot(N, V, L);
            for (let $ = -1; $ <= 1; $ += 0.5) {
              let J = L.x + L.nx * L.w * $,
                X = L.z + L.nz * L.w * $,
                tt = J - n.x,
                Z = X - n.z,
                q = tt * O + Z * B,
                j = -tt * B + Z * O;
              q > 4 &&
                q < u - 4 &&
                Math.abs(j) < I + 2 &&
                F.push([q, L.y - C, N.name || N.cls, N.id]);
            }
          }
      }
      if (globalThis.SF_TUNDBG) {
        let N = {};
        for (let D of F) {
          let U = D[2] + "#" + D[3];
          N[U] = N[U]
            ? [
                Math.min(N[U][0], D[0]),
                Math.max(N[U][1], D[0]),
                Math.min(N[U][2], D[1]),
              ]
            : [D[0], D[0], D[1]];
        }
        console.log("tunnel caps", s.key, JSON.stringify(N));
      }
      for (let N = 0; N < v; N++) {
        let D = x[N * 3 + 2];
        for (let [U, G] of F) D = Math.min(D, G + 0.09 * Math.abs(p[N] - U));
        x[N * 3 + 2] = Math.max(D, _ - 0.09 * p[N], z - 0.09 * (u - p[N]));
      }
    }
    let A = Tr({ id: o.edges.length, P: x, W: y }),
      T = r || l;
    (Object.assign(A, {
      ta: 0,
      tb: 0,
      sw: 0,
      laneW: T?.laneW ?? 3.3,
      maxspeed: T?.maxspeed ?? 15,
      ja: n.id,
      jb: i.id,
      name: s.name,
      way: 0,
      dist: T?.dist ?? "",
      rank: T?.rank ?? 5,
      lanes: T?.lanes ?? 2,
      flags: (T ? T.flags & 8 : 0) | (s.oneway ? 8 : 0) | 1 | 2 | 4,
      cls: T?.cls ?? "primary",
      median: s.twin ? 1 : 0,
      trolley: !1,
      stops: 0,
      layer: -1,
      elev: !1,
      inner: !1,
      sunk: !0,
      layered: !0,
      hwy: !1,
      synthetic: !0,
      tunnel: s.key,
      tcode: 0,
    }),
      (A.oneway = !!(A.flags & 8)),
      (A.s0 = 0),
      (A.s1 = A.L),
      o.edges.push(A),
      s.key === "broadway" && (r && Nq(o, A, 0, r, n), l && Nq(o, A, 1, l, i)));
    for (let C of [n, i]) C.type === "end" && (C.type = "j");
    let E = (i.x - n.x) / u,
      R = (i.z - n.z) / u,
      P = {
        tn: s,
        E: A,
        Ja: n,
        Jb: i,
        L: A.L,
        ux: E,
        uz: R,
        W: S ?? A.W[0],
        roof: Ok(s),
      };
    ((A.tunnelR = P),
      (P.bores = s.open
        ? []
        : s.twin
          ? [
              { v0: 0.6, v1: P.W + wo },
              { v0: -P.W - wo, v1: -0.6 },
            ]
          : [{ v0: s.left ? -s.left : -P.W - wo, v1: P.W + wo }]),
      s.open || Dq(o, P),
      t.push(P));
  }
  for (let s of o.highways?.presidio || []) {
    let n = s.tunnel === "n1" ? [30, 0] : s.tunnel === "s2" ? [0, 30] : [0, 0],
      i = {},
      a = [],
      r = [];
    for (
      let m = n[0];
      Ot(s, m, i), a.push(i.x, i.z, i.y), r.push(i.w), !(m >= s.L - n[1]);
      m = Math.min(m + 6, s.L - n[1])
    );
    let l = Tr({ id: -1, P: new Float32Array(a), W: new Float32Array(r) });
    ((l.s0 = 0), (l.s1 = l.L));
    let c = { x: l.P[0], z: l.P[1], y: l.P[2] },
      h = {
        x: l.P[(l.n - 1) * 3],
        z: l.P[(l.n - 1) * 3 + 1],
        y: l.P[(l.n - 1) * 3 + 2],
      },
      f = l.L,
      u = Math.max(...s.W),
      d = Math.hypot(h.x - c.x, h.z - c.z),
      p = {
        tn: Hq,
        E: l,
        Ja: c,
        Jb: h,
        L: f,
        ux: (h.x - c.x) / d,
        uz: (h.z - c.z) / d,
        W: u,
        roof: Ok(Hq),
        noClip: !0,
      };
    ((p.bores = [{ v0: -u - wo, v1: u + wo }]),
      (s.tunnelR = p),
      Dq(o, p),
      t.push(p));
  }
  return ((o.tunnels = t), $q(o), Iq(o), $pt(o), qpt(o), t);
}
var Hq = {
    key: "presidio",
    name: "Presidio Parkway",
    twin: !1,
    shape: "box",
    box: 6.4,
    col: [0.74, 0.64, 0.44],
    glow: [1, 0.78, 0.45],
    portals: "hood",
    lampRows: [-0.45, 0.45],
    lampStep: 4,
  },
  yp = (o, t, e) => {
    let s = t - o.Ja.x,
      n = e - o.Ja.z;
    return [s * o.ux + n * o.uz, s * -o.uz + n * o.ux];
  },
  $b = {};
function wp(o, t, e) {
  let s = o.E;
  if ((ys(s, t, e, $b), $b.s > 0.01 && $b.s < s.L - 0.01)) return [$b.s, $b.v];
  let n = $b.s >= s.L - 0.01,
    i = n ? s.n - 2 : 0,
    a = s.D[i * 2],
    r = s.D[i * 2 + 1],
    l = s.P[(n ? s.n - 1 : 0) * 3],
    c = s.P[(n ? s.n - 1 : 0) * 3 + 1];
  return [
    (n ? s.L : 0) + (t - l) * a + (e - c) * r,
    (t - l) * -r + (e - c) * a,
  ];
}
function rh(o, t, e) {
  if (!o.lim) return t;
  let s = Math.min(o.lim[0].length - 1, Math.max(0, Math.round(e / 2)));
  return {
    v0: t.v0 < -0.7 ? Math.max(t.v0, -o.lim[0][s]) : t.v0,
    v1: t.v1 > 0.7 ? Math.min(t.v1, o.lim[1][s]) : t.v1,
  };
}
function hw(o, t, e, s, n = 0.05) {
  if (o.tn.open) return !1;
  let [i, a] = wp(o, t, s);
  if (i < 0.5 || i > o.L - 0.5) return !1;
  let r = sl(o, i);
  if (e < r - 0.06 + n) return !1;
  for (let l of o.bores) {
    let c = rh(o, l, i);
    if (a < c.v0 + n || a > c.v1 - n) continue;
    if (o.tn.shape === "box") return e < r + Gu(o.tn) - n;
    let h = (c.v0 + c.v1) / 2,
      f = (c.v1 - c.v0) / 2,
      u = (a - h) / f;
    return e < r + ch(o.tn) + hc(o.tn) * Math.sqrt(Math.max(0, 1 - u * u)) - n;
  }
  return !1;
}
var sl = (o, t) => {
    let e = o.E,
      s = Math.min(e.L, Math.max(0, t)),
      n = 0;
    for (; n + 2 < e.n && e.S[n + 1] < s;) n++;
    let i = e.S[n],
      a = e.S[n + 1],
      r = a > i ? (s - i) / (a - i) : 0;
    return e.P[n * 3 + 2] + (e.P[n * 3 + 5] - e.P[n * 3 + 2]) * r;
  },
  OP = (o) => (o.tn.shape === "box" ? Gu(o.tn) : ch(o.tn) + hc(o.tn)),
  Xb = {};
function Wq(o, t, e, s, n = null) {
  if (!o?.tubes || !o.inTube?.(t, e)) return null;
  for (let i of o.tubes) {
    if (i.tn.open) continue;
    let a = i.box;
    if (a && (t < a[0] || t > a[2] || e < a[1] || e > a[3])) continue;
    let [r, l] = wp(i, t, e);
    if (r < 0 || r > i.L) continue;
    ys(i.E, t, e, Xb);
    let c = Xb.y;
    if (!(s < c - 1.5 || s > c + OP(i) - 0.3))
      for (let h of i.bores) {
        let f = rh(i, h, r);
        if (l < f.v0 - 0.05 || l > f.v1 + 0.05) continue;
        let u = h.v0 + wo,
          d = h.v1 - wo,
          p =
            (l < u && !(Math.abs((f.v0 + u) / 2) < 1.5 || u - f.v0 < 0.2)) ||
            (l > d && !(Math.abs((d + f.v1) / 2) < 1.5 || f.v1 - d < 0.2));
        return (
          n && ((n.dx = Xb.gy * Xb.dx), (n.dz = Xb.gy * Xb.dz)),
          c + (p ? 0.25 : 0)
        );
      }
  }
  return null;
}
