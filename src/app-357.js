// app 357 — math
// Lines 173906-176232 of readable/app.pretty.js (statement-aligned).
var ji = (i, t, e) => {
    let s = an((e - i) / (t - i), 0, 1);
    return s * s * (3 - 2 * s);
  },
  uyt = [
    [1e3, "eng_idle"],
    [2e3, "eng_2000"],
    [3500, "eng_3500"],
    [5500, "eng_5500"],
    [8e3, "eng_8000"],
  ],
  wl = {
    ferrari: { loops: uyt, coast: "eng_coast" },
    corvette: {
      loops: [
        [1e3, "zr_idle"],
        [2e3, "zr_2000"],
        [3500, "zr_3500"],
        [5500, "zr_5500"],
        [7500, "zr_7500"],
      ],
      coast: "zr_coast",
    },
    flat6: {
      loops: [
        [1100, "f6_idle"],
        [4e3, "f6_3500"],
        [5600, "f6_5000"],
      ],
      coast: "f6_coast",
    },
    v12: {
      loops: [
        [1e3, "v12_idle"],
        [1700, "v12_mid"],
        [2e3, "v12_high"],
      ],
      coast: "v12_coast",
    },
    dsl: {
      loops: [
        [750, "dsl_idle"],
        [1500, "dsl_mid"],
        [3800, "dsl_high"],
      ],
      coast: "dsl_coast",
    },
    sml: {
      loops: [
        [1e3, "sml_idle"],
        [2e3, "sml_mid"],
        [2900, "sml_high"],
      ],
      coast: "sml_coast",
    },
  },
  fM = (i) => [...i.loops.map((t) => t[1]), i.coast],
  dyt = new Set(Object.values(wl).flatMap(fM)),
  Xm = {
    ferrari: { pops: !0, sub: 1.1, wind: 1 },
    corvette: { pops: !0, sub: 1.2, wind: 0.45 },
    flat6: { pops: !0, sub: 0.9, wind: 0.5 },
    v12: { pops: !0, sub: 1.1, wind: 0.5 },
    dsl: { pops: !1, sub: 1.3, wind: 0.4 },
    sml: { pops: !1, sub: 0.5, wind: 0.6 },
    ev: { pops: !1, sub: 0, wind: 0 },
  },
  pyt = 22,
  BF = 1.25,
  myt = 0.55,
  mf = {
    waymo: {
      mot: [
        [15, "ev_mot_lo"],
        [50, "ev_mot_mid"],
        [100, "ev_mot_hi"],
      ],
      tyre: [
        [20, "ev_tyre_lo"],
        [50, "ev_tyre_mid"],
        [110, "ev_tyre_hi"],
      ],
      avas: "ev_avas",
      wind: "ev_wind2",
      regen: "ev_regen2",
      bump: "ev_bump",
      mix: { mot: 1, tyre: 1, wind: 1, avas: 1, regen: 1 },
    },
    cybercab: {
      mot: [
        [15, "cc_mot_lo"],
        [50, "cc_mot_mid"],
        [100, "cc_mot_hi"],
      ],
      tyre: [
        [20, "cc_tyre_lo"],
        [50, "cc_tyre_mid"],
        [110, "cc_tyre_hi"],
      ],
      avas: "cc_avas",
      wind: "cc_wind",
      regen: "cc_regen",
      bump: "cc_bump",
      mix: { mot: 1.2, tyre: 0.9, wind: 0.85, avas: 0.9, regen: 1.1 },
    },
    cybertruck: {
      mot: [
        [15, "ct_mot_lo"],
        [50, "ct_mot_mid"],
        [100, "ct_mot_hi"],
      ],
      tyre: [
        [20, "ct_tyre_lo"],
        [50, "ct_tyre_mid"],
        [110, "ct_tyre_hi"],
      ],
      avas: "ct_avas",
      wind: "ct_wind",
      regen: "ct_regen",
      bump: "ct_bump",
      mix: { mot: 0.75, tyre: 1, wind: 0.9, avas: 0.9, regen: 1 },
    },
  },
  gyt = !1,
  tv = (i) => [
    ...i.mot.map((t) => t[1]),
    ...i.tyre.map((t) => t[1]),
    i.avas,
    i.wind,
    i.regen,
    i.bump,
  ],
  OF = {
    ferrari: { impact: "impact", scrape: "scrape", skid: "skid", ir: "ir_" },
    ev: {
      impact: "ev_crash",
      scrape: "ev_scrape",
      skid: "ev_squeal",
      ir: "irr_",
    },
  },
  HF = new Set(Object.values(mf).flatMap(tv)),
  Ptt = {
    body: { rate: 1.13, lp: 2600, dur: 0.42 },
    heavy: { rate: 0.82, lp: 6500, dur: 1.4 },
    prop: { rate: 1.3, lp: 3600, dur: 0.2 },
    wood: { rate: 0.72, lp: 1300, dur: 0.32 },
    ground: { rate: 0.9, lp: 900, dur: 0.5 },
    scrape: { rate: 1, lp: 4800, dur: 0.3 },
  },
  $z = class {
    constructor(
      t = "assets/",
      {
        mobile: e = !1,
        ctx: s = null,
        set: n = "ferrari",
        ev: o = n === "ev",
        vehicle: a = "waymo",
        virt: r = !1,
      } = {},
    ) {
      this.virt = !!r && !!wl[a];
      let l = (this.ctx =
        s || new (window.AudioContext || window.webkitAudioContext)());
      ((this.base = t + "audio/"),
        (this.mobile = e),
        (this.offline = !!s),
        (this.ev = o),
        (this.set = Xm[o ? "ev" : wl[a] ? a : n] || Xm.ferrari),
        (this.engSet = wl[a] || wl.ferrari),
        (this.engTab = this.engSet.loops),
        (this.evSet = mf[a] || mf.waymo),
        (this.hits = OF[o ? "ev" : "ferrari"]),
        (this.master = l.createGain()),
        (this.master.gain.value = 0));
      let c = l.createDynamicsCompressor();
      ((c.threshold.value = -20),
        (c.knee.value = 12),
        (c.ratio.value = 2.5),
        (c.attack.value = 0.012),
        (c.release.value = 0.25));
      let h = l.createDynamicsCompressor();
      ((h.threshold.value = -9),
        (h.knee.value = 0),
        (h.ratio.value = 20),
        (h.attack.value = 0.001),
        (h.release.value = 0.1));
      let f = l.createWaveShaper(),
        u = new Float32Array(2048);
      for (let S = 0; S < 2048; S++) {
        let w = S / 1023.5 - 1,
          z = Math.abs(w);
        u[S] =
          z < 0.8 ? w : Math.sign(w) * (0.8 + 0.2 * Math.tanh((z - 0.8) / 0.2));
      }
      ((f.curve = u),
        this.master.connect(c).connect(h).connect(f).connect(l.destination),
        (this.limiter = f),
        (this.preclip = h),
        (this.glue = c),
        (this.game = l.createGain()),
        this.game.connect(this.master));
      let d = (S, w = this.game) => {
        let z = l.createGain();
        return ((z.gain.value = S), z.connect(w), z);
      };
      ((this.sfx = d(Zx.sfx)),
        (this.world = d(Zx.world)),
        (this.amb = d(Zx.amb)),
        (this.ui = d(Zx.ui, this.master)),
        (this.duck = l.createGain()),
        (this.rpmDuck = l.createGain()),
        this.duck.connect(this.rpmDuck).connect(this.game),
        (this.musLP = l.createBiquadFilter()),
        (this.musLP.type = "lowpass"),
        (this.musLP.frequency.value = 2e4),
        (this.musLP.Q.value = 0.5),
        (this.swell = l.createGain()),
        (this.mus = l.createGain()),
        (this.heliDuck = l.createGain()),
        this.mus
          .connect(this.musLP)
          .connect(this.swell)
          .connect(this.heliDuck)
          .connect(this.duck));
      let p = (S, w, z = 0.7, _ = 0) => {
        let R = l.createBiquadFilter();
        return (
          (R.type = S),
          (R.frequency.value = w),
          (R.Q.value = z),
          (R.gain.value = _),
          R
        );
      };
      ((this.eng = l.createGain()),
        (this.eng.gain.value = 0),
        (this.engDuck = l.createGain()),
        (this.engLP = d(Zx.engine)),
        this.eng.connect(this.engDuck).connect(this.engLP),
        (this.exhaust = l.createGain()),
        (this.exhaust.gain.value = 1.3),
        (this.exhaustLP = p("lowpass", 2800)),
        (this.shiftG = l.createGain()),
        (this.exPan = l.createStereoPanner
          ? l.createStereoPanner()
          : l.createGain()),
        this.exhaust
          .connect(p("lowshelf", 170, 0.7, 5))
          .connect(p("peaking", 1800, 0.65, 1.5))
          .connect(this.exhaustLP)
          .connect(this.shiftG)
          .connect(this.exPan)
          .connect(this.eng));
      let m = l.createDelay(0.1);
      m.delayTime.value = 0.023;
      let g = l.createGain();
      g.gain.value = 0.15;
      let b = l.createStereoPanner ? l.createStereoPanner() : l.createGain();
      (b.pan && (b.pan.value = -0.7),
        this.shiftG.connect(m).connect(g).connect(b).connect(this.eng));
      let x = l.createDelay(0.1);
      x.delayTime.value = 0.029;
      let v = l.createGain();
      v.gain.value = 0.13;
      let y = l.createStereoPanner ? l.createStereoPanner() : l.createGain();
      (y.pan && (y.pan.value = 0.7),
        this.shiftG.connect(x).connect(v).connect(y).connect(this.eng),
        (this.subLP = p("lowpass", 170, 0.6)),
        (this.subG = l.createGain()),
        (this.subG.gain.value = this.set.sub || 0),
        this.subLP.connect(this.subG).connect(this.shiftG),
        (this.popBus = l.createGain()),
        (this.popLP = p("lowpass", 9e3)),
        this.popBus.connect(this.popLP).connect(this.exPan),
        (this.intakeBP = p("bandpass", 2e3, 0.65)),
        (this.intake = l.createGain()),
        (this.intake.gain.value = 0),
        this.exhaust
          .connect(this.intakeBP)
          .connect(this.intake)
          .connect(this.eng),
        (this.roadLP = p("lowpass", 6500)),
        this.roadLP.connect(p("lowshelf", 120, 0.7, 4)).connect(this.sfx),
        (this.windLP = p("lowpass", 2500)),
        this.windLP.connect(this.sfx),
        (this.revSend = {}),
        (this.revRet = d(Zx.rev)));
      for (let S of ["street", "tunnel"]) {
        let w = l.createGain();
        ((w.gain.value = 0), (this.revSend[S] = w));
      }
      for (let [S, w] of [
        [this.engLP, 1],
        [this.sfx, 0.7],
        [this.world, 0.5],
      ]) {
        let z = l.createGain();
        ((z.gain.value = w), S.connect(z));
        for (let _ in this.revSend) z.connect(this.revSend[_]);
      }
      ((this.hitBus = l.createGain()),
        (this.hitBus.gain.value = 1),
        this.hitBus.connect(this.sfx),
        (this.buf = {}),
        (this.man = null),
        (this.layers = []),
        (this.loops = {}),
        (this.voices = 0),
        (this.hitVoices = 0),
        (this.spatial = new Map()),
        (this.counts = {}),
        (this.muted = !1),
        (this.started = !1),
        (this.driving = !1),
        (this.paused = !1));
      let M = ev();
      if (
        ((this.musicOn = M.on),
        (this.musicVol = M.vol),
        (this.station = M.station),
        (this.mus.gain.value = this.musicOn ? this.musicVol * NF : 0),
        (this.playlist = []),
        (this.track = null),
        (this.onTrack = null),
        (this.el = null),
        (this.exV = 1),
        (this.exP = 1),
        (this.exPop = 1),
        (this.exSub = 1),
        (this.st = {
          rpm: 1e3,
          limS: 0,
          tun: 0,
          encl: 0,
          pace: 60,
          burble: 0,
          popT: 0,
          gear: 1,
          shiftT: 0,
          thr: 0,
          thrS: 0,
          armed: !1,
          lastOvr: -10,
          land: 0,
          lastHit: 0,
          scrapeT: 0,
          cool: {},
          jets: new WeakMap(),
          jetList: [],
          hornT: 4,
          envT: 0,
          water: 0,
          horned: new WeakMap(),
          gullT: 8,
          fogT: 40,
          last: {},
        }),
        (this.events = {
          upshift: 0,
          downshift: 0,
          overrun: 0,
          impact: 0,
          scrape: 0,
          pops: 0,
          crack: 0,
        }),
        (this.kinds = {}),
        (this.ready = fetch(this.base + "audio.json")
          .then((S) => S.json())
          .then((S) => ((this.man = S), this.load()))
          .catch((S) => console.warn("audio", S))),
        !this.offline && typeof document < "u")
      ) {
        (document.addEventListener(
          "click",
          (w) => {
            this.started &&
              w.target?.closest?.(
                "button, [data-assist], [data-music], [data-z], [data-q], [role=button], .btn, #go",
              ) &&
              (this.paused && (l.resume().catch(() => {}), this.idle()),
              this.ui1(
                this.pickName("ui_click"),
                0.8,
                0.97 + Math.random() * 0.06,
              ));
          },
          !0,
        ),
          document.addEventListener("visibilitychange", () => {
            if (this.started)
              try {
                document.hidden ? l.suspend() : this.paused || l.resume();
              } catch {}
          }),
          (this.pool = [0, 1].map(() => {
            let w = new Audio();
            return ((w.preload = "none"), (w.crossOrigin = "anonymous"), w);
          })),
          (this.poolI = 0));
        let S = () => {
          this.primeMedia();
          for (let w of ["touchend", "click", "keydown"])
            removeEventListener(w, S, !0);
        };
        for (let w of ["touchend", "click", "keydown"])
          addEventListener(w, S, !0);
      }
    }
    media(t) {
      return (
        t._g ||
          ((t._g = this.ctx.createGain()),
          (t._g.gain.value = 0),
          this.ctx.createMediaElementSource(t).connect(t._g).connect(this.mus)),
        t._g
      );
    }
    primeMedia() {
      if (this.primed || !this.pool) return;
      this.primed = !0;
      try {
        this.ctx.resume();
      } catch {}
      let t = this.man?.music?.title?.file || "title.mp3";
      for (let e of this.pool) {
        (this.media(e), e.src || (e.src = this.base + t));
        let s = e.play();
        s &&
          s
            .then(() => {
              e !== this.el && e.pause();
            })
            .catch(() => {});
      }
    }
    async load() {
      let t = this.man.sounds,
        e = new Set(tv(this.evSet)),
        s = (o) => o.replace(/_\d+$/, "");
      ((this.lazy = new Set([
        "rain",
        "tunnel_amb",
        "tyre_squeal",
        "tyre_scrub",
        "p39_bed",
        "p39_lions",
        ...(Object.keys(t).filter((o) =>
          this.ev
            ? /^(eng_|zr_|f6_|crk|crack|backfire|airflow|road$)/.test(o) ||
              (HF.has(s(o)) && !e.has(s(o))) ||
              /^(skid|impact|scrape|ir_street|ir_tunnel)$/.test(o)
            : /^(ev_|cc_|ct_|irr_)/.test(o) ||
              (dyt.has(o) && !fM(this.engSet).includes(o)),
        ) || /^(skid|ev_squeal)$/.test(k)),
      ])),
        (this.skipped = Object.keys(t).filter(
          (o) =>
            this.lazy.has(o) ||
            (this.mobile && /_\d+$/.test(o) && t[o.replace(/_\d+$/, "")]) ||
            (this.mobile && /^irr?_/.test(o)),
        )),
        await Promise.all(
          Object.keys(t)
            .filter((o) => !this.skipped.includes(o))
            .map((o) => this.fetch1(o)),
        ));
      let n = this.ctx;
      (this.ev ? this.evUp() : this.engineUp(),
        (this.alias = {}),
        this.familyLoops());
      for (let [o, a] of [
        ["city_bed", this.amb],
        ["bay_bed", this.amb],
        ["rain", this.amb],
      ])
        this.buf[o] && (this.loops[o] = this.loop(o, a));
      this._loadRest(n);
    }
    engineUp() {
      let t = this.ctx,
        e = (s, n, o, a) => {
          if (!this.buf[s]) return null;
          let r = t.createBufferSource();
          ((r.buffer = this.buf[s]), (r.loop = !0));
          let l = t.createGain();
          l.gain.value = 0;
          let c = this.man?.sounds?.[s];
          (c?.loopEnd &&
            ((r.loopStart = c.loopStart || 0), (r.loopEnd = c.loopEnd)),
            r.connect(l).connect(this.exhaust),
            r.start(
              0,
              r.loopStart +
                a * ((r.loopEnd || this.buf[s].duration) - r.loopStart),
            ));
          let h = { src: r, g: l, rpm: n, on: o, name: s };
          return (this.layers.push(h), h);
        };
      if (!this.ev) {
        let s = this.man?.sounds || {};
        if (
          ((this.engTab = this.engSet.loops
            .map(([n, o]) => [
              this.engSet === wl.ferrari ? n : s[o]?.rpm || n,
              o,
            ])
            .sort((n, o) => n[0] - o[0])),
          this.engTab.forEach(([n, o], a) => e(o, n, !0, a ? 0.23 : 0)),
          this.set.sub && !this.mobile)
        )
          for (let n of (this.on0 = this.layers.slice())) {
            let o = t.createBufferSource();
            ((o.buffer = n.src.buffer), (o.loop = !0));
            let a = t.createGain();
            ((a.gain.value = 0),
              (o.loopStart = n.src.loopStart),
              (o.loopEnd = n.src.loopEnd),
              o.connect(a).connect(this.subLP),
              o.start(
                0,
                o.loopStart +
                  0.5 * ((o.loopEnd || n.src.buffer.duration) - o.loopStart),
              ),
              (n.sub = { src: o, g: a }));
          }
        this.coast = e(
          this.engSet.coast,
          this.engSet === wl.ferrari ? 5500 : s[this.engSet.coast]?.rpm || 5e3,
          !1,
          0.23,
        );
      }
      this.on = this.layers.filter((s) => s.on);
    }
    engineDown() {
      for (let t of [
        ...this.layers,
        ...this.layers.map((e) => e.sub).filter(Boolean),
      ]) {
        try {
          t.src.stop();
        } catch {}
        try {
          t.g.disconnect();
        } catch {}
      }
      ((this.layers = []),
        (this.on = []),
        (this.on0 = []),
        (this.coast = null));
    }
    evUp() {
      let t = this.ctx;
      if (this.ev && !this.evBus) {
        let e = (s, n, o = 0.7) => {
          let a = t.createBiquadFilter();
          return ((a.type = s), (a.frequency.value = n), (a.Q.value = o), a);
        };
        ((this.evBus = t.createGain()),
          (this.evBus.gain.value = BF),
          (this.evLP = e("lowpass", 9e3)),
          this.evBus
            .connect(e("highpass", 40))
            .connect(this.evLP)
            .connect(this.eng),
          (this.evTyre = t.createGain()),
          this.evTyre.connect(e("lowshelf", 120, 0.7, 3)).connect(this.sfx),
          (this.evWindLP = e("lowpass", 2500, 0.5)),
          this.evWindLP.connect(this.sfx));
      }
      this.ev && this.evLoops();
    }
    familyLoops() {
      let t = this.ctx;
      for (let e of [
        "road",
        "skid",
        "scrub",
        "squeal",
        "corner",
        "drift",
        "brake",
        "lock",
        "airflow",
      ]) {
        let s = this.loops[e];
        if (s) {
          try {
            s.src.stop();
          } catch {}
          (s.g.disconnect(), delete this.loops[e]);
        }
      }
      if (
        (this.buf.road && (this.loops.road = this.loop("road", this.roadLP)),
        !this.tyreBus)
      ) {
        let e = this.ctx,
          s = (n, o = 0.5) => {
            let a = e.createBiquadFilter();
            return (
              (a.type = "lowpass"),
              (a.frequency.value = n),
              (a.Q.value = o),
              a
            );
          };
        ((this.tyreBus = e.createGain()),
          this.tyreBus.connect(s(6e3)).connect(this.sfx),
          (this.cornerLP = s(2200)),
          this.cornerLP.connect(this.tyreBus),
          (this.brakeLP = s(3500)),
          this.brakeLP.connect(this.tyreBus));
      }
      for (let [e, s, n] of [
        ["corner", "tyre_corner", this.cornerLP],
        ["drift", "tyre_drift", this.tyreBus],
        ["brake", "brake_firm", this.brakeLP],
        ["lock", "brake_lock", this.brakeLP],
      ])
        this.buf[s] && (this.loops[e] = this.loop(s, n));
      this.buf.airflow &&
        this.set.wind &&
        (this.loops.airflow = this.loop("airflow", this.windLP));
      for (let e of Object.values(this.conv || {}))
        try {
          e.disconnect();
        } catch {}
      this.conv = {};
      for (let e of ["street", "tunnel"]) {
        let s = this.buf[this.hits.ir + e];
        if (!s) continue;
        let n = t.createConvolver();
        ((n.normalize = !0),
          (n.buffer = s),
          this.revSend[e].connect(n).connect(this.revRet),
          (this.conv[e] = n));
      }
    }
    _loadRest(t) {
      this.pass = [];
      for (let [e, s] of [
        ["pass_car", this.mobile ? 1 : 3],
        ["pass_truck", 1],
      ])
        for (let n = 0; n < s; n++)
          if (this.buf[e]) {
            let o = this.panner(0, -100, 0, 5, this.world);
            o.rolloffFactor = 1.3;
            let a = this.loop(e, o);
            ((a.p = o),
              (a.heavy = e === "pass_truck"),
              (a.car = null),
              this.pass.push(a));
          }
      this.loaded = !0;
    }
    fetch1(t) {
      let e = this.man.sounds[t];
      return fetch(this.base + e.file)
        .then((s) => {
          if (!s.ok) throw new Error(s.status + " " + t);
          return s.arrayBuffer();
        })
        .then((s) => this.decoder(t).decodeAudioData(s))
        .then((s) => {
          this.buf[t] =
            (this.mobile || /^(ev|cc)_/.test(t)) && s.numberOfChannels > 1
              ? this.mono(s)
              : s;
        })
        .catch((s) => console.warn("audio", t, s));
    }
    decoder(t) {
      if (
        !this.mobile ||
        this.offline ||
        /^irr?_/.test(t) ||
        typeof OfflineAudioContext > "u"
      )
        return this.ctx;
      try {
        return (this.dec ||= new OfflineAudioContext(1, 1, 22050));
      } catch {
        return this.ctx;
      }
    }
    mono(t) {
      let e = this.ctx.createBuffer(1, t.length, t.sampleRate),
        s = e.getChannelData(0),
        n = t.numberOfChannels;
      for (let o = 0; o < n; o++) {
        let a = t.getChannelData(o);
        for (let r = 0; r < a.length; r++) s[r] += a[r] / n;
      }
      return e;
    }
    want(t, e) {
      this.buf[t] ||
        this._want?.[t] ||
        (((this._want ||= {})[t] = !0),
        this.fetch1(t).then(() => {
          this.buf[t] && (this.loops[t] = this.loop(t, e));
        }));
    }
    loop(t, e, s = 0) {
      let n = this.ctx,
        o = this.man.sounds[t],
        a = n.createBufferSource();
      ((a.buffer = this.buf[t]),
        (a.loop = !0),
        o.loopEnd && ((a.loopStart = o.loopStart), (a.loopEnd = o.loopEnd)));
      let r = n.createGain();
      ((r.gain.value = s), a.connect(r).connect(e));
      let l = o.loopStart || 0,
        c = o.loopEnd || this.buf[t].duration;
      return (a.start(0, l + Math.random() * (c - l) * 0.95), { src: a, g: r });
    }
    play(t, e = 1, s = 1, n = null, o = 1) {
      let a = this.buf[t];
      if (!a || !this.started) return null;
      let r = this.mobile ? 6 : 16;
      if (this.voices >= r && o < 2) return null;
      let l = this.ctx,
        c = l.createBufferSource();
      ((c.buffer = a), (c.playbackRate.value = s));
      let h = l.createGain();
      return (
        (h.gain.value = e),
        c.connect(h).connect(n || this.sfx),
        this.voices++,
        (c.onended = () => {
          this.voices--;
          try {
            h.disconnect();
          } catch {}
        }),
        c.start(),
        (this.counts[t] = (this.counts[t] || 0) + 1),
        c
      );
    }
    pickName(t) {
      let e = this.alias?.[t] || t,
        s = Object.keys(this.buf).filter(
          (r) =>
            r === e ||
            (r.startsWith(e + "_") && /^_\d+$/.test(r.slice(e.length))),
        );
      if (!s.length) return e;
      let n = this.st.last[e],
        o = s.length > 1 ? s.filter((r) => r !== n) : s,
        a = o[Math.floor(Math.random() * o.length)];
      return ((this.st.last[e] = a), a);
    }
    pick(t) {
      return this.pickName(t);
    }
    var(t, e, s = 1, n = null, o = 1) {
      return this.play(this.pickName(t), e, s, n, o);
    }
    ui1(t, e, s = 1) {
      return this.play(t, e, s, this.ui, 2);
    }
    panner(t, e, s, n = 10, o = this.world) {
      let a = this.ctx,
        r = a.createPanner();
      return (
        (r.panningModel = this.mobile ? "equalpower" : "HRTF"),
        (r.distanceModel = "inverse"),
        (r.refDistance = n),
        (r.rolloffFactor = 1.1),
        (r.maxDistance = 400),
        this.setPos(r, t, e, s),
        r.connect(o),
        r
      );
    }
    setPos(t, e, s, n, o = 0) {
      if (t.positionX) {
        let a = this.ctx.currentTime;
        for (let [r, l] of [
          [t.positionX, e],
          [t.positionY, s],
          [t.positionZ, n],
        ])
          o ? r.setTargetAtTime(l, a, o) : r.setValueAtTime(l, a);
      } else t.setPosition(e, s, n);
    }
    at(t, e, s, n, o, a = 1, r = 10) {
      let l = this.panner(t, e, s, r),
        c = this.play(n, o, a, l);
      return (
        c ? c.addEventListener("ended", () => l.disconnect()) : l.disconnect(),
        c
      );
    }
    collision(t, e, s = 0, n = 1) {
      let o = Ptt[t] || Ptt.body,
        a = t === "scrape",
        r = this.buf[this.pickName(a ? this.hits.scrape : this.hits.impact)];
      if (!r || !this.started || this.hitVoices >= 8) return null;
      let l = this.ctx,
        c = l.currentTime;
      if (c - (this.st.cool[t] ?? -10) < (a ? 0.3 : 0.18)) return null;
      this.st.cool[t] = c;
      let h = (a ? an(e / 120, 0.025, 0.24) * 2.2 : an(e / 18, 0.05, 1.1)) * n,
        f = l.createBufferSource();
      ((f.buffer = r),
        (f.playbackRate.value = o.rate * (0.96 + Math.random() * 0.08)));
      let u = l.createBiquadFilter();
      ((u.type = "lowpass"), (u.frequency.value = o.lp));
      let d = l.createGain();
      (d.gain.setValueAtTime(h, c),
        d.gain.setTargetAtTime(0, c + o.dur * 0.65, 0.055));
      let p = l.createStereoPanner ? l.createStereoPanner() : l.createGain();
      (p.pan && (p.pan.value = an(s, -1, 1)),
        f.connect(u).connect(d).connect(p).connect(this.hitBus),
        this.hitVoices++,
        (f.onended = () => {
          this.hitVoices--;
          try {
            (f.disconnect(), u.disconnect(), d.disconnect(), p.disconnect());
          } catch {}
        }),
        f.start(c, a ? 0.1 : 0),
        f.stop(c + o.dur));
      let m = a ? "scrape" : "impact";
      return (
        (this.counts[m] = (this.counts[m] || 0) + 1),
        this.events[a ? "scrape" : "impact"]++,
        (this.kinds[t] = (this.kinds[t] || 0) + 1),
        f
      );
    }
    panOf(t, e) {
      if (!this.lp || !this.lr) return 0;
      let s = t - this.lp[0],
        n = e - this.lp[2],
        o = Math.hypot(s, n) || 1;
      return an(
        (s * this.lr[0] + n * this.lr[2]) / Math.max(o, 4),
        -0.85,
        0.85,
      );
    }
    unlock() {
      try {
        this.ctx.resume();
      } catch {}
      this.started || ((this.started = !0), this.fadeMaster());
    }
    masterLevel() {
      let t = this.masterVol ?? DF();
      return this.muted
        ? 0
        : hyt * (fyt[this.ev ? "ev" : "ferrari"] ?? 1) * t * t;
    }
    fadeMaster(t = 0.5) {
      let e = this.ctx.currentTime;
      (this.master.gain.cancelScheduledValues(e),
        this.master.gain.setTargetAtTime(this.masterLevel(), e, t));
    }
    mute(t) {
      ((this.muted = t), this.fadeMaster(0.08));
    }
    setMasterVol(t) {
      ((this.masterVol = an(t, 0, 1)),
        UF(this.masterVol),
        this.started && this.fadeMaster(0.1));
    }
    suspend() {
      this.paused = !0;
      let t = this.ctx.currentTime;
      (this.game.gain.cancelScheduledValues(t),
        this.game.gain.setTargetAtTime(0, t, 0.04),
        document.hidden || this.ui1(this.pickName("ui_open"), 0.9),
        this.el?.pause(),
        this.idle());
    }
    idle() {
      (clearTimeout(this._idleT),
        this.paused &&
          !this.offline &&
          (this._idleT = setTimeout(() => {
            this.paused && this.ctx.suspend().catch(() => {});
          }, 800)));
    }
    resume() {
      ((this.paused = !1), clearTimeout(this._idleT));
      try {
        this.ctx.resume();
      } catch {}
      let t = this.ctx.currentTime;
      (this.game.gain.cancelScheduledValues(t),
        this.game.gain.setTargetAtTime(1, t + 0.05, 0.08),
        this.ui1(this.pickName("ui_close"), 0.9),
        this.el && this.musicOn && this.el.play().catch(() => {}));
    }
    title() {
      (this.unlock(),
        setTimeout(() => {
          !this.driving && this.track !== "title" && this.music("title", !0);
        }, 400));
    }
    async drive() {
      (this.unlock(),
        !this.driving &&
          ((this.driving = !0),
          await this.ready,
          this.eng.gain.setTargetAtTime(1, this.ctx.currentTime + 0.2, 0.35),
          this.fadeMusic(0, 1.5),
          setTimeout(() => this.next(), 2600)));
    }
    shuffle() {
      let t = qu[this.station]?.energy,
        e = Object.keys(this.man?.music || {}).filter(
          (s) => s !== "title" && (!t || t.includes(this.man.music[s].energy)),
        );
      for (let s = e.length - 1; s > 0; s--) {
        let n = Math.floor(Math.random() * (s + 1));
        [e[s], e[n]] = [e[n], e[s]];
      }
      return (e[0] === this.track && e.length > 1 && e.push(e.shift()), e);
    }
    next() {
      if (!this.man) return;
      (this.musicOn || this.setMusic(!0),
        this.playlist.length || (this.playlist = this.shuffle()));
      let t = this.st.pace,
        e = this.station ? null : t < 45 ? "cruise" : t > 110 ? "high" : null,
        s = e
          ? this.playlist.findIndex((o) => this.man.music[o]?.energy === e)
          : 0;
      s < 0 && (s = 0);
      let [n] = this.playlist.splice(s, 1);
      n && this.music(n);
    }
    music(t, e = !1) {
      let s = this.man?.music?.[t];
      if (!s) {
        if (this.man) return;
        this.ready.then(() => this.music(t, e));
        return;
      }
      let n = this.ctx,
        o = this.el,
        a = this.elG,
        r;
      (this.pool
        ? ((r = this.pool[(this.poolI = 1 - this.poolI)]),
          r === o && (r = this.pool[(this.poolI = 1 - this.poolI)]),
          clearTimeout(r._stopT),
          r.pause(),
          (r.src = this.base + s.file),
          (r.preload = "auto"))
        : ((r = new Audio(this.base + s.file)),
          (r.preload = "auto"),
          (r.crossOrigin = "anonymous")),
        (r.loop = e));
      let l = this.media(r);
      (l.gain.cancelScheduledValues(n.currentTime),
        l.gain.setValueAtTime(0, n.currentTime),
        l.gain.setTargetAtTime(1, n.currentTime, o ? 0.8 : 0.3),
        (r.onended = () => {
          this.el === r && this.driving && this.next();
        }),
        (r.ontimeupdate = () => {
          this.el === r &&
            this.driving &&
            !e &&
            r.duration - r.currentTime < 4 &&
            ((r.ontimeupdate = null), this.next());
        }),
        (this.el = r),
        (this.elG = l),
        (this.track = t),
        this.musicOn && !this.paused && r.play().catch(() => {}),
        o &&
          o !== r &&
          (a.gain.cancelScheduledValues(n.currentTime),
          a.gain.setTargetAtTime(0, n.currentTime, 1),
          (o.onended = o.ontimeupdate = null),
          (o._stopT = setTimeout(() => {
            if (o !== this.el && (o.pause(), !this.pool)) {
              o.src = "";
              try {
                a.disconnect();
              } catch {}
            }
          }, 5e3))),
        e || this.onTrack?.(s.name || t, qu[this.station]?.name));
    }
    cycleStation() {
      return this.musicOn
        ? this.station >= qu.length - 1
          ? (this.setMusic(!1), "Off")
          : (this.station++,
            uM(this.station),
            (this.playlist = []),
            this.driving && this.next(),
            qu[this.station].name)
        : ((this.station = 0),
          uM(0),
          (this.playlist = []),
          this.setMusic(!0),
          this.el && this.driving && this.next(),
          qu[0].name);
    }
    fadeMusic(t, e) {
      this.elG?.gain.setTargetAtTime(t, this.ctx.currentTime, e / 3);
    }
    setMusic(t) {
      ((this.musicOn = t),
        this.mus.gain.setTargetAtTime(
          t ? this.musicVol * NF : 0,
          this.ctx.currentTime,
          0.2,
        ),
        t
          ? this.el
            ? this.paused || this.el.play().catch(() => {})
            : this.driving && this.next()
          : this.el?.pause(),
        Km(t, this.musicVol));
    }
    setMusicVol(t) {
      ((this.musicVol = an(t, 0, 1)),
        this.musicOn &&
          this.mus.gain.setTargetAtTime(
            this.musicVol * NF,
            this.ctx.currentTime,
            0.1,
          ),
        Km(this.musicOn, this.musicVol));
    }
    duckMusic(t) {
      let e = this.ctx.currentTime;
      (this.duck.gain.cancelScheduledValues(e),
        this.duck.gain.setTargetAtTime(1 - 0.5 * t, e, 0.02),
        this.duck.gain.setTargetAtTime(1, e + 0.35, 0.7));
    }
    duckCar(t) {
      let e = this.ctx.currentTime;
      (this.engDuck.gain.cancelScheduledValues(e),
        this.engDuck.gain.setTargetAtTime(1 - 0.4 * t, e, 0.01),
        this.engDuck.gain.setTargetAtTime(1, e + 0.15, 0.25));
    }
    update(t, e = {}) {
      if (!this.started || !this.loaded) return;
      let s = this.ctx,
        n = s.currentTime,
        o = this.st,
        a = e.dt || 1 / 60;
      if ((this.listener(e.camera), !this.driving)) return;
      let r = (z, _, R) => z.setTargetAtTime(_, n, R);
      (this.virt && !this.ev && (t = this.virtV(t, a)),
        this.ev && this.evUpdate(t, e, n, a));
      let l = t.S?.limiter ?? 9200;
      o.rpm += (Math.min(t.rpm, l - 80) - o.rpm) * an(a / 0.01, 0, 1);
      let c = o.rpm,
        h = t.speed,
        f = h * 3.6,
        u = t.rpm > l - 110 && t.throttle > 0.5 && !((t.shiftT ?? 0) > 0);
      o.limS += ((u ? 1 : 0) - o.limS) * an(a * (u ? 12 : 8), 0, 1);
      let d = t.tcsCut ? Math.max(...t.tcsCut) : 0,
        p = t.throttle * (t.espEngine ?? 1) * (1 - 0.7 * d);
      ((p = Math.max(p, t.blip ?? 0)),
        t.nitroOn && (p = 1),
        (o.thrS += (p - o.thrS) * an(a / 0.03, 0, 1)));
      let m = an(o.thrS, 0, 1),
        g = !!e.inside;
      if (!this.ev) {
        let z = this.engTab,
          _ = an(c, z[0][0], z[z.length - 1][0]),
          R = 0;
        for (; R < z.length - 2 && _ > z[R + 1][0];) R++;
        let T = an(
            Math.log(_ / z[R][0]) / Math.log(z[R + 1][0] / z[R][0]),
            0,
            1,
          ),
          E = (1 - m) * an((c - 1900) / 2600, 0, 1),
          A = 0.48 + 0.52 * an((c - 1e3) / 1700, 0, 1);
        for (let L of this.on) {
          let F = z.findIndex((B) => B[1] === L.name),
            N =
              F === R
                ? Math.cos((T * Math.PI) / 2)
                : F === R + 1
                  ? Math.sin((T * Math.PI) / 2)
                  : 0;
          (this.tg(L.g.gain, N * (0.92 + m * 0.28 - E * 0.48) * A, 0.02, n),
            L.src.playbackRate.setTargetAtTime(
              an((c / L.rpm) * this.exP, 0.35, 2.1),
              n,
              0.006,
            ),
            L.sub &&
              (this.tg(
                L.sub.g.gain,
                N * (0.7 + m * 0.5) * A * this.exSub,
                0.02,
                n,
              ),
              L.sub.src.playbackRate.setTargetAtTime(
                an((c / L.rpm) * this.exP, 0.35, 2.1) * 0.5,
                n,
                0.006,
              )));
        }
        (this.coast?.sub &&
          (this.tg(this.coast.sub.g.gain, E * 0.45, 0.03, n),
          this.coast.sub.src.playbackRate.setTargetAtTime(
            an(c / this.coast.rpm, 0.35, 2.1) * 0.5,
            n,
            0.006,
          )),
          this.coast &&
            (this.tg(this.coast.g.gain, E * 0.6, 0.03, n),
            this.coast.src.playbackRate.setTargetAtTime(
              an(c / this.coast.rpm, 0.35, 2.1),
              n,
              0.006,
            )));
        let C = t.nitroOn ? 1 : 0;
        (r(
          this.exhaustLP.frequency,
          (g ? 2800 : 5100) + m * (g ? 2100 : 4800) + C * 1500,
          0.065,
        ),
          r(this.popLP.frequency, g ? 3500 : 9e3, 0.1),
          this.exPan.pan && r(this.exPan.pan, -0.06, 0.12),
          r(this.intakeBP.frequency, 650 + c * 0.55, 0.08),
          this.tg(
            this.intake.gain,
            m * (0.02 + (c / 9e3) * 0.12) * (g ? 1.8 : 1) * (1 + C),
            0.07,
          ),
          this.eng.gain.setTargetAtTime(
            (t.nitroOn ? 1.1 : 1) * this.exV,
            n,
            0.1,
          ),
          this.rpmDuck.gain.setTargetAtTime(
            1 - 0.3 * ji(6e3, 9e3, c) * m,
            n,
            0.3,
          ));
        let P = (t.shiftT ?? 0) > 0;
        if (
          (t.shiftDir != null ? P && o.shiftT <= 0 : t.gear !== o.gear) &&
          !t.reverse &&
          t.speed > 2
        ) {
          let L = (t.shiftDir ?? Math.sign(t.gear - o.gear)) > 0,
            F = n + (L ? 0.115 : 0.055);
          if (
            (this.events[L ? "upshift" : "downshift"]++,
            this.shiftG.gain.cancelScheduledValues(n),
            this.shiftG.gain.setTargetAtTime(
              L ? (m > 0.3 ? 0.28 : 0.6) : 0.78,
              n,
              0.008,
            ),
            this.shiftG.gain.setTargetAtTime(1, F, 0.035),
            this.set.pops && L && m > 0.5 && c > 5200)
          ) {
            let N = an((c - 5200) / 3300, 0, 1),
              B = c > 7200 && Math.random() < 0.3;
            (this.pop(
              B ? "backfire" : "crack",
              (0.4 + 0.35 * N) * (B ? 0.7 : 1),
              0.94 + Math.random() * 0.12,
              0.02,
            ),
              this.events.crack++,
              B && this.duckMusic(0.25));
          }
          this.set.pops &&
            !L &&
            m < 0.2 &&
            c > 5e3 &&
            Math.random() < 0.6 &&
            this.pop(
              "crk",
              0.35,
              1 + Math.random() * 0.2,
              0.06 + Math.random() * 0.05,
            );
        }
        ((o.gear = t.gear),
          (o.shiftT = t.shiftT ?? 0),
          m < 0.1 &&
            o.armed &&
            c > 4200 &&
            n - o.lastOvr > 0.7 &&
            ((o.lastOvr = n),
            (o.armed = !1),
            this.events.overrun++,
            this.set.pops ? this.crackle(c) : this.onPop?.(an(c / 8500, 0, 1))),
          m > 0.65 && (o.armed = !0));
      }
      if (
        (this.set.pops &&
          m < 0.1 &&
          c > 3800 &&
          h > 8 &&
          n - o.lastOvr < 3 &&
          (o.burble -= a) <= 0 &&
          ((o.burble = (0.18 + Math.random() * 0.5 * (9e3 / c)) / this.exPop),
          this.pop(
            "crk",
            0.12 + 0.18 * an((c - 3800) / 4e3, 0, 1),
            0.9 + Math.random() * 0.35,
            0,
          )),
        this.tyreUpdate(t, a, g),
        (o.acT = (o.acT ?? 0) - a) <= 0)
      ) {
        o.acT = 0.1;
        let z = e.tunnelAt ? e.tunnelAt(t.pos.x, t.pos.y ?? 0, t.pos.z) : null;
        ((o.tunT = z ? z.depth : 0),
          (o.tunName = z?.name || ""),
          z && z.near < 350 && this.want("tunnel_amb", this.amb));
        let _ = e.skyAt ? e.skyAt(t.pos.x, t.pos.z) : 0.7;
        o.enclT = an((0.9 - _) / 0.55, 0, 1);
      }
      ((o.tun += ((o.tunT || 0) - o.tun) * an(a * 3, 0, 1)),
        (o.encl += ((o.enclT || 0) - o.encl) * an(a * 1.5, 0, 1)));
      let b = o.tun,
        x = 1 - b;
      (r(
        this.revSend.street.gain,
        (0.2 + 0.25 * o.encl) * x * (g ? 0.5 : 1),
        0.15,
      ),
        this.tg(this.revSend.tunnel.gain, 0.45 * b * (g ? 0.7 : 1), 0.12, n),
        r(this.musLP.frequency, 9e3 + 13e3 * ji(5, 120, f), 0.5),
        r(this.swell.gain, 0.84 + 0.16 * ji(20, 170, f), 0.8),
        (o.pace += (f - o.pace) * an(a / 30, 0, 1)),
        this.gl(
          "road",
          Math.min(0.38, Math.pow(h / 80, 1.3) * 0.32) *
            1.6 *
            (1 + 0.5 * b) *
            (this.ev ? 0 : 1),
          0.2,
        ),
        this.ev && r(this.evTyre.gain, (1 + 0.5 * b) * BF, 0.2),
        r(this.roadLP.frequency, g ? 2600 : 6500, 0.1),
        this.gl(
          "airflow",
          0.9 *
            (this.set.wind || 0) *
            Math.pow(ji(30, 240, f), 1.2) *
            (g ? 0.5 : 1) *
            (1 - 0.4 * b),
          0.25,
        ),
        r(this.windLP.frequency, 1800 + 3200 * ji(60, 280, f), 0.2));
      let v = t.landing || 0;
      (v > o.land + 0.04 &&
        (this.collision("ground", 3 + v * 16, 0, v > 0.2 ? 1 : 0.6),
        v > 0.2 && this.duckMusic(v * 0.6)),
        (o.land = v));
      for (let z of e.hits || []) {
        if (z.t <= o.lastHit) continue;
        o.lastHit = z.t;
        let _ = z.v ?? z.s * 14,
          R = z.vt ?? 0;
        if (_ < 0.8 && R < 4) continue;
        let T = performance.now() - (o.hitAt || 0),
          E = this.panOf(z.x, z.z);
        if (T < 140 || (_ < 3.5 && R > 4)) {
          ((o.scrapeT = 0.25),
            (o.scrapeV = Math.max(R, 4)),
            (this.events.grind = (this.events.grind || 0) + 1),
            T >= 140 && (o.hitAt = performance.now()));
          continue;
        }
        ((o.hitAt = performance.now()),
          this.collision(_ >= 10 ? "heavy" : "body", _, E, z.car ? 1 : 0.9),
          _ >= 10 && z.car && this.collision("body", _ * 0.6, -E, 0.5),
          z.car && this.hornFrom(e.traffic, z.x, z.z, 0.3),
          this.duckMusic(an(z.s * 1.2, 0, 1)),
          z.s > 0.3 && this.duckCar(z.s));
      }
      if (
        ((o.scrapeT = Math.max(0, o.scrapeT - a)),
        o.scrapeT > 0 &&
          t.speed > 3 &&
          this.collision("scrape", o.scrapeV || t.speed, 0),
        this.jets(e.jets || []),
        this.traffic(e.traffic, t, a),
        this.roadside(e.world, t, a),
        this.sirens(e.police, t, a),
        this.heli(e.police, t, a),
        (o.envT -= a) <= 0 && e.waterAt)
      ) {
        o.envT = 0.5;
        let z = 0,
          _ = 0;
        for (let R of [60, 160, 300])
          for (let T = 0; T < 8; T++) {
            let E = t.pos.x + R * Math.cos((T * Math.PI) / 4),
              A = t.pos.z + R * Math.sin((T * Math.PI) / 4);
            ((z += (e.waterAt(E, A) ? 1 : 0) * (400 - R)), (_ += 400 - R));
          }
        o.water = z / _;
      }
      let y = e.wet || 0,
        M = ji(0.05, 0.35, o.water),
        S = 1 - 0.35 * ji(60, 200, f);
      (this.gl(
        "city_bed",
        0.6 *
          (1 - 0.6 * M) *
          (1 - 0.4 * y) *
          S *
          (1 - 0.85 * b) *
          (1 - 0.6 * (o.p39 || 0)) *
          (1 - 0.4 * (o.copDuck || 0)),
        1,
      ),
        this.gl(
          "bay_bed",
          0.7 * M * S * (1 - 0.9 * b) * (1 - 0.4 * (o.copDuck || 0)),
          1,
        ),
        this.gl("tunnel_amb", 0.75 * b, 0.4));
      let w = e.pier39;
      if (w?.plan && this.lp) {
        (o.p39T = (o.p39T ?? 0) - a) <= 0 &&
          ((o.p39T = 0.4), (o.p39D = w.dist(this.lp[0], this.lp[2])));
        let z = o.p39D ?? 1e9;
        (z < 500 &&
          (this.want("p39_bed", this.amb),
          w.lions &&
            !this.p39pan &&
            (this.p39pan = this.panner(
              w.lions[0],
              w.lions[1] + 1,
              w.lions[2],
              22,
            )),
          this.p39pan && this.want("p39_lions", this.p39pan)),
          (o.p39 = 1 - ji(10, 230, z)),
          this.gl(
            "p39_bed",
            0.9 * o.p39 * (1 - 0.6 * ji(50, 160, f)) * (1 - 0.9 * b),
            1.2,
          ),
          this.gl("p39_lions", 1 * (1 - ji(320, 480, z)) * (1 - 0.9 * b), 1.5));
      }
      if (
        (y > 0 && this.want("rain", this.amb),
        this.gl("rain", 0.55 * y * (1 - 0.9 * b), 1.5),
        (o.gullT -= a) <= 0 &&
          ((o.gullT = 7 + Math.random() * 14), M > 0.25 && this.lp))
      ) {
        let z = Math.random() * 6.283,
          _ = 25 + Math.random() * 50;
        this.at(
          this.lp[0] + _ * Math.cos(z),
          this.lp[1] + 15,
          this.lp[2] + _ * Math.sin(z),
          this.pickName("gull"),
          0.5 * M,
          0.92 + Math.random() * 0.16,
          12,
        );
      }
      if (
        (o.fogT -= a) <= 0 &&
        ((o.fogT = 50 + Math.random() * 70), M > 0.3 && this.lp)
      ) {
        let z = Math.random() * 6.283;
        this.at(
          this.lp[0] + 300 * Math.cos(z),
          this.lp[1] + 20,
          this.lp[2] + 300 * Math.sin(z),
          "foghorn",
          0.9,
          1,
          80,
        );
      }
    }
    pop(t, e, s = 1, n = 0) {
      let o = this.pickName(t),
        a = this.buf[o];
      if (!a || !this.started || this.voices >= (this.mobile ? 6 : 16)) return;
      let r = this.ctx,
        l = r.currentTime + n,
        c = r.createBufferSource();
      ((c.buffer = a), (c.playbackRate.value = s));
      let h = r.createGain();
      if (
        ((h.gain.value = e),
        c.connect(h).connect(this.popBus),
        this.voices++,
        (c.onended = () => {
          this.voices--;
          try {
            h.disconnect();
          } catch {}
        }),
        c.start(l),
        (this.counts[o] = (this.counts[o] || 0) + 1),
        this.events.pops++,
        this.onPop && t !== "crack")
      ) {
        let f = an(e * 1.6, 0.2, 1);
        n > 0.005 ? setTimeout(() => this.onPop(f), n * 1e3) : this.onPop(f);
      }
    }
    crackle(t) {
      let e = an((t - 4200) / 4300, 0, 1),
        s = 3 + Math.round(e * 3 + Math.random() * 1.5),
        n = 0.02;
      for (let o = 0; o < s; o++) {
        let a = o === 0 && t > 6500 && Math.random() < 0.35;
        (this.pop(
          a ? "backfire" : "crk",
          (a ? 0.5 : 0.55) *
            (0.55 + 0.45 * e) *
            Math.pow(0.82, o) *
            (0.8 + Math.random() * 0.4),
          0.88 + Math.random() * 0.3,
          n,
        ),
          (n += 0.03 + Math.random() * (o < 2 ? 0.08 : 0.2)));
      }
    }
    prop(t, e, s, n, o = 1) {
      if (!this.driving) return;
      let a = /tree|palm|wood/.test(t);
      (this.collision(a ? "wood" : "prop", 4 + o * 21, this.panOf(e, n)),
        /lamp|hydrant/.test(t) && this.duckMusic(0.45));
    }
    evLoops() {
      let t = this.evSet;
      for (let [e, s] of [
        ...t.mot.map((n) => [n[1], this.evBus]),
        ...t.tyre.map((n) => [n[1], this.evTyre]),
        [t.avas, this.world],
        [t.wind, this.evWindLP],
      ])
        this.buf[e] && !this.loops[e] && (this.loops[e] = this.loop(e, s));
    }
    setExhaust(t) {
      ((this.exV = t?.vol || 1),
        (this.exP = t?.pitch || 1),
        (this.exPop = t?.pops || 1),
        (this.exSub = 1 + 1.5 * (this.exV - 1)));
    }
    async setVehicle(t, { virt: e = !1 } = {}) {
      let s = !wl[t],
        n = this.man?.sounds || {};
      if (
        ((this.virt = !!e && !s),
        this.vg && (this.vg.g = 1),
        !s && !this.ev && wl[t] !== this.engSet)
      ) {
        let h = wl[t],
          f = fM(h).filter((d) => n[d] && !this.buf[d]);
        for (let d of f) this.lazy?.delete(d);
        await Promise.all(f.map((d) => this.fetch1(d)));
        let u = this.engSet;
        (this.engineDown(),
          (this.engSet = h),
          (this.set = Xm[t] || Xm.ferrari),
          (this.subG.gain.value = this.set.sub || 0),
          this.engineUp());
        for (let d of fM(u)) delete this.buf[d];
        (this.familyLoops(), this.started && this.fadeMaster(0.3));
        return;
      }
      if (s !== this.ev) {
        let h = s
            ? (u) =>
                HF.has(u.replace(/_\d+$/, "")) ||
                /^(ev_crash|ev_scrape)/.test(u) ||
                (!this.mobile && /^irr_/.test(u))
            : (u) =>
                /^(crk|crack|backfire|airflow|road$|skid$|impact$|scrape$)/.test(
                  u,
                ) ||
                fM(wl[t]).includes(u) ||
                (!this.mobile && /^ir_(street|tunnel)$/.test(u)),
          f = Object.keys(n).filter(
            (u) =>
              h(u) &&
              !this.buf[u] &&
              !(this.mobile && /_\d+$/.test(u) && n[u.replace(/_\d+$/, "")]) &&
              (!s ||
                !HF.has(u.replace(/_\d+$/, "")) ||
                tv(mf[t] || mf.waymo).includes(u.replace(/_\d+$/, ""))),
          );
        for (let u of f) this.lazy?.delete(u);
        if ((await Promise.all(f.map((u) => this.fetch1(u))), s))
          (this.engineDown(),
            (this.ev = !0),
            (this.set = Xm.ev),
            (this.hits = OF.ev),
            (this.evSet = mf[t] || mf.waymo),
            this.evUp());
        else {
          for (let u of tv(this.evSet)) {
            let d = this.loops[u];
            if (d) {
              try {
                d.src.stop();
              } catch {}
              (d.g.disconnect(), delete this.loops[u]);
            }
          }
          ((this.ev = !1),
            (this.engSet = wl[t]),
            (this.set = Xm[t] || Xm.ferrari),
            (this.hits = OF.ferrari),
            (this.subG.gain.value = this.set.sub || 0),
            this.engineUp());
        }
        (this.familyLoops(), this.started && this.fadeMaster(0.3));
        return;
      }
      let o = mf[t];
      if (!this.ev || !o || o === this.evSet) return;
      let a = this.evSet,
        r = new Set(tv(o));
      this.evSet = o;
      let l = this.man?.sounds || {},
        c = Object.keys(l).filter(
          (h) =>
            r.has(h.replace(/_\d+$/, "")) &&
            !this.buf[h] &&
            !(this.mobile && /_\d+$/.test(h)),
        );
      for (let h of c) this.lazy?.delete(h);
      if ((await Promise.all(c.map((h) => this.fetch1(h))), this.evSet === o)) {
        for (let h of tv(a))
          if (!r.has(h)) {
            let f = this.loops[h];
            if (f) {
              try {
                f.src.stop();
              } catch {}
              (f.g.disconnect(), delete this.loops[h]);
            }
            for (let u of Object.keys(this.buf))
              u.replace(/_\d+$/, "") === h && delete this.buf[u];
          }
        this.loaded && this.evLoops();
      }
    }
    evBands(t, e, s, n = 0.12) {
      let o = this.ctx.currentTime,
        a = an(e, t[0][0], t[t.length - 1][0]),
        r = 0;
      for (; r < t.length - 2 && a > t[r + 1][0];) r++;
      let l = an(Math.log(a / t[r][0]) / Math.log(t[r + 1][0] / t[r][0]), 0, 1);
      t.forEach(([c, h], f) => {
        let u = this.loops[h];
        if (!u) return;
        let d =
          f === r
            ? Math.cos((l * Math.PI) / 2)
            : f === r + 1
              ? Math.sin((l * Math.PI) / 2)
              : 0;
        (u.g.gain.setTargetAtTime(d * s, o, n),
          u.src.playbackRate.setTargetAtTime(
            an(Math.pow(Math.max(e, 1) / c, 0.35), 0.82, 1.2),
            o,
            0.08,
          ));
      });
    }
    evUpdate(t, e, s, n) {
      let o = this.st,
        a = t.speed * 3.6,
        r = !!e.inside,
        l = ji(0.5, 4, a);
      o.thrS += (t.throttle * (t.espEngine ?? 1) - o.thrS) * an(n / 0.05, 0, 1);
      let c = an(o.thrS, 0, 1),
        h = this.evSet,
        f = h.mix;
      (this.evBands(h.mot, a, f.mot * l * (0.12 + 0.28 * c) * (r ? 1.2 : 1)),
        this.evBands(
          h.tyre,
          a,
          f.tyre *
            1.3 *
            ji(1, 25, a) *
            (0.25 + 0.75 * ji(10, 120, a)) *
            (r ? 1.15 : 1),
          0.2,
        ),
        gyt &&
          c < 0.1 &&
          o.evArmed &&
          a > 25 &&
          s - (o.regenT ?? -10) > 1.5 &&
          ((o.regenT = s),
          (o.evArmed = !1),
          this.var(
            h.regen,
            f.regen * (0.35 * ji(25, 90, a) * (r ? 1.2 : 0.9) + 0.1),
            an(Math.pow(a / 60, 0.35), 0.85, 1.2),
            this.evBus,
          ),
          (this.events.regen = (this.events.regen || 0) + 1)),
        c > 0.4 && (o.evArmed = !0),
        this.gl(
          h.avas,
          f.avas *
            0.22 *
            (1 - ji(20, 30, a)) *
            (a > 0.3 || c > 0.05 ? 1 : 0.4) *
            (r ? 0.5 : 1),
          0.25,
        ),
        this.rate(h.avas, 0.96 + a / 300),
        this.gl(
          h.wind,
          BF * f.wind * 1.1 * Math.pow(ji(30, 130, a), 1.3) * (r ? 0.8 : 1),
          0.25,
        ),
        this.rate(h.wind, an(0.9 + a / 600, 0.9, 1.15)),
        this.evWindLP.frequency.setTargetAtTime(
          1600 + 2400 * ji(40, 150, a),
          s,
          0.2,
        ),
        this.evLP.frequency.setTargetAtTime(r ? 5e3 : 9e3, s, 0.1),
        this.rpmDuck.gain.setTargetAtTime(
          myt * (0.75 + 0.25 * ji(10, 60, a)),
          s,
          0.4,
        ));
      let u = t.heave ?? 0,
        d = (u - (o.hPrev ?? u)) / Math.max(n, 0.001),
        p = Math.abs(d - (o.hvPrev ?? d)) / Math.max(n, 0.001);
      ((o.hPrev = u),
        (o.hvPrev = d),
        (o.jumpMax = Math.max(o.jumpMax || 0, p)),
        (o.bumpT = (o.bumpT ?? 0) - n) <= 0 &&
          t.onGround !== !1 &&
          a > 5 &&
          p > pyt &&
          ((o.bumpT = 0.25),
          this.var(
            h.bump,
            an(p / 80, 0.12, 0.45) * (r ? 1.2 : 1),
            0.92 + Math.random() * 0.16,
          ),
          (this.events.bump = (this.events.bump || 0) + 1)));
    }
    tyreUpdate(t, e, s) {
      let n = this.st,
        o = this.ctx.currentTime,
        a = t.speed * 3.6,
        r = t.onGround === !1 ? 0 : 1,
        l = (t.S?.mu ?? 1.35) * 0.85,
        c = Math.abs(t.ay || 0) / 9.81 / l,
        h = Math.max(0, -(t.ax || 0)) / 9.81 / l,
        f = (y, M, S, w) => {
          let z = n[y] ?? 0;
          return ((n[y] = z + (M - z) * an(e / (M > z ? S : w), 0, 1)), n[y]);
        },
        u = ji(4, 20, a) * (0.4 + 0.6 * ji(20, 100, a)) * r,
        d = f("tc", ji(0.15, 1, c) * u, 0.2, 0.35),
        p = f(
          "td",
          Math.max(
            ji(0.14, 0.24, Math.abs(t.beta || 0)) * ji(25, 40, a),
            an(t.drift || 0, 0, 1) * ji(15, 30, a),
          ) * r,
          0.15,
          0.35,
        ),
        m = (t.brake || 0) > 0.05 && !t.reverse ? 1 : 0,
        g = f("tb", m * ji(0.1, 0.9, h) * ji(5, 30, a) * r, 0.15, 0.3),
        b =
          t.assists?.abs === !1
            ? ji(0.6, 0.95, Math.max(0, ...(t.kappa || [0]).map((y) => -y)))
            : 0,
        x = f("tl", b * m * ji(10, 25, a) * r, 0.08, 0.25),
        v = 0;
      (this.gl("corner", v * 0.5 * d * (1 - 0.5 * p) * (s ? 0.8 : 1), 0.1),
        this.rate("corner", an(0.94 + a / 600, 0.94, 1.1)),
        this.tg(this.cornerLP.frequency, 2200 + 2300 * ji(0.6, 1, c), 0.2),
        this.gl("drift", v * 0.35 * Math.pow(p, 1.2) * (s ? 0.85 : 1), 0.1),
        this.rate("drift", 0.96 + 0.06 * p),
        this.gl("brake", v * 0.3 * g * (1 - 0.6 * x) * (s ? 0.8 : 1), 0.1),
        this.gl("lock", 0.4 * x * (s ? 0.85 : 1), 0.06),
        this.rate("lock", an(0.9 + a / 500, 0.9, 1.1)),
        m &&
          (t.brake || 0) > 0.6 &&
          !n.dived &&
          a > 30 &&
          o - (n.diveT ?? -10) > 2.5 &&
          ((n.dived = !0),
          (n.diveT = o),
          this.var(
            "brake_dive",
            0.25 * ji(30, 90, a),
            0.95 + Math.random() * 0.1,
            this.tyreBus,
          )),
        (t.brake || 0) < 0.1 && (n.dived = !1),
        (n.tyre = { lat: c, dec: h, corner: d, slide: p, brake: g, lock: x }));
    }
    gl(t, e, s) {
      let n = this.loops[t];
      n && this.tg(n.g.gain, e, s);
    }
    virtV(t, e) {
      let s = (this.vg ||= { g: 1, shiftT: 0, dir: 0 });
      ((!s.o || Object.getPrototypeOf(s.o) !== t) && (s.o = Object.create(t)),
        s.s0 !== t.S &&
          ((s.s0 = t.S), (s.S = { ...(t.S || {}), limiter: Qx.red + 150 })));
      let n = s.o;
      return (
        (n.rpm = Rtt(
          s,
          Math.abs(t.speed || 0) * 3.6,
          an(t.throttle || 0, 0, 1),
          e,
        )),
        (n.gear = s.g),
        (n.shiftT = s.shiftT),
        (n.shiftDir = s.dir),
        (n.S = s.S),
        n
      );
    }
    remoteKey(t) {
      let e = this.man?.sounds || {},
        s = wl[t];
      if (s) {
        let a = null;
        for (let [r, l] of s.loops) {
          let c = e[l]?.rpm || r;
          e[l] &&
            (!a ||
              Math.abs(Math.log(c / 3500)) < Math.abs(Math.log(a[0] / 3500))) &&
            (a = [c, l]);
        }
        return a && { k: a[1], rpm: a[0], ice: !0 };
      }
      let n = mf[t] || mf.waymo,
        o = n.mot[1];
      return e[o[1]] ? { k: o[1], kmh: o[0], ice: !1 } : null;
    }
    remotes(t, e = 0, s = 0) {
      if (!this.started || !this.loaded || !this.man) return;
      let n = this.ctx,
        o = n.currentTime,
        a = (this.rv ||= new Map()),
        r = this.mobile ? 2 : 4,
        l = this.lp || [0, 0, 0],
        c = t
          .map((f) => [Math.hypot(f.x - l[0], f.z - l[2]), f])
          .filter(([f]) => f < 160)
          .sort((f, u) => f[0] - u[0])
          .slice(0, r),
        h = new Set(c.map(([, f]) => f.key));
      for (let [f, u] of a)
        h.has(f) ||
          (this.tg(u.g.gain, 0, 0.2, o),
          setTimeout(() => {
            try {
              (u.src.stop(), u.p.disconnect());
            } catch {}
          }, 900),
          a.delete(f));
      for (let [, f] of c) {
        let u = this.remoteKey(f.aud);
        if (!u) continue;
        let d = a.get(f.key);
        if (d && d.k !== u.k) {
          try {
            (d.src.stop(), d.p.disconnect());
          } catch {}
          (a.delete(f.key), (d = null));
        }
        if (!d) {
          let _ = this.buf[u.k] || this.rbuf?.[u.k];
          if (!_) {
            this.rload(u.k);
            continue;
          }
          let R = this.panner(f.x, (f.y || 0) + 0.6, f.z, 7, this.world);
          R.rolloffFactor = 1.2;
          let T = n.createBufferSource();
          ((T.buffer = _), (T.loop = !0));
          let E = this.man.sounds[u.k];
          E?.loopEnd && ((T.loopStart = E.loopStart), (T.loopEnd = E.loopEnd));
          let A = n.createGain();
          ((A.gain.value = 0),
            T.connect(A).connect(R),
            T.start(0, (E?.loopStart || 0) + Math.random() * 0.5),
            (d = {
              k: u.k,
              src: T,
              g: A,
              p: R,
              G: { g: 1, shiftT: 0, dir: 0 },
              sp: f.speed || 0,
              thr: 0.3,
              fresh: !0,
            }),
            a.set(f.key, d),
            (this.counts.remote = (this.counts.remote || 0) + 1));
        }
        let p = Math.abs(f.speed || 0),
          m = 1 / 60,
          g = (p - d.sp) / m;
        ((d.sp += (p - d.sp) * 0.2),
          (d.thr += (an(0.25 + g / 3, 0, 1) - d.thr) * 0.1),
          this.setPos(d.p, f.x, (f.y || 0) + 0.6, f.z, d.fresh ? 0 : 0.03));
        let b = f.x - l[0],
          x = f.z - l[2],
          v = Math.hypot(b, x) || 1,
          y = b / v,
          M = x / v,
          S = an(
            (zp + e * y + s * M) / (zp + ((f.vx || 0) * y + (f.vz || 0) * M)),
            0.75,
            1.3,
          ),
          w,
          z;
        (u.ice
          ? ((w = Rtt(d.G, p * 3.6, d.thr, m) / u.rpm),
            (z = 0.55 + 0.45 * d.thr))
          : ((w = Math.pow(Math.max(p * 3.6, 5) / u.kmh, 0.35)),
            (z = 0.25 + 0.6 * an(p / 20, 0, 1))),
          d.src.playbackRate.setTargetAtTime(
            an(w * S, 0.35, 2.1),
            o,
            d.fresh ? 0.001 : 0.03,
          ),
          this.tg(d.g.gain, z * 0.9, d.fresh ? 0.3 : 0.08, o),
          (d.rate = w * S),
          (d.fresh = !1));
      }
      this.remoteN = a.size;
    }
    rload(t) {
      (this.rwant ||= {})[t] ||
        !this.man.sounds[t] ||
        ((this.rwant[t] = !0),
        fetch(this.base + this.man.sounds[t].file)
          .then((e) => e.arrayBuffer())
          .then((e) => this.decoder(t).decodeAudioData(e))
          .then((e) => {
            (this.rbuf ||= {})[t] = e.numberOfChannels > 1 ? this.mono(e) : e;
          })
          .catch((e) => {
            (console.warn("audio", t, e), (this.rwant[t] = !1));
          }));
    }
    tg(t, e, s, n = this.ctx.currentTime) {
      if (e > 0) {
        ((t._z0 = 0), t.setTargetAtTime(e, n, s));
        return;
      }
      t._z0
        ? t._z0 > 0 &&
          n >= t._z0 &&
          (t.cancelScheduledValues(n), t.setValueAtTime(0, n), (t._z0 = -1))
        : ((t._z0 = n + 9 * s), t.setTargetAtTime(0, n, s));
    }
    rate(t, e) {
      let s = this.loops[t];
      s && s.src.playbackRate.setTargetAtTime(e, this.ctx.currentTime, 0.08);
    }
    listener(t) {
      if (!t) return;
      let e = this.ctx.listener,
        s = t.matrixWorld.elements,
        n = this.ctx.currentTime,
        o = [s[12], s[13], s[14]],
        a = [-s[8], -s[9], -s[10]],
        r = [s[4], s[5], s[6]];
      (e.positionX
        ? (e.positionX.setValueAtTime(o[0], n),
          e.positionY.setValueAtTime(o[1], n),
          e.positionZ.setValueAtTime(o[2], n),
          e.forwardX.setValueAtTime(a[0], n),
          e.forwardY.setValueAtTime(a[1], n),
          e.forwardZ.setValueAtTime(a[2], n),
          e.upX.setValueAtTime(r[0], n),
          e.upY.setValueAtTime(r[1], n),
          e.upZ.setValueAtTime(r[2], n))
        : (e.setPosition(...o), e.setOrientation(...a, ...r)),
        (this.lp = o),
        (this.lr = [s[0], s[1], s[2]]));
    }
    jets(t) {
      let e = this.st;
      for (let s of t)
        if (!e.jets.has(s) && this.buf.spray) {
          let n = this.panner(s.x, s.y + 1, s.z, 6, this.sfx),
            o = this.loop("spray", n);
          (o.g.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.2),
            (o.p = n),
            e.jets.set(s, o),
            e.jetList.push([s, o]));
        }
      for (let s = e.jetList.length - 1; s >= 0; s--) {
        let [n, o] = e.jetList[s];
        (!t.includes(n) || n.t > n.dur - 1.5) &&
          (o.g.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5),
          t.includes(n) ||
            (setTimeout(() => {
              try {
                (o.src.stop(), o.p.disconnect());
              } catch {}
            }, 2500),
            e.jetList.splice(s, 1)));
      }
    }
    traffic(t, e, s) {
      if (!t?.cars) return;
      let n = this.st,
        o = e.pos.x,
        a = e.pos.z,
        r = this.ctx.currentTime,
        l = this.lp ? this.lp[0] : o,
        c = this.lp ? this.lp[1] : (e.pos.y ?? 0) + 1.5,
        h = this.lp ? this.lp[2] : a,
        f = e.vel?.x ?? 0,
        u = e.vel?.z ?? 0;
      n.hornT -= s;
      let d = [];
      for (let p of t.cars) {
        if (p._ax != null) {
          let b = an(s * 10, 0, 1);
          ((p._vx = (p._vx || 0) + ((p.x - p._ax) / s - (p._vx || 0)) * b),
            (p._vz = (p._vz || 0) + ((p.z - p._az) / s - (p._vz || 0)) * b),
            (Math.abs(p._vx) > 60 || Math.abs(p._vz) > 60) &&
              (p._vx = p._vz = 0));
        }
        ((p._ax = p.x), (p._az = p.z));
        let m = Math.hypot(p.x - o, p.z - a);
        if (
          ((p.cable || p.kind === "cablecar") &&
            m < 140 &&
            (p._bellT == null && (p._bellT = r + 1 + Math.random() * 4),
            r > p._bellT &&
              (this.at(
                p.x,
                (p.y ?? 0) + 2,
                p.z,
                this.pickName("bell"),
                0.9,
                0.97 + Math.random() * 0.06,
                14,
              ),
              (p._bellT = r + 7 + Math.random() * 9))),
          m < 45 && d.push([m, p]),
          p.cable)
        )
          continue;
        let g = Math.hypot((p._vx || 0) - f, (p._vz || 0) - u);
        if (
          (m < 5.5 && g > 12 && !p._wh
            ? ((p._wh = 1),
              this.at(
                p.x,
                (p.y ?? 0) + 1,
                p.z,
                this.pickName("whoosh"),
                an(0.3 + g / 50, 0.3, 1),
                0.9 + an(g / 200, 0, 0.3),
                4,
              ))
            : m > 14 && (p._wh = 0),
          m < 4.5 && g > 15 && !n.horned.get(p) && n.hornT <= 0)
        ) {
          if ((n.horned.set(p, 1), Math.random() < 0.7)) continue;
          (setTimeout(
            () =>
              this.at(
                p.x,
                (p.y ?? 0) + 1,
                p.z,
                this.pickName(Math.random() < 0.5 ? "horn_a" : "horn_b"),
                0.3,
                0.95 + Math.random() * 0.1,
              ),
            250 + Math.random() * 400,
          ),
            (n.hornT = 30));
        }
      }
      if (
        (this.passBys(
          d.sort((p, m) => p[0] - m[0]),
          l,
          c,
          h,
          f,
          u,
        ),
        n.hornT < -150 - Math.random() * 150 && t.cars.length)
      ) {
        let p = t.cars.filter(
            (g) =>
              !g.cable &&
              Math.hypot(g.x - o, g.z - a) > 40 &&
              Math.hypot(g.x - o, g.z - a) < 160,
          ),
          m = p[Math.floor(Math.random() * p.length)];
        (m &&
          this.at(
            m.x,
            (m.y ?? 0) + 1,
            m.z,
            this.pickName(Math.random() < 0.5 ? "horn_a" : "horn_b"),
            0.18,
            0.9 + Math.random() * 0.2,
          ),
          (n.hornT = 30));
      }
    }
    roadside(t, e, s) {
      let n = this.st,
        o = Math.hypot(e.vel?.x ?? 0, e.vel?.z ?? 0);
      if (((n.rsT = (n.rsT || 0) - s), !t?.near || o < 17 || e.air)) return;
      let a = this.ctx.currentTime,
        r = n.rsSeen || (n.rsSeen = new WeakMap()),
        l = e.vel.x / o,
        c = e.vel.z / o,
        h = e.pos.x,
        f = e.pos.z,
        u = (e.pos.y ?? 0) + 0.9,
        d = null,
        p = null,
        m = 9;
      for (let v of t.near(h + l * 4, f + c * 4, 9)) {
        if (v.dead || v.traffic || v.meet || v.x === void 0) continue;
        let y =
          v.t === "circ"
            ? v.r < 0.3
              ? "pole"
              : "tree"
            : v.parked
              ? "car"
              : v.rail
                ? "rail"
                : null;
        if (!y || (v.y1 !== void 0 && (u < v.y0 - 1 || u > v.y1 + 2))) continue;
        let M = v.x - h,
          S = v.z - f,
          w = M * l + S * c,
          z =
            Math.abs(M * c - S * l) -
            (v.r ?? Math.min(v.hx ?? 0.5, v.hz ?? 0.5));
        w < -0.5 ||
          w > 2.5 ||
          z < 0.2 ||
          z > 4.2 ||
          a - (r.get(v) ?? -9) < 2 ||
          (z < m && ((m = z), (d = v), (p = y)));
      }
      if (!d || n.rsT > 0) return;
      (r.set(d, a),
        (n.rsT = p === "rail" ? 0.24 : 0.07),
        (n.rsN = (n.rsN || 0) + 1),
        ((n.rsK ||= {})[p] = (n.rsK[p] || 0) + 1));
      let g = lyt[p],
        b = an((o - 15) / 35, 0, 1) * (1 - m / 5) * g.g,
        x =
          g.r * (0.94 + Math.random() * 0.12) * (1 + an((o - 25) / 90, 0, 0.3));
      this.at(d.x, u, d.z, this.pickName("whoosh"), b, x, 3);
    }
    passBys(t, e, s, n, o, a) {
      if (!this.pass?.length) return;
      let r = this.ctx.currentTime,
        l = new Set();
      for (let c of this.pass)
        c.car && t.some(([h, f]) => f === c.car && h < 50)
          ? l.add(c.car)
          : (c.car = null);
      for (let [, c] of t) {
        if (l.has(c)) continue;
        let h = cyt.has(c.kind) || c.cable || c.bus,
          f = this.pass.find((u) => !u.car && u.heavy === h);
        f && ((f.car = c), l.add(c), (f.fresh = !0));
      }
      for (let c of this.pass) {
        let h = c.car;
        if (!h) {
          this.tg(c.g.gain, 0, 0.15, r);
          continue;
        }
        let f = (h.y ?? 0) + 0.6;
        this.setPos(c.p, h.x, f, h.z, c.fresh ? 0 : 0.02);
        let u = h.x - e,
          d = h.z - n,
          p = Math.hypot(u, d) || 1,
          m = u / p,
          g = d / p,
          b = -((h._vx || 0) * m + (h._vz || 0) * g),
          x = o * m + a * g,
          v = an((zp + x) / (zp - b), 0.7, 1.4),
          y = an((h.v ?? Math.hypot(h._vx || 0, h._vz || 0)) / 14, 0, 1);
        (c.src.playbackRate.setTargetAtTime(
          v * (0.85 + 0.25 * y),
          r,
          c.fresh ? 0.001 : 0.04,
        ),
          this.tg(
            c.g.gain,
            (c.heavy ? 0.8 : 0.65) * (0.3 + 0.7 * y) * (h.wreck ? 0.3 : 1),
            c.fresh ? 0.25 : 0.1,
            r,
          ),
          (c.fresh = !1));
      }
    }
    hornFrom(t, e, s, n) {
      if (!t?.cars || this.st.hornT > 0) return;
      let o = null,
        a = 12;
      for (let r of t.cars) {
        let l = Math.hypot(r.x - e, r.z - s);
        l < a && !r.cable && ((a = l), (o = r));
      }
      o &&
        ((this.st.hornT = 30),
        setTimeout(
          () =>
            this.at(o.x, (o.y ?? 0) + 1, o.z, this.pickName("horn_b"), n, 1),
          450,
        ));
    }
    heli(t, e, s) {
      let n = t?.heli,
        o = this.ctx.currentTime,
        a = !!(n && n.on && this.buf.heli_loop && !(t.hold > 0));
      if (!this.heliV && a) {
        let p = this.panner(n.x, n.y, n.z, 45, this.world);
        ((p.rolloffFactor = 1),
          (p.maxDistance = 2e3),
          (this.heliV = {
            p,
            l: this.loop("heli_loop", p),
            n: this.buf.heli_near ? this.loop("heli_near", p) : null,
          }));
      }
      let r = this.heliV;
      if (!r) return;
      let l = 0,
        c = 1,
        h = 0,
        f = 1e9;
      if (a) {
        this.setPos(r.p, n.x, n.y, n.z, 0.05);
        let p = this.lp ? this.lp[0] : e.pos.x,
          m = this.lp ? this.lp[1] : e.pos.y,
          g = this.lp ? this.lp[2] : e.pos.z,
          b = n.x - p,
          x = n.y - m,
          v = n.z - g;
        f = Math.hypot(b, x, v) || 1;
        let y = -(n.vx * b + n.vy * x + n.vz * v) / f,
          M = ((e.vel?.x ?? 0) * b + (e.vel?.z ?? 0) * v) / f;
        ((c = an(Math.pow((zp + M) / (zp - an(y, -80, 80)), 1.15), 0.84, 1.2)),
          (l = 1.5 * (n.leaving ? an(1 - n.leaving / 12, 0, 1) : 1)),
          (h = an(1 - (f - 35) / 110, 0, 1)));
      }
      let u = 0.4;
      (this.tg(r.l.g.gain, l * Math.cos(((h * Math.PI) / 2) * 0.85), u, o),
        r.l.src.playbackRate.setTargetAtTime(c, o, 0.08),
        r.n &&
          (this.tg(r.n.g.gain, l * Math.sin((h * Math.PI) / 2) * 1.1, u, o),
          r.n.src.playbackRate.setTargetAtTime(c, o, 0.08)));
      let d = a ? 1 - 0.45 * an(1 - (f - 30) / 120, 0, 1) : 1;
      (this.heliDuck && this.heliDuck.gain.setTargetAtTime(d, o, 0.3),
        (this.st.heli = {
          on: a,
          gain: +l.toFixed(2),
          near: +h.toFixed(2),
          d: Math.round(f),
          rate: +c.toFixed(3),
          duck: +d.toFixed(2),
        }));
    }
    sirens(t, e, s) {
      let n = this.st,
        o = this.ctx.currentTime,
        a = this.mobile ? 2 : 3,
        r = (this.sirV ||= []),
        l = this.lp ? this.lp[0] : e.pos.x,
        c = this.lp ? this.lp[1] : (e.pos.y ?? 0) + 1.5,
        h = this.lp ? this.lp[2] : e.pos.z,
        f = e.vel?.x ?? 0,
        u = e.vel?.z ?? 0,
        d = !!(t && t.hold > 0),
        p = (n.copSeen ||= new WeakMap()),
        m = [];
      if (t?.units && this.buf.cop_wail && !d)
        for (let v of t.units) {
          if (v._sax != null && s > 0) {
            let S = an(s * 8, 0, 1),
              w = (v.x - v._sax) / s,
              z = (v.z - v._saz) / s;
            Math.abs(w) < 70 &&
              Math.abs(z) < 70 &&
              ((v._svx = (v._svx || 0) + (w - (v._svx || 0)) * S),
              (v._svz = (v._svz || 0) + (z - (v._svz || 0)) * S));
          }
          ((v._sax = v.x), (v._saz = v.z));
          let y = v.cop && v.cop.free && v.cop.mode === "chase" && !v.wreck,
            M = Math.hypot(v.x - l, (v.y ?? 0) + 1.4 - c, v.z - h);
          if (!y) {
            p.delete(v);
            continue;
          }
          (p.has(v) ||
            (p.set(v, { tail: !1, hornT: -10 }),
            M < 260 &&
              this.at(v.x, (v.y ?? 0) + 1.6, v.z, "cop_chirp", 0.9, 1, 14)),
            M < 420 && m.push([M, v]));
        }
      m.sort((v, y) => v[0] - y[0]);
      let g = m.slice(0, a).map((v) => v[1]);
      for (let v of r) v.car && !g.includes(v.car) && (v.car = null);
      for (let v of g) {
        if (r.some((M) => M.car === v)) continue;
        let y = r.find((M) => !M.car && M.level < 0.03);
        if (!y && r.length < a) {
          let M = this.panner(0, -100, 0, 12, this.world);
          ((M.rolloffFactor = 1), (M.maxDistance = 1e3));
          let S = this.loop("cop_wail", M),
            w = this.buf.cop_yelp ? this.loop("cop_yelp", M) : null;
          ((y = { p: M, w: S, y: w, level: 0, mix: 0, car: null }), r.push(y));
        }
        y && ((y.car = v), (y.fresh = !0), (y.yelp = !1), (y.mix = 0));
      }
      let b = [],
        x = 0;
      for (let v of r) {
        let y = v.car,
          M = 0,
          S = 1;
        if (y) {
          let z = (y.y ?? 0) + 1.6;
          this.setPos(v.p, y.x, z, y.z, v.fresh ? 0 : 0.03);
          let _ = y.x - l,
            R = y.z - h,
            T = Math.hypot(_, z - c, R) || 1,
            E = Math.hypot(_, R) || 1,
            A = _ / E,
            C = R / E,
            P = -((y._svx || 0) * A + (y._svz || 0) * C),
            I = f * A + u * C,
            L = P + I;
          ((S = an(
            Math.pow((zp + I) / (zp - an(P, -80, 80)), 1.3),
            0.75,
            1.35,
          )),
            !v.yelp && T < 60 && L > 1
              ? (v.yelp = !0)
              : v.yelp && (T > 75 || L < -2) && (v.yelp = !1),
            (M = 0.95 * ji(420, 300, T)));
          let F = p.get(y);
          (F &&
            (!F.tail && T < 14 && L > 0.5 && o - F.hornT > 4
              ? ((F.tail = !0),
                (F.hornT = o),
                this.at(y.x, z, y.z, "cop_horn", 0.85, 1, 12))
              : T > 30 && (F.tail = !1)),
            b.push({
              d: +T.toFixed(1),
              closing: +L.toFixed(1),
              rate: +S.toFixed(3),
              yelp: v.yelp,
              gain: +M.toFixed(3),
              heard: +((M * 12) / (12 + Math.max(0, T - 12))).toFixed(4),
            }),
            (x = Math.max(x, M)));
        }
        let w = y ? (v.fresh ? 0.25 : 0.12) : d ? 0.08 : 0.2;
        ((v.mix += ((v.yelp ? 1 : 0) - v.mix) * an(s / 0.15, 0, 1)),
          this.tg(v.w.g.gain, M * Math.cos((v.mix * Math.PI) / 2), w, o),
          v.y &&
            this.tg(v.y.g.gain, M * Math.sin((v.mix * Math.PI) / 2), w, o));
        for (let z of [v.w.src, v.y?.src])
          z && z.playbackRate.setTargetAtTime(S, o, v.fresh ? 0.001 : 0.06);
        ((v.level += (M - v.level) * (1 - Math.exp(-s / w))), (v.fresh = !1));
      }
      if (
        ((n.sirens = b),
        (n.copDuck =
          (n.copDuck || 0) +
          ((t?.pursuit && x > 0 ? 1 : 0) - (n.copDuck || 0)) *
            an(s / 1.5, 0, 1)),
        t &&
          t.bust > 0.6 &&
          !d &&
          m.length &&
          m[0][0] < 25 &&
          o - (n.paT ?? -20) > 7)
      ) {
        n.paT = o;
        let v = m[0][1],
          y = (v.y ?? 0) + 1.6;
        (this.at(v.x, y, v.z, "cop_radio", 0.5, 1, 8),
          setTimeout(() => {
            (t.bust > 0 || t.hold > 0) &&
              this.at(v.x, y, v.z, this.pickName("cop_pa"), 1, 1, 10);
          }, 300));
      }
    }
  };
