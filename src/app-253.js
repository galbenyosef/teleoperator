// app 253 — math
// Lines 127826-128018 of readable/app.pretty.js (statement-aligned).
function HJ(o, t, e, s, n, i, a) {
  let r = Fa(Math.floor(js(s, n, 77) * 1e9)),
    l = e === Bi.FIDI || e === Bi.DOWNTOWN,
    c = [
      [o.x0 + 4, o.z0 + 0.6, o.x1 - 4, o.z0 + 0.6, 0, -1],
      [o.x0 + 4, o.z1 - 0.6, o.x1 - 4, o.z1 - 0.6, 0, 1],
      [o.x0 + 0.6, o.z0 + 4, o.x0 + 0.6, o.z1 - 4, -1, 0],
      [o.x1 - 0.6, o.z0 + 4, o.x1 - 0.6, o.z1 - 4, 1, 0],
    ];
  for (let [f, u, d, p, m, g] of c) {
    let b = Math.hypot(d - f, p - u),
      v = Math.atan2(m, g);
    for (let y = 6 + r() * 6; y < b - 2; y += 30 + r() * 6) {
      let M = y / b,
        S = f + (d - f) * M,
        w = u + (p - u) * M;
      (i.push({ kind: "lamp", x: S, y: $t(S, w) + Ze, z: w, rot: v }),
        a.push({ t: "circ", x: S, z: w, r: 0.18 }));
    }
    let x =
      e === Bi.FIDI
        ? 0.35
        : e === Bi.CHINATOWN || e === Bi.WATERFRONT
          ? 0.3
          : 0.7;
    for (let y = 3 + r() * 5; y < b - 2; y += 8 + r() * 9) {
      if (r() > x) continue;
      let M = y / b,
        S = f + (d - f) * M + m * 0.2,
        w = u + (p - u) * M + g * 0.2;
      (i.push({
        kind: "tree",
        x: S,
        y: $t(S, w) + Ze,
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
          _ = Math.atan2(d - f, p - u) + (r() < 0.5 ? Math.PI : 0),
          z = Math.sin(_) * 2,
          A = Math.cos(_) * 2,
          T = ($t(S + z, w + A) - $t(S - z, w - A)) / 4,
          E = r(),
          R = [0, 0, 0, 1, 1, 2, 2, 3][Math.floor(r() * 8)];
        (i.push({
          kind: "car",
          x: S,
          y: $t(S, w) + 0.02,
          z: w,
          rot: _,
          pitch: -Math.atan(T),
          color: E,
          type: R,
        }),
          a.push({
            t: "obb",
            x: S,
            z: w,
            hx: 0.93,
            hz: 2.35,
            c: Math.cos(_),
            s: Math.sin(_),
            parked: !0,
            type: R,
          }));
      }
    {
      let y = b * (0.2 + 0.6 * r()),
        M = y / b,
        S = f + (d - f) * M,
        w = u + (p - u) * M;
      (i.push({ kind: "hydrant", x: S, y: $t(S, w) + Ze, z: w, rot: v }),
        a.push({ t: "circ", x: S, z: w, r: 0.2 }));
    }
  }
  let h = [
    [o.x0 + 0.7, o.z0 + 0.7, s, n],
    [o.x1 - 0.7, o.z0 + 0.7, s + 1, n],
    [o.x0 + 0.7, o.z1 - 0.7, s, n + 1],
    [o.x1 - 0.7, o.z1 - 0.7, s + 1, n + 1],
  ];
  for (let [f, u, d, p] of h) {
    if (d < 0 || d >= xn || p >= ks) continue;
    let m = ps[d].lanes > 1 || ns[p].lanes > 1 || l;
    (i.push({
      kind: m ? "signal" : "stop",
      x: f,
      y: $t(f, u) + Ze,
      z: u,
      rot: Math.atan2(he[d] - f, pe[p] - u),
    }),
      a.push({ t: "circ", x: f, z: u, r: 0.16 }));
  }
}
function Vvt(o, t, e, s, n) {
  let i = Fa(o * 131 + t);
  for (let a = 0; a < 26; a++) {
    let r = e.x0 + 4 + i() * (e.x1 - e.x0 - 8),
      l = e.z0 + 4 + i() * (e.z1 - e.z0 - 8);
    (s.push({
      kind: "tree",
      x: r,
      y: $t(r, l) + Ze,
      z: l,
      rot: i() * 6.28,
      scale: 1.1 + i() * 0.8,
    }),
      n.push({ t: "circ", x: r, z: l, r: 0.4 }));
  }
}
function WJ(o, t = null) {
  let e = new Be(),
    s = Fa(5),
    n = (a, r, l, c, h) => {
      if (Ni(a, r, Math.max(l, c) * 0.75 + 8) || Vo(a, r) < 1.5) return;
      let f = Vo(a, r) - 2,
        u = [...ad(Yz.concat(DJ), s()), Qw(s() < 0.5 ? Ls.APT : Ls.OFF)];
      e.box(a - l / 2, r - c / 2, a + l / 2, r + c / 2, f, f + h, u);
    };
  for (let a = he[0] - 1400; a < he[0] - 140; a += 60)
    for (let r = -80; r < pe[ks - 1] + 900; r += 55)
      s() < 0.8 &&
        n(
          a + s() * 20,
          r + s() * 20,
          18 + s() * 20,
          18 + s() * 20,
          8 + s() * 18,
        );
  for (let a = he[0] - 140; a < Ye.x + 200; a += 60)
    for (let r = pe[ks - 1] + 130; r < pe[ks - 1] + 1600; r += 55) {
      if (s() > 0.85 || t?.(a + 10, r + 10) || hI(a + 10, r + 10)) continue;
      let c = a > 700 && s() < 0.25;
      n(
        a + s() * 20,
        r + s() * 20,
        22 + s() * 20,
        22 + s() * 20,
        c ? 40 + s() * 120 : 10 + s() * 25,
      );
    }
  let i = new ye(e.geometry(), o.facade);
  return (
    (i.name = "FarCity"),
    (i.castShadow = !1),
    (i.receiveShadow = !0),
    (i.matrixAutoUpdate = !1),
    i.updateMatrix(),
    i
  );
}
es();
es();
es();
function qJ(o) {
  let t = new Map(),
    e = new Map(),
    s = o.clone();
  return (
    jJ(o, s, function (n, i) {
      (t.set(i, n), e.set(n, i));
    }),
    s.traverse(function (n) {
      if (!n.isSkinnedMesh) return;
      let i = n,
        a = t.get(n),
        r = a.skeleton.bones;
      ((i.skeleton = a.skeleton.clone()),
        i.bindMatrix.copy(a.bindMatrix),
        (i.skeleton.bones = r.map(function (l) {
          return e.get(l);
        })),
        i.bind(i.skeleton, i.bindMatrix));
    }),
    s
  );
}
function jJ(o, t, e) {
  e(o, t);
  for (let s = 0; s < o.children.length; s++)
    jJ(o.children[s], t.children[s], e);
}
