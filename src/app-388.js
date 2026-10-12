// app 388 — math
// Lines 191778-192093 of readable/app.pretty.js (statement-aligned).
var Uwt = {
    race: 2600,
    police: 2400,
    taxi: 1e3,
    food: 950,
    courier: 1100,
    vip: 1050,
    trial: 950,
    drift: 850,
    trap: 500,
    zone: 700,
    jump: 650,
    nearmiss: 850,
    photo: 600,
    collect: 0,
  },
  uN = [0, 1, 4, 7.4],
  Gwt = [0, 1, 3.2, 5.3],
  Wwt = {
    steady: [0, 0.7, 0.85, 1],
    skill: [0, 0.5, 0.75, 1],
    risky: [0, 0.45, 0.75, 1],
  },
  FE = [1, 0.6, 0.4, 0.3, 0.25],
  dN = 1.75,
  qwt = 8,
  jwt = 120,
  Vwt = 250,
  $wt = 14e3,
  Ip = (i = Date.now()) => Math.floor(i / 864e5),
  Xwt = (i) => (i.cat === "speed" ? i.kind || "trap" : i.cat),
  Kwt = (i) => (xi[i.cat]?.family === "risky" ? Gwt : uN)[i.tier || 1],
  Aet = (i, t) =>
    Math.round(
      Uwt[Xwt(i)] *
        Kwt(i) *
        Wwt[xi[i.cat]?.family || "skill"][Math.max(0, Math.min(3, t))],
    );
