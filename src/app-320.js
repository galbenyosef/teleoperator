// app 320 — math
// Lines 157547-157807 of readable/app.pretty.js (statement-aligned).
var ez = class {
  constructor(t) {
    let e = new De();
    ((this.pos = new Float32Array(wp * 6 * 3)),
      (this.col = new Float32Array(wp * 6 * 4)));
    let s = new Float32Array(wp * 6 * 3),
      n = new Float32Array(wp * 6 * 2),
      o = [];
    for (let r = 0; r < wp * 6; r++) s[r * 3 + 1] = 1;
    for (let r = 0; r < wp; r++) for (let l of h3t) o.push(r * 6 + l);
    (e.setAttribute("position", new Te(this.pos, 3)),
      e.setAttribute("normal", new Te(s, 3)),
      e.setAttribute("uv", new Te(n, 2)),
      e.setAttribute("color", new Te(this.col, 4)),
      e.setIndex(o),
      (e.boundingSphere = new _n(new xt(), 120)));
    let a = new ln({
      color: 16777215,
      vertexColors: !0,
      transparent: !0,
      depthWrite: !1,
      side: Ss,
      fog: !1,
    });
    ((this.mesh = new _e(e, a)),
      (this.mesh.name = "GuideArrows"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 3),
      (this.mesh.castShadow = this.mesh.receiveShadow = !1),
      (this.mesh.userData.mbNoReflect = !0),
      (this.mesh.visible = !1),
      t.add(this.mesh),
      (this.icons = [1, -1].map((r) => {
        let l = new K0(
          new M0({
            map: u3t(r),
            color: 16777215,
            transparent: !0,
            depthWrite: !1,
            fog: !1,
          }),
        );
        return (
          (l.name = "GuideTurn"),
          (l.visible = !1),
          (l.renderOrder = 4),
          l.scale.set(2.6, 2.6, 1),
          t.add(l),
          l
        );
      })),
      (this.g = e),
      (this.t = 0),
      (this.k = 0),
      (this.ph = 0),
      (this.n = 0),
      (this.state = "green"),
      (this.turn = null),
      (this._p = { x: 0, z: 0, y: 0, i: 0 }),
      (this._q = { x: 0, z: 0, y: 0, i: 0 }));
  }
  _nextTurn(t) {
    let e = this._p,
      s = this._q;
    for (let n of t.marks || []) {
      let o = n.sJ - t.s,
        a = n.sOut - t.s;
      if (a < 2) continue;
      if (o > 140) break;
      t.at(Math.max(0, o - 4), e);
      let r = e.x,
        l = e.z;
      t.at(Math.max(0.5, o), s);
      let c = s.x - r,
        h = s.z - l;
      (t.at(a, e), (r = e.x), (l = e.z), t.at(a + 4, s));
      let f = s.x - r,
        u = s.z - l,
        d = c * u - h * f,
        p = c * f + h * u,
        m = Math.atan2(d, p);
      if (Math.abs(m) > 0.5) return { d: (o + a) / 2, dir: m > 0 ? 1 : -1 };
    }
    return null;
  }
  update(t, e, s, n = !0, o = !1) {
    let a = e?.mode === "manual",
      r = e?.path,
      l = n && !!r && r.n > 1 && (!a || o) && !!s;
    if (
      ((this.line = a && o),
      (this.k += ((l ? 1 : 0) - this.k) * Math.min(1, t * 4)),
      (this.ph += t),
      this.k < 0.02 || !r || r.n < 2)
    ) {
      ((this.mesh.visible = !1),
        (this.icons[0].visible = this.icons[1].visible = !1),
        (this.turn = null));
      return;
    }
    if ((this.t -= t) > 0 && this.mesh.visible) {
      this._icon(t, e, s, r, !1);
      return;
    }
    this.t = 1 / 30;
    let c = e.cue?.state || "green",
      h = c === "brake",
      f = e.mode === "l5",
      u = this._p,
      d = this._q,
      p = this.pos,
      m = this.col,
      g = (f ? 0.45 : this.line && c === "green" ? 0.22 : 0.95) * this.k,
      b = r3t[c],
      x = h ? HZ * 1.4 : HZ,
      v = Math.min(a3t, h ? Math.max(Z_ + 2, e.cue.gap - 1) : 1e9, r.left - 1),
      y = h || c === "red" ? 0.7 + 0.3 * Math.sin(this.ph * (h ? 14 : 8)) : 1;
    r.at(0, u);
    let M = u.x,
      S = s.driveHeight(u.x, u.z),
      w = u.z;
    (this.mesh.position.set(M, S, w), this.mesh.updateMatrixWorld());
    let z = 0,
      _ = 0,
      R = 0;
    r.at(Z_ - 1, d);
    for (let T = Z_; T <= v && z < wp; T += x * Math.max(1, T / DZ), z++) {
      ((_ = d.x), (R = d.z), r.at(T, u), (d.x = u.x), (d.z = u.z));
      let E = u.x - _,
        A = u.z - R,
        C = Math.hypot(E, A) || 1;
      ((E /= C), (A /= C), h && ((E = -E), (A = -A)));
      let P = s.driveHeight(u.x, u.z) + f3t - S,
        I = f ? 0.85 : 1,
        L = I * Math.max(1, T / DZ),
        F =
          g *
          y *
          Math.min(1, (T - Z_) / 3 + 0.35) *
          Math.min(1, Math.max(0, (v - T) / o3t));
      for (let N = 0; N < 6; N++) {
        let B = z * 6 + N,
          H = l3t[N] * I,
          O = c3t[N] * L;
        ((p[B * 3] = u.x - M + A * H + E * O),
          (p[B * 3 + 1] = P),
          (p[B * 3 + 2] = u.z - w - E * H + A * O),
          (m[B * 4] = b.r * eF),
          (m[B * 4 + 1] = b.g * eF),
          (m[B * 4 + 2] = b.b * eF),
          (m[B * 4 + 3] = F));
      }
    }
    for (let T = z * 6; T < wp * 6; T++)
      ((m[T * 4 + 3] = 0),
        (p[T * 3] = p[0]),
        (p[T * 3 + 1] = p[1]),
        (p[T * 3 + 2] = p[2]));
    ((this.n = z),
      (this.g.attributes.position.needsUpdate = !0),
      (this.g.attributes.color.needsUpdate = !0),
      (this.mesh.visible = z > 0),
      (this.state = c),
      this._icon(t, e, s, r, !0));
  }
  _icon(t, e, s, n, o) {
    if (this.line) {
      ((this.icons[0].visible = this.icons[1].visible = !1),
        (this.turn = null));
      return;
    }
    o && (this.turn = this._nextTurn(n));
    let a = this.turn,
      r = this.icons;
    if (!a || a.d < 6) {
      r[0].visible = r[1].visible = !1;
      return;
    }
    let l = r[a.dir > 0 ? 0 : 1],
      c = r[a.dir > 0 ? 1 : 0];
    if (((c.visible = !1), o)) {
      n.at(a.d, this._p);
      let d = this._p;
      l.position.set(d.x, s.driveHeight(d.x, d.z) + 2.4, d.z);
    }
    let h = Math.min(1, (a.d - 6) / 10),
      f = Math.min(1, Math.max(0, (150 - a.d) / 40));
    ((l.material.opacity = (e.mode === "l5" ? 0.5 : 1) * this.k * h * f),
      (l.visible = l.material.opacity > 0.02));
    let u = 2.6 * (1 + 0.04 * Math.sin(this.ph * 3));
    (l.scale.set(u, u, 1), l.updateMatrixWorld());
  }
};
f0();
as();
as();
var qw = [
    [-0.855, 0.358, -1.16],
    [0.849, 0.358, -1.159],
    [-0.844, 0.358, 1.486],
    [0.848, 0.358, 1.487],
  ],
  d3t = /^(CarBody|CarCarbon|CarTaillight|CarHeadlight|CarSignal|CarYellow)$/,
  p3t = /^(CarBody|CarCarbon)$/;
