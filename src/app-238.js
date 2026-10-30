// app 238 — math
// Lines 123379-123607 of readable/app.pretty.js (statement-aligned).
function JL(
  o = 3,
  {
    H: t = 8.6,
    nF: e = 112,
    crown: s = 1,
    droop: n = 1,
    dead: i = 3,
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
    let m = Sh(o),
      g = new xa(),
      b = new xa(),
      v = new xa(),
      x = Mh(hi, m).multiplyScalar(a),
      y = Mh(hi, m).multiplyScalar(0.12),
      M = (R) =>
        Js(
          x.x * (R / t) ** 2 + y.x * Math.sin((R / t) * Math.PI),
          R,
          x.z * (R / t) ** 2 + y.z * Math.sin((R / t) * Math.PI),
        ),
      S = [],
      w = [];
    for (let R = 0; R <= 12; R++) {
      let P = (R / 12) * (t + 0.1);
      (S.push(M(P)),
        w.push(l * (1 + 0.32 * Math.exp(-P / 0.55)) * (1 - (0.05 * P) / t)));
    }
    od(g, id(S), id(w), d, {
      texW: 1,
      texH: 0.95,
      ao: (R) => 0.62 + 0.38 * Il(0, 1.8, id(S)[R].y),
    });
    let _ = [],
      z = [],
      A = (R) =>
        l *
        (1.02 + 0.42 * Math.sin(Math.PI * Math.min(1, R * 1.15)) ** 0.8) *
        (R > 0.8 ? 1 - (R - 0.8) * 3.2 : 1);
    for (let R = 0; R <= 8; R++) {
      let P = R / 8;
      (_.push(M(t + P * r)), z.push(Math.max(0.12, A(P))));
    }
    od(b, _, z, d, {
      texW: 0.75,
      texH: 0.5,
      cap: !0,
      ao: (R) => 0.55 + 0.4 * (R / 8),
    });
    let T = M(t + r * 0.9).add(Js(0, 0.2, 0)),
      E = (R) => (P) =>
        (0.3 + 0.7 * Il(0, 0.45, P)) * (0.5 + 0.5 * (1 - R) ** 0.7);
    for (let R = 0; R < e; R++) {
      let P = (R + 0.5) / e,
        C = R * 2.39996 + (m() - 0.5) * 0.35,
        I = m(),
        L = m(),
        F = m(),
        O = m(),
        B = m();
      if (!sI(R, f)) continue;
      let H = Js(Math.cos(C), 0, Math.sin(C)),
        N = ((68 - 82 * Math.pow(P, 0.85) + (I - 0.5) * 16) * Math.PI) / 180,
        D = ((28 + 82 * Math.pow(P, 1.5) + L * 22) * n * Math.PI) / 180,
        U = (5 + F * 1.2) * s * (0.7 + 0.3 * Math.min(1, P * 3)),
        G = M(t + r * (0.62 + 0.36 * (1 - P))).addScaledVector(
          H,
          A(0.62 + 0.36 * (1 - P)) * 0.85,
        );
      jz(v, {
        S: G,
        hd: H,
        el: N,
        bend: D,
        L: U,
        W: U * 0.165 * p,
        seg: u,
        fold: 0.38 + O * 0.14,
        twist: (B - 0.5) * 0.9,
        C: T,
        uv: e2.canary,
        ao: E(P),
      });
    }
    for (let R = 0; R < i; R++) {
      let P = R * 2.39996 * 1.7 + m() * 0.5,
        C = Js(Math.cos(P), 0, Math.sin(P)),
        I = m(),
        L = m();
      if (h === 2 && R % 2) continue;
      let F = M(t + r * 0.35).addScaledVector(C, l * 1.3);
      jz(v, {
        S: F,
        hd: C,
        el: ((-48 - I * 24) * Math.PI) / 180,
        bend: ((12 + L * 18) * Math.PI) / 180,
        L: 3.6 + I * 0.8,
        W: 0.75 * p,
        seg: Math.max(2, u - 3),
        fold: 0.25,
        twist: (L - 0.5) * 0.6,
        C: T,
        uv: e2.canary,
        ao: () => 0.85,
        dead: !0,
      });
    }
    c.push([
      { mat: "bark_palm", geo: g.geo() },
      { mat: "bark_head", geo: b.geo() },
      { mat: "frond", geo: v.geo() },
    ]);
  }
  return ((c.top = t + r), c);
}
function nJ(
  o = 7,
  {
    H: t = 9.5,
    nF: e = 19,
    crown: s = 1,
    dead: n = 2,
    shaft: i = 0,
    r0: a = 0.2,
  } = {},
) {
  let r = [];
  for (let [l, [c, h, f, u]] of [
    [1, 8, 10, 1],
    [0.6, 5, 7, 1.25],
    [0.35, 3, 5, 1.6],
  ].entries()) {
    let d = Sh(o),
      p = new xa(),
      m = new xa(),
      g = Mh(hi, d).multiplyScalar(0.3),
      b = (S) => Js(g.x * (S / t) ** 2, S, g.z * (S / t) ** 2),
      v = [],
      x = [];
    for (let S = 0; S <= 10; S++) {
      let w = (S / 10) * t;
      (v.push(b(w)),
        x.push(
          a *
            (1 +
              0.45 * Math.exp(-w / 0.5) +
              0.12 * Math.sin((w / t) * Math.PI)),
        ));
    }
    if (
      (od(p, id(v), id(x), f, {
        texW: 0.7,
        texH: 2.2,
        ao: (S) => 0.7 + 0.3 * Il(0, 1.5, id(v)[S].y),
      }),
      Jw(p, [1.25, 1.22, 1.18]),
      i)
    ) {
      let S = p.count,
        w = [b(t), b(t + i)];
      (od(p, w, [a * 1.15, a * 0.9], f, { texW: 0.7, texH: 3, cap: !0 }),
        Jw(p, [0.42, 0.6, 0.3], S));
    }
    let y = b(t + i),
      M = y.clone().add(Js(0, 0.4, 0));
    for (let S = 0; S < e; S++) {
      let w = (S + 0.5) / e,
        _ = S * 2.39996 + (d() - 0.5) * 0.4,
        z = d(),
        A = d(),
        T = d(),
        E = d();
      if (!sI(S, c)) continue;
      let R = Js(Math.cos(_), 0, Math.sin(_)),
        P = (3.8 + T * 1) * s * (0.8 + 0.2 * Math.min(1, w * 3));
      jz(m, {
        S: y
          .clone()
          .addScaledVector(R, 0.15)
          .addScaledVector(hi, 0.25 - 0.4 * w),
        hd: R,
        el: ((72 - 72 * w + (z - 0.5) * 14) * Math.PI) / 180,
        bend: ((55 + 75 * w + A * 25) * Math.PI) / 180,
        L: P,
        W: P * 0.2 * u,
        seg: h,
        fold: -0.55,
        twist: (E - 0.5) * 0.8,
        C: M,
        uv: e2.queen,
        ao: (C) => (0.5 + 0.5 * Il(0, 0.35, C)) * (0.7 + 0.3 * (1 - w)),
        plume: l < 2,
      });
    }
    for (let S = 0; S < n; S++) {
      let w = 1.1 + S * 2.6,
        _ = Js(Math.cos(w), 0, Math.sin(w));
      jz(m, {
        S: y.clone().addScaledVector(_, 0.2).addScaledVector(hi, -0.3),
        hd: _,
        el: -1.1,
        bend: 0.25,
        L: 2.8,
        W: 0.8 * u,
        seg: Math.max(2, h - 4),
        fold: 0.1,
        C: M,
        uv: e2.queen,
        ao: () => 0.8,
        dead: !0,
      });
    }
    r.push([
      { mat: "bark_fan", geo: p.geo() },
      { mat: "frond", geo: m.geo() },
    ]);
  }
  return ((r.top = t + i), r);
}
