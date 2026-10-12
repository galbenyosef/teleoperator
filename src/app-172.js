// app 172 — math
// Lines 101780-102085 of readable/app.pretty.js (statement-aligned).
var Fb = {
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
var ep = new Set([
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
  Kdt = new Set([...nm, "northbeach", "wharf", "soma"]),
  $h = (i, t) => {
    let e = Math.sin(i * 12.9898 + t * 78.233) * 43758.5453;
    return e - Math.floor(e);
  },
  mP = () => {
    let i = new Map();
    return {
      add(t, e) {
        let s = i.get(t);
        return (s || i.set(t, (s = new Set())), s.add(e), !0);
      },
      has(t, e) {
        let s = i.get(t);
        return !!s && s.has(e);
      },
      get size() {
        return i.size;
      },
    };
  };
function cV(i, t, e, s) {
  let n = new Map(),
    o = (m, g) => Math.floor(m / 4) * 100003 + Math.floor(g / 4),
    a = (m, g, b) => {
      let x = o(m, g),
        v = n.get(x);
      (v || n.set(x, (v = [])), v.push(m, g, b));
    },
    r = (m, g, b) => {
      for (let x = -1; x <= 1; x++)
        for (let v = -1; v <= 1; v++) {
          let y = n.get(o(m + x * 4, g + v * 4));
          if (y) {
            for (let M = 0; M < y.length; M += 3)
              if (Math.hypot(y[M] - m, y[M + 1] - g) < b + y[M + 2]) return !1;
          }
        }
      return !0;
    },
    l = i.props;
  for (let m = 0; m < l.n; m++)
    l.kinds[l.pk[m]] !== "car" && a(l.pf[m * 5], l.pf[m * 5 + 1], 0.6);
  let c = (i.claims?.list || [])
      .filter((m) => m.poly)
      .map((m) => {
        let g = m.poly,
          b = 1e9,
          x = 1e9,
          v = -1e9,
          y = -1e9;
        for (let M = 0; M < g.length; M += 2)
          ((b = Math.min(b, g[M])),
            (v = Math.max(v, g[M])),
            (x = Math.min(x, g[M + 1])),
            (y = Math.max(y, g[M + 1])));
        return { R: g, bb: [b, x, v, y] };
      }),
    h = (m, g) =>
      c.some(
        ({ R: b, bb: x }) =>
          m > x[0] && m < x[2] && g > x[1] && g < x[3] && en(b, m, g),
      ),
    f = {},
    u = e.length,
    d = null,
    p = (m, g, b, x, v, y = Fb[v] ?? 0.4, M = 0) => {
      Ot(m, g, f);
      let S = f.nx * b,
        w = f.nz * b,
        z = f.x + S * (f.w + x) + f.dx * M,
        _ = f.z + w * (f.w + x) + f.dz * M;
      if (!r(z, _, y + 0.35) || h(z, _)) return !1;
      let R = t.inWorld(z, _) ? t.probe(z, _) : null,
        T = R && !R.road && R.walk;
      if (
        !T &&
        !(
          v === "meter" &&
          m.sw >= 3.2 &&
          !(R?.all || []).some((L) => L.J || L.E !== m)
        )
      )
        return !1;
      let E = f.dx * y,
        A = f.dz * y,
        C = Math.min(y, 0.5);
      if (
        y > 0.2 &&
        (x < C - 0.02 ||
          x + C > m.sw + 0.02 ||
          t.surfaceAt(z + E, _ + A) !== "walk" ||
          t.surfaceAt(z - E, _ - A) !== "walk")
      )
        return !1;
      if (v === "shelter") {
        for (let [L, F] of [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ])
          if (
            t.surfaceAt(
              z + f.dx * 2 * L + S * 0.85 * F,
              _ + f.dz * 2 * L + w * 0.85 * F,
            ) === "road"
          )
            return !1;
      }
      if (v === "tree" && t.clearOfRoads && !t.clearOfRoads(z, _, 0.7))
        return !1;
      let P = T ? T.y : t.streetY(z, _) + t.CURB,
        I = Math.atan2(-S, -w);
      return (
        a(z, _, y),
        e.push({ kind: v, x: z, y: P, z: _, rot: I }),
        v === "shelter"
          ? s.push({
              t: "obb",
              x: z,
              z: _,
              hx: 2,
              hz: 0.85,
              c: Math.cos(I),
              s: Math.sin(I),
              y0: P - 1.5,
              y1: P + 2.6,
            })
          : s.push({ t: "circ", x: z, z: _, r: y, y0: P - 1.5, y1: P + 2.4 }),
        !0
      );
    };
  ((d = Zdt(i, e, s, p)), Qdt(i, e, s, p));
  for (let m of i.edges) {
    if (m.inner || m.elev || m.hwy || m.sunk || m.sw < 2.2) continue;
    let g = m.s0 + 7,
      b = m.s1 - 7,
      x = b - g;
    if (x < 12) continue;
    let v = Ot(m, (m.s0 + m.s1) / 2, f),
      y = Ai(v.x, v.z),
      M = Kdt.has(y),
      S = ep.has(m.name) || M,
      w = !(m.flags & 4) && m.cls !== "service";
    for (let z of [1, -1]) {
      let _ = (T) => $h(m.sid * 2 + (z > 0 ? 1 : 0), T);
      if (w && m.sw >= 2.6 && (M || (ep.has(m.name) && _(16) < 0.7)))
        for (let T = g + 2 + 3 * _(1); T < b - 2; T += 8)
          $h(T, m.sid + z) > 0.3 && p(m, T, z, 0.45, "meter");
      ((S || _(2) < 0.3) &&
        (p(m, g + 1.5 + _(3) * 3, z, 0.6, "bin"),
        x > 60 && S && p(m, b - 1.5 - _(4) * 3, z, 0.6, "bin")),
        (M || ep.has(m.name)) &&
          _(5) < 0.55 &&
          m.sw >= 3 &&
          p(m, _(6) < 0.5 ? g + 4 : b - 4, z, 0.75, "newsbox"),
        S &&
          _(7) < 0.35 &&
          m.sw >= 3 &&
          p(m, g + x * (0.25 + 0.5 * _(8)), z, 0.8, "rack"));
      let R = m.name === "The Embarcadero";
      if (((M && _(9) < 0.3) || R) && m.sw >= 3.2)
        for (let T = g + 10 + 20 * _(10); T < b - 5; T += R ? 45 : 1e9)
          p(m, T, z, 1.1, "bench");
      if (
        ((m.trolley || (S && (m.cls === "primary" || m.cls === "secondary"))) &&
          x > 50 &&
          m.sw >= 3 &&
          _(11) < 0.45 &&
          !(m.oneway && z < 0) &&
          p(m, z > 0 ? b - 12 : g + 12, z, 1.15, "shelter", 1.95),
        y === "northbeach" && m.sw >= 2.9 && _(12) < 0.6)
      ) {
        let T = g + x * 0.2 * _(13),
          E = 2 + Math.floor(_(14) * 4),
          A = _(15) < 0.5 ? "cafe0" : "cafe1";
        for (let C = 0; C < E; C++) p(m, T + C * 3.2, z, m.sw - 0.95, A);
      }
    }
  }
  return (Jdt(i, t, e, p), tpt(i, t, e, s), spt(i, t, e, s, h), e.length - u);
}
var Ydt = new Set([...nm, "union", "chinatown", "northbeach"]);
function Jdt(i, t, e, s) {
  let n = new Set(["The Embarcadero"]),
    o = new Map(),
    a = (l, c) => Math.floor(l / 32) * 100003 + Math.floor(c / 32);
  for (let l of e)
    if (l.kind === "lamp") {
      let c = a(l.x, l.z),
        h = o.get(c);
      (h || o.set(c, (h = [])), h.push(l));
    }
  let r = {};
  for (let l of i.edges)
    if (!(l.inner || l.elev || l.hwy || !n.has(l.name))) {
      for (let c = l.s0; c <= l.s1; c += 8) {
        Ot(l, c, r);
        for (let h = -1; h <= 1; h++)
          for (let f = -1; f <= 1; f++)
            for (let u of o.get(a(r.x + h * 32, r.z + f * 32)) || [])
              u.kind === "lamp" &&
                Math.hypot(u.x - r.x, u.z - r.z) < r.w + l.sw + 1.5 &&
                (u.kind = "lamp2");
      }
      if (l.sw >= 2.4 && l.s1 - l.s0 > 20)
        for (let c of [1, -1])
          for (let h = l.s0 + 6 + 10 * $h(l.sid + c, 71); h < l.s1 - 4; h += 28)
            s(l, h, c, 0.6, "lamp2", 0.22);
    }
  for (let l of i.edges) {
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
      u = Ai(f.x, f.z);
    if (!(
      !Ydt.has(u) ||
      (l.cls !== "primary" &&
        l.cls !== "secondary" &&
        l.cls !== "tertiary" &&
        l.sw < 3.6)
    ))
      for (let d of [1, -1])
        for (
          let p = c + 5 + 8 * $h(l.sid + d, 70);
          p < h - 3;
          p += 22 + 6 * $h(p, l.sid)
        )
          s(l, p, d, 0.5, "plamp", 0.2);
  }
}
