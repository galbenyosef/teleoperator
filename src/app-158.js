// app 158 — math
// Lines 96835-97083 of readable/app.pretty.js (statement-aligned).
var Wj = 32,
  qj = 64,
  jj = 128,
  Vj = (i) => !!(i.flags & ll.tram) && !(i.flags & ll.cable) && Vh(i) === 0.45,
  ddt = (i) =>
    !i.hwy &&
    !i.elev &&
    !i.layer &&
    (i.cls === "service" ||
      i.cls === "living_street" ||
      i.cls === "pedestrian" ||
      (i.lanes <= 1 &&
        i.W[0] <= 4 &&
        /(Alley|Place|Lane)$/.test(i.name || "")));
function tP(i) {
  return (
    ((i.flags | (i.noX || 0) | (ddt(i) ? 15 : 0)) & 15) | 16 | (Vj(i) ? Wj : 0)
  );
}
var pdt = new Set([
    "Mission Street",
    "Geary Street",
    "O'Farrell Street",
    "3rd Street",
    "Kearny Street",
    "Stockton Street",
  ]),
  mdt = new Set(["fidi", "towers", "union", "tenderloin", "soma", "mission"]);
function $j(i) {
  if (i.tcode !== void 0) return i.tcode;
  let t = 0;
  return (
    i.cls === "busway"
      ? (t =
          i.name === "Van Ness Bus Rapid Transit" || i.name === "Market Street"
            ? 3
            : 0)
      : i.name === "Market Street" && i.flags & ll.tram && !i.oneway
        ? (t = 2)
        : pdt.has(i.name) &&
          mdt.has(i.dist) &&
          i.lanes >= 2 &&
          !i.hwy &&
          !i.elev &&
          (t = 1),
    t === 1 &&
      i.name === "3rd Street" &&
      Ot(i, (i.s0 + i.s1) / 2, {}).z > 1900 &&
      (t = 0),
    (i.tcode = t)
  );
}
var Ij = {
    "Valencia Street": 3,
    "Polk Street": 1,
    "Folsom Street": 3,
    "Howard Street": 3,
    "The Embarcadero": 3,
  },
  gdt = new Set([
    "Duboce Avenue",
    "Steiner Street",
    "Waller Street",
    "Pierce Street",
    "Haight Street",
    "Scott Street",
  ]);
function Ib(i) {
  if (i.bcode !== void 0) return i.bcode;
  let t = 0;
  if (
    !i.inner &&
    !i.elev &&
    !i.hwy &&
    !i.sunk &&
    i.cls !== "busway" &&
    i.cls !== "service"
  ) {
    let e = Ot(i, i.L / 2, {});
    if (
      (Ij[i.name] &&
      ((i.name !== "Folsom Street" && i.name !== "Howard Street") ||
        i.dist === "soma" ||
        i.dist === "towers")
        ? (t = Ij[i.name])
        : i.name === "Market Street"
          ? (t =
              i.dist === "hayes" ? 1 : i.flags & ll.tram && !i.oneway ? 2 : 0)
          : gdt.has(i.name) &&
              e.x > -3760 &&
              e.x < -3300 &&
              e.z > 2600 &&
              e.z < 2960
            ? (t = 2)
            : ((i.name === "Fell Street" && e.x > -3900 && e.x < -3650) ||
                (i.name === "Masonic Avenue" && e.z > 1470 && e.z < 2380)) &&
              (t = 3),
      t === 1 || t === 3)
    ) {
      let s = i.flags & 4 ? 0 : 2.3,
        n = i.oneway ? 0 : Vh(i) > 0.2 && Vh(i) < 0.4 ? 1.6 : 0,
        o = t === 1 ? 1.7 : 2.5,
        a = (l) => (i.oneway ? (2 * (e.w - s) - o) / l : (e.w - s - n - o) / l),
        r = Math.max(1, i.lanes);
      for (; r > 1 && a(r) < 2.8;) r--;
      a(r) < 2.8 ? (t = e.w > 3.5 ? 2 : 0) : (i.lanes = r);
    }
  }
  return (i.bcode = t);
}
function Xj(i) {
  if (!i.bikesPrepped) {
    i.bikesPrepped = !0;
    for (let t of i.edges) Ib(t);
  }
}
var tp = (i) => {
    let t = Ib(i);
    return t === 1 ? 1.7 : t === 3 ? 2.5 : 0;
  },
  eP = (i) =>
    (Math.max(1, Math.min(15, i.lanes)) + 16 * $j(i) + 64 * Ib(i)) / 4;
