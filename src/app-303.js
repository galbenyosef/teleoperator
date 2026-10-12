// app 303 — key
// Lines 146710-147008 of readable/app.pretty.js (statement-aligned).
var xp = {
    trap: "#ff8a1f",
    zone: "#ffb81f",
    drift: "#c45bff",
    jump: "#ffd21f",
    xp: "#ffb000",
    travel: "#2f8cff",
    race: "#ff5a1f",
    meet: "#ff2fa0",
    taxi: "#3fd6c6",
    cop: "#ff3b3b",
    skill: "#ffd23f",
    level: "#3fd6c6",
    info: "#38c8ff",
  },
  TI = {
    trap: "Speed Trap",
    zone: "Speed Zone",
    drift: "Drift Zone",
    jump: "Danger Sign",
    xp: "XP Board",
    travel: "Fast-Travel Board",
    race: "Road Race",
    meet: "Car Meet",
  },
  xl = {
    trap: [
      { d: "M4.2 16.8a8.2 8.2 0 1 1 15.6 0" },
      { d: "M12 15.6l4.6-5.4" },
      { d: "M12 13.7a1.9 1.9 0 1 1 0 3.8a1.9 1.9 0 1 1 0-3.8z", f: 1 },
      { d: "M6.2 9.4l1.2 1M12 5.6v1.6M17.8 9.4l-1.2 1" },
    ],
    zone: [
      { d: "M5.5 6.5l5.5 5.5-5.5 5.5" },
      { d: "M12.5 6.5l5.5 5.5-5.5 5.5" },
    ],
    drift: [
      { d: "M5 19.5c.6-6.4 5-11 13.6-12" },
      { d: "M15.2 4.4l3.6 3.1-3.6 3" },
      { d: "M9.6 20c.7-3.4 2.8-6 6.6-7.2", o: 0.55 },
    ],
    jump: [
      { d: "M12 2.6l9.4 9.4-9.4 9.4L2.6 12z" },
      { d: "M7.6 15.2c1.4-4.4 7.4-4.4 8.8 0" },
      { d: "M14.2 14.6l2.3.8.6-2.4" },
    ],
    xp: [
      { d: "M6.5 12.5l5.5-5.5 5.5 5.5" },
      { d: "M6.5 17.5l5.5-5.5 5.5 5.5" },
    ],
    travel: [
      {
        d: "M12 21s-6.2-5.6-6.2-10.6a6.2 6.2 0 0 1 12.4 0C18.2 15.4 12 21 12 21z",
      },
      { d: "M9.3 10.4h5.2M12.6 8.3l2.1 2.1-2.1 2.1" },
    ],
    race: [
      { d: "M6 21.2V3.6" },
      { d: "M6 4h11.6l-2.2 4.4 2.2 4.4H6" },
      {
        d: "M8.9 4h2.9v4.4H8.9zM11.8 8.4h2.9v4.4h-2.9zM6 8.4h2.9v4.4H6z",
        f: 1,
      },
    ],
    meet: [
      {
        d: "M4.5 17.5v-4.2l1.9-5.1a2 2 0 0 1 1.9-1.3h7.4a2 2 0 0 1 1.9 1.3l1.9 5.1v4.2z",
      },
      { d: "M4.5 17.5v2M19.5 17.5v2M4.8 13h14.4" },
      { d: "M7.6 15.2h1.6M14.8 15.2h1.6" },
    ],
    cop: [
      {
        d: "M12 3.2l2.5 5.3 5.7.7-4.2 4 1.1 5.7L12 16.1 6.9 18.9 8 13.2l-4.2-4 5.7-.7z",
      },
    ],
    skill: [
      {
        d: "M12 3v5M12 16v5M3 12h5M16 12h5M5.6 5.6l3.2 3.2M15.2 15.2l3.2 3.2M18.4 5.6l-3.2 3.2M8.8 15.2l-3.2 3.2",
      },
    ],
    level: [
      { d: "M12 3.5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 1 1 0-17z" },
      { d: "M8 13.6l4-4 4 4" },
    ],
    taxi: [
      { d: "M12 4a3.3 3.3 0 1 1 0 6.6A3.3 3.3 0 0 1 12 4z" },
      { d: "M5.5 20.5c.8-4 3.4-6.2 6.5-6.2s5.7 2.2 6.5 6.2" },
    ],
    rewind: [{ d: "M11 6.5L4.5 12l6.5 5.5zM19.5 6.5L13 12l6.5 5.5z", f: 1 }],
    info: [
      { d: "M12 3.5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 1 1 0-17z" },
      { d: "M12 11v5.5M12 7.6v.2" },
    ],
  };
xl.flag = xl.race;
xl.xpboard = xl.xp;
xl.star = xl.cop;
function R_(i, t = "ds-glyph") {
  let e = xl[i] || xl.info;
  return `<svg class="${t}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e.map((s) => `<path d="${s.d}"${s.f ? ' fill="currentColor" stroke="none"' : ""}${s.o ? ` opacity="${s.o}"` : ""}/>`).join("")}</svg>`;
}
function wr(i, t = "") {
  return `<span class="ds-icon ${t}" style="--c:${xp[i] || xp.info}">${R_(i, "")}</span>`;
}
function Rm(i, t, e, s, n, o = "#fff", a = 2) {
  let r = xl[t] || xl.info;
  (i.save(),
    i.translate(e - n / 2, s - n / 2),
    i.scale(n / 24, n / 24),
    (i.strokeStyle = i.fillStyle = o),
    (i.lineWidth = a),
    (i.lineCap = "round"),
    (i.lineJoin = "round"));
  for (let l of r) {
    let c = new Path2D(l.d);
    ((i.globalAlpha = l.o ?? 1), l.f ? i.fill(c) : i.stroke(c));
  }
  i.restore();
}
var yr = (i) =>
  String(i ?? "").replace(
    /[&<>"']/g,
    (t) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        t
      ],
  );
