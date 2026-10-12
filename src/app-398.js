// app 398 — math
// Lines 194620-195185 of readable/app.pretty.js (statement-aligned).
var SMt = `
#mini { pointer-events: auto; cursor: pointer; box-shadow: 0 4px 24px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,0,0,.4); }
body.touch #mini { display: block; left: auto; right: max(10px, 2.5vw); top: max(30px, 4vh); bottom: auto; width: 88px; height: 88px; }
@media (max-width: 520px) { body.touch #where { top: 150px; left: 0; right: 0; text-align: center; } }
#bigmap { position: fixed; inset: 0; z-index: 14; display: none; background: ${vn.water}; touch-action: none; cursor: grab; }
body.bigmap #bigmap { display: block; }
#bigmap canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
#bigmap::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 110px; background: linear-gradient(rgba(7,9,11,.7), rgba(7,9,11,0)); pointer-events: none; }
#bigmap .ttl, #bigmap .bar { z-index: 1; }
#bigmap .bar { position: absolute; right: max(14px, 2vw); top: max(14px, 2vh); display: flex; gap: 6px; }
#bigmap button { background: rgba(8,10,12,.75); color: var(--ink, #eee); border: 1px solid rgba(255,255,255,.2); border-radius: 3px; min-width: 38px; height: 38px; font: 800 16px ${kr}; cursor: pointer; }
#bigmap button:hover { border-color: var(--acc, #ff5a1f); }
#bigmap .ttl { position: absolute; left: max(16px, 2.5vw); top: max(14px, 2vh); font: 800 20px ${kr}; font-stretch: 118%; letter-spacing: .16em; text-transform: uppercase; text-shadow: 0 1px 10px rgba(0,0,0,.7); pointer-events: none; }
#bigmap .ttl small { display: block; font: 600 10px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .2em; color: rgba(243,244,241,.6); margin-top: 4px; }
#bigmap .hint { position: absolute; left: 50%; bottom: max(14px, 2vh); transform: translateX(-50%); font: 600 10px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .16em; color: rgba(243,244,241,.6); white-space: nowrap; pointer-events: none; text-transform: uppercase; }
@media (max-width: 520px) { #bigmap .ttl { display: none; } #bigmap .hint { bottom: 64px; } }
`,
  KE = class {
    constructor({
      v: t,
      traffic: e = null,
      mobile: s = !1,
      onOpen: n = null,
      onClose: o = null,
    } = {}) {
      ((this.v = t),
        (this.traffic = e),
        (this.onOpen = n),
        (this.onClose = o),
        (this.open = !1),
        (this.el = document.getElementById("mini")),
        (this.cv = document.getElementById("miniC")),
        (this.g = this.cv.getContext("2d")),
        (this.TS = s ? 0.8 : 1),
        (this.T = 512),
        (this.M = 3),
        (this.tiles = new Map()),
        (this.maxTiles = s ? 12 : 18),
        (this.tick = 0),
        (this.R = 230),
        (this.ms = 0),
        (this.lab = new Map()),
        (this.dpr = Math.min(2, window.devicePixelRatio || 1)));
      let a = document.createElement("style");
      ((a.textContent = SMt), document.head.appendChild(a));
      let r = () => {
        let l = Math.max(64, Math.round(this.el.clientWidth * this.dpr));
        this.cv.width !== l && (this.cv.width = this.cv.height = l);
      };
      (window.ResizeObserver && new ResizeObserver(r).observe(this.el),
        r(),
        Promise.resolve()
          .then(() => (Ld(), pG))
          .then((l) => {
            l.PIERS &&
              (($et = l.PIERS),
              this.tiles.clear(),
              this.big && this.big.dirty());
          })
          .catch(() => {}),
        this.el.addEventListener("click", () => this.toggle(!0)),
        addEventListener(
          "keydown",
          (l) => {
            document.body.classList.contains("play") &&
              (l.code === "Tab" || l.code === "KeyG"
                ? (l.preventDefault(),
                  l.stopImmediatePropagation(),
                  l.repeat || this.toggle())
                : this.open && (l.code === "Escape" || l.code === "KeyP")
                  ? (l.preventDefault(),
                    l.stopImmediatePropagation(),
                    this.toggle(!1))
                  : this.open && (l.code === "Equal" || l.code === "NumpadAdd")
                    ? this.big.zoom(1.4)
                    : this.open &&
                      (l.code === "Minus" || l.code === "NumpadSubtract") &&
                      this.big.zoom(1 / 1.4));
          },
          !0,
        ));
    }
    toggle(t = !this.open) {
      t !== this.open &&
        ((this.open = t),
        document.body.classList.toggle("bigmap", t),
        t
          ? ((this.big ||= new xN(this)).show(), this.onOpen?.())
          : this.onClose?.());
    }
    tile(t, e) {
      let s = t * 100003 + e,
        n = this.tiles.get(s);
      return n ? ((n.used = this.tick), n) : null;
    }
    renderTile(t, e) {
      let { T: s, M: n, TS: o } = this,
        a = Math.ceil((s + 2 * n) * o),
        r = null;
      if (this.tiles.size >= this.maxTiles) {
        let u = null,
          d = 1 / 0;
        for (let [p, m] of this.tiles) m.used < d && ((d = m.used), (u = p));
        ((r = this.tiles.get(u).c), this.tiles.delete(u));
      } else ((r = document.createElement("canvas")), (r.width = r.height = a));
      let l = r.getContext("2d"),
        c = t * s - n,
        h = e * s - n;
      (l.setTransform(o, 0, 0, o, -c * o, -h * o),
        Xet(l, o, [c, h, c + s + 2 * n, h + s + 2 * n]));
      let f = { c: r, x0: c, z0: h, used: this.tick };
      return (this.tiles.set(t * 100003 + e, f), f);
    }
    update(t) {
      let e = performance.now(),
        s = this.v,
        n = this.g,
        o = this.cv.width,
        a = o / 2,
        r = this.dpr;
      this.tick++;
      let l = Math.abs(s.kmh || 0),
        h =
          (s.pos.x < ae[0] - 150 ||
          s.pos.x > Ve.x + 20 ||
          s.pos.z > fe[ws - 1] + 60 ||
          s.pos.z < Ve.z
            ? 420
            : 240) +
          260 * Math.min(1, l / 240);
      this.R += (h - this.R) * Math.min(1, t * 1.5);
      let f = a / this.R,
        u = s.pos.x,
        d = s.pos.z,
        p = s.psi,
        m = Math.cos(p),
        g = Math.sin(p),
        b = a * 1.22,
        x = (C, P) => {
          let I = C - u,
            L = P - d;
          return [a + f * (I * m - L * g), b + f * (I * g + L * m)];
        };
      (n.setTransform(1, 0, 0, 1, 0, 0),
        (n.fillStyle = vn.water),
        n.fillRect(0, 0, o, o),
        n.setTransform(
          f * m,
          f * g,
          -f * g,
          f * m,
          a - f * (u * m - d * g),
          b - f * (u * g + d * m),
        ),
        (n.imageSmoothingEnabled = !0));
      let v = this.T,
        y = this.R * 1.25,
        M = 0,
        S = [];
      for (let C = Math.floor((u - y) / v); C <= Math.floor((u + y) / v); C++)
        for (
          let P = Math.floor((d - y) / v);
          P <= Math.floor((d + y) / v);
          P++
        ) {
          let I = this.tile(C, P);
          if (!I)
            if (M < 1 || this.tick < 3) ((I = this.renderTile(C, P)), M++);
            else {
              S.push(1);
              continue;
            }
          let L = v + 2 * this.M;
          n.drawImage(I.c, I.x0, I.z0, L, L);
        }
      if (!M && !S.length && this.tick % 20 === 0) {
        let C = s.forward ? s.forward() : { x: 0, z: 0 },
          P = u + C.x * (this.R + 300),
          I = d + C.z * (this.R + 300),
          L = Math.floor(P / v),
          F = Math.floor(I / v);
        this.tile(L, F) || this.renderTile(L, F);
      }
      if ((n.setTransform(1, 0, 0, 1, 0, 0), this.traffic?.cars)) {
        n.fillStyle = "rgba(214,222,230,.85)";
        let C = 1.6 * r;
        for (let P of this.traffic.cars) {
          let [I, L] = x(P.x, P.z);
          (I - a) ** 2 + (L - a) ** 2 < a * a &&
            n.fillRect(I - C, L - C, 2 * C, 2 * C);
        }
      }
      let w = [[a - 8 * r, b - 10 * r, a + 8 * r, b + 9 * r]],
        z = a * 0.92,
        _ = (C, P, I, L = 0) => {
          let F = C.width,
            N = C.height,
            B = Math.abs(Math.cos(L)),
            H = Math.abs(Math.sin(L)),
            O = (F * B + N * H) / 2,
            D = (F * H + N * B) / 2;
          if (!L && Math.hypot(P - a, I - a) + Math.max(O, D) * 0.6 > z)
            return !1;
          let U = [P - O, I - D, P + O, I + D];
          return GE(w, U)
            ? !1
            : (w.push(U),
              L
                ? (n.setTransform(
                    Math.cos(L),
                    Math.sin(L),
                    -Math.sin(L),
                    Math.cos(L),
                    P,
                    I,
                  ),
                  n.drawImage(C, -F / 2, -N / 2),
                  n.setTransform(1, 0, 0, 1, 0, 0))
                : n.drawImage(C, P - F / 2, I - N / 2),
              !0);
        };
      for (let C of Vet) {
        if (C.tier > 1 && this.R > 320) continue;
        let [P, I] = x(C.p[0], C.p[1]);
        Math.abs(P - a) < a &&
          Math.abs(I - a) < a &&
          _(e2(C.icon, C.col, 7.5 * r), P, I);
      }
      for (let C of jet) {
        let [P, I] = x(C.p[0], C.p[1]);
        Math.abs(P - a) < a && Math.abs(I - a) < a && _(rv(C.id, 13 * r), P, I);
      }
      this.labels(a, r, x, m, g, _, f);
      let R = a + g * (a - 9 * r),
        T = a - m * (a - 9 * r),
        E = Np("north" + r, () => {
          let C = document.createElement("canvas"),
            P = 7 * r;
          C.width = C.height = Math.ceil(2 * P + 2);
          let I = C.getContext("2d");
          return (
            (I.fillStyle = "rgba(8,10,12,.85)"),
            I.beginPath(),
            I.arc(C.width / 2, C.width / 2, P, 0, 7),
            I.fill(),
            (I.fillStyle = "#fff"),
            (I.font = `800 ${8.5 * r}px ${kr}`),
            (I.textAlign = "center"),
            (I.textBaseline = "middle"),
            I.fillText("N", C.width / 2, C.width / 2 + 0.5 * r),
            C
          );
        });
      (n.drawImage(E, R - E.width / 2, T - E.height / 2),
        s2(n, a, b, 0, 8.5 * r));
      let A = performance.now() - e;
      this.ms = this.ms ? this.ms * 0.95 + A * 0.05 : A;
    }
    labels(t, e, s, n, o, a, r) {
      let l = [],
        c = t * 0.92;
      for (let f of vMt) {
        if (!f.pts.length) continue;
        let u = ar(bN(f.name), (f.bridge ? 10.5 : 10) * e, {
            color: f.bridge ? "#ffc2a8" : f.c ? vn.labelMajor : vn.label,
            weight: f.c ? 700 : 600,
          }),
          d = u.width / 2 + 2 * e,
          p = this.lab.get(f),
          m = [];
        for (let g of f.pts) {
          let [b, x] = s(g[0], g[1]),
            v = Math.hypot(b - t, x - t);
          v + d * 0.75 > c ||
            m.push([
              ((t - x) / t) * 0.5 -
                Math.abs(v / t - 0.45) +
                (g === p ? 0.2 : 0),
              g,
              b,
              x,
            ]);
        }
        m.length &&
          (m.sort((g, b) => b[0] - g[0]), l.push([f, u, m, m[0][0] + f.c * 2]));
      }
      l.sort((f, u) => u[3] - f[3]);
      let h = 0;
      for (let [f, u, d] of l) {
        if (h >= 8) break;
        let p = f.dir[0] * n - f.dir[1] * o,
          m = f.dir[0] * o + f.dir[1] * n,
          g = Math.atan2(m, p);
        g > Math.PI / 2 + 0.01
          ? (g -= Math.PI)
          : g < -Math.PI / 2 + 0.01 && (g += Math.PI);
        let b = u.height / 2 + (f.hw || 12) * r + 3 * e,
          x = -Math.sin(g) * b,
          v = Math.cos(g) * b;
        t: for (let y = 0; y < Math.min(6, d.length); y++)
          for (let M of [0, 1, -1])
            if (a(u, d[y][2] + x * M, d[y][3] + v * M, g)) {
              (this.lab.set(f, d[y][1]), h++);
              break t;
            }
      }
    }
  },
  xN = class {
    constructor(t) {
      ((this.ui = t), (this.dpr = Math.min(2, window.devicePixelRatio || 1)));
      let e = (this.el = document.createElement("div"));
      ((e.id = "bigmap"),
        (e.innerHTML = `<canvas></canvas><div class="ttl">San Francisco<small>Map</small></div>
      <div class="bar"><button data-z="in" title="Zoom in (+)">+</button><button data-z="out" title="Zoom out (-)">\u2212</button><button data-z="me" title="Centre on the car">\u25CE</button><button data-z="x" title="Close (Tab / G / Esc)">\u2715</button></div>
      <div class="hint">${matchMedia("(pointer: coarse)").matches ? "Drag to move \xB7 pinch to zoom" : "Scroll to zoom \xB7 drag to move \xB7 Tab / G / Esc to close"}</div>`),
        document.body.appendChild(e),
        (this.cv = e.querySelector("canvas")),
        (this.g = this.cv.getContext("2d")),
        e.querySelector(".bar").addEventListener("click", (a) => {
          let r = a.target.dataset?.z;
          r === "in"
            ? this.zoom(1.5)
            : r === "out"
              ? this.zoom(1 / 1.5)
              : r === "me"
                ? this.center()
                : r === "x" && t.toggle(!1);
        }),
        e.addEventListener(
          "wheel",
          (a) => {
            a.preventDefault();
            let r = this.cv.getBoundingClientRect();
            this.zoom(
              Math.exp(-a.deltaY * (a.deltaMode ? 0.05 : 0.0016)),
              (a.clientX - r.left) * this.dpr,
              (a.clientY - r.top) * this.dpr,
            );
          },
          { passive: !1 },
        ));
      let s = new Map(),
        n = 0;
      (e.addEventListener("pointerdown", (a) => {
        a.target === this.cv &&
          (this.cv.setPointerCapture(a.pointerId),
          s.set(a.pointerId, [a.clientX, a.clientY]),
          (e.style.cursor = "grabbing"));
      }),
        e.addEventListener("pointermove", (a) => {
          if (!s.has(a.pointerId)) return;
          let [r, l] = s.get(a.pointerId);
          if ((s.set(a.pointerId, [a.clientX, a.clientY]), s.size === 1))
            ((this.cx -= ((a.clientX - r) * this.dpr) / this.s),
              (this.cz -= ((a.clientY - l) * this.dpr) / this.s),
              this.dirty());
          else if (s.size === 2) {
            let [c, h] = [...s.values()],
              f = Math.hypot(c[0] - h[0], c[1] - h[1]);
            (n &&
              this.zoom(
                f / n,
                ((c[0] + h[0]) / 2) * this.dpr,
                ((c[1] + h[1]) / 2) * this.dpr,
              ),
              (n = f));
          }
        }));
      let o = (a) => {
        (s.delete(a.pointerId),
          s.size < 2 && (n = 0),
          s.size || (e.style.cursor = ""));
      };
      (e.addEventListener("pointerup", o),
        e.addEventListener("pointercancel", o),
        addEventListener("resize", () => {
          t.open && (this.fit(), this.dirty());
        }));
    }
    fit() {
      let t = Math.round(innerWidth * this.dpr),
        e = Math.round(innerHeight * this.dpr);
      (this.cv.width !== t || this.cv.height !== e) &&
        ((this.cv.width = t), (this.cv.height = e));
    }
    show() {
      (this.fit(), this.center(Math.min(this.cv.width, this.cv.height) / 2400));
    }
    center(t = this.s) {
      ((this.cx = this.ui.v.pos.x),
        (this.cz = this.ui.v.pos.z),
        (this.s = t),
        this.dirty());
    }
    zoom(t, e = this.cv.width / 2, s = this.cv.height / 2) {
      let n = Math.min(
          4 * this.dpr,
          Math.max(Math.min(this.cv.width, this.cv.height) / 16e3, this.s * t),
        ),
        o = this.cx + (e - this.cv.width / 2) / this.s,
        a = this.cz + (s - this.cv.height / 2) / this.s;
      ((this.s = n),
        (this.cx = o - (e - this.cv.width / 2) / n),
        (this.cz = a - (s - this.cv.height / 2) / n),
        this.dirty());
    }
    dirty() {
      this.raf ||
        (this.raf = requestAnimationFrame(() => {
          ((this.raf = 0), this.ui.open && this.draw());
        }));
    }
    draw() {
      let t = this.g,
        e = this.cv.width,
        s = this.cv.height,
        n = this.s,
        o = this.dpr,
        a = this.cx - e / 2 / n,
        r = this.cz - s / 2 / n;
      (t.setTransform(n, 0, 0, n, -a * n, -r * n),
        Xet(t, n, [a, r, a + e / n, r + s / n]),
        t.setTransform(1, 0, 0, 1, 0, 0));
      let l = (S, w) => [(S - a) * n, (w - r) * n],
        c = (S, w, z = 0) => S > -z && w > -z && S < e + z && w < s + z,
        h = [],
        f = (S, w, z, _ = 0, R = !1) => {
          let T = S.width,
            E = S.height,
            A = Math.abs(Math.sin(_)) > 0.5,
            C = (A ? E : T) / 2,
            P = (A ? T : E) / 2,
            I = [w - C, z - P, w + C, z + P];
          return !R && GE(h, I)
            ? !1
            : (h.push(I),
              _
                ? (t.setTransform(
                    Math.cos(_),
                    Math.sin(_),
                    -Math.sin(_),
                    Math.cos(_),
                    w,
                    z,
                  ),
                  t.drawImage(S, -T / 2, -E / 2),
                  t.setTransform(1, 0, 0, 1, 0, 0))
                : t.drawImage(S, w - T / 2, z - E / 2),
              !0);
        },
        u = this.ui.v,
        [d, p] = l(u.pos.x, u.pos.z);
      h.push([d - 16 * o, p - 16 * o, d + 16 * o, p + 16 * o]);
      let m = Math.max(7, Math.min(11, 7 + (n / o) * 6)) * o;
      for (let S of Vet) {
        if ((S.tier > 0 && n / o < 0.12) || (S.tier > 1 && n / o < 0.35))
          continue;
        let [w, z] = l(S.p[0], S.p[1]);
        if (!c(w, z, 40)) continue;
        let _ = e2(S.icon, S.col, m);
        if (f(_, w, z) && (n / o > 0.07 || S.tier === 0)) {
          let R = ar(S.name, 11.5 * o, { color: "#bfe9f0", weight: 700 }),
            T = w + m + 4 * o + R.width / 2,
            E = [
              T - R.width / 2,
              z - R.height / 2,
              T + R.width / 2,
              z + R.height / 2,
            ];
          GE(h, E) || (h.push(E), t.drawImage(R, E[0], E[1]));
        }
      }
      let g = 15 * o;
      for (let S of Qi) {
        let w = Math.max(300, (260 * o) / n);
        for (let z = 120; z < S.len - 40; z += w) {
          let _ = qet(S, z),
            [R, T] = l(_[0], _[1]);
          c(R, T) && f(rv(S.id, g), R, T);
        }
      }
      let b = n / o;
      if (b > 0.09)
        for (let S of $u) {
          if (b < 0.22 && S.c === 0) continue;
          let w = ar(bN(S.name), (S.c ? 11.5 : 10.5) * o, {
              color: S.c ? vn.labelMajor : vn.label,
              weight: S.c ? 700 : 600,
            }),
            z = S.col ? -Math.PI / 2 : 0,
            _ = (w.width / n) * 1.25,
            R = S.col ? _Mt : kMt,
            T = Math.max(1, Math.ceil(_ / R) + (S.c ? 1 : 2));
          S.pts.forEach((E, A) => {
            if ((A + S.idx) % T) return;
            let [C, P] = l(E[0], E[1]);
            c(C, P) && f(w, C, P, z);
          });
        }
      if (b > 0.3)
        for (let S of Bp) {
          let w = ar(bN(S.name), 10 * o, { color: "#8e959e", weight: 600 });
          for (let z of S.pts) {
            let [_, R] = l(z[0], z[1]);
            c(_, R) && f(w, _, R, S.col ? -Math.PI / 2 : 0);
          }
        }
      if (b > 0.03 && b < 0.9)
        for (let [S, w, z] of yMt) {
          let [_, R] = l(w, z);
          c(_, R, 100) &&
            f(
              ar(S, 10.5 * o, {
                color: vn.hood,
                weight: 700,
                spacing: 0.22,
                haloW: 2.5,
              }),
              _,
              R,
            );
        }
      for (let [S, w, z] of wMt) {
        let [_, R] = l(w, z);
        c(_, R, 200) &&
          f(
            ar(S, 14 * o, {
              color: vn.waterLabel,
              weight: 500,
              italic: !0,
              spacing: 0.12,
              halo: "rgba(8,14,20,.8)",
            }),
            _,
            R,
          );
      }
      s2(t, d, p, -u.psi, 12 * o);
      let x = [20, 50, 100, 200, 500, 1e3, 2e3, 5e3, 1e4],
        v = x.filter((S) => S * n <= 150 * o).pop() || 20,
        y = 18 * o,
        M = s - 26 * o;
      ((t.fillStyle = "rgba(8,10,12,.7)"),
        t.fillRect(y - 6 * o, M - 18 * o, v * n + 12 * o, 26 * o),
        (t.strokeStyle = "#e8e8e4"),
        (t.lineWidth = 2 * o),
        t.beginPath(),
        t.moveTo(y, M - 5 * o),
        t.lineTo(y, M),
        t.lineTo(y + v * n, M),
        t.lineTo(y + v * n, M - 5 * o),
        t.stroke(),
        (t.fillStyle = "#e8e8e4"),
        (t.font = `600 ${10 * o}px ${kr}`),
        (t.textAlign = "left"),
        (t.textBaseline = "bottom"),
        t.fillText(
          v >= 1e3 ? `${v / 1e3} km` : `${v} m`,
          y + 2 * o,
          M - 6 * o,
        ));
    }
  },
  kMt = ae[2] - ae[1],
  _Mt = fe[3] - fe[2];
