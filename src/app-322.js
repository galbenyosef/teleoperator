// app 322 — material
// Lines 158017-158304 of readable/app.pretty.js (statement-aligned).
async function sz(i, t, e, s = null, n = null, o = null) {
  let a = t.materials,
    r = new ke();
  r.name = "CarModel";
  let l = new ke();
  ((l.name = "CarBody"), r.add(l));
  let c = { tail: [], head: [], signal: [] },
    h = (x) =>
      x === "CarGlass" && !a[x]
        ? { color: [0.9, 0.93, 0.93], glass: !0 }
        : a[x],
    f = (x) => {
      let v = h(x),
        y = new $t().setRGB(...v.color),
        M = v.glass
          ? new An({
              name: x,
              color: y,
              metalness: 0,
              roughness: 0,
              transmission: 1,
              thickness: 0,
              ior: 1.5,
            })
          : new An({
              name: x,
              color: y,
              metalness: v.metallic,
              roughness: v.roughness,
              clearcoat: v.coat || 0,
              clearcoatRoughness: v.coat_roughness || 0,
            });
      return (
        v.glass ||
          ((M.userData.mbUV1 = !0),
          (M.userData.mbAlbedo = iY),
          (M.thickness = r_.trim),
          x === "CarBody"
            ? ((M.thickness = r_.paint), (M.specularIntensity = o_.si))
            : x === "CarTires" &&
              e &&
              ((e.colorSpace = On),
              (e.flipY = !1),
              (e.wrapS = ti),
              (e.anisotropy = 8),
              (M.map = e),
              (M.vertexColors = !0),
              (M.thickness = r_.tire))),
        M
      );
    },
    u = null,
    d = null;
  if (
    (s &&
      (u = await new Promise((x) => {
        try {
          let v = s instanceof Worker ? s : new Worker(s, { type: "module" }),
            y = (i.buffer || i).slice(
              i.byteOffset || 0,
              (i.byteOffset || 0) + i.byteLength,
            );
          ((v.onmessage = ({ data: S }) => {
            (v.terminate(),
              S.err && console.warn("car worker:", S.err),
              (d = S.names),
              x(S.out || null));
          }),
            (v.onerror = (S) => {
              (v.terminate(),
                console.warn(
                  "car worker failed: the main thread instead",
                  S.message,
                ),
                x(null));
            }));
          let M = o ? o.slice(0) : null;
          (v.postMessage(
            { glb: y, keep: Object.keys(a).concat("CarGlass"), ao: M },
            M ? [y, M] : [y],
          ),
            n?.());
        } catch (v) {
          (console.warn("car worker:", v), x(null));
        }
      })),
    !u)
  ) {
    let x = await new Vr().parseAsync(i, "./"),
      v = [];
    (x.scene.updateMatrixWorld(!0),
      x.scene.traverse((y) => {
        if (!y.isMesh) return;
        let M = y.name.replace(/_\d+$/, "");
        if (!/^Car/.test(M) || !h(M)) return;
        let S = new De();
        for (let [w, z] of Object.entries(y.geometry.attributes)) {
          let _ = new Float32Array(z.count * z.itemSize);
          for (let R = 0; R < z.count; R++)
            for (let T = 0; T < z.itemSize; T++)
              _[R * z.itemSize + T] = z.getComponent(R, T);
          S.setAttribute(w, new Te(_, z.itemSize));
        }
        (y.geometry.index && S.setIndex(y.geometry.index.clone()),
          S.applyMatrix4(y.matrixWorld),
          v.push({
            name: M,
            index: S.index ? Uint32Array.from(S.index.array) : null,
            attrs: Object.fromEntries(
              Object.entries(S.attributes).map(([w, z]) => [
                w,
                { array: z.array, itemSize: z.itemSize },
              ]),
            ),
          }));
      }),
      n?.(),
      (d = v.map((y) => y.name)),
      GZ(v, o),
      (u = WZ(v)));
  }
  let p = d.map((x) => ({ name: x, material: f(x) })),
    m = qZ.map((x, v) => {
      let y = new ke();
      (y.position.set(...x), (y.name = "WheelSteer" + v));
      let M = new ke();
      return (
        (M.name = "WheelSpin" + v),
        y.add(M),
        r.add(y),
        { c: x, steer: y, spin: M }
      );
    }),
    g = (x) => {
      let v = new De();
      for (let [M, S] of Object.entries(x.attrs))
        v.setAttribute(M, new Te(S, x.sizes[M]));
      let y = x.attrs.position.length / 3;
      return (
        v.setIndex(new Te(y < 65536 ? new Uint16Array(x.index) : x.index, 1)),
        v.computeBoundingSphere(),
        v
      );
    };
  p.forEach((x, v) => {
    let y = u[v].parts;
    if (y[4]) {
      let M = new _e(g(y[4]), x.material);
      ((M.name = x.name),
        l.add(M),
        x.material.emissive && (M.userData.lamp = !0));
    }
    for (let M = 0; M < 4; M++)
      if (y[M]) {
        let S = g(y[M]);
        if (x.material.vertexColors) {
          let z = S.attributes.position.array,
            _ = new Float32Array((z.length / 3) * 4);
          for (let R = 0, T = 0; R < z.length; R += 3, T += 4)
            ((_[T] = z[R] + qZ[M][0]),
              (_[T + 1] = z[R + 1]),
              (_[T + 2] = z[R + 2]),
              (_[T + 3] = 1));
          S.setAttribute("color", new Te(_, 4));
        }
        let w = new _e(S, x.material);
        ((w.name = x.name), (m3t.test(x.name) ? m[M].spin : m[M].steer).add(w));
      }
  });
  for (let x of m) {
    let v = null;
    for (let M of x.spin.children)
      M.isMesh &&
        /Metal/.test(M.name) &&
        (M.geometry.computeBoundingBox(),
        (v = v
          ? v.union(M.geometry.boundingBox)
          : M.geometry.boundingBox.clone()));
    if (!v) continue;
    let y = v.getCenter(new xt());
    y.x = 0;
    for (let M of x.spin.children) M.position.sub(y);
    x.spin.position.add(y);
  }
  for (let x of Object.keys(c))
    c[x] = l.children.filter(
      (v) =>
        v.name ===
        (x === "tail"
          ? "CarTaillight"
          : x === "head"
            ? "CarHeadlight"
            : "CarSignal"),
    );
  r.traverse((x) => {
    x.isMesh && ((x.castShadow = !0), (x.receiveShadow = !0));
  });
  let b = new ke();
  return (
    (b.name = "Car"),
    (b.rotation.order = "YXZ"),
    r.position.set(0, 0, -XZ),
    b.add(r),
    { root: b, model: r, body: l, wheels: m, lamps: c, paintKit: g3t(p, m) }
  );
}
function g3t(i, t) {
  let e = i.find((o) => o.name === "CarBody")?.material;
  if (!e) return null;
  let s = {};
  for (let o of t)
    o.steer.traverse((a) => {
      a.isMesh &&
        (a.material.name === "CarMetal" || a.material.name === "CarYellow") &&
        (a.material = s[a.material.name] ||= a.material.clone());
    });
  let n = e.color.clone().multiply(new $t(1, o_.g, o_.b));
  return pl({
    mat: e,
    kind: "ferrari",
    factory: e.color,
    shown: n,
    hook: (o) => AL(o),
    coatOn: "material",
    calipers: s.CarYellow ? [s.CarYellow] : [],
    rims: s.CarMetal ? [s.CarMetal] : [],
  });
}
var jZ = {
  tail: [new $t(1, 0.02, 0.01), 2.6],
  head: [new $t(0.85, 0.93, 1), 2.6],
  signal: [new $t(1, 0.45, 0.05), 3],
};
function Bu(i, t) {
  if (i.setLamps) {
    i.setLamps(t);
    return;
  }
  for (let e of ["tail", "head", "signal"])
    for (let s of i.lamps[e])
      (s.material.emissive.copy(jZ[e][0]),
        (s.material.emissiveIntensity = jZ[e][1] * (t[e] || 0)));
}
var VZ = new Ii(0, 0, 0, "YXZ"),
  $Z = (i, t, e) => (i < t ? t : i > e ? e : i);
