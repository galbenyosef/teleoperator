// app 83 — math
// Lines 71861-72174 of readable/app.pretty.js (statement-aligned).
var Od = class {
  constructor(t = {}) {
    ((this.statics = t.statics || null),
      (this.head = new Int32Array(8192)),
      (this.next = new Int32Array(64)),
      (this.bx = new Float32Array(64)),
      (this.bz = new Float32Array(64)),
      (this.stats = { ms: 0, n: 0 }));
  }
  step(t, e, s = [], n = {}) {
    let o = performance.now();
    ((e = Math.min(0.1, Math.max(1e-4, e))),
      (this.frame = (this.frame || 0) + 1));
    let a = t.length;
    if (this.next.length < a) {
      let g = Math.max(a, this.next.length * 2);
      ((this.next = new Int32Array(g)),
        (this.bx = new Float32Array(g)),
        (this.bz = new Float32Array(g)));
    }
    let { head: r, next: l, bx: c, bz: h } = this;
    r.fill(-1);
    let f = n.R ?? 1e9,
      u = n.cx ?? 0,
      d = n.cz ?? 0,
      p = this._act || (this._act = []);
    p.length = 0;
    for (let g = 0; g < a; g++) {
      let b = t[g];
      if (b.ro) {
        ((c[g] = b.bx ?? b.x),
          (h[g] = b.bz ?? b.z),
          (b._nx = c[g]),
          (b._nz = h[g]));
        let M = qR(Math.floor(c[g] / 1), Math.floor(h[g] / 1));
        ((l[g] = r[M]), (r[M] = g));
        continue;
      }
      let x =
        (n.skip && n.skip(b)) || Math.abs(b.x - u) > f || Math.abs(b.z - d) > f;
      if (
        ((x || b.bx === void 0 || !Number.isFinite(b.bx)) &&
          ((b.bx = b.x + (b.sx || 0)), (b.bz = b.z + (b.sz || 0))),
        (c[g] = b.bx),
        (h[g] = b.bz),
        x)
      ) {
        l[g] = -2;
        continue;
      }
      let v = qR(Math.floor(b.bx / 1), Math.floor(b.bz / 1));
      ((l[g] = r[v]), (r[v] = g));
      let y = n.half && n.half(b);
      if (
        ((b._dtp = y ? Math.min(0.15, e * 2) : e),
        (b._rest = !1),
        y && (g + this.frame) & 1)
      ) {
        ((b._rest = !0),
          (b.sx = b.bx - b.x),
          (b.sz = b.bz - b.z),
          (b.lag = Math.hypot(b.sx, b.sz)),
          (b._nx = b.bx),
          (b._nz = b.bz));
        continue;
      }
      p.push(g);
    }
    let m = (g, b, x) => {
      let v = Math.floor(g / 1),
        y = Math.floor(b / 1);
      for (let M = v - 1; M <= v + 1; M++)
        for (let S = y - 1; S <= y + 1; S++)
          for (let w = r[qR(M, S)]; w >= 0; w = l[w]) x(w);
    };
    for (let g of p) {
      let b = t[g],
        x = c[g],
        v = h[g];
      if (n.fixed && n.fixed(b)) {
        ((b._nx = x + (b.x - x) * Math.min(1, e * 3)),
          (b._nz = v + (b.z - v) * Math.min(1, e * 3)),
          (b._vx = 0),
          (b._vz = 0),
          b._sc && (b._sc.length = 0));
        continue;
      }
      let y = b.x,
        M = b.z,
        S = b._sc || (b._sc = []);
      if (this.statics && (b.ghost || 0) <= 0)
        if (
          b._scx === void 0 ||
          Math.abs(x - b._scx) > 0.8 ||
          Math.abs(v - b._scz) > 0.8 ||
          Math.abs((b.y ?? 0) - b._scy) > 0.5 ||
          (b._sct -= e) < 0
        )
          ((S.length = 0),
            (b._scx = x),
            (b._scz = v),
            (b._scy = b.y ?? 0),
            (b._sct = 0.8 + (g % 7) * 0.05),
            this.statics(
              x,
              v,
              b.y ?? 0,
              (A) => {
                S.push(A);
              },
              3,
            ));
        else
          for (let A = S.length - 1; A >= 0; A--)
            (S[A].dead || S[A].broken) && S.splice(A, 1);
      else ((S.length = 0), (b._scx = void 0));
      for (let A of s) {
        if (Math.abs(A.x - x) > 7 || Math.abs(A.z - v) > 7) continue;
        let C = vS(A, x, v, y, M, 0.3 + 0.12);
        C && ((y = C[0]), (M = C[1]));
      }
      if (S.length && Math.hypot(y - x, M - v) > 0.05) {
        let A = Math.hypot(y - x, M - v),
          C = Math.min(A, 1.6) / A,
          P = x + (y - x) * C,
          I = v + (M - v) * C;
        for (let L of S) {
          if (L.t !== "circ" && L.t !== "obb") continue;
          let F =
              L.t === "circ"
                ? { x: L.x, z: L.z, fx: 1, fz: 0, hl: L.r, hw: L.r }
                : { x: L.x, z: L.z, fx: L.s, fz: L.c, hl: L.hz, hw: L.hx },
            N = vS(F, x, v, P, I, 0.3 + 0.06);
          if (N) {
            ((y = N[0]), (M = N[1]));
            break;
          }
        }
      }
      let w = n.gain ? n.gain(b) : 3,
        z = (y - x) * w,
        _ = (M - v) * w,
        R = n.vmax ? n.vmax(b) : 1.8,
        T = Math.hypot(z, _);
      T > R && ((z *= R / T), (_ *= R / T));
      let E = Math.hypot(z, _);
      if (E > 0.3) {
        let A = z / E,
          C = _ / E,
          P = 0,
          I = 0;
        (m(x + A, v + C, (L) => {
          if (L === g) return;
          let F = c[L] - x,
            N = h[L] - v,
            B = Math.hypot(F, N);
          if (B > 2.2 || B < 1e-4) return;
          let H = F * A + N * C,
            O = F * C - N * A;
          if (H < 0.1 || Math.abs(O) > 2 * 0.3 + 0.25) return;
          let D = t[L];
          if (
            (D._vx || 0) * A + (D._vz || 0) * C > E * 0.9 &&
            Math.abs(O) > 2 * 0.3
          )
            return;
          let G = Math.abs(O) > 0.02 ? (O > 0 ? -1 : 1) : g < L ? -1 : 1,
            q = (1 - B / 2.2) * E * 0.9;
          ((P += C * G * q), (I -= A * G * q));
        }),
          (z += P),
          (_ += I));
      }
      ((b._vx = z),
        (b._vz = _),
        (b._nx = x + z * b._dtp),
        (b._nz = v + _ * b._dtp));
    }
    for (let g = 0; g < 4; g++) {
      for (let b of p) ((c[b] = t[b]._nx), (h[b] = t[b]._nz));
      for (let b of p) {
        let x = t[b],
          v = n.fixed && n.fixed(x),
          y = c[b],
          M = h[b];
        (m(y, M, (S) => {
          let w = t[S],
            z = w.ro || w._rest;
          if (z ? S === b : S <= b || l[S] === -2) return;
          let _ = z || (n.fixed && n.fixed(w));
          if (v && !_) return;
          let R = c[S] - y,
            T = h[S] - M,
            E = Math.hypot(R, T),
            A = 2 * 0.3 + 0.05;
          if (E >= A) return;
          let C, P;
          if (E > 1e-5) ((C = R / E), (P = T / E));
          else {
            let N = (b * 2.399 + S) % 6.283;
            ((C = Math.cos(N)), (P = Math.sin(N)));
          }
          let I = A - E,
            L = v === _ ? 0.5 : v ? 0 : 1,
            F = 1 - L;
          ((y -= C * I * L),
            (M -= P * I * L),
            (c[S] += C * I * F),
            (h[S] += P * I * F));
        }),
          (c[b] = y),
          (h[b] = M));
      }
      for (let b of p) {
        let x = t[b];
        if (n.fixed && n.fixed(x)) continue;
        let v = c[b],
          y = h[b];
        if (n.clamp) {
          let M = n.clamp(x, v, y);
          M && ((v = M[0]), (y = M[1]));
        }
        if (n.wall) {
          let M = n.wall(x, v, y);
          M && ((v += M[0]), (y += M[1]));
        }
        for (let M of s) {
          if (Math.abs(M.x - v) > 6 || Math.abs(M.z - y) > 6) continue;
          let S = tb(M, v, y, 0.3);
          S && ((v += S[0]), (y += S[1]));
        }
        if (x._sc?.length) {
          for (let M of x._sc) {
            if (M.t === "poly") continue;
            let S = Ul(M, v, y, 0.3);
            S && ((v += S[0]), (y += S[1]));
          }
          for (let M of x._sc) {
            if (M.t !== "poly") continue;
            let S = Ul(M, v, y, 0.3);
            S && ((v += S[0]), (y += S[1]));
          }
        }
        ((c[b] = v), (h[b] = y), (x._nx = v), (x._nz = y));
      }
    }
    for (let g of p) {
      let b = t[g],
        x = c[g],
        v = h[g],
        y = b.bx,
        M = b.bz,
        S = x - y,
        w = v - M,
        z = Math.hypot(S, w),
        _ = ((n.vmax ? n.vmax(b) : 1.8) + 1.2) * b._dtp + 0.07;
      if (
        (z > _ && ((x = y + (S / z) * _), (v = M + (w / z) * _)),
        b._sc?.length && z > 1e-4)
      ) {
        let T = (C, P) => {
            let I = 0;
            for (let L of b._sc) {
              let F = Ul(L, C, P, 0.3);
              F && (I = Math.max(I, Math.hypot(F[0], F[1])));
            }
            for (let L of s) {
              if (Math.abs(L.x - C) > 6 || Math.abs(L.z - P) > 6) continue;
              let F = tb(L, C, P, 0.3);
              F && (I = Math.max(I, Math.hypot(F[0], F[1])));
            }
            return I;
          },
          E = T(x, v),
          A = E > 0.04 ? T(y, M) : 0;
        if (E > 0.04 && E > A + 0.001) {
          let C = x,
            P = v;
          for (let I of b._sc) {
            let L = Ul(I, C, P, 0.3);
            L && ((C += L[0]), (P += L[1]));
          }
          T(C, P) <= Math.max(A, 0.04) + 0.001 && Math.hypot(C - y, P - M) <= _
            ? ((x = C), (v = P))
            : ((x = y), (v = M));
        }
        Math.max(E, A) > 0.12 &&
        s.some(
          (C) =>
            Math.abs(C.x - x) < 6 &&
            Math.abs(C.z - v) < 6 &&
            tb(C, x, v, 0.3 + 0.05),
        )
          ? ((b.wedge = (b.wedge || 0) + e),
            b.wedge > 0.6 &&
              ((b.ghost = 0.5),
              (b.wedge = 0),
              (this.stats.unwedged = (this.stats.unwedged || 0) + 1)))
          : (b.wedge = 0);
      }
      let R = Math.hypot(x - y, v - M) / b._dtp;
      ((b.vs = (b.vs || 0) + (R - (b.vs || 0)) * Math.min(1, b._dtp * 8)),
        R > 0.05 &&
          ((b.vhx = (x - y) / (R * b._dtp)), (b.vhz = (v - M) / (R * b._dtp))),
        (b.bx = x),
        (b.bz = v),
        (b.sx = x - b.x),
        (b.sz = v - b.z),
        (b.lag = Math.hypot(b.sx, b.sz)),
        b.ghost > 0 && (b.ghost -= e));
    }
    ((this.stats.n = p.length), (this.stats.ms = performance.now() - o));
  }
};
