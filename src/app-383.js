// app 383 — fov
// Lines 189903-190201 of readable/app.pretty.js (statement-aligned).
var met = {
    none: "",
    vivid: "saturate(1.45) contrast(1.08)",
    noir: "grayscale(1) contrast(1.35) brightness(.95)",
    warm: "sepia(.35) saturate(1.25) hue-rotate(-8deg)",
    cool: "saturate(1.1) hue-rotate(12deg) brightness(1.02)",
    film: "contrast(1.12) saturate(.85) sepia(.18)",
  },
  EE = (i, t, e) => (i < t ? t : i > e ? e : i),
  TE = class {
    constructor(t) {
      if (
        (Object.assign(this, t),
        (this.on = !1),
        (this.s = { fov: 50, exp: 0, blur: 0, vig: !1, filter: "none" }),
        (this.keys = new Set()),
        (this.saved = 0),
        !document.getElementById("phCss"))
      ) {
        let o = document.createElement("style");
        ((o.id = "phCss"), (o.textContent = Awt), document.head.appendChild(o));
      }
      let e = (this.panel = document.createElement("div"));
      ((e.id = "phPanel"),
        e.setAttribute("role", "dialog"),
        e.setAttribute("aria-label", "Photo mode"),
        (e.innerHTML = `<h3>Photo mode</h3>
      <label>Field of view <b data-o="fov"></b><input type="range" min="15" max="100" step="1" data-s="fov"></label>
      <label>Exposure <b data-o="exp"></b><input type="range" min="-1" max="1" step="0.05" data-s="exp"></label>
      <label>Depth blur <b data-o="blur"></b><input type="range" min="0" max="12" step="0.5" data-s="blur"></label>
      <label>Filter</label><div class="fl">${Object.keys(met)
        .map(
          (o) =>
            `<button type="button" data-f="${o}">${o[0].toUpperCase() + o.slice(1)}</button>`,
        )
        .join("")}</div>
      <div class="fl" style="margin-top:8px"><button type="button" data-vig>Vignette</button></div>
      <div class="bt"><button type="button" class="go" data-act="save">Save PNG</button><button type="button" data-act="exit">Exit</button></div>
      <small>Drag: look \xB7 W A S D / arrows: move \xB7 Q / E: down / up \xB7 Shift: faster \xB7 wheel: zoom \xB7 Esc: back to the drive \xB7 within 30 m of the car</small>`),
        document.body.appendChild(e),
        (this.blurEl = document.createElement("div")),
        (this.blurEl.id = "phBlur"),
        (this.vigEl = document.createElement("div")),
        (this.vigEl.id = "phVig"),
        document.body.append(this.blurEl, this.vigEl),
        e.addEventListener("input", (o) => {
          let a = o.target.dataset.s;
          a && ((this.s[a] = +o.target.value), this.apply());
        }),
        e.addEventListener("click", (o) => {
          let a = o.target.closest("button");
          a &&
            (a.dataset.f
              ? (this.s.filter = a.dataset.f)
              : a.dataset.vig !== void 0
                ? (this.s.vig = !this.s.vig)
                : a.dataset.act === "save"
                  ? this.save()
                  : a.dataset.act === "exit" && this.close(),
            this.apply());
        }),
        addEventListener(
          "keydown",
          (o) => {
            this.on &&
              (o.target?.matches?.("input") ||
                (o.code === "Escape" || o.code === "KeyF"
                  ? this.close()
                  : this.keys.add(o.code),
                o.preventDefault(),
                o.stopPropagation()));
          },
          !0,
        ),
        addEventListener(
          "keyup",
          (o) => {
            this.on && (this.keys.delete(o.code), o.stopPropagation());
          },
          !0,
        ));
      let s = this.view,
        n = null;
      (s.addEventListener(
        "pointerdown",
        (o) => {
          this.on &&
            ((n = { x: o.clientX, y: o.clientY }),
            s.setPointerCapture?.(o.pointerId),
            o.stopPropagation());
        },
        !0,
      ),
        s.addEventListener(
          "pointermove",
          (o) => {
            !this.on ||
              !n ||
              ((this.yaw -= (o.clientX - n.x) * 0.004),
              (this.pitch = EE(
                this.pitch - (o.clientY - n.y) * 0.004,
                -1.4,
                1.4,
              )),
              (n = { x: o.clientX, y: o.clientY }),
              o.stopPropagation());
          },
          !0,
        ),
        s.addEventListener(
          "pointerup",
          () => {
            n = null;
          },
          !0,
        ),
        s.addEventListener(
          "wheel",
          (o) => {
            this.on &&
              ((this.s.fov = EE(this.s.fov + Math.sign(o.deltaY) * 3, 15, 100)),
              this.apply(),
              o.preventDefault());
          },
          { passive: !1 },
        ));
    }
    open() {
      if (this.on) return;
      let t = this.camera;
      ((this.on = !0),
        this.keys.clear(),
        (this.back = {
          p: t.position.clone(),
          q: t.quaternion.clone(),
          fov: t.fov,
        }));
      let e = t.getWorldDirection(t.position.clone());
      ((this.yaw = Math.atan2(-e.x, -e.z)),
        (this.pitch = Math.asin(EE(e.y, -1, 1))),
        (this.s.fov = Math.round(t.fov)),
        (this.pos = t.position.clone()),
        (this.c0 = { x: this.v.pos.x, y: this.v.pos.y, z: this.v.pos.z }),
        document.body.classList.add("photo"),
        this.apply(),
        this.onOpen?.());
    }
    close() {
      if (!this.on) return;
      this.on = !1;
      let t = this.camera;
      (t.position.copy(this.back.p),
        t.quaternion.copy(this.back.q),
        (t.fov = this.back.fov),
        t.updateProjectionMatrix(),
        document.body.classList.remove("photo"),
        (this.canvas.style.filter = ""),
        this.onClose?.());
    }
    filterStr() {
      return `${met[this.s.filter] || ""} brightness(${(1 + this.s.exp * 0.6).toFixed(2)})`.trim();
    }
    apply() {
      for (let e of this.panel.querySelectorAll("input[data-s]")) {
        let s = e.dataset.s;
        document.activeElement !== e && (e.value = this.s[s]);
        let n = this.panel.querySelector(`[data-o="${s}"]`);
        n &&
          (n.textContent =
            s === "exp"
              ? (this.s.exp > 0 ? "+" : "") + this.s.exp.toFixed(2)
              : s === "fov"
                ? this.s.fov + "\xB0"
                : this.s.blur
                  ? this.s.blur.toFixed(1)
                  : "off");
      }
      for (let e of this.panel.querySelectorAll("[data-f]"))
        e.setAttribute("aria-pressed", String(e.dataset.f === this.s.filter));
      if (
        (this.panel
          .querySelector("[data-vig]")
          .setAttribute("aria-pressed", String(this.s.vig)),
        !this.on)
      )
        return;
      this.canvas.style.filter = this.filterStr();
      let t = this.blurEl;
      if ((t.classList.toggle("on", this.s.blur > 0), this.s.blur > 0)) {
        let e =
          "radial-gradient(ellipse 60% 55% at 50% 52%, transparent 35%, #000 85%)";
        ((t.style.backdropFilter = t.style.webkitBackdropFilter =
          `blur(${this.s.blur}px)`),
          (t.style.maskImage = t.style.webkitMaskImage = e));
      }
      this.vigEl.classList.toggle("on", this.s.vig);
    }
    frame(t) {
      let e = this.camera,
        s = this.keys,
        n = (s.has("ShiftLeft") || s.has("ShiftRight") ? 14 : 5) * t,
        o = -Math.sin(this.yaw),
        a = -Math.cos(this.yaw),
        r = -a,
        l = o,
        c =
          (+(s.has("KeyW") || s.has("ArrowUp")) -
            +(s.has("KeyS") || s.has("ArrowDown"))) *
          n,
        h =
          (+(s.has("KeyD") || s.has("ArrowRight")) -
            +(s.has("KeyA") || s.has("ArrowLeft"))) *
          n,
        f = (+s.has("KeyE") - +s.has("KeyQ")) * n,
        u = this.pos;
      ((u.x += o * c + r * h), (u.z += a * c + l * h), (u.y += f));
      let d = u.x - this.c0.x,
        p = u.z - this.c0.z,
        m = Math.hypot(d, p);
      m > 30 &&
        ((u.x = this.c0.x + (d / m) * 30), (u.z = this.c0.z + (p / m) * 30));
      let g = this.groundY ? this.groundY(u.x, u.z, u.y) : -1e9;
      ((u.y = EE(
        u.y,
        (Number.isFinite(g) ? g : this.c0.y - 5) + 0.25,
        this.c0.y + 25,
      )),
        e.position.copy(u),
        e.rotation.set(this.pitch, this.yaw, 0, "YXZ"),
        Math.abs(e.fov - this.s.fov) > 0.01 &&
          ((e.fov = this.s.fov), e.updateProjectionMatrix()),
        e.updateMatrixWorld());
    }
    async save() {
      let t = this.capture(),
        e = new Image();
      await new Promise((c, h) => {
        ((e.onload = c), (e.onerror = h), (e.src = t));
      });
      let s = e.width,
        n = e.height,
        o = document.createElement("canvas");
      ((o.width = s), (o.height = n));
      let a = o.getContext("2d");
      if (
        ((a.filter = this.filterStr() || "none"),
        a.drawImage(e, 0, 0),
        this.s.blur > 0)
      ) {
        let c = document.createElement("canvas");
        ((c.width = s), (c.height = n));
        let h = c.getContext("2d"),
          f = s / innerWidth;
        ((h.filter = `${this.filterStr() || ""} blur(${(this.s.blur * f).toFixed(1)}px)`),
          h.drawImage(e, 0, 0),
          (h.filter = "none"));
        let u = h.createRadialGradient(
          s / 2,
          n * 0.52,
          Math.min(s, n) * 0.2,
          s / 2,
          n * 0.52,
          Math.max(s, n) * 0.55,
        );
        (u.addColorStop(0, "rgba(0,0,0,0)"),
          u.addColorStop(1, "rgba(0,0,0,1)"),
          (h.globalCompositeOperation = "destination-in"),
          (h.fillStyle = u),
          h.fillRect(0, 0, s, n),
          (a.filter = "none"),
          a.drawImage(c, 0, 0));
      }
      if (((a.filter = "none"), this.s.vig)) {
        let c = a.createRadialGradient(
          s / 2,
          n / 2,
          Math.min(s, n) * 0.35,
          s / 2,
          n / 2,
          Math.max(s, n) * 0.62,
        );
        (c.addColorStop(0, "rgba(0,0,0,0)"),
          c.addColorStop(1, "rgba(0,0,0,.55)"),
          (a.fillStyle = c),
          a.fillRect(0, 0, s, n));
      }
      let r = o.toDataURL("image/png");
      ((this.last = r), this.saved++);
      let l = document.createElement("a");
      return (
        (l.href = r),
        (l.download = `san-francisco-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}.png`),
        document.body.appendChild(l),
        l.click(),
        l.remove(),
        r
      );
    }
  };
