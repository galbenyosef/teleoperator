// app 343 — math
// Lines 165685-165986 of readable/app.pretty.js (statement-aligned).
function $M(o) {
  let t = (c) => [-c[0], c[1], -c[2]],
    e = o.wheels.map(t),
    s = (e[0][2] + e[1][2] + e[2][2] + e[3][2]) / 4,
    n = (c) => [c[0], c[1], c[2] - s],
    i = t(o.min),
    a = t(o.max),
    r = [Math.min(i[0], a[0]), o.min[1], Math.min(i[2], a[2]) - s],
    l = [Math.max(i[0], a[0]), o.max[1], Math.max(i[2], a[2]) - s];
  return {
    mid: s,
    wheels: e.map(n),
    wheelR: o.wheelR.slice(),
    min: r,
    max: l,
    L: l[2] - r[2],
    W: l[0] - r[0],
    H: l[1] - r[1],
  };
}
var zE = { image: [10, 60] },
  Rc = () => globalThis.mindblown || null,
  a1 = () => typeof Rc()?.generate?.image == "function",
  Ch = () => typeof Rc()?.items?.pick == "function",
  qf = () => !!Rc()?.viewer?.signedIn,
  ast = () => Rc()?.viewer?.username || "";
var SE = { image: 0, car: 0 };
function rst() {
  let o = Rc(),
    t = (s) => {
      s &&
        ((SE.image = Math.max(0, +s.tokens_image || 0)),
        (SE.car = Math.max(0, +s.tokens_car || 0)));
    },
    e = () =>
      fetch("tune.json")
        .then((s) => s.json())
        .then((s) =>
          Object.fromEntries(Object.entries(s).map(([n, i]) => [n, i?.value])),
        )
        .catch(() => ({}));
  (typeof o?.tune == "function"
    ? Promise.resolve(o.tune()).catch(e)
    : e()
  ).then(t, () => {});
  try {
    o?.tune?.on?.(t);
  } catch {}
}
var QMt = (o) =>
    o >= 1e6
      ? (o / 1e6).toFixed(o >= 1e7 ? 0 : 1) + "M"
      : o >= 1e3
        ? Math.round(o / 1e3) + "k"
        : String(Math.round(o)),
  vd = (o, t = 1) =>
    SE[o] > 0 && t > 0 ? "\u2248 " + QMt(SE[o] * t) + " tokens" : "",
  T2 = (o, t = 1) => vd(o, t) || "Uses mindblown tokens";
