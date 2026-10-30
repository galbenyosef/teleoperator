// app 309 — math
// Lines 149272-149809 of readable/app.pretty.js (statement-aligned).
var B_ = class {
  constructor(t, e, s = {}) {
    ((this.def = s), (this.name = s.name || "Street race"));
    let n = [],
      i = {},
      a = [],
      r = (x, y, M, S) => {
        let w = n[n.length - 1];
        (!w || Math.hypot(x - w[0], M - w[2]) > 0.3) && n.push([x, y, M, S]);
      };
    for (let x = 0; x < e.length; x++) {
      let y = e[x],
        M = Math.max(1, Math.ceil(Math.abs(y.sb - y.sa) / 3)),
        S = uO(y.E, y.dir);
      for (let P = 0; P <= M; P++) {
        let C = y.sa + ((y.sb - y.sa) * P) / M;
        (Ot(y.E, C, i),
          r(
            i.x + i.nx * S,
            i.y,
            i.z + i.nz * S,
            S ? Math.max(3.5, i.w / 2 - 1) : i.w,
          ));
      }
      let w = e[x + 1];
      if (!w) break;
      let _ = t.D.juns[y.dir > 0 ? y.E.jb : y.E.ja];
      Ot(w.E, w.sa, i);
      let z = uO(w.E, w.dir),
        A = n.length - 1,
        T = n[n.length - 1],
        E = [
          i.x + i.nx * z,
          i.y,
          i.z + i.nz * z,
          z ? Math.max(3.5, i.w / 2 - 1) : i.w,
        ],
        R = _
          ? [_.x, (T[1] + E[1]) / 2, _.z]
          : [(T[0] + E[0]) / 2, (T[1] + E[1]) / 2, (T[2] + E[2]) / 2];
      for (let P = 1; P < 8; P++) {
        let C = P / 8,
          I = 1 - C;
        r(
          I * I * T[0] + 2 * I * C * R[0] + C * C * E[0],
          I * T[1] + C * E[1],
          I * I * T[2] + 2 * I * C * R[2] + C * C * E[2],
          Math.max(T[3], E[3]),
        );
      }
      a.push({ J: _, st: y, nx: w, pa: A, pb: n.length });
    }
    let l = [0];
    for (let x = 1; x < n.length; x++)
      l.push(
        l[x - 1] + Math.hypot(n[x][0] - n[x - 1][0], n[x][2] - n[x - 1][2]),
      );
    this.L = l[l.length - 1];
    let c = Math.max(2, Math.floor(this.L / Qp) + 1);
    ((this.n = c),
      (this.X = new Float32Array(c)),
      (this.Y = new Float32Array(c)),
      (this.Z = new Float32Array(c)),
      (this.W = new Float32Array(c)),
      (this.DX = new Float32Array(c)),
      (this.DZ = new Float32Array(c)));
    for (let x = 0, y = 0; x < c; x++) {
      let M = x * Qp;
      for (; y < l.length - 2 && l[y + 1] < M;) y++;
      let S = Math.min(
          1,
          Math.max(0, (M - l[y]) / Math.max(1e-6, l[y + 1] - l[y])),
        ),
        w = n[y],
        _ = n[y + 1];
      ((this.X[x] = w[0] + (_[0] - w[0]) * S),
        (this.Y[x] = w[1] + (_[1] - w[1]) * S),
        (this.Z[x] = w[2] + (_[2] - w[2]) * S),
        (this.W[x] = w[3] + (_[3] - w[3]) * S));
    }
    for (let x = 0; x < c; x++) {
      let y = Math.max(0, x - 2),
        M = Math.min(c - 1, x + 2),
        S = this.X[M] - this.X[y],
        w = this.Z[M] - this.Z[y],
        _ = Math.hypot(S, w) || 1;
      ((this.DX[x] = S / _), (this.DZ[x] = w / _));
    }
    ((this.start = F_), (this.finish = this.L - 6), (this.cps = []));
    let h = Math.max(1, Math.round((this.finish - F_) / twt));
    for (let x = 1; x <= h; x++)
      this.cps.push(F_ + ((this.finish - F_) * x) / h);
    ((this.rails = []),
      (this.walls = []),
      (this.colliders = []),
      (this.turns = []),
      (this.juncs = []));
    let { X: f, Z: u, Y: d, W: p, DX: m, DZ: g } = this,
      b = (x, y, M) => {
        for (let S = Math.max(0, M - 50); S <= Math.min(c - 1, M + 50); S++)
          if ((f[S] - x) ** 2 + (u[S] - y) ** 2 < (p[S] + xtt - 0.3) ** 2)
            return !0;
        return !1;
      },
      v = (x, y) => {
        let M = [[]];
        for (let S of x)
          S.ok === !1
            ? M[M.length - 1].length && M.push([])
            : M[M.length - 1].push(S);
        for (let S of M)
          if (!(S.length < 2)) {
            this.rails.push(S);
            for (let w = 0; w + 1 < S.length; w++) {
              let _ = S[w],
                z = S[w + 1],
                A = z.x - _.x,
                T = z.z - _.z,
                E = Math.hypot(A, T);
              if (E < 0.05) continue;
              let R = {
                  t: "obb",
                  x: (_.x + z.x) / 2,
                  z: (_.z + z.z) / 2,
                  hx: E / 2 + 0.25,
                  hz: 0.3,
                  c: A / E,
                  s: -T / E,
                  y0: Math.min(_.y, z.y) - 1,
                  y1: Math.max(_.y, z.y) + 2.5,
                  raceWall: !0,
                },
                P = y(R),
                C =
                  (-T / E) * (P.x - R.x) + (A / E) * (P.z - R.z) >= 0 ? 1 : -1;
              ((R.nx = (-T / E) * C),
                (R.nz = (A / E) * C),
                this.colliders.push(R),
                this.walls.push(R));
            }
          }
      };
    for (let x of a) {
      let y = l[Math.min(x.pa, l.length - 1)],
        M = l[Math.min(x.pb, l.length - 1)],
        S = (y + M) / 2,
        { J: w, st: _, nx: z } = x,
        A = this.at(y - 6),
        T = this.at(M + 6, {}),
        E = A.dx * T.dx + A.dz * T.dz,
        R = [];
      if (w && w.tl) {
        let U = _.dir > 0 ? "b" : "a",
          G = z.dir > 0 ? "a" : "b";
        for (let W of w.tl) {
          let V = W.E;
          if (
            (V === _.E && W.end === U) ||
            (V === z.E && W.end === G) ||
            R.some((tt) => tt.l.E === V && tt.l.end === W.end) ||
            A.dx * W.hx + A.dz * W.hz < -0.5
          )
            continue;
          let $ =
              W.end === "a"
                ? Math.min(V.L, V.ta + 3)
                : Math.max(0, V.L - V.tb - 3),
            J = W.end === "a" ? Math.min(V.L, $ + 18) : Math.max(0, $ - 18);
          Ot(V, J, i);
          let X = this.project(i.x, i.z, S);
          X.d < this.at(X.s).w + 4 || R.push({ l: W, s: $ });
        }
      }
      let P = R.some(({ l: U }) => {
          let G = A.dx * U.hx + A.dz * U.hz;
          return G > 0.8 && G > E - 0.12;
        }),
        C = E < 0.87 || P;
      if ((this.juncs.push({ s: S, id: w?.id, turn: C }), !C)) continue;
      let I = { s: S, id: w?.id, legs: [] };
      this.turns.push(I);
      let L = Math.round(S / Qp),
        F = { x: T.dx - A.dx, z: T.dz - A.dz };
      {
        let U = Math.hypot(F.x, F.z);
        U > 0.2 ? ((F.x /= U), (F.z /= U)) : ((F.x = T.dx), (F.z = T.dz));
      }
      for (let { l: U, s: G } of R) {
        Ot(U.E, G, i);
        let W = i.w + 3.5,
          V = -i.dz,
          $ = i.dx,
          J = V * F.x + $ * F.z >= 0 ? 1 : -1,
          X = [];
        for (
          let tt = 0, Z = Math.max(2, Math.ceil((W * 2) / 1.5));
          tt <= Z;
          tt++
        ) {
          let q = (-W + (2 * W * tt) / Z) * J,
            j = i.x + V * q,
            K = i.z + $ * q;
          X.push({ x: j, z: K, y: i.y, ok: !b(j, K, L) });
        }
        (I.legs.push({ x: i.x, z: i.z, w: i.w, hx: U.hx, hz: U.hz }),
          v(X, () => ({ x: w.x, z: w.z })));
      }
      let O = (I.side = A.dx * T.dz - A.dz * T.dx > 0 ? -1 : 1),
        B = Math.max(0, Math.floor((y - 12) / Qp)),
        H = Math.min(c - 1, Math.ceil((M + 12) / Qp)),
        N = [];
      for (let U = B; U <= H; U++) {
        let G = p[U] + xtt,
          W = f[U] - g[U] * G * O,
          V = u[U] + m[U] * G * O;
        N.push({ x: W, z: V, y: d[U], ok: !b(W, V, U) });
      }
      let D = (U, G, W) => ({
        x: U.x - m[G] * 3 * W - g[G] * 2.5 * O,
        z: U.z - g[G] * 3 * W + m[G] * 2.5 * O,
        y: U.y,
      });
      (N.length >= 2 &&
        N[0].ok &&
        N[N.length - 1].ok &&
        (N.unshift(D(N[0], B, 1)), N.push(D(N[N.length - 1], H, -1))),
        v(N, (U) => this.at(this.project(U.x, U.z, S).s)));
    }
    ((this.group = new le()),
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
    let s = Math.min(this.n - 1.001, t / Qp),
      n = Math.floor(s),
      i = s - n,
      a = n + 1;
    ((e.x = this.X[n] + (this.X[a] - this.X[n]) * i),
      (e.y = this.Y[n] + (this.Y[a] - this.Y[n]) * i),
      (e.z = this.Z[n] + (this.Z[a] - this.Z[n]) * i));
    let r = this.DX[n] + (this.DX[a] - this.DX[n]) * i,
      l = this.DZ[n] + (this.DZ[a] - this.DZ[n]) * i,
      c = Math.hypot(r, l) || 1;
    return (
      (e.dx = r / c),
      (e.dz = l / c),
      (e.w = this.W[n] + (this.W[a] - this.W[n]) * i),
      e
    );
  }
  project(t, e, s = null, n = {}) {
    let i = this.n,
      a = s == null ? null : Math.round(s / Qp),
      r = a == null ? 0 : Math.max(0, a - 40),
      l = a == null ? i - 1 : Math.min(i - 1, a + 60),
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
      (n.s = Math.max(0, Math.min(this.L, c * Qp + m))),
      (n.lat = d * -u + p * f),
      (n.d = Math.sqrt(h)),
      n
    );
  }
  bounds(t, e = 1.4) {
    if (this.LO) return this;
    let s = this.n,
      n = new Float32Array(s),
      i = new Float32Array(s);
    for (let a = 0; a < s; a++) {
      let r = Math.max(0, this.W[a] - e);
      ((n[a] = -r), (i[a] = r));
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
            ? (i[a] = Math.min(i[a], d - m))
            : (n[a] = Math.max(n[a], d + m));
        }
        if (n[a] > i[a]) {
          let c = (n[a] + i[a]) / 2;
          n[a] = i[a] = c;
        }
      }
    return ((this.LO = n), (this.HI = i), this);
  }
  racingLine(t = 1.6, e = 160) {
    if (this.RL) return this.RL;
    let s = this.n,
      n = new Float32Array(s),
      i = this.X,
      a = this.Z,
      r = this.DX,
      l = this.DZ;
    for (let c = 0; c < e; c++)
      for (let h = 2; h < s - 2; h++) {
        let f = i[h - 2] - l[h - 2] * n[h - 2],
          u = a[h - 2] + r[h - 2] * n[h - 2],
          d = i[h + 2] - l[h + 2] * n[h + 2],
          p = a[h + 2] + r[h + 2] * n[h + 2],
          m = (f + d) / 2 - i[h],
          g = (u + p) / 2 - a[h],
          b = Math.max(0, this.W[h] - t),
          v = this.LO ? this.LO[h] : -b,
          x = this.HI ? this.HI[h] : b;
        n[h] = Math.max(
          v,
          Math.min(x, n[h] * 0.3 + 0.7 * (-m * l[h] + g * r[h])),
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
      i = t % 2 ? 1 : -1,
      a = i * Math.min(1.9, n.w * 0.45);
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
      i = [-0.45, 0.25, -1, -0.3, -0.45, -1],
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
          r.x + u * n[p] + r.dx * i[p],
          r.y + swt,
          r.z + d * n[p] + r.dz * i[p],
        ),
          s.push(1.25, 0.72, 0.25, 0.55));
      for (let p of a) t.push(f * 6 + p);
    }
    let l = new Le();
    (l.setAttribute("position", new Re(e, 3)),
      l.setAttribute("color", new Re(s, 4)),
      l.setAttribute(
        "normal",
        new Re(
          new Float32Array(e.length).map((h, f) => (f % 3 === 1 ? 1 : 0)),
          3,
        ),
      ),
      l.setIndex(t));
    let c = new ye(
      l,
      new Ys({
        vertexColors: !0,
        transparent: !0,
        depthWrite: !1,
        side: ls,
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
        (t.push(c.x, c.y - 0.1, c.z, c.x, c.y + ewt, c.z),
          e.push(r, 0, r, 1),
          l && s.push(h - 2, h, h - 1, h - 1, h, h + 1));
      }
    }
    let n = new Le();
    (n.setAttribute("position", new Re(t, 3)),
      n.setAttribute("uv", new Re(e, 2)),
      n.setIndex(s),
      n.computeVertexNormals());
    let i = new ye(
      n,
      new Ys({
        map: owt(),
        transparent: !0,
        opacity: 0.62,
        depthWrite: !1,
        side: ls,
        fog: !1,
      }),
    );
    ((i.name = "RaceWalls"),
      (i.renderOrder = 4),
      (i.frustumCulled = !1),
      (i.userData.mbNoReflect = !0),
      this.group.add(i));
  }
  _buildGates() {
    let t = {};
    this.gates = [];
    let e = [vtt(!1), vtt(!0)].map(
      (s) =>
        new Ys({ map: s, transparent: !0, depthWrite: !1, side: ls, fog: !1 }),
    );
    for (let [s, n] of this.cps.entries()) {
      let i = s === this.cps.length - 1;
      this.at(n, t);
      let a = t.w + 0.6,
        r = -t.dz,
        l = t.dx,
        c = i ? 5 : 4,
        h = new Le(),
        f = i ? Math.max(1, Math.round(a / 1.2)) : 1;
      (h.setAttribute(
        "position",
        new Re(
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
        h.setAttribute("uv", new Re([0, 0, f, 0, 0, 1, f, 1], 2)),
        h.setIndex([0, 1, 2, 2, 1, 3]),
        h.computeVertexNormals());
      let u = new ye(h, e[i ? 1 : 0].clone());
      ((u.name = i ? "RaceFinish" : "RaceGate"),
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
    let i = [
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
        for (let h = 0; h < 6; h++) n.setXYZW(r * 6 + h, ...i[c]);
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
