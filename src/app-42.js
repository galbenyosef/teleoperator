// app 42 — bloom
// Lines 51034-51076 of readable/app.pretty.js (statement-aligned).
function kct(i) {
  let t = i?.prototype;
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
    let o = null,
      a = null,
      r = null;
    for (let f of this.passes)
      f.enabled &&
        (f.scene?.isScene &&
          f.camera?.isCamera &&
          !o &&
          ((o = f.scene), (a = f.camera)),
        f.strength !== void 0 &&
          f.radius !== void 0 &&
          f.threshold !== void 0 &&
          (r = f));
    if (!o) return;
    let l = n.bloom,
      c = n.glareSpread,
      h = n._composerThr;
    (r &&
      ((n.bloom = r.strength * 3),
      (n.glareSpread = 2 + 18 * r.radius),
      (n._composerThr = r.threshold)),
      n.render(o, a),
      (n.bloom = l),
      (n.glareSpread = c),
      (n._composerThr = h));
  }),
    (t.__mindblown = !0));
}
