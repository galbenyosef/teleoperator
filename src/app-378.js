// app 378 — dataset
// Lines 188271-188915 of readable/app.pretty.js (statement-aligned).
var mE = class {
  constructor(t, { onPause: e, onResume: s, audio: n, carId: o } = {}) {
    ((this.v = t),
      (this.paused = !1),
      (this.onPause = e),
      (this.onResume = s),
      (this.audio = n || (() => null)),
      (this.carId = o || (() => "free")),
      (this.hooks = {}));
    for (let p of document.querySelectorAll("[data-level]"))
      p.onclick = () => {
        this.setLevel(p.dataset.level);
      };
    for (let p of document.querySelectorAll("[data-l5profile]"))
      p.onclick = () => {
        if (!t.da) return;
        let m = p.dataset.l5profile === "chill" ? "chill" : "madmax";
        ((t.da.profile = m), (t.da.prof = Im[m]), OZ(m), this.sync());
      };
    let a = document.querySelector("[data-dassist-all]");
    a &&
      (a.onclick = () => {
        let p = Uw();
        ((p.all = p.all ? null : t.da?.mode || "manual"),
          p.all || (p.cars[this.carId()] = t.da?.mode || "manual"),
          QI(p),
          this.sync());
      });
    let r = vM();
    (Object.assign(t.assists, r.assists), (t.manual = r.manual));
    for (let p of document.querySelectorAll("[data-assist]"))
      p.onclick = () => {
        let m = p.dataset.assist;
        ((t.assists[m] = !t.assists[m]), this.resetAids(), net(t), this.sync());
      };
    for (let p of document.querySelectorAll("[data-transmission]"))
      p.onclick = () => {
        let m = p.dataset.transmission === "manual";
        (m !== t.manual && ((t.manual = m), (t._shiftReq = 0), net(t)),
          this.sync());
      };
    for (let p of document.querySelectorAll("[data-units]"))
      p.onclick = () => {
        (this.hooks.setUnits
          ? this.hooks.setUnits(p.dataset.units)
          : this.hooks.setMph?.(p.dataset.units === "mph"),
          this.sync());
      };
    this.prefs = yM();
    for (let p of document.querySelectorAll("input[data-prefnum]"))
      p.oninput = () => this.setPref(p.dataset.prefnum, +p.value);
    for (let p of document.querySelectorAll("[data-pref]"))
      p.onclick = () => {
        let m = p.dataset.pref,
          g = p.dataset.v ?? (this.prefs[m] === "on" ? "off" : "on");
        this.setPref(m, g);
      };
    for (let p of document.querySelectorAll("[data-ridestyle]"))
      p.onclick = () => {
        let m = p.dataset.ridestyle;
        (this.hooks.setRideStyle ? this.hooks.setRideStyle(m) : gE(m),
          this.sync());
      };
    for (let p of document.querySelectorAll("[data-cam]"))
      p.onclick = () => {
        (this.hooks.setCam?.(+p.dataset.cam), this.sync());
      };
    for (let p of document.querySelectorAll("[data-tod]"))
      p.onclick = () => {
        (this.hooks.setTod?.(p.dataset.tod), this.sync());
      };
    this.ask = null;
    for (let p of document.querySelectorAll("[data-gfx]"))
      p.onclick = () => {
        let m = p.dataset.gfx,
          g = globalThis.SF_GFX || {};
        if (m === (g.choice || "auto") && !g.url && !globalThis.SF_TIER_NOTE)
          return this.sync();
        let b = globalThis.SF_BOOT?.pick ? globalThis.SF_BOOT.pick(m) : m;
        if (!globalThis.SF_BOOT?.pick) {
          try {
            localStorage.setItem("sf-drive.gfx", m);
          } catch {}
          globalThis.SF_GFX = { ...g, choice: m, lvl: b };
        }
        let x = window.__sf?.applyGfx ? window.__sf.applyGfx(b) : !0;
        ((this.ask = x ? m : null), this.sync());
      };
    (gi("gfxNo")?.addEventListener("click", () => {
      ((this.ask = null), this.sync());
    }),
      gi("gfxGo")?.addEventListener("click", () => {
        globalThis.SF_BOOT?.restart
          ? globalThis.SF_BOOT.restart()
          : location.reload();
      }));
    for (let p of document.querySelectorAll("[data-fps]"))
      p.onclick = () => {
        let m = +p.dataset.fps;
        globalThis.SF_FPS = m;
        try {
          let g = JSON.parse(localStorage.getItem(wf) || "{}") || {};
          ((g.fps = m), localStorage.setItem(wf, JSON.stringify(g)));
        } catch {}
        this.sync();
      };
    let l = document.querySelector("[data-music]"),
      c = gi("musicVol");
    l &&
      (l.onclick = () => {
        let p = ev(),
          m = this.audio();
        (m ? m.setMusic(!m.musicOn) : Km(!p.on, p.vol), this.sync());
      });
    let h = gi("masterVol");
    (h &&
      (h.oninput = () => {
        let p = +h.value / 100,
          m = this.audio();
        (m ? m.setMasterVol(p) : UF(p), this.sync());
      }),
      c &&
        (c.oninput = () => {
          let p = +c.value / 100,
            m = this.audio();
          (m ? m.setMusicVol(p) : Km(ev().on, p), this.sync());
        }),
      gi("nextTrack")?.addEventListener("click", () => {
        let p = this.audio();
        p?.musicOn && p.next();
      }),
      gi("radioStation")?.addEventListener("click", () => {
        let p = this.audio();
        if (p) p.cycleStation();
        else {
          let m = ev();
          m.on
            ? m.station >= qu.length - 1
              ? Km(!1, m.vol)
              : uM(m.station + 1)
            : (uM(0), Km(!0, m.vol));
        }
        this.sync();
      }),
      gi("setRoomOpen")?.addEventListener("click", () => {
        let p = this.hooks.mp?.();
        p && (this.set(!1), p.show(!0));
      }),
      gi("resume")?.addEventListener("click", () => this.set(!1)),
      gi("setX")?.addEventListener("click", () => this.set(!1)),
      gi("bPause")?.addEventListener("click", () => this.set(!this.paused)),
      (this.tabs = [...document.querySelectorAll("#setSide [data-tab]")]));
    for (let p of this.tabs) p.onclick = () => this.show(p.dataset.tab);
    let f = "autopilot";
    try {
      f = localStorage.getItem(set) || f;
    } catch {}
    this.tab = f;
    let u = gi("setKeys"),
      d = document.querySelector("#help .card");
    (u && d && ((u.innerHTML = d.innerHTML), u.querySelector("h2")?.remove()),
      addEventListener("keydown", (p) => this.key(p), !0),
      (this.blockedShown = 0),
      this.sync());
  }
  show(t, e = !1) {
    let s =
      this.tabs.find((a) => a.dataset.tab === t && dE(a)) ||
      this.tabs.find(dE) ||
      this.tabs[0];
    if (!s) return;
    this.tab = s.dataset.tab;
    try {
      localStorage.setItem(set, this.tab);
    } catch {}
    for (let a of this.tabs) {
      let r = a === s;
      (a.setAttribute("aria-selected", String(r)), (a.tabIndex = r ? 0 : -1));
    }
    for (let a of document.querySelectorAll("#setPane .sec"))
      a.classList.toggle("on", a.dataset.sec === this.tab);
    let n = gi("setTitle");
    n && (n.textContent = s.textContent.trim());
    let o = gi("setPane");
    (o && (o.scrollTop = 0),
      s.scrollIntoView?.({ block: "nearest", inline: "nearest" }),
      this.syncLive(),
      e && s.focus({ preventScroll: !0 }));
  }
  rows() {
    let t = document.querySelector("#setPane .sec.on");
    if (!t) return [];
    let e = [];
    for (let s of t.querySelectorAll("button, input")) {
      if (!dE(s) || s.disabled) continue;
      let n = s.closest(".seg"),
        o = e[e.length - 1];
      n && o && o.g === n ? o.els.push(s) : e.push({ g: n, els: [s] });
    }
    return e;
  }
  nav(t) {
    let e = document.activeElement,
      s = gi("setSide"),
      n = gi("setPane"),
      o = this.tabs.filter(dE),
      a = o.find((u) => u.dataset.tab === this.tab) || o[0],
      r = n?.contains(e) && e !== n,
      l = s?.contains(e);
    if (!r && !l) {
      if (t === "back") return this.set(!1);
      a?.focus({ preventScroll: !0 });
      return;
    }
    if (l) {
      if (e === gi("resume")) {
        t === "up"
          ? o[o.length - 1]?.focus()
          : t === "ok"
            ? e.click()
            : t === "back" && this.set(!1);
        return;
      }
      let u = o.indexOf(e);
      if (t === "up" || t === "down") {
        let d = u + (t === "up" ? -1 : 1);
        if (d >= o.length) {
          gi("resume")?.focus();
          return;
        }
        let p = o[Math.max(0, d)];
        p && this.show(p.dataset.tab, !0);
      } else if (t === "right" || t === "ok") {
        let d = this.rows()[0],
          p =
            d &&
            (d.els.find((m) => m.getAttribute("aria-checked") === "true") ||
              d.els[0]);
        p && p.focus();
      } else t === "back" && this.set(!1);
      return;
    }
    let c = this.rows(),
      h = c.findIndex((u) => u.els.includes(e)),
      f = c[h];
    if (
      t === "back" ||
      (t === "left" &&
        (!f || (!f.g && e.type !== "range") || (f.g && f.els.indexOf(e) === 0)))
    ) {
      a?.focus();
      return;
    }
    if (t === "ok") {
      e.tagName === "BUTTON" && e.click();
      return;
    }
    if (t === "left" || t === "right") {
      if (e.type === "range") {
        let u = +e.step || 1;
        ((e.value = Math.min(
          +e.max,
          Math.max(+e.min, +e.value + (t === "left" ? -u : u)),
        )),
          e.dispatchEvent(new Event("input", { bubbles: !0 })));
        return;
      }
      if (f?.g) {
        let u = f.els.indexOf(e) + (t === "left" ? -1 : 1);
        f.els[u]?.focus();
      }
      return;
    }
    if (t === "up" || t === "down") {
      let u = h + (t === "up" ? -1 : 1);
      if (u < 0) {
        gi("setX")?.focus();
        return;
      }
      let d = c[u];
      if (!d) return;
      let p =
        d.els.find((m) => m.getAttribute("aria-checked") === "true") ||
        d.els[0];
      (p.focus(), p.scrollIntoView?.({ block: "nearest" }));
    }
  }
  key(t) {
    if (!this.paused || document.body.classList.contains("picking")) return;
    let e = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      Enter: "ok",
      Space: "ok",
    }[t.code];
    e &&
      ((e === "ok" && document.activeElement?.tagName !== "BUTTON") ||
        (t.preventDefault(), this.nav(e)));
  }
  pad() {
    if (!this.paused) {
      this.padOn = !1;
      return;
    }
    requestAnimationFrame(() => this.pad());
    let t = [...(navigator.getGamepads?.() || [])].find(
      (l) => l && l.connected,
    );
    if (!t) return;
    let e = performance.now(),
      s = t.axes[0] || 0,
      n = t.axes[1] || 0,
      o = (l) => !!t.buttons[l]?.pressed,
      a = {
        up: o(12) || n < -0.6,
        down: o(13) || n > 0.6,
        left: o(14) || s < -0.6,
        right: o(15) || s > 0.6,
        ok: o(0),
        back: o(1),
        start: o(9),
      },
      r = this.padPrev || a;
    this.padPrev = a;
    for (let l of ["up", "down", "left", "right"])
      a[l] && !r[l]
        ? ((this.padRep = e + 400), this.nav(l))
        : a[l] &&
          e > (this.padRep || 0) &&
          ((this.padRep = e + 130), this.nav(l));
    if ((a.ok && !r.ok && this.nav("ok"), a.back && !r.back)) {
      let l = document.activeElement;
      gi("setPane")?.contains(l) && l !== gi("setPane")
        ? this.nav("back")
        : (this.closeUp = !0);
    }
    (a.start && !r.start && (this.closeUp = !0),
      this.closeUp &&
        !a.start &&
        !a.back &&
        ((this.closeUp = !1), this.set(!1)));
  }
  setLevel(t) {
    let e = this.v;
    if (!e.da || !rf.includes(t)) return e.da?.mode || "manual";
    let s = Uw();
    return (
      s.all ? (s.all = t) : (s.cars[this.carId()] = t),
      QI(s),
      e.da.setMode(tF() ? t : Gw(this.carId())),
      e.da.mode !== t && e.da.setMode(t),
      this.sync(),
      e.da.mode
    );
  }
  cycleAssist() {
    let t = this.v;
    return t.da
      ? t.da.takeover
        ? (t.da.reengage(), this.sync(), "l5")
        : this.setLevel(BZ(t.da.mode))
      : "manual";
  }
  resetAids() {
    let t = this.v;
    (t.absP.fill(1), t.tcsCut.fill(0), t.espB.fill(0), (t.espEngine = 1));
  }
  set(t) {
    t !== this.paused &&
      ((this.paused = t),
      document.body.classList.toggle("paused", t),
      t
        ? (document.body.classList.remove("help"),
          this.sync(),
          this.show(this.tab),
          this.onPause?.(),
          (this.padPrev = null),
          (this.closeUp = !1),
          this.padOn ||
            ((this.padOn = !0), requestAnimationFrame(() => this.pad())),
          clearInterval(this.liveT),
          (this.liveT = setInterval(() => this.syncLive(), 700)))
        : (clearInterval(this.liveT),
          document.activeElement?.blur?.(),
          this.onResume?.()));
  }
  toggle() {
    this.set(!this.paused);
  }
  setPref(t, e) {
    ((this.prefs[t] = e), mwt(t, e), this.hooks.onPref?.(t, e), this.sync());
  }
  sync() {
    let t = this.v;
    for (let r of document.querySelectorAll("[data-assist]")) {
      let l = t.assists[r.dataset.assist];
      (r.setAttribute("aria-pressed", String(l)),
        (r.querySelector("b").textContent = l ? "ON" : "OFF"));
    }
    let e = t.da?.mode || "manual";
    for (let r of document.querySelectorAll("[data-level]"))
      r.setAttribute("aria-checked", String(r.dataset.level === e));
    {
      let r = gi("lvlNote");
      r &&
        (r.textContent =
          (Fm[e]?.name || "") +
          " \xB7 " +
          (Fm[e]?.sub || "") +
          (t.da?.takeover
            ? " \xB7 Taken over: I or the chip re-engages L5"
            : ""));
    }
    {
      let r = t.da?.profile === "chill" ? "chill" : "madmax";
      for (let l of document.querySelectorAll("[data-l5profile]"))
        l.setAttribute("aria-checked", String(l.dataset.l5profile === r));
    }
    let s = document.querySelector("[data-dassist-all]");
    if (s) {
      let r = !!Uw().all;
      (s.setAttribute("aria-pressed", String(r)),
        (s.querySelector("b").textContent = r ? "ON" : "OFF"));
    }
    for (let r of document.querySelectorAll("[data-transmission]"))
      r.setAttribute(
        "aria-checked",
        String((r.dataset.transmission === "manual") == !!t.manual),
      );
    gi("manualHint")?.classList.toggle("on", t.manual);
    {
      let r = this.hooks.mph ? this.hooks.mph() : !0,
        l = this.hooks.units?.();
      for (let c of document.querySelectorAll("[data-units]"))
        c.setAttribute(
          "aria-checked",
          String(l ? c.dataset.units === l : (c.dataset.units === "mph") === r),
        );
    }
    {
      let r = this.hooks.rideStyle?.() || vM().rideStyle;
      for (let l of document.querySelectorAll("[data-ridestyle]"))
        l.setAttribute("aria-checked", String(l.dataset.ridestyle === r));
    }
    for (let r of document.querySelectorAll("input[data-prefnum]")) {
      let l = r.dataset.prefnum,
        c = +(this.prefs?.[l] ?? iet[l]),
        h = +r.min,
        f = +r.max;
      (document.activeElement !== r && (r.value = c),
        r.style.setProperty(
          "--p",
          (((c - h) / (f - h)) * 100).toFixed(1) + "%",
        ));
      let u = gi(l + "V");
      u &&
        (u.textContent =
          (l === "fovAdd" && c > 0 ? "+" : "") + c + (r.dataset.unit || ""));
    }
    for (let r of document.querySelectorAll("[data-pref]")) {
      let l = this.prefs?.[r.dataset.pref];
      if (r.dataset.v !== void 0)
        r.setAttribute("aria-checked", String(r.dataset.v === l));
      else {
        r.setAttribute("aria-pressed", String(l === "on"));
        let c = r.querySelector("b");
        c && (c.textContent = l === "on" ? "ON" : "OFF");
      }
    }
    (this.syncGfx(),
      gi("gmode") && (gi("gmode").textContent = t.manual ? "M" : "A"));
    let n = ev(),
      o = document.querySelector("[data-music]");
    (o &&
      (o.setAttribute("aria-pressed", String(n.on)),
      (o.querySelector("b").textContent = n.on ? "ON" : "OFF")),
      gi("radioStation") &&
        (gi("radioStation").textContent =
          "Station: " + (n.on ? qu[n.station].name : "Off")));
    let a = (r, l) => {
      let c = gi(r);
      c &&
        ((c.value = l),
        c.style.setProperty("--p", l + "%"),
        (gi(r + "V").textContent = l));
    };
    (a("masterVol", Math.round(DF() * 100)),
      a("musicVol", Math.round(n.vol * 100)),
      this.syncLive());
  }
  syncLive() {
    {
      let o = this.hooks.cam?.();
      for (let a of document.querySelectorAll("[data-cam]"))
        a.setAttribute("aria-checked", String(+a.dataset.cam === o));
    }
    let t = this.hooks.tod?.();
    for (let o of document.querySelectorAll("[data-tod]"))
      o.setAttribute("aria-checked", String(o.dataset.tod === t));
    let e = window.__sf || {},
      s = e.profile,
      n = this.hooks.mp?.();
    if (
      (document.body.classList.toggle("hasProfile", !!s),
      s && this.tab === "profile" && this.paused)
    ) {
      let o = s.p,
        a = e.rides || s.rides,
        r = e.police || s.police,
        c = [
          [pE(s.wallet()), "Wallet"],
          [pE(a?.total ?? o.taxi.total), "Fares earned"],
          [String(a?.rides ?? o.taxi.rides), "Rides"],
          [pE(o.race.money), "Race prizes"],
          [String(o.race.played), "Races"],
          [o.race.wins + " / " + o.race.podiums, "Wins / podiums"],
          [String(r?.escapes ?? o.police.escapes), "Police escapes"],
          [String(r?.busts ?? o.police.busts), "Busted"],
          [(o.km || 0).toFixed(1) + " km", "Driven"],
          [pE(o.earned), "Earned, all time"],
          [
            (this.hooks.mph?.() ?? !0)
              ? Math.round((o.best?.kmh || 0) / 1.609) + " mph"
              : Math.round(o.best?.kmh || 0) + " km/h",
            "Top speed",
          ],
          [(o.best?.drift || 0).toFixed(1) + " s", "Longest drift"],
          [Math.round(o.best?.bounty || 0).toLocaleString(), "Biggest bounty"],
        ]
          .map(
            ([u, d]) => `<div class="stat"><b>${u}</b><span>${d}</span></div>`,
          )
          .join(""),
        h = gi("setStats");
      h && h._h !== c && ((h._h = c), (h.innerHTML = c));
      let f = gi("setStatsNote");
      f &&
        (f.textContent =
          (s.scope === "account"
            ? "Saved to your mindblown account"
            : "Saved in this browser \xB7 sign in to keep it on every device (it joins your account)") +
          (s.pending ? " \xB7 not synced yet, retrying" : "") +
          ((s.pendingCash?.() || 0) > 0.5
            ? " \xB7 $" +
              Math.round(s.pendingCash()) +
              " pending (over the plausible rate - released as the limit refills)"
            : ""));
    }
    if (
      (s?.board &&
        this.tab === "leaderboard" &&
        this.paused &&
        s.board.render(),
      n && this.paused)
    ) {
      let o = document.querySelector("#mpPanel .mpRoomName")?.textContent || "",
        a = document.querySelector("#mpPanel .mpStat span")?.textContent || "",
        r = gi("setRoomName"),
        l = gi("setRoomStat");
      if (r && l) {
        let c = !!n.ch;
        ((r.firstChild.textContent = c ? o : "Not in a room"),
          (l.textContent = c
            ? a
            : "Open a room and send the link. Up to 8 drivers."));
      }
    }
  }
  syncGfx() {
    let t = globalThis.SF_GFX || {
        choice: "auto",
        lvl: globalThis.SF_LITE ? "mobile" : globalThis.SF_Q || "high",
        own: globalThis.SF_LITE ? "mobile" : "high",
        names: {},
      },
      e = {
        saver: "Battery saver",
        mobile: "Mobile",
        perf: "Performance",
        high: "High",
        ultra: "Ultra",
        ...t.names,
      },
      s = ["saver", "mobile", "perf", "high", "ultra"];
    for (let a of document.querySelectorAll("[data-gfx]")) {
      let r = a.dataset.gfx,
        l = r === t.choice;
      a.setAttribute("aria-checked", String(l));
      let c = a.querySelector("b");
      (c &&
        (c.textContent =
          r === "auto" ? e[t.own] || "" : l && t.lvl !== r ? "Capped" : ""),
        a.classList.toggle(
          "risk",
          r !== "auto" &&
            s.indexOf(r) > s.indexOf(t.own) &&
            s.indexOf(t.own) <= 1,
        ));
    }
    let n = gi("gfxNote");
    n &&
      (n.textContent =
        globalThis.SF_TIER_NOTE ||
        "Running: " +
          e[t.lvl] +
          (t.choice === "auto"
            ? " (auto, this device)"
            : t.url
              ? " (from the URL)"
              : "") +
          (({ saver: "safe", mobile: "mobile" }[t.lvl] || "desktop") !==
          globalThis.SF_TIER
            ? " \xB7 the city's detail on next start"
            : ""));
    let o = gi("gfxAsk");
    o &&
      (o.classList.toggle("on", !!this.ask),
      this.ask &&
        (o.querySelector("span").textContent =
          "Resolution, shadows, effects and traffic switched. Some changes (the city's detail, textures) apply on next start."));
    for (let a of document.querySelectorAll("[data-fps]"))
      a.setAttribute(
        "aria-checked",
        String(+a.dataset.fps === (globalThis.SF_FPS | 0)),
      );
  }
  hud() {
    let t = this.v;
    for (let [n, o, a] of [
      ["aABS", "abs", t.aid.abs],
      ["aTCS", "tcs", t.aid.tcs],
      ["aESP", "esp", t.aid.esp],
    ]) {
      let r = gi(n);
      r &&
        (r.classList.toggle("off", !t.assists[o]),
        r.classList.toggle("act", t.assists[o] && a > 0.05));
    }
    let e = t.shiftBlocked > 0,
      s = this.blockedShown;
    return ((this.blockedShown = e), e && !s);
  }
};
