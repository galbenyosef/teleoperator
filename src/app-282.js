// app 282 — math
// Lines 138824-139141 of readable/app.pretty.js (statement-aligned).
async function NF(o, t, e, s, n = 4) {
  let i = e.species,
    a = new Map(),
    r = performance.now(),
    l = (A) =>
      i[A] ? A : /palm/.test(A) ? (/^f|^w/.test(A) ? "fpalm" : "palm") : null,
    c = performance.now(),
    h = 0;
  for (let A = 0; A < o.length; A++) {
    let T = o[A];
    if (
      ((A & 2047) === 0 &&
        performance.now() - c > n &&
        ((h += performance.now() - c),
        await new Promise((I) => setTimeout(I, 16)),
        (c = performance.now())),
      T.kind !== "tree" && !/palm/.test(T.kind))
    )
      continue;
    let E = t(T);
    if (!E) continue;
    let R = l(E.split("~")[0]);
    if (!R) continue;
    let P = Math.floor(T.x / iv) + "," + Math.floor(T.z / iv),
      C = a.get(P);
    (C || a.set(P, (C = [])), C.push([T, i[R]]));
  }
  let f = bQ(e.cols, e.rows),
    u = e.rows > 4 ? bQ(e.cols, e.rows, [2]) : null,
    d = new le();
  d.name = "FarTrees";
  let p = new fe(),
    m = new tn(),
    g = new vi(),
    b = new dt(),
    v = new dt(),
    x = new It(),
    y = [],
    M = performance.now(),
    S = h + performance.now() - c;
  for (let [A, T] of a) {
    performance.now() - M > n &&
      ((S += performance.now() - M),
      await new Promise((B) => setTimeout(B, 16)),
      (M = performance.now()));
    let E = new En(f, s, T.length),
      R = new Float32Array(T.length * 16),
      P = new Float32Array(T.length * 2),
      C = u && new En(u, s, T.length),
      I = u && new Float32Array(T.length * 16);
    T.forEach(([B, H], N) => {
      let D = H.w * (B.scale || 1),
        U = (B.y ?? 0) + H.y0 * (B.scale || 1);
      (g.set(0, B.rot || 0, 0, "YXZ"),
        m.setFromEuler(g),
        b.set(D, D, D),
        v.set(B.x, U, B.z),
        p.compose(v, m, b).toArray(R, N * 16),
        (P[N * 2] = B.x),
        (P[N * 2 + 1] = B.z),
        C &&
          ((v.y = U + (H.yt ?? 0.5) * D),
          p.compose(v, m, b).toArray(I, N * 16)),
        x.setRGB(
          0.9 + 0.2 * gQ(B.x, B.z, 3),
          0.92 + 0.16 * gQ(B.x, B.z, 4),
          (H.k * 3 + 0.5) / 64,
        ),
        E.setColorAt(N, x),
        C?.setColorAt(N, x));
    });
    let [L, F] = A.split(",").map(Number),
      O = {
        im: E,
        M: R,
        P,
        c: [(L + 0.5) * iv, (F + 0.5) * iv],
        hid: null,
        ims: [[E, R]],
      };
    C && O.ims.push([C, I]);
    for (let [B, H] of O.ims)
      (B.instanceMatrix.array.set(H),
        (B.instanceMatrix.needsUpdate = !0),
        (B.instanceColor.needsUpdate = !0),
        B.computeBoundingSphere(),
        (B.castShadow = !1),
        (B.receiveShadow = !0),
        (B.matrixAutoUpdate = !1),
        B.updateMatrix(),
        (B.name = (B === E ? "far_" : "fartop_") + A),
        d.add(B));
    y.push(O);
  }
  let w = new Float32Array(16),
    _ = bM[0] - 15,
    z = (A, T) => {
      for (let E of y) {
        let R = Math.hypot(E.c[0] - A, E.c[1] - T),
          P = R < Ryt && R + iv * 0.71 > _;
        for (let [L] of E.ims) L.visible = P;
        if (!P) continue;
        let C = R - iv * 0.71 < _;
        if (!C && !E.hid) continue;
        let I = !1;
        E.hid ||= new Uint8Array(E.P.length / 2);
        for (let L = 0; L < E.hid.length; L++) {
          let F =
            C && Math.hypot(E.P[L * 2] - A, E.P[L * 2 + 1] - T) < _ ? 1 : 0;
          if (F !== E.hid[L]) {
            E.hid[L] = F;
            for (let [O, B] of E.ims)
              O.instanceMatrix.array.set(
                F ? w : B.subarray(L * 16, L * 16 + 16),
                L * 16,
              );
            I = !0;
          }
        }
        if (I) for (let [L] of E.ims) L.instanceMatrix.needsUpdate = !0;
      }
    };
  return (
    (S += performance.now() - M),
    (d.userData = {
      cull: z,
      ms: Math.round(S),
      trees: y.reduce((A, T) => A + T.P.length / 2, 0),
      chunks: y.length,
    }),
    d
  );
}
es();
var jp = 1.6,
  ov = 46,
  y_ = 8e3,
  xQ = [28, 44],
  oa = (o, t, e) => {
    let s = Math.sin(o * 12.9898 + t * 78.233 + e * 17.17) * 43758.5453;
    return s - Math.floor(s);
  },
  DF = (o, t) => {
    let e = Math.floor(o),
      s = Math.floor(t),
      n = o - e,
      i = t - s,
      a = (f) => f * f * (3 - 2 * f),
      r = oa(e, s, 1),
      l = oa(e + 1, s, 1),
      c = oa(e, s + 1, 1),
      h = oa(e + 1, s + 1, 1);
    return (
      r + (l - r) * a(n) + (c + (h - c) * a(n) - (r + (l - r) * a(n))) * a(i)
    );
  },
  Ayt = Wp(
    SF.replace(
      "return vec4f(c, a);",
      `{ let cq = F.vpu * vec4f(wp, 1.0); let pq = floor((cq.xy / cq.w * 0.5 + 0.5) / F.screen.xy);
    let nf = fract(52.9829189 * fract(dot(pq + 5.588238 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
    a *= step(smoothstep(${xQ[0].toFixed(1)}, ${xQ[1].toFixed(1)}, dist), nf); }
  return vec4f(c, a);`,
    ),
  );
