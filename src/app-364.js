// app 364 — math
// Lines 176300-176649 of readable/app.pretty.js (statement-aligned).
h2();
var Hv = "profile",
  snt = "teleop2.profile",
  O2 = "teleop2.guest",
  l4 = "teleop2.pending.",
  yB = "teleop2.cache.",
  lnt = 2,
  z8t = 3e4,
  Ua = {
    MAXV: 1e9,
    CAP: 15e3,
    RATE: 30,
    KMH: 450,
    DRIFT: 60,
    BOUNTY: 5e6,
    XPCAP: 25e3,
    XPRATE: 120,
  },
  Uv = [
    "taxi.total",
    "taxi.rides",
    "race.money",
    "race.played",
    "race.wins",
    "race.podiums",
    "police.bounty",
    "police.escapes",
    "police.busts",
    "km",
    "earned",
    "xp",
    "ch.cash",
    "ch.runs",
  ],
  cnt = ["kmh", "drift", "bounty"],
  nnt = [
    "sf-drive.settings",
    "sf-drive.traffic",
    "sf-drive.parked",
    "sf-drive.police",
    "sf-drive.units",
    "sf-drive.city",
  ],
  eT = () => ({
    schemaVersion: lnt,
    gid: null,
    pos: null,
    car: null,
    taxi: { total: 0, rides: 0, stars: [] },
    race: { money: 0, played: 0, wins: 0, podiums: 0, best: {} },
    police: { bounty: 0, escapes: 0, busts: 0 },
    km: 0,
    earned: 0,
    xp: 0,
    ch: { cash: 0, runs: 0, best: {} },
    roads: null,
    boards: [],
    best: { kmh: 0, drift: 0, bounty: 0 },
    settings: {},
    custom: {},
    ride: null,
    cars: [],
    mine: null,
    builds: [],
    spend: { pictures: 0, cars: 0 },
    claimed: null,
    imported: {},
    updated: 0,
    cash: { base: 0, baseT: 0, moves: 0, log: [] },
  }),
  _8t = { solo: [300, 150, 75], net: [500, 250, 100] },
  Sd = (o, t) => {
    let [e, s] = t.split(".");
    return s ? o[e]?.[s] : o[e];
  },
  sT = (o, t, e) => {
    let [s, n] = t.split(".");
    n ? (o[s][n] = e) : (o[s] = e);
  },
  Zo = (o, t = Ua.MAXV) => (
    (o = +o),
    Number.isFinite(o) ? Math.min(t, Math.max(0, o)) : 0
  ),
  Go = (o) => Math.round(o * 100) / 100,
  Dv = (o) => (o && typeof o == "object" && !Array.isArray(o) ? o : {}),
  MB = (o) => {
    let t = {};
    for (let e of Uv) t[e] = Zo(o?.[e]);
    return t;
  },
  E8t = (o) => {
    let t = {};
    for (let e of Uv) t[e] = Zo(Sd(o, e));
    return t;
  },
  SB = (o, t) => {
    if (!o && !t) return null;
    let e = {};
    for (let s of Uv) e[s] = Math.max(Zo(o?.[s]), Zo(t?.[s]));
    return e;
  },
  int = () =>
    (
      globalThis.crypto?.randomUUID?.() ||
      "g" + Math.random().toString(36).slice(2) + Date.now().toString(36)
    ).slice(0, 40),
  B2 = (o) => {
    try {
      return JSON.parse(localStorage.getItem(o) || "null");
    } catch {
      return null;
    }
  },
  Md = (o, t) => {
    try {
      return (localStorage.setItem(o, JSON.stringify(t)), !0);
    } catch {
      return !1;
    }
  },
  T8t = /^#[0-9a-f]{6}$/,
  wB = (o) => (typeof o == "string" && T8t.test(o) ? o : null);
