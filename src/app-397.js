// app 397 — col
// Lines 194281-194619 of readable/app.pretty.js (statement-aligned).
var lv = (i, t) => {
    let e = Ca(i, t);
    return [(e.x0 + e.x1) / 2, (e.z0 + e.z1) / 2];
  },
  Vet = [
    {
      name: "Golden Gate Bridge",
      icon: "bridge",
      col: vn.lmBridge,
      p: Ye.at((Ye.sTowerS + Ye.sTowerN) / 2),
      tier: 0,
    },
    {
      name: "Bay Bridge",
      icon: "bridge",
      col: vn.lmBridge,
      p: Je.at(Je.towers[1]),
      tier: 0,
    },
    { name: "Alcatraz", icon: "light", col: vn.lm, p: [200, -2500], tier: 0 },
    {
      name: "Ferry Building",
      icon: "clock",
      col: vn.lm,
      p: [Ve.x + 20, fe[ws - 1]],
      tier: 0,
    },
    { name: "Coit Tower", icon: "coit", col: vn.lm, p: lv(11, 5), tier: 0 },
    {
      name: "Transamerica Pyramid",
      icon: "pyramid",
      col: vn.lm,
      p: lv(12, 13),
      tier: 0,
    },
    {
      name: "Salesforce Tower",
      icon: "sky",
      col: vn.lm,
      p: [1500, fe[ws - 1] + 380],
      tier: 0,
    },
    {
      name: "Lombard St",
      icon: "zig",
      col: vn.lm,
      p: [(ae[3] + ae[4]) / 2, fe[4]],
      tier: 0,
    },
    {
      name: "Pier 39",
      icon: "pier",
      col: vn.lm,
      p: [(ae[8] + ae[9]) / 2 + 4, Ve.z - 170],
      tier: 0,
    },
    {
      name: "Union Square",
      icon: "star",
      col: vn.lmPark,
      p: lv(8, 20),
      tier: 1,
    },
    { name: "Ghirardelli Square", icon: "g", col: vn.lm, p: lv(1, 0), tier: 1 },
    {
      name: "Grace Cathedral",
      icon: "cross",
      col: vn.lm,
      p: lv(5, 15),
      tier: 1,
    },
    { name: "Palace of Fine Arts", icon: "dome", col: vn.lm, p: n2, tier: 1 },
    ...[...(Tv.park || []), ...(Tv.washington || [])].map(([i, t, e]) => ({
      name: e,
      icon: "tree",
      col: vn.lmPark,
      p: lv(i, t),
      tier: 2,
    })),
  ],
  yMt = [
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
  wMt = [
    ["San Francisco Bay", 2200, -1200],
    ["Golden Gate", -4400, -1250],
    ["Pacific Ocean", -8200, -900],
  ],
  $et = null;
function TM(i, t) {
  (i.beginPath(), i.moveTo(t[0][0], t[0][1]));
  for (let e = 1; e < t.length; e++) i.lineTo(t[e][0], t[e][1]);
  i.closePath();
}
function MMt(i, t) {
  if ((i.beginPath(), t.e))
    i.ellipse(t.e[0], t.e[1], t.e[2], t.e[3], t.e[4], 0, Math.PI * 2);
  else {
    let [e, s, n, o, a] = t.r;
    i.roundRect(e, s, n, o, a);
  }
}
function VE(i, t, e, s, n, o = "butt") {
  ((i.strokeStyle = n),
    (i.lineWidth = s),
    (i.lineCap = o),
    i.beginPath(),
    i.moveTo(t[0], t[1]),
    i.lineTo(e[0], e[1]),
    i.stroke());
}
function $E(i, t, e = 0, s = 1 / 0) {
  i.beginPath();
  let n = !1;
  t.pts.forEach((o, a) => {
    t.s[a] < e - 8 ||
      t.s[a] > s + 8 ||
      (n ? i.lineTo(o[0], o[2]) : (i.moveTo(o[0], o[2]), (n = !0)));
  });
}
function Xet(i, t, e) {
  let s = (c) => c / t,
    n = (c, h) => Math.max(c, h / t);
  ((i.fillStyle = vn.water),
    i.fillRect(e[0], e[1], e[2] - e[0], e[3] - e[1]),
    (i.fillStyle = vn.land),
    (i.strokeStyle = vn.shore),
    (i.lineWidth = s(1.5)),
    (i.lineJoin = "round"));
  for (let c of [Get, fMt]) (TM(i, c), i.fill(), i.stroke());
  for (let c of uMt) (MMt(i, c), i.fill(), i.stroke());
  ((i.fillStyle = vn.park),
    (i.strokeStyle = vn.parkEdge),
    (i.lineWidth = s(1)),
    TM(i, pMt),
    i.fill());
  for (let [c, h] of [
    [mMt, vn.lawn],
    [gMt, vn.lawn],
    [bMt, vn.beach],
  ])
    ((i.fillStyle = h), TM(i, c), i.fill());
  ((i.fillStyle = vn.lawn),
    i.beginPath(),
    i.roundRect(n2[0] - 170, n2[1] - 120, 340, 250, 30),
    i.fill(),
    (i.fillStyle = vn.water),
    i.beginPath(),
    i.ellipse(n2[0] - 20, n2[1] + 20, 95, 55, 0.2, 0, Math.PI * 2),
    i.fill(),
    (i.fillStyle = vn.plaza),
    i.beginPath(),
    i.arc(n2[0] + 40, n2[1] - 30, 22, 0, Math.PI * 2),
    i.fill(),
    (i.fillStyle = vn.pier),
    (i.strokeStyle = vn.pierEdge),
    (i.lineWidth = s(1)));
  let o = (c, h, f, u) => {
    (i.beginPath(),
      i.rect(Math.min(c, f), Math.min(h, u), Math.abs(f - c), Math.abs(u - h)),
      i.fill(),
      i.stroke());
  };
  for (let c of $et || [])
    c.side === "e"
      ? o(Ve.x - 2, c.c - c.w / 2, Ve.x + c.len, c.c + c.w / 2)
      : o(c.c - c.w / 2, Ve.z + 2, c.c + c.w / 2, Ve.z - c.len);
  (o(
    (ae[8] + ae[9]) / 2 + 4 - 43,
    Ve.z + 2,
    (ae[8] + ae[9]) / 2 + 4 + 43,
    Ve.z - 320,
  ),
    o(Ve.x - 2, fe[ws - 1] - 104, Ve.x + 66, fe[ws - 1] + 104),
    (i.fillStyle = "#4a4a46"),
    i.fillRect(Ve.x, fe[ws - 1] - 98, 40, 196),
    i.save(),
    TM(i, Get),
    i.clip(),
    (i.strokeStyle = vn.decor),
    (i.lineCap = "butt"),
    (i.lineJoin = "round"));
  for (let c of Bp)
    ((i.lineWidth = n(c.name === "MARINA BLVD" ? 20 : 13, 0.8)),
      i.beginPath(),
      c.poly.forEach((h, f) =>
        f ? i.lineTo(h[0], h[1]) : i.moveTo(h[0], h[1]),
      ),
      i.stroke());
  i.restore();
  let a = ae[0] - ls[0].hw - ls[0].sw,
    r = fe[ws - 1] + Qe[ws - 1].hw + Qe[ws - 1].sw;
  ((i.fillStyle = vn.walk),
    i.fillRect(a, Ve.z, Ve.x - a, r - Ve.z),
    (i.fillStyle = vn.block));
  for (let c = 0; c + 1 < mn; c++)
    for (let h = 0; h + 1 < ws; h++) {
      let f = Ei(c, h);
      i.fillRect(f.x0, f.z0, f.x1 - f.x0, f.z1 - f.z0);
    }
  let l = (c, h) => {
    let f = Ei(c, h);
    i.fillRect(f.x0, f.z0, f.x1 - f.x0, f.z1 - f.z0);
  };
  i.fillStyle = vn.lawn;
  for (let [c, h] of [...(Tv.park || []), ...(Tv.washington || [])]) l(c, h);
  l(8, 20);
  {
    let c = Ei(8, 20);
    ((i.fillStyle = vn.plaza),
      i.fillRect(c.x0 + 10, c.z0 + 10, c.x1 - c.x0 - 20, c.z1 - c.z0 - 20));
  }
  for (let c = 0; c <= 2; c++)
    for (let h of $u)
      h.c === c &&
        VE(i, h.a, h.b, n(h.hw * 2, c === 2 ? 2.4 : c === 1 ? 1.6 : 1), hMt[c]);
  if (t > 0.35)
    for (let c of $u) {
      let h = c.col ? ls[c.idx] : Qe[c.idx];
      (h.median && VE(i, c.a, c.b, n(h.median * 1.4, 0.6), vn.median),
        c.cable && t > 0.6 && VE(i, c.a, c.b, s(1), vn.cable));
    }
  ((i.fillStyle = vn.lawn),
    i.fillRect(Oi.x0, Oi.z - Qe[Oi.j].hw, Oi.x1 - Oi.x0, Qe[Oi.j].hw * 2),
    (i.strokeStyle = "#9a5a44"),
    (i.lineWidth = n(3.6, 1)),
    (i.lineJoin = "round"),
    (i.lineCap = "round"),
    TM(i, xMt),
    i.stroke(),
    (i.lineJoin = "round"),
    (i.lineCap = "round"));
  for (let c of Qi)
    ($E(i, c),
      (i.strokeStyle = vn.hwyCase),
      (i.lineWidth = n(c.hw * 2 + 6, 4)),
      i.stroke());
  for (let c of Qi)
    ($E(i, c),
      (i.strokeStyle = vn.hwy),
      (i.lineWidth = n(c.hw * 2, 2.5)),
      i.stroke());
  for (let c of Qi) {
    let h = c.end;
    ((i.fillStyle = vn.hwy),
      i.beginPath(),
      i.arc(h[0], h[2], c.plaza, 0, Math.PI * 2),
      i.fill());
  }
  i.lineCap = "butt";
  for (let [c, [h, f]] of YE) {
    let u = c === AM;
    ($E(i, c, h, f),
      (i.strokeStyle = u ? vn.ggCase : vn.bbCase),
      (i.lineWidth = n(c.hw * 2 + 8, 5)),
      i.stroke(),
      $E(i, c, h, f),
      (i.strokeStyle = u ? vn.gg : vn.bb),
      (i.lineWidth = n(c.hw * 2, 3)),
      i.stroke());
    let d = u
        ? [Ye.sTowerS, Ye.sTowerN].map(Ye.at)
        : [...Je.towers.map(Je.at), Je.at(Je.center)],
      p = u ? Ye.dir : Je.dir;
    for (let m of d) {
      let g = [-p[1], p[0]],
        b = n(c.hw + 9, 5);
      VE(
        i,
        [m[0] - g[0] * b, m[1] - g[1] * b],
        [m[0] + g[0] * b, m[1] + g[1] * b],
        n(10, 2.5),
        u ? "#ff7a4a" : "#dfe6ec",
      );
    }
  }
}
function yN(i, t, e) {
  let s = i.H,
    n = YE.get(s),
    o = i.plaza ? 0 : t * i.ux + e * i.uz,
    a = n && i.s >= n[0] && i.s <= n[1];
  if (s.id === "101") {
    let c = o > 0 ? "US-101 NORTH" : "US-101 SOUTH";
    return a
      ? [
          "GOLDEN GATE BRIDGE",
          o > 0 ? "US-101 NORTH \xB7 MARIN" : "US-101 SOUTH \xB7 SAN FRANCISCO",
        ]
      : n && i.s > n[1]
        ? ["US-101 \xB7 VISTA POINT", i.plaza ? "MARIN HEADLANDS" : c]
        : s.pts[Math.max(0, i.k)][0] > i2
          ? [
              "LOMBARD ST",
              c + (o > 0 ? " \xB7 GOLDEN GATE BRIDGE" : " \xB7 VAN NESS AVE"),
            ]
          : [
              "US-101 \xB7 PRESIDIO PKWY",
              c + (o > 0 ? " \xB7 GOLDEN GATE BRIDGE" : " \xB7 LOMBARD ST"),
            ];
  }
  if (s.id === "80")
    return a
      ? [
          "BAY BRIDGE",
          o > 0 ? "I-80 EAST \xB7 OAKLAND" : "I-80 WEST \xB7 SAN FRANCISCO",
        ]
      : n && i.s > n[1]
        ? [
            "I-80 \xB7 YERBA BUENA ISLAND",
            i.plaza
              ? "TREASURE ISLAND"
              : o > 0
                ? "I-80 EAST"
                : "I-80 WEST \xB7 SAN FRANCISCO",
          ]
        : [
            "I-80",
            o > 0 ? "EAST \xB7 BAY BRIDGE" : "WEST \xB7 THE EMBARCADERO",
          ];
  let [r, l = ""] = s.name.split(" \xB7 ");
  return [r, l];
}
