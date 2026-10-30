// app 311 — math
// Lines 150074-150437 of readable/app.pretty.js (statement-aligned).
var dwt = 9.81,
  pwt = 90,
  mwt = [
    { id: "front", end: -1, deep: 0.36, hang: 0.24, off: 0.5 },
    { id: "rear", end: 1, deep: 0.32, hang: 0.24, off: 0.5 },
  ],
  iOt = new fe(),
  ktt = new fe(),
  ra = new dt(),
  ztt = new tn(),
  gwt = new vi(),
  U_ = class {
    constructor(t, { scene: e = null, ground: s = null } = {}) {
      ((this.D = t),
        (this.scene = e),
        (this.ground = s),
        (this.st = null),
        (this.loose = []));
    }
    attach() {
      this.reset(0, !0);
      let t = this.D,
        e = t.car;
      if (((this.st = null), !e?.root || !t.parts.length)) return;
      (e.root.updateMatrixWorld(!0), ktt.copy(e.root.matrixWorld).invert());
      let s = [1 / 0, 1 / 0, 1 / 0],
        n = [-1 / 0, -1 / 0, -1 / 0];
      for (let i of t.parts) {
        i.rel = new fe().multiplyMatrices(ktt, i.o.matrixWorld);
        let a =
          i.g0.boundingBox || (i.g0.computeBoundingBox(), i.g0.boundingBox);
        if (a)
          for (let r of [a.min.x, a.max.x])
            for (let l of [a.min.y, a.max.y])
              for (let c of [a.min.z, a.max.z])
                (ra.set(r, l, c).applyMatrix4(i.rel),
                  (s[0] = Math.min(s[0], ra.x)),
                  (s[1] = Math.min(s[1], ra.y)),
                  (s[2] = Math.min(s[2], ra.z)),
                  (n[0] = Math.max(n[0], ra.x)),
                  (n[1] = Math.max(n[1], ra.y)),
                  (n[2] = Math.max(n[2], ra.z)));
      }
      ((this.box = { lo: s, hi: n }),
        (this.st = mwt.map((i) => ({
          P: i,
          dmg: 0,
          side: 0,
          state: 0,
          piece: null,
          beam: null,
          ang: 0,
          angV: 0,
          at: -1,
        }))));
    }
    hit(t, e) {
      if (!this.st || this.off) return;
      let { lo: s, hi: n } = this.box;
      for (let i of this.st) {
        let a = i.P.end < 0 ? s[2] : n[2];
        Math.abs(t.z - a) > 1.1 ||
          ((i.dmg += e), (i.side += Math.sign(t.x || 0.001) * e));
      }
    }
    settle(t, e, s = !1) {
      if (this.st)
        for (let n of this.st) {
          if (n.state < 1 && n.dmg >= n.P.hang) {
            if (!this.cut(n)) {
              n.state = 3;
              continue;
            }
            ((n.state = 1), (n.angV = 2.5));
          }
          n.state === 1 &&
            n.dmg >= n.P.off &&
            ((n.state = 2), (n.at = e), this.tearOff(n, t, s));
        }
    }
    cut(t) {
      let e = this.D,
        { lo: s, hi: n } = this.box,
        i = t.P,
        a = i.end < 0 ? s[2] : n[2],
        r = s[1] + 0.45 * (n[1] - s[1]),
        l = (P) => (i.end < 0 ? P < a + i.deep : P > a - i.deep),
        c = [],
        h = [],
        f = new Map();
      for (let P of e.parts) {
        let C = P.p0.length < 900;
        if (C) {
          if (!P.cen) {
            P.cen = [0, 0, 0];
            for (let J = 0; J < P.p0.length; J += 3)
              ((P.cen[0] += P.p0[J]),
                (P.cen[1] += P.p0[J + 1]),
                (P.cen[2] += P.p0[J + 2]));
            P.cen = P.cen.map((J) => J / (P.p0.length / 3));
          }
          if ((ra.set(...P.cen).applyMatrix4(P.rel), !l(ra.z) || ra.y > r))
            continue;
        }
        let I = P.g || P.g0,
          L = I.index?.array,
          F = L ? L.length : P.p0.length / 3,
          O = P.rel,
          B = (J) => (
            ra
              .set(P.p0[J * 3], P.p0[J * 3 + 1], P.p0[J * 3 + 2])
              .applyMatrix4(O),
            l(ra.z) && ra.y <= r
          ),
          H = [];
        for (let J = 0; J < F; J += 3) {
          let X = L ? L[J] : J,
            tt = L ? L[J + 1] : J + 1,
            Z = L ? L[J + 2] : J + 2;
          (X === tt && tt === Z) ||
            ((C || (B(X) && B(tt) && B(Z))) && H.push(J));
        }
        if (!H.length || !e.own(P)) continue;
        let N = P.g;
        if (!P.ownIdx) {
          P.ownIdx = !0;
          let J = N.index?.array,
            X = P.p0.length / 3,
            tt = new Uint32Array(J ? J.length : X);
          if (J) tt.set(J);
          else for (let Z = 0; Z < X; Z++) tt[Z] = Z;
          ((P.idx0 = J || null), (P.iota = !J), N.setIndex(new Te(tt, 1)));
        }
        let D = N.index.array,
          U = new yn().getNormalMatrix(O),
          G = Array.isArray(P.o.material) ? P.o.material : null,
          W = Object.entries(N.attributes).filter(
            ([J]) => J !== "position" && J !== "normal",
          ),
          V = N.attributes.position.array,
          $ = N.attributes.normal.array;
        for (let J of H) {
          let X = D[J],
            tt = G
              ? G[
                  (
                    N.groups.find(
                      (q) => J >= q.start && J < q.start + q.count,
                    ) || N.groups[0]
                  )?.materialIndex ?? 0
                ]
              : P.o.material,
            Z = f.get(tt);
          Z ||
            f.set(
              tt,
              (Z = {
                pos: [],
                nrm: [],
                at: Object.fromEntries(
                  W.map(([q, j]) => [q, { n: j.itemSize, v: [] }]),
                ),
              }),
            );
          for (let q of [D[J], D[J + 1], D[J + 2]]) {
            (ra.set(V[q * 3], V[q * 3 + 1], V[q * 3 + 2]).applyMatrix4(O),
              Z.pos.push(ra.x, ra.y, ra.z),
              ra
                .set($[q * 3], $[q * 3 + 1], $[q * 3 + 2])
                .applyMatrix3(U)
                .normalize(),
              Z.nrm.push(ra.x, ra.y, ra.z));
            for (let [j, K] of W) {
              let nt = Z.at[j];
              nt &&
                (nt.v.push(K.getX(q)),
                K.itemSize > 1 && nt.v.push(K.getY(q)),
                K.itemSize > 2 && nt.v.push(K.getZ(q)),
                K.itemSize > 3 && nt.v.push(K.getW(q)));
            }
          }
          D[J + 1] = D[J + 2] = X;
        }
        ((N.index.needsUpdate = !0), (P.dirty = !0), (P.cut = !0));
      }
      if (!f.size) return !1;
      let u = new le();
      u.name = "Panel_" + i.id;
      let d = t.side >= 0 ? 1 : -1,
        p = new dt(-d * n[0] * 0.9, r, a);
      u.position.copy(p);
      for (let [P, C] of f) {
        let I = new Le(),
          L = new Float32Array(C.pos);
        for (let O = 0; O < L.length; O += 3)
          ((L[O] -= p.x), (L[O + 1] -= p.y), (L[O + 2] -= p.z));
        (I.setAttribute("position", new Te(L, 3)),
          I.setAttribute("normal", new Te(new Float32Array(C.nrm), 3)));
        for (let [O, B] of Object.entries(C.at))
          I.setAttribute(O, new Te(new Float32Array(B.v), B.n));
        (I.computeBoundingBox(), I.computeBoundingSphere());
        let F = new ye(I, P);
        ((F.castShadow = !0), u.add(F));
      }
      ((u.userData.side = d), e.car.root.add(u), (t.piece = u));
      let m = 1 / 0,
        g = -1 / 0,
        b = 1 / 0,
        v = -1 / 0,
        x = 1 / 0,
        y = -1 / 0;
      for (let P of f.values())
        for (let C = 0; C < P.pos.length; C += 3)
          ((m = Math.min(m, P.pos[C])),
            (g = Math.max(g, P.pos[C])),
            (b = Math.min(b, P.pos[C + 1])),
            (v = Math.max(v, P.pos[C + 1])),
            (x = Math.min(x, P.pos[C + 2])),
            (y = Math.max(y, P.pos[C + 2])));
      let M = new le();
      M.name = "CrashBeam_" + i.id;
      let S = new me({ color: 1316118, roughness: 0.8, metalness: 0.1 }),
        w = new me({ color: 2763823, roughness: 0.45, metalness: 0.7 }),
        _ = g - m,
        z = v - b,
        A = y - x,
        T = i.end < 0 ? y : x,
        E = new ye(new Is(_ * 0.86, z * 0.78, A * 0.9 + 0.2), S);
      (E.position.set((m + g) / 2, b + z * 0.5, T - i.end * (A * 0.45 - 0.1)),
        M.add(E));
      let R = new ye(new Is(_ * 0.92, Math.min(0.14, z * 0.3), 0.12), w);
      (R.position.set((m + g) / 2, b + z * 0.42, T + i.end * (A * 0.55)),
        M.add(R));
      for (let P of M.children) P.castShadow = !0;
      return (e.car.root.add(M), (t.beam = M), !0);
    }
    tearOff(t, e, s) {
      let n = t.piece;
      if (!n) return;
      if (
        s &&
        this.loose.some((u) => u.id === t.P.id && u.at < (e?.dents ?? 0))
      ) {
        (n.removeFromParent(), (t.piece = null));
        return;
      }
      n.updateMatrixWorld(!0);
      let i = n.matrixWorld.clone();
      (n.removeFromParent(),
        i.decompose(n.position, n.quaternion, n.scale),
        (this.scene || this.D.car.root.parent)?.add(n));
      let a = e?.impactN || { x: 0, z: 0 },
        r = (e?.vel?.x || 0) * 0.3 + a.x * 1.2,
        l = (e?.vel?.z || 0) * 0.3 + a.z * 1.2,
        c = Math.hypot(r, l),
        h = c > 4 ? 4 / c : 1,
        f = {
          id: t.P.id,
          at: t.at,
          o: n,
          t: 0,
          rest: !1,
          vel: new dt(r * h, 1.4, l * h),
          w: new dt(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 6,
          ),
        };
      (this.loose.push(f), (t.piece = null));
    }
    update(t, e) {
      if (this.st)
        for (let s of this.st) {
          let n = s.piece;
          if (!n || s.state !== 1) continue;
          let i = 0.24 * Math.min(1.6, s.dmg / s.P.hang),
            a = (e?.ax || 0) * 0.01 * s.P.end + (e?.ay || 0) * 0.006;
          ((s.angV += ((i - s.ang) * 60 - s.angV * 5 + a * 60) * t),
            (s.ang += s.angV * t),
            n.rotation.set(
              0.12 * Math.min(1, s.ang / 0.24) * -s.P.end,
              0,
              s.ang * n.userData.side,
              "XYZ",
            ),
            (n.position.y =
              this.box.lo[1] +
              0.45 * (this.box.hi[1] - this.box.lo[1]) -
              0.04 * Math.min(1, s.ang / 0.24)));
        }
      for (let s = this.loose.length - 1; s >= 0; s--) {
        let n = this.loose[s],
          i = n.o;
        if (((n.t += t), n.t > pwt)) {
          (i.removeFromParent(), this.dispose(i), this.loose.splice(s, 1));
          continue;
        }
        if (n.rest) continue;
        ((n.vel.y -= dwt * t),
          i.position.addScaledVector(n.vel, t),
          ztt.setFromEuler(gwt.set(n.w.x * t, n.w.y * t, n.w.z * t)),
          i.quaternion.premultiply(ztt),
          i.updateMatrixWorld(!0));
        let a = 1 / 0;
        for (let l of i.children) {
          let c = l.geometry.boundingBox;
          for (let h of [c.min.x, c.max.x])
            for (let f of [c.min.y, c.max.y])
              for (let u of [c.min.z, c.max.z])
                (ra.set(h, f, u).applyMatrix4(l.matrixWorld),
                  (a = Math.min(a, ra.y)));
        }
        let r = this.ground
          ? this.ground(i.position.x, i.position.z, i.position.y + 1)
          : 0;
        Number.isFinite(r) &&
          a < r &&
          ((i.position.y += r - a),
          n.vel.y < 0 && (n.vel.y *= -0.25),
          (n.vel.x *= Math.max(0, 1 - 4 * t)),
          (n.vel.z *= Math.max(0, 1 - 4 * t)),
          n.w.multiplyScalar(Math.max(0, 1 - 5 * t)),
          Math.hypot(n.vel.x, n.vel.z) < 0.15 &&
            Math.abs(n.vel.y) < 0.6 &&
            (n.rest = !0));
      }
    }
    reset(t, e = !1) {
      let s = this.D;
      for (let n of s.parts)
        if (n.cut && n.g) {
          let i = n.g.index.array;
          if (n.iota) for (let a = 0; a < i.length; a++) i[a] = a;
          else i.set(n.idx0);
          ((n.g.index.needsUpdate = !0), (n.dirty = !0), (n.cut = !1));
        }
      if (this.st)
        for (let n of this.st)
          (n.piece && (n.piece.removeFromParent(), this.dispose(n.piece)),
            n.beam && (n.beam.removeFromParent(), this.dispose(n.beam)),
            Object.assign(n, {
              dmg: 0,
              side: 0,
              state: 0,
              piece: null,
              beam: null,
              ang: 0,
              angV: 0,
              at: -1,
            }));
      for (let n = this.loose.length - 1; n >= 0; n--) {
        let i = this.loose[n];
        (e || t === 0 || i.at >= t) &&
          (i.o.removeFromParent(), this.dispose(i.o), this.loose.splice(n, 1));
      }
    }
    dispose(t) {
      let e = t.name.startsWith("CrashBeam");
      t.traverse((s) => {
        s.isMesh && (s.geometry.dispose(), e && s.material.dispose());
      });
    }
  };
