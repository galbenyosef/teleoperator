// app 349 — math
// Lines 167789-168915 of readable/app.pretty.js (statement-aligned).
var u4t = 600,
  _st = Math.PI * 0.12,
  d4t = 0.62,
  uB = Math.PI + _st - d4t,
  s4 = 0.075,
  zst = [
    ["paint", "Paint"],
    ["wrap", "Wrap"],
    ["wheels", "Wheels"],
    ["perf", "Performance"],
  ],
  p4t = new Set(["wheels", "tyres", "engine", "perf"]),
  Bo = (o) =>
    String(o).replace(
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
  LE = class {
    constructor(t) {
      (Object.assign(this, t),
        (this.isOpen = !1),
        (this.tab = "paint"),
        (this.draft = null),
        (this.saved = null),
        (this.up = u4t),
        (this.spotI = 60),
        (this.orb = {
          yaw: uB,
          pitch: s4,
          t: 0,
          dist: 0,
          spin: 0,
          drag: null,
          idle: 0,
          pinch: null,
        }));
      let e = (this.el = document.createElement("div"));
      ((e.id = "garage"),
        e.setAttribute("role", "dialog"),
        e.setAttribute("aria-label", "Garage"),
        (e.innerHTML = `<div class="gr-stage" aria-hidden="true"></div>
      <div class="gr-side">
        <div class="gr-hd"><small hidden>Garage \xB7 <span class="gr-car"></span></small><h2 hidden><span class="gr-cat">Cosmetics</span> / <b class="gr-sub">Paint</b></h2>
          <div class="gr-strip"><b class="gr-sname"></b><span class="gr-spi"></span><span class="gr-scash"></span>
            <span class="gr-tools"><button type="button" class="gr-tool" data-act="undo" title="Undo (Ctrl+Z)" aria-label="Undo">Undo</button><button type="button" class="gr-tool" data-act="reset" title="Back to the factory's">Factory</button></span></div>
          <div class="gr-tok" aria-live="polite"></div></div>
        <nav class="gr-tabs" role="tablist"></nav>
        <div class="gr-body"></div>
        <div class="gr-buy" hidden><span></span><button type="button" class="gr-btn gr-go" data-act="buy"></button></div>
        <button type="button" class="gr-btn gr-donep" data-act="done" title="Done (Esc)">Done</button>
      </div>
      <div class="gr-name"><b></b><small></small></div>
      <div class="gh-busy gr-preview" role="status" hidden><i></i><span></span></div>
      <div class="gr-ft"><span class="gr-hint">Drag to turn \xB7 scroll to zoom</span>
        <button type="button" class="gr-btn gr-done" data-act="back">Done</button></div>`),
        document.body.appendChild(e),
        (this.ext = {}),
        this.tabs(),
        (this.body = e.querySelector(".gr-body")),
        (this.previewNote = e.querySelector(".gr-preview")),
        (this.previewRetry = document.createElement("button")),
        (this.previewRetry.type = "button"),
        (this.previewRetry.className = "gr-btn"),
        (this.previewRetry.textContent = "Retry preview"),
        (this.previewRetry.hidden = !0),
        (this.previewRetry.onclick = () => {
          (this.mb.retryMaterials(this.car().root),
            (this.materialWaitStart = 0));
        }),
        this.previewNote.appendChild(this.previewRetry),
        e.querySelector(".gr-tabs").addEventListener("click", (s) => {
          let n = s.target.closest("[data-tab]");
          if (n) {
            if (n.dataset.soon) {
              this.toast?.(
                n.textContent.replace("Soon", ""),
                "Coming soon to the garage",
              );
              return;
            }
            ((this.tab = n.dataset.tab), this.render());
          }
        }),
        e.addEventListener("click", (s) => {
          let n = s.target.closest(".gr-ft [data-act], .gr-side [data-act]");
          n && !n.disabled && this[n.dataset.act]();
        }),
        (this.undos = []),
        this.body.addEventListener("click", (s) => {
          let n = this.ext[this.tab];
          n ? n.onPick(s) : this.onPick(s);
        }),
        this.body.addEventListener("input", (s) => {
          let n = this.ext[this.tab];
          if (n) {
            n.onInput?.(s);
            return;
          }
          s.target.matches("input[type=color]")
            ? this.set({
                c: s.target.value.toLowerCase(),
                w: null,
                f: this.draft?.f || "metallic",
              })
            : s.target.matches(".gr-words") &&
              ((this.G.words = s.target.value), this.syncGen());
        }),
        this.body.addEventListener("change", (s) => {
          s.target.matches(".gr-file") &&
            (this.addRefs(s.target.files), (s.target.value = ""));
        }),
        this.body.addEventListener("dragover", (s) => {
          let n = s.target.closest?.(".gr-drop");
          n && (s.preventDefault(), n.classList.add("over"));
        }),
        this.body.addEventListener("dragleave", (s) =>
          s.target.closest?.(".gr-drop")?.classList.remove("over"),
        ),
        this.body.addEventListener("drop", (s) => {
          let n = s.target.closest?.(".gr-drop");
          n &&
            (s.preventDefault(),
            n.classList.remove("over"),
            this.addRefs(s.dataTransfer?.files));
        }),
        (this.G = {
          words: "",
          refs: [],
          mode: "f",
          busy: null,
          shots: [],
          ask: null,
          note: null,
          vary: 0,
        }),
        this.stageInput(e.querySelector(".gr-stage")),
        addEventListener(
          "keydown",
          (s) => {
            if (this.isOpen) {
              if (s.target?.matches?.("input, textarea")) {
                (s.code === "Enter" &&
                  s.target.dispatchEvent(new CustomEvent("sf-enter")),
                  s.code === "Escape" &&
                    (s.target.dispatchEvent(new CustomEvent("sf-esc")),
                    s.target.blur()),
                  s.stopPropagation());
                return;
              }
              if (
                (s.ctrlKey || s.metaKey) &&
                s.code === "KeyZ" &&
                this.mode !== "create"
              ) {
                (this.undo(), s.preventDefault(), s.stopPropagation());
                return;
              }
              if (this.mode === "home" && this.home?.key(s)) {
                (s.preventDefault(), s.stopPropagation());
                return;
              }
              if (this.mode === "create" && this.creator?.key(s)) {
                (s.preventDefault(), s.stopPropagation());
                return;
              }
              (s.code === "Escape" || s.code === "Backspace"
                ? (this.back(), s.preventDefault())
                : s.code === "ArrowLeft" || s.code === "KeyA"
                  ? ((this.orb.yaw -= 0.18),
                    (this.orb.idle = 0),
                    s.preventDefault())
                  : (s.code === "ArrowRight" || s.code === "KeyD") &&
                    ((this.orb.yaw += 0.18),
                    (this.orb.idle = 0),
                    s.preventDefault()),
                s.stopPropagation());
            }
          },
          !0,
        ));
    }
    tabs() {
      let t = (e) => p4t.has(e) && !this.ext[e];
      this.el.querySelector(".gr-tabs").innerHTML = zst
        .map(
          ([e, s]) =>
            `<button type="button" role="tab" data-tab="${e}"${t(e) ? ' data-soon="1" aria-disabled="true"' : ""}>${s}${t(e) ? "<i>Soon</i>" : ""}</button>`,
        )
        .join("");
    }
    register(t, e) {
      for (let s of t) this.ext[s] = e;
      (this.tabs(), this.isOpen && this.render());
    }
    open({ from: t = "pause", mode: e = "edit" } = {}) {
      if (this.isOpen) {
        this.setMode(e);
        return;
      }
      let s = this.car(),
        n = this.carId();
      ((this.from = t),
        (this.isOpen = !0),
        (this.tab = "paint"),
        (this.mode = e),
        (this.via = e === "edit" ? null : "home"),
        (this.el.dataset.mode = e),
        (this.saved = or(this.store.get(n))),
        (this.draft = this.saved ? { ...this.saved } : null),
        (this.orb.yaw = uB),
        (this.orb.pitch = s4),
        (this.psi0 = _st),
        (this.orb.t = 0),
        (this.orb.spin = 0),
        (this.orb.idle = 0),
        (this.orb.dist = 0),
        (this.orb.drag = null),
        this.studio(),
        this.st.enter(this.scene),
        (this.scene.userData.lightsVersion =
          (this.scene.userData.lightsVersion | 0) + 1));
      let i = this.mb.skyVis;
      (i &&
        ((this.sv = { strength: i.strength, car: i.car }),
        (i.strength = 0),
        (i.car = 0)),
        fM(this.mb, s));
      for (let a of new Set(Object.values(this.ext))) a.open?.();
      (this.el.classList.add("on"),
        document.body.classList.add("garage"),
        document.body.classList.remove("play"),
        e === "home"
          ? (this.home?.enter(), this.carChanged())
          : e === "create" && this.creator?.enter(),
        this.render());
    }
    setMode(t) {
      if (!this.isOpen) return;
      this.mode === "edit" && t !== "edit" && c0(this.car(), this.saved);
      let e = this.mode;
      ((this.mode = t),
        (this.el.dataset.mode = t),
        (this.orb.dist = 0),
        t === "edit" &&
          ((this.tab = "paint"),
          (this.saved = or(this.store.get(this.carId()))),
          (this.draft = this.saved ? { ...this.saved } : null),
          fM(this.mb, this.car()),
          e === "home" && (this.via = "home")),
        t === "home" && e !== "home" && this.home?.enter(e),
        t === "create" && e !== "create" && this.creator?.enter(),
        this.render());
    }
    edit() {
      this.setMode("edit");
    }
    close() {
      if (this.isOpen) {
        (this.mode === "create" && this.creator?.leave(),
          (this.mode !== "edit" || this.via === "home") && this.home?.leave(),
          (this.isOpen = !1),
          c0(this.car(), this.saved));
        for (let t of [this.car(), this.hid]) t && (t.root.visible = !0);
        this.hid = null;
        for (let t of new Set(Object.values(this.ext))) t.close?.();
        (this.st.leave(this.scene),
          (this.scene.userData.lightsVersion =
            (this.scene.userData.lightsVersion | 0) + 1),
          this.sv && this.mb.skyVis && Object.assign(this.mb.skyVis, this.sv),
          this.el.classList.remove("on"),
          document.body.classList.remove("garage"),
          document.activeElement?.blur?.());
      }
    }
    back() {
      if (this.mode === "home" && this.home?.customizing) {
        this.home.toggleCustom(!1);
        return;
      }
      if (this.mode === "home" && this.from === "start" && !this.started?.())
        return;
      if (this.mode === "edit" && this.via === "home") {
        this.setMode("home");
        return;
      }
      if (this.mode === "create") {
        this.creator?.back();
        return;
      }
      let t = this.from;
      (this.close(), this.exit?.(t));
    }
    leaveToDrive() {
      (this.home?.commitDone?.(),
        (this.saved = or(this.store.get(this.carId()))),
        this.close(),
        this.exit?.("drive"));
    }
    apply() {
      return this.commit();
    }
    done() {
      if (this.mode === "home" && this.home) {
        this.home.toggleCustom(!1);
        return;
      }
      this.back();
    }
    buy() {
      let t = this.ext[this.tab];
      t && (t.apply(), this.render());
    }
    pushUndo(t) {
      (this.undos.push(t), this.undos.length > 50 && this.undos.shift());
    }
    undo() {
      let t = this.undos.pop();
      if (!t) {
        this.toast?.("Nothing to undo", "");
        return;
      }
      if (t.kind === "tune") {
        for (let e of new Set(Object.values(this.ext))) e.undo?.(t);
        this.render();
        return;
      }
      (this.store.set(t.id, t.before),
        t.id === this.carId() &&
          ((this.saved = or(t.before)),
          (this.draft = this.saved ? { ...this.saved } : null),
          c0(this.car(), this.draft)),
        this.render());
    }
    async commit() {
      if (!jx(this.car())) return;
      let t = this.carId(),
        e = or(this.draft),
        s = this.saved;
      if (!hM(e, s)) {
        if (
          (this.pushUndo({ kind: "paint", id: t, before: s }),
          (this.saved = e),
          this.store.set(t, e),
          e?.w?.u && !e.w.c && !e.w.u.startsWith("data:") && !hM(e, s))
        ) {
          let n = e;
          ((e = await TE(e, this.G.shots, e.w.n)),
            this.carId() === t &&
              hM(or(this.draft), n) &&
              ((this.draft = { ...e }), (this.saved = e), c0(this.car(), e)),
            this.store.set(t, e),
            !e.w.c &&
              !n_(e.w.u) &&
              this.toast?.(
                "Wrap saved here only",
                "It could not be kept or shared on mindblown, so friends in a room see its colours only",
              ));
        }
        this.render();
      }
    }
    reset() {
      if (this.ext[this.tab]) {
        (this.ext[this.tab].reset(), this.render());
        return;
      }
      jx(this.car()) && ((this.draft = null), this.preview(), this.commit());
    }
    carChanged() {
      if (this.isOpen) {
        ((this.saved = or(this.store.get(this.carId()))),
          (this.draft = this.saved ? { ...this.saved } : null),
          fM(this.mb, this.car()));
        for (let t of new Set(Object.values(this.ext))) t.carChanged?.();
        ((this.orb.dist = 0), this.render());
      }
    }
    set(t) {
      ((this.draft = { ...(this.draft || {}), ...t }),
        this.preview(),
        this.commit());
    }
    preview() {
      (c0(this.car(), this.draft), this.render());
    }
    label() {
      let t = this.draft,
        e = this.car(),
        s = jx(e);
      if (!s)
        return e?.custom
          ? [us.custom?.name || "Your car", "From your mindblown inventory"]
          : ["Fleet livery", "Operator white"];
      if (t?.w)
        return [
          t.w.n ? t.w.n.slice(0, 28) : "Custom wrap",
          ld[t.w.m] + " wrap \xB7 " + Lf(t.f || "gloss").name,
        ];
      if (!t?.c && !t?.f)
        return [
          s.wrap ? "Brushed stainless" : "Factory paint",
          s.wrap ? "Bare metal, no wrap" : "As delivered",
        ];
      let n = t.c || c_(e),
        i = Lf(t.f || "metallic");
      return [
        Ff(n) || (t.c ? "Custom " + n.toUpperCase() : "Factory colour"),
        s.wrap ? i.name + " wrap" : i.name,
      ];
    }
    engineRow() {
      let t = this.engine,
        e = this.car();
      if (!t || !e?.custom) return "";
      let s = t.get(),
        n = t.auto(),
        i = t.list(),
        a = (r, l, c) =>
          `<button type="button" data-k="snd" data-v="${r}" aria-pressed="${c}">${Bo(l)}</button>`;
      return `<h4>Engine sound<span>Recorded</span></h4><div class="gr-fins gr-snd">${a("auto", "Auto \xB7 " + (i.find((r) => r[0] === n)?.[1] || ""), !s)}${i.map(([r, l]) => a(r, l, s === r)).join("")}</div>`;
    }
    onPick(t) {
      let e = t.target.closest("[data-k]");
      if (!e) return;
      let s = e.dataset.k,
        n = e.dataset.v || null;
      if (s === "pick") {
        this.pick?.();
        return;
      }
      if (!this.onGen(s, n, e)) {
        if (e.dataset.lock) {
          this.toast?.(
            "Locked \xB7 level " + e.dataset.lock,
            "Earn XP - skill chains, stunts, boards - to unlock it",
          );
          return;
        }
        if (s === "snd") {
          (this.engine?.set(n === "auto" ? null : n), this.render());
          return;
        }
        s === "c"
          ? n === "factory"
            ? this.set({
                c: null,
                w: null,
                f:
                  this.draft?.f && this.draft.f !== "metallic"
                    ? this.draft.f
                    : null,
              })
            : this.set({ c: n, w: null, f: this.draft?.f || "metallic" })
          : s === "f"
            ? this.set(n === "factory" ? { f: null, c: null } : { f: n })
            : s === "cal"
              ? this.set({ cal: n === "factory" ? null : n })
              : s === "rim" && this.set({ rim: n === "factory" ? null : n });
      }
    }
    render() {
      if (!this.isOpen) return;
      if (this.mode === "create") {
        this.creator?.render();
        return;
      }
      if (this.mode === "home") {
        this.home?.render();
        let v = !!this.home?.customizing && !!this.home?.editable?.();
        if ((this.el.classList.toggle("panel", v), !v)) return;
      } else this.el.classList.remove("panel");
      this.home?.edited?.();
      let t = this.car(),
        e = this.carId(),
        s = this.fleetOf?.() || us[e],
        n = jx(t),
        i = this.draft || {};
      this.el.querySelector(".gr-car").textContent = s
        ? s.name + " " + s.model
        : "Ferrari 458 Spider";
      for (let v of this.el.querySelectorAll(".gr-tabs button"))
        v.setAttribute("aria-selected", String(v.dataset.tab === this.tab));
      this.el.querySelector(".gr-sub").textContent = zst.find(
        (v) => v[0] === this.tab,
      )[1];
      let a = this.ext[this.tab];
      this.renderTok();
      let [r, l] = a ? a.label() : this.label();
      ((this.el.querySelector(".gr-name b").textContent = r),
        (this.el.querySelector(".gr-name small").textContent = l),
        this.el.classList.toggle("tuning", !!a),
        (this.el.querySelector(".gr-cat").textContent =
          a?.cat?.(this.tab) || "Cosmetics"),
        (this.el.querySelector("[data-act=undo]").disabled =
          !this.undos.length));
      {
        let v = new Set(Object.values(this.ext)).values().next().value,
          x = v?.cur,
          y = v?.was,
          M = v?.wallet?.();
        ((this.el.querySelector(".gr-sname").textContent =
          this.home?.selected?.()?.name || (s ? s.name : "Your car")),
          (this.el.querySelector(".gr-spi").innerHTML = x
            ? y && y.pi !== x.pi
              ? `${Bo(y.cls)} ${y.pi} \u2192 <b>${Bo(x.cls)} ${x.pi}</b>`
              : `<b>${Bo(x.cls)} ${x.pi}</b>`
            : ""),
          (this.el.querySelector(".gr-scash").textContent =
            M == null ? "" : "$" + Math.round(M).toLocaleString("en-US")));
      }
      let c = this.el.querySelector(".gr-buy");
      if (a) {
        let v = a.foot();
        if (
          ((this.el.querySelector("[data-act=reset]").disabled = !v.reset),
          this.el.classList.remove("locked"),
          a.render(this.body),
          (c.hidden = !v.buy || !!this.body.querySelector(".tu-buyb")),
          v.buy)
        ) {
          c.querySelector("span").textContent = v.buy.note;
          let x = c.querySelector("button");
          ((x.textContent = v.buy.go), (x.disabled = !!v.buy.locked));
        }
        return;
      }
      if (
        ((c.hidden = !0),
        this.el.classList.toggle("locked", !n),
        (this.el.querySelector("[data-act=reset]").disabled =
          !n || (!i.c && !i.f && !i.cal && !i.rim && !i.w)),
        this.tab === "wrap")
      ) {
        this.renderWrap(n);
        return;
      }
      if (!n) {
        this.body.innerHTML = t?.custom
          ? `<div class="gr-lock"><b>Paint stays as made</b><p>${Bo(t.noPaint || "This car's paint is part of its model.")} Every other car can be painted and wrapped.</p>
        ${this.pick ? '<button type="button" class="gr-btn" data-k="pick">Choose another car</button>' : ""}</div>`
          : `<div class="gr-lock"><b>Fleet livery</b><p>The Waymo keeps its operator's white: the paint is part of its photographed body with the sensors and the lettering, and riders look for it at the kerb. Every other car in the garage can be painted.</p>
        ${this.pick ? '<button type="button" class="gr-btn" data-k="pick">Choose another car</button>' : ""}</div>`;
        return;
      }
      let h = c_(t),
        f = i.c || null,
        u = this.level ? this.level() : 99,
        d = (v, x, y) =>
          `<button type="button" class="gr-sw lock" data-k="c" data-v="${v}" data-lock="${y}" title="${Bo(x)} \xB7 level ${y}" aria-label="${Bo(x)}, locked until level ${y}" style="--c:${v}"><i>${y}</i></button>`,
        p = (v, x, y, M, S = "", w = x) =>
          `<button type="button" class="gr-sw${M ? " on" : ""}${S}" data-k="${v}" data-v="${x}" title="${Bo(y)}" aria-label="${Bo(y)}" aria-pressed="${M}" style="--c:${w}"></button>`,
        m = (v) => (v?.[0]?.color ? "#" + v[0].color.getHexString() : "#777"),
        g = i.f || (f ? "metallic" : null),
        b = f && !Gp.some((v) => v[0] === f) && !f2.some((v) => v[0] === f);
      this.body.innerHTML = `
      <h4>${n.wrap ? "Wrap colour" : "Body colour"}<span>${Bo(f ? Ff(f) || f.toUpperCase() : n.wrap ? "Bare stainless" : "Factory")}</span></h4>
      <div class="gr-grid">${p("c", "factory", n.wrap ? "Bare stainless" : "Factory colour", !f, " fac", h)}${Gp.map(([v, x]) => p("c", v, x, f === v)).join("")}${f2.map(([v, x, y]) => (u < y ? d(v, x, y) : p("c", v, x + " \xB7 exclusive", f === v, " x"))).join("")}
        <label class="gr-sw gr-cust${b ? " on" : ""}" title="Any colour" style="--c:${b ? f : "transparent"}"><input type="color" value="${f || h}" aria-label="Any colour"></label></div>
      <h4>Finish<span>${Bo(g ? Lf(g).sub : n.wrap ? "Brushed steel" : "As delivered")}</span></h4>
      <div class="gr-fins"><button type="button" data-k="f" data-v="factory" aria-pressed="${!g}">${n.wrap ? "Stainless" : "Factory"}</button>${Vp.map((v) => (v.lvl && u < v.lvl ? `<button type="button" class="lock" data-k="f" data-v="${v.id}" data-lock="${v.lvl}" aria-disabled="true" title="Level ${v.lvl}">${v.name}<i>LV ${v.lvl}</i></button>` : `<button type="button" data-k="f" data-v="${v.id}" aria-pressed="${g === v.id}">${v.name}</button>`)).join("")}</div>
      ${n.calipers ? `<h4>Calipers<span>${Bo(i.cal ? Ff(i.cal, qx) : "Factory")}</span></h4><div class="gr-grid sm">${p("cal", "factory", "Factory calipers", !i.cal, " fac", m(t.paintKit.calSaved?.map((v) => ({ color: v.c })) || t.paintKit.calipers))}${qx.map(([v, x]) => p("cal", v, x, i.cal === v)).join("")}</div>` : ""}
      ${n.rims ? `<h4>Wheels<span>${Bo(i.rim ? Ff(i.rim, If) : "Factory")}</span></h4><div class="gr-grid sm">${p("rim", "factory", "Factory wheels", !i.rim, " fac rim", m(t.paintKit.rimSaved?.map((v) => ({ color: v.c })) || t.paintKit.rims))}${If.map(([v, x]) => p("rim", v, x, i.rim === v, " rim")).join("")}</div>` : ""}${this.engineRow()}`;
    }
    renderTok() {
      let t = this.el.querySelector(".gr-tok");
      if (!t) return;
      let e = this.tab === "wrap";
      ((t.hidden = !e), e && (t.innerHTML = Tv()));
    }
    costLine() {
      return Bo(T2("image"));
    }
    renderWrap(t) {
      let e = this.G,
        s = this.draft || {},
        n = this.car();
      if (!t?.picture) {
        this.body.innerHTML = `<div class="gr-lock"><b>No wrap on this one</b><p>${Bo(n?.noPaint || "Its paint is part of its model.")} Every other car can be wrapped.</p>
        ${this.pick ? '<button type="button" class="gr-btn" data-k="pick">Choose another car</button>' : ""}</div>`;
        return;
      }
      let i = a1(),
        a = qf(),
        r = !!e.busy,
        l = e.refs
          .map(
            (u, d) =>
              `<span class="gr-ref"><img src="${u.thumb}" alt=""><span class="gr-pal">${u.pal.map((p) => `<i style="--c:${p}"></i>`).join("")}</span><button type="button" data-k="refdel" data-v="${d}" aria-label="Remove this photo">\xD7</button></span>`,
          )
          .join(""),
        c = e.shots
          .map(
            (u, d) =>
              `<button type="button" class="gr-shot${s.w?.u === u.url ? " on" : ""}" data-k="shot" data-v="${d}" title="${Bo(u.words)}" aria-pressed="${s.w?.u === u.url}"><img src="${Bo(u.url)}" alt="${Bo(u.words)}">${u.late ? "<i>late</i>" : ""}</button>`,
          )
          .join(""),
        h = e.note
          ? `<div class="gr-note${e.note.bad ? " bad" : ""}"><b>${Bo(e.note.t)}</b> ${Bo(e.note.m)}${e.note.signin ? ' <button type="button" class="acIn" data-signin="1">Sign in to mindblown</button>' : ""}</div>`
          : "",
        f = e.ask
          ? `<div class="gr-ask" role="alertdialog" aria-label="Confirm">${ZM("image", 1, e.ask.kind === "var" ? "Make a variation?" : "Make this wrap?")}
      <div class="gr-askb"><button type="button" class="gr-btn gr-go" data-k="ask-yes">Generate 1</button><button type="button" class="gr-btn" data-k="ask-no">Not now</button></div></div>`
          : "";
      ((this.body.innerHTML = `
      <h4>Describe the wrap<span>${Bo(ld[e.mode])}</span></h4>
      <textarea class="gr-words" rows="3" maxlength="300" placeholder="e.g. neon koi fish over deep purple waves, gold scales" aria-label="Describe the wrap">${Bo(e.words)}</textarea>
      <div class="gr-fins two">${Object.entries(ld)
        .map(
          ([u, d]) =>
            `<button type="button" data-k="mode" data-v="${u}" aria-pressed="${e.mode === u}">${d}<small>${u === "t" ? "tiled over the body" : "one design along each side"}</small></button>`,
        )
        .join("")}</div>
      <h4>Reference photos<span>${e.refs.length ? e.refs.length + " \xB7 their colours guide it" : "optional"}</span></h4>
      <label class="gr-drop"><input type="file" class="gr-file" accept="image/png,image/jpeg,image/webp" multiple hidden>
        ${l ? `<span class="gr-refs">${l}</span>` : '<span class="gr-drop-t">Drop photos here or click to choose</span>'}<small>mindblown's generator takes words: a photo's colours are added to them (the photo stays on your device)</small></label>
      ${f}${h}
      <div class="gr-genrow">
        <button type="button" class="gr-btn gr-gen" data-k="gen"${r || !i ? " disabled" : ""}><b>${r ? "Generating\u2026" : a || !i ? "Generate wrap" : "Sign in to generate"}</b><small>${this.costLine()}</small></button>
        <button type="button" class="gr-btn gr-gen2" data-k="var"${r || !i || !e.last ? " disabled" : ""}><b>Variation</b><small>same idea</small></button></div>
      <p class="sp-line">This session: ${Ti.session()} of ${Ti.cap()} AI generations \xB7 ${Bo(Ti.lifeLine())} on this game</p>
      <div class="gr-prog"${r ? "" : " hidden"}><div class="gr-bar"><i></i></div><span class="gr-eta"></span><button type="button" class="gr-link" data-k="cancel">Cancel</button></div>
      ${i ? "" : `<p class="gr-small">${Bo(yd.offline[1])}</p>`}
      <h4>Your wraps<span>${e.shots.length ? "tap one to try it on" : "none yet"}</span></h4>
      <div class="gr-shots">${c}${s.w && !e.shots.some((u) => u.url === s.w.u) ? `<button type="button" class="gr-shot on" data-k="noop" aria-pressed="true"><img src="${Bo(s.w.u)}" alt="Saved wrap"></button>` : ""}</div>
      ${
        s.w
          ? `<div class="gr-fins two"><button type="button" data-k="unwrap" data-v="1">Remove wrap</button><button type="button" data-k="wmode" data-v="${s.w.m === "t" ? "f" : "t"}">Lay as ${ld[s.w.m === "t" ? "f" : "t"]}</button></div>
        <h4>Finish<span>${Bo(Lf(s.f || "gloss").sub)}</span></h4><div class="gr-fins">${Vp.filter(
          (u) => !u.lvl && u.id !== "chrome",
        )
          .map(
            (u) =>
              `<button type="button" data-k="f" data-v="${u.id}" aria-pressed="${(s.f || "gloss") === u.id}">${u.name}</button>`,
          )
          .join("")}</div>`
          : ""
      }`),
        this.body
          .querySelector(".gr-ask, .gr-note")
          ?.scrollIntoView?.({ block: "nearest" }),
        this.syncGen());
    }
    syncGen() {
      let t = this.G,
        e = this.body.querySelector("[data-k=gen]");
      if (!e) return;
      e.disabled =
        !!t.busy || !a1() || (qf() && !t.words.trim() && !t.refs.length);
      let s = this.body.querySelector(".gr-prog");
      if (!s || ((s.hidden = !t.busy), !t.busy)) return;
      let n = (performance.now() - t.busy.t0) / 1e3,
        [i, a] = zE.image,
        r = Math.min(0.95, 1 - Math.exp(-n / ((i + a) / 2)));
      ((s.querySelector(".gr-bar i").style.width = (r * 100).toFixed(1) + "%"),
        (s.querySelector(".gr-eta").textContent =
          `${Math.floor(n)} s \xB7 usually ${i}-${a} s`));
    }
    async addRefs(t) {
      let e = this.G;
      for (let s of [...(t || [])].slice(0, Math.max(0, 4 - e.refs.length))) {
        if (!/^image\/(png|jpeg|webp)$/.test(s.type) || s.size > 2e7) {
          this.toast?.("Not a photo", "PNG, JPEG or WebP, up to 20 MB");
          continue;
        }
        try {
          let n = await XM(s),
            i = await createImageBitmap(s, {
              resizeWidth: 96,
              resizeHeight: 96,
              resizeQuality: "medium",
            }),
            a = document.createElement("canvas");
          ((a.width = a.height = 96),
            a.getContext("2d").drawImage(i, 0, 0),
            e.refs.push({ thumb: a.toDataURL("image/jpeg", 0.8), pal: n }));
        } catch (n) {
          console.warn("ref", n);
        }
      }
      this.render();
    }
    onGen(t, e) {
      let s = this.G;
      if (t === "mode") return ((s.mode = e), this.render(), !0);
      if (t === "refdel") return (s.refs.splice(+e, 1), this.render(), !0);
      if (t === "gen" || t === "var")
        return t === "gen" && !s.words.trim() && !s.refs.length
          ? !0
          : qf()
            ? ((s.ask = { kind: t }), (s.note = null), this.render(), !0)
            : (this.askSignIn(t), !0);
      if (t === "ask-yes") {
        if (!QM(this.body, 1))
          return (
            this.toast?.(
              "Over your limit",
              'Tick "Go over my limit" to make this one',
            ),
            !0
          );
        let n = s.ask?.kind || "gen";
        return ((s.ask = null), this.generate(n, !0), !0);
      }
      if (t === "ask-no") return ((s.ask = null), this.render(), !0);
      if (t === "cancel") return (s.busy?.ctl.abort(), !0);
      if (t === "shot") {
        let n = s.shots[+e];
        return (
          n &&
            this.set({ w: { u: n.url, m: n.mode, n: n.words.slice(0, 60) } }),
          !0
        );
      }
      if (t === "unwrap") {
        let { w: n, ...i } = this.draft || {};
        return (
          (this.draft = Object.values(i).some(Boolean) ? i : null),
          this.preview(),
          !0
        );
      }
      return t === "wmode"
        ? (this.draft?.w && this.set({ w: { ...this.draft.w, m: e } }), !0)
        : t === "noop";
    }
    askSignIn(t) {
      let e = this.G;
      ((e.note = {
        t: "Sign in to generate",
        m: "Sign in to mindblown - your design stays here, and asks before it generates once you are in.",
        bad: !0,
        signin: !0,
      }),
        this.render(),
        Do.signIn(),
        this.resumeOff?.(),
        (this.resumeOff = Do.after(() => {
          ((this.resumeOff = null),
            (e.note = null),
            (e.ask = { kind: t }),
            this.isOpen &&
              (this.mode === "edit" && (this.tab = "wrap"), this.render()));
        })));
    }
    async generate(t, e = !1) {
      if (!e) return;
      let s = this.G;
      if (s.busy) return;
      let n = t === "var" && s.last,
        i = n ? s.last.pal : [...new Set(s.refs.flatMap((p) => p.pal))],
        a = n
          ? s.last.words
          : s.words.trim() || "a bold abstract design in these colours",
        r = n ? s.last.mode : s.mode,
        l = _E(a, { mode: r, palette: i, variation: n ? ++s.vary : 0 });
      s.last = { words: a, mode: r, pal: i };
      let c = new AbortController(),
        h = (s.busy = { t0: performance.now(), ctl: c });
      ((s.note = null), this.render());
      let f = setInterval(() => this.isOpen && this.syncGen(), 250);
      Ti.record("image", 1);
      let u = await EE(l, {
        size: r === "t" ? "square" : "wide",
        signal: c.signal,
        confirmed: !0,
      });
      (clearInterval(f), s.busy === h && (s.busy = null));
      let d = (p, m = !1) => {
        let g = { url: p.url, sha: p.sha || null, words: a, mode: r, late: m };
        return (
          s.shots.unshift(g),
          (s.shots.length = Math.min(s.shots.length, 12)),
          g
        );
      };
      if (u.cancelled)
        ((s.note = {
          t: "Cancelled",
          m: "Stopped waiting. If mindblown had already started it, it is still paid - it shows up below when it arrives.",
        }),
          u.late.then((p) => {
            p?.url &&
              (d(p, !0), this.isOpen && this.tab === "wrap" && this.render());
          }));
      else if (u.refused) {
        let p = yd[u.refused] || yd.unavailable;
        s.note = { t: p[0], m: p[1], bad: !0 };
      } else if (u.url) {
        let p = d(u);
        (this.set({ w: { u: p.url, m: r, n: a.slice(0, 60) } }),
          this.toast?.("Wrap ready", "On the car now - Apply to keep it"));
      } else s.note = { t: yd.unavailable[0], m: yd.unavailable[1], bad: !0 };
      this.isOpen && this.render();
    }
    studio() {
      this.st ||
        (this.st = new CE(this.mb, {
          mobile: globalThis.SF_TIER === "mobile" || !!globalThis.SF_LITE,
          heroYaw: uB,
        }));
    }
    frame(t, e) {
      let s = this.orb,
        n = this.v,
        i = this.st;
      !s.drag &&
        !s.pinch &&
        ((s.idle += t),
        s.idle > 2.5 &&
          ((s.t += t * Math.min(1, (s.idle - 2.5) / 2)),
          (s.spin +=
            (0.45 * Math.sin(s.t * 0.16) - s.spin) * Math.min(1, t * 0.8))));
      let a = { x: n.pos.x, y: n.pos.y + this.up, z: n.pos.z };
      (Ec(e, {
        pos: { x: a.x, y: a.y + 0.004, z: a.z },
        psi: s.spin + this.psi0,
        pitch: 0,
        roll: 0,
        heave: 0,
        bodyPitch: 0,
        bodyRoll: 0,
        steer: 0.32,
        wheelSpin: [0, 0, 0, 0],
      }),
        e.root.updateMatrixWorld(!0));
      let r = this.mode === "home" && this.home ? this.home.showing() : "car";
      if (
        ((this.previewNote.hidden = !0),
        (this.previewRetry.hidden = !0),
        r === "car")
      ) {
        let l = this.mb.materialStatus(e.root, { priority: 1 });
        if (
          (i.mobile || this.mb.prewarm(e.root, { planar: !0 }),
          (this.materialPreparation = { car: e.id, ...l }),
          l.pending || l.failed)
        ) {
          ((this.materialWaitStart ||= performance.now()),
            (r = l.failed ? "failed" : "loading"),
            (this.previewNote.hidden = !1),
            (this.previewRetry.hidden = !l.failed));
          let c = l.failed
              ? "Car preview unavailable. You can still drive."
              : performance.now() - this.materialWaitStart > 15e3
                ? "Preview is still loading. You can still drive."
                : "Loading the car\u2026",
            h = this.previewNote.querySelector("span");
          h.textContent !== c && (h.textContent = c);
        } else this.materialWaitStart = 0;
      } else this.materialWaitStart = 0;
      (this.hid && this.hid !== e && (this.hid.root.visible = !0),
        (e.root.visible = r === "car"),
        (this.hid = r === "car" ? null : e),
        i.show(r),
        i.place(a, s.spin, e));
    }
    view(t, e) {
      let s = this.orb,
        n = this.v,
        i = this.car(),
        a = innerWidth,
        r = innerHeight,
        l = a / r < 1.2,
        c = !l && a > 760,
        h = this.mode,
        f = l ? 52 : 40;
      (e.fov !== f && ((e.fov = f), e.updateProjectionMatrix()),
        (s.pitch = Math.max(0.02, Math.min(0.85, s.pitch))));
      let u = Cv(i),
        d = u.max.y * 0.42,
        p =
          h === "home" && !l
            ? { ...this.homeStage(a, r), ...(this.stage || {}) }
            : null,
        [m, g] = p
          ? [p.sx, p.sy]
          : h === "home"
            ? [0.95, 0.3]
            : h === "create"
              ? l
                ? [0.84, 0.3]
                : [0.645, 0.45]
              : l
                ? [1.25, 0.32]
                : [0.645, 0.45],
        b = xst(i, {
          yaw: s.yaw,
          pitch: s4,
          fov: f,
          aspect: a / r,
          sx: m,
          sy: g,
          ly: d,
        }),
        v = b.d;
      (s.dist ||
        ((s.dist = v),
        (s.zoomed = !1),
        this.auto && ((this.auto.k = 1), (this.auto.x = 0), (this.auto.y = 0))),
        (s.dist = Math.max(
          Math.max(v * 0.6, b.near),
          Math.min(v * 1.8, s.dist),
        )));
      let x = (this.auto ||= { k: 1, x: 0, y: 0 });
      p || ((x.k = 1), (x.x = 0), (x.y = 0));
      let y = { x: n.pos.x, y: n.pos.y + this.up + d, z: n.pos.z },
        M = p ? s.pitch - s4 : s.pitch,
        S = Math.max(b.near, s.dist * x.k),
        w = Math.sin(s.yaw) * Math.cos(M) * S,
        _ = Math.cos(s.yaw) * Math.cos(M) * S,
        z = Math.sin(M) * S + (p ? 0 : 0.25),
        A = Math.cos(s.yaw),
        T = -Math.sin(s.yaw),
        E = Math.tan(Qc.degToRad(f) / 2),
        R = (E * a) / r,
        P = p
          ? -(p.cx + x.x) * S * R
          : h === "home"
            ? 0
            : h === "create"
              ? c
                ? S * 0.2
                : 0
              : c
                ? -S * 0.21
                : 0,
        C = p
          ? (p.cy + x.y) * E * S
          : h === "home"
            ? S * 0.1
            : h === "create" && !c
              ? S * 0.17
              : c
                ? 0
                : S * (r > a ? 0.3 : 0.12);
      e.position.set(
        y.x + w + A * P,
        Math.max(n.pos.y + this.up + 0.35, y.y + z - C),
        y.z + _ + T * P,
      );
      let I =
          h === "edit" && !s.drag && !s.pinch
            ? this.ext[this.tab]?.focus?.()
            : null,
        L = (this.fk =
          (this.fk || 0) +
          ((I ? 1 : 0) - (this.fk || 0)) * Math.min(1, t * 3.2));
      if (
        (I &&
          ((this.fpos = I.pos.clone()),
          (this.flook = I.look.clone()),
          (s.idle = 0)),
        L > 0.002 && this.fpos)
      ) {
        let F = L * L * (3 - 2 * L),
          O = { x: y.x + A * P, y: y.y - C, z: y.z + T * P };
        (e.position.lerp(this.fpos, F),
          e.lookAt(
            O.x + (this.flook.x - O.x) * F,
            O.y + (this.flook.y - O.y) * F,
            O.z + (this.flook.z - O.z) * F,
          ));
      } else e.lookAt(y.x + A * P, y.y - C, y.z + T * P);
      (p && p.base !== void 0 && L < 0.002 && this.holdStage(e, i, p, x, s, t),
        this.st.hideNear(e, { x: n.pos.x, z: n.pos.z }, i));
    }
    homeStage(t, e) {
      let s = performance.now();
      if (
        this._hs &&
        s - this._hs.t < 500 &&
        this._hs.W === t &&
        this._hs.H === e
      )
        return this._hs.v;
      let n = 0.8 * e,
        i =
          this.home?.el?.querySelector?.(".gh-cards") ||
          this.home?.el?.querySelector?.(".gh-rail");
      if (i) {
        let f = i.getBoundingClientRect();
        f.height > 0 && f.top > e * 0.4 && (n = Math.min(n, f.top - e * 0.025));
      }
      let a = Math.max(0.1, (n - 0.13 * e) / (0.3 * e)),
        r = Math.min(0.9, a),
        l = 0.27 * e * r,
        c = {
          cx: 0,
          cy: 1 - (2 * (n - l / 2)) / e,
          sx: r,
          sy: 0.6 * r,
          base: n / e,
          w: Math.min(0.64, 0.64 * a),
        },
        h = this.el.classList.contains("panel")
          ? this.el.querySelector(".gr-side")?.getBoundingClientRect()
          : null;
      if (h && h.width > 0 && h.left > t * 0.4) {
        let f = h.left / t,
          u = this.home?.el
            ?.querySelector?.(".gh-rtop")
            ?.getBoundingClientRect();
        (u &&
          u.height > 0 &&
          u.top > e * 0.4 &&
          (c.base = Math.min(c.base, u.top / e - 0.02)),
          (c.cx = -(1 - f)),
          (c.sx = Math.min(c.sx, f * 0.92)),
          (c.sy = 0.6 * c.sx),
          (c.w = Math.min(c.w, f * 0.66)));
      }
      return ((this._hs = { t: s, W: t, H: e, v: c }), c);
    }
    holdStage(t, e, s, n, i, a) {
      t.updateMatrixWorld();
      let r = Cv(e),
        l = e.root.matrixWorld,
        c = (this._hv ||= new dt()),
        h = 1e9,
        f = -1e9,
        u = 1e9;
      for (let y of [r.min.x, r.max.x])
        for (let M of [r.min.y, r.max.y])
          for (let S of [r.min.z, r.max.z]) {
            if ((c.set(y, M, S).applyMatrix4(l).project(t), c.z > 1)) return;
            ((h = Math.min(h, c.x)), (f = Math.max(f, c.x)));
          }
      let d = (r.min.x + r.max.x) / 2,
        p = (r.max.x - r.min.x) * 0.4,
        m = (r.min.z + r.max.z) / 2,
        g = (r.max.z - r.min.z) * 0.33;
      for (let [y, M] of [
        [d - p, m - g],
        [d + p, m - g],
        [d - p, m + g],
        [d + p, m + g],
      ])
        (c.set(y, r.min.y, M).applyMatrix4(l).project(t),
          (u = Math.min(u, c.y)));
      let b = Math.min(1, a * 5),
        v = 1 - 2 * s.base,
        x = (f - h) / 2;
      ((n.x = Math.max(-1, Math.min(1, n.x + (s.cx - (h + f) / 2) * b))),
        (n.y = Math.max(-1, Math.min(1, n.y + (v - u) * b * 0.8))),
        !i.zoomed &&
          s.w &&
          (n.k = Math.max(
            0.4,
            Math.min(2.5, n.k * Math.exp(((x - s.w) / s.w) * b * 0.8)),
          )));
    }
    stageInput(t) {
      let e = this.orb,
        s = new Map();
      (t.addEventListener("pointerdown", (i) => {
        if (
          (s.set(i.pointerId, { x: i.clientX, y: i.clientY }),
          t.setPointerCapture?.(i.pointerId),
          (e.idle = 0),
          s.size === 2)
        ) {
          let [a, r] = [...s.values()];
          ((e.pinch = { d: Math.hypot(a.x - r.x, a.y - r.y), dist: e.dist }),
            (e.zoomed = !0),
            (e.drag = null));
        } else
          e.drag = { x: i.clientX, y: i.clientY, yaw: e.yaw, pitch: e.pitch };
      }),
        t.addEventListener("pointermove", (i) => {
          if (s.has(i.pointerId)) {
            if (
              (s.set(i.pointerId, { x: i.clientX, y: i.clientY }),
              (e.idle = 0),
              e.pinch && s.size >= 2)
            ) {
              let [a, r] = [...s.values()];
              e.dist =
                (e.pinch.dist * e.pinch.d) /
                Math.max(20, Math.hypot(a.x - r.x, a.y - r.y));
              return;
            }
            e.drag &&
              ((e.yaw =
                e.drag.yaw -
                ((i.clientX - e.drag.x) / Math.max(320, innerWidth)) * 4.2),
              (e.pitch =
                e.drag.pitch +
                ((i.clientY - e.drag.y) / Math.max(320, innerHeight)) * 1.6));
          }
        }));
      let n = (i) => {
        let a = e.drag;
        (s.delete(i.pointerId),
          s.size < 2 && (e.pinch = null),
          s.size || (e.drag = null),
          a &&
            i.type === "pointerup" &&
            Math.hypot(i.clientX - a.x, i.clientY - a.y) < 6 &&
            this.mode === "home" &&
            this.home &&
            !this.home.customizing &&
            this.home.toggleCustom(!0));
      };
      (t.addEventListener("pointerup", n),
        t.addEventListener("pointercancel", n),
        t.addEventListener(
          "wheel",
          (i) => {
            ((e.dist *= Math.exp(i.deltaY * 0.0012)),
              (e.zoomed = !0),
              (e.idle = 0),
              i.preventDefault());
          },
          { passive: !1 },
        ),
        t.addEventListener("dblclick", () => {
          ((e.dist = 0), (e.pitch = s4), (e.idle = 3));
        }));
    }
  };
