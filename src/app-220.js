// app 220 — math
// Lines 116968-117228 of readable/app.pretty.js (statement-aligned).
function NY(o, t, e, s, n) {
  let i = Hi(e, s),
    a = Wa(e, s),
    r = Fa(e * 977 + s * 131),
    l = [],
    c = (E, R, P, C) => {
      let I = E,
        L = 0;
      for (; I < R - 4;) {
        let F = P[Math.floor(r() * P.length)];
        (R - I - F < 6 && (F = R - I), C(I, I + F, L++), (I += F));
      }
    },
    h = 2.4,
    f = 16.5,
    u = 13.5,
    d = n === "s" ? i.z1 - h : i.z0 + h,
    p = n === "s" ? d - f : d + f;
  c(i.x0, i.x1, [7.6, 8.4, 9.2, 10.5], (E, R, P) =>
    l.push({
      x0: E,
      x1: R,
      z0: Math.min(d, p),
      z1: Math.max(d, p),
      front: n,
      h: 12 + r() * 3,
      grp: r() < 0.55 ? "vic" : "edw",
      seed: r(),
      street: { w: E <= i.x0 + 0.01, e: R >= i.x1 - 0.01 },
      color: Bx[Math.floor(r() * Bx.length)],
      lomb: !0,
    }),
  );
  let m = n === "s" ? i.z0 : i.z1 - u,
    g = n === "s" ? i.z0 + u : i.z1,
    b = n === "s" ? "n" : "s";
  c(i.x0, i.x1, [7.6, 7.6, 8.4, 9.5], (E, R) =>
    l.push({
      x0: E,
      x1: R,
      z0: m,
      z1: g,
      front: b,
      h: 9.5 + r() * 3,
      grp: r() < 0.6 ? "vic" : "edw",
      seed: r(),
      street: { w: E <= i.x0 + 0.01, e: R >= i.x1 - 0.01 },
      color: Bx[Math.floor(r() * Bx.length)],
    }),
  );
  let v = n === "s" ? g : p,
    x = n === "s" ? p : m;
  for (let [E, R, P] of [
    [i.x0, i.x0 + u, "w"],
    [i.x1 - u, i.x1, "e"],
  ])
    c(v, x, [7.6, 8.4, 9.5], (C, I) =>
      l.push({
        x0: E,
        x1: R,
        z0: C,
        z1: I,
        front: P,
        h: 9.5 + r() * 3,
        grp: r() < 0.6 ? "vic" : "edw",
        seed: r(),
        street: {},
        color: Bx[Math.floor(r() * Bx.length)],
      }),
    );
  for (let E of l) Lxt(o, t, E);
  o.colliders.push({ t: "box", x0: i.x0, z0: i.z0, x1: i.x1, z1: i.z1 });
  let y = t.G("lombard", "ground"),
    M = t.G("lombard", "wall"),
    S = t.G("lombard", "foliage");
  Da(
    y,
    i.x0,
    i.z0,
    i.x1,
    i.z1,
    2.5,
    () => 1,
    (E, R) => $t(E, R) + Ze + 0.04,
    [0.5, 0.56, 0.42, Ho.lawn],
  );
  let w = n === "s" ? i.z1 - 0.25 : i.z0 + 0.25,
    _ = Math.min(w, d),
    z = Math.max(w, d);
  Da(
    y,
    i.x0,
    _,
    i.x1,
    z,
    0.6,
    () => 1,
    (E, R) => $t(E, R) + Ze + 0.12,
    [0.95, 0.95, 0.95, Ho.bed],
  );
  let A = [0.66, 0.36, 0.3, yi.brick];
  for (let E = i.x0; E < i.x1 - 0.01; E += 1) {
    let R = Math.min(E + 1, i.x1),
      P = Math.min($t(E, w), $t(R, w)) + Ze - 0.05,
      C = $t(E, w) + Ze + 0.75,
      I = $t(R, w) + Ze + 0.75;
    if (
      (Ge(
        M,
        (E + R) / 2,
        w,
        1,
        0,
        (R - E) / 2,
        0.2,
        P,
        (C + I) / 2,
        A,
        [0, 0, 1, 1, 1, 0],
      ),
      Math.floor(E) % 11 !== 5)
    )
      for (let L = 0; L < 2; L++)
        nr(
          S,
          [E + 0.5, (C + I) / 2 - 0.2, w + (n === "s" ? -0.55 : 0.55)],
          L * 1.2 + E,
          1.3,
          1,
          ir(js(Math.floor(E / 3), s) < 0.5 ? 0 : 1),
          [0.9, 0.9, 0.9, 1],
        );
  }
  let T = [
    [a.x0 + 0.6, a.z0 + 4, a.x0 + 0.6, a.z1 - 4, -1, 0],
    [a.x1 - 0.6, a.z0 + 4, a.x1 - 0.6, a.z1 - 4, 1, 0],
    n === "s"
      ? [a.x0 + 4, a.z0 + 0.6, a.x1 - 4, a.z0 + 0.6, 0, -1]
      : [a.x0 + 4, a.z1 - 0.6, a.x1 - 4, a.z1 - 0.6, 0, 1],
  ];
  for (let [E, R, P, C, I, L] of T) {
    let F = Math.hypot(P - E, C - R),
      O = Math.atan2(I, L);
    for (let B = 6 + r() * 6; B < F - 2; B += 30 + r() * 6) {
      let H = B / F,
        N = E + (P - E) * H,
        D = R + (C - R) * H;
      (o.inst.push({ kind: "lamp", x: N, y: $t(N, D) + Ze, z: D, rot: O }),
        o.colliders.push({ t: "circ", x: N, z: D, r: 0.18 }));
    }
    for (let B = 3 + r() * 5; B < F - 2; B += 9 + r() * 9) {
      if (r() > 0.6) continue;
      let H = B / F,
        N = E + (P - E) * H + I * 0.2,
        D = R + (C - R) * H + L * 0.2;
      (o.inst.push({
        kind: "tree",
        x: N,
        y: $t(N, D) + Ze,
        z: D,
        rot: r() * 6.28,
        scale: 0.7 + r() * 0.5,
      }),
        o.colliders.push({ t: "circ", x: N, z: D, r: 0.25 }));
    }
    for (let B = 9 + r() * 4; B < F - 8; B += 5.6 + r() * 2.5) {
      if (r() < 0.25) {
        B += 4;
        continue;
      }
      let H = B / F,
        N = E + (P - E) * H + I * 1.78,
        D = R + (C - R) * H + L * 1.78,
        U = Math.atan2(P - E, C - R) + (r() < 0.5 ? Math.PI : 0),
        G = Math.sin(U) * 2,
        W = Math.cos(U) * 2,
        V = ($t(N + G, D + W) - $t(N - G, D - W)) / 4;
      (o.inst.push({
        kind: "car",
        x: N,
        y: $t(N, D) + 0.02,
        z: D,
        rot: U,
        pitch: -Math.atan(V),
        color: r(),
        type: [0, 0, 0, 1, 1, 2, 2, 3][Math.floor(r() * 8)],
      }),
        o.colliders.push({
          t: "obb",
          x: N,
          z: D,
          hx: 0.93,
          hz: 2.35,
          c: Math.cos(U),
          s: Math.sin(U),
          parked: !0,
        }));
    }
    {
      let B = F * (0.2 + 0.6 * r()),
        H = B / F,
        N = E + (P - E) * H,
        D = R + (C - R) * H;
      (o.inst.push({ kind: "hydrant", x: N, y: $t(N, D) + Ze, z: D, rot: O }),
        o.colliders.push({ t: "circ", x: N, z: D, r: 0.2 }));
    }
  }
  for (let [E, R, P, C] of [
    [a.x0 + 0.7, a.z0 + 0.7, e, s],
    [a.x1 - 0.7, a.z0 + 0.7, e + 1, s],
    [a.x0 + 0.7, a.z1 - 0.7, e, s + 1],
    [a.x1 - 0.7, a.z1 - 0.7, e + 1, s + 1],
  ])
    (n === "s" && C === s + 1) ||
      (n === "n" && C === s) ||
      (o.inst.push({
        kind: "stop",
        x: E,
        y: $t(E, R) + Ze,
        z: R,
        rot: Math.atan2(he[P] - E, pe[C] - R),
      }),
      o.colliders.push({ t: "circ", x: E, z: R, r: 0.16 }));
  for (let E = 0; E < 7; E++) {
    let R = i.x0 + 16 + r() * (i.x1 - i.x0 - 32),
      P = (n === "s" ? g + 3 : p + 3) + r() * Math.max(1, Math.abs(x - v) - 6);
    o.inst.push({
      kind: "tree",
      x: R,
      y: $t(R, P) + Ze,
      z: P,
      rot: r() * 6.28,
      scale: 1 + r() * 0.6,
    });
  }
}
Pn();
var Rf = [0.62, 0.1, 0.035, 0],
  gc = [0.5, 0.075, 0.027, 0],
  sd = [0.68, 0.12, 0.045, 0],
  DY = [0.62, 0.1, 0.035, 0.4],
  Ll = 17.5,
  UY = 11.5;
function Ixt(o) {
  let t = (c) => ff("gg", c),
    e = Qe.towerTop,
    { sAnchS: s, sTowerS: n, sTowerN: i, sAnchN: a } = Qe,
    r = t((n + i) / 2).y + 3;
  if (o <= n) {
    let c = (o - s) / (n - s),
      h = t(s).y + 4;
    return h + (e - h) * c - 72 * c * (1 - c);
  }
  if (o >= i) {
    let c = (o - i) / (a - i),
      h = t(a).y + 4;
    return e + (h - e) * c - 72 * c * (1 - c);
  }
  let l = ((o - n) / (i - n)) * 2 - 1;
  return r + (e - r) * l * l;
}
