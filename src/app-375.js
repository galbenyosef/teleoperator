// app 375 — math
// Lines 182920-183068 of readable/app.pretty.js (statement-aligned).
es();
Pn();
var GB = [0.55, 0.8],
  Lnt = 8.5;
var Int = (o, t, e) =>
    0.5 * (o.V.H || 1.45) * (1 - Math.cos(t) * Math.cos(e)) +
    0.5 * o.V.bw * Math.abs(Math.sin(t)) * Math.abs(Math.cos(e)),
  jv = new vi(),
  Fnt = (o) =>
    o.wreck && o.roll
      ? 0.5 * (o.V.H || 1.45) * Math.min(1, Math.abs(Math.sin(o.roll)))
      : 0,
  Ont = (o) =>
    o.wreck && o.pitch
      ? 0.5 * (o.V.H || 1.45) * Math.min(1, Math.abs(Math.sin(o.pitch)))
      : 0;
function Bnt(o, t, e, s, n = null) {
  let i = t.rb;
  if (
    ((t.airT = (t.airT || 0) + e),
    (i.v.x = t.vx),
    (i.v.z = t.vz),
    (i.w.y = t.r),
    Ic.set(0, i.y0, 0).applyQuaternion(i.q),
    (i.p.x = o.x + Ic.x),
    (i.p.z = o.z + Ic.z),
    i.step(e, s, n, null, 1 / 120),
    jv.setFromQuaternion(i.q, "YXZ"),
    (o.pitch = -jv.x),
    (o.heading = jv.y - Math.PI),
    (o.roll = jv.z),
    Ic.set(0, -i.y0, 0).applyQuaternion(i.q),
    (o.x = i.p.x + Ic.x),
    (o.z = i.p.z + Ic.z),
    (o.y = i.p.y + Ic.y),
    (t.vx = i.v.x),
    (t.vz = i.v.z),
    (t.r = i.w.y),
    i.still < 0.35)
  )
    return !0;
  let a = i.upY();
  return (
    (t.air = !1),
    (t.vx = t.vz = t.r = 0),
    a > 0.75
      ? ((o.pitch = 0),
        (o.roll = 0),
        (o.y = s(o.x, o.z, o.y + 0.5)),
        (t.flat = !1))
      : ((t.flat = !0), (t.yOff = o.y - s(o.x, o.z, o.y + 1))),
    (t.rb = null),
    !1
  );
}
var Ic = new dt(),
  RHt = new tn(),
  Nnt = new dt();
function Hnt(o, t) {
  let e = o.wreck;
  BO(
    e,
    -Math.sin(o.heading),
    -Math.cos(o.heading),
    t,
    GB[0],
    GB[1],
    (e.aw ??= NO(o.V.L, o.V.bw, GB[1])),
    "r",
  );
}
var e6t = [
    ["sedan", 0.31],
    ["hatch", 0.15],
    ["suv", 0.2],
    ["pickup", 0.06],
    ["van", 0.1],
    ["taxi", 0.04],
    ["waymo", 0.06],
    ["boxtruck", 0.03],
    ["stepvan", 0.025],
    ["garbage", 0.008],
    ["semi", 0.014],
    ["moto", 0.03],
  ],
  m4 = {
    boxtruck: { a: 1.4, T: 1.5, s0: 3.2, v: 0.85 },
    stepvan: { a: 1.7, T: 1.4, s0: 3, v: 0.9 },
    garbage: { a: 1.1, T: 1.7, s0: 3.5, v: 0.7 },
    semi: { a: 0.9, T: 1.9, s0: 4, v: 0.9 },
    moto: { a: 3.2, T: 1, s0: 2, v: 1.1 },
  },
  s6t = (o) =>
    !!o && (o.hwy || (o.lanes >= 2 && /^(trunk|primary)/.test(o.cls || ""))),
  n6t = [],
  i6t = { m: 1 / 0, I: 1 / 0, vx: 0, vz: 0, w: 0, x: 0, z: 0 },
  o6t = {
    sedan: 0,
    hatch: 1,
    suv: 2,
    pickup: 3,
    van: 3,
    taxi: 0,
    waymo: 2,
    police: 2,
  },
  a6t = ["VAN NESS AVE", "POLK ST", "STOCKTON ST", "KEARNY ST"],
  r6t = [
    "UNION ST",
    "JACKSON ST",
    "WASHINGTON ST",
    "CLAY ST",
    "SACRAMENTO ST",
    "MARKET ST",
    "BUSH ST",
  ],
  Lc = (o, t) => {
    let e = o.hw >= 5.8 ? 2.3 : 0,
      s = o.median ? 1.6 : 0,
      n = Math.max((o.hw - e - s) / o.lanes, 2.6);
    return s + (t + 0.5) * n;
  },
  l6t = (o, t) => ps[o].lanes > 1 || ns[t].lanes > 1,
  la = (o, t, e) => (o < t ? t : o > e ? e : o),
  g4 = [110, 420],
  VB = 70,
  Jf = 1.5,
  c6t = 0.4;
function cl(o, t, e = 1) {
  let s = t.x - o.x,
    n = t.z - o.z;
  for (let i of [o, t]) {
    let a = Math.cos(i.heading),
      r = Math.sin(i.heading);
    for (let [l, c, h] of [
      [a, -r, i.V.bw / 2],
      [r, a, i.V.L / 2],
    ]) {
      let f = i === o ? t : o,
        u = Math.cos(f.heading),
        d = Math.sin(f.heading),
        p =
          (Math.abs(l * u - c * d) * f.V.bw) / 2 +
          (Math.abs(l * d + c * u) * f.V.L) / 2;
      if (Math.abs(s * l + n * c) > (h + p) * e) return !1;
    }
  }
  return !0;
}
