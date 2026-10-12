// app 347 — math
// Lines 168636-170158 of readable/app.pretty.js (statement-aligned).
var oM = 2200,
  df = (i) => {
    if (!(i >= 0)) return "--:--.--";
    let t = Math.floor(i / 6e4),
      e = (i % 6e4) / 1e3;
    return t + ":" + e.toFixed(2).padStart(5, "0");
  },
  V5t = (i) =>
    i +
    (i % 10 === 1 && i % 100 !== 11
      ? "st"
      : i % 10 === 2 && i % 100 !== 12
        ? "nd"
        : i % 10 === 3 && i % 100 !== 13
          ? "rd"
          : "th"),
  Po = (i) =>
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
  $5t = `
#raceChip { pointer-events: auto; position: fixed; right: calc(var(--safe-r) + 74px); top: calc(var(--safe-t) + 46px); z-index: 8; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 18px;
  border: 1px solid rgba(255,255,255,.3); background: rgba(8,10,12,.55); color: var(--ink); font: 800 12px var(--font); letter-spacing: .12em; cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
#raceChip.hot { border-color: var(--brand); color: #fff; background: rgba(255,90,31,.85); }
body.touch #raceChip { top: calc(var(--st, 0px) + 10px); right: calc(var(--sr, 0px) + 74px); padding: 6px 10px; }
body:not(.mpOn) #raceChip { right: max(16px, 2.6vw); } body.touch:not(.mpOn) #raceChip { right: calc(var(--sr, 0px) + 10px); }
.rCard { position: fixed; z-index: 9; left: 50%; transform: translateX(-50%); width: min(420px, calc(100vw - 32px)); padding: 16px 18px; border-radius: var(--r-lg); border: 1px solid var(--line);
  background: var(--glass-strong); color: var(--ink); box-shadow: var(--sh-2); backdrop-filter: var(--blur); -webkit-backdrop-filter: var(--blur); display: none; font-family: var(--font); }
.rCard.on { display: block; } .rCard h2 { margin: 0 0 4px; font: 800 18px var(--font); font-stretch: 118%; letter-spacing: .12em; text-transform: uppercase; } .rCard h2 em { color: var(--brand); font-style: normal; }
.rCard p { margin: 0 0 10px; color: var(--dim); font: 600 12px/1.5 var(--font); }
.rCard button { width: 100%; margin-top: 8px; padding: 10px 12px; border-radius: var(--r-sm); border: 1px solid var(--line-strong); background: var(--fill); color: var(--ink); font: 800 11px var(--font); letter-spacing: .1em; text-transform: uppercase; cursor: pointer; text-align: left; display: flex; justify-content: space-between; gap: 10px; }
.rCard button small { color: var(--dim); font: 600 10px var(--font-mono); letter-spacing: .04em; text-transform: none; text-align: right; } .rCard button.go { background: var(--brand); border-color: var(--brand); color: #fff; } .rCard button.go small { color: rgba(255,255,255,.85); }
.rCard .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; } .rCard .row2 button { justify-content: center; }
#raceMenu { top: calc(max(14px, 2vh) + 92px); max-height: calc(100vh - 120px); overflow: auto; } #raceInvite { top: 18vh; z-index: 60; border-color: var(--brand); box-shadow: 0 10px 40px rgba(0,0,0,.6); } #raceRes { z-index: 40; }
#raceRes { top: auto; bottom: calc(max(16px, 3vh) + 150px); left: auto; right: max(16px, 2.5vw); transform: none; width: min(340px, calc(100vw - 32px)); padding: 12px 14px; }   /* (a player: 'notifications in the middle' - the results docked bottom-right, clear of the road ahead) */
#raceRes .big { font-size: 36px !important; } body.touch #raceRes { right: 50%; transform: translateX(50%); bottom: calc(var(--sb, 0px) + 12px); width: min(360px, calc(100vw - 24px)); } #raceRes table { width: 100%; border-collapse: collapse; margin: 6px 0 4px; font: 700 13px var(--font); } #raceRes td { padding: 6px 4px; border-top: 1px solid rgba(255,255,255,.08); }
#raceRes td.t { text-align: right; font: 600 12px var(--font-mono); } #raceRes tr.me td { color: var(--brand-2); } #raceRes .big { font: 900 54px var(--font); font-stretch: 125%; line-height: 1; letter-spacing: .02em; }
#raceRes .board { margin-top: 8px; font: 600 11px var(--font-mono); color: var(--dim); } #raceRes .board a { color: var(--ink); }
.rBar { height: 3px; background: rgba(255,255,255,.12); border-radius: 2px; overflow: hidden; margin-top: 10px; } .rBar i { display: block; height: 100%; background: var(--brand); width: 0; }
#raceHud { position: fixed; z-index: 6; left: 50%; top: var(--tc-top); transform: translateX(-50%); display: none; gap: 20px; align-items: flex-end; padding: 9px 18px 10px; border-radius: var(--r-md);
  background: var(--glass); border: 1px solid var(--line); box-shadow: var(--sh-1); backdrop-filter: var(--blur); -webkit-backdrop-filter: var(--blur); color: var(--ink); pointer-events: none; font-family: var(--font); }
body.touch #raceHud { top: var(--tc-top); gap: 12px; padding: 6px 12px 7px; } body.touch #raceHud b { font-size: 20px; } body.touch #raceHud .time b { font-size: 15px; } body.touch #raceHud .prog { width: 70px; }
#raceHud.on { display: flex; } #raceHud b { display: block; font: 900 30px var(--font); font-stretch: 120%; line-height: 1; } #raceHud small { display: block; font: 700 9px var(--font-mono); letter-spacing: .14em; color: var(--dim); text-transform: uppercase; margin-top: 3px; }
#raceHud .pos b em { font-style: normal; font-size: 15px; color: var(--dim); } #raceHud .time b { font: 700 22px var(--font-mono); }
#raceHud .prog { width: 120px; } #raceHud .prog .rBar { margin-top: 12px; } #raceHud .warn { display: none; color: var(--brand-2); font: 800 12px var(--font); letter-spacing: .1em; }
#raceHud.off .warn { display: block; }
#raceCount { position: fixed; z-index: 7; left: 50%; top: 32%; transform: translate(-50%, -50%); font: 900 120px var(--font); font-stretch: 125%; color: #fff; text-shadow: 0 6px 40px rgba(0,0,0,.6); pointer-events: none; display: none; }
#raceCount.on { display: block; } #raceCount.go { color: var(--brand); }
/* (forza53) the start's light tree, a drag strip's: three ambers down, then the green - by the start time (the room's in a room) */
#raceTree { position: fixed; z-index: 7; left: 50%; top: calc(var(--tc-top) + 74px); transform: translateX(-50%); display: none; gap: 10px; padding: 10px 14px; border-radius: var(--r-pill); background: var(--glass-strong); box-shadow: var(--sh-2); pointer-events: none; }
#raceTree.on { display: flex; }
#raceTree i { width: 34px; height: 34px; border-radius: 50%; background: #2a2016; box-shadow: inset 0 0 8px rgba(0,0,0,.8); transition: background .08s, box-shadow .08s; }
#raceTree i.lit { background: radial-gradient(circle at 40% 35%, #fff3c2, #ffb000 45%, #a85a00); box-shadow: 0 0 22px #ffb000, inset 0 0 6px rgba(255,255,255,.5); }
#raceTree i.g { background: #10241a; }
#raceTree i.g.lit { background: radial-gradient(circle at 40% 35%, #e6ffe9, #22e06b 45%, #0b7a33); box-shadow: 0 0 26px #22e06b, inset 0 0 6px rgba(255,255,255,.5); }
#raceReact { position: fixed; z-index: 7; left: 50%; top: calc(var(--tc-top) + 136px); transform: translateX(-50%); font: 800 14px var(--font); letter-spacing: .2em; color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,.7); pointer-events: none; opacity: 0; transition: opacity .3s; text-transform: uppercase; }
#raceReact.on { opacity: 1; } #raceReact b { color: #22e06b; }
#raceBrake { position: fixed; z-index: 12; left: 50%; top: 40%; transform: translateX(-50%); padding: 8px 26px; border-radius: 6px; background: rgba(230,30,22,.9); box-shadow: 0 6px 30px rgba(0,0,0,.45); color: #fff; font: 900 34px var(--font); font-stretch: 120%; letter-spacing: .22em; pointer-events: none; display: none; }
#raceBrake.on { display: block; animation: rbk .4s steps(2) infinite; } @keyframes rbk { 50% { opacity: .55; } }
body.racing #taxiCard, body.racing #taxiTrip, body.raceCard #taxiCard { display: none !important; }
.rCard h3 { margin: 12px 0 4px; font: 800 10px var(--font-mono); letter-spacing: .16em; text-transform: uppercase; color: var(--dim); }
.rCard .who { display: flex; align-items: center; gap: 8px; padding: 7px 0; border-top: 1px solid rgba(255,255,255,.08); font: 700 13px var(--font); }
.rCard .who .dot { width: 9px; height: 9px; border-radius: 50%; flex: none; } .rCard .who small { margin-left: auto; color: var(--dim); font: 600 11px var(--font-mono); }
.rCard .who .st { font: 800 11px var(--font-mono); letter-spacing: .06em; } .rCard .who .st.in { color: #7dff6a; } .rCard .who .st.out { color: #ff6b5a; } .rCard .who .st.wait { color: var(--dim); }
.rCard .who button { width: auto; margin: 0; padding: 4px 9px; font-size: 10px; }
.rCard .kbd { display: inline-block; margin-left: 6px; padding: 0 5px; border: 1px solid rgba(255,255,255,.35); border-radius: 3px; font: 700 9px var(--font-mono); opacity: .8; }
.rCard .timer { height: 4px; background: rgba(255,255,255,.12); border-radius: 2px; overflow: hidden; margin: 6px 0 2px; } .rCard .timer i { display: block; height: 100%; background: var(--brand); transition: width .25s linear; }
#raceInvite h2 { font-size: 22px; } #raceInvite .row2 button { padding: 14px 10px; font-size: 13px; }
#raceReady { position: fixed; z-index: 14; left: 50%; top: 27%; transform: translateX(-50%); text-align: center; pointer-events: none; display: none; color: #fff; text-shadow: 0 3px 20px rgba(0,0,0,.7); }
#raceReady.on { display: block; } #raceReady b { display: block; font: 900 40px var(--font); font-stretch: 120%; letter-spacing: .06em; } #raceReady small { display: block; margin-top: 6px; font: 700 13px var(--font); letter-spacing: .08em; }
#raceBoard { position: fixed; z-index: 6; right: var(--safe-r); top: calc(var(--safe-t) + 50px); min-width: 170px; padding: 6px 12px; border-radius: var(--r-md); background: var(--glass); border: 1px solid var(--line); backdrop-filter: var(--blur); -webkit-backdrop-filter: var(--blur); pointer-events: none; display: none; }
#raceBoard.on { display: block; } #raceBoard div { display: flex; gap: 8px; align-items: baseline; padding: 3px 0; font: 700 12px var(--font); color: var(--ink); } #raceBoard div.me { color: var(--brand-2); }
#raceBoard div i { font: 800 11px var(--font-mono); font-style: normal; width: 14px; color: var(--dim); } #raceBoard div small { margin-left: auto; font: 600 10px var(--font-mono); color: var(--dim); }
body.touch #raceBoard { top: calc(var(--st) + 96px); right: calc(var(--sr) + 8px); min-width: 140px; } @media (orientation: portrait) { body.touch #raceBoard { top: calc(var(--st) + 160px); } }
.rSpin { display: inline-block; flex: none; width: 12px; height: 12px; margin-right: 8px; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; animation: rsp .7s linear infinite; vertical-align: -2px; }
@keyframes rsp { to { transform: rotate(360deg); } }
.rCard button.busy { cursor: progress; justify-content: center; } .rCard button:disabled:not(.busy) { opacity: .45; cursor: default; }
.rCard .err { margin: 10px 0 0; padding: 8px 10px; border-radius: var(--r-sm); background: rgba(255,90,70,.14); border: 1px solid rgba(255,90,70,.4); color: #ffb0a4; font: 700 12px/1.4 var(--font); }
#raceRes .acts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; } #raceRes .acts button { margin: 0; padding: 12px; justify-content: center; align-items: center; font-size: 12px; }
#raceRes .acts button.go { grid-column: 1 / -1; padding: 15px 12px; font-size: 15px; }
#raceRes .next { margin-top: 10px; padding: 8px 12px 10px; border-radius: var(--r-sm); border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.04); }
#raceRes .next b { display: block; font: 800 12px var(--font); letter-spacing: .08em; text-transform: uppercase; } #raceRes .next .who { padding: 5px 0; }
#raceRes .next .row2 button { margin-top: 8px; justify-content: center; }
#raceReady .rBar { width: min(320px, 70vw); margin: 12px auto 0; height: 4px; } #raceReady .rBar i { transition: width .3s; } #raceReady .steps { margin-top: 8px; font: 600 11px var(--font-mono); letter-spacing: .04em; opacity: .85; }
`,
  aM = '<span class="rSpin"></span>',
  Bz = class {
    constructor(t) {
      (Object.assign(this, t),
        (this.S = null),
        (this.room = null),
        (this._p = {}),
        (this._q = {}));
      let e = document.createElement("style");
      ((e.textContent = $5t), document.head.appendChild(e));
      let s = (n, o, a, r = "") => {
        let l = document.createElement(n);
        return (
          o && (l.id = o),
          a && (l.className = a),
          (l.innerHTML = r),
          document.body.appendChild(l),
          l
        );
      };
      ((this.chip = s(
        "button",
        "raceChip",
        "ov",
        "\u{1F3C1} <span>RACE</span>",
      )),
        (this.chip.type = "button"),
        this.chip.setAttribute("aria-label", "Race"),
        document.getElementById("menu")?.prepend(this.chip),
        this.chip.classList.remove("ov"),
        (this.chip.onclick = (n) => {
          (n.stopPropagation(), this.chipClick());
        }),
        (this.menu = s("div", "raceMenu", "rCard")),
        (this.invite = s("div", "raceInvite", "rCard")),
        (this.res = s("div", "raceRes", "rCard")),
        (this.hud = s(
          "div",
          "raceHud",
          "",
          '<div class="pos"><b>1<em>/1</em></b><small>Position</small></div><div class="time"><b>0:00.00</b><small>Time</small></div><div class="cp"><b>0/0</b><small>Checkpoint</small></div><div class="prog"><div class="rBar"><i></i></div><small class="warn">Off course \xB7 R to reset</small></div>',
        )),
        (this.tree = s(
          "div",
          "raceTree",
          "",
          '<i></i><i></i><i></i><i class="g"></i>',
        )),
        (this.react = s("div", "raceReact", "")),
        (this.count = s("div", "raceCount", "")),
        (this.brakeEl = s("div", "raceBrake", "", "BRAKE")),
        (this.ready = s("div", "raceReady", "")),
        (this.boardEl = s("div", "raceBoard", "")),
        addEventListener(
          "keydown",
          (n) => {
            if (n.repeat) return;
            let o = this.invite.classList.contains("on")
              ? this.invite
              : this.res.classList.contains("on")
                ? this.res
                : this.menu.classList.contains("on")
                  ? this.menu
                  : null;
            if (!o) return;
            let a =
                n.key === "Enter"
                  ? "[data-k=enter]"
                  : n.key === "Escape"
                    ? "[data-k=esc]"
                    : null,
              r = a && o.querySelector(a);
            r &&
              (n.preventDefault(),
              n.stopPropagation(),
              r.disabled || r.click());
          },
          !0,
        ));
      for (let n of [this.menu, this.invite, this.res, this.chip, this.boardEl])
        (n.addEventListener("pointerdown", (o) => o.stopPropagation()),
          n.addEventListener("touchstart", (o) => o.stopPropagation(), {
            passive: !0,
          }));
      this.mp && (this.mp.raceUI = this);
    }
    get active() {
      return !!this.S;
    }
    get frozen() {
      return !!this.S && (this.S.ph === "load" || this.S.ph === "count");
    }
    clock() {
      return this.S?.net
        ? (this.mp.roomNow() ?? performance.now())
        : performance.now();
    }
    inRoom() {
      return !!this.mp?.ch;
    }
    chipClick() {
      if (this.S) {
        this.S.ph === "done" ? (this.exit(), this.openMenu()) : this.openQuit();
        return;
      }
      if (this.menu.classList.contains("on")) {
        this.pend || this.closeMenu();
        return;
      }
      this.openMenu();
    }
    closeMenu() {
      (this.menu.classList.remove("on"), delete this.menu.dataset.err);
    }
    chipText() {
      let t = this.S,
        e = this.mp?.ch?.seat,
        s = this.room,
        n =
          this.invite.classList.contains("on") ||
          this.menu.classList.contains("on") ||
          this.res.classList.contains("on");
      n !== this._card &&
        ((this._card = n), document.body.classList.toggle("raceCard", n));
      let o = t
        ? t.ph === "done"
          ? "NEW RACE"
          : t.ph === "load"
            ? "LOADING"
            : "LEAVE"
        : s?.ph === "invite" && s.inv.includes(e) && !s.dec.includes(e)
          ? s.by === e
            ? "WAITING"
            : "INVITED"
          : this.inRoom() && this.mp.others().length
            ? "CHALLENGE"
            : "RACE";
      o !== this._chipT &&
        ((this._chipT = o),
        (this.chip.querySelector("span").textContent = o),
        this.chip.classList.toggle(
          "hot",
          o === "CHALLENGE" || o === "INVITED" || o === "NEW RACE",
        ));
    }
    busy(t, e) {
      if (!t) return;
      (t
        .closest(".rCard")
        ?.querySelectorAll("button")
        .forEach((n) => {
          n.disabled = !0;
        }),
        t.classList.add("busy"),
        (t.innerHTML = aM + Po(e)));
    }
    fail(t, e, s) {
      ((this.pend = null),
        (this.menu.innerHTML = `<h2>${t}</h2><div class="err">${Po(e)}</div><div class="row2">${s ? '<button class="go" data-r="retry" data-k="enter">Try again<span class="kbd">Enter</span></button>' : ""}<button data-r="hub"${s ? "" : ' class="go" data-k="enter"'}>Race menu</button></div><button data-r="close" data-k="esc">Back to cruising<span class="kbd">Esc</span></button>`),
        (this.menu.dataset.err = "1"),
        this.menu.classList.add("on"),
        (this.menu.onclick = (n) => {
          let o = n.target.closest("[data-r]");
          if (!o || o.disabled) return;
          let a = o.dataset.r;
          (this.closeMenu(),
            a === "retry" ? s() : a === "hub" && this.openMenu());
        }));
    }
    unsend(t, e) {
      this.mp?.q &&
        (this.mp.q = this.mp.q.filter((s) => !(s[2] === t && s[3] === e)));
    }
    checkPend() {
      let t = this.pend;
      if (t) {
        if (t.done?.()) {
          ((this.pend = null),
            t.k === "challenge" && this.closeMenu(),
            (this._rk = null));
          return;
        }
        performance.now() - t.t > (t.ms || 7e3) &&
          ((this.pend = null),
          (this._rk = null),
          (this._ik = null),
          t.fail?.());
      }
    }
    dist(t) {
      let e = this.mp.poseOf(t);
      return e
        ? Math.hypot(e.pos.x - this.v.pos.x, e.pos.z - this.v.pos.z)
        : null;
    }
    best(t) {
      try {
        return +localStorage.getItem("teleop2.best." + t) || 0;
      } catch {
        return 0;
      }
    }
    openMenu() {
      let t = this.inRoom() ? this.mp.others() : [],
        e = this.room && this.room.ph !== "over",
        s =
          "<h2>Street <em>race</em></h2><p>Checkpoints through real San Francisco. At every turn, barriers close the streets you should not take: follow the chevrons.</p>";
      if (t.length) {
        s += "<h3>Race your friends</h3>";
        for (let n of t) {
          let o = this.dist(n),
            a = e && this.room.racers?.includes(n);
          s += `<div class="who"><span class="dot" style="background:${ttt[(n - 1) % 8]}"></span>@${Po(this.mp.nameOf(n))}<small>${a ? "racing" : o == null ? "" : o < 1e3 ? Math.round(o) + " m" : (o / 1e3).toFixed(1) + " km"}</small>${e ? "" : `<button data-r="one" data-s="${n}">Challenge</button>`}</div>`;
        }
        ((s += e
          ? "<p>A race is on in this room - wait for it to end.</p>"
          : `<button class="go" data-r="challenge">Challenge ${t.length > 1 ? "everybody (" + t.length + ")" : "@" + Po(this.mp.nameOf(t[0]))}<small>${(oM / 1e3).toFixed(1)} km from where you are \xB7 they join your grid</small></button>`),
          (s += "<h3>Alone, against AI rivals</h3>"));
      }
      s += `<button${t.length ? "" : ' class="go"'} data-r="here">Street race from here<small>${(oM / 1e3).toFixed(1)} km \xB7 3 rivals</small></button>`;
      for (let n of Lu) {
        let o = this.best(n.id);
        s += `<button data-r="${n.id}">${Po(n.name)}<small>${o ? "best " + df(o) : Po(n.sub)}</small></button>`;
      }
      ((s +=
        '<button data-r="close" data-k="esc">Close<span class="kbd">Esc</span></button>'),
        (this.menu.innerHTML = s),
        delete this.menu.dataset.err,
        this.menu.classList.add("on"),
        (this.menu.onclick = (n) => {
          let o = n.target.closest("[data-r]");
          if (!o || o.disabled) return;
          let a = o.dataset.r;
          if (a === "close") {
            this.closeMenu();
            return;
          }
          if (a === "challenge" || a === "one") {
            let l = a === "one" ? 1 << +o.dataset.s : 0,
              c =
                a === "one"
                  ? "@" + this.mp.nameOf(+o.dataset.s)
                  : t.length > 1
                    ? "everybody"
                    : "@" + this.mp.nameOf(t[0]);
            (this.busy(o, "Building the track\u2026"),
              setTimeout(() => {
                (this.busy(o, "Sending the challenge to " + c + "\u2026"),
                  this.challenge(l));
              }, 40));
            return;
          }
          let r =
            a === "here"
              ? {
                  kind: "walk",
                  name: "Street race",
                  seed: (Math.random() * 1e9) | 0,
                  len: oM,
                }
              : ((l) => l && { kind: "path", ...l })(
                  Lu.find((l) => l.id === a),
                );
          r &&
            (this.busy(o, "Building the track\u2026"),
            setTimeout(() => {
              (this.closeMenu(), this.startSolo(r));
            }, 40));
        }));
    }
    openQuit() {
      ((this.menu.innerHTML = `<h2>Leave the <em>race</em>?</h2><p>${Po(this.S.track.name)}</p><div class="row2"><button data-r="quit" class="go">Leave</button><button data-r="stay" data-k="esc">Keep racing<span class="kbd">Esc</span></button></div>`),
        delete this.menu.dataset.err,
        this.menu.classList.add("on"),
        (this.menu.onclick = (t) => {
          let e = t.target.closest("[data-r]");
          e && (this.closeMenu(), e.dataset.r === "quit" && this.exit());
        }));
    }
    makeTrack(t) {
      let e = null,
        s = { world: this.world, L: this.roads.L };
      if (t.kind === "path") e = hZ(this.roads, t.from, t.to, s);
      else {
        let o = (r, l, c, h = 12) => {
            let f = null;
            for (let u = 0; u < h; u++) {
              let d = cZ(
                this.roads,
                { seed: t.seed + u, x: r, z: l, psi: c, len: t.len },
                s,
              );
              if (!d) continue;
              let p = II(d, t.len);
              (!f || p.cost < f.c.cost - 1e-9) && (f = { st: d, c: p });
            }
            return f;
          },
          a = o(t.x, t.z, t.psi);
        if (!a || F_(a.st) > Iw) {
          let r = null,
            l = lZ(this.roads, t.x, t.z, s, 1500, 14),
            c = (h) => (h.c.gmax > 0.15 ? 1e3 : 0) + h.c.cost;
          for (let h of l) {
            if (r && h.d > l[0].d + (c(r.b) < 1e3 ? 600 : 1200)) break;
            let f = o(h.x, h.z, h.psi, 8);
            f &&
              F_(f.st) <= Iw &&
              (!r || c(f) < c(r.b) - 1e-9) &&
              (r = { b: f, F: h });
          }
          r && ((a = r.b), (this.movedStart = r.F));
        }
        ((e = a?.st || null), (this.lastCost = a?.c || null));
      }
      if (t.kind === "path" && e)
        for (let o = 0; o < 4 && e.length > 2 && F_(e) > Iw; o++)
          e = e.slice(1);
      let n = e ? new I_(this.roads, e, t) : null;
      return (n && (n.cost = II(e, t.len || n.L)), n);
    }
    begin(t) {
      ((this.S = t),
        this.scene.add(t.track.group),
        t.track.lightGates(0),
        this.env.begin(),
        document.body.classList.add("racing"),
        this.menu.classList.remove("on"),
        this.res.classList.remove("on"));
      let e = t.track.grid(t.slot);
      (this.place({ x: e.x, z: e.z, psi: e.psi }),
        (t.me = { s: e.s, cp: 0, fin: null, off: 0 }),
        (t.offT = 0),
        (this._hc = null),
        (this._off = null),
        this.hud.classList.add("on"),
        (this._bk = null),
        (this._rdy = null),
        this.chipText());
    }
    startSolo(t) {
      this.S && this.exit();
      let e = this.v,
        s =
          t.kind === "walk" && t.x === void 0
            ? { ...t, x: e.pos.x, z: e.pos.z, psi: e.psi }
            : t,
        n = this.makeTrack(s);
      if (!n || n.L < 400) {
        (n?.dispose(),
          this.fail(
            "No race <em>here</em>",
            "No track fits from this spot: drive to a longer street, or pick a preset sprint.",
            t.kind === "path" ? () => this.startSolo(t) : null,
          ));
        return;
      }
      let o = this.carId(),
        a = W5t.filter((l) => l.car !== o).slice(0, 3),
        r = {
          net: !1,
          id: t.id || null,
          track: n,
          ph: "load",
          slot: a.length,
          bots: [],
          l0: performance.now(),
        };
      (this.prof(n),
        a.forEach((l, c) => {
          let h = n.grid(c),
            f = {
              ...l,
              carId: l.car,
              car: null,
              i: c,
              s: h.s,
              lat: h.lat,
              bias: [-0.6, 0.6, 0][c % 3],
              v: 0,
              fin: null,
              spin: [0, 0, 0, 0],
              pose: { pos: { x: 0, y: 0, z: 0 }, wheelSpin: [0, 0, 0, 0] },
            };
          (r.bots.push(f),
            this.loadCar(f.carId).then(
              (u) => {
                this.S === r && ((f.car = u), this.scene.add(u.root));
              },
              (u) => {
                (console.warn("race bot", u), (f.failed = !0));
              },
            ));
        }),
        this.begin(r));
    }
    prof(t) {
      if (t.prof) return t.prof;
      t.bounds(this.world);
      let e = t.n,
        s = new Float32Array(e),
        n = new Float32Array(e),
        o = t.racingLine(),
        a = new Float32Array(e),
        r = new Float32Array(e);
      for (let l = 0; l < e; l++)
        ((a[l] = t.X[l] - t.DZ[l] * o[l]), (r[l] = t.Z[l] + t.DX[l] * o[l]));
      for (let l = 0; l < e; l++) {
        let c = Math.max(0, l - 4),
          h = Math.min(e - 1, l + 4),
          f = a[l] - a[c],
          u = r[l] - r[c],
          d = a[h] - a[l],
          p = r[h] - r[l],
          m = a[h] - a[c],
          g = r[h] - r[c],
          b = f * p - u * d,
          x = Math.hypot(f, u),
          v = Math.hypot(d, p),
          y = Math.hypot(m, g),
          M = x * v * y > 1e-6 ? (2 * b) / (x * v * y) : 0;
        ((n[l] = M),
          (s[l] = Math.min(q5t, Math.sqrt(j5t / Math.max(1e-4, Math.abs(M))))));
      }
      for (let l = 0; l < 2; l++)
        for (let c = 1; c < e - 1; c++)
          n[c] = (n[c - 1] + 2 * n[c] + n[c + 1]) / 4;
      for (let l = 1; l < e; l++)
        s[l] = Math.min(s[l], Math.sqrt(s[l - 1] ** 2 + 2 * ett * Nz));
      for (let l = e - 2; l >= 0; l--)
        s[l] = Math.min(s[l], Math.sqrt(s[l + 1] ** 2 + 2 * stt * Nz));
      return ((t.K = n), (t.prof = s));
    }
    challenge(t = 0) {
      let e = this.v,
        s = 1 + ((Math.random() * 1e6) | 0),
        n = 1 + ((Math.random() * 1e8) | 0),
        o = this.makeTrack({
          kind: "walk",
          seed: n,
          x: e.pos.x,
          z: e.pos.z,
          psi: e.psi,
          len: oM,
        });
      if (!o) {
        this.fail(
          "No race <em>here</em>",
          "No track fits from this spot: drive to a longer street and challenge again.",
          null,
        );
        return;
      }
      if ((o.dispose(), this.room && this.room.ph !== "over")) {
        this.fail(
          "A race is <em>on</em>",
          "This room has a race going: wait for it to end, then challenge.",
          () => this.openMenu(),
        );
        return;
      }
      (this.mp.post(
        0,
        10,
        s,
        n,
        Math.round(e.pos.x * 10) / 10,
        Math.round(e.pos.z * 10) / 10,
        Math.round(e.psi * 1e3),
        oM,
        t,
      ),
        (this._sent = performance.now()),
        (this.pend = {
          k: "challenge",
          t: performance.now(),
          done: () => this.room?.id === s,
          fail: () => {
            (this.unsend(10, s),
              this.fail(
                "Challenge <em>not sent</em>",
                "The room did not answer. Check the connection and try again.",
                () => this.challenge(t),
              ));
          },
        }));
    }
    rematch() {
      let t = 1 + ((Math.random() * 1e6) | 0),
        e = this.mp.ch?.seat;
      (this.mp.post(0, 16, t),
        (this._sent = performance.now()),
        (this.pend = {
          k: "rematch",
          t: performance.now(),
          done: () => this.room?.ph === "invite" && this.room.inv.includes(e),
          fail: () => {
            (this.unsend(16, t),
              (this.reErr =
                "The rematch did not go through (the others may have left). Try again, or start a new race."),
              (this._rk = null));
          },
        }),
        (this.reErr = null),
        (this._rk = null));
    }
    onRoom(t) {
      let e = this.mp?.ch?.seat;
      ((this.room = t && t.ph !== "over" ? t : null),
        this.S?.net &&
          this.S.ph !== "done" &&
          t &&
          (t.id !== this.S.id || !t.racers.includes(e) || t.out.includes(e)) &&
          (this.toast?.("Race ended for you", "Back to cruising"),
          this.exit(!0)));
      let s = this._lastInv;
      if (
        ((this._lastInv = t?.ph === "invite" && t.by === e ? t : null),
        s && (!t || t.id !== s.id) && this._calledOff !== s.id)
      ) {
        let o = Po(
          s.inv
            .filter((a) => a !== e)
            .map((a) => "@" + this.mp.nameOf(a))
            .join(", "),
        );
        (this.toast?.(
          s.rematch ? "No rematch" : "No race",
          o + " did not join \xB7 try again from \u{1F3C1}",
        ),
          (this._rk = null));
      }
      if (!t) {
        (this.invite.classList.remove("on"),
          (this._ik = null),
          this.S?.net && this.S.ph !== "done"
            ? (this.toast?.("Race called off", "Back to cruising"),
              this.exit(!0))
            : this.S?.ph === "done" && this.drawResults());
        return;
      }
      let n = this.S?.ph === "done";
      (t.ph === "invite" && t.inv.includes(e) && !n
        ? this.drawInvite(t, e)
        : (this.invite.classList.remove("on"), (this._ik = null)),
        n && !(this.S.net && this.S.id === t.id) && this.drawResults(),
        t.ph === "race" &&
          t.racers.includes(e) &&
          !t.out.includes(e) &&
          t.fin[e] === void 0 &&
          this._left !== t.id &&
          !(this.S?.net && this.S.id === t.id) &&
          this.startNet(t, e),
        this.S?.net &&
          this.S.id === t.id &&
          ((this.S.R = t),
          (t.ph === "over" || t.fin[e] !== void 0) &&
            (this.S.ph !== "done" &&
              ((this.S.ph = "done"),
              t.fin[e] !== void 0
                ? (this.S.me.fin = t.fin[e])
                : (this.S.me.dnf = !0)),
            this.drawResults())));
    }
    inviteView(t, e) {
      let s = this.mp.roomNow(),
        n = s == null ? 15e3 : Math.max(0, 15e3 - (s - t.c0)),
        o = Math.ceil(n / 1e3),
        a = this.pend?.id === t.id ? this.pend : null,
        r = (b) =>
          t.acc.includes(b)
            ? '<span class="st in">IN</span>'
            : t.dec.includes(b)
              ? '<span class="st out">OUT</span>'
              : '<span class="st wait">waiting\u2026</span>',
        l = t.inv
          .map(
            (b) =>
              `<div class="who"><span class="dot" style="background:${ttt[(b - 1) % 8]}"></span>${b === e ? "You" : "@" + Po(this.mp.nameOf(b))}${b === t.by ? " <small>challenger</small>" : "<small></small>"}${r(b)}</div>`,
          )
          .join(""),
        c = `<div class="timer"><i style="width:${((100 * n) / 15e3).toFixed(0)}%"></i></div>`,
        h = `${t.rematch ? "Rematch \xB7 " : ""}Street race \xB7 ${(t.len / 1e3).toFixed(1)} km`,
        f = t.inv
          .filter((b) => b !== e && !t.acc.includes(b) && !t.dec.includes(b))
          .map((b) => "@" + Po(this.mp.nameOf(b))),
        u = (b, x, v, y, M) =>
          a && a.k === b
            ? `<button class="${x} busy" data-i="${b}" disabled>${aM}${M}</button>`
            : `<button${x ? ` class="${x}"` : ""} data-i="${b}" data-k="${y}"${a ? " disabled" : ""}>${v}<span class="kbd">${y === "enter" ? "Enter" : "Esc"}</span></button>`,
        d,
        p,
        m = "";
      if (e === t.by)
        ((d = f.length
          ? `Waiting for <em>${f.slice(0, 2).join(", ")}${f.length > 2 ? " +" + (f.length - 2) : ""}</em>`
          : "Everybody <em>answered</em>"),
          (p = `${h} from your spot \xB7 ${f.length ? `starts when everybody answers, or in ${o} s` : "starting\u2026"}`),
          (m = `<div class="row2">${t.acc.length < 2 ? `<button class="go busy" disabled>${aM}Waiting \xB7 ${o} s</button>` : u("start", "go", "Start now", "enter", "Starting\u2026")}${u("off", "", "Call off", "esc", "Calling off\u2026")}</div>`));
      else if (t.acc.includes(e))
        ((d = "You're <em>in</em>"),
          (p = `${h} \xB7 @${Po(this.mp.nameOf(t.by))}'s grid \xB7 ${f.length ? `waiting for ${f.join(", ")} \xB7 starts in ${o} s at the latest` : "starting\u2026"}`));
      else {
        if (t.dec.includes(e)) return null;
        ((d = `<em>@${Po(this.mp.nameOf(t.by))}</em> ${t.rematch ? "wants a rematch" : "challenges you"}`),
          (p = `${h} \xB7 answer in ${o} s \xB7 you will be put on the start grid`),
          (m = `<div class="row2">${u("yes", "go", "Race", "enter", "Joining\u2026")}${u("no", "", "Not now", "esc", "\u2026")}</div>`));
      }
      let g =
        this.ansErr?.id === t.id
          ? `<div class="err">${Po(this.ansErr.msg)}</div>`
          : "";
      return {
        title: d,
        text: p,
        rows: l,
        timer: c,
        buttons: m,
        err: g,
        key:
          t.id +
          ":" +
          t.acc.join(",") +
          ":" +
          t.dec.join(",") +
          ":" +
          o +
          ":" +
          (a ? a.k : "") +
          ":" +
          g.length,
      };
    }
    answer(t, e, s) {
      let n = this.mp.ch?.seat,
        o = { yes: 11, no: 12, start: 13, off: 15 }[t];
      if (o) {
        if (
          (this.mp.post(0, o, e.id),
          (this.ansErr = null),
          t === "off" && (this._calledOff = e.id),
          t === "no" || t === "off")
        ) {
          (this.invite.classList.remove("on"),
            (this._ik = null),
            (this._rk = null));
          return;
        }
        ((this.pend = {
          k: t,
          id: e.id,
          t: performance.now(),
          done: () => {
            let a = this.room;
            return (
              !a ||
              a.id !== e.id ||
              a.ph !== "invite" ||
              (t === "yes" && a.acc.includes(n))
            );
          },
          fail: () => {
            (this.unsend(o, e.id),
              (this.ansErr = {
                id: e.id,
                msg: "The room did not answer: try again.",
              }));
          },
        }),
          this.busy(s, t === "yes" ? "Joining\u2026" : "Starting\u2026"),
          (this._ik = null),
          (this._rk = null));
      }
    }
    drawInvite(t, e) {
      let s = this.inviteView(t, e);
      if (!s) {
        this.invite.classList.remove("on");
        return;
      }
      this._ik !== s.key &&
        ((this._ik = s.key),
        e !== t.by &&
          !t.acc.includes(e) &&
          this._toasted !== t.id &&
          ((this._toasted = t.id), this.env.focus?.()),
        (this.invite.innerHTML = `<h2>${s.title}</h2><p>${s.text}</p>${s.timer}${s.rows}${s.err}${s.buttons}`),
        this.invite.classList.add("on"),
        (this.invite.onclick = (n) => {
          let o = n.target.closest("[data-i]");
          !o || o.disabled || this.answer(o.dataset.i, t, o);
        }));
    }
    startNet(t, e) {
      this.S && this.exit(!0);
      let s = this.makeTrack({
        kind: "walk",
        name: "Street race",
        seed: t.seed,
        x: t.x,
        z: t.z,
        psi: t.psi / 1e3,
        len: t.len,
      });
      if (!s) {
        (this.mp.post(0, 15, t.id),
          (this._left = t.id),
          this.fail(
            "Race <em>failed</em>",
            "The track could not be built on this machine. You are out of this one.",
            null,
          ));
        return;
      }
      ((this.pend = null), (this.ansErr = null), this.env.focus?.());
      let n = {
        net: !0,
        id: t.id,
        R: t,
        track: s,
        ph: "count",
        t0: t.t0,
        slot: t.racers.indexOf(e),
        bots: [],
      };
      ((this.mp.racing = !0),
        (this.mp.racers = new Set(t.racers.filter((o) => o !== e))),
        this.prof(s),
        this.begin(n),
        this.invite.classList.remove("on"));
    }
    update(t, e) {
      let s = this.S;
      if ((this.checkPend(), !s)) {
        let m = this.mp?.ch?.seat;
        (m &&
          this.room?.ph === "invite" &&
          this.room.inv.includes(m) &&
          this.drawInvite(this.room, m),
          this.chipText());
        return;
      }
      let n = this.clock(),
        o = s.track,
        a = this.v;
      if (s.ph === "load") {
        let m = s.bots.length,
          g = s.bots.filter((v) => v.car || v.failed).length,
          b = !this.held(),
          x = (1 + (b ? 1 : 0) + g) / (2 + m);
        if (b && g === m)
          ((s.bots = s.bots.filter((v) => v.car)),
            (s.ph = "count"),
            (s.t0 = n + 3600),
            (this._rdy = null));
        else if (performance.now() - s.l0 > 3e4) {
          let v = o.def;
          (this.exit(),
            this.fail(
              "The race <em>did not load</em>",
              b
                ? "The rivals' cars did not arrive. Check the connection and try again."
                : "The city round the start did not finish loading. Try again.",
              () => this.startSolo(v),
            ));
          return;
        } else {
          let v = "load:" + Math.round(x * 20) + (b ? 1 : 0) + g;
          this._rdy !== v &&
            ((this._rdy = v),
            this.ready.classList.add("on"),
            (this.ready.innerHTML = `<b>LOADING THE RACE</b><small>${Po(o.name)} \xB7 ${(o.L / 1e3).toFixed(1)} km \xB7 ${o.cps.length} checkpoints</small><div class="rBar"><i style="width:${Math.round(x * 100)}%"></i></div><div class="steps">track \u2713 \xB7 city ${b ? "\u2713" : "\u2026"} \xB7 rivals ${g}/${m}</div>`));
        }
      }
      if (s.ph === "count") {
        let m = s.t0 - n,
          g = Math.ceil(m / 1e3),
          b =
            m > 3e3
              ? s.net
                ? "vs " +
                  [...this.mp.racers]
                    .map((v) => "@" + this.mp.nameOf(v))
                    .join(" \xB7 ")
                : s.bots.map((v) => v.name).join(" \xB7 ")
              : "";
        (this._rdy !== b &&
          ((this._rdy = b),
          this.ready.classList.toggle("on", !!b),
          b &&
            (this.ready.innerHTML = `<b>GET READY</b><small>${Po(s.track.name)} \xB7 ${(s.track.L / 1e3).toFixed(1)} km \xB7 ${Po(b)}</small>`)),
          this.count.classList.toggle("on", m <= 3e3),
          this.count.classList.toggle("go", !1),
          (this.count.textContent = g > 0 ? String(g) : ""),
          this.tree.classList.toggle("on", m <= 3200));
        let x = this.tree.children;
        for (let v = 0; v < 3; v++)
          x[v].classList.toggle("lit", m <= 3e3 - v * 1e3);
        if ((x[3].classList.remove("lit"), m <= 0)) {
          x[3].classList.add("lit");
          for (let v = 0; v < 3; v++) x[v].classList.remove("lit");
          ((s.greenAt = n),
            (s.react = null),
            (s.heldAtGreen = (this.rawThr || 0) > 0.5),
            setTimeout(() => {
              (this.tree.classList.remove("on"), x[3].classList.remove("lit"));
            }, 1400));
        }
        m <= 0 &&
          ((s.ph = "race"),
          (this.count.textContent = "GO"),
          this.count.classList.add("on", "go"),
          setTimeout(() => this.count.classList.remove("on", "go"), 900),
          window.mindblown?.run?.start?.());
      }
      if (s.ph === "race" && s.greenAt && s.react === null) {
        let m = (n - s.greenAt) / 1e3;
        if ((this.rawThr || 0) > 0.5 || m > 3) {
          s.react = m;
          let g = m < 0.25 && !s.heldAtGreen;
          (g &&
            ((this.v.vel.x *= 1.08),
            (this.v.vel.z *= 1.08),
            (this.v.nitro = Math.min(
              this.v.S?.nitroMax ?? 1,
              (this.v.nitro || 0) + 0.25,
            ))),
            (this.react.innerHTML =
              m > 3
                ? ""
                : s.heldAtGreen
                  ? "Launched on the gas \xB7 no reaction bonus"
                  : `${g ? "<b>Perfect start</b> \xB7 " : m < 0.5 ? "Good start \xB7 " : "Late start \xB7 "}reaction ${m.toFixed(3)} s`),
            this.react.classList.add("on"),
            setTimeout(() => this.react.classList.remove("on"), 2200));
        }
      }
      let r = s.ph === "race" || s.ph === "done" ? n - s.t0 : 0,
        l = s.me,
        c = o.project(a.pos.x, a.pos.z, l.s, this._p);
      (c.d < 60 && (l.s = c.s),
        s.ph === "race" &&
          l.fin == null &&
          (l.s >= o.cps[l.cp] - 3 &&
            c.d < o.at(l.s, this._q).w + 8 &&
            (l.cp++,
            o.lightGates(l.cp),
            l.cp >= o.cps.length
              ? this.finishMe(r)
              : this.toast?.(
                  "Checkpoint " + l.cp + " / " + (o.cps.length - 1),
                  df(r),
                )),
          (s.offT = c.d > o.at(l.s, this._q).w + 12 ? s.offT + t : 0),
          s.offT > 3.5 &&
            (this.reset(),
            this.toast?.("Back on the track", "Off the course too long"))),
        s.ph === "race" && l.fin == null && this.brakeLine !== !1
          ? this.brakeCue(s, a)
          : (this._bkOn &&
              ((this._bkOn = !1), this.brakeEl.classList.remove("on")),
            this.brakeLine === !1 && s.track?.colorCarpet?.(1, 0, () => 0)),
        this.stepBots(t, s, r));
      let h = [{ me: !0, name: "You", fin: l.fin, s: l.s }];
      for (let m of s.bots)
        h.push({
          name: m.name,
          car: m.car && cs[m.car.id]?.name,
          fin: m.fin,
          s: m.s,
        });
      if (s.net)
        for (let m of this.mp.racers) {
          let g = this.mp.poseOf(m),
            b = g ? o.project(g.pos.x, g.pos.z, s.rs?.[m], {}) : null;
          (((s.rs || (s.rs = {}))[m] = b ? b.s : 0),
            h.push({
              seat: m,
              name: "@" + this.mp.nameOf(m),
              fin: s.R?.fin?.[m] ?? null,
              out: s.R?.out?.includes(m),
              s: b ? b.s : 0,
            }));
        }
      (h.sort((m, g) =>
        (m.fin != null) != (g.fin != null)
          ? m.fin != null
            ? -1
            : 1
          : m.fin != null
            ? m.fin - g.fin
            : g.s - m.s,
      ),
        (s.rows = h));
      let f = h.findIndex((m) => m.me) + 1,
        u = this.hud,
        d = (m, g, b) => {
          let x = this._hc || (this._hc = {});
          if (x[m] === b) return;
          x[m] = b;
          let v = u.querySelector(m);
          g === "w" ? (v.style.width = b) : (v[g] = b);
        };
      if (
        (d(".pos b", "innerHTML", f + "<em>/" + h.length + "</em>"),
        d(".time b", "textContent", df(l.fin ?? r)),
        d(
          ".cp b",
          "textContent",
          Math.min(l.cp, o.cps.length) + "/" + o.cps.length,
        ),
        d(
          ".prog i",
          "w",
          (
            100 *
            Math.max(0, Math.min(1, (l.s - o.start) / (o.finish - o.start)))
          ).toFixed(0) + "%",
        ),
        this._off !== s.offT > 2 &&
          ((this._off = s.offT > 2), u.classList.toggle("off", this._off)),
        this.map)
      ) {
        let m = o.at(o.cps[Math.min(l.cp, o.cps.length - 1)], this._q);
        this.map.overlay = {
          route: s.route || (s.route = o.route()),
          target: {
            x: m.x,
            z: m.z,
            col: "#ff8a2a",
            label: l.cp >= o.cps.length - 1 ? "Finish" : "Checkpoint",
          },
        };
      }
      let p = h
        .map(
          (m, g) =>
            `<div${m.me ? ' class="me"' : ""}><i>${g + 1}</i>${Po(m.name)}<small>${m.fin != null ? df(m.fin) : m.out ? "out" : g ? "+" + Math.max(0, Math.round(h[g - 1].s - m.s)) + " m" : ""}</small></div>`,
        )
        .join("");
      (p !== this._bk && ((this._bk = p), (this.boardEl.innerHTML = p)),
        this.boardEl.classList.toggle(
          "on",
          h.length > 1 && (s.ph === "race" || s.ph === "done"),
        ),
        s.ph === "done" && this.drawResults(),
        this.chipText());
    }
    brakeCue(t, e) {
      let s = t.track,
        n = this.prof(s),
        o = Math.hypot(e.vel.x, e.vel.z),
        a = t.me.s,
        r = 8.5,
        l = 5.5,
        c = 1.06,
        h = (u) => n[Math.min(s.n - 1, Math.max(0, Math.round(u / Nz)))] * c,
        f = (u) => {
          let d = Math.max(0.5, u - a),
            p = h(u);
          return o <= p ? 0 : (o * o - p * p) / (2 * d);
        };
      s.colorCarpet(a + 3, a + 140, (u) => {
        let d = f(u);
        return d <= 0.5 || d < l ? 1 : d < r ? 2 : 3;
      });
    }
    finishMe(t) {
      let e = this.S;
      if (
        ((e.me.fin = t),
        (e.ph = "done"),
        window.mindblown?.run?.end?.({ seconds: Math.round(t / 100) / 10 }),
        e.net)
      )
        this.mp.post(0, 14, e.id, Math.round(t));
      else if (e.id) {
        let s = this.best(e.id);
        if (!s || t < s) {
          try {
            localStorage.setItem("teleop2.best." + e.id, String(Math.round(t)));
          } catch {}
          e.newBest = !0;
        }
        window.mindblown?.leaderboard
          ?.submit?.("race_" + e.id, Math.round(t / 10) / 100, { lower: !0 })
          .then(
            () => this.board(e),
            () => {},
          );
      }
      this.drawResults();
    }
    board(t) {
      window.mindblown?.leaderboard?.top?.("race_" + t.id, { limit: 5 }).then(
        (e) => {
          this.S === t && ((t.top = e), this.drawResults());
        },
        () => {},
      );
    }
    drawResults() {
      let t = this.S;
      if (!t) return;
      let e = this.mp?.ch?.seat,
        s = t.rows || [],
        n = t.R,
        o = t.net && n?.ph === "over" ? n.places : null,
        a = t.me.fin,
        r = (y) => "@" + Po(this.mp.nameOf(y)),
        l = s.map((y) => ({ ...y }));
      o &&
        l.sort(
          (y, M) => o.indexOf(y.me ? e : y.seat) - o.indexOf(M.me ? e : M.seat),
        );
      let c = l.findIndex((y) => y.me) + 1;
      !t.paid &&
        (t.net ? o : a != null) &&
        ((t.paid = !0),
        (t.prize =
          this.onResult?.({
            place: t.me.dnf ? l.length : c,
            of: l.length,
            net: t.net,
            ms: a,
            id: t.id,
          }) || 0));
      let h = (y) =>
          y.me
            ? t.me.dnf
              ? "DNF"
              : df(a)
            : y.fin != null
              ? df(y.fin)
              : y.out
                ? "out"
                : t.net
                  ? o
                    ? "DNF"
                    : "racing\u2026"
                  : "~" +
                    df(
                      a +
                        (Math.max(0, t.track.finish - y.s) /
                          Math.max(
                            12,
                            (y.s - t.track.start) / Math.max(1, a / 1e3),
                          )) *
                          1e3,
                    ),
        f = `<div class="big">${t.me.dnf ? "DNF" : V5t(c)}</div><h2>${Po(t.track.name)}</h2><p>${t.me.dnf ? "not finished" : df(a)}${t.newBest ? " \xB7 new best" : t.id && !t.net && this.best(t.id) ? " \xB7 best " + df(this.best(t.id)) : ""}${t.prize ? ' \xB7 <b style="color:var(--acc2)">+$' + t.prize + "</b>" : ""}</p>`;
      ((f +=
        "<table>" +
        l
          .map(
            (y, M) =>
              `<tr${y.me ? ' class="me"' : ""}><td>${M + 1}</td><td>${Po(y.name)}${y.car ? " <small>" + Po(y.car) + "</small>" : ""}</td><td class="t">${h(y)}</td></tr>`,
          )
          .join("") +
        "</table>"),
        t.top?.length &&
          (f +=
            '<div class="board">Leaderboard: ' +
            t.top
              .map(
                (y) =>
                  `${y.rank}. ${y.profile_url ? `<a href="${Po(y.profile_url)}" target="_blank" rel="noopener">${Po(y.username || "guest")}</a>` : Po(y.username || "guest")} ${df(y.value * 1e3)}`,
              )
              .join(" \xB7 ") +
            "</div>"));
      let u = this.room,
        d = u?.ph === "invite" && u.inv.includes(e) && !u.dec.includes(e),
        p = this.pend?.k === "rematch",
        m = "";
      if (t.net && !o) {
        let y = this.mp.roomNow(),
          M = n?.first && y != null ? Math.max(0, 45e3 - (y - n.first)) : null,
          S = (n?.racers || []).filter(
            (w) => w !== e && n.fin[w] === void 0 && !n.out.includes(w),
          );
        m = `<div class="next"><b>${aM}Waiting for ${S.length ? S.map(r).join(", ") : "the others"}</b><p>The places are final when everybody is in${M != null ? ` \xB7 at the latest in ${Math.ceil(M / 1e3)} s` : ""}</p>${M != null ? `<div class="timer"><i style="width:${((100 * M) / 45e3).toFixed(0)}%"></i></div>` : ""}</div>`;
      } else if (d) {
        let y = this.inviteView(u, e);
        y &&
          (m = `<div class="next"><b>${y.title}</b><p>${y.text}</p>${y.timer}${y.rows}${y.err}${y.buttons}</div>`);
      } else
        p
          ? (m = `<div class="next"><b>${aM}Asking for a rematch\u2026</b><p>${(
              t.R?.racers || []
            )
              .filter((y) => y !== e)
              .map(r)
              .join(", ")} will be asked</p></div>`)
          : t.net && u && u.ph === "race"
            ? (m =
                '<div class="next"><b>A race is on in the room</b><p>Wait for it to end to race again, or start a solo race.</p></div>')
            : t.net &&
              this.reErr &&
              (m = `<div class="err">${Po(this.reErr)}</div>`);
      let g = (y) => `<span class="kbd">${y}</span>`,
        b;
      t.net
        ? o
          ? d || p
            ? (b = "")
            : u
              ? (b =
                  '<button class="go" disabled>Race again \xB7 a race is on</button>')
              : (b = `<button class="go" data-r="rematch" data-k="enter">Race again \xB7 rematch${g("Enter")}</button>`)
          : (b =
              '<button class="go" disabled>Race again \xB7 after the results</button>')
        : (b = `<button class="go" data-r="again" data-k="enter">Race again${g("Enter")}</button>`);
      let x = `<div class="acts">${b}<button data-r="new">New race</button><button data-r="exit" data-k="esc">Back to cruising${g("Esc")}</button></div>`,
        v = this.res._p;
      if (!v) {
        this.res.innerHTML = "<div></div><div></div><div></div>";
        let [y, M, S] = this.res.children;
        v = this.res._p = { el: { main: y, next: M, acts: S } };
      }
      for (let [y, M] of [
        ["main", f],
        ["next", m],
        ["acts", x],
      ])
        v[y] !== M && ((v[y] = M), (v.el[y].innerHTML = M));
      (this.res.classList.add("on"),
        (this.res.onclick = (y) => {
          let M = y.target.closest("[data-i]");
          if (M) {
            !M.disabled && this.room && this.answer(M.dataset.i, this.room, M);
            return;
          }
          let S = y.target.closest("[data-r]");
          if (!S || S.disabled) return;
          let w = S.dataset.r;
          if (w === "again") {
            let z = t.track.def;
            (this.busy(S, "Building the track\u2026"),
              setTimeout(() => {
                (this.exit(), this.startSolo(z));
              }, 40));
          } else
            w === "rematch"
              ? (this.busy(S, "Asking for a rematch\u2026"), this.rematch())
              : w === "new"
                ? (this.exit(), this.openMenu())
                : this.exit();
        }));
    }
    stepBots(t, e, s) {
      let n = e.track,
        o = n.prof,
        a = n.RL,
        r = e.me,
        l = Math.hypot(this.v.vel.x, this.v.vel.z),
        c = n.project(this.v.pos.x, this.v.pos.z, r.s, this._q).lat,
        h = {},
        f = {},
        u = [{ s: r.s, lat: c, v: l, me: !0 }, ...e.bots];
      for (let d of e.bots) {
        let p = Math.min(n.n - 1, Math.max(0, Math.round(d.s / Nz))),
          m = n.W[p] - 1.2,
          g = n.LO ? n.LO[p] : -m,
          b = n.HI ? n.HI[p] : m;
        if (e.ph === "race" || e.ph === "done") {
          let R = Math.max(0, Math.min(1, ((n.cost?.cost ?? 0) - 6) / 10)),
            T =
              d.skill *
              (1 + 0.025 * Math.sin(p * 0.037 + d.i * 2.1)) *
              (1 - 0.05 * R),
            E = d.s - r.s,
            A =
              E > 0
                ? 1 - Math.min(0.12 + 0.1 * R, E / (800 - 350 * R))
                : 1 + Math.min(0.08, -E / 1e3),
            C =
              d.fin != null
                ? Math.max(0, 1 - (d.s - n.finish) / 60) * 12
                : o[p] * T * A,
            P = a[p] + d.bias;
          for (let N of u) {
            if (N === d) continue;
            let B = N.s - d.s,
              H = N.lat - d.lat;
            if (
              (B > 0 && B < 28 && Math.abs(H) < 2 && (C *= 1.025),
              B > -1 && B < 12 && Math.abs(H) < 2.4)
            ) {
              let O = n.K[Math.min(n.n - 1, p + 15)] || 0,
                D = O > 0 ? -1 : 1,
                U = N.lat + D * 2.9,
                G = Math.abs(U) < m ? U : N.lat - D * 2.9;
              (G > g && G < b ? (P = G) : (C = Math.min(C, (N.v ?? l) * 0.98)),
                B > 0 &&
                  B < 6 &&
                  Math.abs(H) < 1.9 &&
                  (C = Math.min(C, (N.v ?? l) * 0.96)));
            }
          }
          ((d.v =
            C > d.v
              ? Math.min(C, d.v + ett * T * t)
              : Math.max(C, d.v - stt * t)),
            (d.brk = C < d.v - 0.5));
          let I = Math.max(g, Math.min(b, P)) - d.lat,
            L = Math.min(2.2, d.v * 0.12) + 0.05,
            F = Math.max(-L, Math.min(L, I * 1.4));
          ((d.lv =
            (d.lv || 0) +
            (F - (d.lv || 0)) *
              Math.min(1, t * (Math.abs(d.lv || 0) > L + 0.5 ? 1.5 : 4))),
            (d.s += d.v * t),
            (d.lat = Math.max(-m - 1, Math.min(m + 1, d.lat + d.lv * t))),
            d.fin == null && d.s >= n.finish && (d.fin = s));
        }
        if ((this.botHits(e, d, p, t), !d.car)) continue;
        (n.at(d.s, h), n.at(d.s + 3, f));
        let x = h.x - h.dz * d.lat,
          v = h.z + h.dx * d.lat,
          y = n.K?.[p] || 0,
          M = y * d.v * d.v,
          S =
            Math.max(-0.12, Math.min(0.12, M * 0.009)) * Math.min(1, d.v / 15),
          w = d.v > 0.5 ? Math.atan2(d.lv || 0, d.v) : 0;
        ((d.wob = (d.wob || 0) + (d.wr || 0) * t),
          (d.wr = (d.wr || 0) * Math.exp(-t * 3) - (d.wob || 0) * 8 * t),
          (d.wob *= Math.exp(-t * 1.5)));
        let z = d.pose;
        ((z.pos.x = x),
          (z.pos.z = v),
          (z.pos.y = h.y),
          (z.psi = Math.atan2(-h.dx, -h.dz) - S - w + (d.wob || 0)),
          (z.pitch = Math.atan2(f.y - h.y, 3)),
          (z.roll = 0),
          (z.heave = 0),
          (z.bodyPitch = d.brk ? 0.025 : -0.008),
          (z.bodyRoll = Math.max(-0.06, Math.min(0.06, M * 0.005))),
          (z.steer = Math.max(
            -0.5,
            Math.min(0.5, -Math.atan(2.7 * y) + S * 1.5 - w * 1.2),
          )),
          (z.speed = d.v));
        for (let R = 0; R < 4; R++)
          z.wheelSpin[R] = d.spin[R] =
            (d.spin[R] + (d.v / 0.35) * t) % (Math.PI * 2);
        (tc(d.car, z),
          d.car.root.updateMatrixWorld(!0),
          d.lk !== !!d.brk &&
            ((d.lk = !!d.brk),
            Bu(d.car, { tail: d.brk ? 1 : 0.7, head: 0, signal: 0 })));
        let _ =
          d.T ||
          (d.T = {
            mp: !0,
            bot: d,
            kind: "sedan",
            V: { L: d.car.dims?.l ?? 4.7, bw: d.car.dims?.w ?? 1.95, H: 1.5 },
            wreck: { vx: 0, vz: 0, r: 0 },
          });
        ((_.x = x),
          (_.z = v),
          (_.y = h.y),
          (_.heading = z.psi),
          (_.v = d.v),
          (_.wreck.vx = -Math.sin(z.psi) * d.v + -h.dz * (d.lv || 0)),
          (_.wreck.vz = -Math.cos(z.psi) * d.v + h.dx * (d.lv || 0)),
          (_.wreck.r = d.wr || 0),
          (d.col = {
            t: "obb",
            x,
            z: v,
            hx: _.V.bw / 2,
            hz: _.V.L / 2,
            c: Math.cos(z.psi),
            s: Math.sin(z.psi),
            traffic: _,
            y0: h.y - 0.8,
            y1: h.y + _.V.H,
          }));
      }
    }
    botHits(t, e, s, n) {
      if (t.ph !== "race" && t.ph !== "done") return;
      for (let c of t.bots) {
        if (c === e || c.i < e.i) continue;
        let h = c.s - e.s,
          f = c.lat - e.lat;
        if (Math.abs(h) < 4.6 && Math.abs(f) < 1.95) {
          let u = (1.95 - Math.abs(f)) / 2 + 0.02,
            d = f >= 0 ? 1 : -1;
          ((c.lat += d * u),
            (e.lat -= d * u),
            (c.lv = (c.lv || 0) + d * 0.8),
            (e.lv = (e.lv || 0) - d * 0.8));
          let [p, m] = h >= 0 ? [e, c] : [c, e];
          if (p.v > m.v) {
            let g = p.v - m.v;
            ((p.v -= g * 0.6), (m.v += g * 0.3));
          }
          ((e.wr = (e.wr || 0) - d * 0.3), (c.wr = (c.wr || 0) + d * 0.3));
        }
      }
      if (!this.world || !e.car) return;
      let o = t.track,
        a = o.at(e.s, this._q),
        r = a.x - a.dz * e.lat,
        l = a.z + a.dx * e.lat;
      if (!((e._hitT = Math.max(0, (e._hitT || 0) - n)) > 0)) {
        for (let c of this.world.near(r, l, 4))
          if (
            !(
              c.dead ||
              c.prop ||
              c.wall ||
              c.raceWall ||
              (c.y1 !== void 0 && (a.y > c.y1 + 0.3 || a.y + 1.4 < c.y0))
            ) &&
            this.world.test(
              c,
              r,
              l,
              { x: -a.dz, z: a.dx },
              { x: a.dx, z: a.dz },
              0.95,
              2.3,
            )
          ) {
            let h =
              c.x !== void 0
                ? (c.x - r) * -a.dz + (c.z - l) * a.dx > 0
                  ? -1
                  : 1
                : e.lat > 0
                  ? -1
                  : 1;
            if (
              ((e.v *= c.parked ? 0.45 : 0.3),
              (e.lv = h * 2.5),
              (e.lat += h * 0.4),
              (e.wr = (e.wr || 0) + h * 1.2),
              (e._hitT = 0.6),
              c.parked && this.world.parked?.kick)
            )
              try {
                (c.b || this.world.parked.wake(c),
                  this.world.parked.kick(c, -h * a.dz * 4e3, h * a.dx * 4e3),
                  this.world.parked.moved?.add(c));
              } catch {}
            break;
          }
      }
    }
    shoved(t, e, s, n, o) {
      let a = this.S;
      if (!a || !t) return;
      let r = a.track,
        l = r.at(t.s, this._q),
        c = 1500,
        h = (c * (4.7 * 4.7 + 1.95 * 1.95)) / 12,
        f = -e / c,
        u = -s / c,
        d = f * l.dx + u * l.dz,
        p = f * -l.dz + u * l.dx;
      ((t.v = Math.max(0, t.v + d)), (t.lv = (t.lv || 0) + p * 1.2));
      let m = l.x - l.dz * t.lat,
        g = l.z + l.dx * t.lat;
      ((t.wr =
        (t.wr || 0) +
        Math.max(-2, Math.min(2, (((n - m) * s - (o - g) * e) / h) * 1.5))),
        Math.hypot(f, u) > 3 && (t.v *= 0.85));
    }
    merge(t) {
      let e = this.S;
      if (!e) return t;
      let s = this._dyn || (this._dyn = []);
      s.length = 0;
      for (let a of t) s.push(a);
      let n = this.v.pos.x,
        o = this.v.pos.z;
      for (let a of e.track.colliders)
        Math.abs(a.x - n) < 40 && Math.abs(a.z - o) < 40 && s.push(a);
      for (let a of e.bots) a.col && s.push(a.col);
      return s;
    }
    reset() {
      let t = this.S,
        e = t.track,
        s = t.me.cp > 0 ? e.cps[t.me.cp - 1] + 4 : e.start,
        n = e.at(s, this._p);
      (this.place({ x: n.x, z: n.z, psi: Math.atan2(-n.dx, -n.dz) }),
        (t.me.s = s),
        (t.offT = 0));
    }
    exit(t = !1) {
      let e = this.S;
      if (e) {
        (e.net && e.ph !== "done" && !t && this.mp.post(0, 15, e.id),
          e.net && (this._left = e.id),
          e.net && ((this.mp.racing = !1), this.mp.racers.clear()));
        for (let s of e.bots)
          s.car &&
            (this.scene.remove(s.car.root),
            s.car.root.traverse((n) => {
              n.isMesh && n.geometry?.dispose?.();
            }));
        (e.track.dispose(),
          (this.S = null),
          this.hud.classList.remove("on"),
          this.res.classList.remove("on"),
          this.count.classList.remove("on"),
          this.tree?.classList.remove("on"),
          this.react?.classList.remove("on"),
          this.menu.classList.remove("on"),
          this.ready.classList.remove("on"),
          this.boardEl.classList.remove("on"),
          this.brakeEl.classList.remove("on"),
          (this._bkOn = !1),
          document.body.classList.remove("racing"),
          this.map && (this.map.overlay = null),
          this.env.end(),
          (this._rk = null),
          (this._rdy = null),
          (this.res._p = null),
          (this.res.innerHTML = ""),
          (this.reErr = null),
          this.pend?.k === "rematch" && (this.pend = null),
          this.chipText());
      }
    }
  };
