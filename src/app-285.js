// app 285 — math
// Lines 139213-139460 of readable/app.pretty.js (statement-aligned).
function Mx(i, t, e = null) {
  let s = _J(i),
    n = new Set(),
    o = (u, d) => Math.round(u * 10) * 1e7 + Math.round(d * 10),
    a = 1e9,
    r = 1e9,
    l = -1e9,
    c = -1e9;
  for (let u of t) {
    if (!s.cells.has(Math.floor(u.x / s.C) * 100003 + Math.floor(u.z / s.C)))
      continue;
    let d = wJ.has(u.kind);
    (!d && !MJ.has(u.kind)) ||
      (zw(i, u.x, u.z, u.y, d ? 1.5 : 0.8) &&
        (n.add(o(u.x, u.z)),
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
      n.has(o(u, d)),
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
          (wJ.has(u.kind) || MJ.has(u.kind) || u.kind === "well")
        ),
    ),
    e && f(e, (u) => !(u.t === "circ" && u.r < 1 && h(u.x, u.z))),
    n.size
  );
}
var hxt = new Set(["signal", "stop", "lamp", "hydrant"]),
  w_ = { moved: 0, dropped: 0, kinds: {} },
  mp = {
    n: 0,
    a: new Float32Array(7 * 4096),
    gen: 0,
    add(i, t, e, s, n, o, a) {
      if ((this.n + 1) * 7 > this.a.length) {
        let r = new Float32Array(this.a.length * 2);
        (r.set(this.a), (this.a = r));
      }
      (this.a.set([i, t, e, s, n, o, a], this.n * 7), this.n++, this.gen++);
    },
  };
function fxt(i, t) {
  if (i.clearOfRoads(t.x, t.z, 0.12)) return !0;
  for (let e = 0.5; e <= 14; e += 0.5) {
    let s = Math.max(8, Math.round(e * 4));
    for (let n = 0; n < s; n++) {
      let o = (n * 2 * Math.PI) / s,
        a = t.x + e * Math.cos(o),
        r = t.z + e * Math.sin(o);
      if (!(i.surfaceAt(a, r) !== "walk" || !i.clearOfRoads(a, r, 0.3)))
        return (
          (t.x = a),
          (t.z = r),
          (t.y = i.driveHeight(a, r)),
          w_.moved++,
          (w_.kinds[t.kind] = (w_.kinds[t.kind] || 0) + 1),
          !0
        );
    }
  }
  return (w_.dropped++, !1);
}
var uxt = [
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
function uI(i, t = null, e = null, s = null) {
  let n = i.props,
    o = [],
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
    l = i.claims?.pSkip;
  for (let c = s ? s.p0 : 0; c < (s ? s.p1 : n.n); c++) {
    if (l && l[c]) continue;
    let h = n.kinds[n.pk[c]],
      f = n.pf[c * 5],
      u = n.pf[c * 5 + 1],
      d = n.pf[c * 5 + 2],
      p = n.pf[c * 5 + 3],
      m = n.pf[c * 5 + 4],
      g = n.px[c];
    if (e?.tree < 1 && (h === "tree" || h === "ptree") && ko(f, u, 23) > e.tree)
      continue;
    if (h === "car") {
      let x = e && ko(f, u, 21) > e.car;
      if ((x && !e.carExtra) || (t && !pxt(t, f, d, u, p, m))) continue;
      if (x) {
        mp.add(f, d, u, p, m, (g & 63) / 64 + 1 / 128, g >> 6);
        continue;
      }
      (o.push({
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
      (h === "tree" && Ai(f, u) === "chinatown" && ko(f, u, 7) > 0.12) ||
      (h === "ptree" &&
        (f < -7611 || u < -2600) &&
        t?.coverAt &&
        (t.coverAt(f, u) & 7) === 3) ||
      (h === "ptree" &&
        f > -4150 &&
        f < -3560 &&
        u > -1440 &&
        u < -1135 &&
        ko(f, u, 11) > 0.08)
    )
      continue;
    let b = {
      kind:
        h === "ptree"
          ? "tree"
          : h === "signal" && (f + 1065.2) ** 2 + (u - 551.2) ** 2 < 1024
            ? "signalp"
            : h,
      x: f,
      y: d,
      z: u,
      rot: p,
    };
    if (h === "tree") {
      b.scale = 0.7 + ((g & 255) / 255) * 0.5;
      let x = g >> 9;
      x && (b.sp = uxt[x]);
    }
    if (
      h === "tree" &&
      t &&
      f > -2250 &&
      f < -700 &&
      Math.abs(u - 4815 - 0.07 * (f + 2400)) < 22 &&
      ko(f, u, 9) < 0.6
    ) {
      let x = t.roadAt(f, u, 14);
      x &&
        (x.E.name === "24th Street" || x.E.name === "Mission Street") &&
        ((b.sp = "fpalm"), (b.scale = 1 + ((g & 255) / 255) * 0.35));
    } else
      h === "ptree"
        ? ((b.scale = (g & 256 ? 1 : 0.9) + ((g & 255) / 255) * 0.5),
          (b.sp = cxt(f, u, g & 256)),
          (b.park = !0))
        : h === "palm" && (b.scale = 0.85 + (g / 255) * 0.3);
    (t && hxt.has(h) && !fxt(t, b)) ||
      (o.push(b),
      (h === "tree" || h === "palm") &&
        e?.well !== !1 &&
        o.push({
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
    t && dxt(i, t, o, a, e, s || { b0: 0, b1: i.bld.n }),
    t && fI(t, o, a, !0, (c) => c.x < -7611 || c.z < -2600),
    Mx(i, o, a),
    s
      ? SJ({ inst: o, colliders: a }, e)
      : (t && mxt(i, t, o, a),
        t &&
          !(typeof location < "u" && /[?&]noclutter\b/.test(location.search)) &&
          cV(i, t, o, a),
        XW(o),
        Mx(i, o, a),
        SJ({ inst: o, colliders: a }, e))
  );
}
function SJ({ inst: i, colliders: t }, e) {
  if (e && e.meter < 1) {
    let s = new Set(),
      n = (a, r) => Math.round(a * 10) + "," + Math.round(r * 10),
      o = 0;
    for (let a of i)
      a.kind === "meter" && ko(a.x, a.z, 22) > e.meter
        ? s.add(n(a.x, a.z))
        : (i[o++] = a);
    ((i.length = o), (o = 0));
    for (let a of t) (a.t === "circ" && s.has(n(a.x, a.z))) || (t[o++] = a);
    t.length = o;
  }
  return { inst: i, colliders: t };
}
