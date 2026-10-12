// app 03 — math
// Lines 406-776 of readable/app.pretty.js (statement-aligned).
var hc,
  Ws,
  ls,
  Qe,
  BB,
  Qst,
  ae,
  fe,
  mn,
  ws,
  t4t,
  Ve,
  m4,
  WB,
  Ke,
  tnt,
  Rl,
  Oi,
  Rf,
  d4,
  c4,
  h4,
  to,
  AT,
  GB,
  qB,
  Ye,
  ad,
  p4,
  RT,
  PT,
  jB,
  Je,
  ent,
  snt,
  Qi,
  j0,
  Jp,
  f4,
  nnt,
  int,
  zi,
  Tv,
  Zp,
  BT,
  En = Vi(() => {
    hc = null;
    ((Ws = (i, t = 0, e = 0) => {
      let s =
        Math.imul(i | 0, 374761393) ^
        Math.imul(t | 0, 668265263) ^
        Math.imul(e | 0, 2246822519);
      return (
        (s = Math.imul(s ^ (s >>> 13), 1274126177)),
        ((s ^ (s >>> 16)) >>> 0) / 4294967296
      );
    }),
      (ls = [
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
      (Qe = [
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
    for (let i of [...ls, ...Qe])
      ((i.sw ??= 3.2), (i.lanes ??= 1), (i.median ??= 0));
    ((BB = 105),
      (Qst = 84),
      (ae = ls.map((i, t) =>
        t < ls.length - 1 ? t * BB : (ls.length - 2) * BB + 118,
      )),
      (fe = Qe.map((i, t) => (t === 0 ? -112 : (t - 1) * Qst))),
      (mn = ae.length),
      (ws = fe.length),
      (t4t = { x0: ae[0], x1: ae[mn - 1], z0: fe[0], z1: fe[ws - 1] }),
      (Ve = {
        x: ae[mn - 1] + ls[mn - 1].hw + ls[mn - 1].sw + 14,
        z: fe[0] - Qe[0].hw - Qe[0].sw - 14,
      }),
      (m4 = 0),
      (WB = -9),
      (Ke = 0.16),
      (tnt = [
        { x: 330, z: 430, a: 84, sx: 240, sz: 250 },
        { x: 610, z: 1240, a: 96, sx: 270, sz: 230 },
        { x: 1190, z: 405, a: 76, sx: 150, sz: 150 },
        { x: -260, z: 980, a: 70, sx: 330, sz: 360 },
        { x: 150, z: 1500, a: 26, sx: 220, sz: 260 },
      ]));
    Rl = [];
    for (let i = 0; i < mn; i++) {
      Rl.push([]);
      for (let t = 0; t < ws; t++)
        Rl[i].push(Math.round(LT(ae[i], fe[t]) * 2) / 2);
    }
    Rl[mn - 1].fill(3);
    for (let i = 0; i < mn; i++) Rl[i][0] = 3;
    Rl[4][4] = Rl[3][4] - 26;
    Oi = { i: 3, j: 4, lift: 0.19, ramp: 3 };
    Object.assign(Oi, {
      x0: ae[3] + ls[3].hw,
      x1: ae[4] - ls[4].hw,
      z: fe[4],
      hz: Qe[4].hw + Qe[4].sw,
    });
    ((Rf = 0.14), (d4 = 1 / (2 * Rf * (1 - Rf))));
    ((c4 = ls.map((i) => i.hw + 1)), (h4 = Qe.map((i) => i.hw + 1)));
    to = {
      west: (i) => (i + 122.4245) * 88e3,
      north: (i) => (37.8048 - i) * 111e3,
      east: (i) => 1693 + (i + 122.3937) * 88e3,
      south: (i) => 1764 + (37.7955 - i) * 111e3,
    };
    ((AT = [-0.07, -0.9975]),
      (GB = [to.west(-122.476), to.north(37.8075)]),
      (qB = (i) => [GB[0] + AT[0] * i, GB[1] + AT[1] * i]),
      (Ye = {
        dir: AT,
        at: qB,
        sAnchS: 20,
        sTowerS: 363,
        sTowerN: 1643,
        sAnchN: 1986,
        deck: 66,
        towerTop: 227,
      }),
      (ad = [1965, 1908]),
      (p4 = [to.east(-122.3645), to.south(37.8105)]),
      (RT = Math.hypot(p4[0] - ad[0], p4[1] - ad[1])),
      (PT = [(p4[0] - ad[0]) / RT, (p4[1] - ad[1]) / RT]),
      (jB = (i) => [ad[0] + PT[0] * i, ad[1] + PT[1] * i]),
      (Je = { dir: PT, at: jB, len: RT, anch: 118, deck: 58, towerTop: 160 }));
    Je.towers = [Je.anch + 353, Je.anch + 1057, Je.anch + 1763, Je.anch + 2467];
    Je.center = Je.anch + 1410;
    Je.anchE = Je.anch + 2820;
    ((ent = () => {
      let i = ae[0] - 124,
        t = fe[4],
        e = Yt(i, t),
        s = (n) => qB(n);
      return [
        [i, e, t],
        [i - 90, e - 1, t],
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
        [s(Ye.sTowerS)[0], 64, s(Ye.sTowerS)[1]],
        [
          s((Ye.sTowerS + Ye.sTowerN) / 2)[0],
          67,
          s((Ye.sTowerS + Ye.sTowerN) / 2)[1],
        ],
        [s(Ye.sTowerN)[0], 64, s(Ye.sTowerN)[1]],
        [s(Ye.sAnchN)[0], 62, s(Ye.sAnchN)[1]],
        [s(Ye.sAnchN + 190)[0], 61, s(Ye.sAnchN + 190)[1]],
      ];
    }),
      (snt = () => {
        let i = ae[mn - 1],
          t = fe[ws - 1] + Qe[ws - 1].hw,
          e = (s) => jB(s);
        return [
          [i, 3, t + 100],
          [i + 6, 3.2, t + 148],
          [i + 45, 4, t + 202],
          [i + 125, 8, t + 232],
          [i + 212, 14, t + 207],
          [ad[0], 23, ad[1]],
          [e(Je.anch)[0], 31, e(Je.anch)[1]],
          [e(Je.towers[0])[0], 50, e(Je.towers[0])[1]],
          [e(Je.center)[0], 58, e(Je.center)[1]],
          [e(Je.towers[3])[0], 57, e(Je.towers[3])[1]],
          [e(Je.anchE)[0], 55, e(Je.anchE)[1]],
          [e(Je.anchE + 90)[0], 55, e(Je.anchE + 90)[1]],
        ];
      }),
      (Qi = [
        {
          id: "101",
          name: "US-101 \xB7 GOLDEN GATE BRIDGE",
          hw: 11.5,
          lanes: 3,
          median: 1.2,
          pts: UB(ent(), 8),
          plaza: 38,
        },
        {
          id: "80",
          name: "I-80 \xB7 BAY BRIDGE",
          hw: 12,
          lanes: 3,
          median: 1.2,
          pts: UB(snt(), 8),
          plaza: 40,
        },
      ]));
    {
      for (let e of Qi) {
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
      ((Qi.grid = new Map()), (Qi.HC = 48));
      let t = (e, s, n) => {
        let o = e * 100003 + s,
          a = Qi.grid.get(o);
        (a || Qi.grid.set(o, (a = [])), a.push(n));
      };
      Qi.forEach((e, s) => {
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
        let o = e.end,
          a = e.plaza + 2;
        for (
          let r = Math.floor((o[0] - a) / 48);
          r <= Math.floor((o[0] + a) / 48);
          r++
        )
          for (
            let l = Math.floor((o[2] - a) / 48);
            l <= Math.floor((o[2] + a) / 48);
            l++
          )
            t(r, l, [s, -1]);
      });
    }
    ((j0 = [
      [-140, Ve.z],
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
      (Jp = [
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
    ((f4 = (i, t, e) => {
      let s = 0;
      for (let [n, o, a, r, l] of e) {
        let c = (i - n) / r,
          h = (t - o) / l;
        s += a * Math.exp(-0.5 * (c * c + h * h));
      }
      return s;
    }),
      (nnt = [
        [-3400, 780, 80, 650, 360],
        [-5100, 420, 62, 480, 330],
        [-4575, -440, 32, 150, 120],
        [-6300, 480, 58, 620, 420],
        [-2300, 900, 30, 500, 350],
        [-3900, 120, 22, 400, 160],
      ]),
      (int = [
        [-6e3, -3050, 240, 800, 600],
        [-3900, -3900, 180, 650, 650],
        [-7500, -2650, 170, 900, 480],
        [-2700, -4900, 140, 700, 700],
        [-4750, -2640, 45, 200, 170],
      ]));
    zi = {
      VICTORIAN: 0,
      APARTMENTS: 1,
      NORTHBEACH: 2,
      DOWNTOWN: 3,
      FIDI: 4,
      WATERFRONT: 5,
      CHINATOWN: 6,
      PARK: 7,
    };
    Tv = {
      park: [[6, 15, "Huntington Park"]],
      washington: [[9, 6, "Washington Square"]],
    };
    Zp = null;
    BT = () => Zp;
  });
