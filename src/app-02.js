// app 02 — math
// Lines 346-405 of readable/app.pretty.js (statement-aligned).
function b4(i) {
  let t = 0,
    e = 1e9;
  for (let s = 0; s < ws; s++) {
    let n = Math.abs(i - fe[s]);
    n < e && ((e = n), (t = s));
  }
  return t;
}
function eo(i, t, e = null, s = void 0) {
  if (hc) return hc.driveHeight(i, t, e);
  if (Zp) return Zp.driveHeight(i, t, e, s);
  let n = Qi.grid.has(Math.floor(i / Qi.HC) * 100003 + Math.floor(t / Qi.HC))
    ? Hi(i, t)
    : null;
  if (n) return (e && ((e.dx = n.dy * n.ux), (e.dz = n.dy * n.uz)), n.y);
  if (i > Oi.x0 && i < Oi.x1 && Math.abs(t - Oi.z) < Oi.hz)
    return Yt(i, t, e) + IT(i);
  let o = Yt(i, t, e),
    a = Qr(i, t);
  return a === "sea"
    ? WB
    : a === "walk" || a === "median" || a === "lot"
      ? o + Ke
      : o;
}
function Ev(i, t) {
  if (t < 40 || i > ae[mn - 2] + 20) return zi.WATERFRONT;
  if (i > 1270 && t > 780) return zi.FIDI;
  if (i > 900 && i < 1200 && t > 860 && t < 1300) return zi.CHINATOWN;
  if (i > 700 && t > 1330) return zi.DOWNTOWN;
  if (i > 900 && t < 860) return zi.NORTHBEACH;
  let e = Ws(Math.floor(i / 105), Math.floor(t / 84), 7);
  return t > 1e3 && i > 300
    ? e < 0.6
      ? zi.APARTMENTS
      : zi.VICTORIAN
    : e < 0.72
      ? zi.VICTORIAN
      : zi.APARTMENTS;
}
function Ca(i, t) {
  return {
    x0: ae[i] + ls[i].hw,
    x1: ae[i + 1] - ls[i + 1].hw,
    z0: fe[t] + Qe[t].hw,
    z1: fe[t + 1] - Qe[t + 1].hw,
  };
}
function Ei(i, t) {
  return {
    x0: ae[i] + ls[i].hw + ls[i].sw,
    x1: ae[i + 1] - ls[i + 1].hw - ls[i + 1].sw,
    z0: fe[t] + Qe[t].hw + Qe[t].sw,
    z1: fe[t + 1] - Qe[t + 1].hw - Qe[t + 1].sw,
  };
}
function XB(i) {
  Zp = i;
}
