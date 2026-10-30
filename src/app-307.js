// app 307 — math
// Lines 148741-149075 of readable/app.pretty.js (statement-aligned).
var K5t = 10,
  Y5t = 4,
  J5t = 250,
  Z5t = (o) => {
    if (!o) return "Factory paint";
    let t = Up.find(
        (s) =>
          s.kind === "colour" &&
          s.hex.toLowerCase() === (o.c || "").toLowerCase(),
      ),
      e = o.f && Up.find((s) => s.kind === "finish" && s.id === o.f);
    return [t?.name || o.c, e?.name].filter(Boolean).join(" \xB7 ");
  },
  Q5t = (o) =>
    Math.max(
      0,
      ...Up.filter(
        (t) =>
          o &&
          ((t.kind === "colour" &&
            t.hex.toLowerCase() === (o.c || "").toLowerCase()) ||
            (t.kind === "finish" && t.id === o.f)),
      ).map((t) => t.level),
    ),
  I_ = class {
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
          Br("meet", "sm") +
          '<span class="ds-eyebrow">Car meet</span><button type="button" class="primary" data-m="inspect"><span class="ds-key">E</span>Inspect</button><button type="button" data-m="photo"><span class="ds-key">F</span>Photo</button>'),
        this.touch)
      )
        for (let i of e.querySelectorAll(".ds-key")) i.remove();
      let s = (this.card = document.createElement("div"));
      ((s.id = "meetCard"),
        (s.className = "ds-panel"),
        aa("bc", e, 1),
        document.body.append(s),
        e.addEventListener("click", (i) => {
          let a = i.target.closest("[data-m]");
          a &&
            (i.stopPropagation(),
            a.dataset.m === "inspect" ? this.inspect() : this.onPhoto?.());
        }),
        s.addEventListener("click", (i) => {
          let a = i.target.closest?.("[data-ev]");
          a
            ? (i.stopPropagation(), this.pick(+a.dataset.ev))
            : this.inspect(!1);
        }),
        typeof addEventListener == "function" &&
          addEventListener("keydown", (i) => {
            if (!this.open || i.repeat) return;
            let a = /^Digit([1-5])$/.exec(i.code);
            a && this.pick(+a[1] - 1) && i.preventDefault();
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
        n = K5t;
      for (let i of t.cars) {
        let a = t.slots?.[i.meetSlot];
        if (!a) continue;
        let r = Math.hypot(a.x - e.pos.x, a.z - e.pos.z);
        r < n &&
          ((n = r),
          (s = {
            car: i,
            slot: a,
            id: Ci.ids[i.meetSlot],
            paint: Ci.paints[i.meetSlot],
          }));
      }
      return s;
    }
    update(t) {
      let e =
        t &&
        Math.abs(
          this.v.speed ?? Math.hypot(this.v.vel?.x || 0, this.v.vel?.z || 0),
        ) < Y5t
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
        i = Q5t(s);
      (this.card.style.setProperty("--acc", s?.c || n.accent || "#ff2fa0"),
        (this.card.innerHTML =
          `<div class="k">Car meet \xB7 ${Ci.name}</div><h4>${/\d/.test(n.model || "0") ? `${n.name} ${n.model || ""}` : `${n.model} ${n.name}`}</h4><div class="p">${Z5t(s)}${i ? ` - an exclusive paint: Level ${i}` : ""}</div>` +
          (n.stats
            ? `<div class="s">${n.stats.map(([a, r]) => `<div><b>${a}</b><small>${r}</small></div>`).join("")}</div>`
            : "") +
          (n.drives ? `<div>${n.drives}</div>` : "") +
          `<div class="x">In your Garage${i ? ` - its paint from Level ${i}` : ""} \xB7 E: close</div>` +
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
            (n, i) =>
              `<button type="button" data-ev="${i}">${n.kind ? Br(n.kind, "sm") : `<i style="background:${n.col}">${n.glyph || ""}</i>`}<span>${n.name}<small>${n.label}${n.best ? " \xB7 best " + n.best : ""}</small></span><b>${s(n.d)}</b>${this.touch ? "" : `<kbd>${i + 1}</kbd>`}</button>`,
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
        i = -Math.cos(s.psi),
        a = -i,
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
          v = s.z + i * m + r * g,
          x =
            Math.min(...l.map((y) => Math.hypot(y.x - b, y.z - v))) +
            (m > 0 ? 0.8 : 0);
        x > f && ((f = x), (c = b), (h = v));
      }
      let u = t.pos;
      u.set(c, s.y + 1.25, h);
      let d = s.x - u.x,
        p = s.z - u.z;
      return (
        (t.yaw = Math.atan2(-d, -p)),
        (t.pitch = -Math.atan2(0.75, Math.hypot(d, p))),
        this.paid || ((this.paid = !0), this.addXP?.(J5t, "Car meet photo")),
        this.inspect(!1),
        !0
      );
    }
  };
es();
await No();
btt();
var Qp = 2,
  twt = 260,
  F_ = 24,
  ewt = 1.15,
  swt = 0.05,
  xtt = 0.4;
var t1 = Ia("tracks", gtt),
  O_ = (o) =>
    o &&
    o.car &&
    !o.inner &&
    !o.hwy &&
    o.ja >= 0 &&
    o.jb >= 0 &&
    o.ja !== o.jb &&
    o.s1 - o.s0 > 6,
  uO = (o, t) =>
    o.oneway ? 0 : o.lg?.med > 0.3 ? t * (o.lg.med / 2 + 3.2) : 0;
function dO(o, t, e = 1) {
  let s = e > 0 ? "_rOkA" : "_rOkB";
  if (o[s] !== void 0) return o[s];
  let n = !0,
    i = {},
    a = uO(o, e);
  if (t?.world || t?.L)
    for (let r = o.s0 + 2; r <= o.s1 - 2 && n; r += 6) {
      Ot(o, r, i);
      let l = i.x + i.nx * a,
        c = i.z + i.nz * a;
      if (t.L?.terrainAt) {
        let h = t.L.terrainAt(l, c);
        Number.isFinite(h) && h > i.y + 1.5 && (n = !1);
      }
      if (n && t.L?.driveHeight && r > o.s0 + 8 && r < o.s1 - 8) {
        let h = t.L.driveHeight(l, c, null, i.y);
        Number.isFinite(h) && Math.abs(h - i.y) > 1.2 && (n = !1);
      }
      if (n && t.world) {
        for (let h of t.world.near(l, c, 4))
          if (
            !(
              h.dead ||
              h.prop ||
              h.wall ||
              h.parked ||
              (h.y1 !== void 0 && (i.y > h.y1 + 0.3 || i.y + 1.4 < h.y0))
            ) &&
            t.world.test(
              h,
              l,
              c,
              { x: -i.dz, z: i.dx },
              { x: i.dx, z: i.dz },
              0.9,
              1.6,
            )
          ) {
            n = !1;
            break;
          }
      }
    }
  return (o[s] = n);
}
var ytt = new Set([
    "primary",
    "secondary",
    "tertiary",
    "trunk",
    "primary_link",
    "secondary_link",
  ]),
  nwt = (o) => {
    let t = (Math.abs(o | 0) % 2147483646) + 1;
    return () => (t = (t * 16807) % 2147483647) / 2147483647;
  };
function pO(o) {
  if (o._gr !== void 0) return o._gr;
  let t = {},
    e = 0,
    s = null,
    n = 0;
  for (let i = o.s0; i <= o.s1; i += 10)
    (Ot(o, Math.min(i, o.s1), t),
      s !== null && i - n >= 20
        ? ((e = Math.max(e, Math.abs(t.y - s) / (i - n))), (s = t.y), (n = i))
        : s === null && ((s = t.y), (n = i)));
  return (
    s !== null &&
      o.s1 - n > 8 &&
      (Ot(o, o.s1, t), (e = Math.max(e, Math.abs(t.y - s) / (o.s1 - n)))),
    (o._gr = e)
  );
}
function N_(o, t = 150) {
  let e = {},
    s = [],
    n = 0;
  for (let a of o) {
    let r = Math.abs(a.sb - a.sa),
      l = a.sb > a.sa ? 1 : -1;
    for (let c = 0; c <= r && n + c <= t; c += 5)
      (Ot(a.E, a.sa + l * c, e), s.push(e.y));
    if (((n += r), n >= t)) break;
  }
  let i = 0;
  for (let a = 4; a < s.length; a++)
    i = Math.max(i, Math.abs(s[a] - s[a - 4]) / 20);
  return i;
}
var PM = 0.06;
function wtt(o, t, e, s = null, n = 900, i = 10) {
  let a = [],
    r = {},
    l = (c, h) => dO(c, s ? { ...s, L: s.L || o.L } : null, h);
  for (let c of o.D.edges)
    if (!(!O_(c) || !ytt.has(c.cls) || c.s1 - c.s0 < 60 || pO(c) > PM))
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
  return (a.sort((c, h) => c.d - h.d || c.id - h.id), a.slice(0, i));
}
function iwt(o, t, e) {
  let s = 0;
  if (!o?.tl) return 0;
  for (let n of o.tl) {
    let i = n.E;
    if (i === t || !O_(i)) continue;
    let a = n.end === "a" ? 1 : -1;
    (i.oneway && a < 0) || (e(i, a) && s++);
  }
  return s;
}
