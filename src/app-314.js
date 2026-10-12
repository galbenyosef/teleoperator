// app 314 — math
// Lines 151775-152098 of readable/app.pretty.js (statement-aligned).
function qI(i, t, e = {}) {
  let s = i?.L;
  if (!s?.roadAt) return null;
  let n = s.roadAt(t.pos.x, t.pos.z, 3, t.pos.y, !1, e);
  if (!n || n.J || !n.E.car || !n.E.lg || n.dd > 2.5) return null;
  let o = Math.hypot(t.vel.x, t.vel.z),
    a = o > 1 ? t.vel.x / o : -Math.sin(t.psi),
    r = o > 1 ? t.vel.z / o : -Math.cos(t.psi),
    l = a * n.dx + r * n.dz;
  if (Math.abs(l) < 0.6) return null;
  let c = l >= 0 ? 1 : -1;
  return (n.E.oneway && c < 0) || n.s < n.E.s0 - 0.5 || n.s > n.E.s1 + 0.5
    ? null
    : { E: n.E, dir: c, s: n.s };
}
function MZ(i, t, e = {}) {
  let s = i?.L;
  if (!s?.roadAt) return null;
  let n = s.roadAt(t.pos.x, t.pos.z, 3, t.pos.y, !1, e);
  if (!n || n.J || !n.E.car || !n.E.lg || n.dd > 2.5) return null;
  let o = Math.hypot(t.vel.x, t.vel.z),
    a = o > 1 ? t.vel.x / o : -Math.sin(t.psi),
    r = o > 1 ? t.vel.z / o : -Math.cos(t.psi),
    l = a * n.dx + r * n.dz;
  if (Math.abs(l) < 0.5 || n.s < n.E.s0 - 0.5 || n.s > n.E.s1 + 0.5)
    return null;
  let c = l >= 0 ? 1 : -1;
  return n.E.oneway && c < 0
    ? { E: n.E, dir: 1, s: n.s, wrong: !0 }
    : { E: n.E, dir: c, s: n.s, wrong: !1 };
}
function jI(i, t, e) {
  let s = i.D,
    n = s.juns[e > 0 ? t.jb : t.ja];
  if (!n?.tl) return [];
  let o = n.tl.find((c) => c.E === t && c.end === (e > 0 ? "b" : "a"));
  if (!o) return [];
  let a = -o.hx,
    r = -o.hz,
    l = [];
  for (let c of n.tl) {
    let h = c.E;
    if (
      (h === t && c.end === o.end) ||
      !h.car ||
      !h.lg ||
      h.inner ||
      h.hwy ||
      h.layered
    )
      continue;
    let f = c.end === "a" ? 1 : -1;
    if (h.oneway && f < 0) continue;
    let u = a * c.hx + r * c.hz,
      d = Math.acos(Lm(u, -1, 1));
    d > 2.6 ||
      l.push({ F: h, dir: f, cross: a * c.hz - r * c.hx, ang: d, J: n });
  }
  return l;
}
function SZ(i, t, e, s = 300) {
  let n = [{ E: t.E, dir: t.dir, sA: t.s, sB: t.dir > 0 ? t.E.s1 : t.E.s0 }],
    o = Math.abs(n[0].sB - n[0].sA),
    a = t.E,
    r = t.dir;
  for (let l = 0; l < 12 && o < s; l++) {
    let c = jI(i, a, r);
    if (!c.length) break;
    let h = e(c, a, r, l);
    if (!h) break;
    ((a = h.F),
      (r = h.dir),
      n.push({
        E: a,
        dir: r,
        sA: r > 0 ? a.s0 : a.s1,
        sB: r > 0 ? a.s1 : a.s0,
      }),
      (o += a.s1 - a.s0 + 10));
  }
  return n;
}
var VI = (i, t) => {
    let e = null,
      s = 1e9;
    for (let n of i) {
      let o = n.ang - (n.F.name && n.F.name === t.name ? 0.25 : 0);
      o < s && ((s = o), (e = n));
    }
    return e && e.ang < 1 ? e : null;
  },
  kZ = (i) => (t, e) => {
    let s = null,
      n = 1e9;
    for (let o of t) {
      if (o.ang < 0.6 || (i > 0 ? o.cross >= 0 : o.cross <= 0)) continue;
      let a = Math.abs(o.ang - 1.57);
      a < n && ((n = a), (s = o));
    }
    return s || VI(t, e);
  };
