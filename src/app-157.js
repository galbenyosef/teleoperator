// app 157 — math
// Lines 97099-97319 of readable/app.pretty.js (statement-aligned).
function Y$(o) {
  if (o.tcode !== void 0) return o.tcode;
  let t = 0;
  return (
    o.cls === "busway"
      ? (t =
          o.name === "Van Ness Bus Rapid Transit" || o.name === "Market Street"
            ? 3
            : 0)
      : o.name === "Market Street" && o.flags & Al.tram && !o.oneway
        ? (t = 2)
        : Nmt.has(o.name) &&
          Hmt.has(o.dist) &&
          o.lanes >= 2 &&
          !o.hwy &&
          !o.elev &&
          (t = 1),
    t === 1 &&
      o.name === "3rd Street" &&
      Ot(o, (o.s0 + o.s1) / 2, {}).z > 1900 &&
      (t = 0),
    (o.tcode = t)
  );
}
var B$ = {
    "Valencia Street": 3,
    "Polk Street": 1,
    "Folsom Street": 3,
    "Howard Street": 3,
    "The Embarcadero": 3,
  },
  Dmt = new Set([
    "Duboce Avenue",
    "Steiner Street",
    "Waller Street",
    "Pierce Street",
    "Haight Street",
    "Scott Street",
  ]);
function yx(o) {
  if (o.bcode !== void 0) return o.bcode;
  let t = 0;
  if (
    !o.inner &&
    !o.elev &&
    !o.hwy &&
    !o.sunk &&
    o.cls !== "busway" &&
    o.cls !== "service"
  ) {
    let e = Ot(o, o.L / 2, {});
    if (
      (B$[o.name] &&
      ((o.name !== "Folsom Street" && o.name !== "Howard Street") ||
        o.dist === "soma" ||
        o.dist === "towers")
        ? (t = B$[o.name])
        : o.name === "Market Street"
          ? (t =
              o.dist === "hayes" ? 1 : o.flags & Al.tram && !o.oneway ? 2 : 0)
          : Dmt.has(o.name) &&
              e.x > -3760 &&
              e.x < -3300 &&
              e.z > 2600 &&
              e.z < 2960
            ? (t = 2)
            : ((o.name === "Fell Street" && e.x > -3900 && e.x < -3650) ||
                (o.name === "Masonic Avenue" && e.z > 1470 && e.z < 2380)) &&
              (t = 3),
      t === 1 || t === 3)
    ) {
      let s = o.flags & 4 ? 0 : 2.3,
        n = o.oneway ? 0 : kf(o) > 0.2 && kf(o) < 0.4 ? 1.6 : 0,
        i = t === 1 ? 1.7 : 2.5,
        a = (l) => (o.oneway ? (2 * (e.w - s) - i) / l : (e.w - s - n - i) / l),
        r = Math.max(1, o.lanes);
      for (; r > 1 && a(r) < 2.8;) r--;
      a(r) < 2.8 ? (t = e.w > 3.5 ? 2 : 0) : (o.lanes = r);
    }
  }
  return (o.bcode = t);
}
function J$(o) {
  if (!o.bikesPrepped) {
    o.bikesPrepped = !0;
    for (let t of o.edges) yx(t);
  }
}
var Cp = (o) => {
    let t = yx(o);
    return t === 1 ? 1.7 : t === 3 ? 2.5 : 0;
  },
  CC = (o) =>
    (Math.max(1, Math.min(15, o.lanes)) + 16 * Y$(o) + 64 * yx(o)) / 4;
