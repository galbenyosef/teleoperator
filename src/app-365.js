// app 365 — math
// Lines 182395-182563 of readable/app.pretty.js (statement-aligned).
var vf = class {
  constructor(t, e = "Beacons") {
    ((this.group = new ke()),
      (this.group.name = e),
      (this.items = []),
      t.add(this.group),
      (this._v = new xt()));
  }
  add(t) {
    let e = t.col || xp[t.kind] || "#fff",
      s = {
        ...t,
        col: e,
        on: !0,
        alpha: 1,
        n: t.stars?.[0] ?? 0,
        of: t.stars?.[1] ?? -1,
      },
      n = new M0({
        map: Gyt(),
        color: new $t(e),
        transparent: !0,
        depthWrite: !1,
        fog: !1,
      }),
      o = new K0(n);
    (o.center.set(0.5, 0),
      (o.renderOrder = 4),
      (s.cv = Wtt(t.kind, e, s.n, s.of)),
      (s.tex = new Sn(s.cv)),
      (s.tex.colorSpace = is));
    let a = new K0(
      new M0({ map: s.tex, transparent: !0, depthWrite: !1, fog: !1 }),
    );
    (a.center.set(0.5, s.of > 0 ? 0.4 : 0.5), (a.renderOrder = 5));
    for (let r of [o, a])
      ((r.userData.mbNoReflect = !0),
        (r.castShadow = r.receiveShadow = !1),
        (r.frustumCulled = !1),
        this.group.add(r));
    return ((s.beam = o), (s.icon = a), this.items.push(s), s);
  }
  setStars(t, e) {
    if (t.n === e) return;
    t.n = e;
    let s = Wtt(t.kind, t.col, e, t.of),
      n = t.cv.getContext("2d");
    (n.clearRect(0, 0, s.width, s.height),
      n.drawImage(s, 0, 0),
      (t.tex.needsUpdate = !0));
  }
  show(t, e) {
    t.on = !!e;
  }
  update(t, e = null) {
    let s = t.position.x,
      n = t.position.z,
      o = Math.max(240, globalThis.innerHeight || 720),
      a = (2 * Math.tan(((t.fov || 60) * Math.PI) / 360)) / o;
    for (let r of this.items) {
      let l = Math.hypot(r.x - s, r.z - n),
        { beam: c, icon: h } = r;
      if (!r.on || l > Utt) {
        c.visible = h.visible = !1;
        continue;
      }
      let f = e ? e(r) : 1,
        u = Math.min(1, (Utt - l) / 150),
        d = Math.max(0.9, l * a * 6),
        p = r.h ?? 90;
      (c.position.set(r.x, r.y - 0.3, r.z),
        c.scale.set(d, p, 1),
        (c.material.opacity =
          0.85 *
          u *
          f *
          (0.25 + 0.75 * Math.min(1, Math.max(0, (l - 10) / 45)))));
      let m = Gtt + (Uyt - Gtt) * Math.min(1, Math.max(0, (l - 80) / 400)),
        g = Math.max(1.2, l * a * m),
        b = (r.lift ?? 6) + g * 0.5 + l * 0.006;
      (h.position.set(r.x, r.y + b, r.z),
        h.scale.set(g, g * (r.of > 0 ? 1.25 : 1), 1),
        (h.material.opacity = u * f * Math.min(1, Math.max(0, (l - 28) / 22))),
        (c.visible = c.material.opacity > 0.01),
        (h.visible = h.material.opacity > 0.01),
        c.updateMatrixWorld(),
        h.updateMatrixWorld());
    }
  }
};
var sE = class {
    constructor(t, e, s) {
      ((this.st = e),
        (this.group = new ke()),
        (this.group.name = "Stunts"),
        (this.items = []),
        (this.shown = {}),
        (this.beacons = new vf(this.group, "StuntBeacons")),
        t.add(this.group));
      for (let n of e.list)
        ((this.shown[n.id] = e.best[n.id] || 0),
          n.gates.forEach((o, a) => {
            let r = Number.isFinite(o.y) ? o.y : s(o.x, o.z),
              l = new $t(Ml[n.kind].col).multiplyScalar(1.6),
              c = new _e(
                new $n(n.hw * 2, 1.2),
                new ln({
                  color: l,
                  transparent: !0,
                  opacity: 0.5,
                  depthWrite: !1,
                  side: Ss,
                  fog: !1,
                }),
              );
            (c.rotation.set(
              -Math.PI / 2,
              Math.atan2(o.dir[0], o.dir[1]),
              0,
              "YXZ",
            ),
              c.position.set(o.x, r + 0.06, o.z),
              (c.renderOrder = 3),
              (c.userData.mbNoReflect = !0),
              (c.castShadow = c.receiveShadow = !1),
              (c.frustumCulled = !1),
              this.group.add(c));
            let h =
              a === 0
                ? this.beacons.add({
                    sid: n.id,
                    x: o.x,
                    y: r,
                    z: o.z,
                    kind: n.kind,
                    col: Ml[n.kind].col,
                    stars: [qtt(e, n), 3],
                    lift: n.kind === "jump" ? 4 : 6,
                  })
                : null;
            this.items.push({ s: n, g: o, y: r, band: c, b: h });
          }));
    }
    update(t) {
      let e = t.position.x,
        s = t.position.z,
        n = this.st.live?.s;
      for (let o of this.items) {
        let { s: a, g: r, band: l, b: c } = o,
          h = this.st.best[a.id] || 0;
        c &&
          h !== this.shown[a.id] &&
          ((this.shown[a.id] = h), this.beacons.setStars(c, qtt(this.st, a)));
        let f = Math.hypot(r.x - e, r.z - s);
        ((l.material.opacity =
          0.5 *
          Math.min(1, Math.max(0, (300 - f) / 100)) *
          (n === a ? 1 : 0.8) *
          (n && n !== a ? 0.4 : 1)),
          (l.visible = l.material.opacity > 0.02),
          l.visible && l.updateMatrixWorld());
      }
      this.beacons.update(t, n ? (o) => (o.sid === n.id ? 1 : 0.3) : null);
    }
  },
  qtt = (i, t) => {
    let e = i.best[t.id] || 0;
    return e ? rc(t, e) : 0;
  };
