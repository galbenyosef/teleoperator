// app 271 — math
// Lines 135533-135740 of readable/app.pretty.js (statement-aligned).
function _F(o) {
  let t = new me({
    color: 16777215,
    roughness: 0.85,
    metalness: 0,
    vertexColors: !0,
    map: o,
    alphaTest: 0.5,
    side: ls,
  });
  return (
    (t.userData.mbAlbedo = tyt),
    (t.userData.mbWind = 0),
    (t.userData.mbSkyVis = 2),
    t
  );
}
async function JZ(o = "assets/tex/", t = null) {
  let e = new ko(),
    s =
      ({ srgb: g = !0, repeat: b = !1 }) =>
      (v) => (
        (v.colorSpace = g ? Je : Nn),
        (v.flipY = !1),
        (v.anisotropy = 8),
        (v.userData.photo = !0),
        b && (v.wrapS = v.wrapT = oi),
        v
      ),
    n = (g, b = {}) =>
      t
        ? Promise.resolve(t(`${o}${g}.webp`, s(b)))
        : e
            .loadAsync(`${o}${g}.webp`)
            .then(s(b))
            .catch(() => null),
    i = ["bark_cyp", "bark_euc", "bark_palm", "bark_head", "bark_fan"],
    a = (g) => (globalThis.SF_LITE ? null : g()),
    [r, l, c, h, f, u, d, ...p] = await Promise.all([
      n("twigs"),
      n("palms"),
      a(() => n("twigs_n", { srgb: !1 })),
      n("shrubs"),
      a(() => n("shrubs_n", { srgb: !1 })),
      a(() => n("impostors")),
      a(() => n("bark_n", { srgb: !1, repeat: !0 })),
      ...i.flatMap((g) => [
        n(g, { repeat: !0 }),
        n(g + "_n", { srgb: !1, repeat: !0 }),
      ]),
    ]),
    m = {
      twigs: r,
      palms: l,
      twigs_n: c,
      shrubs: h,
      shrubs_n: f,
      impostors: u,
      bark_n: d,
    };
  return (
    i.forEach((g, b) => {
      ((m[g] = p[2 * b]), (m[g + "_n"] = p[2 * b + 1]));
    }),
    m
  );
}
var syt = new Set([...Object.keys(wx), "shelter"]),
  nyt = new Set(["tpole", "upole", "upolet"]),
  ZZ = new WeakMap();
function iyt(o) {
  let t = ZZ.get(o);
  return (
    t ||
      ((t = xM(o)),
      (t.userData = o.userData),
      (t.alphaTest = Math.max(o.alphaTest || 0, 0.72)),
      (t.name = (o.name || "leaf") + "_farsh"),
      ZZ.set(o, t)),
    t
  );
}
var ar = 315,
  TF = null;
function QZ(o) {
  TF = o;
}
function oyt() {
  let t = document.createElement("canvas");
  t.width = t.height = 256;
  let e = t.getContext("2d"),
    s = 7,
    n = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let a = 0; a < 260; a++) {
    let r = n() * Math.PI * 2,
      l = Math.sqrt(n()) * 256 * 0.44,
      c = 256 / 2 + Math.cos(r) * l,
      h = 256 / 2 + Math.sin(r) * l * 0.9,
      f = 58 + n() * 70,
      u = 90 + n() * 80;
    ((e.fillStyle = `rgb(${(f * 0.55) | 0},${u | 0},${(f * 0.35) | 0})`),
      e.save(),
      e.translate(c, h),
      e.rotate(n() * Math.PI),
      e.beginPath(),
      e.ellipse(0, 0, 7 + n() * 6, 3.5 + n() * 2.5, 0, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  let i = new Sn(t);
  return ((i.colorSpace = Je), (i.anisotropy = 4), i);
}
function ayt() {
  let e = document.createElement("canvas");
  ((e.width = 64), (e.height = 256));
  let s = e.getContext("2d");
  ((s.strokeStyle = "rgb(70,60,30)"),
    (s.lineWidth = 3),
    s.beginPath(),
    s.moveTo(64 / 2, 0),
    s.lineTo(64 / 2, 256),
    s.stroke());
  for (let i = 6; i < 256; i += 5) {
    let a = 30 * Math.sin(Math.PI * (i / 256) * 0.95 + 0.1);
    for (let r of [-1, 1])
      ((s.strokeStyle = `rgb(${60 + (i % 3) * 8},${105 + (i % 7) * 6},40)`),
        (s.lineWidth = 2.2),
        s.beginPath(),
        s.moveTo(64 / 2, i),
        s.lineTo(64 / 2 + r * a, i + 9),
        s.stroke());
  }
  let n = new Sn(e);
  return ((n.colorSpace = Je), n);
}
function tQ(o, t) {
  let e = o.attributes.position.count,
    s = new Float32Array(e * 4);
  for (let n = 0; n < e; n++)
    ((s[n * 4] = t[0]),
      (s[n * 4 + 1] = t[1]),
      (s[n * 4 + 2] = t[2]),
      (s[n * 4 + 3] = 1));
  return (o.setAttribute("color", new Te(s, 4)), o);
}
var eQ = (o) => {
    o = o.index ? o.toNonIndexed() : o;
    for (let t of Object.keys(o.attributes))
      ["position", "normal", "uv", "color"].includes(t) || o.deleteAttribute(t);
    return (
      o.attributes.uv ||
        o.setAttribute(
          "uv",
          new Te(new Float32Array(o.attributes.position.count * 2), 2),
        ),
      o
    );
  },
  hn = (o, t, e) => {
    let s = eQ(o);
    return (s.clearGroups(), e && s.applyMatrix4(e), tQ(s, t));
  },
  un = (o, t, e, s = 0, n = 0, i = 0, a = [1, 1, 1]) =>
    new fe().compose(
      new dt(o, t, e),
      new tn().setFromEuler(new vi(s, n, i)),
      new dt(...a),
    ),
  ryt = {
    tree0: ["plane", 11],
    tree1: ["ficus", 23],
    tree2: ["elm", 37],
    cypress: ["cypress", 41],
    euc: ["euc", 53],
    pine: ["pine", 67],
  };
function lyt() {
  if (typeof document > "u") return null;
  let o = document.createElement("canvas");
  o.width = o.height = 256;
  let t = o.getContext("2d"),
    e = (n) => {
      t.beginPath();
      for (let i = 0; i < 8; i++) {
        let a = Math.PI / 8 + (i * Math.PI) / 4;
        t[i ? "lineTo" : "moveTo"](
          128 + Math.cos(a) * n,
          128 + Math.sin(a) * n,
        );
      }
      t.closePath();
    };
  ((t.fillStyle = "#d8d8d8"),
    t.fillRect(0, 0, 256, 256),
    e(128 / Math.cos(Math.PI / 8)),
    (t.fillStyle = "#e6e6e6"),
    t.fill(),
    e(118 / Math.cos(Math.PI / 8)),
    (t.fillStyle = "#a40a0a"),
    t.fill(),
    (t.fillStyle = "#eeeeee"),
    (t.font = "bold 74px Arial, Helvetica, sans-serif"),
    (t.textAlign = "center"),
    (t.textBaseline = "middle"),
    t.fillText("STOP", 128, 134));
  let s = new Sn(o);
  return ((s.colorSpace = Je), (s.anisotropy = 8), s);
}
