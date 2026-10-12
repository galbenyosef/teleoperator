// app 195 — math
// Lines 108895-109211 of readable/app.pretty.js (statement-aligned).
function c1t(i, t, e) {
  let { D: s, L: n } = t,
    o = It(Lt.metal, 0.08, 0.08, 0.08),
    a = It(Lt.stone, 0.75, 0.74, 0.7),
    r = It(Lt.matte, 0.35, 0.18, 0.08),
    l = bn(1, 0.8, 0.45),
    c = It(Lt.metal, 0.05, 0.05, 0.05);
  for (let h of l1t)
    for (let f of s.edges) {
      if (f.name !== h.name || f.layer > 0) continue;
      let u = {},
        d = {};
      for (let p = f.s0 + 6; p < f.s1 - 6; p += h.step) {
        if ((Ot(f, p, u), u.x < h.x0 || u.x > h.x1)) continue;
        let m = -u.dz,
          g = u.dx,
          b = Math.round(p / h.step);
        for (let x of h.v) {
          let v = u.x + m * x,
            y = u.z + g * x,
            M = n.driveHeight(v, y);
          if (n.surfaceAt(v, y) === "road") {
            (ql(i, v, M + 0.74, y, 0.38, 10, a),
              Ae(i, [v, M, y], [v, M + 0.74, y], 0.035, o, 4));
            for (let S of [0.6, 2.2, 3.8, 5.4]) {
              let w = v + Math.cos(S + b) * 0.62,
                z = y + Math.sin(S + b) * 0.62;
              (ra(
                i,
                [w, z],
                [Math.cos(S + b), Math.sin(S + b)],
                [-Math.sin(S + b), Math.cos(S + b)],
                0.21,
                0.21,
                M + 0.44,
                M + 0.48,
                r,
              ),
                ra(
                  i,
                  [w + Math.cos(S + b) * 0.2, z + Math.sin(S + b) * 0.2],
                  [Math.cos(S + b), Math.sin(S + b)],
                  [-Math.sin(S + b), Math.cos(S + b)],
                  0.02,
                  0.2,
                  M + 0.48,
                  M + 0.9,
                  r,
                ),
                Ae(i, [w, M, z], [w, M + 0.44, z], 0.015, o, 3));
            }
            if (b % 2 === 0 || !h.lights) {
              let S = h.umb[(b + (x > 0 ? 1 : 0)) % h.umb.length];
              Ae(i, [v, M, y], [v, M + 2.35, y], 0.025, o, 4);
              for (let w = 0; w < 8; w++) {
                let z = (w / 8) * Math.PI * 2,
                  _ = ((w + 1) / 8) * Math.PI * 2,
                  R = 1.3;
                (ne(
                  i,
                  [
                    [v, M + 2.6, y],
                    [v + Math.cos(z) * R, M + 2.15, y + Math.sin(z) * R],
                    [v + Math.cos(_) * R, M + 2.15, y + Math.sin(_) * R],
                  ],
                  S,
                  [0, 1, 0],
                ),
                  ne(
                    i,
                    [
                      [v, M + 2.55, y],
                      [v + Math.cos(z) * R, M + 2.12, y + Math.sin(z) * R],
                      [v + Math.cos(_) * R, M + 2.12, y + Math.sin(_) * R],
                    ],
                    S,
                    [0, -1, 0],
                  ));
              }
            }
            t.colliders.push({ t: "circ", x: v, z: y, r: 0.85 });
          }
        }
        if (h.lights && b % 2 === 0) {
          let x = (f.W[0] || 3) + (f.sw || 2.4) - 0.3,
            v = [u.x - m * x, n.driveHeight(u.x, u.z) + 4.6, u.z - g * x],
            y = [u.x + m * x, v[1], u.z + g * x],
            M = 10,
            S = v;
          for (let w = 1; w <= M; w++) {
            let z = w / M,
              _ = [
                v[0] + (y[0] - v[0]) * z,
                v[1] - 0.6 * 4 * z * (1 - z),
                v[2] + (y[2] - v[2]) * z,
              ];
            (Ae(i, S, _, 0.008, c, 3),
              Ze(
                i,
                _[0] - 0.05,
                _[1] - 0.12,
                _[2] - 0.05,
                _[0] + 0.05,
                _[1] - 0.02,
                _[2] + 0.05,
                l,
              ),
              (S = _));
          }
        }
      }
    }
}
function g$(i, t, e) {
  let s = e.D.bld;
  for (let r of bk) r.rec = null;
  if (s.seed)
    for (let r = 0; r < s.n; r++) {
      let l = bk.find((c) => c.id === s.seed[r]);
      l && (l.rec = mr(e.D, r));
    }
  let n = new Map(),
    o = (r) => {
      let l = n.get(r);
      return (l || n.set(r, (l = new Ce())), l);
    },
    a = { get: (r) => o("stairs_" + Math.floor(r.c[0] / 450)) };
  for (let [r, l] of [
    [() => Ypt(o("sing"), e), "sing"],
    [() => Qpt(a, e), "stairs"],
    [() => e1t(o("hallidie"), e, i), "hallidie"],
    [() => s1t(o("powell"), e), "powell"],
    [() => a1t(o("ec"), e), "ec"],
    [() => r1t(o("pioneer"), e, i), "pioneer"],
    [() => c1t(o("cafes"), e, i), "cafes"],
  ])
    try {
      r();
    } catch (c) {
      console.error("plazas:", l, c);
    }
  for (let [r, l] of n) gn(i.group, l, t.lm, "Plazas16_" + r);
}
var Wy = {
  mint: 32863779,
  stpat: 32963425,
  pg: [
    [-2725, 2189.4],
    [-2704.7, 2186.2],
    [-2719, 2097.1],
    [-2739.2, 2100.3],
  ],
};
function _$(i) {
  (i.claim({ name: "oldmint", ids: [Wy.mint], poly: null }),
    i.claim({ name: "stpatricks", ids: [Wy.stpat], poly: null }));
}
var va = (i) => {
    let t = i.rings[0],
      e = [];
    for (let s = 0; s < t.length; s += 2) {
      let n = [t[s], t[s + 1]],
        o = e[e.length - 1];
      (!o || Math.hypot(n[0] - o[0], n[1] - o[1]) > 0.4) && e.push(n);
    }
    return (
      e.length > 2 &&
        Math.hypot(e[0][0] - e[e.length - 1][0], e[0][1] - e[e.length - 1][1]) <
          0.4 &&
        e.pop(),
      e
    );
  },
  h1t = (i, t, e) => {
    let s = !1;
    for (let n = 0, o = i.length - 1; n < i.length; o = n++) {
      let [a, r] = i[n],
        [l, c] = i[o];
      r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
    }
    return s;
  };
