// app 292 — fillstyle
// Lines 143161-143441 of readable/app.pretty.js (statement-aligned).
function FQ(o, t) {
  let e = new le();
  e.name = "Structures";
  let s = new Be(),
    n = [],
    i = o.edges.filter(
      (r) =>
        r.name === "3rd Street" &&
        r.layer === 1 &&
        r.P[0] > 200 &&
        r.P[0] < 360 &&
        r.P[1] > 2020 &&
        r.P[1] < 2160,
    );
  if (i.length) {
    let r = [],
      l = 0;
    for (let w of i) {
      for (let _ = 0; _ < w.n; _++)
        r.push([w.P[_ * 3], w.P[_ * 3 + 1], w.P[_ * 3 + 2]]);
      l = Math.max(l, ...w.W);
    }
    r.sort((w, _) => w[1] - _[1]);
    let c = r[0],
      h = r[r.length - 1],
      f = Math.hypot(h[0] - c[0], h[1] - c[1]),
      u = [(h[0] - c[0]) / f, (h[1] - c[1]) / f],
      d = [-u[1], u[0]],
      p = 0;
    for (let w of r)
      p = Math.max(p, Math.abs((w[0] - c[0]) * d[0] + (w[1] - c[1]) * d[1]));
    let m = p + l + 0.9,
      g = (w) => c[2] + (h[2] - c[2]) * Math.min(1, Math.max(0, w / f)),
      b = (w, _, z) => [
        c[0] + u[0] * w + d[0] * _,
        z,
        c[1] + u[1] * w + d[1] * _,
      ],
      v = -4,
      x = f + 4,
      y = 5.5,
      M = Math.max(4, Math.round((x - v) / 5.5)),
      S = (x - v) / M;
    for (let w of [-1, 1]) {
      let _ = m * w;
      (wc(s, b(v, _, g(v) + 0.2), b(x, _, g(x) + 0.2), 0.25, Mc, 0.4),
        wc(s, b(v + S, _, g(v) + y), b(x, _, g(x) + y), 0.25, Mc, 0.35),
        wc(s, b(v, _, g(v) + 0.2), b(v + S, _, g(v) + y), 0.22, Mc));
      for (let T = 1; T <= M; T++) {
        let E = v + S * T,
          R = g(E);
        (wc(s, b(E, _, R + 0.2), b(E, _, R + y), 0.15, Mc),
          T < M &&
            wc(
              s,
              b(E, _, R + y),
              b(E + S * (T < M / 2 ? -1 : 1) * -1, _, g(E) + 0.2),
              0.1,
              Mc,
            ));
      }
      n.push({
        t: "obb",
        x: c[0] + (u[0] * f) / 2 + d[0] * _,
        z: c[1] + (u[1] * f) / 2 + d[1] * _,
        hx: 0.4,
        hz: (x - v) / 2,
        c: u[1],
        s: u[0],
        wall: !0,
        y0: c[2] - 2,
        y1: c[2] + 6,
      });
      let z = f + 3,
        A = g(f) + 21;
      (wc(s, b(z, _, g(f) - 1), b(z, _, A), 0.45, Mc, 0.6),
        wc(s, b(v + S * 2, _, g(v) + y), b(z, _, A), 0.35, Mc, 0.5));
      for (let T = 1; T < 5; T++) {
        let E = T / 5,
          R = v + S * 2 + (z - v - S * 2) * E,
          P = g(v) + y + (A - g(v) - y) * E;
        (wc(s, b(R, _, P), b(R, _, g(R) + y), 0.12, Mc),
          wc(s, b(R, _, P), b(R - (z - v - S * 2) / 5, _, g(R) + y), 0.09, Mc));
      }
      wc(s, b(z - 6, _, A - 0.5), b(z + 4, _, A - 0.5), 0.3, Mc, 0.5);
    }
    for (let w = 1; w < M; w += 2) {
      let _ = v + S * w;
      wc(s, b(_, -m, g(_) + y), b(_, m, g(_) + y), 0.12, Mc);
    }
    {
      let w = f + 3,
        _ = g(f) + 21;
      wc(s, b(w, -m, _), b(w, m, _), 0.4, Mc, 0.6);
      let z = b(w + 1, 0, 0);
      fv(s, [z[0], z[2]], u, d, 4.5, m - 1.2, _ - 9, _ - 1, Zyt);
    }
  }
  let a = o.edges.find(
    (r) => r.name === "Howard Street" && ys(r, -741, 1295, {}).d < 20,
  );
  if (a) {
    let r = ys(a, -741, 1295, {}),
      l = Ot(a, Math.max(a.s0 ?? 0, Math.min(a.s1 ?? a.L, r.s)), {}),
      c = [l.dx, l.dz],
      h = [-l.dz, l.dx],
      f = l.y + 7.2,
      u = 26,
      d = 3.4,
      p = 4.6,
      m = [l.x, l.z];
    (fv(s, m, h, c, u, d, f - 0.9, f, jF),
      fv(s, m, h, c, u, d, f + p, f + p + 0.5, jF));
    for (let g of [-1, 1]) {
      let b = [m[0] + c[0] * d * g, m[1] + c[1] * d * g];
      (fv(s, b, h, c, u, 0.05, f, f + p, Qyt),
        fv(
          s,
          [b[0] + c[0] * 0.08 * g, b[1] + c[1] * 0.08 * g],
          h,
          c,
          u,
          0.04,
          f + p - 0.55,
          f + p - 0.3,
          t5t,
        ));
      for (let v = -u; v <= u; v += 2.4) {
        let x = [
          b[0] + h[0] * v + c[0] * 0.07 * g,
          b[1] + h[1] * v + c[1] * 0.07 * g,
        ];
        fv(s, x, h, c, 0.07, 0.07, f, f + p, jF);
      }
    }
  }
  if (!s.empty) {
    let r = new ye(
      s.geometry(),
      new me({
        color: 16777215,
        roughness: 0.55,
        metalness: 0.1,
        vertexColors: !0,
        side: ls,
      }),
    );
    ((r.name = "structures"),
      (r.castShadow = !0),
      (r.receiveShadow = !0),
      (r.matrixAutoUpdate = !1),
      e.add(r));
  }
  return { group: e, colliders: n };
}
es();
var OQ = [
    ["80", "EAST", "Bay Bridge", "Oakland"],
    ["101", "NORTH", "Golden Gate", "Bridge"],
    ["101", "SOUTH", "San Jose", "SFO Airport"],
    ["", "EXIT", "Downtown", "Civic Center"],
    ["280", "SOUTH", "Daly City", ""],
    ["1", "SOUTH", "19th Ave", "Park Presidio"],
    ["101", "SOUTH", "Lombard St", "Van Ness Ave"],
    ["", "EXIT 2B", "4th St", "Embarcadero"],
    ["101", "NORTH", "Golden Gate Br", "Van Ness Ave"],
    ["", "EXIT", "Octavia Blvd", "Market St"],
    ["", "EXIT 433C", "Ninth St", "Civic Center"],
    ["", "EXIT 433B", "Bay Bridge", "Oakland"],
  ],
  k_ = OQ.length / 2;
