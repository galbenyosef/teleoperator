// app 130 — math
// Lines 87865-88195 of readable/app.pretty.js (statement-aligned).
function vq(i, t, e) {
  let s = new Ce(),
    n = bq(),
    o = {};
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
      Ot(a, h + ((f - h) * d) / u, o);
      let p = o.w + a.sw - 0.25,
        m = Math.hypot(o.nx, o.nz) || 1,
        g = o.nx / m,
        b = o.nz / m,
        x = o.x - g * p,
        v = o.z - b * p,
        y = o.x + g * p,
        M = o.z + b * p;
      xq(
        s,
        n,
        [x, Yt(x, v) + Ke + 7.2, v],
        [y, Yt(y, M) + Ke + 7.2, M],
        a.id,
        d,
      );
    }
  }
  gn(i.group, s, t.lm, "GrantLanterns", { shadow: !1 });
}
as();
En();
f0();
var yq = [],
  A7 = null,
  qd = () => typeof window < "u" && typeof document < "u" && !!document.body;
function mb(i) {
  if (!qd()) return i();
  A7 ? A7(i) : yq.push(i);
}
function wq(i) {
  A7 = i;
  for (let t of yq.splice(0)) i(t);
}
var _q = to.west(-122.4528),
  zq = to.north(37.7552),
  nut = [
    [to.west(-122.4477), to.north(37.7544), 250, 330, 260],
    [to.west(-122.4474), to.north(37.752), 245, 300, 250],
    [to.west(-122.4583), to.north(37.758), 245, 420, 380],
    [to.west(-122.454), to.north(37.7384), 250, 420, 420],
    [_q, zq, 228, 300, 260],
    [to.west(-122.4435), to.north(37.748), 150, 700, 600],
    [to.west(-122.465), to.north(37.75), 150, 800, 700],
  ],
  iut = -4700,
  out = -300,
  aut = 3380,
  rut = 8200,
  Eq = { SX: _q, SZ: zq, PEAKS: nut, X0: iut, X1: out, Z0: aut, Z1: rut },
  ky = (i) => ((i = Math.min(1, Math.max(0, i))), i * i * (3 - 2 * i)),
  R7 = (i, t, e) => {
    for (let [s, n, , o, a, r] of e.PEAKS)
      if (r) {
        let l = (i - s) / o,
          c = (t - n) / a;
        if (l * l + c * c < 0.7) return !0;
      }
    return !1;
  };
