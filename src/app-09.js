// app 09 — math
// Lines 38959-39209 of readable/app.pretty.js (statement-aligned).
var Pd,
  Ce,
  Oa = Vi(() => {
    as();
    ((Pd = class {
      constructor(t = Float32Array, e = 4096) {
        ((this.T = t), (this.a = new t(e)), (this.n = 0));
      }
      need(t) {
        if (this.n + t > this.a.length) {
          let e = new this.T(Math.max(this.a.length * 2, this.n + t));
          (e.set(this.a.subarray(0, this.n)), (this.a = e));
        }
      }
      push3(t, e, s) {
        this.need(3);
        let n = this.a;
        ((n[this.n++] = t), (n[this.n++] = e), (n[this.n++] = s));
      }
      push2(t, e) {
        this.need(2);
        let s = this.a;
        ((s[this.n++] = t), (s[this.n++] = e));
      }
      push4(t, e, s, n) {
        this.need(4);
        let o = this.a;
        ((o[this.n++] = t),
          (o[this.n++] = e),
          (o[this.n++] = s),
          (o[this.n++] = n));
      }
      take() {
        return this.a.slice(0, this.n);
      }
    }),
      (Ce = class {
        constructor() {
          ((this.p = new Pd()),
            (this.nm = new Pd()),
            (this.uv = new Pd()),
            (this.c = new Pd()),
            (this.s = new Pd()),
            (this.ix = new Pd(Uint32Array)),
            (this.v = 0),
            (this.sky = null),
            (this.skySplit = null),
            (this.hasSky = !1));
        }
        get empty() {
          return this.v === 0;
        }
        vert(t, e, s, n, o, a, r, l, c) {
          return (
            this.p.push3(t, e, s),
            this.nm.push3(n, o, a),
            this.uv.push2(r, l),
            this.c.push4(c[0], c[1], c[2], c[3]),
            this.s.need(1),
            (this.s.a[this.s.n++] = this.sky ? this.sky(t, e, s, n, o, a) : 0),
            this.sky && (this.hasSky = !0),
            this.v++
          );
        }
        tri(t, e, s) {
          this.ix.push3(t, e, s);
        }
        quad(t, e, s, n, o, a, r, l, c, h = null) {
          if (!h) {
            let m = e[0] - t[0],
              g = e[1] - t[1],
              b = e[2] - t[2],
              x = n[0] - t[0],
              v = n[1] - t[1],
              y = n[2] - t[2],
              M = g * y - b * v,
              S = b * x - m * y,
              w = m * v - g * x,
              z = Math.hypot(M, S, w) || 1;
            h = [M / z, S / z, w / z];
          }
          if (
            this.skySplit &&
            Math.abs(h[1]) < 0.3 &&
            n[1] > t[1] + 0.05 &&
            s[1] > e[1] + 0.05 &&
            Math.abs(t[0] - n[0]) + Math.abs(t[2] - n[2]) < 0.05 &&
            Math.abs(e[0] - s[0]) + Math.abs(e[2] - s[2]) < 0.05
          ) {
            let m = this.skySplit(
              Math.min(t[1], e[1]),
              Math.max(s[1], n[1]),
              (t[0] + e[0]) / 2,
              (t[2] + e[2]) / 2,
              h[0],
              h[2],
            );
            if (m && m.length) {
              let g = (_, R, T) => [
                  _[0] + (R[0] - _[0]) * T,
                  _[1] + (R[1] - _[1]) * T,
                  _[2] + (R[2] - _[2]) * T,
                ],
                b = (_, R, T) => [
                  _[0] + (R[0] - _[0]) * T,
                  _[1] + (R[1] - _[1]) * T,
                ],
                x = this.skySplit;
              this.skySplit = null;
              let v = t,
                y = e,
                M = o,
                S = a,
                w = 0,
                z = 0;
              for (let _ of [...m, 1 / 0]) {
                let R =
                    _ === 1 / 0
                      ? 1
                      : Math.max(w, Math.min(1, (_ - t[1]) / (n[1] - t[1]))),
                  T =
                    _ === 1 / 0
                      ? 1
                      : Math.max(z, Math.min(1, (_ - e[1]) / (s[1] - e[1])));
                if (R - w < 1e-4 && T - z < 1e-4) continue;
                let E = g(t, n, R),
                  A = g(e, s, T),
                  C = b(o, l, R),
                  P = b(a, r, T);
                (this.quad(v, y, A, E, M, S, P, C, c, h),
                  (v = E),
                  (y = A),
                  (M = C),
                  (S = P),
                  (w = R),
                  (z = T));
              }
              this.skySplit = x;
              return;
            }
          }
          let f = this.vert(t[0], t[1], t[2], h[0], h[1], h[2], o[0], o[1], c),
            u = this.vert(e[0], e[1], e[2], h[0], h[1], h[2], a[0], a[1], c),
            d = this.vert(s[0], s[1], s[2], h[0], h[1], h[2], r[0], r[1], c),
            p = this.vert(n[0], n[1], n[2], h[0], h[1], h[2], l[0], l[1], c);
          (this.tri(f, u, d), this.tri(f, d, p));
        }
        wall(t, e, s, n, o, a, r, l, c, h = 0, f = 0) {
          let u = s - t,
            d = n - e,
            p = Math.hypot(u, d) || 1,
            m = [-d / p, 0, u / p];
          this.quad(
            [t, o, e],
            [s, a, n],
            [s, l, n],
            [t, r, e],
            [h, o - f],
            [h + p, a - f],
            [h + p, l - f],
            [h, r - f],
            c,
            m,
          );
        }
        box(
          t,
          e,
          s,
          n,
          o,
          a,
          r,
          { top: l = !0, sides: c = [1, 1, 1, 1], uTop: h = null } = {},
        ) {
          if (
            (c[0] && this.wall(s, e, t, e, o, o, a, a, r),
            c[1] && this.wall(s, n, s, e, o, o, a, a, r),
            c[2] && this.wall(t, n, s, n, o, o, a, a, r),
            c[3] && this.wall(t, e, t, n, o, o, a, a, r),
            l)
          ) {
            let f = h || r;
            this.quad(
              [t, a, n],
              [s, a, n],
              [s, a, e],
              [t, a, e],
              [t, n],
              [s, n],
              [s, e],
              [t, e],
              f,
              [0, 1, 0],
            );
          }
        }
        geometry(t = !1) {
          let e = new De();
          if (
            (e.setAttribute("position", new Te(this.p.take(), 3)),
            e.setAttribute("normal", new Te(this.nm.take(), 3)),
            e.setAttribute("uv", new Te(this.uv.take(), 2)),
            e.setAttribute("color", new Te(this.c.take(), 4)),
            this.hasSky)
          ) {
            let n = this.s.a,
              o = new Float32Array(this.v * 2);
            for (let a = 0; a < this.v; a++) o[a * 2] = n[a];
            e.setAttribute("uv1", new Te(o, 2));
          }
          let s = this.ix.take();
          if (
            (e.setIndex(new Te(this.v < 65536 ? new Uint16Array(s) : s, 1)),
            e.computeBoundingBox(),
            e.computeBoundingSphere(),
            t)
          ) {
            for (let n of [this.p, this.nm, this.uv, this.c, this.s, this.ix])
              ((n.a = new n.T(0)), (n.n = 0));
            ((this.v = 0), (this.done = !0));
          }
          return e;
        }
      }));
  });
