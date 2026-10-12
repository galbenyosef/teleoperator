// app 345 — math
// Lines 166838-168613 of readable/app.pretty.js (statement-aligned).
var QQ = $a.has("mpk") ? +$a.get("mpk") : 12,
  H5t = $a.get("mpproxy") !== "0",
  D5t = 90,
  U5t = 260,
  ah = 9,
  G5t = 700,
  iM = (i) =>
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
  Fz = class {
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
        (this._v3 = new xt()),
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
        Ro.on((s) => {
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
        o = n?.room?.name || this.roomName || this.state?.room;
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
                  : this._closedChannels?.has(r) && o && this.mb.live.join
                    ? this.mb.live.join({ room: o })
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
              '<i class="mpSpin" aria-hidden="true"></i>' + iM(e)));
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
        this.mb.live.play({ seats: F5t }).then(
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
      let o = (this._nameRequest = this.mb.room.join({ room: this.roomName }));
      o.then(
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
        this._nameRequest === o && (this._nameRequest = null);
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
        o = new Set((t.seats || []).map(Number)),
        a = this.ch?.seat;
      if (
        (this.syncRoster(o),
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
              F: new Pz(yl),
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
            h.car && $r(h.car, dw(h.p)),
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
        if (o.has(r)) {
          l.away = 0;
          continue;
        }
        l.away
          ? e - l.away > N5t &&
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
        o = e.vel.x * n.x + e.vel.z * n.z,
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
        r(o),
        r(e.vel.x),
        r(e.vel.z),
        a(e.r),
      ]),
        this.hist.length > ZQ && this.hist.shift(),
        this.histI.push([
          l,
          r(e.throttle || 0),
          r(e.brake || 0),
          r(e.hb || 0),
          e.nitroOn ? 1 : 0,
        ]),
        this.histI.length > ZQ && this.histI.shift());
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
        o = (a) => e[a] !== n[a] && !(s && a !== "tod");
      ((o("tr") || o("pk") || o("tod")) &&
        this.post(
          0,
          20,
          o("tr") ? e.tr : -1,
          o("pk") ? e.pk : -1,
          o("tod") ? e.tod : -1,
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
            : cs[e] && e !== "custom"
              ? e
              : "waymo",
        o = (t.loading = this.loadCar(n, s).then(
          (a) => {
            if (t.loading !== o || t.gone) {
              this.dispose(a);
              return;
            }
            (t.car && (this.scene.remove(t.car.root), this.dispose(t.car)),
              (t.car = a),
              (t.lamps = ""),
              this.scene.add(a.root),
              (a.root.visible = !1),
              t.p && $r(a, dw(t.p)),
              t.u && this.vis(t));
          },
          (a) => console.warn("mp car", a),
        ));
      (t.tag ||
        ((t.tag = document.createElement("div")),
        (t.tag.className = "mpTag"),
        (t.tag.style.borderColor = Iz[(t.seat - 1) % Iz.length]),
        this.el.tags.appendChild(t.tag)),
        this.label(t));
    }
    label(t) {
      if (!t.tag) return;
      let e = this.names[t.seat] || "driver " + t.seat,
        s =
          t.id === "custom"
            ? (t.rd || "").split("|")[1] || "Custom car"
            : cs[t.id]?.name || "",
        n = Wx[bF(t.u)?.cls];
      ((t.tag.innerHTML = `<b>@${iM(e)}</b><small>${iM(s)}${n ? ` \xB7 <span style="color:${n[2]}">${n[0]}</span>` : ""}</small><i></i>`),
        (t.name = e));
    }
    vis(t) {
      if (!t.car) return;
      let e = bF(t.u);
      try {
        nM(
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
          dw(t.p)?.rim || null,
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
        o = s.p[1] + Math.sin(s.p[4]) * n,
        a = s.p[3] + Math.cos(s.p[4]) * n,
        r = this.teleport(o, a);
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
        (t.netHold = I5t),
        (t.netW = 10),
        (t.spawnOk = (e, s) => {
          if (!this.ch) return !0;
          let n = Math.hypot(e - this.v.pos.x, s - this.v.pos.z);
          for (let o of this.remotes.values())
            if (o.drawn && Math.hypot(e - o.pose.pos.x, s - o.pose.pos.z) < n)
              return !1;
          return !0;
        }),
        (t.onNetDup = (e) => this.post(e.owner, 4, e.nid)),
        (t.onNetShove = (e, s, n, o, a) => {
          let r = performance.now();
          if (r - (e._shoveT || 0) < 120) return;
          e._shoveT = r;
          let l = (c) => Math.round(c * 10) / 10;
          this.post(e.owner, 2, e.nid, l(s), l(n), l(o), l(a));
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
        o = 0;
      for (let a = t.cars.length - 1; a >= 0 && o < 6; a--) {
        let r = t.cars[a];
        if (r.net || r.route || r.cop || r.handed) continue;
        let l = Math.hypot(r.x - n.pos.x, r.z - n.pos.z);
        if (l < 40) continue;
        let c = null,
          h = l - P5t;
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
          o++);
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
        let o = 1e9;
        for (let a of s)
          o = Math.min(o, Math.abs(n.x - a.x) + Math.abs(n.z - a.z));
        o < C5t && e.push([o - (n._sent ? O5t : 0), n]);
      }
      e.sort((n, o) => n[0] - o[0]);
      for (let n of t.cars) n._sent = !1;
      return e.slice(0, L5t).map(([, n]) => ((n._sent = !0), t.netPack(n)));
    }
    hit(t, e, s, n, o) {
      let a = this.remotes.get(t.seat);
      if (!a || !this.ch) return;
      let r = performance.now();
      a.hitAt = r;
      let l = t.m || 1800;
      if (a.pr) {
        let f = -e / l,
          u = -s / l,
          d = Math.hypot(f, u);
        (d > ah && ((f *= ah / d), (u *= ah / d)), a.pr.kick(f, u));
      } else {
        let f = a.kick || (a.kick = { vx: 0, vz: 0 });
        ((f.vx -= e / l), (f.vz -= s / l));
        let u = Math.hypot(f.vx, f.vz);
        u > ah && ((f.vx *= ah / u), (f.vz *= ah / u));
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
        (h.pz = o),
        h.n++,
        this.flushHit(a, r));
    }
    flushHit(t, e) {
      let s = t.hitQ;
      if (!s?.n || e - (t.hitSent || 0) < D5t) return;
      t.hitSent = e;
      let n = (o) => Math.round(o * 100) / 100;
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
    bumped(t, e, s, n, o, a) {
      let r = this.remotes.get(t),
        l = performance.now(),
        c = this.v;
      if (![e, s, n, o].every(Number.isFinite)) return;
      if (
        ((this.got = (this.got || 0) + 1), r && l - (r.hitAt || -1e9) < U5t)
      ) {
        this.gotDup = (this.gotDup || 0) + 1;
        return;
      }
      if (
        (this.offC !== null && a > 0 && l - this.offC - a > G5t) ||
        Math.hypot(n - c.pos.x, o - c.pos.z) > 6
      )
        return;
      let h = c.S?.mass || 1500,
        f = c.S?.izz || 2500,
        u = e / h,
        d = s / h,
        p = Math.hypot(u, d);
      (p > ah && ((u *= ah / p), (d *= ah / p)),
        (c.vel.x += u),
        (c.vel.z += d));
      let m = n - c.pos.x,
        g = o - c.pos.z;
      c.r += Math.max(-1.2, Math.min(1.2, ((g * u * h - m * d * h) / f) * 0.3));
      let b = Math.min(1, Math.min(p, ah) / 14);
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
              pz: o,
              n: { x: u / (p || 1), z: d / (p || 1) },
              c: r?.col || null,
            },
            b,
            !0,
            !1,
            Math.min(p, ah) * 1.6,
            0,
          ));
    }
    boxOf(t) {
      let e = cs[t.id]?.spec?.box;
      return { hx: e?.hx ?? 0.97, hz: e?.hz ?? 2.27, off: e?.off ?? 0.15 };
    }
    collideProxy(t, e, s) {
      let n = this.world;
      if (!n?.test || !n.near) return;
      let o = this.boxOf(t),
        a = o.hx,
        r = o.hz,
        l = cs[t.id]?.spec?.mass || 1800,
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
          d = e.x + f.x * o.off,
          p = e.z + f.z * o.off,
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
                let z = Math.hypot(S, w),
                  _ = z > 0.001 ? Math.hypot(c.vel.x, c.vel.z) / z : 1;
                ((e.u *= _), (e.v *= _));
                continue;
              }
            }
            (!g || M.d > g.d) && ((g = M), (M.c = y));
          }
        }
        if (!g) break;
        let b = g.c,
          x = g.n,
          v = Math.min(g.d, 1.5);
        if (((this.proxyHits = (this.proxyHits || 0) + 1), b.traffic)) {
          let y = b.traffic;
          if (y.line) {
            ((e.x += x.x * v), (e.z += x.z * v));
            let M = e.vx * x.x + e.vz * x.z;
            M < 0 && e.kick(-x.x * M, -x.z * M);
            continue;
          }
          ((y.x -= x.x * v),
            (y.z -= x.z * v),
            (b.x = y.x),
            (b.z = y.z),
            (this.trafficYield = (this.trafficYield || 0) + 1));
        } else if (b.parked && n.parked) {
          let y = n.parked,
            M = y.wake(b) && y.view(b),
            S = 1 / l / (1 / l + 1 / M.m);
          ((e.x += x.x * v * S),
            (e.z += x.z * v * S),
            (b.x -= x.x * v * (1 - S)),
            (b.z -= x.z * v * (1 - S)));
          let w = (e.vx - M.vx) * x.x + (e.vz - M.vz) * x.z;
          if (w < 0) {
            let z = w > -1.5 ? 0 : 0.2,
              _ = (-(1 + z) * w) / (1 / l + 1 / M.m);
            (e.kick((x.x * _) / l, (x.z * _) / l),
              (M.vx -= (x.x * _) / M.m),
              (M.vz -= (x.z * _) / M.m),
              y.kick(b, -x.x * _, -x.z * _),
              y.moved?.add(b),
              (this.parkedHits = (this.parkedHits || 0) + 1));
          }
        } else {
          ((e.x += x.x * v), (e.z += x.z * v));
          let y = e.vx * x.x + e.vz * x.z;
          y < 0 && e.kick(-x.x * y, -x.z * y);
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
          o = -Math.cos(s.heading);
        t.push({
          x: s.x,
          z: s.z,
          fx: n,
          fz: o,
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
          h = B5t * Math.min(100, t * 1e3);
        this.offC += Math.abs(c) > 400 ? c : Math.max(-h, Math.min(h, c));
      }
      if (
        this.ch &&
        e &&
        (s - this.sampled >= T5t && this.takeSample(s),
        s - this.sent >= A5t && this.offC !== null)
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
        (s - this.trSent >= R5t && this.remotes.size && !this.racing
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
              col: Iz[(h.seat - 1) % Iz.length],
            });
      }
      if (!this.remotes.size) return;
      let o = this.camera,
        a = innerWidth,
        r = innerHeight,
        l = this.night();
      for (let c of this.remotes.values()) {
        let h = this.racers.has(c.seat);
        {
          let T = c.F.pose,
            E = Math.hypot(T.vx || 0, T.vz || 0);
          c.F.o.w = yl.w + (12 - yl.w) * Math.max(0, Math.min(1, (18 - E) / 8));
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
          H5t && c.F.tg && Number.isFinite(c.F.tg.x)
            ? c.pr || (c.pr = new Lz())
            : null;
        if (m) {
          let T = c.prAt ? Math.min(0.25, Math.max(0, (s - c.prAt) / 1e3)) : t;
          c.prAt = s;
          let E = t < 0.049 ? t : Math.max(t, T);
          c.prDt = E;
          let A = s - this.offC - c.F.o.delay - (c.F.ex || 0),
            C = c.tau;
          if (c.tau === void 0 || Math.abs(A - c.tau) > 300) c.tau = A;
          else {
            c.tau += E * 1e3;
            let L = 0.12 * E * 1e3;
            c.tau += Math.max(-L, Math.min(L, A - c.tau));
          }
          (C !== void 0 &&
            E > 0 &&
            Math.abs(c.tau - C - E * 1e3) < 0.2 * E * 1e3 &&
            (c.rate =
              (c.rate ?? 1) +
              ((c.tau - C) / (E * 1e3) - (c.rate ?? 1)) * Math.min(1, E * 2)),
            (c.tauLag = A - c.tau));
          let P = c.F.target(c.tau) || c.F.tg,
            I = c.rate ?? 1;
          (c.prT || (c.prT = {}),
            Object.assign(c.prT, {
              jump: !!(P.jump || f.jump),
              x: P.x,
              z: P.z,
              psi: P.psi,
              vx: f.stale ? 0 : P.vx * I,
              vz: f.stale ? 0 : P.vz * I,
              r: f.stale ? 0 : P.r * I,
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
              ? Math.max(-0.2, Math.min(8, p[2] - E))
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
              A =
                Math.atan2(-f.vx, -f.vz) +
                (Math.hypot(p[12], p[13]) > 2 ? E : 0),
              C = Math.min(1, (T - 3) / 3);
            g =
              f.psi + Math.atan2(Math.sin(A - f.psi), Math.cos(A - f.psi)) * C;
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
            E = 1 - Math.exp(-t * QQ),
            A = Math.atan2(Math.sin(g - T.psi), Math.cos(g - T.psi));
          if (Math.abs(A) > 2.2 || !(t > 0))
            ((T.psi = g), (T.w = Number.isFinite(p[14]) ? p[14] : 0));
          else {
            let C = Number.isFinite(p[14]) && !f.stale ? p[14] : 0,
              P = Math.max(1, Math.ceil(t / 0.008)),
              I = t / P,
              L = QQ;
            for (let F = 0; F < P; F++) {
              let N = Math.atan2(
                Math.sin(g + C * I * F - T.psi),
                Math.cos(g + C * I * F - T.psi),
              );
              ((T.w += (L * L * N + 2 * L * (C - T.w)) * I),
                (T.psi += T.w * I));
            }
          }
          d.psi = T.psi;
          for (let C = 0; C < 6; C++) {
            let P = p[5 + C];
            Number.isFinite(P) &&
              (T.b[C] =
                Math.abs(P - T.b[C]) > 0.5 ? P : T.b[C] + (P - T.b[C]) * E);
          }
          [d.pitch, d.roll, d.heave, d.bodyPitch, d.bodyRoll, d.steer] = T.b;
        }
        if (((d.speed = f.speed), m)) {
          ((d.psi = m.psi),
            (d.speed = m.u),
            Math.abs(p[11]) > 4 &&
              Number.isFinite(p[10] * p[14]) &&
              (c.sgS = (c.sgS || 0) * 0.995 + p[10] * p[14]));
          let T = (cs[c.id]?.spec?.a ?? 1.4) + (cs[c.id]?.spec?.b ?? 1.4),
            E = Math.max(2, Math.abs(m.u)),
            A = Math.max(
              -0.6,
              Math.min(
                0.6,
                Math.atan((m.r * T) / E) *
                  Math.sign(m.u || 1) *
                  ((c.sgS ?? 1) >= 0 ? 1 : -1),
              ),
            ),
            C =
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
                st: A,
                ax: 0,
              });
          ((C.ax += (m.ax - C.ax) * Math.min(1, t * 10)),
            Number.isFinite(p[8]) &&
              Number.isFinite(p[9]) &&
              Math.abs(p[11]) > 2 &&
              ((C.sp = C.sp * 0.995 + p[8] * C.ax),
              (C.spp = C.spp * 0.995 + C.ax * C.ax),
              (C.sr = C.sr * 0.995 + p[9] * m.ay),
              (C.srr = C.srr * 0.995 + m.ay * m.ay)));
          let P =
              C.spp > 20
                ? Math.max(-0.01, Math.min(0.01, C.sp / C.spp))
                : -0.003,
            I =
              C.srr > 20
                ? Math.max(-0.012, Math.min(0.012, C.sr / C.srr))
                : 0.004,
            L = Math.max(-0.08, Math.min(0.08, P * C.ax)),
            F = Math.max(-0.09, Math.min(0.09, I * m.ay)),
            N = 8.5,
            B = 0.65;
          ((C.pv += (N * N * (L - C.p) - 2 * B * N * C.pv) * t),
            (C.p += C.pv * t),
            (C.rv += (N * N * (F - C.ro) - 2 * B * N * C.rv) * t),
            (C.ro += C.rv * t),
            Number.isFinite(C.p + C.ro) || (C.p = C.ro = C.pv = C.rv = 0),
            (C.st += (A - C.st) * Math.min(1, t * 14)),
            (d.bodyPitch = C.p),
            (d.bodyRoll = C.ro),
            (d.steer = C.st));
        }
        if (this.groundAt && (p._air ?? 0) < 0.25) {
          if (c.wl === void 0 || c.wlCar !== c.car) {
            ((c.wlCar = c.car), (c.wl = null));
            try {
              let D = c.car.root,
                U = new xt(),
                G = new ye();
              (D.updateMatrixWorld(!0),
                G.copy(D.matrixWorld).invert(),
                (c.wl = c.car.wheels.map(
                  (q) => (
                    (q.spin || q.steer || q).getWorldPosition(U),
                    U.applyMatrix4(G),
                    [U.x, U.z]
                  ),
                )),
                (c.wl.length < 4 ||
                  !c.wl.every((q) => Number.isFinite(q[0] + q[1]))) &&
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
            A = -Math.sin(d.psi),
            C = -Math.cos(d.psi),
            P = Math.cos(d.psi),
            I = -Math.sin(d.psi),
            L = d.pos.y + 1,
            F = (D) => {
              let [U, G] = E(D),
                q = -1 / 0;
              for (let W of [0, -0.2, 0.2]) {
                let V = this.groundAt(
                  d.pos.x - A * (G + W) + P * U,
                  d.pos.z - C * (G + W) + I * U,
                  L,
                );
                Number.isFinite(V) && V > q && (q = V);
              }
              return q;
            },
            N = F(0),
            B = F(1),
            H = F(2),
            O = F(3);
          if (
            Number.isFinite(N + B + H + O) &&
            Math.max(N, B, H, O) - Math.min(N, B, H, O) < 2.5
          ) {
            let D = (E(0)[1] + E(1)[1]) / 2,
              U = (E(2)[1] + E(3)[1]) / 2,
              G = Math.max(0.5, U - D),
              q = Math.max(0.5, (E(1)[0] - E(0)[0] + E(3)[0] - E(2)[0]) / 2),
              W = (N + B) / 2,
              V = (H + O) / 2,
              Y = (N + H) / 2,
              $ = (B + O) / 2,
              st = Math.max(-0.2, Math.min(0.2, (N - B - H + O) / 4));
            ((d.pos.y =
              W +
              ((V - W) * (0 - D)) / G +
              ((p._air ?? 0) > 0.25 ? p._air : 0)),
              (d.pitch = Math.atan2(W - V, G)),
              (d.roll = Math.atan2(Y - $, q)));
            let Q = d.wheelDy || (d.wheelDy = [0, 0, 0, 0]);
            ((Q[0] = st), (Q[1] = -st), (Q[2] = -st), (Q[3] = st));
            let j = this.groundAt(d.pos.x, d.pos.z, L) - 0.12;
            Number.isFinite(j) && j > d.pos.y && (d.pos.y = j);
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
            A = T?.hz ?? 2.27,
            C = T?.off ?? 0.15,
            P = { x: -Math.sin(n.psi), z: -Math.cos(n.psi) },
            I = { x: -P.z, z: P.x },
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
              n.pos.x + P.x * C,
              n.pos.z + P.z * C,
              I,
              P,
              E,
              A,
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
        (tc(c.car, d),
          (c.car.root.visible = !0),
          c.car.root.updateMatrixWorld(!0));
        let x = (c.b ? "b" : "") + (l > 0.3 ? "n" : "");
        if (x !== c.lamps) {
          c.lamps = x;
          let T = l > 0.3;
          (Bu(c.car, {
            tail: c.b ? (T ? 1.6 : 1) : T ? 1 : 0.7,
            head: T ? 1 : 0,
            signal: 0,
          }),
            c.car.onNight?.(l));
        }
        let v =
          c.T ||
          (c.T = {
            mp: !0,
            remote: !0,
            seat: c.seat,
            kind: "suv",
            V: { L: 4.8, bw: 1.95, H: 1.6 },
          });
        ((v.V.L = c.car.dims?.l ?? 4.8),
          (v.V.bw = c.car.dims?.w ?? 1.95),
          (v.m = cs[c.id]?.spec?.mass || 1800));
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
        ((v.x = m ? m.x : d.pos.x),
          (v.z = m ? m.z : d.pos.z),
          (v.y = d.pos.y),
          (v.heading = d.psi),
          m
            ? ((v.vx = m.vx), (v.vz = m.vz))
            : ((v.vx =
                (Number.isFinite(p[12]) ? p[12] : f.vx) + (c.kick?.vx || 0)),
              (v.vz =
                (Number.isFinite(p[13]) ? p[13] : f.vz) + (c.kick?.vz || 0))));
        let y = c.col || (c.col = { t: "obb", mv: !0, traffic: v });
        (Object.assign(y, {
          x: v.x,
          z: v.z,
          x0: v.x,
          z0: v.z,
          vx: v.vx,
          vz: v.vz,
          st0: this.v.simT || 0,
          hx: v.V.bw / 2,
          hz: v.V.L / 2,
          c: Math.cos(d.psi),
          s: Math.sin(d.psi),
          y0: d.pos.y - 0.8,
          y1: d.pos.y + v.V.H,
          racer: h,
        }),
          this.colliders.push(y));
        let M = this._v3.set(d.pos.x, d.pos.y + 2.05, d.pos.z),
          S = o.position.distanceTo(M);
        if ((M.project(o), M.z > 1 || M.z < -1 || S > 900)) {
          c.tag.style.display = "none";
          continue;
        }
        let w = (M.x * 0.5 + 0.5) * a,
          z = (-M.y * 0.5 + 0.5) * r,
          _ = Math.max(0.6, Math.min(1, 40 / Math.max(1, S)));
        ((c.tag.style.display = ""),
          (c.tag.style.transform = `translate(${w.toFixed(1)}px,${z.toFixed(1)}px) translate(-50%,-100%) scale(${_.toFixed(3)})`));
        let R = S > 60 ? Math.round(S) + " m" : "";
        c._dm !== R &&
          ((c._dm = R), (c.tag.querySelector("i").textContent = R));
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
            this.needsAcct && !Ro.signedIn() ? "Sign in" : "Retry");
      }
      t.querySelector(".mpRoomName").textContent = this.ch
        ? "Room " + (this.ch.room?.name || e?.room || "")
        : "Drive San Francisco with friends: open a room and send the link. Up to 8 drivers.";
      let n = e?.link || "",
        o = t.querySelector(".mpLink input");
      o && o.value !== n && (o.value = n);
      let a = this.ch?.seat,
        r = (e?.present || []).slice().sort((l, c) => l.seat - c.seat);
      t.querySelector(".mpList").innerHTML = this.ch
        ? r
            .map(
              (l) =>
                `<li${l.seat === a ? ' class="me"' : ""}><b>@${iM(l.username || "driver " + l.seat)}</b>${l.seat === a ? "<small>you</small>" : this.remotes.get(l.seat)?.id ? `<small>${iM(cs[this.remotes.get(l.seat).id]?.name || "")}</small><button type="button" data-go="${l.seat}">Go to</button>` : "<small>joining\u2026</small>"}</li>`,
            )
            .join("")
        : "";
    }
  };
