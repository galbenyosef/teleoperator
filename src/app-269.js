// app 269 — math
// Lines 134842-135191 of readable/app.pretty.js (statement-aligned).
function V3t(o, t) {
  let e = Object.entries(o.attributes).map(([d, p]) => [
      d,
      p.array,
      p.itemSize,
    ]),
    s = e.map(() => []),
    n = e.findIndex((d) => d[0] === "position"),
    i = o.attributes.position.array,
    a = new Uint32Array(i.buffer, i.byteOffset, i.length),
    r = new Float32Array(1),
    l = new Uint32Array(r.buffer),
    c = (d) => e.map(([, p, m]) => Array.from(p.subarray(d * m, d * m + m))),
    h = (d, p, m) => {
      let g = d.map((b, v) => b.map((x, y) => x + (p[v][y] - x) * m));
      return ((r[0] = g[n][0]), (l[0] &= -8), (g[n][0] = r[0]), g);
    },
    f = (d, [p, m]) => {
      let g = d.map((x) => x[n][p] - m);
      if (g.every((x) => x >= 0) || g.every((x) => x <= 0)) return [d];
      let b = [],
        v = [];
      for (let x = 0; x < d.length; x++) {
        let y = d[x],
          M = d[(x + 1) % d.length],
          S = g[x],
          w = g[(x + 1) % d.length];
        if (((S < 0 ? b : v).push(y), S < 0 != w < 0 && S !== w)) {
          let _ = h(y, M, S / (S - w));
          (b.push(_), v.push(_));
        }
      }
      return [b, v].filter((x) => x.length >= 3);
    };
  for (let d = 0; d + 2 < i.length / 3; d += 3) {
    let p = [[c(d), c(d + 1), c(d + 2)]];
    if (!(a[d * 3] & 7)) for (let m of t) p = p.flatMap((g) => f(g, m));
    for (let m of p)
      for (let g = 1; g + 1 < m.length; g++)
        for (let b of [m[0], m[g], m[g + 1]])
          b.forEach((v, x) => {
            for (let y of v) s[x].push(y);
          });
  }
  let u = new Le();
  return (
    e.forEach(([d, , p], m) =>
      u.setAttribute(d, new Te(new Float32Array(s[m]), p)),
    ),
    u
  );
}
function W3t() {
  return ro.police.map((o, t) => {
    let e = t % 2 ? -1 : 1,
      s = Xx(
        new vs(0.085, 0.09, 0.03, 16)
          .rotateZ(Math.PI / 2)
          .translate(e * (o[4] - 0.045), o[0], o[1]),
        0.3,
        10.5,
      ),
      n = s.attributes.position;
    for (let i = 0; i < n.count; i++) xF(n, i, t + 1);
    return s;
  });
}
function q3t(o, t) {
  let e = wi([gM(o), ...t.map((s) => gM(s))]);
  return e
    ? (e.computeBoundingSphere(), e)
    : (console.warn("police hubcaps: attributes differ"), o);
}
var j3t = { y0: 0.42 + Kx, y1: 1.16 + Kx, z0: pM[0], z1: pM[1], u: 0.072 },
  $3t = {
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
function X3t(o) {
  let t = o.attributes.position,
    e = t.count,
    s = [],
    n = j3t,
    i = (w, _, z) => {
      let A = new Le();
      (A.setAttribute("position", new Te(new Float32Array(w), 3)),
        A.setAttribute("normal", new Te(new Float32Array(_), 3)),
        s.push(Xx(A, 0.3, z)));
    },
    a = (w, _, z, A, T, E, R) => {
      let P = new Is(w, _, z);
      (P.translate(A, T + _ / 2, E), s.push(Xx(P, 0.3, R)));
    },
    r = (w) => {
      let _ = 0;
      for (let z = 0; z < e; z++)
        w(t.getX(z), t.getZ(z)) && (_ = Math.max(_, t.getY(z)));
      return _;
    },
    l = -0.3,
    c = r(
      (w, _) =>
        Math.abs(w) > 0.42 && Math.abs(w) < 0.68 && Math.abs(_ - l) < 0.2,
    ),
    h = r((w, _) => Math.abs(w) < 0.3 && Math.abs(_ - l) < 0.2);
  (a(1, c - h + 0.02, 0.26, 0, h - 0.01, l, 3.5),
    a(1.32, 0.035, 0.3, 0, c - 0.005, l, 3.5),
    a(0.54, 0.06, 0.27, 0.32, c + 0.03, l, 4.5),
    a(0.54, 0.06, 0.27, -0.32, c + 0.03, l, 5.5),
    a(0.1, 0.06, 0.25, 0, c + 0.03, l, 2.5));
  for (let w of [-1, 1]) a(0.06, 0.07, 0.29, w * 0.63, c + 0.025, l, 3.5);
  let f = -1.35,
    u = r((w, _) => Math.abs(w) < 0.3 && Math.abs(_ - f) < 0.15);
  for (let w of [-0.18, 0.22])
    a(0.014, 0.2, 0.014, w, u - 0.01, f + w * 0.4, 3.5);
  let d = (w, _, z = 0.04) => {
      let A = 0;
      for (let T = 0; T < e; T++) {
        let E = t.getZ(T);
        E > 1.8 &&
          E > A &&
          Math.abs(t.getX(T) - w) < z &&
          Math.abs(t.getY(T) - _) < z &&
          (A = E);
      }
      return A;
    },
    p = Kx,
    m = 0.98 + p,
    g = 0.36,
    b = Math.max(
      d(g, 0.55 + p, 0.06),
      d(g, 0.8 + p, 0.06),
      d(0, 0.6 + p, 0.06) - 0.02,
    ),
    v = b + 0.04;
  for (let w of [-1, 1]) {
    a(0.07, m - 0.3 - p, 0.06, w * g, 0.3 + p, v, 3.5);
    for (let _ of [0.45, 0.85]) a(0.05, 0.05, 0.1, w * g, _ + p, v - 0.07, 3.5);
  }
  (a(0.9, 0.2, 0.04, 0, 0.36 + p, v + 0.02, 3.5),
    a(0.72, 0.05, 0.05, 0, 0.7 + p, v, 3.5),
    a(0.79, 0.06, 0.06, 0, m - 0.06, v, 3.5),
    a(0.12, 0.035, 0.015, 0.18, m - 0.05, v + 0.035, 4.5),
    a(0.12, 0.035, 0.015, -0.18, m - 0.05, v + 0.035, 5.5));
  for (let w of [1, -1]) {
    let _ = 0.9 + p,
      z = 1.08 + p,
      A = [],
      T = [],
      E = [],
      R = [],
      P = [];
    for (let C = 0.47; C <= 0.871; C += 0.04)
      A.push([C, Math.max(d(C, _ + 0.03), d(C, z - 0.03))]);
    for (let C = 0; C + 1 < A.length; C++) {
      let [I, L] = A[C],
        [F, O] = A[C + 1],
        B = (O - L) / (F - I),
        H = Math.hypot(B, 1),
        N = (-B / H) * w,
        D = 1 / H,
        U = (G, W, V, $) => [G * w + N * $, V, W + D * $];
      for (let [G, W, V, $, J] of [
        [T, E, _, z, 0.012],
        [R, P, z - 0.035, z - 0.015, 0.016],
      ])
        for (let X of [
          U(I, L, V, J),
          U(F, O, V, J),
          U(F, O, $, J),
          U(I, L, V, J),
          U(F, O, $, J),
          U(I, L, $, J),
        ])
          (G.push(...X), W.push(N, 0, D));
    }
    (i(T, E, 9.5), i(R, P, 2.5));
  }
  {
    let w = new vs(0.065, 0.06, 0.15, 12);
    (w.rotateX(Math.PI / 2),
      w.translate(0.9, 1.36 + p, 1.1),
      s.push(Xx(w, 0.3, 3.5)),
      a(0.025, 0.08, 0.025, 0.9, 1.26 + p, 1.1, 3.5));
  }
  let x = n.y0 - 0.05,
    y = n.z0 - 0.1,
    M = Math.ceil((n.y1 + 0.05 - x) / 0.05) + 1,
    S = Math.ceil((n.z1 + 0.1 - y) / 0.1) + 1;
  for (let w of [1, -1]) {
    let _ = [];
    for (let B = 0; B < M; B++) {
      let H = x + B * 0.05,
        N = [];
      for (let G = 0; G < S; G++) {
        let W = y + G * 0.1,
          V = 0;
        for (let $ = 0; $ < e; $++) {
          let J = t.getX($) * w;
          J > V &&
            J < 1.04 &&
            Math.abs(t.getY($) - H) < 0.06 &&
            Math.abs(t.getZ($) - W) < 0.12 &&
            (V = J);
        }
        N.push(V);
      }
      let D = N.filter(Boolean).sort((G, W) => G - W),
        U = D[D.length >> 1] || 0.93;
      for (let G = 0; G < S; G++)
        (!N[G] || Math.abs(N[G] - U) > 0.04) && (N[G] = U);
      _.push(N);
    }
    let z = _.map((B) => Math.max(...B)),
      A = z.map((B, H) =>
        Math.max(z[Math.max(0, H - 1)], B, z[Math.min(M - 1, H + 1)]),
      ),
      T = (B) => {
        let H = Math.min(M - 1.001, Math.max(0, (B - x) / 0.05)),
          N = Math.floor(H),
          D = H - N;
        return A[N] * (1 - D) + A[N + 1] * D;
      },
      E = (B, H, N, D = 1e9) => {
        let U = [],
          G = [];
        for (let [W, V, $, J] of B) {
          let X = Math.max(1, Math.ceil(Math.abs(V - W) / D)),
            tt = Math.max(1, Math.ceil(Math.abs(J - $) / D));
          for (let Z = 0; Z < X; Z++)
            for (let q = 0; q < tt; q++) {
              let j = W + ((V - W) * Z) / X,
                K = W + ((V - W) * (Z + 1)) / X,
                nt = $ + ((J - $) * q) / tt,
                Q = $ + ((J - $) * (q + 1)) / tt,
                et = (st, ot) => [(T(st) + H) * w, st, ot];
              for (let st of [
                et(nt, j),
                et(nt, K),
                et(Q, K),
                et(nt, j),
                et(Q, K),
                et(Q, j),
              ])
                (U.push(...st), G.push(w, 0, 0));
            }
        }
        U.length && i(U, G, N);
      },
      R = n.u,
      P = 23 * R,
      C = (n.z0 + n.z1) / 2,
      I = n.y0 + (n.y1 - n.y0) * 0.44,
      L = 0.016,
      F = [],
      O = [];
    ([..."POLICE"].forEach((B, H) => {
      for (let [N, D, U, G] of $3t[B]) {
        let W = C - w * ((H * 4 + N) * R - P / 2),
          V = C - w * ((H * 4 + U) * R - P / 2),
          $ = I + (D - 2.5) * R,
          J = I + (G - 2.5) * R;
        (F.push([W, V, $, J]), O.push([W + w * L, V - w * L, $ - L, J + L]));
      }
    }),
      E(O, 0.01, 6.5, 0.05),
      E(F, 0.018, 3.5, 0.05));
  }
  return s;
}
function kZ() {
  let o = Io.suv,
    t = o.H - 0.04,
    e = [],
    s = (n, i, a, r, l, c, h, f = 20) => {
      let u = new vs(n, i, a, f);
      (u.translate(r, l + a / 2, c), e.push(Xx(u, h)));
    };
  (s(0.46, 0.5, 0.1, 0, t, -0.25, 0.3),
    s(0.3, 0.34, 0.08, 0, t + 0.1, -0.25, 0.3),
    s(0.25, 0.25, 0.26, 0, t + 0.18, -0.25, 0.1),
    s(0.27, 0.25, 0.04, 0, t + 0.44, -0.25, 0.3));
  for (let n of [-1, 1])
    for (let i of [o.L / 2 - 0.7, -o.L / 2 + 0.55])
      (s(0.075, 0.09, 0.13, n * (o.bw / 2 - 0.06), 0.86, i, 0.1, 12),
        s(0.07, 0.075, 0.03, n * (o.bw / 2 - 0.06), 0.99, i, 0.3, 12));
  return e;
}
function K3t(o) {
  let t = { sedan: 0, hatch: 1, suv: 2, pickup: 2, van: 3 }[o],
    { T: e, body: s, wheels: n } = Uz()[t],
    i = Io[o],
    a = wi([s.clone(), n.clone()]);
  return (
    a.scale(i.bw / e.W, i.H / e.roof, i.L / e.L),
    a.computeBoundingSphere(),
    a
  );
}
function yF(o, t) {
  if (o)
    for (let e of Object.values(o))
      e.mat.color.setRGB(
        e.mat.userData.masked ? 0.5 : e.mat.userData.waymo ? 0.9 : 1,
        e.mat.userData.carLamps ? 1 : 0.98,
        1 - t,
      );
}
function Zx(o, t, e, s = !1) {
  return (o.copy(t), e && (o.r += 4), s && (o.g += 4), o);
}
Pn();
es();
var qZ = 1.45,
  jZ = 1.24,
  Y3t = 0.035,
  WZ = null,
  d_ = null,
  p_ = null;
