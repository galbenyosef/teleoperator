// app 355 — engine
// Lines 171091-171164 of readable/app.pretty.js (statement-aligned).
var vr = (o) =>
    String(o).replace(
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
  Ih = (o) => "$" + Math.round(o).toLocaleString("en-US"),
  Gst = {
    wheels: "Wheels",
    tyres: "Tyres",
    engine: "Engine",
    perf: "Performance",
  },
  $4t = {
    engine: ["engine", "turbo", "exhaust", "nitro"],
    perf: ["trans", "weight", "brakes", "susp", "diff", "aero"],
  },
  Vst = 7,
  Wst = {
    engine: "M4 9h3l2-2h6v3h3v-2h2v8h-2v-2h-3v3h-8l-3-3z",
    turbo: "M12 4a8 8 0 1 0 8 8M12 8a4 4 0 1 0 4 4M20 12h-4M12 4v4",
    exhaust: "M2 10h11l3-2h5v8h-5l-3-2H2z",
    nitro: "M9 3h6v3l2 2v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8l2-2zM9 11h6M9 15h6",
    gearbox: "M5 5v14M12 5v14M19 5v7H5M8 3h-6M15 3h-6M22 3h-6",
    weight: "M7 8h10l3 12H4zM10 8a2 2 0 1 1 4 0",
    brake:
      "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8M16 4l4 4",
    spring: "M8 3h8M8 21h8M8 6l8 2-8 2 8 2-8 2 8 2-8 2",
    diff: "M12 5a7 7 0 1 0 0 14a7 7 0 1 0 0-14M2 12h5M17 12h5M12 9v6",
    wing: "M3 9h18l-2 3H5zM7 12v6M17 12v6",
    tyre: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10",
  },
  qst = (o) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${o}"/></svg>`;
function X4t(o) {
  let [, t, e] = Hr[o],
    s =
      '<circle cx="20" cy="20" r="18" class="t"/><circle cx="20" cy="20" r="13.5" class="l"/>';
  if (e === "factory") s += '<text x="20" y="24" text-anchor="middle">F</text>';
  else if (e === "disc")
    s +=
      '<circle cx="20" cy="20" r="12" class="f"/>' +
      [...Array(6)]
        .map((n, i) => {
          let a = (i / 6) * Math.PI * 2;
          return `<circle cx="${20 + 8 * Math.cos(a)}" cy="${20 + 8 * Math.sin(a)}" r="1.6" class="h"/>`;
        })
        .join("");
  else {
    let n =
      { split: 1.2, mesh: 0.8, fan: 2.4, dish: 2, blade: 3, mono: 4 }[e] || 2;
    for (let i = 0; i < t; i++) {
      let a = (i / t) * Math.PI * 2,
        r = e === "fan" || e === "blade" ? 0.35 : 0,
        l = (c, h) =>
          `<line x1="${20 + 3.5 * Math.cos(a + c)}" y1="${20 + 3.5 * Math.sin(a + c)}" x2="${20 + 13 * Math.cos(a + c + r)}" y2="${20 + 13 * Math.sin(a + c + r)}" stroke-width="${h}"/>`;
      s +=
        e === "split"
          ? l(-0.12, n) + l(0.12, n)
          : e === "mesh"
            ? l(0, n) +
              `<line x1="${20 + 3.5 * Math.cos(a)}" y1="${20 + 3.5 * Math.sin(a)}" x2="${20 + 13 * Math.cos(a + Math.PI / t)}" y2="${20 + 13 * Math.sin(a + Math.PI / t)}" stroke-width="${n}"/>`
            : l(0, n);
    }
    e === "dish" && (s += '<circle cx="20" cy="20" r="13.5" class="l2"/>');
  }
  return `<svg viewBox="0 0 40 40" class="tu-rim" aria-hidden="true">${s}<circle cx="20" cy="20" r="3.2" class="h"/></svg>`;
}