function Tv() {
  return '<i class="gr-mb" aria-hidden="true"></i><span>Tokens</span><b>balance on mindblown.ai</b>';
}
var yd = {
    sign_in: [
      "Sign in to generate",
      "Generating uses your own mindblown allowance - sign in to mindblown first.",
    ],
    allowance: [
      "Allowance used up",
      "Your mindblown allowance for this month is spent. mindblown shows its plans to upgrade.",
    ],
    too_fast: [
      "Too many at once",
      "That is the limit for now (6 pictures a minute, 200 a day). Try again in a little while.",
    ],
    not_allowed: [
      "Try other words",
      "mindblown's safety check turned that one down. Describe the design differently.",
    ],
    unavailable: [
      "Generator unavailable",
      "mindblown could not make it right now. Try again shortly.",
    ],
    unconfirmed: ["Not sent", "Nothing was generated: it was not confirmed."],
    offline: [
      "Not on mindblown",
      "Generating works on the published game (teleop2.mindblown.ai), signed in to mindblown.",
    ],
  },
  t4t =
    /\b(porsche|ferrari|lamborghini|lambo|mclaren|bugatti|pagani|koenigsegg|aston ?martin|bentley|rolls[- ]?royce|maserati|alfa ?romeo|fiat|bmw|audi|mercedes(?:[- ]benz)?|amg|volkswagen|vw|tesla|waymo|cybertruck|cybercab|ford|mustang|chevrolet|chevy|corvette|camaro|dodge|viper|nissan|gt-?r|toyota|supra|honda|nsx|mazda|subaru|mitsubishi|lexus|jaguar|land ?rover|range ?rover|lotus|mini|hyundai|kia|rivian|lucid|gulf|martini|redbull|red bull|monster|castrol|shell|nike|adidas)\b/gi,
  e4t = (o) =>
    String(o || "")
      .replace(t4t, "")
      .replace(/\b[a-z]{0,3}\d+[a-z]{0,3}\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();
function _E(o, { mode: t = "f", palette: e = [], variation: s = 0 } = {}) {
  let n = e4t(o).slice(0, 600);
  return [
    t === "t"
      ? "Flat 2D vehicle wrap graphic: a seamless, tileable repeating pattern, edge to edge."
      : "Flat 2D side-profile livery layout for a car wrap, a very wide composition (about 3:1). All the graphics - stripes, colour blocks, shapes - sit in one horizontal band through the middle of the image (the part that runs along the doors, below the windows); the top and bottom quarters are one plain, flat background colour. Shapes run horizontally along the length, nothing important at the far left or right edges.",
    `Design: ${n || "a bold, modern racing livery"}.`,
    e.length ? `Colour palette: ${e.slice(0, 6).join(", ")}.` : "",
    "Opaque solid colours with high contrast, crisp vector-like edges, print-ready. Absolutely no text, no letters, no numbers, no race numbers, no logos, no brand marks, no model names, no watermark. No car, no vehicle, no background scene, no perspective, no shadows.",
    s ? `Variation ${s}: a fresh take on the same idea.` : "",
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 3900);
}
async function EE(o, { size: t = "wide", signal: e, confirmed: s = !1 } = {}) {
  let n = Rc();
  if (!s)
    return (
      console.warn("generate: not confirmed - not sent"),
      { refused: "unconfirmed" }
    );
  if (!a1()) return { refused: "offline" };
  let i = Promise.resolve()
    .then(() => n.generate.image(o, { size: t }))
    .then(
      (a) => a || { refused: "unavailable" },
      (a) => (
        console.warn("generate", a),
        {
          refused:
            a?.reason === "INVALID_REQUEST" ? "not_allowed" : "unavailable",
        }
      ),
    );
  return e
    ? new Promise((a) => {
        if (e.aborted) return a({ cancelled: !0, late: i });
        (e.addEventListener("abort", () => a({ cancelled: !0, late: i }), {
          once: !0,
        }),
          i.then(a));
      })
    : i;
}
async function s4t(o, t) {
  let e = Rc();
  if (!e?.items?.keep || !o) return null;
  try {
    return (
      (
        await e.items.keep(o, "image", {
          name: (String(t || "").trim() || "Car wrap").slice(0, 60),
        })
      )?.files?.png?.url || null
    );
  } catch (s) {
    return (console.warn("keep", s?.reason || s), null);
  }
}
var kE = "sf-drive.wrapdocs";
async function n4t(o, t = "") {
  let e = { c: null, p: [] },
    s;
  try {
    s = await (await fetch(o)).blob();
  } catch (i) {
    return (console.warn("wrap: share - the picture did not load", i), e);
  }
  try {
    e.p = (await XM(s)).slice(0, 3);
  } catch {}
  let n = Rc();
  if (typeof n?.creations?.publish != "function" || !qf()) return e;
  try {
    let i = await createImageBitmap(s),
      a = null;
    for (let [c, h] of [
      [640, 0.72],
      [512, 0.66],
      [448, 0.6],
      [384, 0.55],
      [320, 0.5],
      [256, 0.45],
    ]) {
      let f = Math.min(1, c / Math.max(i.width, i.height)),
        u = new OffscreenCanvas(
          Math.round(i.width * f),
          Math.round(i.height * f),
        );
      u.getContext("2d").drawImage(i, 0, 0, u.width, u.height);
      let d = await u.convertToBlob({ type: "image/jpeg", quality: h }),
        p = await new Promise((m) => {
          let g = new FileReader();
          ((g.onload = () => m(g.result)), g.readAsDataURL(d));
        });
      if (p.length < 30500) {
        a = p;
        break;
      }
    }
    if (!a) return e;
    let r = {
        kind: "wrap",
        schemaVersion: 1,
        value: { img: a, n: String(t).slice(0, 60) },
        requestId: crypto.randomUUID(),
      },
      l = null;
    for (let c = 0; c < 3 && !l; c++)
      try {
        l = await n.creations.publish(r);
      } catch (h) {
        if (h?.reason === "PUBLICATION_PENDING" || !h?.reason) {
          await new Promise((f) => setTimeout(f, 1500 * (c + 1)));
          continue;
        }
        if (h?.reason && /QUOTA|LIMIT/i.test(h.reason)) {
          await ost(0);
          continue;
        }
        throw h;
      }
    if (l?.id) {
      e.c = l.id;
      let c = [];
      try {
        c = JSON.parse(localStorage.getItem(kE) || "[]");
      } catch {}
      c.push(l.id);
      try {
        localStorage.setItem(kE, JSON.stringify(c));
      } catch {}
      ost(12);
    }
  } catch (i) {
    console.warn(
      "wrap: share - the public copy was not published",
      i?.reason || i,
    );
  }
  return e;
}
async function ost(o) {
  let t = Rc(),
    e = [];
  try {
    e = JSON.parse(localStorage.getItem(kE) || "[]");
  } catch {}
  for (; e.length > o;) {
    let s = e.shift();
    try {
      await t.creations.remove(s);
    } catch {}
  }
  try {
    localStorage.setItem(kE, JSON.stringify(e));
  } catch {}
}
async function TE(o, t, e) {
  let { clean: s } = await Promise.resolve().then(() => (P0(), bZ)),
    { aliasWrap: n, shaOf: i } = await Promise.resolve().then(() => (h2(), aZ)),
    a = s(o);
  if (!a?.w?.u) return a;
  if (!i(a.w.u)) {
    let l = (t || []).find((h) => h.url === a.w.u),
      c = l?.sha ? await s4t(l.sha, e || a.w.n || l.words) : null;
    c &&
      (n(a.w.u, c), l && (l.url = c), (a = s({ ...a, w: { ...a.w, u: c } })));
  }
  let r = await n4t(a.w.u, e || a.w.n);
  return s({
    ...a,
    w: {
      ...a.w,
      ...(r.c ? { c: r.c } : {}),
      ...(r.p.length ? { p: r.p } : {}),
    },
  });
}
async function Rv() {
  let o = Rc();
  if (!Ch()) return null;
  try {
    let t = await o.items.pick("car");
    return t?.picked && !t.picked.own ? t.picked : null;
  } catch (t) {
    return (console.warn("pick", t?.reason || t), null);
  }
}
async function RE() {
  let o = Rc();
  if (typeof o?.items?.shared != "function") return [];
  try {
    return (await o.items.shared("vehicle", { quality: "high" })) || [];
  } catch (t) {
    return (console.warn("shared", t?.reason || t), []);
  }
}
async function lst(o) {
  let t = Rc();
  if (!(typeof t?.items?.equip != "function" || !o))
    try {
      await t.items.equip("car", o);
    } catch {}
}
