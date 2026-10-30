// app 80 — math
// Lines 71541-71872 of readable/app.pretty.js (statement-aligned).
var opt = (o, t) =>
    (o.hair << lp.hair[0]) |
    (o.hat << lp.hat[0]) |
    ((t === li.cool ? 1 : 0) << lp.glasses[0]) |
    ((t === li.wow ? 1 : 0) << lp.cloud[0]) |
    (o.bag << lp.bag[0]) |
    (o.top << lp.top[0]) |
    (o.bottom << lp.bottom[0]),
  xP = (o) => Math.atan2(Math.sin(o), Math.cos(o)),
  Q0 = class {
    constructor(
      t,
      e,
      { shadows: s = 0, near: n = KW[0], mid: i = KW[1] } = {},
    ) {
      let a = npt();
      (globalThis.SF_LITE &&
        ((n = Math.min(n, 12)), (i = Math.min(i, 40)), (s = -1)),
        (this.near = n),
        (this.mid = i),
        (this.max = e),
        (this.group = new le()),
        (this.group.name = t),
        (this.meshes = (Om ? Z5 : Db).map((r, l) =>
          [0, 1, 2].map((c) => {
            let h = new En(Om ? jW(l, c) : UW(l, c), a, e);
            return (
              (h.count = 0),
              (h.frustumCulled = !1),
              (h.castShadow = c <= s),
              (h.receiveShadow = !0),
              (h.name = `${t}_${r.name}_lod${c}`),
              (h.userData.mbMover = !0),
              (h.matrixAutoUpdate = !1),
              (h.visible = !1),
              h.setColorAt(0, new It(1, 1, 1)),
              (h.boundingSphere = new _n(new dt(), 1)),
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
    put(t, e, s, n, i, a, r, l = {}) {
      let c = this.dt,
        h = t.vx;
      h ||
        (h = t.vx =
          {
            L: t.look || uf(l.rnd || Math.random, { kid: l.kid ?? null }),
            a: Math.atan2(i, a),
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
      let u = Math.atan2(i, a),
        d = xP(u - h.a);
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
      let m = l.car !== void 0 ? l.car : Ea.env.car,
        g = l.pose || 0;
      if ((h.rt > 0 && (h.rt -= c), h.actT > 0 && (h.actT -= c), m)) {
        let P = e - m.x,
          C = n - m.z,
          I = Math.hypot(P, C);
        g === Rn.leap ||
        (I < 10 && m.sp > 6 && P * m.vx + C * m.vz > 0.5 * I * m.sp)
          ? ((h.rx = li.scared), (h.rt = 1.6))
          : I < 38 &&
            m.sp > 7 &&
            (m.drift > 0.3 || m.air || m.boost) &&
            h.rx !== li.scared &&
            (h.rx !== li.wow || h.rt < 1.5) &&
            ((h.rx = li.wow),
            (h.rt = 2.6),
            p === 0 &&
              !l.pose &&
              ((h.act = f.cheer ? Rn.cheer : Rn.photo), (h.actT = 2.6)));
        let L = 0;
        if (
          p === 0 &&
          I < 20 &&
          g !== Rn.sit &&
          g !== Rn.leap &&
          g !== Rn.knock
        ) {
          let F = xP(Math.atan2(-P, -C) - h.a);
          L = Math.max(-1.15, Math.min(1.15, F));
        }
        h.yaw += (L - h.yaw) * Math.min(1, c * 4);
      } else h.yaw *= Math.max(0, 1 - c * 4);
      if (l.lookAt) {
        let P = xP(Math.atan2(l.lookAt[0] - e, l.lookAt[1] - n) - h.a);
        h.yaw = Math.max(-1.15, Math.min(1.15, P));
      }
      (h.actT > 0 && g === 0 && p === 0 && (g = h.act),
        (g === Rn.leap || g === Rn.knock) && h.pose !== g
          ? ((h.pose = g), (h.pw = 1))
          : g !== h.pose
            ? ((h.pw -= c * 7), h.pw <= 0 && ((h.pose = g), (h.pw = 0)))
            : (h.pw = Math.min(1, h.pw + c * 6)));
      let b =
          l.look !== void 0 && l.look !== null
            ? l.look
            : h.rt > 0
              ? h.rx
              : h.pose === Rn.talk
                ? spt
                : f.mood,
        v = r < this.near ? 0 : r < this.mid ? 1 : 2,
        x = f.b,
        y = this.meshes[x][v],
        M = this.counts[x][v]++;
      if (M >= this.max) {
        this.counts[x][v]--;
        return;
      }
      let S = y.instanceMatrix.array,
        w = y.instanceColor.array,
        _ = M * 16,
        z = f.sc * (l.scale || 1),
        A = z * f.sw,
        T = Math.sin(h.a),
        E = Math.cos(h.a);
      ((S[_] = E * A),
        (S[_ + 1] = opt(f, b) + 16384 * f.seed),
        (S[_ + 2] = -T * A),
        (S[_ + 3] = h.ph),
        (S[_ + 4] = h.yaw),
        (S[_ + 5] = z),
        (S[_ + 6] = h.pose ? h.pw : 0),
        (S[_ + 7] = h.spd / Math.max(0.5, z)),
        (S[_ + 8] = T * A),
        (S[_ + 9] = l.k || 0),
        (S[_ + 10] = E * A),
        (S[_ + 11] = h.pose),
        (S[_ + 12] = e),
        (S[_ + 13] = s),
        (S[_ + 14] = n),
        (S[_ + 15] = 1),
        (w[M * 3] = b + 16 * f.hc),
        (w[M * 3 + 1] = f.outfit + 32 * f.tone),
        (w[M * 3 + 2] = f.seed / 256));
      let R = this.bb;
      (e < R[0] && (R[0] = e),
        s < R[1] && (R[1] = s),
        n < R[2] && (R[2] = n),
        e > R[3] && (R[3] = e),
        s > R[4] && (R[4] = s),
        n > R[5] && (R[5] = n),
        this.drawn++);
    }
    end() {
      let t = this.bb,
        e = (t[0] + t[3]) / 2,
        s = (t[1] + t[4]) / 2 + 1,
        n = (t[2] + t[5]) / 2,
        i = Math.hypot(t[3] - t[0], t[4] - t[1], t[5] - t[2]) / 2 + 3;
      this.meshes.forEach((a, r) =>
        a.forEach((l, c) => {
          let h = this.counts[r][c];
          ((l.count = h),
            (l.visible = h > 0),
            h &&
              ((l.instanceMatrix.needsUpdate = !0),
              (l.instanceColor.needsUpdate = !0),
              l.boundingSphere.center.set(e, s, n),
              (l.boundingSphere.radius = i)));
        }),
      );
    }
    hide() {
      for (let t of this.meshes)
        for (let e of t) ((e.count = 0), (e.visible = !1));
      this.drawn = 0;
    }
  };
function JW(o) {
  if (Ea.env.force) {
    Ea.env.car = Ea.env.force;
    return;
  }
  if (!o) {
    Ea.env.car = null;
    return;
  }
  let t = Math.hypot(o.vel.x, o.vel.z);
  Ea.env.car = {
    x: o.pos.x,
    z: o.pos.z,
    y: o.pos.y,
    psi: o.psi,
    vx: o.vel.x,
    vz: o.vel.z,
    sp: t,
    drift: (o.drift || 0) * (Math.abs(o.beta || 0) > 0.2 ? 1 : 0.5),
    air: !!o.air || (o.airTime || 0) > 0.25,
    boost: !!o.nitroOn && t > 20,
  };
}
var gp = (o) =>
    [Rn.walk, Rn.phone, Rn.talk, Rn.cross, Rn.think, Rn.point][
      zo(o, [4, 3, 1, 1, 0.5, 0.3])
    ],
  i0 = () => Ea.on && !YW.has("oldpeds");
var vP = { cars: [] };
function Bm(o, t, e, s, n) {
  let i = [];
  for (let a of vP.cars)
    Math.abs(a.x - o) < e && Math.abs(a.z - t) < e && i.push(a);
  if (s && Math.abs(s.pos.x - o) < e && Math.abs(s.pos.z - t) < e) {
    let a = -Math.sin(s.psi),
      r = -Math.cos(s.psi);
    i.push({
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
      Math.abs(a.x - o) > e ||
      Math.abs(a.z - t) > e ||
      a.hidden
    )
      continue;
    let r = a.fx ?? -Math.sin(a.heading || 0),
      l = a.fz ?? -Math.cos(a.heading || 0),
      c = a.v || 0,
      h = a.wreck,
      f = h ? h.vx : r * c,
      u = h ? h.vz : l * c;
    i.push({
      x: a.x,
      z: a.z,
      fx: r,
      fz: l,
      hl: (a.V?.L || 4.6) / 2,
      hw: (a.V?.bw || 1.8) / 2,
      vx: f,
      vz: u,
      sp: Math.hypot(f, u),
      player: !1,
      ref: a,
    });
  }
  return i;
}
function Nm(o, t, e, s = 0.3) {
  let n = o - e.x,
    i = t - e.z,
    a = n * e.fx + i * e.fz,
    r = n * e.fz - i * e.fx,
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
function Q5(o, t, e) {
  let s = t.sp,
    n = t.vx / Math.max(s, 0.001),
    i = t.vz / Math.max(s, 0.001),
    a = (o.x - t.x) * i - (o.z - t.z) * n,
    r = a >= 0 ? 1 : -1,
    l = Math.max(3, 0.32 * s),
    c = n * s * 0.95 + i * r * l + e.nx,
    h = i * s * 0.95 - n * r * l + e.nz,
    f = Math.hypot(c, h) || 1;
  ((c /= f), (h /= f), (f = Math.min(13, f)));
  let u = Math.min(5, 1.6 + 0.1 * s);
  return (
    (o.kb = {
      vx: c * f,
      vz: h * f,
      vy: u,
      ang: 0,
      w: -(3 + 0.25 * s) * (0.8 + 0.4 * Math.random()),
      ph: "air",
      t: 0,
      n: 0,
      rest: 1.2 + Math.random() * 0.9,
      y: o.y,
      y0: o.y,
      x0: o.x,
      z0: o.z,
    }),
    (o.hx = -c),
    (o.hz = -h),
    Math.min(1, s / 16)
  );
}
