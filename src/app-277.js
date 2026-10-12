// app 277 — math
// Lines 136888-137106 of readable/app.pretty.js (statement-aligned).
var jbt = {
    marin: {
      box: [-122.56, 37.815, -122.44, 37.88],
      cell: 55,
      colour: "marin",
      bumps: [
        [-122.4995, 37.8285, 300, 700, 520, 0.3],
        [-122.4915, 37.8364, 290, 520, 620, 0],
        [-122.487, 37.846, 260, 520, 700, -0.2],
        [-122.525, 37.83, 250, 900, 600, 0.2],
        [-122.51, 37.85, 330, 1100, 900, 0],
        [-122.48, 37.865, 200, 700, 800, 0],
        [-122.47, 37.858, 120, 420, 520, 0],
        [-122.54, 37.823, 150, 600, 360, 0.4],
        [-122.48, 37.835, 170, 330, 450, 0.3],
      ],
    },
    belvedere: {
      box: [-122.48, 37.855, -122.43, 37.885],
      cell: 55,
      colour: "green",
      bumps: [
        [-122.46, 37.87, 160, 500, 650, 0],
        [-122.45, 37.875, 120, 450, 450, 0],
      ],
    },
    angel: {
      box: [-122.45, 37.85, -122.41, 37.875],
      cell: 50,
      colour: "forest",
      bumps: [
        [-122.4318, 37.8621, 245, 700, 650, 0],
        [-122.425, 37.858, 90, 450, 350, 0.5],
        [-122.44, 37.866, 110, 450, 380, 0],
      ],
    },
    ybi: {
      box: [-122.375, 37.803, -122.355, 37.816],
      cell: 15,
      colour: "forest",
      bumps: [
        [-122.364, 37.81, 112, 480, 330, 0.2],
        [-122.37, 37.808, 50, 300, 240, 0],
      ],
    },
  },
  Vbt = {
    marin: (i, t) =>
      t < 0.5
        ? [0.028 + 0.02 * t, 0.034 + 0.016 * t, 0.02, 0]
        : i < 30
          ? [0.07, 0.065, 0.045, 0]
          : [0.1 + 0.05 * t, 0.08 + 0.03 * t, 0.045, 0],
    green: (i, t) =>
      t < 0.6 ? [0.03, 0.042, 0.024, 0] : [0.09, 0.085, 0.06, 0],
    forest: (i, t) =>
      t > 0.85 && i > 40
        ? [0.085, 0.075, 0.045, 0]
        : [0.018 + 0.01 * t, 0.03 + 0.012 * t, 0.018, 0],
    rock: (i, t) =>
      i < 6 ? [0.22, 0.2, 0.17, 0] : [0.1 + 0.05 * t, 0.12, 0.07, 0],
  },
  Tu = (i, t) => {
    let e = Math.sin(i * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  },
  kw = {
    scrub: [0.03, 0.045, 0.022],
    scrubD: [0.022, 0.032, 0.017],
    grass: [0.15, 0.115, 0.055],
    grassL: [0.2, 0.16, 0.08],
    rock: [0.13, 0.12, 0.1],
    wood: [0.018, 0.03, 0.016],
  };
function _w(i, t, e, s, n, o, a) {
  if (t < 2.5) return [0.16, 0.15, 0.13, 0];
  let r =
      (Math.max(0, -o * 0.8 + s * 0.35) / Math.max(0.2, Math.hypot(s, o))) *
      Math.min(1, (1 - n) * 6),
    l = n < 0.72 ? Math.min(1, (0.72 - n) * 4) : 0,
    c = Math.min(
      1,
      r * 1.1 + (a - 0.5) * 0.7 + (t < 40 ? 0.25 : 0) + (t > 200 ? -0.25 : 0),
    );
  c = Math.max(0, c);
  let h = a > 0.7 ? kw.grassL : kw.grass,
    f = a < 0.35 ? kw.scrubD : kw.scrub,
    u = [0, 1, 2].map((d) => h[d] * (1 - c) + f[d] * c);
  if (l > 0 && t < 60)
    for (let d = 0; d < 3; d++)
      u[d] = u[d] * (1 - l * 0.8) + kw.rock[d] * l * 0.8;
  return [u[0], u[1], u[2], 0];
}
function $bt(i, t, e) {
  let { x0: s, z0: n, cell: o, nx: a, nz: r } = t.meta,
    l = t.meta.hScale,
    c = (L, F) =>
      t.h[
        Math.max(0, Math.min(r - 1, F)) * a + Math.max(0, Math.min(a - 1, L))
      ] * l,
    h = (e || []).find((L) => L.key === t.meta.region),
    f = h?.clipBox,
    u = (L, F) => {
      let N = Math.round((L - h.x0) / h.step),
        B = Math.round((F - h.z0) / h.step);
      return h.h[
        Math.max(0, Math.min(h.nz - 1, B)) * h.nx +
          Math.max(0, Math.min(h.nx - 1, N))
      ];
    },
    d = (L, F) =>
      f &&
      L >= f[0] - 0.01 &&
      L <= f[2] + 0.01 &&
      F >= f[1] - 0.01 &&
      F <= f[3] + 0.01,
    p = (L, F) => {
      let N = s + L * o,
        B = n + F * o;
      return d(N, B) ? u(N, B) : c(L, F);
    },
    m = (L) => Math.round((L - s) / o),
    g = (L) => Math.round((L - n) / o),
    b = 48,
    x = f ? Math.max(0, m(f[0]) - b) : 0,
    v = f ? Math.max(0, g(f[1]) - b) : 0,
    y = f ? x + 3 * Math.floor((Math.min(a - 1, m(f[2]) + b) - x) / 3) : -1,
    M = f ? v + 3 * Math.floor((Math.min(r - 1, g(f[3]) + b) - v) / 3) : -1,
    S = f ? m(f[0]) : 0,
    w = f ? m(f[2]) : -1,
    z = f ? g(f[1]) : 0,
    _ = f ? g(f[3]) : -1,
    R = (L, F) =>
      Tu(Math.floor(L / 90), Math.floor(F / 90)) * 0.6 +
      Tu(Math.floor(L / 230), Math.floor(F / 230)) * 0.4,
    T = (L, F, N, B, H, O, D) => {
      let U = Math.floor((N - L) / H),
        G = Math.floor((B - F) / H),
        q = i.v,
        W = new Float32Array((U + 1) * (G + 1));
      for (let V = 0; V <= G; V++)
        for (let Y = 0; Y <= U; Y++) {
          let $ = L + Y * H,
            st = F + V * H,
            Q = s + $ * o,
            j = n + st * o,
            X = p($, st),
            K = H,
            nt = 2 * K * o,
            Z = p($ + K, st) - p($ - K, st),
            et = p($, st + K) - p($, st - K),
            tt = Math.hypot(Z, nt, et),
            it = [-Z / tt, nt / tt, -et / tt];
          ((W[V * (U + 1) + Y] = X),
            i.vert(
              Q,
              X,
              j,
              it[0],
              it[1],
              it[2],
              Q,
              j,
              _w(Q, X, j, it[0], it[1], it[2], R(Q, j)),
            ));
        }
      for (let V = 0; V < G; V++)
        for (let Y = 0; Y < U; Y++) {
          let $ = L + Y * H,
            st = F + V * H;
          if (O($, st, H)) continue;
          let Q = V * (U + 1) + Y,
            j = q + Q,
            X = j + 1,
            K = j + U + 2,
            nt = j + U + 1;
          Math.max(W[Q], W[Q + 1], W[Q + U + 1], W[Q + U + 2]) < -2 ||
            (i.tri(j, K, X), i.tri(j, nt, K));
        }
      if (D) {
        let V = ($, st) => [
            s + (L + $ * H) * o,
            W[st * (U + 1) + $],
            n + (F + st * H) * o,
          ],
          Y = ($) => {
            for (let st = 0; st + 1 < $.length; st++) {
              let Q = V(...$[st]),
                j = V(...$[st + 1]);
              Math.max(Q[1], j[1]) < -2 ||
                i.wall(
                  Q[0],
                  Q[2],
                  j[0],
                  j[2],
                  Q[1] - 15,
                  j[1] - 15,
                  Q[1],
                  j[1],
                  [0.05, 0.05, 0.04, 0],
                  0,
                  0,
                );
            }
          };
        (Y(Array.from({ length: U + 1 }, ($, st) => [U - st, 0])),
          Y(Array.from({ length: U + 1 }, ($, st) => [st, G])),
          Y(Array.from({ length: G + 1 }, ($, st) => [0, st])),
          Y(Array.from({ length: G + 1 }, ($, st) => [U, G - st])));
      }
    },
    E = (L, F, N) => f && L >= S && L + N <= w && F >= z && F + N <= _,
    A = (L, F, N) => f && L >= x && L + N <= y && F >= v && F + N <= M;
  f && T(x, v, y, M, 1, E, !0);
  let C = 3,
    P = x - Math.floor(x / C) * C,
    I = v - Math.floor(v / C) * C;
  T(P, I, a - 1, r - 1, C, (L, F, N) => A(L, F, N), !1);
}
