// app 223 — math
// Lines 118026-118517 of readable/app.pretty.js (statement-aligned).
function Oxt(o, t) {
  let e = Qe.plazaB || [],
    s = o.rc?.L,
    n = Qe.tollGround || (() => 0),
    i = Qe.tollAt,
    a = t.G("ggPlazaB", "gpaint"),
    r = t.G("ggPlazaB", "wall"),
    l = [0.86, 0.8, 0.66, yi.stone],
    c = [0.4, 0.13, 0.07, 0.6],
    h = [0.05, 0.06, 0.07, 0.1],
    f = [0.72, 0.68, 0.6, 0.55],
    u = [0.34, 0.09, 0.07, 0.5],
    d = [0.14, 0.18, 0.21, 0.08],
    p = [0.62, 0.15, 0.06, 0.45],
    m = [0.2, 0.13, 0.07, 0.35],
    g = [0.6, 0.58, 0.55, yi.granite],
    b = [0.66, 0.64, 0.6, yi.granite],
    v = [1, 1, 1, 1, 1, 1],
    x = (_) => {
      let z = null;
      for (let F = 0; F < _.length; F++) {
        let O = _[F],
          B = _[(F + 1) % _.length],
          H = Math.hypot(B[0] - O[0], B[1] - O[1]);
        (!z || H > z.l) &&
          (z = { l: H, ux: (B[0] - O[0]) / H, uz: (B[1] - O[1]) / H });
      }
      let { ux: A, uz: T } = z,
        E = 1e9,
        R = -1e9,
        P = 1e9,
        C = -1e9;
      for (let [F, O] of _) {
        let B = F * A + O * T,
          H = -F * T + O * A;
        ((E = Math.min(E, B)),
          (R = Math.max(R, B)),
          (P = Math.min(P, H)),
          (C = Math.max(C, H)));
      }
      let I = (E + R) / 2,
        L = (P + C) / 2;
      return {
        cx: I * A - L * T,
        cz: I * T + L * A,
        ux: A,
        uz: T,
        ha: (R - E) / 2,
        hc: (C - P) / 2,
      };
    },
    y = (_) =>
      o.colliders.push({
        t: "obb",
        x: _.cx,
        z: _.cz,
        hx: _.hc,
        hz: _.ha,
        c: Math.cos(Math.atan2(_.ux, _.uz)),
        s: Math.sin(Math.atan2(_.ux, _.uz)),
        y0: -100,
        y1: 200,
      }),
    M = (_, z, A, T, E) => {
      let R = _.ha + T,
        P = _.hc + T,
        C = -_.uz,
        I = _.ux,
        L = (G, W, V) => [_.cx + _.ux * G + C * W, V, _.cz + _.uz * G + I * W],
        F = Math.min(R, P),
        O = R >= P ? R - F : 0,
        B = P > R ? P - F : 0,
        H = L(-O, -B, z + A),
        N = L(O, B, z + A),
        D = [L(-R, -P, z), L(R, -P, z), L(R, P, z), L(-R, P, z)],
        U = [0, 1, 0];
      (R >= P
        ? ($s(
            a,
            D[0],
            D[1],
            L(O, 0, z + A),
            L(-O, 0, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          $s(
            a,
            D[2],
            D[3],
            L(-O, 0, z + A),
            L(O, 0, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          $s(
            a,
            D[1],
            D[2],
            L(O, 0, z + A),
            L(O, 0, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          $s(
            a,
            D[3],
            D[0],
            L(-O, 0, z + A),
            L(-O, 0, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ))
        : ($s(
            a,
            D[1],
            D[2],
            L(0, B, z + A),
            L(0, -B, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          $s(
            a,
            D[3],
            D[0],
            L(0, -B, z + A),
            L(0, B, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          $s(
            a,
            D[0],
            D[1],
            L(0, -B, z + A),
            L(0, -B, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          ),
          $s(
            a,
            D[2],
            D[3],
            L(0, B, z + A),
            L(0, B, z + A),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            E,
            U,
          )),
        Ge(
          a,
          _.cx,
          _.cz,
          _.ux,
          _.uz,
          R,
          P,
          z - 0.18,
          z,
          f,
          [1, 1, 1, 1, 0, 1],
        ));
    },
    S = null;
  for (let _ of e) {
    let z = x(_.ring),
      A = Math.min(..._.ring.map(([C, I]) => n(C, I))) - 0.3,
      T = Math.max(3.2, _.top - _.base),
      E = A + 0.3 + T;
    if (/round ?house/i.test(_.name)) {
      S = {
        x: _.cx,
        z: _.cz,
        base: A,
        r: Math.max(
          6,
          Math.min(14, Math.sqrt(Math.max(1, z.ha * z.hc * 4) / Math.PI)),
        ),
      };
      continue;
    }
    if (/welcome/i.test(_.name)) {
      Ge(
        a,
        z.cx,
        z.cz,
        z.ux,
        z.uz,
        z.ha,
        z.hc,
        A,
        A + 4.2,
        u,
        [1, 1, 1, 1, 0, 0],
      );
      let C = [z.cx + z.uz * (z.hc + 0.04), z.cz - z.ux * (z.hc + 0.04)];
      (Ge(a, C[0], C[1], z.ux, z.uz, z.ha - 1.5, 0.05, A + 0.5, A + 3.5, d, v),
        Ge(
          a,
          z.cx,
          z.cz,
          z.ux,
          z.uz,
          z.ha + 1,
          z.hc + 1,
          A + 4.2,
          A + 4.6,
          [0.18, 0.06, 0.05, 0.5],
          v,
        ),
        y(z));
      continue;
    }
    Ge(r, z.cx, z.cz, z.ux, z.uz, z.ha, z.hc, A, E, l, [1, 1, 1, 1, 0, 0]);
    let R = -z.uz,
      P = z.ux;
    for (let C = 0; C < Math.max(1, Math.floor(T / 3.3)); C++) {
      let I = A + 1.2 + C * 3.3,
        L = I + 1.5;
      if (L > E - 0.4) break;
      for (let F of [-1, 1])
        for (let O = -z.ha + 1.6; O < z.ha - 1.2; O += 2.6) {
          let B = z.cx + z.ux * O + R * (z.hc + 0.03) * F,
            H = z.cz + z.uz * O + P * (z.hc + 0.03) * F;
          Ge(a, B, H, z.ux, z.uz, 0.55, 0.02, I, L, h, v);
        }
      for (let F of [-1, 1])
        for (let O = -z.hc + 1.6; O < z.hc - 1.2; O += 2.6) {
          let B = z.cx + z.ux * (z.ha + 0.03) * F + R * O,
            H = z.cz + z.uz * (z.ha + 0.03) * F + P * O;
          Ge(a, B, H, -R, -P, 0.55, 0.02, I, L, h, v);
        }
    }
    (M(z, E, Math.min(3.2, 0.32 * Math.min(z.ha, z.hc) * 2), 0.55, c), y(z));
  }
  if (S) {
    let { x: _, z, base: A, r: T } = S,
      E = A + 0.3;
    (To(
      r,
      _,
      z,
      [
        [T, A],
        [T, E + 2.8],
      ],
      28,
      l,
    ),
      To(
        a,
        _,
        z,
        [
          [T - 0.15, E + 2.8],
          [T - 0.15, E + 5.4],
        ],
        28,
        d,
      ),
      To(
        r,
        _,
        z,
        [
          [T, E + 5.4],
          [T, E + 6],
        ],
        28,
        l,
      ));
    for (let R = 0; R < 24; R++) {
      let P = (R / 24) * Math.PI * 2;
      mr(
        a,
        _ + Math.cos(P) * (T - 0.1),
        z + Math.sin(P) * (T - 0.1),
        E + 2.8,
        E + 5.4,
        0.07,
        0.07,
        4,
        p,
      );
    }
    (To(
      a,
      _,
      z,
      [
        [0.01, E + 6.35],
        [T + 1.4, E + 6.35],
        [T + 1.4, E + 6],
        [T - 0.2, E + 6],
      ],
      28,
      [0.5, 0.13, 0.06, 0.5],
    ),
      To(
        a,
        _,
        z,
        [
          [0.01, E + 6],
          [T, E + 6],
        ],
        28,
        [0.4, 0.4, 0.4, 0.6],
      ),
      o.colliders.push({
        t: "circ",
        x: _,
        z,
        r: T + 0.2,
        y0: A - 2,
        y1: A + 8,
      }));
  }
  let w = (_, z, A) =>
    !s || (s.clearOfRoads(_, z, A, !0) && s.surfaceAt(_, z) !== "road");
  if (S && i) {
    let _ = i(-40),
      z = _.x - S.x,
      A = _.z - S.z,
      T = Math.hypot(z, A) || 1;
    for (let E of [S.r + 9, S.r + 14, S.r + 5]) {
      let R = S.x + (z / T) * E,
        P = S.z + (A / T) * E;
      if (!w(R, P, 3)) continue;
      let C = n(R, P);
      (To(
        r,
        R,
        P,
        [
          [1.5, C - 0.2],
          [1.5, C + 0.25],
          [1.15, C + 0.3],
          [1.15, C + 1.2],
          [0.01, C + 1.2],
        ],
        20,
        g,
      ),
        mr(a, R, P, C + 1.2, C + 2.25, 0.32, 0.36, 10, m),
        Ge(a, R, P, z / T, A / T, 0.2, 0.38, C + 2.1, C + 3.1, m, v),
        To(
          a,
          R,
          P + 0,
          [
            [0.01, C + 3.1],
            [0.16, C + 3.15],
            [0.15, C + 3.45],
            [0.01, C + 3.5],
          ],
          8,
          m,
        ),
        o.colliders.push({
          t: "circ",
          x: R,
          z: P,
          r: 1.55,
          y0: C - 1,
          y1: C + 4,
        }));
      break;
    }
  }
  if (i)
    for (let _ of [62, 70, 54]) {
      let z = i(-28),
        A = z.x - z.uz * _,
        T = z.z + z.ux * _;
      if (!w(A, T, 6)) continue;
      let E = n(A, T);
      for (let R = 0; R < 10; R++) {
        let P = Math.PI * (0.15 + R * 0.07),
          C = P + 0.07,
          I = 9,
          L = [A + Math.cos(P) * I, T + Math.sin(P) * I],
          F = [A + Math.cos(C) * I, T + Math.sin(C) * I],
          O = (L[0] + F[0]) / 2,
          B = (L[1] + F[1]) / 2,
          H = Math.hypot(F[0] - L[0], F[1] - L[1]);
        Ge(
          r,
          O,
          B,
          (F[0] - L[0]) / H,
          (F[1] - L[1]) / H,
          H / 2 + 0.05,
          0.45,
          E - 0.5,
          E + 1.3,
          b,
          v,
        );
      }
      (Ge(r, A, T, 1, 0, 3, 2.2, E - 0.5, E + 0.6, b, v),
        o.colliders.push({
          t: "circ",
          x: A,
          z: T,
          r: 3.2,
          y0: E - 1,
          y1: E + 2,
        }));
      break;
    }
  if (s && i) {
    let _ = 0,
      z = (T, E) => {
        let R = Math.sin(T * 12.9898 + E * 78.233) * 43758.5453;
        return R - Math.floor(R);
      },
      A = (T, E) => e.some((R) => Math.hypot(R.cx - T, R.cz - E) < 24);
    for (let T = -170; T <= -10; T += 6)
      for (let E of [-110, -92, -78, -66, -56, 56, 66, 78, 92, 110]) {
        let R = i(T),
          P = (z(T, E) - 0.5) * 7,
          C = R.x - R.uz * (E + P) + R.ux * P,
          I = R.z + R.ux * (E + P) + R.uz * P;
        if (z(E, T) > (globalThis.SF_LITE ? 0.12 : 0.25)) continue;
        let L = s.coverAt(C, I);
        if (
          L & 8 ||
          (L & 7) === 3 ||
          (L & 7) === 4 ||
          !s.clearOfRoads(C, I, 3, !0) ||
          s.surfaceAt(C, I) !== "park" ||
          A(C, I) ||
          (S && Math.hypot(C - S.x, I - S.z) < S.r + 10)
        )
          continue;
        let F = s.terrainAt(C, I),
          O = z(C, I) < 0.55;
        (o.inst.push({
          kind: "tree",
          x: C,
          y: F,
          z: I,
          rot: z(I, C) * 6.283,
          scale: O ? 1 + 0.35 * z(C + 1, I) : 0.9 + 0.3 * z(C + 1, I),
          sp: O ? "euc" : "cypress",
          park: !0,
        }),
          o.colliders.push({
            t: "circ",
            x: C,
            z: I,
            r: 0.45,
            y0: F - 1.5,
            y1: F + 6,
          }),
          _++);
      }
  }
}
