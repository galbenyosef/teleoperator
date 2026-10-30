// app 233 — math
// Lines 122011-122195 of readable/app.pretty.js (statement-aligned).
function tJ(o = 0) {
  let t = (T) => T.map((E) => Math.pow(E, 2.2)),
    e = [
      [
        [0.2, 0.42, 0.28],
        [0.86, 0.82, 0.68],
        [0.86, 0.82, 0.68],
      ],
      [
        [0.86, 0.45, 0.12],
        [0.88, 0.84, 0.7],
        [0.3, 0.12, 0.06],
      ],
      [
        [0.9, 0.7, 0.16],
        [0.18, 0.36, 0.22],
        [0.9, 0.7, 0.16],
      ],
      [
        [0.62, 0.12, 0.1],
        [0.88, 0.84, 0.7],
        [0.88, 0.84, 0.7],
      ],
    ][o % 4].map(t),
    [s, n, i] = e,
    a = [0.025, 0.03, 0.035],
    r = t([0.5, 0.48, 0.42]).map((T, E) => T * 0.35 + s[E] * 0.65),
    l = t([0.5, 0.5, 0.5]),
    c = [0.02, 0.02, 0.02],
    h = KL.L,
    f = 2.62 / 2,
    u = 1.5,
    d = [],
    p = h / 2 - u,
    m = Math.ceil((2 * p) / 0.45);
  for (let T = 0; T <= m; T++) d.push([f, -p + (2 * p * T) / m, 1]);
  for (let T = 1; T < 10; T++) {
    let E = (Math.PI * T) / 10;
    d.push([f * Math.cos(E), p + u * Math.sin(E), 0]);
  }
  for (let T = 0; T <= m; T++) d.push([-f, p - (2 * p * T) / m, 1]);
  for (let T = 1; T < 10; T++) {
    let E = (Math.PI * T) / 10;
    d.push([-f * Math.cos(E), -p - u * Math.sin(E), 0]);
  }
  let g = [],
    b = [],
    v = [],
    x = (T, E, R, P, C) => {
      for (let I of [T, E, R, T, R, P])
        (g.push(...I), b.push(C[0], C[1], C[2], 1));
    },
    y = d.length,
    S = [
      [0.42, 1.25, 0, () => s],
      [1.25, 1.38, 0, () => n],
      [1.38, 1.5, 0, () => i],
      [
        1.5,
        2.3,
        0.04,
        (T, E, R) =>
          R
            ? ((E + 20) / 1.12) % 1 < 0.16
              ? r
              : a
            : (Math.abs(E) > h / 2 - 0.5, a),
      ],
      [2.3, 2.62, 0.08, () => i],
      [2.62, 2.85, 0.28, () => l],
    ],
    w = 0;
  for (let [T, E, R, P] of S) {
    for (let C = 0; C < y; C++) {
      let I = d[C],
        L = d[(C + 1) % y],
        F = (I[1] + L[1]) / 2,
        O = I[2] && L[2],
        B = (G, W) => {
          let V = Math.hypot(G[0] / f, G[1] / (h / 2)) || 1;
          return [
            G[0] * (1 - W / f),
            G[1] -
              Math.sign(G[1]) * W * Math.abs(G[1] / (h / 2)) * (G[2] ? 0 : 1),
          ];
        },
        H = B(I, w),
        N = B(L, w),
        D = B(L, R),
        U = B(I, R);
      x(
        [H[0], T, H[1]],
        [N[0], T, N[1]],
        [D[0], E, D[1]],
        [U[0], E, U[1]],
        P(C, F, O),
      );
    }
    w = R;
  }
  let _ = d.map((T) => [
    T[0] * (1 - 0.28 / f),
    2.85,
    T[1] - Math.sign(T[1]) * (T[2] ? 0 : 0.28),
  ]);
  for (let T = 0; T < y; T++) {
    let E = _[T],
      R = _[(T + 1) % y];
    for (let P of [[0, 2.92, 0], R, E])
      (g.push(...P), b.push(l[0], l[1], l[2], 1));
  }
  let z = (T, E, R, P, C, I, L) => {
    let F = new Is(E - T, P - R, I - C).toNonIndexed();
    F.translate((T + E) / 2, (R + P) / 2, (C + I) / 2);
    let O = F.attributes.position.array;
    for (let B = 0; B < O.length; B += 3)
      (g.push(O[B], O[B + 1], O[B + 2]), b.push(L[0], L[1], L[2], 1));
  };
  z(-0.35, 0.35, 2.9, 3.02, -4.5, 4.5, l);
  for (let T of [-4.3, 4.3]) {
    z(-1.1, 1.1, 0.12, 0.42, T - 1.1, T + 1.1, c);
    for (let E of [-0.8, 0.8])
      for (let R of [-1, 1]) {
        let P = new vs(0.33, 0.33, 0.12, 12).toNonIndexed();
        (P.rotateZ(Math.PI / 2), P.translate(R * 0.78, 0.33, T + E));
        let C = P.attributes.position.array;
        for (let I = 0; I < C.length; I += 3)
          (g.push(C[I], C[I + 1], C[I + 2]), b.push(0.03, 0.03, 0.03, 1));
      }
  }
  for (let T of [-1, 1]) {
    let E = T * (h / 2 + 0.01);
    (z(
      -0.17,
      0.17,
      0.95,
      1.2,
      E - (T > 0 ? 0.06 : -0.02),
      E + (T > 0 ? 0.02 : 0.06),
      t([1, 0.95, 0.78]),
    ),
      z(
        -0.55,
        0.55,
        2.38,
        2.56,
        E - (T > 0 ? 0.05 : -0.02),
        E + (T > 0 ? 0.02 : 0.05),
        [0.01, 0.01, 0.01],
      ),
      z(
        -0.45,
        0.45,
        2.42,
        2.52,
        E - (T > 0 ? 0.035 : -0.07),
        E + (T > 0 ? 0.07 : 0.035),
        t([1, 0.62, 0.12]),
      ));
  }
  {
    let T = new dt(0, 3, -2.2),
      E = new dt(0, 5.55, -7.6),
      R = E.clone().sub(T),
      P = new vs(0.035, 0.05, R.length(), 6).toNonIndexed();
    (P.translate(0, R.length() / 2, 0),
      P.applyQuaternion(
        new tn().setFromUnitVectors(new dt(0, 1, 0), R.clone().normalize()),
      ),
      P.translate(T.x, T.y, T.z));
    let C = P.attributes.position.array;
    for (let I = 0; I < C.length; I += 3)
      (g.push(C[I], C[I + 1], C[I + 2]), b.push(0.02, 0.02, 0.02, 1));
    z(-0.25, 0.25, 2.92, 3.08, -2.6, -1.8, c);
  }
  let A = new Le();
  return (
    A.setAttribute("position", new Re(g, 3)),
    A.setAttribute("color", new Re(b, 4)),
    A.computeVertexNormals(),
    A.setAttribute("uv", new Re(new Float32Array((g.length / 3) * 2), 2)),
    A.computeBoundingSphere(),
    A
  );
}
