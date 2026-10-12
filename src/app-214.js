// app 214 — grid
// Lines 114511-114761 of readable/app.pretty.js (statement-aligned).
var gX = -9.5,
  Ymt = -44.7,
  bX = [
    {
      name: "transamerica",
      fn: "buildTransamerica",
      grid: [1289.5, 1050],
      osm: [24222973],
      at: [-817.8, 40.5],
      block: [
        12,
        13,
        {
          W: "Montgomery Street",
          E: { at: [-747.7, 34.5] },
          N: "Washington Street",
          S: "Clay Street",
        },
      ],
      cull: 9e3,
    },
    {
      name: "coit",
      fn: "buildCoit",
      grid: [1188, 371.5],
      osm: [28824850],
      at: [-1085.5, -760.5],
      loop: [-1098, -813],
      claimR: 17,
      cull: 7e3,
    },
    {
      name: "unionsq",
      fn: "buildUnionSquare",
      grid: [892.5, 1638],
      at: [-1236, 843],
      solid: !0,
      block: [
        8,
        20,
        {
          W: { name: "Powell Street", hw: 5.4 },
          E: "Stockton Street",
          N: "Post Street",
          S: "Geary Street",
        },
      ],
      cull: 1600,
    },
    {
      name: "grace",
      fn: "buildGrace",
      grid: [604, 1227.5],
      osm: [32946942],
      at: [-1712.7, 401],
      block: [
        5,
        15,
        {
          W: { off: -101.8 },
          E: "Taylor Street",
          N: { off: -33.8 },
          S: "California Street",
        },
      ],
      cull: 5e3,
    },
    {
      name: "fairmont",
      fn: "buildFairmont",
      grid: [787.5, 1218],
      osm: [16217497, 436477702],
      at: [-1463.5, 342],
      block: [
        7,
        15,
        {
          W: "Mason Street",
          E: "Powell Street",
          N: "Sacramento Street",
          S: "California Street",
        },
      ],
      cull: 5e3,
    },
    {
      name: "sspp",
      fn: "buildSSPP",
      grid: [892.5, 400],
      osm: [29902626],
      at: [-1475.8, -672.7],
      block: [
        8,
        5,
        {
          W: "Powell Street",
          E: { mirror: "W" },
          N: { off: -30 },
          S: "Filbert Street",
        },
      ],
      cull: 5e3,
    },
    {
      name: "ca555",
      fn: "build555",
      grid: [1189, 1314.5],
      osm: [288511106],
      at: [-904.5, 380.5],
      fp: { x0: 1152, x1: 1226, z0: 1294, z1: 1335 },
      block: [
        11,
        16,
        {
          W: "Kearny Street",
          E: { off: 67 },
          N: "California Street",
          S: "Pine Street",
        },
      ],
      cull: 9e3,
    },
    {
      name: "dragongate",
      fn: "buildChinatown",
      grid: [1050, 1428],
      at: [-1065.2, 551.2],
      block: [10, 18, { W: "Grant Avenue", N: "Bush Street" }],
      gate: !0,
      cull: 1500,
    },
    {
      name: "powell",
      fn: "buildPowell",
      grid: [840, 1800],
      at: [-1246.3, 1222],
      bearing: -9.3,
      turntable: !0,
      cull: 1200,
    },
    {
      name: "salesforce",
      fn: "buildSalesforceTower",
      grid: [1592, 2030],
      osm: [431972186],
      at: [-304.4, 638.5],
      bearing: Ymt,
      claimR: 30,
      cull: 2e4,
    },
    {
      name: "transit",
      fn: "buildTransitCenter",
      grid: [0, 0],
      osm: [542375290],
      at: [-297.3, 713.2],
      bearing: -45,
      tc: { x0: -218.7, x1: 218.7, z0: -27.9, z1: 27.9 },
      cull: 3e3,
    },
  ];
function xX(i, t) {
  return i.frame({ at: t.at, grid: t.grid, bearing: t.bearing ?? gX });
}
function vX(i, t, e) {
  let [s, n, o] = e.block,
    a = {},
    r = [];
  for (let h of ["W", "E", "N", "S"]) {
    let f = o[h];
    f == null ||
      f.mirror ||
      (typeof f == "string" || f.at
        ? (a[h] = f)
        : f.name
          ? ((a[h] = f.name), r.push([h, f]))
          : f.off != null &&
            (a[h] = {
              at:
                h === "W" || h === "E"
                  ? t.fwd(t.gx + f.off, t.gz)
                  : t.fwd(t.gx, t.gz + f.off),
            }));
  }
  let l = PS(i.D, t, s, n, a),
    c = (h) =>
      h === "W" ? ls[s] : h === "E" ? ls[s + 1] : h === "N" ? Qe[n] : Qe[n + 1];
  for (let [h, f] of r)
    (f.hw != null && l.push([c(h), "hw", f.hw]),
      f.sw != null && l.push([c(h), "sw", f.sw]));
  if (o.E?.mirror) {
    let h = (u, d) => {
        let p;
        for (let [m, g, b] of l) m === u && g === d && (p = b);
        return p;
      },
      f = h(ae, s) + h(ls[s], "hw") + h(ls[s], "sw");
    l.push(
      [ae, s + 1, 2 * t.gx - f],
      [ls[s + 1], "hw", 0],
      [ls[s + 1], "sw", 0],
    );
  }
  return l;
}
function Jmt(i) {
  let t = [];
  for (let e of i) {
    if (e.t === "circ") {
      Qr(e.x, e.z) !== "road" && t.push(e);
      continue;
    }
    if (e.t !== "box") {
      t.push(e);
      continue;
    }
    let s = e.x1 - e.x0,
      n = e.z1 - e.z0,
      o = Math.min(4, Math.max(0.5, Math.min(s, n) / 3)),
      a = Math.max(1, Math.round(s / o)),
      r = Math.max(1, Math.round(n / o)),
      l = (c, h) => Qr(c, h) === "road";
    for (let c = 0; c < r; c++) {
      let h = e.z0 + (n * c) / r,
        f = e.z0 + (n * (c + 1)) / r,
        u = null;
      for (let d = 0; d <= a; d++) {
        let p = e.x0 + (s * d) / a,
          m = e.x0 + (s * (d + 1)) / a;
        d < a &&
        ![
          [p, h],
          [m, h],
          [p, f],
          [m, f],
          [(p + m) / 2, (h + f) / 2],
        ].some(([b, x]) => l(b, x))
          ? u
            ? (u.x1 = m)
            : (u = { ...e, x0: p, x1: m, z0: h, z1: f })
          : u && (t.push(u), (u = null));
      }
    }
  }
  ((i.length = 0), i.push(...t));
}
var Zmt = (i, t, e, s = 20) =>
  Array.from({ length: s }, (n, o) => [
    i + Math.cos((o / s) * 2 * Math.PI) * e,
    t + Math.sin((o / s) * 2 * Math.PI) * e,
  ]);
