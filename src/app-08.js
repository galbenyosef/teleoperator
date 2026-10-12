// app 08 — math
// Lines 2136-2362 of readable/app.pretty.js (statement-aligned).
function Cit(i) {
  switch (i.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return Eh;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return Gf;
    case "color":
      return og;
    case "quaternion":
      return Th;
    case "bool":
    case "boolean":
      return zh;
    case "string":
      return Ah;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + i);
}
function Lit(i) {
  if (i.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  let t = Cit(i.type);
  if (i.times === void 0) {
    let s = [],
      n = [];
    (cD(i.keys, s, n, "value"), (i.times = s), (i.values = n));
  }
  let e;
  return (
    t.parse !== void 0
      ? (e = t.parse(i))
      : (e = new t(i.name, i.times, i.values, i.interpolation)),
    Xv(i.settings) &&
      (e.settings = {
        inTangents: mc(i.settings.inTangents, Float32Array),
        outTangents: mc(i.settings.outTangents, Float32Array),
      }),
    e
  );
}
function HO(i) {
  try {
    let t = i.slice(i.indexOf(":") + 1);
    return new URL(t).protocol === "blob:";
  } catch {
    return !1;
  }
}
function Fit() {
  this._document.hidden === !1 && this.reset();
}
function JO(i, t) {
  return i.distance - t.distance;
}
function C9(i, t, e, s) {
  let n = !0;
  if (
    (i.layers.test(t.layers) && i.raycast(t, e) === !1 && (n = !1),
    n === !0 && s === !0)
  ) {
    let o = i.children;
    for (let a = 0, r = o.length; a < r; a++) C9(o[a], t, e, !0);
  }
}
function fD(i) {
  let t = [];
  i.isBone === !0 && t.push(i);
  for (let e = 0; e < i.children.length; e++) t.push(...fD(i.children[e]));
  return t;
}
function ua(i, t, e, s, n, o, a) {
  i8.set(n, o, a).unproject(s);
  let r = t[i];
  if (r !== void 0) {
    let l = e.getAttribute("position");
    for (let c = 0, h = r.length; c < h; c++) l.setXYZ(r[c], i8.x, i8.y, i8.z);
  }
}
function Jit(i, t) {
  let e = i.image && i.image.width ? i.image.width / i.image.height : 1;
  return (
    e > t
      ? ((i.repeat.x = 1),
        (i.repeat.y = e / t),
        (i.offset.x = 0),
        (i.offset.y = (1 - i.repeat.y) / 2))
      : ((i.repeat.x = t / e),
        (i.repeat.y = 1),
        (i.offset.x = (1 - i.repeat.x) / 2),
        (i.offset.y = 0)),
    i
  );
}
function Zit(i, t) {
  let e = i.image && i.image.width ? i.image.width / i.image.height : 1;
  return (
    e > t
      ? ((i.repeat.x = t / e),
        (i.repeat.y = 1),
        (i.offset.x = (1 - i.repeat.x) / 2),
        (i.offset.y = 0))
      : ((i.repeat.x = 1),
        (i.repeat.y = e / t),
        (i.offset.x = 0),
        (i.offset.y = (1 - i.repeat.y) / 2)),
    i
  );
}
function Qit(i) {
  return (
    (i.repeat.x = 1),
    (i.repeat.y = 1),
    (i.offset.x = 0),
    (i.offset.y = 0),
    i
  );
}
function P6(i, t, e, s) {
  let n = tot(s);
  switch (e) {
    case z6:
      return i * t;
    case K3:
      return ((i * t) / n.components) * n.byteLength;
    case mg:
      return ((i * t) / n.components) * n.byteLength;
    case Kf:
      return ((i * t * 2) / n.components) * n.byteLength;
    case Y3:
      return ((i * t * 2) / n.components) * n.byteLength;
    case E6:
      return ((i * t * 3) / n.components) * n.byteLength;
    case no:
      return ((i * t * 4) / n.components) * n.byteLength;
    case J3:
      return ((i * t * 4) / n.components) * n.byteLength;
    case gg:
    case bg:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case xg:
    case vg:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Q3:
    case e5:
      return (Math.max(i, 16) * Math.max(t, 8)) / 4;
    case Z3:
    case t5:
      return (Math.max(i, 8) * Math.max(t, 8)) / 2;
    case s5:
    case n5:
    case o5:
    case a5:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case i5:
    case yg:
    case r5:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case l5:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case c5:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case h5:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case f5:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case u5:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case d5:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case p5:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case m5:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case g5:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case b5:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case x5:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case v5:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case y5:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case w5:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case M5:
    case S5:
    case k5:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case _5:
    case z5:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case wg:
    case E5:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${e} format.`);
}
function tot(i) {
  switch (i) {
    case r0:
    case M6:
      return { byteLength: 1, components: 1 };
    case H1:
    case S6:
    case aa:
      return { byteLength: 2, components: 1 };
    case $3:
    case X3:
      return { byteLength: 2, components: 4 };
    case Q0:
    case V3:
    case La:
      return { byteLength: 4, components: 1 };
    case k6:
    case _6:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`);
}
