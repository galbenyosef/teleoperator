// app 385 — push
// Lines 191488-191722 of readable/app.pretty.js (statement-aligned).
var y4 = ["saver", "mobile", "perf", "high", "ultra"],
  QB = {
    saver: "Battery saver",
    mobile: "Mobile",
    perf: "Performance",
    high: "High",
    ultra: "Ultra",
  },
  tN = (o) => {
    if (!o.length) return 0;
    let t = [...o].sort((e, s) => e - s);
    return t[t.length >> 1];
  },
  zT = class {
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
      let i = this.win;
      if (((i.t += e), i.n++, s > 0 && i.g.push(s), i.t < 1e3)) return;
      let a = (i.n * 1e3) / i.t,
        r = tN(i.g),
        l = i.t / i.n;
      if (((i.t = 0), (i.n = 0), (i.g.length = 0), this.cool > 0)) {
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
        u = y4.indexOf(f);
      if (!this.auto || (h.choice || "auto") !== "auto") {
        !this.hinted &&
          u > 0 &&
          ((this.hinted = !0),
          this.toast(
            `Low frame rate (${a.toFixed(0)} fps)`,
            `try ${QB[y4[u - 1]]} in the menu's Graphics`,
          ));
        return;
      }
      u <= 0 || this.step(y4[u - 1], `${a.toFixed(0)} fps while driving`);
    }
    decide() {
      let t = this.bench;
      t.done = !0;
      let e = tN(t.ft),
        s = tN(t.g),
        n = e > 0 ? 1e3 / e : 60,
        i = globalThis.SF_GFX || {},
        a = i.own || "high",
        r = y4.indexOf(a),
        l = s > 0 && s < e * 0.5,
        c = a;
      if (
        (r >= 2
          ? (n < 24 && (l || s === 0 || s > 28)
              ? (c = "mobile")
              : (n < 40 || s > 14) && (c = "perf"),
            y4.indexOf(c) > r && (c = a))
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
        console.warn("autogfx: " + QB[t] + " (" + e + ")"));
      let n = this.apply(s);
      this.toast(
        `Graphics: ${QB[t]}`,
        `auto, for a steadier frame rate${n ? " \xB7 full effect on next start" : ""}`,
      );
    }
  };
es();
function oit(o, t, e) {
  let s = e.D,
    n = new Map(),
    i = 64,
    a = (u, d) => u * 65536 + d,
    r = {},
    l = [];
  for (let u of s.juns)
    if (u.ctl === 2 && u.tl) {
      let d = a(Math.floor(u.x / i), Math.floor(u.z / i)),
        p = n.get(d);
      (p || n.set(d, (p = [])), p.push(u));
    }
  for (let u of o) {
    if ((u.kind !== "signal" && u.kind !== "signalp") || !u.refs) continue;
    let d = null,
      p = 2025,
      m = Math.floor(u.x / i),
      g = Math.floor(u.z / i);
    for (let y = -1; y <= 1; y++)
      for (let M = -1; M <= 1; M++)
        for (let S of n.get(a(m + y, g + M)) || []) {
          let w = (S.x - u.x) ** 2 + (S.z - u.z) ** 2;
          w < p && ((p = w), (d = S));
        }
    if (!d) continue;
    let b = null,
      v = 1 / 0;
    for (let y of d.tl) (ys(y.E, u.x, u.z, r), r.d < v && ((v = r.d), (b = y)));
    let x = [];
    for (let y = 0; y < u.refs.length; y += 2)
      u.refs[y].material === t.signal && x.push(u.refs[y], u.refs[y + 1]);
    b &&
      x.length &&
      l.push({ x: u.x, z: u.z, J: d, ph: b.ph, lens: x, st: -1 });
  }
  let c = new It(),
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
            for (let v = 0; v < g.lens.length; v += 2)
              (g.lens[v].setColorAt(g.lens[v + 1], c), h.add(g.lens[v]));
          }
        }
        for (let g of h) g.instanceColor.needsUpdate = !0;
        h.clear();
      }
    },
  };
}
es();
var _T = {
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
  U2 = 130,
  Kv = 115,
  q6t = 35,
  ait = 140,
  eN = 0.15,
  tu = (o, t, e) => (o < t ? t : o > e ? e : o),
  ET = (o) =>
    o &&
    !o.inner &&
    !o.layered &&
    !o.hwy &&
    o.sw >= 1.4 &&
    o.L > 6 &&
    o.s1 - o.s0 > 1;
