// app 242 — math
// Lines 124458-124675 of readable/app.pretty.js (statement-aligned).
function pJ(o, t) {
  let {
      ground: e,
      d: s,
      clear: n,
      front: i,
      CURB: a,
      xa: r,
      xb: l,
      rin: c,
    } = t,
    h = o.F,
    f = [];
  for (let [u, d] of [
    ["north", -1],
    ["south", 1],
  ]) {
    let _ = function (R, P) {
        let C = b[R],
          I = b[P] + $z * 0.5,
          L = v[R],
          F = v[P],
          O = (j, K, nt) => {
            let Q = e(j + nt * 0.8, K);
            return Q + (Math.abs(Q - e(j, K)) < 1.5 ? a : 0.06);
          },
          B = new Float32Array(P - R + 1);
        for (let j = P; j >= R; j--)
          B[j - R] = Math.max(M[j], j < P ? B[j - R + 1] : -1e9);
        let H = Math.max(O(C, L, -1), B[0]),
          N = Math.min(H, O(I, F, 1)),
          D = H - N,
          U = [];
        if (D < 0.08)
          return (
            U.push({ u0: C, u1: I, y: H }),
            { k0: R, k1: P, u0: C, u1: I, treads: U, flights: 0 }
          );
        let G = Math.max(1, Math.round(D / (ovt * hJ))),
          W = D / G,
          V = Math.max(2, Math.round(W / hJ)),
          $ = W / V,
          J = V * ivt,
          X = [],
          tt = C;
        for (let j = 1; j <= G; j++) {
          let K = H - j * W,
            nt = I;
          for (let Q = R; Q <= P; Q++)
            if (B[Q - R] <= K + 0.001) {
              nt = b[Q];
              break;
            }
          ((nt = Math.max(nt, tt + 0.3 + J)), X.push(nt), (tt = nt));
        }
        for (let j = G - 1; j >= 0; j--) {
          let K = j === G - 1 ? I - 0.3 : X[j + 1] - J - 0.3;
          X[j] > K && (X[j] = K);
        }
        let Z = C,
          q = H;
        for (let j = 0; j < G; j++) {
          let K = Math.max(Z, X[j] - J),
            nt = (X[j] - K) / V;
          K > Z + 0.01 && U.push({ u0: Z, u1: K, y: q, land: !0 });
          for (let Q = 1; Q <= V; Q++)
            U.push({ u0: K + (Q - 1) * nt, u1: K + Q * nt, y: q - Q * $ });
          ((q -= W), (Z = X[j]));
        }
        return (
          I > Z + 0.01 && U.push({ u0: Z, u1: I, y: q, land: !0 }),
          { k0: R, k1: P, u0: C, u1: I, treads: U, flights: G, riser: $ }
        );
      },
      p = [];
    for (let R of svt[u])
      for (let P = 0; P < R.length; P += 2)
        p.push(h.inv(...ji(R[P], R[P + 1])));
    p.sort((R, P) => R[0] - P[0]);
    let m = (R) => {
        if (R <= p[0][0]) return p[0][1];
        for (let P = 1; P < p.length; P++)
          if (R <= p[P][0]) {
            let C = (R - p[P - 1][0]) / Math.max(1e-6, p[P][0] - p[P - 1][0]);
            return p[P - 1][1] + (p[P][1] - p[P - 1][1]) * C;
          }
        return p[p.length - 1][1];
      },
      g = Math.floor((l - r) / $z) + 1,
      b = new Float32Array(g),
      v = new Float32Array(g),
      x = new Float32Array(g),
      y = new Uint8Array(g),
      M = new Float32Array(g),
      S = (R) => {
        let P = b[R],
          C = v[R],
          I = nvt,
          L = i(P, d);
        {
          let B = c - s(P, C - d * I);
          if (B > 0) {
            C += d * B;
            for (let H = 0; H < 30 && s(P, C - d * I) < c; H++) C += d * 0.08;
          }
        }
        let F = C - d * I,
          O = L - 0.25 - Math.abs(F);
        (O < 2 * I && ((I = Math.max(0.55, O / 2)), (C = F + d * I)),
          (v[R] = C),
          (x[R] = I));
      };
    for (let R = 0; R < g; R++) ((b[R] = r + R * $z), (v[R] = m(b[R])), S(R));
    for (let R = 0; R < 3; R++) {
      let P = Float32Array.from(v);
      for (let C = 0; C < g; C++) {
        let I = 0,
          L = 0;
        for (let F = Math.max(0, C - 4); F <= Math.min(g - 1, C + 4); F++)
          ((I += P[F]), L++);
        v[C] = I / L;
      }
      for (let C = 0; C < g; C++) S(C);
    }
    for (let R = 0; R < g; R++) {
      let P = b[R],
        C = v[R],
        I = x[R];
      ((y[R] =
        n(P, C) > 0.2 && n(P, C - d * I) > 0 && n(P, C + d * I) > 0 ? 1 : 0),
        (M[R] = Math.max(e(P, C), e(P, C - d * I), e(P, C + d * I)) + 0.06));
    }
    let w = [];
    for (let R = 0; R < g;) {
      if (!y[R]) {
        R++;
        continue;
      }
      let P = R;
      for (; P + 1 < g && y[P + 1];) P++;
      (P - R >= 4 && w.push(_(R, P)), (R = P + 1));
    }
    let z = (R) => {
        let P = Math.max(0, Math.min(g - 1.001, (R - r) / $z)),
          C = Math.floor(P),
          I = P - C;
        return [v[C] + (v[C + 1] - v[C]) * I, x[C] + (x[C + 1] - x[C]) * I];
      },
      A = (R) => {
        for (let P of w)
          if (R >= P.u0 && R <= P.u1) {
            for (let C of P.treads) if (R <= C.u1) return C.y;
          }
        return null;
      },
      T = new Float32Array(Math.ceil((l - r) / 0.05) + 2);
    for (let R = 0; R < T.length; R++) {
      let P = A(r + R * 0.05);
      T[R] = P === null ? NaN : P;
    }
    let E = (R) => {
      let P = Math.round((R - r) / 0.05);
      if (P < 0 || P >= T.length) return null;
      let C = T[P];
      return C === C ? C : null;
    };
    for (let R of w)
      for (let P of R.treads) {
        let [C, I] = z((P.u0 + P.u1) / 2);
        P.g = Math.min(
          e(P.u0, C - I),
          e(P.u0, C + I),
          e(P.u1, C - I),
          e(P.u1, C + I),
        );
      }
    f.push({
      name: u,
      sd: d,
      n: g,
      U: b,
      Wc: v,
      HW: x,
      on: y,
      runs: w,
      at: z,
      yAt: E,
    });
  }
  return { sides: f, F: o.F };
}
function mJ(o) {
  let t = [];
  for (let e of o.sides)
    for (let s of e.runs)
      for (let n = s.u0; n < s.u1 - 0.05; n += 2) {
        let i = Math.min(s.u1, n + 2),
          [a, r] = e.at(n),
          [l, c] = e.at(i),
          h = Math.hypot(i - n, l - a),
          f = (i - n) / h,
          u = (l - a) / h,
          d = e.yAt((n + i) / 2) ?? 0;
        t.push({
          t: "obb",
          x: (n + i) / 2,
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
