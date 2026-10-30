// app 394 — json
// Lines 196022-196093 of readable/app.pretty.js (statement-aligned).
var eu = "sf-drive.settings",
  pit = "sf-drive.settingsTab",
  Ai = (o) => document.getElementById(o),
  LT = (o) =>
    !!o &&
    o.offsetParent !== null &&
    getComputedStyle(o).visibility !== "hidden",
  IT = (o) => "$" + Math.round(o || 0).toLocaleString();
function k4() {
  let o = {};
  try {
    o = JSON.parse(localStorage.getItem(eu) || "{}") || {};
  } catch {
    o = {};
  }
  let t = {};
  for (let e of Object.keys(IO)) t[e] = o.assists?.[e] !== !1;
  return {
    assists: t,
    manual: o.gearbox === "manual",
    rideStyle: o.rideStyle === "comfort" ? "comfort" : "street",
  };
}
function OT(o) {
  try {
    let t = JSON.parse(localStorage.getItem(eu) || "{}") || {};
    ((t.rideStyle = o === "comfort" ? "comfort" : "street"),
      localStorage.setItem(eu, JSON.stringify(t)));
  } catch {}
}
var git = {
  hud: "full",
  brakeLine: "races",
  stunts: "on",
  peds: "on",
  rumble: "on",
  steerSens: 50,
  deadzone: 12,
  fovAdd: 0,
  guide: "on",
  blur: "subtle",
  vibe: "on",
};
function z4() {
  let o = {};
  try {
    o = JSON.parse(localStorage.getItem(eu) || "{}") || {};
  } catch {
    o = {};
  }
  return { ...git, ...(o.prefs && typeof o.prefs == "object" ? o.prefs : {}) };
}
function iSt(o, t) {
  try {
    let e = JSON.parse(localStorage.getItem(eu) || "{}") || {};
    ((e.prefs = { ...(e.prefs || {}), [o]: t }),
      localStorage.setItem(eu, JSON.stringify(e)));
  } catch {}
}
function mit(o) {
  try {
    let t = JSON.parse(localStorage.getItem(eu) || "{}") || {};
    localStorage.setItem(
      eu,
      JSON.stringify({
        ...t,
        assists: { ...o.assists },
        gearbox: o.manual ? "manual" : "auto",
      }),
    );
  } catch {}
}
