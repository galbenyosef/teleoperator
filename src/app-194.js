// app 194 — math
// Lines 109151-109467 of readable/app.pretty.js (statement-aligned).
function Lgt(o, t, e) {
  let { D: s, L: n } = t,
    i = Lt(Ct.metal, 0.08, 0.08, 0.08),
    a = Lt(Ct.stone, 0.75, 0.74, 0.7),
    r = Lt(Ct.matte, 0.35, 0.18, 0.08),
    l = wn(1, 0.8, 0.45),
    c = Lt(Ct.metal, 0.05, 0.05, 0.05);
  for (let h of Cgt)
    for (let f of s.edges) {
      if (f.name !== h.name || f.layer > 0) continue;
      let u = {},
        d = {};
      for (let p = f.s0 + 6; p < f.s1 - 6; p += h.step) {
        if ((Ot(f, p, u), u.x < h.x0 || u.x > h.x1)) continue;
        let m = -u.dz,
          g = u.dx,
          b = Math.round(p / h.step);
        for (let v of h.v) {
          let x = u.x + m * v,
            y = u.z + g * v,
            M = n.driveHeight(x, y);
          if (n.surfaceAt(x, y) === "road") {
            (fc(o, x, M + 0.74, y, 0.38, 10, a),
              Ce(o, [x, M, y], [x, M + 0.74, y], 0.035, i, 4));
            for (let S of [0.6, 2.2, 3.8, 5.4]) {
              let w = x + Math.cos(S + b) * 0.62,
                _ = y + Math.sin(S + b) * 0.62;
              (ba(
                o,
                [w, _],
                [Math.cos(S + b), Math.sin(S + b)],
                [-Math.sin(S + b), Math.cos(S + b)],
                0.21,
                0.21,
                M + 0.44,
                M + 0.48,
                r,
              ),
                ba(
                  o,
                  [w + Math.cos(S + b) * 0.2, _ + Math.sin(S + b) * 0.2],
                  [Math.cos(S + b), Math.sin(S + b)],
                  [-Math.sin(S + b), Math.cos(S + b)],
                  0.02,
                  0.2,
                  M + 0.48,
                  M + 0.9,
                  r,
                ),
                Ce(o, [w, M, _], [w, M + 0.44, _], 0.015, i, 3));
            }
            if (b % 2 === 0 || !h.lights) {
              let S = h.umb[(b + (v > 0 ? 1 : 0)) % h.umb.length];
              Ce(o, [x, M, y], [x, M + 2.35, y], 0.025, i, 4);
              for (let w = 0; w < 8; w++) {
                let _ = (w / 8) * Math.PI * 2,
                  z = ((w + 1) / 8) * Math.PI * 2,
                  A = 1.3;
                (oe(
                  o,
                  [
                    [x, M + 2.6, y],
                    [x + Math.cos(_) * A, M + 2.15, y + Math.sin(_) * A],
                    [x + Math.cos(z) * A, M + 2.15, y + Math.sin(z) * A],
                  ],
                  S,
                  [0, 1, 0],
                ),
                  oe(
                    o,
                    [
                      [x, M + 2.55, y],
                      [x + Math.cos(_) * A, M + 2.12, y + Math.sin(_) * A],
                      [x + Math.cos(z) * A, M + 2.12, y + Math.sin(z) * A],
                    ],
                    S,
                    [0, -1, 0],
                  ));
              }
            }
            t.colliders.push({ t: "circ", x, z: y, r: 0.85 });
          }
        }
        if (h.lights && b % 2 === 0) {
          let v = (f.W[0] || 3) + (f.sw || 2.4) - 0.3,
            x = [u.x - m * v, n.driveHeight(u.x, u.z) + 4.6, u.z - g * v],
            y = [u.x + m * v, x[1], u.z + g * v],
            M = 10,
            S = x;
          for (let w = 1; w <= M; w++) {
            let _ = w / M,
              z = [
                x[0] + (y[0] - x[0]) * _,
                x[1] - 0.6 * 4 * _ * (1 - _),
                x[2] + (y[2] - x[2]) * _,
              ];
            (Ce(o, S, z, 0.008, c, 3),
              ss(
                o,
                z[0] - 0.05,
                z[1] - 0.12,
                z[2] - 0.05,
                z[0] + 0.05,
                z[1] - 0.02,
                z[2] + 0.05,
                l,
              ),
              (S = z));
          }
        }
      }
    }
}
function vK(o, t, e) {
  let s = e.D.bld;
  for (let r of bz) r.rec = null;
  if (s.seed)
    for (let r = 0; r < s.n; r++) {
      let l = bz.find((c) => c.id === s.seed[r]);
      l && (l.rec = er(e.D, r));
    }
  let n = new Map(),
    i = (r) => {
      let l = n.get(r);
      return (l || n.set(r, (l = new Be())), l);
    },
    a = { get: (r) => i("stairs_" + Math.floor(r.c[0] / 450)) };
  for (let [r, l] of [
    [() => ygt(i("sing"), e), "sing"],
    [() => Sgt(a, e), "stairs"],
    [() => zgt(i("hallidie"), e, o), "hallidie"],
    [() => _gt(i("powell"), e), "powell"],
    [() => Agt(i("ec"), e), "ec"],
    [() => Pgt(i("pioneer"), e, o), "pioneer"],
    [() => Lgt(i("cafes"), e, o), "cafes"],
  ])
    try {
      r();
    } catch (c) {
      console.error("plazas:", l, c);
    }
  for (let [r, l] of n) vn(o.group, l, t.lm, "Plazas16_" + r);
}
var Nw = {
  mint: 32863779,
  stpat: 32963425,
  pg: [
    [-2725, 2189.4],
    [-2704.7, 2186.2],
    [-2719, 2097.1],
    [-2739.2, 2100.3],
  ],
};
function TK(o) {
  (o.claim({ name: "oldmint", ids: [Nw.mint], poly: null }),
    o.claim({ name: "stpatricks", ids: [Nw.stpat], poly: null }));
}
var Ra = (o) => {
    let t = o.rings[0],
      e = [];
    for (let s = 0; s < t.length; s += 2) {
      let n = [t[s], t[s + 1]],
        i = e[e.length - 1];
      (!i || Math.hypot(n[0] - i[0], n[1] - i[1]) > 0.4) && e.push(n);
    }
    return (
      e.length > 2 &&
        Math.hypot(e[0][0] - e[e.length - 1][0], e[0][1] - e[e.length - 1][1]) <
          0.4 &&
        e.pop(),
      e
    );
  },
  Igt = (o, t, e) => {
    let s = !1;
    for (let n = 0, i = o.length - 1; n < o.length; i = n++) {
      let [a, r] = o[n],
        [l, c] = o[i];
      r > e != c > e && t < ((l - a) * (e - r)) / (c - r) + a && (s = !s);
    }
    return s;
  };
