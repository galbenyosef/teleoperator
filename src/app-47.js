// app 47 — math
// Lines 60639-60970 of readable/app.pretty.js (statement-aligned).
function W7({ B: o, A: t, colliders: e }, s = {}) {
  let n = o.R("wharf"),
    i = n.solid,
    a = s.y ?? 3,
    [r, l] = s.wheel || [he[6], pe[0] - ns[0].hw - ns[0].sw - 5.5],
    c = t.add("crabwheel", 1024, 1024, fk);
  {
    let m = a + 8.2,
      g = 3.1,
      b = Rt([0.05, 0.14, 0.32], Tt.metal);
    (os(i, r, l, 0.22, a + 0.1, m - 0.5, 8, b),
      os(i, r, l, 0.45, a + 0.1, a + 0.6, 8, Rt([0.4, 0.4, 0.38], Tt.conc)));
    for (let x of [1, -1])
      ri(n.text, t, c, r + x * 0.16, m, l, x, 0, g * 2, g * 2, Za(!0));
    let v = [];
    for (let x = 0; x <= 36; x++) {
      let y = (x / 36) * Math.PI * 2;
      v.push([r, m + Math.sin(y) * g, l + Math.cos(y) * g]);
    }
    Qi(i, v, 0.14, 6, Rt([0.8, 0.75, 0.6], Tt.metal));
    for (let x = 0; x < 8; x++) {
      let y = (x / 8) * Math.PI * 2 + Math.PI / 8,
        M = [r, m + Math.sin(y) * g, l + Math.cos(y) * g],
        S = [r, m + Math.sin(y) * (g + 0.9), l + Math.cos(y) * (g + 0.9)];
      Qi(
        i,
        [M, [(M[0] + S[0]) / 2, (M[1] + S[1]) / 2, (M[2] + S[2]) / 2], S],
        [0.1, 0.16, 0.12],
        6,
        Rt([0.45, 0.27, 0.12], Tt.planks),
      );
    }
    e.push({ t: "circ", x: r, z: l, r: 0.6 });
  }
  let h = [
      [he[6] - 58, 0],
      [he[6] - 34, 1],
      [he[6] + 26, 2],
      [he[6] + 50, 3],
    ],
    f = ["FRESH CRAB", "CRAB \xB7 SHRIMP", "CHOWDER", "COCKTAILS \xB7 CRAB"];
  for (let [m, g] of h) {
    let b = Ye.z + (s.real ? 0.2 : 1.2),
      v = b + 3.2,
      x = m - 3.5,
      y = m + 3.5;
    if (s.real && [x - 0.2, m, y + 0.2].some((S) => m0(S, v + 0.3) === "road"))
      continue;
    (zs(i, x, a, b, y, a + 1, v, Rt([0.7, 0.7, 0.68], Tt.metal)),
      zs(
        i,
        x + 0.1,
        a + 1,
        b + 0.2,
        y - 0.1,
        a + 1.12,
        v - 0.3,
        Rt([0.85, 0.9, 0.95], Tt.paint),
      ));
    for (let S = 0; S < 9; S++) {
      let w = x + 0.6 + S * 0.7,
        _ = b + 0.8 + (S % 2) * 1.2;
      Vs(
        i,
        w,
        _,
        1,
        0,
        0.22,
        0.17,
        a + 1.12,
        a + 1.28,
        Rt([0.6, 0.1, 0.04], Tt.paint),
      );
    }
    for (let S of [x + 0.8, y - 0.8])
      os(
        i,
        S,
        b + 2.4,
        0.45,
        a + 1,
        a + 1.9,
        10,
        Rt([0.55, 0.55, 0.55], Tt.metal),
      );
    for (let [S, w] of [
      [x, b],
      [y, b],
      [x, v + 0.6],
      [y, v + 0.6],
    ])
      os(i, S, w, 0.06, a, a + 3.3, 5, Rt([0.7, 0.7, 0.7], Tt.metal));
    for (let S = 0; S < 10; S++) {
      let w = x - 0.3 + S * 0.76,
        _ = w + 0.76;
      Ms(
        i,
        [w, a + 3.3, b - 0.3],
        [_, a + 3.3, b - 0.3],
        [_, a + 2.8, v + 1.4],
        [w, a + 2.8, v + 1.4],
        Rt(
          S % 2
            ? [0.8, 0.8, 0.78]
            : g % 2
              ? [0.5, 0.05, 0.04]
              : [0.05, 0.2, 0.08],
          Tt.paint,
        ),
        [m, a + 30, v + 20],
      );
    }
    let M = t.word(f[g], {
      font: "bold 110px Arial, Helvetica, sans-serif",
      h: 130,
    });
    (ri(
      n.text,
      t,
      M,
      m,
      a + 3.7,
      v + 1.45,
      0,
      1,
      6.2,
      null,
      xo(g % 2 ? [1, 0.25, 0.15] : [1, 0.85, 0.3], !0),
    ),
      zs(
        i,
        m - 3.3,
        a + 3.3,
        v + 1.3,
        m + 3.3,
        a + 4.1,
        v + 1.42,
        Rt([0.08, 0.08, 0.08], Tt.paint),
      ),
      e.push({ t: "box", x0: x - 0.2, z0: b - 0.2, x1: y + 0.2, z1: v + 0.2 }));
  }
  if (s.real) return;
  let u = ["SEAFOOD", "CRAB HOUSE", "FISH GROTTO", "CHOWDER", "OYSTERS"],
    d = 0;
  for (let m = he[6] + 10; m < he[7] - 2; m += 22, d++) {
    let g = m + 20,
      b = Ye.z - 1.5,
      v = b - 18,
      x = 9 + (d % 2) * 1.5,
      y = [
        [1, 1, 1],
        [0.95, 1, 1.05],
        [1.05, 1, 0.95],
      ][d % 3];
    zs(i, m - 1, 1.6, v - 1, g + 1, a, Ye.z, V7, { bottom: !0 });
    for (let z = m; z <= g; z += 5)
      for (let A of [v - 0.5, (v + b) / 2]) os(i, z, A, 0.3, -6, 1.6, 6, Lb);
    let M = Ja("wharf", y);
    (n.atlas.wall(m, b, g, b, a, a, a + x, a + x, M, d * 7, a),
      n.atlas.wall(g, v, m, v, a, a, a + x, a + x, M, d * 3, a),
      n.atlas.wall(m, v, m, b, a, a, a + x, a + x, M, 5, a),
      n.atlas.wall(g, b, g, v, a, a, a + x, a + x, M, 11, a),
      zs(
        i,
        m - 0.4,
        a + x,
        v - 0.4,
        g + 0.4,
        a + x + 1,
        b + 0.4,
        Rt([0.72, 0.7, 0.64], Tt.paint),
      ));
    let S = t.word(u[d % u.length], {
        font: 'bold 120px "Arial Black", Arial, sans-serif',
        h: 140,
      }),
      w = 11,
      _ = (m + g) / 2;
    for (let [z, A] of [
      [_ - w / 2 + 0.5, b - 3],
      [_ + w / 2 - 0.5, b - 3],
    ])
      rs(i, [z, a + x + 1, A], [z, a + x + 3.6, A], 0.12, 0.12, Cb);
    ri(
      n.text,
      t,
      S,
      _,
      a + x + 2.6,
      b - 2.9,
      0,
      1,
      w,
      null,
      xo(d % 2 ? [1, 0.3, 0.15] : [0.95, 0.9, 0.75], !0),
    );
  }
  let p = hk(77);
  for (let m = 0; m < 10; m++) {
    let g = he[6] - 20 + (m % 5) * 26 + p() * 6,
      b = Ye.z - 32 - Math.floor(m / 5) * 14 - p() * 4;
    q7(i, g, b, Math.PI / 2 + (p() - 0.5) * 0.2, p);
  }
  for (let m = 0; m < 2; m++)
    zs(
      i,
      he[6] - 30,
      -0.3,
      Ye.z - 38 - m * 14,
      he[6] + 110,
      0.4,
      Ye.z - 36 - m * 14,
      Rt([0.4, 0.37, 0.33], Tt.planks),
    );
}
function q7(o, t, e, s, n) {
  let i = Math.cos(s),
    a = Math.sin(s),
    r = 11 + n() * 4,
    l = 3.4,
    c = Rt(
      [
        [0.8, 0.8, 0.78],
        [0.2, 0.35, 0.5],
        [0.55, 0.15, 0.1],
        [0.15, 0.3, 0.2],
      ][Math.floor(n() * 4)],
      Tt.paint,
    ),
    h = Rt([0.85, 0.85, 0.82], Tt.paint);
  Vs(o, t, e, i, a, r / 2, l / 2, -0.6, 1.2, c, { bottom: !0 });
  let f = t + (i * r) / 2,
    u = e + (a * r) / 2;
  (Ms(
    o,
    [t + i * (r / 2) - (a * l) / 2, -0.6, e + a * (r / 2) + (i * l) / 2],
    [f + i * 2.2, 1.3, u + a * 2.2],
    [f + i * 2.2, 1.3, u + a * 2.2],
    [t + i * (r / 2) - (a * l) / 2, 1.2, e + a * (r / 2) + (i * l) / 2],
    c,
    [f - a * 10, 1, u + i * 10],
  ),
    Ms(
      o,
      [t + i * (r / 2) + (a * l) / 2, -0.6, e + a * (r / 2) - (i * l) / 2],
      [f + i * 2.2, 1.3, u + a * 2.2],
      [f + i * 2.2, 1.3, u + a * 2.2],
      [t + i * (r / 2) + (a * l) / 2, 1.2, e + a * (r / 2) - (i * l) / 2],
      c,
      [f + a * 10, 1, u - i * 10],
    ),
    Vs(o, t + i * r * 0.12, e + a * r * 0.12, i, a, 1.6, 1.2, 1.2, 3.2, h, {
      sides: [1, 0, 1, 1],
    }));
  let d = (g, b) => [
    t + i * (r * 0.12 + 1.6) - a * g,
    b,
    e + a * (r * 0.12 + 1.6) + i * g,
  ];
  for (let [g, b, v, x, y] of [
    [-1.2, 1.2, 1.2, 2.2, h],
    [-1.2, 1.2, 3, 3.2, h],
    [-1.2, -1, 2.2, 3, h],
    [1, 1.2, 2.2, 3, h],
    [-1, 1, 2.2, 3, Rt([0.05, 0.06, 0.07], Tt.glass)],
  ])
    Ms(o, d(g, v), d(b, v), d(b, x), d(g, x), y, [t + i * 100, 3, e + a * 100]);
  let p = t + i * r * 0.3,
    m = e + a * r * 0.3;
  (os(o, p, m, 0.07, 1.2, 8 + n() * 3, 5, h),
    rs(o, [p, 6, m], [t - i * r * 0.45, 2, e - a * r * 0.45], 0.06, 0.06, h));
}
function fk(o, t, e, s, n, i = {}) {
  let a = t + s / 2,
    r = e + n / 2,
    l = s / 2 - 6;
  ((o.fillStyle = "#0f3b7a"),
    o.beginPath(),
    o.arc(a, r, l, 0, Math.PI * 2),
    o.fill(),
    (o.strokeStyle = "#f4ede0"),
    (o.lineWidth = 14),
    o.beginPath(),
    o.arc(a, r, l - 8, 0, Math.PI * 2),
    o.stroke(),
    (o.fillStyle = "#eaf2f8"),
    o.beginPath(),
    o.arc(a, r, l * 0.6, 0, Math.PI * 2),
    o.fill(),
    (o.strokeStyle = "#f4ede0"),
    (o.lineWidth = 8),
    o.beginPath(),
    o.arc(a, r, l * 0.6, 0, Math.PI * 2),
    o.stroke());
  let c = "FISHERMAN'S  WHARF",
    h = 92;
  ((o.font = `bold ${h}px Georgia, "Times New Roman", serif`),
    (o.fillStyle = "#ffffff"),
    (o.textAlign = "center"),
    (o.textBaseline = "middle"));
  let f = l * 0.8,
    u = Math.PI * 1.55,
    d = -Math.PI / 2 - u / 2,
    p = [...c].map((b) => o.measureText(b).width),
    m = p.reduce((b, v) => b + v, 0),
    g = 0;
  for (let b = 0; b < c.length; b++) {
    let v = d + ((g + p[b] / 2) / m) * u;
    ((g += p[b]),
      o.save(),
      o.translate(a + Math.cos(v) * f, r + Math.sin(v) * f),
      o.rotate(v + Math.PI / 2),
      o.fillText(c[b], 0, 0),
      o.restore());
  }
  ((o.fillStyle = "#e8b03a"), o.beginPath());
  for (let b = 0; b < 10; b++) {
    let v = Math.PI / 2 + (b / 10) * Math.PI * 2,
      x = b % 2 ? 18 : 44;
    o.lineTo(a + Math.cos(v) * x, r + l * 0.8 + Math.sin(v) * x - 4);
  }
  if ((o.fill(), i.crab)) {
    let b = l * 1.05;
    o.drawImage(i.crab, a - b / 2, r - b / 2, b, b);
  } else
    ((o.fillStyle = "#c8301c"),
      o.beginPath(),
      o.ellipse(a, r, l * 0.35, l * 0.25, 0, 0, Math.PI * 2),
      o.fill());
  o.textAlign = "start";
}