function UZ(i, t) {
  let e = new Map();
  for (let n = 0; n < i.length; n++) {
    let o = i[n],
      a = o.length / 3;
    for (let r = 0; r < a; r++) {
      let l = Math.round(o[r * 3] * t),
        c = Math.round(o[r * 3 + 1] * t),
        h = Math.round(o[r * 3 + 2] * t),
        f =
          (Math.imul(l, 73856093) ^
            Math.imul(c, 19349663) ^
            Math.imul(h, 83492791)) |
          0,
        u = e.get(f);
      u || e.set(f, (u = []));
      let d = null;
      for (let p of u)
        if (p[0] === l && p[1] === c && p[2] === h) {
          d = p;
          break;
        }
      (d || u.push((d = [l, c, h, []])), d[3].push(n, r));
    }
  }
  let s = [];
  for (let n of e.values()) for (let o of n) s.push(o[3]);
  return s;
}
function GZ(i, t) {
  if (!t) return 0;
  let e = new DataView(t.buffer || t, t.byteOffset || 0);
  if (e.getUint32(0, !0) !== 827277635) return 0;
  let s = 8,
    n = [];
  for (let l = 0, c = e.getUint32(4, !0); l < c; l++) {
    let h = e.getUint8(s),
      f = new TextDecoder().decode(
        new Uint8Array(e.buffer, e.byteOffset + s + 1, h),
      );
    ((s += 1 + h), n.push([f, e.getUint32(s, !0)]), (s += 4));
  }
  let o = new Uint8Array(e.buffer, e.byteOffset + s),
    a = 0,
    r = 0;
  for (let l = 0; l < n.length && l < i.length; l++) {
    let [c, h] = n[l],
      f = i[l];
    if (f.name === c && f.attrs.position.array.length / 3 === h) {
      let u = new Float32Array(h * 2);
      for (let d = 0; d < h; d++) u[d * 2] = 1 - o[a + d] / 255;
      ((f.attrs.uv1 = { array: u, itemSize: 2 }), r++);
    }
    a += h;
  }
  return r;
}
