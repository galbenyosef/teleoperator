// app 278 — math
// Lines 137641-137917 of readable/app.pretty.js (statement-aligned).
function g_(o, t, e, s, n, i = null) {
  let a = new Be(),
    r = o.step * n,
    l = Math.round((t * s - o.x0) / o.step),
    c = Math.round((e * s - o.z0) / o.step),
    h = s / r,
    f = (E, R) => [
      Math.min(o.nx - 1, Math.max(0, l + E * n)),
      Math.min(o.nz - 1, Math.max(0, c + R * n)),
    ];
  if (l + h * n < 0 || c + h * n < 0 || l >= o.nx || c >= o.nz) return null;
  let u = (E, R) => {
      let [P, C] = f(E, R);
      return o.h[C * o.nx + P];
    },
    d = a.v,
    p = [],
    m = [],
    g = (E, R, P) => (n === 1 ? P : Myt(o, E, R, n));
  for (let E = 0; E <= h; E++)
    for (let R = 0; R <= h; R++) {
      let [P, C] = f(R, E),
        I = o.x0 + P * o.step,
        L = o.z0 + C * o.step,
        F = o.h[C * o.nx + P],
        O = g(P, C, F);
      m.push(F);
      let B = u(R + 1, E) - u(R - 1, E),
        H = u(R, E + 1) - u(R, E - 1),
        N = -B / (2 * r),
        D = -H / (2 * r),
        U = Math.hypot(N, 1, D);
      ((N /= U),
        (D /= U),
        a.vert(
          I,
          O,
          L,
          N,
          1 / U,
          D,
          I,
          L,
          IF(o, P, C, I, L, i, o.key ? [N, 1 / U, D] : null, n === 1),
        ),
        p.push([I, O, L]));
    }
  let b = n === 1 ? o.holes : null,
    v = o.tubeBox,
    x = o.x0 + l * o.step,
    y = o.z0 + c * o.step,
    M =
      o.cutTri &&
      v &&
      (o.tubes || []).some((E) => {
        let R = E.box;
        return !(x + s < R[0] || x > R[2] || y + s < R[1] || y > R[3]);
      }),
    S = !!o.clipBox,
    w = o.clipBox,
    _ = (E, R) => {
      let P = o.x0 + (l + E * n) * o.step,
        C = o.z0 + (c + R * n) * o.step;
      return (
        P >= w[0] - 0.01 &&
        C >= w[1] - 0.01 &&
        P <= w[2] + 0.01 &&
        C <= w[3] + 0.01
      );
    };
  for (let E = 0; E < h; E++)
    for (let R = 0; R < h; R++) {
      if (
        (b && b.has((c + E) * o.nx + l + R)) ||
        (S && !(_(R, E) && _(R + 1, E + 1)))
      )
        continue;
      let P = d + E * (h + 1) + R,
        C = P + 1,
        I = P + h + 2,
        L = P + h + 1;
      if (M) {
        let F = (O) => p[O - d];
        for (let [O, B, H] of [
          [P, I, C],
          [P, L, I],
        ]) {
          let N = F(O),
            D = F(B),
            U = F(H);
          if (o.cutTri(N[0], N[1], N[2], D[0], D[1], D[2], U[0], U[1], U[2])) {
            (a.cut ||= []).push([N, D, U]);
            continue;
          }
          a.tri(O, B, H);
        }
        continue;
      }
      (a.tri(P, I, C), a.tri(P, L, I));
    }
  let z = (E) => {
      for (let R = 0; R + 1 < E.length; R++) {
        let P = p[E[R]],
          C = p[E[R + 1]];
        if (S) {
          let L = E[R],
            F = E[R + 1];
          if (
            !_(L % (h + 1), Math.floor(L / (h + 1))) ||
            !_(F % (h + 1), Math.floor(F / (h + 1)))
          )
            continue;
        }
        let I = S ? 15 : 3;
        (o.inTube && (o.inTube(P[0], P[2]) || o.inTube(C[0], C[2]))) ||
          a.wall(
            P[0],
            P[2],
            C[0],
            C[2],
            P[1] - I,
            C[1] - I,
            Math.max(P[1], m[E[R]]),
            Math.max(C[1], m[E[R + 1]]),
            [0.08, 0.08, 0.06, 0],
            0,
            0,
          );
      }
    },
    A = (E) => Array.from({ length: h + 1 }, (R, P) => E * (h + 1) + P),
    T = (E) => Array.from({ length: h + 1 }, (R, P) => P * (h + 1) + E);
  if ((z(A(0).reverse()), z(A(h)), z(T(0)), z(T(h).reverse()), S)) {
    let E = (P, C) =>
        P >= 0 && C >= 0 && P < h && C < h && _(P, C) && _(P + 1, C + 1),
      R = (P, C) => C * (h + 1) + P;
    for (let P = 0; P < h; P++)
      for (let C = 0; C < h; C++)
        E(C, P) &&
          (C + 1 < h && !E(C + 1, P) && z([R(C + 1, P + 1), R(C + 1, P)]),
          C > 0 && !E(C - 1, P) && z([R(C, P), R(C, P + 1)]),
          P + 1 < h && !E(C, P + 1) && z([R(C, P + 1), R(C + 1, P + 1)]),
          P > 0 && !E(C, P - 1) && z([R(C + 1, P), R(C, P)]));
  }
  return a;
}
await No();
var Syt = On("local"),
  FF = (o, t) => {
    let e = Math.sin(o * 127.1 + t * 311.7) * 43758.5453;
    return e - Math.floor(e);
  },
  kyt = (o, t) =>
    FF(Math.floor(o / 90), Math.floor(t / 90)) * 0.6 +
    FF(Math.floor(o / 230), Math.floor(t / 230)) * 0.4,
  Fi = 256,
  qp = 512,
  Bl = qp / Fi,
  rQ = { concrete: 0, brick: 1, granite: 2, dg: 3, asphalt: 4, mulch: 5 };
