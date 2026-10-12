// app 112 — math
// Lines 82347-82512 of readable/app.pretty.js (statement-aligned).
function jft({ B: i, colliders: t, inst: e }, s) {
  let { L: n } = s,
    o = At([0.3, 0.29, 0.27], Tt.conc),
    a = At([0.55, 0.55, 0.56], Tt.metal),
    r = At([0.03, 0.03, 0.03], Tt.paint),
    l = At([0.08, 0.08, 0.08], Tt.metal),
    c = (v, y) => {
      let M = n.probe(v, y);
      return (
        M.road &&
        !M.road.J &&
        M.road.E &&
        (M.road.E.flags & 16 ||
          (M.road.E.flags & 32 && !M.road.E.median && !M.road.E.oneway))
      );
    },
    h =
      KW ||
      (KW = Fft.concat(f7).map((v) => {
        let y = [];
        for (let M = 0; M < v.length; M += 2) y.push([v[M], v[M + 1]]);
        return y;
      })),
    f =
      YW ||
      (YW = Nft.concat(Bft).map((v) => {
        let y = [];
        for (let M = 0; M < v.length; M += 2) y.push([v[M], v[M + 1]]);
        return y;
      })),
    u = [];
  for (let v of h.concat(f)) {
    let y = f.includes(v),
      M = [];
    for (let w = 0; w + 1 < v.length; w++) {
      let [z, _] = v[w],
        [R, T] = v[w + 1],
        E = Math.max(1, Math.ceil(Math.hypot(R - z, T - _) / (y ? 6 : 4)));
      for (let A = 0; A < E; A++)
        M.push([z + ((R - z) * A) / E, _ + ((T - _) * A) / E]);
    }
    M.push(v[v.length - 1]);
    for (let w of M) w.push(n.driveHeight(w[0], w[1]) + 0.05);
    let S = M.map((w, z) => {
      let _ = (A, C) => {
          let P = Math.hypot(C[0] - A[0], C[1] - A[1]) || 1;
          return [-(C[1] - A[1]) / P, (C[0] - A[0]) / P];
        },
        R = _(M[Math.max(0, z - 1)], w),
        T = _(w, M[Math.min(M.length - 1, z + 1)]);
      if (!z) return T;
      if (z === M.length - 1) return R;
      let E = 1 + R[0] * T[0] + R[1] * T[1];
      return E > 0.1 ? [(R[0] + T[0]) / E, (R[1] + T[1]) / E] : T;
    });
    for (let w = 0; w + 1 < M.length; w++) {
      let [z, _, R] = M[w],
        [T, E, A] = M[w + 1];
      if (Math.hypot(T - z, E - _) < 0.001) continue;
      let P = (z + T) / 2,
        I = (_ + E) / 2;
      if ((!y && c(P, I)) || by(s.D, P, I)) continue;
      let L = i.get(
          "railsR" +
            Math.floor((P + 3e3) / 400) +
            "_" +
            Math.floor((I + 3e3) / 400),
          "solid",
        ),
        [F, N] = S[w],
        [B, H] = S[w + 1],
        O = (D, U, G, q) =>
          u.push({
            g: L,
            col: q,
            points: [
              [z + F * D, R + G, _ + N * D],
              [T + B * D, A + G, E + H * D],
              [T + B * U, A + G, E + H * U],
              [z + F * U, R + G, _ + N * U],
            ],
          });
      if (!n.probe(P, I).road)
        for (let [D, U] of [
          [-1.3, -0.7575],
          [-0.64, 0.64],
          [0.7575, 1.3],
        ])
          O(D, U, -0.02, o);
      for (let [D, U, G, q] of [
        [0.6775, 0.7575, a, 0.006],
        [-0.7575, -0.6775, a, 0.006],
        [0.64, 0.6775, r, 0],
        [-0.6775, -0.64, r, 0],
      ])
        O(D, U, q, G);
    }
  }
  let d = (v) => (v === a ? 2 : v === r ? 1 : 0);
  u.sort((v, y) => d(y.col) - d(v.col));
  for (let { g: v, col: y, points: M } of sS(u)) nS(v, M, y);
  let p = h[0],
    m = h[1],
    g = { P: new Float64Array(m.length * 3), W: new Float64Array(m.length) };
  (m.forEach(([v, y], M) => {
    ((g.P[M * 3] = v), (g.P[M * 3 + 1] = y));
  }),
    Xft(g));
  let b = null,
    x = 0;
  for (let v = 0; v + 1 < p.length; v++) {
    let [y, M] = p[v],
      [S, w] = p[v + 1],
      z = Math.hypot(S - y, w - M);
    for (let _ = (42 - x) % 42; _ < z; _ += 42) {
      let R = y + ((S - y) * _) / z,
        T = M + ((w - M) * _) / z,
        E = vs(g, R, T, {});
      if (E.d < 2.5 || E.d > 9) {
        b = null;
        continue;
      }
      let A = Ot(g, E.s, {}),
        C = (R + A.x) / 2,
        P = (T + A.z) / 2,
        I = (A.x - R) / E.d,
        L = (A.z - T) / E.d,
        F = E.d / 2,
        N = n.probe(C, P);
      if (N.road && !N.road.J && !N.road.E.median) {
        b = null;
        continue;
      }
      let B = n.driveHeight(C, P),
        H = B + 6.1,
        O = i.get(
          "railsR" +
            Math.floor((C + 3e3) / 400) +
            "_" +
            Math.floor((P + 3e3) / 400),
          "solid",
        );
      (e.push(
        { kind: "farm", x: C, y: B, z: P, rot: Math.atan2(-L, I), sx: F + 0.4 },
        { kind: "fpole", x: C, y: B, z: P, rot: 0 },
      ),
        t.push({ t: "circ", x: C, z: P, r: 0.25, y0: B - 1.5, y1: B + 7 }));
      let D = [
        [R, H, T],
        [A.x, H, A.z],
      ];
      if (b) for (let U = 0; U < 2; U++) ss(O, b[U], D[U], 0.025, 0.025, l);
      b = D;
    }
    x = (x + z) % 42;
  }
  $ft({ B: i, colliders: t, inst: e }, s, f);
}
var Vft = [
  ["The Embarcadero", "Folsom Street"],
  ["King Street", "2nd Street"],
  ["King Street", "4th Street"],
  ["3rd Street", "Mission Rock Street"],
  ["The Embarcadero", "Brannan Street"],
  ["3rd Street", "16th Street"],
];
