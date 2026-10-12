// app 384 — cur
// Lines 190202-190393 of readable/app.pretty.js (statement-aligned).
var Rwt = `
#nextUp { align-items: center; gap: var(--sp-3); padding: 7px 16px 7px 8px; border-radius: var(--r-md); max-width: 100%; }
#nextUp .ds-stack { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
#nextUp .n { display: flex; align-items: baseline; gap: var(--sp-2); min-width: 0; }
#nextUp .n .ds-title { font-size: var(--fs-md); }
#nextUp .d { flex: none; color: var(--ink); }
body.hud-off #nextUp, body.photo #nextUp, body.cine #nextUp, body.racing #nextUp, body.poi #nextUp { display: none !important; }
body.touch #nextUp { padding: 5px 12px 5px 6px; } body.touch #nextUp .ds-icon { width: 24px; height: 24px; }
`,
  get = {
    trap: "\u23F1",
    zone: "\xBB",
    drift: "\u2248",
    jump: "!",
    xp: "XP",
    travel: "\u2197",
  },
  AE = class {
    constructor(t) {
      (Object.assign(this, t),
        (this.on = !0),
        (this.cur = null),
        (this.t = 0),
        (this.wait = 4),
        (this.routeT = 0),
        (this.route = null),
        (this.done = new Set()),
        (this.nearT = 0),
        (this.last = null),
        Zc("nuCss", Rwt),
        (this.el = document.createElement("div")),
        (this.el.id = "nextUp"),
        (this.el.className = "ds-panel ds-pop"),
        this.el.setAttribute("aria-live", "polite"),
        Jo("tc", this.el, 1));
    }
    list() {
      let t = [],
        e = this.stunts,
        s = this.boards;
      if (e)
        for (let n of e.list) {
          let o = n.gates[0],
            a = n.kind === "jump" ? 120 : 0;
          t.push({
            id: "s:" + n.id,
            x: o.x - o.dir[0] * a,
            z: o.z - o.dir[1] * a,
            kind: n.kind,
            label: this.KINDS[n.kind].label,
            name: n.name,
            col: this.KINDS[n.kind].col,
            glyph: get[n.kind],
            isDone: () => !!e.best[n.id],
          });
        }
      if (s)
        for (let n of s.list)
          t.push({
            id: "b:" + n.id,
            x: n.x,
            z: n.z,
            kind: n.kind,
            label: n.kind === "travel" ? "Fast-travel board" : "XP board",
            name: n.name,
            col: this.COLS[n.kind],
            glyph: get[n.kind],
            isDone: () => s.got.has(n.id),
          });
      for (let n of this.extra?.() || []) t.push(n);
      return t;
    }
    pick() {
      let t = this.v,
        e = null,
        s = 1e9;
      for (let n of this.list()) {
        if (n.isDone() || this.done.has(n.id)) continue;
        let o = Math.hypot(n.x - t.pos.x, n.z - t.pos.z);
        if (o < 60) continue;
        let a = o / (n.w || 1);
        a < s && ((s = a), (e = n));
      }
      return e;
    }
    focus(t) {
      t &&
        (this.done.delete(t.id),
        this.clear(),
        (this.cur = t),
        (this.routeT = 0),
        (this.held = t.id),
        this._card());
    }
    clear() {
      ((this.cur = null),
        (this.route = null),
        this.el.classList.remove("on"),
        this.map && this.map.overlay?.nextUp && (this.map.overlay = null));
    }
    skip() {
      (this.cur && this.done.add(this.cur.id), this.clear(), (this.wait = 0.5));
    }
    update(t, e = !0) {
      if (!this.on || !e) {
        ((this.cur || this.el.classList.contains("on")) && this.clear(),
          (this.wait = Math.max(this.wait, 2)));
        return;
      }
      let s = this.v,
        n = this.last,
        o = n && Math.hypot(s.pos.x - n.x, s.pos.z - n.z) > 300;
      if (
        ((this.last = { x: s.pos.x, z: s.pos.z }),
        o &&
          this.cur &&
          this.held !== this.cur.id &&
          (this.clear(), (this.wait = 1.5)),
        this.cur && this.held !== this.cur.id && (this.nearT -= t) <= 0)
      ) {
        this.nearT = 5;
        let l = this.pick(),
          c = Math.hypot(this.cur.x - s.pos.x, this.cur.z - s.pos.z);
        l &&
          l.id !== this.cur.id &&
          Math.hypot(l.x - s.pos.x, l.z - s.pos.z) < c * 0.5 &&
          (this.clear(), (this.cur = l), (this.routeT = 0), this._card());
      }
      if (!this.cur) {
        if ((this.wait -= t) > 0) return;
        if (((this.cur = this.pick()), (this.routeT = 0), !this.cur)) {
          this.wait = 30;
          return;
        }
        this._card();
      }
      let a = this.cur,
        r = Math.hypot(a.x - s.pos.x, a.z - s.pos.z);
      if (a.isDone() || r < 30) {
        (this.done.add(a.id), this.clear(), (this.wait = 12));
        return;
      }
      ((this.routeT -= t) <= 0 && ((this.routeT = 3), this._route()),
        this._dist(r));
    }
    _card() {
      let t = this.cur;
      (this.el.style.setProperty("--c", t.col),
        (this.el.innerHTML = `${wr(t.kind || "info", "sm")}<div class="ds-stack"><div class="ds-eyebrow" style="color:var(--ink-3)">What's next \xB7 <span style="color:var(--c)">${yr(t.label)}</span></div><div class="n"><span class="ds-title">${yr(t.name)}</span><span class="ds-figure d"></span></div></div>`),
        this.el.classList.add("on"),
        (this.dEl = this.el.querySelector(".d")));
    }
    _dist(t) {
      let e = this.mph?.(),
        s = e
          ? t / 1609.34 < 0.1
            ? Math.round(t * 3.281) + " ft"
            : (t / 1609.34).toFixed(1) + " mi"
          : t < 1e3
            ? Math.round(t) + " m"
            : (t / 1e3).toFixed(1) + " km";
      this.dEl && this.dEl.textContent !== s && (this.dEl.textContent = s);
    }
    _route() {
      let t = this.cur,
        e = this.router?.();
      if (!(!e || !this.map) && !(this.map.overlay && !this.map.overlay.nextUp))
        try {
          if (!t.spot) {
            let [o, a] = this.unproject(t.x, t.z);
            t.spot = e._snap(t.name, t.name, o, a, null) || { x: t.x, z: t.z };
          }
          let s = this.v.forward(),
            n = t.spot.E
              ? e.routeTo(this.v.pos.x, this.v.pos.z, s.x, s.z, t.spot, !0)
              : {
                  pts: [
                    [this.v.pos.x, this.v.pos.z],
                    [t.x, t.z],
                  ],
                };
          ((this.route = n),
            (this.map.overlay = {
              nextUp: !0,
              route: n.pts,
              target: { x: t.x, z: t.z, col: t.col, label: t.name },
            }));
        } catch (s) {
          console.warn("next up route", s);
        }
    }
  };
