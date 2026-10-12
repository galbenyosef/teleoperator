// app 239 — math
// Lines 123122-123350 of readable/app.pretty.js (statement-aligned).
function wC(
  i = 3,
  {
    H: t = 8.6,
    nF: e = 112,
    crown: s = 1,
    droop: n = 1,
    dead: o = 3,
    bend: a = 0.35,
    kh: r = 1.5,
    r0: l = 0.5,
  } = {},
) {
  let c = [];
  for (let [h, [f, u, d, p]] of [
    [1, 8, 14, 1],
    [0.6, 5, 9, 1.38],
    [0.32, 3, 6, 2.2],
  ].entries()) {
    let m = $c(i),
      g = new la(),
      b = new la(),
      x = new la(),
      v = Vc(oi, m).multiplyScalar(a),
      y = Vc(oi, m).multiplyScalar(0.12),
      M = (A) =>
        Vs(
          v.x * (A / t) ** 2 + y.x * Math.sin((A / t) * Math.PI),
          A,
          v.z * (A / t) ** 2 + y.z * Math.sin((A / t) * Math.PI),
        ),
      S = [],
      w = [];
    for (let A = 0; A <= 12; A++) {
      let C = (A / 12) * (t + 0.1);
      (S.push(M(C)),
        w.push(l * (1 + 0.32 * Math.exp(-C / 0.55)) * (1 - (0.05 * C) / t)));
    }
    ku(g, Su(S), Su(w), d, {
      texW: 1,
      texH: 0.95,
      ao: (A) => 0.62 + 0.38 * ul(0, 1.8, Su(S)[A].y),
    });
    let z = [],
      _ = [],
      R = (A) =>
        l *
        (1.02 + 0.42 * Math.sin(Math.PI * Math.min(1, A * 1.15)) ** 0.8) *
        (A > 0.8 ? 1 - (A - 0.8) * 3.2 : 1);
    for (let A = 0; A <= 8; A++) {
      let C = A / 8;
      (z.push(M(t + C * r)), _.push(Math.max(0.12, R(C))));
    }
    ku(b, z, _, d, {
      texW: 0.75,
      texH: 0.5,
      cap: !0,
      ao: (A) => 0.55 + 0.4 * (A / 8),
    });
    let T = M(t + r * 0.9).add(Vs(0, 0.2, 0)),
      E = (A) => (C) =>
        (0.3 + 0.7 * ul(0, 0.45, C)) * (0.5 + 0.5 * (1 - A) ** 0.7);
    for (let A = 0; A < e; A++) {
      let C = (A + 0.5) / e,
        P = A * 2.39996 + (m() - 0.5) * 0.35,
        I = m(),
        L = m(),
        F = m(),
        N = m(),
        B = m();
      if (!zC(A, f)) continue;
      let H = Vs(Math.cos(P), 0, Math.sin(P)),
        O = ((68 - 82 * Math.pow(C, 0.85) + (I - 0.5) * 16) * Math.PI) / 180,
        D = ((28 + 82 * Math.pow(C, 1.5) + L * 22) * n * Math.PI) / 180,
        U = (5 + F * 1.2) * s * (0.7 + 0.3 * Math.min(1, C * 3)),
        G = M(t + r * (0.62 + 0.36 * (1 - C))).addScaledVector(
          H,
          R(0.62 + 0.36 * (1 - C)) * 0.85,
        );
      Vk(x, {
        S: G,
        hd: H,
        el: O,
        bend: D,
        L: U,
        W: U * 0.165 * p,
        seg: u,
        fold: 0.38 + N * 0.14,
        twist: (B - 0.5) * 0.9,
        C: T,
        uv: um.canary,
        ao: E(C),
      });
    }
    for (let A = 0; A < o; A++) {
      let C = A * 2.39996 * 1.7 + m() * 0.5,
        P = Vs(Math.cos(C), 0, Math.sin(C)),
        I = m(),
        L = m();
      if (h === 2 && A % 2) continue;
      let F = M(t + r * 0.35).addScaledVector(P, l * 1.3);
      Vk(x, {
        S: F,
        hd: P,
        el: ((-48 - I * 24) * Math.PI) / 180,
        bend: ((12 + L * 18) * Math.PI) / 180,
        L: 3.6 + I * 0.8,
        W: 0.75 * p,
        seg: Math.max(2, u - 3),
        fold: 0.25,
        twist: (L - 0.5) * 0.6,
        C: T,
        uv: um.canary,
        ao: () => 0.85,
        dead: !0,
      });
    }
    c.push([
      { mat: "bark_palm", geo: g.geo() },
      { mat: "bark_head", geo: b.geo() },
      { mat: "frond", geo: x.geo() },
    ]);
  }
  return ((c.top = t + r), c);
}
function tK(
  i = 7,
  {
    H: t = 9.5,
    nF: e = 19,
    crown: s = 1,
    dead: n = 2,
    shaft: o = 0,
    r0: a = 0.2,
  } = {},
) {
  let r = [];
  for (let [l, [c, h, f, u]] of [
    [1, 8, 10, 1],
    [0.6, 5, 7, 1.25],
    [0.35, 3, 5, 1.6],
  ].entries()) {
    let d = $c(i),
      p = new la(),
      m = new la(),
      g = Vc(oi, d).multiplyScalar(0.3),
      b = (S) => Vs(g.x * (S / t) ** 2, S, g.z * (S / t) ** 2),
      x = [],
      v = [];
    for (let S = 0; S <= 10; S++) {
      let w = (S / 10) * t;
      (x.push(b(w)),
        v.push(
          a *
            (1 +
              0.45 * Math.exp(-w / 0.5) +
              0.12 * Math.sin((w / t) * Math.PI)),
        ));
    }
    if (
      (ku(p, Su(x), Su(v), f, {
        texW: 0.7,
        texH: 2.2,
        ao: (S) => 0.7 + 0.3 * ul(0, 1.5, Su(x)[S].y),
      }),
      sw(p, [1.25, 1.22, 1.18]),
      o)
    ) {
      let S = p.count,
        w = [b(t), b(t + o)];
      (ku(p, w, [a * 1.15, a * 0.9], f, { texW: 0.7, texH: 3, cap: !0 }),
        sw(p, [0.42, 0.6, 0.3], S));
    }
    let y = b(t + o),
      M = y.clone().add(Vs(0, 0.4, 0));
    for (let S = 0; S < e; S++) {
      let w = (S + 0.5) / e,
        z = S * 2.39996 + (d() - 0.5) * 0.4,
        _ = d(),
        R = d(),
        T = d(),
        E = d();
      if (!zC(S, c)) continue;
      let A = Vs(Math.cos(z), 0, Math.sin(z)),
        C = (3.8 + T * 1) * s * (0.8 + 0.2 * Math.min(1, w * 3));
      Vk(m, {
        S: y
          .clone()
          .addScaledVector(A, 0.15)
          .addScaledVector(oi, 0.25 - 0.4 * w),
        hd: A,
        el: ((72 - 72 * w + (_ - 0.5) * 14) * Math.PI) / 180,
        bend: ((55 + 75 * w + R * 25) * Math.PI) / 180,
        L: C,
        W: C * 0.2 * u,
        seg: h,
        fold: -0.55,
        twist: (E - 0.5) * 0.8,
        C: M,
        uv: um.queen,
        ao: (P) => (0.5 + 0.5 * ul(0, 0.35, P)) * (0.7 + 0.3 * (1 - w)),
        plume: l < 2,
      });
    }
    for (let S = 0; S < n; S++) {
      let w = 1.1 + S * 2.6,
        z = Vs(Math.cos(w), 0, Math.sin(w));
      Vk(m, {
        S: y.clone().addScaledVector(z, 0.2).addScaledVector(oi, -0.3),
        hd: z,
        el: -1.1,
        bend: 0.25,
        L: 2.8,
        W: 0.8 * u,
        seg: Math.max(2, h - 4),
        fold: 0.1,
        C: M,
        uv: um.queen,
        ao: () => 0.8,
        dead: !0,
      });
    }
    r.push([
      { mat: "bark_fan", geo: p.geo() },
      { mat: "frond", geo: m.geo() },
    ]);
  }
  return ((r.top = t + o), r);
}
