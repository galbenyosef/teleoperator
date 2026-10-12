// app 304 — math
// Lines 147009-147343 of readable/app.pretty.js (statement-aligned).
var lvt = 10,
  cvt = 4,
  hvt = 250,
  fvt = (i) => {
    if (!i) return "Factory paint";
    let t = cp.find(
        (s) =>
          s.kind === "colour" &&
          s.hex.toLowerCase() === (i.c || "").toLowerCase(),
      ),
      e = i.f && cp.find((s) => s.kind === "finish" && s.id === i.f);
    return [t?.name || i.c, e?.name].filter(Boolean).join(" \xB7 ");
  },
  uvt = (i) =>
    Math.max(
      0,
      ...cp
        .filter(
          (t) =>
            i &&
            ((t.kind === "colour" &&
              t.hex.toLowerCase() === (i.c || "").toLowerCase()) ||
              (t.kind === "finish" && t.id === i.f)),
        )
        .map((t) => t.level),
    ),
  P_ = class {
    constructor(t) {
      (Object.assign(this, t),
        (this.car = null),
        (this.open = !1),
        (this.paid = !1));
      let e = (this.hint = document.createElement("div"));
      if (
        ((e.id = "meetHint"),
        (e.className = "ds-panel ds-prompt ds-pop"),
        e.style.setProperty("--c", "var(--c-meet)"),
        (e.innerHTML =
          wr("meet", "sm") +
          '<span class="ds-eyebrow">Car meet</span><button type="button" class="primary" data-m="inspect"><span class="ds-key">E</span>Inspect</button><button type="button" data-m="photo"><span class="ds-key">F</span>Photo</button>'),
        this.touch)
      )
        for (let o of e.querySelectorAll(".ds-key")) o.remove();
      let s = (this.card = document.createElement("div"));
      ((s.id = "meetCard"),
        (s.className = "ds-panel"),
        Jo("bc", e, 1),
        document.body.append(s),
        e.addEventListener("click", (o) => {
          let a = o.target.closest("[data-m]");
          a &&
            (o.stopPropagation(),
            a.dataset.m === "inspect" ? this.inspect() : this.onPhoto?.());
        }),
        s.addEventListener("click", (o) => {
          let a = o.target.closest?.("[data-ev]");
          a
            ? (o.stopPropagation(), this.pick(+a.dataset.ev))
            : this.inspect(!1);
        }),
        typeof addEventListener == "function" &&
          addEventListener("keydown", (o) => {
            if (!this.open || o.repeat) return;
            let a = /^Digit([1-5])$/.exec(o.code);
            a && this.pick(+a[1] - 1) && o.preventDefault();
          }));
      let n = document.createElement("style");
      ((n.textContent =
        " #meetCard { position: fixed; right: var(--safe-r); top: 50%; transform: translate(16px, -50%); width: min(320px, calc(100vw - 32px)); z-index: 8; padding: 18px 20px; border-radius: var(--r-lg); background: var(--glass-strong); color: var(--ink); font: 500 13px/1.45 var(--font); opacity: 0; transition: opacity .25s, transform .25s; pointer-events: none; border-left: 4px solid var(--acc, #ff2fa0); } #meetCard.on { opacity: 1; transform: translate(0, -50%); pointer-events: auto; } #meetCard .k { font: 700 11px var(--font); letter-spacing: .2em; text-transform: uppercase; color: #ff2fa0; } #meetCard h4 { margin: 4px 0 2px; font: 800 24px var(--font); letter-spacing: .02em; } #meetCard .p { color: #c9ced6; margin-bottom: 10px; } #meetCard .s { display: flex; gap: 14px; margin: 10px 0; } #meetCard .s div { flex: 1; } #meetCard .s b { display: block; font: 800 16px var(--font); } #meetCard .s small { color: #9aa0a8; font-size: 11px; } #meetCard .x { color: #9aa0a8; font-size: 11px; margin-top: 8px; } #meetCard .ev { margin-top: 12px; border-top: 1px solid rgba(255,255,255,.12); padding-top: 10px; } #meetCard .ev button { all: unset; cursor: pointer; display: flex; align-items: center; gap: 10px; width: 100%; padding: 6px 4px; border-radius: 8px; box-sizing: border-box; } #meetCard .ev button:hover { background: rgba(255,255,255,.08); } #meetCard .ev i { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font: 900 11px var(--font); font-style: normal; flex: none; } #meetCard .ev span { flex: 1; font-weight: 700; } #meetCard .ev small { display: block; color: #9aa0a8; font-weight: 500; font-size: 11px; } #meetCard .ev b { font: 700 11px var(--font-mono); color: #c9ced6; } #meetCard .ev kbd { font: 800 10px var(--font-mono); padding: 1px 5px; border: 1px solid rgba(255,255,255,.4); border-radius: 4px; } body.hud-off #meetHint, body.photo #meetHint, body.hud-off #meetCard, body.photo #meetCard { visibility: hidden; } @media (max-width: 600px) { #meetCard { right: 16px; top: auto; bottom: 26%; transform: none; } #meetCard.on { transform: none; } }"),
        document.head.appendChild(n));
    }
    nearest() {
      let t = this.meet,
        e = this.v;
      if (t?.state !== "built") return null;
      let s = null,
        n = lvt;
      for (let o of t.cars) {
        let a = t.slots?.[o.meetSlot];
        if (!a) continue;
        let r = Math.hypot(a.x - e.pos.x, a.z - e.pos.z);
        r < n &&
          ((n = r),
          (s = {
            car: o,
            slot: a,
            id: Si.ids[o.meetSlot],
            paint: Si.paints[o.meetSlot],
          }));
      }
      return s;
    }
    update(t) {
      let e =
        t &&
        Math.abs(
          this.v.speed ?? Math.hypot(this.v.vel?.x || 0, this.v.vel?.z || 0),
        ) < cvt
          ? this.nearest()
          : null;
      return (
        (e?.car || null) !== (this.car?.car || null) &&
          this.open &&
          this.inspect(!1),
        (this.car = e),
        this.hint.classList.toggle("on", !!e),
        e
      );
    }
    inspect(t = !this.open) {
      if (
        (t && !this.car) ||
        ((this.open = !!t),
        this.card.classList.toggle("on", this.open),
        !this.open)
      )
        return;
      let { id: e, paint: s } = this.car,
        n = this.fleet?.[e] || { name: e, model: "" },
        o = uvt(s);
      (this.card.style.setProperty("--acc", s?.c || n.accent || "#ff2fa0"),
        (this.card.innerHTML =
          `<div class="k">Car meet \xB7 ${Si.name}</div><h4>${/\d/.test(n.model || "0") ? `${n.name} ${n.model || ""}` : `${n.model} ${n.name}`}</h4><div class="p">${fvt(s)}${o ? ` - an exclusive paint: Level ${o}` : ""}</div>` +
          (n.stats
            ? `<div class="s">${n.stats.map(([a, r]) => `<div><b>${a}</b><small>${r}</small></div>`).join("")}</div>`
            : "") +
          (n.drives ? `<div>${n.drives}</div>` : "") +
          `<div class="x">In your Garage${o ? ` - its paint from Level ${o}` : ""} \xB7 E: close</div>` +
          this.board()));
    }
    board() {
      let t = (this.list = (this.events?.() || []).slice(0, 5));
      if (!t.length) return "";
      let e = this.mph?.(),
        s = (n) =>
          e ? (n / 1609.34).toFixed(1) + " mi" : (n / 1e3).toFixed(1) + " km";
      return (
        '<div class="ev"><div class="k">Events from here</div>' +
        t
          .map(
            (n, o) =>
              `<button type="button" data-ev="${o}">${n.kind ? wr(n.kind, "sm") : `<i style="background:${n.col}">${n.glyph || ""}</i>`}<span>${n.name}<small>${n.label}${n.best ? " \xB7 best " + n.best : ""}</small></span><b>${s(n.d)}</b>${this.touch ? "" : `<kbd>${o + 1}</kbd>`}</button>`,
          )
          .join("") +
        "</div>"
      );
    }
    pick(t) {
      let e = this.list?.[t];
      return e ? (this.inspect(!1), this.onEvent?.(e), !0) : !1;
    }
    aim(t = this.photo) {
      let e = this.car || this.nearest();
      if (!e || !t?.on) return !1;
      let s = e.slot,
        n = -Math.sin(s.psi),
        o = -Math.cos(s.psi),
        a = -o,
        r = n,
        l = [this.v.pos, ...(this.meet.slots || []).filter((m) => m !== s)],
        c = 0,
        h = 0,
        f = -1;
      for (let [m, g] of [
        [5.2, 3.2],
        [5.2, -3.2],
        [-5.2, 3.2],
        [-5.2, -3.2],
        [6, 0],
      ]) {
        let b = s.x + n * m + a * g,
          x = s.z + o * m + r * g,
          v =
            Math.min(...l.map((y) => Math.hypot(y.x - b, y.z - x))) +
            (m > 0 ? 0.8 : 0);
        v > f && ((f = v), (c = b), (h = x));
      }
      let u = t.pos;
      u.set(c, s.y + 1.25, h);
      let d = s.x - u.x,
        p = s.z - u.z;
      return (
        (t.yaw = Math.atan2(-d, -p)),
        (t.pitch = -Math.atan2(0.75, Math.hypot(d, p))),
        this.paid || ((this.paid = !0), this.addXP?.(hvt, "Car meet photo")),
        this.inspect(!1),
        !0
      );
    }
  };
