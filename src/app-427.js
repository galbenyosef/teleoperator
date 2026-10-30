// app 427 — math
// Lines 212529-212638 of readable/app.pretty.js (statement-aligned).
function Gkt(o, t) {
  let e = o.bits,
    s = o.cell,
    n = o.nx,
    i = o.nz,
    a = (r, l) => {
      if (r < 0 || l < 0 || r >= n || l >= i) return !0;
      let c = l * n + r;
      return ((e[c >> 5] >>> (c & 31)) & 1) === 1;
    };
  return (r, l, c, h, f) => {
    let u = f.position.y - t;
    if (u <= 0.5) return !0;
    let d = f.position.x,
      p = f.position.z,
      m = l - t,
      g = u / (u + Math.max(0, m + h)),
      b = m - h > 0 ? u / (u + m - h) : 1;
    for (let v = 0; v <= 4; v++) {
      let x = g + ((b - g) * v) / 4,
        y = d + (r - d) * x,
        M = p + (c - p) * x,
        S = h * x + s * 0.75,
        w = Math.floor((y - S - o.x0) / s),
        _ = Math.floor((y + S - o.x0) / s),
        z = Math.floor((M - S - o.z0) / s),
        A = Math.floor((M + S - o.z0) / s);
      if ((_ - w + 1) * (A - z + 1) > 1600) return !0;
      for (let T = z; T <= A; T++)
        for (let E = w; E <= _; E++) if (a(E, T)) return !0;
    }
    return !1;
  };
}
function Pd(o) {
  (o.updateMatrixWorld(!0),
    o.traverse((t) => {
      ((t.matrixAutoUpdate = !1), t.children.length && Vkt(t));
    }));
}
function Vkt(o) {
  if (o._sealed) return;
  o._sealed = !0;
  let t = o.updateMatrixWorld,
    e = o.add;
  ((o.updateMatrixWorld = function (s) {
    if (s || this.matrixWorldNeedsUpdate)
      return ((this._kids = !1), t.call(this, s));
    if (this._kids) {
      this._kids = !1;
      for (let n of this.children) n.updateMatrixWorld(!1);
    }
  }),
    (o.add = function (...s) {
      for (let i of s)
        i.isObject3D &&
          i.matrixAutoUpdate &&
          (i.updateMatrix(), (i.matrixAutoUpdate = !1));
      let n = e.apply(this, s);
      for (let i = this; i; i = i.parent) i._kids = !0;
      return n;
    }));
}
function Wkt() {
  let o = new le();
  o.name = "Distant";
  let t = (s, n, i, a = 0) => {
      let r = [],
        l = [];
      s.forEach(([h, f], u) => {
        let d = n * (0.55 + 0.45 * Math.sin(u * 1.7) * Math.sin(u * 0.61 + 1));
        r.push(h, -2, f, h, Math.max(8, d), f + a);
      });
      for (let h = 0; h + 1 < s.length; h++) {
        let f = h * 2;
        l.push(f, f + 2, f + 1, f + 1, f + 2, f + 3);
      }
      let c = new Le();
      return (
        c.setAttribute("position", new Re(r, 3)),
        c.setIndex(l),
        c.computeVertexNormals(),
        new ye(c, new me({ color: i, roughness: 1 }))
      );
    },
    e = [];
  for (let s = -6e3; s <= 7e3; s += 400)
    e.push([13e3 + 800 * Math.sin(s / 2100), s]);
  return (
    o.add(t(e, 520, new It(0.12, 0.12, 0.1), 0)),
    o.traverse((s) => {
      s.isMesh &&
        ((s.castShadow = !1),
        (s.receiveShadow = !1),
        (s.matrixAutoUpdate = !1),
        s.updateMatrix());
    }),
    o
  );
}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
