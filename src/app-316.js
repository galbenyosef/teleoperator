// app 316 — math
// Lines 152348-153569 of readable/app.pretty.js (statement-aligned).
var Bw = class {
  constructor(
    t,
    e,
    {
      seed: s = 11,
      tripMax: n = 3200,
      pickMax: o = 1500,
      style: a = "comfort",
    } = {},
  ) {
    ((this.D = t), (this.L = e), (this.tripMax = n), (this.pickMax = o));
    let r = s;
    ((this.rnd = () => (r = (r * 16807) % 2147483647) / 2147483647),
      (this.style = RZ.includes(a) ? a : "comfort"),
      (this.env = { cars: () => null, police: () => null }),
      (this.bounty = 0),
      (this.banked = 0),
      (this.chain = null),
      (this._extChain = !1),
      (this.t = 0),
      (this.state = "idle"),
      (this.req = null),
      (this.ride = null),
      (this.events = []),
      (this.route = null),
      (this._rT = 0),
      (this.total = 0),
      (this.rides = 0),
      (this.stars = []),
      (this.last = null),
      (this.history = []),
      (this._seen = new WeakSet()),
      (this.spots = EZ.map(([l, c, h, f, u]) =>
        this._snap(l, c, h, f, u),
      ).filter(Boolean)));
  }
  get adj() {
    return (this._adj ||= this._graph());
  }
  _graph() {
    let t = this.D,
      e = t.juns.map(() => []);
    for (let s of t.edges) {
      if (!$I(s)) continue;
      let n = CZ(s)
          ? 12
          : s.hwy
            ? 0.55
            : s.cls === "residential" || s.cls === "unclassified"
              ? 1.15
              : s.cls === "service"
                ? 1.6
                : 1,
        o = globalThis.__RW?.off,
        a = s.hwy || o ? 1 : 13.4 / Math.min(17, Math.max(8, s.vmax || 11)),
        r = o ? 1 : 1 + Math.max(0, (s._gr ?? Zvt(s)) - 0.07) * 4,
        l = (u, d) => {
          let p = t.juns[u];
          if (!p || s.hwy || o) return 0;
          let m = p.tl?.find((g) => g.E === s && g.end === d);
          return p.ctl === 2
            ? (globalThis.__RW?.sig ?? 70)
            : p.ctl === 1 || (p.ctl === 3 && m?.stop)
              ? (globalThis.__RW?.stop ?? 50)
              : 0;
        },
        c = (u, d) => t.juns[u]?.tl?.find((p) => p.E === s && p.end === d),
        h = c(s.ja, "a"),
        f = c(s.jb, "b");
      (e[s.ja].push({
        E: s,
        to: s.jb,
        dir: 1,
        c: s.L * n * a * r + l(s.jb, "b"),
        hx: h?.hx,
        hz: h?.hz,
        ax: f ? -f.hx : void 0,
        az: f ? -f.hz : void 0,
      }),
        s.oneway ||
          e[s.jb].push({
            E: s,
            to: s.ja,
            dir: -1,
            c: s.L * n * a * r + l(s.ja, "a"),
            hx: f?.hx,
            hz: f?.hz,
            ax: h ? -h.hx : void 0,
            az: h ? -h.hz : void 0,
          }));
    }
    return e;
  }
  _snap(t, e, s, n, o) {
    let a = this.L,
      [r, l] = Gi(s, n),
      c = new Set(),
      h = {};
    for (let w = -72; w <= 72; w += 12)
      for (let z = -72; z <= 72; z += 12) {
        if (w * w + z * z > 5184) continue;
        let _ = a.roadAt(r + w, l + z, 30);
        _?.E &&
          X_(_.E) &&
          !_.E.elev &&
          !_.E.layered &&
          !_.E.hwy &&
          _.E.s1 - _.E.s0 > 34 &&
          c.add(_.E);
      }
    let f = null,
      u = 1e9;
    for (let w of c) {
      vs(w, r, l, h);
      let z = h.d - (o && w.name === o ? 60 : 0);
      z < u && ((u = z), (f = { E: w, s: h.s, v: h.v }));
    }
    if (!f) return null;
    let d = f.E,
      p = Math.min(d.s1 - 14, Math.max(d.s0 + 14, f.s)),
      m = f.v >= 0 ? 1 : -1;
    Ot(d, p, h);
    let g = h.w - (d.flags & 4 ? 1.6 : 1.3),
      b = h.w + Math.max(1, (d.sw || 3) * 0.45),
      x = h.x + h.nx * g * m,
      v = h.z + h.nz * g * m,
      y = h.x + h.nx * b * m,
      M = h.z + h.nz * b * m,
      S = {
        name: t,
        short: e,
        street: d.name,
        E: d,
        s: p,
        side: m,
        x,
        z: v,
        y: h.y,
        px: y,
        pz: M,
        py: h.y + 0.15,
        hx: h.dx * m,
        hz: h.dz * m,
      };
    if (!d.oneway) {
      let w = -m,
        z = h.x + h.nx * g * w,
        _ = h.z + h.nz * g * w,
        R = h.x + h.nx * b * w,
        T = h.z + h.nz * b * w;
      a.surfaceAt(z, _) === "road" &&
        a.surfaceAt(R, T) === "walk" &&
        (S.alt = {
          ...S,
          side: w,
          x: z,
          z: _,
          px: R,
          pz: T,
          hx: -S.hx,
          hz: -S.hz,
          alt: S,
        });
    }
    return S;
  }
  routeTo(t, e, s, n, o, a = !1) {
    let r = this._edgeNear(t, e),
      l = r?.E && $I(r.E) ? this._route(t, e, s, n, o, a, r) : null;
    if (!l)
      for (let c of this._startsNear(t, e, r?.E)) {
        let h = c.x - t,
          f = c.z - e,
          u = Math.hypot(h, f) || 1;
        if (
          ((l = this._route(
            c.x,
            c.z,
            u > 3 ? h / u : s,
            u > 3 ? f / u : n,
            o,
            a,
            c,
          )),
          l)
        ) {
          (u > 1 && (l.pts.unshift([t, e]), (l.len += u)), (l.off0 = u));
          break;
        }
      }
    return (
      l || {
        pts: [
          [t, e],
          [o.x, o.z],
        ],
        len: Math.hypot(o.x - t, o.z - e),
        direct: !0,
        spot: o,
      }
    );
  }
  _startsNear(t, e, s = null) {
    let n = this.L,
      o = {},
      a = new Set(s ? [s] : []),
      r = [];
    for (let l of [0, 20, 45, 80, 130, 200, 300, 450, 600, 800, 1050, 1350]) {
      let c = l ? Math.min(32, Math.ceil(l / 12)) : 1;
      for (let h = 0; h < c; h++) {
        let f = n.roadAt(
          t + l * Math.cos((h * 6.2832) / c),
          e + l * Math.sin((h * 6.2832) / c),
          40,
        );
        if (!f?.E || a.has(f.E) || !$I(f.E)) continue;
        (a.add(f.E), vs(f.E, t, e, o));
        let u = Math.min(f.E.L - 1, Math.max(1, o.s));
        (Ot(f.E, u, o),
          r.push({
            E: f.E,
            s: u,
            d: Math.hypot(o.x - t, o.z - e),
            x: o.x,
            z: o.z,
          }));
      }
      if (r.length >= 24) break;
    }
    return r.sort((l, c) => l.d - c.d);
  }
  _route(t, e, s, n, o, a, r) {
    let l = a && o.alt ? [o, o.alt] : [o],
      c = o,
      h = this.D,
      f = {},
      u = r.E;
    Ot(u, r.s, f);
    let d = f.dx * s + f.dz * n >= 0 ? 1 : -1,
      p = c.E,
      m = new Map();
    for (let U of l)
      ((U.side > 0 || p.oneway) && m.set(p.ja, { dir: 1, c: U.s, K: U }),
        !p.oneway &&
          U.side < 0 &&
          m.set(p.jb, { dir: -1, c: p.L - U.s, K: U }));
    let g = new XI(),
      b = new Map(),
      x = new Map(),
      v = h.juns,
      y = c.x,
      M = c.z,
      S = (U) => Math.hypot(v[U].x - y, v[U].z - M),
      w = null,
      z = (U, G, q, W) => {
        let V = m.get(U);
        if (!V) return;
        let Y = G + V.c + (q === p ? Yn.turnC : 0);
        (!w || Y < w.c) && (w = { j: U, c: Y, g: V, last: W });
      },
      _ = (U, G, q) => {
        (z(U, G, u, { start: !0, dir: q }),
          G < (b.get(U) ?? 1e18) &&
            (b.set(U, G),
            x.set(U, { start: !0, dir: q }),
            g.push(G + S(U), U)));
      };
    u.oneway
      ? _(u.jb, u.L - r.s, 1)
      : (_(d > 0 ? u.jb : u.ja, d > 0 ? u.L - r.s : r.s, d),
        r.fwd ||
          _(d > 0 ? u.ja : u.jb, (d > 0 ? r.s : u.L - r.s) + Yn.turnC, -d));
    let R =
        u === p &&
        (d > 0 ? c.s > r.s : c.s < r.s) &&
        l.find((U) => p.oneway || (U.side > 0 ? d > 0 : d < 0)),
      T = !!R;
    T && (c = R);
    let E = 0;
    if (!T)
      for (; g.size && E++ < 6e4;) {
        let U = g.pop(),
          G = b.get(U);
        if (w && G + S(U) * 0.98 > w.c) break;
        let q = x.get(U),
          W = q?.start ? u : q?.e?.E,
          V = q?.e;
        for (let Y of this.adj[U]) {
          let $ =
            G +
            Y.c +
            (Y.E === W ||
            (V?.ax !== void 0 &&
              Y.hx !== void 0 &&
              V.ax * Y.hx + V.az * Y.hz < -0.8)
              ? Yn.turnC
              : 0) +
            (this.avoid?.has(Y.E) ? 1e5 : 0);
          (z(Y.to, $, Y.E, { j: U, e: Y }),
            $ < (b.get(Y.to) ?? 1e18) &&
              (b.set(Y.to, $),
              x.set(Y.to, { j: U, e: Y }),
              g.push($ + S(Y.to), Y.to)));
        }
      }
    let A = [[t, e]],
      C = (U) =>
        U.oneway
          ? 0
          : Math.min(3, Math.max(1.5, (f.w - (U.flags & 4 ? 0 : 2.3)) * 0.5)),
      P = (U, G, q) => {
        Ot(U, G, f);
        let W = C(U);
        A.push([f.x + f.nx * W * q, f.z + f.nz * W * q]);
      },
      I = 0,
      L = (U, G, q, W) => {
        let V = Math.sign(q - G) || 1,
          Y = CZ(U) ? 1.5 : 8;
        Y < 8 && (I += Math.abs(q - G));
        for (let $ = G; V > 0 ? $ < q : $ > q; $ += V * Y) P(U, $, W);
        P(U, q, W);
      },
      F = (U, G, q) => U + q * Math.min(6, Math.abs(G - U) / 2),
      N = [];
    if (T)
      (L(p, F(r.s, c.s, d), c.s, d),
        N.push({ E: p, dir: d, sA: r.s, sB: c.s }));
    else if (w) {
      let U = [],
        G = w.j,
        q = w.last;
      for (; q && !q.start;) (U.push(q.e), (G = q.j), (q = x.get(G)));
      let W = q ? q.dir : d;
      N.push({ E: u, dir: W, sA: r.s, sB: W > 0 ? u.L : 0 });
      for (let Y = U.length - 1; Y >= 0; Y--)
        N.push({
          E: U[Y].E,
          dir: U[Y].dir,
          sA: U[Y].dir > 0 ? 0 : U[Y].E.L,
          sB: U[Y].dir > 0 ? U[Y].E.L : 0,
        });
      (N.push({ E: p, dir: w.g.dir, sA: w.g.dir > 0 ? 0 : p.L, sB: c.s }),
        L(u, F(r.s, W > 0 ? u.L : 0, W), W > 0 ? u.L : 0, W));
      let V = (Y) => {
        let $ = h.juns[Y],
          st = A[A.length - 1];
        if (Math.hypot($.x - st[0], $.z - st[1]) <= 12) return;
        let Q = this.L.roadAt($.x, $.z, 25);
        if (!Q || Q.dd <= 1) {
          A.push([$.x, $.z]);
          return;
        }
        let j = {};
        (Ot(Q.E, Q.s, j), A.push([j.x, j.z]));
      };
      for (let Y = U.length - 1; Y >= 0; Y--) {
        let $ = U[Y];
        (V($.dir > 0 ? $.E.ja : $.E.jb),
          L($.E, $.dir > 0 ? 0 : $.E.L, $.dir > 0 ? $.E.L : 0, $.dir));
      }
      (V(w.j), L(p, w.g.dir > 0 ? 0 : p.L, c.s, w.g.dir));
    } else return null;
    T || (c = w.g.K);
    {
      let U = T ? d : w.g.dir,
        G = Math.min(16, U > 0 ? c.s - p.s0 : p.s1 - c.s);
      Ot(p, c.s, f);
      let q = f.x,
        W = f.z,
        V = f.dx * U,
        Y = f.dz * U,
        $ = (c.x - f.x) * f.nx + (c.z - f.z) * f.nz,
        st = C(p) * U,
        Q = (K) => (K[0] - q) * V + (K[1] - W) * Y,
        j = T ? Q([t, e]) : -1e9,
        X = A.length;
      for (
        ;
        X > 1 &&
        Q(A[X - 1]) > -G - 0.5 &&
        Math.hypot(A[X - 1][0] - q, A[X - 1][1] - W) < G + 12;
      )
        X--;
      if (G > 4) {
        A.length = X;
        for (let K = 4; K >= 1; K--) {
          let nt = K / 4,
            Z = 1 - nt,
            et = Z * Z * (3 - 2 * Z);
          if (-G * nt < j + 1) continue;
          Ot(p, c.s - U * G * nt, f);
          let tt = st + ($ - st) * et;
          A.push([f.x + f.nx * tt, f.z + f.nz * tt]);
        }
      }
    }
    (A.push([c.x, c.z]), this._onRoads(A, N), this._offIslands(A));
    let B = 0;
    for (let U = 1; U < A.length; U++)
      B += Math.hypot(A[U][0] - A[U - 1][0], A[U][1] - A[U - 1][1]);
    let H = 0,
      O = 0,
      D = h.highways?.gg?.sb;
    for (let U of N)
      (U.E.hwy && (H += Math.abs(U.sB - U.sA)),
        D && U.E === D && Math.abs(U.sB - U.sA) > 1e3 && (O = Yn.toll));
    return {
      pts: A,
      len: B,
      spot: c,
      slow: I,
      edges: N,
      hwy: Math.min(H, B),
      toll: O,
    };
  }
  _offIslands(t) {
    let e = this.D.islands;
    if (!e || !e.length || t.length < 2) return;
    let s = (a, r) =>
        e.filter((l) => Math.abs(l.x - a) < 30 && Math.abs(l.z - r) < 30),
      n = [t[0]];
    for (let a = 1; a < t.length; a++) {
      let [r, l] = t[a - 1],
        [c, h] = t[a],
        f = Math.hypot(c - r, h - l);
      if (f > 2.5 && (s(r, l).length || s(c, h).length)) {
        let u = Math.ceil(f / 2);
        for (let d = 1; d < u; d++)
          n.push([r + ((c - r) * d) / u, l + ((h - l) * d) / u]);
      }
      n.push(t[a]);
    }
    let o = 0;
    for (let a = 1; a + 1 < n.length; a++) {
      let r = n[a];
      for (let l of s(r[0], r[1])) {
        let c = r[0] - l.x,
          h = r[1] - l.z,
          f = c * l.c - h * l.s,
          u = c * l.s + h * l.c,
          d = l.hx + 1.5,
          p = l.hz + 1;
        if (Math.abs(f) >= d || Math.abs(u) >= p) continue;
        let m = n[a - 1],
          g = (m[0] - l.x) * l.c - (m[1] - l.z) * l.s,
          b = Math.sign(Math.abs(g) > 0.3 ? g : f || 1),
          x = b * d - f;
        ((r[0] += x * l.c), (r[1] -= x * l.s), o++);
      }
    }
    o && ((t.length = 0), t.push(...n));
  }
  _onRoads(t, e = []) {
    {
      let u = 1;
      for (let d = 1; d < t.length; d++)
        Math.hypot(t[d][0] - t[u - 1][0], t[d][1] - t[u - 1][1]) > 0.05 &&
          (t[u++] = t[d]);
      t.length = u;
    }
    let s = this.L,
      n = {},
      o = [t[0]],
      a = e.filter((u) => u.E.tunnel).map((u) => u.E),
      r = {},
      l = (u, d) => a.some((p) => (vs(p, u, d, r), r.d - r.w <= 1.5)),
      c = (u, d) => {
        if (s.surfaceAt(u, d) === "road") return null;
        let p = s.roadAt(u, d, 40);
        return p && p.dd > 1.5 && !(a.length && l(u, d)) ? p : null;
      },
      h = (u) => {
        let d = 0;
        for (let p = 1; p < u.length; p++) {
          let m = u[p - 1],
            g = u[p],
            b = Math.max(
              1,
              Math.ceil(Math.hypot(g[0] - m[0], g[1] - m[1]) / 4),
            );
          for (let x = 1; x < b; x++)
            c(m[0] + ((g[0] - m[0]) * x) / b, m[1] + ((g[1] - m[1]) * x) / b) &&
              d++;
        }
        return d;
      },
      f = (u, d) => {
        let p = d[0] - u[0],
          m = d[1] - u[1],
          g = Math.hypot(p, m);
        return g > 0.3 ? [p / g, m / g] : null;
      };
    for (let u = 1; u < t.length; u++) {
      let d = t[u - 1],
        p = t[u],
        m = Math.hypot(p[0] - d[0], p[1] - d[1]),
        g = m > 6 ? h([d, p]) : 0;
      if (g) {
        let b = u - 2;
        for (; b > 0 && Math.hypot(t[b][0] - d[0], t[b][1] - d[1]) < 2;) b--;
        let x = u + 1;
        for (
          ;
          x < t.length - 1 && Math.hypot(t[x][0] - p[0], t[x][1] - p[1]) < 2;
        )
          x++;
        let v = b >= 0 && f(t[b], d),
          y = x < t.length && f(p, t[x]),
          M = null;
        if (v && y)
          for (let S of [0.38, 0.55, 0.25]) {
            let w = [d[0] + v[0] * m * S, d[1] + v[1] * m * S],
              z = [p[0] - y[0] * m * S, p[1] - y[1] * m * S],
              _ = Math.max(4, Math.ceil(m / 4)),
              R = [d];
            for (let E = 1; E < _; E++) {
              let A = E / _,
                C = 1 - A;
              R.push([
                C * C * C * d[0] +
                  3 * C * C * A * w[0] +
                  3 * C * A * A * z[0] +
                  A * A * A * p[0],
                C * C * C * d[1] +
                  3 * C * C * A * w[1] +
                  3 * C * A * A * z[1] +
                  A * A * A * p[1],
              ]);
            }
            R.push(p);
            let T = h(R);
            if (((!M || T < M.n) && (M = { n: T, B: R }), !T)) break;
          }
        if (M && M.n < g)
          for (let S = 1; S < M.B.length - 1; S++) o.push(M.B[S]);
        else {
          let S = Math.ceil(m / 5);
          for (let w = 1; w < S; w++) {
            let z = w / S,
              _ = c(d[0] + (p[0] - d[0]) * z, d[1] + (p[1] - d[1]) * z);
            if (_) {
              Ot(_.E, _.s, n);
              let R = o[o.length - 1];
              Math.hypot(n.x - R[0], n.z - R[1]) > 0.5 && o.push([n.x, n.z]);
            }
          }
        }
      }
      o.push(p);
    }
    o.length !== t.length && ((t.length = 0), t.push(...o));
  }
  _edgeNear(t, e) {
    let s = this.L,
      n = {},
      o = s.roadAt(t, e, 60);
    if (o?.E && (X_(o.E) || (LZ(o.E) && o.dd <= 0))) return o;
    let a = null;
    for (let r of [15, 30, 50, 80]) {
      for (let l = 0; l < 12; l++) {
        let c = s.roadAt(
          t + r * Math.cos(l * 0.5236),
          e + r * Math.sin(l * 0.5236),
          30,
        );
        c?.E &&
          X_(c.E) &&
          (vs(c.E, t, e, n),
          (!a || n.d < a.d) && (a = { E: c.E, s: n.s, d: n.d }));
      }
      if (a) break;
    }
    return a;
  }
  remaining(t, e) {
    let s = this.route;
    if (!s) return 0;
    let n = s.pts,
      o = s.i || 0,
      a = 1e18;
    for (let l = Math.max(0, o - 2); l < Math.min(n.length, o + 60); l++) {
      let c = (n[l][0] - t) ** 2 + (n[l][1] - e) ** 2;
      c < a && ((a = c), (o = l));
    }
    ((s.i = o), (s.off = Math.sqrt(a)));
    let r = Math.sqrt(a);
    for (let l = o + 1; l < n.length; l++)
      r += Math.hypot(n[l][0] - n[l - 1][0], n[l][1] - n[l - 1][1]);
    return r;
  }
  _offer(t) {
    let e = this.spots
        .map((b) => [b, Math.hypot(b.x - t.pos.x, b.z - t.pos.z)])
        .filter(([b, x]) => x > 150 && x < this.pickMax && b !== this.last?.to)
        .sort((b, x) => b[1] - x[1]),
      s = e.length
        ? e.slice(0, 4)
        : this.spots
            .map((b) => [b, Math.hypot(b.x - t.pos.x, b.z - t.pos.z)])
            .filter(([, b]) => b > 60)
            .sort((b, x) => b[1] - x[1])
            .slice(0, 3),
      n = s[Math.floor(this.rnd() * s.length)][0],
      o = this.spots
        .filter((b) => b !== n)
        .map((b) => [b, Math.hypot(b.x - n.x, b.z - n.z)]),
      a = o.filter(([, b]) => b > 900 && b < this.tripMax);
    a.length || (a = o.sort((b, x) => b[1] - x[1]).slice(-5));
    let r = (b) => b.z < -2600,
      l =
        r(n) || n.x < -3500
          ? o.filter(([b, x]) => r(b) !== r(n) && x < Yn.crossMax)
          : [],
      c =
        Math.abs(
          Math.sin(this.rides * 91.7 + n.x * 0.0131 + n.z * 0.0071) *
            43758.5453,
        ) % 1;
    l.length && c < Yn.crossK && (a = l);
    let h = a[Math.floor(this.rnd() * a.length)][0],
      f = this.routeTo(n.x, n.z, n.hx, n.hz, h, !0),
      u = AZ[Math.floor(this.rnd() * AZ.length)],
      d = this.rnd(),
      p = this.style === "street" ? $vt : Vvt,
      m = p[Math.floor(d * p.length)],
      g = this.fareOf(f.len, f.toll, f.hwy);
    ((this.req = {
      from: n,
      to: h,
      name: u,
      line: m,
      fare: g,
      toll: f.toll || 0,
      tripLen: f.len,
      par: this.par(f),
      parA: this.parArc(f),
      seeds: [this.rnd(), this.rnd(), this.rnd()],
      build: Math.floor(this.rnd() * 6),
    }),
      (this.state = "offer"),
      this._target(t, n, !0),
      (this.req.fromK = this.target),
      this.emit("offer", { req: this.req }));
  }
  par(t) {
    let e = Math.min(t.slow || 0, t.len),
      s = Math.min(t.hwy || 0, t.len - e);
    return Math.round(
      (t.len - e - s) / Yn.parV + s / Yn.parHwy + e / Yn.parSlow + Yn.parAdd,
    );
  }
  parArc(t) {
    let e = Math.min(t.slow || 0, t.len),
      s = Math.min(t.hwy || 0, t.len - e);
    return Math.round(
      (t.len - e - s) / af.parV + s / Yn.parHwy + e / Yn.parSlow + af.parAdd,
    );
  }
  get K() {
    return this.style === "street" ? af : Yn;
  }
  setStyle(t) {
    return (
      t === "arcade" && (t = "street"),
      RZ.includes(t) && (this.style = t),
      this.style
    );
  }
  _newRide(t, e) {
    let s = this.style === "street";
    return {
      ...t,
      par: s ? (t.parA ?? t.par) : t.par,
      style: this.style,
      t: 0,
      comfort: 100,
      penalties: [],
      pen: 0,
      best: 0,
      flags: {},
      smooth: 0,
      crash: 0,
      first: e,
      bounty: 0,
      mult: 1,
      chain: 0,
      chainT: 0,
      maxMult: 1,
      skills: 0,
      crashes: 0,
    };
  }
  _cops() {
    let t = this.env.police?.();
    return t && t.enabled !== !1 ? t : null;
  }
  _heat(t, e) {
    let s = this._cops();
    if (!s || !(t > 0)) return;
    if (s.offence) {
      s.offence(t, e, "minor");
      return;
    }
    let n = s.heat;
    ((s.heat = Math.min(5, s.heat + t)),
      n < 1 && s.heat >= 1 && s.startPursuit?.(e));
  }
  _bank(t) {
    let e = Math.round(this.bounty);
    if (e <= 0) return ((this.bounty = 0), 0);
    let s = Math.round((e / af.bankRate) * 2) / 2;
    return (
      (this.bounty = 0),
      (this.banked += e),
      (this.total += s),
      this.emit("bank", { pts: e, cash: s, why: t }),
      s
    );
  }
  _police() {
    let t = this._cops();
    if (t) {
      if (
        (this._esc0 === void 0 &&
          ((this._esc0 = t.escapes), (this._bust0 = t.busts)),
        t.pursuit && (this._lvl = Math.max(1, t.level)),
        t.escapes > this._esc0)
      ) {
        this._esc0 = t.escapes;
        let e = this.ride,
          s = this._lvl || 1;
        ((this._lvl = 0),
          e &&
            e.style === "street" &&
            !e.robot &&
            this._skill(
              e,
              "evade",
              "Pursuit evaded",
              af.evadeP * s,
              $_("evade"),
              !0,
            ),
          this._bank("evade"));
      }
      if (t.busts > this._bust0) {
        ((this._bust0 = t.busts), (this._lvl = 0));
        let e = Math.round(this.bounty);
        this.bounty = 0;
        let s =
            this.state === "ride" ||
            this.state === "alighting" ||
            this.state === "boarding",
          n = this.ride || this.req;
        ((s || e) &&
          this.emit("busted", {
            pts: e,
            fare: s && this.ride ? this.ride.fare : 0,
            name: (s && n?.name) || "",
          }),
          s &&
            ((this.ride = null),
            (this.req = null),
            (this.route = null),
            (this.target = null),
            (this._stopT = 0),
            (this.near = !1),
            (this.state = "summary"),
            (this._st = -2)));
      }
    }
  }
  useChain(t, e = !0) {
    return (
      (this.chain = t),
      (this._extChain = e),
      t.on((s) => this._onChain(s)),
      t
    );
  }
  _chainNow() {
    return (
      this.chain ||
      this.useChain(
        new Ix({
          L: this.L,
          cars: () => this.env.cars?.(),
          police: () => this._cops(),
        }),
        !1,
      )
    );
  }
  _skill(t, e, s, n, o = "", a = !1) {
    let r = this._chainNow();
    return (
      !a &&
        t &&
        t.chain > r.chain &&
        ((r.chain = t.chain), (r.chainT = t.chainT)),
      r.score(e, s, n, { flat: a, line: o })
    );
  }
  _onChain(t) {
    let e = this.ride,
      s = af;
    if (!(!e || e.style !== "street" || e.robot))
      if (t.type === "skill") {
        if (!t.flat && this.state !== "ride") return;
        ((e.bounty += t.pts),
          (this.bounty += t.pts),
          e.skills++,
          t.flat ||
            ((e.chain = t.chain),
            (e.chainT = s.chainT),
            (e.mult = t.mult),
            (e.maxMult = Math.max(e.maxMult, e.mult))));
        let n = t.line;
        if (
          (!n &&
            e.mult >= 3 &&
            !e.flags.saidMult &&
            ((e.flags.saidMult = !0), (n = $_("mult"))),
          this.emit("skill", {
            key: t.key,
            label: t.label,
            pts: t.pts,
            mult: t.mult,
            line: n,
          }),
          !t.flat)
        ) {
          let o = this._cops();
          this._heat(
            (s.heatK[t.key] || 0) * (o?.pursuit ? s.heatPursuit : 1),
            Xvt[t.key] || "reckless driving",
          );
        }
      } else if (t.type === "crash" && this.state === "ride") {
        (e.crashes++, (e.flags.crashT = this.t + 1.5), (e.flags.hitT = this.t));
        let n = e.chain > 1 || t.n > 1;
        ((e.chain = 0),
          (e.chainT = 0),
          (e.mult = 1),
          this.emit("crash", { lost: n }));
      } else t.type === "bank" && ((e.chain = 0), (e.chainT = 0));
  }
  fareOf(t, e = 0, s = 0) {
    return (
      Math.round(
        (Yn.base + (Yn.perKm * (t - s) + Yn.perKmHwy * s) / 1e3 + e) * 2,
      ) / 2
    );
  }
  _target(t, e, s = !1) {
    let n = t.forward();
    ((this.route = this.routeTo(t.pos.x, t.pos.z, n.x, n.z, e, s)),
      (this.target = this.route.spot || e),
      (this.route.i = 0),
      (this._rT = 0));
  }
  begin(t, e, s = "Test") {
    this._target(t, e, !0);
    let n = this.route;
    ((this.req = {
      from: { name: "Here", short: "Here", street: "" },
      to: e,
      name: s,
      line: "",
      fare: this.fareOf(n.len, n.toll, n.hwy),
      tripLen: n.len,
      par: this.par(n),
      parA: this.parArc(n),
      seeds: [0.5, 0.5, 0.5],
      build: 0,
      toK: this.target,
    }),
      (this.ride = this._newRide(this.req, !1)),
      (this.state = "ride"));
  }
  emit(t, e = {}) {
    this.events.push({ type: t, t: this.t, ...e });
  }
  cancel() {
    if (this.state === "idle") return;
    let t = this.ride || this.req;
    ((this.ride = null),
      (this.req = null),
      (this.route = null),
      (this.target = null),
      (this._stopT = 0),
      (this.near = !1),
      (this.state = "idle"),
      this.emit("cancel", { name: t?.name || "" }));
  }
  update(t, e, s = []) {
    if (
      ((this.t += t),
      (this.style === "street" ||
        this.bounty > 0 ||
        this.ride?.style === "street") &&
        this._police(),
      this.state === "idle")
    ) {
      this._offer(e);
      return;
    }
    let n = this.target,
      o = n ? Math.hypot(e.pos.x - n.x, e.pos.z - n.z) : 1e9;
    (this.route &&
      ((this.left = this.remaining(e.pos.x, e.pos.z)),
      (this._rT += t),
      ((this.route.off > 32 && this._rT > 1.2) ||
        (this._rT > 6 && this.route.off > 14)) &&
        (this._target(e, n),
        this.emit("reroute"),
        (this.left = this.remaining(e.pos.x, e.pos.z)))),
      (this.dist = o));
    let a = this.K,
      r = this.route ? (this.left ?? o) : o,
      c = o < a.stopR && r < a.stopR + 6 && e.speed < a.stopV;
    if (
      ((this._stopT = c ? (this._stopT || 0) + t : 0),
      (this.near = o < 40 && r < 40 && !c),
      this.state === "offer")
    )
      this._stopT > a.stopT
        ? ((this.state = "boarding"),
          (this._bt = 0),
          (this._sx = e.pos.x),
          (this._sz = e.pos.z),
          this.emit("arrive"))
        : o > 2600 &&
          this.t - (this._reT ?? -1e9) > 20 &&
          ((this._reT = this.t),
          Math.min(
            ...this.spots
              .filter((f) => f !== n)
              .map((f) => Math.hypot(f.x - e.pos.x, f.z - e.pos.z)),
          ) <
            o * 0.6 && (this.emit("reassign"), this._offer(e)));
    else if (this.state === "boarding") {
      if (
        Math.hypot(e.pos.x - this._sx, e.pos.z - this._sz) > a.leave ||
        o > a.stopR + 4
      ) {
        ((this.state = "offer"),
          (this._stopT = 0),
          this.emit("left", { phase: "boarding" }));
        return;
      }
      (e.speed < a.stopV && (this._bt += t),
        this._bt > a.board + (this.waitSeat ? 30 : 0) && this._pickup(e, s));
    } else if (this.state === "ride") {
      let h = this.ride;
      ((h.t += t),
        h.style === "street"
          ? this._street(t, e, s, h)
          : this._comfort(t, e, s, h),
        this._stopT > a.stopT &&
          ((this.state = "alighting"),
          (this._bt = 0),
          (this._sx = e.pos.x),
          (this._sz = e.pos.z),
          this.emit("arrive")));
    } else if (this.state === "alighting") {
      if (
        Math.hypot(e.pos.x - this._sx, e.pos.z - this._sz) > a.leave ||
        o > a.stopR + 4
      ) {
        ((this.state = "ride"),
          (this._stopT = 0),
          this.emit("left", { phase: "alighting" }));
        return;
      }
      if ((e.speed < a.stopV && (this._bt += t), this._bt > a.alight)) {
        let h = this._summary(this.ride);
        ((this.last = this.ride),
          this.history.push(h),
          (this.ride = null),
          (this.req = null),
          (this.route = null),
          (this.state = "summary"),
          (this._st = 0),
          this.emit("dropoff", { summary: h }));
      }
    } else
      this.state === "summary" &&
        ((this._st += t), this._st > 2.5 && (this.state = "idle"));
    this.hitT = performance?.now?.() ?? 0;
  }
  _pickup(t, e = []) {
    let s = this.req;
    this.ride = this._newRide(s, this.rides === 0);
    for (let n of e) this._seen.add(n);
    ((this.state = "ride"),
      (this._stopT = 0),
      this._target(t, s.to, !0),
      (this.ride.toK = this.target),
      this.emit("pickup", { ride: this.ride }),
      (this.ride.style === "street" && this._cops())?.pursuit &&
        this._skill(this.ride, "hot", "Hot pickup", af.hotP, $_("hot"), !0));
  }
  seat(t, e = []) {
    return this.state !== "boarding" ? !1 : (this._pickup(t, e), !0);
  }
  _comfort(t, e, s, n) {
    let o = n.flags,
      a = e.kmh,
      r = (R, T, E, A, C) => {
        (o[R] || 0) > this.t ||
          ((o[R] = this.t + C),
          (n.comfort = Math.max(0, n.comfort - E)),
          (n.pen += A),
          n.penalties.push({ label: T, cost: A, t: n.t }),
          (o.smoothD = 0),
          R === "crash" && n.crash++,
          this.emit("penalty", { label: T, cost: A, comfort: E }));
      },
      l = e.vel?.x ?? 0,
      c = e.vel?.z ?? 0,
      h = Math.hypot(l, c),
      f = e.pos?.x ?? 0,
      u = e.pos?.z ?? 0,
      d = o.ppx !== void 0 && Math.hypot(f - o.ppx, u - o.ppz) > 3 + h * t * 2;
    ((o.ppx = f), (o.ppz = u), d && (o.pvx = o.pvy = void 0));
    let p = o.pvx === void 0,
      m = p ? 0 : (l - o.pvx) / t,
      g = p ? 0 : (c - o.pvz) / t;
    ((o.pvx = l), (o.pvz = c));
    let b = (e.impact || 0) > 0.05,
      x = h > 0.5 ? l / h : 0,
      v = h > 0.5 ? c / h : 0,
      y = b ? 0 : m * x + g * v,
      M = b || h < 1.5 ? 0 : Math.abs(g * x - m * v);
    ((o.lonS = (o.lonS || 0) + (y - (o.lonS || 0)) * Math.min(1, t / 0.2)),
      (o.latS = (o.latS || 0) + (M - (o.latS || 0)) * Math.min(1, t / 0.5)),
      (o.brakeD = Math.max(
        0,
        (o.brakeD || 0) +
          (a > 8 && !e.reverse && -o.lonS > Yn.brakeA
            ? -o.lonS - Yn.brakeA
            : -Yn.brakeLeak) *
            t,
      )),
      o.brakeD > Yn.brakeD &&
        (r("brake", "Hard braking", 9, 1.5, 1.6), (o.brakeD = 0)),
      (o.cornerD = Math.max(
        0,
        (o.cornerD || 0) +
          (a > 15 && o.latS > Yn.cornerA
            ? o.latS - Yn.cornerA
            : -Yn.cornerLeak) *
            t,
      )),
      o.cornerD > Yn.cornerD &&
        (r("corner", "Harsh cornering", 6, 1, 2.5), (o.cornerD = 0)),
      (e.drift || 0) > 0.5 && a > 30
        ? ((o.driftT = (o.driftT || 0) + t),
          o.driftT > 0.4 && r("drift", "No drifting!", 8, 2, 3))
        : (o.driftT = 0),
      (e.airTime || 0) > 0.25 && r("air", "Airborne!", 12, 3, 3));
    let S = 0,
      w = 0;
    for (let R of s)
      this._seen.has(R) ||
        (this._seen.add(R),
        R.C?.kerb ? (w = Math.max(w, R.v || 0)) : (S = Math.max(S, R.v || 0)));
    (w > Yn.crashV * 1.5 && (S = Math.max(S, w)),
      S > Yn.crashV
        ? r("crash", "Crash!", 22, 6, 1.5)
        : S > Yn.bumpV && r("bump", "Bump", 8, 2, 1.5));
    let z = e.vel?.y ?? 0,
      _ = o.pvy === void 0 || (e.landing || 0) > 0 ? 0 : (z - o.pvy) / t;
    ((o.pvy = z),
      (o.vertS = (o.vertS || 0) + (_ - (o.vertS || 0)) * Math.min(1, t / 0.1)),
      (o.vertMax = Math.max(o.vertMax || 0, Math.abs(o.vertS))),
      Math.abs(o.vertS) > Yn.joltA &&
        !((e.airTime || 0) > 0.25) &&
        r("bump", "Bump", 8, 2, 1.5),
      (o.smoothD = (o.smoothD || 0) + h * t),
      o.smoothD > Yn.smoothM &&
        n.smooth < Yn.smoothMax &&
        ((o.smoothD = 0),
        n.smooth++,
        this.emit("smooth", { bonus: 1, total: n.smooth })),
      (n.maxKmh = Math.max(n.maxKmh || 0, a)),
      e.da?.mode === "l5" && (n.autoT = (n.autoT || 0) + t));
  }
  _street(t, e, s, n) {
    let o = e.kmh || 0,
      a = e.da?.mode === "l5" && !e.da?.takeover;
    ((n.maxKmh = Math.max(n.maxKmh || 0, o)),
      a && (n.autoT = (n.autoT || 0) + t),
      (n.robot = (n.autoT || 0) > n.t * 0.5 && n.t > 5));
    let r = this._chainNow();
    (this._extChain || r.update(t, e, s, !0, a),
      (n.chain = r.chain),
      (n.chainT = r.chainT),
      (n.mult = r.chain ? r.mult : r._heatM()));
  }
  _summary(t) {
    if (t.style === "street") return this._summaryStreet(t);
    let e = t.t - t.par,
      s = t.fare,
      n =
        e <= 0
          ? Math.round(s * Math.min(0.25, (-e / t.par) * 0.5) * 2) / 2
          : -Math.round(s * Math.min(Yn.lateK, (e / t.par) * 0.25) * 2) / 2,
      o = (t.autoT || 0) > t.t * 0.5,
      a =
        s *
        Yn.tipK *
        Math.min(1, Math.max(0, (t.comfort - Yn.tipMin) / (100 - Yn.tipMin))),
      r = Math.round(a * (o ? Yn.robotTip : 1) * 2) / 2,
      l = t.smooth || 0,
      c = s + n + r + l - t.pen,
      h = t.crash ? 0 : Math.round(s * Yn.floorK * 2) / 2,
      f = Math.max(0, h, Math.round(c * 2) / 2),
      u = f > Math.round(c * 2) / 2,
      d = Math.max(
        1,
        Math.min(
          5,
          Math.round((t.comfort / 100) * 4 + (e <= 0 ? 1 : e < 20 ? 0.5 : 0)),
        ),
      );
    return (
      (this.total += f),
      this.rides++,
      this.stars.push(d),
      {
        name: t.name,
        from: t.from.name,
        to: t.to.name,
        km: t.tripLen / 1e3,
        time: t.t,
        par: t.par,
        fare: s,
        timeB: n,
        tip: r,
        robot: o,
        smooth: l,
        pen: t.pen,
        capped: u,
        penalties: t.penalties.slice(),
        comfort: t.comfort,
        stars: d,
        total: f,
        sum: this.total,
        rides: this.rides,
        rating: this.stars.reduce((p, m) => p + m, 0) / this.stars.length,
      }
    );
  }
  _summaryStreet(t) {
    let e = af,
      s = t.t - t.par,
      n = t.fare,
      o = (t.autoT || 0) > t.t * 0.5,
      a = this._cops(),
      r = !!a?.pursuit,
      l =
        s <= 0
          ? Math.round(n * Math.min(e.earlyK, (-s / t.par) * 1.5) * 2) / 2
          : -Math.round(n * Math.min(e.lateK, (s / t.par) * 0.5) * 2) / 2,
      c = Math.max(0, Math.round((n + l) * 2) / 2),
      h = Math.round(this.bounty),
      f = r ? 0 : Math.round((h / e.bankRate) * 2) / 2;
    r || ((this.banked += h), (this.bounty = 0));
    let u = c + f,
      d = Math.max(
        1,
        Math.min(
          5,
          3 +
            (s <= 0 ? 1 : s > t.par * 0.3 ? -1 : 0) +
            (t.bounty >= 2e3 ? 1 : 0),
        ),
      );
    return (
      (this.total += u),
      this.rides++,
      this.stars.push(d),
      {
        style: "street",
        name: t.name,
        from: t.from.name,
        to: t.to.name,
        km: t.tripLen / 1e3,
        time: t.t,
        par: t.par,
        fare: n,
        timeB: l,
        bounty: t.bounty,
        unbanked: r ? h : 0,
        bankedPts: r ? 0 : h,
        cash: f,
        wanted: r,
        skills: t.skills,
        maxMult: t.maxMult,
        crashes: t.crashes,
        robot: o,
        line: s <= 0 && !o ? $_("made") : "",
        tip: 0,
        smooth: 0,
        pen: 0,
        capped: !1,
        penalties: [],
        comfort: 100,
        stars: d,
        total: u,
        sum: this.total,
        rides: this.rides,
        rating: this.stars.reduce((p, m) => p + m, 0) / this.stars.length,
      }
    );
  }
};
