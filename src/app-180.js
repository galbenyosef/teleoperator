// app 180 — math
// Lines 104679-104979 of readable/app.pretty.js (statement-aligned).
function K2t(o, t) {
  let e = CX.get(o);
  if (e && e.tex === t && e.n === o.bld.n) return e;
  let s = o.bld,
    n = s.n,
    i = Object.keys(t.fronts),
    a = Object.fromEntries(i.map((y, M) => [y, M])),
    r = (y, M = 0) => {
      let S = new y.constructor(n);
      return (M && S.fill(M), S.set(y), S);
    },
    l = e && e.tex === t ? e.n : 0;
  if (!l)
    e = {
      tex: t,
      n: 0,
      st: new Int8Array(n),
      g: new Int8Array(n).fill(-1),
      c: new Int16Array(n).fill(-1),
      m: new Uint8Array(n),
      tg: new Int32Array(n),
      shop: new Uint8Array(n),
      grid: new Map(),
      X: new Float32Array(n),
      Z: new Float32Array(n),
    };
  else {
    for (let y of ["st", "m", "tg", "shop", "X", "Z"]) e[y] = r(e[y]);
    ((e.g = r(e.g, -1)), (e.c = r(e.c, -1)));
  }
  let c = e.grid,
    h = e.X,
    f = e.Z,
    u = (y, M) => y * 4096 + M,
    d = i.length * 64 + 64,
    p = new Int32Array(d),
    m = new Int32Array(d),
    g = new Int8Array(d),
    b = [],
    v = (y, M, S) => {
      let w = y * y + M * M,
        _ = S * S;
      return w < _ * (1 - 1e-9)
        ? !0
        : w > _ * (1 + 1e-9)
          ? !1
          : Math.hypot(y, M) <= S;
    },
    x = (y, M, S) => {
      let w = y * y + M * M,
        _ = S * S;
      return w < _ * (1 - 1e-9)
        ? !0
        : w > _ * (1 + 1e-9)
          ? !1
          : Math.hypot(y, M) < S;
    };
  for (let y = l; y < n; y++) {
    let M = s.bRing[y],
      S = s.rStart[M],
      w = s.rStart[M + 1],
      _ = 0,
      z = 0,
      A = 0;
    for (let j = S; j < w; j++)
      if (((_ += s.pts[j * 2]), (z += s.pts[j * 2 + 1]), s.front[j] === 1)) {
        let K = j + 1 < w ? j + 1 : S;
        A = Math.max(
          A,
          Math.hypot(
            s.pts[K * 2] - s.pts[j * 2],
            s.pts[K * 2 + 1] - s.pts[j * 2 + 1],
          ),
        );
      }
    ((_ /= w - S), (z /= w - S), (h[y] = _), (f[y] = z));
    let T = s.seed[y],
      E = s.bF[y * 3 + 1] - s.bF[y * 3],
      R = s.roof && s.roofH[y] > 0.5 ? s.roof[y] : 0,
      P = Di(_, z),
      C = JX(t, T),
      I = ZX(s.bB[y * 5], E, P, C, R, Bn(T, 1));
    if (
      I === 6 &&
      (P === "fidi" || P === "jackson") &&
      E < 40 &&
      s.bB[y * 5 + 4] !== 2 &&
      !Ku[T] &&
      !QC[T]
    ) {
      let j = (C >> 3) & 7;
      ((j >= 1 && j <= 3) || (j === 0 && Bn(T, 61) < 0.65)) && (I = 2);
    }
    if (
      _ > -3490 &&
      _ < -3050 &&
      z > 1100 &&
      z < 1238 &&
      E <= 26 &&
      Math.abs(j5(s.pts.subarray(S * 2, w * 2))) > 1100
    ) {
      ((I = 6),
        mz.add(T),
        (e.shop[y] = t.fronts.shop?.cells.length ? 1 : 0),
        (e.st[y] = I),
        (e.tg[y] = C));
      continue;
    }
    ((e.st[y] = I), (e.tg[y] = C));
    let L = I === 2 || I === 5 || I === 6;
    ((e.shop[y] =
      t.fronts.shop?.cells.length &&
      L &&
      E >= 8 &&
      (C >> 8 > 0 || (I === 6 && PX.has(P) && Bn(T, 31) < 0.35))
        ? 1
        : 0),
      I === 8 &&
        E >= 4.4 &&
        E <= 12 &&
        t.fronts.shop?.cells.length &&
        (PX.has(P) || C >> 8 > 0) &&
        (e.shop[y] = 1));
    let F = sL[T],
      O =
        F !== void 0 && I === 0
          ? t.fronts.vic?.cells.find((j) => j.cell === F)
          : null,
      B = Ku[T],
      H = B?.g && t.fronts[B.g]?.cells.find((j) => j.cell === B.cell);
    if (H) {
      ((e.g[y] = a[B.g]), (e.c[y] = H.cell), (e.m[y] = 0));
      continue;
    }
    if (O) {
      ((e.g[y] = a.vic), (e.c[y] = O.cell), (e.m[y] = 0));
      let j = u(Math.floor(_ / 50), Math.floor(z / 50)),
        K = c.get(j);
      (K || c.set(j, (K = [])), K.push(y));
      continue;
    }
    let N = X2t(I, P, E, C);
    if (!N) continue;
    let D = [];
    for (let [j, K, nt] of N)
      for (let Q of t.fronts[j]?.cells || [])
        Q.style === K && D.push([j, Q, nt]);
    let U = D.filter(([, j]) => j.w <= Math.max(A, 4) * 2.2);
    if ((U.length && (D = U), !D.length)) continue;
    for (let j of b) ((p[j] = 0), (m[j] = 0), (g[j] = 0));
    b.length = 0;
    let G = Math.floor(_ / 50),
      W = Math.floor(z / 50);
    for (let j = -2; j <= 2; j++)
      for (let K = -2; K <= 2; K++) {
        let nt = c.get(u(G + j, W + K));
        if (nt)
          for (let Q of nt) {
            let et = h[Q] - _,
              st = f[Q] - z;
            if (!v(et, st, 100)) continue;
            let ot = e.g[Q] * 64 + e.c[Q];
            ot < 0 ||
              (p[ot] || b.push(ot),
              p[ot]++,
              x(et, st, 40) && (m[ot]++, (g[ot] = e.m[Q] + 1)));
          }
      }
    let V = null,
      $ = 1e9;
    for (let [j, K, nt] of D) {
      let Q = a[j] * 64 + K.cell,
        et =
          (p[Q] ? p[Q] + 100 * m[Q] : 0) +
          3 * (1 - nt) +
          0.9 * Bn(T, 40 + K.cell);
      et < $ && (($ = et), (V = [j, K, Q]));
    }
    let [J, X, tt] = V;
    ((e.g[y] = a[J]),
      (e.c[y] = X.cell),
      (e.m[y] = p[tt] && g[tt] ? 2 - g[tt] : Bn(T, 7) < 0.5 ? 1 : 0));
    let Z = u(G, W),
      q = c.get(Z);
    (q || c.set(Z, (q = [])), q.push(y));
  }
  return ((e.groups = i), (e.n = n), CX.set(o, e), e);
}
var Y2t = [
    "#6f9096",
    "#5a7898",
    "#8e99a3",
    "#46505c",
    "#8a765f",
    "#6a8a78",
    "#9fb3ba",
    "#627e9a",
    "#3a4450",
    "#7d9aa6",
  ].map(Ow),
  QC = { 24222973: 13 },
  mz = new Set();
