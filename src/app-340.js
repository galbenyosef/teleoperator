// app 340 — add
// Lines 164736-165020 of readable/app.pretty.js (statement-aligned).
async function Zet(o, t) {
  let e = await new va().parseAsync(
      o.buffer ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength) : o,
      "./",
    ),
    s = {},
    n = null;
  e.scene.traverse((L) => {
    L.isMesh &&
      (L.geometry.computeBoundingSphere(),
      (s[L.name] = L.geometry),
      L.name === "Body" && (n = L.material));
  });
  let i = n.map,
    a = n.metalnessMap || n.roughnessMap;
  ((i.colorSpace = Je), (i.anisotropy = 8), (a.colorSpace = Nn));
  let r = {
      lumRef: t.paintLum || 0.85,
      detail: 0.25,
      coat: 1,
      coatRough: 0.03,
    },
    l = new mn({
      name: "RoadsterBody",
      color: QO.clone(),
      map: i,
      roughness: 0.36,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1,
    });
  ((l.userData.mbExtraMap = a), (l.userData.mbAlbedo = xc(rM, r)));
  let c = !!s.Body?.attributes.uv1;
  l.userData.mbUV1 = c;
  let h = (L, F, O = i) => {
      let B = new Ys({
        name: L,
        color: F.clone(),
        map: O,
        fog: !1,
        toneMapped: !0,
        side: ls,
      });
      return ((B.userData.mbNoReflect = !0), (B.userData.base = F.clone()), B);
    },
    f = {
      Body: l,
      Glass: new mn({
        name: "RoadsterGlass",
        color: new It(0.026, 0.026, 0.028),
        roughness: 0.05,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new It(1, 1, 1),
      }),
      Cabin: new me({
        name: "RoadsterCabin",
        color: new It(0.04, 0.04, 0.042),
        roughness: 0.8,
        metalness: 0,
      }),
      Liner: new me({
        name: "RoadsterLiner",
        color: new It(0.012, 0.012, 0.014),
        roughness: 0.9,
        metalness: 0,
        side: ls,
      }),
      Head: h("RoadsterHead", new It(0.95, 0.97, 1), null),
      Tail: h("RoadsterTail", new It(1, 1, 1)),
      Tyre: new me({
        name: "RoadsterTyre",
        color: new It(0.024, 0.024, 0.026),
        roughness: 0.85,
        metalness: 0,
        side: ls,
      }),
      Rim: new mn({
        name: "RoadsterRim",
        color: new It(0.035, 0.036, 0.04),
        roughness: 0.22,
        metalness: 0.6,
        clearcoat: 0.6,
        clearcoatRoughness: 0.08,
        side: ls,
      }),
      Cover: new me({
        name: "RoadsterCover",
        color: new It(0.16, 0.165, 0.175),
        roughness: 0.34,
        metalness: 0.9,
        side: ls,
      }),
      Nozzle: new me({
        name: "RoadsterNozzle",
        color: new It(0.09, 0.09, 0.095),
        roughness: 0.32,
        metalness: 0.9,
        side: ls,
      }),
      RoadsterThrustGlow: new me({
        name: "RoadsterThrustGlow",
        color: new It(0.02, 0.02, 0.025),
        emissive: new It(0.62, 0.8, 1),
        emissiveIntensity: 0.2,
        roughness: 0.6,
        metalness: 0,
      }),
      Fan: new me({
        name: "RoadsterFan",
        color: new It(0.03, 0.03, 0.033),
        roughness: 0.55,
        metalness: 0.5,
        side: ls,
      }),
      FanRib: new me({
        name: "RoadsterFanRib",
        color: new It(0.09, 0.09, 0.1),
        roughness: 0.4,
        metalness: 0.8,
      }),
    };
  ((f.Glass.userData.mbAlbedo = zh()),
    (f.Glass.userData.mbUV1 = !!s.Glass?.attributes.uv1),
    (f.RoadsterThrustGlow.userData.mbNoReflect = !0));
  let u = new le();
  u.name = "RoadsterModel";
  let d = new le();
  ((d.name = "RoadsterBodyGroup"), u.add(d));
  let p = (L, F, O = L) => {
    let B = new ye(F, f[O]);
    B.name = "Roadster" + L;
    let H = L === "Head" || L === "Tail" || O === "RoadsterThrustGlow";
    return (
      (B.castShadow = !H && L !== "Glass" && L !== "Cabin"),
      (B.receiveShadow = !H && L !== "Cabin"),
      B
    );
  };
  for (let L of ["Body", "Glass", "Cabin", "Liner", "Tail"])
    s[L] && d.add(p(L, s[L]));
  if (t.headBar?.length > 1) {
    let L = t.headBar,
      F = [],
      O = [];
    L.forEach(([H, N, D], U) => {
      let G = Math.min(
        1,
        (L.length - 1 - Math.abs(2 * U - (L.length - 1))) / 3 + 0.35,
      );
      if (
        (F.push(H, N - 0.007 * G, D - 0.004, H, N + 0.007 * G, D - 0.004), U)
      ) {
        let W = (U - 1) * 2;
        O.push(W, W + 2, W + 1, W + 1, W + 2, W + 3);
      }
    });
    let B = new Le();
    (B.setAttribute("position", new Re(F, 3)),
      B.setIndex(O),
      B.computeVertexNormals(),
      B.computeBoundingSphere(),
      d.add(p("Head", B)));
  } else s.Head && d.add(p("Head", s.Head));
  t.plates?.length &&
    R0(
      d,
      t.plates.map((L) => ({ ...L, cell: vo.emoji })),
    );
  let m = { ...VMt, ...(t.thrusters || {}) },
    g = qMt(m.r),
    b = new da(m.r * 0.64, 32).translate(0, 0, -0.07),
    v = m.x.map((L, F) => {
      let O = new mi();
      return (
        (O.name = "RoadsterThruster" + F),
        O.position.set(L, m.y, m.z),
        O.add(
          p("Nozzle" + F, g, "Nozzle"),
          p("ThrustGlow" + F, b, "RoadsterThrustGlow"),
        ),
        d.add(O),
        O
      );
    }),
    x = { ...WMt, ...(t.fans || {}) },
    y = jMt(x.r),
    M = x.z.map((L, F) => {
      let O = new mi();
      ((O.name = "RoadsterFan" + F), O.position.set(0, x.y, L));
      let B = new le();
      ((B.name = "RoadsterFanRotor" + F),
        B.add(
          p("FanDisc" + F, y.disc, "Fan"),
          p("FanHub" + F, y.hub, "FanRib"),
        ));
      for (let H of y.ribs) B.add(p("FanRib" + F, H, "FanRib"));
      return (
        O.add(
          p("FanShroud" + F, y.shroud, "Fan"),
          p("FanLip" + F, y.lip, "Fan"),
          B,
        ),
        (O.userData.rotor = B),
        d.add(O),
        O
      );
    }),
    S = t.wheels.map((L, F) => {
      let O = F < 2 ? "F" : "R",
        B = new le();
      (B.position.set(...L), (B.name = "WheelSteer" + F));
      let H = new le();
      ((H.name = "WheelSpin" + F), B.add(H));
      let N = new le();
      ((N.rotation.y = L[0] < 0 ? Math.PI : 0), H.add(N));
      for (let D of ["Tyre", "Rim", "Cover"])
        s[D + O] && N.add(p(D + O, s[D + O], D));
      return (u.add(B), { c: L, steer: B, spin: H });
    }),
    w = new le();
  ((w.name = "Car"), (w.rotation.order = "YXZ"), w.add(u));
  let _ = {
      tail: d.children.filter((L) => L.name === "RoadsterTail"),
      head: d.children.filter((L) => L.name === "RoadsterHead"),
      signal: [],
    },
    [, , z] = t.min,
    [, , A] = t.max,
    T = t.tailBar || [0.775, A - 0.03],
    E = {
      w: 1.97,
      l: A - z - 0.06,
      cz: (z + A) / 2,
      wheels: t.wheels.map((L) => [L[0], L[2]]),
      pivotY: 0.44,
      cgZ: 0.02,
      steerK: 0.85,
      tail: [
        [-0.6, T[0], T[1]],
        [0.6, T[0], T[1]],
      ],
    },
    R = 1,
    P = (L) => {
      (f.Head.color
        .copy(f.Head.userData.base)
        .multiplyScalar(1 + 1.8 * (L.head || 0)),
        f.Tail.color
          .copy(f.Tail.userData.base)
          .multiplyScalar((0.7 + 1.5 * (L.tail || 0)) * R));
    },
    C = Ir({
      mat: l,
      kind: "roadster",
      factory: QO,
      hook: (L, F) =>
        xc({ ...rM, ...L }, { ...r, repaint: QO.toArray(), ...F }),
      rims: [f.Rim],
    });
  return {
    root: w,
    model: u,
    body: d,
    wheels: S,
    lamps: _,
    dims: E,
    materials: f,
    roadster: !0,
    setLamps: P,
    onNight: (L) => {
      ((R = 1 / (1 + 2.2 * L)), C.setNight(1 - 0.2 * L));
    },
    paintKit: C,
    thrusters: v,
    fans: M,
  };
}
es();
P0();
var tst = "assets/missions/",
  tB = new It().setRGB(0.86, 0.862, 0.856, Je),
  Qet = { ...rM, pearl: 0.15, flakeMetal: 0.2, baseRough: 0.32 },
  $Mt = { x: 0.74, y: 0.6, z: -1.9, r: 0.105, n: [0.42, 0.22, -0.88] };
