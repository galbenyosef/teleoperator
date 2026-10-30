// app 236 — addscaledvector
// Lines 122756-123066 of readable/app.pretty.js (statement-aligned).
function Qxt(o, t) {
  let e = Sh(t),
    s = Zxt(o, e),
    n = [],
    i = [],
    a = [],
    r = s.C.y + o.ryTop,
    l = Mh(hi, e).multiplyScalar(0.25 + e() * 0.3),
    c = o.excurrent ? r * o.excurrent : o.fork + 0.6,
    h = [],
    f = [];
  for (let m = 0; m <= 8; m++) {
    let g = m / 8,
      b = g * c;
    (h.push(
      Js(
        l.x * g * g + (e() - 0.5) * 0.08 * g,
        b,
        l.z * g * g + (e() - 0.5) * 0.08 * g,
      ),
    ),
      f.push(
        o.r0 *
          (1 + 0.45 * Math.exp(-b / 0.35)) *
          (o.excurrent ? 1 - 0.8 * g : 1 - 0.3 * g),
      ));
  }
  n.push({ pts: h, rad: f, order: 0 });
  let u = (m) => qz(h, Math.min(1, m / c)),
    d = o.limbs;
  for (let m = 0; m < d; m++) {
    let g = m * 2.39996 + e() * 0.6,
      b = ((o.el[0] + e() * (o.el[1] - o.el[0])) * Math.PI) / 180,
      v;
    o.excurrent
      ? (v = o.fork + (m / d) * (c - o.fork) * 0.95 + e() * 0.5)
      : (v = o.fork - 0.3 + e() * 0.9);
    let x = u(v),
      y = Js(Math.cos(g) * Math.cos(b), Math.sin(b), Math.sin(g) * Math.cos(b)),
      M = x.clone().addScaledVector(y, 3).sub(s.C).normalize(),
      S = s.C.clone().addScaledVector(M, s.R(M) * (0.62 + e() * 0.18)),
      w = S.distanceTo(x),
      _ = x
        .clone()
        .lerp(S, 0.45)
        .addScaledVector(hi, o.rise * w * 0.18)
        .addScaledVector(y, w * 0.1),
      z = ZL(x, _, S, 6),
      A = f[Math.min(8, Math.round((v / c) * 8))] * (o.excurrent ? 0.55 : 0.72);
    n.push({
      pts: z,
      rad: z.map((E, R) => A * (1 - 0.72 * (R / 6))),
      order: 1,
    });
    let T = o.n2 + Math.floor(e() * 3);
    for (let E = 0; E < T; E++) {
      let R = 0.22 + 0.76 * (E / T) + e() * 0.05,
        P = qz(z, Math.min(1, R)),
        C = eJ(z, Math.min(0.99, R)),
        I = P.clone().sub(s.C);
      ((I.y *= 0.6), I.normalize());
      let L = C.clone()
          .multiplyScalar(0.6)
          .addScaledVector(Mh(C, e), 0.7)
          .addScaledVector(I, 0.8)
          .addScaledVector(hi, o.rise * 0.3)
          .normalize(),
        F = Math.max(
          0.4,
          (1.02 - s.rel(P)) * s.R(P.clone().sub(s.C).normalize()),
        ),
        O = Math.min(F + 0.6, 1.2 + e() * 2) * (o.excurrent ? 1.1 : 1),
        B = P.clone().addScaledVector(L, O),
        H = P.clone()
          .lerp(B, 0.5)
          .addScaledVector(
            hi,
            (o.rise - 0.6) * O * 0.15 - (o.hang || 0) * O * 0.25,
          ),
        N = ZL(P, H, B, 3),
        D = A * (0.45 - 0.25 * R);
      (n.push({
        pts: N,
        rad: N.map((G, W) => D * (1 - 0.7 * (W / 3))),
        order: 2,
      }),
        e() >= (o.drop || 0) &&
          a.push({ c: B.clone(), r: o.clump * (0.8 + 0.4 * e()), out: I }),
        e() < 0.55 &&
          a.push({ c: qz(N, 0.5), r: o.clump * (0.55 + 0.3 * e()), out: I }));
      for (let G = 0; G < 2; G++) {
        let W = 0.3 + 0.35 * G + e() * 0.1,
          V = qz(N, W),
          $ = eJ(N, Math.min(0.99, W)),
          J = $.clone()
            .addScaledVector(Mh($, e), 0.9)
            .addScaledVector(I, 0.5)
            .normalize();
        (o.flat && V.y > r - 0.4) ||
          i.push({
            p: V.clone().addScaledVector(J, 0.2),
            d: J,
            s: o.card[0] + e() * (o.card[1] - o.card[0]),
            cell: o.cells[Math.floor(e() * 2)],
            rel: s.rel(V),
          });
      }
    }
  }
  if (o.tiers) {
    let m = s.C.y - o.ryBot * 0.55,
      g = r - 0.6;
    for (let b of a) {
      {
        let y = b.c.clone().sub(s.C),
          M = y.length(),
          S = s.R(y.clone().normalize());
        M > S * 0.95 && b.c.copy(s.C).addScaledVector(y, (S * 0.95) / M);
      }
      let v = Math.round(((b.c.y - m) / (g - m)) * (o.tiers - 1)),
        x =
          m + (Math.max(0, Math.min(o.tiers - 1, v)) / (o.tiers - 1)) * (g - m);
      ((b.c.y += (x - b.c.y) * 0.65), (b.out.y *= 0.4), b.out.normalize());
    }
  }
  for (let m of a) {
    let g = o.per + Math.floor(e() * 3);
    for (let b = 0; b < g; b++) {
      let v = Js(
        e() * 2 - 1,
        (e() * 2 - 1) * (o.clumpFlat || 0.8),
        e() * 2 - 1,
      );
      v.length() > 1 && v.normalize();
      let x = m.c
        .clone()
        .addScaledVector(v, m.r * 0.75)
        .addScaledVector(m.out, m.r * 0.25)
        .addScaledVector(hi, m.r * 0.15);
      if (e() < o.gap * 0.3) continue;
      let y = v
        .clone()
        .addScaledVector(m.out, 0.6)
        .addScaledVector(hi, 0.25)
        .normalize();
      i.push({
        p: x,
        d: y,
        s: o.card[0] + e() * (o.card[1] - o.card[0]),
        cell: o.cells[Math.floor(e() * 2)],
        rel: s.rel(x),
      });
    }
  }
  let p = {
    inner: [],
    clump: a.map((m) => ({
      p: m.c.clone().addScaledVector(m.out, m.r * 0.2),
      s: m.r * 2.3,
      cell: o.mass,
      out: m.out,
      rel: s.rel(m.c),
    })),
  };
  for (let m = 0; m < 6; m++) {
    let g = (m / 6) * Math.PI * 2 + e(),
      b = Js(Math.cos(g), (e() - 0.5) * 0.6, Math.sin(g)).normalize(),
      v = s.C.clone()
        .addScaledVector(b, s.R(b) * 0.35)
        .addScaledVector(hi, -o.ryBot * 0.1);
    p.inner.push({
      p: v,
      s: Math.min(o.rx, o.ryTop) * 1.1,
      cell: 3,
      out: b,
      rel: 0.3,
    });
  }
  return { br: n, cards: i, masses: p, E: s };
}
function sJ(o, t, e, s, n, { scale: i = 1, keep: a = 1, dark: r = 1 } = {}) {
  for (let l of t) {
    if (a < 1 && n() > a) continue;
    let c = l.s * i,
      h = l.out.clone();
    ((h.y *= 0.4), h.applyAxisAngle(hi, (n() - 0.5) * 0.9).normalize());
    let f = hi.clone().cross(h).normalize(),
      u = h.clone().cross(f).normalize(),
      d = l.cell % 2,
      p = l.cell >> 1,
      m = [];
    for (let g of [0, 1])
      for (let b of [-0.5, 0.5]) {
        let v = l.p
            .clone()
            .addScaledVector(f, b * c)
            .addScaledVector(u, (g - 0.5) * c * 0.9),
          x = v.clone().sub(e.C);
        ((x.y *= 1.3), x.normalize());
        let y = h
            .clone()
            .multiplyScalar(0.3)
            .addScaledVector(x, 0.7)
            .normalize(),
          M = e.rel(v),
          S =
            (0.35 + 0.65 * Il(0.1, 1, M)) *
            (0.75 + 0.25 * (0.5 + 0.5 * x.y)) *
            r *
            aJ(e, s, v),
          w = oJ(s, l.p);
        m.push(
          o.v(
            v,
            y,
            (d + 0.02 + 0.96 * (b + 0.5)) / 2,
            (p + 0.02 + 0.96 * (1 - g)) / 2,
            [
              S * w[0] * (s.massTint?.[0] ?? 1),
              S * w[1] * (s.massTint?.[1] ?? 1),
              S * w[2] * (s.massTint?.[2] ?? 1),
              0.2 + 0.5 * Il(0.5, 1, M),
            ],
          ),
        );
      }
    o.q(m[0], m[1], m[3], m[2]);
  }
}
var YL = (o, t, e, s = 0) => {
  let n =
    Math.sin(o * 12.9898 + t * 47.137 + e * 78.233 + s * 37.719) * 43758.5453;
  return n - Math.floor(n);
};
function oJ(o, t) {
  let e = o.vary ?? 1,
    s = 1.6,
    n = Math.floor(t.x / s),
    i = Math.floor(t.y / s),
    a = Math.floor(t.z / s),
    r = YL(n, i, a, 1),
    l = YL(n, i, a, 2),
    c = YL(t.x, t.y, t.z, 3),
    h = 1 + e * (0.32 * (r - 0.5) + 0.12 * (c - 0.5)),
    f = e * (l - 0.45) * 0.5;
  return [h * (1 + 0.28 * f), h * (1 + 0.06 * f), h * (1 - 0.45 * f)];
}
function aJ(o, t, e) {
  let s = o.C.y - t.ryBot,
    n = (e.y - s) / (t.ryBot + t.ryTop);
  return 0.7 + 0.3 * Il(-0.05, 0.62, n);
}
function tvt(o, t, e, s, n, { scale: i = 1, keep: a = 1 } = {}) {
  for (let r of t) {
    if (a < 1 && n() > a * (0.5 + 0.8 * Il(0.4, 0.95, r.rel))) continue;
    let l = r.s * i,
      c = r.p.clone().sub(e.C);
    ((c.y *= 0.7), c.normalize());
    let h = c
        .clone()
        .addScaledVector(Mh(c, n), 0.45 + 0.2 * n())
        .normalize(),
      f = hi
        .clone()
        .multiplyScalar(s.hang ? 1 : 0.7)
        .addScaledVector(r.d, s.hang ? 0.2 : 0.5);
    (f.addScaledVector(h, -f.dot(h)),
      f.lengthSq() < 1e-4 && (f = Mh(h, n)),
      f.normalize(),
      f.applyAxisAngle(h, (n() - 0.5) * 0.9));
    let u = f.clone().cross(h).normalize(),
      d = r.p.clone().addScaledVector(f, -l * 0.12),
      p = r.cell % 4,
      m = r.cell >> 2,
      g = n() < 0.5,
      b = (s.hang ? 0.05 : 0.18) * l,
      v = [
        [0, 0],
        [0.55, b * 0.25],
        [1, b],
      ],
      x = [],
      y = oJ(s, r.p);
    for (let [M, S] of v)
      for (let w of [-0.5, 0.5]) {
        let _ = d
            .clone()
            .addScaledVector(f, M * l)
            .addScaledVector(u, w * l * (0.85 + 0.15 * M))
            .addScaledVector(hi, -S),
          z = _.clone().sub(e.C);
        ((z.y *= 1.3), z.normalize());
        let A = h
            .clone()
            .multiplyScalar(0.35)
            .addScaledVector(z, 0.65)
            .normalize(),
          T = e.rel(_),
          E =
            (0.3 + 0.7 * Il(0.25, 1.05, T)) *
            (0.7 + 0.3 * (0.5 + 0.5 * z.y)) *
            aJ(e, s, _) *
            (0.7 + 0.3 * M),
          R = 0.25 + 0.75 * Il(0.5, 1, T),
          P = (p + 0.01 + 0.98 * (g ? 0.5 - w : w + 0.5)) / 4,
          C = (m + 0.995 - 0.985 * M) / 4;
        x.push(o.v(_, A, P, C, [E * y[0], E * y[1], E * y[2], R]));
      }
    (o.q(x[0], x[1], x[3], x[2]), o.q(x[2], x[3], x[5], x[4]));
  }
}
