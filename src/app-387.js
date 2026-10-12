// app 387 — math
// Lines 191221-191777 of readable/app.pretty.js (statement-aligned).
var _M = { r: 15, v: 2.6, t: 0.4 },
  zet = 24,
  Owt = 7,
  Hwt = 280,
  Eet = { stops: [0, 12, 13, 14], trial: [0, 14, 15, 16] },
  fN = new Set([
    "race",
    "police",
    "taxi",
    "food",
    "courier",
    "vip",
    "trial",
    "nearmiss",
    "photo",
  ]),
  Dwt = {
    taxi: "stops",
    food: "stops",
    courier: "stops",
    vip: "stops",
    trial: "gates",
    race: "race",
    police: "police",
    nearmiss: "nearmiss",
    photo: "photo",
  },
  m0 = (i) => {
    i = Math.max(0, i);
    let t = Math.floor(i / 60);
    return t + ":" + (i - t * 60).toFixed(1).padStart(4, "0");
  },
  Tet = (i) => (i <= 1 ? 3 : i <= 1.2 ? 2 : i <= 1.5 ? 1 : 0),
  IE = class {
    constructor(t) {
      (Object.assign(this, t),
        (this.list = t.list || []),
        (this.active = null),
        (this.near = null),
        (this.events = []),
        (this._seen = new WeakSet()),
        (this.lp = null),
        (this._abandon = 0));
    }
    skill(t) {
      let e = this.active;
      e &&
        e.kind === "nearmiss" &&
        t.type === "skill" &&
        t.key === "miss" &&
        (e.count++, this.events.push({ type: "tick", d: e.d, what: "miss" }));
    }
    kindOf(t) {
      return Dwt[t.cat] || null;
    }
    why(t) {
      if (this.active) return "Another challenge is on";
      if (t.cat === "race" && !this.race?.()) return null;
      if (t.cat === "police") {
        let e = this.police?.();
        if (!e || e.enabled === !1) return "Police are off - Settings, World";
        if (e.pursuit) return "Lose the police first";
      }
      return t.cat === "nearmiss" && this.traffic && !this.traffic()
        ? "Needs traffic - Settings, World"
        : null;
    }
    start(t) {
      let e = this.why(t);
      if (e) return e;
      let s = this.v,
        n = this.kindOf(t) || "stops",
        o = {
          d: t,
          kind: n,
          t: 0,
          i: 0,
          care: 1,
          auto: !1,
          legs: [],
          stopT: 0,
          count: 0,
          msg: "",
        },
        a = this.router?.(),
        r = s.forward ? s.forward() : { x: t.dir[0], z: t.dir[1] },
        l = (c, h, f, u, d) => {
          try {
            return a ? a.routeTo(c, h, f, u, d, !0) : null;
          } catch {
            return null;
          }
        };
      if (n === "stops") {
        let c = t.spot || { x: s.pos.x, z: s.pos.z },
          h = t.spot?.hx ?? r.x,
          f = t.spot?.hz ?? r.z,
          u = 0;
        for (let d of t.stops) {
          let p = l(c.x, c.z, h, f, d),
            m = p?.len || Math.hypot(d.x - c.x, d.z - c.z) * 1.35,
            g = m / Eet.stops[t.tier] + 8;
          (o.legs.push({ S: d, len: m, par: g, pts: p?.pts || null }),
            (u += g),
            (c = p?.spot || d),
            (h = c.hx ?? h),
            (f = c.hz ?? f));
        }
        ((o.par = u),
          (o.limit = u * 1.5),
          t.cat === "taxi" && (o.clock = o.legs[0].par * 1.6 + 5),
          t.cat === "food" && (o.temp = 1));
      } else if (n === "gates" || (n === "race" && !this.race?.())) {
        o.kind = "gates";
        let c = t.stops[0],
          h = l(s.pos.x, s.pos.z, r.x, r.z, c),
          f = h?.pts || [
            [s.pos.x, s.pos.z],
            [c.x, c.z],
          ],
          u = h?.len || Math.hypot(c.x - s.pos.x, c.z - s.pos.z);
        o.cps = [];
        let d = 0;
        for (let p = 1; p < f.length; p++)
          ((d += Math.hypot(f[p][0] - f[p - 1][0], f[p][1] - f[p - 1][1])),
            d >= Hwt &&
              p < f.length - 1 &&
              (o.cps.push({ x: f[p][0], z: f[p][1] }), (d = 0)));
        (o.cps.push({ x: c.x, z: c.z, fin: !0 }),
          (o.pts = f),
          (o.len = u),
          (o.par = u / Eet.trial[t.tier] + 4),
          (o.limit = o.par * 1.6));
      } else if (n === "race") {
        let c = this.race();
        o.raceId = "ch_" + t.id;
        try {
          c.startSolo({
            kind: "path",
            id: o.raceId,
            name: t.name,
            sub: t.sub,
            from: [t.x, t.z],
            to: t.to,
          });
        } catch (h) {
          console.warn("challenge race", h);
        }
        if (!c.S) return "No race fits here";
        o.limit = 1e9;
      } else if (n === "police") {
        let c = this.police();
        ((o.esc0 = c.escapes),
          (o.bust0 = c.busts),
          (o.limit = t.secs || 120),
          (c.heat = Math.min(5, (t.heat || 1) + 0.05)),
          c.startPursuit?.("STREET CHALLENGE"));
      } else
        n === "nearmiss"
          ? (o.limit = t.secs || 60)
          : n === "photo" && ((o.limit = 150), (o.framed = 0), (o.score = 0));
      return (
        (this.active = o),
        (this.near = null),
        (this.lp = { x: s.pos.x, z: s.pos.z }),
        n === "stops" &&
          this.handoff &&
          (o.ho =
            this.handoff(o, t.spot || { x: s.pos.x, z: s.pos.z }, "pickup") ||
            null),
        this.events.push({ type: "start", d: t, A: o }),
        null
      );
    }
    cancel(t = "abandoned") {
      let e = this.active;
      e &&
        ((this.active = null),
        this.events.push({ type: "fail", d: e.d, A: e, why: t }));
    }
    abandon() {
      if (!this.active) return !1;
      let t = this.t || 0;
      return t - this._abandon < 2.5
        ? ((this._abandon = -9),
          this.active.kind === "race" && this.race?.()?.exit?.(),
          this.cancel("abandoned"),
          !0)
        : ((this._abandon = t),
          this.events.push({ type: "ask", d: this.active.d }),
          !1);
    }
    raceResult(t) {
      let e = this.active;
      if (!e || e.kind !== "race" || t.id !== e.raceId) return !1;
      e.got = !0;
      let s = t.place,
        n = t.of > 1 ? Math.max(0, 4 - s) : 0;
      return n
        ? (this.finish(e, n, s, -s * 1e7 - (t.ms || 0), {
            place: s,
            of: t.of,
            ms: t.ms,
          }),
          !0)
        : ((this.active = null),
          this.events.push({
            type: "fail",
            d: e.d,
            A: e,
            why: "place",
            place: s,
            of: t.of,
          }),
          !0);
    }
    finish(t, e, s, n, o = {}) {
      (t.auto && e > 1 && ((e = 1), (o.l5 = !0)),
        (this.active = null),
        this.events.push({
          type: "result",
          d: t.d,
          A: t,
          stars: e,
          val: s,
          q: n,
          care: t.d.cat === "food" || t.d.cat === "vip" ? t.care : null,
          ...o,
        }));
    }
    update(t, e = !0, s = []) {
      this.t = (this.t || 0) + t;
      let n = this.v,
        o = this.active,
        a = n.pos.x,
        r = n.pos.z,
        l = this.lp && Math.hypot(a - this.lp.x, r - this.lp.z) > 80;
      if (((this.lp = { x: a, z: r }), !o)) {
        this.near = e ? this.findNear() : null;
        for (let h of s) this._seen.add(h);
        return;
      }
      if (l && o.kind !== "race") {
        this.cancel("teleport");
        return;
      }
      if (!e && o.kind !== "race" && o.kind !== "photo") {
        o.paused = !0;
        return;
      }
      if (o.ho && o.ho.phase === "pickup")
        if (o.ho.done) o.ho = null;
        else {
          let h = o.d.spot;
          if (h && Math.hypot(h.x - a, h.z - r) > zet + 16)
            (o.ho.cancel?.(), (o.ho = null));
          else {
            o.handing = !0;
            return;
          }
        }
      if (
        ((o.handing = !1),
        (o.paused = !1),
        (o.t += t),
        this.auto?.() && (o.auto = !0),
        o.d.cat === "food" || o.d.cat === "vip")
      )
        this.careStep(o, t, s);
      else for (let h of s) this._seen.add(h);
      let c = Math.abs(n.speed ?? Math.hypot(n.vel.x, n.vel.z));
      switch (o.kind) {
        case "stops": {
          let h = o.legs[o.i],
            f = h.S,
            u = Math.min(
              Math.hypot(f.x - a, f.z - r),
              f.alt ? Math.hypot(f.alt.x - a, f.alt.z - r) : 1e9,
            );
          if (((o.dist = u), o.d.cat === "taxi")) {
            if (((o.clock -= t), o.clock <= 0)) {
              this.cancel("time");
              return;
            }
          } else if (o.t > o.limit) {
            this.cancel(o.d.cat === "food" ? "cold" : "time");
            return;
          }
          if (
            (o.d.cat === "food" && (o.temp = Math.max(0, 1 - o.t / o.limit)),
            o.d.cat === "vip" && o.care < 0.3)
          ) {
            this.cancel("vip");
            return;
          }
          if (o.d.cat === "food" && o.care < 0.15) {
            this.cancel("spilt");
            return;
          }
          if (
            ((o.stopT = u < _M.r && c < _M.v ? o.stopT + t : 0),
            o.ho &&
              !o.ho.done &&
              u > _M.r + 8 &&
              (o.ho.cancel?.(), (o.ho = null)),
            o.stopT >= _M.t &&
              this.handoff &&
              !o.ho?.done &&
              (o.ho || (o.ho = this.handoff(o, f, "drop") || { done: !0 }),
              !o.ho.done))
          ) {
            o.handing = !0;
            return;
          }
          if (
            o.stopT >= _M.t &&
            ((o.ho = null),
            (o.handing = !1),
            o.i++,
            (o.stopT = 0),
            this.events.push({
              type: "stop",
              d: o.d,
              A: o,
              n: o.i,
              of: o.legs.length,
            }),
            o.d.cat === "taxi" &&
              o.i < o.legs.length &&
              (o.clock += o.legs[o.i].par * 1.45),
            o.i >= o.legs.length)
          ) {
            let d = Tet(o.t / o.par);
            (o.d.cat === "food" &&
              (d = Math.max(
                1,
                d - (o.care < 0.6 ? 1 : 0) - (o.care < 0.35 ? 1 : 0),
              )),
              o.d.cat === "vip" &&
                (d = Math.min(d, o.care >= 0.85 ? 3 : o.care >= 0.6 ? 2 : 1)),
              this.finish(o, Math.max(1, d), o.t, -o.t + (o.care || 0) * 10, {
                par: o.par,
              }));
          }
          return;
        }
        case "gates": {
          let h = o.cps[o.i],
            f = Math.hypot(h.x - a, h.z - r);
          if (((o.dist = f), o.t > o.limit)) {
            this.cancel("time");
            return;
          }
          f < (h.fin ? 16 : 22) &&
            (o.i++,
            this.events.push({
              type: "cp",
              d: o.d,
              A: o,
              n: o.i,
              of: o.cps.length,
            }),
            o.i >= o.cps.length &&
              this.finish(o, Math.max(1, Tet(o.t / o.par)), o.t, -o.t, {
                par: o.par,
              }));
          return;
        }
        case "race": {
          !this.race?.()?.S && !o.got
            ? (o.gone = (o.gone || 0) + t) > 0.6 && this.cancel("quit")
            : (o.gone = 0);
          return;
        }
        case "police": {
          let h = this.police?.();
          if (!h) {
            this.cancel("off");
            return;
          }
          if (h.busts > o.bust0) {
            this.cancel("busted");
            return;
          }
          if (h.escapes > o.esc0) {
            let f = o.t / o.limit;
            this.finish(o, f <= 0.45 ? 3 : f <= 0.7 ? 2 : 1, o.t, -o.t, {
              heat: o.d.heat,
            });
            return;
          }
          if (o.t > o.limit) {
            this.cancel("time");
            return;
          }
          !h.pursuit &&
            o.t > 2 &&
            ((h.heat = Math.max(h.heat, 1.02)),
            h.startPursuit?.("STREET CHALLENGE"));
          return;
        }
        case "nearmiss":
          if (o.t >= o.limit) {
            let h = o.d.stars || [3, 6, 10],
              f = o.count,
              u = f >= h[2] ? 3 : f >= h[1] ? 2 : f >= h[0] ? 1 : 0;
            u
              ? this.finish(o, u, f, f)
              : ((this.active = null),
                this.events.push({
                  type: "fail",
                  d: o.d,
                  A: o,
                  why: "few",
                  n: f,
                }));
          }
          return;
        case "photo":
          o.inPhoto ? this.photoClosed() : o.t > o.limit && this.cancel("time");
          return;
      }
    }
    photoFrame(t) {
      let e = this.active;
      if (!e || e.kind !== "photo" || !this.project) return;
      let s = e.d.look,
        n = this.project(s.x, s.y, s.z);
      ((e.t += t), (e.inPhoto = !0));
      let o = n && n[2] && Math.abs(n[0]) < 0.92 && Math.abs(n[1]) < 0.92,
        a = o ? 1 - Math.max(Math.abs(n[0]), Math.abs(n[1])) : 0;
      ((e.inFrame = !!o),
        (e.score = a),
        (e.framed = o ? e.framed + t : 0),
        (e.low = o ? Math.min(e.low ?? 1, a) : 1),
        e.framed >= 0.5 && (e.best = Math.max(e.best || 0, e.low)),
        o &&
          a > 0.7 &&
          e.framed >= 0.8 &&
          e.low > 0.7 &&
          this.finish(e, 3, Math.round(a * 100), a),
        o ? e.framed > 1.2 && ((e.framed = 0.5), (e.low = a)) : (e.low = 1));
    }
    photoClosed() {
      let t = this.active;
      !t ||
        t.kind !== "photo" ||
        !t.inPhoto ||
        ((t.inPhoto = !1),
        t.best > 0 &&
          this.finish(
            t,
            t.best > 0.7 ? 3 : t.best > 0.4 ? 2 : 1,
            Math.round(t.best * 100),
            t.best,
          ));
    }
    careStep(t, e, s) {
      let n = this.v,
        o = t.d.cat === "food";
      for (let h of s) {
        if (
          this._seen.has(h) ||
          (this._seen.add(h), h.C?.kerb && (h.v || 0) < 9)
        )
          continue;
        let f = h.v || 0;
        if (f > 2.5) {
          let u = Math.min(0.3, 0.06 + 0.025 * (f - 2.5));
          ((t.care = Math.max(0, t.care - u)),
            this.events.push({
              type: "spill",
              d: t.d,
              A: t,
              k: u,
              why: "hit",
            }));
        }
      }
      let a = t.pv || { x: n.vel.x, z: n.vel.z },
        r = (n.vel.x - a.x) / Math.max(e, 0.001),
        l = (n.vel.z - a.z) / Math.max(e, 0.001);
      ((t.pv = { x: n.vel.x, z: n.vel.z }),
        (t.acc =
          (t.acc ?? 0) +
          (Math.hypot(r, l) - (t.acc ?? 0)) * Math.min(1, e / 0.15)));
      let c = o ? 8.8 : 7.8;
      (t.acc > c &&
        t.acc < 40 &&
        ((t.care = Math.max(0, t.care - (t.acc - c) * (o ? 0.025 : 0.035) * e)),
        (t.harsh = (t.harsh || 0) + e)),
        (n.airTime || 0) > 0
          ? (t.air = Math.max(t.air || 0, n.airTime))
          : ((t.air || 0) > 0.25 &&
              ((t.care = Math.max(0, t.care - (o ? 0.12 : 0.15))),
              this.events.push({
                type: "spill",
                d: t.d,
                A: t,
                k: 0.12,
                why: "air",
              })),
            (t.air = 0)));
    }
    findNear() {
      let t = this.v;
      if (Math.abs(t.speed ?? 0) > Owt) return null;
      let s = null,
        n = zet;
      for (let o of this.list) {
        if (!fN.has(o.cat)) continue;
        let a = o.spot?.x ?? o.x,
          r = o.spot?.z ?? o.z,
          l = Math.hypot(a - t.pos.x, r - t.pos.z);
        l < n && ((n = l), (s = o));
      }
      return s;
    }
    target() {
      let t = this.active;
      if (!t) return null;
      if (t.kind === "stops") {
        let e = t.legs[t.i]?.S;
        return e
          ? {
              x: e.x,
              z: e.z,
              S: e,
              pts: t.legs[t.i].pts,
              label:
                t.d.cat === "food" && t.i === 0 ? e.addr : e.addr || "Stop",
            }
          : null;
      }
      if (t.kind === "gates") {
        let e = t.cps[t.i];
        return e
          ? {
              x: e.x,
              z: e.z,
              pts: t.pts,
              label: e.fin
                ? "Finish"
                : "Checkpoint " + (t.i + 1) + " / " + t.cps.length,
              cp: !0,
              fin: !!e.fin,
              next: t.cps[t.i + 1] || null,
            }
          : null;
      }
      if (t.kind === "photo") {
        let e = t.d.look;
        return { x: t.d.spot.x, z: t.d.spot.z, label: e.name, look: e };
      }
      return null;
    }
  };
