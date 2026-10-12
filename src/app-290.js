// app 290 — math
// Lines 140863-141105 of readable/app.pretty.js (statement-aligned).
as();
Oa();
En();
Gg();
var Tw = xt;
function Ni(i, t, e, s, n, o) {
  let a = new Tw(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    r = a.length();
  if (r < 1e-4) return;
  a.divideScalar(r);
  let l = Math.abs(a.y) > 0.95 ? new Tw(1, 0, 0) : new Tw(0, 1, 0),
    c = new Tw().crossVectors(a, l).normalize(),
    h = new Tw().crossVectors(c, a).normalize(),
    f = (p, m, g) => [
      p[0] + (c.x * m * s) / 2 + (h.x * g * n) / 2,
      p[1] + (c.y * m * s) / 2 + (h.y * g * n) / 2,
      p[2] + (c.z * m * s) / 2 + (h.z * g * n) / 2,
    ],
    u = [f(t, -1, -1), f(t, 1, -1), f(t, 1, 1), f(t, -1, 1)],
    d = [f(e, -1, -1), f(e, 1, -1), f(e, 1, 1), f(e, -1, 1)];
  for (let p = 0; p < 4; p++) {
    let m = (p + 1) % 4;
    i.quad(u[p], u[m], d[m], d[p], [0, 0], [s, 0], [s, r], [0, r], o);
  }
}
function Fn(i, t, e, s, n, o, a, r, l, c, h = !0) {
  r < 0 && o > 0.5 && a > 0.5 && hG(t, e, s, n, o, a);
  let f = -n,
    u = s,
    d = (m, g, b) => [t + s * o * m + f * a * g, b, e + n * o * m + u * a * g],
    p = (m, g, b, x) => i.quad(m, g, b, x, [0, 0], [1, 0], [1, 1], [0, 1], c);
  (p(d(-1, -1, r), d(1, -1, r), d(1, -1, l), d(-1, -1, l)),
    p(d(1, 1, r), d(-1, 1, r), d(-1, 1, l), d(1, 1, l)),
    p(d(1, -1, r), d(1, 1, r), d(1, 1, l), d(1, -1, l)),
    p(d(-1, 1, r), d(-1, -1, r), d(-1, -1, l), d(-1, 1, l)),
    p(d(-1, 1, l), d(1, 1, l), d(1, -1, l), d(-1, -1, l)),
    h && p(d(-1, -1, r), d(1, -1, r), d(1, 1, r), d(-1, 1, r)));
}
function Au(i, t, e, s, n, o, a, r = a, l = !0) {
  let c = (v, y, M) => [v.x - v.uz * y, v.y + M, v.z + v.ux * y],
    h = c(t, -s, -n),
    f = c(t, s, -n),
    u = c(e, -s, -n),
    d = c(e, s, -n),
    p = c(t, -s, -o),
    m = c(t, s, -o),
    g = c(e, -s, -o),
    b = c(e, s, -o),
    x = (v, y, M, S, w, z) => {
      let _ = y[0] - v[0],
        R = y[2] - v[2],
        T = S[0] - v[0],
        E = S[2] - v[2];
      R * T - _ * E > 0 == z > 0
        ? i.quad(v, y, M, S, [0, 0], [1, 0], [1, 1], [0, 1], w, [0, z, 0])
        : i.quad(v, S, M, y, [0, 0], [1, 0], [1, 1], [0, 1], w, [0, z, 0]);
    };
  if ((x(h, u, d, f, a, 1), x(p, g, b, m, r, -1), l)) {
    let v = (S, w, z, _, R) => {
        let T = [R[0], 0, R[1]];
        i.quad(S, w, z, _, [0, 0], [1, 0], [1, 1], [0, 1], r, T);
      },
      y = [-t.uz, t.ux],
      M = [t.uz, -t.ux];
    (v(p, g, u, h, y), v(b, m, f, d, M));
  }
}
function Aw(i, t, e, s, n, o, a) {
  let r = e[0] - t[0],
    l = e[1] - t[1],
    c = e[2] - t[2],
    h = n[0] - t[0],
    f = n[1] - t[1],
    u = n[2] - t[2],
    d = l * u - c * f,
    p = c * h - r * u,
    m = r * f - l * h;
  d * o[0] + p * o[1] + m * o[2] >= 0
    ? i.quad(t, e, s, n, [0, 0], [1, 0], [1, 1], [0, 1], a, o)
    : i.quad(t, n, s, e, [0, 0], [0, 1], [1, 1], [1, 0], a, o);
}
var Em = [
  [0.25, 0],
  [0.25, 0.07],
  [0.12, 0.3],
  [0.12, 0.64],
  [0.17, 0.68],
  [0.17, 0.81],
];
function xxt(i, t, e, s) {
  let n = e.length,
    o = e.map((l, c) => {
      let h = e[Math.max(0, c - 1)],
        f = e[Math.min(n - 1, c + 1)],
        u = f.x - h.x,
        d = f.z - h.z,
        p = Math.hypot(u, d) || 1;
      return { ...l, rx: -d / p, rz: u / p };
    }),
    a = (l, c, h) => [l.x + l.rx * c, l.y + h, l.z + l.rz * c],
    r = 0;
  for (let l = 0; l + 1 < n; l++) {
    let c = o[l],
      h = o[l + 1],
      f = Math.hypot(h.x - c.x, h.z - c.z);
    if (f < 0.05) continue;
    for (let p of [-1, 1])
      for (let m = 0; m + 1 < Em.length; m++) {
        let [g, b] = Em[m],
          [x, v] = Em[m + 1],
          y = x - g,
          M = v - b,
          S = Math.hypot(y, M),
          w = M / S,
          z = -y / S,
          _ = [((c.rx + h.rx) / 2) * w * p, z, ((c.rz + h.rz) / 2) * w * p];
        Aw(
          i,
          a(c, g * p, b),
          a(h, g * p, b),
          a(h, x * p, v),
          a(c, x * p, v),
          _,
          m === 0 ? wxt : AJ,
        );
      }
    let u = Em[Em.length - 1];
    {
      let p = Math.min(0.8, (c.gap ?? 0.6) / 2 + 0.03),
        m = Math.min(0.8, (h.gap ?? 0.6) / 2 + 0.03);
      Aw(
        i,
        a(c, -p, -0.004),
        a(h, -m, -0.004),
        a(h, m, -0.004),
        a(c, p, -0.004),
        [0, 1, 0],
        Mxt,
      );
    }
    Aw(
      i,
      a(c, -u[0], u[1]),
      a(h, -u[0], u[1]),
      a(h, u[0], u[1]),
      a(c, u[0], u[1]),
      [0, 1, 0],
      AJ,
    );
    let d = t((c.x + h.x) / 2, (c.z + h.z) / 2);
    for (let p = Math.ceil(r) - r; p < f; p += 1) {
      let m = p / f,
        g = {
          x: c.x + (h.x - c.x) * m,
          z: c.z + (h.z - c.z) * m,
          y: c.y + (h.y - c.y) * m,
          rx: c.rx,
          rz: c.rz,
        },
        b = ((h.x - c.x) / f) * 0.015,
        x = ((h.z - c.z) / f) * 0.015,
        v = { ...g, x: g.x - b, z: g.z - x },
        y = { ...g, x: g.x + b, z: g.z + x };
      for (let M of [-1, 1])
        for (let S of [1, 2]) {
          let [w, z] = Em[S],
            [_, R] = Em[S + 1],
            T = _ - w,
            E = R - z,
            A = Math.hypot(T, E),
            C = E / A,
            P = -T / A,
            I = 0.004,
            L = (F, N, B) => a(F, (N + C * I) * M, B + P * I);
          Aw(
            d,
            L(v, w, z),
            L(y, w, z),
            L(y, _, R),
            L(v, _, R),
            [g.rx * C * M, P, g.rz * C * M],
            RJ,
          );
        }
      Aw(
        d,
        a(v, -u[0], u[1] + 0.004),
        a(y, -u[0], u[1] + 0.004),
        a(y, u[0], u[1] + 0.004),
        a(v, u[0], u[1] + 0.004),
        [0, 1, 0],
        RJ,
      );
    }
    if (((r += f), s)) {
      let p = h.x - c.x,
        m = h.z - c.z;
      s.push({
        t: "obb",
        x: (c.x + h.x) / 2,
        z: (c.z + h.z) / 2,
        hx: 0.25,
        hz: f / 2 + 0.05,
        c: m / f,
        s: p / f,
        y0: Math.min(c.y, h.y) - 0.5,
        y1: Math.max(c.y, h.y) + 1.2,
        rail: !0,
      });
    }
  }
}
var gp = [0.62, 0.1, 0.035, 0],
  Ru = [0.45, 0.07, 0.025, 0],
  kx = [0.46, 0.49, 0.51, 0],
  bp = [0.32, 0.34, 0.36, 0],
  vxt = [0.62, 0.1, 0.035, 0.4],
  Rw = [0.6, 0.095, 0.034, 0.8],
  TJ = [0.45, 0.07, 0.025, 0.8],
  yxt = [0.5, 0.49, 0.46, 0],
  AJ = [0.5, 0.49, 0.46, 0],
  wxt = [0.36, 0.35, 0.33, 0],
  RJ = [0.16, 0.16, 0.16, 0],
  Mxt = [0.11, 0.11, 0.115, 0],
  _o = [0.42, 0.41, 0.39, 0],
  Jl = [0.31, 0.3, 0.29, 0],
  Tm = [0.22, 0.22, 0.21, 0],
  Sxt = [0.07, 0.07, 0.075, 0],
  kxt = (i, t, e, s, n = 1e9) => `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let p = wp.xz - vec2f(${i.toFixed(3)}, ${t.toFixed(3)});
  let s = dot(p, vec2f(${e.toFixed(6)}, ${s.toFixed(6)})); let v = dot(p, vec2f(${(-s).toFixed(6)}, ${e.toFixed(6)}));
  let ds = (fract((s - 30.0) / 16.0 + 0.5) - 0.5) * 16.0;
  let dv = min(abs(v - 4.5), abs(v + 4.5));
  let pool = exp(-ds * ds / 28.0 - dv * dv / 14.0) + 0.35 * exp(-ds * ds / 90.0 - dv * dv / 40.0);
  let lit = select(1.0, 1.0 - smoothstep(${(n - 8).toFixed(1)}, ${(n + 4).toFixed(1)}, s), col.a > 0.25);   // (the lower deck's underside: its lamps over the approach only)
  let n = fract(sin(dot(floor(wp.xz * 0.5), vec2f(12.9898, 78.233))) * 43758.5453);
  let c = col.rgb * (0.94 + 0.08 * n);
  gHE = c * vec3f(1.0, 0.86, 0.66) * bc.b * (0.008 + 0.11 * pool) * lit;
  gHK = vec4f(0.55, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
