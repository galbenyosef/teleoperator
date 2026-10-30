// app 408 — math
// Lines 200285-200392 of readable/app.pretty.js (statement-aligned).
var Wit = (o) =>
    String(o).replace(
      /[&<>"']/g,
      (t) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[t],
    ),
  A4 = (o) =>
    (o < 0 ? "\u2212" : "") +
    "$" +
    Math.abs(Math.round(o)).toLocaleString("en-US"),
  qit = (o) => {
    let t = Math.max(0, (Date.now() - o) / 1e3);
    return t < 60
      ? "just now"
      : t < 3600
        ? Math.floor(t / 60) + " min ago"
        : t < 86400
          ? Math.floor(t / 3600) + " h ago"
          : new Date(o).toLocaleDateString();
  },
  VSt = `
#chWallet .w { pointer-events: auto; cursor: pointer; }
#chWallet .pd { display: block; margin-top: 4px; font: 600 10px var(--mono, monospace); letter-spacing: .1em; color: #ffd36b; text-align: right; }
#walletLog { position: fixed; z-index: 40; right: max(12px, 2.5vw); top: max(12px, 2.5vh); width: min(380px, calc(100vw - 24px)); max-height: min(560px, calc(100vh - 24px)); display: none; flex-direction: column;
  border-radius: 12px; background: rgba(9,11,15,.94); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 14px 50px rgba(0,0,0,.5); color: #f3f4f1; font-family: var(--disp, sans-serif); }
#walletLog.on { display: flex; }
#walletLog header { display: flex; align-items: baseline; gap: 10px; padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,.08); }
#walletLog header h3 { margin: 0; font: 800 15px var(--disp, sans-serif); letter-spacing: .12em; text-transform: uppercase; }
#walletLog header b { margin-left: auto; font: 800 20px var(--disp, sans-serif); font-variant-numeric: tabular-nums; }
#walletLog header button { margin-left: 8px; width: 28px; height: 28px; border: 0; border-radius: 6px; background: rgba(255,255,255,.08); color: #fff; font-size: 16px; cursor: pointer; }
#walletLog .pd { padding: 8px 16px; font: 600 11px/1.4 var(--mono, monospace); color: #ffd36b; background: rgba(255,211,107,.07); }
#walletLog ol { list-style: none; margin: 0; padding: 4px 0; overflow-y: auto; }
#walletLog li { display: grid; grid-template-columns: 1fr auto; gap: 1px 10px; padding: 7px 16px; border-bottom: 1px solid rgba(255,255,255,.05); }
#walletLog li span { font: 600 13px var(--disp, sans-serif); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#walletLog li em { font: 800 13px var(--mono, monospace); font-style: normal; text-align: right; color: #7dffb0; } #walletLog li.neg em { color: #ff9a9a; }
#walletLog li small { font: 500 10.5px var(--mono, monospace); color: rgba(243,244,241,.5); } #walletLog li small + small { text-align: right; }
#walletLog li.pend em { color: #ffd36b; } #walletLog li.pend span::after { content: " \xB7 pending"; color: #ffd36b; font-size: 11px; }
#walletLog footer { padding: 10px 16px 12px; font: 500 11px/1.45 var(--mono, monospace); color: rgba(243,244,241,.55); border-top: 1px solid rgba(255,255,255,.08); }
`,
  o9 = class {
    constructor(t) {
      if (((this.pr = t), !document.getElementById("walletCss"))) {
        let s = document.createElement("style");
        ((s.id = "walletCss"),
          (s.textContent = VSt),
          document.head.appendChild(s));
      }
      let e = (this.el = document.createElement("div"));
      ((e.id = "walletLog"),
        e.setAttribute("role", "dialog"),
        e.setAttribute("aria-label", "Wallet history"),
        document.body.appendChild(e),
        e.addEventListener("click", (s) => {
          s.target.closest("[data-x]") && this.toggle(!1);
        }),
        addEventListener(
          "keydown",
          (s) => {
            this.on &&
              s.code === "Escape" &&
              (this.toggle(!1), s.stopPropagation());
          },
          !0,
        ),
        t.onCash?.(() => {
          this.on && this.render();
        }));
    }
    toggle(t = !this.on) {
      ((this.on = t), this.el.classList.toggle("on", t), t && this.render());
    }
    render() {
      let t = this.pr,
        e = t.p.cash || { base: 0, log: [] },
        s = t.wallet(),
        n = t.pendingCash?.() || 0,
        i = e.base || 0,
        a = (e.log || [])
          .map((r) => (r.pend || (i += r.a), { e: r, bal: i }))
          .reverse();
      this.el.innerHTML = `<header><h3>Wallet</h3><b>${A4(s)}</b><button type="button" data-x="1" aria-label="Close">\xD7</button></header>
      ${n > 0.5 ? `<div class="pd">+${A4(n)} pending: income over $15,000 in a short time is held here and comes in as the limit refills (about $1,800 a minute).</div>` : ""}
      <ol>${a.map(({ e: r, bal: l }) => `<li class="${r.a < 0 ? "neg" : ""}${r.pend ? " pend" : ""}"><span title="${Wit(r.held || r.why)}">${Wit(r.why || "Cash")}</span><em>${r.a < 0 ? "\u2212" : "+"}${A4(Math.abs(r.a))}</em><small>${qit(r.t)}${r.rel ? " \xB7 released " + qit(r.rel) : ""}</small><small>${r.pend ? "not in the balance yet" : "balance " + A4(l)}</small></li>`).join("") || "<li><span>No changes yet</span></li>"}</ol>
      <footer>${Math.abs(e.base || 0) > 0.5 ? `Before this history: ${A4(e.base)}${e.baseT ? "" : " (your wallet when the history began)"}. ` : ""}Cash buys parts in the Garage. mindblown tokens (\u25C6) are separate: they pay for AI wraps and cars.</footer>`;
    }
  };
var jit = "sf-drive.chfilter",
  bN = { trap: "speed", zone: "speed", drift: "drift", jump: "jump" },
  $it = (o) => "$" + Math.round(o).toLocaleString("en-US"),
  Xit = {
    time: "Out of time",
    cold: "The food went cold",
    spilt: "The order is ruined - it went everywhere",
    vip: "The VIP got out: too rough a ride",
    busted: "BUSTED - the police caught you",
    abandoned: "Abandoned",
    teleport: "Left behind (teleported)",
    quit: "Left the race",
    place: "Off the podium",
    few: "Not enough near misses",
    off: "The police were switched off",
  };
