// app 286 — math
// Lines 139983-140318 of readable/app.pretty.js (statement-aligned).
function Dyt(o, t, e, s) {
  let l = {},
    c = new Set(),
    h = (y, M) => Math.floor(y / 6) * 100003 + Math.floor(M / 6);
  {
    let y = o.props,
      M = new Set(["tree", "ptree"].map((S) => y.kinds.indexOf(S)));
    for (let S = 0; S < y.n; S++) {
      let w = y.pf[S * 5],
        _ = y.pf[S * 5 + 1];
      w > -7180 &&
        w < -5840 &&
        _ > -1360 &&
        _ < -440 &&
        M.has(y.pk[S]) &&
        c.add(h(w, _));
    }
  }
  let f = 3,
    u = Math.ceil(1380 / f),
    d = Math.ceil(960 / f),
    p = new Uint8Array(u * d),
    m = -7200,
    g = -1380,
    b = [];
  for (let y of o.edges) {
    let M = !1;
    for (
      let S = 0;
      S < y.n && !M;
      S = S + 3 < y.n || S === y.n - 1 ? S + 3 : y.n - 1
    ) {
      let w = y.P[S * 3],
        _ = y.P[S * 3 + 1];
      w > m && w < -5820 && _ > g && _ < -420 && (M = !0);
    }
    if (M) {
      b.push({ E: y });
      for (let S = 0; S <= y.L + 4.9; S += 5) {
        if (
          (Ot(y, Math.min(S, y.L), l),
          l.x < m || l.x > -5820 || l.z < g || l.z > -420)
        )
          continue;
        let w = l.w + (y.sw || 0) + 4,
          _ = Math.round((l.x - m) / f),
          z = Math.round((l.z - g) / f),
          A = Math.ceil(w / f);
        for (let T = z - A; T <= z + A; T++)
          if (!(T < 0 || T >= d))
            for (let E = _ - A; E <= _ + A; E++) {
              if (E < 0 || E >= u) continue;
              let R = m + E * f - l.x,
                P = g + T * f - l.z;
              R * R + P * P <= w * w && (p[T * u + E] = 1);
            }
      }
    }
  }
  let v = (y, M) => {
      let S = Math.round((y - m) / f),
        w = Math.round((M - g) / f);
      return S >= 0 && w >= 0 && S < u && w < d && !p[w * u + S];
    },
    x = 0;
  for (let { E: y } of b)
    if (!(
      !(y.hwy || y.name === "Presidio Parkway") ||
      y.tunnel ||
      y.tunnelR ||
      /Golden Gate/.test(y.name) ||
      y.L < 20
    ))
      for (let M = 3; M < y.L - 3; M += 7)
        for (let S of [-1, 1]) {
          if (
            Fo(y.sid, M, S + 3) > 0.8 ||
            (Ot(y, M, l),
            l.x < -7140 || l.x > -5880 || l.z < -1320 || l.z > -480)
          )
            continue;
          let w = l.w + 6 + 24 * Fo(y.sid, M, S + 5) ** 1.5,
            _ = 3 * (Fo(y.sid, M, S + 7) - 0.5),
            z = l.x + l.nx * w * S + l.dx * _,
            A = l.z + l.nz * w * S + l.dz * _,
            T = t.coverAt(z, A);
          if (
            T & 8 ||
            ((T & 7) !== 1 && (T & 7) !== 2) ||
            c.has(h(z, A)) ||
            !v(z, A)
          )
            continue;
          let E = t.terrainAt(z, A);
          if (Kb(o, z, A, E)) continue;
          c.add(h(z, A));
          let R = Fo(z, A, 13) < 0.72;
          (e.push({
            kind: "tree",
            x: z,
            y: E,
            z: A,
            rot: Fo(z, A, 14) * 6.283,
            scale: R ? 1 + 0.4 * Fo(z, A, 15) : 0.9 + 0.3 * Fo(z, A, 15),
            sp: R ? "euc" : "cypress",
          }),
            s.push({ t: "circ", x: z, z: A, r: 0.45, y0: E - 1.5, y1: E + 6 }),
            x++);
        }
  return x;
}
var cv = 64,
  Uyt = 120,
  VF = 150,
  M_ = 160,
  Gyt = { setMatrixAt() {}, instanceMatrix: {} },
  S_ = class {
    constructor({ world: t, models: e, hf: s = null, scene: n = null }) {
      ((this.world = t),
        (this.models = e),
        (this.hf = s),
        (this.grid = new Map()),
        (this.done = 0),
        (this.active = new Map()),
        (this.on = !0),
        (this.group = new le()),
        (this.group.name = "ExtraParked"),
        n?.add(this.group),
        (this.ims = {}),
        (this.free = {}),
        (this._m = new fe()),
        (this._q = new tn()),
        (this._e = new vi()),
        (this._v = new dt()),
        (this._one = new dt(1, 1, 1)),
        (this.zero = new fe().makeScale(0, 0, 0)),
        (this.stats = { active: 0, drawn: 0, total: 0 }));
    }
    mesh(t) {
      if (this.ims[t] !== void 0) return this.ims[t];
      let e = this.models?.[t];
      if (!e) return (this.ims[t] = null);
      let s = new En(e.geo1 || e.geo, e.mat, M_);
      ((s.name = "extraParked_" + t),
        (s.frustumCulled = !1),
        (s.castShadow = !0),
        (s.receiveShadow = !0));
      for (let n = 0; n < M_; n++) s.setMatrixAt(n, this.zero);
      return (
        s.setColorAt(0, new It(1, 1, 1)),
        (s.instanceMatrix.needsUpdate = !0),
        this.group.add(s),
        (this.free[t] = Array.from({ length: M_ }, (n, i) => M_ - 1 - i)),
        (this.ims[t] = s)
      );
    }
    index() {
      for (; this.done < $p.n; this.done++) {
        let t = this.done,
          e = $p.a,
          s = Math.floor(e[t * 7] / cv) * 65536 + Math.floor(e[t * 7 + 2] / cv),
          n = this.grid.get(s);
        (n || this.grid.set(s, (n = [])), n.push(t));
      }
      this.stats.total = $p.n;
    }
    activate(t) {
      let e = $p.a,
        s = t * 7,
        n = {
          kind: "car",
          x: e[s],
          y: e[s + 1],
          z: e[s + 2],
          rot: e[s + 3],
          pitch: e[s + 4],
          roll: 0,
          color: e[s + 5],
          type: e[s + 6],
          extra: !0,
        };
      this.hf && RF(n, this.hf);
      let i = Jx(n),
        a = Io[i] || Io.sedan,
        r = this.mesh(i),
        l = {
          t: "obb",
          x: n.x,
          z: n.z,
          hx: a.bw / 2,
          hz: a.L / 2,
          c: Math.cos(n.rot),
          s: Math.sin(n.rot),
          parked: !0,
          type: n.type,
          y0: n.y - 1.5,
          y1: n.y + 2.5,
          p: n,
          kind: i,
        };
      (this._e.set(n.pitch || 0, n.rot || 0, n.roll || 0, "YXZ"),
        this._q.setFromEuler(this._e));
      let c = (n.P = {
        x: n.x,
        z: n.z,
        n: i,
        paint: u_(n.color),
        m: new fe().compose(this._v.set(n.x, n.y, n.z), this._q, this._one),
        ti: null,
        tk: -1,
        tier: 2,
        extra: !0,
        im: Gyt,
        k: 0,
      });
      this.world.index(l);
      let h = { i: t, c: l, p: n, P: c, im: r, slot: -1 };
      return (this.active.set(t, h), h);
    }
    show(t, e) {
      if (t.im)
        if (e && t.slot < 0) {
          let s = this.free[t.P.n].pop();
          if (s === void 0) return;
          ((t.slot = s),
            (t.P.ti = t.im),
            (t.P.tk = s),
            (t.P.tier = 1),
            t.im.setMatrixAt(s, t.P.m),
            t.im.setColorAt(s, t.P.paint),
            (t.im.instanceMatrix.needsUpdate = !0),
            (t.im.instanceColor.needsUpdate = !0));
        } else
          !e &&
            t.slot >= 0 &&
            (t.im.setMatrixAt(t.slot, this.zero),
            (t.im.instanceMatrix.needsUpdate = !0),
            this.free[t.P.n].push(t.slot),
            (t.slot = -1),
            (t.P.ti = null),
            (t.P.tk = -1),
            (t.P.tier = 2));
    }
    release(t) {
      (this.show(t, !1),
        t.c.b && this.world.parked?.sleep?.(t.c),
        this.world.unindex(t.c),
        this.active.delete(t.i));
    }
    update(t, e, s = null) {
      if (
        ($p.n > this.done && this.index(), !this.on || this.world.parkedOff)
      ) {
        for (let r of [...this.active.values()]) this.release(r);
        return;
      }
      let n = s?.length ? [[t, e], ...s] : [[t, e]],
        i = $p.a;
      for (let [r, l] of n) {
        let c = VF,
          h = Math.floor((r - c) / cv),
          f = Math.floor((r + c) / cv),
          u = Math.floor((l - c) / cv),
          d = Math.floor((l + c) / cv);
        for (let p = h; p <= f; p++)
          for (let m = u; m <= d; m++) {
            let g = this.grid.get(p * 65536 + m);
            if (g)
              for (let b of g)
                !this.active.has(b) &&
                  Math.hypot(i[b * 7] - r, i[b * 7 + 2] - l) < VF &&
                  this.activate(b);
          }
      }
      let a = 0;
      for (let r of [...this.active.values()]) {
        let l = Math.hypot(r.c.x - t, r.c.z - e),
          c = !!r.c.b,
          h = l;
        for (let f = 1; f < n.length; f++)
          h = Math.min(h, Math.hypot(r.c.x - n[f][0], r.c.z - n[f][1]));
        if (h > VF + 20 && !c) {
          this.release(r);
          continue;
        }
        (this.show(r, l < Uyt || c), r.slot >= 0 && a++);
      }
      ((this.stats.active = this.active.size), (this.stats.drawn = a));
    }
    setParked(t) {
      ((this.on = !!t), (this.group.visible = this.on));
    }
  };
