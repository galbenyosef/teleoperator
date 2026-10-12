// app 326 — math
// Lines 159187-159536 of readable/app.pretty.js (statement-aligned).
var ec = {
    flat6: { label: "Flat-six", audio: "flat6", ice: !0 },
    v12: { label: "V12", audio: "v12", ice: !0 },
    diesel: { label: "Diesel", audio: "dsl", ice: !0 },
    small: { label: "Small engine", audio: "sml", ice: !0 },
    v8: { label: "V8, high-revving", audio: "ferrari", ice: !0 },
    v8tt: { label: "V8, twin-turbo", audio: "corvette", ice: !0 },
    ev: { label: "Electric", audio: "waymo", ice: !1 },
    ev_sport: { label: "Electric, sporty", audio: "cybercab", ice: !1 },
    ev_truck: { label: "Electric, heavy", audio: "cybertruck", ice: !1 },
  },
  nz = [
    "flat6",
    "v8",
    "v8tt",
    "v12",
    "diesel",
    "small",
    "ev",
    "ev_sport",
    "ev_truck",
  ],
  iF = (i) => (typeof i == "string" && Object.hasOwn(ec, i) ? i : null),
  y3t = [
    [
      /\b(electric|ev|e-?tron|battery|plug-?in|zero[- ]emission|taycan|tesla|model [sxy3]|cyber ?(truck|cab)|robotaxi|leaf|ioniq|rivian|lucid)\b/,
      "ev",
    ],
    [
      /\b(flat[- ]?(six|6)|boxer|air[- ]?cooled|911|porsche|carrera|cayman|boxster|gt3|targa|singer)\b/,
      "flat6",
    ],
    [
      /\b(v12|v-12|twelve[- ]cylinder|lamborghini|aventador|murcielago|countach|pagani|zonda|aston|vanquish|db9|f12|812)\b/,
      "v12",
    ],
    [
      /\b(diesel|tdi|turbo-?diesel|pickup|pick-up|4x4|off-?road|truck|lorry|land ?cruiser|hilux|defender|bus|van)\b/,
      "diesel",
    ],
    [
      /\b(ferrari|f40|f50|enzo|supercar|hypercar|v10|formula|race ?car|racing|le mans)\b/,
      "v8",
    ],
    [
      /\b(v8|v-8|corvette|mustang|camaro|charger|challenger|hemi|muscle|amg|hot ?rod|nascar|twin[- ]?turbo|biturbo|jeep|hummer)\b/,
      "v8tt",
    ],
    [
      /\b(mini|kei|small|beetle|bug|fiat|smart|city car|2cv|kart|go-?kart|buggy|microcar|bubble ?car)\b/,
      "small",
    ],
    [
      /\b(hatch|hatchback|roadster|classic|vintage|retro|sports? car|coupe)\b/,
      "flat6",
    ],
  ];
function w3t({ name: i = "", prompt: t = "", L: e = 4.5, H: s = 1.4 } = {}) {
  let n = (String(i) + " " + String(t)).toLowerCase();
  for (let [o, a] of y3t)
    if (o.test(n))
      return a !== "ev"
        ? a
        : /\b(truck|pickup|pick-up|suv|van|bus|4x4|off-?road)\b/.test(n) ||
            e > 5.1 ||
            s > 1.75
          ? "ev_truck"
          : /\b(sport|super|hyper|race|racing|coupe|roadster|fast)\b/.test(n) ||
              s < 1.3
            ? "ev_sport"
            : "ev";
  return e > 5.1 || s > 1.75 ? "v8tt" : "flat6";
}
function iz(i, t = "") {
  if (!i) return "ev";
  let e = iF(i.snd);
  if (e) return e;
  let s = i.vehicle,
    n = s ? Math.abs(s.max[2] - s.min[2]) : 4.5,
    o = s ? Math.abs(s.max[1] - s.min[1]) : 1.4;
  return w3t({ name: i.name, prompt: t || i.prompt || "", L: n, H: o });
}
var oQ = /^[0-9a-f]{64}$/,
  iQ = (i, t, e) => (Number.isFinite(+i) ? Math.max(t, Math.min(e, +i)) : null);
