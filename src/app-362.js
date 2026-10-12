// app 362 — math
// Lines 179555-181916 of readable/app.pretty.js (statement-aligned).
var Tyt = new $t(0.004, 0.0042, 0.0046),
  Itt = [0, 1, 2, 4, 5, 6],
  Yz = 8,
  VF = [30, 30, 34, 40, 44, 50],
  Ayt = { minor: 1.6, moderate: 2.6, serious: 3.6, extreme: 5 },
  Ryt = [0, 12, 15, 18, 22, 26],
  Pyt = [0, 3, 4, 6, 6, 6],
  Cyt = new Set(["evading the police", "high-speed pursuit"]),
  Tp = 1900,
  uo = (i, t, e) => (i < t ? t : i > e ? e : i),
  Ftt = (i) => Math.atan2(Math.sin(i), Math.cos(i)),
  Lyt = `
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
  Jz = class i {
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
        (this.t = 0),
        (this.hitT = performance.now()),
        (this.patrolT = 1),
        (this.dispatchT = 0),
        (this.seeT = 0),
        (this.roadT = 0),
        (this.lastE = null),
        (this.road = null),
        (this.n = 0),
        (this._fr = new No()),
        (this._m = new ye()),
        (this._v = new xt()),
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
      (e && (this.world.muAt = (n, o) => e(n, o) * this.gripK),
        (this.traffic.copStep = (n, o) => this.drive(n, o)),
        (this.traffic.copGround = (n, o) => this.ground(n, o)),
        (this.traffic.onCopShove = (n, o, a, r, l) =>
          this.knock(n, o, a, r, l)));
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
        ((n.textContent = Lyt),
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
        o = n.pos;
      (this._lp &&
        Math.hypot(o.x - this._lp.x, o.z - this._lp.z) > 40 &&
        this.repair(),
        (this._lp = { x: o.x, z: o.z }));
      {
        let d = (this.trail ||= []),
          p = d[d.length - 1];
        (!p || Math.hypot(o.x - p.x, o.z - p.z) > 8) &&
          (d.push({ x: o.x, z: o.z, y: o.y }), d.length > 50 && d.shift());
      }
      this.hold > 0 &&
        (this.hold -= t) <= 0 &&
        ((this.hold = 0), this.release());
      for (let d = this.units.length - 1; d >= 0; d--) {
        let p = this.units[d];
        s.cars.includes(p) || this.units.splice(d, 1);
      }
      let a = n.speed,
        r = n.forward();
      if ((this.seeT -= t) <= 0) {
        this.seeT = 0.25;
        for (let d of this.units) {
          let p = Math.hypot(d.x - o.x, d.z - o.z);
          ((d.cop.d = p),
            (d.cop.sees =
              !d.wreck &&
              p < 135 &&
              Math.abs(d.y - o.y) < 12 &&
              this.los(d.x, d.z, o.x, o.z)),
            (d.cop.vis = this.inView(d.x, d.y, d.z)),
            (d.cop.ghost = !d.cop.vis && this.level >= 2));
        }
      }
      let l = this.units.some((d) => !d.wreck && d.cop.sees && d.cop.d < 120);
      (this.pedHook(),
        (this.roadT -= t) <= 0 &&
          ((this.roadT = 0.25),
          (this.road = this.L.roadAt(o.x, o.z, 14, o.y)),
          this.checkRed(a, l),
          (this.walk = this.onWalk(a))));
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
      for (let d of this.world.hits) {
        if (d.t <= this.hitT) continue;
        this.hitT = d.t;
        let p = d.C?.traffic;
        if (!d.car || !p || p.net || p.mp || d.v < 3) continue;
        let m = this.v.vel.x * (p.x - o.x) + this.v.vel.z * (p.z - o.z),
          g = Math.hypot(p.x - o.x, p.z - o.z) || 1;
        if (!(m / g < 3))
          if (p.cop && p.cop.mode === "block")
            (this.stats.blockHits++,
              this.stats.copHits++,
              this.offence(
                this.heat < 3 ? 1 : 0.7,
                "broke a roadblock",
                "extreme",
              ));
          else if (p.cop) {
            this.stats.copHits++;
            let b = d.v > 6;
            this.offence(
              this.heat < 1 ? 1.05 : b ? 0.6 : 0.3,
              b ? "rammed a police unit" : "hit a police unit",
              b ? "serious" : "moderate",
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
            this.units.some((m) => m.cop.free && m.cop.sees) ||
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
          let m =
            this.chaseFastT >= 120
              ? 5
              : this.chaseFastT >= 60
                ? 4.6
                : this.chaseT >= 100
                  ? 3.6
                  : this.chaseT >= 45
                    ? 2.6
                    : 0;
          this.heat < m &&
            this.offence(
              t / 40,
              m > 3.6 ? "high-speed pursuit" : "evading the police",
              m > 3.6 ? "extreme" : m > 2.6 ? "serious" : "moderate",
              m,
            );
        } else this.cool += (this.met ? 1 : 0.4) * (this.hiding ? 2 : 1) * t;
        if (this.contact || !this.met) {
          let m = this.known;
          ((m.x = o.x),
            (m.z = o.z),
            (m.y = o.y),
            (m.vx = n.vel.x),
            (m.vz = n.vel.z),
            (m.t = this.t));
        }
        let d =
            a < 2
              ? this.units.filter(
                  (m) =>
                    !m.wreck &&
                    m.cop.free &&
                    m.cop.mode !== "block" &&
                    Math.hypot(m.x - o.x, m.z - o.z) < 10,
                ).length
              : 0,
          p = d > 0 && (this.level >= 3 || d >= 2 || this.blockedAhead());
        ((this.bust = p ? this.bust + t : Math.max(0, this.bust - t * 2)),
          this.bust > 4
            ? this.busted()
            : this.cool > this.evadeT() && this.evaded());
      } else
        ((this.heat = Math.max(0, this.heat - t * 0.08)),
          (this.cool = 0),
          (this.bust = 0),
          (this.hiding = !1));
      let f = this.units.filter((d) => !d.cop.free && !d.wreck).length,
        u = this.units.filter(
          (d) => d.cop.free && d.cop.mode === "chase" && !d.wreck,
        );
      if (this.pursuit) {
        let d = Math.max(1, this.level),
          p = Math.min(
            Itt[d],
            Yz - this.units.filter((m) => m.cop.mode === "block").length,
          );
        (this.predT -= t) <= 0 &&
          ((this.predT = 0.5), (this.pred = this.predict()));
        for (let m of this.units)
          !m.wreck &&
            m.cop.mode !== "chase" &&
            m.cop.mode !== "block" &&
            Math.hypot(m.x - o.x, m.z - o.z) < 380 &&
            u.length < p &&
            (this.toChase(m), u.push(m));
        if (
          (this.dispatchT -= t) <= 0 &&
          u.length < p &&
          this.units.length < Yz &&
          (!this.met ||
            this.contact ||
            this.resend > 0 ||
            (this.t - this.known.t < 5 &&
              this.nearKnown() &&
              !u.some((m) => Math.hypot(m.x - o.x, m.z - o.z) < 250)))
        ) {
          (this.resend > 0 && this.resend--,
            (this.dispatchT = d >= 3 ? 1.2 : d >= 2 ? 2 : 3));
          let m =
            (d >= 3 && this.nDisp++ % 2 === 1 && this.dispatchAhead()) ||
            this.dispatch();
          m && u.push(m);
        }
        ((this.roleT -= t) <= 0 && ((this.roleT = 0.5), this.roles(u, d)),
          this.escalate(t, d));
      } else if ((this.patrolT -= t) <= 0) {
        this.patrolT = 3;
        let d = s.max <= 24 ? 1 : 2;
        f < d && this.patrol(o.x, o.z, r.x, r.z);
      }
      if (this.pursuit && (this.contact || this.cool < 3))
        for (let d of this.units) {
          let p = d.cop;
          if (p.mode !== "chase" || d.wreck) continue;
          let m = Math.hypot(d.x - o.x, d.z - o.z);
          if (p.best === void 0 || m < p.best - 8) {
            ((p.best = m), (p.bestT = this.t));
            continue;
          }
          this.t - p.bestT > 5 &&
            m > 30 &&
            !p.sees &&
            !this.inView(d.x, d.y, d.z) &&
            ((p.jams = 9),
            (p.best = void 0),
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
        let d = Math.max(1, this.level),
          p = this.v.vel,
          m = n.speed;
        for (let g of this.units) {
          let b = g.cop;
          if (
            b.mode !== "chase" ||
            g.wreck ||
            b.sees ||
            b.vis ||
            this.t - (b.jumpT ?? -9) < 4
          )
            continue;
          let x = Math.hypot(g.x - o.x, g.z - o.z),
            v = ((g.x - o.x) * p.x + (g.z - o.z) * p.z) / m;
          if (
            x > (d >= 2 ? 170 : 230) &&
            (v < 0 || x > 320) &&
            this.t - (b.bestT ?? -9) > 2.5 &&
            this.relocate(g, d)
          ) {
            this.jumpT = 0.5;
            break;
          }
        }
      }
      for (let d = this.units.length - 1; d >= 0; d--) {
        let p = this.units[d],
          m = Math.hypot(p.x - o.x, p.z - o.z);
        if (
          m > 520 ||
          ((p.cop.mode === "idle" || p.cop.jams >= 3) &&
            m > 40 &&
            !this.inView(p.x, p.y, p.z)) ||
          (p.wreck?.dead && m > 200)
        ) {
          p.cop.mode === "chase" &&
            p.cop.jams >= 3 &&
            p.cop.jams !== 9 &&
            this.pursuit &&
            this.resend++;
          let g = s.cars.indexOf(p);
          (g >= 0 && s.cars.splice(g, 1), this.units.splice(d, 1));
        }
      }
      (this.blocksUpdate(),
        this.stripsUpdate(t),
        this.tyresUpdate(t),
        this.heliUpdate(t));
      for (let d of this.units) {
        if (!(
          ((d.cop.free && (d.cop.mode === "chase" || d.cop.mode === "block")) ||
            d.cop.show) &&
          !d.wreck
        )) {
          d.cop.lit = 0;
          continue;
        }
        let m = (this.t * 2.2 + d.cop.ph) % 1,
          g = Math.floor(m * 8);
        d.cop.lit = g === 0 || g === 2 ? 1 : g === 4 || g === 6 ? 2 : 0;
      }
      this.drawHud(!1);
    }
    evadeT() {
      return Ryt[uo(this.level, 1, 5)];
    }
    offence(t, e, s = "minor", n = Ayt[s] ?? 5) {
      if (!this.enabled || !(t > 0)) return 0;
      let o = this.heat;
      if ((Cyt.has(e) || (this.offT = this.t), o >= n)) return 0;
      this.heat = Math.min(n, o + t);
      let a = this.heat - o,
        r = this._acc || (this._acc = {});
      return (
        (r[e] = (r[e] || 0) + a),
        (a >= 0.2 || r[e] >= 0.15 || Math.floor(this.heat) > Math.floor(o)) &&
          (this.log.push({
            why: e,
            tier: s,
            add: +r[e].toFixed(2),
            heat: +this.heat.toFixed(2),
            t: +this.t.toFixed(1),
          }),
          this.log.length > 40 && this.log.shift(),
          (r[e] = 0),
          (this.why = { tx: e, tier: s, t: this.t })),
        o < 1 && this.heat >= 1 && this.startPursuit(e.toUpperCase()),
        a
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
    covered() {
      let t =
        this._cv ||
        (this._cv = {
          L: this.L,
          heights: this.heights,
          roofAt: sv.prototype.roofAt,
        });
      return sv.prototype.covered.call(t, this.v.pos);
    }
    blockedAhead() {
      let t = this.world,
        e = this.v.pos,
        s = this.v.forward(),
        n = this.v.psi ?? Math.atan2(-s.x, -s.z),
        o = e.x + s.x * 1.2,
        a = e.z + s.z * 1.2,
        r = { x: Math.cos(n), z: -Math.sin(n) },
        l = { x: Math.sin(n), z: Math.cos(n) },
        c = 0.95,
        h = 2.3,
        f = (u) =>
          !u.dead &&
          !u.traffic?.cop &&
          (u.y1 === void 0 || (e.y < u.y1 + 0.3 && e.y + 1.4 > u.y0)) &&
          t.test(u, o, a, r, l, c, h);
      for (let u of t.near(o, a, h + 1)) if (f(u)) return !0;
      for (let u of this.traffic.colliders || [])
        if (Math.abs(u.x - o) < 7 && Math.abs(u.z - a) < 7 && f(u)) return !0;
      return !this.los(e.x, e.z, e.x + s.x * 4, e.z + s.z * 4);
    }
    pedHook() {
      let t = ba;
      if (!t.onBump || t.onBump._cop) return;
      let e = t.onBump,
        s = (n, o, a) => (o?.player && this.pedHit(n), e(n, o, a));
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
      return this.heli?.sees ? 1e9 : Pyt[uo(this.level, 1, 5)];
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
        e = this.units.filter((o) => !o.wreck),
        s = null,
        n = -1;
      for (let o = 0; o < 16 && n < 2; o++) {
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
        let o = n.tl?.find((a) => a.E === this.lastE);
        o &&
          this.roads.signal(n, o.ph, this.traffic.t) === 2 &&
          (this.stats.reds++,
          this.offence(e ? 0.7 : 0.3, "ran a red light", "minor"));
      }
      ((this.inJ = !!n), n || (this.lastE = s.E));
    }
    newUnit(t) {
      let n = this.traffic.addReal(t, null, ["police", Tyt]);
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
      let o = this.traffic,
        a = this.roads;
      for (let r = 0; r < 10; r++) {
        let l = Math.random() * Math.PI * 2,
          c = 160 + Math.random() * 240,
          h = t + Math.cos(l) * c,
          f = e + Math.sin(l) * c,
          u = a.spawnAt(h, f, Math.random);
        if (!u) continue;
        let d = a.pose({ ...u, lat: void 0 }, this._o);
        if (o.occupied3(d.x, d.y, d.z, 8) || this.inView(d.x, d.y, d.z))
          continue;
        let p = this.newUnit(u);
        if (p) return ((p.v = Math.min(p.E.vmax, 11)), p);
      }
      return null;
    }
    relocate(t, e) {
      let s = this.v,
        n = s.pos,
        o = s.speed,
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
          v: l.side ? 12 : o * 0.95,
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
        !0
      );
    }
    spotBehind(t, e) {
      let s = this.traffic,
        n = this.v.pos,
        o = this.v.vel,
        a = Math.hypot(o.x, o.z),
        r = a > 3 ? { x: o.x / a, z: o.z / a } : this.v.forward();
      for (let l = 0; l < 12; l++) {
        let c = Math.atan2(-r.z, -r.x) + (Math.random() - 0.5) * 1.6,
          h = t + Math.random() * (e - t),
          f = this.L.roadAt(n.x + Math.cos(c) * h, n.z + Math.sin(c) * h, 25);
        if (!f || !f.E.car || f.E.s1 - f.E.s0 < 6) continue;
        let u = Ot(f.E, uo(f.s, f.E.s0 + 2, f.E.s1 - 2), {});
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
          for (let [n, o] of s.J.legs.filter(
            ([a]) =>
              a !== s.inE &&
              a !== s.outE &&
              a.car &&
              !a.inner &&
              a.s1 - a.s0 > 40,
          )) {
            let a = o === "a" ? 1 : -1,
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
      for (let o = 0; o < 16; o++) {
        let a = Math.atan2(-s.z, -s.x),
          r =
            o < 10 || n
              ? a + (Math.random() - 0.5) * 2.4
              : Math.random() * Math.PI * 2,
          l = 70 + Math.random() * 90,
          c = e.x + Math.cos(r) * l,
          h = e.z + Math.sin(r) * l,
          f = this.L.roadAt(c, h, 25);
        if (!f || !f.E.car || f.E.s1 - f.E.s0 < 6) continue;
        let u = uo(f.s, f.E.s0 + 2, f.E.s1 - 2),
          d = Ot(f.E, u, this._o);
        if (
          Math.abs(d.y - e.y) > 14 ||
          t.occupied3(d.x, d.y, d.z, 7) ||
          ((o < 14 || n) && this.inView(d.x, d.y, d.z))
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
      ((e.mode = "idle"), (e.lit = 0));
      let s = this.L.roadAt(t.x, t.z, 12, t.y);
      if (!s || !s.E.car || !this.roads.D || s.E.s1 - s.E.s0 < 4) return;
      let n = s.E.oneway || t.fx * s.dx + t.fz * s.dz >= 0 ? 1 : -1;
      ((t.E = s.E),
        (t.dir = n),
        (t.k = 0),
        (t.s = uo(s.s, s.E.s0, s.E.s1)),
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
    knock(t, e, s, n, o) {
      let a = t.cop,
        r = -e / Tp,
        l = -s / Tp,
        c = Math.hypot(r, l);
      if (!this.byPlayer) {
        let h = Math.min(1, 3 / Math.max(c, 0.001));
        ((a.kx += r * 0.5 * h), (a.kz += l * 0.5 * h), (t.v *= 0.97));
        return;
      }
      if (this.t - (a.kT ?? -1) < 0.25) {
        if (
          (c > a.kdv &&
            ((a.dmg +=
              (Math.max(0, c - 3) ** 2 - Math.max(0, a.kdv - 3) ** 2) / 36),
            (a.kdv = c)),
          (t.v *= 0.9),
          a.dmg < 1)
        )
          return;
      } else
        ((a.kT = this.t), (a.kdv = c), (a.dmg += Math.max(0, c - 3) ** 2 / 36));
      if (
        ((a.kx += r * 0.7),
        (a.kz += l * 0.7),
        (t.v += (r * t.fx + l * t.fz) * 0.3),
        (t.heading += uo(
          (((n - t.x) * s - (o - t.z) * e) / (Tp * 4.2)) * 0.15,
          -0.3,
          0.3,
        )),
        a.dmg >= 1)
      ) {
        ((t.wreck = {
          vx: t.fx * t.v + a.kx,
          vz: t.fz * t.v + a.kz,
          r: 0,
          t: 0,
          dead: !0,
        }),
          (a.mode = "down"),
          (a.free = !1),
          (a.lit = 0));
        let h = this.v.pos,
          f =
            (this.v.vel.x * (t.x - h.x) + this.v.vel.z * (t.z - h.z)) /
            (Math.hypot(t.x - h.x, t.z - h.z) || 1);
        (this.stats.disabled++,
          f > 3
            ? ((this.bounty += 200),
              this.onCash?.(200, "Police unit disabled"),
              this.toast?.("Unit disabled", "+$200 bounty"),
              this.offence(0.8, "destroyed a police unit", "extreme"))
            : this.toast?.("Unit wrecked"));
      }
    }
    drive(t, e) {
      let s = t.cop,
        n = this.v,
        o = n.pos,
        a = n.vel,
        r = Math.hypot(a.x, a.z),
        l = Math.max(1, this.level),
        c = o.x - t.x,
        h = o.z - t.z,
        f = Math.hypot(c, h),
        u = t.x + t.fx * 10,
        d = t.z + t.fz * 10,
        p = 0,
        m = !1;
      if (s.mode === "block") {
        t.v = 0;
        let w = Math.exp(-e * 2.5);
        ((s.kx *= w),
          (s.kz *= w),
          (t.brake = 1),
          (t.x += s.kx * e),
          (t.z += s.kz * e),
          this.collide(t),
          this.ground(t, e));
        return;
      }
      if (s.mode === "chase") {
        s.noDirect = Math.max(0, (s.noDirect || 0) - e);
        let w = this.t - this.known.t,
          z = w < this.memory(),
          _ = !s.vis,
          R = [0, 0.6, 1, 1.15, 1.3, 1.5][l],
          T = r > 12 ? 2 : 14 - r,
          E =
            l <= 1
              ? Math.min(VF[1], r + T)
              : l === 2
                ? Math.max(VF[2], _ ? r + 8 : r + 3)
                : Math.max(VF[l], _ ? 95 : r + 4 + 4 * R),
          A =
            l === 2
              ? r + 3 + Math.max(0, f - 40) * 0.06 + (_ ? 3 : 0)
              : r + 6 + Math.max(0, f - 40) * 0.12 * R + (_ ? 6 : 0);
        if (
          ((m =
            z && (f < 22 || (f < (r > 25 ? 40 : 95) && s.sees && !s.noDirect))),
          m)
        ) {
          let P = n.forward(),
            I = -P.z,
            L = P.x,
            F = (t.x - o.x) * P.x + (t.z - o.z) * P.z,
            N = (t.x - o.x) * I + (t.z - o.z) * L,
            B = Math.min(0.9, f / 45),
            H = o.x + a.x * B,
            O = o.z + a.z * B,
            D = s.role;
          if (D === 4)
            ((H -= P.x * 11),
              (O -= P.z * 11),
              (p = uo(r + uo((f - 11) * 0.6, -8, T), 0, E)));
          else if (D === 0) {
            let G = N >= 0 ? 1 : -1;
            (F < -4.2 || Math.abs(N) > 3.4
              ? ((H += -P.x * 2.4 + I * G * 1.9),
                (O += -P.z * 2.4 + L * G * 1.9))
              : ((H += P.x * 1.2 - I * G * 0.6),
                (O += P.z * 1.2 - L * G * 0.6)),
              (p = uo(r + 6 + Math.max(0, f - 15) * 0.25, 9, E + 4)),
              (p = Math.min(p, r + 3 + Math.sqrt(16 * Math.max(0, f - 3)))));
          } else if (D === 1 || D === 2) {
            let G = (D === 1 ? 1 : -1) * (l >= 3 ? 2.1 : 2.7);
            ((H += I * G),
              (O += L * G),
              (p = uo(r + 3 + Math.max(0, f - 15) * 0.25, 9, E + 4)),
              (p = Math.min(p, r + 2 + Math.sqrt(14 * Math.max(0, f - 8)))));
          } else
            F < 10
              ? ((H += P.x * 18), (O += P.z * 18), (p = uo(r + 7, 12, E + 4)))
              : ((H = o.x + P.x * 3),
                (O = o.z + P.z * 3),
                (p = f > 25 ? uo(r + 4, 12, E) : 5));
          (r < 3 &&
            f < 40 &&
            ((H = o.x),
            (O = o.z),
            (p =
              f < 6.5 ? 0 : Math.min(D === 4 ? 14 : p, 2 + (f - 6.5) * 0.5))),
            D !== 0 &&
              (p = Math.min(p, r + Math.sqrt(16 * Math.max(0, f - 7)))));
          let U = this.onRoad(H, O, t.y);
          ((u = U[0]), (d = U[1]), (s.path = null));
        } else {
          let P, I, L;
          if (z) {
            let B = s.role === 3 && this.predAt(uo(f * 0.5, 60, 200));
            if (B) ((P = B.x), (I = B.z), (L = B.y));
            else {
              let H = 0.6 + (s.idx % 3) * 0.4;
              ((P = o.x + a.x * H), (I = o.z + a.z * H), (L = o.y));
            }
            s.goal = null;
          } else
            ((!s.goal ||
              Math.hypot(s.goal.x - t.x, s.goal.z - t.z) < 18 ||
              this.t > s.goal.t) &&
              (s.goal = this.searchPoint(t, w)),
              (P = s.goal.x),
              (I = s.goal.z),
              (L = s.goal.y));
          let F = s.gx === void 0 || Math.hypot(P - s.gx, I - s.gz) > 25;
          (!s.path || (s.plan -= e) <= 0 || (F && s.plan < 0.9)) &&
            ((s.plan = 1.2 + Math.random() * 0.5),
            (s.path = this.route(t, P, I, L)),
            (s.pathL = null),
            (s.pi = 0),
            (s.gx = P),
            (s.gz = I));
          let N = this.follow(t, P, I);
          ((u = N[0]),
            (d = N[1]),
            (p = z
              ? l <= 1
                ? uo(r + uo((f - 30) * 0.2, -6, T), Math.min(10, E), E)
                : uo(A, 18, E)
              : 14 + l * 2),
            z && s.role === 3 && l > 1 && (p = uo(A + 4, 20, E + 4)),
            (p = Math.min(p, s.ghost && s.d > 25 ? 99 : this.pathLimit(t, l))));
        }
        let C = this.ahead(t, m);
        if (C) {
          let P = -t.fz,
            I = t.fx,
            L = s.passT > 0 ? s.pass : 0;
          for (let F of s.waitT > 1 ? [!1, !0] : [!1])
            for (let N of C.lat > 0 ? [-1, 1] : [1, -1]) {
              if (L) break;
              let B = t.x + t.fx * C.at + P * (C.lat + N * 3.2),
                H = t.z + t.fz * C.at + I * (C.lat + N * 3.2),
                O = this.L.roadAt(B, H, 6, t.y);
              O &&
                (F ? O.dd < 3 && this.standable(B, H, O.y, 4) : O.dd < -1) &&
                !this.traffic.cars.some(
                  (D) =>
                    D !== t &&
                    D !== C.o &&
                    Math.abs(D.x - B) < 4 &&
                    Math.abs(D.z - H) < 4 &&
                    Math.hypot(D.x - B, D.z - H) < 2.6,
                ) &&
                (L = N);
            }
          if (L) {
            ((s.pass = L), (s.passT = Math.max(s.passT || 0, 0.2)));
            let F = uo(1.6 - C.at / 30, 0.3, 1.2) * 3.2 * L;
            ((u += P * F), (d += I * F));
          } else
            !(s.shoveT > 0) &&
              !s.ghost &&
              (p = Math.min(p, C.v + Math.sqrt(16 * Math.max(0, C.at - 7))));
          ((s.waitT =
            C.v < 2 && C.at < 14 && t.v < 3
              ? (s.waitT || 0) + e
              : Math.max(0, (s.waitT || 0) - e * 0.5)),
            s.waitT > 2.5 && ((s.waitT = 0), (s.shoveT = 3)));
        } else s.waitT = 0;
        ((s.shoveT = Math.max(0, (s.shoveT || 0) - e)),
          (s.passT = Math.max(0, (s.passT || 0) - e)));
      }
      s.rev > 0 && ((s.rev -= e), (p = -6));
      let g = Math.atan2(-(u - t.x), -(d - t.z)),
        b = Ftt(g - t.heading),
        x = Math.abs(t.v),
        v = !s.ghost,
        y = Math.min(2.4, 0.25 + x * 0.25, (v ? 11 : 24) / Math.max(x, 1));
      if (((t.heading = Ftt(t.heading + uo(b * 3.5, -y, y) * e)), s.rev <= 0)) {
        let w = Math.abs(b);
        (w > 0.45 &&
          (p = Math.min(p, 7 + 26 * Math.max(0, 1 - (w - 0.45) / 1.2))),
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
      let M = p - t.v;
      ((t.v += uo(
        M,
        -11 * e,
        (v ? (t.v < 20 ? 9 : 6.5) * (1 + 0.1 * (l - 1)) : 20) * e,
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
        this.ground(t, e),
        s.rev <= 0 && p > 3
          ? s.sx === void 0 || Math.hypot(t.x - s.sx, t.z - s.sz) > 1.5
            ? ((s.sx = t.x),
              (s.sz = t.z),
              (s.stuck = 0),
              t.v > 8 && (s.jams = 0))
            : (s.stuck += e) > 1.5 &&
              ((s.stuck = 0),
              (s.sx = void 0),
              (s.rev = 1.1),
              (s.path = null),
              (s.jams = (s.jams || 0) + 1),
              (s.noDirect = 4))
          : ((s.stuck = 0), (s.sx = void 0)));
    }
    pathLimit(t, e) {
      let s = t.cop,
        n = s.path;
      if (!n || n.length < 3 || s.pi >= n.length) return 99;
      let o = s.ghost ? 24 : e >= 5 ? 11 : 10,
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
          x = n[d][1] - n[h][1],
          v = Math.hypot(m, g),
          y = Math.hypot(b, x);
        if (v < 3 || y < 3) continue;
        let M = Math.acos(uo((m * b + g * x) / (v * y), -1, 1));
        if (M < 0.1) continue;
        let S = Math.sqrt((o * (u + p)) / 2 / M);
        l = Math.min(l, Math.sqrt(S * S + 18 * Math.max(0, c - 4)));
      }
      return Math.max(6, l);
    }
    ahead(t, e) {
      let s = Math.min(90, 7 + Math.abs(t.v) * 1.2),
        n = -t.fz,
        o = t.fx,
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
        let f = l * n + c * o;
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
      let o = Ot(n.E, n.s, this._A),
        a = uo(n.v, -(n.w - 1.5), n.w - 1.5);
      return [o.x + o.nx * a, o.z + o.nz * a];
    }
    searchPoint(t, e) {
      let s = this.known,
        n = t.cop,
        o = Math.hypot(s.vx, s.vz),
        a = Math.min(90, o * Math.min(e, 5)),
        r = s.x + (o > 1 ? (s.vx / o) * a : 0),
        l = s.z + (o > 1 ? (s.vz / o) * a : 0),
        c = !n.searched;
      n.searched = (n.searched || 0) + 1;
      for (let h = 0; h < 8; h++) {
        let f = Math.random() * Math.PI * 2,
          u = c && h < 3 ? (n.idx % 3) * 25 : 40 + Math.random() * 110,
          d = this.L.roadAt(r + Math.cos(f) * u, l + Math.sin(f) * u, 40);
        if (!d || !d.E.car) continue;
        let p = Ot(d.E, uo(d.s, d.E.s0, d.E.s1), this._A);
        return { x: p.x, z: p.z, y: p.y, t: this.t + 25 };
      }
      return { x: r, z: l, y: s.y, t: this.t + 10 };
    }
    follow(t, e, s) {
      let n = t.cop,
        o = n.path;
      if (!o || !o.length) return [e, s];
      let a = 6 + Math.abs(t.v) * 0.4;
      for (; n.pi < o.length - 1;) {
        let r = o[n.pi],
          l = o[n.pi + 1],
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
      for (let r = n.pi; r < o.length; r++)
        if (Math.hypot(o[r][0] - t.x, o[r][1] - t.z) > a) return o[r];
      return o[o.length - 1];
    }
    route(t, e, s, n) {
      let o = this.L,
        a = this.roads.D,
        r = o.roadAt(t.x, t.z, 30, t.y),
        l = o.roadAt(e, s, 40, n);
      if (!r || !l) return [[e, s]];
      let c = (w, z, _, R) => {
        let T = Math.max(1, Math.ceil(Math.abs(_ - z) / 14));
        for (let E = 1; E <= T; E++) {
          let A = Ot(w, z + ((_ - z) * E) / T, this._o);
          R.push([A.x, A.z]);
        }
      };
      if (r.E === l.E) {
        let w = [];
        return (c(r.E, r.s, l.s, w), w.push([e, s]), w);
      }
      let h = new Map();
      for (let [w, z] of [
        [l.E.ja, l.E.s0],
        [l.E.jb, l.E.s1],
      ])
        w >= 0 && h.set(w, Math.abs(l.s - z));
      let f = new Map(),
        u = new Map(),
        d = [],
        p = (w) => {
          let z = a.juns[w];
          return Math.hypot(z.x - e, z.z - s);
        },
        m = (w, z, _) => {
          w < 0 ||
            (f.has(w) && f.get(w) <= z) ||
            (f.set(w, z), u.set(w, _), d.push([z + p(w), w]));
        },
        g = (w) => ((w - r.s) * (t.fx * r.dx + t.fz * r.dz) < 0 ? 25 : 0);
      (m(r.E.ja, Math.abs(r.s - r.E.s0) + g(r.E.s0), null),
        m(r.E.jb, Math.abs(r.E.s1 - r.s) + g(r.E.s1), null));
      let b = null,
        x = 1 / 0,
        v = 0;
      for (; d.length && v++ < 3e3;) {
        let w = 0;
        for (let T = 1; T < d.length; T++) d[T][0] < d[w][0] && (w = T);
        let [z, _] = d[w];
        if (((d[w] = d[d.length - 1]), d.pop(), z >= x)) break;
        let R = f.get(_);
        if (!(z - p(_) > R + 1e-6)) {
          h.has(_) && R + h.get(_) < x && ((x = R + h.get(_)), (b = _));
          for (let [T, E] of a.juns[_].legs) {
            if (!T.car || T.inner || T.ja < 0 || T.jb < 0 || T.ja === T.jb)
              continue;
            let A = E === "a" ? T.jb : T.ja,
              C = T.L * (T.oneway && E === "b" ? 1.3 : 1) + 4;
            m(A, R + C, [_, T, E]);
          }
        }
      }
      if (b === null) return [[e, s]];
      let y = [];
      for (let w = b; u.get(w); w = u.get(w)[0]) y.unshift(u.get(w));
      let M = [],
        S = y.length ? y[0][0] : b;
      c(r.E, r.s, S === r.E.ja ? r.E.s0 : r.E.s1, M);
      for (let [, w, z] of y)
        z === "a" ? c(w, w.s0, w.s1, M) : c(w, w.s1, w.s0, M);
      return (
        c(l.E, b === l.E.ja ? l.E.s0 : l.E.s1, l.s, M),
        M.push([e, s]),
        M
      );
    }
    ground(t, e = 1) {
      let s = this.L,
        n = t.y,
        o = (v, y) => {
          let M = s.driveHeight(v, y, null, n - 0.7);
          return Number.isFinite(M) ? M : n;
        },
        a = -Math.sin(t.heading),
        r = -Math.cos(t.heading),
        l = -Math.cos(t.heading),
        c = Math.sin(t.heading),
        h = t.V.L * 0.29,
        f = t.V.bw * 0.42,
        u = (v, y) =>
          o(t.x + a * h * v + l * f * y, t.z + r * h * v + c * f * y),
        d = u(1, 1),
        p = u(1, -1),
        m = u(-1, 1),
        g = u(-1, -1),
        b = (d + p + m + g) / 4,
        x = o(t.x, t.z);
      ((t.y = b + Math.max(0, x - b - 0.2)),
        (t.pitch = Math.atan2((d + p - m - g) / 2, 2 * h)),
        (t.roll = Math.atan2((d + m - p - g) / 2, 2 * f)));
    }
    collide(t) {
      let e = this.world,
        s = this.traffic,
        n = t.cop,
        o = t.V.bw / 2,
        a = t.V.L / 2,
        r = { x: Math.cos(t.heading), z: -Math.sin(t.heading) },
        l = { x: Math.sin(t.heading), z: Math.cos(t.heading) };
      for (let c = 0; c < 2; c++) {
        let h = null;
        for (let g of e.near(t.x, t.z, a + 1)) {
          if (
            g.dead ||
            g.traffic ||
            (g.y1 !== void 0 && (t.y > g.y1 + 0.3 || t.y + 1.4 < g.y0))
          )
            continue;
          let b = e.test(g, t.x, t.z, r, l, o, a);
          b && (!h || b.d > h.d) && ((h = b), (b.c = g));
        }
        for (let g of s.colliders) {
          if (
            g.traffic === t ||
            (n.ghost && g.traffic && !g.traffic.cop && n.d > 25) ||
            Math.abs(g.x - t.x) > 7 ||
            Math.abs(g.z - t.z) > 7 ||
            (g.y1 !== void 0 && (t.y > g.y1 + 0.3 || t.y + 1.4 < g.y0))
          )
            continue;
          let b = e.test(g, t.x, t.z, r, l, o, a);
          b && (!h || b.d > h.d) && ((h = b), (b.c = g));
        }
        if (!h) return;
        let f = h.n,
          u = h.c,
          d = u.traffic,
          p = t.fx * t.v + n.kx,
          m = t.fz * t.v + n.kz;
        if (d && d.cop && !d.wreck) {
          ((t.x += f.x * h.d * 0.5), (t.z += f.z * h.d * 0.5));
          continue;
        }
        if (d && !d.line && !d.net) {
          ((t.x += f.x * h.d * 0.6), (t.z += f.z * h.d * 0.6));
          let g = e.trafficView(d),
            b = (p - g.vx) * f.x + (m - g.vz) * f.z;
          if (b < 0) {
            let x = g.m,
              v = -b * ((Tp * x) / (Tp + x)) * 1.15;
            (s.shove(d, v * f.x, v * f.z, h.px, h.pz),
              (n.kx += ((f.x * v) / Tp) * 0.8),
              (n.kz += ((f.z * v) / Tp) * 0.8),
              (t.v -= Math.max(0, -(t.fx * f.x + t.fz * f.z)) * (v / Tp)));
          }
        } else if (
          ((t.x += f.x * (h.d + 0.002)),
          (t.z += f.z * (h.d + 0.002)),
          p * f.x + m * f.z < 0)
        ) {
          let b = -(t.fx * f.x + t.fz * f.z) * Math.sign(t.v || 1);
          t.v *=
            1 -
            Math.min(0.9, Math.max(0, b)) * (n.ghost && n.d > 25 ? 0.25 : 0.85);
          let x = n.kx * f.x + n.kz * f.z;
          x < 0 && ((n.kx -= f.x * x), (n.kz -= f.z * x));
        }
      }
    }
    predict() {
      let t = this.v,
        e = t.pos,
        s = this.L,
        n = this.roads.D,
        o = {},
        a = Math.hypot(t.vel.x, t.vel.z),
        r = t.forward(),
        l = a > 3 ? t.vel.x / a : r.x,
        c = a > 3 ? t.vel.z / a : r.z,
        h = s.roadAt(e.x, e.z, 20, e.y);
      if (!h || !h.E.car || h.E.inner || !n) return null;
      let f = h.E,
        u = h.dx * l + h.dz * c >= 0 ? 1 : -1,
        d = uo(h.s, f.s0, f.s1),
        p = 0,
        m = e.x,
        g = e.z,
        b = l,
        x = c,
        v = [],
        y = [];
      for (let M = 0; M < 10 && p < 360; M++) {
        let S = u > 0 ? f.s1 : f.s0,
          w = Math.max(1, Math.ceil(Math.abs(S - d) / 8));
        for (let E = 1; E <= w; E++) {
          let A = d + ((S - d) * E) / w;
          (Ot(f, A, o),
            (p += Math.hypot(o.x - m, o.z - g)),
            (m = o.x),
            (g = o.z),
            v.push({
              E: f,
              s: A,
              dir: u,
              d: p,
              x: o.x,
              z: o.z,
              y: o.y,
              dx: o.dx * u,
              dz: o.dz * u,
              w: o.w,
            }),
            (b = o.dx * u),
            (x = o.dz * u));
        }
        let z = u > 0 ? f.jb : f.ja,
          _ = z >= 0 ? n.juns[z] : null;
        if (!_) break;
        let R = null,
          T = -0.3;
        for (let [E, A] of _.legs) {
          if (E === f || !E.car || E.inner || E.ja === E.jb || E.s1 - E.s0 < 4)
            continue;
          let C = A === "a" ? 1 : -1,
            P = C > 0 ? E.s0 : E.s1;
          Ot(E, P + C * Math.min(6, (E.s1 - E.s0) / 2), o);
          let I = o.x - _.x,
            L = o.z - _.z,
            F = Math.hypot(I, L) || 1,
            N = (I * b + L * x) / F - (E.oneway && C < 0 ? 0.6 : 0);
          N > T && ((T = N), (R = [E, C, P]));
        }
        if ((y.push({ J: _, d: p, inE: f, outE: R && R[0] }), !R)) break;
        [f, u, d] = R;
      }
      return { pts: v, juns: y, t: this.t, x: e.x, z: e.z };
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
        o = (u) => Math.hypot(u.x - s.x, u.z - s.z);
      if (e <= 1) {
        for (let u of t) u.cop.role = 4;
        return;
      }
      let a = t.slice().sort((u, d) => o(u) - o(d)),
        r = (u) => (u.x - s.x) * n.x + (u.z - s.z) * n.z,
        l = e >= 3 ? a.filter((u) => r(u) > 25 && o(u) > 30).slice(0, 2) : [];
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
          ([o]) =>
            o !== s.inE &&
            o !== s.outE &&
            o.car &&
            !o.inner &&
            o.s1 - o.s0 > 40,
        );
        for (let [o, a] of n.sort(() => Math.random() - 0.5)) {
          let r = a === "a" ? 1 : -1,
            l =
              r > 0
                ? o.s0 + 30 + Math.random() * Math.min(40, o.s1 - o.s0 - 40)
                : o.s1 - 30 - Math.random() * Math.min(40, o.s1 - o.s0 - 40),
            c = Ot(o, l, this._o);
          if (
            Math.abs(c.y - e.y) > 20 ||
            this.traffic.occupied3(c.x, c.y, c.z, 7) ||
            this.inView(c.x, c.y, c.z) ||
            this.los(e.x, e.z, c.x, c.z)
          )
            continue;
          let h = this.newUnit({ E: o, dir: -r, s: l, k: 0 });
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
      let o =
          e >= 3 &&
          this.blockT <= 0 &&
          !this.blocks.length &&
          this.units.length <= Yz - 2,
        a = e >= 4 && this.stripT <= 0 && this.strips.length < 2;
      (!o && !a) ||
        ((this.pred = this.predict()),
        this.pred &&
          (o &&
            ((this.blockT = e >= 5 ? 22 : e >= 4 ? 35 : 50),
            this.roadblock(e) || (this.blockT = 3)),
          a &&
            ((this.stripT = e >= 5 ? 16 : 22),
            this.spikes(e) || (this.stripT = 3))));
    }
    spot(t, e, s) {
      let n = this.v.pos;
      for (let o of t) {
        let a = this.predAt(o);
        if (!a || a.d < o - 10) continue;
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
      let o = this.L.roadAt(t, e, 6, s);
      if (!o || o.dd > n || Math.abs(o.y - s) > 1.5) return !1;
      let a = this.world,
        r = a.grid.get(yp(Math.floor(t / fo), Math.floor(e / fo)));
      if (r) {
        for (let l of r)
          if (
            l.t === "poly" &&
            t > l.bb[0] &&
            t < l.bb[2] &&
            e > l.bb[1] &&
            e < l.bb[3] &&
            Ntt(l.pts, t, e)
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
        o = s.dx,
        a = s.dz,
        r = -a,
        l = o,
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
      let p = uo(Math.round((u - f - (h === 0 ? c : 0)) / 4.6), 2, 3),
        m = [];
      if (h === 0) {
        let x = (u - f - c) / 2;
        (m.push(f + x / 2, u - x / 2), p === 3 && m.splice(1, 0, null));
      } else for (let x = 0; x < p; x++) m.push(f + ((u - f) * (x + 0.5)) / p);
      let g = [];
      for (let x = e.cars.length - 1; x >= 0; x--) {
        let v = e.cars[x];
        if (
          !(v.cop || v.net || v.line || v.route) &&
          Math.hypot(v.x - s.x, v.z - s.z) < n + 8 &&
          Math.abs(v.y - s.y) < 3
        ) {
          if (this.inView(v.x, v.y, v.z)) return !1;
          e.cars.splice(x, 1);
        }
      }
      if (
        (m.forEach((x, v) => {
          if (x === null || this.units.length >= Yz) return;
          let y = (v % 2 ? 1 : -1) * 1.1,
            M = s.x + r * x + o * y,
            S = s.z + l * x + a * y;
          if (!this.standable(M, S, s.y)) return;
          let w = this.newUnit({ E: s.E, dir: s.dir, s: s.s, k: 0 });
          if (!w) return;
          let z = Math.atan2(-o, -a) + (Math.PI / 2 - 0.26) * (v % 2 ? 1 : -1);
          Object.assign(w, {
            x: M,
            z: S,
            y: s.y,
            heading: z,
            fx: -Math.sin(z),
            fz: -Math.cos(z),
            v: 0,
          });
          let _ = w.cop;
          ((_.free = !0),
            (_.mode = "block"),
            (w.cv = null),
            (w.nx = null),
            this.ground(w),
            g.push(w));
        }),
        g.length < 2)
      ) {
        for (let x of g) {
          let v = e.cars.indexOf(x);
          (v >= 0 && e.cars.splice(v, 1),
            this.units.splice(this.units.indexOf(x), 1));
        }
        return !1;
      }
      let b = {
        x: s.x,
        z: s.z,
        y: s.y,
        fx: o,
        fz: a,
        units: g,
        t: this.t,
        gap: d,
      };
      return (
        (b.mesh = this.coneMesh(
          s,
          m.filter((x) => x !== null),
          d,
          c,
          n,
        )),
        this.blocks.push(b),
        (this.stats.blocks = (this.stats.blocks || 0) + 1),
        this.say("Roadblock ahead"),
        t >= 5 && this.spikes(t, { q: s, gc: d, w: n }),
        !0
      );
    }
    blocksUpdate() {
      let t = this.v.pos,
        e = this.traffic,
        s = this.v.vel,
        n = Math.hypot(s.x, s.z);
      for (let o = this.blocks.length - 1; o >= 0; o--) {
        let a = this.blocks[o],
          r = (t.x - a.x) * a.fx + (t.z - a.z) * a.fz,
          l = Math.hypot(t.x - a.x, t.z - a.z),
          c = n > 5 && ((a.x - t.x) * s.x + (a.z - t.z) * s.z) / n < -40;
        if (
          ((a.units = a.units.filter(
            (h) => this.units.includes(h) && h.cop.mode === "block",
          )),
          (this.n & 15) === 0)
        )
          for (let h = e.cars.length - 1; h >= 0; h--) {
            let f = e.cars[h];
            f.cop ||
              f.net ||
              f.line ||
              f.route ||
              f.v > 1 ||
              (Math.hypot(f.x - a.x, f.z - a.z) < 45 &&
                Math.abs(f.y - a.y) < 4 &&
                !this.inView(f.x, f.y, f.z) &&
                e.cars.splice(h, 1));
          }
        if (
          r > 30 ||
          c ||
          l > 450 ||
          this.t - a.t > 70 ||
          !this.pursuit ||
          !a.units.length
        ) {
          let h = Itt[Math.max(1, this.level)];
          for (let f of a.units)
            this.pursuit &&
            this.units.filter((u) => u.cop.mode === "chase").length < h
              ? this.toChase(f)
              : (f.cop.mode = "idle");
          (a.mesh?.removeFromParent(), this.blocks.splice(o, 1));
        }
      }
    }
    spikes(t, e = null) {
      let s, n, o;
      if (e) {
        let p = e.q;
        if (((s = this.predAt(Math.max(0, p.d - 14))), !s || s.E !== p.E))
          return !1;
        let m = e.gc ?? (Math.random() - 0.5) * e.w;
        ((n = m - 2.6), (o = m + 2.6));
      } else {
        if (((s = this.spot([140, 165, 120, 190, 210], 2.5, 12)), !s))
          return !1;
        ((n = -s.u + 0.25), (o = s.u - 0.25));
        let p = Math.min(3.5, (o - n) * 0.4);
        Math.random() < 0.7 && (Math.random() < 0.5 ? (n += p) : (o -= p));
      }
      if (
        ((n = Math.max(n, -s.w + 0.2)), (o = Math.min(o, s.w - 0.2)), o - n < 2)
      )
        return !1;
      let a = -s.dz,
        r = s.dx,
        l = (n + o) / 2,
        c = o - n,
        h = s.x + a * l,
        f = s.z + r * l,
        u = (p, m) => {
          let g = this.L.driveHeight(p, m, null, s.y);
          return Number.isFinite(g) ? g : s.y;
        },
        d = {
          x: h,
          z: f,
          y: u(h, f),
          ax: h + a * (n - l),
          az: f + r * (n - l),
          bx: h + a * (o - l),
          bz: f + r * (o - l),
          nx: a,
          nz: r,
          fx: s.dx,
          fz: s.dz,
          len: c,
          t: this.t,
          hit: !1,
        };
      if (
        ((d.mesh = this.stripMesh(d, u)),
        this.strips.push(d),
        (this.stats.strips = (this.stats.strips || 0) + 1),
        e)
      )
        this.say("Roadblock \xB7 spikes in the gap");
      else {
        let p =
          o - n > 2 * s.u - 1
            ? ""
            : (n + o) / 2 > 0
              ? " \xB7 gap on the left"
              : " \xB7 gap on the right";
        (this.say("Spike strip ahead" + p),
          this.toast?.(
            "Spike strip ahead",
            (p ? p.slice(3) : "Across the road") +
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
          i._sm ||
          (i._sm = (() => {
            let b = new Ee({ color: 3816770, metalness: 0.7, roughness: 0.45 }),
              x = new Ee({ color: 14212580, metalness: 0.9, roughness: 0.25 }),
              v = new Ee({
                color: 16777215,
                metalness: 0.1,
                roughness: 0.5,
                emissive: 2760704,
              });
            return {
              steel: b,
              spike: x,
              haz: v,
              bar: new qs(1, 0.045, 0.34),
              cone: new ur(0.022, 0.085, 4),
              blk: new qs(0.16, 0.06, 0.38),
            };
          })()),
        n = new ke();
      n.name = "spikeStrip";
      let o = new _e(s.bar, s.steel);
      ((o.scale.x = t.len),
        (o.position.y = 0.0225),
        (o.receiveShadow = !0),
        (o.castShadow = !0),
        n.add(o));
      let a = Math.floor(t.len / 0.14),
        r = new zn(s.cone, s.spike, a * 2),
        l = new ye();
      for (let b = 0; b < a; b++)
        for (let x of [-0.09, 0.09])
          (l.makeTranslation(-t.len / 2 + ((b + 0.5) * t.len) / a, 0.085, x),
            r.setMatrixAt(b * 2 + (x > 0 ? 1 : 0), l));
      ((r.instanceMatrix.needsUpdate = !0), (r.castShadow = !0), n.add(r));
      let c = Math.max(2, Math.floor(t.len / 0.45) + 1),
        h = new zn(s.blk, s.haz, c),
        f = new $t();
      for (let b = 0; b < c; b++)
        (l.makeTranslation(
          -t.len / 2 + 0.08 + (b * (t.len - 0.16)) / (c - 1),
          0.03,
          0,
        ),
          h.setMatrixAt(b, l),
          h.setColorAt(b, f.set(b % 2 ? 1118481 : 16761856)));
      ((h.instanceMatrix.needsUpdate = !0),
        h.instanceColor && (h.instanceColor.needsUpdate = !0),
        n.add(h));
      let u = e(t.ax, t.az),
        d = e(t.bx, t.bz),
        p = e(t.x + t.fx * 0.5, t.z + t.fz * 0.5),
        m = e(t.x - t.fx * 0.5, t.z - t.fz * 0.5),
        g = Math.atan2(-t.nz, t.nx);
      return (
        n.position.set(t.x, (u + d) / 2 + 0.005, t.z),
        n.rotation.set(Math.atan(p - m), g, Math.atan2(d - u, t.len), "YZX"),
        n.traverse((b) => {
          b.frustumCulled = !1;
        }),
        this.scene.add(n),
        n
      );
    }
    heliUpdate(t) {
      let e = this.pursuit && this.level >= 4 && !(this.hold > 0);
      if (!this.heli) {
        if (!e || !this.scene) return;
        this.heli = new sv({
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
    coneMesh(t, e, s, n, o) {
      if (!this.scene) return null;
      let a =
          i._cm ||
          (i._cm = {
            geo: new ur(0.17, 0.72, 10),
            band: new ks(0.085, 0.115, 0.12, 10),
            mat: new Ee({
              color: 16730634,
              roughness: 0.55,
              emissive: 3804672,
            }),
            white: new Ee({
              color: 16777215,
              roughness: 0.35,
              emissive: 3158064,
            }),
          }),
        r = [];
      for (let p = -o + 0.5; p <= o - 0.5; p += 1.6)
        (s === null || Math.abs(p - s) > n / 2 + 0.3) && r.push(p);
      let l = new ke();
      l.name = "roadblockCones";
      let c = new zn(a.geo, a.mat, r.length),
        h = new zn(a.band, a.white, r.length),
        f = new ye(),
        u = -t.dz,
        d = t.dx;
      (r.forEach((p, m) => {
        let g = t.x + u * p - t.dx * 8,
          b = t.z + d * p - t.dz * 8,
          x = this.L.driveHeight(g, b, null, t.y),
          v = Number.isFinite(x) ? x : t.y;
        (c.setMatrixAt(m, f.makeTranslation(g, v + 0.36, b)),
          h.setMatrixAt(m, f.makeTranslation(g, v + 0.42, b)));
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
        o = n.a ?? 1.4,
        a = n.b ?? 1.4,
        r = (n.track ?? 1.6) / 2,
        l = e.forward(),
        c = -Math.cos(e.psi),
        h = Math.sin(e.psi),
        f = [
          [o, r],
          [o, -r],
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
        if (!(!u || g > 12 || Math.abs((s.y ?? p.y) - p.y) > 2.5))
          for (let b = 0; b < 4; b++)
            !this.tyres.w[b] &&
              (Iyt(u[b], f[b], p) || Fyt(f[b], p) < 0.2) &&
              this.pop(b, p);
      }
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
          (s.armour = this.v.S === Px),
          s.armour
            ? (this.toast?.("Spike strip", "Armoured tyres: they hold"),
              this.say("Tyres holding"))
            : (this.toast?.(
                "Tyres blown",
                "Going flat \xB7 lose them before you stop",
              ),
              this.say("Tyres blown"))));
      let o = this.v.pos;
      this.world.hits.push({
        x: o.x,
        z: o.z,
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
        o = e.n / 4;
      e.def = Math.min(
        e.armour ? 0.12 : 1,
        (e.def || 0) + t * (0.08 + 0.035 * e.n),
      );
      let a = e.def;
      this.gripK = 1 - 0.78 * a * Math.sqrt(o);
      let r = 30 * (1 - a) + 1.5;
      if (n > r) {
        let c = r + (n - r) * Math.exp(-t * 1.6);
        ((s.vel.x *= c / n), (s.vel.z *= c / n));
      }
      if (a > 0.7) {
        let c = Math.exp((-t * 3 * (a - 0.7)) / 0.3);
        ((s.vel.x *= c), (s.vel.z *= c));
      }
      let l = uo(n / 12, 0, 1);
      if (
        (s.r !== void 0 &&
          (s.r +=
            (Math.sin(this.t * 12.5) * 0.7 + Math.sin(this.t * 7.1) * 0.4) *
            (3 + 9 * a) *
            o *
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
      let o = this.world,
        a = Math.hypot(s - t, n - e),
        r = Math.ceil(a / 6);
      for (let l = 1; l < r; l++) {
        let c = t + ((s - t) * l) / r,
          h = e + ((n - e) * l) / r,
          f = o.grid.get(yp(Math.floor(c / fo), Math.floor(h / fo)));
        if (f) {
          for (let u of f)
            if (
              u.t === "poly" &&
              c > u.bb[0] &&
              c < u.bb[2] &&
              h > u.bb[1] &&
              h < u.bb[3] &&
              Ntt(u.pts, c, h)
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
      let o = this.level;
      (n("lvl", o, (f) =>
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
          Math.round((this.pursuit ? this.heat - o : this.heat) * 100),
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
          a ? Math.round(uo(this.cool / this.evadeT(), 0, 1) * 100) : 0,
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
