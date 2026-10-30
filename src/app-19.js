// app 19 — level
// Lines 42342-42682 of readable/app.pretty.js (statement-aligned).
function iF(o) {
  typeof o == "string" && (o = { u: o });
  let t = oZ(o);
  if (!t) return { failed: !0, ready: !1, p: Promise.resolve(null) };
  let e = l2.get(t);
  return (
    e ||
    ((e = { tex: null, ready: !1, failed: !1, src: null }),
    (e.p = (async () => {
      let s = null;
      if (o.u)
        try {
          ((s = await y3t(o.u)), (e.src = "file"));
        } catch (l) {
          sZ(
            o,
            "the picture's file did not load (" +
              (l.message || l) +
              ")" +
              (o.c ? " - its public copy instead" : ""),
          );
        }
      if (!s && o.c)
        try {
          ((s = await w3t(o.c)), (e.src = "copy"));
        } catch (l) {
          sZ(
            o,
            "the public copy did not load (" +
              (l.reason || l.message || l) +
              ")",
          );
        }
      if (!s) throw new Error("no source");
      let n = await createImageBitmap(s),
        i = v3t(),
        a = Math.min(1, i / Math.max(n.width, n.height));
      if (a < 1) {
        let l = await createImageBitmap(n, {
          resizeWidth: Math.round(n.width * a),
          resizeHeight: Math.round(n.height * a),
          resizeQuality: "high",
        });
        (n.close?.(), (n = l));
      }
      let r = new ai(n);
      return (
        (r.colorSpace = Je),
        (r.flipY = !1),
        (r.anisotropy = 8),
        (r.needsUpdate = !0),
        (r.name = "wrap"),
        (e.tex = r),
        (e.ready = !0),
        r
      );
    })().catch(
      () => (
        (e.failed = !0),
        setTimeout(() => {
          l2.get(t) === e && l2.delete(t);
        }, 3e4),
        null
      ),
    )),
    l2.set(t, e),
    e)
  );
}
function M3t(o, t) {
  let e = l2.get(o);
  e && t && !l2.has(t) && l2.set(t, e);
}
function i_(o) {
  let t = o?.paintKit;
  if (!t) return null;
  if (QI(t.box)) return t.box;
  t.box = null;
  let e = new xi(),
    s = null;
  if (
    ((o.body || o.root).traverse((i) => {
      if (i.isMesh && i.material === t.mat && i.geometry) {
        let a = i.geometry;
        !a.boundingBox && ZI(a.attributes.position) && a.computeBoundingBox();
        let r = a.boundingBox;
        r &&
          QI([...r.min.toArray(), ...r.max.toArray()]) &&
          (e.union(r), (s ||= i));
      }
    }),
    !s)
  )
    return null;
  let n = t.belt ?? null;
  if (n == null) {
    o.root.updateMatrixWorld(!0);
    let i = new fe().copy(s.matrixWorld).invert(),
      a = new dt(),
      r = new dt(),
      l = [];
    (o.root.traverse((c) => {
      let h = [c.material].flat()[0];
      if (
        !c.isMesh ||
        !h ||
        h === t.mat ||
        !(
          /glass|window|windscreen/i.test(h.name || "") ||
          h.transmission > 0.05 ||
          (h.transparent && h.opacity < 0.95)
        )
      )
        return;
      let f = c.geometry.attributes.position,
        u = c.geometry.attributes.normal;
      if (!ZI(f) || !ZI(u)) return;
      let d = new fe().multiplyMatrices(i, c.matrixWorld),
        p = new yn().getNormalMatrix(d);
      for (let m = 0; m < f.count; m += Math.max(1, Math.floor(f.count / 4e3)))
        (r.fromBufferAttribute(u, m).applyMatrix3(p).normalize(),
          !(Math.abs(r.x) < 0.45) &&
            (a.fromBufferAttribute(f, m).applyMatrix4(d),
            a.y > e.min.y + (e.max.y - e.min.y) * 0.35 && l.push(a.y)));
    }),
      l.sort((c, h) => c - h),
      l.length > 20 && (n = l[Math.floor(l.length * 0.1)]));
  }
  return (
    (n > e.min.y + (e.max.y - e.min.y) * 0.3 && n < e.max.y) ||
      (n = e.min.y + (e.max.y - e.min.y) * 0.58),
    (t.box = [e.min.x, e.min.y, e.min.z, e.max.x, e.max.y, e.max.z, n].map(
      (i) => Math.round(i * 1e3) / 1e3,
    ))
  );
}
function ZI(o) {
  return (
    !!o &&
    (o.isInterleavedBufferAttribute
      ? o.data.array.length >= o.count * o.data.stride
      : o.array.length >= o.count * o.itemSize) &&
    o.count > 0
  );
}
function QI(o) {
  return (
    Array.isArray(o) &&
    o.length >= 6 &&
    o.slice(0, 6).every(Number.isFinite) &&
    o[3] > o[0] &&
    o[4] > o[1] &&
    o[5] > o[2] &&
    (o[6] === void 0 || Number.isFinite(o[6]))
  );
}
var A0,
  ld,
  g3t,
  s_,
  n_,
  b3t,
  x3t,
  nF,
  l2,
  v3t,
  aM,
  sZ,
  iZ,
  oZ,
  h2 = Ki(() => {
    es();
    ((A0 = (o) => (+o).toFixed(4)), (ld = { f: "Artwork", t: "Pattern" }));
    g3t = /^[0-9a-f]{64}$/;
    ((s_ = (o) => "/__mb/items/" + o + ".png"),
      (n_ = (o) => {
        let t = /^\/__mb\/items\/([0-9a-f]{64})\.png$/.exec(o || "");
        return t ? t[1] : null;
      }),
      (b3t = /^[A-Za-z0-9_-]{4,64}$/),
      (x3t = /^#[0-9a-f]{6}$/));
    ((nF = (o) => {
      let t = /^([0-9a-f]{64})\.([ft])$/.exec(o || "");
      return t ? { u: s_(t[1]), m: t[2], n: "" } : null;
    }),
      (l2 = new Map()),
      (v3t = () =>
        globalThis.SF_TIER === "mobile" || globalThis.SF_LITE ? 1024 : 2048),
      (aM = []),
      (sZ = (o, t) => {
        let e = {
          t: Math.round(performance.now()),
          u: o.u,
          c: o.c || null,
          msg: t,
        };
        (aM.push(e),
          aM.length > 50 && aM.shift(),
          console.warn("wrap:", t, o.u || "", o.c || ""),
          globalThis.window && ((window.__sf ||= {}).wrapLog = aM));
      }),
      (iZ = (o) => new Promise((t) => setTimeout(t, o))));
    oZ = (o) => o?.u || (o?.c ? "c:" + o.c : null);
  });
function fZ(o, t = Math.random) {
  let e = aF.reduce((i, a) => i + a[1], 0) * t(),
    s = aF[0][0];
  for (let [i, a] of aF)
    if ((e -= a) <= 0) {
      s = i;
      break;
    }
  let n = _3t(o);
  return { level: o, cash: n ? Math.min(s, 1e3) : s, unlock: n };
}
var Up,
  f2,
  LCt,
  _3t,
  hZ,
  aF,
  lM = Ki(() => {
    ((Up = [
      { level: 2, kind: "colour", hex: "#ff2fa0", name: "Festival Pink" },
      { level: 3, kind: "colour", hex: "#35d0ff", name: "Horizon Cyan" },
      { level: 4, kind: "finish", id: "candy", name: "Candy" },
      { level: 5, kind: "colour", hex: "#c6ff00", name: "Neon Volt" },
      { level: 6, kind: "colour", hex: "#8e0f22", name: "Candy Apple" },
      { level: 8, kind: "finish", id: "flip", name: "Colour Flip" },
      { level: 10, kind: "colour", hex: "#d9c8ff", name: "Lilac Frost" },
      { level: 12, kind: "colour", hex: "#ff8a00", name: "Golden Gate Orange" },
      { level: 15, kind: "colour", hex: "#00d69a", name: "Mint Rush" },
      { level: 20, kind: "colour", hex: "#2a2aff", name: "Ultramarine" },
    ]),
      (f2 = Up.filter((o) => o.kind === "colour").map((o) => [
        o.hex,
        o.name,
        o.level,
      ])),
      (LCt = Object.fromEntries(
        Up.filter((o) => o.kind === "finish").map((o) => [o.id, o.level]),
      )),
      (_3t = (o) => Up.find((t) => t.level === o) || null),
      (hZ = (o) => Up.find((t) => t.level > o) || null),
      (aF = [
        [500, 30],
        [750, 25],
        [1e3, 20],
        [1500, 12],
        [2500, 8],
        [5e3, 4],
        [1e4, 1],
      ]));
  });
var bZ = {};
Kh(bZ, {
  BODY: () => Gp,
  BODY_X: () => f2,
  CALIPERS: () => qx,
  FINISHES: () => Vp,
  RIMS: () => If,
  applyPaint: () => c0,
  canPaint: () => jx,
  clean: () => or,
  decode: () => cM,
  encode: () => cF,
  factoryHex: () => c_,
  finishOf: () => Lf,
  makeKit: () => Ir,
  nameOf: () => Ff,
  prewarm: () => fM,
  same: () => hM,
  setHookReady: () => hF,
});
function or(o) {
  if (!o || typeof o != "object") return null;
  let t = (n) =>
      typeof n == "string" && T3t.test(n.toLowerCase())
        ? n.toLowerCase()
        : null,
    e = { c: t(o.c), f: Lf(o.f) ? o.f : null, cal: t(o.cal), rim: t(o.rim) },
    s = c2(o.w);
  return (s && (e.w = s), e.c || e.f || e.cal || e.rim || e.w ? e : null);
}
function cF(o) {
  if (((o = or(o)), !o)) return "";
  let t = [
    o.c ? o.c.slice(1) : "-",
    o.f ? Lf(o.f).key : "-",
    o.cal ? o.cal.slice(1) : "-",
    o.rim ? o.rim.slice(1) : "-",
  ];
  for (; t.length && t[t.length - 1] === "-";) t.pop();
  let e = eF(o.w);
  return t.join(".") + (e ? "~" + e : "");
}
function cM(o) {
  if (typeof o != "string" || !o || o.length > 220) return null;
  let t = o.indexOf("~"),
    e = t < 0 ? o : o.slice(0, t),
    s = t < 0 ? "" : o.slice(t + 1),
    [n, i, a, r] = e.split("."),
    l = (c) => (c && c !== "-" ? "#" + c : null);
  return or({
    c: l(n),
    f: Vp.find((c) => c.key === i)?.id || null,
    cal: l(a),
    rim: l(r),
    w: sF(s) || nF(s),
  });
}
function jx(o) {
  let t = o?.paintKit;
  return t
    ? {
        body: !0,
        finish: !0,
        calipers: !!t.calipers?.length,
        rims: !!t.rims?.length,
        wrap: !!t.wrap,
        picture: !!i_(o),
      }
    : null;
}
function pZ(o, t, e = null) {
  let s =
      o.kind + ":" + t + (e ? ":w" + e + ":" + (o.box || []).join(",") : ""),
    n = dZ.get(s);
  if (!n) {
    let { coat: i, coatRough: a, ...r } = rF[t];
    ((n = o.hook(
      { g: 1, b: 1, ...r, ...(e ? { wrap: { mode: e, box: o.box } } : {}) },
      { coat: i, coatRough: a },
    )),
      dZ.set(s, n));
  }
  return n;
}
function fM(o, t) {
  t?.root && o?.prewarm?.(t.root, { priority: 1 });
}
