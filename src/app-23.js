// app 23 — max
// Lines 43610-43920 of readable/app.pretty.js (statement-aligned).
async function Wlt(i) {
  try {
    let t = new Uint8Array(await i.slice(0, 32).arrayBuffer()),
      e = String.fromCharCode(...t.subarray(12, 16));
    if (
      String.fromCharCode(...t.subarray(0, 4)) !== "RIFF" ||
      String.fromCharCode(...t.subarray(8, 12)) !== "WEBP"
    )
      return !1;
    if (e === "VP8 ") return !0;
    if (e === "VP8L") return !((t[24] >> 4) & 1);
    if (e === "VP8X") return !(t[20] & 16);
  } catch {}
  return !1;
}
var UD = (i, t) =>
    Nl(i, { priority: t, read: (e) => e.blob() }).then(async (e) => {
      let s = await Wlt(e),
        n = await qlt(
          await createImageBitmap(e, {
            premultiplyAlpha: s ? "default" : "none",
            colorSpaceConversion: "none",
          }),
          i,
          s,
        );
      return (s && (n.sfOpaque = !0), n);
    }),
  VD = (i) =>
    globalThis.SF_TEXMAX
      ? /_(n|mask)\.\w+$/.test(i)
        ? globalThis.SF_TEXMAX >> 1
        : globalThis.SF_TEXMAX
      : 0,
  qlt = async (i, t, e = !1) => {
    let s = VD(t),
      n = i.width,
      o = i.height;
    if (!s || Math.max(n, o) <= s) return i;
    for (; Math.max(n, o) > s;)
      ((n = Math.max(1, n >> 1)), (o = Math.max(1, o >> 1)));
    try {
      let a = await createImageBitmap(i, {
        resizeWidth: n,
        resizeHeight: o,
        resizeQuality: "high",
        premultiplyAlpha: e ? "default" : "none",
        colorSpaceConversion: "none",
      });
      if (a.width === n) return (i.close(), a);
      a.close();
    } catch {}
    return i;
  },
  $D = () => [...zd.keys()],
  pa = {
    fn: null,
    released: !1,
    q: [],
    lq: new Map(),
    n: 0,
    done: 0,
    failed: 0,
  };
function XD(i) {
  pa.fn = i;
}
var DA = () => ({
    deferred: pa.n,
    done: pa.done,
    failed: pa.failed,
    released: pa.released,
  }),
  jlt = (i) => i.replace(/\.webp(\?.*)?$/, ".lq.webp$1");
function O6(i, t) {
  return l0.pool.length
    ? qD({ url: i, priority: t, max: VD(i) }).catch((e) =>
        e.name === "AssetLoadError" ? Promise.reject(e) : UD(i, t),
      )
    : UD(i, t);
}
function KD(i) {
  let t = i?.image?.sfLQ,
    e = t && pa.lq.get(t);
  e && (e.full ? (i.image = H6(e.full, t)) : e.texs.add(i));
}
async function YD(i = () => 0, t = 3) {
  if (pa.released) return;
  pa.released = !0;
  let e = pa.q.splice(0).sort((o, a) => i(o) - i(a)),
    s = async (o) => {
      try {
        let a = await O6(o, "low"),
          r = pa.lq.get(o);
        (r && (r.full = a),
          zd.set(o, Object.assign(Promise.resolve(a), { img: a })),
          N5.set(a, o));
        for (let l of r?.texs || [])
          ((l.image = H6(a, o)), (l.needsUpdate = !0), B5.arrived?.(l));
        r?.texs.clear();
      } catch (a) {
        (pa.failed++, console.warn("deferred image", o, a?.message || a));
      }
      pa.done++;
    },
    n = async () => {
      for (; e.length;) await s(e.shift());
    };
  await Promise.all(Array.from({ length: t }, n));
}
var HA = null;
function JD(i) {
  HA = i
    ? i.then(
        () => {},
        () => {},
      )
    : null;
}
var GD = (i) => (HA ? HA.then(i) : i());
function Ed(i, t = "low") {
  let e = new URL(i, document.baseURI).href,
    s = zd.get(e);
  if (!s && pa.fn && !pa.released && pa.fn(e)) {
    (zd.set(
      e,
      (s = GD(() => O6(jlt(e), "high")).then(
        (o) => ((o.sfLQ = e), pa.lq.set(e, { img: o, texs: new Set() }), o),
        () => (
          (pa.q = pa.q.filter((o) => o !== e)),
          pa.n--,
          console.warn("no stand-in:", e),
          O6(e, t)
        ),
      )),
    ),
      pa.q.push(e),
      pa.n++);
    let n = s;
    return (
      n.then(
        (o) => {
          ((n.img = o), N5.set(o, e));
        },
        () => {},
      ),
      s
    );
  }
  if (!s) {
    zd.set(e, (s = GD(() => O6(e, t))));
    let n = s;
    n.then(
      (o) => {
        ((n.img = o), N5.set(o, e));
      },
      () => {},
    );
  }
  return s;
}
var B5 = { arrived: null };
{
  let i = go.prototype.load;
  go.prototype.load = function (t, e, s, n) {
    return i.call(
      this,
      t,
      (o) => {
        (KD(o), e?.(o), B5.arrived?.(o));
      },
      s,
      n,
    );
  };
}
typeof createImageBitmap == "function" &&
  typeof fetch == "function" &&
  (Il.prototype.load = function (i, t, e, s) {
    (this.path !== void 0 && (i = this.path + i),
      (i = this.manager.resolveURL(i)));
    let n = this.manager;
    (n.itemStart(i),
      Ed(i).then(
        (o) => {
          (t?.(H6(o)), n.itemEnd(i));
        },
        (o) => {
          (zd.delete(new URL(i, document.baseURI).href),
            s?.(o),
            n.itemError(i),
            n.itemEnd(i));
        },
      ));
  });