function e5t() {
  let o = document.createElement("canvas");
  ((o.width = 1024), (o.height = 256 * k_));
  let t = o.getContext("2d");
  OQ.forEach(([s, n, i, a], r) => {
    let l = (r % 2) * 512,
      c = Math.floor(r / 2) * 256;
    ((t.fillStyle = "#09482a"),
      t.fillRect(l, c, 512, 256),
      (t.strokeStyle = "#e8ece6"),
      (t.lineWidth = 7),
      t.strokeRect(l + 12, c + 12, 488, 232),
      (t.fillStyle = "#eef2ec"),
      (t.textBaseline = "middle"));
    let h = l + 34;
    if (s) {
      let f = l + 34,
        u = c + 40,
        d = 96,
        p = 104;
      (s === "80" || s === "280"
        ? ((t.fillStyle = "#eef2ec"),
          t.fillRect(f - 3, u - 3, d + 6, p + 6),
          (t.fillStyle = "#1d3f8f"),
          t.fillRect(f, u + 26, d, p - 26),
          (t.fillStyle = "#b8262b"),
          t.fillRect(f, u, d, 24),
          (t.fillStyle = "#eef2ec"))
        : ((t.fillStyle = "#eef2ec"),
          t.fillRect(f, u, d, p),
          (t.fillStyle = "#111")),
        (t.font = `bold ${s.length > 2 ? 40 : 50}px Arial, sans-serif`),
        (t.textAlign = "center"),
        t.fillText(s, f + d / 2, u + p / 2 + 12),
        (t.fillStyle = "#eef2ec"),
        (t.font = "bold 30px Arial, sans-serif"),
        t.fillText(n, f + d / 2, u + p + 38),
        (h = l + 158));
    } else
      ((t.fillStyle = "#f2c230"),
        t.fillRect(l + 330, c + 22, 160, 44),
        (t.fillStyle = "#111"),
        (t.font = "bold 30px Arial, sans-serif"),
        (t.textAlign = "center"),
        t.fillText(n, l + 410, c + 45),
        (t.fillStyle = "#eef2ec"));
    t.textAlign = "left";
    {
      let f = 48;
      for (
        t.font = `bold ${f}px Arial, sans-serif`;
        f > 30 &&
        Math.max(t.measureText(i).width, t.measureText(a).width) > l + 492 - h;
      )
        t.font = `bold ${(f -= 2)}px Arial, sans-serif`;
    }
    (t.fillText(i, h, c + (a ? 100 : 128)),
      a && t.fillText(a, h, c + 164),
      t.beginPath(),
      t.moveTo(l + 440, c + 230),
      t.lineTo(l + 440, c + 196),
      t.moveTo(l + 428, c + 206),
      t.lineTo(l + 440, c + 190),
      t.lineTo(l + 452, c + 206),
      (t.strokeStyle = "#eef2ec"),
      (t.lineWidth = 6),
      t.stroke());
  });
  let e = new Sn(o);
  return ((e.colorSpace = Je), (e.anisotropy = 8), (e.generateMipmaps = !0), e);
}
var s5t = [
    {
      name: "James Lick Freeway",
      at: [-1046, 3545],
      dir: [0.17, -0.98],
      cells: [1, 10, 0],
    },
    {
      name: "Presidio Parkway",
      at: [-6846, -894],
      dir: [0.75, 0.66],
      cells: [6, 5],
      arch: !0,
    },
  ],
  n5t = new Set([
    "Golden Gate Bridge",
    "Yerba Buena Tunnel",
    "San Francisco\u2013Oakland Bay Bridge",
  ]);
function i5t(o, t, e, s) {
  return /Presidio|Veterans|Doyle/.test(o || "")
    ? e < -0.3 || t < -0.3
      ? [1, 5]
      : [6, 3]
    : /Central|Octavia/.test(o || "")
      ? t < 0 || e < -0.5
        ? [8, 9]
        : [0, 2]
      : /James Lick/.test(o || "")
        ? e < 0
          ? s < 0.5
            ? [1, 11]
            : [1, 10]
          : [2, 4]
        : t > 0
          ? [0, s < 0.5 ? 7 : 3]
          : [2, 3];
}
