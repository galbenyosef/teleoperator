// app 338 — color
// Lines 164313-164532 of readable/app.pretty.js (statement-aligned).
async function $et(o, t) {
  let e = await new va().parseAsync(
      o.buffer ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength) : o,
      "./",
    ),
    s = {},
    n = null;
  e.scene.traverse((w) => {
    w.isMesh &&
      (w.geometry.computeBoundingSphere(),
      (s[w.name] = w.geometry),
      w.name === "Body" && (n = w.material));
  });
  let i = n.map,
    a = n.metalnessMap || n.roughnessMap;
  ((i.colorSpace = Je), (i.anisotropy = 8), (a.colorSpace = Nn));
  let r = new mn({
    name: "CorvetteBody",
    color: ZO.clone(),
    map: i,
    roughness: 0.34,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.035,
    envMapIntensity: 1,
  });
  ((r.userData.mbExtraMap = a),
    (r.userData.mbAlbedo = xc(qet, {
      lumRef: t.paintLum || 0.55,
      detail: 0.15,
    })));
  let l = (w, _) => {
      let z = new Ys({
        name: w,
        color: _.clone(),
        map: i,
        fog: !1,
        toneMapped: !0,
      });
      return ((z.userData.mbNoReflect = !0), (z.userData.base = _.clone()), z);
    },
    c = {
      Body: r,
      Glass: new mn({
        name: "CorvetteGlass",
        color: new It(0.36, 0.37, 0.38),
        roughness: 0.03,
        metalness: 0,
        transmission: 1,
        thickness: 0,
        ior: 1.5,
      }),
      Interior: new me({
        name: "CorvetteInterior",
        color: new It(0.13, 0.125, 0.12),
        roughness: 0.7,
        metalness: 0,
      }),
      Cabin: new me({
        name: "CorvetteCabin",
        color: new It(0.05, 0.05, 0.052),
        roughness: 0.8,
        metalness: 0,
      }),
      Liner: new me({
        name: "CorvetteLiner",
        color: new It(0.012, 0.012, 0.014),
        roughness: 0.9,
        metalness: 0,
        side: ls,
      }),
      Head: l("CorvetteHead", new It(1, 1, 1)),
      Tail: l("CorvetteTail", new It(1, 1, 1)),
      Tyre: new me({
        name: "CorvetteTyre",
        color: new It(0.024, 0.024, 0.026),
        roughness: 0.84,
        metalness: 0,
      }),
      Rim: new mn({
        name: "CorvetteRim",
        color: new It(0.022, 0.022, 0.024),
        roughness: 0.34,
        metalness: 0.3,
        clearcoat: 0.5,
        clearcoatRoughness: 0.15,
        side: ls,
      }),
      Disc: new me({
        name: "CorvetteDisc",
        color: new It(0.16, 0.16, 0.165),
        roughness: 0.55,
        metalness: 0.3,
        side: ls,
      }),
      Caliper: new mn({
        name: "CorvetteCaliper",
        color: new It().setRGB(0.95, 0.72, 0.02, Je),
        roughness: 0.35,
        metalness: 0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    },
    h = new le();
  h.name = "CorvetteModel";
  let f = new le();
  ((f.name = "CorvetteBodyGroup"), h.add(f));
  let u = (w, _, z = w) => {
    let A = new ye(_, c[z]);
    A.name = "Corvette" + w;
    let T = w === "Head" || w === "Tail";
    return (
      (A.castShadow = !T && w !== "Glass" && w !== "Cabin" && w !== "Interior"),
      (A.receiveShadow = !T),
      A
    );
  };
  for (let w of ["Body", "Glass", "Cabin", "Interior", "Liner", "Head", "Tail"])
    s[w] && f.add(u(w, s[w]));
  t.plates?.length &&
    R0(
      f,
      t.plates.map((w) => ({ ...w, cell: vo.emoji })),
    );
  let d = t.wheels.map((w, _) => {
      let z = _ < 2 ? "F" : "R",
        A = new le();
      (A.position.set(...w), (A.name = "WheelSteer" + _));
      let T = new le();
      ((T.name = "WheelSpin" + _), A.add(T));
      let E = new le();
      ((E.rotation.y = w[0] < 0 ? Math.PI : 0), T.add(E));
      for (let [R, P] of [
        ["Tyre", "Tyre"],
        ["Rim", "Rim"],
        ["Disc", "Disc"],
      ])
        s[R + z] && E.add(u(R + z, s[R + z], P));
      if (s["Caliper" + z]) {
        let R = new le();
        ((R.rotation.y = w[0] < 0 ? Math.PI : 0),
          R.add(u("Caliper" + z, s["Caliper" + z], "Caliper")),
          A.add(R));
      }
      return (h.add(A), { c: w, steer: A, spin: T });
    }),
    p = new le();
  ((p.name = "Car"), (p.rotation.order = "YXZ"), p.add(h));
  let m = {
      tail: f.children.filter((w) => w.name === "CorvetteTail"),
      head: f.children.filter((w) => w.name === "CorvetteHead"),
      signal: [],
    },
    [, , g] = t.min,
    [, , b] = t.max,
    v = {
      w: 1.93,
      l: b - g - 0.06,
      cz: (g + b) / 2,
      wheels: t.wheels.map((w) => [w[0], w[2]]),
      pivotY: 0.46,
      cgZ: 0.05,
      steerK: 0.85,
      tail: [
        [-0.6, 0.83, 2.1],
        [0.6, 0.83, 2.1],
      ],
      pipes: [
        [-0.134, 0.29, 2.2],
        [0, 0.29, 2.2],
        [0.134, 0.29, 2.2],
      ],
    },
    x = 1,
    y = (w) => {
      (c.Head.color
        .copy(c.Head.userData.base)
        .multiplyScalar(1 + 1.6 * (w.head || 0)),
        c.Tail.color
          .copy(c.Tail.userData.base)
          .multiplyScalar((0.7 + 1.5 * (w.tail || 0)) * x));
    },
    M = Ir({
      mat: r,
      kind: "corvette",
      factory: ZO,
      hook: (w, _) =>
        xc(
          { ...qet, ...w },
          {
            lumRef: t.paintLum || 0.55,
            detail: 0.15,
            repaint: ZO.toArray(),
            ..._,
          },
        ),
      calipers: [c.Caliper],
      rims: [c.Rim],
    });
  return {
    root: p,
    model: h,
    body: f,
    wheels: d,
    lamps: m,
    dims: v,
    materials: c,
    corvette: !0,
    setLamps: y,
    onNight: (w) => {
      ((x = 1 / (1 + 2.2 * w)), M.setNight(1 - 0.18 * w));
    },
    paintKit: M,
  };
}
es();
P0();
var Ket = "assets/cybertruck/",
  Xet = new It(0.6, 0.605, 0.62);
