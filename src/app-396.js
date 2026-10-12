// app 396 — push
// Lines 193978-194280 of readable/app.pretty.js (statement-aligned).
var vn = {
    water: "#0d2231",
    shore: "#24506a",
    land: "#1e2125",
    decor: "#2a2d33",
    walk: "#2d3036",
    block: "#222529",
    park: "#1b3325",
    parkEdge: "#23402d",
    lawn: "#22402a",
    beach: "#3a3528",
    plaza: "#34363a",
    pier: "#34383f",
    pierEdge: "#4a5058",
    minor: "#4d525b",
    major: "#6a655c",
    blvd: "#8a7f6b",
    median: "#2d2f33",
    cable: "#8b6a44",
    hwy: "#d08a36",
    hwyCase: "#2a1c0c",
    gg: "#d9502b",
    ggCase: "#3a140a",
    bb: "#a9b3bd",
    bbCase: "#1a1e22",
    label: "#d9dde2",
    labelMajor: "#f1e6d0",
    halo: "rgba(8,10,12,.92)",
    hood: "rgba(200,205,212,.55)",
    waterLabel: "#5f8aa3",
    lm: "#1592a8",
    lmPark: "#2f8a52",
    lmBridge: "#c8452c",
    arrow: "#ff5a1f",
  },
  WE = (i) => (i.hw >= 13 ? 2 : i.lanes >= 2 || i.hw >= 7.5 ? 1 : 0),
  hMt = [vn.minor, vn.major, vn.blvd],
  bN = (i) => i.toLowerCase().replace(/\b[a-z]/g, (t) => t.toUpperCase());
