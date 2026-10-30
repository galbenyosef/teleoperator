// app 111 — math
// Lines 82581-82746 of readable/app.pretty.js (statement-aligned).
function d1t({ B: o, colliders: t, inst: e }, s) {
  let { L: n } = s,
    i = Rt([0.3, 0.29, 0.27], Tt.conc),
    a = Rt([0.55, 0.55, 0.56], Tt.metal),
    r = Rt([0.03, 0.03, 0.03], Tt.paint),
    l = Rt([0.08, 0.08, 0.08], Tt.metal),
    c = (x, y) => {
      let M = n.probe(x, y);
      return (
        M.road &&
        !M.road.J &&
        M.road.E &&
        (M.road.E.flags & 16 ||
          (M.road.E.flags & 32 && !M.road.E.median && !M.road.E.oneway))
      );
    },
    h =
      Jq ||
      (Jq = n1t.concat(UP).map((x) => {
        let y = [];
        for (let M = 0; M < x.length; M += 2) y.push([x[M], x[M + 1]]);
        return y;
      })),
    f =
      Zq ||
      (Zq = i1t.concat(o1t).map((x) => {
        let y = [];
        for (let M = 0; M < x.length; M += 2) y.push([x[M], x[M + 1]]);
        return y;
      })),
    u = [];
  for (let x of h.concat(f)) {
    let y = f.includes(x),
      M = [];
    for (let w = 0; w + 1 < x.length; w++) {
      let [_, z] = x[w],
        [A, T] = x[w + 1],
        E = Math.max(1, Math.ceil(Math.hypot(A - _, T - z) / (y ? 6 : 4)));
      for (let R = 0; R < E; R++)
        M.push([_ + ((A - _) * R) / E, z + ((T - z) * R) / E]);
    }
    M.push(x[x.length - 1]);
    for (let w of M) w.push(n.driveHeight(w[0], w[1]) + 0.05);
    let S = M.map((w, _) => {
      let z = (R, P) => {
          let C = Math.hypot(P[0] - R[0], P[1] - R[1]) || 1;
          return [-(P[1] - R[1]) / C, (P[0] - R[0]) / C];
        },
        A = z(M[Math.max(0, _ - 1)], w),
        T = z(w, M[Math.min(M.length - 1, _ + 1)]);
      if (!_) return T;
      if (_ === M.length - 1) return A;
      let E = 1 + A[0] * T[0] + A[1] * T[1];
      return E > 0.1 ? [(A[0] + T[0]) / E, (A[1] + T[1]) / E] : T;
    });
    for (let w = 0; w + 1 < M.length; w++) {
      let [_, z, A] = M[w],
        [T, E, R] = M[w + 1];
      if (Math.hypot(T - _, E - z) < 0.001) continue;
      let C = (_ + T) / 2,
        I = (z + E) / 2;
      if ((!y && c(C, I)) || fw(s.D, C, I)) continue;
      let L = o.get(
          "railsR" +
            Math.floor((C + 3e3) / 400) +
            "_" +
            Math.floor((I + 3e3) / 400),
          "solid",
        ),
        [F, O] = S[w],
        [B, H] = S[w + 1],
        N = (D, U, G, W) =>
          u.push({
            g: L,
            col: W,
            points: [
              [_ + F * D, A + G, z + O * D],
              [T + B * D, R + G, E + H * D],
              [T + B * U, R + G, E + H * U],
              [_ + F * U, A + G, z + O * U],
            ],
          });
      if (!n.probe(C, I).road)
        for (let [D, U] of [
          [-1.3, -0.7575],
          [-0.64, 0.64],
          [0.7575, 1.3],
        ])
          N(D, U, -0.02, i);
      for (let [D, U, G, W] of [
        [0.6775, 0.7575, a, 0.006],
        [-0.7575, -0.6775, a, 0.006],
        [0.64, 0.6775, r, 0],
        [-0.6775, -0.64, r, 0],
      ])
        N(D, U, W, G);
    }
  }
  let d = (x) => (x === a ? 2 : x === r ? 1 : 0);
  u.sort((x, y) => d(y.col) - d(x.col));
  for (let { g: x, col: y, points: M } of ik(u)) ok(x, M, y);
  let p = h[0],
    m = h[1],
    g = { P: new Float64Array(m.length * 3), W: new Float64Array(m.length) };
  (m.forEach(([x, y], M) => {
    ((g.P[M * 3] = x), (g.P[M * 3 + 1] = y));
  }),
    g1t(g));
  let b = null,
    v = 0;
  for (let x = 0; x + 1 < p.length; x++) {
    let [y, M] = p[x],
      [S, w] = p[x + 1],
      _ = Math.hypot(S - y, w - M);
    for (let z = (42 - v) % 42; z < _; z += 42) {
      let A = y + ((S - y) * z) / _,
        T = M + ((w - M) * z) / _,
        E = ys(g, A, T, {});
      if (E.d < 2.5 || E.d > 9) {
        b = null;
        continue;
      }
      let R = Ot(g, E.s, {}),
        P = (A + R.x) / 2,
        C = (T + R.z) / 2,
        I = (R.x - A) / E.d,
        L = (R.z - T) / E.d,
        F = E.d / 2,
        O = n.probe(P, C);
      if (O.road && !O.road.J && !O.road.E.median) {
        b = null;
        continue;
      }
      let B = n.driveHeight(P, C),
        H = B + 6.1,
        N = o.get(
          "railsR" +
            Math.floor((P + 3e3) / 400) +
            "_" +
            Math.floor((C + 3e3) / 400),
          "solid",
        );
      (e.push(
        { kind: "farm", x: P, y: B, z: C, rot: Math.atan2(-L, I), sx: F + 0.4 },
        { kind: "fpole", x: P, y: B, z: C, rot: 0 },
      ),
        t.push({ t: "circ", x: P, z: C, r: 0.25, y0: B - 1.5, y1: B + 7 }));
      let D = [
        [A, H, T],
        [R.x, H, R.z],
      ];
      if (b) for (let U = 0; U < 2; U++) rs(N, b[U], D[U], 0.025, 0.025, l);
      b = D;
    }
    v = (v + _) % 42;
  }
  m1t({ B: o, colliders: t, inst: e }, s, f);
}
var p1t = [
  ["The Embarcadero", "Folsom Street"],
  ["King Street", "2nd Street"],
  ["King Street", "4th Street"],
  ["3rd Street", "Mission Rock Street"],
  ["The Embarcadero", "Brannan Street"],
  ["3rd Street", "16th Street"],
];
