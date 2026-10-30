// app 55 — math
// Lines 62875-63635 of readable/app.pretty.js (statement-aligned).
function yW({ mats: o }) {
  let t = new le();
  t.name = "Edge";
  let e = [],
    s = [],
    n = (w, _, z = 0) =>
      new me({ color: w, roughness: _, metalness: z, vertexColors: !0 }),
    i = {
      orange: n(16777215, 0.55, 0.15),
      steel: n(16777215, 0.45, 0.55),
      concrete: n(16777215, 0.9),
    },
    a = {
      orange: new Be(),
      steel: new Be(),
      concrete: new Be(),
      road: new Be(),
      land: new Be(),
      walk: new Be(),
    },
    r = [0.62, 0.1, 0.035, 0],
    l = [0.45, 0.07, 0.025, 0],
    c = [0.46, 0.49, 0.51, 0],
    h = [0.32, 0.34, 0.36, 0],
    f = [0.55, 0.54, 0.51, 0],
    u = [0.4, 0.39, 0.37, 0],
    d = (w, _, z, A, T, E, R = 0) => {
      let P = Math.ceil((z - w) / T),
        C = Math.ceil((A - _) / T),
        I = [],
        L = new Int32Array((P + 1) * (C + 1)).fill(-1);
      for (let B = 0; B <= C; B++)
        for (let H = 0; H <= P; H++) {
          let N = w + H * T,
            D = _ + B * T;
          I.push(E(N, D) ? Vo(N, D) + R : NaN);
        }
      let F = (B, H) => I[H * (P + 1) + B],
        O = (B, H) => {
          let N = H * (P + 1) + B;
          if (L[N] >= 0) return L[N];
          let D = w + B * T,
            U = _ + H * T,
            G = F(B, H),
            W =
              (F(Math.min(P, B + 1), H) - F(Math.max(0, B - 1), H)) / (2 * T) ||
              0,
            V =
              (F(B, Math.min(C, H + 1)) - F(B, Math.max(0, H - 1))) / (2 * T) ||
              0,
            $ = new Fb(-W, 1, -V).normalize();
          return (L[N] = a.land.vert(
            D,
            G,
            U,
            $.x,
            $.y,
            $.z,
            D,
            U,
            YH(D, U, G),
          ));
        };
      for (let B = 0; B < C; B++)
        for (let H = 0; H < P; H++) {
          let N = F(H, B),
            D = F(H + 1, B),
            U = F(H + 1, B + 1),
            G = F(H, B + 1);
          if ([N, D, U, G].some(Number.isNaN) || Math.max(N, D, U, G) < -4)
            continue;
          let W = O(H, B),
            V = O(H + 1, B),
            $ = O(H + 1, B + 1),
            J = O(H, B + 1);
          (a.land.tri(W, J, $), a.land.tri(W, $, V));
        }
    },
    p = he[0] - ps[0].hw - ps[0].sw,
    m = pe[ks - 1] + ns[ks - 1].hw + ns[ks - 1].sw;
  (d(-7600, -1e3, p, m + 1700, 25, () => !0),
    d(
      p,
      m,
      Ye.x + 80,
      m + 1700,
      25,
      (w, _) => !(w > he[xn - 1] + ps[xn - 1].hw && _ < m + 40),
    ),
    d(-1e4, -7400, -1200, -1900, 50, () => !0),
    d(3300, -2400, 5200, 700, 25, () => !0),
    d(-1600, -7400, 700, -5e3, 50, () => !0),
    d(p - 4, Ye.z - 4, Ye.x + 4, m + 4, 10, () => !0, -0.45));
  let g = (w, _, z, A) => [w / 32, Math.min(_, 255) / 256, z, A / 4],
    b = uo.find((w) => w.id === "101"),
    v = uo.find((w) => w.id === "80"),
    x = (w, _) => {
      let z = 1e9,
        A = 0;
      for (let T = 0; T < w.len; T += 1) {
        let E = oh(w, T),
          R = Math.hypot(E.x - _[0], E.z - _[1]);
        R < z && ((z = R), (A = T));
      }
      return A;
    },
    y = x(b, Qe.at(0)),
    M = x(v, ts.at(0));
  for (let w of uo) {
    let _ = w.hw,
      z = w.pts,
      A = z.length;
    for (let C = 0; C < A - 1;) {
      let I = C;
      for (; I < A - 1 && w.s[I + 1] - w.s[C] < 240;) I++;
      let L = w.s[I] - w.s[C],
        F = g(_, L, 0.52, w.lanes);
      for (let O = C; O < I; O++) {
        let B = z[O],
          H = z[O + 1],
          N = oh(w, w.s[O] + 0.01),
          D = oh(w, w.s[O + 1] - 0.01),
          U = (K, nt, Q) => [K[0] - nt.uz * Q, K[1], K[2] + nt.ux * Q],
          G = w.s[O] - w.s[C],
          W = w.s[O + 1] - w.s[C],
          V = U(B, N, -_),
          $ = U(H, D, -_),
          J = U(H, D, _),
          X = U(B, N, _),
          tt = $[0] - V[0],
          Z = $[2] - V[2],
          q = X[0] - V[0],
          j = X[2] - V[2];
        Z * q - tt * j > 0
          ? a.road.quad(
              V,
              $,
              J,
              X,
              [G, -_],
              [W, -_],
              [W, _],
              [G, _],
              F,
              [0, 1, 0],
            )
          : a.road.quad(
              V,
              X,
              J,
              $,
              [G, -_],
              [G, _],
              [W, _],
              [W, -_],
              F,
              [0, 1, 0],
            );
      }
      C = I;
    }
    {
      let C = w.end,
        I = w.plaza,
        L = 36,
        F = g(I, 0, 0.65, 1);
      for (let O = 0; O < L; O++) {
        let B = (O / L) * Math.PI * 2,
          H = ((O + 1) / L) * Math.PI * 2,
          N = [C[0] + Math.cos(B) * I, C[1], C[2] + Math.sin(B) * I],
          D = [C[0] + Math.cos(H) * I, C[1], C[2] + Math.sin(H) * I];
        a.road.quad(
          [C[0], C[1], C[2]],
          D,
          D,
          N,
          [I, I],
          [I + Math.cos(H) * I, I + Math.sin(H) * I],
          [I + Math.cos(H) * I, I + Math.sin(H) * I],
          [I + Math.cos(B) * I, I + Math.sin(B) * I],
          F,
          [0, 1, 0],
        );
        let U = (N[0] + D[0]) / 2,
          G = (N[2] + D[2]) / 2;
        if (!!!Ni(U, G, -1.5)) {
          Xo(
            a.concrete,
            [N[0], C[1] + 0.5, N[2]],
            [D[0], C[1] + 0.5, D[2]],
            0.5,
            1,
            f,
          );
          let V = Math.hypot(D[0] - N[0], D[2] - N[2]);
          e.push({
            t: "obb",
            x: U,
            z: G,
            hx: 0.3,
            hz: V / 2 + 0.2,
            c: (D[2] - N[2]) / V,
            s: (D[0] - N[0]) / V,
            wallHw: !0,
          });
        }
      }
      a.concrete.quad(
        [C[0] - I, C[1] - 1.2, C[2] + I],
        [C[0] + I, C[1] - 1.2, C[2] + I],
        [C[0] + I, C[1] - 1.2, C[2] - I],
        [C[0] - I, C[1] - 1.2, C[2] - I],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        u,
        [0, -1, 0],
      );
    }
    let T = (C) => C - y,
      E = (C) =>
        w.id === "101" && T(C) > Qe.sAnchS - 60 && T(C) < Qe.sAnchN + 40,
      R = 18,
      P = w.len - 4;
    for (let C = 0; C < A - 1; C++) {
      let I = z[C],
        L = z[C + 1],
        F = w.s[C],
        O = w.s[C + 1];
      if (O < R || F > P) continue;
      let B = oh(w, F),
        H = oh(w, O);
      if (Ni((I[0] + L[0]) / 2, (I[2] + L[2]) / 2)?.plaza) continue;
      let N = E((F + O) / 2),
        D = N ? r : f,
        U = N ? a.orange : a.concrete;
      for (let G of [-1, 1]) {
        let W = (_ + 0.25) * G,
          V = [I[0] - B.uz * W, I[1], I[2] + B.ux * W],
          $ = [L[0] - H.uz * W, L[1], L[2] + H.ux * W];
        if (!N)
          Xo(U, [V[0], V[1] + 0.5, V[2]], [$[0], $[1] + 0.5, $[2]], 0.5, 1, D);
        else {
          Xo(
            a.concrete,
            [V[0], V[1] + 0.18, V[2]],
            [$[0], $[1] + 0.18, $[2]],
            0.45,
            0.36,
            f,
          );
          for (let Q of [0.62, 0.98])
            Xo(
              a.orange,
              [V[0], V[1] + Q, V[2]],
              [$[0], $[1] + Q, $[2]],
              0.07,
              0.07,
              r,
            );
          Xo(
            a.orange,
            [V[0], V[1] + 1.2, V[2]],
            [$[0], $[1] + 1.2, $[2]],
            0.2,
            0.09,
            r,
          );
          let nt = Math.hypot($[0] - V[0], $[2] - V[2]);
          for (let Q = 0; Q < nt; Q += 2.4) {
            let et = Q / nt,
              st = V[0] + ($[0] - V[0]) * et,
              ot = V[2] + ($[2] - V[2]) * et,
              rt = V[1] + ($[1] - V[1]) * et;
            Xo(
              a.orange,
              [st, rt + 0.35, ot],
              [st, rt + 1.2, ot],
              0.08,
              0.08,
              r,
            );
          }
        }
        let J = (_ + 0.5) * G,
          X = [I[0] - B.uz * J, I[1], I[2] + B.ux * J],
          tt = [L[0] - H.uz * J, L[1], L[2] + H.ux * J];
        Xo(
          a.concrete,
          [X[0], X[1] - 0.6, X[2]],
          [tt[0], tt[1] - 0.6, tt[2]],
          0.3,
          1.3,
          u,
        );
        let Z = (V[0] + $[0]) / 2,
          q = (V[2] + $[2]) / 2,
          j = Math.hypot($[0] - V[0], $[2] - V[2]),
          K = Math.atan2($[0] - V[0], $[2] - V[2]);
        e.push({
          t: "obb",
          x: Z,
          z: q,
          hx: 0.3,
          hz: j / 2 + 0.3,
          c: Math.cos(K),
          s: Math.sin(K),
          wallHw: !0,
        });
      }
      if (F > 30 && O < w.len - w.plaza - 5) {
        Xo(
          a.concrete,
          [I[0], I[1] + 0.42, I[2]],
          [L[0], L[1] + 0.42, L[2]],
          0.45,
          0.84,
          f,
        );
        let G = Math.hypot(L[0] - I[0], L[2] - I[2]),
          W = Math.atan2(L[0] - I[0], L[2] - I[2]);
        e.push({
          t: "obb",
          x: (I[0] + L[0]) / 2,
          z: (I[2] + L[2]) / 2,
          hx: 0.32,
          hz: G / 2 + 0.2,
          c: Math.cos(W),
          s: Math.sin(W),
          wallHw: !0,
        });
      }
      {
        let G = [I[0] - B.uz * -_, I[1] - 1.2, I[2] + B.ux * -_],
          W = [L[0] - H.uz * -_, L[1] - 1.2, L[2] + H.ux * -_],
          V = [L[0] - H.uz * _, L[1] - 1.2, L[2] + H.ux * _],
          $ = [I[0] - B.uz * _, I[1] - 1.2, I[2] + B.ux * _],
          J = W[0] - G[0],
          X = W[2] - G[2],
          tt = $[0] - G[0],
          Z = $[2] - G[2];
        X * tt - J * Z > 0
          ? a.concrete.quad(
              G,
              $,
              V,
              W,
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              u,
              [0, -1, 0],
            )
          : a.concrete.quad(
              G,
              W,
              V,
              $,
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              u,
              [0, -1, 0],
            );
      }
    }
    for (let C = R; C < w.len - w.plaza; C += 45) {
      let I = oh(w, C),
        L = Vo(I.x, I.z),
        F = I.y - 1.3 - Math.max(L, -8),
        O =
          (w.id === "101" && T(C) > Qe.sAnchS - 5 && T(C) < Qe.sAnchN + 5) ||
          (w.id === "80" && C > M + ts.anch - 5 && C < M + ts.anchE + 5);
      if (F > 2.5 && !O) {
        let B = w.id === "101" && T(C) > -200 ? a.orange : a.concrete,
          H = w.id === "101" && T(C) > -200 ? r : f;
        for (let N of [-1, 1]) {
          let D = _ * 0.55 * N;
          Xo(
            B,
            [I.x - I.uz * D, Math.max(L, -8) - 1, I.z + I.ux * D],
            [I.x - I.uz * D, I.y - 1.2, I.z + I.ux * D],
            2.4,
            3.2,
            H,
          );
        }
        Xo(
          B,
          [I.x - I.uz * -_, I.y - 2.2, I.z + I.ux * -_],
          [I.x - I.uz * _, I.y - 2.2, I.z + I.ux * _],
          2,
          2,
          H,
        );
      }
    }
    for (let C = R + 10, I = 0; C < w.len - w.plaza - 10; C += 48, I++) {
      if (w.id === "101" && T(C) > Qe.sAnchS - 10 && T(C) < Qe.sAnchN + 10)
        continue;
      let L = oh(w, C),
        F = I % 2 ? 1 : -1,
        O = (_ + 0.6) * F;
      s.push({
        kind: "lamp",
        x: L.x - L.uz * O,
        y: L.y,
        z: L.z + L.ux * O,
        rot: Math.atan2(L.uz * F, -L.ux * F),
      });
    }
  }
  {
    let w = b,
      _ = y,
      z = (R) => oh(w, _ + R),
      A = 17.5,
      T = Qe.towerTop,
      E = (R) => {
        let { sAnchS: P, sTowerS: C, sTowerN: I, sAnchN: L } = Qe,
          F = z((C + I) / 2).y + 3;
        if (R <= C) {
          let B = (R - P) / (C - P),
            H = z(P).y + 4;
          return H + (T - H) * B - 72 * B * (1 - B);
        }
        if (R >= I) {
          let B = (R - I) / (L - I),
            H = z(L).y + 4;
          return T + (H - T) * B - 72 * B * (1 - B);
        }
        let O = ((R - C) / (I - C)) * 2 - 1;
        return F + (T - F) * O * O;
      };
    for (let R of [Qe.sTowerS, Qe.sTowerN]) {
      let P = z(R),
        C = -P.uz,
        I = P.ux;
      Ha(a.concrete, P.x, P.z, P.ux, P.uz, 32, 34, -12, 9, f);
      let L = [
        [-2, 72, 6, 5.2],
        [72, 125, 5.4, 4.7],
        [125, 172, 4.9, 4.2],
        [172, T, 4.3, 3.7],
      ];
      for (let F of [-1, 1])
        for (let [O, B, H, N] of L) {
          let D = P.x + C * A * F,
            U = P.z + I * A * F;
          Ha(a.orange, D, U, P.ux, P.uz, H, N, O + 9, B + 9 > T ? T : B + 9, r);
          for (let G of [-0.5, 0.5])
            Ha(
              a.orange,
              D + P.ux * H * G * 1.6,
              U + P.uz * H * G * 1.6,
              P.ux,
              P.uz,
              0.35,
              N + 0.25,
              O + 12,
              Math.min(T, B + 6),
              l,
            );
        }
      for (let [F, O] of [
        [T - 7, 7],
        [186, 9],
        [142, 8],
        [102, 8],
        [P.y - 12, 5],
      ])
        Ha(
          a.orange,
          P.x,
          P.z,
          P.ux,
          P.uz,
          3.2,
          A - 3.5,
          F - O / 2,
          F + O / 2,
          r,
        );
      for (let F of [-1, 1])
        Ha(
          a.orange,
          P.x + C * A * F,
          P.z + I * A * F,
          P.ux,
          P.uz,
          3.5,
          2.5,
          T,
          T + 3,
          l,
        );
    }
    for (let R of [Qe.sAnchS, Qe.sAnchN]) {
      let P = z(R),
        C = -P.uz,
        I = P.ux,
        L = Math.min(Vo(P.x, P.z), 0) - 8,
        F = w.hw + 1.5,
        O = (26 - F) / 2;
      for (let B of [-1, 1])
        Ha(
          a.concrete,
          P.x + C * (F + O) * B,
          P.z + I * (F + O) * B,
          P.ux,
          P.uz,
          22,
          O,
          L,
          P.y + 6,
          f,
        );
      Ha(a.concrete, P.x, P.z, P.ux, P.uz, 22, F, L, P.y - 1.4, u);
    }
    for (let R of [-1, 1]) {
      let P = null;
      for (let C = Qe.sAnchS; C <= Qe.sAnchN + 0.1; C += 8) {
        let I = z(C),
          L = [I.x - I.uz * A * R, E(C), I.z + I.ux * A * R];
        (P && Xo(a.orange, P, L, 0.95, 0.95, r), (P = L));
      }
      for (let C = Qe.sAnchS + 15.2; C < Qe.sAnchN - 5; C += 15.2) {
        if (Math.abs(C - Qe.sTowerS) < 9 || Math.abs(C - Qe.sTowerN) < 9)
          continue;
        let I = z(C),
          L = E(C);
        if (!(L - I.y < 1.5))
          for (let F of [-0.35, 0.35])
            Xo(
              a.orange,
              [
                I.x - I.uz * (A - 0.2) * R + I.ux * F,
                I.y + 0.5,
                I.z + I.ux * (A - 0.2) * R + I.uz * F,
              ],
              [I.x - I.uz * A * R + I.ux * F, L, I.z + I.ux * A * R + I.uz * F],
              0.1,
              0.1,
              l,
            );
      }
    }
    for (let R of [-1, 1]) {
      let P = null,
        C = null;
      for (let I = Qe.sAnchS - 20, L = 0; I <= Qe.sAnchN + 20; I += 7.6, L++) {
        let F = z(I),
          O = 14.5 * R,
          B = [F.x - F.uz * O, F.y - 1.4, F.z + F.ux * O],
          H = [F.x - F.uz * O, F.y - 8.6, F.z + F.ux * O];
        (P &&
          (Xo(a.orange, P, B, 0.6, 0.9, r),
          Xo(a.orange, C, H, 0.6, 0.9, r),
          Xo(a.orange, L % 2 ? P : C, L % 2 ? H : B, 0.35, 0.35, l)),
          Xo(a.orange, B, H, 0.4, 0.4, l),
          (P = B),
          (C = H));
      }
    }
    for (let R = Qe.sAnchS - 20; R < Qe.sAnchN + 20; R += 40) {
      let P = z(R + 20);
      Ha(a.orange, P.x, P.z, P.ux, P.uz, 20, 14.5, P.y - 8.9, P.y - 8.4, l);
    }
  }
  {
    let w = v,
      _ = M,
      z = (C) => oh(w, _ + C),
      A = 16,
      T = ts.towerTop,
      E = z(ts.center).y + 38,
      R = [
        [ts.anch, ts.towers[0], ts.towers[1], ts.center],
        [ts.center, ts.towers[2], ts.towers[3], ts.anchE],
      ],
      P = (C) => {
        for (let [I, L, F, O] of R) {
          if (C < I - 1e-6 || C > O + 1e-6) continue;
          let B = I === ts.center ? E : z(I).y + 3,
            H = O === ts.center ? E : z(O).y + 3,
            N = z((L + F) / 2).y + 3;
          if (C <= L) {
            let U = (C - I) / (L - I);
            return B + (T - B) * U - 48 * U * (1 - U);
          }
          if (C >= F) {
            let U = (C - F) / (O - F);
            return T + (H - T) * U - 48 * U * (1 - U);
          }
          let D = ((C - L) / (F - L)) * 2 - 1;
          return N + (T - N) * D * D;
        }
        return z(C).y;
      };
    for (let C of ts.towers) {
      let I = z(C),
        L = -I.uz,
        F = I.ux;
      Ha(a.concrete, I.x, I.z, I.ux, I.uz, 18, 28, -14, 12, f);
      for (let B of [-1, 1])
        Ha(
          a.steel,
          I.x + L * A * B,
          I.z + F * A * B,
          I.ux,
          I.uz,
          4.2,
          3,
          12,
          T,
          c,
        );
      let O = [I.y + 6, I.y + 40, I.y + 72, T - 8];
      for (let B = 0; B + 1 < O.length; B++) {
        let H = (D) => [I.x + L * A * -1, D, I.z + F * A * -1],
          N = (D) => [I.x + L * A, D, I.z + F * A];
        (Xo(a.steel, H(O[B]), N(O[B + 1]), 1.3, 1.3, h),
          Xo(a.steel, N(O[B]), H(O[B + 1]), 1.3, 1.3, h),
          Ha(
            a.steel,
            I.x,
            I.z,
            I.ux,
            I.uz,
            2.2,
            A - 2.5,
            O[B + 1] - 1.6,
            O[B + 1] + 1.6,
            c,
          ));
      }
      Ha(a.steel, I.x, I.z, I.ux, I.uz, 2.6, A - 2.5, I.y - 16, I.y - 12, c);
      for (let B of [-1, 1])
        Ha(
          a.steel,
          I.x + L * A * B,
          I.z + F * A * B,
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
      let C = z(ts.center);
      (Ha(a.concrete, C.x, C.z, C.ux, C.uz, 26, 30, -14, C.y - 14, f),
        Ha(a.concrete, C.x, C.z, C.ux, C.uz, 20, A + 3, C.y + 2, E + 4, f),
        Ha(a.concrete, C.x, C.z, C.ux, C.uz, 14, A - 1, E + 4, E + 9, u));
    }
    for (let C of [ts.anch, ts.anchE]) {
      let I = z(C);
      Ha(a.concrete, I.x, I.z, I.ux, I.uz, 18, 24, -12, I.y - 13, f);
    }
    for (let C of [-1, 1]) {
      for (let [I, , , L] of R) {
        let F = null;
        for (let O = I; O <= L + 0.1; O += 8) {
          let B = z(O),
            H = [B.x - B.uz * A * C, P(O), B.z + B.ux * A * C];
          (F && Xo(a.steel, F, H, 0.8, 0.8, h), (F = H));
        }
      }
      for (let I = ts.anch + 12; I < ts.anchE - 5; I += 12) {
        if (
          ts.towers.some((O) => Math.abs(I - O) < 7) ||
          Math.abs(I - ts.center) < 26
        )
          continue;
        let L = z(I),
          F = P(I);
        F - L.y < 1.5 ||
          Xo(
            a.steel,
            [L.x - L.uz * (A - 0.2) * C, L.y + 0.5, L.z + L.ux * (A - 0.2) * C],
            [L.x - L.uz * A * C, F, L.z + L.ux * A * C],
            0.1,
            0.1,
            h,
          );
      }
    }
    for (let C of [-1, 1]) {
      let I = null,
        L = null;
      for (let F = ts.anch - 30, O = 0; F <= ts.anchE + 30; F += 12, O++) {
        let B = z(F),
          H = 13 * C,
          N = [B.x - B.uz * H, B.y - 1.3, B.z + B.ux * H],
          D = [B.x - B.uz * H, B.y - 13, B.z + B.ux * H];
        (I &&
          (Xo(a.steel, I, N, 0.7, 1, c),
          Xo(a.steel, L, D, 0.7, 1, c),
          Xo(a.steel, O % 2 ? I : L, O % 2 ? D : N, 0.45, 0.45, h)),
          Xo(a.steel, N, D, 0.45, 0.45, h),
          (I = N),
          (L = D));
      }
    }
    for (let C = ts.anch - 30; C < ts.anchE + 30; C += 40) {
      let I = z(C + 20);
      Ha(a.concrete, I.x, I.z, I.ux, I.uz, 20, 12.5, I.y - 13.4, I.y - 12.6, u);
    }
    {
      let C = w.end,
        I = z(ts.anchE + 90);
      (Ha(
        a.concrete,
        C[0] + I.ux * (w.plaza + 4),
        C[2] + I.uz * (w.plaza + 4),
        I.ux,
        I.uz,
        4,
        22,
        C[1] - 2,
        C[1] + 14,
        f,
      ),
        Ha(
          a.concrete,
          C[0] + I.ux * (w.plaza + 2.2),
          C[2] + I.uz * (w.plaza + 2.2),
          I.ux,
          I.uz,
          0.6,
          9,
          C[1],
          C[1] + 7.5,
          [0.05, 0.05, 0.05, 0],
        ));
    }
  }
  let S = (w, _, z, A = !0) => {
    if (w.empty) return;
    let T = new ye(w.geometry(), _);
    ((T.name = z),
      (T.castShadow = A),
      (T.receiveShadow = !0),
      (T.matrixAutoUpdate = !1),
      T.updateMatrix(),
      t.add(T));
  };
  return (
    S(a.land, o.walk, "Land", !1),
    S(a.road, o.road, "HighwayDeck", !1),
    S(a.orange, i.orange, "GoldenGate"),
    S(a.steel, i.steel, "BayBridge"),
    S(a.concrete, i.concrete, "HighwayConcrete"),
    { group: t, colliders: e, inst: s }
  );
}
