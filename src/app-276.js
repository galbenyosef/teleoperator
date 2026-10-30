// app 276 — math
// Lines 137157-137375 of readable/app.pretty.js (statement-aligned).
var myt = {
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
  gyt = {
    marin: (o, t) =>
      t < 0.5
        ? [0.028 + 0.02 * t, 0.034 + 0.016 * t, 0.02, 0]
        : o < 30
          ? [0.07, 0.065, 0.045, 0]
          : [0.1 + 0.05 * t, 0.08 + 0.03 * t, 0.045, 0],
    green: (o, t) =>
      t < 0.6 ? [0.03, 0.042, 0.024, 0] : [0.09, 0.085, 0.06, 0],
    forest: (o, t) =>
      t > 0.85 && o > 40
        ? [0.085, 0.075, 0.045, 0]
        : [0.018 + 0.01 * t, 0.03 + 0.012 * t, 0.018, 0],
    rock: (o, t) =>
      o < 6 ? [0.22, 0.2, 0.17, 0] : [0.1 + 0.05 * t, 0.12, 0.07, 0],
  },
  cd = (o, t) => {
    let e = Math.sin(o * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  },
  vM = {
    scrub: [0.03, 0.045, 0.022],
    scrubD: [0.022, 0.032, 0.017],
    grass: [0.15, 0.115, 0.055],
    grassL: [0.2, 0.16, 0.08],
    rock: [0.13, 0.12, 0.1],
    wood: [0.018, 0.03, 0.016],
  };
function yM(o, t, e, s, n, i, a) {
  if (t < 2.5) return [0.16, 0.15, 0.13, 0];
  let r =
      (Math.max(0, -i * 0.8 + s * 0.35) / Math.max(0.2, Math.hypot(s, i))) *
      Math.min(1, (1 - n) * 6),
    l = n < 0.72 ? Math.min(1, (0.72 - n) * 4) : 0,
    c = Math.min(
      1,
      r * 1.1 + (a - 0.5) * 0.7 + (t < 40 ? 0.25 : 0) + (t > 200 ? -0.25 : 0),
    );
  c = Math.max(0, c);
  let h = a > 0.7 ? vM.grassL : vM.grass,
    f = a < 0.35 ? vM.scrubD : vM.scrub,
    u = [0, 1, 2].map((d) => h[d] * (1 - c) + f[d] * c);
  if (l > 0 && t < 60)
    for (let d = 0; d < 3; d++)
      u[d] = u[d] * (1 - l * 0.8) + vM.rock[d] * l * 0.8;
  return [u[0], u[1], u[2], 0];
}
function byt(o, t, e) {
  let { x0: s, z0: n, cell: i, nx: a, nz: r } = t.meta,
    l = t.meta.hScale,
    c = (L, F) =>
      t.h[
        Math.max(0, Math.min(r - 1, F)) * a + Math.max(0, Math.min(a - 1, L))
      ] * l,
    h = (e || []).find((L) => L.key === t.meta.region),
    f = h?.clipBox,
    u = (L, F) => {
      let O = Math.round((L - h.x0) / h.step),
        B = Math.round((F - h.z0) / h.step);
      return h.h[
        Math.max(0, Math.min(h.nz - 1, B)) * h.nx +
          Math.max(0, Math.min(h.nx - 1, O))
      ];
    },
    d = (L, F) =>
      f &&
      L >= f[0] - 0.01 &&
      L <= f[2] + 0.01 &&
      F >= f[1] - 0.01 &&
      F <= f[3] + 0.01,
    p = (L, F) => {
      let O = s + L * i,
        B = n + F * i;
      return d(O, B) ? u(O, B) : c(L, F);
    },
    m = (L) => Math.round((L - s) / i),
    g = (L) => Math.round((L - n) / i),
    b = 48,
    v = f ? Math.max(0, m(f[0]) - b) : 0,
    x = f ? Math.max(0, g(f[1]) - b) : 0,
    y = f ? v + 3 * Math.floor((Math.min(a - 1, m(f[2]) + b) - v) / 3) : -1,
    M = f ? x + 3 * Math.floor((Math.min(r - 1, g(f[3]) + b) - x) / 3) : -1,
    S = f ? m(f[0]) : 0,
    w = f ? m(f[2]) : -1,
    _ = f ? g(f[1]) : 0,
    z = f ? g(f[3]) : -1,
    A = (L, F) =>
      cd(Math.floor(L / 90), Math.floor(F / 90)) * 0.6 +
      cd(Math.floor(L / 230), Math.floor(F / 230)) * 0.4,
    T = (L, F, O, B, H, N, D) => {
      let U = Math.floor((O - L) / H),
        G = Math.floor((B - F) / H),
        W = o.v,
        V = new Float32Array((U + 1) * (G + 1));
      for (let $ = 0; $ <= G; $++)
        for (let J = 0; J <= U; J++) {
          let X = L + J * H,
            tt = F + $ * H,
            Z = s + X * i,
            q = n + tt * i,
            j = p(X, tt),
            K = H,
            nt = 2 * K * i,
            Q = p(X + K, tt) - p(X - K, tt),
            et = p(X, tt + K) - p(X, tt - K),
            st = Math.hypot(Q, nt, et),
            ot = [-Q / st, nt / st, -et / st];
          ((V[$ * (U + 1) + J] = j),
            o.vert(
              Z,
              j,
              q,
              ot[0],
              ot[1],
              ot[2],
              Z,
              q,
              yM(Z, j, q, ot[0], ot[1], ot[2], A(Z, q)),
            ));
        }
      for (let $ = 0; $ < G; $++)
        for (let J = 0; J < U; J++) {
          let X = L + J * H,
            tt = F + $ * H;
          if (N(X, tt, H)) continue;
          let Z = $ * (U + 1) + J,
            q = W + Z,
            j = q + 1,
            K = q + U + 2,
            nt = q + U + 1;
          Math.max(V[Z], V[Z + 1], V[Z + U + 1], V[Z + U + 2]) < -2 ||
            (o.tri(q, K, j), o.tri(q, nt, K));
        }
      if (D) {
        let $ = (X, tt) => [
            s + (L + X * H) * i,
            V[tt * (U + 1) + X],
            n + (F + tt * H) * i,
          ],
          J = (X) => {
            for (let tt = 0; tt + 1 < X.length; tt++) {
              let Z = $(...X[tt]),
                q = $(...X[tt + 1]);
              Math.max(Z[1], q[1]) < -2 ||
                o.wall(
                  Z[0],
                  Z[2],
                  q[0],
                  q[2],
                  Z[1] - 15,
                  q[1] - 15,
                  Z[1],
                  q[1],
                  [0.05, 0.05, 0.04, 0],
                  0,
                  0,
                );
            }
          };
        (J(Array.from({ length: U + 1 }, (X, tt) => [U - tt, 0])),
          J(Array.from({ length: U + 1 }, (X, tt) => [tt, G])),
          J(Array.from({ length: G + 1 }, (X, tt) => [0, tt])),
          J(Array.from({ length: G + 1 }, (X, tt) => [U, G - tt])));
      }
    },
    E = (L, F, O) => f && L >= S && L + O <= w && F >= _ && F + O <= z,
    R = (L, F, O) => f && L >= v && L + O <= y && F >= x && F + O <= M;
  f && T(v, x, y, M, 1, E, !0);
  let P = 3,
    C = v - Math.floor(v / P) * P,
    I = x - Math.floor(x / P) * P;
  T(C, I, a - 1, r - 1, P, (L, F, O) => R(L, F, O), !1);
}