function OF(o, t, e = null) {
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
    i = (a, r) => {
      a.push(r);
      let [l, c, h, f] = r.bb;
      for (let u = Math.floor(l / Fi); u <= Math.floor(h / Fi); u++)
        for (let d = Math.floor(c / Fi); d <= Math.floor(f / Fi); d++) {
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
    let r = _a(a);
    for (let l = 0; l + 1 < r.gPoly.length; l++) {
      let c = [];
      for (let f = r.gPoly[l]; f < r.gPoly[l + 1]; f++)
        c.push(r.gPts.subarray(r.gRing[f] * 2, r.gRing[f + 1] * 2));
      let h = r.gC[l];
      (h & 15) === 1 && i(s.green, { rings: c, park: !!(h & 16), bb: n(c[0]) });
    }
  }
  for (let a of [o].flat()) {
    if (!a) continue;
    let r = _a(a);
    for (let l = 0; l + 1 < r.aStart.length; l++) {
      let c = [];
      for (let h = r.aStart[l]; h < r.aStart[l + 1]; h++)
        c.push(r.aPts.subarray(r.aRing[h] * 2, r.aRing[h + 1] * 2));
      c.length &&
        i(s.areas, { rings: c, c: r.aC[l] & 15, m: r.aC[l] >> 4, bb: n(c[0]) });
    }
    for (let l = 0; l + 1 < r.lStart.length; l++) {
      let c = r.lPts.subarray(r.lStart[l] * 2, r.lStart[l + 1] * 2);
      i(s.lines, {
        pts: c,
        w: r.lW[l] / 10,
        m: r.lM[l],
        bb: n(c).map((h, f) => h + (f < 2 ? -4 : 4)),
      });
    }
  }
  return (s.areas.sort((a, r) => a.c - r.c), s);
}
function x_(o, t) {
  for (let e of t) {
    if (e.kind !== "tree" && e.kind !== "palm") continue;
    let s = Math.floor(e.x / Fi) + "," + Math.floor(e.z / Fi);
    o.dirty?.add(s);
    let n = o.trees.get(s);
    n || o.trees.set(s, (n = []));
    let i = e.sp || "",
      a =
        (e.kind === "palm"
          ? 3.2
          : /cypress|euc|pine/.test(i)
            ? 6
            : i === "fpalm"
              ? 2.2
              : 4.6) * (e.scale || 1);
    n.push([e.x, e.z, a, e.sp ? 1 : 0]);
  }
}
function sv(o, t, e) {
  let s = o.idx.get(Math.floor(t / Fi) + "," + Math.floor(e / Fi));
  if (!s) return -1;
  for (let n = s.areas.length - 1; n >= 0; n--) {
    let i = s.areas[n];
    if (
      !(
        i.c !== 1 ||
        t < i.bb[0] ||
        t > i.bb[2] ||
        e < i.bb[1] ||
        e > i.bb[3]
      ) &&
      b_(i.rings, t, e)
    )
      return i.m;
  }
  return -1;
}
function b_(o, t, e) {
  let s = !1;
  for (let n of o)
    for (let i = 0, a = n.length - 2; i < n.length; a = i, i += 2) {
      let r = n[i + 1],
        l = n[a + 1];
      r > e != l > e &&
        t < n[a] + ((e - l) * (n[i] - n[a])) / (r - l) &&
        (s = !s);
    }
  return s;
}
