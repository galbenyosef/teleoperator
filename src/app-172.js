// app 172 — math
// Lines 102322-102630 of readable/app.pretty.js (statement-aligned).
function M2t(o, t, e, s) {
  let n = o.edges.filter(
      (u) =>
        u.name === "Market Street" && !u.inner && !u.elev && !u.hwy && !u.sunk,
    ),
    i = {},
    a = new Map(),
    r = (u, d) => Math.floor(u / 32) * 100003 + Math.floor(d / 32);
  for (let u of n)
    for (let d = u.s0; d <= u.s1; d += 6) {
      Ot(u, d, i);
      let p = r(i.x, i.z),
        m = a.get(p);
      (m || a.set(p, (m = [])), m.push(i.x, i.z, i.w + u.sw + 1.5));
    }
  let l = (u, d) => {
      for (let p = -1; p <= 1; p++)
        for (let m = -1; m <= 1; m++) {
          let g = a.get(r(u + p * 32, d + m * 32));
          if (g) {
            for (let b = 0; b < g.length; b += 3)
              if (Math.hypot(g[b] - u, g[b + 1] - d) < g[b + 2]) return !0;
          }
        }
      return !1;
    },
    c = jC();
  for (let u of t)
    (u.kind === "lamp" || u.kind === "tree") &&
      l(u.x, u.z) &&
      (u.kind === "lamp"
        ? c.add(u.x, u.z)
        : ((u.sp = "tree0"), (u.scale = 0.95 + 0.25 * zf(u.x, u.z))));
  if (c.size) {
    let u = (d, p) => {
      let m = 0;
      for (let g = 0; g < d.length; g++) p(d[g]) && (d[m++] = d[g]);
      d.length = m;
    };
    (u(t, (d) => !(d.kind === "lamp" && c.has(d.x, d.z))),
      u(e, (d) => !(d.t === "circ" && c.has(d.x, d.z))));
  }
  let h = 0,
    f = 0;
  for (let u of n)
    if (!(u.sw < 2.4 || u.s1 - u.s0 < 16))
      for (let d of [1, -1]) {
        for (let p = u.s0 + 7; p < u.s1 - 4; p += 30)
          s(u, p, d, 0.6, "lamp2", 0.22) && h++;
        for (let p = u.s0 + 5 + 4.25; p < u.s1 - 5; p += 8.5) {
          if (!s(u, p + (zf(p, u.sid + d) - 0.5) * 0.8, d, 1.05, "tree", 0.3))
            continue;
          let m = t[t.length - 1];
          ((m.sp = "tree0"),
            (m.scale = 0.95 + 0.3 * zf(m.x, m.z + 1)),
            t.push({
              kind: "well",
              x: m.x,
              y: m.y,
              z: m.z,
              rot: m.rot,
              scale: 1,
            }),
            f++);
        }
      }
  return { lamps: h, trees: f, baked: c.size };
}
function S2t(o, t, e, s) {
  let n = o.edges.filter(
      (h) =>
        h.name === "Grant Avenue" &&
        !h.inner &&
        !h.elev &&
        h.dist === "chinatown" &&
        (h.P[1] + h.P[h.n * 3 - 2]) / 2 < 548 &&
        (h.P[1] + h.P[h.n * 3 - 2]) / 2 > -262,
    ),
    i = {};
  if (!n.length) return 0;
  let a = [];
  for (let h of n)
    for (let f = h.s0; f <= h.s1; f += 5)
      (Ot(h, f, i), a.push(i.x, i.z, i.w + h.sw + 1));
  let r = (h, f) => {
      for (let u = 0; u < a.length; u += 3)
        if (
          Math.abs(a[u] - h) < 12 &&
          Math.abs(a[u + 1] - f) < 12 &&
          Math.hypot(a[u] - h, a[u + 1] - f) < a[u + 2]
        )
          return !0;
      return !1;
    },
    l = jC();
  for (let h of t) h.kind === "lamp" && r(h.x, h.z) && l.add(h.x, h.z);
  if (l.size) {
    let h = (f, u) => {
      let d = 0;
      for (let p = 0; p < f.length; p++) u(f[p]) && (f[d++] = f[p]);
      f.length = d;
    };
    (h(t, (f) => !(f.kind === "lamp" && l.has(f.x, f.z))),
      h(e, (f) => !(f.t === "circ" && l.has(f.x, f.z))));
  }
  let c = 0;
  for (let h of n)
    if (!(h.sw < 1.6 || h.s1 - h.s0 < 12))
      for (let f of [1, -1])
        for (let u = h.s0 + 5 + 6 * zf(h.sid + f, 90); u < h.s1 - 3; u += 20)
          s(h, u, f, 0.45, "dlamp", 0.22) && c++;
  return c;
}
function k2t(o, t, e, s) {
  let n = {},
    i = 0;
  for (let a of o.edges) {
    if (yx(a) !== 3 || a.s1 - a.s0 < 30) continue;
    let r = a.flags & 4 ? 0 : 2.3,
      l = Cp(a);
    for (let c of a.oneway ? [1] : [1, -1])
      for (let h = a.s0 + 12; h < a.s1 - 10; h += 6) {
        Ot(a, h, n);
        let f = (n.w - r - l + 0.45) * c,
          u = n.x + n.nx * f,
          d = n.z + n.nz * f,
          p = t.driveHeight(u, d);
        (e.push({ kind: "flexpost", x: u, y: p, z: d, rot: 0 }),
          i++,
          s.push({
            t: "circ",
            x: u,
            z: d,
            r: wx.flexpost,
            y0: p - 1.5,
            y1: p + 1.5,
            soft: !0,
          }));
      }
  }
  return i;
}
var z2t = { primary: 0.2, secondary: 0.2, tertiary: 0.14, residential: 0.03 };
function _2t(o, t, e, s, n) {
  let i = {},
    a = [],
    r = (p, m, g, b) => {
      let v = t.driveHeight(m, g);
      (e.push({ kind: p, x: m, y: v, z: g, rot: b }),
        s.push({ t: "circ", x: m, z: g, r: wx[p], y0: v - 1.5, y1: v + 2.4 }));
    };
  for (let p of o.edges) {
    let m = z2t[p.cls];
    if (
      !m ||
      p.inner ||
      p.elev ||
      p.hwy ||
      p.sunk ||
      p.flags & 84 ||
      p.name === "Market Street"
    )
      continue;
    let g = p.s0 + 10,
      b = p.s1 - 10,
      v = b - g;
    if (!(v < 40))
      for (let x of [1, -1]) {
        let y = (C) => zf(p.sid * 2 + (x > 0 ? 1 : 0) + 0.5, C + 40);
        if (y(0) > m) continue;
        let M = Math.min(v - 8, 18 + 14 * y(1)),
          S = g + 4 + (v - 8 - M) * y(2),
          w = S + M,
          _ = p.oneway ? 1 : x,
          z = _ > 0 ? S : w,
          A = _;
        if ((Ot(p, (S + w) / 2, i), n(i.x, i.z))) continue;
        let T = (C, I) => (
            Ot(p, C, i),
            [
              i.x + i.nx * x * I,
              i.z + i.nz * x * I,
              Math.atan2(i.dx * A, i.dz * A),
            ]
          ),
          E = i.w,
          R = E - 2.3 + 0.3,
          P = E - 1.15;
        if (!(E < 5.5)) {
          a.push([...T(S - 3, P).slice(0, 2), ...T(w + 3, P).slice(0, 2)]);
          {
            let [C, I, L] = T(z - A * (10 + 4 * y(3)), E - 0.55);
            r("worksign", C, I, L);
          }
          {
            let [C, I, L] = T(z, P);
            r("barricade", C, I, L);
          }
          for (let C = 1; C <= 3; C++) {
            let [I, L, F] = T(
              z - A * (10 - C * 2.5),
              E - 0.4 - ((E - 0.4 - R) * C) / 3,
            );
            r("cone", I, L, F);
          }
          for (let C = 3; C <= M; C += 4.5) {
            let [I, L, F] = T(z + A * C, R);
            r("cone", I, L, F);
          }
        }
      }
  }
  if (!a.length) return;
  let l = (p, m, g) => {
      let b = g[2] - g[0],
        v = g[3] - g[1],
        x = Math.max(
          0,
          Math.min(1, ((p - g[0]) * b + (m - g[1]) * v) / (b * b + v * v || 1)),
        );
      return Math.hypot(p - g[0] - b * x, m - g[1] - v * x);
    },
    c = new Map(),
    h = (p, m) => Math.floor(p / 64) * 100003 + Math.floor(m / 64);
  for (let p of a)
    for (let [m, g] of [
      [p[0], p[1]],
      [p[2], p[3]],
    ]) {
      let b = h(m, g),
        v = c.get(b);
      (v || c.set(b, (v = [])), v.includes(p) || v.push(p));
    }
  let f = (p, m) => {
      for (let g = -1; g <= 1; g++)
        for (let b = -1; b <= 1; b++) {
          let v = c.get(h(p + g * 64, m + b * 64));
          if (v) {
            for (let x of v) if (l(p, m, x) < 1.9) return !0;
          }
        }
      return !1;
    },
    u = jC(),
    d = (p, m) => {
      let g = 0;
      for (let b = 0; b < p.length; b++) m(p[b]) && (p[g++] = p[b]);
      p.length = g;
    };
  (d(e, (p) => !(p.kind === "car" && f(p.x, p.z) && u.add(p.x, p.z))),
    u.size && d(s, (p) => !(p.parked && u.has(p.x, p.z))));
}
var Ui = (o, t = 0) => {
    let e = Math.imul(o | 0, 374761393) ^ Math.imul(t | 0, 668265263);
    return (
      (e = Math.imul(e ^ (e >>> 13), 1274126177)),
      ((e ^ (e >>> 16)) >>> 0) / 4294967296
    );
  },
  oo = {
    PAINT: 0,
    CANVAS: 1,
    STEEL: 2,
    SIGN: 3,
    LANTERN: 4,
    AC: 5,
    TILE: 6,
    FLAG: 7,
    CSIGN: 8,
  },
  Mo = (o, t, e = 0) => [o[0], o[1], o[2], (t * 16 + e + 0.5) / 256],
  dX = [
    null,
    [0.72, 0.66, 0.52],
    [0.8, 0.8, 0.78],
    [0.05, 0.16, 0.08],
    [0.45, 0.04, 0.04],
    [0.03, 0.05, 0.14],
    [0.02, 0.02, 0.02],
  ],
  E2t = (o) => {
    if (!o) return 0;
    let t = 0,
      e = 1e9;
    for (let s = 1; s < dX.length; s++) {
      let n = dX[s],
        i = (n[0] - o[0]) ** 2 + (n[1] - o[1]) ** 2 + (n[2] - o[2]) ** 2;
      i < e && ((e = i), (t = s));
    }
    return t;
  },
  cz = [0.035, 0.035, 0.038],
  T2t = [0.3, 0.03, 0.025],
  $C = (o, t) => [o[0] - t[0], o[1] - t[1], o[2] - t[2]],
  XC = (o, t) => [
    o[1] * t[2] - o[2] * t[1],
    o[2] * t[0] - o[0] * t[2],
    o[0] * t[1] - o[1] * t[0],
  ],
  R2t = (o, t) => o[0] * t[0] + o[1] * t[1] + o[2] * t[2];
function _o(o, t, e, s, n, i, a, r) {
  let l = XC($C(e, t), $C(n, t));
  R2t(l, r) >= 0
    ? o.quad(t, e, s, n, i[0], i[1], i[2], i[3], a)
    : o.quad(t, n, s, e, i[0], i[3], i[2], i[1], a);
}
var Km = (o, t, e, s, n, i, a, r) => {
  (_o(o, t, e, s, n, i, a, r), _o(o, t, e, s, n, i, a, [-r[0], -r[1], -r[2]]));
};
