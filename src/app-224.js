// app 224 — math
// Lines 117770-118261 of readable/app.pretty.js (statement-aligned).
function u2t(i, t) {
  let e = Ye.plazaB || [],
    s = i.rc?.L,
    n = Ye.tollGround || (() => 0),
    o = Ye.tollAt,
    a = t.G("ggPlazaB", "gpaint"),
    r = t.G("ggPlazaB", "wall"),
    l = [0.86, 0.8, 0.66, hi.stone],
    c = [0.4, 0.13, 0.07, 0.6],
    h = [0.05, 0.06, 0.07, 0.1],
    f = [0.72, 0.68, 0.6, 0.55],
    u = [0.34, 0.09, 0.07, 0.5],
    d = [0.14, 0.18, 0.21, 0.08],
    p = [0.62, 0.15, 0.06, 0.45],
    m = [0.2, 0.13, 0.07, 0.35],
    g = [0.6, 0.58, 0.55, hi.granite],
    b = [0.66, 0.64, 0.6, hi.granite],
    x = [1, 1, 1, 1, 1, 1],
    v = (z) => {
      let _ = null;
      for (let F = 0; F < z.length; F++) {
        let N = z[F],
          B = z[(F + 1) % z.length],
          H = Math.hypot(B[0] - N[0], B[1] - N[1]);
        (!_ || H > _.l) &&
          (_ = { l: H, ux: (B[0] - N[0]) / H, uz: (B[1] - N[1]) / H });
      }
      let { ux: R, uz: T } = _,
        E = 1e9,
        A = -1e9,
        C = 1e9,
        P = -1e9;
      for (let [F, N] of z) {
        let B = F * R + N * T,
          H = -F * T + N * R;
        ((E = Math.min(E, B)),
          (A = Math.max(A, B)),
          (C = Math.min(C, H)),
          (P = Math.max(P, H)));
      }
      let I = (E + A) / 2,
        L = (C + P) / 2;
      return {
        cx: I * R - L * T,
        cz: I * T + L * R,
        ux: R,
        uz: T,
        ha: (A - E) / 2,
        hc: (P - C) / 2,
      };
    },
    y = (z) =>
      i.colliders.push({
        t: "obb",
        x: z.cx,
        z: z.cz,
        hx: z.hc,
        hz: z.ha,
        c: Math.cos(Math.atan2(z.ux, z.uz)),
        s: Math.sin(Math.atan2(z.ux, z.uz)),
        y0: -100,
        y1: 200,
      }),
    M = (z, _, R, T, E) => {
      let A = z.ha + T,
        C = z.hc + T,
        P = -z.uz,
        I = z.ux,
        L = (G, q, W) => [z.cx + z.ux * G + P * q, W, z.cz + z.uz * G + I * q],
        F = Math.min(A, C),
        N = A >= C ? A - F : 0,
        B = C > A ? C - F : 0,
        H = L(-N, -B, _ + R),
        O = L(N, B, _ + R),
        D = [L(-A, -C, _), L(A, -C, _), L(A, C, _), L(-A, C, _)],
        U = [0, 1, 0];
      (A >= C
        ? (js(
            a,
            D[0],
            D[1],
            L(N, 0, _ + R),
            L(-N, 0, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          js(
            a,
            D[2],
            D[3],
            L(-N, 0, _ + R),
            L(N, 0, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          js(
            a,
            D[1],
            D[2],
            L(N, 0, _ + R),
            L(N, 0, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          js(
            a,
            D[3],
            D[0],
            L(-N, 0, _ + R),
            L(-N, 0, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ))
        : (js(
            a,
            D[1],
            D[2],
            L(0, B, _ + R),
            L(0, -B, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          js(
            a,
            D[3],
            D[0],
            L(0, -B, _ + R),
            L(0, B, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          js(
            a,
            D[0],
            D[1],
            L(0, -B, _ + R),
            L(0, -B, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          js(
            a,
            D[2],
            D[3],
            L(0, B, _ + R),
            L(0, B, _ + R),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          )),
        Ne(
          a,
          z.cx,
          z.cz,
          z.ux,
          z.uz,
          A,
          C,
          _ - 0.18,
          _,
          f,
          [1, 1, 1, 1, 0, 1],
        ));
    },
    S = null;
  for (let z of e) {
    let _ = v(z.ring),
      R = Math.min(...z.ring.map(([P, I]) => n(P, I))) - 0.3,
      T = Math.max(3.2, z.top - z.base),
      E = R + 0.3 + T;
    if (/round ?house/i.test(z.name)) {
      S = {
        x: z.cx,
        z: z.cz,
        base: R,
        r: Math.max(
          6,
          Math.min(14, Math.sqrt(Math.max(1, _.ha * _.hc * 4) / Math.PI)),
        ),
      };
      continue;
    }
    if (/welcome/i.test(z.name)) {
      Ne(
        a,
        _.cx,
        _.cz,
        _.ux,
        _.uz,
        _.ha,
        _.hc,
        R,
        R + 4.2,
        u,
        [1, 1, 1, 1, 0, 0],
      );
      let P = [_.cx + _.uz * (_.hc + 0.04), _.cz - _.ux * (_.hc + 0.04)];
      (Ne(a, P[0], P[1], _.ux, _.uz, _.ha - 1.5, 0.05, R + 0.5, R + 3.5, d, x),
        Ne(
          a,
          _.cx,
          _.cz,
          _.ux,
          _.uz,
          _.ha + 1,
          _.hc + 1,
          R + 4.2,
          R + 4.6,
          [0.18, 0.06, 0.05, 0.5],
          x,
        ),
        y(_));
      continue;
    }
    Ne(r, _.cx, _.cz, _.ux, _.uz, _.ha, _.hc, R, E, l, [1, 1, 1, 1, 0, 0]);
    let A = -_.uz,
      C = _.ux;
    for (let P = 0; P < Math.max(1, Math.floor(T / 3.3)); P++) {
      let I = R + 1.2 + P * 3.3,
        L = I + 1.5;
      if (L > E - 0.4) break;
      for (let F of [-1, 1])
        for (let N = -_.ha + 1.6; N < _.ha - 1.2; N += 2.6) {
          let B = _.cx + _.ux * N + A * (_.hc + 0.03) * F,
            H = _.cz + _.uz * N + C * (_.hc + 0.03) * F;
          Ne(a, B, H, _.ux, _.uz, 0.55, 0.02, I, L, h, x);
        }
      for (let F of [-1, 1])
        for (let N = -_.hc + 1.6; N < _.hc - 1.2; N += 2.6) {
          let B = _.cx + _.ux * (_.ha + 0.03) * F + A * N,
            H = _.cz + _.uz * (_.ha + 0.03) * F + C * N;
          Ne(a, B, H, -A, -C, 0.55, 0.02, I, L, h, x);
        }
    }
    (M(_, E, Math.min(3.2, 0.32 * Math.min(_.ha, _.hc) * 2), 0.55, c), y(_));
  }
  if (S) {
    let { x: z, z: _, base: R, r: T } = S,
      E = R + 0.3;
    (yo(
      r,
      z,
      _,
      [
        [T, R],
        [T, E + 2.8],
      ],
      28,
      l,
    ),
      yo(
        a,
        z,
        _,
        [
          [T - 0.15, E + 2.8],
          [T - 0.15, E + 5.4],
        ],
        28,
        d,
      ),
      yo(
        r,
        z,
        _,
        [
          [T, E + 5.4],
          [T, E + 6],
        ],
        28,
        l,
      ));
    for (let A = 0; A < 24; A++) {
      let C = (A / 24) * Math.PI * 2;
      Qa(
        a,
        z + Math.cos(C) * (T - 0.1),
        _ + Math.sin(C) * (T - 0.1),
        E + 2.8,
        E + 5.4,
        0.07,
        0.07,
        4,
        p,
      );
    }
    (yo(
      a,
      z,
      _,
      [
        [0.01, E + 6.35],
        [T + 1.4, E + 6.35],
        [T + 1.4, E + 6],
        [T - 0.2, E + 6],
      ],
      28,
      [0.5, 0.13, 0.06, 0.5],
    ),
      yo(
        a,
        z,
        _,
        [
          [0.01, E + 6],
          [T, E + 6],
        ],
        28,
        [0.4, 0.4, 0.4, 0.6],
      ),
      i.colliders.push({
        t: "circ",
        x: z,
        z: _,
        r: T + 0.2,
        y0: R - 2,
        y1: R + 8,
      }));
  }
  let w = (z, _, R) =>
    !s || (s.clearOfRoads(z, _, R, !0) && s.surfaceAt(z, _) !== "road");
  if (S && o) {
    let z = o(-40),
      _ = z.x - S.x,
      R = z.z - S.z,
      T = Math.hypot(_, R) || 1;
    for (let E of [S.r + 9, S.r + 14, S.r + 5]) {
      let A = S.x + (_ / T) * E,
        C = S.z + (R / T) * E;
      if (!w(A, C, 3)) continue;
      let P = n(A, C);
      (yo(
        r,
        A,
        C,
        [
          [1.5, P - 0.2],
          [1.5, P + 0.25],
          [1.15, P + 0.3],
          [1.15, P + 1.2],
          [0.01, P + 1.2],
        ],
        20,
        g,
      ),
        Qa(a, A, C, P + 1.2, P + 2.25, 0.32, 0.36, 10, m),
        Ne(a, A, C, _ / T, R / T, 0.2, 0.38, P + 2.1, P + 3.1, m, x),
        yo(
          a,
          A,
          C + 0,
          [
            [0.01, P + 3.1],
            [0.16, P + 3.15],
            [0.15, P + 3.45],
            [0.01, P + 3.5],
          ],
          8,
          m,
        ),
        i.colliders.push({
          t: "circ",
          x: A,
          z: C,
          r: 1.55,
          y0: P - 1,
          y1: P + 4,
        }));
      break;
    }
  }
  if (o)
    for (let z of [62, 70, 54]) {
      let _ = o(-28),
        R = _.x - _.uz * z,
        T = _.z + _.ux * z;
      if (!w(R, T, 6)) continue;
      let E = n(R, T);
      for (let A = 0; A < 10; A++) {
        let C = Math.PI * (0.15 + A * 0.07),
          P = C + 0.07,
          I = 9,
          L = [R + Math.cos(C) * I, T + Math.sin(C) * I],
          F = [R + Math.cos(P) * I, T + Math.sin(P) * I],
          N = (L[0] + F[0]) / 2,
          B = (L[1] + F[1]) / 2,
          H = Math.hypot(F[0] - L[0], F[1] - L[1]);
        Ne(
          r,
          N,
          B,
          (F[0] - L[0]) / H,
          (F[1] - L[1]) / H,
          H / 2 + 0.05,
          0.45,
          E - 0.5,
          E + 1.3,
          b,
          x,
        );
      }
      (Ne(r, R, T, 1, 0, 3, 2.2, E - 0.5, E + 0.6, b, x),
        i.colliders.push({
          t: "circ",
          x: R,
          z: T,
          r: 3.2,
          y0: E - 1,
          y1: E + 2,
        }));
      break;
    }
  if (s && o) {
    let z = 0,
      _ = (T, E) => {
        let A = Math.sin(T * 12.9898 + E * 78.233) * 43758.5453;
        return A - Math.floor(A);
      },
      R = (T, E) => e.some((A) => Math.hypot(A.cx - T, A.cz - E) < 24);
    for (let T = -170; T <= -10; T += 6)
      for (let E of [-110, -92, -78, -66, -56, 56, 66, 78, 92, 110]) {
        let A = o(T),
          C = (_(T, E) - 0.5) * 7,
          P = A.x - A.uz * (E + C) + A.ux * C,
          I = A.z + A.ux * (E + C) + A.uz * C;
        if (_(E, T) > (globalThis.SF_LITE ? 0.12 : 0.25)) continue;
        let L = s.coverAt(P, I);
        if (
          L & 8 ||
          (L & 7) === 3 ||
          (L & 7) === 4 ||
          !s.clearOfRoads(P, I, 3, !0) ||
          s.surfaceAt(P, I) !== "park" ||
          R(P, I) ||
          (S && Math.hypot(P - S.x, I - S.z) < S.r + 10)
        )
          continue;
        let F = s.terrainAt(P, I),
          N = _(P, I) < 0.55;
        (i.inst.push({
          kind: "tree",
          x: P,
          y: F,
          z: I,
          rot: _(I, P) * 6.283,
          scale: N ? 1 + 0.35 * _(P + 1, I) : 0.9 + 0.3 * _(P + 1, I),
          sp: N ? "euc" : "cypress",
          park: !0,
        }),
          i.colliders.push({
            t: "circ",
            x: P,
            z: I,
            r: 0.45,
            y0: F - 1.5,
            y1: F + 6,
          }),
          z++);
      }
  }
}
