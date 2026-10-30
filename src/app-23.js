// app 23 — max
// Lines 43690-44035 of readable/app.pretty.js (statement-aligned).
function XG(o, t = 4, e = null) {
  try {
    for (let s = 0; s < (e?.length || t); s++) {
      let n = e?.[s] || new Worker(o, { type: "module" });
      (S0.up.push(
        xb(n).then(
          (i) => (i || HS(n, new Error("Image worker could not start")), i),
        ),
      ),
        (n.onmessage = ({ data: i }) => S0.jobs.receive(n, i)),
        (n.onerror = (i) => {
          (console.warn("image worker", i.message),
            HS(n, new Error(i.message || "Image worker stopped")));
        }),
        (n.onmessageerror = () =>
          HS(n, new Error("Image worker response could not be read"))),
        S0.pool.push(n));
    }
  } catch (s) {
    for (let n of S0.pool.slice()) HS(n, s);
  }
  return (
    S0.pool.length &&
      (globalThis.SF_FETCH = (s, n, i) =>
        S0.pool.length
          ? $G({
              url: new URL(s, document.baseURI).href,
              priority: n,
              bytes: !0,
              gz: i,
            })
          : null),
    Promise.all(S0.up)
  );
}
async function cut(o) {
  try {
    let t = new Uint8Array(await o.slice(0, 32).arrayBuffer()),
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
var WG = (o, t) =>
    sc(o, { priority: t, read: (e) => e.blob() }).then(async (e) => {
      let s = await cut(e),
        n = await hut(
          await createImageBitmap(e, {
            premultiplyAlpha: s ? "default" : "none",
            colorSpaceConversion: "none",
          }),
          o,
          s,
        );
      return (s && (n.sfOpaque = !0), n);
    }),
  KG = (o) =>
    globalThis.SF_TEXMAX
      ? /_(n|mask)\.\w+$/.test(o)
        ? globalThis.SF_TEXMAX >> 1
        : globalThis.SF_TEXMAX
      : 0,
  hut = async (o, t, e = !1) => {
    let s = KG(t),
      n = o.width,
      i = o.height;
    if (!s || Math.max(n, i) <= s) return o;
    for (; Math.max(n, i) > s;)
      ((n = Math.max(1, n >> 1)), (i = Math.max(1, i >> 1)));
    try {
      let a = await createImageBitmap(o, {
        resizeWidth: n,
        resizeHeight: i,
        resizeQuality: "high",
        premultiplyAlpha: e ? "default" : "none",
        colorSpaceConversion: "none",
      });
      if (a.width === n) return (o.close(), a);
      a.close();
    } catch {}
    return o;
  },
  YG = () => [...op.keys()],
  ka = {
    fn: null,
    released: !1,
    q: [],
    lq: new Map(),
    n: 0,
    done: 0,
    failed: 0,
  };
function JG(o) {
  ka.fn = o;
}
var d7 = () => ({
    deferred: ka.n,
    done: ka.done,
    failed: ka.failed,
    released: ka.released,
  }),
  fut = (o) => o.replace(/\.webp(\?.*)?$/, ".lq.webp$1");
function DS(o, t) {
  return S0.pool.length
    ? $G({ url: o, priority: t, max: KG(o) }).catch((e) =>
        e.name === "AssetLoadError" ? Promise.reject(e) : WG(o, t),
      )
    : WG(o, t);
}
function ZG(o) {
  let t = o?.image?.sfLQ,
    e = t && ka.lq.get(t);
  e && (e.full ? (o.image = US(e.full, t)) : e.texs.add(o));
}
async function QG(o = () => 0, t = 3) {
  if (ka.released) return;
  ka.released = !0;
  let e = ka.q.splice(0).sort((i, a) => o(i) - o(a)),
    s = async (i) => {
      try {
        let a = await DS(i, "low"),
          r = ka.lq.get(i);
        (r && (r.full = a),
          op.set(i, Object.assign(Promise.resolve(a), { img: a })),
          C5.set(a, i));
        for (let l of r?.texs || [])
          ((l.image = US(a, i)), (l.needsUpdate = !0), L5.arrived?.(l));
        r?.texs.clear();
      } catch (a) {
        (ka.failed++, console.warn("deferred image", i, a?.message || a));
      }
      ka.done++;
    },
    n = async () => {
      for (; e.length;) await s(e.shift());
    };
  await Promise.all(Array.from({ length: t }, n));
}
var u7 = null;
function tV(o) {
  u7 = o
    ? o.then(
        () => {},
        () => {},
      )
    : null;
}
var qG = (o) => (u7 ? u7.then(o) : o());
function ap(o, t = "low") {
  let e = new URL(o, document.baseURI).href,
    s = op.get(e);
  if (!s && ka.fn && !ka.released && ka.fn(e)) {
    (op.set(
      e,
      (s = qG(() => DS(fut(e), "high")).then(
        (i) => ((i.sfLQ = e), ka.lq.set(e, { img: i, texs: new Set() }), i),
        () => (
          (ka.q = ka.q.filter((i) => i !== e)),
          ka.n--,
          console.warn("no stand-in:", e),
          DS(e, t)
        ),
      )),
    ),
      ka.q.push(e),
      ka.n++);
    let n = s;
    return (
      n.then(
        (i) => {
          ((n.img = i), C5.set(i, e));
        },
        () => {},
      ),
      s
    );
  }
  if (!s) {
    op.set(e, (s = qG(() => DS(e, t))));
    let n = s;
    n.then(
      (i) => {
        ((n.img = i), C5.set(i, e));
      },
      () => {},
    );
  }
  return s;
}
var L5 = { arrived: null };
{
  let o = ko.prototype.load;
  ko.prototype.load = function (t, e, s, n) {
    return o.call(
      this,
      t,
      (i) => {
        (ZG(i), e?.(i), L5.arrived?.(i));
      },
      s,
      n,
    );
  };
}
typeof createImageBitmap == "function" &&
  typeof fetch == "function" &&
  (tc.prototype.load = function (o, t, e, s) {
    (this.path !== void 0 && (o = this.path + o),
      (o = this.manager.resolveURL(o)));
    let n = this.manager;
    (n.itemStart(o),
      ap(o).then(
        (i) => {
          (t?.(US(i)), n.itemEnd(o));
        },
        (i) => {
          (op.delete(new URL(o, document.baseURI).href),
            s?.(i),
            n.itemError(o),
            n.itemEnd(o));
        },
      ));
  });
globalThis.SF_TEXMAX &&
  typeof createImageBitmap == "function" &&
  zu &&
  (zu.prototype.load = function (o, t, e, s) {
    (this.path !== void 0 && (o = this.path + o),
      (o = this.manager.resolveURL(o)));
    let n = this.manager,
      i = this.options;
    (n.itemStart(o),
      sc(o, { read: (a) => a.blob() })
        .then(async (a) => {
          let r = await uut(a),
            l = globalThis.SF_TEXMAX,
            c = r?.[0],
            h = r?.[1],
            f = { ...i, colorSpaceConversion: "none" };
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
            (t?.(a), n.itemEnd(o));
          },
          (a) => {
            (s?.(a), n.itemError(o), n.itemEnd(o));
          },
        ));
  });
async function uut(o) {
  try {
    let t = new Uint8Array(await o.slice(0, 65536).arrayBuffer()),
      e = new DataView(t.buffer),
      s = (n, i) => String.fromCharCode(...t.subarray(n, n + i));
    if (s(1, 3) === "PNG") return [e.getUint32(16), e.getUint32(20)];
    if (s(0, 4) === "RIFF" && s(8, 4) === "WEBP") {
      let n = s(12, 4);
      if (n === "VP8 ")
        return [e.getUint16(26, !0) & 16383, e.getUint16(28, !0) & 16383];
      if (n === "VP8L") {
        let i = e.getUint32(21, !0);
        return [(i & 16383) + 1, ((i >> 14) & 16383) + 1];
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
        let i = t[n + 1],
          a = e.getUint16(n + 2);
        if (i >= 192 && i <= 207 && i !== 196 && i !== 200 && i !== 204)
          return [e.getUint16(n + 7), e.getUint16(n + 5)];
        n += 2 + a;
      }
  } catch {}
  return null;
}
var eV = [];
function e0(o, t = null) {
  let e = new ai();
  return (
    t?.(e),
    (e.userData.ok = ap(o).then(
      (s) => (
        (e.image = US(s)),
        (e.needsUpdate = !0),
        ZG(e),
        L5.arrived?.(e),
        !0
      ),
      () => (console.warn("texture missing", o), !1),
    )),
    eV.push(e.userData.ok),
    e
  );
}
var sV = () => Promise.all(eV);
es();
var GS = new Map();
function I5(o, t) {
  if (!GS.has(o)) {
    let e = iV(o, t);
    (e.catch(() => {}), GS.set(o, e));
  }
}
var nV = [];
function p7(o, t) {
  o &&
    t &&
    nV.push({
      re: o,
      gate: t.then(
        () => {},
        () => {},
      ),
    });
}
function bo(o) {
  let t = GS.get(o);
  return t ? (GS.delete(o), t) : iV(o);
}
