// app 56 — math
// Lines 63636-63937 of readable/app.pretty.js (statement-aligned).
Ya();
Ab();
var wW = null,
  tP = () => wW;
function bdt() {
  let o = (c) => ff("bb", c),
    t = o(0),
    e = 16,
    s = -1,
    n = ts.anch + 12,
    i = ts.anchE - 5,
    a = xdt(),
    r = new Float32Array(32),
    l = new Float32Array(32);
  for (let c = 0; c < 32; c++) {
    let h = n + ((i - n) * c) / 31,
      f = o(h),
      u =
        ts.towers.some((d) => Math.abs(h - d) < 9) ||
        Math.abs(h - ts.center) < 30;
    ((r[c] = f.y + 0.6), (l[c] = u ? f.y : Math.max(f.y + 0.6, a(h) - 0.3)));
  }
  return {
    o: [t.x - t.uz * e * s, t.z + t.ux * e * s],
    d: [ts.dir[0], ts.dir[1]],
    s0: n,
    s1: i,
    deck: r,
    cable: l,
  };
}
function xdt() {
  let o = (n) => ff("bb", n),
    t = ts.towerTop,
    e = o(ts.center).y + 38,
    s = [
      [ts.anch, ts.towers[0], ts.towers[1], ts.center],
      [ts.center, ts.towers[2], ts.towers[3], ts.anchE],
    ];
  return (n) => {
    for (let [i, a, r, l] of s) {
      if (n < i - 1e-6 || n > l + 1e-6) continue;
      let c = i === ts.center ? e : o(i).y + 3,
        h = l === ts.center ? e : o(l).y + 3,
        f = o((a + r) / 2).y + 3;
      if (n <= a) {
        let d = (n - i) / (a - i);
        return c + (t - c) * d - 48 * d * (1 - d);
      }
      if (n >= r) {
        let d = (n - r) / (l - r);
        return t + (h - t) * d - 48 * d * (1 - d);
      }
      let u = ((n - a) / (r - a)) * 2 - 1;
      return f + (t - f) * u * u;
    }
    return o(n).y;
  };
}
function pk(o) {
  wW = bdt();
  let t = (d) => ff("bb", d),
    e = 16,
    s = ts.towerTop,
    n = t(ts.center).y + 38,
    i = [
      [ts.anch, ts.towers[0], ts.towers[1], ts.center],
      [ts.center, ts.towers[2], ts.towers[3], ts.anchE],
    ],
    a = (d) => {
      for (let [p, m, g, b] of i) {
        if (d < p - 1e-6 || d > b + 1e-6) continue;
        let v = p === ts.center ? n : t(p).y + 3,
          x = b === ts.center ? n : t(b).y + 3,
          y = t((m + g) / 2).y + 3;
        if (d <= m) {
          let S = (d - p) / (m - p);
          return v + (s - v) * S - 48 * S * (1 - S);
        }
        if (d >= g) {
          let S = (d - g) / (b - g);
          return s + (x - s) * S - 48 * S * (1 - S);
        }
        let M = ((d - m) / (g - m)) * 2 - 1;
        return y + (s - y) * M * M;
      }
      return t(d).y;
    },
    r = new Be(),
    l = 2,
    c = -1,
    h = [0, 0, 0, 1];
  for (let d = ts.anch + 12; d < ts.anchE - 5; d += 12) {
    if (
      ts.towers.some((y) => Math.abs(d - y) < 7) ||
      Math.abs(d - ts.center) < 26
    )
      continue;
    let p = t(d),
      m = a(d);
    if (m - p.y < 1.5) continue;
    let g = p.x - p.uz * e * c,
      b = p.z + p.ux * e * c,
      v = p.y + 0.6,
      x = m - 0.3;
    for (let [y, M] of [
      [p.ux, p.uz],
      [-p.uz, p.ux],
    ])
      r.quad(
        [g - y * l, v, b - M * l],
        [g + y * l, v, b + M * l],
        [g + y * l, x, b + M * l],
        [g - y * l, x, b - M * l],
        [-l, v],
        [l, v],
        [l, x],
        [-l, x],
        h,
        [M, 0, -y],
      );
  }
  let f = t(0),
    u = [ts.dir[0], ts.dir[1]];
  o.extra.push((d, p, m) => {
    let g = new me({
      color: 16777215,
      roughness: 0.5,
      vertexColors: !0,
      alphaTest: 0.5,
      side: ls,
    });
    ((g.userData.mbAlbedo = JV(f.x, f.z, u[0], u[1])),
      (g.userData.dayGlow = 0));
    let b = document.createElement("canvas");
    b.width = b.height = 4;
    let v = b.getContext("2d");
    ((v.fillStyle = "#fff"),
      v.fillRect(0, 0, 4, 4),
      (g.map = new Sn(b)),
      m.push(g));
    let x = new ye(r.geometry(), g);
    ((x.name = "wf_baylights"),
      (x.castShadow = !1),
      (x.receiveShadow = !1),
      (x.matrixAutoUpdate = !1),
      x.updateMatrix(),
      (x.renderOrder = 2),
      d.add(x),
      o.tick.push((y) => {
        ((g.color.r = y % 1e3), (x.visible = g.color.b > 0.05));
      }));
  });
}
Pn();
await oc();
await fp();
await up();
await fp();
await up();
function MW(o) {
  for (let [t, e] of [
    ["rails", vdt],
    ["promenade", ydt],
  ])
    try {
      e(o);
    } catch (s) {
      console.error("waterfront street:", t, s);
    }
}
function vdt({ B: o, colliders: t }) {
  let e = he[xn - 1],
    s = pe[0],
    n = 3 + 0.07,
    i = Rt([0.13, 0.13, 0.125], Tt.conc),
    a = Rt([0.55, 0.55, 0.56], Tt.metal),
    r = Rt([0.03, 0.03, 0.03], Tt.paint),
    l = Rt([0.12, 0.2, 0.15], Tt.metal),
    c = Rt([0.08, 0.08, 0.08], Tt.metal),
    h = [3.17, 3.65],
    f = (b, v) => {
      let x = o.get(v, "solid");
      for (let y = 0; y + 1 < b.length; y++) {
        let [M, S] = b[y],
          [w, _] = b[y + 1],
          z = Math.hypot(w - M, _ - S);
        if (z < 0.001) continue;
        let A = -(_ - S) / z,
          T = (w - M) / z;
        for (let [E, R, P, C] of [
          [0.7175, 0.08, a, 0.004],
          [-0.7175, 0.08, a, 0.004],
          [0.66, 0.04, r, 0],
          [-0.66, 0.04, r, 0],
        ]) {
          let I = E,
            L = R / 2,
            F = n + C,
            O = [M + A * (I - L), F, S + T * (I - L)],
            B = [w + A * (I - L), F, _ + T * (I - L)],
            H = [w + A * (I + L), F, _ + T * (I + L)],
            N = [M + A * (I + L), F, S + T * (I + L)];
          $i(x, [O, B, H, N], P);
        }
      }
    },
    u = pe[ks - 1] + ns[ks - 1].hw,
    d = he[6],
    p = (b, v, x) => {
      let y = Math.ceil(Math.hypot(v[0] - b[0], v[1] - b[1]) / 200),
        M = [];
      for (let S = 0; S <= y; S++)
        M.push([
          b[0] + ((v[0] - b[0]) * S) / y,
          b[1] + ((v[1] - b[1]) * S) / y,
        ]);
      f(M, x);
    },
    m = (b, v, x, y, M) => {
      let S = [];
      for (let w = 0; w <= 16; w++) {
        let _ = y + ((M - y) * w) / 16;
        S.push([b + Math.cos(_) * x, v + Math.sin(_) * x]);
      }
      return S;
    };
  {
    let v = e - h[0] - 14,
      x = s + h[1] + 14;
    (p([e - h[0], x], [e - h[0], u], "railsE"),
      p([v, s + h[1]], [d, s + h[1]], "railsN"),
      f(m(v, x, 14, 0, -Math.PI / 2), "railsN"));
  }
  {
    let v = e + h[0] - 22,
      x = s - h[1] + 22;
    (p([e + h[0], x], [e + h[0], u], "railsE"),
      p([v, s - h[1]], [d, s - h[1]], "railsN"),
      f(m(v, x, 22, 0, -Math.PI / 2), "railsN"));
  }
  let g = (b, v) => {
    let x = o.get(v, "solid"),
      y = null;
    for (let [M, S, w, _] of b) {
      if (
        (os(x, M, S, 0.14, 3, 10.2, 8, l, 0.1),
        rs(
          x,
          [M - w * 4.2, 9.1 + 0.25, S - _ * 4.2],
          [M + w * 4.2, 9.1 + 0.25, S + _ * 4.2],
          0.08,
          0.1,
          l,
        ),
        rs(
          x,
          [M, 10.2 - 0.2, S],
          [M - w * 4.2, 9.1 + 0.3, S - _ * 4.2],
          0.05,
          0.05,
          l,
        ),
        rs(
          x,
          [M, 10.2 - 0.2, S],
          [M + w * 4.2, 9.1 + 0.3, S + _ * 4.2],
          0.05,
          0.05,
          l,
        ),
        t.push({ t: "circ", x: M, z: S, r: 0.25 }),
        y)
      )
        for (let T of [-1, 1]) {
          let E = T * h[v === "railsN" ? 1 : 0],
            R = y;
          rs(
            x,
            [R[0] + R[2] * E, 9.1, R[1] + R[3] * E],
            [M + w * E, 9.1, S + _ * E],
            0.025,
            0.025,
            c,
          );
        }
      y = [M, S, w, _];
    }
  };
  {
    let b = [];
    for (let v = pe[0] + ns[0].hw + 20; v < u - 10; v += 42)
      pe.some((x) => Math.abs(v - x) < 12) || b.push([e, v + 7, 1, 0]);
    g(b, "railsE");
  }
  {
    let b = [];
    for (let v = e - ps[xn - 1].hw - 30; v > d + 10; v -= 42)
      he.some((x) => Math.abs(v - x) < 12) || b.push([v + 7, s, 0, 1]);
    g(b, "railsN");
  }
}
