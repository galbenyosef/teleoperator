// app 04 — math
// Lines 777-1126 of readable/app.pretty.js (statement-aligned).
function ont(i) {
  for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return !0;
  return !1;
}
function D2(i, t) {
  return new ant[i](t);
}
function YH(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function q2(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function gA() {
  let i = q2("canvas");
  return ((i.style.display = "block"), i);
}
function JH(i) {
  vd = i;
}
function ZH() {
  return vd;
}
function j2(...i) {
  let t = "THREE." + i.shift();
  vd ? vd("log", t, ...i) : console.log(t, ...i);
}
function QH(i) {
  let t = i[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    let e = i[1];
    e && e.isStackTrace
      ? (i[0] += " " + e.getLocation())
      : (i[1] =
          'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.');
  }
  return i;
}
function As(...i) {
  i = QH(i);
  let t = "THREE." + i.shift();
  if (vd) vd("warn", t, ...i);
  else {
    let e = i[0];
    e && e.isStackTrace ? console.warn(e.getError(t)) : console.warn(t, ...i);
  }
}
function fn(...i) {
  i = QH(i);
  let t = "THREE." + i.shift();
  if (vd) vd("error", t, ...i);
  else {
    let e = i[0];
    e && e.isStackTrace ? console.error(e.getError(t)) : console.error(t, ...i);
  }
}
function Sh(...i) {
  let t = i.join(" ");
  t in KB || ((KB[t] = !0), As(...i));
}
function tD(i, t, e) {
  return new Promise(function (s, n) {
    function o() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          n();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(o, e);
          break;
        default:
          s();
      }
    }
    setTimeout(o, e);
  });
}
function X0() {
  let i = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    s = (Math.random() * 4294967295) | 0;
  return (
    Tr[i & 255] +
    Tr[(i >> 8) & 255] +
    Tr[(i >> 16) & 255] +
    Tr[(i >> 24) & 255] +
    "-" +
    Tr[t & 255] +
    Tr[(t >> 8) & 255] +
    "-" +
    Tr[((t >> 16) & 15) | 64] +
    Tr[(t >> 24) & 255] +
    "-" +
    Tr[(e & 63) | 128] +
    Tr[(e >> 8) & 255] +
    "-" +
    Tr[(e >> 16) & 255] +
    Tr[(e >> 24) & 255] +
    Tr[s & 255] +
    Tr[(s >> 8) & 255] +
    Tr[(s >> 16) & 255] +
    Tr[(s >> 24) & 255]
  ).toLowerCase();
}
function Tn(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function bA(i, t) {
  return ((i % t) + t) % t;
}
function rnt(i, t, e, s, n) {
  return s + ((i - t) * (n - s)) / (e - t);
}
function lnt(i, t, e) {
  return i !== t ? (e - i) / (t - i) : 0;
}
function jv(i, t, e) {
  return (1 - e) * i + e * t;
}
function cnt(i, t, e, s) {
  return jv(i, t, 1 - Math.exp(-e * s));
}
function hnt(i, t = 1) {
  return t - Math.abs(bA(i, t * 2) - t);
}
function fnt(i, t, e) {
  return i <= t
    ? 0
    : i >= e
      ? 1
      : ((i = (i - t) / (e - t)), i * i * (3 - 2 * i));
}
function unt(i, t, e) {
  return i <= t
    ? 0
    : i >= e
      ? 1
      : ((i = (i - t) / (e - t)), i * i * i * (i * (i * 6 - 15) + 10));
}
function dnt(i, t) {
  return i + Math.floor(Math.random() * (t - i + 1));
}
function pnt(i, t) {
  return i + Math.random() * (t - i);
}
function mnt(i) {
  return i * (0.5 - Math.random());
}
function gnt(i) {
  i !== void 0 && (YB = i);
  let t = (YB += 1831565813);
  return (
    (t = Math.imul(t ^ (t >>> 15), t | 1)),
    (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
    ((t ^ (t >>> 14)) >>> 0) / 4294967296
  );
}
function bnt(i) {
  return i * f1;
}
function xnt(i) {
  return i * d1;
}
function vnt(i) {
  return i > 0 && Number.isInteger(i) && 2 ** Math.round(Math.log2(i)) === i;
}
function ynt(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function wnt(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function Mnt(i, t, e, s, n) {
  let o = Math.cos,
    a = Math.sin,
    r = o(e / 2),
    l = a(e / 2),
    c = o((t + s) / 2),
    h = a((t + s) / 2),
    f = o((t - s) / 2),
    u = a((t - s) / 2),
    d = o((s - t) / 2),
    p = a((s - t) / 2);
  switch (n) {
    case "XYX":
      i.set(r * h, l * f, l * u, r * c);
      break;
    case "YZY":
      i.set(l * u, r * h, l * f, r * c);
      break;
    case "ZXZ":
      i.set(l * f, l * u, r * h, r * c);
      break;
    case "XZX":
      i.set(r * h, l * p, l * d, r * c);
      break;
    case "YXY":
      i.set(l * d, r * h, l * p, r * c);
      break;
    case "ZYZ":
      i.set(l * p, l * d, r * h, r * c);
      break;
    default:
      As(
        "MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
          n,
      );
  }
}
function e0(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
    case Uint8ClampedArray:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Wn(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
    case Uint8ClampedArray:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Snt() {
  let i = {
      enabled: !0,
      workingColorSpace: za,
      spaces: {},
      convert: function (n, o, a) {
        return (
          this.enabled === !1 ||
            o === a ||
            !o ||
            !a ||
            (this.spaces[o].transfer === Ui &&
              ((n.r = Of(n.r)), (n.g = Of(n.g)), (n.b = Of(n.b))),
            this.spaces[o].primaries !== this.spaces[a].primaries &&
              (n.applyMatrix3(this.spaces[o].toXYZ),
              n.applyMatrix3(this.spaces[a].fromXYZ)),
            this.spaces[a].transfer === Ui &&
              ((n.r = U2(n.r)), (n.g = U2(n.g)), (n.b = U2(n.b)))),
          n
        );
      },
      workingToColorSpace: function (n, o) {
        return this.convert(n, this.workingColorSpace, o);
      },
      colorSpaceToWorking: function (n, o) {
        return this.convert(n, o, this.workingColorSpace);
      },
      getPrimaries: function (n) {
        return this.spaces[n].primaries;
      },
      getTransfer: function (n) {
        return n === On ? W2 : this.spaces[n].transfer;
      },
      getToneMappingMode: function (n) {
        return (
          this.spaces[n].outputColorSpaceConfig.toneMappingMode || "standard"
        );
      },
      getLuminanceCoefficients: function (n, o = this.workingColorSpace) {
        return n.fromArray(this.spaces[o].luminanceCoefficients);
      },
      define: function (n) {
        Object.assign(this.spaces, n);
      },
      _getMatrix: function (n, o, a) {
        return n.copy(this.spaces[o].toXYZ).multiply(this.spaces[a].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (n) {
        return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (n = this.workingColorSpace) {
        return this.spaces[n].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (n, o) {
        return (
          Sh(
            "ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().",
          ),
          i.workingToColorSpace(n, o)
        );
      },
      toWorkingColorSpace: function (n, o) {
        return (
          Sh(
            "ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().",
          ),
          i.colorSpaceToWorking(n, o)
        );
      },
    },
    t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
    e = [0.2126, 0.7152, 0.0722],
    s = [0.3127, 0.329];
  return (
    i.define({
      [za]: {
        primaries: t,
        whitePoint: s,
        transfer: W2,
        toXYZ: ZB,
        fromXYZ: QB,
        luminanceCoefficients: e,
        workingColorSpaceConfig: { unpackColorSpace: is },
        outputColorSpaceConfig: { drawingBufferColorSpace: is },
      },
      [is]: {
        primaries: t,
        whitePoint: s,
        transfer: Ui,
        toXYZ: ZB,
        fromXYZ: QB,
        luminanceCoefficients: e,
        outputColorSpaceConfig: { drawingBufferColorSpace: is },
      },
    }),
    i
  );
}
