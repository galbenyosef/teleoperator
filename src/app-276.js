// app 276 — push
// Lines 136590-136887 of readable/app.pretty.js (statement-aligned).
as();
function eI(i, t, e, s, n) {
  kC(i, t, n);
  let o = new De();
  return (
    o.setAttribute("position", new ze(i, 3)),
    o.setAttribute("normal", new ze(t, 3)),
    o.setAttribute("uv", new ze(e, 2)),
    o.setAttribute("color", new ze(s, 4)),
    o.setIndex(n.length > 65535 ? new w0(n, 1) : new Cr(n, 1)),
    o.computeBoundingSphere(),
    o
  );
}
var gl = (i, t) => {
  let e = Math.hypot(i[t], i[t + 1], i[t + 2]) || 1;
  ((i[t] /= e), (i[t + 1] /= e), (i[t + 2] /= e));
};
function tI(i, t, e, s) {
  let n = [],
    o = [],
    a = [],
    r = [],
    l = [];
  for (let c of i) {
    if (c.order > t) continue;
    c.order === 3 &&
      (c = {
        order: 3,
        pts: Float32Array.from([
          ...c.pts.subarray(0, 5),
          ...c.pts.subarray(c.pts.length - 5),
        ]),
      });
    let h = c.pts.length / 5,
      f = e[c.order],
      u = c.order ? 0.6 : 1,
      d = c.order ? 0.8 : 1.3,
      p = (S) => c.pts[S * 5],
      m = (S) => c.pts[S * 5 + 1],
      g = (S) => c.pts[S * 5 + 2],
      b = [];
    for (let S = 0; S < h; S++) {
      let w = Math.max(0, S - 1),
        z = Math.min(h - 1, S + 1),
        _ = [p(z) - p(w), m(z) - m(w), g(z) - g(w)];
      (gl(_, 0), b.push(_));
    }
    let x =
      Math.abs(b[0][1]) < 0.9 ? [b[0][2], 0, -b[0][0]] : [0, -b[0][2], b[0][1]];
    gl(x, 0);
    let v = n.length / 3,
      y = Math.max(1, Math.round((2 * Math.PI * c.pts[3]) / u)),
      M = 0;
    for (let S = 0; S < h; S++) {
      if (S) {
        let T = b[S],
          E = x[0] * T[0] + x[1] * T[1] + x[2] * T[2];
        ((x = [x[0] - E * T[0], x[1] - E * T[1], x[2] - E * T[2]]),
          gl(x, 0),
          (M += Math.hypot(p(S) - p(S - 1), m(S) - m(S - 1), g(S) - g(S - 1))));
      }
      let w = b[S],
        z = [
          w[1] * x[2] - w[2] * x[1],
          w[2] * x[0] - w[0] * x[2],
          w[0] * x[1] - w[1] * x[0],
        ],
        _ = c.pts[S * 5 + 3],
        R = c.pts[S * 5 + 4];
      for (let T = 0; T <= f; T++) {
        let E = (T / f) * Math.PI * 2,
          A = Math.cos(E),
          C = Math.sin(E),
          P = [x[0] * A + z[0] * C, x[1] * A + z[1] * C, x[2] * A + z[2] * C];
        (n.push(p(S) + P[0] * _, m(S) + P[1] * _, g(S) + P[2] * _),
          o.push(...P),
          a.push((T / f) * y, M / d),
          r.push(R * s[0], R * s[1], R * s[2], 1));
      }
    }
    for (let S = 0; S + 1 < h; S++)
      for (let w = 0; w < f; w++) {
        let z = v + S * (f + 1) + w,
          _ = z + f + 1;
        l.push(z, _, _ + 1, z, _ + 1, z + 1);
      }
  }
  return eI(n, o, a, r, l);
}
function tJ(i, t, e, s) {
  let n = [],
    o = [],
    a = [],
    r = [],
    l = [],
    [c, h, f] = t.C,
    [u, d, p] = t.R,
    m = t.cl,
    g = [
      [0, 0],
      [1, 1],
    ];
  for (let b of i.cards) {
    if (!e(b)) continue;
    let x = b.s * s,
      v = b.u,
      y = b.n,
      M = [
        v[1] * y[2] - v[2] * y[1],
        v[2] * y[0] - v[0] * y[2],
        v[0] * y[1] - v[1] * y[0],
      ],
      S = b.cell % 4,
      w = b.cell >> 2,
      z = (b.k * 7 + b.cell + ((b.p[0] * 13.7) | 0)) & 1,
      _ = 0.12 * x,
      R = i.clumps[b.k] || t.C,
      T = n.length / 3;
    for (let E = 0; E < 2; E++) {
      let [A, C] = g[E],
        P = E ? 0.5 * (b.ao[1] + b.ao[2]) : 0.5 * (b.ao[0] + b.ao[1]),
        I = x * (0.82 + 0.16 * A),
        L = (0.14 + 0.86 * Math.pow(P, 0.7)) * (0.82 + 0.18 * A),
        F = 0.12 + 0.88 * Math.min(1, P * 1.3);
      for (let N of [-0.5, 0.5]) {
        let B = b.p[0] + v[0] * (A - 0.06) * x + M[0] * N * I,
          H = b.p[1] + v[1] * (A - 0.06) * x + M[1] * N * I - _ * C,
          O = b.p[2] + v[2] * (A - 0.06) * x + M[2] * N * I;
        n.push(B, H, O);
        let D = [B - R[0], H - R[1], O - R[2]];
        gl(D, 0);
        let U = H > h ? d : p,
          G = [(B - c) / (u * u), (H - h) / (U * U), (O - f) / (u * u)];
        gl(G, 0);
        let q = y[0] * G[0] + y[1] * G[1] + y[2] * G[2] < 0 ? -0.3 : 0.3,
          W = [
            m * D[0] + (1 - m) * G[0] + q * y[0],
            m * D[1] + (1 - m) * G[1] + q * y[1],
            m * D[2] + (1 - m) * G[2] + q * y[2],
          ];
        (gl(W, 0),
          o.push(W[0], W[1], W[2]),
          a.push(
            (S + 0.01 + 0.98 * (z ? 0.5 - N : N + 0.5)) / 4,
            (w + 0.995 - 0.985 * A) / 4,
          ),
          r.push(L * b.tint[0], L * b.tint[1], L * b.tint[2], F));
      }
    }
    l.push(T, T + 1, T + 3, T, T + 3, T + 2);
  }
  return eI(n, o, a, r, l);
}
function qbt(i, t) {
  let e = [],
    s = [],
    n = [],
    o = [],
    a = [],
    [r, l, c] = t.C,
    h = t.broad ? 2 : 4;
  for (let f of i.masses) {
    let u = f.o,
      d = f.s,
      p = [u[2], 0, -u[0]];
    gl(p, 0);
    let m = [
      u[1] * p[2] - u[2] * p[1],
      u[2] * p[0] - u[0] * p[2],
      u[0] * p[1] - u[1] * p[0],
    ];
    (gl(m, 0), m[1] < 0 && ((m[0] *= -1), (m[1] *= -1), (m[2] *= -1)));
    let g = f.cell % h,
      b = Math.floor(f.cell / h),
      x = e.length / 3;
    for (let v of [0, 1])
      for (let y of [-0.5, 0.5]) {
        let M = f.p[0] + p[0] * y * d + m[0] * (v - 0.5) * d * 0.9,
          S = f.p[1] + p[1] * y * d + m[1] * (v - 0.5) * d * 0.9,
          w = f.p[2] + p[2] * y * d + m[2] * (v - 0.5) * d * 0.9;
        e.push(M, S, w);
        let z = [M - r, (S - l) * 1.3, w - c];
        gl(z, 0);
        let _ = [
          0.3 * u[0] + 0.7 * z[0],
          0.3 * u[1] + 0.7 * z[1],
          0.3 * u[2] + 0.7 * z[2],
        ];
        (gl(_, 0),
          s.push(..._),
          n.push(
            (g + 0.02 + 0.96 * (y + 0.5)) / h,
            (b + 0.02 + 0.96 * (1 - v)) / h,
          ));
        let R = (0.3 + 0.7 * f.ao) * (0.8 + 0.2 * v);
        o.push(R * f.tint[0], R * f.tint[1], R * f.tint[2], f.tr);
      }
    a.push(x, x + 1, x + 3, x, x + 3, x + 2);
  }
  return eI(e, s, n, o, a);
}
function eJ(i) {
  let t = i instanceof Uint8Array ? i : new Uint8Array(i),
    e = new DataView(t.buffer, t.byteOffset, t.byteLength),
    s = e.getUint32(0, !0),
    n = JSON.parse(new TextDecoder().decode(t.subarray(4, 4 + s))),
    o = 4 + s,
    a = {},
    r = () => {
      let f = e.getFloat32(o, !0);
      return ((o += 4), f);
    },
    l = () => {
      let f = e.getUint16(o, !0);
      return ((o += 2), f);
    },
    c = () => t[o++],
    h = () => {
      let f = e.getInt8(o);
      return (o++, f / 127);
    };
  for (let [f, u] of Object.entries(n.species)) {
    let d = o,
      p = { tubes: [], clumps: [], cards: [], masses: [] };
    for (let g = l(), b = 0; b < g; b++) {
      let x = l(),
        v = l(),
        y = new Float32Array(v * 5);
      for (let M = 0; M < v * 5; M++) y[M] = r();
      p.tubes.push({ order: x, pts: y });
    }
    p.tubes = _C(p.tubes);
    for (let g = l(), b = 0; b < g; b++) p.clumps.push([r(), r(), r()]);
    {
      let g = l() * 65536 + l();
      for (let b = 0; b < g; b++) {
        let x = [r(), r(), r()],
          v = [h(), h(), h()],
          y = [h(), h(), h()];
        (gl(v, 0), gl(y, 0));
        let M = l() / 1e3,
          S = l(),
          w = c(),
          z = c(),
          _ = [c() / 255, c() / 255, c() / 255],
          R = [c() / 200, c() / 200, c() / 200];
        p.cards.push({
          p: x,
          u: v,
          n: y,
          s: M,
          k: S,
          cell: w,
          l1: z & 1,
          ao: _,
          tint: R,
        });
      }
    }
    for (let g = l(), b = 0; b < g; b++) {
      let x = [r(), r(), r()],
        v = [h(), h(), h()];
      gl(v, 0);
      let y = l() / 1e3,
        M = c(),
        S = c() / 255,
        w = [c() / 200, c() / 200, c() / 200],
        z = c() / 255;
      p.masses.push({ p: x, o: v, s: y, cell: M, ao: S, tint: w, tr: z });
    }
    o = d + u.bytes;
    let m = u.broad ? "leafmass" : "leaf";
    a[f] = {
      top: u.top,
      lods: [
        [
          { mat: u.bark, geo: tI(p.tubes, 3, [9, 5, 3, 2], u.barkTint) },
          { mat: "leaf", geo: tJ(p, u, () => !0, 1) },
        ],
        [
          { mat: u.bark, geo: tI(p.tubes, 1, [7, 4], u.barkTint) },
          { mat: "leaf", geo: tJ(p, u, (g) => g.l1, n.l1 ?? 1.55) },
        ],
        [
          { mat: u.bark, geo: tI(p.tubes, 0, [5], u.barkTint) },
          { mat: m, geo: qbt(p, u) },
        ],
      ],
    };
  }
  return a;
}
as();
Oa();
as();
Oa();
f0();
