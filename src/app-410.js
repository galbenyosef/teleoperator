// app 410 — math
// Lines 204119-204228 of readable/app.pretty.js (statement-aligned).
function YMt(i, t) {
  let e = i.bits,
    s = i.cell,
    n = i.nx,
    o = i.nz,
    a = (r, l) => {
      if (r < 0 || l < 0 || r >= n || l >= o) return !0;
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
    for (let x = 0; x <= 4; x++) {
      let v = g + ((b - g) * x) / 4,
        y = d + (r - d) * v,
        M = p + (c - p) * v,
        S = h * v + s * 0.75,
        w = Math.floor((y - S - i.x0) / s),
        z = Math.floor((y + S - i.x0) / s),
        _ = Math.floor((M - S - i.z0) / s),
        R = Math.floor((M + S - i.z0) / s);
      if ((z - w + 1) * (R - _ + 1) > 1600) return !0;
      for (let T = _; T <= R; T++)
        for (let E = w; E <= z; E++) if (a(E, T)) return !0;
    }
    return !1;
  };
}
function Ku(i) {
  (i.updateMatrixWorld(!0),
    i.traverse((t) => {
      ((t.matrixAutoUpdate = !1), t.children.length && JMt(t));
    }));
}
function JMt(i) {
  if (i._sealed) return;
  i._sealed = !0;
  let t = i.updateMatrixWorld,
    e = i.add;
  ((i.updateMatrixWorld = function (s) {
    if (s || this.matrixWorldNeedsUpdate)
      return ((this._kids = !1), t.call(this, s));
    if (this._kids) {
      this._kids = !1;
      for (let n of this.children) n.updateMatrixWorld(!1);
    }
  }),
    (i.add = function (...s) {
      for (let o of s)
        o.isObject3D &&
          o.matrixAutoUpdate &&
          (o.updateMatrix(), (o.matrixAutoUpdate = !1));
      let n = e.apply(this, s);
      for (let o = this; o; o = o.parent) o._kids = !0;
      return n;
    }));
}
function ZMt() {
  let i = new ke();
  i.name = "Distant";
  let t = (s, n, o, a = 0) => {
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
      let c = new De();
      return (
        c.setAttribute("position", new ze(r, 3)),
        c.setIndex(l),
        c.computeVertexNormals(),
        new _e(c, new Ee({ color: o, roughness: 1 }))
      );
    },
    e = [];
  for (let s = -6e3; s <= 7e3; s += 400)
    e.push([13e3 + 800 * Math.sin(s / 2100), s]);
  return (
    i.add(t(e, 520, new $t(0.12, 0.12, 0.1), 0)),
    i.traverse((s) => {
      s.isMesh &&
        ((s.castShadow = !1),
        (s.receiveShadow = !1),
        (s.matrixAutoUpdate = !1),
        s.updateMatrix());
    }),
    i
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