function oF(i) {
  if (!i || typeof i != "object") return null;
  let t = (c) =>
      Array.isArray(c) &&
      c.length === 3 &&
      c.every((h) => iQ(h, -20, 20) !== null)
        ? c.map((h) => Math.round(+h * 1e3) / 1e3)
        : null,
    e = t(i.min),
    s = t(i.max);
  if (!e || !s) return null;
  let n = s[2] - e[2],
    o = s[0] - e[0],
    a = s[1] - e[1];
  if (!(n >= 1.2 && n <= 9 && o >= 0.6 && o <= 3.5 && a > 0.3 && a < 5))
    return null;
  let r =
    Array.isArray(i.wheels) && i.wheels.length === 4 ? i.wheels.map(t) : null;
  if (!r || r.some((c) => !c)) return null;
  let l =
    Array.isArray(i.wheelR) &&
    i.wheelR.length === 4 &&
    i.wheelR.every((c) => iQ(c, 0.05, 1.5) !== null)
      ? i.wheelR.map((c) => Math.round(+c * 1e3) / 1e3)
      : r.map((c) => Math.max(0.1, c[1]));
  return { min: e, max: s, wheels: r, wheelR: l };
}
function lf(i) {
  let t =
      i?.files?.glb?.sha256 ||
      (/\/__mb\/items\/([0-9a-f]{64})\.glb$/.exec(i?.files?.glb?.url || "") ||
        [])[1],
    e = oF(i?.vehicle);
  if (!oQ.test(t || "") || !e) return null;
  let s =
    i.files?.icon?.url &&
    /^\/__mb\/items\/[0-9a-f]{64}\.png$/.test(i.files.icon.url)
      ? i.files.icon.url
      : null;
  return {
    id: typeof i.id == "string" ? i.id.slice(0, 64) : "",
    name: aF(i.name) || "Custom car",
    sha: t,
    icon: s,
    vehicle: e,
    own: !i.shared,
  };
}
var aF = (i) =>
  typeof i == "string"
    ? i
        .replace(/[^A-Za-z0-9 _.'-]/g, "")
        .trim()
        .slice(0, 24)
    : "";
function vl(i) {
  if (!i || typeof i != "object" || !oQ.test(i.sha || "")) return null;
  let t = oF(i.vehicle);
  return t
    ? {
        id:
          typeof i.id == "string"
            ? i.id.replace(/[^A-Za-z0-9-]/g, "").slice(0, 64)
            : "",
        name: aF(i.name) || "Custom car",
        sha: i.sha,
        icon:
          typeof i.icon == "string" &&
          /^\/__mb\/items\/[0-9a-f]{64}\.png$/.test(i.icon)
            ? i.icon
            : null,
        vehicle: t,
        own: !!i.own,
        ...(iF(i.snd) ? { snd: i.snd } : {}),
      }
    : null;
}
var rF = (i) => "/__mb/items/" + i.sha + ".glb";
function lF(i) {
  if (((i = vl(i)), !i)) return "";
  let t = i.vehicle,
    e = [...t.min, ...t.max, ...t.wheels.flat(), ...t.wheelR].map(
      (s) => +s.toFixed(3),
    );
  return i.sha + "|" + i.name + "|" + e.join(",") + (i.snd ? "|" + i.snd : "");
}
function oz(i) {
  if (typeof i != "string" || i.length > 400) return null;
  let [t, e, s, n] = i.split("|"),
    o = (s || "").split(",").map(Number);
  return o.length !== 22 || !o.every(Number.isFinite)
    ? null
    : vl({
        sha: t,
        name: e,
        snd: n,
        vehicle: {
          min: o.slice(0, 3),
          max: o.slice(3, 6),
          wheels: [
            o.slice(6, 9),
            o.slice(9, 12),
            o.slice(12, 15),
            o.slice(15, 18),
          ],
          wheelR: o.slice(18, 22),
        },
      });
}
function Vw(i) {
  let t = (c) => [-c[0], c[1], -c[2]],
    e = i.wheels.map(t),
    s = (e[0][2] + e[1][2] + e[2][2] + e[3][2]) / 4,
    n = (c) => [c[0], c[1], c[2] - s],
    o = t(i.min),
    a = t(i.max),
    r = [Math.min(o[0], a[0]), i.min[1], Math.min(o[2], a[2]) - s],
    l = [Math.max(o[0], a[0]), i.max[1], Math.max(o[2], a[2]) - s];
  return {
    mid: s,
    wheels: e.map(n),
    wheelR: i.wheelR.slice(),
    min: r,
    max: l,
    L: l[2] - r[2],
    W: l[0] - r[0],
    H: l[1] - r[1],
  };
}
var lz = { image: [10, 60] },
  sc = () => globalThis.mindblown || null,
  Mp = () => typeof sc()?.generate?.image == "function",
  nh = () => typeof sc()?.items?.pick == "function",
  cf = () => !!sc()?.viewer?.signedIn,
  rQ = () => sc()?.viewer?.username || "";
var az = { image: 0, car: 0 };
function lQ() {
  let i = sc(),
    t = (s) => {
      s &&
        ((az.image = Math.max(0, +s.tokens_image || 0)),
        (az.car = Math.max(0, +s.tokens_car || 0)));
    },
    e = () =>
      fetch("tune.json")
        .then((s) => s.json())
        .then((s) =>
          Object.fromEntries(Object.entries(s).map(([n, o]) => [n, o?.value])),
        )
        .catch(() => ({}));
  (typeof i?.tune == "function"
    ? Promise.resolve(i.tune()).catch(e)
    : e()
  ).then(t, () => {});
  try {
    i?.tune?.on?.(t);
  } catch {}
}
var M3t = (i) =>
    i >= 1e6
      ? (i / 1e6).toFixed(i >= 1e7 ? 0 : 1) + "M"
      : i >= 1e3
        ? Math.round(i / 1e3) + "k"
        : String(Math.round(i)),
  Ou = (i, t = 1) =>
    az[i] > 0 && t > 0 ? "\u2248 " + M3t(az[i] * t) + " tokens" : "",
  Om = (i, t = 1) => Ou(i, t) || "Uses mindblown tokens";
function Ox() {
  return '<i class="gr-mb" aria-hidden="true"></i><span>Tokens</span><b>balance on mindblown.ai</b>';
}
var Hu = {
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
  S3t =
    /\b(porsche|ferrari|lamborghini|lambo|mclaren|bugatti|pagani|koenigsegg|aston ?martin|bentley|rolls[- ]?royce|maserati|alfa ?romeo|fiat|bmw|audi|mercedes(?:[- ]benz)?|amg|volkswagen|vw|tesla|waymo|cybertruck|cybercab|ford|mustang|chevrolet|chevy|corvette|camaro|dodge|viper|nissan|gt-?r|toyota|supra|honda|nsx|mazda|subaru|mitsubishi|lexus|jaguar|land ?rover|range ?rover|lotus|mini|hyundai|kia|rivian|lucid|gulf|martini|redbull|red bull|monster|castrol|shell|nike|adidas)\b/gi,
  k3t = (i) =>
    String(i || "")
      .replace(S3t, "")
      .replace(/\b[a-z]{0,3}\d+[a-z]{0,3}\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();
function cz(i, { mode: t = "f", palette: e = [], variation: s = 0 } = {}) {
  let n = k3t(i).slice(0, 600);
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
async function hz(i, { size: t = "wide", signal: e, confirmed: s = !1 } = {}) {
  let n = sc();
  if (!s)
    return (
      console.warn("generate: not confirmed - not sent"),
      { refused: "unconfirmed" }
    );
  if (!Mp()) return { refused: "offline" };
  let o = Promise.resolve()
    .then(() => n.generate.image(i, { size: t }))
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
        if (e.aborted) return a({ cancelled: !0, late: o });
        (e.addEventListener("abort", () => a({ cancelled: !0, late: o }), {
          once: !0,
        }),
          o.then(a));
      })
    : o;
}
async function _3t(i, t) {
  let e = sc();
  if (!e?.items?.keep || !i) return null;
  try {
    return (
      (
        await e.items.keep(i, "image", {
          name: (String(t || "").trim() || "Car wrap").slice(0, 60),
        })
      )?.files?.png?.url || null
    );
  } catch (s) {
    return (console.warn("keep", s?.reason || s), null);
  }
}
var rz = "sf-drive.wrapdocs";
