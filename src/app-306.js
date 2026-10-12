// app 306 — math
// Lines 147540-148077 of readable/app.pretty.js (statement-aligned).
var I_ = class {
  constructor(t, e, s = {}) {
    ((this.def = s), (this.name = s.name || "Street race"));
    let n = [],
      o = {},
      a = [],
      r = (v, y, M, S) => {
        let w = n[n.length - 1];
        (!w || Math.hypot(v - w[0], M - w[2]) > 0.3) && n.push([v, y, M, S]);
      };
    for (let v = 0; v < e.length; v++) {
      let y = e[v],
        M = Math.max(1, Math.ceil(Math.abs(y.sb - y.sa) / 3)),
        S = PI(y.E, y.dir);
      for (let C = 0; C <= M; C++) {
        let P = y.sa + ((y.sb - y.sa) * C) / M;
        (Ot(y.E, P, o),
          r(
            o.x + o.nx * S,
            o.y,
            o.z + o.nz * S,
            S ? Math.max(3.5, o.w / 2 - 1) : o.w,
          ));
      }
      let w = e[v + 1];
      if (!w) break;
      let z = t.D.juns[y.dir > 0 ? y.E.jb : y.E.ja];
      Ot(w.E, w.sa, o);
      let _ = PI(w.E, w.dir),
        R = n.length - 1,
        T = n[n.length - 1],
        E = [
          o.x + o.nx * _,
          o.y,
          o.z + o.nz * _,
          _ ? Math.max(3.5, o.w / 2 - 1) : o.w,
        ],
        A = z
          ? [z.x, (T[1] + E[1]) / 2, z.z]
          : [(T[0] + E[0]) / 2, (T[1] + E[1]) / 2, (T[2] + E[2]) / 2];
      for (let C = 1; C < 8; C++) {
        let P = C / 8,
          I = 1 - P;
        r(
          I * I * T[0] + 2 * I * P * A[0] + P * P * E[0],
          I * T[1] + P * E[1],
          I * I * T[2] + 2 * I * P * A[2] + P * P * E[2],
          Math.max(T[3], E[3]),
        );
      }
      a.push({ J: z, st: y, nx: w, pa: R, pb: n.length });
    }
    let l = [0];
    for (let v = 1; v < n.length; v++)
      l.push(
        l[v - 1] + Math.hypot(n[v][0] - n[v - 1][0], n[v][2] - n[v - 1][2]),
      );
    this.L = l[l.length - 1];
    let c = Math.max(2, Math.floor(this.L / vp) + 1);
    ((this.n = c),
      (this.X = new Float32Array(c)),
      (this.Y = new Float32Array(c)),
      (this.Z = new Float32Array(c)),
      (this.W = new Float32Array(c)),
      (this.DX = new Float32Array(c)),
      (this.DZ = new Float32Array(c)));
    for (let v = 0, y = 0; v < c; v++) {
      let M = v * vp;
      for (; y < l.length - 2 && l[y + 1] < M;) y++;
      let S = Math.min(
          1,
          Math.max(0, (M - l[y]) / Math.max(1e-6, l[y + 1] - l[y])),
        ),
        w = n[y],
        z = n[y + 1];
      ((this.X[v] = w[0] + (z[0] - w[0]) * S),
        (this.Y[v] = w[1] + (z[1] - w[1]) * S),
        (this.Z[v] = w[2] + (z[2] - w[2]) * S),
        (this.W[v] = w[3] + (z[3] - w[3]) * S));
    }
    for (let v = 0; v < c; v++) {
      let y = Math.max(0, v - 2),
        M = Math.min(c - 1, v + 2),
        S = this.X[M] - this.X[y],
        w = this.Z[M] - this.Z[y],
        z = Math.hypot(S, w) || 1;
      ((this.DX[v] = S / z), (this.DZ[v] = w / z));
    }
    ((this.start = C_), (this.finish = this.L - 6), (this.cps = []));
    let h = Math.max(1, Math.round((this.finish - C_) / dvt));
    for (let v = 1; v <= h; v++)
      this.cps.push(C_ + ((this.finish - C_) * v) / h);
    ((this.rails = []),
      (this.walls = []),
      (this.colliders = []),
      (this.turns = []),
      (this.juncs = []));
    let { X: f, Z: u, Y: d, W: p, DX: m, DZ: g } = this,
      b = (v, y, M) => {
        for (let S = Math.max(0, M - 50); S <= Math.min(c - 1, M + 50); S++)
          if ((f[S] - v) ** 2 + (u[S] - y) ** 2 < (p[S] + oZ - 0.3) ** 2)
            return !0;
        return !1;
      },
      x = (v, y) => {
        let M = [[]];
        for (let S of v)
          S.ok === !1
            ? M[M.length - 1].length && M.push([])
            : M[M.length - 1].push(S);
        for (let S of M)
          if (!(S.length < 2)) {
            this.rails.push(S);
            for (let w = 0; w + 1 < S.length; w++) {
              let z = S[w],
                _ = S[w + 1],
                R = _.x - z.x,
                T = _.z - z.z,
                E = Math.hypot(R, T);
              if (E < 0.05) continue;
              let A = {
                  t: "obb",
                  x: (z.x + _.x) / 2,
                  z: (z.z + _.z) / 2,
                  hx: E / 2 + 0.25,
                  hz: 0.3,
                  c: R / E,
                  s: -T / E,
                  y0: Math.min(z.y, _.y) - 1,
                  y1: Math.max(z.y, _.y) + 2.5,
                  raceWall: !0,
                },
                C = y(A),
                P =
                  (-T / E) * (C.x - A.x) + (R / E) * (C.z - A.z) >= 0 ? 1 : -1;
              ((A.nx = (-T / E) * P),
                (A.nz = (R / E) * P),
                this.colliders.push(A),
                this.walls.push(A));
            }
          }
      };
    for (let v of a) {
      let y = l[Math.min(v.pa, l.length - 1)],
        M = l[Math.min(v.pb, l.length - 1)],
        S = (y + M) / 2,
        { J: w, st: z, nx: _ } = v,
        R = this.at(y - 6),
        T = this.at(M + 6, {}),
        E = R.dx * T.dx + R.dz * T.dz,
        A = [];
      if (w && w.tl) {
        let U = z.dir > 0 ? "b" : "a",
          G = _.dir > 0 ? "a" : "b";
        for (let q of w.tl) {
          let W = q.E;
          if (
            (W === z.E && q.end === U) ||
            (W === _.E && q.end === G) ||
            A.some((st) => st.l.E === W && st.l.end === q.end) ||
            R.dx * q.hx + R.dz * q.hz < -0.5
          )
            continue;
          let V =
              q.end === "a"
                ? Math.min(W.L, W.ta + 3)
                : Math.max(0, W.L - W.tb - 3),
            Y = q.end === "a" ? Math.min(W.L, V + 18) : Math.max(0, V - 18);
          Ot(W, Y, o);
          let $ = this.project(o.x, o.z, S);
          $.d < this.at($.s).w + 4 || A.push({ l: q, s: V });
        }
      }
      let C = A.some(({ l: U }) => {
          let G = R.dx * U.hx + R.dz * U.hz;
          return G > 0.8 && G > E - 0.12;
        }),
        P = E < 0.87 || C;
      if ((this.juncs.push({ s: S, id: w?.id, turn: P }), !P)) continue;
      let I = { s: S, id: w?.id, legs: [] };
      this.turns.push(I);
      let L = Math.round(S / vp),
        F = { x: T.dx - R.dx, z: T.dz - R.dz };
      {
        let U = Math.hypot(F.x, F.z);
        U > 0.2 ? ((F.x /= U), (F.z /= U)) : ((F.x = T.dx), (F.z = T.dz));
      }
      for (let { l: U, s: G } of A) {
        Ot(U.E, G, o);
        let q = o.w + 3.5,
          W = -o.dz,
          V = o.dx,
          Y = W * F.x + V * F.z >= 0 ? 1 : -1,
          $ = [];
        for (
          let st = 0, Q = Math.max(2, Math.ceil((q * 2) / 1.5));
          st <= Q;
          st++
        ) {
          let j = (-q + (2 * q * st) / Q) * Y,
            X = o.x + W * j,
            K = o.z + V * j;
          $.push({ x: X, z: K, y: o.y, ok: !b(X, K, L) });
        }
        (I.legs.push({ x: o.x, z: o.z, w: o.w, hx: U.hx, hz: U.hz }),
          x($, () => ({ x: w.x, z: w.z })));
      }
      let N = (I.side = R.dx * T.dz - R.dz * T.dx > 0 ? -1 : 1),
        B = Math.max(0, Math.floor((y - 12) / vp)),
        H = Math.min(c - 1, Math.ceil((M + 12) / vp)),
        O = [];
      for (let U = B; U <= H; U++) {
        let G = p[U] + oZ,
          q = f[U] - g[U] * G * N,
          W = u[U] + m[U] * G * N;
        O.push({ x: q, z: W, y: d[U], ok: !b(q, W, U) });
      }
      let D = (U, G, q) => ({
        x: U.x - m[G] * 3 * q - g[G] * 2.5 * N,
        z: U.z - g[G] * 3 * q + m[G] * 2.5 * N,
        y: U.y,
      });
      (O.length >= 2 &&
        O[0].ok &&
        O[O.length - 1].ok &&
        (O.unshift(D(O[0], B, 1)), O.push(D(O[O.length - 1], H, -1))),
        x(O, (U) => this.at(this.project(U.x, U.z, S).s)));
    }
    ((this.group = new ke()),
      (this.group.name = "RaceTrack"),
      this._buildCarpet(),
      this._buildWalls(),
      this._buildGates());
  }
  at(t, e = {}) {
    if (t < 0)
      return (
        (e.x = this.X[0] + this.DX[0] * t),
        (e.y = this.Y[0]),
        (e.z = this.Z[0] + this.DZ[0] * t),
        (e.dx = this.DX[0]),
        (e.dz = this.DZ[0]),
        (e.w = this.W[0]),
        e
      );
    let s = Math.min(this.n - 1.001, t / vp),
      n = Math.floor(s),
      o = s - n,
      a = n + 1;
    ((e.x = this.X[n] + (this.X[a] - this.X[n]) * o),
      (e.y = this.Y[n] + (this.Y[a] - this.Y[n]) * o),
      (e.z = this.Z[n] + (this.Z[a] - this.Z[n]) * o));
    let r = this.DX[n] + (this.DX[a] - this.DX[n]) * o,
      l = this.DZ[n] + (this.DZ[a] - this.DZ[n]) * o,
      c = Math.hypot(r, l) || 1;
    return (
      (e.dx = r / c),
      (e.dz = l / c),
      (e.w = this.W[n] + (this.W[a] - this.W[n]) * o),
      e
    );
  }
  project(t, e, s = null, n = {}) {
    let o = this.n,
      a = s == null ? null : Math.round(s / vp),
      r = a == null ? 0 : Math.max(0, a - 40),
      l = a == null ? o - 1 : Math.min(o - 1, a + 60),
      c = r,
      h = 1e18;
    for (let g = r; g <= l; g++) {
      let b = (this.X[g] - t) ** 2 + (this.Z[g] - e) ** 2;
      b < h && ((h = b), (c = g));
    }
    let f = this.DX[c],
      u = this.DZ[c],
      d = t - this.X[c],
      p = e - this.Z[c],
      m = d * f + p * u;
    return (
      (n.s = Math.max(0, Math.min(this.L, c * vp + m))),
      (n.lat = d * -u + p * f),
      (n.d = Math.sqrt(h)),
      n
    );
  }
  bounds(t, e = 1.4) {
    if (this.LO) return this;
    let s = this.n,
      n = new Float32Array(s),
      o = new Float32Array(s);
    for (let a = 0; a < s; a++) {
      let r = Math.max(0, this.W[a] - e);
      ((n[a] = -r), (o[a] = r));
    }
    if (t)
      for (let a = 0; a < s; a++) {
        let r = this.DX[a],
          l = this.DZ[a];
        for (let c of t.near(this.X[a], this.Z[a], this.W[a] + 3)) {
          if (!c.parked || c.t !== "obb") continue;
          let h = c.x - this.X[a],
            f = c.z - this.Z[a],
            u = h * r + f * l;
          if (Math.abs(u) > 3.2) continue;
          let d = h * -l + f * r,
            p =
              Math.abs(c.hx * (c.c * -l - c.s * r)) +
              Math.abs(c.hz * (c.s * -l + c.c * r)),
            m = p + 1.25;
          d > 0
            ? (o[a] = Math.min(o[a], d - m))
            : (n[a] = Math.max(n[a], d + m));
        }
        if (n[a] > o[a]) {
          let c = (n[a] + o[a]) / 2;
          n[a] = o[a] = c;
        }
      }
    return ((this.LO = n), (this.HI = o), this);
  }
  racingLine(t = 1.6, e = 160) {
    if (this.RL) return this.RL;
    let s = this.n,
      n = new Float32Array(s),
      o = this.X,
      a = this.Z,
      r = this.DX,
      l = this.DZ;
    for (let c = 0; c < e; c++)
      for (let h = 2; h < s - 2; h++) {
        let f = o[h - 2] - l[h - 2] * n[h - 2],
          u = a[h - 2] + r[h - 2] * n[h - 2],
          d = o[h + 2] - l[h + 2] * n[h + 2],
          p = a[h + 2] + r[h + 2] * n[h + 2],
          m = (f + d) / 2 - o[h],
          g = (u + p) / 2 - a[h],
          b = Math.max(0, this.W[h] - t),
          x = this.LO ? this.LO[h] : -b,
          v = this.HI ? this.HI[h] : b;
        n[h] = Math.max(
          x,
          Math.min(v, n[h] * 0.3 + 0.7 * (-m * l[h] + g * r[h])),
        );
      }
    for (let c = 0; c < s; c++)
      (c < 12 || c > s - 6) &&
        (n[c] *= Math.min(1, Math.min(c, s - 1 - c) / 12));
    return (this.RL = n);
  }
  grid(t, e = {}) {
    let s = this.start - 6 - 7 * Math.floor(t / 2),
      n = this.at(s, e),
      o = t % 2 ? 1 : -1,
      a = o * Math.min(1.9, n.w * 0.45);
    return (
      (e.x = n.x - n.dz * a),
      (e.z = n.z + n.dx * a),
      (e.psi = Math.atan2(-n.dx, -n.dz)),
      (e.s = s),
      (e.lat = a),
      e
    );
  }
  route() {
    let t = [];
    for (let e = 0; e < this.n; e += 10) t.push([this.X[e], this.Z[e]]);
    return (t.push([this.X[this.n - 1], this.Z[this.n - 1]]), t);
  }
  _buildCarpet() {
    let t = [],
      e = [],
      s = [],
      n = [-1.1, 0, -1.1, 0, 1.1, 1.1],
      o = [-0.45, 0.25, -1, -0.3, -0.45, -1],
      a = [0, 1, 2, 2, 1, 3, 4, 5, 1, 5, 3, 1],
      r = {};
    this.cs = [];
    for (let h = this.start + 4, f = 0; h < this.finish - 2; h += 7, f++) {
      this.at(h, r);
      let u = -r.dz,
        d = r.dx;
      this.cs.push(h);
      for (let p = 0; p < 6; p++)
        (e.push(
          r.x + u * n[p] + r.dx * o[p],
          r.y + mvt,
          r.z + d * n[p] + r.dz * o[p],
        ),
          s.push(1.25, 0.72, 0.25, 0.55));
      for (let p of a) t.push(f * 6 + p);
    }
    let l = new De();
    (l.setAttribute("position", new ze(e, 3)),
      l.setAttribute("color", new ze(s, 4)),
      l.setAttribute(
        "normal",
        new ze(
          new Float32Array(e.length).map((h, f) => (f % 3 === 1 ? 1 : 0)),
          3,
        ),
      ),
      l.setIndex(t));
    let c = new _e(
      l,
      new ln({
        vertexColors: !0,
        transparent: !0,
        depthWrite: !1,
        side: Ss,
        fog: !1,
      }),
    );
    ((this.carpet = c),
      (c.name = "RaceCarpet"),
      (c.renderOrder = 3),
      (c.frustumCulled = !1),
      (c.userData.mbNoReflect = !0),
      this.group.add(c));
  }
  _buildWalls() {
    if (!this.rails.length) return;
    let t = [],
      e = [],
      s = [];
    for (let a of this.rails) {
      let r = 0;
      for (let l = 0; l < a.length; l++) {
        let c = a[l];
        l && (r += Math.hypot(c.x - a[l - 1].x, c.z - a[l - 1].z) / 1.6);
        let h = t.length / 3;
        (t.push(c.x, c.y - 0.1, c.z, c.x, c.y + pvt, c.z),
          e.push(r, 0, r, 1),
          l && s.push(h - 2, h, h - 1, h - 1, h, h + 1));
      }
    }
    let n = new De();
    (n.setAttribute("position", new ze(t, 3)),
      n.setAttribute("uv", new ze(e, 2)),
      n.setIndex(s),
      n.computeVertexNormals());
    let o = new _e(
      n,
      new ln({
        map: xvt(),
        transparent: !0,
        opacity: 0.62,
        depthWrite: !1,
        side: Ss,
        fog: !1,
      }),
    );
    ((o.name = "RaceWalls"),
      (o.renderOrder = 4),
      (o.frustumCulled = !1),
      (o.userData.mbNoReflect = !0),
      this.group.add(o));
  }
  _buildGates() {
    let t = {};
    this.gates = [];
    let e = [aZ(!1), aZ(!0)].map(
      (s) =>
        new ln({ map: s, transparent: !0, depthWrite: !1, side: Ss, fog: !1 }),
    );
    for (let [s, n] of this.cps.entries()) {
      let o = s === this.cps.length - 1;
      this.at(n, t);
      let a = t.w + 0.6,
        r = -t.dz,
        l = t.dx,
        c = o ? 5 : 4,
        h = new De(),
        f = o ? Math.max(1, Math.round(a / 1.2)) : 1;
      (h.setAttribute(
        "position",
        new ze(
          [
            t.x - r * a,
            t.y,
            t.z - l * a,
            t.x + r * a,
            t.y,
            t.z + l * a,
            t.x - r * a,
            t.y + c,
            t.z - l * a,
            t.x + r * a,
            t.y + c,
            t.z + l * a,
          ],
          3,
        ),
      ),
        h.setAttribute("uv", new ze([0, 0, f, 0, 0, 1, f, 1], 2)),
        h.setIndex([0, 1, 2, 2, 1, 3]),
        h.computeVertexNormals());
      let u = new _e(h, e[o ? 1 : 0].clone());
      ((u.name = o ? "RaceFinish" : "RaceGate"),
        (u.renderOrder = 4),
        (u.frustumCulled = !1),
        (u.userData.mbNoReflect = !0),
        this.group.add(u),
        this.gates.push(u));
    }
  }
  colorCarpet(t, e, s) {
    let n = this.carpet?.geometry.getAttribute("color");
    if (!n) return;
    let o = [
        [1.25, 0.72, 0.25, 0.55],
        [0.25, 1.2, 0.55, 0.6],
        [1.35, 0.7, 0.1, 0.75],
        [1.5, 0.15, 0.12, 0.85],
      ],
      a = !1;
    for (let r = 0; r < this.cs.length; r++) {
      let l = this.cs[r],
        c = l < t || l > e ? 0 : s(l);
      if (this._ck?.[r] !== c) {
        (((this._ck || (this._ck = []))[r] = c), (a = !0));
        for (let h = 0; h < 6; h++) n.setXYZW(r * 6 + h, ...o[c]);
      }
    }
    a && (n.needsUpdate = !0);
  }
  lightGates(t) {
    for (let [e, s] of this.gates.entries())
      ((s.visible = e >= t && e <= t + 1),
        (s.material.opacity = e === t ? 1 : 0.35));
  }
  dispose() {
    (this.group.traverse((t) => {
      t.isMesh &&
        (t.geometry.dispose(), t.material.map?.dispose(), t.material.dispose());
    }),
      this.group.removeFromParent());
  }
};
