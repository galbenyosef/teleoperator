// app 272 — math
// Lines 135264-135471 of readable/app.pretty.js (statement-aligned).
function YL(i) {
  let t = new Ee({
    color: 16777215,
    roughness: 0.85,
    metalness: 0,
    vertexColors: !0,
    map: i,
    alphaTest: 0.5,
    side: Ss,
  });
  return (
    (t.userData.mbAlbedo = Rbt),
    (t.userData.mbWind = 0),
    (t.userData.mbSkyVis = 2),
    t
  );
}
async function XY(i = "assets/tex/", t = null) {
  let e = new go(),
    s =
      ({ srgb: g = !0, repeat: b = !1 }) =>
      (x) => (
        (x.colorSpace = g ? is : On),
        (x.flipY = !1),
        (x.anisotropy = 8),
        (x.userData.photo = !0),
        b && (x.wrapS = x.wrapT = ti),
        x
      ),
    n = (g, b = {}) =>
      t
        ? Promise.resolve(t(`${i}${g}.webp`, s(b)))
        : e
            .loadAsync(`${i}${g}.webp`)
            .then(s(b))
            .catch(() => null),
    o = ["bark_cyp", "bark_euc", "bark_palm", "bark_head", "bark_fan"],
    a = (g) => (globalThis.SF_LITE ? null : g()),
    [r, l, c, h, f, u, d, ...p] = await Promise.all([
      n("twigs"),
      n("palms"),
      a(() => n("twigs_n", { srgb: !1 })),
      n("shrubs"),
      a(() => n("shrubs_n", { srgb: !1 })),
      a(() => n("impostors")),
      a(() => n("bark_n", { srgb: !1, repeat: !0 })),
      ...o.flatMap((g) => [
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
    o.forEach((g, b) => {
      ((m[g] = p[2 * b]), (m[g + "_n"] = p[2 * b + 1]));
    }),
    m
  );
}
var Cbt = new Set([...Object.keys(Fb), "shelter"]),
  Lbt = new Set(["tpole", "upole", "upolet"]),
  KY = new WeakMap();
function Ibt(i) {
  let t = KY.get(i);
  return (
    t ||
      ((t = Sw(i)),
      (t.userData = i.userData),
      (t.alphaTest = Math.max(i.alphaTest || 0, 0.72)),
      (t.name = (i.name || "leaf") + "_farsh"),
      KY.set(i, t)),
    t
  );
}
var ja = 315,
  ZL = null;
function YY(i) {
  ZL = i;
}
function Fbt() {
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
  let o = new Sn(t);
  return ((o.colorSpace = is), (o.anisotropy = 4), o);
}
function Nbt() {
  let e = document.createElement("canvas");
  ((e.width = 64), (e.height = 256));
  let s = e.getContext("2d");
  ((s.strokeStyle = "rgb(70,60,30)"),
    (s.lineWidth = 3),
    s.beginPath(),
    s.moveTo(64 / 2, 0),
    s.lineTo(64 / 2, 256),
    s.stroke());
  for (let o = 6; o < 256; o += 5) {
    let a = 30 * Math.sin(Math.PI * (o / 256) * 0.95 + 0.1);
    for (let r of [-1, 1])
      ((s.strokeStyle = `rgb(${60 + (o % 3) * 8},${105 + (o % 7) * 6},40)`),
        (s.lineWidth = 2.2),
        s.beginPath(),
        s.moveTo(64 / 2, o),
        s.lineTo(64 / 2 + r * a, o + 9),
        s.stroke());
  }
  let n = new Sn(e);
  return ((n.colorSpace = is), n);
}
function JY(i, t) {
  let e = i.attributes.position.count,
    s = new Float32Array(e * 4);
  for (let n = 0; n < e; n++)
    ((s[n * 4] = t[0]),
      (s[n * 4 + 1] = t[1]),
      (s[n * 4 + 2] = t[2]),
      (s[n * 4 + 3] = 1));
  return (i.setAttribute("color", new Te(s, 4)), i);
}
var ZY = (i) => {
    i = i.index ? i.toNonIndexed() : i;
    for (let t of Object.keys(i.attributes))
      ["position", "normal", "uv", "color"].includes(t) || i.deleteAttribute(t);
    return (
      i.attributes.uv ||
        i.setAttribute(
          "uv",
          new Te(new Float32Array(i.attributes.position.count * 2), 2),
        ),
      i
    );
  },
  on = (i, t, e) => {
    let s = ZY(i);
    return (s.clearGroups(), e && s.applyMatrix4(e), JY(s, t));
  },
  cn = (i, t, e, s = 0, n = 0, o = 0, a = [1, 1, 1]) =>
    new ye().compose(
      new xt(i, t, e),
      new wn().setFromEuler(new Ii(s, n, o)),
      new xt(...a),
    ),
  Bbt = {
    tree0: ["plane", 11],
    tree1: ["ficus", 23],
    tree2: ["elm", 37],
    cypress: ["cypress", 41],
    euc: ["euc", 53],
    pine: ["pine", 67],
  };
function Obt() {
  if (typeof document > "u") return null;
  let i = document.createElement("canvas");
  i.width = i.height = 256;
  let t = i.getContext("2d"),
    e = (n) => {
      t.beginPath();
      for (let o = 0; o < 8; o++) {
        let a = Math.PI / 8 + (o * Math.PI) / 4;
        t[o ? "lineTo" : "moveTo"](
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
  let s = new Sn(i);
  return ((s.colorSpace = is), (s.anisotropy = 8), s);
}
