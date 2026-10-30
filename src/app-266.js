// app 266 — add
// Lines 133841-134188 of readable/app.pretty.js (statement-aligned).
function C3t(o, t, e, s) {
  let n = (S) => {
      let w = new Ys({
        name: S,
        map: s,
        color: new It(0, 0, 0),
        transparent: !0,
        depthWrite: !1,
        blending: $o,
        fog: !1,
        toneMapped: !0,
      });
      return ((w.userData.mbNoReflect = !0), w);
    },
    i = {
      Body: e,
      Head: n("WaymoHead"),
      Tail: n("WaymoTail"),
      Blue: new me({
        name: "WaymoBlue",
        color: new It(0.05, 0.3, 1),
        emissive: new It(0.1, 0.45, 1),
        emissiveIntensity: 1.6,
        roughness: 0.3,
      }),
      Tyre: new me({
        name: "WaymoTyre",
        color: new It(0.028, 0.028, 0.03),
        roughness: 0.88,
        metalness: 0,
      }),
      Rim: new mn({
        name: "WaymoRim",
        color: new It(0.035, 0.036, 0.04),
        roughness: 0.34,
        metalness: 0.55,
        clearcoat: 0.7,
        clearcoatRoughness: 0.08,
      }),
      Disc: new me({
        name: "WaymoDisc",
        color: new It(0.42, 0.42, 0.44),
        roughness: 0.42,
        metalness: 1,
      }),
      Caliper: new me({
        name: "WaymoCaliper",
        color: new It(0.05, 0.05, 0.055),
        roughness: 0.5,
        metalness: 0.2,
      }),
    },
    a = new le();
  a.name = "WaymoModel";
  let r = new le();
  ((r.name = "WaymoBodyGroup"), a.add(r));
  let l = {};
  o.scene.traverse((S) => {
    S.isMesh && (S.geometry.computeBoundingSphere(), (l[S.name] = S.geometry));
  });
  let c = (S, w) => {
    let _ = new ye(w, i[S]);
    _.name = "Waymo" + S;
    let z = S === "Head" || S === "Tail";
    return (
      (_.castShadow = !z),
      (_.receiveShadow = !z),
      z && (_.renderOrder = 2),
      _
    );
  };
  for (let S of ["Body", "Head", "Tail", "Blue"]) l[S] && r.add(c(S, l[S]));
  let h = null;
  {
    let S = r.children.find((w) => w.name === "WaymoBody");
    if (S)
      try {
        h = xZ(S, {
          z0: 0.05,
          z1: 0.95,
          y0: 0.36,
          y1: 1.42,
          xIn: 0.8,
          hinge: { z: 0.05, x: 0.95, lean: 0.21 },
          cabin: [-0.86, 0.45, -0.95, 0.86, 1.42, 1, 0.74],
        });
      } catch (w) {
        console.warn("waymo doors", w);
      }
  }
  R0(r, oM("player_waymo", vo.tele));
  let f = t.wheels.map((S, w) => {
      let _ = new le();
      (_.position.set(...S), (_.name = "WheelSteer" + w));
      let z = new le();
      ((z.name = "WheelSpin" + w), _.add(z));
      let A = new le();
      ((A.rotation.y = S[0] < 0 ? Math.PI : 0), z.add(A));
      for (let T of ["Tyre", "Rim", "Disc"]) l[T] && A.add(c(T, l[T]));
      if (l.Caliper) {
        let T = c("Caliper", l.Caliper);
        ((T.rotation.y = S[0] < 0 ? Math.PI : 0),
          (T.rotation.x = S[2] < 0 ? -0.5 : 0.5),
          _.add(T));
      }
      return (a.add(_), { c: S, steer: _, spin: z });
    }),
    u = new le();
  ((u.name = "Car"), (u.rotation.order = "YXZ"), u.add(a));
  let d = {
      tail: r.children.filter((S) => S.name === "WaymoTail"),
      head: r.children.filter((S) => S.name === "WaymoHead"),
      signal: [],
    },
    [p, , m] = t.min,
    [g, , b] = t.max,
    v = {
      w: 1.9,
      l: b - m - 0.08,
      cz: (m + b) / 2,
      wheels: t.wheels.map((S) => [S[0], S[2]]),
      pivotY: 0.55,
      cgZ: 0,
      steerK: 0.8,
      tail: [
        [-0.66, 1.08, 2.18],
        [0.66, 1.08, 2.18],
      ],
    },
    x = (S) => {
      (i.Tail.color.setScalar(2.4 * (S.tail || 0)),
        i.Head.color.setScalar(0.5 + 1.8 * (S.head || 0)));
    },
    y = Ir({
      mat: e,
      kind: "waymo",
      factory: new It(1, 1, 1),
      shown: new It(0.86, 0.87, 0.88),
      hook: (S) => wZ(S),
      coatOn: "material",
      rims: [i.Rim],
    });
  return {
    root: u,
    model: a,
    body: r,
    wheels: f,
    lamps: d,
    dims: v,
    materials: i,
    waymo: !0,
    setLamps: x,
    paintKit: y,
    onNight: (S) => y.setNight(1 - 0.15 * S),
    doors: h,
  };
}
var zZ =
    "let rim = vec3f(0.58, 0.59, 0.6) * (0.55 + 0.45 * clamp(lum / 0.45, 0.0, 1.0));",
  _Z = "gHC = vec2f(pm * 0.85, 0.045);",
  EZ = "rough = pm * mix(0.45, 0.36, flake) +",
  L3t = Dx.replace(zZ, "let rim = vec3f(0.022, 0.023, 0.025);")
    .replace(_Z, "gHC = vec2f(pm * 0.3, 0.05);")
    .replace(EZ, "rough = pm * 0.24 +");
