// app 102 — math
// Lines 79527-79938 of readable/app.pretty.js (statement-aligned).
function $q(o, t = o.terrain) {
  let e = o._carve || [];
  (delete o._carve, (o.tunnelsAll ||= e));
  let s = e.filter((f) => qq(t, f.box || Bk(f)));
  t.holes ||= new Set();
  for (let f of s)
    ((t.tubes ||= []).push(f),
      (f.box = Bk(f)),
      (t.tubeBox = t.tubeBox
        ? [
            Math.min(t.tubeBox[0], f.box[0]),
            Math.min(t.tubeBox[1], f.box[1]),
            Math.max(t.tubeBox[2], f.box[2]),
            Math.max(t.tubeBox[3], f.box[3]),
          ]
        : f.box.slice()));
  t.inTube ||= (f, u) => {
    let d = t.tubeBox;
    if (!d || f < d[0] || f > d[2] || u < d[1] || u > d[3]) return !1;
    for (let p of t.tubes) {
      let m = p.box;
      if (f < m[0] || f > m[2] || u < m[1] || u > m[3]) continue;
      let [g, b] = yp(p, f, u);
      if (g > -2 && g < p.L + 2 && Math.abs(b) < p.W + wo + 2 + (p.dev || 0))
        return !0;
    }
    return !1;
  };
  let n = [
    [1 / 3, 1 / 3, 1 / 3],
    [0.5, 0.5, 0],
    [0, 0.5, 0.5],
    [0.5, 0, 0.5],
    [0.7, 0.15, 0.15],
    [0.15, 0.7, 0.15],
    [0.15, 0.15, 0.7],
    [0.45, 0.45, 0.1],
    [0.1, 0.45, 0.45],
    [0.45, 0.1, 0.45],
    [0.8, 0.2, 0],
    [0.2, 0, 0.8],
    [0, 0.8, 0.2],
  ];
  t.cutTri ||= (f, u, d, p, m, g, b, v, x) => {
    let y = t.tubeBox,
      M = Math.min(f, p, b),
      S = Math.max(f, p, b),
      w = Math.min(d, g, x),
      _ = Math.max(d, g, x);
    if (!y || S < y[0] || M > y[2] || _ < y[1] || w > y[3]) return !1;
    for (let z of t.tubes) {
      let A = z.box;
      if (!(S < A[0] || M > A[2] || _ < A[1] || w > A[3])) {
        {
          let T = z.W + wo + 1 + (z.dev || 0) + 6,
            E = yp(z, f, d),
            R = yp(z, p, g),
            P = yp(z, b, x),
            C = E[1],
            I = R[1],
            L = P[1];
          if ((C > T && I > T && L > T) || (C < -T && I < -T && L < -T))
            continue;
          let F = (E[0] + R[0] + P[0]) / 3;
          if (F < -8 || F > z.L + 8) continue;
          let O = sl(z, F),
            B = (z.tn.shape === "box" ? Gu(z.tn) : ch(z.tn) + hc(z.tn)) + 1.5;
          if (Math.min(u, m, v) > O + B || Math.max(u, m, v) < O - 1.5)
            continue;
        }
        for (let [T, E, R] of n)
          if (
            hw(
              z,
              f * T + p * E + b * R,
              u * T + m * E + v * R,
              d * T + g * E + x * R,
              0,
            )
          )
            return !0;
        if (hw(z, f, u, d, 0) || hw(z, p, m, g, 0) || hw(z, b, v, x, 0))
          return !0;
      }
    }
    return !1;
  };
  let i = t.step,
    a = [],
    r = [];
  for (let f of o.edges) {
    if (f.inner) continue;
    let u = 1e9,
      d = 1e9,
      p = -1e9,
      m = -1e9,
      g = 0;
    for (let b = 0; b < f.n; b++) {
      let v = f.P[b * 3],
        x = f.P[b * 3 + 1];
      (v < u && (u = v),
        v > p && (p = v),
        x < d && (d = x),
        x > m && (m = x),
        f.W[b] > g && (g = f.W[b]));
    }
    r.push([f, u - g - 2, d - g - 2, p + g + 2, m + g + 2]);
  }
  let l = (f, u) =>
    Math.max(
      ...f.bores.map((d) =>
        u === void 0 ? Math.max(-d.v0, d.v1) : u ? d.v1 : -d.v0,
      ),
    ) + 0.08;
  for (let f of s) {
    f.hw = [
      [f.W + 6, f.W + 6],
      [f.W + 6, f.W + 6],
    ];
    for (let u = 0; u < 2; u++) {
      let d = Ot(f.E, u ? f.E.L : 0, {});
      for (let p of s) {
        if (p === f) continue;
        let [m, g] = wp(p, d.x, d.z);
        if (m < -60 || m > p.L + 60 || Math.abs(g) > 40) continue;
        let b = Ot(p.E, Math.max(0, Math.min(p.E.L, m)), {}),
          [, v] = wp(f, b.x, b.z),
          x = v < 0 ? 0 : 1,
          y = wp(p, d.x, d.z)[1] < 0 ? 0 : 1;
        f.hw[u][x] = Math.max(
          l(f, x) + 0.1,
          Math.min(f.hw[u][x], Math.abs(v) - l(p, y) - 0.35),
        );
      }
    }
  }
  for (let f of s) {
    if (f.tn.twin) continue;
    let u = Math.ceil(f.L / 2) + 1,
      d = [new Float32Array(u).fill(99), new Float32Array(u).fill(99)],
      p = {},
      m = {},
      g = !1,
      b = [];
    for (let v of r) {
      let x = v[0];
      x === f.E ||
        x.tunnelR === f ||
        x.tunnel ||
        v[3] < f.box[0] ||
        v[1] > f.box[2] ||
        v[4] < f.box[1] ||
        v[2] > f.box[3] ||
        b.push(v);
    }
    if (b.length)
      for (let v = 0; v < u; v++) {
        Ot(f.E, Math.min(f.E.L, v * 2), p);
        let x = f.W + wo + 0.5,
          y = b
            .filter(
              (w) =>
                w[1] < p.x + x &&
                w[3] > p.x - x &&
                w[2] < p.z + x &&
                w[4] > p.z - x,
            )
            .map((w) => w[0]);
        if (!y.length) continue;
        let M = y.filter(
            (w) => (ys(w, p.x, p.z, m), m.d < m.w && Math.abs(m.y - p.y) < 3),
          ),
          S = y.filter((w) => !M.includes(w));
        if (S.length)
          for (let [w, _] of [
            [0, -1],
            [1, 1],
          ])
            for (let z = f.W - 0.3; z <= f.W + wo + 0.3; z += 0.2) {
              let A = p.x - p.dz * z * _,
                T = p.z + p.dx * z * _;
              if (
                S.some(
                  (E) => (
                    ys(E, A, T, m),
                    m.d <= m.w &&
                      m.s >= E.s0 &&
                      m.s <= E.s1 &&
                      Math.abs(m.y - p.y) < 3
                  ),
                )
              ) {
                ((d[w][v] = z - 0.05), (g = !0));
                break;
              }
            }
      }
    if (g) {
      for (let v of d) {
        let x = v.slice();
        for (let y = 0; y < u; y++) {
          let M = 99;
          for (let S = -2; S <= 2; S++)
            M = Math.min(M, x[Math.min(u - 1, Math.max(0, y + S))]);
          v[y] = M;
        }
      }
      f.lim = d;
    }
  }
  let c = (f, u, d) =>
    f.hw ? f.hw[u < f.L / 2 ? 0 : 1][d < 0 ? 0 : 1] : f.W + 6;
  for (let f of s) {
    let u = f.W + wo + 0.8,
      d = u + i * 1.5,
      p = 24,
      m = f.box,
      g = Math.max(0, Math.floor((m[0] - p - t.x0) / i)),
      b = Math.min(t.nx - 1, Math.ceil((m[2] + p - t.x0) / i)),
      v = Math.max(0, Math.floor((m[1] - p - t.z0) / i)),
      x = Math.min(t.nz - 1, Math.ceil((m[3] + p - t.z0) / i)),
      y = [];
    for (let P of r) {
      let C = P[0];
      C === f.E ||
        C.tunnelR === f ||
        P[3] < m[0] - 30 ||
        P[1] > m[2] + 30 ||
        P[4] < m[1] - 30 ||
        P[2] > m[3] + 30 ||
        y.push(P);
    }
    let M = {},
      S = (P, C, I) => {
        for (let [L, F, O, B, H] of y)
          if (
            !(P < F || P > B || C < O || C > H) &&
            (ys(L, P, C, M),
            M.d < M.w + 2 && M.s > L.s0 - 1 && M.s < L.s1 + 1 && M.y < I - 1.5)
          )
            return !0;
        return !1;
      },
      w = (P, C) =>
        Math.abs(C) < c(f, P, C) &&
        ((P > -0.6 && P < lh) || (P > f.L - lh && P < f.L + 0.6)),
      _ = (P, C) =>
        Math.abs(C) < c(f, P, C) &&
        ((P > -i - 0.6 && P < 6.5) || (P > f.L - 6.5 && P < f.L + i + 0.6)),
      z = b - g + 1,
      A = new Float32Array(z * (x - v + 1) * 2),
      T = 0;
    for (let P = 0; P < f.E.n; P++)
      T = Math.max(T, Math.abs(yp(f, f.E.P[P * 3], f.E.P[P * 3 + 1])[1]));
    f.dev = T;
    let R = {
      R: f,
      ia: g,
      ib: b,
      ja: v,
      jb: x,
      nI: z,
      half0: u,
      half: d,
      inBlock: w,
      near: _,
      lowRoad: S,
      SV: A,
      sv: (P) => {
        let C = (P % t.nx) - g,
          I = Math.floor(P / t.nx) - v;
        if (C < 0 || C >= z || I < 0 || I > x - v) return null;
        let L = (I * z + C) * 2;
        return [A[L], A[L + 1]];
      },
    };
    (a.push(R), (f.top = [-1e9, -1e9]));
    for (let P = v; P <= x; P++)
      for (let C = g; C <= b; C++) {
        let I = t.x0 + C * i,
          L = t.z0 + P * i,
          F = yp(f, I, L),
          O = P * t.nx + C,
          B = ((P - v) * z + C - g) * 2;
        if (Math.abs(F[1]) > T + f.W + 30) {
          ((A[B] = F[0]), (A[B + 1] = 1e4 * Math.sign(F[1])));
          continue;
        }
        let [H, N] = wp(f, I, L);
        if (((A[B] = H), (A[B + 1] = N), w(H, N))) {
          let D = H < f.L / 2 ? 0 : 1;
          f.top[D] = Math.max(f.top[D], t.h[O]);
        }
      }
  }
  let h = (f, u, d) => u >= 6.5 && u <= f.R.L - 6.5 && Math.abs(d) < f.half0;
  for (let f of a) {
    let { R: u, SV: d, nI: p } = f;
    for (let m = 0; m < d.length; m += 2) {
      let g = d[m],
        b = d[m + 1],
        v = (f.ja + Math.floor(m / 2 / p)) * t.nx + f.ia + ((m / 2) % p);
      if (!(g >= 6.5 && g <= u.L - 6.5) || Math.abs(b) >= f.half) continue;
      let x = sl(u, g) + u.roof + 0.3;
      t.h[v] >= x ||
        (Math.abs(b) >= f.half0 &&
          f.lowRoad(
            t.x0 + (v % t.nx) * i,
            t.z0 + Math.floor(v / t.nx) * i,
            x,
          )) ||
        (t.h[v] = x);
    }
  }
  for (let f of a) {
    let { R: u, SV: d, nI: p } = f;
    for (let m = 0; m < d.length; m += 2) {
      let g = d[m],
        b = d[m + 1],
        v = (f.ja + Math.floor(m / 2 / p)) * t.nx + f.ia + ((m / 2) % p);
      if (!f.near(g, b)) continue;
      let x = !1;
      for (let y of a)
        if (y !== f) {
          let M = y.sv(v);
          if (M && h(y, M[0], M[1])) {
            x = !0;
            break;
          }
        }
      x || (t.h[v] = Math.min(t.h[v], sl(u, g) - 0.3));
    }
  }
  for (let f of a) {
    let { R: u } = f;
    if (u.tn.key === "broadway")
      for (let d of [u.Ja, u.Jb])
        for (let p of o.edges) {
          if (p.synthetic || p.inner || (p.ja !== d.id && p.jb !== d.id))
            continue;
          let m = {};
          for (let g = 0; g <= Math.min(p.L, 140); g += 1) {
            Ot(p, p.ja === d.id ? g : p.L - g, m);
            let b = 0.4;
            if (p.W0) {
              let v = p.ja === d.id ? g : p.L - g,
                x = 0;
              for (; x + 2 < p.n && p.S[x + 1] < v;) x++;
              b = Math.max(b, p.W0[x] - p.W[x] + 0.4);
            }
            if (p.drop) {
              let v = p.ja === d.id ? g : p.L - g,
                x = 0;
              for (; x + 2 < p.n && p.S[x + 1] < v;) x++;
              Math.max(p.drop[x], p.drop[x + 1]) > 0.05 &&
                (b = Math.max(b, 2.4));
            }
            for (let v = -m.w - b; v <= m.w + b; v += 1) {
              let x = m.x + m.nx * v,
                y = m.z + m.nz * v,
                M = Math.round((x - t.x0) / i),
                S = Math.round((y - t.z0) / i);
              if (M < 0 || S < 0 || M >= t.nx || S >= t.nz) continue;
              let w = S * t.nx + M;
              t.h[w] > m.y - 0.25 && (t.h[w] = m.y - 0.25);
            }
          }
        }
  }
  for (let f of a) {
    let { R: u } = f;
    for (let d = 0; d < 2; d++) {
      let p = sl(u, d ? u.L : 0);
      (u.tn.key === "broadway" &&
        d === 1 &&
        (u.top[d] = Math.max(u.top[d], p + u.roof + 7)),
        (u.top[d] =
          u.tn.portals === "hood"
            ? p + u.roof + 2
            : Math.min(
                p + u.roof + 14,
                Math.max(p + u.roof + 2.2, u.top[d] + 0.3),
              )));
      let m = Kpt(o, u, d, p);
      m < u.top[d] && (u.top[d] = Math.max(p + Ok(u.tn) - 0.3, m - 0.05));
    }
    u.foot = [sl(u, 0) - 1.2, sl(u, u.L) - 1.2];
    for (let d = f.ja; d < f.jb; d++)
      for (let p = f.ia; p < f.ib; p++) {
        let m = !0,
          g = 0;
        for (let [b, v] of [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]) {
          let x = (d + v) * t.nx + p + b,
            [y, M] = f.sv(x);
          if (!f.inBlock(y + (y < u.L / 2 ? -0.6 : 0.6), M)) {
            m = !1;
            break;
          }
          if (((g = y < u.L / 2 ? 0 : 1), t.h[x] > u.top[g] + 0.2)) {
            m = !1;
            break;
          }
        }
        m && t.holes.add(d * t.nx + p);
      }
  }
}
