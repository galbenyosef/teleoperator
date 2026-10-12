// app 377 — json
// Lines 188199-188270 of readable/app.pretty.js (statement-aligned).
var wf = "sf-drive.settings",
  set = "sf-drive.settingsTab",
  gi = (i) => document.getElementById(i),
  dE = (i) =>
    !!i &&
    i.offsetParent !== null &&
    getComputedStyle(i).visibility !== "hidden",
  pE = (i) => "$" + Math.round(i || 0).toLocaleString();
function vM() {
  let i = {};
  try {
    i = JSON.parse(localStorage.getItem(wf) || "{}") || {};
  } catch {
    i = {};
  }
  let t = {};
  for (let e of Object.keys(HI)) t[e] = i.assists?.[e] !== !1;
  return {
    assists: t,
    manual: i.gearbox === "manual",
    rideStyle: i.rideStyle === "comfort" ? "comfort" : "street",
  };
}
function gE(i) {
  try {
    let t = JSON.parse(localStorage.getItem(wf) || "{}") || {};
    ((t.rideStyle = i === "comfort" ? "comfort" : "street"),
      localStorage.setItem(wf, JSON.stringify(t)));
  } catch {}
}
var iet = {
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
function yM() {
  let i = {};
  try {
    i = JSON.parse(localStorage.getItem(wf) || "{}") || {};
  } catch {
    i = {};
  }
  return { ...iet, ...(i.prefs && typeof i.prefs == "object" ? i.prefs : {}) };
}
function mwt(i, t) {
  try {
    let e = JSON.parse(localStorage.getItem(wf) || "{}") || {};
    ((e.prefs = { ...(e.prefs || {}), [i]: t }),
      localStorage.setItem(wf, JSON.stringify(e)));
  } catch {}
}
function net(i) {
  try {
    let t = JSON.parse(localStorage.getItem(wf) || "{}") || {};
    localStorage.setItem(
      wf,
      JSON.stringify({
        ...t,
        assists: { ...i.assists },
        gearbox: i.manual ? "manual" : "auto",
      }),
    );
  } catch {}
}
