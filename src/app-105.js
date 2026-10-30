// app 105 — math
// Lines 80599-80910 of readable/app.pretty.js (statement-aligned).
var Zpt = [0.62, 0.6, 0.56, 0],
  Qpt = [0.58, 0.565, 0.53, 0],
  Uq = [0.42, 0.41, 0.39, 0],
  Gq = [0.7, 0.69, 0.66, 0],
  LP = [0.16, 0.19, 0.2, 0];
function t1t(o, t, e, s, n, i, a, r, l) {
  let c = [o.ux * s, o.uz * s],
    h = {},
    f = [],
    u = e.y;
  for (let d = 0.5; d <= 140; d += 2.5) {
    let p = e.x + c[0] * d,
      m = e.z + c[1] * d,
      g = null;
    for (let b of a.probe(p, m).all) {
      let v = b.J
        ? b.J.legs
            .map(([x]) => x)
            .find((x) => !x.tunnel && x.name === o.tn.name)
        : b.E;
      !v ||
        v.tunnel ||
        Math.abs(b.y - u) > 2.5 ||
        ((!g || b.y < g.y) && (g = { E: v, y: b.y }));
    }
    if (!g) {
      if (d > 20) break;
      continue;
    }
    if (f.length && g.E !== f[0].E) break;
    (ys(g.E, p, m, h),
      Ot(g.E, Math.max(0, Math.min(g.E.L, h.s)), h),
      (u = g.y),
      f.push({ x: p, z: m, y: g.y, nx: h.nx, nz: h.nz, w: h.w, d, E: g.E }));
  }
  for (let d of [-1, 1]) {
    let p = null,
      m = [];
    for (let g of f) {
      let b = (M) => [g.x + g.nx * M * d, g.z + g.nz * M * d],
        v = null,
        x = null;
      for (let M = g.w + 0.5; M <= g.w + 9 && v === null; M += 0.5) {
        let [S, w] = b(M);
        for (let _ of a.probe(S, w).all)
          if (_.y > g.y + 1 && _.y < g.y + 14) {
            ((v = _.y), (x = M));
            break;
          }
        if (v === null) {
          let _ = a.probe(S, w);
          _.walk && _.walk.y > g.y + 1 && ((v = _.walk.y), (x = M));
        }
      }
      if (v === null) {
        let M = -1e9;
        for (let S = g.w + 0.5; S <= g.w + 6; S += 0.5) {
          let [w, _] = b(S);
          M = Math.max(M, a.terrainAt(w, _));
        }
        M > g.y + 0.6 && ((v = M), (x = g.w + 6));
      }
      let y =
        v !== null && v - g.y >= 0.6
          ? {
              S: g,
              up: v,
              vUp: x,
              w0: b(g.w + 0.15),
              w1: b(g.w + 0.55),
              c1: b(x),
            }
          : null;
      if (y) {
        let M = 1 / 0,
          S = {};
        for (let w of [y.w0, y.w1])
          for (let _ of a.probe(w[0], w[1]).all)
            _.y > g.y + 0.5 &&
              _.y < y.up + 1.5 &&
              _.E !== g.E &&
              !(_.J && (_.J.id === g.E.ja || _.J.id === g.E.jb)) &&
              (!_.E ||
                (Ot(_.E, Math.max(0, Math.min(_.E.L, _.s)), S),
                Math.abs(S.dx * g.nx + S.dz * g.nz) > 0.5)) &&
              (M = Math.min(M, _.y));
        M < 1 / 0 && (y.deck = M - 0.06);
      }
      m.push(y);
    }
    for (let g = m.length - 2; g >= 0; g--) {
      let b = m[g],
        v = m[g + 1];
      b &&
        v &&
        (b.S.d < 15 || !m[g - 1]) &&
        b.deck === void 0 &&
        v.deck === void 0 &&
        b.up < v.up - 0.5 &&
        ((b.up = v.up), (b.c1 = v.c1));
    }
    globalThis.SF_TUNDBG &&
      (o._cut ||= []).push({
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
        let x = p,
          y = g,
          M = [b.nx * -d, 0, b.nz * -d],
          S = x.deck ?? x.up + 0.45,
          w = y.deck ?? y.up + 0.45,
          _ = Math.floor(x.S.d / 2.5) % 2 ? Zpt : Qpt,
          z = (I, L) => [I[0] + M[0] * L, I[2] + M[2] * L],
          A = (I, L, F = 0) => {
            let O = z([I[0], 0, I[1]], F);
            return [O[0], L, O[1]];
          };
        if (
          (n.quad(
            A(x.w0, x.S.y - 0.4),
            A(y.w0, y.S.y - 0.4),
            A(y.w0, y.S.y + 0.5),
            A(x.w0, x.S.y + 0.5),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            Uq,
            M,
          ),
          n.quad(
            A(x.w0, x.S.y + 0.5),
            A(y.w0, y.S.y + 0.5),
            A(y.w0, w - 0.3),
            A(x.w0, S - 0.3),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            _,
            M,
          ),
          n.quad(
            A(x.w0, S - 0.3, 0.06),
            A(y.w0, w - 0.3, 0.06),
            A(y.w0, w, 0.06),
            A(x.w0, S, 0.06),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            Gq,
            M,
          ),
          n.quad(
            A(x.w0, S - 0.3),
            A(y.w0, w - 0.3),
            A(y.w0, w - 0.3, 0.06),
            A(x.w0, S - 0.3, 0.06),
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            Uq,
            [0, -1, 0],
          ),
          x.deck === void 0 && y.deck === void 0)
        ) {
          (n.quad(
            [x.w0[0], x.up + 0.45, x.w0[1]],
            [y.w0[0], y.up + 0.45, y.w0[1]],
            [y.w1[0], y.up + 0.45, y.w1[1]],
            [x.w1[0], x.up + 0.45, x.w1[1]],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            Gq,
            [0, 1, 0],
          ),
            n.quad(
              [x.w1[0], x.up + 0.45, x.w1[1]],
              [y.w1[0], y.up + 0.45, y.w1[1]],
              [y.w1[0], y.up - 0.2, y.w1[1]],
              [x.w1[0], x.up - 0.2, x.w1[1]],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              l,
              [-M[0], 0, -M[2]],
            ));
          let I = (O, B) => [(O[0] + B[0]) / 2, (O[1] + B[1]) / 2],
            L = I(x.w0, x.w1),
            F = I(y.w0, y.w1);
          for (let [O, B] of [
            [1.02, 1.08],
            [0.72, 0.76],
          ]) {
            let H = x.up + B,
              N = y.up + B,
              D = x.up + O,
              U = y.up + O;
            (n.quad(
              [L[0], D, L[1]],
              [F[0], U, F[1]],
              [F[0], N, F[1]],
              [L[0], H, L[1]],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              LP,
              M,
            ),
              n.quad(
                [L[0], H, L[1]],
                [F[0], N, F[1]],
                [F[0], N + 0.001, F[1]],
                [L[0], H + 0.001, L[1]],
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                LP,
                [0, 1, 0],
              ));
          }
          {
            let O = [-M[2] * 0.03, M[0] * 0.03];
            n.quad(
              [L[0] - O[0], x.up + 0.45, L[1] - O[1]],
              [L[0] + O[0], x.up + 0.45, L[1] + O[1]],
              [L[0] + O[0], x.up + 1.08, L[1] + O[1]],
              [L[0] - O[0], x.up + 1.08, L[1] - O[1]],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              LP,
              M,
            );
          }
          n.quad(
            [x.w1[0], x.up + 0.03, x.w1[1]],
            [y.w1[0], y.up + 0.03, y.w1[1]],
            [y.c1[0], y.up + 0.03, y.c1[1]],
            [x.c1[0], x.up + 0.03, x.c1[1]],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            [0.44, 0.43, 0.41, 0],
            [0, 1, 0],
          );
        }
        let T = (x.w0[0] + y.w0[0] + x.w1[0] + y.w1[0]) / 4,
          E = (x.w0[1] + y.w0[1] + x.w1[1] + y.w1[1]) / 4,
          R = y.w0[0] - x.w0[0],
          P = y.w0[1] - x.w0[1],
          C = Math.hypot(R, P);
        C > 0.2 &&
          i.push({
            t: "obb",
            x: T,
            z: E,
            hx: 0.2,
            hz: C / 2 + 0.05,
            c: P / C,
            s: R / C,
            y0: Math.min(x.S.y, y.S.y) - 1,
            y1: Math.min(
              Math.max(x.up, y.up) + 1.1,
              Math.min(x.deck ?? 1 / 0, y.deck ?? 1 / 0) - 0.6,
            ),
            wall: !0,
            cut: !0,
          });
      }
      p = g;
    }
  }
}
function Xq(o, t, e, s = null) {
  let n = o.tunnelR;
  if (!n) return 0.5;
  let [i] = yp(n, t, e),
    a = Math.max(0, Math.min(i, n.L - i)),
    r = Math.max(0.12, 0.7 * Math.exp(-a / 14));
  if (!s) return r;
  let l = i < n.L / 2 ? 0 : 1,
    c = l ? [o.D[(o.n - 2) * 2], o.D[(o.n - 2) * 2 + 1]] : [-o.D[0], -o.D[1]],
    h = l ? o.n - 1 : 0,
    f = s(o.P[h * 3] + c[0] * 3, o.P[h * 3 + 1] + c[1] * 3),
    u = Math.min(1, a / 16),
    d = u * u * (3 - 2 * u);
  return f * (1 - d) + r * d;
}
