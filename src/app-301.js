// app 301 — math
// Lines 146250-146452 of readable/app.pretty.js (statement-aligned).
function QJ(i, t, { rng: e = Zxt, storage: s = null } = {}) {
  if (!s)
    try {
      s = globalThis.localStorage;
    } catch {}
  let n = Qxt(i, t),
    o = null;
  try {
    o = JSON.parse(s?.getItem(ZJ) || "null");
  } catch {}
  let a =
      Array.isArray(o) && o.length >= 2
        ? n.filter((h) => Math.hypot(h.p[0] - o[0], h.p[1] - o[1]) > 600)
        : n,
    r = a.length ? a : n,
    c =
      r[Math.min(r.length - 1, Math.max(0, Math.floor(e() * r.length)))]?.p ||
      zx(i, t, "California Street", -1371, 385, 1, -0.08, { plateau: !0 });
  try {
    s?.setItem(ZJ, JSON.stringify(c));
  } catch {}
  return c;
}
function tZ(i, t, e, s) {
  let n = Lw(i, t, s[0], s[1], { world: e });
  return n ? [n.x, n.z, n.psi] : null;
}
as();
var kI = [0.56, 0.54, 0.5],
  _I = [0.13, 0.13, 0.14],
  zI = [0.4, 0.33, 0.26],
  EI = [0.22, 0.19, 0.16],
  eZ = [
    [1, 1, 1],
    [0.25, 0.3, 0.45],
    [0.85, 0.8, 0.65],
  ];
