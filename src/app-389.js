// app 389 — queryselector
// Lines 194398-194496 of readable/app.pretty.js (statement-aligned).
es();
function X6t() {
  let t = document.createElement("canvas");
  t.width = t.height = 128;
  let e = t.getContext("2d");
  for (let n = 0; n < 16; n++) {
    let i = 64 + (Math.random() - 0.5) * 128 * 0.32,
      a = 128 / 2 + (Math.random() - 0.5) * 128 * 0.32,
      r = 128 * (0.17 + Math.random() * 0.2),
      l = e.createRadialGradient(i, a, 0, i, a, r);
    (l.addColorStop(0, "rgba(255,255,255,0.8)"),
      l.addColorStop(0.55, "rgba(255,255,255,0.35)"),
      l.addColorStop(1, "rgba(255,255,255,0)"),
      (e.fillStyle = l),
      e.fillRect(0, 0, 128, 128));
  }
  let s = new Sn(t);
  return ((s.colorSpace = Je), s);
}
function cit() {
  let t = document.createElement("canvas");
  t.width = t.height = 64;
  let e = t.getContext("2d"),
    s = e.createRadialGradient(64 / 2, 64 / 2, 0, 64 / 2, 64 / 2, 64 / 2);
  (s.addColorStop(0, "rgba(255,255,255,1)"),
    s.addColorStop(0.3, "rgba(200,225,255,0.75)"),
    s.addColorStop(1, "rgba(120,170,255,0)"),
    (e.fillStyle = s),
    e.fillRect(0, 0, 64, 64));
  let n = new Sn(t);
  return ((n.colorSpace = Je), n);
}
var RT = [
    [-0.36, 0.44, 2.12],
    [-0.12, 0.44, 2.14],
    [0.12, 0.44, 2.14],
    [0.36, 0.44, 2.12],
  ],
  K6t = [0.8, 2.2, 4.4, 7.5],
  Yv = 0.5,
  M4 = 16,
  Y6t = [0.16, 0.34, 0.54],
  AT = [
    [-0.72, 0.14, -1.25],
    [0.72, 0.14, -1.25],
    [-0.72, 0.14, 1.15],
    [0.72, 0.14, 1.15],
  ],
  hit = [
    ["df", "DOWNFORCE", "KG"],
    ["pt", "PITCH", "DEG"],
    ["al", "ALTITUDE", "FT"],
  ];
function J6t() {
  let o = document.createElement("style");
  ((o.textContent = `#sxHud{position:fixed;left:50%;bottom:calc(var(--sb,0px) + 18px);transform:translateX(-50%);display:none;gap:14px;z-index:6;pointer-events:none}
body.play[data-car=roadster] #sxHud{display:flex} body.picking #sxHud,body.garage #sxHud,body.hud-off #sxHud{display:none!important}
body.touch #sxHud{bottom:auto;top:calc(var(--st,0px) + 58px);gap:8px;transform:translateX(-50%) scale(.78);transform-origin:top center}
#sxHud .g{position:relative;width:76px;height:76px;border-radius:50%;background:rgba(6,8,10,.42);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
#sxHud svg{position:absolute;inset:0} #sxHud circle{fill:none;stroke-width:2.2} #sxHud .t{stroke:rgba(255,255,255,.16)} #sxHud .v{stroke:#f3f4f1;stroke-linecap:round;transform:rotate(135deg);transform-origin:38px 38px}
#sxHud b{position:absolute;left:0;right:0;top:27px;text-align:center;font:600 19px var(--disp,system-ui);color:#f3f4f1;letter-spacing:.02em;font-variant-numeric:tabular-nums}
#sxHud small,#sxHud i{position:absolute;left:0;right:0;text-align:center;font:700 6.5px var(--disp,system-ui);letter-spacing:.14em;color:rgba(243,244,241,.66);font-style:normal}
#sxHud small{top:17px} #sxHud i{top:50px} #sxHud .g.hot .v{stroke:#ff3b30} #sxHud .g.off{opacity:.45}
#sxHud .keys{display:flex;flex-direction:column;justify-content:center;gap:5px;font:700 8px var(--disp,system-ui);letter-spacing:.14em;color:rgba(243,244,241,.9);text-shadow:0 1px 3px rgba(0,0,0,.8)}
#sxHud .keys span{display:flex;align-items:center;gap:6px} #sxHud kbd{min-width:20px;height:20px;padding:0 5px;box-sizing:border-box;display:inline-grid;place-items:center;border-radius:5px;background:rgba(243,244,241,.92);color:#0f0f10;font:800 11px var(--disp,system-ui);letter-spacing:0;box-shadow:0 2px 0 rgba(0,0,0,.45)}
#sxHud .keys span.on kbd{background:#9fd0ff} body.touch #sxHud .keys{display:none}`),
    document.head.appendChild(o));
  let t = document.createElement("div");
  ((t.id = "sxHud"), t.setAttribute("aria-hidden", "true"));
  let e = 2 * Math.PI * 32,
    s = e * 0.75;
  ((t.innerHTML =
    hit
      .map(
        ([a, r, l]) =>
          `<div class="g" id="sx_${a}"><svg viewBox="0 0 76 76"><circle class="t" cx="38" cy="38" r="32" stroke-dasharray="${s} ${e}" transform="rotate(135 38 38)"/><circle class="v" cx="38" cy="38" r="32" stroke-dasharray="0 ${e}"/></svg><small>${r}</small><b>0</b><i>${l}</i></div>`,
      )
      .join("") +
    '<div class="keys"><span id="sxkJ"><kbd>J</kbd>FLY</span><span id="sxkF"><kbd>SPACE</kbd>FLIP</span><span id="sxkQ"><kbd>Q</kbd>FANS \xB7 CLIMB WALLS</span></div>'),
    document.body.appendChild(t));
  let n = {
      J: t.querySelector("#sxkJ"),
      F: t.querySelector("#sxkF"),
      Q: t.querySelector("#sxkQ"),
    },
    i = {};
  for (let [a] of hit) {
    let r = t.querySelector("#sx_" + a);
    i[a] = {
      g: r,
      b: r.querySelector("b"),
      v: r.querySelector(".v"),
      u: r.querySelector("i"),
      txt: "",
      arc: -1,
    };
  }
  return { d: t, G: i, A: s, C: e, K: n };
}
