// app 241 — math
// Lines 123617-123879 of readable/app.pretty.js (statement-aligned).
function TC(i = "hedge", t = 9, { W: e, y0: s = 0 } = {}) {
  let n = [];
  for (let [o, [a, r]] of [
    [1, 1],
    [0.45, 1.6],
    [0.2, 2.6],
  ].entries()) {
    let l = $c(t + o),
      c = new la(),
      h = new la(),
      f = e || (i === "hedge" ? 0.9 : 1.3),
      u = i === "hedge" ? 1.1 : i === "flower" ? 0.75 : 1.2,
      d = i === "hedge" ? 1 : 1.3;
    i !== "flower" &&
      ((v, y, M, S, w, z, _) => {
        let R = [
          [v, y, M],
          [S, y, M],
          [S, w, M],
          [v, w, M],
          [v, y, z],
          [S, y, z],
          [S, w, z],
          [v, w, z],
        ].map((T) => Vs(...T));
        for (let [T, E, A, C, P] of [
          [0, 1, 2, 3, Vs(0, 0, -1)],
          [5, 4, 7, 6, Vs(0, 0, 1)],
          [4, 0, 3, 7, Vs(-1, 0, 0)],
          [1, 5, 6, 2, Vs(1, 0, 0)],
          [3, 2, 6, 7, Vs(0, 1, 0)],
        ]) {
          let I = [T, E, A, C].map((L, F) =>
            c.v(
              R[L],
              P,
              (0.15 + 0.7 * (F === 1 || F === 2 ? 1 : 0)) / 4,
              (3.2 + 0.6 * (F < 2 ? 1 : 0)) / 4,
              _,
            ),
          );
          c.q(I[0], I[1], I[2], I[3]);
        }
      })(
        -f * 0.42,
        0,
        -d * 0.5,
        f * 0.42,
        u * 0.9,
        d * 0.5,
        [0.7, 0.7, 0.7, 0],
      );
    let m = i === "flower" ? 13 : 12,
      g = Math.round((i === "hedge" ? 26 : i === "flower" ? 16 : 22) * a),
      b = Vs(0, u * 0.45, 0);
    for (let v = 0; v < g; v++) {
      let y, M;
      if (i === "hedge") {
        let T = Math.floor(l() * 3),
          E = (l() - 0.5) * d;
        if (T === 0)
          ((y = Vs((l() - 0.5) * f * 0.9, u * (0.92 + l() * 0.1), E)),
            (M = Vs(0, 1, 0)));
        else {
          let A = T === 1 ? 1 : -1;
          ((y = Vs(A * f * (0.45 + l() * 0.05), u * (0.1 + l() * 0.8), E)),
            (M = Vs(A, 0.2, 0).normalize()));
        }
      } else {
        let T = Vs(l() * 2 - 1, l() * 0.9, l() * 2 - 1).normalize();
        ((y = b.clone().add(Vs(T.x * f * 0.55, T.y * u * 0.6, T.z * d * 0.55))),
          (M = T));
      }
      let S =
          (i === "hedge" ? 0.62 : i === "flower" ? 0.7 : 0.8) *
          r *
          (0.85 + l() * 0.3),
        w = i === "flower" ? oi.clone() : Vc(M, l).lerp(oi, 0.3).normalize(),
        z = w.clone().cross(M).normalize(),
        _ = y.clone().addScaledVector(w, -S * 0.5),
        R = [];
      for (let T of [0, 1])
        for (let E of [-0.5, 0.5]) {
          let A = _.clone()
              .addScaledVector(w, T * S)
              .addScaledVector(z, E * S),
            C = 0.55 + 0.45 * Math.min(1, A.y / u + 0.2);
          R.push(
            h.v(
              A,
              M.clone().lerp(A.clone().sub(b).normalize(), 0.5).normalize(),
              ((m % 4) + 0.02 + 0.96 * (E + 0.5)) / 4,
              ((m >> 2) + 0.99 - 0.98 * T) / 4,
              [C, C, C, 0.6],
            ),
          );
        }
      h.q(R[0], R[1], R[3], R[2]);
    }
    let x = [{ mat: "leaf", geo: h.geo() }];
    if ((c.count && x.unshift({ mat: "shrubcore", geo: c.geo() }), s))
      for (let v of x) v.geo.translate(0, s, 0);
    n.push(x);
  }
  return n;
}
var un = {
    pitto: 0,
    escal: 1,
    flax: 2,
    rosem: 3,
    fern: 4,
    ivy: 5,
    ice: 6,
    lawn: 7,
    wild: 8,
    coyote: 9,
    juniper: 10,
    hydr: 11,
    box: 12,
    agap: 13,
    clover: 14,
    litter: 15,
  },
  dm = { mound: 0, clump: 2, mat: 5 };
