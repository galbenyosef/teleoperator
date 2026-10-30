// app 404 — math
// Lines 199050-199606 of readable/app.pretty.js (statement-aligned).
var R4 = { r: 15, v: 2.6, t: 0.4 },
  Nit = 24,
  RSt = 7,
  ASt = 280,
  Hit = { stops: [0, 12, 13, 14], trial: [0, 14, 15, 16] },
  uN = new Set([
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
  PSt = {
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
  L0 = (o) => {
    o = Math.max(0, o);
    let t = Math.floor(o / 60);
    return t + ":" + (o - t * 60).toFixed(1).padStart(4, "0");
  },
  Dit = (o) => (o <= 1 ? 3 : o <= 1.2 ? 2 : o <= 1.5 ? 1 : 0),
  e9 = class {
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
      return PSt[t.cat] || null;
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
        i = {
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
            g = m / Hit.stops[t.tier] + 8;
          (i.legs.push({ S: d, len: m, par: g, pts: p?.pts || null }),
            (u += g),
            (c = p?.spot || d),
            (h = c.hx ?? h),
            (f = c.hz ?? f));
        }
        ((i.par = u),
          (i.limit = u * 1.5),
          t.cat === "taxi" && (i.clock = i.legs[0].par * 1.6 + 5),
          t.cat === "food" && (i.temp = 1));
      } else if (n === "gates" || (n === "race" && !this.race?.())) {
        i.kind = "gates";
        let c = t.stops[0],
          h = l(s.pos.x, s.pos.z, r.x, r.z, c),
          f = h?.pts || [
            [s.pos.x, s.pos.z],
            [c.x, c.z],
          ],
          u = h?.len || Math.hypot(c.x - s.pos.x, c.z - s.pos.z);
        i.cps = [];
        let d = 0;
        for (let p = 1; p < f.length; p++)
          ((d += Math.hypot(f[p][0] - f[p - 1][0], f[p][1] - f[p - 1][1])),
            d >= ASt &&
              p < f.length - 1 &&
              (i.cps.push({ x: f[p][0], z: f[p][1] }), (d = 0)));
        (i.cps.push({ x: c.x, z: c.z, fin: !0 }),
          (i.pts = f),
          (i.len = u),
          (i.par = u / Hit.trial[t.tier] + 4),
          (i.limit = i.par * 1.6));
      } else if (n === "race") {
        let c = this.race();
        i.raceId = "ch_" + t.id;
        try {
          c.startSolo({
            kind: "path",
            id: i.raceId,
            name: t.name,
            sub: t.sub,
            from: [t.x, t.z],
            to: t.to,
          });
        } catch (h) {
          console.warn("challenge race", h);
        }
        if (!c.S) return "No race fits here";
        i.limit = 1e9;
      } else if (n === "police") {
        let c = this.police();
        ((i.esc0 = c.escapes),
          (i.bust0 = c.busts),
          (i.limit = t.secs || 120),
          (c.heat = Math.min(5, (t.heat || 1) + 0.05)),
          c.startPursuit?.("STREET CHALLENGE"));
      } else
        n === "nearmiss"
          ? (i.limit = t.secs || 60)
          : n === "photo" && ((i.limit = 150), (i.framed = 0), (i.score = 0));
      return (
        (this.active = i),
        (this.near = null),
        (this.lp = { x: s.pos.x, z: s.pos.z }),
        n === "stops" &&
          this.handoff &&
          (i.ho =
            this.handoff(i, t.spot || { x: s.pos.x, z: s.pos.z }, "pickup") ||
            null),
        this.events.push({ type: "start", d: t, A: i }),
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
    finish(t, e, s, n, i = {}) {
      (t.auto && e > 1 && ((e = 1), (i.l5 = !0)),
        (this.active = null),
        this.events.push({
          type: "result",
          d: t.d,
          A: t,
          stars: e,
          val: s,
          q: n,
          care: t.d.cat === "food" || t.d.cat === "vip" ? t.care : null,
          ...i,
        }));
    }
    update(t, e = !0, s = []) {
      this.t = (this.t || 0) + t;
      let n = this.v,
        i = this.active,
        a = n.pos.x,
        r = n.pos.z,
        l = this.lp && Math.hypot(a - this.lp.x, r - this.lp.z) > 80;
      if (((this.lp = { x: a, z: r }), !i)) {
        this.near = e ? this.findNear() : null;
        for (let h of s) this._seen.add(h);
        return;
      }
      if (l && i.kind !== "race") {
        this.cancel("teleport");
        return;
      }
      if (!e && i.kind !== "race" && i.kind !== "photo") {
        i.paused = !0;
        return;
      }
      if (i.ho && i.ho.phase === "pickup")
        if (i.ho.done) i.ho = null;
        else {
          let h = i.d.spot;
          if (h && Math.hypot(h.x - a, h.z - r) > Nit + 16)
            (i.ho.cancel?.(), (i.ho = null));
          else {
            i.handing = !0;
            return;
          }
        }
      if (
        ((i.handing = !1),
        (i.paused = !1),
        (i.t += t),
        this.auto?.() && (i.auto = !0),
        i.d.cat === "food" || i.d.cat === "vip")
      )
        this.careStep(i, t, s);
      else for (let h of s) this._seen.add(h);
      let c = Math.abs(n.speed ?? Math.hypot(n.vel.x, n.vel.z));
      switch (i.kind) {
        case "stops": {
          let h = i.legs[i.i],
            f = h.S,
            u = Math.min(
              Math.hypot(f.x - a, f.z - r),
              f.alt ? Math.hypot(f.alt.x - a, f.alt.z - r) : 1e9,
            );
          if (((i.dist = u), i.d.cat === "taxi")) {
            if (((i.clock -= t), i.clock <= 0)) {
              this.cancel("time");
              return;
            }
          } else if (i.t > i.limit) {
            this.cancel(i.d.cat === "food" ? "cold" : "time");
            return;
          }
          if (
            (i.d.cat === "food" && (i.temp = Math.max(0, 1 - i.t / i.limit)),
            i.d.cat === "vip" && i.care < 0.3)
          ) {
            this.cancel("vip");
            return;
          }
          if (i.d.cat === "food" && i.care < 0.15) {
            this.cancel("spilt");
            return;
          }
          if (
            ((i.stopT = u < R4.r && c < R4.v ? i.stopT + t : 0),
            i.ho &&
              !i.ho.done &&
              u > R4.r + 8 &&
              (i.ho.cancel?.(), (i.ho = null)),
            i.stopT >= R4.t &&
              this.handoff &&
              !i.ho?.done &&
              (i.ho || (i.ho = this.handoff(i, f, "drop") || { done: !0 }),
              !i.ho.done))
          ) {
            i.handing = !0;
            return;
          }
          if (
            i.stopT >= R4.t &&
            ((i.ho = null),
            (i.handing = !1),
            i.i++,
            (i.stopT = 0),
            this.events.push({
              type: "stop",
              d: i.d,
              A: i,
              n: i.i,
              of: i.legs.length,
            }),
            i.d.cat === "taxi" &&
              i.i < i.legs.length &&
              (i.clock += i.legs[i.i].par * 1.45),
            i.i >= i.legs.length)
          ) {
            let d = Dit(i.t / i.par);
            (i.d.cat === "food" &&
              (d = Math.max(
                1,
                d - (i.care < 0.6 ? 1 : 0) - (i.care < 0.35 ? 1 : 0),
              )),
              i.d.cat === "vip" &&
                (d = Math.min(d, i.care >= 0.85 ? 3 : i.care >= 0.6 ? 2 : 1)),
              this.finish(i, Math.max(1, d), i.t, -i.t + (i.care || 0) * 10, {
                par: i.par,
              }));
          }
          return;
        }
        case "gates": {
          let h = i.cps[i.i],
            f = Math.hypot(h.x - a, h.z - r);
          if (((i.dist = f), i.t > i.limit)) {
            this.cancel("time");
            return;
          }
          f < (h.fin ? 16 : 22) &&
            (i.i++,
            this.events.push({
              type: "cp",
              d: i.d,
              A: i,
              n: i.i,
              of: i.cps.length,
            }),
            i.i >= i.cps.length &&
              this.finish(i, Math.max(1, Dit(i.t / i.par)), i.t, -i.t, {
                par: i.par,
              }));
          return;
        }
        case "race": {
          !this.race?.()?.S && !i.got
            ? (i.gone = (i.gone || 0) + t) > 0.6 && this.cancel("quit")
            : (i.gone = 0);
          return;
        }
        case "police": {
          let h = this.police?.();
          if (!h) {
            this.cancel("off");
            return;
          }
          if (h.busts > i.bust0) {
            this.cancel("busted");
            return;
          }
          if (h.escapes > i.esc0) {
            let f = i.t / i.limit;
            this.finish(i, f <= 0.45 ? 3 : f <= 0.7 ? 2 : 1, i.t, -i.t, {
              heat: i.d.heat,
            });
            return;
          }
          if (i.t > i.limit) {
            this.cancel("time");
            return;
          }
          !h.pursuit &&
            i.t > 2 &&
            ((h.heat = Math.max(h.heat, 1.02)),
            h.startPursuit?.("STREET CHALLENGE"));
          return;
        }
        case "nearmiss":
          if (i.t >= i.limit) {
            let h = i.d.stars || [3, 6, 10],
              f = i.count,
              u = f >= h[2] ? 3 : f >= h[1] ? 2 : f >= h[0] ? 1 : 0;
            u
              ? this.finish(i, u, f, f)
              : ((this.active = null),
                this.events.push({
                  type: "fail",
                  d: i.d,
                  A: i,
                  why: "few",
                  n: f,
                }));
          }
          return;
        case "photo":
          i.inPhoto ? this.photoClosed() : i.t > i.limit && this.cancel("time");
          return;
      }
    }
    photoFrame(t) {
      let e = this.active;
      if (!e || e.kind !== "photo" || !this.project) return;
      let s = e.d.look,
        n = this.project(s.x, s.y, s.z);
      ((e.t += t), (e.inPhoto = !0));
      let i = n && n[2] && Math.abs(n[0]) < 0.92 && Math.abs(n[1]) < 0.92,
        a = i ? 1 - Math.max(Math.abs(n[0]), Math.abs(n[1])) : 0;
      ((e.inFrame = !!i),
        (e.score = a),
        (e.framed = i ? e.framed + t : 0),
        (e.low = i ? Math.min(e.low ?? 1, a) : 1),
        e.framed >= 0.5 && (e.best = Math.max(e.best || 0, e.low)),
        i &&
          a > 0.7 &&
          e.framed >= 0.8 &&
          e.low > 0.7 &&
          this.finish(e, 3, Math.round(a * 100), a),
        i ? e.framed > 1.2 && ((e.framed = 0.5), (e.low = a)) : (e.low = 1));
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
        i = t.d.cat === "food";
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
      let c = i ? 8.8 : 7.8;
      (t.acc > c &&
        t.acc < 40 &&
        ((t.care = Math.max(0, t.care - (t.acc - c) * (i ? 0.025 : 0.035) * e)),
        (t.harsh = (t.harsh || 0) + e)),
        (n.airTime || 0) > 0
          ? (t.air = Math.max(t.air || 0, n.airTime))
          : ((t.air || 0) > 0.25 &&
              ((t.care = Math.max(0, t.care - (i ? 0.12 : 0.15))),
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
      if (Math.abs(t.speed ?? 0) > RSt) return null;
      let s = null,
        n = Nit;
      for (let i of this.list) {
        if (!uN.has(i.cat)) continue;
        let a = i.spot?.x ?? i.x,
          r = i.spot?.z ?? i.z,
          l = Math.hypot(a - t.pos.x, r - t.pos.z);
        l < n && ((n = l), (s = i));
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
