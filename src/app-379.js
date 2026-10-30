// app 379 — math
// Lines 186747-190020 of readable/app.pretty.js (statement-aligned).
var b6t = new It(0.004, 0.0042, 0.0046),
  Vnt = [0, 1, 2, 4, 5, 6],
  b4 = 8,
  jB = [30, 30, 34, 40, 44, 50],
  Wnt = { minor: 1.6, moderate: 2.6, serious: 3.6, extreme: 5 },
  x6t = [0, 12, 15, 18, 22, 26],
  v6t = [0, 3, 4, 6, 6, 6],
  qnt = new Set(["evading the police", "high-speed pursuit"]),
  _d = 1900,
  mT = 150,
  y6t = 190,
  w6t = [6, 4],
  $B = 1 / 120,
  jnt = { player: !0 },
  M6t = 80,
  S6t = 1,
  k6t = new Set([
    "speeding past a patrol",
    "2x the speed limit",
    "driving on the sidewalk",
    "driving the wrong way",
  ]),
  Mi = (o, t, e) => (o < t ? t : o > e ? e : o),
  XB = (o) => Math.atan2(Math.sin(o), Math.cos(o)),
  z6t = `
#copHud { position: fixed; z-index: 6; left: var(--safe-l); top: var(--safe-t); min-width: 196px; padding: 9px 13px 10px 15px; border-radius: var(--r-md); pointer-events: none; overflow: hidden;
  background: var(--glass); border: 1px solid var(--line); box-shadow: var(--sh-1); backdrop-filter: var(--blur); -webkit-backdrop-filter: var(--blur); color: var(--ink); font-family: var(--font); display: none; }
#copHud::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--brand-2); }
#copHud.chase::before { background: var(--c-cop); animation: copBar .5s steps(2) infinite; } @keyframes copBar { 50% { background: var(--c-cop-2); } }
body.play #copHud.on { display: block; }
#copHud .lvl { display: flex; gap: 4px; align-items: center; } #copHud .lvl i { width: 14px; height: 14px; clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); background: var(--ink-4); }
#copHud .lvl i.on { background: var(--brand-2); } #copHud.chase .lvl i.on { background: var(--c-cop); animation: copBlink .5s steps(2) infinite; }
#copHud .lvl b { margin-left: 8px; font: var(--fw-black) var(--fs-sm) var(--font); font-stretch: var(--wide); letter-spacing: var(--ls-eyebrow); }
#copHud .bar { height: 3px; background: var(--fill-2); border-radius: 2px; overflow: hidden; margin-top: 8px; } #copHud .bar i { display: block; height: 100%; width: 0; background: var(--brand-2); } #copHud.chase .bar i { background: var(--c-cop); }
#copHud .st { margin-top: 6px; font: var(--fw-bold) var(--fs-xs) var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); white-space: nowrap; } #copHud.chase .st { color: #ff7a6f; } #copHud.cool .st { color: var(--brand-2); }
#copHud .bty { float: right; margin-left: 10px; font: var(--fw-bold) var(--fs-xs) var(--font-mono); letter-spacing: .08em; color: var(--brand-2); }
@keyframes copBlink { 50% { background: var(--c-cop-2); } }
#copHud .why { margin-top: 4px; font: var(--fw-bold) var(--fs-xs) var(--font-mono); letter-spacing: .06em; color: #ffb36b; white-space: nowrap; display: none; } #copHud.why .why { display: block; }
#copHud .cd { display: none; margin-top: 7px; } #copHud.cool .cd { display: block; } #copHud .cd span { display: flex; justify-content: space-between; font: var(--fw-bold) 10px var(--font-mono); letter-spacing: .14em; color: var(--brand-2); text-transform: uppercase; }
#copHud .cd div { height: 6px; margin-top: 3px; border-radius: 3px; background: var(--fill-2); overflow: hidden; } #copHud .cd div i { display: block; height: 100%; width: 0; background: var(--brand-2); transition: width .25s linear; } #copHud.hide .cd div i { background: #7fe0a8; }
#copFlash { position: fixed; inset: 0; z-index: 5; pointer-events: none; opacity: 0; transition: opacity .3s; box-shadow: inset 70px 0 90px -60px rgba(255,40,40,.55), inset -70px 0 90px -60px rgba(50,110,255,.55); }
body.play #copFlash.on { opacity: 1; animation: copSides .5s steps(2) infinite; }
@keyframes copSides { 50% { box-shadow: inset 70px 0 90px -60px rgba(50,110,255,.55), inset -70px 0 90px -60px rgba(255,40,40,.55); } }
body.racing #copHud, body.racing #copFlash { display: none !important; }
#copBust { position: fixed; inset: 0; z-index: 14; pointer-events: none; display: grid; place-content: center; text-align: center; opacity: 0; transition: opacity .35s;
  background: radial-gradient(ellipse at center, rgba(10,4,6,.55), rgba(5,6,7,.82)); }
#copBust.on { opacity: 1; }
#copBust b { font: 900 clamp(48px, 9vw, 120px) var(--font); font-stretch: 125%; letter-spacing: .08em; color: #fff; text-shadow: 0 0 40px rgba(255,40,40,.55), 0 6px 30px rgba(0,0,0,.7); animation: copBust 1s steps(2) infinite; }
#copBust small { display: block; margin-top: 10px; font: 700 clamp(14px, 1.6vw, 20px) var(--font-mono); letter-spacing: .16em; color: var(--acc2); text-transform: uppercase; }
@keyframes copBust { 50% { text-shadow: 0 0 40px rgba(50,110,255,.6), 0 6px 30px rgba(0,0,0,.7); } }
body.waymo #copHud { top: calc(var(--safe-t) + 60px); }   /* (under Teleoperator's takings, #taxiTotal) */
body.touch #copHud { top: calc(var(--st) + 56px); left: var(--safe-l); min-width: 150px; padding: 6px 9px 7px 11px; } body.touch #copHud .lvl i { width: 11px; height: 11px; } @media (orientation: portrait) { body.touch #copHud { top: calc(var(--st) + 160px); } }
`,
  gT = class o {
    constructor(t) {
      (Object.assign(this, t),
        (this.roads = this.traffic.roads),
        (this.L = this.roads?.L || null),
        (this.enabled = !0),
        (this.units = []),
        (this.heat = 0),
        (this.bounty = 0),
        (this.cool = 0),
        (this.contact = !1),
        (this.bust = 0),
        (this.escapes = 0),
        (this.busts = 0),
        (this.stats = {
          speeding: 0,
          crashes: 0,
          reds: 0,
          copHits: 0,
          disabled: 0,
          dispatched: 0,
          peds: 0,
          sidewalk: 0,
          blockHits: 0,
        }),
        (this.why = null),
        (this.offT = -99),
        (this.chaseT = 0),
        (this.fastT = 0),
        (this.chaseFastT = 0),
        (this.crashTs = []),
        (this.hiding = !1),
        (this.log = []),
        (this.wit = null),
        (this.witT = 0),
        (this.wrong = !1),
        (this.pushT = -9),
        (this.t = 0),
        (this.hitT = performance.now()),
        (this.patrolT = 1),
        (this.dispatchT = 0),
        (this.seeT = 0),
        (this.roadT = 0),
        (this.lastE = null),
        (this.road = null),
        (this.n = 0),
        (this._fr = new qo()),
        (this._m = new fe()),
        (this._v = new dt()),
        (this._o = {}),
        (this._A = {}),
        (this.known = { x: 0, z: 0, vx: 0, vz: 0, t: 0 }),
        (this.pred = null),
        (this.predT = 0),
        (this.roleT = 0),
        (this.nDisp = 0),
        (this.blocks = []),
        (this.strips = []),
        (this.blockT = 0),
        (this.stripT = 0),
        (this.note = null),
        (this.tyres = { w: [0, 0, 0, 0], n: 0, t: 0, sparkT: 0 }),
        (this.gripK = 1),
        (this._wp = null),
        (this._lp = null));
      let e = this.world.muAt?.bind(this.world);
      (e && (this.world.muAt = (n, i) => e(n, i) * this.gripK),
        (this._mu0 = e || (() => 1)),
        (this._sph = new _n()),
        (this._ob = {
          t: "obb",
          x: 0,
          z: 0,
          hx: 1,
          hz: 2,
          c: 1,
          s: 0,
          traffic: !0,
        }),
        (this.perf = { f: 0, ms: 0, steps: 0, phys: 0 }),
        (this.traffic.copSep = () => this.separate()),
        (this.traffic.copStep = (n, i) => this.drive(n, i)),
        (this.traffic.copGround = (n, i) => this.ground(n, i)),
        (this.traffic.onCopShove = (n, i, a, r, l) =>
          this.knock(n, i, a, r, l)));
      let s = this.world.onShove;
      if (
        (s &&
          (this.world.onShove = (...n) => {
            this.byPlayer = !0;
            try {
              s(...n);
            } finally {
              this.byPlayer = !1;
            }
          }),
        typeof document < "u")
      ) {
        let n = document.createElement("style");
        ((n.textContent = z6t),
          document.head.appendChild(n),
          (this.hud = document.createElement("div")),
          (this.hud.id = "copHud"),
          (this.hud.innerHTML =
            '<div class="lvl"><i></i><i></i><i></i><i></i><i></i><b></b></div><div class="bar"><i></i></div><div class="cd"><span><b>Cooldown</b><em class="cdt"></em></span><div><i></i></div></div><div class="st"><span class="bty"></span><span class="msg"></span></div><div class="why"></div>'),
          (this.flash = document.createElement("div")),
          (this.flash.id = "copFlash"),
          (this.bustEl = document.createElement("div")),
          (this.bustEl.id = "copBust"),
          document.body.append(this.flash, this.hud, this.bustEl),
          (this._h = {
            stars: [...this.hud.querySelectorAll(".lvl i")],
            lvl: this.hud.querySelector(".lvl b"),
            bar: this.hud.querySelector(".bar i"),
            tx: this.hud.querySelector(".msg"),
            bty: this.hud.querySelector(".bty"),
            why: this.hud.querySelector(".why"),
            cd: this.hud.querySelector(".cd div i"),
            cdt: this.hud.querySelector(".cdt"),
          }));
      }
    }
    get level() {
      return Math.floor(this.heat);
    }
    get pursuit() {
      return this.heat >= 1;
    }
    setEnabled(t) {
      ((this.enabled = !!t), this.enabled || this.clear());
    }
    clear() {
      let t = this.traffic;
      for (let e of this.units) {
        let s = t.cars.indexOf(e);
        s >= 0 && t.cars.splice(s, 1);
      }
      (this.clearStrips(),
        this.clearBlocks(),
        this.repair(!0),
        this.heli?.hide(),
        (this.traffic.heliMark = null),
        (this.units.length = 0),
        (this.heat = 0),
        (this.cool = 0),
        (this.bust = 0),
        (this.contact = !1),
        (this.hold = 0),
        (this.hitT = performance.now()),
        (this.lastE = null),
        this.drawHud(!0));
    }
    update(t, e) {
      if (!this.enabled || !e || !this.roads) {
        this.units.length || this.heat ? this.clear() : this.drawHud(!0);
        return;
      }
      ((this.t += t), this.n++);
      let s = this.traffic,
        n = this.v,
        i = n.pos;
      (this._lp &&
        Math.hypot(i.x - this._lp.x, i.z - this._lp.z) > 40 &&
        this.repair(),
        (this._lp = { x: i.x, z: i.z }));
      {
        let p = (this.trail ||= []),
          m = p[p.length - 1];
        (!m || Math.hypot(i.x - m.x, i.z - m.z) > 8) &&
          (p.push({ x: i.x, z: i.z, y: i.y }), p.length > 50 && p.shift());
      }
      this.hold > 0 &&
        (this.hold -= t) <= 0 &&
        ((this.hold = 0), this.release());
      for (let p = this.units.length - 1; p >= 0; p--) {
        let m = this.units[p];
        s.cars.includes(m) || this.units.splice(p, 1);
      }
      let a = n.speed,
        r = n.forward();
      if ((this.seeT -= t) <= 0) {
        this.seeT = 0.25;
        for (let p of this.units) {
          let m = Math.hypot(p.x - i.x, p.z - i.z);
          ((p.cop.d = m),
            (p.cop.sees =
              !p.wreck &&
              m < 135 &&
              Math.abs(p.y - i.y) < 12 &&
              this.los(p.x, p.z, i.x, i.z)),
            (p.cop.vis = this.inView(p.x, p.y, p.z)));
        }
      }
      let l = this.units.some((p) => !p.wreck && p.cop.sees && p.cop.d < 120);
      ((this.wit = this.pursuit ? null : this.witness()),
        this.pedHook(),
        (this.roadT -= t) <= 0 &&
          ((this.roadT = 0.25),
          (this.road = this.L.roadAt(i.x, i.z, 14, i.y)),
          this.checkRed(a, l),
          (this.walk = this.onWalk(a)),
          (this.wrong = this.wrongWay(a))));
      let c = this.road ? this.road.E.vmax || 12 : 13,
        h = this.road ? Math.max(14, c + 5) : 22;
      ((this.speeding = a > h),
        this.speeding &&
          l &&
          (this.offence(
            t * (0.45 + (a - h) * 0.03),
            "speeding past a patrol",
            "minor",
          ),
          (this.stats.speeding += t)),
        (this.fastT =
          a > Math.max(25, 2 * c) && l
            ? this.fastT + t
            : Math.max(0, this.fastT - t * 2)),
        this.fastT > 3 &&
          this.offence(t * 0.3, "2x the speed limit", "moderate"),
        this.walk &&
          l &&
          ((this.stats.sidewalk += t),
          this.offence(t * 0.35, "driving on the sidewalk", "moderate")));
      let f =
        this.wit &&
        (this.walk
          ? "driving on the sidewalk"
          : this.speeding
            ? "speeding past a patrol"
            : this.wrong
              ? "driving the wrong way"
              : null);
      ((this.witT = f
        ? this.witT + t * (this.speeding && a > h + 3 ? 2 : 1)
        : 0),
        f &&
          this.witT >= S6t &&
          this.heat < 1 &&
          ((this.witT = 0),
          this.offence(
            1.05 - this.heat,
            f,
            this.walk ? "moderate" : "minor",
            Wnt.minor,
            !0,
          )));
      for (let p of this.world.hits) {
        if (p.t <= this.hitT) continue;
        if (
          ((this.hitT = p.t),
          this.wit &&
            !p.spike &&
            p.v >= 3 &&
            !p.C?.traffic &&
            (p.parked || p.C?.prop))
        ) {
          this.offence(
            0.3,
            p.parked ? "hit a parked car" : "damaged city property",
            p.parked ? "moderate" : "minor",
          );
          continue;
        }
        let m = p.C?.traffic,
          g = m?.cop && !this.pursuit ? 1.5 : 3;
        if (!p.car || !m || m.net || m.mp || p.v < g) continue;
        let b = p.pre || { vx: this.v.vel.x, vz: this.v.vel.z },
          v = b.vx * (m.x - i.x) + b.vz * (m.z - i.z),
          x = Math.hypot(m.x - i.x, m.z - i.z) || 1;
        if (v / x < g) {
          this.pushT = this.t;
          continue;
        }
        if (m.cop && m.cop.mode === "block")
          (this.stats.blockHits++,
            this.stats.copHits++,
            this.offence(
              this.heat < 3 ? 1 : 0.7,
              "broke a roadblock",
              "extreme",
            ));
        else if (m.cop) {
          (this.stats.copHits++,
            !this.pursuit && !m.cop.free && !m.wreck?.dead && (this.wit = m));
          let y = p.v > 6;
          this.offence(
            this.heat < 1 ? 1.05 : y ? 0.6 : 0.3,
            y ? "rammed a police unit" : "hit a police unit",
            y ? "serious" : "moderate",
          );
        } else {
          for (
            this.stats.crashes++, this.crashTs.push(this.t);
            this.crashTs.length && this.t - this.crashTs[0] > 45;
          )
            this.crashTs.shift();
          this.crashTs.length >= 3
            ? this.offence(0.45, "wrecked several cars", "serious")
            : this.offence(
                l || this.pursuit ? 0.4 : 0.25,
                "hit a car",
                "moderate",
              );
        }
      }
      if (this.pursuit) {
        if (
          ((this.contact =
            this.units.some((g) => g.cop.free && g.cop.sees) ||
            !!this.heli?.sees),
          (this.hiding = !this.contact && this.covered()),
          this.contact)
        ) {
          ((this.met = !0),
            (this.chaseT += t),
            this.speeding && (this.chaseFastT += t),
            (this.cool =
              this.level > 1
                ? 0
                : this.t - this.offT > 2
                  ? this.cool + t * 0.6
                  : this.cool));
          let g =
            this.chaseFastT >= 120
              ? 5
              : this.chaseFastT >= 60
                ? 4.6
                : this.chaseT >= 100
                  ? 3.6
                  : this.chaseT >= 45
                    ? 2.6
                    : 0;
          this.heat < g &&
            this.offence(
              t / 40,
              g > 3.6 ? "high-speed pursuit" : "evading the police",
              g > 3.6 ? "extreme" : g > 2.6 ? "serious" : "moderate",
              g,
            );
        } else this.cool += (this.met ? 1 : 0.4) * (this.hiding ? 2 : 1) * t;
        if (this.contact || !this.met) {
          let g = this.known;
          ((g.x = i.x),
            (g.z = i.z),
            (g.y = i.y),
            (g.vx = n.vel.x),
            (g.vz = n.vel.z),
            (g.t = this.t));
        }
        let p =
            a < 2
              ? this.units.filter(
                  (g) =>
                    !g.wreck &&
                    g.cop.free &&
                    g.cop.mode !== "block" &&
                    Math.hypot(g.x - i.x, g.z - i.z) < 10,
                ).length
              : 0,
          m = p > 0 && (this.level >= 3 || p >= 2 || this.blockedAhead());
        ((this.bust = m ? this.bust + t : Math.max(0, this.bust - t * 2)),
          this.bust > 4
            ? this.busted()
            : this.cool > this.evadeT() && this.evaded());
      } else
        ((this.heat = Math.max(0, this.heat - t * 0.08)),
          (this.cool = 0),
          (this.bust = 0),
          (this.hiding = !1));
      let u = this.units.filter((p) => !p.cop.free && !p.wreck).length,
        d = this.units.filter(
          (p) => p.cop.free && p.cop.mode === "chase" && !p.wreck,
        );
      if (this.pursuit) {
        let p = Math.max(1, this.level),
          m = Math.min(
            Vnt[p],
            b4 - this.units.filter((g) => g.cop.mode === "block").length,
          );
        (this.predT -= t) <= 0 &&
          ((this.predT = 0.5), (this.pred = this.predict()));
        for (let g of this.units)
          !g.wreck &&
            g.cop.mode !== "chase" &&
            g.cop.mode !== "block" &&
            Math.hypot(g.x - i.x, g.z - i.z) < 380 &&
            d.length < m &&
            (this.toChase(g), d.push(g));
        if (
          (this.dispatchT -= t) <= 0 &&
          d.length < m &&
          this.units.length < b4 &&
          (!this.met ||
            this.contact ||
            this.resend > 0 ||
            (this.t - this.known.t < 5 &&
              this.nearKnown() &&
              !d.some((g) => Math.hypot(g.x - i.x, g.z - i.z) < 250)))
        ) {
          (this.resend > 0 && this.resend--,
            (this.dispatchT = p >= 3 ? 1.2 : p >= 2 ? 2 : 3));
          let g =
            (p >= 3 && this.nDisp++ % 2 === 1 && this.dispatchAhead()) ||
            this.dispatch();
          g && d.push(g);
        }
        ((this.roleT -= t) <= 0 && ((this.roleT = 0.5), this.roles(d, p)),
          this.escalate(t, p));
      } else if ((this.patrolT -= t) <= 0) {
        this.patrolT = 3;
        let p = s.max <= 24 ? 1 : 2;
        u < p && this.patrol(i.x, i.z, r.x, r.z);
      }
      if (this.pursuit && (this.contact || this.cool < 3))
        for (let p of this.units) {
          let m = p.cop;
          if (m.mode !== "chase" || p.wreck) continue;
          let g = Math.hypot(p.x - i.x, p.z - i.z);
          if (m.best === void 0 || g < m.best - 8) {
            ((m.best = g), (m.bestT = this.t));
            continue;
          }
          this.t - m.bestT > 5 &&
            g > 30 &&
            !m.sees &&
            !this.inView(p.x, p.y, p.z) &&
            ((m.jams = 9),
            (m.best = void 0),
            (this.stats.resent = (this.stats.resent || 0) + 1),
            (this.dispatchT = 0),
            (this.resend = (this.resend || 0) + 1));
        }
      if (
        this.pursuit &&
        this.level >= 3 &&
        (this.contact || (this.t - this.known.t < 5 && this.nearKnown())) &&
        n.speed > 12 &&
        (this.jumpT = (this.jumpT || 0) - t) <= 0
      ) {
        let p = Math.max(1, this.level),
          m = this.v.vel,
          g = n.speed;
        for (let b of this.units) {
          let v = b.cop;
          if (
            v.mode !== "chase" ||
            b.wreck ||
            v.sees ||
            v.vis ||
            this.t - (v.jumpT ?? -9) < 4
          )
            continue;
          let x = Math.hypot(b.x - i.x, b.z - i.z),
            y = ((b.x - i.x) * m.x + (b.z - i.z) * m.z) / g;
          if (
            x > (p >= 2 ? 170 : 230) &&
            (y < 0 || x > 320) &&
            this.t - (v.bestT ?? -9) > 2.5 &&
            this.relocate(b, p)
          ) {
            this.jumpT = 0.5;
            break;
          }
        }
      }
      for (let p = this.units.length - 1; p >= 0; p--) {
        let m = this.units[p],
          g = Math.hypot(m.x - i.x, m.z - i.z);
        if (
          g > 520 ||
          ((m.cop.mode === "idle" || m.cop.jams >= 3) &&
            g > 40 &&
            !this.inView(m.x, m.y, m.z)) ||
          (m.wreck?.dead && g > 200)
        ) {
          m.cop.mode === "chase" &&
            m.cop.jams >= 3 &&
            m.cop.jams !== 9 &&
            this.pursuit &&
            this.resend++;
          let b = s.cars.indexOf(m);
          (b >= 0 && s.cars.splice(b, 1), this.units.splice(p, 1));
        }
      }
      (this.assign(t),
        this.blocksUpdate(),
        this.stripsUpdate(t),
        this.tyresUpdate(t),
        this.heliUpdate(t));
      for (let p of this.units) {
        if (!(
          ((p.cop.free && (p.cop.mode === "chase" || p.cop.mode === "block")) ||
            p.cop.show) &&
          !p.wreck
        )) {
          p.cop.lit = 0;
          continue;
        }
        let g = (this.t * 2.2 + p.cop.ph) % 1,
          b = Math.floor(g * 8);
        p.cop.lit = b === 0 || b === 2 ? 1 : b === 4 || b === 6 ? 2 : 0;
      }
      this.drawHud(!1);
    }
    evadeT() {
      return x6t[Mi(this.level, 1, 5)];
    }
    offence(t, e, s = "minor", n = Wnt[s] ?? 5, i = !1) {
      if (!this.enabled || !(t > 0)) return 0;
      let a = this.heat,
        r =
          this.wit &&
          !this.pursuit &&
          !this.wit.wreck?.dead &&
          !this.wit.cop.free &&
          this.units.includes(this.wit)
            ? this.wit
            : null;
      if (
        (r &&
          a < 1 &&
          this.t - this.pushT > 1.5 &&
          (i || (!k6t.has(e) && !qnt.has(e) && e !== "near miss")) &&
          ((t = Math.max(t, 1.05 - a)), (n = Math.max(n, 1.05))),
        qnt.has(e) || (this.offT = this.t),
        a >= n)
      )
        return 0;
      this.heat = Math.min(n, a + t);
      let l = this.heat - a,
        c = this._acc || (this._acc = {});
      return (
        (c[e] = (c[e] || 0) + l),
        (l >= 0.2 || c[e] >= 0.15 || Math.floor(this.heat) > Math.floor(a)) &&
          (this.log.push({
            why: e,
            tier: s,
            add: +c[e].toFixed(2),
            heat: +this.heat.toFixed(2),
            t: +this.t.toFixed(1),
          }),
          this.log.length > 40 && this.log.shift(),
          (c[e] = 0),
          (this.why = { tx: e, tier: s, t: this.t })),
        a < 1 &&
          this.heat >= 1 &&
          (this.startPursuit(e.toUpperCase()),
          r &&
            (this.toChase(r),
            (r.cop.witness = this.t),
            (this.stats.witnessed = (this.stats.witnessed || 0) + 1)),
          (this.wit = null),
          (this.witT = 0)),
        l
      );
    }
    onWalk(t) {
      if (t < 8 || !this.L.surfaceAt) return !1;
      let e = this.road,
        s = this.v.pos;
      return e && (e.dd < 0.6 || e.J || e.E.tunnel)
        ? !1
        : this.L.surfaceAt(s.x, s.z) === "walk" &&
            Math.abs(this.L.driveHeight(s.x, s.z, null, s.y) - s.y) < 1.5;
    }
    witness() {
      let t = null,
        e = M6t;
      for (let s of this.units) {
        let n = s.cop;
        n.free ||
          n.mode !== "lane" ||
          s.wreck ||
          !n.sees ||
          !(n.d < e) ||
          ((t = s), (e = n.d));
      }
      return t;
    }
    wrongWay(t) {
      let e = this.road,
        s = this.v.vel;
      if (!e || e.J || e.dd > 0 || e.E.hwy || e.E.tunnel || t < 6) return !1;
      let n = (s.x * e.dx + s.z * e.dz) / t;
      return e.E.oneway
        ? n < -0.85
        : Math.abs(n) > 0.85 && e.v * Math.sign(n) < -1.4;
    }
    covered() {
      let t =
        this._cv ||
        (this._cv = {
          L: this.L,
          heights: this.heights,
          roofAt: Xv.prototype.roofAt,
        });
      return Xv.prototype.covered.call(t, this.v.pos);
    }
    blockedAhead() {
      let t = this.world,
        e = this.v.pos,
        s = this.v.forward(),
        n = this.v.psi ?? Math.atan2(-s.x, -s.z),
        i = e.x + s.x * 1.2,
        a = e.z + s.z * 1.2,
        r = { x: Math.cos(n), z: -Math.sin(n) },
        l = { x: Math.sin(n), z: Math.cos(n) },
        c = 0.95,
        h = 2.3,
        f = (u) =>
          !u.dead &&
          !u.traffic?.cop &&
          (u.y1 === void 0 || (e.y < u.y1 + 0.3 && e.y + 1.4 > u.y0)) &&
          t.test(u, i, a, r, l, c, h);
      for (let u of t.near(i, a, h + 1)) if (f(u)) return !0;
      for (let u of this.traffic.colliders || [])
        if (Math.abs(u.x - i) < 7 && Math.abs(u.z - a) < 7 && f(u)) return !0;
      return !this.los(e.x, e.z, e.x + s.x * 4, e.z + s.z * 4);
    }
    pedHook() {
      let t = Ea;
      if (!t.onBump || t.onBump._cop) return;
      let e = t.onBump,
        s = (n, i, a) => (i?.player && this.pedHit(n), e(n, i, a));
      ((s._cop = !0), (t.onBump = s));
    }
    pedHit() {
      (this.stats.peds++,
        this.offence(this.heat < 1 ? 1.1 : 0.6, "hit a pedestrian", "serious"));
    }
    nearKnown() {
      let t = this.known,
        e = this.v.pos;
      return (
        Math.hypot(e.x - t.x, e.z - t.z) < 120 + 70 * Math.max(0, this.t - t.t)
      );
    }
    memory() {
      return this.heli?.sees ? 1e9 : v6t[Mi(this.level, 1, 5)];
    }
    startPursuit(t) {
      ((this.cool = 0),
        (this.bust = 0),
        (this.dispatchT = this.level <= 1 ? 1.5 : 0.5),
        (this.reason = t),
        (this.met = !1),
        (this.resend = 0),
        (this.chaseT = 0),
        (this.chaseFastT = 0),
        this.toast?.(
          "Police pursuit",
          t ? t + " \xB7 lose them" : "Lose them",
        ));
    }
    evaded() {
      let t = 250 * Math.max(1, this.level);
      ((this.bounty += t),
        this.escapes++,
        this.onCash?.(t, "Pursuit evaded \xB7 heat " + Math.max(1, this.level)),
        (this.heat = 0),
        (this.cool = 0),
        (this.bust = 0),
        this.endPursuit(),
        this.repair(!0),
        this.toast?.("Pursuit evaded", "+$" + t + " bounty"));
    }
    busted() {
      let t = Math.max(1, this.level),
        e = Math.max(100, 150 * t);
      (this.busts++,
        (this.heat = 0),
        (this.cool = 0),
        (this.bust = 0),
        this.endPursuit(),
        (this.hold = 1.4),
        (this.fine = e),
        this.showBust("BUSTED", "Fine $" + e));
    }
    release() {
      let t = this.fine || 100,
        e = this.bustSpot(),
        s;
      (this.onBusted
        ? (s = this.onBusted({ fine: t, spot: e }))
        : ((s = Math.min(this.bounty, t)), (this.bounty -= s)),
        (s = Math.round(s ?? t)),
        (this.lastBust = {
          fine: t,
          taken: s,
          spot: e && { x: e.x, z: e.z, name: e.name },
        }),
        this.showBust(
          "BUSTED",
          (s > 0 ? "\u2212$" + s.toLocaleString() : "No money to fine") +
            (e?.name ? " \xB7 released on " + e.name : ""),
        ));
      for (let n of this.units) n.cop.free && !n.wreck && this.toLane(n);
      this.repair(!0);
    }
    bustSpot() {
      if (!this.snap) return null;
      let t = this.v.pos,
        e = this.units.filter((i) => !i.wreck),
        s = null,
        n = -1;
      for (let i = 0; i < 16 && n < 2; i++) {
        let a = Math.random() * Math.PI * 2,
          r = 350 + Math.random() * 300,
          l = this.snap(t.x + Math.cos(a) * r, t.z + Math.sin(a) * r);
        if (
          !l ||
          Math.hypot(l.x - t.x, l.z - t.z) < 300 ||
          e.some((h) => {
            let f = Math.hypot(h.x - l.x, h.z - l.z);
            return f < 220 || (f < 420 && this.los(h.x, h.z, l.x, l.z));
          })
        )
          continue;
        let c =
          (/^(residential|unclassified|living)/.test(l.E?.cls || "")
            ? 2
            : (l.E?.lanes || 1) <= 1
              ? 1
              : 0) +
          Math.random() * 0.5;
        c > n && ((n = c), (s = l));
      }
      return s;
    }
    showBust(t, e) {
      this.bustEl &&
        ((this.bustEl.innerHTML = "<b>" + t + "</b><small>" + e + "</small>"),
        this.bustEl.classList.add("on"),
        clearTimeout(this._bt),
        (this._bt = setTimeout(
          () => this.bustEl.classList.remove("on"),
          this.hold > 0 ? 4200 : 2600,
        )));
    }
    endPursuit() {
      for (let t of this.units) t.cop.free && !t.wreck && this.toLane(t);
      (this.clearBlocks(), this.clearStrips(), (this.pred = null));
    }
    checkRed(t, e) {
      let s = this.road;
      if (!s) {
        this.lastE = null;
        return;
      }
      let n = s.J;
      if (n && !this.inJ && this.lastE && n.ctl === 2 && t > 4) {
        let i = n.tl?.find((a) => a.E === this.lastE);
        i &&
          this.roads.signal(n, i.ph, this.traffic.t) === 2 &&
          (this.stats.reds++,
          this.offence(e ? 0.7 : 0.3, "ran a red light", "minor"));
      }
      ((this.inJ = !!n), n || (this.lastE = s.E));
    }
    newUnit(t) {
      let n = this.traffic.addReal(t, null, ["police", b6t]);
      return n
        ? ((this.idx = (this.idx || 0) + 1),
          (n.mapT = performance.now()),
          (n.mapOld = null),
          (n.cop = {
            free: !1,
            mode: "lane",
            role: 0,
            idx: this.idx,
            ph: Math.random(),
            lit: 0,
            kx: 0,
            kz: 0,
            dmg: 0,
            path: null,
            pi: 0,
            plan: 0,
            stuck: 0,
            rev: 0,
            sees: !1,
            d: 1e9,
          }),
          this.units.push(n),
          n)
        : null;
    }
    patrol(t, e, s, n) {
      let i = this.traffic,
        a = this.roads;
      for (let r = 0; r < 10; r++) {
        let l = Math.random() * Math.PI * 2,
          c = 160 + Math.random() * 240,
          h = t + Math.cos(l) * c,
          f = e + Math.sin(l) * c,
          u = a.spawnAt(h, f, Math.random);
        if (!u) continue;
        let d = a.pose({ ...u, lat: void 0 }, this._o);
        if (i.occupied3(d.x, d.y, d.z, 8) || this.inView(d.x, d.y, d.z))
          continue;
        let p = this.newUnit(u);
        if (p) return ((p.v = Math.min(p.E.vmax, 11)), p);
      }
      return null;
    }
    relocate(t, e) {
      let s = this.v,
        n = s.pos,
        i = s.speed,
        a = t.cop,
        r = this._A,
        l = null;
      if (
        (e >= 3 &&
          (a.jumps = (a.jumps || 0) + 1) % 2 === 0 &&
          this.pred &&
          (l = this.sideAhead()),
        !l)
      ) {
        let h = this.trail || [],
          f = 0;
        for (let u = h.length - 1; u > 0 && !l; u--) {
          if (
            ((f += Math.hypot(h[u].x - h[u - 1].x, h[u].z - h[u - 1].z)),
            f < 85)
          )
            continue;
          if (f > 140) break;
          let d = h[u - 1],
            p = h[u],
            m = Math.hypot(p.x - d.x, p.z - d.z) || 1;
          !this.traffic.occupied3(d.x, d.y, d.z, 6) &&
            !this.inView(d.x, d.y, d.z) &&
            (l = {
              x: d.x,
              z: d.z,
              y: d.y,
              hx: (p.x - d.x) / m,
              hz: (p.z - d.z) / m,
            });
        }
      }
      if (!l) {
        let h = this.L.roadAt(n.x, n.z, 20, n.y);
        if (h && h.E.car) {
          let f = h.dx * s.vel.x + h.dz * s.vel.z >= 0 ? 1 : -1;
          for (let u of [100, 125, 85, 140]) {
            let d = h.s - f * u;
            if (
              !(d < h.E.s0 + 2 || d > h.E.s1 - 2) &&
              (Ot(h.E, d, r),
              Math.abs(r.y - n.y) < 14 &&
                !this.traffic.occupied3(r.x, r.y, r.z, 6) &&
                !this.inView(r.x, r.y, r.z))
            ) {
              l = { x: r.x, z: r.z, y: r.y, hx: r.dx * f, hz: r.dz * f };
              break;
            }
          }
        }
        if (!l) {
          let f = this.spotBehind(80, 140);
          f && (l = f);
        }
      }
      if (!l) return !1;
      let c = Math.atan2(-l.hx, -l.hz);
      return (
        (t.mapT = performance.now()),
        (t.mapOld = { x: t.x, z: t.z }),
        Object.assign(t, {
          x: l.x,
          z: l.z,
          y: l.y,
          heading: c,
          fx: -Math.sin(c),
          fz: -Math.cos(c),
          v: l.side ? 12 : i * 0.95,
        }),
        (a.path = null),
        (a.kx = a.kz = 0),
        (a.rev = 0),
        (a.stuck = 0),
        (a.sx = void 0),
        (a.best = void 0),
        (a.jumpT = this.t),
        (a.noDirect = 0),
        this.ground(t),
        (this.stats.jumps = (this.stats.jumps || 0) + 1),
        a.phys && this.toPhys(t),
        !0
      );
    }
    spotBehind(t, e) {
      let s = this.traffic,
        n = this.v.pos,
        i = this.v.vel,
        a = Math.hypot(i.x, i.z),
        r = a > 3 ? { x: i.x / a, z: i.z / a } : this.v.forward();
      for (let l = 0; l < 12; l++) {
        let c = Math.atan2(-r.z, -r.x) + (Math.random() - 0.5) * 1.6,
          h = t + Math.random() * (e - t),
          f = this.L.roadAt(n.x + Math.cos(c) * h, n.z + Math.sin(c) * h, 25);
        if (!f || !f.E.car || f.E.s1 - f.E.s0 < 6) continue;
        let u = Ot(f.E, Mi(f.s, f.E.s0 + 2, f.E.s1 - 2), {});
        if (
          Math.abs(u.y - n.y) > 14 ||
          s.occupied3(u.x, u.y, u.z, 6) ||
          this.inView(u.x, u.y, u.z)
        )
          continue;
        let d = u.dx * (n.x - u.x) + u.dz * (n.z - u.z) >= 0 ? 1 : -1;
        return { x: u.x, z: u.z, y: u.y, hx: u.dx * d, hz: u.dz * d };
      }
      return null;
    }
    sideAhead() {
      let t = this.pred,
        e = this.v.pos;
      if (!t) return null;
      for (let s of t.juns)
        if (!(s.d < 110 || s.d > 260))
          for (let [n, i] of s.J.legs.filter(
            ([a]) =>
              a !== s.inE &&
              a !== s.outE &&
              a.car &&
              !a.inner &&
              a.s1 - a.s0 > 40,
          )) {
            let a = i === "a" ? 1 : -1,
              r =
                a > 0
                  ? n.s0 + 30 + Math.random() * Math.min(40, n.s1 - n.s0 - 40)
                  : n.s1 - 30 - Math.random() * Math.min(40, n.s1 - n.s0 - 40),
              l = Ot(n, r, {});
            if (!(
              Math.abs(l.y - e.y) > 20 ||
              this.traffic.occupied3(l.x, l.y, l.z, 7) ||
              this.inView(l.x, l.y, l.z) ||
              this.los(e.x, e.z, l.x, l.z)
            ))
              return {
                x: l.x,
                z: l.z,
                y: l.y,
                hx: -l.dx * a,
                hz: -l.dz * a,
                side: !0,
              };
          }
      return null;
    }
    dispatch() {
      let t = this.traffic,
        e = this.v.pos,
        s = this.v.forward(),
        n = this.level < 3;
      for (let i = 0; i < 16; i++) {
        let a = Math.atan2(-s.z, -s.x),
          r =
            i < 10 || n
              ? a + (Math.random() - 0.5) * 2.4
              : Math.random() * Math.PI * 2,
          l = 70 + Math.random() * 90,
          c = e.x + Math.cos(r) * l,
          h = e.z + Math.sin(r) * l,
          f = this.L.roadAt(c, h, 25);
        if (!f || !f.E.car || f.E.s1 - f.E.s0 < 6) continue;
        let u = Mi(f.s, f.E.s0 + 2, f.E.s1 - 2),
          d = Ot(f.E, u, this._o);
        if (
          Math.abs(d.y - e.y) > 14 ||
          t.occupied3(d.x, d.y, d.z, 7) ||
          ((i < 14 || n) && this.inView(d.x, d.y, d.z))
        )
          continue;
        let p = d.dx * (e.x - d.x) + d.dz * (e.z - d.z) >= 0 ? 1 : -1,
          m = this.newUnit({ E: f.E, dir: p, s: u, k: 0 });
        if (m)
          return (
            this.toChase(m),
            (m.v = Math.max(14, this.v.speed * 0.9)),
            this.stats.dispatched++,
            m
          );
      }
      return null;
    }
    toChase(t) {
      let e = t.cop;
      ((e.free = !0),
        (e.mode = "chase"),
        this.level <= 1 && (e.role = 4),
        (e.path = null),
        (e.plan = 0),
        (e.stuck = 0),
        (e.rev = 0),
        t.wreck &&
          !t.wreck.dead &&
          ((e.kx = t.wreck.vx), (e.kz = t.wreck.vz), (t.wreck = null)),
        (t.cv = null),
        (t.nx = null),
        (t.passOff = 0),
        (t.passBy = null),
        (t.cvPass = !1));
    }
    toLane(t) {
      let e = t.cop;
      (e.phys && this.toKin(t), (e.mode = "idle"), (e.lit = 0));
      let s = this.L.roadAt(t.x, t.z, 12, t.y);
      if (!s || !s.E.car || !this.roads.D || s.E.s1 - s.E.s0 < 4) return;
      let n = s.E.oneway || t.fx * s.dx + t.fz * s.dz >= 0 ? 1 : -1;
      ((t.E = s.E),
        (t.dir = n),
        (t.k = 0),
        (t.s = Mi(s.s, s.E.s0, s.E.s1)),
        (t.cv = null),
        (t.nx = null),
        (t.wreck = { vx: t.fx * t.v, vz: t.fz * t.v, r: 0, t: 5, dead: !1 }),
        this.traffic.rejoinReal(t)
          ? ((e.free = !1),
            (e.mode = "lane"),
            (t.v = Math.min(t.v, 8)),
            (t.roll = 0))
          : (t.wreck = null));
    }
    knock(t, e, s, n, i) {
      let a = t.cop,
        r = a.phys,
        l = r ? r.S.mass : _d,
        c = -e / l,
        h = -s / l,
        f = Math.hypot(c, h);
      if (
        (r &&
          ((r.vel.x += c),
          (r.vel.z += h),
          (r.r += Mi(((n - t.x) * s - (i - t.z) * e) / r.S.izz, -2.5, 2.5)),
          f > 1.5 && (r.impactT = Math.max(r.impactT || 0, 0.3)),
          this.syncOut(t)),
        !this.byPlayer)
      ) {
        if (!r) {
          let u = Math.min(1, 3 / Math.max(f, 0.001));
          ((a.kx += c * 0.5 * u), (a.kz += h * 0.5 * u), (t.v *= 0.97));
        }
        return;
      }
      this.damage(t, f, r ? null : [c, h, e, s, n, i]);
    }
    damage(t, e, s = null) {
      let n = t.cop;
      if (this.t - (n.kT ?? -1) < 0.25) {
        if (
          (e > n.kdv &&
            ((n.dmg +=
              (Math.max(0, e - 3) ** 2 - Math.max(0, n.kdv - 3) ** 2) / 36),
            (n.kdv = e)),
          s && (t.v *= 0.9),
          n.dmg < 1)
        )
          return;
      } else
        ((n.kT = this.t), (n.kdv = e), (n.dmg += Math.max(0, e - 3) ** 2 / 36));
      if (s) {
        let [i, a, r, l, c, h] = s;
        ((n.kx += i * 0.7),
          (n.kz += a * 0.7),
          (t.v += (i * t.fx + a * t.fz) * 0.3),
          (t.heading += Mi(
            (((c - t.x) * l - (h - t.z) * r) / (_d * 4.2)) * 0.15,
            -0.3,
            0.3,
          )));
      }
      n.dmg >= 1 && this.disable(t);
    }
    disable(t) {
      let e = t.cop,
        s = e.phys;
      (s && (this.syncOut(t), (e.phys = null), (t.phys = null)),
        (t.wreck = {
          vx: s ? s.vel.x : t.fx * t.v + e.kx,
          vz: s ? s.vel.z : t.fz * t.v + e.kz,
          r: s ? s.r : 0,
          t: 0,
          dead: !0,
        }),
        (e.mode = "down"),
        (e.free = !1),
        (e.lit = 0));
      let n = this.v.pos,
        i =
          (this.v.vel.x * (t.x - n.x) + this.v.vel.z * (t.z - n.z)) /
          (Math.hypot(t.x - n.x, t.z - n.z) || 1);
      (this.stats.disabled++,
        i > 3
          ? ((this.bounty += 200),
            this.onCash?.(200, "Police unit disabled"),
            this.toast?.("Unit disabled", "+$200 bounty"),
            this.offence(0.8, "destroyed a police unit", "extreme"))
          : this.toast?.("Unit wrecked"));
    }
    drive(t, e) {
      let s = t.cop,
        n = this.v,
        i = n.pos,
        a = n.vel,
        r = Math.hypot(a.x, a.z),
        l = Math.max(1, this.level),
        c = i.x - t.x,
        h = i.z - t.z,
        f = Math.hypot(c, h),
        u = t.x + t.fx * 10,
        d = t.z + t.fz * 10,
        p = 0,
        m = !1;
      if (s.mode === "block") {
        if (s.phys) {
          this.physDrive(t, e, u, d, 0, l, !1);
          return;
        }
        t.v = 0;
        let x = Math.exp(-e * 2.5);
        ((s.kx *= x),
          (s.kz *= x),
          (t.brake = 1),
          (t.x += s.kx * e),
          (t.z += s.kz * e),
          this.collide(t),
          this.ground(t, e));
        return;
      }
      if (s.mode === "chase") {
        s.noDirect = Math.max(0, (s.noDirect || 0) - e);
        let x = this.t - this.known.t,
          y = x < this.memory(),
          M = !s.vis,
          S = [0, 0.6, 1, 1.15, 1.3, 1.5][l],
          w = r > 12 ? 2 : 14 - r,
          _ =
            l <= 1
              ? Math.min(jB[1], r + w)
              : l === 2
                ? Math.max(jB[2], M ? r + 8 : r + 3)
                : Math.max(jB[l], M ? 95 : r + 4 + 4 * S),
          z =
            l === 2
              ? r + 3 + Math.max(0, f - 40) * 0.06 + (M ? 3 : 0)
              : r + 6 + Math.max(0, f - 40) * 0.12 * S + (M ? 6 : 0);
        if (
          ((m =
            y && (f < 22 || (f < (r > 25 ? 40 : 95) && s.sees && !s.noDirect))),
          m)
        ) {
          let T = n.forward(),
            E = -T.z,
            R = T.x,
            P = (t.x - i.x) * T.x + (t.z - i.z) * T.z,
            C = (t.x - i.x) * E + (t.z - i.z) * R,
            I = Math.min(0.9, f / 45),
            L = i.x + a.x * I,
            F = i.z + a.z * I,
            O = s.role;
          if (O === 4)
            ((L -= T.x * 11),
              (F -= T.z * 11),
              (p = Mi(r + Mi((f - 11) * 0.6, -8, w), 0, _)));
          else if (O === 0) {
            let H = C >= 0 ? 1 : -1;
            (P < -4.2 || Math.abs(C) > 3.4
              ? ((L += -T.x * 2.4 + E * H * 1.9),
                (F += -T.z * 2.4 + R * H * 1.9))
              : ((L += T.x * 1.2 - E * H * 0.6),
                (F += T.z * 1.2 - R * H * 0.6)),
              (p = Mi(r + 6 + Math.max(0, f - 15) * 0.25, 9, _ + 4)),
              (p = Math.min(p, r + 3 + Math.sqrt(16 * Math.max(0, f - 3)))));
          } else if (O === 1 || O === 2) {
            let H = (O === 1 ? 1 : -1) * (l >= 3 ? 2.1 : 2.7);
            ((L += E * H),
              (F += R * H),
              (p = Mi(r + 3 + Math.max(0, f - 15) * 0.25, 9, _ + 4)),
              (p = Math.min(p, r + 2 + Math.sqrt(14 * Math.max(0, f - 8)))));
          } else
            P < 10
              ? ((L += T.x * 18), (F += T.z * 18), (p = Mi(r + 7, 12, _ + 4)))
              : ((L = i.x + T.x * 3),
                (F = i.z + T.z * 3),
                (p = f > 25 ? Mi(r + 4, 12, _) : 5));
          (r < 3 &&
            f < 40 &&
            ((L = i.x),
            (F = i.z),
            (p =
              f < 6.5 ? 0 : Math.min(O === 4 ? 14 : p, 2 + (f - 6.5) * 0.5))),
            O !== 0 &&
              (p = Math.min(p, r + Math.sqrt(16 * Math.max(0, f - 7)))));
          let B = this.onRoad(L, F, t.y);
          ((u = B[0]), (d = B[1]), (s.path = null));
        } else {
          let T, E, R;
          if (y) {
            let I = s.role === 3 && this.predAt(Mi(f * 0.5, 60, 200));
            if (I) ((T = I.x), (E = I.z), (R = I.y));
            else {
              let L = 0.6 + (s.idx % 3) * 0.4;
              ((T = i.x + a.x * L), (E = i.z + a.z * L), (R = i.y));
            }
            s.goal = null;
          } else
            ((!s.goal ||
              Math.hypot(s.goal.x - t.x, s.goal.z - t.z) < 18 ||
              this.t > s.goal.t) &&
              (s.goal = this.searchPoint(t, x)),
              (T = s.goal.x),
              (E = s.goal.z),
              (R = s.goal.y));
          let P = s.gx === void 0 || Math.hypot(T - s.gx, E - s.gz) > 25;
          (!s.path || (s.plan -= e) <= 0 || (P && s.plan < 0.9)) &&
            ((s.plan = 1.2 + Math.random() * 0.5),
            (s.path = this.route(t, T, E, R)),
            (s.pathL = null),
            (s.pi = 0),
            (s.gx = T),
            (s.gz = E));
          let C = this.follow(t, T, E);
          ((u = C[0]),
            (d = C[1]),
            (p = y
              ? l <= 1
                ? Mi(r + Mi((f - 30) * 0.2, -6, w), Math.min(10, _), _)
                : Mi(z, 18, _)
              : 14 + l * 2),
            y && s.role === 3 && l > 1 && (p = Mi(z + 4, 20, _ + 4)),
            (p = Math.min(p, s.ghost && s.d > 25 ? 99 : this.pathLimit(t, l))));
        }
        let A = this.ahead(t, m);
        if (A) {
          let T = -t.fz,
            E = t.fx,
            R = s.passT > 0 ? s.pass : 0;
          for (let P of s.waitT > 1 ? [!1, !0] : [!1])
            for (let C of A.lat > 0 ? [-1, 1] : [1, -1]) {
              if (R) break;
              let I = t.x + t.fx * A.at + T * (A.lat + C * 3.2),
                L = t.z + t.fz * A.at + E * (A.lat + C * 3.2),
                F = this.L.roadAt(I, L, 6, t.y);
              F &&
                (P ? F.dd < 3 && this.standable(I, L, F.y, 4) : F.dd < -1) &&
                !this.traffic.cars.some(
                  (O) =>
                    O !== t &&
                    O !== A.o &&
                    Math.abs(O.x - I) < 4 &&
                    Math.abs(O.z - L) < 4 &&
                    Math.hypot(O.x - I, O.z - L) < 2.6,
                ) &&
                (R = C);
            }
          if (R) {
            ((s.pass = R), (s.passT = Math.max(s.passT || 0, 0.2)));
            let P = Mi(1.6 - A.at / 30, 0.3, 1.2) * 3.2 * R;
            ((u += T * P), (d += E * P));
          } else
            s.shoveT > 0 ||
              (p = Math.min(
                p,
                A.v +
                  Math.sqrt(
                    2 *
                      (s.ghost ? 14 : s.phys ? 11 : 8) *
                      Math.max(0, A.at - 7),
                  ),
              ));
          ((s.waitT =
            A.v < 2 && A.at < 14 && t.v < 3
              ? (s.waitT || 0) + e
              : Math.max(0, (s.waitT || 0) - e * 0.5)),
            s.waitT > 2.5 && ((s.waitT = 0), (s.shoveT = 3)));
        } else s.waitT = 0;
        ((s.shoveT = Math.max(0, (s.shoveT || 0) - e)),
          (s.passT = Math.max(0, (s.passT || 0) - e)));
      }
      s.rev > 0 && ((s.rev -= e), (p = -6));
      let g = Math.atan2(-(u - t.x), -(d - t.z)),
        b = XB(g - t.heading),
        v = Math.abs(t.v);
      if (s.rev <= 0) {
        let x = Math.abs(b);
        (x > 0.45 &&
          (p = Math.min(p, 7 + 26 * Math.max(0, 1 - (x - 0.45) / 1.2))),
          m &&
            (p = Math.min(
              p,
              Math.max(
                8,
                Math.sqrt(
                  11 /
                    Math.max(
                      1e-4,
                      (2 * Math.abs(Math.sin(b))) /
                        Math.max(4, Math.hypot(u - t.x, d - t.z)),
                    ),
                ),
              ),
            )));
      }
      if (s.phys) this.physDrive(t, e, u, d, p, l, m);
      else {
        let x = !s.ghost,
          y = Math.min(2.4, 0.25 + v * 0.25, (x ? 11 : 24) / Math.max(v, 1));
        t.heading = XB(t.heading + Mi(b * 3.5, -y, y) * e);
        let M = p - t.v;
        ((t.v += Mi(
          M,
          -11 * e,
          (x ? (t.v < 20 ? 9 : 6.5) * (1 + 0.1 * (l - 1)) : 20) * e,
        )),
          (t.brake = M < -1.5 ? 1 : 0),
          (t.fx = -Math.sin(t.heading)),
          (t.fz = -Math.cos(t.heading)));
        let S = Math.exp(-e * 2.5);
        ((s.kx *= S),
          (s.kz *= S),
          (t.x += (t.fx * t.v + s.kx) * e),
          (t.z += (t.fz * t.v + s.kz) * e),
          this.collide(t),
          this.ground(t, e));
      }
      s.rev <= 0 && p > 3
        ? s.sx === void 0 || Math.hypot(t.x - s.sx, t.z - s.sz) > 1.5
          ? ((s.sx = t.x), (s.sz = t.z), (s.stuck = 0), t.v > 8 && (s.jams = 0))
          : (s.stuck += e) > 1.5 &&
            ((s.stuck = 0),
            (s.sx = void 0),
            (s.rev = 1.1),
            (s.path = null),
            (s.jams = (s.jams || 0) + 1),
            (s.noDirect = 4))
        : ((s.stuck = 0), (s.sx = void 0));
    }
    pathLimit(t, e) {
      let s = t.cop,
        n = s.path;
      if (!n || n.length < 3 || s.pi >= n.length) return 99;
      let i = s.ghost ? 24 : s.phys ? 12 + 0.3 * e : e >= 5 ? 11 : 10,
        a = (t.v * t.v) / 18 + 25,
        r =
          s.pathL ||
          (s.pathL = n.map((h, f) =>
            f ? Math.hypot(h[0] - n[f - 1][0], h[1] - n[f - 1][1]) : 0,
          )),
        l = 99,
        c = Math.hypot(n[s.pi][0] - t.x, n[s.pi][1] - t.z);
      for (let h = s.pi + 1; h < n.length - 1 && c < a; h++) {
        c += r[h];
        let f = h,
          u = 0;
        for (; f > 0 && u < 12;) u += r[f--];
        let d = h,
          p = 0;
        for (; d < n.length - 1 && p < 12;) p += r[++d];
        let m = n[h][0] - n[f][0],
          g = n[h][1] - n[f][1],
          b = n[d][0] - n[h][0],
          v = n[d][1] - n[h][1],
          x = Math.hypot(m, g),
          y = Math.hypot(b, v);
        if (x < 3 || y < 3) continue;
        let M = Math.acos(Mi((m * b + g * v) / (x * y), -1, 1));
        if (M < 0.1) continue;
        let S = Math.sqrt((i * (u + p)) / 2 / M);
        l = Math.min(l, Math.sqrt(S * S + 18 * Math.max(0, c - 4)));
      }
      return Math.max(6, l);
    }
    ahead(t, e) {
      let s = Math.min(90, 7 + Math.abs(t.v) * 1.2),
        n = -t.fz,
        i = t.fx,
        a = null;
      for (let r of this.traffic.cars) {
        if (
          r === t ||
          Math.abs(r.x - t.x) > s + 3 ||
          Math.abs(r.z - t.z) > s + 3 ||
          Math.abs(r.y - t.y) > 4
        )
          continue;
        let l = r.x - t.x,
          c = r.z - t.z,
          h = l * t.fx + c * t.fz;
        if (h <= 0 || h > s) continue;
        let f = l * n + c * i;
        Math.abs(f) > 1.2 + (r.V?.bw || 2) / 2 + 0.4 ||
          (e &&
            r.cop &&
            Math.hypot(r.x - this.v.pos.x, r.z - this.v.pos.z) < 8) ||
          ((!a || h < a.at) &&
            (a = {
              o: r,
              at: h,
              lat: f,
              v: Math.max(0, (r.fx * t.fx + r.fz * t.fz) * (r.wreck ? 0 : r.v)),
            }));
      }
      return a;
    }
    onRoad(t, e, s) {
      let n = this.L.roadAt(t, e, 20, s);
      if (!n || n.dd < -1.5) return [t, e];
      let i = Ot(n.E, n.s, this._A),
        a = Mi(n.v, -(n.w - 1.5), n.w - 1.5);
      return [i.x + i.nx * a, i.z + i.nz * a];
    }
    searchPoint(t, e) {
      let s = this.known,
        n = t.cop,
        i = Math.hypot(s.vx, s.vz),
        a = Math.min(90, i * Math.min(e, 5)),
        r = s.x + (i > 1 ? (s.vx / i) * a : 0),
        l = s.z + (i > 1 ? (s.vz / i) * a : 0),
        c = !n.searched;
      n.searched = (n.searched || 0) + 1;
      for (let h = 0; h < 8; h++) {
        let f = Math.random() * Math.PI * 2,
          u = c && h < 3 ? (n.idx % 3) * 25 : 40 + Math.random() * 110,
          d = this.L.roadAt(r + Math.cos(f) * u, l + Math.sin(f) * u, 40);
        if (!d || !d.E.car) continue;
        let p = Ot(d.E, Mi(d.s, d.E.s0, d.E.s1), this._A);
        return { x: p.x, z: p.z, y: p.y, t: this.t + 25 };
      }
      return { x: r, z: l, y: s.y, t: this.t + 10 };
    }
    follow(t, e, s) {
      let n = t.cop,
        i = n.path;
      if (!i || !i.length) return [e, s];
      let a = 6 + Math.abs(t.v) * 0.4;
      for (; n.pi < i.length - 1;) {
        let r = i[n.pi],
          l = i[n.pi + 1],
          c = l[0] - r[0],
          h = l[1] - r[1],
          f = Math.hypot(c, h) || 1;
        if (
          ((t.x - r[0]) * c + (t.z - r[1]) * h) / f > f - 2 ||
          Math.hypot(r[0] - t.x, r[1] - t.z) < 4
        )
          n.pi++;
        else break;
      }
      for (let r = n.pi; r < i.length; r++)
        if (Math.hypot(i[r][0] - t.x, i[r][1] - t.z) > a) return i[r];
      return i[i.length - 1];
    }
    route(t, e, s, n) {
      let i = this.L,
        a = this.roads.D,
        r = i.roadAt(t.x, t.z, 30, t.y),
        l = i.roadAt(e, s, 40, n);
      if (!r || !l) return [[e, s]];
      let c = (w, _, z, A) => {
        let T = Math.max(1, Math.ceil(Math.abs(z - _) / 14));
        for (let E = 1; E <= T; E++) {
          let R = Ot(w, _ + ((z - _) * E) / T, this._o);
          A.push([R.x, R.z]);
        }
      };
      if (r.E === l.E) {
        let w = [];
        return (c(r.E, r.s, l.s, w), w.push([e, s]), w);
      }
      let h = new Map();
      for (let [w, _] of [
        [l.E.ja, l.E.s0],
        [l.E.jb, l.E.s1],
      ])
        w >= 0 && h.set(w, Math.abs(l.s - _));
      let f = new Map(),
        u = new Map(),
        d = [],
        p = (w) => {
          let _ = a.juns[w];
          return Math.hypot(_.x - e, _.z - s);
        },
        m = (w, _, z) => {
          w < 0 ||
            (f.has(w) && f.get(w) <= _) ||
            (f.set(w, _), u.set(w, z), d.push([_ + p(w), w]));
        },
        g = (w) => ((w - r.s) * (t.fx * r.dx + t.fz * r.dz) < 0 ? 25 : 0);
      (m(r.E.ja, Math.abs(r.s - r.E.s0) + g(r.E.s0), null),
        m(r.E.jb, Math.abs(r.E.s1 - r.s) + g(r.E.s1), null));
      let b = null,
        v = 1 / 0,
        x = 0;
      for (; d.length && x++ < 3e3;) {
        let w = 0;
        for (let T = 1; T < d.length; T++) d[T][0] < d[w][0] && (w = T);
        let [_, z] = d[w];
        if (((d[w] = d[d.length - 1]), d.pop(), _ >= v)) break;
        let A = f.get(z);
        if (!(_ - p(z) > A + 1e-6)) {
          h.has(z) && A + h.get(z) < v && ((v = A + h.get(z)), (b = z));
          for (let [T, E] of a.juns[z].legs) {
            if (!T.car || T.inner || T.ja < 0 || T.jb < 0 || T.ja === T.jb)
              continue;
            let R = E === "a" ? T.jb : T.ja,
              P = T.L * (T.oneway && E === "b" ? 1.3 : 1) + 4;
            m(R, A + P, [z, T, E]);
          }
        }
      }
      if (b === null) return [[e, s]];
      let y = [];
      for (let w = b; u.get(w); w = u.get(w)[0]) y.unshift(u.get(w));
      let M = [],
        S = y.length ? y[0][0] : b;
      c(r.E, r.s, S === r.E.ja ? r.E.s0 : r.E.s1, M);
      for (let [, w, _] of y)
        _ === "a" ? c(w, w.s0, w.s1, M) : c(w, w.s1, w.s0, M);
      return (
        c(l.E, b === l.E.ja ? l.E.s0 : l.E.s1, l.s, M),
        M.push([e, s]),
        M
      );
    }
    ground(t, e = 1) {
      let s = this.L,
        n = t.y,
        i = (x, y) => {
          let M = s.driveHeight(x, y, null, n - 0.7);
          return Number.isFinite(M) ? M : n;
        },
        a = -Math.sin(t.heading),
        r = -Math.cos(t.heading),
        l = -Math.cos(t.heading),
        c = Math.sin(t.heading),
        h = t.V.L * 0.29,
        f = t.V.bw * 0.42,
        u = (x, y) =>
          i(t.x + a * h * x + l * f * y, t.z + r * h * x + c * f * y),
        d = u(1, 1),
        p = u(1, -1),
        m = u(-1, 1),
        g = u(-1, -1),
        b = (d + p + m + g) / 4,
        v = i(t.x, t.z);
      ((t.y = b + Math.max(0, v - b - 0.2)),
        (t.pitch = Math.atan2((d + p - m - g) / 2, 2 * h)),
        (t.roll = Math.atan2((d + m - p - g) / 2, 2 * f)));
    }
    collide(t) {
      let e = this.world,
        s = this.traffic,
        n = t.cop,
        i = t.V.bw / 2,
        a = t.V.L / 2,
        r = { x: Math.cos(t.heading), z: -Math.sin(t.heading) },
        l = { x: Math.sin(t.heading), z: Math.cos(t.heading) },
        c = n.ghost && n.d > 25;
      for (let h = 0; h < 3; h++) {
        let f = null;
        for (let g of e.near(t.x, t.z, a + 1)) {
          if (
            g.dead ||
            g.traffic ||
            (g.y1 !== void 0 && (t.y > g.y1 + 0.3 || t.y + 1.4 < g.y0))
          )
            continue;
          let b = e.test(g, t.x, t.z, r, l, i, a);
          b && (!f || b.d > f.d) && ((f = b), (b.car = null));
        }
        for (let g of s.cars) {
          if (
            g === t ||
            !g.V ||
            Math.abs(g.x - t.x) > 7 ||
            Math.abs(g.z - t.z) > 7 ||
            Math.abs(g.y - t.y) > 2.5 ||
            (g.route && s.lineHidden)
          )
            continue;
          let b = e.test(this.obb(g), t.x, t.z, r, l, i, a);
          b && (!f || b.d > f.d) && ((f = b), (b.car = g));
        }
        if (!f) return;
        let u = f.n,
          d = f.car,
          p = t.fx * t.v + n.kx,
          m = t.fz * t.v + n.kz;
        if (d && d.cop?.free && !d.wreck) {
          (this.moveUnit(
            t,
            u.x * (f.d * 0.5 + 0.001),
            u.z * (f.d * 0.5 + 0.001),
          ),
            this.moveUnit(
              d,
              -u.x * (f.d * 0.5 + 0.001),
              -u.z * (f.d * 0.5 + 0.001),
            ));
          continue;
        }
        if (d && !d.line && !d.net && !d.mp && !(c && !d.wreck)) {
          let g = e.trafficView(d),
            b = g.m,
            v = (p - g.vx) * u.x + (m - g.vz) * u.z;
          if (v < 0) {
            let y = -v * ((_d * b) / (_d + b)) * 1.15;
            (s.shove(d, y * u.x, y * u.z, f.px, f.pz),
              (n.kx += ((u.x * y) / _d) * 0.8),
              (n.kz += ((u.z * y) / _d) * 0.8),
              (t.v -= Math.max(0, -(t.fx * u.x + t.fz * u.z)) * (y / _d)));
          }
          let x = d.wreck ? b / (_d + b) : 1;
          ((t.x += u.x * (f.d * x + 0.002)),
            (t.z += u.z * (f.d * x + 0.002)),
            x < 1 &&
              ((d.x -= u.x * f.d * (1 - x)), (d.z -= u.z * f.d * (1 - x))));
        } else if (
          ((t.x += u.x * (f.d + 0.002)),
          (t.z += u.z * (f.d + 0.002)),
          p * u.x + m * u.z < 0)
        ) {
          let b = -(t.fx * u.x + t.fz * u.z) * Math.sign(t.v || 1);
          t.v *=
            1 -
            Math.min(0.9, Math.max(0, b)) * (n.ghost && n.d > 25 ? 0.25 : 0.85);
          let v = n.kx * u.x + n.kz * u.z;
          v < 0 && ((n.kx -= u.x * v), (n.kz -= u.z * v));
        }
      }
    }
    obb(t) {
      let e = this._ob;
      return (
        (e.x = t.x),
        (e.z = t.z),
        (e.hx = t.V.bw / 2),
        (e.hz = t.V.L / 2),
        (e.c = Math.cos(t.heading)),
        (e.s = Math.sin(t.heading)),
        e
      );
    }
    moveUnit(t, e, s) {
      ((t.x += e), (t.z += s));
      let n = t.cop?.phys;
      n && ((n.pos.x += e), (n.pos.z += s));
    }
    assign(t) {
      let e = this.v.pos,
        s = w6t[this.mobile ? 1 : 0],
        n = [],
        i = Mi(mT - (this.v.speed - 30) * 2.7, 60, mT),
        a = i + ((y6t - mT) * i) / mT;
      for (let l of this.units) {
        let c = l.cop;
        if (
          ((c.d = Math.hypot(l.x - e.x, l.z - e.z)),
          (c.nv = !l.wreck && this.inViewR(l.x, l.y, l.z, 7)),
          !(!l.wreck && c.free && (c.mode === "chase" || c.mode === "block")))
        ) {
          c.phys && this.toKin(l);
          continue;
        }
        c.d < i || c.nv || (c.phys && c.d < a)
          ? n.push([
              l,
              c.d -
                (c.nv ? 1e3 : 0) -
                (c.phys ? 15 : 0) +
                (c.mode === "block" ? 60 : 0),
            ])
          : c.phys && this.toKin(l);
      }
      (n.sort((l, c) => l[1] - c[1]),
        n.forEach(([l], c) => {
          c < s ? l.cop.phys || this.toPhys(l) : l.cop.phys && this.toKin(l);
        }));
      for (let l of this.units)
        l.cop.ghost = !l.cop.phys && !l.cop.nv && this.level >= 2;
      let r = this.perf;
      (r.f++,
        (r.phys = this.units.filter((l) => l.cop.phys).length),
        (r.maxPhys = Math.max(r.maxPhys || 0, r.phys)),
        r.phys &&
          ((r.fT = (r.fT || 0) + 1),
          (r.tT = (r.tT || 0) + t),
          (r.msT = (r.msT || 0) + r.ms - (r.ms0 || 0)),
          (r.sT = (r.sT || 0) + r.steps - (r.s0 || 0))),
        (r.ms0 = r.ms),
        (r.s0 = r.steps));
    }
    costReport() {
      let t = this.perf,
        e = t.sT ? (t.msT * 1e3) / t.sT : 0,
        s = t.tT ? t.sT / t.tT : 0;
      return {
        frames: t.fT || 0,
        msFrame: +(t.fT ? t.msT / t.fT : 0).toFixed(3),
        usStep: +e.toFixed(1),
        stepsPerS: Math.round(s),
        msFrame60: +((e * s) / 60 / 1e3).toFixed(3),
      };
    }
    toPhys(t) {
      let e = t.cop,
        s = Mi(Math.max(1, this.level), 1, 5),
        n = e.veh || (e.veh = new n1(dT[s]));
      if (((e.drv ||= new uT()), (n.S = dT[s]), !e.pw)) {
        let a = this.L;
        e.pw = {
          heightAt: (r, l, c) => a.driveHeight(r, l, c, n.pos.y),
          muAt: this._mu0,
          collide: (r) => this.unitCollide(t, r),
        };
      }
      ((e.ghost = !1), this.unitSep(t), n.place(t.x, t.z, t.heading, t.y));
      let i = Mi(t.v, -8, Math.max(this.v.speed + 12, 22));
      ((n.vel.x = t.fx * i + (e.kx || 0)),
        (n.vel.z = t.fz * i + (e.kz || 0)),
        (n.r = 0),
        (n.holdStop = !0),
        (e.phys = n),
        (t.phys = n),
        (e.acc = 0),
        (e.kx = e.kz = 0),
        (e.drv.I = 0),
        (e.drv.hbT = 0),
        (this.stats.toPhys = (this.stats.toPhys || 0) + 1),
        this.syncOut(t));
    }
    toKin(t) {
      let e = t.cop,
        s = e.phys;
      if (!s) return;
      this.syncOut(t);
      let n = -Math.cos(s.psi),
        i = Math.sin(s.psi),
        a = s.vel.x * n + s.vel.z * i;
      ((e.kx = n * a),
        (e.kz = i * a),
        (e.phys = null),
        (t.phys = null),
        (t.heading = XB(t.heading)),
        (this.stats.toKin = (this.stats.toKin || 0) + 1));
    }
    syncOut(t) {
      let e = t.cop.phys,
        s = e.forward();
      ((t.x = e.pos.x),
        (t.z = e.pos.z),
        (t.heading = e.psi),
        (t.fx = s.x),
        (t.fz = s.z),
        (t.v = e.vel.x * s.x + e.vel.z * s.z),
        (t.brake = e.brake > 0.15 || e.reverse ? 1 : 0),
        e.air > 0.12
          ? ((t.y = e.pos.y), (t.pitch = e.pitch), (t.roll = e.roll))
          : ((t.y = e.pos.y), this.ground(t)),
        (t.pitch += Mi(e.bodyPitch, -0.06, 0.06)),
        (t.roll += Mi(e.bodyRoll, -0.08, 0.08)));
    }
    physDrive(t, e, s, n, i, a, r) {
      let l = t.cop,
        c = l.phys;
      ((c.S = dT[Mi(a, 1, 5)]),
        l.rev > 0 && !c.reverse && (l.revW = (l.revW || 0) + e) < 2.5
          ? (l.rev = Math.max(l.rev, 0.3))
          : l.rev > 0 || (l.revW = 0));
      let h = l.mode === "chase" && (l.d > 50 || (!l.nv && l.d > 30)) && i > 0,
        f = l.drv.control(c, e, s, n, l.mode === "block" ? 0 : i, {
          aLat: 11.5 + 0.4 * a,
          push: h,
          slide: l.mode === "chase" && !r,
        });
      (l.drv.slides || 0) !== (l.sl0 || 0) &&
        ((this.stats.slides =
          (this.stats.slides || 0) + l.drv.slides - (l.sl0 || 0)),
        (l.sl0 = l.drv.slides));
      let u = performance.now();
      l.acc = Math.min((l.acc || 0) + e, 8 * $B);
      let d = l.d < 30 || (l.nv && l.d < 60) ? $B : 2 * $B,
        p = this.world,
        m = this.traffic,
        g = c.S.box.hz + 1.5 + Math.abs(t.v) * e,
        b = l.cs || (l.cs = []),
        v = l.cc || (l.cc = []);
      ((b.length = 0), (v.length = 0));
      for (let x of p.near(t.x, t.z, g)) !x.dead && !x.traffic && b.push(x);
      for (let x of m.cars)
        x !== t &&
          x.V &&
          Math.abs(x.x - t.x) < g + 4 &&
          Math.abs(x.z - t.z) < g + 4 &&
          Math.abs(x.y - t.y) < 4 &&
          !(x.route && m.lineHidden) &&
          v.push(x);
      for (; l.acc >= d && l.phys === c;)
        (c.step(d, f, l.pw), (l.acc -= d), this.perf.steps++);
      ((this.perf.ms += performance.now() - u),
        l.phys === c && this.syncOut(t));
    }
    inViewR(t, e, s, n) {
      let i = this.camera;
      return !i ||
        (this._frN !== this.n &&
          ((this._frN = this.n),
          this._m.multiplyMatrices(i.projectionMatrix, i.matrixWorldInverse),
          this._fr.setFromProjectionMatrix(this._m)),
        Math.hypot(t - i.position.x, s - i.position.z) > 300)
        ? !1
        : (this._sph.center.set(t, e + 1, s),
          (this._sph.radius = n),
          this._fr.intersectsSphere(this._sph));
    }
    unitCollide(t, e) {
      let s = this.world,
        n = this.traffic,
        i = e.S,
        a = i.box.hx,
        r = i.box.hz,
        l = this.v,
        c = l.S?.box,
        h = { x: -Math.sin(e.psi), z: -Math.cos(e.psi) },
        f = { x: -h.z, z: h.x },
        u = !!Ni(e.pos.x, e.pos.z, 1.5),
        d = 0,
        p = t.cop,
        m = p.cs || [],
        g = p.cc || [];
      for (let b = 0; b < 3; b++) {
        let v = e.pos.x,
          x = e.pos.z,
          y = e.pos.y,
          M = null,
          S = (w, _) => {
            _ && (!M || _.d > M.d) && ((M = _), (_.o = w));
          };
        for (let w of m) {
          if (
            w.dead ||
            (w.wall && u) ||
            (w.y1 !== void 0 && (y > w.y1 + 0.3 || y + 1.4 < w.y0))
          )
            continue;
          let _ = s.test(w, v, x, f, h, a, r);
          _ && ((w.prop && this.propHit(w, e, _)) || S(w, _));
        }
        for (let w of s.parked.awake)
          Math.abs(w.x - v) < 8 &&
            Math.abs(w.z - x) < 8 &&
            !(w.y1 !== void 0 && (y > w.y1 + 0.3 || y + 1.4 < w.y0)) &&
            S(w, s.test(w, v, x, f, h, a, r));
        for (let w of g)
          Math.abs(w.x - v) > 7 ||
            Math.abs(w.z - x) > 7 ||
            Math.abs(w.y - y) > 2.5 ||
            S(w, s.test(this.obb(w), v, x, f, h, a, r));
        if (
          Math.abs(l.pos.y - y) < 2.5 &&
          Math.abs(l.pos.x - v) < 9 &&
          Math.abs(l.pos.z - x) < 9
        ) {
          let w = l.forward(),
            _ = c?.off ?? 0.15,
            z = this._ob;
          ((z.x = l.pos.x + w.x * _),
            (z.z = l.pos.z + w.z * _),
            (z.hx = c?.hx ?? 0.97),
            (z.hz = c?.hz ?? 2.27),
            (z.c = Math.cos(l.psi)),
            (z.s = Math.sin(l.psi)),
            S(jnt, s.test(z, v, x, f, h, a, r)));
        }
        if (!M) break;
        d = Math.max(d, this.unitRespond(t, e, M));
      }
      return d;
    }
    crush(t, e, s, n, i, a = 1) {
      let r = this.traffic;
      r.crushed &&
        n > 3 &&
        t.kind !== "moto" &&
        r.crushed.crush(
          t,
          r.sets[t.kind],
          e.px,
          e.pz,
          s.x * a,
          s.z * a,
          n,
          i || { car: !0 },
        );
    }
    unitRespond(t, e, s) {
      let n = this.world,
        i = this.traffic,
        a = t.cop,
        r = s.o,
        l = s.n,
        c = e.S.mass,
        h = this._ua || (this._ua = {});
      ((h.m = c),
        (h.I = e.S.izz),
        (h.vx = e.vel.x),
        (h.vz = e.vel.z),
        (h.w = e.r),
        (h.x = e.pos.x),
        (h.z = e.pos.z));
      let f = (g) => {
          ((e.pos.x += l.x * g),
            (e.pos.z += l.z * g),
            (h.x = e.pos.x),
            (h.z = e.pos.z));
        },
        u = (g) => {
          let b = s.px - h.x,
            v = s.pz - h.z;
          return (
            (h.vx + h.w * v - (g ? g.vx + g.w * (s.pz - g.z) : 0)) * l.x +
            (h.vz - h.w * b - (g ? g.vz - g.w * (s.px - g.x) : 0)) * l.z
          );
        },
        d = (g) =>
          g > -1.5 ? 0 : 0.2 - 0.1 * Math.min(1, Math.max(0, (-g - 8) / 20)),
        p = 0;
      if (r === jnt) {
        let g = this.v,
          b = this._pb || (this._pb = {});
        ((b.m = g.S.mass),
          (b.I = g.S.izz),
          (b.vx = g.vel.x),
          (b.vz = g.vel.z),
          (b.w = g.r),
          (b.x = g.pos.x),
          (b.z = g.pos.z));
        let v = b.m / (c + b.m);
        if (
          (f(s.d * v + 0.001),
          (g.pos.x -= l.x * s.d * (1 - v)),
          (g.pos.z -= l.z * s.d * (1 - v)),
          (b.x = g.pos.x),
          (b.z = g.pos.z),
          (p = u(b)),
          p >= 0)
        )
          return 0;
        this.crush(t, s, l, -p, null);
        let x = g.r,
          y = Nr(h, b, l, s.px, s.pz, d(p), 0.15, 1, Dl.spinP);
        ((g.vel.x = b.vx),
          (g.vel.z = b.vz),
          (g.r = x + Mi(b.w - x, -Dl.dwMax, Dl.dwMax)),
          (this.stats.pitDw = Math.max(
            this.stats.pitDw || 0,
            Math.abs(g.r - x),
          )));
        let M = Math.min(1, -p / 14);
        (M > 0.05 &&
          ((g.impact = Math.max(g.impact || 0, M)),
          (g.drift *= 0.5),
          (g.impactN = { x: -l.x, z: -l.z, s: M })),
          -p > 2 &&
            (g.impactT = Math.max(g.impactT || 0, 0.4 * Math.min(1, -p / 8))));
        let S = i.colliders.find((w) => w.traffic === t) || {
          t: "obb",
          x: t.x,
          z: t.z,
          traffic: t,
        };
        (n.hit(
          { px: s.px, pz: s.pz, n: { x: -l.x, z: -l.z }, c: S },
          M,
          !0,
          !1,
          -p,
          n.tangent(b, h, { x: -l.x, z: -l.z }, s),
        ),
          (this.stats.rams = (this.stats.rams || 0) + 1),
          -p > 3 && (this.stats.hardRams = (this.stats.hardRams || 0) + 1),
          this.damage(t, y / c));
      } else if (r.V && r.heading !== void 0) {
        let g = n.trafficView(r),
          b = g.m;
        if (((p = u(g)), r.phys)) {
          let v = b / (c + b);
          (f(s.d * v + 0.001),
            (r.phys.pos.x -= l.x * s.d * (1 - v)),
            (r.phys.pos.z -= l.z * s.d * (1 - v)),
            (r.x = r.phys.pos.x),
            (r.z = r.phys.pos.z),
            (g.x = r.x),
            (g.z = r.z),
            p < 0 &&
              (this.crush(t, s, l, -p, null),
              this.crush(r, s, l, -p, null, -1),
              Nr(h, g, l, s.px, s.pz, d(p), 0.15, 1, 1),
              (r.phys.vel.x = g.vx),
              (r.phys.vel.z = g.vz),
              (r.phys.r = g.w),
              -p > 3 && (r.phys.impactT = Math.max(r.phys.impactT || 0, 0.3))));
        } else if (r.cop?.free && !r.wreck) {
          if (
            (f(s.d * 0.5 + 0.001),
            (r.x -= l.x * s.d * 0.5),
            (r.z -= l.z * s.d * 0.5),
            p < 0)
          ) {
            (this.crush(t, s, l, -p, null), this.crush(r, s, l, -p, null, -1));
            let v = Nr(h, g, l, s.px, s.pz, d(p), 0.15, 1, 1);
            this.knock(r, v * l.x, v * l.z, s.px, s.pz);
          }
        } else if (r.line || r.mp || !(b < 1 / 0)) {
          if ((f(s.d + 0.002), p < 0)) {
            let v =
              this._sb ||
              (this._sb = {
                m: 1 / 0,
                I: 1 / 0,
                vx: 0,
                vz: 0,
                w: 0,
                x: 0,
                z: 0,
              });
            ((v.vx = g.vx),
              (v.vz = g.vz),
              (v.w = g.w),
              (v.x = g.x),
              (v.z = g.z),
              Nr(h, v, l, s.px, s.pz, d(p), 0.15, 0.6, 0));
          }
        } else {
          if (p < 0) {
            this.crush(t, s, l, -p, null);
            let x = Nr(h, g, l, s.px, s.pz, d(p), 0.15, 1, Dl.spinT);
            if (
              (x && i.shove(r, x * l.x, x * l.z, s.px, s.pz),
              (this.stats.shoves = (this.stats.shoves || 0) + 1),
              -p > 2)
            ) {
              let y = this._shv || (this._shv = new Set());
              (y.add(r.id), (this.stats.shoved = y.size));
            }
          }
          let v = r.wreck ? b / (c + b) : 1;
          (f(s.d * v + 0.001),
            v < 1 &&
              ((r.x -= l.x * s.d * (1 - v)), (r.z -= l.z * s.d * (1 - v))));
        }
      } else if (r.parked && r.b) {
        let g = n.parked,
          b = g.view(r),
          v = b.m / (c + b.m);
        if (
          (f(s.d * v + 0.001),
          (r.x -= l.x * s.d * (1 - v)),
          (r.z -= l.z * s.d * (1 - v)),
          (b.x = r.x),
          (b.z = r.z),
          (p = u(b)),
          p < 0)
        ) {
          let x = Nr(h, b, l, s.px, s.pz, d(p), 0.15, 1, Dl.spinK);
          x && g.kick(r, -x * l.x, -x * l.z);
        }
        ((r.b.moving = !0), g.moved.add(r));
      } else {
        if ((f(s.d + 0.002), (p = u(null)), p >= 0)) return 0;
        (this.crush(t, s, l, -p, r.t === "circ" ? r : {}),
          -p > 3 && (this.stats.wallHits = (this.stats.wallHits || 0) + 1));
        let g =
          this._sb0 ||
          (this._sb0 = { m: 1 / 0, I: 1 / 0, vx: 0, vz: 0, w: 0, x: 0, z: 0 });
        if (
          (Nr(
            h,
            g,
            l,
            s.px,
            s.pz,
            p > -1.5 ? 0 : Math.min(0.35, 0.1 + -p * 0.012),
            0.18,
            0.3,
            0,
          ),
          -p > 18 &&
            a.mode === "chase" &&
            ((a.dmg += (-p - 18) ** 2 / 100), a.dmg >= 1))
        )
          return (
            (e.vel.x = h.vx),
            (e.vel.z = h.vz),
            (e.r = h.w),
            this.disable(t),
            1
          );
      }
      ((e.vel.x = h.vx), (e.vel.z = h.vz), (e.r = h.w));
      let m = Math.min(1, -p / 14);
      return (
        m > 0.05 && ((e.impact = Math.max(e.impact, m)), (e.drift *= 0.5)),
        -p > 4 && (e.impactT = Math.max(e.impactT || 0, 0.3)),
        Math.max(0, m)
      );
    }
    propHit(t, e, s) {
      let n = this.world;
      if (!n.onProp) return !1;
      let i = Object.prototype.hasOwnProperty.call(n, "hit"),
        a = n.hit;
      n.hit = () => {};
      try {
        return !!n.onProp(t, e, s);
      } finally {
        i ? (n.hit = a) : delete n.hit;
      }
    }
    separate() {
      let t = this.traffic;
      for (let e of this.units)
        e.cop.free && !e.wreck && t.cars.includes(e) && this.unitSep(e);
    }
    unitSep(t) {
      let e = this.world,
        s = this.traffic,
        n = t.V.bw / 2,
        i = t.V.L / 2,
        a = this.v,
        r = a.S?.box;
      for (let l = 0; l < 3; l++) {
        let c = { x: Math.cos(t.heading), z: -Math.sin(t.heading) },
          h = { x: Math.sin(t.heading), z: Math.cos(t.heading) },
          f = !1;
        for (let u of s.cars) {
          if (
            u === t ||
            !u.V ||
            u.heading === void 0 ||
            Math.abs(u.x - t.x) > 7 ||
            Math.abs(u.z - t.z) > 7 ||
            Math.abs(u.y - t.y) > 2.5 ||
            (u.route && s.lineHidden)
          )
            continue;
          let d = e.test(this.obb(u), t.x, t.z, c, h, n, i);
          if (!d || d.d < 0.01) continue;
          let p = u.cop?.free && !u.wreck,
            m = p
              ? 1
              : (u.wreck || l === 2) && !u.line && !u.mp && !u.net
                ? vc(u.kind)
                : 0,
            g = p ? 0.5 : m ? m / (_d + m) : 1;
          if (
            (this.moveUnit(
              t,
              d.n.x * (d.d * g + 0.002),
              d.n.z * (d.d * g + 0.002),
            ),
            g < 1)
          ) {
            let b = d.d * (1 - g) + 0.002;
            p
              ? this.moveUnit(u, -d.n.x * b, -d.n.z * b)
              : ((u.x -= d.n.x * b), (u.z -= d.n.z * b));
          }
          ((f = !0), (this.stats.seps = (this.stats.seps || 0) + 1));
        }
        if (
          Math.abs(a.pos.y - t.y) < 2.5 &&
          Math.abs(a.pos.x - t.x) < 8 &&
          Math.abs(a.pos.z - t.z) < 8
        ) {
          let u = a.forward(),
            d = r?.off ?? 0.15,
            p = this._ob;
          ((p.x = a.pos.x + u.x * d),
            (p.z = a.pos.z + u.z * d),
            (p.hx = r?.hx ?? 0.97),
            (p.hz = r?.hz ?? 2.27),
            (p.c = Math.cos(a.psi)),
            (p.s = Math.sin(a.psi)));
          let m = e.test(p, t.x, t.z, c, h, n, i);
          m &&
            m.d >= 0.01 &&
            (this.moveUnit(t, m.n.x * (m.d + 0.002), m.n.z * (m.d + 0.002)),
            (f = !0),
            (this.stats.seps = (this.stats.seps || 0) + 1));
        }
        if (!f) break;
      }
    }
    predict() {
      let t = this.v,
        e = t.pos,
        s = this.L,
        n = this.roads.D,
        i = {},
        a = Math.hypot(t.vel.x, t.vel.z),
        r = t.forward(),
        l = a > 3 ? t.vel.x / a : r.x,
        c = a > 3 ? t.vel.z / a : r.z,
        h = s.roadAt(e.x, e.z, 20, e.y);
      if (!h || !h.E.car || h.E.inner || !n) return null;
      let f = h.E,
        u = h.dx * l + h.dz * c >= 0 ? 1 : -1,
        d = Mi(h.s, f.s0, f.s1),
        p = 0,
        m = e.x,
        g = e.z,
        b = l,
        v = c,
        x = [],
        y = [];
      for (let M = 0; M < 10 && p < 360; M++) {
        let S = u > 0 ? f.s1 : f.s0,
          w = Math.max(1, Math.ceil(Math.abs(S - d) / 8));
        for (let E = 1; E <= w; E++) {
          let R = d + ((S - d) * E) / w;
          (Ot(f, R, i),
            (p += Math.hypot(i.x - m, i.z - g)),
            (m = i.x),
            (g = i.z),
            x.push({
              E: f,
              s: R,
              dir: u,
              d: p,
              x: i.x,
              z: i.z,
              y: i.y,
              dx: i.dx * u,
              dz: i.dz * u,
              w: i.w,
            }),
            (b = i.dx * u),
            (v = i.dz * u));
        }
        let _ = u > 0 ? f.jb : f.ja,
          z = _ >= 0 ? n.juns[_] : null;
        if (!z) break;
        let A = null,
          T = -0.3;
        for (let [E, R] of z.legs) {
          if (E === f || !E.car || E.inner || E.ja === E.jb || E.s1 - E.s0 < 4)
            continue;
          let P = R === "a" ? 1 : -1,
            C = P > 0 ? E.s0 : E.s1;
          Ot(E, C + P * Math.min(6, (E.s1 - E.s0) / 2), i);
          let I = i.x - z.x,
            L = i.z - z.z,
            F = Math.hypot(I, L) || 1,
            O = (I * b + L * v) / F - (E.oneway && P < 0 ? 0.6 : 0);
          O > T && ((T = O), (A = [E, P, C]));
        }
        if ((y.push({ J: z, d: p, inE: f, outE: A && A[0] }), !A)) break;
        [f, u, d] = A;
      }
      return { pts: x, juns: y, t: this.t, x: e.x, z: e.z };
    }
    predAt(t) {
      let e = this.pred;
      if (!e || !e.pts.length) return null;
      for (let s of e.pts) if (s.d >= t) return s;
      return e.pts[e.pts.length - 1];
    }
    roles(t, e) {
      let s = this.v.pos,
        n = this.v.forward(),
        i = (u) => Math.hypot(u.x - s.x, u.z - s.z);
      if (e <= 1) {
        for (let u of t) u.cop.role = 4;
        return;
      }
      let a = t.slice().sort((u, d) => i(u) - i(d)),
        r = (u) => (u.x - s.x) * n.x + (u.z - s.z) * n.z,
        l = e >= 3 ? a.filter((u) => r(u) > 25 && i(u) > 30).slice(0, 2) : [];
      !l.length && a.length >= 4 && (l = [a[a.length - 1]]);
      let c = e >= 3 || this.t % 20 < 6,
        h = a.filter((u) => !l.includes(u)),
        f =
          e >= 4
            ? [0, 0, 1, 2, 1, 2]
            : e >= 3
              ? [0, 1, 2, 1, 2, 3]
              : [c ? 0 : 4, 1, 2, 1, 2];
      h.forEach((u, d) => {
        u.cop.role = f[d % f.length];
      });
      for (let u of l) u.cop.role = 3;
    }
    dispatchAhead() {
      let t = this.pred,
        e = this.v.pos;
      if (!t) return null;
      for (let s of t.juns) {
        if (s.d < 110 || s.d > 240) continue;
        let n = s.J.legs.filter(
          ([i]) =>
            i !== s.inE &&
            i !== s.outE &&
            i.car &&
            !i.inner &&
            i.s1 - i.s0 > 40,
        );
        for (let [i, a] of n.sort(() => Math.random() - 0.5)) {
          let r = a === "a" ? 1 : -1,
            l =
              r > 0
                ? i.s0 + 30 + Math.random() * Math.min(40, i.s1 - i.s0 - 40)
                : i.s1 - 30 - Math.random() * Math.min(40, i.s1 - i.s0 - 40),
            c = Ot(i, l, this._o);
          if (
            Math.abs(c.y - e.y) > 20 ||
            this.traffic.occupied3(c.x, c.y, c.z, 7) ||
            this.inView(c.x, c.y, c.z) ||
            this.los(e.x, e.z, c.x, c.z)
          )
            continue;
          let h = this.newUnit({ E: i, dir: -r, s: l, k: 0 });
          if (h)
            return (
              this.toChase(h),
              (h.v = 12),
              (h.cop.role = 3),
              this.stats.dispatched++,
              (this.stats.ahead = (this.stats.ahead || 0) + 1),
              h
            );
        }
      }
      return null;
    }
    escalate(t, e) {
      ((this.blockT -= t * (this.heli?.sees ? 1.6 : 1)), (this.stripT -= t));
      let s = this.contact || this.t - this.known.t < 3,
        n = this.v.speed;
      if (!s || n < 6 || this.hold > 0) return;
      let i =
          e >= 3 &&
          this.blockT <= 0 &&
          !this.blocks.some((r) => !r.strip) &&
          this.units.length <= b4 - 2,
        a = e >= 4 && this.stripT <= 0 && this.strips.length < 2;
      (!i && !a) ||
        ((this.pred = this.predict()),
        this.pred &&
          (i &&
            ((this.blockT = e >= 5 ? 22 : e >= 4 ? 35 : 50),
            this.roadblock(e) || (this.blockT = 3)),
          a &&
            ((this.stripT = e >= 5 ? 16 : 22),
            this.spikes(e) || (this.stripT = 3))));
    }
    spot(t, e, s) {
      let n = this.v.pos;
      for (let i of t) {
        let a = this.predAt(i);
        if (!a || a.d < i - 10) continue;
        let r = a.E,
          l = a.w - (r.lg?.park || 0);
        if (
          !(
            r.tunnel ||
            r.s1 - r.s0 < 34 ||
            a.s < r.s0 + 14 ||
            a.s > r.s1 - 14 ||
            l < e ||
            l > s ||
            Math.abs(a.y - n.y) > 30
          ) &&
          !(
            this.blocks.some((c) => Math.hypot(c.x - a.x, c.z - a.z) < 40) ||
            this.strips.some((c) => Math.hypot(c.x - a.x, c.z - a.z) < 40)
          )
        )
          return { ...a, u: l };
      }
      return null;
    }
    standable(t, e, s, n = 0.6) {
      let i = this.L.roadAt(t, e, 6, s);
      if (!i || i.dd > n || Math.abs(i.y - s) > 1.5) return !1;
      let a = this.world,
        r = a.grid.get(i1(Math.floor(t / lo), Math.floor(e / lo)));
      if (r) {
        for (let l of r)
          if (
            l.t === "poly" &&
            t > l.bb[0] &&
            t < l.bb[2] &&
            e > l.bb[1] &&
            e < l.bb[3] &&
            $nt(l.pts, t, e)
          )
            return !1;
      }
      return !0;
    }
    roadblock(t) {
      let e = this.traffic,
        s = this.spot([200, 230, 175, 255, 150], 3, 9.5);
      if (!s) return !1;
      let n = s.u,
        i = s.dx,
        a = s.dz,
        r = -a,
        l = i,
        c = 3.6,
        h =
          t <= 4 || Math.random() < 0.75
            ? (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.3 ? 0 : 1)
            : null,
        f = -n + 0.3,
        u = n - 0.3,
        d = null;
      h === -1
        ? ((d = f + c / 2), (f += c))
        : h === 1
          ? ((d = u - c / 2), (u -= c))
          : h === 0 && (d = 0);
      let p = Mi(Math.round((u - f - (h === 0 ? c : 0)) / 4.6), 2, 3),
        m = [];
      if (h === 0) {
        let x = (u - f - c) / 2;
        (m.push(f + x / 2, u - x / 2), p === 3 && m.splice(1, 0, null));
      } else for (let x = 0; x < p; x++) m.push(f + ((u - f) * (x + 0.5)) / p);
      let g = [];
      for (let x = e.cars.length - 1; x >= 0; x--) {
        let y = e.cars[x];
        if (
          !(y.cop || y.net || y.line || y.route) &&
          Math.hypot(y.x - s.x, y.z - s.z) < n + 8 &&
          Math.abs(y.y - s.y) < 3
        ) {
          if (this.inView(y.x, y.y, y.z)) return !1;
          e.cars.splice(x, 1);
        }
      }
      let b = (x, y, M) => this.clearAt(x, y, s.y, M);
      if (
        (m.forEach((x, y) => {
          if (x === null || this.units.length >= b4) return;
          let M = Math.atan2(-i, -a) + (Math.PI / 2 - 0.26) * (y % 2 ? 1 : -1),
            S = 0,
            w = 0,
            _ = !1;
          for (let T of [1.1, 1.6, 2.1, 2.7, 3.3].map(
            (E) => E * (y % 2 ? 1 : -1),
          ))
            if (
              ((S = s.x + r * x + i * T),
              (w = s.z + l * x + a * T),
              this.standable(S, w, s.y) && b(S, w, M))
            ) {
              _ = !0;
              break;
            }
          if (!_) return;
          let z = this.newUnit({ E: s.E, dir: s.dir, s: s.s, k: 0 });
          if (!z) return;
          Object.assign(z, {
            x: S,
            z: w,
            y: s.y,
            heading: M,
            fx: -Math.sin(M),
            fz: -Math.cos(M),
            v: 0,
          });
          let A = z.cop;
          ((A.free = !0),
            (A.mode = "block"),
            (z.cv = null),
            (z.nx = null),
            this.ground(z),
            g.push(z));
        }),
        g.length < 2)
      ) {
        for (let x of g) {
          let y = e.cars.indexOf(x);
          (y >= 0 && e.cars.splice(y, 1),
            this.units.splice(this.units.indexOf(x), 1));
        }
        return !1;
      }
      let v = {
        x: s.x,
        z: s.z,
        y: s.y,
        fx: i,
        fz: a,
        units: g,
        t: this.t,
        gap: d,
      };
      return (
        (v.mesh = this.coneMesh(
          s,
          m.filter((x) => x !== null),
          d,
          c,
          n,
        )),
        this.blocks.push(v),
        (this.stats.blocks = (this.stats.blocks || 0) + 1),
        this.say("Roadblock ahead"),
        t >= 5 && this.spikes(t, { q: s, gc: d, w: n }),
        !0
      );
    }
    clearAt(t, e, s, n) {
      let i = this.traffic,
        a = this.world,
        r = Io.police,
        l = { x: Math.cos(n), z: -Math.sin(n) },
        c = { x: Math.sin(n), z: Math.cos(n) };
      for (let h of i.cars)
        if (
          h.V &&
          Math.abs(h.x - t) < 8 &&
          Math.abs(h.z - e) < 8 &&
          Math.abs(h.y - s) < 3 &&
          a.test(this.obb(h), t, e, l, c, r.bw / 2 + 0.1, r.L / 2 + 0.1)
        )
          return !1;
      return !0;
    }
    stripUnit(t, e) {
      if (this.units.length >= b4 + 2 && !this.freeUnit()) return null;
      let s = t.dx,
        n = t.dz,
        i = -n,
        a = s,
        r = Io.police,
        l = Math.atan2(s, n) - e * 0.35;
      for (let c of [
        t.w - r.bw / 2 - 0.4,
        t.u - r.bw / 2 - 0.2,
        t.u - r.bw / 2 - 1.2,
      ])
        for (let h of [5, 3.5, 6.5, 2, 8, -3]) {
          let f = t.x + i * e * c + s * h,
            u = t.z + a * e * c + n * h;
          if (!this.standable(f, u, t.y, 1.2) || !this.clearAt(f, u, t.y, l))
            continue;
          let d = this.newUnit({ E: t.E, dir: t.dir, s: t.s, k: 0 });
          if (!d) return null;
          Object.assign(d, {
            x: f,
            z: u,
            y: t.y,
            heading: l,
            fx: -Math.sin(l),
            fz: -Math.cos(l),
            v: 0,
          });
          let p = d.cop;
          return (
            (p.free = !0),
            (p.mode = "block"),
            (d.cv = null),
            (d.nx = null),
            this.ground(d),
            this.blocks.push(
              (d._sb = {
                x: t.x,
                z: t.z,
                y: t.y,
                fx: s,
                fz: n,
                units: [d],
                t: this.t,
                gap: null,
                strip: !0,
              }),
            ),
            d
          );
        }
      return null;
    }
    freeUnit() {
      let t = this.v.pos,
        e = this.traffic,
        s = null,
        n = -1;
      for (let a of this.units) {
        if (a.cop.mode === "block" || this.inView(a.x, a.y, a.z)) continue;
        let r = Math.hypot(a.x - t.x, a.z - t.z);
        r > n && ((n = r), (s = a));
      }
      if (!s) return !1;
      let i = e.cars.indexOf(s);
      return (
        i >= 0 && e.cars.splice(i, 1),
        this.units.splice(this.units.indexOf(s), 1),
        !0
      );
    }
    blocksUpdate() {
      let t = this.v.pos,
        e = this.traffic,
        s = this.v.vel,
        n = Math.hypot(s.x, s.z);
      for (let i = this.blocks.length - 1; i >= 0; i--) {
        let a = this.blocks[i],
          r = (t.x - a.x) * a.fx + (t.z - a.z) * a.fz,
          l = Math.hypot(t.x - a.x, t.z - a.z),
          c = n > 5 && ((a.x - t.x) * s.x + (a.z - t.z) * s.z) / n < -40;
        if (
          ((a.units = a.units.filter(
            (f) => this.units.includes(f) && f.cop.mode === "block",
          )),
          (this.n & 15) === 0)
        )
          for (let f = e.cars.length - 1; f >= 0; f--) {
            let u = e.cars[f];
            u.cop ||
              u.net ||
              u.line ||
              u.route ||
              u.v > 1 ||
              (Math.hypot(u.x - a.x, u.z - a.z) < 45 &&
                Math.abs(u.y - a.y) < 4 &&
                !this.inView(u.x, u.y, u.z) &&
                e.cars.splice(f, 1));
          }
        if (
          (a.strip && a.S
            ? !this.strips.includes(a.S)
            : r > 30 || c || l > 450 || this.t - a.t > 70) ||
          !this.pursuit ||
          !a.units.length
        ) {
          let f = Vnt[Math.max(1, this.level)];
          for (let u of a.units)
            this.pursuit &&
            this.units.filter((d) => d.cop.mode === "chase").length < f
              ? this.toChase(u)
              : (u.cop.mode = "idle");
          (a.mesh?.removeFromParent(), this.blocks.splice(i, 1));
        }
      }
    }
    spikes(t, e = null) {
      let s, n, i;
      if (e) {
        let g = e.q;
        if (((s = this.predAt(Math.max(0, g.d - 14))), !s || s.E !== g.E))
          return !1;
        let b = e.gc ?? (Math.random() - 0.5) * e.w;
        ((n = b - 2.6), (i = b + 2.6));
      }
      let a = null,
        r = 0;
      if (!e) {
        if (((s = this.spot([140, 165, 120, 190, 210], 2.5, 12)), !s))
          return !1;
        ((n = Math.max(-s.u + 0.25, -s.w + 0.2)),
          (i = Math.min(s.u - 0.25, s.w - 0.2)));
        let g = Math.min(3.5, (i - n) * 0.4),
          b = Math.random() < 0.5 ? -1 : 1,
          v = Math.random() < 0.7;
        if (i - n - (v ? g : 0) < 2) return !1;
        for (let x of [b, -b])
          if ((a = this.stripUnit(s, x))) {
            r = x;
            break;
          }
        if (!a) return !1;
        v && (r < 0 ? (i -= g) : (n += g));
      }
      if (
        ((n = Math.max(n, -s.w + 0.2)), (i = Math.min(i, s.w - 0.2)), i - n < 2)
      )
        return !1;
      let l = -s.dz,
        c = s.dx,
        h = (n + i) / 2,
        f = i - n,
        u = s.x + l * h,
        d = s.z + c * h,
        p = (g, b) => {
          let v = this.L.driveHeight(g, b, null, s.y);
          return Number.isFinite(v) ? v : s.y;
        },
        m = {
          x: u,
          z: d,
          y: p(u, d),
          ax: u + l * (n - h),
          az: d + c * (n - h),
          bx: u + l * (i - h),
          bz: d + c * (i - h),
          nx: l,
          nz: c,
          fx: s.dx,
          fz: s.dz,
          len: f,
          t: this.t,
          hit: !1,
        };
      if (
        ((m.mesh = this.stripMesh(m, p)),
        (m.unit = a),
        (m.q = s),
        (m.side = e ? (h > 0 ? -1 : 1) : r),
        a?._sb && (a._sb.S = m),
        this.strips.push(m),
        (this.stats.strips = (this.stats.strips || 0) + 1),
        e)
      )
        this.say("Roadblock \xB7 spikes in the gap");
      else {
        let g =
          i - n > 2 * s.u - 1
            ? ""
            : (n + i) / 2 > 0
              ? " \xB7 gap on the left"
              : " \xB7 gap on the right";
        (this.say("Spike strip ahead" + g),
          this.toast?.(
            "Spike strip ahead",
            (g ? g.slice(3) : "Across the road") +
              " \xB7 " +
              Math.round(s.d) +
              " m",
          ));
      }
      return !0;
    }
    stripMesh(t, e) {
      if (!this.scene) return null;
      let s =
          o._sm ||
          (o._sm = (() => {
            let y = new me({ color: 3816770, metalness: 0.7, roughness: 0.45 }),
              M = new me({ color: 14212580, metalness: 0.9, roughness: 0.25 }),
              S = new me({
                color: 16777215,
                metalness: 0.1,
                roughness: 0.5,
                emissive: 2760704,
              });
            return {
              steel: y,
              spike: M,
              haz: S,
              bar: new Is(1, 0.045, 0.34),
              cone: new fr(0.022, 0.085, 4),
              blk: new Is(0.16, 0.06, 0.38),
            };
          })()),
        n = new le();
      n.name = "spikeStrip";
      let i = new ye(s.bar, s.steel);
      ((i.scale.x = t.len),
        (i.position.y = 0.0225),
        (i.receiveShadow = !0),
        (i.castShadow = !0),
        n.add(i));
      let a = Math.floor(t.len / 0.14),
        r = new En(s.cone, s.spike, a * 2),
        l = new fe();
      for (let y = 0; y < a; y++)
        for (let M of [-0.09, 0.09])
          (l.makeTranslation(-t.len / 2 + ((y + 0.5) * t.len) / a, 0.085, M),
            r.setMatrixAt(y * 2 + (M > 0 ? 1 : 0), l));
      ((r.instanceMatrix.needsUpdate = !0), (r.castShadow = !0), n.add(r));
      let c = Math.max(2, Math.floor(t.len / 0.45) + 1),
        h = new En(s.blk, s.haz, c),
        f = new It();
      for (let y = 0; y < c; y++)
        (l.makeTranslation(
          -t.len / 2 + 0.08 + (y * (t.len - 0.16)) / (c - 1),
          0.03,
          0,
        ),
          h.setMatrixAt(y, l),
          h.setColorAt(y, f.set(y % 2 ? 1118481 : 16761856)));
      ((h.instanceMatrix.needsUpdate = !0),
        h.instanceColor && (h.instanceColor.needsUpdate = !0),
        n.add(h));
      let u =
        o._fm ||
        (o._fm = {
          cone: new fr(0.17, 0.72, 10),
          cmat: new me({ color: 16730634, roughness: 0.55, emissive: 3804672 }),
          flare: new vs(0.025, 0.025, 0.24, 6).rotateZ(Math.PI / 2),
          fmat: new me({
            color: 16719888,
            emissive: 16719888,
            emissiveIntensity: 40,
          }),
        });
      for (let y of [-1, 1]) {
        let M = new ye(u.cone, u.cmat);
        (M.position.set(y * (t.len / 2 + 0.45), 0.36, 0),
          (M.castShadow = !0),
          n.add(M));
      }
      let d = new le();
      d.name = "stripFlares";
      for (let y of [-1, 1])
        for (let M of [6, 12]) {
          let S = y * (t.len / 2 - 0.3),
            w = t.x + t.nx * S - t.fx * M,
            _ = t.z + t.nz * S - t.fz * M,
            z = new ye(u.flare, u.fmat);
          (z.position.set(w, e(w, _) + 0.03, _),
            (z.rotation.y = Math.atan2(t.fx, t.fz) + 0.5 * y),
            d.add(z));
        }
      let p = e(t.ax, t.az),
        m = e(t.bx, t.bz),
        g = e(t.x + t.fx * 0.5, t.z + t.fz * 0.5),
        b = e(t.x - t.fx * 0.5, t.z - t.fz * 0.5),
        v = Math.atan2(-t.nz, t.nx);
      (n.position.set(t.x, (p + m) / 2 + 0.005, t.z),
        n.rotation.set(Math.atan(g - b), v, Math.atan2(m - p, t.len), "YZX"));
      let x = new le();
      return (
        (x.name = "spikeStripSet"),
        x.add(n, d),
        x.traverse((y) => {
          y.frustumCulled = !1;
        }),
        this.scene.add(x),
        x
      );
    }
    heliUpdate(t) {
      let e = this.pursuit && this.level >= 4 && !(this.hold > 0);
      if (!this.heli) {
        if (!e || !this.scene) return;
        this.heli = new Xv({
          scene: this.scene,
          L: this.L,
          mobile: this.mobile,
          heights: this.heights,
        });
      }
      let s = this.heli,
        n = s.sees;
      (s.update(
        t,
        this.v.pos,
        this.v.vel,
        e,
        this.known,
        this.night?.() || 0,
        this.v.forward(),
      ),
        s.sees &&
          !n &&
          !this._heliSaid &&
          ((this._heliSaid = !0), this.say("Air unit overhead")),
        s.on || (this._heliSaid = !1),
        (this.traffic.heliMark = s.on ? { x: s.x, z: s.z } : null));
    }
    clearBlocks() {
      for (let t of this.blocks) t.mesh?.removeFromParent();
      this.blocks.length = 0;
    }
    coneMesh(t, e, s, n, i) {
      if (!this.scene) return null;
      let a =
          o._cm ||
          (o._cm = {
            geo: new fr(0.17, 0.72, 10),
            band: new vs(0.085, 0.115, 0.12, 10),
            mat: new me({
              color: 16730634,
              roughness: 0.55,
              emissive: 3804672,
            }),
            white: new me({
              color: 16777215,
              roughness: 0.35,
              emissive: 3158064,
            }),
          }),
        r = [];
      for (let p = -i + 0.5; p <= i - 0.5; p += 1.6)
        (s === null || Math.abs(p - s) > n / 2 + 0.3) && r.push(p);
      let l = new le();
      l.name = "roadblockCones";
      let c = new En(a.geo, a.mat, r.length),
        h = new En(a.band, a.white, r.length),
        f = new fe(),
        u = -t.dz,
        d = t.dx;
      (r.forEach((p, m) => {
        let g = t.x + u * p - t.dx * 8,
          b = t.z + d * p - t.dz * 8,
          v = this.L.driveHeight(g, b, null, t.y),
          x = Number.isFinite(v) ? v : t.y;
        (c.setMatrixAt(m, f.makeTranslation(g, x + 0.36, b)),
          h.setMatrixAt(m, f.makeTranslation(g, x + 0.42, b)));
      }),
        (c.instanceMatrix.needsUpdate = !0),
        (h.instanceMatrix.needsUpdate = !0),
        (c.castShadow = !0));
      for (let p of [c, h]) ((p.frustumCulled = !1), l.add(p));
      return (this.scene.add(l), l);
    }
    clearStrips() {
      for (let t of this.strips) t.mesh && t.mesh.removeFromParent();
      this.strips.length = 0;
    }
    stripsUpdate(t) {
      let e = this.v,
        s = e.pos,
        n = e.S || {},
        i = n.a ?? 1.4,
        a = n.b ?? 1.4,
        r = (n.track ?? 1.6) / 2,
        l = e.forward(),
        c = -Math.cos(e.psi),
        h = Math.sin(e.psi),
        f = [
          [i, r],
          [i, -r],
          [-a, r],
          [-a, -r],
        ].map(([d, p]) => [s.x + l.x * d + c * p, s.z + l.z * d + h * p]),
        u = this._wp;
      this._wp = f;
      for (let d = this.strips.length - 1; d >= 0; d--) {
        let p = this.strips[d],
          m = (s.x - p.x) * p.fx + (s.z - p.z) * p.fz,
          g = Math.hypot(s.x - p.x, s.z - p.z);
        if (m > 80 || g > 450 || this.t - p.t > 60) {
          (p.mesh && p.mesh.removeFromParent(), this.strips.splice(d, 1));
          continue;
        }
        if (m < -15 && (this.n & 7) === (d & 7) && !this.manned(p)) {
          let b = g > 110 || !this.inView(p.x, p.y, p.z),
            v =
              b && p.q
                ? this.stripUnit(p.q, p.side) || this.stripUnit(p.q, -p.side)
                : null;
          if (v)
            ((p.unit = v),
              (v._sb.S = p),
              (this.stats.restaffed = (this.stats.restaffed || 0) + 1));
          else if (b) {
            (p.mesh && p.mesh.removeFromParent(),
              this.strips.splice(d, 1),
              (this.stats.unmanned = (this.stats.unmanned || 0) + 1));
            continue;
          }
        }
        if (!(!u || g > 12 || Math.abs((s.y ?? p.y) - p.y) > 2.5))
          for (let b = 0; b < 4; b++)
            !this.tyres.w[b] &&
              (_6t(u[b], f[b], p) || E6t(f[b], p) < 0.2) &&
              this.pop(b, p);
      }
    }
    manned(t) {
      let e = t.bx - t.ax,
        s = t.bz - t.az,
        n = e * e + s * s || 1;
      return this.units.some((i) => {
        if (i.wreck || (i.cop.mode === "chase" && i.v > 3)) return !1;
        let a = Mi(((i.x - t.ax) * e + (i.z - t.az) * s) / n, 0, 1);
        return Math.hypot(i.x - t.ax - e * a, i.z - t.az - s * a) < 12;
      });
    }
    pop(t, e) {
      let s = this.tyres,
        n = s.n;
      ((s.w[t] = 1),
        (s.n = s.w.reduce((a, r) => a + r, 0)),
        (e.hit = !0),
        (this.stats.pops = (this.stats.pops || 0) + 1),
        n ||
          ((s.t = 0),
          (s.def = 0),
          (s.stopT = 0),
          (s.armour = this.v.S === vv),
          s.armour
            ? (this.toast?.("Spike strip", "Armoured tyres: they hold"),
              this.say("Tyres holding"))
            : (this.toast?.(
                "Tyres blown",
                "Going flat \xB7 lose them before you stop",
              ),
              this.say("Tyres blown"))));
      let i = this.v.pos;
      this.world.hits.push({
        x: i.x,
        z: i.z,
        s: 0.12,
        t: performance.now(),
        v: 4,
        vt: 0,
        nx: 0,
        nz: 0,
        spike: !0,
      });
    }
    tyresUpdate(t) {
      let e = this.tyres,
        s = this.v;
      if (!e.n) {
        this.gripK = 1;
        return;
      }
      if (((e.t += t), e.armour ? e.t > 6 : !this.pursuit && e.t > 20)) {
        this.repair(e.armour);
        return;
      }
      let n = s.speed,
        i = e.n / 4;
      e.def = Math.min(
        e.armour ? 0.12 : 1,
        (e.def || 0) + t * (0.08 + 0.035 * e.n),
      );
      let a = e.def;
      this.gripK = 1 - 0.78 * a * Math.sqrt(i);
      let r = 30 * (1 - a) + 1.5;
      if (n > r) {
        let c = r + (n - r) * Math.exp(-t * 1.6);
        ((s.vel.x *= c / n), (s.vel.z *= c / n));
      }
      if (a > 0.7) {
        let c = Math.exp((-t * 3 * (a - 0.7)) / 0.3);
        ((s.vel.x *= c), (s.vel.z *= c));
      }
      let l = Mi(n / 12, 0, 1);
      if (
        (s.r !== void 0 &&
          (s.r +=
            (Math.sin(this.t * 12.5) * 0.7 + Math.sin(this.t * 7.1) * 0.4) *
            (3 + 9 * a) *
            i *
            l *
            t),
        n > 3 && !e.armour && (e.sparkT -= t) <= 0)
      ) {
        e.sparkT = 0.12 - 0.07 * a;
        let c = this.world.hits,
          h = e.w.findIndex((d, p) => d && p >= Math.floor(Math.random() * 4)),
          f = h >= 0 ? h : e.w.indexOf(1),
          u = this._wp?.[f];
        u &&
          (c.push({
            x: u[0],
            z: u[1],
            s: 0.04 + 0.06 * a,
            t: performance.now() + 0.001,
            v: 0,
            vt: a > 0.35 ? 5 + 6 * a : 0,
            nx: 0,
            nz: 0,
            spike: !0,
          }),
          c.length > 16 && c.splice(0, c.length - 16));
      }
      ((e.stopT = a > 0.9 && n < 2 ? (e.stopT || 0) + t : 0),
        e.stopT > 2.5 &&
          this.pursuit &&
          !(this.hold > 0) &&
          ((this.stats.spikeBusts = (this.stats.spikeBusts || 0) + 1),
          this.busted()));
    }
    repair(t = !1) {
      let e = this.tyres;
      (e.n && !t && this.toast?.("Tyres repaired"),
        (e.w = [0, 0, 0, 0]),
        (e.n = 0),
        (e.t = 0),
        (e.def = 0),
        (e.stopT = 0),
        (e.armour = !1),
        (this.gripK = 1));
    }
    say(t) {
      this.note = { tx: t, until: this.t + 4 };
    }
    los(t, e, s, n) {
      let i = this.world,
        a = Math.hypot(s - t, n - e),
        r = Math.ceil(a / 6);
      for (let l = 1; l < r; l++) {
        let c = t + ((s - t) * l) / r,
          h = e + ((n - e) * l) / r,
          f = i.grid.get(i1(Math.floor(c / lo), Math.floor(h / lo)));
        if (f) {
          for (let u of f)
            if (
              u.t === "poly" &&
              c > u.bb[0] &&
              c < u.bb[2] &&
              h > u.bb[1] &&
              h < u.bb[3] &&
              $nt(u.pts, c, h)
            )
              return !1;
        }
      }
      return !0;
    }
    inView(t, e, s) {
      let n = this.camera;
      return n
        ? (this._frN !== this.n &&
            ((this._frN = this.n),
            this._m.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse),
            this._fr.setFromProjectionMatrix(this._m)),
          Math.hypot(t - n.position.x, s - n.position.z) < 260 &&
            this._fr.containsPoint(this._v.set(t, e + 1, s)))
        : !1;
    }
    drawHud(t) {
      let e = this._h;
      if (!e) return;
      let s =
          !t &&
          (this.heat > (this._hc?.on ? 0.15 : 0.35) ||
            this.units.some((f) => f.cop.mode === "chase")),
        n = (f, u, d) => {
          let p = this._hc || (this._hc = {});
          p[f] !== u && ((p[f] = u), d(u));
        };
      if (
        (n("on", s, (f) => {
          this.hud.classList.toggle("on", f);
        }),
        n("flash", s && this.pursuit && this.contact, (f) =>
          this.flash.classList.toggle("on", f),
        ),
        !s)
      )
        return;
      let i = this.level;
      (n("lvl", i, (f) =>
        e.stars.forEach((u, d) => u.classList.toggle("on", d < f)),
      ),
        n("chase", this.pursuit, (f) => this.hud.classList.toggle("chase", f)));
      let a =
        this.pursuit && this.cool > 0.5 && (!this.contact || this.level <= 1);
      (n("cool", a, (f) => this.hud.classList.toggle("cool", f)),
        n("name", this.pursuit ? "WANTED" : "HEAT", (f) => {
          e.lvl.textContent = f;
        }),
        n(
          "bar",
          Math.round((this.pursuit ? this.heat - i : this.heat) * 100),
          (f) => {
            e.bar.style.width = f + "%";
          },
        ));
      let r =
        Math.max(0, this.evadeT() - this.cool) /
        (this.contact ? 0.6 : this.hiding ? 2 : 1);
      (n("hide", a && this.hiding, (f) => this.hud.classList.toggle("hide", f)),
        n(
          "cd",
          a ? Math.round(Mi(this.cool / this.evadeT(), 0, 1) * 100) : 0,
          (f) => {
            e.cd.style.width = f + "%";
          },
        ),
        n(
          "cdt",
          a ? (this.hiding ? "Hiding \xB7 " : "") + Math.ceil(r) + "s" : "",
          (f) => {
            e.cdt.textContent = f;
          },
        ));
      let l =
        this.why && this.t - this.why.t < 4 ? "Heat +: " + this.why.tx : "";
      (n("whyOn", !!l, (f) => this.hud.classList.toggle("why", f)),
        n("why", l, (f) => {
          e.why.textContent = f;
        }));
      let c = this.note && this.t < this.note.until ? this.note.tx : null,
        h =
          this.bust > 0.1
            ? "Busting " + Math.round((this.bust / 4) * 100) + "%"
            : c && this.pursuit
              ? c
              : this.pursuit
                ? a
                  ? this.contact
                    ? "Patrol tailing \xB7 keep it clean"
                    : this.tyres.n
                      ? "Tyres blown \xB7 out of sight"
                      : this.hiding
                        ? "Hidden \xB7 out of sight"
                        : this.met && this.t - this.known.t > this.memory()
                          ? "Searching \xB7 out of sight"
                          : "Out of sight"
                  : this.tyres.n
                    ? "Tyres blown"
                    : this.contact
                      ? "Police in pursuit"
                      : "Police responding"
                : this.speeding
                  ? "Speeding"
                  : "Suspicion";
      (n("tx", h, (f) => {
        e.tx.textContent = f;
      }),
        n("bty", this.pursuit ? 250 * Math.max(1, this.level) : 0, (f) => {
          e.bty.textContent = f ? "evade +$" + f : "";
        }));
    }
  };
