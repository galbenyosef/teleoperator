// app 319 — math
// Lines 152745-153049 of readable/app.pretty.js (statement-aligned).
es();
function Xtt(o, t) {
  let e = [],
    s = new fe().copy(o.root.matrixWorld).invert(),
    n = new fe(),
    i = new dt();
  return (
    o.root.updateMatrixWorld(!0),
    o.body.traverse((a) => {
      if (
        !a.isMesh ||
        !a.geometry?.attributes?.position ||
        a.name === "Underbody"
      )
        return;
      let r = a.geometry.attributes.position,
        l = r.count,
        c = Math.max(1, Math.floor(l / 15e4));
      for (let h = 0; h < l; h += c)
        (i.set(r.getX(h), r.getY(h), r.getZ(h)).applyMatrix4(n),
          i.y < t && e.push([i.x, i.y, i.z]));
    }),
    e
  );
}
function eE(o, t, e, s) {
  let n = new dt(...o),
    i = new dt(...t),
    a = n.distanceTo(i),
    r = new Is(e, s, a),
    l = new tn().setFromUnitVectors(
      new dt(0, 0, 1),
      i.clone().sub(n).normalize(),
    );
  return (
    r.applyQuaternion(l),
    r.translate((n.x + i.x) / 2, (n.y + i.y) / 2, (n.z + i.z) / 2),
    r
  );
}
function RO(o, t, e) {
  let s = new dt(...o),
    n = new dt(...t),
    i = new vs(e, e, s.distanceTo(n), 10, 1);
  return (
    i.applyQuaternion(
      new tn().setFromUnitVectors(
        new dt(0, 1, 0),
        n.clone().sub(s).normalize(),
      ),
    ),
    i.translate((s.x + n.x) / 2, (s.y + n.y) / 2, (s.z + n.z) / 2),
    i
  );
}
var bv = (o, t, e, s, n, i) => new Is(s, n, i).translate(o, t, e),
  AO = (o) => {
    o = o.index ? o.toNonIndexed() : o;
    for (let t of Object.keys(o.attributes))
      t !== "position" && t !== "normal" && o.deleteAttribute(t);
    return o;
  };
