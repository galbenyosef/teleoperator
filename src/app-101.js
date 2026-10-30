// app 101 — math
// Lines 79276-79526 of readable/app.pretty.js (statement-aligned).
function Xpt(o, t, e) {
  let s = o.duboce;
  if (!s) return;
  let n = (z, A, T) => [
      s.a[0] + s.ux * z - s.uz * A,
      T,
      s.a[1] + s.uz * z + s.ux * A,
    ],
    i = [0.44, 0.43, 0.4, 0],
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
    f = (z) => [-s.uz * z, 0, s.ux * z],
    u = [0, 1, 0],
    d = 3,
    p = s.s0 - 8,
    m = s.L,
    g = (z) => s.lip(z) + 1.1,
    b = (z, A, T, E, R, P) =>
      t.quad(z, A, T, E, [0, 0], [1, 0], [1, 1], [0, 1], R, P);
  for (let z = p; z < m - 0.001; z += d) {
    let A = Math.min(m, z + d),
      T = s.floor(z),
      E = s.floor(A);
    b(n(z, -s.hw, T), n(A, -s.hw, E), n(A, s.hw, E), n(z, s.hw, T), r, u);
    for (let R of [-1, 1]) {
      let P = s.hw * R,
        C = (s.hw + 0.35) * R,
        I = Math.floor((z + 400) / 9) + (R > 0 ? 3 : 0),
        L = z > s.s0 && I % 3 ? h[I % h.length] : i;
      (b(n(z, P, T), n(A, P, E), n(A, P, g(A)), n(z, P, g(z)), L, f(-R)),
        b(n(z, P, g(z)), n(A, P, g(A)), n(A, C, g(A)), n(z, C, g(z)), a, u),
        b(
          n(z, C, s.lip(z) - 0.3),
          n(A, C, s.lip(A) - 0.3),
          n(A, C, g(A)),
          n(z, C, g(z)),
          i,
          f(R),
        ));
      for (let F = 0; F < 3; F++) {
        let O = C + (R * F * s.apron) / 3,
          B = C + (R * (F + 1) * s.apron) / 3;
        b(
          n(z, O, s.lip(z) + 0.04),
          n(A, O, s.lip(A) + 0.04),
          n(A, B, s.lip(A) + 0.04),
          n(z, B, s.lip(z) + 0.04),
          a,
          u,
        );
      }
    }
    for (let R of [-2, 2])
      for (let P of [-0.7175, 0.7175]) {
        let C = R + P;
        b(
          n(z, C - 0.04, T + 0.17),
          n(A, C - 0.04, E + 0.17),
          n(A, C + 0.04, E + 0.17),
          n(z, C + 0.04, T + 0.17),
          c,
          u,
        );
      }
  }
  for (let z = 0; z < 2; z++) {
    let A = p - z * 3,
      T = A - 3;
    b(
      n(T, -s.hw - s.apron, s.lip(T) + 0.04),
      n(A, -s.hw - s.apron, s.lip(A) + 0.04),
      n(A, s.hw + s.apron, s.lip(A) + 0.04),
      n(T, s.hw + s.apron, s.lip(T) + 0.04),
      a,
      u,
    );
  }
  let v = s.floor(s.L),
    x = s.lip(s.L) + 1.5,
    y = 3.8,
    M = 5.4,
    S = [-s.ux, 0, -s.uz];
  (b(
    n(s.L, -s.hw - 0.35, v),
    n(s.L, -y, v),
    n(s.L, -y, x),
    n(s.L, -s.hw - 0.35, x),
    a,
    S,
  ),
    b(
      n(s.L, y, v),
      n(s.L, s.hw + 0.35, v),
      n(s.L, s.hw + 0.35, x),
      n(s.L, y, x),
      a,
      S,
    ),
    b(n(s.L, -y, v + M), n(s.L, y, v + M), n(s.L, y, x), n(s.L, -y, x), a, S),
    b(
      n(s.L, -s.hw - 0.35, x),
      n(s.L, s.hw + 0.35, x),
      n(s.L + 0.6, s.hw + 0.35, x),
      n(s.L + 0.6, -s.hw - 0.35, x),
      i,
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
  (b(n(s.L, -y, v), n(w, -y, v), n(w, y, v), n(s.L, y, v), l, u),
    b(
      n(s.L, -y, v + M),
      n(s.L, y, v + M),
      n(w, y, v + M),
      n(w, -y, v + M),
      l,
      [0, -1, 0],
    ));
  for (let z of [-1, 1])
    b(
      n(s.L, y * z, v),
      n(w, y * z, v),
      n(w, y * z, v + M),
      n(s.L, y * z, v + M),
      l,
      f(-z),
    );
  b(n(w, -y, v), n(w, y, v), n(w, y, v + M), n(w, -y, v + M), l, S);
  for (let z = 0; z < 3; z++) {
    let A = s.L + 0.6 + z * 2,
      T = A + 2;
    b(
      n(A, -s.hw - s.apron, s.lip(A) + 0.04),
      n(T, -s.hw - s.apron, s.lip(T) + 0.04),
      n(T, s.hw + s.apron, s.lip(T) + 0.04),
      n(A, s.hw + s.apron, s.lip(A) + 0.04),
      a,
      u,
    );
  }
  let _ = n((p + s.L) / 2, 0, 0);
  e.push({
    t: "obb",
    x: _[0],
    z: _[2],
    hx: s.hw + 0.4,
    hz: (s.L - p) / 2,
    c: s.uz,
    s: s.ux,
    wall: !0,
    y0: s.yM - 1,
    y1: s.lip(s.s0) + 3,
  });
}
function Kpt(o, t, e, s) {
  let n = e ? t.L : 0,
    i = e ? 1 : -1,
    a = Ot(t.E, n, {}),
    r = {},
    l = t.W + 6,
    c = 1 / 0,
    h = [];
  for (let u = 0.5; u <= lh; u += 1.5)
    for (let d = -l; d <= l; d += 1.5) {
      let p = n - i * u,
        m = Ot(t.E, Math.max(0, Math.min(t.E.L, p)), {}),
        g = m.x + (p - Math.max(0, Math.min(t.E.L, p))) * m.dx + m.nx * d,
        b = m.z + (p - Math.max(0, Math.min(t.E.L, p))) * m.dz + m.nz * d;
      h.push([g, b]);
    }
  let f = (u, d, p, m) =>
    p > a.x - 40 && u < a.x + 40 && m > a.z - 40 && d < a.z + 40;
  for (let u of o.edges) {
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
      for (let [b, v] of h)
        (ys(u, b, v, r),
          r.d <= r.w &&
            r.s >= u.s0 &&
            r.s <= u.s1 &&
            r.y > s + 3 &&
            (c = Math.min(c, r.y)));
  }
  for (let u of o.juns)
    if (!(
      !u.polys?.length ||
      u.legs?.some(([d]) => d.tunnel || d.layered) ||
      !f(u.bb[0], u.bb[1], u.bb[2], u.bb[3])
    ))
      for (let [d, p] of h)
        u.y > s + 3 &&
          u.polys.some((m) => rn(m[0].pts, d, p)) &&
          (c = Math.min(c, u.y));
  return c;
}
function Dq(o, t) {
  ((t.box = Bk(t)), (t.top = [-1e9, -1e9]), (o._carve ||= []).push(t));
}
var qq = (o, t) => {
    let e = o.x0 + (o.nx - 1) * o.step,
      s = o.z0 + (o.nz - 1) * o.step;
    return !(t[2] < o.x0 || t[0] > e || t[3] < o.z0 || t[1] > s);
  },
  Bk = (o) => {
    let t = o.W + wo + 3,
      e = [
        Math.min(o.Ja.x, o.Jb.x) - t,
        Math.min(o.Ja.z, o.Jb.z) - t,
        Math.max(o.Ja.x, o.Jb.x) + t,
        Math.max(o.Ja.z, o.Jb.z) + t,
      ];
    for (let s = 0; s < o.E.n; s++) {
      let n = o.E.P[s * 3],
        i = o.E.P[s * 3 + 1];
      ((e[0] = Math.min(e[0], n - t)),
        (e[1] = Math.min(e[1], i - t)),
        (e[2] = Math.max(e[2], n + t)),
        (e[3] = Math.max(e[3], i + t)));
    }
    return e;
  };
function jq(o, t) {
  let e = (o.tunnelsAll || []).filter((s) => qq(t, s.box || Bk(s)));
  return (e.length && ((o._carve = e), $q(o, t)), (t.tunnels = e), e);
}
