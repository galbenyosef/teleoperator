// app 312 — math
// Lines 150438-150644 of readable/app.pretty.js (statement-aligned).
var bwt = 3,
  xwt = 0.8,
  _tt = 250,
  vwt = 0.7,
  V_ = 0.55,
  e1 = 0.15,
  Ltt = 300,
  ywt = 5,
  Ett = 4,
  Ttt = new fe(),
  x2 = new fe(),
  q_ = (o) => {
    if (
      !o.isInterleavedBufferAttribute &&
      o.array instanceof Float32Array &&
      o.itemSize === 3
    )
      return o.array;
    let t = o.count,
      e = new Float32Array(t * 3);
    for (let s = 0; s < t; s++)
      ((e[s * 3] = o.getX(s)),
        (e[s * 3 + 1] = o.getY(s)),
        (e[s * 3 + 2] = o.getZ(s)));
    return e;
  };
function Itt(o) {
  let t = 1 / 0,
    e = 1 / 0,
    s = -1 / 0,
    n = -1 / 0;
  for (let u = 0; u < o.length; u += 3) {
    let d = o[u],
      p = o[u + 2];
    (d < t && (t = d), d > s && (s = d), p < e && (e = p), p > n && (n = p));
  }
  let i = Math.max(1, Math.ceil((s - t) / e1) + 1),
    a = Math.max(1, Math.ceil((n - e) / e1) + 1),
    r = o.length / 3,
    l = new Int32Array(r),
    c = new Int32Array(i * a + 1),
    h = new Uint32Array(r);
  for (let u = 0; u < r; u++) {
    let d =
      Math.floor((o[u * 3] - t) / e1) + Math.floor((o[u * 3 + 2] - e) / e1) * i;
    ((l[u] = d), c[d + 1]++);
  }
  for (let u = 0; u < i * a; u++) c[u + 1] += c[u];
  let f = c.slice(0, i * a);
  for (let u = 0; u < r; u++) h[f[l[u]]++] = u;
  return { x0: t, z0: e, nx: i, nz: a, start: c, idx: h };
}
var wO = 0.5,
  wwt = 45,
  Ftt = 0.26,
  Ott = 2e4,
  Mwt = (o) => Math.min(0.7, 0.01 * o + 0.001 * o * o),
  Swt = 42,
  kwt = 30,
  zwt = 15 * 6e4,
  IM = new tn(),
  G_ = new tn(),
  Btt = new dt(),
  _wt = new dt(1, 0, 0),
  Ntt = new dt(0, 1, 0),
  Ewt = new dt(0, 0, 1),
  j_ = class {
    constructor(t, e) {
      ((this.scene = t), (this.ground = e), (this.L = []));
    }
    add(
      t,
      {
        r: e = 0.34,
        hw: s = 0.12,
        vel: n,
        yaw: i = 0,
        spin: a = 0,
        own: r = !1,
      },
    ) {
      ((t.matrixAutoUpdate = !0), this.scene?.add(t));
      let l = {
        o: t,
        r: e,
        hw: s,
        vel: n.clone(),
        yaw: i,
        lean: 0,
        leanV: (Math.random() - 0.5) * 3,
        spin: a,
        spinV: -Math.hypot(n.x, n.z) / e,
        yawV: (Math.random() - 0.5) * 4,
        t: 0,
        rest: !1,
        own: r,
      };
      return (
        this.L.push(l),
        this.L.length > 10 && this.drop(0),
        this.pose(l),
        l
      );
    }
    pose(t) {
      (IM.setFromAxisAngle(Ntt, t.yaw),
        G_.setFromAxisAngle(Ewt, t.lean),
        IM.multiply(G_),
        G_.setFromAxisAngle(_wt, t.spin),
        t.o.quaternion.copy(IM.multiply(G_)));
    }
    drop(t) {
      let e = this.L[t];
      (e.o.removeFromParent(),
        e.own &&
          e.o.traverse((s) => {
            s.isMesh && s.geometry.dispose();
          }),
        this.L.splice(t, 1));
    }
    clear() {
      for (; this.L.length;) this.drop(0);
    }
    update(t) {
      for (let e = this.L.length - 1; e >= 0; e--) {
        let s = this.L[e],
          n = s.o,
          i = s.vel;
        if (((s.t += t), s.t > wwt)) {
          this.drop(e);
          continue;
        }
        if (s.rest) continue;
        ((i.y -= 9.81 * t), n.position.addScaledVector(i, t));
        let a = Math.abs(Math.cos(s.lean)),
          r = Math.abs(Math.sin(s.lean)),
          l = n.position.y - (s.r * a + s.hw * r),
          c = this.ground
            ? this.ground(n.position.x, n.position.z, n.position.y + 1)
            : 0,
          h = Math.hypot(i.x, i.z);
        if (Number.isFinite(c) && l <= c + 0.01) {
          if (
            ((n.position.y += Math.max(0, c - l)),
            i.y < 0 && (i.y = i.y < -1.2 ? -i.y * 0.35 : 0),
            a > 0.35)
          ) {
            if (h > 0.3) {
              let u = Math.atan2(-i.x, -i.z),
                d = Math.atan2(Math.sin(u - s.yaw), Math.cos(u - s.yaw));
              s.yaw +=
                (Math.abs(d) > Math.PI / 2 ? d - Math.sign(d) * Math.PI : d) *
                Math.min(1, t * 4);
            }
            ((s.spinV =
              (-h / s.r) *
              Math.sign(-Math.sin(s.yaw) * i.x - Math.cos(s.yaw) * i.z || 1)),
              (s.yawV *= Math.exp(-3 * t)));
            let f = Math.exp(-(0.25 + 1.2 / (1 + h)) * t);
            ((i.x *= f),
              (i.z *= f),
              (s.leanV +=
                (((Math.sin(s.lean) * 9.81) / s.r) * (h < 4 ? 1 : 0.15) * 0.25 -
                  s.leanV * (h > 4 ? 2 : 0.3)) *
                t),
              Math.abs(s.lean) < 0.04 &&
                h < 4 &&
                (s.leanV += (Math.random() - 0.5) * 0.6 * t));
          } else {
            let f = Math.exp(-5 * t);
            ((i.x *= f),
              (i.z *= f),
              (s.spinV *= Math.exp(-6 * t)),
              (s.leanV *= Math.exp(-8 * t)),
              (s.yawV *= Math.exp(-6 * t)));
          }
          (Math.abs(s.lean) > Math.PI / 2 &&
            ((s.lean = (Math.sign(s.lean) * Math.PI) / 2),
            (s.leanV = -s.leanV * 0.2)),
            a < 0.2 &&
              h < 0.15 &&
              Math.abs(i.y) < 0.3 &&
              ((s.rest = !0),
              (s.lean = (Math.sign(s.lean || 1) * Math.PI) / 2)));
        }
        ((s.spin += s.spinV * t),
          (s.lean += s.leanV * t),
          (s.yaw += s.yawV * t),
          this.pose(s));
      }
    }
  },
  xO = null;
function Twt(o, t) {
  xO ||= [
    new me({ color: 1315860, roughness: 0.92, metalness: 0 }),
    new me({ color: 6053731, roughness: 0.4, metalness: 0.8 }),
  ];
  let e = new le();
  e.name = "LooseTyre";
  let s = new ye(new vs(o, o, 2 * t, 22).rotateZ(Math.PI / 2), xO[0]),
    n = new ye(
      new vs(o * 0.64, o * 0.64, 2 * t + 0.012, 16).rotateZ(Math.PI / 2),
      xO[1],
    );
  return ((s.castShadow = n.castShadow = !0), e.add(s, n), e);
}
