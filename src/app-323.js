// app 323 — color
// Lines 158305-158646 of readable/app.pretty.js (statement-aligned).
async function YZ(i, t, e = b3t) {
  let s = await new Vr().parseAsync(
    i.buffer ? i.buffer.slice(i.byteOffset, i.byteOffset + i.byteLength) : i,
    "./",
  );
  if (s.scene.getObjectByName("Body")) return x3t(s, t, e);
  let n = new An({
    name: "CybercabPaint",
    color: Nm.clone(),
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1,
  });
  n.userData.mbAlbedo = ix({ solid: !0 });
  let o = new An({
    name: "CybercabCover",
    color: Nm.clone(),
    map: e("cybercab_cover.webp", !0),
    roughness: 0.55,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
  });
  o.userData.mbAlbedo = ix({ solid: !0, map: !0, baseRough: 0.56 });
  let a = (w, z) => {
      let _ = new ln({
        name: w,
        color: z.clone(),
        fog: !1,
        toneMapped: !0,
        side: Ss,
      });
      return ((_.userData.mbNoReflect = !0), (_.userData.base = z.clone()), _);
    },
    r = {
      Paint: n,
      Cover: o,
      Glass: new An({
        name: "CybercabGlass",
        color: new $t(0.03, 0.029, 0.027),
        roughness: 0.06,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new $t(1, 1, 1),
      }),
      Black: new Ee({
        name: "CybercabBlack",
        color: new $t(0.022, 0.022, 0.024),
        roughness: 0.62,
        metalness: 0,
      }),
      Satin: new An({
        name: "CybercabSatin",
        color: new $t(0.018, 0.018, 0.02),
        roughness: 0.34,
        metalness: 0,
        clearcoat: 0.25,
        clearcoatRoughness: 0.3,
      }),
      Gloss: new An({
        name: "CybercabGloss",
        color: new $t(0.008, 0.008, 0.01),
        roughness: 0.1,
        metalness: 0,
        specularIntensity: 1,
      }),
      Head: a("CybercabHead", new $t(0.95, 0.97, 1)),
      Tail: a("CybercabTail", new $t(1, 0, 0.004)),
      Tyre: new Ee({
        name: "CybercabTyre",
        color: new $t(0.026, 0.026, 0.028),
        roughness: 0.86,
        metalness: 0,
      }),
    };
  ((r.Glass.userData.mbAlbedo = Mm()),
    (r.Gloss.userData.mbAlbedo = Mm({ city: 0.26 })));
  let l = new ke();
  l.name = "CybercabModel";
  let c = new ke();
  ((c.name = "CybercabBodyGroup"), l.add(c));
  let h = {};
  s.scene.traverse((w) => {
    w.isMesh && (w.geometry.computeBoundingSphere(), (h[w.name] = w.geometry));
  });
  let f = (w, z) => {
    let _ = new _e(z, r[w]);
    _.name = "Cybercab" + w;
    let R = w === "Head" || w === "Tail";
    return ((_.castShadow = !R), (_.receiveShadow = !R), _);
  };
  for (let w of ["Paint", "Glass", "Black", "Satin", "Gloss", "Head", "Tail"])
    h[w] && c.add(f(w, h[w]));
  t.plates?.length &&
    Xc(
      c,
      t.plates.map((w) => ({ ...w, cell: Ao.mb })),
    );
  let u = t.wheels.map((w, z) => {
      let _ = new ke();
      (_.position.set(...w), (_.name = "WheelSteer" + z));
      let R = new ke();
      ((R.name = "WheelSpin" + z), _.add(R));
      let T = new ke();
      ((T.rotation.y = w[0] < 0 ? Math.PI : 0), R.add(T));
      for (let E of ["Tyre", "Cover"]) h[E] && T.add(f(E, h[E]));
      return (l.add(_), { c: w, steer: _, spin: R });
    }),
    d = new ke();
  ((d.name = "Car"), (d.rotation.order = "YXZ"), d.add(l));
  let p = {
      tail: c.children.filter((w) => w.name === "CybercabTail"),
      head: c.children.filter((w) => w.name === "CybercabHead"),
      signal: [],
    },
    [m, , g] = t.min,
    [b, , x] = t.max,
    v = {
      w: Math.min(1.84, b - m - 0.04),
      l: x - g - 0.06,
      cz: (g + x) / 2,
      wheels: t.wheels.map((w) => [w[0], w[2]]),
      pivotY: 0.5,
      cgZ: 0,
      steerK: 0.72,
      tail: t.tailBar
        ? [
            [-0.6, t.tailBar[0], t.tailBar[1]],
            [0.6, t.tailBar[0], t.tailBar[1]],
          ]
        : [
            [-0.6, 0.885, x - 0.02],
            [0.6, 0.885, x - 0.02],
          ],
    },
    y = 1;
  return {
    root: d,
    model: l,
    body: c,
    wheels: u,
    lamps: p,
    dims: v,
    materials: r,
    cybercab: !0,
    setLamps: (w) => {
      (r.Head.color
        .copy(r.Head.userData.base)
        .multiplyScalar(0.9 + 2 * (w.head || 0)),
        r.Tail.color
          .copy(r.Tail.userData.base)
          .multiplyScalar((0.3 + 0.8 * (w.tail || 0)) * y));
    },
    onNight: (w) => {
      ((y = 1 / (1 + 2.2 * w)),
        n.color.copy(Nm).multiplyScalar(1 - 0.15 * w),
        o.color.copy(Nm).multiplyScalar(1 - 0.15 * w));
    },
  };
}
async function x3t(i, t, e) {
  let s = {},
    n = null;
  i.scene.traverse((R) => {
    R.isMesh &&
      (R.geometry.computeBoundingSphere(),
      (s[R.name] = R.geometry),
      R.name === "Body" && (n = R.material));
  });
  let o = n.map,
    a = n.metalnessMap || n.roughnessMap;
  ((o.colorSpace = is), (o.anisotropy = 8), (a.colorSpace = On));
  let r = new An({
    name: "CybercabBody",
    color: Nm.clone(),
    map: o,
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1,
  });
  ((r.userData.mbExtraMap = a),
    (r.userData.mbAlbedo = ox(
      {},
      { lumRef: t.paintLum || 0.4, detail: 0.15, coat: 0.6, coatRough: 0.1 },
    )));
  let l = new An({
    name: "CybercabCover",
    color: Nm.clone(),
    map: e("cybercab_cover.webp", !0),
    roughness: 0.55,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
  });
  l.userData.mbAlbedo = ix({ solid: !0, map: !0, baseRough: 0.56 });
  let c = (R, T) => {
      let E = new ln({
        name: R,
        color: T.clone(),
        map: o,
        fog: !1,
        toneMapped: !0,
      });
      return ((E.userData.mbNoReflect = !0), (E.userData.base = T.clone()), E);
    },
    h = {
      Body: r,
      Cover: l,
      Glass: new An({
        name: "CybercabGlass",
        color: new $t(0.03, 0.029, 0.027),
        roughness: 0.06,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new $t(1, 1, 1),
      }),
      Liner: new Ee({
        name: "CybercabLiner",
        color: new $t(0.012, 0.012, 0.014),
        roughness: 0.9,
        metalness: 0,
        side: Ss,
      }),
      Head: c("CybercabHead", new $t(1, 1, 1)),
      Tail: c("CybercabTail", new $t(1, 1, 1)),
      Tyre: new Ee({
        name: "CybercabTyre",
        color: new $t(0.026, 0.026, 0.028),
        roughness: 0.86,
        metalness: 0,
      }),
    };
  h.Glass.userData.mbAlbedo = Mm();
  let f = new ke();
  f.name = "CybercabModel";
  let u = new ke();
  ((u.name = "CybercabBodyGroup"), f.add(u));
  let d = (R, T, E = R) => {
    let A = new _e(T, h[E]);
    A.name = "Cybercab" + R;
    let C = R === "Head" || R === "Tail";
    return ((A.castShadow = !C), (A.receiveShadow = !C), A);
  };
  for (let R of ["Body", "Glass", "Liner", "Head", "Tail"])
    s[R] && u.add(d(R, s[R]));
  t.plates?.length &&
    Xc(
      u,
      t.plates.map((R) => ({ ...R, cell: Ao.mb })),
    );
  let p = t.wheels.map((R, T) => {
      let E = T < 2 ? "F" : "R",
        A = new ke();
      (A.position.set(...R), (A.name = "WheelSteer" + T));
      let C = new ke();
      ((C.name = "WheelSpin" + T), A.add(C));
      let P = new ke();
      ((P.rotation.y = R[0] < 0 ? Math.PI : 0), C.add(P));
      for (let I of ["Tyre", "Cover"]) s[I + E] && P.add(d(I + E, s[I + E], I));
      return (f.add(A), { c: R, steer: A, spin: C });
    }),
    m = new ke();
  ((m.name = "Car"), (m.rotation.order = "YXZ"), m.add(f));
  let g = {
      tail: u.children.filter((R) => R.name === "CybercabTail"),
      head: u.children.filter((R) => R.name === "CybercabHead"),
      signal: [],
    },
    [b, , x] = t.min,
    [v, , y] = t.max,
    M = {
      w: Math.min(1.84, v - b - 0.04),
      l: y - x - 0.06,
      cz: (x + y) / 2,
      wheels: t.wheels.map((R) => [R[0], R[2]]),
      pivotY: 0.5,
      cgZ: 0,
      steerK: 0.72,
      tail: [
        [-0.6, t.tailBar?.[0] ?? 0.86, t.tailBar?.[1] ?? y - 0.03],
        [0.6, t.tailBar?.[0] ?? 0.86, t.tailBar?.[1] ?? y - 0.03],
      ],
    },
    S = 1,
    w = (R) => {
      (h.Head.color
        .copy(h.Head.userData.base)
        .multiplyScalar(1 + 1.6 * (R.head || 0)),
        h.Tail.color
          .copy(h.Tail.userData.base)
          .multiplyScalar((0.6 + 1.2 * (R.tail || 0)) * S));
    },
    z = pl({
      mat: r,
      kind: "cybercab",
      factory: Nm,
      hook: (R, T) => ox(R, { lumRef: t.paintLum || 0.4, detail: 0.15, ...T }),
      rims: [l],
      rimFollows: !0,
    });
  return {
    root: m,
    model: f,
    body: u,
    wheels: p,
    lamps: g,
    dims: M,
    materials: h,
    cybercab: !0,
    setLamps: w,
    onNight: (R) => {
      ((S = 1 / (1 + 2.2 * R)),
        z.setNight(1 - 0.15 * R),
        z.rimHex ||
          (z.wrapOn
            ? l.color.setRGB(0.05, 0.05, 0.055)
            : l.color.copy(z.base)
          ).multiplyScalar(1 - 0.15 * R));
    },
    paintKit: z,
  };
}
as();
ml();
var ZZ = "assets/corvette/",
  nF = new $t().setRGB(1, 0.8, 0.02, is),
  JZ = {
    solid: !0,
    g: 1,
    b: 1,
    depth: 0.45,
    flakeScale: 1500,
    flakeTilt: 0.2,
    flakeMetal: 0.42,
    flakeRough: 0.3,
    baseRough: 0.34,
    baseMetal: 0.18,
  };
