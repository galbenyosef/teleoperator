// app 396 — mode
// Lines 196739-197021 of readable/app.pretty.js (statement-aligned).
O7();
var bit = () => Fu(F7()),
  oN = "sf-drive.units";
function aN() {
  try {
    let o = localStorage.getItem(oN);
    return o === "mph" || o === "kmh" ? o : "auto";
  } catch {
    return "auto";
  }
}
function BT(o) {
  try {
    o === "mph" || o === "kmh"
      ? localStorage.setItem(oN, o)
      : localStorage.removeItem(oN);
  } catch {}
}
function NT(o = bit(), t = aN(), e = globalThis.location?.search || "") {
  let s = new URLSearchParams(e);
  return s.has("kmh")
    ? !1
    : s.has("mph")
      ? !0
      : t === "mph" || t === "kmh"
        ? t === "mph"
        : (o?.manifest.units?.speed || "kmh") === "mph";
}
function xit(o, { go: t = null } = {}) {
  if (!o) return null;
  let e = bit(),
    s =
      t ||
      ((n) => {
        let i = new URL(location.href);
        (i.searchParams.set("city", n), location.replace(i.toString()));
      });
  o.textContent = "";
  for (let n of I7) {
    let i = document.createElement("button");
    ((i.type = "button"),
      (i.className = "city"),
      (i.dataset.city = n.id),
      i.setAttribute("aria-pressed", String(n.id === e?.id)),
      (i.disabled = !n.enabled));
    let a = document.createElement("b");
    if (((a.textContent = n.name), i.appendChild(a), !n.enabled)) {
      let r = document.createElement("small");
      ((r.textContent = "Soon"),
        i.appendChild(r),
        (i.title = n.name + ": coming soon"));
    }
    ((i.onclick = (r) => {
      (r.stopPropagation(),
        !(!n.enabled || n.id === e?.id) &&
          (oW(n.id), s(n.manifest.aliases?.[0] || n.id)));
    }),
      o.appendChild(i));
  }
  return o;
}
var oSt = `
#skHud { position: fixed; left: var(--safe-l); top: max(30%, calc(var(--safe-t) + 120px)); z-index: 6; pointer-events: none; font-family: var(--font); color: var(--ink); min-width: 200px; padding: 10px 14px 11px 14px; border-radius: var(--r-md);
  background: linear-gradient(90deg, var(--glass) 55%, transparent); opacity: 0; transform: translateX(-8px); transition: opacity var(--t-med) var(--ease-out), transform var(--t-med) var(--ease-out); }
#skHud.on { opacity: 1; transform: none; }
#skHud::before { content: ""; position: absolute; left: 0; top: 10px; bottom: 10px; width: 3px; border-radius: 2px; background: var(--c-skill); }
#skHud .sk { font: var(--fw-black) var(--fs-xs) var(--font); letter-spacing: var(--ls-eyebrow); text-transform: uppercase; color: var(--c-skill); min-height: 14px; white-space: nowrap; }
#skHud .sk i { font-style: normal; color: var(--ink); margin-left: 8px; letter-spacing: .06em; }
#skHud .pts { font: var(--fw-black) var(--fs-2xl)/1.05 var(--font); font-stretch: 118%; font-variant-numeric: tabular-nums; margin-top: 3px; text-shadow: var(--sh-text); }
#skHud .pts small { font-size: .5em; color: var(--brand-2); margin-left: 8px; }
#skHud .bar { height: 3px; border-radius: 2px; background: var(--fill-2); margin-top: 7px; overflow: hidden; width: 180px; }
#skHud .bar i { display: block; height: 100%; background: var(--c-skill); transform-origin: left; }
#skHud .lv { font: var(--fw-bold) var(--fs-xs) var(--font-mono); letter-spacing: .14em; margin-top: 8px; color: var(--ink-2); }
#skHud .lv .xb { display: block; height: 3px; width: 180px; background: var(--fill-2); margin-top: 4px; border-radius: 2px; overflow: hidden; }
#skHud .lv .xb i { display: block; height: 100%; background: var(--c-level); transition: width .6s; }
#skHud.lost::before { background: var(--bad); } #skHud.lost .sk { color: var(--bad); }
#skHud.lost .pts { color: var(--bad); text-decoration: line-through; }
body.touch #skHud { top: calc(var(--st) + 110px); min-width: 150px; padding: 7px 10px 8px 12px; } body.touch #skHud .pts { font-size: var(--fs-xl); } body.touch #skHud .bar, body.touch #skHud .lv .xb { width: 130px; }
@media (orientation: portrait) { body.touch #skHud { top: calc(var(--st) + 236px); } }
`,
  Jv = (o) => Math.round(o).toLocaleString("en-US"),
  vit = 500,
  aSt = 1e3,
  HT = class {
    constructor(t = document.body) {
      if (!document.getElementById("skHudCss")) {
        let s = document.createElement("style");
        ((s.id = "skHudCss"),
          (s.textContent = oSt),
          document.head.appendChild(s));
      }
      let e = (this.el = document.createElement("div"));
      ((e.id = "skHud"),
        e.setAttribute("aria-live", "polite"),
        (e.innerHTML =
          '<div class="sk"></div><div class="pts"></div><div class="bar"><i></i></div><div class="lv"></div>'),
        t.appendChild(e),
        ([this.skEl, this.ptsEl, this.barEl, this.lvEl] = [
          e.children[0],
          e.children[1],
          e.children[2].firstChild,
          e.children[3],
        ]),
        (this.showT = 0),
        (this.last = null),
        (this.lastT = 0),
        (this.mode = "idle"));
    }
    event(t, e) {
      t.type === "skill"
        ? ((this.last = t),
          (this.lastT = 1.6),
          (this.mode = "chain"),
          (this.showT = 0))
        : t.type === "bank"
          ? t.pts >= vit
            ? ((this.mode = "bank"),
              (this.bank = t),
              (this.showT = 3.2),
              (this.xp = e))
            : (this.mode = "idle")
          : t.type === "crash" &&
            t.lost &&
            (t.pts >= aSt
              ? ((this.mode = "lost"), (this.bank = t), (this.showT = 1.6))
              : (this.mode = "idle"));
    }
    update(t, e, s, n = !1) {
      ((this.lastT -= t), (this.showT -= t));
      let i = !1;
      if (this.mode === "chain" && e.n > 0 && (e.n >= 2 || e.pts >= vit)) {
        ((i = !0), this.el.classList.remove("lost"));
        let a = this.last;
        ((this.skEl.innerHTML =
          a && this.lastT > 0
            ? `${a.label}<i>+${Jv(a.pts)}</i>`
            : "Skill chain"),
          (this.ptsEl.innerHTML = `${Jv(e.pts)}${e.mult > 1 ? `<small>\xD7${e.mult.toFixed(2).replace(/\.?0+$/, "")}</small>` : ""}`),
          (this.barEl.parentNode.style.display = ""),
          (this.barEl.style.transform = `scaleX(${Math.max(0, e.chainT / bd.chainT).toFixed(3)})`));
        let r = Ah(s);
        this.lvEl.innerHTML = `LV ${r.level}<span class="xb"><i style="width:${(r.frac * 100).toFixed(1)}%"></i></span>`;
      } else if (
        (this.mode === "bank" || this.mode === "lost") &&
        this.showT > 0
      ) {
        i = !0;
        let a = this.bank,
          r = this.mode === "lost";
        (this.el.classList.toggle("lost", r),
          (this.skEl.innerHTML = r
            ? "Chain lost"
            : `Chain banked<i>${a.n} skill${a.n === 1 ? "" : "s"}</i>`),
          (this.ptsEl.innerHTML = r
            ? Jv(a.pts)
            : `+${Jv(a.pts)}<small>XP</small>`),
          (this.barEl.parentNode.style.display = "none"));
        let l = Ah(s);
        this.lvEl.innerHTML = `LV ${l.level} \xB7 ${Jv(l.into)} / ${Jv(l.need)}<span class="xb"><i style="width:${(l.frac * 100).toFixed(1)}%"></i></span>`;
      } else (this.mode !== "chain" || !e.n) && (this.mode = "idle");
      this.el.classList.toggle("on", i && !n);
    }
  };
