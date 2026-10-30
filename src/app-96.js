// app 96 — math
// Lines 77927-78201 of readable/app.pretty.js (statement-aligned).
var gf = [-3470, 1240],
  Cq = Math.hypot(100, -16),
  qb = [100 / Cq, -16 / Cq],
  mf = [-qb[1], qb[0]],
  a0 = -168,
  el = 168,
  Apt = 14,
  Ppt = 0.072,
  Cpt = 6.3,
  Lpt = 0.08,
  Uu = (o, t) => {
    let e = o - gf[0],
      s = t - gf[1];
    return [e * qb[0] + s * qb[1], e * mf[0] + s * mf[1]];
  },
  Um = (o, t) => [gf[0] + qb[0] * o + mf[0] * t, gf[1] + qb[1] * o + mf[1] * t];
function Ipt(o, t) {
  for (let e = 0; e < o.n; e++) {
    let [s, n] = Uu(o.P[e * 3], o.P[e * 3 + 1]);
    if (s < a0 || s > el || Math.abs(n) > t) return !1;
  }
  return !0;
}
var cw = (o) =>
    o.name === "Geary Boulevard" &&
    o.cls === "primary" &&
    !o.elev &&
    Ipt(o, 25),
  Fpt = (o) => o.name === "Geary Boulevard" && o.cls === "tertiary" && !o.elev;
