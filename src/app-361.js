// app 361 — math
// Lines 172968-174745 of readable/app.pretty.js (statement-aligned).
var Zst = cr.has("mpk") ? +cr.get("mpk") : 12,
  g8t = cr.get("mpproxy") !== "0",
  b8t = 90,
  x8t = 260,
  Fh = 9,
  v8t = 700,
  o4 = (o) =>
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
  ZE = class {
    constructor(t) {
      if (
        (Object.assign(this, t),
        (this.mb = window.mindblown),
        (this.enabled = !!(this.mb && this.mb.live && this.mb.live.play)),
        (this.remotes = new Map()),
        (this.colliders = []),
        (this._dyn = []),
        (this.ch = null),
        (this.state = null),
        (this.names = {}),
        (this.sent = 0),
        (this.sampled = 0),
        (this.trSent = 0),
        (this.hist = []),
        (this.histI = []),
        (this.q = []),
        (this.seq = 0),
        (this.offC = null),
        (this.leaders = []),
        (this.racers = new Set()),
        (this.racing = !1),
        (this.err = ""),
        (this._v3 = new dt()),
        document.body.classList.toggle("mpOn", this.enabled),
        !this.enabled)
      )
        return;
      let e = this.el.panel;
      ((e.querySelector("[data-mp=create]").onclick = () => this.create()),
        (e.querySelector("[data-mp=copy]").onclick = () => this.copy()),
        (e.querySelector("[data-mp=invite]").onclick = () => this.invite()),
        (e.querySelector("[data-mp=leave]").onclick = () => this.leave()),
        (e.querySelector("[data-mp=retry]").onclick = () => this.retry()),
        Do.on((s) => {
          s && this.needsAcct && !this.ch
            ? ((this.needsAcct = !1),
              (this.err = ""),
              this.phaseTo("", ""),
              this.retry())
            : this.draw();
        }),
        (e.querySelector("[data-mp=close]").onclick = () => this.show(!1)),
        (e.querySelector(".mpList").onclick = (s) => {
          let n = s.target.closest("[data-go]");
          n && this.goTo(+n.dataset.go);
        }),
        (this.el.chip.onclick = (s) => {
          (s.stopPropagation(), this.show(!this.open));
        }),
        this.mb.live.lobby((s) => this.lobby(s)),
        this.mb.live.match((s) => this.attach(s)),
        this.draw());
    }
    get inRoom() {
      return !!this.ch;
    }
    paintChanged() {
      this.pDirty = !0;
    }
    phaseTo(t, e = "", s = 0) {
      ((this.phase = t),
        (this.phaseMsg = e),
        clearTimeout(this._phT),
        s &&
          (this._phT = setTimeout(() => {
            this.phase === t &&
              this.fail(
                t === "waiting"
                  ? "The room opened but sent nothing for " + s / 1e3 + " s"
                  : "No answer from the room after " + s / 1e3 + " s",
              );
          }, s)),
        document.body.classList.toggle(
          "mpBusy",
          t === "connecting" || t === "waiting" || t === "reconnecting",
        ),
        this.draw());
    }
    fail(t) {
      ((this.err = ""),
        (this.creating = !1),
        this.busy("create", !1),
        this.phaseTo("error", t));
    }
    failE(t, e) {
      t?.needsAccount ||
      /UNAUTHORIZED|ACCOUNT/.test(t?.reason || t?.message || "")
        ? ((this.needsAcct = !0),
          this.fail(
            "Sign in to mindblown to drive together - its sign-in is open",
          ))
        : this.fail((t && (t.reason || t.message)) || e);
    }
    retry() {
      if (
        (clearTimeout(this._joinRetry),
        (this._joinRetry = null),
        (this._joinRetries = this._roomRetries = 0),
        this.ch || this.state?.room)
      ) {
        this.reconnect("Reconnecting to the room\u2026");
        return;
      }
      this.lastTry === "join" ? this.join() : this.create();
    }
    reconnect(t, e = 0) {
      (clearTimeout(this._reconnectTimer), clearTimeout(this._tickTimer));
      let s = (this._connectionAttempt = (this._connectionAttempt || 0) + 1),
        n = this.ch,
        i = n?.room?.name || this.roomName || this.state?.room;
      ((this.ch = null),
        (this.ticked = !1),
        (this._healthySince = 0),
        (this._acceptChannels = !0),
        (this.creating = this.joining = !1),
        n && (this._closedChannels ||= new WeakSet()).add(n),
        n?.close(),
        this.phaseTo("reconnecting", t, 15e3),
        (this._reconnectTimer = setTimeout(() => {
          ((this._reconnectTimer = null),
            this.mb.live
              .play()
              .then((r) =>
                s !== this._connectionAttempt
                  ? r
                  : this._closedChannels?.has(r) && i && this.mb.live.join
                    ? this.mb.live.join({ room: i })
                    : r,
              )
              .then(
                (r) => {
                  if (s !== this._connectionAttempt) {
                    (this.ch !== r && r.close(),
                      this._acceptChannels === !1 &&
                        this.mb.room?.leave &&
                        r.room?.name &&
                        this.mb.room.leave(r.room.name).catch(() => {}));
                    return;
                  }
                  this.attach(r);
                },
                (r) => {
                  s === this._connectionAttempt &&
                    this.failE(r, "Could not reconnect");
                },
              ));
        }, e)));
    }
    recoverRoom(t) {
      if (this._reconnectTimer) return;
      if (((this._healthySince = 0), (this._roomRetries || 0) >= 2)) {
        (clearTimeout(this._tickTimer),
          this.raceUI?.onRoom?.(null),
          this.phaseTo("error", t + " \xB7 Retry to reconnect"));
        return;
      }
      let e = (this._roomRetries = (this._roomRetries || 0) + 1);
      this.reconnect(t + " \xB7 reconnecting (" + e + "/2)\u2026", e * 2e3);
    }
    watchTicks() {
      (clearTimeout(this._tickTimer),
        (this._tickTimer = setTimeout(() => {
          if (this.ch) {
            if (document.hidden) {
              this.watchTicks();
              return;
            }
            this.recoverRoom("The room stopped responding");
          }
        }, 1e4)));
    }
    busy(t, e, s) {
      let n = this.el.panel.querySelector("[data-mp=" + t + "]");
      if (n) {
        if (
          (n.dataset.label === void 0 && (n.dataset.label = n.textContent),
          clearTimeout(n._t),
          delete n.dataset.done,
          e)
        ) {
          ((n.dataset.busy = "1"),
            (n.disabled = !0),
            (n.innerHTML =
              '<i class="mpSpin" aria-hidden="true"></i>' + o4(e)));
          return;
        }
        (delete n.dataset.busy,
          (n.disabled = !1),
          (n.textContent = s || n.dataset.label),
          s &&
            ((n.dataset.done = "1"),
            (n._t = setTimeout(() => {
              (delete n.dataset.done, (n.textContent = n.dataset.label));
            }, 1600))));
      }
    }
    show(t) {
      ((this.open = t), this.el.panel.classList.toggle("on", t), this.draw());
    }
    create(t = !1) {
      this.creating ||
        this.ch ||
        ((this._acceptChannels = !0),
        t || (this._joinRetries = 0),
        (this.err = ""),
        (this.creating = !0),
        (this.lastTry = "create"),
        this.busy("create", "Opening\u2026"),
        this.phaseTo("connecting", "Opening a room\u2026", 15e3),
        this.mb.live.play({ seats: u8t }).then(
          (e) => this.attach(e),
          (e) => this.failE(e, "Could not open a room"),
        ));
    }
    join(t = !1) {
      this.joining ||
        this.ch ||
        ((this._acceptChannels = !0),
        t || (this._joinRetries = 0),
        (this.joining = !0),
        (this.lastTry = "join"),
        this.phaseTo(
          "connecting",
          "Joining room " + (this.state?.room || "") + "\u2026",
          15e3,
        ),
        this.mb.live.play().then(
          (e) => {
            ((this.joining = !1), this.attach(e));
          },
          (e) => {
            ((this.joining = !1), this.failE(e, "Could not join the room"));
          },
        ));
    }
    leave() {
      ((this._acceptChannels = !1),
        (this._connectionAttempt = (this._connectionAttempt || 0) + 1),
        clearTimeout(this._reconnectTimer),
        (this._reconnectTimer = null),
        clearTimeout(this._tickTimer),
        (this._roomRetries = 0),
        clearTimeout(this._joinRetry),
        (this._joinRetry = null),
        (this._joinRetries = 2),
        this.busy("leave", "Leaving\u2026"),
        (this.creating = !1),
        (this.joining = !1),
        this.phaseTo(""));
      let t = this.ch;
      ((this.ch = null),
        (this.roomName = null),
        t && (this._closedChannels ||= new WeakSet()).add(t),
        t?.close(),
        this.mb.live.leave(),
        (this.ticked = !1),
        (this.state = null),
        (this.names = {}));
      for (let e of this.remotes.values()) this.drop(e);
      if (
        (this.remotes.clear(),
        (this.colliders.length = 0),
        (this.leaders.length = 0),
        (this.hist = []),
        (this.histI = []),
        (this.q = []),
        (this.offC = this.offT = null),
        (this.rtts = []),
        (this.lastEcho = 0),
        (this.host = 0),
        this.racers.clear(),
        (this.worldV = void 0),
        (this.worldSent = !1),
        (this.lastLocal = null),
        this.raceUI?.S?.net && this.raceUI.exit(!0),
        this.raceUI?.onRoom?.(null),
        this.traffic && ((this.traffic.lineHidden = !1), this.traffic.ghosts))
      )
        for (let e of [...this.traffic.ghosts.keys()]) this.traffic.netDrop(e);
      (this.busy("leave", !1),
        this.busy("create", !1),
        this.draw(),
        this.toast?.("Left the room", "Driving solo"));
    }
    copy() {
      let t =
        this.state?.link || this.mb.shareUrl?.({ room: this.ch?.room?.name });
      if (!t) return;
      let e = () => {
          (this.busy("copy", !1, "Copied \u2713"),
            this.toast?.("Invite link copied", "Send it to a friend"));
        },
        s = () => {
          (this.busy("copy", !1), this.manual(t));
        };
      this.busy("copy", "Copying\u2026");
      try {
        navigator.clipboard.writeText(t).then(e, s);
      } catch {
        s();
      }
    }
    manual(t) {
      let e = this.el.panel.querySelector(".mpLink input");
      (e && (e.focus(), e.select()), this.toast?.("Copy the link", t));
    }
    invite() {
      let t = this.ch?.room?.name || this.state?.room;
      if (!t || !this.mb.room?.invite) {
        this.toast?.("Invites are not available here", "Copy the link instead");
        return;
      }
      if (this.el.panel.querySelector("[data-mp=invite]")?.dataset.busy) return;
      this.busy("invite", "Sending\u2026");
      let s = setTimeout(() => {
        (this.busy("invite", !1),
          this.toast?.(
            "The invite is taking long",
            "Try again, or copy the link",
          ));
      }, 15e3);
      this.mb.room.invite(t).then(
        (n) => {
          (clearTimeout(s),
            this.busy("invite", !1, n?.sent ? "Sent \u2713" : null),
            this.toast?.(
              n?.sent ? "Invitation sent" : "Nobody to invite yet",
              n?.sent
                ? n.sent + (n.sent > 1 ? " friends" : " friend")
                : "Copy the link and send it",
            ));
        },
        (n) => {
          (clearTimeout(s),
            this.busy("invite", !1),
            this.toast?.(
              "Could not send the invite",
              (n && (n.reason || n.message)) || "Copy the link instead",
            ));
        },
      );
    }
    lobby(t) {
      ((this.state = t),
        t.refused
          ? ((this.err = t.refused.needsAccount
              ? "Sign in to mindblown to drive together"
              : {
                  ROOM_FULL: "This room is full (8 drivers)",
                  OPENED_ELSEWHERE:
                    "You are driving in this room in another window",
                  ROOM_UNREACHABLE: "The room could not be reached",
                  NOT_INVITED: "This room is invite-only",
                  ROOM_CLOSED: "The room has closed",
                  SERVICE_UNAVAILABLE: "Rooms are off right now",
                }[t.refused.reason] || t.refused.reason),
            t.refused.needsAccount
              ? ((this.needsAcct = !0), this.show(!0))
              : this.retryTransport(t.refused.reason),
            this.phase === "connecting" &&
              ((this.creating = !1),
              this.busy("create", !1),
              this.phaseTo("error", this.err),
              (this.err = "")))
          : this.phase !== "error" && (this.err = ""));
      for (let e of t.present || [])
        e.username && (this.names[e.seat] = e.username);
      for (let e of this.remotes.values()) this.label(e);
      (t.room &&
        !t.refused &&
        !this.ch &&
        !this.creating &&
        this.phase !== "error" &&
        this.phase !== "reconnecting" &&
        ((this.linked = !0), this.join()),
        this.draw());
    }
    retryTransport(t) {
      if (
        this.ch ||
        this._joinRetry ||
        (this._joinRetries || 0) >= 2 ||
        ![
          "rooms need the mindblown panel on this page",
          "live rooms need the mindblown panel on this page",
          "the room did not answer",
        ].includes(t)
      )
        return;
      let e = (this._joinRetries = (this._joinRetries || 0) + 1);
      this._joinRetry = setTimeout(() => {
        ((this._joinRetry = null),
          !(this.ch || this.needsAcct) &&
            ((this.joining = this.creating = !1),
            this.lastTry === "create" ? this.create(!0) : this.join(!0)));
      }, e * 2e3);
    }
    attach(t) {
      if (this._acceptChannels === !1) {
        t.close();
        return;
      }
      if (
        (clearTimeout(this._joinRetry),
        (this._joinRetry = null),
        (this._joinRetries = 0),
        this.ch === t)
      )
        return;
      let e = !this.ch;
      ((this.ch = t),
        (this.creating = !1),
        (this.joining = !1),
        (this.ticked = !1),
        this.busy("create", !1),
        (this.roomName = t.room?.name || this.roomName),
        (this._rosterKey = null),
        (this._nameRequest = null),
        (this._nextNames = 0),
        this.phaseTo(
          "waiting",
          "Connected \xB7 waiting for the room\u2026",
          1e4,
        ),
        this.watchTicks());
      for (let s of t.room?.seated || [])
        s.username && (this.names[s.seat] = s.username);
      (t.on("tick", (s) => {
        if (this.ch !== t) return;
        let n = this.debugDelay;
        n > 0
          ? setTimeout(
              () => {
                this.ch === t && this.tick(s);
              },
              n * (0.85 + 0.3 * Math.random()),
            )
          : this.tick(s);
      }),
        t.on("close", (s) => {
          if (this.ch === t) {
            if (
              ((this.ch = null),
              (this._closedChannels ||= new WeakSet()).add(t),
              clearTimeout(this._tickTimer),
              s && (s.closed === "elsewhere" || s.code === 4001))
            ) {
              (this.raceUI?.onRoom?.(null),
                this.phaseTo(
                  "error",
                  "You are driving in this room in another window",
                ));
              return;
            }
            this.recoverRoom("Connection lost");
          }
        }),
        e &&
          this.toast?.(
            "Drive together",
            "Room " +
              (t.room?.name || "") +
              " \xB7 invite friends from \u{1F465}",
          ),
        this.draw());
    }
    syncRoster(t) {
      let e = this.ch;
      if (!e) return;
      this._roomSeats = t;
      for (let a of Object.keys(this.names)) t.has(+a) || delete this.names[a];
      let s = [...t].sort((a, r) => a - r),
        n = s.map((a) => a + ":" + (this.names[a] || "")).join("|");
      if (
        (n !== this._rosterKey &&
          ((this._rosterKey = n),
          (this.state = {
            ...this.state,
            room: this.roomName,
            mine: e.seat,
            link:
              this.state?.link || this.mb.shareUrl?.({ room: this.roomName }),
            present: s.map((a) => ({
              seat: a,
              username: this.names[a] || "",
              mine: a === e.seat,
            })),
          }),
          this.draw()),
        !this.mb.room?.join ||
          this._nameRequest ||
          performance.now() < (this._nextNames || 0) ||
          s.every((a) => this.names[a]))
      )
        return;
      this._nextNames = performance.now() + 5e3;
      let i = (this._nameRequest = this.mb.room.join({ room: this.roomName }));
      i.then(
        (a) => {
          if (this.ch === e) {
            for (let r of a.seated || [])
              r.username && (this.names[r.seat] = r.username);
            for (let r of this.remotes.values()) this.label(r);
            this.syncRoster(this._roomSeats);
          }
        },
        () => {},
      ).finally(() => {
        this._nameRequest === i && (this._nameRequest = null);
      });
    }
    tick(t) {
      if (t.error) {
        this.recoverRoom("Room error: " + t.error);
        return;
      }
      (this.watchTicks(),
        (!this.ticked || this.phase !== "live") &&
          ((this.ticked = !0), this.phaseTo("live")));
      let e = performance.now(),
        s = t.view || {},
        n = s.cars || {},
        i = new Set((t.seats || []).map(Number)),
        a = this.ch?.seat;
      if (
        (this.syncRoster(i),
        this._healthySince || (this._healthySince = e),
        e - this._healthySince > 1e4 && (this._roomRetries = 0),
        Number.isFinite(s.clock))
      )
        if (Number.isFinite(s.echo) && s.echo > (this.lastEcho || 0)) {
          this.lastEcho = s.echo;
          let r = e - s.echo,
            l = s.echo + r / 2 - s.clock,
            c = this.rtts || (this.rtts = []);
          for (c.push([r, l, e]); c.length && e - c[0][2] > 1e4;) c.shift();
          let h = c[0];
          for (let f of c) f[0] < h[0] && (h = f);
          ((this.offT = h[1]),
            (this.offC === null || this.offC0) && (this.offC = h[1]),
            (this.offC0 = !1),
            (this.rtt = h[0]));
        } else
          this.offC === null &&
            ((this.offC = this.offT = e - s.clock), (this.offC0 = !0));
      Number.isFinite(s.ack) &&
        ((this.q = this.q.filter((r) => r[0] > s.ack)),
        (this.seq = Math.max(this.seq, s.ack)));
      for (let r in n) {
        let l = +r,
          c = n[r];
        if (l === a || !Array.isArray(c.h) || !c.h.length) continue;
        let h = this.remotes.get(l);
        (h ||
          this.remotes.set(
            l,
            (h = {
              seat: l,
              F: new XE(Gl),
              spin: [0, 0, 0, 0],
              pose: {
                pos: { x: 0, y: 0, z: 0 },
                psi: 0,
                wheelSpin: [0, 0, 0, 0],
              },
            }),
          ),
          (h.id !== c.c || (c.c === "custom" && h.rd !== c.rd)) &&
            this.model(h, c.c, c.rd),
          typeof c.p == "string" &&
            c.p !== h.p &&
            ((h.p = c.p),
            h.car && c0(h.car, cM(h.p)),
            h.car && h.u && this.vis(h)),
          typeof c.u == "string" &&
            c.u !== h.u &&
            ((h.u = c.u), this.vis(h), this.label(h)),
          (h.b = c.b),
          h.F.push(
            c.h,
            e,
            this.offC === null ? void 0 : e - this.offC,
            Array.isArray(c.hi) ? c.hi : null,
            c.hc,
          ));
        let f = h.F.newest();
        if (!this.met && l < (a || 0)) {
          let u = Math.hypot(f[1] - this.v.pos.x, f[3] - this.v.pos.z);
          u < 8 || (this.linked && u > 60)
            ? ((this.met = !0), setTimeout(() => this.goTo(l), 0))
            : this.linked && (this.met = !0);
        }
      }
      for (let [r, l] of this.remotes) {
        if (i.has(r)) {
          l.away = 0;
          continue;
        }
        l.away
          ? e - l.away > d8t &&
            (this.drop(l),
            this.remotes.delete(r),
            this.traffic?.netDropOwner?.(r))
          : (l.away = e);
      }
      if (this.traffic?.netList && s.tr && !this.racing)
        for (let r in s.tr) {
          let l = s.tr[r];
          this.remotes.has(+r) &&
            Array.isArray(l.r) &&
            this.traffic.netList(+r, l.r, +l.t);
        }
      for (let r of s.ev || [])
        if (r[1] === 2 && this.traffic) {
          let l = this.traffic.cars.find((c) => c.nid === r[2] && !c.net);
          l && this.traffic.shove(l, r[3], r[4], r[5], r[6]);
        } else if (r[1] === 5) this.bumped(r[0], r[2], r[3], r[4], r[5], r[6]);
        else if (r[1] === 7) {
          let [l, c, h, f, u, d, p] = r.slice(2).map(Number);
          [c, h, f, u, d, p].every(Number.isFinite) &&
            (this.peopleIn =
              (this.peopleIn || 0) +
              (this.onPeopleKnock?.({
                id: l || 0,
                x: c / 100,
                z: h / 100,
                vx: f / 100,
                vz: u / 100,
                vy: d / 100,
                w: p / 100,
              })
                ? 1
                : 0));
        } else if (r[1] === 4 && this.traffic) {
          let l = this.traffic.cars.findIndex((c) => c.nid === r[2] && !c.net);
          l >= 0 && this.traffic.cars.splice(l, 1);
        } else if (r[1] === 3 && this.traffic?.netAdopt) {
          let l = this.traffic.netDrop(r[0] + ":" + r[2], "adopt");
          this.traffic.netAdopt(r.slice(3), l);
        }
      ((this.host = s.host || a),
        this.traffic &&
          ((this.traffic.lineHidden = !!(a && this.host && this.host !== a)),
          (this.traffic.netSeat = a)),
        this.syncWorld(s.world || null),
        this.raceUI?.onRoom?.(s.race || null),
        this._n !== this.remotes.size &&
          ((this._n = this.remotes.size), this.draw()));
    }
    takeSample(t) {
      if (this.offC === null) return;
      let e = this.v,
        s = t - (this.sampled || t);
      this.sampled = t;
      let n = { x: -Math.sin(e.psi), z: -Math.cos(e.psi) },
        i = e.vel.x * n.x + e.vel.z * n.z,
        a = (h) => Math.round(h * 1e3) / 1e3,
        r = (h) => Math.round(h * 100) / 100,
        l = Math.round(t - this.offC),
        c = this.hist[this.hist.length - 1];
      if (c && l <= c[0]) {
        let h = l - Math.max(1, Math.round(s)) - c[0];
        for (let f of this.hist) f[0] += h;
        for (let f of this.histI) f[0] += h;
        this.clockRevision = (this.clockRevision || 0) + 1;
      }
      (this.hist.push([
        l,
        r(e.pos.x),
        r(e.pos.y),
        r(e.pos.z),
        a(e.psi),
        a(e.pitch),
        a(e.roll),
        a(e.heave),
        a(e.bodyPitch),
        a(e.bodyRoll),
        a(e.steer),
        r(i),
        r(e.vel.x),
        r(e.vel.z),
        a(e.r),
      ]),
        this.hist.length > Jst && this.hist.shift(),
        this.histI.push([
          l,
          r(e.throttle || 0),
          r(e.brake || 0),
          r(e.hb || 0),
          e.nitroOn ? 1 : 0,
        ]),
        this.histI.length > Jst && this.histI.shift());
    }
    post(t, e, ...s) {
      (this.q.push([++this.seq, t, e, ...s]),
        this.q.length > 64 && this.q.shift());
    }
    syncWorld(t) {
      if (!this.worldGet || !this.ch) return;
      let e = this.worldGet(),
        s = !!this.raceUI?.active;
      if (!t) {
        this.worldSent ||
          ((this.worldSent = !0), this.post(0, 20, e.tr, e.pk, e.tod));
        return;
      }
      if (t.v !== this.worldV) {
        ((this.worldV = t.v),
          (this.roomWorld = t),
          this.worldSet(t, s),
          (this.lastLocal = this.worldGet()));
        return;
      }
      let n = this.lastLocal || e,
        i = (a) => e[a] !== n[a] && !(s && a !== "tod");
      ((i("tr") || i("pk") || i("tod")) &&
        this.post(
          0,
          20,
          i("tr") ? e.tr : -1,
          i("pk") ? e.pk : -1,
          i("tod") ? e.tod : -1,
        ),
        (this.lastLocal = e));
    }
    roomNow() {
      return this.offC === null ? null : performance.now() - this.offC;
    }
    nameOf(t) {
      return this.names[t] || "driver " + t;
    }
    poseOf(t) {
      let e = this.remotes.get(t);
      return e && e.drawn ? e.pose : null;
    }
    others() {
      let t = [];
      for (let e of this.remotes.values()) e.F.newest() && t.push(e.seat);
      return t;
    }
    nearby(t = 80) {
      let e = [];
      for (let s of this.remotes.values())
        s.drawn &&
          Math.hypot(s.pose.pos.x - this.v.pos.x, s.pose.pos.z - this.v.pos.z) <
            t &&
          e.push(s.seat);
      return e;
    }
    model(t, e, s) {
      ((t.id = e), (t.rd = s));
      let n =
          e === "custom" && s
            ? "custom"
            : us[e] && e !== "custom"
              ? e
              : "waymo",
        i = (t.loading = this.loadCar(n, s).then(
          (a) => {
            if (t.loading !== i || t.gone) {
              this.dispose(a);
              return;
            }
            (t.car && (this.scene.remove(t.car.root), this.dispose(t.car)),
              (t.car = a),
              (t.lamps = ""),
              this.scene.add(a.root),
              (a.root.visible = !1),
              t.p && c0(a, cM(t.p)),
              t.u && this.vis(t));
          },
          (a) => console.warn("mp car", a),
        ));
      (t.tag ||
        ((t.tag = document.createElement("div")),
        (t.tag.className = "mpTag"),
        (t.tag.style.borderColor = JE[(t.seat - 1) % JE.length]),
        this.el.tags.appendChild(t.tag)),
        this.label(t));
    }
    label(t) {
      if (!t.tag) return;
      let e = this.names[t.seat] || "driver " + t.seat,
        s =
          t.id === "custom"
            ? (t.rd || "").split("|")[1] || "Custom car"
            : us[t.id]?.name || "",
        n = Lv[pB(t.u)?.cls];
      ((t.tag.innerHTML = `<b>@${o4(e)}</b><small>${o4(s)}${n ? ` \xB7 <span style="color:${n[2]}">${n[0]}</span>` : ""}</small><i></i>`),
        (t.name = e));
    }
    vis(t) {
      if (!t.car) return;
      let e = pB(t.u);
      try {
        i4(
          t.car,
          e &&
            (e.rim ||
              e.size ||
              e.side ||
              e.dh ||
              e.camF ||
              e.camR ||
              e.wing ||
              e.width)
            ? e
            : null,
          cM(t.p)?.rim || null,
        );
      } catch (s) {
        console.warn("mp tune", s);
      }
    }
    goTo(t) {
      let e = this.remotes.get(t),
        s = e && e.F.newest() && { p: e.F.newest() };
      if (!s || !this.teleport) return !1;
      let n = 12 + 9 * Math.max(0, (this.ch?.seat || 0) - t - 1),
        i = s.p[1] + Math.sin(s.p[4]) * n,
        a = s.p[3] + Math.cos(s.p[4]) * n,
        r = this.teleport(i, a);
      return (
        r &&
          (this.toast?.(
            "Driving with @" + (this.names[t] || "driver " + t),
            "",
          ),
          this.show(!1)),
        r
      );
    }
    dispose(t) {
      t.root.traverse((e) => {
        e.isMesh && e.geometry?.dispose?.();
      });
    }
    drop(t) {
      ((t.gone = !0),
        t.car && (this.scene.remove(t.car.root), this.dispose(t.car)),
        t.tag?.remove());
    }
    attachTraffic(t) {
      ((this.traffic = t),
        (t.netLeaders = this.leaders),
        (t.netClock = () => this.roomNow()),
        (t.netGround = this.groundAt),
        (t.netHold = f8t),
        (t.netW = 10),
        (t.spawnOk = (e, s) => {
          if (!this.ch) return !0;
          let n = Math.hypot(e - this.v.pos.x, s - this.v.pos.z);
          for (let i of this.remotes.values())
            if (i.drawn && Math.hypot(e - i.pose.pos.x, s - i.pose.pos.z) < n)
              return !1;
          return !0;
        }),
        (t.onNetDup = (e) => this.post(e.owner, 4, e.nid)),
        (t.onNetShove = (e, s, n, i, a) => {
          let r = performance.now();
          if (r - (e._shoveT || 0) < 120) return;
          e._shoveT = r;
          let l = (c) => Math.round(c * 10) / 10;
          this.post(e.owner, 2, e.nid, l(s), l(n), l(i), l(a));
        }));
    }
    handOff() {
      let t = this.traffic,
        e = [...this.remotes.values()].filter((a) => a.drawn),
        s = performance.now();
      for (let a = t.cars.length - 1; a >= 0; a--)
        t.cars[a].handed && s - t.cars[a].handed > 2e3 && t.cars.splice(a, 1);
      if (!e.length) return;
      let n = this.v,
        i = 0;
      for (let a = t.cars.length - 1; a >= 0 && i < 6; a--) {
        let r = t.cars[a];
        if (r.net || r.route || r.cop || r.handed) continue;
        let l = Math.hypot(r.x - n.pos.x, r.z - n.pos.z);
        if (l < 40) continue;
        let c = null,
          h = l - l8t;
        for (let u of e) {
          let d = Math.hypot(r.x - u.pose.pos.x, r.z - u.pose.pos.z);
          d < h && ((h = d), (c = u));
        }
        if (!c) continue;
        let f = t.netLane(r);
        f &&
          (r.nid || t.netPack(r),
          this.post(c.seat, 3, r.nid, ...f),
          (r.handed = s),
          (r.handTo = c.seat),
          i++);
      }
    }
    ownTraffic() {
      let t = this.traffic,
        e = [];
      if (!t?.netPack) return e;
      let s = [...this.remotes.values()]
        .filter((n) => n.drawn)
        .map((n) => n.pose.pos);
      if (!s.length) return e;
      for (let n of t.cars) {
        if (n.net || n.cop || n.handed || (n.route && t.lineHidden)) continue;
        let i = 1e9;
        for (let a of s)
          i = Math.min(i, Math.abs(n.x - a.x) + Math.abs(n.z - a.z));
        i < c8t && e.push([i - (n._sent ? m8t : 0), n]);
      }
      e.sort((n, i) => n[0] - i[0]);
      for (let n of t.cars) n._sent = !1;
      return e.slice(0, h8t).map(([, n]) => ((n._sent = !0), t.netPack(n)));
    }
    hit(t, e, s, n, i) {
      let a = this.remotes.get(t.seat);
      if (!a || !this.ch) return;
      let r = performance.now();
      a.hitAt = r;
      let l = t.m || 1800;
      if (a.pr) {
        let f = -e / l,
          u = -s / l,
          d = Math.hypot(f, u);
        (d > Fh && ((f *= Fh / d), (u *= Fh / d)), a.pr.kick(f, u));
      } else {
        let f = a.kick || (a.kick = { vx: 0, vz: 0 });
        ((f.vx -= e / l), (f.vz -= s / l));
        let u = Math.hypot(f.vx, f.vz);
        u > Fh && ((f.vx *= Fh / u), (f.vz *= Fh / u));
      }
      let c = a.col;
      ((t.vx -= e / l),
        (t.vz -= s / l),
        c &&
          ((c.x0 = c.x),
          (c.z0 = c.z),
          (c.st0 = this.v.simT || 0),
          (c.vx = t.vx),
          (c.vz = t.vz)));
      let h = a.hitQ || (a.hitQ = { jx: 0, jz: 0, px: 0, pz: 0, n: 0 });
      ((h.jx -= e),
        (h.jz -= s),
        (h.px = n),
        (h.pz = i),
        h.n++,
        this.flushHit(a, r));
    }
    flushHit(t, e) {
      let s = t.hitQ;
      if (!s?.n || e - (t.hitSent || 0) < b8t) return;
      t.hitSent = e;
      let n = (i) => Math.round(i * 100) / 100;
      (this.post(
        t.seat,
        5,
        Math.round(s.jx),
        Math.round(s.jz),
        n(s.px),
        n(s.pz),
        this.offC === null ? 0 : Math.round(e - this.offC),
      ),
        (this.hits = (this.hits || 0) + 1),
        (s.jx = s.jz = 0),
        (s.n = 0));
    }
    bumped(t, e, s, n, i, a) {
      let r = this.remotes.get(t),
        l = performance.now(),
        c = this.v;
      if (![e, s, n, i].every(Number.isFinite)) return;
      if (
        ((this.got = (this.got || 0) + 1), r && l - (r.hitAt || -1e9) < x8t)
      ) {
        this.gotDup = (this.gotDup || 0) + 1;
        return;
      }
      if (
        (this.offC !== null && a > 0 && l - this.offC - a > v8t) ||
        Math.hypot(n - c.pos.x, i - c.pos.z) > 6
      )
        return;
      let h = c.S?.mass || 1500,
        f = c.S?.izz || 2500,
        u = e / h,
        d = s / h,
        p = Math.hypot(u, d);
      (p > Fh && ((u *= Fh / p), (d *= Fh / p)),
        (c.vel.x += u),
        (c.vel.z += d));
      let m = n - c.pos.x,
        g = i - c.pos.z;
      c.r += Math.max(-1.2, Math.min(1.2, ((g * u * h - m * d * h) / f) * 0.3));
      let b = Math.min(1, Math.min(p, Fh) / 14);
      (b > 0.05 &&
        ((c.impact = Math.max(c.impact || 0, b)),
        (c.impactN = { x: u / (p || 1), z: d / (p || 1), s: b }),
        (c.drift = (c.drift || 0) * 0.5)),
        (c.impactT = Math.max(c.impactT || 0, 0.4 * Math.min(1, p / 8))),
        (this.applied = (this.applied || 0) + 1),
        this.world &&
          this.world.hit(
            {
              px: n,
              pz: i,
              n: { x: u / (p || 1), z: d / (p || 1) },
              c: r?.col || null,
            },
            b,
            !0,
            !1,
            Math.min(p, Fh) * 1.6,
            0,
          ));
    }
    boxOf(t) {
      let e = us[t.id]?.spec?.box;
      return { hx: e?.hx ?? 0.97, hz: e?.hz ?? 2.27, off: e?.off ?? 0.15 };
    }
    collideProxy(t, e, s) {
      let n = this.world;
      if (!n?.test || !n.near) return;
      let i = this.boxOf(t),
        a = i.hx,
        r = i.hz,
        l = us[t.id]?.spec?.mass || 1800,
        c =
          t.fake ||
          (t.fake = {
            pos: { x: 0, y: 0, z: 0 },
            vel: { x: 0, z: 0 },
            impact: 0,
            impactT: 0,
            drift: 0,
          });
      for (let h = 0; h < 4; h++) {
        let f = { x: -Math.sin(e.psi), z: -Math.cos(e.psi) },
          u = { x: -f.z, z: f.x },
          d = e.x + f.x * i.off,
          p = e.z + f.z * i.off,
          m = n.near(d, p, Math.max(3.5, r + 1.2));
        for (let y of n.dynamic || [])
          Math.abs(y.x - e.x) < 8 && Math.abs(y.z - e.z) < 8 && m.add(y);
        for (let y of n.parked?.awake || [])
          Math.abs(y.x - e.x) < 8 && Math.abs(y.z - e.z) < 8 && m.add(y);
        let g = null;
        for (let y of m) {
          if (
            y.dead ||
            y.wall ||
            y.traffic?.remote ||
            y.traffic?.mp ||
            y.traffic?.bot ||
            (y.y1 !== void 0 &&
              Number.isFinite(s) &&
              (s > y.y1 + 0.3 || s + 1.4 < y.y0))
          )
            continue;
          let M = n.test(y, d, p, u, f, a, r);
          if (M) {
            if (y.prop) {
              ((c.pos.x = e.x), (c.pos.y = s), (c.pos.z = e.z));
              let S = e.vx,
                w = e.vz;
              if (((c.vel.x = S), (c.vel.z = w), n.onProp?.(y, c, M))) {
                let _ = Math.hypot(S, w),
                  z = _ > 0.001 ? Math.hypot(c.vel.x, c.vel.z) / _ : 1;
                ((e.u *= z), (e.v *= z));
                continue;
              }
            }
            (!g || M.d > g.d) && ((g = M), (M.c = y));
          }
        }
        if (!g) break;
        let b = g.c,
          v = g.n,
          x = Math.min(g.d, 1.5);
        if (((this.proxyHits = (this.proxyHits || 0) + 1), b.traffic)) {
          let y = b.traffic;
          if (y.line) {
            ((e.x += v.x * x), (e.z += v.z * x));
            let M = e.vx * v.x + e.vz * v.z;
            M < 0 && e.kick(-v.x * M, -v.z * M);
            continue;
          }
          ((y.x -= v.x * x),
            (y.z -= v.z * x),
            (b.x = y.x),
            (b.z = y.z),
            (this.trafficYield = (this.trafficYield || 0) + 1));
        } else if (b.parked && n.parked) {
          let y = n.parked,
            M = y.wake(b) && y.view(b),
            S = 1 / l / (1 / l + 1 / M.m);
          ((e.x += v.x * x * S),
            (e.z += v.z * x * S),
            (b.x -= v.x * x * (1 - S)),
            (b.z -= v.z * x * (1 - S)));
          let w = (e.vx - M.vx) * v.x + (e.vz - M.vz) * v.z;
          if (w < 0) {
            let _ = w > -1.5 ? 0 : 0.2,
              z = (-(1 + _) * w) / (1 / l + 1 / M.m);
            (e.kick((v.x * z) / l, (v.z * z) / l),
              (M.vx -= (v.x * z) / M.m),
              (M.vz -= (v.z * z) / M.m),
              y.kick(b, -v.x * z, -v.z * z),
              y.moved?.add(b),
              (this.parkedHits = (this.parkedHits || 0) + 1));
          }
        } else {
          ((e.x += v.x * x), (e.z += v.z * x));
          let y = e.vx * v.x + e.vz * v.z;
          y < 0 && e.kick(-v.x * y, -v.z * y);
        }
      }
    }
    roomSeed() {
      let t = String(this.ch?.room?.name || this.state?.room || "room"),
        e = 2166136261;
      for (let s = 0; s < t.length; s++)
        e = Math.imul(e ^ t.charCodeAt(s), 16777619);
      return e >>> 0;
    }
    peopleCars(t) {
      for (let e of this.remotes.values()) {
        let s = e.T;
        if (!e.drawn || !s || !e.car) continue;
        let n = -Math.sin(s.heading),
          i = -Math.cos(s.heading);
        t.push({
          x: s.x,
          z: s.z,
          fx: n,
          fz: i,
          hl: s.V.L / 2,
          hw: s.V.bw / 2,
          vx: s.vx || 0,
          vz: s.vz || 0,
          sp: Math.hypot(s.vx || 0, s.vz || 0),
          player: !1,
          remote: e.seat,
        });
      }
      return t;
    }
    knockSend(t) {
      if (!this.ch || !t?.kb) return;
      let e = t.kb,
        s = (n) => Math.round(n * 100);
      for (let n of this.remotes.values())
        this.post(
          n.seat,
          7,
          t.sid || t.gid || 0,
          s(e.x0 ?? t.x),
          s(e.z0 ?? t.z),
          s(e.vx),
          s(e.vz),
          s(e.vy),
          s(e.w),
        );
      this.peopleOut = (this.peopleOut || 0) + 1;
    }
    spectate() {
      let t = this.watch && this.remotes.get(this.watch);
      if (!t?.car || !t.drawn) return null;
      let e = t.pose,
        s =
          t.specV ||
          (t.specV = {
            pos: { x: 0, y: 0, z: 0 },
            vel: { x: 0, y: 0, z: 0 },
            rp: null,
            onGround: !0,
            impact: 0,
            impactT: 0,
            drift: 0,
            aid: 0,
            brake: 0,
            landing: 0,
            ax: 0,
            axB: 0,
            ayC: 0,
            bodyVy: 0,
            kick: 0,
            reverse: !1,
            nitroOn: !1,
            pitch: 0,
          });
      return (
        (s.pos.x = e.pos.x),
        (s.pos.y = e.pos.y),
        (s.pos.z = e.pos.z),
        (s.psi = e.psi),
        (s.pitch = e.pitch || 0),
        (s.heave = e.heave || 0),
        (s.speed = e.speed || 0),
        (s.vel.x = t.T?.vx || 0),
        (s.vel.z = t.T?.vz || 0),
        (s.rp = s),
        { v: s, car: t.car }
      );
    }
    merge(t) {
      if (!this.colliders.length) return t;
      this._dyn.length = 0;
      for (let e of t) this._dyn.push(e);
      for (let e of this.colliders) this._dyn.push(e);
      return this._dyn;
    }
    update(t, e) {
      if (!this.enabled) return;
      let s = performance.now(),
        n = this.v;
      if (this.offC !== null && this.offT !== null) {
        let c = this.offT - this.offC,
          h = p8t * Math.min(100, t * 1e3);
        this.offC += Math.abs(c) > 400 ? c : Math.max(-h, Math.min(h, c));
      }
      if (
        this.ch &&
        e &&
        (s - this.sampled >= o8t && this.takeSample(s),
        s - this.sent >= a8t && this.offC !== null)
      ) {
        ((this.sent = s), this.sampled !== s && this.takeSample(s));
        let c = {
          c: this.carId(),
          b: n.brake > 0.1 ? 1 : 0,
          h: this.hist,
          hi: this.histI,
          hc: this.clockRevision || 0,
          e: Math.round(s * 10) / 10,
        };
        (s - this.trSent >= r8t && this.remotes.size && !this.racing
          ? ((this.trSent = s),
            (c.tr = this.ownTraffic()),
            (c.t = Math.round(s - this.offC)),
            (this.trAgain = [c.tr, c.t]))
          : this.trAgain &&
            (([c.tr, c.t] = this.trAgain), (this.trAgain = null)),
          this.q.length && (c.q = this.q.slice(0, 24)),
          this.paint &&
            (this.pDirty || s - (this.pSent || 0) > 2e3) &&
            ((c.p = this.paint() || ""),
            this.tuneVis && (c.u = this.tuneVis() || ""),
            (this.pSent = s),
            (this.pDirty = !1)),
          this.ride &&
            c.c === "custom" &&
            s - (this.rdSent || 0) > 2e3 &&
            ((c.rd = this.ride() || ""), (this.rdSent = s)));
        let h = this.debugDelay,
          f = this.ch,
          u = () => {
            try {
              f.send(c);
            } catch {}
          };
        if (h > 0) {
          let d = JSON.parse(JSON.stringify(c));
          setTimeout(
            () => {
              try {
                f.send(d);
              } catch {}
            },
            h * (0.85 + 0.3 * Math.random()),
          );
        } else u();
      }
      (this.ch &&
        this.traffic?.netLane &&
        !this.racing &&
        s - (this.handT || 0) > 250 &&
        ((this.handT = s), this.handOff()),
        (this.colliders.length = 0),
        (this.leaders.length = 0));
      for (let c of this.remotes.values()) c.hitQ?.n && this.flushHit(c, s);
      if (this.map) {
        let c = this.map.players || (this.map.players = []);
        c.length = 0;
        for (let h of this.remotes.values())
          h.drawn &&
            c.push({
              x: h.pose.pos.x,
              z: h.pose.pos.z,
              psi: h.pose.psi,
              name: this.nameOf(h.seat),
              col: JE[(h.seat - 1) % JE.length],
            });
      }
      if (!this.remotes.size) return;
      let i = this.camera,
        a = innerWidth,
        r = innerHeight,
        l = this.night();
      for (let c of this.remotes.values()) {
        let h = this.racers.has(c.seat);
        {
          let T = c.F.pose,
            E = Math.hypot(T.vx || 0, T.vz || 0);
          c.F.o.w = Gl.w + (12 - Gl.w) * Math.max(0, Math.min(1, (18 - E) / 8));
        }
        let f = this.offC !== null && c.F.at(s - this.offC, s, t);
        if (!f) {
          c.tag && (c.tag.style.display = "none");
          continue;
        }
        let d = c.pose,
          p = f.q || c.F.newest();
        {
          let T = c.kick;
          if (T) {
            let E = Math.exp(
              -t / Math.max(0.12, ((this.rtt || 150) + 120) / 1e3),
            );
            ((T.px = ((T.px || 0) + T.vx * t) * E),
              (T.pz = ((T.pz || 0) + T.vz * t) * E),
              (T.vx *= E),
              (T.vz *= E));
          }
        }
        ((d.pos.x = f.x + (c.kick?.px || 0)),
          (d.pos.z = f.z + (c.kick?.pz || 0)),
          (c.drawn = !0));
        let m =
          g8t && c.F.tg && Number.isFinite(c.F.tg.x)
            ? c.pr || (c.pr = new YE())
            : null;
        if (m) {
          let T = c.prAt ? Math.min(0.25, Math.max(0, (s - c.prAt) / 1e3)) : t;
          c.prAt = s;
          let E = t < 0.049 ? t : Math.max(t, T);
          c.prDt = E;
          let R = s - this.offC - c.F.o.delay - (c.F.ex || 0),
            P = c.tau;
          if (c.tau === void 0 || Math.abs(R - c.tau) > 300) c.tau = R;
          else {
            c.tau += E * 1e3;
            let L = 0.12 * E * 1e3;
            c.tau += Math.max(-L, Math.min(L, R - c.tau));
          }
          (P !== void 0 &&
            E > 0 &&
            Math.abs(c.tau - P - E * 1e3) < 0.2 * E * 1e3 &&
            (c.rate =
              (c.rate ?? 1) +
              ((c.tau - P) / (E * 1e3) - (c.rate ?? 1)) * Math.min(1, E * 2)),
            (c.tauLag = R - c.tau));
          let C = c.F.target(c.tau) || c.F.tg,
            I = c.rate ?? 1;
          (c.prT || (c.prT = {}),
            Object.assign(c.prT, {
              jump: !!(C.jump || f.jump),
              x: C.x,
              z: C.z,
              psi: C.psi,
              vx: f.stale ? 0 : C.vx * I,
              vz: f.stale ? 0 : C.vz * I,
              r: f.stale ? 0 : C.r * I,
            }),
            f.stale ? m.coast(E, c.F.pedalA(m.u)) : m.step(c.prT, E),
            this.collideProxy(c, m, d.pos.y),
            (d.pos.x = m.x),
            (d.pos.z = m.z));
        }
        if (this.groundAt) {
          if (p._air === void 0) {
            let E = this.groundAt(p[1], p[3], p[2]);
            p._air = Number.isFinite(E)
              ? Math.max(-0.2, Math.min(c.id === "roadster" ? 60 : 8, p[2] - E))
              : 0;
          }
          let T = this.groundAt(d.pos.x, d.pos.z, p[2] + 1);
          d.pos.y = Number.isFinite(T) ? T + (p._air > 0.25 ? p._air : 0) : f.y;
        } else d.pos.y = f.y;
        let g = f.psi;
        {
          let T = Math.hypot(f.vx, f.vz);
          if (T > 3) {
            let E = Math.atan2(
                Math.sin(p[4] - Math.atan2(-p[12], -p[13])),
                Math.cos(p[4] - Math.atan2(-p[12], -p[13])),
              ),
              R =
                Math.atan2(-f.vx, -f.vz) +
                (Math.hypot(p[12], p[13]) > 2 ? E : 0),
              P = Math.min(1, (T - 3) / 3);
            g =
              f.psi + Math.atan2(Math.sin(R - f.psi), Math.cos(R - f.psi)) * P;
          }
        }
        {
          let T =
              c.sm ||
              (c.sm = {
                psi: g,
                w: 0,
                b: [p[5], p[6], p[7], p[8], p[9], p[10]],
              }),
            E = 1 - Math.exp(-t * Zst),
            R = Math.atan2(Math.sin(g - T.psi), Math.cos(g - T.psi));
          if (Math.abs(R) > 2.2 || !(t > 0))
            ((T.psi = g), (T.w = Number.isFinite(p[14]) ? p[14] : 0));
          else {
            let P = Number.isFinite(p[14]) && !f.stale ? p[14] : 0,
              C = Math.max(1, Math.ceil(t / 0.008)),
              I = t / C,
              L = Zst;
            for (let F = 0; F < C; F++) {
              let O = Math.atan2(
                Math.sin(g + P * I * F - T.psi),
                Math.cos(g + P * I * F - T.psi),
              );
              ((T.w += (L * L * O + 2 * L * (P - T.w)) * I),
                (T.psi += T.w * I));
            }
          }
          d.psi = T.psi;
          for (let P = 0; P < 6; P++) {
            let C = p[5 + P];
            Number.isFinite(C) &&
              (T.b[P] =
                Math.abs(C - T.b[P]) > 0.5 ? C : T.b[P] + (C - T.b[P]) * E);
          }
          [d.pitch, d.roll, d.heave, d.bodyPitch, d.bodyRoll, d.steer] = T.b;
        }
        if (((d.speed = f.speed), m)) {
          ((d.psi = m.psi),
            (d.speed = m.u),
            Math.abs(p[11]) > 4 &&
              Number.isFinite(p[10] * p[14]) &&
              (c.sgS = (c.sgS || 0) * 0.995 + p[10] * p[14]));
          let T = (us[c.id]?.spec?.a ?? 1.4) + (us[c.id]?.spec?.b ?? 1.4),
            E = Math.max(2, Math.abs(m.u)),
            R = Math.max(
              -0.6,
              Math.min(
                0.6,
                Math.atan((m.r * T) / E) *
                  Math.sign(m.u || 1) *
                  ((c.sgS ?? 1) >= 0 ? 1 : -1),
              ),
            ),
            P =
              c.bd ||
              (c.bd = {
                sp: 0,
                sr: 0,
                spp: 0.001,
                srr: 0.001,
                p: 0,
                pv: 0,
                ro: 0,
                rv: 0,
                st: R,
                ax: 0,
              });
          ((P.ax += (m.ax - P.ax) * Math.min(1, t * 10)),
            Number.isFinite(p[8]) &&
              Number.isFinite(p[9]) &&
              Math.abs(p[11]) > 2 &&
              ((P.sp = P.sp * 0.995 + p[8] * P.ax),
              (P.spp = P.spp * 0.995 + P.ax * P.ax),
              (P.sr = P.sr * 0.995 + p[9] * m.ay),
              (P.srr = P.srr * 0.995 + m.ay * m.ay)));
          let C =
              P.spp > 20
                ? Math.max(-0.01, Math.min(0.01, P.sp / P.spp))
                : -0.003,
            I =
              P.srr > 20
                ? Math.max(-0.012, Math.min(0.012, P.sr / P.srr))
                : 0.004,
            L = Math.max(-0.08, Math.min(0.08, C * P.ax)),
            F = Math.max(-0.09, Math.min(0.09, I * m.ay)),
            O = 8.5,
            B = 0.65;
          ((P.pv += (O * O * (L - P.p) - 2 * B * O * P.pv) * t),
            (P.p += P.pv * t),
            (P.rv += (O * O * (F - P.ro) - 2 * B * O * P.rv) * t),
            (P.ro += P.rv * t),
            Number.isFinite(P.p + P.ro) || (P.p = P.ro = P.pv = P.rv = 0),
            (P.st += (R - P.st) * Math.min(1, t * 14)),
            (d.bodyPitch = P.p),
            (d.bodyRoll = P.ro),
            (d.steer = P.st));
        }
        if (this.groundAt && (p._air ?? 0) < 0.25) {
          if (c.wl === void 0 || c.wlCar !== c.car) {
            ((c.wlCar = c.car), (c.wl = null));
            try {
              let D = c.car.root,
                U = new dt(),
                G = new fe();
              (D.updateMatrixWorld(!0),
                G.copy(D.matrixWorld).invert(),
                (c.wl = c.car.wheels.map(
                  (W) => (
                    (W.spin || W.steer || W).getWorldPosition(U),
                    U.applyMatrix4(G),
                    [U.x, U.z]
                  ),
                )),
                (c.wl.length < 4 ||
                  !c.wl.every((W) => Number.isFinite(W[0] + W[1]))) &&
                  (c.wl = null));
            } catch {
              c.wl = null;
            }
          }
          let T = c.wl,
            E = (D) =>
              T
                ? T[D]
                : [
                    [-0.85, -1.3],
                    [0.85, -1.3],
                    [-0.85, 1.35],
                    [0.85, 1.35],
                  ][D],
            R = -Math.sin(d.psi),
            P = -Math.cos(d.psi),
            C = Math.cos(d.psi),
            I = -Math.sin(d.psi),
            L = d.pos.y + 1,
            F = (D) => {
              let [U, G] = E(D),
                W = -1 / 0;
              for (let V of [0, -0.2, 0.2]) {
                let $ = this.groundAt(
                  d.pos.x - R * (G + V) + C * U,
                  d.pos.z - P * (G + V) + I * U,
                  L,
                );
                Number.isFinite($) && $ > W && (W = $);
              }
              return W;
            },
            O = F(0),
            B = F(1),
            H = F(2),
            N = F(3);
          if (
            Number.isFinite(O + B + H + N) &&
            Math.max(O, B, H, N) - Math.min(O, B, H, N) < 2.5
          ) {
            let D = (E(0)[1] + E(1)[1]) / 2,
              U = (E(2)[1] + E(3)[1]) / 2,
              G = Math.max(0.5, U - D),
              W = Math.max(0.5, (E(1)[0] - E(0)[0] + E(3)[0] - E(2)[0]) / 2),
              V = (O + B) / 2,
              $ = (H + N) / 2,
              J = (O + H) / 2,
              X = (B + N) / 2,
              tt = Math.max(-0.2, Math.min(0.2, (O - B - H + N) / 4));
            ((d.pos.y =
              V +
              (($ - V) * (0 - D)) / G +
              ((p._air ?? 0) > 0.25 ? p._air : 0)),
              (d.pitch = Math.atan2(V - $, G)),
              (d.roll = Math.atan2(J - X, W)));
            let Z = d.wheelDy || (d.wheelDy = [0, 0, 0, 0]);
            ((Z[0] = tt), (Z[1] = -tt), (Z[2] = -tt), (Z[3] = tt));
            let q = this.groundAt(d.pos.x, d.pos.z, L) - 0.12;
            Number.isFinite(q) && q > d.pos.y && (d.pos.y = q);
          }
        } else d.wheelDy && d.wheelDy.fill(0);
        let b =
          c.lead ||
          (c.lead = {
            mp: !0,
            V: { L: 4.8, bw: 1.95 },
            wreck: null,
            stuckT: 0,
          });
        if (
          ((b.x = d.pos.x),
          (b.y = d.pos.y),
          (b.z = d.pos.z),
          (b.fx = -Math.sin(d.psi)),
          (b.fz = -Math.cos(d.psi)),
          (b.v = Math.max(0, d.speed)),
          this.leaders.push(b),
          !c.car)
        ) {
          c.tag && (c.tag.style.display = "none");
          continue;
        }
        if (this.world?.test) {
          let T = n.S?.box,
            E = T?.hx ?? 0.97,
            R = T?.hz ?? 2.27,
            P = T?.off ?? 0.15,
            C = { x: -Math.sin(n.psi), z: -Math.cos(n.psi) },
            I = { x: -C.z, z: C.x },
            L = this._sep || (this._sep = { t: "obb" });
          ((L.x = d.pos.x),
            (L.z = d.pos.z),
            (L.hx = (c.car.dims?.w ?? 1.95) / 2),
            (L.hz = (c.car.dims?.l ?? 4.8) / 2),
            (L.c = Math.cos(d.psi)),
            (L.s = Math.sin(d.psi)));
          let F =
            Math.abs(d.pos.y - n.pos.y) < 2 &&
            this.world.test(
              L,
              n.pos.x + C.x * P,
              n.pos.z + C.z * P,
              I,
              C,
              E,
              R,
            );
          F &&
            F.d < 1.2 &&
            ((d.pos.x -= F.n.x * F.d),
            (d.pos.z -= F.n.z * F.d),
            (this.sepN = (this.sepN || 0) + 1));
        }
        for (let T = 0; T < 4; T++)
          d.wheelSpin[T] = c.spin[T] =
            (c.spin[T] +
              (d.speed / 0.35) *
                (m && c.prAt ? Math.min(0.25, Math.max(t, c.prDt || t)) : t)) %
            (Math.PI * 2);
        (Ec(c.car, d),
          (c.car.root.visible = !0),
          c.car.root.updateMatrixWorld(!0));
        let v = (c.b ? "b" : "") + (l > 0.3 ? "n" : "");
        if (v !== c.lamps) {
          c.lamps = v;
          let T = l > 0.3;
          (xd(c.car, {
            tail: c.b ? (T ? 1.6 : 1) : T ? 1 : 0.7,
            head: T ? 1 : 0,
            signal: 0,
          }),
            c.car.onNight?.(l));
        }
        let x =
          c.T ||
          (c.T = {
            mp: !0,
            remote: !0,
            seat: c.seat,
            kind: "suv",
            V: { L: 4.8, bw: 1.95, H: 1.6 },
          });
        ((x.V.L = c.car.dims?.l ?? 4.8),
          (x.V.bw = c.car.dims?.w ?? 1.95),
          (x.m = us[c.id]?.spec?.mass || 1800));
        {
          let T =
            c.psi0 === void 0 || !(t > 0)
              ? 0
              : Math.atan2(Math.sin(d.psi - c.psi0), Math.cos(d.psi - c.psi0)) /
                t;
          ((c.psi0 = d.psi),
            (c.w =
              (c.w || 0) +
              (Math.max(-3, Math.min(3, T)) - (c.w || 0)) *
                Math.min(1, t * 12)));
        }
        ((x.x = m ? m.x : d.pos.x),
          (x.z = m ? m.z : d.pos.z),
          (x.y = d.pos.y),
          (x.heading = d.psi),
          m
            ? ((x.vx = m.vx), (x.vz = m.vz))
            : ((x.vx =
                (Number.isFinite(p[12]) ? p[12] : f.vx) + (c.kick?.vx || 0)),
              (x.vz =
                (Number.isFinite(p[13]) ? p[13] : f.vz) + (c.kick?.vz || 0))));
        let y = c.col || (c.col = { t: "obb", mv: !0, traffic: x });
        (Object.assign(y, {
          x: x.x,
          z: x.z,
          x0: x.x,
          z0: x.z,
          vx: x.vx,
          vz: x.vz,
          st0: this.v.simT || 0,
          hx: x.V.bw / 2,
          hz: x.V.L / 2,
          c: Math.cos(d.psi),
          s: Math.sin(d.psi),
          y0: d.pos.y - 0.8,
          y1: d.pos.y + x.V.H,
          racer: h,
        }),
          this.colliders.push(y));
        let M = this._v3.set(d.pos.x, d.pos.y + 2.05, d.pos.z),
          S = i.position.distanceTo(M);
        if ((M.project(i), M.z > 1 || M.z < -1 || S > 900)) {
          c.tag.style.display = "none";
          continue;
        }
        let w = (M.x * 0.5 + 0.5) * a,
          _ = (-M.y * 0.5 + 0.5) * r,
          z = Math.max(0.6, Math.min(1, 40 / Math.max(1, S)));
        ((c.tag.style.display = ""),
          (c.tag.style.transform = `translate(${w.toFixed(1)}px,${_.toFixed(1)}px) translate(-50%,-100%) scale(${z.toFixed(3)})`));
        let A = S > 60 ? Math.round(S) + " m" : "";
        c._dm !== A &&
          ((c._dm = A), (c.tag.querySelector("i").textContent = A));
      }
    }
    draw() {
      let t = this.el.panel,
        e = this.state,
        s = this.remotes.size + (this.ch ? 1 : 0);
      document.body.classList.toggle("mpRoom", !!this.ch);
      {
        let l = t.querySelector(".mpStat"),
          c = this.phase || "",
          h = Math.max(1, e?.present?.length || s);
        (c ? (l.dataset.ph = c) : delete l.dataset.ph,
          (l.querySelector("span").textContent =
            c === "live"
              ? "Connected \xB7 " +
                h +
                (h > 1 ? " drivers" : " driver (you) \xB7 send the link")
              : this.phaseMsg || ""));
      }
      ((this.el.chip.querySelector("b").textContent = this.ch
        ? String(Math.max(1, e?.present?.length || s))
        : "+"),
        (t.querySelector(".mpErr").textContent = this.err));
      {
        let l = t.querySelector("[data-mp=retry]");
        l &&
          (l.textContent =
            this.needsAcct && !Do.signedIn() ? "Sign in" : "Retry");
      }
      t.querySelector(".mpRoomName").textContent = this.ch
        ? "Room " + (this.ch.room?.name || e?.room || "")
        : "Drive " +
          bi.name +
          " with friends: open a room and send the link. Up to 8 drivers.";
      let n = e?.link || "",
        i = t.querySelector(".mpLink input");
      i && i.value !== n && (i.value = n);
      let a = this.ch?.seat,
        r = (e?.present || []).slice().sort((l, c) => l.seat - c.seat);
      t.querySelector(".mpList").innerHTML = this.ch
        ? r
            .map(
              (l) =>
                `<li${l.seat === a ? ' class="me"' : ""}><b>@${o4(l.username || "driver " + l.seat)}</b>${l.seat === a ? "<small>you</small>" : this.remotes.get(l.seat)?.id ? `<small>${o4(us[this.remotes.get(l.seat).id]?.name || "")}</small><button type="button" data-go="${l.seat}">Go to</button>` : "<small>joining\u2026</small>"}</li>`,
            )
            .join("")
        : "";
    }
  };
