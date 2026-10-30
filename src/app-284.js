// app 284 — math
// Lines 139486-139736 of readable/app.pretty.js (statement-aligned).
function lv(o, t, e = null) {
  let s = TQ(o),
    n = new Set(),
    i = (u, d) => Math.round(u * 10) * 1e7 + Math.round(d * 10),
    a = 1e9,
    r = 1e9,
    l = -1e9,
    c = -1e9;
  for (let u of t) {
    if (!s.cells.has(Math.floor(u.x / s.C) * 100003 + Math.floor(u.z / s.C)))
      continue;
    let d = kQ.has(u.kind);
    (!d && !zQ.has(u.kind)) ||
      (wM(o, u.x, u.z, u.y, d ? 1.5 : 0.8) &&
        (n.add(i(u.x, u.z)),
        (a = Math.min(a, u.x)),
        (l = Math.max(l, u.x)),
        (r = Math.min(r, u.z)),
        (c = Math.max(c, u.z))));
  }
  if (!n.size) return 0;
  let h = (u, d) =>
      u >= a - 0.1 &&
      u <= l + 0.1 &&
      d >= r - 0.1 &&
      d <= c + 0.1 &&
      n.has(i(u, d)),
    f = (u, d) => {
      let p = 0;
      for (let m = 0; m < u.length; m++) d(u[m]) && (u[p++] = u[m]);
      u.length = p;
    };
  return (
    f(
      t,
      (u) =>
        !(
          h(u.x, u.z) &&
          (kQ.has(u.kind) || zQ.has(u.kind) || u.kind === "well")
        ),
    ),
    e && f(e, (u) => !(u.t === "circ" && u.r < 1 && h(u.x, u.z))),
    n.size
  );
}
var Fyt = new Set(["signal", "stop", "lamp", "hydrant"]),
  w_ = { moved: 0, dropped: 0, kinds: {} },
  $p = {
    n: 0,
    a: new Float32Array(7 * 4096),
    gen: 0,
    add(o, t, e, s, n, i, a) {
      if ((this.n + 1) * 7 > this.a.length) {
        let r = new Float32Array(this.a.length * 2);
        (r.set(this.a), (this.a = r));
      }
      (this.a.set([o, t, e, s, n, i, a], this.n * 7), this.n++, this.gen++);
    },
  };
