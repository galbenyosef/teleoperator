// app 405 — math
// Lines 196783-197985 of readable/app.pretty.js (statement-aligned).
var eT = class {
    constructor(t = {}) {
      let {
        v: e,
        real: s = null,
        traffic: n = null,
        mobile: o = !1,
        onOpen: a = null,
        onClose: r = null,
        assets: l = "assets/real/",
      } = t;
      if (!s || !s.data) return new KE(t);
      ((this.v = e),
        (this.traffic = n),
        (this.onOpen = a),
        (this.onClose = r),
        (this.open = !1),
        (this.mobile = o),
        (this.L = s.layout || null),
        (this.P = NMt(s.data)),
        (this.tiles = new tT(this.P, o ? 26 : 48)),
        OMt(this.P, l)
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
        let f = JSON.parse(localStorage.getItem(Yet) || "{}") || {};
        (f.mini === "north" && (this.orient = "north"),
          f.big === "heading" && (this.bigOrient = "heading"));
      } catch {}
      let c = document.createElement("style");
      ((c.textContent = UMt), document.head.appendChild(c));
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
          (BMt(this.P),
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
          Yet,
          JSON.stringify({ mini: this.orient, big: this.bigOrient }),
        );
      } catch {}
      this.big?.orient();
    }
    refresh(t = null) {
      this.P &&
        (est(this.P),
        sst(this.P),
        nst(this.P, t),
        this.tiles.m.clear(),
        (this.selT = 0),
        this.big && this.big.dirty());
    }
    toggle(t = !this.open) {
      t !== this.open &&
        ((this.open = t),
        document.body.classList.toggle("bigmap", t),
        t
          ? ((this.big ||= new kN(this)).show(), this.onOpen?.())
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
        for (let o of e) {
          if (!o) continue;
          let a = +(o.x ?? o.pos?.x),
            r = +(o.z ?? o.pos?.z);
          if (Number.isFinite(a) && Number.isFinite(r)) {
            let l = o.cop ? 3 : o.cable ? 2 : o.bus ? 1 : 0,
              c = o.mapT ? Math.min(1, (performance.now() - o.mapT) / 700) : 1;
            (s.push([a, r, l, c]),
              c < 1 && o.mapOld && s.push([o.mapOld.x, o.mapOld.z, l, 1 - c]));
          }
        }
      let n = t?.heliMark;
      return (n && s.push([n.x, n.z, 4]), s);
    }
    update(t) {
      let e = performance.now(),
        s = this.v,
        n = this.g,
        o = this.cv.width,
        a = o / 2,
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
        x = (B, H) => {
          let O = B - c,
            D = H - h;
          return [a + d * (O * m - D * g), b + d * (O * g + D * m)];
        },
        v = -g,
        y = -m,
        M = (b - a) / d,
        S = c + v * M,
        w = h + y * M,
        z = (a / d) * 1.05;
      (n.setTransform(1, 0, 0, 1, 0, 0),
        (n.fillStyle = zs.water),
        n.fillRect(0, 0, o, o),
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
      let _ = Math.log2(d) - 0.2;
      (this.mz === void 0 || _ > this.mz || _ < this.mz - 1.25) &&
        (this.mz = Math.ceil(_));
      let R = hh(this.mz, CM, AN),
        T = this.tiles.draw(n, R, [S - z, w - z, S + z, w + z]);
      if (T && this.tick < 4) this.tiles.work(200);
      else if (!T && !this.tiles.q.size && this.tick % 30 === 0) {
        let B = S - Math.sin(s.psi) * z * 1.2,
          H = w - Math.cos(s.psi) * z * 1.2,
          O = tT.size(R);
        for (let [D, U] of [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          let G = Math.floor(B / O) + D,
            q = Math.floor(H / O) + U;
          this.tiles.get(R, G, q) || this.tiles.want(R, G, q, 50);
        }
      }
      (this.tiles.schedule(), n.setTransform(1, 0, 0, 1, 0, 0));
      let E = this.cars();
      if (E.length) {
        let B = 1.5 * r;
        for (let [H, O, D, U = 1] of E) {
          let [G, q] = x(H, O);
          if ((G - a) ** 2 + (q - a) ** 2 < a * a) {
            if (D === 4) {
              lst(n, G, q, B);
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
              n.fillRect(G - B, q - B, 2 * B, 2 * B),
              U < 1 && (n.globalAlpha = 1));
          }
        }
      }
      let A = this.overlay;
      if (A) {
        (n.save(),
          n.beginPath(),
          n.arc(a, a, a - 1, 0, 7),
          n.clip(),
          ast(n, A.route, x, 3.4 * r, A.target?.col || "#3fd6c6"));
        for (let B of A.others || []) {
          let [H, O] = x(B.x, B.z);
          (H - a) ** 2 + (O - a) ** 2 < (a * 0.9) ** 2 &&
            LM(n, H, O, 5 * r, B.col, B.glyph);
        }
        if ((n.restore(), A.target)) {
          let B = A.target,
            [H, O] = x(B.x, B.z),
            D = H - a,
            U = O - a,
            G = Math.hypot(D, U),
            q = a * 0.86;
          if (G < q) LM(n, H, O, 7 * r, B.col, B.glyph);
          else {
            let W = D / G,
              V = U / G;
            (n.save(),
              n.translate(a + W * q, a + V * q),
              n.rotate(Math.atan2(V, W) + Math.PI / 2),
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
        let [H, O] = x(B.x, B.z),
          [D, U] = x(B.x - Math.sin(B.psi) * 10, B.z - Math.cos(B.psi) * 10),
          G = H - a,
          q = O - a,
          W = Math.hypot(G, q),
          V = a * 0.86;
        (W > V && ((H = a + (G / W) * V), (O = a + (q / W) * V)),
          rst(n, H, O, 5.5 * r, Math.atan2(U - O, D - H), B.col));
      }
      let C = a * 0.94;
      (--this.selT <= 0 ||
        Math.abs(p - (this.selPsi ?? p)) > 0.12 ||
        Math.hypot(c - (this.selX ?? c), h - (this.selZ ?? h)) >
          this.R * 0.15) &&
        ((this.selT = 6),
        (this.selPsi = p),
        (this.selX = c),
        (this.selZ = h),
        this.select(a, r, d, m, g, x, C, S, w, z, b));
      for (let B of this.sel) {
        let H = B.b;
        if (B.p) {
          let [O, D] = x(B.p[0], B.p[1]);
          ((H = { ...H, cx: O, cy: D }),
            B.t &&
              ([H.ux, H.uy] = SN(
                B.t[0] * m - B.t[1] * g,
                B.t[0] * g + B.t[1] * m,
              )));
        }
        Math.hypot(H.cx - a, H.cy - a) + H.r * 0.9 > C ||
          (B.t
            ? ist(n, B.c, H)
            : n.drawImage(B.c, H.cx - B.c.width / 2, H.cy - B.c.height / 2));
      }
      let P = Np("vig" + o, () => {
        let B = document.createElement("canvas");
        B.width = B.height = o;
        let H = B.getContext("2d"),
          O = H.createRadialGradient(a, a, a * 0.72, a, a, a);
        return (
          O.addColorStop(0, "rgba(0,0,0,0)"),
          O.addColorStop(1, "rgba(0,0,0,.55)"),
          (H.fillStyle = O),
          H.fillRect(0, 0, o, o),
          B
        );
      });
      n.drawImage(P, 0, 0);
      let I = a + g * (a - 9 * r),
        L = a - m * (a - 9 * r),
        F = Np("north" + r, () => {
          let B = document.createElement("canvas"),
            H = 7 * r;
          B.width = B.height = Math.ceil(2 * H + 2);
          let O = B.getContext("2d");
          return (
            (O.fillStyle = "rgba(8,10,12,.85)"),
            O.beginPath(),
            O.arc(B.width / 2, B.width / 2, H, 0, 7),
            O.fill(),
            (O.fillStyle = "#fff"),
            (O.font = `800 ${8.5 * r}px ${kr}`),
            (O.textAlign = "center"),
            (O.textBaseline = "middle"),
            O.fillText("N", B.width / 2, B.width / 2 + 0.5 * r),
            B
          );
        });
      (n.drawImage(F, I - F.width / 2, L - F.height / 2),
        s2(n, a, b, p - s.psi, (this.mobile ? 7 : 8.5) * r, zs.arrow));
      let N = performance.now() - e;
      this.ms = this.ms ? this.ms * 0.95 + N * 0.05 : N;
    }
    select(t, e, s, n, o, a, r, l, c, h, f) {
      let u = this.P,
        d = [],
        p = [O0(t, f, 1, 0, 9 * e, 10 * e)],
        m = this.el.clientWidth < 120,
        g = (_, R = 0.9) => Math.hypot(_.cx - t, _.cy - t) + _.r * R <= r,
        b = (_, R) => {
          let [T, E] = a(_.p[0], _.p[1]),
            A = e2(_.icon, _.col, R),
            C = O0(T, E, 1, 0, A.width * 0.36, A.height * 0.36);
          !g(C) || Dp(p, C) || (p.push(C), d.push({ c: A, b: C, p: _.p }));
        };
      for (let _ of this.pois?.() || [])
        Math.hypot(_.x - l, _.z - c) < h &&
          b({ p: [_.x, _.z], icon: _.kind, col: _.col }, (m ? 6 : 7.5) * e);
      for (let _ of Zet)
        (_.tier === 0 ||
          (_.tier === 1 && this.R < 420) ||
          (_.tier === 2 && this.R < 330)) &&
          Math.hypot(_.p[0] - l, _.p[1] - c) < h &&
          b(_, (m ? 6 : 7.5) * e);
      for (let _ of u.shields) {
        if (Math.abs(_.p[0] - l) > h || Math.abs(_.p[1] - c) > h) continue;
        let [R, T] = a(_.p[0], _.p[1]),
          E = rv(_.id, (m ? 11 : 13) * e),
          A = O0(R, T, 1, 0, E.width / 2 + 3 * e, E.height / 2 + 3 * e);
        !g(A) || Dp(p, A) || (p.push(A), d.push({ c: E, b: A, p: _.p }));
      }
      if (!u.A) {
        this.sel = d;
        return;
      }
      let x = u.A,
        v = ZE(u.AB, l - h, c - h, l + h, c + h, [], ++QE, u.aSeen),
        y = new Map(),
        M = (m ? 8.5 : 9.5) * e;
      for (let _ of v) {
        let [R, T] = a(x.x[_], x.z[_]),
          E = Math.hypot(R - t, T - t);
        if (E > r * 0.8) continue;
        let A = x.name[_],
          C = x.rank[_],
          P = ost(u, A, C, M + (C <= 3 ? 0.5 * e : 0));
        if (x.half[_] * s < P.width * 0.5) continue;
        let I =
            -C * 3 +
            ((t - T) / t) * 0.6 -
            Math.abs(E / t - 0.42) +
            (this.prev.get(A) === _ ? 0.8 : 0),
          L = y.get(A);
        (!L || I > L[0]) && y.set(A, [I, _, P]);
      }
      let S = [...y.values()].sort((_, R) => R[0] - _[0]);
      this.prev.clear();
      let w = 0,
        z = m ? 2 : 8;
      for (let [, _, R] of S) {
        if (w >= z) break;
        let [T, E] = a(x.x[_], x.z[_]),
          [A, C] = SN(x.tx[_] * n - x.tz[_] * o, x.tx[_] * o + x.tz[_] * n),
          P = O0(T, E, A, C, R.width / 2 - 2 * e, R.height * 0.36);
        !g(P) ||
          Dp(p, P) ||
          (p.push(P),
          d.push({ c: R, b: P, p: [x.x[_], x.z[_]], t: [x.tx[_], x.tz[_]] }),
          this.prev.set(x.name[_], _),
          w++);
      }
      if (!m)
        for (let _ of zN) {
          if (_.tier > 2 || Math.hypot(_.p[0] - l, _.p[1] - c) > h * 0.8)
            continue;
          let [R, T] = a(_.p[0], _.p[1]),
            E = ar(_.n, 8.5 * e, {
              color: zs.hood,
              weight: 700,
              spacing: 0.2,
              halo: zs.halo,
              haloW: 2 * e,
            }),
            A = O0(R, T, 1, 0, E.width / 2, E.height / 2);
          if (!(!g(A) || Dp(p, A))) {
            (p.push(A), d.push({ c: E, b: A, p: _.p }));
            break;
          }
        }
      this.sel = d;
    }
  },
  kN = class {
    constructor(t) {
      ((this.ui = t), (this.dpr = Math.min(2, window.devicePixelRatio || 1)));
      let e = (this.el = document.createElement("div"));
      ((e.id = "bigmap"),
        (e.innerHTML = `<canvas></canvas><div class="ttl">San Francisco<small>Map</small></div>
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
        o = null;
      (e.addEventListener("pointerdown", (r) => {
        r.target === this.cv &&
          (this.cv.setPointerCapture(r.pointerId),
          s.set(r.pointerId, [r.clientX, r.clientY]),
          (e.style.cursor = "grabbing"),
          (o =
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
          o &&
            (o.id !== r.pointerId ||
              Math.hypot(r.clientX - o.x, r.clientY - o.y) > 8) &&
            (o = null);
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
            o &&
            o.id === r.pointerId &&
            !s.size &&
            performance.now() - o.t < 700 &&
            t.onPick)
        ) {
          let l = this.cv.getBoundingClientRect(),
            [c, h] = this.toWorld(
              (r.clientX - l.left) * this.dpr,
              (r.clientY - l.top) * this.dpr,
            );
          t.onPick(c, h, hh((26 * this.dpr) / this.s, 40, 160));
        }
        o = null;
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
      let n = hh(this.s * t, this.minS(), 8 * this.dpr),
        [o, a] = this.toWorld(e, s);
      this.s = n;
      let [r, l] = this.unrot(
        (e - this.cv.width / 2) / n,
        (s - this.cv.height / 2) / n,
      );
      ((this.cx = o - r), (this.cz = a - l), this.dirty());
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
        o = this.cv.width,
        a = this.cv.height,
        r = this.dpr,
        l = this.F;
      ((this.cx = hh(this.cx, l[0] - 1500, l[2] + 2600)),
        (this.cz = hh(this.cz, l[1] - 2600, l[3] + 600)));
      let c = this.s,
        h = c / r,
        f = Math.cos(this.rot || 0),
        u = Math.sin(this.rot || 0),
        d = this.cx,
        p = this.cz,
        m = o / 2 / c,
        g = a / 2 / c,
        b = Math.abs(m * f) + Math.abs(g * u),
        x = Math.abs(m * u) + Math.abs(g * f),
        v = d - b,
        y = p - x,
        M = d + b,
        S = p + x;
      (n.setTransform(1, 0, 0, 1, 0, 0),
        (n.fillStyle = zs.water),
        n.fillRect(0, 0, o, a),
        n.setTransform(
          c * f,
          c * u,
          -c * u,
          c * f,
          o / 2 - c * (d * f - p * u),
          a / 2 - c * (d * u + p * f),
        ),
        (n.imageSmoothingEnabled = !0),
        (n.imageSmoothingQuality = "high"));
      let w = hh(Math.ceil(Math.log2(c) - 0.1), CM, AN);
      (e.tiles.tick++,
        (this.missing = e.tiles.draw(n, w, [v, y, M, S], -1e3, 1)),
        this.pump(0),
        n.setTransform(1, 0, 0, 1, 0, 0));
      let z = (Z, et) => {
          let tt = Z - d,
            it = et - p;
          return [o / 2 + c * (tt * f - it * u), a / 2 + c * (tt * u + it * f)];
        },
        _ = (Z, et, tt = 0) => Z > -tt && et > -tt && Z < o + tt && et < a + tt,
        R = [],
        T = (Z, et, tt, it = !1) => {
          let rt = O0(et, tt, 1, 0, Z.width / 2 - 2, Z.height / 2 - 2);
          return !it && Dp(R, rt)
            ? !1
            : (R.push(rt),
              n.drawImage(Z, et - Z.width / 2, tt - Z.height / 2),
              !0);
        },
        E = e.discovery;
      if (E) {
        let Z = E.D.edges,
          et = 30;
        ((n.strokeStyle = "rgba(63,214,198,.75)"),
          (n.lineWidth = Math.max(1.5, Math.min(4, 2.2 * h)) * r),
          (n.lineCap = "round"),
          n.beginPath());
        for (let tt = 0; tt < Z.length; tt++) {
          if (!E.has(tt)) continue;
          let it = Z[tt].P,
            rt = it.length / 3,
            lt = it[0],
            ct = it[1],
            dt = it[(rt - 1) * 3],
            ut = it[(rt - 1) * 3 + 1];
          if (!(
            Math.max(lt, dt) < v - et ||
            Math.min(lt, dt) > M + et ||
            Math.max(ct, ut) < y - et ||
            Math.min(ct, ut) > S + et
          ))
            for (let ot = 0; ot < rt; ot++) {
              let [at, yt] = z(it[ot * 3], it[ot * 3 + 1]);
              ot ? n.lineTo(at, yt) : n.moveTo(at, yt);
            }
        }
        n.stroke();
      }
      let A = e.discLabel?.() || "";
      if (this._dl !== A) {
        this._dl = A;
        let Z = this.el.querySelector(".ttl small");
        Z && (Z.textContent = A ? "Map \xB7 " + A : "Map");
      }
      let C = e.cars();
      if (C.length && h > 0.12) {
        let Z = Math.max(1.5, Math.min(4, 2 * h)) * r;
        for (let [et, tt, it, rt = 1] of C) {
          let [lt, ct] = z(et, tt);
          if (_(lt, ct)) {
            if (it === 4) {
              lst(n, lt, ct, Z);
              continue;
            }
            (rt < 1 && (n.globalAlpha = rt),
              (n.fillStyle =
                it === 3
                  ? "#ff3b3b"
                  : it === 2
                    ? "#e8b25c"
                    : it === 1
                      ? "#8fc4ff"
                      : "rgba(220,226,234,.9)"),
              n.fillRect(lt - Z, ct - Z, 2 * Z, 2 * Z),
              rt < 1 && (n.globalAlpha = 1));
          }
        }
      }
      let P = e.overlay;
      if (P) {
        ast(
          n,
          P.route,
          z,
          Math.max(3, Math.min(7, 5 * h)) * r,
          P.target?.col || "#3fd6c6",
        );
        for (let Z of P.others || []) {
          let [et, tt] = z(Z.x, Z.z);
          _(et, tt, 20) && LM(n, et, tt, 8 * r, Z.col, Z.glyph);
        }
        if (P.target) {
          let Z = P.target,
            [et, tt] = z(Z.x, Z.z);
          if (
            (LM(n, et, tt, 12 * r, Z.col, Z.glyph),
            R.push(O0(et, tt - 15 * r, 1, 0, 12 * r, 16 * r)),
            Z.label)
          ) {
            let it = ar(Z.label, 12 * r, {
              color: "#fff",
              weight: 800,
              halo: "rgba(6,10,14,.9)",
              haloW: 3 * r,
            });
            (n.drawImage(it, et - it.width / 2, tt - 12 * r * 2.6 - it.height),
              R.push(
                O0(
                  et,
                  tt - 12 * r * 2.6 - it.height / 2,
                  1,
                  0,
                  it.width / 2,
                  it.height / 2,
                ),
              ));
          }
        }
      }
      for (let Z of e.players || []) {
        let [et, tt] = z(Z.x, Z.z);
        if (!_(et, tt, 30)) continue;
        let [it, rt] = z(
          Z.x - Math.sin(Z.psi) * 10,
          Z.z - Math.cos(Z.psi) * 10,
        );
        (rst(n, et, tt, 9 * r, Math.atan2(rt - tt, it - et), Z.col),
          R.push(O0(et, tt, 1, 0, 11 * r, 11 * r)));
        let lt = ar("@" + Z.name, 11.5 * r, {
          color: Z.col,
          weight: 800,
          halo: "rgba(6,10,14,.92)",
          haloW: 3 * r,
        });
        (n.drawImage(lt, et - lt.width / 2, tt - 12 * r - lt.height),
          R.push(
            O0(
              et,
              tt - 12 * r - lt.height / 2,
              1,
              0,
              lt.width / 2,
              lt.height / 2,
            ),
          ));
      }
      let I = e.v,
        [L, F] = z(I.pos.x, I.pos.z);
      R.push(O0(L, F, 1, 0, 16 * r, 16 * r));
      let N = hh(7 + h * 5, 7, 11) * r,
        B = (Z) => {
          for (let et of Zet) {
            if (
              et.tier !== Z ||
              (et.tier === 1 && h < 0.1) ||
              (et.tier === 2 && h < 0.3)
            )
              continue;
            let [tt, it] = z(et.p[0], et.p[1]);
            if (!_(tt, it, 40)) continue;
            let rt = e2(et.icon, et.col, N);
            if (T(rt, tt, it) && (h > 0.09 || et.tier === 0)) {
              let lt = ar(et.name, (et.tier ? 10.5 : 11.5) * r, {
                color: "#bfe9f0",
                weight: 700,
                halo: zs.halo,
              });
              for (let ct of [1, -1]) {
                let dt = tt + ct * (N + 3 * r + lt.width / 2),
                  ut = O0(dt, it, 1, 0, lt.width / 2 - 2, lt.height / 2 - 2);
                if (!Dp(R, ut)) {
                  (R.push(ut),
                    n.drawImage(lt, dt - lt.width / 2, it - lt.height / 2));
                  break;
                }
              }
            }
          }
        };
      B(0);
      for (let Z of e.pois?.() || []) {
        let [et, tt] = z(Z.x, Z.z);
        if (!_(et, tt, 30)) continue;
        let it = e2(Z.kind, Z.col, N * 0.95);
        if (T(it, et, tt) && h > 0.09) {
          let rt = ar(
            Z.name + (Z.stars ? " " + "\u2605".repeat(Z.stars) : ""),
            10.5 * r,
            {
              color: Z.stars ? "#ffe08a" : "#e6e0d0",
              weight: 700,
              halo: zs.halo,
            },
          );
          for (let lt of [1, -1]) {
            let ct = et + lt * (N + 3 * r + rt.width / 2),
              dt = O0(ct, tt, 1, 0, rt.width / 2 - 2, rt.height / 2 - 2);
            if (!Dp(R, dt)) {
              (R.push(dt),
                n.drawImage(rt, ct - rt.width / 2, tt - rt.height / 2));
              break;
            }
          }
        }
      }
      let H = (Z) => {
        if (!(h < 0.045 || h > 1.6 || (Z === 1 && h < 0.09)))
          for (let et of zN) {
            if (et.tier !== Z) continue;
            let [tt, it] = z(et.p[0], et.p[1]);
            _(tt, it, 100) &&
              T(
                ar(et.n, (Z ? 9.5 : 10.5) * r, {
                  color: zs.hood,
                  weight: 700,
                  spacing: 0.22,
                  halo: zs.halo,
                  haloW: 2.5 * r,
                }),
                tt,
                it,
              );
          }
      };
      H(0);
      let O = 15 * r,
        D = [];
      for (let Z of s.shields) {
        let [et, tt] = z(Z.p[0], Z.p[1]);
        _(et, tt) &&
          (D.some(
            (it) =>
              it[2] === Z.id && Math.hypot(it[0] - et, it[1] - tt) < 260 * r,
          ) ||
            (T(rv(Z.id, O), et, tt) && D.push([et, tt, Z.id])));
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
        q = s.A
          ? ZE(s.AB, v, y, M, S, [], ++QE, s.aSeen).filter(
              (Z) => G.rank[Z] <= U,
            )
          : [];
      q.sort((Z, et) => G.rank[Z] - G.rank[et] || G.half[et] - G.half[Z]);
      let W = new Map(),
        V = (Z) => (Z <= 1 ? 12 : Z <= 3 ? 11.5 : Z <= 4 ? 11 : 10.5) * r,
        Y = 0,
        $ = (Z, et) => {
          for (let tt of q) {
            let it = G.rank[tt];
            if (it < Z || it > et) continue;
            let [rt, lt] = z(G.x[tt], G.z[tt]);
            if (!_(rt, lt, -20 * r)) continue;
            let ct = ost(s, G.name[tt], it, V(it));
            if (G.half[tt] * c < ct.width * 0.55) continue;
            let dt = G.name[tt],
              ut = W.get(dt);
            if (
              ut &&
              ut.some(
                (vt) =>
                  Math.hypot(vt[0] - rt, vt[1] - lt) <
                  Math.max(360 * r, ct.width * 3),
              )
            )
              continue;
            let [ot, at] = SN(
                G.tx[tt] * f - G.tz[tt] * u,
                G.tx[tt] * u + G.tz[tt] * f,
              ),
              yt = O0(rt, lt, ot, at, ct.width / 2 - 2 * r, ct.height * 0.36);
            Dp(R, yt) ||
              (R.push(yt),
              ist(n, ct, yt),
              (ut || W.set(dt, []).get(dt)).push([rt, lt]),
              Y++);
          }
        };
      $(0, 3);
      let st = (Z) => {
        if (!((Z === 1 && h < 0.1) || (Z === 2 && h < 0.3)))
          for (let et of CMt) {
            if (et.tier !== Z) continue;
            let [tt, it] = z(et.p[0], et.p[1]);
            _(tt, it, 60) &&
              T(
                ar(et.n, (Z ? 10.5 : 12) * r, {
                  color: zs.parkLabel,
                  weight: 600,
                  italic: !0,
                  halo: zs.halo,
                  haloW: 2.5 * r,
                }),
                tt,
                it,
              );
          }
      };
      (st(0), st(1), B(1), H(1), $(4, 6), st(2), B(2));
      for (let Z of LMt) {
        let [et, tt] = z(Z.p[0], Z.p[1]);
        _(et, tt, 60) &&
          h > 0.04 &&
          T(
            ar(Z.n, 10 * r, {
              color: "#aab3bd",
              weight: 600,
              italic: !0,
              halo: zs.halo,
              haloW: 2.5 * r,
            }),
            et,
            tt,
          );
      }
      for (let Z of IMt) {
        let [et, tt] = z(Z.p[0], Z.p[1]);
        _(et, tt, 200) &&
          T(
            ar(Z.n, 14 * r, {
              color: zs.waterLabel,
              weight: 500,
              italic: !0,
              spacing: 0.12,
              halo: "rgba(8,16,24,.8)",
            }),
            et,
            tt,
          );
      }
      if ((s2(n, L, F, (this.rot || 0) - I.psi, 12 * r, zs.arrow), this.rot)) {
        let Z = 13 * r,
          et = o - 32 * r,
          tt = 96 * r,
          it = u,
          rt = -f;
        ((n.fillStyle = "rgba(8,10,12,.85)"),
          n.beginPath(),
          n.arc(et, tt, Z, 0, 7),
          n.fill(),
          (n.fillStyle = "#ff5a1f"),
          n.beginPath(),
          n.moveTo(et + it * Z * 1.45, tt + rt * Z * 1.45),
          n.lineTo(
            et + it * Z * 0.95 - rt * Z * 0.4,
            tt + rt * Z * 0.95 + it * Z * 0.4,
          ),
          n.lineTo(
            et + it * Z * 0.95 + rt * Z * 0.4,
            tt + rt * Z * 0.95 - it * Z * 0.4,
          ),
          n.closePath(),
          n.fill(),
          (n.fillStyle = "#fff"),
          (n.font = `800 ${10 * r}px ${kr}`),
          (n.textAlign = "center"),
          (n.textBaseline = "middle"),
          n.fillText("N", et, tt + 0.5 * r));
      }
      let Q = e.pick;
      if (Q) {
        let [Z, et] = z(Q.x, Q.z);
        (s2(n, Z, et, (this.rot || 0) - Q.psi, 10 * r, "#ffffff"),
          LM(n, Z, et - 12 * r, 12 * r, "#ff5a1f"),
          this.tp.classList.add("on"));
        let tt = this.tp.offsetWidth / 2 + 8,
          it = o / r;
        ((this.tp.style.left = hh(Z / r, tt, Math.max(tt, it - tt)) + "px"),
          (this.tp.style.top =
            Math.min(et / r, a / r - this.tp.offsetHeight - 70) + "px"));
      } else this.tp.classList.remove("on");
      let j = [20, 50, 100, 200, 500, 1e3, 2e3, 5e3],
        X = j.filter((Z) => Z * c <= 150 * r).pop() || 20,
        K = 18 * r,
        nt = a - 26 * r;
      ((n.fillStyle = "rgba(8,10,12,.7)"),
        n.fillRect(K - 6 * r, nt - 18 * r, X * c + 12 * r, 26 * r),
        (n.strokeStyle = "#e8e8e4"),
        (n.lineWidth = 2 * r),
        n.beginPath(),
        n.moveTo(K, nt - 5 * r),
        n.lineTo(K, nt),
        n.lineTo(K + X * c, nt),
        n.lineTo(K + X * c, nt - 5 * r),
        n.stroke(),
        (n.fillStyle = "#e8e8e4"),
        (n.font = `600 ${10 * r}px ${kr}`),
        (n.textAlign = "left"),
        (n.textBaseline = "bottom"),
        n.fillText(
          X >= 1e3 ? `${X / 1e3} km` : `${X} m`,
          K + 2 * r,
          nt - 6 * r,
        ),
        (this.ms = performance.now() - t),
        (this.nLab = Y),
        (this.drawnAt = performance.now()));
    }
  };
