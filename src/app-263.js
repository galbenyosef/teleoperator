// app 263 — tube
// Lines 132898-133233 of readable/app.pretty.js (statement-aligned).
function r3t(o) {
  let t = o.lod,
    e = t ? 4 : 6;
  (o.wheel(-0.07, 0.07, 0.31, 0.74, 0.31, "mwheel"),
    o.wheel(-0.08, 0.08, 0.31, -0.7, 0.31, "mwheel"));
  for (let i of [1, -1])
    o.tube([i * 0.08, 0.31, 0.74], [i * 0.08, 0.98, 0.52], 0.028, "chrome", e);
  (o.tube([-0.33, 1.02, 0.46], [0.33, 1.02, 0.46], 0.016, "black", 4),
    o.blob(
      [0, 0.86, 0.6],
      [0.23, 0.25, 0.24],
      (i) => (i[1] < -0.12 ? "black" : "blue"),
      t ? 6 : 8,
      t ? 3 : 5,
    ),
    o.quad(
      [-0.19, 1.08, 0.72],
      [0.19, 1.08, 0.72],
      [0.14, 1.34, 0.56],
      [-0.14, 1.34, 0.56],
      "visor",
    ),
    o.quad(
      [-0.1, 0.8, 0.845],
      [0.1, 0.8, 0.845],
      [0.08, 0.93, 0.83],
      [-0.08, 0.93, 0.83],
      "head",
      !0,
    ),
    o.blob(
      [0, 0.95, 0.22],
      [0.2, 0.13, 0.26],
      (i) => "motoTank",
      t ? 6 : 8,
      t ? 3 : 4,
    ),
    o.box(-0.16, 0.16, 0.8, 0.9, -0.6, 0, "black", 0.04),
    o.blob([0, 0.9, -0.72], [0.13, 0.08, 0.28], () => "blue", 6, 3),
    o.box(-0.07, 0.07, 0.86, 0.94, -1, -0.98, {
      nz: "tail",
      px: null,
      nx: null,
      py: null,
      ny: null,
      pz: null,
    }),
    o.box(-0.2, 0.2, 0.3, 0.7, -0.25, 0.4, "chassis", 0.06),
    o.tube([0, 0.45, -0.15], [0, 0.31, -0.7], 0.035, "black", e),
    t || o.tube([0.16, 0.36, -0.1], [0.2, 0.52, -0.95], 0.05, "chrome", 6));
  let s = [0, 0.96, -0.36],
    n = [0, 1.43, -0.02];
  (o.tube(s, n, 0.17, "leather", e, 0.19),
    o.blob([0, 1.38, -0.06], [0.22, 0.09, 0.16], () => "leather", 6, 3));
  for (let i of [1, -1]) {
    let a = [i * 0.2, 1.38, -0.04],
      r = [i * 0.27, 1.17, 0.22],
      l = [i * 0.31, 1.03, 0.45];
    (o.tube(a, r, 0.055, "leather", e, 0.05),
      o.tube(r, l, 0.048, "leather", e, 0.04),
      o.box(
        l[0] - 0.04,
        l[0] + 0.04,
        l[1] - 0.03,
        l[1] + 0.04,
        l[2] - 0.04,
        l[2] + 0.05,
        "black",
      ));
    let c = [i * 0.13, 0.94, -0.34],
      h = [i * 0.21, 0.83, 0.08],
      f = [i * 0.19, 0.42, -0.12];
    (o.tube(c, h, 0.085, "jeans", e, 0.07),
      o.tube(h, f, 0.065, "jeans", e, 0.05),
      o.box(
        f[0] - 0.05,
        f[0] + 0.05,
        0.33,
        0.47,
        f[2] - 0.06,
        f[2] + 0.17,
        "black",
      ));
  }
  o.blob(
    [0, 1.57, 0.06],
    [0.14, 0.15, 0.16],
    (i) => (i[2] > 0.04 && i[1] > -0.06 && i[1] < 0.1 ? "visor" : "helmet"),
    t ? 6 : 10,
    t ? 4 : 6,
  );
}
var l3t = { boxtruck: n3t, stepvan: i3t, garbage: o3t, semi: a3t, moto: r3t },
  c3t = { boxtruck: 0.98, stepvan: 0.98, garbage: 1.02, semi: 1.03, moto: 0 };
