// app 240 — math
// Lines 123874-124137 of readable/app.pretty.js (statement-aligned).
function iI(o = "hedge", t = 9, { W: e, y0: s = 0 } = {}) {
  let n = [];
  for (let [i, [a, r]] of [
    [1, 1],
    [0.45, 1.6],
    [0.2, 2.6],
  ].entries()) {
    let l = Sh(t + i),
      c = new xa(),
      h = new xa(),
      f = e || (o === "hedge" ? 0.9 : 1.3),
      u = o === "hedge" ? 1.1 : o === "flower" ? 0.75 : 1.2,
      d = o === "hedge" ? 1 : 1.3;
    o !== "flower" &&
      ((x, y, M, S, w, _, z) => {
        let A = [
          [x, y, M],
          [S, y, M],
          [S, w, M],
          [x, w, M],
          [x, y, _],
          [S, y, _],
          [S, w, _],
          [x, w, _],
        ].map((T) => Js(...T));
        for (let [T, E, R, P, C] of [
          [0, 1, 2, 3, Js(0, 0, -1)],
          [5, 4, 7, 6, Js(0, 0, 1)],
          [4, 0, 3, 7, Js(-1, 0, 0)],
          [1, 5, 6, 2, Js(1, 0, 0)],
          [3, 2, 6, 7, Js(0, 1, 0)],
        ]) {
          let I = [T, E, R, P].map((L, F) =>
            c.v(
              A[L],
              C,
              (0.15 + 0.7 * (F === 1 || F === 2 ? 1 : 0)) / 4,
              (3.2 + 0.6 * (F < 2 ? 1 : 0)) / 4,
              z,
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
    let m = o === "flower" ? 13 : 12,
      g = Math.round((o === "hedge" ? 26 : o === "flower" ? 16 : 22) * a),
      b = Js(0, u * 0.45, 0);
    for (let x = 0; x < g; x++) {
      let y, M;
      if (o === "hedge") {
        let T = Math.floor(l() * 3),
          E = (l() - 0.5) * d;
        if (T === 0)
          ((y = Js((l() - 0.5) * f * 0.9, u * (0.92 + l() * 0.1), E)),
            (M = Js(0, 1, 0)));
        else {
          let R = T === 1 ? 1 : -1;
          ((y = Js(R * f * (0.45 + l() * 0.05), u * (0.1 + l() * 0.8), E)),
            (M = Js(R, 0.2, 0).normalize()));
        }
      } else {
        let T = Js(l() * 2 - 1, l() * 0.9, l() * 2 - 1).normalize();
        ((y = b.clone().add(Js(T.x * f * 0.55, T.y * u * 0.6, T.z * d * 0.55))),
          (M = T));
      }
      let S =
          (o === "hedge" ? 0.62 : o === "flower" ? 0.7 : 0.8) *
          r *
          (0.85 + l() * 0.3),
        w = o === "flower" ? hi.clone() : Mh(M, l).lerp(hi, 0.3).normalize(),
        _ = w.clone().cross(M).normalize(),
        z = y.clone().addScaledVector(w, -S * 0.5),
        A = [];
      for (let T of [0, 1])
        for (let E of [-0.5, 0.5]) {
          let R = z
              .clone()
              .addScaledVector(w, T * S)
              .addScaledVector(_, E * S),
            P = 0.55 + 0.45 * Math.min(1, R.y / u + 0.2);
          A.push(
            h.v(
              R,
              M.clone().lerp(R.clone().sub(b).normalize(), 0.5).normalize(),
              ((m % 4) + 0.02 + 0.96 * (E + 0.5)) / 4,
              ((m >> 2) + 0.99 - 0.98 * T) / 4,
              [P, P, P, 0.6],
            ),
          );
        }
      h.q(A[0], A[1], A[3], A[2]);
    }
    let v = [{ mat: "leaf", geo: h.geo() }];
    if ((c.count && v.unshift({ mat: "shrubcore", geo: c.geo() }), s))
      for (let x of v) x.geo.translate(0, s, 0);
    n.push(v);
  }
  return n;
}
var gn = {
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
  s2 = { mound: 0, clump: 2, mat: 5 };
function n2(o = "mound", t = 21) {
  let e = s2[o],
    s = e % 4,
    n = e >> 2,
    i = (s + 0.008) / 4,
    a = (s + 0.992) / 4,
    r = (n + 0.008) / 4,
    l = (n + 0.992) / 4,
    c = [];
  for (let h of [0, 1, 2]) {
    let f = Sh(t),
      u = new xa(),
      d = (
        g,
        b,
        v,
        x,
        y,
        M,
        {
          u0: S = 0,
          u1: w = 1,
          v0: _ = 0,
          v1: z = 1,
          ao0: A = 0.5,
          tr: T = 0.8,
        } = {},
      ) => {
        let E = [];
        for (let [R, P] of [
          [0, z],
          [0.5, (_ + z) / 2],
          [1, _],
        ])
          for (let C of [-0.5, 0.5]) {
            let I = g
                .clone()
                .addScaledVector(b, C * x)
                .addScaledVector(v, R * y),
              L = b.clone().cross(v).normalize(),
              F = I.clone().sub(M);
            ((F.y = Math.max(F.y, 0) * 1.4 + 0.15), F.normalize());
            let O = L.multiplyScalar(L.dot(F) < 0 ? -0.3 : 0.3)
                .addScaledVector(F, 0.7)
                .normalize(),
              B = A + (1 - A) * Il(0, 0.8, R);
            E.push(
              u.v(I, O, i + (a - i) * (C < 0 ? S : w), r + (l - r) * P, [
                B,
                B,
                1,
                T,
              ]),
            );
          }
        (u.q(E[0], E[1], E[3], E[2]), u.q(E[2], E[3], E[5], E[4]));
      },
      p = Js(0, 0.35, 0),
      m = f() * Math.PI;
    if (o === "mound") {
      let g = [4, 3, 2][h];
      for (let v = 0; v < g; v++) {
        let x = m + (v / g) * Math.PI + (f() - 0.5) * 0.25,
          y = Js(Math.cos(x), 0, Math.sin(x)),
          M = (f() - 0.5) * 0.25,
          S = hi.clone().applyAxisAngle(y, M),
          w = 1.35 + f() * 0.3;
        d(
          Js((f() - 0.5) * 0.15, -0.04, (f() - 0.5) * 0.15),
          y,
          S,
          w,
          w * (0.8 + f() * 0.1),
          p,
          { ao0: 0.45 },
        );
      }
      let b = [6, 3, 0][h];
      for (let v = 0; v < b; v++) {
        let x = m + (v / b) * Math.PI * 2 + f() * 0.5,
          y = Js(Math.cos(x), 0, Math.sin(x)),
          M = Js(-y.z, 0, y.x),
          S = 0.95 + f() * 0.3,
          w = hi
            .clone()
            .multiplyScalar(Math.cos(S))
            .addScaledVector(y, Math.sin(S));
        d(
          Js(0, 0.55 + f() * 0.15, 0).addScaledVector(y, -0.25),
          M,
          w,
          0.95,
          0.8,
          p,
          { v0: 0, v1: 0.75, ao0: 0.7, tr: 1 },
        );
      }
    } else if (o === "clump") {
      let g = [5, 3, 2][h];
      for (let b = 0; b < g; b++) {
        let v = m + (b / g) * Math.PI + (f() - 0.5) * 0.3,
          x = Js(Math.cos(v), 0, Math.sin(v)),
          y = Js(-x.z, 0, x.x).multiplyScalar(f() < 0.5 ? -1 : 1),
          M = b < 2 ? (f() - 0.5) * 0.12 : 0.22 + f() * 0.15,
          S = hi
            .clone()
            .multiplyScalar(Math.cos(M))
            .addScaledVector(y, Math.sin(M));
        d(Js(0, -0.03, 0), x, S, b < 2 ? 1.1 : 0.9, b < 2 ? 1.1 : 0.95, p, {
          ao0: 0.55,
        });
      }
    } else {
      let g = [6, 4, 3][h];
      for (let b = 0; b < g; b++) {
        let v = m + (b / g) * Math.PI * 2 + f() * 0.4,
          x = Js(Math.cos(v), 0, Math.sin(v)),
          y = Js(-x.z, 0, x.x),
          M = 0.9 + f() * 0.35,
          S = hi
            .clone()
            .multiplyScalar(Math.cos(M))
            .addScaledVector(x, Math.sin(M));
        d(
          x.clone().multiplyScalar(-0.2).setY(0.02),
          y,
          S,
          1.5,
          0.95,
          Js(0, -0.3, 0),
          { ao0: 0.7, tr: 0.6 },
        );
      }
    }
    c.push([{ mat: "shrubleaf", geo: u.geo() }]);
  }
  return c;
}
