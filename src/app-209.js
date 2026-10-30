// app 209 — yellow
// Lines 113444-113606 of readable/app.pretty.js (statement-aligned).
function axt(o, t) {
  let { L: e } = t,
    s = 75.3,
    n = -5870.5;
  (fY(o, n, 2545, 9.5, s, s + 9, 8.5, 1.8),
    Uw(o, Ax(n - 3.6, 2554, n + 3.6, 2563), s, s + 6.5));
  {
    oe(
      o,
      [
        [n - 3.9, s + 6.5, 2563.1],
        [n + 3.9, s + 6.5, 2563.1],
        [n, s + 9.3, 2563.1],
      ],
      IL,
      [0, 0, 1],
    );
    for (let c of [-1, 1])
      (oe(
        o,
        [
          [n, s + 9.3, 2554],
          [n, s + 9.3, 2563.2],
          [n + c * 3.9, s + 6.5, 2563.2],
          [n + c * 3.9, s + 6.5, 2554],
        ],
        Gw,
        [c * 2.8, 3.9, 0],
      ),
        Ce(
          o,
          [n, s + 9.35, 2563.2],
          [n + c * 3.9, s + 6.55, 2563.2],
          0.12,
          xh,
          4,
        ));
    (Ce(o, [n, s + 9.35, 2554], [n, s + 9.35, 2563.2], 0.1, xh, 4),
      cn(
        o,
        [n, 2563.15],
        [1, 0],
        [0, 1],
        1.4,
        0.1,
        s,
        s + 3.2,
        Lt(Ct.matte, 0.2, 0.18, 0.15),
      ));
  }
  for (let [c, h] of [
    [-5896, -5880.5],
    [-5860.5, -5845],
  ])
    (Uw(o, Ax(c, 2538, h, 2554), s, s + 4.6),
      hY(o, c, h, 2537.6, 2554.4, s + 4.6, 3.6));
  for (let c of [-5900.5, -5840])
    (Uw(o, Ax(c - 5.5, 2536, c + 5.5, 2560), s, s + 5.8),
      fY(o, c, 2548, 5.2, s + 5.8, s + 6.6, 4.2, 0.9),
      cn(o, [c, 2548], [1, 0], [0, 1], 5.6, 12.1, s + 5.6, s + 6, xh));
  (Uw(o, Ax(-5914, 2516, -5840, 2534), s, s + 3.6, 1.1),
    hY(o, -5914, -5840, 2515.6, 2534.4, s + 3.6, 2.2, 6));
  let i = 2563.5,
    a = 2573,
    r = 2584;
  {
    let c = Ax(n - 16, i, n + 16, a);
    for (let u = n - 16; u < n + 16; u += 2)
      for (let d = i; d < a; d += 2)
        oe(
          o,
          [
            [u, s + 0.12, d],
            [u + 2, s + 0.12, d],
            [u + 2, s + 0.12, d + 2],
            [u, s + 0.12, d + 2],
          ],
          AL,
          [0, 1, 0],
          (p) => [p[0], p[2]],
        );
    Ss(o, c, s - 3, s + 0.12, Pz);
    for (let u of [-1, 1])
      cn(
        o,
        [n + u * 9.5, a],
        [1, 0],
        [0, 1],
        6.5,
        0.25,
        s + 0.12,
        s + 0.85,
        Pz,
      );
    let h = e.terrainAt(n, r) + 0.05,
      f = Math.max(3, Math.round((s - h) / 0.17));
    for (let u = 0; u < f; u++) {
      let d = a + ((r - a) * u) / f,
        p = a + ((r - a) * (u + 1)) / f,
        m = s + 0.12 - ((s + 0.12 - h) * (u + 1)) / f;
      cn(
        o,
        [n, (d + p) / 2],
        [1, 0],
        [0, 1],
        3.2,
        (p - d) / 2,
        m - 1.5,
        m,
        ixt,
      );
    }
    for (let u of [-1, 1])
      cn(
        o,
        [n + u * 3.45, (a + r) / 2],
        [0, 1],
        [1, 0],
        (r - a) / 2,
        0.25,
        h - 0.5,
        s + 0.6,
        Pz,
      );
  }
  for (let c = r; c < 2648; c += 2) {
    let h = [
      [n - 2.2, c],
      [n + 2.2, c],
      [n + 2.2, c + 2],
      [n - 2.2, c + 2],
    ].map(([f, u]) => [f, e.terrainAt(f, u) + 0.1, u]);
    oe(o, h, AL, [0, 1, 0], (f) => [f[0], f[2]]);
  }
  for (let c = -5920; c < -5820; c += 2) {
    if (Math.abs(c + 1 - n) < 16) continue;
    let h = [
      [c, i + 2],
      [c + 2, i + 2],
      [c + 2, i + 4.5],
      [c, i + 4.5],
    ].map(([f, u]) => [f, e.terrainAt(f, u) + 0.1, u]);
    oe(o, h, AL, [0, 1, 0], (f) => [f[0], f[2]]);
  }
  let l = [
    [n - 9, 2600, 5, 13, [Yo.red, Yo.orange, Yo.yellow]],
    [n + 9, 2600, 5, 13, [Yo.red, Yo.orange, Yo.yellow]],
    [n - 26, 2592, 11, 6, [Yo.purple, Yo.white, Yo.orange, Yo.yellow], 0.25],
    [n + 26, 2592, 11, 6, [Yo.purple, Yo.white, Yo.orange, Yo.yellow], -0.25],
    [n - 30, 2622, 9, 5, [Yo.blue, Yo.white, Yo.pink], -0.2],
    [n + 30, 2622, 9, 5, [Yo.blue, Yo.white, Yo.pink], 0.2],
    [n - 18, 2578, 7, 3, [Yo.yellow, Yo.red]],
    [n + 18, 2578, 7, 3, [Yo.yellow, Yo.red]],
  ];
  for (let [c, h, f, u, d, p] of l) oxt(o, e, c, h, f, u, d, p || 0);
  LL(t, Ax(-5915, 2515, -5833, 2564), s - 3, s + 24);
}
var td = We(we.stucco, 0.5, 0.42, 0.3),
  pr = We(we.stucco, 0.74, 0.6, 0.38),
  rxt = We(we.stucco, 0.38, 0.3, 0.2),
  Dw = Lt(Ct.stone, 0.2, 0.21, 0.22),
  gh = Lt(Ct.glass, 0.08, 0.08, 0.09),
  uY = Lt(Ct.stone, 0.42, 0.36, 0.3);