function Ik(o, t) {
  let e = [0, 1].map(() => ({
      v: new Float64Array(el - a0 + 1).fill(NaN),
      w: new Float64Array(el - a0 + 1).fill(NaN),
      y: new Float64Array(el - a0 + 1).fill(NaN),
      d: new Float64Array(el - a0 + 1).fill(1e9),
    })),
    s = {};
  for (let n of o.edges)
    if (t(n))
      for (let i = 0; i <= n.L; i += 0.5) {
        Ot(n, i, s);
        let [a, r] = Uu(s.x, s.z),
          l = Math.round(a) - a0;
        if (l < 0 || l > el - a0 || Math.abs(r) > 40) continue;
        let c = r < 0 ? 0 : 1,
          h = e[c],
          f = Math.abs(a - Math.round(a));
        f < h.d[l] &&
          ((h.d[l] = f), (h.v[l] = r), (h.w[l] = s.w), (h.y[l] = s.y));
      }
  for (let n of e)
    for (let i of [n.v, n.w, n.y]) {
      let a = NaN;
      for (let r = 0; r < i.length; r++)
        i[r] === i[r] ? (a = i[r]) : (i[r] = a);
      a = NaN;
      for (let r = i.length - 1; r >= 0; r--)
        i[r] === i[r] ? (a = i[r]) : (i[r] = a);
    }
  return e;
}
var ei = (o, t) => {
  let e = Math.min(el - a0, Math.max(0, t - a0)),
    s = Math.min(el - a0 - 1, Math.floor(e)),
    n = e - s;
  return o[s] + (o[s + 1] - o[s]) * n;
};
function Iq(o) {
  let t = o.edges.filter(cw);
  if (t.length < 4) {
    console.warn("trench: express lanes not found", t.length);
    return;
  }
  let e = o.edges.find(
    (y) =>
      y.name === "Fillmore Street" &&
      y.elev &&
      Math.hypot(y.P[0] - gf[0], y.P[1] - gf[1]) < 40,
  );
  if (!e) {
    console.warn("trench: no bridge");
    return;
  }
  let s = {};
  ys(e, gf[0], gf[1], s);
  let n = s.y,
    i = n - Cpt,
    a = Ik(o, cw),
    r = (y) => i + Ppt * Math.max(0, Math.abs(y) - Apt),
    l = [];
  for (let y of t) {
    let M = [],
      S = [];
    for (let T = 0; T + 1 < y.n; T++) {
      let E = y.S[T + 1] - y.S[T],
        R = Math.max(1, Math.ceil(E / 4));
      for (let P = 0; P < R; P++) {
        let C = P / R;
        (M.push(
          y.P[T * 3] + (y.P[T * 3 + 3] - y.P[T * 3]) * C,
          y.P[T * 3 + 1] + (y.P[T * 3 + 4] - y.P[T * 3 + 1]) * C,
          y.P[T * 3 + 2] + (y.P[T * 3 + 5] - y.P[T * 3 + 2]) * C,
        ),
          S.push(y.W[T] + (y.W[T + 1] - y.W[T]) * C));
      }
    }
    (M.push(y.P[(y.n - 1) * 3], y.P[(y.n - 1) * 3 + 1], y.P[(y.n - 1) * 3 + 2]),
      S.push(y.W[y.n - 1]));
    let w = S.length,
      _ = [];
    for (let T = 0; T < w; T++) _.push(M[T * 3 + 2]);
    let z = _.map((T, E) => Math.min(T, r(Uu(M[E * 3], M[E * 3 + 1])[0])));
    for (let T = 0; T < 4; T++)
      z = z.map((E, R) =>
        R === 0 || R === w - 1
          ? E
          : Math.min(_[R], (z[R - 1] + 2 * E + z[R + 1]) / 4),
      );
    for (let T = 0; T < w; T++) M[T * 3 + 2] = z[T];
    let A = y.L - y.s1;
    ((y.P = new Float32Array(M)),
      (y.W = new Float32Array(S)),
      Tr(y),
      (y.s0 = Math.min(y.s0, y.L)),
      (y.s1 = Math.max(y.s0, y.L - A)),
      y.tunnelR && (y.tunnelR.L = y.L),
      l.push(y));
  }
  let c = new Set();
  for (let y of t) c.add(y.ja).add(y.jb);
  for (let y of c) {
    let M = o.juns[y];
    if (!M) continue;
    let S = o.edges.filter((z) => z.ja === y || z.jb === y);
    if (!S.every((z) => t.includes(z))) continue;
    let w = S[0],
      _ = w.ja === y ? w.P[2] : w.P[(w.n - 1) * 3 + 2];
    M.y = _;
    for (let z of M.rings) z.y && z.y.fill(_);
  }
  let h = o.terrain,
    f = Ik(o, cw),
    u = (y) => Math.min(ei(f[0].y, y), ei(f[1].y, y)),
    d = (y) => ei(f[0].v, y) - ei(f[0].w, y) - 4.5,
    p = (y) => ei(f[1].v, y) + ei(f[1].w, y) + 4.5,
    m = [Um(a0, -40), Um(a0, 40), Um(el, -40), Um(el, 40)],
    g = Math.min(...m.map((y) => y[0])),
    b = Math.max(...m.map((y) => y[0])),
    v = Math.min(...m.map((y) => y[1])),
    x = Math.max(...m.map((y) => y[1]));
  for (
    let y = Math.max(0, Math.floor((v - h.z0) / h.step));
    y <= Math.min(h.nz - 1, Math.ceil((x - h.z0) / h.step));
    y++
  )
    for (
      let M = Math.max(0, Math.floor((g - h.x0) / h.step));
      M <= Math.min(h.nx - 1, Math.ceil((b - h.x0) / h.step));
      M++
    ) {
      let [S, w] = Uu(h.x0 + M * h.step, h.z0 + y * h.step);
      if (S < a0 + 4 || S > el - 4 || w < d(S) || w > p(S)) continue;
      let _ = y * h.nx + M;
      h.h[_] = Math.min(h.h[_], u(S) - 0.35);
    }
  o.trench = { yDeck: n, yF: i, br: e, N: f, N0: a };
}
function Fq(o) {
  let t = o.trench;
  if (!t) return;
  let e = Ik(o, cw),
    s = Ik(o, Fpt);
  ((t.N = e), (t.F = s));
  let n = (c, h) => c > a0 && c < el && h > ei(s[0].v, c) && h < ei(s[1].v, c),
    i = 0,
    a = 0,
    r = (c, h) => c > -3760 && c < -3150 && h > 1100 && h < 1360;
  for (let [, c] of o.walks)
    for (let h of c) {
      if (!h.ys) continue;
      let f = h[0];
      if (!r(f[0], f[1])) continue;
      let u = 0,
        d = 0,
        p = f.length / 2;
      for (let x = 0; x < p; x++) ((u += f[x * 2]), (d += f[x * 2 + 1]));
      let [m, g] = Uu(u / p, d / p);
      if (!n(m, g)) continue;
      let b = g > ei(e[0].v, m) && g < ei(e[1].v, m),
        v = g < 0 ? 0 : 1;
      (h.forEach((x, y) => {
        let M = h.ys[y];
        for (let S = 0; S < M.length; S++) {
          let [w, _] = Uu(x[S * 2], x[S * 2 + 1]);
          M[S] = ei(
            b
              ? e[
                  Math.abs(_ - ei(e[0].v, w)) < Math.abs(_ - ei(e[1].v, w))
                    ? 0
                    : 1
                ].y
              : s[v].y,
            w,
          );
        }
      }),
        (h.keep = !b),
        i++);
    }
  for (let [, c] of o.curbs)
    for (let h of c)
      if (!(!h.ys || (!r(h[0], h[1]) && !r(h[h.length - 2], h[h.length - 1]))))
        for (let f = 0; f < h.ys.length; f++) {
          let [u, d] = Uu(h[f * 2], h[f * 2 + 1]);
          if (n(u, d)) {
            for (let p of e)
              if (Math.abs(d - ei(p.v, u)) < ei(p.w, u) + 1.2) {
                ((h.ys[f] = ei(p.y, u)), a++);
                break;
              }
          }
        }
  {
    let c = o.props,
      h = o.meta?.roads?.curb ?? 0.15,
      f = 0;
    for (let u = 0; u < c.n; u++) {
      if (!r(c.pf[u * 5], c.pf[u * 5 + 1])) continue;
      let [d, p] = Uu(c.pf[u * 5], c.pf[u * 5 + 1]);
      if (!n(d, p)) continue;
      let m = ei(e[0].v, d) - ei(e[0].w, d),
        g = ei(e[1].v, d) + ei(e[1].w, d);
      if (p > m && p < g) {
        let b =
          Math.abs(p - ei(e[0].v, d)) < Math.abs(p - ei(e[1].v, d)) ? 0 : 1;
        c.pf[u * 5 + 2] -= ei(t.N0[b].y, d) - ei(e[b].y, d);
      } else {
        let b = p < 0 ? 0 : 1;
        if (Math.abs(p - ei(s[b].v, d)) > ei(s[b].w, d) + 0.3)
          c.pf[u * 5 + 2] = ei(s[b].y, d) + h;
        else continue;
      }
      f++;
    }
    t.props = f;
  }
  ((t.walks = i), (t.curbs = a));
  let l = o.meta?.roads?.curb ?? 0.15;
  for (let c of o.edges) {
    if (!cw(c)) continue;
    let h = 0;
    for (let f = a0; f <= el; f += 2)
      for (let u of [0, 1])
        h = Math.max(
          h,
          Math.abs(ei(s[u].v, f) - ei(e[u].v, f)) -
            ei(s[u].w, f) -
            ei(e[u].w, f),
        );
    ((c.sw = Math.max(c.sw || 0, Math.min(12, h + 0.5))),
      (c.walkY = (f, u, d) => {
        let [p, m] = Uu(f, u),
          g = ei(e[0].v, p),
          b = ei(e[1].v, p);
        return m < g ? ei(s[0].y, p) + l : m > b ? ei(s[1].y, p) + l : d + l;
      }));
  }
}
var PP = [0.3, 0.295, 0.275, 0],
  lw = [0.46, 0.45, 0.42, 0],
  Opt = [0.2, 0.2, 0.19, 0],
  Bpt = [0.12, 0.12, 0.115, 0],
  CP = [0.09, 0.1, 0.1, 0],
  Npt = [0.18, 0.42, 0.55, 0],
  Lq = [0.48, 0.47, 0.44, 0];
