// app 285 — math
// Lines 139737-139982 of readable/app.pretty.js (statement-aligned).
function Nyt(o, t, e, s, n, i) {
  let a = o.bld,
    r = new Map(),
    l = 32,
    c = (m, g) => Math.floor(m / l) * 65536 + Math.floor(g / l),
    h = o.claims?.bSkip,
    f = [];
  for (let m = i.b0; m < i.b1; m++) {
    let g = a.rStart[a.bRing[m]],
      b = a.rStart[a.bRing[m] + 1],
      v = 0,
      x = 0;
    for (let A = g; A < b; A++) ((v += a.pts[A * 2]), (x += a.pts[A * 2 + 1]));
    if (((v /= b - g), (x /= b - g), v > -7611 && x > -2600)) continue;
    let y = Di(v, x);
    if (y !== "seacliff" && y !== "sausalito") continue;
    let M = 1e9,
      S = 1e9,
      w = -1e9,
      _ = -1e9;
    for (let A = g; A < b; A++)
      ((M = Math.min(M, a.pts[A * 2])),
        (w = Math.max(w, a.pts[A * 2])),
        (S = Math.min(S, a.pts[A * 2 + 1])),
        (_ = Math.max(_, a.pts[A * 2 + 1])));
    let z = { i: m, a: g, e: b, cx: v, cz: x, d: y, bb: [M, S, w, _] };
    f.push(z);
    for (let A = Math.floor((M - 2) / l); A <= Math.floor((w + 2) / l); A++)
      for (let T = Math.floor((S - 2) / l); T <= Math.floor((_ + 2) / l); T++) {
        let E = A * 65536 + T,
          R = r.get(E);
        (R || r.set(E, (R = [])), R.push(z));
      }
  }
  let u = (m, g, b) => {
      let v = !1;
      for (let x = m.a, y = m.e - 1; x < m.e; y = x++) {
        let M = a.pts[x * 2],
          S = a.pts[x * 2 + 1],
          w = a.pts[y * 2],
          _ = a.pts[y * 2 + 1];
        S > b != _ > b && g < ((w - M) * (b - S)) / (_ - S) + M && (v = !v);
      }
      return v;
    },
    d = (m, g, b) => {
      for (let v of r.get(c(m, g)) || [])
        if (!(
          m < v.bb[0] - b ||
          m > v.bb[2] + b ||
          g < v.bb[1] - b ||
          g > v.bb[3] + b
        )) {
          if (u(v, m, g)) return !0;
          for (let [x, y] of [
            [b, 0],
            [-b, 0],
            [0, b],
            [0, -b],
          ])
            if (u(v, m + x, g + y)) return !0;
        }
      return !1;
    },
    p = 0;
  for (let m of f) {
    if (h?.[m.i]) continue;
    let g = Fo(m.cx, m.cz, 31);
    if (
      (m.d === "sausalito" && g > 0.7) ||
      (n?.tree < 1 && Fo(m.cx, m.cz, 23) > n.tree)
    )
      continue;
    let b = 0,
      v = 0;
    for (let S = m.a; S < m.e; S++) {
      if (a.front[S] !== 1) continue;
      let w = S + 1 < m.e ? S + 1 : m.a,
        _ = a.pts[w * 2] - a.pts[S * 2],
        z = a.pts[w * 2 + 1] - a.pts[S * 2 + 1],
        A = Math.hypot(_, z) || 1;
      ((b += (-z / A) * A), (v += (_ / A) * A));
    }
    let x = Math.hypot(b, v);
    if (x < 0.001) {
      let S = g * 6.283;
      ((b = Math.cos(S)), (v = Math.sin(S)), (x = 1));
    }
    ((b /= x), (v /= x));
    let y = Math.max(m.bb[2] - m.bb[0], m.bb[3] - m.bb[1]) / 2,
      M = 1 + (Fo(m.cx, m.cz, 32) < (m.d === "seacliff" ? 0.6 : 0.55) ? 1 : 0);
    for (let S = 0; S < M; S++) {
      let w = (Fo(m.cx, m.cz, 40 + S) - 0.5) * 1.6,
        _ = y + 3 + 5 * Fo(m.cx, m.cz, 50 + S),
        z = m.cx - b * _ - v * w * y,
        A = m.cz - v * _ + b * w * y;
      if (
        d(z, A, 2.2) ||
        !t.clearOfRoads(z, A, 3, !0) ||
        t.terrainAt(z, A) < 0.6 ||
        t.surfaceAt(z, A) === "sea"
      )
        continue;
      let T = Fo(z, A, 60),
        E =
          m.d === "seacliff"
            ? T < 0.5
              ? "cypress"
              : T < 0.82
                ? "pine"
                : T < 0.92
                  ? "fpalm"
                  : "tree1"
            : T < 0.35
              ? "tree1"
              : T < 0.55
                ? "pine"
                : T < 0.72
                  ? "euc"
                  : T < 0.85
                    ? "cypress"
                    : T < 0.93
                      ? "tree2"
                      : "palm",
        R = t.terrainAt(z, A),
        P =
          E === "fpalm" || E === "palm"
            ? 0.85 + 0.3 * Fo(z, A, 61)
            : 0.75 + 0.4 * Fo(z, A, 61);
      (e.push({
        kind: E === "palm" ? "palm" : "tree",
        sp: E === "palm" ? void 0 : E,
        x: z,
        y: R,
        z: A,
        rot: Fo(z, A, 62) * 6.283,
        scale: P,
        park: !0,
      }),
        s.push({ t: "circ", x: z, z: A, r: 0.4, y0: R - 1.5, y1: R + 6 }),
        p++);
    }
  }
  if (f.some((m) => m.d === "sausalito")) {
    let m = {};
    for (let g of o.edges)
      if (
        !(g.name !== "Bridgeway" || g.inner || g.L < 20) &&
        (Ot(g, g.L / 2, m), !(m.z < -7120 || m.z > -6420))
      )
        for (let b = 6; b < g.L - 6; b += 14) {
          Ot(g, b, m);
          for (let v of [1, -1]) {
            let x = m.w + 1.7,
              y = m.x + m.nx * x * v,
              M = m.z + m.nz * x * v;
            if (
              Fo(y, M, 70) > 0.75 ||
              t.surfaceAt(y, M) !== "walk" ||
              d(y, M, 1.2) ||
              !t.clearOfRoads(y, M, 1, !0)
            )
              continue;
            let S = t.driveHeight(y, M, null, m.y) + 0.15;
            (e.push({
              kind: "palm",
              x: y,
              y: S,
              z: M,
              rot: Fo(y, M, 71) * 6.283,
              scale: 0.95 + 0.3 * Fo(y, M, 72),
            }),
              s.push({
                t: "circ",
                x: y,
                z: M,
                r: 0.45,
                y0: S - 1.5,
                y1: S + 6,
              }),
              p++);
          }
        }
  }
  return p;
}
var EQ = {};
function Hyt(o, t, e, s, n, i) {
  if (Math.abs(i) > 0.3) return !1;
  let a = Eh && (t < -7611 || s < -2600);
  if (!a) {
    let u = Math.sin(n),
      d = Math.cos(n),
      p = Math.tan(-i),
      m = (b, v) => b - v > -0.32 && b - v < -0.08,
      g = m(o.terrainAt(t, s), e) && !(o.coverAt(t, s) & 32);
    for (let [b, v] of [
      [1.3, 0.8],
      [-1.3, -0.8],
      [1.3, -0.8],
      [-1.3, 0.8],
    ])
      if (g) {
        let x = t + u * b + d * v,
          y = s + d * b - u * v;
        g = m(o.terrainAt(x, y), e + b * p) && !(o.coverAt(x, y) & 32);
      }
    if (g) return !0;
  }
  let r = null;
  for (let u of o.probe(t, s).all) {
    if (u.y > e + 0.5 && u.y < e + 3.4) return !1;
    Math.abs(u.y - e) < 0.15 &&
      (!r || Math.abs(u.y - e) < Math.abs(r.y - e)) &&
      (r = u);
  }
  if (!r) return !1;
  let l = r.J ? null : r.E;
  if (l) {
    if (l.flags & 4 || l.cls === "motorway" || l.cls === "motorway_link")
      return !1;
    Ot(l, r.s, EQ);
    let u = EQ.w - Math.abs(r.v);
    if (u < -0.6 || u > 3.2) return !1;
  }
  let c = Math.sin(n),
    h = Math.cos(n),
    f = Math.tan(-i);
  for (let [u, d] of [
    [1.3, 0.8],
    [1.3, -0.8],
    [-1.3, 0.8],
    [-1.3, -0.8],
  ]) {
    let p = t + c * u + h * d,
      m = s + h * u - c * d,
      g = e + u * f,
      b = !1;
    for (let v of o.probe(p, m).all) {
      if (v.y > g + 0.5 && v.y < g + 3.4) return !1;
      Math.abs(v.y - g) < 0.2 && (b = !0);
    }
    if (!b || (a && o.surfaceAt(p, m) !== "road")) return !1;
  }
  return !0;
}
