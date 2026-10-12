// app 324 — color
// Lines 158647-158866 of readable/app.pretty.js (statement-aligned).
async function QZ(i, t) {
  let e = await new Vr().parseAsync(
      i.buffer ? i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength) : i,
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
  let o = n.map,
    a = n.metalnessMap || n.roughnessMap;
  ((o.colorSpace = is), (o.anisotropy = 8), (a.colorSpace = On));
  let r = new An({
    name: "CorvetteBody",
    color: nF.clone(),
    map: o,
    roughness: 0.34,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.035,
    envMapIntensity: 1,
  });
  ((r.userData.mbExtraMap = a),
    (r.userData.mbAlbedo = ox(JZ, {
      lumRef: t.paintLum || 0.55,
      detail: 0.15,
    })));
  let l = (w, z) => {
      let _ = new ln({
        name: w,
        color: z.clone(),
        map: o,
        fog: !1,
        toneMapped: !0,
      });
      return ((_.userData.mbNoReflect = !0), (_.userData.base = z.clone()), _);
    },
    c = {
      Body: r,
      Glass: new An({
        name: "CorvetteGlass",
        color: new $t(0.36, 0.37, 0.38),
        roughness: 0.03,
        metalness: 0,
        transmission: 1,
        thickness: 0,
        ior: 1.5,
      }),
      Interior: new Ee({
        name: "CorvetteInterior",
        color: new $t(0.13, 0.125, 0.12),
        roughness: 0.7,
        metalness: 0,
      }),
      Cabin: new Ee({
        name: "CorvetteCabin",
        color: new $t(0.05, 0.05, 0.052),
        roughness: 0.8,
        metalness: 0,
      }),
      Liner: new Ee({
        name: "CorvetteLiner",
        color: new $t(0.012, 0.012, 0.014),
        roughness: 0.9,
        metalness: 0,
        side: Ss,
      }),
      Head: l("CorvetteHead", new $t(1, 1, 1)),
      Tail: l("CorvetteTail", new $t(1, 1, 1)),
      Tyre: new Ee({
        name: "CorvetteTyre",
        color: new $t(0.024, 0.024, 0.026),
        roughness: 0.84,
        metalness: 0,
      }),
      Rim: new An({
        name: "CorvetteRim",
        color: new $t(0.022, 0.022, 0.024),
        roughness: 0.34,
        metalness: 0.3,
        clearcoat: 0.5,
        clearcoatRoughness: 0.15,
        side: Ss,
      }),
      Disc: new Ee({
        name: "CorvetteDisc",
        color: new $t(0.16, 0.16, 0.165),
        roughness: 0.55,
        metalness: 0.3,
        side: Ss,
      }),
      Caliper: new An({
        name: "CorvetteCaliper",
        color: new $t().setRGB(0.95, 0.72, 0.02, is),
        roughness: 0.35,
        metalness: 0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    },
    h = new ke();
  h.name = "CorvetteModel";
  let f = new ke();
  ((f.name = "CorvetteBodyGroup"), h.add(f));
  let u = (w, z, _ = w) => {
    let R = new _e(z, c[_]);
    R.name = "Corvette" + w;
    let T = w === "Head" || w === "Tail";
    return (
      (R.castShadow = !T && w !== "Glass" && w !== "Cabin" && w !== "Interior"),
      (R.receiveShadow = !T),
      R
    );
  };
  for (let w of ["Body", "Glass", "Cabin", "Interior", "Liner", "Head", "Tail"])
    s[w] && f.add(u(w, s[w]));
  t.plates?.length &&
    Xc(
      f,
      t.plates.map((w) => ({ ...w, cell: Ao.emoji })),
    );
  let d = t.wheels.map((w, z) => {
      let _ = z < 2 ? "F" : "R",
        R = new ke();
      (R.position.set(...w), (R.name = "WheelSteer" + z));
      let T = new ke();
      ((T.name = "WheelSpin" + z), R.add(T));
      let E = new ke();
      ((E.rotation.y = w[0] < 0 ? Math.PI : 0), T.add(E));
      for (let [A, C] of [
        ["Tyre", "Tyre"],
        ["Rim", "Rim"],
        ["Disc", "Disc"],
      ])
        s[A + _] && E.add(u(A + _, s[A + _], C));
      if (s["Caliper" + _]) {
        let A = new ke();
        ((A.rotation.y = w[0] < 0 ? Math.PI : 0),
          A.add(u("Caliper" + _, s["Caliper" + _], "Caliper")),
          R.add(A));
      }
      return (h.add(R), { c: w, steer: R, spin: T });
    }),
    p = new ke();
  ((p.name = "Car"), (p.rotation.order = "YXZ"), p.add(h));
  let m = {
      tail: f.children.filter((w) => w.name === "CorvetteTail"),
      head: f.children.filter((w) => w.name === "CorvetteHead"),
      signal: [],
    },
    [, , g] = t.min,
    [, , b] = t.max,
    x = {
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
    v = 1,
    y = (w) => {
      (c.Head.color
        .copy(c.Head.userData.base)
        .multiplyScalar(1 + 1.6 * (w.head || 0)),
        c.Tail.color
          .copy(c.Tail.userData.base)
          .multiplyScalar((0.7 + 1.5 * (w.tail || 0)) * v));
    },
    M = pl({
      mat: r,
      kind: "corvette",
      factory: nF,
      hook: (w, z) =>
        ox(
          { ...JZ, ...w },
          {
            lumRef: t.paintLum || 0.55,
            detail: 0.15,
            repaint: nF.toArray(),
            ...z,
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
    dims: x,
    materials: c,
    corvette: !0,
    setLamps: y,
    onNight: (w) => {
      ((v = 1 / (1 + 2.2 * w)), M.setNight(1 - 0.18 * w));
    },
    paintKit: M,
  };
}
as();
ml();
var eQ = "assets/cybertruck/",
  tQ = new $t(0.6, 0.605, 0.62);
