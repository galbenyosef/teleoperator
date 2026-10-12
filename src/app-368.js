// app 368 — push
// Lines 183368-183602 of readable/app.pretty.js (statement-aligned).
var gM = ["saver", "mobile", "perf", "high", "ultra"],
  JF = {
    saver: "Battery saver",
    mobile: "Mobile",
    perf: "Performance",
    high: "High",
    ultra: "Ultra",
  },
  ZF = (i) => {
    if (!i.length) return 0;
    let t = [...i].sort((e, s) => e - s);
    return t[t.length >> 1];
  },
  aE = class {
    constructor(t) {
      Object.assign(this, t);
      let e = globalThis.SF_GFX || {};
      ((this.on = !t.test || t.force),
        (this.auto = (e.choice || "auto") === "auto"),
        (this.bench =
          this.on && this.auto && !e.tuned && !t.noBench
            ? { t0: 0, ft: [], g: [], done: !1 }
            : null),
        (this.win = { t: 0, n: 0, g: [] }),
        (this.low = 0),
        (this.cool = 0),
        (this.hinted = !1),
        (this.last = 0),
        (this.steps = []));
    }
    get benching() {
      return !!(this.bench && !this.bench.done && this.bench.t0);
    }
    tick(t) {
      if (!this.on) return;
      let e = this.last ? t - this.last : 0;
      this.last = t;
      let s = this.mb.info?.gpuTimeMs || 0,
        n = this.bench;
      if (n && !n.done) {
        if (!n.t0) {
          (this.ready = (this.ready || 0) + 1) > 90 && (n.t0 = t);
          return;
        }
        (e > 0 && e < 1e3 && n.ft.push(e),
          s > 0 && n.g.push(s),
          t - n.t0 > 3500 && n.ft.length >= 20
            ? this.decide()
            : t - n.t0 > 8e3 && this.decide());
        return;
      }
      if (!this.playing() || globalThis.document?.hidden || e > 2e3 || e <= 0) {
        ((this.win.t = 0),
          (this.win.n = 0),
          (this.win.g.length = 0),
          (this.low = 0));
        return;
      }
      let o = this.win;
      if (((o.t += e), o.n++, s > 0 && o.g.push(s), o.t < 1e3)) return;
      let a = (o.n * 1e3) / o.t,
        r = ZF(o.g),
        l = o.t / o.n;
      if (((o.t = 0), (o.n = 0), (o.g.length = 0), this.cool > 0)) {
        this.cool--;
        return;
      }
      let c = r > 0 && r < l * 0.5;
      if (
        ((this.low = a < 24 && (this.atFloor() || c) ? this.low + 1 : 0),
        this.low < 6)
      )
        return;
      ((this.low = 0), (this.cool = 12));
      let h = globalThis.SF_GFX || {},
        f = h.lvl || "high",
        u = gM.indexOf(f);
      if (!this.auto || (h.choice || "auto") !== "auto") {
        !this.hinted &&
          u > 0 &&
          ((this.hinted = !0),
          this.toast(
            `Low frame rate (${a.toFixed(0)} fps)`,
            `try ${JF[gM[u - 1]]} in the menu's Graphics`,
          ));
        return;
      }
      u <= 0 || this.step(gM[u - 1], `${a.toFixed(0)} fps while driving`);
    }
    decide() {
      let t = this.bench;
      t.done = !0;
      let e = ZF(t.ft),
        s = ZF(t.g),
        n = e > 0 ? 1e3 / e : 60,
        o = globalThis.SF_GFX || {},
        a = o.own || "high",
        r = gM.indexOf(a),
        l = s > 0 && s < e * 0.5,
        c = a;
      if (
        (r >= 2
          ? (n < 24 && (l || s === 0 || s > 28)
              ? (c = "mobile")
              : (n < 40 || s > 14) && (c = "perf"),
            gM.indexOf(c) > r && (c = a))
          : r === 1 && n < 20 && (c = "saver"),
        (this.result = {
          fps: +n.toFixed(1),
          ft: +e.toFixed(2),
          gpu: +s.toFixed(2),
          frames: t.ft.length,
          cpuBound: l,
          lvl: c,
        }),
        console.log("autogfx: benchmark", JSON.stringify(this.result)),
        c === a)
      ) {
        globalThis.SF_BOOT?.tune?.(null, `benchmark ${n.toFixed(0)} fps`);
        return;
      }
      (this.step(c, `benchmark ${n.toFixed(0)} fps`), (this.cool = 12));
    }
    step(t, e) {
      let s = globalThis.SF_BOOT?.tune ? globalThis.SF_BOOT.tune(t, e) : t;
      (this.steps.push({ lvl: t, why: e, t: performance.now() }),
        console.warn("autogfx: " + JF[t] + " (" + e + ")"));
      let n = this.apply(s);
      this.toast(
        `Graphics: ${JF[t]}`,
        `auto, for a steadier frame rate${n ? " \xB7 full effect on next start" : ""}`,
      );
    }
  };
