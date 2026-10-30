// app 336 — position
// Lines 163666-163970 of readable/app.pretty.js (statement-aligned).
async function vE(o, t, e, s = null, n = null, i = null) {
  let a = t.materials,
    r = new le();
  r.name = "CarModel";
  let l = new le();
  ((l.name = "CarBody"), r.add(l));
  let c = { tail: [], head: [], signal: [] },
    h = (v) =>
      v === "CarGlass" && !a[v]
        ? { color: [0.9, 0.93, 0.93], glass: !0 }
        : a[v],
    f = (v) => {
      let x = h(v),
        y = new It().setRGB(...x.color),
        M = x.glass
          ? new mn({
              name: v,
              color: y,
              metalness: 0,
              roughness: 0,
              transmission: 1,
              thickness: 0,
              ior: 1.5,
            })
          : new mn({
              name: v,
              color: y,
              metalness: x.metallic,
              roughness: x.roughness,
              clearcoat: x.coat || 0,
              clearcoatRoughness: x.coat_roughness || 0,
            });
      return (
        x.glass ||
          ((M.userData.mbUV1 = !0),
          (M.userData.mbAlbedo = rZ),
          (M.thickness = r_.trim),
          v === "CarBody"
            ? ((M.thickness = r_.paint), (M.specularIntensity = o_.si))
            : v === "CarTires" &&
              e &&
              ((e.colorSpace = Nn),
              (e.flipY = !1),
              (e.wrapS = oi),
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
      (u = await new Promise((v) => {
        try {
          let x = s instanceof Worker ? s : new Worker(s, { type: "module" }),
            y = (o.buffer || o).slice(
              o.byteOffset || 0,
              (o.byteOffset || 0) + o.byteLength,
            );
          ((x.onmessage = ({ data: S }) => {
            (x.terminate(),
              S.err && console.warn("car worker:", S.err),
              (d = S.names),
              v(S.out || null));
          }),
            (x.onerror = (S) => {
              (x.terminate(),
                console.warn(
                  "car worker failed: the main thread instead",
                  S.message,
                ),
                v(null));
            }));
          let M = i ? i.slice(0) : null;
          (x.postMessage(
            { glb: y, keep: Object.keys(a).concat("CarGlass"), ao: M },
            M ? [y, M] : [y],
          ),
            n?.());
        } catch (x) {
          (console.warn("car worker:", x), v(null));
        }
      })),
    !u)
  ) {
    let v = await new va().parseAsync(o, "./"),
      x = [];
    (v.scene.updateMatrixWorld(!0),
      v.scene.traverse((y) => {
        if (!y.isMesh) return;
        let M = y.name.replace(/_\d+$/, "");
        if (!/^Car/.test(M) || !h(M)) return;
        let S = new Le();
        for (let [w, _] of Object.entries(y.geometry.attributes)) {
          let z = new Float32Array(_.count * _.itemSize);
          for (let A = 0; A < _.count; A++)
            for (let T = 0; T < _.itemSize; T++)
              z[A * _.itemSize + T] = _.getComponent(A, T);
          S.setAttribute(w, new Te(z, _.itemSize));
        }
        (y.geometry.index && S.setIndex(y.geometry.index.clone()),
          S.applyMatrix4(y.matrixWorld),
          x.push({
            name: M,
            index: S.index ? Uint32Array.from(S.index.array) : null,
            attrs: Object.fromEntries(
              Object.entries(S.attributes).map(([w, _]) => [
                w,
                { array: _.array, itemSize: _.itemSize },
              ]),
            ),
          }));
      }),
      n?.(),
      (d = x.map((y) => y.name)),
      Fet(x, i),
      (u = Oet(x)));
  }
  let p = d.map((v) => ({ name: v, material: f(v) })),
    m = Bet.map((v, x) => {
      let y = new le();
      (y.position.set(...v), (y.name = "WheelSteer" + x));
      let M = new le();
      return (
        (M.name = "WheelSpin" + x),
        y.add(M),
        r.add(y),
        { c: v, steer: y, spin: M }
      );
    }),
    g = (v) => {
      let x = new Le();
      for (let [M, S] of Object.entries(v.attrs))
        x.setAttribute(M, new Te(S, v.sizes[M]));
      let y = v.attrs.position.length / 3;
      return (
        x.setIndex(new Te(y < 65536 ? new Uint16Array(v.index) : v.index, 1)),
        x.computeBoundingSphere(),
        x
      );
    };
  p.forEach((v, x) => {
    let y = u[x].parts;
    if (y[4]) {
      let M = new ye(g(y[4]), v.material);
      ((M.name = v.name),
        l.add(M),
        v.material.emissive && (M.userData.lamp = !0));
    }
    for (let M = 0; M < 4; M++)
      if (y[M]) {
        let S = g(y[M]);
        if (v.material.vertexColors) {
          let _ = S.attributes.position.array,
            z = new Float32Array((_.length / 3) * 4);
          for (let A = 0, T = 0; A < _.length; A += 3, T += 4)
            ((z[T] = _[A] + Bet[M][0]),
              (z[T + 1] = _[A + 1]),
              (z[T + 2] = _[A + 2]),
              (z[T + 3] = 1));
          S.setAttribute("color", new Te(z, 4));
        }
        let w = new ye(S, v.material);
        ((w.name = v.name), (NMt.test(v.name) ? m[M].spin : m[M].steer).add(w));
      }
  });
  for (let v of m) {
    let x = null;
    for (let M of v.spin.children)
      M.isMesh &&
        /Metal/.test(M.name) &&
        (M.geometry.computeBoundingBox(),
        (x = x
          ? x.union(M.geometry.boundingBox)
          : M.geometry.boundingBox.clone()));
    if (!x) continue;
    let y = x.getCenter(new dt());
    y.x = 0;
    for (let M of v.spin.children) M.position.sub(y);
    v.spin.position.add(y);
  }
  for (let v of Object.keys(c))
    c[v] = l.children.filter(
      (x) =>
        x.name ===
        (v === "tail"
          ? "CarTaillight"
          : v === "head"
            ? "CarHeadlight"
            : "CarSignal"),
    );
  r.traverse((v) => {
    v.isMesh && ((v.castShadow = !0), (v.receiveShadow = !0));
  });
  let b = new le();
  return (
    (b.name = "Car"),
    (b.rotation.order = "YXZ"),
    r.position.set(0, 0, -Get),
    b.add(r),
    { root: b, model: r, body: l, wheels: m, lamps: c, paintKit: HMt(p, m) }
  );
}
function HMt(o, t) {
  let e = o.find((i) => i.name === "CarBody")?.material;
  if (!e) return null;
  let s = {};
  for (let i of t)
    i.steer.traverse((a) => {
      a.isMesh &&
        (a.material.name === "CarMetal" || a.material.name === "CarYellow") &&
        (a.material = s[a.material.name] ||= a.material.clone());
    });
  let n = e.color.clone().multiply(new It(1, o_.g, o_.b));
  return Ir({
    mat: e,
    kind: "ferrari",
    factory: e.color,
    shown: n,
    hook: (i) => oF(i),
    coatOn: "material",
    calipers: s.CarYellow ? [s.CarYellow] : [],
    rims: s.CarMetal ? [s.CarMetal] : [],
  });
}
var Net = {
  tail: [new It(1, 0.02, 0.01), 2.6],
  head: [new It(0.85, 0.93, 1), 2.6],
  signal: [new It(1, 0.45, 0.05), 3],
};
function xd(o, t) {
  if (o.setLamps) {
    o.setLamps(t);
    return;
  }
  for (let e of ["tail", "head", "signal"])
    for (let s of o.lamps[e])
      (s.material.emissive.copy(Net[e][0]),
        (s.material.emissiveIntensity = Net[e][1] * (t[e] || 0)));
}
var Het = new vi(0, 0, 0, "YXZ"),
  Det = (o, t, e) => (o < t ? t : o > e ? e : o),
  Uet = new tn(),
  DMt = new dt(0, 1, 0);
function Ec(o, t) {
  let e = o.root;
  if (
    (e.position.set(t.pos.x, t.pos.y, t.pos.z),
    e.rotation.set(
      t.pitch + (t.flip || 0) + (t.tilt || 0),
      t.psi,
      -t.roll + (t.spin || 0),
      "YXZ",
    ),
    t.wyaw && (Uet.setFromAxisAngle(DMt, t.wyaw), e.quaternion.multiply(Uet)),
    t.flip)
  ) {
    let h = t.flip,
      f = -0.6 * Math.sin(h);
    ((e.position.x += f * Math.sin(t.psi)),
      (e.position.y += 0.6 - 0.6 * Math.cos(h)),
      (e.position.z += f * Math.cos(t.psi)));
  }
  o.body.position.set(0, t.heave - 0.005 + (o.rideDy || 0), 0);
  let s = t.bodyRoll + Det(0.7 * t.bodyRoll, -0.035, 0.035),
    n = t.bodyPitch + Det(0.25 * t.bodyPitch, -0.02, 0.02);
  o.body.rotation.set(n, 0, -s, "YXZ");
  let i = o.dims?.pivotY ?? 0.45,
    a = o.dims?.cgZ ?? Get;
  Het.set(n, 0, -s, "YXZ");
  let r = new tn().setFromEuler(Het),
    l = new dt(0, i, a),
    c = l.clone().applyQuaternion(r);
  ((o.body.position.x += l.x - c.x),
    (o.body.position.y += l.y - c.y),
    (o.body.position.z += l.z - c.z));
  for (let h = 0; h < 4; h++) {
    let f = o.wheels[h];
    ((f.steer.rotation.y = h < 2 ? t.steer * (o.dims?.steerK ?? 1) : 0),
      (f.spin.rotation.x = -t.wheelSpin[h]),
      f._y0 === void 0 && (f._y0 = f.steer.position.y),
      (f.steer.position.y = f._y0 + (t.wheelDy?.[h] || 0)));
  }
}
es();
P0();
var JO = "assets/cybercab/",
  Vet = new Map();
function UMt(o, t) {
  let e = Vet.get(o);
  return (
    e ||
      Vet.set(
        o,
        (e = e0(JO + o, (s) => {
          ((s.colorSpace = t ? Je : Nn), (s.flipY = !1), (s.anisotropy = 8));
        })),
      ),
    e
  );
}
var _2 = new It().setRGB(0.8, 0.735, 0.6, Je);
