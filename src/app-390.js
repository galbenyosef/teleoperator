// app 390 — classlist
// Lines 192182-192455 of readable/app.pretty.js (statement-aligned).
var BE = class {
  constructor({ touch: t = !1 } = {}) {
    if (!document.getElementById("chCss")) {
      let r = document.createElement("style");
      ((r.id = "chCss"), (r.textContent = Ywt), document.head.appendChild(r));
    }
    this.touch = t;
    let e = (this.wEl = document.createElement("div"));
    ((e.id = "chWallet"),
      (e.innerHTML =
        '<div class="w" title="Cash ($): earned in the city, spent on parts in the Garage. Not mindblown tokens (\u25C6) - those pay for AI wraps and cars."><small>CASH</small><b>$0</b></div><div class="pop"></div>'),
      document.body.appendChild(e),
      e.querySelector(".w").addEventListener("click", (r) => {
        (r.stopPropagation(), this.onWallet?.());
      }),
      (this.wB = e.querySelector(".w b")),
      (this.wPop = e.querySelector(".pop")),
      (this.shown = null),
      (this.to = 0),
      (this.from = 0),
      (this.animT = 1));
    let s = (this.pEl = document.createElement("div"));
    ((s.id = "chPrompt"),
      (s.className = "ds-panel ds-prompt ds-pop"),
      Jo("bc", s, 1),
      s.addEventListener("click", (r) => {
        r.target.closest("[data-go]") && (r.stopPropagation(), this.onGo?.());
      }));
    let n = (this.oEl = document.createElement("div"));
    ((n.id = "chObj"),
      (n.className = "ds-panel ds-card ds-pop"),
      Jo("tc", n, -2));
    let o = (this.rEl = document.createElement("div"));
    ((o.id = "chRes"),
      (o.className = "ds-panel"),
      o.setAttribute("role", "dialog"),
      o.setAttribute("aria-live", "polite"),
      document.body.appendChild(o),
      o.addEventListener("click", (r) => {
        let l = r.target.closest("[data-r]");
        if (!l) return;
        r.stopPropagation();
        let c = l.dataset.r;
        (this.hideResult(),
          c === "retry"
            ? this.onRetry?.()
            : c === "garage" && this.onGarage?.());
      }));
    let a = (this.fEl = document.createElement("div"));
    ((a.id = "chFilter"),
      document.body.appendChild(a),
      a.addEventListener("click", (r) => {
        let l = r.target.closest("[data-c]");
        l && (r.stopPropagation(), this.onFilter?.(l.dataset.c));
      }),
      (this.resT = 0),
      (this._pk = ""),
      (this._ok = ""));
  }
  wallet(t, e, s = 0) {
    this.wEl.classList.toggle("on", !!t);
    let n = s > 0.5 ? Math.round(s) : 0;
    if (n !== this._pend) {
      this._pend = n;
      let o = this.wEl.querySelector(".pd");
      (o ||
        ((o = document.createElement("i")),
        (o.className = "pd"),
        this.wEl.querySelector(".w").after(o)),
        (o.textContent = n ? "+" + Fp(n) + " pending" : ""),
        (o.hidden = !n));
    }
    (document.body.classList.toggle("chwallet", !!t),
      !(!t || e === null || e === void 0) &&
        (this.shown === null
          ? ((this.shown = this.to = this.from = e),
            (this.wB.textContent = Fp(e)))
          : Math.abs(e - this.to) > 0.5 &&
            ((this.from = this.shown),
            (this.to = e),
            (this.animT = 0),
            this.wEl.classList.toggle("up", e > this.from),
            this.wEl.classList.toggle("dn", e < this.from))));
  }
  pop(t, e) {
    ((this.wPop.className = "pop on" + (t < 0 ? " neg" : "")),
      (this.wPop.innerHTML = `${t < 0 ? "\u2212" : "+"}${Fp(Math.abs(t)).replace("\u2212", "")}<small>${or(e)}</small>`),
      clearTimeout(this._pt),
      (this._pt = setTimeout(() => this.wPop.classList.remove("on"), 3600)));
  }
  tick(t) {
    if (this.animT < 1) {
      let e = Math.min(1.8, 0.6 + Math.abs(this.to - this.from) / 4e3);
      this.animT = Math.min(1, this.animT + t / e);
      let s = 1 - (1 - this.animT) ** 3;
      ((this.shown = this.from + (this.to - this.from) * s),
        (this.wB.textContent = Fp(this.shown)),
        this.animT >= 1 &&
          setTimeout(() => this.wEl.classList.remove("up", "dn"), 500));
    }
    this.resT > 0 && (this.resT -= t) <= 0 && this.hideResult();
  }
  prompt(t, e = null) {
    let s = t
      ? t.id +
        "|" +
        (e?.why || "") +
        "|" +
        (e?.rec?.s || 0) +
        "|" +
        (e?.worth || 0)
      : "";
    if (s !== this._pk) {
      if (((this._pk = s), t)) {
        let n = xi[t.cat],
          o = e?.rec,
          a = o?.s
            ? "\u2605".repeat(o.s) + "\u2606".repeat(3 - o.s)
            : "not done";
        (this.pEl.style.setProperty("--c", n.col),
          (this.pEl.innerHTML = `${wr(Zm(t.cat, t.kind))}<div class="tx"><div class="k" style="color:${n.col}">${or(n.label)} \xB7 ${rN[t.tier]}${e?.featured ? ' \xB7 <span style="color:var(--ch-gold)">Featured \xD71.75</span>' : ""}</div><div class="n">${or(t.name)}</div><div class="s">${e?.why ? `<em>${or(e.why)}</em>` : `<i>${a}</i> \xB7 up to <b>${Fp(e?.worth || 0)}</b> \xB7 ${or(n.ask)}`}</div></div><button type="button" data-go style="background:${n.col};color:${n.ink || "#0b0c0e"}"${e?.why ? " disabled" : ""}>${this.touch ? "" : "<kbd>E</kbd>"}Start</button>`));
      }
      this.pEl.classList.toggle("on", !!t);
    }
  }
  objective(t, e = {}) {
    if (!t) {
      this.oEl.classList.contains("on") &&
        (this.oEl.classList.remove("on", "ph"), (this._ok = ""));
      return;
    }
    let s = t.d,
      n = xi[s.cat],
      o = "",
      a = !1,
      r = "",
      l = "",
      c = "",
      h = "",
      f = (d) =>
        d < 1e3 ? Math.round(d) + " m" : (d / 1e3).toFixed(1) + " km";
    if (t.kind === "stops") {
      let d = s.cat === "taxi" ? t.clock : t.limit - t.t;
      ((o = m0(d)), (a = d < 15));
      let p = t.legs[t.i]?.S,
        m = t.legs.length;
      ((r =
        s.cat === "food"
          ? "Deliver to " + (p?.addr || "the address")
          : s.cat === "vip"
            ? "Drive the VIP to " + (p?.addr || "the address")
            : s.cat === "taxi"
              ? `Fare ${t.i + 1} of ${m} \xB7 drop at ${p?.addr || ""}`
              : `Parcel ${t.i + 1} of ${m} \xB7 ${p?.addr || ""}`),
        (l =
          t.dist !== void 0
            ? f(t.dist) + (t.dist < 40 ? " \xB7 stop at the kerb" : "")
            : ""),
        s.cat === "food" &&
          (c = `<div style="--mc:#ff8a3d">Food heat<i><u style="width:${(t.temp * 100).toFixed(0)}%"></u></i></div><div style="--mc:${t.care > 0.6 ? "#7dffb0" : "#ff7070"}">No spills<i><u style="width:${(t.care * 100).toFixed(0)}%"></u></i></div>`),
        s.cat === "vip" &&
          (c = `<div style="--mc:${t.care > 0.6 ? "#7dffb0" : "#ff7070"}">VIP comfort<i><u style="width:${(t.care * 100).toFixed(0)}%"></u></i></div>`),
        (h = `<b>\u2605\u2605\u2605</b> by ${m0(t.par)} \xB7 <b>\u2605\u2605</b> by ${m0(t.par * 1.2)}`));
    } else if (t.kind === "gates")
      ((o = m0(t.t)),
        (a = t.limit - t.t < 15),
        (r = t.cps[t.i]?.fin
          ? "Finish"
          : `Checkpoint ${t.i + 1} of ${t.cps.length}`),
        (l = t.dist !== void 0 ? f(t.dist) : ""),
        (h = `<b>\u2605\u2605\u2605</b> under ${m0(t.par)} \xB7 <b>\u2605\u2605</b> under ${m0(t.par * 1.2)} \xB7 out at ${m0(t.limit)}`));
    else if (t.kind === "police")
      ((o = m0(t.limit - t.t)),
        (a = t.limit - t.t < 15),
        (r = e.pursuit
          ? e.cool > 0
            ? `Out of sight \xB7 cooldown ${Math.ceil(e.coolLeft || 0)} s`
            : "Lose them - break the line of sight"
          : "Police responding\u2026"),
        (l = "Heat " + s.heat),
        (h = `<b>\u2605\u2605\u2605</b> in ${Math.round(t.limit * 0.45)} s \xB7 <b>\u2605\u2605</b> in ${Math.round(t.limit * 0.7)} s`));
    else if (t.kind === "nearmiss") {
      ((o = m0(t.limit - t.t)),
        (a = t.limit - t.t < 10),
        (r = t.count + " near miss" + (t.count === 1 ? "" : "es")),
        (l = "pass the traffic close and fast"));
      let d = s.stars;
      h = `<b>\u2605</b> ${d[0]} \xB7 <b>\u2605\u2605</b> ${d[1]} \xB7 <b>\u2605\u2605\u2605</b> ${d[2]}`;
    } else if (t.kind === "photo")
      ((o = m0(t.limit - t.t)),
        (r = e.photo
          ? t.inFrame
            ? "Hold it - " +
              (t.score > 0.7 ? "perfect" : t.score > 0.4 ? "good" : "centre it")
            : "Find " + s.look.name + " in the frame"
          : "Press F - photo mode - and frame " + s.look.name),
        (l = ""),
        (h =
          "<b>\u2605\u2605\u2605</b> centred \xB7 <b>\u2605\u2605</b> near the middle"));
    else if (t.kind === "race") {
      this.objective(null);
      return;
    }
    let u = [o, a, r, l, c, h, t.paused, e.l5].join("|");
    u !== this._ok &&
      ((this._ok = u),
      this.oEl.style.setProperty("--c", n.col),
      (this.oEl.innerHTML = `<div class="top"><div class="k">${or(n.label)} \xB7 ${or(s.name)}</div><div class="clk${a ? " low" : ""}">${o}</div></div><div class="o">${or(r)}<small>${or(l)}</small></div>${c ? `<div class="m">${c}</div>` : ""}<div class="st">${h}${e.l5 ? " \xB7 Level 5: one star at most" : ""}</div><div class="ab">${this.touch ? "" : "E twice: abandon"}</div>`),
      this.oEl.classList.add("on"),
      this.oEl.classList.toggle("ph", t.kind === "photo"));
  }
  result(t) {
    let e = t.d,
      s = xi[e.cat];
    (this.rEl.style.setProperty("--c", s.col),
      this.rEl.style.setProperty("--ink2", s.ink || "#0b0c0e"));
    let n = (t.lines || [])
        .map(
          ([a, r]) =>
            `<tr><td>${or(a)}</td><td${r < 0 ? ' class="neg"' : ""}>${r < 0 ? "\u2212" : "+"}${Fp(Math.abs(r)).replace("\u2212", "")}</td></tr>`,
        )
        .join(""),
      o = t.type === "result";
    ((this.rEl.innerHTML =
      `<div class="k">${or(s.label)} \xB7 ${rN[e.tier]}${t.featured ? " \xB7 Featured" : ""}</div><h3>${or(e.name)}</h3>` +
      (o
        ? `<div class="v"><b>${or(t.valText)}</b><small>${or(t.valSub || "")}</small></div><div class="stars">${[0, 1, 2].map((a) => `<i data-i="${a}">\u2605</i>`).join("")}</div>
        <table>${n}<tr class="tot"><td>Cash</td><td>+${Fp(t.cash)}</td></tr></table><div class="xp">+<b>${(t.xp || 0).toLocaleString("en-US")} XP</b>${t.newBest ? " \xB7 new best" : ""}${t.l5 ? " \xB7 Level 5 drove: one star" : ""}</div>`
        : `<div class="why">${or(t.whyText)}</div>`) +
      (t.wallet !== null && t.wallet !== void 0
        ? `<div class="w">Wallet <b>${Fp(t.wallet)}</b> cash<em>$ buys parts in the Garage${t.next ? " \xB7 next: " + or(t.next) : ""} \xB7 mindblown tokens (\u25C6) are separate - AI wraps &amp; cars</em></div>`
        : "") +
      `<div class="row"><button type="button" data-r="retry">${o ? "Again" : "Retry"}</button>${t.wallet !== null && t.wallet !== void 0 ? '<button type="button" data-r="garage">Garage</button>' : ""}<button type="button" class="go" data-r="close">Continue${this.touch ? "" : "<kbd>Enter</kbd>"}</button></div>`),
      this.rEl.classList.add("on"),
      (this.resT = o ? 10 : 6),
      o &&
        this.rEl.querySelectorAll(".stars i").forEach((a, r) => {
          r < t.stars && setTimeout(() => a.classList.add("y"), 250 + r * 260);
        }));
  }
  hideResult() {
    (this.rEl.classList.remove("on"), (this.resT = 0));
  }
  get resultOn() {
    return this.rEl.classList.contains("on");
  }
  filters(t, e, s) {
    let n = JSON.stringify([t, [...e], s]);
    if (n !== this._fk) {
      ((this._fk = n),
        (this.fEl.innerHTML =
          `<h5><span>Challenges</span><span>${t.reduce((o, a) => o + a.done, 0)} / ${t.reduce((o, a) => o + a.n, 0)}</span></h5>` +
          t
            .map(
              (o) =>
                `<button type="button" data-c="${o.cat}" aria-pressed="${e.has(o.cat)}" title="${or(xi[o.cat].label)}: ${o.done} of ${o.n} done"><i class="cv" data-cat="${o.cat}"></i><span>${or(xi[o.cat].short)}</span><small>${o.done}/${o.n}</small></button>`,
            )
            .join("") +
          `<button type="button" data-c="featured" class="feat" aria-pressed="${e.has("featured")}" title="Today's featured: \xD71.75"><span>\u2605 Featured only</span><small>${s}</small></button><button type="button" class="all" data-c="all" aria-pressed="true">All / none</button>`));
      for (let o of this.fEl.querySelectorAll("i.cv"))
        o.replaceWith(
          Jwt(
            o.dataset.cat,
            o.dataset.cat === "speed"
              ? "trap"
              : o.dataset.cat === "collect"
                ? "xpboard"
                : o.dataset.cat,
            22,
          ),
        );
    }
  }
};
