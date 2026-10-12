// app 264 — tube
// Lines 132639-132974 of readable/app.pretty.js (statement-aligned).
function Bgt(i) {
  let t = i.lod,
    e = t ? 4 : 6;
  (i.wheel(-0.07, 0.07, 0.31, 0.74, 0.31, "mwheel"),
    i.wheel(-0.08, 0.08, 0.31, -0.7, 0.31, "mwheel"));
  for (let o of [1, -1])
    i.tube([o * 0.08, 0.31, 0.74], [o * 0.08, 0.98, 0.52], 0.028, "chrome", e);
  (i.tube([-0.33, 1.02, 0.46], [0.33, 1.02, 0.46], 0.016, "black", 4),
    i.blob(
      [0, 0.86, 0.6],
      [0.23, 0.25, 0.24],
      (o) => (o[1] < -0.12 ? "black" : "blue"),
      t ? 6 : 8,
      t ? 3 : 5,
    ),
    i.quad(
      [-0.19, 1.08, 0.72],
      [0.19, 1.08, 0.72],
      [0.14, 1.34, 0.56],
      [-0.14, 1.34, 0.56],
      "visor",
    ),
    i.quad(
      [-0.1, 0.8, 0.845],
      [0.1, 0.8, 0.845],
      [0.08, 0.93, 0.83],
      [-0.08, 0.93, 0.83],
      "head",
      !0,
    ),
    i.blob(
      [0, 0.95, 0.22],
      [0.2, 0.13, 0.26],
      (o) => "motoTank",
      t ? 6 : 8,
      t ? 3 : 4,
    ),
    i.box(-0.16, 0.16, 0.8, 0.9, -0.6, 0, "black", 0.04),
    i.blob([0, 0.9, -0.72], [0.13, 0.08, 0.28], () => "blue", 6, 3),
    i.box(-0.07, 0.07, 0.86, 0.94, -1, -0.98, {
      nz: "tail",
      px: null,
      nx: null,
      py: null,
      ny: null,
      pz: null,
    }),
    i.box(-0.2, 0.2, 0.3, 0.7, -0.25, 0.4, "chassis", 0.06),
    i.tube([0, 0.45, -0.15], [0, 0.31, -0.7], 0.035, "black", e),
    t || i.tube([0.16, 0.36, -0.1], [0.2, 0.52, -0.95], 0.05, "chrome", 6));
  let s = [0, 0.96, -0.36],
    n = [0, 1.43, -0.02];
  (i.tube(s, n, 0.17, "leather", e, 0.19),
    i.blob([0, 1.38, -0.06], [0.22, 0.09, 0.16], () => "leather", 6, 3));
  for (let o of [1, -1]) {
    let a = [o * 0.2, 1.38, -0.04],
      r = [o * 0.27, 1.17, 0.22],
      l = [o * 0.31, 1.03, 0.45];
    (i.tube(a, r, 0.055, "leather", e, 0.05),
      i.tube(r, l, 0.048, "leather", e, 0.04),
      i.box(
        l[0] - 0.04,
        l[0] + 0.04,
        l[1] - 0.03,
        l[1] + 0.04,
        l[2] - 0.04,
        l[2] + 0.05,
        "black",
      ));
    let c = [o * 0.13, 0.94, -0.34],
      h = [o * 0.21, 0.83, 0.08],
      f = [o * 0.19, 0.42, -0.12];
    (i.tube(c, h, 0.085, "jeans", e, 0.07),
      i.tube(h, f, 0.065, "jeans", e, 0.05),
      i.box(
        f[0] - 0.05,
        f[0] + 0.05,
        0.33,
        0.47,
        f[2] - 0.06,
        f[2] + 0.17,
        "black",
      ));
  }
  i.blob(
    [0, 1.57, 0.06],
    [0.14, 0.15, 0.16],
    (o) => (o[2] > 0.04 && o[1] > -0.06 && o[1] < 0.1 ? "visor" : "helmet"),
    t ? 6 : 10,
    t ? 4 : 6,
  );
}
var Ogt = { boxtruck: Lgt, stepvan: Igt, garbage: Fgt, semi: Ngt, moto: Bgt },
  Hgt = { boxtruck: 0.98, stepvan: 0.98, garbage: 1.02, semi: 1.03, moto: 0 };