function yQ(o, t) {
  let e = xM(t);
  ((e.userData = { ...t.userData, mbAlbedo: Ayt, mbWind: 2.04 }),
    (e.name = "sfGrass"));
  let s = n2("clump", 77)[1][0].geo,
    n = new En(s, e, y_);
  ((n.count = 0),
    (n.frustumCulled = !1),
    (n.castShadow = !1),
    (n.receiveShadow = !0),
    (n.name = "sfGrassField"),
    (n.userData.mbReflR = 1));
  let i = new fe(),
    a = new tn(),
    r = new vi(),
    l = new dt(),
    c = new dt(),
    h = new It();
  n.setColorAt(0, h.setRGB(1, 1, 1));
  let f = (p) => (p - s2.clump + 0.5) / 16,
    u = null;
  return {
    mesh: n,
    update: (p, m, g = !1) => {
      if (!g && u && Math.hypot(p - u[0], m - u[1]) < 10) return;
      u = [p, m];
      let b = 0,
        v = Math.floor((p - ov) / jp),
        x = Math.floor((p + ov) / jp),
        y = Math.floor((m - ov) / jp),
        M = Math.floor((m + ov) / jp);
      for (let S = y; S <= M && b < y_; S++)
        for (let w = v; w <= x && b < y_; w++) {
          let _ = (w + oa(w, S, 2)) * jp,
            z = (S + oa(w, S, 3)) * jp;
          if ((_ - p) ** 2 + (z - m) ** 2 > ov * ov) continue;
          let A = o.coverAt(_, z),
            T = A & 15;
          if (A & 8 || (T !== 0 && T !== 1 && T !== 2)) continue;
          if (T === 0 || A & 16) {
            let O = o.terrainAt(_, z);
            if (
              Math.hypot(
                o.terrainAt(_ + 0.8, z) - O,
                o.terrainAt(_, z + 0.8) - O,
              ) /
                0.8 <
                0.45 ||
              T === 1 ||
              (o.clearOfRoads && !o.clearOfRoads(_, z, 1, !0))
            )
              continue;
            T = 2;
          }
          let E = oa(w, S, 4),
            R = DF(_ / 9, z / 9),
            P,
            C,
            I = 1;
          if (T === 2) {
            if (E > 0.55 + 0.45 * R) continue;
            let O = E < 0.45 * R + 0.2;
            ((P = O ? gn.wild : E < 0.62 ? gn.clover : gn.lawn),
              (C = (O ? 0.55 + 0.45 * R : 0.45) + 0.3 * oa(w, S, 5)),
              (I = O ? 0.72 : 0.85));
          } else {
            if (T === 1 || E > 0.03 + 0.08 * R) continue;
            ((P = E < 0.02 ? gn.clover : gn.lawn),
              (C = 0.24 + 0.14 * oa(w, S, 5)),
              (I = 0.78));
          }
          let L = o.terrainAt(_, z),
            F =
              T === 2
                ? Math.hypot(
                    o.terrainAt(_ + 0.8, z) - L,
                    o.terrainAt(_, z + 0.8) - L,
                  ) / 0.8
                : 0;
          for (
            let O = 0, B = 1 + Math.min(3, Math.floor(F / 0.6));
            O < B && b < y_;
            O++
          ) {
            let H = O ? (oa(w, S, 10 + O) - 0.5) * jp : 0,
              N = O ? (oa(w, S, 20 + O) - 0.5) * jp : 0,
              D = O ? 0.75 + 0.5 * oa(w, S, 30 + O) : 1;
            (r.set(0, oa(w, S, 6 + O * 7) * 6.283, 0, "YXZ"),
              a.setFromEuler(r),
              l.set(C * D, C * D * (0.8 + 0.4 * oa(w, S, 7)), C * D),
              c.set(_ + H, (O ? o.terrainAt(_ + H, z + N) : L) - 0.02, z + N),
              i.compose(c, a, l),
              n.setMatrixAt(b, i),
              n.setColorAt(
                b,
                h.setRGB(
                  (0.85 + 0.25 * oa(w, S, 8)) * I,
                  (0.88 + 0.2 * oa(w, S, 9)) * I,
                  f(P),
                ),
              ),
              b++);
          }
        }
      ((n.count = b),
        (n.instanceMatrix.needsUpdate = !0),
        (n.instanceColor.needsUpdate = !0));
    },
  };
}
var av = 0.25,
  rv = 15,
  HF = 14e3,
  vQ = [8.5, 13];
