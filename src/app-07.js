// app 07 — next
// Lines 1838-2168 of readable/app.pretty.js (statement-aligned).
function Hrt(o, t) {
  let e = o;
  do {
    if (
      e.i !== o.i &&
      e.next.i !== o.i &&
      e.i !== t.i &&
      e.next.i !== t.i &&
      cG(e, e.next, o, t)
    )
      return !0;
    e = e.next;
  } while (e !== o);
  return !1;
}
function fy(o, t) {
  return ea(o.prev, o, o.next) < 0
    ? ea(o, t, o.next) >= 0 && ea(o, o.prev, t) >= 0
    : ea(o, t, o.prev) < 0 || ea(o, o.next, t) < 0;
}
function Drt(o, t) {
  let e = o,
    s = !1,
    n = (o.x + t.x) / 2,
    i = (o.y + t.y) / 2;
  do
    (e.y > i != e.next.y > i &&
      e.next.y !== e.y &&
      n < ((e.next.x - e.x) * (i - e.y)) / (e.next.y - e.y) + e.x &&
      (s = !s),
      (e = e.next));
  while (e !== o);
  return s;
}
function hG(o, t) {
  let e = JR(o.i, o.x, o.y),
    s = JR(t.i, t.x, t.y),
    n = o.next,
    i = t.prev;
  return (
    (o.next = t),
    (t.prev = o),
    (e.next = n),
    (n.prev = e),
    (s.next = e),
    (e.prev = s),
    (i.next = s),
    (s.prev = i),
    s
  );
}
function FD(o, t, e, s) {
  let n = JR(o, t, e);
  return (
    s
      ? ((n.next = s.next), (n.prev = s), (s.next.prev = n), (s.next = n))
      : ((n.prev = n), (n.next = n)),
    n
  );
}
function uy(o) {
  ((o.next.prev = o.prev),
    (o.prev.next = o.next),
    o.prevZ && (o.prevZ.nextZ = o.nextZ),
    o.nextZ && (o.nextZ.prevZ = o.prevZ));
}
function JR(o, t, e) {
  return {
    i: o,
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
function Urt(o, t, e, s) {
  let n = 0;
  for (let i = t, a = e - s; i < e; i += s)
    ((n += (o[a] - o[i]) * (o[i + 1] + o[a + 1])), (a = i));
  return n;
}
function OD(o) {
  let t = o.length;
  t > 2 && o[t - 1].equals(o[0]) && o.pop();
}
function BD(o, t) {
  for (let e = 0; e < t.length; e++) (o.push(t[e].x), o.push(t[e].y));
}
function Vrt(o, t, e) {
  if (((e.shapes = []), Array.isArray(o)))
    for (let s = 0, n = o.length; s < n; s++) {
      let i = o[s];
      e.shapes.push(i.uuid);
    }
  else e.shapes.push(o.uuid);
  return (
    (e.options = Object.assign({}, t)),
    t.extrudePath !== void 0 &&
      (e.options.extrudePath = t.extrudePath.toJSON()),
    e
  );
}
function Wrt(o, t) {
  if (((t.shapes = []), Array.isArray(o)))
    for (let e = 0, s = o.length; e < s; e++) {
      let n = o[e];
      t.shapes.push(n.uuid);
    }
  else t.shapes.push(o.uuid);
  return t;
}
function ND(o, t, e) {
  let s = `${o.x},${o.y},${o.z}-${t.x},${t.y},${t.z}`,
    n = `${t.x},${t.y},${t.z}-${o.x},${o.y},${o.z}`;
  return e.has(s) === !0 || e.has(n) === !0 ? !1 : (e.add(s), e.add(n), !0);
}
function zm(o) {
  let t = {};
  for (let e in o) {
    t[e] = {};
    for (let s in o[e]) {
      let n = o[e][s];
      if (DD(n))
        n.isRenderTargetTexture
          ? (Cs(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
            ),
            (t[e][s] = null))
          : (t[e][s] = n.clone());
      else if (Array.isArray(n))
        if (DD(n[0])) {
          let i = [];
          for (let a = 0, r = n.length; a < r; a++) i[a] = n[a].clone();
          t[e][s] = i;
        } else t[e][s] = n.slice();
      else t[e][s] = n;
    }
  }
  return t;
}
function t0(o) {
  let t = {};
  for (let e = 0; e < o.length; e++) {
    let s = zm(o[e]);
    for (let n in s) t[n] = s[n];
  }
  return t;
}
function DD(o) {
  return (
    o &&
    (o.isColor ||
      o.isMatrix3 ||
      o.isMatrix4 ||
      o.isVector2 ||
      o.isVector3 ||
      o.isVector4 ||
      o.isTexture ||
      o.isQuaternion)
  );
}
function qrt(o) {
  let t = [];
  for (let e = 0; e < o.length; e++) t.push(o[e].clone());
  return t;
}
function jA(o) {
  let t = o.getRenderTarget();
  return t === null
    ? o.outputColorSpace
    : t.isXRRenderTarget === !0
      ? t.texture.colorSpace
      : Kn.workingColorSpace;
}
function Wc(o, t) {
  return !o || o.constructor === t
    ? o
    : typeof t.BYTES_PER_ELEMENT == "number"
      ? new t(o)
      : Array.prototype.slice.call(o);
}
function W3(o) {
  return o !== void 0 && o.inTangents !== void 0 && o.outTangents !== void 0;
}
function fG(o) {
  function t(n, i) {
    return o[n] - o[i];
  }
  let e = o.length,
    s = new Array(e);
  for (let n = 0; n !== e; ++n) s[n] = n;
  return (s.sort(t), s);
}
function QR(o, t, e) {
  let s = o.length,
    n = new o.constructor(s);
  for (let i = 0, a = 0; a !== s; ++i) {
    let r = e[i] * t;
    for (let l = 0; l !== t; ++l) n[a++] = o[r + l];
  }
  return n;
}
function uG(o, t, e, s) {
  let n = 1,
    i = o[0];
  for (; i !== void 0 && i[s] === void 0;) i = o[n++];
  if (i === void 0) return;
  let a = i[s];
  if (a !== void 0)
    if (Array.isArray(a))
      do
        ((a = i[s]),
          a !== void 0 && (t.push(i.time), e.push(...a)),
          (i = o[n++]));
      while (i !== void 0);
    else if (a.toArray !== void 0)
      do
        ((a = i[s]),
          a !== void 0 && (t.push(i.time), a.toArray(e, e.length)),
          (i = o[n++]));
      while (i !== void 0);
    else
      do
        ((a = i[s]), a !== void 0 && (t.push(i.time), e.push(a)), (i = o[n++]));
      while (i !== void 0);
}
function Xrt(o, t, e, s, n = 30) {
  let i = o.clone();
  i.name = t;
  let a = [];
  for (let l = 0; l < i.tracks.length; ++l) {
    let c = i.tracks[l],
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
      ((c.times = Wc(f, c.times.constructor)),
      (c.values = Wc(u, c.values.constructor)),
      a.push(c));
  }
  i.tracks = a;
  let r = 1 / 0;
  for (let l = 0; l < i.tracks.length; ++l)
    r > i.tracks[l].times[0] && (r = i.tracks[l].times[0]);
  for (let l = 0; l < i.tracks.length; ++l) i.tracks[l].shift(-1 * r);
  return (i.resetDuration(), i);
}
function Krt(o, t = 0, e = o, s = 30) {
  s <= 0 && (s = 30);
  let n = e.tracks.length,
    i = t / s;
  for (let a = 0; a < n; ++a) {
    let r = e.tracks[a],
      l = r.ValueTypeName;
    if (l === "bool" || l === "string") continue;
    let c = o.tracks.find(function (b) {
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
    if (i <= r.times[0]) {
      let b = h,
        v = f - h;
      m = r.values.slice(b, v);
    } else if (i >= r.times[p]) {
      let b = p * f + h,
        v = b + f - h;
      m = r.values.slice(b, v);
    } else {
      let b = r.createInterpolant(),
        v = h,
        x = f - h;
      (b.evaluate(i), (m = b.resultBuffer.slice(v, x)));
    }
    l === "quaternion" &&
      new tn().fromArray(m).normalize().conjugate().toArray(m);
    let g = c.times.length;
    for (let b = 0; b < g; ++b) {
      let v = b * d + u;
      if (l === "quaternion")
        tn.multiplyQuaternionsFlat(c.values, v, m, 0, c.values, v);
      else {
        let x = d - u * 2;
        for (let y = 0; y < x; ++y) c.values[v + y] -= m[y];
      }
    }
  }
  return ((o.blendMode = AS), o);
}
function dG(o, t, e, s, n) {
  let i = 1 - o;
  return i * i * i * t + 3 * i * i * o * e + 3 * i * o * o * s + o * o * o * n;
}
function Yrt(o, t, e, s, n) {
  let i = 1 - o;
  return 3 * i * i * (e - t) + 6 * i * o * (s - e) + 3 * o * o * (n - s);
}
function Jrt(o, t, e, s, n) {
  let i = (o - t) / (n - t);
  for (let a = 0; a < 8; a++) {
    let r = dG(i, t, e, s, n) - o;
    if (Math.abs(r) < 1e-10) break;
    let l = Yrt(i, t, e, s, n);
    if (Math.abs(l) < 1e-10) break;
    i = Math.max(0, Math.min(1, i - r / l));
  }
  return i;
}
function UD(o, t) {
  for (let e = 0, s = o.length; e !== s; e += 2) o[e] *= t;
}
