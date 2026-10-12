// app 358 — math
// Lines 176233-176325 of readable/app.pretty.js (statement-aligned).
as();
En();
var GF = [0.55, 0.8];
function Ctt(i, t) {
  let e = i.wreck;
  GI(
    e,
    -Math.sin(i.heading),
    -Math.cos(i.heading),
    t,
    GF[0],
    GF[1],
    (e.aw ??= WI(i.V.L, i.V.bw, GF[1])),
    "r",
  );
}
var byt = [
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
  dM = {
    boxtruck: { a: 1.4, T: 1.5, s0: 3.2, v: 0.85 },
    stepvan: { a: 1.7, T: 1.4, s0: 3, v: 0.9 },
    garbage: { a: 1.1, T: 1.7, s0: 3.5, v: 0.7 },
    semi: { a: 0.9, T: 1.9, s0: 4, v: 0.9 },
    moto: { a: 3.2, T: 1, s0: 2, v: 1.1 },
  },
  xyt = (i) =>
    !!i && (i.hwy || (i.lanes >= 2 && /^(trunk|primary)/.test(i.cls || ""))),
  vyt = { m: 1 / 0, I: 1 / 0, vx: 0, vz: 0, w: 0, x: 0, z: 0 },
  yyt = {
    sedan: 0,
    hatch: 1,
    suv: 2,
    pickup: 3,
    van: 3,
    taxi: 0,
    waymo: 2,
    police: 2,
  },
  wyt = ["VAN NESS AVE", "POLK ST", "STOCKTON ST", "KEARNY ST"],
  Myt = [
    "UNION ST",
    "JACKSON ST",
    "WASHINGTON ST",
    "CLAY ST",
    "SACRAMENTO ST",
    "MARKET ST",
    "BUSH ST",
  ],
  ac = (i, t) => {
    let e = i.hw >= 5.8 ? 2.3 : 0,
      s = i.median ? 1.6 : 0,
      n = Math.max((i.hw - e - s) / i.lanes, 2.6);
    return s + (t + 0.5) * n;
  },
  Syt = (i, t) => ls[i].lanes > 1 || Qe[t].lanes > 1,
  Zo = (i, t, e) => (i < t ? t : i > e ? e : i),
  pM = [110, 420],
  WF = 70,
  gf = 1.5,
  kyt = 0.4;
function bf(i, t, e = 1) {
  let s = t.x - i.x,
    n = t.z - i.z;
  for (let o of [i, t]) {
    let a = Math.cos(o.heading),
      r = Math.sin(o.heading);
    for (let [l, c, h] of [
      [a, -r, o.V.bw / 2],
      [r, a, o.V.L / 2],
    ]) {
      let f = o === i ? t : i,
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
