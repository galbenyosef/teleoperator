// app 146 — math
// Lines 92998-93249 of readable/app.pretty.js (statement-aligned).
function Fut(i, t, e) {
  t.presidio = [];
  for (let [v, y] of Object.entries(Aut)) {
    let M = y[0],
      S = y[y.length - 1],
      w = Iy(i, M[0], M[1]),
      z = Iy(i, S[0], S[1]);
    if (!w || !z) {
      console.warn("highways: Presidio tunnel ends not found", v);
      continue;
    }
    let _ =
        i.edges.find(
          (L) =>
            L.jb === w.id &&
            !L.synthetic &&
            L.hwy &&
            L.name === "Presidio Parkway",
        ) || i.edges.find((L) => L.jb === w.id),
      R = i.edges.find((L) => L.ja === z.id),
      T = yb(y, 6),
      E = [0];
    for (let L = 1; L < T.length; L++)
      E.push(
        E[L - 1] + Math.hypot(T[L][0] - T[L - 1][0], T[L][1] - T[L - 1][1]),
      );
    let A = E[E.length - 1],
      C = _ ? _.W[_.n - 1] : 5.4,
      P = R ? R.W[0] : C,
      I = cu(i, {
        pts: T.map((L, F) => [L[0], L[1], w.y + ((z.y - w.y) * E[F]) / A]),
        w: (L) => C + (P - C) * (E[L] / A),
        lanes: _?.lanes ?? 3,
        laneW: 3.6,
        name: "Presidio Parkway",
        ja: w.id,
        jb: z.id,
        rank: _?.rank ?? 8,
        maxspeed: _?.maxspeed ?? 35,
        dist: "presidio",
        layer: 1,
        flags: ij,
        way: 0,
        tunnel: v,
      });
    (w.type === "end" && (w.type = "j"),
      z.type === "end" && (z.type = "j"),
      (I.ta = I.tb = 0),
      (I.s0 = 0),
      (I.s1 = I.L),
      _ && ((_.tb = 0), (_.s1 = _.L)),
      R && ((R.ta = 0), (R.s0 = 0)),
      t.presidio.push(I));
  }
  let s = (v) => t.presidio.find((y) => y.tunnel === v),
    n = (v) => i.edges.filter((y) => y.ja === v.id).length,
    o = (v) => i.edges.filter((y) => y.jb === v.id).length,
    a = [];
  if (s("n1")) {
    let v = [s("n1")],
      y = v[0];
    for (let M = 0; M < 8; M++) {
      let S = i.juns[y.jb];
      if (!S || n(S) !== 1 || o(S) !== 1) break;
      ((y = i.edges.find((w) => w.ja === S.id)), v.push(y));
    }
    a.push(v);
  }
  if (s("s2")) {
    let v = [s("s2")],
      y = v[0];
    for (let M = 0; M < 8; M++) {
      let S = i.juns[y.ja];
      if (!S || n(S) !== 1 || o(S) !== 1) break;
      ((y = i.edges.find((w) => w.jb === S.id)), v.unshift(y));
    }
    a.push(v);
  }
  let r = i.terrain,
    l = {},
    c = new Set(a.flat()),
    h = [],
    f = new Map(),
    u = new Map(),
    d = new Set(),
    p = t.presidio.map((v) => {
      let y = [v.P[0], v.P[1]],
        M = [v.P[(v.n - 1) * 3], v.P[(v.n - 1) * 3 + 1]],
        S = Math.hypot(M[0] - y[0], M[1] - y[1]),
        w = (M[0] - y[0]) / S,
        z = (M[1] - y[1]) / S,
        _ = v.tunnel === "n1" ? 37 : 7,
        R = v.tunnel === "s2" ? 37 : 7;
      return (T, E) => {
        let A = T - y[0],
          C = E - y[1],
          P = A * w + C * z,
          I = -A * z + C * w;
        return P > _ && P < S - R && Math.abs(I) < v.W[0] + 40;
      };
    }),
    m = (v, y) => p.some((M) => M(v, y));
  i.presidioCovered = m;
  for (let v of i.edges) {
    if (c.has(v) || v.layered || v.inner) continue;
    let y = 1e9,
      M = 1e9,
      S = -1e9,
      w = -1e9;
    for (let _ = 0; _ < v.n; _++)
      ((y = Math.min(y, v.P[_ * 3])),
        (S = Math.max(S, v.P[_ * 3])),
        (M = Math.min(M, v.P[_ * 3 + 1])),
        (w = Math.max(w, v.P[_ * 3 + 1])));
    if (S < -6700 || y > -5200 || w < -1e3 || M > -550) continue;
    let z = v.W[0] + v.sw + 3;
    ((v._cut = [y - z, M - z, S + z, w + z]), h.push(v));
  }
  let g = (v) => {
    let y = i.juns[v[0].ja],
      M = i.juns[v[v.length - 1].jb],
      S = y.x > M.x ? y : M,
      w = S === y ? M : y,
      z = -5925,
      _ = (R) => R * R * (3 - 2 * R);
    return (R) => {
      let T = 4 + (S.y - 4) * Math.max(0, Math.min(1, (R - z) / (S.x - z))),
        E = 4 + (w.y - 4) * Math.max(0, Math.min(1, (z - R) / (z - w.x))),
        A = _(Math.max(0, Math.min(1, (z + 40 - R) / 80)));
      return T * (1 - A) + E * A;
    };
  };
  for (let v of a) {
    let y = g(v);
    for (let M of v)
      for (let S = 0; S < M.n; S++) M.P[S * 3 + 2] = y(M.P[S * 3]);
  }
  {
    let v = performance.now();
    (Nut(i, a),
      ((i.atGradeT ||= {}).grade = +(performance.now() - v).toFixed(1)));
  }
  for (let v of a) {
    let y = i.juns[v[0].ja],
      M = i.juns[v[v.length - 1].jb],
      S = g(v);
    for (let w of v) {
      for (let C = 0; C < w.n; C++) w.P[C * 3 + 2] = S(w.P[C * 3]);
      ((w.flags |= 67),
        (w.elev = !0),
        (w.layered = !0),
        w.layer < 1 && (w.layer = 1));
      for (let C of [w.ja, w.jb]) {
        let P = i.juns[C];
        if (!(!P || P === y || P === M)) {
          P.y = S(P.x);
          for (let I of P.rings) I.y.fill(P.y);
        }
      }
      let z = 1e9,
        _ = 1e9,
        R = -1e9,
        T = -1e9;
      for (let C = 0; C < w.n; C++)
        ((z = Math.min(z, w.P[C * 3])),
          (R = Math.max(R, w.P[C * 3])),
          (_ = Math.min(_, w.P[C * 3 + 1])),
          (T = Math.max(T, w.P[C * 3 + 1])));
      let E = 45,
        A = {};
      for (
        let C = Math.max(0, Math.floor((_ - E - r.z0) / r.step));
        C <= Math.min(r.nz - 1, Math.ceil((T + E - r.z0) / r.step));
        C++
      )
        for (
          let P = Math.max(0, Math.floor((z - E - r.x0) / r.step));
          P <= Math.min(r.nx - 1, Math.ceil((R + E - r.x0) / r.step));
          P++
        ) {
          let I = r.x0 + P * r.step,
            L = r.z0 + C * r.step;
          if ((pS(w, I, L, A), A.d > w.W[0] + E)) continue;
          if (m(I, L) && !(A.d < A.w + 4.5 && !w.tunnel)) {
            A.d < A.w + 4.5 &&
              (r.h[C * r.nx + P] = Math.max(r.h[C * r.nx + P], A.y + 7.6));
            continue;
          }
          let F = A.y - 0.4 + Math.max(0, A.d - A.w - 3) * 1,
            N = C * r.nx + P;
          if (
            (A.d < A.w + 3.5 && u.set(N, Math.min(u.get(N) ?? 1e9, F)),
            r.h[N] <= F)
          )
            continue;
          f.has(N) || f.set(N, r.h[N]);
          let B = -1e9;
          for (let H of h) {
            if (
              I < H._cut[0] ||
              I > H._cut[2] ||
              L < H._cut[1] ||
              L > H._cut[3]
            )
              continue;
            pS(H, I, L, l);
            let O = l.w + H.sw + 1.5;
            (l.d < O + 40 &&
              (B = Math.max(B, l.y - 0.35 - Math.max(0, l.d - O) * 1.5)),
              l.d < O + 1 && d.add(N));
          }
          r.h[N] = Math.max(F, Math.min(r.h[N], B));
        }
    }
    t.presidioChain = (t.presidioChain || []).concat(v);
  }
  let b = new Set();
  for (let v of f.keys()) {
    let y = v % r.nx,
      M = (v - y) / r.nx;
    for (let S = -1; S <= 1; S++)
      for (let w = -1; w <= 1; w++) {
        let z = y + w,
          _ = M + S;
        z >= 0 && _ >= 0 && z < r.nx && _ < r.nz && b.add(_ * r.nx + z);
      }
  }
  let x = new Map();
  for (let v = 0; v < 3; v++) {
    for (let y of b) {
      let M = y % r.nx,
        S = (y - M) / r.nx,
        w = 0,
        z = 0;
      for (let _ = -1; _ <= 1; _++)
        for (let R = -1; R <= 1; R++) {
          let T = M + R,
            E = S + _;
          if (T < 0 || E < 0 || T >= r.nx || E >= r.nz) continue;
          let A = R || _ ? (R && _ ? 0.5 : 1) : 2;
          ((w += r.h[E * r.nx + T] * A), (z += A));
        }
      x.set(y, w / z);
    }
    for (let [y, M] of x) {
      if (d.has(y)) continue;
      let S = u.get(y),
        w = Math.min(M, f.get(y) ?? r.h[y]);
      (S !== void 0 && (w = Math.min(w, S)), (r.h[y] = w));
    }
  }
}
