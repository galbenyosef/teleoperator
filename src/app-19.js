// app 19 — level
// Lines 42258-42596 of readable/app.pretty.js (statement-aligned).
function TL(i) {
  typeof i == "string" && (i = { u: i });
  let t = sY(i);
  if (!t) return { failed: !0, ready: !1, p: Promise.resolve(null) };
  let e = vm.get(t);
  return (
    e ||
    ((e = { tex: null, ready: !1, failed: !1, src: null }),
    (e.p = (async () => {
      let s = null;
      if (i.u)
        try {
          ((s = await Ygt(i.u)), (e.src = "file"));
        } catch (l) {
          QK(
            i,
            "the picture's file did not load (" +
              (l.message || l) +
              ")" +
              (i.c ? " - its public copy instead" : ""),
          );
        }
      if (!s && i.c)
        try {
          ((s = await Jgt(i.c)), (e.src = "copy"));
        } catch (l) {
          QK(
            i,
            "the public copy did not load (" +
              (l.reason || l.message || l) +
              ")",
          );
        }
      if (!s) throw new Error("no source");
      let n = await createImageBitmap(s),
        o = Kgt(),
        a = Math.min(1, o / Math.max(n.width, n.height));
      if (a < 1) {
        let l = await createImageBitmap(n, {
          resizeWidth: Math.round(n.width * a),
          resizeHeight: Math.round(n.height * a),
          resizeQuality: "high",
        });
        (n.close?.(), (n = l));
      }
      let r = new ei(n);
      return (
        (r.colorSpace = is),
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
          vm.get(t) === e && vm.delete(t);
        }, 3e4),
        null
      ),
    )),
    vm.set(t, e),
    e)
  );
}
function Zgt(i, t) {
  let e = vm.get(i);
  e && t && !vm.has(t) && vm.set(t, e);
}
function i_(i) {
  let t = i?.paintKit;
  if (!t) return null;
  if (SL(t.box)) return t.box;
  t.box = null;
  let e = new Ti(),
    s = null;
  if (
    ((i.body || i.root).traverse((o) => {
      if (o.isMesh && o.material === t.mat && o.geometry) {
        let a = o.geometry;
        !a.boundingBox && ML(a.attributes.position) && a.computeBoundingBox();
        let r = a.boundingBox;
        r &&
          SL([...r.min.toArray(), ...r.max.toArray()]) &&
          (e.union(r), (s ||= o));
      }
    }),
    !s)
  )
    return null;
  let n = t.belt ?? null;
  if (n == null) {
    i.root.updateMatrixWorld(!0);
    let o = new ye().copy(s.matrixWorld).invert(),
      a = new xt(),
      r = new xt(),
      l = [];
    (i.root.traverse((c) => {
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
      if (!ML(f) || !ML(u)) return;
      let d = new ye().multiplyMatrices(o, c.matrixWorld),
        p = new Mn().getNormalMatrix(d);
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
      (o) => Math.round(o * 1e3) / 1e3,
    ))
  );
}
function ML(i) {
  return (
    !!i &&
    (i.isInterleavedBufferAttribute
      ? i.data.array.length >= i.count * i.data.stride
      : i.array.length >= i.count * i.itemSize) &&
    i.count > 0
  );
}
function SL(i) {
  return (
    Array.isArray(i) &&
    i.length >= 6 &&
    i.slice(0, 6).every(Number.isFinite) &&
    i[3] > i[0] &&
    i[4] > i[1] &&
    i[5] > i[2] &&
    (i[6] === void 0 || Number.isFinite(i[6]))
  );
}
var p0,
  Eu,
  Vgt,
  s_,
  n_,
  $gt,
  Xgt,
  EL,
  vm,
  Kgt,
  fw,
  QK,
  eY,
  sY,
  wm = Vi(() => {
    as();
    ((p0 = (i) => (+i).toFixed(4)), (Eu = { f: "Artwork", t: "Pattern" }));
    Vgt = /^[0-9a-f]{64}$/;
    ((s_ = (i) => "/__mb/items/" + i + ".png"),
      (n_ = (i) => {
        let t = /^\/__mb\/items\/([0-9a-f]{64})\.png$/.exec(i || "");
        return t ? t[1] : null;
      }),
      ($gt = /^[A-Za-z0-9_-]{4,64}$/),
      (Xgt = /^#[0-9a-f]{6}$/));
    ((EL = (i) => {
      let t = /^([0-9a-f]{64})\.([ft])$/.exec(i || "");
      return t ? { u: s_(t[1]), m: t[2], n: "" } : null;
    }),
      (vm = new Map()),
      (Kgt = () =>
        globalThis.SF_TIER === "mobile" || globalThis.SF_LITE ? 1024 : 2048),
      (fw = []),
      (QK = (i, t) => {
        let e = {
          t: Math.round(performance.now()),
          u: i.u,
          c: i.c || null,
          msg: t,
        };
        (fw.push(e),
          fw.length > 50 && fw.shift(),
          console.warn("wrap:", t, i.u || "", i.c || ""),
          globalThis.window && ((window.__sf ||= {}).wrapLog = fw));
      }),
      (eY = (i) => new Promise((t) => setTimeout(t, i))));
    sY = (i) => i?.u || (i?.c ? "c:" + i.c : null);
  });
function lY(i, t = Math.random) {
  let e = RL.reduce((o, a) => o + a[1], 0) * t(),
    s = RL[0][0];
  for (let [o, a] of RL)
    if ((e -= a) <= 0) {
      s = o;
      break;
    }
  let n = sbt(i);
  return { level: i, cash: n ? Math.min(s, 1e3) : s, unlock: n };
}
var cp,
  Sm,
  R9t,
  sbt,
  rY,
  RL,
  uw = Vi(() => {
    ((cp = [
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
      (Sm = cp
        .filter((i) => i.kind === "colour")
        .map((i) => [i.hex, i.name, i.level])),
      (R9t = Object.fromEntries(
        cp.filter((i) => i.kind === "finish").map((i) => [i.id, i.level]),
      )),
      (sbt = (i) => cp.find((t) => t.level === i) || null),
      (rY = (i) => cp.find((t) => t.level > i) || null),
      (RL = [
        [500, 30],
        [750, 25],
        [1e3, 20],
        [1500, 12],
        [2500, 8],
        [5e3, 4],
        [1e4, 1],
      ]));
  });
var pY = {};
wh(pY, {
  BODY: () => hp,
  BODY_X: () => Sm,
  CALIPERS: () => ax,
  FINISHES: () => fp,
  RIMS: () => ef,
  applyPaint: () => $r,
  canPaint: () => rx,
  clean: () => qa,
  decode: () => dw,
  encode: () => LL,
  factoryHex: () => c_,
  finishOf: () => tf,
  makeKit: () => pl,
  nameOf: () => sf,
  prewarm: () => mw,
  same: () => pw,
  setHookReady: () => IL,
});
function qa(i) {
  if (!i || typeof i != "object") return null;
  let t = (n) =>
      typeof n == "string" && ibt.test(n.toLowerCase())
        ? n.toLowerCase()
        : null,
    e = { c: t(i.c), f: tf(i.f) ? i.f : null, cal: t(i.cal), rim: t(i.rim) },
    s = ym(i.w);
  return (s && (e.w = s), e.c || e.f || e.cal || e.rim || e.w ? e : null);
}
function LL(i) {
  if (((i = qa(i)), !i)) return "";
  let t = [
    i.c ? i.c.slice(1) : "-",
    i.f ? tf(i.f).key : "-",
    i.cal ? i.cal.slice(1) : "-",
    i.rim ? i.rim.slice(1) : "-",
  ];
  for (; t.length && t[t.length - 1] === "-";) t.pop();
  let e = _L(i.w);
  return t.join(".") + (e ? "~" + e : "");
}
function dw(i) {
  if (typeof i != "string" || !i || i.length > 220) return null;
  let t = i.indexOf("~"),
    e = t < 0 ? i : i.slice(0, t),
    s = t < 0 ? "" : i.slice(t + 1),
    [n, o, a, r] = e.split("."),
    l = (c) => (c && c !== "-" ? "#" + c : null);
  return qa({
    c: l(n),
    f: fp.find((c) => c.key === o)?.id || null,
    cal: l(a),
    rim: l(r),
    w: zL(s) || EL(s),
  });
}
function rx(i) {
  let t = i?.paintKit;
  return t
    ? {
        body: !0,
        finish: !0,
        calipers: !!t.calipers?.length,
        rims: !!t.rims?.length,
        wrap: !!t.wrap,
        picture: !!i_(i),
      }
    : null;
}
function fY(i, t, e = null) {
  let s =
      i.kind + ":" + t + (e ? ":w" + e + ":" + (i.box || []).join(",") : ""),
    n = hY.get(s);
  if (!n) {
    let { coat: o, coatRough: a, ...r } = PL[t];
    ((n = i.hook(
      { g: 1, b: 1, ...r, ...(e ? { wrap: { mode: e, box: i.box } } : {}) },
      { coat: o, coatRough: a },
    )),
      hY.set(s, n));
  }
  return n;
}
function mw(i, t) {
  t?.root && i?.prewarm?.(t.root, { priority: 1 });
}