for (let o of [zZ, _Z, EZ])
  Dx.includes(o) ||
    console.warn("police paint: the hook changed, not found:", o);
var Io = {
    sedan: { L: 4.85, W: 2.211, H: 1.565, bw: 1.86 },
    hatch: { L: 4.299, W: 2.019, H: 1.507, bw: 1.76 },
    suv: { L: 4.796, W: 2.217, H: 1.807, bw: 1.9 },
    pickup: { L: 5.299, W: 2.409, H: 1.838, bw: 2.05 },
    van: { L: 5.092, W: 2.398, H: 2.453, bw: 2.05 },
    taxi: { L: 4.597, W: 2.109, H: 1.617, bw: 1.82 },
    bus: { L: 11.997, W: 3.868, H: 5.64, bw: 2.6 },
    cablecar: { L: 8.397, W: 2.889, H: 4.093, bw: 2.5 },
    ...Ux,
  },
  I3t = Object.keys(Io).filter((o) => !Ux[o]);
Io.waymo = { L: 4.57, W: 2.2, H: 2.14, bw: 1.9 };
var mM = 0.12;
Io.police = { L: 4.796 + 2 * mM, W: 2.217, H: 1.95, bw: 1.9 };
var F3t = { sedan: 1, hatch: 1, suv: 1, pickup: 1, van: 1, taxi: 1 },
  ro = {
    sedan: [
      [0.357, 1.477, 0.359, 0.672, 0.972],
      [0.361, 1.479, 0.361, 0.666, 0.966],
      [0.363, -1.343, 0.353, 0.672, 0.972],
      [0.362, -1.341, 0.353, 0.666, 0.966],
    ],
    hatch: [
      [0.359, 1.233, 0.365, 0.576, 0.876],
      [0.362, 1.234, 0.362, 0.572, 0.872],
      [0.356, -1.366, 0.353, 0.576, 0.876],
      [0.356, -1.37, 0.353, 0.573, 0.873],
    ],
    suv: [
      [0.393, 1.388, 0.406, 0.677, 0.977],
      [0.4, 1.384, 0.406, 0.669, 0.969],
      [0.397, -1.369, 0.403, 0.678, 0.978],
      [0.394, -1.369, 0.397, 0.672, 0.972],
    ],
    pickup: [
      [0.41, 1.726, 0.407, 0.692, 0.992],
      [0.41, 1.726, 0.407, 0.694, 0.994],
      [0.404, -1.61, 0.401, 0.685, 0.985],
      [0.402, -1.61, 0.401, 0.688, 0.988],
    ],
    van: [
      [0.369, 1.571, 0.374, 0.68, 0.98],
      [0.369, 1.569, 0.374, 0.678, 0.978],
      [0.362, -1.608, 0.353, 0.682, 0.982],
      [0.366, -1.61, 0.353, 0.679, 0.979],
    ],
    taxi: [
      [0.352, 1.312, 0.358, 0.629, 0.929],
      [0.349, 1.312, 0.356, 0.626, 0.926],
      [0.338, -1.293, 0.329, 0.627, 0.927],
      [0.34, -1.291, 0.33, 0.624, 0.924],
    ],
    bus: [
      [0.6, 3.203, 0.588, 0.865, 1.165],
      [0.603, 3.199, 0.595, 0.867, 1.167],
      [0.622, -3.183, 0.624, 0.872, 1.172],
      [0.619, -3.187, 0.627, 0.872, 1.172],
    ],
    waymo: [
      [0.352, 1.495, 0.352, 0.69, 0.95],
      [0.352, 1.495, 0.352, 0.69, 0.95],
      [0.352, -1.495, 0.352, 0.69, 0.95],
      [0.352, -1.495, 0.352, 0.69, 0.95],
    ],
  };