function J2t(o, t, e, s, n, i) {
  let a = (n >> 3) & 7,
    r = Bn(o, 3);
  if (QC[o] !== void 0) return [QC[o], null];
  if (Ku[o]?.office !== void 0) return [Ku[o].office, null];
  if (mz.has(o)) return [3, null];
  let l = !1,
    c;
  if (
    (t === 2
      ? (l = !0)
      : t === 1
        ? (c = [0, 8])
        : t === 3
          ? (c = [1, 13, 7])
          : t === 4
            ? (c = [2, 6, 11, 12, 14])
            : a >= 6
              ? ((l = r < 0.75), (c = [14, 12, 7]))
              : a === 5
                ? ((l = r < 0.35), (c = [2, 3, 11, 12, 13]))
                : a === 4
                  ? ((l = r < 0.25), (c = [1, 10, 3, 13]))
                  : a >= 1
                    ? (c = [0, 6, 8, 9, 15])
                    : e === "towers"
                      ? ((l = r < 0.7), (c = [14, 12, 13, 7]))
                      : s >= 120
                        ? ((l = r < 0.55), (c = [1, 2, 11, 12, 13, 14, 10]))
                        : s >= 45
                          ? ((l = r < 0.35),
                            (c = [
                              0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                            ]))
                          : (c = [0, 6, 8, 9, 15, 2, 7, 1]),
    l)
  )
    return [16 + Math.floor(Bn(o, 12) * 8), Jm(Y2t, Bn(o, 13))];
  let h = c[Math.floor(Bn(o, 14) * c.length) % c.length];
  return (h >= i && (h = [0, 6, 1, 2, 2, 1, 7, 6][h - 8]), [h, null]);
}
function QX(o, t) {
  if (o._lk && o._lk.tex === t) return o._lk;
  let e = Bn(o.seed, 1),
    s = o.top - o.base,
    n = o.cx ?? Ef(o.rings[0])[0],
    i = o.cz ?? Ef(o.rings[0])[1],
    a = Di(n, i),
    r = t?.fronts && pc && pc.bld.seed[o.i] === o.seed ? K2t(pc, t) : null,
    l = r ? r.tg[o.i] : JX(t, o.seed),
    c = r ? r.st[o.i] : ZX(o.st, s, a, l, o.rs, e),
    h = null,
    f = null,
    u = 0;
  r &&
    r.g[o.i] >= 0 &&
    ((h = r.groups[r.g[o.i]]),
    (f = t.fronts[h].cells.find((v) => v.cell === r.c[o.i]) || null),
    (u = r.m[o.i]));
  let d = f?.style === "mar",
    [p, m] = J2t(o.seed, o.mat, a, s, l, t?.office?.length || 8),
    g = Ku[o.seed]?.wall
      ? Ku[o.seed].wall
      : mz.has(o.seed)
        ? [0.78, 0.77, 0.73]
        : m && c === 6
          ? m
          : o.col ||
            (c === 0
              ? Jm(_X, e)
              : c === 1
                ? e < 0.5 && !d
                  ? Jm(_X, e * 2)
                  : Jm(EX, e)
                : Jm(c === 5 ? W2t : c === 6 ? q2t : EX, e)),
    b = r?.shop[o.i] ? t.fronts.shop.cells : null;
  if (
    (c === 0 || c === 1 || c === 2 || c === 3) &&
    tL.has(a) &&
    !Ku[o.seed]?.wall
  ) {
    let v = (g[0] + g[1] + g[2]) / 3;
    g = g.map((x, y) => (x * 0.75 + v * 0.25) * [0.9, 0.96, 1.08][y]);
  }
  return (o._lk = {
    tex: t,
    st: c,
    wall: g,
    cool: tL.has(a),
    group: h,
    cell: f,
    mirror: u,
    office: p,
    glass: !!m,
    shopCells: b,
    r: e,
    tg: l,
  });
}
