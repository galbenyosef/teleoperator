// app 128 — math
// Lines 87786-88132 of readable/app.pretty.js (statement-aligned).
Pn();
function oC(o, t) {
  let e = new Be(),
    s = he[10],
    n = ps[10].hw,
    i = ps[10].sw,
    a = pe[18] - ns[18].hw - 7.5,
    r = $t(s, a),
    l = n + 0.45,
    c = n + i - 0.4;
  Vu(o, (S, w) => Math.abs(S - s) < n + i + 0.5 && Math.abs(w - a) < 7);
  let h = We(we.polgranite, 0.8),
    f = Lt(Ct.gloss, 0.45, 0.03, 0.02),
    u = We(we.redbeam, 1),
    d = We(we.greentile, 0.9),
    p = Lt(Ct.gold, 0.55, 0.38, 0.1),
    m = Lt(Ct.gloss, 0.05, 0.3, 0.14),
    g = [];
  for (let S of [-1, 1]) for (let w of [l, c]) g.push(s + S * w);
  for (let S of g) {
    let w = $t(S, a) + Ze,
      _ = Math.abs(S - s) < n + 1,
      z = r + (_ ? 7.4 : 5.2);
    (ss(e, S - 0.55, w - 0.3, a - 0.55, S + 0.55, w + 1.1, a + 0.55, h),
      ss(e, S - 0.38, w + 1.1, a - 0.38, S + 0.38, z, a + 0.38, f),
      o.colliders.push({ t: "circ", x: S, z: a, r: 0.6 }));
  }
  let b = (S, w, _, z, A, T) => {
    let P = a;
    for (let C of [-1, 1]) {
      let I = [];
      for (let F = 0; F <= 3; F++) {
        let O = [],
          B = F / 3;
        for (let H = 0; H <= 8; H++) {
          let N = H / 8,
            D = S + (w - S) * N,
            U = T * Math.pow(Math.abs(N - 0.5) * 2, 4) * (1 - B),
            G = _ + z * (1 - Math.pow(1 - B, 1.6)) + U;
          O.push([
            D + (N - 0.5) * 2 * T * 0.6 * (1 - B),
            G,
            P + C * A * (1 - B),
          ]);
        }
        I.push(C < 0 ? O.slice().reverse() : O);
      }
      let L = I;
      for (let F = 0; F < 3; F++)
        for (let O = 0; O < 8; O++)
          oe(
            e,
            [L[F][O], L[F][O + 1], L[F + 1][O + 1], L[F + 1][O]],
            d,
            [0, 1, C * 0.5],
            (B) => [B[0] * 1, B[1] + Math.abs(B[2] - P)],
          );
      oe(
        e,
        [L[0][0], L[0][8], [w, _ - 0.15, P], [S, _ - 0.15, P]],
        f,
        [0, -1, 0],
      );
    }
    return (
      ss(e, S + 0.3, _ + z - 0.1, a - 0.2, w - 0.3, _ + z + 0.45, a + 0.2, d),
      _ + z + 0.45
    );
  };
  {
    let S = s - l - 0.6,
      w = s + l + 0.6,
      _ = r + 7.4;
    (ss(e, S, _ - 1.4, a - 0.45, w, _ - 0.6, a + 0.45, u),
      ss(e, S, _ - 0.6, a - 0.55, w, _ + 0.1, a + 0.55, f));
    for (let A = 0; A < 13; A++) {
      let T = S + 0.4 + (A * (w - S - 0.8)) / 12;
      ss(
        e,
        T - 0.18,
        _ + 0.1,
        a - 0.7,
        T + 0.18,
        _ + 0.55,
        a + 0.7,
        A % 2 ? d : u,
      );
    }
    for (let A of [-1, 1]) {
      let T = a + A * 0.62;
      (ss(e, s - 1.25, _ - 1.5, T - 0.07, s + 1.25, _ + 1, T + 0.07, p),
        oe(
          e,
          [
            [s - 1.08, _ - 1.33, T + A * 0.16],
            [s + 1.08, _ - 1.33, T + A * 0.16],
            [s + 1.08, _ + 0.83, T + A * 0.16],
            [s - 1.08, _ + 0.83, T + A * 0.16],
          ],
          Lt(Ct.gloss, 0.3, 0.015, 0.012),
          [0, 0, A],
        ));
      for (let E = 0; E < 4; E++) {
        let R = _ + 0.45 - E * 0.52;
        ss(
          e,
          s - 0.2,
          R - 0.2,
          T + A * 0.21 - 0.03,
          s + 0.2,
          R + 0.2,
          T + A * 0.21 + 0.03,
          p,
        );
      }
    }
    for (let A of [-1, 1])
      for (let T = 0; T < 5; T++) {
        let E = S + 0.8 + (T * (w - S - 1.6)) / 4;
        ss(
          e,
          E - 0.12,
          _ + 0.35,
          a + A * 1.9 - 0.12,
          E + 0.12,
          _ + 0.55,
          a + A * 1.9 + 0.12,
          wn(1, 0.75, 0.4),
        );
      }
    let z = b(S - 1, w + 1, _ + 0.55, 1.9, 2.3, 0.9);
    for (let A of [-1, 1]) {
      let T = [];
      for (let R = 0; R <= 10; R++) {
        let P = R / 10;
        T.push([
          s + A * (0.6 + P * 3.8),
          z +
            0.25 +
            0.45 * Math.sin(P * Math.PI * 2.2) * (1 - P * 0.4) +
            P * 0.2,
          a,
        ]);
      }
      for (let R = 0; R < 10; R++)
        Ce(e, T[R], T[R + 1], 0.16 - R * 0.008, m, 5, !0);
      (ss(
        e,
        s + A * 0.35 - 0.25,
        z + 0.4,
        a - 0.2,
        s + A * 0.35 + 0.25,
        z + 0.85,
        a + 0.2,
        m,
      ),
        Ce(
          e,
          [s + A * 0.4, z + 0.85, a],
          [s + A * 0.75, z + 1.25, a],
          0.04,
          p,
          3,
          !0,
        ),
        Ce(e, T[10], [T[10][0] + A * 0.4, T[10][1] + 0.7, a], 0.08, m, 4, !0));
      let E = s + A * (l + 1.4);
      qe(
        e,
        E,
        a,
        [
          [0.01, z],
          [0.22, z + 0.3],
          [0.2, z + 0.9],
          [0.05, z + 1.25],
          [0.3, z + 1.5],
        ],
        6,
        m,
      );
    }
    (qe(
      e,
      s,
      a,
      [
        [0.01, z + 0.1],
        [0.32, z + 0.4],
        [0.3, z + 0.8],
        [0.01, z + 1],
      ],
      10,
      p,
    ),
      Ce(e, [s, z, a], [s, z + 0.15, a], 0.1, p, 6));
  }
  for (let S of [-1, 1]) {
    let w = s + S * (l - 0.5),
      _ = s + S * (c + 0.5),
      z = Math.min(w, _),
      A = Math.max(w, _),
      T = r + 5.2;
    (ss(e, z, T - 1, a - 0.4, A, T - 0.4, a + 0.4, u),
      ss(e, z, T - 0.4, a - 0.5, A, T + 0.05, a + 0.5, f));
    let E = b(z - 0.6, A + 0.6, T + 0.3, 1.1, 1.6, 0.5);
    for (let I of [z - 0.2, A + 0.2])
      qe(
        e,
        I,
        a,
        [
          [0.01, E],
          [0.14, E + 0.2],
          [0.12, E + 0.55],
          [0.18, E + 0.75],
        ],
        6,
        m,
      );
    let R = s + S * c,
      P = a + 1.3,
      C = $t(R, P) + Ze;
    (ss(e, R - 0.5, C, P - 0.6, R + 0.5, C + 0.8, P + 0.6, h),
      qe(
        e,
        R,
        P + 0.05,
        [
          [0.35, C + 0.8],
          [0.42, C + 1.2],
          [0.3, C + 1.55],
          [0.34, C + 1.8],
          [0.3, C + 2.05],
          [0.05, C + 2.2],
        ],
        8,
        We(we.polgranite, 0.95),
      ),
      qe(
        e,
        R,
        P + 0.35,
        [
          [0.05, C + 0.8],
          [0.18, C + 0.95],
          [0.12, C + 1.3],
          [0.01, C + 1.35],
        ],
        6,
        We(we.polgranite, 0.95),
      ),
      o.colliders.push({ t: "circ", x: R, z: P, r: 0.6 }));
  }
  if ((vn(o.group, e, t.lm, "DragonGate"), o.real)) return;
  let v = new Be(),
    x = vj(),
    y = s - n - i + 0.2,
    M = s + n + i - 0.2;
  for (let S = 10; S < 18; S++) {
    let w = pe[S] + ns[S].hw + 5,
      _ = pe[S + 1] - ns[S + 1].hw - (S === 17 ? 14 : 5),
      z = Math.max(1, Math.round((_ - w) / 10));
    for (let A = 0; A <= z; A++) {
      let T = w + ((_ - w) * A) / z;
      yj(v, x, [y, $t(y, T) + 7.2, T], [M, $t(M, T) + 7.2, T], S, A);
    }
  }
  vn(o.group, v, t.lm, "GrantLanterns", { shadow: !1 });
}
function vj() {
  let o = Hk(0.55, 0.07, 0.022),
    t = Lt(Ct.gold, 0.7, 0.5, 0.15),
    e = Lt(Ct.matte, 0.7, 0.05, 0.03),
    s = new Be();
  return (
    qe(
      s,
      0,
      0,
      [
        [0.01, -0.12],
        [0.1, -0.12],
        [0.1, -0.18],
      ],
      6,
      t,
    ),
    qe(
      s,
      0,
      0,
      [
        [0.1, -0.18],
        [0.3, -0.3],
        [0.37, -0.52],
        [0.3, -0.76],
        [0.1, -0.9],
      ],
      8,
      o,
    ),
    qe(
      s,
      0,
      0,
      [
        [0.1, -0.9],
        [0.1, -0.95],
        [0.01, -0.95],
      ],
      6,
      t,
    ),
    Ce(s, [0, -0.95, 0], [0, -1.35, 0], 0.03, e, 4, !0),
    s
  );
}
function yj(o, t, e, s, n, i) {
  let a = Lt(Ct.metal, 0.05, 0.05, 0.05),
    r = 0.9,
    l = 7,
    c = [],
    h = (u) => [
      e[0] + (s[0] - e[0]) * u,
      e[1] + (s[1] - e[1]) * u - r * 4 * u * (1 - u),
      e[2] + (s[2] - e[2]) * u,
    ];
  for (let u = 0; u <= l; u++) c.push(h(u / l));
  for (let u = 0; u < l; u++) Ce(o, c[u], c[u + 1], 0.012, a, 3);
  let f = Math.max(
    6,
    Math.round(Math.hypot(s[0] - e[0], s[2] - e[2]) / 2.2) - 1,
  );
  for (let u = 1; u <= f; u++) {
    let d = h(u / (f + 1));
    cj(
      o,
      t,
      d[0],
      d[1] - 0.05 * js(n, i, u),
      d[2],
      js(i, u, n) * 6.28,
      0.85 + 0.3 * js(u, i, n),
    );
  }
}