as();
iZ();
var vp = 2,
  dvt = 260,
  C_ = 24,
  pvt = 1.15,
  mvt = 0.05,
  oZ = 0.4;
var L_ = (i) =>
    i &&
    i.car &&
    !i.inner &&
    !i.hwy &&
    i.ja >= 0 &&
    i.jb >= 0 &&
    i.ja !== i.jb &&
    i.s1 - i.s0 > 6,
  PI = (i, t) =>
    i.oneway ? 0 : i.lg?.med > 0.3 ? t * (i.lg.med / 2 + 3.2) : 0;
function CI(i, t, e = 1) {
  let s = e > 0 ? "_rOkA" : "_rOkB";
  if (i[s] !== void 0) return i[s];
  let n = !0,
    o = {},
    a = PI(i, e);
  if (t?.world || t?.L)
    for (let r = i.s0 + 2; r <= i.s1 - 2 && n; r += 6) {
      Ot(i, r, o);
      let l = o.x + o.nx * a,
        c = o.z + o.nz * a;
      if (t.L?.terrainAt) {
        let h = t.L.terrainAt(l, c);
        Number.isFinite(h) && h > o.y + 1.5 && (n = !1);
      }
      if (n && t.L?.driveHeight && r > i.s0 + 8 && r < i.s1 - 8) {
        let h = t.L.driveHeight(l, c, null, o.y);
        Number.isFinite(h) && Math.abs(h - o.y) > 1.2 && (n = !1);
      }
      if (n && t.world) {
        for (let h of t.world.near(l, c, 4))
          if (
            !(
              h.dead ||
              h.prop ||
              h.wall ||
              h.parked ||
              (h.y1 !== void 0 && (o.y > h.y1 + 0.3 || o.y + 1.4 < h.y0))
            ) &&
            t.world.test(
              h,
              l,
              c,
              { x: -o.dz, z: o.dx },
              { x: o.dx, z: o.dz },
              0.9,
              1.6,
            )
          ) {
            n = !1;
            break;
          }
      }
    }
  return (i[s] = n);
}
var rZ = new Set([
    "primary",
    "secondary",
    "tertiary",
    "trunk",
    "primary_link",
    "secondary_link",
  ]),
  gvt = (i) => {
    let t = (Math.abs(i | 0) % 2147483646) + 1;
    return () => (t = (t * 16807) % 2147483647) / 2147483647;
  };
