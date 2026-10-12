// app 257 — math
// Lines 130542-130846 of readable/app.pretty.js (statement-aligned).
function Pgt(i, t, e, s) {
  let n = new dL(),
    o = t + 1,
    a = t < 2,
    r = i[2],
    l = [24, 18, 14][s],
    c = s > 0,
    h = Math.min(e.width, i[4] - i[3] - 0.02),
    f = i[4] - 0.006,
    u = f - h,
    d = (u + f) / 2,
    p = (e.rim * Rgt) / 2 + 0.012,
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
    x = [
      0, 0.08, 0.16, 0.24, 0.29, 0.31, 0.5, 0.69, 0.71, 0.76, 0.84, 0.88, 0.92,
      0.96, 1,
    ],
    v = [
      [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      [0, 2, 4, 5, 6, 7, 8, 10, 11, 13, 14],
      [0, 2, 4, 6, 8, 10, 14],
    ][s];
  n.lathe(
    v.map((q) => b[q]),
    l,
    11.5,
    o,
    [d, p + 0.45 * m],
    v.map((q) => x[q]),
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
    o,
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
        o,
        [d, r],
      ));
  let S = e.hubR || 0.072,
    w = y - e.dish,
    z = e.from ? e.from * (p - 0.02) : S;
  if (
    (e.steel
      ? n.lathe(
          [
            [w + 0.006, 1e-4],
            [w + 0.006, 0.05],
            [w - 0.004, 0.075],
            [w - 0.002, 0.12],
            [y - 0.012, z - 0.01],
            [y - 0.012, z + 0.004],
          ],
          [20, 14, 10][s],
          M,
          o,
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
          o,
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
        o,
      ),
    !c)
  )
    for (let q = 0; q < 5; q++) {
      let W = ((q + 0.5) / 5) * Math.PI * 2,
        V = 0.057 * Math.cos(W),
        Y = 0.057 * Math.sin(W),
        $ = 0.0105,
        st = w + 0.016,
        Q = w + 0.002,
        j = (K, nt) => {
          let Z = (K / 6) * Math.PI * 2,
            et = V + $ * Math.cos(Z),
            tt = Y + $ * Math.sin(Z);
          return [nt, Math.hypot(et, tt), Math.atan2(tt, et)];
        },
        X = [Q, 0.057, W];
      for (let K = 0; K < 6; K++)
        (n.quad(j(K, Q), j(K + 1, Q), j(K + 1, st), j(K, st), 10.5, o, X),
          n.tri([st, 0.057, W], j(K, st), j(K + 1, st), 10.5, o, null, X));
    }
  let _ = p - 0.016,
    R = e.steel ? 0.02 : 0.034,
    T = s > 1 ? 1 : 3,
    E = [];
  for (let q = 0; q < e.n; q++) {
    let W = (q / e.n) * Math.PI * 2;
    if (e.twin) {
      let V = (e.w1 * 1.35) / _;
      E.push(W - V, W + V);
    } else E.push(W);
  }
  for (let q of E) {
    let W = [];
    for (let V = 0; V <= T; V++) {
      let Y = V / T,
        $ = z + (_ - z) * Y,
        st = (e.w0 + (e.w1 - e.w0) * Y) / 2 / $,
        Q = e.steel ? y - 0.012 : w + (y - w) * (1 - (1 - Y) * (1 - Y)),
        j = e.steel ? 0 : ((y - w) * 2 * (1 - Y)) / (_ - z),
        X = Math.hypot(1, j);
      W.push({ r: $, hw: st, a: Q, n: [1 / X, -j / X, 0] });
    }
    for (let V = 0; V < T; V++) {
      let Y = W[V],
        $ = W[V + 1],
        st = [Y.a - 1, (Y.r + $.r) / 2, q];
      (n.tri(
        [Y.a, Y.r, q - Y.hw],
        [$.a, $.r, q - $.hw],
        [$.a, $.r, q + $.hw],
        M,
        o,
        null,
        st,
        [Y.n, $.n, $.n],
      ),
        n.tri(
          [Y.a, Y.r, q - Y.hw],
          [$.a, $.r, q + $.hw],
          [Y.a, Y.r, q + Y.hw],
          M,
          o,
          null,
          st,
          [Y.n, $.n, Y.n],
        ));
      for (let Q of [-1, 1])
        n.quad(
          [Y.a, Y.r, q + Q * Y.hw],
          [$.a, $.r, q + Q * $.hw],
          [$.a - R, $.r, q + Q * $.hw],
          [Y.a - R, Y.r, q + Q * Y.hw],
          M,
          o,
          [Y.a - R / 2, (Y.r + $.r) / 2, q],
        );
    }
  }
  let A = u - 0.012;
  if (s > 1)
    return (
      n.lathe(
        [
          [A, 1e-4],
          [A, r + 0.05],
        ],
        12,
        17.5,
        0,
        [A + 1, 0],
      ),
      n.geometry(i, t % 2 ? -1 : 1)
    );
  let C = Math.min(w - 0.03, y - 0.06),
    P = Math.min(p - 0.05, 0.175);
  n.lathe(
    [
      [C, P * 0.45],
      [C, P],
      [C - 0.026, P],
    ],
    [16, 12][s],
    15.5,
    o,
    [C - 0.013, P * 0.6],
    null,
    !0,
  );
  let I = Math.max(u - 0.012, C - 0.09);
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
    N = P - 0.055,
    B = P + 0.012,
    H = C + 0.022,
    O = C - 0.05,
    D = a ? t + 5 : 0,
    U = a ? -L : L,
    G = 4;
  if (s < 1)
    for (let q = 0; q < G; q++) {
      let W = U - F / 2 + (F * q) / G,
        V = U - F / 2 + (F * (q + 1)) / G,
        Y = [(H + O) / 2, (N + B) / 2, (W + V) / 2];
      if (
        (n.quad([H, N, W], [H, B, W], [H, B, V], [H, N, V], 16.5, D, Y),
        n.quad([H, B, W], [O, B, W], [O, B, V], [H, B, V], 16.5, D, Y),
        n.quad([H, N, W], [O, N, W], [O, N, V], [H, N, V], 16.5, D, Y),
        q === 0 || q === G - 1)
      ) {
        let $ = q ? V : W;
        n.quad([H, N, $], [H, B, $], [O, B, $], [O, N, $], 16.5, D, Y);
      }
    }
  return n.geometry(i, t % 2 ? -1 : 1);
}
function pL(i, t, e = 0) {
  let s = Qk[i];
  if (!s) return null;
  let n = t.map((o, a) => o && Pgt(o, a, s, e)).filter(Boolean);
  return n.length ? wi(n) : null;
}
function mL(i, t, e = null) {
  let s = i.index ? i.toNonIndexed() : i,
    n = s.attributes.position.array,
    o = new Uint32Array(n.buffer, n.byteOffset, n.length),
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
    !(o[c * 9] & 7) &&
      !(o[c * 9 + 3] & 7) &&
      !(o[c * 9 + 6] & 7) &&
      !(e && a(c * 9) && a(c * 9 + 3) && a(c * 9 + 6)) &&
      r.push(c);
  let l = new De();
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
as();
