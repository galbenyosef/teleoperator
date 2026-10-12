// app 356 — math
// Lines 173864-173905 of readable/app.pretty.js (statement-aligned).
var lyt = {
    pole: { g: 0.42, r: 1.45 },
    tree: { g: 0.5, r: 1.15 },
    car: { g: 0.62, r: 0.95 },
    rail: { g: 0.3, r: 1.6 },
  },
  NF = 0.6,
  Zx = { engine: 0.8, sfx: 0.85, world: 0.6, amb: 0.42, ui: 0.45, rev: 0.9 },
  cyt = new Set(["boxtruck", "stepvan", "garbage", "semi", "bus", "cablecar"]),
  zp = 343,
  hyt = 0.6,
  fyt = { ferrari: 0.36, ev: 0.8 };
function DF() {
  try {
    let i = JSON.parse(localStorage.getItem(Ep) || "{}") || {};
    return typeof i.masterVol == "number" ? i.masterVol : 1;
  } catch {
    return 1;
  }
}
function UF(i) {
  try {
    let t = JSON.parse(localStorage.getItem(Ep) || "{}") || {};
    ((t.masterVol = i), localStorage.setItem(Ep, JSON.stringify(t)));
  } catch {}
}
var an = (i, t, e) => Math.min(e, Math.max(t, i)),
  Qx = { top: [0, 55, 95, 135, 178, 225, 275], red: 7e3, idle: 950 };
function Rtt(i, t, e, s) {
  let n = (l) => Math.max(Qx.idle, (Qx.red * t) / Qx.top[l]),
    o = 3e3 + 3400 * e,
    a = 1600 + 1400 * e;
  ((i.shiftT = Math.max(0, (i.shiftT || 0) - s)),
    i.g < 6 && n(i.g) > o
      ? (i.g++, (i.shiftT = 0.12), (i.dir = 1))
      : i.g > 1 && n(i.g) < a && (i.g--, (i.shiftT = 0.06), (i.dir = -1)));
  let r = n(i.g);
  return (
    i.g === 1 && t < 18 && (r = Math.max(r, Qx.idle + 2400 * e * (1 - t / 36))),
    Math.min(r, Qx.red)
  );
}
