// app 08 — math
// Lines 2169-2395 of readable/app.pretty.js (statement-aligned).
function Zrt(o) {
  switch (o.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return ef;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return Su;
    case "color":
      return Kg;
    case "quaternion":
      return sf;
    case "bool":
    case "boolean":
      return tf;
    case "string":
      return nf;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + o);
}
function Qrt(o) {
  if (o.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  let t = Zrt(o.type);
  if (o.times === void 0) {
    let s = [],
      n = [];
    (uG(o.keys, s, n, "value"), (o.times = s), (o.values = n));
  }
  let e;
  return (
    t.parse !== void 0
      ? (e = t.parse(o))
      : (e = new t(o.name, o.times, o.values, o.interpolation)),
    W3(o.settings) &&
      (e.settings = {
        inTangents: Wc(o.settings.inTangents, Float32Array),
        outTangents: Wc(o.settings.outTangents, Float32Array),
      }),
    e
  );
}
function GD(o) {
  try {
    let t = o.slice(o.indexOf(":") + 1);
    return new URL(t).protocol === "blob:";
  } catch {
    return !1;
  }
}
function e0t() {
  this._document.hidden === !1 && this.reset();
}
function tU(o, t) {
  return o.distance - t.distance;
}
function oA(o, t, e, s) {
  let n = !0;
  if (
    (o.layers.test(t.layers) && o.raycast(t, e) === !1 && (n = !1),
    n === !0 && s === !0)
  ) {
    let i = o.children;
    for (let a = 0, r = i.length; a < r; a++) oA(i[a], t, e, !0);
  }
}
function pG(o) {
  let t = [];
  o.isBone === !0 && t.push(o);
  for (let e = 0; e < o.children.length; e++) t.push(...pG(o.children[e]));
  return t;
}
function Sa(o, t, e, s, n, i, a) {
  a6.set(n, i, a).unproject(s);
  let r = t[o];
  if (r !== void 0) {
    let l = e.getAttribute("position");
    for (let c = 0, h = r.length; c < h; c++) l.setXYZ(r[c], a6.x, a6.y, a6.z);
  }
}
function b0t(o, t) {
  let e = o.image && o.image.width ? o.image.width / o.image.height : 1;
  return (
    e > t
      ? ((o.repeat.x = 1),
        (o.repeat.y = e / t),
        (o.offset.x = 0),
        (o.offset.y = (1 - o.repeat.y) / 2))
      : ((o.repeat.x = t / e),
        (o.repeat.y = 1),
        (o.offset.x = (1 - o.repeat.x) / 2),
        (o.offset.y = 0)),
    o
  );
}
function x0t(o, t) {
  let e = o.image && o.image.width ? o.image.width / o.image.height : 1;
  return (
    e > t
      ? ((o.repeat.x = t / e),
        (o.repeat.y = 1),
        (o.offset.x = (1 - o.repeat.x) / 2),
        (o.offset.y = 0))
      : ((o.repeat.x = 1),
        (o.repeat.y = e / t),
        (o.offset.x = 0),
        (o.offset.y = (1 - o.repeat.y) / 2)),
    o
  );
}
function v0t(o) {
  return (
    (o.repeat.x = 1),
    (o.repeat.y = 1),
    (o.offset.x = 0),
    (o.offset.y = 0),
    o
  );
}
function LS(o, t, e, s) {
  let n = y0t(s);
  switch (e) {
    case TS:
      return o * t;
    case qy:
      return ((o * t) / n.components) * n.byteLength;
    case ob:
      return ((o * t) / n.components) * n.byteLength;
    case Au:
      return ((o * t * 2) / n.components) * n.byteLength;
    case jy:
      return ((o * t * 2) / n.components) * n.byteLength;
    case RS:
      return ((o * t * 3) / n.components) * n.byteLength;
    case go:
      return ((o * t * 4) / n.components) * n.byteLength;
    case $y:
      return ((o * t * 4) / n.components) * n.byteLength;
    case ab:
    case rb:
      return Math.floor((o + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case lb:
    case cb:
      return Math.floor((o + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ky:
    case Jy:
      return (Math.max(o, 16) * Math.max(t, 8)) / 4;
    case Xy:
    case Yy:
      return (Math.max(o, 8) * Math.max(t, 8)) / 2;
    case Zy:
    case Qy:
    case e5:
    case s5:
      return Math.floor((o + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case t5:
    case hb:
    case n5:
      return Math.floor((o + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case i5:
      return Math.floor((o + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case o5:
      return Math.floor((o + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case a5:
      return Math.floor((o + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case r5:
      return Math.floor((o + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case l5:
      return Math.floor((o + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case c5:
      return Math.floor((o + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case h5:
      return Math.floor((o + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case f5:
      return Math.floor((o + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case u5:
      return Math.floor((o + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case d5:
      return Math.floor((o + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case p5:
      return Math.floor((o + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case m5:
      return Math.floor((o + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case g5:
      return Math.floor((o + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case b5:
      return Math.floor((o + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case x5:
    case v5:
    case y5:
      return Math.ceil(o / 4) * Math.ceil(t / 4) * 16;
    case w5:
    case M5:
      return Math.ceil(o / 4) * Math.ceil(t / 4) * 8;
    case fb:
    case S5:
      return Math.ceil(o / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${e} format.`);
}
function y0t(o) {
  switch (o) {
    case M0:
    case kS:
      return { byteLength: 1, components: 1 };
    case Mm:
    case zS:
    case ga:
      return { byteLength: 2, components: 1 };
    case Vy:
    case Wy:
      return { byteLength: 2, components: 4 };
    case Ml:
    case Gy:
    case qa:
      return { byteLength: 4, components: 1 };
    case _S:
    case ES:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`);
}
