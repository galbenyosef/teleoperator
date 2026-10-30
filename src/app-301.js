// app 301 — math
// Lines 146723-147470 of readable/app.pretty.js (statement-aligned).
var uv = class o {
  constructor(t, e) {
    ((this.D = t), (this.L = e), (this.real = !0));
    let s = {};
    for (let n of t.edges)
      eO(n) &&
        (n.vmax =
          n.maxspeed > 0
            ? Math.max(n.maxspeed * 0.447, E_[n.cls] * 0.8 || 8)
            : E_[n.cls] || 9);
    for (let n of t.juns)
      if (
        ((n.tl = n.legs.map(([i, a]) => {
          Ot(
            i,
            a === "a" ? Math.min(i.L, i.ta + 1) : Math.max(0, i.L - i.tb - 1),
            s,
          );
          let r = a === "a" ? 1 : -1;
          return {
            E: i,
            end: a,
            hx: s.dx * r,
            hz: s.dz * r,
            stop: !!(i.stops & (a === "a" ? 1 : 2)),
            ph: 0,
          };
        })),
        (n.busy = 0),
        (n.busyF = -1),
        n.ctl === 2)
      ) {
        let i = n.tl[0];
        for (let l of n.tl) l.E.rank > i.E.rank && (i = l);
        let a = [[i]],
          r = n.tl
            .filter((l) => l !== i)
            .sort(
              (l, c) =>
                (c.E.car ? 1 : 0) - (l.E.car ? 1 : 0) || c.E.rank - l.E.rank,
            );
        i.ph = 0;
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
        ((n.nph = Math.max(2, a.length)), (n.off = 0), (n.main = i));
      }
    (this.sigPlans(),
      (this.ref = []),
      (this._o = {}),
      (this._a = {}),
      (this._b = {}),
      (this.lines = null));
  }
  laneV(t, e, s, n) {
    let i = t.lg,
      a = Math.max(1, t.lanes),
      r = Math.max(0, n - 1.15);
    if (t.oneway) {
      let h = Math.max((2 * (n - i.park) - (i.bw || 0)) / a, 2.6),
        f = -(n - i.park) + h * (Math.min(s, a - 1) + 0.5);
      return Math.max(-r, Math.min(r, f));
    }
    let l = Math.max(i.med, t.colMed || 0),
      c = Math.max((n - i.park - l - (i.bw || 0)) / a, 2.6);
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
      i = Math.min(s.L, Math.max(0, t.s + 2.5 * t.dir)),
      a = Math.min(s.L, Math.max(0, t.s - 2.5 * t.dir)),
      r = Ot(s, i, this._a),
      l = r.x,
      c = r.z,
      h = r.y,
      f = Ot(s, a, this._b),
      u = l - f.x,
      d = c - f.z,
      p = Math.hypot(u, d);
    p > 0.001 ? ((u /= p), (d /= p)) : ((u = n.dx * t.dir), (d = n.dz * t.dir));
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
    return s ? { J: s, leg: s.tl.find((i) => i.E === t && i.end === n) } : null;
  }
  sigPlans() {
    let t = this.D,
      e = Jp.yellow,
      s = Jp.allRed,
      n = t.juns.filter((f) => f.ctl === 2 && f.tl?.length && f.main);
    for (let f of n) {
      let u = f.main,
        d = u.E.rank,
        p = f.nph || 2,
        m = null;
      for (let w of f.tl)
        w.ph > 0 && w.E.car && (!m || w.E.rank > m.E.rank) && (m = w);
      let g = d >= 4,
        b = Math.max(g ? Jp.C : Jp.Cs, p * (e + s + 6)),
        v = m ? (A5t[m.E.cls] ?? 0.4) : 0.3,
        x = p === 2 && v < 1,
        y = b - p * (e + s),
        M;
      if (p >= 3) M = [y * 0.4, ...new Array(p - 1).fill((y * 0.6) / (p - 1))];
      else {
        let w = x
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
        act: x,
        dem: v,
        off: ott(f.id, 7) * b,
        art: g,
      };
    }
    let i = new Set(),
      a = R5t,
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
      if (i.has(f)) continue;
      i.add(f);
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
          v = g * u.hx + b * u.hz >= 0 ? 1 : -1;
        ((p = u.hx * v), (m = u.hz * v));
      }
      for (let g of f.tl)
        g.ph === 0 &&
          g.E.car &&
          (!d || g.E.name === d) &&
          r.push([f, 0, g, g.hx * p + g.hz * m >= 0 ? 1 : -1]);
      for (; r.length;) {
        let [g, b, v, x] = r.pop(),
          y = this.sigNextAlong(g, v);
        if (!y) continue;
        let { K: M, leg: S, tt: w, out: _ } = y;
        i.has(M) ||
          !M.sg.art ||
          (i.add(M),
          h(M, S.ph, c(g, b) + x * (w + 1)),
          _ && r.push([M, S.ph, _, x]));
      }
    }
  }
  sigNextAlong(t, e) {
    let s = this.D,
      n = e.E.name,
      i = e.E,
      a = e.end,
      r = 0,
      l = 0;
    for (let c = 0; c < 6; c++) {
      let h = Math.max(6, i.vmax || 9) * (tO.vk ?? 1) + (tO.vb ?? 0);
      if (((r += i.L), (l += i.L / h), r > 600)) return null;
      let f = s.juns[a === "a" ? i.jb : i.ja];
      if (!f || !f.tl) return null;
      let u = f.tl.find((m) => m.E === i && m.end === (a === "a" ? "b" : "a"));
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
      ((i = d.E), (a = d.end));
    }
    return null;
  }
  local(t) {
    return !this.synced && !tO.dice;
  }
  served(t, e) {
    let s = t.sg;
    return !s.act || ott(t.id, e) < s.dem;
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
    for (let i = 0; i < 12; i++) {
      let a = o.ctlEnd(n);
      if (a > e) break;
      (o.ctlNext(n, a),
        n.h.push(a, n.p, n.s),
        n.h.length > 24 && n.h.splice(0, 3));
    }
    return n;
  }
  static ctlEnd(t) {
    let e = itt;
    if (t.s === 1) return t.t0 + Jp.yellow;
    if (t.s === 2) return t.t0 + Jp.allRed;
    if (t.p > 0)
      return Math.min(t.t0 + e.maxS, Math.max(t.t0 + e.minS, t.lastS + e.gapS));
    let s = 1 / 0;
    for (let i = 1; i < t.cS.length; i++)
      t.cS[i] !== null && t.cS[i] < s && (s = t.cS[i]);
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
    ((t.p = s), (t.s = 0), (t.t0 = e), s && ((t.cS[s] = null), (t.lastS = e)));
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
    let i = s + (this.tOff || 0) + n.off,
      a = Math.floor(i / n.C),
      r = i - a * n.C;
    if (!this.served(t, a)) return e ? 2 : 0;
    let l = n.a[e],
      c = n.g[e];
    return l === void 0 || r < l
      ? 2
      : r < l + c
        ? 0
        : r < l + c + Jp.yellow
          ? 1
          : 2;
  }
  sigTimes(t, e, s, n = !1) {
    let i = t.sg;
    if (!i) return { tR: 1e9, tG: 0, tN: 1e9 };
    let a = Jp.yellow;
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
        v = null,
        x = s;
      for (let y = 0; y < 16 && v === null; y++) {
        let M = m.p === e && m.s < 2,
          S = m.p === e && m.s === 0;
        (S && b === null && (b = Math.max(0, m.t0 - s)),
          !M && g === null && (g = Math.max(0, m.t0 - s)),
          S && g !== null && v === null && m.t0 > s && (v = m.t0 - s),
          g === null &&
            m.s === 0 &&
            m.p === e &&
            e > 0 &&
            n &&
            (m.lastS = 1e9));
        let w = o.ctlEnd(m);
        if (w === 1 / 0) {
          (g === null && (g = 1e9),
            b === null && (b = 1e9),
            v === null && (v = 1e9));
          break;
        }
        if (m.p === 0 && m.s === 0 && n && e === 0) {
          let _ = 1 / 0;
          for (let z = 1; z < m.cS.length; z++)
            m.cS[z] !== null && (_ = Math.min(_, m.cS[z]));
          w = Math.max(w, Math.min(_ + itt.hold, w + 4));
        }
        ((x = Math.max(x, w)), o.ctlNext(m, w));
      }
      return { tR: g ?? 0, tG: b ?? 1e9, tN: v ?? 1e9 };
    }
    let r = s + (this.tOff || 0) + i.off,
      l = Math.floor(r / i.C),
      c = (p) => {
        let m = p * i.C;
        if (!this.served(t, p)) return e ? [] : [[m, m + i.C, m + i.C]];
        let g = i.a[e],
          b = i.g[e];
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
      (h = u === null ? 0 : u >= (l + 4) * i.C - 1e-6 ? 1e9 : u - r);
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
    let { J: i, leg: a } = n,
      r = -a.hx,
      l = -a.hz,
      c = [];
    if (t.route) {
      let d = t.route[(t.ri + 1) % t.route.length];
      if (!d || d.turn) return { J: i, leg: a, end: !0, stopD: 1.5 };
      let p = i.tl.find(
        (m) => m.E === d.E && m.end === (d.dir > 0 ? "a" : "b"),
      ) || { hx: d.dir, hz: 0 };
      return this.move(
        t,
        i,
        a,
        d.E,
        d.dir,
        r * p.hz - l * p.hx,
        Math.acos(Math.max(-1, Math.min(1, r * p.hx + l * p.hz))),
        !0,
      );
    }
    let h = 0;
    for (let d of i.tl) {
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
        v = Math.acos(Math.max(-1, Math.min(1, g)));
      if (v > 2.6) continue;
      let x = v < 0.6 ? 3 : b > 0 ? 1.1 : 0.8;
      ((x *= Math.pow(0.5, Math.max(0, s.rank - p.rank))),
        p.name && p.name === s.name && (x *= 1.6),
        t.bus && (x *= p.trolley ? 30 : 1),
        c.push([p, m, b, v, x]),
        (h += x));
    }
    if (!c.length) return { J: i, leg: a, end: !0, stopD: 1.5 };
    let f = e() * h,
      u = c[0];
    for (let d of c)
      if ((f -= d[4]) <= 0) {
        u = d;
        break;
      }
    return this.move(t, i, a, u[0], u[1], u[2], u[3], !1);
  }
  move(t, e, s, n, i, a, r, l) {
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
      dir: i,
      k: h,
      turn: a >= 0 ? r : -r,
      ang: r,
      stopD: f || (t.E.oneway && t.dir < 0) ? 1.2 : 5.3,
      line: l,
    };
  }
  curve(t, e, s) {
    let n = e.F,
      i = this.sIn(n, e.dir),
      a = this.pose(
        { E: n, dir: e.dir, s: i, k: e.k, lat: void 0, cable: t.cable },
        this._q || (this._q = {}),
      ),
      r = Ot(n, i, this._o),
      l = a.target,
      c = a.x,
      h = a.z,
      f = Ot(n, Math.min(n.L, Math.max(0, i + 3 * e.dir)), this._a),
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
      v = 0,
      x = b[0],
      y = b[1];
    for (let w = 1; w <= 8; w++) {
      let _ = w / 8,
        z = 1 - _,
        A =
          z * z * z * b[0] +
          3 * z * z * _ * b[2] +
          3 * z * _ * _ * b[4] +
          _ * _ * _ * b[6],
        T =
          z * z * z * b[1] +
          3 * z * z * _ * b[3] +
          3 * z * _ * _ * b[5] +
          _ * _ * _ * b[7];
      ((v += Math.hypot(A - x, T - y)), (x = A), (y = T));
    }
    let M = e.ang > 0.25 ? v / e.ang : 1e9,
      S = Math.max(3.5, Math.sqrt(2.4 * M));
    return {
      p: b,
      len: Math.max(0.1, v),
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
      i = 1 - e;
    return (
      (s.x =
        i * i * i * n[0] +
        3 * i * i * e * n[2] +
        3 * i * e * e * n[4] +
        e * e * e * n[6]),
      (s.z =
        i * i * i * n[1] +
        3 * i * i * e * n[3] +
        3 * i * e * e * n[5] +
        e * e * e * n[7]),
      (s.dx =
        3 * i * i * (n[2] - n[0]) +
        6 * i * e * (n[4] - n[2]) +
        3 * e * e * (n[6] - n[4])),
      (s.dz =
        3 * i * i * (n[3] - n[1]) +
        6 * i * e * (n[5] - n[3]) +
        3 * e * e * (n[7] - n[5])),
      s
    );
  }
  spawnAt(t, e, s, n = !1) {
    let i = this.L.roadAt(t, e, 30);
    if (!i) return null;
    let a = i.E;
    if (
      (n ? !(a.trolley && a.tr && (a.car || a.cls === "busway")) : !a.car) ||
      (!n && s() > T5t(a)) ||
      a.s1 - a.s0 < 8
    )
      return null;
    let r = Math.min(a.s1 - 4, Math.max(a.s0 + 4, i.s)),
      l = a.oneway || s() < 0.5 ? 1 : -1,
      c = this.lanes(a);
    return { E: a, dir: l, s: r, k: n ? c - 1 : Math.floor(s() * c) };
  }
  cableLines() {
    if (this.lines) return this.lines;
    let t = this.D,
      e = [];
    if (!On("cable")) return (this.lines = e);
    let s = ([i, a, r, l]) => {
      let c = null,
        h = 1e9;
      for (let f of t.juns) {
        if (!f.legs.length) continue;
        let u = Math.hypot(f.x - r, f.z - l),
          d =
            f.legs.some(([m]) => m.name === i) &&
            f.legs.some(([m]) => m.name === a),
          p = u + (d ? 0 : 60);
        p < h && ((h = p), (c = f));
      }
      return c;
    };
    for (let i of P5t) {
      this._pref = i.pref || null;
      let a = i.out.map(s),
        r = [a[a.length - 1], ...i.back.map(s), a[0]],
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
        console.warn("cable line not found", i.name);
        continue;
      }
      let f = [
        ...c,
        { turn: !0, J: a[a.length - 1] },
        ...h,
        { turn: !0, J: a[0], double: i.doubleEnded },
      ];
      f[c.length].double = i.doubleEnded;
      let u = 0;
      for (let d of f) d.E && (u += d.E.L);
      e.push({ name: i.name, route: f, n: i.n, len: u, tram: !!i.tram });
    }
    this._pref = null;
    let n = new Map();
    for (let i of e)
      for (let a of i.route)
        a.E &&
          a.E.oneway &&
          n.set(a.E, (n.get(a.E) || 0) | (a.dir > 0 ? 1 : 2));
    for (let [i, a] of n) a === 3 && (i.twoTrack = !0);
    return (this.lines = e);
  }
  path(t, e) {
    let s = this.D,
      n = s.juns.length,
      i = new Float64Array(n).fill(1 / 0),
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
    for (i[t.id] = 0, l(0, t.id); r.length;) {
      let [f, u] = c();
      if (!(f > i[u])) {
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
          f + b < i[g] &&
            ((i[g] = f + b), (a[g] = { E: d, dir: m, j: u }), l(i[g], g));
        }
      }
    }
    if (!a[e.id] && t !== e) return null;
    let h = [];
    for (let f = e.id; f !== t.id; f = a[f].j)
      h.unshift({ E: a[f].E, dir: a[f].dir });
    for (let f of h)
      if (!f.E.lg) {
        let u = kf(f.E);
        ((f.E.lg = {
          med: f.E.oneway ? 0 : u > 0.2 && u < 0.4 ? 1.6 : 0,
          park: f.E.flags & 4 ? 0 : 2.3,
        }),
          (f.E.vmax = 9));
      }
    return h;
  }
};
