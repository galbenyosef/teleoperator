// app 239 — math
// Lines 123608-123873 of readable/app.pretty.js (statement-aligned).
function Yw(
  o = 5,
  {
    H: t = 15.5,
    nF: e = 34,
    leaf: s = 2,
    pet: n = 1.2,
    skirt: i = 1.6,
    r0: a = 0.26,
    cell: r = "fan",
    bark: l = null,
    bend: c = 0.5,
  } = {},
) {
  let h = [];
  for (let [f, [u, d, p, m]] of [
    [1, 4, 10, 1],
    [0.6, 3, 7, 1.15],
    [0.38, 2, 5, 1.35],
  ].entries()) {
    let g = Sh(o),
      b = new xa(),
      v = new xa(),
      x = new xa(),
      y = Mh(hi, g).multiplyScalar(c),
      M = (P) => Js(y.x * (P / t) ** 2, P, y.z * (P / t) ** 2),
      S = [],
      w = [];
    for (let P = 0; P <= 14; P++) {
      let C = (P / 14) * (t - 1.2);
      (S.push(M(C)),
        w.push(a * (0.95 + 0.85 * Math.exp(-C / 0.8)) - 0.02 * (C / t)));
    }
    (od(b, id(S), id(w), p, {
      texW: 0.8,
      texH: 1.1,
      ao: (P) => 0.7 + 0.3 * Il(0, 1.5, id(S)[P].y),
    }),
      l && Jw(b, l));
    let _ = [],
      z = [];
    for (let P = 0; P <= 5; P++) {
      let C = P / 5,
        I = t - 1.4 - Math.max(0, i * 0.3) + C * (1.7 + Math.max(0, i * 0.3));
      (_.push(M(I)), z.push(a * (1.05 + 0.5 * Math.sin(C * Math.PI * 0.9))));
    }
    (od(v, _, z, p, {
      texW: 0.6,
      texH: 0.5,
      cap: !0,
      ao: (P) => 0.6 + (0.15 * P) / 5,
    }),
      Jw(v, [0.7, 0.62, 0.55]));
    let A = M(t),
      T = A.clone().add(Js(0, 0.3, 0)),
      E = e2[r];
    for (let P = 0; P < e; P++) {
      let C = (P + 0.5) / e,
        I = P * 2.39996 + (g() - 0.5) * 0.4,
        L = g(),
        F = g(),
        O = g();
      if (!sI(P, u)) continue;
      let B = ((58 - 100 * C + (L - 0.5) * 18) * Math.PI) / 180,
        H = Js(Math.cos(I), 0, Math.sin(I)),
        N = H.clone()
          .multiplyScalar(Math.cos(B))
          .addScaledVector(hi, Math.sin(B)),
        D = H.clone()
          .cross(hi)
          .normalize()
          .applyAxisAngle(N, (F - 0.5) * 0.9),
        U = s * (0.85 + O * 0.3) * m,
        G = A.clone()
          .addScaledVector(H, 0.1)
          .addScaledVector(hi, -0.35 * C),
        W = n * (0.8 + L * 0.4),
        V = G.clone()
          .addScaledVector(N, W)
          .addScaledVector(hi, -0.05 * W * C),
        $ = E[0] + E[2] * 0.5,
        J = E[1] + E[3] * 0.985,
        X = [0.55, 0.5, 0.42, 0.3];
      for (let Z of [D, D.clone().cross(N).normalize()]) {
        let q = x.v(G.clone().addScaledVector(Z, -0.045), N, $ - 0.002, J, X),
          j = x.v(G.clone().addScaledVector(Z, 0.045), N, $ + 0.002, J, X),
          K = x.v(
            V.clone().addScaledVector(Z, 0.025),
            N,
            $ + 0.002,
            J - 0.004,
            X,
          ),
          nt = x.v(
            V.clone().addScaledVector(Z, -0.025),
            N,
            $ - 0.002,
            J - 0.004,
            X,
          );
        x.q(q, j, K, nt);
      }
      let tt = N.clone()
        .lerp(hi, 0.5 - 0.3 * C)
        .normalize();
      QL(x, {
        S: V.addScaledVector(N, -0.12 * U),
        Fu: tt,
        Fx: D,
        len: U,
        wid: U,
        uv: E,
        C: T,
        nu: d,
        nx: d * 2,
        sag: 0.2 + 0.25 * C,
        cup: 0.3,
        droop: 0.3,
        pleat: 0.05,
        ao: (Z) => (0.5 + 0.5 * Z) * (0.7 + 0.3 * (1 - C)),
        tr: 0.7,
      });
    }
    let R = Math.round(i * (f ? 5 : 9));
    for (let P = 0; P < R; P++) {
      let C = P * 2.39996 + g() * 0.3,
        I = Js(Math.cos(C), 0, Math.sin(C)),
        L = t - 0.5 - (P / Math.max(1, R)) * i * 0.6 - g() * 0.3,
        F = I.clone().multiplyScalar(0.22).addScaledVector(hi, -1).normalize(),
        O = I.clone().cross(hi).normalize(),
        B = 0.5 + 0.2 * g();
      QL(x, {
        S: M(L).addScaledVector(I, a * 1.4),
        Fu: F,
        Fx: O,
        len: (1.2 + g() * 0.5) * m,
        wid: 1.2 * m,
        uv: e2.dead,
        C: T,
        nu: 2,
        nx: 2,
        sag: -0.05,
        cup: 0.12,
        ao: () => B,
        tr: 0.05,
      });
    }
    h.push([
      { mat: "bark_fan", geo: b.geo() },
      { mat: "bark_head", geo: v.geo() },
      { mat: "fanleaf", geo: x.geo() },
    ]);
  }
  return ((h.top = t), h);
}
function iJ(o = 11, { H: t = 4.2, branches: e = 3 } = {}) {
  let s = [];
  for (let [n, [i, a]] of [
    [6, 7],
    [4, 5],
    [3, 4],
  ].entries()) {
    let r = Sh(o),
      l = new xa(),
      c = new xa(),
      h = t * (0.4 + r() * 0.15),
      f = [Js(0, 0, 0), Js(0.05, h * 0.5, 0.03), Js(0.08, h, 0.05)];
    od(l, f, [0.2, 0.15, 0.13], a, { texW: 0.5, texH: 0.8 });
    let u = Js(0, t * 0.8, 0);
    for (let d = 0; d < e; d++) {
      let p = d * 2.39996 + r() * 0.5,
        m = Js(Math.cos(p), 0, Math.sin(p)),
        g = t - h + (r() - 0.5) * 0.8,
        b = f[2]
          .clone()
          .addScaledVector(m, g * (0.35 + r() * 0.2))
          .add(Js(0, g, 0)),
        v = f[2].clone().lerp(b, 0.5).addScaledVector(m, -0.15);
      od(l, ZL(f[2], v, b, 4), [0.11, 0.1, 0.09, 0.08, 0.07], a, {
        texW: 0.4,
        texH: 0.8,
      });
      for (let x = 0; x < i; x++) {
        let y = p + (x / i) * Math.PI,
          M = Js(Math.cos(y), 0, Math.sin(y)),
          S = x % 2 ? 0.35 : -0.2,
          w = hi.clone().applyAxisAngle(M, S).normalize();
        QL(c, {
          S: b.clone().addScaledVector(w, -0.45),
          Fu: w,
          Fx: M,
          len: 1.5,
          wid: 1.5,
          uv: e2.cordy,
          C: u,
          nu: 2,
          nx: 2,
          sag: 0.05,
          cup: 0,
          ao: (_) => 0.6 + 0.4 * _,
          tr: 0.6,
        });
      }
    }
    (Jw(l, [0.75, 0.68, 0.6]),
      s.push([
        { mat: "bark_fan", geo: l.geo() },
        { mat: "fanleaf", geo: c.geo() },
      ]));
  }
  return ((s.top = t), s);
}
var nI = {
  palm: [
    (o) => JL(3, { H: 9.6 }),
    (o) =>
      JL(17, { H: 11.6, nF: 120, crown: 1.05, droop: 1.1, dead: 1, bend: 0.5 }),
    (o) =>
      JL(29, {
        H: 8.2,
        nF: 104,
        crown: 0.95,
        droop: 0.9,
        dead: 5,
        kh: 1.7,
        r0: 0.55,
      }),
  ],
  fpalm: [
    (o) => Yw(5, { H: 15.5 }),
    (o) => Yw(23, { H: 18.5, nF: 26, skirt: 0.3, r0: 0.24, bend: 0.8 }),
    (o) => Yw(41, { H: 13, nF: 32, skirt: 3.2, r0: 0.28 }),
  ],
  qpalm: [
    (o) => nJ(7, { H: 9.5 }),
    (o) => nJ(19, { H: 11.5, nF: 13, crown: 1.1, dead: 1, shaft: 0 }),
  ],
  wpalm: [
    (o) =>
      Yw(31, {
        H: 5.5,
        nF: 20,
        leaf: 1.3,
        skirt: 0.8,
        r0: 0.15,
        cell: "windmill",
        bark: [0.62, 0.5, 0.4],
        bend: 0.2,
      }),
    (o) =>
      Yw(37, {
        H: 3.6,
        nF: 16,
        leaf: 1.2,
        skirt: 0.4,
        r0: 0.17,
        cell: "windmill",
        bark: [0.6, 0.48, 0.38],
        bend: 0.1,
      }),
  ],
  cordyline: [
    (o) => iJ(11, { H: 4.2, branches: 3 }),
    (o) => iJ(13, { H: 5.5, branches: 4 }),
  ],
};