globalThis.SF_TEXMAX &&
  typeof createImageBitmap == "function" &&
  qf &&
  (qf.prototype.load = function (i, t, e, s) {
    (this.path !== void 0 && (i = this.path + i),
      (i = this.manager.resolveURL(i)));
    let n = this.manager,
      o = this.options;
    (n.itemStart(i),
      Nl(i, { read: (a) => a.blob() })
        .then(async (a) => {
          let r = await Vlt(a),
            l = globalThis.SF_TEXMAX,
            c = r?.[0],
            h = r?.[1],
            f = { ...o, colorSpaceConversion: "none" };
          if (c && h && Math.max(c, h) > l) {
            for (; Math.max(c, h) > l;)
              ((c = Math.max(1, c >> 1)), (h = Math.max(1, h >> 1)));
            f = {
              ...f,
              resizeWidth: c,
              resizeHeight: h,
              resizeQuality: "high",
            };
          }
          return createImageBitmap(a, f);
        })
        .then(
          (a) => {
            (t?.(a), n.itemEnd(i));
          },
          (a) => {
            (s?.(a), n.itemError(i), n.itemEnd(i));
          },
        ));
  });
async function Vlt(i) {
  try {
    let t = new Uint8Array(await i.slice(0, 65536).arrayBuffer()),
      e = new DataView(t.buffer),
      s = (n, o) => String.fromCharCode(...t.subarray(n, n + o));
    if (s(1, 3) === "PNG") return [e.getUint32(16), e.getUint32(20)];
    if (s(0, 4) === "RIFF" && s(8, 4) === "WEBP") {
      let n = s(12, 4);
      if (n === "VP8 ")
        return [e.getUint16(26, !0) & 16383, e.getUint16(28, !0) & 16383];
      if (n === "VP8L") {
        let o = e.getUint32(21, !0);
        return [(o & 16383) + 1, ((o >> 14) & 16383) + 1];
      }
      if (n === "VP8X")
        return [
          1 + (t[24] | (t[25] << 8) | (t[26] << 16)),
          1 + (t[27] | (t[28] << 8) | (t[29] << 16)),
        ];
    }
    if (t[0] === 255 && t[1] === 216)
      for (let n = 2; n + 9 < t.length;) {
        if (t[n] !== 255) {
          n++;
          continue;
        }
        let o = t[n + 1],
          a = e.getUint16(n + 2);
        if (o >= 192 && o <= 207 && o !== 196 && o !== 200 && o !== 204)
          return [e.getUint16(n + 7), e.getUint16(n + 5)];
        n += 2 + a;
      }
  } catch {}
  return null;
}
var ZD = [];
function Fr(i, t = null) {
  let e = new ei();
  return (
    t?.(e),
    (e.userData.ok = Ed(i).then(
      (s) => (
        (e.image = H6(s)),
        (e.needsUpdate = !0),
        KD(e),
        B5.arrived?.(e),
        !0
      ),
      () => (console.warn("texture missing", i), !1),
    )),
    ZD.push(e.userData.ok),
    e
  );
}
var QD = () => Promise.all(ZD);
as();
var D6 = new Map();
function O5(i, t) {
  if (!D6.has(i)) {
    let e = eU(i, t);
    (e.catch(() => {}), D6.set(i, e));
  }
}
var tU = [];
function UA(i, t) {
  i &&
    t &&
    tU.push({
      re: i,
      gate: t.then(
        () => {},
        () => {},
      ),
    });
}
function io(i) {
  let t = D6.get(i);
  return t ? (D6.delete(i), t) : eU(i);
}
