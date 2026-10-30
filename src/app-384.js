// app 384 — classlist
// Lines 191202-191487 of readable/app.pretty.js (statement-aligned).
function U6t() {
  return globalThis.SF_VARIANT === "taxi"
    ? globalThis.SF_MP
      ? "Teleop2"
      : "Teleoperator"
    : "SF Drive";
}
function nit() {
  let o = `<div class="cr"><div class="cr-hero"><b>Thank you</b><span>${u1(U6t())} is San Francisco rebuilt from open data, open-source code and the generosity of everyone below. Thank you for driving it.</span></div>`;
  for (let t of B6t) {
    o +=
      `<h3>${u1(t.h)}</h3>` +
      (t.note ? `<p class="cr-note">${u1(t.note)}</p>` : "") +
      "<ul>";
    for (let [e, s, n] of t.items)
      o += `<li><b>${u1(e)}</b>${s ? `<span>${u1(s)}</span>` : ""}${n && n.length ? `<div class="ln">${n.map(D6t).join("")}</div>` : ""}</li>`;
    o += "</ul>";
  }
  return (
    o +
    `<p class="cr-disc">${u1(N6t)} The full list with the licence texts: <a href="THIRD_PARTY_NOTICES.md" target="_blank" rel="noopener noreferrer">THIRD_PARTY_NOTICES.md</a>.</p></div>`
  );
}
var Ur = null;
function G6t() {
  (Ur ||
    ((Ur = document.createElement("div")),
    (Ur.id = "credits"),
    Ur.setAttribute("role", "dialog"),
    Ur.setAttribute("aria-modal", "true"),
    Ur.setAttribute("aria-label", "Credits"),
    (Ur.innerHTML = `<div class="cr-card"><div class="cr-head"><h2>Credits</h2><button class="cr-x" type="button" aria-label="Close (Esc)" title="Close (Esc)">&times;</button></div><div class="cr-body">${nit()}</div></div>`),
    document.body.appendChild(Ur),
    Ur.querySelector(".cr-x").addEventListener("click", ZB),
    Ur.addEventListener("pointerdown", (o) => {
      (o.stopPropagation(), o.target === Ur && ZB());
    }),
    addEventListener(
      "keydown",
      (o) => {
        Ur.classList.contains("on") &&
          (o.code === "Escape" && ZB(),
          !/^(Tab|Arrow|Page|Home|End)/.test(o.code) &&
            !(o.code === "Enter" && o.target?.tagName === "A") &&
            o.preventDefault(),
          o.stopImmediatePropagation());
      },
      !0,
    )),
    Ur.classList.add("on"),
    (Ur.querySelector(".cr-body").scrollTop = 0),
    Ur.querySelector(".cr-x").focus({ preventScroll: !0 }));
}
function ZB() {
  (Ur && Ur.classList.remove("on"),
    document.getElementById("creditsLink")?.focus?.({ preventScroll: !0 }));
}
function iit() {
  if (!document.getElementById("creditsCss")) {
    let e = document.createElement("style");
    ((e.id = "creditsCss"),
      (e.textContent = H6t),
      document.head.appendChild(e));
  }
  let o = document.querySelector('#pause [data-sec="credits"]');
  o && !o.firstChild && (o.innerHTML = nit());
  let t = document.getElementById("creditsLink");
  t &&
    !t._cr &&
    ((t._cr = 1),
    t.addEventListener("pointerdown", (e) => e.stopPropagation()),
    t.addEventListener("click", (e) => {
      (e.stopPropagation(), G6t());
    }));
}
var V6t = `
#poiCard { align-items: center; gap: var(--sp-3); padding: 8px 16px 8px 9px; min-width: 260px; max-width: 100%; border-radius: var(--r-md); }
#poiCard .ds-stack { min-width: 0; flex: 1 1 auto; display: flex; flex-direction: column; gap: 2px; }
#poiCard .hd { display: flex; align-items: baseline; gap: var(--sp-2); }
#poiCard .hd .ds-figure { margin-left: auto; color: var(--ink); }
#poiCard .ft { display: flex; align-items: center; gap: var(--sp-2); margin-top: 2px; }
#poiCard .ft .ds-figure { overflow: hidden; text-overflow: ellipsis; }
#poiCard .ds-icon { width: 36px; height: 36px; }
body.touch #poiCard { min-width: 0; padding: 6px 12px 6px 7px; gap: var(--sp-2); } body.touch #poiCard .ds-icon { width: 28px; height: 28px; } body.touch #poiCard .ds-title { font-size: var(--fs-md); }
body.racing #poiCard { display: none !important; }
`,
  MT = class {
    constructor(t) {
      (Object.assign(this, t),
        Th("poiCss", V6t),
        (this.el = document.createElement("div")),
        (this.el.id = "poiCard"),
        (this.el.className = "ds-panel ds-pop"),
        this.el.setAttribute("aria-live", "polite"),
        aa("tc", this.el, 0),
        (this.cur = null),
        (this.key = ""),
        (this.t = 0));
    }
    pick() {
      let t = this.camera,
        e = t.position.x,
        s = t.position.z,
        n = -Math.sin(this.v.psi),
        i = -Math.cos(this.v.psi),
        a = null,
        r = 1e9;
      for (let l of this.list()) {
        let c = l.x - e,
          h = l.z - s,
          f = Math.hypot(c, h);
        f > (l.r || 160) ||
          f < 1 ||
          (c * n + h * i) / f < (f < 30 ? -0.2 : 0.55) ||
          (f < r && ((r = f), (a = l)));
      }
      return a ? { p: a, d: r } : null;
    }
    update(t, e = !0) {
      if (((this.t -= t), this.t > 0 && e === this._ok)) {
        this.cur &&
          this._dist(
            (this.cur.d = Math.hypot(
              this.cur.p.x - this.v.pos.x,
              this.cur.p.z - this.v.pos.z,
            )),
          );
        return;
      }
      ((this.t = 0.2), (this._ok = e));
      let s = e ? this.pick() : null;
      if (((this.cur = s), document.body.classList.toggle("poi", !!s), !s)) {
        (this.el.classList.remove("on"), (this.key = ""));
        return;
      }
      let n = s.p,
        i = n.stars?.(),
        a = n.line?.() || "",
        r = n.id + "|" + i + "|" + a;
      if (r !== this.key) {
        this.key = r;
        let l = Zp[n.kind] || Zp.info;
        (this.el.style.setProperty("--c", l),
          (this.el.innerHTML = `${Br(n.kind)}<div class="ds-stack"><div class="hd"><span class="ds-eyebrow">${Or(n.label || cO[n.kind] || "")}</span><span class="ds-figure d"></span></div><div class="ds-title">${Or(n.name)}</div><div class="ft">${i != null ? pv(i) : ""}<span class="ds-figure">${Or(a)}</span></div></div>`),
          (this.dEl = this.el.querySelector(".d")));
      }
      (this._dist(s.d), this.el.classList.add("on"));
    }
    _dist(t) {
      let e = this.mph?.(),
        s = e
          ? t < 160
            ? Math.round(t * 3.281) + " ft"
            : (t / 1609.34).toFixed(1) + " mi"
          : Math.round(t) + " m";
      this.dEl && this.dEl.textContent !== s && (this.dEl.textContent = s);
    }
  };
