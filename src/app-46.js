// app 46 — math
// Lines 59808-60118 of readable/app.pretty.js (statement-aligned).
function GU(i, t) {
  let e = t.field,
    s = i.meta.field,
    n = s.w,
    o = s.h;
  if (s.delta)
    for (let a = 0; a < o; a++) {
      let r = 0;
      for (let l = a * n, c = l + n; l < c; l++)
        ((r = (r + e[l]) & 255), (e[l] = r));
    }
  return ((i.field = e), (i.meta.field = { ...s, delta: !1 }), i);
}
function nR(i) {
  let t = i.meta.field;
  return { data: i.field, w: t.w, h: t.h, x0: t.x0, z0: t.z0, cell: t.cell };
}
function Og(i, t, e) {
  if (!i.field) return 1;
  let s = i.meta.field,
    n = (t - s.x0) / s.cell - 0.5,
    o = (e - s.z0) / s.cell - 0.5;
  if (n < 0 || o < 0 || n >= s.w - 1 || o >= s.h - 1) return 1;
  let a = Math.floor(n),
    r = Math.floor(o),
    l = n - a,
    c = o - r,
    h = i.field,
    f = r * s.w + a;
  return (
    ((h[f] * (1 - l) + h[f + 1] * l) * (1 - c) +
      (h[f + s.w] * (1 - l) + h[f + s.w + 1] * l) * c) /
    255
  );
}
function iR(i, t) {
  let e = t.bld,
    s = i.wall,
    n = i.roof,
    o = e.pts0 || e.pts,
    a = null,
    r = [],
    l = null,
    c = 0,
    h = [];
  function f(x) {
    ((a = x), (r = []), (l = null), (h = []));
    let v = x.i;
    if (!(i.bOff[v + 1] > i.bOff[v])) {
      a = null;
      return;
    }
    let y = i.bOff[v];
    c = x.top - x.rh;
    for (let M = e.bRing[v]; M < e.bRing[v + 1]; M++) {
      let S = e.rStart[M],
        w = e.rStart[M + 1],
        z = w - S;
      for (let _ = 0; _ < z; _++) {
        let R = S + _,
          T = S + ((_ + 1) % z),
          E = e.pts[R * 2],
          A = e.pts[R * 2 + 1],
          C = e.pts[T * 2],
          P = e.pts[T * 2 + 1],
          I = Math.hypot(C - E, P - A) || 1e-6,
          L = x.base + s[y] / 4,
          F = Rct(c - L),
          N = Act(
            o === e.pts
              ? I
              : Math.hypot(o[T * 2] - o[R * 2], o[T * 2 + 1] - o[R * 2 + 1]) ||
                  1e-6,
          );
        (r.push({
          ax: E,
          az: A,
          dx: (C - E) / I,
          dz: (P - A) / I,
          len: I,
          nx: -(P - A) / I,
          nz: (C - E) / I,
          gE: L,
          nU: N,
          lv: F,
          off: y + 1,
        }),
          (y += 1 + N * F.length),
          h.push(E, A, n[R]));
      }
    }
  }
  function u(x, v, y, M, S) {
    if (l) {
      let _ = l,
        R = (x - _.ax) * _.dx + (v - _.az) * _.dz,
        T = Math.abs((x - _.ax) * _.nx + (v - _.az) * _.nz);
      if (
        R > -0.3 &&
        R < _.len + 0.3 &&
        T < (S ? 0.6 : 2.2) &&
        (!S || y * _.nx + M * _.nz > 0.7)
      )
        return _;
    }
    let w = null,
      z = 1 / 0;
    for (let _ of r) {
      let R = Math.max(
          0,
          Math.min(_.len, (x - _.ax) * _.dx + (v - _.az) * _.dz),
        ),
        T = _.ax + _.dx * R - x,
        E = _.az + _.dz * R - v,
        A = Math.hypot(T, E);
      (S && y * _.nx + M * _.nz < 0.5 && (A += 3), A < z && ((z = A), (w = _)));
    }
    return (l = w);
  }
  function d(x, v, y, M) {
    let S = Math.max(
        0,
        Math.min(1, ((v - x.ax) * x.dx + (M - x.az) * x.dz) / x.len),
      ),
      w = x.lv,
      z = w.length,
      _ = S * x.nU - 0.5;
    (_ < 0 && (_ = 0), _ > x.nU - 1 && (_ = x.nU - 1));
    let R = Math.floor(_),
      T = Math.min(x.nU - 1, R + 1),
      E = _ - R,
      A = y - x.gE,
      C = 0;
    for (; C + 1 < z && w[C + 1] <= A;) C++;
    let P = Math.min(z - 1, C + 1),
      I = P > C ? Math.max(0, Math.min(1, (A - w[C]) / (w[P] - w[C]))) : 0,
      L = (N, B) => s[x.off + N * z + B];
    return (
      ((L(R, C) * (1 - I) + L(R, P) * I) * (1 - E) +
        (L(T, C) * (1 - I) + L(T, P) * I) * E) /
      255
    );
  }
  function p(x, v) {
    let y = 255,
      M = 1 / 0;
    for (let S = 0; S < h.length; S += 3) {
      let w = (h[S] - x) ** 2 + (h[S + 1] - v) ** 2;
      w < M && ((M = w), (y = h[S + 2]));
    }
    return y / 255;
  }
  function m(x, v, y, M, S, w) {
    if (!a) return 0;
    let z;
    if (S > 0.7 && v > c - 1.2) z = p(x, y);
    else {
      let _ = u(x, y, M, w, Math.abs(S) < 0.5);
      z = _ ? d(_, x, v, y) : 1;
    }
    return Math.max(z, 1 / 255);
  }
  function g(x, v, y, M, S, w) {
    if (!a || v - x < 1.2) return null;
    let z = u(y, M, S, w, !0);
    if (!z) return null;
    let _ = [];
    for (let R of Tct) {
      let T = z.gE + R;
      T > x + 0.6 && T < v - 0.6 && _.push(T);
    }
    return _.length ? _ : null;
  }
  function b(x, v, y) {
    if (!a) return 0;
    let M = u(x, y, 0, 0, !1);
    return Math.max(M ? d(M, x, v, y) : 1, 1 / 255);
  }
  return { set: f, vert: m, split: g, vertOut: b };
}
function oR(i, t, e) {
  let s = new Map();
  i.lmKeys.forEach((r, l) => s.set(r, l));
  let n = 0,
    o = 0,
    a = new Set();
  return (
    t.updateMatrixWorld?.(!0),
    t.traverse((r) => {
      if (!r.isMesh || r.isInstancedMesh || !r.geometry?.attributes?.position)
        return;
      let l = r.geometry,
        c = `${e}:${n++}:${r.name}:${l.attributes.position.count}`;
      if (a.has(l)) return;
      a.add(l);
      let h = s.get(c);
      if (h === void 0) return;
      let f = i.lmOff[h],
        u = i.lmOff[h + 1],
        d = l.attributes.position.count;
      if (u - f !== d) return;
      let p = new Float32Array(d * 2);
      for (let m = 0; m < d; m++) p[m * 2] = Math.max(i.lmData[f + m], 1) / 255;
      (l.setAttribute("uv1", new Te(p, 2)), o++);
      for (let m of Array.isArray(r.material) ? r.material : [r.material])
        m && !m.userData.mbSkyVis && (m.userData.mbSkyVis = 1);
    }),
    o
  );
}
var WU = (i, t, e) => Math.min(e, Math.max(t, i));
function qU(i) {
  let t = [],
    e = (n, o, a) => {
      !n?.P ||
        !o ||
        o.tn?.open ||
        t.push({
          P: n.P,
          n: n.n ?? n.P.length / 3,
          W: (o.W || 5) + 2,
          roof: o.roof || 7,
          name: a,
        });
    };
  for (let n of i?.edges || [])
    n.tunnelR && e(n.tunnelR.E || n, n.tunnelR, n.name);
  for (let n of i?.highways?.presidio || [])
    n.tunnelR && e(n.tunnelR.E, n.tunnelR, "Presidio Parkway");
  let s = { depth: 0, near: 1e9, name: "" };
  return (n, o, a) => {
    ((s.depth = 0), (s.near = 1e9), (s.name = ""));
    for (let r of t) {
      let l = r.P,
        c = 0,
        h = null,
        f = 0;
      for (let p = 0; p + 1 < r.n; p++)
        f += Math.hypot(l[p * 3 + 3] - l[p * 3], l[p * 3 + 4] - l[p * 3 + 1]);
      for (let p = 0; p + 1 < r.n; p++) {
        let m = l[p * 3],
          g = l[p * 3 + 1],
          b = l[p * 3 + 3],
          x = l[p * 3 + 4],
          v = Math.hypot(b - m, x - g) || 1e-6,
          y = (b - m) / v,
          M = (x - g) / v,
          S = n - m,
          w = a - g,
          z = S * y + w * M,
          _ = WU(z / v, 0, 1),
          R = m + (b - m) * _,
          T = g + (x - g) * _,
          E = Math.hypot(n - R, a - T);
        ((!h || E < h.d) &&
          (h = {
            d: E,
            s: c + z,
            y: l[p * 3 + 2] + (l[p * 3 + 5] - l[p * 3 + 2]) * _,
            v: Math.abs(-S * M + w * y),
          }),
          (c += v));
      }
      if (
        !h ||
        ((s.near = Math.min(s.near, h.d)),
        h.v > r.W || o > h.y + r.roof + 1.5 || o < h.y - 4)
      )
        continue;
      let u = Math.min(h.s, f - h.s),
        d = WU((u + 15) / 35, 0, 1);
      d > s.depth && ((s.depth = d), (s.name = r.name));
    }
    return s;
  };
}
as();
Oa();
var vy = {};
wh(vy, {
  NAME: () => Yft,
  RESERVE: () => Jft,
  build: () => Zft,
  buildReal: () => tut,
  realClaims: () => Qft,
});
as();
Ol();
Ug();
Cd();
Ld();
En();
Ol();
Ld();
Cd();
var dR = At([0.47, 0.44, 0.4], Tt.planks),
  qg = At([0.2, 0.18, 0.15], Tt.pile),
  Wg = At([0.05, 0.06, 0.06], Tt.metal);
function gG(i) {
  for (let [t, e] of [
    ["pier39", Gct],
    ["wharf", pR],
    ["hyde", gR],
    ["aquatic", bR],
  ])
    try {
      e(i);
    } catch (s) {
      console.error("waterfront north:", t, s);
    }
}
