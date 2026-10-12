// app 48 — math
// Lines 60408-60739 of readable/app.pretty.js (statement-aligned).
function pR({ B: i, A: t, colliders: e }, s = {}) {
  let n = i.R("wharf"),
    o = n.solid,
    a = s.y ?? 3,
    [r, l] = s.wheel || [ae[6], fe[0] - Qe[0].hw - Qe[0].sw - 5.5],
    c = t.add("crabwheel", 1024, 1024, cS);
  {
    let m = a + 8.2,
      g = 3.1,
      b = At([0.05, 0.14, 0.32], Tt.metal);
    (es(o, r, l, 0.22, a + 0.1, m - 0.5, 8, b),
      es(o, r, l, 0.45, a + 0.1, a + 0.6, 8, At([0.4, 0.4, 0.38], Tt.conc)));
    for (let v of [1, -1])
      si(n.text, t, c, r + v * 0.16, m, l, v, 0, g * 2, g * 2, Da(!0));
    let x = [];
    for (let v = 0; v <= 36; v++) {
      let y = (v / 36) * Math.PI * 2;
      x.push([r, m + Math.sin(y) * g, l + Math.cos(y) * g]);
    }
    Wi(o, x, 0.14, 6, At([0.8, 0.75, 0.6], Tt.metal));
    for (let v = 0; v < 8; v++) {
      let y = (v / 8) * Math.PI * 2 + Math.PI / 8,
        M = [r, m + Math.sin(y) * g, l + Math.cos(y) * g],
        S = [r, m + Math.sin(y) * (g + 0.9), l + Math.cos(y) * (g + 0.9)];
      Wi(
        o,
        [M, [(M[0] + S[0]) / 2, (M[1] + S[1]) / 2, (M[2] + S[2]) / 2], S],
        [0.1, 0.16, 0.12],
        6,
        At([0.45, 0.27, 0.12], Tt.planks),
      );
    }
    e.push({ t: "circ", x: r, z: l, r: 0.6 });
  }
  let h = [
      [ae[6] - 58, 0],
      [ae[6] - 34, 1],
      [ae[6] + 26, 2],
      [ae[6] + 50, 3],
    ],
    f = ["FRESH CRAB", "CRAB \xB7 SHRIMP", "CHOWDER", "COCKTAILS \xB7 CRAB"];
  for (let [m, g] of h) {
    let b = Ve.z + (s.real ? 0.2 : 1.2),
      x = b + 3.2,
      v = m - 3.5,
      y = m + 3.5;
    if (s.real && [v - 0.2, m, y + 0.2].some((S) => Qr(S, x + 0.3) === "road"))
      continue;
    (Ms(o, v, a, b, y, a + 1, x, At([0.7, 0.7, 0.68], Tt.metal)),
      Ms(
        o,
        v + 0.1,
        a + 1,
        b + 0.2,
        y - 0.1,
        a + 1.12,
        x - 0.3,
        At([0.85, 0.9, 0.95], Tt.paint),
      ));
    for (let S = 0; S < 9; S++) {
      let w = v + 0.6 + S * 0.7,
        z = b + 0.8 + (S % 2) * 1.2;
      Us(
        o,
        w,
        z,
        1,
        0,
        0.22,
        0.17,
        a + 1.12,
        a + 1.28,
        At([0.6, 0.1, 0.04], Tt.paint),
      );
    }
    for (let S of [v + 0.8, y - 0.8])
      es(
        o,
        S,
        b + 2.4,
        0.45,
        a + 1,
        a + 1.9,
        10,
        At([0.55, 0.55, 0.55], Tt.metal),
      );
    for (let [S, w] of [
      [v, b],
      [y, b],
      [v, x + 0.6],
      [y, x + 0.6],
    ])
      es(o, S, w, 0.06, a, a + 3.3, 5, At([0.7, 0.7, 0.7], Tt.metal));
    for (let S = 0; S < 10; S++) {
      let w = v - 0.3 + S * 0.76,
        z = w + 0.76;
      xs(
        o,
        [w, a + 3.3, b - 0.3],
        [z, a + 3.3, b - 0.3],
        [z, a + 2.8, x + 1.4],
        [w, a + 2.8, x + 1.4],
        At(
          S % 2
            ? [0.8, 0.8, 0.78]
            : g % 2
              ? [0.5, 0.05, 0.04]
              : [0.05, 0.2, 0.08],
          Tt.paint,
        ),
        [m, a + 30, x + 20],
      );
    }
    let M = t.word(f[g], {
      font: "bold 110px Arial, Helvetica, sans-serif",
      h: 130,
    });
    (si(
      n.text,
      t,
      M,
      m,
      a + 3.7,
      x + 1.45,
      0,
      1,
      6.2,
      null,
      oo(g % 2 ? [1, 0.25, 0.15] : [1, 0.85, 0.3], !0),
    ),
      Ms(
        o,
        m - 3.3,
        a + 3.3,
        x + 1.3,
        m + 3.3,
        a + 4.1,
        x + 1.42,
        At([0.08, 0.08, 0.08], Tt.paint),
      ),
      e.push({ t: "box", x0: v - 0.2, z0: b - 0.2, x1: y + 0.2, z1: x + 0.2 }));
  }
  if (s.real) return;
  let u = ["SEAFOOD", "CRAB HOUSE", "FISH GROTTO", "CHOWDER", "OYSTERS"],
    d = 0;
  for (let m = ae[6] + 10; m < ae[7] - 2; m += 22, d++) {
    let g = m + 20,
      b = Ve.z - 1.5,
      x = b - 18,
      v = 9 + (d % 2) * 1.5,
      y = [
        [1, 1, 1],
        [0.95, 1, 1.05],
        [1.05, 1, 0.95],
      ][d % 3];
    Ms(o, m - 1, 1.6, x - 1, g + 1, a, Ve.z, dR, { bottom: !0 });
    for (let _ = m; _ <= g; _ += 5)
      for (let R of [x - 0.5, (x + b) / 2]) es(o, _, R, 0.3, -6, 1.6, 6, qg);
    let M = Ha("wharf", y);
    (n.atlas.wall(m, b, g, b, a, a, a + v, a + v, M, d * 7, a),
      n.atlas.wall(g, x, m, x, a, a, a + v, a + v, M, d * 3, a),
      n.atlas.wall(m, x, m, b, a, a, a + v, a + v, M, 5, a),
      n.atlas.wall(g, b, g, x, a, a, a + v, a + v, M, 11, a),
      Ms(
        o,
        m - 0.4,
        a + v,
        x - 0.4,
        g + 0.4,
        a + v + 1,
        b + 0.4,
        At([0.72, 0.7, 0.64], Tt.paint),
      ));
    let S = t.word(u[d % u.length], {
        font: 'bold 120px "Arial Black", Arial, sans-serif',
        h: 140,
      }),
      w = 11,
      z = (m + g) / 2;
    for (let [_, R] of [
      [z - w / 2 + 0.5, b - 3],
      [z + w / 2 - 0.5, b - 3],
    ])
      ss(o, [_, a + v + 1, R], [_, a + v + 3.6, R], 0.12, 0.12, Wg);
    si(
      n.text,
      t,
      S,
      z,
      a + v + 2.6,
      b - 2.9,
      0,
      1,
      w,
      null,
      oo(d % 2 ? [1, 0.3, 0.15] : [0.95, 0.9, 0.75], !0),
    );
  }
  let p = lS(77);
  for (let m = 0; m < 10; m++) {
    let g = ae[6] - 20 + (m % 5) * 26 + p() * 6,
      b = Ve.z - 32 - Math.floor(m / 5) * 14 - p() * 4;
    mR(o, g, b, Math.PI / 2 + (p() - 0.5) * 0.2, p);
  }
  for (let m = 0; m < 2; m++)
    Ms(
      o,
      ae[6] - 30,
      -0.3,
      Ve.z - 38 - m * 14,
      ae[6] + 110,
      0.4,
      Ve.z - 36 - m * 14,
      At([0.4, 0.37, 0.33], Tt.planks),
    );
}
function mR(i, t, e, s, n) {
  let o = Math.cos(s),
    a = Math.sin(s),
    r = 11 + n() * 4,
    l = 3.4,
    c = At(
      [
        [0.8, 0.8, 0.78],
        [0.2, 0.35, 0.5],
        [0.55, 0.15, 0.1],
        [0.15, 0.3, 0.2],
      ][Math.floor(n() * 4)],
      Tt.paint,
    ),
    h = At([0.85, 0.85, 0.82], Tt.paint);
  Us(i, t, e, o, a, r / 2, l / 2, -0.6, 1.2, c, { bottom: !0 });
  let f = t + (o * r) / 2,
    u = e + (a * r) / 2;
  (xs(
    i,
    [t + o * (r / 2) - (a * l) / 2, -0.6, e + a * (r / 2) + (o * l) / 2],
    [f + o * 2.2, 1.3, u + a * 2.2],
    [f + o * 2.2, 1.3, u + a * 2.2],
    [t + o * (r / 2) - (a * l) / 2, 1.2, e + a * (r / 2) + (o * l) / 2],
    c,
    [f - a * 10, 1, u + o * 10],
  ),
    xs(
      i,
      [t + o * (r / 2) + (a * l) / 2, -0.6, e + a * (r / 2) - (o * l) / 2],
      [f + o * 2.2, 1.3, u + a * 2.2],
      [f + o * 2.2, 1.3, u + a * 2.2],
      [t + o * (r / 2) + (a * l) / 2, 1.2, e + a * (r / 2) - (o * l) / 2],
      c,
      [f + a * 10, 1, u - o * 10],
    ),
    Us(i, t + o * r * 0.12, e + a * r * 0.12, o, a, 1.6, 1.2, 1.2, 3.2, h, {
      sides: [1, 0, 1, 1],
    }));
  let d = (g, b) => [
    t + o * (r * 0.12 + 1.6) - a * g,
    b,
    e + a * (r * 0.12 + 1.6) + o * g,
  ];
  for (let [g, b, x, v, y] of [
    [-1.2, 1.2, 1.2, 2.2, h],
    [-1.2, 1.2, 3, 3.2, h],
    [-1.2, -1, 2.2, 3, h],
    [1, 1.2, 2.2, 3, h],
    [-1, 1, 2.2, 3, At([0.05, 0.06, 0.07], Tt.glass)],
  ])
    xs(i, d(g, x), d(b, x), d(b, v), d(g, v), y, [t + o * 100, 3, e + a * 100]);
  let p = t + o * r * 0.3,
    m = e + a * r * 0.3;
  (es(i, p, m, 0.07, 1.2, 8 + n() * 3, 5, h),
    ss(i, [p, 6, m], [t - o * r * 0.45, 2, e - a * r * 0.45], 0.06, 0.06, h));
}
function cS(i, t, e, s, n, o = {}) {
  let a = t + s / 2,
    r = e + n / 2,
    l = s / 2 - 6;
  ((i.fillStyle = "#0f3b7a"),
    i.beginPath(),
    i.arc(a, r, l, 0, Math.PI * 2),
    i.fill(),
    (i.strokeStyle = "#f4ede0"),
    (i.lineWidth = 14),
    i.beginPath(),
    i.arc(a, r, l - 8, 0, Math.PI * 2),
    i.stroke(),
    (i.fillStyle = "#eaf2f8"),
    i.beginPath(),
    i.arc(a, r, l * 0.6, 0, Math.PI * 2),
    i.fill(),
    (i.strokeStyle = "#f4ede0"),
    (i.lineWidth = 8),
    i.beginPath(),
    i.arc(a, r, l * 0.6, 0, Math.PI * 2),
    i.stroke());
  let c = "FISHERMAN'S  WHARF",
    h = 92;
  ((i.font = `bold ${h}px Georgia, "Times New Roman", serif`),
    (i.fillStyle = "#ffffff"),
    (i.textAlign = "center"),
    (i.textBaseline = "middle"));
  let f = l * 0.8,
    u = Math.PI * 1.55,
    d = -Math.PI / 2 - u / 2,
    p = [...c].map((b) => i.measureText(b).width),
    m = p.reduce((b, x) => b + x, 0),
    g = 0;
  for (let b = 0; b < c.length; b++) {
    let x = d + ((g + p[b] / 2) / m) * u;
    ((g += p[b]),
      i.save(),
      i.translate(a + Math.cos(x) * f, r + Math.sin(x) * f),
      i.rotate(x + Math.PI / 2),
      i.fillText(c[b], 0, 0),
      i.restore());
  }
  ((i.fillStyle = "#e8b03a"), i.beginPath());
  for (let b = 0; b < 10; b++) {
    let x = Math.PI / 2 + (b / 10) * Math.PI * 2,
      v = b % 2 ? 18 : 44;
    i.lineTo(a + Math.cos(x) * v, r + l * 0.8 + Math.sin(x) * v - 4);
  }
  if ((i.fill(), o.crab)) {
    let b = l * 1.05;
    i.drawImage(o.crab, a - b / 2, r - b / 2, b, b);
  } else
    ((i.fillStyle = "#c8301c"),
      i.beginPath(),
      i.ellipse(a, r, l * 0.35, l * 0.25, 0, 0, Math.PI * 2),
      i.fill());
  i.textAlign = "start";
}
