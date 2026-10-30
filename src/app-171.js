// app 171 — math
// Lines 102016-102321 of readable/app.pretty.js (statement-aligned).
var wx = {
  meter: 0.1,
  bin: 0.32,
  newsbox: 0.55,
  bench: 0.45,
  rack: 0.4,
  cafe0: 0.55,
  cafe1: 0.55,
  cone: 0.22,
  barricade: 0.6,
  worksign: 0.35,
  flexpost: 0.06,
};
var Lp = new Set([
    "Columbus Avenue",
    "Grant Avenue",
    "Stockton Street",
    "Chestnut Street",
    "Union Street",
    "Fillmore Street",
    "Polk Street",
    "Market Street",
    "Mission Street",
    "Geary Street",
    "Geary Boulevard",
    "Post Street",
    "Sutter Street",
    "Powell Street",
    "Kearny Street",
    "Montgomery Street",
    "Hayes Street",
    "Van Ness Avenue",
    "Divisadero Street",
    "Lombard Street",
    "Broadway",
    "Clay Street",
    "Washington Street",
    "Jackson Street",
    "Pacific Avenue",
    "Jefferson Street",
    "Beach Street",
    "Hyde Street",
    "Folsom Street",
    "Howard Street",
    "2nd Street",
    "3rd Street",
    "4th Street",
    "Valencia Street",
    "Sacramento Street",
    "California Street",
    "Bush Street",
    "Pine Street",
    "Battery Street",
    "Sansome Street",
    "24th Street",
    "Castro Street",
    "18th Street",
    "Haight Street",
    "Church Street",
    "16th Street",
    "Cole Street",
    "Noe Street",
  ]),
  v2t = new Set([...jm, "northbeach", "wharf", "soma"]),
  zf = (o, t) => {
    let e = Math.sin(o * 12.9898 + t * 78.233) * 43758.5453;
    return e - Math.floor(e);
  },
  jC = () => {
    let o = new Map();
    return {
      add(t, e) {
        let s = o.get(t);
        return (s || o.set(t, (s = new Set())), s.add(e), !0);
      },
      has(t, e) {
        let s = o.get(t);
        return !!s && s.has(e);
      },
      get size() {
        return o.size;
      },
    };
  };
