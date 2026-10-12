// app 245 — math
// Lines 124675-125027 of readable/app.pretty.js (statement-aligned).
function D2t(i, { max: t, map: e }) {
  let s = 32,
    n = () => (s = (s * 16807) % 2147483647) / 2147483647,
    o = new Ee({ color: 16777215, roughness: 0.8, metalness: 0, map: e });
  ((o.userData.mbAlbedo = Fd),
    (o.userData.mbWind = -1),
    (o.userData.mbSkyVis = 2),
    (o.name = "lombard visitors"));
  let a = new ke();
  a.name = "LombardCrowd";
  let r = i.F,
    l = Or() ? new R0("LombardVox", t) : null;
  l && a.add(l.group);
  let c = l
      ? []
      : Br.map((w, z) =>
          [0, 1].map((_) => {
            let R = new zn(Id(w, _), o, t);
            return (
              (R.count = 0),
              (R.frustumCulled = !1),
              (R.castShadow = _ === 0),
              (R.receiveShadow = !0),
              (R.name = `lombped${z}_lod${_}`),
              (R.userData.mbMover = !0),
              (R.matrixAutoUpdate = !1),
              R.setColorAt(0, new $t(1, 1, 1)),
              (R.visible = !1),
              a.add(R),
              R
            );
          }),
        ),
    h = N2t(i),
    f = [],
    u = i.sides.filter((w) => w.runs.length),
    d = 0;
  for (let w = 0; w < t && u.length; w++) {
    let z = Math.floor(n() * Br.length),
      _ = 0.7 + n() * 0.45,
      R = {
        B: z,
        sc: 0.9 + n() * 0.17 - (Br[z].f ? 0.05 : 0),
        sw: 0.94 + n() * 0.14,
        seeds: [n(), n(), n()],
        speed: _,
        ph0: n() * 6.283,
        cad: (2 * Math.PI * _) / (1.3 * 0.95),
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
      ((R.S = T.side),
        (R.u = T.u + (n() - 0.5) * 0.8),
        (R.off = T.w - T.side.at(R.u)[0]),
        (R.st = "photo"),
        (R.t = 1e9));
      let E = (n() - 0.5) * 1.6 - T.side.sd * 0.6;
      ((R.hx = Math.cos(E)),
        (R.hz = Math.sin(E)),
        (R.pose = n() < 0.7 ? 3 : 2));
    } else {
      R.S = u[Math.floor(n() * u.length)];
      let T = R.S.runs[Math.floor(n() * R.S.runs.length)];
      ((R.R = T),
        (R.u = T.u0 + n() * (T.u1 - T.u0)),
        (R.dir = n() < 0.55 ? 1 : -1),
        (R.off = (n() - 0.5) * 0.7 * R.S.HW[0]));
    }
    if (
      f.some(
        (T) =>
          T.S === R.S &&
          Math.hypot(
            T.u - R.u,
            T.off + R.S.at(T.u)[0] - R.off - R.S.at(R.u)[0],
          ) < 0.8,
      )
    ) {
      ++d < 80 && w--;
      continue;
    }
    f.push(R);
  }
  let p = new No(),
    m = new ye(),
    g = new _n(new xt(), 1.2),
    b = new ye().copy(i.F.matrix()).invert(),
    x = new xt(),
    v = { n: f.length, drawn: 0 };
  function y(w, z, _ = null) {
    if (
      (x.copy(z.position).applyMatrix4(b),
      x.x < -PC || x.x > 150 + PC || Math.abs(x.z) > PC)
    ) {
      if (v.drawn) {
        for (let B of c) for (let H of B) ((H.count = 0), (H.visible = !1));
        (l?.hide(), (v.drawn = 0));
      }
      return;
    }
    w = Math.min(w, 0.1);
    let T = (B, H = B.u) => B.S.at(H)[0] + B.off,
      E = [],
      A = (B, H, O, D, U, G, q) => {
        let [W, V] = r.inv(B, H);
        if (W < -25 || W > 195 || Math.abs(V) > 60) return;
        let [Y, $] = r.inv(B - Math.sin(D), H - Math.cos(D));
        E.push({ x: W, z: V, fx: Y - W, fz: $ - V, hl: G, hw: q, y: O, sp: U });
      },
      C = ba.env.car;
    C && C.psi !== void 0 && A(C.x, C.z, C.y, C.psi, C.sp || 0, 2.3, 1);
    for (let B of _?.cars || [])
      Number.isFinite(B.x) &&
        !B.hidden &&
        A(
          B.x,
          B.z,
          B.y,
          B.heading || 0,
          Math.abs(B.v || 0),
          (B.V?.L || 4.6) / 2,
          (B.V?.bw || 1.8) / 2,
        );
    let P = (B, H, O, D = 0.32, U = !1) => {
        let G = B.S.yAt(H);
        if (G === null) return null;
        for (let q of E) {
          if (Math.abs(G - q.y) > 0.9) continue;
          let W = U && q.sp > 0.5 ? 1.2 + q.sp * 0.25 : D,
            V = H - q.x,
            Y = B.S.at(H)[0] + O - q.z,
            $ = V * q.fx + Y * q.fz,
            st = V * q.fz - Y * q.fx;
          if (
            $ > -(q.hl + W) &&
            $ < q.hl + W + (U ? 4 + q.sp * 0.8 : 0) &&
            Math.abs(st) < q.hw + W
          )
            return q;
        }
        return null;
      },
      I = (B, H, O, D = 0.32) => !!P(B, H, O, D),
      L = (B, H, O) => {
        if (I(B, H, O) && !I(B, B.u, B.off)) return !0;
        let D = B.S.at(H)[0] + O;
        for (let U of f) {
          if (U === B || U.S !== B.S) continue;
          let G = U.u - H,
            q = T(U) - D;
          if (
            Math.abs(G) < 0.7 &&
            Math.hypot(G, q) < 0.64 &&
            ((U.u - B.u) * B.dir > 0 ||
              Math.hypot(U.u - B.u, T(U) - T(B)) >= Math.hypot(G, q))
          )
            return !0;
        }
        return !1;
      };
    for (let B of f) {
      let H = P(B, B.u, B.off, 0.32, !0);
      if (H) {
        let O =
            B.u +
            Math.sign(B.u - H.x || 1) *
              Math.min(3.5, Math.max(2.5, H.sp + 1)) *
              w,
          D = f.some(
            (U) =>
              U !== B &&
              U.S === B.S &&
              Math.abs(U.u - O) < 0.7 &&
              Math.hypot(U.u - O, T(U) - T(B)) < 0.64 &&
              (U.u - B.u) * (O - B.u) > 0,
          )
            ? B.u
            : O;
        {
          let U = B.S.at(B.u)[1],
            G =
              Math.sign(B.S.at(B.u)[0] + B.off - H.z || 1) *
              Math.max(0, U - 0.3),
            q =
              B.off +
              Math.sign(G - B.off) * Math.min(Math.abs(G - B.off), 2 * w);
          f.some(
            (W) =>
              W !== B &&
              W.S === B.S &&
              Math.abs(W.u - B.u) < 0.7 &&
              Math.hypot(W.u - B.u, T(W) - (B.S.at(B.u)[0] + q)) < 0.64,
          ) || (B.off = q);
        }
        B.R ? D > B.R.u0 + 0.3 && D < B.R.u1 - 0.3 && (B.u = D) : (B.u = D);
        continue;
      }
      if (B.st === "walk") {
        let O = B.S.at(B.u)[1],
          D = B.dir * Math.max(0, O - 0.34),
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
          let q = -B.S.sd * 1.2 + (n() - 0.5);
          ((B.hx = Math.cos(q)), (B.hz = Math.sin(q)));
        } else {
          let [q] = B.S.at(B.u),
            [W] = B.S.at(B.u + 0.5 * B.dir),
            V = Math.hypot(0.5, W - q);
          ((B.hx = (0.5 * B.dir) / V), (B.hz = (W - q) / V));
        }
      } else
        B.st === "pause" && (B.t -= w) <= 0 && ((B.st = "walk"), (B.pose = 0));
    }
    if (
      (m.multiplyMatrices(z.projectionMatrix, z.matrixWorldInverse),
      p.setFromProjectionMatrix(m),
      l)
    ) {
      l.begin(w);
      for (let B of f) {
        let [H] = B.S.at(B.u),
          O = B.u,
          D = H + B.off,
          U = Math.hypot(O - x.x, D - x.z);
        if (U > hK) continue;
        let G = B.S.yAt(B.u);
        if (G === null) continue;
        let [q, W] = r.fwd(O, D),
          [V, Y] = r.vec(B.hx, B.hz);
        (g.center.set(q, G + 0.9, W),
          p.intersectsSphere(g) &&
            l.put(B, q, G, W, V, Y, U, {
              speed:
                B.st === "walk" && B.moving !== !1
                  ? B.speed * (B.dir > 0 ? 1 : 0.8)
                  : 0,
              pose: B.st === "walk" ? 0 : B.pose,
              rnd: n,
            }));
      }
      (l.end(), (v.drawn = l.drawn));
      return;
    }
    let F = c.map(() => [0, 0]),
      N = 0;
    for (let B of f) {
      let [H] = B.S.at(B.u),
        O = B.u,
        D = H + B.off,
        U = Math.hypot(O - x.x, D - x.z);
      if (U > hK) continue;
      let G = B.S.yAt(B.u);
      if (G === null) continue;
      let [q, W] = r.fwd(O, D),
        [V, Y] = r.vec(B.hx, B.hz);
      if ((g.center.set(q, G + 0.9, W), !p.intersectsSphere(g))) continue;
      let $ = U < H2t ? 0 : 1,
        st = c[B.B][$],
        Q = F[B.B][$]++,
        j = st.instanceMatrix.array,
        X = st.instanceColor.array,
        K = Q * 16,
        nt = B.sc,
        Z = nt * B.sw,
        et = V,
        tt = Y,
        it = B.st === "walk";
      ((j[K] = tt * Z),
        (j[K + 1] = 0),
        (j[K + 2] = -et * Z),
        (j[K + 3] = B.ph0),
        (j[K + 4] = 0),
        (j[K + 5] = nt),
        (j[K + 6] = 0),
        (j[K + 7] = it ? B.cad * B.speed : 0),
        (j[K + 8] = et * Z),
        (j[K + 9] = 0),
        (j[K + 10] = tt * Z),
        (j[K + 11] = B.pose),
        (j[K + 12] = q),
        (j[K + 13] = G),
        (j[K + 14] = W),
        (j[K + 15] = 1),
        (X[Q * 3] = B.seeds[0]),
        (X[Q * 3 + 1] = B.seeds[1]),
        (X[Q * 3 + 2] = B.seeds[2]),
        N++);
    }
    (c.forEach((B, H) =>
      B.forEach((O, D) => {
        let U = F[H][D];
        ((O.count = U),
          (O.visible = U > 0),
          U &&
            ((O.instanceMatrix.needsUpdate = !0),
            (O.instanceColor.needsUpdate = !0)));
      }),
    ),
      (v.drawn = N));
  }
  let M = (w) => {
    let [z, _] = r.fwd(w.u, w.S.at(w.u)[0] + w.off);
    return [z, _, w.S.yAt(w.u) ?? 0];
  };
  function S(w) {
    let z = w.fx ?? -Math.sin(w.heading || 0),
      _ = w.fz ?? -Math.cos(w.heading || 0),
      R = w.V?.L || 4.6,
      T = w.V?.bw || 1.8,
      E = 1e9;
    for (let A of f) {
      let C = M(A);
      if (Math.abs(C[2] - (w.y ?? C[2])) > 1.2) continue;
      let P = C[0] - w.x,
        I = C[1] - w.z;
      if (Math.abs(P) > 32 || Math.abs(I) > 32) continue;
      let L = P * z + I * _,
        F = Math.abs(P * _ - I * z);
      L > -R / 2 &&
        L < Math.min(30, R / 2 + 3 + Math.abs(w.v || 0) * 1.5) &&
        F < T / 2 + 0.7 &&
        (E = Math.min(E, Math.max(0, L - R / 2 - 1.2)));
    }
    return E;
  }
  return { group: a, update: y, people: f, stats: v, bodies: M, yieldTo: S };
}
