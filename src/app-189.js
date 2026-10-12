// app 189 — math
// Lines 107249-107590 of readable/app.pretty.js (statement-aligned).
function n$(i, t, e, s) {
  if (i.hide) return;
  if ($l) {
    let c = ZV($l, i);
    c && (t = t$(t, i, c));
  }
  let n = YV(i, s),
    o = (i.tcut ? Math.min(i.top - i.rh, i.tcut) : i.top - i.rh) + QV(i),
    a = Math.max(
      i.minh > 0 ? i.minh : i.st === 7 ? -2.5 : i.base - 0.3,
      i.cut || -1e9,
    ),
    r = n.st === 6 ? (n.glass ? 5 : [3, 4][n.office % 2]) : (VV[n.st] ?? 1),
    l = [...n.wall, (r + 0.5) / 16];
  for (let c of i.rings) {
    let h = c.length / 2,
      f = Cn(i.seed, 6) * 40;
    for (let u = 0; u < h; u++) {
      let d = c[u * 2],
        p = c[u * 2 + 1],
        m = c[((u + 1) % h) * 2],
        g = c[((u + 1) % h) * 2 + 1];
      (t.wall(d, p, m, g, a, a, o, o, l, f, i.base),
        (f += Math.hypot(m - d, g - p)));
    }
  }
  i.tcut ||
    (i.rs
      ? s$(
          n.st === 6 ? t : e,
          i,
          o,
          n.st === 6
            ? l
            : i.roofCol
              ? [...i.roofCol.slice(0, 3).map((c) => c * 0.85), 0]
              : i.tile
                ? [...$V.slice(0, 3).map((c) => c * 0.85), 0]
                : [...jV[i.seed % 3].map((c) => c * 0.45), 0],
          n.st === 6,
        )
      : Hb(e, i.rings, o, kP(i, n).far, !0));
}
function EP(i) {
  if (i.minh > i.base + 3) return null;
  let t = i.rings[0],
    e = 1e9,
    s = 1e9,
    n = -1e9,
    o = -1e9;
  for (let a = 0; a < t.length; a += 2)
    ((e = Math.min(e, t[a])),
      (n = Math.max(n, t[a])),
      (s = Math.min(s, t[a + 1])),
      (o = Math.max(o, t[a + 1])));
  return { t: "poly", pts: t, bb: [e, s, n, o], y0: i.base - 2, y1: i.top };
}
var i$ = Math.PI / 180,
  bk = [
    { id: 260519113, name: "Sing Chong", floors: 4 },
    { id: 260208816, name: "Sing Fat", floors: 4 },
  ],
  o$ = [-1096, 341],
  mu = { o: [-1246.3, 1222], n: [-Math.sin(9.3 * i$), -Math.cos(9.3 * i$)] };
