// app 302 — math
// Lines 147471-147698 of readable/app.pretty.js (statement-aligned).
var C5t = 0.5,
  L5t = () => typeof location < "u" && /[?&]allparked\b/.test(location.search),
  I5t = (o, t) => {
    let e =
      Math.imul(Math.round(o * 10) | 0, 668265261) ^
      Math.imul(Math.round(t * 10) | 0, 374761393);
    return (
      (e = Math.imul(e ^ (e >>> 15), 2246822507)),
      (e ^= e >>> 13),
      (e >>> 0) / 4294967296
    );
  };
function sO(o, t = 0, e = o.props.n) {
  if (L5t()) return 0;
  let s = o.props,
    n = Du(o).pSkip,
    i = 0;
  for (let a = t; a < e; a++)
    s.kinds[s.pk[a]] === "car" &&
      !n[a] &&
      I5t(s.pf[a * 5], s.pf[a * 5 + 1]) > C5t &&
      ((n[a] = 1), i++);
  return i;
}
function nO(o, t, e = 0, s = o.props.n) {
  if (!t?.roadAt) return 0;
  let n = o.props,
    i = Du(o).pSkip,
    a = uv.prototype.laneV,
    r = {},
    l = 0;
  for (let c = e; c < s; c++) {
    if (i[c] || n.kinds[n.pk[c]] !== "car") continue;
    let h = n.pf[c * 5],
      f = n.pf[c * 5 + 1],
      u = t.roadAt(h, f, 4, n.pf[c * 5 + 2], !0, r),
      d = u?.E;
    if (!d || !(d.lg || eO(d)) || !d.car || u.s <= d.s0 || u.s >= d.s1)
      continue;
    let p = n.pf[c * 5 + 3],
      m =
        2.35 * Math.abs(-u.dz * Math.sin(p) + u.dx * Math.cos(p)) +
        0.93 * Math.abs(-u.dz * Math.cos(p) - u.dx * Math.sin(p)),
      g = !1;
    for (let b of d.oneway ? [1] : [1, -1])
      for (let v = 0; v < Math.max(1, d.lanes) && !g; v++)
        Math.abs(u.v - a(d, b, v, u.w)) < m + 1.3 && (g = !0);
    g && ((i[c] = 1), l++);
  }
  return l;
}
es();
var iO = [0.56, 0.54, 0.5],
  oO = [0.13, 0.13, 0.14],
  aO = [0.4, 0.33, 0.26],
  rO = [0.22, 0.19, 0.16],
  att = [
    [1, 1, 1],
    [0.25, 0.3, 0.45],
    [0.85, 0.8, 0.65],
  ];
