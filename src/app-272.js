// app 272 — mat
// Lines 135741-136106 of readable/app.pretty.js (statement-aligned).
function cyt() {
  let o = [0.23, 0.24, 0.24],
    t = [0.05, 0.05, 0.05],
    e = {};
  e.lamp = [
    {
      mat: "metal",
      geo: wi([
        hn(new vs(0.07, 0.12, 8.4, 8), o, un(0, 4.2, 0)),
        hn(new vs(0.045, 0.05, 2.6, 6), o, un(0, 8.3, 1.2, Math.PI / 2 - 0.12)),
        hn(new Is(0.42, 0.18, 0.85), o, un(0, 8.45, 2.55)),
      ]),
    },
    {
      mat: "lamp",
      geo: hn(new Is(0.34, 0.05, 0.62), [1, 0.82, 0.55], un(0, 8.34, 2.55)),
    },
  ];
  {
    let s = [0.035, 0.07, 0.05],
      n = [1, 0.86, 0.62];
    ((e.lamp2 = [
      {
        mat: "metal",
        geo: wi([
          hn(new vs(0.2, 0.26, 0.9, 10), s, un(0, 0.45, 0)),
          hn(new vs(0.075, 0.11, 5, 10), s, un(0, 3.3, 0)),
          hn(new vs(0.13, 0.13, 0.22, 10), s, un(0, 5, 0)),
          hn(new Is(0.06, 0.08, 1.5), s, un(0, 5.55, 0)),
          ...[-0.66, 0.66].map((i) =>
            hn(new vs(0.2, 0.08, 0.14, 8), s, un(0, 5.68, i)),
          ),
          ...[-0.66, 0.66].map((i) =>
            hn(new fr(0.24, 0.26, 8), s, un(0, 6.3, i)),
          ),
          hn(new fr(0.06, 0.5, 6), s, un(0, 6.2, 0)),
        ]),
      },
      {
        mat: "lamp",
        geo: wi(
          [-0.66, 0.66].map((i) =>
            hn(new vs(0.19, 0.15, 0.48, 8), n, un(0, 5.95, i)),
          ),
        ),
      },
    ]),
      (e.plamp = [
        {
          mat: "metal",
          geo: wi([
            hn(new vs(0.06, 0.09, 3.9, 8), [0.03, 0.03, 0.03], un(0, 1.95, 0)),
            hn(new vs(0.1, 0.07, 0.16, 8), [0.03, 0.03, 0.03], un(0, 3.95, 0)),
            hn(new fr(0.2, 0.18, 8), [0.03, 0.03, 0.03], un(0, 4.55, 0)),
          ]),
        },
        {
          mat: "lamp",
          geo: hn(new Er(0.21, 10, 8), n, un(0, 4.25, 0, 0, 0, 0, [1, 1.3, 1])),
        },
      ]));
  }
  {
    let s = [0.03, 0.14, 0.08],
      n = [0.55, 0.38, 0.08],
      i = [0.42, 0.035, 0.025],
      a = [1, 0.78, 0.45],
      r = [];
    r.push(
      hn(new vs(0.3, 0.36, 0.7, 8), s, un(0, 0.35, 0)),
      hn(new vs(0.22, 0.3, 0.2, 8), n, un(0, 0.8, 0)),
      hn(new vs(0.075, 0.1, 3, 10), s, un(0, 2.3, 0)),
      hn(new vs(0.14, 0.14, 0.2, 8), i, un(0, 3.8, 0)),
      hn(new vs(0.2, 0.12, 0.18, 6), s, un(0, 3.98, 0)),
    );
    for (let l of [0, Math.PI]) {
      for (let h = 0; h <= 1.0001; h += 0.035) {
        let f = l + h * Math.PI * 3.2,
          u = 1.05 + h * 2.55,
          d = 0.15 + 0.03 * Math.sin(h * 17);
        r.push(
          hn(
            new Er(0.055 + 0.02 * Math.sin(h * Math.PI), 6, 4),
            n,
            un(Math.cos(f) * d, u, Math.sin(f) * d),
          ),
        );
      }
      let c = l + Math.PI * 3.2;
      r.push(
        hn(
          new Is(0.12, 0.1, 0.22),
          n,
          un(Math.cos(c) * 0.2, 3.65, Math.sin(c) * 0.2, 0, -c, 0),
        ),
      );
    }
    r.push(
      hn(new vs(0.05, 0.05, 0.75, 6), i, un(0, 4.45, 0)),
      hn(new fr(0.62, 0.34, 6), s, un(0, 5, 0)),
      hn(new vs(0.64, 0.58, 0.06, 6), n, un(0, 4.84, 0)),
      hn(new fr(0.07, 0.4, 6), n, un(0, 5.35, 0)),
      hn(new vs(0.34, 0.34, 0.06, 6), i, un(0, 4.08, 0)),
      hn(new vs(0.34, 0.34, 0.06, 6), i, un(0, 4.8, 0)),
    );
    for (let l = 0; l < 6; l++) {
      let c = (l * Math.PI) / 3 + Math.PI / 6;
      r.push(
        hn(
          new Is(0.04, 0.72, 0.04),
          i,
          un(Math.cos(c) * 0.31, 4.44, Math.sin(c) * 0.31),
        ),
      );
    }
    e.dlamp = [
      { mat: "metal", geo: wi(r) },
      { mat: "lamp", geo: hn(new vs(0.29, 0.29, 0.68, 6), a, un(0, 4.44, 0)) },
    ];
  }
  for (let [s, [n, i]] of Object.entries(ryt))
    e[s] = TF?.[s] ? { lods: TF[s].lods } : { lods: rJ(n, i) };
  for (let [s, n] of Object.entries(nI))
    n.forEach((i, a) => {
      e[a ? s + "~" + a : s] = { lods: i() };
    });
  ((e.shrub = {
    lods: n2("mound", 9),
    plant: "mound",
    cells: [gn.pitto, gn.escal, gn.pitto, gn.coyote, gn.hydr, gn.rosem],
  }),
    (e.clump = {
      lods: n2("clump", 19),
      plant: "clump",
      cells: [gn.flax, gn.agap, gn.fern, gn.wild],
    }),
    (e.mat = {
      lods: n2("mat", 29),
      plant: "mat",
      cells: [gn.ivy, gn.ice, gn.clover],
    }),
    (e.flowers = { lods: iI("flower", 13) }),
    (e.fhedge = { lods: oI(61, 0), plant: "mound", cells: [gn.box] }),
    (e.fhedge2 = { lods: oI(67, 1), plant: "mound", cells: [gn.pitto] }),
    (e.planter = { lods: lJ(), plant: "mound", cells: [gn.box] }),
    (e.ivywall = { lods: cJ(), plant: "mat", cells: [gn.ivy] }));
  {
    let r = wi(
        [
          [0, 0.6000000000000001, 1.32, 0.12],
          [0, -0.6000000000000001, 1.32, 0.12],
          [0.6000000000000001, 0, 0.12, 1.08],
          [-0.6000000000000001, 0, 0.12, 1.08],
        ].map(([c, h, f, u]) =>
          hn(
            new Is(f, 0.32, u),
            [0.3, 0.29, 0.27],
            un(c, 0.04000000000000001, h),
          ),
        ),
      ),
      l = new Yn(0.54 * 2, 0.54 * 2);
    (l.rotateX(-Math.PI / 2), l.translate(0, 0.17, 0));
    {
      let c = l.attributes.uv;
      for (let h = 0; h < c.count; h++)
        c.setXY(h, 0.05 + c.getX(h) * 0.4, 0.55 + (1 - c.getY(h)) * 0.4);
    }
    e.well = [
      { mat: "paint", geo: r },
      { mat: "well", geo: tQ(eQ(l), [0.8, 0.8, 0.8]) },
    ];
  }
  e.stop = [
    {
      mat: "metal",
      geo: hn(new vs(0.035, 0.035, 2.6, 6), [0.55, 0.56, 0.56], un(0, 1.3, 0)),
    },
    {
      mat: "sign",
      geo: (() => {
        let s = (i) => {
            let a = i.attributes.uv;
            for (let r = 0; r < a.count; r++) a.setXY(r, 0.5, 0.985);
            return i;
          },
          n = new da(0.4, 8, Math.PI / 8);
        return (
          n.rotateY(Math.PI),
          n.translate(0, 2.35, -0.09),
          wi([
            s(
              hn(
                new vs(0.4, 0.4, 0.02, 8),
                [0.85, 0.85, 0.85],
                un(0, 2.35, -0.045, Math.PI / 2, Math.PI / 8, 0),
              ),
            ),
            s(
              hn(
                new vs(0.37, 0.37, 0.02, 8),
                [0.62, 0.02, 0.02],
                un(0, 2.35, -0.0555, Math.PI / 2, Math.PI / 8, 0),
              ),
            ),
            hn(n, [1, 1, 1]),
          ])
        );
      })(),
    },
  ];
  {
    let s = [],
      n = [],
      i = (a, r, l) => {
        s.push(
          hn(new Is(0.26, 1.02, 0.36), [0.3, 0.25, 0.035], un(a, r, l)),
          hn(new Is(0.03, 1.22, 0.58), [0.03, 0.03, 0.03], un(a - 0.14, r, l)),
        );
        for (let [c, h] of [
          [1, 0.2],
          [0, 0.5],
          [-1, 0.8],
        ])
          (n.push(
            hn(
              new vs(0.105, 0.105, 0.03, 12),
              [1, 1, h],
              un(a + 0.135, r + c * 0.32, l, 0, 0, Math.PI / 2),
            ),
          ),
            s.push(
              hn(
                new Is(0.2, 0.025, 0.27),
                [0.04, 0.04, 0.04],
                un(a + 0.23, r + c * 0.32 + 0.13, l, 0, 0, -0.12),
              ),
            ));
      };
    (i(0, 4.75, 4.4),
      i(0, 4.75, 2.5),
      i(0, 3, 0.36),
      (e.signal = [
        {
          mat: "metal",
          geo: wi([
            hn(new vs(0.1, 0.13, 5.6, 8), [0.2, 0.22, 0.2], un(0, 2.8, 0)),
            hn(
              new vs(0.06, 0.07, 5.2, 6),
              [0.2, 0.22, 0.2],
              un(0, 5.4, 2.5, Math.PI / 2),
            ),
          ]),
        },
        { mat: "metal", geo: wi(s) },
        { mat: "signal", geo: wi(n) },
      ]),
      (s.length = 0),
      (n.length = 0),
      i(0, 3, 0.36),
      i(0, 4.1, 0.36),
      (e.signalp = [
        {
          mat: "metal",
          geo: wi([
            hn(new vs(0.09, 0.12, 4.7, 8), [0.2, 0.22, 0.2], un(0, 2.35, 0)),
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
        hn(new vs(0.1, 0.14, 7.4, 8), [0.33, 0.35, 0.33], un(0, 3.7, 0)),
        hn(new vs(0.12, 0.12, 0.3, 8), [0.33, 0.35, 0.33], un(0, 7.2, 0)),
      ]),
    },
  ];
  {
    let s = [0.05, 0.05, 0.05],
      n = [0.2, 0.165, 0.125],
      i = [0.36, 0.38, 0.36];
    e.tpole = [
      {
        mat: "metal",
        geo: wi([
          hn(new vs(0.09, 0.11, 7.9, 8), s, un(0, 3.65, 0)),
          hn(new vs(0.12, 0.12, 0.25, 8), s, un(0, 7.5, 0)),
        ]),
      },
    ];
    let a = (c) => {
      let h = [
        hn(new vs(0.12, 0.15, 10.8, 8), n, un(0, 5, 0)),
        hn(new Is(0.11, 0.11, 2.4), n, un(0, 9.85, -0.05)),
        hn(new Is(0.05, 0.05, 0.92), n, un(0, 9.52, -0.35, -0.68, 0, 0)),
        hn(new Is(0.05, 0.05, 0.92), n, un(0, 9.52, 0.35, 0.68, 0, 0)),
        hn(new Is(0.08, 0.08, 0.35), n, un(0, 6.9, 0.18)),
      ];
      for (let f of [-1.1, 0, 1])
        h.push(hn(new vs(0.04, 0.05, 0.17, 6), i, un(0, 9.995, f)));
      return (
        c && h.push(hn(new vs(0.3, 0.3, 1.2, 8), i, un(0, 8.2, -0.42))),
        [{ mat: "paint", geo: wi(h) }]
      );
    };
    ((e.upole = a(!1)), (e.upolet = a(!0)));
    let r = [0.12, 0.2, 0.15],
      l = [0.42, 0.44, 0.42];
    ((e.fpole = [
      { mat: "metal", geo: hn(new vs(0.12, 0.14, 7.4, 8), r, un(0, 3.5, 0)) },
    ]),
      (e.farm = [
        {
          mat: "metal",
          geo: wi([
            hn(new Is(2, 0.1, 0.08), r, un(0, 6.35, 0)),
            hn(new Is(1.166, 0.05, 0.05), r, un(0.5, 6.7, 0, 0, 0, -0.54)),
            hn(new Is(1.166, 0.05, 0.05), r, un(-0.5, 6.7, 0, 0, 0, 0.54)),
          ]),
        },
      ]),
      (e.tlpole = [
        {
          mat: "metal",
          geo: wi([
            hn(new vs(0.1, 0.12, 7.2, 8), l, un(0, 3.4, 0)),
            hn(new Is(0.06, 0.05, 2.6), l, un(0, 6.6, 1.3)),
          ]),
        },
      ]));
  }
  {
    let s = {
      mat: "paint",
      geo: hn(new Is(2.2, 0.55, 1), [0.42, 0.16, 0.1], un(0, 0.05, 0)),
    };
    e.hedge = {
      lods: iI("hedge", 17, { W: 1.9, y0: 0.3 }).map((n) => [s, ...n]),
    };
  }
  return (
    Uz().forEach((s, n) => {
      e["car" + n] = [
        { mat: "car", geo: s.body },
        { mat: "tire", geo: s.wheels },
        { mat: "carlamp", geo: s.lamps },
      ];
    }),
    Object.assign(e, fX(hn, un, wi)),
    (e.clock = [
      {
        mat: "lamp",
        geo: hn(
          new vs(3.2, 3.2, 0.2, 24),
          [0.95, 0.93, 0.85],
          un(0, 0, 0, 0, 0, Math.PI / 2),
        ),
      },
    ]),
    e
  );
}
