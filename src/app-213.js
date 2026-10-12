// app 213 — math
// Lines 114217-114510 of readable/app.pretty.js (statement-aligned).
function lC(i, t, e, s) {
  let n = new De();
  return (
    n.setAttribute("position", new Te(i, 3)),
    n.setAttribute("normal", new Te(t, 3)),
    n.setAttribute("color", new Te(e, 4)),
    n.setAttribute("uv", new Te(new Float32Array((i.length / 3) * 2), 2)),
    n.setIndex(new Te(s, 1)),
    n.computeBoundingSphere(),
    n
  );
}
function aC(i, t, e, s, n) {
  let o = new _e(t, e);
  return (
    (o.name = s),
    (o.matrixAutoUpdate = !1),
    o.updateMatrix(),
    (o.castShadow = n),
    (o.receiveShadow = !0),
    i.add(o),
    o
  );
}
function jmt(i, t, e, s, n) {
  let a = [],
    r = [],
    l = [],
    c = [],
    h = (f, u, d, p, m, g, b, x) => (
      a.push(f, u, d),
      r.push(p, m, g),
      l.push(x, 0, 0, rC(b)),
      a.length / 3 - 1
    );
  for (let f = 0; f < 64; f++) {
    let u = (f / 64) * 2 * Math.PI,
      d = ((f + 1) / 64) * 2 * Math.PI,
      p = Math.cos(u),
      m = Math.sin(u),
      g = Math.cos(d),
      b = Math.sin(d),
      x = [
        [n, e, 1, 0, 1],
        [n, s - 0.06, 1, 0, 0.1],
        [n - 0.03, s - 0.01, 0.7, 0.7, 0],
        [n - 0.08, s, 0, 1, 0],
      ];
    for (let S = 0; S + 1 < x.length; S++) {
      let [w, z, _, R, T] = x[S],
        [E, A, C, P, I] = x[S + 1],
        L = h(i + p * w, z, t + m * w, p * _, R, m * _, 3, T),
        F = h(i + g * w, z, t + b * w, g * _, R, b * _, 3, T),
        N = h(i + g * E, A, t + b * E, g * C, P, b * C, 3, I),
        B = h(i + p * E, A, t + m * E, p * C, P, m * C, 3, I);
      c.push(L, N, F, L, B, N);
    }
    let v = h(i, s, t, 0, 1, 0, 4, 0),
      y = h(i + p * (n - 0.08), s, t + m * (n - 0.08), 0, 1, 0, 4, 0),
      M = h(i + g * (n - 0.08), s, t + b * (n - 0.08), 0, 1, 0, 4, 0);
    c.push(v, M, y);
  }
  return lC(
    new Float32Array(a),
    new Float32Array(r),
    new Float32Array(l),
    new Uint32Array(c),
  );
}
function Vmt(i, t, e, s, n) {
  let o = new DataView(i),
    a = 0,
    r = o.getUint32(0, !0),
    l = o.getUint32(4, !0),
    c = o.getUint32(8, !0),
    h = o.getUint32(12, !0),
    f = o.getFloat32(16, !0);
  a = 20;
  let u = (1.1 / 32767) * f,
    d = Math.atan2(Wc.face[0], Wc.face[1]),
    p = Math.cos(d),
    m = Math.sin(d),
    g = (F, N, B, H, O) => {
      ((H[O] = t + F * p + B * m),
        (H[O + 1] = e + N),
        (H[O + 2] = s - F * m + B * p));
    },
    b = (F, N, B, H) => {
      ((B[H] = F * p + N * m), (B[H + 2] = -F * m + N * p));
    },
    x = new Float32Array(r * 3);
  for (let F = 0; F < r; F++)
    ((x[F * 3] = o.getInt16(a, !0) * u),
      (x[F * 3 + 1] = o.getInt16(a + 2, !0) * u),
      (x[F * 3 + 2] = o.getInt16(a + 4, !0) * u),
      (a += 6));
  let v = new Uint16Array(l * 2);
  for (let F = 0; F < l * 2; F++) ((v[F] = o.getUint16(a, !0)), (a += 2));
  let y = new Float32Array(c * 3),
    M = new Float32Array(c * 3),
    S = new Float32Array(c * 4),
    w = new Uint8Array(c);
  for (let F = 0; F < c; F++) {
    let N = o.getInt16(a, !0) * u,
      B = o.getInt16(a + 2, !0) * u,
      H = o.getInt16(a + 4, !0) * u,
      O = o.getInt8(a + 6) / 127,
      D = o.getInt8(a + 7) / 127,
      U = o.getInt8(a + 8) / 127;
    ((w[F] = o.getUint8(a + 9)),
      (a += 10),
      g(N, B, H, y, F * 3),
      b(O, U, M, F * 3),
      (M[F * 3 + 1] = D),
      (S[F * 4] = B / f),
      (S[F * 4 + 3] = rC(w[F] ? 2 : 0)));
  }
  let z = new Uint32Array(h * 3);
  for (let F = 0; F < h * 3; F++) ((z[F] = o.getUint16(a, !0)), (a += 2));
  let _ = n ? 3 : 4,
    R = new Float32Array(l * _ * 2 * 3),
    T = new Float32Array(R.length),
    E = new Float32Array(l * _ * 2 * 4),
    A = new Uint32Array(l * _ * 6),
    C = (F) => [M[F * 3], M[F * 3 + 1], M[F * 3 + 2]],
    P = (F) => [y[F * 3], y[F * 3 + 1], y[F * 3 + 2]],
    I = 0,
    L = 0;
  for (let F = 0; F < l; F++) {
    let N = v[F * 2],
      B = v[F * 2 + 1],
      H = P(N),
      O = P(B),
      D = C(N),
      U = C(B),
      G = [O[0] - H[0], O[1] - H[1], O[2] - H[2]],
      q = Math.hypot(...G);
    if (q < 0.13) continue;
    let W = Math.min(0.04, Math.max(0.008, 0.004 + 0.085 * q)),
      V = W * 0.7,
      Y = [D[0] + U[0], D[1] + U[1], D[2] + U[2]],
      $ = G.map((nt) => nt / q),
      st = Y[0] * $[0] + Y[1] * $[1] + Y[2] * $[2],
      Q = [Y[0] - $[0] * st, Y[1] - $[1] * st, Y[2] - $[2] * st],
      j = Math.hypot(...Q);
    (j < 1e-5 &&
      ((Q = Math.abs($[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]),
      (st = Q[0] * $[0] + Q[1] * $[1] + Q[2] * $[2]),
      (Q = [Q[0] - $[0] * st, Q[1] - $[1] * st, Q[2] - $[2] * st]),
      (j = Math.hypot(...Q))),
      (Q = Q.map((nt) => nt / j)));
    let X = [
        $[1] * Q[2] - $[2] * Q[1],
        $[2] * Q[0] - $[0] * Q[2],
        $[0] * Q[1] - $[1] * Q[0],
      ],
      K = I;
    for (let nt = 0; nt < _; nt++) {
      let Z = ((nt + 0.5) / _) * 2 * Math.PI,
        et = Math.cos(Z),
        tt = Math.sin(Z),
        it = [
          Q[0] * et + X[0] * tt,
          Q[1] * et + X[1] * tt,
          Q[2] * et + X[2] * tt,
        ];
      for (let [rt, lt, ct] of [
        [H, D, S[N * 4]],
        [O, U, S[B * 4]],
      ])
        ((R[I * 3] = rt[0] + lt[0] * V + it[0] * W),
          (R[I * 3 + 1] = rt[1] + lt[1] * V + it[1] * W),
          (R[I * 3 + 2] = rt[2] + lt[2] * V + it[2] * W),
          (T[I * 3] = it[0]),
          (T[I * 3 + 1] = it[1]),
          (T[I * 3 + 2] = it[2]),
          (E[I * 4] = ct),
          (E[I * 4 + 3] = rC(w[N] && w[B] ? 2 : 1)),
          I++);
    }
    for (let nt = 0; nt < _; nt++) {
      let Z = K + nt * 2,
        et = Z + 1,
        tt = K + ((nt + 1) % _) * 2,
        it = tt + 1;
      ((A[L++] = Z),
        (A[L++] = tt),
        (A[L++] = it),
        (A[L++] = Z),
        (A[L++] = it),
        (A[L++] = et));
    }
  }
  return {
    skin: lC(y, M, S, z),
    tubes: lC(
      R.subarray(0, I * 3),
      T.subarray(0, I * 3),
      E.subarray(0, I * 4),
      A.subarray(0, L),
    ),
    tris: h + L / 3,
  };
}
function mX(i, t) {
  let [e, s] = Wc.at,
    n = t.L || t.layout,
    o = -1e9;
  for (let f = 0; f <= 24; f++)
    for (let u of [0, Wc.plinthR * 0.5, Wc.plinthR]) {
      let d = (f / 24) * 2 * Math.PI,
        p = n.terrainAt(e + Math.cos(d) * u, s + Math.sin(d) * u);
      p > o && (o = p);
    }
  let a = o - 0.25,
    r = o + Wc.plinthH;
  if (
    (t.colliders.push({
      t: "circ",
      x: e,
      z: s,
      r: Wc.plinthR,
      y0: a - 1,
      y1: r + 14,
    }),
    (Wc.top = r),
    t.headless || !qd())
  )
    return;
  let l = i.rc?.group || i.group,
    c = qmt(t),
    h = !!globalThis.SF_LITE;
  mb(() =>
    io("assets/lm/revolution.bin")
      .then((f) => {
        let u = performance.now(),
          d = Vmt(f, e, r, s, h),
          p = [
            [
              aC(l, jmt(e, s, a, r, Wc.plinthR), c.steel, "revo_plinth", !0),
              700,
            ],
            [aC(l, d.skin, c.skin, "revo_skin", !h), 1150],
            [aC(l, d.tubes, c.steel, "revo_tubes", !1), 320],
          ],
          m = 0;
        (t.onUpdate.push((g, b, x) => {
          if ((m -= x) > 0) return;
          m = 0.25;
          let v = Math.hypot(g - e, b - s);
          for (let [y, M] of p) y.visible = v < M;
        }),
          console.log(
            `R-Evolution: ${d.tris} triangles, ${(performance.now() - u).toFixed(0)} ms`,
          ));
      })
      .catch((f) => console.warn("R-Evolution:", f)),
  );
}
var $mt = "skyline",
  Ck = !!globalThis.location?.search?.includes("noskyline"),
  Xmt = Ck
    ? []
    : [
        [12, 13],
        [8, 20],
        [5, 15],
        [7, 15],
        [8, 5],
        [11, 16],
      ],
  cC = mq,
  hC = [
    "Salesforce Tower",
    "Salesforce Transit Center",
    "Transamerica Pyramid",
    "555 California Street",
    "Coit Tower",
    "Grace Cathedral",
    "Saints Peter and Paul Church",
    "Fairmont San Francisco",
  ];
function Kmt(i) {
  if (Ck) return;
  b7();
  let t = g7(i),
    e = [M7, S7, k7, _7, z7, E7, T7, L7, gq, P7, C7];
  for (let s of e)
    try {
      s(i, t);
    } catch (n) {
      console.error("skyline:", s.name, n);
    }
}
