// app 351 — limit
// Lines 171293-171515 of readable/app.pretty.js (statement-aligned).
var ayt = 3e4,
  Stt = 4e3,
  RF = 6e4,
  ktt = 20,
  _tt = (i) => "$" + Math.round(i || 0).toLocaleString(),
  Uz = (i) =>
    String(i).replace(
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
  PF = [
    {
      id: "cash",
      label: "Cash",
      long: "Cash earned",
      of: (i) => Math.floor(i.earned || 0),
      fmt: _tt,
    },
    {
      id: "races_won",
      label: "Races won",
      long: "Races won",
      of: (i) => i.race?.wins || 0,
      fmt: (i) => String(i),
    },
    {
      id: "best_bounty",
      label: "Bounty",
      long: "Biggest bounty",
      of: (i) => Math.round(i.best?.bounty || 0),
      fmt: (i) => Math.round(i).toLocaleString() + " pts",
    },
    {
      id: "xp",
      label: "Level",
      long: "Player level",
      of: (i) => Math.floor(i.xp || 0),
      fmt: (i) =>
        "Lv " + eh(i).level + " \xB7 " + Math.round(i).toLocaleString() + " XP",
    },
    {
      id: "longest_drift",
      label: "Drift",
      long: "Longest drift",
      of: (i) => Math.round((i.best?.drift || 0) * 10) / 10,
      fmt: (i) => (+i).toFixed(1) + " s",
    },
  ],
  Gz = class {
    constructor(t, e = {}) {
      ((this.pr = t),
        (this.el = e),
        (this.mb = window.mindblown),
        (this.metric = "cash"),
        (this.limit = ktt),
        (this.sent = {}),
        (this.at = 0),
        (this.cache = new Map()),
        (this.mineC = new Map()),
        (t.board = this));
      for (let s of e.tabs || [])
        s.onclick = () => {
          ((this.metric = s.dataset.lb), (this.limit = ktt), this.render(!0));
        };
      e.more &&
        (e.more.onclick = () => {
          ((this.limit = Math.min(100, this.limit + 30)), this.render(!0));
        });
    }
    get ok() {
      return !!this.mb?.leaderboard?.top;
    }
    reset() {
      ((this.sent = {}), this.cache.clear(), this.mineC.clear());
    }
    async submit(t = !1) {
      let e = this.mb?.leaderboard;
      if (!e?.submit || !this.pr.ready || !this.pr.signedIn || this._busy)
        return;
      let s = Date.now();
      if (s - this.at < (t ? Stt : ayt)) {
        t &&
          (clearTimeout(this._t),
          (this._t = setTimeout(() => this.submit(!0), Stt)));
        return;
      }
      ((this.at = s), (this._busy = !0));
      try {
        for (let n of PF) {
          let o = n.of(this.pr.p);
          if (!(!(o > 0) || o <= (this.sent[n.id] ?? 0)))
            try {
              (await e.submit(n.id, o),
                (this.sent[n.id] = o),
                this.cache.delete(n.id + ":" + this.limit),
                this.mineC.delete(n.id));
            } catch (a) {
              console.warn(
                "leaderboard submit",
                n.id,
                a?.reason || a?.message || a,
              );
              break;
            }
        }
      } finally {
        this._busy = !1;
      }
      this.mine("cash").then(() => this.hintEl());
    }
    async top(t, e = this.limit) {
      let s = t + ":" + e,
        n = this.cache.get(s);
      if (n && Date.now() - n.t < RF) return n.rows;
      let o = await this.mb.leaderboard.top(t, { limit: e });
      return (this.cache.set(s, { t: Date.now(), rows: o || [] }), o || []);
    }
    async mine(t) {
      if (!this.mb?.leaderboard?.mine || !this.pr.signedIn) return null;
      let e = this.mineC.get(t);
      if (e && Date.now() - e.t < RF) return e.row;
      try {
        let s = await this.mb.leaderboard.mine(t);
        return (this.mineC.set(t, { t: Date.now(), row: s }), s);
      } catch {
        return e?.row || null;
      }
    }
    hint() {
      if (!this.ok) return "";
      if (!this.pr.signedIn)
        return "Sign in to keep your cash and join the leaderboard";
      let t = this.mineC.get("cash")?.row;
      return (
        (t?.rank ? "#" + t.rank + " on the leaderboard \xB7 " : "") +
        _tt(this.pr.p.earned) +
        " earned \xB7 Leaderboard in the menu"
      );
    }
    hintEl() {
      let t = document.getElementById("txLb");
      t && (t.textContent = this.hint());
    }
    async render(t = !1) {
      let e = this.el;
      if (!e.list) return;
      for (let f of e.tabs || [])
        f.setAttribute("aria-checked", String(f.dataset.lb === this.metric));
      let s = PF.find((f) => f.id === this.metric) || PF[0],
        n = this.pr.p;
      if (!this.ok) {
        ((e.list.innerHTML =
          '<li class="lbE">The leaderboard is on mindblown.ai</li>'),
          e.note && (e.note.textContent = ""),
          e.more && (e.more.hidden = !0));
        return;
      }
      if (
        !t &&
        e.list._k === s.id + this.limit &&
        Date.now() - (e.list._t || 0) < RF
      )
        return;
      let o = (this._seq = (this._seq || 0) + 1);
      (!e.list.children.length || t) &&
        (e.list.innerHTML = '<li class="lbE">Loading\u2026</li>');
      let a, r;
      try {
        [a, r] = await Promise.all([this.top(s.id), this.mine(s.id)]);
      } catch {
        o === this._seq &&
          ((e.list.innerHTML =
            '<li class="lbE">Could not load the leaderboard \xB7 <button class="lbR" type="button">Retry</button></li>'),
          (e.list.querySelector(".lbR").onclick = () => this.render(!0)));
        return;
      }
      if (o !== this._seq) return;
      let l = (f, u = "") =>
          `<li class="${u}${f.mine ? " me" : ""}"><span class="lbN">${f.rank ? f.rank : "\u2013"}</span>` +
          (f.profile_url
            ? `<a href="${Uz(f.profile_url)}" target="_blank" rel="noopener">${Uz(f.username || "guest")}</a>`
            : `<span class="lbU">${Uz(f.username || "guest")}</span>`) +
          `<b>${Uz(s.fmt(f.value))}</b></li>`,
        c = a.map((f) => l(f)).join("");
      a.length ||
        (c = '<li class="lbE">Nobody on this board yet: be the first</li>');
      let h = a.some((f) => f.mine);
      if (r && !h) c += '<li class="lbGap">\u2026</li>' + l({ ...r, mine: !0 });
      else if (!r && !h) {
        let f = s.of(n);
        f > 0 &&
          (c +=
            '<li class="lbGap">\u2026</li>' +
            l({
              rank: 0,
              username: this.pr.signedIn ? "you" : "you (guest)",
              value: f,
              mine: !0,
            }));
      }
      ((e.list.innerHTML = c),
        (e.list._k = s.id + this.limit),
        (e.list._t = Date.now()),
        e.more && (e.more.hidden = a.length < this.limit || this.limit >= 100),
        e.note &&
          (e.note.textContent = this.pr.signedIn
            ? r?.rank
              ? "You: #" + r.rank + " \xB7 " + s.fmt(r.value)
              : "Your " +
                s.long.toLowerCase() +
                " goes on the board as you play"
            : "Sign in to mindblown to put your name on the board - your progress as a guest joins your account"));
    }
  };
as();
as();
