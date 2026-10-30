// app 169 — math
// Lines 101307-101643 of readable/app.pretty.js (statement-aligned).
function lX(o, t, e = null) {
  let s = (a, r, l, c = Sf, h = 4) => {
      dh(e, a, r, 0, l) && WC(o, a, r, l, c, h);
    },
    n = VC(t, e);
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
      dh(e, h, f) &&
        dh(e, f, a) &&
        (s(h, f, 0.012, Sf, 3), s(f, a, 0.012, Sf, 3));
      let u = [c[0], c[1] + 7.1, c[2]],
        d = [
          (h[0] + u[0]) / 2,
          (h[1] + 7.1 - 7.3 + u[1]) / 2 - 0.3,
          (h[2] + u[2]) / 2,
        ],
        p = [l[0], l[1] + 7.1, l[2]];
      dh(e, p, d) &&
        dh(e, d, u) &&
        (s(p, d, 0.012, Sf, 3), s(d, u, 0.012, Sf, 3));
    }
  }
  let i = [];
  for (let [a, r] of t.legs || []) {
    if (!a.trolley || a.elev || a.s1 - a.s0 < 12) continue;
    let l = r === "a" ? a.s0 + 2 : a.s1 - 2,
      c = Ot(a, l, {}),
      h = r === "a" ? -1 : 1,
      f = a.oneway ? [-0.3, 0.3] : [-2.5, -1.9, 1.9, 2.5];
    i.push({
      dx: c.dx * h,
      dz: c.dz * h,
      w: f.map((u) => ({
        r: u * h,
        p: [c.x + c.nx * u, c.y + 5.9, c.z + c.nz * u],
      })),
    });
  }
  if (!(i.length < 2))
    for (let a = 0; a < i.length; a++)
      for (let r = a + 1; r < i.length; r++) {
        let l = i[a],
          c = i[r];
        if (!(l.dx * c.dx + l.dz * c.dz > 0.5))
          for (let h of l.w) {
            let f = null,
              u = 1e9;
            for (let v of c.w) {
              let x = Math.abs(v.r + h.r);
              x < u && ((u = x), (f = v));
            }
            let d = h.p,
              p = f.p,
              m = [(d[0] + p[0]) / 2, (d[1] + p[1]) / 2, (d[2] + p[2]) / 2],
              g = l.dx * c.dz - l.dz * c.dx;
            if (Math.abs(g) > 0.2) {
              let v = ((p[0] - d[0]) * c.dz - (p[2] - d[2]) * c.dx) / g;
              v > 0 && v < 40 && (m = [d[0] + l.dx * v, m[1], d[2] + l.dz * v]);
            }
            let b = [d];
            for (let v = 1; v <= 4; v++) {
              let x = v / 4,
                y = 1 - x;
              b.push([
                y * y * d[0] + 2 * y * x * m[0] + x * x * p[0],
                y * y * d[1] + 2 * y * x * m[1] + x * x * p[1],
                y * y * d[2] + 2 * y * x * m[2] + x * x * p[2],
              ]);
            }
            if (b.slice(1).every((v, x) => dh(e, b[x], v)))
              for (let v = 1; v < b.length; v++) s(b[v - 1], b[v], 0.021);
          }
      }
}
function WC(o, t, e, s, n = Sf, i = 4) {
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
      i === 4
        ? [u, p, u.map((g) => -g), p.map((g) => -g)]
        : Array.from({ length: i }, (g, b) => {
            let v = (b / i) * 2 * Math.PI,
              x = Math.cos(v),
              y = Math.sin(v);
            return [
              u[0] * x + p[0] * y,
              u[1] * x + p[1] * y,
              u[2] * x + p[2] * y,
            ];
          });
  for (let g = 0; g < i; g++) {
    let b = m[g],
      v = m[(g + 1) % i],
      x = (_, z, A, T) =>
        o.vert(
          _[0] + z[0] * s,
          _[1] + z[1] * s,
          _[2] + z[2] * s,
          z[0],
          z[1],
          z[2],
          A,
          T,
          n,
        ),
      y = x(t, b, 0, 0),
      M = x(e, b, c, 0),
      S = x(e, v, c, 1),
      w = x(t, v, 0, 1);
    (o.tri(y, M, S), o.tri(y, S, w));
  }
}
var b2t = new Set([
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
  x2t = new Set(["residential", "tertiary", "unclassified", "living_street"]),
  q$ = (o, t) => {
    let e = Math.sin(o * 12.9898 + t * 78.233) * 43758.5453;
    return e - Math.floor(e);
  };
function qC(o, t = null) {
  if (
    o._util !== void 0 ||
    ((o._util = []),
    o.trolley ||
      o.elev ||
      o.sunk ||
      o.hwy ||
      o.inner ||
      !x2t.has(o.cls) ||
      o.s1 - o.s0 < 30 ||
      o.flags & Al.cable)
  )
    return o._util;
  let e = Ot(o, (o.s0 + o.s1) / 2, {});
  if (!b2t.has(Di(e.x, e.z)) || q$(Math.round(e.x), Math.round(e.z)) > 0.72)
    return o._util;
  let s = q$(e.z, e.x) < 0.5 ? -1 : 1,
    n = Math.max(1, Math.round((o.s1 - o.s0 - 8) / 36));
  for (let i = 0; i <= n; i++) {
    let a = o.s0 + 4 + ((o.s1 - o.s0 - 8) * i) / n,
      r = Ot(o, a, {}),
      l = r.w + 0.5,
      c = r.x + r.nx * l * s,
      h = r.z + r.nz * l * s;
    if (t && t.surfaceAt(c + r.nx * s * 0.3, h + r.nz * s * 0.3) === "road") {
      o._util.push({ s: a, P: null, o: r, sd: s });
      continue;
    }
    let f = (t ? t.driveHeight(c, h, null, r.y) : r.y) + 0.12;
    o._util.push({
      s: a,
      P: Rp(t, c, h, f, f + 10.4, 0.25) ? [c, f, h] : null,
      o: r,
      sd: s,
      k: i,
      y: !!t,
    });
  }
  return o._util;
}
var TC = [0.025, 0.025, 0.027, 0];
function RC(o, t, e, s, n, i, a = 4, r = null) {
  if (!dh(r, t, e, s, n)) return;
  let l = t;
  for (let c = 1; c <= a; c++) {
    let h = c / a,
      f = [
        t[0] + (e[0] - t[0]) * h,
        t[1] + (e[1] - t[1]) * h - 4 * s * h * (1 - h),
        t[2] + (e[2] - t[2]) * h,
      ];
    (WC(o, l, f, n, i), (l = f));
  }
}
function cX(o, t, e, s, n = null) {
  let i = qC(t, n);
  if (i.length) {
    if (n)
      for (let a of i)
        a.P &&
          !a.y &&
          ((a.P[1] = n.driveHeight(a.P[0], a.P[2]) + 0.12), (a.y = !0));
    for (let a = 0; a < i.length; a++) {
      let r = i[a];
      if (!r.P || r.s < e - 0.01 || r.s >= s + 0.01) continue;
      let [l, c, h] = r.P,
        f = r.o,
        u = f.nx * r.sd,
        d = f.nz * r.sd,
        p = 10.4,
        m = c + p - 0.55;
      if (r.k % 2 === 0)
        for (let w of [-7, 6]) {
          let _ = l + u * (t.sw - 0.3) + f.dx * w,
            z = h + d * (t.sw - 0.3) + f.dz * w,
            A = (n ? n.driveHeight(_ - u * 0.6, z - d * 0.6) : c) + 5.4;
          RC(
            o,
            [l + u * 0.3, c + 6.9, h + d * 0.3],
            [_, A, z],
            0.25,
            0.01,
            TC,
            3,
            n,
          );
        }
      let g = i[a + 1];
      if (!g || !g.P) continue;
      let [b, v, x] = g.P,
        y = g.o.nx * g.sd,
        M = g.o.nz * g.sd,
        S = v + p - 0.55;
      for (let w of [-1.1, 0, 1])
        RC(
          o,
          [l + u * w, m + 0.24, h + d * w],
          [b + y * w, S + 0.24, x + M * w],
          0.35,
          0.011,
          TC,
          4,
          n,
        );
      for (let [w, _, z, A] of [
        [6.9, -0.3, 0.013, 0.55],
        [6.5, -0.3, 0.013, 0.6],
        [5.6, 0.12, 0.03, 0.75],
      ])
        RC(
          o,
          [l - u * _, c + w, h - d * _],
          [b - y * _, v + w, x - M * _],
          A,
          z,
          TC,
          4,
          n,
        );
    }
  }
}
function hX(o, t, e, s, n = null) {
  let i = (l, c, h, f = Sf, u = 4) => {
      dh(n, l, c, 0, h) && WC(o, l, c, h, f, u);
    },
    a = GC(t, n);
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
      i([c.L[0], c.L[1] + 7, c.L[2]], [c.R[0], c.R[1] + 7, c.R[2]], 0.012);
      let f = (c.L[1] + c.R[1]) / 2 + 6.9;
      for (let u of r) {
        let d = (u[0] + u[1]) / 2,
          p = c.o.x + c.o.nx * d,
          m = c.o.z + c.o.nz * d;
        i([p, c.o.y + 5.9, m], [p, f, m], 0.012, Sf, 3);
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
          dh(n, d, m) &&
            dh(n, m, p) &&
            (i(d, m, 0.026, Sf, 3), i(m, p, 0.026, Sf, 3));
        }
      for (let f of r)
        for (let u of f) {
          let d = [c.o.x + c.o.nx * u, c.o.y + 5.9, c.o.z + c.o.nz * u],
            p = [h.o.x + h.o.nx * u, h.o.y + 5.9, h.o.z + h.o.nz * u];
          i(d, p, 0.021);
        }
    }
  }
}
es();
