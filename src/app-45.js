// app 45 — math
// Lines 60039-60349 of readable/app.pretty.js (statement-aligned).
function WV(o, t) {
  let e = t.field,
    s = o.meta.field,
    n = s.w,
    i = s.h;
  if (s.delta)
    for (let a = 0; a < i; a++) {
      let r = 0;
      for (let l = a * n, c = l + n; l < c; l++)
        ((r = (r + e[l]) & 255), (e[l] = r));
    }
  return ((o.field = e), (o.meta.field = { ...s, delta: !1 }), o);
}
function P7(o) {
  let t = o.meta.field;
  return { data: o.field, w: t.w, h: t.h, x0: t.x0, z0: t.z0, cell: t.cell };
}
function Eb(o, t, e) {
  if (!o.field) return 1;
  let s = o.meta.field,
    n = (t - s.x0) / s.cell - 0.5,
    i = (e - s.z0) / s.cell - 0.5;
  if (n < 0 || i < 0 || n >= s.w - 1 || i >= s.h - 1) return 1;
  let a = Math.floor(n),
    r = Math.floor(i),
    l = n - a,
    c = i - r,
    h = o.field,
    f = r * s.w + a;
  return (
    ((h[f] * (1 - l) + h[f + 1] * l) * (1 - c) +
      (h[f + s.w] * (1 - l) + h[f + s.w + 1] * l) * c) /
    255
  );
}
function C7(o, t) {
  let e = t.bld,
    s = o.wall,
    n = o.roof,
    i = e.pts0 || e.pts,
    a = null,
    r = [],
    l = null,
    c = 0,
    h = [];
  function f(v) {
    ((a = v), (r = []), (l = null), (h = []));
    let x = v.i;
    if (!(o.bOff[x + 1] > o.bOff[x])) {
      a = null;
      return;
    }
    let y = o.bOff[x];
    c = v.top - v.rh;
    for (let M = e.bRing[x]; M < e.bRing[x + 1]; M++) {
      let S = e.rStart[M],
        w = e.rStart[M + 1],
        _ = w - S;
      for (let z = 0; z < _; z++) {
        let A = S + z,
          T = S + ((z + 1) % _),
          E = e.pts[A * 2],
          R = e.pts[A * 2 + 1],
          P = e.pts[T * 2],
          C = e.pts[T * 2 + 1],
          I = Math.hypot(P - E, C - R) || 1e-6,
          L = v.base + s[y] / 4,
          F = Yut(c - L),
          O = Kut(
            i === e.pts
              ? I
              : Math.hypot(i[T * 2] - i[A * 2], i[T * 2 + 1] - i[A * 2 + 1]) ||
                  1e-6,
          );
        (r.push({
          ax: E,
          az: R,
          dx: (P - E) / I,
          dz: (C - R) / I,
          len: I,
          nx: -(C - R) / I,
          nz: (P - E) / I,
          gE: L,
          nU: O,
          lv: F,
          off: y + 1,
        }),
          (y += 1 + O * F.length),
          h.push(E, R, n[A]));
      }
    }
  }
  function u(v, x, y, M, S) {
    if (l) {
      let z = l,
        A = (v - z.ax) * z.dx + (x - z.az) * z.dz,
        T = Math.abs((v - z.ax) * z.nx + (x - z.az) * z.nz);
      if (
        A > -0.3 &&
        A < z.len + 0.3 &&
        T < (S ? 0.6 : 2.2) &&
        (!S || y * z.nx + M * z.nz > 0.7)
      )
        return z;
    }
    let w = null,
      _ = 1 / 0;
    for (let z of r) {
      let A = Math.max(
          0,
          Math.min(z.len, (v - z.ax) * z.dx + (x - z.az) * z.dz),
        ),
        T = z.ax + z.dx * A - v,
        E = z.az + z.dz * A - x,
        R = Math.hypot(T, E);
      (S && y * z.nx + M * z.nz < 0.5 && (R += 3), R < _ && ((_ = R), (w = z)));
    }
    return (l = w);
  }
  function d(v, x, y, M) {
    let S = Math.max(
        0,
        Math.min(1, ((x - v.ax) * v.dx + (M - v.az) * v.dz) / v.len),
      ),
      w = v.lv,
      _ = w.length,
      z = S * v.nU - 0.5;
    (z < 0 && (z = 0), z > v.nU - 1 && (z = v.nU - 1));
    let A = Math.floor(z),
      T = Math.min(v.nU - 1, A + 1),
      E = z - A,
      R = y - v.gE,
      P = 0;
    for (; P + 1 < _ && w[P + 1] <= R;) P++;
    let C = Math.min(_ - 1, P + 1),
      I = C > P ? Math.max(0, Math.min(1, (R - w[P]) / (w[C] - w[P]))) : 0,
      L = (O, B) => s[v.off + O * _ + B];
    return (
      ((L(A, P) * (1 - I) + L(A, C) * I) * (1 - E) +
        (L(T, P) * (1 - I) + L(T, C) * I) * E) /
      255
    );
  }
  function p(v, x) {
    let y = 255,
      M = 1 / 0;
    for (let S = 0; S < h.length; S += 3) {
      let w = (h[S] - v) ** 2 + (h[S + 1] - x) ** 2;
      w < M && ((M = w), (y = h[S + 2]));
    }
    return y / 255;
  }
  function m(v, x, y, M, S, w) {
    if (!a) return 0;
    let _;
    if (S > 0.7 && x > c - 1.2) _ = p(v, y);
    else {
      let z = u(v, y, M, w, Math.abs(S) < 0.5);
      _ = z ? d(z, v, x, y) : 1;
    }
    return Math.max(_, 1 / 255);
  }
  function g(v, x, y, M, S, w) {
    if (!a || x - v < 1.2) return null;
    let _ = u(y, M, S, w, !0);
    if (!_) return null;
    let z = [];
    for (let A of Xut) {
      let T = _.gE + A;
      T > v + 0.6 && T < x - 0.6 && z.push(T);
    }
    return z.length ? z : null;
  }
  function b(v, x, y) {
    if (!a) return 0;
    let M = u(v, y, 0, 0, !1);
    return Math.max(M ? d(M, v, x, y) : 1, 1 / 255);
  }
  return { set: f, vert: m, split: g, vertOut: b };
}
function L7(o, t, e) {
  let s = new Map();
  o.lmKeys.forEach((r, l) => s.set(r, l));
  let n = 0,
    i = 0,
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
      let f = o.lmOff[h],
        u = o.lmOff[h + 1],
        d = l.attributes.position.count;
      if (u - f !== d) return;
      let p = new Float32Array(d * 2);
      for (let m = 0; m < d; m++) p[m * 2] = Math.max(o.lmData[f + m], 1) / 255;
      (l.setAttribute("uv1", new Te(p, 2)), i++);
      for (let m of Array.isArray(r.material) ? r.material : [r.material])
        m && !m.userData.mbSkyVis && (m.userData.mbSkyVis = 1);
    }),
    i
  );
}
var qV = (o, t, e) => Math.min(e, Math.max(t, o));
function jV(o) {
  let t = [],
    e = (n, i, a) => {
      !n?.P ||
        !i ||
        i.tn?.open ||
        t.push({
          P: n.P,
          n: n.n ?? n.P.length / 3,
          W: (i.W || 5) + 2,
          roof: i.roof || 7,
          name: a,
        });
    };
  for (let n of o?.edges || [])
    n.tunnelR && e(n.tunnelR.E || n, n.tunnelR, n.name);
  for (let n of o?.highways?.presidio || [])
    n.tunnelR && e(n.tunnelR.E, n.tunnelR, "Presidio Parkway");
  let s = { depth: 0, near: 1e9, name: "" };
  return (n, i, a) => {
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
          v = l[p * 3 + 4],
          x = Math.hypot(b - m, v - g) || 1e-6,
          y = (b - m) / x,
          M = (v - g) / x,
          S = n - m,
          w = a - g,
          _ = S * y + w * M,
          z = qV(_ / x, 0, 1),
          A = m + (b - m) * z,
          T = g + (v - g) * z,
          E = Math.hypot(n - A, a - T);
        ((!h || E < h.d) &&
          (h = {
            d: E,
            s: c + _,
            y: l[p * 3 + 2] + (l[p * 3 + 5] - l[p * 3 + 2]) * z,
            v: Math.abs(-S * M + w * y),
          }),
          (c += x));
      }
      if (
        !h ||
        ((s.near = Math.min(s.near, h.d)),
        h.v > r.W || i > h.y + r.roof + 1.5 || i < h.y - 4)
      )
        continue;
      let u = Math.min(h.s, f - h.s),
        d = qV((u + 15) / 35, 0, 1);
      d > s.depth && ((s.depth = d), (s.name = r.name));
    }
    return s;
  };
}
es();
Ya();
var dw = {};
Kh(dw, {
  NAME: () => x1t,
  RESERVE: () => v1t,
  build: () => y1t,
  buildReal: () => M1t,
  realClaims: () => w1t,
});
es();
await oc();
Ab();
await fp();
await up();
Pn();
await oc();
await up();
await fp();
var V7 = Rt([0.47, 0.44, 0.4], Tt.planks),
  Lb = Rt([0.2, 0.18, 0.15], Tt.pile),
  Cb = Rt([0.05, 0.06, 0.06], Tt.metal);
function xW(o) {
  for (let [t, e] of [
    ["pier39", cdt],
    ["wharf", W7],
    ["hyde", j7],
    ["aquatic", $7],
  ])
    try {
      e(o);
    } catch (s) {
      console.error("waterfront north:", t, s);
    }
}
