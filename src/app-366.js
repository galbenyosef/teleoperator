// app 366 — math
// Lines 176839-177433 of readable/app.pretty.js (statement-aligned).
var nT = class {
  constructor(t) {
    (Object.assign(this, t),
      (this.mb = window.mindblown),
      (this.p = eT()),
      (this.savedAt = 0),
      (this.scope = "browser"),
      (this.ready = !1),
      (this._last = { x: 0, z: 0 }),
      (this._bucket = Ua.CAP),
      (this._w = 0),
      (this._dr = 0),
      (this.fails = 0),
      (this.pending = !1),
      (this.held = 0),
      addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && this.save(!0);
      }),
      addEventListener("pagehide", () => this.save(!0)),
      addEventListener("online", () => {
        (this.pending || this.needLoad) && this.save(!0);
      }),
      (this._cashL = []),
      (this._seq = 0),
      (this._dev = int().replace(/[^\w]/g, "").slice(0, 8)),
      this.police &&
        (this.police.onCash = (s, n) => this.credit(s, n, "police")));
    let e = this.rides;
    if (e?.emit) {
      let s = e.emit.bind(e);
      e.emit = (n, i = {}) => {
        s(n, i);
        try {
          this.rideEvent(n, i);
        } catch (a) {
          console.warn("profile", a);
        }
      };
    }
  }
  get signedIn() {
    return this.scope === "account" && (this.mb?.viewer?.signedIn ?? !0);
  }
  rideEvent(t, e) {
    if (
      (t === "bank" &&
        ((this.p.best.bounty = Math.min(
          Ua.BOUNTY,
          Math.max(this.p.best.bounty, e.pts || 0),
        )),
        e.cash > 0 && this.credit(e.cash, "Street bounty banked", "fare")),
      t === "dropoff")
    ) {
      let s = e.summary || {};
      ((this.p.best.bounty = Math.min(
        Ua.BOUNTY,
        Math.max(this.p.best.bounty, s.bounty || 0),
      )),
        s.total > 0 &&
          this.credit(
            s.total,
            (s.style === "street" ? "Street ride" : "Fare") +
              (s.name ? " \xB7 " + s.name : "") +
              (s.stars ? " " + "\u2605".repeat(s.stars) : ""),
            "fare",
          ),
        this.save(!0),
        this.board?.submit(!0));
    }
  }
  async load() {
    if (
      (await new Promise((t) => setTimeout(t)),
      await this._load(),
      !this._sub &&
        this.mb?.viewer?.onchange &&
        ((this._sub = !0),
        this.mb.viewer.onchange((t) => {
          let e = t?.signedIn ? "a:" + t.id : "g";
          if (this._who === void 0) {
            this._who = e;
            return;
          }
          e !== this._who && ((this._who = e), this.rescope());
        })),
      this._arrive)
    ) {
      let t = this._arrive;
      ((this._arrive = null), this.arrive(t));
    }
    return this.p;
  }
  async _load() {
    let t = null,
      e = "browser",
      s = !1;
    if (this.mb?.load)
      try {
        let a = await this.mb.load(Hv);
        ((this.rev = a), (e = a?.scope || "account"), (t = a?.value));
      } catch (a) {
        (console.warn("profile load", a?.reason || a),
          (s = !0),
          (e = this.mb.viewer?.signedIn ? "account" : "browser"));
      }
    else t = B2(snt);
    let n = Oh(t),
      i = null;
    if (s && e === "account") {
      n = Oh(B2(l4 + this.who())) || eT();
      let a = Oh(B2(yB + this.who()));
      a && l1(n, a);
    }
    if (((n ||= eT()), (this.needLoad = s), e === "account")) {
      let a = Oh(B2(l4 + this.who()));
      a && !s && (l1(n, a), (this.pending = !0));
      let r = Oh(B2(O2));
      r && !s && ((i = rnt(n, r)), i && Md(O2, r));
    } else {
      let a = this.mb ? Oh(B2(O2)) : null;
      (a &&
        (!t || !n.gid || a.gid === n.gid) &&
        (t ? ((n.gid ||= a.gid), l1(n, a)) : (n = a)),
        (n.gid ||= int()));
    }
    return (
      (this.p = n),
      (this.scope = e),
      (this._key = null),
      e === "account" && !s && Md(yB + this.who(), n),
      this.apply(),
      (this.ready = !0),
      i &&
        (i.cash > 0 || i["taxi.rides"] > 0) &&
        this.toast?.(
          "Guest progress added to your account",
          "+$" +
            Math.round(i.cash || 0).toLocaleString() +
            " \xB7 " +
            i["taxi.rides"] +
            " ride" +
            (i["taxi.rides"] === 1 ? "" : "s"),
        ),
      i?.cash > 0 && this.emitCash({ a: i.cash, why: "Guest progress added" }),
      (i || this.pending) && this.save(!0),
      this.board?.submit(!0),
      n
    );
  }
  who() {
    return (this.mb?.viewer?.id || "account")
      .replace(/[^\w:-]/g, "")
      .slice(0, 64);
  }
  async rescope() {
    if (!this._rescoping) {
      this._rescoping = !0;
      try {
        let t = null,
          e = this.scope + "/" + this.who();
        (this.ready &&
          ((t = JSON.parse(JSON.stringify(this.snapshot()))),
          (t.updated = Date.now()),
          this.scope === "browser" && this.mb
            ? Md(O2, t)
            : this.scope === "account" &&
              this.pending &&
              Md(l4 + this.who(), t)),
          (this.ready = !1),
          await this._load(),
          this.board?.reset(),
          t &&
            this.scope + "/" + this.who() === e &&
            (l1(this.p, t), this.apply(), this.save(!0)));
      } finally {
        this._rescoping = !1;
      }
    }
  }
  apply() {
    let t = this.p;
    (this.rides &&
      ((this.rides.total = t.taxi.total),
      (this.rides.rides = t.taxi.rides),
      (this.rides.stars = t.taxi.stars.slice(-200))),
      this.police &&
        ((this.police.bounty = t.police.bounty),
        (this.police.escapes = t.police.escapes),
        (this.police.busts = t.police.busts)));
    let e = this.taxi?.();
    (e &&
      ((e.wallet = () => this.wallet()),
      (e.lbHint = () => this.board?.hint() || ""),
      e.total?.()),
      (this._w = this.wallet()));
    let s = t.settings;
    if (s && Object.keys(s).length) {
      for (let n of nnt)
        if (typeof s.store?.[n] == "string")
          try {
            localStorage.getItem(n) !== s.store[n] &&
              localStorage.setItem(n, s.store[n]);
          } catch {}
      this.onSettings?.(s);
    }
    this.onCustom?.(t.custom);
  }
  custom(t) {
    let e = this.p.custom?.[t];
    return e ? (e.paint ?? null) : void 0;
  }
  setCustom(t, e) {
    let s = (this.p.custom ||= {}),
      n = s[t]?.tune;
    ((s[t] = { paint: e || null, t: Date.now() }),
      n && (s[t].tune = n),
      this.save(!0));
  }
  tune(t) {
    let e = this.p.custom?.[t];
    return e ? (e.tune ?? null) : void 0;
  }
  setTune(t, e) {
    let s = (this.p.custom ||= {}),
      n = pnt(e);
    ((s[t] = { paint: s[t]?.paint ?? null, t: Date.now() }),
      n && (s[t].tune = n),
      this.save(!0));
  }
  spend(t, e = "Garage") {
    return t > 0
      ? !Number.isFinite(t) || this.wallet() + 1e-6 < t
        ? !1
        : (this.post(-t, e, "spend"), this.save(!0), !0)
      : !0;
  }
  ride() {
    return this.p.ride || null;
  }
  cars() {
    return this.p.cars || [];
  }
  setCars(t, e) {
    ((this.p.cars = h4(t)),
      e !== void 0 && (this.p.mine = e),
      (this.p.updated = Date.now()),
      this.save(!0));
  }
  setRide(t) {
    ((this.p.ride = Ul(t)),
      this.p.ride && (this.p.car = "custom"),
      (this.p.updated = Date.now()),
      this.save(!0));
  }
  addXP(t) {
    if (!(t > 0) || !Number.isFinite(t)) return this.p.xp;
    let e = performance.now();
    ((this._xb = Math.min(
      Ua.XPCAP,
      (this._xb ?? Ua.XPCAP) +
        (Ua.XPRATE * Math.max(0, e - (this._xbT ?? e))) / 1e3,
    )),
      (this._xbT = e));
    let s = Math.min(t, this._xb);
    return (
      (this._xb -= s),
      t - s > 0.5 &&
        ((this.xpHeld = (this.xpHeld || 0) + t - s),
        console.warn(
          "profile: " +
            Math.round(t - s) +
            " XP over the plausible rate held back",
        )),
      (this.p.xp = Zo((this.p.xp || 0) + s)),
      this.p.xp
    );
  }
  prize(t, e = "Level-up wheelspin") {
    return !(t > 0) || !Number.isFinite(t)
      ? 0
      : ((t = Math.min(t, 2e4)),
        (this.p.race.money = Go(this.p.race.money + t)),
        (this.p.earned = Go(this.p.earned + t)),
        this.post(t, e, "prize"),
        this.save(!0),
        t);
  }
  setRoads(t) {
    this.p.roads = kB(this.p.roads, gnt(t));
  }
  addBoard(t) {
    ((this.p.boards = zB(this.p.boards, bnt([t]))), this.save(!0));
  }
  chRec(t) {
    return this.p.ch?.best?.[t] || null;
  }
  chResult(t, e, s = 0, n = "Challenge") {
    let i = (this.p.ch ||= { cash: 0, runs: 0, best: {} });
    i.best ||= {};
    let a = xnt({ [t]: e })[t];
    a && (i.best[t] = a);
    let r = 0;
    return (
      s > 0 &&
        Number.isFinite(s) &&
        ((r = Go(Math.min(s, Ua.CAP))),
        (this.p.race.money = Go(this.p.race.money + r)),
        this.credit(r, n, "challenge"),
        (i.cash = Go((i.cash || 0) + r))),
      (i.runs = (i.runs || 0) + 1),
      this.save(!0),
      this.board?.submit(!0),
      r
    );
  }
  fine(t, e = "Busted \xB7 police fine") {
    let s = Go(Math.max(0, Math.min(t, this.wallet())));
    return (s > 0 && this.post(-s, e, "fine"), this.save(!0), s);
  }
  ledger() {
    return this.p.cash?.log || [];
  }
  onCash(t) {
    return (
      this._cashL.push(t),
      () => {
        this._cashL = this._cashL.filter((e) => e !== t);
      }
    );
  }
  emitCash(t) {
    for (let e of this._cashL)
      try {
        e(t);
      } catch (s) {
        console.warn("cash", s);
      }
    this.taxi?.()?.total?.();
  }
  post(t, e, s = "", n = null) {
    let i = (this.p.cash ||= { base: 0, baseT: 0, moves: 0, log: [] }),
      a = Date.now(),
      r = {
        id: this._dev + "." + a.toString(36) + "." + (this._seq++).toString(36),
        t: a,
        a: Go(t),
        why: String(e || "").slice(0, 60),
        k: s,
      };
    return (
      n && ((r.pend = 1), (r.held = n)),
      i.log.push(r),
      c4(i),
      this.emitCash({ ...r, bal: this.wallet() }),
      r
    );
  }
  credit(t, e, s = "") {
    if (((t = Go(+t)), !(t > 0) || !Number.isFinite(t))) return 0;
    let n = Go(Math.min(t, this._bucket));
    return (
      (this._bucket -= n),
      n > 0 && ((this.p.earned = Go(this.p.earned + n)), this.post(n, e, s)),
      t - n > 0.004 &&
        ((this.held = Go(this.held + t - n)),
        console.warn(
          "profile: $" +
            Math.round(t - n) +
            " pending (over the plausible rate)",
        ),
        this.post(
          t - n,
          e,
          s,
          "Over $" +
            Ua.CAP.toLocaleString() +
            " in a short time - released as the limit refills",
        )),
      t
    );
  }
  wallet() {
    return wnt(this.p.cash);
  }
  pendingCash() {
    return F8t(this.p.cash);
  }
  guard(t) {
    this._bucket = Math.min(Ua.CAP, this._bucket + Ua.RATE * t);
    for (let e of this.p.cash?.log || [])
      if (e.pend) {
        if (e.a > this._bucket + 0.004) {
          if (e.a > Ua.CAP) continue;
          break;
        }
        ((this._bucket -= e.a),
          delete e.pend,
          delete e.held,
          (e.rel = Date.now()),
          (this.held = Math.max(0, Go(this.held - e.a))),
          (this.p.earned = Go(this.p.earned + e.a)),
          this.emitCash({ ...e, released: !0, bal: this.wallet() }),
          this.save(!0));
      }
  }
  arrive({ skipPlace: t = !1, skipCar: e = !1 } = {}) {
    if (!this.ready) {
      this._arrive = { skipPlace: t, skipCar: e };
      return;
    }
    let s = this.p;
    (e ||
      (s.car === "custom" && s.ride && this.onRide?.(s.ride),
      s.car && s.car !== this.carId() && this.swapCar?.(s.car)),
      !t &&
        s.pos &&
        Number.isFinite(s.pos.x) &&
        this.place?.({ x: s.pos.x, z: s.pos.z, psi: s.pos.psi }),
      s.updated &&
        this.toast?.(
          "Welcome back",
          "$" +
            Math.round(this.wallet()).toLocaleString() +
            (this.scope === "account"
              ? " \xB7 saved to your account"
              : " \xB7 saved in this browser"),
        ));
  }
  raceResult({ place: t, of: e, net: s, ms: n, id: i }) {
    let a = this.p.race,
      r = (e > 1 && _8t[s ? "net" : "solo"][t - 1]) || 0;
    return (
      a.played++,
      t === 1 && e > 1 && a.wins++,
      t <= 3 && e > 2 && a.podiums++,
      (a.money += r),
      i &&
        n > 0 &&
        (!a.best[i] || n < a.best[i]) &&
        (a.best[i] = Math.round(n)),
      r > 0 &&
        this.credit(
          r,
          "Race \xB7 " +
            (["1st", "2nd", "3rd"][t - 1] || t + "th") +
            " of " +
            e,
          "race",
        ),
      this.save(!0),
      this.board?.submit(!0),
      r
    );
  }
  update(t, e) {
    if (!this.ready) return;
    let s = this.v,
      n = Math.hypot(s.pos.x - this._last.x, s.pos.z - this._last.z),
      i = this.p.best;
    if (
      (n > 0.5 && n < 50 && (this.p.km += n / 1e3),
      (this._last.x = s.pos.x),
      (this._last.z = s.pos.z),
      this.guard(Math.min(t, 1)),
      e && !this.noPos?.())
    ) {
      let a = s.kmh || 0;
      (a > i.kmh && a < Ua.KMH && n < 50 && (i.kmh = Math.round(a * 10) / 10),
        (s.drift || 0) > 0.45 && a > 25
          ? (this._dr += t)
          : (this._dr > i.drift &&
              (i.drift = Math.min(Ua.DRIFT, Math.round(this._dr * 10) / 10)),
            (this._dr = 0)));
    }
    e &&
      performance.now() - this.savedAt > z8t &&
      (this.save(), this.board?.submit());
  }
  snapshot() {
    let t = this.p,
      e = this.v;
    (this.rides &&
      (t.taxi = {
        total: Go(this.rides.total),
        rides: this.rides.rides,
        stars: (this.rides.stars || []).slice(-200),
      }),
      this.police &&
        (t.police = {
          bounty: this.police.bounty,
          escapes: this.police.escapes,
          busts: this.police.busts,
        }),
      this.noPos?.() ||
        (t.pos = {
          x: Math.round(e.pos.x * 10) / 10,
          z: Math.round(e.pos.z * 10) / 10,
          psi: Math.round(e.psi * 1e3) / 1e3,
        }),
      (t.car = this.carId()),
      (t.km = Math.round(t.km * 100) / 100));
    let s = {};
    for (let i of nnt)
      try {
        let a = localStorage.getItem(i);
        a !== null && a.length < 4e3 && (s[i] = a);
      } catch {}
    t.settings = { ...t.settings, store: s };
    let n = this.mph?.();
    return (typeof n == "boolean" && (t.settings.mph = n), t);
  }
  async save(t = !1) {
    if (!this.ready) return;
    if (this._saving) {
      t && (this._again = !0);
      return;
    }
    if (!t && performance.now() - this.savedAt < 1e4) return;
    let e = this.snapshot(),
      s = JSON.stringify({ ...e, updated: 0 });
    if (s === this._key && !this.pending && !this.needLoad) {
      this.savedAt = performance.now();
      return;
    }
    if (
      ((this._key = s),
      (this.savedAt = performance.now()),
      (e.updated = Date.now()),
      this.scope === "browser" && this.mb && Md(O2, e),
      !this.mb?.save)
    ) {
      Md(snt, e);
      return;
    }
    ((this._saving = !0), clearTimeout(this._retryT));
    try {
      (await this.put(),
        this.pending && R8t(l4 + this.who()),
        (this.pending = !1),
        (this.fails = 0),
        this.scope === "account" && Md(yB + this.who(), this.p));
    } catch (n) {
      (console.warn("profile save", n?.reason || n),
        this.scope === "account" &&
          (Md(l4 + this.who(), this.p), (this.pending = !0)),
        (this._key = null),
        this.fails++,
        n?.reason !== "QUOTA_EXCEEDED" &&
          (this._retryT = setTimeout(
            () => this.save(!0),
            Math.min(6e4, 4e3 * 2 ** Math.min(4, this.fails - 1)),
          )));
    } finally {
      ((this._saving = !1), this._again && ((this._again = !1), this.save(!0)));
    }
  }
  async put() {
    let t = this.mb;
    if (this.needLoad) {
      let e = await t.load(Hv);
      if ((e?.scope || "account") !== this.scope) {
        setTimeout(() => this.rescope());
        return;
      }
      ((this.needLoad = !1), l1(this.p, Oh(e?.value)));
      let s = this.scope === "account" ? Oh(B2(O2)) : null;
      (s && rnt(this.p, s) && Md(O2, s), this.apply());
    }
    try {
      this.rev = await t.save(Hv, this.snapshot());
    } catch (e) {
      if (e?.reason === "REVISION_CONFLICT" && e.current)
        (l1(
          this.p,
          Oh(e.current.value !== void 0 ? e.current.value : e.current),
        ),
          this.apply(),
          (this.rev = await t.save(Hv, this.snapshot())));
      else if (e?.reason === "LOAD_FIRST") {
        let s = await t.load(Hv);
        if ((s?.scope || "account") !== this.scope) {
          setTimeout(() => this.rescope());
          return;
        }
        (l1(this.p, Oh(s?.value)),
          this.apply(),
          (this.rev = await t.save(Hv, this.snapshot())));
      } else if (e?.reason === "AUTH_CHANGED") setTimeout(() => this.rescope());
      else throw e;
    }
  }
  merge(t) {
    (l1(this.p, Oh(t)), this.apply());
  }
};
