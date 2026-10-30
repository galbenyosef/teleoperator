// app 289 — math
// Lines 141140-141382 of readable/app.pretty.js (statement-aligned).
es();
Ya();
Pn();
await Pb();
var SM = dt;
function Xi(o, t, e, s, n, i) {
  let a = new SM(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
    r = a.length();
  if (r < 1e-4) return;
  a.divideScalar(r);
  let l = Math.abs(a.y) > 0.95 ? new SM(1, 0, 0) : new SM(0, 1, 0),
    c = new SM().crossVectors(a, l).normalize(),
    h = new SM().crossVectors(c, a).normalize(),
    f = (p, m, g) => [
      p[0] + (c.x * m * s) / 2 + (h.x * g * n) / 2,
      p[1] + (c.y * m * s) / 2 + (h.y * g * n) / 2,
      p[2] + (c.z * m * s) / 2 + (h.z * g * n) / 2,
    ],
    u = [f(t, -1, -1), f(t, 1, -1), f(t, 1, 1), f(t, -1, 1)],
    d = [f(e, -1, -1), f(e, 1, -1), f(e, 1, 1), f(e, -1, 1)];
  for (let p = 0; p < 4; p++) {
    let m = (p + 1) % 4;
    o.quad(u[p], u[m], d[m], d[p], [0, 0], [s, 0], [s, r], [0, r], i);
  }
}
function Gn(o, t, e, s, n, i, a, r, l, c, h = !0) {
  r < 0 && i > 0.5 && a > 0.5 && uW(t, e, s, n, i, a);
  let f = -n,
    u = s,
    d = (m, g, b) => [t + s * i * m + f * a * g, b, e + n * i * m + u * a * g],
    p = (m, g, b, v) => o.quad(m, g, b, v, [0, 0], [1, 0], [1, 1], [0, 1], c);
  (p(d(-1, -1, r), d(1, -1, r), d(1, -1, l), d(-1, -1, l)),
    p(d(1, 1, r), d(-1, 1, r), d(-1, 1, l), d(1, 1, l)),
    p(d(1, -1, r), d(1, 1, r), d(1, 1, l), d(1, -1, l)),
    p(d(-1, 1, r), d(-1, -1, r), d(-1, -1, l), d(-1, 1, l)),
    p(d(-1, 1, l), d(1, 1, l), d(1, -1, l), d(-1, -1, l)),
    h && p(d(-1, -1, r), d(1, -1, r), d(1, 1, r), d(-1, 1, r)));
}
function hd(o, t, e, s, n, i, a, r = a, l = !0) {
  let c = (x, y, M) => [x.x - x.uz * y, x.y + M, x.z + x.ux * y],
    h = c(t, -s, -n),
    f = c(t, s, -n),
    u = c(e, -s, -n),
    d = c(e, s, -n),
    p = c(t, -s, -i),
    m = c(t, s, -i),
    g = c(e, -s, -i),
    b = c(e, s, -i),
    v = (x, y, M, S, w, _) => {
      let z = y[0] - x[0],
        A = y[2] - x[2],
        T = S[0] - x[0],
        E = S[2] - x[2];
      A * T - z * E > 0 == _ > 0
        ? o.quad(x, y, M, S, [0, 0], [1, 0], [1, 1], [0, 1], w, [0, _, 0])
        : o.quad(x, S, M, y, [0, 0], [1, 0], [1, 1], [0, 1], w, [0, _, 0]);
    };
  if ((v(h, u, d, f, a, 1), v(p, g, b, m, r, -1), l)) {
    let x = (S, w, _, z, A) => {
        let T = [A[0], 0, A[1]];
        o.quad(S, w, _, z, [0, 0], [1, 0], [1, 1], [0, 1], r, T);
      },
      y = [-t.uz, t.ux],
      M = [t.uz, -t.ux];
    (x(p, g, u, h, y), x(b, m, f, d, M));
  }
}
function kM(o, t, e, s, n, i, a) {
  let r = e[0] - t[0],
    l = e[1] - t[1],
    c = e[2] - t[2],
    h = n[0] - t[0],
    f = n[1] - t[1],
    u = n[2] - t[2],
    d = l * u - c * f,
    p = c * h - r * u,
    m = r * f - l * h;
  d * i[0] + p * i[1] + m * i[2] >= 0
    ? o.quad(t, e, s, n, [0, 0], [1, 0], [1, 1], [0, 1], a, i)
    : o.quad(t, n, s, e, [0, 0], [0, 1], [1, 1], [1, 0], a, i);
}
var p2 = [
  [0.25, 0],
  [0.25, 0.07],
  [0.12, 0.3],
  [0.12, 0.64],
  [0.17, 0.68],
  [0.17, 0.81],
];
function Vyt(o, t, e, s) {
  let n = e.length,
    i = e.map((l, c) => {
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
    let c = i[l],
      h = i[l + 1],
      f = Math.hypot(h.x - c.x, h.z - c.z);
    if (f < 0.05) continue;
    for (let p of [-1, 1])
      for (let m = 0; m + 1 < p2.length; m++) {
        let [g, b] = p2[m],
          [v, x] = p2[m + 1],
          y = v - g,
          M = x - b,
          S = Math.hypot(y, M),
          w = M / S,
          _ = -y / S,
          z = [((c.rx + h.rx) / 2) * w * p, _, ((c.rz + h.rz) / 2) * w * p];
        kM(
          o,
          a(c, g * p, b),
          a(h, g * p, b),
          a(h, v * p, x),
          a(c, v * p, x),
          z,
          m === 0 ? jyt : CQ,
        );
      }
    let u = p2[p2.length - 1];
    {
      let p = Math.min(0.8, (c.gap ?? 0.6) / 2 + 0.03),
        m = Math.min(0.8, (h.gap ?? 0.6) / 2 + 0.03);
      kM(
        o,
        a(c, -p, -0.004),
        a(h, -m, -0.004),
        a(h, m, -0.004),
        a(c, p, -0.004),
        [0, 1, 0],
        $yt,
      );
    }
    kM(
      o,
      a(c, -u[0], u[1]),
      a(h, -u[0], u[1]),
      a(h, u[0], u[1]),
      a(c, u[0], u[1]),
      [0, 1, 0],
      CQ,
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
        v = ((h.z - c.z) / f) * 0.015,
        x = { ...g, x: g.x - b, z: g.z - v },
        y = { ...g, x: g.x + b, z: g.z + v };
      for (let M of [-1, 1])
        for (let S of [1, 2]) {
          let [w, _] = p2[S],
            [z, A] = p2[S + 1],
            T = z - w,
            E = A - _,
            R = Math.hypot(T, E),
            P = E / R,
            C = -T / R,
            I = 0.004,
            L = (F, O, B) => a(F, (O + P * I) * M, B + C * I);
          kM(
            d,
            L(x, w, _),
            L(y, w, _),
            L(y, z, A),
            L(x, z, A),
            [g.rx * P * M, C, g.rz * P * M],
            LQ,
          );
        }
      kM(
        d,
        a(x, -u[0], u[1] + 0.004),
        a(y, -u[0], u[1] + 0.004),
        a(y, u[0], u[1] + 0.004),
        a(x, u[0], u[1] + 0.004),
        [0, 1, 0],
        LQ,
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
var Xp = [0.62, 0.1, 0.035, 0],
  fd = [0.45, 0.07, 0.025, 0],
  hv = [0.46, 0.49, 0.51, 0],
  Kp = [0.32, 0.34, 0.36, 0],
  Wyt = [0.62, 0.1, 0.035, 0.4],
  zM = [0.6, 0.095, 0.034, 0.8],
  PQ = [0.45, 0.07, 0.025, 0.8],
  qyt = [0.5, 0.49, 0.46, 0],
  CQ = [0.5, 0.49, 0.46, 0],
  jyt = [0.36, 0.35, 0.33, 0],
  LQ = [0.16, 0.16, 0.16, 0],
  $yt = [0.11, 0.11, 0.115, 0],
  Oo = [0.42, 0.41, 0.39, 0],
  yc = [0.31, 0.3, 0.29, 0],
  m2 = [0.22, 0.22, 0.21, 0],
  Xyt = [0.07, 0.07, 0.075, 0],
  Kyt = (o, t, e, s, n = 1e9) => `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let p = wp.xz - vec2f(${o.toFixed(3)}, ${t.toFixed(3)});
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
