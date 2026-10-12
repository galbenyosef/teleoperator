// app 07 — next
// Lines 1805-2135 of readable/app.pretty.js (statement-aligned).
function vit(i, t) {
  let e = i;
  do {
    if (
      e.i !== i.i &&
      e.next.i !== i.i &&
      e.i !== t.i &&
      e.next.i !== t.i &&
      aD(e, e.next, i, t)
    )
      return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function m3(i, t) {
  return jo(i.prev, i, i.next) < 0
    ? jo(i, t, i.next) >= 0 && jo(i, i.prev, t) >= 0
    : jo(i, t, i.prev) < 0 || jo(i, i.next, t) < 0;
}
function yit(i, t) {
  let e = i,
    s = !1,
    n = (i.x + t.x) / 2,
    o = (i.y + t.y) / 2;
  do
    (e.y > o != e.next.y > o &&
      e.next.y !== e.y &&
      n < ((e.next.x - e.x) * (o - e.y)) / (e.next.y - e.y) + e.x &&
      (s = !s),
      (e = e.next));
  while (e !== i);
  return s;
}
function rD(i, t) {
  let e = k9(i.i, i.x, i.y),
    s = k9(t.i, t.x, t.y),
    n = i.next,
    o = t.prev;
  return (
    (i.next = t),
    (t.prev = i),
    (e.next = n),
    (n.prev = e),
    (s.next = e),
    (e.prev = s),
    (o.next = s),
    (s.prev = o),
    s
  );
}
function CO(i, t, e, s) {
  let n = k9(i, t, e);
  return (
    s
      ? ((n.next = s.next), (n.prev = s), (s.next.prev = n), (s.next = n))
      : ((n.prev = n), (n.next = n)),
    n
  );
}
function g3(i) {
  ((i.next.prev = i.prev),
    (i.prev.next = i.next),
    i.prevZ && (i.prevZ.nextZ = i.nextZ),
    i.nextZ && (i.nextZ.prevZ = i.prevZ));
}
function k9(i, t, e) {
  return {
    i,
    x: t,
    y: e,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
    steiner: !1,
  };
}
function wit(i, t, e, s) {
  let n = 0;
  for (let o = t, a = e - s; o < e; o += s)
    ((n += (i[a] - i[o]) * (i[o + 1] + i[a + 1])), (a = o));
  return n;
}
function LO(i) {
  let t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function IO(i, t) {
  for (let e = 0; e < t.length; e++) (i.push(t[e].x), i.push(t[e].y));
}
function Sit(i, t, e) {
  if (((e.shapes = []), Array.isArray(i)))
    for (let s = 0, n = i.length; s < n; s++) {
      let o = i[s];
      e.shapes.push(o.uuid);
    }
  else e.shapes.push(i.uuid);
  return (
    (e.options = Object.assign({}, t)),
    t.extrudePath !== void 0 &&
      (e.options.extrudePath = t.extrudePath.toJSON()),
    e
  );
}
function kit(i, t) {
  if (((t.shapes = []), Array.isArray(i)))
    for (let e = 0, s = i.length; e < s; e++) {
      let n = i[e];
      t.shapes.push(n.uuid);
    }
  else t.shapes.push(i.uuid);
  return t;
}
function FO(i, t, e) {
  let s = `${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,
    n = `${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;
  return e.has(s) === !0 || e.has(n) === !0 ? !1 : (e.add(s), e.add(n), !0);
}
function G1(i) {
  let t = {};
  for (let e in i) {
    t[e] = {};
    for (let s in i[e]) {
      let n = i[e][s];
      if (BO(n))
        n.isRenderTargetTexture
          ? (As(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
            ),
            (t[e][s] = null))
          : (t[e][s] = n.clone());
      else if (Array.isArray(n))
        if (BO(n[0])) {
          let o = [];
          for (let a = 0, r = n.length; a < r; a++) o[a] = n[a].clone();
          t[e][s] = o;
        } else t[e][s] = n.slice();
      else t[e][s] = n;
    }
  }
  return t;
}
function Ir(i) {
  let t = {};
  for (let e = 0; e < i.length; e++) {
    let s = G1(i[e]);
    for (let n in s) t[n] = s[n];
  }
  return t;
}
function BO(i) {
  return (
    i &&
    (i.isColor ||
      i.isMatrix3 ||
      i.isMatrix4 ||
      i.isVector2 ||
      i.isVector3 ||
      i.isVector4 ||
      i.isTexture ||
      i.isQuaternion)
  );
}
function _it(i) {
  let t = [];
  for (let e = 0; e < i.length; e++) t.push(i[e].clone());
  return t;
}
function vA(i) {
  let t = i.getRenderTarget();
  return t === null
    ? i.outputColorSpace
    : t.isXRRenderTarget === !0
      ? t.texture.colorSpace
      : jn.workingColorSpace;
}
function mc(i, t) {
  return !i || i.constructor === t
    ? i
    : typeof t.BYTES_PER_ELEMENT == "number"
      ? new t(i)
      : Array.prototype.slice.call(i);
}
function Xv(i) {
  return i !== void 0 && i.inTangents !== void 0 && i.outTangents !== void 0;
}
function lD(i) {
  function t(n, o) {
    return i[n] - i[o];
  }
  let e = i.length,
    s = new Array(e);
  for (let n = 0; n !== e; ++n) s[n] = n;
  return (s.sort(t), s);
}
function z9(i, t, e) {
  let s = i.length,
    n = new i.constructor(s);
  for (let o = 0, a = 0; a !== s; ++o) {
    let r = e[o] * t;
    for (let l = 0; l !== t; ++l) n[a++] = i[r + l];
  }
  return n;
}
function cD(i, t, e, s) {
  let n = 1,
    o = i[0];
  for (; o !== void 0 && o[s] === void 0;) o = i[n++];
  if (o === void 0) return;
  let a = o[s];
  if (a !== void 0)
    if (Array.isArray(a))
      do
        ((a = o[s]),
          a !== void 0 && (t.push(o.time), e.push(...a)),
          (o = i[n++]));
      while (o !== void 0);
    else if (a.toArray !== void 0)
      do
        ((a = o[s]),
          a !== void 0 && (t.push(o.time), a.toArray(e, e.length)),
          (o = i[n++]));
      while (o !== void 0);
    else
      do
        ((a = o[s]), a !== void 0 && (t.push(o.time), e.push(a)), (o = i[n++]));
      while (o !== void 0);
}
function Tit(i, t, e, s, n = 30) {
  let o = i.clone();
  o.name = t;
  let a = [];
  for (let l = 0; l < o.tracks.length; ++l) {
    let c = o.tracks[l],
      h = c.getValueSize(),
      f = [],
      u = [];
    for (let d = 0; d < c.times.length; ++d) {
      let p = c.times[d] * n;
      if (!(p < e || p >= s)) {
        f.push(c.times[d]);
        for (let m = 0; m < h; ++m) u.push(c.values[d * h + m]);
      }
    }
    f.length !== 0 &&
      ((c.times = mc(f, c.times.constructor)),
      (c.values = mc(u, c.values.constructor)),
      a.push(c));
  }
  o.tracks = a;
  let r = 1 / 0;
  for (let l = 0; l < o.tracks.length; ++l)
    r > o.tracks[l].times[0] && (r = o.tracks[l].times[0]);
  for (let l = 0; l < o.tracks.length; ++l) o.tracks[l].shift(-1 * r);
  return (o.resetDuration(), o);
}
function Ait(i, t = 0, e = i, s = 30) {
  s <= 0 && (s = 30);
  let n = e.tracks.length,
    o = t / s;
  for (let a = 0; a < n; ++a) {
    let r = e.tracks[a],
      l = r.ValueTypeName;
    if (l === "bool" || l === "string") continue;
    let c = i.tracks.find(function (b) {
      return b.name === r.name && b.ValueTypeName === l;
    });
    if (c === void 0) continue;
    let h = 0,
      f = r.getValueSize();
    r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline &&
      (h = f / 3);
    let u = 0,
      d = c.getValueSize();
    c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline &&
      (u = d / 3);
    let p = r.times.length - 1,
      m;
    if (o <= r.times[0]) {
      let b = h,
        x = f - h;
      m = r.values.slice(b, x);
    } else if (o >= r.times[p]) {
      let b = p * f + h,
        x = b + f - h;
      m = r.values.slice(b, x);
    } else {
      let b = r.createInterpolant(),
        x = h,
        v = f - h;
      (b.evaluate(o), (m = b.resultBuffer.slice(x, v)));
    }
    l === "quaternion" &&
      new wn().fromArray(m).normalize().conjugate().toArray(m);
    let g = c.times.length;
    for (let b = 0; b < g; ++b) {
      let x = b * d + u;
      if (l === "quaternion")
        wn.multiplyQuaternionsFlat(c.values, x, m, 0, c.values, x);
      else {
        let v = d - u * 2;
        for (let y = 0; y < v; ++y) c.values[x + y] -= m[y];
      }
    }
  }
  return ((i.blendMode = T6), i);
}
function hD(i, t, e, s, n) {
  let o = 1 - i;
  return o * o * o * t + 3 * o * o * i * e + 3 * o * i * i * s + i * i * i * n;
}
function Rit(i, t, e, s, n) {
  let o = 1 - i;
  return 3 * o * o * (e - t) + 6 * o * i * (s - e) + 3 * i * i * (n - s);
}
function Pit(i, t, e, s, n) {
  let o = (i - t) / (n - t);
  for (let a = 0; a < 8; a++) {
    let r = hD(o, t, e, s, n) - i;
    if (Math.abs(r) < 1e-10) break;
    let l = Rit(o, t, e, s, n);
    if (Math.abs(l) < 1e-10) break;
    o = Math.max(0, Math.min(1, o - r / l));
  }
  return o;
}
function OO(i, t) {
  for (let e = 0, s = i.length; e !== s; e += 2) i[e] *= t;
}