function uX(o, t, e, s) {
  let n = new Map(),
    i = (m, g) => Math.floor(m / 4) * 100003 + Math.floor(g / 4),
    a = (m, g, b) => {
      let v = i(m, g),
        x = n.get(v);
      (x || n.set(v, (x = [])), x.push(m, g, b));
    },
    r = (m, g, b) => {
      for (let v = -1; v <= 1; v++)
        for (let x = -1; x <= 1; x++) {
          let y = n.get(i(m + v * 4, g + x * 4));
          if (y) {
            for (let M = 0; M < y.length; M += 3)
              if (Math.hypot(y[M] - m, y[M + 1] - g) < b + y[M + 2]) return !1;
          }
        }
      return !0;
    },
    l = o.props;
  for (let m = 0; m < l.n; m++)
    l.kinds[l.pk[m]] !== "car" && a(l.pf[m * 5], l.pf[m * 5 + 1], 0.6);
  let c = (o.claims?.list || [])
      .filter((m) => m.poly)
      .map((m) => {
        let g = m.poly,
          b = 1e9,
          v = 1e9,
          x = -1e9,
          y = -1e9;
        for (let M = 0; M < g.length; M += 2)
          ((b = Math.min(b, g[M])),
            (x = Math.max(x, g[M])),
            (v = Math.min(v, g[M + 1])),
            (y = Math.max(y, g[M + 1])));
        return { R: g, bb: [b, v, x, y] };
      }),
    h = (m, g) =>
      c.some(
        ({ R: b, bb: v }) =>
          m > v[0] && m < v[2] && g > v[1] && g < v[3] && rn(b, m, g),
      ),
    f = {},
    u = e.length,
    d = null,
    p = (m, g, b, v, x, y = wx[x] ?? 0.4, M = 0) => {
      Ot(m, g, f);
      let S = f.nx * b,
        w = f.nz * b,
        _ = f.x + S * (f.w + v) + f.dx * M,
        z = f.z + w * (f.w + v) + f.dz * M;
      if (!r(_, z, y + 0.35) || h(_, z)) return !1;
      let A = t.inWorld(_, z) ? t.probe(_, z) : null,
        T = A && !A.road && A.walk;
      if (
        !T &&
        !(
          x === "meter" &&
          m.sw >= 3.2 &&
          !(A?.all || []).some((L) => L.J || L.E !== m)
        )
      )
        return !1;
      let E = f.dx * y,
        R = f.dz * y,
        P = Math.min(y, 0.5);
      if (
        y > 0.2 &&
        (v < P - 0.02 ||
          v + P > m.sw + 0.02 ||
          t.surfaceAt(_ + E, z + R) !== "walk" ||
          t.surfaceAt(_ - E, z - R) !== "walk")
      )
        return !1;
      if (x === "shelter") {
        for (let [L, F] of [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ])
          if (
            t.surfaceAt(
              _ + f.dx * 2 * L + S * 0.85 * F,
              z + f.dz * 2 * L + w * 0.85 * F,
            ) === "road"
          )
            return !1;
      }
      if (x === "tree" && t.clearOfRoads && !t.clearOfRoads(_, z, 0.7))
        return !1;
      let C = T ? T.y : t.streetY(_, z) + t.CURB,
        I = Math.atan2(-S, -w);
      return (
        a(_, z, y),
        e.push({ kind: x, x: _, y: C, z, rot: I }),
        x === "shelter"
          ? s.push({
              t: "obb",
              x: _,
              z,
              hx: 2,
              hz: 0.85,
              c: Math.cos(I),
              s: Math.sin(I),
              y0: C - 1.5,
              y1: C + 2.6,
            })
          : s.push({ t: "circ", x: _, z, r: y, y0: C - 1.5, y1: C + 2.4 }),
        !0
      );
    };
  ((d = M2t(o, e, s, p)), S2t(o, e, s, p));
  for (let m of o.edges) {
    if (m.inner || m.elev || m.hwy || m.sunk || m.sw < 2.2) continue;
    let g = m.s0 + 7,
      b = m.s1 - 7,
      v = b - g;
    if (v < 12) continue;
    let x = Ot(m, (m.s0 + m.s1) / 2, f),
      y = Di(x.x, x.z),
      M = v2t.has(y),
      S = Lp.has(m.name) || M,
      w = !(m.flags & 4) && m.cls !== "service";
    for (let _ of [1, -1]) {
      let z = (T) => zf(m.sid * 2 + (_ > 0 ? 1 : 0), T);
      if (w && m.sw >= 2.6 && (M || (Lp.has(m.name) && z(16) < 0.7)))
        for (let T = g + 2 + 3 * z(1); T < b - 2; T += 8)
          zf(T, m.sid + _) > 0.3 && p(m, T, _, 0.45, "meter");
      ((S || z(2) < 0.3) &&
        (p(m, g + 1.5 + z(3) * 3, _, 0.6, "bin"),
        v > 60 && S && p(m, b - 1.5 - z(4) * 3, _, 0.6, "bin")),
        (M || Lp.has(m.name)) &&
          z(5) < 0.55 &&
          m.sw >= 3 &&
          p(m, z(6) < 0.5 ? g + 4 : b - 4, _, 0.75, "newsbox"),
        S &&
          z(7) < 0.35 &&
          m.sw >= 3 &&
          p(m, g + v * (0.25 + 0.5 * z(8)), _, 0.8, "rack"));
      let A = m.name === "The Embarcadero";
      if (((M && z(9) < 0.3) || A) && m.sw >= 3.2)
        for (let T = g + 10 + 20 * z(10); T < b - 5; T += A ? 45 : 1e9)
          p(m, T, _, 1.1, "bench");
      if (
        ((m.trolley || (S && (m.cls === "primary" || m.cls === "secondary"))) &&
          v > 50 &&
          m.sw >= 3 &&
          z(11) < 0.45 &&
          !(m.oneway && _ < 0) &&
          p(m, _ > 0 ? b - 12 : g + 12, _, 1.15, "shelter", 1.95),
        y === "northbeach" && m.sw >= 2.9 && z(12) < 0.6)
      ) {
        let T = g + v * 0.2 * z(13),
          E = 2 + Math.floor(z(14) * 4),
          R = z(15) < 0.5 ? "cafe0" : "cafe1";
        for (let P = 0; P < E; P++) p(m, T + P * 3.2, _, m.sw - 0.95, R);
      }
    }
  }
  return (w2t(o, t, e, p), k2t(o, t, e, s), _2t(o, t, e, s, h), e.length - u);
}
var y2t = new Set([...jm, "union", "chinatown", "northbeach"]);
function w2t(o, t, e, s) {
  let n = new Set(["The Embarcadero"]),
    i = new Map(),
    a = (l, c) => Math.floor(l / 32) * 100003 + Math.floor(c / 32);
  for (let l of e)
    if (l.kind === "lamp") {
      let c = a(l.x, l.z),
        h = i.get(c);
      (h || i.set(c, (h = [])), h.push(l));
    }
  let r = {};
  for (let l of o.edges)
    if (!(l.inner || l.elev || l.hwy || !n.has(l.name))) {
      for (let c = l.s0; c <= l.s1; c += 8) {
        Ot(l, c, r);
        for (let h = -1; h <= 1; h++)
          for (let f = -1; f <= 1; f++)
            for (let u of i.get(a(r.x + h * 32, r.z + f * 32)) || [])
              u.kind === "lamp" &&
                Math.hypot(u.x - r.x, u.z - r.z) < r.w + l.sw + 1.5 &&
                (u.kind = "lamp2");
      }
      if (l.sw >= 2.4 && l.s1 - l.s0 > 20)
        for (let c of [1, -1])
          for (let h = l.s0 + 6 + 10 * zf(l.sid + c, 71); h < l.s1 - 4; h += 28)
            s(l, h, c, 0.6, "lamp2", 0.22);
    }
  for (let l of o.edges) {
    if (
      l.inner ||
      l.elev ||
      l.hwy ||
      l.sunk ||
      l.sw < 2.9 ||
      n.has(l.name) ||
      l.name === "Market Street"
    )
      continue;
    let c = l.s0 + 6,
      h = l.s1 - 6;
    if (h - c < 20) continue;
    let f = Ot(l, (l.s0 + l.s1) / 2, r),
      u = Di(f.x, f.z);
    if (!(
      !y2t.has(u) ||
      (l.cls !== "primary" &&
        l.cls !== "secondary" &&
        l.cls !== "tertiary" &&
        l.sw < 3.6)
    ))
      for (let d of [1, -1])
        for (
          let p = c + 5 + 8 * zf(l.sid + d, 70);
          p < h - 3;
          p += 22 + 6 * zf(p, l.sid)
        )
          s(l, p, d, 0.5, "plamp", 0.2);
  }
}
