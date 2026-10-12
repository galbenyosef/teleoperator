// app 106 — math
// Lines 80363-80674 of readable/app.pretty.js (statement-aligned).
var Rft = [0.62, 0.6, 0.56, 0],
  Pft = [0.58, 0.565, 0.53, 0],
  HW = [0.42, 0.41, 0.39, 0],
  DW = [0.7, 0.69, 0.66, 0],
  n7 = [0.16, 0.19, 0.2, 0];
function Cft(i, t, e, s, n, o, a, r, l) {
  let c = [i.ux * s, i.uz * s],
    h = {},
    f = [],
    u = e.y;
  for (let d = 0.5; d <= 140; d += 2.5) {
    let p = e.x + c[0] * d,
      m = e.z + c[1] * d,
      g = null;
    for (let b of a.probe(p, m).all) {
      let x = b.J
        ? b.J.legs
            .map(([v]) => v)
            .find((v) => !v.tunnel && v.name === i.tn.name)
        : b.E;
      !x ||
        x.tunnel ||
        Math.abs(b.y - u) > 2.5 ||
        ((!g || b.y < g.y) && (g = { E: x, y: b.y }));
    }
    if (!g) {
      if (d > 20) break;
      continue;
    }
    if (f.length && g.E !== f[0].E) break;
    (vs(g.E, p, m, h),
      Ot(g.E, Math.max(0, Math.min(g.E.L, h.s)), h),
      (u = g.y),
      f.push({ x: p, z: m, y: g.y, nx: h.nx, nz: h.nz, w: h.w, d, E: g.E }));
  }
  for (let d of [-1, 1]) {
    let p = null,
      m = [];
    for (let g of f) {
      let b = (M) => [g.x + g.nx * M * d, g.z + g.nz * M * d],
        x = null,
        v = null;
      for (let M = g.w + 0.5; M <= g.w + 9 && x === null; M += 0.5) {
        let [S, w] = b(M);
        for (let z of a.probe(S, w).all)
          if (z.y > g.y + 1 && z.y < g.y + 14) {
            ((x = z.y), (v = M));
            break;
          }
        if (x === null) {
          let z = a.probe(S, w);
          z.walk && z.walk.y > g.y + 1 && ((x = z.walk.y), (v = M));
        }
      }
      if (x === null) {
        let M = -1e9;
        for (let S = g.w + 0.5; S <= g.w + 6; S += 0.5) {
          let [w, z] = b(S);
          M = Math.max(M, a.terrainAt(w, z));
        }
        M > g.y + 0.6 && ((x = M), (v = g.w + 6));
      }
      let y =
        x !== null && x - g.y >= 0.6
          ? {
              S: g,
              up: x,
              vUp: v,
              w0: b(g.w + 0.15),
              w1: b(g.w + 0.55),
              c1: b(v),
            }
          : null;
      if (y) {
        let M = 1 / 0,
          S = {};
        for (let w of [y.w0, y.w1])
          for (let z of a.probe(w[0], w[1]).all)
            z.y > g.y + 0.5 &&
              z.y < y.up + 1.5 &&
              z.E !== g.E &&
              !(z.J && (z.J.id === g.E.ja || z.J.id === g.E.jb)) &&
              (!z.E ||
                (Ot(z.E, Math.max(0, Math.min(z.E.L, z.s)), S),
                Math.abs(S.dx * g.nx + S.dz * g.nz) > 0.5)) &&
              (M = Math.min(M, z.y));
        M < 1 / 0 && (y.deck = M - 0.06);
      }
      m.push(y);
    }
    for (let g = m.length - 2; g >= 0; g--) {
      let b = m[g],
        x = m[g + 1];
      b &&
        x &&
        (b.S.d < 15 || !m[g - 1]) &&
        b.deck === void 0 &&
        x.deck === void 0 &&
        b.up < x.up - 0.5 &&
        ((b.up = x.up), (b.c1 = x.c1));
    }
    globalThis.SF_TUNDBG &&
      (i._cut ||= []).push({
        e: t,
        sd: d,
        curs: m.map(
          (g) =>
            g && {
              d: g.S.d,
              y: +g.S.y.toFixed(2),
              up: +g.up.toFixed(2),
              deck: g.deck,
              x: +g.w0[0].toFixed(1),
              z: +g.w0[1].toFixed(1),
            },
        ),
      });
    for (let g of m) {
      let b = g?.S;
      if (g && p) {
        let v = p,
          y = g,
          M = [b.nx * -d, 0, b.nz * -d],
          S = v.deck ?? v.up + 0.45,
          w = y.deck ?? y.up + 0.45,
          z = Math.floor(v.S.d / 2.5) % 2 ? Rft : Pft,
          _ = (I, L) => [I[0] + M[0] * L, I[2] + M[2] * L],
          R = (I, L, F = 0) => {
            let N = _([I[0], 0, I[1]], F);
            return [N[0], L, N[1]];
          };
        if (
          (n.quad(
            R(v.w0, v.S.y - 0.4),
            R(y.w0, y.S.y - 0.4),
            R(y.w0, y.S.y + 0.5),
            R(v.w0, v.S.y + 0.5),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            HW,
            M,
          ),
          n.quad(
            R(v.w0, v.S.y + 0.5),
            R(y.w0, y.S.y + 0.5),
            R(y.w0, w - 0.3),
            R(v.w0, S - 0.3),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            z,
            M,
          ),
          n.quad(
            R(v.w0, S - 0.3, 0.06),
            R(y.w0, w - 0.3, 0.06),
            R(y.w0, w, 0.06),
            R(v.w0, S, 0.06),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            DW,
            M,
          ),
          n.quad(
            R(v.w0, S - 0.3),
            R(y.w0, w - 0.3),
            R(y.w0, w - 0.3, 0.06),
            R(v.w0, S - 0.3, 0.06),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            HW,
            [0, -1, 0],
          ),
          v.deck === void 0 && y.deck === void 0)
        ) {
          (n.quad(
            [v.w0[0], v.up + 0.45, v.w0[1]],
            [y.w0[0], y.up + 0.45, y.w0[1]],
            [y.w1[0], y.up + 0.45, y.w1[1]],
            [v.w1[0], v.up + 0.45, v.w1[1]],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            DW,
            [0, 1, 0],
          ),
            n.quad(
              [v.w1[0], v.up + 0.45, v.w1[1]],
              [y.w1[0], y.up + 0.45, y.w1[1]],
              [y.w1[0], y.up - 0.2, y.w1[1]],
              [v.w1[0], v.up - 0.2, v.w1[1]],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              l,
              [-M[0], 0, -M[2]],
            ));
          let I = (N, B) => [(N[0] + B[0]) / 2, (N[1] + B[1]) / 2],
            L = I(v.w0, v.w1),
            F = I(y.w0, y.w1);
          for (let [N, B] of [
            [1.02, 1.08],
            [0.72, 0.76],
          ]) {
            let H = v.up + B,
              O = y.up + B,
              D = v.up + N,
              U = y.up + N;
            (n.quad(
              [L[0], D, L[1]],
              [F[0], U, F[1]],
              [F[0], O, F[1]],
              [L[0], H, L[1]],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              n7,
              M,
            ),
              n.quad(
                [L[0], H, L[1]],
                [F[0], O, F[1]],
                [F[0], O + 0.001, F[1]],
                [L[0], H + 0.001, L[1]],
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                n7,
                [0, 1, 0],
              ));
          }
          {
            let N = [-M[2] * 0.03, M[0] * 0.03];
            n.quad(
              [L[0] - N[0], v.up + 0.45, L[1] - N[1]],
              [L[0] + N[0], v.up + 0.45, L[1] + N[1]],
              [L[0] + N[0], v.up + 1.08, L[1] + N[1]],
              [L[0] - N[0], v.up + 1.08, L[1] - N[1]],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              n7,
              M,
            );
          }
          n.quad(
            [v.w1[0], v.up + 0.03, v.w1[1]],
            [y.w1[0], y.up + 0.03, y.w1[1]],
            [y.c1[0], y.up + 0.03, y.c1[1]],
            [v.c1[0], v.up + 0.03, v.c1[1]],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            [0.44, 0.43, 0.41, 0],
            [0, 1, 0],
          );
        }
        let T = (v.w0[0] + y.w0[0] + v.w1[0] + y.w1[0]) / 4,
          E = (v.w0[1] + y.w0[1] + v.w1[1] + y.w1[1]) / 4,
          A = y.w0[0] - v.w0[0],
          C = y.w0[1] - v.w0[1],
          P = Math.hypot(A, C);
        P > 0.2 &&
          o.push({
            t: "obb",
            x: T,
            z: E,
            hx: 0.2,
            hz: P / 2 + 0.05,
            c: C / P,
            s: A / P,
            y0: Math.min(v.S.y, y.S.y) - 1,
            y1: Math.min(
              Math.max(v.up, y.up) + 1.1,
              Math.min(v.deck ?? 1 / 0, y.deck ?? 1 / 0) - 0.6,
            ),
            wall: !0,
            cut: !0,
          });
      }
      p = g;
    }
  }
}
function VW(i, t, e, s = null) {
  let n = i.tunnelR;
  if (!n) return 0.5;
  let [o] = Ud(n, t, e),
    a = Math.max(0, Math.min(o, n.L - o)),
    r = Math.max(0.12, 0.7 * Math.exp(-a / 14));
  if (!s) return r;
  let l = o < n.L / 2 ? 0 : 1,
    c = l ? [i.D[(i.n - 2) * 2], i.D[(i.n - 2) * 2 + 1]] : [-i.D[0], -i.D[1]],
    h = l ? i.n - 1 : 0,
    f = s(i.P[h * 3] + c[0] * 3, i.P[h * 3 + 1] + c[1] * 3),
    u = Math.min(1, a / 16),
    d = u * u * (3 - 2 * u);
  return f * (1 - d) + r * d;
}
