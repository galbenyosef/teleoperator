// app 145 — math
// Lines 93267-93518 of readable/app.pretty.js (statement-aligned).
function nmt(o, t, e) {
  t.presidio = [];
  for (let [x, y] of Object.entries(J1t)) {
    let M = y[0],
      S = y[y.length - 1],
      w = Tw(o, M[0], M[1]),
      _ = Tw(o, S[0], S[1]);
    if (!w || !_) {
      console.warn("highways: Presidio tunnel ends not found", x);
      continue;
    }
    let z =
        o.edges.find(
          (L) =>
            L.jb === w.id &&
            !L.synthetic &&
            L.hwy &&
            L.name === "Presidio Parkway",
        ) || o.edges.find((L) => L.jb === w.id),
      A = o.edges.find((L) => L.ja === _.id),
      T = ax(y, 6),
      E = [0];
    for (let L = 1; L < T.length; L++)
      E.push(
        E[L - 1] + Math.hypot(T[L][0] - T[L - 1][0], T[L][1] - T[L - 1][1]),
      );
    let R = E[E.length - 1],
      P = z ? z.W[z.n - 1] : 5.4,
      C = A ? A.W[0] : P,
      I = qu(o, {
        pts: T.map((L, F) => [L[0], L[1], w.y + ((_.y - w.y) * E[F]) / R]),
        w: (L) => P + (C - P) * (E[L] / R),
        lanes: z?.lanes ?? 3,
        laneW: 3.6,
        name: "Presidio Parkway",
        ja: w.id,
        jb: _.id,
        rank: z?.rank ?? 8,
        maxspeed: z?.maxspeed ?? 35,
        dist: "presidio",
        layer: 1,
        flags: a$,
        way: 0,
        tunnel: x,
      });
    (w.type === "end" && (w.type = "j"),
      _.type === "end" && (_.type = "j"),
      (I.ta = I.tb = 0),
      (I.s0 = 0),
      (I.s1 = I.L),
      z && ((z.tb = 0), (z.s1 = z.L)),
      A && ((A.ta = 0), (A.s0 = 0)),
      t.presidio.push(I));
  }
  let s = (x) => t.presidio.find((y) => y.tunnel === x),
    n = (x) => o.edges.filter((y) => y.ja === x.id).length,
    i = (x) => o.edges.filter((y) => y.jb === x.id).length,
    a = [];
  if (s("n1")) {
    let x = [s("n1")],
      y = x[0];
    for (let M = 0; M < 8; M++) {
      let S = o.juns[y.jb];
      if (!S || n(S) !== 1 || i(S) !== 1) break;
      ((y = o.edges.find((w) => w.ja === S.id)), x.push(y));
    }
    a.push(x);
  }
  if (s("s2")) {
    let x = [s("s2")],
      y = x[0];
    for (let M = 0; M < 8; M++) {
      let S = o.juns[y.ja];
      if (!S || n(S) !== 1 || i(S) !== 1) break;
      ((y = o.edges.find((w) => w.jb === S.id)), x.unshift(y));
    }
    a.push(x);
  }
  let r = o.terrain,
    l = {},
    c = new Set(a.flat()),
    h = [],
    f = new Map(),
    u = new Map(),
    d = new Set(),
    p = t.presidio.map((x) => {
      let y = [x.P[0], x.P[1]],
        M = [x.P[(x.n - 1) * 3], x.P[(x.n - 1) * 3 + 1]],
        S = Math.hypot(M[0] - y[0], M[1] - y[1]),
        w = (M[0] - y[0]) / S,
        _ = (M[1] - y[1]) / S,
        z = x.tunnel === "n1" ? 37 : 7,
        A = x.tunnel === "s2" ? 37 : 7;
      return (T, E) => {
        let R = T - y[0],
          P = E - y[1],
          C = R * w + P * _,
          I = -R * _ + P * w;
        return C > z && C < S - A && Math.abs(I) < x.W[0] + 40;
      };
    }),
    m = (x, y) => p.some((M) => M(x, y));
  o.presidioCovered = m;
  for (let x of o.edges) {
    if (c.has(x) || x.layered || x.inner) continue;
    let y = 1e9,
      M = 1e9,
      S = -1e9,
      w = -1e9;
    for (let z = 0; z < x.n; z++)
      ((y = Math.min(y, x.P[z * 3])),
        (S = Math.max(S, x.P[z * 3])),
        (M = Math.min(M, x.P[z * 3 + 1])),
        (w = Math.max(w, x.P[z * 3 + 1])));
    if (S < -6700 || y > -5200 || w < -1e3 || M > -550) continue;
    let _ = x.W[0] + x.sw + 3;
    ((x._cut = [y - _, M - _, S + _, w + _]), h.push(x));
  }
  let g = (x) => {
    let y = o.juns[x[0].ja],
      M = o.juns[x[x.length - 1].jb],
      S = y.x > M.x ? y : M,
      w = S === y ? M : y,
      _ = -5925,
      z = (A) => A * A * (3 - 2 * A);
    return (A) => {
      let T = 4 + (S.y - 4) * Math.max(0, Math.min(1, (A - _) / (S.x - _))),
        E = 4 + (w.y - 4) * Math.max(0, Math.min(1, (_ - A) / (_ - w.x))),
        R = z(Math.max(0, Math.min(1, (_ + 40 - A) / 80)));
      return T * (1 - R) + E * R;
    };
  };
  for (let x of a) {
    let y = g(x);
    for (let M of x)
      for (let S = 0; S < M.n; S++) M.P[S * 3 + 2] = y(M.P[S * 3]);
  }
  {
    let x = performance.now();
    (imt(o, a),
      ((o.atGradeT ||= {}).grade = +(performance.now() - x).toFixed(1)));
  }
  for (let x of a) {
    let y = o.juns[x[0].ja],
      M = o.juns[x[x.length - 1].jb],
      S = g(x);
    for (let w of x) {
      for (let P = 0; P < w.n; P++) w.P[P * 3 + 2] = S(w.P[P * 3]);
      ((w.flags |= 67),
        (w.elev = !0),
        (w.layered = !0),
        w.layer < 1 && (w.layer = 1));
      for (let P of [w.ja, w.jb]) {
        let C = o.juns[P];
        if (!(!C || C === y || C === M)) {
          C.y = S(C.x);
          for (let I of C.rings) I.y.fill(C.y);
        }
      }
      let _ = 1e9,
        z = 1e9,
        A = -1e9,
        T = -1e9;
      for (let P = 0; P < w.n; P++)
        ((_ = Math.min(_, w.P[P * 3])),
          (A = Math.max(A, w.P[P * 3])),
          (z = Math.min(z, w.P[P * 3 + 1])),
          (T = Math.max(T, w.P[P * 3 + 1])));
      let E = 45,
        R = {};
      for (
        let P = Math.max(0, Math.floor((z - E - r.z0) / r.step));
        P <= Math.min(r.nz - 1, Math.ceil((T + E - r.z0) / r.step));
        P++
      )
        for (
          let C = Math.max(0, Math.floor((_ - E - r.x0) / r.step));
          C <= Math.min(r.nx - 1, Math.ceil((A + E - r.x0) / r.step));
          C++
        ) {
          let I = r.x0 + C * r.step,
            L = r.z0 + P * r.step;
          if ((gk(w, I, L, R), R.d > w.W[0] + E)) continue;
          if (m(I, L) && !(R.d < R.w + 4.5 && !w.tunnel)) {
            R.d < R.w + 4.5 &&
              (r.h[P * r.nx + C] = Math.max(r.h[P * r.nx + C], R.y + 7.6));
            continue;
          }
          let F = R.y - 0.4 + Math.max(0, R.d - R.w - 3) * 1,
            O = P * r.nx + C;
          if (
            (R.d < R.w + 3.5 && u.set(O, Math.min(u.get(O) ?? 1e9, F)),
            r.h[O] <= F)
          )
            continue;
          f.has(O) || f.set(O, r.h[O]);
          let B = -1e9;
          for (let H of h) {
            if (
              I < H._cut[0] ||
              I > H._cut[2] ||
              L < H._cut[1] ||
              L > H._cut[3]
            )
              continue;
            gk(H, I, L, l);
            let N = l.w + H.sw + 1.5;
            (l.d < N + 40 &&
              (B = Math.max(B, l.y - 0.35 - Math.max(0, l.d - N) * 1.5)),
              l.d < N + 1 && d.add(O));
          }
          r.h[O] = Math.max(F, Math.min(r.h[O], B));
        }
    }
    t.presidioChain = (t.presidioChain || []).concat(x);
  }
  let b = new Set();
  for (let x of f.keys()) {
    let y = x % r.nx,
      M = (x - y) / r.nx;
    for (let S = -1; S <= 1; S++)
      for (let w = -1; w <= 1; w++) {
        let _ = y + w,
          z = M + S;
        _ >= 0 && z >= 0 && _ < r.nx && z < r.nz && b.add(z * r.nx + _);
      }
  }
  let v = new Map();
  for (let x = 0; x < 3; x++) {
    for (let y of b) {
      let M = y % r.nx,
        S = (y - M) / r.nx,
        w = 0,
        _ = 0;
      for (let z = -1; z <= 1; z++)
        for (let A = -1; A <= 1; A++) {
          let T = M + A,
            E = S + z;
          if (T < 0 || E < 0 || T >= r.nx || E >= r.nz) continue;
          let R = A || z ? (A && z ? 0.5 : 1) : 2;
          ((w += r.h[E * r.nx + T] * R), (_ += R));
        }
      v.set(y, w / _);
    }
    for (let [y, M] of v) {
      if (d.has(y)) continue;
      let S = u.get(y),
        w = Math.min(M, f.get(y) ?? r.h[y]);
      (S !== void 0 && (w = Math.min(w, S)), (r.h[y] = w));
    }
  }
}
