// app 14 — math
// Lines 40555-40731 of readable/app.pretty.js (statement-aligned).
var Rt,
  Ja,
  nh,
  Na,
  os,
  Bu,
  xo,
  Za,
  J0,
  oc = Ki(async () => {
    es();
    Ya();
    Ab();
    await Pb();
    ((Rt = (o, t) => [o[0], o[1], o[2], (t + 0.5) / 16]),
      (Ja = (o, t = [1, 1, 1]) => [t[0], t[1], t[2], (KV[o] + 0.5) / 16]),
      (nh = class {
        constructor() {
          this.m = new Map();
        }
        get(t, e) {
          let s = t + "|" + e,
            n = this.m.get(s);
          return (n || this.m.set(s, (n = new Be())), n);
        }
        R(t) {
          return {
            solid: this.get(t, "solid"),
            atlas: this.get(t, "atlas"),
            text: this.get(t, "text"),
            region: t,
          };
        }
        meshes(t, e, s = {}) {
          let n = [];
          for (let [i, a] of this.m) {
            if (a.empty) continue;
            let [r, l] = i.split("|"),
              c = new ye(a.geometry(!0), t[l]);
            c.name = "wf_" + r + "_" + l;
            let h = s[r] || {};
            ((c.castShadow = h.shadow !== !1 && l !== "text"),
              (c.receiveShadow = !0),
              (c.matrixAutoUpdate = !1),
              c.updateMatrix(),
              e.add(c),
              n.push(c));
          }
          return (this.m.clear(), n);
        }
      }),
      (Na = dt));
    os = (o, t, e, s, n, i, a, r, l = s) => (
      n < 0 &&
        Math.abs(r[3] - (Tt.pile + 0.5) / 16) < 1e-4 &&
        Ou(t, e, Math.max(s, l)),
      Ws(
        o,
        t,
        e,
        [
          [s, n],
          [l, i],
        ],
        a,
        r,
      )
    );
    Bu = class {
      constructor(t = 2048, e = 2048) {
        ((this.W = t),
          (this.H = e),
          (this.items = []),
          (this.x = 0),
          (this.y = 0),
          (this.row = 0),
          (this.key = new Map()));
      }
      add(t, e, s, n) {
        if (this.key.has(t)) return this.key.get(t);
        this.x + e > this.W &&
          ((this.x = 0), (this.y += this.row + 4), (this.row = 0));
        let i = { x: this.x, y: this.y, w: e, h: s, draw: n };
        return (
          (this.x += e + 4),
          (this.row = Math.max(this.row, s)),
          this.items.push(i),
          this.key.set(t, i),
          i
        );
      }
      word(
        t,
        {
          font: e = 'bold 120px Georgia, "Times New Roman", serif',
          h: s = 150,
          color: n = "#fff",
          stroke: i = null,
          pad: a = 10,
          spacing: r = 0,
        } = {},
      ) {
        {
          let f = Math.min(1, 96 / s);
          ((e = e.replace(/(\d+)px/, (u, d) => Math.round(d * f) + "px")),
            (s = Math.round(s * f)),
            (r *= f),
            (a *= f));
        }
        let l = `w|${t}|${e}|${n}|${i}|${r}`;
        if (this.key.has(l)) return this.key.get(l);
        let c = Math.ceil(t.length * s * 0.75 + a * 2);
        if (typeof document < "u") {
          let f = document.createElement("canvas").getContext("2d");
          ((f.font = e),
            (c = Math.ceil(f.measureText(t).width + r * t.length + a * 2)));
        }
        let h = this.add(l, Math.min(c, this.W), s, (f, u, d, p, m) => {
          if (
            ((f.font = e), (f.textBaseline = "middle"), (f.fillStyle = n), r)
          ) {
            let g = u + a;
            for (let b of t)
              (i &&
                ((f.strokeStyle = i),
                (f.lineWidth = Math.max(6, m * 0.09)),
                (f.lineJoin = "round"),
                f.strokeText(b, g, d + m / 2)),
                f.fillText(b, g, d + m / 2),
                (g += f.measureText(b).width + r));
          } else
            (i &&
              ((f.strokeStyle = i),
              (f.lineWidth = 6),
              f.strokeText(t, u + a, d + m / 2)),
              f.fillText(t, u + a, d + m / 2));
        });
        return ((h.aspect = h.w / h.h), h);
      }
      uv(t) {
        return [
          t.x / this.W,
          t.y / this.H,
          (t.x + t.w) / this.W,
          (t.y + t.h) / this.H,
        ];
      }
      texture() {
        if (typeof document > "u") return null;
        let t = document.createElement("canvas");
        ((t.width = this.W), (t.height = this.H));
        let e = t.getContext("2d");
        for (let n of this.items)
          (e.save(),
            e.beginPath(),
            e.rect(n.x, n.y, n.w, n.h),
            e.clip(),
            n.draw(e, n.x, n.y, n.w, n.h, this.images || {}),
            e.restore());
        let s = new Sn(t);
        return (
          (s.colorSpace = Je),
          (s.flipY = !1),
          (s.anisotropy = 8),
          (s.generateMipmaps = !0),
          (s.minFilter = ma),
          (this.canvas = t),
          (this.ctx = e),
          (this.tex = s),
          s
        );
      }
    };
    ((xo = (o, t = !1) => [o[0], o[1], o[2], t ? 0.35 : 0.1]),
      (Za = (o = !1, t = [1, 1, 1]) => [t[0], t[1], t[2], o ? 0.85 : 0.6]));
    J0 = (o) => [o[0] + 2, o[1], o[2], o[3]];
  });
