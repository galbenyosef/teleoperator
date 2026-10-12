// app 100 — math
// Lines 78521-78856 of readable/app.pretty.js (statement-aligned).
function UW(i) {
  let t = [],
    e = i.terrain;
  for (let s of bft) {
    let n = FW(i, s.a[0], s.a[1], 6),
      o = FW(i, s.b[0], s.b[1], 6);
    if (!n || !o || n === o) {
      console.warn("tunnels: ends not found", s.key);
      continue;
    }
    let a = (P) =>
        i.edges.find((I) => (I.ja === P.id || I.jb === P.id) && !I.synthetic),
      r = a(n),
      l = a(o),
      c = (P, I) => (P ? P.W[P.ja === I.id ? 0 : P.n - 1] : 5);
    for (let [P, I] of [
      [r, n],
      [l, o],
    ])
      P &&
        (P.ja === I.id ? ((P.ta = 0), (P.s0 = 0)) : ((P.tb = 0), (P.s1 = P.L)));
    for (let P of [r, l]) P && (wft(i, P), s.open || Mft(i, P));
    let h = [[n.x, n.z], ...(s.mid || []), [o.x, o.z]],
      f = [0];
    for (let P = 1; P < h.length; P++)
      f.push(
        f[P - 1] + Math.hypot(h[P][0] - h[P - 1][0], h[P][1] - h[P - 1][1]),
      );
    let u = f[f.length - 1],
      d = [],
      p = [],
      m = [],
      g = c(r, n),
      b = c(l, o);
    for (let P = 0; P + 1 < h.length; P++) {
      let I = Math.max(1, Math.ceil((f[P + 1] - f[P]) / 6));
      for (let L = 0; L < I; L++) {
        let F = L / I,
          N = f[P] + (f[P + 1] - f[P]) * F;
        (d.push([
          h[P][0] + (h[P + 1][0] - h[P][0]) * F,
          h[P][1] + (h[P + 1][1] - h[P][1]) * F,
        ]),
          p.push(N));
      }
    }
    (d.push(h[h.length - 1]), p.push(u));
    let x = d.length,
      v = new Float32Array(x * 3),
      y = new Float32Array(x),
      M = (r || l)?.lanes ?? 2,
      S = s.open
        ? null
        : Math.min(
            Math.max(g, b),
            Math.max(1, M) * 3.4 * ((r || l)?.oneway ? 0.5 : 1) +
              (s.twin ? 1.6 : 0.3),
          ),
      w = (P, I) => (P ? P.P[(P.ja === I.id ? 0 : P.n - 1) * 3 + 2] : I.y),
      z = w(r, n),
      _ = w(l, o);
    if (
      (d.forEach((P, I) => {
        let L = p[I] / u;
        ((v[I * 3] = P[0]),
          (v[I * 3 + 1] = P[1]),
          (v[I * 3 + 2] = z + (_ - z) * L),
          (y[I] =
            S === null
              ? g + (b - g) * L
              : S +
                (g - S) * Math.max(0, 1 - p[I] / 12) +
                (b - S) * Math.max(0, 1 - (u - p[I]) / 12)));
      }),
      !s.open)
    ) {
      let P = FS(s) + 0.4,
        I = (S ?? Math.max(g, b)) + lo + 0.5,
        L = {},
        F = [],
        N = (o.x - n.x) / u,
        B = (o.z - n.z) / u,
        H = (i._edgeBox ||= i.edges.map((O) => {
          let D = 1e9,
            U = -1e9,
            G = 1e9,
            q = -1e9;
          for (let W = 0; W < O.n; W++)
            ((D = Math.min(D, O.P[W * 3])),
              (U = Math.max(U, O.P[W * 3])),
              (G = Math.min(G, O.P[W * 3 + 1])),
              (q = Math.max(q, O.P[W * 3 + 1])));
          return [D, U, G, q];
        }));
      for (let O of i.edges) {
        if (O.layered || O.inner || O.synthetic || O === r || O === l) continue;
        let [D, U, G, q] = H[O.id] || [1e9, -1e9, 1e9, -1e9];
        if (!(
          U < Math.min(n.x, o.x) - 20 ||
          D > Math.max(n.x, o.x) + 20 ||
          q < Math.min(n.z, o.z) - 20 ||
          G > Math.max(n.z, o.z) + 20
        ))
          for (let W = 0; W <= O.L; W += 2) {
            Ot(O, W, L);
            for (let V = -1; V <= 1; V += 0.5) {
              let Y = L.x + L.nx * L.w * V,
                $ = L.z + L.nz * L.w * V,
                st = Y - n.x,
                Q = $ - n.z,
                j = st * N + Q * B,
                X = -st * B + Q * N;
              j > 4 &&
                j < u - 4 &&
                Math.abs(X) < I + 2 &&
                F.push([j, L.y - P, O.name || O.cls, O.id]);
            }
          }
      }
      if (globalThis.SF_TUNDBG) {
        let O = {};
        for (let D of F) {
          let U = D[2] + "#" + D[3];
          O[U] = O[U]
            ? [
                Math.min(O[U][0], D[0]),
                Math.max(O[U][1], D[0]),
                Math.min(O[U][2], D[1]),
              ]
            : [D[0], D[0], D[1]];
        }
        console.log("tunnel caps", s.key, JSON.stringify(O));
      }
      for (let O = 0; O < x; O++) {
        let D = v[O * 3 + 2];
        for (let [U, G] of F) D = Math.min(D, G + 0.09 * Math.abs(p[O] - U));
        v[O * 3 + 2] = Math.max(D, z - 0.09 * p[O], _ - 0.09 * (u - p[O]));
      }
    }
    let R = dr({ id: i.edges.length, P: v, W: y }),
      T = r || l;
    (Object.assign(R, {
      ta: 0,
      tb: 0,
      sw: 0,
      laneW: T?.laneW ?? 3.3,
      maxspeed: T?.maxspeed ?? 15,
      ja: n.id,
      jb: o.id,
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
      (R.oneway = !!(R.flags & 8)),
      (R.s0 = 0),
      (R.s1 = R.L),
      i.edges.push(R),
      s.key === "broadway" && (r && NW(i, R, 0, r, n), l && NW(i, R, 1, l, o)));
    for (let P of [n, o]) P.type === "end" && (P.type = "j");
    let E = (o.x - n.x) / u,
      A = (o.z - n.z) / u,
      C = {
        tn: s,
        E: R,
        Ja: n,
        Jb: o,
        L: R.L,
        ux: E,
        uz: A,
        W: S ?? R.W[0],
        roof: FS(s),
      };
    ((R.tunnelR = C),
      (C.bores = s.open
        ? []
        : s.twin
          ? [
              { v0: 0.6, v1: C.W + lo },
              { v0: -C.W - lo, v1: -0.6 },
            ]
          : [{ v0: s.left ? -s.left : -C.W - lo, v1: C.W + lo }]),
      s.open || OW(i, C),
      t.push(C));
  }
  for (let s of i.highways?.presidio || []) {
    let n = s.tunnel === "n1" ? [30, 0] : s.tunnel === "s2" ? [0, 30] : [0, 0],
      o = {},
      a = [],
      r = [];
    for (
      let m = n[0];
      Ot(s, m, o), a.push(o.x, o.z, o.y), r.push(o.w), !(m >= s.L - n[1]);
      m = Math.min(m + 6, s.L - n[1])
    );
    let l = dr({ id: -1, P: new Float32Array(a), W: new Float32Array(r) });
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
        tn: BW,
        E: l,
        Ja: c,
        Jb: h,
        L: f,
        ux: (h.x - c.x) / d,
        uz: (h.z - c.z) / d,
        W: u,
        roof: FS(BW),
        noClip: !0,
      };
    ((p.bores = [{ v0: -u - lo, v1: u + lo }]),
      (s.tunnelR = p),
      OW(i, p),
      t.push(p));
  }
  return ((i.tunnels = t), jW(i), CW(i), _ft(i), Sft(i), t);
}
var BW = {
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
  Ud = (i, t, e) => {
    let s = t - i.Ja.x,
      n = e - i.Ja.z;
    return [s * i.ux + n * i.uz, s * -i.uz + n * i.ux];
  },
  ob = {};
function Gd(i, t, e) {
  let s = i.E;
  if ((vs(s, t, e, ob), ob.s > 0.01 && ob.s < s.L - 0.01)) return [ob.s, ob.v];
  let n = ob.s >= s.L - 0.01,
    o = n ? s.n - 2 : 0,
    a = s.D[o * 2],
    r = s.D[o * 2 + 1],
    l = s.P[(n ? s.n - 1 : 0) * 3],
    c = s.P[(n ? s.n - 1 : 0) * 3 + 1];
  return [
    (n ? s.L : 0) + (t - l) * a + (e - c) * r,
    (t - l) * -r + (e - c) * a,
  ];
}
function Cc(i, t, e) {
  if (!i.lim) return t;
  let s = Math.min(i.lim[0].length - 1, Math.max(0, Math.round(e / 2)));
  return {
    v0: t.v0 < -0.7 ? Math.max(t.v0, -i.lim[0][s]) : t.v0,
    v1: t.v1 > 0.7 ? Math.min(t.v1, i.lim[1][s]) : t.v1,
  };
}
function gy(i, t, e, s, n = 0.05) {
  if (i.tn.open) return !1;
  let [o, a] = Gd(i, t, s);
  if (o < 0.5 || o > i.L - 0.5) return !1;
  let r = L0(i, o);
  if (e < r - 0.06 + n) return !1;
  for (let l of i.bores) {
    let c = Cc(i, l, o);
    if (a < c.v0 + n || a > c.v1 - n) continue;
    if (i.tn.shape === "box") return e < r + au(i.tn) - n;
    let h = (c.v0 + c.v1) / 2,
      f = (c.v1 - c.v0) / 2,
      u = (a - h) / f;
    return e < r + Ic(i.tn) + Wl(i.tn) * Math.sqrt(Math.max(0, 1 - u * u)) - n;
  }
  return !1;
}
var L0 = (i, t) => {
    let e = i.E,
      s = Math.min(e.L, Math.max(0, t)),
      n = 0;
    for (; n + 2 < e.n && e.S[n + 1] < s;) n++;
    let o = e.S[n],
      a = e.S[n + 1],
      r = a > o ? (s - o) / (a - o) : 0;
    return e.P[n * 3 + 2] + (e.P[n * 3 + 5] - e.P[n * 3 + 2]) * r;
  },
  a7 = (i) => (i.tn.shape === "box" ? au(i.tn) : Ic(i.tn) + Wl(i.tn)),
  ab = {};
function GW(i, t, e, s, n = null) {
  if (!i?.tubes || !i.inTube?.(t, e)) return null;
  for (let o of i.tubes) {
    if (o.tn.open) continue;
    let a = o.box;
    if (a && (t < a[0] || t > a[2] || e < a[1] || e > a[3])) continue;
    let [r, l] = Gd(o, t, e);
    if (r < 0 || r > o.L) continue;
    vs(o.E, t, e, ab);
    let c = ab.y;
    if (!(s < c - 1.5 || s > c + a7(o) - 0.3))
      for (let h of o.bores) {
        let f = Cc(o, h, r);
        if (l < f.v0 - 0.05 || l > f.v1 + 0.05) continue;
        let u = h.v0 + lo,
          d = h.v1 - lo,
          p =
            (l < u && !(Math.abs((f.v0 + u) / 2) < 1.5 || u - f.v0 < 0.2)) ||
            (l > d && !(Math.abs((d + f.v1) / 2) < 1.5 || f.v1 - d < 0.2));
        return (
          n && ((n.dx = ab.gy * ab.dx), (n.dz = ab.gy * ab.dz)),
          c + (p ? 0.25 : 0)
        );
      }
  }
  return null;
}
