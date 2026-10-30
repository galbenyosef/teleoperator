// app 193 — math
// Lines 108820-109150 of readable/app.pretty.js (statement-aligned).
function _gt(o, t) {
  let { L: e } = t,
    s = -9,
    n = 99,
    i = 9.6,
    a = (f, u) => [
      Yu.o[0] + Yu.n[0] * f + Yu.e[0] * u,
      Yu.o[1] + Yu.n[1] * f + Yu.e[1] * u,
    ],
    r = (f, u) => Math.max(e.terrainAt(f, u) + 0.4, e.driveHeight(f, u) + 0.24),
    l = We(we.granite, 0.42, 0.41, 0.4),
    c = Lt(Ct.metal, 0.55, 0.55, 0.56),
    h = Lt(Ct.stone, 0.03, 0.03, 0.03);
  for (let f = s; f < n; f += 1.5)
    for (let u = -i; u < i; u += 1.6) {
      let d = f,
        p = Math.min(n, f + 1.5),
        m = u,
        g = Math.min(i, u + 1.6),
        b = (m + g) / 2;
      if (Math.hypot((d + p) / 2, b) < 4) continue;
      {
        let M = a((d + p) / 2, b);
        if (e.surfaceAt(M[0], M[1]) !== "lot") continue;
      }
      let v = Math.abs(b) < 1.6,
        x = Math.abs(b) > i - 1.7 || Math.floor(d / 1.5) % 6 === 0,
        y = [a(d, m), a(p, m), a(p, g), a(d, g)].map(([M, S]) => [
          M,
          r(M, S),
          S,
        ]);
      oe(o, y, v ? l : x ? Op : xK, [0, 1, 0], (M) => [M[0] * 3, M[2] * 3]);
    }
  for (let f of [-0.54, 0, 0.54])
    for (let u = 4.4; u < n - 0.1; u += 3) {
      let d = a(u, f),
        p = a(Math.min(n, u + 3), f);
      if (f === 0) {
        Ce(
          o,
          [d[0], r(...d) + 0.005, d[1]],
          [p[0], r(...p) + 0.005, p[1]],
          0.02,
          h,
          3,
        );
        continue;
      }
      (Ce(
        o,
        [d[0], r(...d) + 0.004, d[1]],
        [p[0], r(...p) + 0.004, p[1]],
        0.06,
        h,
        3,
      ),
        Ce(
          o,
          [d[0], r(...d) + 0.012, d[1]],
          [p[0], r(...p) + 0.012, p[1]],
          0.028,
          c,
          4,
        ));
    }
  for (let f of [-6.5, -3.5, 3.5, 6.5]) {
    let u = a(5, f);
    (Ce(o, [u[0], r(...u), u[1]], [u[0], r(...u) + 0.9, u[1]], 0.11, gK, 8, !0),
      t.colliders.push({ t: "circ", x: u[0], z: u[1], r: 0.3 }));
  }
}
var rL = We(we.grace, 0.78, 0.76, 0.72),
  Egt = Lt(Ct.stone, 0.42, 0.41, 0.39),
  Tgt = Lt(Ct.leaf, 0.12, 0.24, 0.1),
  Rgt = [
    { a: [-397.5, 99], b: [-369.5, 95] },
    { a: [-295.2, 76], b: [-261, 71] },
  ];
