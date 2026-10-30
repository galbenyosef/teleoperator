// app 255 — math
// Lines 130591-130800 of readable/app.pretty.js (statement-aligned).
var t3t = 0.0254,
  Qz = {
    sedan: {
      rim: 19,
      width: 0.235,
      n: 5,
      twin: !0,
      w1: 0.026,
      w0: 0.03,
      dish: 0.022,
      finish: 12.5,
    },
    hatch: {
      rim: 18,
      width: 0.215,
      n: 5,
      w1: 0.06,
      w0: 0.05,
      dish: 0.018,
      finish: 12.5,
    },
    suv: {
      rim: 20,
      width: 0.245,
      n: 6,
      w1: 0.052,
      w0: 0.046,
      dish: 0.03,
      finish: 13.5,
    },
    pickup: {
      rim: 20,
      width: 0.265,
      n: 6,
      w1: 0.06,
      w0: 0.055,
      dish: 0.035,
      finish: 12.5,
      hubR: 0.085,
    },
    van: {
      rim: 17,
      width: 0.235,
      n: 7,
      w1: 0.05,
      w0: 0.045,
      dish: 0.025,
      finish: 12.5,
    },
    taxi: {
      rim: 17,
      width: 0.215,
      n: 10,
      w1: 0.03,
      w0: 0.03,
      dish: 0.012,
      finish: 12.5,
    },
    waymo: {
      rim: 20,
      width: 0.245,
      n: 5,
      w1: 0.085,
      w0: 0.06,
      dish: 0.012,
      finish: 13.5,
    },
    police: {
      rim: 18,
      width: 0.255,
      n: 8,
      w1: 0.075,
      w0: 0.06,
      dish: 0.04,
      from: 0.66,
      finish: 14.5,
      steel: !0,
    },
  },
  VI = class {
    constructor() {
      ((this.p = []),
        (this.n = []),
        (this.uv = []),
        (this.z = []),
        (this.t = []));
    }
    tri(t, e, s, n, i, a = null, r = null, l = null) {
      let c = [t, e, s].map((m) => [
          m[0],
          m[1] * Math.cos(m[2]),
          m[1] * Math.sin(m[2]),
        ]),
        h = c[1].map((m, g) => m - c[0][g]),
        f = c[2].map((m, g) => m - c[0][g]),
        u = [
          h[1] * f[2] - h[2] * f[1],
          h[2] * f[0] - h[0] * f[2],
          h[0] * f[1] - h[1] * f[0],
        ],
        d = Math.hypot(...u);
      if (d < 1e-12) return;
      if (((u = u.map((m) => m / d)), r)) {
        let m = [r[0], r[1] * Math.cos(r[2]), r[1] * Math.sin(r[2])],
          g = c[0].map((b, v) => (b + c[1][v] + c[2][v]) / 3);
        u.reduce((b, v, x) => b + v * (g[x] - m[x]), 0) < 0 &&
          (u = u.map((b) => -b));
      }
      let p = (m) => {
        if (!l) return u;
        let [g, b, v] = l[m],
          x = [t, e, s][m][2],
          y = Math.cos(x),
          M = Math.sin(x);
        return [g, b * y - v * M, b * M + v * y];
      };
      for (let m = 0; m < 3; m++)
        (this.p.push(c[m]),
          this.n.push(p(m)),
          this.uv.push(a ? a[m] : [0, 0]),
          this.z.push(n),
          this.t.push(i));
    }
    quad(t, e, s, n, i, a, r) {
      (this.tri(t, e, s, i, a, null, r), this.tri(t, s, n, i, a, null, r));
    }
    lathe(t, e, s, n, i = null, a = null, r = !1) {
      if (r) {
        for (let h = 0; h + 1 < t.length; h++)
          this.lathe([t[h], t[h + 1]], e, s, n, i, a ? [a[h], a[h + 1]] : null);
        return;
      }
      let l = t.length,
        c = t.map((h, f) => {
          let u = t[Math.max(0, f - 1)],
            d = t[Math.min(l - 1, f + 1)],
            p = d[0] - u[0],
            g = d[1] - u[1],
            b = -p,
            v = Math.hypot(g, b) || 1;
          return (
            (g /= v),
            (b /= v),
            (i ? (h[0] - i[0]) * g + (h[1] - i[1]) * b : g) < 0 &&
              ((g = -g), (b = -b)),
            [g, b]
          );
        });
      for (let h = 0; h < e; h++) {
        let f = (h / e) * Math.PI * 2,
          u = ((h + 1) / e) * Math.PI * 2;
        for (let d = 0; d + 1 < l; d++) {
          let p = (x, y, M) => ({
              q: [t[x][0], t[x][1], y],
              n: [c[x][0], c[x][1] * Math.cos(y), c[x][1] * Math.sin(y)],
              uv: [M, a ? a[x] : x / (l - 1)],
            }),
            m = p(d, f, h / e),
            g = p(d + 1, f, h / e),
            b = p(d + 1, u, (h + 1) / e),
            v = p(d, u, (h + 1) / e);
          for (let x of [
            [m, g, b],
            [m, b, v],
          ])
            for (let y of x)
              (this.p.push([
                y.q[0],
                y.q[1] * Math.cos(y.q[2]),
                y.q[1] * Math.sin(y.q[2]),
              ]),
                this.n.push(y.n),
                this.uv.push(y.uv),
                this.z.push(s),
                this.t.push(n));
        }
      }
    }
    geometry(t, e) {
      let s = this.p.length,
        n = new Float32Array(s * 3),
        i = new Float32Array(s * 3),
        a = new Float32Array(s * 2),
        r = new Float32Array(s * 4),
        l = new Uint32Array(n.buffer);
      for (let h = 0; h < s; h++) {
        let [f, u, d] = this.p[h],
          [p, m, g] = this.n[h];
        ((n[h * 3] = e * f),
          (n[h * 3 + 1] = t[0] + u),
          (n[h * 3 + 2] = t[1] + d),
          (l[h * 3] = (l[h * 3] & -8) | this.t[h]),
          (i[h * 3] = e * p),
          (i[h * 3 + 1] = m),
          (i[h * 3 + 2] = g),
          (a[h * 2] = this.uv[h][0]),
          (a[h * 2 + 1] = this.uv[h][1]),
          (r[h * 4] = r[h * 4 + 1] = r[h * 4 + 2] = 1),
          (r[h * 4 + 3] = this.z[h]));
      }
      let c = new Le();
      return (
        c.setAttribute("position", new Te(n, 3)),
        c.setAttribute("normal", new Te(i, 3)),
        c.setAttribute("uv", new Te(a, 2)),
        c.setAttribute("color", new Te(r, 4)),
        c
      );
    }
  };
