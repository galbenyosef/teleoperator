// app 325 — color
// Lines 158867-159186 of readable/app.pretty.js (statement-aligned).
async function sQ(i, t) {
  let e = await new Vr().parseAsync(
      i.buffer ? i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength) : i,
      "./",
    ),
    s = new An({
      name: "CybertruckSteel",
      color: tQ.clone(),
      roughness: 0.27,
      metalness: 1,
      clearcoat: 0,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1,
    });
  s.userData.mbAlbedo = aY();
  let n = (y, M) => {
      let S = new ln({
        name: y,
        color: M.clone(),
        fog: !1,
        toneMapped: !0,
        side: Ss,
      });
      return ((S.userData.mbNoReflect = !0), (S.userData.base = M.clone()), S);
    },
    o = {
      Paint: s,
      Glass: new An({
        name: "CybertruckGlass",
        color: new $t(0.026, 0.027, 0.03),
        roughness: 0.05,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new $t(1, 1, 1),
      }),
      Black: new Ee({
        name: "CybertruckBlack",
        color: new $t(0.03, 0.03, 0.032),
        roughness: 0.7,
        metalness: 0,
      }),
      Gloss: new An({
        name: "CybertruckGloss",
        color: new $t(0.008, 0.008, 0.01),
        roughness: 0.1,
        metalness: 0,
        specularIntensity: 1,
      }),
      Tonneau: new An({
        name: "CybertruckTonneau",
        color: new $t(0.045, 0.046, 0.05),
        roughness: 0.42,
        metalness: 0.55,
        clearcoat: 0.2,
        clearcoatRoughness: 0.35,
      }),
      Head: n("CybertruckHead", new $t(0.95, 0.97, 1)),
      Tail: n("CybertruckTail", new $t(1, 0, 0.004)),
      Tyre: new Ee({
        name: "CybertruckTyre",
        color: new $t(0.03, 0.03, 0.032),
        roughness: 0.88,
        metalness: 0,
      }),
      Rim: new Ee({
        name: "CybertruckRim",
        color: new $t(0.05, 0.05, 0.055),
        roughness: 0.45,
        metalness: 0.5,
      }),
      Cover: new An({
        name: "CybertruckCover",
        color: new $t(0.035, 0.036, 0.04),
        roughness: 0.5,
        metalness: 0.1,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
      }),
    };
  ((o.Glass.userData.mbAlbedo = Mm()),
    (o.Gloss.userData.mbAlbedo = Mm({ city: 0.26 })));
  let a = new ke();
  a.name = "CybertruckModel";
  let r = new ke();
  ((r.name = "CybertruckBodyGroup"), a.add(r));
  let l = {};
  e.scene.traverse((y) => {
    y.isMesh && (y.geometry.computeBoundingSphere(), (l[y.name] = y.geometry));
  });
  let c = (y, M) => {
    let S = new _e(M, o[y]);
    S.name = "Cybertruck" + y;
    let w = y === "Head" || y === "Tail";
    return ((S.castShadow = !w), (S.receiveShadow = !w), S);
  };
  for (let y of ["Paint", "Glass", "Black", "Gloss", "Tonneau", "Head", "Tail"])
    l[y] && r.add(c(y, l[y]));
  t.plates?.length &&
    Xc(
      r,
      t.plates.map((y) => ({ ...y, cell: Ao.emoji })),
    );
  let h = t.wheels.map((y, M) => {
      let S = new ke();
      (S.position.set(...y), (S.name = "WheelSteer" + M));
      let w = new ke();
      ((w.name = "WheelSpin" + M), S.add(w));
      let z = new ke();
      ((z.rotation.y = y[0] < 0 ? Math.PI : 0), w.add(z));
      for (let _ of ["Tyre", "Rim", "Cover"]) l[_] && z.add(c(_, l[_]));
      return (a.add(S), { c: y, steer: S, spin: w });
    }),
    f = new ke();
  ((f.name = "Car"), (f.rotation.order = "YXZ"), f.add(a));
  let u = {
      tail: r.children.filter((y) => y.name === "CybertruckTail"),
      head: r.children.filter((y) => y.name === "CybertruckHead"),
      signal: [],
    },
    [, , d] = t.min,
    [, , p] = t.max,
    m = {
      w: 2,
      l: p - d - 0.06,
      cz: (d + p) / 2,
      wheels: t.wheels.map((y) => [y[0], y[2]]),
      pivotY: 0.62,
      cgZ: 0,
      steerK: 0.75,
      tail: [
        [-0.75, t.tailBar[0], t.tailBar[1]],
        [0.75, t.tailBar[0], t.tailBar[1]],
      ],
    },
    g = 1,
    b = (y) => {
      (o.Head.color
        .copy(o.Head.userData.base)
        .multiplyScalar(0.9 + 2 * (y.head || 0)),
        o.Tail.color
          .copy(o.Tail.userData.base)
          .multiplyScalar((0.1 + 0.95 * (y.tail || 0)) * g));
    },
    x = pl({
      mat: s,
      kind: "cybertruck",
      factory: tQ,
      shown: new $t(0.42, 0.43, 0.45),
      hook: (y) => ix({ solid: !0, ...y }),
      coatOn: "material",
      rims: [o.Cover],
      wrap: !0,
    });
  return {
    root: f,
    model: a,
    body: r,
    wheels: h,
    lamps: u,
    dims: m,
    materials: o,
    cybertruck: !0,
    setLamps: b,
    onNight: (y) => {
      g = 1 / (1 + 2.2 * y);
    },
    paintKit: x,
  };
}
var cs = {
    waymo: {
      id: "waymo",
      name: "Waymo",
      model: "Jaguar I-PACE",
      maker: "Waymo Driver",
      dir: lx,
      glb: "waymo.glb",
      meta: "waymo.json",
      tex: ["waymo_albedo", "waymo_orm", "waymo_emit"],
      load: bY,
      spec: Rx,
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
      dir: sF,
      glb: "cybercab.glb",
      meta: "cybercab.json",
      tex: ["cybercab_cover"],
      load: YZ,
      spec: G_,
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
  nQ = () => !!globalThis.SF_LITE || globalThis.SF_TIER === "mobile";
async function v3t(i, t) {
  let e = "assets/car/" + (nQ() ? "ao_plain.bin" : "ao_subd.bin"),
    [s, n] = await Promise.all([
      new go().loadAsync("assets/car/tire.webp").catch(() => null),
      io(e).catch(() => null),
    ]),
    o = await sz(i, t, s, Yf("car"), null, n);
  return (Xc(o.body, hw("player_ferrari", Ao.emoji)), o);
}
cs.ferrari = {
  id: "ferrari",
  name: "Ferrari",
  model: "458 Spider",
  maker: "Manual override",
  dir: "assets/car/",
  get glb() {
    return nQ() ? "scene_plain.glb" : "scene_subd.glb";
  },
  meta: "scene.json",
  tex: [],
  load: v3t,
  spec: mZ,
  sound: "ferrari",
  cam: null,
  hl: [0.62, 0.62, -2.05],
  orbit: { R: 6.4, h: 1.5, look: 0.55 },
  stats: [
    ["570 PS", "4.5 L V8 RWD"],
    ["3.3 s", "0-100 km/h"],
    ["7-speed", "dual clutch"],
  ],
  drives:
    "You drive, not the computer: a howling V8, a dual-clutch box, nitrous and brake-to-drift. Two seats - one fare.",
  accent: "#ff5a1f",
};
cs.corvette = {
  id: "corvette",
  name: "Corvette",
  model: "ZR1X",
  maker: "Manual override",
  dir: ZZ,
  glb: "corvette.glb",
  meta: "corvette.json",
  tex: [],
  load: QZ,
  spec: gZ,
  sound: "corvette",
  cam: null,
  hl: [0.6, 0.62, -1.95],
  orbit: { R: 6.6, h: 1.45, look: 0.55 },
  stats: [
    ["1250 hp", "hybrid AWD"],
    ["2.5 s", "0-100 km/h"],
    ["8-speed", "dual clutch"],
  ],
  drives:
    "Twin-turbo V8 behind you, a motor up front: all-wheel-drive launches, 330 km/h, nitrous and a dual-clutch box. Two seats - one fare.",
  accent: "#ffc61a",
};
cs.cybertruck = {
  id: "cybertruck",
  name: "Cybertruck",
  model: "Tesla",
  maker: "Tesla FSD",
  dir: eQ,
  glb: "cybertruck.glb",
  meta: "cybertruck.json",
  tex: [],
  load: sQ,
  spec: Px,
  sound: "cybertruck",
  cam: {
    h: 1.18,
    dist: 1.38,
    look: 1.3,
    inside: { Hood: [0, 1.6, -0.9], Bumper: [0, 0.62, -2.86] },
  },
  hl: [0.8, 1.02, -2.78],
  orbit: { R: 8.2, h: 2, look: 0.95 },
  stats: [
    ["630 kW", "tri-motor AWD"],
    ["2.7 s", "0-100 km/h"],
    ["3.1 t", "five seats"],
  ],
  drives:
    "Heavy, quick and unbothered: three motors, air suspension, a huge stainless body. Launches hard, rides flat, slow to rotate.",
  accent: "#c9ced6",
};
var Bm = ["waymo", "cybercab", "ferrari", "corvette", "cybertruck"],
  jw = new Set(["ferrari", "corvette"]);
