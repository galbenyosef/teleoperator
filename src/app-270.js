// app 270 — math
// Lines 134573-134922 of readable/app.pretty.js (statement-aligned).
function vbt(i, t) {
  let e = Object.entries(i.attributes).map(([d, p]) => [
      d,
      p.array,
      p.itemSize,
    ]),
    s = e.map(() => []),
    n = e.findIndex((d) => d[0] === "position"),
    o = i.attributes.position.array,
    a = new Uint32Array(o.buffer, o.byteOffset, o.length),
    r = new Float32Array(1),
    l = new Uint32Array(r.buffer),
    c = (d) => e.map(([, p, m]) => Array.from(p.subarray(d * m, d * m + m))),
    h = (d, p, m) => {
      let g = d.map((b, x) => b.map((v, y) => v + (p[x][y] - v) * m));
      return ((r[0] = g[n][0]), (l[0] &= -8), (g[n][0] = r[0]), g);
    },
    f = (d, [p, m]) => {
      let g = d.map((v) => v[n][p] - m);
      if (g.every((v) => v >= 0) || g.every((v) => v <= 0)) return [d];
      let b = [],
        x = [];
      for (let v = 0; v < d.length; v++) {
        let y = d[v],
          M = d[(v + 1) % d.length],
          S = g[v],
          w = g[(v + 1) % d.length];
        if (((S < 0 ? b : x).push(y), S < 0 != w < 0 && S !== w)) {
          let z = h(y, M, S / (S - w));
          (b.push(z), x.push(z));
        }
      }
      return [b, x].filter((v) => v.length >= 3);
    };
  for (let d = 0; d + 2 < o.length / 3; d += 3) {
    let p = [[c(d), c(d + 1), c(d + 2)]];
    if (!(a[d * 3] & 7)) for (let m of t) p = p.flatMap((g) => f(g, m));
    for (let m of p)
      for (let g = 1; g + 1 < m.length; g++)
        for (let b of [m[0], m[g], m[g + 1]])
          b.forEach((x, v) => {
            for (let y of x) s[v].push(y);
          });
  }
  let u = new De();
  return (
    e.forEach(([d, , p], m) =>
      u.setAttribute(d, new Te(new Float32Array(s[m]), p)),
    ),
    u
  );
}
function ybt() {
  return ho.police.map((i, t) => {
    let e = t % 2 ? -1 : 1,
      s = cx(
        new ks(0.085, 0.09, 0.03, 16)
          .rotateZ(Math.PI / 2)
          .translate(e * (i[4] - 0.045), i[0], i[1]),
        0.3,
        10.5,
      ),
      n = s.attributes.position;
    for (let o = 0; o < n.count; o++) GL(n, o, t + 1);
    return s;
  });
}
function wbt(i, t) {
  let e = wi([yw(i), ...t.map((s) => yw(s))]);
  return e
    ? (e.computeBoundingSphere(), e)
    : (console.warn("police hubcaps: attributes differ"), i);
}
var Mbt = { y0: 0.42 + hx, y1: 1.16 + hx, z0: xw[0], z1: xw[1], u: 0.072 },
  Sbt = {
    P: [
      [0, 0, 1, 5],
      [0, 4, 3, 5],
      [2, 2, 3, 5],
      [0, 2, 3, 3],
    ],
    O: [
      [0, 0, 1, 5],
      [2, 0, 3, 5],
      [0, 0, 3, 1],
      [0, 4, 3, 5],
    ],
    L: [
      [0, 0, 1, 5],
      [0, 0, 3, 1],
    ],
    I: [
      [1, 0, 2, 5],
      [0, 0, 3, 1],
      [0, 4, 3, 5],
    ],
    C: [
      [0, 0, 1, 5],
      [0, 0, 3, 1],
      [0, 4, 3, 5],
    ],
    E: [
      [0, 0, 1, 5],
      [0, 0, 3, 1],
      [0, 4, 3, 5],
      [0, 2, 2.4, 3],
    ],
  };
