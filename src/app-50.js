// app 50 — atlas
// Lines 61603-61962 of readable/app.pretty.js (statement-aligned).
function uk({ B: o, A: t, colliders: e, inst: s }, n = {}) {
  let i = o.R("ghira"),
    a = i.solid,
    r = Hi(...Ib),
    l = J0(Ja("ghirardelli")),
    c = Rt([0.55, 0.28, 0.18], Tt.paint),
    h = Rt([0.22, 0.2, 0.19], Tt.tar),
    f = Rt([0.6, 0.55, 0.48], Tt.stone),
    u = (w, _, z, A) => Math.min($t(w, _), $t(z, _), $t(w, A), $t(z, A)),
    d = (w, _, z, A) => Math.max($t(w, _), $t(z, _), $t(w, A), $t(z, A)),
    p = (w, _, z, A, T, E = 0) => {
      let R = u(w, _, z, A) - 0.6,
        P = d(w, _, z, A) + T;
      return (
        i.atlas.wall(
          z,
          _,
          w,
          _,
          R,
          R,
          P,
          P,
          l,
          E,
          P - 13 * Math.ceil((P - R) / 13),
        ),
        i.atlas.wall(
          z,
          A,
          z,
          _,
          R,
          R,
          P,
          P,
          l,
          E + 3,
          P - 13 * Math.ceil((P - R) / 13),
        ),
        i.atlas.wall(
          w,
          A,
          z,
          A,
          R,
          R,
          P,
          P,
          l,
          E + 7,
          P - 13 * Math.ceil((P - R) / 13),
        ),
        i.atlas.wall(
          w,
          _,
          w,
          A,
          R,
          R,
          P,
          P,
          l,
          E + 11,
          P - 13 * Math.ceil((P - R) / 13),
        ),
        zs(a, w - 0.35, P - 0.1, _ - 0.35, z + 0.35, P + 0.5, A + 0.35, c, {
          bottom: !0,
        }),
        zs(a, w - 0.1, P + 0.5, _ - 0.1, z + 0.1, P + 1.3, A + 0.1, c, {
          top: !1,
        }),
        zs(a, w - 0.15, P + 1.3, _ - 0.15, z + 0.15, P + 1.45, A + 0.15, f),
        zs(a, w + 0.1, P + 0.3, _ + 0.1, z - 0.1, P + 0.8, A - 0.1, h, {
          sides: [0, 0, 0, 0],
        }),
        e.push({ t: "box", x0: w, z0: _, x1: z, z1: A }),
        P
      );
    },
    m = r.x0 + 0.5,
    g = r.x1 - 0.5,
    b = r.z0 + 0.5,
    v = r.z1 - 0.5,
    x = (w) => (n.mirror ? m + g - w : w),
    y = (w, _, z, A, T, E) =>
      p(Math.min(x(w), x(z)), _, Math.max(x(w), x(z)), A, T, E);
  {
    let w = new Be(),
      _ = 24,
      z = 20;
    for (let A = 0; A < _; A++)
      for (let T = 0; T < z; T++) {
        let E = r.x0 + ((r.x1 - r.x0) * A) / _,
          R = r.x0 + ((r.x1 - r.x0) * (A + 1)) / _,
          P = r.z0 + ((r.z1 - r.z0) * T) / z,
          C = r.z0 + ((r.z1 - r.z0) * (T + 1)) / z,
          I = Ze + (n.lift || 0);
        $i(
          a,
          [
            [E, $t(E, P) + I, P],
            [R, $t(R, P) + I, P],
            [R, $t(R, C) + I, C],
            [E, $t(E, C) + I, C],
          ],
          Rt([0.42, 0.26, 0.2], Tt.pavers),
        );
      }
  }
  let M = y(m, b, g - 16, b + 15, 13, 0),
    S = y(g - 16, b, g, b + 22, 16, 5);
  (y(g - 13, b + 22, g, v, 11, 9),
    y(m, b + 15, m + 14, v, 10, 2),
    y(m + 14, v - 13, g - 13, v, 8, 6));
  {
    let w = x(g - 8),
      _ = b + 8,
      z = 4.5,
      A = S,
      T = S + 11,
      E = Rt([0.16, 0.18, 0.2], Tt.copper);
    (i.atlas.wall(w + z, _ - z, w - z, _ - z, A, A, T, T, l, 1, A),
      i.atlas.wall(w + z, _ + z, w + z, _ - z, A, A, T, T, l, 4, A),
      i.atlas.wall(w - z, _ + z, w + z, _ + z, A, A, T, T, l, 8, A),
      i.atlas.wall(w - z, _ - z, w - z, _ + z, A, A, T, T, l, 12, A));
    for (let [P, C] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ])
      zs(
        a,
        w + P * z - 0.5,
        A,
        _ + C * z - 0.5,
        w + P * z + 0.5,
        T,
        _ + C * z + 0.5,
        J0(f),
        { top: !1 },
      );
    zs(
      a,
      w - z - 0.6,
      T,
      _ - z - 0.6,
      w + z + 0.6,
      T + 0.8,
      _ + z + 0.6,
      J0(f),
      { bottom: !0 },
    );
    let R = t.add("clock", 512, 512, null);
    for (let [P, C] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ])
      ri(
        i.text,
        t,
        R,
        w + P * (z + 0.02),
        T - 3.2,
        _ + C * (z + 0.02),
        P,
        C,
        4.2,
        4.2,
        Za(!0),
      );
    H7(a, w - z, _ - z, w + z, _ + z, T + 0.8, 9.5, E, 0.3);
    for (let [P, C] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      let I = w + P * (z - 1.2),
        L = _ + C * (z - 1.2);
      (zs(
        a,
        I - (C ? 0.9 : 0.6),
        T + 1.2,
        L - (P ? 0.9 : 0.6),
        I + (C ? 0.9 : 0.6),
        T + 3.6,
        L + (P ? 0.9 : 0.6),
        f,
      ),
        H7(
          a,
          I - (C ? 0.9 : 0.6),
          L - (P ? 0.9 : 0.6),
          I + (C ? 0.9 : 0.6),
          L + (P ? 0.9 : 0.6),
          T + 3.6,
          1.3,
          E,
          0.15,
        ));
    }
    (os(a, w, _, 0.08, T + 10, T + 13.5, 5, Rt([0.5, 0.45, 0.3], Tt.metal)),
      Ws(
        a,
        w,
        _,
        [
          [0.3, T + 10.8],
          [0.4, T + 11.2],
          [0.01, T + 11.7],
        ],
        8,
        Rt([0.5, 0.45, 0.3], Tt.metal),
      ));
  }
  {
    let w = x((m + g - 16) / 2),
      _ = b + 5,
      z = M + 2.6,
      A = 48,
      T = Rt([0.12, 0.12, 0.12], Tt.metal),
      E = t.word("GHIRARDELLI", {
        font: 'bold 124px Georgia, "Times New Roman", serif',
        h: 130,
        spacing: 10,
        stroke: "#2c2a28",
      }),
      R = t.word("SQUARE", {
        font: 'bold 120px Georgia, "Times New Roman", serif',
        h: 130,
        spacing: 18,
        stroke: "#2c2a28",
      }),
      P = (A * E.h) / E.w;
    for (let I = w - A / 2; I <= w + A / 2 + 0.1; I += 4)
      (rs(a, [I, z - 1.2, _], [I, z + P + 3.4, _], 0.18, 0.18, T),
        rs(a, [I, z - 1.2, _ + 2.5], [I, z + 0.2, _ + 2.5], 0.12, 0.12, T),
        rs(a, [I, z, _ + 2.5], [I, z + P + 3.4, _], 0.12, 0.12, T));
    (rs(
      a,
      [w - A / 2, z + 1.2, _ + 0.05],
      [w + A / 2, z + 1.2, _ + 0.05],
      0.12,
      0.12,
      T,
    ),
      rs(
        a,
        [w - A / 2, z + P + 3.2, _ + 0.05],
        [w + A / 2, z + P + 3.2, _ + 0.05],
        0.12,
        0.12,
        T,
      ));
    let C = xo([0.9, 0.87, 0.8], !0);
    (ri(i.text, t, E, w, z + 3.2 + P / 2, _ - 0.15, 0, -1, A, null, C),
      ri(i.text, t, R, w, z + 1.3, _ - 0.15, 0, -1, A * 0.28, null, C),
      ri(i.text, t, E, w, z + 3.2 + P / 2, _ + 2.8, 0, 1, A, null, C));
  }
  {
    let w = x((m + 14 + g - 13) / 2),
      _ = (b + 22 + v - 13) / 2 + 4,
      z = $t(w, _) + Ze + (n.lift || 0),
      A = Rt([0.55, 0.52, 0.46], Tt.stone),
      T = Rt([0.35, 0.45, 0.5], Tt.water),
      E = Rt([0.2, 0.26, 0.18], Tt.metal);
    (Ws(
      a,
      w,
      _,
      [
        [5.2, z - 0.3],
        [5.2, z + 0.55],
        [4.8, z + 0.55],
        [4.8, z + 0.3],
      ],
      24,
      A,
    ),
      Ws(
        a,
        w,
        _,
        [
          [0.01, z + 0.35],
          [4.85, z + 0.36],
        ],
        24,
        T,
      ),
      Ws(
        a,
        w,
        _,
        [
          [1, z + 0.3],
          [0.8, z + 1.2],
          [1.8, z + 1.5],
          [1.9, z + 1.7],
          [0.4, z + 1.8],
          [0.35, z + 2.6],
          [0.9, z + 2.8],
          [0.2, z + 3],
          [0.25, z + 3.8],
          [0.01, z + 4.1],
        ],
        12,
        E,
      ),
      e.push({ t: "circ", x: w, z: _, r: 5.3 }));
    for (let [R, P] of [
      [w - 16, _ - 12],
      [w + 16, _ - 12],
      [w - 16, _ + 10],
      [w + 16, _ + 10],
      [w, _ - 20],
      [w - 24, _ - 2],
      [w + 24, _ - 2],
    ])
      (s.push({
        kind: "tree",
        x: R,
        y: $t(R, P) + Ze + (n.lift || 0),
        z: P,
        rot: R * 1.7,
        scale: 0.9,
      }),
        e.push({ t: "circ", x: R, z: P, r: 0.4 }));
    for (let [R, P] of [
      [w - 9, _ - 8],
      [w + 9, _ - 8],
      [w - 9, _ + 8],
      [w + 9, _ + 8],
    ]) {
      let C = $t(R, P) + Ze + (n.lift || 0),
        I = Rt([0.05, 0.06, 0.05], Tt.metal);
      os(a, R, P, 0.1, C, C + 4, 6, I, 0.07);
      for (let [L, F] of [
        [0.5, 0],
        [-0.5, 0],
      ])
        (rs(a, [R, C + 3.9, P], [R + L, C + 4.1, P + F], 0.06, 0.06, I),
          os(
            a,
            R + L,
            P + F,
            0.2,
            C + 3.8,
            C + 4.3,
            6,
            Rt([1, 0.86, 0.62], Tt.lamp),
            0.24,
          ));
    }
  }
}
