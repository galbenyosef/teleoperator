// app 147 — math
// Lines 93250-93591 of readable/app.pretty.js (statement-aligned).
function Nut(i, t) {
  let e = (f) => f.cls === "motorway" || f.cls === "motorway_link",
    s = new Set(t.flat()),
    n = (f) => {
      let u = 1e9,
        d = 1e9,
        p = -1e9,
        m = -1e9;
      for (let b = 0; b < f.n; b++)
        ((u = Math.min(u, f.P[b * 3])),
          (p = Math.max(p, f.P[b * 3])),
          (d = Math.min(d, f.P[b * 3 + 1])),
          (m = Math.max(m, f.P[b * 3 + 1])));
      let g = Math.max(...f.W) + (f.sw || 0);
      return [u - g, d - g, p + g, m + g];
    },
    o = (f) => !(f[2] < -6700 || f[0] > -5200 || f[3] < -1e3 || f[1] > -550),
    a = i.edges.filter((f) => e(f) && !f.inner && o((f._bx = n(f))));
  for (let f of t)
    for (let [u, d, p] of [
      [f[0].ja, f[0], 0],
      [f[f.length - 1].jb, f[f.length - 1], f[f.length - 1].n - 1],
    ]) {
      let m = d.P[p * 3 + 2];
      for (let g of a) {
        if (s.has(g)) continue;
        let b = g.ja === u,
          x = g.jb === u;
        if (!b && !x) continue;
        let v = m - g.P[(b ? 0 : g.n - 1) * 3 + 2];
        if (!(Math.abs(v) < 0.01 || Math.abs(v) > 1.5))
          for (let y = 0; y < g.n; y++) {
            let M = b ? g.S[y] : g.L - g.S[y];
            if (M >= 25) continue;
            let S = 1 - M / 25;
            g.P[y * 3 + 2] += v * S * S * (3 - 2 * S);
          }
      }
    }
  let r = {},
    l = {},
    c = [1e9, 1e9, -1e9, -1e9];
  for (let f of a)
    ((c[0] = Math.min(c[0], f._bx[0])),
      (c[1] = Math.min(c[1], f._bx[1])),
      (c[2] = Math.max(c[2], f._bx[2])),
      (c[3] = Math.max(c[3], f._bx[3])));
  let h = new Set();
  for (let f of a)
    for (let u = 0; u + 1 < f.n; u++) {
      let d = Math.max(f.W[u], f.W[u + 1]) + 10;
      for (
        let p = Math.floor((Math.min(f.P[u * 3], f.P[u * 3 + 3]) - d) / 16);
        p <= Math.floor((Math.max(f.P[u * 3], f.P[u * 3 + 3]) + d) / 16);
        p++
      )
        for (
          let m = Math.floor(
            (Math.min(f.P[u * 3 + 1], f.P[u * 3 + 4]) - d) / 16,
          );
          m <= Math.floor((Math.max(f.P[u * 3 + 1], f.P[u * 3 + 4]) + d) / 16);
          m++
        )
          h.add(p * 65536 + m);
    }
  for (let f of i.edges) {
    if (f.inner || f.layered || f.tunnel || e(f) || f.synthetic) continue;
    {
      let C = f.P[0],
        P = f.P[1],
        I = f.L + 20;
      if (C + I < c[0] || C - I > c[2] || P + I < c[1] || P - I > c[3])
        continue;
    }
    let u = n(f);
    if (!(u[2] > c[0] && u[0] < c[2] && u[3] > c[1] && u[1] < c[3])) continue;
    let d = a.filter(
      (C) =>
        C._bx[0] < u[2] &&
        C._bx[2] > u[0] &&
        C._bx[1] < u[3] &&
        C._bx[3] > u[1],
    );
    if (!d.length) continue;
    let p = [],
      m = new Uint8Array(Math.ceil(f.L / 4) + 2),
      g = !1,
      b = 0;
    for (let C = 0; C * 4 <= f.L + 4; C++) {
      let P = Math.min(f.L, C * 4);
      for (; b + 2 < f.n && f.S[b + 1] < P;) b++;
      let I = (P - f.S[b]) / Math.max(1e-6, f.S[b + 1] - f.S[b]),
        L = f.P[b * 3] + (f.P[b * 3 + 3] - f.P[b * 3]) * I,
        F = f.P[b * 3 + 1] + (f.P[b * 3 + 4] - f.P[b * 3 + 1]) * I;
      if (h.has(Math.floor(L / 16) * 65536 + Math.floor(F / 16))) {
        Ot(f, P, l);
        for (let N of d) {
          let B = N._bx;
          if (
            !(
              l.x < B[0] - l.w ||
              l.x > B[2] + l.w ||
              l.z < B[1] - l.w ||
              l.z > B[3] + l.w
            ) &&
            (vs(N, l.x, l.z, r), r.d < r.w + l.w + 3 && Math.abs(r.y - l.y) < 3)
          ) {
            ((m[C] = 1), (g = !0));
            break;
          }
        }
      }
    }
    if (!g) continue;
    for (let C = 8; C <= f.L - 8; C += 1) {
      let P = Math.floor(C / 4);
      if (!m[P] && !m[P + 1]) continue;
      Ot(f, C, l);
      let I = null;
      for (let L of [-l.w, -l.w / 2, 0, l.w / 2, l.w]) {
        let F = l.x + l.nx * L,
          N = l.z + l.nz * L;
        for (let B of d) {
          let H = B._bx;
          F < H[0] ||
            F > H[2] ||
            N < H[1] ||
            N > H[3] ||
            (vs(B, F, N, r),
            !(
              r.d > r.w + 0.3 ||
              r.s < 0.3 ||
              r.s > B.L - 0.3 ||
              Math.abs(r.y - l.y) > 1.5
            ) &&
              (!I || Math.abs(r.y - l.y) < Math.abs(I.y - l.y)) &&
              (I = { y: r.y, M: B, s: r.s }));
        }
      }
      if (I) {
        p.push([C, I.y - 0.02 - l.y]);
        let L = I.M;
        ((L.maskS ||= [1e9, -1e9]),
          (L.maskS[0] = Math.min(L.maskS[0], I.s - 12)),
          (L.maskS[1] = Math.max(L.maskS[1], I.s + 12)));
      }
    }
    if (!p.length) continue;
    let x = (C) => {
        let P = p[0],
          I = p[p.length - 1];
        if (C <= P[0]) {
          let B = Math.max(0, 1 - (P[0] - C) / 18);
          return P[1] * B * B * (3 - 2 * B);
        }
        if (C >= I[0]) {
          let B = Math.max(0, 1 - (C - I[0]) / 18);
          return I[1] * B * B * (3 - 2 * B);
        }
        let L = 0;
        for (; L + 1 < p.length && p[L + 1][0] < C;) L++;
        let F = p[L],
          N = p[L + 1];
        return (
          F[1] + ((N[1] - F[1]) * (C - F[0])) / Math.max(1e-6, N[0] - F[0])
        );
      },
      v = Math.max(0.5, p[0][0] - 18),
      y = Math.min(f.L - 0.5, p[p.length - 1][0] + 18),
      M = [],
      S = [];
    for (let C = 0; C < f.n; C++) {
      let P = f.S[C];
      if (!(P > v && P < y)) {
        if (P >= y && (!M.length || M[M.length - 1][3] < y))
          for (let I = v; I <= y; I += 1)
            (Ot(f, I, l), M.push([l.x, l.z, l.y, I, l.w]));
        M.push([f.P[C * 3], f.P[C * 3 + 1], f.P[C * 3 + 2], P, f.W[C]]);
      }
    }
    {
      let C = i.terrain,
        P = Math.max(...f.W) + (f.sw || 0) + 1.5,
        I = Math.min(u[0], u[2]),
        L = {};
      for (
        let F = Math.max(0, Math.floor((u[1] - 8 - C.z0) / C.step));
        F <= Math.min(C.nz - 1, Math.ceil((u[3] + 8 - C.z0) / C.step));
        F++
      )
        for (
          let N = Math.max(0, Math.floor((I - 8 - C.x0) / C.step));
          N <= Math.min(C.nx - 1, Math.ceil((u[2] + 8 - C.x0) / C.step));
          N++
        ) {
          let B = C.x0 + N * C.step,
            H = C.z0 + F * C.step;
          if ((vs(f, B, H, L), L.d > P + 6 || L.s < v || L.s > y)) continue;
          let O = x(L.s);
          if (O > -0.05) continue;
          let D = F * C.nx + N,
            U = L.y + O - 0.25 + Math.max(0, L.d - P);
          C.h[D] > U && (C.h[D] = U);
        }
    }
    {
      let C = [1e9, 1e9, -1e9, -1e9],
        P = Math.max(...f.W) + (f.sw || 0) + 2;
      for (let I = v; I <= y + 1; I += 2)
        (Ot(f, Math.min(I, y), l),
          (C[0] = Math.min(C[0], l.x - P)),
          (C[1] = Math.min(C[1], l.z - P)),
          (C[2] = Math.max(C[2], l.x + P)),
          (C[3] = Math.max(C[3], l.z + P)));
      (i.atGrade ||= []).push({ F: f, corr: x, box: C, s0: v, s1: y });
    }
    let w = f.L,
      z = f.ta,
      _ = f.tb,
      R = f.s0,
      T = f.s1;
    ((f.P = new Float32Array(
      M.flatMap((C) => [
        C[0],
        C[1],
        C[2] + (C[3] > 0 && C[3] < w ? x(C[3]) : 0),
      ]),
    )),
      (f.W = new Float32Array(M.map((C) => C[4]))),
      delete f._gb,
      dr(f));
    let E = f.L / w;
    ((f.ta = z * E),
      (f.tb = _ * E),
      (f.s0 = R * E),
      (f.s1 = f.L - (w - T) * E));
    let A = [];
    for (let [C] of p) {
      let P = A[A.length - 1];
      P && C - P[1] <= 1.01 ? (P[1] = C) : A.push([C, C]);
    }
    f.xingS = A.map(([C, P]) => [(C - 0.25) * E, (P + 0.25) * E]);
  }
}
function lj(i) {
  if (!i.atGrade) return;
  let t = performance.now(),
    e = new Set();
  for (let f of i.atGrade) {
    let u = f.box;
    for (
      let d = Math.floor((u[0] - 4) / VS);
      d <= Math.floor((u[2] + 4) / VS);
      d++
    )
      for (
        let p = Math.floor((u[1] - 4) / VS);
        p <= Math.floor((u[3] + 4) / VS);
        p++
      )
        e.add(d + "," + p);
  }
  let s = [1e9, 1e9, -1e9, -1e9];
  for (let f of i.atGrade) {
    let u = f.box;
    ((f.r = Math.max(...f.F.W) + (f.F.sw || 0) + 2),
      (s[0] = Math.min(s[0], u[0])),
      (s[1] = Math.min(s[1], u[1])),
      (s[2] = Math.max(s[2], u[2])),
      (s[3] = Math.max(s[3], u[3])));
  }
  let n = {},
    o = (f, u) => {
      if (f < s[0] || f > s[2] || u < s[1] || u > s[3]) return 0;
      for (let d of i.atGrade) {
        let p = d.box;
        if (
          f < p[0] ||
          f > p[2] ||
          u < p[1] ||
          u > p[3] ||
          (vs(d.F, f, u, n), n.d > d.r || n.s < d.s0 || n.s > d.s1)
        )
          continue;
        let m = d.corr(n.s);
        if (Math.abs(m) > 0.005) return m;
      }
      return 0;
    },
    a = 0,
    r = 0,
    l = 0;
  for (let f of e)
    for (let u of i.walks.get(f) || [])
      u.ys &&
        u.forEach((d, p) => {
          let m = u.ys[p];
          for (let g = 0; g < m.length; g++) {
            let b = o(d[g * 2], d[g * 2 + 1]);
            b && ((m[g] += b), a++);
          }
        });
  for (let f of e)
    for (let u of i.curbs.get(f) || [])
      if (u.ys)
        for (let d = 0; d < u.ys.length; d++) {
          let p = o(u[d * 2], u[d * 2 + 1]);
          p && ((u.ys[d] += p), r++);
        }
  let c = i.props,
    h = c.pf;
  for (let f = 0; f < c.n; f++) {
    let u = h[f * 5],
      d = h[f * 5 + 1];
    if (u < s[0] || u > s[2] || d < s[1] || d > s[3]) continue;
    let p = o(u, d);
    p && ((h[f * 5 + 2] += p), l++);
  }
  ((i.atGradeMoved = { walks: a, curbs: r, props: l }),
    ((i.atGradeT ||= {}).after = +(performance.now() - t).toFixed(1)));
}
function But(i) {
  return {
    terrainAt: (t, e) => {
      let s = (t - i.x0) / i.step,
        n = (e - i.z0) / i.step,
        o = Math.min(i.nx - 2, Math.max(0, Math.floor(s))),
        a = Math.min(i.nz - 2, Math.max(0, Math.floor(n))),
        r = Math.min(1, Math.max(0, s - o)),
        l = Math.min(1, Math.max(0, n - a)),
        c = i.h,
        h = i.nx,
        f = c[a * h + o],
        u = c[a * h + o + 1],
        d = c[(a + 1) * h + o],
        p = c[(a + 1) * h + o + 1];
      return r >= l
        ? f + (u - f) * r + (p - u) * l
        : f + (p - d) * r + (d - f) * l;
    },
  };
}
