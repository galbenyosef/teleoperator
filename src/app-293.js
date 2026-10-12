// app 293 — fillstyle
// Lines 142884-143164 of readable/app.pretty.js (statement-aligned).
function CJ(i, t) {
  let e = new ke();
  e.name = "Structures";
  let s = new Ce(),
    n = [],
    o = i.edges.filter(
      (r) =>
        r.name === "3rd Street" &&
        r.layer === 1 &&
        r.P[0] > 200 &&
        r.P[0] < 360 &&
        r.P[1] > 2020 &&
        r.P[1] < 2160,
    );
  if (o.length) {
    let r = [],
      l = 0;
    for (let w of o) {
      for (let z = 0; z < w.n; z++)
        r.push([w.P[z * 3], w.P[z * 3 + 1], w.P[z * 3 + 2]]);
      l = Math.max(l, ...w.W);
    }
    r.sort((w, z) => w[1] - z[1]);
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
      b = (w, z, _) => [
        c[0] + u[0] * w + d[0] * z,
        _,
        c[1] + u[1] * w + d[1] * z,
      ],
      x = -4,
      v = f + 4,
      y = 5.5,
      M = Math.max(4, Math.round((v - x) / 5.5)),
      S = (v - x) / M;
    for (let w of [-1, 1]) {
      let z = m * w;
      (Zl(s, b(x, z, g(x) + 0.2), b(v, z, g(v) + 0.2), 0.25, Ql, 0.4),
        Zl(s, b(x + S, z, g(x) + y), b(v, z, g(v) + y), 0.25, Ql, 0.35),
        Zl(s, b(x, z, g(x) + 0.2), b(x + S, z, g(x) + y), 0.22, Ql));
      for (let T = 1; T <= M; T++) {
        let E = x + S * T,
          A = g(E);
        (Zl(s, b(E, z, A + 0.2), b(E, z, A + y), 0.15, Ql),
          T < M &&
            Zl(
              s,
              b(E, z, A + y),
              b(E + S * (T < M / 2 ? -1 : 1) * -1, z, g(E) + 0.2),
              0.1,
              Ql,
            ));
      }
      n.push({
        t: "obb",
        x: c[0] + (u[0] * f) / 2 + d[0] * z,
        z: c[1] + (u[1] * f) / 2 + d[1] * z,
        hx: 0.4,
        hz: (v - x) / 2,
        c: u[1],
        s: u[0],
        wall: !0,
        y0: c[2] - 2,
        y1: c[2] + 6,
      });
      let _ = f + 3,
        R = g(f) + 21;
      (Zl(s, b(_, z, g(f) - 1), b(_, z, R), 0.45, Ql, 0.6),
        Zl(s, b(x + S * 2, z, g(x) + y), b(_, z, R), 0.35, Ql, 0.5));
      for (let T = 1; T < 5; T++) {
        let E = T / 5,
          A = x + S * 2 + (_ - x - S * 2) * E,
          C = g(x) + y + (R - g(x) - y) * E;
        (Zl(s, b(A, z, C), b(A, z, g(A) + y), 0.12, Ql),
          Zl(s, b(A, z, C), b(A - (_ - x - S * 2) / 5, z, g(A) + y), 0.09, Ql));
      }
      Zl(s, b(_ - 6, z, R - 0.5), b(_ + 4, z, R - 0.5), 0.3, Ql, 0.5);
    }
    for (let w = 1; w < M; w += 2) {
      let z = x + S * w;
      Zl(s, b(z, -m, g(z) + y), b(z, m, g(z) + y), 0.12, Ql);
    }
    {
      let w = f + 3,
        z = g(f) + 21;
      Zl(s, b(w, -m, z), b(w, m, z), 0.4, Ql, 0.6);
      let _ = b(w + 1, 0, 0);
      _x(s, [_[0], _[2]], u, d, 4.5, m - 1.2, z - 9, z - 1, Ext);
    }
  }
  let a = i.edges.find(
    (r) => r.name === "Howard Street" && vs(r, -741, 1295, {}).d < 20,
  );
  if (a) {
    let r = vs(a, -741, 1295, {}),
      l = Ot(a, Math.max(a.s0 ?? 0, Math.min(a.s1 ?? a.L, r.s)), {}),
      c = [l.dx, l.dz],
      h = [-l.dz, l.dx],
      f = l.y + 7.2,
      u = 26,
      d = 3.4,
      p = 4.6,
      m = [l.x, l.z];
    (_x(s, m, h, c, u, d, f - 0.9, f, gI),
      _x(s, m, h, c, u, d, f + p, f + p + 0.5, gI));
    for (let g of [-1, 1]) {
      let b = [m[0] + c[0] * d * g, m[1] + c[1] * d * g];
      (_x(s, b, h, c, u, 0.05, f, f + p, Txt),
        _x(
          s,
          [b[0] + c[0] * 0.08 * g, b[1] + c[1] * 0.08 * g],
          h,
          c,
          u,
          0.04,
          f + p - 0.55,
          f + p - 0.3,
          Axt,
        ));
      for (let x = -u; x <= u; x += 2.4) {
        let v = [
          b[0] + h[0] * x + c[0] * 0.07 * g,
          b[1] + h[1] * x + c[1] * 0.07 * g,
        ];
        _x(s, v, h, c, 0.07, 0.07, f, f + p, gI);
      }
    }
  }
  if (!s.empty) {
    let r = new _e(
      s.geometry(),
      new Ee({
        color: 16777215,
        roughness: 0.55,
        metalness: 0.1,
        vertexColors: !0,
        side: Ss,
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
as();
var LJ = [
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
  k_ = LJ.length / 2;
function Rxt() {
  let i = document.createElement("canvas");
  ((i.width = 1024), (i.height = 256 * k_));
  let t = i.getContext("2d");
  LJ.forEach(([s, n, o, a], r) => {
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
        Math.max(t.measureText(o).width, t.measureText(a).width) > l + 492 - h;
      )
        t.font = `bold ${(f -= 2)}px Arial, sans-serif`;
    }
    (t.fillText(o, h, c + (a ? 100 : 128)),
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
  let e = new Sn(i);
  return ((e.colorSpace = is), (e.anisotropy = 8), (e.generateMipmaps = !0), e);
}
var Pxt = [
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
  Cxt = new Set([
    "Golden Gate Bridge",
    "Yerba Buena Tunnel",
    "San Francisco\u2013Oakland Bay Bridge",
  ]);
function Lxt(i, t, e, s) {
  return /Presidio|Veterans|Doyle/.test(i || "")
    ? e < -0.3 || t < -0.3
      ? [1, 5]
      : [6, 3]
    : /Central|Octavia/.test(i || "")
      ? t < 0 || e < -0.5
        ? [8, 9]
        : [0, 2]
      : /James Lick/.test(i || "")
        ? e < 0
          ? s < 0.5
            ? [1, 11]
            : [1, 10]
          : [2, 4]
        : t > 0
          ? [0, s < 0.5 ? 7 : 3]
          : [2, 3];
}
