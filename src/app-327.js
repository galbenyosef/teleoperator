// app 327 — math
// Lines 159537-159879 of readable/app.pretty.js (statement-aligned).
async function z3t(i, t = "") {
  let e = { c: null, p: [] },
    s;
  try {
    s = await (await fetch(i)).blob();
  } catch (o) {
    return (console.warn("wrap: share - the picture did not load", o), e);
  }
  try {
    e.p = (await $w(s)).slice(0, 3);
  } catch {}
  let n = sc();
  if (typeof n?.creations?.publish != "function" || !cf()) return e;
  try {
    let o = await createImageBitmap(s),
      a = null;
    for (let [c, h] of [
      [640, 0.72],
      [512, 0.66],
      [448, 0.6],
      [384, 0.55],
      [320, 0.5],
      [256, 0.45],
    ]) {
      let f = Math.min(1, c / Math.max(o.width, o.height)),
        u = new OffscreenCanvas(
          Math.round(o.width * f),
          Math.round(o.height * f),
        );
      u.getContext("2d").drawImage(o, 0, 0, u.width, u.height);
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
          await aQ(0);
          continue;
        }
        throw h;
      }
    if (l?.id) {
      e.c = l.id;
      let c = [];
      try {
        c = JSON.parse(localStorage.getItem(rz) || "[]");
      } catch {}
      c.push(l.id);
      try {
        localStorage.setItem(rz, JSON.stringify(c));
      } catch {}
      aQ(12);
    }
  } catch (o) {
    console.warn(
      "wrap: share - the public copy was not published",
      o?.reason || o,
    );
  }
  return e;
}
async function aQ(i) {
  let t = sc(),
    e = [];
  try {
    e = JSON.parse(localStorage.getItem(rz) || "[]");
  } catch {}
  for (; e.length > i;) {
    let s = e.shift();
    try {
      await t.creations.remove(s);
    } catch {}
  }
  try {
    localStorage.setItem(rz, JSON.stringify(e));
  } catch {}
}
async function fz(i, t, e) {
  let { clean: s } = await Promise.resolve().then(() => (ml(), pY)),
    { aliasWrap: n, shaOf: o } = await Promise.resolve().then(() => (wm(), nY)),
    a = s(i);
  if (!a?.w?.u) return a;
  if (!o(a.w.u)) {
    let l = (t || []).find((h) => h.url === a.w.u),
      c = l?.sha ? await _3t(l.sha, e || a.w.n || l.words) : null;
    c &&
      (n(a.w.u, c), l && (l.url = c), (a = s({ ...a, w: { ...a.w, u: c } })));
  }
  let r = await z3t(a.w.u, e || a.w.n);
  return s({
    ...a,
    w: {
      ...a.w,
      ...(r.c ? { c: r.c } : {}),
      ...(r.p.length ? { p: r.p } : {}),
    },
  });
}
async function Hx() {
  let i = sc();
  if (!nh()) return null;
  try {
    let t = await i.items.pick("car");
    return t?.picked && !t.picked.own ? t.picked : null;
  } catch (t) {
    return (console.warn("pick", t?.reason || t), null);
  }
}
async function uz() {
  let i = sc();
  if (typeof i?.items?.shared != "function") return [];
  try {
    return (await i.items.shared("vehicle", { quality: "high" })) || [];
  } catch (t) {
    return (console.warn("shared", t?.reason || t), []);
  }
}
async function cQ(i) {
  let t = sc();
  if (!(typeof t?.items?.equip != "function" || !i))
    try {
      await t.items.equip("car", i);
    } catch {}
}
async function $w(i) {
  let t = await createImageBitmap(i, {
      resizeWidth: 48,
      resizeHeight: 48,
      resizeQuality: "low",
    }),
    e = new OffscreenCanvas(48, 48),
    s = e.getContext("2d");
  (s.drawImage(t, 0, 0), t.close?.());
  let n = s.getImageData(0, 0, 48, 48).data,
    o = [];
  for (let h = 0; h < n.length; h += 4)
    n[h + 3] > 200 && o.push([n[h], n[h + 1], n[h + 2]]);
  if (!o.length) return [];
  let a = Array.from({ length: 6 }, (h, f) =>
      o[Math.floor(((f + 0.5) / 6) * o.length)].slice(),
    ),
    r = new Array(o.length).fill(0);
  for (let h = 0; h < 8; h++) {
    for (let u = 0; u < o.length; u++) {
      let d = 0,
        p = 1e9;
      for (let m = 0; m < a.length; m++) {
        let g =
          (o[u][0] - a[m][0]) ** 2 +
          (o[u][1] - a[m][1]) ** 2 +
          (o[u][2] - a[m][2]) ** 2;
        g < p && ((p = g), (d = m));
      }
      r[u] = d;
    }
    let f = a.map(() => [0, 0, 0, 0]);
    for (let u = 0; u < o.length; u++) {
      let d = f[r[u]];
      ((d[0] += o[u][0]), (d[1] += o[u][1]), (d[2] += o[u][2]), d[3]++);
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
var hQ = "sf-drive.builds",
  E3t = 6,
  hF = new Set(),
  Xw = null,
  fF = (i) => {
    if (
      !i ||
      typeof i != "object" ||
      typeof i.id != "string" ||
      !/^m[0-9a-z]{1,16}$/.test(i.id)
    )
      return null;
    let t = (s) =>
        typeof s == "string"
          ? s.replace(/[\u0000-\u001f<>]/g, "").slice(0, 300)
          : "",
      e =
        i.item && typeof i.item == "object"
          ? {
              id: t(i.item.id).slice(0, 64),
              name: t(i.item.name).slice(0, 40),
              sha: /^[0-9a-f]{64}$/.test(i.item.sha || "") ? i.item.sha : null,
              icon: /^\/__mb\/items\/[0-9a-f]{64}\.png$/.test(i.item.icon || "")
                ? i.item.icon
                : null,
            }
          : null;
    return {
      id: i.id,
      kind: i.kind === "wrap" ? "wrap" : "car",
      name: t(i.name).slice(0, 40) || "AI car",
      prompt: t(i.prompt),
      thumb:
        typeof i.thumb == "string" &&
        /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(i.thumb) &&
        i.thumb.length < 16e3
          ? i.thumb
          : null,
      base: t(i.base).slice(0, 40),
      t0: Number.isFinite(+i.t0) ? +i.t0 : Date.now(),
      t1: Number.isFinite(+i.t1) ? +i.t1 : 0,
      status: ["making", "ready", "closed", "driven"].includes(i.status)
        ? i.status
        : "making",
      prev: t(i.prev).slice(0, 64),
      item: e,
      ride: vl(i.ride),
      spent: {
        pictures: Math.max(0, Math.floor(+i.spent?.pictures || 0)),
        cars: Math.max(0, Math.floor(+i.spent?.cars || 0)),
      },
    };
  },
  Dx = (i) => (Array.isArray(i) ? i.map(fF).filter(Boolean).slice(-E3t) : []),
  T3t = () => {
    try {
      return Dx(JSON.parse(localStorage.getItem(hQ) || "[]"));
    } catch {
      return [];
    }
  };
function cF(i) {
  i = Dx(i);
  try {
    localStorage.setItem(hQ, JSON.stringify(i));
  } catch {}
  Xw?.p && ((Xw.p.builds = i), Xw.save?.(!0));
  for (let t of hF)
    try {
      t(i);
    } catch {}
}
var Nn = {
    on(i) {
      return (hF.add(i), () => hF.delete(i));
    },
    bindProfile(i) {
      Xw = i;
    },
    list() {
      let i = new Map();
      for (let t of [...T3t(), ...Dx(Xw?.p?.builds)]) {
        let e = i.get(t.id),
          s = (n) => ["making", "closed", "ready", "driven"].indexOf(n.status);
        (!e || s(t) > s(e)) && i.set(t.id, t);
      }
      return [...i.values()].sort((t, e) => t.t0 - e.t0);
    },
    get(i) {
      return Nn.list().find((t) => t.id === i) || null;
    },
    open() {
      return Nn.list().filter(
        (i) =>
          i.status === "making" ||
          i.status === "ready" ||
          i.status === "closed",
      );
    },
    making() {
      return Nn.list().filter(
        (i) => i.status === "making" || i.status === "closed",
      );
    },
    add(i) {
      let t = fF({
        id: "m" + Date.now().toString(36),
        t0: Date.now(),
        status: "making",
        ...i,
      });
      return (cF([...Nn.list(), t]), t);
    },
    update(i, t) {
      let e = Nn.list(),
        s = e.findIndex((n) => n.id === i);
      return s < 0 ? null : ((e[s] = fF({ ...e[s], ...t })), cF(e), e[s]);
    },
    remove(i) {
      cF(Nn.list().filter((t) => t.id !== i));
    },
    spent(i, t, e = 1) {
      let s = Nn.get(i);
      if (!s) return;
      let n = { ...s.spent };
      (t === "car" ? (n.cars += e) : (n.pictures += e),
        Nn.update(i, { spent: n }));
    },
  },
  Kw = (i) => {
    let t = Math.max(0, Math.round((Date.now() - i) / 6e4));
    return t < 1
      ? "just now"
      : t < 60
        ? t + " min"
        : Math.floor(t / 60) + " h " + (t % 60) + " min";
  };
