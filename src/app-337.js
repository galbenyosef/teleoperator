// app 337 — color
// Lines 163971-164312 of readable/app.pretty.js (statement-aligned).
async function Wet(o, t, e = UMt) {
  let s = await new va().parseAsync(
    o.buffer ? o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength) : o,
    "./",
  );
  if (s.scene.getObjectByName("Body")) return GMt(s, t, e);
  let n = new mn({
    name: "CybercabPaint",
    color: _2.clone(),
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1,
  });
  n.userData.mbAlbedo = Wx({ solid: !0 });
  let i = new mn({
    name: "CybercabCover",
    color: _2.clone(),
    map: e("cybercab_cover.webp", !0),
    roughness: 0.55,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
  });
  i.userData.mbAlbedo = Wx({ solid: !0, map: !0, baseRough: 0.56 });
  let a = (w, _) => {
      let z = new Ys({
        name: w,
        color: _.clone(),
        fog: !1,
        toneMapped: !0,
        side: ls,
      });
      return ((z.userData.mbNoReflect = !0), (z.userData.base = _.clone()), z);
    },
    r = {
      Paint: n,
      Cover: i,
      Glass: new mn({
        name: "CybercabGlass",
        color: new It(0.03, 0.029, 0.027),
        roughness: 0.06,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new It(1, 1, 1),
      }),
      Black: new me({
        name: "CybercabBlack",
        color: new It(0.022, 0.022, 0.024),
        roughness: 0.62,
        metalness: 0,
      }),
      Satin: new mn({
        name: "CybercabSatin",
        color: new It(0.018, 0.018, 0.02),
        roughness: 0.34,
        metalness: 0,
        clearcoat: 0.25,
        clearcoatRoughness: 0.3,
      }),
      Gloss: new mn({
        name: "CybercabGloss",
        color: new It(0.008, 0.008, 0.01),
        roughness: 0.1,
        metalness: 0,
        specularIntensity: 1,
      }),
      Head: a("CybercabHead", new It(0.95, 0.97, 1)),
      Tail: a("CybercabTail", new It(1, 0, 0.004)),
      Tyre: new me({
        name: "CybercabTyre",
        color: new It(0.026, 0.026, 0.028),
        roughness: 0.86,
        metalness: 0,
      }),
    };
  ((r.Glass.userData.mbAlbedo = zh()),
    (r.Gloss.userData.mbAlbedo = zh({ city: 0.26 })));
  let l = new le();
  l.name = "CybercabModel";
  let c = new le();
  ((c.name = "CybercabBodyGroup"), l.add(c));
  let h = {};
  s.scene.traverse((w) => {
    w.isMesh && (w.geometry.computeBoundingSphere(), (h[w.name] = w.geometry));
  });
  let f = (w, _) => {
    let z = new ye(_, r[w]);
    z.name = "Cybercab" + w;
    let A = w === "Head" || w === "Tail";
    return ((z.castShadow = !A), (z.receiveShadow = !A), z);
  };
  for (let w of ["Paint", "Glass", "Black", "Satin", "Gloss", "Head", "Tail"])
    h[w] && c.add(f(w, h[w]));
  t.plates?.length &&
    R0(
      c,
      t.plates.map((w) => ({ ...w, cell: vo.mb })),
    );
  let u = t.wheels.map((w, _) => {
      let z = new le();
      (z.position.set(...w), (z.name = "WheelSteer" + _));
      let A = new le();
      ((A.name = "WheelSpin" + _), z.add(A));
      let T = new le();
      ((T.rotation.y = w[0] < 0 ? Math.PI : 0), A.add(T));
      for (let E of ["Tyre", "Cover"]) h[E] && T.add(f(E, h[E]));
      return (l.add(z), { c: w, steer: z, spin: A });
    }),
    d = new le();
  ((d.name = "Car"), (d.rotation.order = "YXZ"), d.add(l));
  let p = {
      tail: c.children.filter((w) => w.name === "CybercabTail"),
      head: c.children.filter((w) => w.name === "CybercabHead"),
      signal: [],
    },
    [m, , g] = t.min,
    [b, , v] = t.max,
    x = {
      w: Math.min(1.84, b - m - 0.04),
      l: v - g - 0.06,
      cz: (g + v) / 2,
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
            [-0.6, 0.885, v - 0.02],
            [0.6, 0.885, v - 0.02],
          ],
    },
    y = 1;
  return {
    root: d,
    model: l,
    body: c,
    wheels: u,
    lamps: p,
    dims: x,
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
        n.color.copy(_2).multiplyScalar(1 - 0.15 * w),
        i.color.copy(_2).multiplyScalar(1 - 0.15 * w));
    },
  };
}
async function GMt(o, t, e) {
  let s = {},
    n = null;
  o.scene.traverse((A) => {
    A.isMesh &&
      (A.geometry.computeBoundingSphere(),
      (s[A.name] = A.geometry),
      A.name === "Body" && (n = A.material));
  });
  let i = n.map,
    a = n.metalnessMap || n.roughnessMap;
  ((i.colorSpace = Je), (i.anisotropy = 8), (a.colorSpace = Nn));
  let r = new mn({
    name: "CybercabBody",
    color: _2.clone(),
    map: i,
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1,
  });
  ((r.userData.mbExtraMap = a),
    (r.userData.mbAlbedo = xc(
      {},
      { lumRef: t.paintLum || 0.4, detail: 0.15, coat: 0.6, coatRough: 0.1 },
    )));
  let l = new mn({
    name: "CybercabCover",
    color: _2.clone(),
    map: e("cybercab_cover.webp", !0),
    roughness: 0.55,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
  });
  l.userData.mbAlbedo = Wx({ solid: !0, map: !0, baseRough: 0.56 });
  let c = (A, T) => {
      let E = new Ys({
        name: A,
        color: T.clone(),
        map: i,
        fog: !1,
        toneMapped: !0,
      });
      return ((E.userData.mbNoReflect = !0), (E.userData.base = T.clone()), E);
    },
    h = {
      Body: r,
      Cover: l,
      Glass: new mn({
        name: "CybercabGlass",
        color: new It(0.03, 0.029, 0.027),
        roughness: 0.06,
        metalness: 0,
        specularIntensity: 1,
        specularColor: new It(1, 1, 1),
      }),
      Liner: new me({
        name: "CybercabLiner",
        color: new It(0.012, 0.012, 0.014),
        roughness: 0.9,
        metalness: 0,
        side: ls,
      }),
      Head: c("CybercabHead", new It(1, 1, 1)),
      Tail: c("CybercabTail", new It(1, 1, 1)),
      Tyre: new me({
        name: "CybercabTyre",
        color: new It(0.026, 0.026, 0.028),
        roughness: 0.86,
        metalness: 0,
      }),
    };
  h.Glass.userData.mbAlbedo = zh();
  let f = new le();
  f.name = "CybercabModel";
  let u = new le();
  ((u.name = "CybercabBodyGroup"), f.add(u));
  let d = (A, T, E = A) => {
    let R = new ye(T, h[E]);
    R.name = "Cybercab" + A;
    let P = A === "Head" || A === "Tail";
    return ((R.castShadow = !P), (R.receiveShadow = !P), R);
  };
  for (let A of ["Body", "Glass", "Liner", "Head", "Tail"])
    s[A] && u.add(d(A, s[A]));
  t.plates?.length &&
    R0(
      u,
      t.plates.map((A) => ({ ...A, cell: vo.mb })),
    );
  let p = t.wheels.map((A, T) => {
      let E = T < 2 ? "F" : "R",
        R = new le();
      (R.position.set(...A), (R.name = "WheelSteer" + T));
      let P = new le();
      ((P.name = "WheelSpin" + T), R.add(P));
      let C = new le();
      ((C.rotation.y = A[0] < 0 ? Math.PI : 0), P.add(C));
      for (let I of ["Tyre", "Cover"]) s[I + E] && C.add(d(I + E, s[I + E], I));
      return (f.add(R), { c: A, steer: R, spin: P });
    }),
    m = new le();
  ((m.name = "Car"), (m.rotation.order = "YXZ"), m.add(f));
  let g = {
      tail: u.children.filter((A) => A.name === "CybercabTail"),
      head: u.children.filter((A) => A.name === "CybercabHead"),
      signal: [],
    },
    [b, , v] = t.min,
    [x, , y] = t.max,
    M = {
      w: Math.min(1.84, x - b - 0.04),
      l: y - v - 0.06,
      cz: (v + y) / 2,
      wheels: t.wheels.map((A) => [A[0], A[2]]),
      pivotY: 0.5,
      cgZ: 0,
      steerK: 0.72,
      tail: [
        [-0.6, t.tailBar?.[0] ?? 0.86, t.tailBar?.[1] ?? y - 0.03],
        [0.6, t.tailBar?.[0] ?? 0.86, t.tailBar?.[1] ?? y - 0.03],
      ],
    },
    S = 1,
    w = (A) => {
      (h.Head.color
        .copy(h.Head.userData.base)
        .multiplyScalar(1 + 1.6 * (A.head || 0)),
        h.Tail.color
          .copy(h.Tail.userData.base)
          .multiplyScalar((0.6 + 1.2 * (A.tail || 0)) * S));
    },
    _ = Ir({
      mat: r,
      kind: "cybercab",
      factory: _2,
      hook: (A, T) => xc(A, { lumRef: t.paintLum || 0.4, detail: 0.15, ...T }),
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
    onNight: (A) => {
      ((S = 1 / (1 + 2.2 * A)),
        _.setNight(1 - 0.15 * A),
        _.rimHex ||
          (_.wrapOn
            ? l.color.setRGB(0.05, 0.05, 0.055)
            : l.color.copy(_.base)
          ).multiplyScalar(1 - 0.15 * A));
    },
    paintKit: _,
  };
}
es();
P0();
var jet = "assets/corvette/",
  ZO = new It().setRGB(1, 0.8, 0.02, Je),
  qet = {
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