var W6t = `
#stLive { align-items: center; gap: var(--sp-3); padding: 7px 16px 8px 9px; border-radius: var(--r-md); }
#stLive .ds-stack { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
#stLive .v { font-size: var(--fs-xl); }
#stLive .t { display: flex; align-items: center; gap: var(--sp-2); }
#stHud { display: none; flex-direction: column; align-items: center; }
#stHud:has(.card.on) { display: flex; }
#stHud .card { flex-direction: column; align-items: center; gap: 4px; padding: 14px 30px 12px; text-align: center; border-radius: var(--r-lg); min-width: 260px; }
#stHud .card .hd { display: flex; align-items: center; gap: var(--sp-2); }
#stHud .card .v { font-size: var(--fs-3xl); margin-top: 2px; }
#stHud .card .b { font: var(--fw-bold) var(--fs-xs) var(--font-mono); letter-spacing: .18em; color: var(--ink-2); margin-top: 2px; }
#stHud .card .b.nb { color: var(--gold); }
body.touch #stHud .card { padding: 9px 20px 8px; min-width: 0; } body.touch #stHud .card .v { font-size: var(--fs-2xl); } body.touch #stHud .card .ds-stars.lg i { width: 18px; height: 18px; }
#rwChip { position: fixed; left: 50%; top: calc(var(--tc-top) + 64px); transform: translateX(-50%); z-index: 7; pointer-events: none; display: flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: var(--r-pill); background: var(--c-travel); color: #fff; font: var(--fw-black) var(--fs-sm) var(--font); letter-spacing: .18em; opacity: 0; transition: opacity var(--t-fast); box-shadow: var(--sh-1); }
#rwChip svg { width: 15px; height: 15px; }
body.rewinding #rwChip { opacity: 1; }
body.rewinding #view canvas { filter: saturate(.25) contrast(1.08) brightness(.95) hue-rotate(190deg) saturate(1.4); }
#view canvas { transition: filter .2s; }
body.hud-off #stLive, body.cine #stLive { display: none !important; }
`,
  ST = (o, t, e = "") => {
    let s = document.createElement(o);
    return (t && (s.className = t), (s.textContent = e), s);
  },
  kT = class {
    constructor(t = document.body) {
      (Th("stHudCss", W6t),
        (this.el = ST("div")),
        (this.el.id = "stHud"),
        this.el.setAttribute("aria-live", "polite"),
        (this.cardEl = ST("div", "card ds-panel ds-card top ds-pop")),
        this.el.append(this.cardEl),
        aa("lane", this.el, 1),
        (this.liveEl = ST("div", "live ds-panel ds-pop")),
        (this.liveEl.id = "stLive"),
        aa("tc", this.liveEl, -1),
        (this.rw = ST("div")),
        (this.rw.id = "rwChip"),
        t.appendChild(this.rw),
        (this.cardT = 0),
        (this.liveKey = ""),
        (this.mph = !1));
    }
    _val(t, e) {
      let s = ql[t.kind];
      return s.unit === "km/h" && this.mph
        ? [Math.round(e / 1.609344), "MPH"]
        : [yT(t, e), s.unit.toUpperCase()];
    }
    update(t, e, s = !1) {
      this.mph = s;
      for (let a of e.events.splice(0))
        a.type === "result"
          ? (this.show(a), this.onResult?.(a))
          : a.type === "discover" &&
            this.onDiscover?.(
              a.s,
              a.s.stars
                .map(
                  (r, l) =>
                    "\u2605".repeat(l + 1) + " " + this._val(a.s, r).join(" "),
                )
                .join("   "),
            );
      this.cardT -= t;
      let n = e.live,
        i =
          !!n &&
          !this.cardEl.classList.contains("on") &&
          !(n.kind === "jump" && !n.take && !n.best);
      if (i) {
        let a = n.s,
          r = ql[a.kind],
          [l, c] = this._val(a, n.val),
          h = Fc(a, n.val),
          f = a.stars[h];
        (this.liveKey !== a.id &&
          ((this.liveKey = a.id),
          this.liveEl.style.setProperty("--c", r.col),
          (this.liveEl.innerHTML = `${Br(a.kind)}<div class="ds-stack"><div class="ds-eyebrow">${Or(r.label)} \xB7 <span style="color:var(--ink-2)">${Or(a.name)}</span></div><div class="ds-value v"></div><div class="t"><span class="st"></span><span class="ds-figure nx"></span></div></div>`),
          (this._lv = this.liveEl.querySelector(".v")),
          (this._ls = this.liveEl.querySelector(".st")),
          (this._ln = this.liveEl.querySelector(".nx")),
          (this._lk = -1)),
          (this._lv.innerHTML = `${l}<small>${c}</small>`),
          this._lk !== h && ((this._lk = h), (this._ls.innerHTML = pv(h))),
          (this._ln.textContent =
            f !== void 0 ? "NEXT \u2605 " + this._val(a, f).join(" ") : ""));
      } else this.liveKey = "";
      (this.liveEl.classList.toggle("on", i),
        document.body.classList.toggle("stLive", i));
    }
    show(t) {
      let e = t.s,
        s = ql[e.kind],
        [n, i] = this._val(e, t.val),
        [a, r] = this._val(e, t.best);
      (dd.show(this.cardEl, {
        key: "stunt",
        pri: 3,
        dur: 3.6,
        hold: !0,
        onShow: (l) => {
          (l.style.setProperty("--c", s.col),
            (l.innerHTML = `<div class="hd">${Br(e.kind, "sm")}<span class="ds-eyebrow">${Or(s.label)}</span></div><div class="ds-title"></div><div class="ds-value v">${n}<small>${i}</small></div>${pv(0, 3, "lg")}<div class="b${t.newBest ? " nb" : ""}">${t.newBest ? (t.old ? "NEW BEST" : "FIRST RUN") : `BEST ${a} ${r}`}</div>`),
            (l.querySelector(".ds-title").textContent = e.name),
            l.querySelectorAll(".ds-stars i").forEach((c, h) => {
              h < t.stars &&
                setTimeout(
                  () => {
                    (c.classList.add("on", "pop"),
                      setTimeout(() => c.classList.remove("pop"), 200));
                  },
                  220 + h * 220,
                );
            }));
        },
      }),
        (this.cardT = 3.6),
        this.liveEl.classList.remove("on"),
        (this.liveKey = ""));
    }
    rewind(t, e) {
      (document.body.classList.toggle("rewinding", !!t),
        t &&
          (this.rw.innerHTML = `${L_("rewind")}REWIND <b>${e.toFixed(1)} s</b>`));
    }
  };
