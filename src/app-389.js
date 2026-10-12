// app 389 — math
// Lines 192094-192181 of readable/app.pretty.js (statement-aligned).
var Ywt = `
:root { --ch-bg: rgba(8,10,14,.8); --ch-line: rgba(255,255,255,.14); --ch-gold: #ffd23f; --ch-cash: #7dffb0; --ch-tok: #b98cff; }
#chWallet { position: fixed; z-index: 9; right: max(16px, 2.5vw); top: calc(max(14px, 2.5vh) + 40px); display: none; flex-direction: column; align-items: flex-end; pointer-events: none; font-family: var(--disp, sans-serif); color: #f3f4f1; }
body.play #chWallet.on { display: flex; }
#chWallet .w { display: flex; align-items: baseline; gap: 8px; padding: 6px 12px 7px; border-radius: 10px; background: var(--ch-bg); border: 1px solid var(--ch-line); box-shadow: 0 6px 22px rgba(0,0,0,.35); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); transition: border-color .3s, box-shadow .3s; }
#chWallet .w small { font: 700 9px var(--mono, monospace); letter-spacing: .22em; color: rgba(243,244,241,.6); }
#chWallet .w b { font: 800 22px/1 var(--disp, sans-serif); font-stretch: 112%; letter-spacing: .02em; font-variant-numeric: tabular-nums; color: #fff; }
#chWallet.up .w { border-color: var(--ch-cash); box-shadow: 0 0 0 1px var(--ch-cash), 0 6px 26px rgba(125,255,176,.25); } #chWallet.up .w b { color: var(--ch-cash); }
#chWallet.dn .w { border-color: #ff6b6b; } #chWallet.dn .w b { color: #ff9a9a; }
#chWallet .pop { margin-top: 6px; padding: 4px 10px; border-radius: 8px; background: rgba(8,10,14,.72); font: 800 13px var(--disp, sans-serif); letter-spacing: .04em; color: var(--ch-cash); opacity: 0; transform: translateY(-4px); transition: opacity .3s, transform .3s; white-space: nowrap; }
#chWallet .pop.on { opacity: 1; transform: none; } #chWallet .pop.neg { color: #ff9a9a; } #chWallet .pop small { font: 600 10px var(--mono, monospace); letter-spacing: .14em; color: rgba(243,244,241,.75); margin-left: 6px; text-transform: uppercase; }
body.chgarage #chWallet { display: none !important; }   /* (the garage shows the wallet and the tokens apart itself: gen64) */
body.hud-off #chWallet, body.photo #chWallet, body.cine #chWallet { visibility: hidden; }
body.touch #chWallet { top: calc(var(--st, 0px) + 48px); right: calc(var(--sr, 0px) + 10px); } body.touch #chWallet .w b { font-size: 16px; }
body.chwallet #taxiTotal b { display: none; }
#chPrompt { gap: 12px; padding: 6px 6px 6px 8px; max-width: calc(100vw - 32px); border-radius: var(--r-md, 12px); }
#chPrompt .ds-icon { width: 36px; height: 36px; }
#chPrompt .tx { min-width: 0; } #chPrompt .k { font: 800 10px var(--disp, sans-serif); letter-spacing: .2em; text-transform: uppercase; }
#chPrompt .n { font: 800 16px var(--disp, sans-serif); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } #chPrompt .s { font: 600 11px var(--mono, monospace); letter-spacing: .06em; color: rgba(243,244,241,.72); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#chPrompt .s b { color: var(--ch-cash); } #chPrompt .s i { font-style: normal; color: var(--ch-gold); } #chPrompt .s em { font-style: normal; color: #ff9a9a; }
#chPrompt button { all: unset; cursor: pointer; flex: none; padding: 9px 14px; border-radius: 10px; color: #0b0c0e; font: 800 12px var(--disp, sans-serif); letter-spacing: .14em; text-transform: uppercase; }
#chPrompt button[disabled] { opacity: .45; cursor: default; }
#chPrompt kbd { font: 800 11px var(--mono, monospace); padding: 1px 5px; border: 1px solid rgba(0,0,0,.5); border-radius: 4px; margin-right: 6px; }
#chObj { min-width: 300px; max-width: calc(100vw - 32px); padding: 8px 14px 9px 16px; pointer-events: none; }
#chObj .top { display: flex; align-items: baseline; gap: 10px; justify-content: space-between; }
#chObj .k { font: 800 10px var(--font, sans-serif); letter-spacing: .22em; text-transform: uppercase; color: var(--c); }
#chObj .clk { font: 800 26px/1 var(--disp, sans-serif); font-stretch: 112%; font-variant-numeric: tabular-nums; } #chObj .clk.low { color: #ff7070; }
#chObj .o { font: 700 14px var(--disp, sans-serif); margin-top: 3px; } #chObj .o small { font: 600 11px var(--mono, monospace); color: rgba(243,244,241,.7); margin-left: 6px; letter-spacing: .06em; }
#chObj .m { display: flex; gap: 10px; margin-top: 6px; } #chObj .m div { flex: 1; font: 700 9px var(--mono, monospace); letter-spacing: .16em; color: rgba(243,244,241,.7); text-transform: uppercase; }
#chObj .m i { display: block; height: 4px; margin-top: 3px; border-radius: 2px; background: rgba(255,255,255,.14); overflow: hidden; } #chObj .m i u { display: block; height: 100%; background: var(--mc, #7dffb0); transition: width .2s; }
#chObj .st { margin-top: 5px; font: 600 10px var(--mono, monospace); letter-spacing: .12em; color: rgba(243,244,241,.7); } #chObj .st b { color: var(--ch-gold); font-weight: 800; }
#chObj .ab { font: 600 9px var(--mono, monospace); letter-spacing: .14em; color: rgba(243,244,241,.45); margin-top: 4px; text-transform: uppercase; }
body.racing #chObj { display: none !important; }
#chRes { position: fixed; left: 50%; top: 50%; transform: translate(-50%, -46%); z-index: 12; width: min(420px, calc(100vw - 32px)); padding: 18px 22px 16px; border-radius: 16px; background: linear-gradient(180deg, rgba(12,14,20,.94), rgba(10,12,16,.9)); border-top: 5px solid var(--c); color: #f3f4f1; font-family: var(--disp, sans-serif); box-shadow: 0 20px 60px rgba(0,0,0,.55); opacity: 0; pointer-events: none; transition: opacity .3s, transform .3s; }
#chRes.on { opacity: 1; transform: translate(-50%, -50%); pointer-events: auto; }
#chRes .k { font: 800 11px var(--disp, sans-serif); letter-spacing: .24em; text-transform: uppercase; color: var(--c); } #chRes h3 { margin: 4px 0 0; font: 800 22px var(--disp, sans-serif); }
#chRes .v { display: flex; align-items: baseline; gap: 14px; margin-top: 10px; } #chRes .v b { font: 800 40px/1 var(--disp, sans-serif); font-stretch: 112%; font-variant-numeric: tabular-nums; } #chRes .v small { font: 600 11px var(--mono, monospace); letter-spacing: .14em; color: rgba(243,244,241,.7); text-transform: uppercase; }
#chRes .stars { font-size: 30px; letter-spacing: .12em; margin-top: 4px; } #chRes .stars i { font-style: normal; color: rgba(255,255,255,.22); transition: color .25s, text-shadow .25s; } #chRes .stars i.y { color: var(--ch-gold); text-shadow: 0 0 16px rgba(255,210,63,.8); }
#chRes table { width: 100%; border-collapse: collapse; margin-top: 10px; font: 600 12px var(--mono, monospace); } #chRes td { padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,.08); color: rgba(243,244,241,.82); } #chRes td:last-child { text-align: right; color: var(--ch-cash); font-variant-numeric: tabular-nums; } #chRes td.neg { color: #ff9a9a !important; }
#chRes tr.tot td { border-bottom: 0; padding-top: 8px; font: 800 18px var(--disp, sans-serif); color: #fff; } #chRes tr.tot td:last-child { color: var(--ch-cash); }
#chRes .xp { margin-top: 4px; font: 600 11px var(--mono, monospace); letter-spacing: .12em; color: rgba(243,244,241,.75); text-transform: uppercase; } #chRes .xp b { color: #8fd3ff; }
#chRes .w { margin-top: 10px; padding: 8px 10px; border-radius: 10px; background: rgba(255,255,255,.05); font: 600 11px var(--mono, monospace); letter-spacing: .08em; color: rgba(243,244,241,.8); } #chRes .w b { color: #fff; font: 800 14px var(--disp, sans-serif); }
#chRes .w em { display: block; margin-top: 3px; font-style: normal; font-size: 10px; color: rgba(243,244,241,.55); }
#chRes .why { margin-top: 10px; font: 600 13px var(--disp, sans-serif); color: rgba(243,244,241,.85); }
#chRes .row { display: flex; gap: 8px; margin-top: 14px; } #chRes button { all: unset; cursor: pointer; flex: 1; text-align: center; padding: 10px 0; border-radius: 10px; font: 800 12px var(--disp, sans-serif); letter-spacing: .14em; text-transform: uppercase; background: rgba(255,255,255,.1); color: #f3f4f1; } #chRes button.go { background: var(--c); color: var(--ink2, #0b0c0e); }
#chRes kbd { font: 800 10px var(--mono, monospace); padding: 1px 5px; border: 1px solid currentColor; border-radius: 4px; margin-left: 6px; opacity: .7; }
#chFilter { position: fixed; z-index: 15; left: max(16px, 2.5vw); top: calc(max(14px, 2vh) + 62px); display: none; flex-direction: column; gap: 4px; max-height: calc(100vh - 160px); overflow-y: auto; padding: 8px; border-radius: 12px; background: rgba(8,10,12,.78); border: 1px solid var(--ch-line); font-family: var(--disp, sans-serif); color: #f3f4f1; scrollbar-width: thin; }
body.bigmap #chFilter { display: flex; }
#chFilter h5 { margin: 0 2px 4px; font: 700 9px var(--mono, monospace); letter-spacing: .2em; color: rgba(243,244,241,.6); text-transform: uppercase; display: flex; justify-content: space-between; gap: 10px; }
#chFilter button { all: unset; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 4px 8px 4px 4px; border-radius: 8px; font: 700 12px var(--disp, sans-serif); white-space: nowrap; }
#chFilter button:hover { background: rgba(255,255,255,.08); } #chFilter button[aria-pressed="false"] { opacity: .38; }
#chFilter button canvas { width: 22px; height: 22px; flex: none; } #chFilter button span { flex: 1; } #chFilter button small { font: 600 10px var(--mono, monospace); color: rgba(243,244,241,.65); }
#chFilter .feat { color: var(--ch-gold); } #chFilter .all { justify-content: center; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; background: rgba(255,255,255,.06); margin-top: 4px; }
@media (max-width: 720px) { #chFilter { top: auto; bottom: 86px; left: 8px; right: 8px; flex-direction: row; flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; max-height: none; } #chFilter h5 { display: none; } #chFilter button small { display: none; } }
`,
  Fp = (i) =>
    (i < 0 ? "\u2212$" : "$") + Math.abs(Math.round(i)).toLocaleString("en-US"),
  or = (i) =>
    String(i ?? "").replace(
      /[&<>"']/g,
      (t) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[t],
    );
function Jwt(i, t, e = 40) {
  let s = Math.min(2, globalThis.devicePixelRatio || 1),
    n = document.createElement("canvas");
  n.width = n.height = Math.round(e * s);
  let o = n.getContext("2d"),
    a = n.width / 2;
  return (
    o.translate(a, a),
    o.beginPath(),
    o.arc(0, 0, a * 0.92, 0, 7),
    (o.fillStyle = xi[i].col),
    o.fill(),
    (o.lineWidth = a * 0.08),
    (o.strokeStyle = "rgba(255,255,255,.85)"),
    o.stroke(),
    cN(o, i, a * 0.62, lN(i), t),
    n
  );
}
