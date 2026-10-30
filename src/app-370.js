// app 370 — event
// Lines 179326-179653 of readable/app.pretty.js (statement-aligned).
var N8t = /^[a-z][a-z0-9_]{0,39}$/,
  H8t = /^[a-z][a-z0-9_]{0,31}$/,
  D8t = {
    fare_offer: 20,
    js_error: 1,
    crash: 4,
    teleport: 5,
    gfx_change: 10,
    assist_change: 3,
    car_swap: 3,
    garage_open: 5,
    rewind: 5,
    spike_hit: 2,
    roadblock_hit: 2,
    wheel_lost: 2,
    car_reset: 1,
  },
  U8t = {
    fare_offer: 10,
    js_error: 5,
    crash: 40,
    teleport: 30,
    gfx_change: 10,
    assist_change: 20,
    rewind: 20,
    heartbeat: 120,
    car_reset: 60,
  },
  G8t = [
    { name: "drove_5min", kind: "step", label: "Drove 5 minutes" },
    { name: "fare_done", kind: "count", label: "Fares completed" },
    { name: "pursuit_start", kind: "step", label: "Got into a police chase" },
    { name: "car_reset", kind: "count", label: "Car put back on the road" },
    { name: "fps", kind: "value", label: "Frame rate (median)" },
  ],
  PB = () => (typeof window < "u" ? window.mindblown : null),
  f4 = (o) => Math.round(o * 100) / 100;
