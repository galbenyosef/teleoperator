// app 02 — math
// Lines 341-438 of readable/app.pretty.js (statement-aligned).
function m0(o, t) {
  if (Hc) return Hc.surfaceAt(o, t);
  if (O1) return O1.surfaceAt(o, t);
  if (
    uo.grid.has(Math.floor(o / uo.HC) * 100003 + Math.floor(t / uo.HC)) &&
    Ni(o, t)
  )
    return "road";
  if (o > Ye.x || t < Ye.z) return "sea";
  if (
    o < he[0] - ps[0].hw - ps[0].sw ||
    t > pe[ks - 1] + ns[ks - 1].hw + ns[ks - 1].sw
  )
    return "out";
  let e = x8(o),
    s = v8(t),
    n = Math.abs(o - he[e]),
    i = Math.abs(t - pe[s]),
    a = ps[e],
    r = ns[s];
  return n <= a.hw || i <= r.hw
    ? (a.median && n < a.median && i > r.hw) ||
      (r.median && i < r.median && n > a.hw)
      ? "median"
      : "road"
    : n <= a.hw + a.sw || i <= r.hw + r.sw
      ? "walk"
      : "lot";
}
function x8(o) {
  let t = 0,
    e = 1e9;
  for (let s = 0; s < xn; s++) {
    let n = Math.abs(o - he[s]);
    n < e && ((e = n), (t = s));
  }
  return t;
}
function v8(o) {
  let t = 0,
    e = 1e9;
  for (let s = 0; s < ks; s++) {
    let n = Math.abs(o - pe[s]);
    n < e && ((e = n), (t = s));
  }
  return t;
}
function Wi(o, t, e = null, s = void 0) {
  if (Hc) return Hc.driveHeight(o, t, e);
  if (O1) return O1.driveHeight(o, t, e, s);
  let n = uo.grid.has(Math.floor(o / uo.HC) * 100003 + Math.floor(t / uo.HC))
    ? Ni(o, t)
    : null;
  if (n) return (e && ((e.dx = n.dy * n.ux), (e.dz = n.dy * n.uz)), n.y);
  if (o > Yi.x0 && o < Yi.x1 && Math.abs(t - Yi.z) < Yi.hz)
    return $t(o, t, e) + rR(o);
  let i = $t(o, t, e),
    a = m0(o, t);
  return a === "sea"
    ? jH
    : a === "walk" || a === "median" || a === "lot"
      ? i + Ze
      : i;
}
function S3(o, t) {
  if (t < 40 || o > he[xn - 2] + 20) return Bi.WATERFRONT;
  if (o > 1270 && t > 780) return Bi.FIDI;
  if (o > 900 && o < 1200 && t > 860 && t < 1300) return Bi.CHINATOWN;
  if (o > 700 && t > 1330) return Bi.DOWNTOWN;
  if (o > 900 && t < 860) return Bi.NORTHBEACH;
  let e = js(Math.floor(o / 105), Math.floor(t / 84), 7);
  return t > 1e3 && o > 300
    ? e < 0.6
      ? Bi.APARTMENTS
      : Bi.VICTORIAN
    : e < 0.72
      ? Bi.VICTORIAN
      : Bi.APARTMENTS;
}
function Wa(o, t) {
  return {
    x0: he[o] + ps[o].hw,
    x1: he[o + 1] - ps[o + 1].hw,
    z0: pe[t] + ns[t].hw,
    z1: pe[t + 1] - ns[t + 1].hw,
  };
}
function Hi(o, t) {
  return {
    x0: he[o] + ps[o].hw + ps[o].sw,
    x1: he[o + 1] - ps[o + 1].hw - ps[o + 1].sw,
    z0: pe[t] + ns[t].hw + ns[t].sw,
    z1: pe[t + 1] - ns[t + 1].hw - ns[t + 1].sw,
  };
}
function JH(o) {
  O1 = o;
}
