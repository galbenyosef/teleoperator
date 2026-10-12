// app 103 — math
// Lines 79291-79702 of readable/app.pretty.js (statement-aligned).
function jW(i, t = i.terrain) {
  let e = i._carve || [];
  (delete i._carve, (i.tunnelsAll ||= e));
  let s = e.filter((f) => WW(t, f.box || NS(f)));
  t.holes ||= new Set();
  for (let f of s)
    ((t.tubes ||= []).push(f),
      (f.box = NS(f)),
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
      let [g, b] = Ud(p, f, u);
      if (g > -2 && g < p.L + 2 && Math.abs(b) < p.W + lo + 2 + (p.dev || 0))
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
  t.cutTri ||= (f, u, d, p, m, g, b, x, v) => {
    let y = t.tubeBox,
      M = Math.min(f, p, b),
      S = Math.max(f, p, b),
      w = Math.min(d, g, v),
      z = Math.max(d, g, v);
    if (!y || S < y[0] || M > y[2] || z < y[1] || w > y[3]) return !1;
    for (let _ of t.tubes) {
      let R = _.box;
      if (!(S < R[0] || M > R[2] || z < R[1] || w > R[3])) {
        {
          let T = _.W + lo + 1 + (_.dev || 0) + 6,
            E = Ud(_, f, d),
            A = Ud(_, p, g),
            C = Ud(_, b, v),
            P = E[1],
            I = A[1],
            L = C[1];
          if ((P > T && I > T && L > T) || (P < -T && I < -T && L < -T))
            continue;
          let F = (E[0] + A[0] + C[0]) / 3;
          if (F < -8 || F > _.L + 8) continue;
          let N = L0(_, F),
            B = (_.tn.shape === "box" ? au(_.tn) : Ic(_.tn) + Wl(_.tn)) + 1.5;
          if (Math.min(u, m, x) > N + B || Math.max(u, m, x) < N - 1.5)
            continue;
        }
        for (let [T, E, A] of n)
          if (
            gy(
              _,
              f * T + p * E + b * A,
              u * T + m * E + x * A,
              d * T + g * E + v * A,
              0,
            )
          )
            return !0;
        if (gy(_, f, u, d, 0) || gy(_, p, m, g, 0) || gy(_, b, x, v, 0))
          return !0;
      }
    }
    return !1;
  };
  let o = t.step,
    a = [],
    r = [];
  for (let f of i.edges) {
    if (f.inner) continue;
    let u = 1e9,
      d = 1e9,
      p = -1e9,
      m = -1e9,
      g = 0;
    for (let b = 0; b < f.n; b++) {
      let x = f.P[b * 3],
        v = f.P[b * 3 + 1];
      (x < u && (u = x),
        x > p && (p = x),
        v < d && (d = v),
        v > m && (m = v),
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
        let [m, g] = Gd(p, d.x, d.z);
        if (m < -60 || m > p.L + 60 || Math.abs(g) > 40) continue;
        let b = Ot(p.E, Math.max(0, Math.min(p.E.L, m)), {}),
          [, x] = Gd(f, b.x, b.z),
          v = x < 0 ? 0 : 1,
          y = Gd(p, d.x, d.z)[1] < 0 ? 0 : 1;
        f.hw[u][v] = Math.max(
          l(f, v) + 0.1,
          Math.min(f.hw[u][v], Math.abs(x) - l(p, y) - 0.35),
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
    for (let x of r) {
      let v = x[0];
      v === f.E ||
        v.tunnelR === f ||
        v.tunnel ||
        x[3] < f.box[0] ||
        x[1] > f.box[2] ||
        x[4] < f.box[1] ||
        x[2] > f.box[3] ||
        b.push(x);
    }
    if (b.length)
      for (let x = 0; x < u; x++) {
        Ot(f.E, Math.min(f.E.L, x * 2), p);
        let v = f.W + lo + 0.5,
          y = b
            .filter(
              (w) =>
                w[1] < p.x + v &&
                w[3] > p.x - v &&
                w[2] < p.z + v &&
                w[4] > p.z - v,
            )
            .map((w) => w[0]);
        if (!y.length) continue;
        let M = y.filter(
            (w) => (vs(w, p.x, p.z, m), m.d < m.w && Math.abs(m.y - p.y) < 3),
          ),
          S = y.filter((w) => !M.includes(w));
        if (S.length)
          for (let [w, z] of [
            [0, -1],
            [1, 1],
          ])
            for (let _ = f.W - 0.3; _ <= f.W + lo + 0.3; _ += 0.2) {
              let R = p.x - p.dz * _ * z,
                T = p.z + p.dx * _ * z;
              if (
                S.some(
                  (E) => (
                    vs(E, R, T, m),
                    m.d <= m.w &&
                      m.s >= E.s0 &&
                      m.s <= E.s1 &&
                      Math.abs(m.y - p.y) < 3
                  ),
                )
              ) {
                ((d[w][x] = _ - 0.05), (g = !0));
                break;
              }
            }
      }
    if (g) {
      for (let x of d) {
        let v = x.slice();
        for (let y = 0; y < u; y++) {
          let M = 99;
          for (let S = -2; S <= 2; S++)
            M = Math.min(M, v[Math.min(u - 1, Math.max(0, y + S))]);
          x[y] = M;
        }
      }
      f.lim = d;
    }
  }
  let c = (f, u, d) =>
    f.hw ? f.hw[u < f.L / 2 ? 0 : 1][d < 0 ? 0 : 1] : f.W + 6;
  for (let f of s) {
    let u = f.W + lo + 0.8,
      d = u + o * 1.5,
      p = 24,
      m = f.box,
      g = Math.max(0, Math.floor((m[0] - p - t.x0) / o)),
      b = Math.min(t.nx - 1, Math.ceil((m[2] + p - t.x0) / o)),
      x = Math.max(0, Math.floor((m[1] - p - t.z0) / o)),
      v = Math.min(t.nz - 1, Math.ceil((m[3] + p - t.z0) / o)),
      y = [];
    for (let C of r) {
      let P = C[0];
      P === f.E ||
        P.tunnelR === f ||
        C[3] < m[0] - 30 ||
        C[1] > m[2] + 30 ||
        C[4] < m[1] - 30 ||
        C[2] > m[3] + 30 ||
        y.push(C);
    }
    let M = {},
      S = (C, P, I) => {
        for (let [L, F, N, B, H] of y)
          if (
            !(C < F || C > B || P < N || P > H) &&
            (vs(L, C, P, M),
            M.d < M.w + 2 && M.s > L.s0 - 1 && M.s < L.s1 + 1 && M.y < I - 1.5)
          )
            return !0;
        return !1;
      },
      w = (C, P) =>
        Math.abs(P) < c(f, C, P) &&
        ((C > -0.6 && C < Lc) || (C > f.L - Lc && C < f.L + 0.6)),
      z = (C, P) =>
        Math.abs(P) < c(f, C, P) &&
        ((C > -o - 0.6 && C < 6.5) || (C > f.L - 6.5 && C < f.L + o + 0.6)),
      _ = b - g + 1,
      R = new Float32Array(_ * (v - x + 1) * 2),
      T = 0;
    for (let C = 0; C < f.E.n; C++)
      T = Math.max(T, Math.abs(Ud(f, f.E.P[C * 3], f.E.P[C * 3 + 1])[1]));
    f.dev = T;
    let A = {
      R: f,
      ia: g,
      ib: b,
      ja: x,
      jb: v,
      nI: _,
      half0: u,
      half: d,
      inBlock: w,
      near: z,
      lowRoad: S,
      SV: R,
      sv: (C) => {
        let P = (C % t.nx) - g,
          I = Math.floor(C / t.nx) - x;
        if (P < 0 || P >= _ || I < 0 || I > v - x) return null;
        let L = (I * _ + P) * 2;
        return [R[L], R[L + 1]];
      },
    };
    (a.push(A), (f.top = [-1e9, -1e9]));
    for (let C = x; C <= v; C++)
      for (let P = g; P <= b; P++) {
        let I = t.x0 + P * o,
          L = t.z0 + C * o,
          F = Ud(f, I, L),
          N = C * t.nx + P,
          B = ((C - x) * _ + P - g) * 2;
        if (Math.abs(F[1]) > T + f.W + 30) {
          ((R[B] = F[0]), (R[B + 1] = 1e4 * Math.sign(F[1])));
          continue;
        }
        let [H, O] = Gd(f, I, L);
        if (((R[B] = H), (R[B + 1] = O), w(H, O))) {
          let D = H < f.L / 2 ? 0 : 1;
          f.top[D] = Math.max(f.top[D], t.h[N]);
        }
      }
  }
  let h = (f, u, d) => u >= 6.5 && u <= f.R.L - 6.5 && Math.abs(d) < f.half0;
  for (let f of a) {
    let { R: u, SV: d, nI: p } = f;
    for (let m = 0; m < d.length; m += 2) {
      let g = d[m],
        b = d[m + 1],
        x = (f.ja + Math.floor(m / 2 / p)) * t.nx + f.ia + ((m / 2) % p);
      if (!(g >= 6.5 && g <= u.L - 6.5) || Math.abs(b) >= f.half) continue;
      let v = L0(u, g) + u.roof + 0.3;
      t.h[x] >= v ||
        (Math.abs(b) >= f.half0 &&
          f.lowRoad(
            t.x0 + (x % t.nx) * o,
            t.z0 + Math.floor(x / t.nx) * o,
            v,
          )) ||
        (t.h[x] = v);
    }
  }
  for (let f of a) {
    let { R: u, SV: d, nI: p } = f;
    for (let m = 0; m < d.length; m += 2) {
      let g = d[m],
        b = d[m + 1],
        x = (f.ja + Math.floor(m / 2 / p)) * t.nx + f.ia + ((m / 2) % p);
      if (!f.near(g, b)) continue;
      let v = !1;
      for (let y of a)
        if (y !== f) {
          let M = y.sv(x);
          if (M && h(y, M[0], M[1])) {
            v = !0;
            break;
          }
        }
      v || (t.h[x] = Math.min(t.h[x], L0(u, g) - 0.3));
    }
  }
  for (let f of a) {
    let { R: u } = f;
    if (u.tn.key === "broadway")
      for (let d of [u.Ja, u.Jb])
        for (let p of i.edges) {
          if (p.synthetic || p.inner || (p.ja !== d.id && p.jb !== d.id))
            continue;
          let m = {};
          for (let g = 0; g <= Math.min(p.L, 140); g += 1) {
            Ot(p, p.ja === d.id ? g : p.L - g, m);
            let b = 0.4;
            if (p.W0) {
              let x = p.ja === d.id ? g : p.L - g,
                v = 0;
              for (; v + 2 < p.n && p.S[v + 1] < x;) v++;
              b = Math.max(b, p.W0[v] - p.W[v] + 0.4);
            }
            if (p.drop) {
              let x = p.ja === d.id ? g : p.L - g,
                v = 0;
              for (; v + 2 < p.n && p.S[v + 1] < x;) v++;
              Math.max(p.drop[v], p.drop[v + 1]) > 0.05 &&
                (b = Math.max(b, 2.4));
            }
            for (let x = -m.w - b; x <= m.w + b; x += 1) {
              let v = m.x + m.nx * x,
                y = m.z + m.nz * x,
                M = Math.round((v - t.x0) / o),
                S = Math.round((y - t.z0) / o);
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
      let p = L0(u, d ? u.L : 0);
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
      let m = Eft(i, u, d, p);
      m < u.top[d] && (u.top[d] = Math.max(p + FS(u.tn) - 0.3, m - 0.05));
    }
    u.foot = [L0(u, 0) - 1.2, L0(u, u.L) - 1.2];
    for (let d = f.ja; d < f.jb; d++)
      for (let p = f.ia; p < f.ib; p++) {
        let m = !0,
          g = 0;
        for (let [b, x] of [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]) {
          let v = (d + x) * t.nx + p + b,
            [y, M] = f.sv(v);
          if (!f.inBlock(y + (y < u.L / 2 ? -0.6 : 0.6), M)) {
            m = !1;
            break;
          }
          if (((g = y < u.L / 2 ? 0 : 1), t.h[v] > u.top[g] + 0.2)) {
            m = !1;
            break;
          }
        }
        m && t.holes.add(d * t.nx + p);
      }
  }
}
