// app 261 — box
// Lines 131723-132034 of readable/app.pretty.js (statement-aligned).
function vL(i, t) {
  let e = t.round ?? 0.13,
    s = [-t.hw, -t.hw + e, ...(t.posts ? [-0.045, 0.045] : []), t.hw - e, t.hw],
    n = s.length - 1,
    o = (x) => {
      let v = t.zf - x * 0.9,
        y = t.roof - x * 0.45,
        M = [],
        S = [],
        w = (z, _, R) => {
          (M.push([z, _]), S.push(R));
        };
      if ((w(t.zb, t.yb, "under"), t.arch)) {
        let [z, _] = t.arch,
          R = _ + 0.1,
          T = Math.asin(Math.max(-1, Math.min(1, (t.yb - _) / R))),
          E = i.lod ? 4 : 7;
        for (let A = 0; A <= E; A++) {
          let C = Math.PI - T - ((Math.PI - 2 * T) * A) / E;
          w(z + Math.cos(C) * R, _ + Math.sin(C) * R, A < E ? "well" : "under");
        }
      }
      return (
        w(v, t.yb, "front"),
        w(v, t.yb + t.gH, "paint"),
        w(v - 0.03, t.wBot, "wind"),
        w(v - t.rake, t.wTop, "paint"),
        w(v - t.rake - 0.14, y, "paint"),
        w(t.zb, y, "back"),
        { P: M, T: S }
      );
    },
    a = o(0),
    r = o(e),
    l = s.map((x, v) => (v === 0 || v === n ? r.P : a.P)),
    c = (x) => t.posts && x === 2;
  i.loftX(
    s,
    l,
    a.T,
    (x, v) =>
      x === "wind"
        ? v === 0 || v === n - 1 || c(v)
          ? t.paint
          : "wind"
        : x === "well" || x === "under"
          ? "black"
          : x === "back"
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
  for (let x of [1, -1]) {
    let v = x * (t.hw + 0.004);
    x > 0
      ? i.quad([v, p, u], [v, p, d], [v, m, d], [v, m, u - g], "glass")
      : i.quad([v, p, d], [v, p, u], [v, m, u - g], [v, m, d], "glass");
  }
  let b = t.hw - e - 0.04;
  if (
    (t.grille !== !1 &&
      i.quad(
        [-b + 0.46, t.yb + 0.1, h + 0.006],
        [b - 0.46, t.yb + 0.1, h + 0.006],
        [b - 0.46, t.yb + t.gH - 0.06, h + 0.006],
        [-b + 0.46, t.yb + t.gH - 0.06, h + 0.006],
        t.grille || "grille",
      ),
    t.lamps !== !1)
  )
    for (let x of [1, -1]) {
      let v = x * (b - 0.4),
        y = x * b,
        M = t.yb + (t.lampY ?? t.gH - 0.34),
        S = M + 0.26;
      if (
        (i.quad(
          [Math.min(v, y), M, h + 0.008],
          [Math.max(v, y), M, h + 0.008],
          [Math.max(v, y), S, h + 0.008],
          [Math.min(v, y), S, h + 0.008],
          "head",
          !0,
        ),
        !i.lod)
      ) {
        let w = x * (t.hw - 0.03);
        i.box(
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
  if (!i.lod) {
    if (
      (i.box(
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
      for (let x = -2; x <= 2; x++)
        i.box(
          x * 0.25 - 0.05,
          x * 0.25 + 0.05,
          f,
          f + 0.05,
          h - t.rake - 0.2,
          h - t.rake - 0.1,
          "amber",
        );
    for (let x of [1, -1]) {
      let v = x * t.hw,
        y = x * (t.hw + 0.3),
        M = h - 0.12;
      (i.tube(
        [v, t.wTop - 0.25, h - 0.4],
        [y, t.wTop - 0.28, M],
        0.018,
        "chrome",
        4,
      ),
        i.tube(
          [v, t.wBot + 0.02, h - 0.35],
          [y, t.wTop - 0.95, M],
          0.018,
          "chrome",
          4,
        ),
        i.box(
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
    for (let x of [1, -1]) {
      let v = x > 0 ? t.hw - 0.2 : -t.hw - 0.02,
        y = x > 0 ? t.hw + 0.02 : -t.hw + 0.2;
      i.box(
        v,
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
function Lgt(i) {
  let t = i.lod;
  (vL(i, {
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
    i.box(
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
    (i.quad([e, 1.05, n], [e, 1.05, s], [e, 3.9, s], [e, 3.9, n], "boxSide"),
    i.quad([-e, 1.05, s], [-e, 1.05, n], [-e, 3.9, n], [-e, 3.9, s], "boxSide"),
    i.box(-e, e, 1.05, 3.9, s, n, {
      px: null,
      nx: null,
      py: "white",
      pz: "boxFront",
      nz: "rollDoor",
      ny: "chassis",
    }),
    !t)
  ) {
    for (let o of [1, -1])
      i.box(o * e - 0.03, o * e + 0.03, 3.82, 3.9, s, n, "chrome");
    i.box(-e - 0.02, e + 0.02, 3.86, 3.92, s - 0.02, s + 0.06, "chrome");
    for (let o of [1, -1])
      for (let [a, r] of [
        [s - 0.05, s + 0.1],
        [n - 0.1, n + 0.04],
      ])
        i.box(o * e - 0.07, o * e + 0.07, 1, 3.92, a, r, "chrome", 0.02);
    i.box(-e + 0.07, e - 0.07, 3.62, 3.84, s - 0.07, s + 0.02, "chrome");
    for (let o of [1, -1])
      for (let a of [1.55, 2.35])
        i.box(o * e - 0.005, o * e + 0.035, a, a + 0.07, s + 0.12, n - 0.12, {
          px: "grey",
          nx: "grey",
          py: "grey",
          ny: "black",
          pz: "grey",
          nz: "grey",
        });
  }
  if (
    (i.box(-e - 0.02, e + 0.02, 0.92, 1.08, s - 0.06, n, {
      px: "grey",
      nx: "grey",
      py: "black",
      ny: "black",
      pz: "black",
      nz: "grey",
    }),
    i.frame(-4.8, 3.9, 0.55, 0.92, 0.46),
    i.box(-1, 1, 0.5, 0.62, -5.12, -4.95, "black"),
    !t)
  ) {
    (i.tube([0.55, 0.72, 0.4], [0.55, 0.72, 1.7], 0.24, "chrome", 10),
      i.box(-1.08, -0.55, 0.52, 0.95, 0.6, 1.5, "black", 0.03));
    for (let o of [-1.6, -0.2])
      i.box(-1.2, 1.2, 0.6, 0.85, o, o + 0.1, "black");
  }
  for (let o of [1, -1])
    (i.box(o * 0.98 - 0.15, o * 0.98 + 0.15, 1.12, 1.34, -5.02, -4.99, {
      nz: "tail",
      px: null,
      nx: null,
      py: null,
      ny: null,
      pz: null,
    }),
      i.box(o * 0.6 - 0.1, o * 0.6 + 0.1, 1.12, 1.34, -5.02, -4.99, {
        nz: "amber",
        px: null,
        nx: null,
        py: null,
        ny: null,
        pz: null,
      }));
  (i.axle(3.85, 0.45, 0.98, 0.26),
    i.axle(-2.4, 0.45, 0.92, 0.26, !0),
    i.arch(
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
    i.arch(
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
    i.flap(-3.05, 0.6, 1.2));
}
