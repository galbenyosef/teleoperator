// app 344 — math
// Lines 165987-166286 of readable/app.pretty.js (statement-aligned).
async function XM(o) {
  let t = await createImageBitmap(o, {
      resizeWidth: 48,
      resizeHeight: 48,
      resizeQuality: "low",
    }),
    e = new OffscreenCanvas(48, 48),
    s = e.getContext("2d");
  (s.drawImage(t, 0, 0), t.close?.());
  let n = s.getImageData(0, 0, 48, 48).data,
    i = [];
  for (let h = 0; h < n.length; h += 4)
    n[h + 3] > 200 && i.push([n[h], n[h + 1], n[h + 2]]);
  if (!i.length) return [];
  let a = Array.from({ length: 6 }, (h, f) =>
      i[Math.floor(((f + 0.5) / 6) * i.length)].slice(),
    ),
    r = new Array(i.length).fill(0);
  for (let h = 0; h < 8; h++) {
    for (let u = 0; u < i.length; u++) {
      let d = 0,
        p = 1e9;
      for (let m = 0; m < a.length; m++) {
        let g =
          (i[u][0] - a[m][0]) ** 2 +
          (i[u][1] - a[m][1]) ** 2 +
          (i[u][2] - a[m][2]) ** 2;
        g < p && ((p = g), (d = m));
      }
      r[u] = d;
    }
    let f = a.map(() => [0, 0, 0, 0]);
    for (let u = 0; u < i.length; u++) {
      let d = f[r[u]];
      ((d[0] += i[u][0]), (d[1] += i[u][1]), (d[2] += i[u][2]), d[3]++);
    }
    a = a.map((u, d) =>
      f[d][3]
        ? [f[d][0] / f[d][3], f[d][1] / f[d][3], f[d][2] / f[d][3], f[d][3]]
        : [...u.slice(0, 3), 0],
    );
  }
  let l = (h) =>
      "#" +
      h
        .slice(0, 3)
        .map((f) => Math.round(f).toString(16).padStart(2, "0"))
        .join(""),
    c = [];
  for (let h of a.filter((f) => f[3] > 0).sort((f, u) => u[3] - f[3]))
    c.every((f) => {
      let u = parseInt(f.slice(1), 16);
      return (
        Math.abs(((u >> 16) & 255) - h[0]) +
          Math.abs(((u >> 8) & 255) - h[1]) +
          Math.abs((u & 255) - h[2]) >
        40
      );
    }) && c.push(l(h));
  return c.slice(0, 5);
}
var cst = "sf-drive.builds",
  i4t = 6,
  rB = new Set(),
  KM = null,
  lB = (o) => {
    if (
      !o ||
      typeof o != "object" ||
      typeof o.id != "string" ||
      !/^m[0-9a-z]{1,16}$/.test(o.id)
    )
      return null;
    let t = (s) =>
        typeof s == "string"
          ? s.replace(/[\u0000-\u001f<>]/g, "").slice(0, 300)
          : "",
      e =
        o.item && typeof o.item == "object"
          ? {
              id: t(o.item.id).slice(0, 64),
              name: t(o.item.name).slice(0, 40),
              sha: /^[0-9a-f]{64}$/.test(o.item.sha || "") ? o.item.sha : null,
              icon: /^\/__mb\/items\/[0-9a-f]{64}\.png$/.test(o.item.icon || "")
                ? o.item.icon
                : null,
            }
          : null;
    return {
      id: o.id,
      kind: o.kind === "wrap" ? "wrap" : "car",
      name: t(o.name).slice(0, 40) || "AI car",
      prompt: t(o.prompt),
      thumb:
        typeof o.thumb == "string" &&
        /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(o.thumb) &&
        o.thumb.length < 16e3
          ? o.thumb
          : null,
      base: t(o.base).slice(0, 40),
      t0: Number.isFinite(+o.t0) ? +o.t0 : Date.now(),
      t1: Number.isFinite(+o.t1) ? +o.t1 : 0,
      status: ["making", "ready", "closed", "driven"].includes(o.status)
        ? o.status
        : "making",
      prev: t(o.prev).slice(0, 64),
      item: e,
      ride: Ul(o.ride),
      spent: {
        pictures: Math.max(0, Math.floor(+o.spent?.pictures || 0)),
        cars: Math.max(0, Math.floor(+o.spent?.cars || 0)),
      },
    };
  },
  Av = (o) => (Array.isArray(o) ? o.map(lB).filter(Boolean).slice(-i4t) : []),
  o4t = () => {
    try {
      return Av(JSON.parse(localStorage.getItem(cst) || "[]"));
    } catch {
      return [];
    }
  };
