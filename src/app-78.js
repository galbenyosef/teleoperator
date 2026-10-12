// app 78 — map
// Lines 70628-70634 of readable/app.pretty.js (statement-aligned).
var WG = new Map();
function qG(i, t = 0) {
  let e = i * 4 + t,
    s = WG.get(e);
  return (s || WG.set(e, (s = Pht(i, t))), s);
}
as();