function pN(
  i,
  t,
  e = null,
  { featured: s = !1, care: n = null, today: o = Ip() } = {},
) {
  if (!(t > 0)) return { cash: 0, xp: 0, lines: [], first: !1 };
  let a = !e || !(e.n > 0),
    r = e?.s || 0,
    l = (e && e.d === o && e.k) || 0,
    c = Aet(i, t),
    h = [[`${"\u2605".repeat(t)} ${xi[i.cat]?.label || i.cat}`, c]],
    f = c;
  if (!a) {
    let d = Math.round(c * FE[Math.min(FE.length - 1, l)]),
      p = t > r ? c - Math.round(Aet(i, r) * 0.5) : 0;
    ((f = Math.max(d, p)),
      f < c &&
        h.push([
          p >= d && p > 0
            ? "New stars \xB7 the improvement"
            : `Repeat today \xD7${FE[Math.min(FE.length - 1, l)]}`,
          f - c,
        ]));
  }
  if (n != null) {
    let d = Math.round(f * 0.2 * Math.max(0, Math.min(1, (n - 0.5) / 0.5)));
    d > 0 &&
      (h.push([n >= 0.95 ? "Spotless \xB7 careful bonus" : "Careful bonus", d]),
      (f += d));
  }
  if (s) {
    let d = Math.round(f * (dN - 1));
    (h.push(["Featured today", d]), (f += d));
  }
  f = Math.min($wt, Math.round(f / 5) * 5);
  let u = Math.round(
    (jwt * uN[i.tier || 1] * t + (a ? Vwt * uN[i.tier || 1] : 0)) /
      (i.tier === 3 ? 2 : 1),
  );
  return { cash: f, xp: u, lines: h, first: a };
}
function Ret(i, t, e, s, n = Ip()) {
  let o = i ? { ...i } : { s: 0, v: 0, q: -1e9, n: 0, d: n, k: 0 };
  return (
    t > 0 &&
      ((o.n = (o.n || 0) + 1),
      (o.k = o.d === n ? (o.k || 0) + 1 : 1),
      (o.d = n)),
    (t > (o.s || 0) || (t === o.s && s > (o.q ?? -1e9))) &&
      ((o.s = t), (o.v = e), (o.q = s)),
    o
  );
}
function mN(i, t = Ip()) {
  let e = (t * 2654435761) % 2147483647 || 1,
    s = () => (e = (e * 16807) % 2147483647) / 2147483647,
    n = i
      .filter((l) => l.cat !== "collect")
      .map((l) => l.id)
      .sort(),
    o = new Set(),
    a = {};
  for (let l = n.length - 1; l > 0; l--) {
    let c = Math.floor(s() * (l + 1));
    [n[l], n[c]] = [n[c], n[l]];
  }
  let r = Object.fromEntries(i.map((l) => [l.id, l.cat]));
  for (let l of n) {
    if (o.size >= qwt) break;
    let c = r[l];
    (a[c] || 0) >= 2 || ((a[c] = (a[c] || 0) + 1), o.add(l));
  }
  return o;
}
function Pet(i, t, e, s = Ip()) {
  return pN(i, 3, t && t.s >= 3 ? t : t ? { ...t, s: 0 } : null, {
    featured: e,
    today: s,
  }).cash;
}
as();
var NE = class {
  constructor(t, e, s) {
    (Object.assign(this, s),
      (this.group = new ke()),
      (this.group.name = "Challenges"),
      (this.items = []),
      (this.beacons = new vf(this.group, "ChallengeBeacons")));
    let n = new J0(5.2, 6.6, 40),
      o = new fr(5.2, 40);
    for (let r of e) {
      let l = r.spot?.x ?? r.x,
        c = r.spot?.z ?? r.z,
        h = Number.isFinite(r.spot?.y)
          ? r.spot.y
          : Number.isFinite(r.y)
            ? r.y
            : this.groundY(l, c),
        f = new $t(xi[r.cat].col),
        u = !r.gates,
        d = u
          ? new _e(
              n,
              new ln({
                color: f.clone().multiplyScalar(1.7),
                transparent: !0,
                opacity: 0.75,
                depthWrite: !1,
                side: Ss,
                fog: !1,
              }),
            )
          : null,
        p = u
          ? new _e(
              o,
              new ln({
                color: f,
                transparent: !0,
                opacity: 0.16,
                depthWrite: !1,
                side: Ss,
                fog: !1,
              }),
            )
          : null;
      for (let x of [d, p])
        x &&
          ((x.rotation.x = -Math.PI / 2),
          x.position.set(l, h + 0.07, c),
          (x.renderOrder = 3));
      let m = [];
      for (let x of r.gates || []) {
        let v = new _e(
          new $n(r.hw * 2, 1.2),
          new ln({
            color: f.clone().multiplyScalar(1.6),
            transparent: !0,
            opacity: 0.5,
            depthWrite: !1,
            side: Ss,
            fog: !1,
          }),
        );
        (v.rotation.set(-Math.PI / 2, Math.atan2(x.dir[0], x.dir[1]), 0, "YXZ"),
          v.position.set(
            x.x,
            (Number.isFinite(x.y) ? x.y : this.groundY(x.x, x.z)) + 0.06,
            x.z,
          ),
          (v.renderOrder = 3),
          m.push(v));
      }
      for (let x of [d, p, ...m])
        x &&
          ((x.userData.mbNoReflect = !0),
          (x.castShadow = x.receiveShadow = !1),
          (x.frustumCulled = !1),
          (x.visible = !1),
          this.group.add(x));
      let g = this.rec?.(r.id)?.s || 0,
        b = this.beacons.add({
          cid: r.id,
          x: l,
          y: h,
          z: c,
          kind: Zm(r.cat, r.kind),
          col: xi[r.cat].col,
          stars: [g, 3],
          h: this.featured?.(r.id) ? 120 : 80,
          lift: r.cat === "jump" ? 4 : 6,
        });
      this.items.push({
        d: r,
        x: l,
        y: h,
        z: c,
        r: d,
        f: p,
        bands: m,
        b,
        st: g,
      });
    }
    let a = new ks(3.2, 3.2, 70, 24, 1, !0);
    (a.translate(0, 35, 0),
      (this.beam = new _e(
        a,
        new ln({
          color: 16777215,
          transparent: !0,
          opacity: 0.3,
          depthWrite: !1,
          side: Ss,
          fog: !1,
          blending: da,
        }),
      )),
      (this.beam2 = new _e(a, this.beam.material.clone())),
      (this.beam2.material.opacity = 0.12),
      (this.tRing = new _e(
        new J0(4.6, 6.2, 40),
        new ln({
          color: 16777215,
          transparent: !0,
          opacity: 0.85,
          depthWrite: !1,
          side: Ss,
          fog: !1,
        }),
      )),
      (this.tRing.rotation.x = -Math.PI / 2));
    for (let r of [this.beam, this.beam2, this.tRing])
      ((r.visible = !1),
        (r.userData.mbNoReflect = !0),
        (r.frustumCulled = !1),
        (r.renderOrder = 4),
        this.group.add(r));
    t.add(this.group);
  }
  update(
    t,
    { active: e = null, target: s = null, hide: n = !1, vis: o = null } = {},
  ) {
    let a = t.position.x,
      r = t.position.z;
    for (let c of this.items) {
      let { d: h, x: f, z: u, r: d, f: p, bands: m, b: g } = c,
        b = !n && (!o || o(h)) && e !== h,
        x = Math.hypot(f - a, u - r),
        v = this.rec?.(h.id)?.s || 0;
      if (
        (v !== c.st && ((c.st = v), this.beacons.setStars(g, v)),
        this.beacons.show(g, b),
        d)
      ) {
        let y = b
          ? Math.min(1, Math.max(0, (160 - x) / 60)) * (e ? 0.2 : 1)
          : 0;
        ((d.material.opacity = 0.75 * y),
          (p.material.opacity = 0.16 * y),
          (d.visible = p.visible = y > 0.02),
          d.visible && (d.updateMatrixWorld(), p.updateMatrixWorld()));
      }
      for (let y of m)
        ((y.visible =
          b && Math.hypot(y.position.x - a, y.position.z - r) < 300),
          y.visible && y.updateMatrixWorld());
    }
    this.beacons.update(t, e ? () => 0.3 : null);
    let l = !n && s;
    if (
      ((this.beam.visible = this.beam2.visible = this.tRing.visible = !!l), l)
    ) {
      let c = new $t(xi[e?.cat]?.col || "#fff"),
        h = this.groundY(l.x, l.z),
        f = Math.hypot(l.x - a, l.z - r);
      (this.beam.material.color.copy(c),
        this.beam.position.set(l.x, h, l.z),
        (this.beam.material.opacity =
          0.32 * Math.min(1, Math.max(0.3, f / 120))),
        this.beam.updateMatrixWorld(),
        this.tRing.material.color.copy(c).multiplyScalar(1.6),
        this.tRing.position.set(l.x, h + 0.08, l.z),
        this.tRing.updateMatrixWorld(),
        l.next
          ? (this.beam2.material.color.copy(c),
            this.beam2.position.set(
              l.next.x,
              this.groundY(l.next.x, l.next.z),
              l.next.z,
            ),
            this.beam2.updateMatrixWorld())
          : (this.beam2.visible = !1));
    }
  }
};
