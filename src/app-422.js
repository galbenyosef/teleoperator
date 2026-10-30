// app 422 — math
// Lines 204669-205871 of readable/app.pretty.js (statement-aligned).
var M9 = class {
    constructor(t = {}) {
      let {
        v: e,
        real: s = null,
        traffic: n = null,
        mobile: i = !1,
        onOpen: a = null,
        onClose: r = null,
        assets: l = "assets/real/",
      } = t;
      if (!s || !s.data) return new g9(t);
      ((this.v = e),
        (this.traffic = n),
        (this.onOpen = a),
        (this.onClose = r),
        (this.open = !1),
        (this.mobile = i),
        (this.L = s.layout || null),
        (this.P = Rkt(s.data)),
        (this.tiles = new w9(this.P, i ? 26 : 48)),
        Pkt(this.P, l)
          .then(() => {
            (this.tiles.m.clear(), this.big && this.big.dirty());
          })
          .catch((f) => console.warn("map extras", f)),
        (this.el = document.getElementById("mini")),
        (this.cv = document.getElementById("miniC")),
        (this.g = this.cv.getContext("2d")),
        (this.R = 260),
        (this.ms = 0),
        (this.tick = 0),
        (this.hwy = !1),
        (this.hwyT = 0),
        (this.sel = []),
        (this.selT = 0),
        (this.prev = new Map()),
        (this.dpr = Math.min(2, window.devicePixelRatio || 1)),
        (this.orient = "heading"),
        (this.bigOrient = "north"),
        (this.drawPsi = null));
      try {
        let f = JSON.parse(localStorage.getItem(cot) || "{}") || {};
        (f.mini === "north" && (this.orient = "north"),
          f.big === "heading" && (this.bigOrient = "heading"));
      } catch {}
      let c = document.createElement("style");
      ((c.textContent = Ikt), document.head.appendChild(c));
      let h = () => {
        let f = Math.max(64, Math.round(this.el.clientWidth * this.dpr));
        this.cv.width !== f &&
          ((this.cv.width = this.cv.height = f), (this.selT = 0));
      };
      if (
        (window.ResizeObserver && new ResizeObserver(h).observe(this.el),
        h(),
        this.el.addEventListener("click", () => this.toggle(!0)),
        !document.getElementById("miniOsm"))
      ) {
        let f = document.createElement("a");
        ((f.id = "miniOsm"),
          (f.href = "https://www.openstreetmap.org/copyright"),
          (f.target = "_blank"),
          (f.rel = "noopener noreferrer"),
          (f.textContent = "\xA9 OpenStreetMap"),
          document.body.appendChild(f));
      }
      (addEventListener(
        "keydown",
        (f) => {
          document.body.classList.contains("play") &&
            (f.code === "Tab" || f.code === "KeyG"
              ? (f.preventDefault(),
                f.stopImmediatePropagation(),
                f.repeat || this.toggle())
              : this.open && (f.code === "Escape" || f.code === "KeyP")
                ? (f.preventDefault(),
                  f.stopImmediatePropagation(),
                  this.toggle(!1))
                : this.open && (f.code === "Equal" || f.code === "NumpadAdd")
                  ? this.big.zoom(1.4)
                  : this.open &&
                      (f.code === "Minus" || f.code === "NumpadSubtract")
                    ? this.big.zoom(1 / 1.4)
                    : this.open && f.code === "KeyF"
                      ? this.big.fitAll()
                      : this.open &&
                        f.code === "KeyO" &&
                        (f.preventDefault(),
                        f.stopImmediatePropagation(),
                        this.setOrient(
                          null,
                          this.bigOrient === "north" ? "heading" : "north",
                        )));
        },
        !0,
      ),
        setTimeout(() => {
          (Akt(this.P),
            (this.selT = 0),
            this.P.farLand.length && this.tiles.m.clear(),
            this.big && this.big.dirty(),
            console.log(
              `map: ${this.P.names.length} street names, ${this.P.A.n} label anchors, ${this.P.shields.length} shields, prep ${this.P.ms.toFixed(0)} + ${this.P.msLabels.toFixed(0)} ms`,
            ));
        }, 30));
    }
    setOrient(t = null, e = null) {
      (t && ((this.orient = t), (this.drawPsi = null), (this.selT = 0)),
        e && (this.bigOrient = e));
      try {
        localStorage.setItem(
          cot,
          JSON.stringify({ mini: this.orient, big: this.bigOrient }),
        );
      } catch {}
      this.big?.orient();
    }
    refresh(t = null) {
      this.P &&
        (pot(this.P),
        mot(this.P),
        got(this.P, t),
        this.tiles.m.clear(),
        (this.selT = 0),
        this.big && this.big.dirty());
    }
    toggle(t = !this.open) {
      t !== this.open &&
        ((this.open = t),
        document.body.classList.toggle("bigmap", t),
        t
          ? ((this.big ||= new zN(this)).show(), this.onOpen?.())
          : (this.setPick(null), this.onClose?.()));
    }
    setPick(t, e = "") {
      this.pick = t || null;
      let s = this.big;
      s &&
        (e &&
          ((s.msg.textContent = e),
          s.msg.classList.add("on"),
          clearTimeout(s.msgT),
          (s.msgT = setTimeout(() => s.msg.classList.remove("on"), 1800))),
        t &&
          ((s.tp.querySelector(".tpGo").textContent = "Teleport here"),
          (s.tp.querySelector("small").textContent = [t.name, t.sub]
            .filter(Boolean)
            .join(" \xB7 "))),
        s.dirty());
    }
    cars() {
      let t = this.traffic,
        e =
          t &&
          (Array.isArray(t.cars)
            ? t.cars
            : Array.isArray(t.list)
              ? t.list
              : null),
        s = [];
      if (e)
        for (let i of e) {
          if (!i) continue;
          let a = +(i.x ?? i.pos?.x),
            r = +(i.z ?? i.pos?.z);
          if (Number.isFinite(a) && Number.isFinite(r)) {
            let l = i.cop ? 3 : i.cable ? 2 : i.bus ? 1 : 0,
              c = i.mapT ? Math.min(1, (performance.now() - i.mapT) / 700) : 1;
            (s.push([a, r, l, c]),
              c < 1 && i.mapOld && s.push([i.mapOld.x, i.mapOld.z, l, 1 - c]));
          }
        }
      let n = t?.heliMark;
      return (n && s.push([n.x, n.z, 4]), s);
    }
    update(t) {
      let e = performance.now(),
        s = this.v,
        n = this.g,
        i = this.cv.width,
        a = i / 2,
        r = this.dpr,
        l = this.P;
      (this.tick++, this.tiles.tick++);
      let c = s.pos.x,
        h = s.pos.z;
      if ((this.hwyT -= t) <= 0 && this.L?.roadAt) {
        this.hwyT = 0.5;
        try {
          let B = this.L.roadAt(c, h, 20, s.pos.y);
          this.hwy = !!(B && B.E && this.P.rank[B.E.id] === 0);
        } catch {
          this.hwy = !1;
        }
      }
      let f = Math.abs(s.kmh || 0),
        u =
          (this.hwy ? 460 : 250) +
          300 * Math.min(1, f / 220) +
          (this.mobile ? 60 : 0);
      if (
        ((this.R += (u - this.R) * Math.min(1, t * 1.5)),
        this.orient === "north")
      )
        this.drawPsi = 0;
      else {
        let B = (H) => Math.atan2(Math.sin(H), Math.cos(H));
        if (
          this.drawPsi === null ||
          this.psiA === void 0 ||
          (Math.abs(B(s.psi - this.psiA)) > 1.2 &&
            Math.hypot(c - (this.lastX ?? c), h - (this.lastZ ?? h)) > 30)
        )
          this.psiA = this.drawPsi = s.psi;
        else {
          let H = 1 - Math.exp(-Math.min(0.1, t) / 0.22);
          ((this.psiA = B(this.psiA + B(s.psi - this.psiA) * H)),
            (this.drawPsi = B(this.drawPsi + B(this.psiA - this.drawPsi) * H)));
        }
      }
      ((this.lastX = c), (this.lastZ = h));
      let d = a / this.R,
        p = this.drawPsi,
        m = Math.cos(p),
        g = Math.sin(p),
        b = this.orient === "north" ? a : a * 1.22,
        v = (B, H) => {
          let N = B - c,
            D = H - h;
          return [a + d * (N * m - D * g), b + d * (N * g + D * m)];
        },
        x = -g,
        y = -m,
        M = (b - a) / d,
        S = c + x * M,
        w = h + y * M,
        _ = (a / d) * 1.05;
      (n.setTransform(1, 0, 0, 1, 0, 0),
        (n.fillStyle = Es.water),
        n.fillRect(0, 0, i, i),
        n.setTransform(
          d * m,
          d * g,
          -d * g,
          d * m,
          a - d * (c * m - h * g),
          b - d * (c * g + h * m),
        ),
        (n.imageSmoothingEnabled = !0),
        (n.imageSmoothingQuality = this.mobile ? "medium" : "high"));
      let z = Math.log2(d) - 0.2;
      (this.mz === void 0 || z > this.mz || z < this.mz - 1.25) &&
        (this.mz = Math.ceil(z));
      let A = Hh(this.mz, O4, AN),
        T = this.tiles.draw(n, A, [S - _, w - _, S + _, w + _]);
      if (T && this.tick < 4) this.tiles.work(200);
      else if (!T && !this.tiles.q.size && this.tick % 30 === 0) {
        let B = S - Math.sin(s.psi) * _ * 1.2,
          H = w - Math.cos(s.psi) * _ * 1.2,
          N = w9.size(A);
        for (let [D, U] of [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          let G = Math.floor(B / N) + D,
            W = Math.floor(H / N) + U;
          this.tiles.get(A, G, W) || this.tiles.want(A, G, W, 50);
        }
      }
      (this.tiles.schedule(), n.setTransform(1, 0, 0, 1, 0, 0));
      let E = this.cars();
      if (E.length) {
        let B = 1.5 * r;
        for (let [H, N, D, U = 1] of E) {
          let [G, W] = v(H, N);
          if ((G - a) ** 2 + (W - a) ** 2 < a * a) {
            if (D === 4) {
              wot(n, G, W, B);
              continue;
            }
            (U < 1 && (n.globalAlpha = U),
              (n.fillStyle =
                D === 3
                  ? "#ff3b3b"
                  : D === 2
                    ? "#e8b25c"
                    : D === 1
                      ? "#8fc4ff"
                      : "rgba(220,226,234,.9)"),
              n.fillRect(G - B, W - B, 2 * B, 2 * B),
              U < 1 && (n.globalAlpha = 1));
          }
        }
      }
      let R = this.overlay;
      if (R) {
        (n.save(),
          n.beginPath(),
          n.arc(a, a, a - 1, 0, 7),
          n.clip(),
          vot(n, R.route, v, 3.4 * r, R.target?.col || "#3fd6c6"));
        for (let B of R.others || []) {
          let [H, N] = v(B.x, B.z);
          (H - a) ** 2 + (N - a) ** 2 < (a * 0.9) ** 2 &&
            B4(n, H, N, 5 * r, B.col, B.glyph);
        }
        if ((n.restore(), R.target)) {
          let B = R.target,
            [H, N] = v(B.x, B.z),
            D = H - a,
            U = N - a,
            G = Math.hypot(D, U),
            W = a * 0.86;
          if (G < W) B4(n, H, N, 7 * r, B.col, B.glyph);
          else {
            let V = D / G,
              $ = U / G;
            (n.save(),
              n.translate(a + V * W, a + $ * W),
              n.rotate(Math.atan2($, V) + Math.PI / 2),
              (n.shadowColor = "rgba(0,0,0,.7)"),
              (n.shadowBlur = 4 * r),
              (n.fillStyle = B.col),
              n.beginPath(),
              n.moveTo(0, -8 * r),
              n.lineTo(7 * r, 5 * r),
              n.lineTo(0, 1.5 * r),
              n.lineTo(-7 * r, 5 * r),
              n.closePath(),
              n.fill(),
              n.restore());
          }
        }
      }
      for (let B of this.players || []) {
        let [H, N] = v(B.x, B.z),
          [D, U] = v(B.x - Math.sin(B.psi) * 10, B.z - Math.cos(B.psi) * 10),
          G = H - a,
          W = N - a,
          V = Math.hypot(G, W),
          $ = a * 0.86;
        (V > $ && ((H = a + (G / V) * $), (N = a + (W / V) * $)),
          yot(n, H, N, 5.5 * r, Math.atan2(U - N, D - H), B.col));
      }
      let P = a * 0.94;
      (--this.selT <= 0 ||
        Math.abs(p - (this.selPsi ?? p)) > 0.12 ||
        Math.hypot(c - (this.selX ?? c), h - (this.selZ ?? h)) >
          this.R * 0.15) &&
        ((this.selT = 6),
        (this.selPsi = p),
        (this.selX = c),
        (this.selZ = h),
        this.select(a, r, d, m, g, v, P, S, w, _, b));
      for (let B of this.sel) {
        let H = B.b;
        if (B.p) {
          let [N, D] = v(B.p[0], B.p[1]);
          ((H = { ...H, cx: N, cy: D }),
            B.t &&
              ([H.ux, H.uy] = kN(
                B.t[0] * m - B.t[1] * g,
                B.t[0] * g + B.t[1] * m,
              )));
        }
        Math.hypot(H.cx - a, H.cy - a) + H.r * 0.9 > P ||
          (B.t
            ? bot(n, B.c, H)
            : n.drawImage(B.c, H.cx - B.c.width / 2, H.cy - B.c.height / 2));
      }
      let C = x1("vig" + i, () => {
        let B = document.createElement("canvas");
        B.width = B.height = i;
        let H = B.getContext("2d"),
          N = H.createRadialGradient(a, a, a * 0.72, a, a, a);
        return (
          N.addColorStop(0, "rgba(0,0,0,0)"),
          N.addColorStop(1, "rgba(0,0,0,.55)"),
          (H.fillStyle = N),
          H.fillRect(0, 0, i, i),
          B
        );
      });
      n.drawImage(C, 0, 0);
      let I = a + g * (a - 9 * r),
        L = a - m * (a - 9 * r),
        F = x1("north" + r, () => {
          let B = document.createElement("canvas"),
            H = 7 * r;
          B.width = B.height = Math.ceil(2 * H + 2);
          let N = B.getContext("2d");
          return (
            (N.fillStyle = "rgba(8,10,12,.85)"),
            N.beginPath(),
            N.arc(B.width / 2, B.width / 2, H, 0, 7),
            N.fill(),
            (N.fillStyle = "#fff"),
            (N.font = `800 ${8.5 * r}px ${Gr}`),
            (N.textAlign = "center"),
            (N.textBaseline = "middle"),
            N.fillText("N", B.width / 2, B.width / 2 + 0.5 * r),
            B
          );
        });
      (n.drawImage(F, I - F.width / 2, L - F.height / 2),
        q2(n, a, b, p - s.psi, (this.mobile ? 7 : 8.5) * r, Es.arrow));
      let O = performance.now() - e;
      this.ms = this.ms ? this.ms * 0.95 + O * 0.05 : O;
    }
    select(t, e, s, n, i, a, r, l, c, h, f) {
      let u = this.P,
        d = [],
        p = [hl(t, f, 1, 0, 9 * e, 10 * e)],
        m = this.el.clientWidth < 120,
        g = (z, A = 0.9) => Math.hypot(z.cx - t, z.cy - t) + z.r * A <= r,
        b = (z, A) => {
          let [T, E] = a(z.p[0], z.p[1]),
            R = W2(z.icon, z.col, A),
            P = hl(T, E, 1, 0, R.width * 0.36, R.height * 0.36);
          !g(P) || M1(p, P) || (p.push(P), d.push({ c: R, b: P, p: z.p }));
        };
      for (let z of this.pois?.() || [])
        Math.hypot(z.x - l, z.z - c) < h &&
          b({ p: [z.x, z.z], icon: z.kind, col: z.col }, (m ? 6 : 7.5) * e);
      for (let z of fot)
        (z.tier === 0 ||
          (z.tier === 1 && this.R < 420) ||
          (z.tier === 2 && this.R < 330)) &&
          Math.hypot(z.p[0] - l, z.p[1] - c) < h &&
          b(z, (m ? 6 : 7.5) * e);
      for (let z of u.shields) {
        if (Math.abs(z.p[0] - l) > h || Math.abs(z.p[1] - c) > h) continue;
        let [A, T] = a(z.p[0], z.p[1]),
          E = t3(z.id, (m ? 11 : 13) * e),
          R = hl(A, T, 1, 0, E.width / 2 + 3 * e, E.height / 2 + 3 * e);
        !g(R) || M1(p, R) || (p.push(R), d.push({ c: E, b: R, p: z.p }));
      }
      if (!u.A) {
        this.sel = d;
        return;
      }
      let v = u.A,
        x = v9(u.AB, l - h, c - h, l + h, c + h, [], ++y9, u.aSeen),
        y = new Map(),
        M = (m ? 8.5 : 9.5) * e;
      for (let z of x) {
        let [A, T] = a(v.x[z], v.z[z]),
          E = Math.hypot(A - t, T - t);
        if (E > r * 0.8) continue;
        let R = v.name[z],
          P = v.rank[z],
          C = xot(u, R, P, M + (P <= 3 ? 0.5 * e : 0));
        if (v.half[z] * s < C.width * 0.5) continue;
        let I =
            -P * 3 +
            ((t - T) / t) * 0.6 -
            Math.abs(E / t - 0.42) +
            (this.prev.get(R) === z ? 0.8 : 0),
          L = y.get(R);
        (!L || I > L[0]) && y.set(R, [I, z, C]);
      }
      let S = [...y.values()].sort((z, A) => A[0] - z[0]);
      this.prev.clear();
      let w = 0,
        _ = m ? 2 : 8;
      for (let [, z, A] of S) {
        if (w >= _) break;
        let [T, E] = a(v.x[z], v.z[z]),
          [R, P] = kN(v.tx[z] * n - v.tz[z] * i, v.tx[z] * i + v.tz[z] * n),
          C = hl(T, E, R, P, A.width / 2 - 2 * e, A.height * 0.36);
        !g(C) ||
          M1(p, C) ||
          (p.push(C),
          d.push({ c: A, b: C, p: [v.x[z], v.z[z]], t: [v.tx[z], v.tz[z]] }),
          this.prev.set(v.name[z], z),
          w++);
      }
      if (!m)
        for (let z of EN) {
          if (z.tier > 2 || Math.hypot(z.p[0] - l, z.p[1] - c) > h * 0.8)
            continue;
          let [A, T] = a(z.p[0], z.p[1]),
            E = Mr(z.n, 8.5 * e, {
              color: Es.hood,
              weight: 700,
              spacing: 0.2,
              halo: Es.halo,
              haloW: 2 * e,
            }),
            R = hl(A, T, 1, 0, E.width / 2, E.height / 2);
          if (!(!g(R) || M1(p, R))) {
            (p.push(R), d.push({ c: E, b: R, p: z.p }));
            break;
          }
        }
      this.sel = d;
    }
  },
  zN = class {
    constructor(t) {
      ((this.ui = t), (this.dpr = Math.min(2, window.devicePixelRatio || 1)));
      let e = (this.el = document.createElement("div"));
      ((e.id = "bigmap"),
        (e.innerHTML = `<canvas></canvas><div class="ttl">${bi.name.replace(/[<&>"]/g, (r) => "&#" + r.charCodeAt(0) + ";")}<small>Map</small></div>
      <div class="bar"><button data-z="in" title="Zoom in (+)">+</button><button data-z="out" title="Zoom out (-)">\u2212</button><button data-z="all" title="The whole city (F)">\u2922</button><button data-z="me" title="Centre on the car">\u25CE</button><button data-z="rot" class="or" title="Full map: north up / heading up (O)">N</button><button data-z="mini" class="or" title="Minimap: heading up (smoothed) / north up">\u27F3</button><button data-z="x" title="Close (Tab / G / Esc)">\u2715</button></div>
      <div class="hint">${matchMedia("(pointer: coarse)").matches ? "Drag \xB7 pinch to zoom \xB7 tap a street to teleport" : "Scroll to zoom \xB7 drag to move \xB7 click a street to teleport \xB7 F whole city \xB7 Tab / G / Esc to close"}</div>
      <a class="osm" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">\xA9 OpenStreetMap contributors</a>
      <div class="tp"><button class="tpGo">Teleport here</button><button class="tpDrive" title="Level 5 drives there">Drive here</button><button class="tpX" title="Cancel">\u2715</button><small></small></div><div class="tpMsg"></div>`),
        document.body.appendChild(e),
        (this.cv = e.querySelector("canvas")),
        (this.g = this.cv.getContext("2d")),
        (this.tp = e.querySelector(".tp")),
        (this.msg = e.querySelector(".tpMsg")),
        this.tp.querySelector(".tpGo").addEventListener("click", (r) => {
          r.stopPropagation();
          let l = t.pick;
          l && t.onPickGo?.(l);
        }),
        this.tp.querySelector(".tpDrive").addEventListener("click", (r) => {
          r.stopPropagation();
          let l = t.pick;
          l && t.onPickDrive?.(l);
        }),
        this.tp.querySelector(".tpX").addEventListener("click", (r) => {
          (r.stopPropagation(), t.setPick(null));
        }),
        e.querySelector(".bar").addEventListener("click", (r) => {
          let l = r.target.dataset?.z;
          l === "in"
            ? this.zoom(1.5)
            : l === "out"
              ? this.zoom(1 / 1.5)
              : l === "all"
                ? this.fitAll()
                : l === "me"
                  ? this.center()
                  : l === "rot"
                    ? t.setOrient(
                        null,
                        t.bigOrient === "north" ? "heading" : "north",
                      )
                    : l === "mini"
                      ? t.setOrient(t.orient === "north" ? "heading" : "north")
                      : l === "x" && t.toggle(!1);
        }),
        e.addEventListener(
          "wheel",
          (r) => {
            r.preventDefault();
            let l = this.cv.getBoundingClientRect();
            this.zoom(
              Math.exp(-r.deltaY * (r.deltaMode ? 0.05 : 0.0016)),
              (r.clientX - l.left) * this.dpr,
              (r.clientY - l.top) * this.dpr,
            );
          },
          { passive: !1 },
        ));
      let s = new Map(),
        n = 0,
        i = null;
      (e.addEventListener("pointerdown", (r) => {
        r.target === this.cv &&
          (this.cv.setPointerCapture(r.pointerId),
          s.set(r.pointerId, [r.clientX, r.clientY]),
          (e.style.cursor = "grabbing"),
          (i =
            s.size === 1 && r.button === 0
              ? {
                  id: r.pointerId,
                  x: r.clientX,
                  y: r.clientY,
                  t: performance.now(),
                }
              : null));
      }),
        e.addEventListener("pointermove", (r) => {
          if (!s.has(r.pointerId)) return;
          i &&
            (i.id !== r.pointerId ||
              Math.hypot(r.clientX - i.x, r.clientY - i.y) > 8) &&
            (i = null);
          let [l, c] = s.get(r.pointerId);
          if ((s.set(r.pointerId, [r.clientX, r.clientY]), s.size === 1)) {
            let [h, f] = this.unrot(
              ((r.clientX - l) * this.dpr) / this.s,
              ((r.clientY - c) * this.dpr) / this.s,
            );
            ((this.cx -= h), (this.cz -= f), this.dirty());
          } else if (s.size === 2) {
            let [h, f] = [...s.values()],
              u = Math.hypot(h[0] - f[0], h[1] - f[1]);
            (n &&
              this.zoom(
                u / n,
                ((h[0] + f[0]) / 2) * this.dpr,
                ((h[1] + f[1]) / 2) * this.dpr,
              ),
              (n = u));
          }
        }));
      let a = (r) => {
        if (
          (s.delete(r.pointerId),
          s.size < 2 && (n = 0),
          s.size || (e.style.cursor = ""),
          r.type === "pointerup" &&
            i &&
            i.id === r.pointerId &&
            !s.size &&
            performance.now() - i.t < 700 &&
            t.onPick)
        ) {
          let l = this.cv.getBoundingClientRect(),
            [c, h] = this.toWorld(
              (r.clientX - l.left) * this.dpr,
              (r.clientY - l.top) * this.dpr,
            );
          t.onPick(c, h, Hh((26 * this.dpr) / this.s, 40, 160));
        }
        i = null;
      };
      (e.addEventListener("pointerup", a),
        e.addEventListener("pointercancel", a),
        addEventListener("keydown", (r) => {
          t.open &&
            t.pick &&
            (r.code === "Enter" || r.code === "NumpadEnter") &&
            (r.preventDefault(), t.onPickGo?.(t.pick));
        }),
        addEventListener("resize", () => {
          t.open && (this.fit(), this.dirty());
        }),
        (t.tiles.onReady = () => {
          if (!t.open || !this.missing) return;
          let r = t.tiles,
            l = performance.now() - (this.drawnAt || 0);
          (!r.q.size && !r.job) || l > 200
            ? this.dirty()
            : this.later ||
              (this.later = setTimeout(() => {
                ((this.later = 0), this.dirty());
              }, 200 - l));
        }));
    }
    fit() {
      let t = Math.round(innerWidth * this.dpr),
        e = Math.round(innerHeight * this.dpr);
      (this.cv.width !== t || this.cv.height !== e) &&
        ((this.cv.width = t), (this.cv.height = e));
    }
    show() {
      (this.fit(),
        this.orient(),
        this.center(Math.min(this.cv.width, this.cv.height) / 2600),
        this.draw(),
        this.pump(80));
    }
    orient() {
      let t = this.ui;
      this.rot = t.bigOrient === "heading" ? t.v.psi : 0;
      for (let e of this.el.querySelectorAll(".or")) {
        let s = e.dataset.z === "rot",
          n = (s ? t.bigOrient : t.orient) === "heading";
        ((e.innerHTML = s
          ? n
            ? "\u2B06"
            : "N"
          : `<small>MINI</small>${n ? "\u27F3" : "N"}`),
          (e.title = s
            ? `Full map: ${n ? "heading up" : "north up"} - switch (O)`
            : `Minimap: ${n ? "heading up (smoothed)" : "north up"} - switch`),
          e.classList.toggle("mini", !s));
      }
      this.dirty();
    }
    unrot(t, e) {
      let s = Math.cos(this.rot || 0),
        n = Math.sin(this.rot || 0);
      return [t * s + e * n, -t * n + e * s];
    }
    toWorld(t, e) {
      let [s, n] = this.unrot(
        (t - this.cv.width / 2) / this.s,
        (e - this.cv.height / 2) / this.s,
      );
      return [this.cx + s, this.cz + n];
    }
    pump(t = 12) {
      let e = this.ui.tiles;
      this.ui.open &&
        ((e.q.size || e.job) && e.work(t),
        (e.q.size || e.job) &&
          (this.praf ||
            (this.praf = requestAnimationFrame(() => {
              ((this.praf = 0), this.pump(this.missing ? 20 : 8));
            }))));
    }
    get F() {
      let t = this.ui.P;
      if (!t.fineAll) {
        let e = t.fine.slice();
        for (let s of t.regions || [])
          ((e[0] = Math.min(e[0], s.fine[0])),
            (e[1] = Math.min(e[1], s.fine[1])),
            (e[2] = Math.max(e[2], s.fine[2])),
            (e[3] = Math.max(e[3], s.fine[3])));
        t.fineAll = e;
      }
      return t.fineAll;
    }
    minS() {
      let t = this.F;
      return Math.min(
        this.cv.width / (t[2] - t[0] + 3e3),
        this.cv.height / (t[3] - t[1] + 3e3),
      );
    }
    fitAll() {
      let t = this.ui.P.fine;
      ((this.s = Math.min(
        this.cv.width / (t[2] - t[0] + 500),
        this.cv.height / (t[3] - t[1] + 700),
      )),
        (this.cx = (t[0] + t[2]) / 2),
        (this.cz = (t[1] + t[3]) / 2 - 150),
        this.dirty());
    }
    center(t = this.s) {
      ((this.cx = this.ui.v.pos.x),
        (this.cz = this.ui.v.pos.z),
        (this.s = t),
        this.dirty());
    }
    zoom(t, e = this.cv.width / 2, s = this.cv.height / 2) {
      let n = Hh(this.s * t, this.minS(), 8 * this.dpr),
        [i, a] = this.toWorld(e, s);
      this.s = n;
      let [r, l] = this.unrot(
        (e - this.cv.width / 2) / n,
        (s - this.cv.height / 2) / n,
      );
      ((this.cx = i - r), (this.cz = a - l), this.dirty());
    }
    dirty() {
      this.raf ||
        (this.raf = requestAnimationFrame(() => {
          ((this.raf = 0), this.ui.open && this.draw());
        }));
    }
    draw() {
      let t = performance.now(),
        e = this.ui,
        s = e.P,
        n = this.g,
        i = this.cv.width,
        a = this.cv.height,
        r = this.dpr,
        l = this.F;
      ((this.cx = Hh(this.cx, l[0] - 1500, l[2] + 2600)),
        (this.cz = Hh(this.cz, l[1] - 2600, l[3] + 600)));
      let c = this.s,
        h = c / r,
        f = Math.cos(this.rot || 0),
        u = Math.sin(this.rot || 0),
        d = this.cx,
        p = this.cz,
        m = i / 2 / c,
        g = a / 2 / c,
        b = Math.abs(m * f) + Math.abs(g * u),
        v = Math.abs(m * u) + Math.abs(g * f),
        x = d - b,
        y = p - v,
        M = d + b,
        S = p + v;
      (n.setTransform(1, 0, 0, 1, 0, 0),
        (n.fillStyle = Es.water),
        n.fillRect(0, 0, i, a),
        n.setTransform(
          c * f,
          c * u,
          -c * u,
          c * f,
          i / 2 - c * (d * f - p * u),
          a / 2 - c * (d * u + p * f),
        ),
        (n.imageSmoothingEnabled = !0),
        (n.imageSmoothingQuality = "high"));
      let w = Hh(Math.ceil(Math.log2(c) - 0.1), O4, AN);
      (e.tiles.tick++,
        (this.missing = e.tiles.draw(n, w, [x, y, M, S], -1e3, 1)),
        this.pump(0),
        n.setTransform(1, 0, 0, 1, 0, 0));
      let _ = (Q, et) => {
          let st = Q - d,
            ot = et - p;
          return [i / 2 + c * (st * f - ot * u), a / 2 + c * (st * u + ot * f)];
        },
        z = (Q, et, st = 0) => Q > -st && et > -st && Q < i + st && et < a + st,
        A = [],
        T = (Q, et, st, ot = !1) => {
          let rt = hl(et, st, 1, 0, Q.width / 2 - 2, Q.height / 2 - 2);
          return !ot && M1(A, rt)
            ? !1
            : (A.push(rt),
              n.drawImage(Q, et - Q.width / 2, st - Q.height / 2),
              !0);
        },
        E = e.discovery;
      if (E) {
        let Q = E.D.edges,
          et = 30;
        ((n.strokeStyle = "rgba(63,214,198,.75)"),
          (n.lineWidth = Math.max(1.5, Math.min(4, 2.2 * h)) * r),
          (n.lineCap = "round"),
          n.beginPath());
        for (let st = 0; st < Q.length; st++) {
          if (!E.has(st)) continue;
          let ot = Q[st].P,
            rt = ot.length / 3,
            lt = ot[0],
            ht = ot[1],
            pt = ot[(rt - 1) * 3],
            ut = ot[(rt - 1) * 3 + 1];
          if (!(
            Math.max(lt, pt) < x - et ||
            Math.min(lt, pt) > M + et ||
            Math.max(ht, ut) < y - et ||
            Math.min(ht, ut) > S + et
          ))
            for (let it = 0; it < rt; it++) {
              let [at, yt] = _(ot[it * 3], ot[it * 3 + 1]);
              it ? n.lineTo(at, yt) : n.moveTo(at, yt);
            }
        }
        n.stroke();
      }
      let R = e.discLabel?.() || "";
      if (this._dl !== R) {
        this._dl = R;
        let Q = this.el.querySelector(".ttl small");
        Q && (Q.textContent = R ? "Map \xB7 " + R : "Map");
      }
      let P = e.cars();
      if (P.length && h > 0.12) {
        let Q = Math.max(1.5, Math.min(4, 2 * h)) * r;
        for (let [et, st, ot, rt = 1] of P) {
          let [lt, ht] = _(et, st);
          if (z(lt, ht)) {
            if (ot === 4) {
              wot(n, lt, ht, Q);
              continue;
            }
            (rt < 1 && (n.globalAlpha = rt),
              (n.fillStyle =
                ot === 3
                  ? "#ff3b3b"
                  : ot === 2
                    ? "#e8b25c"
                    : ot === 1
                      ? "#8fc4ff"
                      : "rgba(220,226,234,.9)"),
              n.fillRect(lt - Q, ht - Q, 2 * Q, 2 * Q),
              rt < 1 && (n.globalAlpha = 1));
          }
        }
      }
      let C = e.overlay;
      if (C) {
        vot(
          n,
          C.route,
          _,
          Math.max(3, Math.min(7, 5 * h)) * r,
          C.target?.col || "#3fd6c6",
        );
        for (let Q of C.others || []) {
          let [et, st] = _(Q.x, Q.z);
          z(et, st, 20) && B4(n, et, st, 8 * r, Q.col, Q.glyph);
        }
        if (C.target) {
          let Q = C.target,
            [et, st] = _(Q.x, Q.z);
          if (
            (B4(n, et, st, 12 * r, Q.col, Q.glyph),
            A.push(hl(et, st - 15 * r, 1, 0, 12 * r, 16 * r)),
            Q.label)
          ) {
            let ot = Mr(Q.label, 12 * r, {
              color: "#fff",
              weight: 800,
              halo: "rgba(6,10,14,.9)",
              haloW: 3 * r,
            });
            (n.drawImage(ot, et - ot.width / 2, st - 12 * r * 2.6 - ot.height),
              A.push(
                hl(
                  et,
                  st - 12 * r * 2.6 - ot.height / 2,
                  1,
                  0,
                  ot.width / 2,
                  ot.height / 2,
                ),
              ));
          }
        }
      }
      for (let Q of e.players || []) {
        let [et, st] = _(Q.x, Q.z);
        if (!z(et, st, 30)) continue;
        let [ot, rt] = _(
          Q.x - Math.sin(Q.psi) * 10,
          Q.z - Math.cos(Q.psi) * 10,
        );
        (yot(n, et, st, 9 * r, Math.atan2(rt - st, ot - et), Q.col),
          A.push(hl(et, st, 1, 0, 11 * r, 11 * r)));
        let lt = Mr("@" + Q.name, 11.5 * r, {
          color: Q.col,
          weight: 800,
          halo: "rgba(6,10,14,.92)",
          haloW: 3 * r,
        });
        (n.drawImage(lt, et - lt.width / 2, st - 12 * r - lt.height),
          A.push(
            hl(
              et,
              st - 12 * r - lt.height / 2,
              1,
              0,
              lt.width / 2,
              lt.height / 2,
            ),
          ));
      }
      let I = e.v,
        [L, F] = _(I.pos.x, I.pos.z);
      A.push(hl(L, F, 1, 0, 16 * r, 16 * r));
      let O = Hh(7 + h * 5, 7, 11) * r,
        B = (Q) => {
          for (let et of fot) {
            if (
              et.tier !== Q ||
              (et.tier === 1 && h < 0.1) ||
              (et.tier === 2 && h < 0.3)
            )
              continue;
            let [st, ot] = _(et.p[0], et.p[1]);
            if (!z(st, ot, 40)) continue;
            let rt = W2(et.icon, et.col, O);
            if (T(rt, st, ot) && (h > 0.09 || et.tier === 0)) {
              let lt = Mr(et.name, (et.tier ? 10.5 : 11.5) * r, {
                color: "#bfe9f0",
                weight: 700,
                halo: Es.halo,
              });
              for (let ht of [1, -1]) {
                let pt = st + ht * (O + 3 * r + lt.width / 2),
                  ut = hl(pt, ot, 1, 0, lt.width / 2 - 2, lt.height / 2 - 2);
                if (!M1(A, ut)) {
                  (A.push(ut),
                    n.drawImage(lt, pt - lt.width / 2, ot - lt.height / 2));
                  break;
                }
              }
            }
          }
        };
      B(0);
      for (let Q of e.pois?.() || []) {
        let [et, st] = _(Q.x, Q.z);
        if (!z(et, st, 30)) continue;
        let ot = W2(Q.kind, Q.col, O * 0.95);
        if (T(ot, et, st) && h > 0.09) {
          let rt = Mr(
            Q.name + (Q.stars ? " " + "\u2605".repeat(Q.stars) : ""),
            10.5 * r,
            {
              color: Q.stars ? "#ffe08a" : "#e6e0d0",
              weight: 700,
              halo: Es.halo,
            },
          );
          for (let lt of [1, -1]) {
            let ht = et + lt * (O + 3 * r + rt.width / 2),
              pt = hl(ht, st, 1, 0, rt.width / 2 - 2, rt.height / 2 - 2);
            if (!M1(A, pt)) {
              (A.push(pt),
                n.drawImage(rt, ht - rt.width / 2, st - rt.height / 2));
              break;
            }
          }
        }
      }
      let H = (Q) => {
        if (!(h < 0.045 || h > 1.6 || (Q === 1 && h < 0.09)))
          for (let et of EN) {
            if (et.tier !== Q) continue;
            let [st, ot] = _(et.p[0], et.p[1]);
            z(st, ot, 100) &&
              T(
                Mr(et.n, (Q ? 9.5 : 10.5) * r, {
                  color: Es.hood,
                  weight: 700,
                  spacing: 0.22,
                  halo: Es.halo,
                  haloW: 2.5 * r,
                }),
                st,
                ot,
              );
          }
      };
      H(0);
      let N = 15 * r,
        D = [];
      for (let Q of s.shields) {
        let [et, st] = _(Q.p[0], Q.p[1]);
        z(et, st) &&
          (D.some(
            (ot) =>
              ot[2] === Q.id && Math.hypot(ot[0] - et, ot[1] - st) < 260 * r,
          ) ||
            (T(t3(Q.id, N), et, st) && D.push([et, st, Q.id])));
      }
      let U =
          h < 0.05
            ? 1
            : h < 0.09
              ? 2
              : h < 0.16
                ? 3
                : h < 0.3
                  ? 4
                  : h < 0.7
                    ? 5
                    : 6,
        G = s.A || { rank: [], half: [] },
        W = s.A
          ? v9(s.AB, x, y, M, S, [], ++y9, s.aSeen).filter(
              (Q) => G.rank[Q] <= U,
            )
          : [];
      W.sort((Q, et) => G.rank[Q] - G.rank[et] || G.half[et] - G.half[Q]);
      let V = new Map(),
        $ = (Q) => (Q <= 1 ? 12 : Q <= 3 ? 11.5 : Q <= 4 ? 11 : 10.5) * r,
        J = 0,
        X = (Q, et) => {
          for (let st of W) {
            let ot = G.rank[st];
            if (ot < Q || ot > et) continue;
            let [rt, lt] = _(G.x[st], G.z[st]);
            if (!z(rt, lt, -20 * r)) continue;
            let ht = xot(s, G.name[st], ot, $(ot));
            if (G.half[st] * c < ht.width * 0.55) continue;
            let pt = G.name[st],
              ut = V.get(pt);
            if (
              ut &&
              ut.some(
                (vt) =>
                  Math.hypot(vt[0] - rt, vt[1] - lt) <
                  Math.max(360 * r, ht.width * 3),
              )
            )
              continue;
            let [it, at] = kN(
                G.tx[st] * f - G.tz[st] * u,
                G.tx[st] * u + G.tz[st] * f,
              ),
              yt = hl(rt, lt, it, at, ht.width / 2 - 2 * r, ht.height * 0.36);
            M1(A, yt) ||
              (A.push(yt),
              bot(n, ht, yt),
              (ut || V.set(pt, []).get(pt)).push([rt, lt]),
              J++);
          }
        };
      X(0, 3);
      let tt = (Q) => {
        if (!((Q === 1 && h < 0.1) || (Q === 2 && h < 0.3)))
          for (let et of zkt) {
            if (et.tier !== Q) continue;
            let [st, ot] = _(et.p[0], et.p[1]);
            z(st, ot, 60) &&
              T(
                Mr(et.n, (Q ? 10.5 : 12) * r, {
                  color: Es.parkLabel,
                  weight: 600,
                  italic: !0,
                  halo: Es.halo,
                  haloW: 2.5 * r,
                }),
                st,
                ot,
              );
          }
      };
      (tt(0), tt(1), B(1), H(1), X(4, 6), tt(2), B(2));
      for (let Q of _kt) {
        let [et, st] = _(Q.p[0], Q.p[1]);
        z(et, st, 60) &&
          h > 0.04 &&
          T(
            Mr(Q.n, 10 * r, {
              color: "#aab3bd",
              weight: 600,
              italic: !0,
              halo: Es.halo,
              haloW: 2.5 * r,
            }),
            et,
            st,
          );
      }
      for (let Q of Ekt) {
        let [et, st] = _(Q.p[0], Q.p[1]);
        z(et, st, 200) &&
          T(
            Mr(Q.n, 14 * r, {
              color: Es.waterLabel,
              weight: 500,
              italic: !0,
              spacing: 0.12,
              halo: "rgba(8,16,24,.8)",
            }),
            et,
            st,
          );
      }
      if ((q2(n, L, F, (this.rot || 0) - I.psi, 12 * r, Es.arrow), this.rot)) {
        let Q = 13 * r,
          et = i - 32 * r,
          st = 96 * r,
          ot = u,
          rt = -f;
        ((n.fillStyle = "rgba(8,10,12,.85)"),
          n.beginPath(),
          n.arc(et, st, Q, 0, 7),
          n.fill(),
          (n.fillStyle = "#ff5a1f"),
          n.beginPath(),
          n.moveTo(et + ot * Q * 1.45, st + rt * Q * 1.45),
          n.lineTo(
            et + ot * Q * 0.95 - rt * Q * 0.4,
            st + rt * Q * 0.95 + ot * Q * 0.4,
          ),
          n.lineTo(
            et + ot * Q * 0.95 + rt * Q * 0.4,
            st + rt * Q * 0.95 - ot * Q * 0.4,
          ),
          n.closePath(),
          n.fill(),
          (n.fillStyle = "#fff"),
          (n.font = `800 ${10 * r}px ${Gr}`),
          (n.textAlign = "center"),
          (n.textBaseline = "middle"),
          n.fillText("N", et, st + 0.5 * r));
      }
      let Z = e.pick;
      if (Z) {
        let [Q, et] = _(Z.x, Z.z);
        (q2(n, Q, et, (this.rot || 0) - Z.psi, 10 * r, "#ffffff"),
          B4(n, Q, et - 12 * r, 12 * r, "#ff5a1f"),
          this.tp.classList.add("on"));
        let st = this.tp.offsetWidth / 2 + 8,
          ot = i / r;
        ((this.tp.style.left = Hh(Q / r, st, Math.max(st, ot - st)) + "px"),
          (this.tp.style.top =
            Math.min(et / r, a / r - this.tp.offsetHeight - 70) + "px"));
      } else this.tp.classList.remove("on");
      let q = [20, 50, 100, 200, 500, 1e3, 2e3, 5e3],
        j = q.filter((Q) => Q * c <= 150 * r).pop() || 20,
        K = 18 * r,
        nt = a - 26 * r;
      ((n.fillStyle = "rgba(8,10,12,.7)"),
        n.fillRect(K - 6 * r, nt - 18 * r, j * c + 12 * r, 26 * r),
        (n.strokeStyle = "#e8e8e4"),
        (n.lineWidth = 2 * r),
        n.beginPath(),
        n.moveTo(K, nt - 5 * r),
        n.lineTo(K, nt),
        n.lineTo(K + j * c, nt),
        n.lineTo(K + j * c, nt - 5 * r),
        n.stroke(),
        (n.fillStyle = "#e8e8e4"),
        (n.font = `600 ${10 * r}px ${Gr}`),
        (n.textAlign = "left"),
        (n.textBaseline = "bottom"),
        n.fillText(
          j >= 1e3 ? `${j / 1e3} km` : `${j} m`,
          K + 2 * r,
          nt - 6 * r,
        ),
        (this.ms = performance.now() - t),
        (this.nLab = J),
        (this.drawnAt = performance.now()));
    }
  };
