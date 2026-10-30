// app 188 — math
// Lines 107489-107803 of readable/app.pretty.js (statement-aligned).
function aK(o, t, e, s) {
  if (o.hide) return;
  if (pc) {
    let c = eK(pc, o);
    c && (t = nK(t, o, c));
  }
  let n = QX(o, s),
    i = (o.tcut ? Math.min(o.top - o.rh, o.tcut) : o.top - o.rh) + sK(o),
    a = Math.max(
      o.minh > 0 ? o.minh : o.st === 7 ? -2.5 : o.base - 0.3,
      o.cut || -1e9,
    ),
    r = n.st === 6 ? (n.glass ? 5 : [3, 4][n.office % 2]) : (KX[n.st] ?? 1),
    l = [...n.wall, (r + 0.5) / 16];
  for (let c of o.rings) {
    let h = c.length / 2,
      f = Bn(o.seed, 6) * 40;
    for (let u = 0; u < h; u++) {
      let d = c[u * 2],
        p = c[u * 2 + 1],
        m = c[((u + 1) % h) * 2],
        g = c[((u + 1) % h) * 2 + 1];
      (t.wall(d, p, m, g, a, a, i, i, l, f, o.base),
        (f += Math.hypot(m - d, g - p)));
    }
  }
  o.tcut ||
    (o.rs
      ? oK(
          n.st === 6 ? t : e,
          o,
          i,
          n.st === 6
            ? l
            : o.roofCol
              ? [...o.roofCol.slice(0, 3).map((c) => c * 0.85), 0]
              : o.tile
                ? [...YX.slice(0, 3).map((c) => c * 0.85), 0]
                : [...XX[o.seed % 3].map((c) => c * 0.45), 0],
          n.st === 6,
        )
      : zx(e, o.rings, i, eL(o, n).far, !0));
}
function Bw(o) {
  if (o.minh > o.base + 3) return null;
  let t = o.rings[0],
    e = 1e9,
    s = 1e9,
    n = -1e9,
    i = -1e9;
  for (let r = 0; r < t.length; r += 2)
    ((e = Math.min(e, t[r])),
      (n = Math.max(n, t[r])),
      (s = Math.min(s, t[r + 1])),
      (i = Math.max(i, t[r + 1])));
  let a = {
    t: "poly",
    pts: t,
    bb: [e, s, n, i],
    y0: o.base - 2,
    y1: o.top,
    roof: !0,
  };
  if (o.rs && o.rh > 0) {
    let [r, l] = Ef(t);
    ((a.eave = o.top - o.rh),
      (a.rh = o.rh),
      (a.rs = o.rs),
      (a.cx = r),
      (a.cz = l));
  }
  return a;
}
var rK = Math.PI / 180,
  bz = [
    { id: 260519113, name: "Sing Chong", floors: 4 },
    { id: 260208816, name: "Sing Fat", floors: 4 },
  ],
  lK = [-1096, 341],
  Yu = { o: [-1246.3, 1222], n: [-Math.sin(9.3 * rK), -Math.cos(9.3 * rK)] };
Yu.e = [-Yu.n[1], Yu.n[0]];
var ao = { c: [-1098, -813], r0: 5.2, r1: 19 },
  rgt = [
    ["Drumm Street", 1, -14],
    ["Main Street", -1, -16],
    ["Front Street", 1, 14],
    ["Beale Street", -1, 14],
    ["Sutter Street", 1, -14],
    ["2nd Street", -1, 16],
    ["Montgomery Street", 1, -16],
    ["New Montgomery Street", -1, 18],
    ["Kearny Street", 1, -18],
    ["4th Street", -1, 14],
    ["Stockton Street", 1, -14],
    ["5th Street", -1, -16],
    ["7th Street", -1, 14],
    ["Charles J. Brenham Place", 1, -12],
    ["8th Street", -1, 16],
    ["Grove Street", 1, -14],
    ["Van Ness Avenue", 1, 16],
    ["South Van Ness Avenue", -1, 16],
    ["Church Street", 1, 14],
    ["Church Street", -1, -14],
  ],
  lgt = [
    ["Main Street", -230.626, 242.016, 0.707, -0.707, 0.707, 0.707, 3.391],
    ["Front Street", -411.932, 393.547, 0.708, -0.706, -0.706, -0.708, 4.194],
    ["Sutter Street", -570.184, 551.304, 0.704, -0.71, -0.71, -0.704, 7.169],
    ["2nd Street", -666.98, 683.33, 0.714, -0.701, 0.701, 0.714, 9.558],
    [
      "Montgomery Street",
      -787.285,
      768.007,
      0.703,
      -0.711,
      -0.711,
      -0.703,
      11.511,
    ],
    [
      "New Montgomery Street",
      -756.122,
      776.307,
      0.703,
      -0.711,
      0.711,
      0.703,
      10.767,
    ],
    ["Kearny Street", -916.037, 896.293, 0.705, -0.709, -0.709, -0.705, 13.97],
    ["4th Street", -1102.276, 1118.825, 0.708, -0.706, 0.706, 0.708, 12.635],
    [
      "Stockton Street",
      -1130.578,
      1110.249,
      0.708,
      -0.706,
      -0.706,
      -0.708,
      12.558,
    ],
    ["5th Street", -1302.519, 1319.714, 0.709, -0.705, 0.705, 0.709, 11.177],
    ["7th Street", -1646.475, 1662.027, 0.66, -0.752, 0.752, 0.66, 13.394],
    [
      "Charles J. Brenham Place",
      -1677.37,
      1653.517,
      0.66,
      -0.752,
      -0.752,
      -0.66,
      13.378,
    ],
    ["8th Street", -1880.836, 1896.212, 0.707, -0.707, 0.707, 0.707, 16.592],
    [
      "Van Ness Avenue",
      -2250.703,
      2223.167,
      0.716,
      -0.698,
      -0.698,
      -0.716,
      16.739,
    ],
    [
      "South Van Ness Avenue",
      -2230.111,
      2244.291,
      0.716,
      -0.698,
      0.698,
      0.716,
      16.614,
    ],
    ["Church Street", -3092.612, 3098.296, -0.198, -0.98, 0.98, -0.198, 30.126],
  ],
  cgt = () =>
    lgt.map(([o, t, e, s, n, i, a, r]) => ({
      name: o,
      c: [t, e],
      u: [s, n],
      n: [i, a],
      y: r,
      hw: 1.75,
      hl: 4.1,
    })),
  hgt = null;