function Xo(i) {
  let t = [];
  for (let e = 0; e < i.length; e++) {
    let s = i[e],
      n = i[(e + 1) % i.length],
      o = Math.hypot(n[0] - s[0], n[1] - s[1]);
    if (o < 0.3) continue;
    let a = [(n[0] - s[0]) / o, (n[1] - s[1]) / o],
      r = [-a[1], a[0]],
      l = [(s[0] + n[0]) / 2, (s[1] + n[1]) / 2];
    (h1t(i, l[0] + r[0] * 0.5, l[1] + r[1] * 0.5) && (r = [-r[0], -r[1]]),
      t.push({ a: s, b: n, L: o, u: a, n: r, m: l }));
  }
  return t;
}
function nn(i, t, e, s, n, o, a, r, l, c = !0) {
  let h = (u, d, p) => [
      t[0] + e[0] * n * u + s[0] * o * d,
      p,
      t[1] + e[1] * n * u + s[1] * o * d,
    ],
    f = (u, d, p, m, g) => ne(i, [u, d, p, m], l, g);
  (f(h(1, -1, a), h(1, 1, a), h(1, 1, r), h(1, -1, r), [e[0], 0, e[1]]),
    f(h(-1, 1, a), h(-1, -1, a), h(-1, -1, r), h(-1, 1, r), [-e[0], 0, -e[1]]),
    f(h(-1, 1, a), h(1, 1, a), h(1, 1, r), h(-1, 1, r), [s[0], 0, s[1]]),
    f(h(1, -1, a), h(-1, -1, a), h(-1, -1, r), h(1, -1, r), [-s[0], 0, -s[1]]),
    c &&
      ne(
        i,
        [h(-1, -1, r), h(1, -1, r), h(1, 1, r), h(-1, 1, r)],
        l,
        [0, 1, 0],
        (u) => [u[0], u[2]],
      ));
}
function vo(i, t, e, s, n, o) {
  let a = t.length,
    r = (l, c) => {
      if (a < 3 || Math.hypot(l.b[0] - c.a[0], l.b[1] - c.a[1]) > 0.01)
        return null;
      let h = 1 + l.n[0] * c.n[0] + l.n[1] * c.n[1];
      return h < 0.25
        ? null
        : [
            l.b[0] + ((l.n[0] + c.n[0]) * e) / h,
            l.b[1] + ((l.n[1] + c.n[1]) * e) / h,
          ];
    };
  for (let l = 0; l < a; l++) {
    let c = t[l],
      h = r(t[(l + a - 1) % a], c),
      f = r(c, t[(l + 1) % a]),
      u = h || [c.a[0] + c.n[0] * e, c.a[1] + c.n[1] * e],
      d = f || [c.b[0] + c.n[0] * e, c.b[1] + c.n[1] * e],
      p = (g, b) => [g[0], b, g[1]],
      m = (g) => [g[0], g[2]];
    (ne(i, [p(c.a, n), p(c.b, n), p(d, n), p(u, n)], o, [0, 1, 0], m),
      ne(i, [p(c.a, s), p(c.b, s), p(d, s), p(u, s)], o, [0, -1, 0], m),
      ne(i, [p(u, s), p(d, s), p(d, n), p(u, n)], o, [c.n[0], 0, c.n[1]]),
      h ||
        ne(i, [p(c.a, s), p(u, s), p(u, n), p(c.a, n)], o, [
          -c.u[0],
          0,
          -c.u[1],
        ]),
      f ||
        ne(i, [p(c.b, s), p(d, s), p(d, n), p(c.b, n)], o, [
          c.u[0],
          0,
          c.u[1],
        ]));
  }
}
function Ua(i, t, e, s) {
  let { tris: n, flat: o } = Vl([t.flat()]),
    a = i.v;
  for (let r = 0; r < o.length; r += 2)
    i.vert(o[r], e, o[r + 1], 0, 1, 0, o[r], o[r + 1], s);
  for (let [r, l, c] of n) {
    let h = [o[r * 2], o[r * 2 + 1]],
      f = [o[l * 2], o[l * 2 + 1]],
      u = [o[c * 2], o[c * 2 + 1]];
    (f[1] - h[1]) * (u[0] - h[0]) - (f[0] - h[0]) * (u[1] - h[1]) >= 0
      ? i.tri(a + r, a + l, a + c)
      : i.tri(a + r, a + c, a + l);
  }
}
var z$ = (i, t) => {
    let e = i.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return mr(i, s);
    }
    return null;
  },
  NP = (i, t, e, s) => {
    let n = 1e9,
      o = -1e9,
      a = 1e9,
      r = -1e9;
    for (let [l, c] of t)
      ((n = Math.min(n, l)),
        (o = Math.max(o, l)),
        (a = Math.min(a, c)),
        (r = Math.max(r, c)));
    i.colliders.push({
      t: "poly",
      pts: Float32Array.from(t.flat()),
      bb: [n, a, o, r],
      y0: e,
      y1: s,
    });
  };
function hm(i, t, e, s = 8) {
  let n = null;
  for (let o of t)
    if (!(o.L < s))
      for (let a = 2; a <= 40; a += 2) {
        let r = i.roadAt(o.m[0] + o.n[0] * a, o.m[1] + o.n[1] * a, 6);
        if (r) {
          r.E.name === e &&
            (!n || a < n.d - 1 || (Math.abs(a - n.d) <= 1 && o.L > n.e.L)) &&
            (n = { e: o, d: a });
          break;
        }
      }
  return n ? n.e : t.reduce((o, a) => (a.L > o.L ? a : o));
}
var b$ = Be(be.granite, 0.6, 0.57, 0.52),
  f1t = yn(sn.WIN, be.granite, 0.95, 0.87, 0.72),
  cm = Be(be.granite, 0.97, 0.89, 0.75),
  vk = Be(be.granite, 0.78, 0.71, 0.61),
  x$ = It(Lt.stone, 0.3, 0.3, 0.29),
  u1t = Be(be.terracotta, 0.5, 0.24, 0.17),
  Zzt = It(Lt.glass, 0.035, 0.04, 0.045),
  E$ = It(Lt.gloss, 0.08, 0.06, 0.05);
