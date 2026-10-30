// app 05 — math
// Lines 1160-1499 of readable/app.pretty.js (statement-aligned).
function xu(o) {
  return o < 0.04045
    ? o * 0.0773993808
    : Math.pow(o * 0.9478672986 + 0.0521327014, 2.4);
}
function Pg(o) {
  return o < 0.0031308 ? o * 12.92 : 1.055 * Math.pow(o, 0.41666) - 0.055;
}
function pR(o) {
  return (typeof HTMLImageElement < "u" && o instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && o instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && o instanceof ImageBitmap)
    ? Z3.getDataURL(o)
    : o.data
      ? {
          data: Array.from(o.data),
          width: o.width,
          height: o.height,
          type: o.data.constructor.name,
        }
      : (Cs("Texture: Unable to serialize Texture."), {});
}
function bR(o, t, e) {
  return (
    e < 0 && (e += 1),
    e > 1 && (e -= 1),
    e < 1 / 6
      ? o + (t - o) * 6 * e
      : e < 1 / 2
        ? t
        : e < 2 / 3
          ? o + (t - o) * 6 * (2 / 3 - e)
          : o
  );
}
function zR(o, t, e, s, n) {
  for (let i = 0, a = o.length - 3; i <= a; i += 3) {
    N1.fromArray(o, i);
    let r = n.x * Math.abs(N1.x) + n.y * Math.abs(N1.y) + n.z * Math.abs(N1.z),
      l = t.dot(N1),
      c = e.dot(N1),
      h = s.dot(N1);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > r) return !1;
  }
  return !0;
}
function Qat() {
  let o = new ArrayBuffer(4),
    t = new Float32Array(o),
    e = new Uint32Array(o),
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
  let i = new Uint32Array(2048),
    a = new Uint32Array(64),
    r = new Uint32Array(64);
  for (let l = 1; l < 1024; ++l) {
    let c = l << 13,
      h = 0;
    for (; (c & 8388608) === 0;) ((c <<= 1), (h -= 8388608));
    ((c &= -8388609), (h += 947912704), (i[l] = c | h));
  }
  for (let l = 1024; l < 2048; ++l) i[l] = 939524096 + ((l - 1024) << 13);
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
    mantissaTable: i,
    exponentTable: a,
    offsetTable: r,
  };
}
function G0(o) {
  (Math.abs(o) > 65504 && Cs("DataUtils.toHalfFloat(): Value out of range."),
    (o = Ln(o, -65504, 65504)),
    (bu.floatView[0] = o));
  let t = bu.uint32View[0],
    e = (t >> 23) & 511;
  return bu.baseTable[e] + ((t & 8388607) >> bu.shiftTable[e]);
}
function B3(o) {
  let t = o >> 10;
  return (
    (bu.uint32View[0] =
      bu.mantissaTable[bu.offsetTable[t] + (o & 1023)] + bu.exponentTable[t]),
    bu.floatView[0]
  );
}
function R8(o, t, e, s, n, i) {
  (Sg.subVectors(o, e).addScalar(0.5).multiply(s),
    n !== void 0
      ? ((A3.x = i * Sg.x - n * Sg.y), (A3.y = n * Sg.x + i * Sg.y))
      : A3.copy(Sg),
    o.copy(t),
    (o.x += A3.x),
    (o.y += A3.y),
    o.applyMatrix4(aG));
}
function art(o, t, e, s, n, i, a, r) {
  let l;
  if (
    (t.side === pa
      ? (l = s.intersectTriangle(a, i, n, !0, r))
      : (l = s.intersectTriangle(n, i, a, t.side === $a, r)),
    l === null)
  )
    return null;
  (N8.copy(r), N8.applyMatrix4(o.matrixWorld));
  let c = e.ray.origin.distanceTo(N8);
  return c < e.near || c > e.far
    ? null
    : { distance: c, point: N8.clone(), object: o };
}
function H8(o, t, e, s, n, i, a, r, l, c) {
  (o.getVertexPosition(r, I8),
    o.getVertexPosition(l, F8),
    o.getVertexPosition(c, O8));
  let h = art(o, t, e, s, I8, F8, O8, gD);
  if (h) {
    let f = new dt();
    (qc.getBarycoord(gD, I8, F8, O8, f),
      n && (h.uv = qc.getInterpolatedAttribute(n, r, l, c, f, new Pe())),
      i && (h.uv1 = qc.getInterpolatedAttribute(i, r, l, c, f, new Pe())),
      a &&
        ((h.normal = qc.getInterpolatedAttribute(a, r, l, c, f, new dt())),
        h.normal.dot(s.direction) > 0 && h.normal.multiplyScalar(-1)));
    let u = { a: r, b: l, c, normal: new dt(), materialIndex: 0 };
    (qc.getNormal(I8, F8, O8, u.normal), (h.face = u), (h.barycoord = f));
  }
  return h;
}
function IR(o, t) {
  return o - t;
}
function frt(o, t) {
  return o.z - t.z;
}
function urt(o, t) {
  return t.z - o.z;
}
function brt(o, t, e = 0) {
  let s = t.itemSize;
  if (
    o.isInterleavedBufferAttribute ||
    o.array.constructor !== t.array.constructor
  ) {
    let n = o.count;
    for (let i = 0; i < n; i++)
      for (let a = 0; a < s; a++)
        t.setComponent(i + e, a, o.getComponent(i, a));
  } else t.array.set(o.array, e * s);
  t.needsUpdate = !0;
}
function G1(o, t) {
  if (o.constructor !== t.constructor) {
    let e = Math.min(o.length, t.length);
    for (let s = 0; s < e; s++) t[s] = o[s];
  } else {
    let e = Math.min(o.length, t.length);
    t.set(new o.constructor(o.buffer, 0, e));
  }
}
function j8(o, t, e, s, n, i, a) {
  let r = o.geometry.attributes.position;
  if (
    (y6.fromBufferAttribute(r, n),
    w6.fromBufferAttribute(r, i),
    e.distanceSqToSegment(y6, w6, OR, ED) > s)
  )
    return;
  OR.applyMatrix4(o.matrixWorld);
  let c = t.ray.origin.distanceTo(OR);
  if (!(c < t.near || c > t.far))
    return {
      distance: c,
      point: ED.clone().applyMatrix4(o.matrixWorld),
      index: a,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: o,
    };
}
function PD(o, t, e, s, n, i, a) {
  let r = KR.distanceSqToPoint(o);
  if (r < e) {
    let l = new dt();
    (KR.closestPointToPoint(o, l), l.applyMatrix4(s));
    let c = n.ray.origin.distanceTo(l);
    if (c < n.near || c > n.far) return;
    i.push({
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
function qA() {
  let o = 0,
    t = 0,
    e = 0,
    s = 0;
  function n(i, a, r, l) {
    ((o = i),
      (t = r),
      (e = -3 * i + 3 * a - 2 * r - l),
      (s = 2 * i - 2 * a + r + l));
  }
  return {
    initCatmullRom: function (i, a, r, l, c) {
      n(a, r, c * (r - i), c * (l - a));
    },
    initNonuniformCatmullRom: function (i, a, r, l, c, h, f) {
      let u = (a - i) / c - (r - i) / (c + h) + (r - a) / h,
        d = (r - a) / h - (l - a) / (h + f) + (l - r) / f;
      ((u *= h), (d *= h), n(a, r, u, d));
    },
    calc: function (i) {
      let a = i * i,
        r = a * i;
      return o + t * i + e * a + s * r;
    },
  };
}
function ID(o, t, e, s, n) {
  let i = (s - t) * 0.5,
    a = (n - e) * 0.5,
    r = o * o,
    l = o * r;
  return (
    (2 * e - 2 * s + i + a) * l + (-3 * e + 3 * s - 2 * i - a) * r + i * o + e
  );
}
function xrt(o, t) {
  let e = 1 - o;
  return e * e * t;
}
function vrt(o, t) {
  return 2 * (1 - o) * o * t;
}
function yrt(o, t) {
  return o * o * t;
}
function G3(o, t, e, s) {
  return xrt(o, t) + vrt(o, e) + yrt(o, s);
}
function wrt(o, t) {
  let e = 1 - o;
  return e * e * e * t;
}
function Mrt(o, t) {
  let e = 1 - o;
  return 3 * e * e * o * t;
}
function Srt(o, t) {
  return 3 * (1 - o) * o * o * t;
}
function krt(o, t) {
  return o * o * o * t;
}
function V3(o, t, e, s, n) {
  return wrt(o, t) + Mrt(o, e) + Srt(o, s) + krt(o, n);
}
function zrt(o, t, e = 2) {
  let s = t && t.length,
    n = s ? t[0] * e : o.length,
    i = rG(o, 0, n, e, !0),
    a = [];
  if (!i || i.next === i.prev) return a;
  let r, l, c;
  if ((s && (i = Art(o, t, i, e)), o.length > 80 * e)) {
    ((r = o[0]), (l = o[1]));
    let h = r,
      f = l;
    for (let u = e; u < n; u += e) {
      let d = o[u],
        p = o[u + 1];
      (d < r && (r = d), p < l && (l = p), d > h && (h = d), p > f && (f = p));
    }
    ((c = Math.max(h - r, f - l)), (c = c !== 0 ? 32767 / c : 0));
  }
  return (hy(i, a, e, r, l, c, 0), a);
}
function rG(o, t, e, s, n) {
  let i;
  if (n === Urt(o, t, e, s) > 0)
    for (let a = t; a < e; a += s) i = FD((a / s) | 0, o[a], o[a + 1], i);
  else
    for (let a = e - s; a >= t; a -= s) i = FD((a / s) | 0, o[a], o[a + 1], i);
  return (i && Vg(i, i.next) && (uy(i), (i = i.next)), i);
}
function fm(o, t) {
  if (!o) return o;
  t || (t = o);
  let e = o,
    s;
  do
    if (
      ((s = !1), !e.steiner && (Vg(e, e.next) || ea(e.prev, e, e.next) === 0))
    ) {
      if ((uy(e), (e = t = e.prev), e === e.next)) break;
      s = !0;
    } else e = e.next;
  while (s || e !== t);
  return t;
}