var rSt = `
#radar { position: fixed; left: calc(var(--safe-l) + clamp(150px, 15vw, 210px) + 12px); bottom: calc(var(--safe-b) + 14px); width: 112px; height: 112px; z-index: 5; pointer-events: none; opacity: 0; transition: opacity .35s; }
#radar.on { opacity: 1; }
body.touch #radar { display: none; }
body.hud-off #radar { visibility: hidden; }
`;
var DT = class {
  constructor(t, e = document.body) {
    if (!document.getElementById("radarCss")) {
      let n = document.createElement("style");
      ((n.id = "radarCss"),
        (n.textContent = rSt),
        document.head.appendChild(n));
    }
    ((this.sources = t),
      (this.cv = document.createElement("canvas")),
      (this.cv.id = "radar"),
      e.appendChild(this.cv));
    let s = (this.dpr = Math.min(2, globalThis.devicePixelRatio || 1));
    ((this.cv.width = this.cv.height = Math.round(112 * s)),
      (this.g = this.cv.getContext("2d")),
      (this.t = 0),
      (this.k = 0),
      (this.n = 0),
      (this.near = []));
  }
  update(t, e) {
    this.t += t;
    let s = this.sources() || [],
      n = e.pos.x,
      i = e.pos.z,
      a = -Math.sin(e.psi),
      r = -Math.cos(e.psi),
      l = -r,
      c = a,
      h = this.near;
    h.length = 0;
    for (let b of s) {
      let v = b.x - n,
        x = b.z - i;
      if (Math.abs(v) > 55 * 1.1 || Math.abs(x) > 55 * 1.1) continue;
      let y = Math.hypot(v, x);
      y > 55 * 1.1 ||
        h.push({ s: b, a: v * l + x * c, b: v * a + x * r, d: y });
    }
    if (
      ((this.n = h.length),
      (this.k +=
        ((h.some((b) => b.d < 55) ? 1 : 0) - this.k) * Math.min(1, t * 4)),
      this.cv.classList.toggle("on", this.k > 0.5),
      this.k < 0.02)
    )
      return;
    let f = this.g,
      u = this.cv.width,
      d = u / 2,
      p = (d - 6 * this.dpr) / 55,
      m = this.dpr;
    (f.clearRect(0, 0, u, u),
      (f.fillStyle = "rgba(9,11,15,.66)"),
      f.beginPath(),
      f.arc(d, d, d - 1, 0, 7),
      f.fill(),
      (f.strokeStyle = "rgba(255,255,255,.22)"),
      (f.lineWidth = m));
    for (let b of [0.5, 1])
      (f.beginPath(), f.arc(d, d, (d - 6 * m) * b, 0, 7), f.stroke());
    (f.beginPath(),
      f.moveTo(d, 6 * m),
      f.lineTo(d, u - 6 * m),
      f.moveTo(6 * m, d),
      f.lineTo(u - 6 * m, d),
      (f.strokeStyle = "rgba(255,255,255,.08)"),
      f.stroke(),
      yit(f, d, d, 0, 6 * m, "#ffffff"));
    let g = Math.floor(this.t * 6) % 2;
    for (let b of h) {
      let v = d + b.a * p,
        x = d - b.b * p,
        y = Math.hypot(v - d, x - d),
        M = d - 6 * m;
      y > M && ((v = d + ((v - d) / y) * M), (x = d + ((x - d) / y) * M));
      let S = b.s,
        w = (S.psi ?? 0) - e.psi;
      if (S.kind === "heli") {
        ((f.strokeStyle = g ? "#ff3b3b" : "#3b8bff"),
          (f.lineWidth = 2 * m),
          f.beginPath(),
          f.arc(v, x, 6 * m, 0, 7),
          f.stroke());
        continue;
      }
      let _ =
        S.kind === "cop"
          ? g
            ? "#ff3b3b"
            : "#3b8bff"
          : S.kind === "rival"
            ? "#ff9a2a"
            : S.col || "#3fd6c6";
      yit(f, v, x, w, 5 * m, _);
    }
  }
};
function yit(o, t, e, s, n, i) {
  (o.save(),
    o.translate(t, e),
    o.rotate(-s),
    (o.fillStyle = i),
    (o.shadowColor = "rgba(0,0,0,.6)"),
    (o.shadowBlur = 3),
    o.beginPath(),
    o.moveTo(0, -n * 1.3),
    o.lineTo(n, n),
    o.lineTo(0, n * 0.45),
    o.lineTo(-n, n),
    o.closePath(),
    o.fill(),
    o.restore());
}
