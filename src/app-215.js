// app 215 — site
// Lines 114762-115063 of readable/app.pretty.js (statement-aligned).
function Qmt(i) {
  if (!Ck) {
    for (let t of bX) {
      let e = xX(i, t);
      ((t.F = e), (t.set = t.block ? vX(i, e, t) : []));
      let s = [];
      if (
        (t.block &&
          !t.gate &&
          s.push(CS(e, t.set, t.block[0], t.block[1], { pad: 0.5 })),
        t.claimR &&
          s.push(
            RS(t.at[0], t.at[1], t.bearing ?? gX, 2 * t.claimR, 2 * t.claimR),
          ),
        t.loop && s.push(Zmt(t.loop[0], t.loop[1], 6)),
        t.tc &&
          s.push(
            [
              [t.tc.x0 - 2, t.tc.z0 - 2],
              [t.tc.x1 + 2, t.tc.z0 - 2],
              [t.tc.x1 + 2, t.tc.z1 + 2],
              [t.tc.x0 - 2, t.tc.z1 + 2],
            ].map(([n, o]) => e.fwd(n, o)),
          ),
        t.gate)
      ) {
        let n = dy(t.set, () => [
          ae[10],
          fe[18] - Qe[18].hw - 7.5,
          ls[10].hw + ls[10].sw + 0.8,
        ]);
        s.push(
          [
            [n[0] - n[2], n[1] - 7],
            [n[0] + n[2], n[1] - 7],
            [n[0] + n[2], n[1] + 7],
            [n[0] - n[2], n[1] + 7],
          ].map(([o, a]) => e.fwd(o, a)),
        );
      }
      (t.turntable &&
        s.push(
          [
            [-12, -100],
            [12, -100],
            [12, 8],
            [-12, 8],
          ].map(([n, o]) => e.fwd(e.gx + n, e.gz + o)),
        ),
        i.claim({ name: t.name, ids: t.osm || [], poly: null }));
      for (let n of s) i.claim({ name: t.name, poly: n });
    }
    (i.claim({ name: "cityhall", ids: Ey.dome, poly: null }),
      i.claim({ name: "pagoda", ids: Ty.ids, poly: null }),
      i.claim({ name: "castro", ids: [99776277], poly: null }));
    {
      let [t, e] = Vd.c;
      i.claim({
        name: "ballpark",
        poly: Vd.ring.map(([s, n]) => {
          let o = s - t,
            a = n - e,
            r = Math.hypot(o, a) || 1;
          return [s + (o / r) * 6, n + (a / r) * 6];
        }),
        frac: 0.5,
      });
    }
    (i.claim({ name: "stmary", poly: Ay.claim, frac: 0.5 }),
      i.claim({ name: "safeway", poly: qS.claim, frac: 0.6, props: !1 }));
    try {
      f$(i);
    } catch (t) {
      console.error("plazas claims", t);
    }
    try {
      _$(i);
    } catch (t) {
      console.error("r17 claims", t);
    }
    try {
      B$(i);
    } catch (t) {
      console.error("r18 claims", t);
    }
    try {
      $$(i);
    } catch (t) {
      console.error("r19 claims", t);
    }
    try {
      eX(i);
    } catch (t) {
      console.error("r20 claims", t);
    }
    try {
      hX(i);
    } catch (t) {
      console.error("r20b claims", t);
    }
    try {
      pX(i);
    } catch (t) {
      console.error("revolution claims", t);
    }
    i.claim({
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
var Xy = null;
function t2t(i) {
  if (Ck) return;
  (b7(), x7(!0));
  let t = (Xy = g7(i)),
    e = {
      buildTransamerica: M7,
      buildCoit: S7,
      buildUnionSquare: k7,
      buildGrace: _7,
      buildFairmont: z7,
      buildSSPP: E7,
      build555: C7,
      buildChinatown: T7,
      buildPowell: L7,
      buildSalesforceTower: y7,
      buildTransitCenter: w7,
    };
  for (let s of bX) {
    let n = s.F || xX(i, s),
      o = s.set || (s.block ? vX(i, n, s) : []),
      a = s.turntable
        ? [
            [ae, 8, s.grid[0]],
            [ls[8], "hw", 5.4],
            [ls[8], "sw", 4.3],
            [fe, ws - 1, s.grid[1] + 7.5 + 8.6],
            [Qe[ws - 1], "hw", 8.6],
          ]
        : [];
    i.site({ name: s.name, F: n, set: o.concat(a), cull: s.cull }, (r) => {
      if (((r.site = s), s.loop && (s.loopL = n.inv(...s.loop)), s.turntable)) {
        let l = i.streetNear(
          "Powell Street",
          ...n.fwd(s.grid[0], s.grid[1] - 90),
          60,
        )[0];
        s.ellis = l ? n.inv(l.E.P[0], l.E.P[1]) : null;
      }
      if ((e[s.fn](r, t, s.tc), s.solid)) {
        let l = Ei(s.block[0], s.block[1]);
        r.colliders.push({ t: "box", x0: l.x0, z0: l.z0, x1: l.x1, z1: l.z1 });
      }
      Jmt(r.colliders);
    });
  }
  (i.site(
    {
      name: "grantlanterns",
      F: i.frame({ at: [0, 0] }),
      cull: 1400,
      cx: -1110,
      cz: 150,
    },
    (s) => vq(s, t, i.D),
  ),
    i.site(
      {
        name: "castro",
        F: i.frame({ at: [0, 0] }),
        cull: 2200,
        cx: -3300,
        cz: 3800,
      },
      (s) => Iq(s, t, i),
    ),
    i.site({ name: "sutro", F: i.frame({ at: [0, 0] }) }, (s) => Pq(s, t, i)),
    i.site({ name: "stripfill", F: i.frame({ at: [0, 0] }) }, (s) =>
      DS(s, t, i),
    ),
    i.site(
      {
        name: "citylights",
        F: i.frame({ at: [0, 0] }),
        cull: 900,
        cx: -1150,
        cz: -234,
      },
      (s) => Fq(s, t, i),
    ),
    i.site(
      {
        name: "broadway",
        F: i.frame({ at: [0, 0] }),
        cull: 1300,
        cx: -1060,
        cz: -280,
      },
      (s) => Nq(s, t, i),
    ),
    i.site(
      {
        name: "cityhall",
        F: i.frame({ at: [0, 0] }),
        cull: 6e3,
        cx: Ey.c[0],
        cz: Ey.c[1],
      },
      (s) => Bq(s, t, i),
    ),
    i.site(
      {
        name: "octavia",
        F: i.frame({ at: [0, 0] }),
        cull: 1500,
        cx: -2690,
        cz: 2330,
      },
      (s) => Hq(s, t, i),
    ),
    i.site(
      {
        name: "pagoda",
        F: i.frame({ at: [0, 0] }),
        cull: 2500,
        cx: Ty.c[0],
        cz: Ty.c[1],
      },
      (s) => Oq(s, t, i),
    ),
    i.site(
      {
        name: "stmary",
        F: i.frame({ at: [0, 0] }),
        cull: 5e3,
        cx: Ay.c[0],
        cz: Ay.c[1],
      },
      (s) => $q(s, t, i),
    ),
    i.site(
      {
        name: "safeway",
        F: i.frame({ at: [0, 0] }),
        cull: 2500,
        cx: qS.c[0],
        cz: qS.c[1],
      },
      (s) => Jq(s, t, i),
    ),
    i.site({ name: "plazas", F: i.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      g$(s, t, i),
    ),
    i.site({ name: "r17", F: i.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      T$(s, t, i),
    ),
    i.site({ name: "r18", F: i.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      O$(s, t, i),
    ),
    i.site({ name: "r19", F: i.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      X$(s, t, i),
    ),
    i.site({ name: "r20", F: i.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      aX(s, t, i),
    ),
    i.site({ name: "r20b", F: i.frame({ at: [0, 0] }), cull: 0 }, (s) =>
      dX(s, t, i),
    ));
  try {
    mX({ group: i.group }, i);
  } catch (s) {
    console.error("revolution", s);
  }
  (i.site(
    {
      name: "ballpark",
      F: i.frame({ at: [0, 0] }),
      cull: 6e3,
      cx: Vd.c[0],
      cz: Vd.c[1],
    },
    (s) => qq(s, t, i),
  ),
    x7(!1));
}
var nw = {};
wh(nw, {
  NAME: () => Q2t,
  RESERVE: () => tgt,
  build: () => egt,
  buildReal: () => ngt,
  realClaims: () => sgt,
});
as();
Oa();
En();
