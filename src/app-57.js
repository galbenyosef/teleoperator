// app 57 — math
// Lines 63405-63706 of readable/app.pretty.js (statement-aligned).
Oa();
Ug();
var vG = null,
  kR = () => vG;
function Yct() {
  let i = (c) => Fh("bb", c),
    t = i(0),
    e = 16,
    s = -1,
    n = Je.anch + 12,
    o = Je.anchE - 5,
    a = Jct(),
    r = new Float32Array(32),
    l = new Float32Array(32);
  for (let c = 0; c < 32; c++) {
    let h = n + ((o - n) * c) / 31,
      f = i(h),
      u =
        Je.towers.some((d) => Math.abs(h - d) < 9) ||
        Math.abs(h - Je.center) < 30;
    ((r[c] = f.y + 0.6), (l[c] = u ? f.y : Math.max(f.y + 0.6, a(h) - 0.3)));
  }
  return {
    o: [t.x - t.uz * e * s, t.z + t.ux * e * s],
    d: [Je.dir[0], Je.dir[1]],
    s0: n,
    s1: o,
    deck: r,
    cable: l,
  };
}
function Jct() {
  let i = (n) => Fh("bb", n),
    t = Je.towerTop,
    e = i(Je.center).y + 38,
    s = [
      [Je.anch, Je.towers[0], Je.towers[1], Je.center],
      [Je.center, Je.towers[2], Je.towers[3], Je.anchE],
    ];
  return (n) => {
    for (let [o, a, r, l] of s) {
      if (n < o - 1e-6 || n > l + 1e-6) continue;
      let c = o === Je.center ? e : i(o).y + 3,
        h = l === Je.center ? e : i(l).y + 3,
        f = i((a + r) / 2).y + 3;
      if (n <= a) {
        let d = (n - o) / (a - o);
        return c + (t - c) * d - 48 * d * (1 - d);
      }
      if (n >= r) {
        let d = (n - r) / (l - r);
        return t + (h - t) * d - 48 * d * (1 - d);
      }
      let u = ((n - a) / (r - a)) * 2 - 1;
      return f + (t - f) * u * u;
    }
    return i(n).y;
  };
}
function uS(i) {
  vG = Yct();
  let t = (d) => Fh("bb", d),
    e = 16,
    s = Je.towerTop,
    n = t(Je.center).y + 38,
    o = [
      [Je.anch, Je.towers[0], Je.towers[1], Je.center],
      [Je.center, Je.towers[2], Je.towers[3], Je.anchE],
    ],
    a = (d) => {
      for (let [p, m, g, b] of o) {
        if (d < p - 1e-6 || d > b + 1e-6) continue;
        let x = p === Je.center ? n : t(p).y + 3,
          v = b === Je.center ? n : t(b).y + 3,
          y = t((m + g) / 2).y + 3;
        if (d <= m) {
          let S = (d - p) / (m - p);
          return x + (s - x) * S - 48 * S * (1 - S);
        }
        if (d >= g) {
          let S = (d - g) / (b - g);
          return s + (v - s) * S - 48 * S * (1 - S);
        }
        let M = ((d - m) / (g - m)) * 2 - 1;
        return y + (s - y) * M * M;
      }
      return t(d).y;
    },
    r = new Ce(),
    l = 2,
    c = -1,
    h = [0, 0, 0, 1];
  for (let d = Je.anch + 12; d < Je.anchE - 5; d += 12) {
    if (
      Je.towers.some((y) => Math.abs(d - y) < 7) ||
      Math.abs(d - Je.center) < 26
    )
      continue;
    let p = t(d),
      m = a(d);
    if (m - p.y < 1.5) continue;
    let g = p.x - p.uz * e * c,
      b = p.z + p.ux * e * c,
      x = p.y + 0.6,
      v = m - 0.3;
    for (let [y, M] of [
      [p.ux, p.uz],
      [-p.uz, p.ux],
    ])
      r.quad(
        [g - y * l, x, b - M * l],
        [g + y * l, x, b + M * l],
        [g + y * l, v, b + M * l],
        [g - y * l, v, b - M * l],
        [-l, x],
        [l, x],
        [l, v],
        [-l, v],
        h,
        [M, 0, -y],
      );
  }
  let f = t(0),
    u = [Je.dir[0], Je.dir[1]];
  i.extra.push((d, p, m) => {
    let g = new Ee({
      color: 16777215,
      roughness: 0.5,
      vertexColors: !0,
      alphaTest: 0.5,
      side: Ss,
    });
    ((g.userData.mbAlbedo = KU(f.x, f.z, u[0], u[1])),
      (g.userData.dayGlow = 0));
    let b = document.createElement("canvas");
    b.width = b.height = 4;
    let x = b.getContext("2d");
    ((x.fillStyle = "#fff"),
      x.fillRect(0, 0, 4, 4),
      (g.map = new Sn(b)),
      m.push(g));
    let v = new _e(r.geometry(), g);
    ((v.name = "wf_baylights"),
      (v.castShadow = !1),
      (v.receiveShadow = !1),
      (v.matrixAutoUpdate = !1),
      v.updateMatrix(),
      (v.renderOrder = 2),
      d.add(v),
      i.tick.push((y) => {
        ((g.color.r = y % 1e3), (v.visible = g.color.b > 0.05));
      }));
  });
}
En();
Ol();
Cd();
Ld();
Cd();
Ld();
function yG(i) {
  for (let [t, e] of [
    ["rails", Zct],
    ["promenade", Qct],
  ])
    try {
      e(i);
    } catch (s) {
      console.error("waterfront street:", t, s);
    }
}
function Zct({ B: i, colliders: t }) {
  let e = ae[mn - 1],
    s = fe[0],
    n = 3 + 0.07,
    o = At([0.13, 0.13, 0.125], Tt.conc),
    a = At([0.55, 0.55, 0.56], Tt.metal),
    r = At([0.03, 0.03, 0.03], Tt.paint),
    l = At([0.12, 0.2, 0.15], Tt.metal),
    c = At([0.08, 0.08, 0.08], Tt.metal),
    h = [3.17, 3.65],
    f = (b, x) => {
      let v = i.get(x, "solid");
      for (let y = 0; y + 1 < b.length; y++) {
        let [M, S] = b[y],
          [w, z] = b[y + 1],
          _ = Math.hypot(w - M, z - S);
        if (_ < 0.001) continue;
        let R = -(z - S) / _,
          T = (w - M) / _;
        for (let [E, A, C, P] of [
          [0.7175, 0.08, a, 0.004],
          [-0.7175, 0.08, a, 0.004],
          [0.66, 0.04, r, 0],
          [-0.66, 0.04, r, 0],
        ]) {
          let I = E,
            L = A / 2,
            F = n + P,
            N = [M + R * (I - L), F, S + T * (I - L)],
            B = [w + R * (I - L), F, z + T * (I - L)],
            H = [w + R * (I + L), F, z + T * (I + L)],
            O = [M + R * (I + L), F, S + T * (I + L)];
          Fi(v, [N, B, H, O], C);
        }
      }
    },
    u = fe[ws - 1] + Qe[ws - 1].hw,
    d = ae[6],
    p = (b, x, v) => {
      let y = Math.ceil(Math.hypot(x[0] - b[0], x[1] - b[1]) / 200),
        M = [];
      for (let S = 0; S <= y; S++)
        M.push([
          b[0] + ((x[0] - b[0]) * S) / y,
          b[1] + ((x[1] - b[1]) * S) / y,
        ]);
      f(M, v);
    },
    m = (b, x, v, y, M) => {
      let S = [];
      for (let w = 0; w <= 16; w++) {
        let z = y + ((M - y) * w) / 16;
        S.push([b + Math.cos(z) * v, x + Math.sin(z) * v]);
      }
      return S;
    };
  {
    let x = e - h[0] - 14,
      v = s + h[1] + 14;
    (p([e - h[0], v], [e - h[0], u], "railsE"),
      p([x, s + h[1]], [d, s + h[1]], "railsN"),
      f(m(x, v, 14, 0, -Math.PI / 2), "railsN"));
  }
  {
    let x = e + h[0] - 22,
      v = s - h[1] + 22;
    (p([e + h[0], v], [e + h[0], u], "railsE"),
      p([x, s - h[1]], [d, s - h[1]], "railsN"),
      f(m(x, v, 22, 0, -Math.PI / 2), "railsN"));
  }
  let g = (b, x) => {
    let v = i.get(x, "solid"),
      y = null;
    for (let [M, S, w, z] of b) {
      if (
        (es(v, M, S, 0.14, 3, 10.2, 8, l, 0.1),
        ss(
          v,
          [M - w * 4.2, 9.1 + 0.25, S - z * 4.2],
          [M + w * 4.2, 9.1 + 0.25, S + z * 4.2],
          0.08,
          0.1,
          l,
        ),
        ss(
          v,
          [M, 10.2 - 0.2, S],
          [M - w * 4.2, 9.1 + 0.3, S - z * 4.2],
          0.05,
          0.05,
          l,
        ),
        ss(
          v,
          [M, 10.2 - 0.2, S],
          [M + w * 4.2, 9.1 + 0.3, S + z * 4.2],
          0.05,
          0.05,
          l,
        ),
        t.push({ t: "circ", x: M, z: S, r: 0.25 }),
        y)
      )
        for (let T of [-1, 1]) {
          let E = T * h[x === "railsN" ? 1 : 0],
            A = y;
          ss(
            v,
            [A[0] + A[2] * E, 9.1, A[1] + A[3] * E],
            [M + w * E, 9.1, S + z * E],
            0.025,
            0.025,
            c,
          );
        }
      y = [M, S, w, z];
    }
  };
  {
    let b = [];
    for (let x = fe[0] + Qe[0].hw + 20; x < u - 10; x += 42)
      fe.some((v) => Math.abs(x - v) < 12) || b.push([e, x + 7, 1, 0]);
    g(b, "railsE");
  }
  {
    let b = [];
    for (let x = e - ls[mn - 1].hw - 30; x > d + 10; x -= 42)
      ae.some((v) => Math.abs(x - v) < 12) || b.push([x + 7, s, 0, 1]);
    g(b, "railsN");
  }
}