f0();
var Nu = {
    chainStep: 0.25,
    chainMax: 3,
    chainT: 5,
    heatMult: 0.5,
    missR: 3.4,
    missV: 6,
    missKmh: 30,
    missP: 250,
    driftMin: 0.6,
    driftP: 120,
    driftPS: 180,
    airMin: 0.3,
    airP: 200,
    airPS: 600,
    fastKmh: 90,
    fastT: 2.5,
    fastP: 150,
    oncKmh: 35,
    oncT: 1.5,
    oncP: 100,
    crashV: 6,
    bumpV: 3,
  },
  _Z = 400,
  zZ = 200;
function eh(i) {
  let t = 1,
    e = _Z + zZ,
    s = 0;
  for (i = Math.max(0, +i || 0); i >= s + e && t < 999;)
    ((s += e), t++, (e = _Z + zZ * t));
  return { level: t, into: i - s, need: e, frac: (i - s) / e };
}
var Ix = class {
  constructor(t = {}) {
    ((this.env = t),
      (this.t = 0),
      (this.chain = 0),
      (this.chainT = 0),
      (this.mult = 1),
      (this.maxMult = 1),
      (this.pts = 0),
      (this.n = 0),
      (this.skills = 0),
      (this.crashes = 0),
      (this.F = {}),
      (this._seen = new WeakSet()),
      (this.listeners = []));
  }
  on(t) {
    return (this.listeners.push(t), this);
  }
  emit(t) {
    t.t = this.t;
    for (let e of this.listeners)
      try {
        e(t);
      } catch (s) {
        console.warn("skills", s);
      }
  }
  _heatM() {
    let t = this.env.police?.();
    return t && t.enabled !== !1 && t.pursuit
      ? 1 + Nu.heatMult * Math.max(1, t.level)
      : 1;
  }
  score(t, e, s, { flat: n = !1, line: o = "" } = {}) {
    n || (this.chain++, (this.chainT = Nu.chainT));
    let a = Math.min(
      Nu.chainMax,
      1 + Nu.chainStep * Math.max(0, this.chain - 1),
    );
    ((this.mult = Math.round(a * this._heatM() * 4) / 4),
      (this.maxMult = Math.max(this.maxMult, this.mult)));
    let r = n ? 1 : this.mult,
      l = Math.round((s * r) / 10) * 10;
    return (
      (this.pts += l),
      this.n++,
      this.skills++,
      this.emit({
        type: "skill",
        key: t,
        label: e,
        pts: l,
        mult: r,
        flat: n,
        line: o,
        chain: this.chain,
        total: this.pts,
      }),
      l
    );
  }
  end(t) {
    let e = Math.round(this.pts),
      s = this.n,
      n = this.mult;
    ((this.chain = 0),
      (this.chainT = 0),
      (this.pts = 0),
      (this.n = 0),
      (this.mult = this._heatM()),
      s
        ? this.emit(
            t === "crash"
              ? { type: "crash", lost: !0, pts: e, n: s }
              : { type: "bank", pts: e, n: s, mult: n },
          )
        : t === "crash" &&
          this.emit({ type: "crash", lost: !1, pts: 0, n: 0 }));
  }
  reset() {
    ((this.F = {}),
      (this.chain = 0),
      (this.chainT = 0),
      (this.pts = 0),
      (this.n = 0),
      (this.mult = 1));
  }
  update(t, e, s = [], n = !0, o = !1) {
    this.t += t;
    let a = Nu,
      r = this.F,
      l = e.kmh || 0,
      c = e.speed || 0;
    if (!n) {
      (this.n && this.end("bank"),
        (r.driftT = 0),
        (r.air = 0),
        (r.fastT = 0),
        (r.oncT = 0),
        (r.missPend = null));
      for (let M of s) this._seen.add(M);
      return;
    }
    this.chain && (this.chainT -= t) <= 0 && this.end("bank");
    let h = 0,
      f = 0;
    for (let M of s)
      this._seen.has(M) ||
        (this._seen.add(M),
        M.C?.kerb ? (f = Math.max(f, M.v || 0)) : (h = Math.max(h, M.v || 0)));
    if (
      (f > a.crashV * 1.5 && (h = Math.max(h, f)),
      h > a.crashV && (r.crashT || 0) <= this.t
        ? ((r.crashT = this.t + 1.5),
          (r.hitT = this.t),
          this.crashes++,
          this.end("crash"))
        : h > a.bumpV && (r.hitT = this.t),
      o)
    ) {
      ((r.driftT = 0), (r.air = 0), (r.fastT = 0), (r.oncT = 0));
      return;
    }
    let u = (M, S, w) => this.score(M, S, w),
      d = this.env.cars?.(),
      p = e.pos.x,
      m = e.pos.z,
      g = e.vel?.x ?? 0,
      b = e.vel?.z ?? 0;
    if (d && l > a.missKmh && this.t - (r.hitT ?? -9) > 0.8) {
      let M = (r.miss ||= new WeakMap());
      for (let w of d) {
        let z = w.x - p,
          _ = w.z - m;
        if (Math.abs(z) > a.missR || Math.abs(_) > a.missR) continue;
        let R = Math.hypot(z, _);
        if (R > a.missR || R < 1.2 || w.wreck) continue;
        let T = w.v || 0;
        Math.hypot(g - (w.fx || 0) * T, b - (w.fz || 0) * T) < a.missV ||
          (M.get(w) ?? -99) > this.t - 6 ||
          (M.set(w, this.t), (r.missPend = { c: w, t: this.t }));
      }
      let S = r.missPend;
      S &&
        this.t - S.t > 0.35 &&
        ((r.missPend = null),
        this.t - (r.hitT ?? -9) > 0.5 &&
          u(
            "miss",
            S.c.cop ? "Near miss \xB7 police" : "Near miss",
            a.missP * (S.c.cop ? 2 : 1),
          ));
    }
    if ((e.drift || 0) > 0.45 && l > 25) r.driftT = (r.driftT || 0) + t;
    else {
      if ((r.driftT || 0) > a.driftMin) {
        let M = Math.min(6, r.driftT);
        u("drift", `Drift ${M.toFixed(1)}s`, a.driftP + a.driftPS * M);
      }
      r.driftT = 0;
    }
    let x = e.airTime || 0;
    (x > 0
      ? (r.air = Math.max(r.air || 0, x))
      : ((r.air || 0) > a.airMin &&
          u("air", `Airtime ${r.air.toFixed(1)}s`, a.airP + a.airPS * r.air),
        (r.air = 0)),
      l > a.fastKmh
        ? ((r.fastT = (r.fastT || 0) + t),
          r.fastT > a.fastT && ((r.fastT = 0), u("fast", "Top speed", a.fastP)))
        : (r.fastT = Math.max(0, (r.fastT || 0) - t)));
    let v = !1,
      y = this.env.L;
    if (l > a.oncKmh && y?.roadAt) {
      let M = y.roadAt(p, m, 2, void 0, !0, (r._rq ||= {}));
      if (M && M.E && !M.E.oneway && !M.E.hwy && M.dd <= 0 && c > 1) {
        let S = (g * M.dx + b * M.dz) / c;
        v = Math.abs(S) > 0.85 && M.v * Math.sign(S) < -1.4;
      }
    }
    v
      ? ((r.oncT = (r.oncT || 0) + t),
        r.oncT > a.oncT && ((r.oncT = 0), u("onc", "Oncoming", a.oncP)))
      : (r.oncT = Math.max(0, (r.oncT || 0) - t * 0.5));
  }
};
TZ();
