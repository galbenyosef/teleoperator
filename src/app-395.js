// app 395 — stroke
// Lines 193632-193977 of readable/app.pretty.js (statement-aligned).
function cMt(i, t, e, s = "#1592a8") {
  let n = e / 10;
  ((i.fillStyle = "#fff"),
    (i.strokeStyle = "#fff"),
    (i.lineWidth = 1.6 * n),
    (i.lineCap = "round"),
    (i.lineJoin = "round"));
  let o = (l) => {
      (i.beginPath(), i.moveTo(l[0] * n, l[1] * n));
      for (let c = 2; c < l.length; c += 2) i.lineTo(l[c] * n, l[c + 1] * n);
    },
    a = (l, c, h, f) => i.fillRect(l * n, c * n, h * n, f * n),
    r = (l, c, h = 0.7) => {
      ((i.font = `800 ${c * n}px ${kr}`),
        (i.textAlign = "center"),
        (i.textBaseline = "middle"),
        i.fillText(l, 0, h * n));
    };
  if (lMt.has(t) && xl[t]) {
    Rm(i, t, 0, 0, e * 1.5, "#fff", 2.2);
    return;
  }
  if (t.startsWith("ch:")) {
    xet(i, t, e);
    return;
  }
  switch (t) {
    case "bridge":
      (o([-7, 5, 7, 5]),
        i.stroke(),
        o([-4, 6, -4, -6]),
        i.stroke(),
        o([4, 6, 4, -6]),
        i.stroke(),
        (i.lineWidth = 1.2 * n),
        i.beginPath(),
        i.moveTo(-8 * n, 2 * n),
        i.quadraticCurveTo(-6 * n, -3 * n, -4 * n, -6 * n),
        i.quadraticCurveTo(0, 3 * n, 4 * n, -6 * n),
        i.quadraticCurveTo(6 * n, -3 * n, 8 * n, 2 * n),
        i.stroke());
      break;
    case "pyramid":
      (o([0, -8, 4.2, 7, -4.2, 7]), i.closePath(), i.fill());
      break;
    case "coit":
      (a(-2.2, -6, 4.4, 12), a(-3.2, -7.5, 6.4, 2), a(-4.5, 5, 9, 2.2));
      break;
    case "sky":
      (i.beginPath(),
        i.moveTo(-3.4 * n, 7.5 * n),
        i.lineTo(-3.4 * n, -3 * n),
        i.quadraticCurveTo(-3 * n, -8 * n, 0, -8.5 * n),
        i.quadraticCurveTo(3 * n, -8 * n, 3.4 * n, -3 * n),
        i.lineTo(3.4 * n, 7.5 * n),
        i.closePath(),
        i.fill());
      break;
    case "clock":
      (a(-1.8, -8, 3.6, 10),
        a(-7, 2, 14, 5),
        (i.fillStyle = s),
        i.beginPath(),
        i.arc(0, -4.5 * n, 1.1 * n, 0, 7),
        i.fill());
      break;
    case "star": {
      i.beginPath();
      for (let l = 0; l < 10; l++) {
        let c = -Math.PI / 2 + (l * Math.PI) / 5,
          h = (l % 2 ? 3.2 : 7.5) * n;
        i.lineTo(Math.cos(c) * h, Math.sin(c) * h);
      }
      (i.closePath(), i.fill());
      break;
    }
    case "cross":
      (o([0, -7.5, 0, 7.5]), i.stroke(), o([-4.5, -3, 4.5, -3]), i.stroke());
      break;
    case "zig":
      (o([-6, -7, 5, -4, -5, -1, 5, 2, -5, 5, 6, 7.5]), i.stroke());
      break;
    case "pier":
      r("39", 9);
      break;
    case "g":
      r("G", 11, 0.8);
      break;
    case "dome":
      (i.beginPath(), i.arc(0, -1 * n, 5.5 * n, Math.PI, 0), i.fill());
      for (let l of [-4.5, -1.5, 1.5, 4.5]) a(l - 0.7, -1, 1.4, 6);
      a(-6.5, 5, 13, 2);
      break;
    case "hall":
      (a(-1, -9, 2, 2.5),
        i.beginPath(),
        i.arc(0, -2.5 * n, 4 * n, Math.PI, 0),
        i.fill(),
        a(-7.5, -1.5, 15, 1.6));
      for (let l of [-6, -3, 0, 3, 6]) a(l - 0.6, 0, 1.2, 5);
      a(-8, 5, 16, 2);
      break;
    case "light":
      (a(-1.8, -4, 3.6, 11),
        a(-2.8, -6.5, 5.6, 2.5),
        o([3, -5.5, 8, -8]),
        i.stroke(),
        o([3, -5, 8, -2.5]),
        i.stroke(),
        o([-4.5, 7.5, 4.5, 7.5]),
        i.stroke());
      break;
    case "tree":
      (i.beginPath(),
        i.arc(0, -2.5 * n, 5 * n, 0, 7),
        i.fill(),
        a(-1, 1, 2, 6.5));
      break;
    case "ball":
      ((i.lineWidth = 1.4 * n),
        i.beginPath(),
        i.arc(0, 0, 6.5 * n, 0, 7),
        i.stroke(),
        i.beginPath(),
        i.arc(-9 * n, 0, 6 * n, -0.8, 0.8),
        i.stroke(),
        i.beginPath(),
        i.arc(9 * n, 0, 6 * n, Math.PI - 0.8, Math.PI + 0.8),
        i.stroke());
      break;
    case "museum":
      (o([-7.5, -3, 0, -8, 7.5, -3]), i.closePath(), i.fill());
      for (let l of [-5.5, -2, 2, 5.5]) a(l - 0.8, -2, 1.6, 7);
      a(-7.5, 5.5, 15, 2);
      break;
    case "gate":
      (i.beginPath(),
        i.moveTo(-8.5 * n, -3 * n),
        i.quadraticCurveTo(0, -6.5 * n, 8.5 * n, -3 * n),
        i.lineTo(6 * n, -5.5 * n),
        i.quadraticCurveTo(0, -8.5 * n, -6 * n, -5.5 * n),
        i.closePath(),
        i.fill(),
        a(-6, -3, 1.8, 10),
        a(4.2, -3, 1.8, 10),
        a(-6, 0, 12, 1.6),
        a(-1, -3, 2, 3));
      break;
    case "house":
      (o([-6.5, -1, 0, -7.5, 6.5, -1, 6.5, 7, -6.5, 7]),
        i.closePath(),
        i.fill(),
        (i.fillStyle = s),
        a(-1.4, 2.5, 2.8, 4.5));
      break;
    case "fish":
      (i.beginPath(),
        i.ellipse(-1.5 * n, 0, 5.2 * n, 3.4 * n, 0, 0, 7),
        i.fill(),
        o([3, 0, 8, -4, 8, 4]),
        i.closePath(),
        i.fill(),
        (i.fillStyle = s),
        i.beginPath(),
        i.arc(-4 * n, -0.8 * n, 0.9 * n, 0, 7),
        i.fill());
      break;
    case "fort":
      a(-6.5, -2, 13, 9);
      for (let l of [-6.5, -2.5, 1.5, 4.5]) a(l, -5, 2, 3.2);
      ((i.fillStyle = s), a(-1.5, 2.5, 3, 4.5));
      break;
    case "ship":
      (o([-7.5, 2, 7.5, 2, 5, 6.5, -5, 6.5]),
        i.closePath(),
        i.fill(),
        o([0, 1, 0, -8]),
        i.stroke(),
        o([0.8, -7, 6, 0.5, 0.8, 0.5]),
        i.closePath(),
        i.fill());
      break;
    case "flower":
      for (let l = 0; l < 5; l++) {
        let c = l * Math.PI * 0.4 - Math.PI / 2;
        (i.beginPath(),
          i.arc(
            Math.cos(c) * 3.6 * n,
            Math.sin(c) * 3.6 * n - 0.5 * n,
            2.6 * n,
            0,
            7,
          ),
          i.fill());
      }
      ((i.fillStyle = s),
        i.beginPath(),
        i.arc(0, -0.5 * n, 1.6 * n, 0, 7),
        i.fill());
      break;
    case "figure":
      (i.beginPath(),
        i.arc(0, -6 * n, 1.9 * n, 0, 7),
        i.fill(),
        o([0, -3.5, 0, 2.5]),
        i.stroke(),
        o([-4.5, 2.5, 0, -2.8, 4.5, 2.5]),
        i.stroke(),
        o([-2.6, 8, 0, 2, 2.6, 8]),
        i.stroke());
      break;
    case "flag":
      a(-5.5, -7.5, 1.6, 15);
      for (let l = 0; l < 4; l++)
        for (let c = 0; c < 3; c++)
          (l + c) % 2 === 0 && a(-3.9 + l * 2.4, -7.5 + c * 2.4, 2.4, 2.4);
      ((i.lineWidth = 0.8 * n),
        i.strokeRect(-3.9 * n, -7.5 * n, 9.6 * n, 7.2 * n));
      break;
    case "train":
      (a(-5, -7, 10, 11),
        (i.fillStyle = s),
        a(-3.5, -5.5, 7, 4),
        (i.fillStyle = "#fff"),
        o([-4, 5, -6, 8]),
        i.stroke(),
        o([4, 5, 6, 8]),
        i.stroke());
      break;
  }
}
function e2(i, t, e) {
  return Np(`i|${i}|${t}|${e}`, () => {
    let s = Math.ceil(e * 0.35),
      n = Math.ceil(2 * e + 2 * s),
      o = UE(n, n),
      a = o.getContext("2d");
    return (
      a.translate(n / 2, n / 2),
      (a.shadowColor = "rgba(0,0,0,.6)"),
      (a.shadowBlur = s),
      (a.fillStyle = t),
      a.beginPath(),
      a.arc(0, 0, e, 0, 7),
      a.fill(),
      (a.shadowBlur = 0),
      (a.strokeStyle = "rgba(255,255,255,.85)"),
      (a.lineWidth = Math.max(1, e * 0.13)),
      a.stroke(),
      cMt(a, i, e * 0.78, t),
      o
    );
  });
}
function rv(i, t) {
  return Np(`s|${i}|${t}`, () => {
    let e = i === "80" || i === "280" || i === "580",
      s = i === "1" || i === "35",
      n = Math.ceil(t * (i.length > 2 ? 1.14 : s ? 0.9 : 0.98)),
      o = 2,
      a = UE(n + o * 2, t + o * 2),
      r = a.getContext("2d");
    r.translate(o, o);
    let l = (f, u, d) => {
        ((r.fillStyle = f),
          (r.font = `800 ${t * u}px ${kr}`),
          (r.textAlign = "center"),
          (r.textBaseline = "middle"),
          r.fillText(i, n / 2, t * d));
      },
      c = () => {
        (r.beginPath(),
          r.moveTo(0, t * 0.08),
          r.quadraticCurveTo(n * 0.25, t * 0.16, n / 2, 0),
          r.quadraticCurveTo(n * 0.75, t * 0.16, n, t * 0.08),
          r.lineTo(n, t * 0.5),
          r.quadraticCurveTo(n, t * 0.86, n / 2, t),
          r.quadraticCurveTo(0, t * 0.86, 0, t * 0.5),
          r.closePath());
      },
      h = Math.max(1, t * 0.07);
    return (
      e
        ? (c(),
          (r.fillStyle = "#1d4fa0"),
          r.fill(),
          r.save(),
          c(),
          r.clip(),
          (r.fillStyle = "#c8202e"),
          r.fillRect(0, 0, n, t * 0.3),
          r.restore(),
          c(),
          (r.strokeStyle = "#fff"),
          (r.lineWidth = h),
          r.stroke(),
          l("#fff", i.length > 2 ? 0.42 : 0.5, 0.62))
        : s
          ? (r.beginPath(),
            r.moveTo(n * 0.5, 0),
            r.lineTo(n * 0.62, t * 0.1),
            r.quadraticCurveTo(n, t * 0.1, n, t * 0.42),
            r.quadraticCurveTo(n * 0.95, t * 0.85, n / 2, t),
            r.quadraticCurveTo(n * 0.05, t * 0.85, 0, t * 0.42),
            r.quadraticCurveTo(0, t * 0.1, n * 0.38, t * 0.1),
            r.closePath(),
            (r.fillStyle = "#1f7a45"),
            r.fill(),
            (r.strokeStyle = "#fff"),
            (r.lineWidth = h),
            r.stroke(),
            l("#fff", 0.5, 0.55))
          : (c(),
            (r.fillStyle = "#f4f4f0"),
            r.fill(),
            (r.strokeStyle = "#111"),
            (r.lineWidth = h),
            r.stroke(),
            l("#111", i.length > 2 ? 0.44 : 0.5, 0.52)),
      a
    );
  });
}
function s2(i, t, e, s, n, o = "#ff5a1f") {
  (i.save(),
    i.translate(t, e),
    i.rotate(s),
    (i.shadowColor = "rgba(0,0,0,.7)"),
    (i.shadowBlur = n * 0.5),
    i.beginPath(),
    i.moveTo(0, -n),
    i.lineTo(n * 0.72, n * 0.78),
    i.lineTo(0, n * 0.4),
    i.lineTo(-n * 0.72, n * 0.78),
    i.closePath(),
    (i.fillStyle = o),
    i.fill(),
    (i.shadowBlur = 0),
    (i.lineWidth = Math.max(1.2, n * 0.14)),
    (i.strokeStyle = "#fff"),
    (i.lineJoin = "round"),
    i.stroke(),
    i.restore());
}
var GE = (i, t) =>
  i.some((e) => t[0] < e[2] && t[2] > e[0] && t[1] < e[3] && t[3] > e[1]);
