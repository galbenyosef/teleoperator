// app 244 — math
// Lines 124934-125286 of readable/app.pretty.js (statement-aligned).
function hvt(o, { max: t, map: e }) {
  let s = 32,
    n = () => (s = (s * 16807) % 2147483647) / 2147483647,
    i = new me({ color: 16777215, roughness: 0.8, metalness: 0, map: e });
  ((i.userData.mbAlbedo = pp),
    (i.userData.mbWind = -1),
    (i.userData.mbSkyVis = 2),
    (i.name = "lombard visitors"));
  let a = new le();
  a.name = "LombardCrowd";
  let r = o.F,
    l = i0() ? new Q0("LombardVox", t) : null;
  l && a.add(l.group);
  let c = l
      ? []
      : n0.map((w, _) =>
          [0, 1].map((z) => {
            let A = new En(dp(w, z), i, t);
            return (
              (A.count = 0),
              (A.frustumCulled = !1),
              (A.castShadow = z === 0),
              (A.receiveShadow = !0),
              (A.name = `lombped${_}_lod${z}`),
              (A.userData.mbMover = !0),
              (A.matrixAutoUpdate = !1),
              A.setColorAt(0, new It(1, 1, 1)),
              (A.visible = !1),
              a.add(A),
              A
            );
          }),
        ),
    h = avt(o),
    f = [],
    u = o.sides.filter((w) => w.runs.length),
    d = 0;
  for (let w = 0; w < t && u.length; w++) {
    let _ = Math.floor(n() * n0.length),
      z = 0.7 + n() * 0.45,
      A = {
        B: _,
        sc: 0.9 + n() * 0.17 - (n0[_].f ? 0.05 : 0),
        sw: 0.94 + n() * 0.14,
        seeds: [n(), n(), n()],
        speed: z,
        ph0: n() * 6.283,
        cad: (2 * Math.PI * z) / (1.3 * 0.95),
        pose: 0,
        st: "walk",
        u: 0,
        off: 0,
        dir: 1,
        t: 0,
        S: null,
      };
    if (w % 3 === 0 && h.length) {
      let T = h[Math.floor(n() * h.length)];
      ((A.S = T.side),
        (A.u = T.u + (n() - 0.5) * 0.8),
        (A.off = T.w - T.side.at(A.u)[0]),
        (A.st = "photo"),
        (A.t = 1e9));
      let E = (n() - 0.5) * 1.6 - T.side.sd * 0.6;
      ((A.hx = Math.cos(E)),
        (A.hz = Math.sin(E)),
        (A.pose = n() < 0.7 ? 3 : 2));
    } else {
      A.S = u[Math.floor(n() * u.length)];
      let T = A.S.runs[Math.floor(n() * A.S.runs.length)];
      ((A.R = T),
        (A.u = T.u0 + n() * (T.u1 - T.u0)),
        (A.dir = n() < 0.55 ? 1 : -1),
        (A.off = (n() - 0.5) * 0.7 * A.S.HW[0]));
    }
    if (
      f.some(
        (T) =>
          T.S === A.S &&
          Math.hypot(
            T.u - A.u,
            T.off + A.S.at(T.u)[0] - A.off - A.S.at(A.u)[0],
          ) < 0.8,
      )
    ) {
      ++d < 80 && w--;
      continue;
    }
    f.push(A);
  }
  let p = new qo(),
    m = new fe(),
    g = new _n(new dt(), 1.2),
    b = new fe().copy(o.F.matrix()).invert(),
    v = new dt(),
    x = { n: f.length, drawn: 0 };
  function y(w, _, z = null) {
    if (
      (v.copy(_.position).applyMatrix4(b),
      v.x < -rI || v.x > 150 + rI || Math.abs(v.z) > rI)
    ) {
      if (x.drawn) {
        for (let B of c) for (let H of B) ((H.count = 0), (H.visible = !1));
        (l?.hide(), (x.drawn = 0));
      }
      return;
    }
    w = Math.min(w, 0.1);
    let T = (B, H = B.u) => B.S.at(H)[0] + B.off,
      E = [],
      R = (B, H, N, D, U, G, W) => {
        let [V, $] = r.inv(B, H);
        if (V < -25 || V > 195 || Math.abs($) > 60) return;
        let [J, X] = r.inv(B - Math.sin(D), H - Math.cos(D));
        E.push({ x: V, z: $, fx: J - V, fz: X - $, hl: G, hw: W, y: N, sp: U });
      },
      P = Ea.env.car;
    P && P.psi !== void 0 && R(P.x, P.z, P.y, P.psi, P.sp || 0, 2.3, 1);
    for (let B of z?.cars || [])
      Number.isFinite(B.x) &&
        !B.hidden &&
        R(
          B.x,
          B.z,
          B.y,
          B.heading || 0,
          Math.abs(B.v || 0),
          (B.V?.L || 4.6) / 2,
          (B.V?.bw || 1.8) / 2,
        );
    let C = (B, H, N, D = 0.32, U = !1) => {
        let G = B.S.yAt(H);
        if (G === null) return null;
        for (let W of E) {
          if (Math.abs(G - W.y) > 0.9) continue;
          let V = U && W.sp > 0.5 ? 1.2 + W.sp * 0.25 : D,
            $ = H - W.x,
            J = B.S.at(H)[0] + N - W.z,
            X = $ * W.fx + J * W.fz,
            tt = $ * W.fz - J * W.fx;
          if (
            X > -(W.hl + V) &&
            X < W.hl + V + (U ? 4 + W.sp * 0.8 : 0) &&
            Math.abs(tt) < W.hw + V
          )
            return W;
        }
        return null;
      },
      I = (B, H, N, D = 0.32) => !!C(B, H, N, D),
      L = (B, H, N) => {
        if (I(B, H, N) && !I(B, B.u, B.off)) return !0;
        let D = B.S.at(H)[0] + N;
        for (let U of f) {
          if (U === B || U.S !== B.S) continue;
          let G = U.u - H,
            W = T(U) - D;
          if (
            Math.abs(G) < 0.7 &&
            Math.hypot(G, W) < 0.64 &&
            ((U.u - B.u) * B.dir > 0 ||
              Math.hypot(U.u - B.u, T(U) - T(B)) >= Math.hypot(G, W))
          )
            return !0;
        }
        return !1;
      };
    for (let B of f) {
      let H = C(B, B.u, B.off, 0.32, !0);
      if (H) {
        let N =
            B.u +
            Math.sign(B.u - H.x || 1) *
              Math.min(3.5, Math.max(2.5, H.sp + 1)) *
              w,
          D = f.some(
            (U) =>
              U !== B &&
              U.S === B.S &&
              Math.abs(U.u - N) < 0.7 &&
              Math.hypot(U.u - N, T(U) - T(B)) < 0.64 &&
              (U.u - B.u) * (N - B.u) > 0,
          )
            ? B.u
            : N;
        {
          let U = B.S.at(B.u)[1],
            G =
              Math.sign(B.S.at(B.u)[0] + B.off - H.z || 1) *
              Math.max(0, U - 0.3),
            W =
              B.off +
              Math.sign(G - B.off) * Math.min(Math.abs(G - B.off), 2 * w);
          f.some(
            (V) =>
              V !== B &&
              V.S === B.S &&
              Math.abs(V.u - B.u) < 0.7 &&
              Math.hypot(V.u - B.u, T(V) - (B.S.at(B.u)[0] + W)) < 0.64,
          ) || (B.off = W);
        }
        B.R ? D > B.R.u0 + 0.3 && D < B.R.u1 - 0.3 && (B.u = D) : (B.u = D);
        continue;
      }
      if (B.st === "walk") {
        let N = B.S.at(B.u)[1],
          D = B.dir * Math.max(0, N - 0.34),
          U =
            B.off +
            Math.sign(D - B.off) * Math.min(Math.abs(D - B.off), 0.35 * w);
        L(B, B.u, U) || (B.off = U);
        let G = B.u + B.dir * B.speed * (B.dir > 0 ? 1 : 0.8) * w;
        if (L(B, G, B.off)) {
          ((B.held = (B.held || 0) + w),
            (B.moving = !1),
            B.held > 2.5 && ((B.held = 0), (B.dir = -B.dir)));
          continue;
        }
        if (
          ((B.held = 0),
          (B.moving = !0),
          (B.u = G),
          (B.u > B.R.u1 - 0.3 || B.u < B.R.u0 + 0.3) &&
            ((B.dir = -B.dir),
            (B.u = Math.max(B.R.u0 + 0.3, Math.min(B.R.u1 - 0.3, B.u)))),
          n() < w * 0.04)
        ) {
          ((B.st = "pause"), (B.t = 3 + n() * 5), (B.pose = n() < 0.6 ? 3 : 2));
          let W = -B.S.sd * 1.2 + (n() - 0.5);
          ((B.hx = Math.cos(W)), (B.hz = Math.sin(W)));
        } else {
          let [W] = B.S.at(B.u),
            [V] = B.S.at(B.u + 0.5 * B.dir),
            $ = Math.hypot(0.5, V - W);
          ((B.hx = (0.5 * B.dir) / $), (B.hz = (V - W) / $));
        }
      } else
        B.st === "pause" && (B.t -= w) <= 0 && ((B.st = "walk"), (B.pose = 0));
    }
    if (
      (m.multiplyMatrices(_.projectionMatrix, _.matrixWorldInverse),
      p.setFromProjectionMatrix(m),
      l)
    ) {
      l.begin(w);
      for (let B of f) {
        let [H] = B.S.at(B.u),
          N = B.u,
          D = H + B.off,
          U = Math.hypot(N - v.x, D - v.z);
        if (U > dJ) continue;
        let G = B.S.yAt(B.u);
        if (G === null) continue;
        let [W, V] = r.fwd(N, D),
          [$, J] = r.vec(B.hx, B.hz);
        (g.center.set(W, G + 0.9, V),
          p.intersectsSphere(g) &&
            l.put(B, W, G, V, $, J, U, {
              speed:
                B.st === "walk" && B.moving !== !1
                  ? B.speed * (B.dir > 0 ? 1 : 0.8)
                  : 0,
              pose: B.st === "walk" ? 0 : B.pose,
              rnd: n,
            }));
      }
      (l.end(), (x.drawn = l.drawn));
      return;
    }
    let F = c.map(() => [0, 0]),
      O = 0;
    for (let B of f) {
      let [H] = B.S.at(B.u),
        N = B.u,
        D = H + B.off,
        U = Math.hypot(N - v.x, D - v.z);
      if (U > dJ) continue;
      let G = B.S.yAt(B.u);
      if (G === null) continue;
      let [W, V] = r.fwd(N, D),
        [$, J] = r.vec(B.hx, B.hz);
      if ((g.center.set(W, G + 0.9, V), !p.intersectsSphere(g))) continue;
      let X = U < cvt ? 0 : 1,
        tt = c[B.B][X],
        Z = F[B.B][X]++,
        q = tt.instanceMatrix.array,
        j = tt.instanceColor.array,
        K = Z * 16,
        nt = B.sc,
        Q = nt * B.sw,
        et = $,
        st = J,
        ot = B.st === "walk";
      ((q[K] = st * Q),
        (q[K + 1] = 0),
        (q[K + 2] = -et * Q),
        (q[K + 3] = B.ph0),
        (q[K + 4] = 0),
        (q[K + 5] = nt),
        (q[K + 6] = 0),
        (q[K + 7] = ot ? B.cad * B.speed : 0),
        (q[K + 8] = et * Q),
        (q[K + 9] = 0),
        (q[K + 10] = st * Q),
        (q[K + 11] = B.pose),
        (q[K + 12] = W),
        (q[K + 13] = G),
        (q[K + 14] = V),
        (q[K + 15] = 1),
        (j[Z * 3] = B.seeds[0]),
        (j[Z * 3 + 1] = B.seeds[1]),
        (j[Z * 3 + 2] = B.seeds[2]),
        O++);
    }
    (c.forEach((B, H) =>
      B.forEach((N, D) => {
        let U = F[H][D];
        ((N.count = U),
          (N.visible = U > 0),
          U &&
            ((N.instanceMatrix.needsUpdate = !0),
            (N.instanceColor.needsUpdate = !0)));
      }),
    ),
      (x.drawn = O));
  }
  let M = (w) => {
    let [_, z] = r.fwd(w.u, w.S.at(w.u)[0] + w.off);
    return [_, z, w.S.yAt(w.u) ?? 0];
  };
  function S(w) {
    let _ = w.fx ?? -Math.sin(w.heading || 0),
      z = w.fz ?? -Math.cos(w.heading || 0),
      A = w.V?.L || 4.6,
      T = w.V?.bw || 1.8,
      E = 1e9;
    for (let R of f) {
      let P = M(R);
      if (Math.abs(P[2] - (w.y ?? P[2])) > 1.2) continue;
      let C = P[0] - w.x,
        I = P[1] - w.z;
      if (Math.abs(C) > 32 || Math.abs(I) > 32) continue;
      let L = C * _ + I * z,
        F = Math.abs(C * z - I * _);
      L > -A / 2 &&
        L < Math.min(30, A / 2 + 3 + Math.abs(w.v || 0) * 1.5) &&
        F < T / 2 + 0.7 &&
        (E = Math.min(E, Math.max(0, L - A / 2 - 1.2)));
    }
    return E;
  }
  return { group: a, update: y, people: f, stats: x, bodies: M, yieldTo: S };
}
