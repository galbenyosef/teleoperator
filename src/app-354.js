// app 354 — math
// Lines 170774-171090 of readable/app.pretty.js (statement-aligned).
function G4t(o) {
  let t = new me({
      name: "CustomPlaceholder",
      color: new It(0.32, 0.22, 0.55),
      roughness: 0.35,
      metalness: 0.4,
    }),
    e = new me({
      name: "CustomGlass",
      color: new It(0.03, 0.035, 0.04),
      roughness: 0.1,
      metalness: 0.2,
    }),
    s = new me({
      name: "CustomTyre",
      color: new It(0.03, 0.03, 0.03),
      roughness: 0.9,
    }),
    { L: n, W: i, H: a } = o,
    r = Math.max(0.2, o.wheelR[0]),
    l = (o.min[2] + o.max[2]) / 2,
    c = (d, p, m, g, b, v) => {
      let x = new Is(d, p, m);
      return (x.translate(0, g, b), { g: x, m: v });
    },
    h = Math.max(0.3, a * 0.45),
    f = [
      c(i * 0.98, h, n * 0.98, r * 0.6 + h / 2, l, t),
      c(
        i * 0.84,
        a - r * 0.6 - h,
        n * 0.5,
        r * 0.6 + h + (a - r * 0.6 - h) / 2,
        l + n * 0.04,
        e,
      ),
    ],
    u = o.wheelR.map((d) => {
      let p = new vs(d, d, Math.min(0.3, i * 0.14), 20);
      return (p.rotateZ(Math.PI / 2), [{ g: p, m: s, name: "Tyre" }]);
    });
  return {
    body: f,
    wheels: u,
    mats: [t, e, s],
    hasWheels: !0,
    placeholder: !0,
  };
}
function V4t(o, t) {
  let e = new le();
  e.name = "CustomModel";
  let s = new le();
  ((s.name = "CustomBody"), e.add(s));
  let n = ({ g: u, m: d, name: p }) => {
    let m = new ye(u, d);
    return ((m.castShadow = !0), (m.receiveShadow = !0), p && (m.name = p), m);
  };
  for (let u of o.body) s.add(n(u));
  let i = t.wheels.map((u, d) => {
      let p = new le();
      (p.position.set(...u), (p.name = "WheelSteer" + d));
      let m = new le();
      ((m.name = "WheelSpin" + d), p.add(m));
      for (let g of o.wheels[d] || []) m.add(n(g));
      for (let g of o.calipers?.[d] || []) p.add(n(g));
      return (e.add(p), { c: u, steer: p, spin: m });
    }),
    a = new le();
  ((a.name = "Car"), (a.rotation.order = "YXZ"), a.add(e));
  let r = (t.min[2] + t.max[2]) / 2,
    l = {
      w: t.W,
      l: t.L,
      cz: r,
      wheels: t.wheels.map((u) => [u[0], u[2]]),
      pivotY: Math.max(0.3, Math.min(0.7, t.H * 0.36)),
      cgZ: 0,
      steerK: o.hasWheels ? 1 : 0,
      tail: [
        [-t.W * 0.34, Math.max(0.4, t.H * 0.55), t.max[2] - 0.05],
        [t.W * 0.34, Math.max(0.4, t.H * 0.55), t.max[2] - 0.05],
      ],
    },
    c = Object.fromEntries(o.mats.map((u, d) => ["M" + d, u])),
    h = 0;
  a.traverse((u) => {
    u.isMesh && (h += gB(u.geometry));
  });
  let f = {
    root: a,
    model: e,
    body: s,
    wheels: i,
    lamps: { tail: [], head: [], signal: [] },
    dims: l,
    materials: c,
    setLamps: () => {},
    onNight: () => {},
    custom: !0,
    placeholder: !!o.placeholder,
    tris: h,
  };
  if (((f.wheelFit = o.placeholder ? null : j4t(f, t)), o.paint)) {
    let u = o.look || {
      col: [0.5, 0.5, 0.5],
      tol: 0.25,
      sep: !0,
      belt: null,
      rough: 0.5,
      metal: 0,
    };
    ((f.paintKit = Ir({
      mat: o.paint,
      kind:
        "item" +
        Math.round(o.lref * 100) +
        (u.sep ? "s" : "m") +
        u.col.map((d) => Math.round(d * 50)).join(""),
      factory: o.paint.color.clone(),
      hook: (d) => q4t(d, o.lref, u),
      coatOn: "material",
    })),
      u.belt != null && (f.paintKit.belt = u.belt),
      (f.paintKit.look = u));
  } else
    f.noPaint = o.placeholder
      ? "A stand-in body: its paint is the model's."
      : "Its paint, glass and lamps share one picture in its model, so a wrap would cover the windows.";
  return ((f.noWheelTune = !f.wheelFit), f);
}
function W4t(o, t, e) {
  let s = t.some((z) => e(z.m)),
    n = {
      col: [0.6, 0.6, 0.6],
      tol: 0.18,
      sep: s,
      belt: null,
      rough: o.roughness ?? 0.5,
      metal: o.metalness ?? 0,
    },
    i = (z) => (z <= 0.04045 ? z / 12.92 : Math.pow((z + 0.055) / 1.055, 2.4)),
    a = o.color ? [o.color.r, o.color.g, o.color.b] : [1, 1, 1],
    r = [],
    l = null,
    c = 512;
  if (o.map?.image && typeof OffscreenCanvas == "function")
    try {
      let z = new OffscreenCanvas(c, c),
        A = z.getContext("2d", { willReadFrequently: !0 });
      (A.drawImage(o.map.image, 0, 0, c, c),
        (l = A.getImageData(0, 0, c, c).data));
    } catch {
      l = null;
    }
  let h = (z, A) => {
    let T = Math.min(c - 1, Math.max(0, Math.floor((z - Math.floor(z)) * c))),
      E = Math.min(c - 1, Math.max(0, Math.floor((A - Math.floor(A)) * c))),
      R = (E * c + T) * 4;
    return [i(l[R] / 255), i(l[R + 1] / 255), i(l[R + 2] / 255)];
  };
  for (let z of t) {
    if (z.m !== o) continue;
    let A = z.g.attributes.position,
      T = z.g.attributes.normal,
      E = z.g.attributes.uv,
      R = z.g.index,
      P = (R ? R.count : A.count) / 3,
      C = Math.max(1, Math.floor(P / 8e3)),
      I = (L) => (R ? R.getX(L) : L);
    for (let L = 0; L < P; L += C) {
      let F = I(3 * L),
        O = I(3 * L + 1),
        B = I(3 * L + 2),
        H =
          l && E
            ? h(
                (E.getX(F) + E.getX(O) + E.getX(B)) / 3,
                (E.getY(F) + E.getY(O) + E.getY(B)) / 3,
              )
            : [1, 1, 1],
        N = A.getX(O) - A.getX(F),
        D = A.getY(O) - A.getY(F),
        U = A.getZ(O) - A.getZ(F),
        G = A.getX(B) - A.getX(F),
        W = A.getY(B) - A.getY(F),
        V = A.getZ(B) - A.getZ(F),
        $ = 0.5 * Math.hypot(D * V - U * W, U * G - N * V, N * W - D * G);
      r.push([
        H[0] * a[0],
        H[1] * a[1],
        H[2] * a[2],
        (A.getY(F) + A.getY(O) + A.getY(B)) / 3,
        T ? Math.abs(T.getX(F) + T.getX(O) + T.getX(B)) / 3 : 0,
        $,
        Math.abs(A.getX(F) + A.getX(O) + A.getX(B)) / 3,
        T ? (T.getY(F) + T.getY(O) + T.getY(B)) / 3 : 0,
      ]);
    }
  }
  if (!r.length) return n;
  let f = 0;
  for (let z of r) f = Math.max(f, z[6]);
  for (let z of r)
    z[5] *= z[6] > f * 0.72 && z[7] > -0.3 && z[4] > 0.3 ? 1 : 0.02;
  let u = (z) => Math.min(5, Math.floor(Math.pow(Math.max(0, z), 1 / 2.2) * 6)),
    d = new Map();
  for (let z of r) {
    let A = u(z[0]) * 36 + u(z[1]) * 6 + u(z[2]);
    d.set(A, (d.get(A) || 0) + z[5]);
  }
  let p = [...d.entries()].sort((z, A) => A[1] - z[1])[0][0],
    m = 0,
    g = [0, 0, 0];
  for (let z of r)
    u(z[0]) * 36 + u(z[1]) * 6 + u(z[2]) === p &&
      ((g[0] += z[0] * z[5]),
      (g[1] += z[1] * z[5]),
      (g[2] += z[2] * z[5]),
      (m += z[5]));
  n.col = g.map((z) => Math.max(0.004, z / Math.max(m, 1e-9)));
  let b = (z) => 0.2126 * z[0] + 0.7152 * z[1] + 0.0722 * z[2],
    v = b(n.col),
    x = (z) => {
      let A = Math.max(b(z), 0.001);
      return [z[0] / A, z[1] / A, z[2] / A];
    },
    y = x(n.col),
    M = 1 / 0,
    S = -1 / 0;
  for (let z of r) ((M = Math.min(M, z[3])), (S = Math.max(S, z[3])));
  let w = (z) => {
      let A = x(z);
      return (
        b(z) / v < 0.45 ||
        Math.hypot(A[0] - y[0], A[1] - y[1], A[2] - y[2]) > n.tol * 2.2
      );
    },
    _ = r
      .filter((z) => z[4] > 0.45 && z[3] > M + (S - M) * 0.55 && !s && w(z))
      .map((z) => z[3])
      .sort((z, A) => z - A);
  if (s)
    for (let z of t) {
      if (!e(z.m)) continue;
      let A = z.g.attributes.position,
        T = z.g.attributes.normal;
      for (let E = 0; E < A.count; E += Math.max(1, Math.floor(A.count / 3e3)))
        T && Math.abs(T.getX(E)) > 0.45 && _.push(A.getY(E));
    }
  return (
    _.sort((z, A) => z - A),
    _.length >= 4 && (n.belt = _[Math.floor(_.length * 0.1)]),
    n
  );
}
function q4t(o, t, e) {
  if (!o) return;
  let s = (a) => a.toFixed(4),
    n = (a) => `vec3f(${a.map(s).join(", ")})`,
    i = 0.2126 * e.col[0] + 0.7152 * e.col[1] + 0.0722 * e.col[2];
  return (
    a_({ g: 1, b: 1, ...o }) +
    `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let fwP = length(fwidth((F.nf * vec4f(wp, 1.0)).xyz * ${(o.flakeScale || 1400).toFixed(1)}));
  let t = textureSample(matMap, matSamp, uv); let tc = t.rgb * bc.rgb; let lum = dot(tc, vec3f(0.2126, 0.7152, 0.0722));
  let r = lum / ${s(i)};
  let chd = length(tc / max(lum, 1e-3) - ${n(e.col.map((a) => a / i))});
  // (one texture for all: the glass and the trim - far darker than the paint - and the lamps - another colour, red to amber, or
  // far brighter - keep the model's look; a stripe of another colour in the paint is paint, the wrap covers it)
  let sat = (max(tc.r, max(tc.g, tc.b)) - min(tc.r, min(tc.g, tc.b))) / max(max(tc.r, max(tc.g, tc.b)), 1e-3);
  let dk = max(1.0 - smoothstep(0.1, 0.2, r), (1.0 - smoothstep(${e.sep ? "0.22, 0.4" : "0.38, 0.55"}, r)) * (1.0 - smoothstep(0.3, 0.5, sat)));   // (dark and colourless: glass, tyres, trim - a dark blue stripe is paint)
  let pm = (1.0 - dk)${e.sep ? "" : ` * (1.0 - smoothstep(1.9, 2.8, r)) * (1.0 - smoothstep(${s(e.tol)}, ${s(e.tol * 2.2)}, chd) * smoothstep(1.4, 2.2, tc.r / max(tc.b, 1e-3)))`};
  if (pm < 0.002) { return vec4f(t.rgb * bc.rgb, t.a); }
  let sh = mix(1.0, clamp(r, 0.55, 1.1), ${o.wrap ? "0.25" : "0.45"});
  let pc = carPaintW(wp, vec4f(bc.rgb * sh, 1.0), fwP);
  gHK = vec4f(mix(${s(e.rough)}, gHK.x, pm), mix(${s(e.metal)}, gHK.y, pm), gHK.z, 1.0); gHN = vec4f(gHN.xyz * pm, gHN.w); gHF0 = mix(1.0, gHF0, pm);
  return vec4f(mix(t.rgb * bc.rgb, pc.rgb, pm), t.a);
}
`
  );
}
function j4t(o, t) {
  let e = [];
  for (let s = 0; s < 4; s++) {
    let n = o.wheels[s].spin.children.filter(
      (c) => c.isMesh && c.name === "Tyre",
    );
    if (!n.length) return null;
    let i = 0,
      a = 1e9,
      r = new xi();
    for (let c of n) {
      let h = c.geometry.attributes.position;
      (c.geometry.computeBoundingBox(), r.union(c.geometry.boundingBox));
      for (
        let f = 0;
        f < h.count;
        f += Math.max(1, Math.floor(h.count / 4e3))
      ) {
        let u = Math.hypot(h.getY(f), h.getZ(f));
        (u > i && (i = u), u < a && (a = u));
      }
    }
    let l = r.getCenter(new dt());
    if (
      Math.abs(i - t.wheelR[s]) > t.wheelR[s] * 0.1 ||
      Math.hypot(l.y, l.z) > 0.02
    )
      return null;
    e.push({ R: i, r: a, w: r.max.x - r.min.x });
  }
  return e;
}
es();
P0();