es();
Pn();
function Fr(o, t, e) {
  let s = new Float32Array(t * t);
  for (let n = 0; n < s.length; n++) s[n] = e();
  return (n, i) => {
    let a = (n / o) * t,
      r = (i / o) * t,
      l = Math.floor(a),
      c = Math.floor(r),
      h = a - l,
      f = r - c,
      u = h * h * (3 - 2 * h),
      d = f * f * (3 - 2 * f),
      p = (b, v) => s[(((v % t) + t) % t) * t + (((b % t) + t) % t)],
      m = p(l, c) + (p(l + 1, c) - p(l, c)) * u,
      g = p(l, c + 1) + (p(l + 1, c + 1) - p(l, c + 1)) * u;
    return m + (g - m) * d;
  };
}
function MM(o, t, e) {
  let s = 0,
    n = 0,
    i = 0.5;
  for (let a of o) ((s += a(t, e) * i), (n += i), (i *= 0.5));
  return s / n;
}
function RQ(o, t, e = !0) {
  let s = document.createElement("canvas");
  s.width = s.height = o;
  let n = s.getContext("2d"),
    i = n.createImageData(o, o);
  (t(i.data, o, n), n.putImageData(i, 0, 0));
  let a = new Sn(s);
  return (
    (a.wrapS = a.wrapT = oi),
    (a.anisotropy = 8),
    (a.colorSpace = e ? Je : Nn),
    (a.generateMipmaps = !0),
    (a.minFilter = ma),
    a
  );
}