function Ktt(o, { ev: t = !1, rear: e = !0, front: s = !1 } = {}) {
  if (!o?.root || !o.body) return null;
  let n = o.body.position.clone(),
    i = o.body.rotation.clone();
  (o.body.position.set(0, 0, 0), o.body.rotation.set(0, 0, 0));
  try {
    return qwt(o, t, e, s);
  } finally {
    (o.body.position.copy(n),
      o.body.rotation.copy(i),
      o.root.updateMatrixWorld(!0));
  }
}
function qwt(o, t, e, s) {
  o.root.updateMatrixWorld(!0);
  let n = (o.wheels || []).map((j) => {
      let K = new dt();
      return (
        (j.spin || j.steer).getWorldPosition(K),
        o.root.worldToLocal(K),
        K
      );
    }),
    i = Xtt(o, 0.5).filter(
      (j) =>
        !n.some(
          (K) =>
            Math.hypot(j[0] - K.x, j[2] - K.z) < 0.55 &&
            Math.abs(j[0]) > Math.abs(K.x) - 0.35,
        ),
    );
  if (i.length < 50) return null;
  let a = n.map((j) => j.z),
    r = n.length ? Math.min(...a) + 0.3 : -1 / 0,
    l = n.length ? Math.max(...a) - 0.3 : 1 / 0,
    c = i.filter((j) => j[2] > r && j[2] < l),
    h = (c.length > 30 ? c : i).map((j) => j[1]).sort((j, K) => j - K),
    f = Math.max(0.04, h[0] - 0.005),
    u = n.length
      ? Math.max(
          0.28,
          Math.min(0.42, n.reduce((j, K) => j + K.y, 0) / n.length),
        )
      : 0.33,
    d = Xtt(o, 0.9).filter(
      (j) =>
        !n.some(
          (K) =>
            Math.hypot(j[0] - K.x, j[2] - K.z) < 0.55 &&
            Math.abs(j[0]) > Math.abs(K.x) - 0.35,
        ),
    ),
    p = 1 / 0,
    m = -1 / 0;
  for (let j of d) ((p = Math.min(p, j[2])), (m = Math.max(m, j[2])));
  let g = 0.08,
    b = Math.ceil((m - p) / g) + 1,
    v = Array.from({ length: b }, () => ({ m: 1 / 0, a: 1 / 0, b: -1 / 0 }));
  for (let j of d) {
    let K = Math.floor((j[2] - p) / g);
    v[K].m = Math.min(v[K].m, j[1]);
  }
  for (let j of d) {
    let K = Math.floor((j[2] - p) / g);
    j[1] < v[K].m + 0.25 &&
      ((v[K].a = Math.min(v[K].a, j[0])), (v[K].b = Math.max(v[K].b, j[0])));
  }
  let x = v.map((j) => j.b - j.a > 0.5),
    y = x.indexOf(!0),
    M = x.lastIndexOf(!0);
  if (y < 0 || M - y < 10) return null;
  for (let j = y; j <= M; j++)
    if (!x[j]) {
      let K = j - 1;
      for (; !x[K];) K--;
      let nt = j + 1;
      for (; !x[nt];) nt++;
      let Q = (j - K) / (nt - K);
      for (let et of ["m", "a", "b"])
        v[j][et] = v[K][et] + (v[nt][et] - v[K][et]) * Q;
    }
  let S = [];
  for (let j = y; j <= M; j++) {
    let K = v[j];
    S.push({
      z: p + (j + 0.5) * g,
      y: Math.max(f, K.m - 0.005),
      a: K.a + 0.07,
      b: K.b - 0.07,
    });
  }
  for (let j = 1; j + 1 < S.length; j++)
    S[j].y2 = Math.max(f, (S[j - 1].y + S[j].y + S[j + 1].y) / 3);
  for (let j = 1; j + 1 < S.length; j++) S[j].y = S[j].y2;
  let w = S[0].z,
    _ = S.at(-1).z,
    z = (w + _) / 2,
    A = (j) =>
      S[Math.max(0, Math.min(S.length - 1, Math.round((j - w) / g)))].y,
    T = n.filter((j) => j.z < z),
    E = n.filter((j) => j.z >= z),
    R = n.length ? Math.min(...n.map((j) => Math.abs(j.x))) - 0.2 : 0.5,
    P = T.length ? Math.min(...T.map((j) => j.z)) - u - 0.06 : w,
    C = T.length ? Math.max(...T.map((j) => j.z)) + u + 0.06 : w,
    I = E.length ? Math.min(...E.map((j) => j.z)) - u - 0.06 : _,
    L = E.length ? Math.max(...E.map((j) => j.z)) + u + 0.06 : _,
    F = n.length ? P - 0.25 : -1 / 0,
    O = n.length ? L + 0.25 : 1 / 0;
  for (let j of S)
    if (
      j.z < F &&
      j.y - f < 0.06 &&
      S.every((K) => K.z < j.z || K.z > F || K.y - f < 0.06)
    ) {
      F = j.z;
      break;
    }
  for (let j = S.length - 1; j >= 0; j--) {
    let K = S[j];
    if (
      K.z > O &&
      K.y - f < 0.06 &&
      S.every((nt) => nt.z > K.z || nt.z < O || nt.y - f < 0.06)
    ) {
      O = K.z;
      break;
    }
  }
  let B = [];
  for (let j = 0; j + 1 < S.length; j++) {
    let K = S[j],
      nt = S[j + 1],
      Q = (K.z + nt.z) / 2;
    if (K.z < F || nt.z > O) continue;
    let st = (Q > P && Q < C) || (Q > I && Q < L) ? [[-R, R]] : [[-9, 9]];
    for (let [ot, rt] of st) {
      let lt = Math.max(K.a, ot),
        ht = Math.min(K.b, rt),
        pt = Math.max(nt.a, ot),
        ut = Math.min(nt.b, rt);
      ht - lt < 0.05 ||
        ut - pt < 0.05 ||
        B.push(
          lt,
          K.y,
          K.z,
          ht,
          K.y,
          K.z,
          ut,
          nt.y,
          nt.z,
          lt,
          K.y,
          K.z,
          ut,
          nt.y,
          nt.z,
          pt,
          nt.y,
          nt.z,
        );
    }
  }
  let H = new Le();
  (H.setAttribute("position", new Re(B, 3)), H.computeVertexNormals());
  let N = f - 0.025,
    D = n.filter((j) => j.z < (w + _) / 2),
    U = n.filter((j) => j.z >= (w + _) / 2),
    G = D.length ? D[0].z : w + 1,
    W = U.length ? U[0].z : _ - 1,
    V = 0.42,
    $ = Math.max(G - 0.35, F + 0.1),
    J = Math.min(W + 0.35, O - 0.1),
    X = [
      eE([-V, N, $], [-V, N, J], 0.09, 0.07),
      eE([V, N, $], [V, N, J], 0.09, 0.07),
    ];
  for (let j of n) {
    let K = Math.sign(j.x || 1),
      nt = [j.x - K * 0.12, j.y - 0.08, j.z];
    (X.push(
      eE(nt, [K * V, N + 0.02, j.z - 0.28], 0.045, 0.03),
      eE(nt, [K * V, N + 0.02, j.z + 0.22], 0.045, 0.03),
    ),
      (j.z >= (w + _) / 2 && e) || (j.z < (w + _) / 2 && s) || t
        ? X.push(
            RO([j.x - K * 0.1, j.y, j.z], [K * 0.16, j.y - 0.04, j.z], 0.035),
          )
        : X.push(
            RO(
              [j.x - K * 0.1, j.y - 0.02, j.z + 0.12],
              [K * 0.3, j.y - 0.04, j.z + 0.12],
              0.018,
            ),
          ));
  }
  let tt = [];
  if (t)
    (X.push(
      bv(
        0,
        f - 0.02,
        (G + W) / 2,
        2 * V - 0.1,
        0.04,
        Math.max(0.8, W - G - 1.4),
      ),
    ),
      X.push(bv(0, (U[0]?.y ?? u) - 0.05, W, 0.36, 0.3, 0.42)),
      s && X.push(bv(0, (D[0]?.y ?? u) - 0.05, G, 0.34, 0.28, 0.38)));
  else {
    (X.push(bv(0, f - 0.02, G * 0.3 + W * 0.7 - 0.2, 0.8, 0.04, 0.5)),
      X.push(bv(0, (U[0]?.y ?? u) - 0.06, W - 0.15, 0.42, 0.3, 0.7)));
    for (let j of [-1, 1])
      tt.push(
        RO([j * 0.24, f - 0.03, G + 0.6], [j * 0.24, f - 0.03, W - 0.1], 0.03),
      );
    tt.push(
      bv(
        0,
        A(Math.min(W + 0.45, _ - 0.35)) - 0.02,
        Math.min(W + 0.45, _ - 0.35),
        0.8,
        0.04,
        0.3,
      ),
    );
  }
  let Z = new le();
  Z.name = "Underbody";
  let q = (j, K, nt, Q) => {
    let et = new ye(j, new me({ color: K, roughness: nt, metalness: Q }));
    return ((et.name = "Underbody"), (et.frustumCulled = !1), Z.add(et), et);
  };
  return (
    (q(AO(H), 723724, 1, 0).material.side = ls),
    q(wi(X.map(AO)), 855310, 0.9, 0),
    tt.length && q(wi(tt.map(AO)), 1973791, 0.6, 0.5),
    o.body.add(Z),
    Z
  );
}
