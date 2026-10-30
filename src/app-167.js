// app 167 — math
// Lines 100661-100978 of readable/app.pretty.js (statement-aligned).
var ez = 1.3,
  Mf = ez + 0.55;
function h2t(o, t, e, s, n, i, a, r, l, c) {
  let h = e.y.length,
    f = (C) => e.pts[(C % h) * 2],
    u = (C) => e.pts[(C % h) * 2 + 1],
    d = (C) => e.y[C % h],
    p = 0,
    m = 0;
  for (let C = 0; C < h; C++) ((p += f(C)), (m += u(C)));
  ((p /= h), (m /= h));
  let g = Cw(n, 3.5),
    b = s.flat,
    v = s.ys;
  for (let C = 0; C < v.length; C++)
    g = Math.min(g, iz(c, b[C * 2], b[C * 2 + 1], v[C], t));
  for (let C of i)
    C.E.elev &&
      c?.probe &&
      (g = Math.min(g, IC(C.E, C.end === "a" ? C.E.s0 : C.E.s1, c)));
  t._dP = g;
  let x = Math.max(
      g,
      ...i
        .filter((C) => C.E.elev)
        .map((C) =>
          c?.probe ? IC(C.E, C.end === "a" ? C.E.s0 : C.E.s1, c) : g,
        ),
    ),
    y = [];
  for (let C = 0; C < h; C++) {
    let I = f(C),
      L = u(C),
      F = f(C + 1),
      O = u(C + 1),
      B = F - I,
      H = O - L,
      N = Math.hypot(B, H);
    if (N < 0.02) continue;
    let D = H / N,
      U = -B / N;
    D * ((I + F) / 2 - p) + U * ((L + O) / 2 - m) < 0 && ((D = -D), (U = -U));
    let G = a(I, L),
      W = a(F, O),
      V = G && G === W ? G : null,
      $ = V ? 0 : r(I, L, F, O, d(C), d(C + 1), D, U) ? 1 : 2;
    y.push({
      ax: I,
      az: L,
      bx: F,
      bz: O,
      ya: d(C),
      yb: d(C + 1),
      nx: D,
      nz: U,
      len: N,
      kind: $,
      mouth: V,
      c: D * I + U * L,
    });
  }
  let M = y.length;
  if (M < 3) return;
  let S = (C, I, L) => {
      let F = Math.max(
        0,
        Math.min(
          1,
          ((I - C.ax) * (C.bx - C.ax) + (L - C.az) * (C.bz - C.az)) /
            (C.len * C.len),
        ),
      );
      return C.ya + (C.yb - C.ya) * F;
    },
    w = (C, I, L) => {
      let F = LC(s.tris, b, v, C, I);
      return F === null ? S(L, C, I) : F;
    },
    _ = (C, I) => C.c - I,
    z = (C, I, L, F, O) => {
      let B = C.nx * L.nz - C.nz * L.nx;
      if (Math.abs(B) < 0.05) return O;
      let H = _(C, I),
        N = _(L, F);
      return [(H * L.nz - C.nz * N) / B, (C.nx * N - H * L.nx) / B];
    },
    A = (C, I) => (C.kind === 2 ? I : 0),
    T = (C, I) => {
      let L = y[C],
        F = y[(C + M - 1) % M],
        O = y[(C + 1) % M],
        B = z(L, I, F, A(F, I), [L.ax - L.nx * I, L.az - L.nz * I]),
        H = z(L, I, O, A(O, I), [L.bx - L.nx * I, L.bz - L.nz * I]),
        N = (D, U, G) =>
          Math.hypot(D[0] - U, D[1] - G) > I + 3
            ? [U - L.nx * I, G - L.nz * I]
            : D;
      return [N(B, L.ax, L.az), N(H, L.bx, L.bz)];
    },
    E = [];
  for (let C = 0; C < h; C++) E.push([f(C), u(C)]);
  let R = (C) => {
    let I = y[C];
    return (
      I.len < Mf ||
      (I.len < 2.5 &&
        y[(C + M - 1) % M].kind === 0 &&
        y[(C + 1) % M].kind === 0)
    );
  };
  for (let [C, I] of y.entries()) {
    if (I.kind !== 2 || R(C)) continue;
    let L = _(I, Mf),
      F = [];
    for (let O = 0; O < E.length; O++) {
      let B = E[O],
        H = E[(O + 1) % E.length],
        N = L - (I.nx * B[0] + I.nz * B[1]),
        D = L - (I.nx * H[0] + I.nz * H[1]);
      if ((N >= 0 && F.push(B), N >= 0 != D >= 0)) {
        let U = N / (N - D);
        F.push([B[0] + (H[0] - B[0]) * U, B[1] + (H[1] - B[1]) * U]);
      }
    }
    if (((E = F), E.length < 3)) break;
  }
  if (o && E.length >= 3) {
    let C = E.map((I) => {
      let L = LC(s.tris, b, v, I[0], I[1]);
      return (L === null ? t.y : L) - g;
    });
    for (let I = 1; I + 1 < E.length; I++)
      sz(
        o,
        [E[0][0], C[0], E[0][1]],
        [E[I][0], C[I], E[I][1]],
        [E[I + 1][0], C[I + 1], E[I + 1][1]],
        Pl,
        -1,
      );
  }
  let P = 0;
  for (let C = 0; C < M; C++) {
    let I = y[C],
      { ax: L, az: F, bx: O, bz: B, ya: H, yb: N, nx: D, nz: U, len: G } = I;
    if (I.kind === 0) {
      if (o && I.mouth.E.elev)
        for (let Z of [1, -1])
          na(
            o,
            [L, H - 0.3, F],
            [O, N - 0.3, B],
            [O, N - x - 0.05, B],
            [L, H - x - 0.05, F],
            [0, 0],
            [G, 0],
            [G, x],
            [0, x],
            bx,
            [D * Z, 0, U * Z],
          );
      continue;
    }
    if (I.kind === 1) {
      if (o) {
        na(
          o,
          [L, H - 0.3, F],
          [O, N - 0.3, B],
          [O, N - g, B],
          [L, H - g, F],
          [0, 0],
          [G, 0],
          [G, g],
          [0, g],
          xx,
          [D, 0, U],
        );
        let Z = [L - D * Mf, F - U * Mf],
          q = [O - D * Mf, B - U * Mf],
          j = w(Z[0], Z[1], I) - g,
          K = w(q[0], q[1], I) - g;
        (sz(o, [L, H - g, F], [O, N - g, B], [q[0], K, q[1]], Pl, -1),
          sz(o, [L, H - g, F], [q[0], K, q[1]], [Z[0], j, Z[1]], Pl, -1));
      }
      continue;
    }
    let [W, V] = T(C, -0.4),
      [$, J] = T(C, ez),
      [X, tt] = T(C, Mf);
    if (o) {
      let Z = S(I, W[0], W[1]),
        q = S(I, V[0], V[1]);
      (na(
        o,
        [O, N, B],
        [L, H, F],
        [L, H + 0.85, F],
        [O, N + 0.85, B],
        [0, 0],
        [G, 0],
        [G, 0.85],
        [0, 0.85],
        Ar,
        [-D, 0, -U],
      ),
        vx(
          o,
          [L, H + 0.85, F],
          [O, N + 0.85, B],
          [V[0], q + 0.85, V[1]],
          [W[0], Z + 0.85, W[1]],
          Ar,
          !0,
        ),
        na(
          o,
          [W[0], Z - 0.35, W[1]],
          [V[0], q - 0.35, V[1]],
          [V[0], q + 0.85, V[1]],
          [W[0], Z + 0.85, W[1]],
          [0, Z - 0.35],
          [G, q - 0.35],
          [G, q + 0.85],
          [0, Z + 0.85],
          xx,
          [D, 0, U],
        ));
      let j = w($[0], $[1], I),
        K = w(J[0], J[1], I),
        nt = w(X[0], X[1], I),
        Q = w(tt[0], tt[1], I);
      na(
        o,
        [W[0], Z - 0.35, W[1]],
        [V[0], q - 0.35, V[1]],
        [J[0], K - 0.35, J[1]],
        [$[0], j - 0.35, $[1]],
        [0, 0],
        [G, 0],
        [G, 1.7],
        [0, 1.7],
        Pl,
        [0, -1, 0],
      );
      let et = Math.hypot(Mf - ez, g - 0.35),
        st = [(D * (g - 0.35)) / et, -(Mf - ez) / et, (U * (g - 0.35)) / et];
      (na(
        o,
        [$[0], j - 0.35, $[1]],
        [J[0], K - 0.35, J[1]],
        [tt[0], Q - g, tt[1]],
        [X[0], nt - g, X[1]],
        [0, 0],
        [G, 0],
        [G, et],
        [0, et],
        Pl,
        st,
      ),
        nl(n) ||
          aX(
            o,
            t,
            P,
            P + G,
            [L + D * 0.2, H, F + U * 0.2],
            [O + D * 0.2, N, B + U * 0.2],
            1,
            D,
            U,
            !1,
          ));
    }
    ((P += G),
      l &&
        G > 0.2 &&
        l.push({
          t: "obb",
          x: (L + O) / 2 + D * 0.2,
          z: (F + B) / 2 + U * 0.2,
          hx: 0.25,
          hz: G / 2 + 0.05,
          c: (B - F) / G,
          s: (O - L) / G,
          y0: Math.min(H, N) - 0.5,
          y1: Math.max(H, N) + 1.2,
          rail: !0,
        }));
  }
}
function sz(o, t, e, s, n, i) {
  let a = (e[2] - t[2]) * (s[0] - t[0]) - (e[0] - t[0]) * (s[2] - t[2]),
    r = a >= 0,
    l = o.v,
    c = [0, i, 0];
  for (let h of r === i > 0 ? [t, e, s] : [t, s, e])
    o.vert(h[0], h[1], h[2], c[0], c[1], c[2], h[0], h[2], n);
  o.tri(l, l + 1, l + 2);
}
function LC(o, t, e, s, n) {
  for (let [i, a, r] of o) {
    let l = t[i * 2],
      c = t[i * 2 + 1],
      h = t[a * 2],
      f = t[a * 2 + 1],
      u = t[r * 2],
      d = t[r * 2 + 1],
      p = (f - d) * (l - u) + (u - h) * (c - d);
    if (Math.abs(p) < 1e-9) continue;
    let m = ((f - d) * (s - u) + (u - h) * (n - d)) / p,
      g = ((d - c) * (s - u) + (l - u) * (n - d)) / p,
      b = 1 - m - g;
    if (m >= -1e-5 && g >= -1e-5 && b >= -1e-5)
      return m * e[i] + g * e[a] + b * e[r];
  }
  return null;
}
