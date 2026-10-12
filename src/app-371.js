// app 371 — math
// Lines 185306-186213 of readable/app.pretty.js (statement-aligned).
var cE = {
    motorway: 27,
    motorway_link: 17,
    trunk: 14.5,
    trunk_link: 12,
    primary: 13.5,
    primary_link: 11,
    secondary: 12.5,
    secondary_link: 10,
    tertiary: 11.5,
    tertiary_link: 10,
    residential: 9.5,
    unclassified: 9,
    busway: 11,
  },
  twt = new Set(Object.keys(cE).filter((i) => i !== "busway")),
  ewt = {
    motorway: 1,
    trunk: 1,
    primary: 1,
    secondary: 0.9,
    tertiary: 0.7,
    residential: 0.25,
    unclassified: 0.2,
  },
  swt = {
    fidi: 1.6,
    towers: 1.6,
    union: 1.7,
    tenderloin: 1.6,
    chinatown: 1.3,
    jackson: 1.3,
    soma: 1.5,
    mission: 1.3,
    northbeach: 1.2,
    wharf: 1.2,
    marina: 1.15,
  },
  nwt = (i) => Math.min(1, (ewt[i.cls] ?? 0.55) * (swt[i.dist] || 1)),
  Rp = { cycle: 36, green: 14, yellow: 3.5, allRed: 1, C: 40, Cs: 26 },
  iwt = [-900, 700],
  Jtt = { minG: 6, hold: 8, minS: 6, maxS: 12, gapS: 2 },
  tN = {
    get dice() {
      return globalThis.__SIGX?.dice;
    },
    get vk() {
      return globalThis.__SIGX?.vk;
    },
    get vb() {
      return globalThis.__SIGX?.vb;
    },
  },
  owt = {
    secondary: 1,
    primary: 1,
    trunk: 1,
    tertiary: 0.6,
    residential: 0.4,
    unclassified: 0.35,
    living_street: 0.25,
    service: 0.25,
  },
  Ztt = (i, t) => {
    let e =
      Math.imul(i ^ 2654435769, 2246822507) ^
      Math.imul(t + 1663821227, 3266489909);
    return (
      (e ^= e >>> 15),
      (e = Math.imul(e, 739982445)),
      (e ^= e >>> 12),
      (e = Math.imul(e, 695872825)),
      (e ^= e >>> 15),
      (e >>> 0) / 4294967296
    );
  },
  awt = [
    {
      name: "Powell-Hyde",
      out: [
        ["Powell Street", "Ellis Street", -1264, 1114],
        ["Powell Street", "Jackson Street", -1445, -10],
        ["Hyde Street", "Jackson Street", -2167, 107],
        ["Hyde Street", "Beach Street", -2381, -1237],
      ],
      back: [
        ["Hyde Street", "Washington Street", -2152, 204],
        ["Powell Street", "Washington Street", -1429, 88],
      ],
      n: 4,
    },
    {
      name: "Powell-Mason",
      out: [
        ["Powell Street", "Ellis Street", -1264, 1114],
        ["Powell Street", "Jackson Street", -1445, -10],
        ["Mason Street", "Jackson Street", -1589, 14],
        ["Taylor Street", "Taylor Street", -1913, -1077],
      ],
      back: [
        ["Mason Street", "Washington Street", -1573, 112],
        ["Powell Street", "Washington Street", -1429, 88],
      ],
      n: 4,
    },
    {
      name: "California",
      out: [
        ["California Street", "Drumm Street", -257, 205],
        ["California Street", "Van Ness Avenue", -2541, 574],
      ],
      back: [],
      n: 4,
      doubleEnded: !0,
    },
    {
      name: "F Market",
      out: [
        ["Market Street", "Steuart Street", -132, 136],
        ["Market Street", "Van Ness Avenue", -2270, 2254],
      ],
      back: [],
      n: 6,
      doubleEnded: !0,
      tram: !0,
      pref: "Market Street",
    },
  ],
  hE = class i {
    constructor(t, e) {
      ((this.D = t), (this.L = e), (this.real = !0));
      let s = {};
      for (let n of t.edges) {
        if (
          ((n.tr =
            !n.inner &&
            n.ja >= 0 &&
            n.jb >= 0 &&
            n.ja !== n.jb &&
            n.s1 - n.s0 > 0.05 &&
            cE[n.cls] !== void 0),
          (n.car = n.tr && twt.has(n.cls)),
          (n.cab = !!(n.flags & 16)),
          !n.tr && !n.cab)
        )
          continue;
        let o = Vh(n),
          a = o > 0.5 && o < 0.55;
        ((n.lg = {
          med: n.oneway ? 0 : a ? 0.8 : o > 0.2 && o < 0.4 ? 1.6 : 0,
          park: a ? 0.9 : n.flags & 4 ? 0 : 2.3,
          bw: a ? 0 : tp(n),
        }),
          (n.vmax =
            n.maxspeed > 0
              ? Math.max(n.maxspeed * 0.447, cE[n.cls] * 0.8 || 8)
              : cE[n.cls] || 9));
      }
      for (let n of t.juns)
        if (
          ((n.tl = n.legs.map(([o, a]) => {
            Ot(
              o,
              a === "a" ? Math.min(o.L, o.ta + 1) : Math.max(0, o.L - o.tb - 1),
              s,
            );
            let r = a === "a" ? 1 : -1;
            return {
              E: o,
              end: a,
              hx: s.dx * r,
              hz: s.dz * r,
              stop: !!(o.stops & (a === "a" ? 1 : 2)),
              ph: 0,
            };
          })),
          (n.busy = 0),
          (n.busyF = -1),
          n.ctl === 2)
        ) {
          let o = n.tl[0];
          for (let l of n.tl) l.E.rank > o.E.rank && (o = l);
          let a = [[o]],
            r = n.tl
              .filter((l) => l !== o)
              .sort(
                (l, c) =>
                  (c.E.car ? 1 : 0) - (l.E.car ? 1 : 0) || c.E.rank - l.E.rank,
              );
          o.ph = 0;
          for (let l of r) {
            let c = -1,
              h = -1;
            for (let f = 0; f < a.length; f++) {
              let u = Math.min(
                ...a[f].map((d) => Math.abs(l.hx * d.hx + l.hz * d.hz)),
              );
              u >= 0.64 && u > h && ((h = u), (c = f));
            }
            (c < 0 && ((c = a.length), a.push([])), (l.ph = c), a[c].push(l));
          }
          ((n.nph = Math.max(2, a.length)), (n.off = 0), (n.main = o));
        }
      (this.sigPlans(),
        (this.ref = []),
        (this._o = {}),
        (this._a = {}),
        (this._b = {}),
        (this.lines = null));
    }
    laneV(t, e, s, n) {
      let o = t.lg,
        a = Math.max(1, t.lanes),
        r = Math.max(0, n - 1.15);
      if (t.oneway) {
        let h = Math.max((2 * (n - o.park) - (o.bw || 0)) / a, 2.6),
          f = -(n - o.park) + h * (Math.min(s, a - 1) + 0.5);
        return Math.max(-r, Math.min(r, f));
      }
      let l = Math.max(o.med, t.colMed || 0),
        c = Math.max((n - o.park - l - (o.bw || 0)) / a, 2.6);
      return e * Math.min(r, l + c * (Math.min(s, a - 1) + 0.5));
    }
    lanes(t) {
      return Math.max(1, t.lanes);
    }
    sIn(t, e) {
      return e > 0 ? t.s0 : t.s1;
    }
    rem(t) {
      return t.dir > 0 ? t.E.s1 - t.s : t.s - t.E.s0;
    }
    pose(t, e) {
      let s = t.E,
        n = Ot(s, t.s, this._o),
        o = Math.min(s.L, Math.max(0, t.s + 2.5 * t.dir)),
        a = Math.min(s.L, Math.max(0, t.s - 2.5 * t.dir)),
        r = Ot(s, o, this._a),
        l = r.x,
        c = r.z,
        h = r.y,
        f = Ot(s, a, this._b),
        u = l - f.x,
        d = c - f.z,
        p = Math.hypot(u, d);
      p > 0.001
        ? ((u /= p), (d /= p))
        : ((u = n.dx * t.dir), (d = n.dz * t.dir));
      let m =
        this.laneV(s, t.dir, t.k, n.w) +
        (t.cable && s.twoTrack
          ? t.dir * Math.min(1.45, Math.max(0, n.w - 1.6))
          : 0);
      t.lat === void 0 && (t.lat = m);
      let g = p > 0.001 ? u * t.dir : n.dx,
        b = p > 0.001 ? d * t.dir : n.dz;
      return (
        (e.x = n.x - b * t.lat),
        (e.z = n.z + g * t.lat),
        (e.y = n.y),
        (e.fx = u),
        (e.fz = d),
        (e.pitch = p > 0.001 ? Math.atan2(h - f.y, p) : 0),
        (e.target = m),
        e
      );
    }
    arrival(t, e) {
      let s = this.D.juns[e > 0 ? t.jb : t.ja],
        n = e > 0 ? "b" : "a";
      return s
        ? { J: s, leg: s.tl.find((o) => o.E === t && o.end === n) }
        : null;
    }
    sigPlans() {
      let t = this.D,
        e = Rp.yellow,
        s = Rp.allRed,
        n = t.juns.filter((f) => f.ctl === 2 && f.tl?.length && f.main);
      for (let f of n) {
        let u = f.main,
          d = u.E.rank,
          p = f.nph || 2,
          m = null;
        for (let w of f.tl)
          w.ph > 0 && w.E.car && (!m || w.E.rank > m.E.rank) && (m = w);
        let g = d >= 4,
          b = Math.max(g ? Rp.C : Rp.Cs, p * (e + s + 6)),
          x = m ? (owt[m.E.cls] ?? 0.4) : 0.3,
          v = p === 2 && x < 1,
          y = b - p * (e + s),
          M;
        if (p >= 3)
          M = [y * 0.4, ...new Array(p - 1).fill((y * 0.6) / (p - 1))];
        else {
          let w = v
            ? Math.max(7, y * (g ? 0.3 : 0.42))
            : y * (m && m.E.rank >= d ? 0.5 : 0.42);
          M = [y - w, w];
        }
        let S = [0];
        for (let w = 1; w < p; w++) S.push(S[w - 1] + M[w - 1] + e + s);
        f.sg = {
          n: p,
          C: b,
          g: M,
          a: S,
          act: v,
          dem: x,
          off: Ztt(f.id, 7) * b,
          art: g,
        };
      }
      let o = new Set(),
        a = iwt,
        r = [],
        l = n
          .filter((f) => f.sg.art)
          .sort(
            (f, u) =>
              u.main.E.rank - f.main.E.rank ||
              (u.main.E.oneway ? 1 : 0) - (f.main.E.oneway ? 1 : 0) ||
              f.id - u.id,
          ),
        c = (f, u) => f.sg.a[u] - f.sg.off,
        h = (f, u, d) => {
          let p = f.sg.C;
          f.sg.off = (((f.sg.a[u] - d) % p) + p) % p;
        };
      for (let f of l) {
        if (o.has(f)) continue;
        o.add(f);
        let u = f.main,
          d = u.E.name,
          p,
          m;
        if (u.E.oneway) {
          let g = u.end === "a" ? 1 : -1;
          ((p = u.hx * g), (m = u.hz * g));
        } else {
          let g = a[0] - f.x,
            b = a[1] - f.z,
            x = g * u.hx + b * u.hz >= 0 ? 1 : -1;
          ((p = u.hx * x), (m = u.hz * x));
        }
        for (let g of f.tl)
          g.ph === 0 &&
            g.E.car &&
            (!d || g.E.name === d) &&
            r.push([f, 0, g, g.hx * p + g.hz * m >= 0 ? 1 : -1]);
        for (; r.length;) {
          let [g, b, x, v] = r.pop(),
            y = this.sigNextAlong(g, x);
          if (!y) continue;
          let { K: M, leg: S, tt: w, out: z } = y;
          o.has(M) ||
            !M.sg.art ||
            (o.add(M),
            h(M, S.ph, c(g, b) + v * (w + 1)),
            z && r.push([M, S.ph, z, v]));
        }
      }
    }
    sigNextAlong(t, e) {
      let s = this.D,
        n = e.E.name,
        o = e.E,
        a = e.end,
        r = 0,
        l = 0;
      for (let c = 0; c < 6; c++) {
        let h = Math.max(6, o.vmax || 9) * (tN.vk ?? 1) + (tN.vb ?? 0);
        if (((r += o.L), (l += o.L / h), r > 600)) return null;
        let f = s.juns[a === "a" ? o.jb : o.ja];
        if (!f || !f.tl) return null;
        let u = f.tl.find(
          (m) => m.E === o && m.end === (a === "a" ? "b" : "a"),
        );
        if (!u) return null;
        let d = null,
          p = -0.75;
        for (let m of f.tl) {
          if (m === u || !m.E.car || (n && m.E.name !== n)) continue;
          let g = m.hx * u.hx + m.hz * u.hz;
          g < p && ((p = g), (d = m));
        }
        if (f.ctl === 2 && f.sg) return { K: f, leg: u, tt: l, out: d };
        if (!d) return null;
        ((o = d.E), (a = d.end));
      }
      return null;
    }
    local(t) {
      return !this.synced && !tN.dice;
    }
    served(t, e) {
      let s = t.sg;
      return !s.act || Ztt(t.id, e) < s.dem;
    }
    call(t, e, s) {
      if (!t.sg || !this.local(t)) return;
      let n = this.ctl(t, s);
      e
        ? n.p === e && n.s === 0
          ? (n.lastS = s)
          : n.cS[e] === null && (n.cS[e] = s)
        : (n.ext = s);
    }
    ctl(t, e) {
      let s = this.dyn || (this.dyn = new Map()),
        n = s.get(t);
      n ||
        s.set(
          t,
          (n = {
            p: 0,
            s: 0,
            t0: e - 60,
            cS: new Array(t.sg.n).fill(null),
            lastS: -1e9,
            ext: -1e9,
            h: [],
          }),
        );
      for (let o = 0; o < 12; o++) {
        let a = i.ctlEnd(n);
        if (a > e) break;
        (i.ctlNext(n, a),
          n.h.push(a, n.p, n.s),
          n.h.length > 24 && n.h.splice(0, 3));
      }
      return n;
    }
    static ctlEnd(t) {
      let e = Jtt;
      if (t.s === 1) return t.t0 + Rp.yellow;
      if (t.s === 2) return t.t0 + Rp.allRed;
      if (t.p > 0)
        return Math.min(
          t.t0 + e.maxS,
          Math.max(t.t0 + e.minS, t.lastS + e.gapS),
        );
      let s = 1 / 0;
      for (let o = 1; o < t.cS.length; o++)
        t.cS[o] !== null && t.cS[o] < s && (s = t.cS[o]);
      if (s === 1 / 0) return 1 / 0;
      let n = Math.max(t.t0 + e.minG, s);
      return (
        t.ext > n - 0.6 &&
          (n = Math.max(t.t0 + e.minG, Math.min(s + e.hold, t.ext + 0.6))),
        n
      );
    }
    static ctlNext(t, e) {
      if (t.s < 2) {
        (t.s++, (t.t0 = e));
        return;
      }
      let s = 0;
      for (let n = t.p + 1; n < t.cS.length; n++)
        if (t.cS[n] !== null) {
          s = n;
          break;
        }
      ((t.p = s),
        (t.s = 0),
        (t.t0 = e),
        s && ((t.cS[s] = null), (t.lastS = e)));
    }
    signal(t, e, s) {
      let n = t.sg;
      if (!n) return 0;
      if (this.local(t)) {
        let h = this.ctl(t, s),
          f = h.p,
          u = h.s;
        if (s < h.t0) {
          f = -1;
          for (let d = h.h.length - 3; d >= 0; d -= 3)
            if (h.h[d] <= s) {
              ((f = h.h[d + 1]), (u = h.h[d + 2]));
              break;
            }
          f < 0 && ((f = 0), (u = 0));
        }
        return f === e ? u : 2;
      }
      let o = s + (this.tOff || 0) + n.off,
        a = Math.floor(o / n.C),
        r = o - a * n.C;
      if (!this.served(t, a)) return e ? 2 : 0;
      let l = n.a[e],
        c = n.g[e];
      return l === void 0 || r < l
        ? 2
        : r < l + c
          ? 0
          : r < l + c + Rp.yellow
            ? 1
            : 2;
    }
    sigTimes(t, e, s, n = !1) {
      let o = t.sg;
      if (!o) return { tR: 1e9, tG: 0, tN: 1e9 };
      let a = Rp.yellow;
      if (this.local(t)) {
        let p = this.ctl(t, s),
          m = {
            p: p.p,
            s: p.s,
            t0: p.t0,
            cS: p.cS.slice(),
            lastS: p.lastS,
            ext: p.ext,
          };
        n &&
          e > 0 &&
          !(m.p === e && m.s === 0) &&
          m.cS[e] === null &&
          (m.cS[e] = s);
        let g = null,
          b = null,
          x = null,
          v = s;
        for (let y = 0; y < 16 && x === null; y++) {
          let M = m.p === e && m.s < 2,
            S = m.p === e && m.s === 0;
          (S && b === null && (b = Math.max(0, m.t0 - s)),
            !M && g === null && (g = Math.max(0, m.t0 - s)),
            S && g !== null && x === null && m.t0 > s && (x = m.t0 - s),
            g === null &&
              m.s === 0 &&
              m.p === e &&
              e > 0 &&
              n &&
              (m.lastS = 1e9));
          let w = i.ctlEnd(m);
          if (w === 1 / 0) {
            (g === null && (g = 1e9),
              b === null && (b = 1e9),
              x === null && (x = 1e9));
            break;
          }
          if (m.p === 0 && m.s === 0 && n && e === 0) {
            let z = 1 / 0;
            for (let _ = 1; _ < m.cS.length; _++)
              m.cS[_] !== null && (z = Math.min(z, m.cS[_]));
            w = Math.max(w, Math.min(z + Jtt.hold, w + 4));
          }
          ((v = Math.max(v, w)), i.ctlNext(m, w));
        }
        return { tR: g ?? 0, tG: b ?? 1e9, tN: x ?? 1e9 };
      }
      let r = s + (this.tOff || 0) + o.off,
        l = Math.floor(r / o.C),
        c = (p) => {
          let m = p * o.C;
          if (!this.served(t, p)) return e ? [] : [[m, m + o.C, m + o.C]];
          let g = o.a[e],
            b = o.g[e];
          return g === void 0 ? [] : [[m + g, m + g + b, m + g + b + a]];
        },
        h = null,
        f = null,
        u = null;
      for (let p = l; p < l + 4; p++)
        for (let [m, g, b] of c(p))
          b <= r ||
            (f === null && g > r && (f = Math.max(0, m - r)),
            h === null &&
              (u === null
                ? m > r
                  ? (h = 0)
                  : (u = b)
                : m <= u + 1e-6
                  ? (u = b)
                  : (h = u - r)));
      h === null &&
        (h = u === null ? 0 : u >= (l + 4) * o.C - 1e-6 ? 1e9 : u - r);
      let d = 1e9;
      for (let p = l; p < l + 5 && d > 1e8; p++)
        for (let [m] of c(p))
          if (m > r + h + 0.01) {
            d = m - r;
            break;
          }
      return { tR: h, tG: f ?? 1e9, tN: d };
    }
    plan(t, e) {
      let s = t.E,
        n = this.arrival(s, t.dir);
      if (!n || !n.leg) return null;
      let { J: o, leg: a } = n,
        r = -a.hx,
        l = -a.hz,
        c = [];
      if (t.route) {
        let d = t.route[(t.ri + 1) % t.route.length];
        if (!d || d.turn) return { J: o, leg: a, end: !0, stopD: 1.5 };
        let p = o.tl.find(
          (m) => m.E === d.E && m.end === (d.dir > 0 ? "a" : "b"),
        ) || { hx: d.dir, hz: 0 };
        return this.move(
          t,
          o,
          a,
          d.E,
          d.dir,
          r * p.hz - l * p.hx,
          Math.acos(Math.max(-1, Math.min(1, r * p.hx + l * p.hz))),
          !0,
        );
      }
      let h = 0;
      for (let d of o.tl) {
        let p = d.E;
        if (
          (p === s && d.end === a.end) ||
          !(t.bus
            ? p.tr &&
              (p.car || p.cls === "busway") &&
              p.trolley &&
              !p.elev &&
              !p.hwy &&
              !p.layered
            : p.car)
        )
          continue;
        let m = d.end === "a" ? 1 : -1;
        if (p.oneway && m < 0) continue;
        let g = r * d.hx + l * d.hz,
          b = r * d.hz - l * d.hx,
          x = Math.acos(Math.max(-1, Math.min(1, g)));
        if (x > 2.6) continue;
        let v = x < 0.6 ? 3 : b > 0 ? 1.1 : 0.8;
        ((v *= Math.pow(0.5, Math.max(0, s.rank - p.rank))),
          p.name && p.name === s.name && (v *= 1.6),
          t.bus && (v *= p.trolley ? 30 : 1),
          c.push([p, m, b, x, v]),
          (h += v));
      }
      if (!c.length) return { J: o, leg: a, end: !0, stopD: 1.5 };
      let f = e() * h,
        u = c[0];
      for (let d of c)
        if ((f -= d[4]) <= 0) {
          u = d;
          break;
        }
      return this.move(t, o, a, u[0], u[1], u[2], u[3], !1);
    }
    move(t, e, s, n, o, a, r, l) {
      let c = this.lanes(n),
        h = t.cable
          ? n.oneway
            ? Math.floor((c - 1) / 2)
            : 0
          : t.bus
            ? c - 1
            : r < 0.6
              ? Math.min(t.k, c - 1)
              : a > 0
                ? c - 1
                : 0,
        f = t.dir > 0 ? t.E.flags & 2 : t.E.flags & 1;
      return {
        J: e,
        leg: s,
        F: n,
        dir: o,
        k: h,
        turn: a >= 0 ? r : -r,
        ang: r,
        stopD: f || (t.E.oneway && t.dir < 0) ? 1.2 : 5.3,
        line: l,
      };
    }
    curve(t, e, s) {
      let n = e.F,
        o = this.sIn(n, e.dir),
        a = this.pose(
          { E: n, dir: e.dir, s: o, k: e.k, lat: void 0, cable: t.cable },
          this._q || (this._q = {}),
        ),
        r = Ot(n, o, this._o),
        l = a.target,
        c = a.x,
        h = a.z,
        f = Ot(n, Math.min(n.L, Math.max(0, o + 3 * e.dir)), this._a),
        u = Math.hypot(f.x - r.x, f.z - r.z) || 1,
        d = (f.x - r.x) / u,
        p = (f.z - r.z) / u,
        m = Math.hypot(c - s.x, h - s.z),
        g =
          e.ang > 2.6
            ? Math.max(5, m * 0.8)
            : Math.max(0.5, m * (e.ang < 0.4 ? 0.34 : 0.39)),
        b = [
          s.x,
          s.z,
          s.x + s.fx * g,
          s.z + s.fz * g,
          c - d * g,
          h - p * g,
          c,
          h,
        ],
        x = 0,
        v = b[0],
        y = b[1];
      for (let w = 1; w <= 8; w++) {
        let z = w / 8,
          _ = 1 - z,
          R =
            _ * _ * _ * b[0] +
            3 * _ * _ * z * b[2] +
            3 * _ * z * z * b[4] +
            z * z * z * b[6],
          T =
            _ * _ * _ * b[1] +
            3 * _ * _ * z * b[3] +
            3 * _ * z * z * b[5] +
            z * z * z * b[7];
        ((x += Math.hypot(R - v, T - y)), (v = R), (y = T));
      }
      let M = e.ang > 0.25 ? x / e.ang : 1e9,
        S = Math.max(3.5, Math.sqrt(2.4 * M));
      return {
        p: b,
        len: Math.max(0.1, x),
        t: 0,
        J: e.J,
        to: e,
        vTurn: S,
        lat: l,
        flat: e.J.flat,
        y0: s.y,
      };
    }
    bez(t, e, s) {
      let n = t.p,
        o = 1 - e;
      return (
        (s.x =
          o * o * o * n[0] +
          3 * o * o * e * n[2] +
          3 * o * e * e * n[4] +
          e * e * e * n[6]),
        (s.z =
          o * o * o * n[1] +
          3 * o * o * e * n[3] +
          3 * o * e * e * n[5] +
          e * e * e * n[7]),
        (s.dx =
          3 * o * o * (n[2] - n[0]) +
          6 * o * e * (n[4] - n[2]) +
          3 * e * e * (n[6] - n[4])),
        (s.dz =
          3 * o * o * (n[3] - n[1]) +
          6 * o * e * (n[5] - n[3]) +
          3 * e * e * (n[7] - n[5])),
        s
      );
    }
    spawnAt(t, e, s, n = !1) {
      let o = this.L.roadAt(t, e, 30);
      if (!o) return null;
      let a = o.E;
      if (
        (n ? !(a.trolley && a.tr && (a.car || a.cls === "busway")) : !a.car) ||
        (!n && s() > nwt(a)) ||
        a.s1 - a.s0 < 8
      )
        return null;
      let r = Math.min(a.s1 - 4, Math.max(a.s0 + 4, o.s)),
        l = a.oneway || s() < 0.5 ? 1 : -1,
        c = this.lanes(a);
      return { E: a, dir: l, s: r, k: n ? c - 1 : Math.floor(s() * c) };
    }
    cableLines() {
      if (this.lines) return this.lines;
      let t = this.D,
        e = [],
        s = ([o, a, r, l]) => {
          let c = null,
            h = 1e9;
          for (let f of t.juns) {
            if (!f.legs.length) continue;
            let u = Math.hypot(f.x - r, f.z - l),
              d =
                f.legs.some(([m]) => m.name === o) &&
                f.legs.some(([m]) => m.name === a),
              p = u + (d ? 0 : 60);
            p < h && ((h = p), (c = f));
          }
          return c;
        };
      for (let o of awt) {
        this._pref = o.pref || null;
        let a = o.out.map(s),
          r = [a[a.length - 1], ...o.back.map(s), a[0]],
          l = (d) => {
            let p = [];
            for (let m = 0; m + 1 < d.length; m++) {
              let g = this.path(d[m], d[m + 1]);
              if (!g) return null;
              p.push(...g);
            }
            return p;
          },
          c = l(a),
          h = l(r);
        if (!c || !h || !c.length || !h.length) {
          console.warn("cable line not found", o.name);
          continue;
        }
        let f = [
          ...c,
          { turn: !0, J: a[a.length - 1] },
          ...h,
          { turn: !0, J: a[0], double: o.doubleEnded },
        ];
        f[c.length].double = o.doubleEnded;
        let u = 0;
        for (let d of f) d.E && (u += d.E.L);
        e.push({ name: o.name, route: f, n: o.n, len: u, tram: !!o.tram });
      }
      this._pref = null;
      let n = new Map();
      for (let o of e)
        for (let a of o.route)
          a.E &&
            a.E.oneway &&
            n.set(a.E, (n.get(a.E) || 0) | (a.dir > 0 ? 1 : 2));
      for (let [o, a] of n) a === 3 && (o.twoTrack = !0);
      return (this.lines = e);
    }
    path(t, e) {
      let s = this.D,
        n = s.juns.length,
        o = new Float64Array(n).fill(1 / 0),
        a = new Array(n),
        r = [],
        l = (f, u) => {
          r.push([f, u]);
          let d = r.length - 1;
          for (; d > 0;) {
            let p = (d - 1) >> 1;
            if (r[p][0] <= r[d][0]) break;
            (([r[p], r[d]] = [r[d], r[p]]), (d = p));
          }
        },
        c = () => {
          let f = r[0],
            u = r.pop();
          if (r.length) {
            r[0] = u;
            let d = 0;
            for (;;) {
              let p = 2 * d + 1,
                m = p + 1,
                g = d;
              if (
                (p < r.length && r[p][0] < r[g][0] && (g = p),
                m < r.length && r[m][0] < r[g][0] && (g = m),
                g === d)
              )
                break;
              (([r[g], r[d]] = [r[d], r[g]]), (d = g));
            }
          }
          return f;
        };
      for (o[t.id] = 0, l(0, t.id); r.length;) {
        let [f, u] = c();
        if (!(f > o[u])) {
          if (u === e.id) break;
          for (let [d, p] of s.juns[u].legs) {
            if (d.inner || d.ja < 0 || d.jb < 0 || d.ja === d.jb || d.hwy)
              continue;
            let m = p === "a" ? 1 : -1,
              g = m > 0 ? d.jb : d.ja,
              b =
                d.L *
                  (d.cab || (this._pref && d.name === this._pref) ? 1 : 6) *
                  (d.oneway && m < 0 ? 1.5 : 1) +
                2;
            f + b < o[g] &&
              ((o[g] = f + b), (a[g] = { E: d, dir: m, j: u }), l(o[g], g));
          }
        }
      }
      if (!a[e.id] && t !== e) return null;
      let h = [];
      for (let f = e.id; f !== t.id; f = a[f].j)
        h.unshift({ E: a[f].E, dir: a[f].dir });
      for (let f of h)
        if (!f.E.lg) {
          let u = Vh(f.E);
          ((f.E.lg = {
            med: f.E.oneway ? 0 : u > 0.2 && u < 0.4 ? 1.6 : 0,
            park: f.E.flags & 4 ? 0 : 2.3,
          }),
            (f.E.vmax = 9));
        }
      return h;
    }
  };
