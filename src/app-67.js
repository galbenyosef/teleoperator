// app 67 — math
// Lines 67255-67546 of readable/app.pretty.js (statement-aligned).
function uht(i, t, e, s, n, o, a, r, l) {
  let c = a * 0.17,
    h = -o,
    f = n,
    u = r() < 0.8 ? ue.hull : At([0.1, 0.18, 0.35], Tt.paint),
    d = (g, b, x) => [e + n * g + h * b, x, s + o * g + f * b],
    p = [
      [-0.5, 0.75],
      [-0.25, 1],
      [0.15, 1],
      [0.38, 0.75],
      [0.5, 0.05],
    ];
  for (let g of t ? [i, t] : [i])
    for (let b = 0; b + 1 < p.length; b++) {
      let [x, v] = p[b],
        [y, M] = p[b + 1];
      for (let S of [-1, 1])
        xs(
          g,
          d(x * a, S * v * c, 1.1),
          d(y * a, S * M * c, 1.1),
          d(y * a, S * M * c * 0.6, -0.2),
          d(x * a, S * v * c * 0.6, -0.2),
          u,
          d(((x + y) * a) / 2, S * 20, 0.5),
        );
      xs(
        g,
        d(x * a, -v * c, 1.1),
        d(y * a, -M * c, 1.1),
        d(y * a, M * c, 1.1),
        d(x * a, v * c, 1.1),
        ue.cream,
        d(0, 0, 30),
      );
    }
  (xs(
    i,
    d(-0.5 * a, -0.75 * c, 1.1),
    d(-0.5 * a, 0.75 * c, 1.1),
    d(-0.5 * a, 0.45 * c, -0.2),
    d(-0.5 * a, -0.45 * c, -0.2),
    u,
    d(-a, 0, 0.5),
  ),
    Us(
      i,
      e - n * a * 0.05,
      s - o * a * 0.05,
      n,
      o,
      a * 0.16,
      c * 0.6,
      1.1,
      1.65,
      ue.white,
    ));
  let m = a * (l ? 1.5 : 1.3);
  (es(i, e + n * a * 0.08, s + o * a * 0.08, 0.07, 1.1, m, 5, ue.mast),
    ss(i, d(a * 0.08, 0, 2), d(-a * 0.38, 0, 2.1), 0.08, 0.1, ue.mast),
    ss(
      i,
      d(a * 0.08, 0, 2.15),
      d(-a * 0.3, 0, 2.15),
      0.3,
      0.25,
      At([0.05, 0.15, 0.4], Tt.paint),
    ),
    t && es(t, e + n * a * 0.08, s + o * a * 0.08, 0.07, 1.1, m, 3, ue.mast));
}
function dht(i, t, e, s, n) {
  let o = n * 0.28,
    a = (r, l, c, h, f) => {
      (i.beginPath(),
        i.moveTo(r + f, l),
        i.arcTo(c, l, c, h, f),
        i.arcTo(c, h, r, h, f),
        i.arcTo(r, h, r, l, f),
        i.arcTo(r, l, c, l, f),
        i.closePath());
    };
  ((i.fillStyle = "#f4f2ea"),
    a(t + 4, e + 4, t + s - 4, e + n - 4, o),
    i.fill(),
    (i.fillStyle = "#1d5fae"),
    a(t + 16, e + 16, t + s - 16, e + n - 16, o * 0.8),
    i.fill(),
    (i.strokeStyle = "#f4f2ea"),
    (i.lineWidth = 6),
    a(t + 30, e + 30, t + s - 30, e + n - 30, o * 0.65),
    i.stroke(),
    (i.fillStyle = "#f7f5ee"),
    (i.font = `${Math.round(n * 0.62)}px Georgia, "Times New Roman", serif`),
    (i.textAlign = "center"),
    (i.textBaseline = "middle"),
    i.fillText("PIER 39", t + s / 2, e + n * 0.55));
}
function pht(i, t, e, s, n) {
  ((i.fillStyle = "#f2f0e8"),
    i.fillRect(t, e, s, n),
    (i.strokeStyle = "#c9c4b5"),
    (i.lineWidth = 8),
    i.strokeRect(t + 4, e + 4, s - 8, n - 8),
    (i.fillStyle = "#22339a"),
    (i.font = `bold ${Math.round(n * 0.72)}px Georgia, "Times New Roman", serif`),
    (i.textAlign = "center"),
    (i.textBaseline = "middle"),
    i.fillText("PIER 39", t + s / 2, e + n * 0.54));
}
function AG(i, t, e, s, n, o) {
  for (let r = 0; r < 12; r++) {
    let l = (r / 12) * Math.PI * 2,
      c = ((r + 1) / 12) * Math.PI * 2,
      h = r % 2 ? ue.white : ue.cblue,
      f = (d, p, m) => [t + Math.cos(p) * d, m, e + Math.sin(p) * d];
    (xs(
      i,
      f(s, l, n),
      f(s, c, n),
      f(s * 0.45, c, n + o * 0.55),
      f(s * 0.45, l, n + o * 0.55),
      h,
      [t + Math.cos((l + c) / 2) * 20, n + 20, e + Math.sin((l + c) / 2) * 20],
    ),
      xs(
        i,
        f(s * 0.45, l, n + o * 0.55),
        f(s * 0.45, c, n + o * 0.55),
        f(0.02, c, n + o),
        f(0.02, l, n + o),
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
      xs(
        i,
        [p[0], n, p[2]],
        [m[0], n, m[2]],
        m,
        p,
        r % 2 ? ue.white : ue.cblue,
        [t + Math.cos((l + c) / 2) * 20, n, e + Math.sin((l + c) / 2) * 20],
      );
    }
  }
  (Gs(
    i,
    t,
    e,
    [
      [s + 0.04, n - 0.06],
      [s + 0.04, n + 0.04],
    ],
    12,
    ue.red,
  ),
    Gs(
      i,
      t,
      e,
      [
        [0.02, n + o - 0.05],
        [0.12, n + o + 0.08],
        [0.02, n + o + 0.25],
      ],
      8,
      ue.red,
    ),
    es(i, t, e, 0.02, n + o + 0.2, n + o + 0.7, 4, ue.gold));
}
function mht(i, t, e, s, n) {
  let o = t + s / 2,
    a = e + n / 2,
    r = s * 0.46;
  ((i.fillStyle = "#c9a23a"),
    i.beginPath(),
    i.arc(o, a, r, 0, 6.3),
    i.fill(),
    (i.fillStyle = "#f6f2e4"),
    i.beginPath(),
    i.arc(o, a, r * 0.84, 0, 6.3),
    i.fill(),
    (i.strokeStyle = "#222"),
    (i.lineWidth = 4));
  for (let l = 0; l < 12; l++) {
    let c = (l / 12) * 6.283;
    (i.beginPath(),
      i.moveTo(o + Math.cos(c) * r * 0.7, a + Math.sin(c) * r * 0.7),
      i.lineTo(o + Math.cos(c) * r * 0.8, a + Math.sin(c) * r * 0.8),
      i.stroke());
  }
  ((i.lineWidth = 6),
    i.beginPath(),
    i.moveTo(o, a),
    i.lineTo(o + r * 0.35, a - r * 0.2),
    i.stroke(),
    (i.lineWidth = 4),
    i.beginPath(),
    i.moveTo(o, a),
    i.lineTo(o - r * 0.1, a - r * 0.62),
    i.stroke());
}
function ght(i, t, e, s, n) {
  ((i.fillStyle = "#f4f4f0"),
    i.fillRect(t, e, s, n),
    (i.fillStyle = "#1d3f8f"),
    i.fillRect(t + 10, e + 10, s - 20, n - 20),
    (i.strokeStyle = "#f4f4f0"),
    (i.lineWidth = 5),
    i.strokeRect(t + 22, e + 22, s - 44, n - 44),
    (i.fillStyle = "#ffffff"),
    (i.textAlign = "center"),
    (i.textBaseline = "middle"),
    (i.font = `bold ${Math.round(n * 0.42)}px Georgia, "Times New Roman", serif`),
    i.fillText("SPRING WATER", t + s / 2, e + n * 0.43),
    (i.font = `${Math.round(n * 0.17)}px Georgia, serif`),
    i.fillText("NATURAL  \xB7  ICE COLD", t + s / 2, e + n * 0.76));
}
function bht(i, t, e, s, n) {
  for (let o = 0; o < 13; o++)
    ((i.fillStyle = o % 2 ? "#f5f5f5" : "#b22234"),
      i.fillRect(t, e + (o * n) / 13, s, n / 13 + 1));
  ((i.fillStyle = "#3c3b6e"),
    i.fillRect(t, e, s * 0.4, (n * 7) / 13),
    (i.fillStyle = "#fff"));
  for (let o = 0; o < 5; o++)
    for (let a = 0; a < 6; a++)
      (i.beginPath(),
        i.arc(
          t + (s * 0.4 * (a + 0.5)) / 6,
          e + (((n * 7) / 13) * (o + 0.5)) / 5,
          3,
          0,
          6.3,
        ),
        i.fill());
}
function LG(i, t, e, s = 0, n = new Array(16)) {
  let o = Math.cos(i),
    a = Math.sin(i);
  return (
    (n[0] = o),
    (n[1] = 0),
    (n[2] = -a),
    (n[3] = 0),
    (n[4] = 0),
    (n[5] = 1),
    (n[6] = 0),
    (n[7] = 0),
    (n[8] = a),
    (n[9] = 0),
    (n[10] = o),
    (n[11] = 0),
    (n[12] = t - o * t - a * e),
    (n[13] = s),
    (n[14] = e + a * t - o * e),
    (n[15] = 1),
    n
  );
}
Ug();
as();
as();
var Xn = {
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
