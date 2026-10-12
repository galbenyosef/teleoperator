// app 267 — add
// Lines 133569-133917 of readable/app.pretty.js (statement-aligned).
function lbt(i, t, e, s) {
  let n = (S) => {
      let w = new ln({
        name: S,
        map: s,
        color: new $t(0, 0, 0),
        transparent: !0,
        depthWrite: !1,
        blending: da,
        fog: !1,
        toneMapped: !0,
      });
      return ((w.userData.mbNoReflect = !0), w);
    },
    o = {
      Body: e,
      Head: n("WaymoHead"),
      Tail: n("WaymoTail"),
      Blue: new Ee({
        name: "WaymoBlue",
        color: new $t(0.05, 0.3, 1),
        emissive: new $t(0.1, 0.45, 1),
        emissiveIntensity: 1.6,
        roughness: 0.3,
      }),
      Tyre: new Ee({
        name: "WaymoTyre",
        color: new $t(0.028, 0.028, 0.03),
        roughness: 0.88,
        metalness: 0,
      }),
      Rim: new An({
        name: "WaymoRim",
        color: new $t(0.035, 0.036, 0.04),
        roughness: 0.34,
        metalness: 0.55,
        clearcoat: 0.7,
        clearcoatRoughness: 0.08,
      }),
      Disc: new Ee({
        name: "WaymoDisc",
        color: new $t(0.42, 0.42, 0.44),
        roughness: 0.42,
        metalness: 1,
      }),
      Caliper: new Ee({
        name: "WaymoCaliper",
        color: new $t(0.05, 0.05, 0.055),
        roughness: 0.5,
        metalness: 0.2,
      }),
    },
    a = new ke();
  a.name = "WaymoModel";
  let r = new ke();
  ((r.name = "WaymoBodyGroup"), a.add(r));
  let l = {};
  i.scene.traverse((S) => {
    S.isMesh && (S.geometry.computeBoundingSphere(), (l[S.name] = S.geometry));
  });
  let c = (S, w) => {
    let z = new _e(w, o[S]);
    z.name = "Waymo" + S;
    let _ = S === "Head" || S === "Tail";
    return (
      (z.castShadow = !_),
      (z.receiveShadow = !_),
      _ && (z.renderOrder = 2),
      z
    );
  };
  for (let S of ["Body", "Head", "Tail", "Blue"]) l[S] && r.add(c(S, l[S]));
  let h = null;
  {
    let S = r.children.find((w) => w.name === "WaymoBody");
    if (S)
      try {
        h = mY(S, {
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
  Xc(r, hw("player_waymo", Ao.tele));
  let f = t.wheels.map((S, w) => {
      let z = new ke();
      (z.position.set(...S), (z.name = "WheelSteer" + w));
      let _ = new ke();
      ((_.name = "WheelSpin" + w), z.add(_));
      let R = new ke();
      ((R.rotation.y = S[0] < 0 ? Math.PI : 0), _.add(R));
      for (let T of ["Tyre", "Rim", "Disc"]) l[T] && R.add(c(T, l[T]));
      if (l.Caliper) {
        let T = c("Caliper", l.Caliper);
        ((T.rotation.y = S[0] < 0 ? Math.PI : 0),
          (T.rotation.x = S[2] < 0 ? -0.5 : 0.5),
          z.add(T));
      }
      return (a.add(z), { c: S, steer: z, spin: _ });
    }),
    u = new ke();
  ((u.name = "Car"), (u.rotation.order = "YXZ"), u.add(a));
  let d = {
      tail: r.children.filter((S) => S.name === "WaymoTail"),
      head: r.children.filter((S) => S.name === "WaymoHead"),
      signal: [],
    },
    [p, , m] = t.min,
    [g, , b] = t.max,
    x = {
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
    v = (S) => {
      (o.Tail.color.setScalar(2.4 * (S.tail || 0)),
        o.Head.color.setScalar(0.5 + 1.8 * (S.head || 0)));
    },
    y = pl({
      mat: e,
      kind: "waymo",
      factory: new $t(1, 1, 1),
      shown: new $t(0.86, 0.87, 0.88),
      hook: (S) => xY(S),
      coatOn: "material",
      rims: [o.Rim],
    });
  return {
    root: u,
    model: a,
    body: r,
    wheels: f,
    lamps: d,
    dims: x,
    materials: o,
    waymo: !0,
    setLamps: v,
    paintKit: y,
    onNight: (S) => y.setNight(1 - 0.15 * S),
    doors: h,
  };
}
var MY =
    "let rim = vec3f(0.58, 0.59, 0.6) * (0.55 + 0.45 * clamp(lum / 0.45, 0.0, 1.0));",
  SY = "gHC = vec2f(pm * 0.85, 0.045);",
  kY = "rough = pm * mix(0.45, 0.36, flake) +",
  cbt = tx
    .replace(MY, "let rim = vec3f(0.022, 0.023, 0.025);")
    .replace(SY, "gHC = vec2f(pm * 0.3, 0.05);")
    .replace(kY, "rough = pm * 0.24 +");
for (let i of [MY, SY, kY])
  tx.includes(i) ||
    console.warn("police paint: the hook changed, not found:", i);
var Ko = {
    sedan: { L: 4.85, W: 2.211, H: 1.565, bw: 1.86 },
    hatch: { L: 4.299, W: 2.019, H: 1.507, bw: 1.76 },
    suv: { L: 4.796, W: 2.217, H: 1.807, bw: 1.9 },
    pickup: { L: 5.299, W: 2.409, H: 1.838, bw: 2.05 },
    van: { L: 5.092, W: 2.398, H: 2.453, bw: 2.05 },
    taxi: { L: 4.597, W: 2.109, H: 1.617, bw: 1.82 },
    bus: { L: 11.997, W: 3.868, H: 5.64, bw: 2.6 },
    cablecar: { L: 8.397, W: 2.889, H: 4.093, bw: 2.5 },
    ...ex,
  },
  hbt = Object.keys(Ko).filter((i) => !ex[i]);
Ko.waymo = { L: 4.57, W: 2.2, H: 2.14, bw: 1.9 };
var vw = 0.12;
Ko.police = { L: 4.796 + 2 * vw, W: 2.217, H: 1.95, bw: 1.9 };
var fbt = { sedan: 1, hatch: 1, suv: 1, pickup: 1, van: 1, taxi: 1 },
  ho = {
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
ho.police = ho.suv.map((i) => [
  i[0],
  i[1] + Math.sign(i[1]) * vw,
  ...i.slice(2),
]);
var _Y = {
  cablecar: 0.35,
  boxtruck: 0.45,
  stepvan: 0.42,
  garbage: 0.52,
  semi: 0.52,
  moto: 0.31,
};
for (let [i, t] of Object.entries(ho)) {
  let e = t.filter(Boolean);
  e.length && (_Y[i] = e.reduce((s, n) => s + n[0], 0) / e.length);
}
var f_ = (i) => _Y[i] || 0.36,
  ubt = (i, t, e, s, n = 0) =>
    i.some((o, a) => {
      if (!o) return !1;
      let r = t * (a % 2 ? -1 : 1);
      return (
        r > o[3] - 0.05 - n &&
        r < o[4] + 0.03 + n &&
        Math.hypot(e - o[0], s - o[1]) < o[2] + 0.02 + n
      );
    }),
  GL = (i, t, e) => {
    let s = new Uint32Array(i.array.buffer, i.array.byteOffset, i.array.length);
    s[t * 3] = (s[t * 3] & -8) | e;
  };
function dbt(i, t) {
  let e = i.attributes.position,
    s = e.count,
    n = (o, a, r) => {
      let l = e.getX(o) * r;
      return (
        l > a[3] - 0.05 &&
        l < a[4] + 0.03 &&
        Math.hypot(e.getY(o) - a[0], e.getZ(o) - a[1]) < a[2] + 0.02
      );
    };
  for (let o = 0; o + 2 < s; o += 3) {
    let a = 0;
    for (let r = 0; r < 4 && !a; r++) {
      let l = r % 2 ? -1 : 1;
      n(o, t[r], l) && n(o + 1, t[r], l) && n(o + 2, t[r], l) && (a = r + 1);
    }
    for (let r = 0; r < 3; r++) GL(e, o + r, a);
  }
  return i;
}
var NL = (i) => {
    let t = i.map((e) => e || [0, 0, 0, 0, 0]);
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
  _m = {};
function zY(i) {
  for (let [t, e] of Object.entries(i.attributes))
    if (e.isInterleavedBufferAttribute) {
      let s = e.count,
        n = e.itemSize,
        o = new Float32Array(s * n),
        a = [e.getX, e.getY, e.getZ, e.getW];
      for (let r = 0; r < s; r++)
        for (let l = 0; l < n; l++) o[r * n + l] = a[l].call(e, r);
      i.setAttribute(t, new Te(o, n, e.normalized));
    }
  return i;
}
function HL(i, t) {
  let e = i.attributes.position.array,
    s = new Uint32Array(e.buffer, e.byteOffset, e.length),
    n = [0, 0, 0, 0],
    o = 0;
  for (let a = 0; a < e.length; a += 3) {
    let r = s[a] & 7;
    if (!r) continue;
    let l = t?.[r - 1];
    if (r > 4 || !l) {
      o++;
      continue;
    }
    n[r - 1]++;
    let c = e[a] * ((r - 1) % 2 ? -1 : 1);
    (c < l[3] - 0.06 ||
      c > l[4] + 0.05 ||
      Math.hypot(e[a + 1] - l[0], e[a + 2] - l[1]) > l[2] + 0.03) &&
      o++;
  }
  return { per: n, bad: o };
}
var gw = (i) => {
  let t = i.attributes.position.array,
    e = new Uint32Array(t.buffer, t.byteOffset, t.length);
  for (let s = 0; s < t.length; s += 3) e[s] &= -8;
};
