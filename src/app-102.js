// app 102 — math
// Lines 79040-79290 of readable/app.pretty.js (statement-aligned).
function zft(i, t, e) {
  let s = i.duboce;
  if (!s) return;
  let n = (_, R, T) => [
      s.a[0] + s.ux * _ - s.uz * R,
      T,
      s.a[1] + s.uz * _ + s.ux * R,
    ],
    o = [0.44, 0.43, 0.4, 0],
    a = [0.36, 0.355, 0.33, 0],
    r = [0.2, 0.19, 0.18, 0],
    l = [0.012, 0.012, 0.014, 0],
    c = [0.5, 0.5, 0.52, 0],
    h = [
      [0.85, 0.62, 0.12, 0],
      [0.12, 0.35, 0.62, 0],
      [0.62, 0.14, 0.12, 0],
      [0.18, 0.5, 0.3, 0],
      [0.8, 0.45, 0.6, 0],
      [0.92, 0.82, 0.3, 0],
    ],
    f = (_) => [-s.uz * _, 0, s.ux * _],
    u = [0, 1, 0],
    d = 3,
    p = s.s0 - 8,
    m = s.L,
    g = (_) => s.lip(_) + 1.1,
    b = (_, R, T, E, A, C) =>
      t.quad(_, R, T, E, [0, 0], [1, 0], [1, 1], [0, 1], A, C);
  for (let _ = p; _ < m - 0.001; _ += d) {
    let R = Math.min(m, _ + d),
      T = s.floor(_),
      E = s.floor(R);
    b(n(_, -s.hw, T), n(R, -s.hw, E), n(R, s.hw, E), n(_, s.hw, T), r, u);
    for (let A of [-1, 1]) {
      let C = s.hw * A,
        P = (s.hw + 0.35) * A,
        I = Math.floor((_ + 400) / 9) + (A > 0 ? 3 : 0),
        L = _ > s.s0 && I % 3 ? h[I % h.length] : o;
      (b(n(_, C, T), n(R, C, E), n(R, C, g(R)), n(_, C, g(_)), L, f(-A)),
        b(n(_, C, g(_)), n(R, C, g(R)), n(R, P, g(R)), n(_, P, g(_)), a, u),
        b(
          n(_, P, s.lip(_) - 0.3),
          n(R, P, s.lip(R) - 0.3),
          n(R, P, g(R)),
          n(_, P, g(_)),
          o,
          f(A),
        ));
      for (let F = 0; F < 3; F++) {
        let N = P + (A * F * s.apron) / 3,
          B = P + (A * (F + 1) * s.apron) / 3;
        b(
          n(_, N, s.lip(_) + 0.04),
          n(R, N, s.lip(R) + 0.04),
          n(R, B, s.lip(R) + 0.04),
          n(_, B, s.lip(_) + 0.04),
          a,
          u,
        );
      }
    }
    for (let A of [-2, 2])
      for (let C of [-0.7175, 0.7175]) {
        let P = A + C;
        b(
          n(_, P - 0.04, T + 0.17),
          n(R, P - 0.04, E + 0.17),
          n(R, P + 0.04, E + 0.17),
          n(_, P + 0.04, T + 0.17),
          c,
          u,
        );
      }
  }
  for (let _ = 0; _ < 2; _++) {
    let R = p - _ * 3,
      T = R - 3;
    b(
      n(T, -s.hw - s.apron, s.lip(T) + 0.04),
      n(R, -s.hw - s.apron, s.lip(R) + 0.04),
      n(R, s.hw + s.apron, s.lip(R) + 0.04),
      n(T, s.hw + s.apron, s.lip(T) + 0.04),
      a,
      u,
    );
  }
  let x = s.floor(s.L),
    v = s.lip(s.L) + 1.5,
    y = 3.8,
    M = 5.4,
    S = [-s.ux, 0, -s.uz];
  (b(
    n(s.L, -s.hw - 0.35, x),
    n(s.L, -y, x),
    n(s.L, -y, v),
    n(s.L, -s.hw - 0.35, v),
    a,
    S,
  ),
    b(
      n(s.L, y, x),
      n(s.L, s.hw + 0.35, x),
      n(s.L, s.hw + 0.35, v),
      n(s.L, y, v),
      a,
      S,
    ),
    b(n(s.L, -y, x + M), n(s.L, y, x + M), n(s.L, y, v), n(s.L, -y, v), a, S),
    b(
      n(s.L, -s.hw - 0.35, v),
      n(s.L, s.hw + 0.35, v),
      n(s.L + 0.6, s.hw + 0.35, v),
      n(s.L + 0.6, -s.hw - 0.35, v),
      o,
      u,
    ),
    b(
      n(s.L, -s.hw - 6, s.lip(s.L) - 0.05),
      n(s.L, s.hw + 6, s.lip(s.L) - 0.05),
      n(s.L + 6, s.hw + 6, s.lip(s.L + 6) - 0.05),
      n(s.L + 6, -s.hw - 6, s.lip(s.L + 6) - 0.05),
      a,
      u,
    ));
  let w = s.L + 14;
  (b(n(s.L, -y, x), n(w, -y, x), n(w, y, x), n(s.L, y, x), l, u),
    b(
      n(s.L, -y, x + M),
      n(s.L, y, x + M),
      n(w, y, x + M),
      n(w, -y, x + M),
      l,
      [0, -1, 0],
    ));
  for (let _ of [-1, 1])
    b(
      n(s.L, y * _, x),
      n(w, y * _, x),
      n(w, y * _, x + M),
      n(s.L, y * _, x + M),
      l,
      f(-_),
    );
  b(n(w, -y, x), n(w, y, x), n(w, y, x + M), n(w, -y, x + M), l, S);
  for (let _ = 0; _ < 3; _++) {
    let R = s.L + 0.6 + _ * 2,
      T = R + 2;
    b(
      n(R, -s.hw - s.apron, s.lip(R) + 0.04),
      n(T, -s.hw - s.apron, s.lip(T) + 0.04),
      n(T, s.hw + s.apron, s.lip(T) + 0.04),
      n(R, s.hw + s.apron, s.lip(R) + 0.04),
      a,
      u,
    );
  }
  let z = n((p + s.L) / 2, 0, 0);
  e.push({
    t: "obb",
    x: z[0],
    z: z[2],
    hx: s.hw + 0.4,
    hz: (s.L - p) / 2,
    c: s.uz,
    s: s.ux,
    wall: !0,
    y0: s.yM - 1,
    y1: s.lip(s.s0) + 3,
  });
}
function Eft(i, t, e, s) {
  let n = e ? t.L : 0,
    o = e ? 1 : -1,
    a = Ot(t.E, n, {}),
    r = {},
    l = t.W + 6,
    c = 1 / 0,
    h = [];
  for (let u = 0.5; u <= Lc; u += 1.5)
    for (let d = -l; d <= l; d += 1.5) {
      let p = n - o * u,
        m = Ot(t.E, Math.max(0, Math.min(t.E.L, p)), {}),
        g = m.x + (p - Math.max(0, Math.min(t.E.L, p))) * m.dx + m.nx * d,
        b = m.z + (p - Math.max(0, Math.min(t.E.L, p))) * m.dz + m.nz * d;
      h.push([g, b]);
    }
  let f = (u, d, p, m) =>
    p > a.x - 40 && u < a.x + 40 && m > a.z - 40 && d < a.z + 40;
  for (let u of i.edges) {
    if (u.tunnel || u.inner || u.layered || u.synthetic) continue;
    let d = 1e9,
      p = -1e9,
      m = 1e9,
      g = -1e9;
    for (let b = 0; b < u.n; b++)
      ((d = Math.min(d, u.P[b * 3])),
        (p = Math.max(p, u.P[b * 3])),
        (m = Math.min(m, u.P[b * 3 + 1])),
        (g = Math.max(g, u.P[b * 3 + 1])));
    if (f(d, m, p, g))
      for (let [b, x] of h)
        (vs(u, b, x, r),
          r.d <= r.w &&
            r.s >= u.s0 &&
            r.s <= u.s1 &&
            r.y > s + 3 &&
            (c = Math.min(c, r.y)));
  }
  for (let u of i.juns)
    if (!(
      !u.polys?.length ||
      u.legs?.some(([d]) => d.tunnel || d.layered) ||
      !f(u.bb[0], u.bb[1], u.bb[2], u.bb[3])
    ))
      for (let [d, p] of h)
        u.y > s + 3 &&
          u.polys.some((m) => en(m[0].pts, d, p)) &&
          (c = Math.min(c, u.y));
  return c;
}
function OW(i, t) {
  ((t.box = NS(t)), (t.top = [-1e9, -1e9]), (i._carve ||= []).push(t));
}
var WW = (i, t) => {
    let e = i.x0 + (i.nx - 1) * i.step,
      s = i.z0 + (i.nz - 1) * i.step;
    return !(t[2] < i.x0 || t[0] > e || t[3] < i.z0 || t[1] > s);
  },
  NS = (i) => {
    let t = i.W + lo + 3,
      e = [
        Math.min(i.Ja.x, i.Jb.x) - t,
        Math.min(i.Ja.z, i.Jb.z) - t,
        Math.max(i.Ja.x, i.Jb.x) + t,
        Math.max(i.Ja.z, i.Jb.z) + t,
      ];
    for (let s = 0; s < i.E.n; s++) {
      let n = i.E.P[s * 3],
        o = i.E.P[s * 3 + 1];
      ((e[0] = Math.min(e[0], n - t)),
        (e[1] = Math.min(e[1], o - t)),
        (e[2] = Math.max(e[2], n + t)),
        (e[3] = Math.max(e[3], o + t)));
    }
    return e;
  };
function qW(i, t) {
  let e = (i.tunnelsAll || []).filter((s) => WW(t, s.box || NS(s)));
  return (e.length && ((i._carve = e), jW(i, t)), (t.tunnels = e), e);
}