function Agt(o, t) {
  let { L: e } = t;
  for (let s of Rgt) {
    let n = s.b[0] - s.a[0],
      i = s.b[1] - s.a[1],
      a = Math.hypot(n, i),
      r = [n / a, i / a],
      l = [-r[1], r[0]],
      c = [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2],
      h = e.driveHeight(c[0], c[1]) + 7.6,
      f = 2.6;
    ba(o, c, r, l, a / 2 + 0.6, f, h - 0.9, h, rL, { bottom: !0, topCol: Op });
    for (let u of [-1, 1]) {
      let d = [c[0] + l[0] * u * (f - 0.15), c[1] + l[1] * u * (f - 0.15)];
      ba(o, d, r, l, a / 2 + 0.6, 0.15, h, h + 1.15, rL);
      for (let p = -a / 2 + 2; p < a / 2 - 1.5; p += 4.2) {
        let m = [
          d[0] + r[0] * p - l[0] * u * 0.55,
          d[1] + r[1] * p - l[1] * u * 0.55,
        ];
        (ba(o, m, r, l, 1.6, 0.4, h, h + 0.75, rL),
          ba(o, m, r, l, 1.5, 0.36, h + 0.75, h + 1.35, Tgt));
      }
    }
    for (let u = -a / 2 + 3; u < a / 2 - 2; u += 6) {
      let d = [c[0] + r[0] * u, c[1] + r[1] * u];
      ba(o, d, r, l, 0.4, 0.4, h - 1, h - 0.9, wn(0.95, 0.85, 0.6), {
        top: !1,
        bottom: !0,
      });
    }
    ba(o, c, r, l, a / 2 + 0.6, f + 0.05, h - 0.35, h - 0.2, Egt);
  }
}
function Pgt(o, t, e) {
  let { L: s } = t,
    [n, i] = ao.c,
    a = 0,
    r = 0;
  for (let y = 0; y < 16; y++) {
    let M = (y / 16) * Math.PI * 2,
      S = n + Math.cos(M) * 8,
      w = i + Math.sin(M) * 8;
    s.surfaceAt(S, w) === "road" && ((a += s.driveHeight(S, w)), r++);
  }
  a = r ? a / r : s.terrainAt(n, i);
  let l = (y, M) => Math.max(a + 0.03, s.terrainAt(y, M) + 0.3),
    c = Lt(Ct.stone, 0.15, 0.15, 0.155),
    h = Lt(Ct.matte, 0.8, 0.8, 0.76),
    f = We(we.granite, 0.55, 0.52, 0.48),
    u = 64,
    d = [ao.r0, 7, 9.5, 12.5, 15.5, ao.r1];
  for (let y = 0; y < u; y++) {
    let M = (y / u) * Math.PI * 2,
      S = ((y + 1) / u) * Math.PI * 2;
    for (let T = 0; T + 1 < d.length; T++) {
      let E = d[T],
        R = d[T + 1],
        P = (C, I) => {
          let L = n + Math.cos(I) * C,
            F = i + Math.sin(I) * C;
          return [L, l(L, F), F];
        };
      oe(o, [P(E, M), P(R, M), P(R, S), P(E, S)], c, [0, 1, 0], (C) => [
        C[0],
        C[2],
      ]);
    }
    let w = [n + Math.cos(M) * ao.r1, i + Math.sin(M) * ao.r1],
      _ = [n + Math.cos(S) * ao.r1, i + Math.sin(S) * ao.r1],
      z = Math.min(l(...w), s.terrainAt(...w)) - 0.6,
      A = Math.min(l(..._), s.terrainAt(..._)) - 0.6;
    (oe(
      o,
      [
        [w[0], z, w[1]],
        [_[0], A, _[1]],
        [_[0], l(..._) + 0.45, _[1]],
        [w[0], l(...w) + 0.45, w[1]],
      ],
      f,
      [Math.cos((M + S) / 2), 0, Math.sin((M + S) / 2)],
      (T) => [T[0] + T[2], T[1]],
    ),
      oe(
        o,
        [
          [w[0], l(...w) + 0.45, w[1]],
          [_[0], l(..._) + 0.45, _[1]],
          [
            n + Math.cos(S) * (ao.r1 - 0.4),
            l(..._) + 0.45,
            i + Math.sin(S) * (ao.r1 - 0.4),
          ],
          [
            n + Math.cos(M) * (ao.r1 - 0.4),
            l(...w) + 0.45,
            i + Math.sin(M) * (ao.r1 - 0.4),
          ],
        ],
        f,
        [0, 1, 0],
      ),
      oe(
        o,
        [
          [
            n + Math.cos(M) * (ao.r1 - 0.4),
            l(...w) + 0.45,
            i + Math.sin(M) * (ao.r1 - 0.4),
          ],
          [
            n + Math.cos(S) * (ao.r1 - 0.4),
            l(..._) + 0.45,
            i + Math.sin(S) * (ao.r1 - 0.4),
          ],
          [
            n + Math.cos(S) * (ao.r1 - 0.4),
            l(..._),
            i + Math.sin(S) * (ao.r1 - 0.4),
          ],
          [
            n + Math.cos(M) * (ao.r1 - 0.4),
            l(...w),
            i + Math.sin(M) * (ao.r1 - 0.4),
          ],
        ],
        f,
        [-Math.cos(M), 0, -Math.sin(M)],
      ));
  }
  let p = [];
  {
    let y = {},
      M = null;
    for (let S of t.D.edges)
      if (S.name === "Telegraph Hill Boulevard")
        for (let w = S.s0; w < S.s1; w += 2) {
          let _ = Ot(S, w, y),
            z = Math.hypot(_.x - n, _.z - i);
          z > ao.r1 - 1 &&
            z < ao.r1 + 4 &&
            ((M = Math.atan2(_.z - i, _.x - n)), p.push(M));
        }
  }
  p.push(Math.atan2(-760.5 - i, -1085.5 - n));
  let m = (y) =>
      p.some(
        (M) => Math.abs(Math.atan2(Math.sin(y - M), Math.cos(y - M))) < 0.32,
      ),
    g = 13,
    b = Math.floor((2 * Math.PI * g) / 2.75),
    v = 7,
    x = () => (v = (v * 16807) % 2147483647) / 2147483647;
  for (let y = 0; y < b; y++) {
    let M = (y / b) * Math.PI * 2,
      S = ((y + 0.5) / b) * Math.PI * 2;
    if (m(S)) continue;
    let w = Math.cos(M),
      _ = Math.sin(M),
      z = n + w * g,
      A = i + _ * g,
      T = n + w * (ao.r1 - 0.6),
      E = i + _ * (ao.r1 - 0.6);
    if (
      (ba(
        o,
        [(z + T) / 2, (A + E) / 2],
        [w, _],
        [-_, w],
        (ao.r1 - 0.6 - g) / 2,
        0.06,
        l((z + T) / 2, (A + E) / 2) + 0.005,
        l((z + T) / 2, (A + E) / 2) + 0.012,
        h,
        { top: !0 },
      ),
      x() < 0.78)
    ) {
      let P = n + Math.cos(S) * 15.9,
        C = i + Math.sin(S) * 15.9;
      (e.inst.push({
        kind: "car",
        x: P,
        y: l(P, C),
        z: C,
        rot: Math.atan2(Math.cos(S), Math.sin(S)) + (x() < 0.3 ? Math.PI : 0),
        color: x(),
        type: [0, 0, 1, 2, 3][Math.floor(x() * 5)],
      }),
        t.colliders.push({
          t: "obb",
          x: P,
          z: C,
          hx: 0.95,
          hz: 2.3,
          c: Math.sin(S),
          s: Math.cos(S),
          y0: l(P, C) - 1,
          y1: l(P, C) + 1.5,
        }));
    }
  }
  for (let y = 0; y < 40; y++) {
    let M = (y / 40) * Math.PI * 2;
    if (y % 2) continue;
    let S = Math.cos(M),
      w = Math.sin(M),
      _ = n + S * 10.8,
      z = i + w * 10.8;
    ba(
      o,
      [_, z],
      [-w, S],
      [S, w],
      0.7,
      0.07,
      l(_, z) + 0.005,
      l(_, z) + 0.012,
      h,
    );
  }
  for (let y = 0; y < 24; y++) {
    let M = ((y + 0.5) / 24) * Math.PI * 2;
    m(M) ||
      t.colliders.push({
        t: "circ",
        x: n + Math.cos(M) * (ao.r1 + 0.3),
        z: i + Math.sin(M) * (ao.r1 + 0.3),
        r: 2.4,
      });
  }
}
var Cgt = [
  {
    name: "Maiden Lane",
    v: [1.15],
    step: 4.2,
    umb: [Lt(Ct.matte, 0.92, 0.75, 0.12), Lt(Ct.matte, 0.9, 0.89, 0.85)],
    x0: -1150,
    x1: -1040,
  },
  {
    name: "Belden Place",
    v: [-1.1, 1.1],
    step: 3.6,
    umb: [Lt(Ct.matte, 0.62, 0.08, 0.06), Lt(Ct.matte, 0.1, 0.3, 0.16)],
    lights: !0,
    x0: -1e9,
    x1: 1e9,
  },
];
