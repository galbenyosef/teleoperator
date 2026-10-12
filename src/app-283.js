// app 283 — math
// Lines 138553-138870 of readable/app.pretty.js (statement-aligned).
async function lI(i, t, e, s, n = 4) {
  let o = e.species,
    a = new Map(),
    r = performance.now(),
    l = (R) =>
      o[R] ? R : /palm/.test(R) ? (/^f|^w/.test(R) ? "fpalm" : "palm") : null,
    c = performance.now(),
    h = 0;
  for (let R = 0; R < i.length; R++) {
    let T = i[R];
    if (
      ((R & 2047) === 0 &&
        performance.now() - c > n &&
        ((h += performance.now() - c),
        await new Promise((I) => setTimeout(I, 16)),
        (c = performance.now())),
      T.kind !== "tree" && !/palm/.test(T.kind))
    )
      continue;
    let E = t(T);
    if (!E) continue;
    let A = l(E.split("~")[0]);
    if (!A) continue;
    let C = Math.floor(T.x / xx) + "," + Math.floor(T.z / xx),
      P = a.get(C);
    (P || a.set(C, (P = [])), P.push([T, o[A]]));
  }
  let f = pJ(e.cols, e.rows),
    u = e.rows > 4 ? pJ(e.cols, e.rows, [2]) : null,
    d = new ke();
  d.name = "FarTrees";
  let p = new ye(),
    m = new wn(),
    g = new Ii(),
    b = new xt(),
    x = new xt(),
    v = new $t(),
    y = [],
    M = performance.now(),
    S = h + performance.now() - c;
  for (let [R, T] of a) {
    performance.now() - M > n &&
      ((S += performance.now() - M),
      await new Promise((B) => setTimeout(B, 16)),
      (M = performance.now()));
    let E = new zn(f, s, T.length),
      A = new Float32Array(T.length * 16),
      C = new Float32Array(T.length * 2),
      P = u && new zn(u, s, T.length),
      I = u && new Float32Array(T.length * 16);
    T.forEach(([B, H], O) => {
      let D = H.w * (B.scale || 1),
        U = (B.y ?? 0) + H.y0 * (B.scale || 1);
      (g.set(0, B.rot || 0, 0, "YXZ"),
        m.setFromEuler(g),
        b.set(D, D, D),
        x.set(B.x, U, B.z),
        p.compose(x, m, b).toArray(A, O * 16),
        (C[O * 2] = B.x),
        (C[O * 2 + 1] = B.z),
        P &&
          ((x.y = U + (H.yt ?? 0.5) * D),
          p.compose(x, m, b).toArray(I, O * 16)),
        v.setRGB(
          0.9 + 0.2 * dJ(B.x, B.z, 3),
          0.92 + 0.16 * dJ(B.x, B.z, 4),
          (H.k * 3 + 0.5) / 64,
        ),
        E.setColorAt(O, v),
        P?.setColorAt(O, v));
    });
    let [L, F] = R.split(",").map(Number),
      N = {
        im: E,
        M: A,
        P: C,
        c: [(L + 0.5) * xx, (F + 0.5) * xx],
        hid: null,
        ims: [[E, A]],
      };
    P && N.ims.push([P, I]);
    for (let [B, H] of N.ims)
      (B.instanceMatrix.array.set(H),
        (B.instanceMatrix.needsUpdate = !0),
        (B.instanceColor.needsUpdate = !0),
        B.computeBoundingSphere(),
        (B.castShadow = !1),
        (B.receiveShadow = !0),
        (B.matrixAutoUpdate = !1),
        B.updateMatrix(),
        (B.name = (B === E ? "far_" : "fartop_") + R),
        d.add(B));
    y.push(N);
  }
  let w = new Float32Array(16),
    z = Mw[0] - 15,
    _ = (R, T) => {
      for (let E of y) {
        let A = Math.hypot(E.c[0] - R, E.c[1] - T),
          C = A < ixt && A + xx * 0.71 > z;
        for (let [L] of E.ims) L.visible = C;
        if (!C) continue;
        let P = A - xx * 0.71 < z;
        if (!P && !E.hid) continue;
        let I = !1;
        E.hid ||= new Uint8Array(E.P.length / 2);
        for (let L = 0; L < E.hid.length; L++) {
          let F =
            P && Math.hypot(E.P[L * 2] - R, E.P[L * 2 + 1] - T) < z ? 1 : 0;
          if (F !== E.hid[L]) {
            E.hid[L] = F;
            for (let [N, B] of E.ims)
              N.instanceMatrix.array.set(
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
      cull: _,
      ms: Math.round(S),
      trees: y.reduce((R, T) => R + T.P.length / 2, 0),
      chunks: y.length,
    }),
    d
  );
}
as();
var pp = 1.6,
  vx = 46,
  y_ = 8e3,
  mJ = [28, 44],
  Yo = (i, t, e) => {
    let s = Math.sin(i * 12.9898 + t * 78.233 + e * 17.17) * 43758.5453;
    return s - Math.floor(s);
  },
  hI = (i, t) => {
    let e = Math.floor(i),
      s = Math.floor(t),
      n = i - e,
      o = t - s,
      a = (f) => f * f * (3 - 2 * f),
      r = Yo(e, s, 1),
      l = Yo(e + 1, s, 1),
      c = Yo(e, s + 1, 1),
      h = Yo(e + 1, s + 1, 1);
    return (
      r + (l - r) * a(n) + (c + (h - c) * a(n) - (r + (l - r) * a(n))) * a(o)
    );
  },
  oxt = up(
    $L.replace(
      "return vec4f(c, a);",
      `{ let cq = F.vpu * vec4f(wp, 1.0); let pq = floor((cq.xy / cq.w * 0.5 + 0.5) / F.screen.xy);
    let nf = fract(52.9829189 * fract(dot(pq + 5.588238 * F.sunB.w, vec2f(0.06711056, 0.00583715))));
    a *= step(smoothstep(${mJ[0].toFixed(1)}, ${mJ[1].toFixed(1)}, dist), nf); }
  return vec4f(c, a);`,
    ),
  );
function bJ(i, t) {
  let e = Sw(t);
  ((e.userData = { ...t.userData, mbAlbedo: oxt, mbWind: 2.04 }),
    (e.name = "sfGrass"));
  let s = pm("clump", 77)[1][0].geo,
    n = new zn(s, e, y_);
  ((n.count = 0),
    (n.frustumCulled = !1),
    (n.castShadow = !1),
    (n.receiveShadow = !0),
    (n.name = "sfGrassField"),
    (n.userData.mbReflR = 1));
  let o = new ye(),
    a = new wn(),
    r = new Ii(),
    l = new xt(),
    c = new xt(),
    h = new $t();
  n.setColorAt(0, h.setRGB(1, 1, 1));
  let f = (p) => (p - dm.clump + 0.5) / 16,
    u = null;
  return {
    mesh: n,
    update: (p, m, g = !1) => {
      if (!g && u && Math.hypot(p - u[0], m - u[1]) < 10) return;
      u = [p, m];
      let b = 0,
        x = Math.floor((p - vx) / pp),
        v = Math.floor((p + vx) / pp),
        y = Math.floor((m - vx) / pp),
        M = Math.floor((m + vx) / pp);
      for (let S = y; S <= M && b < y_; S++)
        for (let w = x; w <= v && b < y_; w++) {
          let z = (w + Yo(w, S, 2)) * pp,
            _ = (S + Yo(w, S, 3)) * pp;
          if ((z - p) ** 2 + (_ - m) ** 2 > vx * vx) continue;
          let R = i.coverAt(z, _),
            T = R & 15;
          if (R & 8 || (T !== 0 && T !== 1 && T !== 2)) continue;
          if (T === 0 || R & 16) {
            let N = i.terrainAt(z, _);
            if (
              Math.hypot(
                i.terrainAt(z + 0.8, _) - N,
                i.terrainAt(z, _ + 0.8) - N,
              ) /
                0.8 <
                0.45 ||
              T === 1 ||
              (i.clearOfRoads && !i.clearOfRoads(z, _, 1, !0))
            )
              continue;
            T = 2;
          }
          let E = Yo(w, S, 4),
            A = hI(z / 9, _ / 9),
            C,
            P,
            I = 1;
          if (T === 2) {
            if (E > 0.55 + 0.45 * A) continue;
            let N = E < 0.45 * A + 0.2;
            ((C = N ? un.wild : E < 0.62 ? un.clover : un.lawn),
              (P = (N ? 0.55 + 0.45 * A : 0.45) + 0.3 * Yo(w, S, 5)),
              (I = N ? 0.72 : 0.85));
          } else {
            if (T === 1 || E > 0.03 + 0.08 * A) continue;
            ((C = E < 0.02 ? un.clover : un.lawn),
              (P = 0.24 + 0.14 * Yo(w, S, 5)),
              (I = 0.78));
          }
          let L = i.terrainAt(z, _),
            F =
              T === 2
                ? Math.hypot(
                    i.terrainAt(z + 0.8, _) - L,
                    i.terrainAt(z, _ + 0.8) - L,
                  ) / 0.8
                : 0;
          for (
            let N = 0, B = 1 + Math.min(3, Math.floor(F / 0.6));
            N < B && b < y_;
            N++
          ) {
            let H = N ? (Yo(w, S, 10 + N) - 0.5) * pp : 0,
              O = N ? (Yo(w, S, 20 + N) - 0.5) * pp : 0,
              D = N ? 0.75 + 0.5 * Yo(w, S, 30 + N) : 1;
            (r.set(0, Yo(w, S, 6 + N * 7) * 6.283, 0, "YXZ"),
              a.setFromEuler(r),
              l.set(P * D, P * D * (0.8 + 0.4 * Yo(w, S, 7)), P * D),
              c.set(z + H, (N ? i.terrainAt(z + H, _ + O) : L) - 0.02, _ + O),
              o.compose(c, a, l),
              n.setMatrixAt(b, o),
              n.setColorAt(
                b,
                h.setRGB(
                  (0.85 + 0.25 * Yo(w, S, 8)) * I,
                  (0.88 + 0.2 * Yo(w, S, 9)) * I,
                  f(C),
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
var yx = 0.25,
  wx = 15,
  cI = 14e3,
  gJ = [8.5, 13];
function axt() {
  let e = document.createElement("canvas");
  ((e.width = 256), (e.height = 256));
  let s = e.getContext("2d"),
    n = 7,
    o = () => (n = (n * 16807) % 2147483647) / 2147483647;
  for (let r = 0; r < 70; r++) {
    let l = 6 + o() * 244,
      c = 256 * (0.45 + 0.53 * o()),
      h = (o() - 0.5) * 70,
      f = 2.2 + o() * 3.2,
      u = 0.45 + 0.55 * o(),
      d = o() < 0.18 ? 0.4 + 0.6 * o() : 0,
      p = [0.3 + 0.25 * d, 0.42 + 0.08 * d, 0.12 + 0.08 * d].map((v) =>
        Math.round(255 * v * u),
      ),
      m = l + h,
      g = 256 - c,
      b = l + h * 0.25,
      x = 256 - c * 0.55;
    ((s.fillStyle = `rgb(${p[0]},${p[1]},${p[2]})`),
      s.beginPath(),
      s.moveTo(l - f / 2, 256),
      s.quadraticCurveTo(b - f * 0.4, x, m, g),
      s.quadraticCurveTo(b + f * 0.4, x, l + f / 2, 256),
      s.closePath(),
      s.fill());
  }
  let a = new Sn(e);
  return (
    (a.colorSpace = On),
    (a.flipY = !1),
    (a.generateMipmaps = !0),
    (a.minFilter = oa),
    (a.anisotropy = 4),
    (a.wrapS = a.wrapT = $i),
    a
  );
}
