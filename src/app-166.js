// app 166 — math
// Lines 99897-99972 of readable/app.pretty.js (statement-aligned).
var Rb = { rails: !0, lamps: !0, joints: !0 },
  Hj = [0.55, 0.56, 0.56, 0.5],
  K7 = [0.47, 0.48, 0.48, 0.5],
  Bdt = [0.16, 0.16, 0.17, 0.5],
  Odt = [0.075, 0.075, 0.08, 0.5],
  tk = 48,
  Y7 = 6;
function nV(i, t, e, s, n, o, a, r, l, c = !0) {
  if (Rb.rails) {
    F0(i, [n[0], n[1] + 1.07, n[2]], [o[0], o[1] + 1.07, o[2]], 0.045, Hj);
    for (let h = Math.ceil(e / Y7) * Y7; h < s; h += Y7) {
      let f = (h - e) / Math.max(1e-6, s - e),
        u = n[0] + (o[0] - n[0]) * f,
        d = n[1] + (o[1] - n[1]) * f,
        p = n[2] + (o[2] - n[2]) * f;
      F0(i, [u, d + 0.84, p], [u, d + 1.03, p], 0.035, Hj);
    }
  }
  if (Rb.lamps && c)
    for (let h = Math.ceil(e / tk) * tk; h < s; h += tk) {
      if (((Math.round(h / tk) + t.id) & 1) !== (a > 0 ? 1 : 0)) continue;
      let f = (h - e) / Math.max(1e-6, s - e),
        u = n[0] + (o[0] - n[0]) * f,
        d = n[1] + (o[1] - n[1]) * f + 0.85,
        p = n[2] + (o[2] - n[2]) * f,
        m = 11.5,
        g = -r * a,
        b = -l * a,
        x = 2.4;
      (F0(i, [u, d, p], [u, d + 0.25, p], 0.16, K7),
        F0(i, [u, d + 0.25, p], [u, d + m, p], 0.085, K7),
        F0(i, [u, d + m, p], [u + g * x, d + m + 0.45, p + b * x], 0.05, K7));
      let v = u + g * (x + 0.35),
        y = p + b * (x + 0.35);
      F0(
        i,
        [u + g * x, d + m + 0.42, p + b * x],
        [v, d + m + 0.42, y],
        0.13,
        Bdt,
      );
    }
}
function Hdt(i, t, e, s, n) {
  let o = {},
    a = {};
  for (let r = Math.ceil((e - 19) / 37) * 37 + 19; r < s; r += 37) {
    if (
      r < t.s0 + 3 ||
      r > t.s1 - 3 ||
      (Ot(t, r - 0.16, o), Ot(t, r + 0.16, a), o.y - n.terrainAt(o.x, o.z) < 2)
    )
      continue;
    let l = [o.x - o.nx * o.w, o.y + 0.012, o.z - o.nz * o.w],
      c = [o.x + o.nx * o.w, o.y + 0.012, o.z + o.nz * o.w],
      h = [a.x - a.nx * a.w, a.y + 0.012, a.z - a.nz * a.w],
      f = [a.x + a.nx * a.w, a.y + 0.012, a.z + a.nz * a.w];
    Lb(i, l, c, f, h, Odt, !0);
  }
}
function Oy(i, t) {
  return hP(i).girders ? 1.55 : t < 3 ? 1.5 : 1.85;
}
function rk(i, t) {
  if (i._dj !== void 0) return i._dj;
  let e = !1;
  if (
    i.polys.length &&
    t?.terrainAt &&
    i.legs.some(([s]) => s.elev && !s.custom && !s.tunnelR && !s.tunnel)
  )
    for (let s of i.rings)
      for (let n = 0; n < s.y.length && !e; n++)
        s.y[n] - t.terrainAt(s.pts[n * 2], s.pts[n * 2 + 1]) > 1 && (e = !0);
  return (i._dj = e);
}
