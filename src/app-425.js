// app 425 — queryselector
// Lines 206485-206751 of readable/app.pretty.js (statement-aligned).
var Cot = (o) =>
    String(o ?? "").replace(
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
  Ns = (o) => document.getElementById(o),
  Ve = new URLSearchParams(location.search),
  bn = !!globalThis.SF_LITE,
  su = globalThis.SF_TIER === "safe",
  Cd =
    Ve.has("mobile") ||
    Ve.has("touch") ||
    /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)) ||
    matchMedia("(pointer: coarse)").matches,
  Zn = Ve.has("test"),
  Uh = Ve.has("grid"),
  Ukt = Ve.has("spill") ? +Ve.get("spill") : null,
  IN = !Uh && !bn && !Ve.has("nodress"),
  o3 =
    !Uh &&
    !Ve.has("nopeds") &&
    (Ve.has("peds") || (!Zn && z4().peds !== "off"));
Ea.on = o3;
var FN = "assets/car/",
  $n = globalThis.SF_MODE === "waymo",
  nu = globalThis.SF_VARIANT === "taxi",
  Dn = $n ? globalThis.SF_CAR : null,
  Dh = Ve.get("cam") ? Ve.get("cam").split(",").map(Number) : null,
  Fot = () => {
    if (Ve.get("camg")) {
      let o = Ve.get("camg").split(",").map(Number);
      Dh = [
        o[0],
        Wi(o[0], o[2]) + o[1],
        o[2],
        o[3],
        Wi(o[3], o[5]) + o[4],
        o[5],
        o[6],
      ];
    }
  };
Uh && Fot();
var Lot = () =>
    new Promise((o) => {
      document.hidden
        ? setTimeout(o, 0)
        : requestAnimationFrame(() => setTimeout(o, 0));
    }),
  z1 = (o, t, e = 0.3) => {
    if (
      (Ns("stage").textContent !== o && (Ns("stage").textContent = o),
      t != null)
    ) {
      let s = Ns("bar").firstElementChild.style;
      ((s.transitionDuration = e + "s"),
        (s.transform = `scaleX(${t.toFixed(3)})`));
    }
  },
  J2 = !1,
  z9 = (o) => {
    if (Zn && !Ve.has("autoretry")) return !1;
    try {
      let t = "sf-drive.autoretry." + o,
        e = +sessionStorage.getItem(t) || 0;
      return Date.now() - e < 6e5
        ? !1
        : (sessionStorage.setItem(t, String(Date.now())), !0);
    } catch {
      return !1;
    }
  },
  _9 = () => {
    (Ns("title").classList.remove("gone", "ready"),
      document.body.classList.add("nogpu"));
  },
  _1 = (o) => {
    console.error(o);
    let t = String(o?.message || o);
    if (!J2) {
      if (Iu(o)) {
        J2 = !0;
        let e = globalThis.SF_BOOT?.recover(),
          s = Ns("nogpu");
        ((s.querySelector("h2").textContent = "Graphics could not continue"),
          (s.querySelector("p").textContent = e?.changed
            ? "The browser could not reserve enough graphics memory. Retry with lighter graphics."
            : "The browser could not reserve graphics memory. Close other game tabs, then retry."),
          (s.querySelector("small").textContent = ""));
        let n = s.querySelector("button");
        ((n.textContent = e?.changed ? "Retry with lighter graphics" : "Retry"),
          (n.onclick = () => {
            let i = new URL(location.href);
            (e?.level && i.searchParams.set("gfx", e.level),
              location.replace(i.toString()));
          }),
          e?.changed &&
            !Ns("title").classList.contains("ready") &&
            z9("gpu") &&
            ((s.querySelector("p").textContent =
              "The browser could not reserve enough graphics memory. Retrying with lighter graphics\u2026"),
            setTimeout(n.onclick, 1500)),
          Dr.event("gpu_fail", {
            why: "memory",
            level: e?.level || "",
            loading: !Ns("title").classList.contains("ready"),
            msg: t.slice(0, 120),
          }),
          _9());
        return;
      }
      if (
        (/lost|memory/i.test(t) || globalThis.SF_BOOT?.fail(),
        o?.name === "ShaderStartupError" || o?.name === "AssetLoadError")
      ) {
        (console.error("Startup cause", o.cause), (J2 = !0));
        let e = o.name === "AssetLoadError",
          s = Ns("nogpu");
        ((s.querySelector("h2").textContent = e
          ? "Download interrupted"
          : "Graphics could not start"),
          (s.querySelector("p").textContent = e
            ? "A game file could not finish downloading. Check your connection, then retry."
            : "The browser could not finish preparing the graphics. Retry to start a fresh graphics session."),
          (s.querySelector("small").textContent = String(o.cause?.message || "")
            .split(
              `
`,
            )[0]
            .slice(0, 240)),
          (s.querySelector("button").textContent = "Retry"),
          (s.querySelector("button").onclick = () => location.reload()),
          e && z9("asset")
            ? ((s.querySelector("p").textContent =
                "A game file could not finish downloading. Retrying\u2026"),
              setTimeout(() => location.reload(), 2500))
            : !e &&
              /timed out|XPC_ERROR|internal error/i.test(
                String(o.cause?.message || ""),
              ) &&
              z9("shader") &&
              ((s.querySelector("p").textContent =
                "The graphics took too long to prepare. Retrying\u2026"),
              setTimeout(() => location.reload(), 2500)),
          Dr.event("load_fail", {
            why: e ? "download" : "shader",
            msg: String(o.cause?.message || t).slice(0, 120),
          }),
          _9());
        return;
      }
      if (/device lost/i.test(t) && !Ns("title").classList.contains("ready")) {
        let e = globalThis.SF_BOOT?.recover();
        if (
          (Dr.event("gpu_fail", {
            why: "lost",
            level: e?.level || "",
            loading: !0,
            msg: t.slice(0, 120),
          }),
          e?.changed && z9("lost"))
        ) {
          ((J2 = !0),
            Iot(t),
            (Ns("nogpu").querySelector("p").textContent =
              "Retrying with lighter graphics\u2026"));
          let s = new URL(location.href);
          (s.searchParams.set("gfx", e.level),
            setTimeout(() => location.replace(s.toString()), 1500));
          return;
        }
      }
      !navigator.gpu || /webgpu|adapter|device lost|GPU device/i.test(t)
        ? Iot(navigator.gpu ? t : "")
        : (Ns("err").textContent = t);
    }
  };
