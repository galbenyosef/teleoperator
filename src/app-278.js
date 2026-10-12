// app 278 — math
// Lines 137107-137371 of readable/app.pretty.js (statement-aligned).
function sI(i, { carve: t = null, far: e = null, regions: s = null } = {}) {
  let n = new Ce(),
    o = new ke();
  ((o.name = "DistantLand"), e && $bt(n, e, s));
  for (let [h, f] of Object.entries(jbt)) {
    if (e && h !== "ybi") continue;
    let u = f.bumps.map(([w, z, _, R, T, E]) => {
        let [A, C] = Gi(w, z);
        return [A, C, _, R, T, Math.cos(E), Math.sin(E)];
      }),
      d = (w, z) => {
        let _ = -9;
        for (let [R, T, E, A, C, P, I] of u) {
          let L = w - R,
            F = z - T,
            N = (L * P + F * I) / A,
            B = (-L * I + F * P) / C;
          _ += (E + 9) * Math.exp(-0.5 * (N * N + B * B));
        }
        return t ? Math.max(-9, t(w, z, _)) : _;
      },
      [p, m] = Gi(f.box[0], f.box[1]),
      [g, b] = Gi(f.box[2], f.box[3]),
      x = f.cell,
      v = Math.ceil((g - p) / x),
      y = Math.ceil((m - b) / x),
      M = n.v;
    for (let w = 0; w <= y; w++)
      for (let z = 0; z <= v; z++) {
        let _ = p + z * x,
          R = b + w * x,
          T = d(_, R),
          E = 2,
          A = -(d(_ + E, R) - d(_ - E, R)) / (2 * E),
          C = -(d(_, R + E) - d(_, R - E)) / (2 * E),
          P = Math.hypot(A, 1, C);
        n.vert(
          _,
          T,
          R,
          A / P,
          1 / P,
          C / P,
          _,
          R,
          Vbt[f.colour](
            T,
            Tu(Math.floor(_ / 90), Math.floor(R / 90)) * 0.6 +
              Tu(Math.floor(_ / 230), Math.floor(R / 230)) * 0.4,
          ),
        );
      }
    let S = n.p.a;
    for (let w = 0; w < y; w++)
      for (let z = 0; z < v; z++) {
        let _ = M + w * (v + 1) + z,
          R = _ + 1,
          T = _ + v + 2,
          E = _ + v + 1;
        Math.max(S[_ * 3 + 1], S[R * 3 + 1], S[T * 3 + 1], S[E * 3 + 1]) < -2 ||
          (n.tri(_, T, R), n.tri(_, E, T));
      }
  }
  let a = new _e(n.geometry(), i.distant || i.terrain || i.walk);
  ((a.name = "distant_land"),
    (a.castShadow = !1),
    (a.receiveShadow = !0),
    (a.matrixAutoUpdate = !1),
    a.updateMatrix(),
    o.add(a));
  let r = new Ce(),
    l = (h, f, u, d, p, m, g, b) => {
      let [x, v] = Gi(h, f),
        y = Math.cos(g),
        M = Math.sin(g),
        S = (z, _) => [x + z * y - _ * M, v + z * M + _ * y],
        w = [
          S(-u / 2, -d / 2),
          S(u / 2, -d / 2),
          S(u / 2, d / 2),
          S(-u / 2, d / 2),
        ];
      for (let z = 0; z < 4; z++) {
        let _ = w[z],
          R = w[(z + 1) % 4];
        (r.wall(R[0], R[1], _[0], _[1], p, p, m, m, b),
          r.wall(_[0], _[1], R[0], R[1], p, p, m, m, b));
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
    let [h, f] = Gi(-122.3705, 37.8235),
      u = new Ce(),
      d = 900,
      p = 1500,
      m = Math.cos(0.45),
      g = Math.sin(0.45),
      b = (v, y) => [h + v * m - y * g, f + v * g + y * m],
      x = [
        b(-d / 2, -p / 2),
        b(d / 2, -p / 2),
        b(d / 2, p / 2),
        b(-d / 2, p / 2),
      ];
    (r.quad(
      [x[0][0], 3, x[0][1]],
      [x[3][0], 3, x[3][1]],
      [x[2][0], 3, x[2][1]],
      [x[1][0], 3, x[1][1]],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0.3, 0.3, 0.28, 7.5 / 16],
      [0, 1, 0],
    ),
      r.quad(
        [x[0][0], 3, x[0][1]],
        [x[1][0], 3, x[1][1]],
        [x[2][0], 3, x[2][1]],
        [x[3][0], 3, x[3][1]],
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        [0.3, 0.3, 0.28, 7.5 / 16],
        [0, 1, 0],
      ));
    for (let v = 0; v < 14; v++) {
      let y = (Tu(v, 1) - 0.5) * d * 0.8,
        M = (Tu(v, 2) - 0.5) * p * 0.8,
        [S, w] = b(y, M),
        [z, _] = [-122.3935 + S / 87990, 37.79553 - w / 111050];
      l(
        z,
        _,
        40 + 80 * Tu(v, 3),
        30 + 60 * Tu(v, 4),
        3,
        10 + 18 * Tu(v, 5),
        0.45,
        [0.8, 0.78, 0.72, 1.5 / 16],
      );
    }
  }
  let c = new _e(r.geometry(), i.facade);
  return (
    (c.name = "distant_buildings"),
    (c.castShadow = !1),
    (c.matrixAutoUpdate = !1),
    c.updateMatrix(),
    o.add(c),
    o
  );
}
var sJ = {
    1: [0.075, 0.13, 0.04, 0],
    2: [0.03, 0.045, 0.022, 0.25],
    3: [0.42, 0.38, 0.3, 0.5],
    4: [0.025, 0.04, 0.05, 0.25],
  },
  Xbt = [0.1, 0.095, 0.08, 0.25],
  Kbt = [0.085, 0.1, 0.05, 0.75],
  nI = [0.36, 0.35, 0.33, 1],
  nJ = (i, t) => {
    let e = Math.sin(i * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  },
  Ybt = (i, t) =>
    nJ(Math.floor(i / 90), Math.floor(t / 90)) * 0.6 +
    nJ(Math.floor(i / 230), Math.floor(t / 230)) * 0.4,
  Jbt = [0.14, 0.14, 0.145, 1];
function iI(i, t, e, s, n, o = null, a = null, r = !1) {
  let l = i.cover[e * i.nx + t];
  if (l & 16) return o && o(s, n) >= 0 ? nI : Jbt;
  if (o && !(l & 8) && o(s, n) >= 0) return nI;
  if (((l &= 15), i.key && l === 2)) {
    let c = a || [0, 1, 0];
    return _w(s, i.h[e * i.nx + t], n, c[0], c[1], c[2], Ybt(s, n));
  }
  return l & 8
    ? l === 11
      ? sJ[3]
      : Xbt
    : l
      ? sJ[l]
      : nm.has(Ai(s, n))
        ? nI
        : Kbt;
}
function Zbt(i, t, e, s) {
  if (s !== 4) {
    let l = i.h[e * i.nx + t],
      c = i.holes;
    for (let h = Math.max(0, e - s); h <= Math.min(i.nz - 1, e + s); h++)
      for (let f = Math.max(0, t - s); f <= Math.min(i.nx - 1, t + s); f++) {
        let u = h * i.nx + f;
        if (i.cover[u] & 48 || (c && c.has(u))) {
          let d = i.h[u];
          d < l && (l = d);
        }
      }
    return l;
  }
  let n = i._cB;
  if (!n) {
    let l = Math.ceil(i.nx / 4) + 1,
      c = Math.ceil(i.nz / 4) + 1,
      h = new Float32Array(l * c).fill(1 / 0),
      f = i.h,
      u = i.cover,
      d = i.nx,
      p = (m, g, b) => {
        for (let x of g % 4 === 0 && g > 0
          ? [g / 4 - 1, g / 4]
          : [Math.floor(g / 4)])
          for (let v of m % 4 === 0 && m > 0
            ? [m / 4 - 1, m / 4]
            : [Math.floor(m / 4)]) {
            let y = x * l + v;
            b < h[y] && (h[y] = b);
          }
      };
    for (let m = 0; m < i.nz; m++)
      for (let g = 0; g < d; g++) {
        let b = m * d + g;
        u[b] & 48 && p(g, m, f[b]);
      }
    if (i.holes) for (let m of i.holes) p(m % d, Math.floor(m / d), f[m]);
    n = i._cB = { M: h, bx: l, bz: c };
  }
  let o = i.h[e * i.nx + t],
    a = Math.floor(t / 4),
    r = Math.floor(e / 4);
  for (let l of [r - 1, r])
    for (let c of [a - 1, a]) {
      if (c < 0 || l < 0 || c >= n.bx || l >= n.bz) continue;
      let h = n.M[l * n.bx + c];
      h < o && (o = h);
    }
  return o;
}