function cv(i, t) {
  let e = i[0][0] > i[i.length - 1][0] ? i.slice().reverse() : i;
  if (t <= e[0][0]) return e[0][1];
  if (t >= e[e.length - 1][0]) return e[e.length - 1][1];
  for (let s = 0; s + 1 < e.length; s++)
    if (t <= e[s + 1][0]) {
      let n = (t - e[s][0]) / (e[s + 1][0] - e[s][0]);
      return e[s][1] + (e[s + 1][1] - e[s][1]) * n;
    }
  return e[e.length - 1][1];
}
var Op = 3e4,
  Get = [
    [Ve.x, Op],
    [Ve.x, Ve.z],
    ...j0,
    [-Op, j0[j0.length - 1][1]],
    [-Op, Op],
  ],
  fMt = [
    [-Op, Jp[0][1]],
    ...Jp,
    [-1150, -7e3],
    [-900, -7800],
    [-400, -8600],
    [-400, -Op],
    [-Op, -Op],
  ],
  uMt = [
    { e: [-485, -6190, 620 * 2.45, 560 * 2.45, 0] },
    { e: [4560, -80, 310 * 2.29, 250 * 2.29, 0] },
    { r: [3753, -2137, 894, 1274, 40] },
    { e: [200, -2500, 250, 105, -0.45] },
  ],
  i2 = -1971,
  qE = -5324,
  dMt = 1976,
  pMt = [
    [i2, cv(j0, i2)],
    ...j0.filter((i) => i[0] < i2 && i[0] > qE),
    [qE, cv(j0, qE)],
    [qE, 1250],
    [-5050, 1640],
    [-4350, dMt],
    [-3100, 1930],
    [-2450, 1700],
    [i2, 1660],
  ],
  Bp = [];
{
  let i = [
      "FRANKLIN ST",
      "GOUGH ST",
      "OCTAVIA ST",
      "LAGUNA ST",
      "BUCHANAN ST",
      "WEBSTER ST",
      "FILLMORE ST",
      "STEINER ST",
      "PIERCE ST",
      "SCOTT ST",
      "DIVISADERO ST",
      "BRODERICK ST",
      "BAKER ST",
      "LYON ST",
    ],
    t = fe[ws - 1];
  (i.forEach((e, s) => {
    let n = -((s + 1) / i.length) * -i2;
    Bp.push({ name: e, col: !0, a: [n, -400], b: [n, t] });
  }),
    Qe.forEach((e, s) => {
      s > 0 &&
        s !== Oi.j &&
        s < ws - 1 &&
        Bp.push({ name: e.name, a: [i2, fe[s]], b: [ae[0] - ls[0].hw, fe[s]] });
    }),
    Bp.push({
      name: "MARINA BLVD",
      poly: [
        [-140, -150],
        [-700, -150],
        [-1250, -150],
        [-1650, -120],
        [-1950, -60],
      ],
    }),
    [
      ["MISSION ST", 260],
      ["HOWARD ST", 430],
      ["FOLSOM ST", 600],
      ["HARRISON ST", 770],
      ["BRYANT ST", 940],
      ["BRANNAN ST", 1110],
      ["TOWNSEND ST", 1280],
    ].forEach(([e, s]) =>
      Bp.push({ name: e, a: [-600, t + s], b: [Ve.x, t + s] }),
    ),
    [
      ["FREMONT ST", 1570],
      ["1ST ST", 1450],
      ["2ND ST", 1230],
      ["3RD ST", 1010],
      ["4TH ST", 790],
      ["5TH ST", 570],
      ["6TH ST", 350],
      ["7TH ST", 130],
      ["8TH ST", -90],
    ].forEach(([e, s]) =>
      Bp.push({
        name: e,
        col: !0,
        a: [s, t + Qe[ws - 1].hw + Qe[ws - 1].sw],
        b: [s, t + 1500],
      }),
    ));
  for (let e of Bp) {
    (e.poly || (e.poly = [e.a, e.b]), (e.dir = e.col ? [0, 1] : [1, 0]));
    let [s, n] = [e.poly[0], e.poly[e.poly.length - 1]],
      o = Math.hypot(n[0] - s[0], n[1] - s[1]),
      a = Math.max(1, Math.round(o / 260));
    e.pts =
      e.poly.length > 2
        ? [e.poly[2]]
        : Array.from({ length: a }, (r, l) => [
            s[0] + ((n[0] - s[0]) * (l + 0.5)) / a,
            s[1] + ((n[1] - s[1]) * (l + 0.5)) / a,
          ]);
  }
}
var vN = (i, t, e) => {
    let s = [];
    for (let n = i; n >= t; n -= 50) s.push([n, cv(j0, n) + 3]);
    s.push([t, cv(j0, t) + 3]);
    for (let n = t; n <= i; n += 50) s.push([n, cv(j0, n) + e]);
    return (s.push([i, cv(j0, i) + e]), s);
  },
  mMt = vN(-704, -1188, 140),
  gMt = vN(-2350, -3750, 120),
  bMt = vN(-2300, -3900, 22),
  n2 = [to.west(-122.4484), fe[4] + 175],
  $u = [];
{
  let i = fe[0] - Qe[0].hw,
    t = fe[ws - 1] + Qe[ws - 1].hw,
    e = ae[0] - ls[0].hw,
    s = ae[mn - 1] + ls[mn - 1].hw;
  (ls.forEach((n, o) =>
    $u.push({
      name: n.name,
      c: WE(n),
      hw: n.hw,
      sw: n.sw,
      cable: n.cable,
      col: !0,
      idx: o,
      a: [ae[o], i],
      b: [ae[o], o === mn - 1 ? t + 100 : t],
    }),
  ),
    Qe.forEach((n, o) => {
      let a = [o === Oi.j ? ae[0] - 124 : e, fe[o]],
        r = [s, fe[o]];
      o === Oi.j
        ? ($u.push({
            name: n.name,
            c: WE(n),
            hw: n.hw,
            sw: n.sw,
            row: !0,
            idx: o,
            a,
            b: [Oi.x0, fe[o]],
          }),
          $u.push({
            name: n.name,
            c: WE(n),
            hw: n.hw,
            sw: n.sw,
            row: !0,
            idx: o,
            a: [Oi.x1, fe[o]],
            b: r,
          }))
        : $u.push({
            name: n.name,
            c: WE(n),
            hw: n.hw,
            sw: n.sw,
            cable: n.cable,
            row: !0,
            idx: o,
            a,
            b: r,
          });
    }));
  for (let n of $u) {
    if (((n.pts = []), n.col))
      for (let o = 0; o + 1 < ws; o++) {
        let a = (fe[o] + fe[o + 1]) / 2;
        a > n.a[1] && a < n.b[1] && n.pts.push([n.a[0], a]);
      }
    else
      for (let o = -1; o + 1 < mn; o++) {
        let a = o < 0 ? ae[0] - 62 : (ae[o] + ae[o + 1]) / 2;
        a > n.a[0] && a < n.b[0] && n.pts.push([a, n.a[1]]);
      }
    n.dir = n.col ? [0, 1] : [1, 0];
  }
}
var xMt = (() => {
    let i = [],
      e = Oi.x0 + 3,
      s = Oi.x1 - 3,
      n = Oi.z;
    i.push([Oi.x0 - 1, n]);
    for (let o = 0; o <= 8; o++)
      i.push([
        e + ((s - e) * o) / 8,
        n + (o === 0 || o === 8 ? 0 : o % 2 ? -4.2 : 4.2),
      ]);
    return (i.push([Oi.x1 + 1, n]), i);
  })(),
  XE = (i, t) => {
    let e = 0,
      s = 1e18;
    return (
      i.pts.forEach((n, o) => {
        let a = (n[0] - t[0]) ** 2 + (n[2] - t[1]) ** 2;
        a < s && ((s = a), (e = o));
      }),
      i.s[e]
    );
  },
  AM = Qi.find((i) => i.id === "101"),
  jE = Qi.find((i) => i.id === "80"),
  YE = new Map();
AM && YE.set(AM, [XE(AM, Ye.at(Ye.sAnchS)), XE(AM, Ye.at(Ye.sAnchN))]);
jE && YE.set(jE, [XE(jE, Je.at(Je.anch)), XE(jE, Je.at(Je.anchE))]);
var qet = (i, t) => {
    let e = 0;
    for (; e + 2 < i.s.length && i.s[e + 1] < t;) e++;
    let s = Math.min(1, Math.max(0, (t - i.s[e]) / (i.s[e + 1] - i.s[e] || 1))),
      n = i.pts[e],
      o = i.pts[e + 1];
    return [n[0] + (o[0] - n[0]) * s, n[2] + (o[2] - n[2]) * s];
  },
  jet = [],
  Wet = (i, t, e, s, n) => ({
    name: n,
    c: 3,
    bridge: !0,
    dir: s,
    pts: Array.from({ length: Math.ceil((e - t) / 160) }, (o, a) =>
      i(t + ((a + 0.5) * (e - t)) / Math.ceil((e - t) / 160)),
    ),
  }),
  vMt = [
    ...$u,
    Wet(Ye.at, Ye.sAnchS, Ye.sAnchN, Ye.dir, "GOLDEN GATE BRIDGE"),
    Wet(Je.at, Je.anch, Je.anchE, Je.dir, "BAY BRIDGE"),
  ];
for (let i of Qi)
  for (let t = 160; t < i.len - 60; t += 520)
    jet.push({ id: i.id, p: qet(i, t) });
