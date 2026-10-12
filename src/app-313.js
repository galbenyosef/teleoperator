// app 313 — math
// Lines 150999-151774 of readable/app.pretty.js (statement-aligned).
var Fu = 4096,
  Lm = (i, t, e) => (i < t ? t : i > e ? e : i),
  Nw = (i) => ((i = Lm(i, 0, 1)), i * i * (3 - 2 * i)),
  jvt = (i) =>
    i.name === "Lombard Street" &&
    i.oneway &&
    i.cls === "residential" &&
    i.L < 400 &&
    (i._crk ??= (() => {
      let t = Ot(i, i.L / 2, {});
      return t.x > -2310 && t.x < -2140 && t.z > -760 && t.z < -700;
    })()),
  Lx = class {
    constructor(t) {
      ((this.roads = t),
        (this.D = t?.D || null),
        (this.L = t?.L || null),
        (this.X = new Float64Array(Fu)),
        (this.Z = new Float64Array(Fu)),
        (this.Y = new Float64Array(Fu)),
        (this.S = new Float64Array(Fu)),
        (this.K = new Float64Array(Fu)),
        (this.V = new Float64Array(Fu)),
        (this.GV = new Float64Array(Fu)),
        (this.GC = new Float64Array(Fu)),
        (this.n = 0),
        (this.marks = []),
        (this.chain = []),
        (this.join = 0),
        (this.src = null),
        (this.kind = ""),
        (this.endStop = !1),
        (this.i = 0),
        (this.s = 0),
        (this.e = 0),
        (this.d = 1e9),
        (this.psi = 0),
        (this.lost = !0),
        (this._o = {}),
        (this._a = {}),
        (this._b = {}),
        (this._q = {}));
    }
    get len() {
      return this.n ? this.S[this.n - 1] : 0;
    }
    get left() {
      return this.n ? this.S[this.n - 1] - this.s : 0;
    }
    clear() {
      ((this.n = 0),
        (this.marks.length = 0),
        (this.chain.length = 0),
        (this.src = null),
        (this.kind = ""),
        (this.lost = !0),
        (this.endStop = !1));
    }
    _push(t, e, s, n) {
      let o = this.n;
      if (!(o >= Fu)) {
        if (o) {
          let a = t - this.X[o - 1],
            r = e - this.Z[o - 1],
            l = Math.hypot(a, r);
          if (l < 0.25) return;
          this.S[o] = this.S[o - 1] + l;
        } else this.S[0] = 0;
        ((this.X[o] = t),
          (this.Z[o] = e),
          (this.Y[o] = s),
          (this.V[o] = n),
          (this.n = o + 1));
      }
    }
    build(t, e, s = null, n = null, o = "route", a = null, r = null) {
      let l = this.roads,
        c = this._o;
      if (
        ((this.n = 0),
        (this.marks.length = 0),
        (this.chain = t),
        (this.lcs = []),
        (this._args = [t, e, s, n, o, a, r]),
        (this.kind = o),
        (this.endStop = !!s),
        (this.pre = a ? a.length : 0),
        !t.length)
      )
        return ((this.lost = !0), !1);
      if (a) for (let u of a) this._push(u[0], u[1], u[2], 6);
      let h = n,
        f = 16;
      for (let u = 0; u < t.length; u++) {
        let d = t[u],
          p = d.E,
          m = d.dir,
          g = t[u + 1] || null,
          b = l.lanes(p),
          x = p.s0,
          v = p.s1,
          y = u === 0 ? Lm(d.sA, x, v) : m > 0 ? x : v,
          M = g ? (m > 0 ? v : x) : Lm(d.sB, x, v);
        Ot(p, y, c);
        let S;
        if (u === 0) {
          let U = (e.pos.x - c.x) * c.nx + (e.pos.z - c.z) * c.nz;
          if (h === null) {
            let G = 1e9;
            for (let q = 0; q < b; q++) {
              let W = l.laneV(p, m, q, c.w),
                V = Math.abs(W - U);
              V < G && ((G = V), (h = q));
            }
          }
          ((S = U),
            (f = Math.max(
              6,
              Math.min(
                n === null ? 14 : this.joinMax || 16,
                Math.abs(d.sB - d.sA) * 0.5,
              ),
            )),
            (this.join =
              Math.abs(l.laneV(p, m, Math.min(h, b - 1), c.w) - U) > 0.9
                ? f + 2
                : 0));
        }
        h = Math.min(h, b - 1);
        let w = null,
          z = h;
        if (g)
          if (((w = this._turn(p, m, g.E, g.dir)), w)) {
            let U = l.lanes(g.E);
            ((z =
              w.ang < 0.6
                ? u === 0 && r !== null
                  ? Math.min(r, b - 1)
                  : h
                : w.cross > 0
                  ? b - 1
                  : 0),
              (d.kNext =
                w.ang < 0.6 ? Math.min(z, U - 1) : w.cross > 0 ? U - 1 : 0));
          } else d.kNext = 0;
        let _ = Math.abs(M - y),
          R = jvt(p) ? 0.75 : 2,
          T = Math.max(1, Math.ceil(_ / R)),
          E = p.vmax || 9,
          A = Math.min(45, _ * 0.7),
          C = _ - A - Math.min(8, _ * 0.15);
        u === 0 && this._push(e.pos.x, e.pos.z, e.pos.y, E);
        let P = e.forward(),
          I = null,
          L = null;
        for (let U = 0; U <= T; U++) {
          let G = U / T,
            q = y + (M - y) * G,
            W = _ * G;
          if (
            (Ot(p, q, c),
            u === 0 &&
              (c.x - e.pos.x) * P.x + (c.z - e.pos.z) * P.z < 1.5 &&
              U < T)
          )
            continue;
          let V = m * (c.dz * c.nx - c.dx * c.nz),
            Y = this.n ? this.S[this.n - 1] : 0;
          (u === 0 &&
            !I &&
            (I = {
              sA: 0,
              sB: 0,
              d: (l.laneV(p, m, h, c.w) - S) * V,
              E: p,
              dir: m,
              k: h,
              kOut: h,
              join: !0,
            }),
            u === 0 && I && W <= f && (I.sB = Y),
            z !== h &&
              W >= C &&
              !L &&
              (L = {
                sA: Y,
                sB: Y,
                d: (l.laneV(p, m, z, c.w) - l.laneV(p, m, h, c.w)) * V,
                E: p,
                dir: m,
                k: h,
                kOut: z,
              }),
            L && W <= C + A && (L.sB = Y));
          let $ = l.laneV(p, m, h, c.w);
          if (
            (z !== h &&
              ($ += (l.laneV(p, m, z, c.w) - $) * Nw((W - C) / Math.max(1, A))),
            u === 0 && ($ = S + ($ - S) * Nw(W / f)),
            !g && s)
          ) {
            let st = Math.min(16, _),
              Q = Nw((W - (_ - st)) / Math.max(1, st));
            if (Q > 0) {
              let j = Ot(p, M, this._a),
                X = (s.x - j.x) * j.nx + (s.z - j.z) * j.nz;
              $ += (X - $) * Q;
            }
          }
          this._push(c.x + c.nx * $, c.z + c.nz * $, c.y, E);
        }
        if (
          (I && Math.abs(I.d) > 0.9 && this.lcs.push(I),
          L && Math.abs(L.d) > 0.9 && this.lcs.push(L),
          !g)
        ) {
          s && this._push(s.x, s.z, this.Y[this.n - 1], E);
          break;
        }
        let F = this.D.juns[m > 0 ? p.jb : p.ja],
          N =
            F?.tl?.find((U) => U.E === p && U.end === (m > 0 ? "b" : "a")) ||
            null,
          B = m > 0 ? p.flags & 2 : p.flags & 1,
          H = Math.min(
            B || (p.oneway && m < 0) ? 1.2 : 5.3,
            Math.max(0.5, _ - 3),
          ),
          O = this.S[this.n - 1];
        F &&
          this.marks.push({
            J: F,
            leg: N,
            ctl: F.ctl | 0,
            stop: F.ctl === 1 || (F.ctl === 3 && !!N?.stop),
            sLine: O - H,
            sJ: O,
            sOut: O,
            turn: w ? (w.cross >= 0 ? w.ang : -w.ang) : 0,
            E: p,
            dir: m,
            F: g.E,
            dirF: g.dir,
            done: !1,
          });
        let D = this.n;
        (this._arc(
          p,
          m,
          g.E,
          g.dir,
          d.kNext ?? 0,
          w,
          Math.min(p.vmax || 9, g.E.vmax || 9),
        ),
          F &&
            ((this.marks[this.marks.length - 1].sOut = this.S[this.n - 1]),
            this._inner(D, F, p, g)),
          (h = d.kNext ?? 0));
      }
      return (
        this._joinSignals(),
        this.marks.sort((u, d) => u.sLine - d.sLine),
        this._curv(),
        (this.i = 0),
        (this.s = 0),
        (this.lost = !1),
        (this.bid = (this.bid || 0) + 1),
        this.n > 1
      );
    }
    _joinSignals() {
      let t = this.L;
      if (!t?.roadAt || this.n < 2 || this.S[1] < 4) return;
      let e = this.S[1],
        s = (this.X[1] - this.X[0]) / e,
        n = (this.Z[1] - this.Z[0]) / e;
      for (let o = 0; o < e; o += 2) {
        let a = o / e,
          r = t.roadAt(
            this.X[0] + s * o,
            this.Z[0] + n * o,
            3,
            this.Y[0] + (this.Y[1] - this.Y[0]) * a,
            !1,
            this._q,
          );
        if (!r || r.J || !r.E.car || r.dd > 1 || r.s < r.E.s0 || r.s > r.E.s1)
          continue;
        let l = s * r.dx + n * r.dz;
        if (Math.abs(l) < 0.7) continue;
        let c = l > 0 ? 1 : -1,
          h = c > 0 ? r.E.s1 - r.s : r.s - r.E.s0,
          f = this.D.juns[c > 0 ? r.E.jb : r.E.ja];
        if (f?.ctl !== 2 || h > 18 || this.marks.some((g) => g.J === f))
          continue;
        let u = f.tl?.find((g) => g.E === r.E && g.end === (c > 0 ? "b" : "a"));
        if (!u) continue;
        let d = c > 0 ? r.E.flags & 2 : r.E.flags & 1,
          p = o + h / Math.abs(l),
          m = p - (d ? 1.2 : 5.3);
        m < 0 ||
          p > e ||
          this.marks.push({
            J: f,
            leg: u,
            ctl: 2,
            stop: !1,
            sLine: m,
            sJ: p,
            sOut: p + 4,
            turn: 0,
            E: r.E,
            dir: c,
            F: r.E,
            dirF: c,
            done: !1,
            inner: !0,
          });
      }
    }
    _inner(t, e, s, n) {
      let o = this.L;
      if (!o?.roadAt || this.n - t < 6) return;
      let a = this._q,
        r = null;
      for (let l = t; l < this.n - 1; l++) {
        let c = o.roadAt(this.X[l], this.Z[l], 3, this.Y[l], !1, a);
        if (
          !c ||
          c.J ||
          !c.E.car ||
          c.dd > 1 ||
          c.E === s ||
          c.E === n.E ||
          c.E === r
        )
          continue;
        let h = this.X[l + 1] - this.X[l],
          f = this.Z[l + 1] - this.Z[l],
          u = h * c.dx + f * c.dz,
          d = u >= 0 ? 1 : -1;
        if (Math.abs(u) < 0.6 * Math.hypot(h, f)) continue;
        r = c.E;
        let p = this.D.juns[d > 0 ? c.E.jb : c.E.ja];
        if (!p || p === e || p.ctl !== 2) continue;
        let m = p.tl?.find((y) => y.E === c.E && y.end === (d > 0 ? "b" : "a"));
        if (!m) continue;
        let g = d > 0 ? c.E.s1 - c.s : c.s - c.E.s0,
          b = d > 0 ? c.E.flags & 2 : c.E.flags & 1,
          x = Math.min(b ? 1.2 : 5.3, Math.max(0.5, g - 1)),
          v = this.S[l] + g;
        this.marks.push({
          J: p,
          leg: m,
          ctl: 2,
          stop: !1,
          sLine: v - x,
          sJ: v,
          sOut: v + 4,
          turn: 0,
          E: c.E,
          dir: d,
          F: n.E,
          dirF: n.dir,
          done: !1,
          inner: !0,
        });
        break;
      }
    }
    _turn(t, e, s, n) {
      let o = this.D.juns[e > 0 ? t.jb : t.ja];
      if (!o?.tl) return null;
      let a = o.tl.find((f) => f.E === t && f.end === (e > 0 ? "b" : "a")),
        r = o.tl.find((f) => f.E === s && f.end === (n > 0 ? "a" : "b"));
      if (!a || !r) return null;
      let l = -a.hx,
        c = -a.hz,
        h = l * r.hx + c * r.hz;
      return { cross: l * r.hz - c * r.hx, ang: Math.acos(Lm(h, -1, 1)) };
    }
    _arc(t, e, s, n, o, a, r) {
      let l = this.roads,
        c = this.n;
      if (c < 2) return;
      let h = this.X[c - 1],
        f = this.Z[c - 1],
        u = this.Y[c - 1],
        d = h - this.X[c - 2],
        p = f - this.Z[c - 2],
        m = Math.hypot(d, p) || 1;
      ((d /= m), (p /= m));
      let g = n > 0 ? s.s0 : s.s1,
        b = Ot(s, g, this._a),
        x = l.laneV(s, n, Math.min(o, l.lanes(s) - 1), b.w),
        v = b.x + b.nx * x,
        y = b.z + b.nz * x,
        M = Ot(s, Lm(g + 3 * n, 0, s.L), this._b),
        S = Math.hypot(M.x - b.x, M.z - b.z) || 1,
        w = (M.x - b.x) / S,
        z = (M.z - b.z) / S,
        _ = Math.hypot(v - h, y - f),
        R = a ? a.ang : 0,
        T =
          R > 2.6
            ? Math.max(9, _ * 1.6)
            : Math.max(0.5, _ * (R < 0.4 ? 0.34 : 0.39)),
        E = Math.max(2, Math.ceil(_ / 1.5)),
        A = h,
        C = f,
        P = (N, B, H) => {
          let O = 1 - B,
            D = h + d * N,
            U = f + p * N,
            G = v - w * N,
            q = y - z * N;
          return (
            (H[0] =
              O * O * O * A +
              3 * O * O * B * D +
              3 * O * B * B * G +
              B * B * B * v),
            (H[1] =
              O * O * O * C +
              3 * O * O * B * U +
              3 * O * B * B * q +
              B * B * B * y),
            H
          );
        },
        I = T,
        L = this.L,
        F = [0, 0];
      if (L?.surfaceAt && _ > 12 && R < 2.6) {
        let N = (H) => {
            let O = 0;
            for (let D = 1; D < E; D++)
              (P(H, D / E, F), L.surfaceAt(F[0], F[1]) !== "road" && O++);
            return O;
          },
          B = N(T);
        if (B)
          for (let H of [0.55, 0.25, 0.7, 0.15, 0.85]) {
            let O = Math.max(0.5, _ * H),
              D = N(O);
            if ((D < B && ((B = D), (I = O)), !D)) break;
          }
      }
      if (R > 2.6) {
        let N = v - h,
          B = y - f,
          H = N * d + B * p,
          O = N - d * H,
          D = B - p * H,
          U = Math.hypot(O, D) || 1;
        ((O /= U), (D /= U));
        let G = Math.max(U / 2, 6),
          q = 2 * G - U,
          W = Math.max(3, Math.max(0, -H) + (q > 0 ? Math.max(4, 2 * q) : 3)),
          V = h + d * W - O * q,
          Y = f + p * W - D * q,
          $ = V + O * G,
          st = Y + D * G,
          Q = u + (b.y - u) * 0.5;
        for (let Z = 1; Z <= 6; Z++) {
          let et = Z / 6,
            tt = et * et * (3 - 2 * et);
          this._push(
            h + d * W * et - O * q * tt,
            f + p * W * et - D * q * tt,
            u + (Q - u) * et,
            r,
          );
        }
        for (let Z = 1; Z <= 12; Z++) {
          let et = (Math.PI * Z) / 12;
          this._push(
            $ - O * G * Math.cos(et) + d * G * Math.sin(et),
            st - D * G * Math.cos(et) + p * G * Math.sin(et),
            Q,
            r,
          );
        }
        let j = V + O * 2 * G,
          X = Y + D * 2 * G,
          K = Math.hypot(v - j, y - X),
          nt = Math.max(1, Math.ceil(K / 1.5));
        for (let Z = 1; Z <= nt; Z++) {
          let et = Z / nt;
          this._push(j + (v - j) * et, X + (y - X) * et, Q + (b.y - Q) * et, r);
        }
        return;
      }
      for (let N = 1; N <= E; N++) {
        let B = N / E;
        (P(I, B, F), this._push(F[0], F[1], u + (b.y - u) * B, r));
      }
    }
    clearOf(t, e = 1, s = null) {
      let n = this.n,
        o = this.X,
        a = this.Z,
        r = this.S;
      if ((!t.length && !s) || n < 2) return !1;
      let l = new Float64Array(n),
        c = new Float64Array(n),
        h = new Float64Array(n),
        f = new Float64Array(n),
        u = [0, 0],
        d = !1;
      for (let y = 0; y < n; y++) {
        let M = Math.max(0, y - 1),
          S = Math.min(n - 1, y + 1),
          w = o[S] - o[M],
          z = a[S] - a[M],
          _ = Math.hypot(w, z) || 1;
        ((l[y] = z / _), (c[y] = -w / _));
      }
      let p = (y, M, S) => {
          let w = M * l[y] + S * c[y];
          (w > h[y] ? (h[y] = w) : -w > f[y] && (f[y] = -w), (d = !0));
        },
        m = s ? new Float64Array(n) : null;
      if (s)
        for (let y = 1; y < n; y++)
          s(y, o[y], a[y], u) && (m[y] = u[0] * l[y] + u[1] * c[y]);
      let g = (y, M, S) => {
        let w = o[y] - M.x,
          z = a[y] - M.z,
          _ = M.r + e + 0.6 + Math.min(0.7, Math.abs(this.K[y]) * 6);
        if (w * w + z * z >= _ * _) return 0;
        let R = -c[y],
          T = l[y],
          E = w * l[y] + z * c[y],
          A = S * Math.sqrt(Math.max(0, _ * _ - (w * R + z * T) ** 2)) - E;
        return S * A > 0 ? A : 0;
      };
      for (let y of t) {
        if (y.t !== "circ") continue;
        let M = 0,
          S = 0,
          w = -1,
          z = -1;
        for (let R = 1; R < n; R++) {
          let T = o[R] - y.x,
            E = a[R] - y.z;
          T * T + E * E > 12 ||
            (w < 0 && (w = R),
            (z = R),
            (M += Math.abs(g(R, y, 1))),
            (S += Math.abs(g(R, y, -1))));
        }
        if (w < 0 || (!M && !S)) continue;
        let _ = M <= S ? 1 : -1;
        for (let R = w; R <= z; R++) {
          let T = g(R, y, _);
          T && p(R, l[R] * T, c[R] * T);
        }
      }
      for (let y of t) {
        if (y.t === "circ") continue;
        let M = y.hx <= y.hz,
          S = (M ? y.hx : y.hz) + e + 0.45,
          w = (M ? y.hz : y.hx) + 1,
          z = [],
          _ = 0,
          R = 0;
        for (let E = 0; E < n; E++) {
          let A = o[E] - y.x,
            C = a[E] - y.z;
          if (A * A + C * C > 400) continue;
          let P = A * y.c - C * y.s,
            I = A * y.s + C * y.c,
            L = M ? P : I;
          Math.abs(M ? I : P) >= w ||
            Math.abs(L) >= S ||
            (z.push([E, L]), (_ += S - L), (R += S + L));
        }
        let T = _ <= R ? 1 : -1;
        for (let [E, A] of z) {
          let C = T * S - A;
          p(E, (M ? y.c : y.s) * C, (M ? -y.s : y.c) * C);
        }
      }
      if (m)
        for (let y = 1; y < n; y++) {
          if (!m[y]) continue;
          let M = !0;
          for (let S = Math.max(1, y - 6); S < Math.min(n, y + 7); S++)
            if (m[y] > 0 ? f[S] : h[S]) {
              M = !1;
              break;
            }
          M &&
            (m[y] > 0
              ? (h[y] = Math.max(h[y], m[y]))
              : (f[y] = Math.max(f[y], -m[y])),
            (d = !0));
        }
      if (!d) return !1;
      let b = new Float64Array(n),
        x = new Float64Array(n),
        v = 12;
      for (let y = 0; y < n; y++)
        if (!(!h[y] && !f[y])) {
          for (let M = y; M >= 0 && r[y] - r[M] < v; M--) {
            let S = Nw(1 - (r[y] - r[M]) / v);
            (h[y] * S > b[M] && (b[M] = h[y] * S),
              f[y] * S > x[M] && (x[M] = f[y] * S));
          }
          for (let M = y + 1; M < n && r[M] - r[y] < v; M++) {
            let S = Nw(1 - (r[M] - r[y]) / v);
            (h[y] * S > b[M] && (b[M] = h[y] * S),
              f[y] * S > x[M] && (x[M] = f[y] * S));
          }
        }
      for (let y = 1; y < n; y++) {
        let M = b[y] - x[y];
        ((o[y] += l[y] * M), (a[y] += c[y] * M));
      }
      return (this._curv(), !0);
    }
    _curv() {
      let t = this.n,
        e = this.X,
        s = this.Z,
        n = this.S,
        o = this.K;
      for (let h = 0; h < t; h++) {
        let f = h,
          u = h;
        for (; f > 0 && n[h] - n[f] < 3;) f--;
        for (; u < t - 1 && n[u] - n[h] < 3;) u++;
        if (f === h || u === h) {
          o[h] = 0;
          continue;
        }
        let d = e[h] - e[f],
          p = s[h] - s[f],
          m = e[u] - e[h],
          g = s[u] - s[h],
          b = Math.hypot(d, p),
          x = Math.hypot(m, g),
          v = Math.atan2(d * g - p * m, d * m + p * g);
        o[h] = v / Math.max(0.5, (b + x) / 2);
      }
      let a = o[0];
      for (let h = 1; h < t - 1; h++) {
        let f = o[h];
        ((o[h] = (a + f + o[h + 1]) / 3), (a = f));
      }
      let r = this.Y,
        l = this.GV,
        c = (h) => {
          let f = h,
            u = h;
          for (; f > 0 && n[h] - n[f] < 4;) f--;
          for (; u < t - 1 && n[u] - n[h] < 4;) u++;
          return u > f ? (r[u] - r[f]) / (n[u] - n[f]) : 0;
        };
      for (let h = 0; h < t; h++) {
        let f = c(h),
          u = Math.abs(f) > 0.08 ? Math.max(4.5, 15 - 33 * Math.abs(f)) : 99,
          d = h,
          p = h;
        for (; d > 0 && n[h] - n[d] < 8;) d--;
        for (; p < t - 1 && n[p] - n[h] < 8;) p++;
        let m = 99;
        if (p > d + 1) {
          let g = (c(p) - c(d)) / Math.max(1, n[p] - n[d]);
          g < -0.004 && (m = Math.max(4.5, Math.sqrt(4.4 / -g)));
        }
        ((l[h] = Math.min(u, m)), (this.GC[h] = m));
      }
    }
    locate(t, e, s, n, o = 7) {
      let a = this.n;
      if (a < 2) return ((this.lost = !0), !1);
      let r = this.X,
        l = this.Z,
        c = this.S,
        h = -1,
        f = 1e18,
        u = 0,
        d = this.lost ? 0 : Math.max(0, this.i - 4),
        p = this.lost ? a - 1 : Math.min(a - 1, this.i + 60);
      for (let y = d; y < p; y++) {
        let M = r[y],
          S = l[y],
          w = r[y + 1] - M,
          z = l[y + 1] - S,
          _ = w * w + z * z || 1e-9,
          R = ((t - M) * w + (e - S) * z) / _;
        R = R < 0 ? 0 : R > 1 ? 1 : R;
        let T = M + w * R - t,
          E = S + z * R - e,
          A = T * T + E * E;
        (A < f - 0.01 ||
          (A < f + 4 &&
            w * s + z * n > 0 &&
            y > h &&
            h >= 0 &&
            (r[h + 1] - r[h]) * s + (l[h + 1] - l[h]) * n < 0)) &&
          ((f = A), (h = y), (u = R));
      }
      if (h < 0) return ((this.lost = !0), !1);
      let m = r[h + 1] - r[h],
        g = l[h + 1] - l[h],
        b = Math.hypot(m, g) || 1,
        x = m / b,
        v = g / b;
      return (
        (this.i = h),
        (this.s = c[h] + (c[h + 1] - c[h]) * u),
        (this.e = (t - r[h] - m * u) * v - (e - l[h] - g * u) * x),
        (this.d = Math.sqrt(f)),
        (this.psi = Math.atan2(x * n - v * s, x * s + v * n) * -1),
        (this.lost = this.d > o),
        !this.lost
      );
    }
    at(t, e) {
      let s = this.n,
        n = this.S,
        o = Math.min(this.s + t, n[s - 1]),
        a = this.i;
      for (; a < s - 2 && n[a + 1] < o;) a++;
      let r = n[a + 1] - n[a] || 1,
        l = Lm((o - n[a]) / r, 0, 1);
      return (
        (e.x = this.X[a] + (this.X[a + 1] - this.X[a]) * l),
        (e.z = this.Z[a] + (this.Z[a + 1] - this.Z[a]) * l),
        (e.y = this.Y[a] + (this.Y[a + 1] - this.Y[a]) * l),
        (e.i = a),
        e
      );
    }
    speedAhead(t, e, s = 140, n = 99, o = 0, a = !0, r = !0, l = 1.05, c = 0) {
      let h = this.n,
        f = this.S,
        u = this.K,
        d = this.V,
        p = this.s,
        m = (x) => (a ? d[x] * l + c : 99),
        g = r ? this.GV : this.GC,
        b = Math.min(
          n,
          m(Math.min(h - 1, this.i + 1)),
          g[Math.min(h - 1, this.i + 1)],
        );
      this.aNeed = 0;
      for (let x = this.i + 1; x < h && f[x] - p < s; x++) {
        let v = Math.abs(u[x]),
          y = Math.min(m(x), n, g[x], v > 1e-4 ? Math.sqrt(t / v) : 99),
          M = Math.max(0, f[x] - p - 2),
          S = Math.sqrt(y * y + 2 * e * M);
        if ((S < b && (b = S), o > y)) {
          let w = (o * o - y * y) / (2 * Math.max(1, M));
          w > this.aNeed && (this.aNeed = w);
        }
      }
      return b;
    }
    curvAt(t, e = 3) {
      let s = this.n,
        n = this.S,
        o = this.s + t - e,
        a = this.s + t + e,
        r = 0,
        l = 0;
      for (let c = this.i; c < s && n[c] <= a; c++)
        n[c] >= o && ((r += this.K[c]), l++);
      return l ? r / l : 0;
    }
  };
