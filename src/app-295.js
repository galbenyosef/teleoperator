// app 295 — math
// Lines 144090-144434 of readable/app.pretty.js (statement-aligned).
function u5t(o, t, e, s) {
  let n = o.P,
    i = n.length / 3;
  for (let a = 0; a + 1 < i; a++) {
    let r = n[a * 3],
      l = n[a * 3 + 1],
      c = n[a * 3 + 3],
      h = n[a * 3 + 4],
      f = c - r,
      u = h - l,
      d = f * f + u * u || 1,
      p = Math.max(0, Math.min(1, ((t - r) * f + (e - l) * u) / d));
    if (Math.hypot(t - r - f * p, e - l - u * p) < (o.W[a] || 6) + s) return !0;
  }
  return !1;
}
var d5t = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let c = textureSample(matMap, matSamp, uv).rgb;
  let k = col.a;   // 1 at the top edge, 0 at the bottom (vertex colour)
  gHE = c * bc.b * (0.28 + 0.5 * k * k) * vec3f(1.0, 0.95, 0.85);
  gHK = vec4f(0.55, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  p5t = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHE = vec3f(1.0, 0.9, 0.75) * bc.b * 6.0;
  gHK = vec4f(0.4, 0.3, 0.0, 1.0);
  return vec4f(0.35, 0.35, 0.33, 1.0);
}
`;
function VQ(o, t, e = null) {
  if (typeof document > "u") return null;
  let s = performance.now(),
    n = f5t(o, t),
    i = performance.now() - s,
    a = new Map(),
    r = (R, P) => {
      let C = `${Math.floor(R / 512)},${Math.floor(P / 512)}`,
        I = a.get(C);
      return (
        I ||
          a.set(
            C,
            (I = {
              x: (Math.floor(R / 512) + 0.5) * 512,
              z: (Math.floor(P / 512) + 0.5) * 512,
              steel: [],
              face: [],
              lamp: [],
              mural: [],
            }),
          ),
        I
      );
    },
    l = (R) => {
      R = R.index ? R.toNonIndexed() : R;
      for (let P of Object.keys(R.attributes))
        ["position", "normal", "uv"].includes(P) || R.deleteAttribute(P);
      return R;
    },
    c = (R, P, C, I, L, F, O) => {
      let B = new Is(R, P, C);
      return (B.translate(I, L, F), B.applyMatrix4(O), l(B));
    },
    h = (R, P, C, I, L, F, O) => {
      let B = new vs(R, P, C, 10, 1, !0);
      return (B.translate(I, L + C / 2, F), B.applyMatrix4(O), l(B));
    },
    f = (R, P, C, I) => {
      let L = (R % P) / P,
        F = 1 - Math.floor(R / P) * I;
      return [L + 0.002, L + 1 / P - 0.002, F - I + 0.002, F - 0.002];
    },
    u = (R, P, C, I, L, F) => {
      let O = new Yn(R, P);
      O.translate(0, C + P / 2, I);
      let B = O.attributes.uv,
        H = new Float32Array(B.count * 4);
      for (let N = 0; N < B.count; N++) {
        let D = B.getX(N),
          U = B.getY(N);
        (B.setXY(N, L[0] + (L[1] - L[0]) * D, L[2] + (L[3] - L[2]) * U),
          (H[N * 4] = H[N * 4 + 1] = H[N * 4 + 2] = 1),
          (H[N * 4 + 3] = U));
      }
      return (
        O.setAttribute("color", new Te(H, 4)),
        O.applyMatrix4(F),
        O.index ? O.toNonIndexed() : O
      );
    },
    d = (R, P, C, I, L) =>
      new fe()
        .makeBasis(new dt(L, 0, -I), new dt(0, 1, 0), new dt(I, 0, L))
        .setPosition(R, P, C),
    p = 341 / 2048,
    m = (R, P, C, I, L, F = -1) => {
      (R.steel.push(c(C + 0.3, I + 0.3, 0.25, 0, I / 2, -0.2, P)),
        R.face.push(u(C, I, 0, 0.06, f(L, 2, 6, p), P)));
      for (let O = -C / 2 + 1; O <= C / 2 - 0.9; O += (C - 2) / 3)
        (R.steel.push(
          c(0.08, 0.08, 1.3, O, I + 0.35, 0.55, P),
          c(0.08, 0.5, 0.08, O, I + 0.1, -0.1, P),
        ),
          R.lamp.push(c(0.35, 0.12, 0.25, O, I + 0.28, 1.2, P)));
      if (F >= 0) {
        let O = P.clone()
          .multiply(new fe().makeRotationY(Math.PI))
          .multiply(new fe().makeTranslation(0, 0, 0.4));
        R.face.push(u(C, I, 0, 0.06, f(F, 2, 6, p), O));
        for (let B = -C / 2 + 1; B <= C / 2 - 0.9; B += (C - 2) / 3)
          (R.steel.push(c(0.08, 0.08, 1.3, B, I + 0.35, 0.55, O)),
            R.lamp.push(c(0.35, 0.12, 0.25, B, I + 0.28, 1.2, O)));
      }
      R.steel.push(
        c(C + 0.6, 0.06, 1, 0, -0.35, 0.45, P),
        c(C + 0.6, 0.05, 0.05, 0, 0.55, 0.92, P),
      );
      for (let O = -C / 2; O <= C / 2 + 0.01; O += C / 6)
        R.steel.push(c(0.05, 0.9, 0.05, O, 0.1, 0.92, P));
    };
  for (let R of n.roof) {
    let P = r(R.x, R.z),
      C = d(R.x, R.y, R.z, R.nx, R.nz),
      I = R.y - R.base + 0.1;
    m(P, C, R.w, R.h, R.ad);
    for (let L of [-0.42, -0.14, 0.14, 0.42]) {
      P.steel.push(c(0.22, I, 0.22, L * R.w, -I / 2, -0.25, C));
      let F = c(0.14, Math.hypot(I, 2.2), 0.14, 0, 0, 0, new fe());
      (F.applyMatrix4(new fe().makeRotationX(-Math.atan2(2.2, I))),
        F.applyMatrix4(new fe().makeTranslation(L * R.w, -I / 2, -1.35)),
        F.applyMatrix4(C),
        P.steel.push(F));
    }
    P.steel.push(c(R.w, 0.18, 0.18, 0, -I * 0.5, -0.25, C));
  }
  for (let R of n.pole) {
    let P = r(R.x, R.z),
      C = d(R.x, R.y, R.z, R.nx, R.nz),
      I = R.y - R.ground + 0.5;
    (m(P, C, R.w, R.h, R.ad, R.back),
      P.steel.push(
        h(0.55, 0.75, I, 0, -I, -0.2, C),
        h(0.9, 0.9, 0.5, 0, -I, -0.2, C),
        c(R.w * 0.6, 0.35, 0.35, 0, -0.3, -0.2, C),
      ),
      e?.push({
        t: "circ",
        x: R.x - R.nx * 0.2,
        z: R.z - R.nz * 0.2,
        r: 0.8,
        y0: R.ground - 0.5,
        y1: R.y + 0.5,
      }));
  }
  let g = 0.125;
  for (let R of n.mural) {
    let P = r(R.ax, R.az),
      [C, I, L, F] = f(R.cell, 2, 8, g),
      O = C + (I - C) * (R.uw ?? 1),
      B = new Le(),
      H = [
        R.ax,
        R.y0,
        R.az,
        R.bx,
        R.y0,
        R.bz,
        R.bx,
        R.y1,
        R.bz,
        R.ax,
        R.y0,
        R.az,
        R.bx,
        R.y1,
        R.bz,
        R.ax,
        R.y1,
        R.az,
      ];
    (B.setAttribute("position", new Te(new Float32Array(H), 3)),
      B.setAttribute(
        "normal",
        new Te(
          new Float32Array([0, 1, 2, 3, 4, 5].flatMap(() => [R.nx, 0, R.nz])),
          3,
        ),
      ),
      B.setAttribute(
        "uv",
        new Te(new Float32Array([C, L, O, L, O, F, C, L, O, F, C, F]), 2),
      ),
      P.mural.push(B));
  }
  let b = () => {
      let R = document.createElement("canvas");
      R.width = R.height = 4;
      let P = R.getContext("2d");
      ((P.fillStyle = "#6f6c66"), P.fillRect(0, 0, 4, 4));
      let C = new ai(R);
      return ((C.needsUpdate = !0), (C.colorSpace = Je), (C.anisotropy = 8), C);
    },
    v = b(),
    x = b(),
    y = new me({ color: 7172468, roughness: 0.55, metalness: 0.5 }),
    M = new me({
      color: 16777215,
      map: v,
      roughness: 0.55,
      metalness: 0,
      vertexColors: !0,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -4,
    });
  ((M.userData.mbAlbedo = d5t), (M.userData.dayGlow = 0));
  let S = new me({ color: 16777215, roughness: 0.4 });
  ((S.userData.mbAlbedo = p5t), (S.userData.dayGlow = 0));
  let w = new me({
    color: 16777215,
    map: x,
    roughness: 0.92,
    metalness: 0,
    polygonOffset: !0,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -2,
    depthWrite: !1,
  });
  for (let R of [y, M, S, w]) R.userData.mbSkyVis = 2;
  let _ = new le();
  _.name = "Billboards";
  for (let R of a.values()) {
    let P = new le();
    ((P.name = "bb_cell"), (P.userData.c = R));
    for (let [C, I, L, F, O] of [
      [R.steel, y, "bb_steel", !1, !0],
      [R.face, M, "bb_face", !0, !0],
      [R.lamp, S, "bb_lamp", !1, !1],
      [R.mural, w, "bb_mural", !0, !1],
    ]) {
      if (!C.length) continue;
      let B = wi(C);
      if (!B) continue;
      B.computeBoundingSphere();
      let H = new ye(B, I);
      ((H.name = L),
        (H.castShadow = O),
        (H.receiveShadow = !0),
        (H.matrixAutoUpdate = !1),
        H.updateMatrix(),
        P.add(H));
    }
    _.add(P);
  }
  let z = !1;
  async function A(R = "assets/tex/", P = null) {
    let C = async (I, L) => {
      ((L.image = await new tc().loadAsync(R + I)),
        (L.needsUpdate = !0),
        P?.(L));
    };
    try {
      (await Promise.all([C("billboards.webp", v), C("murals.webp", x)]),
        (z = !0));
    } catch (I) {
      console.warn("billboards: no art", I);
    }
  }
  let T = 1800;
  function E(R, P) {
    for (let C of _.children) {
      let I = C.userData.c;
      C.visible =
        Math.hypot(
          Math.max(0, Math.abs(I.x - R) - 256),
          Math.max(0, Math.abs(I.z - P) - 256),
        ) < T;
    }
  }
  return (
    (_.userData.stats = {
      roof: n.roof.length,
      pole: n.pole.length,
      mural: n.mural.length,
      planMs: Math.round(i),
      ms: Math.round(performance.now() - s),
    }),
    {
      group: _,
      night: [M, S],
      load: A,
      update: E,
      plan: n,
      get ready() {
        return z;
      },
    }
  );
}
es();
Ya();
await No();
var WQ = [dw, Ww, Zw],
  qQ = () =>
    !On("landmarks") ||
    (typeof location < "u" && /[?&]nolm\b/.test(location.search));
function jQ(o, t, e = {}) {
  let s = {
    D: o,
    L: t,
    ground: Wb(t),
    frame: Rk,
    claim: (n) => Dm(o, n),
    rectPoly: Pk,
    streetNear: (...n) => EP(o, ...n),
    streetLine: (...n) => TP(o, ...n),
    group: null,
    colliders: [],
    inst: [],
    night: [],
    mats: {},
    tex: null,
    headless: typeof document > "u",
    sites: [],
    onUpdate: [],
    ...e,
  };
  return ((s.site = (n, i) => Ak(s, n, i)), s);
}
function KF(o, t) {
  let e = Du(o);
  if (e.done || ((e.done = !0), qQ())) return e;
  let s = jQ(o, t);
  for (let n of WQ)
    try {
      n.realClaims?.(s);
    } catch (i) {
      console.error("landmark claims:", n.NAME, i);
    }
  return e;
}
