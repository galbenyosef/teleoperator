// app 165 — math
// Lines 100133-100208 of readable/app.pretty.js (statement-aligned).
var gx = { rails: !0, lamps: !0, joints: !0 },
  G$ = [0.55, 0.56, 0.56, 0.5],
  _C = [0.47, 0.48, 0.48, 0.5],
  r2t = [0.16, 0.16, 0.17, 0.5],
  l2t = [0.075, 0.075, 0.08, 0.5],
  tz = 48,
  EC = 6;
function aX(o, t, e, s, n, i, a, r, l, c = !0) {
  if (gx.rails) {
    il(o, [n[0], n[1] + 1.07, n[2]], [i[0], i[1] + 1.07, i[2]], 0.045, G$);
    for (let h = Math.ceil(e / EC) * EC; h < s; h += EC) {
      let f = (h - e) / Math.max(1e-6, s - e),
        u = n[0] + (i[0] - n[0]) * f,
        d = n[1] + (i[1] - n[1]) * f,
        p = n[2] + (i[2] - n[2]) * f;
      il(o, [u, d + 0.84, p], [u, d + 1.03, p], 0.035, G$);
    }
  }
  if (gx.lamps && c)
    for (let h = Math.ceil(e / tz) * tz; h < s; h += tz) {
      if (((Math.round(h / tz) + t.id) & 1) !== (a > 0 ? 1 : 0)) continue;
      let f = (h - e) / Math.max(1e-6, s - e),
        u = n[0] + (i[0] - n[0]) * f,
        d = n[1] + (i[1] - n[1]) * f + 0.85,
        p = n[2] + (i[2] - n[2]) * f,
        m = 11.5,
        g = -r * a,
        b = -l * a,
        v = 2.4;
      (il(o, [u, d, p], [u, d + 0.25, p], 0.16, _C),
        il(o, [u, d + 0.25, p], [u, d + m, p], 0.085, _C),
        il(o, [u, d + m, p], [u + g * v, d + m + 0.45, p + b * v], 0.05, _C));
      let x = u + g * (v + 0.35),
        y = p + b * (v + 0.35);
      il(
        o,
        [u + g * v, d + m + 0.42, p + b * v],
        [x, d + m + 0.42, y],
        0.13,
        r2t,
      );
    }
}
function c2t(o, t, e, s, n) {
  let i = {},
    a = {};
  for (let r = Math.ceil((e - 19) / 37) * 37 + 19; r < s; r += 37) {
    if (
      r < t.s0 + 3 ||
      r > t.s1 - 3 ||
      (Ot(t, r - 0.16, i), Ot(t, r + 0.16, a), i.y - n.terrainAt(i.x, i.z) < 2)
    )
      continue;
    let l = [i.x - i.nx * i.w, i.y + 0.012, i.z - i.nz * i.w],
      c = [i.x + i.nx * i.w, i.y + 0.012, i.z + i.nz * i.w],
      h = [a.x - a.nx * a.w, a.y + 0.012, a.z - a.nz * a.w],
      f = [a.x + a.nx * a.w, a.y + 0.012, a.z + a.nz * a.w];
    vx(o, l, c, f, h, l2t, !0);
  }
}
function Cw(o, t) {
  return UC(o).girders ? 1.55 : t < 3 ? 1.5 : 1.85;
}
function rz(o, t) {
  if (o._dj !== void 0) return o._dj;
  let e = !1;
  if (
    o.polys.length &&
    t?.terrainAt &&
    o.legs.some(([s]) => s.elev && !s.custom && !s.tunnelR && !s.tunnel)
  )
    for (let s of o.rings)
      for (let n = 0; n < s.y.length && !e; n++)
        s.y[n] - t.terrainAt(s.pts[n * 2], s.pts[n * 2 + 1]) > 1 && (e = !0);
  return (o._dj = e);
}
