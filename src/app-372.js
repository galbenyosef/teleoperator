// app 372 — math
// Lines 186214-186275 of readable/app.pretty.js (statement-aligned).
as();
En();
function eN(i, t) {
  let e = document.createElement("canvas");
  e.width = e.height = i;
  let s = e.getContext("2d"),
    n = s.createRadialGradient(i / 2, i / 2, 0, i / 2, i / 2, i / 2);
  for (let [a, r] of t) n.addColorStop(a, r);
  ((s.fillStyle = n), s.fillRect(0, 0, i, i));
  let o = new Sn(e);
  return ((o.colorSpace = is), o);
}
function rwt() {
  let t = document.createElement("canvas");
  t.width = t.height = 128;
  let e = t.getContext("2d");
  for (let n = 0; n < 14; n++) {
    let o = 64 + (Math.random() - 0.5) * 128 * 0.35,
      a = 128 / 2 + (Math.random() - 0.5) * 128 * 0.35,
      r = 128 * (0.18 + Math.random() * 0.2),
      l = e.createRadialGradient(o, a, 0, o, a, r);
    (l.addColorStop(0, "rgba(255,255,255,0.35)"),
      l.addColorStop(1, "rgba(255,255,255,0)"),
      (e.fillStyle = l),
      e.fillRect(0, 0, 128, 128));
  }
  let s = new Sn(t);
  return ((s.colorSpace = is), s);
}
function lwt() {
  let e = document.createElement("canvas");
  ((e.width = 64), (e.height = 64));
  let s = e.getContext("2d"),
    n = s.createImageData(64, 64),
    o = Array.from(
      { length: 64 },
      (r, l) =>
        0.72 +
        0.28 *
          Math.sin((l / 64) * Math.PI * 9) ** 2 *
          (0.6 + 0.4 * Math.random()),
    );
  for (let r = 0; r < 64; r++)
    for (let l = 0; l < 64; l++) {
      let c = (l + 0.5) / 64,
        h = Math.min(1, Math.min(c, 1 - c) / 0.22),
        f = h * h * (3 - 2 * h) * o[l] * (0.85 + 0.15 * Math.random()),
        u = (r * 64 + l) * 4;
      ((n.data[u] = n.data[u + 1] = n.data[u + 2] = 255),
        (n.data[u + 3] = Math.round(255 * f)));
    }
  s.putImageData(n, 0, 0);
  let a = new Sn(e);
  return ((a.wrapS = a.wrapT = ti), (a.colorSpace = is), a);
}
function sN(i, t) {
  (!t && !i.drawRange.count) ||
    (i.setDrawRange(0, t),
    t &&
      ((i.attributes.position.needsUpdate = !0),
      (i.attributes.color.needsUpdate = !0)));
}
