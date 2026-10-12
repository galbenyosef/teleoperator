// app 263 — box
// Lines 132354-132638 of readable/app.pretty.js (statement-aligned).
function Fgt(i) {
  let t = i.lod;
  if (
    (vL(i, {
      zb: 2.5,
      zf: 4.62,
      hw: 1.24,
      yb: 0.62,
      roof: 2.95,
      wBot: 1.3,
      wTop: 2.78,
      rake: 0.14,
      gH: 0.55,
      arch: [3.5, 0.52],
      paint: "white",
      door: "doorGr",
      stepZ: [3.95, 4.45],
      stepY: 0.4,
      sideBot: 1.25,
      winBack: 3.2,
      markers: !1,
      lampY: 0.14,
    }),
    i.box(
      -1.28,
      1.28,
      0.36,
      0.66,
      4.5,
      4.78,
      {
        px: "black",
        nx: "black",
        py: "black",
        pz: "grey",
        ny: "black",
        nz: "black",
      },
      0.06,
    ),
    !t)
  )
    for (let o of [1, -1])
      i.box(o * 0.62 - 0.1, o * 0.62 + 0.1, 2.95, 3.12, 3.9, 4.1, "amber");
  let e = 1.25;
  (i.quad(
    [e, 0.98, 2.4],
    [e, 0.98, -3.6],
    [e, 3.42, -3.6],
    [e, 3.42, 2.4],
    "garbSide",
  ),
    i.quad(
      [-e, 0.98, -3.6],
      [-e, 0.98, 2.4],
      [-e, 3.42, 2.4],
      [-e, 3.42, -3.6],
      "garbSide",
    ),
    i.box(
      -e,
      e,
      0.98,
      3.75,
      -3.6,
      2.4,
      {
        px: null,
        nx: null,
        py: "green",
        pz: "green",
        nz: "green",
        ny: "chassis",
      },
      0.32,
    ));
  let s = [
      [-3.55, 0.78],
      [-4.72, 0.78],
      [-4.74, 1.55],
      [-4.5, 3.05],
      [-3.55, 3.55],
    ],
    n = ["under", "rear", "rear", "top", "fr"];
  if (
    (i.loftX(
      [-1.2, 1.2],
      [s, s],
      n,
      (o) =>
        o === "under"
          ? "black"
          : o === "rear"
            ? "hopper"
            : o === "fr"
              ? null
              : "green",
      "green",
    ),
    !t)
  )
    for (let o of [1, -1])
      (i.tube([o * 1.23, 1.2, -3.7], [o * 1.23, 3, -4.35], 0.06, "black", 6),
        i.tube(
          [o * 1.23, 1.55, -3.85],
          [o * 1.23, 2.55, -4.2],
          0.04,
          "chrome",
          6,
        ),
        i.box(o * 0.75 - 0.3, o * 0.75 + 0.3, 0.55, 0.61, -4.98, -4.7, "black"),
        i.tube(
          [o * 1.05, 0.62, -4.95],
          [o * 1.05, 1.4, -4.8],
          0.02,
          "amber",
          4,
        ));
  for (let o of [1, -1])
    i.box(o * 1.08 - 0.1, o * 1.08 + 0.1, 2.35, 2.9, -4.62, -4.58, {
      nz: "tail",
      px: null,
      nx: null,
      py: null,
      ny: null,
      pz: null,
    });
  (i.frame(-4.5, 3.9, 0.5, 0.98, 0.48),
    t || i.box(0.62, 1.22, 0.55, 0.98, 1, 2.2, "black", 0.03),
    i.axle(3.5, 0.52, 1.02, 0.3),
    i.axle(-1.55, 0.52, 0.95, 0.3, !0),
    i.axle(-2.85, 0.52, 0.95, 0.3, !0));
  for (let o of [1, -1])
    i.box(
      o > 0 ? 0.6 : -1.32,
      o > 0 ? 1.32 : -0.6,
      1.08,
      1.14,
      -3.45,
      -0.95,
      "black",
    );
  i.flap(-3.5, 0.6, 1.25);
}
function Ngt(i) {
  let t = i.lod,
    e = [
      [6.7, 2.12, 0.86],
      [7.6, 2.02, 0.84],
      [8.28, 1.92, 0.8],
    ];
  for (let a = 0; a + 1 < e.length; a++) {
    let r = ([h, f, u]) => [
        [-u, 1.05, h],
        [-u, f - 0.22, h],
        [-u + 0.2, f - 0.02, h],
        [u - 0.2, f - 0.02, h],
        [u, f - 0.22, h],
        [u, 1.05, h],
      ],
      l = r(e[a]),
      c = r(e[a + 1]);
    for (let h = 0; h < 5; h++) i.quad(l[h], c[h], c[h + 1], l[h + 1], "grey");
    a === e.length - 2 && i.poly(c, "cgrille", "x", "y", [0, 0, 1]);
  }
  i.box(-0.84, 0.84, 1.8, 1.9, 8.26, 8.34, "chrome");
  for (let a of [1, -1]) {
    let r = a > 0 ? 0.78 : -1.28,
      l = a > 0 ? 1.28 : -0.78;
    (i.arch(r, l, 0.52, 7.35, 0.64, 0.05, Math.PI - 0.12, "grey", t ? 4 : 8),
      i.quad(
        a > 0 ? [r, 0.9, 8.1] : [r, 0.9, 8.1],
        a > 0 ? [l, 0.9, 8.1] : [l, 0.9, 8.1],
        a > 0 ? [l, 1.18, 7.96] : [l, 1.18, 7.96],
        a > 0 ? [r, 1.18, 7.96] : [r, 1.18, 7.96],
        "grey",
      ));
    let c = a > 0 ? 0.86 : -1.2,
      h = a > 0 ? 1.2 : -0.86;
    i.quad(
      [Math.min(c, h), 1, 8.12],
      [Math.max(c, h), 1, 8.12],
      [Math.max(c, h), 1.16, 8],
      [Math.min(c, h), 1.16, 8],
      "head",
      !0,
    );
  }
  if (
    (i.box(-1.3, 1.3, 0.42, 0.8, 8.22, 8.5, "chrome", 0.07),
    vL(i, {
      zb: 4.95,
      zf: 6.75,
      hw: 1.2,
      yb: 1,
      roof: 3.25,
      wBot: 2.15,
      wTop: 3.05,
      rake: 0.36,
      gH: 1,
      paint: "grey",
      door: "doorG",
      back: "grey",
      posts: !0,
      grille: !1,
      stepZ: [5.3, 6],
      stepY: 0.62,
      winBack: 5.35,
      lamps: !1,
    }),
    !t)
  )
    for (let a of [1, -1])
      (i.tube([a * 1.05, 1.3, 4.82], [a * 1.05, 4.15, 4.82], 0.08, "chrome", 8),
        i.tube(
          [a * 1.05, 3.6, 4.82],
          [a * 1.05, 4.15, 4.82],
          0.1,
          "black",
          8,
          0.1,
          null,
        ),
        i.tube([a * 0.98, 0.78, 5.05], [a * 0.98, 0.78, 6.4], 0.3, "chrome", 8),
        i.box(
          a > 0 ? 0.7 : -1.3,
          a > 0 ? 1.3 : -0.7,
          0.34,
          0.95,
          4.72,
          4.78,
          "black",
        ));
  (i.frame(2.2, 8.2, 0.62, 1, 0.46),
    i.box(-0.8, 0.8, 1.02, 1.18, 3.2, 4.4, "black"),
    i.axle(7.35, 0.52, 1.03, 0.3, !1, "alloy"),
    i.axle(4.25, 0.52, 0.94, 0.3, !0, "alloy"),
    i.axle(2.95, 0.52, 0.94, 0.3, !0, "alloy"),
    i.flap(2.2, 0.55, 1.3, 0.2, 0.95));
  let s = 1.3,
    n = -8.5,
    o = 4.2;
  (i.quad([s, 1.3, o], [s, 1.3, n], [s, 4.1, n], [s, 4.1, o], "trailerSide"),
    i.quad(
      [-s, 1.3, n],
      [-s, 1.3, o],
      [-s, 4.1, o],
      [-s, 4.1, n],
      "trailerSide",
    ),
    i.box(-s, s, 1.3, 4.1, n, o, {
      px: null,
      nx: null,
      py: "white",
      pz: "boxFront",
      nz: "trailerDoors",
      ny: "chassis",
    }),
    i.box(-0.55, 0.55, 1.02, 1.3, n + 0.2, o - 0.4, "chassis"));
  for (let a of [1, -1]) {
    let r = a * (s - 0.05);
    (i.quad(
      a > 0 ? [r, 0.45, 0.6] : [r, 0.45, -5.3],
      a > 0 ? [r, 0.45, -5.3] : [r, 0.45, 0.6],
      a > 0 ? [r, 1.3, -5.3] : [r, 1.3, 0.6],
      a > 0 ? [r, 1.3, 0.6] : [r, 1.3, -5.3],
      "skirt",
    ),
      t ||
        (i.box(a * 0.9 - 0.06, a * 0.9 + 0.06, 0.25, 1.3, 1.2, 1.32, "chassis"),
        i.box(a * 0.9 - 0.12, a * 0.9 + 0.12, 0.2, 0.26, 1.14, 1.38, "black")),
      i.box(a * 1 - 0.12, a * 1 + 0.12, 1, 1.2, n - 0.03, n, {
        nz: "tail",
        px: null,
        nx: null,
        py: null,
        ny: null,
        pz: null,
      }));
  }
  (i.box(-1.25, 1.25, 0.5, 0.66, n - 0.12, n + 0.02, "black"),
    i.axle(-6.35, 0.52, 0.94, 0.3, !0, "alloy"),
    i.axle(-7.6, 0.52, 0.94, 0.3, !0, "alloy"),
    i.flap(-8.25, 0.55, 1.3, 0.2, 0.95));
}
