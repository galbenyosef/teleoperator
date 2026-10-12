// app 97 — math
// Lines 77691-77965 of readable/app.pretty.js (statement-aligned).
var Dh = [-3470, 1240],
  RW = Math.hypot(100, -16),
  nb = [100 / RW, -16 / RW],
  Hh = [-nb[1], nb[0]],
  Ur = -168,
  C0 = 168,
  lft = 14,
  cft = 0.072,
  hft = 6.3,
  fft = 0.08,
  ou = (i, t) => {
    let e = i - Dh[0],
      s = t - Dh[1];
    return [e * nb[0] + s * nb[1], e * Hh[0] + s * Hh[1]];
  },
  em = (i, t) => [Dh[0] + nb[0] * i + Hh[0] * t, Dh[1] + nb[1] * i + Hh[1] * t];
function uft(i, t) {
  for (let e = 0; e < i.n; e++) {
    let [s, n] = ou(i.P[e * 3], i.P[e * 3 + 1]);
    if (s < Ur || s > C0 || Math.abs(n) > t) return !1;
  }
  return !0;
}
var my = (i) =>
    i.name === "Geary Boulevard" &&
    i.cls === "primary" &&
    !i.elev &&
    uft(i, 25),
  dft = (i) => i.name === "Geary Boulevard" && i.cls === "tertiary" && !i.elev;
