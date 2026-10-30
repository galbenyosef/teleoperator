// app 405 — math
// Lines 199607-199922 of readable/app.pretty.js (statement-aligned).
var CSt = {
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
  dN = [0, 1, 4, 7.4],
  LSt = [0, 1, 3.2, 5.3],
  ISt = {
    steady: [0, 0.7, 0.85, 1],
    skill: [0, 0.5, 0.75, 1],
    risky: [0, 0.45, 0.75, 1],
  },
  s9 = [1, 0.6, 0.4, 0.3, 0.25],
  pN = 1.75,
  FSt = 8,
  OSt = 120,
  BSt = 250,
  NSt = 14e3,
  g1 = (o = Date.now()) => Math.floor(o / 864e5),
  HSt = (o) => (o.cat === "speed" ? o.kind || "trap" : o.cat),
  DSt = (o) => (Li[o.cat]?.family === "risky" ? LSt : dN)[o.tier || 1],
  Uit = (o, t) =>
    Math.round(
      CSt[HSt(o)] *
        DSt(o) *
        ISt[Li[o.cat]?.family || "skill"][Math.max(0, Math.min(3, t))],
    );
function mN(
  o,
  t,
  e = null,
  { featured: s = !1, care: n = null, today: i = g1() } = {},
) {
  if (!(t > 0)) return { cash: 0, xp: 0, lines: [], first: !1 };
  let a = !e || !(e.n > 0),
    r = e?.s || 0,
    l = (e && e.d === i && e.k) || 0,
    c = Uit(o, t),
    h = [[`${"\u2605".repeat(t)} ${Li[o.cat]?.label || o.cat}`, c]],
    f = c;
  if (!a) {
    let d = Math.round(c * s9[Math.min(s9.length - 1, l)]),
      p = t > r ? c - Math.round(Uit(o, r) * 0.5) : 0;
    ((f = Math.max(d, p)),
      f < c &&
        h.push([
          p >= d && p > 0
            ? "New stars \xB7 the improvement"
            : `Repeat today \xD7${s9[Math.min(s9.length - 1, l)]}`,
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
    let d = Math.round(f * (pN - 1));
    (h.push(["Featured today", d]), (f += d));
  }
  f = Math.min(NSt, Math.round(f / 5) * 5);
  let u = Math.round(
    (OSt * dN[o.tier || 1] * t + (a ? BSt * dN[o.tier || 1] : 0)) /
      (o.tier === 3 ? 2 : 1),
  );
  return { cash: f, xp: u, lines: h, first: a };
}
function Git(o, t, e, s, n = g1()) {
  let i = o ? { ...o } : { s: 0, v: 0, q: -1e9, n: 0, d: n, k: 0 };
  return (
    t > 0 &&
      ((i.n = (i.n || 0) + 1),
      (i.k = i.d === n ? (i.k || 0) + 1 : 1),
      (i.d = n)),
    (t > (i.s || 0) || (t === i.s && s > (i.q ?? -1e9))) &&
      ((i.s = t), (i.v = e), (i.q = s)),
    i
  );
}
function gN(o, t = g1()) {
  let e = (t * 2654435761) % 2147483647 || 1,
    s = () => (e = (e * 16807) % 2147483647) / 2147483647,
    n = o
      .filter((l) => l.cat !== "collect")
      .map((l) => l.id)
      .sort(),
    i = new Set(),
    a = {};
  for (let l = n.length - 1; l > 0; l--) {
    let c = Math.floor(s() * (l + 1));
    [n[l], n[c]] = [n[c], n[l]];
  }
  let r = Object.fromEntries(o.map((l) => [l.id, l.cat]));
  for (let l of n) {
    if (i.size >= FSt) break;
    let c = r[l];
    (a[c] || 0) >= 2 || ((a[c] = (a[c] || 0) + 1), i.add(l));
  }
  return i;
}
function Vit(o, t, e, s = g1()) {
  return mN(o, 3, t && t.s >= 3 ? t : t ? { ...t, s: 0 } : null, {
    featured: e,
    today: s,
  }).cash;
}
es();
var n9 = class {
  constructor(t, e, s) {
    (Object.assign(this, s),
      (this.group = new le()),
      (this.group.name = "Challenges"),
      (this.items = []),
      (this.beacons = new Qf(this.group, "ChallengeBeacons")));
    let n = new v0(5.2, 6.6, 40),
      i = new da(5.2, 40);
    for (let r of e) {
      let l = r.spot?.x ?? r.x,
        c = r.spot?.z ?? r.z,
        h = Number.isFinite(r.spot?.y)
          ? r.spot.y
          : Number.isFinite(r.y)
            ? r.y
            : this.groundY(l, c),
        f = new It(Li[r.cat].col),
        u = !r.gates,
        d = u
          ? new ye(
              n,
              new Ys({
                color: f.clone().multiplyScalar(1.7),
                transparent: !0,
                opacity: 0.75,
                depthWrite: !1,
                side: ls,
                fog: !1,
              }),
            )
          : null,
        p = u
          ? new ye(
              i,
              new Ys({
                color: f,
                transparent: !0,
                opacity: 0.16,
                depthWrite: !1,
                side: ls,
                fog: !1,
              }),
            )
          : null;
      for (let v of [d, p])
        v &&
          ((v.rotation.x = -Math.PI / 2),
          v.position.set(l, h + 0.07, c),
          (v.renderOrder = 3));
      let m = [];
      for (let v of r.gates || []) {
        let x = new ye(
          new Yn(r.hw * 2, 1.2),
          new Ys({
            color: f.clone().multiplyScalar(1.6),
            transparent: !0,
            opacity: 0.5,
            depthWrite: !1,
            side: ls,
            fog: !1,
          }),
        );
        (x.rotation.set(-Math.PI / 2, Math.atan2(v.dir[0], v.dir[1]), 0, "YXZ"),
          x.position.set(
            v.x,
            (Number.isFinite(v.y) ? v.y : this.groundY(v.x, v.z)) + 0.06,
            v.z,
          ),
          (x.renderOrder = 3),
          m.push(x));
      }
      for (let v of [d, p, ...m])
        v &&
          ((v.userData.mbNoReflect = !0),
          (v.castShadow = v.receiveShadow = !1),
          (v.frustumCulled = !1),
          (v.visible = !1),
          this.group.add(v));
      let g = this.rec?.(r.id)?.s || 0,
        b = this.beacons.add({
          cid: r.id,
          x: l,
          y: h,
          z: c,
          kind: G2(r.cat, r.kind),
          col: Li[r.cat].col,
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
    let a = new vs(3.2, 3.2, 70, 24, 1, !0);
    (a.translate(0, 35, 0),
      (this.beam = new ye(
        a,
        new Ys({
          color: 16777215,
          transparent: !0,
          opacity: 0.3,
          depthWrite: !1,
          side: ls,
          fog: !1,
          blending: $o,
        }),
      )),
      (this.beam2 = new ye(a, this.beam.material.clone())),
      (this.beam2.material.opacity = 0.12),
      (this.tRing = new ye(
        new v0(4.6, 6.2, 40),
        new Ys({
          color: 16777215,
          transparent: !0,
          opacity: 0.85,
          depthWrite: !1,
          side: ls,
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
    { active: e = null, target: s = null, hide: n = !1, vis: i = null } = {},
  ) {
    let a = t.position.x,
      r = t.position.z;
    for (let c of this.items) {
      let { d: h, x: f, z: u, r: d, f: p, bands: m, b: g } = c,
        b = !n && (!i || i(h)) && e !== h,
        v = Math.hypot(f - a, u - r),
        x = this.rec?.(h.id)?.s || 0;
      if (
        (x !== c.st && ((c.st = x), this.beacons.setStars(g, x)),
        this.beacons.show(g, b),
        d)
      ) {
        let y = b
          ? Math.min(1, Math.max(0, (160 - v) / 60)) * (e ? 0.2 : 1)
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
      let c = new It(Li[e?.cat]?.col || "#fff"),
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
