// app 194 — math
// Lines 108564-108894 of readable/app.pretty.js (statement-aligned).
function s1t(i, t) {
  let { L: e } = t,
    s = -9,
    n = 99,
    o = 9.6,
    a = (f, u) => [
      mu.o[0] + mu.n[0] * f + mu.e[0] * u,
      mu.o[1] + mu.n[1] * f + mu.e[1] * u,
    ],
    r = (f, u) => Math.max(e.terrainAt(f, u) + 0.4, e.driveHeight(f, u) + 0.24),
    l = Be(be.granite, 0.42, 0.41, 0.4),
    c = It(Lt.metal, 0.55, 0.55, 0.56),
    h = It(Lt.stone, 0.03, 0.03, 0.03);
  for (let f = s; f < n; f += 1.5)
    for (let u = -o; u < o; u += 1.6) {
      let d = f,
        p = Math.min(n, f + 1.5),
        m = u,
        g = Math.min(o, u + 1.6),
        b = (m + g) / 2;
      if (Math.hypot((d + p) / 2, b) < 4) continue;
      {
        let M = a((d + p) / 2, b);
        if (e.surfaceAt(M[0], M[1]) !== "lot") continue;
      }
      let x = Math.abs(b) < 1.6,
        v = Math.abs(b) > o - 1.7 || Math.floor(d / 1.5) % 6 === 0,
        y = [a(d, m), a(p, m), a(p, g), a(d, g)].map(([M, S]) => [
          M,
          r(M, S),
          S,
        ]);
      ne(i, y, x ? l : v ? ip : m$, [0, 1, 0], (M) => [M[0] * 3, M[2] * 3]);
    }
  for (let f of [-0.54, 0, 0.54])
    for (let u = 4.4; u < n - 0.1; u += 3) {
      let d = a(u, f),
        p = a(Math.min(n, u + 3), f);
      if (f === 0) {
        Ae(
          i,
          [d[0], r(...d) + 0.005, d[1]],
          [p[0], r(...p) + 0.005, p[1]],
          0.02,
          h,
          3,
        );
        continue;
      }
      (Ae(
        i,
        [d[0], r(...d) + 0.004, d[1]],
        [p[0], r(...p) + 0.004, p[1]],
        0.06,
        h,
        3,
      ),
        Ae(
          i,
          [d[0], r(...d) + 0.012, d[1]],
          [p[0], r(...p) + 0.012, p[1]],
          0.028,
          c,
          4,
        ));
    }
  for (let f of [-6.5, -3.5, 3.5, 6.5]) {
    let u = a(5, f);
    (Ae(i, [u[0], r(...u), u[1]], [u[0], r(...u) + 0.9, u[1]], 0.11, d$, 8, !0),
      t.colliders.push({ t: "circ", x: u[0], z: u[1], r: 0.3 }));
  }
}
var PP = Be(be.grace, 0.78, 0.76, 0.72),
  n1t = It(Lt.stone, 0.42, 0.41, 0.39),
  i1t = It(Lt.leaf, 0.12, 0.24, 0.1),
  o1t = [
    { a: [-397.5, 99], b: [-369.5, 95] },
    { a: [-295.2, 76], b: [-261, 71] },
  ];
