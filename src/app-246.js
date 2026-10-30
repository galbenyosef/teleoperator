// app 246 — math
// Lines 125590-126070 of readable/app.pretty.js (statement-aligned).
function yvt(o, t, e) {
  let { colliders: s, inst: n } = o,
    i = e.P,
    a = xvt(i),
    r = Lz(i),
    l = yJ * 2,
    c = 0.32,
    h = 0.2,
    f = 0.6,
    u = 0.52,
    d = Aa.xa,
    p = e.len - Aa.xbFromEnd,
    m = Aa.wN,
    g = Aa.wS,
    b = new Map(),
    v = new Map(),
    x = (X, tt) => {
      let Z = Math.round(X * 10) * 1048573 + Math.round(tt * 10),
        q = b.get(Z);
      if (q === void 0) {
        q = 9;
        for (let j of e.others) q = Math.min(q, bJ(j.pts, X, tt) - j.r);
        b.set(Z, q);
      }
      return q;
    },
    y = d - 2,
    M = Aa.wNb - 2,
    S = 0.75,
    w = Math.ceil((p - d + 4) / S) + 1,
    _ = Math.ceil((Aa.wSb - Aa.wNb + 4) / S) + 1,
    z = new Float32Array(w * _);
  for (let X = 0; X < _; X++)
    for (let tt = 0; tt < w; tt++) z[X * w + tt] = $t(y + tt * S, M + X * S);
  let A = (X, tt) => {
      let Z = (X - y) / S,
        q = (tt - M) / S,
        j = Math.floor(Z),
        K = Math.floor(q);
      if (j < 0 || K < 0 || j >= w - 1 || K >= _ - 1) {
        let lt = Math.round(X * 20) * 1048573 + Math.round(tt * 20),
          ht = v.get(lt);
        return (ht === void 0 && v.set(lt, (ht = $t(X, tt))), ht);
      }
      let nt = Z - j,
        Q = q - K,
        et = z[K * w + j],
        st = z[K * w + j + 1],
        ot = z[(K + 1) * w + j],
        rt = z[(K + 1) * w + j + 1];
      return (
        (et * (1 - nt) + st * nt) * (1 - Q) + (ot * (1 - nt) + rt * nt) * Q
      );
    },
    T = vvt(o.rc, e.F, e.len),
    E = (X, tt) => {
      let Z = 9;
      for (let q of e.others) Z = Math.min(Z, bJ(q.pts, X, tt) - q.rw);
      return Z;
    },
    R = performance.now(),
    P = pJ(e, {
      ground: A,
      d: a,
      clear: E,
      front: T,
      CURB: Ze,
      xa: d,
      xb: p,
      rin: l / 2 + c + 0.33,
    }),
    C = performance.now(),
    [I, L] = P.sides,
    F = (X) => {
      let [tt, Z] = I.at(X);
      return Math.max(Aa.wNb + 1, tt + Z + 0.1);
    },
    O = (X) => {
      let [tt, Z] = L.at(X);
      return Math.min(Aa.wSb - 1, tt - Z - 0.1);
    };
  (s.push(...mJ(P)),
    (xJ = gJ(P, { d: a, front: T, ground: A, xa: d, xb: p, clear: E })));
  {
    let [X, tt] = e.F.fwd(e.len / 2, 0);
    Fl.set(P, xJ, t.M, [X, tt]);
  }
  globalThis.process?.env?.LWT &&
    console.log(
      "walk plan ms",
      (C - R).toFixed(1),
      (performance.now() - C).toFixed(1),
    );
  let B = (X, tt) =>
      X > d + 0.3 && X < p - 0.3 && tt > F(X) && tt < O(X) && x(X, tt) > 0,
    H = (X, tt) => {
      let Z = a(X, tt);
      return (
        A(X, tt) +
        h +
        0.03 +
        0.28 * Math.min(1, Math.max(0, (Z - l / 2 - 1.2) / 3)) ** 1.5
      );
    },
    N = (X, tt) => {
      let Z = H(X, tt);
      for (let [q, j] of [
        [tt - F(X), I],
        [O(X) - tt, L],
      ]) {
        if (q > 3) continue;
        let K = j.yAt(X);
        if (K === null || K - 0.3 <= Z) continue;
        let nt = Math.max(0, Math.min(1, 1 - q / 3));
        Z += (K - 0.3 - Z) * nt * nt * (3 - 2 * nt);
      }
      return Z;
    },
    D = (X) => t.G("lombard", X);
  Da(
    D("ground"),
    d + 0.25,
    Aa.wNb,
    p - 0.25,
    Aa.wSb,
    0.35,
    (X, tt) => {
      let Z = Math.min(tt - F(X), O(X) - tt, X - d - 0.3, p - 0.3 - X);
      return Z < -0.4
        ? Z
        : Math.min(Z, a(X, tt) - (l / 2 + c - 0.04), x(X, tt));
    },
    N,
    (X, tt) => [
      0.95 + 0.1 * js(Math.floor(X), Math.floor(tt)),
      0.95,
      0.95,
      Ho.bed,
    ],
  );
  let U = [0.95, 0.95, 0.93, yi.granite],
    G = [0.78, 0.92, 0.74, yi.hedge];
  for (let X of [-1, 1]) {
    let tt = null,
      Z = 0;
    for (let q of r) {
      let j = (l / 2) * X,
        K = (l / 2 + c) * X,
        nt = [q.x + q.nx * j, q.z + q.nz * j],
        Q = [q.x + q.nx * K, q.z + q.nz * K],
        et = {
          f: q,
          p0: nt,
          p1: Q,
          ok:
            (B(Q[0], Q[1]) || B(nt[0], nt[1])) &&
            a(Q[0], Q[1]) > l / 2 + c - 0.1,
        };
      if (tt && tt.ok && et.ok) {
        let st = A(tt.p0[0], tt.p0[1]),
          ot = A(et.p0[0], et.p0[1]),
          rt = A(tt.p1[0], tt.p1[1]),
          lt = A(et.p1[0], et.p1[1]),
          ht = [-q.nx * X, 0, -q.nz * X];
        ($s(
          D("wall"),
          [tt.p0[0], st - 0.05, tt.p0[1]],
          [et.p0[0], ot - 0.05, et.p0[1]],
          [et.p0[0], ot + h, et.p0[1]],
          [tt.p0[0], st + h, tt.p0[1]],
          [tt.f.s, 0],
          [q.s, 0],
          [q.s, h],
          [tt.f.s, h],
          U,
          ht,
        ),
          $s(
            D("wall"),
            [tt.p0[0], st + h, tt.p0[1]],
            [et.p0[0], ot + h, et.p0[1]],
            [et.p1[0], lt + h + 0.02, et.p1[1]],
            [tt.p1[0], rt + h + 0.02, tt.p1[1]],
            [tt.f.s, h],
            [q.s, h],
            [q.s, h + c],
            [tt.f.s, h + c],
            U,
            [0, 1, 0],
          ));
        let pt = (l / 2 + c - 0.03) * X,
          ut = (l / 2 + c - 0.03 + f) * X,
          it = (Ut, Gt) => [Ut.x + Ut.nx * Gt, Ut.z + Ut.nz * Gt],
          at = it(tt.f, pt),
          yt = it(tt.f, ut),
          vt = it(q, pt),
          At = it(q, ut);
        if (
          B(yt[0], yt[1]) &&
          B(At[0], At[1]) &&
          yt[1] > F(yt[0]) + 0.15 &&
          yt[1] < O(yt[0]) - 0.15 &&
          At[1] > F(At[0]) + 0.15 &&
          At[1] < O(At[0]) - 0.15 &&
          a(yt[0], yt[1]) > l / 2 + c + f - 0.2 &&
          a(At[0], At[1]) > l / 2 + c + f - 0.2
        ) {
          let Ut = N(...at) - 0.05,
            Gt = N(...vt) - 0.05,
            Pt = [
              [0, 0],
              [0.02, u * 0.93],
              [0.09, u],
              [0.51, u],
              [0.58, u * 0.93],
              [0.6, 0],
            ],
            Vt = (Kt, ue, ne, [jt, be]) => [
              Kt[0] + ((ue[0] - Kt[0]) * jt) / f,
              ne + be,
              Kt[1] + ((ue[1] - Kt[1]) * jt) / f,
            ];
          for (let Kt = 0; Kt + 1 < Pt.length; Kt++) {
            let ue = Pt.slice(0, Kt + 1).reduce(
                (ds, Nt, $e) =>
                  ds +
                  ($e
                    ? Math.hypot(Nt[0] - Pt[$e - 1][0], Nt[1] - Pt[$e - 1][1])
                    : 0),
                0,
              ),
              ne =
                ue +
                Math.hypot(
                  Pt[Kt + 1][0] - Pt[Kt][0],
                  Pt[Kt + 1][1] - Pt[Kt][1],
                ),
              jt = (Pt[Kt][0] + Pt[Kt + 1][0]) / 2 - f / 2,
              be = Pt[Kt + 1][1] - Pt[Kt][1],
              re = [
                q.nx * X * Math.sign(jt) * Math.abs(be),
                Math.abs(Pt[Kt + 1][0] - Pt[Kt][0]) + 0.2,
                q.nz * X * Math.sign(jt) * Math.abs(be),
              ];
            $s(
              D("wall"),
              Vt(at, yt, Ut, Pt[Kt]),
              Vt(vt, At, Gt, Pt[Kt]),
              Vt(vt, At, Gt, Pt[Kt + 1]),
              Vt(at, yt, Ut, Pt[Kt + 1]),
              [tt.f.s, ue],
              [q.s, ue],
              [q.s, ne],
              [tt.f.s, ne],
              G,
              re,
            );
          }
        }
      }
      if (
        et.ok &&
        ((Z += tt ? Math.hypot(q.x - tt.f.x, q.z - tt.f.z) : 99), Z >= 1.2)
      ) {
        Z = 0;
        let st = (l / 2 + 0.24) * X,
          ot = q.x + q.nx * st,
          rt = q.z + q.nz * st,
          lt = Math.atan2(q.tx, q.tz);
        a(ot, rt) > l / 2 + 0.1 &&
          s.push({
            t: "obb",
            x: ot,
            z: rt,
            hx: 0.2,
            hz: 0.7,
            c: Math.cos(lt),
            s: Math.sin(lt),
            y0: A(ot, rt) - 2,
            y1: A(ot, rt) + 3,
            kerb: !0,
          });
      }
      tt = et;
    }
  }
  for (let X of [d + 0.3, p - 0.3]) {
    let tt = X < (d + p) / 2 ? -1 : 1;
    for (let Z = F(X); Z < O(X) - 0.01; Z += 0.5) {
      let q = Math.min(Z + 0.5, O(X));
      if (a(X, (Z + q) / 2) < l / 2 + c - 0.05 || x(X, (Z + q) / 2) < 0)
        continue;
      let j = N(X - tt * 0.05, Z),
        K = N(X - tt * 0.05, q),
        nt = A(X, Z) - 0.1;
      ($s(
        D("wall"),
        [X, nt, Z],
        [X, nt, q],
        [X, K, q],
        [X, j, Z],
        [Z, nt],
        [q, nt],
        [q, K],
        [Z, j],
        U,
        [tt, 0, 0],
      ),
        s.push({
          t: "obb",
          x: X - tt * 0.1,
          z: (Z + q) / 2,
          hx: 0.2,
          hz: 0.3,
          c: 1,
          s: 0,
          kerb: !0,
        }));
    }
  }
  let W = [0.8, 0.79, 0.77, yi.granite];
  for (let [X, tt, Z] of [
    [F, I, -1],
    [O, L, 1],
  ])
    for (let q = d + 0.3; q < p - 0.3; q += 0.6) {
      let j = Math.min(q + 0.6, p - 0.3),
        K = X(q),
        nt = X(j);
      if (
        a((q + j) / 2, (K + nt) / 2) < l / 2 + c ||
        x((q + j) / 2, (K + nt) / 2) < 0
      )
        continue;
      let Q = tt.yAt((q + j) / 2),
        et = N(q, K - Z * 0.02) + 0.08,
        st = N(j, nt - Z * 0.02) + 0.08,
        ot = Math.min(A(q, K), Q ?? 1e9) - 0.3,
        rt = Math.min(A(j, nt), Q ?? 1e9) - 0.3;
      ($s(
        D("wall"),
        [q, ot, K],
        [j, rt, nt],
        [j, st, nt],
        [q, et, K],
        [q, ot],
        [j, rt],
        [j, st],
        [q, et],
        U,
        [0, 0, Z],
      ),
        $s(
          D("wall"),
          [q, et, K - Z * 0.22],
          [j, st, nt - Z * 0.22],
          [j, st, nt + Z * 0.02],
          [q, et, K + Z * 0.02],
          [q, K],
          [j, nt],
          [j, nt + 0.24],
          [q, K + 0.24],
          W,
          [0, 1, 0],
        ));
    }
  let V = Fa(4242),
    $ = D("foliage"),
    J = [];
  for (let X = d + 1; X < p - 1; X += 0.95)
    for (let tt = Aa.wNb + 0.5; tt < Aa.wSb - 0.4; tt += 0.95) {
      let Z = X + (V() - 0.5) * 0.7,
        q = tt + (V() - 0.5) * 0.7;
      if (
        q < F(Z) + 0.45 ||
        q > O(Z) - 0.45 ||
        a(Z, q) < l / 2 + c + f + 0.35 ||
        !B(Z, q) ||
        V() < 0.1
      )
        continue;
      let j = q < F(Z) + 1.4 || q > O(Z) - 1.4,
        K = V(),
        nt = js(Math.floor(Z / 3), Math.floor(q / 3), 5),
        Q =
          j && K < 0.3
            ? nt < 0.6
              ? 5
              : 6
            : K < 0.3
              ? 4
              : K < 0.55
                ? nt < 0.5
                  ? 0
                  : 1
                : K < 0.72
                  ? 7
                  : nt < 0.45
                    ? 1
                    : nt < 0.8
                      ? 0
                      : 4,
        et = Q === 5 || Q === 6,
        st = (et ? 0.8 : 0.75) + V() * (et ? 0.3 : 0.4),
        ot = N(Z, q) - 0.12,
        rt = V() * Math.PI,
        lt = J.filter(
          (ut) => Math.hypot(ut.x - Z, ut.z - q) < (ut.s + st) * 0.625,
        ),
        ht = () =>
          lt.some((ut) =>
            [0, 1, 2].some((it) =>
              [0, 1, 2].some((at) => {
                let yt = rt + (it * Math.PI) / 3,
                  vt = ut.a + (at * Math.PI) / 3;
                return (
                  Math.abs(Math.cos(yt - vt)) > Math.cos(Math.PI / 30) &&
                  Math.abs(
                    (ut.x - Z) * Math.sin(yt) - (ut.z - q) * Math.cos(yt),
                  ) < 0.1
                );
              }),
            ),
          );
      for (let ut = 0; ut < 12 && ht(); ut++) rt += Math.PI * 0.095;
      J.push({ x: Z, z: q, s: st, a: rt });
      let pt = !et && V() < 0.15 ? [1.12, 0.88, 1.06] : [1, 1, 1];
      for (let ut = 0; ut < 3; ut++)
        nr($, [Z, ot, q], rt + (ut * Math.PI) / 3, st * 1.25, st, ir(Q), [
          ...pt,
          1,
        ]);
    }
  for (let X = 0; X < 14; X++) {
    if ((X % 2 === 0 && X > 3) || X < 2) continue;
    let tt = d + 6 + X * 9.3 + (V() - 0.5) * 2,
      Z = X % 2 ? 1 : -1,
      q = Z > 0 ? O(tt) - 1.2 : F(tt) + 1.2;
    if (a(tt, q) < l / 2 + 2 || !B(tt, q)) continue;
    let j = N(tt, q) - 0.1,
      K = 6.5 + V() * 3,
      nt = 0.75 + V() * 0.25;
    mr(D("paint"), tt, q, j, j + 1.2, 0.12, 0.09, 6, [0.25, 0.19, 0.13, 1]);
    for (let Q = 0; Q < 7; Q++) {
      let et = j + 0.4 + ((K - 0.4) * Q) / 7,
        st = nt * 2 * Math.sin(Math.PI * (0.25 + 0.75 * (1 - Q / 7))) + 0.3;
      for (let ot = 0; ot < 3; ot++)
        nr(
          D("foliage"),
          [tt, et, q],
          Q * 0.7 + (ot * Math.PI) / 3,
          st,
          (K / 7) * 1.9,
          ir(3),
          [0.75, 0.85, 0.7, 1],
        );
    }
    s.push({ t: "circ", x: tt, z: q, r: 0.35 });
  }
  for (let [X, tt] of [
    [d + 5, L],
    [d + 40, I],
    [d + 72, L],
    [d + 104, I],
    [p - 4, L],
  ]) {
    let [Z, q] = tt.at(X),
      j = Z + tt.sd * (q + 0.2);
    a(X, j) < l / 2 + 1 ||
      x(X, j) < 0 ||
      T(X, tt.sd) - Math.abs(j) < 0.2 ||
      (n.push({
        kind: "lamp",
        x: X,
        y: tt.yAt(X) ?? $t(X, j) + Ze,
        z: j,
        rot: tt.sd > 0 ? Math.PI : 0,
      }),
      s.push({ t: "circ", x: X, z: j, r: 0.18 }));
  }
}
