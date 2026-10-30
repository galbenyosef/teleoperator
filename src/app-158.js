// app 158 — math
// Lines 97320-97652 of readable/app.pretty.js (statement-aligned).
function Q$(o) {
  if (o.paintPrepped) return;
  ((o.paintPrepped = !0), qmt(o));
  let t = new Map(),
    e = {},
    s = {};
  for (let a of o.edges)
    if (!a.inner && !a.oneway && !a.elev && N$.has(a.name)) {
      let r = t.get(a.name);
      (r || t.set(a.name, (r = [])), r.push(a));
    }
  let n = 0;
  for (let a of o.edges) {
    if (!a.oneway || a.inner || a.elev || !a.name || a.s1 - a.s0 < 1) continue;
    let r = t.get(a.name);
    if (!r) continue;
    Ot(a, (a.s0 + a.s1) / 2, e);
    let l = e.x,
      c = e.z,
      h = null,
      f = 0;
    for (let u of r) {
      if (u.layer !== a.layer) continue;
      let d = {};
      if ((ys(u, l, c, d), !(d.d < 40))) continue;
      let p = 0;
      for (let m = 0; m < 5; m++)
        (Ot(a, a.s0 + ((a.s1 - a.s0) * (m + 0.5)) / 5, e),
          Z$(u, e.x, e.z, s),
          s.s > -2 &&
            s.s < u.L + 2 &&
            Math.abs(s.v) < s.w - 0.5 &&
            (Ot(u, Math.min(u.L, Math.max(0, s.s)), d),
            Math.abs(e.dx * d.dx + e.dz * d.dz) > 0.95 && p++));
      p > f && ((f = p), (h = u));
    }
    h && f >= 3 && ((a.twin = h), n++);
  }
  let i = 0;
  for (let a of o.juns) {
    if (!a.polys.length || a.elev || a.layered) continue;
    let r = a.legs
        .filter(([O]) => !O.inner && !O.twin && !O.elev)
        .map(([O, B]) => {
          let H = B === "a" ? 1 : -1,
            N = Ot(O, B === "a" ? O.s0 : O.s1, {});
          return {
            E: O,
            end: B,
            x: N.x,
            z: N.z,
            dx: N.dx * H,
            dz: N.dz * H,
            w: N.w,
          };
        }),
      l = null,
      c = null,
      h = 0;
    for (let O = 0; O < r.length; O++)
      for (let B = O + 1; B < r.length; B++) {
        let H = r[O],
          N = r[B];
        if (
          H.E.oneway ||
          N.E.oneway ||
          !N$.has(H.E.name) ||
          H.E.name !== N.E.name ||
          H.E.median !== N.E.median
        )
          continue;
        let D = N.x - H.x,
          U = N.z - H.z,
          G = Math.hypot(D, U);
        G < Gmt ||
          G <= h ||
          (D * H.dx + U * H.dz) / G > -0.97 ||
          (D * N.dx + U * N.dz) / G < 0.97 ||
          Math.abs(H.w - N.w) > 1 ||
          ((l = H), (c = N), (h = G));
      }
    if (!l) continue;
    let f = (c.x - l.x) / h,
      u = (c.z - l.z) / h,
      d = -u,
      p = f,
      m = Math.min(l.w, c.w),
      g = (O, B) => {
        let H = !1;
        for (let N of a.polys)
          for (let D of N) {
            let U = D.pts,
              G = U.length / 2;
            for (let W = 0, V = G - 1; W < G; V = W++) {
              let $ = U[W * 2 + 1],
                J = U[V * 2 + 1];
              $ > B != J > B &&
                O < U[V * 2] + ((U[W * 2] - U[V * 2]) * (B - J)) / ($ - J) &&
                (H = !H);
            }
          }
        return H;
      },
      b = r.filter((O) => O !== l && O !== c),
      v = {},
      x = (O, B) => {
        let H = l.x + f * O + d * B,
          N = l.z + u * O + p * B;
        if (g(H, N)) return !0;
        for (let D of b)
          if (
            (ys(D.E, H, N, v),
            v.d < v.w + 0.1 && v.s >= D.E.s0 && v.s <= D.E.s1)
          )
            return !0;
        return !1;
      },
      y = m + 4.5,
      M = m / y,
      S = (O) => {
        let B = [],
          H = null;
        for (let N = -4; N <= h + 4; N += 0.25) {
          let D = x(N, O * y);
          D && H === null
            ? (H = N)
            : !D && H !== null && (B.push([H, N - 0.25]), (H = null));
        }
        return (
          H !== null && B.push([H, h + 4]),
          B.filter(([N, D]) => D - N >= 3)
        );
      },
      w = S(-1),
      _ = S(1),
      z = new Set(),
      A = [];
    for (let O of w) {
      let B = null,
        H = 0;
      if (
        (_.forEach((G, W) => {
          let V = Math.min(O[1], G[1]) - Math.max(O[0], G[0]);
          !z.has(W) && V > H && ((H = V), (B = W));
        }),
        B === null)
      ) {
        A.push([O[0], O[0], O[1], O[1]]);
        continue;
      }
      z.add(B);
      let N = _[B],
        D = (O[0] + N[0]) / 2,
        U = (O[1] + N[1]) / 2;
      A.push([
        D + (O[0] - D) * M,
        D + (N[0] - D) * M,
        U + (O[1] - U) * M,
        U + (N[1] - U) * M,
      ]);
    }
    _.forEach((O, B) => {
      z.has(B) || A.push([O[0], O[0], O[1], O[1]]);
    });
    let T = !1,
      E = !1;
    A = A.filter((O) =>
      O[2] + O[3] < 6
        ? ((T = !0), !1)
        : O[0] + O[1] > 2 * h - 6
          ? ((E = !0), !1)
          : !0,
    ).sort((O, B) => O[0] + O[1] + O[2] + O[3] - (B[0] + B[1] + B[2] + B[3]));
    let R = 9,
      P = [];
    for (let O of A) {
      let B = P[P.length - 1];
      B && (O[0] < B[2] + R || O[1] < B[3] + R)
        ? ((B[0] = Math.min(B[0], O[0])),
          (B[1] = Math.min(B[1], O[1])),
          (B[2] = Math.max(B[2], O[2])),
          (B[3] = Math.max(B[3], O[3])))
        : P.push(O.slice());
    }
    let C = (O, B) => ({ c: (O + B) / 2, k: (B - O) / (2 * m) }),
      I = P.length,
      L = [];
    for (let O = 0; O <= I; O++) {
      let B = O === 0 ? [0, 0] : [P[O - 1][2], P[O - 1][3]],
        H = O === I ? [h, h] : [P[O][0], P[O][1]],
        N = Math.min(H[0] - B[0], H[1] - B[1]) < 6.5,
        D =
          O === 0 && I
            ? l.E.lanes
            : O === I && I
              ? c.E.lanes
              : Math.max(l.E.lanes, c.E.lanes);
      L.push({
        a: C(...B),
        b: C(...H),
        xa: O > 0 && !N,
        xb: O < I && !N,
        lanes: Math.max(1, D),
        la: O === 0 ? l.E.lanes : D,
        lb: O === I ? c.E.lanes : D,
      });
    }
    let F = (O, B) => {
      B && (O.E.noX = (O.E.noX || 0) | (O.end === "a" ? 1 : 2));
    };
    (F(l, !T && (I === 0 || L[0].xb)),
      F(c, !E && (I === 0 || L[I].xa)),
      (a.paint = {
        ox: l.x,
        oz: l.z,
        ex: f,
        ez: u,
        nx: d,
        nz: p,
        hw: m,
        S: h,
        kind: kf(l.E),
        tc: Y$(l.E),
        bc: yx(l.E),
        fl: (l.E.flags & Al.noPark) | 16 | (K$(l.E) ? j$ : 0) | $$,
        M: P.map((O) => [C(O[0], O[1]), C(O[2], O[3])]),
        pieces: L,
      }),
      i++);
  }
  o.paintStats = { twins: n, juns: i };
}
function Vmt(o, t, e) {
  let s = [],
    n = [],
    i = (a) => a.s - t - e * a.v;
  for (let a = 0; a < o.length; a++) {
    let r = o[a],
      l = o[(a + 1) % o.length],
      c = i(r),
      h = i(l);
    if (((c <= 0 ? s : n).push(r), (c < 0 && h > 0) || (c > 0 && h < 0))) {
      let f = c / (c - h),
        u = {
          x: r.x + (l.x - r.x) * f,
          z: r.z + (l.z - r.z) * f,
          y: r.y + (l.y - r.y) * f,
          s: r.s + (l.s - r.s) * f,
          v: r.v + (l.v - r.v) * f,
        };
      (s.push(u), n.push(u));
    }
  }
  return [s.length >= 3 ? s : null, n.length >= 3 ? n : null];
}
function Wmt(o, t, e) {
  let s = t.paint,
    n = [];
  for (let [l, c] of s.M) n.push(l, c);
  let i = s.pieces.map((l) =>
      Math.abs(l.a.k - l.b.k) > 0.02
        ? { c: (l.a.c + l.b.c) / 2, k: (l.a.k + l.b.k) / 2 }
        : null,
    ),
    a = n.concat(i.filter(Boolean)),
    r = (l, c, h) => [
      s.hw / 32,
      (Math.max(0.5, l) + 4096 * c) / 256,
      s.kind,
      (Math.max(1, h) + 16 * (s.tc || 0) + 64 * (s.bc || 0)) / 4,
    ];
  for (let l of t.polys) {
    let c = l.map((m) => m.pts),
      h = l.map((m) => m.y),
      { tris: f, flat: u } = e(c),
      d = [];
    for (let m of h) for (let g = 0; g < m.length; g++) d.push(m[g]);
    let p = (m) => {
      let g = u[m * 2],
        b = u[m * 2 + 1],
        v = g - s.ox,
        x = b - s.oz;
      return {
        x: g,
        z: b,
        y: d[m],
        s: v * s.ex + x * s.ez,
        v: v * s.nx + x * s.nz,
      };
    };
    for (let [m, g, b] of f) {
      let v = [[p(m), p(g), p(b)]];
      for (let x of a) {
        let y = [];
        for (let M of v) for (let S of Vmt(M, x.c, x.k)) S && y.push(S);
        v = y;
      }
      for (let x of v) {
        let y = 0,
          M = 0;
        for (let A of x) ((y += A.s), (M += A.v));
        ((y /= x.length), (M /= x.length));
        let S = 0;
        for (let A of n) y > A.c + A.k * M && S++;
        let w, _;
        if (S & 1) {
          let A = n[S - 1];
          ((w = (T) => T.s - A.c - A.k * T.v),
            (_ = r(
              10,
              s.fl | X$ | 3,
              Math.max(s.pieces[0].lanes, s.pieces[s.pieces.length - 1].lanes),
            )));
        } else {
          let A = s.pieces[S / 2],
            T = i[S / 2],
            E = (A.b.c - A.a.c) / (T ? 2 : 1);
          T && y > T.c + T.k * M
            ? ((w = (R) => E - (A.b.c + A.b.k * R.v - R.s)),
              (_ = r(E, s.fl | 1 | (A.xb ? 0 : 2), A.lb)))
            : T
              ? ((w = (R) => R.s - A.a.c - A.a.k * R.v),
                (_ = r(E, s.fl | 2 | (A.xa ? 0 : 1), A.la)))
              : ((w = (R) => R.s - A.a.c - A.a.k * R.v),
                (_ = r(E, s.fl | (A.xa ? 0 : 1) | (A.xb ? 0 : 2), A.lanes)));
        }
        let z = o.v;
        for (let A of x) o.vert(A.x, A.y, A.z, 0, 1, 0, w(A), A.v, _);
        for (let A = 1; A + 1 < x.length; A++) nz(o, z, z + A, z + A + 1);
      }
    }
  }
}
