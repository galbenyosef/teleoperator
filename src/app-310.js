// app 310 — math
// Lines 149810-150073 of readable/app.pretty.js (statement-aligned).
var awt = 30,
  rwt = 6,
  gO = "#ff5a1f",
  lwt = (o) => {
    let t = Math.floor(o / 6e4),
      e = (o % 6e4) / 1e3;
    return t + ":" + e.toFixed(2).padStart(5, "0");
  },
  H_ = class {
    constructor(t) {
      if (
        (Object.assign(this, t),
        (this.near = null),
        (this.list = t1.map((s) => ({
          id: s.id,
          name: s.name,
          sub: s.sub,
          x: s.from[0],
          z: s.from[1],
          T: s,
        }))),
        typeof document > "u")
      )
        return;
      let e = (this.hint = document.createElement("div"));
      ((e.id = "raceHint"),
        e.addEventListener("click", (s) => {
          s.target.closest("[data-go]") && (s.stopPropagation(), this.start());
        }),
        (e.className = "ds-panel ds-prompt ds-pop"),
        e.style.setProperty("--c", gO),
        aa("bc", e, 0),
        Th(
          "raceHintCss",
          "#raceHint small { color: var(--ink-3); font-weight: 600; margin-left: 6px; } body.hud-off #raceHint, body.photo #raceHint, body.racing #raceHint, body.cine #raceHint { visibility: hidden; }",
        ));
    }
    best(t) {
      return this.race?.best?.(t) || 0;
    }
    markers() {
      return this.list.map((t) => ({
        x: t.x,
        z: t.z,
        kind: "flag",
        col: gO,
        name: "Road race \xB7 " + t.name,
        stars: 0,
      }));
    }
    candidates() {
      return this.list.map((t) => ({
        id: "r:" + t.id,
        x: t.x,
        z: t.z,
        kind: "race",
        label: "Road race",
        name: t.name,
        col: gO,
        glyph: "\u2691",
        isDone: () => this.best(t.id) > 0,
      }));
    }
    update(t) {
      let e = this.v,
        s = Math.abs(e.speed ?? 0),
        n = null;
      if (t && s < rwt) {
        let i = awt;
        for (let a of this.list) {
          let r = Math.hypot(a.x - e.pos.x, a.z - e.pos.z);
          r < i && ((i = r), (n = a));
        }
      }
      if (n !== this.near && this.hint) {
        if (n) {
          let i = this.best(n.id);
          this.hint.innerHTML = `${Br("race", "sm")}<span class="ds-eyebrow">Road race</span><span>${Or(n.name)}<small>${i ? "best " + lwt(i) : Or(n.sub || "")}</small></span><button type="button" class="primary" data-go>${this.touch ? "" : '<span class="ds-key">E</span>'}Start</button>`;
        }
        this.hint.classList.toggle("on", !!n);
      }
      return ((this.near = n), n);
    }
    start(t = this.near) {
      return !t || !this.race || this.race.S
        ? !1
        : (this.hint?.classList.remove("on"),
          (this.near = null),
          this.race.startSolo({ kind: "path", ...t.T }),
          !0);
    }
  };
es();
var mv = 600,
  cwt = 3.2,
  hwt = 9.8,
  bO = [0.82, 0.9, 0.95],
  fwt = [0.05, 0.05, 0.06];
