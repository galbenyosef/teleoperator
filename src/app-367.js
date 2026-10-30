// app 367 — limit
// Lines 177434-177656 of readable/app.pretty.js (statement-aligned).
var B8t = 3e4,
  Mnt = 4e3,
  _B = 6e4,
  Snt = 20,
  knt = (o) => "$" + Math.round(o || 0).toLocaleString(),
  iT = (o) =>
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
  EB = [
    {
      id: "cash",
      label: "Cash",
      long: "Cash earned",
      of: (o) => Math.floor(o.earned || 0),
      fmt: knt,
    },
    {
      id: "races_won",
      label: "Races won",
      long: "Races won",
      of: (o) => o.race?.wins || 0,
      fmt: (o) => String(o),
    },
    {
      id: "best_bounty",
      label: "Bounty",
      long: "Biggest bounty",
      of: (o) => Math.round(o.best?.bounty || 0),
      fmt: (o) => Math.round(o).toLocaleString() + " pts",
    },
    {
      id: "xp",
      label: "Level",
      long: "Player level",
      of: (o) => Math.floor(o.xp || 0),
      fmt: (o) =>
        "Lv " + Ah(o).level + " \xB7 " + Math.round(o).toLocaleString() + " XP",
    },
    {
      id: "longest_drift",
      label: "Drift",
      long: "Longest drift",
      of: (o) => Math.round((o.best?.drift || 0) * 10) / 10,
      fmt: (o) => (+o).toFixed(1) + " s",
    },
  ],
  oT = class {
    constructor(t, e = {}) {
      ((this.pr = t),
        (this.el = e),
        (this.mb = window.mindblown),
        (this.metric = "cash"),
        (this.limit = Snt),
        (this.sent = {}),
        (this.at = 0),
        (this.cache = new Map()),
        (this.mineC = new Map()),
        (t.board = this));
      for (let s of e.tabs || [])
        s.onclick = () => {
          ((this.metric = s.dataset.lb), (this.limit = Snt), this.render(!0));
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
      if (s - this.at < (t ? Mnt : B8t)) {
        t &&
          (clearTimeout(this._t),
          (this._t = setTimeout(() => this.submit(!0), Mnt)));
        return;
      }
      ((this.at = s), (this._busy = !0));
      try {
        for (let n of EB) {
          let i = n.of(this.pr.p);
          if (!(!(i > 0) || i <= (this.sent[n.id] ?? 0)))
            try {
              (await e.submit(n.id, i),
                (this.sent[n.id] = i),
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
      if (n && Date.now() - n.t < _B) return n.rows;
      let i = await this.mb.leaderboard.top(t, { limit: e });
      return (this.cache.set(s, { t: Date.now(), rows: i || [] }), i || []);
    }
    async mine(t) {
      if (!this.mb?.leaderboard?.mine || !this.pr.signedIn) return null;
      let e = this.mineC.get(t);
      if (e && Date.now() - e.t < _B) return e.row;
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
        knt(this.pr.p.earned) +
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
      let s = EB.find((f) => f.id === this.metric) || EB[0],
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
        Date.now() - (e.list._t || 0) < _B
      )
        return;
      let i = (this._seq = (this._seq || 0) + 1);
      (!e.list.children.length || t) &&
        (e.list.innerHTML = '<li class="lbE">Loading\u2026</li>');
      let a, r;
      try {
        [a, r] = await Promise.all([this.top(s.id), this.mine(s.id)]);
      } catch {
        i === this._seq &&
          ((e.list.innerHTML =
            '<li class="lbE">Could not load the leaderboard \xB7 <button class="lbR" type="button">Retry</button></li>'),
          (e.list.querySelector(".lbR").onclick = () => this.render(!0)));
        return;
      }
      if (i !== this._seq) return;
      let l = (f, u = "") =>
          `<li class="${u}${f.mine ? " me" : ""}"><span class="lbN">${f.rank ? f.rank : "\u2013"}</span>` +
          (f.profile_url
            ? `<a href="${iT(f.profile_url)}" target="_blank" rel="noopener">${iT(f.username || "guest")}</a>`
            : `<span class="lbU">${iT(f.username || "guest")}</span>`) +
          `<b>${iT(s.fmt(f.value))}</b></li>`,
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
es();
es();
