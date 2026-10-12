// app 296 — math
// Lines 143813-144154 of readable/app.pretty.js (statement-aligned).
function Uxt(i, t, e, s) {
  let n = i.P,
    o = n.length / 3;
  for (let a = 0; a + 1 < o; a++) {
    let r = n[a * 3],
      l = n[a * 3 + 1],
      c = n[a * 3 + 3],
      h = n[a * 3 + 4],
      f = c - r,
      u = h - l,
      d = f * f + u * u || 1,
      p = Math.max(0, Math.min(1, ((t - r) * f + (e - l) * u) / d));
    if (Math.hypot(t - r - f * p, e - l - u * p) < (i.W[a] || 6) + s) return !0;
  }
  return !1;
}
var Gxt = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let c = textureSample(matMap, matSamp, uv).rgb;
  let k = col.a;   // 1 at the top edge, 0 at the bottom (vertex colour)
  gHE = c * bc.b * (0.28 + 0.5 * k * k) * vec3f(1.0, 0.95, 0.85);
  gHK = vec4f(0.55, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`,
  Wxt = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  gHE = vec3f(1.0, 0.9, 0.75) * bc.b * 6.0;
  gHK = vec4f(0.4, 0.3, 0.0, 1.0);
  return vec4f(0.35, 0.35, 0.33, 1.0);
}
`;
function DJ(i, t, e = null) {
  if (typeof document > "u") return null;
  let s = performance.now(),
    n = Dxt(i, t),
    o = performance.now() - s,
    a = new Map(),
    r = (A, C) => {
      let P = `${Math.floor(A / 512)},${Math.floor(C / 512)}`,
        I = a.get(P);
      return (
        I ||
          a.set(
            P,
            (I = {
              x: (Math.floor(A / 512) + 0.5) * 512,
              z: (Math.floor(C / 512) + 0.5) * 512,
              steel: [],
              face: [],
              lamp: [],
              mural: [],
            }),
          ),
        I
      );
    },
    l = (A) => {
      A = A.index ? A.toNonIndexed() : A;
      for (let C of Object.keys(A.attributes))
        ["position", "normal", "uv"].includes(C) || A.deleteAttribute(C);
      return A;
    },
    c = (A, C, P, I, L, F, N) => {
      let B = new qs(A, C, P);
      return (B.translate(I, L, F), B.applyMatrix4(N), l(B));
    },
    h = (A, C, P, I, L, F, N) => {
      let B = new ks(A, C, P, 10, 1, !0);
      return (B.translate(I, L + P / 2, F), B.applyMatrix4(N), l(B));
    },
    f = (A, C, P, I) => {
      let L = (A % C) / C,
        F = 1 - Math.floor(A / C) * I;
      return [L + 0.002, L + 1 / C - 0.002, F - I + 0.002, F - 0.002];
    },
    u = (A, C, P, I, L, F) => {
      let N = new $n(A, C);
      N.translate(0, P + C / 2, I);
      let B = N.attributes.uv,
        H = new Float32Array(B.count * 4);
      for (let O = 0; O < B.count; O++) {
        let D = B.getX(O),
          U = B.getY(O);
        (B.setXY(O, L[0] + (L[1] - L[0]) * D, L[2] + (L[3] - L[2]) * U),
          (H[O * 4] = H[O * 4 + 1] = H[O * 4 + 2] = 1),
          (H[O * 4 + 3] = U));
      }
      return (
        N.setAttribute("color", new Te(H, 4)),
        N.applyMatrix4(F),
        N.index ? N.toNonIndexed() : N
      );
    },
    d = (A, C, P, I, L) =>
      new ye()
        .makeBasis(new xt(L, 0, -I), new xt(0, 1, 0), new xt(I, 0, L))
        .setPosition(A, C, P),
    p = 341 / 2048,
    m = (A, C, P, I, L, F = -1) => {
      (A.steel.push(c(P + 0.3, I + 0.3, 0.25, 0, I / 2, -0.2, C)),
        A.face.push(u(P, I, 0, 0.06, f(L, 2, 6, p), C)));
      for (let N = -P / 2 + 1; N <= P / 2 - 0.9; N += (P - 2) / 3)
        (A.steel.push(
          c(0.08, 0.08, 1.3, N, I + 0.35, 0.55, C),
          c(0.08, 0.5, 0.08, N, I + 0.1, -0.1, C),
        ),
          A.lamp.push(c(0.35, 0.12, 0.25, N, I + 0.28, 1.2, C)));
      if (F >= 0) {
        let N = C.clone()
          .multiply(new ye().makeRotationY(Math.PI))
          .multiply(new ye().makeTranslation(0, 0, 0.4));
        A.face.push(u(P, I, 0, 0.06, f(F, 2, 6, p), N));
        for (let B = -P / 2 + 1; B <= P / 2 - 0.9; B += (P - 2) / 3)
          (A.steel.push(c(0.08, 0.08, 1.3, B, I + 0.35, 0.55, N)),
            A.lamp.push(c(0.35, 0.12, 0.25, B, I + 0.28, 1.2, N)));
      }
      A.steel.push(
        c(P + 0.6, 0.06, 1, 0, -0.35, 0.45, C),
        c(P + 0.6, 0.05, 0.05, 0, 0.55, 0.92, C),
      );
      for (let N = -P / 2; N <= P / 2 + 0.01; N += P / 6)
        A.steel.push(c(0.05, 0.9, 0.05, N, 0.1, 0.92, C));
    };
  for (let A of n.roof) {
    let C = r(A.x, A.z),
      P = d(A.x, A.y, A.z, A.nx, A.nz),
      I = A.y - A.base + 0.1;
    m(C, P, A.w, A.h, A.ad);
    for (let L of [-0.42, -0.14, 0.14, 0.42]) {
      C.steel.push(c(0.22, I, 0.22, L * A.w, -I / 2, -0.25, P));
      let F = c(0.14, Math.hypot(I, 2.2), 0.14, 0, 0, 0, new ye());
      (F.applyMatrix4(new ye().makeRotationX(-Math.atan2(2.2, I))),
        F.applyMatrix4(new ye().makeTranslation(L * A.w, -I / 2, -1.35)),
        F.applyMatrix4(P),
        C.steel.push(F));
    }
    C.steel.push(c(A.w, 0.18, 0.18, 0, -I * 0.5, -0.25, P));
  }
  for (let A of n.pole) {
    let C = r(A.x, A.z),
      P = d(A.x, A.y, A.z, A.nx, A.nz),
      I = A.y - A.ground + 0.5;
    (m(C, P, A.w, A.h, A.ad, A.back),
      C.steel.push(
        h(0.55, 0.75, I, 0, -I, -0.2, P),
        h(0.9, 0.9, 0.5, 0, -I, -0.2, P),
        c(A.w * 0.6, 0.35, 0.35, 0, -0.3, -0.2, P),
      ),
      e?.push({
        t: "circ",
        x: A.x - A.nx * 0.2,
        z: A.z - A.nz * 0.2,
        r: 0.8,
        y0: A.ground - 0.5,
        y1: A.y + 0.5,
      }));
  }
  let g = 0.125;
  for (let A of n.mural) {
    let C = r(A.ax, A.az),
      [P, I, L, F] = f(A.cell, 2, 8, g),
      N = P + (I - P) * (A.uw ?? 1),
      B = new De(),
      H = [
        A.ax,
        A.y0,
        A.az,
        A.bx,
        A.y0,
        A.bz,
        A.bx,
        A.y1,
        A.bz,
        A.ax,
        A.y0,
        A.az,
        A.bx,
        A.y1,
        A.bz,
        A.ax,
        A.y1,
        A.az,
      ];
    (B.setAttribute("position", new Te(new Float32Array(H), 3)),
      B.setAttribute(
        "normal",
        new Te(
          new Float32Array([0, 1, 2, 3, 4, 5].flatMap(() => [A.nx, 0, A.nz])),
          3,
        ),
      ),
      B.setAttribute(
        "uv",
        new Te(new Float32Array([P, L, N, L, N, F, P, L, N, F, P, F]), 2),
      ),
      C.mural.push(B));
  }
  let b = () => {
      let A = document.createElement("canvas");
      A.width = A.height = 4;
      let C = A.getContext("2d");
      ((C.fillStyle = "#6f6c66"), C.fillRect(0, 0, 4, 4));
      let P = new ei(A);
      return ((P.needsUpdate = !0), (P.colorSpace = is), (P.anisotropy = 8), P);
    },
    x = b(),
    v = b(),
    y = new Ee({ color: 7172468, roughness: 0.55, metalness: 0.5 }),
    M = new Ee({
      color: 16777215,
      map: x,
      roughness: 0.55,
      metalness: 0,
      vertexColors: !0,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -4,
    });
  ((M.userData.mbAlbedo = Gxt), (M.userData.dayGlow = 0));
  let S = new Ee({ color: 16777215, roughness: 0.4 });
  ((S.userData.mbAlbedo = Wxt), (S.userData.dayGlow = 0));
  let w = new Ee({
    color: 16777215,
    map: v,
    roughness: 0.92,
    metalness: 0,
    polygonOffset: !0,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -2,
    depthWrite: !1,
  });
  for (let A of [y, M, S, w]) A.userData.mbSkyVis = 2;
  let z = new ke();
  z.name = "Billboards";
  for (let A of a.values()) {
    let C = new ke();
    ((C.name = "bb_cell"), (C.userData.c = A));
    for (let [P, I, L, F, N] of [
      [A.steel, y, "bb_steel", !1, !0],
      [A.face, M, "bb_face", !0, !0],
      [A.lamp, S, "bb_lamp", !1, !1],
      [A.mural, w, "bb_mural", !0, !1],
    ]) {
      if (!P.length) continue;
      let B = wi(P);
      if (!B) continue;
      B.computeBoundingSphere();
      let H = new _e(B, I);
      ((H.name = L),
        (H.castShadow = N),
        (H.receiveShadow = !0),
        (H.matrixAutoUpdate = !1),
        H.updateMatrix(),
        C.add(H));
    }
    z.add(C);
  }
  let _ = !1;
  async function R(A = "assets/tex/", C = null) {
    let P = async (I, L) => {
      ((L.image = await new Il().loadAsync(A + I)),
        (L.needsUpdate = !0),
        C?.(L));
    };
    try {
      (await Promise.all([P("billboards.webp", x), P("murals.webp", v)]),
        (_ = !0));
    } catch (I) {
      console.warn("billboards: no art", I);
    }
  }
  let T = 1800;
  function E(A, C) {
    for (let P of z.children) {
      let I = P.userData.c;
      P.visible =
        Math.hypot(
          Math.max(0, Math.abs(I.x - A) - 256),
          Math.max(0, Math.abs(I.z - C) - 256),
        ) < T;
    }
  }
  return (
    (z.userData.stats = {
      roof: n.roof.length,
      pole: n.pole.length,
      mural: n.mural.length,
      planMs: Math.round(o),
      ms: Math.round(performance.now() - s),
    }),
    {
      group: z,
      night: [M, S],
      load: R,
      update: E,
      plan: n,
      get ready() {
        return _;
      },
    }
  );
}
as();
Oa();
var UJ = [vy, Ky, nw],
  GJ = () => typeof location < "u" && /[?&]nolm\b/.test(location.search);
function WJ(i, t, e = {}) {
  let s = {
    D: i,
    L: t,
    ground: TS(t),
    frame: ES,
    claim: (n) => uy(i, n),
    rectPoly: RS,
    streetNear: (...n) => JR(i, ...n),
    streetLine: (...n) => ZR(i, ...n),
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
  return ((s.site = (n, o) => AS(s, n, o)), s);
}
function vI(i, t) {
  let e = sb(i);
  if (e.done || ((e.done = !0), GJ())) return e;
  let s = WJ(i, t);
  for (let n of UJ)
    try {
      n.realClaims?.(s);
    } catch (o) {
      console.error("landmark claims:", n.NAME, o);
    }
  return e;
}
