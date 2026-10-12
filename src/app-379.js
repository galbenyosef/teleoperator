// app 379 — mode
// Lines 188916-189198 of readable/app.pretty.js (statement-aligned).
lR();
var oet = () => Qf(rR()),
  iN = "sf-drive.units";
function oN() {
  try {
    let i = localStorage.getItem(iN);
    return i === "mph" || i === "kmh" ? i : "auto";
  } catch {
    return "auto";
  }
}
function bE(i) {
  try {
    i === "mph" || i === "kmh"
      ? localStorage.setItem(iN, i)
      : localStorage.removeItem(iN);
  } catch {}
}
function xE(i = oet(), t = oN(), e = globalThis.location?.search || "") {
  let s = new URLSearchParams(e);
  return s.has("kmh")
    ? !1
    : s.has("mph")
      ? !0
      : t === "mph" || t === "kmh"
        ? t === "mph"
        : (i?.manifest.units?.speed || "kmh") === "mph";
}
function aet(i, { go: t = null } = {}) {
  if (!i) return null;
  let e = oet(),
    s =
      t ||
      ((n) => {
        let o = new URL(location.href);
        (o.searchParams.set("city", n), location.replace(o.toString()));
      });
  i.textContent = "";
  for (let n of aR) {
    let o = document.createElement("button");
    ((o.type = "button"),
      (o.className = "city"),
      (o.dataset.city = n.id),
      o.setAttribute("aria-pressed", String(n.id === e?.id)),
      (o.disabled = !n.enabled));
    let a = document.createElement("b");
    if (((a.textContent = n.name), o.appendChild(a), !n.enabled)) {
      let r = document.createElement("small");
      ((r.textContent = "Soon"),
        o.appendChild(r),
        (o.title = n.name + ": coming soon"));
    }
    ((o.onclick = (r) => {
      (r.stopPropagation(),
        !(!n.enabled || n.id === e?.id) &&
          (nG(n.id), s(n.manifest.aliases?.[0] || n.id)));
    }),
      i.appendChild(o));
  }
  return i;
}
var gwt = `
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
  ov = (i) => Math.round(i).toLocaleString("en-US"),
  ret = 500,
  bwt = 1e3,
  vE = class {
    constructor(t = document.body) {
      if (!document.getElementById("skHudCss")) {
        let s = document.createElement("style");
        ((s.id = "skHudCss"),
          (s.textContent = gwt),
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
          ? t.pts >= ret
            ? ((this.mode = "bank"),
              (this.bank = t),
              (this.showT = 3.2),
              (this.xp = e))
            : (this.mode = "idle")
          : t.type === "crash" &&
            t.lost &&
            (t.pts >= bwt
              ? ((this.mode = "lost"), (this.bank = t), (this.showT = 1.6))
              : (this.mode = "idle"));
    }
    update(t, e, s, n = !1) {
      ((this.lastT -= t), (this.showT -= t));
      let o = !1;
      if (this.mode === "chain" && e.n > 0 && (e.n >= 2 || e.pts >= ret)) {
        ((o = !0), this.el.classList.remove("lost"));
        let a = this.last;
        ((this.skEl.innerHTML =
          a && this.lastT > 0
            ? `${a.label}<i>+${ov(a.pts)}</i>`
            : "Skill chain"),
          (this.ptsEl.innerHTML = `${ov(e.pts)}${e.mult > 1 ? `<small>\xD7${e.mult.toFixed(2).replace(/\.?0+$/, "")}</small>` : ""}`),
          (this.barEl.parentNode.style.display = ""),
          (this.barEl.style.transform = `scaleX(${Math.max(0, e.chainT / Nu.chainT).toFixed(3)})`));
        let r = eh(s);
        this.lvEl.innerHTML = `LV ${r.level}<span class="xb"><i style="width:${(r.frac * 100).toFixed(1)}%"></i></span>`;
      } else if (
        (this.mode === "bank" || this.mode === "lost") &&
        this.showT > 0
      ) {
        o = !0;
        let a = this.bank,
          r = this.mode === "lost";
        (this.el.classList.toggle("lost", r),
          (this.skEl.innerHTML = r
            ? "Chain lost"
            : `Chain banked<i>${a.n} skill${a.n === 1 ? "" : "s"}</i>`),
          (this.ptsEl.innerHTML = r
            ? ov(a.pts)
            : `+${ov(a.pts)}<small>XP</small>`),
          (this.barEl.parentNode.style.display = "none"));
        let l = eh(s);
        this.lvEl.innerHTML = `LV ${l.level} \xB7 ${ov(l.into)} / ${ov(l.need)}<span class="xb"><i style="width:${(l.frac * 100).toFixed(1)}%"></i></span>`;
      } else (this.mode !== "chain" || !e.n) && (this.mode = "idle");
      this.el.classList.toggle("on", o && !n);
    }
  };
var xwt = `
#radar { position: fixed; left: calc(var(--safe-l) + clamp(150px, 15vw, 210px) + 12px); bottom: calc(var(--safe-b) + 14px); width: 112px; height: 112px; z-index: 5; pointer-events: none; opacity: 0; transition: opacity .35s; }
#radar.on { opacity: 1; }
body.touch #radar { display: none; }
body.hud-off #radar { visibility: hidden; }
`;
var yE = class {
  constructor(t, e = document.body) {
    if (!document.getElementById("radarCss")) {
      let n = document.createElement("style");
      ((n.id = "radarCss"),
        (n.textContent = xwt),
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
      o = e.pos.z,
      a = -Math.sin(e.psi),
      r = -Math.cos(e.psi),
      l = -r,
      c = a,
      h = this.near;
    h.length = 0;
    for (let b of s) {
      let x = b.x - n,
        v = b.z - o;
      if (Math.abs(x) > 55 * 1.1 || Math.abs(v) > 55 * 1.1) continue;
      let y = Math.hypot(x, v);
      y > 55 * 1.1 ||
        h.push({ s: b, a: x * l + v * c, b: x * a + v * r, d: y });
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
      cet(f, d, d, 0, 6 * m, "#ffffff"));
    let g = Math.floor(this.t * 6) % 2;
    for (let b of h) {
      let x = d + b.a * p,
        v = d - b.b * p,
        y = Math.hypot(x - d, v - d),
        M = d - 6 * m;
      y > M && ((x = d + ((x - d) / y) * M), (v = d + ((v - d) / y) * M));
      let S = b.s,
        w = (S.psi ?? 0) - e.psi;
      if (S.kind === "heli") {
        ((f.strokeStyle = g ? "#ff3b3b" : "#3b8bff"),
          (f.lineWidth = 2 * m),
          f.beginPath(),
          f.arc(x, v, 6 * m, 0, 7),
          f.stroke());
        continue;
      }
      let z =
        S.kind === "cop"
          ? g
            ? "#ff3b3b"
            : "#3b8bff"
          : S.kind === "rival"
            ? "#ff9a2a"
            : S.col || "#3fd6c6";
      cet(f, x, v, w, 5 * m, z);
    }
  }
};
function cet(i, t, e, s, n, o) {
  (i.save(),
    i.translate(t, e),
    i.rotate(-s),
    (i.fillStyle = o),
    (i.shadowColor = "rgba(0,0,0,.6)"),
    (i.shadowBlur = 3),
    i.beginPath(),
    i.moveTo(0, -n * 1.3),
    i.lineTo(n, n),
    i.lineTo(0, n * 0.45),
    i.lineTo(-n, n),
    i.closePath(),
    i.fill(),
    i.restore());
}
