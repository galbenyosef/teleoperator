// app 233 — math
// Lines 121482-121754 of readable/app.pretty.js (statement-aligned).
var Qy = [
  {
    name: "sedan",
    L: 4.75,
    W: 1.84,
    belt: 0.95,
    roof: 1.44,
    hood: 0.86,
    trunk: 0.98,
    cabin: [-1.05, 0.9],
    rake: [0.75, 0.55],
    wb: 2.8,
    r: 0.33,
  },
  {
    name: "hatch",
    L: 4.2,
    W: 1.78,
    belt: 0.95,
    roof: 1.48,
    hood: 0.88,
    trunk: 1,
    cabin: [-1.55, 0.72],
    rake: [0.2, 0.7],
    wb: 2.6,
    r: 0.32,
  },
  {
    name: "suv",
    L: 4.75,
    W: 1.92,
    belt: 1.12,
    roof: 1.74,
    hood: 1.05,
    trunk: 1.12,
    cabin: [-1.75, 0.75],
    rake: [0.2, 0.6],
    wb: 2.85,
    r: 0.37,
  },
  {
    name: "van",
    L: 5.1,
    W: 2,
    belt: 1.15,
    roof: 2.1,
    hood: 1,
    trunk: 1.18,
    cabin: [-2.3, 1.2],
    rake: [0.05, 0.7],
    wb: 3.2,
    r: 0.36,
  },
];
function $X(i, t = 30) {
  let s = [],
    n = [],
    o = [],
    a = i.L,
    r = a / 2,
    l = [0.03, 0.035, 0.04],
    c = [1, 1, 1],
    h = [0.05, 0.05, 0.05],
    f = [0.9, 0.9, 0.85],
    u = [0.5, 0.02, 0.02];
  for (let x = 0; x <= t; x++) {
    let v = -r + (a * x) / t,
      y = x / t,
      M = Math.min(1, Math.min(y, 1 - y) * 7),
      S = (i.W / 2) * (0.82 + 0.18 * Math.sqrt(M)),
      [w, z] = i.cabin,
      [_, R] = i.rake,
      T =
        v > 0
          ? i.belt +
            (i.hood - i.belt) *
              Math.min(1, (v - z + 0.2) / (r - z + 0.2)) *
              (v > z - 0.2 ? 1 : 0)
          : i.belt +
            (i.trunk - i.belt) * Math.min(1, Math.max(0, (w - v) / (w + r))),
      E = T;
    if (v > w - _ && v < z + R) {
      let F = v < w ? (v - (w - _)) / _ : v > z ? 1 - (v - z) / R : 1;
      E = T + (i.roof - T) * Math.max(0, Math.min(1, F));
    }
    let A = (1 - Math.sqrt(M)) * 0.18,
      C = 0.18 + (1 - M) * 0.12,
      P = S * 0.8,
      I = [
        [0, C],
        [S * 0.92, C],
        [S, C + 0.12],
        [S, (C + T) * 0.5],
        [S * 0.98, T - 0.04 - A],
        [S * 0.93, T - A],
        [P + (S * 0.93 - P) * 0.35, T + (E - T) * 0.45 - A * 0.5],
        [P * 0.9, E - 0.03],
        [0, E],
      ],
      L = E > T + 0.1;
    for (let F = 0; F < 9; F++) {
      let [N, B] = I[F];
      s.push(N, B, v);
      let H = c;
      (F >= 5 && F <= 7 && L && (H = l),
        F === 8 && L && (v < w + 0.05 || v > z - 0.05) && (H = l),
        F <= 1 && (H = h),
        (x === 0 || x === t) && F >= 3 && F <= 4 && (H = x === t ? f : u),
        n.push(H[0], H[1], H[2], 1));
    }
  }
  for (let x = 0; x < t; x++)
    for (let v = 0; v < 8; v++) {
      let y = x * 9 + v,
        M = y + 9;
      o.push(y, y + 1, M, y + 1, M + 1, M);
    }
  let d = (x, v) => {
    let y = x * 9;
    for (let M = 0; M < 8; M++)
      v ? o.push(y, y + M + 1, y + M) : o.push(y, y + M, y + M + 1);
  };
  (d(0, !0), d(t, !1));
  let p = new De();
  (p.setAttribute("position", new ze(s, 3)),
    p.setAttribute("color", new ze(n, 4)),
    p.setIndex(o),
    p.computeVertexNormals());
  let m = p.clone();
  m.scale(-1, 1, 1);
  let g = m.index.array;
  for (let x = 0; x < g.length; x += 3) {
    let v = g[x];
    ((g[x] = g[x + 1]), (g[x + 1] = v));
  }
  let b = wi([p.toNonIndexed(), m.toNonIndexed()]);
  return (
    b.setAttribute(
      "uv",
      new ze(new Float32Array(b.attributes.position.count * 2), 2),
    ),
    b
  );
}
function XX(i, t = 14) {
  let e = [];
  for (let [n, o] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]) {
    let a = new ks(i.r, i.r, 0.22, t);
    (a.rotateZ(Math.PI / 2),
      a.translate(n * (i.W / 2 - 0.12), i.r, (o * i.wb) / 2));
    let r = a.attributes.position.count,
      l = new Float32Array(r * 4);
    for (let c = 0; c < r; c++) {
      let f =
        Math.hypot(
          a.attributes.position.getY(c) - i.r,
          a.attributes.position.getZ(c) - (o * i.wb) / 2,
        ) <
          i.r * 0.62 && Math.abs(a.attributes.position.getX(c)) > i.W / 2 - 0.13
          ? 0.45
          : 0.035;
      l.set([f, f, f, 1], c * 4);
    }
    (a.setAttribute("color", new Te(l, 4)), e.push(a.toNonIndexed()));
  }
  let s = wi(e);
  for (let n of Object.keys(s.attributes))
    ["position", "normal", "uv", "color"].includes(n) || s.deleteAttribute(n);
  return s;
}
function KX(i) {
  let t = [];
  for (let e of [-1, 1]) {
    let s = new $n(0.34, 0.12);
    (s.translate(e * (i.W / 2 - 0.3), i.hood - 0.12, i.L / 2 + 0.005),
      t.push(Dk(s, [1, 0.97, 0.9])));
    let n = new $n(0.34, 0.12);
    (n.rotateY(Math.PI),
      n.translate(e * (i.W / 2 - 0.28), i.trunk - 0.1, -i.L / 2 - 0.005),
      t.push(Dk(n, [1, 0.05, 0.03])));
  }
  return wi(t.map((e) => e.toNonIndexed()));
}
function Dk(i, t) {
  let e = i.attributes.position.count,
    s = new Float32Array(e * 4);
  for (let n = 0; n < e; n++) s.set([t[0], t[1], t[2], 1], n * 4);
  return (i.setAttribute("color", new Te(s, 4)), i);
}
var Ok = null,
  Hk = null;
