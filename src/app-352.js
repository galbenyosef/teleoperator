// app 352 — math
// Lines 171516-172231 of readable/app.pretty.js (statement-aligned).
var CF = 1.35,
  ztt = 8,
  Ett = null,
  Wu = () => Ett || (Ett = new LF()),
  LF = class {
    constructor() {
      ((this.list = []),
        (this.crowd = null),
        (this.world = null),
        (this.L = null),
        (this.peds = null),
        (this.statics = null),
        (this.nav = null),
        (this.t = 0),
        (this.stats = { spawned: 0, gone: 0, popped: 0, maxStep: 0 }),
        (this.frustum = new No()),
        (this._pv = new ye()),
        (this._sph = new _n(new xt(), 1.2)));
    }
    get on() {
      return !!this.crowd;
    }
    attach({ scene: t, world: e, L: s, peds: n }) {
      return this.crowd || !Or()
        ? this
        : ((this.crowd = new R0("ErrandVox", ztt, { shadows: 1 })),
          t.add(this.crowd.group),
          (this.world = e),
          (this.L = s),
          (this.peds = n),
          (this.statics = e ? oy(e) : null),
          (this.nav = new Od({
            statics: (o, a, r, l, c) =>
              this.statics && this.statics(o, a, r, l, c),
          })),
          this);
    }
    door(t, e, s = 16) {
      if (!this.world?.grid) return null;
      let n = null,
        o = s,
        a = 24,
        r = new Set();
      for (let l = Math.floor((t - s) / a); l <= Math.floor((t + s) / a); l++)
        for (let c = Math.floor((e - s) / a); c <= Math.floor((e + s) / a); c++)
          for (let h of this.world.grid.get((l * 73856093) ^ (c * 19349663)) ||
            []) {
            if (h.t !== "poly" || r.has(h) || h.dead) continue;
            r.add(h);
            let f = h.bb;
            if (t < f[0] - s || t > f[2] + s || e < f[1] - s || e > f[3] + s)
              continue;
            let u = h.pts,
              d = u.length >> 1;
            for (let p = 0, m = d - 1; p < d; m = p++) {
              let g = u[m * 2],
                b = u[m * 2 + 1],
                x = u[p * 2] - g,
                v = u[p * 2 + 1] - b,
                y = x * x + v * v;
              if (y < 2.5) continue;
              let M = ((t - g) * x + (e - b) * v) / y,
                S = Math.sqrt(y),
                w = 0.7 / S;
              M = Math.max(w, Math.min(1 - w, M));
              let z = g + x * M,
                _ = b + v * M,
                R = Math.hypot(t - z, e - _);
              if (R >= o || R < 0.6) continue;
              let T = (t - z) / R,
                E = (e - _) / R,
                A = z + T * (0.3 + 0.15),
                C = _ + E * (0.3 + 0.15);
              this.blockedLine(A, C, t, e) ||
                ((o = R), (n = { x: A, z: C, nx: T, nz: E }));
            }
          }
      return n;
    }
    blockedLine(t, e, s, n) {
      if (!this.statics) return !1;
      let o = Math.hypot(s - t, n - e),
        a = this.L ? this.L.driveHeight(t, e) : 0;
      for (let r = 0.3; r < o - 0.2; r += 0.5) {
        let l = t + ((s - t) * r) / o,
          c = e + ((n - e) * r) / o,
          h = !1;
        if (
          (this.statics(l, c, a, (f) => {
            !h && Ul(f, l, c, 0.3 - 0.05) && (h = !0);
          }),
          h)
        )
          return !0;
      }
      return !1;
    }
    visible(t, e, s = 0) {
      return (
        this._sph.center.set(t, s + 0.9, e),
        !!this._cam &&
          this.frustum.intersectsSphere(this._sph) &&
          Math.hypot(t - this._cam.position.x, e - this._cam.position.z) < 110
      );
    }
    groundY(t, e, s = null) {
      if (!this.L) return s ?? 0;
      let n = this.L.driveHeight(t, e, null, (s ?? 0) + 0.5),
        o = $d(t, e);
      return o !== null && Math.abs(o - n) < 0.6 ? Math.max(o, n) : n;
    }
    origin(t, e, s = 1, n = 0) {
      let o = this.door(t, e);
      if (o) return { x: o.x, z: o.z, door: o };
      for (let a of [-18, 18, -28, 28]) {
        let r = t + s * a,
          l = e + n * a;
        if (
          !this.visible(r, l, this.groundY(r, l)) &&
          !this.blockedLine(r, l, t, e)
        )
          return { x: r, z: l };
      }
      return { x: t, z: e };
    }
    add(t, e, s, n = {}) {
      if (!this.crowd) return null;
      if (this.list.length >= ztt) {
        let l = this.list.find(
          (c) => !this.visible(c.bx ?? c.x, c.bz ?? c.z, c.y),
        );
        if (!l) return null;
        this.drop(l);
      }
      let o = Math.floor((n.seed ?? Math.random()) * 2147483646) + 1,
        a = () => (o = (o * 16807) % 2147483647) / 2147483647,
        r = {
          x: t,
          z: e,
          y: this.groundY(t, e, n.y),
          hx: n.hx ?? 0,
          hz: n.hz ?? 1,
          look: n.look || Nh(a, { kid: !1 }),
          steps: s.slice(),
          cur: null,
          t: 0,
          tag: n.tag || "",
          pose: 0,
          expr: null,
          k: 0,
          sc: 1,
          ro: !1,
          speed: CF,
          at: null,
          gen: ++this.stats.spawned,
        };
      return (
        n.bag !== void 0 && (r.look.bag = n.bag),
        (r.bx = t),
        (r.bz = e),
        this.list.push(r),
        r
      );
    }
    drop(t) {
      let e = this.list.indexOf(t);
      (e >= 0 && this.list.splice(e, 1),
        (t.gone = !0),
        this.stats.gone++,
        this.visible(t.bx ?? t.x, t.bz ?? t.z, t.y) &&
          t.k < 0.99 &&
          !t.inDoor &&
          this.stats.popped++);
    }
    clear() {
      for (let t of this.list.slice()) t.gone = !0;
      ((this.list.length = 0), this.crowd?.hide());
    }
    leaveSteps(t, e = null, s = null) {
      let n = t.home || this.door(t.bx, t.bz, 14);
      if (n)
        return [
          { type: "go", to: [n.x, n.z], r: 0.5, expr: s, max: 30 },
          { type: "enter" },
        ];
      if (t.origin) {
        let o = t.origin[0] - t.bx,
          a = t.origin[1] - t.bz,
          r = Math.hypot(o, a) || 1;
        return [
          { type: "go", to: t.origin, r: 0.6, expr: s, max: 40, vanish: !0 },
          { type: "away", dir: [o / r, a / r], expr: s },
        ];
      }
      return [{ type: "away", dir: e || [t.hx, t.hz], expr: s }];
    }
    carDoor(t, e, s = 0.35) {
      let n = Math.cos(t.psi),
        o = -Math.sin(t.psi),
        a = -Math.sin(t.psi),
        r = -Math.cos(t.psi);
      ((!e.doorSide || (e.doorSideV !== t && (e.doorSideV = t))) &&
        (e.doorSide =
          (e.bx - t.pos.x) * n + (e.bz - t.pos.z) * o >= 0 ? 1 : -1),
        Math.hypot(e.bx - t.pos.x, e.bz - t.pos.z) > 12 &&
          (e.doorSide =
            (e.bx - t.pos.x) * n + (e.bz - t.pos.z) * o >= 0 ? 1 : -1));
      let l = e.doorSide;
      return [t.pos.x + n * l * 1.45 - a * s, t.pos.z + o * l * 1.45 - r * s];
    }
    handoff({
      phase: t = "drop",
      S: e,
      v: s,
      bag: n = 3,
      seed: o = Math.random(),
    }) {
      let a = {
        done: !1,
        phase: t,
        cancel: () => {
          (!a.done &&
            a.P &&
            !a.P.gone &&
            ((a.P.steps = this.leaveSteps(a.P, null, ni.neutral)),
            (a.P.cur = null)),
            (a.cancelled = !0));
        },
      };
      if (!this.crowd || !e) return ((a.done = !0), a);
      let r = e.px ?? e.x,
        l = e.pz ?? e.z,
        c = this.origin(r, l, e.hx ?? 1, e.hz ?? 0),
        h = this.add(c.x, c.z, [], {
          bag: t === "pickup" ? n : 0,
          seed: o,
          tag: "handoff",
        });
      if (!h) return ((a.done = !0), a);
      ((h.home = c.door || null),
        (h.origin = c.door ? null : [c.x, c.z]),
        (a.P = h));
      let f = () =>
        Math.hypot(s.pos.x - (e.x ?? r), s.pos.z - (e.z ?? l)) > 35 &&
        (a.cancelled = !0);
      return (
        (h.steps = [
          {
            type: "go",
            to: () => this.carDoor(s, h, -0.25),
            r: 0.45,
            max: 45,
            expr: t === "pickup" ? null : ni.grin,
            abort: f,
            reach: s,
          },
          {
            type: "wait",
            pose: kn.point,
            expr: ni.grin,
            face: () => [s.pos.x, s.pos.z],
            dur: 1,
            abort: f,
          },
          {
            type: "do",
            fn: () => {
              ((h.look.bag = t === "pickup" ? 0 : n), (a.done = !0));
            },
          },
          {
            type: "wait",
            pose: kn.wave,
            expr: t === "pickup" ? ni.smile : ni.hearts,
            face: () => [s.pos.x, s.pos.z],
            dur: 0.9,
          },
          {
            type: "do",
            fn: () => {
              ((h.steps = this.leaveSteps(h, null, ni.smile)), (h.cur = null));
            },
          },
        ]),
        a
      );
    }
    plan(t, e, s, n, o = 0, a = null) {
      let c = Math.hypot(s - t, n - e);
      if (c > 60) return null;
      let h = Math.min(t, s) - 5,
        f = Math.min(e, n) - 5,
        u = Math.ceil((Math.abs(s - t) + 10) / 0.3),
        d = Math.ceil((Math.abs(n - e) + 10) / 0.3),
        p = u * d,
        m = new Uint8Array(p),
        g = 0.3 + 0.06,
        b = (D, U, G, q, W) => {
          let V = Math.max(0, Math.floor((D - g - h) / 0.3)),
            Y = Math.min(u - 1, Math.floor((G + g - h) / 0.3)),
            $ = Math.max(0, Math.floor((U - g - f) / 0.3)),
            st = Math.min(d - 1, Math.floor((q + g - f) / 0.3));
          for (let Q = $; Q <= st; Q++)
            for (let j = V; j <= Y; j++) {
              let X = Q * u + j;
              !m[X] &&
                W(h + (j + 0.5) * 0.3, f + (Q + 0.5) * 0.3) &&
                (m[X] = 1);
            }
        },
        x = new Set(),
        v = 24,
        y = this.world?.grid;
      if (y)
        for (let D = Math.floor(h / v); D <= Math.floor((h + u * 0.3) / v); D++)
          for (
            let U = Math.floor(f / v);
            U <= Math.floor((f + d * 0.3) / v);
            U++
          )
            for (let G of y.get((D * 73856093) ^ (U * 19349663)) || []) {
              if (
                x.has(G) ||
                G.dead ||
                G.traffic ||
                G.wall ||
                (x.add(G),
                G.y1 !== void 0 && (o > G.y1 + 0.3 || o + 1.7 < G.y0))
              )
                continue;
              let q =
                G.t === "circ"
                  ? [G.x - G.r, G.z - G.r, G.x + G.r, G.z + G.r]
                  : G.t === "poly"
                    ? G.bb
                    : G.t === "box"
                      ? [G.x0, G.z0, G.x1, G.z1]
                      : [
                          G.x - Math.hypot(G.hx, G.hz),
                          G.z - Math.hypot(G.hx, G.hz),
                          G.x + Math.hypot(G.hx, G.hz),
                          G.z + Math.hypot(G.hx, G.hz),
                        ];
              b(q[0], q[1], q[2], q[3], (W, V) => !!Ul(G, W, V, g));
            }
      for (let D of this._cars || []) {
        let U = Math.hypot(D.hl, D.hw);
        Math.abs(D.x - (t + s) / 2) > c / 2 + 5 + U ||
          Math.abs(D.z - (e + n) / 2) > c / 2 + 5 + U ||
          b(D.x - U, D.z - U, D.x + U, D.z + U, (G, q) => !!tb(D, G, q, g));
      }
      let M = (D, U) =>
          Math.max(0, Math.min(u - 1, Math.floor((D - h) / 0.3))) +
          Math.max(0, Math.min(d - 1, Math.floor((U - f) / 0.3))) * u,
        S = (D) => {
          if (!m[D]) return D;
          let U = D % u,
            G = (D / u) | 0,
            q = -1,
            W = 1e9;
          for (let V = 1; V < 8 && q < 0; V++)
            for (let Y = G - V; Y <= G + V; Y++)
              for (let $ = U - V; $ <= U + V; $++) {
                if ($ < 0 || Y < 0 || $ >= u || Y >= d || m[Y * u + $])
                  continue;
                let st = ($ - U) ** 2 + (Y - G) ** 2;
                st < W && ((W = st), (q = Y * u + $));
              }
          return q;
        },
        w = S(M(t, e)),
        z = S(M(s, n));
      if (w < 0 || z < 0) return null;
      let _ = new Float32Array(p).fill(1e9),
        R = new Int32Array(p).fill(-1),
        T = [w],
        E = z % u,
        A = (z / u) | 0,
        C = (D) => {
          let U = Math.abs((D % u) - E),
            G = Math.abs(((D / u) | 0) - A);
          return U + G - 0.586 * Math.min(U, G);
        },
        P = new Float32Array(p).fill(1e9);
      ((_[w] = 0), (P[w] = C(w)));
      let I = 0,
        L = !1;
      for (; T.length && I++ < 2e4;) {
        let D = 0;
        for (let W = 1; W < T.length; W++) P[T[W]] < P[T[D]] && (D = W);
        let U = T[D];
        if (((T[D] = T[T.length - 1]), T.pop(), U === z)) {
          L = !0;
          break;
        }
        let G = U % u,
          q = (U / u) | 0;
        for (let W = -1; W <= 1; W++)
          for (let V = -1; V <= 1; V++) {
            if (!V && !W) continue;
            let Y = G + V,
              $ = q + W;
            if (Y < 0 || $ < 0 || Y >= u || $ >= d) continue;
            let st = $ * u + Y;
            if (m[st] || (V && W && (m[q * u + Y] || m[$ * u + G]))) continue;
            let Q = _[U] + (V && W ? 1.414 : 1);
            Q < _[st] &&
              (_[st] >= 1e9 && T.push(st),
              (_[st] = Q),
              (P[st] = Q + C(st)),
              (R[st] = U));
          }
      }
      if (!L) return null;
      let F = [];
      for (let D = z; D >= 0 && D !== w; D = R[D]) F.push(D);
      F.reverse();
      let N = (D) => [
          h + ((D % u) + 0.5) * 0.3,
          f + (((D / u) | 0) + 0.5) * 0.3,
        ],
        B = (D, U) => {
          let [G, q] = D,
            [W, V] = U,
            Y = Math.ceil(Math.hypot(W - G, V - q) / (0.3 * 0.5));
          for (let $ = 1; $ < Y; $++)
            if (m[M(G + ((W - G) * $) / Y, q + ((V - q) * $) / Y)]) return !1;
          return !0;
        },
        H = [],
        O = [t, e];
      for (let D = 0; D < F.length; D++) {
        let U = D + 1 < F.length ? N(F[D + 1]) : null;
        if (U && B(O, U)) continue;
        let G = N(F[D]);
        (H.push(G), (O = G));
      }
      return (m[M(s, n)] ? H.length || H.push(N(z)) : H.push([s, n]), H);
    }
    update(t, e, s, n = null) {
      if (!this.crowd) return;
      ((t = Math.min(0.1, Math.max(0, t))),
        (this.t += t),
        (this._cam = s),
        (this._v = e),
        this._pv.multiplyMatrices(s.projectionMatrix, s.matrixWorldInverse),
        this.frustum.setFromProjectionMatrix(this._pv));
      let o = (this._cars = Q1(e.pos.x, e.pos.z, 160, e, n));
      this.carDoors?.()?.update(t);
      for (let l of this.list.slice()) ((l.t += t), this.step(l, t, e));
      let a = this.list.filter((l) => !l.duck);
      this.nav.step(a, t, o, { vmax: (l) => l.speed * 1.4, gain: () => 3.2 });
      for (let l of a) l.y = this.groundY(l.bx, l.bz, l.y);
      this.peds &&
        (this.peds.extern = this.list
          .filter((l) => !l.duck)
          .map((l) => {
            let c = l._ext || (l._ext = { ro: !0 });
            return ((c.x = c.bx = l.bx), (c.z = c.bz = l.bz), c);
          }));
      let r = this.crowd;
      r.begin(t);
      for (let l of this.list) {
        let c = l.bx,
          h = l.bz,
          f = l.y,
          u = 1,
          d = 0,
          p = l.pose;
        if (l.duck) {
          let v = l.duck,
            y = Math.max(0, Math.min(1, v.t / v.dur)),
            M = v.out ? 1 - y : y,
            S = v.door ? 0.5 : 0.6;
          if (
            ((d = M),
            (p = v.t < 0 && !v.out ? 0 : kn.duck),
            (u = 1 - (v.door ? 0.25 : 0.35) * M),
            (c = v.x + (v.cx - v.x) * M * S),
            (h = v.z + (v.cz - v.z) * M * S),
            (f = v.y),
            v.t < 0 && !v.out && v.lead)
          ) {
            let w = 1 + v.t / v.lead;
            ((c = v.x0 + (v.x - v.x0) * w), (h = v.z0 + (v.z - v.z0) * w));
          }
        }
        let m = !l.duck && (l.vs || 0) > 0.12,
          g = m && l.vhx !== void 0 ? l.vhx : l.hx,
          b = m && l.vhx !== void 0 ? l.vhz : l.hz,
          x = Math.hypot(c - s.position.x, h - s.position.z);
        x > 150 ||
          r.put(l, c, f, h, g, b, x, {
            speed: m ? Math.min(l.vs, 2) : 0,
            pose: m && !l.duck ? (p === kn.phone ? kn.phone : 0) : p,
            look: l.expr,
            k: l.duck ? d : l.k2 || 0,
            scale: u,
            lookAt: l.lookAt || null,
            car: null,
          });
      }
      r.end();
    }
    step(t, e, s) {
      if (!t.cur) {
        if (((t.cur = t.steps.shift() || null), (t.st0 = t.t), !t.cur)) {
          this.drop(t);
          return;
        }
        t.cur.t = 0;
      }
      let n = t.cur;
      n.t += e;
      let o = !1;
      if (n.abort && n.abort(t)) {
        ((t.steps = this.leaveSteps(t, null, ni.neutral)), (t.cur = null));
        return;
      }
      let a = () => (typeof n.to == "function" ? n.to() : n.to);
      switch (n.type) {
        case "go": {
          let r = a();
          if (!r) {
            o = !0;
            break;
          }
          (!n.path ||
            (n.replan = (n.replan ?? 0) - e) < 0 ||
            Math.hypot(r[0] - n.pg[0], r[1] - n.pg[1]) > 0.6) &&
            ((t.lag || 0) > 0.8 && ((t.x = t.bx), (t.z = t.bz)),
            (n.path = this.plan(t.x, t.z, r[0], r[1], t.y, t) || [r]),
            (n.pi = 0),
            (n.pg = r),
            (n.replan = 0.7));
          let l = n.path[Math.min(n.pi, n.path.length - 1)];
          n.pi >= n.path.length - 1 && (l = r);
          let c = l[0] - t.x,
            h = l[1] - t.z,
            f = Math.hypot(c, h),
            u =
              (n.speed || CF) *
              Math.max(0.15, Math.min(1, 1.6 - (t.lag || 0) * 0.9)) *
              e;
          (f > u
            ? ((t.x += (c / f) * u),
              (t.z += (h / f) * u),
              (t.hx = c / f),
              (t.hz = h / f))
            : ((t.x = l[0]), (t.z = l[1]), n.pi < n.path.length - 1 && n.pi++),
            (t.pose = n.pose ?? 0),
            (t.expr = n.expr ?? null),
            (t.lookAt = null));
          let d = Math.hypot(r[0] - t.bx, r[1] - t.bz);
          t.still = (t.vs || 0) < 0.1 && d < 1.3 ? (t.still || 0) + e : 0;
          let p =
              n.reach &&
              (() => {
                let b = n.reach,
                  x = {
                    x: b.pos.x,
                    z: b.pos.z,
                    fx: -Math.sin(b.psi),
                    fz: -Math.cos(b.psi),
                    hl: 2.3,
                    hw: 1,
                  };
                return (
                  !!tb(x, t.bx, t.bz, 0.3 + 0.5) &&
                  Math.hypot(r[0] - t.bx, r[1] - t.bz) < 2.2
                );
              })(),
            m =
              n.pi >= n.path.length - 1 &&
              Math.hypot(t.x - l[0], t.z - l[1]) < 0.05 &&
              Math.hypot(t.bx - t.x, t.bz - t.z) < 0.35 &&
              Math.hypot(r[0] - t.bx, r[1] - t.bz) < 1.6;
          (n.best === void 0 || d < n.best - 0.2) &&
            ((n.best = d), (n.bestT = n.t));
          let g = n.t - n.bestT > 3 && d < 3.5;
          if (n.vanish && n.t > 2 && !this.visible(t.bx, t.bz, t.y)) {
            ((t.k = 1), this.drop(t));
            return;
          }
          (d < (n.r ?? 0.4) ||
            p ||
            m ||
            g ||
            t.still > 1 ||
            (n.until && n.until(t)) ||
            n.t > (n.max ?? 40)) &&
            (o = !0);
          break;
        }
        case "wait": {
          ((t.pose =
            typeof n.pose == "function" ? n.pose(t) : (n.pose ?? kn.phone)),
            (t.expr =
              typeof n.expr == "function" ? n.expr(t) : (n.expr ?? null)));
          let r = typeof n.face == "function" ? n.face(t) : n.face;
          if (r) {
            let l = r[0] - t.bx,
              c = r[1] - t.bz,
              h = Math.hypot(l, c);
            (h > 0.3 && ((t.hx = l / h), (t.hz = c / h)), (t.lookAt = r));
          } else if (n.about) {
            let l = Math.sin(t.t * 0.45 + t.gen) * 1;
            t.lookAt = [
              t.bx + (n.about[0] * Math.cos(l) - n.about[1] * Math.sin(l)) * 6,
              t.bz + (n.about[0] * Math.sin(l) + n.about[1] * Math.cos(l)) * 6,
            ];
          } else t.lookAt = null;
          ((n.until && n.until(t)) || (n.dur !== void 0 && n.t >= n.dur)) &&
            (o = !0);
          break;
        }
        case "do":
          (n.fn(t), (o = !0));
          break;
        case "duck": {
          if (!t.duck) {
            let r = n.car(),
              l = this.carDoors?.(),
              c = this._v,
              h = c
                ? (t.bx - c.pos.x) * Math.cos(c.psi) -
                    (t.bz - c.pos.z) * Math.sin(c.psi) >=
                  0
                  ? 1
                  : -1
                : 1,
              f = l ? 0.36 : 0;
            l && l.pulse(h, (n.dur ?? 0.45) + (n.out ? 0.9 : 0.25));
            let u = t.bx,
              d = t.bz;
            if (l && c) {
              let p = Math.cos(c.psi),
                m = -Math.sin(c.psi),
                g = Math.sin(c.psi),
                b = Math.cos(c.psi);
              ((u = c.pos.x + p * h * 1.2 + g * 0.95),
                (d = c.pos.z + m * h * 1.2 + b * 0.95));
            }
            t.duck = {
              t: -f,
              lead: f,
              dur: n.dur ?? 0.45,
              out: !!n.out,
              x: u,
              z: d,
              x0: t.bx,
              z0: t.bz,
              y: t.y,
              cx: r.x,
              cz: r.z,
              door: !!l,
            };
          }
          if (((t.duck.t += e), t.duck.t >= t.duck.dur)) {
            let r = t.duck,
              l = r.out;
            if (((t.duck = null), !l)) {
              ((t.k = 1), (t.inDoor = !0), this.drop(t));
              return;
            }
            (r.door && ((t.x = t.bx = r.x), (t.z = t.bz = r.z)), (o = !0));
          }
          break;
        }
        case "enter":
          ((t.inDoor = !0), (t.k = 1), this.drop(t));
          return;
        case "away": {
          n.g || (n.g = [t.x + n.dir[0] * 22, t.z + n.dir[1] * 22]);
          let r = n.g[0] - t.x,
            l = n.g[1] - t.z,
            c = Math.hypot(r, l),
            h = CF * Math.max(0.15, Math.min(1, 1.6 - (t.lag || 0) * 0.9)) * e;
          if (
            ((t.pose = 0),
            (t.expr = n.expr ?? null),
            (t.lookAt = null),
            c > h
              ? ((t.x += (r / c) * h),
                (t.z += (l / c) * h),
                (t.hx = r / c),
                (t.hz = l / c))
              : ((t.x = n.g[0]),
                (t.z = n.g[1]),
                (n.n = (n.n || 0) + 1),
                (n.g =
                  n.n < 6 ? [t.x + n.dir[0] * 15, t.z + n.dir[1] * 15] : null),
                n.g || (n.g = [t.x, t.z])),
            n.t > 2 && !this.visible(t.bx, t.bz, t.y))
          ) {
            ((t.k = 1), this.drop(t));
            return;
          }
          if ((n.dT = (n.dT || 0) - e) < 0) {
            n.dT = 1.2;
            let f = this.door(t.bx, t.bz, 7);
            if (f && (f.x - t.bx) * n.dir[0] + (f.z - t.bz) * n.dir[1] > -1) {
              ((t.steps = [
                { type: "go", to: [f.x, f.z], r: 0.5, expr: n.expr, max: 20 },
                { type: "enter" },
              ]),
                (t.cur = null));
              return;
            }
          }
          break;
        }
      }
      o && (t.cur = null);
    }
  };
