// app 413 — push
// Lines 201796-202121 of readable/app.pretty.js (statement-aligned).
function q2(o, t, e, s, n, i = "#ff5a1f") {
  (o.save(),
    o.translate(t, e),
    o.rotate(s),
    (o.shadowColor = "rgba(0,0,0,.7)"),
    (o.shadowBlur = n * 0.5),
    o.beginPath(),
    o.moveTo(0, -n),
    o.lineTo(n * 0.72, n * 0.78),
    o.lineTo(0, n * 0.4),
    o.lineTo(-n * 0.72, n * 0.78),
    o.closePath(),
    (o.fillStyle = i),
    o.fill(),
    (o.shadowBlur = 0),
    (o.lineWidth = Math.max(1.2, n * 0.14)),
    (o.strokeStyle = "#fff"),
    (o.lineJoin = "round"),
    o.stroke(),
    o.restore());
}
var c9 = (o, t) =>
  o.some((e) => t[0] < e[2] && t[2] > e[0] && t[1] < e[3] && t[3] > e[1]);
var zn = {
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
  h9 = (o) => (o.hw >= 13 ? 2 : o.lanes >= 2 || o.hw >= 7.5 ? 1 : 0),
  ekt = [zn.minor, zn.major, zn.blvd],
  xN = (o) => o.toLowerCase().replace(/\b[a-z]/g, (t) => t.toUpperCase());
function s3(o, t) {
  let e = o[0][0] > o[o.length - 1][0] ? o.slice().reverse() : o;
  if (t <= e[0][0]) return e[0][1];
  if (t >= e[e.length - 1][0]) return e[e.length - 1][1];
  for (let s = 0; s + 1 < e.length; s++)
    if (t <= e[s + 1][0]) {
      let n = (t - e[s][0]) / (e[s + 1][0] - e[s][0]);
      return e[s][1] + (e[s + 1][1] - e[s][1]) * n;
    }
  return e[e.length - 1][1];
}
var y1 = 3e4,
  eot = [
    [Ye.x, y1],
    [Ye.x, Ye.z],
    ...gl,
    [-y1, gl[gl.length - 1][1]],
    [-y1, y1],
  ],
  skt = [
    [-y1, F1[0][1]],
    ...F1,
    [-1150, -7e3],
    [-900, -7800],
    [-400, -8600],
    [-400, -y1],
    [-y1, -y1],
  ],
  nkt = [
    { e: [-485, -6190, 620 * 2.45, 560 * 2.45, 0] },
    { e: [4560, -80, 310 * 2.29, 250 * 2.29, 0] },
    { r: [3753, -2137, 894, 1274, 40] },
    { e: [200, -2500, 250, 105, -0.45] },
  ],
  $2 = -1971,
  f9 = -5324,
  ikt = 1976,
  okt = [
    [$2, s3(gl, $2)],
    ...gl.filter((o) => o[0] < $2 && o[0] > f9),
    [f9, s3(gl, f9)],
    [f9, 1250],
    [-5050, 1640],
    [-4350, ikt],
    [-3100, 1930],
    [-2450, 1700],
    [$2, 1660],
  ],
  v1 = [];
{
  let o = [
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
    t = pe[ks - 1];
  (o.forEach((e, s) => {
    let n = -((s + 1) / o.length) * -$2;
    v1.push({ name: e, col: !0, a: [n, -400], b: [n, t] });
  }),
    ns.forEach((e, s) => {
      s > 0 &&
        s !== Yi.j &&
        s < ks - 1 &&
        v1.push({ name: e.name, a: [$2, pe[s]], b: [he[0] - ps[0].hw, pe[s]] });
    }),
    v1.push({
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
      v1.push({ name: e, a: [-600, t + s], b: [Ye.x, t + s] }),
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
      v1.push({
        name: e,
        col: !0,
        a: [s, t + ns[ks - 1].hw + ns[ks - 1].sw],
        b: [s, t + 1500],
      }),
    ));
  for (let e of v1) {
    (e.poly || (e.poly = [e.a, e.b]), (e.dir = e.col ? [0, 1] : [1, 0]));
    let [s, n] = [e.poly[0], e.poly[e.poly.length - 1]],
      i = Math.hypot(n[0] - s[0], n[1] - s[1]),
      a = Math.max(1, Math.round(i / 260));
    e.pts =
      e.poly.length > 2
        ? [e.poly[2]]
        : Array.from({ length: a }, (r, l) => [
            s[0] + ((n[0] - s[0]) * (l + 0.5)) / a,
            s[1] + ((n[1] - s[1]) * (l + 0.5)) / a,
          ]);
  }
}
var yN = (o, t, e) => {
    let s = [];
    for (let n = o; n >= t; n -= 50) s.push([n, s3(gl, n) + 3]);
    s.push([t, s3(gl, t) + 3]);
    for (let n = t; n <= o; n += 50) s.push([n, s3(gl, n) + e]);
    return (s.push([o, s3(gl, o) + e]), s);
  },
  akt = yN(-704, -1188, 140),
  rkt = yN(-2350, -3750, 120),
  lkt = yN(-2300, -3900, 22),
  j2 = [po.west(-122.4484), pe[4] + 175],
  Rd = [];
{
  let o = pe[0] - ns[0].hw,
    t = pe[ks - 1] + ns[ks - 1].hw,
    e = he[0] - ps[0].hw,
    s = he[xn - 1] + ps[xn - 1].hw;
  (ps.forEach((n, i) =>
    Rd.push({
      name: n.name,
      c: h9(n),
      hw: n.hw,
      sw: n.sw,
      cable: n.cable,
      col: !0,
      idx: i,
      a: [he[i], o],
      b: [he[i], i === xn - 1 ? t + 100 : t],
    }),
  ),
    ns.forEach((n, i) => {
      let a = [i === Yi.j ? he[0] - 124 : e, pe[i]],
        r = [s, pe[i]];
      i === Yi.j
        ? (Rd.push({
            name: n.name,
            c: h9(n),
            hw: n.hw,
            sw: n.sw,
            row: !0,
            idx: i,
            a,
            b: [Yi.x0, pe[i]],
          }),
          Rd.push({
            name: n.name,
            c: h9(n),
            hw: n.hw,
            sw: n.sw,
            row: !0,
            idx: i,
            a: [Yi.x1, pe[i]],
            b: r,
          }))
        : Rd.push({
            name: n.name,
            c: h9(n),
            hw: n.hw,
            sw: n.sw,
            cable: n.cable,
            row: !0,
            idx: i,
            a,
            b: r,
          });
    }));
  for (let n of Rd) {
    if (((n.pts = []), n.col))
      for (let i = 0; i + 1 < ks; i++) {
        let a = (pe[i] + pe[i + 1]) / 2;
        a > n.a[1] && a < n.b[1] && n.pts.push([n.a[0], a]);
      }
    else
      for (let i = -1; i + 1 < xn; i++) {
        let a = i < 0 ? he[0] - 62 : (he[i] + he[i + 1]) / 2;
        a > n.a[0] && a < n.b[0] && n.pts.push([a, n.a[1]]);
      }
    n.dir = n.col ? [0, 1] : [1, 0];
  }
}
var ckt = (() => {
    let o = [],
      e = Yi.x0 + 3,
      s = Yi.x1 - 3,
      n = Yi.z;
    o.push([Yi.x0 - 1, n]);
    for (let i = 0; i <= 8; i++)
      o.push([
        e + ((s - e) * i) / 8,
        n + (i === 0 || i === 8 ? 0 : i % 2 ? -4.2 : 4.2),
      ]);
    return (o.push([Yi.x1 + 1, n]), o);
  })(),
  m9 = (o, t) => {
    let e = 0,
      s = 1e18;
    return (
      o.pts.forEach((n, i) => {
        let a = (n[0] - t[0]) ** 2 + (n[2] - t[1]) ** 2;
        a < s && ((s = a), (e = i));
      }),
      o.s[e]
    );
  },
  L4 = uo.find((o) => o.id === "101"),
  u9 = uo.find((o) => o.id === "80"),
  b9 = new Map();
L4 && b9.set(L4, [m9(L4, Qe.at(Qe.sAnchS)), m9(L4, Qe.at(Qe.sAnchN))]);
u9 && b9.set(u9, [m9(u9, ts.at(ts.anch)), m9(u9, ts.at(ts.anchE))]);
var not = (o, t) => {
    let e = 0;
    for (; e + 2 < o.s.length && o.s[e + 1] < t;) e++;
    let s = Math.min(1, Math.max(0, (t - o.s[e]) / (o.s[e + 1] - o.s[e] || 1))),
      n = o.pts[e],
      i = o.pts[e + 1];
    return [n[0] + (i[0] - n[0]) * s, n[2] + (i[2] - n[2]) * s];
  },
  iot = [],
  sot = (o, t, e, s, n) => ({
    name: n,
    c: 3,
    bridge: !0,
    dir: s,
    pts: Array.from({ length: Math.ceil((e - t) / 160) }, (i, a) =>
      o(t + ((a + 0.5) * (e - t)) / Math.ceil((e - t) / 160)),
    ),
  }),
  hkt = [
    ...Rd,
    sot(Qe.at, Qe.sAnchS, Qe.sAnchN, Qe.dir, "GOLDEN GATE BRIDGE"),
    sot(ts.at, ts.anch, ts.anchE, ts.dir, "BAY BRIDGE"),
  ];
for (let o of uo)
  for (let t = 160; t < o.len - 60; t += 520)
    iot.push({ id: o.id, p: not(o, t) });