function uwt() {
  if (typeof document > "u") return null;
  let o = 32,
    t = document.createElement("canvas");
  t.width = t.height = o;
  let e = t.getContext("2d");
  ((e.fillStyle = "#fff"),
    e.beginPath(),
    e.moveTo(o * 0.5, o * 0.08),
    e.lineTo(o * 0.9, o * 0.55),
    e.lineTo(o * 0.42, o * 0.92),
    e.lineTo(o * 0.12, o * 0.4),
    e.closePath(),
    e.fill());
  let s = new Sn(t);
  return ((s.colorSpace = Je), s);
}
var D_ = class {
  constructor(t, { ground: e = null, paint: s = null } = {}) {
    ((this.ground = e),
      (this.paint = s),
      (this.p = []),
      (this.seen = -1),
      (this.spawned = 0));
    let n = new Le();
    (n.setAttribute("position", new Te(new Float32Array(mv * 3), 3)),
      n.setAttribute("color", new Te(new Float32Array(mv * 4), 4)),
      n.setDrawRange(0, 0));
    let i = new _r({
      size: 0.075,
      map: uwt(),
      transparent: !0,
      depthWrite: !1,
      vertexColors: !0,
      sizeAttenuation: !0,
      alphaTest: 0.05,
    });
    ((this.pts = new Zr(n, i)),
      (this.pts.frustumCulled = !1),
      (this.pts.name = "Debris"),
      (this.pts.renderOrder = 3),
      t?.add(this.pts));
  }
  burst(t, e, s, n, i, a) {
    let r = Math.round(Math.min(70, 12 + n * 70)),
      l = this.paint?.() || [0.6, 0.05, 0.04];
    for (let c = 0; c < r; c++) {
      let h = Math.random(),
        f = h < 0.45 ? bO : h < 0.75 ? fwt : l,
        u = Math.random() * Math.PI * 2,
        d = 1.5 + Math.random() * 4.5 * (0.5 + n);
      this.p.push({
        x: t,
        y: e + Math.random() * 0.5,
        z: s,
        vx: i * (0.25 + Math.random() * 0.35) + Math.cos(u) * d,
        vy: 1.2 + Math.random() * (2.5 + 3 * n),
        vz: a * (0.25 + Math.random() * 0.35) + Math.sin(u) * d,
        age: 0,
        life: cwt * (0.6 + Math.random() * 0.4),
        c: f,
        glint: f === bO ? 0.6 + Math.random() * 0.8 : 0,
        rest: !1,
        bounces: 0,
      });
    }
    return (
      this.p.length > mv && this.p.splice(0, this.p.length - mv),
      (this.spawned += r),
      r
    );
  }
  spray(t, e, s, n, i, a, r, l) {
    let c = Math.hypot(n, i, a) || 1;
    ((n /= c), (i /= c), (a /= c));
    for (let h = 0; h < r; h++) {
      let f = l * (0.55 + Math.random() * 0.6),
        u = () => (Math.random() - 0.5) * l * 0.35;
      this.p.push({
        x: t + (Math.random() - 0.5) * 0.8,
        y: e + Math.random() * 0.4,
        z: s + (Math.random() - 0.5) * 0.8,
        vx: n * f + u(),
        vy: i * f + u() + 1.5,
        vz: a * f + u(),
        age: 0,
        life: 1.4 + Math.random() * 1.2,
        c: bO,
        glint: 0.9 + Math.random() * 1.2,
        rest: !1,
        bounces: 0,
      });
    }
    return (
      this.p.length > mv && this.p.splice(0, this.p.length - mv),
      (this.spawned += r),
      r
    );
  }
  update(t, e, s) {
    if (e)
      for (let l of e) {
        if (l.t <= this.seen) continue;
        this.seen = l.t;
        let c = Math.hypot(s?.vel?.x ?? 0, s?.vel?.z ?? 0);
        if (l.s < 0.3 || c < 8) continue;
        let h = this.ground
          ? this.ground(l.x, l.z, s?.pos?.y)
          : (s?.pos?.y ?? 0);
        this.burst(
          l.x,
          (Number.isFinite(h) ? h : (s?.pos?.y ?? 0)) + 0.45,
          l.z,
          l.s,
          s?.vel?.x ?? 0,
          s?.vel?.z ?? 0,
        );
      }
    let n = this.pts.geometry.attributes.position.array,
      i = this.pts.geometry.attributes.color.array,
      a = 0;
    for (let l = this.p.length - 1; l >= 0; l--) {
      let c = this.p[l];
      if (((c.age += t), c.age > c.life)) {
        this.p.splice(l, 1);
        continue;
      }
      if (!c.rest) {
        ((c.vy -= hwt * t),
          (c.x += c.vx * t),
          (c.y += c.vy * t),
          (c.z += c.vz * t));
        let u = this.ground ? this.ground(c.x, c.z, c.y + 1) : -1e9;
        Number.isFinite(u) &&
          c.y < u + 0.02 &&
          ((c.y = u + 0.02),
          c.bounces++,
          (c.vy = c.bounces < 3 ? -c.vy * 0.28 : 0),
          (c.vx *= 0.5),
          (c.vz *= 0.5),
          (c.bounces >= 3 || Math.hypot(c.vx, c.vz) < 0.3) && (c.rest = !0));
      }
      let h = Math.min(1, (c.life - c.age) / 0.8),
        f = c.glint ? 1 + c.glint * Math.max(0, Math.sin(c.age * 31 + l)) : 1;
      ((n[a * 3] = c.x),
        (n[a * 3 + 1] = c.y),
        (n[a * 3 + 2] = c.z),
        (i[a * 4] = c.c[0] * f),
        (i[a * 4 + 1] = c.c[1] * f),
        (i[a * 4 + 2] = c.c[2] * f),
        (i[a * 4 + 3] = h),
        a++);
    }
    let r = this.pts.geometry;
    return (
      r.setDrawRange(0, a),
      (a || this._k) &&
        ((r.attributes.position.needsUpdate = !0),
        (r.attributes.color.needsUpdate = !0)),
      (this._k = a),
      a
    );
  }
};
es();
es();
