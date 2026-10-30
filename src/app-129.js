// app 129 — math
// Lines 88133-88463 of readable/app.pretty.js (statement-aligned).
function wj(o, t, e) {
  let s = new Be(),
    n = vj(),
    i = {};
  for (let a of e.edges) {
    let r = a.name === "Grant Avenue",
      l = a.name === "Stockton Street";
    if (!(r || l) || a.inner || a.elev || a.sunk) continue;
    let c = (a.P[1] + a.P[a.n * 3 - 2]) / 2;
    if (
      (r ? c < -262 || c > 548 : c < -140 || c > 262) ||
      (l && a.dist && a.dist !== "chinatown" && a.dist !== "northbeach")
    )
      continue;
    let h = a.s0 + 4,
      f = a.s1 - 4;
    if (f - h < 6) continue;
    let u = Math.max(1, Math.round((f - h) / (r ? 10 : 13)));
    for (let d = 0; d <= u; d++) {
      Ot(a, h + ((f - h) * d) / u, i);
      let p = i.w + a.sw - 0.25,
        m = Math.hypot(i.nx, i.nz) || 1,
        g = i.nx / m,
        b = i.nz / m,
        v = i.x - g * p,
        x = i.z - b * p,
        y = i.x + g * p,
        M = i.z + b * p;
      yj(
        s,
        n,
        [v, $t(v, x) + Ze + 7.2, x],
        [y, $t(y, M) + Ze + 7.2, M],
        a.id,
        d,
      );
    }
  }
  vn(o.group, s, t.lm, "GrantLanterns", { shadow: !1 });
}
es();
Pn();
await _0();
var Mj = [],
  aC = null,
  Mp = () => typeof window < "u" && typeof document < "u" && !!document.body;
function ex(o) {
  if (!Mp()) return o();
  aC ? aC(o) : Mj.push(o);
}
function Sj(o) {
  aC = o;
  for (let t of Mj.splice(0)) o(t);
}
var Ej = po.west(-122.4528),
  Tj = po.north(37.7552),
  z1t = [
    [po.west(-122.4477), po.north(37.7544), 250, 330, 260],
    [po.west(-122.4474), po.north(37.752), 245, 300, 250],
    [po.west(-122.4583), po.north(37.758), 245, 420, 380],
    [po.west(-122.454), po.north(37.7384), 250, 420, 420],
    [Ej, Tj, 228, 300, 260],
    [po.west(-122.4435), po.north(37.748), 150, 700, 600],
    [po.west(-122.465), po.north(37.75), 150, 800, 700],
  ],
  _1t = -4700,
  E1t = -300,
  T1t = 3380,
  R1t = 8200,
  Rj = { SX: Ej, SZ: Tj, PEAKS: z1t, X0: _1t, X1: E1t, Z0: T1t, Z1: R1t },
  xw = (o) => ((o = Math.min(1, Math.max(0, o))), o * o * (3 - 2 * o)),
  rC = (o, t, e) => {
    for (let [s, n, , i, a, r] of e.PEAKS)
      if (r) {
        let l = (o - s) / i,
          c = (t - n) / a;
        if (l * l + c * c < 0.7) return !0;
      }
    return !1;
  };
function sx(o, t, e = Rj) {
  let s = 0;
  for (let [a, r, l, c, h] of e.PEAKS) {
    let f = (o - a) / c,
      u = (t - r) / h;
    s = Math.max(s, l * Math.exp(-0.5 * (f * f + u * u)));
  }
  s += 22 + 6 * Math.sin(o / 310) * Math.sin(t / 270);
  let n = xw((o - e.X0) / 500) * xw((e.X1 - o) / 500) * xw((e.Z1 - t) / 600),
    i = xw((t - e.Z0) / 320);
  return (
    (e.edgeH ? e.edgeH(o, t) : Vo(o, Math.min(t, e.Z0 + 80), !1) - 1.5) *
      (1 - i) +
    s * n * i
  );
}
var kj = [
    [0.9, 0.89, 0.85],
    [0.92, 0.86, 0.72],
    [0.93, 0.85, 0.6],
    [0.66, 0.76, 0.84],
    [0.7, 0.82, 0.72],
    [0.9, 0.72, 0.7],
    [0.66, 0.66, 0.64],
    [0.8, 0.72, 0.58],
    [0.64, 0.7, 0.58],
    [0.6, 0.78, 0.8],
    [0.74, 0.48, 0.38],
    [0.38, 0.44, 0.52],
    [0.88, 0.88, 0.86],
    [0.84, 0.8, 0.7],
    [0.5, 0.56, 0.5],
    [0.94, 0.78, 0.5],
  ],
  zj = [
    [0.62, 0.61, 0.58],
    [0.8, 0.8, 0.78],
    [0.2, 0.19, 0.18],
    [0.45, 0.43, 0.4],
    [0.7, 0.68, 0.64],
    [0.5, 0.26, 0.18],
    [0.34, 0.33, 0.31],
  ],
  Aj = (o, t) => {
    Mp() ? ex(() => t(o.rc?.group || o.group)) : t(o.group);
  };