function gb(i, t, e = Eq) {
  let s = 0;
  for (let [a, r, l, c, h] of e.PEAKS) {
    let f = (i - a) / c,
      u = (t - r) / h;
    s = Math.max(s, l * Math.exp(-0.5 * (f * f + u * u)));
  }
  s += 22 + 6 * Math.sin(i / 310) * Math.sin(t / 270);
  let n = ky((i - e.X0) / 500) * ky((e.X1 - i) / 500) * ky((e.Z1 - t) / 600),
    o = ky((t - e.Z0) / 320);
  return (
    (e.edgeH ? e.edgeH(i, t) : Io(i, Math.min(t, e.Z0 + 80), !1) - 1.5) *
      (1 - o) +
    s * n * o
  );
}
var Mq = [
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
  Sq = [
    [0.62, 0.61, 0.58],
    [0.8, 0.8, 0.78],
    [0.2, 0.19, 0.18],
    [0.45, 0.43, 0.4],
    [0.7, 0.68, 0.64],
    [0.5, 0.26, 0.18],
    [0.34, 0.33, 0.31],
  ],
  Tq = (i, t) => {
    qd() ? mb(() => t(i.rc?.group || i.group)) : t(i.group);
  };
function Aq(i, t, e, s, n, o, a, r, l) {
  let c = i.hi || i,
    h = i.hi ? i.lo : null,
    f = Math.max(1, Math.round((e - t) / 7.6)),
    u = (e - t) / f,
    d = o < 0 ? s : n,
    p = o,
    m = (g) => {
      let b = t + g * u,
        x = Ws(b, s, 31 + l);
      return Math.max(
        6.5,
        r + (x < 0.25 ? -3 : x > 0.85 ? 3 : 0) + (Ws(b, s, 33) - 0.5) * 0.8,
      );
    };
  for (let g = 0; g < f; g++) {
    let b = t + g * u,
      x = b + u - (g === f - 1 ? 0.5 : 0),
      v = a(b, x),
      y = m(g),
      M = Mq[Math.floor(Ws(b, s, 35) * Mq.length)],
      S = 0.82 + 0.18 * Ws(b, s, 36),
      w = It(Lt.stone, M[0] * S * 0.92, M[1] * S * 0.92, M[2] * S * 0.92),
      z = yn(sn.WIN, be.stucco, M[0] * S, M[1] * S, M[2] * S),
      _ = Sq[Math.floor(Ws(b, s, 37) * Sq.length)],
      R = It(Lt.stone, _[0], _[1], _[2]),
      T = v - 3,
      E = v + y,
      A = o < 0 ? n : s;
    for (let P of h ? [c, h] : [c])
      (o < 0
        ? P.wall(x, d, b, d, T, T, E, E, z, 0, v)
        : P.wall(b, d, x, d, T, T, E, E, z, 0, v),
        o < 0
          ? P.wall(b, A, x, A, T, T, E, E, w)
          : P.wall(x, A, b, A, T, T, E, E, w));
    if (h) {
      (g === 0 && h.wall(b, s, b, n, T, T, E, E, w),
        g === f - 1 && h.wall(x, n, x, s, T, T, E, E, w),
        h.quad(
          [b, E, n],
          [x, E, n],
          [x, E, s],
          [b, E, s],
          [b, n],
          [x, n],
          [x, s],
          [b, s],
          R,
          [0, 1, 0],
        ));
      let P = It(Lt.stone, 0.86, 0.85, 0.82),
        I = d + p * 0.35;
      o < 0
        ? h.wall(x, I, b, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, P)
        : h.wall(b, I, x, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, P);
    }
    ((g === 0 || m(g - 1) < y - 0.6) && c.wall(b, s, b, n, T, T, E, E, w),
      (g === f - 1 || m(g + 1) < y - 0.6) && c.wall(x, n, x, s, T, T, E, E, w));
    let C = Ws(b, s, 39) < 0.22 && u < 9;
    if (!C)
      c.quad(
        [b, E, n],
        [x, E, n],
        [x, E, s],
        [b, E, s],
        [b, n],
        [x, n],
        [x, s],
        [b, s],
        R,
        [0, 1, 0],
      );
    else {
      let P = (b + x) / 2,
        I = E + u * 0.42,
        L = d + p * 0.3,
        F = [b, E, L],
        N = [x, E, L],
        B = [P, I, L];
      o < 0
        ? c.tri(
            c.vert(N[0], N[1], N[2], 0, 0, -1, 0, 0, z),
            c.vert(F[0], F[1], F[2], 0, 0, -1, u, 0, z),
            c.vert(B[0], B[1], B[2], 0, 0, -1, u / 2, 0, z),
          )
        : c.tri(
            c.vert(F[0], F[1], F[2], 0, 0, 1, 0, 0, z),
            c.vert(N[0], N[1], N[2], 0, 0, 1, u, 0, z),
            c.vert(B[0], B[1], B[2], 0, 0, 1, u / 2, 0, z),
          );
      let H = L,
        O = o < 0 ? n : s,
        D = o < 0 ? 1 : -1,
        U = It(Lt.stone, 0.24, 0.22, 0.21);
      o < 0
        ? (c.quad(
            [b, E, O],
            [b, E, H],
            [P, I, H],
            [P, I, O],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ),
          c.quad(
            [x, E, H],
            [x, E, O],
            [P, I, O],
            [P, I, H],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ))
        : (c.quad(
            [b, E, H],
            [b, E, O],
            [P, I, O],
            [P, I, H],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ),
          c.quad(
            [x, E, O],
            [x, E, H],
            [P, I, H],
            [P, I, O],
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            U,
          ));
    }
    if (u > 5.5 && Ws(b, s, 41) < 0.8) {
      let P = u * (0.45 + 0.15 * Ws(b, s, 42)),
        I = b + u * (Ws(b, s, 43) < 0.5 ? 0.62 : 0.4),
        L = I - P / 2,
        F = I + P / 2,
        N = v + 3.1,
        B = E - 0.7,
        H = d + p * 0.85,
        O = yn(
          sn.WIN,
          be.stucco,
          Math.min(1, M[0] * S * 1.04),
          Math.min(1, M[1] * S * 1.04),
          Math.min(1, M[2] * S * 1.04),
        );
      B > N + 2 &&
        (o < 0
          ? (c.wall(F, H, L, H, N, N, B, B, O, 0, v),
            c.quad(
              [L, B, d],
              [F, B, d],
              [F, B, H],
              [L, B, H],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              R,
              [0, 1, 0],
            ))
          : (c.wall(L, H, F, H, N, N, B, B, O, 0, v),
            c.quad(
              [L, B, H],
              [F, B, H],
              [F, B, d],
              [L, B, d],
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              R,
              [0, 1, 0],
            )));
    }
    if (!C) {
      let P = It(Lt.stone, 0.86, 0.85, 0.82),
        I = d + p * 0.35;
      o < 0
        ? c.wall(x, I, b, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, P)
        : c.wall(b, I, x, I, E - 0.55, E - 0.55, E + 0.25, E + 0.25, P);
    }
  }
}
var bb = 800,
  lut = 1400,
  kq = {
    empty: !0,
    v: 0,
    vert: () => 0,
    tri() {},
    quad() {},
    wall() {},
    box() {},
  };