function LI(i) {
  if (i._gr !== void 0) return i._gr;
  let t = {},
    e = 0,
    s = null,
    n = 0;
  for (let o = i.s0; o <= i.s1; o += 10)
    (Ot(i, Math.min(o, i.s1), t),
      s !== null && o - n >= 20
        ? ((e = Math.max(e, Math.abs(t.y - s) / (o - n))), (s = t.y), (n = o))
        : s === null && ((s = t.y), (n = o)));
  return (
    s !== null &&
      i.s1 - n > 8 &&
      (Ot(i, i.s1, t), (e = Math.max(e, Math.abs(t.y - s) / (i.s1 - n)))),
    (i._gr = e)
  );
}
function F_(i, t = 150) {
  let e = {},
    s = [],
    n = 0;
  for (let a of i) {
    let r = Math.abs(a.sb - a.sa),
      l = a.sb > a.sa ? 1 : -1;
    for (let c = 0; c <= r && n + c <= t; c += 5)
      (Ot(a.E, a.sa + l * c, e), s.push(e.y));
    if (((n += r), n >= t)) break;
  }
  let o = 0;
  for (let a = 4; a < s.length; a++)
    o = Math.max(o, Math.abs(s[a] - s[a - 4]) / 20);
  return o;
}
var Iw = 0.06;
function lZ(i, t, e, s = null, n = 900, o = 10) {
  let a = [],
    r = {},
    l = (c, h) => CI(c, s ? { ...s, L: s.L || i.L } : null, h);
  for (let c of i.D.edges)
    if (!(!L_(c) || !rZ.has(c.cls) || c.s1 - c.s0 < 60 || LI(c) > Iw))
      for (let h of c.oneway ? [1] : [1, -1]) {
        let f = h > 0 ? c.s0 + 30 : c.s1 - 30;
        Ot(c, f, r);
        let u = Math.hypot(r.x - t, r.z - e);
        u > n ||
          (l(c, h) &&
            a.push({
              x: r.x,
              z: r.z,
              psi: Math.atan2(-r.dx * h, -r.dz * h),
              d: u,
              id: c.sid ?? 0,
            }));
      }
  return (a.sort((c, h) => c.d - h.d || c.id - h.id), a.slice(0, o));
}
function bvt(i, t, e) {
  let s = 0;
  if (!i?.tl) return 0;
  for (let n of i.tl) {
    let o = n.E;
    if (o === t || !L_(o)) continue;
    let a = n.end === "a" ? 1 : -1;
    (o.oneway && a < 0) || (e(o, a) && s++);
  }
  return s;
}
