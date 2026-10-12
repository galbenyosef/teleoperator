// app 81 — math
// Lines 71310-71638 of readable/app.pretty.js (statement-aligned).
var Oht = (i, t) =>
    (i.hair << Ad.hair[0]) |
    (i.hat << Ad.hat[0]) |
    ((t === ni.cool ? 1 : 0) << Ad.glasses[0]) |
    ((t === ni.wow ? 1 : 0) << Ad.cloud[0]) |
    (i.bag << Ad.bag[0]) |
    (i.top << Ad.top[0]) |
    (i.bottom << Ad.bottom[0]),
  GR = (i) => Math.atan2(Math.sin(i), Math.cos(i)),
  R0 = class {
    constructor(
      t,
      e,
      { shadows: s = 0, near: n = $G[0], mid: o = $G[1] } = {},
    ) {
      let a = Nht();
      (globalThis.SF_LITE &&
        ((n = Math.min(n, 12)), (o = Math.min(o, 40)), (s = -1)),
        (this.near = n),
        (this.mid = o),
        (this.max = e),
        (this.group = new ke()),
        (this.group.name = t),
        (this.meshes = (Z1 ? ny : Jg).map((r, l) =>
          [0, 1, 2].map((c) => {
            let h = new zn(Z1 ? qG(l, c) : HG(l, c), a, e);
            return (
              (h.count = 0),
              (h.frustumCulled = !1),
              (h.castShadow = c <= s),
              (h.receiveShadow = !0),
              (h.name = `${t}_${r.name}_lod${c}`),
              (h.userData.mbMover = !0),
              (h.matrixAutoUpdate = !1),
              (h.visible = !1),
              h.setColorAt(0, new $t(1, 1, 1)),
              (h.boundingSphere = new _n(new xt(), 1)),
              this.group.add(h),
              h
            );
          }),
        )),
        (this.counts = this.meshes.map(() => [0, 0, 0])),
        (this.dt = 0),
        (this.t = 0),
        (this.bb = [0, 0, 0, 0, 0, 0]),
        (this.drawn = 0));
    }
    begin(t) {
      ((this.dt = Math.min(0.1, Math.max(0, t || 0))), (this.t += this.dt));
      for (let e of this.counts) e[0] = e[1] = e[2] = 0;
      ((this.bb = [1e9, 1e9, 1e9, -1e9, -1e9, -1e9]), (this.drawn = 0));
    }
    put(t, e, s, n, o, a, r, l = {}) {
      let c = this.dt,
        h = t.vx;
      h ||
        (h = t.vx =
          {
            L: t.look || Nh(l.rnd || Math.random, { kid: l.kid ?? null }),
            a: Math.atan2(o, a),
            spd: 0,
            ph: 0,
            pose: l.pose || 0,
            pw: 1,
            rx: -1,
            rt: 0,
            yaw: 0,
            act: 0,
            actT: 0,
          });
      let f = h.L;
      h.ph || (h.ph = f.ph);
      let u = Math.atan2(o, a),
        d = GR(u - h.a);
      h.a = l.snap
        ? u
        : Math.abs(d) > 2.8 && (l.speed || 0) < 0.1
          ? h.a + d * Math.min(1, c * 4)
          : h.a + Math.sign(d) * Math.min(Math.abs(d), c * 7.5);
      let p = l.speed || 0;
      ((h.spd += (p - h.spd) * Math.min(1, c * 6)),
        p === 0 && h.spd < 0.02 && (h.spd = 0),
        (h.ph =
          (h.ph + (c * 2 * Math.PI * h.spd) / (f.stride * f.sc)) %
          (Math.PI * 2e3)));
      let m = l.car !== void 0 ? l.car : ba.env.car,
        g = l.pose || 0;
      if ((h.rt > 0 && (h.rt -= c), h.actT > 0 && (h.actT -= c), m)) {
        let C = e - m.x,
          P = n - m.z,
          I = Math.hypot(C, P);
        g === kn.leap ||
        (I < 10 && m.sp > 6 && C * m.vx + P * m.vz > 0.5 * I * m.sp)
          ? ((h.rx = ni.scared), (h.rt = 1.6))
          : I < 38 &&
            m.sp > 7 &&
            (m.drift > 0.3 || m.air || m.boost) &&
            h.rx !== ni.scared &&
            (h.rx !== ni.wow || h.rt < 1.5) &&
            ((h.rx = ni.wow),
            (h.rt = 2.6),
            p === 0 &&
              !l.pose &&
              ((h.act = f.cheer ? kn.cheer : kn.photo), (h.actT = 2.6)));
        let L = 0;
        if (
          p === 0 &&
          I < 20 &&
          g !== kn.sit &&
          g !== kn.leap &&
          g !== kn.knock
        ) {
          let F = GR(Math.atan2(-C, -P) - h.a);
          L = Math.max(-1.15, Math.min(1.15, F));
        }
        h.yaw += (L - h.yaw) * Math.min(1, c * 4);
      } else h.yaw *= Math.max(0, 1 - c * 4);
      if (l.lookAt) {
        let C = GR(Math.atan2(l.lookAt[0] - e, l.lookAt[1] - n) - h.a);
        h.yaw = Math.max(-1.15, Math.min(1.15, C));
      }
      (h.actT > 0 && g === 0 && p === 0 && (g = h.act),
        (g === kn.leap || g === kn.knock) && h.pose !== g
          ? ((h.pose = g), (h.pw = 1))
          : g !== h.pose
            ? ((h.pw -= c * 7), h.pw <= 0 && ((h.pose = g), (h.pw = 0)))
            : (h.pw = Math.min(1, h.pw + c * 6)));
      let b =
          l.look !== void 0 && l.look !== null
            ? l.look
            : h.rt > 0
              ? h.rx
              : h.pose === kn.talk
                ? Fht
                : f.mood,
        x = r < this.near ? 0 : r < this.mid ? 1 : 2,
        v = f.b,
        y = this.meshes[v][x],
        M = this.counts[v][x]++;
      if (M >= this.max) {
        this.counts[v][x]--;
        return;
      }
      let S = y.instanceMatrix.array,
        w = y.instanceColor.array,
        z = M * 16,
        _ = f.sc * (l.scale || 1),
        R = _ * f.sw,
        T = Math.sin(h.a),
        E = Math.cos(h.a);
      ((S[z] = E * R),
        (S[z + 1] = Oht(f, b) + 16384 * f.seed),
        (S[z + 2] = -T * R),
        (S[z + 3] = h.ph),
        (S[z + 4] = h.yaw),
        (S[z + 5] = _),
        (S[z + 6] = h.pose ? h.pw : 0),
        (S[z + 7] = h.spd / Math.max(0.5, _)),
        (S[z + 8] = T * R),
        (S[z + 9] = l.k || 0),
        (S[z + 10] = E * R),
        (S[z + 11] = h.pose),
        (S[z + 12] = e),
        (S[z + 13] = s),
        (S[z + 14] = n),
        (S[z + 15] = 1),
        (w[M * 3] = b + 16 * f.hc),
        (w[M * 3 + 1] = f.outfit + 32 * f.tone),
        (w[M * 3 + 2] = f.seed / 256));
      let A = this.bb;
      (e < A[0] && (A[0] = e),
        s < A[1] && (A[1] = s),
        n < A[2] && (A[2] = n),
        e > A[3] && (A[3] = e),
        s > A[4] && (A[4] = s),
        n > A[5] && (A[5] = n),
        this.drawn++);
    }
    end() {
      let t = this.bb,
        e = (t[0] + t[3]) / 2,
        s = (t[1] + t[4]) / 2 + 1,
        n = (t[2] + t[5]) / 2,
        o = Math.hypot(t[3] - t[0], t[4] - t[1], t[5] - t[2]) / 2 + 3;
      this.meshes.forEach((a, r) =>
        a.forEach((l, c) => {
          let h = this.counts[r][c];
          ((l.count = h),
            (l.visible = h > 0),
            h &&
              ((l.instanceMatrix.needsUpdate = !0),
              (l.instanceColor.needsUpdate = !0),
              l.boundingSphere.center.set(e, s, n),
              (l.boundingSphere.radius = o)));
        }),
      );
    }
    hide() {
      for (let t of this.meshes)
        for (let e of t) ((e.count = 0), (e.visible = !1));
      this.drawn = 0;
    }
  };
