// app 286 — math
// Lines 139461-139706 of readable/app.pretty.js (statement-aligned).
function dxt(i, t, e, s, n, o) {
  let a = i.bld,
    r = new Map(),
    l = 32,
    c = (m, g) => Math.floor(m / l) * 65536 + Math.floor(g / l),
    h = i.claims?.bSkip,
    f = [];
  for (let m = o.b0; m < o.b1; m++) {
    let g = a.rStart[a.bRing[m]],
      b = a.rStart[a.bRing[m] + 1],
      x = 0,
      v = 0;
    for (let R = g; R < b; R++) ((x += a.pts[R * 2]), (v += a.pts[R * 2 + 1]));
    if (((x /= b - g), (v /= b - g), x > -7611 && v > -2600)) continue;
    let y = Ai(x, v);
    if (y !== "seacliff" && y !== "sausalito") continue;
    let M = 1e9,
      S = 1e9,
      w = -1e9,
      z = -1e9;
    for (let R = g; R < b; R++)
      ((M = Math.min(M, a.pts[R * 2])),
        (w = Math.max(w, a.pts[R * 2])),
        (S = Math.min(S, a.pts[R * 2 + 1])),
        (z = Math.max(z, a.pts[R * 2 + 1])));
    let _ = { i: m, a: g, e: b, cx: x, cz: v, d: y, bb: [M, S, w, z] };
    f.push(_);
    for (let R = Math.floor((M - 2) / l); R <= Math.floor((w + 2) / l); R++)
      for (let T = Math.floor((S - 2) / l); T <= Math.floor((z + 2) / l); T++) {
        let E = R * 65536 + T,
          A = r.get(E);
        (A || r.set(E, (A = [])), A.push(_));
      }
  }
  let u = (m, g, b) => {
      let x = !1;
      for (let v = m.a, y = m.e - 1; v < m.e; y = v++) {
        let M = a.pts[v * 2],
          S = a.pts[v * 2 + 1],
          w = a.pts[y * 2],
          z = a.pts[y * 2 + 1];
        S > b != z > b && g < ((w - M) * (b - S)) / (z - S) + M && (x = !x);
      }
      return x;
    },
    d = (m, g, b) => {
      for (let x of r.get(c(m, g)) || [])
        if (!(
          m < x.bb[0] - b ||
          m > x.bb[2] + b ||
          g < x.bb[1] - b ||
          g > x.bb[3] + b
        )) {
          if (u(x, m, g)) return !0;
          for (let [v, y] of [
            [b, 0],
            [-b, 0],
            [0, b],
            [0, -b],
          ])
            if (u(x, m + v, g + y)) return !0;
        }
      return !1;
    },
    p = 0;
  for (let m of f) {
    if (h?.[m.i]) continue;
    let g = ko(m.cx, m.cz, 31);
    if (
      (m.d === "sausalito" && g > 0.7) ||
      (n?.tree < 1 && ko(m.cx, m.cz, 23) > n.tree)
    )
      continue;
    let b = 0,
      x = 0;
    for (let S = m.a; S < m.e; S++) {
      if (a.front[S] !== 1) continue;
      let w = S + 1 < m.e ? S + 1 : m.a,
        z = a.pts[w * 2] - a.pts[S * 2],
        _ = a.pts[w * 2 + 1] - a.pts[S * 2 + 1],
        R = Math.hypot(z, _) || 1;
      ((b += (-_ / R) * R), (x += (z / R) * R));
    }
    let v = Math.hypot(b, x);
    if (v < 0.001) {
      let S = g * 6.283;
      ((b = Math.cos(S)), (x = Math.sin(S)), (v = 1));
    }
    ((b /= v), (x /= v));
    let y = Math.max(m.bb[2] - m.bb[0], m.bb[3] - m.bb[1]) / 2,
      M = 1 + (ko(m.cx, m.cz, 32) < (m.d === "seacliff" ? 0.6 : 0.55) ? 1 : 0);
    for (let S = 0; S < M; S++) {
      let w = (ko(m.cx, m.cz, 40 + S) - 0.5) * 1.6,
        z = y + 3 + 5 * ko(m.cx, m.cz, 50 + S),
        _ = m.cx - b * z - x * w * y,
        R = m.cz - x * z + b * w * y;
      if (
        d(_, R, 2.2) ||
        !t.clearOfRoads(_, R, 3, !0) ||
        t.terrainAt(_, R) < 0.6 ||
        t.surfaceAt(_, R) === "sea"
      )
        continue;
      let T = ko(_, R, 60),
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
        A = t.terrainAt(_, R),
        C =
          E === "fpalm" || E === "palm"
            ? 0.85 + 0.3 * ko(_, R, 61)
            : 0.75 + 0.4 * ko(_, R, 61);
      (e.push({
        kind: E === "palm" ? "palm" : "tree",
        sp: E === "palm" ? void 0 : E,
        x: _,
        y: A,
        z: R,
        rot: ko(_, R, 62) * 6.283,
        scale: C,
        park: !0,
      }),
        s.push({ t: "circ", x: _, z: R, r: 0.4, y0: A - 1.5, y1: A + 6 }),
        p++);
    }
  }
  if (f.some((m) => m.d === "sausalito")) {
    let m = {};
    for (let g of i.edges)
      if (
        !(g.name !== "Bridgeway" || g.inner || g.L < 20) &&
        (Ot(g, g.L / 2, m), !(m.z < -7120 || m.z > -6420))
      )
        for (let b = 6; b < g.L - 6; b += 14) {
          Ot(g, b, m);
          for (let x of [1, -1]) {
            let v = m.w + 1.7,
              y = m.x + m.nx * v * x,
              M = m.z + m.nz * v * x;
            if (
              ko(y, M, 70) > 0.75 ||
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
              rot: ko(y, M, 71) * 6.283,
              scale: 0.95 + 0.3 * ko(y, M, 72),
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
var kJ = {};
function pxt(i, t, e, s, n, o) {
  if (Math.abs(o) > 0.3) return !1;
  let a = t < -7611 || s < -2600;
  if (!a) {
    let u = Math.sin(n),
      d = Math.cos(n),
      p = Math.tan(-o),
      m = (b, x) => b - x > -0.32 && b - x < -0.08,
      g = m(i.terrainAt(t, s), e) && !(i.coverAt(t, s) & 32);
    for (let [b, x] of [
      [1.3, 0.8],
      [-1.3, -0.8],
      [1.3, -0.8],
      [-1.3, 0.8],
    ])
      if (g) {
        let v = t + u * b + d * x,
          y = s + d * b - u * x;
        g = m(i.terrainAt(v, y), e + b * p) && !(i.coverAt(v, y) & 32);
      }
    if (g) return !0;
  }
  let r = null;
  for (let u of i.probe(t, s).all) {
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
    Ot(l, r.s, kJ);
    let u = kJ.w - Math.abs(r.v);
    if (u < -0.6 || u > 3.2) return !1;
  }
  let c = Math.sin(n),
    h = Math.cos(n),
    f = Math.tan(-o);
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
    for (let x of i.probe(p, m).all) {
      if (x.y > g + 0.5 && x.y < g + 3.4) return !1;
      Math.abs(x.y - g) < 0.2 && (b = !0);
    }
    if (!b || (a && i.surfaceAt(p, m) !== "road")) return !1;
  }
  return !0;
}
