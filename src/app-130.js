// app 130 — math
// Lines 88464-88806 of readable/app.pretty.js (statement-aligned).
function Cj() {
  let o = new Map(),
    t = !!globalThis.SF_LITE && Mp(),
    e = t && !/[?&]farhouses\b/.test(location.search);
  return {
    at(s, n) {
      let i = Math.floor(s / nx) + "," + Math.floor(n / nx),
        a = o.get(i);
      return (
        a ||
          o.set(
            i,
            (a = {
              hi: t ? _j : new Be(),
              lo: e ? _j : new Be(),
              x: (Math.floor(s / nx) + 0.5) * nx,
              z: (Math.floor(n / nx) + 0.5) * nx,
            }),
          ),
        a
      );
    },
    meshes(s, n, i) {
      let a = 0;
      for (let r of o.values()) {
        if ((t ? r.lo : r.hi).empty) continue;
        let l = new nm();
        ((l.name = i + "_lod"), l.position.set(r.x, 0, r.z));
        for (let [c, h] of t
          ? [[r.lo, 0]]
          : [
              [r.hi, 0],
              [r.lo, A1t],
            ]) {
          if (c.empty) continue;
          let f = new ye(c.geometry(), n);
          ((f.name = i),
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
function lC(o, t, e = Rj) {
  let s = new Be(),
    n = new Be(),
    i = new Be();
  {
    let v = Math.ceil((e.X1 - e.X0) / 50),
      x = Math.ceil((e.Z1 - e.Z0) / 50),
      y = [];
    for (let w = 0; w <= x; w++) {
      let _ = e.Z1 - ((e.Z1 - e.Z0) * w) / x,
        z = [];
      for (let A = 0; A <= v; A++) {
        let T = e.X0 + ((e.X1 - e.X0) * A) / v;
        z.push([T, sx(T, _, e), _]);
      }
      y.push(z);
    }
    (bf(
      n,
      y,
      (w, _) => {
        let [z, A, T] = y[w][_],
          E = js(Math.floor(z / 70), Math.floor(T / 70), 5),
          R = js(Math.floor(z / 23), Math.floor(T / 23), 8),
          P = Math.max(
            Math.exp(
              -0.5 *
                (((z - e.PEAKS[2][0]) / 380) ** 2 +
                  ((T - e.PEAKS[2][1]) / 330) ** 2),
            ),
            Math.exp(
              -0.5 *
                (((z - e.PEAKS[3][0]) / 330) ** 2 +
                  ((T - e.PEAKS[3][1]) / 330) ** 2),
            ),
          );
        return A > 150 && P > 0.45
          ? Lt(Ct.leaf, 0.03 + 0.01 * R, 0.05 + 0.012 * R, 0.025)
          : rC(z, T, e)
            ? R < 0.15
              ? Lt(Ct.leaf, 0.06, 0.08, 0.04)
              : Lt(Ct.stone, 0.24 + 0.05 * E, 0.2 + 0.04 * E, 0.12 + 0.02 * R)
            : A > 175
              ? Lt(Ct.stone, 0.2 + 0.05 * E, 0.16 + 0.04 * E, 0.09 + 0.02 * R)
              : A > 140
                ? E < 0.5
                  ? Lt(Ct.leaf, 0.05, 0.07, 0.03)
                  : Lt(Ct.stone, 0.22, 0.2, 0.15)
                : E < 0.1
                  ? Lt(Ct.leaf, 0.06, 0.09, 0.04)
                  : Lt(
                      Ct.stone,
                      0.16 + 0.06 * R,
                      0.155 + 0.05 * R,
                      0.15 + 0.045 * R,
                    );
      },
      (w, _) => [y[w][_][0], y[w][_][2]],
    ),
      Aj(o, (w) => {
        let _ = Cj(),
          z = 120,
          A = 80;
        for (let T = Math.floor(e.Z0 / A); T * A < e.Z1 - 600; T++)
          for (let E = Math.floor((e.X0 + 300) / z); E * z < e.X1 - 300; E++) {
            let R = E * z + z / 2,
              P = T * A + A / 2;
            if (e.thin && P > e.Z0 + 2e3 && js(E, T, 92) < 0.6) continue;
            let C = sx(R, P, e);
            if (!(
              C > 150 ||
              C < 6 ||
              Math.hypot(R - e.SX, P - e.SZ) < 200 ||
              js(E, T, 91) < 0.06 ||
              rC(R, P, e)
            ))
              for (let I of [0, 1]) {
                let L = T * A + (I ? A - 6 - 22 : 6),
                  F = L + 22;
                for (let O = E * z + 6; O < E * z + z - 10;) {
                  let B = Math.min(14 + 16 * js(O, L, 3), E * z + z - 6 - O),
                    H = O + B / 2,
                    N = (L + F) / 2,
                    D = sx(H, N, e);
                  if (D > 160 || rC(H, N, e) || e.built?.(O, L, O + B, F)) {
                    O += B;
                    continue;
                  }
                  let U = xw((e.Z0 + 1400 - N) / 900),
                    G =
                      js(O, L, 9) < 0.12 + 0.3 * U
                        ? 5 + 8 * js(O, L, 10) + 5 * U
                        : 0,
                    W = 7 + 5 * js(O, L, 5) + G;
                  (Pj(
                    _.at(O, L),
                    O,
                    O + B,
                    L,
                    F,
                    I ? 1 : -1,
                    (V, $) =>
                      Math.min(
                        sx(V, (L + F) / 2, e),
                        sx($, (L + F) / 2, e),
                        D + 1,
                      ),
                    W,
                    E * 31 + T,
                  ),
                    (O += B));
                }
              }
          }
        _.meshes(w, t.mid, "TwinPeaksHouses");
      }));
  }
  let a = (e.towerY ?? sx(e.SX, e.SZ, e)) - 1,
    r = 298,
    l = (b) =>
      b <= 190
        ? 38 - 29 * Math.pow(b / 190, 0.85)
        : b <= 268
          ? 9 + (5 * (b - 190)) / 78
          : 14,
    c = Lt(Ct.gloss, 0.62, 0.07, 0.03),
    h = Lt(Ct.gloss, 0.78, 0.78, 0.76),
    f = (b) => (Math.floor(b / (r / 7)) % 2 === 0 ? c : h),
    u = [
      Math.PI / 2,
      Math.PI / 2 + (2 * Math.PI) / 3,
      Math.PI / 2 + (4 * Math.PI) / 3,
    ].map((b) => b + 0.35),
    d = (b, v) => [
      e.SX + Math.cos(u[b]) * l(v),
      a + v,
      e.SZ + Math.sin(u[b]) * l(v),
    ],
    p = [0];
  for (let b = 10; b < 268; b += 10) p.push(b);
  for (let b = 1; b < 7; b++) p.push((b * r) / 7);
  (p.push(190, 268), p.sort((b, v) => b - v));
  let m = [...new Set(p.map((b) => Math.round(b * 10) / 10))].filter(
    (b) => b <= 268,
  );
  for (let b = 0; b < 3; b++)
    for (let v = 0; v + 1 < m.length; v++) {
      let x = m[v],
        y = m[v + 1];
      Ce(
        s,
        d(b, x),
        d(b, y),
        [4.2 - (1.4 * x) / 268, 4.2 - (1.4 * y) / 268],
        f((x + y) / 2),
        4,
      );
    }
  for (let b of [70, 128, 190, 232, 250, 268]) {
    let v = f(b),
      x = b >= 250 ? 2.4 : 2;
    for (let y = 0; y < 3; y++)
      Ce(s, d(y, b), d((y + 1) % 3, b), x * (1 - 0.04 * y), v, 4);
    if (b >= 250)
      for (let y = 0; y < 3; y++) {
        let M = d(y, b),
          S = u[y],
          w = [M[0] + Math.cos(S) * 9, M[1], M[2] + Math.sin(S) * 9];
        (Ce(s, M, w, 2, v, 4),
          Ce(s, w, [w[0], w[1] + 18, w[2]], 1.1, f(b + 30), 4));
      }
  }
  let g = wn(1, 0.04, 0.02);
  for (let b = 0; b < 3; b++) {
    let v = d(b, 268),
      x = [v[0], a + r, v[2]];
    (Ce(s, v, [v[0], a + r - r / 14, v[2]], 2.2, f(270), 4),
      Ce(s, [v[0], a + r - r / 14, v[2]], x, 1.6, f(r - 1), 4));
    for (let y of [r, 268, 190, 128, 70]) {
      let M = y === r ? x : d(b, y);
      ss(
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
    let v = d(b, 0);
    ss(
      s,
      v[0] - 4,
      v[1] - 3,
      v[2] - 4,
      v[0] + 4,
      v[1] + 3,
      v[2] + 4,
      Lt(Ct.stone, 0.5, 0.5, 0.48),
    );
  }
  (ss(
    s,
    e.SX - 14,
    a - 3,
    e.SZ - 8,
    e.SX + 14,
    a + 9,
    e.SZ + 8,
    Lt(Ct.stone, 0.55, 0.55, 0.53),
  ),
    vn(o.group, n, t.far, "TwinPeaks", { shadow: !1 }),
    vn(o.group, s, t.far, "SutroTower", { shadow: !1 }));
}
function Lj(o, t, e) {
  let s = (f) => ji(f, 37.7552)[0],
    n = (f) => ji(-122.4528, f)[1],
    i = [
      [s(-122.4477), n(37.7544), 250, 330, 260],
      [s(-122.4474), n(37.752), 245, 300, 250],
      [s(-122.4583), n(37.758), 245, 420, 380],
      [s(-122.454), n(37.7384), 250, 420, 420],
      [s(-122.4528), n(37.7552), 228, 300, 260],
      [s(-122.4435), n(37.748), 150, 700, 600],
      [s(-122.465), n(37.75), 150, 800, 700],
      [s(-122.4155), n(37.7436), 108, 420, 240, 1],
    ],
    a = { ...e.L.bounds, x0: Math.max(e.L.bounds.x0, nc.x1) },
    r = a.z1 - 30,
    l = {
      SX: s(-122.4528),
      SZ: n(37.7552),
      PEAKS: i,
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
          v = 1e9,
          x = -1e9,
          y = -1e9;
        for (let M = m; M < g; M++)
          ((b = Math.min(b, f.pts[M * 2])),
            (x = Math.max(x, f.pts[M * 2])),
            (v = Math.min(v, f.pts[M * 2 + 1])),
            (y = Math.max(y, f.pts[M * 2 + 1])));
        if (!(y < r - 40))
          for (let M = Math.floor(b / d); M <= Math.floor(x / d); M++)
            for (let S = Math.floor(v / d); S <= Math.floor(y / d); S++) {
              let w = M * 100003 + S,
                _ = u.get(w);
              (_ || u.set(w, (_ = [])), _.push([b, v, x, y]));
            }
      }
      l.built = (p, m, g, b) => {
        for (let v = Math.floor((p - 2) / d); v <= Math.floor((g + 2) / d); v++)
          for (
            let x = Math.floor((m - 2) / d);
            x <= Math.floor((b + 2) / d);
            x++
          )
            for (let y of u.get(v * 100003 + x) || [])
              if (y[0] - 2 < g && y[2] + 2 > p && y[1] - 2 < b && y[3] + 2 > m)
                return !0;
        return !1;
      };
    }
  }
  let [c, h] = [s(-122.4528), n(37.7552)];
  (h < a.z1 - 40 && c > a.x0 && (l.towerY = e.L.terrainAt(c, h)), lC(o, t, l));
}