function YX() {
  return (
    Ok ||
    ((Ok = Qy.map((i) => ({ T: i, body: $X(i), wheels: XX(i), lamps: KX(i) }))),
    Ok)
  );
}
function Uk() {
  return (
    Hk ||
    ((Hk = Qy.map((i) => ({
      T: i,
      body: $X(i, 14),
      wheels: XX(i, 8),
      lamps: KX(i),
    }))),
    Hk)
  );
}
function Gk() {
  let i = [],
    t = (f, u, d, p, m, g, b) => {
      let x = new qs(f, u, d).toNonIndexed();
      (x.translate(p, m, g), i.push(Dk(x, b)));
    },
    e = [0.32, 0.03, 0.03],
    s = [0.78, 0.7, 0.52],
    n = [0.06, 0.05, 0.05],
    o = [0.35, 0.2, 0.1],
    a = [0.05, 0.06, 0.07],
    r = [0.55, 0.42, 0.12],
    l = 8.4,
    c = 2.45;
  (t(c, 0.35, l, 0, 0.55, 0, n), t(c + 0.5, 0.08, l - 1.6, 0, 0.78, 0, o));
  for (let f of [-1, 1])
    (t(c, 0.95, 2.6, 0, 1.2, f * 2.9, e),
      t(c, 0.9, 2.6, 0, 2.12, f * 2.9, s),
      t(c + 0.02, 0.62, 2.3, 0, 2.15, f * 2.9, a),
      t(c, 0.22, 0.1, 0, 1.35, f * (l / 2), r));
  t(c, 0.55, 3.2, 0, 0.98, 0, e);
  for (let f of [-1.15, 1.15])
    for (let u of [-1.5, -0.5, 0.5, 1.5]) t(0.07, 1.55, 0.07, f, 2, u, r);
  (t(c + 0.2, 0.18, l + 0.2, 0, 2.72, 0, s),
    t(1.3, 0.3, l - 1.2, 0, 2.95, 0, s),
    t(c + 0.24, 0.05, l + 0.24, 0, 2.63, 0, e));
  for (let f of [-2.7, 2.7])
    for (let u of [-0.95, 0.95]) {
      let d = new ks(0.35, 0.35, 0.18, 10).toNonIndexed();
      (d.rotateZ(Math.PI / 2), d.translate(u, 0.35, f), i.push(Dk(d, n)));
    }
  let h = wi(i);
  h.setAttribute(
    "uv",
    new ze(new Float32Array(h.attributes.position.count * 2), 2),
  );
  for (let f of Object.keys(h.attributes))
    ["position", "normal", "uv", "color"].includes(f) || h.deleteAttribute(f);
  return h;
}
var Wk = [
    "#e8e8e6",
    "#1a1c1f",
    "#8d9196",
    "#5d6166",
    "#7a1b1b",
    "#1d3c6b",
    "#c9c3b5",
    "#2f4a3a",
    "#b0b4b8",
    "#404347",
    "#c46a1a",
    "#3a5f8a",
    "#e2e2df",
    "#15171a",
  ].map((i) => new $t(i)),
  qk = new $t("#f2bd0c"),
  vC = { L: 14.2, W: 2.75, H: 3.15, bw: 2.62 };
