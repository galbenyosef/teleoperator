// app 341 — color
// Lines 165021-165351 of readable/app.pretty.js (statement-aligned).
async function est(o, t) {
  let e = await new va().parseAsync(
      o.buffer ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength) : o,
      "./",
    ),
    s = {},
    n = null;
  e.scene.traverse((z) => {
    z.isMesh &&
      (z.geometry.computeBoundingSphere(),
      (s[z.name] = z.geometry),
      z.name === "Body" && (n = z.material));
  });
  let i = n.map,
    a = n.metalnessMap || n.roughnessMap;
  ((i.colorSpace = Je), (i.anisotropy = 8), (a.colorSpace = Nn));
  let r = { lumRef: t.paintLum || 0.8, detail: 0.25, coat: 1, coatRough: 0.03 },
    l = new mn({
      name: "MissionSBody",
      color: tB.clone(),
      map: i,
      roughness: 0.32,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1,
    });
  ((l.userData.mbExtraMap = a),
    (l.userData.mbAlbedo = xc(Qet, r)),
    (l.userData.mbUV1 = !!s.Body?.attributes.uv1));
  let c = (z, A, T = i) => {
      let E = new Ys({
        name: z,
        color: A.clone(),
        map: T,
        fog: !1,
        toneMapped: !0,
        side: ls,
      });
      return ((E.userData.mbNoReflect = !0), (E.userData.base = A.clone()), E);
    },
    h = {
      Body: l,
      Glass: new mn({
        name: "MissionSGlass",
        color: new It(0.026, 0.026, 0.028),
        roughness: 0.05,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new It(1, 1, 1),
      }),
      Cabin: new me({
        name: "MissionSCabin",
        color: new It(0.05, 0.05, 0.052),
        roughness: 0.8,
        metalness: 0,
      }),
      Liner: new me({
        name: "MissionSLiner",
        color: new It(0.012, 0.012, 0.014),
        roughness: 0.9,
        metalness: 0,
        side: ls,
      }),
      Head: c("MissionSHead", new It(0.95, 0.97, 1), null),
      Tail: c("MissionSTail", new It(1, 1, 1)),
      LampGlass: new mn({
        name: "MissionSLampGlass",
        color: new It(0.02, 0.022, 0.025),
        roughness: 0.04,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        transparent: !0,
        opacity: 0.55,
      }),
      Tyre: new me({
        name: "MissionSTyre",
        color: new It(0.024, 0.024, 0.026),
        roughness: 0.85,
        metalness: 0,
        side: ls,
      }),
      Cover: new mn({
        name: "MissionSWheelFace",
        color: new It().setRGB(0.82, 0.82, 0.8, Je),
        roughness: 0.28,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.06,
        side: ls,
      }),
      Rim: new mn({
        name: "MissionSRim",
        color: new It(0.02, 0.02, 0.022),
        roughness: 0.3,
        metalness: 0.4,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        side: ls,
      }),
      Caliper: new mn({
        name: "MissionSCaliper",
        color: new It().setRGB(0.78, 0.04, 0.05, Je),
        roughness: 0.35,
        metalness: 0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    };
  ((h.Glass.userData.mbAlbedo = zh()),
    (h.Glass.userData.mbUV1 = !!s.Glass?.attributes.uv1));
  let f = new le();
  f.name = "MissionSModel";
  let u = new le();
  ((u.name = "MissionSBodyGroup"), f.add(u));
  let d = (z, A, T = z) => {
    let E = new ye(A, h[T]);
    E.name = "MissionS" + z;
    let R = z === "Head" || z === "Tail";
    return (
      (E.castShadow =
        !R && z !== "Glass" && z !== "Cabin" && T !== "LampGlass"),
      (E.receiveShadow = !R && z !== "Cabin"),
      E
    );
  };
  for (let z of ["Body", "Glass", "Cabin", "Liner", "Tail"])
    s[z] && u.add(d(z, s[z]));
  {
    let z = { ...$Mt, ...(t.heads || {}) },
      A = new Er(z.r, 32, 12, 0, Math.PI * 2, 0, 0.55).rotateX(Math.PI / 2),
      T = [];
    for (let [R, P] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ])
      T.push(
        new da(z.r * 0.17, 16).translate(
          R * z.r * 0.42,
          P * z.r * 0.42,
          z.r * 0.86 + 0.006,
        ),
      );
    let E = XMt(T);
    for (let R of [-1, 1]) {
      let P = new le(),
        C = new dt(z.n[0] * R, z.n[1], z.n[2]).normalize();
      (P.quaternion.setFromUnitVectors(new dt(0, 0, 1), C),
        P.position.set(z.x * R, z.y, z.z).addScaledVector(C, -z.r * 0.85),
        P.add(d("Head", E), d("LampDome", A, "LampGlass")),
        u.add(P));
    }
  }
  t.plates?.length &&
    R0(
      u,
      t.plates.map((z) => ({ ...z, cell: vo.emoji })),
    );
  let p = t.wheels.map((z, A) => {
      let T = A < 2 ? "F" : "R",
        E = new le();
      (E.position.set(...z), (E.name = "WheelSteer" + A));
      let R = new le();
      ((R.name = "WheelSpin" + A), E.add(R));
      let P = new le();
      ((P.rotation.y = z[0] < 0 ? Math.PI : 0), R.add(P));
      for (let C of ["Tyre", "Rim", "Cover"])
        s[C + T] && P.add(d(C + T, s[C + T], C));
      if (s["Caliper" + T]) {
        let C = new le();
        ((C.rotation.y = z[0] < 0 ? Math.PI : 0),
          C.add(d("Caliper" + T, s["Caliper" + T], "Caliper")),
          E.add(C));
      }
      return (f.add(E), { c: z, steer: E, spin: R });
    }),
    m = new le();
  ((m.name = "Car"), (m.rotation.order = "YXZ"), m.add(f));
  let g = { tail: [], head: [], signal: [] };
  u.traverse((z) => {
    z.name === "MissionSTail"
      ? g.tail.push(z)
      : z.name === "MissionSHead" && g.head.push(z);
  });
  let [, , b] = t.min,
    [, , v] = t.max,
    x = t.tailBar || [0.8, v - 0.05],
    y = {
      w: 1.99,
      l: v - b - 0.06,
      cz: (b + v) / 2,
      wheels: t.wheels.map((z) => [z[0], z[2]]),
      pivotY: 0.45,
      cgZ: 0.1,
      steerK: 0.85,
      tail: [
        [-0.62, x[0], x[1]],
        [0.62, x[0], x[1]],
      ],
    },
    M = 1,
    S = (z) => {
      (h.Head.color
        .copy(h.Head.userData.base)
        .multiplyScalar(1.2 + 1.8 * (z.head || 0)),
        h.Tail.color
          .copy(h.Tail.userData.base)
          .multiplyScalar((0.7 + 1.5 * (z.tail || 0)) * M));
    },
    w = Ir({
      mat: l,
      kind: "missions",
      factory: tB,
      hook: (z, A) =>
        xc({ ...Qet, ...z }, { ...r, repaint: tB.toArray(), ...A }),
      calipers: [h.Caliper],
      rims: [h.Rim],
    });
  return {
    root: m,
    model: f,
    body: u,
    wheels: p,
    lamps: g,
    dims: y,
    materials: h,
    setLamps: S,
    onNight: (z) => {
      ((M = 1 / (1 + 2.2 * z)), w.setNight(1 - 0.2 * z));
    },
    paintKit: w,
  };
}
function XMt(o) {
  let t = [],
    e = [],
    s = [],
    n = 0;
  for (let a of o) {
    let r = a.attributes.position.array,
      l = a.attributes.normal.array,
      c = a.index.array;
    for (let h = 0; h < r.length; h++) (t.push(r[h]), e.push(l[h]));
    for (let h of c) s.push(h + n);
    n += r.length / 3;
  }
  let i = new Le();
  return (
    i.setAttribute("position", new Re(t, 3)),
    i.setAttribute("normal", new Re(e, 3)),
    i.setIndex(s),
    i.computeBoundingSphere(),
    i
  );
}
var us = {
    waymo: {
      id: "waymo",
      name: "Waymo",
      model: "Jaguar I-PACE",
      maker: "Waymo Driver",
      dir: $x,
      glb: "waymo.glb",
      meta: "waymo.json",
      tex: ["waymo_albedo", "waymo_orm", "waymo_emit"],
      load: yZ,
      spec: md,
      sound: "waymo",
      cam: {
        h: 1.18,
        dist: 1.125,
        look: 1.26,
        inside: { Hood: [0, 1.36, -0.55], Bumper: [0, 0.55, -2.45] },
      },
      hl: [0.7, 0.76, -2.2],
      orbit: { R: 7.4, h: 1.9, look: 0.9 },
      stats: [
        ["310 kW", "dual motor AWD"],
        ["4.5 s", "0-100 km/h"],
        ["2.3 t", "five seats"],
      ],
      drives:
        "Planted and unflappable: all-wheel drive, a heavy battery and soft springs. Calm in the wet, slow to rotate.",
      accent: "#3fd6c6",
    },
    cybercab: {
      id: "cybercab",
      name: "Cybercab",
      model: "Tesla",
      maker: "Tesla FSD",
      dir: JO,
      glb: "cybercab.glb",
      meta: "cybercab.json",
      tex: ["cybercab_cover"],
      load: Wet,
      spec: oE,
      sound: "cybercab",
      cam: {
        h: 0.98,
        dist: 1,
        look: 1.06,
        inside: { Hood: [0, 1.12, -0.42], Bumper: [0, 0.5, -2.3] },
      },
      hl: [0.62, 0.72, -2.12],
      orbit: { R: 6.8, h: 1.55, look: 0.62 },
      stats: [
        ["250 kW", "rear motor RWD"],
        ["4.4 s", "0-100 km/h"],
        ["1.5 t", "two seats"],
      ],
      drives:
        "Light and eager: rear-drive, a short wheelbase and a quick rack. Turns in sharply, lets the tail help.",
      accent: "#e8c27a",
    },
  },
  KMt = () => !!globalThis.SF_LITE || globalThis.SF_TIER === "mobile",
  sst = () =>
    !KMt() &&
    (globalThis.SF_Q === "ultra" || /[?&]subd\b/.test(location.search));
async function YMt(o, t) {
  let e = "assets/car/" + (sst() ? "ao_subd.bin" : "ao_plain.bin"),
    [s, n] = await Promise.all([
      new ko().loadAsync("assets/car/tire.webp").catch(() => null),
      bo(e).catch(() => null),
    ]),
    i = await vE(o, t, s, Pu("car"), null, n);
  return (R0(i.body, oM("player_ferrari", vo.emoji)), i);
}
