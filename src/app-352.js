// app 352 — base
// Lines 169556-170462 of readable/app.pretty.js (statement-aligned).
var yo = (o) =>
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
  $f = (o) => "$" + Math.round(o).toLocaleString("en-US"),
  I2 = [
    ["base", "Base"],
    ["livery", "Look"],
    ["parts", "Parts"],
    ["save", "Name"],
  ],
  mB = ["wheels", "stance", "aero"],
  Bst = ["Factory", "Lowered", "Coilovers", "Race"],
  Nst = ["None", "Lip spoiler", "Sport wing", "Race wing"],
  F4t = {
    back: "M15 5l-7 7 7 7",
    undo: "M9 8H5V4M5.5 8.5A8 8 0 1 1 4 13",
    redo: "M15 8h4V4M18.5 8.5A8 8 0 1 0 20 13",
    next: "M9 5l7 7-7 7",
    spark:
      "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
    check: "M5 12.5l4.5 4.5L19 7.5",
  },
  Lh = (o) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${F4t[o]}"/></svg>`,
  Hst = (o) =>
    Math.floor(o / 60) + ":" + String(Math.floor(o % 60)).padStart(2, "0"),
  UE = class {
    constructor(t, e) {
      ((this.g = t),
        (this.H = e),
        (t.creator = this),
        (this.step = "base"),
        (this.hist = []),
        (this.fut = []),
        (this.d = null),
        (this.more = !1),
        (this.made = 0),
        (this.gen = {
          words: "",
          mode: "f",
          shots: [],
          busy: null,
          ask: !1,
          note: null,
          refs: [],
          n: 1,
        }),
        (this.dream = { words: "", pal: [], thumb: null }));
      let s = (this.el = document.createElement("div"));
      ((s.id = "gcreate"),
        (s.innerHTML = `<header class="gc-top"><button type="button" class="gc-ic" data-c="back" aria-label="Back to the garage">${Lh("back")}</button>
        <div class="gc-title"><small>Create a car</small><input class="gc-name" maxlength="28" aria-label="Your car's name" spellcheck="false"></div>
        <div class="gc-right"><div class="gc-hist"><button type="button" class="gc-ic" data-c="undo" aria-label="Undo" title="Undo (Ctrl+Z)">${Lh("undo")}</button><button type="button" class="gc-ic" data-c="redo" aria-label="Redo" title="Redo (Ctrl+Y)">${Lh("redo")}</button></div>
          <span class="gc-tok"></span><span class="gc-acct" data-acchip></span></div></header>
      <aside class="gc-panel" aria-label="Build steps"><nav class="gc-steps" role="tablist"></nav><div class="gc-secs"></div><div class="gc-nav"></div></aside>
      <footer class="gc-foot"><div class="gc-bill"></div><button type="button" class="gh-btn" data-c="save">Save</button><button type="button" class="gh-btn gh-go" data-c="drive">Drive it</button></footer>
      <div class="gh-busy" hidden><i></i>Loading the car\u2026</div>`),
        t.el.appendChild(s),
        s.querySelector(".gc-panel").appendChild(s.querySelector(".gc-foot")),
        (this.secs = s.querySelector(".gc-secs")),
        s.addEventListener("click", (n) => this.click(n)),
        s.addEventListener("input", (n) => {
          if (n.target.matches(".gc-name, .gc-name2")) {
            ((this.d.name = n.target.value.slice(0, 28)), (this.dirty = !0));
            for (let i of s.querySelectorAll(".gc-name, .gc-name2"))
              i !== n.target && (i.value = this.d.name);
          } else
            n.target.matches(".gc-words")
              ? ((this.gen.words = n.target.value), this.syncGen())
              : n.target.matches(".gc-dream")
                ? (this.dream.words = n.target.value)
                : n.target.matches("[data-sl=rh]") &&
                  this.change((i) => {
                    (i.tune.t ||= {}).rh = +n.target.value;
                  }, !0);
        }),
        s.addEventListener("change", (n) => {
          n.target.matches(".gc-file") &&
            (this.photos(n.target.files), (n.target.value = ""));
        }),
        s.addEventListener("dragover", (n) => {
          let i = n.target.closest?.(".gc-drop");
          i && (n.preventDefault(), i.classList.add("over"));
        }),
        s.addEventListener("dragleave", (n) =>
          n.target.closest?.(".gc-drop")?.classList.remove("over"),
        ),
        s.addEventListener("drop", (n) => {
          let i = n.target.closest?.(".gc-drop");
          i &&
            (n.preventDefault(),
            i.classList.remove("over"),
            this.photos(n.dataTransfer?.files));
        }));
    }
    enter() {
      let t = this.H.current(),
        e =
          t.id !== "waymo" && t.id !== "custom" && us[t.id] ? t.id : "corvette";
      ((this.d = {
        name: "",
        base: { kind: "fleet", id: e },
        paint: null,
        tune: Jo(this.H.tuneOf(e)) || {},
      }),
        (this.d.name = this.defaultName()),
        (this.hist = []),
        (this.fut = []),
        (this.dirty = !1),
        (this.step = "base"),
        (this.gen.note = null),
        (this.gen.ask = !1),
        (this.made = 0),
        (this.more = !1),
        (this.askCar = !1),
        (this.cars = 0));
      let s = Vn.making().slice(-1)[0];
      ((this.buildId = s ? s.id : null), s && this.watch(), this.show());
    }
    defaultName() {
      let t = us[this.d.base.id];
      return (
        ((this.d.base.kind === "ride"
          ? this.d.base.item?.name || this.d.base.ride?.name
          : t?.name) || "My") +
        " build " +
        (this.H.mine().length + 1)
      );
    }
    snap() {
      return JSON.stringify(this.d);
    }
    change(t, e = !1) {
      ((!e || !this.slid) &&
        (this.hist.push(this.snap()),
        this.hist.length > 60 && this.hist.shift(),
        (this.fut = [])),
        (this.slid = e),
        t(this.d),
        (this.dirty = !0),
        this.look(),
        this.render());
    }
    undo() {
      this.hist.length &&
        (this.fut.push(this.snap()),
        this.setDraft(JSON.parse(this.hist.pop())));
    }
    redo() {
      this.fut.length &&
        (this.hist.push(this.snap()),
        this.setDraft(JSON.parse(this.fut.pop())));
    }
    async setDraft(t) {
      let e = JSON.stringify(t.base) !== JSON.stringify(this.d.base);
      ((this.d = t), e ? await this.loadBase() : this.look(), this.render());
    }
    look() {
      (this.H.look(this.d.paint, this.d.tune),
        this.d.base.kind === "ride" && this.H.setEngine?.(this.d.snd || null));
    }
    async show() {
      (await this.loadBase(), this.render());
    }
    async loadBase() {
      let t = this.d.base,
        e =
          t.kind === "fleet"
            ? { kind: "fleet", id: t.id }
            : { kind: "ride", item: t.item || null, ride: t.ride };
      ((this.busy = !0), this.render());
      let s = await this.H.preview(e).catch(() => !1);
      ((this.busy = !1),
        s || this.H.toast?.("That car would not load", "Try another one"),
        this.look(),
        this.render());
    }
    async setBase(t) {
      (this.hist.push(this.snap()), (this.fut = []));
      let e = this.d.name && this.d.name !== this.defaultName(),
        s = Jo(t.kind === "fleet" ? this.H.tuneOf(t.id) : null) || {};
      ((this.d.snd = (t.kind === "ride" && t.ride?.snd) || null),
        (this.d.base = t),
        (this.d.tune =
          t.kind === "fleet"
            ? {
                ...s,
                w: this.d.tune?.w,
                p: {
                  ...(s.p || {}),
                  susp: this.d.tune?.p?.susp || 0,
                  aero: this.d.tune?.p?.aero || 0,
                },
                t: { ...(s.t || {}), rh: this.d.tune?.t?.rh || 0 },
              }
            : {}),
        e || (this.d.name = this.defaultName()),
        (this.dirty = !0),
        await this.loadBase());
    }
    canPaint() {
      return this.d.base.kind === "fleet" || !!this.H.car()?.paintKit;
    }
    canLook() {
      let t = this.H.car();
      return this.canPaint() || (t?.custom && !t.noWheelTune);
    }
    go(t) {
      (mB.includes(t) && (t = "parts"),
        I2.some((e) => e[0] === t) &&
          ((this.step = t), this.render(), (this.secs.scrollTop = 0)));
    }
    click(t) {
      let e = t.target.closest("[data-c]");
      if (!e || e.disabled || e.getAttribute("aria-disabled") === "true")
        return;
      let s = e.dataset.c,
        n = e.dataset.v;
      if (e.dataset.lock) {
        this.H.toast?.(
          "Locked until level " + e.dataset.lock,
          "Earn XP to unlock it",
        );
        return;
      }
      ({
        back: () => this.back(),
        undo: () => this.undo(),
        redo: () => this.redo(),
        save: () => this.save(),
        drive: () => this.save(!0),
        sec: () => this.go(n),
        more: () => {
          ((this.more = !this.more), this.render());
        },
        fleet: () => this.setBase({ kind: "fleet", id: n }),
        shared: () => {
          let i = this.shared?.[+n];
          i && this.setBase({ kind: "ride", item: i });
        },
        pick: async () => {
          let i = await Rv();
          i && this.setBase({ kind: "ride", item: i });
        },
        handoff: () => {
          Ch() && ((this.askCar = !0), this.render());
        },
        "car-yes": () => {
          if (!QM(this.el, 1)) {
            this.H.toast?.(
              "Over your limit",
              'Tick "Go over my limit" to make this one',
            );
            return;
          }
          ((this.askCar = !1), this.handoff());
        },
        "car-no": () => {
          ((this.askCar = !1), this.render());
        },
        reopen: () => this.reopen(),
        forget: () => {
          this.buildId &&
            confirm(
              "Forget this car? If mindblown is still making it, it will still arrive in your mindblown cars.",
            ) &&
            (Vn.remove(this.buildId), (this.buildId = null), this.render());
        },
        "stop-making": () => {
          ((this.buildId = null), this.render());
        },
        count: () => {
          ((this.gen.n = +n == 3 ? 3 : 1), this.render());
        },
        snd: () =>
          this.change((i) => {
            i.snd = Tc[n] ? n : null;
          }),
        col: () =>
          this.change((i) => {
            i.paint = {
              ...(i.paint || {}),
              c: n === "factory" ? null : n,
              w: null,
              f: i.paint?.f || (n === "factory" ? null : "metallic"),
            };
          }),
        fin: () =>
          this.change((i) => {
            i.paint = { ...(i.paint || {}), f: n === "factory" ? null : n };
          }),
        cal: () =>
          this.change((i) => {
            i.paint = { ...(i.paint || {}), cal: n === "factory" ? null : n };
          }),
        mode: () => {
          ((this.gen.mode = n), this.render());
        },
        gen: () => {
          if (!qf()) {
            this.askSignIn();
            return;
          }
          ((this.gen.ask = !0), this.render());
        },
        "gen-yes": () => {
          if (!QM(this.el, this.gen.n)) {
            this.H.toast?.(
              "Over your limit",
              'Tick "Go over my limit" to make these',
            );
            return;
          }
          ((this.gen.ask = !1), this.variations(this.gen.n, !0));
        },
        "gen-no": () => {
          ((this.gen.ask = !1), this.render());
        },
        cancel: () => this.gen.busy?.ctl.abort(),
        shot: () => {
          let i = this.gen.shots[+n];
          i &&
            this.change((a) => {
              a.paint = {
                ...(a.paint || {}),
                w: { u: i.url, m: i.mode, n: i.words.slice(0, 60) },
                f: a.paint?.f || "gloss",
              };
            });
        },
        unwrap: () =>
          this.change((i) => {
            i.paint && (i.paint.w = null);
          }),
        rim: () =>
          this.change((i) => {
            i.tune.w = { ...(i.tune.w || {}), s: +n };
          }),
        size: () =>
          this.change((i) => {
            i.tune.w = { ...(i.tune.w || {}), z: +n };
          }),
        side: () =>
          this.change((i) => {
            i.tune.w = { ...(i.tune.w || {}), d: +n };
          }),
        rimc: () =>
          this.change((i) => {
            i.paint = { ...(i.paint || {}), rim: n === "factory" ? null : n };
          }),
        susp: () =>
          this.change((i) => {
            ((i.tune.p = { ...(i.tune.p || {}), susp: +n }),
              +n < 2 && i.tune.t && (i.tune.t.rh = 0));
          }),
        aero: () =>
          this.change((i) => {
            i.tune.p = { ...(i.tune.p || {}), aero: +n };
          }),
      })[s]?.();
    }
    key(t) {
      return (t.ctrlKey || t.metaKey) && t.code === "KeyZ"
        ? (t.shiftKey ? this.redo() : this.undo(), !0)
        : (t.ctrlKey || t.metaKey) && t.code === "KeyY"
          ? (this.redo(), !0)
          : !1;
    }
    back() {
      (this.dirty && !confirm("Leave without saving this car?")) ||
        ((this.dirty = !1),
        (this.making = null),
        this.g.setMode("home"),
        this.g.home?.restore?.());
    }
    leave() {
      (this.gen.busy?.ctl.abort(), clearInterval(this.makeTick));
    }
    async photos(t) {
      for (let e of [...(t || [])].slice(0, 3))
        if (/^image\/(png|jpeg|webp)$/.test(e.type))
          try {
            let s = await XM(e);
            if (
              ((this.dream.pal = [...new Set([...this.dream.pal, ...s])].slice(
                0,
                6,
              )),
              (this.gen.refs = this.dream.pal),
              !this.dream.thumb)
            ) {
              let n = await createImageBitmap(e, {
                  resizeWidth: 96,
                  resizeHeight: 64,
                  resizeQuality: "medium",
                }),
                i = document.createElement("canvas");
              ((i.width = 96),
                (i.height = 64),
                i.getContext("2d").drawImage(n, 0, 0),
                (this.dream.thumb = i.toDataURL("image/jpeg", 0.7)));
            }
          } catch {}
      this.render();
    }
    askSignIn() {
      let t = this.gen;
      ((t.note = {
        t: "Sign in to generate",
        m: "Sign in to mindblown. Your build stays here and asks before it generates.",
        bad: !0,
        signin: !0,
      }),
        this.render(),
        Do.signIn(),
        this.resumeOff?.(),
        (this.resumeOff = Do.after(() => {
          ((this.resumeOff = null),
            (t.note = null),
            (t.ask = !0),
            (this.step = "livery"),
            this.render());
        })));
    }
    async handoff() {
      let t = this.dream.words.trim(),
        e = t
          ? `${t}${this.dream.pal.length ? ". Colours: " + this.dream.pal.join(", ") : ""}`
          : "",
        s = !1;
      if (e)
        try {
          (await navigator.clipboard.writeText(e), (s = !0));
        } catch {}
      let n = "";
      try {
        n =
          (
            await Promise.race([
              globalThis.mindblown?.items?.get?.("car"),
              new Promise((a) => setTimeout(a, 1500)),
            ])
          )?.id || "";
      } catch {}
      let i = Vn.add({
        kind: "car",
        name: t ? t.replace(/\s+/g, " ").slice(0, 32) : "AI car",
        prompt: e,
        thumb: this.dream.thumb,
        base: this.summary("base"),
        prev: n,
        spent: { pictures: 0, cars: 1 },
      });
      (Ti.record("car", 1),
        this.cars++,
        (this.buildId = i.id),
        (this.copied = s),
        (this.handed = null),
        this.watch(),
        this.render(),
        this.reopen());
    }
    async reopen() {
      let t = await Rv();
      if (t) {
        this.H.offerCar ? this.H.offerCar(t) : this.offer(t);
        return;
      }
      let e = this.buildId && Vn.get(this.buildId);
      e &&
        e.status === "making" &&
        (Vn.update(e.id, { status: "closed" }), this.render());
    }
    watch() {
      (clearInterval(this.makeTick),
        (this.makeTick = setInterval(() => {
          let t = this.buildId && Vn.get(this.buildId),
            e = this.el.querySelector(".gc-make-t");
          if (!t || (t.status !== "making" && t.status !== "closed")) {
            clearInterval(this.makeTick);
            return;
          }
          e && (e.textContent = Hst((Date.now() - t.t0) / 1e3));
        }, 500)));
    }
    offer(t) {
      this.g.mode === "create" &&
        t?.vehicle &&
        ((this.buildId = null),
        (this.handed = { got: t.name || "your car" }),
        this.setBase({ kind: "ride", item: t }));
    }
    async variations(t = 1, e = !1) {
      let s = this.gen;
      if (s.busy || !e) return;
      let n = s.words.trim() || "a bold abstract livery",
        i = s.mode,
        a = new AbortController(),
        r = (s.busy = { t0: performance.now(), ctl: a });
      ((s.note = null), this.render());
      let l = setInterval(() => this.syncGen(), 250),
        c = s.shots.length;
      (Ti.record("image", t),
        this.buildId && Vn.spent(this.buildId, "image", t));
      let h = Array.from({ length: t }, (p, m) =>
          EE(
            _E(n, {
              mode: i,
              palette: this.dream.pal,
              variation: t > 1 || c ? c + m + 1 : 0,
            }),
            {
              size: i === "t" ? "square" : "wide",
              signal: a.signal,
              confirmed: !0,
            },
          ),
        ),
        f = await Promise.all(h);
      (clearInterval(l), s.busy === r && (s.busy = null));
      let u = 0,
        d = null;
      for (let p of f)
        p.url
          ? (s.shots.unshift({
              url: p.url,
              sha: p.sha || null,
              words: n,
              mode: i,
            }),
            u++)
          : p.cancelled
            ? p.late.then((m) => {
                m?.url &&
                  (s.shots.unshift({
                    url: m.url,
                    sha: m.sha || null,
                    words: n,
                    mode: i,
                    late: !0,
                  }),
                  this.made++,
                  this.render());
              })
            : p.refused && (d = p.refused);
      if (
        ((this.made += u),
        (s.shots.length = Math.min(s.shots.length, 12)),
        f.some((p) => p.cancelled))
      )
        s.note = {
          t: "Stopped waiting",
          m: "Pictures already started still arrive below.",
        };
      else if (d && !u) {
        let p = yd[d] || yd.unavailable;
        s.note = { t: p[0], m: p[1], bad: !0 };
      }
      if (u) {
        let p = s.shots[0];
        this.change((m) => {
          m.paint = {
            ...(m.paint || {}),
            w: { u: p.url, m: p.mode, n: n.slice(0, 60) },
            f: m.paint?.f || "gloss",
          };
        });
      } else this.render();
    }
    syncGen() {
      let t = this.gen,
        e = this.el.querySelector(".gc-prog");
      if (!e || ((e.hidden = !t.busy), !t.busy)) return;
      let s = (performance.now() - t.busy.t0) / 1e3,
        [n, i] = zE.image;
      ((e.querySelector("i").style.width =
        (Math.min(0.95, 1 - Math.exp(-s / ((n + i) / 2))) * 100).toFixed(1) +
        "%"),
        (e.querySelector("span").textContent =
          `Making ${t.n > 1 ? t.n + " pictures" : "1 picture"} \xB7 ${Math.floor(s)} s of about ${n}-${i}`));
    }
    bill() {
      return Ov(
        this.H.baseTune
          ? this.H.baseTune(this.d.base)
          : this.d.base.kind === "fleet"
            ? this.H.tuneOf(this.d.base.id)
            : null,
        this.d.tune,
      );
    }
    async save(t = !1) {
      let e = this.d,
        s = this.bill();
      if (s.total > 0) {
        let l = this.H.wallet();
        if (l !== null && l < s.total) {
          this.H.toast?.(
            "Not enough cash",
            $f(s.total) + " for the parts \xB7 you have " + $f(l),
          );
          return;
        }
        if (
          !confirm(
            `Buy the parts for ${$f(s.total)}?
` +
              s.items.map((c) => "\xB7 " + c.what + " " + $f(c.price)).join(`
`),
          )
        )
          return;
        if (
          l !== null &&
          !this.H.spend(
            s.total,
            (e.name.trim() || this.defaultName()) +
              " \xB7 " +
              s.items.map((c) => c.what).join(", "),
          )
        ) {
          this.H.toast?.("Not enough cash", $f(s.total) + " needed");
          return;
        }
      }
      let n = or(e.paint);
      n?.w?.u &&
        !n.w.c &&
        !n.w.u.startsWith("data:") &&
        (n = await TE(n, this.gen.shots, e.name));
      let i = HE(e.tune),
        a = this.H.saveMine({
          name: e.name.trim() || this.defaultName(),
          base: e.base.kind === "fleet" ? e.base.id : "custom",
          item: e.base.item || null,
          ride: e.base.ride || null,
          paint: n,
          tune: i,
          ...(e.base.kind === "ride" ? { snd: e.snd || null } : {}),
        });
      ((this.dirty = !1),
        this.H.toast?.(t ? "Your build" : "Saved to your garage", a.name));
      let r = this.g.home;
      (r && ((r.sec = "mine"), (r.sel = "m:" + a.id)),
        t
          ? (this.H.drive({ kind: "mine", c: a }),
            r?.commitDone(),
            this.g.leaveToDrive())
          : this.g.setMode("home"));
    }
    render() {
      if (!this.d || this.g.mode !== "create") return;
      let t = this.el,
        e = this.d,
        s = t.querySelector(".gc-name");
      (document.activeElement !== s && (s.value = e.name),
        (t.querySelector("[data-c=undo]").disabled = !this.hist.length),
        (t.querySelector("[data-c=redo]").disabled = !this.fut.length),
        (t.querySelector(".gc-tok").innerHTML = Tv()),
        (t.querySelector(".gh-busy").hidden = !this.busy));
      let n = this.bill(),
        i = this.H.wallet(),
        a = vd("image", this.made),
        r = this.cars ? vd("car", this.cars) : "",
        l = [a, r].filter(Boolean).join(" + "),
        c = [
          this.made
            ? this.made + " AI picture" + (this.made > 1 ? "s" : "")
            : "",
          this.cars ? this.cars + " AI car" + (this.cars > 1 ? "s" : "") : "",
        ]
          .filter(Boolean)
          .join(" \xB7 ");
      t.querySelector(".gc-bill").innerHTML =
        `<b>Total: ${$f(n.total)} cash${l ? " \xB7 " + l : ""}</b><small>${c ? "This build: " + c + (l ? "" : " (cost unknown)") + " \xB7 " : ""}This session ${Ti.session()} of ${Ti.cap()}${i !== null ? " \xB7 you have " + $f(i) : ""}</small>`;
      for (let m of ["save", "drive"])
        t.querySelector(`[data-c=${m}]`).disabled = !!this.busy;
      let h = I2.findIndex((m) => m[0] === this.step);
      ((t.querySelector(".gc-steps").innerHTML = I2.map(
        ([m, g], b) =>
          `<button type="button" role="tab" class="gc-st${m === this.step ? " on" : ""}${b < h ? " done" : ""}${this.off(m) ? " off" : ""}" data-c="sec" data-v="${m}" aria-selected="${m === this.step}"><span>${b < h ? Lh("check") : b + 1}</span><b>${yo(g)}</b></button>`,
      ).join("")),
        t
          .querySelector(".gc-steps .on")
          ?.scrollIntoView?.({ block: "nearest", inline: "nearest" }));
      let f = this.secs.scrollTop,
        u = this.off(this.step);
      ((this.secs.innerHTML =
        `<h3 class="gc-h">${yo(I2[h][1])}<small>${yo(this.summary(this.step))}</small></h3>` +
        (u
          ? `<p class="gc-note">${this.step === "livery" ? yo(this.H.car()?.noPaint || "This car's paint is part of its model.") : "This car's wheels are part of its model and stay as made."} The fleet's cars take every part.</p>`
          : this.body(this.step))),
        (this.secs.scrollTop = f));
      let d = I2[h - 1],
        p = I2[h + 1];
      ((t.querySelector(".gc-nav").innerHTML =
        `${d ? `<button type="button" class="gc-prev" data-c="sec" data-v="${d[0]}">${Lh("back")}${yo(d[1])}</button>` : "<span></span>"}${p ? `<button type="button" class="gc-next" data-c="sec" data-v="${p[0]}">Next: ${yo(p[1])}${Lh("next")}</button>` : ""}`),
        this.syncGen());
    }
    off(t) {
      return (
        t !== "base" &&
        t !== "save" &&
        (t === "livery" ? !this.canPaint() : !this.canLook())
      );
    }
    summary(t) {
      let e = this.d,
        s = e.tune || {},
        n = e.paint || {};
      return t === "base"
        ? e.base.kind === "fleet"
          ? us[e.base.id]?.name + " " + us[e.base.id]?.model
          : (e.base.item?.name || e.base.ride?.name || "mindblown car") +
            (e.snd ? " \xB7 " + Tc[e.snd].label : "")
        : t === "livery"
          ? n.w
            ? ld[n.w.m] + " wrap"
            : n.c
              ? (Ff(n.c) || n.c.toUpperCase()) +
                " \xB7 " +
                Lf(n.f || "metallic").name
              : "Factory paint"
          : t === "wheels"
            ? s.w?.s
              ? Hr[s.w.s][0] +
                (s.w.z ? " \xB7 " + (s.w.z > 0 ? "+" : "") + s.w.z + '"' : "")
              : "Factory wheels"
            : t === "stance"
              ? (s.p?.susp ? Bst[s.p.susp] : "Factory") +
                (s.t?.rh ? " \xB7 " + s.t.rh + " cm" : "")
              : t === "aero"
                ? s.p?.aero
                  ? Nst[s.p.aero]
                  : "No wing"
                : t === "save"
                  ? e.name
                  : t === "parts"
                    ? mB
                        .map((i) => this.summary(i))
                        .filter(
                          (i) => !/^(Factory|No wing|Factory wheels)$/.test(i),
                        )
                        .join(" \xB7 ") || "Factory"
                    : "";
    }
    body(t) {
      let e = this.d,
        s = e.tune || {},
        n = e.paint || {},
        i = this.H.level(),
        a = this.H.baseTune
          ? this.H.baseTune(e.base)
          : e.base.kind === "fleet"
            ? this.H.tuneOf(e.base.id)
            : null,
        r = (f, u, d, p, m = "") =>
          `<button type="button" class="gr-sw${p ? " on" : ""}${m}" data-c="${f}" data-v="${u}" title="${yo(d)}" aria-label="${yo(d)}" aria-pressed="${p}" style="--c:${u === "factory" ? "#777" : u}"></button>`,
        l = (f, u, d, p, m = "", g = "") =>
          `<button type="button" class="gc-chip${p ? " on" : ""}" data-c="${f}" data-v="${u}" aria-pressed="${p}"${m}>${yo(d)}${g ? `<i>${g}</i>` : ""}</button>`,
        c = (f, u) => {
          let d = Ri[f].lv[u];
          return u
            ? L2(a, f, u)
              ? "Owned"
              : d[2] > i
                ? "Level " + d[2]
                : $f(d[1])
            : "";
        },
        h = (f, u) =>
          u && Ri[f].lv[u][2] > i ? ` data-lock="${Ri[f].lv[u][2]}"` : "";
      if (t === "base") {
        let f = this.buildId && Vn.get(this.buildId),
          u = this.handed,
          d =
            f && (f.status === "making" || f.status === "closed")
              ? `<div class="gc-ai making" role="status"><div class="gc-ai-h">${Lh("spark")}<b>Creating with mindblown\u2026</b><span class="gc-make-t">${Hst((Date.now() - f.t0) / 1e3)}</span></div>
          <div class="gc-bar"><i></i></div>
          <p>${f.status === "closed" ? "The maker is closed. If your car is still being made it lands here, and in your Garage, when it is ready." : "mindblown's car maker is open on the left. Your car appears on the turntable when it is ready - usually a few minutes."}${f.prompt ? (this.copied ? " Your description is copied - paste it into the maker." : ` Describe it there as: <q>${yo(f.prompt)}</q>`) : ""}</p>
          <p class="gc-spent">Spent on it: ${f.spent.cars} AI car${f.spent.pictures ? " \xB7 " + f.spent.pictures + " AI pictures" : ""} \xB7 ${yo(vd("car", f.spent.cars) || "cost unknown")}</p>
          <div class="gc-chips"><button type="button" class="gc-chip" data-c="reopen">Open mindblown maker</button><button type="button" class="gc-chip" data-c="forget">Forget</button></div></div>`
              : this.askCar
                ? `<div class="gc-ai"><div class="gc-ai-h">${Lh("spark")}<b>Create a car with AI</b></div><div class="gr-ask">${ZM("car", 1)}
          <div class="gr-askb"><button type="button" class="gh-btn gh-go" data-c="car-yes">Open the maker</button><button type="button" class="gh-btn" data-c="car-no">Not now</button></div></div></div>`
                : `<div class="gc-ai"><div class="gc-ai-h">${Lh("spark")}<b>Create a car with AI</b></div>
          ${u?.got ? `<p class="gc-ok">${Lh("check")}<b>${yo(u.got)}</b> is on the turntable. Style it in the next steps.</p>` : ""}
          <textarea class="gc-dream" rows="2" maxlength="300" placeholder="A 70s wedge supercar in pearl white, pop-up lights\u2026">${yo(this.dream.words)}</textarea>
          <label class="gc-drop"><input type="file" class="gc-file" accept="image/png,image/jpeg,image/webp" multiple hidden>${this.dream.pal.length ? `<span class="gr-pal">${this.dream.pal.map((M) => `<i style="--c:${M}"></i>`).join("")}</span> Photo colours added` : "Add a photo (optional)"}</label>
          <button type="button" class="gh-btn gh-go gc-hand" data-c="handoff"${Ch() ? "" : " disabled"}><b>Create with AI</b><small>${Ch() ? yo(T2("car")) : "On the published game"}</small></button></div>`,
          p = E2.filter((M) => us[M] && M !== "custom").map((M) => {
            let S = us[M],
              w = e.base.kind === "fleet" && e.base.id === M;
            return `<button type="button" class="gc-base${w ? " on" : ""}" data-c="fleet" data-v="${M}" aria-pressed="${w}"><span class="gh-spr" style="${t4(S)}"></span><b>${yo(S.name)}</b></button>`;
          }),
          m = (this.shared || []).map((M, S) => {
            let w = e.base.kind === "ride" && e.base.item?.id === M.id;
            return `<button type="button" class="gc-base${w ? " on" : ""}" data-c="shared" data-v="${S}" aria-pressed="${w}">${M.files?.icon?.url ? `<img src="${yo(M.files.icon.url)}" alt="">` : '<span class="gh-spr"></span>'}<b>${yo(M.name || "Car")}</b></button>`;
          });
        !this.shared &&
          Ch() &&
          !this.loadingShared &&
          ((this.loadingShared = !0),
          RE().then((M) => {
            ((this.shared = M.filter(
              (S) => S?.kind === "vehicle" && S.vehicle,
            )),
              this.render());
          }));
        let g = Ch()
            ? [
                '<button type="button" class="gc-base gc-add" data-c="pick"><span class="gh-plus mb"></span><b>My cars</b></button>',
              ]
            : [],
          b = [...p, ...g, ...m],
          v = this.more ? b : b.slice(0, 6),
          x = this.H.engineAuto?.(),
          y =
            e.base.kind === "ride" && x
              ? `<h5>Engine sound <span>Recorded</span></h5><div class="gc-chips gc-snd">${l("snd", "auto", "Auto \xB7 " + Tc[x].label, !e.snd)}${yE.map((M) => l("snd", M, Tc[M].label, e.snd === M)).join("")}</div>`
              : "";
        return (
          d +
          y +
          `<h5>Or start from a car</h5><div class="gc-grid">${v.join("")}</div>${b.length > 6 ? `<button type="button" class="gc-link gc-more" data-c="more">${this.more ? "Fewer cars" : "More cars (" + (b.length - 6) + ")"}</button>` : ""}`
        );
      }
      if (t === "livery") {
        let f = this.gen,
          u = n.c || null,
          d = f.shots
            .map(
              (p, m) =>
                `<button type="button" class="gr-shot${n.w?.u === p.url ? " on" : ""}" data-c="shot" data-v="${m}" title="${yo(p.words)}"><img src="${yo(p.url)}" alt="">${p.late ? "<i>late</i>" : ""}</button>`,
            )
            .join("");
        return `<h5>Colour</h5><div class="gr-grid">${r("col", "factory", "Factory colour", !u && !n.w, " fac")}${Gp.map(([p, m]) => r("col", p, m, u === p && !n.w)).join("")}</div>
        <h5>Finish</h5><div class="gc-chips">${l("fin", "factory", "Factory", !n.f)}${Vp.filter(
          (p) => !p.lvl || p.lvl <= i,
        )
          .map((p) => l("fin", p.id, p.name, n.f === p.id))
          .join("")}</div>
        ${this.H.car()?.paintKit?.calipers?.length ? `<h5>Calipers</h5><div class="gr-grid sm">${r("cal", "factory", "Factory", !n.cal, " fac")}${qx.map(([p, m]) => r("cal", p, m, n.cal === p)).join("")}</div>` : ""}
        <div class="gc-ai gc-wrap"><div class="gc-ai-h">${Lh("spark")}<b>AI wrap</b><span>${yo(T2("image", f.n))}</span></div>
        <textarea class="gc-words" rows="2" maxlength="300" placeholder="Neon koi fish over deep purple waves">${yo(f.words)}</textarea>
        <div class="gc-chips">${Object.entries(ld)
          .map(([p, m]) => l("mode", p, m, f.mode === p))
          .join(
            "",
          )}<span class="gc-sep"></span>${l("count", 1, "1 design", f.n === 1)}${l("count", 3, "3 variations", f.n === 3)}</div>
        ${f.ask ? `<div class="gr-ask">${ZM("image", f.n)}<div class="gr-askb"><button type="button" class="gh-btn gh-go" data-c="gen-yes">Generate ${f.n}</button><button type="button" class="gh-btn" data-c="gen-no">Not now</button></div></div>` : ""}
        ${f.note ? `<div class="gr-note${f.note.bad ? " bad" : ""}"><b>${yo(f.note.t)}</b> ${yo(f.note.m)}${f.note.signin ? ' <button type="button" class="acIn" data-signin="1">Sign in to mindblown</button>' : ""}</div>` : ""}
        <button type="button" class="gh-btn gc-gen" data-c="gen"${f.busy || !a1() ? " disabled" : ""}><b>${f.busy ? "Generating\u2026" : qf() || !a1() ? (f.n > 1 ? "Generate 3 variations" : "Generate a design") : "Sign in to generate"}</b><small>${a1() ? yo(T2("image", f.n)) : "On the published game"}</small></button>
        <div class="gc-prog" hidden><b><i></i></b><span></span><button type="button" class="gc-link" data-c="cancel">Cancel</button></div>
        ${d || n.w ? `<div class="gr-shots">${d}${n.w && !f.shots.some((p) => p.url === n.w.u) ? `<button type="button" class="gr-shot on"><img src="${yo(n.w.u)}" alt=""></button>` : ""}</div>` : ""}
        ${n.w ? `<div class="gc-chips">${l("unwrap", "1", "Remove wrap", !1)}</div>` : ""}</div>`;
      }
      if (t === "wheels") {
        let f = s.w?.s || 0,
          u = s.w?.z || 0,
          d = s.w?.d || 0;
        return `<h5>Rims</h5><div class="gc-chips">${Hr.map((p, m) => l("rim", m, p[0], f === m, p[4] > i ? ` data-lock="${p[4]}"` : "", m ? (Fv(a, m) ? "Owned" : p[4] > i ? "Level " + p[4] : $f(p[3])) : "")).join("")}</div>
        <h5>Size</h5><div class="gc-chips">${Cst.map((p) => l("size", p, p ? (p > 0 ? "+" : "") + p + '"' : "Factory", u === p)).join("")}</div>
        <h5>Sidewall</h5><div class="gc-chips">${C2.map((p, m) => l("side", m, p, d === m)).join("")}</div>
        ${this.canPaint() ? `<h5>Rim colour</h5><div class="gr-grid sm">${r("rimc", "factory", "Factory", !n.rim, " fac rim")}${If.map(([p, m]) => r("rimc", p, m, n.rim === p, " rim")).join("")}</div>` : ""}`;
      }
      if (t === "stance") {
        let f = s.p?.susp || 0,
          u = s.t?.rh || 0;
        return `<h5>Springs</h5><div class="gc-chips">${Bst.map((d, p) => l("susp", p, d, f === p, h("susp", p), c("susp", p))).join("")}</div>
        <h5>Ride height <span>${f >= 2 ? u + " cm" : "Needs coilovers"}</span></h5><input type="range" data-sl="rh" min="-5" max="3" step="0.5" value="${u}"${f >= 2 ? "" : " disabled"} aria-label="Ride height">`;
      }
      if (t === "aero") {
        let f = s.p?.aero || 0;
        return `<h5>Wing</h5><div class="gc-chips">${Nst.map((u, d) => l("aero", d, u, f === d, h("aero", d), c("aero", d))).join("")}</div>`;
      }
      if (t === "parts")
        return mB
          .map(
            (f) =>
              `<section class="gc-sub"><h4>${f === "wheels" ? "Wheels" : f === "stance" ? "Stance" : "Wing"}</h4>${this.body(f)}</section>`,
          )
          .join("");
      if (t === "save") {
        let f = this.bill(),
          u = I2.slice(0, 3)
            .map(
              ([d, p]) =>
                `<li><span>${yo(p)}</span><b>${yo(this.summary(d))}</b></li>`,
            )
            .join("");
        return `<h5>Name</h5><input class="gc-name2" maxlength="28" value="${yo(e.name)}" aria-label="Your car's name" spellcheck="false">
        <ul class="gc-sum">${u}</ul>
        <p class="gc-note">${f.total ? "Parts to buy: " + f.items.map((d) => yo(d.what) + " " + $f(d.price)).join(" \xB7 ") : "Nothing to buy - the parts are free or already yours."}</p>`;
      }
      return "";
    }
  };