function aB(o) {
  o = Av(o);
  try {
    localStorage.setItem(cst, JSON.stringify(o));
  } catch {}
  KM?.p && ((KM.p.builds = o), KM.save?.(!0));
  for (let t of rB)
    try {
      t(o);
    } catch {}
}
var Vn = {
    on(o) {
      return (rB.add(o), () => rB.delete(o));
    },
    bindProfile(o) {
      KM = o;
    },
    list() {
      let o = new Map();
      for (let t of [...o4t(), ...Av(KM?.p?.builds)]) {
        let e = o.get(t.id),
          s = (n) => ["making", "closed", "ready", "driven"].indexOf(n.status);
        (!e || s(t) > s(e)) && o.set(t.id, t);
      }
      return [...o.values()].sort((t, e) => t.t0 - e.t0);
    },
    get(o) {
      return Vn.list().find((t) => t.id === o) || null;
    },
    open() {
      return Vn.list().filter(
        (o) =>
          o.status === "making" ||
          o.status === "ready" ||
          o.status === "closed",
      );
    },
    making() {
      return Vn.list().filter(
        (o) => o.status === "making" || o.status === "closed",
      );
    },
    add(o) {
      let t = lB({
        id: "m" + Date.now().toString(36),
        t0: Date.now(),
        status: "making",
        ...o,
      });
      return (aB([...Vn.list(), t]), t);
    },
    update(o, t) {
      let e = Vn.list(),
        s = e.findIndex((n) => n.id === o);
      return s < 0 ? null : ((e[s] = lB({ ...e[s], ...t })), aB(e), e[s]);
    },
    remove(o) {
      aB(Vn.list().filter((t) => t.id !== o));
    },
    spent(o, t, e = 1) {
      let s = Vn.get(o);
      if (!s) return;
      let n = { ...s.spent };
      (t === "car" ? (n.cars += e) : (n.pictures += e),
        Vn.update(o, { spent: n }));
    },
  },
  YM = (o) => {
    let t = Math.max(0, Math.round((Date.now() - o) / 6e4));
    return t < 1
      ? "just now"
      : t < 60
        ? t + " min"
        : Math.floor(t / 60) + " h " + (t % 60) + " min";
  };
var hst = "sf-drive.spendcap",
  fst = "sf-drive.spend",
  ust = "sf-drive.spend.session",
  R2 = (o, t = 0) => (Number.isFinite(+o) && +o >= 0 ? Math.floor(+o) : t),
  cB = new Set(),
  JM = null,
  dst = () => {
    for (let o of cB)
      try {
        o();
      } catch {}
  },
  Ti = {
    on(o) {
      return (cB.add(o), () => cB.delete(o));
    },
    bindProfile(o) {
      JM = o;
    },
    cap() {
      try {
        let o = localStorage.getItem(hst);
        return o === null ? 5 : Math.max(0, Math.min(100, R2(o, 5)));
      } catch {
        return 5;
      }
    },
    setCap(o) {
      try {
        localStorage.setItem(hst, String(Math.max(0, Math.min(100, R2(o, 5)))));
      } catch {}
      dst();
    },
    session() {
      try {
        return R2(sessionStorage.getItem(ust));
      } catch {
        return Ti._s || 0;
      }
    },
    lifetime() {
      let o = { pictures: 0, cars: 0 };
      try {
        let e = JSON.parse(localStorage.getItem(fst) || "null");
        e && (o = { pictures: R2(e.pictures), cars: R2(e.cars) });
      } catch {}
      let t = JM?.p?.spend;
      return (
        t &&
          (o = {
            pictures: Math.max(o.pictures, R2(t.pictures)),
            cars: Math.max(o.cars, R2(t.cars)),
          }),
        o
      );
    },
    record(o, t = 1) {
      let e = Ti.lifetime();
      o === "car" ? (e.cars += t) : (e.pictures += t);
      try {
        localStorage.setItem(fst, JSON.stringify(e));
      } catch {}
      let s = Ti.session() + t;
      try {
        sessionStorage.setItem(ust, String(s));
      } catch {
        Ti._s = s;
      }
      (JM?.p && ((JM.p.spend = e), JM.save?.(!0)), dst());
    },
    over(o = 1) {
      return Ti.session() + o > Ti.cap();
    },
    tokens() {
      let o = Ti.lifetime(),
        t = vd("image", o.pictures),
        e = vd("car", o.cars);
      return (o.pictures && !t) || (o.cars && !e)
        ? null
        : {
            pictures: o.pictures,
            cars: o.cars,
            text: [t, e].filter(Boolean).join(" + ") || "\u2248 0 tokens",
          };
    },
    lifeLine() {
      let o = Ti.lifetime(),
        t = Ti.tokens();
      return `${o.pictures} AI picture${o.pictures === 1 ? "" : "s"} \xB7 ${o.cars} AI car${o.cars === 1 ? "" : "s"}${t && (o.pictures || o.cars) ? " \xB7 " + t.text.replace(/ \+ /, " + ") + " (estimate)" : ""}`;
    },
  };
function ZM(o, t = 1, e = "") {
  let s = vd(o, t),
    n = Ti.session(),
    i = Ti.cap(),
    a = n + t > i;
  return `<p><b>${e || (o === "car" ? "Create a car with AI?" : t > 1 ? `Make ${t} wrap designs?` : "Make a wrap design?")}</b></p>
    <p>This uses your mindblown tokens. After the free 10M a month, tokens cost real money. Estimated: ${s || "cost unknown"}.</p>
    <p class="sp-sess${a ? " over" : ""}">This session: ${n} of your limit of ${i} AI generation${i === 1 ? "" : "s"}${a ? " - this goes over it." : "."}</p>
    ${a ? '<label class="sp-over"><input type="checkbox" class="sp-go"> Go over my limit for this one</label>' : ""}`;
}
var QM = (o, t = 1) => !Ti.over(t) || !!o?.querySelector?.(".sp-go")?.checked;