function fgt(o, t) {
  if (!t?.surfaceAt) return o;
  let e = (n) => {
      for (let i = -1; i <= 1; i += 0.25)
        for (let a = -1; a <= 1; a += 0.5) {
          let r = n.c[0] + n.u[0] * n.hl * i + n.n[0] * n.hw * a,
            l = n.c[1] + n.u[1] * n.hl * i + n.n[1] * n.hw * a;
          if (t.surfaceAt(r, l) === "road") return !1;
        }
      return !0;
    },
    s = [];
  for (let n of o) {
    if (e(n)) {
      s.push(n);
      continue;
    }
    let i = null;
    for (let a = 0.5; a <= 6 && !i; a += 0.5)
      for (let r of [1, -1]) {
        let l = { ...n, c: [n.c[0] + n.u[0] * a * r, n.c[1] + n.u[1] * a * r] };
        if (e(l)) {
          i = l;
          break;
        }
      }
    i && s.push(i);
  }
  return s;
}
function dK(o, t, e = !1) {
  return e ? ugt(o, t) : (hgt ||= fgt(cgt(), t));
}
function ugt(o, t) {
  let e = o.edges.filter((a) => a.name === "Market Street" && !(a.layer > 0)),
    s = {},
    n = {},
    i = [];
  for (let [a, r, l] of rgt) {
    let c = null;
    for (let w of o.edges)
      if (w.name === a)
        for (let _ of [0, w.n - 1]) {
          let z = w.P[_ * 3],
            A = w.P[_ * 3 + 1];
          for (let T of e)
            (ys(T, z, A, s),
              s.d < 14 && (!c || s.d < c.d) && (c = { m: T, s: s.s, d: s.d }));
        }
    if (!c) continue;
    Ot(c.m, Math.max(c.m.s0, Math.min(c.m.s1, c.s)), n);
    let h = n.dx,
      f = n.dz;
    h - f < 0 && ((h = -h), (f = -f));
    let u = l * (n.dx * h + n.dz * f),
      d = Math.max(c.m.s0, Math.min(c.m.s1, c.s + u)),
      p = null;
    {
      let w = n.x + h * l,
        _ = n.z + f * l,
        z = 1e9;
      for (let A of e)
        (ys(A, w, _, s),
          s.d < z &&
            ((z = s.d), (p = [A, Math.max(A.s0, Math.min(A.s1, s.s))])));
    }
    Ot(p[0], p[1], n);
    let m = -f,
      g = h;
    (m + g > 0 && ((m = -m), (g = -g)), r < 0 && ((m = -m), (g = -g)));
    let b = -1,
      v = -1;
    for (let w = 2; w < 40; w += 0.5) {
      let _ = t.surfaceAt(n.x + m * w, n.z + g * w);
      if (_ === "walk") (b < 0 && (b = w), (v = w));
      else if (b > 0 && _ !== "walk") break;
    }
    if (b < 0 || v - b < 6.4) continue;
    let x = Math.min(b + 2.6 + 1.5, (b + v) / 2),
      y = n.x + m * x,
      M = n.z + g * x,
      S = t.probe(y, M);
    S.walk &&
      i.push({
        name: a,
        c: [y, M],
        u: [h, f],
        n: [m, g],
        y: S.walk.y,
        hw: 1.75,
        hl: 4.1,
      });
  }
  return i;
}
var dgt = (o, t, e, s, n) =>
  [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([i, a]) => [
    o[0] + t[0] * s * i + e[0] * n * a,
    o[1] + t[1] * s * i + e[1] * n * a,
  ]);
function pK(o) {
  o.claim({ name: "singchong", ids: bz.map((t) => t.id), poly: null });
  for (let t of dK(o.D, o.L))
    o.claim({
      name: "bart",
      poly: dgt(t.c, t.u, t.n, t.hl + 1.2, t.hw + 0.9),
      buildings: !1,
    });
  (o.claim({ name: "hallidie", ids: [128478751], poly: null }),
    o.claim({
      name: "hallidie",
      poly: Ko.poly.map(([t, e]) => Ko.at(t, e)),
      buildings: !1,
    }),
    o.claim({
      name: "pioneer",
      poly: Array.from({ length: 20 }, (t, e) => [
        ao.c[0] + Math.cos((e / 20) * 2 * Math.PI) * (ao.r1 + 2.5),
        ao.c[1] + Math.sin((e / 20) * 2 * Math.PI) * (ao.r1 + 2.5),
      ]),
      buildings: !1,
    }));
}
