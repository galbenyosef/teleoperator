// app 181 — math
// Lines 104443-104743 of readable/app.pretty.js (statement-aligned).
function _pt(i, t) {
  let e = AV.get(i);
  if (e && e.tex === t && e.n === i.bld.n) return e;
  let s = i.bld,
    n = s.n,
    o = Object.keys(t.fronts),
    a = Object.fromEntries(o.map((y, M) => [y, M])),
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
    d = o.length * 64 + 64,
    p = new Int32Array(d),
    m = new Int32Array(d),
    g = new Int8Array(d),
    b = [],
    x = (y, M, S) => {
      let w = y * y + M * M,
        z = S * S;
      return w < z * (1 - 1e-9)
        ? !0
        : w > z * (1 + 1e-9)
          ? !1
          : Math.hypot(y, M) <= S;
    },
    v = (y, M, S) => {
      let w = y * y + M * M,
        z = S * S;
      return w < z * (1 - 1e-9)
        ? !0
        : w > z * (1 + 1e-9)
          ? !1
          : Math.hypot(y, M) < S;
    };
  for (let y = l; y < n; y++) {
    let M = s.bRing[y],
      S = s.rStart[M],
      w = s.rStart[M + 1],
      z = 0,
      _ = 0,
      R = 0;
    for (let X = S; X < w; X++)
      if (((z += s.pts[X * 2]), (_ += s.pts[X * 2 + 1]), s.front[X] === 1)) {
        let K = X + 1 < w ? X + 1 : S;
        R = Math.max(
          R,
          Math.hypot(
            s.pts[K * 2] - s.pts[X * 2],
            s.pts[K * 2 + 1] - s.pts[X * 2 + 1],
          ),
        );
      }
    ((z /= w - S), (_ /= w - S), (h[y] = z), (f[y] = _));
    let T = s.seed[y],
      E = s.bF[y * 3 + 1] - s.bF[y * 3],
      A = s.roof && s.roofH[y] > 0.5 ? s.roof[y] : 0,
      C = Ai(z, _),
      P = XV(t, T),
      I = KV(s.bB[y * 5], E, C, P, A, Cn(T, 1));
    if (
      I === 6 &&
      (C === "fidi" || C === "jackson") &&
      E < 40 &&
      s.bB[y * 5 + 4] !== 2 &&
      !du[T] &&
      !MP[T]
    ) {
      let X = (P >> 3) & 7;
      ((X >= 1 && X <= 3) || (X === 0 && Cn(T, 61) < 0.65)) && (I = 2);
    }
    if (
      z > -3490 &&
      z < -3050 &&
      _ > 1100 &&
      _ < 1238 &&
      E <= 26 &&
      Math.abs(J5(s.pts.subarray(S * 2, w * 2))) > 1100
    ) {
      ((I = 6),
        mk.add(T),
        (e.shop[y] = t.fronts.shop?.cells.length ? 1 : 0),
        (e.st[y] = I),
        (e.tg[y] = P));
      continue;
    }
    ((e.st[y] = I), (e.tg[y] = P));
    let L = I === 2 || I === 5 || I === 6;
    ((e.shop[y] =
      t.fronts.shop?.cells.length &&
      L &&
      E >= 8 &&
      (P >> 8 > 0 || (I === 6 && TV.has(C) && Cn(T, 31) < 0.35))
        ? 1
        : 0),
      I === 8 &&
        E >= 4.4 &&
        E <= 12 &&
        t.fronts.shop?.cells.length &&
        (TV.has(C) || P >> 8 > 0) &&
        (e.shop[y] = 1));
    let F = _P[T],
      N =
        F !== void 0 && I === 0
          ? t.fronts.vic?.cells.find((X) => X.cell === F)
          : null,
      B = du[T],
      H = B?.g && t.fronts[B.g]?.cells.find((X) => X.cell === B.cell);
    if (H) {
      ((e.g[y] = a[B.g]), (e.c[y] = H.cell), (e.m[y] = 0));
      continue;
    }
    if (N) {
      ((e.g[y] = a.vic), (e.c[y] = N.cell), (e.m[y] = 0));
      let X = u(Math.floor(z / 50), Math.floor(_ / 50)),
        K = c.get(X);
      (K || c.set(X, (K = [])), K.push(y));
      continue;
    }
    let O = kpt(I, C, E, P);
    if (!O) continue;
    let D = [];
    for (let [X, K, nt] of O)
      for (let Z of t.fronts[X]?.cells || [])
        Z.style === K && D.push([X, Z, nt]);
    let U = D.filter(([, X]) => X.w <= Math.max(R, 4) * 2.2);
    if ((U.length && (D = U), !D.length)) continue;
    for (let X of b) ((p[X] = 0), (m[X] = 0), (g[X] = 0));
    b.length = 0;
    let G = Math.floor(z / 50),
      q = Math.floor(_ / 50);
    for (let X = -2; X <= 2; X++)
      for (let K = -2; K <= 2; K++) {
        let nt = c.get(u(G + X, q + K));
        if (nt)
          for (let Z of nt) {
            let et = h[Z] - z,
              tt = f[Z] - _;
            if (!x(et, tt, 100)) continue;
            let it = e.g[Z] * 64 + e.c[Z];
            it < 0 ||
              (p[it] || b.push(it),
              p[it]++,
              v(et, tt, 40) && (m[it]++, (g[it] = e.m[Z] + 1)));
          }
      }
    let W = null,
      V = 1e9;
    for (let [X, K, nt] of D) {
      let Z = a[X] * 64 + K.cell,
        et =
          (p[Z] ? p[Z] + 100 * m[Z] : 0) +
          3 * (1 - nt) +
          0.9 * Cn(T, 40 + K.cell);
      et < V && ((V = et), (W = [X, K, Z]));
    }
    let [Y, $, st] = W;
    ((e.g[y] = a[Y]),
      (e.c[y] = $.cell),
      (e.m[y] = p[st] && g[st] ? 2 - g[st] : Cn(T, 7) < 0.5 ? 1 : 0));
    let Q = u(G, q),
      j = c.get(Q);
    (j || c.set(Q, (j = [])), j.push(y));
  }
  return ((e.groups = o), (e.n = n), AV.set(i, e), e);
}
var zpt = [
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
  ].map(Gy),
  MP = { 24222973: 13 },
  mk = new Set();
