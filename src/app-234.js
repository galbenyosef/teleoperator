// app 234 — math
// Lines 121755-121939 of readable/app.pretty.js (statement-aligned).
function JX(i = 0) {
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
    ][i % 4].map(t),
    [s, n, o] = e,
    a = [0.025, 0.03, 0.035],
    r = t([0.5, 0.48, 0.42]).map((T, E) => T * 0.35 + s[E] * 0.65),
    l = t([0.5, 0.5, 0.5]),
    c = [0.02, 0.02, 0.02],
    h = vC.L,
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
    x = [],
    v = (T, E, A, C, P) => {
      for (let I of [T, E, A, T, A, C])
        (g.push(...I), b.push(P[0], P[1], P[2], 1));
    },
    y = d.length,
    S = [
      [0.42, 1.25, 0, () => s],
      [1.25, 1.38, 0, () => n],
      [1.38, 1.5, 0, () => o],
      [
        1.5,
        2.3,
        0.04,
        (T, E, A) =>
          A
            ? ((E + 20) / 1.12) % 1 < 0.16
              ? r
              : a
            : (Math.abs(E) > h / 2 - 0.5, a),
      ],
      [2.3, 2.62, 0.08, () => o],
      [2.62, 2.85, 0.28, () => l],
    ],
    w = 0;
  for (let [T, E, A, C] of S) {
    for (let P = 0; P < y; P++) {
      let I = d[P],
        L = d[(P + 1) % y],
        F = (I[1] + L[1]) / 2,
        N = I[2] && L[2],
        B = (G, q) => {
          let W = Math.hypot(G[0] / f, G[1] / (h / 2)) || 1;
          return [
            G[0] * (1 - q / f),
            G[1] -
              Math.sign(G[1]) * q * Math.abs(G[1] / (h / 2)) * (G[2] ? 0 : 1),
          ];
        },
        H = B(I, w),
        O = B(L, w),
        D = B(L, A),
        U = B(I, A);
      v(
        [H[0], T, H[1]],
        [O[0], T, O[1]],
        [D[0], E, D[1]],
        [U[0], E, U[1]],
        C(P, F, N),
      );
    }
    w = A;
  }
  let z = d.map((T) => [
    T[0] * (1 - 0.28 / f),
    2.85,
    T[1] - Math.sign(T[1]) * (T[2] ? 0 : 0.28),
  ]);
  for (let T = 0; T < y; T++) {
    let E = z[T],
      A = z[(T + 1) % y];
    for (let C of [[0, 2.92, 0], A, E])
      (g.push(...C), b.push(l[0], l[1], l[2], 1));
  }
  let _ = (T, E, A, C, P, I, L) => {
    let F = new qs(E - T, C - A, I - P).toNonIndexed();
    F.translate((T + E) / 2, (A + C) / 2, (P + I) / 2);
    let N = F.attributes.position.array;
    for (let B = 0; B < N.length; B += 3)
      (g.push(N[B], N[B + 1], N[B + 2]), b.push(L[0], L[1], L[2], 1));
  };
  _(-0.35, 0.35, 2.9, 3.02, -4.5, 4.5, l);
  for (let T of [-4.3, 4.3]) {
    _(-1.1, 1.1, 0.12, 0.42, T - 1.1, T + 1.1, c);
    for (let E of [-0.8, 0.8])
      for (let A of [-1, 1]) {
        let C = new ks(0.33, 0.33, 0.12, 12).toNonIndexed();
        (C.rotateZ(Math.PI / 2), C.translate(A * 0.78, 0.33, T + E));
        let P = C.attributes.position.array;
        for (let I = 0; I < P.length; I += 3)
          (g.push(P[I], P[I + 1], P[I + 2]), b.push(0.03, 0.03, 0.03, 1));
      }
  }
  for (let T of [-1, 1]) {
    let E = T * (h / 2 + 0.01);
    (_(
      -0.17,
      0.17,
      0.95,
      1.2,
      E - (T > 0 ? 0.06 : -0.02),
      E + (T > 0 ? 0.02 : 0.06),
      t([1, 0.95, 0.78]),
    ),
      _(
        -0.55,
        0.55,
        2.38,
        2.56,
        E - (T > 0 ? 0.05 : -0.02),
        E + (T > 0 ? 0.02 : 0.05),
        [0.01, 0.01, 0.01],
      ),
      _(
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
    let T = new xt(0, 3, -2.2),
      E = new xt(0, 5.55, -7.6),
      A = E.clone().sub(T),
      C = new ks(0.035, 0.05, A.length(), 6).toNonIndexed();
    (C.translate(0, A.length() / 2, 0),
      C.applyQuaternion(
        new wn().setFromUnitVectors(new xt(0, 1, 0), A.clone().normalize()),
      ),
      C.translate(T.x, T.y, T.z));
    let P = C.attributes.position.array;
    for (let I = 0; I < P.length; I += 3)
      (g.push(P[I], P[I + 1], P[I + 2]), b.push(0.02, 0.02, 0.02, 1));
    _(-0.25, 0.25, 2.92, 3.08, -2.6, -1.8, c);
  }
  let R = new De();
  return (
    R.setAttribute("position", new ze(g, 3)),
    R.setAttribute("color", new ze(b, 4)),
    R.computeVertexNormals(),
    R.setAttribute("uv", new ze(new Float32Array((g.length / 3) * 2), 2)),
    R.computeBoundingSphere(),
    R
  );
}
