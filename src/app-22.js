// app 22 — pool
// Lines 43273-43609 of readable/app.pretty.js (statement-aligned).
var Qm,
  vet,
  yet,
  wet,
  Met = Vi(() => {
    ((Qm = [-1371, 385]),
      (vet = [
        ["Tony's Pizza Napoletana", -122.4097, 37.8002, "Stockton Street"],
        ["Swan Oyster Depot", -122.4205, 37.7909, "Polk Street"],
        ["House of Prime Rib", -122.4219, 37.7934, "Van Ness Avenue"],
        ["Zuni Caf\xE9", -122.4216, 37.7735, "Market Street"],
        ["Boudin Bakery", -122.4146, 37.8083, "Jefferson Street"],
        ["Hog Island Oyster Co.", -122.3935, 37.7956, "The Embarcadero"],
        ["Tartine Bakery", -122.4241, 37.7614, "Guerrero Street"],
        ["La Taqueria", -122.4181, 37.7509, "Mission Street"],
        ["Burma Superstar", -122.4626, 37.7829, "Clement Street"],
        ["Kokkari Estiatorio", -122.3995, 37.797, "Jackson Street"],
        ["Nopa", -122.4377, 37.775, "Divisadero Street"],
        ["Souvla", -122.4245, 37.7764, "Hayes Street"],
        ["Super Duper Burgers", -122.4357, 37.8006, "Chestnut Street"],
        ["R&G Lounge", -122.4048, 37.7941, "Kearny Street"],
        ["Fog City", -122.4016, 37.8045, "The Embarcadero"],
        ["Scoma's", -122.4176, 37.8086, "Jefferson Street"],
        ["Presidio Social Club", -122.4535, 37.799, "Lombard Street"],
        ["Flour + Water", -122.4123, 37.759, "Harrison Street"],
        ["Magnolia Brewing", -122.4458, 37.7701, "Haight Street"],
        ["Fish.", -122.4934, 37.8695, "Harbor Drive"],
        ["Mama's on Washington Square", -122.41, 37.8008, "Stockton Street"],
        ["Liholiho Yacht Club", -122.4148, 37.7884, "Sutter Street"],
        ["Benu", -122.3988, 37.7854, "Third Street"],
        ["Good Mong Kok Bakery", -122.4071, 37.7963, "Stockton Street"],
      ]),
      (yet = [
        ["Golden Gate Bridge", -122.476, 37.808, 120, 160, 420],
        ["Coit Tower", -122.4058, 37.8024, 40, 120, 300],
        ["Transamerica Pyramid", -122.4028, 37.7952, 150, 140, 320],
        ["Salesforce Tower", -122.3969, 37.7897, 230, 160, 380],
        ["Ferry Building", -122.3935, 37.7955, 50, 90, 240],
        ["Palace of Fine Arts", -122.4484, 37.8029, 30, 100, 260],
        ["City Hall", -122.4193, 37.7793, 60, 100, 260],
        ["Painted Ladies", -122.433, 37.7762, 10, 60, 160],
        ["Bay Bridge", -122.388, 37.788, 80, 150, 400],
        ["Lombard Street", -122.4187, 37.8021, 8, 60, 180],
        ["Grace Cathedral", -122.4133, 37.7919, 45, 80, 220],
        ["Legion of Honor", -122.5007, 37.7845, 20, 90, 260],
      ]),
      (wet = {
        russian: "Russian Hill",
        soma: "SoMa",
        northbeach: "North Beach",
        towers: "Rincon Hill",
        presidio: "the Presidio",
        pacific: "Pacific Heights",
        mission: "the Mission",
        tenderloin: "the Tenderloin",
        richmond: "the Richmond",
        hayes: "Hayes Valley",
        western: "the Western Addition",
        fidi: "the Financial District",
        jackson: "Jackson Square",
        telegraph: "Telegraph Hill",
        marina: "the Marina",
        nob: "Nob Hill",
        haight: "the Haight",
        cowhollow: "Cow Hollow",
        wharf: "Fisherman's Wharf",
        chinatown: "Chinatown",
        castro: "the Castro",
        twinpeaks: "Twin Peaks",
        union: "Union Square",
        dolores: "Dolores Heights",
        noe: "Noe Valley",
        seacliff: "Sea Cliff",
        sausalito: "Sausalito",
      }));
  });