function h3t(o, t) {
  let e = new Float32Array(16);
  for (let s = 0; s < 6 && s < o.length; s++)
    ((e[s * 2] = o[s][0]), (e[s * 2 + 1] = o[s][1]));
  return (
    (e[12] = 2),
    o[6] && ((e[13] = o[6][0]), (e[14] = o[6][1])),
    (e[15] = t),
    e
  );
}
function QJ(o) {
  let t = typeof document > "u" ? null : s3t(),
    e = new me({
      color: 16777215,
      map: t,
      roughness: 1,
      metalness: 0,
      side: ls,
      vertexColors: !0,
    });
  ((e.userData.mbAlbedo = o),
    (e.userData.mbTrafficFallback = !0),
    (e.userData.carLamps = !0),
    (e.name = "car_trucks"));
  let s = {};
  for (let [n, i] of Object.entries(l3t)) {
    let a = [0, 1].map((c) => {
        let h = new XI(c);
        return (i(h), h);
      }),
      r = a.map((c) => c.geometry()),
      l = e.clone();
    ((l.map = t),
      (l.userData = { ...e.userData, mbWheels: h3t(a[0].axles(), c3t[n]) }),
      (l.name = "car_" + n),
      (s[n] = { geo: r[0], geo1: r[1], mat: l, livery: !0, V: Ux[n] }));
  }
  return s;
}
es();
es();
var vo = { tele: 0, mb: 1, emoji: 2, sf: 3 },
  f3t = 0.305,
  u3t = 0.152,
  nM = null;
function d3t() {
  return !nM && typeof document > "u"
    ? (nM = new ai())
    : (nM ||
        (nM = e0("assets/plates.webp", (o) => {
          ((o.colorSpace = Je), (o.flipY = !1), (o.anisotropy = 8));
        })),
      nM);
}
var t_ = null;
function tZ() {
  return (
    t_ ||
      ((t_ = new me({
        name: "Plate",
        map: d3t(),
        roughness: 0.72,
        metalness: 0,
        envMapIntensity: 0.6,
      })),
      (t_.userData.mbNoReflect = !0)),
    t_
  );
}
var iM = null;
function JI() {
  return (
    iM ||
      ((iM = tZ().clone()),
      (iM.name = "PlateInst"),
      (iM.userData = { mbNoReflect: !0 })),
    iM
  );
}
var YI = {
  sedan: [
    { c: [0, 0.61, -2.4301], n: [0, 0.0471, -0.9989], d: 0.0316 },
    { c: [0, 0.47, 2.4109], n: [-0.0451, 0.0452, 0.998], d: 0.0625 },
  ],
  hatch: [
    { c: [0, 0.72, -2.1097], n: [-0.0012, 0.0516, -0.9987], d: 0.0724 },
    { c: [0, 0.44, 2.1532], n: [0.0471, 0.0507, 0.9976], d: 0.0718 },
  ],
  suv: [
    { c: [0, 0.66, -2.4229], n: [0.0022, -0.2758, -0.9612], d: 0.0712 },
    { c: [0, 0.47, 2.3877], n: [-0.0093, -0.0374, 0.9993], d: 0.0745 },
  ],
  pickup: [
    { c: [0, 0.67, -2.5985], n: [-0.0036, -0.0783, -0.9969], d: 0.0409 },
    { c: [0, 0.57, 2.6437], n: [-9e-4, -0.0618, 0.9981], d: 0.0362 },
  ],
  van: [
    { c: [0, 0.77, -2.4831], n: [-9e-4, 0.0143, -0.9999], d: 0 },
    { c: [0, 0.44, 2.5539], n: [8e-4, -0.0594, 0.9982], d: 0.0231 },
  ],
  taxi: [
    { c: [0, 0.57, -2.3048], n: [-4e-4, -0.0708, -0.9975], d: 0.0312 },
    { c: [0, 0.42, 2.2628], n: [-7e-4, 0.0215, 0.9998], d: 0.0292 },
  ],
  waymo: [
    { c: [0, 0.58, -2.2097], n: [-0.0045, -0.0289, -0.9996], d: 0 },
    { c: [0, 0.51, 2.3645], n: [-0.0044, -0.0104, 0.9999], d: 0.0506 },
  ],
  bus: [{ c: [0, 0.78, -5.8774], n: [6e-4, 0.0623, -0.9981], d: 0.0312 }],
  boxtruck: [
    { c: [0, 0.71, -4.804], n: [0, 0, -1], d: 0 },
    { c: [0, 0.55, 5.004], n: [0, 0, 1], d: 0 },
  ],
  stepvan: [
    { c: [0, 0.49, -3.604], n: [0, 0, -1], d: 0 },
    { c: [0, 0.48, 3.504], n: [0, 0, 1], d: 0 },
  ],
  garbage: [
    { c: [0, 0.6, -4.504], n: [0, 0, -1], d: 0 },
    { c: [0, 0.52, 4.784], n: [0, 0, 1], d: 0 },
  ],
  semi: [{ c: [0, 0.6, 8.504], n: [0, 0, 1], d: 0 }],
  player_waymo: [
    { c: [0, 0.58, 2.2106], n: [1e-4, -0.0249, 0.9997], d: 0 },
    { c: [0, 0.46, -2.3648], n: [-0.0041, -0.0415, -0.9991], d: 0.0505 },
  ],
  player_ferrari: [
    { c: [0, 0.58, 2.283], n: [7e-4, -0.1417, 0.9899], d: 0.0706 },
    { c: [0, 0.41, -2.2689], n: [0.0029, 0.0986, -0.9951], d: 0.0878 },
  ],
};
YI.police = YI.suv.map((o) => ({
  ...o,
  c: [o.c[0], o.c[1] + 0.05, o.c[2] + Math.sign(o.c[2]) * 0.12],
}));
var p3t = {
    police: vo.sf,
    sedan: vo.sf,
    hatch: vo.mb,
    suv: vo.emoji,
    pickup: vo.tele,
    van: vo.sf,
    taxi: vo.tele,
    waymo: vo.tele,
    bus: vo.sf,
    boxtruck: vo.mb,
    stepvan: vo.emoji,
    garbage: vo.sf,
    semi: vo.tele,
  },
  oM = (o, t = p3t[o] ?? vo.emoji) => YI[o]?.map((e) => ({ ...e, cell: t }));
