// app 365 — best
// Lines 176650-176838 of readable/app.pretty.js (statement-aligned).
function c4(o) {
  for (; o.log.length > ynt;) {
    let t = o.log.findIndex((s) => !s.pend);
    if (t < 0) break;
    let e = o.log.splice(t, 1)[0];
    ((o.base = Go(o.base + e.a)), (o.baseT = Math.max(o.baseT, e.t)));
  }
  return o;
}
var wnt = (o) =>
    Go(
      (o?.base || 0) +
        (o?.log || []).reduce((t, e) => t + (e.pend ? 0 : e.a), 0),
    ),
  F8t = (o) => Go((o?.log || []).reduce((t, e) => t + (e.pend ? e.a : 0), 0));
function O8t(o, t) {
  if (!t) return o;
  if (!o) return t;
  let [e, s] =
      o.baseT > t.baseT || (o.baseT === t.baseT && o.base >= t.base)
        ? [o, t]
        : [t, o],
    n = new Map();
  for (let a of e.log) n.set(a.id, { ...a });
  for (let a of s.log) {
    if (a.t <= e.baseT && !n.has(a.id)) continue;
    let r = n.get(a.id);
    r
      ? r.pend && !a.pend && (delete r.pend, delete r.held, (r.rel = a.rel))
      : n.set(a.id, { ...a });
  }
  let i = [...n.values()].sort((a, r) => a.t - r.t || (a.id < r.id ? -1 : 1));
  return c4({
    base: e.base,
    baseT: e.baseT,
    moves: Math.max(o.moves || 0, t.moves || 0),
    log: i,
  });
}
function Oh(o) {
  if (
    !o ||
    typeof o != "object" ||
    !(o.schemaVersion === 1 || o.schemaVersion === lnt)
  )
    return null;
  let t = eT();
  for (let e of Uv) sT(t, e, Zo(Sd(o, e)));
  for (let e of [
    "taxi.rides",
    "race.played",
    "race.wins",
    "race.podiums",
    "police.escapes",
    "police.busts",
  ])
    sT(t, e, Math.floor(Sd(t, e)));
  (o.schemaVersion === 1 &&
    (t.earned = Go(t.taxi.total + t.race.money + t.police.bounty)),
    (t.taxi.stars = (Array.isArray(o.taxi?.stars) ? o.taxi.stars : [])
      .map((e) => Math.round(+e))
      .filter((e) => e >= 1 && e <= 5)
      .slice(-200)));
  for (let [e, s] of Object.entries(Dv(o.race?.best)))
    Zo(s) > 0 && String(e).length < 64 && (t.race.best[e] = Math.round(Zo(s)));
  ((t.best.kmh = Zo(o.best?.kmh, Ua.KMH)),
    (t.best.drift = Zo(o.best?.drift, Ua.DRIFT)),
    (t.best.bounty = Zo(o.best?.bounty, Ua.BOUNTY)),
    o.pos &&
      Number.isFinite(+o.pos.x) &&
      Number.isFinite(+o.pos.z) &&
      (t.pos = {
        x: +o.pos.x,
        z: +o.pos.z,
        psi: Number.isFinite(+o.pos.psi) ? +o.pos.psi : 0,
      }),
    typeof o.car == "string" && o.car.length < 40 && (t.car = o.car),
    typeof o.gid == "string" && o.gid.length <= 40 && (t.gid = o.gid),
    (t.custom = hnt(o.custom)),
    (t.ride = Ul(o.ride)),
    (t.cars = h4(o.cars)),
    (t.builds = Av(o.builds)),
    (t.spend = {
      pictures: Math.floor(Zo(o.spend?.pictures, 1e7)),
      cars: Math.floor(Zo(o.spend?.cars, 1e6)),
    }),
    (t.mine =
      typeof o.mine == "string" && /^b[0-9a-z]{1,16}$/.test(o.mine)
        ? o.mine
        : null),
    (t.roads = gnt(o.roads)),
    (t.boards = bnt(o.boards)),
    (t.ch.runs = Math.floor(t.ch.runs)),
    (t.ch.best = xnt(o.ch?.best)),
    (t.settings = Dv(o.settings)),
    (t.claimed = o.claimed ? MB(o.claimed) : null));
  for (let [e, s] of Object.entries(Dv(o.imported)).slice(-50))
    t.imported[e] = MB(s);
  return ((t.cash = I8t(o.cash, o)), (t.updated = Zo(o.updated, 1e15)), t);
}
function l1(o, t) {
  if (!t) return o;
  for (let e of Uv) sT(o, e, Math.max(Zo(Sd(o, e)), Zo(Sd(t, e))));
  for (let e of cnt) o.best[e] = Math.max(o.best[e] || 0, t.best?.[e] || 0);
  for (let [e, s] of Object.entries(t.race?.best || {}))
    (!o.race.best[e] || s < o.race.best[e]) && (o.race.best[e] = s);
  (t.taxi?.stars?.length || 0) > o.taxi.stars.length &&
    (o.taxi.stars = t.taxi.stars.slice(-200));
  for (let [e, s] of Object.entries(t.imported || {}))
    o.imported[e] = SB(o.imported[e], s);
  return (
    (o.claimed = SB(o.claimed, t.claimed)),
    mnt(o, t),
    (o.cars = dnt(o.cars, t.cars)),
    (o.builds = fnt(o.builds, t.builds)),
    (o.spend = unt(o.spend, t.spend)),
    (o.roads = kB(o.roads, t.roads)),
    (o.boards = zB(o.boards, t.boards)),
    vnt(o, t),
    (o.cash = O8t(o.cash, t.cash)),
    (t.updated || 0) > (o.updated || 0) &&
      (t.pos && (o.pos = t.pos),
      t.car &&
        ((o.car = t.car),
        t.ride && (o.ride = t.ride),
        (o.mine = t.mine || null)),
      t.settings && Object.keys(t.settings).length && (o.settings = t.settings),
      (o.updated = t.updated)),
    !o.gid && t.gid && (o.gid = t.gid),
    o
  );
}
function rnt(o, t) {
  if (!o || !t || !t.gid) return null;
  let e = SB(t.claimed, o.imported[t.gid]) || MB(null),
    s = E8t(t),
    n = {},
    i = !1;
  for (let h of Uv) {
    let f = Math.max(0, s[h] - e[h]);
    ((n[h] = f), f > 0 && ((i = !0), sT(o, h, Go(Zo(Sd(o, h)) + f))));
  }
  for (let h of cnt) o.best[h] = Math.max(o.best[h] || 0, t.best?.[h] || 0);
  for (let [h, f] of Object.entries(t.race?.best || {}))
    (!o.race.best[h] || f < o.race.best[h]) && (o.race.best[h] = f);
  (n["taxi.rides"] > 0 &&
    (o.taxi.stars = o.taxi.stars
      .concat((t.taxi.stars || []).slice(-Math.min(200, n["taxi.rides"])))
      .slice(-200)),
    mnt(o, t, !0),
    (o.cars = dnt(o.cars, t.cars)),
    (o.builds = fnt(o.builds, t.builds)),
    (o.spend = unt(o.spend, t.spend)),
    (o.roads = kB(o.roads, t.roads)),
    (o.boards = zB(o.boards, t.boards)),
    vnt(o, t));
  let a = (t.cash ||= { base: 0, baseT: 0, moves: 0, log: [] }),
    r = wnt(a),
    l = a.moves || 0,
    c = "g." + String(t.gid).slice(0, 40) + "." + l;
  if (
    r > 0.004 &&
    !(o.cash ||= { base: 0, baseT: 0, moves: 0, log: [] }).log.some(
      (h) => h.id === c,
    )
  ) {
    let h = Date.now();
    (o.cash.log.push({
      id: c,
      t: h,
      a: Go(r),
      why: "Guest progress added",
      k: "guest",
    }),
      c4(o.cash),
      a.log.push({
        id: "m." + String(t.gid).slice(0, 40) + "." + l,
        t: h,
        a: -Go(r),
        why: "Moved to your account",
        k: "moved",
      }),
      (a.moves = l + 1),
      c4(a),
      (n.cash = Go(r)),
      (i = !0));
  }
  return ((o.imported[t.gid] = s), (t.claimed = s), i ? n : null);
}
