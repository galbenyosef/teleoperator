// app 275 — push
// Lines 136859-137156 of readable/app.pretty.js (statement-aligned).
es();
function PF(o, t, e, s, n) {
  tI(o, t, n);
  let i = new Le();
  return (
    i.setAttribute("position", new Re(o, 3)),
    i.setAttribute("normal", new Re(t, 3)),
    i.setAttribute("uv", new Re(e, 2)),
    i.setAttribute("color", new Re(s, 4)),
    i.setIndex(n.length > 65535 ? new j0(n, 1) : new Yr(n, 1)),
    i.computeBoundingSphere(),
    i
  );
}
var Ol = (o, t) => {
  let e = Math.hypot(o[t], o[t + 1], o[t + 2]) || 1;
  ((o[t] /= e), (o[t + 1] /= e), (o[t + 2] /= e));
};
function AF(o, t, e, s) {
  let n = [],
    i = [],
    a = [],
    r = [],
    l = [];
  for (let c of o) {
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
        _ = Math.min(h - 1, S + 1),
        z = [p(_) - p(w), m(_) - m(w), g(_) - g(w)];
      (Ol(z, 0), b.push(z));
    }
    let v =
      Math.abs(b[0][1]) < 0.9 ? [b[0][2], 0, -b[0][0]] : [0, -b[0][2], b[0][1]];
    Ol(v, 0);
    let x = n.length / 3,
      y = Math.max(1, Math.round((2 * Math.PI * c.pts[3]) / u)),
      M = 0;
    for (let S = 0; S < h; S++) {
      if (S) {
        let T = b[S],
          E = v[0] * T[0] + v[1] * T[1] + v[2] * T[2];
        ((v = [v[0] - E * T[0], v[1] - E * T[1], v[2] - E * T[2]]),
          Ol(v, 0),
          (M += Math.hypot(p(S) - p(S - 1), m(S) - m(S - 1), g(S) - g(S - 1))));
      }
      let w = b[S],
        _ = [
          w[1] * v[2] - w[2] * v[1],
          w[2] * v[0] - w[0] * v[2],
          w[0] * v[1] - w[1] * v[0],
        ],
        z = c.pts[S * 5 + 3],
        A = c.pts[S * 5 + 4];
      for (let T = 0; T <= f; T++) {
        let E = (T / f) * Math.PI * 2,
          R = Math.cos(E),
          P = Math.sin(E),
          C = [v[0] * R + _[0] * P, v[1] * R + _[1] * P, v[2] * R + _[2] * P];
        (n.push(p(S) + C[0] * z, m(S) + C[1] * z, g(S) + C[2] * z),
          i.push(...C),
          a.push((T / f) * y, M / d),
          r.push(A * s[0], A * s[1], A * s[2], 1));
      }
    }
    for (let S = 0; S + 1 < h; S++)
      for (let w = 0; w < f; w++) {
        let _ = x + S * (f + 1) + w,
          z = _ + f + 1;
        l.push(_, z, z + 1, _, z + 1, _ + 1);
      }
  }
  return PF(n, i, a, r, l);
}
function nQ(o, t, e, s) {
  let n = [],
    i = [],
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
  for (let b of o.cards) {
    if (!e(b)) continue;
    let v = b.s * s,
      x = b.u,
      y = b.n,
      M = [
        x[1] * y[2] - x[2] * y[1],
        x[2] * y[0] - x[0] * y[2],
        x[0] * y[1] - x[1] * y[0],
      ],
      S = b.cell % 4,
      w = b.cell >> 2,
      _ = (b.k * 7 + b.cell + ((b.p[0] * 13.7) | 0)) & 1,
      z = 0.12 * v,
      A = o.clumps[b.k] || t.C,
      T = n.length / 3;
    for (let E = 0; E < 2; E++) {
      let [R, P] = g[E],
        C = E ? 0.5 * (b.ao[1] + b.ao[2]) : 0.5 * (b.ao[0] + b.ao[1]),
        I = v * (0.82 + 0.16 * R),
        L = (0.14 + 0.86 * Math.pow(C, 0.7)) * (0.82 + 0.18 * R),
        F = 0.12 + 0.88 * Math.min(1, C * 1.3);
      for (let O of [-0.5, 0.5]) {
        let B = b.p[0] + x[0] * (R - 0.06) * v + M[0] * O * I,
          H = b.p[1] + x[1] * (R - 0.06) * v + M[1] * O * I - z * P,
          N = b.p[2] + x[2] * (R - 0.06) * v + M[2] * O * I;
        n.push(B, H, N);
        let D = [B - A[0], H - A[1], N - A[2]];
        Ol(D, 0);
        let U = H > h ? d : p,
          G = [(B - c) / (u * u), (H - h) / (U * U), (N - f) / (u * u)];
        Ol(G, 0);
        let W = y[0] * G[0] + y[1] * G[1] + y[2] * G[2] < 0 ? -0.3 : 0.3,
          V = [
            m * D[0] + (1 - m) * G[0] + W * y[0],
            m * D[1] + (1 - m) * G[1] + W * y[1],
            m * D[2] + (1 - m) * G[2] + W * y[2],
          ];
        (Ol(V, 0),
          i.push(V[0], V[1], V[2]),
          a.push(
            (S + 0.01 + 0.98 * (_ ? 0.5 - O : O + 0.5)) / 4,
            (w + 0.995 - 0.985 * R) / 4,
          ),
          r.push(L * b.tint[0], L * b.tint[1], L * b.tint[2], F));
      }
    }
    l.push(T, T + 1, T + 3, T, T + 3, T + 2);
  }
  return PF(n, i, a, r, l);
}
function pyt(o, t) {
  let e = [],
    s = [],
    n = [],
    i = [],
    a = [],
    [r, l, c] = t.C,
    h = t.broad ? 2 : 4;
  for (let f of o.masses) {
    let u = f.o,
      d = f.s,
      p = [u[2], 0, -u[0]];
    Ol(p, 0);
    let m = [
      u[1] * p[2] - u[2] * p[1],
      u[2] * p[0] - u[0] * p[2],
      u[0] * p[1] - u[1] * p[0],
    ];
    (Ol(m, 0), m[1] < 0 && ((m[0] *= -1), (m[1] *= -1), (m[2] *= -1)));
    let g = f.cell % h,
      b = Math.floor(f.cell / h),
      v = e.length / 3;
    for (let x of [0, 1])
      for (let y of [-0.5, 0.5]) {
        let M = f.p[0] + p[0] * y * d + m[0] * (x - 0.5) * d * 0.9,
          S = f.p[1] + p[1] * y * d + m[1] * (x - 0.5) * d * 0.9,
          w = f.p[2] + p[2] * y * d + m[2] * (x - 0.5) * d * 0.9;
        e.push(M, S, w);
        let _ = [M - r, (S - l) * 1.3, w - c];
        Ol(_, 0);
        let z = [
          0.3 * u[0] + 0.7 * _[0],
          0.3 * u[1] + 0.7 * _[1],
          0.3 * u[2] + 0.7 * _[2],
        ];
        (Ol(z, 0),
          s.push(...z),
          n.push(
            (g + 0.02 + 0.96 * (y + 0.5)) / h,
            (b + 0.02 + 0.96 * (1 - x)) / h,
          ));
        let A = (0.3 + 0.7 * f.ao) * (0.8 + 0.2 * x);
        i.push(A * f.tint[0], A * f.tint[1], A * f.tint[2], f.tr);
      }
    a.push(v, v + 1, v + 3, v, v + 3, v + 2);
  }
  return PF(e, s, n, i, a);
}
function iQ(o) {
  let t = o instanceof Uint8Array ? o : new Uint8Array(o),
    e = new DataView(t.buffer, t.byteOffset, t.byteLength),
    s = e.getUint32(0, !0),
    n = JSON.parse(new TextDecoder().decode(t.subarray(4, 4 + s))),
    i = 4 + s,
    a = {},
    r = () => {
      let f = e.getFloat32(i, !0);
      return ((i += 4), f);
    },
    l = () => {
      let f = e.getUint16(i, !0);
      return ((i += 2), f);
    },
    c = () => t[i++],
    h = () => {
      let f = e.getInt8(i);
      return (i++, f / 127);
    };
  for (let [f, u] of Object.entries(n.species)) {
    let d = i,
      p = { tubes: [], clumps: [], cards: [], masses: [] };
    for (let g = l(), b = 0; b < g; b++) {
      let v = l(),
        x = l(),
        y = new Float32Array(x * 5);
      for (let M = 0; M < x * 5; M++) y[M] = r();
      p.tubes.push({ order: v, pts: y });
    }
    p.tubes = eI(p.tubes);
    for (let g = l(), b = 0; b < g; b++) p.clumps.push([r(), r(), r()]);
    {
      let g = l() * 65536 + l();
      for (let b = 0; b < g; b++) {
        let v = [r(), r(), r()],
          x = [h(), h(), h()],
          y = [h(), h(), h()];
        (Ol(x, 0), Ol(y, 0));
        let M = l() / 1e3,
          S = l(),
          w = c(),
          _ = c(),
          z = [c() / 255, c() / 255, c() / 255],
          A = [c() / 200, c() / 200, c() / 200];
        p.cards.push({
          p: v,
          u: x,
          n: y,
          s: M,
          k: S,
          cell: w,
          l1: _ & 1,
          ao: z,
          tint: A,
        });
      }
    }
    for (let g = l(), b = 0; b < g; b++) {
      let v = [r(), r(), r()],
        x = [h(), h(), h()];
      Ol(x, 0);
      let y = l() / 1e3,
        M = c(),
        S = c() / 255,
        w = [c() / 200, c() / 200, c() / 200],
        _ = c() / 255;
      p.masses.push({ p: v, o: x, s: y, cell: M, ao: S, tint: w, tr: _ });
    }
    i = d + u.bytes;
    let m = u.broad ? "leafmass" : "leaf";
    a[f] = {
      top: u.top,
      lods: [
        [
          { mat: u.bark, geo: AF(p.tubes, 3, [9, 5, 3, 2], u.barkTint) },
          { mat: "leaf", geo: nQ(p, u, () => !0, 1) },
        ],
        [
          { mat: u.bark, geo: AF(p.tubes, 1, [7, 4], u.barkTint) },
          { mat: "leaf", geo: nQ(p, u, (g) => g.l1, n.l1 ?? 1.55) },
        ],
        [
          { mat: u.bark, geo: AF(p.tubes, 0, [5], u.barkTint) },
          { mat: m, geo: pyt(p, u) },
        ],
      ],
    };
  }
  return a;
}
es();
Ya();
es();
Ya();
await _0();