function Lw(o, t, e, s) {
  let n = Ob(t, e, s);
  if (n.length < 2) return;
  let i = t.twin || null;
  if (t.xingS && !i) return Umt(o, t, e, s, n);
  let a = t.s1 - t.s0,
    r = PC(t),
    l = kf(t),
    c = CC(t),
    h = (a + 4096 * r) / 256,
    f = o.v,
    u = {},
    d = {},
    p = i ? (i.s1 - i.s0 + 4096 * (PC(i) | $$)) / 256 : 0,
    m = i ? kf(i) : 0,
    g = i ? CC(i) : 0;
  for (let b = 0; b < n.length; b++) {
    let [v, x, y, M, S, w, _] = n[b];
    Ot(t, Math.min(t.L, v + (b === n.length - 1 ? -0.01 : 0.01)), u);
    let z = Math.hypot(S, w) || 1,
      A = S / z,
      T = w / z,
      E = u.dx,
      R = u.gy,
      P = u.dz,
      C = 0 * P - T * R,
      I = T * E - A * P,
      L = A * R - 0 * E,
      F = Math.hypot(C, I, L) || 1;
    if (((C /= F), (I /= F), (L /= F), i)) {
      for (let H of [-1, 1]) {
        let N = x + S * _ * H,
          D = y + w * _ * H;
        (Z$(i, N, D, d),
          o.vert(N, M - 0.02, D, C, I, L, d.s - i.s0, d.v, [
            d.w / 32,
            p,
            m,
            g,
          ]));
      }
      continue;
    }
    let O = [_ / 32, h, l, c],
      B = v - t.s0;
    (o.vert(x - S * _, M, y - w * _, C, I, L, B, -_, O),
      o.vert(x + S * _, M, y + w * _, C, I, L, B, _, O));
  }
  for (let b = 0; b + 1 < n.length; b++) {
    let v = f + b * 2,
      x = v + 1,
      y = v + 2,
      M = v + 3;
    (o.tri(v, x, M), o.tri(v, M, y));
  }
}
function Umt(o, t, e, s, n) {
  let i = {},
    a = [];
  for (let [m, g] of t.xingS)
    for (let b of [m, g]) b > e + 0.05 && b < s - 0.05 && a.push(b);
  for (let m of a) {
    let g = n.findIndex((b) => b[0] > m);
    g <= 0 ||
      (Ot(t, m, i), n.splice(g, 0, [m, i.x, i.z, i.y, i.nx, i.nz, i.w]));
  }
  let r = t.s1 - t.s0,
    l = PC(t),
    c = kf(t),
    h = CC(t),
    f = (m) => t.xingS.some(([g, b]) => m > g && m < b),
    u = -1,
    d = null,
    p = (m, g) => {
      let [b, v, x, y, M, S, w] = n[m];
      Ot(t, Math.min(t.L, b + (m === n.length - 1 ? -0.01 : 0.01)), i);
      let _ = Math.hypot(M, S) || 1,
        z = M / _,
        A = S / _,
        T = i.dx,
        E = i.gy,
        R = i.dz,
        P = -A * E,
        C = A * T - z * R,
        I = z * E,
        L = Math.hypot(P, C, I) || 1;
      ((P /= L), (C /= L), (I /= L));
      let F = [w / 32, (r + 4096 * (l | (g ? X$ : 0))) / 256, c, h],
        O = b - t.s0,
        B = o.v;
      return (
        o.vert(v - M * w, y, x - S * w, P, C, I, O, -w, F),
        o.vert(v + M * w, y, x + S * w, P, C, I, O, w, F),
        B
      );
    };
  for (let m = 0; m + 1 < n.length; m++) {
    let g = f((n[m][0] + n[m + 1][0]) / 2),
      b = d === g && u >= 0 ? u : p(m, g),
      v = p(m + 1, g);
    (o.tri(b, b + 1, v + 1), o.tri(b, v + 1, v), (u = v), (d = g));
  }
}
function Z$(o, t, e, s = {}) {
  let n = {};
  ys(o, t, e, n);
  let i = n.s,
    a = n.v,
    r = o.P;
  if (i < 1e-6 || i > o.L - 1e-6) {
    let l = i < 1e-6 ? 0 : o.n - 1,
      c = i < 1e-6 ? 0 : o.n - 2,
      h = o.D[c * 2],
      f = o.D[c * 2 + 1],
      u = t - r[l * 3],
      d = e - r[l * 3 + 1];
    ((i = o.S[l] + u * h + d * f), (a = -u * f + d * h));
  }
  return (
    (s.s = i),
    (s.v = a),
    (s.w = Ot(o, Math.min(o.L, Math.max(0, i)), {}).w),
    s
  );
}
var Gmt = 24,
  N$ = new Set(["Market Street"]);
