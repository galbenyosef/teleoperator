// app 51 — atlas
// Lines 61372-61731 of readable/app.pretty.js (statement-aligned).
function hS({ B: i, A: t, colliders: e, inst: s }, n = {}) {
  let o = i.R("ghira"),
    a = o.solid,
    r = Ei(...jg),
    l = T0(Ha("ghirardelli")),
    c = At([0.55, 0.28, 0.18], Tt.paint),
    h = At([0.22, 0.2, 0.19], Tt.tar),
    f = At([0.6, 0.55, 0.48], Tt.stone),
    u = (w, z, _, R) => Math.min(Yt(w, z), Yt(_, z), Yt(w, R), Yt(_, R)),
    d = (w, z, _, R) => Math.max(Yt(w, z), Yt(_, z), Yt(w, R), Yt(_, R)),
    p = (w, z, _, R, T, E = 0) => {
      let A = u(w, z, _, R) - 0.6,
        C = d(w, z, _, R) + T;
      return (
        o.atlas.wall(
          _,
          z,
          w,
          z,
          A,
          A,
          C,
          C,
          l,
          E,
          C - 13 * Math.ceil((C - A) / 13),
        ),
        o.atlas.wall(
          _,
          R,
          _,
          z,
          A,
          A,
          C,
          C,
          l,
          E + 3,
          C - 13 * Math.ceil((C - A) / 13),
        ),
        o.atlas.wall(
          w,
          R,
          _,
          R,
          A,
          A,
          C,
          C,
          l,
          E + 7,
          C - 13 * Math.ceil((C - A) / 13),
        ),
        o.atlas.wall(
          w,
          z,
          w,
          R,
          A,
          A,
          C,
          C,
          l,
          E + 11,
          C - 13 * Math.ceil((C - A) / 13),
        ),
        Ms(a, w - 0.35, C - 0.1, z - 0.35, _ + 0.35, C + 0.5, R + 0.35, c, {
          bottom: !0,
        }),
        Ms(a, w - 0.1, C + 0.5, z - 0.1, _ + 0.1, C + 1.3, R + 0.1, c, {
          top: !1,
        }),
        Ms(a, w - 0.15, C + 1.3, z - 0.15, _ + 0.15, C + 1.45, R + 0.15, f),
        Ms(a, w + 0.1, C + 0.3, z + 0.1, _ - 0.1, C + 0.8, R - 0.1, h, {
          sides: [0, 0, 0, 0],
        }),
        e.push({ t: "box", x0: w, z0: z, x1: _, z1: R }),
        C
      );
    },
    m = r.x0 + 0.5,
    g = r.x1 - 0.5,
    b = r.z0 + 0.5,
    x = r.z1 - 0.5,
    v = (w) => (n.mirror ? m + g - w : w),
    y = (w, z, _, R, T, E) =>
      p(Math.min(v(w), v(_)), z, Math.max(v(w), v(_)), R, T, E);
  {
    let w = new Ce(),
      z = 24,
      _ = 20;
    for (let R = 0; R < z; R++)
      for (let T = 0; T < _; T++) {
        let E = r.x0 + ((r.x1 - r.x0) * R) / z,
          A = r.x0 + ((r.x1 - r.x0) * (R + 1)) / z,
          C = r.z0 + ((r.z1 - r.z0) * T) / _,
          P = r.z0 + ((r.z1 - r.z0) * (T + 1)) / _,
          I = Ke + (n.lift || 0);
        Fi(
          a,
          [
            [E, Yt(E, C) + I, C],
            [A, Yt(A, C) + I, C],
            [A, Yt(A, P) + I, P],
            [E, Yt(E, P) + I, P],
          ],
          At([0.42, 0.26, 0.2], Tt.pavers),
        );
      }
  }
  let M = y(m, b, g - 16, b + 15, 13, 0),
    S = y(g - 16, b, g, b + 22, 16, 5);
  (y(g - 13, b + 22, g, x, 11, 9),
    y(m, b + 15, m + 14, x, 10, 2),
    y(m + 14, x - 13, g - 13, x, 8, 6));
  {
    let w = v(g - 8),
      z = b + 8,
      _ = 4.5,
      R = S,
      T = S + 11,
      E = At([0.16, 0.18, 0.2], Tt.copper);
    (o.atlas.wall(w + _, z - _, w - _, z - _, R, R, T, T, l, 1, R),
      o.atlas.wall(w + _, z + _, w + _, z - _, R, R, T, T, l, 4, R),
      o.atlas.wall(w - _, z + _, w + _, z + _, R, R, T, T, l, 8, R),
      o.atlas.wall(w - _, z - _, w - _, z + _, R, R, T, T, l, 12, R));
    for (let [C, P] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ])
      Ms(
        a,
        w + C * _ - 0.5,
        R,
        z + P * _ - 0.5,
        w + C * _ + 0.5,
        T,
        z + P * _ + 0.5,
        T0(f),
        { top: !1 },
      );
    Ms(
      a,
      w - _ - 0.6,
      T,
      z - _ - 0.6,
      w + _ + 0.6,
      T + 0.8,
      z + _ + 0.6,
      T0(f),
      { bottom: !0 },
    );
    let A = t.add("clock", 512, 512, null);
    for (let [C, P] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ])
      si(
        o.text,
        t,
        A,
        w + C * (_ + 0.02),
        T - 3.2,
        z + P * (_ + 0.02),
        C,
        P,
        4.2,
        4.2,
        Da(!0),
      );
    cR(a, w - _, z - _, w + _, z + _, T + 0.8, 9.5, E, 0.3);
    for (let [C, P] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      let I = w + C * (_ - 1.2),
        L = z + P * (_ - 1.2);
      (Ms(
        a,
        I - (P ? 0.9 : 0.6),
        T + 1.2,
        L - (C ? 0.9 : 0.6),
        I + (P ? 0.9 : 0.6),
        T + 3.6,
        L + (C ? 0.9 : 0.6),
        f,
      ),
        cR(
          a,
          I - (P ? 0.9 : 0.6),
          L - (C ? 0.9 : 0.6),
          I + (P ? 0.9 : 0.6),
          L + (C ? 0.9 : 0.6),
          T + 3.6,
          1.3,
          E,
          0.15,
        ));
    }
    (es(a, w, z, 0.08, T + 10, T + 13.5, 5, At([0.5, 0.45, 0.3], Tt.metal)),
      Gs(
        a,
        w,
        z,
        [
          [0.3, T + 10.8],
          [0.4, T + 11.2],
          [0.01, T + 11.7],
        ],
        8,
        At([0.5, 0.45, 0.3], Tt.metal),
      ));
  }
  {
    let w = v((m + g - 16) / 2),
      z = b + 5,
      _ = M + 2.6,
      R = 48,
      T = At([0.12, 0.12, 0.12], Tt.metal),
      E = t.word("GHIRARDELLI", {
        font: 'bold 124px Georgia, "Times New Roman", serif',
        h: 130,
        spacing: 10,
        stroke: "#2c2a28",
      }),
      A = t.word("SQUARE", {
        font: 'bold 120px Georgia, "Times New Roman", serif',
        h: 130,
        spacing: 18,
        stroke: "#2c2a28",
      }),
      C = (R * E.h) / E.w;
    for (let I = w - R / 2; I <= w + R / 2 + 0.1; I += 4)
      (ss(a, [I, _ - 1.2, z], [I, _ + C + 3.4, z], 0.18, 0.18, T),
        ss(a, [I, _ - 1.2, z + 2.5], [I, _ + 0.2, z + 2.5], 0.12, 0.12, T),
        ss(a, [I, _, z + 2.5], [I, _ + C + 3.4, z], 0.12, 0.12, T));
    (ss(
      a,
      [w - R / 2, _ + 1.2, z + 0.05],
      [w + R / 2, _ + 1.2, z + 0.05],
      0.12,
      0.12,
      T,
    ),
      ss(
        a,
        [w - R / 2, _ + C + 3.2, z + 0.05],
        [w + R / 2, _ + C + 3.2, z + 0.05],
        0.12,
        0.12,
        T,
      ));
    let P = oo([0.9, 0.87, 0.8], !0);
    (si(o.text, t, E, w, _ + 3.2 + C / 2, z - 0.15, 0, -1, R, null, P),
      si(o.text, t, A, w, _ + 1.3, z - 0.15, 0, -1, R * 0.28, null, P),
      si(o.text, t, E, w, _ + 3.2 + C / 2, z + 2.8, 0, 1, R, null, P));
  }
  {
    let w = v((m + 14 + g - 13) / 2),
      z = (b + 22 + x - 13) / 2 + 4,
      _ = Yt(w, z) + Ke + (n.lift || 0),
      R = At([0.55, 0.52, 0.46], Tt.stone),
      T = At([0.35, 0.45, 0.5], Tt.water),
      E = At([0.2, 0.26, 0.18], Tt.metal);
    (Gs(
      a,
      w,
      z,
      [
        [5.2, _ - 0.3],
        [5.2, _ + 0.55],
        [4.8, _ + 0.55],
        [4.8, _ + 0.3],
      ],
      24,
      R,
    ),
      Gs(
        a,
        w,
        z,
        [
          [0.01, _ + 0.35],
          [4.85, _ + 0.36],
        ],
        24,
        T,
      ),
      Gs(
        a,
        w,
        z,
        [
          [1, _ + 0.3],
          [0.8, _ + 1.2],
          [1.8, _ + 1.5],
          [1.9, _ + 1.7],
          [0.4, _ + 1.8],
          [0.35, _ + 2.6],
          [0.9, _ + 2.8],
          [0.2, _ + 3],
          [0.25, _ + 3.8],
          [0.01, _ + 4.1],
        ],
        12,
        E,
      ),
      e.push({ t: "circ", x: w, z, r: 5.3 }));
    for (let [A, C] of [
      [w - 16, z - 12],
      [w + 16, z - 12],
      [w - 16, z + 10],
      [w + 16, z + 10],
      [w, z - 20],
      [w - 24, z - 2],
      [w + 24, z - 2],
    ])
      (s.push({
        kind: "tree",
        x: A,
        y: Yt(A, C) + Ke + (n.lift || 0),
        z: C,
        rot: A * 1.7,
        scale: 0.9,
      }),
        e.push({ t: "circ", x: A, z: C, r: 0.4 }));
    for (let [A, C] of [
      [w - 9, z - 8],
      [w + 9, z - 8],
      [w - 9, z + 8],
      [w + 9, z + 8],
    ]) {
      let P = Yt(A, C) + Ke + (n.lift || 0),
        I = At([0.05, 0.06, 0.05], Tt.metal);
      es(a, A, C, 0.1, P, P + 4, 6, I, 0.07);
      for (let [L, F] of [
        [0.5, 0],
        [-0.5, 0],
      ])
        (ss(a, [A, P + 3.9, C], [A + L, P + 4.1, C + F], 0.06, 0.06, I),
          es(
            a,
            A + L,
            C + F,
            0.2,
            P + 3.8,
            P + 4.3,
            6,
            At([1, 0.86, 0.62], Tt.lamp),
            0.24,
          ));
    }
  }
}