function hnt(o) {
  let t = {};
  for (let [e, s] of Object.entries(Dv(o)).slice(0, 64)) {
    if (!/^[a-z0-9_-]{1,32}$/.test(e) || !s || typeof s != "object") continue;
    let n = Dv(s.paint),
      i = {
        c: wB(n.c),
        f: typeof n.f == "string" && /^[a-z]{1,12}$/.test(n.f) ? n.f : null,
        cal: wB(n.cal),
        rim: wB(n.rim),
      },
      a = c2(n.w);
    (a && !(a.u || "").startsWith("data:") && (i.w = a),
      (t[e] = {
        paint: i.c || i.f || i.cal || i.rim || i.w ? i : null,
        t: Zo(s.t, 1e15),
      }));
    let r = pnt(s.tune);
    r && (t[e].tune = r);
  }
  return t;
}
function h4(o) {
  let t = [];
  for (let e of (Array.isArray(o) ? o : []).slice(0, 24)) {
    if (
      !e ||
      typeof e != "object" ||
      typeof e.id != "string" ||
      !/^b[0-9a-z]{1,16}$/.test(e.id) ||
      typeof e.base != "string" ||
      !/^[a-z0-9_-]{1,32}$/.test(e.base)
    )
      continue;
    let s = hnt({ x: { paint: e.paint, tune: e.tune } }).x || {},
      n = e.base === "custom" ? Ul(e.ride) : null;
    (e.base === "custom" && !n) ||
      t.push({
        id: e.id,
        name:
          (typeof e.name == "string" &&
            e.name.replace(/[\u0000-\u001f<>]/g, "").slice(0, 28)) ||
          "My build",
        base: e.base,
        ride: n,
        paint: s.paint || null,
        tune: s.tune || null,
        t: Zo(e.t, 1e15),
        driven: !!e.driven,
      });
  }
  return t;
}
var ont = ["making", "closed", "ready", "driven"],
  fnt = (o, t) => {
    let e = new Map();
    for (let s of Av([...(o || []), ...(t || [])])) {
      let n = e.get(s.id);
      (!n || ont.indexOf(s.status) > ont.indexOf(n.status)) && e.set(s.id, s);
    }
    return [...e.values()].sort((s, n) => s.t0 - n.t0).slice(-6);
  },
  unt = (o, t) => ({
    pictures: Math.max(o?.pictures || 0, t?.pictures || 0),
    cars: Math.max(o?.cars || 0, t?.cars || 0),
  }),
  dnt = (o, t) => {
    let e = new Map();
    for (let s of [...(o || []), ...(t || [])]) {
      let n = e.get(s.id);
      (!n || (s.t || 0) > (n.t || 0)) && e.set(s.id, s);
    }
    return [...e.values()].sort((s, n) => (s.t || 0) - (n.t || 0)).slice(-24);
  };
function pnt(o) {
  if (!o || typeof o != "object" || Array.isArray(o)) return null;
  let t = {};
  for (let e of ["p", "own", "w", "t"]) {
    let s = o[e];
    if (!s || typeof s != "object" || Array.isArray(s)) continue;
    let n = {};
    for (let [i, a] of Object.entries(s).slice(0, 24))
      /^[a-z]{1,8}$/.test(i) &&
        Number.isFinite(+a) &&
        Math.abs(+a) < 1e5 &&
        (n[i] = +a);
    Object.keys(n).length && (t[e] = n);
  }
  return Object.keys(t).length ? t : null;
}
var mnt = (o, t, e = !1) => {
    for (let [s, n] of Object.entries(t?.custom || {}))
      (!o.custom[s] || (!e && (n.t || 0) > (o.custom[s].t || 0))) &&
        (o.custom[s] = n);
  },
  R8t = (o) => {
    try {
      localStorage.removeItem(o);
    } catch {}
  },
  A8t = /^[A-Za-z0-9+/]*={0,2}$/,
  ant = (o) => {
    try {
      let t = atob(o),
        e = new Uint8Array(t.length);
      for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
      return e;
    } catch {
      return null;
    }
  },
  P8t = (o) => {
    let t = "";
    for (let e = 0; e < o.length; e++) t += String.fromCharCode(o[e]);
    return btoa(t);
  };