function ivt(i, t = "", e = "") {
  let s = document.createElement(i);
  return (t && (s.className = t), e && (s.innerHTML = e), s);
}
function Ex(i, t = 3, e = "") {
  let s = "";
  for (let n = 0; n < t; n++) s += `<i class="${n < i ? "on" : ""}"></i>`;
  return `<span class="ds-stars ${e}">${s}</span>`;
}
function Zc(i, t) {
  if (typeof document > "u" || document.getElementById(i)) return;
  let e = document.createElement("style");
  ((e.id = i), (e.textContent = t), document.head.appendChild(e));
}
var ovt = {
  tc: "dsTC",
  lane: "dsLane",
  bc: "dsBC",
  tl: "dsTL",
  tr: "dsTR",
  bl: "dsBL",
  br: "dsBR",
};
function AI(i) {
  if (typeof document.getElementById != "function") return document.body;
  let t = ovt[i] || i,
    e = document.getElementById(t);
  return (
    e ||
      ((e = document.createElement("div")),
      (e.id = t),
      (e.className = "ds-zone"),
      document.body.appendChild(e)),
    e
  );
}
function Jo(i, t, e = 0) {
  return (t.style && (t.style.order = e), AI(i).appendChild(t), t);
}
var avt = 0.9,
  rvt = 0.14,
  T_ = class {
    constructor(t, { show: e, hide: s, max: n = 4 } = {}) {
      ((this.name = t),
        (this.q = []),
        (this.cur = null),
        (this.max = n),
        (this.show = e),
        (this.hide = s),
        (this.t = null),
        (this.n = 0));
    }
    now() {
      return performance.now() / 1e3;
    }
    push(t) {
      t = { pri: 1, dur: 2.2, min: avt, ...t, seq: this.n++ };
      let e = this.cur;
      if (e && t.key && e.key === t.key) return (this._show(t), t);
      if ((t.key && (this.q = this.q.filter((s) => s.key !== t.key)), !e))
        return (this._show(t), t);
      if (t.pri > e.pri && !e.hold) return (this._yield(!0), this._show(t), t);
      for (
        this.q.push(t), this.q.sort((s, n) => n.pri - s.pri || s.seq - n.seq);
        this.q.length > this.max;
      )
        this.q.splice(
          this.q.findLastIndex(
            (s) => s.pri === Math.min(...this.q.map((n) => n.pri)),
          ),
          1,
        );
      return (
        this._arm(Math.max(0, e.t0 + (e.hold ? e.dur : e.min) - this.now())),
        t
      );
    }
    _show(t) {
      (clearTimeout(this.t),
        (this.cur = t),
        (t.t0 = this.now()),
        this.show(t),
        this._arm(t.dur));
    }
    _arm(t) {
      (clearTimeout(this.t),
        (this.t = setTimeout(() => this._next(), t * 1e3)));
    }
    _yield(t) {
      let e = this.cur;
      if (!e) return;
      let s = e.dur - (this.now() - e.t0);
      t &&
        s > 0.6 &&
        e.pri >= 2 &&
        !e.once &&
        this.q.unshift({ ...e, dur: Math.max(s, e.min), seq: -1 });
    }
    _next() {
      let t = this.cur;
      ((this.cur = null), t && this.hide(t));
      let e = this.q.shift();
      e && (this.t = setTimeout(() => this._show(e), t ? rvt * 1e3 : 0));
    }
    drop(t) {
      ((this.q = t ? this.q.filter((e) => e.key !== t) : []),
        this.cur &&
          (!t || this.cur.key === t) &&
          (clearTimeout(this.t), this._next()));
    }
    get busy() {
      return !!this.cur || this.q.length > 0;
    }
  },
  A_ = class {
    constructor() {
      ((this.toastEl = null),
        (this.ready = !1),
        (this.toast = new T_("toast", {
          show: (t) => {
            let e = this._toastEl();
            ((e.innerHTML = `${yr(t.title)}${t.sub ? `<small>${yr(t.sub)}</small>` : ""}`),
              e.style.setProperty("--c", t.col || ""),
              e.classList.toggle("music", t.cls === "music"),
              e.classList.add("on"),
              t.onShow?.(e));
          },
          hide: () => this._toastEl().classList.remove("on"),
        })),
        (this.card = new T_("card", {
          max: 6,
          show: (t) => {
            (t.el.classList.add("on"), t.onShow?.(t.el));
          },
          hide: (t) => {
            (t.el.classList.remove("on"), t.onHide?.(t.el));
          },
        })));
    }
    _toastEl() {
      if (this.toastEl) return this.toastEl;
      let t = document.getElementById("toast");
      return (
        t || ((t = document.createElement("div")), (t.id = "toast")),
        (t.className = "ds-toast ds-pop"),
        t.setAttribute("aria-live", "polite"),
        Jo("lane", t, 0),
        (this.toastEl = t)
      );
    }
    say(t, e = "", s = {}) {
      return (
        typeof s == "string" && (s = { cls: s, key: s || void 0 }),
        this.toast.push({
          title: t,
          sub: e,
          key: s.key ?? s.cls ?? void 0,
          ...s,
        })
      );
    }
    show(t, e = {}) {
      let s = AI("lane");
      return (
        s.contains && !s.contains(t) && Jo("lane", t, 1),
        t.classList.add("ds-pop"),
        this.card.push({ el: t, ...e })
      );
    }
  },
  Cu = new A_();
