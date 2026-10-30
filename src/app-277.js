// app 277 — math
// Lines 137376-137640 of readable/app.pretty.js (statement-aligned).
function CF(o, { carve: t = null, far: e = null, regions: s = null } = {}) {
  let n = new Be(),
    i = new le();
  ((i.name = "DistantLand"), e && byt(n, e, s));
  for (let [h, f] of Object.entries(myt)) {
    if (e && h !== "ybi") continue;
    let u = f.bumps.map(([w, _, z, A, T, E]) => {
        let [R, P] = ji(w, _);
        return [R, P, z, A, T, Math.cos(E), Math.sin(E)];
      }),
      d = (w, _) => {
        let z = -9;
        for (let [A, T, E, R, P, C, I] of u) {
          let L = w - A,
            F = _ - T,
            O = (L * C + F * I) / R,
            B = (-L * I + F * C) / P;
          z += (E + 9) * Math.exp(-0.5 * (O * O + B * B));
        }
        return t ? Math.max(-9, t(w, _, z)) : z;
      },
      [p, m] = ji(f.box[0], f.box[1]),
      [g, b] = ji(f.box[2], f.box[3]),
      v = f.cell,
      x = Math.ceil((g - p) / v),
      y = Math.ceil((m - b) / v),
      M = n.v;
    for (let w = 0; w <= y; w++)
      for (let _ = 0; _ <= x; _++) {
        let z = p + _ * v,
          A = b + w * v,
          T = d(z, A),
          E = 2,
          R = -(d(z + E, A) - d(z - E, A)) / (2 * E),
          P = -(d(z, A + E) - d(z, A - E)) / (2 * E),
          C = Math.hypot(R, 1, P);
        n.vert(
          z,
          T,
          A,
          R / C,
          1 / C,
          P / C,
          z,
          A,
          gyt[f.colour](
            T,
            cd(Math.floor(z / 90), Math.floor(A / 90)) * 0.6 +
              cd(Math.floor(z / 230), Math.floor(A / 230)) * 0.4,
          ),
        );
      }
    let S = n.p.a;
    for (let w = 0; w < y; w++)
      for (let _ = 0; _ < x; _++) {
        let z = M + w * (x + 1) + _,
          A = z + 1,
          T = z + x + 2,
          E = z + x + 1;
        Math.max(S[z * 3 + 1], S[A * 3 + 1], S[T * 3 + 1], S[E * 3 + 1]) < -2 ||
          (n.tri(z, T, A), n.tri(z, E, T));
      }
  }
  let a = new ye(n.geometry(), o.distant || o.terrain || o.walk);
  ((a.name = "distant_land"),
    (a.castShadow = !1),
    (a.receiveShadow = !0),
    (a.matrixAutoUpdate = !1),
    a.updateMatrix(),
    i.add(a));
  let r = new Be(),
    l = (h, f, u, d, p, m, g, b) => {
      let [v, x] = ji(h, f),
        y = Math.cos(g),
        M = Math.sin(g),
        S = (_, z) => [v + _ * y - z * M, x + _ * M + z * y],
        w = [
          S(-u / 2, -d / 2),
          S(u / 2, -d / 2),
          S(u / 2, d / 2),
          S(-u / 2, d / 2),
        ];
      for (let _ = 0; _ < 4; _++) {
        let z = w[_],
          A = w[(_ + 1) % 4];
        (r.wall(A[0], A[1], z[0], z[1], p, p, m, m, b),
          r.wall(z[0], z[1], A[0], A[1], p, p, m, m, b));
      }
      (r.quad(
        [w[0][0], m, w[0][1]],
        [w[3][0], m, w[3][1]],
        [w[2][0], m, w[2][1]],
        [w[1][0], m, w[1][1]],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        b,
        [0, 1, 0],
      ),
        r.quad(
          [w[0][0], m, w[0][1]],
          [w[1][0], m, w[1][1]],
          [w[2][0], m, w[2][1]],
          [w[3][0], m, w[3][1]],
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          b,
          [0, 1, 0],
        ));
    };
  {
    let [h, f] = ji(-122.3705, 37.8235),
      u = new Be(),
      d = 900,
      p = 1500,
      m = Math.cos(0.45),
      g = Math.sin(0.45),
      b = (x, y) => [h + x * m - y * g, f + x * g + y * m],
      v = [
        b(-d / 2, -p / 2),
        b(d / 2, -p / 2),
        b(d / 2, p / 2),
        b(-d / 2, p / 2),
      ];
    (r.quad(
      [v[0][0], 3, v[0][1]],
      [v[3][0], 3, v[3][1]],
      [v[2][0], 3, v[2][1]],
      [v[1][0], 3, v[1][1]],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0.3, 0.3, 0.28, 7.5 / 16],
      [0, 1, 0],
    ),
      r.quad(
        [v[0][0], 3, v[0][1]],
        [v[1][0], 3, v[1][1]],
        [v[2][0], 3, v[2][1]],
        [v[3][0], 3, v[3][1]],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        [0.3, 0.3, 0.28, 7.5 / 16],
        [0, 1, 0],
      ));
    for (let x = 0; x < 14; x++) {
      let y = (cd(x, 1) - 0.5) * d * 0.8,
        M = (cd(x, 2) - 0.5) * p * 0.8,
        [S, w] = b(y, M),
        [_, z] = [-122.3935 + S / 87990, 37.79553 - w / 111050];
      l(
        _,
        z,
        40 + 80 * cd(x, 3),
        30 + 60 * cd(x, 4),
        3,
        10 + 18 * cd(x, 5),
        0.45,
        [0.8, 0.78, 0.72, 1.5 / 16],
      );
    }
  }
  let c = new ye(r.geometry(), o.facade);
  return (
    (c.name = "distant_buildings"),
    (c.castShadow = !1),
    (c.matrixAutoUpdate = !1),
    c.updateMatrix(),
    i.add(c),
    i
  );
}
var oQ = {
    1: [0.075, 0.13, 0.04, 0],
    2: [0.03, 0.045, 0.022, 0.25],
    3: [0.42, 0.38, 0.3, 0.5],
    4: [0.025, 0.04, 0.05, 0.25],
  },
  xyt = [0.1, 0.095, 0.08, 0.25],
  vyt = [0.085, 0.1, 0.05, 0.75],
  LF = [0.36, 0.35, 0.33, 1],
  aQ = (o, t) => {
    let e = Math.sin(o * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  },
  yyt = (o, t) =>
    aQ(Math.floor(o / 90), Math.floor(t / 90)) * 0.6 +
    aQ(Math.floor(o / 230), Math.floor(t / 230)) * 0.4,
  wyt = [0.14, 0.14, 0.145, 1];
function IF(o, t, e, s, n, i = null, a = null, r = !1) {
  let l = o.cover[e * o.nx + t];
  if (l & 16) return i && i(s, n) >= 0 ? LF : wyt;
  if (i && !(l & 8) && i(s, n) >= 0) return LF;
  if (((l &= 15), o.key && l === 2)) {
    let c = a || [0, 1, 0];
    return yM(s, o.h[e * o.nx + t], n, c[0], c[1], c[2], yyt(s, n));
  }
  return l & 8
    ? l === 11
      ? oQ[3]
      : xyt
    : l
      ? oQ[l]
      : jm.has(Di(s, n))
        ? LF
        : vyt;
}
function Myt(o, t, e, s) {
  if (s !== 4) {
    let l = o.h[e * o.nx + t],
      c = o.holes;
    for (let h = Math.max(0, e - s); h <= Math.min(o.nz - 1, e + s); h++)
      for (let f = Math.max(0, t - s); f <= Math.min(o.nx - 1, t + s); f++) {
        let u = h * o.nx + f;
        if (o.cover[u] & 48 || (c && c.has(u))) {
          let d = o.h[u];
          d < l && (l = d);
        }
      }
    return l;
  }
  let n = o._cB;
  if (!n) {
    let l = Math.ceil(o.nx / 4) + 1,
      c = Math.ceil(o.nz / 4) + 1,
      h = new Float32Array(l * c).fill(1 / 0),
      f = o.h,
      u = o.cover,
      d = o.nx,
      p = (m, g, b) => {
        for (let v of g % 4 === 0 && g > 0
          ? [g / 4 - 1, g / 4]
          : [Math.floor(g / 4)])
          for (let x of m % 4 === 0 && m > 0
            ? [m / 4 - 1, m / 4]
            : [Math.floor(m / 4)]) {
            let y = v * l + x;
            b < h[y] && (h[y] = b);
          }
      };
    for (let m = 0; m < o.nz; m++)
      for (let g = 0; g < d; g++) {
        let b = m * d + g;
        u[b] & 48 && p(g, m, f[b]);
      }
    if (o.holes) for (let m of o.holes) p(m % d, Math.floor(m / d), f[m]);
    n = o._cB = { M: h, bx: l, bz: c };
  }
  let i = o.h[e * o.nx + t],
    a = Math.floor(t / 4),
    r = Math.floor(e / 4);
  for (let l of [r - 1, r])
    for (let c of [a - 1, a]) {
      if (c < 0 || l < 0 || c >= n.bx || l >= n.bz) continue;
      let h = n.M[l * n.bx + c];
      h < i && (i = h);
    }
  return i;
}
