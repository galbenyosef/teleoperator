// app 164 — math
// Lines 98573-98808 of readable/app.pretty.js (statement-aligned).
function sV(i, t, e, s) {
  let n = "_bs" + s;
  if (i[n]) return i[n];
  let o = { iv: [[], []], cuts: [] };
  if (e?.probe && rP(i, t)) {
    let a = lP(i, i.s0, i.s1, aP(i, t), e, t, !0),
      r = Idt(i, t, e, a, s);
    for (let l of [0, 1]) {
      let c = null;
      for (let h = 0; h + 1 < a.length; h++)
        r[l][h]
          ? c === null && (c = a[h][0])
          : c !== null &&
            (o.iv[l].push([c, a[h][0]]), o.cuts.push(c, a[h][0]), (c = null));
      c !== null && (o.iv[l].push([c, a[a.length - 1][0]]), o.cuts.push(c));
    }
  }
  return (i[n] = o);
}
var zb = (i, t, e) => {
  let s = (t + e) / 2;
  for (let [n, o] of i) if (s > n && s < o) return !0;
  return !1;
};
function Idt(i, t, e, s, n) {
  let o = [new Uint8Array(s.length), new Uint8Array(s.length)];
  if (!e?.probe || !rP(i, t)) return o;
  for (let [a, r] of [
    [0, -1],
    [1, 1],
  ]) {
    let l = [];
    for (let c = 0; c + 1 < s.length; c++)
      (s[c][0] - i.s0 < 30 || i.s1 - s[c + 1][0] < 30) &&
        Fdt(e, s[c], s[c + 1], r, (s[c][3] + s[c + 1][3]) / 2, n) &&
        l.push(c);
    for (let c of l) {
      let h = s[c][0] - Oj,
        f = s[c + 1][0] + Oj;
      for (let u = 0; u + 1 < s.length; u++)
        s[u + 1][0] > h && s[u][0] < f && (o[a][u] = 1);
    }
  }
  return o;
}
function Fdt(i, t, e, s, n, o = 1.5) {
  for (let a of e[0] - t[0] > 3 ? [0.02, 0.5, 0.98] : [0.02, 0.98]) {
    let r = t[1] + (e[1] - t[1]) * a,
      l = t[2] + (e[2] - t[2]) * a,
      c = t[4] + (e[4] - t[4]) * a,
      h = t[5] + (e[5] - t[5]) * a,
      f = t[6] + (e[6] - t[6]) * a;
    for (let u of s ? [0.02, 0.42] : [-0.5, 0.5])
      if (
        eV(
          i,
          r + c * (s ? (f + u) * s : f * u),
          l + h * (s ? (f + u) * s : f * u),
          n,
          o,
        )
      )
        return !0;
  }
  return !1;
}
var Ndt = (i, t) => Math.hypot(i + 7228, t + 1298) < 165;
function cP(i, t, e, s, n, o, a = null) {
  let r = aP(t, a),
    l = sV(t, a, n, 1.5),
    c = lP(t, e, s, r, n, a, !1, l.cuts);
  if (c.length < 2) return;
  let h = (d, p) =>
      (r[0] && p <= t.s0 + Ab + 0.01) || (r[1] && d >= t.s1 - Ab - 0.01),
    f = (d, p) => {
      if (!a) return !1;
      let m = a.hk(Math.floor(d / a.HC), Math.floor(p / a.HC));
      if (a.JH.get(m)) return !1;
      let g = a.EH.get(m);
      if (!g) return !0;
      for (let b of g) if (Math.floor(b / 65536) !== t.id) return !1;
      return !0;
    },
    u = (d, p, m) => {
      if (!n?.probe || f(d, p)) return !1;
      for (let g of n.probe(d, p).all)
        if (!(g.E === t || Math.abs(g.y - m) > 2)) return !0;
      return !1;
    };
  for (let d of [-1, 1]) {
    let p = -1e9,
      m = !1;
    for (let g = 0; g + 1 < c.length; g++) {
      let [b, x, v, y, M, S, w] = c[g],
        [, z, _, R, T, E, A] = c[g + 1],
        C = x + M * w * d,
        P = v + S * w * d,
        I = z + T * A * d,
        L = _ + E * A * d;
      if (
        ((b - p >= 5 || b < p) &&
          ((p = b),
          (m =
            u(
              (C + I) / 2 + M * 0.6 * d,
              (P + L) / 2 + S * 0.6 * d,
              (y + R) / 2,
            ) ||
            u(
              (C + I) / 2 - M * 0.4 * d,
              (P + L) / 2 - S * 0.4 * d,
              (y + R) / 2,
            ) ||
            (g + 1 < c.length - 1 && u(I + T * 0.6 * d, L + E * 0.6 * d, R)))),
        m ||
          h(b, c[g + 1][0]) ||
          zb(l.iv[d > 0 ? 1 : 0], b, c[g + 1][0]) ||
          Ndt((C + I) / 2, (P + L) / 2))
      )
        continue;
      let F = M * 0.5 * d,
        N = S * 0.5 * d,
        B = T * 0.5 * d,
        H = E * 0.5 * d;
      i &&
        (d > 0
          ? (i.wall(
              I,
              L,
              C,
              P,
              R - 0.05,
              y - 0.05,
              R + 0.18,
              y + 0.18,
              Nj,
              b,
              y,
            ),
            i.wall(
              I + B * 0.15,
              L + H * 0.15,
              C + F * 0.15,
              P + N * 0.15,
              R + 0.18,
              y + 0.18,
              R + 0.85,
              y + 0.85,
              pr,
              b,
              y,
            ))
          : (i.wall(
              C,
              P,
              I,
              L,
              y - 0.05,
              R - 0.05,
              y + 0.18,
              R + 0.18,
              Nj,
              b,
              y,
            ),
            i.wall(
              C + F * 0.15,
              P + N * 0.15,
              I + B * 0.15,
              L + H * 0.15,
              y + 0.18,
              R + 0.18,
              y + 0.85,
              R + 0.85,
              pr,
              b,
              y,
            )),
        Lb(
          i,
          [C + F * 0.15, y + 0.85, P + N * 0.15],
          [I + B * 0.15, R + 0.85, L + H * 0.15],
          [I + B, R + 0.85, L + H],
          [C + F, y + 0.85, P + N],
          pr,
          !0,
        ),
        d > 0
          ? i.wall(
              C + F,
              P + N,
              I + B,
              L + H,
              y - 0.6,
              R - 0.6,
              y + 0.85,
              R + 0.85,
              pr,
              b,
              y - 0.6,
            )
          : i.wall(
              I + B,
              L + H,
              C + F,
              P + N,
              R - 0.6,
              y - 0.6,
              R + 0.85,
              y + 0.85,
              pr,
              b,
              y - 0.6,
            ));
      let O = (C + I) / 2 + (F + B) / 4,
        D = (P + L) / 2 + (N + H) / 4,
        U = I - C,
        G = L - P,
        q = Math.hypot(U, G);
      q > 0.2 &&
        o &&
        o.push({
          t: "obb",
          x: O,
          z: D,
          hx: 0.25,
          hz: q / 2 + 0.05,
          c: G / q,
          s: U / q,
          y0: Math.min(y, R) - 0.5,
          y1: Math.max(y, R) + 1.2,
          rail: !0,
        });
    }
  }
}