function pm(i = "mound", t = 21) {
  let e = dm[i],
    s = e % 4,
    n = e >> 2,
    o = (s + 0.008) / 4,
    a = (s + 0.992) / 4,
    r = (n + 0.008) / 4,
    l = (n + 0.992) / 4,
    c = [];
  for (let h of [0, 1, 2]) {
    let f = $c(t),
      u = new la(),
      d = (
        g,
        b,
        x,
        v,
        y,
        M,
        {
          u0: S = 0,
          u1: w = 1,
          v0: z = 0,
          v1: _ = 1,
          ao0: R = 0.5,
          tr: T = 0.8,
        } = {},
      ) => {
        let E = [];
        for (let [A, C] of [
          [0, _],
          [0.5, (z + _) / 2],
          [1, z],
        ])
          for (let P of [-0.5, 0.5]) {
            let I = g
                .clone()
                .addScaledVector(b, P * v)
                .addScaledVector(x, A * y),
              L = b.clone().cross(x).normalize(),
              F = I.clone().sub(M);
            ((F.y = Math.max(F.y, 0) * 1.4 + 0.15), F.normalize());
            let N = L.multiplyScalar(L.dot(F) < 0 ? -0.3 : 0.3)
                .addScaledVector(F, 0.7)
                .normalize(),
              B = R + (1 - R) * ul(0, 0.8, A);
            E.push(
              u.v(I, N, o + (a - o) * (P < 0 ? S : w), r + (l - r) * C, [
                B,
                B,
                1,
                T,
              ]),
            );
          }
        (u.q(E[0], E[1], E[3], E[2]), u.q(E[2], E[3], E[5], E[4]));
      },
      p = Vs(0, 0.35, 0),
      m = f() * Math.PI;
    if (i === "mound") {
      let g = [4, 3, 2][h];
      for (let x = 0; x < g; x++) {
        let v = m + (x / g) * Math.PI + (f() - 0.5) * 0.25,
          y = Vs(Math.cos(v), 0, Math.sin(v)),
          M = (f() - 0.5) * 0.25,
          S = oi.clone().applyAxisAngle(y, M),
          w = 1.35 + f() * 0.3;
        d(
          Vs((f() - 0.5) * 0.15, -0.04, (f() - 0.5) * 0.15),
          y,
          S,
          w,
          w * (0.8 + f() * 0.1),
          p,
          { ao0: 0.45 },
        );
      }
      let b = [6, 3, 0][h];
      for (let x = 0; x < b; x++) {
        let v = m + (x / b) * Math.PI * 2 + f() * 0.5,
          y = Vs(Math.cos(v), 0, Math.sin(v)),
          M = Vs(-y.z, 0, y.x),
          S = 0.95 + f() * 0.3,
          w = oi
            .clone()
            .multiplyScalar(Math.cos(S))
            .addScaledVector(y, Math.sin(S));
        d(
          Vs(0, 0.55 + f() * 0.15, 0).addScaledVector(y, -0.25),
          M,
          w,
          0.95,
          0.8,
          p,
          { v0: 0, v1: 0.75, ao0: 0.7, tr: 1 },
        );
      }
    } else if (i === "clump") {
      let g = [5, 3, 2][h];
      for (let b = 0; b < g; b++) {
        let x = m + (b / g) * Math.PI + (f() - 0.5) * 0.3,
          v = Vs(Math.cos(x), 0, Math.sin(x)),
          y = Vs(-v.z, 0, v.x).multiplyScalar(f() < 0.5 ? -1 : 1),
          M = b < 2 ? (f() - 0.5) * 0.12 : 0.22 + f() * 0.15,
          S = oi
            .clone()
            .multiplyScalar(Math.cos(M))
            .addScaledVector(y, Math.sin(M));
        d(Vs(0, -0.03, 0), v, S, b < 2 ? 1.1 : 0.9, b < 2 ? 1.1 : 0.95, p, {
          ao0: 0.55,
        });
      }
    } else {
      let g = [6, 4, 3][h];
      for (let b = 0; b < g; b++) {
        let x = m + (b / g) * Math.PI * 2 + f() * 0.4,
          v = Vs(Math.cos(x), 0, Math.sin(x)),
          y = Vs(-v.z, 0, v.x),
          M = 0.9 + f() * 0.35,
          S = oi
            .clone()
            .multiplyScalar(Math.cos(M))
            .addScaledVector(v, Math.sin(M));
        d(
          v.clone().multiplyScalar(-0.2).setY(0.02),
          y,
          S,
          1.5,
          0.95,
          Vs(0, -0.3, 0),
          { ao0: 0.7, tr: 0.6 },
        );
      }
    }
    c.push([{ mat: "shrubleaf", geo: u.geo() }]);
  }
  return c;
}
