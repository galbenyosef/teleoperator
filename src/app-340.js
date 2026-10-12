// app 340 — draft
// Lines 165036-165688 of readable/app.pretty.js (statement-aligned).
var x5t = `
#garage .gr-tabs { flex: 0 0 auto; } #garage .gr-tabs button { padding: 8px 6px; letter-spacing: .07em; }
#garage .tu-sub { display: flex; gap: 4px; margin: 10px 0 2px; }
#garage .tu-sub button { flex: 1; padding: 7px; border: 1px solid rgba(255,255,255,.14); border-radius: 4px; background: none; color: rgba(243,244,241,.7); font: 700 10.5px var(--font); letter-spacing: .14em; text-transform: uppercase; cursor: pointer; }
#garage .tu-sub button[aria-pressed="true"] { background: rgba(94,240,214,.16); border-color: var(--ga); color: #fff; }
#garage .tu-part { margin: 12px 0 4px; }
#garage .tu-part > b { display: flex; align-items: center; gap: 8px; font: 800 13px var(--font); letter-spacing: .1em; text-transform: uppercase; }
#garage .tu-part > b svg { width: 18px; height: 18px; fill: none; stroke: var(--ga); stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; }
#garage .tu-part > b small { margin-left: auto; font: 500 11px var(--font); letter-spacing: .02em; text-transform: none; color: rgba(243,244,241,.6); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 55%; }
#garage .tu-tiers { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; margin-top: 6px; }
#garage .tu-tiers.n3 { grid-template-columns: repeat(3, 1fr); } #garage .tu-tiers.n4 { grid-template-columns: repeat(4, 1fr); } #garage .tu-tiers.n6 { grid-template-columns: repeat(3, 1fr); }
#garage .tu-t { position: relative; min-width: 0; padding: 7px 5px 6px; border: 1px solid rgba(255,255,255,.1); border-bottom: 3px solid var(--tc); border-radius: 4px; background: rgba(255,255,255,.045); color: var(--ink); text-align: left; cursor: pointer; }
#garage .tu-t b { display: block; font: 800 10.5px var(--font); letter-spacing: .1em; text-transform: uppercase; color: var(--tc); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#garage .tu-t i { display: block; margin-top: 3px; font: 600 10px var(--font-mono); font-style: normal; color: rgba(243,244,241,.65); white-space: nowrap; }
#garage .tu-t:hover { background: rgba(255,255,255,.09); }
#garage .tu-t[aria-pressed="true"] { background: rgba(243,244,241,.95); color: #0b0d10; } #garage .tu-t[aria-pressed="true"] i { color: #0b0d10; }
#garage .tu-t.own i { color: var(--ga); } #garage .tu-t[aria-pressed="true"].own i { color: #0a6b5c; }
#garage .tu-t.lock { opacity: .45; } #garage .tu-t.lock i::before { content: "\\1F512 "; font-size: 9px; }
#garage .tu-t.cur::after { content: ""; position: absolute; right: 4px; top: 4px; width: 6px; height: 6px; border-radius: 50%; background: var(--ga); }
#garage .tu-na { margin-top: 6px; font: 500 12px var(--font); color: rgba(243,244,241,.45); }
#garage .tu-rims { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
#garage .tu-rimb { padding: 6px 4px 5px; border: 1px solid rgba(255,255,255,.1); border-radius: 5px; background: rgba(255,255,255,.04); color: var(--ink); cursor: pointer; text-align: center; }
#garage .tu-rimb[aria-pressed="true"] { border-color: #f3f4f1; background: rgba(243,244,241,.14); }
#garage .tu-rimb.lock { opacity: .45; }
#garage .tu-rimb b { display: block; margin-top: 3px; font: 700 9.5px var(--font); letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#garage .tu-rimb i { display: block; font: 600 9px var(--font-mono); font-style: normal; color: rgba(243,244,241,.6); }
#garage .tu-rimb.own i { color: var(--ga); }
#garage .tu-rim { width: 46px; height: 46px; } #garage .tu-rim .t { fill: #16171a; } #garage .tu-rim .l { fill: #2a2c31; stroke: #c9ccd1; stroke-width: 1.2; } #garage .tu-rim .l2 { fill: none; stroke: #8d9096; stroke-width: 2.4; }
#garage .tu-rim line { stroke: #d7dade; stroke-linecap: round; } #garage .tu-rim .h { fill: #9a9da3; } #garage .tu-rim .f { fill: #b9bcc2; } #garage .tu-rim text { fill: #c9ccd1; font: 800 13px var(--font); }
#garage .tu-chips { display: flex; flex-wrap: wrap; gap: 5px; }
#garage .tu-chips button { padding: 7px 10px; border: 1px solid rgba(255,255,255,.12); border-radius: 4px; background: rgba(255,255,255,.05); color: rgba(243,244,241,.85); font: 700 10.5px var(--font); letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
#garage .tu-chips button[aria-pressed="true"] { background: #f3f4f1; color: #0b0d10; border-color: #f3f4f1; }
#garage .tu-sl { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 2px 8px; margin: 7px 0; }
#garage .tu-sl label { font: 600 11.5px var(--font); letter-spacing: .04em; color: rgba(243,244,241,.85); }
#garage .tu-sl output { font: 600 11px var(--font-mono); color: var(--ga); min-width: 64px; text-align: right; }
#garage .tu-sl input { grid-column: 1 / 3; width: 100%; accent-color: var(--ga); height: 18px; margin: 0; }
#garage .tu-sl.off { opacity: .4; } #garage .tu-sl.off output { color: rgba(243,244,241,.6); }
#garage .tu-note { margin: 4px 0 8px; font: 500 11.5px/1.4 var(--font); color: rgba(243,244,241,.5); }
#garage .tu-reset { margin-top: 10px; padding: 8px 12px; border: 1px solid rgba(255,255,255,.2); border-radius: 4px; background: none; color: var(--ink); font: 700 10.5px var(--font); letter-spacing: .12em; text-transform: uppercase; cursor: pointer; }
#tuneStats { position: absolute; right: calc(max(16px, 3vw) + var(--sr, 0px)); top: calc(max(18px, 3.4vh) + 76px); width: min(300px, 26vw); padding: 12px 14px 12px; border-radius: 6px; background: rgba(9,11,15,.72); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.08); display: none; font-family: var(--font); color: var(--ink); pointer-events: none; }
#garage.tuning #tuneStats { display: block; }
#tuneStats .pi { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
#tuneStats .pc { display: inline-flex; align-items: stretch; height: 26px; border-radius: 3px; overflow: hidden; font: 800 13px var(--font); }
#tuneStats .pc b { display: grid; place-items: center; min-width: 30px; padding: 0 6px; background: var(--c); color: #0b0d10; } #tuneStats .pc span { display: grid; place-items: center; padding: 0 8px; background: #f3f4f1; color: #0b0d10; }
#tuneStats .pi i { font-style: normal; color: rgba(243,244,241,.5); }
#tuneStats .pi em { margin-left: auto; font: 700 12px var(--font-mono); font-style: normal; }
#tuneStats .up { color: #4cff9a; } #tuneStats .dn { color: #ff6b6b; }
#tuneStats .bar { margin: 7px 0; } #tuneStats .bar small { display: flex; justify-content: space-between; font: 600 9.5px var(--font-mono); letter-spacing: .16em; text-transform: uppercase; color: rgba(243,244,241,.65); }
#tuneStats .bar small em { font-style: normal; letter-spacing: .02em; color: var(--ink); }
#tuneStats .bar div { position: relative; height: 7px; margin-top: 3px; background: rgba(255,255,255,.1); border-radius: 1px; overflow: hidden; }
#tuneStats .bar div s { position: absolute; left: 0; top: 0; bottom: 0; background: #f3f4f1; text-decoration: none; }
#tuneStats .bar div u { position: absolute; top: 0; bottom: 0; text-decoration: none; }
#tuneStats .bar div u.up { background: #4cff9a; } #tuneStats .bar div u.dn { background: #ff6b6b; }
#tuneStats table { width: 100%; margin-top: 10px; border-collapse: collapse; font: 600 11px var(--font-mono); }
#tuneStats td { padding: 2.5px 0; color: rgba(243,244,241,.6); } #tuneStats td + td { text-align: right; color: var(--ink); } #tuneStats td + td + td { width: 64px; }
#tuneStats .ch { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; margin-top: 10px; }
#tuneStats .sq { position: relative; width: 62px; height: 62px; border: 1px solid rgba(255,255,255,.25); background: linear-gradient(rgba(255,255,255,.12),rgba(255,255,255,.12)) center/1px 100% no-repeat, linear-gradient(rgba(255,255,255,.12),rgba(255,255,255,.12)) center/100% 1px no-repeat; }
#tuneStats .sq i { position: absolute; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--ga); box-shadow: 0 0 8px var(--ga); }
#tuneStats .sq i.was { background: rgba(255,255,255,.4); box-shadow: none; }
#tuneStats .ch small { font: 600 9.5px/1.5 var(--font-mono); letter-spacing: .14em; text-transform: uppercase; color: rgba(243,244,241,.6); }
#tuneStats .bill { margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,.1); font: 600 11px var(--font-mono); color: rgba(243,244,241,.7); display: flex; justify-content: space-between; }
#tuneStats .bill b { color: var(--ink); } #tuneStats .bill .short { color: #ff6b6b; }
#tuneStats .busy { opacity: .55; }
#garage .tu-test { display: none; } #garage.tuning .tu-test { display: inline-block; }
#tuneDrive { position: fixed; left: 50%; top: 14px; transform: translateX(-50%); z-index: 25; display: none; align-items: center; gap: 12px; padding: 8px 10px 8px 16px; border-radius: 6px; background: rgba(9,11,15,.78); border: 1px solid rgba(94,240,214,.4); color: #f3f4f1; font: 800 12px var(--font); letter-spacing: .14em; text-transform: uppercase; backdrop-filter: blur(6px); }
#tuneDrive.on { display: flex; } #tuneDrive b { color: #5ef0d6; font-variant-numeric: tabular-nums; } #tuneDrive em { font: 600 10.5px var(--font-mono); font-style: normal; letter-spacing: .06em; color: rgba(243,244,241,.7); text-transform: none; }
#tuneDrive button { padding: 7px 12px; border: 0; border-radius: 4px; background: #5ef0d6; color: #061113; font: 800 11px var(--font); letter-spacing: .12em; text-transform: uppercase; cursor: pointer; }
.pk-pi { display: inline-flex; margin-left: 8px; vertical-align: middle; height: 18px; border-radius: 2px; overflow: hidden; font: 800 10.5px var(--font); letter-spacing: .04em; }
.pk-pi b { display: grid; place-items: center; padding: 0 5px; background: var(--c); color: #0b0d10; } .pk-pi span { display: grid; place-items: center; padding: 0 5px; background: #f3f4f1; color: #0b0d10; }
@media (max-width: 760px), (max-height: 520px) {
  #tuneStats { top: auto; bottom: 64px; right: 8px; width: min(220px, 40vw); padding: 8px 10px; }
  #tuneStats table, #tuneStats .ch { display: none; } #tuneStats .bar { margin: 4px 0; } #tuneStats .pi { margin-bottom: 4px; }
  #garage .tu-tiers { gap: 3px; } #garage .tu-t { padding: 5px 3px 4px; } #garage .tu-t b { font-size: 9px; } #garage .tu-t i { font-size: 9px; }
}
@media (max-aspect-ratio: 1/1) { #tuneStats { top: 64px; bottom: auto; right: 10px; width: min(250px, 64vw); } #tuneStats .bill { gap: 8px; } }
`,
  Ez = class {
    constructor(t) {
      Object.assign(this, t);
      let e = this.garage;
      if (((this.g = e), !document.getElementById("tuneCss"))) {
        let n = document.createElement("style");
        ((n.id = "tuneCss"),
          (n.textContent = x5t),
          document.head.appendChild(n));
      }
      ((this.panel = document.createElement("div")),
        (this.panel.id = "tuneStats"),
        this.panel.setAttribute("aria-live", "polite"),
        e.el.appendChild(this.panel));
      let s = document.createElement("button");
      ((s.type = "button"),
        (s.className = "gr-btn tu-test"),
        (s.textContent = "Test drive"),
        (s.dataset.tu = "test"),
        e.el
          .querySelector(".gr-ft")
          .insertBefore(s, e.el.querySelector("[data-act=back]")),
        s.addEventListener("click", () => this.testDrive()),
        (this.hud = document.createElement("div")),
        (this.hud.id = "tuneDrive"),
        (this.hud.innerHTML =
          '<span>Test drive</span><b>60</b><em></em><button type="button">Back to garage</button>'),
        document.body.appendChild(this.hud),
        this.hud
          .querySelector("button")
          .addEventListener("click", () => this.endTest()),
        (this.sub = "parts"),
        (this.saved = null),
        (this.draft = null),
        (this.fx = null),
        (this.testing = null),
        (this.calcT = 0),
        e.register(Object.keys(WQ), this),
        addEventListener("keydown", (n) => {
          this.testing &&
            n.code === "KeyY" &&
            (this.endTest(), n.preventDefault());
        }));
    }
    id() {
      return this.g.carId();
    }
    cat(t) {
      return t === "wheels" || t === "tyres" ? "Wheels & tyres" : "Performance";
    }
    spec() {
      return this.base(this.id());
    }
    ev() {
      return !!this.spec().ev;
    }
    open() {
      this.testing ||
        ((this.saved = Uo(this.store.get(this.id()))),
        (this.draft = this.saved
          ? JSON.parse(JSON.stringify(this.saved))
          : null),
        (this.fx = null),
        this.show());
    }
    carChanged() {
      this.open();
    }
    close() {
      this.testing || ((this.fx = null), this.live(this.saved));
    }
    label() {
      let t = this.cur,
        e = this.g.fleetOf?.() || cs[this.id()];
      return [
        t ? `${t.cls} ${t.pi}` : e?.name || "Ferrari",
        WQ[this.g.tab] +
          " \xB7 " +
          (t
            ? `${t.hp.toFixed(0)} hp \xB7 ${t.t100.toFixed(2)} s 0-100`
            : "measuring"),
      ];
    }
    foot() {
      let t = Vx(this.saved, this.draft),
        e = !yz(this.draft, this.saved),
        s = Sz(this.draft, this.level()),
        n = e
          ? s.length
            ? {
                note: "Locked \xB7 " + s.map((o) => o.what).join(", "),
                go: "Level " + Math.max(...s.map((o) => o.lvl)),
                locked: !0,
              }
            : t.total
              ? {
                  note:
                    "Not bought \xB7 " + t.items.map((o) => o.what).join(", "),
                  go: "Buy " + oh(t.total),
                }
              : null
          : null;
      return {
        go: e
          ? s.length
            ? "Locked \xB7 LV " + Math.max(...s.map((o) => o.lvl))
            : t.total
              ? "Buy " + oh(t.total)
              : "Install"
          : "Installed \u2713",
        dim: !e || s.length > 0,
        reset: !!this.draft,
        buy: n,
      };
    }
    autosave() {
      let t = this.draft ? JSON.parse(JSON.stringify(this.draft)) : {};
      for (let s in mi) {
        let n = Va(t, s);
        n && !Wm(this.saved, s, n) && ((t.p ||= {})[s] = Va(this.saved, s));
      }
      (t.w?.s && !jx(this.saved, t.w.s) && (t.w.s = this.saved?.w?.s || 0),
        (t.own = JSON.parse(JSON.stringify(this.saved?.own || {}))),
        t.w && (t.w.own = this.saved?.w?.own || 0));
      let e = Uo(t);
      yz(e, this.saved) ||
        (this.g.pushUndo?.({ kind: "tune", id: this.id(), before: this.saved }),
        (this.saved = e),
        this.store.set(this.id(), e),
        this.savePaint?.());
    }
    undo(t) {
      (this.store.set(t.id, t.before),
        t.id === this.id() &&
          ((this.saved = Uo(t.before)),
          (this.draft = this.saved
            ? JSON.parse(JSON.stringify(this.saved))
            : null),
          this.show()));
    }
    reset() {
      ((this.draft = null), this.show(), this.autosave());
    }
    apply() {
      if (yz(this.draft, this.saved)) return;
      let t = Sz(this.draft, this.level());
      if (t.length) {
        this.toast?.(
          "Locked \xB7 level " + Math.max(...t.map((n) => n.lvl)),
          t.map((n) => n.what).join(", ") + " - earn XP to unlock",
        );
        return;
      }
      let e = Vx(this.saved, this.draft),
        s = this.wallet();
      if (e.total > 0 && s !== null) {
        if (s + 1e-6 < e.total) {
          this.toast?.(
            "Not enough cash",
            oh(e.total) + " needed \xB7 you have " + oh(s),
          );
          return;
        }
        if (!this.spend(e.total, e.items.map((n) => n.what).join(", "))) {
          this.toast?.("Not enough cash", oh(e.total) + " needed");
          return;
        }
      }
      ((this.saved = Mz(this.draft)),
        (this.draft = this.saved
          ? JSON.parse(JSON.stringify(this.saved))
          : null),
        this.store.set(this.id(), this.saved),
        this.savePaint?.(),
        this.live(this.saved),
        this.toast?.(
          e.items.length ? "Installed" : "Tune saved",
          e.items.length
            ? e.items.map((n) => n.what).join(" \xB7 ") +
                (s === null ? " \xB7 on the house" : " \xB7 " + oh(e.total))
            : this.cur
              ? `${this.cur.cls} ${this.cur.pi}`
              : "",
        ),
        this.show());
    }
    focus() {
      let t = this.fx,
        e = this.g;
      if (!t || performance.now() > t.until) return null;
      if (e.orb.drag || e.orb.pinch) return ((this.fx = null), null);
      let s = e.car();
      if (!s?.model) return null;
      let n = s.model,
        o = s.wheels,
        a = o[0].c,
        r = o[2].c,
        l = Math.sign(a[0]) || 1,
        c = Math.max(o[2].c[2], o[3].c[2]),
        h = Math.min(a[2], o[1].c[2]),
        f = (u, d, p) => n.localToWorld(new xt(u, d, p));
      switch (t.cam) {
        case "wheel":
          return {
            pos: f(a[0] + l * 1.55, a[1] + 0.32, a[2] - 0.9),
            look: f(a[0], a[1], a[2]),
          };
        case "wheelLow":
          return {
            pos: f(r[0] + l * 1.35, r[1] + 0.08, r[2] + 0.75),
            look: f(r[0], r[1] - 0.02, r[2]),
          };
        case "exhaust":
          return { pos: f(l * 1.1, 0.75, c + 2.4), look: f(0, 0.35, c + 0.85) };
        case "rear":
          return { pos: f(l * 2.6, 1.9, c + 3.2), look: f(0, 0.8, c + 0.3) };
        case "engine":
          return this.ev()
            ? { pos: f(l * 1.6, 1.8, h - 2.6), look: f(0, 0.6, h - 0.2) }
            : {
                pos: f(l * 1.9, 2.3, c + 2.2),
                look: f(0, 0.8, (c + r[2]) / 2 - 0.4),
              };
        case "side":
          return {
            pos: f(l * 7.4, 1.3, (c + h) / 2 + 0.6),
            look: f(0, 0.5, (c + h) / 2 + 0.6),
          };
      }
      return null;
    }
    look(t) {
      this.fx = t ? { cam: t, until: performance.now() + qQ * 1e3 } : null;
    }
    set(t, e) {
      let s = this.draft ? JSON.parse(JSON.stringify(this.draft)) : {};
      (t(s),
        (this.draft = Uo(s)),
        e && this.look(e),
        this.show(),
        this.autosave(),
        this.g.isOpen && this.g.render());
    }
    onPick(t) {
      let e = t.target.closest("[data-tu]");
      if (!e) return;
      let s = e.dataset.tu,
        n = e.dataset.v,
        o = e.dataset.id;
      if (
        (e.dataset.lock &&
          s !== "sub" &&
          this.toast?.(
            "Locked \xB7 level " + e.dataset.lock,
            "Earn XP - skill chains, stunts, boards - to unlock it",
          ),
        s === "part")
      ) {
        let a = +n;
        this.set((r) => {
          (r.p ||= {})[o] = a;
        }, mi[o].cam);
      } else
        s === "rim"
          ? this.set((a) => {
              (a.w ||= {}).s = +n;
            }, "wheel")
          : s === "size"
            ? this.set((a) => {
                (a.w ||= {}).z = +n;
              }, "wheel")
            : s === "side"
              ? this.set((a) => {
                  (a.w ||= {}).d = +n;
                }, "wheelLow")
              : s === "rimc"
                ? (this.g.set({ rim: n === "factory" ? null : n }),
                  this.look("wheel"),
                  this.show())
                : s === "sub"
                  ? ((this.sub = n),
                    this.look(n === "tune" ? "side" : null),
                    this.show())
                  : s === "zero"
                    ? this.set((a) => {
                        delete a.t;
                      }, "side")
                    : s === "buy" &&
                      (this.apply(), this.g.isOpen && this.g.render());
    }
    onInput(t) {
      let e = t.target;
      if (!e.matches("input[type=range]")) return;
      let s = e.dataset.sl,
        n = +e.value;
      if (!vz[s] || !wz(this.draft, s)) return;
      let o = this.draft ? JSON.parse(JSON.stringify(this.draft)) : {};
      (((o.t ||= {})[s] = n), (this.draft = Uo(o)));
      let a = e.parentElement.querySelector("output");
      a && (a.textContent = $Q(s, n));
      let r = {
        cf: "wheel",
        cr: "wheelLow",
        tf: "wheel",
        tr: "wheelLow",
        rh: "side",
        sf: "wheel",
        sr: "wheelLow",
        af: "wheel",
        ar: "wheelLow",
        dn: "rear",
        db: "rear",
        pf: "wheel",
        pr: "wheelLow",
        bb: "wheel",
        bp: "wheel",
        fd: "side",
        dl: "rear",
        dp: "side",
      }[s];
      (r && (!this.fx || this.fx.cam !== r)
        ? this.look(r)
        : this.fx && (this.fx.until = performance.now() + qQ * 1e3),
        this.preview(),
        this.stats(!0),
        this.footSync(),
        clearTimeout(this._as),
        (this._as = setTimeout(() => {
          (this.autosave(), this.g.isOpen && this.g.render());
        }, 250)));
    }
    footSync() {
      let t = this.foot();
      this.g.el.querySelector("[data-act=reset]").disabled = !t.reset;
    }
    preview() {
      this.live(this.draft, !0);
    }
    show() {
      (this.preview(), this.g.isOpen && this.g.render());
    }
    render(t) {
      let e = this.g.tab;
      if (e === "wheels" || e === "perf") {
        let s = e === "wheels" ? ["wheels", "tyres"] : ["engine", "perf"],
          n = "";
        for (let o of s) {
          this.g.tab = o;
          let a = document.createElement("div");
          (this.render1(a),
            (n += `<section class="tu-sec" data-sec="${o}"><h3>${o === "wheels" ? "Wheels" : o === "tyres" ? "Tyres" : o === "engine" ? (this.ev() ? "Motor" : "Engine") : "Chassis"}</h3>${a.innerHTML}</section>`));
        }
        ((this.g.tab = e), (t.innerHTML = n), this.stats());
        return;
      }
      (this.render1(t), this.stats());
    }
    render1(t) {
      let e = this.g.tab,
        s = this.draft,
        n = this.ev(),
        o = this.level(),
        a = "";
      if (e === "engine" || e === "perf")
        if (
          (e === "perf" &&
            (a += `<div class="tu-sub"><button type="button" data-tu="sub" data-v="parts" aria-pressed="${this.sub === "parts"}">Parts</button><button type="button" data-tu="sub" data-v="tune" aria-pressed="${this.sub === "tune"}">Tuning</button></div>`),
          e === "perf" && this.sub === "tune")
        )
          a += this.sliders(
            qx.filter((r) => !["Tyres"].includes(r[1])),
            !0,
          );
        else for (let r of g5t[e]) a += this.partRow(r, n, o);
      else if (e === "tyres")
        ((a += this.partRow("tyre", n, o) + this.partRow("width", n, o)),
          (a +=
            `<h4>Pressure<span>${nr("Lower: grip, slower to respond")}</span></h4>` +
            this.sliders(
              qx.filter((r) => r[1] === "Tyres"),
              !1,
            )));
      else if (e === "wheels" && this.g.car()?.noWheelTune)
        a += `<div class="gr-lock"><b>Wheels stay as made</b><p>This car's wheels could not be measured from its model, so rims, sidewalls and stance are not changed on it. Engine, tyres and performance parts still fit.</p></div>`;
      else if (e === "wheels") {
        let r = s?.w?.s || 0;
        a += `<h4>Rims<span>${nr(Mr[r][0])}</span></h4><div class="tu-rims">${Mr.map(
          (f, u) => {
            let d = jx(this.saved, u),
              p = f[4] > o;
            return `<button type="button" class="tu-rimb${d && u ? " own" : ""}${p ? " lock" : ""}" data-tu="rim" data-v="${u}"${p ? ` data-lock="${f[4]}"` : ""} aria-pressed="${r === u}" title="${nr(f[0])}">${b5t(u)}<b>${nr(f[0])}</b><i>${u ? (d ? "Owned" : p ? "LV " + f[4] : oh(f[3])) : "Factory"}</i></button>`;
          },
        ).join("")}</div>`;
        let l = s?.w?.z || 0;
        a += `<h4>Rim size<span>${l ? (l > 0 ? "+" : "") + l + " in" : "Factory"}${r ? "" : " \xB7 with a rim style"}</span></h4><div class="tu-chips">${[-1, 0, 1, 2, 3].map((f) => `<button type="button" data-tu="size" data-v="${f}" aria-pressed="${l === f}">${f ? (f > 0 ? "+" : "") + f + '"' : "Factory"}</button>`).join("")}</div>`;
        let c = s?.w?.d || 0;
        a += `<h4>Sidewall<span>${nr(Gm[c])}</span></h4><div class="tu-chips">${Gm.map((f, u) => `<button type="button" data-tu="side" data-v="${u}" aria-pressed="${c === u}">${nr(f)}</button>`).join("")}</div>`;
        let h = this.g.draft?.rim || null;
        ((this.g.car()?.paintKit?.rims?.length || r) &&
          (a += `<h4>Rim colour<span>${nr(h ? sf(h, ef) || h : "Factory")}</span></h4><div class="gr-grid sm"><button type="button" class="gr-sw fac rim${h ? "" : " on"}" data-tu="rimc" data-v="factory" title="Factory" aria-label="Factory wheel colour" style="--c:#8d9096"></button>${ef.map(([f, u]) => `<button type="button" class="gr-sw rim${h === f ? " on" : ""}" data-tu="rimc" data-v="${f}" title="${nr(u)}" aria-label="${nr(u)}" style="--c:${f}"></button>`).join("")}</div>`),
          (a +=
            "<h4>Stance<span>Camber and height</span></h4>" +
            this.sliders(
              qx.filter((f) => ["cf", "cr", "rh"].includes(f[0])),
              !1,
            )));
      }
      t.innerHTML = a;
    }
    partRow(t, e, s) {
      let n = mi[t],
        o = Va(this.draft, t),
        a = Va(this.saved, t);
      if (!PQ(t, e))
        return `<div class="tu-part"><b>${VQ(jQ[n.icon])}${nr(n.name)}<small>Not on an electric car</small></b><div class="tu-na">${t === "exhaust" ? "No exhaust: the motor's whine is its sound" : "The motor's instant torque: no bottle"}</div></div>`;
      let r = n.lv.length;
      return `<div class="tu-part"><b>${VQ(jQ[n.icon])}${nr(CQ(t, e))}<small>${nr(n.lv[o][3])}</small></b><div class="tu-tiers n${r}">${n.lv
        .map(([l, c, h, f], u) => {
          let d = Um[l],
            p = Wm(this.saved, t, u),
            m = h > s,
            g = n.choice
              ? u
                ? t === "tyre"
                  ? RQ[u]
                  : f.split(":")[0]
                : "Factory"
              : d.name;
          return `<button type="button" class="tu-t${p && u ? " own" : ""}${m ? " lock" : ""}${u === a ? " cur" : ""}" style="--tc:${d.col}" data-tu="part" data-id="${t}" data-v="${u}"${m ? ` data-lock="${h}"` : ""} aria-pressed="${u === o}" title="${nr(f)}"><b>${nr(g)}</b><i>${u ? (p ? "Owned" : m ? "LV " + h : oh(c)) : "Stock"}</i></button>`;
        })
        .join(
          "",
        )}</div>${o && !Wm(this.saved, t, o) && n.lv[o][2] <= s ? `<button type="button" class="tu-buyb" data-tu="buy" data-id="${t}">Buy ${oh(n.lv[o][1])}<small>on the car now \xB7 not bought</small></button>` : ""}</div>`;
    }
    sliders(t, e) {
      let s = "",
        n = null;
      for (let [o, a, r, l, c, h, f, u] of t) {
        e &&
          a !== n &&
          ((n = a),
          (s += `<h4>${nr(a)}${u && !wz(this.draft, o) ? `<span>Needs ${nr(mi[u[0]].name)} \xB7 ${nr(Um[mi[u[0]].lv[u[1]][0]].name)}</span>` : ""}</h4>`));
        let d = wz(this.draft, o),
          p = this.draft?.t?.[o] || 0;
        s += `<div class="tu-sl${d ? "" : " off"}"><label for="tu-${o}">${nr(r)}</label><output>${d ? $Q(o, p) : "Locked"}</output><input id="tu-${o}" type="range" data-sl="${o}" min="${l}" max="${c}" step="${h}" value="${p}"${d ? "" : " disabled"}></div>`;
      }
      return (
        e &&
          (s += `<button type="button" class="tu-reset" data-tu="zero">Reset the tune</button><p class="tu-note">The car's own setup is 0 on every slider. Springs, bars and height need coilovers; the final drive a race gearbox; the diff's lock a sport diff; downforce a wing.</p>`),
        s
      );
    }
    stats(t = !1) {
      clearTimeout(this.calcT);
      let e = () => {
        let s = this.id(),
          n = this.spec(),
          o = ic(n, this.saved, s),
          a = ic(n, this.draft, s);
        ((this.was = o), (this.cur = a), this.paint(o, a));
        let r = this.g.el.querySelector(".gr-name");
        if (r && this.g.ext[this.g.tab] === this) {
          let [l, c] = this.label();
          ((r.querySelector("b").textContent = l),
            (r.querySelector("small").textContent = c));
        }
      };
      (this.panel.classList.add("busy"),
        (this.calcT = setTimeout(e, t ? 160 : 0)));
    }
    paint(t, e) {
      let s = (d, p, m = !1, g = 1, b = "") => {
          let x = p - d;
          return Math.abs(x) < 0.5 * 10 ** -g
            ? ""
            : `<span class="${(m ? x < 0 : x > 0) ? "up" : "dn"}">${x > 0 ? "+" : "\u2212"}${Math.abs(x).toFixed(g)}${b}</span>`;
        },
        n = (d, p) => {
          let m = t.bars[d] * 10,
            g = e.bars[d] * 10,
            b = Math.min(m, g),
            x = Math.max(m, g);
          return `<div class="bar"><small>${p}<em>${e.bars[d].toFixed(1)}${g !== m ? " " + s(t.bars[d], e.bars[d], !1, 1) : ""}</em></small><div><s style="width:${b}%"></s>${x > b ? `<u class="${g > m ? "up" : "dn"}" style="left:${b}%;width:${x - b}%"></u>` : ""}</div></div>`;
        },
        o = (d) =>
          `<span class="pc" style="--c:${d.col}"><b>${d.cls}</b><span>${d.pi}</span></span>`,
        a = t.pi !== e.pi,
        r = (d) => {
          let p = this.draft,
            m =
              (Va(p, "diff") === 2 ? 0.35 : Va(p, "diff") ? 0.12 : 0) +
              (Va(p, "tyre") === 4 ? 0.45 : 0),
            g = Va(p, "tyre") === 5 ? 0.6 : 0,
            b = 50 + (m - Math.min(0.4, (d.g - 1.1) * 0.6)) * 50,
            x = 50 - (g - 0.3 + Math.min(0.4, (d.g - 1.1) * 0.4)) * 50;
          return [Math.max(6, Math.min(94, b)), Math.max(6, Math.min(94, x))];
        },
        [l, c] = r(e),
        h = Vx(this.saved, this.draft),
        f = this.wallet(),
        u = Sz(this.draft, this.level());
      this.panel.innerHTML = `<div class="pi">${o(t)}${a ? `<i>\u2192</i>${o(e)}<em class="${e.pi > t.pi ? "up" : "dn"}">${e.pi > t.pi ? "+" : "\u2212"}${Math.abs(e.pi - t.pi)}</em>` : ""}</div>
      ${n("speed", "Top speed")}${n("accel", "Acceleration")}${n("handling", "Handling")}${n("braking", "Braking")}
      <table><tr><td>0-100 km/h</td><td>${e.t100.toFixed(2)} s</td><td>${s(t.t100, e.t100, !0, 2)}</td></tr>
      <tr><td>Top speed</td><td>${e.top.toFixed(0)} km/h</td><td>${s(t.top, e.top, !1, 0)}</td></tr>
      <tr><td>100-0 km/h</td><td>${e.brake.toFixed(1)} m</td><td>${s(t.brake, e.brake, !0, 1)}</td></tr>
      <tr><td>Skidpad</td><td>${e.g.toFixed(2)} g</td><td>${s(t.g, e.g, !1, 2)}</td></tr>
      <tr><td>Power</td><td>${e.hp.toFixed(0)} hp</td><td>${s(t.hp, e.hp, !1, 0)}</td></tr>
      <tr><td>Weight</td><td>${e.kg.toFixed(0)} kg</td><td>${s(t.kg, e.kg, !0, 0)}</td></tr>${e.nos ? `<tr><td>Nitrous</td><td>${e.nos.toFixed(1)} s</td><td>${s(t.nos, e.nos, !1, 1)}</td></tr>` : ""}</table>
      <div class="ch"><div class="sq"><i style="left:${l}%;top:${c}%"></i></div><small>Off-road<br>Race \xB7 Drift<br>Road</small></div>
      <div class="bill">${u.length ? `<span class="short">Level ${Math.max(...u.map((d) => d.lvl))} needed</span>` : h.total ? `<span>Cost <b>${oh(h.total)}</b></span>` : "<span>Nothing to buy</span>"}<span${f !== null && f < h.total ? ' class="short"' : ""}>${f === null ? "Free roam" : "Wallet " + oh(f)}</span></div>`;
    }
    testDrive() {
      if (this.testing || !this.g.isOpen) return;
      let t = this.g.tab,
        e = this.draft;
      ((this.testing = { tab: t, draft: e, t: 60, from: this.g.from }),
        this.g.close(),
        this.live(e, !1, !0),
        this.drive?.(),
        this.hud.classList.add("on"),
        (this.hud.querySelector("em").textContent = this.cur
          ? `${this.cur.cls} ${this.cur.pi} \xB7 Y to return`
          : "Y to return"));
      let s = () => {
        this.testing &&
          ((this.testing.t -= 1),
          (this.hud.querySelector("b").textContent = Math.max(
            0,
            this.testing.t,
          )),
          this.testing.t <= 0
            ? this.endTest()
            : (this.testing.timer = setTimeout(s, 1e3)));
      };
      ((this.hud.querySelector("b").textContent = 60),
        (this.testing.timer = setTimeout(s, 1e3)),
        this.toast?.(
          "Test drive",
          "One minute in the draft - nothing bought yet",
        ));
    }
    endTest() {
      let t = this.testing;
      t &&
        (clearTimeout(t.timer),
        (this.testing = null),
        this.hud.classList.remove("on"),
        this.live(this.saved),
        this.reopen?.(t.from),
        (this.g.tab = t.tab),
        (this.draft = t.draft),
        this.show());
    }
    badges(t) {
      let e = (s) => {
        let n = s.shift();
        if (!n) return;
        let o = n.dataset.key || n.dataset.car,
          a = this.keyOf ? this.keyOf(o) : o,
          r = n.querySelector(".pk-name b");
        if (r && a) {
          let l = ic(this.base(a), this.store.get(a), a),
            c = r.parentElement.querySelector(".pk-pi");
          (c ||
            ((c = document.createElement("span")),
            (c.className = "pk-pi"),
            r.after(c)),
            c.style.setProperty("--c", l.col),
            (c.innerHTML = `<b>${l.cls}</b><span>${l.pi}</span>`),
            (c.title = `Class ${l.cls} \xB7 PI ${l.pi} \xB7 0-100 ${l.t100.toFixed(2)} s \xB7 ${l.top.toFixed(0)} km/h`));
        }
        setTimeout(() => e(s), 30);
      };
      e([...t.querySelectorAll(".pk-card[data-key], .pk-card[data-car]")]);
    }
  };