mu.e = [-mu.n[1], mu.n[0]];
var Ji = { c: [-1098, -813], r0: 5.2, r1: 19 },
  Bpt = [
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
  Opt = [
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
  Hpt = () =>
    Opt.map(([i, t, e, s, n, o, a, r]) => ({
      name: i,
      c: [t, e],
      u: [s, n],
      n: [o, a],
      y: r,
      hw: 1.75,
      hl: 4.1,
    })),
  Dpt = null;
function Upt(i, t) {
  if (!t?.surfaceAt) return i;
  let e = (n) => {
      for (let o = -1; o <= 1; o += 0.25)
        for (let a = -1; a <= 1; a += 0.5) {
          let r = n.c[0] + n.u[0] * n.hl * o + n.n[0] * n.hw * a,
            l = n.c[1] + n.u[1] * n.hl * o + n.n[1] * n.hw * a;
          if (t.surfaceAt(r, l) === "road") return !1;
        }
      return !0;
    },
    s = [];
  for (let n of i) {
    if (e(n)) {
      s.push(n);
      continue;
    }
    let o = null;
    for (let a = 0.5; a <= 6 && !o; a += 0.5)
      for (let r of [1, -1]) {
        let l = { ...n, c: [n.c[0] + n.u[0] * a * r, n.c[1] + n.u[1] * a * r] };
        if (e(l)) {
          o = l;
          break;
        }
      }
    o && s.push(o);
  }
  return s;
}
function h$(i, t, e = !1) {
  return e ? Gpt(i, t) : (Dpt ||= Upt(Hpt(), t));
}
function Gpt(i, t) {
  let e = i.edges.filter((a) => a.name === "Market Street" && !(a.layer > 0)),
    s = {},
    n = {},
    o = [];
  for (let [a, r, l] of Bpt) {
    let c = null;
    for (let w of i.edges)
      if (w.name === a)
        for (let z of [0, w.n - 1]) {
          let _ = w.P[z * 3],
            R = w.P[z * 3 + 1];
          for (let T of e)
            (vs(T, _, R, s),
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
        z = n.z + f * l,
        _ = 1e9;
      for (let R of e)
        (vs(R, w, z, s),
          s.d < _ &&
            ((_ = s.d), (p = [R, Math.max(R.s0, Math.min(R.s1, s.s))])));
    }
    Ot(p[0], p[1], n);
    let m = -f,
      g = h;
    (m + g > 0 && ((m = -m), (g = -g)), r < 0 && ((m = -m), (g = -g)));
    let b = -1,
      x = -1;
    for (let w = 2; w < 40; w += 0.5) {
      let z = t.surfaceAt(n.x + m * w, n.z + g * w);
      if (z === "walk") (b < 0 && (b = w), (x = w));
      else if (b > 0 && z !== "walk") break;
    }
    if (b < 0 || x - b < 6.4) continue;
    let v = Math.min(b + 2.6 + 1.5, (b + x) / 2),
      y = n.x + m * v,
      M = n.z + g * v,
      S = t.probe(y, M);
    S.walk &&
      o.push({
        name: a,
        c: [y, M],
        u: [h, f],
        n: [m, g],
        y: S.walk.y,
        hw: 1.75,
        hl: 4.1,
      });
  }
  return o;
}
var Wpt = (i, t, e, s, n) =>
  [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([o, a]) => [
    i[0] + t[0] * s * o + e[0] * n * a,
    i[1] + t[1] * s * o + e[1] * n * a,
  ]);
function f$(i) {
  i.claim({ name: "singchong", ids: bk.map((t) => t.id), poly: null });
  for (let t of h$(i.D, i.L))
    i.claim({
      name: "bart",
      poly: Wpt(t.c, t.u, t.n, t.hl + 1.2, t.hw + 0.9),
      buildings: !1,
    });
  (i.claim({ name: "hallidie", ids: [128478751], poly: null }),
    i.claim({
      name: "hallidie",
      poly: Ho.poly.map(([t, e]) => Ho.at(t, e)),
      buildings: !1,
    }),
    i.claim({
      name: "pioneer",
      poly: Array.from({ length: 20 }, (t, e) => [
        Ji.c[0] + Math.cos((e / 20) * 2 * Math.PI) * (Ji.r1 + 2.5),
        Ji.c[1] + Math.sin((e / 20) * 2 * Math.PI) * (Ji.r1 + 2.5),
      ]),
      buildings: !1,
    }));
}
function ra(
  i,
  t,
  e,
  s,
  n,
  o,
  a,
  r,
  l,
  { top: c = !0, bottom: h = !1, topCol: f = null } = {},
) {
  let u = (p, m, g) => [
      t[0] + e[0] * n * p + s[0] * o * m,
      g,
      t[1] + e[1] * n * p + s[1] * o * m,
    ],
    d = (p, m, g, b, x) =>
      ne(i, [p, m, g, b], l, x, (v) => [
        v[0] * Math.abs(x[2]) + v[2] * Math.abs(x[0]) + (x[1] ? v[0] : 0),
        x[1] ? v[2] : v[1],
      ]);
  (d(u(1, -1, a), u(1, 1, a), u(1, 1, r), u(1, -1, r), [e[0], 0, e[1]]),
    d(u(-1, 1, a), u(-1, -1, a), u(-1, -1, r), u(-1, 1, r), [-e[0], 0, -e[1]]),
    d(u(-1, 1, a), u(1, 1, a), u(1, 1, r), u(-1, 1, r), [s[0], 0, s[1]]),
    d(u(1, -1, a), u(-1, -1, a), u(-1, -1, r), u(1, -1, r), [-s[0], 0, -s[1]]),
    c &&
      ne(
        i,
        [u(-1, -1, r), u(1, -1, r), u(1, 1, r), u(-1, 1, r)],
        f || l,
        [0, 1, 0],
        (p) => [p[0], p[2]],
      ),
    h &&
      ne(
        i,
        [u(-1, -1, a), u(1, -1, a), u(1, 1, a), u(-1, 1, a)],
        l,
        [0, -1, 0],
        (p) => [p[0], p[2]],
      ));
}
