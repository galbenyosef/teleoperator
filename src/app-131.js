// app 131 — math
// Lines 88196-88538 of readable/app.pretty.js (statement-aligned).
function Rq() {
  let i = new Map(),
    t = !!globalThis.SF_LITE && qd(),
    e = t && !/[?&]farhouses\b/.test(location.search);
  return {
    at(s, n) {
      let o = Math.floor(s / bb) + "," + Math.floor(n / bb),
        a = i.get(o);
      return (
        a ||
          i.set(
            o,
            (a = {
              hi: t ? kq : new Ce(),
              lo: e ? kq : new Ce(),
              x: (Math.floor(s / bb) + 0.5) * bb,
              z: (Math.floor(n / bb) + 0.5) * bb,
            }),
          ),
        a
      );
    },
    meshes(s, n, o) {
      let a = 0;
      for (let r of i.values()) {
        if ((t ? r.lo : r.hi).empty) continue;
        let l = new v1();
        ((l.name = o + "_lod"), l.position.set(r.x, 0, r.z));
        for (let [c, h] of t
          ? [[r.lo, 0]]
          : [
              [r.hi, 0],
              [r.lo, lut],
            ]) {
          if (c.empty) continue;
          let f = new _e(c.geometry(), n);
          ((f.name = o),
            f.position.set(-r.x, 0, -r.z),
            t && (f.geometry.userData.mbDropCpu = !0),
            (f.castShadow = !1),
            (f.receiveShadow = !0),
            (f.userData.mbNoReflect = !0),
            f.updateMatrix(),
            (f.matrixAutoUpdate = !1),
            l.addLevel(f, h));
        }
        (l.updateMatrix(),
          (l.matrixAutoUpdate = !1),
          l.updateMatrixWorld(!0),
          s.add(l),
          a++);
      }
      return a;
    },
  };
}
function P7(i, t, e = Eq) {
  let s = new Ce(),
    n = new Ce(),
    o = new Ce();
  {
    let x = Math.ceil((e.X1 - e.X0) / 50),
      v = Math.ceil((e.Z1 - e.Z0) / 50),
      y = [];
    for (let w = 0; w <= v; w++) {
      let z = e.Z1 - ((e.Z1 - e.Z0) * w) / v,
        _ = [];
      for (let R = 0; R <= x; R++) {
        let T = e.X0 + ((e.X1 - e.X0) * R) / x;
        _.push([T, gb(T, z, e), z]);
      }
      y.push(_);
    }
    (Uh(
      n,
      y,
      (w, z) => {
        let [_, R, T] = y[w][z],
          E = Ws(Math.floor(_ / 70), Math.floor(T / 70), 5),
          A = Ws(Math.floor(_ / 23), Math.floor(T / 23), 8),
          C = Math.max(
            Math.exp(
              -0.5 *
                (((_ - e.PEAKS[2][0]) / 380) ** 2 +
                  ((T - e.PEAKS[2][1]) / 330) ** 2),
            ),
            Math.exp(
              -0.5 *
                (((_ - e.PEAKS[3][0]) / 330) ** 2 +
                  ((T - e.PEAKS[3][1]) / 330) ** 2),
            ),
          );
        return R > 150 && C > 0.45
          ? It(Lt.leaf, 0.03 + 0.01 * A, 0.05 + 0.012 * A, 0.025)
          : R7(_, T, e)
            ? A < 0.15
              ? It(Lt.leaf, 0.06, 0.08, 0.04)
              : It(Lt.stone, 0.24 + 0.05 * E, 0.2 + 0.04 * E, 0.12 + 0.02 * A)
            : R > 175
              ? It(Lt.stone, 0.2 + 0.05 * E, 0.16 + 0.04 * E, 0.09 + 0.02 * A)
              : R > 140
                ? E < 0.5
                  ? It(Lt.leaf, 0.05, 0.07, 0.03)
                  : It(Lt.stone, 0.22, 0.2, 0.15)
                : E < 0.1
                  ? It(Lt.leaf, 0.06, 0.09, 0.04)
                  : It(
                      Lt.stone,
                      0.16 + 0.06 * A,
                      0.155 + 0.05 * A,
                      0.15 + 0.045 * A,
                    );
      },
      (w, z) => [y[w][z][0], y[w][z][2]],
    ),
      Tq(i, (w) => {
        let z = Rq(),
          _ = 120,
          R = 80;
        for (let T = Math.floor(e.Z0 / R); T * R < e.Z1 - 600; T++)
          for (let E = Math.floor((e.X0 + 300) / _); E * _ < e.X1 - 300; E++) {
            let A = E * _ + _ / 2,
              C = T * R + R / 2;
            if (e.thin && C > e.Z0 + 2e3 && Ws(E, T, 92) < 0.6) continue;
            let P = gb(A, C, e);
            if (!(
              P > 150 ||
              P < 6 ||
              Math.hypot(A - e.SX, C - e.SZ) < 200 ||
              Ws(E, T, 91) < 0.06 ||
              R7(A, C, e)
            ))
              for (let I of [0, 1]) {
                let L = T * R + (I ? R - 6 - 22 : 6),
                  F = L + 22;
                for (let N = E * _ + 6; N < E * _ + _ - 10;) {
                  let B = Math.min(14 + 16 * Ws(N, L, 3), E * _ + _ - 6 - N),
                    H = N + B / 2,
                    O = (L + F) / 2,
                    D = gb(H, O, e);
                  if (D > 160 || R7(H, O, e) || e.built?.(N, L, N + B, F)) {
                    N += B;
                    continue;
                  }
                  let U = ky((e.Z0 + 1400 - O) / 900),
                    G =
                      Ws(N, L, 9) < 0.12 + 0.3 * U
                        ? 5 + 8 * Ws(N, L, 10) + 5 * U
                        : 0,
                    q = 7 + 5 * Ws(N, L, 5) + G;
                  (Aq(
                    z.at(N, L),
                    N,
                    N + B,
                    L,
                    F,
                    I ? 1 : -1,
                    (W, V) =>
                      Math.min(
                        gb(W, (L + F) / 2, e),
                        gb(V, (L + F) / 2, e),
                        D + 1,
                      ),
                    q,
                    E * 31 + T,
                  ),
                    (N += B));
                }
              }
          }
        z.meshes(w, t.mid, "TwinPeaksHouses");
      }));
  }
  let a = (e.towerY ?? gb(e.SX, e.SZ, e)) - 1,
    r = 298,
    l = (b) =>
      b <= 190
        ? 38 - 29 * Math.pow(b / 190, 0.85)
        : b <= 268
          ? 9 + (5 * (b - 190)) / 78
          : 14,
    c = It(Lt.gloss, 0.62, 0.07, 0.03),
    h = It(Lt.gloss, 0.78, 0.78, 0.76),
    f = (b) => (Math.floor(b / (r / 7)) % 2 === 0 ? c : h),
    u = [
      Math.PI / 2,
      Math.PI / 2 + (2 * Math.PI) / 3,
      Math.PI / 2 + (4 * Math.PI) / 3,
    ].map((b) => b + 0.35),
    d = (b, x) => [
      e.SX + Math.cos(u[b]) * l(x),
      a + x,
      e.SZ + Math.sin(u[b]) * l(x),
    ],
    p = [0];
  for (let b = 10; b < 268; b += 10) p.push(b);
  for (let b = 1; b < 7; b++) p.push((b * r) / 7);
  (p.push(190, 268), p.sort((b, x) => b - x));
  let m = [...new Set(p.map((b) => Math.round(b * 10) / 10))].filter(
    (b) => b <= 268,
  );
  for (let b = 0; b < 3; b++)
    for (let x = 0; x + 1 < m.length; x++) {
      let v = m[x],
        y = m[x + 1];
      Ae(
        s,
        d(b, v),
        d(b, y),
        [4.2 - (1.4 * v) / 268, 4.2 - (1.4 * y) / 268],
        f((v + y) / 2),
        4,
      );
    }
  for (let b of [70, 128, 190, 232, 250, 268]) {
    let x = f(b),
      v = b >= 250 ? 2.4 : 2;
    for (let y = 0; y < 3; y++)
      Ae(s, d(y, b), d((y + 1) % 3, b), v * (1 - 0.04 * y), x, 4);
    if (b >= 250)
      for (let y = 0; y < 3; y++) {
        let M = d(y, b),
          S = u[y],
          w = [M[0] + Math.cos(S) * 9, M[1], M[2] + Math.sin(S) * 9];
        (Ae(s, M, w, 2, x, 4),
          Ae(s, w, [w[0], w[1] + 18, w[2]], 1.1, f(b + 30), 4));
      }
  }
  let g = bn(1, 0.04, 0.02);
  for (let b = 0; b < 3; b++) {
    let x = d(b, 268),
      v = [x[0], a + r, x[2]];
    (Ae(s, x, [x[0], a + r - r / 14, x[2]], 2.2, f(270), 4),
      Ae(s, [x[0], a + r - r / 14, x[2]], v, 1.6, f(r - 1), 4));
    for (let y of [r, 268, 190, 128, 70]) {
      let M = y === r ? v : d(b, y);
      Ze(
        s,
        M[0] - 1.8,
        M[1] + 0.2,
        M[2] - 1.8,
        M[0] + 1.8,
        M[1] + 3.8,
        M[2] + 1.8,
        g,
      );
    }
  }
  for (let b = 0; b < 3; b++) {
    let x = d(b, 0);
    Ze(
      s,
      x[0] - 4,
      x[1] - 3,
      x[2] - 4,
      x[0] + 4,
      x[1] + 3,
      x[2] + 4,
      It(Lt.stone, 0.5, 0.5, 0.48),
    );
  }
  (Ze(
    s,
    e.SX - 14,
    a - 3,
    e.SZ - 8,
    e.SX + 14,
    a + 9,
    e.SZ + 8,
    It(Lt.stone, 0.55, 0.55, 0.53),
  ),
    gn(i.group, n, t.far, "TwinPeaks", { shadow: !1 }),
    gn(i.group, s, t.far, "SutroTower", { shadow: !1 }));
}
function Pq(i, t, e) {
  let s = (f) => Gi(f, 37.7552)[0],
    n = (f) => Gi(-122.4528, f)[1],
    o = [
      [s(-122.4477), n(37.7544), 250, 330, 260],
      [s(-122.4474), n(37.752), 245, 300, 250],
      [s(-122.4583), n(37.758), 245, 420, 380],
      [s(-122.454), n(37.7384), 250, 420, 420],
      [s(-122.4528), n(37.7552), 228, 300, 260],
      [s(-122.4435), n(37.748), 150, 700, 600],
      [s(-122.465), n(37.75), 150, 800, 700],
      [s(-122.4155), n(37.7436), 108, 420, 240, 1],
    ],
    a = { ...e.L.bounds, x0: Math.max(e.L.bounds.x0, el.x1) },
    r = a.z1 - 30,
    l = {
      SX: s(-122.4528),
      SZ: n(37.7552),
      PEAKS: o,
      X0: a.x0 + 600,
      X1: a.x0 + 8e3,
      Z0: r,
      Z1: r + 5200,
      edgeH: (f) =>
        e.L.terrainAt(Math.min(a.x1, Math.max(a.x0, f)), a.z1 - 1) - 1.5,
      thin: !0,
    };
  {
    let f = e.D?.bld,
      u = new Map(),
      d = 32;
    if (f) {
      for (let p = 0; p < f.n; p++) {
        let m = f.rStart[f.bRing[p]],
          g = f.rStart[f.bRing[p] + 1],
          b = 1e9,
          x = 1e9,
          v = -1e9,
          y = -1e9;
        for (let M = m; M < g; M++)
          ((b = Math.min(b, f.pts[M * 2])),
            (v = Math.max(v, f.pts[M * 2])),
            (x = Math.min(x, f.pts[M * 2 + 1])),
            (y = Math.max(y, f.pts[M * 2 + 1])));
        if (!(y < r - 40))
          for (let M = Math.floor(b / d); M <= Math.floor(v / d); M++)
            for (let S = Math.floor(x / d); S <= Math.floor(y / d); S++) {
              let w = M * 100003 + S,
                z = u.get(w);
              (z || u.set(w, (z = [])), z.push([b, x, v, y]));
            }
      }
      l.built = (p, m, g, b) => {
        for (let x = Math.floor((p - 2) / d); x <= Math.floor((g + 2) / d); x++)
          for (
            let v = Math.floor((m - 2) / d);
            v <= Math.floor((b + 2) / d);
            v++
          )
            for (let y of u.get(x * 100003 + v) || [])
              if (y[0] - 2 < g && y[2] + 2 > p && y[1] - 2 < b && y[3] + 2 > m)
                return !0;
        return !1;
      };
    }
  }
  let [c, h] = [s(-122.4528), n(37.7552)];
  (h < a.z1 - 40 && c > a.x0 && (l.towerY = e.L.terrainAt(c, h)), P7(i, t, l));
}
