// app 303 — math
// Lines 147699-147889 of readable/app.pretty.js (statement-aligned).
var F5t = 8.5,
  RM = 10.5,
  lO = 0,
  rl = 6,
  ltt = 36,
  Nf = 720,
  O5t = Math.PI,
  AM = 18,
  T_ = 72,
  B5t = (o) => o * o * (3 - 2 * o),
  R_ = class {
    constructor({ x: t, z: e, y: s, psi: n }) {
      ((this.x = t),
        (this.z = e),
        (this.y = s),
        (this.psi = n),
        (this.W = rl),
        (this.U = lO),
        (this.RY = RM),
        (this.d = { x: -Math.sin(n), z: -Math.cos(n) }),
        (this.r = { x: Math.cos(n), z: -Math.sin(n) }));
      let i = (this.T = new Float64Array((Nf + T_ + 1) * 4)),
        a = 0;
      for (let r = 0; r <= Nf + T_; r++) {
        let l = (Math.min(r, Nf) / Nf) * O5t,
          c = F5t * Math.sin(l) - (r > Nf ? (AM * (r - Nf)) / T_ : 0),
          h = RM * (1 - Math.cos(l)),
          f = lO * B5t(Math.min(r, Nf) / Nf);
        if (r) {
          let u = (r - 1) * 4;
          a += Math.hypot(c - i[u], h - i[u + 1], f - i[u + 2]);
        }
        i.set([c, h, f, a], r * 4);
      }
      ((this.Lc = i[Nf * 4 + 3]), (this.L = a));
    }
    at(t, e = [0, 0, 0]) {
      if (t <= 0) return ((e[0] = t), (e[1] = 0), (e[2] = 0), e);
      t >= this.L && (t = this.L);
      let s = this.T,
        n = 0,
        i = Nf + T_;
      for (; i - n > 1;) {
        let c = (n + i) >> 1;
        s[c * 4 + 3] < t ? (n = c) : (i = c);
      }
      let a = n * 4,
        r = i * 4,
        l = (t - s[a + 3]) / (s[r + 3] - s[a + 3] || 1);
      return (
        (e[0] = s[a] + (s[r] - s[a]) * l),
        (e[1] = s[a + 1] + (s[r + 1] - s[a + 1]) * l),
        (e[2] = s[a + 2] + (s[r + 2] - s[a + 2]) * l),
        e
      );
    }
    world(t, e, s, n = { x: 0, y: 0, z: 0 }) {
      return (
        (n.x = this.x + this.d.x * t + this.r.x * s),
        (n.z = this.z + this.d.z * t + this.r.z * s),
        (n.y = this.y + e),
        n
      );
    }
    local(t, e) {
      let s = t - this.x,
        n = e - this.z;
      return [s * this.d.x + n * this.d.z, s * this.r.x + n * this.r.z];
    }
    onApron(t, e) {
      let [s, n] = this.local(t, e);
      return s > -ltt && s < 0.5 && Math.abs(n) < rl / 2 + 0.5;
    }
    build() {
      let t = new le();
      t.name = "RevealLoop";
      let e = new me({
          name: "LoopConcrete",
          color: new It(0.36, 0.36, 0.355),
          roughness: 0.85,
          metalness: 0,
          side: ls,
        }),
        s = new Ys({
          name: "LoopLED",
          color: new It(1.5, 0.02, 0.03),
          toneMapped: !0,
          side: ls,
        });
      s.userData.mbNoReflect = !0;
      let n = new me({
          name: "LoopLine",
          color: new It(0.86, 0.86, 0.84),
          roughness: 0.6,
          metalness: 0,
        }),
        i = new me({
          name: "LoopSteel",
          color: new It(0.08, 0.085, 0.09),
          roughness: 0.45,
          metalness: 0.85,
        }),
        a = [],
        r = [];
      for (let g = -ltt; g <= this.L + 1e-6; g += g < -1 ? 2 : this.L / 600)
        r.push(g);
      let l = [0, 0, 0],
        c = [0, 0, 0];
      for (let g of r) {
        (this.at(g, l), this.at(g + 0.05, c));
        let b = c[0] - l[0],
          v = c[1] - l[1],
          x = Math.hypot(b, v) || 1;
        a.push([l[0], l[1], l[2], -v / x, b / x]);
      }
      let h = (g, b, v, x, y, M) => {
        let S = [],
          w = [],
          _ = (T, E, R) => {
            let P = this.world(T, E, R);
            S.push(P.x - this.x, P.y - this.y, P.z - this.z);
          };
        for (let [T, E, R, P, C] of a)
          for (let [I, L] of [
            [g, v],
            [b, v],
            [g, v - x],
            [b, v - x],
          ])
            _(T + P * L, E + C * L, R + I);
        for (let T = 0; T + 1 < a.length; T++) {
          let E = T * 4,
            R = E + 4;
          for (let [P, C] of [
            [0, 1],
            [3, 2],
            [2, 0],
            [1, 3],
          ])
            w.push(E + P, R + P, E + C, E + C, R + P, R + C);
        }
        let z = new Le();
        (z.setAttribute("position", new Re(S, 3)),
          z.setIndex(w),
          z.computeVertexNormals());
        let A = new ye(z, y);
        return (
          (A.name = M),
          (A.castShadow = y !== s),
          (A.receiveShadow = y !== s),
          t.add(A),
          A
        );
      };
      (h(-rl / 2, rl / 2, 0.02, 0.5, e, "LoopTrack"),
        h(-rl / 2 - 0.02, -rl / 2 + 0.06, 0.16, 0.16, s, "LoopLEDLeft"),
        h(rl / 2 - 0.06, rl / 2 + 0.02, 0.16, 0.16, s, "LoopLEDRight"),
        h(-0.09, 0.09, 0.035, 0.02, n, "LoopLine"));
      let f = 2 * RM + 1.6,
        u = -rl / 2 - 2,
        d = lO + rl / 2 + 2,
        p = (g, b, v, x, y, M, S = i) => {
          let w = new ye(new Is(g, b, v), S),
            _ = this.world(x, y, M);
          return (
            w.position.set(_.x - this.x, _.y - this.y, _.z - this.z),
            (w.rotation.y = this.psi),
            (w.castShadow = w.receiveShadow = !0),
            t.add(w),
            w
          );
        };
      for (let g of [u, d])
        for (let b of [-1.6, 1.6]) p(0.5, f, 0.5, b, f / 2, g);
      for (let g of [-1.6, 1.6]) p(0.4, 0.6, d - u + 0.5, g, f, (u + d) / 2);
      let m = [];
      for (let g = -7.6; g > -AM; g -= 6) m.push(g);
      m.push(-AM + 0.3);
      for (let g of m) {
        for (let b of [u, d]) p(0.5, f, 0.5, g, f / 2, b);
        p(d - u + 0.5, 0.6, 0.4, g, f, (u + d) / 2);
        for (let b of [-rl * 0.3, rl * 0.3])
          p(0.18, 1.3, 0.18, g, 2 * RM + 0.8, b);
      }
      for (let g of [u, d]) p(0.4, 0.4, AM + 1.3, (1.9 - AM) / 2, f, g);
      for (let g of [-rl * 0.3, rl * 0.3])
        p(0.18, 1.3, 0.18, 0, 2 * RM + 0.8, g);
      return (t.position.set(this.x, this.y, this.z), (this.group = t), t);
    }
  };
es();