function ia(o) {
  let t = [];
  for (let e = 0; e < o.length; e++) {
    let s = o[e],
      n = o[(e + 1) % o.length],
      i = Math.hypot(n[0] - s[0], n[1] - s[1]);
    if (i < 0.3) continue;
    let a = [(n[0] - s[0]) / i, (n[1] - s[1]) / i],
      r = [-a[1], a[0]],
      l = [(s[0] + n[0]) / 2, (s[1] + n[1]) / 2];
    (Igt(o, l[0] + r[0] * 0.5, l[1] + r[1] * 0.5) && (r = [-r[0], -r[1]]),
      t.push({ a: s, b: n, L: i, u: a, n: r, m: l }));
  }
  return t;
}
function cn(o, t, e, s, n, i, a, r, l, c = !0) {
  let h = (u, d, p) => [
      t[0] + e[0] * n * u + s[0] * i * d,
      p,
      t[1] + e[1] * n * u + s[1] * i * d,
    ],
    f = (u, d, p, m, g) => oe(o, [u, d, p, m], l, g);
  (f(h(1, -1, a), h(1, 1, a), h(1, 1, r), h(1, -1, r), [e[0], 0, e[1]]),
    f(h(-1, 1, a), h(-1, -1, a), h(-1, -1, r), h(-1, 1, r), [-e[0], 0, -e[1]]),
    f(h(-1, 1, a), h(1, 1, a), h(1, 1, r), h(-1, 1, r), [s[0], 0, s[1]]),
    f(h(1, -1, a), h(-1, -1, a), h(-1, -1, r), h(1, -1, r), [-s[0], 0, -s[1]]),
    c &&
      oe(
        o,
        [h(-1, -1, r), h(1, -1, r), h(1, 1, r), h(-1, 1, r)],
        l,
        [0, 1, 0],
        (u) => [u[0], u[2]],
      ));
}
function Eo(o, t, e, s, n, i) {
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
    (oe(o, [p(c.a, n), p(c.b, n), p(d, n), p(u, n)], i, [0, 1, 0], m),
      oe(o, [p(c.a, s), p(c.b, s), p(d, s), p(u, s)], i, [0, -1, 0], m),
      oe(o, [p(u, s), p(d, s), p(d, n), p(u, n)], i, [c.n[0], 0, c.n[1]]),
      h ||
        oe(o, [p(c.a, s), p(u, s), p(u, n), p(c.a, n)], i, [
          -c.u[0],
          0,
          -c.u[1],
        ]),
      f ||
        oe(o, [p(c.b, s), p(d, s), p(d, n), p(c.b, n)], i, [
          c.u[0],
          0,
          c.u[1],
        ]));
  }
}
function sr(o, t, e, s) {
  let { tris: n, flat: i } = dc([t.flat()]),
    a = o.v;
  for (let r = 0; r < i.length; r += 2)
    o.vert(i[r], e, i[r + 1], 0, 1, 0, i[r], i[r + 1], s);
  for (let [r, l, c] of n) {
    let h = [i[r * 2], i[r * 2 + 1]],
      f = [i[l * 2], i[l * 2 + 1]],
      u = [i[c * 2], i[c * 2 + 1]];
    (f[1] - h[1]) * (u[0] - h[0]) - (f[0] - h[0]) * (u[1] - h[1]) >= 0
      ? o.tri(a + r, a + l, a + c)
      : o.tri(a + r, a + c, a + l);
  }
}
var RK = (o, t) => {
    let e = o.bld;
    if (e.seed) {
      for (let s = 0; s < e.n; s++) if (e.seed[s] === t) return er(o, s);
    }
    return null;
  },
  uL = (o, t, e, s) => {
    let n = 1e9,
      i = -1e9,
      a = 1e9,
      r = -1e9;
    for (let [l, c] of t)
      ((n = Math.min(n, l)),
        (i = Math.max(i, l)),
        (a = Math.min(a, c)),
        (r = Math.max(r, c)));
    o.colliders.push({
      t: "poly",
      pts: Float32Array.from(t.flat()),
      bb: [n, a, i, r],
      y0: e,
      y1: s,
    });
  };
function Qm(o, t, e, s = 8) {
  let n = null;
  for (let i of t)
    if (!(i.L < s))
      for (let a = 2; a <= 40; a += 2) {
        let r = o.roadAt(i.m[0] + i.n[0] * a, i.m[1] + i.n[1] * a, 6);
        if (r) {
          r.E.name === e &&
            (!n || a < n.d - 1 || (Math.abs(a - n.d) <= 1 && i.L > n.e.L)) &&
            (n = { e: i, d: a });
          break;
        }
      }
  return n ? n.e : t.reduce((i, a) => (a.L > i.L ? a : i));
}
var yK = We(we.granite, 0.6, 0.57, 0.52),
  Fgt = Tn(ln.WIN, we.granite, 0.95, 0.87, 0.72),
  Zm = We(we.granite, 0.97, 0.89, 0.75),
  vz = We(we.granite, 0.78, 0.71, 0.61),
  wK = Lt(Ct.stone, 0.3, 0.3, 0.29),
  Ogt = We(we.terracotta, 0.5, 0.24, 0.17),
  e7t = Lt(Ct.glass, 0.035, 0.04, 0.045),
  AK = Lt(Ct.gloss, 0.08, 0.06, 0.05);
