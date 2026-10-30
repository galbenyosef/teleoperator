// app 04 — math
// Lines 810-1159 of readable/app.pretty.js (statement-aligned).
function zat(o) {
  for (let t = o.length - 1; t >= 0; --t) if (o[t] >= 65535) return !0;
  return !1;
}
function Ag(o, t) {
  return new _at[o](t);
}
function QU(o) {
  return ArrayBuffer.isView(o) && !(o instanceof DataView);
}
function Ig(o) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", o);
}
function VA() {
  let o = Ig("canvas");
  return ((o.style.display = "block"), o);
}
function tG(o) {
  Zd = o;
}
function eG() {
  return Zd;
}
function Fg(...o) {
  let t = "THREE." + o.shift();
  Zd ? Zd("log", t, ...o) : console.log(t, ...o);
}
function sG(o) {
  let t = o[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    let e = o[1];
    e && e.isStackTrace
      ? (o[0] += " " + e.getLocation())
      : (o[1] =
          'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.');
  }
  return o;
}
function Cs(...o) {
  o = sG(o);
  let t = "THREE." + o.shift();
  if (Zd) Zd("warn", t, ...o);
  else {
    let e = o[0];
    e && e.isStackTrace ? console.warn(e.getError(t)) : console.warn(t, ...o);
  }
}
function pn(...o) {
  o = sG(o);
  let t = "THREE." + o.shift();
  if (Zd) Zd("error", t, ...o);
  else {
    let e = o[0];
    e && e.isStackTrace ? console.error(e.getError(t)) : console.error(t, ...o);
  }
}
function Jh(...o) {
  let t = o.join(" ");
  t in ZH || ((ZH[t] = !0), Cs(...o));
}
function nG(o, t, e) {
  return new Promise(function (s, n) {
    function i() {
      switch (o.clientWaitSync(t, o.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case o.WAIT_FAILED:
          n();
          break;
        case o.TIMEOUT_EXPIRED:
          setTimeout(i, e);
          break;
        default:
          s();
      }
    }
    setTimeout(i, e);
  });
}
function vl() {
  let o = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    s = (Math.random() * 4294967295) | 0;
  return (
    jr[o & 255] +
    jr[(o >> 8) & 255] +
    jr[(o >> 16) & 255] +
    jr[(o >> 24) & 255] +
    "-" +
    jr[t & 255] +
    jr[(t >> 8) & 255] +
    "-" +
    jr[((t >> 16) & 15) | 64] +
    jr[(t >> 24) & 255] +
    "-" +
    jr[(e & 63) | 128] +
    jr[(e >> 8) & 255] +
    "-" +
    jr[(e >> 16) & 255] +
    jr[(e >> 24) & 255] +
    jr[s & 255] +
    jr[(s >> 8) & 255] +
    jr[(s >> 16) & 255] +
    jr[(s >> 24) & 255]
  ).toLowerCase();
}
function Ln(o, t, e) {
  return Math.max(t, Math.min(e, o));
}
function WA(o, t) {
  return ((o % t) + t) % t;
}
function Eat(o, t, e, s, n) {
  return s + ((o - t) * (n - s)) / (e - t);
}
function Tat(o, t, e) {
  return o !== t ? (e - o) / (t - o) : 0;
}
function U3(o, t, e) {
  return (1 - e) * o + e * t;
}
function Rat(o, t, e, s) {
  return U3(o, t, 1 - Math.exp(-e * s));
}
function Aat(o, t = 1) {
  return t - Math.abs(WA(o, t * 2) - t);
}
function Pat(o, t, e) {
  return o <= t
    ? 0
    : o >= e
      ? 1
      : ((o = (o - t) / (e - t)), o * o * (3 - 2 * o));
}
function Cat(o, t, e) {
  return o <= t
    ? 0
    : o >= e
      ? 1
      : ((o = (o - t) / (e - t)), o * o * o * (o * (o * 6 - 15) + 10));
}
function Lat(o, t) {
  return o + Math.floor(Math.random() * (t - o + 1));
}
function Iat(o, t) {
  return o + Math.random() * (t - o);
}
function Fat(o) {
  return o * (0.5 - Math.random());
}
function Oat(o) {
  o !== void 0 && (QH = o);
  let t = (QH += 1831565813);
  return (
    (t = Math.imul(t ^ (t >>> 15), t | 1)),
    (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
    ((t ^ (t >>> 14)) >>> 0) / 4294967296
  );
}
function Bat(o) {
  return o * K1;
}
function Nat(o) {
  return o * J1;
}
function Hat(o) {
  return o > 0 && Number.isInteger(o) && 2 ** Math.round(Math.log2(o)) === o;
}
function Dat(o) {
  return Math.pow(2, Math.ceil(Math.log(o) / Math.LN2));
}
function Uat(o) {
  return Math.pow(2, Math.floor(Math.log(o) / Math.LN2));
}
function Gat(o, t, e, s, n) {
  let i = Math.cos,
    a = Math.sin,
    r = i(e / 2),
    l = a(e / 2),
    c = i((t + s) / 2),
    h = a((t + s) / 2),
    f = i((t - s) / 2),
    u = a((t - s) / 2),
    d = i((s - t) / 2),
    p = a((s - t) / 2);
  switch (n) {
    case "XYX":
      o.set(r * h, l * f, l * u, r * c);
      break;
    case "YZY":
      o.set(l * u, r * h, l * f, r * c);
      break;
    case "ZXZ":
      o.set(l * f, l * u, r * h, r * c);
      break;
    case "XZX":
      o.set(r * h, l * p, l * d, r * c);
      break;
    case "YXY":
      o.set(l * d, r * h, l * p, r * c);
      break;
    case "ZYZ":
      o.set(l * p, l * d, r * h, r * c);
      break;
    default:
      Cs(
        "MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
          n,
      );
  }
}
function b0(o, t) {
  switch (t.constructor) {
    case Float32Array:
      return o;
    case Uint32Array:
      return o / 4294967295;
    case Uint16Array:
      return o / 65535;
    case Uint8Array:
    case Uint8ClampedArray:
      return o / 255;
    case Int32Array:
      return Math.max(o / 2147483647, -1);
    case Int16Array:
      return Math.max(o / 32767, -1);
    case Int8Array:
      return Math.max(o / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function jn(o, t) {
  switch (t.constructor) {
    case Float32Array:
      return o;
    case Uint32Array:
      return Math.round(o * 4294967295);
    case Uint16Array:
      return Math.round(o * 65535);
    case Uint8Array:
    case Uint8ClampedArray:
      return Math.round(o * 255);
    case Int32Array:
      return Math.round(o * 2147483647);
    case Int16Array:
      return Math.round(o * 32767);
    case Int8Array:
      return Math.round(o * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Vat() {
  let o = {
      enabled: !0,
      workingColorSpace: Ba,
      spaces: {},
      convert: function (n, i, a) {
        return (
          this.enabled === !1 ||
            i === a ||
            !i ||
            !a ||
            (this.spaces[i].transfer === Zi &&
              ((n.r = xu(n.r)), (n.g = xu(n.g)), (n.b = xu(n.b))),
            this.spaces[i].primaries !== this.spaces[a].primaries &&
              (n.applyMatrix3(this.spaces[i].toXYZ),
              n.applyMatrix3(this.spaces[a].fromXYZ)),
            this.spaces[a].transfer === Zi &&
              ((n.r = Pg(n.r)), (n.g = Pg(n.g)), (n.b = Pg(n.b)))),
          n
        );
      },
      workingToColorSpace: function (n, i) {
        return this.convert(n, this.workingColorSpace, i);
      },
      colorSpaceToWorking: function (n, i) {
        return this.convert(n, i, this.workingColorSpace);
      },
      getPrimaries: function (n) {
        return this.spaces[n].primaries;
      },
      getTransfer: function (n) {
        return n === Nn ? Lg : this.spaces[n].transfer;
      },
      getToneMappingMode: function (n) {
        return (
          this.spaces[n].outputColorSpaceConfig.toneMappingMode || "standard"
        );
      },
      getLuminanceCoefficients: function (n, i = this.workingColorSpace) {
        return n.fromArray(this.spaces[i].luminanceCoefficients);
      },
      define: function (n) {
        Object.assign(this.spaces, n);
      },
      _getMatrix: function (n, i, a) {
        return n.copy(this.spaces[i].toXYZ).multiply(this.spaces[a].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (n) {
        return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (n = this.workingColorSpace) {
        return this.spaces[n].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (n, i) {
        return (
          Jh(
            "ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().",
          ),
          o.workingToColorSpace(n, i)
        );
      },
      toWorkingColorSpace: function (n, i) {
        return (
          Jh(
            "ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().",
          ),
          o.colorSpaceToWorking(n, i)
        );
      },
    },
    t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
    e = [0.2126, 0.7152, 0.0722],
    s = [0.3127, 0.329];
  return (
    o.define({
      [Ba]: {
        primaries: t,
        whitePoint: s,
        transfer: Lg,
        toXYZ: eD,
        fromXYZ: sD,
        luminanceCoefficients: e,
        workingColorSpaceConfig: { unpackColorSpace: Je },
        outputColorSpaceConfig: { drawingBufferColorSpace: Je },
      },
      [Je]: {
        primaries: t,
        whitePoint: s,
        transfer: Zi,
        toXYZ: eD,
        fromXYZ: sD,
        luminanceCoefficients: e,
        outputColorSpaceConfig: { drawingBufferColorSpace: Je },
      },
    }),
    o
  );
}
