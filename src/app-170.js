// app 170 — math
// Lines 101071-101407 of readable/app.pretty.js (statement-aligned).
function oV(i, t, e = null) {
  let s = (a, r, l, c = jh, h = 4) => {
      Bc(e, a, r, 0, l) && dP(i, a, r, l, c, h);
    },
    n = uP(t, e);
  if (n.length >= 3) {
    let a = [
      n.reduce((r, l) => r + l[0], 0) / n.length,
      n.reduce((r, l) => r + l[1], 0) / n.length + 7,
      n.reduce((r, l) => r + l[2], 0) / n.length,
    ];
    for (let r = 0; r < n.length; r++) {
      let l = n[r],
        c = n[(r + 1) % n.length],
        h = [l[0], l[1] + 7.3, l[2]],
        f = [(h[0] + a[0]) / 2, (h[1] + a[1]) / 2 - 0.35, (h[2] + a[2]) / 2];
      Bc(e, h, f) &&
        Bc(e, f, a) &&
        (s(h, f, 0.012, jh, 3), s(f, a, 0.012, jh, 3));
      let u = [c[0], c[1] + 7.1, c[2]],
        d = [
          (h[0] + u[0]) / 2,
          (h[1] + 7.1 - 7.3 + u[1]) / 2 - 0.3,
          (h[2] + u[2]) / 2,
        ],
        p = [l[0], l[1] + 7.1, l[2]];
      Bc(e, p, d) &&
        Bc(e, d, u) &&
        (s(p, d, 0.012, jh, 3), s(d, u, 0.012, jh, 3));
    }
  }
  let o = [];
  for (let [a, r] of t.legs || []) {
    if (!a.trolley || a.elev || a.s1 - a.s0 < 12) continue;
    let l = r === "a" ? a.s0 + 2 : a.s1 - 2,
      c = Ot(a, l, {}),
      h = r === "a" ? -1 : 1,
      f = a.oneway ? [-0.3, 0.3] : [-2.5, -1.9, 1.9, 2.5];
    o.push({
      dx: c.dx * h,
      dz: c.dz * h,
      w: f.map((u) => ({
        r: u * h,
        p: [c.x + c.nx * u, c.y + 5.9, c.z + c.nz * u],
      })),
    });
  }
  if (!(o.length < 2))
    for (let a = 0; a < o.length; a++)
      for (let r = a + 1; r < o.length; r++) {
        let l = o[a],
          c = o[r];
        if (!(l.dx * c.dx + l.dz * c.dz > 0.5))
          for (let h of l.w) {
            let f = null,
              u = 1e9;
            for (let x of c.w) {
              let v = Math.abs(x.r + h.r);
              v < u && ((u = v), (f = x));
            }
            let d = h.p,
              p = f.p,
              m = [(d[0] + p[0]) / 2, (d[1] + p[1]) / 2, (d[2] + p[2]) / 2],
              g = l.dx * c.dz - l.dz * c.dx;
            if (Math.abs(g) > 0.2) {
              let x = ((p[0] - d[0]) * c.dz - (p[2] - d[2]) * c.dx) / g;
              x > 0 && x < 40 && (m = [d[0] + l.dx * x, m[1], d[2] + l.dz * x]);
            }
            let b = [d];
            for (let x = 1; x <= 4; x++) {
              let v = x / 4,
                y = 1 - v;
              b.push([
                y * y * d[0] + 2 * y * v * m[0] + v * v * p[0],
                y * y * d[1] + 2 * y * v * m[1] + v * v * p[1],
                y * y * d[2] + 2 * y * v * m[2] + v * v * p[2],
              ]);
            }
            if (b.slice(1).every((x, v) => Bc(e, b[v], x)))
              for (let x = 1; x < b.length; x++) s(b[x - 1], b[x], 0.021);
          }
      }
}
function dP(i, t, e, s, n = jh, o = 4) {
  let a = e[0] - t[0],
    r = e[1] - t[1],
    l = e[2] - t[2],
    c = Math.hypot(a, r, l);
  if (c < 0.01) return;
  let h = [a / c, r / c, l / c],
    f = Math.abs(h[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0],
    u = [
      h[1] * f[2] - h[2] * f[1],
      h[2] * f[0] - h[0] * f[2],
      h[0] * f[1] - h[1] * f[0],
    ],
    d = Math.hypot(...u);
  u = u.map((g) => g / d);
  let p = [
      h[1] * u[2] - h[2] * u[1],
      h[2] * u[0] - h[0] * u[2],
      h[0] * u[1] - h[1] * u[0],
    ],
    m =
      o === 4
        ? [u, p, u.map((g) => -g), p.map((g) => -g)]
        : Array.from({ length: o }, (g, b) => {
            let x = (b / o) * 2 * Math.PI,
              v = Math.cos(x),
              y = Math.sin(x);
            return [
              u[0] * v + p[0] * y,
              u[1] * v + p[1] * y,
              u[2] * v + p[2] * y,
            ];
          });
  for (let g = 0; g < o; g++) {
    let b = m[g],
      x = m[(g + 1) % o],
      v = (z, _, R, T) =>
        i.vert(
          z[0] + _[0] * s,
          z[1] + _[1] * s,
          z[2] + _[2] * s,
          _[0],
          _[1],
          _[2],
          R,
          T,
          n,
        ),
      y = v(t, b, 0, 0),
      M = v(e, b, c, 0),
      S = v(e, x, c, 1),
      w = v(t, x, 0, 1);
    (i.tri(y, M, S), i.tri(y, S, w));
  }
}
var $dt = new Set([
    "russian",
    "telegraph",
    "northbeach",
    "nob",
    "pacific",
    "cowhollow",
    "western",
    "richmond",
    "hayes",
    "haight",
    "castro",
    "dolores",
    "noe",
    "twinpeaks",
    "mission",
    "soma",
  ]),
  Xdt = new Set(["residential", "tertiary", "unclassified", "living_street"]),
  Gj = (i, t) => {
    let e = Math.sin(i * 12.9898 + t * 78.233) * 43758.5453;
    return e - Math.floor(e);
  };
function pP(i, t = null) {
  if (
    i._util !== void 0 ||
    ((i._util = []),
    i.trolley ||
      i.elev ||
      i.sunk ||
      i.hwy ||
      i.inner ||
      !Xdt.has(i.cls) ||
      i.s1 - i.s0 < 30 ||
      i.flags & ll.cable)
  )
    return i._util;
  let e = Ot(i, (i.s0 + i.s1) / 2, {});
  if (!$dt.has(Ai(e.x, e.z)) || Gj(Math.round(e.x), Math.round(e.z)) > 0.72)
    return i._util;
  let s = Gj(e.z, e.x) < 0.5 ? -1 : 1,
    n = Math.max(1, Math.round((i.s1 - i.s0 - 8) / 36));
  for (let o = 0; o <= n; o++) {
    let a = i.s0 + 4 + ((i.s1 - i.s0 - 8) * o) / n,
      r = Ot(i, a, {}),
      l = r.w + 0.5,
      c = r.x + r.nx * l * s,
      h = r.z + r.nz * l * s;
    if (t && t.surfaceAt(c + r.nx * s * 0.3, h + r.nz * s * 0.3) === "road") {
      i._util.push({ s: a, P: null, o: r, sd: s });
      continue;
    }
    let f = (t ? t.driveHeight(c, h, null, r.y) : r.y) + 0.12;
    i._util.push({
      s: a,
      P: Jd(t, c, h, f, f + 10.4, 0.25) ? [c, f, h] : null,
      o: r,
      sd: s,
      k: o,
      y: !!t,
    });
  }
  return i._util;
}
var J7 = [0.025, 0.025, 0.027, 0];
function Z7(i, t, e, s, n, o, a = 4, r = null) {
  if (!Bc(r, t, e, s, n)) return;
  let l = t;
  for (let c = 1; c <= a; c++) {
    let h = c / a,
      f = [
        t[0] + (e[0] - t[0]) * h,
        t[1] + (e[1] - t[1]) * h - 4 * s * h * (1 - h),
        t[2] + (e[2] - t[2]) * h,
      ];
    (dP(i, l, f, n, o), (l = f));
  }
}
function aV(i, t, e, s, n = null) {
  let o = pP(t, n);
  if (o.length) {
    if (n)
      for (let a of o)
        a.P &&
          !a.y &&
          ((a.P[1] = n.driveHeight(a.P[0], a.P[2]) + 0.12), (a.y = !0));
    for (let a = 0; a < o.length; a++) {
      let r = o[a];
      if (!r.P || r.s < e - 0.01 || r.s >= s + 0.01) continue;
      let [l, c, h] = r.P,
        f = r.o,
        u = f.nx * r.sd,
        d = f.nz * r.sd,
        p = 10.4,
        m = c + p - 0.55;
      if (r.k % 2 === 0)
        for (let w of [-7, 6]) {
          let z = l + u * (t.sw - 0.3) + f.dx * w,
            _ = h + d * (t.sw - 0.3) + f.dz * w,
            R = (n ? n.driveHeight(z - u * 0.6, _ - d * 0.6) : c) + 5.4;
          Z7(
            i,
            [l + u * 0.3, c + 6.9, h + d * 0.3],
            [z, R, _],
            0.25,
            0.01,
            J7,
            3,
            n,
          );
        }
      let g = o[a + 1];
      if (!g || !g.P) continue;
      let [b, x, v] = g.P,
        y = g.o.nx * g.sd,
        M = g.o.nz * g.sd,
        S = x + p - 0.55;
      for (let w of [-1.1, 0, 1])
        Z7(
          i,
          [l + u * w, m + 0.24, h + d * w],
          [b + y * w, S + 0.24, v + M * w],
          0.35,
          0.011,
          J7,
          4,
          n,
        );
      for (let [w, z, _, R] of [
        [6.9, -0.3, 0.013, 0.55],
        [6.5, -0.3, 0.013, 0.6],
        [5.6, 0.12, 0.03, 0.75],
      ])
        Z7(
          i,
          [l - u * z, c + w, h - d * z],
          [b - y * z, x + w, v - M * z],
          R,
          _,
          J7,
          4,
          n,
        );
    }
  }
}
function rV(i, t, e, s, n = null) {
  let o = (l, c, h, f = jh, u = 4) => {
      Bc(n, l, c, 0, h) && dP(i, l, c, h, f, u);
    },
    a = fP(t, n);
  if (!a.length) return;
  let r = t.oneway
    ? [[-0.3, 0.3]]
    : [
        [-2.5, -1.9],
        [1.9, 2.5],
      ];
  for (let l = 0; l < a.length; l++) {
    let c = a[l];
    if (c.s < e - 0.01 || c.s >= s + 0.01) continue;
    if (c.L && c.R) {
      o([c.L[0], c.L[1] + 7, c.L[2]], [c.R[0], c.R[1] + 7, c.R[2]], 0.012);
      let f = (c.L[1] + c.R[1]) / 2 + 6.9;
      for (let u of r) {
        let d = (u[0] + u[1]) / 2,
          p = c.o.x + c.o.nx * d,
          m = c.o.z + c.o.nz * d;
        o([p, c.o.y + 5.9, m], [p, f, m], 0.012, jh, 3);
      }
    }
    let h = a[l + 1];
    if (h) {
      for (let [f, u] of [
        [c.L, h.L],
        [c.R, h.R],
      ])
        if (f && u) {
          let d = [f[0], f[1] + 7.25, f[2]],
            p = [u[0], u[1] + 7.25, u[2]],
            m = [
              (d[0] + p[0]) / 2,
              (d[1] + p[1]) / 2 - 0.45,
              (d[2] + p[2]) / 2,
            ];
          Bc(n, d, m) &&
            Bc(n, m, p) &&
            (o(d, m, 0.026, jh, 3), o(m, p, 0.026, jh, 3));
        }
      for (let f of r)
        for (let u of f) {
          let d = [c.o.x + c.o.nx * u, c.o.y + 5.9, c.o.z + c.o.nz * u],
            p = [h.o.x + h.o.nx * u, h.o.y + 5.9, h.o.z + h.o.nz * u];
          o(d, p, 0.021);
        }
    }
  }
}
as();
