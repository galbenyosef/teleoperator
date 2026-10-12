// app 348 — math
// Lines 170159-170508 of readable/app.pretty.js (statement-aligned).
wm();
var Kx = "profile",
  ntt = "teleop2.profile",
  Vm = "teleop2.guest",
  rM = "teleop2.pending.",
  kF = "teleop2.cache.",
  ctt = 2,
  X5t = 3e4,
  Ra = {
    MAXV: 1e9,
    CAP: 15e3,
    RATE: 30,
    KMH: 450,
    DRIFT: 60,
    BOUNTY: 5e6,
    XPCAP: 25e3,
    XPRATE: 120,
  },
  Jx = [
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
  htt = ["kmh", "drift", "bounty"],
  itt = [
    "sf-drive.settings",
    "sf-drive.traffic",
    "sf-drive.parked",
    "sf-drive.police",
    "sf-drive.units",
    "sf-drive.city",
  ],
  Oz = () => ({
    schemaVersion: ctt,
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
  K5t = { solo: [300, 150, 75], net: [500, 250, 100] },
  Gu = (i, t) => {
    let [e, s] = t.split(".");
    return s ? i[e]?.[s] : i[e];
  },
  Hz = (i, t, e) => {
    let [s, n] = t.split(".");
    n ? (i[s][n] = e) : (i[s] = e);
  },
  Go = (i, t = Ra.MAXV) => (
    (i = +i),
    Number.isFinite(i) ? Math.min(t, Math.max(0, i)) : 0
  ),
  Co = (i) => Math.round(i * 100) / 100,
  Yx = (i) => (i && typeof i == "object" && !Array.isArray(i) ? i : {}),
  zF = (i) => {
    let t = {};
    for (let e of Jx) t[e] = Go(i?.[e]);
    return t;
  },
  Y5t = (i) => {
    let t = {};
    for (let e of Jx) t[e] = Go(Gu(i, e));
    return t;
  },
  EF = (i, t) => {
    if (!i && !t) return null;
    let e = {};
    for (let s of Jx) e[s] = Math.max(Go(i?.[s]), Go(t?.[s]));
    return e;
  },
  ott = () =>
    (
      globalThis.crypto?.randomUUID?.() ||
      "g" + Math.random().toString(36).slice(2) + Date.now().toString(36)
    ).slice(0, 40),
  $m = (i) => {
    try {
      return JSON.parse(localStorage.getItem(i) || "null");
    } catch {
      return null;
    }
  },
  Uu = (i, t) => {
    try {
      return (localStorage.setItem(i, JSON.stringify(t)), !0);
    } catch {
      return !1;
    }
  },
  J5t = /^#[0-9a-f]{6}$/,
  _F = (i) => (typeof i == "string" && J5t.test(i) ? i : null);
function ftt(i) {
  let t = {};
  for (let [e, s] of Object.entries(Yx(i)).slice(0, 64)) {
    if (!/^[a-z0-9_-]{1,32}$/.test(e) || !s || typeof s != "object") continue;
    let n = Yx(s.paint),
      o = {
        c: _F(n.c),
        f: typeof n.f == "string" && /^[a-z]{1,12}$/.test(n.f) ? n.f : null,
        cal: _F(n.cal),
        rim: _F(n.rim),
      },
      a = ym(n.w);
    (a && !(a.u || "").startsWith("data:") && (o.w = a),
      (t[e] = {
        paint: o.c || o.f || o.cal || o.rim || o.w ? o : null,
        t: Go(s.t, 1e15),
      }));
    let r = mtt(s.tune);
    r && (t[e].tune = r);
  }
  return t;
}
function cM(i) {
  let t = [];
  for (let e of (Array.isArray(i) ? i : []).slice(0, 24)) {
    if (
      !e ||
      typeof e != "object" ||
      typeof e.id != "string" ||
      !/^b[0-9a-z]{1,16}$/.test(e.id) ||
      typeof e.base != "string" ||
      !/^[a-z0-9_-]{1,32}$/.test(e.base)
    )
      continue;
    let s = ftt({ x: { paint: e.paint, tune: e.tune } }).x || {},
      n = e.base === "custom" ? vl(e.ride) : null;
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
        t: Go(e.t, 1e15),
        driven: !!e.driven,
      });
  }
  return t;
}
var att = ["making", "closed", "ready", "driven"],
  utt = (i, t) => {
    let e = new Map();
    for (let s of Dx([...(i || []), ...(t || [])])) {
      let n = e.get(s.id);
      (!n || att.indexOf(s.status) > att.indexOf(n.status)) && e.set(s.id, s);
    }
    return [...e.values()].sort((s, n) => s.t0 - n.t0).slice(-6);
  },
  dtt = (i, t) => ({
    pictures: Math.max(i?.pictures || 0, t?.pictures || 0),
    cars: Math.max(i?.cars || 0, t?.cars || 0),
  }),
  ptt = (i, t) => {
    let e = new Map();
    for (let s of [...(i || []), ...(t || [])]) {
      let n = e.get(s.id);
      (!n || (s.t || 0) > (n.t || 0)) && e.set(s.id, s);
    }
    return [...e.values()].sort((s, n) => (s.t || 0) - (n.t || 0)).slice(-24);
  };
function mtt(i) {
  if (!i || typeof i != "object" || Array.isArray(i)) return null;
  let t = {};
  for (let e of ["p", "own", "w", "t"]) {
    let s = i[e];
    if (!s || typeof s != "object" || Array.isArray(s)) continue;
    let n = {};
    for (let [o, a] of Object.entries(s).slice(0, 24))
      /^[a-z]{1,8}$/.test(o) &&
        Number.isFinite(+a) &&
        Math.abs(+a) < 1e5 &&
        (n[o] = +a);
    Object.keys(n).length && (t[e] = n);
  }
  return Object.keys(t).length ? t : null;
}
var gtt = (i, t, e = !1) => {
    for (let [s, n] of Object.entries(t?.custom || {}))
      (!i.custom[s] || (!e && (n.t || 0) > (i.custom[s].t || 0))) &&
        (i.custom[s] = n);
  },
  Z5t = (i) => {
    try {
      localStorage.removeItem(i);
    } catch {}
  },
  Q5t = /^[A-Za-z0-9+/]*={0,2}$/,
  rtt = (i) => {
    try {
      let t = atob(i),
        e = new Uint8Array(t.length);
      for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
      return e;
    } catch {
      return null;
    }
  },
  tyt = (i) => {
    let t = "";
    for (let e = 0; e < i.length; e++) t += String.fromCharCode(i[e]);
    return btoa(t);
  };
function btt(i) {
  return i &&
    typeof i == "object" &&
    Number.isInteger(i.n) &&
    i.n > 0 &&
    i.n < 1e6 &&
    typeof i.b == "string" &&
    i.b.length <= Math.ceil(i.n / 8 / 3) * 4 + 8 &&
    Q5t.test(i.b)
    ? { n: i.n, b: i.b }
    : null;
}
function TF(i, t) {
  if (!i) return t ? { ...t } : null;
  if (!t || t.n !== i.n) return i;
  let e = rtt(i.b),
    s = rtt(t.b);
  if (!e || !s) return i;
  let n = new Uint8Array(Math.max(e.length, s.length));
  for (let o = 0; o < n.length; o++) n[o] = (e[o] || 0) | (s[o] || 0);
  return { n: i.n, b: tyt(n) };
}
var xtt = (i) =>
    (Array.isArray(i) ? i : [])
      .filter((t) => typeof t == "string" && /^[a-z0-9_-]{1,24}$/.test(t))
      .slice(0, 128),
  AF = (i, t) => [...new Set([...(i || []), ...(t || [])])].slice(0, 128),
  eyt = /^[a-z0-9_-]{1,32}$/;
function vtt(i) {
  let t = {};
  for (let [e, s] of Object.entries(Yx(i)).slice(0, 400)) {
    if (!eyt.test(e) || !s || typeof s != "object") continue;
    let n = (o, a, r) =>
      Number.isFinite(+o) ? Math.min(r, Math.max(a, +o)) : 0;
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
function ytt(i, t) {
  let e = ((i.ch ||= { cash: 0, runs: 0, best: {} }).best ||= {});
  for (let [s, n] of Object.entries(t?.ch?.best || {})) {
    let o = e[s];
    if (!o) {
      e[s] = { ...n };
      continue;
    }
    let a = n.s > o.s || (n.s === o.s && n.q > o.q),
      r = { ...(a ? n : o), n: Math.max(o.n || 0, n.n || 0) };
    ((n.d || 0) > (o.d || 0)
      ? ((r.d = n.d), (r.k = n.k))
      : n.d === o.d
        ? ((r.d = o.d), (r.k = Math.max(o.k || 0, n.k || 0)))
        : ((r.d = o.d), (r.k = o.k)),
      (e[s] = r));
  }
}
var wtt = 300,
  syt = /^[\w.:-]{1,64}$/;
function nyt(i, t = null) {
  if (!i || typeof i != "object") {
    let n = t
      ? Go(Gu(t, "taxi.total")) +
        Go(Gu(t, "race.money")) +
        Go(Gu(t, "police.bounty"))
      : 0;
    return { base: Co(n), baseT: 0, moves: 0, log: [] };
  }
  let e = [],
    s = new Set();
  for (let n of (Array.isArray(i.log) ? i.log : []).slice(-wtt * 2)) {
    if (!n || typeof n != "object" || !syt.test(n.id || "") || s.has(n.id))
      continue;
    let o = +n.a,
      a = +n.t;
    if (!Number.isFinite(o) || Math.abs(o) > Ra.MAXV || !Number.isFinite(a))
      continue;
    s.add(n.id);
    let r = {
      id: n.id,
      t: a,
      a: Co(o),
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
    e.sort((n, o) => n.t - o.t || (n.id < o.id ? -1 : 1)),
    lM({
      base: Number.isFinite(+i.base)
        ? Co(Math.max(-Ra.MAXV, Math.min(Ra.MAXV, +i.base)))
        : 0,
      baseT: Go(i.baseT, 1e15),
      moves: Math.floor(Go(i.moves, 1e6)),
      log: e,
    })
  );
}
