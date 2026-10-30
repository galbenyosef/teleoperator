// app 260 — box
// Lines 131982-132293 of readable/app.pretty.js (statement-aligned).
function KI(o, t) {
  let e = t.round ?? 0.13,
    s = [-t.hw, -t.hw + e, ...(t.posts ? [-0.045, 0.045] : []), t.hw - e, t.hw],
    n = s.length - 1,
    i = (v) => {
      let x = t.zf - v * 0.9,
        y = t.roof - v * 0.45,
        M = [],
        S = [],
        w = (_, z, A) => {
          (M.push([_, z]), S.push(A));
        };
      if ((w(t.zb, t.yb, "under"), t.arch)) {
        let [_, z] = t.arch,
          A = z + 0.1,
          T = Math.asin(Math.max(-1, Math.min(1, (t.yb - z) / A))),
          E = o.lod ? 4 : 7;
        for (let R = 0; R <= E; R++) {
          let P = Math.PI - T - ((Math.PI - 2 * T) * R) / E;
          w(_ + Math.cos(P) * A, z + Math.sin(P) * A, R < E ? "well" : "under");
        }
      }
      return (
        w(x, t.yb, "front"),
        w(x, t.yb + t.gH, "paint"),
        w(x - 0.03, t.wBot, "wind"),
        w(x - t.rake, t.wTop, "paint"),
        w(x - t.rake - 0.14, y, "paint"),
        w(t.zb, y, "back"),
        { P: M, T: S }
      );
    },
    a = i(0),
    r = i(e),
    l = s.map((v, x) => (x === 0 || x === n ? r.P : a.P)),
    c = (v) => t.posts && v === 2;
  o.loftX(
    s,
    l,
    a.T,
    (v, x) =>
      v === "wind"
        ? x === 0 || x === n - 1 || c(x)
          ? t.paint
          : "wind"
        : v === "well" || v === "under"
          ? "black"
          : v === "back"
            ? t.back || "black"
            : t.paint,
    t.door,
  );
  let h = t.zf,
    f = t.roof,
    u = h - 0.2,
    d = t.winBack ?? t.zb + 0.35,
    p = t.sideBot ?? t.wBot + 0.05,
    m = t.wTop - 0.06,
    g = ((t.rake - 0.03) * (m - p)) / (t.wTop - t.wBot);
  for (let v of [1, -1]) {
    let x = v * (t.hw + 0.004);
    v > 0
      ? o.quad([x, p, u], [x, p, d], [x, m, d], [x, m, u - g], "glass")
      : o.quad([x, p, d], [x, p, u], [x, m, u - g], [x, m, d], "glass");
  }
  let b = t.hw - e - 0.04;
  if (
    (t.grille !== !1 &&
      o.quad(
        [-b + 0.46, t.yb + 0.1, h + 0.006],
        [b - 0.46, t.yb + 0.1, h + 0.006],
        [b - 0.46, t.yb + t.gH - 0.06, h + 0.006],
        [-b + 0.46, t.yb + t.gH - 0.06, h + 0.006],
        t.grille || "grille",
      ),
    t.lamps !== !1)
  )
    for (let v of [1, -1]) {
      let x = v * (b - 0.4),
        y = v * b,
        M = t.yb + (t.lampY ?? t.gH - 0.34),
        S = M + 0.26;
      if (
        (o.quad(
          [Math.min(x, y), M, h + 0.008],
          [Math.max(x, y), M, h + 0.008],
          [Math.max(x, y), S, h + 0.008],
          [Math.min(x, y), S, h + 0.008],
          "head",
          !0,
        ),
        !o.lod)
      ) {
        let w = v * (t.hw - 0.03);
        o.box(
          w - 0.03,
          w + 0.03,
          M + 0.02,
          S - 0.02,
          h - e * 0.9 - 0.02,
          h - e * 0.9 + 0.08,
          "amber",
        );
      }
    }
  if (!o.lod) {
    if (
      (o.box(
        -t.hw + 0.12,
        t.hw - 0.12,
        f - 0.1,
        f - 0.05,
        h - t.rake - 0.2,
        h - t.rake + 0.12,
        "black",
      ),
      t.markers !== !1)
    )
      for (let v = -2; v <= 2; v++)
        o.box(
          v * 0.25 - 0.05,
          v * 0.25 + 0.05,
          f,
          f + 0.05,
          h - t.rake - 0.2,
          h - t.rake - 0.1,
          "amber",
        );
    for (let v of [1, -1]) {
      let x = v * t.hw,
        y = v * (t.hw + 0.3),
        M = h - 0.12;
      (o.tube(
        [x, t.wTop - 0.25, h - 0.4],
        [y, t.wTop - 0.28, M],
        0.018,
        "chrome",
        4,
      ),
        o.tube(
          [x, t.wBot + 0.02, h - 0.35],
          [y, t.wTop - 0.95, M],
          0.018,
          "chrome",
          4,
        ),
        o.box(
          y - 0.07,
          y + 0.07,
          t.wTop - 1,
          t.wTop - 0.26,
          M - 0.04,
          M + 0.04,
          {
            px: "black",
            nx: "black",
            py: "black",
            ny: "black",
            pz: "black",
            nz: "glass",
          },
        ));
    }
    for (let v of [1, -1]) {
      let x = v > 0 ? t.hw - 0.2 : -t.hw - 0.02,
        y = v > 0 ? t.hw + 0.02 : -t.hw + 0.2;
      o.box(
        x,
        y,
        t.stepY ?? t.yb - 0.32,
        (t.stepY ?? t.yb - 0.32) + 0.06,
        t.stepZ[0],
        t.stepZ[1],
        "black",
      );
    }
  }
}
function n3t(o) {
  let t = o.lod;
  (KI(o, {
    zb: 2.85,
    zf: 4.82,
    hw: 1,
    yb: 0.78,
    roof: 2.62,
    wBot: 1.52,
    wTop: 2.42,
    rake: 0.2,
    gH: 0.62,
    arch: [3.85, 0.45],
    paint: "white",
    door: "doorC",
    stepZ: [3, 3.45],
    stepY: 0.52,
    winBack: 3.05,
  }),
    o.box(
      -1.08,
      1.08,
      0.45,
      0.8,
      4.66,
      5,
      {
        px: "black",
        nx: "black",
        py: "black",
        pz: "grey",
        ny: "black",
        nz: "black",
      },
      0.06,
    ));
  let e = 1.22,
    s = -5,
    n = 2.72;
  if (
    (o.quad([e, 1.05, n], [e, 1.05, s], [e, 3.9, s], [e, 3.9, n], "boxSide"),
    o.quad([-e, 1.05, s], [-e, 1.05, n], [-e, 3.9, n], [-e, 3.9, s], "boxSide"),
    o.box(-e, e, 1.05, 3.9, s, n, {
      px: null,
      nx: null,
      py: "white",
      pz: "boxFront",
      nz: "rollDoor",
      ny: "chassis",
    }),
    !t)
  ) {
    for (let i of [1, -1])
      o.box(i * e - 0.03, i * e + 0.03, 3.82, 3.9, s, n, "chrome");
    o.box(-e - 0.02, e + 0.02, 3.86, 3.92, s - 0.02, s + 0.06, "chrome");
    for (let i of [1, -1])
      for (let [a, r] of [
        [s - 0.05, s + 0.1],
        [n - 0.1, n + 0.04],
      ])
        o.box(i * e - 0.07, i * e + 0.07, 1, 3.92, a, r, "chrome", 0.02);
    o.box(-e + 0.07, e - 0.07, 3.62, 3.84, s - 0.07, s + 0.02, "chrome");
    for (let i of [1, -1])
      for (let a of [1.55, 2.35])
        o.box(i * e - 0.005, i * e + 0.035, a, a + 0.07, s + 0.12, n - 0.12, {
          px: "grey",
          nx: "grey",
          py: "grey",
          ny: "black",
          pz: "grey",
          nz: "grey",
        });
  }
  if (
    (o.box(-e - 0.02, e + 0.02, 0.92, 1.08, s - 0.06, n, {
      px: "grey",
      nx: "grey",
      py: "black",
      ny: "black",
      pz: "black",
      nz: "grey",
    }),
    o.frame(-4.8, 3.9, 0.55, 0.92, 0.46),
    o.box(-1, 1, 0.5, 0.62, -5.12, -4.95, "black"),
    !t)
  ) {
    (o.tube([0.55, 0.72, 0.4], [0.55, 0.72, 1.7], 0.24, "chrome", 10),
      o.box(-1.08, -0.55, 0.52, 0.95, 0.6, 1.5, "black", 0.03));
    for (let i of [-1.6, -0.2])
      o.box(-1.2, 1.2, 0.6, 0.85, i, i + 0.1, "black");
  }
  for (let i of [1, -1])
    (o.box(i * 0.98 - 0.15, i * 0.98 + 0.15, 1.12, 1.34, -5.02, -4.99, {
      nz: "tail",
      px: null,
      nx: null,
      py: null,
      ny: null,
      pz: null,
    }),
      o.box(i * 0.6 - 0.1, i * 0.6 + 0.1, 1.12, 1.34, -5.02, -4.99, {
        nz: "amber",
        px: null,
        nx: null,
        py: null,
        ny: null,
        pz: null,
      }));
  (o.axle(3.85, 0.45, 0.98, 0.26),
    o.axle(-2.4, 0.45, 0.92, 0.26, !0),
    o.arch(
      0.62,
      1.24,
      0.45,
      -2.4,
      0.55,
      0.05,
      Math.PI - 0.05,
      "black",
      t ? 3 : 6,
    ),
    o.arch(
      -1.24,
      -0.62,
      0.45,
      -2.4,
      0.55,
      0.05,
      Math.PI - 0.05,
      "black",
      t ? 3 : 6,
    ),
    o.flap(-3.05, 0.6, 1.2));
}
