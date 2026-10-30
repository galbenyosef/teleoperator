// app 77 — map
// Lines 70859-70865 of readable/app.pretty.js (statement-aligned).
var qW = new Map();
function jW(o, t = 0) {
  let e = o * 4 + t,
    s = qW.get(e);
  return (s || qW.set(e, (s = Zdt(o, t))), s);
}
es();