function Pj(o, t, e, s, n, i, a, r, l) {
  let c = o.hi || o,
    h = o.hi ? o.lo : null,
    f = Math.max(1, Math.round((e - t) / 7.6)),
    u = (e - t) / f,
    d = i < 0 ? s : n,
    p = i,
    m = (g) => {
      let b = t + g * u,
        v = js(b, s, 31 + l);
      return Math.max(
        6.5,
        r + (v < 0.25 ? -3 : v > 0.85 ? 3 : 0) + (js(b, s, 33) - 0.5) * 0.8,
      );
    };
  for (let g = 0; g < f; g++) {
    let b = t + g * u,
      v = b + u - (g === f - 1 ? 0.5 : 0),
      x = a(b, v),
      y = m(g),
      M = kj[Math.floor(js(b, s, 35) * kj.length)],
      S = 0.82 + 0.18 * js(b, s, 36),
      w = Lt(Ct.stone, M[0] * S * 0.92, M[1] * S * 0.92, M[2] * S * 0.92),
      _ = Tn(ln.WIN, we.stucco, M[0] * S, M[1] * S, M[2] * S),
      z = zj[Math.floor(js(b, s, 37) * zj.length)],
      A = Lt(Ct.stone, z[0], z[1], z[2]),
      T = x - 3,
      E = x + y,
      R = i < 0 ? n : s;
    for (let C of h ? [c, h] : [c])
      (i < 0
        ? C.wall(v, d, b, d, T, T, E, E, _, 0, x)
        : C.wall(b, d, v, d, T, T, E, E, _, 0, x),
        i < 0
          ? C.wall(b, R, v, R, T, T, E, E, w)
          : C.wall(v, R, b, R, T, T, E, E, w));
    if (h) {
      (g === 0 && h.wall(b, s, b, n, T, T, E, E, w),
        g === f - 1 && h.wall(v, n, v, s, T, T, E, E, w),
        h.quad(
          [b, E, n],
          [v, E, n],
          [v, E, s],
          [b, E, s],
          [b, n],
          [v, n],
          [v, s],
          [b, s],
          A,
          [0, 1, 0],
        ));
      let C = Lt(Ct.stone, 0.86, 0.85, 0.82),
        I = d + p * 0.35;
      i < 0
        ? h.wall(v, I, b, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, C)
        : h.wall(b, I, v, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, C);
    }
    ((g === 0 || m(g - 1) < y - 0.6) && c.wall(b, s, b, n, T, T, E, E, w),
      (g === f - 1 || m(g + 1) < y - 0.6) && c.wall(v, n, v, s, T, T, E, E, w));
    let P = js(b, s, 39) < 0.22 && u < 9;
    if (!P)
      c.quad(
        [b, E, n],
        [v, E, n],
        [v, E, s],
        [b, E, s],
        [b, n],
        [v, n],
        [v, s],
        [b, s],
        A,
        [0, 1, 0],
      );
    else {
      let C = (b + v) / 2,
        I = E + u * 0.42,
        L = d + p * 0.3,
        F = [b, E, L],
        O = [v, E, L],
        B = [C, I, L];
      i < 0
        ? c.tri(
            c.vert(O[0], O[1], O[2], 0, 0, -1, 0, 0, _),
            c.vert(F[0], F[1], F[2], 0, 0, -1, u, 0, _),
            c.vert(B[0], B[1], B[2], 0, 0, -1, u / 2, 0, _),
          )
        : c.tri(
            c.vert(F[0], F[1], F[2], 0, 0, 1, 0, 0, _),
            c.vert(O[0], O[1], O[2], 0, 0, 1, u, 0, _),
            c.vert(B[0], B[1], B[2], 0, 0, 1, u / 2, 0, _),
          );
      let H = L,
        N = i < 0 ? n : s,
        D = i < 0 ? 1 : -1,
        U = Lt(Ct.stone, 0.24, 0.22, 0.21);
      i < 0
        ? (c.quad(
            [b, E, N],
            [b, E, H],
            [C, I, H],
            [C, I, N],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ),
          c.quad(
            [v, E, H],
            [v, E, N],
            [C, I, N],
            [C, I, H],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ))
        : (c.quad(
            [b, E, H],
            [b, E, N],
            [C, I, N],
            [C, I, H],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ),
          c.quad(
            [v, E, N],
            [v, E, H],
            [C, I, H],
            [C, I, N],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ));
    }
    if (u > 5.5 && js(b, s, 41) < 0.8) {
      let C = u * (0.45 + 0.15 * js(b, s, 42)),
        I = b + u * (js(b, s, 43) < 0.5 ? 0.62 : 0.4),
        L = I - C / 2,
        F = I + C / 2,
        O = x + 3.1,
        B = E - 0.7,
        H = d + p * 0.85,
        N = Tn(
          ln.WIN,
          we.stucco,
          Math.min(1, M[0] * S * 1.04),
          Math.min(1, M[1] * S * 1.04),
          Math.min(1, M[2] * S * 1.04),
        );
      B > O + 2 &&
        (i < 0
          ? (c.wall(F, H, L, H, O, O, B, B, N, 0, x),
            c.quad(
              [L, B, d],
              [F, B, d],
              [F, B, H],
              [L, B, H],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              A,
              [0, 1, 0],
            ))
          : (c.wall(L, H, F, H, O, O, B, B, N, 0, x),
            c.quad(
              [L, B, H],
              [F, B, H],
              [F, B, d],
              [L, B, d],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              A,
              [0, 1, 0],
            )));
    }
    if (!P) {
      let C = Lt(Ct.stone, 0.86, 0.85, 0.82),
        I = d + p * 0.35;
      i < 0
        ? c.wall(v, I, b, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, C)
        : c.wall(b, I, v, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, C);
    }
  }
}
var nx = 800,
  A1t = 1400,
  _j = {
    empty: !0,
    v: 0,
    vert: () => 0,
    tri() {},
    quad() {},
    wall() {},
    box() {},
  };