function tc(i, t) {
  let e = i.root;
  (e.position.set(t.pos.x, t.pos.y, t.pos.z),
    e.rotation.set(t.pitch, t.psi, -t.roll, "YXZ"),
    i.body.position.set(0, t.heave - 0.005 + (i.rideDy || 0), 0));
  let s = t.bodyRoll + $Z(0.7 * t.bodyRoll, -0.035, 0.035),
    n = t.bodyPitch + $Z(0.25 * t.bodyPitch, -0.02, 0.02);
  i.body.rotation.set(n, 0, -s, "YXZ");
  let o = i.dims?.pivotY ?? 0.45,
    a = i.dims?.cgZ ?? XZ;
  VZ.set(n, 0, -s, "YXZ");
  let r = new wn().setFromEuler(VZ),
    l = new xt(0, o, a),
    c = l.clone().applyQuaternion(r);
  ((i.body.position.x += l.x - c.x),
    (i.body.position.y += l.y - c.y),
    (i.body.position.z += l.z - c.z));
  for (let h = 0; h < 4; h++) {
    let f = i.wheels[h];
    ((f.steer.rotation.y = h < 2 ? t.steer * (i.dims?.steerK ?? 1) : 0),
      (f.spin.rotation.x = -t.wheelSpin[h]),
      f._y0 === void 0 && (f._y0 = f.steer.position.y),
      (f.steer.position.y = f._y0 + (t.wheelDy?.[h] || 0)));
  }
}
as();
ml();
var sF = "assets/cybercab/",
  KZ = new Map();
function b3t(i, t) {
  let e = KZ.get(i);
  return (
    e ||
      KZ.set(
        i,
        (e = Fr(sF + i, (s) => {
          ((s.colorSpace = t ? is : On), (s.flipY = !1), (s.anisotropy = 8));
        })),
      ),
    e
  );
}
var Nm = new $t().setRGB(0.8, 0.735, 0.6, is);