En();
var fc = new URLSearchParams(location.search);
if (!globalThis.SF_TIER) {
  let i = fc.get("tier"),
    t =
      /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)) ||
      fc.has("mobile");
  ((globalThis.SF_TIER = ["desktop", "mobile", "safe"].includes(i)
    ? i
    : t
      ? "mobile"
      : "desktop"),
    (globalThis.SF_LITE = globalThis.SF_TIER !== "desktop"));
}
var v2 = globalThis.SF_LITE,
  OT = globalThis.SF_TIER === "safe";
if (!globalThis.SF_Q) {
  let i = fc.get("q");
  globalThis.SF_Q = ["perf", "high", "ultra"].includes(i)
    ? i
    : v2
      ? "perf"
      : "high";
}
{
  let i = fc.get("fps");
  if (i == null)
    try {
      i = JSON.parse(localStorage.getItem("sf-drive.settings") || "{}").fps;
    } catch {}
  ((i = i == null || i === "" ? (v2 ? 30 : 60) : +i),
    (globalThis.SF_FPS = [0, 30, 60].includes(i) ? i : v2 ? 30 : 60));
}
{
  let i = (fc.get("mode") || "").toLowerCase();
  globalThis.SF_MODE = i === "waymo" || i === "taxi" ? "waymo" : "free";
}
{
  let i = globalThis.SF_VARIANT || fc.get("variant");
  ((globalThis.SF_VARIANT = i === "taxi" ? "taxi" : "sfdrive"),
    globalThis.SF_VARIANT === "taxi" && (globalThis.SF_MODE = "waymo"));
}
{
  let i = (fc.get("car") || "").toLowerCase();
  if (!i && globalThis.SF_VARIANT === "taxi")
    try {
      i = localStorage.getItem("teleop.car") || "";
    } catch {}
  globalThis.SF_CAR =
    i === "cybercab" ||
    i === "ferrari" ||
    i === "corvette" ||
    i === "cybertruck"
      ? i
      : "waymo";
}
globalThis.MB_SHADOW_RES = OT
  ? 512
  : v2
    ? 1024
    : globalThis.SF_Q === "perf"
      ? 2048
      : 4096;
v2 &&
  ((globalThis.MB_POINT_RES = OT ? 128 : 256),
  (globalThis.MB_ENV_RES = 512),
  (globalThis.SF_TEXMAX = OT ? 256 : 512));
globalThis.MB_SHARPEN_FX = v2 ? 0.16 : 0;
globalThis.MB_SHARPEN_MOTION = fc.has("sharpenm") ? +fc.get("sharpenm") : 0.07;
globalThis.MB_SHARPEN = fc.has("sharpen")
  ? +fc.get("sharpen")
  : { perf: 0.12, high: 0.13, ultra: 0.14 }[globalThis.SF_Q];
{
  let i = VB();
  ((globalThis.MB_SEA_FNS = i.fns), (globalThis.MB_SEA_MASK = i.body));
}
as();
as();
var Yf = (i) =>
    new URL(
      (globalThis.SF_DIST ? "./workers/" : "./src/workers/") + i + ".js",
      document.baseURI,
    ),
  Tg = (i) =>
    new Promise((t) => {
      if (!i) return t(!1);
      if (i.sfUp) return t(!0);
      let e = (a) => {
          (clearTimeout(o),
            i.removeEventListener("message", s),
            i.removeEventListener("error", n),
            t(a));
        },
        s = (a) => {
          a.data?.hi && ((i.sfUp = !0), e(!0));
        },
        n = () => e(!1),
        o = setTimeout(() => e(!1), 1e4);
      (i.addEventListener("message", s), i.addEventListener("error", n));
    });