function Hy(i, t, e, s) {
  let n = $g(t, e, s);
  if (n.length < 2) return;
  let o = t.twin || null;
  if (t.xingS && !o) return bdt(i, t, e, s, n);
  let a = t.s1 - t.s0,
    r = tP(t),
    l = Vh(t),
    c = eP(t),
    h = (a + 4096 * r) / 256,
    f = i.v,
    u = {},
    d = {},
    p = o ? (o.s1 - o.s0 + 4096 * (tP(o) | qj)) / 256 : 0,
    m = o ? Vh(o) : 0,
    g = o ? eP(o) : 0;
  for (let b = 0; b < n.length; b++) {
    let [x, v, y, M, S, w, z] = n[b];
    Ot(t, Math.min(t.L, x + (b === n.length - 1 ? -0.01 : 0.01)), u);
    let _ = Math.hypot(S, w) || 1,
      R = S / _,
      T = w / _,
      E = u.dx,
      A = u.gy,
      C = u.dz,
      P = 0 * C - T * A,
      I = T * E - R * C,
      L = R * A - 0 * E,
      F = Math.hypot(P, I, L) || 1;
    if (((P /= F), (I /= F), (L /= F), o)) {
      for (let H of [-1, 1]) {
        let O = v + S * z * H,
          D = y + w * z * H;
        (Kj(o, O, D, d),
          i.vert(O, M - 0.02, D, P, I, L, d.s - o.s0, d.v, [
            d.w / 32,
            p,
            m,
            g,
          ]));
      }
      continue;
    }
    let N = [z / 32, h, l, c],
      B = x - t.s0;
    (i.vert(v - S * z, M, y - w * z, P, I, L, B, -z, N),
      i.vert(v + S * z, M, y + w * z, P, I, L, B, z, N));
  }
  for (let b = 0; b + 1 < n.length; b++) {
    let x = f + b * 2,
      v = x + 1,
      y = x + 2,
      M = x + 3;
    (i.tri(x, v, M), i.tri(x, M, y));
  }
}
function bdt(i, t, e, s, n) {
  let o = {},
    a = [];
  for (let [m, g] of t.xingS)
    for (let b of [m, g]) b > e + 0.05 && b < s - 0.05 && a.push(b);
  for (let m of a) {
    let g = n.findIndex((b) => b[0] > m);
    g <= 0 ||
      (Ot(t, m, o), n.splice(g, 0, [m, o.x, o.z, o.y, o.nx, o.nz, o.w]));
  }
  let r = t.s1 - t.s0,
    l = tP(t),
    c = Vh(t),
    h = eP(t),
    f = (m) => t.xingS.some(([g, b]) => m > g && m < b),
    u = -1,
    d = null,
    p = (m, g) => {
      let [b, x, v, y, M, S, w] = n[m];
      Ot(t, Math.min(t.L, b + (m === n.length - 1 ? -0.01 : 0.01)), o);
      let z = Math.hypot(M, S) || 1,
        _ = M / z,
        R = S / z,
        T = o.dx,
        E = o.gy,
        A = o.dz,
        C = -R * E,
        P = R * T - _ * A,
        I = _ * E,
        L = Math.hypot(C, P, I) || 1;
      ((C /= L), (P /= L), (I /= L));
      let F = [w / 32, (r + 4096 * (l | (g ? jj : 0))) / 256, c, h],
        N = b - t.s0,
        B = i.v;
      return (
        i.vert(x - M * w, y, v - S * w, C, P, I, N, -w, F),
        i.vert(x + M * w, y, v + S * w, C, P, I, N, w, F),
        B
      );
    };
  for (let m = 0; m + 1 < n.length; m++) {
    let g = f((n[m][0] + n[m + 1][0]) / 2),
      b = d === g && u >= 0 ? u : p(m, g),
      x = p(m + 1, g);
    (i.tri(b, b + 1, x + 1), i.tri(b, x + 1, x), (u = x), (d = g));
  }
}
function Kj(i, t, e, s = {}) {
  let n = {};
  vs(i, t, e, n);
  let o = n.s,
    a = n.v,
    r = i.P;
  if (o < 1e-6 || o > i.L - 1e-6) {
    let l = o < 1e-6 ? 0 : i.n - 1,
      c = o < 1e-6 ? 0 : i.n - 2,
      h = i.D[c * 2],
      f = i.D[c * 2 + 1],
      u = t - r[l * 3],
      d = e - r[l * 3 + 1];
    ((o = i.S[l] + u * h + d * f), (a = -u * f + d * h));
  }
  return (
    (s.s = o),
    (s.v = a),
    (s.w = Ot(i, Math.min(i.L, Math.max(0, o)), {}).w),
    s
  );
}
var xdt = 24,
  Fj = new Set(["Market Street"]);
