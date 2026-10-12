// app 279 — math
// Lines 137372-137646 of readable/app.pretty.js (statement-aligned).
function g_(i, t, e, s, n, o = null) {
  let a = new Ce(),
    r = i.step * n,
    l = Math.round((t * s - i.x0) / i.step),
    c = Math.round((e * s - i.z0) / i.step),
    h = s / r,
    f = (E, A) => [
      Math.min(i.nx - 1, Math.max(0, l + E * n)),
      Math.min(i.nz - 1, Math.max(0, c + A * n)),
    ];
  if (l + h * n < 0 || c + h * n < 0 || l >= i.nx || c >= i.nz) return null;
  let u = (E, A) => {
      let [C, P] = f(E, A);
      return i.h[P * i.nx + C];
    },
    d = a.v,
    p = [],
    m = [],
    g = (E, A, C) => (n === 1 ? C : Zbt(i, E, A, n));
  for (let E = 0; E <= h; E++)
    for (let A = 0; A <= h; A++) {
      let [C, P] = f(A, E),
        I = i.x0 + C * i.step,
        L = i.z0 + P * i.step,
        F = i.h[P * i.nx + C],
        N = g(C, P, F);
      m.push(F);
      let B = u(A + 1, E) - u(A - 1, E),
        H = u(A, E + 1) - u(A, E - 1),
        O = -B / (2 * r),
        D = -H / (2 * r),
        U = Math.hypot(O, 1, D);
      ((O /= U),
        (D /= U),
        a.vert(
          I,
          N,
          L,
          O,
          1 / U,
          D,
          I,
          L,
          iI(i, C, P, I, L, o, i.key ? [O, 1 / U, D] : null, n === 1),
        ),
        p.push([I, N, L]));
    }
  let b = n === 1 ? i.holes : null,
    x = i.tubeBox,
    v = i.x0 + l * i.step,
    y = i.z0 + c * i.step,
    M =
      i.cutTri &&
      x &&
      (i.tubes || []).some((E) => {
        let A = E.box;
        return !(v + s < A[0] || v > A[2] || y + s < A[1] || y > A[3]);
      }),
    S = !!i.clipBox,
    w = i.clipBox,
    z = (E, A) => {
      let C = i.x0 + (l + E * n) * i.step,
        P = i.z0 + (c + A * n) * i.step;
      return (
        C >= w[0] - 0.01 &&
        P >= w[1] - 0.01 &&
        C <= w[2] + 0.01 &&
        P <= w[3] + 0.01
      );
    };
  for (let E = 0; E < h; E++)
    for (let A = 0; A < h; A++) {
      if (
        (b && b.has((c + E) * i.nx + l + A)) ||
        (S && !(z(A, E) && z(A + 1, E + 1)))
      )
        continue;
      let C = d + E * (h + 1) + A,
        P = C + 1,
        I = C + h + 2,
        L = C + h + 1;
      if (M) {
        let F = (N) => p[N - d];
        for (let [N, B, H] of [
          [C, I, P],
          [C, L, I],
        ]) {
          let O = F(N),
            D = F(B),
            U = F(H);
          if (i.cutTri(O[0], O[1], O[2], D[0], D[1], D[2], U[0], U[1], U[2])) {
            (a.cut ||= []).push([O, D, U]);
            continue;
          }
          a.tri(N, B, H);
        }
        continue;
      }
      (a.tri(C, I, P), a.tri(C, L, I));
    }
  let _ = (E) => {
      for (let A = 0; A + 1 < E.length; A++) {
        let C = p[E[A]],
          P = p[E[A + 1]];
        if (S) {
          let L = E[A],
            F = E[A + 1];
          if (
            !z(L % (h + 1), Math.floor(L / (h + 1))) ||
            !z(F % (h + 1), Math.floor(F / (h + 1)))
          )
            continue;
        }
        let I = S ? 15 : 3;
        (i.inTube && (i.inTube(C[0], C[2]) || i.inTube(P[0], P[2]))) ||
          a.wall(
            C[0],
            C[2],
            P[0],
            P[2],
            C[1] - I,
            P[1] - I,
            Math.max(C[1], m[E[A]]),
            Math.max(P[1], m[E[A + 1]]),
            [0.08, 0.08, 0.06, 0],
            0,
            0,
          );
      }
    },
    R = (E) => Array.from({ length: h + 1 }, (A, C) => E * (h + 1) + C),
    T = (E) => Array.from({ length: h + 1 }, (A, C) => C * (h + 1) + E);
  if ((_(R(0).reverse()), _(R(h)), _(T(0)), _(T(h).reverse()), S)) {
    let E = (C, P) =>
        C >= 0 && P >= 0 && C < h && P < h && z(C, P) && z(C + 1, P + 1),
      A = (C, P) => P * (h + 1) + C;
    for (let C = 0; C < h; C++)
      for (let P = 0; P < h; P++)
        E(P, C) &&
          (P + 1 < h && !E(P + 1, C) && _([A(P + 1, C + 1), A(P + 1, C)]),
          P > 0 && !E(P - 1, C) && _([A(P, C), A(P, C + 1)]),
          C + 1 < h && !E(P, C + 1) && _([A(P, C + 1), A(P + 1, C + 1)]),
          C > 0 && !E(P, C - 1) && _([A(P + 1, C), A(P, C)]));
  }
  return a;
}
var oI = (i, t) => {
    let e = Math.sin(i * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  },
  Qbt = (i, t) =>
    oI(Math.floor(i / 90), Math.floor(t / 90)) * 0.6 +
    oI(Math.floor(i / 230), Math.floor(t / 230)) * 0.4,
  Mi = 256,
  dp = 512,
  bl = dp / Mi,
  iJ = { concrete: 0, brick: 1, granite: 2, dg: 3, asphalt: 4, mulch: 5 };
function aI(i, t, e = null) {
  let s = e || {
      areas: [],
      lines: [],
      green: [],
      trees: new Map(),
      idx: new Map(),
      dirty: new Set(),
    },
    n = (a) => {
      let r = 1e9,
        l = 1e9,
        c = -1e9,
        h = -1e9;
      for (let f = 0; f < a.length; f += 2)
        ((r = Math.min(r, a[f])),
          (c = Math.max(c, a[f])),
          (l = Math.min(l, a[f + 1])),
          (h = Math.max(h, a[f + 1])));
      return [r, l, c, h];
    },
    o = (a, r) => {
      a.push(r);
      let [l, c, h, f] = r.bb;
      for (let u = Math.floor(l / Mi); u <= Math.floor(h / Mi); u++)
        for (let d = Math.floor(c / Mi); d <= Math.floor(f / Mi); d++) {
          let p = u + "," + d;
          s.dirty?.add(p);
          let m = s.idx.get(p);
          (m || s.idx.set(p, (m = { areas: [], lines: [], green: [] })),
            m[a === s.areas ? "areas" : a === s.lines ? "lines" : "green"].push(
              r,
            ));
        }
    };
  for (let a of [t].flat()) {
    if (!a) continue;
    let r = ga(a);
    for (let l = 0; l + 1 < r.gPoly.length; l++) {
      let c = [];
      for (let f = r.gPoly[l]; f < r.gPoly[l + 1]; f++)
        c.push(r.gPts.subarray(r.gRing[f] * 2, r.gRing[f + 1] * 2));
      let h = r.gC[l];
      (h & 15) === 1 && o(s.green, { rings: c, park: !!(h & 16), bb: n(c[0]) });
    }
  }
  for (let a of [i].flat()) {
    if (!a) continue;
    let r = ga(a);
    for (let l = 0; l + 1 < r.aStart.length; l++) {
      let c = [];
      for (let h = r.aStart[l]; h < r.aStart[l + 1]; h++)
        c.push(r.aPts.subarray(r.aRing[h] * 2, r.aRing[h + 1] * 2));
      c.length &&
        o(s.areas, { rings: c, c: r.aC[l] & 15, m: r.aC[l] >> 4, bb: n(c[0]) });
    }
    for (let l = 0; l + 1 < r.lStart.length; l++) {
      let c = r.lPts.subarray(r.lStart[l] * 2, r.lStart[l + 1] * 2);
      o(s.lines, {
        pts: c,
        w: r.lW[l] / 10,
        m: r.lM[l],
        bb: n(c).map((h, f) => h + (f < 2 ? -4 : 4)),
      });
    }
  }
  return (s.areas.sort((a, r) => a.c - r.c), s);
}
function x_(i, t) {
  for (let e of t) {
    if (e.kind !== "tree" && e.kind !== "palm") continue;
    let s = Math.floor(e.x / Mi) + "," + Math.floor(e.z / Mi);
    i.dirty?.add(s);
    let n = i.trees.get(s);
    n || i.trees.set(s, (n = []));
    let o = e.sp || "",
      a =
        (e.kind === "palm"
          ? 3.2
          : /cypress|euc|pine/.test(o)
            ? 6
            : o === "fpalm"
              ? 2.2
              : 4.6) * (e.scale || 1);
    n.push([e.x, e.z, a, e.sp ? 1 : 0]);
  }
}
function gx(i, t, e) {
  let s = i.idx.get(Math.floor(t / Mi) + "," + Math.floor(e / Mi));
  if (!s) return -1;
  for (let n = s.areas.length - 1; n >= 0; n--) {
    let o = s.areas[n];
    if (
      !(
        o.c !== 1 ||
        t < o.bb[0] ||
        t > o.bb[2] ||
        e < o.bb[1] ||
        e > o.bb[3]
      ) &&
      b_(o.rings, t, e)
    )
      return o.m;
  }
  return -1;
}
function b_(i, t, e) {
  let s = !1;
  for (let n of i)
    for (let o = 0, a = n.length - 2; o < n.length; a = o, o += 2) {
      let r = n[o + 1],
        l = n[a + 1];
      r > e != l > e &&
        t < n[a] + ((e - l) * (n[o] - n[a])) / (r - l) &&
        (s = !s);
    }
  return s;
}
