// app 329 — kind
// Lines 159982-160642 of readable/app.pretty.js (statement-aligned).
var Sp = (i) =>
    String(i ?? "").replace(
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
  A3t = (i) => "$" + Math.round(i).toLocaleString("en-US"),
  R3t = [
    ["mine", "My cars"],
    ["mb", "mindblown"],
    ["community", "Community"],
  ],
  mQ = 6,
  dF = (i) =>
    `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`,
  gQ = {
    pen: dF('<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14 6l4 4"/>'),
    trash: dF('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
    x: dF('<path d="M6 6l12 12M18 6L6 18"/>'),
  },
  Qw = (i) =>
    i?.dir
      ? `background-image:url(${i.dir}turntable.webp);background-size:800% 600%;background-position:${((mQ % 8) / 7) * 100}% ${(Math.floor(mQ / 8) / 5) * 100}%`
      : "",
  dz = class {
    constructor(t, e) {
      ((this.g = t),
        (this.H = e),
        (this.sec = "mine"),
        (this.sel = null),
        (this.busy = !1),
        (this.shared = null),
        (this.note = null),
        (t.home = this));
      let s = (this.el = document.createElement("div"));
      ((s.id = "ghome"),
        (s.innerHTML = `<header class="gh-top"><div class="gh-title"><small>Teleoperator</small><h1>Garage</h1><span class="gh-count"></span></div>
        <div class="gh-meta"><span class="gh-wallet"></span><span class="gh-acct" data-acchip></span><span class="gh-tok"></span><span class="gh-spend"></span></div><button type="button" class="gh-x" data-act="back" aria-label="Close (Esc)" title="Close (Esc)">${gQ.x}</button></header>
      <section class="gh-hero" aria-live="polite"><div class="gh-tags"></div><h2 class="gh-name"></h2><p class="gh-sub"></p><div class="gh-stats"></div></section>
      <div class="gh-dock"><button type="button" class="gh-btn gh-ico" data-act="forget" aria-label="Forget this car" title="Forget this car" hidden>${gQ.trash}</button><button type="button" class="gh-btn gh-cust" data-act="custom" title="Customize (C)">Customize</button><button type="button" class="gh-btn gh-go" data-act="drive" title="Drive (Enter)">Drive</button></div>
      <footer class="gh-rail"><div class="gh-rtop"><nav class="gh-secs" role="tablist">${R3t.map(([n, o]) => `<button type="button" role="tab" data-sec="${n}">${o}</button>`).join("")}</nav></div>
        <div class="gh-cards" role="listbox" aria-label="Cars"></div></footer>
      <div class="gh-busy" hidden><i></i>Loading the car\u2026</div>`),
        t.el.appendChild(s),
        s.querySelector(".gh-rtop").appendChild(s.querySelector(".gh-hero")),
        s.querySelector(".gh-rtop").appendChild(s.querySelector(".gh-dock")),
        (this.sec = "all"),
        (this.customizing = !1),
        (this.cardsEl = s.querySelector(".gh-cards")),
        s.querySelector(".gh-secs").addEventListener("click", (n) => {
          let o = n.target.closest("[data-sec]");
          o &&
            ((this.sec = o.dataset.sec),
            this.render(),
            this.sec === "community" && this.loadShared());
        }),
        this.cardsEl.addEventListener("click", (n) => {
          let o = n.target.closest("[data-card]");
          if (o) {
            if (n.target.closest("[data-del]")) {
              this.remove(o.dataset.card);
              return;
            }
            this.pick(o.dataset.card);
          }
        }),
        this.cardsEl.addEventListener("dblclick", (n) => {
          let o = n.target.closest("[data-card]");
          o &&
            this.cards().find((a) => a.key === o.dataset.card)?.drivable &&
            this.drive();
        }),
        s.addEventListener("click", (n) => {
          let o = n.target.closest(".gh-dock [data-act], .gh-x");
          !o ||
            o.disabled ||
            {
              back: () => this.g.back(),
              forget: () => this.customize(),
              custom: () => this.toggleCustom(),
              drive: () => this.drive(),
            }[o.dataset.act]?.();
        }),
        s
          .querySelector(".gh-name")
          .addEventListener("click", () => this.rename()));
    }
    cards() {
      if (this.sec === "community")
        return [
          {
            key: "all",
            kind: "back",
            name: "My cars",
            sub: "Back to your collection",
            create: !0,
          },
          ...this.cardsOf("community"),
        ];
      let t = [
          ...this.cardsOf("mine").filter((c) => c.kind !== "create"),
          ...this.cardsOf("mb").filter((c) => c.kind !== "pick"),
        ],
        e = new Set(),
        s = t.filter((c) => (e.has(c.key) ? !1 : e.add(c.key))),
        n = this.H.recent?.() || [],
        o = (c) => {
          let h = n.indexOf(c.key);
          return h < 0 ? 1e3 : h;
        },
        a = this.H.current(),
        r = a.mine
          ? "m:" + a.mine
          : a.id === "custom"
            ? "r:" + a.sha
            : "f:" + a.id,
        l = new Map(s.map((c, h) => [c.key, h]));
      return (
        s.sort(
          (c, h) =>
            (c.key === r ? -1 : h.key === r ? 1 : 0) ||
            o(c) - o(h) ||
            l.get(c.key) - l.get(h.key),
        ),
        s.push({
          key: "create",
          kind: "create",
          name: "New car",
          sub: "Make one with AI, or build on one",
          create: !0,
        }),
        s
      );
    }
    cardsOf(t) {
      let e = this.H,
        s = e.current(),
        n = [];
      if (t === "mine") {
        n.push({
          key: "create",
          kind: "create",
          name: "Create new car",
          sub: "Make one with AI, or build on one of yours",
          create: !0,
        });
        for (let o of Nn.open()) {
          let a = o.status === "ready";
          n.push({
            key: "b:" + o.id,
            kind: "build",
            b: o,
            name: (a ? "Ready: " : "Building: ") + o.name,
            sub: a
              ? "Ready - drive it"
              : Kw(o.t0) +
                " \xB7 " +
                (o.status === "closed"
                  ? "maker closed, still watching"
                  : "Creating with mindblown\u2026"),
            thumb: o.item?.icon || o.thumb,
            building: !a,
            drivable: a,
            tags: [a ? ["Ready", "on"] : ["Building", "new"]],
          });
        }
        for (let o of e.mine()) {
          let a = o.base === "custom" ? null : cs[o.base];
          n.push({
            key: "m:" + o.id,
            kind: "mine",
            c: o,
            name: o.name,
            sub:
              "Your build \xB7 on the " + (a ? a.name : o.ride?.name || "car"),
            F: a,
            thumb: e.thumb(o.id),
            drivable: !0,
            edit: !0,
            tags: [
              s.mine === o.id ? ["Driving", "on"] : null,
              o.driven ? null : ["New", "new"],
              ["Yours", "mine"],
            ].filter(Boolean),
          });
        }
        for (let o of Bm) {
          let a = cs[o];
          !a ||
            o === "custom" ||
            n.push({
              key: "f:" + o,
              kind: "fleet",
              id: o,
              name: a.name,
              sub: a.model + " \xB7 " + a.maker,
              F: a,
              drivable: !0,
              edit: !0,
              tags: [
                s.id === o && !s.mine ? ["Driving", "on"] : null,
                ["Owned", "own"],
              ].filter(Boolean),
            });
        }
      } else if (t === "mb") {
        n.push({
          key: "pick",
          kind: "pick",
          name: "Your mindblown cars",
          sub: nh()
            ? cf()
              ? "Open mindblown's picker \xB7 @" + rQ()
              : "Sign in to mindblown for your own"
            : "On the published game only",
          create: !0,
          icon: "mb",
        });
        let o = this.latest,
          a = o?.files?.glb?.sha256;
        o &&
          a !== cs.custom?.ride?.sha &&
          n.push({
            key: "n:" + (a || o.id),
            kind: "ride",
            item: o,
            name: o.name || "New car",
            sub: "Just made on mindblown",
            thumb: o.files?.icon?.url,
            drivable: !0,
            tags: [
              ["New", "new"],
              ["Mine", "mine"],
            ],
          });
        let r = cs.custom?.ride;
        r &&
          n.push({
            key: "r:" + r.sha,
            kind: "ride",
            ride: r,
            name: r.name,
            sub: r.own ? "Your mindblown car" : "From mindblown",
            thumb: r.icon,
            drivable: !0,
            edit: !0,
            tags: [
              s.id === "custom" && s.sha === r.sha ? ["Driving", "on"] : null,
              r.own ? ["Mine", "mine"] : ["Saved", "own"],
            ].filter(Boolean),
          });
      } else {
        this.shared ||
          n.push({
            key: "wait",
            kind: "note",
            name: nh() ? "Loading\u2026" : "Community cars",
            sub: nh() ? "" : "On the published game only",
          });
        for (let o of this.shared || [])
          n.push({
            key: "c:" + o.id,
            kind: "ride",
            item: o,
            name: o.name || "Car",
            sub: "Shared on mindblown",
            thumb: o.files?.icon?.url,
            drivable: !0,
            edit: !0,
            tags: [["Community", "com"]],
          });
      }
      return n;
    }
    async loadShared() {
      this.shared ||
        this.loading ||
        ((this.loading = !0),
        (this.shared = (await uz()).filter(
          (t) => t?.kind === "vehicle" && t.vehicle,
        )),
        (this.loading = !1),
        this.g.isOpen && this.g.mode === "home" && this.render());
    }
    enter(t) {
      t !== "edit" &&
        t !== "create" &&
        ((this.was = this.H.current()),
        (this.sel = null),
        (this.committed = !1));
      let e = this.H.current();
      if (!this.sel) {
        let n = e.mine ? this.H.mine().find((o) => o.id === e.mine) : null;
        this.sel = n
          ? "m:" + n.id
          : e.id === "custom"
            ? "r:" + e.sha
            : "f:" + e.id;
      }
      ((this.sec = "all"),
        t !== "edit" && t !== "create" && (this.customizing = !1));
      let s = this.selected();
      ((this.failed = null),
        s?.drivable && !this.isCurrent(s) && !this.busy && this.load(s));
    }
    offer(t) {
      !t?.vehicle ||
        !t.files?.glb ||
        ((this.latest = t),
        this.g.isOpen &&
          this.g.mode === "home" &&
          this.load({
            key: "n:" + (t.files.glb.sha256 || t.id),
            kind: "ride",
            item: t,
          }));
    }
    leave() {
      (!this.committed && this.was && this.H.revert(this.was),
        (this.was = null));
    }
    commitDone() {
      this.committed = !0;
    }
    async pick(t) {
      let e = this.cards().find((s) => s.key === t);
      if (e) {
        if (this.busy) {
          e.drivable && ((this.queued = t), (this.sel = t), this.render());
          return;
        }
        if (e.kind === "create") {
          ((this.sel = t), this.g.setMode("create"));
          return;
        }
        if (e.kind === "back") {
          this.browse("all");
          return;
        }
        if (e.kind === "build") {
          if (e.b.status === "ready" && e.b.ride)
            return this.load({ ...e, kind: "ride", ride: e.b.ride, key: t });
          ((this.sel = t), this.render());
          return;
        }
        if (e.kind !== "note") {
          if (e.kind === "pick") {
            let s = await Hx();
            return s
              ? this.load({
                  key: "r:" + s.files?.glb?.sha256,
                  kind: "ride",
                  item: s,
                })
              : void 0;
          }
          return this.load(e);
        }
      }
    }
    async load(t, e = !1) {
      ((this.sel = t.key),
        (this.busy = !0),
        (this.note = null),
        (this.queued = null),
        this.render());
      let s = await (
        e && this.H.retry ? this.H.retry(t) : this.H.preview(t)
      ).catch((o) => (console.warn("garage", o), !1));
      ((this.busy = !1),
        (this.failed = s ? null : t.key),
        (!s || this.showing() === "failed") &&
          (this.note = "That car would not load. Retry, or choose another."));
      let n = this.queued && this.cards().find((o) => o.key === this.queued);
      if (((this.queued = null), n && n.key !== t.key)) return this.load(n);
      if (
        t.kind === "ride" &&
        s &&
        !this.sel.startsWith("c:") &&
        !this.sel.startsWith("b:")
      ) {
        let o = cs.custom?.ride;
        o && (this.sel = "r:" + o.sha);
      }
      this.g.isOpen && (this.g.carChanged?.(), this.g.render());
    }
    restore() {
      let t = this.selected();
      t && t.drivable
        ? this.load(t)
        : this.was && this.H.revert(this.was, !0).then?.(() => this.render());
    }
    selected() {
      return this.cards().find((t) => t.key === this.sel) || null;
    }
    browse(t) {
      ((this.sec = t === "community" ? "community" : "all"),
        this.sec === "community" && this.loadShared(),
        this.render());
    }
    toggleCustom(t = !this.customizing) {
      if (t && !this.editable()) {
        let e = this.selected();
        e?.kind === "create" && this.pick(e.key);
        return;
      }
      ((this.customizing = t), (this.g.orb.dist = 0), this.g.render());
    }
    editable() {
      let t = this.selected();
      return (
        !!t &&
        !!t.edit &&
        !this.busy &&
        this.isCurrent(t) &&
        this.showing() === "car"
      );
    }
    isCurrent(t) {
      let e = this.H.current();
      if (!t) return !1;
      if (t.kind === "fleet") return e.id === t.id;
      if (t.kind === "mine")
        return (
          t.c.base === e.id &&
          (t.c.base !== "custom" || t.c.ride?.sha === e.sha)
        );
      if (t.kind === "ride") {
        let s = t.ride?.sha || t.item?.files?.glb?.sha256 || lf(t.item)?.sha;
        return e.id === "custom" && !!s && e.sha === s;
      }
      return !0;
    }
    showing() {
      let t = this.selected();
      return !t || !t.drivable
        ? "car"
        : this.busy || this.queued
          ? "loading"
          : this.failed === t.key ||
              (this.isCurrent(t) && this.H.car?.()?.placeholder)
            ? "failed"
            : this.isCurrent(t)
              ? "car"
              : "loading";
    }
    customize() {
      let t = this.selected();
      if (t?.kind === "build") {
        confirm(
          "Forget this car? If mindblown is still making it, it still arrives in your mindblown cars.",
        ) && (Nn.remove(t.b.id), (this.sel = null), this.render());
        return;
      }
      !t?.edit ||
        this.busy ||
        this.showing() !== "car" ||
        ((this.editing = t.kind === "mine" ? t.c.id : null),
        t.kind === "mine" && (this.H.drive(t), (this.committed = !0)),
        this.g.setMode("edit"));
    }
    edited() {
      this.editing && this.H.editedMine?.(this.editing);
    }
    drive() {
      let t = this.selected();
      if (t?.kind === "build" && t.b.status !== "ready") {
        Hx().then((s) => {
          s && this.H.offerCar?.(s);
        });
        return;
      }
      if (t?.kind === "build") {
        (Nn.update(t.b.id, { status: "driven" }),
          this.H.drive({ kind: "ride", ride: t.b.ride }),
          (this.committed = !0),
          this.g.leaveToDrive());
        return;
      }
      let e = this.selected();
      if (!(!e?.drivable || this.busy)) {
        if (this.showing() !== "car") {
          this.load(e, !0);
          return;
        }
        (this.H.drive(e), (this.committed = !0), this.g.leaveToDrive());
      }
    }
    rename() {
      let t = this.selected(),
        e = this.el.querySelector(".gh-name");
      if (t?.kind !== "mine" || !this.H.renameMine || e.querySelector("input"))
        return;
      let s = document.createElement("input");
      ((s.className = "gh-name-in"),
        (s.maxLength = 28),
        (s.value = t.name),
        s.setAttribute("aria-label", "Name"),
        (s.spellcheck = !1),
        (e.textContent = ""),
        e.appendChild(s),
        s.focus(),
        s.select());
      let n = !1,
        o = (a) => {
          if (n) return;
          n = !0;
          let r = s.value.trim();
          (a && r && r !== t.name && this.H.renameMine(t.c.id, r),
            this.render());
        };
      (s.addEventListener("sf-enter", () => o(!0)),
        s.addEventListener("sf-esc", () => o(!1)),
        s.addEventListener("blur", () => o(!0)));
    }
    remove(t) {
      let e = this.cards().find((s) => s.key === t);
      e?.kind === "mine" &&
        confirm(`Delete \u201C${e.name}\u201D from your garage?`) &&
        (this.H.removeMine(e.c.id),
        this.sel === t && (this.sel = null),
        this.render());
    }
    key(t) {
      if (t.code === "ArrowLeft" || t.code === "ArrowRight") {
        let e = this.cards(),
          s = e.findIndex((o) => o.key === this.sel),
          n = Math.max(
            0,
            Math.min(e.length - 1, s + (t.code === "ArrowLeft" ? -1 : 1)),
          );
        return (
          e[n] && e[n].kind !== "create" && e[n].kind !== "pick"
            ? this.pick(e[n].key)
            : e[n] && ((this.sel = e[n].key), this.render()),
          !0
        );
      }
      if (t.code === "Enter") {
        let e = this.selected();
        return (
          e?.kind === "create" || e?.kind === "pick"
            ? this.pick(e.key)
            : this.drive(),
          !0
        );
      }
      return t.code === "KeyC"
        ? (this.toggleCustom(), !0)
        : (t.code === "Escape" || t.code === "Backspace") && this.customizing
          ? (this.toggleCustom(!1), !0)
          : !1;
    }
    render() {
      let t = this.el,
        e = this.H,
        s = this.cards(),
        n = this.selected() || s.find((h) => h.drivable) || null;
      t.querySelector(".gh-count").textContent =
        `${e.mine().length + Bm.filter((h) => h !== "custom").length} cars in your collection`;
      let o = e.wallet();
      ((t.querySelector(".gh-wallet").innerHTML =
        o === null ? "" : `<b>${A3t(o)}</b> cash`),
        (t.querySelector(".gh-tok").innerHTML = Ox()),
        (t.querySelector(".gh-spend").textContent =
          "AI on this game: " +
          pi.lifeLine() +
          " \xB7 this session " +
          pi.session() +
          " of " +
          pi.cap()));
      for (let h of t.querySelectorAll("[data-sec]"))
        h.setAttribute("aria-selected", String(h.dataset.sec === this.sec));
      ((this.cardsEl.innerHTML = s
        .map((h) => this.card(h, h.key === this.sel))
        .join("")),
        this.cardsEl
          .querySelector(".on")
          ?.scrollIntoView?.({ block: "nearest", inline: "nearest" }));
      let a = t.querySelector(".gh-hero");
      if (n && n.kind !== "note") {
        let h =
            n.kind === "fleet" ? n.id : n.kind === "mine" ? n.c.base : "custom",
          f =
            n.kind === "create" || n.kind === "pick" || n.kind === "build"
              ? null
              : e.stats(h, n.kind === "mine" ? n.c.tune : void 0, n);
        t.querySelector(".gh-tags").innerHTML =
          (f
            ? `<span class="gh-cls" style="--k:${f.col}"><b>${Sp(f.cls)}</b>${f.pi}</span>`
            : "") +
          (n.tags || [])
            .map(([d, p]) => `<span class="gh-tag ${p}">${Sp(d)}</span>`)
            .join("");
        let u = t.querySelector(".gh-name");
        ((u.textContent = n.name),
          u.classList.toggle("ren", n.kind === "mine" && !!this.H.renameMine),
          u.classList.toggle("long", n.name.length > 16),
          (u.title = n.kind === "mine" ? "Click to rename" : ""),
          (t.querySelector(".gh-sub").textContent = this.note || n.sub || ""),
          (t.querySelector(".gh-stats").innerHTML = f
            ? `<span><b>${f.t100.toFixed(1)} s</b>0-100 km/h</span><span><b>${Math.round(f.top)}</b>km/h top</span><span><b>${f.g.toFixed(2)} g</b>grip</span>`
            : n.kind === "build"
              ? `<span><b>${Sp(Kw(n.b.t0))}</b>${n.b.status === "ready" ? "to make" : "so far \xB7 usually a few minutes"}</span><span><b>${n.b.spent.cars} car${n.b.spent.pictures ? " \xB7 " + n.b.spent.pictures + " pics" : ""}</b>spent on it${pi.tokens() ? "" : " \xB7 cost unknown"}</span>`
              : ""),
          (a.hidden = !1));
      } else a.hidden = !0;
      let r = t.querySelector("[data-act=forget]"),
        l = t.querySelector("[data-act=drive]");
      ((r.hidden = n?.kind !== "build"), (r.disabled = this.busy));
      let c = t.querySelector("[data-act=custom]");
      ((c.hidden = !n?.edit || this.customizing),
        (c.disabled = !this.editable()),
        (c.textContent = "Customize"),
        (l.disabled = !(n?.drivable || n?.kind === "build") || this.busy),
        (l.textContent =
          n?.kind === "create"
            ? "Create"
            : n?.kind === "build" && n.b.status !== "ready"
              ? "Open maker"
              : "Drive"),
        n?.kind === "create" || n?.kind === "pick"
          ? ((l.disabled = !1),
            (l.dataset.act = "drive"),
            (l.onclick = (h) => {
              (h.stopPropagation(), this.pick(n.key));
            }))
          : (l.onclick = null),
        (t.querySelector(".gh-busy").hidden = !this.busy),
        n?.drivable &&
          !this.busy &&
          this.showing() !== "car" &&
          ((l.disabled = !1), (l.textContent = "Retry"), (r.disabled = !0)));
    }
    card(t, e) {
      let s = t.create
          ? `<span class="gh-plus${t.icon ? " mb" : ""}" aria-hidden="true">${t.icon ? "" : "+"}</span>`
          : t.thumb
            ? `<img src="${Sp(t.thumb)}" alt="" loading="lazy">`
            : t.F
              ? `<span class="gh-spr" style="${Qw(t.F)}"></span>`
              : '<span class="gh-spr"></span>',
        n =
          (t.tags || [])
            .filter((o) => o[1] !== "on")
            .slice(0, 2)
            .map(([o, a]) => `<i class="gh-tag ${a}">${Sp(o)}</i>`)
            .join("") +
          ((t.tags || []).some((o) => o[1] === "on")
            ? '<i class="gh-tag on">Driving</i>'
            : "");
      return `<button type="button" class="gh-card${e ? " on" : ""}${t.create ? " create" : ""}${t.kind === "note" ? " note" : ""}${t.kind === "build" ? " build" : ""}" data-card="${Sp(t.key)}" role="option" aria-selected="${e}">
      <span class="gh-img">${t.kind === "build" && !t.thumb ? '<span class="gh-plus mb"></span>' : s}${t.building ? '<span class="gh-bbar"><i></i></span>' : ""}</span><span class="gh-tg">${n}</span><b>${Sp(t.name)}</b><small>${Sp(t.sub || "")}</small>${t.kind === "mine" ? '<span class="gh-del" data-del="1" title="Delete" aria-label="Delete">\xD7</span>' : ""}</button>`;
    }
  };
