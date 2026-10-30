// app 146 — math
// Lines 93519-93860 of readable/app.pretty.js (statement-aligned).
function imt(o, t) {
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
    i = (f) => !(f[2] < -6700 || f[0] > -5200 || f[3] < -1e3 || f[1] > -550),
    a = o.edges.filter((f) => e(f) && !f.inner && i((f._bx = n(f))));
  for (let f of t)
    for (let [u, d, p] of [
      [f[0].ja, f[0], 0],
      [f[f.length - 1].jb, f[f.length - 1], f[f.length - 1].n - 1],
    ]) {
      let m = d.P[p * 3 + 2];
      for (let g of a) {
        if (s.has(g)) continue;
        let b = g.ja === u,
          v = g.jb === u;
        if (!b && !v) continue;
        let x = m - g.P[(b ? 0 : g.n - 1) * 3 + 2];
        if (!(Math.abs(x) < 0.01 || Math.abs(x) > 1.5))
          for (let y = 0; y < g.n; y++) {
            let M = b ? g.S[y] : g.L - g.S[y];
            if (M >= 25) continue;
            let S = 1 - M / 25;
            g.P[y * 3 + 2] += x * S * S * (3 - 2 * S);
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
  for (let f of o.edges) {
    if (f.inner || f.layered || f.tunnel || e(f) || f.synthetic) continue;
    {
      let P = f.P[0],
        C = f.P[1],
        I = f.L + 20;
      if (P + I < c[0] || P - I > c[2] || C + I < c[1] || C - I > c[3])
        continue;
    }
    let u = n(f);
    if (!(u[2] > c[0] && u[0] < c[2] && u[3] > c[1] && u[1] < c[3])) continue;
    let d = a.filter(
      (P) =>
        P._bx[0] < u[2] &&
        P._bx[2] > u[0] &&
        P._bx[1] < u[3] &&
        P._bx[3] > u[1],
    );
    if (!d.length) continue;
    let p = [],
      m = new Uint8Array(Math.ceil(f.L / 4) + 2),
      g = !1,
      b = 0;
    for (let P = 0; P * 4 <= f.L + 4; P++) {
      let C = Math.min(f.L, P * 4);
      for (; b + 2 < f.n && f.S[b + 1] < C;) b++;
      let I = (C - f.S[b]) / Math.max(1e-6, f.S[b + 1] - f.S[b]),
        L = f.P[b * 3] + (f.P[b * 3 + 3] - f.P[b * 3]) * I,
        F = f.P[b * 3 + 1] + (f.P[b * 3 + 4] - f.P[b * 3 + 1]) * I;
      if (h.has(Math.floor(L / 16) * 65536 + Math.floor(F / 16))) {
        Ot(f, C, l);
        for (let O of d) {
          let B = O._bx;
          if (
            !(
              l.x < B[0] - l.w ||
              l.x > B[2] + l.w ||
              l.z < B[1] - l.w ||
              l.z > B[3] + l.w
            ) &&
            (ys(O, l.x, l.z, r), r.d < r.w + l.w + 3 && Math.abs(r.y - l.y) < 3)
          ) {
            ((m[P] = 1), (g = !0));
            break;
          }
        }
      }
    }
    if (!g) continue;
    for (let P = 8; P <= f.L - 8; P += 1) {
      let C = Math.floor(P / 4);
      if (!m[C] && !m[C + 1]) continue;
      Ot(f, P, l);
      let I = null;
      for (let L of [-l.w, -l.w / 2, 0, l.w / 2, l.w]) {
        let F = l.x + l.nx * L,
          O = l.z + l.nz * L;
        for (let B of d) {
          let H = B._bx;
          F < H[0] ||
            F > H[2] ||
            O < H[1] ||
            O > H[3] ||
            (ys(B, F, O, r),
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
        p.push([P, I.y - 0.02 - l.y]);
        let L = I.M;
        ((L.maskS ||= [1e9, -1e9]),
          (L.maskS[0] = Math.min(L.maskS[0], I.s - 12)),
          (L.maskS[1] = Math.max(L.maskS[1], I.s + 12)));
      }
    }
    if (!p.length) continue;
    let v = (P) => {
        let C = p[0],
          I = p[p.length - 1];
        if (P <= C[0]) {
          let B = Math.max(0, 1 - (C[0] - P) / 18);
          return C[1] * B * B * (3 - 2 * B);
        }
        if (P >= I[0]) {
          let B = Math.max(0, 1 - (P - I[0]) / 18);
          return I[1] * B * B * (3 - 2 * B);
        }
        let L = 0;
        for (; L + 1 < p.length && p[L + 1][0] < P;) L++;
        let F = p[L],
          O = p[L + 1];
        return (
          F[1] + ((O[1] - F[1]) * (P - F[0])) / Math.max(1e-6, O[0] - F[0])
        );
      },
      x = Math.max(0.5, p[0][0] - 18),
      y = Math.min(f.L - 0.5, p[p.length - 1][0] + 18),
      M = [],
      S = [];
    for (let P = 0; P < f.n; P++) {
      let C = f.S[P];
      if (!(C > x && C < y)) {
        if (C >= y && (!M.length || M[M.length - 1][3] < y))
          for (let I = x; I <= y; I += 1)
            (Ot(f, I, l), M.push([l.x, l.z, l.y, I, l.w]));
        M.push([f.P[P * 3], f.P[P * 3 + 1], f.P[P * 3 + 2], C, f.W[P]]);
      }
    }
    {
      let P = o.terrain,
        C = Math.max(...f.W) + (f.sw || 0) + 1.5,
        I = Math.min(u[0], u[2]),
        L = {};
      for (
        let F = Math.max(0, Math.floor((u[1] - 8 - P.z0) / P.step));
        F <= Math.min(P.nz - 1, Math.ceil((u[3] + 8 - P.z0) / P.step));
        F++
      )
        for (
          let O = Math.max(0, Math.floor((I - 8 - P.x0) / P.step));
          O <= Math.min(P.nx - 1, Math.ceil((u[2] + 8 - P.x0) / P.step));
          O++
        ) {
          let B = P.x0 + O * P.step,
            H = P.z0 + F * P.step;
          if ((ys(f, B, H, L), L.d > C + 6 || L.s < x || L.s > y)) continue;
          let N = v(L.s);
          if (N > -0.05) continue;
          let D = F * P.nx + O,
            U = L.y + N - 0.25 + Math.max(0, L.d - C);
          P.h[D] > U && (P.h[D] = U);
        }
    }
    {
      let P = [1e9, 1e9, -1e9, -1e9],
        C = Math.max(...f.W) + (f.sw || 0) + 2;
      for (let I = x; I <= y + 1; I += 2)
        (Ot(f, Math.min(I, y), l),
          (P[0] = Math.min(P[0], l.x - C)),
          (P[1] = Math.min(P[1], l.z - C)),
          (P[2] = Math.max(P[2], l.x + C)),
          (P[3] = Math.max(P[3], l.z + C)));
      (o.atGrade ||= []).push({ F: f, corr: v, box: P, s0: x, s1: y });
    }
    let w = f.L,
      _ = f.ta,
      z = f.tb,
      A = f.s0,
      T = f.s1;
    ((f.P = new Float32Array(
      M.flatMap((P) => [
        P[0],
        P[1],
        P[2] + (P[3] > 0 && P[3] < w ? v(P[3]) : 0),
      ]),
    )),
      (f.W = new Float32Array(M.map((P) => P[4]))),
      delete f._gb,
      Tr(f));
    let E = f.L / w;
    ((f.ta = _ * E),
      (f.tb = z * E),
      (f.s0 = A * E),
      (f.s1 = f.L - (w - T) * E));
    let R = [];
    for (let [P] of p) {
      let C = R[R.length - 1];
      C && P - C[1] <= 1.01 ? (C[1] = P) : R.push([P, P]);
    }
    f.xingS = R.map(([P, C]) => [(P - 0.25) * E, (C + 0.25) * E]);
  }
}
function h$(o) {
  if (!o.atGrade) return;
  let t = performance.now(),
    e = new Set();
  for (let f of o.atGrade) {
    let u = f.box;
    for (
      let d = Math.floor((u[0] - 4) / jk);
      d <= Math.floor((u[2] + 4) / jk);
      d++
    )
      for (
        let p = Math.floor((u[1] - 4) / jk);
        p <= Math.floor((u[3] + 4) / jk);
        p++
      )
        e.add(d + "," + p);
  }
  let s = [1e9, 1e9, -1e9, -1e9];
  for (let f of o.atGrade) {
    let u = f.box;
    ((f.r = Math.max(...f.F.W) + (f.F.sw || 0) + 2),
      (s[0] = Math.min(s[0], u[0])),
      (s[1] = Math.min(s[1], u[1])),
      (s[2] = Math.max(s[2], u[2])),
      (s[3] = Math.max(s[3], u[3])));
  }
  let n = {},
    i = (f, u) => {
      if (f < s[0] || f > s[2] || u < s[1] || u > s[3]) return 0;
      for (let d of o.atGrade) {
        let p = d.box;
        if (
          f < p[0] ||
          f > p[2] ||
          u < p[1] ||
          u > p[3] ||
          (ys(d.F, f, u, n), n.d > d.r || n.s < d.s0 || n.s > d.s1)
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
    for (let u of o.walks.get(f) || [])
      u.ys &&
        u.forEach((d, p) => {
          let m = u.ys[p];
          for (let g = 0; g < m.length; g++) {
            let b = i(d[g * 2], d[g * 2 + 1]);
            b && ((m[g] += b), a++);
          }
        });
  for (let f of e)
    for (let u of o.curbs.get(f) || [])
      if (u.ys)
        for (let d = 0; d < u.ys.length; d++) {
          let p = i(u[d * 2], u[d * 2 + 1]);
          p && ((u.ys[d] += p), r++);
        }
  let c = o.props,
    h = c.pf;
  for (let f = 0; f < c.n; f++) {
    let u = h[f * 5],
      d = h[f * 5 + 1];
    if (u < s[0] || u > s[2] || d < s[1] || d > s[3]) continue;
    let p = i(u, d);
    p && ((h[f * 5 + 2] += p), l++);
  }
  ((o.atGradeMoved = { walks: a, curbs: r, props: l }),
    ((o.atGradeT ||= {}).after = +(performance.now() - t).toFixed(1)));
}
function omt(o) {
  return {
    terrainAt: (t, e) => {
      let s = (t - o.x0) / o.step,
        n = (e - o.z0) / o.step,
        i = Math.min(o.nx - 2, Math.max(0, Math.floor(s))),
        a = Math.min(o.nz - 2, Math.max(0, Math.floor(n))),
        r = Math.min(1, Math.max(0, s - i)),
        l = Math.min(1, Math.max(0, n - a)),
        c = o.h,
        h = o.nx,
        f = c[a * h + i],
        u = c[a * h + i + 1],
        d = c[(a + 1) * h + i],
        p = c[(a + 1) * h + i + 1];
      return r >= l
        ? f + (u - f) * r + (p - u) * l
        : f + (p - d) * r + (d - f) * l;
    },
  };
}
