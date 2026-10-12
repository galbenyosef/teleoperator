// app 307 — math
// Lines 148078-148421 of readable/app.pretty.js (statement-aligned).
var vvt = 30,
  yvt = 6,
  FI = "#ff5a1f",
  wvt = (i) => {
    let t = Math.floor(i / 6e4),
      e = (i % 6e4) / 1e3;
    return t + ":" + e.toFixed(2).padStart(5, "0");
  },
  N_ = class {
    constructor(t) {
      if (
        (Object.assign(this, t),
        (this.near = null),
        (this.list = Lu.map((s) => ({
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
        e.style.setProperty("--c", FI),
        Jo("bc", e, 0),
        Zc(
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
        col: FI,
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
        col: FI,
        glyph: "\u2691",
        isDone: () => this.best(t.id) > 0,
      }));
    }
    update(t) {
      let e = this.v,
        s = Math.abs(e.speed ?? 0),
        n = null;
      if (t && s < yvt) {
        let o = vvt;
        for (let a of this.list) {
          let r = Math.hypot(a.x - e.pos.x, a.z - e.pos.z);
          r < o && ((o = r), (n = a));
        }
      }
      if (n !== this.near && this.hint) {
        if (n) {
          let o = this.best(n.id);
          this.hint.innerHTML = `${wr("race", "sm")}<span class="ds-eyebrow">Road race</span><span>${yr(n.name)}<small>${o ? "best " + wvt(o) : yr(n.sub || "")}</small></span><button type="button" class="primary" data-go>${this.touch ? "" : '<span class="ds-key">E</span>'}Start</button>`;
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
as();
var B_ = 600,
  Mvt = 3.2,
  Svt = 9.8,
  fZ = [0.82, 0.9, 0.95],
  kvt = [0.05, 0.05, 0.06];
function _vt() {
  if (typeof document > "u") return null;
  let i = 32,
    t = document.createElement("canvas");
  t.width = t.height = i;
  let e = t.getContext("2d");
  ((e.fillStyle = "#fff"),
    e.beginPath(),
    e.moveTo(i * 0.5, i * 0.08),
    e.lineTo(i * 0.9, i * 0.55),
    e.lineTo(i * 0.42, i * 0.92),
    e.lineTo(i * 0.12, i * 0.4),
    e.closePath(),
    e.fill());
  let s = new Sn(t);
  return ((s.colorSpace = is), s);
}
var O_ = class {
  constructor(t, { ground: e = null, paint: s = null } = {}) {
    ((this.ground = e),
      (this.paint = s),
      (this.p = []),
      (this.seen = -1),
      (this.spawned = 0));
    let n = new De();
    (n.setAttribute("position", new Te(new Float32Array(B_ * 3), 3)),
      n.setAttribute("color", new Te(new Float32Array(B_ * 4), 4)),
      n.setDrawRange(0, 0));
    let o = new n0({
      size: 0.075,
      map: _vt(),
      transparent: !0,
      depthWrite: !1,
      vertexColors: !0,
      sizeAttenuation: !0,
      alphaTest: 0.05,
    });
    ((this.pts = new S0(n, o)),
      (this.pts.frustumCulled = !1),
      (this.pts.name = "Debris"),
      (this.pts.renderOrder = 3),
      t?.add(this.pts));
  }
  burst(t, e, s, n, o, a) {
    let r = Math.round(Math.min(70, 12 + n * 70)),
      l = this.paint?.() || [0.6, 0.05, 0.04];
    for (let c = 0; c < r; c++) {
      let h = Math.random(),
        f = h < 0.45 ? fZ : h < 0.75 ? kvt : l,
        u = Math.random() * Math.PI * 2,
        d = 1.5 + Math.random() * 4.5 * (0.5 + n);
      this.p.push({
        x: t,
        y: e + Math.random() * 0.5,
        z: s,
        vx: o * (0.25 + Math.random() * 0.35) + Math.cos(u) * d,
        vy: 1.2 + Math.random() * (2.5 + 3 * n),
        vz: a * (0.25 + Math.random() * 0.35) + Math.sin(u) * d,
        age: 0,
        life: Mvt * (0.6 + Math.random() * 0.4),
        c: f,
        glint: f === fZ ? 0.6 + Math.random() * 0.8 : 0,
        rest: !1,
        bounces: 0,
      });
    }
    return (
      this.p.length > B_ && this.p.splice(0, this.p.length - B_),
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
      o = this.pts.geometry.attributes.color.array,
      a = 0;
    for (let l = this.p.length - 1; l >= 0; l--) {
      let c = this.p[l];
      if (((c.age += t), c.age > c.life)) {
        this.p.splice(l, 1);
        continue;
      }
      if (!c.rest) {
        ((c.vy -= Svt * t),
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
        (o[a * 4] = c.c[0] * f),
        (o[a * 4 + 1] = c.c[1] * f),
        (o[a * 4 + 2] = c.c[2] * f),
        (o[a * 4 + 3] = h),
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
var H_ = (i, t, e) => Math.min(e, Math.max(t, i)),
  zvt = { road: 1, walk: 1.7, park: 2.6, sand: 2.4, lot: 1.4 },
  D_ = class {
    constructor() {
      ((this.t = 0),
        (this.k = 0),
        (this.amp = 0),
        (this.on = !0),
        (this.last = { p: 0, r: 0, y: 0 }));
    }
    level(t, e = "road", s = 0) {
      let n = t * 3.6,
        o = Math.pow(H_((n - 90) / 190, 0, 1), 1.4),
        a = zvt[e] ?? 1,
        r = a > 1.2 ? H_(n / 70, 0, 1) * (a - 1) * 0.35 : 0;
      return H_(o * a + r + H_(Math.abs(s) / 2.5, 0, 0.6), 0, 1.6);
    }
    apply(t, e, s, n = "road", o = !1) {
      this.t += e;
      let a = Math.hypot(s?.vel?.x ?? 0, s?.vel?.z ?? 0),
        r = this.on ? this.level(a, n, s?.heaveV ?? s?.vel?.y ?? 0) : 0;
      this.k = this.on ? this.k + (r - this.k) * Math.min(1, e / 0.12) : 0;
      let l = this.t,
        c = this.k * (o ? 0.5 : 1);
      if (c < 1e-4) return ((this.last = { p: 0, r: 0, y: 0 }), this.last);
      let h =
          Math.sin(l * 2 * Math.PI * 11.3) +
          0.7 * Math.sin(l * 2 * Math.PI * 17.9 + 1.7) +
          0.45 * Math.sin(l * 2 * Math.PI * 26.6 + 0.4),
        f =
          Math.sin(l * 2 * Math.PI * 13.1 + 2.1) +
          0.6 * Math.sin(l * 2 * Math.PI * 21.4 + 0.9) +
          0.4 * Math.sin(l * 2 * Math.PI * 24.2 + 2.8),
        u =
          Math.sin(l * 2 * Math.PI * 9.7 + 0.3) +
          0.5 * Math.sin(l * 2 * Math.PI * 19.3 + 1.1),
        d = (h / 2.15) * 0.0017 * c,
        p = (f / 2) * 0.0011 * c,
        m = (u / 1.5) * 0.009 * c;
      return (
        t.rotateX(d),
        t.rotateZ(p),
        (t.position.y += m),
        t.updateMatrixWorld?.(),
        (this.last = { p: d, r: p, y: m }),
        this.last
      );
    }
  };
var uZ = (i, t, e) => Math.min(e, Math.max(t, i)),
  U_ = class {
    constructor() {
      ((this.k = 1), (this.n = 0));
    }
    update(t, e, s, n) {
      let o = t.position,
        a = o.x - e.x,
        r = o.y - e.y,
        l = o.z - e.z,
        c = 1;
      if (s.length)
        for (let h = 1; h >= 0.3 - 1e-6; h -= 0.05) {
          let f = e.x + a * h,
            u = e.y + r * h,
            d = e.z + l * h,
            p = !1;
          for (let m of s) {
            let g = m[3] + 0.35;
            if ((f - m[0]) ** 2 + (u - m[1]) ** 2 + (d - m[2]) ** 2 < g * g) {
              p = !0;
              break;
            }
          }
          if (((c = h), !p)) break;
        }
      return (
        (this.k =
          c < this.k
            ? this.k + (c - this.k) * uZ(n / 0.02, 0, 1)
            : this.k + (c - this.k) * uZ(n / 0.6, 0, 1)),
        this.k < 0.999 &&
          (o.set(e.x + a * this.k, e.y + r * this.k, e.z + l * this.k),
          t.updateMatrixWorld?.(),
          this.n++),
        this.k
      );
    }
  };
function dZ(i, t, e, s, n = null, o = 1) {
  let a = i.pts[1][1],
    r = Math.abs(i.pts[2][0]),
    l = i.pts[2][1],
    c = 0,
    h = l * o,
    f = 0;
  if (n) {
    let { x: u, y: d, z: p, w: m } = n,
      g = m * c + d * f - p * h,
      b = m * h + p * c - u * f,
      x = m * f + u * h - d * c,
      v = -u * c - d * h - p * f;
    ((c = g * m + v * -u + b * -p - x * -d),
      (h = b * m + v * -d + x * -u - g * -p),
      (f = x * m + v * -p + g * -d - b * -u));
  }
  return [t + c, e + h, s + f, Math.max(r, a * 0.12) * o];
}
Gg();
En();