function KU(i, t, e, s) {
  return `
fn lH(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let T = bc.r;   // the clock (the material's colour.r, set per frame)
  let s = dot(wp.xz - vec2f(${i.toFixed(2)}, ${t.toFixed(2)}), vec2f(${e.toFixed(5)}, ${s.toFixed(5)}));
  let fa = max(fwidth(uv.x), 1e-4); let fy = max(fwidth(uv.y), 1e-4);
  let lw = 0.08;
  let cov = clamp((0.5 * max(lw, fa) - abs(uv.x)) / fa + 0.5, 0.0, 1.0) * min(1.0, lw / fa);
  // individual LEDs along the cable when close, a continuous line when far
  let led = mix(clamp((0.07 - abs(fract(uv.y / 0.3) - 0.5) * 0.3) / fy + 0.5, 0.0, 1.0), 0.45, smoothstep(0.08, 0.3, fy));
  // the pattern: slow waves running along the span, falling light, a sparkle
  let w1 = 0.5 + 0.5 * sin(s * 0.011 - T * 0.35 + sin(s * 0.0023 + T * 0.05) * 3.0);
  let w2 = 0.5 + 0.5 * sin(wp.y * 0.09 + T * 1.1 + s * 0.004);
  let sp = step(0.985, lH(vec2f(floor(s / 12.0), floor(wp.y / 1.2) + floor(T * 6.0) * 17.0)));
  let b = 0.15 + 0.85 * pow(w1, 3.0) * (0.55 + 0.45 * w2) + sp * 2.0;
  // alpha-tested (blended materials skip the hooks): a stable per-pixel dither of the coverage keeps the thin far lines
  let a = clamp(cov * led * 2.5, 0.0, 1.0) * step(0.05, bc.b);
  let d = lH(floor(wp.xz * 7.0) + vec2f(floor(wp.y * 7.0), 0.0));
  gHE = vec3f(0.95, 0.97, 1.0) * b * 16.0;
  gHK = vec4f(0.5, 0.0, 0.0, 1.0);
  return vec4f(0.0, 0.0, 0.0, select(0.0, 1.0, a > d));
}
`;
}