var N6 = class {
  constructor(t = 1e5) {
    ((this.timeoutMs = t), (this.id = 0), (this.pending = new Map()));
  }
  run(t, e) {
    return new Promise((s, n) => {
      let o = ++this.id,
        a = (l, c) => {
          (clearTimeout(r), this.pending.delete(o), l ? n(l) : s(c));
        },
        r = setTimeout(
          () => a(new Error(`Worker download timed out: ${e.url}`)),
          this.timeoutMs,
        );
      this.pending.set(o, { worker: t, finish: a });
      try {
        t.postMessage({ ...e, id: o });
      } catch (l) {
        a(l);
      }
    });
  }
  receive(t, e) {
    let s = this.pending.get(e.id);
    if (!s || s.worker !== t) {
      e.img?.close?.();
      return;
    }
    e.img && e.opaque && (e.img.sfOpaque = !0);
    let n =
      e.img || e.buf
        ? null
        : Object.assign(new Error(e.err || "Worker download failed"), {
            name: e.errorName || "Error",
            status: e.status,
          });
    s.finish(n, e.img || e.buf);
  }
  fail(t, e) {
    for (let s of this.pending.values()) s.worker === t && s.finish(e);
  }
};
async function Nl(
  i,
  {
    priority: t,
    read: e = (a) => a.arrayBuffer(),
    retries: s = 2,
    timeoutMs: n = 3e4,
    delay: o = (a) => new Promise((r) => setTimeout(r, a)),
  } = {},
) {
  let a,
    r = 0;
  for (let c = 0; c <= s; c++) {
    let h = new AbortController(),
      f,
      u = 0;
    try {
      return await Promise.race([
        (async () => {
          let d = !c && globalThis.SF_PRE?.get(i);
          d && globalThis.SF_PRE.delete(i);
          let p = await (d ||
            fetch(i, {
              priority: t,
              signal: h.signal,
              ...(c ? { cache: "reload" } : {}),
            }));
          if (((u = p.status), !p.ok)) throw new Error(`HTTP ${u}`);
          return await e(p);
        })(),
        new Promise((d, p) => {
          f = setTimeout(() => {
            (h.abort(), p(new Error("Download timed out")));
          }, n);
        }),
      ]);
    } catch (d) {
      if (
        ((a = d),
        (r = u),
        c === s || (u >= 400 && ![408, 429].includes(u) && u < 500))
      )
        break;
    } finally {
      clearTimeout(f);
    }
    await o(300 * (c + 1));
  }
  let l = new Error(`Could not download ${i}: ${a?.message || a}`, {
    cause: a,
  });
  throw ((l.name = "AssetLoadError"), (l.status = r), l);
}
var zd = new Map(),
  F5 = new WeakMap(),
  N5 = new WeakMap(),
  H6 = (i, t) => (
    i &&
      typeof i == "object" &&
      (F5.set(i, (F5.get(i) || 0) + 1), t && N5.set(i, t)),
    i
  );
function WD(i, t) {
  if (
    typeof ImageBitmap > "u" ||
    !(t instanceof ImageBitmap) ||
    i.userData?.keepImage ||
    ((i.image = { width: t.width, height: t.height, released: !0 }), !F5.has(t))
  )
    return;
  let e = (F5.get(t) || 1) - 1;
  if ((F5.set(t, e), e <= 0)) {
    let s = N5.get(t);
    (s && zd.get(s)?.img === t && zd.delete(s), t.close());
  }
}
var l0 = { pool: [], next: 0, jobs: new N6(), up: [] },
  B6 = (i, t) => {
    ((l0.pool = l0.pool.filter((e) => e !== i)),
      l0.jobs.fail(i, t),
      i.terminate());
  },
  qD = (i) => l0.jobs.run(l0.pool[l0.next++ % l0.pool.length], i);
function jD(i, t = 4, e = null) {
  try {
    for (let s = 0; s < (e?.length || t); s++) {
      let n = e?.[s] || new Worker(i, { type: "module" });
      (l0.up.push(
        Tg(n).then(
          (o) => (o || B6(n, new Error("Image worker could not start")), o),
        ),
      ),
        (n.onmessage = ({ data: o }) => l0.jobs.receive(n, o)),
        (n.onerror = (o) => {
          (console.warn("image worker", o.message),
            B6(n, new Error(o.message || "Image worker stopped")));
        }),
        (n.onmessageerror = () =>
          B6(n, new Error("Image worker response could not be read"))),
        l0.pool.push(n));
    }
  } catch (s) {
    for (let n of l0.pool.slice()) B6(n, s);
  }
  return (
    l0.pool.length &&
      (globalThis.SF_FETCH = (s, n, o) =>
        l0.pool.length
          ? qD({
              url: new URL(s, document.baseURI).href,
              priority: n,
              bytes: !0,
              gz: o,
            })
          : null),
    Promise.all(l0.up)
  );
}
