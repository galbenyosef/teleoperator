// app 334 — math
// Lines 163196-163456 of readable/app.pretty.js (statement-aligned).
var xE = class {
  constructor(t) {
    let e = new Le();
    ((this.pos = new Float32Array(o1 * 6 * 3)),
      (this.col = new Float32Array(o1 * 6 * 4)));
    let s = new Float32Array(o1 * 6 * 3),
      n = new Float32Array(o1 * 6 * 2),
      i = [];
    for (let r = 0; r < o1 * 6; r++) s[r * 3 + 1] = 1;
    for (let r = 0; r < o1; r++) for (let l of LMt) i.push(r * 6 + l);
    (e.setAttribute("position", new Te(this.pos, 3)),
      e.setAttribute("normal", new Te(s, 3)),
      e.setAttribute("uv", new Te(n, 2)),
      e.setAttribute("color", new Te(this.col, 4)),
      e.setIndex(i),
      (e.boundingSphere = new _n(new dt(), 120)));
    let a = new Ys({
      color: 16777215,
      vertexColors: !0,
      transparent: !0,
      depthWrite: !1,
      side: ls,
      fog: !1,
    });
    ((this.mesh = new ye(e, a)),
      (this.mesh.name = "GuideArrows"),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 3),
      (this.mesh.castShadow = this.mesh.receiveShadow = !1),
      (this.mesh.userData.mbNoReflect = !0),
      (this.mesh.visible = !1),
      t.add(this.mesh),
      (this.icons = [1, -1].map((r) => {
        let l = new Jr(
          new kr({
            map: FMt(r),
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
      let i = n.sJ - t.s,
        a = n.sOut - t.s;
      if (a < 2) continue;
      if (i > 140) break;
      t.at(Math.max(0, i - 4), e);
      let r = e.x,
        l = e.z;
      t.at(Math.max(0.5, i), s);
      let c = s.x - r,
        h = s.z - l;
      (t.at(a, e), (r = e.x), (l = e.z), t.at(a + 4, s));
      let f = s.x - r,
        u = s.z - l,
        d = c * u - h * f,
        p = c * f + h * u,
        m = Math.atan2(d, p);
      if (Math.abs(m) > 0.5) return { d: (i + a) / 2, dir: m > 0 ? 1 : -1 };
    }
    return null;
  }
  update(t, e, s, n = !0, i = !1) {
    let a = e?.mode === "manual",
      r = e?.path,
      l = n && !!r && r.n > 1 && (!a || i) && !!s;
    if (
      ((this.line = a && i),
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
      b = AMt[c],
      v = h ? Cet * 1.4 : Cet,
      x = Math.min(RMt, h ? Math.max(mE + 2, e.cue.gap - 1) : 1e9, r.left - 1),
      y = h || c === "red" ? 0.7 + 0.3 * Math.sin(this.ph * (h ? 14 : 8)) : 1;
    r.at(0, u);
    let M = u.x,
      S = s.driveHeight(u.x, u.z),
      w = u.z;
    (this.mesh.position.set(M, S, w), this.mesh.updateMatrixWorld());
    let _ = 0,
      z = 0,
      A = 0;
    r.at(mE - 1, d);
    for (let T = mE; T <= x && _ < o1; T += v * Math.max(1, T / Let), _++) {
      ((z = d.x), (A = d.z), r.at(T, u), (d.x = u.x), (d.z = u.z));
      let E = u.x - z,
        R = u.z - A,
        P = Math.hypot(E, R) || 1;
      ((E /= P), (R /= P), h && ((E = -E), (R = -R)));
      let C = s.driveHeight(u.x, u.z) + IMt - S,
        I = f ? 0.85 : 1,
        L = I * Math.max(1, T / Let),
        F =
          g *
          y *
          Math.min(1, (T - mE) / 3 + 0.35) *
          Math.min(1, Math.max(0, (x - T) / TMt));
      for (let O = 0; O < 6; O++) {
        let B = _ * 6 + O,
          H = PMt[O] * I,
          N = CMt[O] * L;
        ((p[B * 3] = u.x - M + R * H + E * N),
          (p[B * 3 + 1] = C),
          (p[B * 3 + 2] = u.z - w - E * H + R * N),
          (m[B * 4] = b.r * YO),
          (m[B * 4 + 1] = b.g * YO),
          (m[B * 4 + 2] = b.b * YO),
          (m[B * 4 + 3] = F));
      }
    }
    for (let T = _ * 6; T < o1 * 6; T++)
      ((m[T * 4 + 3] = 0),
        (p[T * 3] = p[0]),
        (p[T * 3 + 1] = p[1]),
        (p[T * 3 + 2] = p[2]));
    ((this.n = _),
      (this.g.attributes.position.needsUpdate = !0),
      (this.g.attributes.color.needsUpdate = !0),
      (this.mesh.visible = _ > 0),
      (this.state = c),
      this._icon(t, e, s, r, !0));
  }
  _icon(t, e, s, n, i) {
    if (this.line) {
      ((this.icons[0].visible = this.icons[1].visible = !1),
        (this.turn = null));
      return;
    }
    i && (this.turn = this._nextTurn(n));
    let a = this.turn,
      r = this.icons;
    if (!a || a.d < 6) {
      r[0].visible = r[1].visible = !1;
      return;
    }
    let l = r[a.dir > 0 ? 0 : 1],
      c = r[a.dir > 0 ? 1 : 0];
    if (((c.visible = !1), i)) {
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
await _0();
es();
es();
var jM = [
    [-0.855, 0.358, -1.16],
    [0.849, 0.358, -1.159],
    [-0.844, 0.358, 1.486],
    [0.848, 0.358, 1.487],
  ],
  OMt = /^(CarBody|CarCarbon|CarTaillight|CarHeadlight|CarSignal|CarYellow)$/,
  BMt = /^(CarBody|CarCarbon)$/;
function Iet(o, t) {
  let e = new Map();
  for (let n = 0; n < o.length; n++) {
    let i = o[n],
      a = i.length / 3;
    for (let r = 0; r < a; r++) {
      let l = Math.round(i[r * 3] * t),
        c = Math.round(i[r * 3 + 1] * t),
        h = Math.round(i[r * 3 + 2] * t),
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
  for (let n of e.values()) for (let i of n) s.push(i[3]);
  return s;
}
function Fet(o, t) {
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
  let i = new Uint8Array(e.buffer, e.byteOffset + s),
    a = 0,
    r = 0;
  for (let l = 0; l < n.length && l < o.length; l++) {
    let [c, h] = n[l],
      f = o[l];
    if (f.name === c && f.attrs.position.array.length / 3 === h) {
      let u = new Float32Array(h * 2);
      for (let d = 0; d < h; d++) u[d * 2] = 1 - i[a + d] / 255;
      ((f.attrs.uv1 = { array: u, itemSize: 2 }), r++);
    }
    a += h;
  }
  return r;
}
