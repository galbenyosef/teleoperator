// app 327 — math
// Lines 156644-157419 of readable/app.pretty.js (statement-aligned).
var gd = 4096,
  S2 = (o, t, e) => (o < t ? t : o > e ? e : o),
  NM = (o) => ((o = S2(o, 0, 1)), o * o * (3 - 2 * o)),
  pMt = (o) =>
    o.name === "Lombard Street" &&
    o.oneway &&
    o.cls === "residential" &&
    o.L < 400 &&
    (o._crk ??= (() => {
      let t = Ot(o, o.L / 2, {});
      return t.x > -2310 && t.x < -2140 && t.z > -760 && t.z < -700;
    })()),
  Mv = class {
    constructor(t) {
      ((this.roads = t),
        (this.D = t?.D || null),
        (this.L = t?.L || null),
        (this.X = new Float64Array(gd)),
        (this.Z = new Float64Array(gd)),
        (this.Y = new Float64Array(gd)),
        (this.S = new Float64Array(gd)),
        (this.K = new Float64Array(gd)),
        (this.V = new Float64Array(gd)),
        (this.GV = new Float64Array(gd)),
        (this.GC = new Float64Array(gd)),
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
      let i = this.n;
      if (!(i >= gd)) {
        if (i) {
          let a = t - this.X[i - 1],
            r = e - this.Z[i - 1],
            l = Math.hypot(a, r);
          if (l < 0.25) return;
          this.S[i] = this.S[i - 1] + l;
        } else this.S[0] = 0;
        ((this.X[i] = t),
          (this.Z[i] = e),
          (this.Y[i] = s),
          (this.V[i] = n),
          (this.n = i + 1));
      }
    }
    build(t, e, s = null, n = null, i = "route", a = null, r = null) {
      let l = this.roads,
        c = this._o;
      if (
        ((this.n = 0),
        (this.marks.length = 0),
        (this.chain = t),
        (this.lcs = []),
        (this._args = [t, e, s, n, i, a, r]),
        (this.kind = i),
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
          v = p.s0,
          x = p.s1,
          y = u === 0 ? S2(d.sA, v, x) : m > 0 ? v : x,
          M = g ? (m > 0 ? x : v) : S2(d.sB, v, x);
        Ot(p, y, c);
        let S;
        if (u === 0) {
          let U = (e.pos.x - c.x) * c.nx + (e.pos.z - c.z) * c.nz;
          if (h === null) {
            let G = 1e9;
            for (let W = 0; W < b; W++) {
              let V = l.laneV(p, m, W, c.w),
                $ = Math.abs(V - U);
              $ < G && ((G = $), (h = W));
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
          _ = h;
        if (g)
          if (((w = this._turn(p, m, g.E, g.dir)), w)) {
            let U = l.lanes(g.E);
            ((_ =
              w.ang < 0.6
                ? u === 0 && r !== null
                  ? Math.min(r, b - 1)
                  : h
                : w.cross > 0
                  ? b - 1
                  : 0),
              (d.kNext =
                w.ang < 0.6 ? Math.min(_, U - 1) : w.cross > 0 ? U - 1 : 0));
          } else d.kNext = 0;
        let z = Math.abs(M - y),
          A = pMt(p) ? 0.75 : 2,
          T = Math.max(1, Math.ceil(z / A)),
          E = p.vmax || 9,
          R = Math.min(45, z * 0.7),
          P = z - R - Math.min(8, z * 0.15);
        u === 0 && this._push(e.pos.x, e.pos.z, e.pos.y, E);
        let C = e.forward(),
          I = null,
          L = null;
        for (let U = 0; U <= T; U++) {
          let G = U / T,
            W = y + (M - y) * G,
            V = z * G;
          if (
            (Ot(p, W, c),
            u === 0 &&
              (c.x - e.pos.x) * C.x + (c.z - e.pos.z) * C.z < 1.5 &&
              U < T)
          )
            continue;
          let $ = m * (c.dz * c.nx - c.dx * c.nz),
            J = this.n ? this.S[this.n - 1] : 0;
          (u === 0 &&
            !I &&
            (I = {
              sA: 0,
              sB: 0,
              d: (l.laneV(p, m, h, c.w) - S) * $,
              E: p,
              dir: m,
              k: h,
              kOut: h,
              join: !0,
            }),
            u === 0 && I && V <= f && (I.sB = J),
            _ !== h &&
              V >= P &&
              !L &&
              (L = {
                sA: J,
                sB: J,
                d: (l.laneV(p, m, _, c.w) - l.laneV(p, m, h, c.w)) * $,
                E: p,
                dir: m,
                k: h,
                kOut: _,
              }),
            L && V <= P + R && (L.sB = J));
          let X = l.laneV(p, m, h, c.w);
          if (
            (_ !== h &&
              (X += (l.laneV(p, m, _, c.w) - X) * NM((V - P) / Math.max(1, R))),
            u === 0 && (X = S + (X - S) * NM(V / f)),
            !g && s)
          ) {
            let tt = Math.min(16, z),
              Z = NM((V - (z - tt)) / Math.max(1, tt));
            if (Z > 0) {
              let q = Ot(p, M, this._a),
                j = (s.x - q.x) * q.nx + (s.z - q.z) * q.nz;
              X += (j - X) * Z;
            }
          }
          this._push(c.x + c.nx * X, c.z + c.nz * X, c.y, E);
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
          O =
            F?.tl?.find((U) => U.E === p && U.end === (m > 0 ? "b" : "a")) ||
            null,
          B = m > 0 ? p.flags & 2 : p.flags & 1,
          H = Math.min(
            B || (p.oneway && m < 0) ? 1.2 : 5.3,
            Math.max(0.5, z - 3),
          ),
          N = this.S[this.n - 1];
        F &&
          this.marks.push({
            J: F,
            leg: O,
            ctl: F.ctl | 0,
            stop: F.ctl === 1 || (F.ctl === 3 && !!O?.stop),
            sLine: N - H,
            sJ: N,
            sOut: N,
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
      for (let i = 0; i < e; i += 2) {
        let a = i / e,
          r = t.roadAt(
            this.X[0] + s * i,
            this.Z[0] + n * i,
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
          p = i + h / Math.abs(l),
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
      let i = this.L;
      if (!i?.roadAt || this.n - t < 6) return;
      let a = this._q,
        r = null;
      for (let l = t; l < this.n - 1; l++) {
        let c = i.roadAt(this.X[l], this.Z[l], 3, this.Y[l], !1, a);
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
          v = Math.min(b ? 1.2 : 5.3, Math.max(0.5, g - 1)),
          x = this.S[l] + g;
        this.marks.push({
          J: p,
          leg: m,
          ctl: 2,
          stop: !1,
          sLine: x - v,
          sJ: x,
          sOut: x + 4,
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
      let i = this.D.juns[e > 0 ? t.jb : t.ja];
      if (!i?.tl) return null;
      let a = i.tl.find((f) => f.E === t && f.end === (e > 0 ? "b" : "a")),
        r = i.tl.find((f) => f.E === s && f.end === (n > 0 ? "a" : "b"));
      if (!a || !r) return null;
      let l = -a.hx,
        c = -a.hz,
        h = l * r.hx + c * r.hz;
      return { cross: l * r.hz - c * r.hx, ang: Math.acos(S2(h, -1, 1)) };
    }
    _arc(t, e, s, n, i, a, r) {
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
        v = l.laneV(s, n, Math.min(i, l.lanes(s) - 1), b.w),
        x = b.x + b.nx * v,
        y = b.z + b.nz * v,
        M = Ot(s, S2(g + 3 * n, 0, s.L), this._b),
        S = Math.hypot(M.x - b.x, M.z - b.z) || 1,
        w = (M.x - b.x) / S,
        _ = (M.z - b.z) / S,
        z = Math.hypot(x - h, y - f),
        A = a ? a.ang : 0,
        T =
          A > 2.6
            ? Math.max(9, z * 1.6)
            : Math.max(0.5, z * (A < 0.4 ? 0.34 : 0.39)),
        E = Math.max(2, Math.ceil(z / 1.5)),
        R = h,
        P = f,
        C = (O, B, H) => {
          let N = 1 - B,
            D = h + d * O,
            U = f + p * O,
            G = x - w * O,
            W = y - _ * O;
          return (
            (H[0] =
              N * N * N * R +
              3 * N * N * B * D +
              3 * N * B * B * G +
              B * B * B * x),
            (H[1] =
              N * N * N * P +
              3 * N * N * B * U +
              3 * N * B * B * W +
              B * B * B * y),
            H
          );
        },
        I = T,
        L = this.L,
        F = [0, 0];
      if (L?.surfaceAt && z > 12 && A < 2.6) {
        let O = (H) => {
            let N = 0;
            for (let D = 1; D < E; D++)
              (C(H, D / E, F), L.surfaceAt(F[0], F[1]) !== "road" && N++);
            return N;
          },
          B = O(T);
        if (B)
          for (let H of [0.55, 0.25, 0.7, 0.15, 0.85]) {
            let N = Math.max(0.5, z * H),
              D = O(N);
            if ((D < B && ((B = D), (I = N)), !D)) break;
          }
      }
      if (A > 2.6) {
        let O = x - h,
          B = y - f,
          H = O * d + B * p,
          N = O - d * H,
          D = B - p * H,
          U = Math.hypot(N, D) || 1;
        ((N /= U), (D /= U));
        let G = Math.max(U / 2, 6),
          W = 2 * G - U,
          V = Math.max(3, Math.max(0, -H) + (W > 0 ? Math.max(4, 2 * W) : 3)),
          $ = h + d * V - N * W,
          J = f + p * V - D * W,
          X = $ + N * G,
          tt = J + D * G,
          Z = u + (b.y - u) * 0.5;
        for (let Q = 1; Q <= 6; Q++) {
          let et = Q / 6,
            st = et * et * (3 - 2 * et);
          this._push(
            h + d * V * et - N * W * st,
            f + p * V * et - D * W * st,
            u + (Z - u) * et,
            r,
          );
        }
        for (let Q = 1; Q <= 12; Q++) {
          let et = (Math.PI * Q) / 12;
          this._push(
            X - N * G * Math.cos(et) + d * G * Math.sin(et),
            tt - D * G * Math.cos(et) + p * G * Math.sin(et),
            Z,
            r,
          );
        }
        let q = $ + N * 2 * G,
          j = J + D * 2 * G,
          K = Math.hypot(x - q, y - j),
          nt = Math.max(1, Math.ceil(K / 1.5));
        for (let Q = 1; Q <= nt; Q++) {
          let et = Q / nt;
          this._push(q + (x - q) * et, j + (y - j) * et, Z + (b.y - Z) * et, r);
        }
        return;
      }
      for (let O = 1; O <= E; O++) {
        let B = O / E;
        (C(I, B, F), this._push(F[0], F[1], u + (b.y - u) * B, r));
      }
    }
    clearOf(t, e = 1, s = null) {
      let n = this.n,
        i = this.X,
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
          w = i[S] - i[M],
          _ = a[S] - a[M],
          z = Math.hypot(w, _) || 1;
        ((l[y] = _ / z), (c[y] = -w / z));
      }
      let p = (y, M, S) => {
          let w = M * l[y] + S * c[y];
          (w > h[y] ? (h[y] = w) : -w > f[y] && (f[y] = -w), (d = !0));
        },
        m = s ? new Float64Array(n) : null;
      if (s)
        for (let y = 1; y < n; y++)
          s(y, i[y], a[y], u) && (m[y] = u[0] * l[y] + u[1] * c[y]);
      let g = (y, M, S) => {
        let w = i[y] - M.x,
          _ = a[y] - M.z,
          z = M.r + e + 0.6 + Math.min(0.7, Math.abs(this.K[y]) * 6);
        if (w * w + _ * _ >= z * z) return 0;
        let A = -c[y],
          T = l[y],
          E = w * l[y] + _ * c[y],
          R = S * Math.sqrt(Math.max(0, z * z - (w * A + _ * T) ** 2)) - E;
        return S * R > 0 ? R : 0;
      };
      for (let y of t) {
        if (y.t !== "circ") continue;
        let M = 0,
          S = 0,
          w = -1,
          _ = -1;
        for (let A = 1; A < n; A++) {
          let T = i[A] - y.x,
            E = a[A] - y.z;
          T * T + E * E > 12 ||
            (w < 0 && (w = A),
            (_ = A),
            (M += Math.abs(g(A, y, 1))),
            (S += Math.abs(g(A, y, -1))));
        }
        if (w < 0 || (!M && !S)) continue;
        let z = M <= S ? 1 : -1;
        for (let A = w; A <= _; A++) {
          let T = g(A, y, z);
          T && p(A, l[A] * T, c[A] * T);
        }
      }
      for (let y of t) {
        if (y.t === "circ") continue;
        let M = y.hx <= y.hz,
          S = (M ? y.hx : y.hz) + e + 0.45,
          w = (M ? y.hz : y.hx) + 1,
          _ = [],
          z = 0,
          A = 0;
        for (let E = 0; E < n; E++) {
          let R = i[E] - y.x,
            P = a[E] - y.z;
          if (R * R + P * P > 400) continue;
          let C = R * y.c - P * y.s,
            I = R * y.s + P * y.c,
            L = M ? C : I;
          Math.abs(M ? I : C) >= w ||
            Math.abs(L) >= S ||
            (_.push([E, L]), (z += S - L), (A += S + L));
        }
        let T = z <= A ? 1 : -1;
        for (let [E, R] of _) {
          let P = T * S - R;
          p(E, (M ? y.c : y.s) * P, (M ? -y.s : y.c) * P);
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
        v = new Float64Array(n),
        x = 12;
      for (let y = 0; y < n; y++)
        if (!(!h[y] && !f[y])) {
          for (let M = y; M >= 0 && r[y] - r[M] < x; M--) {
            let S = NM(1 - (r[y] - r[M]) / x);
            (h[y] * S > b[M] && (b[M] = h[y] * S),
              f[y] * S > v[M] && (v[M] = f[y] * S));
          }
          for (let M = y + 1; M < n && r[M] - r[y] < x; M++) {
            let S = NM(1 - (r[M] - r[y]) / x);
            (h[y] * S > b[M] && (b[M] = h[y] * S),
              f[y] * S > v[M] && (v[M] = f[y] * S));
          }
        }
      for (let y = 1; y < n; y++) {
        let M = b[y] - v[y];
        ((i[y] += l[y] * M), (a[y] += c[y] * M));
      }
      return (this._curv(), !0);
    }
    _curv() {
      let t = this.n,
        e = this.X,
        s = this.Z,
        n = this.S,
        i = this.K;
      for (let h = 0; h < t; h++) {
        let f = h,
          u = h;
        for (; f > 0 && n[h] - n[f] < 3;) f--;
        for (; u < t - 1 && n[u] - n[h] < 3;) u++;
        if (f === h || u === h) {
          i[h] = 0;
          continue;
        }
        let d = e[h] - e[f],
          p = s[h] - s[f],
          m = e[u] - e[h],
          g = s[u] - s[h],
          b = Math.hypot(d, p),
          v = Math.hypot(m, g),
          x = Math.atan2(d * g - p * m, d * m + p * g);
        i[h] = x / Math.max(0.5, (b + v) / 2);
      }
      let a = i[0];
      for (let h = 1; h < t - 1; h++) {
        let f = i[h];
        ((i[h] = (a + f + i[h + 1]) / 3), (a = f));
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
    locate(t, e, s, n, i = 7) {
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
          _ = l[y + 1] - S,
          z = w * w + _ * _ || 1e-9,
          A = ((t - M) * w + (e - S) * _) / z;
        A = A < 0 ? 0 : A > 1 ? 1 : A;
        let T = M + w * A - t,
          E = S + _ * A - e,
          R = T * T + E * E;
        (R < f - 0.01 ||
          (R < f + 4 &&
            w * s + _ * n > 0 &&
            y > h &&
            h >= 0 &&
            (r[h + 1] - r[h]) * s + (l[h + 1] - l[h]) * n < 0)) &&
          ((f = R), (h = y), (u = A));
      }
      if (h < 0) return ((this.lost = !0), !1);
      let m = r[h + 1] - r[h],
        g = l[h + 1] - l[h],
        b = Math.hypot(m, g) || 1,
        v = m / b,
        x = g / b;
      return (
        (this.i = h),
        (this.s = c[h] + (c[h + 1] - c[h]) * u),
        (this.e = (t - r[h] - m * u) * x - (e - l[h] - g * u) * v),
        (this.d = Math.sqrt(f)),
        (this.psi = Math.atan2(v * n - x * s, v * s + x * n) * -1),
        (this.lost = this.d > i),
        !this.lost
      );
    }
    at(t, e) {
      let s = this.n,
        n = this.S,
        i = Math.min(this.s + t, n[s - 1]),
        a = this.i;
      for (; a < s - 2 && n[a + 1] < i;) a++;
      let r = n[a + 1] - n[a] || 1,
        l = S2((i - n[a]) / r, 0, 1);
      return (
        (e.x = this.X[a] + (this.X[a + 1] - this.X[a]) * l),
        (e.z = this.Z[a] + (this.Z[a + 1] - this.Z[a]) * l),
        (e.y = this.Y[a] + (this.Y[a + 1] - this.Y[a]) * l),
        (e.i = a),
        e
      );
    }
    speedAhead(t, e, s = 140, n = 99, i = 0, a = !0, r = !0, l = 1.05, c = 0) {
      let h = this.n,
        f = this.S,
        u = this.K,
        d = this.V,
        p = this.s,
        m = (v) => (a ? d[v] * l + c : 99),
        g = r ? this.GV : this.GC,
        b = Math.min(
          n,
          m(Math.min(h - 1, this.i + 1)),
          g[Math.min(h - 1, this.i + 1)],
        );
      this.aNeed = 0;
      for (let v = this.i + 1; v < h && f[v] - p < s; v++) {
        let x = Math.abs(u[v]),
          y = Math.min(m(v), n, g[v], x > 1e-4 ? Math.sqrt(t / x) : 99),
          M = Math.max(0, f[v] - p - 2),
          S = Math.sqrt(y * y + 2 * e * M);
        if ((S < b && (b = S), i > y)) {
          let w = (i * i - y * y) / (2 * Math.max(1, M));
          w > this.aNeed && (this.aNeed = w);
        }
      }
      return b;
    }
    curvAt(t, e = 3) {
      let s = this.n,
        n = this.S,
        i = this.s + t - e,
        a = this.s + t + e,
        r = 0,
        l = 0;
      for (let c = this.i; c < s && n[c] <= a; c++)
        n[c] >= i && ((r += this.K[c]), l++);
      return l ? r / l : 0;
    }
  };
