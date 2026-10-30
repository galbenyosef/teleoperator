// app 212 — math
// Lines 114473-114766 of readable/app.pretty.js (statement-aligned).
function NL(o, t, e, s) {
  let n = new Le();
  return (
    n.setAttribute("position", new Te(o, 3)),
    n.setAttribute("normal", new Te(t, 3)),
    n.setAttribute("color", new Te(e, 4)),
    n.setAttribute("uv", new Te(new Float32Array((o.length / 3) * 2), 2)),
    n.setIndex(new Te(s, 1)),
    n.computeBoundingSphere(),
    n
  );
}
function OL(o, t, e, s, n) {
  let i = new ye(t, e);
  return (
    (i.name = s),
    (i.matrixAutoUpdate = !1),
    i.updateMatrix(),
    (i.castShadow = n),
    (i.receiveShadow = !0),
    o.add(i),
    i
  );
}
function mxt(o, t, e, s, n) {
  let a = [],
    r = [],
    l = [],
    c = [],
    h = (f, u, d, p, m, g, b, v) => (
      a.push(f, u, d),
      r.push(p, m, g),
      l.push(v, 0, 0, BL(b)),
      a.length / 3 - 1
    );
  for (let f = 0; f < 64; f++) {
    let u = (f / 64) * 2 * Math.PI,
      d = ((f + 1) / 64) * 2 * Math.PI,
      p = Math.cos(u),
      m = Math.sin(u),
      g = Math.cos(d),
      b = Math.sin(d),
      v = [
        [n, e, 1, 0, 1],
        [n, s - 0.06, 1, 0, 0.1],
        [n - 0.03, s - 0.01, 0.7, 0.7, 0],
        [n - 0.08, s, 0, 1, 0],
      ];
    for (let S = 0; S + 1 < v.length; S++) {
      let [w, _, z, A, T] = v[S],
        [E, R, P, C, I] = v[S + 1],
        L = h(o + p * w, _, t + m * w, p * z, A, m * z, 3, T),
        F = h(o + g * w, _, t + b * w, g * z, A, b * z, 3, T),
        O = h(o + g * E, R, t + b * E, g * P, C, b * P, 3, I),
        B = h(o + p * E, R, t + m * E, p * P, C, m * P, 3, I);
      c.push(L, O, F, L, B, O);
    }
    let x = h(o, s, t, 0, 1, 0, 4, 0),
      y = h(o + p * (n - 0.08), s, t + m * (n - 0.08), 0, 1, 0, 4, 0),
      M = h(o + g * (n - 0.08), s, t + b * (n - 0.08), 0, 1, 0, 4, 0);
    c.push(x, M, y);
  }
  return NL(
    new Float32Array(a),
    new Float32Array(r),
    new Float32Array(l),
    new Uint32Array(c),
  );
}
function gxt(o, t, e, s, n) {
  let i = new DataView(o),
    a = 0,
    r = i.getUint32(0, !0),
    l = i.getUint32(4, !0),
    c = i.getUint32(8, !0),
    h = i.getUint32(12, !0),
    f = i.getFloat32(16, !0);
  a = 20;
  let u = (1.1 / 32767) * f,
    d = Math.atan2(vh.face[0], vh.face[1]),
    p = Math.cos(d),
    m = Math.sin(d),
    g = (F, O, B, H, N) => {
      ((H[N] = t + F * p + B * m),
        (H[N + 1] = e + O),
        (H[N + 2] = s - F * m + B * p));
    },
    b = (F, O, B, H) => {
      ((B[H] = F * p + O * m), (B[H + 2] = -F * m + O * p));
    },
    v = new Float32Array(r * 3);
  for (let F = 0; F < r; F++)
    ((v[F * 3] = i.getInt16(a, !0) * u),
      (v[F * 3 + 1] = i.getInt16(a + 2, !0) * u),
      (v[F * 3 + 2] = i.getInt16(a + 4, !0) * u),
      (a += 6));
  let x = new Uint16Array(l * 2);
  for (let F = 0; F < l * 2; F++) ((x[F] = i.getUint16(a, !0)), (a += 2));
  let y = new Float32Array(c * 3),
    M = new Float32Array(c * 3),
    S = new Float32Array(c * 4),
    w = new Uint8Array(c);
  for (let F = 0; F < c; F++) {
    let O = i.getInt16(a, !0) * u,
      B = i.getInt16(a + 2, !0) * u,
      H = i.getInt16(a + 4, !0) * u,
      N = i.getInt8(a + 6) / 127,
      D = i.getInt8(a + 7) / 127,
      U = i.getInt8(a + 8) / 127;
    ((w[F] = i.getUint8(a + 9)),
      (a += 10),
      g(O, B, H, y, F * 3),
      b(N, U, M, F * 3),
      (M[F * 3 + 1] = D),
      (S[F * 4] = B / f),
      (S[F * 4 + 3] = BL(w[F] ? 2 : 0)));
  }
  let _ = new Uint32Array(h * 3);
  for (let F = 0; F < h * 3; F++) ((_[F] = i.getUint16(a, !0)), (a += 2));
  let z = n ? 3 : 4,
    A = new Float32Array(l * z * 2 * 3),
    T = new Float32Array(A.length),
    E = new Float32Array(l * z * 2 * 4),
    R = new Uint32Array(l * z * 6),
    P = (F) => [M[F * 3], M[F * 3 + 1], M[F * 3 + 2]],
    C = (F) => [y[F * 3], y[F * 3 + 1], y[F * 3 + 2]],
    I = 0,
    L = 0;
  for (let F = 0; F < l; F++) {
    let O = x[F * 2],
      B = x[F * 2 + 1],
      H = C(O),
      N = C(B),
      D = P(O),
      U = P(B),
      G = [N[0] - H[0], N[1] - H[1], N[2] - H[2]],
      W = Math.hypot(...G);
    if (W < 0.13) continue;
    let V = Math.min(0.04, Math.max(0.008, 0.004 + 0.085 * W)),
      $ = V * 0.7,
      J = [D[0] + U[0], D[1] + U[1], D[2] + U[2]],
      X = G.map((nt) => nt / W),
      tt = J[0] * X[0] + J[1] * X[1] + J[2] * X[2],
      Z = [J[0] - X[0] * tt, J[1] - X[1] * tt, J[2] - X[2] * tt],
      q = Math.hypot(...Z);
    (q < 1e-5 &&
      ((Z = Math.abs(X[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]),
      (tt = Z[0] * X[0] + Z[1] * X[1] + Z[2] * X[2]),
      (Z = [Z[0] - X[0] * tt, Z[1] - X[1] * tt, Z[2] - X[2] * tt]),
      (q = Math.hypot(...Z))),
      (Z = Z.map((nt) => nt / q)));
    let j = [
        X[1] * Z[2] - X[2] * Z[1],
        X[2] * Z[0] - X[0] * Z[2],
        X[0] * Z[1] - X[1] * Z[0],
      ],
      K = I;
    for (let nt = 0; nt < z; nt++) {
      let Q = ((nt + 0.5) / z) * 2 * Math.PI,
        et = Math.cos(Q),
        st = Math.sin(Q),
        ot = [
          Z[0] * et + j[0] * st,
          Z[1] * et + j[1] * st,
          Z[2] * et + j[2] * st,
        ];
      for (let [rt, lt, ht] of [
        [H, D, S[O * 4]],
        [N, U, S[B * 4]],
      ])
        ((A[I * 3] = rt[0] + lt[0] * $ + ot[0] * V),
          (A[I * 3 + 1] = rt[1] + lt[1] * $ + ot[1] * V),
          (A[I * 3 + 2] = rt[2] + lt[2] * $ + ot[2] * V),
          (T[I * 3] = ot[0]),
          (T[I * 3 + 1] = ot[1]),
          (T[I * 3 + 2] = ot[2]),
          (E[I * 4] = ht),
          (E[I * 4 + 3] = BL(w[O] && w[B] ? 2 : 1)),
          I++);
    }
    for (let nt = 0; nt < z; nt++) {
      let Q = K + nt * 2,
        et = Q + 1,
        st = K + ((nt + 1) % z) * 2,
        ot = st + 1;
      ((R[L++] = Q),
        (R[L++] = st),
        (R[L++] = ot),
        (R[L++] = Q),
        (R[L++] = ot),
        (R[L++] = et));
    }
  }
  return {
    skin: NL(y, M, S, _),
    tubes: NL(
      A.subarray(0, I * 3),
      T.subarray(0, I * 3),
      E.subarray(0, I * 4),
      R.subarray(0, L),
    ),
    tris: h + L / 3,
  };
}
function xY(o, t) {
  let [e, s] = vh.at,
    n = t.L || t.layout,
    i = -1e9;
  for (let f = 0; f <= 24; f++)
    for (let u of [0, vh.plinthR * 0.5, vh.plinthR]) {
      let d = (f / 24) * 2 * Math.PI,
        p = n.terrainAt(e + Math.cos(d) * u, s + Math.sin(d) * u);
      p > i && (i = p);
    }
  let a = i - 0.25,
    r = i + vh.plinthH;
  if (
    (t.colliders.push({
      t: "circ",
      x: e,
      z: s,
      r: vh.plinthR,
      y0: a - 1,
      y1: r + 14,
    }),
    (vh.top = r),
    t.headless || !Mp())
  )
    return;
  let l = o.rc?.group || o.group,
    c = pxt(t),
    h = !!globalThis.SF_LITE;
  ex(() =>
    bo("assets/lm/revolution.bin")
      .then((f) => {
        let u = performance.now(),
          d = gxt(f, e, r, s, h),
          p = [
            [
              OL(l, mxt(e, s, a, r, vh.plinthR), c.steel, "revo_plinth", !0),
              700,
            ],
            [OL(l, d.skin, c.skin, "revo_skin", !h), 1150],
            [OL(l, d.tubes, c.steel, "revo_tubes", !1), 320],
          ],
          m = 0;
        (t.onUpdate.push((g, b, v) => {
          if ((m -= v) > 0) return;
          m = 0.25;
          let x = Math.hypot(g - e, b - s);
          for (let [y, M] of p) y.visible = x < M;
        }),
          console.log(
            `R-Evolution: ${d.tris} triangles, ${(performance.now() - u).toFixed(0)} ms`,
          ));
      })
      .catch((f) => console.warn("R-Evolution:", f)),
  );
}
var bxt = "skyline",
  Cz = !!globalThis.location?.search?.includes("noskyline"),
  xxt = Cz
    ? []
    : [
        [12, 13],
        [8, 20],
        [5, 15],
        [7, 15],
        [8, 5],
        [11, 16],
      ],
  HL = bj,
  DL = [
    "Salesforce Tower",
    "Salesforce Transit Center",
    "Transamerica Pyramid",
    "555 California Street",
    "Coit Tower",
    "Grace Cathedral",
    "Saints Peter and Paul Church",
    "Fairmont San Francisco",
  ];
function vxt(o) {
  if (Cz) return;
  XP();
  let t = $P(o),
    e = [QP, tC, eC, sC, nC, iC, oC, hC, xj, lC, cC];
  for (let s of e)
    try {
      s(o, t);
    } catch (n) {
      console.error("skyline:", s.name, n);
    }
}