function a1t(i, t) {
  let { L: e } = t;
  for (let s of o1t) {
    let n = s.b[0] - s.a[0],
      o = s.b[1] - s.a[1],
      a = Math.hypot(n, o),
      r = [n / a, o / a],
      l = [-r[1], r[0]],
      c = [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2],
      h = e.driveHeight(c[0], c[1]) + 7.6,
      f = 2.6;
    ra(i, c, r, l, a / 2 + 0.6, f, h - 0.9, h, PP, { bottom: !0, topCol: ip });
    for (let u of [-1, 1]) {
      let d = [c[0] + l[0] * u * (f - 0.15), c[1] + l[1] * u * (f - 0.15)];
      ra(i, d, r, l, a / 2 + 0.6, 0.15, h, h + 1.15, PP);
      for (let p = -a / 2 + 2; p < a / 2 - 1.5; p += 4.2) {
        let m = [
          d[0] + r[0] * p - l[0] * u * 0.55,
          d[1] + r[1] * p - l[1] * u * 0.55,
        ];
        (ra(i, m, r, l, 1.6, 0.4, h, h + 0.75, PP),
          ra(i, m, r, l, 1.5, 0.36, h + 0.75, h + 1.35, i1t));
      }
    }
    for (let u = -a / 2 + 3; u < a / 2 - 2; u += 6) {
      let d = [c[0] + r[0] * u, c[1] + r[1] * u];
      ra(i, d, r, l, 0.4, 0.4, h - 1, h - 0.9, bn(0.95, 0.85, 0.6), {
        top: !1,
        bottom: !0,
      });
    }
    ra(i, c, r, l, a / 2 + 0.6, f + 0.05, h - 0.35, h - 0.2, n1t);
  }
}
function r1t(i, t, e) {
  let { L: s } = t,
    [n, o] = Ji.c,
    a = 0,
    r = 0;
  for (let y = 0; y < 16; y++) {
    let M = (y / 16) * Math.PI * 2,
      S = n + Math.cos(M) * 8,
      w = o + Math.sin(M) * 8;
    s.surfaceAt(S, w) === "road" && ((a += s.driveHeight(S, w)), r++);
  }
  a = r ? a / r : s.terrainAt(n, o);
  let l = (y, M) => Math.max(a + 0.03, s.terrainAt(y, M) + 0.3),
    c = It(Lt.stone, 0.15, 0.15, 0.155),
    h = It(Lt.matte, 0.8, 0.8, 0.76),
    f = Be(be.granite, 0.55, 0.52, 0.48),
    u = 64,
    d = [Ji.r0, 7, 9.5, 12.5, 15.5, Ji.r1];
  for (let y = 0; y < u; y++) {
    let M = (y / u) * Math.PI * 2,
      S = ((y + 1) / u) * Math.PI * 2;
    for (let T = 0; T + 1 < d.length; T++) {
      let E = d[T],
        A = d[T + 1],
        C = (P, I) => {
          let L = n + Math.cos(I) * P,
            F = o + Math.sin(I) * P;
          return [L, l(L, F), F];
        };
      ne(i, [C(E, M), C(A, M), C(A, S), C(E, S)], c, [0, 1, 0], (P) => [
        P[0],
        P[2],
      ]);
    }
    let w = [n + Math.cos(M) * Ji.r1, o + Math.sin(M) * Ji.r1],
      z = [n + Math.cos(S) * Ji.r1, o + Math.sin(S) * Ji.r1],
      _ = Math.min(l(...w), s.terrainAt(...w)) - 0.6,
      R = Math.min(l(...z), s.terrainAt(...z)) - 0.6;
    (ne(
      i,
      [
        [w[0], _, w[1]],
        [z[0], R, z[1]],
        [z[0], l(...z) + 0.45, z[1]],
        [w[0], l(...w) + 0.45, w[1]],
      ],
      f,
      [Math.cos((M + S) / 2), 0, Math.sin((M + S) / 2)],
      (T) => [T[0] + T[2], T[1]],
    ),
      ne(
        i,
        [
          [w[0], l(...w) + 0.45, w[1]],
          [z[0], l(...z) + 0.45, z[1]],
          [
            n + Math.cos(S) * (Ji.r1 - 0.4),
            l(...z) + 0.45,
            o + Math.sin(S) * (Ji.r1 - 0.4),
          ],
          [
            n + Math.cos(M) * (Ji.r1 - 0.4),
            l(...w) + 0.45,
            o + Math.sin(M) * (Ji.r1 - 0.4),
          ],
        ],
        f,
        [0, 1, 0],
      ),
      ne(
        i,
        [
          [
            n + Math.cos(M) * (Ji.r1 - 0.4),
            l(...w) + 0.45,
            o + Math.sin(M) * (Ji.r1 - 0.4),
          ],
          [
            n + Math.cos(S) * (Ji.r1 - 0.4),
            l(...z) + 0.45,
            o + Math.sin(S) * (Ji.r1 - 0.4),
          ],
          [
            n + Math.cos(S) * (Ji.r1 - 0.4),
            l(...z),
            o + Math.sin(S) * (Ji.r1 - 0.4),
          ],
          [
            n + Math.cos(M) * (Ji.r1 - 0.4),
            l(...w),
            o + Math.sin(M) * (Ji.r1 - 0.4),
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
          let z = Ot(S, w, y),
            _ = Math.hypot(z.x - n, z.z - o);
          _ > Ji.r1 - 1 &&
            _ < Ji.r1 + 4 &&
            ((M = Math.atan2(z.z - o, z.x - n)), p.push(M));
        }
  }
  p.push(Math.atan2(-760.5 - o, -1085.5 - n));
  let m = (y) =>
      p.some(
        (M) => Math.abs(Math.atan2(Math.sin(y - M), Math.cos(y - M))) < 0.32,
      ),
    g = 13,
    b = Math.floor((2 * Math.PI * g) / 2.75),
    x = 7,
    v = () => (x = (x * 16807) % 2147483647) / 2147483647;
  for (let y = 0; y < b; y++) {
    let M = (y / b) * Math.PI * 2,
      S = ((y + 0.5) / b) * Math.PI * 2;
    if (m(S)) continue;
    let w = Math.cos(M),
      z = Math.sin(M),
      _ = n + w * g,
      R = o + z * g,
      T = n + w * (Ji.r1 - 0.6),
      E = o + z * (Ji.r1 - 0.6);
    if (
      (ra(
        i,
        [(_ + T) / 2, (R + E) / 2],
        [w, z],
        [-z, w],
        (Ji.r1 - 0.6 - g) / 2,
        0.06,
        l((_ + T) / 2, (R + E) / 2) + 0.005,
        l((_ + T) / 2, (R + E) / 2) + 0.012,
        h,
        { top: !0 },
      ),
      v() < 0.78)
    ) {
      let C = n + Math.cos(S) * 15.9,
        P = o + Math.sin(S) * 15.9;
      (e.inst.push({
        kind: "car",
        x: C,
        y: l(C, P),
        z: P,
        rot: Math.atan2(Math.cos(S), Math.sin(S)) + (v() < 0.3 ? Math.PI : 0),
        color: v(),
        type: [0, 0, 1, 2, 3][Math.floor(v() * 5)],
      }),
        t.colliders.push({
          t: "obb",
          x: C,
          z: P,
          hx: 0.95,
          hz: 2.3,
          c: Math.sin(S),
          s: Math.cos(S),
          y0: l(C, P) - 1,
          y1: l(C, P) + 1.5,
        }));
    }
  }
  for (let y = 0; y < 40; y++) {
    let M = (y / 40) * Math.PI * 2;
    if (y % 2) continue;
    let S = Math.cos(M),
      w = Math.sin(M),
      z = n + S * 10.8,
      _ = o + w * 10.8;
    ra(
      i,
      [z, _],
      [-w, S],
      [S, w],
      0.7,
      0.07,
      l(z, _) + 0.005,
      l(z, _) + 0.012,
      h,
    );
  }
  for (let y = 0; y < 24; y++) {
    let M = ((y + 0.5) / 24) * Math.PI * 2;
    m(M) ||
      t.colliders.push({
        t: "circ",
        x: n + Math.cos(M) * (Ji.r1 + 0.3),
        z: o + Math.sin(M) * (Ji.r1 + 0.3),
        r: 2.4,
      });
  }
}
var l1t = [
  {
    name: "Maiden Lane",
    v: [1.15],
    step: 4.2,
    umb: [It(Lt.matte, 0.92, 0.75, 0.12), It(Lt.matte, 0.9, 0.89, 0.85)],
    x0: -1150,
    x1: -1040,
  },
  {
    name: "Belden Place",
    v: [-1.1, 1.1],
    step: 3.6,
    umb: [It(Lt.matte, 0.62, 0.08, 0.06), It(Lt.matte, 0.1, 0.3, 0.16)],
    lights: !0,
    x0: -1e9,
    x1: 1e9,
  },
];
