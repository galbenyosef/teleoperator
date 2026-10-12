// app 173 — math
// Lines 102086-102394 of readable/app.pretty.js (statement-aligned).
function Zdt(i, t, e, s) {
  let n = i.edges.filter(
      (u) =>
        u.name === "Market Street" && !u.inner && !u.elev && !u.hwy && !u.sunk,
    ),
    o = {},
    a = new Map(),
    r = (u, d) => Math.floor(u / 32) * 100003 + Math.floor(d / 32);
  for (let u of n)
    for (let d = u.s0; d <= u.s1; d += 6) {
      Ot(u, d, o);
      let p = r(o.x, o.z),
        m = a.get(p);
      (m || a.set(p, (m = [])), m.push(o.x, o.z, o.w + u.sw + 1.5));
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
    c = mP();
  for (let u of t)
    (u.kind === "lamp" || u.kind === "tree") &&
      l(u.x, u.z) &&
      (u.kind === "lamp"
        ? c.add(u.x, u.z)
        : ((u.sp = "tree0"), (u.scale = 0.95 + 0.25 * $h(u.x, u.z))));
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
          if (!s(u, p + ($h(p, u.sid + d) - 0.5) * 0.8, d, 1.05, "tree", 0.3))
            continue;
          let m = t[t.length - 1];
          ((m.sp = "tree0"),
            (m.scale = 0.95 + 0.3 * $h(m.x, m.z + 1)),
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
function Qdt(i, t, e, s) {
  let n = i.edges.filter(
      (h) =>
        h.name === "Grant Avenue" &&
        !h.inner &&
        !h.elev &&
        h.dist === "chinatown" &&
        (h.P[1] + h.P[h.n * 3 - 2]) / 2 < 548 &&
        (h.P[1] + h.P[h.n * 3 - 2]) / 2 > -262,
    ),
    o = {};
  if (!n.length) return 0;
  let a = [];
  for (let h of n)
    for (let f = h.s0; f <= h.s1; f += 5)
      (Ot(h, f, o), a.push(o.x, o.z, o.w + h.sw + 1));
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
    l = mP();
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
        for (let u = h.s0 + 5 + 6 * $h(h.sid + f, 90); u < h.s1 - 3; u += 20)
          s(h, u, f, 0.45, "dlamp", 0.22) && c++;
  return c;
}
function tpt(i, t, e, s) {
  let n = {},
    o = 0;
  for (let a of i.edges) {
    if (Ib(a) !== 3 || a.s1 - a.s0 < 30) continue;
    let r = a.flags & 4 ? 0 : 2.3,
      l = tp(a);
    for (let c of a.oneway ? [1] : [1, -1])
      for (let h = a.s0 + 12; h < a.s1 - 10; h += 6) {
        Ot(a, h, n);
        let f = (n.w - r - l + 0.45) * c,
          u = n.x + n.nx * f,
          d = n.z + n.nz * f,
          p = t.driveHeight(u, d);
        (e.push({ kind: "flexpost", x: u, y: p, z: d, rot: 0 }),
          o++,
          s.push({
            t: "circ",
            x: u,
            z: d,
            r: Fb.flexpost,
            y0: p - 1.5,
            y1: p + 1.5,
            soft: !0,
          }));
      }
  }
  return o;
}
var ept = { primary: 0.2, secondary: 0.2, tertiary: 0.14, residential: 0.03 };
function spt(i, t, e, s, n) {
  let o = {},
    a = [],
    r = (p, m, g, b) => {
      let x = t.driveHeight(m, g);
      (e.push({ kind: p, x: m, y: x, z: g, rot: b }),
        s.push({ t: "circ", x: m, z: g, r: Fb[p], y0: x - 1.5, y1: x + 2.4 }));
    };
  for (let p of i.edges) {
    let m = ept[p.cls];
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
      x = b - g;
    if (!(x < 40))
      for (let v of [1, -1]) {
        let y = (P) => $h(p.sid * 2 + (v > 0 ? 1 : 0) + 0.5, P + 40);
        if (y(0) > m) continue;
        let M = Math.min(x - 8, 18 + 14 * y(1)),
          S = g + 4 + (x - 8 - M) * y(2),
          w = S + M,
          z = p.oneway ? 1 : v,
          _ = z > 0 ? S : w,
          R = z;
        if ((Ot(p, (S + w) / 2, o), n(o.x, o.z))) continue;
        let T = (P, I) => (
            Ot(p, P, o),
            [
              o.x + o.nx * v * I,
              o.z + o.nz * v * I,
              Math.atan2(o.dx * R, o.dz * R),
            ]
          ),
          E = o.w,
          A = E - 2.3 + 0.3,
          C = E - 1.15;
        if (!(E < 5.5)) {
          a.push([...T(S - 3, C).slice(0, 2), ...T(w + 3, C).slice(0, 2)]);
          {
            let [P, I, L] = T(_ - R * (10 + 4 * y(3)), E - 0.55);
            r("worksign", P, I, L);
          }
          {
            let [P, I, L] = T(_, C);
            r("barricade", P, I, L);
          }
          for (let P = 1; P <= 3; P++) {
            let [I, L, F] = T(
              _ - R * (10 - P * 2.5),
              E - 0.4 - ((E - 0.4 - A) * P) / 3,
            );
            r("cone", I, L, F);
          }
          for (let P = 3; P <= M; P += 4.5) {
            let [I, L, F] = T(_ + R * P, A);
            r("cone", I, L, F);
          }
        }
      }
  }
  if (!a.length) return;
  let l = (p, m, g) => {
      let b = g[2] - g[0],
        x = g[3] - g[1],
        v = Math.max(
          0,
          Math.min(1, ((p - g[0]) * b + (m - g[1]) * x) / (b * b + x * x || 1)),
        );
      return Math.hypot(p - g[0] - b * v, m - g[1] - x * v);
    },
    c = new Map(),
    h = (p, m) => Math.floor(p / 64) * 100003 + Math.floor(m / 64);
  for (let p of a)
    for (let [m, g] of [
      [p[0], p[1]],
      [p[2], p[3]],
    ]) {
      let b = h(m, g),
        x = c.get(b);
      (x || c.set(b, (x = [])), x.includes(p) || x.push(p));
    }
  let f = (p, m) => {
      for (let g = -1; g <= 1; g++)
        for (let b = -1; b <= 1; b++) {
          let x = c.get(h(p + g * 64, m + b * 64));
          if (x) {
            for (let v of x) if (l(p, m, v) < 1.9) return !0;
          }
        }
      return !1;
    },
    u = mP(),
    d = (p, m) => {
      let g = 0;
      for (let b = 0; b < p.length; b++) m(p[b]) && (p[g++] = p[b]);
      p.length = g;
    };
  (d(e, (p) => !(p.kind === "car" && f(p.x, p.z) && u.add(p.x, p.z))),
    u.size && d(s, (p) => !(p.parked && u.has(p.x, p.z))));
}
var Ri = (i, t = 0) => {
    let e = Math.imul(i | 0, 374761393) ^ Math.imul(t | 0, 668265263);
    return (
      (e = Math.imul(e ^ (e >>> 13), 1274126177)),
      ((e ^ (e >>> 16)) >>> 0) / 4294967296
    );
  },
  Yi = {
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
  co = (i, t, e = 0) => [i[0], i[1], i[2], (t * 16 + e + 0.5) / 256],
  hV = [
    null,
    [0.72, 0.66, 0.52],
    [0.8, 0.8, 0.78],
    [0.05, 0.16, 0.08],
    [0.45, 0.04, 0.04],
    [0.03, 0.05, 0.14],
    [0.02, 0.02, 0.02],
  ],
  npt = (i) => {
    if (!i) return 0;
    let t = 0,
      e = 1e9;
    for (let s = 1; s < hV.length; s++) {
      let n = hV[s],
        o = (n[0] - i[0]) ** 2 + (n[1] - i[1]) ** 2 + (n[2] - i[2]) ** 2;
      o < e && ((e = o), (t = s));
    }
    return t;
  },
  ck = [0.035, 0.035, 0.038],
  ipt = [0.3, 0.03, 0.025],
  gP = (i, t) => [i[0] - t[0], i[1] - t[1], i[2] - t[2]],
  bP = (i, t) => [
    i[1] * t[2] - i[2] * t[1],
    i[2] * t[0] - i[0] * t[2],
    i[0] * t[1] - i[1] * t[0],
  ],
  opt = (i, t) => i[0] * t[0] + i[1] * t[1] + i[2] * t[2];
function xo(i, t, e, s, n, o, a, r) {
  let l = bP(gP(e, t), gP(n, t));
  opt(l, r) >= 0
    ? i.quad(t, e, s, n, o[0], o[1], o[2], o[3], a)
    : i.quad(t, n, s, e, o[0], o[3], o[2], o[1], a);
}
var am = (i, t, e, s, n, o, a, r) => {
  (xo(i, t, e, s, n, o, a, r), xo(i, t, e, s, n, o, a, [-r[0], -r[1], -r[2]]));
};
