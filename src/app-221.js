// app 221 — math
// Lines 116712-116972 of readable/app.pretty.js (statement-aligned).
function FX(i, t, e, s, n) {
  let o = Ei(e, s),
    a = Ca(e, s),
    r = ka(e * 977 + s * 131),
    l = [],
    c = (E, A, C, P) => {
      let I = E,
        L = 0;
      for (; I < A - 4;) {
        let F = C[Math.floor(r() * C.length)];
        (A - I - F < 6 && (F = A - I), P(I, I + F, L++), (I += F));
      }
    },
    h = 2.4,
    f = 16.5,
    u = 13.5,
    d = n === "s" ? o.z1 - h : o.z0 + h,
    p = n === "s" ? d - f : d + f;
  c(o.x0, o.x1, [7.6, 8.4, 9.2, 10.5], (E, A, C) =>
    l.push({
      x0: E,
      x1: A,
      z0: Math.min(d, p),
      z1: Math.max(d, p),
      front: n,
      h: 12 + r() * 3,
      grp: r() < 0.55 ? "vic" : "edw",
      seed: r(),
      street: { w: E <= o.x0 + 0.01, e: A >= o.x1 - 0.01 },
      color: Jb[Math.floor(r() * Jb.length)],
      lomb: !0,
    }),
  );
  let m = n === "s" ? o.z0 : o.z1 - u,
    g = n === "s" ? o.z0 + u : o.z1,
    b = n === "s" ? "n" : "s";
  c(o.x0, o.x1, [7.6, 7.6, 8.4, 9.5], (E, A) =>
    l.push({
      x0: E,
      x1: A,
      z0: m,
      z1: g,
      front: b,
      h: 9.5 + r() * 3,
      grp: r() < 0.6 ? "vic" : "edw",
      seed: r(),
      street: { w: E <= o.x0 + 0.01, e: A >= o.x1 - 0.01 },
      color: Jb[Math.floor(r() * Jb.length)],
    }),
  );
  let x = n === "s" ? g : p,
    v = n === "s" ? p : m;
  for (let [E, A, C] of [
    [o.x0, o.x0 + u, "w"],
    [o.x1 - u, o.x1, "e"],
  ])
    c(x, v, [7.6, 8.4, 9.5], (P, I) =>
      l.push({
        x0: E,
        x1: A,
        z0: P,
        z1: I,
        front: C,
        h: 9.5 + r() * 3,
        grp: r() < 0.6 ? "vic" : "edw",
        seed: r(),
        street: {},
        color: Jb[Math.floor(r() * Jb.length)],
      }),
    );
  for (let E of l) c2t(i, t, E);
  i.colliders.push({ t: "box", x0: o.x0, z0: o.z0, x1: o.x1, z1: o.z1 });
  let y = t.G("lombard", "ground"),
    M = t.G("lombard", "wall"),
    S = t.G("lombard", "foliage");
  Aa(
    y,
    o.x0,
    o.z0,
    o.x1,
    o.z1,
    2.5,
    () => 1,
    (E, A) => Yt(E, A) + Ke + 0.04,
    [0.5, 0.56, 0.42, To.lawn],
  );
  let w = n === "s" ? o.z1 - 0.25 : o.z0 + 0.25,
    z = Math.min(w, d),
    _ = Math.max(w, d);
  Aa(
    y,
    o.x0,
    z,
    o.x1,
    _,
    0.6,
    () => 1,
    (E, A) => Yt(E, A) + Ke + 0.12,
    [0.95, 0.95, 0.95, To.bed],
  );
  let R = [0.66, 0.36, 0.3, hi.brick];
  for (let E = o.x0; E < o.x1 - 0.01; E += 1) {
    let A = Math.min(E + 1, o.x1),
      C = Math.min(Yt(E, w), Yt(A, w)) + Ke - 0.05,
      P = Yt(E, w) + Ke + 0.75,
      I = Yt(A, w) + Ke + 0.75;
    if (
      (Ne(
        M,
        (E + A) / 2,
        w,
        1,
        0,
        (A - E) / 2,
        0.2,
        C,
        (P + I) / 2,
        R,
        [0, 0, 1, 1, 1, 0],
      ),
      Math.floor(E) % 11 !== 5)
    )
      for (let L = 0; L < 2; L++)
        Ga(
          S,
          [E + 0.5, (P + I) / 2 - 0.2, w + (n === "s" ? -0.55 : 0.55)],
          L * 1.2 + E,
          1.3,
          1,
          Wa(Ws(Math.floor(E / 3), s) < 0.5 ? 0 : 1),
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
  for (let [E, A, C, P, I, L] of T) {
    let F = Math.hypot(C - E, P - A),
      N = Math.atan2(I, L);
    for (let B = 6 + r() * 6; B < F - 2; B += 30 + r() * 6) {
      let H = B / F,
        O = E + (C - E) * H,
        D = A + (P - A) * H;
      (i.inst.push({ kind: "lamp", x: O, y: Yt(O, D) + Ke, z: D, rot: N }),
        i.colliders.push({ t: "circ", x: O, z: D, r: 0.18 }));
    }
    for (let B = 3 + r() * 5; B < F - 2; B += 9 + r() * 9) {
      if (r() > 0.6) continue;
      let H = B / F,
        O = E + (C - E) * H + I * 0.2,
        D = A + (P - A) * H + L * 0.2;
      (i.inst.push({
        kind: "tree",
        x: O,
        y: Yt(O, D) + Ke,
        z: D,
        rot: r() * 6.28,
        scale: 0.7 + r() * 0.5,
      }),
        i.colliders.push({ t: "circ", x: O, z: D, r: 0.25 }));
    }
    for (let B = 9 + r() * 4; B < F - 8; B += 5.6 + r() * 2.5) {
      if (r() < 0.25) {
        B += 4;
        continue;
      }
      let H = B / F,
        O = E + (C - E) * H + I * 1.78,
        D = A + (P - A) * H + L * 1.78,
        U = Math.atan2(C - E, P - A) + (r() < 0.5 ? Math.PI : 0),
        G = Math.sin(U) * 2,
        q = Math.cos(U) * 2,
        W = (Yt(O + G, D + q) - Yt(O - G, D - q)) / 4;
      (i.inst.push({
        kind: "car",
        x: O,
        y: Yt(O, D) + 0.02,
        z: D,
        rot: U,
        pitch: -Math.atan(W),
        color: r(),
        type: [0, 0, 0, 1, 1, 2, 2, 3][Math.floor(r() * 8)],
      }),
        i.colliders.push({
          t: "obb",
          x: O,
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
        O = E + (C - E) * H,
        D = A + (P - A) * H;
      (i.inst.push({ kind: "hydrant", x: O, y: Yt(O, D) + Ke, z: D, rot: N }),
        i.colliders.push({ t: "circ", x: O, z: D, r: 0.2 }));
    }
  }
  for (let [E, A, C, P] of [
    [a.x0 + 0.7, a.z0 + 0.7, e, s],
    [a.x1 - 0.7, a.z0 + 0.7, e + 1, s],
    [a.x0 + 0.7, a.z1 - 0.7, e, s + 1],
    [a.x1 - 0.7, a.z1 - 0.7, e + 1, s + 1],
  ])
    (n === "s" && P === s + 1) ||
      (n === "n" && P === s) ||
      (i.inst.push({
        kind: "stop",
        x: E,
        y: Yt(E, A) + Ke,
        z: A,
        rot: Math.atan2(ae[C] - E, fe[P] - A),
      }),
      i.colliders.push({ t: "circ", x: E, z: A, r: 0.16 }));
  for (let E = 0; E < 7; E++) {
    let A = o.x0 + 16 + r() * (o.x1 - o.x0 - 32),
      C = (n === "s" ? g + 3 : p + 3) + r() * Math.max(1, Math.abs(v - x) - 6);
    i.inst.push({
      kind: "tree",
      x: A,
      y: Yt(A, C) + Ke,
      z: C,
      rot: r() * 6.28,
      scale: 1 + r() * 0.6,
    });
  }
}
En();
var Yh = [0.62, 0.1, 0.035, 0],
  Kl = [0.5, 0.075, 0.027, 0],
  wu = [0.68, 0.12, 0.045, 0],
  BX = [0.62, 0.1, 0.035, 0.4],
  fl = 17.5,
  OX = 11.5;
function h2t(i) {
  let t = (c) => Fh("gg", c),
    e = Ye.towerTop,
    { sAnchS: s, sTowerS: n, sTowerN: o, sAnchN: a } = Ye,
    r = t((n + o) / 2).y + 3;
  if (i <= n) {
    let c = (i - s) / (n - s),
      h = t(s).y + 4;
    return h + (e - h) * c - 72 * c * (1 - c);
  }
  if (i >= o) {
    let c = (i - o) / (a - o),
      h = t(a).y + 4;
    return e + (h - e) * c - 72 * c * (1 - c);
  }
  let l = ((i - n) / (o - n)) * 2 - 1;
  return r + (e - r) * l * l;
}