ro.police = ro.suv.map((o) => [
  o[0],
  o[1] + Math.sign(o[1]) * mM,
  ...o.slice(2),
]);
var TZ = {
  cablecar: 0.35,
  boxtruck: 0.45,
  stepvan: 0.42,
  garbage: 0.52,
  semi: 0.52,
  moto: 0.31,
};
for (let [o, t] of Object.entries(ro)) {
  let e = t.filter(Boolean);
  e.length && (TZ[o] = e.reduce((s, n) => s + n[0], 0) / e.length);
}
var f_ = (o) => TZ[o] || 0.36,
  O3t = (o, t, e, s, n = 0) =>
    o.some((i, a) => {
      if (!i) return !1;
      let r = t * (a % 2 ? -1 : 1);
      return (
        r > i[3] - 0.05 - n &&
        r < i[4] + 0.03 + n &&
        Math.hypot(e - i[0], s - i[1]) < i[2] + 0.02 + n
      );
    }),
  xF = (o, t, e) => {
    let s = new Uint32Array(o.array.buffer, o.array.byteOffset, o.array.length);
    s[t * 3] = (s[t * 3] & -8) | e;
  };
function B3t(o, t) {
  let e = o.attributes.position,
    s = e.count,
    n = (i, a, r) => {
      let l = e.getX(i) * r;
      return (
        l > a[3] - 0.05 &&
        l < a[4] + 0.03 &&
        Math.hypot(e.getY(i) - a[0], e.getZ(i) - a[1]) < a[2] + 0.02
      );
    };
  for (let i = 0; i + 2 < s; i += 3) {
    let a = 0;
    for (let r = 0; r < 4 && !a; r++) {
      let l = r % 2 ? -1 : 1;
      n(i, t[r], l) && n(i + 1, t[r], l) && n(i + 2, t[r], l) && (a = r + 1);
    }
    for (let r = 0; r < 3; r++) xF(e, i + r, a);
  }
  return o;
}
var uF = (o) => {
    let t = o.map((e) => e || [0, 0, 0, 0, 0]);
    return Float32Array.from([
      t[0][0],
      t[0][1],
      t[1][0],
      t[1][1],
      t[2][0],
      t[2][1],
      t[3][0],
      t[3][1],
      (t[0][3] + t[0][4]) / 2,
      -(t[1][3] + t[1][4]) / 2,
      (t[2][3] + t[2][4]) / 2,
      -(t[3][3] + t[3][4]) / 2,
      1,
      0,
      0,
      0,
    ]);
  },
  d2 = {};
function RZ(o) {
  for (let [t, e] of Object.entries(o.attributes))
    if (e.isInterleavedBufferAttribute) {
      let s = e.count,
        n = e.itemSize,
        i = new Float32Array(s * n),
        a = [e.getX, e.getY, e.getZ, e.getW];
      for (let r = 0; r < s; r++)
        for (let l = 0; l < n; l++) i[r * n + l] = a[l].call(e, r);
      o.setAttribute(t, new Te(i, n, e.normalized));
    }
  return o;
}
function mF(o, t) {
  let e = o.attributes.position.array,
    s = new Uint32Array(e.buffer, e.byteOffset, e.length),
    n = [0, 0, 0, 0],
    i = 0;
  for (let a = 0; a < e.length; a += 3) {
    let r = s[a] & 7;
    if (!r) continue;
    let l = t?.[r - 1];
    if (r > 4 || !l) {
      i++;
      continue;
    }
    n[r - 1]++;
    let c = e[a] * ((r - 1) % 2 ? -1 : 1);
    (c < l[3] - 0.06 ||
      c > l[4] + 0.05 ||
      Math.hypot(e[a + 1] - l[0], e[a + 2] - l[1]) > l[2] + 0.03) &&
      i++;
  }
  return { per: n, bad: i };
}
var uM = (o) => {
  let t = o.attributes.position.array,
    e = new Uint32Array(t.buffer, t.byteOffset, t.length);
  for (let s = 0; s < t.length; s += 3) e[s] &= -8;
};
