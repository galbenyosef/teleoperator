// app 247 — math
// Lines 125331-125811 of readable/app.pretty.js (statement-aligned).
function Y2t(i, t, e) {
  let { colliders: s, inst: n } = i,
    o = e.P,
    a = X2t(o),
    r = Lk(o),
    l = bK * 2,
    c = 0.32,
    h = 0.2,
    f = 0.6,
    u = 0.52,
    d = ya.xa,
    p = e.len - ya.xbFromEnd,
    m = ya.wN,
    g = ya.wS,
    b = new Map(),
    x = new Map(),
    v = ($, st) => {
      let Q = Math.round($ * 10) * 1048573 + Math.round(st * 10),
        j = b.get(Q);
      if (j === void 0) {
        j = 9;
        for (let X of e.others) j = Math.min(j, pK(X.pts, $, st) - X.r);
        b.set(Q, j);
      }
      return j;
    },
    y = d - 2,
    M = ya.wNb - 2,
    S = 0.75,
    w = Math.ceil((p - d + 4) / S) + 1,
    z = Math.ceil((ya.wSb - ya.wNb + 4) / S) + 1,
    _ = new Float32Array(w * z);
  for (let $ = 0; $ < z; $++)
    for (let st = 0; st < w; st++) _[$ * w + st] = Yt(y + st * S, M + $ * S);
  let R = ($, st) => {
      let Q = ($ - y) / S,
        j = (st - M) / S,
        X = Math.floor(Q),
        K = Math.floor(j);
      if (X < 0 || K < 0 || X >= w - 1 || K >= z - 1) {
        let lt = Math.round($ * 20) * 1048573 + Math.round(st * 20),
          ct = x.get(lt);
        return (ct === void 0 && x.set(lt, (ct = Yt($, st))), ct);
      }
      let nt = Q - X,
        Z = j - K,
        et = _[K * w + X],
        tt = _[K * w + X + 1],
        it = _[(K + 1) * w + X],
        rt = _[(K + 1) * w + X + 1];
      return (
        (et * (1 - nt) + tt * nt) * (1 - Z) + (it * (1 - nt) + rt * nt) * Z
      );
    },
    T = K2t(i.rc, e.F, e.len),
    E = ($, st) => {
      let Q = 9;
      for (let j of e.others) Q = Math.min(Q, pK(j.pts, $, st) - j.rw);
      return Q;
    },
    A = performance.now(),
    C = fK(e, {
      ground: R,
      d: a,
      clear: E,
      front: T,
      CURB: Ke,
      xa: d,
      xb: p,
      rin: l / 2 + c + 0.33,
    }),
    P = performance.now(),
    [I, L] = C.sides,
    F = ($) => {
      let [st, Q] = I.at($);
      return Math.max(ya.wNb + 1, st + Q + 0.1);
    },
    N = ($) => {
      let [st, Q] = L.at($);
      return Math.min(ya.wSb - 1, st - Q - 0.1);
    };
  (s.push(...uK(C)),
    (mK = dK(C, { d: a, front: T, ground: R, xa: d, xb: p, clear: E })));
  {
    let [$, st] = e.F.fwd(e.len / 2, 0);
    dl.set(C, mK, t.M, [$, st]);
  }
  globalThis.process?.env?.LWT &&
    console.log(
      "walk plan ms",
      (P - A).toFixed(1),
      (performance.now() - P).toFixed(1),
    );
  let B = ($, st) =>
      $ > d + 0.3 && $ < p - 0.3 && st > F($) && st < N($) && v($, st) > 0,
    H = ($, st) => {
      let Q = a($, st);
      return (
        R($, st) +
        h +
        0.03 +
        0.28 * Math.min(1, Math.max(0, (Q - l / 2 - 1.2) / 3)) ** 1.5
      );
    },
    O = ($, st) => {
      let Q = H($, st);
      for (let [j, X] of [
        [st - F($), I],
        [N($) - st, L],
      ]) {
        if (j > 3) continue;
        let K = X.yAt($);
        if (K === null || K - 0.3 <= Q) continue;
        let nt = Math.max(0, Math.min(1, 1 - j / 3));
        Q += (K - 0.3 - Q) * nt * nt * (3 - 2 * nt);
      }
      return Q;
    },
    D = ($) => t.G("lombard", $);
  Aa(
    D("ground"),
    d + 0.25,
    ya.wNb,
    p - 0.25,
    ya.wSb,
    0.35,
    ($, st) => {
      let Q = Math.min(st - F($), N($) - st, $ - d - 0.3, p - 0.3 - $);
      return Q < -0.4
        ? Q
        : Math.min(Q, a($, st) - (l / 2 + c - 0.04), v($, st));
    },
    O,
    ($, st) => [
      0.95 + 0.1 * Ws(Math.floor($), Math.floor(st)),
      0.95,
      0.95,
      To.bed,
    ],
  );
  let U = [0.95, 0.95, 0.93, hi.granite],
    G = [0.78, 0.92, 0.74, hi.hedge];
  for (let $ of [-1, 1]) {
    let st = null,
      Q = 0;
    for (let j of r) {
      let X = (l / 2) * $,
        K = (l / 2 + c) * $,
        nt = [j.x + j.nx * X, j.z + j.nz * X],
        Z = [j.x + j.nx * K, j.z + j.nz * K],
        et = {
          f: j,
          p0: nt,
          p1: Z,
          ok:
            (B(Z[0], Z[1]) || B(nt[0], nt[1])) &&
            a(Z[0], Z[1]) > l / 2 + c - 0.1,
        };
      if (st && st.ok && et.ok) {
        let tt = R(st.p0[0], st.p0[1]),
          it = R(et.p0[0], et.p0[1]),
          rt = R(st.p1[0], st.p1[1]),
          lt = R(et.p1[0], et.p1[1]),
          ct = [-j.nx * $, 0, -j.nz * $];
        (js(
          D("wall"),
          [st.p0[0], tt - 0.05, st.p0[1]],
          [et.p0[0], it - 0.05, et.p0[1]],
          [et.p0[0], it + h, et.p0[1]],
          [st.p0[0], tt + h, st.p0[1]],
          [st.f.s, 0],
          [j.s, 0],
          [j.s, h],
          [st.f.s, h],
          U,
          ct,
        ),
          js(
            D("wall"),
            [st.p0[0], tt + h, st.p0[1]],
            [et.p0[0], it + h, et.p0[1]],
            [et.p1[0], lt + h + 0.02, et.p1[1]],
            [st.p1[0], rt + h + 0.02, st.p1[1]],
            [st.f.s, h],
            [j.s, h],
            [j.s, h + c],
            [st.f.s, h + c],
            U,
            [0, 1, 0],
          ));
        let dt = (l / 2 + c - 0.03) * $,
          ut = (l / 2 + c - 0.03 + f) * $,
          ot = (jt, Wt) => [jt.x + jt.nx * Wt, jt.z + jt.nz * Wt],
          at = ot(st.f, dt),
          yt = ot(st.f, ut),
          vt = ot(j, dt),
          Pt = ot(j, ut);
        if (
          B(yt[0], yt[1]) &&
          B(Pt[0], Pt[1]) &&
          yt[1] > F(yt[0]) + 0.15 &&
          yt[1] < N(yt[0]) - 0.15 &&
          Pt[1] > F(Pt[0]) + 0.15 &&
          Pt[1] < N(Pt[0]) - 0.15 &&
          a(yt[0], yt[1]) > l / 2 + c + f - 0.2 &&
          a(Pt[0], Pt[1]) > l / 2 + c + f - 0.2
        ) {
          let jt = O(...at) - 0.05,
            Wt = O(...vt) - 0.05,
            Ct = [
              [0, 0],
              [0.02, u * 0.93],
              [0.09, u],
              [0.51, u],
              [0.58, u * 0.93],
              [0.6, 0],
            ],
            qt = (Zt, he, ee, [Xt, me]) => [
              Zt[0] + ((he[0] - Zt[0]) * Xt) / f,
              ee + me,
              Zt[1] + ((he[1] - Zt[1]) * Xt) / f,
            ];
          for (let Zt = 0; Zt + 1 < Ct.length; Zt++) {
            let he = Ct.slice(0, Zt + 1).reduce(
                (os, Dt, qe) =>
                  os +
                  (qe
                    ? Math.hypot(Dt[0] - Ct[qe - 1][0], Dt[1] - Ct[qe - 1][1])
                    : 0),
                0,
              ),
              ee =
                he +
                Math.hypot(
                  Ct[Zt + 1][0] - Ct[Zt][0],
                  Ct[Zt + 1][1] - Ct[Zt][1],
                ),
              Xt = (Ct[Zt][0] + Ct[Zt + 1][0]) / 2 - f / 2,
              me = Ct[Zt + 1][1] - Ct[Zt][1],
              re = [
                j.nx * $ * Math.sign(Xt) * Math.abs(me),
                Math.abs(Ct[Zt + 1][0] - Ct[Zt][0]) + 0.2,
                j.nz * $ * Math.sign(Xt) * Math.abs(me),
              ];
            js(
              D("wall"),
              qt(at, yt, jt, Ct[Zt]),
              qt(vt, Pt, Wt, Ct[Zt]),
              qt(vt, Pt, Wt, Ct[Zt + 1]),
              qt(at, yt, jt, Ct[Zt + 1]),
              [st.f.s, he],
              [j.s, he],
              [j.s, ee],
              [st.f.s, ee],
              G,
              re,
            );
          }
        }
      }
      if (
        et.ok &&
        ((Q += st ? Math.hypot(j.x - st.f.x, j.z - st.f.z) : 99), Q >= 1.2)
      ) {
        Q = 0;
        let tt = (l / 2 + 0.24) * $,
          it = j.x + j.nx * tt,
          rt = j.z + j.nz * tt,
          lt = Math.atan2(j.tx, j.tz);
        a(it, rt) > l / 2 + 0.1 &&
          s.push({
            t: "obb",
            x: it,
            z: rt,
            hx: 0.2,
            hz: 0.7,
            c: Math.cos(lt),
            s: Math.sin(lt),
            y0: R(it, rt) - 2,
            y1: R(it, rt) + 3,
            kerb: !0,
          });
      }
      st = et;
    }
  }
  for (let $ of [d + 0.3, p - 0.3]) {
    let st = $ < (d + p) / 2 ? -1 : 1;
    for (let Q = F($); Q < N($) - 0.01; Q += 0.5) {
      let j = Math.min(Q + 0.5, N($));
      if (a($, (Q + j) / 2) < l / 2 + c - 0.05 || v($, (Q + j) / 2) < 0)
        continue;
      let X = O($ - st * 0.05, Q),
        K = O($ - st * 0.05, j),
        nt = R($, Q) - 0.1;
      (js(
        D("wall"),
        [$, nt, Q],
        [$, nt, j],
        [$, K, j],
        [$, X, Q],
        [Q, nt],
        [j, nt],
        [j, K],
        [Q, X],
        U,
        [st, 0, 0],
      ),
        s.push({
          t: "obb",
          x: $ - st * 0.1,
          z: (Q + j) / 2,
          hx: 0.2,
          hz: 0.3,
          c: 1,
          s: 0,
          kerb: !0,
        }));
    }
  }
  let q = [0.8, 0.79, 0.77, hi.granite];
  for (let [$, st, Q] of [
    [F, I, -1],
    [N, L, 1],
  ])
    for (let j = d + 0.3; j < p - 0.3; j += 0.6) {
      let X = Math.min(j + 0.6, p - 0.3),
        K = $(j),
        nt = $(X);
      if (
        a((j + X) / 2, (K + nt) / 2) < l / 2 + c ||
        v((j + X) / 2, (K + nt) / 2) < 0
      )
        continue;
      let Z = st.yAt((j + X) / 2),
        et = O(j, K - Q * 0.02) + 0.08,
        tt = O(X, nt - Q * 0.02) + 0.08,
        it = Math.min(R(j, K), Z ?? 1e9) - 0.3,
        rt = Math.min(R(X, nt), Z ?? 1e9) - 0.3;
      (js(
        D("wall"),
        [j, it, K],
        [X, rt, nt],
        [X, tt, nt],
        [j, et, K],
        [j, it],
        [X, rt],
        [X, tt],
        [j, et],
        U,
        [0, 0, Q],
      ),
        js(
          D("wall"),
          [j, et, K - Q * 0.22],
          [X, tt, nt - Q * 0.22],
          [X, tt, nt + Q * 0.02],
          [j, et, K + Q * 0.02],
          [j, K],
          [X, nt],
          [X, nt + 0.24],
          [j, K + 0.24],
          q,
          [0, 1, 0],
        ));
    }
  let W = ka(4242),
    V = D("foliage"),
    Y = [];
  for (let $ = d + 1; $ < p - 1; $ += 0.95)
    for (let st = ya.wNb + 0.5; st < ya.wSb - 0.4; st += 0.95) {
      let Q = $ + (W() - 0.5) * 0.7,
        j = st + (W() - 0.5) * 0.7;
      if (
        j < F(Q) + 0.45 ||
        j > N(Q) - 0.45 ||
        a(Q, j) < l / 2 + c + f + 0.35 ||
        !B(Q, j) ||
        W() < 0.1
      )
        continue;
      let X = j < F(Q) + 1.4 || j > N(Q) - 1.4,
        K = W(),
        nt = Ws(Math.floor(Q / 3), Math.floor(j / 3), 5),
        Z =
          X && K < 0.3
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
        et = Z === 5 || Z === 6,
        tt = (et ? 0.8 : 0.75) + W() * (et ? 0.3 : 0.4),
        it = O(Q, j) - 0.12,
        rt = W() * Math.PI,
        lt = Y.filter(
          (ut) => Math.hypot(ut.x - Q, ut.z - j) < (ut.s + tt) * 0.625,
        ),
        ct = () =>
          lt.some((ut) =>
            [0, 1, 2].some((ot) =>
              [0, 1, 2].some((at) => {
                let yt = rt + (ot * Math.PI) / 3,
                  vt = ut.a + (at * Math.PI) / 3;
                return (
                  Math.abs(Math.cos(yt - vt)) > Math.cos(Math.PI / 30) &&
                  Math.abs(
                    (ut.x - Q) * Math.sin(yt) - (ut.z - j) * Math.cos(yt),
                  ) < 0.1
                );
              }),
            ),
          );
      for (let ut = 0; ut < 12 && ct(); ut++) rt += Math.PI * 0.095;
      Y.push({ x: Q, z: j, s: tt, a: rt });
      let dt = !et && W() < 0.15 ? [1.12, 0.88, 1.06] : [1, 1, 1];
      for (let ut = 0; ut < 3; ut++)
        Ga(V, [Q, it, j], rt + (ut * Math.PI) / 3, tt * 1.25, tt, Wa(Z), [
          ...dt,
          1,
        ]);
    }
  for (let $ = 0; $ < 14; $++) {
    if (($ % 2 === 0 && $ > 3) || $ < 2) continue;
    let st = d + 6 + $ * 9.3 + (W() - 0.5) * 2,
      Q = $ % 2 ? 1 : -1,
      j = Q > 0 ? N(st) - 1.2 : F(st) + 1.2;
    if (a(st, j) < l / 2 + 2 || !B(st, j)) continue;
    let X = O(st, j) - 0.1,
      K = 6.5 + W() * 3,
      nt = 0.75 + W() * 0.25;
    Qa(D("paint"), st, j, X, X + 1.2, 0.12, 0.09, 6, [0.25, 0.19, 0.13, 1]);
    for (let Z = 0; Z < 7; Z++) {
      let et = X + 0.4 + ((K - 0.4) * Z) / 7,
        tt = nt * 2 * Math.sin(Math.PI * (0.25 + 0.75 * (1 - Z / 7))) + 0.3;
      for (let it = 0; it < 3; it++)
        Ga(
          D("foliage"),
          [st, et, j],
          Z * 0.7 + (it * Math.PI) / 3,
          tt,
          (K / 7) * 1.9,
          Wa(3),
          [0.75, 0.85, 0.7, 1],
        );
    }
    s.push({ t: "circ", x: st, z: j, r: 0.35 });
  }
  for (let [$, st] of [
    [d + 5, L],
    [d + 40, I],
    [d + 72, L],
    [d + 104, I],
    [p - 4, L],
  ]) {
    let [Q, j] = st.at($),
      X = Q + st.sd * (j + 0.2);
    a($, X) < l / 2 + 1 ||
      v($, X) < 0 ||
      T($, st.sd) - Math.abs(X) < 0.2 ||
      (n.push({
        kind: "lamp",
        x: $,
        y: st.yAt($) ?? Yt($, X) + Ke,
        z: X,
        rot: st.sd > 0 ? Math.PI : 0,
      }),
      s.push({ t: "circ", x: $, z: X, r: 0.18 }));
  }
}
