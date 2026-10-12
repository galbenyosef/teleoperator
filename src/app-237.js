// app 237 — addscaledvector
// Lines 122500-122810 of readable/app.pretty.js (statement-aligned).
function A2t(i, t) {
  let e = $c(t),
    s = T2t(i, e),
    n = [],
    o = [],
    a = [],
    r = s.C.y + i.ryTop,
    l = Vc(oi, e).multiplyScalar(0.25 + e() * 0.3),
    c = i.excurrent ? r * i.excurrent : i.fork + 0.6,
    h = [],
    f = [];
  for (let m = 0; m <= 8; m++) {
    let g = m / 8,
      b = g * c;
    (h.push(
      Vs(
        l.x * g * g + (e() - 0.5) * 0.08 * g,
        b,
        l.z * g * g + (e() - 0.5) * 0.08 * g,
      ),
    ),
      f.push(
        i.r0 *
          (1 + 0.45 * Math.exp(-b / 0.35)) *
          (i.excurrent ? 1 - 0.8 * g : 1 - 0.3 * g),
      ));
  }
  n.push({ pts: h, rad: f, order: 0 });
  let u = (m) => jk(h, Math.min(1, m / c)),
    d = i.limbs;
  for (let m = 0; m < d; m++) {
    let g = m * 2.39996 + e() * 0.6,
      b = ((i.el[0] + e() * (i.el[1] - i.el[0])) * Math.PI) / 180,
      x;
    i.excurrent
      ? (x = i.fork + (m / d) * (c - i.fork) * 0.95 + e() * 0.5)
      : (x = i.fork - 0.3 + e() * 0.9);
    let v = u(x),
      y = Vs(Math.cos(g) * Math.cos(b), Math.sin(b), Math.sin(g) * Math.cos(b)),
      M = v.clone().addScaledVector(y, 3).sub(s.C).normalize(),
      S = s.C.clone().addScaledVector(M, s.R(M) * (0.62 + e() * 0.18)),
      w = S.distanceTo(v),
      z = v
        .clone()
        .lerp(S, 0.45)
        .addScaledVector(oi, i.rise * w * 0.18)
        .addScaledVector(y, w * 0.1),
      _ = MC(v, z, S, 6),
      R = f[Math.min(8, Math.round((x / c) * 8))] * (i.excurrent ? 0.55 : 0.72);
    n.push({
      pts: _,
      rad: _.map((E, A) => R * (1 - 0.72 * (A / 6))),
      order: 1,
    });
    let T = i.n2 + Math.floor(e() * 3);
    for (let E = 0; E < T; E++) {
      let A = 0.22 + 0.76 * (E / T) + e() * 0.05,
        C = jk(_, Math.min(1, A)),
        P = ZX(_, Math.min(0.99, A)),
        I = C.clone().sub(s.C);
      ((I.y *= 0.6), I.normalize());
      let L = P.clone()
          .multiplyScalar(0.6)
          .addScaledVector(Vc(P, e), 0.7)
          .addScaledVector(I, 0.8)
          .addScaledVector(oi, i.rise * 0.3)
          .normalize(),
        F = Math.max(
          0.4,
          (1.02 - s.rel(C)) * s.R(C.clone().sub(s.C).normalize()),
        ),
        N = Math.min(F + 0.6, 1.2 + e() * 2) * (i.excurrent ? 1.1 : 1),
        B = C.clone().addScaledVector(L, N),
        H = C.clone()
          .lerp(B, 0.5)
          .addScaledVector(
            oi,
            (i.rise - 0.6) * N * 0.15 - (i.hang || 0) * N * 0.25,
          ),
        O = MC(C, H, B, 3),
        D = R * (0.45 - 0.25 * A);
      (n.push({
        pts: O,
        rad: O.map((G, q) => D * (1 - 0.7 * (q / 3))),
        order: 2,
      }),
        e() >= (i.drop || 0) &&
          a.push({ c: B.clone(), r: i.clump * (0.8 + 0.4 * e()), out: I }),
        e() < 0.55 &&
          a.push({ c: jk(O, 0.5), r: i.clump * (0.55 + 0.3 * e()), out: I }));
      for (let G = 0; G < 2; G++) {
        let q = 0.3 + 0.35 * G + e() * 0.1,
          W = jk(O, q),
          V = ZX(O, Math.min(0.99, q)),
          Y = V.clone()
            .addScaledVector(Vc(V, e), 0.9)
            .addScaledVector(I, 0.5)
            .normalize();
        (i.flat && W.y > r - 0.4) ||
          o.push({
            p: W.clone().addScaledVector(Y, 0.2),
            d: Y,
            s: i.card[0] + e() * (i.card[1] - i.card[0]),
            cell: i.cells[Math.floor(e() * 2)],
            rel: s.rel(W),
          });
      }
    }
  }
  if (i.tiers) {
    let m = s.C.y - i.ryBot * 0.55,
      g = r - 0.6;
    for (let b of a) {
      {
        let y = b.c.clone().sub(s.C),
          M = y.length(),
          S = s.R(y.clone().normalize());
        M > S * 0.95 && b.c.copy(s.C).addScaledVector(y, (S * 0.95) / M);
      }
      let x = Math.round(((b.c.y - m) / (g - m)) * (i.tiers - 1)),
        v =
          m + (Math.max(0, Math.min(i.tiers - 1, x)) / (i.tiers - 1)) * (g - m);
      ((b.c.y += (v - b.c.y) * 0.65), (b.out.y *= 0.4), b.out.normalize());
    }
  }
  for (let m of a) {
    let g = i.per + Math.floor(e() * 3);
    for (let b = 0; b < g; b++) {
      let x = Vs(
        e() * 2 - 1,
        (e() * 2 - 1) * (i.clumpFlat || 0.8),
        e() * 2 - 1,
      );
      x.length() > 1 && x.normalize();
      let v = m.c
        .clone()
        .addScaledVector(x, m.r * 0.75)
        .addScaledVector(m.out, m.r * 0.25)
        .addScaledVector(oi, m.r * 0.15);
      if (e() < i.gap * 0.3) continue;
      let y = x
        .clone()
        .addScaledVector(m.out, 0.6)
        .addScaledVector(oi, 0.25)
        .normalize();
      o.push({
        p: v,
        d: y,
        s: i.card[0] + e() * (i.card[1] - i.card[0]),
        cell: i.cells[Math.floor(e() * 2)],
        rel: s.rel(v),
      });
    }
  }
  let p = {
    inner: [],
    clump: a.map((m) => ({
      p: m.c.clone().addScaledVector(m.out, m.r * 0.2),
      s: m.r * 2.3,
      cell: i.mass,
      out: m.out,
      rel: s.rel(m.c),
    })),
  };
  for (let m = 0; m < 6; m++) {
    let g = (m / 6) * Math.PI * 2 + e(),
      b = Vs(Math.cos(g), (e() - 0.5) * 0.6, Math.sin(g)).normalize(),
      x = s.C.clone()
        .addScaledVector(b, s.R(b) * 0.35)
        .addScaledVector(oi, -i.ryBot * 0.1);
    p.inner.push({
      p: x,
      s: Math.min(i.rx, i.ryTop) * 1.1,
      cell: 3,
      out: b,
      rel: 0.3,
    });
  }
  return { br: n, cards: o, masses: p, E: s };
}
function QX(i, t, e, s, n, { scale: o = 1, keep: a = 1, dark: r = 1 } = {}) {
  for (let l of t) {
    if (a < 1 && n() > a) continue;
    let c = l.s * o,
      h = l.out.clone();
    ((h.y *= 0.4), h.applyAxisAngle(oi, (n() - 0.5) * 0.9).normalize());
    let f = oi.clone().cross(h).normalize(),
      u = h.clone().cross(f).normalize(),
      d = l.cell % 2,
      p = l.cell >> 1,
      m = [];
    for (let g of [0, 1])
      for (let b of [-0.5, 0.5]) {
        let x = l.p
            .clone()
            .addScaledVector(f, b * c)
            .addScaledVector(u, (g - 0.5) * c * 0.9),
          v = x.clone().sub(e.C);
        ((v.y *= 1.3), v.normalize());
        let y = h
            .clone()
            .multiplyScalar(0.3)
            .addScaledVector(v, 0.7)
            .normalize(),
          M = e.rel(x),
          S =
            (0.35 + 0.65 * ul(0.1, 1, M)) *
            (0.75 + 0.25 * (0.5 + 0.5 * v.y)) *
            r *
            nK(e, s, x),
          w = sK(s, l.p);
        m.push(
          i.v(
            x,
            y,
            (d + 0.02 + 0.96 * (b + 0.5)) / 2,
            (p + 0.02 + 0.96 * (1 - g)) / 2,
            [
              S * w[0] * (s.massTint?.[0] ?? 1),
              S * w[1] * (s.massTint?.[1] ?? 1),
              S * w[2] * (s.massTint?.[2] ?? 1),
              0.2 + 0.5 * ul(0.5, 1, M),
            ],
          ),
        );
      }
    i.q(m[0], m[1], m[3], m[2]);
  }
}
var yC = (i, t, e, s = 0) => {
  let n =
    Math.sin(i * 12.9898 + t * 47.137 + e * 78.233 + s * 37.719) * 43758.5453;
  return n - Math.floor(n);
};
function sK(i, t) {
  let e = i.vary ?? 1,
    s = 1.6,
    n = Math.floor(t.x / s),
    o = Math.floor(t.y / s),
    a = Math.floor(t.z / s),
    r = yC(n, o, a, 1),
    l = yC(n, o, a, 2),
    c = yC(t.x, t.y, t.z, 3),
    h = 1 + e * (0.32 * (r - 0.5) + 0.12 * (c - 0.5)),
    f = e * (l - 0.45) * 0.5;
  return [h * (1 + 0.28 * f), h * (1 + 0.06 * f), h * (1 - 0.45 * f)];
}
function nK(i, t, e) {
  let s = i.C.y - t.ryBot,
    n = (e.y - s) / (t.ryBot + t.ryTop);
  return 0.7 + 0.3 * ul(-0.05, 0.62, n);
}
function R2t(i, t, e, s, n, { scale: o = 1, keep: a = 1 } = {}) {
  for (let r of t) {
    if (a < 1 && n() > a * (0.5 + 0.8 * ul(0.4, 0.95, r.rel))) continue;
    let l = r.s * o,
      c = r.p.clone().sub(e.C);
    ((c.y *= 0.7), c.normalize());
    let h = c
        .clone()
        .addScaledVector(Vc(c, n), 0.45 + 0.2 * n())
        .normalize(),
      f = oi
        .clone()
        .multiplyScalar(s.hang ? 1 : 0.7)
        .addScaledVector(r.d, s.hang ? 0.2 : 0.5);
    (f.addScaledVector(h, -f.dot(h)),
      f.lengthSq() < 1e-4 && (f = Vc(h, n)),
      f.normalize(),
      f.applyAxisAngle(h, (n() - 0.5) * 0.9));
    let u = f.clone().cross(h).normalize(),
      d = r.p.clone().addScaledVector(f, -l * 0.12),
      p = r.cell % 4,
      m = r.cell >> 2,
      g = n() < 0.5,
      b = (s.hang ? 0.05 : 0.18) * l,
      x = [
        [0, 0],
        [0.55, b * 0.25],
        [1, b],
      ],
      v = [],
      y = sK(s, r.p);
    for (let [M, S] of x)
      for (let w of [-0.5, 0.5]) {
        let z = d
            .clone()
            .addScaledVector(f, M * l)
            .addScaledVector(u, w * l * (0.85 + 0.15 * M))
            .addScaledVector(oi, -S),
          _ = z.clone().sub(e.C);
        ((_.y *= 1.3), _.normalize());
        let R = h
            .clone()
            .multiplyScalar(0.35)
            .addScaledVector(_, 0.65)
            .normalize(),
          T = e.rel(z),
          E =
            (0.3 + 0.7 * ul(0.25, 1.05, T)) *
            (0.7 + 0.3 * (0.5 + 0.5 * _.y)) *
            nK(e, s, z) *
            (0.7 + 0.3 * M),
          A = 0.25 + 0.75 * ul(0.5, 1, T),
          C = (p + 0.01 + 0.98 * (g ? 0.5 - w : w + 0.5)) / 4,
          P = (m + 0.995 - 0.985 * M) / 4;
        v.push(i.v(z, R, C, P, [E * y[0], E * y[1], E * y[2], A]));
      }
    (i.q(v[0], v[1], v[3], v[2]), i.q(v[2], v[3], v[5], v[4]));
  }
}
