// app 346 — sel
// Lines 166948-167237 of readable/app.pretty.js (statement-aligned).
var jf = { cols: 8, rows: 6, n: 48 },
  Ac = (o) =>
    String(o ?? "").replace(
      /[&<>"']/g,
      (t) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[t],
    ),
  l4t =
    '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10l9-6 9 6v10H3z"/><path d="M7 20v-7h10v7M7 16h10"/></svg>',
  PE = class {
    constructor({
      current: t,
      select: e,
      confirm: s,
      cancel: n,
      list: i = null,
      garage: a = null,
    }) {
      ((this.current = t),
        (this.onSelect = e),
        (this.onConfirm = s),
        (this.onCancel = n),
        (this.list = i),
        (this.onGarage = a),
        (this.isOpen = !1),
        (this.sel = null),
        (this.busy = null),
        (this.first = !0),
        (this.cards = []),
        (this.tt = new Map()));
      let r = (this.el = document.createElement("div"));
      ((r.id = "picker"),
        r.setAttribute("role", "dialog"),
        r.setAttribute("aria-label", "Choose your FSD"),
        (r.innerHTML = `<div class="pk-in">
      <div class="pk-hd"><small>Teleoperator \xB7 remote driving console</small><h2>Choose your <em>FSD</em></h2>
        <p>The robotaxi you pilot through San Francisco tonight. Swap any time from the menu.</p></div>
      <div class="pk-cards"></div>
      <div class="pk-ft"><button class="pk-go" type="button">Start shift</button><span class="pk-keys"><b>\u2190</b><b>\u2192</b> choose &nbsp; <b>Enter</b> drive &nbsp; <b>G</b> garage</span></div>
    </div>`),
        document.body.appendChild(r),
        r.querySelector(".pk-go").addEventListener("click", () => this.go()),
        addEventListener(
          "keydown",
          (l) => {
            if (!this.isOpen) return;
            let c = this.keys(),
              h = c.indexOf(this.sel);
            (l.code === "ArrowLeft" || l.code === "KeyA"
              ? (this.pick(c[(h + c.length - 1) % c.length]),
                l.preventDefault())
              : l.code === "ArrowRight" || l.code === "KeyD" || l.code === "Tab"
                ? (this.pick(c[(h + 1) % c.length]), l.preventDefault())
                : l.code === "Enter" || l.code === "Space"
                  ? l.target?.closest?.(".pk-gar")
                    ? (this.garage(), l.preventDefault())
                    : (this.go(), l.preventDefault())
                  : l.code === "KeyG"
                    ? (this.garage(), l.preventDefault())
                    : l.code === "Escape" &&
                      !this.first &&
                      (this.close(), this.onCancel?.(), l.preventDefault()),
              l.stopPropagation());
          },
          !0,
        ),
        (this.pad = { l: !1, r: !1, a: !1 }));
    }
    keys() {
      return this.cards.map((t) => t.dataset.key);
    }
    has(t) {
      return this.keys().includes(t);
    }
    nameOf(t) {
      return (
        this.cards.find((e) => e.dataset.key === t)?.querySelector(".pk-name b")
          ?.textContent ||
        us[t]?.name ||
        "car"
      );
    }
    render() {
      let t = (
          this.list
            ? this.list()
            : E2.filter((s) => us[s] && s !== "custom")
                .slice(0, 3)
                .map((s) => ({
                  key: s,
                  F: us[s],
                  name: us[s].name,
                  tag: us[s].maker,
                  sub: us[s].model,
                  stats: us[s].stats,
                  acc: us[s].accent,
                }))
        ).slice(0, 3),
        e = this.el.querySelector(".pk-cards");
      ((e.innerHTML =
        t
          .map(
            (
              s,
            ) => `<button class="pk-card${s.thumb ? " pk-mine" : ""}" type="button" data-key="${Ac(s.key)}"${s.F && !s.thumb ? ` data-car="${Ac(s.F.id)}"` : ""} aria-pressed="false" style="--acc:${Ac(s.acc || "#b98cff")}">
      <div class="pk-turn${s.thumb ? " pk-pic" : ""}">${s.thumb ? `<img src="${Ac(s.thumb)}" alt="" loading="lazy">` : s.F?.dir ? '<canvas width="768" height="432" aria-hidden="true"></canvas>' : s.F ? `<span class="pk-spr" style="${t4(s.F)}"></span>` : `<span class="pk-ph" aria-hidden="true">${Ac((s.name || "?").trim().charAt(0).toUpperCase())}</span>`}<span class="pk-load">Loading\u2026</span></div>
      <div class="pk-name"><small>${Ac(s.tag || "")}</small><b title="${Ac(s.name)}">${Ac(s.name)}</b><i title="${Ac(s.sub || "")}">${Ac(s.sub || "")}</i></div>
      <div class="pk-stats">${(s.stats || [])
        .slice(0, 3)
        .map(([n, i]) => `<span><b>${Ac(n)}</b>${Ac(i)}</span>`)
        .join(
          "",
        )}</div><span class="pk-tick" aria-hidden="true"></span></button>`,
          )
          .join("") +
        `<button class="pk-gar" type="button" aria-label="Garage: all your cars, make and customize"><span class="pk-gi">${l4t}</span><b>Garage</b><small>All your cars \xB7 make one \xB7 customize</small></button>`),
        (this.cards = [...e.querySelectorAll(".pk-card")]));
      for (let s of this.cards)
        (s.addEventListener("click", () => {
          (this.sel === s.dataset.key && !this.busy) ||
            this.pick(s.dataset.key);
        }),
          s.addEventListener("dblclick", () => this.go()),
          s.querySelector("canvas")
            ? this.turntable(s)
            : s.classList.add("ready"));
      (e
        .querySelector(".pk-gar")
        .addEventListener("click", () => this.garage()),
        this.isOpen && this.sync());
    }
    setCustom() {
      this.isOpen &&
        (this.render(),
        this.has(this.sel) || (this.sel = this.keys()[0]),
        this.sync());
    }
    turntable(t) {
      let e = us[t.dataset.car],
        s = t.querySelector("canvas"),
        n = s.getContext("2d");
      if (!e) return;
      let i = this.tt.get(e.id);
      i ||
        ((i = new Image()),
        (i.decoding = "async"),
        (i.fetchPriority = "low"),
        (i.src = e.dir + "turntable.webp"),
        this.tt.set(e.id, i));
      let a = { a: Math.random() * jf.n, drag: null, v: jf.n / 8, k: -1 },
        r = () => i.complete && i.naturalWidth > 0,
        l = () => i.naturalWidth / jf.cols,
        c = () => i.naturalHeight / jf.rows,
        h = (m) => {
          let g = ((m % jf.n) + jf.n) % jf.n,
            b = (g % jf.cols) * l(),
            v = Math.floor(g / jf.cols) * c();
          n.drawImage(i, b, v, l(), c(), 0, 0, s.width, s.height);
        },
        f = performance.now(),
        u = (m) => {
          if (!t.isConnected) return;
          requestAnimationFrame(u);
          let g = Math.min(0.1, (m - f) / 1e3);
          if (((f = m), !this.isOpen || !r())) return;
          (t.classList.add("ready"),
            a.drag ||
              (a.a +=
                g *
                a.v *
                (t.getAttribute("aria-pressed") === "true" ? 1 : 0.45)));
          let b = Math.round(a.a);
          b !== a.k && ((a.k = b), h(b));
        };
      requestAnimationFrame(u);
      let d = t.querySelector(".pk-turn");
      (d.addEventListener("pointerdown", (m) => {
        ((a.drag = { x: m.clientX, a: a.a, moved: !1 }),
          d.setPointerCapture?.(m.pointerId));
      }),
        d.addEventListener("pointermove", (m) => {
          if (!a.drag) return;
          let g = m.clientX - a.drag.x;
          (Math.abs(g) > 4 && (a.drag.moved = !0),
            (a.a = a.drag.a - (g / d.clientWidth) * jf.n * 0.8));
        }));
      let p = (m) => {
        (a.drag?.moved &&
          (m.preventDefault(),
          (t.dataset.dragged = "1"),
          setTimeout(() => delete t.dataset.dragged, 0)),
          (a.drag = null));
      };
      (d.addEventListener("pointerup", p),
        d.addEventListener("pointercancel", p),
        t.addEventListener(
          "click",
          (m) => {
            t.dataset.dragged && m.stopImmediatePropagation();
          },
          !0,
        ));
    }
    sync() {
      for (let s of this.cards) {
        let n = s.dataset.key === this.sel;
        (s.setAttribute("aria-pressed", String(n)),
          s.classList.toggle("busy", n && !!this.busy));
      }
      this.el.classList.toggle("busy", !!this.busy);
      let t = this.nameOf(this.sel),
        e = this.el.querySelector(".pk-go");
      ((e.textContent = this.busy
        ? "Loading " + t + "\u2026"
        : this.first
          ? "Start shift"
          : "Drive"),
        (e.title = this.first
          ? "Start your shift in the " + t
          : "Drive the " + t));
    }
    pick(t) {
      if (!this.has(t)) return;
      this.sel = t;
      let e = (this.busy = Promise.resolve(this.onSelect?.(t))
        .catch((s) => console.warn("picker:", s))
        .then(() => {
          this.busy === e && ((this.busy = null), this.sync());
        }));
      this.sync();
    }
    async go() {
      this.isOpen &&
        (this.busy && (await this.busy),
        this.current() !== this.sel && (this.pick(this.sel), await this.busy),
        this.close(),
        this.onConfirm?.(this.sel));
    }
    async garage() {
      !this.isOpen ||
        !this.onGarage ||
        (this.busy && (await this.busy), this.close(), this.onGarage(this.sel));
    }
    open({ first: t = !1 } = {}) {
      ((this.first = t),
        (this.isOpen = !0),
        this.render(),
        (this.sel = this.current()),
        this.has(this.sel) || (this.sel = this.keys()[0]),
        this.el.classList.toggle("first", t),
        this.el.classList.add("on"),
        document.body.classList.add("picking"),
        document.body.classList.remove("play"),
        this.sync(),
        this.el.querySelector(".pk-go").focus?.({ preventScroll: !0 }),
        this.sel && this.current() !== this.sel && this.pick(this.sel),
        this.poll());
    }
    close() {
      ((this.isOpen = !1),
        this.el.classList.remove("on"),
        document.body.classList.remove("picking"),
        document.activeElement?.blur?.());
    }
    poll() {
      if (!this.isOpen) return;
      requestAnimationFrame(() => this.poll());
      let t = navigator.getGamepads?.()?.find((l) => l && l.connected);
      if (!t) return;
      let e = t.axes[0] || 0,
        s = t.buttons[14]?.pressed || e < -0.6,
        n = t.buttons[15]?.pressed || e > 0.6,
        i = t.buttons[0]?.pressed || t.buttons[9]?.pressed,
        a = this.keys(),
        r = a.indexOf(this.sel);
      (s && !this.pad.l && this.pick(a[(r + a.length - 1) % a.length]),
        n && !this.pad.r && this.pick(a[(r + 1) % a.length]),
        i && !this.pad.a && this.go(),
        (this.pad = { l: s, r: n, a: i }));
    }
  };
es();
P0();
es();
