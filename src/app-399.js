// app 399 — calm
// Lines 197616-197727 of readable/app.pretty.js (statement-aligned).
var gSt = `
#wheelspin { flex-direction: column; align-items: center; gap: 8px; padding: 12px 16px 12px; border-radius: var(--r-lg); --c: var(--c-meet); }
#wheelspin .lv { display: flex; align-items: center; gap: 10px; }
#wheelspin .lv b { font: var(--fw-black) var(--fs-2xl)/1 var(--font); font-stretch: 118%; color: #fff; letter-spacing: .04em; }
#wheelspin .win { width: min(300px, 70vw); height: 56px; overflow: hidden; border-radius: var(--r-md); background: linear-gradient(90deg, #ff2fa0, #6b2fd6 55%, #35d0ff); box-shadow: inset 0 0 0 1.5px rgba(255,255,255,.35); position: relative; }
#wheelspin .win::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.35), transparent 30%, transparent 70%, rgba(0,0,0,.35)); }
#wheelspin .reel { position: absolute; left: 0; right: 0; top: 0; transition: transform 1.6s cubic-bezier(.12,.75,.16,1); }
#wheelspin .reel div { height: 56px; display: flex; align-items: center; justify-content: center; gap: 10px; font: var(--fw-black) var(--fs-xl) var(--font); letter-spacing: .03em; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,.35); }
#wheelspin .reel div i { width: 24px; height: 24px; border-radius: 6px; box-shadow: 0 0 0 2px #fff; }
#wheelspin .sub { font: var(--fw-semi) var(--fs-xs) var(--font-mono); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); text-align: center; }
body.touch #wheelspin { padding: 8px 12px; gap: 6px; } body.touch #wheelspin .win { height: 44px; } body.touch #wheelspin .reel div { height: 44px; font-size: var(--fs-lg); }
`,
  _it = (o) => "$" + Math.round(o).toLocaleString("en-US"),
  bSt = () => (document.body.classList.contains("touch") ? 44 : 56),
  $T = class {
    constructor() {
      (Th("wsCss", gSt),
        (this.el = document.createElement("div")),
        (this.el.id = "wheelspin"),
        (this.el.className = "ds-panel ds-card top ds-pop"),
        this.el.setAttribute("aria-live", "polite"),
        aa("lane", this.el, 2),
        (this.shown = 0));
    }
    show(t, e = {}) {
      ((this.pending ||= []).push([t, e]), this._flush());
    }
    _flush() {
      if ((clearTimeout(this._t), !this.pending?.length)) return;
      let t = performance.now(),
        e = !!this.busy?.();
      if (
        (e ? (this.calm = 0) : (this.calm ||= t), e || t - this.calm < 2500)
      ) {
        this._t = setTimeout(() => this._flush(), 500);
        return;
      }
      for (let [s, { cashOK: n = !0, next: i = null }] of this.pending.splice(
        0,
      ))
        (this.onStart?.(s),
          dd.show(this.el, {
            key: "ws" + s.level,
            pri: 3,
            dur: 4.2,
            hold: !0,
            onShow: () => this._run(s, n, i),
          }));
    }
    _label(t, e) {
      return t.unlock
        ? `${t.unlock.kind === "colour" ? `<i style="background:${t.unlock.hex}"></i>` : ""}${t.unlock.name}`
        : e
          ? _it(t.cash)
          : "Level up";
    }
    _run(t, e, s) {
      this.shown++;
      let n = [
          "$500",
          "$1,000",
          "Paint",
          "$2,500",
          "$750",
          "$5,000",
          "Paint",
          "$1,500",
          "$10,000",
          "$750",
        ],
        i =
          [...n, ...n].map((h) => `<div>${h}</div>`).join("") +
          `<div>${this._label(t, e)}</div>`,
        a = n.length * 2,
        r = bSt(),
        l = t.unlock
          ? `Exclusive ${t.unlock.kind} unlocked \xB7 in the Garage${e && t.cash ? " \xB7 +" + _it(t.cash) : ""}`
          : e
            ? "Wheelspin \xB7 added to your wallet"
            : s
              ? `Next: ${s.name} at level ${s.level}`
              : "";
      this.el.innerHTML = `<div class="lv">${Br("level", "sm")}<span class="ds-eyebrow">Level up</span><b>${t.level}</b></div><div class="win"><div class="reel">${i}</div></div><div class="sub">${l}</div>`;
      let c = this.el.querySelector(".reel");
      ((c.style.transform = "translateY(0)"),
        setTimeout(() => this.onLand?.(t), 1650),
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            c.style.transform = `translateY(${-a * r}px)`;
          }),
        ));
    }
  };
var xSt = `
body.photo #hud, body.photo #mini, body.photo #where, body.photo #fps, body.photo #toast, body.photo #drift, body.photo #mpTags, body.photo .tx, body.photo #stHud, body.photo #skHud,
body.photo #brakeCue, body.photo #menu, body.photo #radar, body.photo #tbar, body.photo #touch, body.photo #rwChip, body.photo #wheelspin, body.photo #raceTree { visibility: hidden !important; }
#phPanel { position: fixed; right: max(16px, 2vw); top: 50%; transform: translateY(-50%); z-index: 12; width: 250px; padding: 14px 16px; border-radius: 14px; background: rgba(10,12,16,.82); color: #f3f4f1; font: 600 12px var(--font); box-shadow: 0 10px 40px rgba(0,0,0,.5); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: none; }
body.photo #phPanel { display: block; }
#phPanel h3 { margin: 0 0 8px; font: 800 13px var(--font); letter-spacing: .22em; text-transform: uppercase; }
#phPanel label { display: block; margin: 10px 0 2px; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; opacity: .8; }
#phPanel label b { float: right; font-weight: 700; opacity: .9; }
#phPanel input[type=range] { width: 100%; }
#phPanel .fl { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
#phPanel .fl button, #phPanel .bt button { flex: 1 1 auto; padding: 6px 6px; border-radius: 6px; border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.06); color: #fff; font: 700 11px var(--font); cursor: pointer; }
#phPanel .fl button[aria-pressed=true] { background: #f3f4f1; color: #0b0d10; }
#phPanel .bt { display: flex; gap: 6px; margin-top: 14px; } #phPanel .bt .go { background: #ff5a1f; border-color: #ff5a1f; }
#phPanel small { display: block; margin-top: 10px; opacity: .6; font: 600 10px var(--font-mono); letter-spacing: .06em; line-height: 1.5; }
#phBlur { position: fixed; inset: 0; z-index: 1; pointer-events: none; display: none; }
#phVig { position: fixed; inset: 0; z-index: 1; pointer-events: none; display: none; background: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%); }
body.photo #phBlur.on, body.photo #phVig.on { display: block; }
body.photo #view { cursor: grab; }
`;
