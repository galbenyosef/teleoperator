// app 66 — math
// Lines 67486-67777 of readable/app.pretty.js (statement-aligned).
function Ldt(o, t, e, s, n, i, a, r, l) {
  let c = a * 0.17,
    h = -i,
    f = n,
    u = r() < 0.8 ? ge.hull : Rt([0.1, 0.18, 0.35], Tt.paint),
    d = (g, b, v) => [e + n * g + h * b, v, s + i * g + f * b],
    p = [
      [-0.5, 0.75],
      [-0.25, 1],
      [0.15, 1],
      [0.38, 0.75],
      [0.5, 0.05],
    ];
  for (let g of t ? [o, t] : [o])
    for (let b = 0; b + 1 < p.length; b++) {
      let [v, x] = p[b],
        [y, M] = p[b + 1];
      for (let S of [-1, 1])
        Ms(
          g,
          d(v * a, S * x * c, 1.1),
          d(y * a, S * M * c, 1.1),
          d(y * a, S * M * c * 0.6, -0.2),
          d(v * a, S * x * c * 0.6, -0.2),
          u,
          d(((v + y) * a) / 2, S * 20, 0.5),
        );
      Ms(
        g,
        d(v * a, -x * c, 1.1),
        d(y * a, -M * c, 1.1),
        d(y * a, M * c, 1.1),
        d(v * a, x * c, 1.1),
        ge.cream,
        d(0, 0, 30),
      );
    }
  (Ms(
    o,
    d(-0.5 * a, -0.75 * c, 1.1),
    d(-0.5 * a, 0.75 * c, 1.1),
    d(-0.5 * a, 0.45 * c, -0.2),
    d(-0.5 * a, -0.45 * c, -0.2),
    u,
    d(-a, 0, 0.5),
  ),
    Vs(
      o,
      e - n * a * 0.05,
      s - i * a * 0.05,
      n,
      i,
      a * 0.16,
      c * 0.6,
      1.1,
      1.65,
      ge.white,
    ));
  let m = a * (l ? 1.5 : 1.3);
  (os(o, e + n * a * 0.08, s + i * a * 0.08, 0.07, 1.1, m, 5, ge.mast),
    rs(o, d(a * 0.08, 0, 2), d(-a * 0.38, 0, 2.1), 0.08, 0.1, ge.mast),
    rs(
      o,
      d(a * 0.08, 0, 2.15),
      d(-a * 0.3, 0, 2.15),
      0.3,
      0.25,
      Rt([0.05, 0.15, 0.4], Tt.paint),
    ),
    t && os(t, e + n * a * 0.08, s + i * a * 0.08, 0.07, 1.1, m, 3, ge.mast));
}
function Idt(o, t, e, s, n) {
  let i = n * 0.28,
    a = (r, l, c, h, f) => {
      (o.beginPath(),
        o.moveTo(r + f, l),
        o.arcTo(c, l, c, h, f),
        o.arcTo(c, h, r, h, f),
        o.arcTo(r, h, r, l, f),
        o.arcTo(r, l, c, l, f),
        o.closePath());
    };
  ((o.fillStyle = "#f4f2ea"),
    a(t + 4, e + 4, t + s - 4, e + n - 4, i),
    o.fill(),
    (o.fillStyle = "#1d5fae"),
    a(t + 16, e + 16, t + s - 16, e + n - 16, i * 0.8),
    o.fill(),
    (o.strokeStyle = "#f4f2ea"),
    (o.lineWidth = 6),
    a(t + 30, e + 30, t + s - 30, e + n - 30, i * 0.65),
    o.stroke(),
    (o.fillStyle = "#f7f5ee"),
    (o.font = `${Math.round(n * 0.62)}px Georgia, "Times New Roman", serif`),
    (o.textAlign = "center"),
    (o.textBaseline = "middle"),
    o.fillText("PIER 39", t + s / 2, e + n * 0.55));
}
function Fdt(o, t, e, s, n) {
  ((o.fillStyle = "#f2f0e8"),
    o.fillRect(t, e, s, n),
    (o.strokeStyle = "#c9c4b5"),
    (o.lineWidth = 8),
    o.strokeRect(t + 4, e + 4, s - 8, n - 8),
    (o.fillStyle = "#22339a"),
    (o.font = `bold ${Math.round(n * 0.72)}px Georgia, "Times New Roman", serif`),
    (o.textAlign = "center"),
    (o.textBaseline = "middle"),
    o.fillText("PIER 39", t + s / 2, e + n * 0.54));
}
function PW(o, t, e, s, n, i) {
  for (let r = 0; r < 12; r++) {
    let l = (r / 12) * Math.PI * 2,
      c = ((r + 1) / 12) * Math.PI * 2,
      h = r % 2 ? ge.white : ge.cblue,
      f = (d, p, m) => [t + Math.cos(p) * d, m, e + Math.sin(p) * d];
    (Ms(
      o,
      f(s, l, n),
      f(s, c, n),
      f(s * 0.45, c, n + i * 0.55),
      f(s * 0.45, l, n + i * 0.55),
      h,
      [t + Math.cos((l + c) / 2) * 20, n + 20, e + Math.sin((l + c) / 2) * 20],
    ),
      Ms(
        o,
        f(s * 0.45, l, n + i * 0.55),
        f(s * 0.45, c, n + i * 0.55),
        f(0.02, c, n + i),
        f(0.02, l, n + i),
        h,
        [
          t + Math.cos((l + c) / 2) * 20,
          n + 20,
          e + Math.sin((l + c) / 2) * 20,
        ],
      ));
    let u = [];
    for (let d = 0; d <= 4; d++) {
      let p = l + ((c - l) * d) / 4;
      u.push(f(s + 0.02, p, n - 0.22 - 0.16 * Math.sin((Math.PI * d) / 4)));
    }
    for (let d = 0; d < 4; d++) {
      let p = u[d],
        m = u[d + 1];
      Ms(
        o,
        [p[0], n, p[2]],
        [m[0], n, m[2]],
        m,
        p,
        r % 2 ? ge.white : ge.cblue,
        [t + Math.cos((l + c) / 2) * 20, n, e + Math.sin((l + c) / 2) * 20],
      );
    }
  }
  (Ws(
    o,
    t,
    e,
    [
      [s + 0.04, n - 0.06],
      [s + 0.04, n + 0.04],
    ],
    12,
    ge.red,
  ),
    Ws(
      o,
      t,
      e,
      [
        [0.02, n + i - 0.05],
        [0.12, n + i + 0.08],
        [0.02, n + i + 0.25],
      ],
      8,
      ge.red,
    ),
    os(o, t, e, 0.02, n + i + 0.2, n + i + 0.7, 4, ge.gold));
}
function Odt(o, t, e, s, n) {
  let i = t + s / 2,
    a = e + n / 2,
    r = s * 0.46;
  ((o.fillStyle = "#c9a23a"),
    o.beginPath(),
    o.arc(i, a, r, 0, 6.3),
    o.fill(),
    (o.fillStyle = "#f6f2e4"),
    o.beginPath(),
    o.arc(i, a, r * 0.84, 0, 6.3),
    o.fill(),
    (o.strokeStyle = "#222"),
    (o.lineWidth = 4));
  for (let l = 0; l < 12; l++) {
    let c = (l / 12) * 6.283;
    (o.beginPath(),
      o.moveTo(i + Math.cos(c) * r * 0.7, a + Math.sin(c) * r * 0.7),
      o.lineTo(i + Math.cos(c) * r * 0.8, a + Math.sin(c) * r * 0.8),
      o.stroke());
  }
  ((o.lineWidth = 6),
    o.beginPath(),
    o.moveTo(i, a),
    o.lineTo(i + r * 0.35, a - r * 0.2),
    o.stroke(),
    (o.lineWidth = 4),
    o.beginPath(),
    o.moveTo(i, a),
    o.lineTo(i - r * 0.1, a - r * 0.62),
    o.stroke());
}
function Bdt(o, t, e, s, n) {
  ((o.fillStyle = "#f4f4f0"),
    o.fillRect(t, e, s, n),
    (o.fillStyle = "#1d3f8f"),
    o.fillRect(t + 10, e + 10, s - 20, n - 20),
    (o.strokeStyle = "#f4f4f0"),
    (o.lineWidth = 5),
    o.strokeRect(t + 22, e + 22, s - 44, n - 44),
    (o.fillStyle = "#ffffff"),
    (o.textAlign = "center"),
    (o.textBaseline = "middle"),
    (o.font = `bold ${Math.round(n * 0.42)}px Georgia, "Times New Roman", serif`),
    o.fillText("SPRING WATER", t + s / 2, e + n * 0.43),
    (o.font = `${Math.round(n * 0.17)}px Georgia, serif`),
    o.fillText("NATURAL  \xB7  ICE COLD", t + s / 2, e + n * 0.76));
}
function Ndt(o, t, e, s, n) {
  for (let i = 0; i < 13; i++)
    ((o.fillStyle = i % 2 ? "#f5f5f5" : "#b22234"),
      o.fillRect(t, e + (i * n) / 13, s, n / 13 + 1));
  ((o.fillStyle = "#3c3b6e"),
    o.fillRect(t, e, s * 0.4, (n * 7) / 13),
    (o.fillStyle = "#fff"));
  for (let i = 0; i < 5; i++)
    for (let a = 0; a < 6; a++)
      (o.beginPath(),
        o.arc(
          t + (s * 0.4 * (a + 0.5)) / 6,
          e + (((n * 7) / 13) * (i + 0.5)) / 5,
          3,
          0,
          6.3,
        ),
        o.fill());
}
function FW(o, t, e, s = 0, n = new Array(16)) {
  let i = Math.cos(o),
    a = Math.sin(o);
  return (
    (n[0] = i),
    (n[1] = 0),
    (n[2] = -a),
    (n[3] = 0),
    (n[4] = 0),
    (n[5] = 1),
    (n[6] = 0),
    (n[7] = 0),
    (n[8] = a),
    (n[9] = 0),
    (n[10] = i),
    (n[11] = 0),
    (n[12] = t - i * t - a * e),
    (n[13] = s),
    (n[14] = e + a * t - i * e),
    (n[15] = 1),
    n
  );
}
Ab();
es();
es();
var ti = {
  skin: 0,
  top: 1,
  bottom: 2,
  shoes: 3,
  hair: 4,
  bag: 5,
  legs: 6,
  eyes: 7,
  shirt: 8,
  belt: 9,
  lips: 10,
  sole: 11,
  white: 12,
  trim: 13,
  face: 14,
};
