// app 261 — box
// Lines 132294-132612 of readable/app.pretty.js (statement-aligned).
function i3t(o) {
  let t = o.lod,
    e = 1.2,
    s = 2.35,
    n = s - 0.22,
    i = -3.28,
    a = 0.55,
    r = 2.88,
    l = sM("vanSide"),
    c = (f, u, d, p, m) => {
      let g = (y) =>
          l[0] +
          (l[2] - l[0]) * (f > 0 ? (n - y) / (n - i) : (y - i) / (n - i)),
        b = (y) => l[1] + ((l[3] - l[1]) * (y - a)) / (r - a),
        [v, x] = f > 0 ? [d, u] : [u, d];
      o.quad(
        [f * e, p, v],
        [f * e, p, x],
        [f * e, m, x],
        [f * e, m, v],
        "vanSide",
        !1,
        [g(v), b(p), g(x), b(m)],
      );
    };
  for (let f of [1, -1])
    t
      ? c(f, i, n, a, r)
      : (c(f, i, 1.25, a, r),
        c(f, 2.05, n, a, r),
        c(f, 1.25, 2.05, 2.5, r),
        c(f, 1.25, 2.05, a, 0.62));
  if (
    (o.box(
      -e,
      e,
      0.55,
      3.1,
      -3.5,
      s,
      {
        px: null,
        nx: null,
        py: "navy",
        pz: "vanFront",
        nz: "vanRear",
        ny: "chassis",
      },
      0.22,
    ),
    !t)
  ) {
    o.box(-e - 0.02, e + 0.02, 0.5, 0.64, -3.52, s - 0.3, {
      px: "grey",
      nx: "grey",
      py: "black",
      ny: "black",
      pz: "grey",
      nz: "grey",
    });
    for (let f of [1, -1])
      o.box(f * e - 0.01, f * e + 0.03, 2.98, 3.02, -3.3, s - 0.3, "navy");
  }
  for (let f of [1, -1]) {
    let u = f * 0.05,
      d = f * 1.06;
    o.quad(
      f > 0 ? [u, 1.55, s + 0.005] : [d, 1.55, s + 0.005],
      f > 0 ? [d, 1.55, s + 0.005] : [u, 1.55, s + 0.005],
      f > 0 ? [d, 2.62, s + 0.005] : [u, 2.62, s + 0.005],
      f > 0 ? [u, 2.62, s + 0.005] : [d, 2.62, s + 0.005],
      "wind",
    );
  }
  if (!t) {
    o.box(-1.1, 1.1, 2.66, 2.72, s - 0.02, s + 0.12, "black");
    for (let f = -1; f <= 1; f++)
      o.box(
        f * 0.4 - 0.05,
        f * 0.4 + 0.05,
        3.1,
        3.14,
        s - 0.2,
        s - 0.1,
        "amber",
      );
  }
  let h = [
    [s - 0.05, 1.45, 1.02],
    [s + 0.5, 1.38, 1],
    [3.28, 1.26, 0.96],
  ];
  for (let f = 0; f + 1 < h.length; f++) {
    let u = h[f],
      d = h[f + 1],
      p = ([b, v, x]) => [
        [-x, 0.55, b],
        [-x, v - 0.12, b],
        [-x + 0.14, v, b],
        [x - 0.14, v, b],
        [x, v - 0.12, b],
        [x, 0.55, b],
      ],
      m = p(u),
      g = p(d);
    for (let b = 0; b < 5; b++) o.quad(m[b], g[b], g[b + 1], m[b + 1], "navy");
    f === h.length - 2 && o.poly(g, "grille", "x", "y", [0, 0, 1]);
  }
  for (let f of [1, -1]) {
    let u = Math.min(f * 0.62, f * 0.92),
      d = Math.max(f * 0.62, f * 0.92);
    o.quad(
      [u, 0.92, 3.285],
      [d, 0.92, 3.285],
      [d, 1.12, 3.285],
      [u, 1.12, 3.285],
      "head",
      !0,
    );
  }
  o.box(
    -1.18,
    1.18,
    0.35,
    0.62,
    3.2,
    3.5,
    {
      px: "black",
      nx: "black",
      py: "black",
      pz: "grey",
      ny: "black",
      nz: "black",
    },
    0.05,
  );
  for (let f of [1, -1]) {
    let u = f * (e + 0.004),
      d = 1.25,
      p = 2.05;
    if (
      (t &&
        o.quad(
          f > 0 ? [u, 0.62, p] : [u, 0.62, d],
          f > 0 ? [u, 0.62, d] : [u, 0.62, p],
          f > 0 ? [u, 2.5, d] : [u, 2.5, p],
          f > 0 ? [u, 2.5, p] : [u, 2.5, d],
          "black",
        ),
      t ||
        o.box(
          f > 0 ? e - 0.25 : -e - 0.02,
          f > 0 ? e + 0.02 : -e + 0.25,
          0.4,
          0.46,
          d,
          p,
          "grey",
        ),
      !t)
    ) {
      let m = f * (e + 0.28);
      (o.tube([f * e, 2.3, s - 0.05], [m, 2.3, s + 0.08], 0.018, "chrome", 4),
        o.box(m - 0.06, m + 0.06, 1.75, 2.35, s + 0.04, s + 0.12, {
          px: "black",
          nx: "black",
          py: "black",
          ny: "black",
          pz: "black",
          nz: "glass",
        }));
    }
  }
  for (let f of [1, -1])
    o.box(f * 0.95 - 0.13, f * 0.95 + 0.13, 0.75, 1.05, -3.53, -3.5, {
      nz: "tail",
      px: null,
      nx: null,
      py: null,
      ny: null,
      pz: null,
    });
  if ((o.box(-1.2, 1.2, 0.35, 0.58, -3.6, -3.42, "black"), !t)) {
    let d = e - 0.03;
    (o.box(-d, d, 0.62, 2.62, 1.2 - 0.03, 1.2, {
      pz: "grey",
      px: null,
      nx: null,
      py: null,
      ny: null,
      nz: null,
    }),
      o.quad(
        [-d, 2.6, 2.12],
        [d, 2.6, 2.12],
        [d, 2.6, 1.2],
        [-d, 2.6, 1.2],
        "grey",
      ),
      o.quad(
        [-d, 0.64, 1.2],
        [d, 0.64, 1.2],
        [d, 0.64, 2.12],
        [-d, 0.64, 2.12],
        "black",
      ),
      o.box(0.35, 0.85, 0.64, 1.15, 1.35, 1.8, "black", 0.04),
      o.box(0.35, 0.85, 1.15, 1.85, 1.3, 1.42, "black", 0.04),
      o.box(-1, 1, 1.25, 1.62, 2.02, 2.12, "black", 0.03),
      o.tube([0.6, 1.62, 1.95], [0.6, 1.62, 1.97], 0.2, "black", 10, 0.2, null),
      o.tube([0.6, 1.3, 2.1], [0.6, 1.6, 1.97], 0.03, "black", 5));
    let p = -3.5,
      m = e - 0.18;
    for (let g of [1, -1])
      o.box(g * m - 0.06, g * m + 0.06, 0.6, 3, p - 0.06, p + 0.01, {
        nz: "grey",
        px: "grey",
        nx: "grey",
        py: "grey",
        ny: null,
        pz: null,
      });
    (o.box(-m - 0.06, m + 0.06, 2.9, 3.02, p - 0.06, p + 0.01, {
      nz: "grey",
      py: "grey",
      ny: "grey",
      px: null,
      nx: null,
      pz: null,
    }),
      o.box(-m - 0.06, m + 0.06, 0.6, 0.7, p - 0.06, p + 0.01, {
        nz: "grey",
        py: "grey",
        ny: null,
        px: null,
        nx: null,
        pz: null,
      }));
    for (let g of [1, -1])
      for (let b of [0.95, 1.75, 2.55])
        o.box(
          g * (m - 0.12) - 0.03,
          g * (m - 0.12) + 0.03,
          b,
          b + 0.14,
          p - 0.05,
          p,
          "chrome",
        );
    (o.tube([0.12, 0.8, p - 0.04], [0.12, 2.75, p - 0.04], 0.016, "chrome", 5),
      o.box(0.06, 0.24, 1.42, 1.5, p - 0.07, p - 0.02, "chrome"),
      o.box(-0.9, 0.9, 0.5, 0.56, -3.75, -3.58, {
        py: "grey",
        nz: "black",
        px: "black",
        nx: "black",
        ny: "black",
        pz: null,
      }));
    for (let g = -1; g <= 1; g++)
      o.box(g * 0.2 - 0.04, g * 0.2 + 0.04, 3, 3.06, p - 0.04, p + 0.02, {
        nz: "tail",
        py: "black",
        px: "black",
        nx: "black",
        ny: null,
        pz: null,
      });
    for (let g of [1, -1]) {
      (o.box(
        g * (e - 0.08) - 0.05,
        g * (e - 0.08) + 0.05,
        2.95,
        3.03,
        p - 0.04,
        p + 0.02,
        {
          nz: "tail",
          py: "black",
          px: "black",
          nx: "black",
          ny: null,
          pz: null,
        },
      ),
        o.box(g * 0.95 - 0.06, g * 0.95 + 0.06, 0.62, 0.68, p - 0.035, p, {
          nz: "tail",
          px: null,
          nx: null,
          py: null,
          ny: null,
          pz: null,
        }));
      for (let [b, v] of [
        [-3.3, "tail"],
        [s - 0.45, "amber"],
      ])
        o.box(g * e - 0.02, g * e + 0.02, 0.75, 0.85, b - 0.05, b + 0.05, {
          px: g > 0 ? v : null,
          nx: g < 0 ? v : null,
          py: null,
          ny: null,
          pz: null,
          nz: null,
        });
    }
  }
  (o.frame(-3.3, 2.9, 0.42, 0.56, 0.45),
    o.axle(2.55, 0.42, 0.98, 0.25),
    o.axle(-1.95, 0.42, 0.92, 0.25, !0));
  for (let [f, u, d] of [
    [2.55, 0.8, 1.22],
    [-1.95, 0.55, 1.22],
  ])
    (o.arch(u, d, 0.42, f, 0.52, 0, Math.PI, "black", t ? 3 : 6),
      o.arch(-d, -u, 0.42, f, 0.52, 0, Math.PI, "black", t ? 3 : 6));
  o.flap(-2.55, 0.55, 1.15, 0.18, 0.62);
}
