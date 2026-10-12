// app 240 — math
// Lines 123351-123616 of readable/app.pretty.js (statement-aligned).
function ew(
  i = 5,
  {
    H: t = 15.5,
    nF: e = 34,
    leaf: s = 2,
    pet: n = 1.2,
    skirt: o = 1.6,
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
    let g = $c(i),
      b = new la(),
      x = new la(),
      v = new la(),
      y = Vc(oi, g).multiplyScalar(c),
      M = (C) => Vs(y.x * (C / t) ** 2, C, y.z * (C / t) ** 2),
      S = [],
      w = [];
    for (let C = 0; C <= 14; C++) {
      let P = (C / 14) * (t - 1.2);
      (S.push(M(P)),
        w.push(a * (0.95 + 0.85 * Math.exp(-P / 0.8)) - 0.02 * (P / t)));
    }
    (ku(b, Su(S), Su(w), p, {
      texW: 0.8,
      texH: 1.1,
      ao: (C) => 0.7 + 0.3 * ul(0, 1.5, Su(S)[C].y),
    }),
      l && sw(b, l));
    let z = [],
      _ = [];
    for (let C = 0; C <= 5; C++) {
      let P = C / 5,
        I = t - 1.4 - Math.max(0, o * 0.3) + P * (1.7 + Math.max(0, o * 0.3));
      (z.push(M(I)), _.push(a * (1.05 + 0.5 * Math.sin(P * Math.PI * 0.9))));
    }
    (ku(x, z, _, p, {
      texW: 0.6,
      texH: 0.5,
      cap: !0,
      ao: (C) => 0.6 + (0.15 * C) / 5,
    }),
      sw(x, [0.7, 0.62, 0.55]));
    let R = M(t),
      T = R.clone().add(Vs(0, 0.3, 0)),
      E = um[r];
    for (let C = 0; C < e; C++) {
      let P = (C + 0.5) / e,
        I = C * 2.39996 + (g() - 0.5) * 0.4,
        L = g(),
        F = g(),
        N = g();
      if (!zC(C, u)) continue;
      let B = ((58 - 100 * P + (L - 0.5) * 18) * Math.PI) / 180,
        H = Vs(Math.cos(I), 0, Math.sin(I)),
        O = H.clone()
          .multiplyScalar(Math.cos(B))
          .addScaledVector(oi, Math.sin(B)),
        D = H.clone()
          .cross(oi)
          .normalize()
          .applyAxisAngle(O, (F - 0.5) * 0.9),
        U = s * (0.85 + N * 0.3) * m,
        G = R.clone()
          .addScaledVector(H, 0.1)
          .addScaledVector(oi, -0.35 * P),
        q = n * (0.8 + L * 0.4),
        W = G.clone()
          .addScaledVector(O, q)
          .addScaledVector(oi, -0.05 * q * P),
        V = E[0] + E[2] * 0.5,
        Y = E[1] + E[3] * 0.985,
        $ = [0.55, 0.5, 0.42, 0.3];
      for (let Q of [D, D.clone().cross(O).normalize()]) {
        let j = v.v(G.clone().addScaledVector(Q, -0.045), O, V - 0.002, Y, $),
          X = v.v(G.clone().addScaledVector(Q, 0.045), O, V + 0.002, Y, $),
          K = v.v(
            W.clone().addScaledVector(Q, 0.025),
            O,
            V + 0.002,
            Y - 0.004,
            $,
          ),
          nt = v.v(
            W.clone().addScaledVector(Q, -0.025),
            O,
            V - 0.002,
            Y - 0.004,
            $,
          );
        v.q(j, X, K, nt);
      }
      let st = O.clone()
        .lerp(oi, 0.5 - 0.3 * P)
        .normalize();
      SC(v, {
        S: W.addScaledVector(O, -0.12 * U),
        Fu: st,
        Fx: D,
        len: U,
        wid: U,
        uv: E,
        C: T,
        nu: d,
        nx: d * 2,
        sag: 0.2 + 0.25 * P,
        cup: 0.3,
        droop: 0.3,
        pleat: 0.05,
        ao: (Q) => (0.5 + 0.5 * Q) * (0.7 + 0.3 * (1 - P)),
        tr: 0.7,
      });
    }
    let A = Math.round(o * (f ? 5 : 9));
    for (let C = 0; C < A; C++) {
      let P = C * 2.39996 + g() * 0.3,
        I = Vs(Math.cos(P), 0, Math.sin(P)),
        L = t - 0.5 - (C / Math.max(1, A)) * o * 0.6 - g() * 0.3,
        F = I.clone().multiplyScalar(0.22).addScaledVector(oi, -1).normalize(),
        N = I.clone().cross(oi).normalize(),
        B = 0.5 + 0.2 * g();
      SC(v, {
        S: M(L).addScaledVector(I, a * 1.4),
        Fu: F,
        Fx: N,
        len: (1.2 + g() * 0.5) * m,
        wid: 1.2 * m,
        uv: um.dead,
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
      { mat: "bark_head", geo: x.geo() },
      { mat: "fanleaf", geo: v.geo() },
    ]);
  }
  return ((h.top = t), h);
}
function eK(i = 11, { H: t = 4.2, branches: e = 3 } = {}) {
  let s = [];
  for (let [n, [o, a]] of [
    [6, 7],
    [4, 5],
    [3, 4],
  ].entries()) {
    let r = $c(i),
      l = new la(),
      c = new la(),
      h = t * (0.4 + r() * 0.15),
      f = [Vs(0, 0, 0), Vs(0.05, h * 0.5, 0.03), Vs(0.08, h, 0.05)];
    ku(l, f, [0.2, 0.15, 0.13], a, { texW: 0.5, texH: 0.8 });
    let u = Vs(0, t * 0.8, 0);
    for (let d = 0; d < e; d++) {
      let p = d * 2.39996 + r() * 0.5,
        m = Vs(Math.cos(p), 0, Math.sin(p)),
        g = t - h + (r() - 0.5) * 0.8,
        b = f[2]
          .clone()
          .addScaledVector(m, g * (0.35 + r() * 0.2))
          .add(Vs(0, g, 0)),
        x = f[2].clone().lerp(b, 0.5).addScaledVector(m, -0.15);
      ku(l, MC(f[2], x, b, 4), [0.11, 0.1, 0.09, 0.08, 0.07], a, {
        texW: 0.4,
        texH: 0.8,
      });
      for (let v = 0; v < o; v++) {
        let y = p + (v / o) * Math.PI,
          M = Vs(Math.cos(y), 0, Math.sin(y)),
          S = v % 2 ? 0.35 : -0.2,
          w = oi.clone().applyAxisAngle(M, S).normalize();
        SC(c, {
          S: b.clone().addScaledVector(w, -0.45),
          Fu: w,
          Fx: M,
          len: 1.5,
          wid: 1.5,
          uv: um.cordy,
          C: u,
          nu: 2,
          nx: 2,
          sag: 0.05,
          cup: 0,
          ao: (z) => 0.6 + 0.4 * z,
          tr: 0.6,
        });
      }
    }
    (sw(l, [0.75, 0.68, 0.6]),
      s.push([
        { mat: "bark_fan", geo: l.geo() },
        { mat: "fanleaf", geo: c.geo() },
      ]));
  }
  return ((s.top = t), s);
}
var EC = {
  palm: [
    (i) => wC(3, { H: 9.6 }),
    (i) =>
      wC(17, { H: 11.6, nF: 120, crown: 1.05, droop: 1.1, dead: 1, bend: 0.5 }),
    (i) =>
      wC(29, {
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
    (i) => ew(5, { H: 15.5 }),
    (i) => ew(23, { H: 18.5, nF: 26, skirt: 0.3, r0: 0.24, bend: 0.8 }),
    (i) => ew(41, { H: 13, nF: 32, skirt: 3.2, r0: 0.28 }),
  ],
  qpalm: [
    (i) => tK(7, { H: 9.5 }),
    (i) => tK(19, { H: 11.5, nF: 13, crown: 1.1, dead: 1, shaft: 0 }),
  ],
  wpalm: [
    (i) =>
      ew(31, {
        H: 5.5,
        nF: 20,
        leaf: 1.3,
        skirt: 0.8,
        r0: 0.15,
        cell: "windmill",
        bark: [0.62, 0.5, 0.4],
        bend: 0.2,
      }),
    (i) =>
      ew(37, {
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
    (i) => eK(11, { H: 4.2, branches: 3 }),
    (i) => eK(13, { H: 5.5, branches: 4 }),
  ],
};