function Oyt(o, t) {
  if (o.clearOfRoads(t.x, t.z, 0.12)) return !0;
  for (let e = 0.5; e <= 14; e += 0.5) {
    let s = Math.max(8, Math.round(e * 4));
    for (let n = 0; n < s; n++) {
      let i = (n * 2 * Math.PI) / s,
        a = t.x + e * Math.cos(i),
        r = t.z + e * Math.sin(i);
      if (!(o.surfaceAt(a, r) !== "walk" || !o.clearOfRoads(a, r, 0.3)))
        return (
          (t.x = a),
          (t.z = r),
          (t.y = o.driveHeight(a, r)),
          w_.moved++,
          (w_.kinds[t.kind] = (w_.kinds[t.kind] || 0) + 1),
          !0
        );
    }
  }
  return (w_.dropped++, !1);
}
var Byt = [
  null,
  "tree0",
  "tree1",
  "tree2",
  "palm",
  "fpalm",
  "qpalm",
  "cordyline",
  "wpalm",
];
function GF(o, t = null, e = null, s = null) {
  let n = o.props,
    i = [],
    a = [],
    r = {
      lamp: 0.18,
      tree: 0.25,
      hydrant: 0.2,
      stop: 0.16,
      signal: 0.16,
      palm: 0.45,
      ptree: 0.4,
    },
    l = o.claims?.pSkip;
  for (let c = s ? s.p0 : 0; c < (s ? s.p1 : n.n); c++) {
    if (l && l[c]) continue;
    let h = n.kinds[n.pk[c]],
      f = n.pf[c * 5],
      u = n.pf[c * 5 + 1],
      d = n.pf[c * 5 + 2],
      p = n.pf[c * 5 + 3],
      m = n.pf[c * 5 + 4],
      g = n.px[c];
    if (e?.tree < 1 && (h === "tree" || h === "ptree") && Fo(f, u, 23) > e.tree)
      continue;
    if (h === "car") {
      let v = e && Fo(f, u, 21) > e.car;
      if ((v && !e.carExtra) || (t && !Hyt(t, f, d, u, p, m))) continue;
      if (v) {
        $p.add(f, d, u, p, m, (g & 63) / 64 + 1 / 128, g >> 6);
        continue;
      }
      (i.push({
        kind: "car",
        x: f,
        y: d,
        z: u,
        rot: p,
        pitch: m,
        color: (g & 63) / 64 + 1 / 128,
        type: g >> 6,
      }),
        a.push({
          t: "obb",
          x: f,
          z: u,
          hx: 0.93,
          hz: 2.35,
          c: Math.cos(p),
          s: Math.sin(p),
          parked: !0,
          type: g >> 6,
          y0: d - 1.5,
          y1: d + 2.5,
        }));
      continue;
    }
    if (
      (h === "tree" && Di(f, u) === "chinatown" && Fo(f, u, 7) > 0.12) ||
      (Eh &&
        h === "ptree" &&
        (f < -7611 || u < -2600) &&
        t?.coverAt &&
        (t.coverAt(f, u) & 7) === 3) ||
      (Eh &&
        h === "ptree" &&
        f > -4150 &&
        f < -3560 &&
        u > -1440 &&
        u < -1135 &&
        Fo(f, u, 11) > 0.08)
    )
      continue;
    let b = {
      kind:
        h === "ptree"
          ? "tree"
          : h === "signal" && Eh && (f + 1065.2) ** 2 + (u - 551.2) ** 2 < 1024
            ? "signalp"
            : h,
      x: f,
      y: d,
      z: u,
      rot: p,
    };
    if (h === "tree") {
      b.scale = 0.7 + ((g & 255) / 255) * 0.5;
      let v = g >> 9;
      v && (b.sp = Byt[v]);
    }
    if (
      Eh &&
      h === "tree" &&
      t &&
      f > -2250 &&
      f < -700 &&
      Math.abs(u - 4815 - 0.07 * (f + 2400)) < 22 &&
      Fo(f, u, 9) < 0.6
    ) {
      let v = t.roadAt(f, u, 14);
      v &&
        (v.E.name === "24th Street" || v.E.name === "Mission Street") &&
        ((b.sp = "fpalm"), (b.scale = 1 + ((g & 255) / 255) * 0.35));
    } else
      h === "ptree"
        ? ((b.scale = (g & 256 ? 1 : 0.9) + ((g & 255) / 255) * 0.5),
          (b.sp = Iyt(f, u, g & 256)),
          (b.park = !0))
        : h === "palm" && (b.scale = 0.85 + (g / 255) * 0.3);
    (t && Fyt.has(h) && !Oyt(t, b)) ||
      (i.push(b),
      (h === "tree" || h === "palm") &&
        e?.well !== !1 &&
        i.push({
          kind: "well",
          x: f,
          y: d,
          z: u,
          rot: p,
          scale: h === "palm" ? 1.3 : 1,
        }),
      a.push({
        t: "circ",
        x: b.x,
        z: b.z,
        r: r[h] || 0.2,
        y0: b.y - 1.5,
        y1: b.y + 6,
      }));
  }
  return (
    t && Eh && Nyt(o, t, i, a, e, s || { b0: 0, b1: o.bld.n }),
    t && Eh && UF(t, i, a, !0, (c) => c.x < -7611 || c.z < -2600),
    lv(o, i, a),
    s
      ? _Q({ inst: i, colliders: a }, e)
      : (t && On("highways") && Dyt(o, t, i, a),
        t &&
          !(typeof location < "u" && /[?&]noclutter\b/.test(location.search)) &&
          uX(o, t, i, a),
        Eh && Yq(i),
        lv(o, i, a),
        _Q({ inst: i, colliders: a }, e))
  );
}
function _Q({ inst: o, colliders: t }, e) {
  if (e && e.meter < 1) {
    let s = new Set(),
      n = (a, r) => Math.round(a * 10) + "," + Math.round(r * 10),
      i = 0;
    for (let a of o)
      a.kind === "meter" && Fo(a.x, a.z, 22) > e.meter
        ? s.add(n(a.x, a.z))
        : (o[i++] = a);
    ((o.length = i), (i = 0));
    for (let a of t) (a.t === "circ" && s.has(n(a.x, a.z))) || (t[i++] = a);
    t.length = i;
  }
  return { inst: o, colliders: t };
}
