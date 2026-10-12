// app 273 — mat
// Lines 135472-135837 of readable/app.pretty.js (statement-aligned).
function Hbt() {
  let i = [0.23, 0.24, 0.24],
    t = [0.05, 0.05, 0.05],
    e = {};
  e.lamp = [
    {
      mat: "metal",
      geo: wi([
        on(new ks(0.07, 0.12, 8.4, 8), i, cn(0, 4.2, 0)),
        on(new ks(0.045, 0.05, 2.6, 6), i, cn(0, 8.3, 1.2, Math.PI / 2 - 0.12)),
        on(new qs(0.42, 0.18, 0.85), i, cn(0, 8.45, 2.55)),
      ]),
    },
    {
      mat: "lamp",
      geo: on(new qs(0.34, 0.05, 0.62), [1, 0.82, 0.55], cn(0, 8.34, 2.55)),
    },
  ];
  {
    let s = [0.035, 0.07, 0.05],
      n = [1, 0.86, 0.62];
    ((e.lamp2 = [
      {
        mat: "metal",
        geo: wi([
          on(new ks(0.2, 0.26, 0.9, 10), s, cn(0, 0.45, 0)),
          on(new ks(0.075, 0.11, 5, 10), s, cn(0, 3.3, 0)),
          on(new ks(0.13, 0.13, 0.22, 10), s, cn(0, 5, 0)),
          on(new qs(0.06, 0.08, 1.5), s, cn(0, 5.55, 0)),
          ...[-0.66, 0.66].map((o) =>
            on(new ks(0.2, 0.08, 0.14, 8), s, cn(0, 5.68, o)),
          ),
          ...[-0.66, 0.66].map((o) =>
            on(new ur(0.24, 0.26, 8), s, cn(0, 6.3, o)),
          ),
          on(new ur(0.06, 0.5, 6), s, cn(0, 6.2, 0)),
        ]),
      },
      {
        mat: "lamp",
        geo: wi(
          [-0.66, 0.66].map((o) =>
            on(new ks(0.19, 0.15, 0.48, 8), n, cn(0, 5.95, o)),
          ),
        ),
      },
    ]),
      (e.plamp = [
        {
          mat: "metal",
          geo: wi([
            on(new ks(0.06, 0.09, 3.9, 8), [0.03, 0.03, 0.03], cn(0, 1.95, 0)),
            on(new ks(0.1, 0.07, 0.16, 8), [0.03, 0.03, 0.03], cn(0, 3.95, 0)),
            on(new ur(0.2, 0.18, 8), [0.03, 0.03, 0.03], cn(0, 4.55, 0)),
          ]),
        },
        {
          mat: "lamp",
          geo: on(new i0(0.21, 10, 8), n, cn(0, 4.25, 0, 0, 0, 0, [1, 1.3, 1])),
        },
      ]));
  }
  {
    let s = [0.03, 0.14, 0.08],
      n = [0.55, 0.38, 0.08],
      o = [0.42, 0.035, 0.025],
      a = [1, 0.78, 0.45],
      r = [];
    r.push(
      on(new ks(0.3, 0.36, 0.7, 8), s, cn(0, 0.35, 0)),
      on(new ks(0.22, 0.3, 0.2, 8), n, cn(0, 0.8, 0)),
      on(new ks(0.075, 0.1, 3, 10), s, cn(0, 2.3, 0)),
      on(new ks(0.14, 0.14, 0.2, 8), o, cn(0, 3.8, 0)),
      on(new ks(0.2, 0.12, 0.18, 6), s, cn(0, 3.98, 0)),
    );
    for (let l of [0, Math.PI]) {
      for (let h = 0; h <= 1.0001; h += 0.035) {
        let f = l + h * Math.PI * 3.2,
          u = 1.05 + h * 2.55,
          d = 0.15 + 0.03 * Math.sin(h * 17);
        r.push(
          on(
            new i0(0.055 + 0.02 * Math.sin(h * Math.PI), 6, 4),
            n,
            cn(Math.cos(f) * d, u, Math.sin(f) * d),
          ),
        );
      }
      let c = l + Math.PI * 3.2;
      r.push(
        on(
          new qs(0.12, 0.1, 0.22),
          n,
          cn(Math.cos(c) * 0.2, 3.65, Math.sin(c) * 0.2, 0, -c, 0),
        ),
      );
    }
    r.push(
      on(new ks(0.05, 0.05, 0.75, 6), o, cn(0, 4.45, 0)),
      on(new ur(0.62, 0.34, 6), s, cn(0, 5, 0)),
      on(new ks(0.64, 0.58, 0.06, 6), n, cn(0, 4.84, 0)),
      on(new ur(0.07, 0.4, 6), n, cn(0, 5.35, 0)),
      on(new ks(0.34, 0.34, 0.06, 6), o, cn(0, 4.08, 0)),
      on(new ks(0.34, 0.34, 0.06, 6), o, cn(0, 4.8, 0)),
    );
    for (let l = 0; l < 6; l++) {
      let c = (l * Math.PI) / 3 + Math.PI / 6;
      r.push(
        on(
          new qs(0.04, 0.72, 0.04),
          o,
          cn(Math.cos(c) * 0.31, 4.44, Math.sin(c) * 0.31),
        ),
      );
    }
    e.dlamp = [
      { mat: "metal", geo: wi(r) },
      { mat: "lamp", geo: on(new ks(0.29, 0.29, 0.68, 6), a, cn(0, 4.44, 0)) },
    ];
  }
  for (let [s, [n, o]] of Object.entries(Bbt))
    e[s] = ZL?.[s] ? { lods: ZL[s].lods } : { lods: iK(n, o) };
  for (let [s, n] of Object.entries(EC))
    n.forEach((o, a) => {
      e[a ? s + "~" + a : s] = { lods: o() };
    });
  ((e.shrub = {
    lods: pm("mound", 9),
    plant: "mound",
    cells: [un.pitto, un.escal, un.pitto, un.coyote, un.hydr, un.rosem],
  }),
    (e.clump = {
      lods: pm("clump", 19),
      plant: "clump",
      cells: [un.flax, un.agap, un.fern, un.wild],
    }),
    (e.mat = {
      lods: pm("mat", 29),
      plant: "mat",
      cells: [un.ivy, un.ice, un.clover],
    }),
    (e.flowers = { lods: TC("flower", 13) }),
    (e.fhedge = { lods: AC(61, 0), plant: "mound", cells: [un.box] }),
    (e.fhedge2 = { lods: AC(67, 1), plant: "mound", cells: [un.pitto] }),
    (e.planter = { lods: oK(), plant: "mound", cells: [un.box] }),
    (e.ivywall = { lods: aK(), plant: "mat", cells: [un.ivy] }));
  {
    let r = wi(
        [
          [0, 0.6000000000000001, 1.32, 0.12],
          [0, -0.6000000000000001, 1.32, 0.12],
          [0.6000000000000001, 0, 0.12, 1.08],
          [-0.6000000000000001, 0, 0.12, 1.08],
        ].map(([c, h, f, u]) =>
          on(
            new qs(f, 0.32, u),
            [0.3, 0.29, 0.27],
            cn(c, 0.04000000000000001, h),
          ),
        ),
      ),
      l = new $n(0.54 * 2, 0.54 * 2);
    (l.rotateX(-Math.PI / 2), l.translate(0, 0.17, 0));
    {
      let c = l.attributes.uv;
      for (let h = 0; h < c.count; h++)
        c.setXY(h, 0.05 + c.getX(h) * 0.4, 0.55 + (1 - c.getY(h)) * 0.4);
    }
    e.well = [
      { mat: "paint", geo: r },
      { mat: "well", geo: JY(ZY(l), [0.8, 0.8, 0.8]) },
    ];
  }
  e.stop = [
    {
      mat: "metal",
      geo: on(new ks(0.035, 0.035, 2.6, 6), [0.55, 0.56, 0.56], cn(0, 1.3, 0)),
    },
    {
      mat: "sign",
      geo: (() => {
        let s = (o) => {
            let a = o.attributes.uv;
            for (let r = 0; r < a.count; r++) a.setXY(r, 0.5, 0.985);
            return o;
          },
          n = new fr(0.4, 8, Math.PI / 8);
        return (
          n.rotateY(Math.PI),
          n.translate(0, 2.35, -0.09),
          wi([
            s(
              on(
                new ks(0.4, 0.4, 0.02, 8),
                [0.85, 0.85, 0.85],
                cn(0, 2.35, -0.045, Math.PI / 2, Math.PI / 8, 0),
              ),
            ),
            s(
              on(
                new ks(0.37, 0.37, 0.02, 8),
                [0.62, 0.02, 0.02],
                cn(0, 2.35, -0.0555, Math.PI / 2, Math.PI / 8, 0),
              ),
            ),
            on(n, [1, 1, 1]),
          ])
        );
      })(),
    },
  ];
  {
    let s = [],
      n = [],
      o = (a, r, l) => {
        s.push(
          on(new qs(0.26, 1.02, 0.36), [0.3, 0.25, 0.035], cn(a, r, l)),
          on(new qs(0.03, 1.22, 0.58), [0.03, 0.03, 0.03], cn(a - 0.14, r, l)),
        );
        for (let [c, h] of [
          [1, 0.2],
          [0, 0.5],
          [-1, 0.8],
        ])
          (n.push(
            on(
              new ks(0.105, 0.105, 0.03, 12),
              [1, 1, h],
              cn(a + 0.135, r + c * 0.32, l, 0, 0, Math.PI / 2),
            ),
          ),
            s.push(
              on(
                new qs(0.2, 0.025, 0.27),
                [0.04, 0.04, 0.04],
                cn(a + 0.23, r + c * 0.32 + 0.13, l, 0, 0, -0.12),
              ),
            ));
      };
    (o(0, 4.75, 4.4),
      o(0, 4.75, 2.5),
      o(0, 3, 0.36),
      (e.signal = [
        {
          mat: "metal",
          geo: wi([
            on(new ks(0.1, 0.13, 5.6, 8), [0.2, 0.22, 0.2], cn(0, 2.8, 0)),
            on(
              new ks(0.06, 0.07, 5.2, 6),
              [0.2, 0.22, 0.2],
              cn(0, 5.4, 2.5, Math.PI / 2),
            ),
          ]),
        },
        { mat: "metal", geo: wi(s) },
        { mat: "signal", geo: wi(n) },
      ]),
      (s.length = 0),
      (n.length = 0),
      o(0, 3, 0.36),
      o(0, 4.1, 0.36),
      (e.signalp = [
        {
          mat: "metal",
          geo: wi([
            on(new ks(0.09, 0.12, 4.7, 8), [0.2, 0.22, 0.2], cn(0, 2.35, 0)),
            ...s,
          ]),
        },
        { mat: "signal", geo: wi(n) },
      ]));
  }
  e.wpole = [
    {
      mat: "metal",
      geo: wi([
        on(new ks(0.1, 0.14, 7.4, 8), [0.33, 0.35, 0.33], cn(0, 3.7, 0)),
        on(new ks(0.12, 0.12, 0.3, 8), [0.33, 0.35, 0.33], cn(0, 7.2, 0)),
      ]),
    },
  ];
  {
    let s = [0.05, 0.05, 0.05],
      n = [0.2, 0.165, 0.125],
      o = [0.36, 0.38, 0.36];
    e.tpole = [
      {
        mat: "metal",
        geo: wi([
          on(new ks(0.09, 0.11, 7.9, 8), s, cn(0, 3.65, 0)),
          on(new ks(0.12, 0.12, 0.25, 8), s, cn(0, 7.5, 0)),
        ]),
      },
    ];
    let a = (c) => {
      let h = [
        on(new ks(0.12, 0.15, 10.8, 8), n, cn(0, 5, 0)),
        on(new qs(0.11, 0.11, 2.4), n, cn(0, 9.85, -0.05)),
        on(new qs(0.05, 0.05, 0.92), n, cn(0, 9.52, -0.35, -0.68, 0, 0)),
        on(new qs(0.05, 0.05, 0.92), n, cn(0, 9.52, 0.35, 0.68, 0, 0)),
        on(new qs(0.08, 0.08, 0.35), n, cn(0, 6.9, 0.18)),
      ];
      for (let f of [-1.1, 0, 1])
        h.push(on(new ks(0.04, 0.05, 0.17, 6), o, cn(0, 9.995, f)));
      return (
        c && h.push(on(new ks(0.3, 0.3, 1.2, 8), o, cn(0, 8.2, -0.42))),
        [{ mat: "paint", geo: wi(h) }]
      );
    };
    ((e.upole = a(!1)), (e.upolet = a(!0)));
    let r = [0.12, 0.2, 0.15],
      l = [0.42, 0.44, 0.42];
    ((e.fpole = [
      { mat: "metal", geo: on(new ks(0.12, 0.14, 7.4, 8), r, cn(0, 3.5, 0)) },
    ]),
      (e.farm = [
        {
          mat: "metal",
          geo: wi([
            on(new qs(2, 0.1, 0.08), r, cn(0, 6.35, 0)),
            on(new qs(1.166, 0.05, 0.05), r, cn(0.5, 6.7, 0, 0, 0, -0.54)),
            on(new qs(1.166, 0.05, 0.05), r, cn(-0.5, 6.7, 0, 0, 0, 0.54)),
          ]),
        },
      ]),
      (e.tlpole = [
        {
          mat: "metal",
          geo: wi([
            on(new ks(0.1, 0.12, 7.2, 8), l, cn(0, 3.4, 0)),
            on(new qs(0.06, 0.05, 2.6), l, cn(0, 6.6, 1.3)),
          ]),
        },
      ]));
  }
  {
    let s = {
      mat: "paint",
      geo: on(new qs(2.2, 0.55, 1), [0.42, 0.16, 0.1], cn(0, 0.05, 0)),
    };
    e.hedge = {
      lods: TC("hedge", 17, { W: 1.9, y0: 0.3 }).map((n) => [s, ...n]),
    };
  }
  return (
    Uk().forEach((s, n) => {
      e["car" + n] = [
        { mat: "car", geo: s.body },
        { mat: "tire", geo: s.wheels },
        { mat: "carlamp", geo: s.lamps },
      ];
    }),
    Object.assign(e, lV(on, cn, wi)),
    (e.clock = [
      {
        mat: "lamp",
        geo: on(
          new ks(3.2, 3.2, 0.2, 24),
          [0.95, 0.93, 0.85],
          cn(0, 0, 0, 0, 0, Math.PI / 2),
        ),
      },
    ]),
    e
  );
}
