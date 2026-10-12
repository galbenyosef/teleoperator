// app 159 — math
// Lines 97084-97416 of readable/app.pretty.js (statement-aligned).
function Yj(i) {
  if (i.paintPrepped) return;
  ((i.paintPrepped = !0), wdt(i));
  let t = new Map(),
    e = {},
    s = {};
  for (let a of i.edges)
    if (!a.inner && !a.oneway && !a.elev && Fj.has(a.name)) {
      let r = t.get(a.name);
      (r || t.set(a.name, (r = [])), r.push(a));
    }
  let n = 0;
  for (let a of i.edges) {
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
      if ((vs(u, l, c, d), !(d.d < 40))) continue;
      let p = 0;
      for (let m = 0; m < 5; m++)
        (Ot(a, a.s0 + ((a.s1 - a.s0) * (m + 0.5)) / 5, e),
          Kj(u, e.x, e.z, s),
          s.s > -2 &&
            s.s < u.L + 2 &&
            Math.abs(s.v) < s.w - 0.5 &&
            (Ot(u, Math.min(u.L, Math.max(0, s.s)), d),
            Math.abs(e.dx * d.dx + e.dz * d.dz) > 0.95 && p++));
      p > f && ((f = p), (h = u));
    }
    h && f >= 3 && ((a.twin = h), n++);
  }
  let o = 0;
  for (let a of i.juns) {
    if (!a.polys.length || a.elev || a.layered) continue;
    let r = a.legs
        .filter(([N]) => !N.inner && !N.twin && !N.elev)
        .map(([N, B]) => {
          let H = B === "a" ? 1 : -1,
            O = Ot(N, B === "a" ? N.s0 : N.s1, {});
          return {
            E: N,
            end: B,
            x: O.x,
            z: O.z,
            dx: O.dx * H,
            dz: O.dz * H,
            w: O.w,
          };
        }),
      l = null,
      c = null,
      h = 0;
    for (let N = 0; N < r.length; N++)
      for (let B = N + 1; B < r.length; B++) {
        let H = r[N],
          O = r[B];
        if (
          H.E.oneway ||
          O.E.oneway ||
          !Fj.has(H.E.name) ||
          H.E.name !== O.E.name ||
          H.E.median !== O.E.median
        )
          continue;
        let D = O.x - H.x,
          U = O.z - H.z,
          G = Math.hypot(D, U);
        G < xdt ||
          G <= h ||
          (D * H.dx + U * H.dz) / G > -0.97 ||
          (D * O.dx + U * O.dz) / G < 0.97 ||
          Math.abs(H.w - O.w) > 1 ||
          ((l = H), (c = O), (h = G));
      }
    if (!l) continue;
    let f = (c.x - l.x) / h,
      u = (c.z - l.z) / h,
      d = -u,
      p = f,
      m = Math.min(l.w, c.w),
      g = (N, B) => {
        let H = !1;
        for (let O of a.polys)
          for (let D of O) {
            let U = D.pts,
              G = U.length / 2;
            for (let q = 0, W = G - 1; q < G; W = q++) {
              let V = U[q * 2 + 1],
                Y = U[W * 2 + 1];
              V > B != Y > B &&
                N < U[W * 2] + ((U[q * 2] - U[W * 2]) * (B - Y)) / (V - Y) &&
                (H = !H);
            }
          }
        return H;
      },
      b = r.filter((N) => N !== l && N !== c),
      x = {},
      v = (N, B) => {
        let H = l.x + f * N + d * B,
          O = l.z + u * N + p * B;
        if (g(H, O)) return !0;
        for (let D of b)
          if (
            (vs(D.E, H, O, x),
            x.d < x.w + 0.1 && x.s >= D.E.s0 && x.s <= D.E.s1)
          )
            return !0;
        return !1;
      },
      y = m + 4.5,
      M = m / y,
      S = (N) => {
        let B = [],
          H = null;
        for (let O = -4; O <= h + 4; O += 0.25) {
          let D = v(O, N * y);
          D && H === null
            ? (H = O)
            : !D && H !== null && (B.push([H, O - 0.25]), (H = null));
        }
        return (
          H !== null && B.push([H, h + 4]),
          B.filter(([O, D]) => D - O >= 3)
        );
      },
      w = S(-1),
      z = S(1),
      _ = new Set(),
      R = [];
    for (let N of w) {
      let B = null,
        H = 0;
      if (
        (z.forEach((G, q) => {
          let W = Math.min(N[1], G[1]) - Math.max(N[0], G[0]);
          !_.has(q) && W > H && ((H = W), (B = q));
        }),
        B === null)
      ) {
        R.push([N[0], N[0], N[1], N[1]]);
        continue;
      }
      _.add(B);
      let O = z[B],
        D = (N[0] + O[0]) / 2,
        U = (N[1] + O[1]) / 2;
      R.push([
        D + (N[0] - D) * M,
        D + (O[0] - D) * M,
        U + (N[1] - U) * M,
        U + (O[1] - U) * M,
      ]);
    }
    z.forEach((N, B) => {
      _.has(B) || R.push([N[0], N[0], N[1], N[1]]);
    });
    let T = !1,
      E = !1;
    R = R.filter((N) =>
      N[2] + N[3] < 6
        ? ((T = !0), !1)
        : N[0] + N[1] > 2 * h - 6
          ? ((E = !0), !1)
          : !0,
    ).sort((N, B) => N[0] + N[1] + N[2] + N[3] - (B[0] + B[1] + B[2] + B[3]));
    let A = 9,
      C = [];
    for (let N of R) {
      let B = C[C.length - 1];
      B && (N[0] < B[2] + A || N[1] < B[3] + A)
        ? ((B[0] = Math.min(B[0], N[0])),
          (B[1] = Math.min(B[1], N[1])),
          (B[2] = Math.max(B[2], N[2])),
          (B[3] = Math.max(B[3], N[3])))
        : C.push(N.slice());
    }
    let P = (N, B) => ({ c: (N + B) / 2, k: (B - N) / (2 * m) }),
      I = C.length,
      L = [];
    for (let N = 0; N <= I; N++) {
      let B = N === 0 ? [0, 0] : [C[N - 1][2], C[N - 1][3]],
        H = N === I ? [h, h] : [C[N][0], C[N][1]],
        O = Math.min(H[0] - B[0], H[1] - B[1]) < 6.5,
        D =
          N === 0 && I
            ? l.E.lanes
            : N === I && I
              ? c.E.lanes
              : Math.max(l.E.lanes, c.E.lanes);
      L.push({
        a: P(...B),
        b: P(...H),
        xa: N > 0 && !O,
        xb: N < I && !O,
        lanes: Math.max(1, D),
        la: N === 0 ? l.E.lanes : D,
        lb: N === I ? c.E.lanes : D,
      });
    }
    let F = (N, B) => {
      B && (N.E.noX = (N.E.noX || 0) | (N.end === "a" ? 1 : 2));
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
        kind: Vh(l.E),
        tc: $j(l.E),
        bc: Ib(l.E),
        fl: (l.E.flags & ll.noPark) | 16 | (Vj(l.E) ? Wj : 0) | qj,
        M: C.map((N) => [P(N[0], N[1]), P(N[2], N[3])]),
        pieces: L,
      }),
      o++);
  }
  i.paintStats = { twins: n, juns: o };
}
function vdt(i, t, e) {
  let s = [],
    n = [],
    o = (a) => a.s - t - e * a.v;
  for (let a = 0; a < i.length; a++) {
    let r = i[a],
      l = i[(a + 1) % i.length],
      c = o(r),
      h = o(l);
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
function ydt(i, t, e) {
  let s = t.paint,
    n = [];
  for (let [l, c] of s.M) n.push(l, c);
  let o = s.pieces.map((l) =>
      Math.abs(l.a.k - l.b.k) > 0.02
        ? { c: (l.a.c + l.b.c) / 2, k: (l.a.k + l.b.k) / 2 }
        : null,
    ),
    a = n.concat(o.filter(Boolean)),
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
        x = g - s.ox,
        v = b - s.oz;
      return {
        x: g,
        z: b,
        y: d[m],
        s: x * s.ex + v * s.ez,
        v: x * s.nx + v * s.nz,
      };
    };
    for (let [m, g, b] of f) {
      let x = [[p(m), p(g), p(b)]];
      for (let v of a) {
        let y = [];
        for (let M of x) for (let S of vdt(M, v.c, v.k)) S && y.push(S);
        x = y;
      }
      for (let v of x) {
        let y = 0,
          M = 0;
        for (let R of v) ((y += R.s), (M += R.v));
        ((y /= v.length), (M /= v.length));
        let S = 0;
        for (let R of n) y > R.c + R.k * M && S++;
        let w, z;
        if (S & 1) {
          let R = n[S - 1];
          ((w = (T) => T.s - R.c - R.k * T.v),
            (z = r(
              10,
              s.fl | jj | 3,
              Math.max(s.pieces[0].lanes, s.pieces[s.pieces.length - 1].lanes),
            )));
        } else {
          let R = s.pieces[S / 2],
            T = o[S / 2],
            E = (R.b.c - R.a.c) / (T ? 2 : 1);
          T && y > T.c + T.k * M
            ? ((w = (A) => E - (R.b.c + R.b.k * A.v - A.s)),
              (z = r(E, s.fl | 1 | (R.xb ? 0 : 2), R.lb)))
            : T
              ? ((w = (A) => A.s - R.a.c - R.a.k * A.v),
                (z = r(E, s.fl | 2 | (R.xa ? 0 : 1), R.la)))
              : ((w = (A) => A.s - R.a.c - R.a.k * A.v),
                (z = r(E, s.fl | (R.xa ? 0 : 1) | (R.xb ? 0 : 2), R.lanes)));
        }
        let _ = i.v;
        for (let R of v) i.vert(R.x, R.y, R.z, 0, 1, 0, w(R), R.v, z);
        for (let R = 1; R + 1 < v.length; R++) nk(i, _, _ + R, _ + R + 1);
      }
    }
  }
}
