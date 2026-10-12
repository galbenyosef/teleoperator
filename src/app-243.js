// app 243 — math
// Lines 124199-124416 of readable/app.pretty.js (statement-aligned).
function fK(i, t) {
  let {
      ground: e,
      d: s,
      clear: n,
      front: o,
      CURB: a,
      xa: r,
      xb: l,
      rin: c,
    } = t,
    h = i.F,
    f = [];
  for (let [u, d] of [
    ["north", -1],
    ["south", 1],
  ]) {
    let z = function (A, C) {
        let P = b[A],
          I = b[C] + $k * 0.5,
          L = x[A],
          F = x[C],
          N = (X, K, nt) => {
            let Z = e(X + nt * 0.8, K);
            return Z + (Math.abs(Z - e(X, K)) < 1.5 ? a : 0.06);
          },
          B = new Float32Array(C - A + 1);
        for (let X = C; X >= A; X--)
          B[X - A] = Math.max(M[X], X < C ? B[X - A + 1] : -1e9);
        let H = Math.max(N(P, L, -1), B[0]),
          O = Math.min(H, N(I, F, 1)),
          D = H - O,
          U = [];
        if (D < 0.08)
          return (
            U.push({ u0: P, u1: I, y: H }),
            { k0: A, k1: C, u0: P, u1: I, treads: U, flights: 0 }
          );
        let G = Math.max(1, Math.round(D / (F2t * rK))),
          q = D / G,
          W = Math.max(2, Math.round(q / rK)),
          V = q / W,
          Y = W * I2t,
          $ = [],
          st = P;
        for (let X = 1; X <= G; X++) {
          let K = H - X * q,
            nt = I;
          for (let Z = A; Z <= C; Z++)
            if (B[Z - A] <= K + 0.001) {
              nt = b[Z];
              break;
            }
          ((nt = Math.max(nt, st + 0.3 + Y)), $.push(nt), (st = nt));
        }
        for (let X = G - 1; X >= 0; X--) {
          let K = X === G - 1 ? I - 0.3 : $[X + 1] - Y - 0.3;
          $[X] > K && ($[X] = K);
        }
        let Q = P,
          j = H;
        for (let X = 0; X < G; X++) {
          let K = Math.max(Q, $[X] - Y),
            nt = ($[X] - K) / W;
          K > Q + 0.01 && U.push({ u0: Q, u1: K, y: j, land: !0 });
          for (let Z = 1; Z <= W; Z++)
            U.push({ u0: K + (Z - 1) * nt, u1: K + Z * nt, y: j - Z * V });
          ((j -= q), (Q = $[X]));
        }
        return (
          I > Q + 0.01 && U.push({ u0: Q, u1: I, y: j, land: !0 }),
          { k0: A, k1: C, u0: P, u1: I, treads: U, flights: G, riser: V }
        );
      },
      p = [];
    for (let A of C2t[u])
      for (let C = 0; C < A.length; C += 2)
        p.push(h.inv(...Gi(A[C], A[C + 1])));
    p.sort((A, C) => A[0] - C[0]);
    let m = (A) => {
        if (A <= p[0][0]) return p[0][1];
        for (let C = 1; C < p.length; C++)
          if (A <= p[C][0]) {
            let P = (A - p[C - 1][0]) / Math.max(1e-6, p[C][0] - p[C - 1][0]);
            return p[C - 1][1] + (p[C][1] - p[C - 1][1]) * P;
          }
        return p[p.length - 1][1];
      },
      g = Math.floor((l - r) / $k) + 1,
      b = new Float32Array(g),
      x = new Float32Array(g),
      v = new Float32Array(g),
      y = new Uint8Array(g),
      M = new Float32Array(g),
      S = (A) => {
        let C = b[A],
          P = x[A],
          I = L2t,
          L = o(C, d);
        {
          let B = c - s(C, P - d * I);
          if (B > 0) {
            P += d * B;
            for (let H = 0; H < 30 && s(C, P - d * I) < c; H++) P += d * 0.08;
          }
        }
        let F = P - d * I,
          N = L - 0.25 - Math.abs(F);
        (N < 2 * I && ((I = Math.max(0.55, N / 2)), (P = F + d * I)),
          (x[A] = P),
          (v[A] = I));
      };
    for (let A = 0; A < g; A++) ((b[A] = r + A * $k), (x[A] = m(b[A])), S(A));
    for (let A = 0; A < 3; A++) {
      let C = Float32Array.from(x);
      for (let P = 0; P < g; P++) {
        let I = 0,
          L = 0;
        for (let F = Math.max(0, P - 4); F <= Math.min(g - 1, P + 4); F++)
          ((I += C[F]), L++);
        x[P] = I / L;
      }
      for (let P = 0; P < g; P++) S(P);
    }
    for (let A = 0; A < g; A++) {
      let C = b[A],
        P = x[A],
        I = v[A];
      ((y[A] =
        n(C, P) > 0.2 && n(C, P - d * I) > 0 && n(C, P + d * I) > 0 ? 1 : 0),
        (M[A] = Math.max(e(C, P), e(C, P - d * I), e(C, P + d * I)) + 0.06));
    }
    let w = [];
    for (let A = 0; A < g;) {
      if (!y[A]) {
        A++;
        continue;
      }
      let C = A;
      for (; C + 1 < g && y[C + 1];) C++;
      (C - A >= 4 && w.push(z(A, C)), (A = C + 1));
    }
    let _ = (A) => {
        let C = Math.max(0, Math.min(g - 1.001, (A - r) / $k)),
          P = Math.floor(C),
          I = C - P;
        return [x[P] + (x[P + 1] - x[P]) * I, v[P] + (v[P + 1] - v[P]) * I];
      },
      R = (A) => {
        for (let C of w)
          if (A >= C.u0 && A <= C.u1) {
            for (let P of C.treads) if (A <= P.u1) return P.y;
          }
        return null;
      },
      T = new Float32Array(Math.ceil((l - r) / 0.05) + 2);
    for (let A = 0; A < T.length; A++) {
      let C = R(r + A * 0.05);
      T[A] = C === null ? NaN : C;
    }
    let E = (A) => {
      let C = Math.round((A - r) / 0.05);
      if (C < 0 || C >= T.length) return null;
      let P = T[C];
      return P === P ? P : null;
    };
    for (let A of w)
      for (let C of A.treads) {
        let [P, I] = _((C.u0 + C.u1) / 2);
        C.g = Math.min(
          e(C.u0, P - I),
          e(C.u0, P + I),
          e(C.u1, P - I),
          e(C.u1, P + I),
        );
      }
    f.push({
      name: u,
      sd: d,
      n: g,
      U: b,
      Wc: x,
      HW: v,
      on: y,
      runs: w,
      at: _,
      yAt: E,
    });
  }
  return { sides: f, F: i.F };
}
function uK(i) {
  let t = [];
  for (let e of i.sides)
    for (let s of e.runs)
      for (let n = s.u0; n < s.u1 - 0.05; n += 2) {
        let o = Math.min(s.u1, n + 2),
          [a, r] = e.at(n),
          [l, c] = e.at(o),
          h = Math.hypot(o - n, l - a),
          f = (o - n) / h,
          u = (l - a) / h,
          d = e.yAt((n + o) / 2) ?? 0;
        t.push({
          t: "obb",
          x: (n + o) / 2,
          z: (a + l) / 2,
          hx: Math.min(r, c),
          hz: h / 2,
          c: u,
          s: f,
          y0: d - 3,
          y1: d + 2.5,
          walk: !0,
        });
      }
  return t;
}
