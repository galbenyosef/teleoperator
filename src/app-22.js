// app 22 — img
// Lines 43359-43689 of readable/app.pretty.js (statement-aligned).
var Pit,
  Cit,
  Lit,
  Iit,
  Fit = Ki(() => {
    ((Pit = [-1371, 385]),
      (Cit = [
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
      (Lit = [
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
      (Iit = {
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
await No();
Pn();
var Dc = new URLSearchParams(location.search);
On("distant") || (globalThis.MB_BAY_FOG = "0.0");
if (!globalThis.SF_TIER) {
  let o = Dc.get("tier"),
    t =
      /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)) ||
      Dc.has("mobile");
  ((globalThis.SF_TIER = ["desktop", "mobile", "safe"].includes(o)
    ? o
    : t
      ? "mobile"
      : "desktop"),
    (globalThis.SF_LITE = globalThis.SF_TIER !== "desktop"));
}
var cg = globalThis.SF_LITE,
  fR = globalThis.SF_TIER === "safe";
if (!globalThis.SF_Q) {
  let o = Dc.get("q");
  globalThis.SF_Q = ["perf", "high", "ultra"].includes(o)
    ? o
    : cg
      ? "perf"
      : "high";
}
{
  let o = Dc.get("fps");
  if (o == null)
    try {
      o = JSON.parse(localStorage.getItem("sf-drive.settings") || "{}").fps;
    } catch {}
  ((globalThis.SF_FPS_AUTO = o == null || o === ""),
    (o = o == null || o === "" ? (cg ? 30 : 60) : +o),
    (globalThis.SF_FPS = [0, 30, 60].includes(o) ? o : cg ? 30 : 60));
}
{
  let o = (Dc.get("mode") || "").toLowerCase();
  globalThis.SF_MODE = o === "waymo" || o === "taxi" ? "waymo" : "free";
}
{
  let o = globalThis.SF_VARIANT || Dc.get("variant");
  ((globalThis.SF_VARIANT = o === "taxi" ? "taxi" : "sfdrive"),
    globalThis.SF_VARIANT === "taxi" && (globalThis.SF_MODE = "waymo"));
}
{
  let o = (Dc.get("car") || "").toLowerCase();
  if (!o && globalThis.SF_VARIANT === "taxi")
    try {
      o = localStorage.getItem("teleop.car") || "";
    } catch {}
  globalThis.SF_CAR =
    o === "cybercab" ||
    o === "ferrari" ||
    o === "corvette" ||
    o === "cybertruck" ||
    o === "roadster" ||
    o === "missions"
      ? o
      : "waymo";
}
globalThis.MB_SHADOW_RES = fR
  ? 512
  : cg
    ? 1024
    : globalThis.SF_Q === "perf"
      ? 2048
      : 4096;
cg &&
  ((globalThis.MB_POINT_RES = fR ? 128 : 256),
  (globalThis.MB_ENV_RES = 512),
  (globalThis.SF_TEXMAX = fR ? 256 : 512));
globalThis.MB_SHARPEN_FX = cg ? 0.16 : 0;
globalThis.MB_SHARPEN_MOTION = Dc.has("sharpenm") ? +Dc.get("sharpenm") : 0.07;
globalThis.MB_SHARPEN = Dc.has("sharpen")
  ? +Dc.get("sharpen")
  : { perf: 0.12, high: 0.13, ultra: 0.14 }[globalThis.SF_Q];
{
  let o = KH();
  ((globalThis.MB_SEA_FNS = o.fns), (globalThis.MB_SEA_MASK = o.body));
}
es();
es();
var Pu = (o) =>
    new URL(
      (globalThis.SF_DIST ? "./workers/" : "./src/workers/") + o + ".js",
      document.baseURI,
    ),
  xb = (o) =>
    new Promise((t) => {
      if (!o) return t(!1);
      if (o.sfUp) return t(!0);
      let e = (a) => {
          (clearTimeout(i),
            o.removeEventListener("message", s),
            o.removeEventListener("error", n),
            t(a));
        },
        s = (a) => {
          a.data?.hi && ((o.sfUp = !0), e(!0));
        },
        n = () => e(!1),
        i = setTimeout(() => e(!1), 1e4);
      (o.addEventListener("message", s), o.addEventListener("error", n));
    });
var NS = class {
  constructor(t = 6e5) {
    ((this.timeoutMs = t), (this.id = 0), (this.pending = new Map()));
  }
  run(t, e) {
    return new Promise((s, n) => {
      let i = ++this.id,
        a = (l, c) => {
          (clearTimeout(r), this.pending.delete(i), l ? n(l) : s(c));
        },
        r = setTimeout(
          () => a(new Error(`Worker download timed out: ${e.url}`)),
          this.timeoutMs,
        );
      this.pending.set(i, { worker: t, finish: a });
      try {
        t.postMessage({ ...e, id: i });
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
async function sc(
  o,
  {
    priority: t,
    read: e = (a) => a.arrayBuffer(),
    retries: s = 2,
    timeoutMs: n = 3e4,
    delay: i = (a) => new Promise((r) => setTimeout(r, a)),
  } = {},
) {
  let a,
    r = 0;
  for (let c = 0; c <= s; c++) {
    let h = new AbortController(),
      f,
      u = 0,
      d,
      p = () => {
        (clearTimeout(f),
          (f = setTimeout(() => {
            (h.abort(), d(new Error("Download timed out")));
          }, n)));
      };
    try {
      return await Promise.race([
        (async () => {
          let m = !c && globalThis.SF_PRE?.get(o);
          m && globalThis.SF_PRE.delete(o);
          let g = await (m ||
            fetch(o, {
              priority: t,
              signal: h.signal,
              ...(c ? { cache: "reload" } : {}),
            }));
          if (((u = g.status), !g.ok)) throw new Error(`HTTP ${u}`);
          return (
            p(),
            g.body &&
              typeof TransformStream == "function" &&
              (g = new Response(
                g.body.pipeThrough(
                  new TransformStream({
                    transform(b, v) {
                      (p(), v.enqueue(b));
                    },
                  }),
                ),
                {
                  status: g.status,
                  statusText: g.statusText,
                  headers: g.headers,
                },
              )),
            await e(g)
          );
        })(),
        new Promise((m, g) => {
          ((d = g), p());
        }),
      ]);
    } catch (m) {
      if (
        ((a = m),
        (r = u),
        c === s || (u >= 400 && ![408, 429].includes(u) && u < 500))
      )
        break;
    } finally {
      clearTimeout(f);
    }
    await i(300 * (c + 1));
  }
  let l = new Error(`Could not download ${o}: ${a?.message || a}`, {
    cause: a,
  });
  throw ((l.name = "AssetLoadError"), (l.status = r), l);
}
var op = new Map(),
  P5 = new WeakMap(),
  C5 = new WeakMap(),
  US = (o, t) => (
    o &&
      typeof o == "object" &&
      (P5.set(o, (P5.get(o) || 0) + 1), t && C5.set(o, t)),
    o
  );
function jG(o, t) {
  if (
    typeof ImageBitmap > "u" ||
    !(t instanceof ImageBitmap) ||
    o.userData?.keepImage ||
    ((o.image = { width: t.width, height: t.height, released: !0 }), !P5.has(t))
  )
    return;
  let e = (P5.get(t) || 1) - 1;
  if ((P5.set(t, e), e <= 0)) {
    let s = C5.get(t);
    (s && op.get(s)?.img === t && op.delete(s), t.close());
  }
}
var S0 = { pool: [], next: 0, jobs: new NS(), up: [] },
  HS = (o, t) => {
    ((S0.pool = S0.pool.filter((e) => e !== o)),
      S0.jobs.fail(o, t),
      o.terminate());
  },
  $G = (o) => S0.jobs.run(S0.pool[S0.next++ % S0.pool.length], o);
