// app 369 — math
// Lines 178373-179325 of readable/app.pretty.js (statement-aligned).
var Ca = (o) => document.getElementById(o),
  Ent = { pickup: "#3fd6c6", dropoff: "#ffb347" },
  yr = (o) =>
    (o < 0 ? "\u2212$" : "$") + Math.abs(o).toFixed(2).replace(/\.00$/, ""),
  Yf = (o) => {
    let t = Math.abs(Math.round(o));
    return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
  },
  c1 = (o) => Math.round(o).toLocaleString("en-US"),
  AB = (o) => o.toFixed(2).replace(/\.?0+$/, ""),
  ya = (o) =>
    String(o).replace(
      /[&<>"]/g,
      (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t],
    ),
  aT = class {
    constructor({
      rides: t,
      scene: e,
      map: s,
      audio: n,
      pedTex: i = null,
      L: a,
      mph: r = () => !0,
      carName: l = () => "Waymo",
    }) {
      ((this.carName = l),
        (this.R = t),
        (this.map = s),
        (this.audio = n),
        (this.L = a),
        (this.mph = r),
        (this.group = new le()),
        (this.group.name = "Taxi"),
        e.add(this.group),
        (this.beacon = this._beacon()),
        this.group.add(this.beacon));
      let c = new me({ color: 16777215, roughness: 0.8, metalness: 0, map: i });
      if (
        ((c.userData.mbAlbedo = pp),
        (c.userData.mbWind = -1),
        (c.userData.mbSkyVis = 2),
        (c.name = "passenger"),
        (this.pedMat = c),
        (this.peds = n0.map((h, f) => {
          let u = new En(dp(h, 0), c, 1);
          return (
            (u.count = 1),
            (u.visible = !1),
            (u.frustumCulled = !1),
            (u.castShadow = !0),
            (u.receiveShadow = !0),
            (u.name = "passenger" + f),
            (u.userData.mbMover = !0),
            u.setColorAt(0, new It(1, 1, 1)),
            (u.boundingSphere = new _n(new dt(), 2)),
            this.group.add(u),
            u
          );
        })),
        (this.vox = i0() ? new Q0("PassengerVox", 1, { shadows: 1 }) : null),
        this.vox)
      ) {
        this.group.add(this.vox.group);
        for (let h of this.peds) h.visible = !1;
      }
      ((this.p = null),
        (this.hudT = 0),
        (this.pops = []),
        (this.sumT = 0),
        (this.el = {
          card: Ca("taxiCard"),
          trip: Ca("taxiTrip"),
          total: Ca("taxiTotal"),
          pen: Ca("taxiPen"),
          sum: Ca("taxiSum"),
          hint: Ca("taxiHint"),
        }),
        this.total(),
        document.body.classList.add("waymo"));
    }
    _beacon() {
      let t = new le();
      ((t.name = "TaxiBeacon"), (t.visible = !1));
      let e = new v0(1.55, 2.25, 56, 1);
      e.rotateX(-Math.PI / 2);
      let s = (h, f = 1) =>
          new ye(
            h,
            new Ys({
              color: 16777215,
              transparent: !0,
              opacity: f,
              depthWrite: !1,
              blending: $o,
              side: ls,
              fog: !1,
              vertexColors: !!h.attributes.color,
            }),
          ),
        n = s(e, 0.9),
        i = s(new da(1.55, 48).rotateX(-Math.PI / 2), 0.16),
        a = new vs(0.75, 0.75, 46, 28, 6, !0);
      a.translate(0, 23, 0);
      {
        let h = a.attributes.position,
          f = new Float32Array(h.count * 4);
        for (let u = 0; u < h.count; u++) {
          let d = h.getY(u) / 46;
          f.set([1, 1, 1, 0.5 * Math.pow(1 - d, 1.6)], u * 4);
        }
        a.setAttribute("color", new Te(f, 4));
      }
      let r = s(a, 1),
        l = new vs(0.16, 0.16, 46, 12, 6, !0);
      (l.translate(0, 23, 0),
        l.setAttribute("color", a.attributes.color.clone()));
      {
        let h = l.attributes.position,
          f = l.attributes.color;
        for (let u = 0; u < h.count; u++)
          f.setW(u, 0.9 * Math.pow(1 - h.getY(u) / 46, 1.2));
      }
      let c = s(l, 1);
      for (let h of [n, i, r, c])
        ((h.renderOrder = 4),
          (h.castShadow = h.receiveShadow = !1),
          (h.userData.mbNoReflect = !0),
          t.add(h));
      return (
        Object.assign(t.userData, { ring: n, disc: i, beam: r, core: c }),
        t
      );
    }
    _beaconAt(t, e, s, n) {
      let i = this.beacon,
        a = i.userData,
        r = new It(Ent[e]);
      ((i.visible = !0),
        i.position.set(
          t.x,
          (this.L?.driveHeight(t.x, t.z) ?? t.y) + 0.06,
          t.z,
        ));
      let l = Math.min(1, Math.max(0, (n - 9) / 30)),
        c = 0.5 + 0.5 * Math.sin(s * 3.2);
      for (let h of [a.ring, a.disc]) h.material.color.copy(r);
      ((a.ring.material.opacity = 0.65 + 0.3 * c),
        a.ring.scale.setScalar(1 + 0.06 * c),
        (a.disc.material.opacity = 0.12 + 0.08 * c),
        a.beam.material.color.copy(r).multiplyScalar(0.55 * (0.25 + 0.75 * l)),
        a.core.material.color.copy(r).multiplyScalar(0.9 * (0.2 + 0.8 * l)));
    }
    _ped(t) {
      if (this.vox) {
        ((this.vox.group.visible = !!(t && this.p)), t || this.vox.hide());
        return;
      }
      for (let e of this.peds) e.visible = !1;
      t && this.p && (this.peds[this.p.b].visible = !0);
    }
    _voxPose(t = 0) {
      let e = this.p,
        s = this._v;
      if (!e || !this.vox) return;
      if (!e.look) {
        let p =
            Math.floor((e.seeds[0] * 1e6 + e.seeds[1] * 1e3) % 2147483646) + 1,
          m = () => (p = (p * 16807) % 2147483647) / 2147483647;
        e.look = uf(m);
      }
      let n = this.R.state,
        i = s ? Math.hypot(s.pos.x - e.x, s.pos.z - e.z) : 1e9,
        a = this._cam,
        r = Rn.phone,
        l = null,
        c = 0,
        h = 1,
        f = e.x,
        u = e.z,
        d = e.y;
      (e.duckT > 0
        ? ((c = 1 - e.duckT / 0.45),
          (r = Rn.duck),
          (l = li.grin),
          s && ((f += (s.pos.x - f) * c * 0.6), (u += (s.pos.z - u) * c * 0.6)),
          (h = 1 - 0.35 * c))
        : e.walk
          ? ((r = 0), (l = e.leaving ? li.hearts : li.grin))
          : n === "offer" && i < 60
            ? ((r = Rn.wave), (l = i < 25 ? li.grin : null))
            : n === "boarding" && ((r = 0), (l = li.grin)),
        this.vox.begin(t),
        this.vox.put(
          e,
          f,
          d,
          u,
          e.hx,
          e.hz,
          a ? Math.hypot(a.position.x - f, a.position.z - u) : 10,
          {
            speed: e.walk ? 1.35 : 0,
            pose: r,
            look: l,
            k: c,
            scale: h,
            lookAt: !e.walk && s && i < 30 ? [s.pos.x, s.pos.z] : null,
          },
        ),
        this.vox.end());
    }
    _pedPose(t = 0) {
      let e = this.p;
      if (!e) return;
      if (this.vox) {
        this._voxPose(t);
        return;
      }
      let s = this.peds[e.b],
        n = s.instanceMatrix.array,
        i = 1,
        a = i * 0.98,
        r = e.hx,
        l = e.hz,
        c = e.walk ? (2 * Math.PI * 1.35) / (1.37 * i) : 0;
      ((n[0] = l * a),
        (n[1] = 0),
        (n[2] = -r * a),
        (n[3] = e.ph),
        (n[4] = 0),
        (n[5] = i),
        (n[6] = 0),
        (n[7] = c),
        (n[8] = r * a),
        (n[9] = 0),
        (n[10] = l * a),
        (n[11] = e.walk ? 0 : 2),
        (n[12] = e.x),
        (n[13] = e.y),
        (n[14] = e.z),
        (n[15] = 1));
      let h = s.instanceColor.array;
      ((h[0] = e.seeds[0]),
        (h[1] = e.seeds[1]),
        (h[2] = e.seeds[2]),
        (s.instanceMatrix.needsUpdate = !0),
        (s.instanceColor.needsUpdate = !0),
        s.boundingSphere.center.set(e.x, e.y + 0.9, e.z));
    }
    _walk(t, e) {
      if (!t.path?.length) {
        t.walk = !1;
        return;
      }
      let [s, n] = t.path[0],
        i = s - t.x,
        a = n - t.z,
        r = Math.hypot(i, a),
        l = 1.35 * e;
      ((t.walk = !0),
        r > 0.001 && ((t.hx = i / r), (t.hz = a / r)),
        r <= l
          ? ((t.x = s), (t.z = n), t.path.shift())
          : ((t.x += (i / r) * l), (t.z += (a / r) * l)),
        (t.y = this.L?.driveHeight(t.x, t.z) ?? t.y));
    }
    _door(t, e) {
      let s = Math.cos(t.psi),
        n = -Math.sin(t.psi),
        i = (e.px - t.pos.x) * s + (e.pz - t.pos.z) * n >= 0 ? 1 : -1;
      return [t.pos.x + s * i * 1.2, t.pos.z + n * i * 1.2];
    }
    update(t, e, s, n = null) {
      ((this._v = e), (this._fdt = t), n && (this._cam = n));
      let i = this.R,
        a = kd();
      ((this.em = a.on ? a : null),
        this.em &&
          ((i.waitSeat = !0),
          this.vox && this.p && ((this.p = null), this._ped(!1))),
        i.update(t, e, s));
      for (let f of i.events.splice(0)) this._event(f, e);
      if (this.em) {
        (this._fare(t, e, s), this._overlay(i));
        return;
      }
      let r = i.state,
        l = i.target,
        c = i.t;
      l && (r === "offer" || r === "ride")
        ? this._beaconAt(
            l,
            r === "offer" ? "pickup" : "dropoff",
            c,
            i.dist ?? 99,
          )
        : (this.beacon.visible = !1);
      let h = this.p;
      if (h) {
        if (h.duckT > 0)
          ((h.duckT -= t), h.duckT <= 0 && ((this.p = null), this._ped(!1)));
        else if (r === "ride" && !h.leaving) ((this.p = null), this._ped(!1));
        else if (r === "boarding" && !h.boarded) {
          if (
            ((h.path = [this._door(e, i.req.fromK || i.req.from)]),
            this._walk(h, t),
            !h.path.length && e.speed < i.K.stopV)
          ) {
            ((h.boarded = !0), this._ped(!1), i.seat(e, s));
            for (let f of i.events.splice(0)) this._event(f, e);
          }
        } else if (h.leaving)
          (this._walk(h, t),
            !h.path.length &&
              (h.gone = (h.gone || 0) + t) > 0.3 &&
              ((this.p = null), this._ped(!1)));
        else if (r === "offer") {
          h.walk = !1;
          let f = i.req.fromK || i.req.from;
          ((h.hx = f.x - h.x), (h.hz = f.z - h.z));
          let u = Math.hypot(h.hx, h.hz) || 1;
          ((h.hx /= u), (h.hz /= u));
        }
        this.p &&
          (!h.boarded || h.duckT > 0) &&
          ((h.ph += t * 0), this._pedPose(t));
      }
      this._overlay(i);
    }
    _overlay(t) {
      let e = t.state,
        s = t.target;
      (this.em &&
        (s && (e === "offer" || e === "ride")
          ? this._beaconAt(
              s,
              e === "offer" ? "pickup" : "dropoff",
              t.t,
              t.dist ?? 99,
            )
          : (this.beacon.visible = !1)),
        this.map &&
          (this.map.overlay =
            s && t.route && (e === "offer" || e === "ride")
              ? {
                  route: t.route.pts.slice(Math.max(0, (t.route.i || 0) - 1)),
                  target: {
                    x: s.x,
                    z: s.z,
                    col: Ent[e === "offer" ? "pickup" : "dropoff"],
                    glyph: e === "offer" ? "P" : "D",
                    label: s.name,
                  },
                }
              : null));
      let n = this._fdt || 0,
        i = this._v;
      (this.hudT -= n) <= 0 && ((this.hudT = 0.1), this.hud(i));
      for (let a = this.pops.length - 1; a >= 0; a--) {
        let r = this.pops[a];
        ((r.t -= n), r.t <= 0 && (r.el.remove(), this.pops.splice(a, 1)));
      }
      this.sumT > 0 &&
        (this.sumT -= n) <= 0 &&
        this.el.sum?.classList.remove("on");
    }
    cancelled(t) {
      (this.pp &&
        !this.pp.gone &&
        this.pp.mode !== "leave" &&
        this._leave(this.pp, this.ppS),
        (this.p = null),
        this._ped(!1),
        (this.beacon.visible = !1),
        this.map && (this.map.overlay = null),
        this.popup(
          t ? "Ride cancelled" : "Fare re-offered",
          t
            ? "Teleported - no charge, no penalty"
            : "A new request near where you land",
          "info",
          3.2,
        ));
    }
    _event(t, e) {
      let s = this.audio?.(),
        n = this.R;
      if ((this.em && this._fareEvent(t, e), t.type === "offer")) {
        let i = t.req,
          a = i.fromK || i.from;
        if (((this.offerT = n.t), !this.em)) {
          this.p = {
            b: i.build,
            seeds: i.seeds,
            x: a.px,
            z: a.pz,
            y: a.py,
            hx: a.x - a.px,
            hz: a.z - a.pz,
            ph: i.seeds[0] * 6.28,
            walk: !1,
            path: null,
            boarded: !1,
            leaving: !1,
          };
          {
            let r = Math.hypot(this.p.hx, this.p.hz) || 1;
            ((this.p.hx /= r), (this.p.hz /= r));
          }
          (this._ped(!0), this._pedPose());
        }
        s?.ui1("taxi_chime", 0.55);
      } else if (t.type === "reassign")
        this.popup("Ride reassigned", "A closer fare", "info");
      else if (t.type === "arrive")
        s?.ui1("car_door", 0.8, 0.95 + Math.random() * 0.1);
      else if (t.type === "left") {
        let i = (n.req || n.ride)?.name || "The passenger";
        t.phase === "boarding"
          ? (this.popup(
              `Wait for ${i}`,
              "Stop at the kerb to pick them up",
              "bad",
            ),
            this.p &&
              !this.p.leaving &&
              ((this.p.path = null),
              (this.p.boarded = !1),
              (this.p.walk = !1),
              this._ped(!0),
              this._pedPose()))
          : this.popup(
              `${i} is still aboard`,
              "Stop at the kerb to let them out",
              "bad",
            );
      } else if (t.type === "pickup")
        (this.p &&
          !this.p.leaving &&
          (this.vox && this.p.boarded
            ? ((this.p.duckT = 0.45), this._ped(!0))
            : ((this.p = null), this._ped(!1))),
          s?.ui1("taxi_chime", 0.7),
          this.popup(
            `${t.ride.name} is aboard`,
            `To ${t.ride.to.name}`,
            "info",
          ),
          t.ride.first &&
            (t.ride.style === "street"
              ? this.popup(
                  "Build your bounty",
                  "Near misses, drifts, air, top speed \xB7 lose the cops to bank it",
                  "nfs",
                  6,
                )
              : this.popup(
                  "Tip: drive smoothly",
                  "Gentle starts, stops and corners earn tips \xB7 no bumps",
                  "good",
                  6,
                )));
      else if (t.type === "skill")
        (this.total(),
          this.popup(
            t.label,
            `+${c1(t.pts)}${t.mult > 1 ? "  \xD7" + AB(t.mult) : ""}${t.line ? "  \xB7  \u201C" + t.line + "\u201D" : ""}`,
            "nfs" + (t.key === "evade" || t.key === "hot" ? " big" : ""),
            t.key === "evade" || t.key === "hot" ? 3.2 : 1.8,
          ));
      else if (t.type === "bank")
        (this.popup(
          "Bounty banked",
          `${c1(t.pts)}  \xB7  +${yr(t.cash)}`,
          "nfs big",
          3.2,
        ),
          s?.ui1("fare_ding", 0.5),
          this.total());
      else if (t.type === "busted")
        (this.popup(
          "Busted",
          [
            t.fare
              ? `Fare lost${t.name ? " \xB7 " + t.name + " got out" : ""}`
              : "",
            t.pts ? `Bounty lost (${c1(t.pts)})` : "",
          ]
            .filter(Boolean)
            .join(" \xB7 "),
          "bad",
          4,
        ),
          this.p && !this.p.leaving && ((this.p = null), this._ped(!1)),
          this.total());
      else if (t.type === "crash")
        t.lost && this.popup("Multiplier lost", "", "nfs dim", 1.4);
      else if (t.type === "smooth")
        this.popup(
          `Smooth ride +${yr(t.bonus)}`,
          "Your passenger is enjoying the ride",
          "good",
        );
      else if (t.type === "penalty")
        this.popup(
          t.label,
          `${yr(-t.cost)} \xB7 comfort \u2212${t.comfort}`,
          "bad",
        );
      else if (t.type === "dropoff") {
        (s?.ui1("taxi_done", 0.7),
          setTimeout(() => this.audio?.()?.ui1("fare_ding", 0.6), 650));
        let i = t.summary && (n.last?.toK || n.last?.to),
          a = n.last;
        if (i && a && !this.em) {
          let [r, l] = this._door(e, i),
            c = i.hx,
            h = i.hz;
          ((this.p = {
            b: a.build,
            seeds: a.seeds,
            x: r,
            z: l,
            y: i.py,
            hx: i.px - r,
            hz: i.pz - l,
            ph: 0,
            walk: !0,
            path: [
              [i.px, i.pz],
              [i.px + c * 7, i.pz + h * 7],
            ],
            boarded: !1,
            leaving: !0,
          }),
            this._ped(!0),
            this._pedPose());
        }
        (this.summary(t.summary), this.total());
      }
    }
    _door2(t, e) {
      if (e?.look) return this.em.carDoor(t, e, 0.35);
      let s = Math.cos(t.psi),
        n = -Math.sin(t.psi),
        i = -Math.sin(t.psi),
        a = -Math.cos(t.psi),
        r = e ? e.bx : t.pos.x,
        l = e ? e.bz : t.pos.z,
        c = (r - t.pos.x) * s + (l - t.pos.z) * n >= 0 ? 1 : -1;
      return [
        t.pos.x + s * c * 1.45 - i * 0.35,
        t.pos.z + n * c * 1.45 - a * 0.35,
      ];
    }
    _leaveSteps(t, e, s = null) {
      return this.em.leaveSteps(t, e ? [e.hx || 1, e.hz || 0] : null, s);
    }
    _leave(t, e, s = null) {
      !t ||
        t.gone ||
        ((t.steps = this._leaveSteps(t, e, s)),
        (t.cur = null),
        (t.mode = "leave"));
    }
    _fareEvent(t, e) {
      let s = this.R,
        n = this.em;
      if (t.type === "offer") {
        this.pp && this._leave(this.pp, this.ppS);
        let i = t.req,
          a = i.fromK || i.from,
          r = n.origin(a.px, a.pz, a.hx, a.hz),
          l =
            Math.floor((i.seeds[0] * 1e6 + i.seeds[1] * 1e3) % 2147483646) + 1,
          c = () => (l = (l * 16807) % 2147483647) / 2147483647,
          h = n.add(r.x, r.z, [], {
            look: uf(c, { kid: !1 }),
            hx: a.x - a.px,
            hz: a.z - a.pz,
            tag: "fare",
          });
        if (!h) return;
        ((h.req = i),
          (h.home = r.door || null),
          (h.origin =
            r.door || (r.x === a.px && r.z === a.pz) ? null : [r.x, r.z]),
          (h.mode = "wait"),
          (this.pp = h),
          (this.ppS = a),
          this._waitAt(h, a));
      } else if (t.type === "arrive" && s.state === "alighting" && s.ride) {
        let i = s.ride,
          a = i.toK || i.to,
          r = { bx: a.px, bz: a.pz },
          l = this._door2(e, r),
          c =
            Math.floor(((i.seeds?.[0] ?? Math.random()) * 1e6) % 2147483646) +
            1,
          h = () => (c = (c * 16807) % 2147483647) / 2147483647,
          f = n.add(l[0], l[1], [], {
            look: this.ppLook || uf(h, { kid: !1 }),
            tag: "fare",
          });
        if (!f) return;
        let u = l[0] + (a.px - l[0]) * 0.65,
          d = l[1] + (a.pz - l[1]) * 0.65;
        ((f.steps = [
          { type: "duck", out: !0, car: () => e.pos, dur: 0.5 },
          { type: "go", to: [u, d], r: 0.5, max: 6 },
          {
            type: "wait",
            pose: Rn.phone,
            face: () => [e.pos.x, e.pos.z],
            until: () => !!this.ppSum || s.state !== "alighting",
          },
        ]),
          (f.mode = "alight"),
          (this.pp = f),
          (this.ppS = a),
          (this.ppSum = null));
      } else if (
        t.type === "left" &&
        t.phase === "alighting" &&
        this.pp?.mode === "alight"
      ) {
        let i = this.pp;
        ((i.steps = [
          { type: "go", to: () => this._door2(e, i), r: 0.5, max: 4 },
          { type: "duck", car: () => e.pos },
        ]),
          (i.cur = null),
          (i.mode = "in"));
      } else if (t.type === "dropoff" && this.pp?.mode === "alight") {
        let i = this.pp,
          a = t.summary?.stars ?? 3;
        this.ppSum = t.summary;
        let r =
            a >= 4
              ? i.look.cheer
                ? Rn.cheer
                : Rn.wave
              : a >= 3
                ? Rn.wave
                : Rn.cross,
          l =
            a >= 5
              ? li.hearts
              : a >= 4
                ? li.grin
                : a >= 3
                  ? li.smile
                  : li.angry;
        ((i.steps = [
          {
            type: "wait",
            pose: r,
            expr: l,
            face: () => [e.pos.x, e.pos.z],
            dur: 1.8,
          },
          ...this._leaveSteps(i, this.ppS, a >= 3 ? li.smile : li.neutral),
        ]),
          (i.cur = null),
          (i.mode = "bye"));
      } else
        t.type === "busted" &&
          this.pp &&
          !this.pp.gone &&
          this._leave(this.pp, this.ppS, li.scared);
    }
    _waitAt(t, e) {
      let s = this._v,
        n = () => Math.hypot(s.pos.x - t.bx, s.pos.z - t.bz);
      ((t.steps = []),
        Math.hypot(t.x - e.px, t.z - e.pz) > 0.6 &&
          t.steps.push({
            type: "go",
            to: [e.px, e.pz],
            r: 0.6,
            max: 60,
            pose: Rn.phone,
          }),
        t.steps.push({
          type: "wait",
          about: [e.hx || 1, e.hz || 0],
          pose: () =>
            n() < 38 && this.R.state === "offer" ? Rn.wave : Rn.phone,
          expr: () => (n() < 25 ? li.grin : null),
          face: () => (n() < 60 ? [s.pos.x, s.pos.z] : null),
          until: () => this.R.state === "boarding" || this.R.req !== t.req,
        }),
        (t.cur = null),
        (t.mode = "wait"));
    }
    _fare(t, e, s) {
      let n = this.R,
        i = this.pp;
      if (!i || i.gone) {
        this.pp = null;
        return;
      }
      if (i.mode === "wait" || i.mode === "board") {
        if (
          (n.req !== i.req ||
            (n.state !== "offer" && n.state !== "boarding")) &&
          (n.state !== "ride" || n.req !== i.req)
        ) {
          this._leave(i, this.ppS);
          return;
        }
        n.state === "boarding" && i.mode === "wait"
          ? ((i.steps = [
              {
                type: "go",
                to: () => this._door2(e, i),
                r: 0.45,
                max: 45,
                expr: li.grin,
                reach: e,
              },
              {
                type: "wait",
                pose: 0,
                expr: li.grin,
                face: () => [e.pos.x, e.pos.z],
                until: () => {
                  if (n.state !== "boarding" || e.speed >= n.K.stopV) return !1;
                  ((this.ppLook = i.look), n.seat(e, s));
                  for (let a of n.events.splice(0)) this._event(a, e);
                  return !0;
                },
              },
              { type: "duck", car: () => e.pos },
            ]),
            (i.cur = null),
            (i.mode = "board"))
          : n.state === "offer" &&
            i.mode === "board" &&
            this._waitAt(i, this.ppS);
      }
    }
    hud(t) {
      let e = this.R,
        s = e.state,
        n = this.el,
        i = !this.mph(),
        a = (c) =>
          i
            ? c >= 1e3
              ? (c / 1e3).toFixed(1) + " km"
              : Math.round(c / 10) * 10 + " m"
            : c >= 400
              ? (c / 1609).toFixed(1) + " mi"
              : Math.round((c * 3.281) / 10) * 10 + " ft",
        r = e.req,
        l = e.ride;
      if (
        (document.body.classList.toggle(
          "tx-ride",
          s === "ride" || s === "alighting",
        ),
        n.card)
      ) {
        let c = s === "offer" || s === "boarding";
        if (
          (n.card.classList.toggle("on", c),
          n.card.classList.toggle(
            "compact",
            c && s === "offer" && e.t - (this.offerT ?? e.t) > 7,
          ),
          c && r)
        ) {
          let h = r.name + r.from.name + s;
          n.card.dataset.k !== h &&
            ((n.card.dataset.k = h),
            (n.card.innerHTML = `<div class="tg">${s === "boarding" ? "PICKING UP" : "NEW RIDE"}</div><div class="who"><i style="background:hsl(${Math.round(r.seeds[1] * 360)},55%,48%)">${ya(r.name[0])}</i><div><b>${ya(r.name)}</b><small>\u201C${ya(r.line.replace("{car}", this.carName()))}\u201D</small></div></div><div class="leg"><span class="dot p"></span><div><b>${ya(r.from.name)}</b><small>${ya(r.from.street)}</small></div><em id="txPd"></em></div><div class="leg"><span class="dot d"></span><div><b>${ya(r.to.name)}</b><small>${a(r.tripLen)} \xB7 est. ${yr(r.fare)}${r.toll ? ` (incl. ${yr(r.toll)} bridge toll)` : ""}</small></div></div><div class="one"><span class="dot p"></span>${s === "boarding" ? "Picking up " + ya(r.name) : ya(r.from.name)}<em id="txP1"></em></div>`));
          let f = Ca("txPd");
          f &&
            (f.textContent =
              s === "boarding" ? "boarding\u2026" : a(e.left ?? e.dist ?? 0));
          let u = Ca("txP1");
          u &&
            (u.textContent = s === "boarding" ? "" : a(e.left ?? e.dist ?? 0));
        }
      }
      if (
        n.trip &&
        (n.trip.classList.toggle("on", s === "ride" || s === "alighting"), l)
      ) {
        let c = l.par - l.t,
          h = c < 0,
          f = l.style === "street";
        (n.trip.dataset.k !== l.name + l.to.name + l.style &&
          ((n.trip.dataset.k = l.name + l.to.name + l.style),
          n.trip.classList.toggle("arc", f),
          (n.trip.innerHTML = `<div class="dst"><span class="dot d"></span><div><b>${ya(l.to.name)}</b><small id="txSt">${ya(l.to.street)}</small></div></div><div class="row"><div><small>DISTANCE</small><b id="txDi"></b></div><div><small id="txTl">TIME LEFT</small><b id="txTi"></b></div><div><small>FARE</small><b id="txFa"></b><em id="txPe"></em></div></div><div class="cf"><small id="txCl">${f ? "BOUNTY" : ya(l.name) + " \xB7 COMFORT"}</small><div class="bar"><i id="txCf"></i></div><b id="txCp"></b></div><div class="one"><span class="dot d"></span>${ya(l.to.name)}<em id="txT1"></em></div>`)),
          (Ca("txDi").textContent =
            s === "alighting" ? "arrived" : a(e.left ?? e.dist ?? 0)),
          (Ca("txTi").textContent = (h ? "+" : "") + Yf(c)),
          Ca("txTi").classList.toggle("late", h && !f),
          Ca("txTi").classList.toggle("over", h && f),
          (Ca("txTl").textContent = h
            ? f
              ? "OVERTIME"
              : "LATE"
            : "TIME LEFT"),
          (Ca("txFa").textContent = yr(l.fare)),
          (Ca("txPe").textContent = f ? "" : l.pen ? yr(-l.pen) : ""));
        let u = Ca("txCf");
        if (f) {
          let d = e._cops?.(),
            p = !!d?.pursuit;
          (n.trip.classList.toggle("wanted", p),
            (u.style.transform = `scaleX(${(l.chain ? Math.max(0, l.chainT) / Gf.chainT : 0).toFixed(3)})`),
            (u.style.background = ""),
            (Ca("txCl").textContent = p ? "BOUNTY \xB7 WANTED" : "BOUNTY"),
            (Ca("txCp").textContent =
              c1(e.bounty) + (l.mult > 1 ? "  \xD7" + AB(l.mult) : "")),
            Ca("txCp").classList.toggle("hot", l.mult > 1));
        } else
          ((u.style.transform = `scaleX(${(l.comfort / 100).toFixed(3)})`),
            (u.style.background =
              l.comfort > 75
                ? "#43d17a"
                : l.comfort > 50
                  ? "#ffb347"
                  : "#ff5a4f"),
            (Ca("txCp").textContent = Math.round(l.comfort) + "%"));
        Ca("txT1").textContent =
          (s === "alighting" ? "arrived" : a(e.left ?? e.dist ?? 0)) +
          " \xB7 " +
          (h ? "+" : "") +
          Yf(c);
      }
      if (document.body.classList.contains("touch")) {
        let c = n.card?.classList.contains("on")
            ? n.card
            : n.trip?.classList.contains("on")
              ? n.trip
              : null,
          h = c ? Math.round(c.getBoundingClientRect().bottom) : 0;
        h !== this._txb &&
          ((this._txb = h),
          document.documentElement.style.setProperty("--txb", h + "px"));
      }
      if (n.hint) {
        let c =
          e.near &&
          (s === "offer" || s === "ride") &&
          Math.max(e.dist ?? 99, e.left ?? 0) < 30;
        (n.hint.classList.toggle("on", c),
          c &&
            (n.hint.textContent =
              t.speed > e.K.stopV
                ? "Slow down \xB7 stop at the kerb"
                : "Pull up to the kerb"));
      }
    }
    total() {
      let t = this.R,
        e = this.el.total;
      if (!e) return;
      let s = t.stars.length
        ? (t.stars.reduce((n, i) => n + i, 0) / t.stars.length).toFixed(1)
        : "\u2013";
      e.innerHTML = `<b>${yr(this.wallet ? this.wallet() : t.total)}</b><small>${t.rides} ride${t.rides === 1 ? "" : "s"} \xB7 \u2605 ${s}${t.bounty > 0 ? " \xB7 bounty " + c1(t.bounty) : ""}</small>`;
    }
    popup(t, e, s = "info", n = 2.6) {
      let i = this.el.pen;
      if (!i) return;
      let a = document.createElement("div");
      for (
        a.className = "pop " + s,
          a.innerHTML = `<b>${ya(t)}</b><small>${ya(e)}</small>`,
          i.appendChild(a),
          n !== 2.6 && (a.style.animationDuration = n + "s"),
          this.pops.push({ el: a, t: n });
        this.pops.length > 3;
      )
        this.pops.shift().el.remove();
    }
    summary(t) {
      let e = this.el.sum;
      if (!e) return;
      let s =
          "\u2605\u2605\u2605\u2605\u2605".slice(0, t.stars) +
          "<i>" +
          "\u2605\u2605\u2605\u2605\u2605".slice(t.stars) +
          "</i>",
        n = (i, a, r = "") =>
          `<div class="ln ${r}"><span>${i}</span><b>${a}</b></div>`;
      if (t.style === "street") {
        ((e.innerHTML =
          `<div class="tg">RIDE COMPLETE</div><div class="st">${s}</div><div class="who2">${ya(t.name)} \xB7 ${ya(t.from)} \u2192 ${ya(t.to)}${t.line ? " \xB7 \u201C" + ya(t.line) + "\u201D" : ""}</div>` +
          n("Fare", yr(t.fare)) +
          n(
            t.timeB >= 0
              ? `Speed bonus (${Yf(t.time)} / ${Yf(t.par)})`
              : `Overtime (${Yf(t.time)} / ${Yf(t.par)})`,
            (t.timeB > 0 ? "+" : "") + yr(t.timeB),
            t.timeB > 0 ? "pos" : "",
          ) +
          (t.robot
            ? n("Bounty \xB7 the robot drove", "0")
            : n(
                `Bounty (${t.skills})${t.maxMult > 1 ? " \xB7 best \xD7" + AB(t.maxMult) : ""}`,
                c1(t.bounty),
              )) +
          (t.wanted
            ? n("Wanted \xB7 lose the cops to bank", c1(t.unbanked), "neg")
            : t.bankedPts
              ? n(`Banked (${c1(t.bankedPts)})`, "+" + yr(t.cash), "pos")
              : "") +
          `<div class="tot"><span>EARNED</span><b>${yr(t.total)}</b></div>` +
          this.lbLine()),
          e.classList.add("on"),
          (this.sumT = 5.5));
        return;
      }
      ((e.innerHTML =
        `<div class="tg">RIDE COMPLETE</div><div class="st">${s}</div><div class="who2">${ya(t.name)} \xB7 ${ya(t.from)} \u2192 ${ya(t.to)}</div>` +
        n("Fare", yr(t.fare)) +
        n(
          t.timeB >= 0
            ? `On time (${Yf(t.time)} / ${Yf(t.par)})`
            : `Late (${Yf(t.time)} / ${Yf(t.par)})`,
          yr(t.timeB),
          t.timeB < 0 ? "neg" : "",
        ) +
        n(
          `Tip \xB7 comfort ${Math.round(t.comfort)}%${t.robot ? " \xB7 the robot drove" : ""}`,
          yr(t.tip),
        ) +
        (t.smooth ? n("Smooth driving", "+" + yr(t.smooth), "pos") : "") +
        (t.pen
          ? n(
              `Penalties (${t.penalties.length})${t.capped ? " \xB7 capped" : ""}`,
              yr(-t.pen),
              "neg",
            )
          : "") +
        `<div class="tot"><span>EARNED</span><b>${yr(t.total)}</b></div>` +
        this.lbLine()),
        e.classList.add("on"),
        (this.sumT = 5.5));
    }
    lbLine() {
      let t = this.lbHint?.();
      return t === void 0 ? "" : `<div class="lbh" id="txLb">${ya(t)}</div>`;
    }
  };
