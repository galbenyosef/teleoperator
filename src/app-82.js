// app 82 — math
// Lines 72095-72408 of readable/app.pretty.js (statement-aligned).
var bp = class {
  constructor(t = {}) {
    ((this.statics = t.statics || null),
      (this.head = new Int32Array(8192)),
      (this.next = new Int32Array(64)),
      (this.bx = new Float32Array(64)),
      (this.bz = new Float32Array(64)),
      (this.stats = { ms: 0, n: 0 }));
  }
  step(t, e, s = [], n = {}) {
    let i = performance.now();
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
        let M = yP(Math.floor(c[g] / 1), Math.floor(h[g] / 1));
        ((l[g] = r[M]), (r[M] = g));
        continue;
      }
      let v =
        (n.skip && n.skip(b)) || Math.abs(b.x - u) > f || Math.abs(b.z - d) > f;
      if (
        ((v || b.bx === void 0 || !Number.isFinite(b.bx)) &&
          ((b.bx = b.x + (b.sx || 0)), (b.bz = b.z + (b.sz || 0))),
        (c[g] = b.bx),
        (h[g] = b.bz),
        v)
      ) {
        l[g] = -2;
        continue;
      }
      let x = yP(Math.floor(b.bx / 1), Math.floor(b.bz / 1));
      ((l[g] = r[x]), (r[x] = g));
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
    let m = (g, b, v) => {
      let x = Math.floor(g / 1),
        y = Math.floor(b / 1);
      for (let M = x - 1; M <= x + 1; M++)
        for (let S = y - 1; S <= y + 1; S++)
          for (let w = r[yP(M, S)]; w >= 0; w = l[w]) v(w);
    };
    for (let g of p) {
      let b = t[g],
        v = c[g],
        x = h[g];
      if (n.fixed && n.fixed(b)) {
        ((b._nx = v + (b.x - v) * Math.min(1, e * 3)),
          (b._nz = x + (b.z - x) * Math.min(1, e * 3)),
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
          Math.abs(v - b._scx) > 0.8 ||
          Math.abs(x - b._scz) > 0.8 ||
          Math.abs((b.y ?? 0) - b._scy) > 0.5 ||
          (b._sct -= e) < 0
        )
          ((S.length = 0),
            (b._scx = v),
            (b._scz = x),
            (b._scy = b.y ?? 0),
            (b._sct = 0.8 + (g % 7) * 0.05),
            this.statics(
              v,
              x,
              b.y ?? 0,
              (R) => {
                S.push(R);
              },
              3,
            ));
        else
          for (let R = S.length - 1; R >= 0; R--)
            (S[R].dead || S[R].broken) && S.splice(R, 1);
      else ((S.length = 0), (b._scx = void 0));
      for (let R of s) {
        if (Math.abs(R.x - v) > 7 || Math.abs(R.z - x) > 7) continue;
        let P = wk(R, v, x, y, M, 0.3 + 0.12);
        P && ((y = P[0]), (M = P[1]));
      }
      if (S.length && Math.hypot(y - v, M - x) > 0.05) {
        let R = Math.hypot(y - v, M - x),
          P = Math.min(R, 1.6) / R,
          C = v + (y - v) * P,
          I = x + (M - x) * P;
        for (let L of S) {
          if (L.t !== "circ" && L.t !== "obb") continue;
          let F =
              L.t === "circ"
                ? { x: L.x, z: L.z, fx: 1, fz: 0, hl: L.r, hw: L.r }
                : { x: L.x, z: L.z, fx: L.s, fz: L.c, hl: L.hz, hw: L.hx },
            O = wk(F, v, x, C, I, 0.3 + 0.06);
          if (O) {
            ((y = O[0]), (M = O[1]));
            break;
          }
        }
      }
      let w = n.gain ? n.gain(b) : 3,
        _ = (y - v) * w,
        z = (M - x) * w,
        A = n.vmax ? n.vmax(b) : 1.8,
        T = Math.hypot(_, z);
      T > A && ((_ *= A / T), (z *= A / T));
      let E = Math.hypot(_, z);
      if (E > 0.3) {
        let R = _ / E,
          P = z / E,
          C = 0,
          I = 0;
        (m(v + R, x + P, (L) => {
          if (L === g) return;
          let F = c[L] - v,
            O = h[L] - x,
            B = Math.hypot(F, O);
          if (B > 2.2 || B < 1e-4) return;
          let H = F * R + O * P,
            N = F * P - O * R;
          if (H < 0.1 || Math.abs(N) > 2 * 0.3 + 0.25) return;
          let D = t[L];
          if (
            (D._vx || 0) * R + (D._vz || 0) * P > E * 0.9 &&
            Math.abs(N) > 2 * 0.3
          )
            return;
          let G = Math.abs(N) > 0.02 ? (N > 0 ? -1 : 1) : g < L ? -1 : 1,
            W = (1 - B / 2.2) * E * 0.9;
          ((C += P * G * W), (I -= R * G * W));
        }),
          (_ += C),
          (z += I));
      }
      ((b._vx = _),
        (b._vz = z),
        (b._nx = v + _ * b._dtp),
        (b._nz = x + z * b._dtp));
    }
    for (let g = 0; g < 4; g++) {
      for (let b of p) ((c[b] = t[b]._nx), (h[b] = t[b]._nz));
      for (let b of p) {
        let v = t[b],
          x = n.fixed && n.fixed(v),
          y = c[b],
          M = h[b];
        (m(y, M, (S) => {
          let w = t[S],
            _ = w.ro || w._rest;
          if (_ ? S === b : S <= b || l[S] === -2) return;
          let z = _ || (n.fixed && n.fixed(w));
          if (x && !z) return;
          let A = c[S] - y,
            T = h[S] - M,
            E = Math.hypot(A, T),
            R = 2 * 0.3 + 0.05;
          if (E >= R) return;
          let P, C;
          if (E > 1e-5) ((P = A / E), (C = T / E));
          else {
            let O = (b * 2.399 + S) % 6.283;
            ((P = Math.cos(O)), (C = Math.sin(O)));
          }
          let I = R - E,
            L = x === z ? 0.5 : x ? 0 : 1,
            F = 1 - L;
          ((y -= P * I * L),
            (M -= C * I * L),
            (c[S] += P * I * F),
            (h[S] += C * I * F));
        }),
          (c[b] = y),
          (h[b] = M));
      }
      for (let b of p) {
        let v = t[b];
        if (n.fixed && n.fixed(v)) continue;
        let x = c[b],
          y = h[b];
        if (n.clamp) {
          let M = n.clamp(v, x, y);
          M && ((x = M[0]), (y = M[1]));
        }
        if (n.wall) {
          let M = n.wall(v, x, y);
          M && ((x += M[0]), (y += M[1]));
        }
        for (let M of s) {
          if (Math.abs(M.x - x) > 6 || Math.abs(M.z - y) > 6) continue;
          let S = Gb(M, x, y, 0.3);
          S && ((x += S[0]), (y += S[1]));
        }
        if (v._sc?.length) {
          for (let M of v._sc) {
            if (M.t === "poly") continue;
            let S = lc(M, x, y, 0.3);
            S && ((x += S[0]), (y += S[1]));
          }
          for (let M of v._sc) {
            if (M.t !== "poly") continue;
            let S = lc(M, x, y, 0.3);
            S && ((x += S[0]), (y += S[1]));
          }
        }
        ((c[b] = x), (h[b] = y), (v._nx = x), (v._nz = y));
      }
    }
    for (let g of p) {
      let b = t[g],
        v = c[g],
        x = h[g],
        y = b.bx,
        M = b.bz,
        S = v - y,
        w = x - M,
        _ = Math.hypot(S, w),
        z = ((n.vmax ? n.vmax(b) : 1.8) + 1.2) * b._dtp + 0.07;
      if (
        (_ > z && ((v = y + (S / _) * z), (x = M + (w / _) * z)),
        b._sc?.length && _ > 1e-4)
      ) {
        let T = (P, C) => {
            let I = 0;
            for (let L of b._sc) {
              let F = lc(L, P, C, 0.3);
              F && (I = Math.max(I, Math.hypot(F[0], F[1])));
            }
            for (let L of s) {
              if (Math.abs(L.x - P) > 6 || Math.abs(L.z - C) > 6) continue;
              let F = Gb(L, P, C, 0.3);
              F && (I = Math.max(I, Math.hypot(F[0], F[1])));
            }
            return I;
          },
          E = T(v, x),
          R = E > 0.04 ? T(y, M) : 0;
        if (E > 0.04 && E > R + 0.001) {
          let P = v,
            C = x;
          for (let I of b._sc) {
            let L = lc(I, P, C, 0.3);
            L && ((P += L[0]), (C += L[1]));
          }
          T(P, C) <= Math.max(R, 0.04) + 0.001 && Math.hypot(P - y, C - M) <= z
            ? ((v = P), (x = C))
            : ((v = y), (x = M));
        }
        Math.max(E, R) > 0.12 &&
        s.some(
          (P) =>
            Math.abs(P.x - v) < 6 &&
            Math.abs(P.z - x) < 6 &&
            Gb(P, v, x, 0.3 + 0.05),
        )
          ? ((b.wedge = (b.wedge || 0) + e),
            b.wedge > 0.6 &&
              ((b.ghost = 0.5),
              (b.wedge = 0),
              (this.stats.unwedged = (this.stats.unwedged || 0) + 1)))
          : (b.wedge = 0);
      }
      let A = Math.hypot(v - y, x - M) / b._dtp;
      ((b.vs = (b.vs || 0) + (A - (b.vs || 0)) * Math.min(1, b._dtp * 8)),
        A > 0.05 &&
          ((b.vhx = (v - y) / (A * b._dtp)), (b.vhz = (x - M) / (A * b._dtp))),
        (b.bx = v),
        (b.bz = x),
        (b.sx = v - b.x),
        (b.sz = x - b.z),
        (b.lag = Math.hypot(b.sx, b.sz)),
        b.ghost > 0 && (b.ghost -= e));
    }
    ((this.stats.n = p.length), (this.stats.ms = performance.now() - i));
  }
};
