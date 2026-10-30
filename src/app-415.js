// app 415 — math
// Lines 202461-203026 of readable/app.pretty.js (statement-aligned).
var pkt = `
#mini { pointer-events: auto; cursor: pointer; box-shadow: 0 4px 24px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,0,0,.4); }
body.touch #mini { display: block; left: auto; right: max(10px, 2.5vw); top: max(30px, 4vh); bottom: auto; width: 88px; height: 88px; }
@media (max-width: 520px) { body.touch #where { top: 150px; left: 0; right: 0; text-align: center; } }
#bigmap { position: fixed; inset: 0; z-index: 14; display: none; background: ${zn.water}; touch-action: none; cursor: grab; }
body.bigmap #bigmap { display: block; }
#bigmap canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
#bigmap::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 110px; background: linear-gradient(rgba(7,9,11,.7), rgba(7,9,11,0)); pointer-events: none; }
#bigmap .ttl, #bigmap .bar { z-index: 1; }
#bigmap .bar { position: absolute; right: max(14px, 2vw); top: max(14px, 2vh); display: flex; gap: 6px; }
#bigmap button { background: rgba(8,10,12,.75); color: var(--ink, #eee); border: 1px solid rgba(255,255,255,.2); border-radius: 3px; min-width: 38px; height: 38px; font: 800 16px ${Gr}; cursor: pointer; }
#bigmap button:hover { border-color: var(--acc, #ff5a1f); }
#bigmap .ttl { position: absolute; left: max(16px, 2.5vw); top: max(14px, 2vh); font: 800 20px ${Gr}; font-stretch: 118%; letter-spacing: .16em; text-transform: uppercase; text-shadow: 0 1px 10px rgba(0,0,0,.7); pointer-events: none; }
#bigmap .ttl small { display: block; font: 600 10px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .2em; color: rgba(243,244,241,.6); margin-top: 4px; }
#bigmap .hint { position: absolute; left: 50%; bottom: max(14px, 2vh); transform: translateX(-50%); font: 600 10px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .16em; color: rgba(243,244,241,.6); white-space: nowrap; pointer-events: none; text-transform: uppercase; }
@media (max-width: 520px) { #bigmap .ttl { display: none; } #bigmap .hint { bottom: 64px; } }
`,
  g9 = class {
    constructor({
      v: t,
      traffic: e = null,
      mobile: s = !1,
      onOpen: n = null,
      onClose: i = null,
    } = {}) {
      ((this.v = t),
        (this.traffic = e),
        (this.onOpen = n),
        (this.onClose = i),
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
      ((a.textContent = pkt), document.head.appendChild(a));
      let r = () => {
        let l = Math.max(64, Math.round(this.el.clientWidth * this.dpr));
        this.cv.width !== l && (this.cv.width = this.cv.height = l);
      };
      (window.ResizeObserver && new ResizeObserver(r).observe(this.el),
        r(),
        up()
          .then(() => gW)
          .then((l) => {
            l.PIERS &&
              ((aot = l.PIERS),
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
          ? ((this.big ||= new vN(this)).show(), this.onOpen?.())
          : this.onClose?.());
    }
    tile(t, e) {
      let s = t * 100003 + e,
        n = this.tiles.get(s);
      return n ? ((n.used = this.tick), n) : null;
    }
    renderTile(t, e) {
      let { T: s, M: n, TS: i } = this,
        a = Math.ceil((s + 2 * n) * i),
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
      (l.setTransform(i, 0, 0, i, -c * i, -h * i),
        rot(l, i, [c, h, c + s + 2 * n, h + s + 2 * n]));
      let f = { c: r, x0: c, z0: h, used: this.tick };
      return (this.tiles.set(t * 100003 + e, f), f);
    }
    update(t) {
      let e = performance.now(),
        s = this.v,
        n = this.g,
        i = this.cv.width,
        a = i / 2,
        r = this.dpr;
      this.tick++;
      let l = Math.abs(s.kmh || 0),
        h =
          (s.pos.x < he[0] - 150 ||
          s.pos.x > Ye.x + 20 ||
          s.pos.z > pe[ks - 1] + 60 ||
          s.pos.z < Ye.z
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
        v = (P, C) => {
          let I = P - u,
            L = C - d;
          return [a + f * (I * m - L * g), b + f * (I * g + L * m)];
        };
      (n.setTransform(1, 0, 0, 1, 0, 0),
        (n.fillStyle = zn.water),
        n.fillRect(0, 0, i, i),
        n.setTransform(
          f * m,
          f * g,
          -f * g,
          f * m,
          a - f * (u * m - d * g),
          b - f * (u * g + d * m),
        ),
        (n.imageSmoothingEnabled = !0));
      let x = this.T,
        y = this.R * 1.25,
        M = 0,
        S = [];
      for (let P = Math.floor((u - y) / x); P <= Math.floor((u + y) / x); P++)
        for (
          let C = Math.floor((d - y) / x);
          C <= Math.floor((d + y) / x);
          C++
        ) {
          let I = this.tile(P, C);
          if (!I)
            if (M < 1 || this.tick < 3) ((I = this.renderTile(P, C)), M++);
            else {
              S.push(1);
              continue;
            }
          let L = x + 2 * this.M;
          n.drawImage(I.c, I.x0, I.z0, L, L);
        }
      if (!M && !S.length && this.tick % 20 === 0) {
        let P = s.forward ? s.forward() : { x: 0, z: 0 },
          C = u + P.x * (this.R + 300),
          I = d + P.z * (this.R + 300),
          L = Math.floor(C / x),
          F = Math.floor(I / x);
        this.tile(L, F) || this.renderTile(L, F);
      }
      if ((n.setTransform(1, 0, 0, 1, 0, 0), this.traffic?.cars)) {
        n.fillStyle = "rgba(214,222,230,.85)";
        let P = 1.6 * r;
        for (let C of this.traffic.cars) {
          let [I, L] = v(C.x, C.z);
          (I - a) ** 2 + (L - a) ** 2 < a * a &&
            n.fillRect(I - P, L - P, 2 * P, 2 * P);
        }
      }
      let w = [[a - 8 * r, b - 10 * r, a + 8 * r, b + 9 * r]],
        _ = a * 0.92,
        z = (P, C, I, L = 0) => {
          let F = P.width,
            O = P.height,
            B = Math.abs(Math.cos(L)),
            H = Math.abs(Math.sin(L)),
            N = (F * B + O * H) / 2,
            D = (F * H + O * B) / 2;
          if (!L && Math.hypot(C - a, I - a) + Math.max(N, D) * 0.6 > _)
            return !1;
          let U = [C - N, I - D, C + N, I + D];
          return c9(w, U)
            ? !1
            : (w.push(U),
              L
                ? (n.setTransform(
                    Math.cos(L),
                    Math.sin(L),
                    -Math.sin(L),
                    Math.cos(L),
                    C,
                    I,
                  ),
                  n.drawImage(P, -F / 2, -O / 2),
                  n.setTransform(1, 0, 0, 1, 0, 0))
                : n.drawImage(P, C - F / 2, I - O / 2),
              !0);
        };
      for (let P of oot) {
        if (P.tier > 1 && this.R > 320) continue;
        let [C, I] = v(P.p[0], P.p[1]);
        Math.abs(C - a) < a &&
          Math.abs(I - a) < a &&
          z(W2(P.icon, P.col, 7.5 * r), C, I);
      }
      for (let P of iot) {
        let [C, I] = v(P.p[0], P.p[1]);
        Math.abs(C - a) < a && Math.abs(I - a) < a && z(t3(P.id, 13 * r), C, I);
      }
      this.labels(a, r, v, m, g, z, f);
      let A = a + g * (a - 9 * r),
        T = a - m * (a - 9 * r),
        E = x1("north" + r, () => {
          let P = document.createElement("canvas"),
            C = 7 * r;
          P.width = P.height = Math.ceil(2 * C + 2);
          let I = P.getContext("2d");
          return (
            (I.fillStyle = "rgba(8,10,12,.85)"),
            I.beginPath(),
            I.arc(P.width / 2, P.width / 2, C, 0, 7),
            I.fill(),
            (I.fillStyle = "#fff"),
            (I.font = `800 ${8.5 * r}px ${Gr}`),
            (I.textAlign = "center"),
            (I.textBaseline = "middle"),
            I.fillText("N", P.width / 2, P.width / 2 + 0.5 * r),
            P
          );
        });
      (n.drawImage(E, A - E.width / 2, T - E.height / 2),
        q2(n, a, b, 0, 8.5 * r));
      let R = performance.now() - e;
      this.ms = this.ms ? this.ms * 0.95 + R * 0.05 : R;
    }
    labels(t, e, s, n, i, a, r) {
      let l = [],
        c = t * 0.92;
      for (let f of hkt) {
        if (!f.pts.length) continue;
        let u = Mr(xN(f.name), (f.bridge ? 10.5 : 10) * e, {
            color: f.bridge ? "#ffc2a8" : f.c ? zn.labelMajor : zn.label,
            weight: f.c ? 700 : 600,
          }),
          d = u.width / 2 + 2 * e,
          p = this.lab.get(f),
          m = [];
        for (let g of f.pts) {
          let [b, v] = s(g[0], g[1]),
            x = Math.hypot(b - t, v - t);
          x + d * 0.75 > c ||
            m.push([
              ((t - v) / t) * 0.5 -
                Math.abs(x / t - 0.45) +
                (g === p ? 0.2 : 0),
              g,
              b,
              v,
            ]);
        }
        m.length &&
          (m.sort((g, b) => b[0] - g[0]), l.push([f, u, m, m[0][0] + f.c * 2]));
      }
      l.sort((f, u) => u[3] - f[3]);
      let h = 0;
      for (let [f, u, d] of l) {
        if (h >= 8) break;
        let p = f.dir[0] * n - f.dir[1] * i,
          m = f.dir[0] * i + f.dir[1] * n,
          g = Math.atan2(m, p);
        g > Math.PI / 2 + 0.01
          ? (g -= Math.PI)
          : g < -Math.PI / 2 + 0.01 && (g += Math.PI);
        let b = u.height / 2 + (f.hw || 12) * r + 3 * e,
          v = -Math.sin(g) * b,
          x = Math.cos(g) * b;
        t: for (let y = 0; y < Math.min(6, d.length); y++)
          for (let M of [0, 1, -1])
            if (a(u, d[y][2] + v * M, d[y][3] + x * M, g)) {
              (this.lab.set(f, d[y][1]), h++);
              break t;
            }
      }
    }
  },
  vN = class {
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
      let i = (a) => {
        (s.delete(a.pointerId),
          s.size < 2 && (n = 0),
          s.size || (e.style.cursor = ""));
      };
      (e.addEventListener("pointerup", i),
        e.addEventListener("pointercancel", i),
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
        i = this.cx + (e - this.cv.width / 2) / this.s,
        a = this.cz + (s - this.cv.height / 2) / this.s;
      ((this.s = n),
        (this.cx = i - (e - this.cv.width / 2) / n),
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
        i = this.dpr,
        a = this.cx - e / 2 / n,
        r = this.cz - s / 2 / n;
      (t.setTransform(n, 0, 0, n, -a * n, -r * n),
        rot(t, n, [a, r, a + e / n, r + s / n]),
        t.setTransform(1, 0, 0, 1, 0, 0));
      let l = (S, w) => [(S - a) * n, (w - r) * n],
        c = (S, w, _ = 0) => S > -_ && w > -_ && S < e + _ && w < s + _,
        h = [],
        f = (S, w, _, z = 0, A = !1) => {
          let T = S.width,
            E = S.height,
            R = Math.abs(Math.sin(z)) > 0.5,
            P = (R ? E : T) / 2,
            C = (R ? T : E) / 2,
            I = [w - P, _ - C, w + P, _ + C];
          return !A && c9(h, I)
            ? !1
            : (h.push(I),
              z
                ? (t.setTransform(
                    Math.cos(z),
                    Math.sin(z),
                    -Math.sin(z),
                    Math.cos(z),
                    w,
                    _,
                  ),
                  t.drawImage(S, -T / 2, -E / 2),
                  t.setTransform(1, 0, 0, 1, 0, 0))
                : t.drawImage(S, w - T / 2, _ - E / 2),
              !0);
        },
        u = this.ui.v,
        [d, p] = l(u.pos.x, u.pos.z);
      h.push([d - 16 * i, p - 16 * i, d + 16 * i, p + 16 * i]);
      let m = Math.max(7, Math.min(11, 7 + (n / i) * 6)) * i;
      for (let S of oot) {
        if ((S.tier > 0 && n / i < 0.12) || (S.tier > 1 && n / i < 0.35))
          continue;
        let [w, _] = l(S.p[0], S.p[1]);
        if (!c(w, _, 40)) continue;
        let z = W2(S.icon, S.col, m);
        if (f(z, w, _) && (n / i > 0.07 || S.tier === 0)) {
          let A = Mr(S.name, 11.5 * i, { color: "#bfe9f0", weight: 700 }),
            T = w + m + 4 * i + A.width / 2,
            E = [
              T - A.width / 2,
              _ - A.height / 2,
              T + A.width / 2,
              _ + A.height / 2,
            ];
          c9(h, E) || (h.push(E), t.drawImage(A, E[0], E[1]));
        }
      }
      let g = 15 * i;
      for (let S of uo) {
        let w = Math.max(300, (260 * i) / n);
        for (let _ = 120; _ < S.len - 40; _ += w) {
          let z = not(S, _),
            [A, T] = l(z[0], z[1]);
          c(A, T) && f(t3(S.id, g), A, T);
        }
      }
      let b = n / i;
      if (b > 0.09)
        for (let S of Rd) {
          if (b < 0.22 && S.c === 0) continue;
          let w = Mr(xN(S.name), (S.c ? 11.5 : 10.5) * i, {
              color: S.c ? zn.labelMajor : zn.label,
              weight: S.c ? 700 : 600,
            }),
            _ = S.col ? -Math.PI / 2 : 0,
            z = (w.width / n) * 1.25,
            A = S.col ? gkt : mkt,
            T = Math.max(1, Math.ceil(z / A) + (S.c ? 1 : 2));
          S.pts.forEach((E, R) => {
            if ((R + S.idx) % T) return;
            let [P, C] = l(E[0], E[1]);
            c(P, C) && f(w, P, C, _);
          });
        }
      if (b > 0.3)
        for (let S of v1) {
          let w = Mr(xN(S.name), 10 * i, { color: "#8e959e", weight: 600 });
          for (let _ of S.pts) {
            let [z, A] = l(_[0], _[1]);
            c(z, A) && f(w, z, A, S.col ? -Math.PI / 2 : 0);
          }
        }
      if (b > 0.03 && b < 0.9)
        for (let [S, w, _] of fkt) {
          let [z, A] = l(w, _);
          c(z, A, 100) &&
            f(
              Mr(S, 10.5 * i, {
                color: zn.hood,
                weight: 700,
                spacing: 0.22,
                haloW: 2.5,
              }),
              z,
              A,
            );
        }
      for (let [S, w, _] of ukt) {
        let [z, A] = l(w, _);
        c(z, A, 200) &&
          f(
            Mr(S, 14 * i, {
              color: zn.waterLabel,
              weight: 500,
              italic: !0,
              spacing: 0.12,
              halo: "rgba(8,14,20,.8)",
            }),
            z,
            A,
          );
      }
      q2(t, d, p, -u.psi, 12 * i);
      let v = [20, 50, 100, 200, 500, 1e3, 2e3, 5e3, 1e4],
        x = v.filter((S) => S * n <= 150 * i).pop() || 20,
        y = 18 * i,
        M = s - 26 * i;
      ((t.fillStyle = "rgba(8,10,12,.7)"),
        t.fillRect(y - 6 * i, M - 18 * i, x * n + 12 * i, 26 * i),
        (t.strokeStyle = "#e8e8e4"),
        (t.lineWidth = 2 * i),
        t.beginPath(),
        t.moveTo(y, M - 5 * i),
        t.lineTo(y, M),
        t.lineTo(y + x * n, M),
        t.lineTo(y + x * n, M - 5 * i),
        t.stroke(),
        (t.fillStyle = "#e8e8e4"),
        (t.font = `600 ${10 * i}px ${Gr}`),
        (t.textAlign = "left"),
        (t.textBaseline = "bottom"),
        t.fillText(
          x >= 1e3 ? `${x / 1e3} km` : `${x} m`,
          y + 2 * i,
          M - 6 * i,
        ));
    }
  },
  mkt = he[2] - he[1],
  gkt = pe[3] - pe[2];