function rtt(o, { mobile: t = !1 } = {}) {
  let e = _a(o),
    s = e.meta.floatY ?? 0.45,
    n = e.meta.fixedY ?? 2.3,
    i = [],
    a = [],
    r = [],
    l = [],
    c = (g, b, v, x, y, M) => {
      for (let S of [g, b, v, g, v, x])
        (i.push(...S),
          a.push(...y),
          r.push(...M, 1),
          l.push(S[0] * 0.25, S[2] * 0.25));
    },
    h = (g, b, v, x, y, M, S, w, _, z = 0) => {
      let A = Math.hypot(v - g, x - b) || 1,
        T = (v - g) / A,
        E = (x - b) / A,
        R = (-E * y) / 2,
        P = (T * y) / 2,
        C = [g - T * z, b - E * z],
        I = [v + T * z, x + E * z],
        L = [
          [C[0] + R, C[1] + P],
          [I[0] + R, I[1] + P],
          [I[0] - R, I[1] - P],
          [C[0] - R, C[1] - P],
        ],
        F = (O, B) => [L[O][0], B, L[O][1]];
      c(F(0, S), F(3, S), F(2, S), F(1, S), [0, 1, 0], w);
      for (let O = 0; O < 4; O++) {
        let B = (O + 1) % 4,
          H = L[B][0] - L[O][0],
          N = L[B][1] - L[O][1],
          D = Math.hypot(H, N) || 1;
        c(F(O, M), F(B, M), F(B, S), F(O, S), [N / D, 0, -H / D], _);
      }
    };
  for (let g = 0; g + 1 < e.lStart.length; g++) {
    let b = e.lStart[g],
      v = e.lStart[g + 1],
      x = e.lw[g] / 10,
      y = e.lf[g],
      M = y ? s : n;
    for (let S = b + 1; S < v; S++) {
      let w = e.lines[(S - 1) * 2],
        _ = e.lines[(S - 1) * 2 + 1],
        z = e.lines[S * 2],
        A = e.lines[S * 2 + 1],
        T = Math.hypot(z - w, A - _);
      if (y)
        (h(w, _, z, A, x, M - 0.12, M, iO, iO, x / 2),
          h(w, _, z, A, x * 0.92, -0.35, M - 0.12, oO, oO, x / 2 - 0.05));
      else {
        h(w, _, z, A, x, M - 0.35, M, aO, aO, x / 2);
        for (let E = 0; E <= T; E += 6)
          for (let R of [-1, 1]) {
            let P = E / (T || 1),
              C = w + (z - w) * P + (-(A - _) / (T || 1)) * (x / 2 - 0.2) * R,
              I = _ + (A - _) * P + ((z - w) / (T || 1)) * (x / 2 - 0.2) * R;
            h(C - 0.15, I, C + 0.15, I, 0.3, -2.5, M - 0.35, rO, rO);
          }
      }
    }
  }
  for (let g = 0; g + 1 < e.rStart.length; g++) {
    let b = e.rStart[g],
      v = e.rStart[g + 1],
      x = e.rf[g],
      y = x ? s : n,
      M = x ? iO : aO,
      S = [];
    for (let z = b; z < v; z++)
      S.push(new Pe(e.rings[z * 2], e.rings[z * 2 + 1]));
    if (S.length < 3) continue;
    let w = So.triangulateShape(S, []),
      _ = So.isClockWise(S);
    for (let [z, A, T] of w) {
      let E = [S[z], S[A], S[T]].map((R) => [R.x, y, R.y]);
      _ && E.reverse();
      for (let R of E)
        (i.push(...R),
          a.push(0, 1, 0),
          r.push(...M, 1),
          l.push(R[0] * 0.25, R[2] * 0.25));
    }
    for (let z = 0; z < S.length; z++) {
      let A = S[z],
        T = S[(z + 1) % S.length],
        E = T.x - A.x,
        R = T.y - A.y,
        P = Math.hypot(E, R) || 1,
        C = _ ? -1 : 1,
        I = [
          [A.x, -0.3, A.y],
          [T.x, -0.3, T.y],
          [T.x, y, T.y],
          [A.x, y, A.y],
        ];
      (_ && I.reverse(), c(...I, [(C * R) / P, 0, (-C * E) / P], x ? oO : rO));
    }
  }
  let f = new le();
  f.name = "Docks";
  let u = new me({
    color: 16777215,
    roughness: 0.85,
    metalness: 0,
    vertexColors: !0,
    side: ls,
  });
  if (i.length) {
    let g = new Le();
    (g.setAttribute("position", new Re(i, 3)),
      g.setAttribute("normal", new Re(a, 3)),
      g.setAttribute("color", new Re(r, 4)),
      g.setAttribute("uv", new Re(l, 2)),
      g.computeBoundingSphere());
    let b = new ye(g, u);
    ((b.name = "Docks_decks"), (b.receiveShadow = !0), f.add(b));
  }
  let d = e.boats.length / 5,
    p = t ? 2 : 1,
    m = Math.ceil(d / p);
  if (m) {
    let g = new En(
        $L(),
        new me({
          color: 16777215,
          roughness: 0.5,
          metalness: 0,
          vertexColors: !0,
        }),
        m,
      ),
      b = new fe(),
      v = new tn(),
      x = new vi(),
      y = new dt(),
      M = new dt(),
      S = new It(),
      w = 0;
    for (let _ = 0; _ < d; _ += p) {
      let z = _ * 5,
        A = e.boats[z + 3];
      (x.set(0, e.boats[z + 2] - Math.PI / 2, 0),
        v.setFromEuler(x),
        y.set(A, A, A),
        M.set(e.boats[z], 0, e.boats[z + 1]),
        g.setMatrixAt(w, b.compose(M, v, y)),
        g.setColorAt(w++, S.setRGB(...(att[e.boats[z + 4]] || att[0]))));
    }
    ((g.count = w),
      (g.name = "Docks_boats"),
      (g.castShadow = !t),
      g.computeBoundingSphere(),
      f.add(g));
  }
  return (
    (f.userData.stats = { verts: i.length / 3, boats: Math.ceil(d / p) }),
    f
  );
}
await _0();
await No();
es();
