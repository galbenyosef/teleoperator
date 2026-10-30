// app 411 — cards
// Lines 201341-201464 of readable/app.pretty.js (statement-aligned).
var r9 = class {
  constructor(t) {
    if (
      (Object.assign(this, t),
      (this.on = !1),
      (this.i = 0),
      (this.t = 0),
      (this.cards = ZSt(t)),
      !document.getElementById("introCss"))
    ) {
      let s = document.createElement("style");
      ((s.id = "introCss"),
        (s.textContent = JSt),
        document.head.appendChild(s));
    }
    let e = (this.el = document.createElement("div"));
    ((e.id = "intro"),
      e.setAttribute("role", "dialog"),
      e.setAttribute("aria-label", "Getting started"),
      document.body.appendChild(e),
      e.addEventListener("click", (s) => {
        let n = s.target.closest("button");
        n && (n.dataset.a === "next" ? this.next() : this.close());
      }),
      addEventListener(
        "keydown",
        (s) => {
          this.on &&
            (s.code === "Enter" || s.code === "NumpadEnter") &&
            (this.next(), s.preventDefault(), s.stopPropagation());
        },
        !0,
      ));
  }
  start(t = !1) {
    return this.on || (!t && this.done())
      ? !1
      : ((this.on = !0),
        (this.i = 0),
        (this.t = 0),
        this.draw(),
        this.el.classList.add("on"),
        !0);
  }
  next() {
    if (++this.i >= this.cards.length) return this.close();
    ((this.t = 0), this.draw());
  }
  close() {
    this.on && ((this.on = !1), this.el.classList.remove("on"), this.setDone());
  }
  draw() {
    let t = this.cards[this.i],
      e = this.i === this.cards.length - 1;
    ((this.el.innerHTML = `<div class="st">${t.st} \xB7 ${this.i + 1} / ${this.cards.length}</div><h3>${t.h}</h3><p>${t.p}</p>
      <div class="ft"><div class="dots">${this.cards.map((s, n) => `<i class="${n === this.i ? "on" : ""}"></i>`).join("")}</div><button type="button" data-a="skip">Skip</button><button type="button" class="go" data-a="next">${e ? "Let's go" : "Next"}${this.touch ? "" : " \u21B5"}</button></div><div class="bar"><b></b></div>`),
      (this.barEl = this.el.querySelector(".bar b")));
  }
  update(t) {
    this.on &&
      ((this.t += t),
      this.barEl &&
        (this.barEl.style.transform = `scaleX(${Math.min(1, this.t / tot).toFixed(3)})`),
      this.t > tot && this.next());
  }
};
Pn();
var QSt = new Set(["trap", "zone", "drift", "jump", "xpboard", "travel"]),
  Gr = '"Archivo", "Helvetica Neue", system-ui, sans-serif',
  P4 = new Map();
typeof document < "u" &&
  document.fonts?.ready &&
  document.fonts.ready.then(() => {
    P4 = new Map();
  });
function x1(o, t) {
  let e = P4.get(o);
  return (e || (P4.size > 1500 && (P4 = new Map()), P4.set(o, (e = t()))), e);
}
var l9 = (o, t) => {
  let e = document.createElement("canvas");
  return (
    (e.width = Math.max(1, Math.ceil(o))),
    (e.height = Math.max(1, Math.ceil(t))),
    e
  );
};
function Mr(
  o,
  t,
  {
    color: e = "#d9dde2",
    weight: s = 600,
    italic: n = !1,
    spacing: i = 0,
    halo: a = "rgba(8,10,12,.92)",
    haloW: r = 3,
    stretch: l = 0,
  } = {},
) {
  return x1(`t|${o}|${t}|${e}|${s}|${n}|${i}|${a}|${r}|${l}`, () => {
    let c = `${n ? "italic " : ""}${s} ${l ? l + "% " : ""}${t}px ${Gr}`,
      h = l9(1, 1).getContext("2d");
    ((h.font = c), i && (h.letterSpacing = i * t + "px"));
    let f = l9(h.measureText(o).width + r * 2 + 4, t * 1.35 + r * 2),
      u = f.getContext("2d");
    ((u.font = c),
      i && (u.letterSpacing = i * t + "px"),
      (u.textAlign = "center"),
      (u.textBaseline = "middle"));
    let d = f.width / 2 + (i ? (i * t) / 2 : 0),
      p = f.height / 2 + t * 0.05;
    return (
      r &&
        ((u.lineJoin = "round"),
        (u.strokeStyle = a),
        (u.lineWidth = r * 2),
        u.strokeText(o, d, p)),
      (u.fillStyle = e),
      u.fillText(o, d, p),
      f
    );
  });
}