function gnt(o) {
  return o &&
    typeof o == "object" &&
    Number.isInteger(o.n) &&
    o.n > 0 &&
    o.n < 1e6 &&
    typeof o.b == "string" &&
    o.b.length <= Math.ceil(o.n / 8 / 3) * 4 + 8 &&
    A8t.test(o.b)
    ? { n: o.n, b: o.b }
    : null;
}
function kB(o, t) {
  if (!o) return t ? { ...t } : null;
  if (!t || t.n !== o.n) return o;
  let e = ant(o.b),
    s = ant(t.b);
  if (!e || !s) return o;
  let n = new Uint8Array(Math.max(e.length, s.length));
  for (let i = 0; i < n.length; i++) n[i] = (e[i] || 0) | (s[i] || 0);
  return { n: o.n, b: P8t(n) };
}
var bnt = (o) =>
    (Array.isArray(o) ? o : [])
      .filter((t) => typeof t == "string" && /^[a-z0-9_-]{1,24}$/.test(t))
      .slice(0, 128),
  zB = (o, t) => [...new Set([...(o || []), ...(t || [])])].slice(0, 128),
  C8t = /^[a-z0-9_-]{1,32}$/;
function xnt(o) {
  let t = {};
  for (let [e, s] of Object.entries(Dv(o)).slice(0, 400)) {
    if (!C8t.test(e) || !s || typeof s != "object") continue;
    let n = (i, a, r) =>
      Number.isFinite(+i) ? Math.min(r, Math.max(a, +i)) : 0;
    t[e] = {
      s: Math.round(n(s.s, 0, 3)),
      v: n(s.v, -1e9, 1e9),
      q: n(s.q, -1e12, 1e12),
      n: Math.floor(n(s.n, 0, 1e6)),
      d: Math.floor(n(s.d, 0, 1e6)),
      k: Math.floor(n(s.k, 0, 1e4)),
    };
  }
  return t;
}
function vnt(o, t) {
  let e = ((o.ch ||= { cash: 0, runs: 0, best: {} }).best ||= {});
  for (let [s, n] of Object.entries(t?.ch?.best || {})) {
    let i = e[s];
    if (!i) {
      e[s] = { ...n };
      continue;
    }
    let a = n.s > i.s || (n.s === i.s && n.q > i.q),
      r = { ...(a ? n : i), n: Math.max(i.n || 0, n.n || 0) };
    ((n.d || 0) > (i.d || 0)
      ? ((r.d = n.d), (r.k = n.k))
      : n.d === i.d
        ? ((r.d = i.d), (r.k = Math.max(i.k || 0, n.k || 0)))
        : ((r.d = i.d), (r.k = i.k)),
      (e[s] = r));
  }
}
var ynt = 300,
  L8t = /^[\w.:-]{1,64}$/;
function I8t(o, t = null) {
  if (!o || typeof o != "object") {
    let n = t
      ? Zo(Sd(t, "taxi.total")) +
        Zo(Sd(t, "race.money")) +
        Zo(Sd(t, "police.bounty"))
      : 0;
    return { base: Go(n), baseT: 0, moves: 0, log: [] };
  }
  let e = [],
    s = new Set();
  for (let n of (Array.isArray(o.log) ? o.log : []).slice(-ynt * 2)) {
    if (!n || typeof n != "object" || !L8t.test(n.id || "") || s.has(n.id))
      continue;
    let i = +n.a,
      a = +n.t;
    if (!Number.isFinite(i) || Math.abs(i) > Ua.MAXV || !Number.isFinite(a))
      continue;
    s.add(n.id);
    let r = {
      id: n.id,
      t: a,
      a: Go(i),
      why:
        typeof n.why == "string"
          ? n.why.replace(/[\u0000-\u001f<>]/g, "").slice(0, 60)
          : "",
      k: typeof n.k == "string" ? n.k.slice(0, 12) : "",
    };
    (n.pend &&
      ((r.pend = 1),
      typeof n.held == "string" && (r.held = n.held.slice(0, 80))),
      Number.isFinite(+n.rel) && (r.rel = +n.rel),
      e.push(r));
  }
  return (
    e.sort((n, i) => n.t - i.t || (n.id < i.id ? -1 : 1)),
    c4({
      base: Number.isFinite(+o.base)
        ? Go(Math.max(-Ua.MAXV, Math.min(Ua.MAXV, +o.base)))
        : 0,
      baseT: Zo(o.baseT, 1e15),
      moves: Math.floor(Zo(o.moves, 1e6)),
      log: e,
    })
  );
}