function Pyt() {
  let e = document.createElement("canvas");
  ((e.width = 256), (e.height = 256));
  let s = e.getContext("2d"),
    n = 7,
    i = () => (n = (n * 16807) % 2147483647) / 2147483647;
  for (let r = 0; r < 70; r++) {
    let l = 6 + i() * 244,
      c = 256 * (0.45 + 0.53 * i()),
      h = (i() - 0.5) * 70,
      f = 2.2 + i() * 3.2,
      u = 0.45 + 0.55 * i(),
      d = i() < 0.18 ? 0.4 + 0.6 * i() : 0,
      p = [0.3 + 0.25 * d, 0.42 + 0.08 * d, 0.12 + 0.08 * d].map((x) =>
        Math.round(255 * x * u),
      ),
      m = l + h,
      g = 256 - c,
      b = l + h * 0.25,
      v = 256 - c * 0.55;
    ((s.fillStyle = `rgb(${p[0]},${p[1]},${p[2]})`),
      s.beginPath(),
      s.moveTo(l - f / 2, 256),
      s.quadraticCurveTo(b - f * 0.4, v, m, g),
      s.quadraticCurveTo(b + f * 0.4, v, l + f / 2, 256),
      s.closePath(),
      s.fill());
  }
  let a = new Sn(e);
  return (
    (a.colorSpace = Nn),
    (a.flipY = !1),
    (a.generateMipmaps = !0),
    (a.minFilter = ma),
    (a.anisotropy = 4),
    (a.wrapS = a.wrapT = so),
    a
  );
}
