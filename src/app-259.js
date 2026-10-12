// app 259 — fillstyle
// Lines 130905-131389 of readable/app.pretty.js (statement-aligned).
function Cgt() {
  let i = document.createElement("canvas");
  ((i.width = gL), (i.height = bL));
  let t = i.getContext("2d"),
    e = 11,
    s = () => (e = (e * 16807) % 2147483647) / 2147483647,
    n = (d, p) => {
      let [m, g, b, x] = wo[d];
      ((t.fillStyle = p), t.fillRect(m, g, b, x));
    },
    o = (d, p) => {
      let [m, g, b, x] = wo[d];
      for (let v = 0; v < (b * x) / 40; v++)
        ((t.fillStyle = `rgba(${s() < 0.5 ? "0,0,0" : "255,255,255"},${p * s()})`),
          t.fillRect(m + s() * b, g + s() * x, 2, 2));
    },
    a = (d, p) => {
      let [m, g, b, x] = wo[d],
        v = t.createLinearGradient(0, g, 0, g + x);
      for (let [y, M] of p) v.addColorStop(y, M);
      ((t.fillStyle = v), t.fillRect(m, g, b, x));
    },
    r = (d, p = 0.22, m = 0.4) => {
      let [g, b, x, v] = wo[d],
        y = t.createLinearGradient(0, b + v * (1 - p), 0, b + v);
      (y.addColorStop(0, "rgba(60,52,42,0)"),
        y.addColorStop(1, `rgba(60,52,42,${m})`),
        (t.fillStyle = y),
        t.fillRect(g, b + v * (1 - p), x, v * p));
      for (let M = 0; M < x / 6; M++)
        ((t.fillStyle = `rgba(55,48,40,${0.12 * s()})`),
          t.fillRect(
            g + s() * x,
            b + v * (1 - p * s()),
            2 + s() * 4,
            v * p * s(),
          ));
    },
    l = (d, p = 0.06, m = 0.25) => {
      let [g, b, x, v] = wo[d];
      for (let [y, M] of [
        [b, b + v * p],
        [b + v, b + v * (1 - p)],
      ]) {
        let S = t.createLinearGradient(0, y, 0, M);
        (S.addColorStop(0, `rgba(0,0,0,${m})`),
          S.addColorStop(1, "rgba(0,0,0,0)"),
          (t.fillStyle = S),
          t.fillRect(g, Math.min(y, M), x, Math.abs(M - y)));
      }
    },
    c = (d, p, m, g = 9, b = "rgba(0,0,0,0.28)") => {
      for (let x = 4; x < m - 2; x += g)
        ((t.fillStyle = b),
          t.fillRect(d - 1, p + x, 2, 2),
          (t.fillStyle = "rgba(255,255,255,0.35)"),
          t.fillRect(d - 1, p + x - 1, 1, 1));
    };
  (n("white", "#f2f2ee"),
    o("white", 0.035),
    n("grey", "#3b3f45"),
    o("grey", 0.05),
    n("navy", "#17243f"),
    o("navy", 0.04),
    n("green", "#2e7d3b"),
    o("green", 0.05),
    n("blue", "#1f4ea3"),
    o("blue", 0.03),
    a("glass", [
      [0, "#34404c"],
      [0.4, "#18202a"],
      [1, "#0b1016"],
    ]));
  {
    let [d, p, m, g] = wo.wind,
      b = t.createLinearGradient(0, p, 0, p + g);
    (b.addColorStop(0, "#46525e"),
      b.addColorStop(0.35, "#1c242d"),
      b.addColorStop(1, "#0c1015"),
      (t.fillStyle = b),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "rgba(0,0,0,0.55)"));
    for (let x of [0.28, 0.72])
      (t.beginPath(),
        t.ellipse(d + m * x, p + g * 0.62, m * 0.1, g * 0.22, 0, 0, 7),
        t.fill());
    ((t.fillStyle = "#07090b"),
      t.fillRect(d, p + g * 0.8, m, g * 0.2),
      (t.fillStyle = "rgba(0,0,0,0.6)"),
      t.beginPath(),
      t.arc(d + m * 0.26, p + g * 0.78, g * 0.12, Math.PI, 0),
      t.fill(),
      (t.fillStyle = "rgba(255,255,255,0.07)"),
      t.beginPath(),
      t.moveTo(d + m * 0.1, p),
      t.lineTo(d + m * 0.35, p),
      t.lineTo(d + m * 0.15, p + g),
      t.lineTo(d - m * 0.1, p + g),
      t.fill(),
      (t.strokeStyle = "#050505"),
      (t.lineWidth = 4));
    for (let x of [0.12, 0.55])
      (t.beginPath(),
        t.moveTo(d + m * x, p + g * 0.97),
        t.lineTo(d + m * (x + 0.3), p + g * 0.85),
        t.stroke());
  }
  (n("black", "#161718"),
    o("black", 0.05),
    a("chrome", [
      [0, "#eef1f3"],
      [0.45, "#9aa1a8"],
      [0.52, "#5d646b"],
      [1, "#d3d8dc"],
    ]));
  {
    let [d, p, m, g] = wo.grille;
    ((t.fillStyle = "#0a0b0c"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "#34373b"));
    for (let b = 6; b < g - 6; b += 9) t.fillRect(d + 6, p + b, m - 12, 3);
    ((t.strokeStyle = "#4a4e53"),
      (t.lineWidth = 6),
      t.strokeRect(d + 3, p + 3, m - 6, g - 6));
  }
  {
    let [d, p, m, g] = wo.cgrille;
    ((t.fillStyle = "#16181a"), t.fillRect(d, p, m, g));
    for (let b = 14; b < m - 12; b += 12) {
      let x = t.createLinearGradient(d + b, 0, d + b + 7, 0);
      (x.addColorStop(0, "#f0f3f5"),
        x.addColorStop(1, "#6f767d"),
        (t.fillStyle = x),
        t.fillRect(d + b, p + 10, 7, g - 20));
    }
    ((t.strokeStyle = "#dfe4e8"),
      (t.lineWidth = 10),
      t.strokeRect(d + 5, p + 5, m - 10, g - 10));
  }
  {
    let [d, p, m, g] = wo.tread;
    ((t.fillStyle = "#0f0f0f"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "#1e1e1e"));
    for (let b = 0; b < m; b += 8) t.fillRect(d + b, p + 4, 4, g - 8);
  }
  {
    let [d, p, m, g] = wo.head;
    ((t.fillStyle = "#20252a"),
      t.fillRect(d, p, m, g),
      a("head", [
        [0, "#f4f5f0"],
        [1, "#bfc4c8"],
      ]),
      (t.fillStyle = "rgba(246,224,76,0.9)"),
      t.fillRect(d + m - 26, p + 6, 20, g - 12),
      (t.strokeStyle = "#2a2e33"),
      (t.lineWidth = 5),
      t.strokeRect(d + 2, p + 2, m - 4, g - 4));
  }
  {
    let [d, p, m, g] = wo.tail;
    ((t.fillStyle = "#6a0808"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "#c81616"),
      t.fillRect(d + 8, p + 8, m - 16, g - 16));
  }
  (n("amber", "#f6e04c"),
    n("leather", "#141418"),
    o("leather", 0.07),
    n("jeans", "#2b3a55"),
    o("jeans", 0.1),
    a("helmet", [
      [0, "#3a3d42"],
      [1, "#0a0b0c"],
    ]),
    a("visor", [
      [0, "#3d4650"],
      [1, "#07090b"],
    ]));
  let h = (d, p, m = 0.1, g = 0.88, b = 0.04) => {
    let [x, v, y, M] = wo[d];
    ((t.fillStyle = p),
      t.fillRect(x, v, y, M),
      o(d, 0.04),
      (t.strokeStyle = "rgba(0,0,0,0.5)"),
      (t.lineWidth = 3),
      t.strokeRect(x + y * m, v + M * b, y * (g - m), M * (0.86 - b)),
      (t.fillStyle = "rgba(15,15,15,0.85)"),
      t.fillRect(x + y * (g - 0.14), v + M * 0.52, y * 0.09, M * 0.035),
      (t.fillStyle = "rgba(0,0,0,0.55)"),
      t.fillRect(x + y * (m + 0.1), v + M * 0.88, y * (g - m - 0.2), M * 0.1),
      r(d, 0.2, 0.35));
  };
  (h("doorG", "#3b3f45", 0.12, 0.9, 0.05),
    h("doorC", "#f2f2ee", 0.12, 0.92, 0.04),
    h("doorGr", "#f2f2ee", 0.1, 0.9, 0.02));
  {
    let [d, p, m, g] = wo.boxSide;
    ((t.fillStyle = "#f3f3ef"), t.fillRect(d, p, m, g), o("boxSide", 0.025));
    for (let b = 24; b < m; b += 40)
      ((t.fillStyle = "rgba(0,0,0,0.08)"),
        t.fillRect(d + b, p, 3, g),
        c(d + b + 1, p, g, 11));
    ((t.fillStyle = "#b8bcc0"),
      t.fillRect(d, p, m, 7),
      t.fillRect(d, p + g - 12, m, 12),
      (t.fillStyle = "#d6c27e"),
      t.beginPath(),
      t.ellipse(d + 110, p + 100, 60, 38, 0, 0, Math.PI * 2),
      t.fill(),
      (t.strokeStyle = "#8f8250"),
      (t.lineWidth = 5));
    for (let b of [-28, 0, 28])
      (t.beginPath(),
        t.moveTo(d + 110 + b - 10, p + 78),
        t.lineTo(d + 110 + b + 10, p + 124),
        t.stroke());
    ((t.fillStyle = "#1d3f73"),
      (t.font = "bold 50px Georgia, serif"),
      t.fillText("FOG CITY", d + 190, p + 95),
      (t.font = "bold 30px Georgia, serif"),
      t.fillText("BREAD Co.", d + 196, p + 133),
      (t.font = "15px Helvetica, Arial, sans-serif"),
      t.fillText("baked in the Mission since 1974", d + 196, p + 156),
      (t.fillStyle = "#1d3f73"),
      t.fillRect(d, p + g - 26, m, 9),
      r("boxSide", 0.14, 0.3));
  }
  {
    let [d, p, m, g] = wo.boxFront;
    ((t.fillStyle = "#efefeb"), t.fillRect(d, p, m, g));
    for (let b = 20; b < m; b += 40) c(d + b, p, g, 12);
    ((t.fillStyle = "#b8bcc0"), t.fillRect(d, p, m, 8), l("boxFront"));
  }
  {
    let [d, p, m, g] = wo.vanSide;
    ((t.fillStyle = "#17243f"),
      t.fillRect(d, p, m, g),
      o("vanSide", 0.03),
      (t.fillStyle = "rgba(0,0,0,0.25)"));
    for (let b of [0.18, 0.62]) t.fillRect(d + m * b, p, 2, g);
    ((t.fillStyle = "#c9d1d9"),
      t.fillRect(d, p + g - 46, m, 12),
      (t.fillStyle = "#eef2f5"),
      (t.font = "bold 52px Helvetica, Arial, sans-serif"),
      t.fillText("PARCELWAY", d + 104, p + 96, m - 205),
      (t.strokeStyle = "#c9d1d9"),
      (t.lineWidth = 6),
      t.strokeRect(d + 50, p + 56, 40, 40),
      t.beginPath(),
      t.moveTo(d + 50, p + 76),
      t.lineTo(d + 90, p + 76),
      t.stroke(),
      r("vanSide", 0.16, 0.3));
  }
  {
    let [d, p, m, g] = wo.vanRear;
    ((t.fillStyle = "#17243f"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "#0a1020"),
      t.fillRect(d + m / 2 - 1, p + 4, 3, g - 8),
      (t.strokeStyle = "rgba(0,0,0,0.5)"),
      (t.lineWidth = 3),
      t.strokeRect(d + 6, p + 4, m - 12, g - 10),
      (t.fillStyle = "#9aa3ad"),
      t.fillRect(d + m / 2 - 12, p + 52, 6, 18),
      t.fillRect(d + m / 2 + 6, p + 52, 6, 18),
      (t.fillStyle = "#1b222c"),
      t.fillRect(d + 14, p + 12, 40, 30),
      t.fillRect(d + m - 54, p + 12, 40, 30),
      r("vanRear", 0.25, 0.4));
  }
  {
    let [d, p, m, g] = wo.vanFront;
    ((t.fillStyle = "#17243f"),
      t.fillRect(d, p, m, g),
      o("vanFront", 0.03),
      l("vanFront", 0.05, 0.3));
  }
  {
    let [d, p, m, g] = wo.garbSide;
    ((t.fillStyle = "#2e7d3b"), t.fillRect(d, p, m, g), o("garbSide", 0.04));
    for (let b = 40; b < m; b += 92)
      ((t.fillStyle = "rgba(0,0,0,0.16)"),
        t.fillRect(d + b, p, 5, g),
        (t.fillStyle = "rgba(255,255,255,0.1)"),
        t.fillRect(d + b - 2, p, 2, g));
    ((t.strokeStyle = "#f4f6f2"),
      (t.lineWidth = 9),
      t.beginPath(),
      t.arc(d + 90, p + 100, 42, 0.3, Math.PI * 2 - 0.3),
      t.stroke(),
      (t.fillStyle = "#f4f6f2"),
      t.beginPath(),
      t.moveTo(d + 126, p + 80),
      t.lineTo(d + 146, p + 110),
      t.lineTo(d + 114, p + 112),
      t.fill(),
      (t.font = "bold 44px Helvetica, Arial, sans-serif"),
      t.fillText("BAY GREEN", d + 160, p + 96),
      (t.font = "bold 26px Helvetica, Arial, sans-serif"),
      t.fillText("RECYCLING  \xB7  COMPOST", d + 162, p + 132),
      r("garbSide", 0.3, 0.45),
      l("garbSide", 0.05, 0.3));
  }
  {
    let [d, p, m, g] = wo.hopper;
    ((t.fillStyle = "#2e7d3b"),
      t.fillRect(d, p, m, g),
      o("hopper", 0.05),
      (t.fillStyle = "rgba(0,0,0,0.25)"));
    for (let b of [0.3, 0.6]) t.fillRect(d, p + g * b, m, 4);
    t.fillStyle = "#e8b818";
    for (let b = 0; b < m; b += 32)
      (t.save(),
        t.beginPath(),
        t.rect(d, p + g * 0.9, m, g * 0.1),
        t.clip(),
        t.beginPath(),
        t.moveTo(d + b, p + g),
        t.lineTo(d + b + 16, p + g * 0.9),
        t.lineTo(d + b + 28, p + g * 0.9),
        t.lineTo(d + b + 12, p + g),
        t.fill(),
        t.restore());
    r("hopper", 0.45, 0.55);
  }
  {
    let [d, p, m, g] = wo.trailerSide;
    ((t.fillStyle = "#eeeeea"),
      t.fillRect(d, p, m, g),
      o("trailerSide", 0.025));
    for (let b = 10; b < m; b += 22)
      ((t.fillStyle = "rgba(0,0,0,0.08)"),
        t.fillRect(d + b, p, 3, g),
        c(d + b + 1, p + 10, g - 24, 10));
    ((t.fillStyle = "#9a9ea3"),
      t.fillRect(d, p + g - 16, m, 16),
      t.fillRect(d, p, m, 9));
    for (let b = 0; b < m; b += 24)
      ((t.fillStyle = b % 48 ? "#e6e6e0" : "#a8261c"),
        t.fillRect(d + b, p + g - 26, 24, 7));
    r("trailerSide", 0.18, 0.35);
  }
  {
    let [d, p, m, g] = wo.skirt;
    ((t.fillStyle = "#1c1d1f"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "rgba(255,255,255,0.05)"));
    for (let b = 0; b < m; b += 64) t.fillRect(d + b, p, 2, g);
    r("skirt", 0.5, 0.3);
  }
  {
    let [d, p, m, g] = wo.rollDoor;
    ((t.fillStyle = "#e9e9e4"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "rgba(0,0,0,0.18)"));
    for (let b = 6; b < g; b += 9) t.fillRect(d + 8, p + b, m - 16, 2);
    ((t.fillStyle = "#9ea2a6"),
      t.fillRect(d, p, 8, g),
      t.fillRect(d + m - 8, p, 8, g),
      t.fillRect(d, p, m, 6),
      (t.fillStyle = "#444"),
      t.fillRect(d + m / 2 - 12, p + g - 16, 24, 6),
      r("rollDoor", 0.3, 0.4));
  }
  {
    let [d, p, m, g] = wo.trailerDoors;
    ((t.fillStyle = "#e6e6e1"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "#6c7076"),
      t.fillRect(d + m / 2 - 2, p, 4, g));
    for (let b of [0.2, 0.4, 0.6, 0.8])
      t.fillRect(d + m * b - 2, p + 6, 4, g - 12);
    ((t.fillStyle = "#9a9ea3"),
      t.fillRect(d, p, m, 6),
      t.fillRect(d, p, 6, g),
      t.fillRect(d + m - 6, p, 6, g),
      r("trailerDoors", 0.3, 0.4));
  }
  let f = (d, p, m, g) => {
    let [b, x, v] = wo[d],
      y = v / 2,
      M = b + y,
      S = x + y;
    ((t.fillStyle = "#1c1c1c"), t.fillRect(b, x, v, v));
    let w = t.createRadialGradient(M, S, y * 0.62, M, S, y);
    (w.addColorStop(0, "#363636"),
      w.addColorStop(0.5, "#2e2e2e"),
      w.addColorStop(1, "#232323"),
      (t.fillStyle = w),
      t.beginPath(),
      t.arc(M, S, y - 1, 0, 7),
      t.fill(),
      (t.fillStyle = p),
      t.beginPath(),
      t.arc(M, S, y * 0.62, 0, 7),
      t.fill(),
      (t.fillStyle = m),
      t.beginPath(),
      t.arc(M, S, y * 0.54, 0, 7),
      t.fill(),
      (t.fillStyle = "rgba(0,0,0,0.7)"));
    for (let z = 0; z < 8; z++) {
      let _ = (z * Math.PI) / 4 + 0.39;
      (t.beginPath(),
        t.ellipse(
          M + Math.cos(_) * y * 0.4,
          S + Math.sin(_) * y * 0.4,
          y * 0.07,
          y * 0.1,
          _,
          0,
          7,
        ),
        t.fill());
    }
    ((t.fillStyle = g),
      t.beginPath(),
      t.arc(M, S, y * 0.24, 0, 7),
      t.fill(),
      (t.fillStyle = "#c9ced2"));
    for (let z = 0; z < 8; z++) {
      let _ = (z * Math.PI) / 4;
      (t.beginPath(),
        t.arc(
          M + Math.cos(_) * y * 0.17,
          S + Math.sin(_) * y * 0.17,
          2.5,
          0,
          7,
        ),
        t.fill());
    }
    ((t.fillStyle = "#2a2d30"),
      t.beginPath(),
      t.arc(M, S, y * 0.08, 0, 7),
      t.fill());
  };
  (f("wheel", "#74787c", "#55595d", "#3a3e41"),
    f("alloy", "#cdd2d6", "#a9aeb3", "#80868b"));
  {
    let [d, p, m] = wo.mwheel,
      g = m / 2,
      b = d + g,
      x = p + g;
    ((t.fillStyle = "#0d0d0d"),
      t.fillRect(d, p, m, m),
      (t.fillStyle = "#161616"),
      t.beginPath(),
      t.arc(b, x, g * 0.74, 0, 7),
      t.fill(),
      (t.strokeStyle = "#9aa0a6"),
      (t.lineWidth = 7),
      t.beginPath(),
      t.arc(b, x, g * 0.5, 0, 7),
      t.stroke(),
      (t.strokeStyle = "#1c1c1c"),
      (t.lineWidth = 6));
    for (let v = 0; v < 5; v++) {
      let y = v * Math.PI * 0.4;
      (t.beginPath(),
        t.moveTo(b, x),
        t.lineTo(b + Math.cos(y) * g * 0.72, x + Math.sin(y) * g * 0.72),
        t.stroke());
    }
    ((t.fillStyle = "#b8bec4"),
      t.beginPath(),
      t.arc(b, x, g * 0.12, 0, 7),
      t.fill());
  }
  (n("chassis", "#1d1f21"), o("chassis", 0.08));
  {
    let [d, p, m, g] = wo.motoTank;
    ((t.fillStyle = "#1f4ea3"),
      t.fillRect(d, p, m, g),
      (t.fillStyle = "#e8ecf0"),
      t.fillRect(d, p + g * 0.55, m, g * 0.08),
      (t.fillStyle = "rgba(255,255,255,0.18)"),
      t.fillRect(d, p + g * 0.15, m, g * 0.1));
  }
  let u = new Sn(i);
  return ((u.colorSpace = is), (u.anisotropy = 8), (u.generateMipmaps = !0), u);
}