function Dgt(i, t) {
  let e = new Float32Array(16);
  for (let s = 0; s < 6 && s < i.length; s++)
    ((e[s * 2] = i[s][0]), (e[s * 2 + 1] = i[s][1]));
  return (
    (e[12] = 2),
    i[6] && ((e[13] = i[6][0]), (e[14] = i[6][1])),
    (e[15] = t),
    e
  );
}
function YK(i) {
  let t = typeof document > "u" ? null : Cgt(),
    e = new Ee({
      color: 16777215,
      map: t,
      roughness: 1,
      metalness: 0,
      side: Ss,
      vertexColors: !0,
    });
  ((e.userData.mbAlbedo = i),
    (e.userData.mbTrafficFallback = !0),
    (e.userData.carLamps = !0),
    (e.name = "car_trucks"));
  let s = {};
  for (let [n, o] of Object.entries(Ogt)) {
    let a = [0, 1].map((c) => {
        let h = new xL(c);
        return (o(h), h);
      }),
      r = a.map((c) => c.geometry()),
      l = e.clone();
    ((l.map = t),
      (l.userData = { ...e.userData, mbWheels: Dgt(a[0].axles(), Hgt[n]) }),
      (l.name = "car_" + n),
      (s[n] = { geo: r[0], geo1: r[1], mat: l, livery: !0, V: ex[n] }));
  }
  return s;
}
as();
as();
var Ao = { tele: 0, mb: 1, emoji: 2, sf: 3 },
  Ugt = 0.305,
  Ggt = 0.152,
  lw = null;
function Wgt() {
  return !lw && typeof document > "u"
    ? (lw = new ei())
    : (lw ||
        (lw = Fr("assets/plates.webp", (i) => {
          ((i.colorSpace = is), (i.flipY = !1), (i.anisotropy = 8));
        })),
      lw);
}
var t_ = null;
function JK() {
  return (
    t_ ||
      ((t_ = new Ee({
        name: "Plate",
        map: Wgt(),
        roughness: 0.72,
        metalness: 0,
        envMapIntensity: 0.6,
      })),
      (t_.userData.mbNoReflect = !0)),
    t_
  );
}
var cw = null;
function wL() {
  return (
    cw ||
      ((cw = JK().clone()),
      (cw.name = "PlateInst"),
      (cw.userData = { mbNoReflect: !0 })),
    cw
  );
}
var yL = {
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
yL.police = yL.suv.map((i) => ({
  ...i,
  c: [i.c[0], i.c[1] + 0.05, i.c[2] + Math.sign(i.c[2]) * 0.12],
}));
var qgt = {
    police: Ao.sf,
    sedan: Ao.sf,
    hatch: Ao.mb,
    suv: Ao.emoji,
    pickup: Ao.tele,
    van: Ao.sf,
    taxi: Ao.tele,
    waymo: Ao.tele,
    bus: Ao.sf,
    boxtruck: Ao.mb,
    stepvan: Ao.emoji,
    garbage: Ao.sf,
    semi: Ao.tele,
  },
  hw = (i, t = qgt[i] ?? Ao.emoji) => yL[i]?.map((e) => ({ ...e, cell: t }));
function ZK(i, t = 0) {
  t += 0.004;
  let e = [],
    s = [],
    n = [],
    o = [],
    a = 4 / 512;
  for (let h of i) {
    let f = new xt(...h.n).normalize(),
      u = new xt(0, 1, 0).cross(f).normalize(),
      d = f.clone().cross(u).normalize(),
      p = new xt(...h.c).addScaledVector(f, t),
      m = (h.w || Ugt) / 2,
      g = (h.h || Ggt) / 2,
      b = (h.cell % 2) * 0.5,
      x = (h.cell >> 1) * 0.5,
      v = e.length / 3;
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
        n.push(b + (y < 0 ? a : 0.5 - a), x + (M > 0 ? a : 0.5 - a)));
    }
    if ((o.push(v, v + 1, v + 2, v, v + 2, v + 3), h.d > 0)) {
      let y = p.clone().addScaledVector(f, -0.01),
        M = p.clone().addScaledVector(f, -0.004 - h.d - t),
        S = m + 0.008,
        w = g + 0.008,
        z = (T, E, A) =>
          T.clone()
            .addScaledVector(u, E * S)
            .addScaledVector(d, A * w),
        _ = (T, E) => {
          let A = e.length / 3;
          for (let C of T)
            (e.push(C.x, C.y, C.z),
              s.push(E.x, E.y, E.z),
              n.push(0.002, 0.002));
          o.push(A, A + 1, A + 2, A, A + 2, A + 3);
        };
      _([z(y, -1, -1), z(y, 1, -1), z(y, 1, 1), z(y, -1, 1)], f);
      let R = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
      for (let T = 0; T < 4; T++) {
        let [E, A] = R[T],
          [C, P] = R[(T + 1) % 4],
          I = u
            .clone()
            .multiplyScalar(E + C)
            .addScaledVector(d, A + P)
            .normalize();
        _([z(M, E, A), z(M, C, P), z(y, C, P), z(y, E, A)], I);
      }
    }
  }
  let r = new Float32Array(e),
    l = new Uint32Array(r.buffer);
  for (let h = 0; h < l.length; h += 3) l[h] &= -8;
  let c = new De();
  return (
    c.setAttribute("position", new Te(r, 3)),
    c.setAttribute("normal", new ze(s, 3)),
    c.setAttribute("uv", new ze(n, 2)),
    c.setIndex(o),
    c.computeBoundingSphere(),
    c
  );
}
function Xc(i, t) {
  let e = new _e(ZK(t), JK());
  return (
    (e.name = "Plates"),
    (e.castShadow = !1),
    (e.receiveShadow = !0),
    i.add(e),
    e
  );
}
