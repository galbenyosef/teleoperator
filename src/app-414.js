// app 414 — col
// Lines 202122-202460 of readable/app.pretty.js (statement-aligned).
var e3 = (o, t) => {
    let e = Wa(o, t);
    return [(e.x0 + e.x1) / 2, (e.z0 + e.z1) / 2];
  },
  oot = [
    {
      name: "Golden Gate Bridge",
      icon: "bridge",
      col: zn.lmBridge,
      p: Qe.at((Qe.sTowerS + Qe.sTowerN) / 2),
      tier: 0,
    },
    {
      name: "Bay Bridge",
      icon: "bridge",
      col: zn.lmBridge,
      p: ts.at(ts.towers[1]),
      tier: 0,
    },
    { name: "Alcatraz", icon: "light", col: zn.lm, p: [200, -2500], tier: 0 },
    {
      name: "Ferry Building",
      icon: "clock",
      col: zn.lm,
      p: [Ye.x + 20, pe[ks - 1]],
      tier: 0,
    },
    { name: "Coit Tower", icon: "coit", col: zn.lm, p: e3(11, 5), tier: 0 },
    {
      name: "Transamerica Pyramid",
      icon: "pyramid",
      col: zn.lm,
      p: e3(12, 13),
      tier: 0,
    },
    {
      name: "Salesforce Tower",
      icon: "sky",
      col: zn.lm,
      p: [1500, pe[ks - 1] + 380],
      tier: 0,
    },
    {
      name: "Lombard St",
      icon: "zig",
      col: zn.lm,
      p: [(he[3] + he[4]) / 2, pe[4]],
      tier: 0,
    },
    {
      name: "Pier 39",
      icon: "pier",
      col: zn.lm,
      p: [(he[8] + he[9]) / 2 + 4, Ye.z - 170],
      tier: 0,
    },
    {
      name: "Union Square",
      icon: "star",
      col: zn.lmPark,
      p: e3(8, 20),
      tier: 1,
    },
    { name: "Ghirardelli Square", icon: "g", col: zn.lm, p: e3(1, 0), tier: 1 },
    {
      name: "Grace Cathedral",
      icon: "cross",
      col: zn.lm,
      p: e3(5, 15),
      tier: 1,
    },
    { name: "Palace of Fine Arts", icon: "dome", col: zn.lm, p: j2, tier: 1 },
    ...[...(k3.park || []), ...(k3.washington || [])].map(([o, t, e]) => ({
      name: e,
      icon: "tree",
      col: zn.lmPark,
      p: e3(o, t),
      tier: 2,
    })),
  ],
  fkt = [
    ["RUSSIAN HILL", 330, 520],
    ["NOB HILL", 560, 1330],
    ["TELEGRAPH HILL", 1230, 330],
    ["NORTH BEACH", 900, 690],
    ["CHINATOWN", 1040, 1110],
    ["FINANCIAL DISTRICT", 1470, 1420],
    ["FISHERMAN'S WHARF", 520, -60],
    ["PACIFIC HEIGHTS", -700, 1050],
    ["MARINA", -1150, 60],
    ["COW HOLLOW", -1250, 620],
    ["PRESIDIO", -3700, 1e3],
    ["SOMA", 950, 2500],
    ["TENDERLOIN", 350, 1850],
    ["MARIN HEADLANDS", -6200, -3300],
    ["YERBA BUENA ISLAND", 4560, 330],
    ["TREASURE ISLAND", 4200, -1500],
    ["ANGEL ISLAND", -485, -6190],
  ],
  ukt = [
    ["San Francisco Bay", 2200, -1200],
    ["Golden Gate", -4400, -1250],
    ["Pacific Ocean", -8200, -900],
  ],
  aot = null;
