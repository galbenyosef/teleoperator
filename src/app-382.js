// app 382 — math
// Lines 190505-190673 of readable/app.pretty.js (statement-aligned).
var Qf = class {
  constructor(t, e = "Beacons") {
    ((this.group = new le()),
      (this.group.name = e),
      (this.items = []),
      t.add(this.group),
      (this._v = new dt()));
  }
  add(t) {
    let e = t.col || Zp[t.kind] || "#fff",
      s = {
        ...t,
        col: e,
        on: !0,
        alpha: 1,
        n: t.stars?.[0] ?? 0,
        of: t.stars?.[1] ?? -1,
      },
      n = new kr({
        map: I6t(),
        color: new It(e),
        transparent: !0,
        depthWrite: !1,
        fog: !1,
      }),
      i = new Jr(n);
    (i.center.set(0.5, 0),
      (i.renderOrder = 4),
      (s.cv = eit(t.kind, e, s.n, s.of)),
      (s.tex = new Sn(s.cv)),
      (s.tex.colorSpace = Je));
    let a = new Jr(
      new kr({ map: s.tex, transparent: !0, depthWrite: !1, fog: !1 }),
    );
    (a.center.set(0.5, s.of > 0 ? 0.4 : 0.5), (a.renderOrder = 5));
    for (let r of [i, a])
      ((r.userData.mbNoReflect = !0),
        (r.castShadow = r.receiveShadow = !1),
        (r.frustumCulled = !1),
        this.group.add(r));
    return ((s.beam = i), (s.icon = a), this.items.push(s), s);
  }
  setStars(t, e) {
    if (t.n === e) return;
    t.n = e;
    let s = eit(t.kind, t.col, e, t.of),
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
      i = Math.max(240, globalThis.innerHeight || 720),
      a = (2 * Math.tan(((t.fov || 60) * Math.PI) / 360)) / i;
    for (let r of this.items) {
      let l = Math.hypot(r.x - s, r.z - n),
        { beam: c, icon: h } = r;
      if (!r.on || l > Qnt) {
        c.visible = h.visible = !1;
        continue;
      }
      let f = e ? e(r) : 1,
        u = Math.min(1, (Qnt - l) / 150),
        d = Math.max(0.9, l * a * 6),
        p = r.h ?? 90;
      (c.position.set(r.x, r.y - 0.3, r.z),
        c.scale.set(d, p, 1),
        (c.material.opacity =
          0.85 *
          u *
          f *
          (0.25 + 0.75 * Math.min(1, Math.max(0, (l - 10) / 45)))));
      let m = tit + (L6t - tit) * Math.min(1, Math.max(0, (l - 80) / 400)),
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
var wT = class {
    constructor(t, e, s) {
      ((this.st = e),
        (this.group = new le()),
        (this.group.name = "Stunts"),
        (this.items = []),
        (this.shown = {}),
        (this.beacons = new Qf(this.group, "StuntBeacons")),
        t.add(this.group));
      for (let n of e.list)
        ((this.shown[n.id] = e.best[n.id] || 0),
          n.gates.forEach((i, a) => {
            let r = Number.isFinite(i.y) ? i.y : s(i.x, i.z),
              l = new It(ql[n.kind].col).multiplyScalar(1.6),
              c = new ye(
                new Yn(n.hw * 2, 1.2),
                new Ys({
                  color: l,
                  transparent: !0,
                  opacity: 0.5,
                  depthWrite: !1,
                  side: ls,
                  fog: !1,
                }),
              );
            (c.rotation.set(
              -Math.PI / 2,
              Math.atan2(i.dir[0], i.dir[1]),
              0,
              "YXZ",
            ),
              c.position.set(i.x, r + 0.06, i.z),
              (c.renderOrder = 3),
              (c.userData.mbNoReflect = !0),
              (c.castShadow = c.receiveShadow = !1),
              (c.frustumCulled = !1),
              this.group.add(c));
            let h =
              a === 0
                ? this.beacons.add({
                    sid: n.id,
                    x: i.x,
                    y: r,
                    z: i.z,
                    kind: n.kind,
                    col: ql[n.kind].col,
                    stars: [sit(e, n), 3],
                    lift: n.kind === "jump" ? 4 : 6,
                  })
                : null;
            this.items.push({ s: n, g: i, y: r, band: c, b: h });
          }));
    }
    update(t) {
      let e = t.position.x,
        s = t.position.z,
        n = this.st.live?.s;
      for (let i of this.items) {
        let { s: a, g: r, band: l, b: c } = i,
          h = this.st.best[a.id] || 0;
        c &&
          h !== this.shown[a.id] &&
          ((this.shown[a.id] = h), this.beacons.setStars(c, sit(this.st, a)));
        let f = Math.hypot(r.x - e, r.z - s);
        ((l.material.opacity =
          0.5 *
          Math.min(1, Math.max(0, (300 - f) / 100)) *
          (n === a ? 1 : 0.8) *
          (n && n !== a ? 0.4 : 1)),
          (l.visible = l.material.opacity > 0.02),
          l.visible && l.updateMatrixWorld());
      }
      this.beacons.update(t, n ? (i) => (i.sid === n.id ? 1 : 0.3) : null);
    }
  },
  sit = (o, t) => {
    let e = o.best[t.id] || 0;
    return e ? Fc(t, e) : 0;
  };
