// app 03 — math
// Lines 439-809 of readable/app.pretty.js (statement-aligned).
var Hc,
  js,
  ps,
  ns,
  DH,
  vat,
  he,
  pe,
  xn,
  ks,
  $kt,
  Ye,
  M3,
  jH,
  Ze,
  yat,
  Yl,
  Yi,
  hu,
  g8,
  u8,
  d8,
  po,
  sR,
  qH,
  $H,
  Qe,
  Hd,
  b8,
  nR,
  iR,
  XH,
  ts,
  wat,
  Mat,
  uo,
  gl,
  F1,
  p8,
  Sat,
  kat,
  Bi,
  k3,
  O1,
  hR,
  Pn = Ki(() => {
    Hc = null;
    ((js = (o, t = 0, e = 0) => {
      let s =
        Math.imul(o | 0, 374761393) ^
        Math.imul(t | 0, 668265263) ^
        Math.imul(e | 0, 2246822519);
      return (
        (s = Math.imul(s ^ (s >>> 13), 1274126177)),
        ((s ^ (s >>> 16)) >>> 0) / 4294967296
      );
    }),
      (ps = [
        { name: "VAN NESS AVE", hw: 13, sw: 4.5, lanes: 3, median: 1.6 },
        { name: "POLK ST", hw: 6.5 },
        { name: "LARKIN ST", hw: 6 },
        { name: "HYDE ST", hw: 6.5, cable: !0 },
        { name: "LEAVENWORTH ST", hw: 6 },
        { name: "JONES ST", hw: 6 },
        { name: "TAYLOR ST", hw: 6 },
        { name: "MASON ST", hw: 6, cable: !0 },
        { name: "POWELL ST", hw: 6.5, cable: !0 },
        { name: "STOCKTON ST", hw: 6.5 },
        { name: "GRANT AVE", hw: 5 },
        { name: "KEARNY ST", hw: 7 },
        { name: "MONTGOMERY ST", hw: 7 },
        { name: "SANSOME ST", hw: 6.5 },
        { name: "BATTERY ST", hw: 6.5 },
        { name: "FRONT ST", hw: 6 },
        {
          name: "THE EMBARCADERO",
          hw: 15,
          sw: 7,
          lanes: 3,
          median: 1.6,
          water: !0,
        },
      ]),
      (ns = [
        {
          name: "THE EMBARCADERO",
          hw: 13,
          sw: 7,
          lanes: 2,
          median: 1.6,
          water: !0,
        },
        { name: "BAY ST", hw: 8, lanes: 2 },
        { name: "FRANCISCO ST", hw: 6 },
        { name: "CHESTNUT ST", hw: 6.5 },
        { name: "LOMBARD ST", hw: 7.5, lanes: 2 },
        { name: "GREENWICH ST", hw: 6 },
        { name: "FILBERT ST", hw: 6 },
        { name: "UNION ST", hw: 6.5 },
        { name: "GREEN ST", hw: 6 },
        { name: "VALLEJO ST", hw: 6 },
        { name: "BROADWAY", hw: 9, lanes: 2 },
        { name: "PACIFIC AVE", hw: 6 },
        { name: "JACKSON ST", hw: 6 },
        { name: "WASHINGTON ST", hw: 6.5, cable: !0 },
        { name: "CLAY ST", hw: 6 },
        { name: "SACRAMENTO ST", hw: 6 },
        { name: "CALIFORNIA ST", hw: 7.5, cable: !0 },
        { name: "PINE ST", hw: 6.5 },
        { name: "BUSH ST", hw: 6.5 },
        { name: "SUTTER ST", hw: 6.5 },
        { name: "POST ST", hw: 6.5 },
        { name: "GEARY ST", hw: 7.5, lanes: 2 },
        { name: "MARKET ST", hw: 14, sw: 6, lanes: 2, median: 1.6 },
      ]));
    for (let o of [...ps, ...ns])
      ((o.sw ??= 3.2), (o.lanes ??= 1), (o.median ??= 0));
    ((DH = 105),
      (vat = 84),
      (he = ps.map((o, t) =>
        t < ps.length - 1 ? t * DH : (ps.length - 2) * DH + 118,
      )),
      (pe = ns.map((o, t) => (t === 0 ? -112 : (t - 1) * vat))),
      (xn = he.length),
      (ks = pe.length),
      ($kt = { x0: he[0], x1: he[xn - 1], z0: pe[0], z1: pe[ks - 1] }),
      (Ye = {
        x: he[xn - 1] + ps[xn - 1].hw + ps[xn - 1].sw + 14,
        z: pe[0] - ns[0].hw - ns[0].sw - 14,
      }),
      (M3 = 0),
      (jH = -9),
      (Ze = 0.16),
      (yat = [
        { x: 330, z: 430, a: 84, sx: 240, sz: 250 },
        { x: 610, z: 1240, a: 96, sx: 270, sz: 230 },
        { x: 1190, z: 405, a: 76, sx: 150, sz: 150 },
        { x: -260, z: 980, a: 70, sx: 330, sz: 360 },
        { x: 150, z: 1500, a: 26, sx: 220, sz: 260 },
      ]));
    Yl = [];
    for (let o = 0; o < xn; o++) {
      Yl.push([]);
      for (let t = 0; t < ks; t++)
        Yl[o].push(Math.round(aR(he[o], pe[t]) * 2) / 2);
    }
    Yl[xn - 1].fill(3);
    for (let o = 0; o < xn; o++) Yl[o][0] = 3;
    Yl[4][4] = Yl[3][4] - 26;
    Yi = { i: 3, j: 4, lift: 0.19, ramp: 3 };
    Object.assign(Yi, {
      x0: he[3] + ps[3].hw,
      x1: he[4] - ps[4].hw,
      z: pe[4],
      hz: ns[4].hw + ns[4].sw,
    });
    ((hu = 0.14), (g8 = 1 / (2 * hu * (1 - hu))));
    ((u8 = ps.map((o) => o.hw + 1)), (d8 = ns.map((o) => o.hw + 1)));
    po = {
      west: (o) => (o + 122.4245) * 88e3,
      north: (o) => (37.8048 - o) * 111e3,
      east: (o) => 1693 + (o + 122.3937) * 88e3,
      south: (o) => 1764 + (37.7955 - o) * 111e3,
    };
    ((sR = [-0.07, -0.9975]),
      (qH = [po.west(-122.476), po.north(37.8075)]),
      ($H = (o) => [qH[0] + sR[0] * o, qH[1] + sR[1] * o]),
      (Qe = {
        dir: sR,
        at: $H,
        sAnchS: 20,
        sTowerS: 363,
        sTowerN: 1643,
        sAnchN: 1986,
        deck: 66,
        towerTop: 227,
      }),
      (Hd = [1965, 1908]),
      (b8 = [po.east(-122.3645), po.south(37.8105)]),
      (nR = Math.hypot(b8[0] - Hd[0], b8[1] - Hd[1])),
      (iR = [(b8[0] - Hd[0]) / nR, (b8[1] - Hd[1]) / nR]),
      (XH = (o) => [Hd[0] + iR[0] * o, Hd[1] + iR[1] * o]),
      (ts = { dir: iR, at: XH, len: nR, anch: 118, deck: 58, towerTop: 160 }));
    ts.towers = [ts.anch + 353, ts.anch + 1057, ts.anch + 1763, ts.anch + 2467];
    ts.center = ts.anch + 1410;
    ts.anchE = ts.anch + 2820;
    ((wat = () => {
      let o = he[0] - 124,
        t = pe[4],
        e = $t(o, t),
        s = (n) => $H(n);
      return [
        [o, e, t],
        [o - 90, e - 1, t],
        [-420, Math.max(9, e * 0.6), t],
        [-900, 8, t],
        [-1500, 6.5, t],
        [-2e3, 9, t],
        [-2700, 22, t + 10],
        [-3400, 40, t + 22],
        [-3950, 53, t + 25],
        [-4290, 58.5, t + 5],
        [s(-380)[0], 60, s(-380)[1]],
        [s(-150)[0], 61, s(-150)[1]],
        [s(0)[0], 62, s(0)[1]],
        [s(Qe.sTowerS)[0], 64, s(Qe.sTowerS)[1]],
        [
          s((Qe.sTowerS + Qe.sTowerN) / 2)[0],
          67,
          s((Qe.sTowerS + Qe.sTowerN) / 2)[1],
        ],
        [s(Qe.sTowerN)[0], 64, s(Qe.sTowerN)[1]],
        [s(Qe.sAnchN)[0], 62, s(Qe.sAnchN)[1]],
        [s(Qe.sAnchN + 190)[0], 61, s(Qe.sAnchN + 190)[1]],
      ];
    }),
      (Mat = () => {
        let o = he[xn - 1],
          t = pe[ks - 1] + ns[ks - 1].hw,
          e = (s) => XH(s);
        return [
          [o, 3, t + 100],
          [o + 6, 3.2, t + 148],
          [o + 45, 4, t + 202],
          [o + 125, 8, t + 232],
          [o + 212, 14, t + 207],
          [Hd[0], 23, Hd[1]],
          [e(ts.anch)[0], 31, e(ts.anch)[1]],
          [e(ts.towers[0])[0], 50, e(ts.towers[0])[1]],
          [e(ts.center)[0], 58, e(ts.center)[1]],
          [e(ts.towers[3])[0], 57, e(ts.towers[3])[1]],
          [e(ts.anchE)[0], 55, e(ts.anchE)[1]],
          [e(ts.anchE + 90)[0], 55, e(ts.anchE + 90)[1]],
        ];
      }),
      (uo = [
        {
          id: "101",
          name: "US-101 \xB7 GOLDEN GATE BRIDGE",
          hw: 11.5,
          lanes: 3,
          median: 1.2,
          pts: WH(wat(), 8),
          plaza: 38,
        },
        {
          id: "80",
          name: "I-80 \xB7 BAY BRIDGE",
          hw: 12,
          lanes: 3,
          median: 1.2,
          pts: WH(Mat(), 8),
          plaza: 40,
        },
      ]));
    {
      for (let e of uo) {
        e.s = [0];
        for (let s = 1; s < e.pts.length; s++)
          e.s.push(
            e.s[s - 1] +
              Math.hypot(
                e.pts[s][0] - e.pts[s - 1][0],
                e.pts[s][2] - e.pts[s - 1][2],
              ),
          );
        ((e.len = e.s[e.s.length - 1]), (e.end = e.pts[e.pts.length - 1]));
      }
      ((uo.grid = new Map()), (uo.HC = 48));
      let t = (e, s, n) => {
        let i = e * 100003 + s,
          a = uo.grid.get(i);
        (a || uo.grid.set(i, (a = [])), a.push(n));
      };
      uo.forEach((e, s) => {
        let n = e.hw + 2;
        for (let r = 0; r + 1 < e.pts.length; r++) {
          let l = e.pts[r],
            c = e.pts[r + 1];
          for (
            let h = Math.floor((Math.min(l[0], c[0]) - n) / 48);
            h <= Math.floor((Math.max(l[0], c[0]) + n) / 48);
            h++
          )
            for (
              let f = Math.floor((Math.min(l[2], c[2]) - n) / 48);
              f <= Math.floor((Math.max(l[2], c[2]) + n) / 48);
              f++
            )
              t(h, f, [s, r]);
        }
        let i = e.end,
          a = e.plaza + 2;
        for (
          let r = Math.floor((i[0] - a) / 48);
          r <= Math.floor((i[0] + a) / 48);
          r++
        )
          for (
            let l = Math.floor((i[2] - a) / 48);
            l <= Math.floor((i[2] + a) / 48);
            l++
          )
            t(r, l, [s, -1]);
      });
    }
    ((gl = [
      [-140, Ye.z],
      [-800, -265],
      [-2600, -330],
      [-4250, -420],
      [-4470, -560],
      [-4570, -610],
      [-4700, -560],
      [-5100, -400],
      [-5900, -150],
      [-7700, 280],
    ]),
      (F1 = [
        [-1e4, -1900],
        [-7700, -2060],
        [-6e3, -2200],
        [-4900, -2215],
        [-4500, -2280],
        [-4150, -2560],
        [-3700, -3100],
        [-3e3, -4e3],
        [-2300, -5e3],
        [-1200, -6400],
      ]));
    ((p8 = (o, t, e) => {
      let s = 0;
      for (let [n, i, a, r, l] of e) {
        let c = (o - n) / r,
          h = (t - i) / l;
        s += a * Math.exp(-0.5 * (c * c + h * h));
      }
      return s;
    }),
      (Sat = [
        [-3400, 780, 80, 650, 360],
        [-5100, 420, 62, 480, 330],
        [-4575, -440, 32, 150, 120],
        [-6300, 480, 58, 620, 420],
        [-2300, 900, 30, 500, 350],
        [-3900, 120, 22, 400, 160],
      ]),
      (kat = [
        [-6e3, -3050, 240, 800, 600],
        [-3900, -3900, 180, 650, 650],
        [-7500, -2650, 170, 900, 480],
        [-2700, -4900, 140, 700, 700],
        [-4750, -2640, 45, 200, 170],
      ]));
    Bi = {
      VICTORIAN: 0,
      APARTMENTS: 1,
      NORTHBEACH: 2,
      DOWNTOWN: 3,
      FIDI: 4,
      WATERFRONT: 5,
      CHINATOWN: 6,
      PARK: 7,
    };
    k3 = {
      park: [[6, 15, "Huntington Park"]],
      washington: [[9, 6, "Washington Square"]],
    };
    O1 = null;
    hR = () => O1;
  });
