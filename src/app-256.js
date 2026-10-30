// app 256 — math
// Lines 130801-131105 of readable/app.pretty.js (statement-aligned).
function e3t(o, t, e, s) {
  let n = new VI(),
    i = t + 1,
    a = t < 2,
    r = o[2],
    l = [24, 18, 14][s],
    c = s > 0,
    h = Math.min(e.width, o[4] - o[3] - 0.02),
    f = o[4] - 0.006,
    u = f - h,
    d = (u + f) / 2,
    p = (e.rim * t3t) / 2 + 0.012,
    m = r - p,
    g = Math.min(0.045, h * 0.2),
    b = [
      [u + 0.022, p - 0.004],
      [u + 0.006, p + 0.3 * m],
      [u + 0.004, p + 0.62 * m],
      [u + 0.014, r - g * 0.75],
      [u + g * 0.55, r - 0.006],
      [u + g, r],
      [d, r + 0.002],
      [f - g, r],
      [f - g * 0.55, r - 0.006],
      [f - 0.012, r - g * 0.75],
      [f - 0.002, p + 0.62 * m],
      [f, p + 0.42 * m],
      [f - 0.004, p + 0.22 * m],
      [f - 0.012, p + 0.07 * m],
      [f - 0.022, p - 0.004],
    ],
    v = [
      0, 0.08, 0.16, 0.24, 0.29, 0.31, 0.5, 0.69, 0.71, 0.76, 0.84, 0.88, 0.92,
      0.96, 1,
    ],
    x = [
      [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      [0, 2, 4, 5, 6, 7, 8, 10, 11, 13, 14],
      [0, 2, 4, 6, 8, 10, 14],
    ][s];
  n.lathe(
    x.map((W) => b[W]),
    l,
    11.5,
    i,
    [d, p + 0.45 * m],
    x.map((W) => v[W]),
  );
  let y = f - 0.026,
    M = e.finish;
  (n.lathe(
    [
      [y - 0.012, p + 0.012],
      [y - 0.002, p + 0.014],
      [y + 0.004, p + 0.006],
      [y + 0.002, p - 0.006],
      [y - 0.008, p - 0.014],
    ],
    l,
    M,
    i,
    [y - 0.03, p],
  ),
    s < 1 &&
      n.lathe(
        [
          [y - 0.008, p - 0.014],
          [y - 0.03, p - 0.022],
          [u + 0.02, p - 0.022],
        ],
        l,
        19.5,
        i,
        [d, r],
      ));
  let S = e.hubR || 0.072,
    w = y - e.dish,
    _ = e.from ? e.from * (p - 0.02) : S;
  if (
    (e.steel
      ? n.lathe(
          [
            [w + 0.006, 1e-4],
            [w + 0.006, 0.05],
            [w - 0.004, 0.075],
            [w - 0.002, 0.12],
            [y - 0.012, _ - 0.01],
            [y - 0.012, _ + 0.004],
          ],
          [20, 14, 10][s],
          M,
          i,
        )
      : n.lathe(
          [
            [w + 0.004, 1e-4],
            [w + 0.004, 0.045],
            [w - 0.002, S * 0.85],
            [w - 0.014, S + 0.004],
          ],
          [16, 12, 8][s],
          M,
          i,
          null,
          null,
          s < 2,
        ),
    s < 2 &&
      n.lathe(
        [
          [w + 0.012, 1e-4],
          [w + 0.012, 0.026],
          [w + 0.006, 0.033],
          [w + 0.004, 0.034],
        ],
        c ? 8 : 12,
        e.steel ? 10.5 : 18.5,
        i,
      ),
    !c)
  )
    for (let W = 0; W < 5; W++) {
      let V = ((W + 0.5) / 5) * Math.PI * 2,
        $ = 0.057 * Math.cos(V),
        J = 0.057 * Math.sin(V),
        X = 0.0105,
        tt = w + 0.016,
        Z = w + 0.002,
        q = (K, nt) => {
          let Q = (K / 6) * Math.PI * 2,
            et = $ + X * Math.cos(Q),
            st = J + X * Math.sin(Q);
          return [nt, Math.hypot(et, st), Math.atan2(st, et)];
        },
        j = [Z, 0.057, V];
      for (let K = 0; K < 6; K++)
        (n.quad(q(K, Z), q(K + 1, Z), q(K + 1, tt), q(K, tt), 10.5, i, j),
          n.tri([tt, 0.057, V], q(K, tt), q(K + 1, tt), 10.5, i, null, j));
    }
  let z = p - 0.016,
    A = e.steel ? 0.02 : 0.034,
    T = s > 1 ? 1 : 3,
    E = [];
  for (let W = 0; W < e.n; W++) {
    let V = (W / e.n) * Math.PI * 2;
    if (e.twin) {
      let $ = (e.w1 * 1.35) / z;
      E.push(V - $, V + $);
    } else E.push(V);
  }
  for (let W of E) {
    let V = [];
    for (let $ = 0; $ <= T; $++) {
      let J = $ / T,
        X = _ + (z - _) * J,
        tt = (e.w0 + (e.w1 - e.w0) * J) / 2 / X,
        Z = e.steel ? y - 0.012 : w + (y - w) * (1 - (1 - J) * (1 - J)),
        q = e.steel ? 0 : ((y - w) * 2 * (1 - J)) / (z - _),
        j = Math.hypot(1, q);
      V.push({ r: X, hw: tt, a: Z, n: [1 / j, -q / j, 0] });
    }
    for (let $ = 0; $ < T; $++) {
      let J = V[$],
        X = V[$ + 1],
        tt = [J.a - 1, (J.r + X.r) / 2, W];
      (n.tri(
        [J.a, J.r, W - J.hw],
        [X.a, X.r, W - X.hw],
        [X.a, X.r, W + X.hw],
        M,
        i,
        null,
        tt,
        [J.n, X.n, X.n],
      ),
        n.tri(
          [J.a, J.r, W - J.hw],
          [X.a, X.r, W + X.hw],
          [J.a, J.r, W + J.hw],
          M,
          i,
          null,
          tt,
          [J.n, X.n, J.n],
        ));
      for (let Z of [-1, 1])
        n.quad(
          [J.a, J.r, W + Z * J.hw],
          [X.a, X.r, W + Z * X.hw],
          [X.a - A, X.r, W + Z * X.hw],
          [J.a - A, J.r, W + Z * J.hw],
          M,
          i,
          [J.a - A / 2, (J.r + X.r) / 2, W],
        );
    }
  }
  let R = u - 0.012;
  if (s > 1)
    return (
      n.lathe(
        [
          [R, 1e-4],
          [R, r + 0.05],
        ],
        12,
        17.5,
        0,
        [R + 1, 0],
      ),
      n.geometry(o, t % 2 ? -1 : 1)
    );
  let P = Math.min(w - 0.03, y - 0.06),
    C = Math.min(p - 0.05, 0.175);
  n.lathe(
    [
      [P, C * 0.45],
      [P, C],
      [P - 0.026, C],
    ],
    [16, 12][s],
    15.5,
    i,
    [P - 0.013, C * 0.6],
    null,
    !0,
  );
  let I = Math.max(u - 0.012, P - 0.09);
  n.lathe(
    [
      [I, 1e-4],
      [I, r + 0.05],
    ],
    16,
    17.5,
    0,
    [I + 1, 0],
  );
  let L = Math.PI * 0.36,
    F = 0.48,
    O = C - 0.055,
    B = C + 0.012,
    H = P + 0.022,
    N = P - 0.05,
    D = a ? t + 5 : 0,
    U = a ? -L : L,
    G = 4;
  if (s < 1)
    for (let W = 0; W < G; W++) {
      let V = U - F / 2 + (F * W) / G,
        $ = U - F / 2 + (F * (W + 1)) / G,
        J = [(H + N) / 2, (O + B) / 2, (V + $) / 2];
      if (
        (n.quad([H, O, V], [H, B, V], [H, B, $], [H, O, $], 16.5, D, J),
        n.quad([H, B, V], [N, B, V], [N, B, $], [H, B, $], 16.5, D, J),
        n.quad([H, O, V], [N, O, V], [N, O, $], [H, O, $], 16.5, D, J),
        W === 0 || W === G - 1)
      ) {
        let X = W ? $ : V;
        n.quad([H, O, X], [H, B, X], [N, B, X], [N, O, X], 16.5, D, J);
      }
    }
  return n.geometry(o, t % 2 ? -1 : 1);
}
function WI(o, t, e = 0) {
  let s = Qz[o];
  if (!s) return null;
  let n = t.map((i, a) => i && e3t(i, a, s, e)).filter(Boolean);
  return n.length ? wi(n) : null;
}
function qI(o, t, e = null) {
  let s = o.index ? o.toNonIndexed() : o,
    n = s.attributes.position.array,
    i = new Uint32Array(n.buffer, n.byteOffset, n.length),
    a = (c) =>
      e.some((h, f) => {
        if (!h) return !1;
        let u = n[c] * (f % 2 ? -1 : 1);
        return (
          u > h[3] - 0.06 &&
          u < h[4] + 0.04 &&
          Math.hypot(n[c + 1] - h[0], n[c + 2] - h[1]) < h[2] + 0.03
        );
      }),
    r = [];
  for (let c = 0; c < n.length / 9; c++)
    !(i[c * 9] & 7) &&
      !(i[c * 9 + 3] & 7) &&
      !(i[c * 9 + 6] & 7) &&
      !(e && a(c * 9) && a(c * 9 + 3) && a(c * 9 + 6)) &&
      r.push(c);
  let l = new Le();
  for (let [c, h] of Object.entries(s.attributes)) {
    if (!t.attributes[c]) continue;
    let f = h.itemSize,
      u = h.array,
      d = new Float32Array((r.length * 3 + t.attributes[c].count) * f),
      p = 0;
    for (let m of r)
      (d.set(u.subarray(m * 3 * f, (m + 1) * 3 * f), p), (p += 3 * f));
    (d.set(t.attributes[c].array, p), l.setAttribute(c, new Te(d, f)));
  }
  return (l.computeBoundingSphere(), l);
}
es();
