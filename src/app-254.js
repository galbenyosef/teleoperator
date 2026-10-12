// app 254 — math
// Lines 127567-127759 of readable/app.pretty.js (statement-aligned).
function NK(i, t, e, s, n, o, a) {
  let r = ka(Math.floor(Ws(s, n, 77) * 1e9)),
    l = e === zi.FIDI || e === zi.DOWNTOWN,
    c = [
      [i.x0 + 4, i.z0 + 0.6, i.x1 - 4, i.z0 + 0.6, 0, -1],
      [i.x0 + 4, i.z1 - 0.6, i.x1 - 4, i.z1 - 0.6, 0, 1],
      [i.x0 + 0.6, i.z0 + 4, i.x0 + 0.6, i.z1 - 4, -1, 0],
      [i.x1 - 0.6, i.z0 + 4, i.x1 - 0.6, i.z1 - 4, 1, 0],
    ];
  for (let [f, u, d, p, m, g] of c) {
    let b = Math.hypot(d - f, p - u),
      x = Math.atan2(m, g);
    for (let y = 6 + r() * 6; y < b - 2; y += 30 + r() * 6) {
      let M = y / b,
        S = f + (d - f) * M,
        w = u + (p - u) * M;
      (o.push({ kind: "lamp", x: S, y: Yt(S, w) + Ke, z: w, rot: x }),
        a.push({ t: "circ", x: S, z: w, r: 0.18 }));
    }
    let v =
      e === zi.FIDI
        ? 0.35
        : e === zi.CHINATOWN || e === zi.WATERFRONT
          ? 0.3
          : 0.7;
    for (let y = 3 + r() * 5; y < b - 2; y += 8 + r() * 9) {
      if (r() > v) continue;
      let M = y / b,
        S = f + (d - f) * M + m * 0.2,
        w = u + (p - u) * M + g * 0.2;
      (o.push({
        kind: "tree",
        x: S,
        y: Yt(S, w) + Ke,
        z: w,
        rot: r() * 6.28,
        scale: 0.7 + r() * 0.5,
      }),
        a.push({ t: "circ", x: S, z: w, r: 0.25 }));
    }
    if (!l || r() < 0.4)
      for (let y = 9 + r() * 4; y < b - 8; y += 5.6 + r() * 2.5) {
        if (r() < 0.25) {
          y += 4;
          continue;
        }
        let M = y / b,
          S = f + (d - f) * M + m * 1.78,
          w = u + (p - u) * M + g * 1.78,
          z = Math.atan2(d - f, p - u) + (r() < 0.5 ? Math.PI : 0),
          _ = Math.sin(z) * 2,
          R = Math.cos(z) * 2,
          T = (Yt(S + _, w + R) - Yt(S - _, w - R)) / 4,
          E = r(),
          A = [0, 0, 0, 1, 1, 2, 2, 3][Math.floor(r() * 8)];
        (o.push({
          kind: "car",
          x: S,
          y: Yt(S, w) + 0.02,
          z: w,
          rot: z,
          pitch: -Math.atan(T),
          color: E,
          type: A,
        }),
          a.push({
            t: "obb",
            x: S,
            z: w,
            hx: 0.93,
            hz: 2.35,
            c: Math.cos(z),
            s: Math.sin(z),
            parked: !0,
            type: A,
          }));
      }
    {
      let y = b * (0.2 + 0.6 * r()),
        M = y / b,
        S = f + (d - f) * M,
        w = u + (p - u) * M;
      (o.push({ kind: "hydrant", x: S, y: Yt(S, w) + Ke, z: w, rot: x }),
        a.push({ t: "circ", x: S, z: w, r: 0.2 }));
    }
  }
  let h = [
    [i.x0 + 0.7, i.z0 + 0.7, s, n],
    [i.x1 - 0.7, i.z0 + 0.7, s + 1, n],
    [i.x0 + 0.7, i.z1 - 0.7, s, n + 1],
    [i.x1 - 0.7, i.z1 - 0.7, s + 1, n + 1],
  ];
  for (let [f, u, d, p] of h) {
    if (d < 0 || d >= mn || p >= ws) continue;
    let m = ls[d].lanes > 1 || Qe[p].lanes > 1 || l;
    (o.push({
      kind: m ? "signal" : "stop",
      x: f,
      y: Yt(f, u) + Ke,
      z: u,
      rot: Math.atan2(ae[d] - f, fe[p] - u),
    }),
      a.push({ t: "circ", x: f, z: u, r: 0.16 }));
  }
}
function vgt(i, t, e, s, n) {
  let o = ka(i * 131 + t);
  for (let a = 0; a < 26; a++) {
    let r = e.x0 + 4 + o() * (e.x1 - e.x0 - 8),
      l = e.z0 + 4 + o() * (e.z1 - e.z0 - 8);
    (s.push({
      kind: "tree",
      x: r,
      y: Yt(r, l) + Ke,
      z: l,
      rot: o() * 6.28,
      scale: 1.1 + o() * 0.8,
    }),
      n.push({ t: "circ", x: r, z: l, r: 0.4 }));
  }
}
function UK(i, t = null) {
  let e = new Ce(),
    s = ka(5),
    n = (a, r, l, c, h) => {
      if (Hi(a, r, Math.max(l, c) * 0.75 + 8) || Io(a, r) < 1.5) return;
      let f = Io(a, r) - 2,
        u = [..._u(Yk.concat(BK), s()), iw(s() < 0.5 ? Rs.APT : Rs.OFF)];
      e.box(a - l / 2, r - c / 2, a + l / 2, r + c / 2, f, f + h, u);
    };
  for (let a = ae[0] - 1400; a < ae[0] - 140; a += 60)
    for (let r = -80; r < fe[ws - 1] + 900; r += 55)
      s() < 0.8 &&
        n(
          a + s() * 20,
          r + s() * 20,
          18 + s() * 20,
          18 + s() * 20,
          8 + s() * 18,
        );
  for (let a = ae[0] - 140; a < Ve.x + 200; a += 60)
    for (let r = fe[ws - 1] + 130; r < fe[ws - 1] + 1600; r += 55) {
      if (s() > 0.85 || t?.(a + 10, r + 10) || IC(a + 10, r + 10)) continue;
      let c = a > 700 && s() < 0.25;
      n(
        a + s() * 20,
        r + s() * 20,
        22 + s() * 20,
        22 + s() * 20,
        c ? 40 + s() * 120 : 10 + s() * 25,
      );
    }
  let o = new _e(e.geometry(), i.facade);
  return (
    (o.name = "FarCity"),
    (o.castShadow = !1),
    (o.receiveShadow = !0),
    (o.matrixAutoUpdate = !1),
    o.updateMatrix(),
    o
  );
}
as();
as();
as();
function GK(i) {
  let t = new Map(),
    e = new Map(),
    s = i.clone();
  return (
    WK(i, s, function (n, o) {
      (t.set(o, n), e.set(n, o));
    }),
    s.traverse(function (n) {
      if (!n.isSkinnedMesh) return;
      let o = n,
        a = t.get(n),
        r = a.skeleton.bones;
      ((o.skeleton = a.skeleton.clone()),
        o.bindMatrix.copy(a.bindMatrix),
        (o.skeleton.bones = r.map(function (l) {
          return e.get(l);
        })),
        o.bind(o.skeleton, o.bindMatrix));
    }),
    s
  );
}
function WK(i, t, e) {
  e(i, t);
  for (let s = 0; s < i.children.length; s++)
    WK(i.children[s], t.children[s], e);
}