function CB(o) {
  if (!o || typeof o != "object") return;
  let t = {},
    e = 0;
  for (let [s, n] of Object.entries(o)) {
    if (e >= 8) break;
    let i = String(s).toLowerCase();
    if (H8t.test(i)) {
      if (typeof n == "number") {
        if (!Number.isFinite(n)) continue;
        t[i] = f4(n);
      } else if (typeof n == "boolean") t[i] = n;
      else if (typeof n == "string") t[i] = n.slice(0, 120);
      else continue;
      e++;
    }
  }
  for (let s = 120; JSON.stringify(t).length > 1024 && s > 0; s -= 30)
    for (let n in t) typeof t[n] == "string" && (t[n] = t[n].slice(0, s));
  if (JSON.stringify(t).length > 1024)
    for (let s in t) typeof t[s] == "string" && delete t[s];
  return e ? t : void 0;
}
var V8t = (o) =>
    o < 30
      ? "<30"
      : o < 60
        ? "30-60"
        : o < 90
          ? "60-90"
          : o < 120
            ? "90-120"
            : o < 160
              ? "120-160"
              : "160+",
  LB = class {
    constructor() {
      ((this.n = 0),
        (this.last = new Map()),
        (this.count = new Map()),
        (this.log = []),
        (this.started = !1),
        (this.ended = !1),
        (this.paused = new Set()),
        (this.t0 = 0),
        (this.playS = 0),
        (this.km = 0),
        (this.drove5 = !1),
        (this.fpsSent = !1),
        (this.min = { t: 0, km: 0, kmhMax: 0, heat: 0, dts: [] }),
        (this.pollT = 0),
        (this.prev = null),
        (this.chase = null));
      try {
        PB()?.measure?.(G8t);
      } catch {}
    }
    event(t, e) {
      if (!N8t.test(t) || this.n >= 300) return !1;
      let s = performance.now() / 1e3,
        n = D8t[t] || 0,
        i = this.count.get(t) || 0;
      if ((n && s - (this.last.get(t) ?? -1e9) < n) || i >= (U8t[t] ?? 50))
        return !1;
      let a = CB(e);
      (this.last.set(t, s),
        this.count.set(t, i + 1),
        this.n++,
        this.log.push([t, a]),
        this.log.length > 400 && this.log.shift());
      try {
        PB()?.event?.(t, a);
      } catch {}
      return !0;
    }
    run(t, e) {
      this.log.push(["run_" + t, CB(e)]);
      try {
        PB()?.run?.[t]?.(...(e ? [CB(e)] : []));
      } catch {}
    }
    start(t) {
      this.started ||
        ((this.started = !0),
        (this.t0 = performance.now()),
        this.run("start"),
        this.event("session_info", t),
        typeof document < "u" &&
          (document.addEventListener("visibilitychange", () =>
            this.pause("hidden", document.hidden),
          ),
          addEventListener("pagehide", () => this.end())));
    }
    pause(t, e) {
      if (!this.started || this.ended) return;
      let s = this.paused.size;
      (e ? this.paused.add(t) : this.paused.delete(t),
        !s && this.paused.size
          ? this.run("pause")
          : s && !this.paused.size && this.run("resume"));
    }
    end() {
      !this.started ||
        this.ended ||
        ((this.ended = !0),
        this.run("end", {
          seconds: Math.round(this.playS),
          km: this.km,
          resets: this.count.get("car_reset") || 0,
          fares: this.count.get("fare_done") || 0,
          chases: this.count.get("pursuit_start") || 0,
          fare_state: String(this.rides?.state || "none"),
        }));
    }
    reset(t, e) {
      this.event("car_reset", {
        why: t,
        kmh: Math.round(e || 0),
        play_min: f4(this.playS / 60),
      });
    }
    crash(t) {
      let e = t.parked
        ? "parked"
        : t.C?.traffic
          ? t.C.traffic.cop
            ? "police"
            : "traffic"
          : t.car
            ? "car"
            : t.C?.prop
              ? "prop"
              : "wall";
      this.event("crash", {
        what: e,
        speed: V8t(t.v * 3.6),
        kmh: Math.round(t.v * 3.6),
      });
    }
    frame(t, e, s, n) {
      if (!this.started || this.ended || !e || !(t > 0) || t > 0.5) return;
      ((this.playS += t), (this.km += (s / 3600) * t));
      let i = this.min;
      if (
        ((i.t += t),
        (i.kmhMax = Math.max(i.kmhMax, s)),
        i.dts.length < 4e3 && i.dts.push(t),
        !this.drove5 &&
          this.playS > 300 &&
          ((this.drove5 = !0), this.event("drove_5min")),
        (this.pollT += t) >= 0.25)
      ) {
        this.pollT = 0;
        try {
          this.poll(n());
        } catch {}
      }
      if (i.t >= 60) {
        let a = this.fpsOf(i.dts),
          r = this.prev || {};
        (this.event("heartbeat", {
          km: f4(this.km),
          kmh_avg: Math.round((this.km - i.km) / (i.t / 3600)),
          kmh_max: Math.round(i.kmhMax),
          fps: a,
          quality: r.quality,
          heat: i.heat,
          assist: r.assist,
          traffic: !!r.traffic,
        }),
          !this.fpsSent &&
            this.playS > 110 &&
            ((this.fpsSent = !0),
            this.event("fps", { value: a, quality: r.quality, tier: r.tier })),
          (this.min = { t: 0, km: this.km, kmhMax: 0, heat: 0, dts: [] }));
      }
    }
    fpsOf(t) {
      if (!t.length) return 0;
      let e = t.slice().sort((s, n) => s - n);
      return Math.round(1 / e[e.length >> 1]);
    }
    poll(t) {
      let e = this.prev;
      if (((this.prev = t), !e)) return;
      let s = t.police;
      if (s) {
        if (
          ((this.min.heat = Math.max(this.min.heat, s.level)),
          s.pursuit && !this.chase)
        )
          ((this.chase = {
            t: this.playS,
            max: Math.max(1, s.level),
            esc: s.escapes,
            busts: s.busts,
          }),
            this.event("pursuit_start", {
              why: String(s.reason || "").toLowerCase(),
              level: Math.max(1, s.level),
              kmh: Math.round(t.kmh),
            }));
        else if (s.pursuit && s.level > this.chase.max)
          ((this.chase.max = s.level),
            this.event("pursuit_level", {
              level: s.level,
              seconds: Math.round(this.playS - this.chase.t),
            }));
        else if (!s.pursuit && this.chase) {
          let n = this.chase,
            i =
              s.escapes > n.esc
                ? "evaded"
                : s.busts > n.busts
                  ? "busted"
                  : "ended";
          ((this.chase = null),
            this.event("pursuit_" + i, {
              level: n.max,
              seconds: Math.round(this.playS - n.t),
              spikes: !!t.tyres,
            }));
        }
        (e.police &&
          s.pops > e.police.pops &&
          !e.tyres &&
          this.event("spike_hit", { level: s.level, kmh: Math.round(t.kmh) }),
          e.police &&
            s.blockHits > e.police.blockHits &&
            this.event("roadblock_hit", {
              level: s.level,
              kmh: Math.round(t.kmh),
            }));
      }
      (t.wreckN > e.wreckN &&
        this.event("wreck", { kmh: Math.round(t.kmh), car: t.car }),
        t.handed > e.handed && this.event("wreck_drove_on"),
        t.wheelOff &&
          !e.wheelOff &&
          this.event("wheel_lost", { car: t.car, kmh: Math.round(t.kmh) }),
        t.car !== e.car && this.event("car_swap", { car: t.car, from: e.car }),
        (t.quality !== e.quality || t.tier !== e.tier) &&
          this.event("gfx_change", {
            quality: t.quality,
            tier: t.tier,
            from: e.quality,
            fps: this.fpsOf(this.min.dts),
          }),
        t.assist !== e.assist &&
          this.event("assist_change", { assist: t.assist, from: e.assist }),
        t.rewind &&
          !e.rewind &&
          this.event("rewind", { kmh: Math.round(t.kmh) }));
    }
    ride(t, e, s) {
      if (((this.rides = s), t === "offer"))
        this.event("fare_offer", {
          n: (s?.rides || 0) + 1,
          trip_km: f4((e.req?.tripLen || 0) / 1e3),
          fare: e.req?.fare || 0,
          play_min: f4(this.playS / 60),
        });
      else if (t === "pickup")
        this.event("fare_start", {
          style: e.ride?.style || "taxi",
          fare: e.ride?.fare || 0,
          n: (s?.rides || 0) + 1,
        });
      else if (t === "dropoff") {
        let n = e.summary || {};
        this.event("fare_done", {
          style: n.style || (n.bounty !== void 0 ? "street" : "taxi"),
          total: n.total || 0,
          km: n.km || 0,
          seconds: Math.round(n.time || 0),
          late: Math.round((n.time || 0) - (n.par || 0)),
          stars: n.stars || 0,
          comfort: Math.round(n.comfort || 0),
          robot: !!n.robot,
        });
      } else
        t === "cancel"
          ? this.event("fare_cancel")
          : t === "busted" &&
            e.fare &&
            this.event("fare_lost", { fare: e.fare, why: "busted" });
    }
  },
  Dr = new LB();
es();
Pn();
