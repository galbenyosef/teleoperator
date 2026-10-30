// app 163 — math
// Lines 98809-99044 of readable/app.pretty.js (statement-aligned).
function oX(o, t, e, s) {
  let n = "_bs" + s;
  if (o[n]) return o[n];
  let i = { iv: [[], []], cuts: [] };
  if (e?.probe && NC(o, t)) {
    let a = HC(o, o.s0, o.s1, BC(o, t), e, t, !0),
      r = i2t(o, t, e, a, s);
    for (let l of [0, 1]) {
      let c = null;
      for (let h = 0; h + 1 < a.length; h++)
        r[l][h]
          ? c === null && (c = a[h][0])
          : c !== null &&
            (i.iv[l].push([c, a[h][0]]), i.cuts.push(c, a[h][0]), (c = null));
      c !== null && (i.iv[l].push([c, a[a.length - 1][0]]), i.cuts.push(c));
    }
  }
  return (o[n] = i);
}
var ux = (o, t, e) => {
  let s = (t + e) / 2;
  for (let [n, i] of o) if (s > n && s < i) return !0;
  return !1;
};
function i2t(o, t, e, s, n) {
  let i = [new Uint8Array(s.length), new Uint8Array(s.length)];
  if (!e?.probe || !NC(o, t)) return i;
  for (let [a, r] of [
    [0, -1],
    [1, 1],
  ]) {
    let l = [];
    for (let c = 0; c + 1 < s.length; c++)
      (s[c][0] - o.s0 < 30 || o.s1 - s[c + 1][0] < 30) &&
        o2t(e, s[c], s[c + 1], r, (s[c][3] + s[c + 1][3]) / 2, n) &&
        l.push(c);
    for (let c of l) {
      let h = s[c][0] - U$,
        f = s[c + 1][0] + U$;
      for (let u = 0; u + 1 < s.length; u++)
        s[u + 1][0] > h && s[u][0] < f && (i[a][u] = 1);
    }
  }
  return i;
}
function o2t(o, t, e, s, n, i = 1.5) {
  for (let a of e[0] - t[0] > 3 ? [0.02, 0.5, 0.98] : [0.02, 0.98]) {
    let r = t[1] + (e[1] - t[1]) * a,
      l = t[2] + (e[2] - t[2]) * a,
      c = t[4] + (e[4] - t[4]) * a,
      h = t[5] + (e[5] - t[5]) * a,
      f = t[6] + (e[6] - t[6]) * a;
    for (let u of s ? [0.02, 0.42] : [-0.5, 0.5])
      if (
        iX(
          o,
          r + c * (s ? (f + u) * s : f * u),
          l + h * (s ? (f + u) * s : f * u),
          n,
          i,
        )
      )
        return !0;
  }
  return !1;
}
var a2t = (o, t) => Math.hypot(o + 7228, t + 1298) < 165;
function DC(o, t, e, s, n, i, a = null) {
  let r = BC(t, a),
    l = oX(t, a, n, 1.5),
    c = HC(t, e, s, r, n, a, !1, l.cuts);
  if (c.length < 2) return;
  let h = (d, p) =>
      (r[0] && p <= t.s0 + mx + 0.01) || (r[1] && d >= t.s1 - mx - 0.01),
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
      let [b, v, x, y, M, S, w] = c[g],
        [, _, z, A, T, E, R] = c[g + 1],
        P = v + M * w * d,
        C = x + S * w * d,
        I = _ + T * R * d,
        L = z + E * R * d;
      if (
        ((b - p >= 5 || b < p) &&
          ((p = b),
          (m =
            u(
              (P + I) / 2 + M * 0.6 * d,
              (C + L) / 2 + S * 0.6 * d,
              (y + A) / 2,
            ) ||
            u(
              (P + I) / 2 - M * 0.4 * d,
              (C + L) / 2 - S * 0.4 * d,
              (y + A) / 2,
            ) ||
            (g + 1 < c.length - 1 && u(I + T * 0.6 * d, L + E * 0.6 * d, A)))),
        m ||
          h(b, c[g + 1][0]) ||
          ux(l.iv[d > 0 ? 1 : 0], b, c[g + 1][0]) ||
          a2t((P + I) / 2, (C + L) / 2))
      )
        continue;
      let F = M * 0.5 * d,
        O = S * 0.5 * d,
        B = T * 0.5 * d,
        H = E * 0.5 * d;
      o &&
        (d > 0
          ? (o.wall(
              I,
              L,
              P,
              C,
              A - 0.05,
              y - 0.05,
              A + 0.18,
              y + 0.18,
              H$,
              b,
              y,
            ),
            o.wall(
              I + B * 0.15,
              L + H * 0.15,
              P + F * 0.15,
              C + O * 0.15,
              A + 0.18,
              y + 0.18,
              A + 0.85,
              y + 0.85,
              Ar,
              b,
              y,
            ))
          : (o.wall(
              P,
              C,
              I,
              L,
              y - 0.05,
              A - 0.05,
              y + 0.18,
              A + 0.18,
              H$,
              b,
              y,
            ),
            o.wall(
              P + F * 0.15,
              C + O * 0.15,
              I + B * 0.15,
              L + H * 0.15,
              y + 0.18,
              A + 0.18,
              y + 0.85,
              A + 0.85,
              Ar,
              b,
              y,
            )),
        vx(
          o,
          [P + F * 0.15, y + 0.85, C + O * 0.15],
          [I + B * 0.15, A + 0.85, L + H * 0.15],
          [I + B, A + 0.85, L + H],
          [P + F, y + 0.85, C + O],
          Ar,
          !0,
        ),
        d > 0
          ? o.wall(
              P + F,
              C + O,
              I + B,
              L + H,
              y - 0.6,
              A - 0.6,
              y + 0.85,
              A + 0.85,
              Ar,
              b,
              y - 0.6,
            )
          : o.wall(
              I + B,
              L + H,
              P + F,
              C + O,
              A - 0.6,
              y - 0.6,
              A + 0.85,
              y + 0.85,
              Ar,
              b,
              y - 0.6,
            ));
      let N = (P + I) / 2 + (F + B) / 4,
        D = (C + L) / 2 + (O + H) / 4,
        U = I - P,
        G = L - C,
        W = Math.hypot(U, G);
      W > 0.2 &&
        i &&
        i.push({
          t: "obb",
          x: N,
          z: D,
          hx: 0.25,
          hz: W / 2 + 0.05,
          c: G / W,
          s: U / W,
          y0: Math.min(y, A) - 0.5,
          y1: Math.max(y, A) + 1.2,
          rail: !0,
        });
    }
  }
}
