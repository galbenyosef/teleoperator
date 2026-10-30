// app 214 — site
// Lines 115018-115319 of readable/app.pretty.js (statement-aligned).
function Sxt(o) {
  if (!Cz) {
    for (let t of yY) {
      let e = wY(o, t);
      ((t.F = e), (t.set = t.block ? MY(o, e, t) : []));
      let s = [];
      if (
        (t.block &&
          !t.gate &&
          s.push(Lk(e, t.set, t.block[0], t.block[1], { pad: 0.5 })),
        t.claimR &&
          s.push(
            Pk(t.at[0], t.at[1], t.bearing ?? vY, 2 * t.claimR, 2 * t.claimR),
          ),
        t.loop && s.push(Mxt(t.loop[0], t.loop[1], 6)),
        t.tc &&
          s.push(
            [
              [t.tc.x0 - 2, t.tc.z0 - 2],
              [t.tc.x1 + 2, t.tc.z0 - 2],
              [t.tc.x1 + 2, t.tc.z1 + 2],
              [t.tc.x0 - 2, t.tc.z1 + 2],
            ].map(([n, i]) => e.fwd(n, i)),
          ),
        t.gate)
      ) {
        let n = rw(t.set, () => [
          he[10],
          pe[18] - ns[18].hw - 7.5,
          ps[10].hw + ps[10].sw + 0.8,
        ]);
        s.push(
          [
            [n[0] - n[2], n[1] - 7],
            [n[0] + n[2], n[1] - 7],
            [n[0] + n[2], n[1] + 7],
            [n[0] - n[2], n[1] + 7],
          ].map(([i, a]) => e.fwd(i, a)),
        );
      }
      (t.turntable &&
        s.push(
          [
            [-12, -100],
            [12, -100],
            [12, 8],
            [-12, 8],
          ].map(([n, i]) => e.fwd(e.gx + n, e.gz + i)),
        ),
        o.claim({ name: t.name, ids: t.osm || [], poly: null }));
      for (let n of s) o.claim({ name: t.name, poly: n });
    }
    (o.claim({ name: "cityhall", ids: ww.dome, poly: null }),
      o.claim({ name: "pagoda", ids: Mw.ids, poly: null }),
      o.claim({ name: "castro", ids: [99776277], poly: null }));
    {
      let [t, e] = kp.c;
      o.claim({
        name: "ballpark",
        poly: kp.ring.map(([s, n]) => {
          let i = s - t,
            a = n - e,
            r = Math.hypot(i, a) || 1;
          return [s + (i / r) * 6, n + (a / r) * 6];
        }),
        frac: 0.5,
      });
    }
    (o.claim({ name: "stmary", poly: Sw.claim, frac: 0.5 }),
      o.claim({ name: "safeway", poly: Wk.claim, frac: 0.6, props: !1 }));
    try {
      pK(o);
    } catch (t) {
      console.error("plazas claims", t);
    }
    try {
      TK(o);
    } catch (t) {
      console.error("r17 claims", t);
    }
    try {
      DK(o);
    } catch (t) {
      console.error("r18 claims", t);
    }
    try {
      YK(o);
    } catch (t) {
      console.error("r19 claims", t);
    }
    try {
      iY(o);
    } catch (t) {
      console.error("r20 claims", t);
    }
    try {
      dY(o);
    } catch (t) {
      console.error("r20b claims", t);
    }
    try {
      bY(o);
    } catch (t) {
      console.error("revolution claims", t);
    }
    o.claim({
      name: "twinpeaks",
      poly: Array.from({ length: 24 }, (t, e) => [
        -4700 + Math.cos((e / 24) * 2 * Math.PI) * 340,
        4560 + Math.sin((e / 24) * 2 * Math.PI) * 430,
      ]),
      buildings: !1,
      props: ["ptree", "tree"],
    });
  }
}
var Vw = null;
function kxt(o) {
  if (Cz) return;
  (XP(), KP(!0));
  let t = (Vw = $P(o)),
    e = {
      buildTransamerica: QP,
      buildCoit: tC,
      buildUnionSquare: eC,
      buildGrace: sC,
      buildFairmont: nC,
      buildSSPP: iC,
      build555: cC,
      buildChinatown: oC,
      buildPowell: hC,
      buildSalesforceTower: JP,
      buildTransitCenter: ZP,
    };
  for (let s of yY) {
    let n = s.F || wY(o, s),
      i = s.set || (s.block ? MY(o, n, s) : []),
      a = s.turntable
        ? [
            [he, 8, s.grid[0]],
            [ps[8], "hw", 5.4],
            [ps[8], "sw", 4.3],
            [pe, ks - 1, s.grid[1] + 7.5 + 8.6],
            [ns[ks - 1], "hw", 8.6],
          ]
        : [];
    o.site({ name: s.name, F: n, set: i.concat(a), cull: s.cull }, (r) => {
      if (((r.site = s), s.loop && (s.loopL = n.inv(...s.loop)), s.turntable)) {
        let l = o.streetNear(
          "Powell Street",
          ...n.fwd(s.grid[0], s.grid[1] - 90),
          60,
        )[0];
        s.ellis = l ? n.inv(l.E.P[0], l.E.P[1]) : null;
      }
      if ((e[s.fn](r, t, s.tc), s.solid)) {
        let l = Hi(s.block[0], s.block[1]);
        r.colliders.push({ t: "box", x0: l.x0, z0: l.z0, x1: l.x1, z1: l.z1 });
      }
      wxt(r.colliders);
    });
  }
  (o.site(
    {
      name: "grantlanterns",
      F: o.frame({ at: [0, 0] }),
      cull: 1400,
      cx: -1110,
      cz: 150,
    },
    (s) => wj(s, t, o.D),
  ),
    o.site(
      {
        name: "castro",
        F: o.frame({ at: [0, 0] }),
        cull: 2200,
        cx: -3300,
        cz: 3800,
      },
      (s) => Oj(s, t, o),
    ),
    o.site({ name: "sutro", F: o.frame({ at: [0, 0] }) }, (s) => Lj(s, t, o)),
    o.site({ name: "stripfill", F: o.frame({ at: [0, 0] }) }, (s) =>
      Dk(s, t, o),
    ),
    o.site(
      {
        name: "citylights",
        F: o.frame({ at: [0, 0] }),
        cull: 900,
        cx: -1150,
        cz: -234,
      },
      (s) => Bj(s, t, o),
    ),
    o.site(
      {
        name: "broadway",
        F: o.frame({ at: [0, 0] }),
        cull: 1300,
        cx: -1060,
        cz: -280,
      },
      (s) => Nj(s, t, o),
    ),
    o.site(
      {
        name: "cityhall",
        F: o.frame({ at: [0, 0] }),
        cull: 6e3,
        cx: ww.c[0],
        cz: ww.c[1],
      },
      (s) => Hj(s, t, o),
    ),
    o.site(
      {
        name: "octavia",
        F: o.frame({ at: [0, 0] }),
        cull: 1500,
        cx: -2690,
        cz: 2330,
      },
      (s) => Uj(s, t, o),
    ),
    o.site(
      {
        name: "pagoda",
        F: o.frame({ at: [0, 0] }),
        cull: 2500,
        cx: Mw.c[0],
        cz: Mw.c[1],
      },
      (s) => Dj(s, t, o),
    ),
    o.site(
      {
        name: "stmary",
        F: o.frame({ at: [0, 0] }),
        cull: 5e3,
        cx: Sw.c[0],
        cz: Sw.c[1],
      },
      (s) => Kj(s, t, o),
    ),
    o.site(
      {
        name: "safeway",
        F: o.frame({ at: [0, 0] }),
        cull: 2500,
        cx: Wk.c[0],
        cz: Wk.c[1],
      },
      (s) => Qj(s, t, o),
    ),
    o.site({ name: "plazas", F: o.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      vK(s, t, o),
    ),
    o.site({ name: "r17", F: o.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      PK(s, t, o),
    ),
    o.site({ name: "r18", F: o.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      UK(s, t, o),
    ),
    o.site({ name: "r19", F: o.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      JK(s, t, o),
    ),
    o.site({ name: "r20", F: o.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      cY(s, t, o),
    ),
    o.site({ name: "r20b", F: o.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      gY(s, t, o),
    ));
  try {
    xY({ group: o.group }, o);
  } catch (s) {
    console.error("revolution", s);
  }
  (o.site(
    {
      name: "ballpark",
      F: o.frame({ at: [0, 0] }),
      cull: 6e3,
      cx: kp.c[0],
      cz: kp.c[1],
    },
    (s) => jj(s, t, o),
  ),
    KP(!1));
}
var Zw = {};
Kh(Zw, {
  NAME: () => Svt,
  RESERVE: () => kvt,
  build: () => zvt,
  buildReal: () => Evt,
  realClaims: () => _vt,
});
es();
Ya();
Pn();