as();
function $tt(i, t, e) {
  let s = e.D,
    n = new Map(),
    o = 64,
    a = (u, d) => u * 65536 + d,
    r = {},
    l = [];
  for (let u of s.juns)
    if (u.ctl === 2 && u.tl) {
      let d = a(Math.floor(u.x / o), Math.floor(u.z / o)),
        p = n.get(d);
      (p || n.set(d, (p = [])), p.push(u));
    }
  for (let u of i) {
    if ((u.kind !== "signal" && u.kind !== "signalp") || !u.refs) continue;
    let d = null,
      p = 2025,
      m = Math.floor(u.x / o),
      g = Math.floor(u.z / o);
    for (let y = -1; y <= 1; y++)
      for (let M = -1; M <= 1; M++)
        for (let S of n.get(a(m + y, g + M)) || []) {
          let w = (S.x - u.x) ** 2 + (S.z - u.z) ** 2;
          w < p && ((p = w), (d = S));
        }
    if (!d) continue;
    let b = null,
      x = 1 / 0;
    for (let y of d.tl) (vs(y.E, u.x, u.z, r), r.d < x && ((x = r.d), (b = y)));
    let v = [];
    for (let y = 0; y < u.refs.length; y += 2)
      u.refs[y].material === t.signal && v.push(u.refs[y], u.refs[y + 1]);
    b &&
      v.length &&
      l.push({ x: u.x, z: u.z, J: d, ph: b.ph, lens: v, st: -1 });
  }
  let c = new $t(),
    h = new Set(),
    f = 1;
  return {
    n: l.length,
    update(u, d, p, m) {
      if (!((f += d) < 0.2)) {
        f = 0;
        for (let g of l) {
          if (Math.abs(g.x - p) > 500 || Math.abs(g.z - m) > 500) continue;
          let b = e.signal(g.J, g.ph, u);
          if (b !== g.st) {
            ((g.st = b), c.setRGB(b * 0.5, 1, 1));
            for (let x = 0; x < g.lens.length; x += 2)
              (g.lens[x].setColorAt(g.lens[x + 1], c), h.add(g.lens[x]));
          }
        }
        for (let g of h) g.instanceColor.needsUpdate = !0;
        h.clear();
      }
    },
  };
}
as();
var rE = {
    fidi: 1,
    towers: 0.9,
    union: 1.25,
    chinatown: 1.25,
    wharf: 1.15,
    jackson: 0.75,
    tenderloin: 0.85,
    soma: 0.7,
    northbeach: 0.95,
    telegraph: 0.5,
    nob: 0.6,
    russian: 0.42,
    marina: 0.5,
    cowhollow: 0.55,
    pacific: 0.38,
    western: 0.38,
    hayes: 0.7,
    presidio: 0.12,
    mission: 0.8,
    castro: 0.85,
    haight: 0.8,
    dolores: 0.5,
    noe: 0.45,
    twinpeaks: 0.2,
  },
  Jm = 130,
  iv = 115,
  Qyt = 35,
  Xtt = 140,
  QF = 0.15,
  yf = (i, t, e) => (i < t ? t : i > e ? e : i),
  lE = (i) =>
    i &&
    !i.inner &&
    !i.layered &&
    !i.hwy &&
    i.sw >= 1.4 &&
    i.L > 6 &&
    i.s1 - i.s0 > 1;