function kbt(i) {
  let t = i.attributes.position,
    e = t.count,
    s = [],
    n = Mbt,
    o = (w, z, _) => {
      let R = new De();
      (R.setAttribute("position", new Te(new Float32Array(w), 3)),
        R.setAttribute("normal", new Te(new Float32Array(z), 3)),
        s.push(cx(R, 0.3, _)));
    },
    a = (w, z, _, R, T, E, A) => {
      let C = new qs(w, z, _);
      (C.translate(R, T + z / 2, E), s.push(cx(C, 0.3, A)));
    },
    r = (w) => {
      let z = 0;
      for (let _ = 0; _ < e; _++)
        w(t.getX(_), t.getZ(_)) && (z = Math.max(z, t.getY(_)));
      return z;
    },
    l = -0.3,
    c = r(
      (w, z) =>
        Math.abs(w) > 0.42 && Math.abs(w) < 0.68 && Math.abs(z - l) < 0.2,
    ),
    h = r((w, z) => Math.abs(w) < 0.3 && Math.abs(z - l) < 0.2);
  (a(1, c - h + 0.02, 0.26, 0, h - 0.01, l, 3.5),
    a(1.32, 0.035, 0.3, 0, c - 0.005, l, 3.5),
    a(0.54, 0.06, 0.27, 0.32, c + 0.03, l, 4.5),
    a(0.54, 0.06, 0.27, -0.32, c + 0.03, l, 5.5),
    a(0.1, 0.06, 0.25, 0, c + 0.03, l, 2.5));
  for (let w of [-1, 1]) a(0.06, 0.07, 0.29, w * 0.63, c + 0.025, l, 3.5);
  let f = -1.35,
    u = r((w, z) => Math.abs(w) < 0.3 && Math.abs(z - f) < 0.15);
  for (let w of [-0.18, 0.22])
    a(0.014, 0.2, 0.014, w, u - 0.01, f + w * 0.4, 3.5);
  let d = (w, z, _ = 0.04) => {
      let R = 0;
      for (let T = 0; T < e; T++) {
        let E = t.getZ(T);
        E > 1.8 &&
          E > R &&
          Math.abs(t.getX(T) - w) < _ &&
          Math.abs(t.getY(T) - z) < _ &&
          (R = E);
      }
      return R;
    },
    p = hx,
    m = 0.98 + p,
    g = 0.36,
    b = Math.max(
      d(g, 0.55 + p, 0.06),
      d(g, 0.8 + p, 0.06),
      d(0, 0.6 + p, 0.06) - 0.02,
    ),
    x = b + 0.04;
  for (let w of [-1, 1]) {
    a(0.07, m - 0.3 - p, 0.06, w * g, 0.3 + p, x, 3.5);
    for (let z of [0.45, 0.85]) a(0.05, 0.05, 0.1, w * g, z + p, x - 0.07, 3.5);
  }
  (a(0.9, 0.2, 0.04, 0, 0.36 + p, x + 0.02, 3.5),
    a(0.72, 0.05, 0.05, 0, 0.7 + p, x, 3.5),
    a(0.79, 0.06, 0.06, 0, m - 0.06, x, 3.5),
    a(0.12, 0.035, 0.015, 0.18, m - 0.05, x + 0.035, 4.5),
    a(0.12, 0.035, 0.015, -0.18, m - 0.05, x + 0.035, 5.5));
  for (let w of [1, -1]) {
    let z = 0.9 + p,
      _ = 1.08 + p,
      R = [],
      T = [],
      E = [],
      A = [],
      C = [];
    for (let P = 0.47; P <= 0.871; P += 0.04)
      R.push([P, Math.max(d(P, z + 0.03), d(P, _ - 0.03))]);
    for (let P = 0; P + 1 < R.length; P++) {
      let [I, L] = R[P],
        [F, N] = R[P + 1],
        B = (N - L) / (F - I),
        H = Math.hypot(B, 1),
        O = (-B / H) * w,
        D = 1 / H,
        U = (G, q, W, V) => [G * w + O * V, W, q + D * V];
      for (let [G, q, W, V, Y] of [
        [T, E, z, _, 0.012],
        [A, C, _ - 0.035, _ - 0.015, 0.016],
      ])
        for (let $ of [
          U(I, L, W, Y),
          U(F, N, W, Y),
          U(F, N, V, Y),
          U(I, L, W, Y),
          U(F, N, V, Y),
          U(I, L, V, Y),
        ])
          (G.push(...$), q.push(O, 0, D));
    }
    (o(T, E, 9.5), o(A, C, 2.5));
  }
  {
    let w = new ks(0.065, 0.06, 0.15, 12);
    (w.rotateX(Math.PI / 2),
      w.translate(0.9, 1.36 + p, 1.1),
      s.push(cx(w, 0.3, 3.5)),
      a(0.025, 0.08, 0.025, 0.9, 1.26 + p, 1.1, 3.5));
  }
  let v = n.y0 - 0.05,
    y = n.z0 - 0.1,
    M = Math.ceil((n.y1 + 0.05 - v) / 0.05) + 1,
    S = Math.ceil((n.z1 + 0.1 - y) / 0.1) + 1;
  for (let w of [1, -1]) {
    let z = [];
    for (let B = 0; B < M; B++) {
      let H = v + B * 0.05,
        O = [];
      for (let G = 0; G < S; G++) {
        let q = y + G * 0.1,
          W = 0;
        for (let V = 0; V < e; V++) {
          let Y = t.getX(V) * w;
          Y > W &&
            Y < 1.04 &&
            Math.abs(t.getY(V) - H) < 0.06 &&
            Math.abs(t.getZ(V) - q) < 0.12 &&
            (W = Y);
        }
        O.push(W);
      }
      let D = O.filter(Boolean).sort((G, q) => G - q),
        U = D[D.length >> 1] || 0.93;
      for (let G = 0; G < S; G++)
        (!O[G] || Math.abs(O[G] - U) > 0.04) && (O[G] = U);
      z.push(O);
    }
    let _ = z.map((B) => Math.max(...B)),
      R = _.map((B, H) =>
        Math.max(_[Math.max(0, H - 1)], B, _[Math.min(M - 1, H + 1)]),
      ),
      T = (B) => {
        let H = Math.min(M - 1.001, Math.max(0, (B - v) / 0.05)),
          O = Math.floor(H),
          D = H - O;
        return R[O] * (1 - D) + R[O + 1] * D;
      },
      E = (B, H, O, D = 1e9) => {
        let U = [],
          G = [];
        for (let [q, W, V, Y] of B) {
          let $ = Math.max(1, Math.ceil(Math.abs(W - q) / D)),
            st = Math.max(1, Math.ceil(Math.abs(Y - V) / D));
          for (let Q = 0; Q < $; Q++)
            for (let j = 0; j < st; j++) {
              let X = q + ((W - q) * Q) / $,
                K = q + ((W - q) * (Q + 1)) / $,
                nt = V + ((Y - V) * j) / st,
                Z = V + ((Y - V) * (j + 1)) / st,
                et = (tt, it) => [(T(tt) + H) * w, tt, it];
              for (let tt of [
                et(nt, X),
                et(nt, K),
                et(Z, K),
                et(nt, X),
                et(Z, K),
                et(Z, X),
              ])
                (U.push(...tt), G.push(w, 0, 0));
            }
        }
        U.length && o(U, G, O);
      },
      A = n.u,
      C = 23 * A,
      P = (n.z0 + n.z1) / 2,
      I = n.y0 + (n.y1 - n.y0) * 0.44,
      L = 0.016,
      F = [],
      N = [];
    ([..."POLICE"].forEach((B, H) => {
      for (let [O, D, U, G] of Sbt[B]) {
        let q = P - w * ((H * 4 + O) * A - C / 2),
          W = P - w * ((H * 4 + U) * A - C / 2),
          V = I + (D - 2.5) * A,
          Y = I + (G - 2.5) * A;
        (F.push([q, W, V, Y]), N.push([q + w * L, W - w * L, V - L, Y + L]));
      }
    }),
      E(N, 0.01, 6.5, 0.05),
      E(F, 0.018, 3.5, 0.05));
  }
  return s;
}
function wY() {
  let i = Ko.suv,
    t = i.H - 0.04,
    e = [],
    s = (n, o, a, r, l, c, h, f = 20) => {
      let u = new ks(n, o, a, f);
      (u.translate(r, l + a / 2, c), e.push(cx(u, h)));
    };
  (s(0.46, 0.5, 0.1, 0, t, -0.25, 0.3),
    s(0.3, 0.34, 0.08, 0, t + 0.1, -0.25, 0.3),
    s(0.25, 0.25, 0.26, 0, t + 0.18, -0.25, 0.1),
    s(0.27, 0.25, 0.04, 0, t + 0.44, -0.25, 0.3));
  for (let n of [-1, 1])
    for (let o of [i.L / 2 - 0.7, -i.L / 2 + 0.55])
      (s(0.075, 0.09, 0.13, n * (i.bw / 2 - 0.06), 0.86, o, 0.1, 12),
        s(0.07, 0.075, 0.03, n * (i.bw / 2 - 0.06), 0.99, o, 0.3, 12));
  return e;
}
function _bt(i) {
  let t = { sedan: 0, hatch: 1, suv: 2, pickup: 2, van: 3 }[i],
    { T: e, body: s, wheels: n } = Uk()[t],
    o = Ko[i],
    a = wi([s.clone(), n.clone()]);
  return (
    a.scale(o.bw / e.W, o.H / e.roof, o.L / e.L),
    a.computeBoundingSphere(),
    a
  );
}
function qL(i, t) {
  if (i)
    for (let e of Object.values(i))
      e.mat.color.setRGB(
        e.mat.userData.masked ? 0.5 : e.mat.userData.waymo ? 0.9 : 1,
        e.mat.userData.carLamps ? 1 : 0.98,
        1 - t,
      );
}
function ww(i, t, e, s = !1) {
  return (i.copy(t), e && (i.r += 4), s && (i.g += 4), i);
}
En();
as();
var GY = 1.45,
  WY = 1.24,
  zbt = 0.035,
  UY = null,
  d_ = null,
  p_ = null;