function LS(i, t) {
  let e = [0, 1].map(() => ({
      v: new Float64Array(C0 - Ur + 1).fill(NaN),
      w: new Float64Array(C0 - Ur + 1).fill(NaN),
      y: new Float64Array(C0 - Ur + 1).fill(NaN),
      d: new Float64Array(C0 - Ur + 1).fill(1e9),
    })),
    s = {};
  for (let n of i.edges)
    if (t(n))
      for (let o = 0; o <= n.L; o += 0.5) {
        Ot(n, o, s);
        let [a, r] = ou(s.x, s.z),
          l = Math.round(a) - Ur;
        if (l < 0 || l > C0 - Ur || Math.abs(r) > 40) continue;
        let c = r < 0 ? 0 : 1,
          h = e[c],
          f = Math.abs(a - Math.round(a));
        f < h.d[l] &&
          ((h.d[l] = f), (h.v[l] = r), (h.w[l] = s.w), (h.y[l] = s.y));
      }
  for (let n of e)
    for (let o of [n.v, n.w, n.y]) {
      let a = NaN;
      for (let r = 0; r < o.length; r++)
        o[r] === o[r] ? (a = o[r]) : (o[r] = a);
      a = NaN;
      for (let r = o.length - 1; r >= 0; r--)
        o[r] === o[r] ? (a = o[r]) : (o[r] = a);
    }
  return e;
}
var Kn = (i, t) => {
  let e = Math.min(C0 - Ur, Math.max(0, t - Ur)),
    s = Math.min(C0 - Ur - 1, Math.floor(e)),
    n = e - s;
  return i[s] + (i[s + 1] - i[s]) * n;
};
function CW(i) {
  let t = i.edges.filter(my);
  if (t.length < 4) {
    console.warn("trench: express lanes not found", t.length);
    return;
  }
  let e = i.edges.find(
    (y) =>
      y.name === "Fillmore Street" &&
      y.elev &&
      Math.hypot(y.P[0] - Dh[0], y.P[1] - Dh[1]) < 40,
  );
  if (!e) {
    console.warn("trench: no bridge");
    return;
  }
  let s = {};
  vs(e, Dh[0], Dh[1], s);
  let n = s.y,
    o = n - hft,
    a = LS(i, my),
    r = (y) => o + cft * Math.max(0, Math.abs(y) - lft),
    l = [];
  for (let y of t) {
    let M = [],
      S = [];
    for (let T = 0; T + 1 < y.n; T++) {
      let E = y.S[T + 1] - y.S[T],
        A = Math.max(1, Math.ceil(E / 4));
      for (let C = 0; C < A; C++) {
        let P = C / A;
        (M.push(
          y.P[T * 3] + (y.P[T * 3 + 3] - y.P[T * 3]) * P,
          y.P[T * 3 + 1] + (y.P[T * 3 + 4] - y.P[T * 3 + 1]) * P,
          y.P[T * 3 + 2] + (y.P[T * 3 + 5] - y.P[T * 3 + 2]) * P,
        ),
          S.push(y.W[T] + (y.W[T + 1] - y.W[T]) * P));
      }
    }
    (M.push(y.P[(y.n - 1) * 3], y.P[(y.n - 1) * 3 + 1], y.P[(y.n - 1) * 3 + 2]),
      S.push(y.W[y.n - 1]));
    let w = S.length,
      z = [];
    for (let T = 0; T < w; T++) z.push(M[T * 3 + 2]);
    let _ = z.map((T, E) => Math.min(T, r(ou(M[E * 3], M[E * 3 + 1])[0])));
    for (let T = 0; T < 4; T++)
      _ = _.map((E, A) =>
        A === 0 || A === w - 1
          ? E
          : Math.min(z[A], (_[A - 1] + 2 * E + _[A + 1]) / 4),
      );
    for (let T = 0; T < w; T++) M[T * 3 + 2] = _[T];
    let R = y.L - y.s1;
    ((y.P = new Float32Array(M)),
      (y.W = new Float32Array(S)),
      dr(y),
      (y.s0 = Math.min(y.s0, y.L)),
      (y.s1 = Math.max(y.s0, y.L - R)),
      y.tunnelR && (y.tunnelR.L = y.L),
      l.push(y));
  }
  let c = new Set();
  for (let y of t) c.add(y.ja).add(y.jb);
  for (let y of c) {
    let M = i.juns[y];
    if (!M) continue;
    let S = i.edges.filter((_) => _.ja === y || _.jb === y);
    if (!S.every((_) => t.includes(_))) continue;
    let w = S[0],
      z = w.ja === y ? w.P[2] : w.P[(w.n - 1) * 3 + 2];
    M.y = z;
    for (let _ of M.rings) _.y && _.y.fill(z);
  }
  let h = i.terrain,
    f = LS(i, my),
    u = (y) => Math.min(Kn(f[0].y, y), Kn(f[1].y, y)),
    d = (y) => Kn(f[0].v, y) - Kn(f[0].w, y) - 4.5,
    p = (y) => Kn(f[1].v, y) + Kn(f[1].w, y) + 4.5,
    m = [em(Ur, -40), em(Ur, 40), em(C0, -40), em(C0, 40)],
    g = Math.min(...m.map((y) => y[0])),
    b = Math.max(...m.map((y) => y[0])),
    x = Math.min(...m.map((y) => y[1])),
    v = Math.max(...m.map((y) => y[1]));
  for (
    let y = Math.max(0, Math.floor((x - h.z0) / h.step));
    y <= Math.min(h.nz - 1, Math.ceil((v - h.z0) / h.step));
    y++
  )
    for (
      let M = Math.max(0, Math.floor((g - h.x0) / h.step));
      M <= Math.min(h.nx - 1, Math.ceil((b - h.x0) / h.step));
      M++
    ) {
      let [S, w] = ou(h.x0 + M * h.step, h.z0 + y * h.step);
      if (S < Ur + 4 || S > C0 - 4 || w < d(S) || w > p(S)) continue;
      let z = y * h.nx + M;
      h.h[z] = Math.min(h.h[z], u(S) - 0.35);
    }
  i.trench = { yDeck: n, yF: o, br: e, N: f, N0: a };
}
function LW(i) {
  let t = i.trench;
  if (!t) return;
  let e = LS(i, my),
    s = LS(i, dft);
  ((t.N = e), (t.F = s));
  let n = (c, h) => c > Ur && c < C0 && h > Kn(s[0].v, c) && h < Kn(s[1].v, c),
    o = 0,
    a = 0,
    r = (c, h) => c > -3760 && c < -3150 && h > 1100 && h < 1360;
  for (let [, c] of i.walks)
    for (let h of c) {
      if (!h.ys) continue;
      let f = h[0];
      if (!r(f[0], f[1])) continue;
      let u = 0,
        d = 0,
        p = f.length / 2;
      for (let v = 0; v < p; v++) ((u += f[v * 2]), (d += f[v * 2 + 1]));
      let [m, g] = ou(u / p, d / p);
      if (!n(m, g)) continue;
      let b = g > Kn(e[0].v, m) && g < Kn(e[1].v, m),
        x = g < 0 ? 0 : 1;
      (h.forEach((v, y) => {
        let M = h.ys[y];
        for (let S = 0; S < M.length; S++) {
          let [w, z] = ou(v[S * 2], v[S * 2 + 1]);
          M[S] = Kn(
            b
              ? e[
                  Math.abs(z - Kn(e[0].v, w)) < Math.abs(z - Kn(e[1].v, w))
                    ? 0
                    : 1
                ].y
              : s[x].y,
            w,
          );
        }
      }),
        (h.keep = !b),
        o++);
    }
  for (let [, c] of i.curbs)
    for (let h of c)
      if (!(!h.ys || (!r(h[0], h[1]) && !r(h[h.length - 2], h[h.length - 1]))))
        for (let f = 0; f < h.ys.length; f++) {
          let [u, d] = ou(h[f * 2], h[f * 2 + 1]);
          if (n(u, d)) {
            for (let p of e)
              if (Math.abs(d - Kn(p.v, u)) < Kn(p.w, u) + 1.2) {
                ((h.ys[f] = Kn(p.y, u)), a++);
                break;
              }
          }
        }
  {
    let c = i.props,
      h = i.meta?.roads?.curb ?? 0.15,
      f = 0;
    for (let u = 0; u < c.n; u++) {
      if (!r(c.pf[u * 5], c.pf[u * 5 + 1])) continue;
      let [d, p] = ou(c.pf[u * 5], c.pf[u * 5 + 1]);
      if (!n(d, p)) continue;
      let m = Kn(e[0].v, d) - Kn(e[0].w, d),
        g = Kn(e[1].v, d) + Kn(e[1].w, d);
      if (p > m && p < g) {
        let b =
          Math.abs(p - Kn(e[0].v, d)) < Math.abs(p - Kn(e[1].v, d)) ? 0 : 1;
        c.pf[u * 5 + 2] -= Kn(t.N0[b].y, d) - Kn(e[b].y, d);
      } else {
        let b = p < 0 ? 0 : 1;
        if (Math.abs(p - Kn(s[b].v, d)) > Kn(s[b].w, d) + 0.3)
          c.pf[u * 5 + 2] = Kn(s[b].y, d) + h;
        else continue;
      }
      f++;
    }
    t.props = f;
  }
  ((t.walks = o), (t.curbs = a));
  let l = i.meta?.roads?.curb ?? 0.15;
  for (let c of i.edges) {
    if (!my(c)) continue;
    let h = 0;
    for (let f = Ur; f <= C0; f += 2)
      for (let u of [0, 1])
        h = Math.max(
          h,
          Math.abs(Kn(s[u].v, f) - Kn(e[u].v, f)) -
            Kn(s[u].w, f) -
            Kn(e[u].w, f),
        );
    ((c.sw = Math.max(c.sw || 0, Math.min(12, h + 0.5))),
      (c.walkY = (f, u, d) => {
        let [p, m] = ou(f, u),
          g = Kn(e[0].v, p),
          b = Kn(e[1].v, p);
        return m < g ? Kn(s[0].y, p) + l : m > b ? Kn(s[1].y, p) + l : d + l;
      }));
  }
}
var e7 = [0.3, 0.295, 0.275, 0],
  py = [0.46, 0.45, 0.42, 0],
  pft = [0.2, 0.2, 0.19, 0],
  mft = [0.12, 0.12, 0.115, 0],
  s7 = [0.09, 0.1, 0.1, 0],
  gft = [0.18, 0.42, 0.55, 0],
  PW = [0.48, 0.47, 0.44, 0];
