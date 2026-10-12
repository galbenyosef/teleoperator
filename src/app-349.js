// app 349 — best
// Lines 170509-170697 of readable/app.pretty.js (statement-aligned).
function lM(i) {
  for (; i.log.length > wtt;) {
    let t = i.log.findIndex((s) => !s.pend);
    if (t < 0) break;
    let e = i.log.splice(t, 1)[0];
    ((i.base = Co(i.base + e.a)), (i.baseT = Math.max(i.baseT, e.t)));
  }
  return i;
}
var Mtt = (i) =>
    Co(
      (i?.base || 0) +
        (i?.log || []).reduce((t, e) => t + (e.pend ? 0 : e.a), 0),
    ),
  iyt = (i) => Co((i?.log || []).reduce((t, e) => t + (e.pend ? e.a : 0), 0));
function oyt(i, t) {
  if (!t) return i;
  if (!i) return t;
  let [e, s] =
      i.baseT > t.baseT || (i.baseT === t.baseT && i.base >= t.base)
        ? [i, t]
        : [t, i],
    n = new Map();
  for (let a of e.log) n.set(a.id, { ...a });
  for (let a of s.log) {
    if (a.t <= e.baseT && !n.has(a.id)) continue;
    let r = n.get(a.id);
    r
      ? r.pend && !a.pend && (delete r.pend, delete r.held, (r.rel = a.rel))
      : n.set(a.id, { ...a });
  }
  let o = [...n.values()].sort((a, r) => a.t - r.t || (a.id < r.id ? -1 : 1));
  return lM({
    base: e.base,
    baseT: e.baseT,
    moves: Math.max(i.moves || 0, t.moves || 0),
    log: o,
  });
}
function rh(i) {
  if (
    !i ||
    typeof i != "object" ||
    !(i.schemaVersion === 1 || i.schemaVersion === ctt)
  )
    return null;
  let t = Oz();
  for (let e of Jx) Hz(t, e, Go(Gu(i, e)));
  for (let e of [
    "taxi.rides",
    "race.played",
    "race.wins",
    "race.podiums",
    "police.escapes",
    "police.busts",
  ])
    Hz(t, e, Math.floor(Gu(t, e)));
  (i.schemaVersion === 1 &&
    (t.earned = Co(t.taxi.total + t.race.money + t.police.bounty)),
    (t.taxi.stars = (Array.isArray(i.taxi?.stars) ? i.taxi.stars : [])
      .map((e) => Math.round(+e))
      .filter((e) => e >= 1 && e <= 5)
      .slice(-200)));
  for (let [e, s] of Object.entries(Yx(i.race?.best)))
    Go(s) > 0 && String(e).length < 64 && (t.race.best[e] = Math.round(Go(s)));
  ((t.best.kmh = Go(i.best?.kmh, Ra.KMH)),
    (t.best.drift = Go(i.best?.drift, Ra.DRIFT)),
    (t.best.bounty = Go(i.best?.bounty, Ra.BOUNTY)),
    i.pos &&
      Number.isFinite(+i.pos.x) &&
      Number.isFinite(+i.pos.z) &&
      (t.pos = {
        x: +i.pos.x,
        z: +i.pos.z,
        psi: Number.isFinite(+i.pos.psi) ? +i.pos.psi : 0,
      }),
    typeof i.car == "string" && i.car.length < 40 && (t.car = i.car),
    typeof i.gid == "string" && i.gid.length <= 40 && (t.gid = i.gid),
    (t.custom = ftt(i.custom)),
    (t.ride = vl(i.ride)),
    (t.cars = cM(i.cars)),
    (t.builds = Dx(i.builds)),
    (t.spend = {
      pictures: Math.floor(Go(i.spend?.pictures, 1e7)),
      cars: Math.floor(Go(i.spend?.cars, 1e6)),
    }),
    (t.mine =
      typeof i.mine == "string" && /^b[0-9a-z]{1,16}$/.test(i.mine)
        ? i.mine
        : null),
    (t.roads = btt(i.roads)),
    (t.boards = xtt(i.boards)),
    (t.ch.runs = Math.floor(t.ch.runs)),
    (t.ch.best = vtt(i.ch?.best)),
    (t.settings = Yx(i.settings)),
    (t.claimed = i.claimed ? zF(i.claimed) : null));
  for (let [e, s] of Object.entries(Yx(i.imported)).slice(-50))
    t.imported[e] = zF(s);
  return ((t.cash = nyt(i.cash, i)), (t.updated = Go(i.updated, 1e15)), t);
}
function kp(i, t) {
  if (!t) return i;
  for (let e of Jx) Hz(i, e, Math.max(Go(Gu(i, e)), Go(Gu(t, e))));
  for (let e of htt) i.best[e] = Math.max(i.best[e] || 0, t.best?.[e] || 0);
  for (let [e, s] of Object.entries(t.race?.best || {}))
    (!i.race.best[e] || s < i.race.best[e]) && (i.race.best[e] = s);
  (t.taxi?.stars?.length || 0) > i.taxi.stars.length &&
    (i.taxi.stars = t.taxi.stars.slice(-200));
  for (let [e, s] of Object.entries(t.imported || {}))
    i.imported[e] = EF(i.imported[e], s);
  return (
    (i.claimed = EF(i.claimed, t.claimed)),
    gtt(i, t),
    (i.cars = ptt(i.cars, t.cars)),
    (i.builds = utt(i.builds, t.builds)),
    (i.spend = dtt(i.spend, t.spend)),
    (i.roads = TF(i.roads, t.roads)),
    (i.boards = AF(i.boards, t.boards)),
    ytt(i, t),
    (i.cash = oyt(i.cash, t.cash)),
    (t.updated || 0) > (i.updated || 0) &&
      (t.pos && (i.pos = t.pos),
      t.car &&
        ((i.car = t.car),
        t.ride && (i.ride = t.ride),
        (i.mine = t.mine || null)),
      t.settings && Object.keys(t.settings).length && (i.settings = t.settings),
      (i.updated = t.updated)),
    !i.gid && t.gid && (i.gid = t.gid),
    i
  );
}
function ltt(i, t) {
  if (!i || !t || !t.gid) return null;
  let e = EF(t.claimed, i.imported[t.gid]) || zF(null),
    s = Y5t(t),
    n = {},
    o = !1;
  for (let h of Jx) {
    let f = Math.max(0, s[h] - e[h]);
    ((n[h] = f), f > 0 && ((o = !0), Hz(i, h, Co(Go(Gu(i, h)) + f))));
  }
  for (let h of htt) i.best[h] = Math.max(i.best[h] || 0, t.best?.[h] || 0);
  for (let [h, f] of Object.entries(t.race?.best || {}))
    (!i.race.best[h] || f < i.race.best[h]) && (i.race.best[h] = f);
  (n["taxi.rides"] > 0 &&
    (i.taxi.stars = i.taxi.stars
      .concat((t.taxi.stars || []).slice(-Math.min(200, n["taxi.rides"])))
      .slice(-200)),
    gtt(i, t, !0),
    (i.cars = ptt(i.cars, t.cars)),
    (i.builds = utt(i.builds, t.builds)),
    (i.spend = dtt(i.spend, t.spend)),
    (i.roads = TF(i.roads, t.roads)),
    (i.boards = AF(i.boards, t.boards)),
    ytt(i, t));
  let a = (t.cash ||= { base: 0, baseT: 0, moves: 0, log: [] }),
    r = Mtt(a),
    l = a.moves || 0,
    c = "g." + String(t.gid).slice(0, 40) + "." + l;
  if (
    r > 0.004 &&
    !(i.cash ||= { base: 0, baseT: 0, moves: 0, log: [] }).log.some(
      (h) => h.id === c,
    )
  ) {
    let h = Date.now();
    (i.cash.log.push({
      id: c,
      t: h,
      a: Co(r),
      why: "Guest progress added",
      k: "guest",
    }),
      lM(i.cash),
      a.log.push({
        id: "m." + String(t.gid).slice(0, 40) + "." + l,
        t: h,
        a: -Co(r),
        why: "Moved to your account",
        k: "moved",
      }),
      (a.moves = l + 1),
      lM(a),
      (n.cash = Co(r)),
      (o = !0));
  }
  return ((i.imported[t.gid] = s), (t.claimed = s), o ? n : null);
}
