// app 41 — bloom
// Lines 51202-51244 of readable/app.pretty.js (statement-aligned).
function Wut(o) {
  let t = o?.prototype;
  if (!t || t.__mindblown) return;
  let e = t.render;
  ((t.render = function (s) {
    let n = this.renderer;
    if (n?._fallback) {
      this.renderer = n._fallback;
      try {
        return e.call(this, s);
      } finally {
        this.renderer = n;
      }
    }
    if (!n?.isMindblownRenderer) return e.call(this, s);
    let i = null,
      a = null,
      r = null;
    for (let f of this.passes)
      f.enabled &&
        (f.scene?.isScene &&
          f.camera?.isCamera &&
          !i &&
          ((i = f.scene), (a = f.camera)),
        f.strength !== void 0 &&
          f.radius !== void 0 &&
          f.threshold !== void 0 &&
          (r = f));
    if (!i) return;
    let l = n.bloom,
      c = n.glareSpread,
      h = n._composerThr;
    (r &&
      ((n.bloom = r.strength * 3),
      (n.glareSpread = 2 + 18 * r.radius),
      (n._composerThr = r.threshold)),
      n.render(i, a),
      (n.bloom = l),
      (n.glareSpread = c),
      (n._composerThr = h));
  }),
    (t.__mindblown = !0));
}