function sZ(i, { mobile: t = !1 } = {}) {
  let e = ga(i),
    s = e.meta.floatY ?? 0.45,
    n = e.meta.fixedY ?? 2.3,
    o = [],
    a = [],
    r = [],
    l = [],
    c = (g, b, x, v, y, M) => {
      for (let S of [g, b, x, g, x, v])
        (o.push(...S),
          a.push(...y),
          r.push(...M, 1),
          l.push(S[0] * 0.25, S[2] * 0.25));
    },
    h = (g, b, x, v, y, M, S, w, z, _ = 0) => {
      let R = Math.hypot(x - g, v - b) || 1,
        T = (x - g) / R,
        E = (v - b) / R,
        A = (-E * y) / 2,
        C = (T * y) / 2,
        P = [g - T * _, b - E * _],
        I = [x + T * _, v + E * _],
        L = [
          [P[0] + A, P[1] + C],
          [I[0] + A, I[1] + C],
          [I[0] - A, I[1] - C],
          [P[0] - A, P[1] - C],
        ],
        F = (N, B) => [L[N][0], B, L[N][1]];
      c(F(0, S), F(3, S), F(2, S), F(1, S), [0, 1, 0], w);
      for (let N = 0; N < 4; N++) {
        let B = (N + 1) % 4,
          H = L[B][0] - L[N][0],
          O = L[B][1] - L[N][1],
          D = Math.hypot(H, O) || 1;
        c(F(N, M), F(B, M), F(B, S), F(N, S), [O / D, 0, -H / D], z);
      }
    };
  for (let g = 0; g + 1 < e.lStart.length; g++) {
    let b = e.lStart[g],
      x = e.lStart[g + 1],
      v = e.lw[g] / 10,
      y = e.lf[g],
      M = y ? s : n;
    for (let S = b + 1; S < x; S++) {
      let w = e.lines[(S - 1) * 2],
        z = e.lines[(S - 1) * 2 + 1],
        _ = e.lines[S * 2],
        R = e.lines[S * 2 + 1],
        T = Math.hypot(_ - w, R - z);
      if (y)
        (h(w, z, _, R, v, M - 0.12, M, kI, kI, v / 2),
          h(w, z, _, R, v * 0.92, -0.35, M - 0.12, _I, _I, v / 2 - 0.05));
      else {
        h(w, z, _, R, v, M - 0.35, M, zI, zI, v / 2);
        for (let E = 0; E <= T; E += 6)
          for (let A of [-1, 1]) {
            let C = E / (T || 1),
              P = w + (_ - w) * C + (-(R - z) / (T || 1)) * (v / 2 - 0.2) * A,
              I = z + (R - z) * C + ((_ - w) / (T || 1)) * (v / 2 - 0.2) * A;
            h(P - 0.15, I, P + 0.15, I, 0.3, -2.5, M - 0.35, EI, EI);
          }
      }
    }
  }
  for (let g = 0; g + 1 < e.rStart.length; g++) {
    let b = e.rStart[g],
      x = e.rStart[g + 1],
      v = e.rf[g],
      y = v ? s : n,
      M = v ? kI : zI,
      S = [];
    for (let _ = b; _ < x; _++)
      S.push(new Re(e.rings[_ * 2], e.rings[_ * 2 + 1]));
    if (S.length < 3) continue;
    let w = mo.triangulateShape(S, []),
      z = mo.isClockWise(S);
    for (let [_, R, T] of w) {
      let E = [S[_], S[R], S[T]].map((A) => [A.x, y, A.y]);
      z && E.reverse();
      for (let A of E)
        (o.push(...A),
          a.push(0, 1, 0),
          r.push(...M, 1),
          l.push(A[0] * 0.25, A[2] * 0.25));
    }
    for (let _ = 0; _ < S.length; _++) {
      let R = S[_],
        T = S[(_ + 1) % S.length],
        E = T.x - R.x,
        A = T.y - R.y,
        C = Math.hypot(E, A) || 1,
        P = z ? -1 : 1,
        I = [
          [R.x, -0.3, R.y],
          [T.x, -0.3, T.y],
          [T.x, y, T.y],
          [R.x, y, R.y],
        ];
      (z && I.reverse(), c(...I, [(P * A) / C, 0, (-P * E) / C], v ? _I : EI));
    }
  }
  let f = new ke();
  f.name = "Docks";
  let u = new Ee({
    color: 16777215,
    roughness: 0.85,
    metalness: 0,
    vertexColors: !0,
    side: Ss,
  });
  if (o.length) {
    let g = new De();
    (g.setAttribute("position", new ze(o, 3)),
      g.setAttribute("normal", new ze(a, 3)),
      g.setAttribute("color", new ze(r, 4)),
      g.setAttribute("uv", new ze(l, 2)),
      g.computeBoundingSphere());
    let b = new _e(g, u);
    ((b.name = "Docks_decks"), (b.receiveShadow = !0), f.add(b));
  }
  let d = e.boats.length / 5,
    p = t ? 2 : 1,
    m = Math.ceil(d / p);
  if (m) {
    let g = new zn(
        bC(),
        new Ee({
          color: 16777215,
          roughness: 0.5,
          metalness: 0,
          vertexColors: !0,
        }),
        m,
      ),
      b = new ye(),
      x = new wn(),
      v = new Ii(),
      y = new xt(),
      M = new xt(),
      S = new $t(),
      w = 0;
    for (let z = 0; z < d; z += p) {
      let _ = z * 5,
        R = e.boats[_ + 3];
      (v.set(0, e.boats[_ + 2] - Math.PI / 2, 0),
        x.setFromEuler(v),
        y.set(R, R, R),
        M.set(e.boats[_], 0, e.boats[_ + 1]),
        g.setMatrixAt(w, b.compose(M, x, y)),
        g.setColorAt(w++, S.setRGB(...(eZ[e.boats[_ + 4]] || eZ[0]))));
    }
    ((g.count = w),
      (g.name = "Docks_boats"),
      (g.castShadow = !t),
      g.computeBoundingSphere(),
      f.add(g));
  }
  return (
    (f.userData.stats = { verts: o.length / 3, boats: Math.ceil(d / p) }),
    f
  );
}
f0();
nZ();
