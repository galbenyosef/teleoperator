// app 408 — queryselector
// Lines 198599-198787 of readable/app.pretty.js (statement-aligned).
var vst = (i) =>
    String(i ?? "").replace(
      /[&<>"']/g,
      (t) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[t],
    ),
  Js = (i) => document.getElementById(i),
  je = new URLSearchParams(location.search),
  xn = !!globalThis.SF_LITE,
  Mf = globalThis.SF_TIER === "safe",
  Yu =
    je.has("mobile") ||
    je.has("touch") ||
    /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)) ||
    matchMedia("(pointer: coarse)").matches,
  ki = je.has("test"),
  dh = je.has("grid"),
  XMt = je.has("spill") ? +je.get("spill") : null,
  LN = !dh && !xn && !je.has("nodress"),
  uv =
    !dh &&
    !je.has("nopeds") &&
    (je.has("peds") || (!ki && yM().peds !== "off"));
ba.on = uv;
var IN = "assets/car/",
  ai = globalThis.SF_MODE === "waymo",
  uh = globalThis.SF_VARIANT === "taxi",
  Jn = ai ? globalThis.SF_CAR : null,
  fh = je.get("cam") ? je.get("cam").split(",").map(Number) : null,
  yst = () => {
    if (je.get("camg")) {
      let i = je.get("camg").split(",").map(Number);
      fh = [
        i[0],
        eo(i[0], i[2]) + i[1],
        i[2],
        i[3],
        eo(i[3], i[5]) + i[4],
        i[5],
        i[6],
      ];
    }
  };
dh && yst();
var Wp = (i, t, e = 0.3) => {
    if (
      (Js("stage").textContent !== i && (Js("stage").textContent = i),
      t != null)
    ) {
      let s = Js("bar").firstElementChild.style;
      ((s.transitionDuration = e + "s"),
        (s.transform = `scaleX(${t.toFixed(3)})`));
    }
  },
  iT = !1,
  FN = () => {
    (Js("title").classList.remove("gone", "ready"),
      document.body.classList.add("nogpu"));
  },
  BM = (i) => {
    console.error(i);
    let t = String(i?.message || i);
    if (!iT) {
      if (Bg(i)) {
        iT = !0;
        let e = globalThis.SF_BOOT?.recover(),
          s = Js("nogpu");
        ((s.querySelector("h2").textContent = "Graphics could not continue"),
          (s.querySelector("p").textContent = e?.changed
            ? "The browser could not reserve enough graphics memory. Retry with lighter graphics."
            : "The browser could not reserve graphics memory. Close other game tabs, then retry."),
          (s.querySelector("small").textContent = ""));
        let n = s.querySelector("button");
        ((n.textContent = e?.changed ? "Retry with lighter graphics" : "Retry"),
          (n.onclick = () => {
            let o = new URL(location.href);
            (e?.level && o.searchParams.set("gfx", e.level),
              location.replace(o.toString()));
          }),
          FN());
        return;
      }
      if (
        (/lost|memory/i.test(t) || globalThis.SF_BOOT?.fail(),
        i?.name === "ShaderStartupError" || i?.name === "AssetLoadError")
      ) {
        (console.error("Startup cause", i.cause), (iT = !0));
        let e = i.name === "AssetLoadError",
          s = Js("nogpu");
        ((s.querySelector("h2").textContent = e
          ? "Download interrupted"
          : "Graphics could not start"),
          (s.querySelector("p").textContent = e
            ? "A game file could not finish downloading. Check your connection, then retry."
            : "The browser could not finish preparing the graphics. Retry to start a fresh graphics session."),
          (s.querySelector("small").textContent = String(i.cause?.message || "")
            .split(
              `
`,
            )[0]
            .slice(0, 240)),
          (s.querySelector("button").textContent = "Retry"),
          (s.querySelector("button").onclick = () => location.reload()),
          FN());
        return;
      }
      !navigator.gpu || /webgpu|adapter|device lost|GPU device/i.test(t)
        ? KMt(navigator.gpu ? t : "")
        : (Js("err").textContent = t);
    }
  };
function KMt(i) {
  let t = navigator.userAgent,
    e =
      /iPhone|iPad|iPod/.test(t) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)),
    s = /Android/.test(t),
    n = /lost/i.test(i),
    o = n
      ? "The graphics device was reset (often the phone running out of memory). Close other tabs and reload."
      : e
        ? "On iPhone and iPad it runs in Safari on iOS / iPadOS 26 or later. On iOS 18, turn WebGPU on in Settings \u203A Apps \u203A Safari \u203A Advanced \u203A Feature Flags, then reload."
        : s
          ? "On Android it runs in Chrome 121 or later (Android 12+, a recent GPU). Update Chrome, or try another phone."
          : "It runs in Chrome or Edge (113+), Safari 26+, or Firefox 141+ on Windows. Update the browser, or turn on hardware acceleration.",
    a = Js("nogpu");
  ((a.querySelector("h2").textContent = n
    ? "The GPU stopped"
    : i
      ? "WebGPU did not start"
      : "This game needs WebGPU"),
    (a.querySelector("p").textContent =
      (n || !i
        ? ""
        : "Your browser has WebGPU but no usable graphics adapter. ") + o),
    (a.querySelector("small").textContent = i),
    FN(),
    (a.querySelector("button").onclick = () => location.reload()));
}
window.__sf = {};
window.__sfL = { highwayAt: Hi };
function Zn(i, t = "", e = "", s = {}) {
  Cu.say(i, t, { cls: e, key: e || void 0, ...s });
}
Yu && document.body.classList.add("touch");
var wst = (i) => {
  let t = new URL(location.href);
  (i === "waymo"
    ? t.searchParams.set("mode", "waymo")
    : t.searchParams.delete("mode"),
    location.replace(t.toString()));
};
for (let i of document.querySelectorAll("#modes .mode"))
  (i.setAttribute("aria-pressed", String((i.dataset.mode === "waymo") === ai)),
    (i.onclick = (t) => {
      (t.stopPropagation(),
        (i.dataset.mode === "waymo") !== ai && wst(i.dataset.mode));
    }));
aet(document.getElementById("cities"));
{
  let i = document.querySelector("[data-mode-switch]");
  i &&
    ((i.querySelector("b").textContent = ai ? "Waymo taxi" : "Free roam"),
    (i.onclick = () => wst(ai ? "free" : "waymo")));
}
if (uh) {
  (document.body.classList.add("teleop"), (document.title = "Teleoperator"));
  let i = document.querySelector("#title h1");
  (i && !i.dataset.teleop && (i.innerHTML = "TELE<em>OPERATOR</em>"),
    (document.querySelector("#title .sub").textContent =
      "Remote-pilot robotaxis across real San Francisco"));
}
Vtt();
ai &&
  (document.body.classList.add("waymo"),
  uh ||
    (document.querySelector("#title .sub").textContent =
      "Waymo \xB7 Taxi mode"),
  (Js("keys").innerHTML =
    "<b>W</b><b>A</b><b>S</b><b>D</b> drive &nbsp; lift off to regenerate &nbsp; stop at the kerb for fares &nbsp; <b>Tab</b> map &nbsp; <b>Esc</b> menu"),
  (Js("keysT").innerHTML =
    "Hold anywhere to drive \xB7 slide to steer \xB7 second finger or pull down to brake<br>stop at the glowing kerb to pick up and drop off"));