function C4(o, t) {
  (o.beginPath(), o.moveTo(t[0][0], t[0][1]));
  for (let e = 1; e < t.length; e++) o.lineTo(t[e][0], t[e][1]);
  o.closePath();
}
function dkt(o, t) {
  if ((o.beginPath(), t.e))
    o.ellipse(t.e[0], t.e[1], t.e[2], t.e[3], t.e[4], 0, Math.PI * 2);
  else {
    let [e, s, n, i, a] = t.r;
    o.roundRect(e, s, n, i, a);
  }
}
function d9(o, t, e, s, n, i = "butt") {
  ((o.strokeStyle = n),
    (o.lineWidth = s),
    (o.lineCap = i),
    o.beginPath(),
    o.moveTo(t[0], t[1]),
    o.lineTo(e[0], e[1]),
    o.stroke());
}
function p9(o, t, e = 0, s = 1 / 0) {
  o.beginPath();
  let n = !1;
  t.pts.forEach((i, a) => {
    t.s[a] < e - 8 ||
      t.s[a] > s + 8 ||
      (n ? o.lineTo(i[0], i[2]) : (o.moveTo(i[0], i[2]), (n = !0)));
  });
}
function rot(o, t, e) {
  let s = (c) => c / t,
    n = (c, h) => Math.max(c, h / t);
  ((o.fillStyle = zn.water),
    o.fillRect(e[0], e[1], e[2] - e[0], e[3] - e[1]),
    (o.fillStyle = zn.land),
    (o.strokeStyle = zn.shore),
    (o.lineWidth = s(1.5)),
    (o.lineJoin = "round"));
  for (let c of [eot, skt]) (C4(o, c), o.fill(), o.stroke());
  for (let c of nkt) (dkt(o, c), o.fill(), o.stroke());
  ((o.fillStyle = zn.park),
    (o.strokeStyle = zn.parkEdge),
    (o.lineWidth = s(1)),
    C4(o, okt),
    o.fill());
  for (let [c, h] of [
    [akt, zn.lawn],
    [rkt, zn.lawn],
    [lkt, zn.beach],
  ])
    ((o.fillStyle = h), C4(o, c), o.fill());
  ((o.fillStyle = zn.lawn),
    o.beginPath(),
    o.roundRect(j2[0] - 170, j2[1] - 120, 340, 250, 30),
    o.fill(),
    (o.fillStyle = zn.water),
    o.beginPath(),
    o.ellipse(j2[0] - 20, j2[1] + 20, 95, 55, 0.2, 0, Math.PI * 2),
    o.fill(),
    (o.fillStyle = zn.plaza),
    o.beginPath(),
    o.arc(j2[0] + 40, j2[1] - 30, 22, 0, Math.PI * 2),
    o.fill(),
    (o.fillStyle = zn.pier),
    (o.strokeStyle = zn.pierEdge),
    (o.lineWidth = s(1)));
  let i = (c, h, f, u) => {
    (o.beginPath(),
      o.rect(Math.min(c, f), Math.min(h, u), Math.abs(f - c), Math.abs(u - h)),
      o.fill(),
      o.stroke());
  };
  for (let c of aot || [])
    c.side === "e"
      ? i(Ye.x - 2, c.c - c.w / 2, Ye.x + c.len, c.c + c.w / 2)
      : i(c.c - c.w / 2, Ye.z + 2, c.c + c.w / 2, Ye.z - c.len);
  (i(
    (he[8] + he[9]) / 2 + 4 - 43,
    Ye.z + 2,
    (he[8] + he[9]) / 2 + 4 + 43,
    Ye.z - 320,
  ),
    i(Ye.x - 2, pe[ks - 1] - 104, Ye.x + 66, pe[ks - 1] + 104),
    (o.fillStyle = "#4a4a46"),
    o.fillRect(Ye.x, pe[ks - 1] - 98, 40, 196),
    o.save(),
    C4(o, eot),
    o.clip(),
    (o.strokeStyle = zn.decor),
    (o.lineCap = "butt"),
    (o.lineJoin = "round"));
  for (let c of v1)
    ((o.lineWidth = n(c.name === "MARINA BLVD" ? 20 : 13, 0.8)),
      o.beginPath(),
      c.poly.forEach((h, f) =>
        f ? o.lineTo(h[0], h[1]) : o.moveTo(h[0], h[1]),
      ),
      o.stroke());
  o.restore();
  let a = he[0] - ps[0].hw - ps[0].sw,
    r = pe[ks - 1] + ns[ks - 1].hw + ns[ks - 1].sw;
  ((o.fillStyle = zn.walk),
    o.fillRect(a, Ye.z, Ye.x - a, r - Ye.z),
    (o.fillStyle = zn.block));
  for (let c = 0; c + 1 < xn; c++)
    for (let h = 0; h + 1 < ks; h++) {
      let f = Hi(c, h);
      o.fillRect(f.x0, f.z0, f.x1 - f.x0, f.z1 - f.z0);
    }
  let l = (c, h) => {
    let f = Hi(c, h);
    o.fillRect(f.x0, f.z0, f.x1 - f.x0, f.z1 - f.z0);
  };
  o.fillStyle = zn.lawn;
  for (let [c, h] of [...(k3.park || []), ...(k3.washington || [])]) l(c, h);
  l(8, 20);
  {
    let c = Hi(8, 20);
    ((o.fillStyle = zn.plaza),
      o.fillRect(c.x0 + 10, c.z0 + 10, c.x1 - c.x0 - 20, c.z1 - c.z0 - 20));
  }
  for (let c = 0; c <= 2; c++)
    for (let h of Rd)
      h.c === c &&
        d9(o, h.a, h.b, n(h.hw * 2, c === 2 ? 2.4 : c === 1 ? 1.6 : 1), ekt[c]);
  if (t > 0.35)
    for (let c of Rd) {
      let h = c.col ? ps[c.idx] : ns[c.idx];
      (h.median && d9(o, c.a, c.b, n(h.median * 1.4, 0.6), zn.median),
        c.cable && t > 0.6 && d9(o, c.a, c.b, s(1), zn.cable));
    }
  ((o.fillStyle = zn.lawn),
    o.fillRect(Yi.x0, Yi.z - ns[Yi.j].hw, Yi.x1 - Yi.x0, ns[Yi.j].hw * 2),
    (o.strokeStyle = "#9a5a44"),
    (o.lineWidth = n(3.6, 1)),
    (o.lineJoin = "round"),
    (o.lineCap = "round"),
    C4(o, ckt),
    o.stroke(),
    (o.lineJoin = "round"),
    (o.lineCap = "round"));
  for (let c of uo)
    (p9(o, c),
      (o.strokeStyle = zn.hwyCase),
      (o.lineWidth = n(c.hw * 2 + 6, 4)),
      o.stroke());
  for (let c of uo)
    (p9(o, c),
      (o.strokeStyle = zn.hwy),
      (o.lineWidth = n(c.hw * 2, 2.5)),
      o.stroke());
  for (let c of uo) {
    let h = c.end;
    ((o.fillStyle = zn.hwy),
      o.beginPath(),
      o.arc(h[0], h[2], c.plaza, 0, Math.PI * 2),
      o.fill());
  }
  o.lineCap = "butt";
  for (let [c, [h, f]] of b9) {
    let u = c === L4;
    (p9(o, c, h, f),
      (o.strokeStyle = u ? zn.ggCase : zn.bbCase),
      (o.lineWidth = n(c.hw * 2 + 8, 5)),
      o.stroke(),
      p9(o, c, h, f),
      (o.strokeStyle = u ? zn.gg : zn.bb),
      (o.lineWidth = n(c.hw * 2, 3)),
      o.stroke());
    let d = u
        ? [Qe.sTowerS, Qe.sTowerN].map(Qe.at)
        : [...ts.towers.map(ts.at), ts.at(ts.center)],
      p = u ? Qe.dir : ts.dir;
    for (let m of d) {
      let g = [-p[1], p[0]],
        b = n(c.hw + 9, 5);
      d9(
        o,
        [m[0] - g[0] * b, m[1] - g[1] * b],
        [m[0] + g[0] * b, m[1] + g[1] * b],
        n(10, 2.5),
        u ? "#ff7a4a" : "#dfe6ec",
      );
    }
  }
}
function wN(o, t, e) {
  let s = o.H,
    n = b9.get(s),
    i = o.plaza ? 0 : t * o.ux + e * o.uz,
    a = n && o.s >= n[0] && o.s <= n[1];
  if (s.id === "101") {
    let c = i > 0 ? "US-101 NORTH" : "US-101 SOUTH";
    return a
      ? [
          "GOLDEN GATE BRIDGE",
          i > 0 ? "US-101 NORTH \xB7 MARIN" : "US-101 SOUTH \xB7 SAN FRANCISCO",
        ]
      : n && o.s > n[1]
        ? ["US-101 \xB7 VISTA POINT", o.plaza ? "MARIN HEADLANDS" : c]
        : s.pts[Math.max(0, o.k)][0] > $2
          ? [
              "LOMBARD ST",
              c + (i > 0 ? " \xB7 GOLDEN GATE BRIDGE" : " \xB7 VAN NESS AVE"),
            ]
          : [
              "US-101 \xB7 PRESIDIO PKWY",
              c + (i > 0 ? " \xB7 GOLDEN GATE BRIDGE" : " \xB7 LOMBARD ST"),
            ];
  }
  if (s.id === "80")
    return a
      ? [
          "BAY BRIDGE",
          i > 0 ? "I-80 EAST \xB7 OAKLAND" : "I-80 WEST \xB7 SAN FRANCISCO",
        ]
      : n && o.s > n[1]
        ? [
            "I-80 \xB7 YERBA BUENA ISLAND",
            o.plaza
              ? "TREASURE ISLAND"
              : i > 0
                ? "I-80 EAST"
                : "I-80 WEST \xB7 SAN FRANCISCO",
          ]
        : [
            "I-80",
            i > 0 ? "EAST \xB7 BAY BRIDGE" : "WEST \xB7 THE EMBARCADERO",
          ];
  let [r, l = ""] = s.name.split(" \xB7 ");
  return [r, l];
}
