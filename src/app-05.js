// app 05 — math
// Lines 1127-1466 of readable/app.pretty.js (statement-aligned).
function Of(i) {
  return i < 0.04045
    ? i * 0.0773993808
    : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function U2(i) {
  return i < 0.0031308 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
function UT(i) {
  return (typeof HTMLImageElement < "u" && i instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && i instanceof ImageBitmap)
    ? s3.getDataURL(i)
    : i.data
      ? {
          data: Array.from(i.data),
          width: i.width,
          height: i.height,
          type: i.data.constructor.name,
        }
      : (As("Texture: Unable to serialize Texture."), {});
}
function qT(i, t, e) {
  return (
    e < 0 && (e += 1),
    e > 1 && (e -= 1),
    e < 1 / 6
      ? i + (t - i) * 6 * e
      : e < 1 / 2
        ? t
        : e < 2 / 3
          ? i + (t - i) * 6 * (2 / 3 - e)
          : i
  );
}
function ZT(i, t, e, s, n) {
  for (let o = 0, a = i.length - 3; o <= a; o += 3) {
    t1.fromArray(i, o);
    let r = n.x * Math.abs(t1.x) + n.y * Math.abs(t1.y) + n.z * Math.abs(t1.z),
      l = t.dot(t1),
      c = e.dot(t1),
      h = s.dot(t1);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > r) return !1;
  }
  return !0;
}
function Lnt() {
  let i = new ArrayBuffer(4),
    t = new Float32Array(i),
    e = new Uint32Array(i),
    s = new Uint32Array(512),
    n = new Uint32Array(512);
  for (let l = 0; l < 256; ++l) {
    let c = l - 127;
    c < -27
      ? ((s[l] = 0), (s[l | 256] = 32768), (n[l] = 24), (n[l | 256] = 24))
      : c < -14
        ? ((s[l] = 1024 >> (-c - 14)),
          (s[l | 256] = (1024 >> (-c - 14)) | 32768),
          (n[l] = -c - 1),
          (n[l | 256] = -c - 1))
        : c <= 15
          ? ((s[l] = (c + 15) << 10),
            (s[l | 256] = ((c + 15) << 10) | 32768),
            (n[l] = 13),
            (n[l | 256] = 13))
          : c < 128
            ? ((s[l] = 31744),
              (s[l | 256] = 64512),
              (n[l] = 24),
              (n[l | 256] = 24))
            : ((s[l] = 31744),
              (s[l | 256] = 64512),
              (n[l] = 13),
              (n[l | 256] = 13));
  }
  let o = new Uint32Array(2048),
    a = new Uint32Array(64),
    r = new Uint32Array(64);
  for (let l = 1; l < 1024; ++l) {
    let c = l << 13,
      h = 0;
    for (; (c & 8388608) === 0;) ((c <<= 1), (h -= 8388608));
    ((c &= -8388609), (h += 947912704), (o[l] = c | h));
  }
  for (let l = 1024; l < 2048; ++l) o[l] = 939524096 + ((l - 1024) << 13);
  for (let l = 1; l < 31; ++l) a[l] = l << 23;
  ((a[31] = 1199570944), (a[32] = 2147483648));
  for (let l = 33; l < 63; ++l) a[l] = 2147483648 + ((l - 32) << 23);
  a[63] = 3347054592;
  for (let l = 1; l < 64; ++l) l !== 32 && (r[l] = 1024);
  return {
    floatView: t,
    uint32View: e,
    baseTable: s,
    shiftTable: n,
    mantissaTable: o,
    exponentTable: a,
    offsetTable: r,
  };
}
function b0(i) {
  (Math.abs(i) > 65504 && As("DataUtils.toHalfFloat(): Value out of range."),
    (i = Tn(i, -65504, 65504)),
    (Bf.floatView[0] = i));
  let t = Bf.uint32View[0],
    e = (t >> 23) & 511;
  return Bf.baseTable[e] + ((t & 8388607) >> Bf.shiftTable[e]);
}
function Uv(i) {
  let t = i >> 10;
  return (
    (Bf.uint32View[0] =
      Bf.mantissaTable[Bf.offsetTable[t] + (i & 1023)] + Bf.exponentTable[t]),
    Bf.floatView[0]
  );
}
function E4(i, t, e, s, n, o) {
  (L2.subVectors(i, e).addScalar(0.5).multiply(s),
    n !== void 0
      ? ((Iv.x = o * L2.x - n * L2.y), (Iv.y = n * L2.x + o * L2.y))
      : Iv.copy(L2),
    i.copy(t),
    (i.x += Iv.x),
    (i.y += Iv.y),
    i.applyMatrix4(nD));
}
function Dnt(i, t, e, s, n, o, a, r) {
  let l;
  if (
    (t.side === ia
      ? (l = s.intersectTriangle(a, o, n, !0, r))
      : (l = s.intersectTriangle(n, o, a, t.side === Fa, r)),
    l === null)
  )
    return null;
  (N4.copy(r), N4.applyMatrix4(i.matrixWorld));
  let c = e.ray.origin.distanceTo(N4);
  return c < e.near || c > e.far
    ? null
    : { distance: c, point: N4.clone(), object: i };
}
function B4(i, t, e, s, n, o, a, r, l, c) {
  (i.getVertexPosition(r, C4),
    i.getVertexPosition(l, L4),
    i.getVertexPosition(c, I4));
  let h = Dnt(i, t, e, s, C4, L4, I4, dO);
  if (h) {
    let f = new xt();
    (gc.getBarycoord(dO, C4, L4, I4, f),
      n && (h.uv = gc.getInterpolatedAttribute(n, r, l, c, f, new Re())),
      o && (h.uv1 = gc.getInterpolatedAttribute(o, r, l, c, f, new Re())),
      a &&
        ((h.normal = gc.getInterpolatedAttribute(a, r, l, c, f, new xt())),
        h.normal.dot(s.direction) > 0 && h.normal.multiplyScalar(-1)));
    let u = { a: r, b: l, c, normal: new xt(), materialIndex: 0 };
    (gc.getNormal(C4, L4, I4, u.normal), (h.face = u), (h.barycoord = f));
  }
  return h;
}
function r9(i, t) {
  return i - t;
}
function jnt(i, t) {
  return i.z - t.z;
}
function Vnt(i, t) {
  return t.z - i.z;
}
function Jnt(i, t, e = 0) {
  let s = t.itemSize;
  if (
    i.isInterleavedBufferAttribute ||
    i.array.constructor !== t.array.constructor
  ) {
    let n = i.count;
    for (let o = 0; o < n; o++)
      for (let a = 0; a < s; a++)
        t.setComponent(o + e, a, i.getComponent(o, a));
  } else t.array.set(i.array, e * s);
  t.needsUpdate = !0;
}
function i1(i, t) {
  if (i.constructor !== t.constructor) {
    let e = Math.min(i.length, t.length);
    for (let s = 0; s < e; s++) t[s] = i[s];
  } else {
    let e = Math.min(i.length, t.length);
    t.set(new i.constructor(i.buffer, 0, e));
  }
}
function q4(i, t, e, s, n, o, a) {
  let r = i.geometry.attributes.position;
  if (
    (x8.fromBufferAttribute(r, n),
    v8.fromBufferAttribute(r, o),
    e.distanceSqToSegment(x8, v8, c9, kO) > s)
  )
    return;
  c9.applyMatrix4(i.matrixWorld);
  let c = t.ray.origin.distanceTo(c9);
  if (!(c < t.near || c > t.far))
    return {
      distance: c,
      point: kO.clone().applyMatrix4(i.matrixWorld),
      index: a,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i,
    };
}
function TO(i, t, e, s, n, o, a) {
  let r = M9.distanceSqToPoint(i);
  if (r < e) {
    let l = new xt();
    (M9.closestPointToPoint(i, l), l.applyMatrix4(s));
    let c = n.ray.origin.distanceTo(l);
    if (c < n.near || c > n.far) return;
    o.push({
      distance: c,
      distanceToRay: Math.sqrt(r),
      point: l,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: a,
    });
  }
}
function xA() {
  let i = 0,
    t = 0,
    e = 0,
    s = 0;
  function n(o, a, r, l) {
    ((i = o),
      (t = r),
      (e = -3 * o + 3 * a - 2 * r - l),
      (s = 2 * o - 2 * a + r + l));
  }
  return {
    initCatmullRom: function (o, a, r, l, c) {
      n(a, r, c * (r - o), c * (l - a));
    },
    initNonuniformCatmullRom: function (o, a, r, l, c, h, f) {
      let u = (a - o) / c - (r - o) / (c + h) + (r - a) / h,
        d = (r - a) / h - (l - a) / (h + f) + (l - r) / f;
      ((u *= h), (d *= h), n(a, r, u, d));
    },
    calc: function (o) {
      let a = o * o,
        r = a * o;
      return i + t * o + e * a + s * r;
    },
  };
}
function PO(i, t, e, s, n) {
  let o = (s - t) * 0.5,
    a = (n - e) * 0.5,
    r = i * i,
    l = i * r;
  return (
    (2 * e - 2 * s + o + a) * l + (-3 * e + 3 * s - 2 * o - a) * r + o * i + e
  );
}
function Znt(i, t) {
  let e = 1 - i;
  return e * e * t;
}
function Qnt(i, t) {
  return 2 * (1 - i) * i * t;
}
function tit(i, t) {
  return i * i * t;
}
function Vv(i, t, e, s) {
  return Znt(i, t) + Qnt(i, e) + tit(i, s);
}
function eit(i, t) {
  let e = 1 - i;
  return e * e * e * t;
}
function sit(i, t) {
  let e = 1 - i;
  return 3 * e * e * i * t;
}
function nit(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function iit(i, t) {
  return i * i * i * t;
}
function $v(i, t, e, s, n) {
  return eit(i, t) + sit(i, e) + nit(i, s) + iit(i, n);
}
function oit(i, t, e = 2) {
  let s = t && t.length,
    n = s ? t[0] * e : i.length,
    o = iD(i, 0, n, e, !0),
    a = [];
  if (!o || o.next === o.prev) return a;
  let r, l, c;
  if ((s && (o = hit(i, t, o, e)), i.length > 80 * e)) {
    ((r = i[0]), (l = i[1]));
    let h = r,
      f = l;
    for (let u = e; u < n; u += e) {
      let d = i[u],
        p = i[u + 1];
      (d < r && (r = d), p < l && (l = p), d > h && (h = d), p > f && (f = p));
    }
    ((c = Math.max(h - r, f - l)), (c = c !== 0 ? 32767 / c : 0));
  }
  return (p3(o, a, e, r, l, c, 0), a);
}
function iD(i, t, e, s, n) {
  let o;
  if (n === wit(i, t, e, s) > 0)
    for (let a = t; a < e; a += s) o = CO((a / s) | 0, i[a], i[a + 1], o);
  else
    for (let a = e - s; a >= t; a -= s) o = CO((a / s) | 0, i[a], i[a + 1], o);
  return (o && Q2(o, o.next) && (g3(o), (o = o.next)), o);
}
function E1(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i,
    s;
  do
    if (
      ((s = !1), !e.steiner && (Q2(e, e.next) || jo(e.prev, e, e.next) === 0))
    ) {
      if ((g3(e), (e = t = e.prev), e === e.next)) break;
      s = !0;
    } else e = e.next;
  while (s || e !== t);
  return t;
}
