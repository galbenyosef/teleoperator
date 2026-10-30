// app 330 — math
// Lines 157996-159218 of readable/app.pretty.js (statement-aligned).
var HM = class {
  constructor(
    t,
    e,
    {
      seed: s = 11,
      tripMax: n = 3200,
      pickMax: i = 1500,
      style: a = "comfort",
    } = {},
  ) {
    ((this.D = t), (this.L = e), (this.tripMax = n), (this.pickMax = i));
    let r = s;
    ((this.rnd = () => (r = (r * 16807) % 2147483647) / 2147483647),
      (this.style = Met.includes(a) ? a : "comfort"),
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
      (this.spots = Ia("taxi", vet)
        .map(([l, c, h, f, u]) => this._snap(l, c, h, f, u))
        .filter(Boolean)));
  }
  get adj() {
    return (this._adj ||= this._graph());
  }
  _graph() {
    let t = this.D,
      e = t.juns.map(() => []);
    for (let s of t.edges) {
      if (!GO(s)) continue;
      let n = zet(s)
          ? 12
          : s.hwy
            ? 0.55
            : s.cls === "residential" || s.cls === "unclassified"
              ? 1.15
              : s.cls === "service"
                ? 1.6
                : 1,
        i = globalThis.__RW?.off,
        a = s.hwy || i ? 1 : 13.4 / Math.min(17, Math.max(8, s.vmax || 11)),
        r = i ? 1 : 1 + Math.max(0, (s._gr ?? wMt(s)) - 0.07) * 4,
        l = (u, d) => {
          let p = t.juns[u];
          if (!p || s.hwy || i) return 0;
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
  _snap(t, e, s, n, i) {
    let a = this.L,
      [r, l] = ji(s, n),
      c = new Set(),
      h = {};
    for (let w = -72; w <= 72; w += 12)
      for (let _ = -72; _ <= 72; _ += 12) {
        if (w * w + _ * _ > 5184) continue;
        let z = a.roadAt(r + w, l + _, 30);
        z?.E &&
          fE(z.E) &&
          !z.E.elev &&
          !z.E.layered &&
          !z.E.hwy &&
          z.E.s1 - z.E.s0 > 34 &&
          c.add(z.E);
      }
    let f = null,
      u = 1e9;
    for (let w of c) {
      ys(w, r, l, h);
      let _ = h.d - (i && w.name === i ? 60 : 0);
      _ < u && ((u = _), (f = { E: w, s: h.s, v: h.v }));
    }
    if (!f) return null;
    let d = f.E,
      p = Math.min(d.s1 - 14, Math.max(d.s0 + 14, f.s)),
      m = f.v >= 0 ? 1 : -1;
    Ot(d, p, h);
    let g = h.w - (d.flags & 4 ? 1.6 : 1.3),
      b = h.w + Math.max(1, (d.sw || 3) * 0.45),
      v = h.x + h.nx * g * m,
      x = h.z + h.nz * g * m,
      y = h.x + h.nx * b * m,
      M = h.z + h.nz * b * m,
      S = {
        name: t,
        short: e,
        street: d.name,
        E: d,
        s: p,
        side: m,
        x: v,
        z: x,
        y: h.y,
        px: y,
        pz: M,
        py: h.y + 0.15,
        hx: h.dx * m,
        hz: h.dz * m,
      };
    if (!d.oneway) {
      let w = -m,
        _ = h.x + h.nx * g * w,
        z = h.z + h.nz * g * w,
        A = h.x + h.nx * b * w,
        T = h.z + h.nz * b * w;
      a.surfaceAt(_, z) === "road" &&
        a.surfaceAt(A, T) === "walk" &&
        (S.alt = {
          ...S,
          side: w,
          x: _,
          z,
          px: A,
          pz: T,
          hx: -S.hx,
          hz: -S.hz,
          alt: S,
        });
    }
    return S;
  }
  routeTo(t, e, s, n, i, a = !1) {
    let r = this._edgeNear(t, e),
      l = r?.E && GO(r.E) ? this._route(t, e, s, n, i, a, r) : null;
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
            i,
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
          [i.x, i.z],
        ],
        len: Math.hypot(i.x - t, i.z - e),
        direct: !0,
        spot: i,
      }
    );
  }
  _startsNear(t, e, s = null) {
    let n = this.L,
      i = {},
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
        if (!f?.E || a.has(f.E) || !GO(f.E)) continue;
        (a.add(f.E), ys(f.E, t, e, i));
        let u = Math.min(f.E.L - 1, Math.max(1, i.s));
        (Ot(f.E, u, i),
          r.push({
            E: f.E,
            s: u,
            d: Math.hypot(i.x - t, i.z - e),
            x: i.x,
            z: i.z,
          }));
      }
      if (r.length >= 24) break;
    }
    return r.sort((l, c) => l.d - c.d);
  }
  _route(t, e, s, n, i, a, r) {
    let l = a && i.alt ? [i, i.alt] : [i],
      c = i,
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
    let g = new VO(),
      b = new Map(),
      v = new Map(),
      x = h.juns,
      y = c.x,
      M = c.z,
      S = (U) => Math.hypot(x[U].x - y, x[U].z - M),
      w = null,
      _ = (U, G, W, V) => {
        let $ = m.get(U);
        if (!$) return;
        let J = G + $.c + (W === p ? si.turnC : 0);
        (!w || J < w.c) && (w = { j: U, c: J, g: $, last: V });
      },
      z = (U, G, W) => {
        (_(U, G, u, { start: !0, dir: W }),
          G < (b.get(U) ?? 1e18) &&
            (b.set(U, G),
            v.set(U, { start: !0, dir: W }),
            g.push(G + S(U), U)));
      };
    u.oneway
      ? z(u.jb, u.L - r.s, 1)
      : (z(d > 0 ? u.jb : u.ja, d > 0 ? u.L - r.s : r.s, d),
        r.fwd ||
          z(d > 0 ? u.ja : u.jb, (d > 0 ? r.s : u.L - r.s) + si.turnC, -d));
    let A =
        u === p &&
        (d > 0 ? c.s > r.s : c.s < r.s) &&
        l.find((U) => p.oneway || (U.side > 0 ? d > 0 : d < 0)),
      T = !!A;
    T && (c = A);
    let E = 0;
    if (!T)
      for (; g.size && E++ < 6e4;) {
        let U = g.pop(),
          G = b.get(U);
        if (w && G + S(U) * 0.98 > w.c) break;
        let W = v.get(U),
          V = W?.start ? u : W?.e?.E,
          $ = W?.e;
        for (let J of this.adj[U]) {
          let X =
            G +
            J.c +
            (J.E === V ||
            ($?.ax !== void 0 &&
              J.hx !== void 0 &&
              $.ax * J.hx + $.az * J.hz < -0.8)
              ? si.turnC
              : 0) +
            (this.avoid?.has(J.E) ? 1e5 : 0);
          (_(J.to, X, J.E, { j: U, e: J }),
            X < (b.get(J.to) ?? 1e18) &&
              (b.set(J.to, X),
              v.set(J.to, { j: U, e: J }),
              g.push(X + S(J.to), J.to)));
        }
      }
    let R = [[t, e]],
      P = (U) =>
        U.oneway
          ? 0
          : Math.min(3, Math.max(1.5, (f.w - (U.flags & 4 ? 0 : 2.3)) * 0.5)),
      C = (U, G, W) => {
        Ot(U, G, f);
        let V = P(U);
        R.push([f.x + f.nx * V * W, f.z + f.nz * V * W]);
      },
      I = 0,
      L = (U, G, W, V) => {
        let $ = Math.sign(W - G) || 1,
          J = zet(U) ? 1.5 : 8;
        J < 8 && (I += Math.abs(W - G));
        for (let X = G; $ > 0 ? X < W : X > W; X += $ * J) C(U, X, V);
        C(U, W, V);
      },
      F = (U, G, W) => U + W * Math.min(6, Math.abs(G - U) / 2),
      O = [];
    if (T)
      (L(p, F(r.s, c.s, d), c.s, d),
        O.push({ E: p, dir: d, sA: r.s, sB: c.s }));
    else if (w) {
      let U = [],
        G = w.j,
        W = w.last;
      for (; W && !W.start;) (U.push(W.e), (G = W.j), (W = v.get(G)));
      let V = W ? W.dir : d;
      O.push({ E: u, dir: V, sA: r.s, sB: V > 0 ? u.L : 0 });
      for (let J = U.length - 1; J >= 0; J--)
        O.push({
          E: U[J].E,
          dir: U[J].dir,
          sA: U[J].dir > 0 ? 0 : U[J].E.L,
          sB: U[J].dir > 0 ? U[J].E.L : 0,
        });
      (O.push({ E: p, dir: w.g.dir, sA: w.g.dir > 0 ? 0 : p.L, sB: c.s }),
        L(u, F(r.s, V > 0 ? u.L : 0, V), V > 0 ? u.L : 0, V));
      let $ = (J) => {
        let X = h.juns[J],
          tt = R[R.length - 1];
        if (Math.hypot(X.x - tt[0], X.z - tt[1]) <= 12) return;
        let Z = this.L.roadAt(X.x, X.z, 25);
        if (!Z || Z.dd <= 1) {
          R.push([X.x, X.z]);
          return;
        }
        let q = {};
        (Ot(Z.E, Z.s, q), R.push([q.x, q.z]));
      };
      for (let J = U.length - 1; J >= 0; J--) {
        let X = U[J];
        ($(X.dir > 0 ? X.E.ja : X.E.jb),
          L(X.E, X.dir > 0 ? 0 : X.E.L, X.dir > 0 ? X.E.L : 0, X.dir));
      }
      ($(w.j), L(p, w.g.dir > 0 ? 0 : p.L, c.s, w.g.dir));
    } else return null;
    T || (c = w.g.K);
    {
      let U = T ? d : w.g.dir,
        G = Math.min(16, U > 0 ? c.s - p.s0 : p.s1 - c.s);
      Ot(p, c.s, f);
      let W = f.x,
        V = f.z,
        $ = f.dx * U,
        J = f.dz * U,
        X = (c.x - f.x) * f.nx + (c.z - f.z) * f.nz,
        tt = P(p) * U,
        Z = (K) => (K[0] - W) * $ + (K[1] - V) * J,
        q = T ? Z([t, e]) : -1e9,
        j = R.length;
      for (
        ;
        j > 1 &&
        Z(R[j - 1]) > -G - 0.5 &&
        Math.hypot(R[j - 1][0] - W, R[j - 1][1] - V) < G + 12;
      )
        j--;
      if (G > 4) {
        R.length = j;
        for (let K = 4; K >= 1; K--) {
          let nt = K / 4,
            Q = 1 - nt,
            et = Q * Q * (3 - 2 * Q);
          if (-G * nt < q + 1) continue;
          Ot(p, c.s - U * G * nt, f);
          let st = tt + (X - tt) * et;
          R.push([f.x + f.nx * st, f.z + f.nz * st]);
        }
      }
    }
    (R.push([c.x, c.z]), this._onRoads(R, O), this._offIslands(R));
    let B = 0;
    for (let U = 1; U < R.length; U++)
      B += Math.hypot(R[U][0] - R[U - 1][0], R[U][1] - R[U - 1][1]);
    let H = 0,
      N = 0,
      D = h.highways?.gg?.sb;
    for (let U of O)
      (U.E.hwy && (H += Math.abs(U.sB - U.sA)),
        D && U.E === D && Math.abs(U.sB - U.sA) > 1e3 && (N = si.toll));
    return {
      pts: R,
      len: B,
      spot: c,
      slow: I,
      edges: O,
      hwy: Math.min(H, B),
      toll: N,
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
    let i = 0;
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
          v = b * d - f;
        ((r[0] += v * l.c), (r[1] -= v * l.s), i++);
      }
    }
    i && ((t.length = 0), t.push(...n));
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
      i = [t[0]],
      a = e.filter((u) => u.E.tunnel).map((u) => u.E),
      r = {},
      l = (u, d) => a.some((p) => (ys(p, u, d, r), r.d - r.w <= 1.5)),
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
          for (let v = 1; v < b; v++)
            c(m[0] + ((g[0] - m[0]) * v) / b, m[1] + ((g[1] - m[1]) * v) / b) &&
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
        let v = u + 1;
        for (
          ;
          v < t.length - 1 && Math.hypot(t[v][0] - p[0], t[v][1] - p[1]) < 2;
        )
          v++;
        let x = b >= 0 && f(t[b], d),
          y = v < t.length && f(p, t[v]),
          M = null;
        if (x && y)
          for (let S of [0.38, 0.55, 0.25]) {
            let w = [d[0] + x[0] * m * S, d[1] + x[1] * m * S],
              _ = [p[0] - y[0] * m * S, p[1] - y[1] * m * S],
              z = Math.max(4, Math.ceil(m / 4)),
              A = [d];
            for (let E = 1; E < z; E++) {
              let R = E / z,
                P = 1 - R;
              A.push([
                P * P * P * d[0] +
                  3 * P * P * R * w[0] +
                  3 * P * R * R * _[0] +
                  R * R * R * p[0],
                P * P * P * d[1] +
                  3 * P * P * R * w[1] +
                  3 * P * R * R * _[1] +
                  R * R * R * p[1],
              ]);
            }
            A.push(p);
            let T = h(A);
            if (((!M || T < M.n) && (M = { n: T, B: A }), !T)) break;
          }
        if (M && M.n < g)
          for (let S = 1; S < M.B.length - 1; S++) i.push(M.B[S]);
        else {
          let S = Math.ceil(m / 5);
          for (let w = 1; w < S; w++) {
            let _ = w / S,
              z = c(d[0] + (p[0] - d[0]) * _, d[1] + (p[1] - d[1]) * _);
            if (z) {
              Ot(z.E, z.s, n);
              let A = i[i.length - 1];
              Math.hypot(n.x - A[0], n.z - A[1]) > 0.5 && i.push([n.x, n.z]);
            }
          }
        }
      }
      i.push(p);
    }
    i.length !== t.length && ((t.length = 0), t.push(...i));
  }
  _edgeNear(t, e) {
    let s = this.L,
      n = {},
      i = s.roadAt(t, e, 60);
    if (i?.E && (fE(i.E) || (_et(i.E) && i.dd <= 0))) return i;
    let a = null;
    for (let r of [15, 30, 50, 80]) {
      for (let l = 0; l < 12; l++) {
        let c = s.roadAt(
          t + r * Math.cos(l * 0.5236),
          e + r * Math.sin(l * 0.5236),
          30,
        );
        c?.E &&
          fE(c.E) &&
          (ys(c.E, t, e, n),
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
      i = s.i || 0,
      a = 1e18;
    for (let l = Math.max(0, i - 2); l < Math.min(n.length, i + 60); l++) {
      let c = (n[l][0] - t) ** 2 + (n[l][1] - e) ** 2;
      c < a && ((a = c), (i = l));
    }
    ((s.i = i), (s.off = Math.sqrt(a)));
    let r = Math.sqrt(a);
    for (let l = i + 1; l < n.length; l++)
      r += Math.hypot(n[l][0] - n[l - 1][0], n[l][1] - n[l - 1][1]);
    return r;
  }
  _offer(t) {
    if (this.spots.length < 2) return;
    let e = this.spots
        .map((b) => [b, Math.hypot(b.x - t.pos.x, b.z - t.pos.z)])
        .filter(([b, v]) => v > 150 && v < this.pickMax && b !== this.last?.to)
        .sort((b, v) => b[1] - v[1]),
      s = e.length
        ? e.slice(0, 4)
        : this.spots
            .map((b) => [b, Math.hypot(b.x - t.pos.x, b.z - t.pos.z)])
            .filter(([, b]) => b > 60)
            .sort((b, v) => b[1] - v[1])
            .slice(0, 3),
      n = s[Math.floor(this.rnd() * s.length)][0],
      i = this.spots
        .filter((b) => b !== n)
        .map((b) => [b, Math.hypot(b.x - n.x, b.z - n.z)]),
      a = i.filter(([, b]) => b > 900 && b < this.tripMax);
    a.length || (a = i.sort((b, v) => b[1] - v[1]).slice(-5));
    let r = (b) => On("local") && b.z < -2600,
      l =
        On("local") && (r(n) || n.x < -3500)
          ? i.filter(([b, v]) => r(b) !== r(n) && v < si.crossMax)
          : [],
      c =
        Math.abs(
          Math.sin(this.rides * 91.7 + n.x * 0.0131 + n.z * 0.0071) *
            43758.5453,
        ) % 1;
    l.length && c < si.crossK && (a = l);
    let h = a[Math.floor(this.rnd() * a.length)][0],
      f = this.routeTo(n.x, n.z, n.hx, n.hz, h, !0),
      u = wet[Math.floor(this.rnd() * wet.length)],
      d = this.rnd(),
      p = this.style === "street" ? gMt : mMt,
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
      (t.len - e - s) / si.parV + s / si.parHwy + e / si.parSlow + si.parAdd,
    );
  }
  parArc(t) {
    let e = Math.min(t.slow || 0, t.len),
      s = Math.min(t.hwy || 0, t.len - e);
    return Math.round(
      (t.len - e - s) / Gf.parV + s / si.parHwy + e / si.parSlow + Gf.parAdd,
    );
  }
  get K() {
    return this.style === "street" ? Gf : si;
  }
  setStyle(t) {
    return (
      t === "arcade" && (t = "street"),
      Met.includes(t) && (this.style = t),
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
    let s = Math.round((e / Gf.bankRate) * 2) / 2;
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
              Gf.evadeP * s,
              hE("evade"),
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
        new Sv({
          L: this.L,
          cars: () => this.env.cars?.(),
          police: () => this._cops(),
        }),
        !1,
      )
    );
  }
  _skill(t, e, s, n, i = "", a = !1) {
    let r = this._chainNow();
    return (
      !a &&
        t &&
        t.chain > r.chain &&
        ((r.chain = t.chain), (r.chainT = t.chainT)),
      r.score(e, s, n, { flat: a, line: i })
    );
  }
  _onChain(t) {
    let e = this.ride,
      s = Gf;
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
            ((e.flags.saidMult = !0), (n = hE("mult"))),
          this.emit("skill", {
            key: t.key,
            label: t.label,
            pts: t.pts,
            mult: t.mult,
            line: n,
          }),
          !t.flat)
        ) {
          let i = this._cops();
          this._heat(
            (s.heatK[t.key] || 0) * (i?.pursuit ? s.heatPursuit : 1),
            bMt[t.key] || "reckless driving",
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
        (si.base + (si.perKm * (t - s) + si.perKmHwy * s) / 1e3 + e) * 2,
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
      i = n ? Math.hypot(e.pos.x - n.x, e.pos.z - n.z) : 1e9;
    (this.route &&
      ((this.left = this.remaining(e.pos.x, e.pos.z)),
      (this._rT += t),
      ((this.route.off > 32 && this._rT > 1.2) ||
        (this._rT > 6 && this.route.off > 14)) &&
        (this._target(e, n),
        this.emit("reroute"),
        (this.left = this.remaining(e.pos.x, e.pos.z)))),
      (this.dist = i));
    let a = this.K,
      r = this.route ? (this.left ?? i) : i,
      c = i < a.stopR && r < a.stopR + 6 && e.speed < a.stopV;
    if (
      ((this._stopT = c ? (this._stopT || 0) + t : 0),
      (this.near = i < 40 && r < 40 && !c),
      this.state === "offer")
    )
      this._stopT > a.stopT
        ? ((this.state = "boarding"),
          (this._bt = 0),
          (this._sx = e.pos.x),
          (this._sz = e.pos.z),
          this.emit("arrive"))
        : i > 2600 &&
          this.t - (this._reT ?? -1e9) > 20 &&
          ((this._reT = this.t),
          Math.min(
            ...this.spots
              .filter((f) => f !== n)
              .map((f) => Math.hypot(f.x - e.pos.x, f.z - e.pos.z)),
          ) <
            i * 0.6 && (this.emit("reassign"), this._offer(e)));
    else if (this.state === "boarding") {
      if (
        Math.hypot(e.pos.x - this._sx, e.pos.z - this._sz) > a.leave ||
        i > a.stopR + 4
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
        i > a.stopR + 4
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
        this._skill(this.ride, "hot", "Hot pickup", Gf.hotP, hE("hot"), !0));
  }
  seat(t, e = []) {
    return this.state !== "boarding" ? !1 : (this._pickup(t, e), !0);
  }
  _comfort(t, e, s, n) {
    let i = n.flags,
      a = e.kmh,
      r = (A, T, E, R, P) => {
        (i[A] || 0) > this.t ||
          ((i[A] = this.t + P),
          (n.comfort = Math.max(0, n.comfort - E)),
          (n.pen += R),
          n.penalties.push({ label: T, cost: R, t: n.t }),
          (i.smoothD = 0),
          A === "crash" && n.crash++,
          this.emit("penalty", { label: T, cost: R, comfort: E }));
      },
      l = e.vel?.x ?? 0,
      c = e.vel?.z ?? 0,
      h = Math.hypot(l, c),
      f = e.pos?.x ?? 0,
      u = e.pos?.z ?? 0,
      d = i.ppx !== void 0 && Math.hypot(f - i.ppx, u - i.ppz) > 3 + h * t * 2;
    ((i.ppx = f), (i.ppz = u), d && (i.pvx = i.pvy = void 0));
    let p = i.pvx === void 0,
      m = p ? 0 : (l - i.pvx) / t,
      g = p ? 0 : (c - i.pvz) / t;
    ((i.pvx = l), (i.pvz = c));
    let b = (e.impact || 0) > 0.05,
      v = h > 0.5 ? l / h : 0,
      x = h > 0.5 ? c / h : 0,
      y = b ? 0 : m * v + g * x,
      M = b || h < 1.5 ? 0 : Math.abs(g * v - m * x);
    ((i.lonS = (i.lonS || 0) + (y - (i.lonS || 0)) * Math.min(1, t / 0.2)),
      (i.latS = (i.latS || 0) + (M - (i.latS || 0)) * Math.min(1, t / 0.5)),
      (i.brakeD = Math.max(
        0,
        (i.brakeD || 0) +
          (a > 8 && !e.reverse && -i.lonS > si.brakeA
            ? -i.lonS - si.brakeA
            : -si.brakeLeak) *
            t,
      )),
      i.brakeD > si.brakeD &&
        (r("brake", "Hard braking", 9, 1.5, 1.6), (i.brakeD = 0)),
      (i.cornerD = Math.max(
        0,
        (i.cornerD || 0) +
          (a > 15 && i.latS > si.cornerA
            ? i.latS - si.cornerA
            : -si.cornerLeak) *
            t,
      )),
      i.cornerD > si.cornerD &&
        (r("corner", "Harsh cornering", 6, 1, 2.5), (i.cornerD = 0)),
      (e.drift || 0) > 0.5 && a > 30
        ? ((i.driftT = (i.driftT || 0) + t),
          i.driftT > 0.4 && r("drift", "No drifting!", 8, 2, 3))
        : (i.driftT = 0),
      (e.airTime || 0) > 0.25 && r("air", "Airborne!", 12, 3, 3));
    let S = 0,
      w = 0;
    for (let A of s)
      this._seen.has(A) ||
        (this._seen.add(A),
        A.C?.kerb ? (w = Math.max(w, A.v || 0)) : (S = Math.max(S, A.v || 0)));
    (w > si.crashV * 1.5 && (S = Math.max(S, w)),
      S > si.crashV
        ? r("crash", "Crash!", 22, 6, 1.5)
        : S > si.bumpV && r("bump", "Bump", 8, 2, 1.5));
    let _ = e.vel?.y ?? 0,
      z = i.pvy === void 0 || (e.landing || 0) > 0 ? 0 : (_ - i.pvy) / t;
    ((i.pvy = _),
      (i.vertS = (i.vertS || 0) + (z - (i.vertS || 0)) * Math.min(1, t / 0.1)),
      (i.vertMax = Math.max(i.vertMax || 0, Math.abs(i.vertS))),
      Math.abs(i.vertS) > si.joltA &&
        !((e.airTime || 0) > 0.25) &&
        r("bump", "Bump", 8, 2, 1.5),
      (i.smoothD = (i.smoothD || 0) + h * t),
      i.smoothD > si.smoothM &&
        n.smooth < si.smoothMax &&
        ((i.smoothD = 0),
        n.smooth++,
        this.emit("smooth", { bonus: 1, total: n.smooth })),
      (n.maxKmh = Math.max(n.maxKmh || 0, a)),
      e.da?.mode === "l5" && (n.autoT = (n.autoT || 0) + t));
  }
  _street(t, e, s, n) {
    let i = e.kmh || 0,
      a = e.da?.mode === "l5" && !e.da?.takeover;
    ((n.maxKmh = Math.max(n.maxKmh || 0, i)),
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
          : -Math.round(s * Math.min(si.lateK, (e / t.par) * 0.25) * 2) / 2,
      i = (t.autoT || 0) > t.t * 0.5,
      a =
        s *
        si.tipK *
        Math.min(1, Math.max(0, (t.comfort - si.tipMin) / (100 - si.tipMin))),
      r = Math.round(a * (i ? si.robotTip : 1) * 2) / 2,
      l = t.smooth || 0,
      c = s + n + r + l - t.pen,
      h = t.crash ? 0 : Math.round(s * si.floorK * 2) / 2,
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
        robot: i,
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
    let e = Gf,
      s = t.t - t.par,
      n = t.fare,
      i = (t.autoT || 0) > t.t * 0.5,
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
        robot: i,
        line: s <= 0 && !i ? hE("made") : "",
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
