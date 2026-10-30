// app 339 — color
// Lines 164533-164735 of readable/app.pretty.js (statement-aligned).
async function Yet(o, t) {
  let e = await new va().parseAsync(
      o.buffer ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength) : o,
      "./",
    ),
    s = new mn({
      name: "CybertruckSteel",
      color: Xet.clone(),
      roughness: 0.27,
      metalness: 1,
      clearcoat: 0,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1,
    });
  s.userData.mbAlbedo = cZ();
  let n = (y, M) => {
      let S = new Ys({
        name: y,
        color: M.clone(),
        fog: !1,
        toneMapped: !0,
        side: ls,
      });
      return ((S.userData.mbNoReflect = !0), (S.userData.base = M.clone()), S);
    },
    i = {
      Paint: s,
      Glass: new mn({
        name: "CybertruckGlass",
        color: new It(0.026, 0.027, 0.03),
        roughness: 0.05,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new It(1, 1, 1),
      }),
      Black: new me({
        name: "CybertruckBlack",
        color: new It(0.03, 0.03, 0.032),
        roughness: 0.7,
        metalness: 0,
      }),
      Gloss: new mn({
        name: "CybertruckGloss",
        color: new It(0.008, 0.008, 0.01),
        roughness: 0.1,
        metalness: 0,
        specularIntensity: 1,
      }),
      Tonneau: new mn({
        name: "CybertruckTonneau",
        color: new It(0.045, 0.046, 0.05),
        roughness: 0.42,
        metalness: 0.55,
        clearcoat: 0.2,
        clearcoatRoughness: 0.35,
      }),
      Head: n("CybertruckHead", new It(0.95, 0.97, 1)),
      Tail: n("CybertruckTail", new It(1, 0, 0.004)),
      Tyre: new me({
        name: "CybertruckTyre",
        color: new It(0.03, 0.03, 0.032),
        roughness: 0.88,
        metalness: 0,
      }),
      Rim: new me({
        name: "CybertruckRim",
        color: new It(0.05, 0.05, 0.055),
        roughness: 0.45,
        metalness: 0.5,
      }),
      Cover: new mn({
        name: "CybertruckCover",
        color: new It(0.035, 0.036, 0.04),
        roughness: 0.5,
        metalness: 0.1,
        clearcoat: 0.3,
        clearcoatRoughness: 0.3,
      }),
    };
  ((i.Glass.userData.mbAlbedo = zh()),
    (i.Gloss.userData.mbAlbedo = zh({ city: 0.26 })));
  let a = new le();
  a.name = "CybertruckModel";
  let r = new le();
  ((r.name = "CybertruckBodyGroup"), a.add(r));
  let l = {};
  e.scene.traverse((y) => {
    y.isMesh && (y.geometry.computeBoundingSphere(), (l[y.name] = y.geometry));
  });
  let c = (y, M) => {
    let S = new ye(M, i[y]);
    S.name = "Cybertruck" + y;
    let w = y === "Head" || y === "Tail";
    return ((S.castShadow = !w), (S.receiveShadow = !w), S);
  };
  for (let y of ["Paint", "Glass", "Black", "Gloss", "Tonneau", "Head", "Tail"])
    l[y] && r.add(c(y, l[y]));
  t.plates?.length &&
    R0(
      r,
      t.plates.map((y) => ({ ...y, cell: vo.emoji })),
    );
  let h = t.wheels.map((y, M) => {
      let S = new le();
      (S.position.set(...y), (S.name = "WheelSteer" + M));
      let w = new le();
      ((w.name = "WheelSpin" + M), S.add(w));
      let _ = new le();
      ((_.rotation.y = y[0] < 0 ? Math.PI : 0), w.add(_));
      for (let z of ["Tyre", "Rim", "Cover"]) l[z] && _.add(c(z, l[z]));
      return (a.add(S), { c: y, steer: S, spin: w });
    }),
    f = new le();
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
      (i.Head.color
        .copy(i.Head.userData.base)
        .multiplyScalar(0.9 + 2 * (y.head || 0)),
        i.Tail.color
          .copy(i.Tail.userData.base)
          .multiplyScalar((0.1 + 0.95 * (y.tail || 0)) * g));
    },
    v = Ir({
      mat: s,
      kind: "cybertruck",
      factory: Xet,
      shown: new It(0.42, 0.43, 0.45),
      hook: (y) => Wx({ solid: !0, ...y }),
      coatOn: "material",
      rims: [i.Cover],
      wrap: !0,
    });
  return {
    root: f,
    model: a,
    body: r,
    wheels: h,
    lamps: u,
    dims: m,
    materials: i,
    cybertruck: !0,
    setLamps: b,
    onNight: (y) => {
      g = 1 / (1 + 2.2 * y);
    },
    paintKit: v,
  };
}
es();
P0();
var Jet = "assets/roadster/",
  QO = new It().setRGB(0.86, 0.865, 0.875, Je),
  VMt = { y: 0.34, z: 2, x: [-0.285, -0.095, 0.095, 0.285], r: 0.045 },
  WMt = { y: 0.08, z: [-0.55, 0.5], r: 0.32 };
function qMt(o) {
  let t = [
      [o * 0.62, -0.1],
      [o * 0.7, -0.07],
      [o * 0.86, -0.03],
      [o * 0.98, -0.006],
      [o * 1.06, 0],
      [o * 1.12, -0.008],
      [o * 1.12, -0.03],
    ],
    e = new Mu(
      t.map(([s, n]) => new Pe(s, n)),
      40,
    );
  return (e.rotateX(Math.PI / 2), e);
}
function jMt(o) {
  let t = new v0(o * 0.93, o * 1.06, 64).rotateX(Math.PI / 2),
    e = new vs(o * 1.06, o * 1.06, 0.018, 64, 1, !0).translate(0, 0.009, 0),
    s = new da(o * 0.93, 64).rotateX(Math.PI / 2).translate(0, 0.012, 0),
    n = [];
  for (let a = 0; a < 14; a++) {
    let r = new Is(0.012, 0.01, o * 0.72).translate(0, 0.004, o * 0.53);
    (r.rotateY((a * Math.PI * 2) / 14 + 0.25), n.push(r));
  }
  let i = new vs(o * 0.2, o * 0.24, 0.016, 32).translate(0, 0.002, 0);
  return { shroud: t, lip: e, disc: s, ribs: n, hub: i };
}