addEventListener("unhandledrejection", (o) => {
  Iu(o.reason) && (o.preventDefault(), _1(o.reason));
});
addEventListener("error", (o) => {
  Iu(o.error) && (o.preventDefault(), _1(o.error));
});
function Iot(o) {
  let t = navigator.userAgent,
    e =
      /iPhone|iPad|iPod/.test(t) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)),
    s = /Android/.test(t),
    n = /lost/i.test(o),
    i = n
      ? "The graphics device was reset (often the phone running out of memory). Close other tabs and reload."
      : e
        ? "On iPhone and iPad it runs in Safari on iOS / iPadOS 26 or later. On iOS 18, turn WebGPU on in Settings \u203A Apps \u203A Safari \u203A Advanced \u203A Feature Flags, then reload."
        : s
          ? "On Android it runs in Chrome 121 or later (Android 12+, a recent GPU). Update Chrome, or try another phone."
          : "It runs in Chrome or Edge (113+), Safari 26+, or Firefox 141+ on Windows. Update the browser, or turn on hardware acceleration.",
    a = Ns("nogpu");
  ((a.querySelector("h2").textContent = n
    ? "The GPU stopped"
    : o
      ? "WebGPU did not start"
      : "This game needs WebGPU"),
    (a.querySelector("p").textContent =
      (n || !o
        ? ""
        : "Your browser has WebGPU but no usable graphics adapter. ") + i),
    (a.querySelector("small").textContent = o),
    _9(),
    (a.querySelector("button").onclick = () => location.reload()));
}
window.__sf = {};
window.__sfL = { highwayAt: Ni };
function qn(o, t = "", e = "", s = {}) {
  dd.say(o, t, { cls: e, key: e || void 0, ...s });
}
Cd && document.body.classList.add("touch");
var Oot = (o) => {
  let t = new URL(location.href);
  (o === "waymo"
    ? t.searchParams.set("mode", "waymo")
    : t.searchParams.delete("mode"),
    location.replace(t.toString()));
};
for (let o of document.querySelectorAll("#modes .mode"))
  (o.setAttribute("aria-pressed", String((o.dataset.mode === "waymo") === $n)),
    (o.onclick = (t) => {
      (t.stopPropagation(),
        (o.dataset.mode === "waymo") !== $n && Oot(o.dataset.mode));
    }));
xit(document.getElementById("cities"));
{
  let o = document.querySelector("[data-mode-switch]");
  o &&
    ((o.querySelector("b").textContent = $n ? "Waymo taxi" : "Free roam"),
    (o.onclick = () => Oot($n ? "free" : "waymo")));
}
if (nu) {
  (document.body.classList.add("teleop"), (document.title = "Teleoperator"));
  let o = document.querySelector("#title h1");
  (o && !o.dataset.teleop && (o.innerHTML = "TELE<em>OPERATOR</em>"),
    (document.querySelector("#title .sub").textContent =
      "Remote-pilot robotaxis across real " + bi.name));
}
iit();
{
  let o = document.querySelector("meta[name=description]");
  (o && (o.content = o.content.replace("a real city", "real " + bi.name)),
    (document.getElementById("wHood").textContent = bi.name));
}
$n &&
  (document.body.classList.add("waymo"),
  nu ||
    (document.querySelector("#title .sub").textContent =
      "Waymo \xB7 Taxi mode"),
  (Ns("keys").innerHTML =
    "<b>W</b><b>A</b><b>S</b><b>D</b> drive &nbsp; lift off to regenerate &nbsp; stop at the kerb for fares &nbsp; <b>Tab</b> map &nbsp; <b>Esc</b> menu"),
  (Ns("keysT").innerHTML =
    "Hold anywhere to drive \xB7 slide to steer \xB7 second finger or pull down to brake<br>stop at the glowing kerb to pick up and drop off"));