function eZ(o, t = 0) {
  t += 0.004;
  let e = [],
    s = [],
    n = [],
    i = [],
    a = 4 / 512;
  for (let h of o) {
    let f = new dt(...h.n).normalize(),
      u = new dt(0, 1, 0).cross(f).normalize(),
      d = f.clone().cross(u).normalize(),
      p = new dt(...h.c).addScaledVector(f, t),
      m = (h.w || f3t) / 2,
      g = (h.h || u3t) / 2,
      b = (h.cell % 2) * 0.5,
      v = (h.cell >> 1) * 0.5,
      x = e.length / 3;
    for (let [y, M] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ]) {
      let S = p
        .clone()
        .addScaledVector(u, y * m)
        .addScaledVector(d, M * g);
      (e.push(S.x, S.y, S.z),
        s.push(f.x, f.y, f.z),
        n.push(b + (y < 0 ? a : 0.5 - a), v + (M > 0 ? a : 0.5 - a)));
    }
    if ((i.push(x, x + 1, x + 2, x, x + 2, x + 3), h.d > 0)) {
      let y = p.clone().addScaledVector(f, -0.01),
        M = p.clone().addScaledVector(f, -0.004 - h.d - t),
        S = m + 0.008,
        w = g + 0.008,
        _ = (T, E, R) =>
          T.clone()
            .addScaledVector(u, E * S)
            .addScaledVector(d, R * w),
        z = (T, E) => {
          let R = e.length / 3;
          for (let P of T)
            (e.push(P.x, P.y, P.z),
              s.push(E.x, E.y, E.z),
              n.push(0.002, 0.002));
          i.push(R, R + 1, R + 2, R, R + 2, R + 3);
        };
      z([_(y, -1, -1), _(y, 1, -1), _(y, 1, 1), _(y, -1, 1)], f);
      let A = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
      for (let T = 0; T < 4; T++) {
        let [E, R] = A[T],
          [P, C] = A[(T + 1) % 4],
          I = u
            .clone()
            .multiplyScalar(E + P)
            .addScaledVector(d, R + C)
            .normalize();
        z([_(M, E, R), _(M, P, C), _(y, P, C), _(y, E, R)], I);
      }
    }
  }
  let r = new Float32Array(e),
    l = new Uint32Array(r.buffer);
  for (let h = 0; h < l.length; h += 3) l[h] &= -8;
  let c = new Le();
  return (
    c.setAttribute("position", new Te(r, 3)),
    c.setAttribute("normal", new Re(s, 3)),
    c.setAttribute("uv", new Re(n, 2)),
    c.setIndex(i),
    c.computeBoundingSphere(),
    c
  );
}
function R0(o, t) {
  let e = new ye(eZ(t), tZ());
  return (
    (e.name = "Plates"),
    (e.castShadow = !1),
    (e.receiveShadow = !0),
    o.add(e),
    e
  );
}
