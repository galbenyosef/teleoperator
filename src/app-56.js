// app 56 — math
// Lines 62644-63404 of readable/app.pretty.js (statement-aligned).
function xG({ mats: i }) {
  let t = new ke();
  t.name = "Edge";
  let e = [],
    s = [],
    n = (w, z, _ = 0) =>
      new Ee({ color: w, roughness: z, metalness: _, vertexColors: !0 }),
    o = {
      orange: n(16777215, 0.55, 0.15),
      steel: n(16777215, 0.45, 0.55),
      concrete: n(16777215, 0.9),
    },
    a = {
      orange: new Ce(),
      steel: new Ce(),
      concrete: new Ce(),
      road: new Ce(),
      land: new Ce(),
      walk: new Ce(),
    },
    r = [0.62, 0.1, 0.035, 0],
    l = [0.45, 0.07, 0.025, 0],
    c = [0.46, 0.49, 0.51, 0],
    h = [0.32, 0.34, 0.36, 0],
    f = [0.55, 0.54, 0.51, 0],
    u = [0.4, 0.39, 0.37, 0],
    d = (w, z, _, R, T, E, A = 0) => {
      let C = Math.ceil((_ - w) / T),
        P = Math.ceil((R - z) / T),
        I = [],
        L = new Int32Array((C + 1) * (P + 1)).fill(-1);
      for (let B = 0; B <= P; B++)
        for (let H = 0; H <= C; H++) {
          let O = w + H * T,
            D = z + B * T;
          I.push(E(O, D) ? Io(O, D) + A : NaN);
        }
      let F = (B, H) => I[H * (C + 1) + B],
        N = (B, H) => {
          let O = H * (C + 1) + B;
          if (L[O] >= 0) return L[O];
          let D = w + B * T,
            U = z + H * T,
            G = F(B, H),
            q =
              (F(Math.min(C, B + 1), H) - F(Math.max(0, B - 1), H)) / (2 * T) ||
              0,
            W =
              (F(B, Math.min(P, H + 1)) - F(B, Math.max(0, H - 1))) / (2 * T) ||
              0,
            V = new Vg(-q, 1, -W).normalize();
          return (L[O] = a.land.vert(
            D,
            G,
            U,
            V.x,
            V.y,
            V.z,
            D,
            U,
            $B(D, U, G),
          ));
        };
      for (let B = 0; B < P; B++)
        for (let H = 0; H < C; H++) {
          let O = F(H, B),
            D = F(H + 1, B),
            U = F(H + 1, B + 1),
            G = F(H, B + 1);
          if ([O, D, U, G].some(Number.isNaN) || Math.max(O, D, U, G) < -4)
            continue;
          let q = N(H, B),
            W = N(H + 1, B),
            V = N(H + 1, B + 1),
            Y = N(H, B + 1);
          (a.land.tri(q, Y, V), a.land.tri(q, V, W));
        }
    },
    p = ae[0] - ls[0].hw - ls[0].sw,
    m = fe[ws - 1] + Qe[ws - 1].hw + Qe[ws - 1].sw;
  (d(-7600, -1e3, p, m + 1700, 25, () => !0),
    d(
      p,
      m,
      Ve.x + 80,
      m + 1700,
      25,
      (w, z) => !(w > ae[mn - 1] + ls[mn - 1].hw && z < m + 40),
    ),
    d(-1e4, -7400, -1200, -1900, 50, () => !0),
    d(3300, -2400, 5200, 700, 25, () => !0),
    d(-1600, -7400, 700, -5e3, 50, () => !0),
    d(p - 4, Ve.z - 4, Ve.x + 4, m + 4, 10, () => !0, -0.45));
  let g = (w, z, _, R) => [w / 32, Math.min(z, 255) / 256, _, R / 4],
    b = Qi.find((w) => w.id === "101"),
    x = Qi.find((w) => w.id === "80"),
    v = (w, z) => {
      let _ = 1e9,
        R = 0;
      for (let T = 0; T < w.len; T += 1) {
        let E = Rc(w, T),
          A = Math.hypot(E.x - z[0], E.z - z[1]);
        A < _ && ((_ = A), (R = T));
      }
      return R;
    },
    y = v(b, Ye.at(0)),
    M = v(x, Je.at(0));
  for (let w of Qi) {
    let z = w.hw,
      _ = w.pts,
      R = _.length;
    for (let P = 0; P < R - 1;) {
      let I = P;
      for (; I < R - 1 && w.s[I + 1] - w.s[P] < 240;) I++;
      let L = w.s[I] - w.s[P],
        F = g(z, L, 0.52, w.lanes);
      for (let N = P; N < I; N++) {
        let B = _[N],
          H = _[N + 1],
          O = Rc(w, w.s[N] + 0.01),
          D = Rc(w, w.s[N + 1] - 0.01),
          U = (K, nt, Z) => [K[0] - nt.uz * Z, K[1], K[2] + nt.ux * Z],
          G = w.s[N] - w.s[P],
          q = w.s[N + 1] - w.s[P],
          W = U(B, O, -z),
          V = U(H, D, -z),
          Y = U(H, D, z),
          $ = U(B, O, z),
          st = V[0] - W[0],
          Q = V[2] - W[2],
          j = $[0] - W[0],
          X = $[2] - W[2];
        Q * j - st * X > 0
          ? a.road.quad(
              W,
              V,
              Y,
              $,
              [G, -z],
              [q, -z],
              [q, z],
              [G, z],
              F,
              [0, 1, 0],
            )
          : a.road.quad(
              W,
              $,
              Y,
              V,
              [G, -z],
              [G, z],
              [q, z],
              [q, -z],
              F,
              [0, 1, 0],
            );
      }
      P = I;
    }
    {
      let P = w.end,
        I = w.plaza,
        L = 36,
        F = g(I, 0, 0.65, 1);
      for (let N = 0; N < L; N++) {
        let B = (N / L) * Math.PI * 2,
          H = ((N + 1) / L) * Math.PI * 2,
          O = [P[0] + Math.cos(B) * I, P[1], P[2] + Math.sin(B) * I],
          D = [P[0] + Math.cos(H) * I, P[1], P[2] + Math.sin(H) * I];
        a.road.quad(
          [P[0], P[1], P[2]],
          D,
          D,
          O,
          [I, I],
          [I + Math.cos(H) * I, I + Math.sin(H) * I],
          [I + Math.cos(H) * I, I + Math.sin(H) * I],
          [I + Math.cos(B) * I, I + Math.sin(B) * I],
          F,
          [0, 1, 0],
        );
        let U = (O[0] + D[0]) / 2,
          G = (O[2] + D[2]) / 2;
        if (!!!Hi(U, G, -1.5)) {
          Oo(
            a.concrete,
            [O[0], P[1] + 0.5, O[2]],
            [D[0], P[1] + 0.5, D[2]],
            0.5,
            1,
            f,
          );
          let W = Math.hypot(D[0] - O[0], D[2] - O[2]);
          e.push({
            t: "obb",
            x: U,
            z: G,
            hx: 0.3,
            hz: W / 2 + 0.2,
            c: (D[2] - O[2]) / W,
            s: (D[0] - O[0]) / W,
            wallHw: !0,
          });
        }
      }
      a.concrete.quad(
        [P[0] - I, P[1] - 1.2, P[2] + I],
        [P[0] + I, P[1] - 1.2, P[2] + I],
        [P[0] + I, P[1] - 1.2, P[2] - I],
        [P[0] - I, P[1] - 1.2, P[2] - I],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        u,
        [0, -1, 0],
      );
    }
    let T = (P) => P - y,
      E = (P) =>
        w.id === "101" && T(P) > Ye.sAnchS - 60 && T(P) < Ye.sAnchN + 40,
      A = 18,
      C = w.len - 4;
    for (let P = 0; P < R - 1; P++) {
      let I = _[P],
        L = _[P + 1],
        F = w.s[P],
        N = w.s[P + 1];
      if (N < A || F > C) continue;
      let B = Rc(w, F),
        H = Rc(w, N);
      if (Hi((I[0] + L[0]) / 2, (I[2] + L[2]) / 2)?.plaza) continue;
      let O = E((F + N) / 2),
        D = O ? r : f,
        U = O ? a.orange : a.concrete;
      for (let G of [-1, 1]) {
        let q = (z + 0.25) * G,
          W = [I[0] - B.uz * q, I[1], I[2] + B.ux * q],
          V = [L[0] - H.uz * q, L[1], L[2] + H.ux * q];
        if (!O)
          Oo(U, [W[0], W[1] + 0.5, W[2]], [V[0], V[1] + 0.5, V[2]], 0.5, 1, D);
        else {
          Oo(
            a.concrete,
            [W[0], W[1] + 0.18, W[2]],
            [V[0], V[1] + 0.18, V[2]],
            0.45,
            0.36,
            f,
          );
          for (let Z of [0.62, 0.98])
            Oo(
              a.orange,
              [W[0], W[1] + Z, W[2]],
              [V[0], V[1] + Z, V[2]],
              0.07,
              0.07,
              r,
            );
          Oo(
            a.orange,
            [W[0], W[1] + 1.2, W[2]],
            [V[0], V[1] + 1.2, V[2]],
            0.2,
            0.09,
            r,
          );
          let nt = Math.hypot(V[0] - W[0], V[2] - W[2]);
          for (let Z = 0; Z < nt; Z += 2.4) {
            let et = Z / nt,
              tt = W[0] + (V[0] - W[0]) * et,
              it = W[2] + (V[2] - W[2]) * et,
              rt = W[1] + (V[1] - W[1]) * et;
            Oo(
              a.orange,
              [tt, rt + 0.35, it],
              [tt, rt + 1.2, it],
              0.08,
              0.08,
              r,
            );
          }
        }
        let Y = (z + 0.5) * G,
          $ = [I[0] - B.uz * Y, I[1], I[2] + B.ux * Y],
          st = [L[0] - H.uz * Y, L[1], L[2] + H.ux * Y];
        Oo(
          a.concrete,
          [$[0], $[1] - 0.6, $[2]],
          [st[0], st[1] - 0.6, st[2]],
          0.3,
          1.3,
          u,
        );
        let Q = (W[0] + V[0]) / 2,
          j = (W[2] + V[2]) / 2,
          X = Math.hypot(V[0] - W[0], V[2] - W[2]),
          K = Math.atan2(V[0] - W[0], V[2] - W[2]);
        e.push({
          t: "obb",
          x: Q,
          z: j,
          hx: 0.3,
          hz: X / 2 + 0.3,
          c: Math.cos(K),
          s: Math.sin(K),
          wallHw: !0,
        });
      }
      if (F > 30 && N < w.len - w.plaza - 5) {
        Oo(
          a.concrete,
          [I[0], I[1] + 0.42, I[2]],
          [L[0], L[1] + 0.42, L[2]],
          0.45,
          0.84,
          f,
        );
        let G = Math.hypot(L[0] - I[0], L[2] - I[2]),
          q = Math.atan2(L[0] - I[0], L[2] - I[2]);
        e.push({
          t: "obb",
          x: (I[0] + L[0]) / 2,
          z: (I[2] + L[2]) / 2,
          hx: 0.32,
          hz: G / 2 + 0.2,
          c: Math.cos(q),
          s: Math.sin(q),
          wallHw: !0,
        });
      }
      {
        let G = [I[0] - B.uz * -z, I[1] - 1.2, I[2] + B.ux * -z],
          q = [L[0] - H.uz * -z, L[1] - 1.2, L[2] + H.ux * -z],
          W = [L[0] - H.uz * z, L[1] - 1.2, L[2] + H.ux * z],
          V = [I[0] - B.uz * z, I[1] - 1.2, I[2] + B.ux * z],
          Y = q[0] - G[0],
          $ = q[2] - G[2],
          st = V[0] - G[0],
          Q = V[2] - G[2];
        $ * st - Y * Q > 0
          ? a.concrete.quad(
              G,
              V,
              W,
              q,
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              u,
              [0, -1, 0],
            )
          : a.concrete.quad(
              G,
              q,
              W,
              V,
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              u,
              [0, -1, 0],
            );
      }
    }
    for (let P = A; P < w.len - w.plaza; P += 45) {
      let I = Rc(w, P),
        L = Io(I.x, I.z),
        F = I.y - 1.3 - Math.max(L, -8),
        N =
          (w.id === "101" && T(P) > Ye.sAnchS - 5 && T(P) < Ye.sAnchN + 5) ||
          (w.id === "80" && P > M + Je.anch - 5 && P < M + Je.anchE + 5);
      if (F > 2.5 && !N) {
        let B = w.id === "101" && T(P) > -200 ? a.orange : a.concrete,
          H = w.id === "101" && T(P) > -200 ? r : f;
        for (let O of [-1, 1]) {
          let D = z * 0.55 * O;
          Oo(
            B,
            [I.x - I.uz * D, Math.max(L, -8) - 1, I.z + I.ux * D],
            [I.x - I.uz * D, I.y - 1.2, I.z + I.ux * D],
            2.4,
            3.2,
            H,
          );
        }
        Oo(
          B,
          [I.x - I.uz * -z, I.y - 2.2, I.z + I.ux * -z],
          [I.x - I.uz * z, I.y - 2.2, I.z + I.ux * z],
          2,
          2,
          H,
        );
      }
    }
    for (let P = A + 10, I = 0; P < w.len - w.plaza - 10; P += 48, I++) {
      if (w.id === "101" && T(P) > Ye.sAnchS - 10 && T(P) < Ye.sAnchN + 10)
        continue;
      let L = Rc(w, P),
        F = I % 2 ? 1 : -1,
        N = (z + 0.6) * F;
      s.push({
        kind: "lamp",
        x: L.x - L.uz * N,
        y: L.y,
        z: L.z + L.ux * N,
        rot: Math.atan2(L.uz * F, -L.ux * F),
      });
    }
  }
  {
    let w = b,
      z = y,
      _ = (A) => Rc(w, z + A),
      R = 17.5,
      T = Ye.towerTop,
      E = (A) => {
        let { sAnchS: C, sTowerS: P, sTowerN: I, sAnchN: L } = Ye,
          F = _((P + I) / 2).y + 3;
        if (A <= P) {
          let B = (A - C) / (P - C),
            H = _(C).y + 4;
          return H + (T - H) * B - 72 * B * (1 - B);
        }
        if (A >= I) {
          let B = (A - I) / (L - I),
            H = _(L).y + 4;
          return T + (H - T) * B - 72 * B * (1 - B);
        }
        let N = ((A - P) / (I - P)) * 2 - 1;
        return F + (T - F) * N * N;
      };
    for (let A of [Ye.sTowerS, Ye.sTowerN]) {
      let C = _(A),
        P = -C.uz,
        I = C.ux;
      Ta(a.concrete, C.x, C.z, C.ux, C.uz, 32, 34, -12, 9, f);
      let L = [
        [-2, 72, 6, 5.2],
        [72, 125, 5.4, 4.7],
        [125, 172, 4.9, 4.2],
        [172, T, 4.3, 3.7],
      ];
      for (let F of [-1, 1])
        for (let [N, B, H, O] of L) {
          let D = C.x + P * R * F,
            U = C.z + I * R * F;
          Ta(a.orange, D, U, C.ux, C.uz, H, O, N + 9, B + 9 > T ? T : B + 9, r);
          for (let G of [-0.5, 0.5])
            Ta(
              a.orange,
              D + C.ux * H * G * 1.6,
              U + C.uz * H * G * 1.6,
              C.ux,
              C.uz,
              0.35,
              O + 0.25,
              N + 12,
              Math.min(T, B + 6),
              l,
            );
        }
      for (let [F, N] of [
        [T - 7, 7],
        [186, 9],
        [142, 8],
        [102, 8],
        [C.y - 12, 5],
      ])
        Ta(
          a.orange,
          C.x,
          C.z,
          C.ux,
          C.uz,
          3.2,
          R - 3.5,
          F - N / 2,
          F + N / 2,
          r,
        );
      for (let F of [-1, 1])
        Ta(
          a.orange,
          C.x + P * R * F,
          C.z + I * R * F,
          C.ux,
          C.uz,
          3.5,
          2.5,
          T,
          T + 3,
          l,
        );
    }
    for (let A of [Ye.sAnchS, Ye.sAnchN]) {
      let C = _(A),
        P = -C.uz,
        I = C.ux,
        L = Math.min(Io(C.x, C.z), 0) - 8,
        F = w.hw + 1.5,
        N = (26 - F) / 2;
      for (let B of [-1, 1])
        Ta(
          a.concrete,
          C.x + P * (F + N) * B,
          C.z + I * (F + N) * B,
          C.ux,
          C.uz,
          22,
          N,
          L,
          C.y + 6,
          f,
        );
      Ta(a.concrete, C.x, C.z, C.ux, C.uz, 22, F, L, C.y - 1.4, u);
    }
    for (let A of [-1, 1]) {
      let C = null;
      for (let P = Ye.sAnchS; P <= Ye.sAnchN + 0.1; P += 8) {
        let I = _(P),
          L = [I.x - I.uz * R * A, E(P), I.z + I.ux * R * A];
        (C && Oo(a.orange, C, L, 0.95, 0.95, r), (C = L));
      }
      for (let P = Ye.sAnchS + 15.2; P < Ye.sAnchN - 5; P += 15.2) {
        if (Math.abs(P - Ye.sTowerS) < 9 || Math.abs(P - Ye.sTowerN) < 9)
          continue;
        let I = _(P),
          L = E(P);
        if (!(L - I.y < 1.5))
          for (let F of [-0.35, 0.35])
            Oo(
              a.orange,
              [
                I.x - I.uz * (R - 0.2) * A + I.ux * F,
                I.y + 0.5,
                I.z + I.ux * (R - 0.2) * A + I.uz * F,
              ],
              [I.x - I.uz * R * A + I.ux * F, L, I.z + I.ux * R * A + I.uz * F],
              0.1,
              0.1,
              l,
            );
      }
    }
    for (let A of [-1, 1]) {
      let C = null,
        P = null;
      for (let I = Ye.sAnchS - 20, L = 0; I <= Ye.sAnchN + 20; I += 7.6, L++) {
        let F = _(I),
          N = 14.5 * A,
          B = [F.x - F.uz * N, F.y - 1.4, F.z + F.ux * N],
          H = [F.x - F.uz * N, F.y - 8.6, F.z + F.ux * N];
        (C &&
          (Oo(a.orange, C, B, 0.6, 0.9, r),
          Oo(a.orange, P, H, 0.6, 0.9, r),
          Oo(a.orange, L % 2 ? C : P, L % 2 ? H : B, 0.35, 0.35, l)),
          Oo(a.orange, B, H, 0.4, 0.4, l),
          (C = B),
          (P = H));
      }
    }
    for (let A = Ye.sAnchS - 20; A < Ye.sAnchN + 20; A += 40) {
      let C = _(A + 20);
      Ta(a.orange, C.x, C.z, C.ux, C.uz, 20, 14.5, C.y - 8.9, C.y - 8.4, l);
    }
  }
  {
    let w = x,
      z = M,
      _ = (P) => Rc(w, z + P),
      R = 16,
      T = Je.towerTop,
      E = _(Je.center).y + 38,
      A = [
        [Je.anch, Je.towers[0], Je.towers[1], Je.center],
        [Je.center, Je.towers[2], Je.towers[3], Je.anchE],
      ],
      C = (P) => {
        for (let [I, L, F, N] of A) {
          if (P < I - 1e-6 || P > N + 1e-6) continue;
          let B = I === Je.center ? E : _(I).y + 3,
            H = N === Je.center ? E : _(N).y + 3,
            O = _((L + F) / 2).y + 3;
          if (P <= L) {
            let U = (P - I) / (L - I);
            return B + (T - B) * U - 48 * U * (1 - U);
          }
          if (P >= F) {
            let U = (P - F) / (N - F);
            return T + (H - T) * U - 48 * U * (1 - U);
          }
          let D = ((P - L) / (F - L)) * 2 - 1;
          return O + (T - O) * D * D;
        }
        return _(P).y;
      };
    for (let P of Je.towers) {
      let I = _(P),
        L = -I.uz,
        F = I.ux;
      Ta(a.concrete, I.x, I.z, I.ux, I.uz, 18, 28, -14, 12, f);
      for (let B of [-1, 1])
        Ta(
          a.steel,
          I.x + L * R * B,
          I.z + F * R * B,
          I.ux,
          I.uz,
          4.2,
          3,
          12,
          T,
          c,
        );
      let N = [I.y + 6, I.y + 40, I.y + 72, T - 8];
      for (let B = 0; B + 1 < N.length; B++) {
        let H = (D) => [I.x + L * R * -1, D, I.z + F * R * -1],
          O = (D) => [I.x + L * R, D, I.z + F * R];
        (Oo(a.steel, H(N[B]), O(N[B + 1]), 1.3, 1.3, h),
          Oo(a.steel, O(N[B]), H(N[B + 1]), 1.3, 1.3, h),
          Ta(
            a.steel,
            I.x,
            I.z,
            I.ux,
            I.uz,
            2.2,
            R - 2.5,
            N[B + 1] - 1.6,
            N[B + 1] + 1.6,
            c,
          ));
      }
      Ta(a.steel, I.x, I.z, I.ux, I.uz, 2.6, R - 2.5, I.y - 16, I.y - 12, c);
      for (let B of [-1, 1])
        Ta(
          a.steel,
          I.x + L * R * B,
          I.z + F * R * B,
          I.ux,
          I.uz,
          2.8,
          2.2,
          T,
          T + 2.5,
          h,
        );
    }
    {
      let P = _(Je.center);
      (Ta(a.concrete, P.x, P.z, P.ux, P.uz, 26, 30, -14, P.y - 14, f),
        Ta(a.concrete, P.x, P.z, P.ux, P.uz, 20, R + 3, P.y + 2, E + 4, f),
        Ta(a.concrete, P.x, P.z, P.ux, P.uz, 14, R - 1, E + 4, E + 9, u));
    }
    for (let P of [Je.anch, Je.anchE]) {
      let I = _(P);
      Ta(a.concrete, I.x, I.z, I.ux, I.uz, 18, 24, -12, I.y - 13, f);
    }
    for (let P of [-1, 1]) {
      for (let [I, , , L] of A) {
        let F = null;
        for (let N = I; N <= L + 0.1; N += 8) {
          let B = _(N),
            H = [B.x - B.uz * R * P, C(N), B.z + B.ux * R * P];
          (F && Oo(a.steel, F, H, 0.8, 0.8, h), (F = H));
        }
      }
      for (let I = Je.anch + 12; I < Je.anchE - 5; I += 12) {
        if (
          Je.towers.some((N) => Math.abs(I - N) < 7) ||
          Math.abs(I - Je.center) < 26
        )
          continue;
        let L = _(I),
          F = C(I);
        F - L.y < 1.5 ||
          Oo(
            a.steel,
            [L.x - L.uz * (R - 0.2) * P, L.y + 0.5, L.z + L.ux * (R - 0.2) * P],
            [L.x - L.uz * R * P, F, L.z + L.ux * R * P],
            0.1,
            0.1,
            h,
          );
      }
    }
    for (let P of [-1, 1]) {
      let I = null,
        L = null;
      for (let F = Je.anch - 30, N = 0; F <= Je.anchE + 30; F += 12, N++) {
        let B = _(F),
          H = 13 * P,
          O = [B.x - B.uz * H, B.y - 1.3, B.z + B.ux * H],
          D = [B.x - B.uz * H, B.y - 13, B.z + B.ux * H];
        (I &&
          (Oo(a.steel, I, O, 0.7, 1, c),
          Oo(a.steel, L, D, 0.7, 1, c),
          Oo(a.steel, N % 2 ? I : L, N % 2 ? D : O, 0.45, 0.45, h)),
          Oo(a.steel, O, D, 0.45, 0.45, h),
          (I = O),
          (L = D));
      }
    }
    for (let P = Je.anch - 30; P < Je.anchE + 30; P += 40) {
      let I = _(P + 20);
      Ta(a.concrete, I.x, I.z, I.ux, I.uz, 20, 12.5, I.y - 13.4, I.y - 12.6, u);
    }
    {
      let P = w.end,
        I = _(Je.anchE + 90);
      (Ta(
        a.concrete,
        P[0] + I.ux * (w.plaza + 4),
        P[2] + I.uz * (w.plaza + 4),
        I.ux,
        I.uz,
        4,
        22,
        P[1] - 2,
        P[1] + 14,
        f,
      ),
        Ta(
          a.concrete,
          P[0] + I.ux * (w.plaza + 2.2),
          P[2] + I.uz * (w.plaza + 2.2),
          I.ux,
          I.uz,
          0.6,
          9,
          P[1],
          P[1] + 7.5,
          [0.05, 0.05, 0.05, 0],
        ));
    }
  }
  let S = (w, z, _, R = !0) => {
    if (w.empty) return;
    let T = new _e(w.geometry(), z);
    ((T.name = _),
      (T.castShadow = R),
      (T.receiveShadow = !0),
      (T.matrixAutoUpdate = !1),
      T.updateMatrix(),
      t.add(T));
  };
  return (
    S(a.land, i.walk, "Land", !1),
    S(a.road, i.road, "HighwayDeck", !1),
    S(a.orange, o.orange, "GoldenGate"),
    S(a.steel, o.steel, "BayBridge"),
    S(a.concrete, o.concrete, "HighwayConcrete"),
    { group: t, colliders: e, inst: s }
  );
}