function KG(i) {
  if (ba.env.force) {
    ba.env.car = ba.env.force;
    return;
  }
  if (!i) {
    ba.env.car = null;
    return;
  }
  let t = Math.hypot(i.vel.x, i.vel.z);
  ba.env.car = {
    x: i.pos.x,
    z: i.pos.z,
    y: i.pos.y,
    psi: i.psi,
    vx: i.vel.x,
    vz: i.vel.z,
    sp: t,
    drift: (i.drift || 0) * (Math.abs(i.beta || 0) > 0.2 ? 1 : 0.5),
    air: !!i.air || (i.airTime || 0) > 0.25,
    boost: !!i.nitroOn && t > 20,
  };
}
var Bd = (i) =>
    [kn.walk, kn.phone, kn.talk, kn.cross, kn.think, kn.point][
      bo(i, [4, 3, 1, 1, 0.5, 0.3])
    ],
  Or = () => ba.on && !XG.has("oldpeds");
var WR = { cars: [] };
function Q1(i, t, e, s, n) {
  let o = [];
  for (let a of WR.cars)
    Math.abs(a.x - i) < e && Math.abs(a.z - t) < e && o.push(a);
  if (s && Math.abs(s.pos.x - i) < e && Math.abs(s.pos.z - t) < e) {
    let a = -Math.sin(s.psi),
      r = -Math.cos(s.psi);
    o.push({
      x: s.pos.x,
      z: s.pos.z,
      fx: a,
      fz: r,
      hl: 2.3,
      hw: 1,
      vx: s.vel.x,
      vz: s.vel.z,
      sp: Math.hypot(s.vel.x, s.vel.z),
      player: !0,
      ref: s,
    });
  }
  for (let a of n?.cars || []) {
    if (
      !Number.isFinite(a.x) ||
      Math.abs(a.x - i) > e ||
      Math.abs(a.z - t) > e ||
      a.hidden
    )
      continue;
    let r = a.fx ?? -Math.sin(a.heading || 0),
      l = a.fz ?? -Math.cos(a.heading || 0),
      c = a.v || 0;
    o.push({
      x: a.x,
      z: a.z,
      fx: r,
      fz: l,
      hl: (a.V?.L || 4.6) / 2,
      hw: (a.V?.bw || 1.8) / 2,
      vx: r * c,
      vz: l * c,
      sp: Math.abs(c),
      player: !1,
      ref: a,
    });
  }
  return o;
}
function Qg(i, t, e, s = 0.3) {
  let n = i - e.x,
    o = t - e.z,
    a = n * e.fx + o * e.fz,
    r = n * e.fz - o * e.fx,
    l = e.hl + s - Math.abs(a),
    c = e.hw + s - Math.abs(r);
  if (l <= 0 || c <= 0) return null;
  if (c < l) {
    let f = r >= 0 ? 1 : -1;
    return { pen: c, nx: e.fz * f, nz: -e.fx * f };
  }
  let h = a >= 0 ? 1 : -1;
  return { pen: l, nx: e.fx * h, nz: e.fz * h };
}
function iy(i, t, e) {
  let s = t.sp,
    n = t.vx / Math.max(s, 0.001),
    o = t.vz / Math.max(s, 0.001),
    a = (i.x - t.x) * o - (i.z - t.z) * n,
    r = a >= 0 ? 1 : -1,
    l = Math.max(3, 0.32 * s),
    c = n * s * 0.95 + o * r * l + e.nx,
    h = o * s * 0.95 - n * r * l + e.nz,
    f = Math.hypot(c, h) || 1;
  ((c /= f), (h /= f), (f = Math.min(13, f)));
  let u = Math.min(5, 1.6 + 0.1 * s);
  return (
    (i.kb = {
      vx: c * f,
      vz: h * f,
      vy: u,
      ang: 0,
      w: -(3 + 0.25 * s) * (0.8 + 0.4 * Math.random()),
      ph: "air",
      t: 0,
      n: 0,
      rest: 1.2 + Math.random() * 0.9,
      y: i.y,
      y0: i.y,
      x0: i.x,
      z0: i.z,
    }),
    (i.hx = -c),
    (i.hz = -h),
    Math.min(1, s / 16)
  );
}
