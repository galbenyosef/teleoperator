// app 139 — stone
// Lines 90981-91175 of readable/app.pretty.js (statement-aligned).
function Oq(i, t, e) {
  let { L: s } = e,
    n = new Ce(),
    [o, a] = Ty.c,
    r = s.driveHeight(o + 9, a),
    l = (u) => r + u,
    c = It(Lt.stone, 0.82, 0.74, 0.58),
    h = It(Lt.stone, 0.62, 0.56, 0.46),
    f = It(Lt.gold, 0.55, 0.42, 0.24);
  (Oe(
    n,
    o,
    a,
    [
      [8.2, l(-0.4)],
      [8.2, l(0.35)],
      [7.6, l(0.55)],
    ],
    32,
    h,
  ),
    ql(n, o, l(0.55), a, 7.6, 32, h),
    Oe(
      n,
      o,
      a,
      [
        [2.1, l(0.5)],
        [2.1, l(18.4)],
      ],
      16,
      c,
    ));
  for (let [u, d] of [
    [4.2, 6.6],
    [7.7, 6.25],
    [11.2, 5.9],
    [14.7, 5.55],
    [18.2, 5.2],
  ]) {
    Oe(
      n,
      o,
      a,
      [
        [2.1, l(u + 0.1)],
        [d - 0.4, l(u + 0.3)],
        [d, l(u + 0.5)],
        [d + 0.05, l(u + 0.72)],
        [d - 0.2, l(u + 0.82)],
        [d * 0.55, l(u + 1.25)],
        [2.1, l(u + 1.85)],
      ],
      32,
      c,
    );
    for (let p = 0; p < 8; p++) {
      let m = ((p + 0.5) / 8) * 2 * Math.PI;
      Ae(
        n,
        [o + Math.cos(m) * 2.1, l(u - 0.6), a + Math.sin(m) * 2.1],
        [o + Math.cos(m) * (d - 0.8), l(u + 0.3), a + Math.sin(m) * (d - 0.8)],
        0.12,
        h,
        4,
      );
    }
  }
  Ae(n, [o, l(19.8), a], [o, l(29.4), a], [0.32, 0.16], f, 8);
  for (let u = 0; u < 9; u++) {
    let d = l(21.2 + u * 0.82),
      p = 0.95 - u * 0.04;
    Oe(
      n,
      o,
      a,
      [
        [0.2, d - 0.08],
        [p, d - 0.05],
        [p, d + 0.05],
        [0.2, d + 0.08],
      ],
      16,
      f,
    );
  }
  (Oe(
    n,
    o,
    a,
    [
      [0.05, l(29.2)],
      [0.42, l(29.7)],
      [0.3, l(30.3)],
      [0.02, l(30.9)],
    ],
    12,
    f,
  ),
    e.colliders.push({ t: "circ", x: o, z: a, r: 2.3 }),
    gn(i.group, n, t.lm, "PeacePagoda"));
}
function Hq(i, t, e) {
  let { D: s, L: n } = e,
    o = {};
  for (let a of s.edges) {
    if (a.name !== "Octavia Street" || !a.oneway || a.inner || a.elev) continue;
    let r = Ot(a, (a.s0 + a.s1) / 2, {});
    if (r.z < 2050 || r.z > 2620) continue;
    let l = 0;
    for (let c of [-1, 1]) {
      let h = r.x + r.nx * c * (r.w + 4),
        f = r.z + r.nz * c * (r.w + 4),
        u = n.roadAt(h, f, 6);
      u && u.E.name === "Octavia Boulevard" && (l = c);
    }
    if (l)
      for (let c = a.s0 + 5; c < a.s1 - 4; c += 8) {
        Ot(a, c, o);
        let h = o.w + 1.3,
          f = o.x + o.nx * l * h,
          u = o.z + o.nz * l * h;
        if (n.surfaceAt(f, u) === "road") continue;
        let d = n.driveHeight(f, u),
          p = Math.abs(Math.sin(f * 12.99 + u * 78.23) * 43758.5) % 1;
        (e.inst.push({
          kind: "tree",
          sp: p < 0.6 ? "tree0" : "tree2",
          x: f,
          y: d,
          z: u,
          rot: p * 6.28,
          scale: 0.8 + 0.35 * p,
        }),
          e.colliders.push({
            t: "circ",
            x: f,
            z: u,
            r: 0.3,
            y0: d - 1.5,
            y1: d + 6,
          }));
      }
  }
}
var al = [
    [370.6, 1752.3],
    [271.7, 1851.9],
    [222.3, 1902.9],
    [234.3, 1913.7],
    [231.5, 1917.7],
    [235.5, 1921.4],
    [204.1, 1966.3],
    [238, 2e3],
    [242.2, 1994],
    [264.1, 2010.5],
    [268.1, 2004.7],
    [291, 2019.6],
    [318.3, 2005.8],
    [320.8, 2006.9],
    [375.6, 1982.2],
    [486.7, 1927.2],
    [484.6, 1898.1],
    [490.3, 1894.7],
    [494.9, 1890.1],
    [497, 1887],
    [499.7, 1880.3],
    [499.1, 1878],
    [406.8, 1786.7],
  ],
  fut = [
    [369, 1763, 62],
    [231, 1903, 65],
    [331, 1803, 70],
    [285, 1841, 70],
    [303, 1978, 69],
  ],
  Vd = { c: [352, 1890], ring: al, home: [292, 1922], cf: [470, 1898] },
  uut = It(Lt.stone, 0.36, 0.13, 0.075),
  dut = It(Lt.stone, 0.27, 0.1, 0.06),
  F7 = It(Lt.stone, 0.7, 0.66, 0.56),
  put = It(Lt.matte, 0.025, 0.025, 0.028),
  Dq = It(Lt.matte, 0.04, 0.15, 0.09),
  Uq = It(Lt.matte, 0.06, 0.2, 0.12),
  mut = It(Lt.stone, 0.55, 0.54, 0.5),
  N7 = It(Lt.gloss, 0.08, 0.2, 0.13),
  jl = It(Lt.matte, 0.32, 0.34, 0.35),
  Gq = It(Lt.leaf, 0.09, 0.26, 0.06),
  Wq = It(Lt.stone, 0.42, 0.25, 0.14),
  B7 = It(Lt.matte, 0.8, 0.8, 0.77),
  gut = It(Lt.matte, 0.78, 0.78, 0.75),
  but = It(Lt.glass, 0.02, 0.022, 0.026),
  xut = It(Lt.gloss, 0.5, 0.03, 0.03),
  vut = It(Lt.stone, 0.22, 0.12, 0.06),
  yut = bn(1, 0.97, 0.9);