function Ept(i, t, e, s, n, o) {
  let a = (n >> 3) & 7,
    r = Cn(i, 3);
  if (MP[i] !== void 0) return [MP[i], null];
  if (du[i]?.office !== void 0) return [du[i].office, null];
  if (mk.has(i)) return [3, null];
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
    return [16 + Math.floor(Cn(i, 12) * 8), lm(zpt, Cn(i, 13))];
  let h = c[Math.floor(Cn(i, 14) * c.length) % c.length];
  return (h >= o && (h = [0, 6, 1, 2, 2, 1, 7, 6][h - 8]), [h, null]);
}
function YV(i, t) {
  if (i._lk && i._lk.tex === t) return i._lk;
  let e = Cn(i.seed, 1),
    s = i.top - i.base,
    n = i.cx ?? pu(i.rings[0])[0],
    o = i.cz ?? pu(i.rings[0])[1],
    a = Ai(n, o),
    r = t?.fronts && $l && $l.bld.seed[i.i] === i.seed ? _pt($l, t) : null,
    l = r ? r.tg[i.i] : XV(t, i.seed),
    c = r ? r.st[i.i] : KV(i.st, s, a, l, i.rs, e),
    h = null,
    f = null,
    u = 0;
  r &&
    r.g[i.i] >= 0 &&
    ((h = r.groups[r.g[i.i]]),
    (f = t.fronts[h].cells.find((x) => x.cell === r.c[i.i]) || null),
    (u = r.m[i.i]));
  let d = f?.style === "mar",
    [p, m] = Ept(i.seed, i.mat, a, s, l, t?.office?.length || 8),
    g = du[i.seed]?.wall
      ? du[i.seed].wall
      : mk.has(i.seed)
        ? [0.78, 0.77, 0.73]
        : m && c === 6
          ? m
          : i.col ||
            (c === 0
              ? lm(SV, e)
              : c === 1
                ? e < 0.5 && !d
                  ? lm(SV, e * 2)
                  : lm(kV, e)
                : lm(c === 5 ? ypt : c === 6 ? wpt : kV, e)),
    b = r?.shop[i.i] ? t.fronts.shop.cells : null;
  if (
    (c === 0 || c === 1 || c === 2 || c === 3) &&
    SP.has(a) &&
    !du[i.seed]?.wall
  ) {
    let x = (g[0] + g[1] + g[2]) / 3;
    g = g.map((v, y) => (v * 0.75 + x * 0.25) * [0.9, 0.96, 1.08][y]);
  }
  return (i._lk = {
    tex: t,
    st: c,
    wall: g,
    cool: SP.has(a),
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
