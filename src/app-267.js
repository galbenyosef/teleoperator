// app 267 — geo
// Lines 134189-134525 of readable/app.pretty.js (statement-aligned).
function AZ(o, t) {
  RZ(o);
  let e = o.attributes.position,
    s = new Uint32Array(e.array.buffer, e.array.byteOffset, e.array.length),
    n = new Uint8Array(e.count);
  for (let i = 0; i < e.count; i++) n[i] = s[i * 3] & 7;
  o.scale(...t);
  for (let i = 0; i < e.count; i++) s[i * 3] = (s[i * 3] & -8) | n[i];
}
var MZ = ["sedan", "hatch", "suv", "pickup", "van"],
  N3t = ["taxi", "bus"],
  H3t = { bus: 1, cablecar: 1, waymo: 1 },
  PZ = { bus: 1, cablecar: 1 },
  CZ = { bus: [0.74, 1, 1] },
  D3t = [
    ["#d2d2cf", 6],
    ["#cdcac2", 2],
    ["#aeb2b6", 5],
    ["#8e9297", 4],
    ["#5a5e63", 4],
    ["#3b3e42", 3],
    ["#151618", 6],
    ["#0d0e10", 2],
    ["#1c2f52", 2],
    ["#141d33", 1.5],
    ["#3a5a82", 1],
    ["#7c1518", 1.5],
    ["#4e1115", 1],
    ["#23392c", 1],
    ["#b8ad96", 1],
    ["#4a3b2f", 0.5],
  ],
  _h = [];
for (let [o, t] of D3t) for (let e = 0; e < t * 2; e++) _h.push(new It(o));
var Yx = new It(1, 1, 1);
function Jx(o) {
  let t = Math.abs(Math.sin(o.x * 12.9898 + o.z * 78.233) * 43758.5453) % 1,
    e = ["sedan", "hatch", "suv", "van"][o.type] || "sedan";
  return e === "sedan" && t < 0.22 ? "pickup" : e;
}
var u_ = (o) => _h[Math.floor(o * _h.length) % _h.length],
  LZ = {
    police: 2200,
    sedan: 1500,
    hatch: 1300,
    suv: 2100,
    pickup: 2200,
    van: 2400,
    taxi: 1600,
    bus: 13e3,
    cablecar: 7e3,
    waymo: 2200,
    boxtruck: 7500,
    stepvan: 4500,
    garbage: 14e3,
    semi: 16e3,
    moto: 250,
  };
for (let o = 0; o < 4; o++) LZ["streetcar" + o] = 17e3;
var vc = (o) => LZ[o] || 1500,
  IZ = ["sedan", "hatch", "suv", "van"];
function vF(o, t, e = !0) {
  let s = (i, a) => Math.round(i * 100) * 4e6 + Math.round(a * 100),
    n = new Map();
  for (let i of o) i.kind === "car" && n.set(s(i.x, i.z), i);
  for (let i of t) {
    if (!i.parked) continue;
    let a = n.get(s(i.x, i.z));
    if (a && ((i.p = a), (i.kind = Jx(a)), e)) {
      let r = Io[i.kind];
      ((i.hx = r.bw / 2), (i.hz = r.L / 2));
    }
  }
}
var FZ = (o) => {
  for (let t of Object.keys(o.attributes))
    ["position", "normal", "uv"].includes(t) || o.deleteAttribute(t);
  return (o.computeBoundingSphere(), o);
};
function OZ(o, t) {
  let e = ro[o] && t.index ? t.toNonIndexed() : t,
    s = e.attributes.position,
    n = e.attributes.normal,
    i = Io[o],
    a = new Float32Array(s.count * 4);
  for (let r = 0; r < s.count; r++) {
    let l = Math.abs(s.getX(r)),
      c = s.getY(r),
      h = s.getZ(r),
      f =
        !PZ[o] &&
        h > i.L / 2 - 0.55 &&
        (!n || n.getZ(r) > 0.25) &&
        c > 0.5 &&
        c < 1.08 &&
        l > i.bw * 0.2 &&
        l < i.bw / 2 + 0.02;
    ((a[r * 4] = a[r * 4 + 1] = a[r * 4 + 2] = 1),
      (a[r * 4 + 3] = f ? 0.25 : 1));
  }
  if (ro[o])
    for (let r = 0; r < s.count; r++)
      O3t(ro[o], s.getX(r), s.getY(r), s.getZ(r), 0.03) && (a[r * 4 + 3] = 1.5);
  return (e.setAttribute("color", new Te(a, 4)), e);
}
var BZ = (o, t) => async (e) => {
    let s = await o.parseAsync(await bo(t + e), t),
      n = null;
    if (
      (s.scene.traverse((i) => {
        i.isMesh && !n && (n = i);
      }),
      !n)
    )
      throw new Error(e + ": no mesh");
    return (RZ(n.geometry), n);
  },
  NZ = () => {
    try {
      return new URLSearchParams(location.search).has("oldwheels");
    } catch {
      return !1;
    }
  },
  gF = new WeakMap(),
  HZ = (o) => {
    let t = (n) => {
        let i = G3t(n);
        return q3t(dM(i, X3t(i)), W3t());
      },
      e = t(o.geo),
      s = o.geo1 && o.geo1 !== o.geo ? t(o.geo1) : o.geo1 ? e : null;
    return [e, s];
  };
function bF(o, t, e) {
  if (
    NZ() ||
    !Qz[o] ||
    !ro[o] ||
    Object.values(d2[o] || {}).some((n) => n.bad)
  ) {
    ((t.geo = e), (t.geoP = void 0));
    return;
  }
  let s = !globalThis.SF_LITE;
  ((t.geo = qI(e, WI(o, ro[o], s ? 0 : 2), ro[o])),
    (t.geoP = s ? qI(e, WI(o, ro[o], 1), ro[o]) : t.geo));
}
async function DZ(o = "assets/cars/", { late: t = !1 } = {}) {
  try {
    let e = new va(),
      s = BZ(e, o),
      n = {},
      i = [],
      a = bo($x + "waymo_traffic.glb");
    (a.catch(() => {}),
      await Promise.all(
        I3t.map(async (r) => {
          let l = MZ.includes(r) || N3t.includes(r),
            c = (!!globalThis.SF_LITE || t) && l;
          c && !globalThis.SF_LITE && i.push(r);
          let [h, f] = await Promise.all([
              c ? null : s(r + ".glb"),
              l ? s(r + "_lod1.glb") : null,
            ]),
            u = (h || f).material,
            d = new me({
              color: 16777215,
              map: u.map,
              roughness: 1,
              metalness: 0,
              side: ls,
              vertexColors: !0,
            });
          ((d.userData.mbAlbedo = Dx),
            (d.userData.mbTrafficFallback = !0),
            (u.metalnessMap || u.roughnessMap) &&
              (d.userData.mbExtraMap = u.metalnessMap || u.roughnessMap),
            (d.userData.carLamps = !PZ[r]),
            (d.userData.masked = !!F3t[r]),
            (d.name = "car_" + r),
            ro[r] && (d.userData.mbWheels = uF(ro[r])),
            u.map && (u.map.anisotropy = 8));
          let p = FZ,
            m = (v) => OZ(r, v),
            g = CZ[r];
          if (g)
            for (let v of [h, f])
              v && (AZ(v.geometry, g), v.geometry.computeBoundingSphere());
          let b = f ? m(p(f.geometry)) : null;
          if (
            ((n[r] = {
              geo: h ? m(p(h.geometry)) : b,
              geo1: b,
              geo2: f && MZ.includes(r) ? K3t(r) : null,
              mat: d,
              livery: !!H3t[r],
              V: Io[r],
            }),
            r === "bus")
          ) {
            for (let v of h ? ["geo", "geo1"] : ["geo"])
              n.bus[v] && (n.bus[v] = dM(n.bus[v], VZ(n.bus.geo)));
            h || (n.bus.geo1 = n.bus.geo);
          }
        }),
      ));
    try {
      let r = await e.parseAsync(await a, $x),
        l = {};
      r.scene.traverse((d) => {
        d.isMesh && (l[d.name] = d.geometry);
      });
      let c = new me({
        color: 16777215,
        map: h_("waymo_albedo.webp", !0),
        roughness: 1,
        metalness: 0,
        side: ls,
        vertexColors: !0,
      });
      ((c.userData.mbAlbedo = Dx),
        (c.userData.mbTrafficFallback = !0),
        (c.userData.mbExtraMap = h_("waymo_orm.webp", !1)),
        (c.userData.carLamps = !0),
        (c.userData.waymo = !0),
        (c.name = "car_waymo"),
        (c.userData.mbWheels = uF(ro.waymo)));
      let h = "waymo",
        f = Io.waymo,
        u = (d) => {
          let p = d.attributes.position,
            m = d.attributes.normal,
            g = new Float32Array(p.count * 4);
          for (let b = 0; b < p.count; b++) {
            let v = Math.abs(p.getX(b)),
              x = p.getY(b),
              y = p.getZ(b);
            ((g[b * 4] = g[b * 4 + 1] = g[b * 4 + 2] = 1),
              (g[b * 4 + 3] =
                y > f.L / 2 - 0.45 &&
                m.getZ(b) > 0.25 &&
                x > 0.6 &&
                x < 0.95 &&
                v > 0.45 &&
                v < f.bw / 2 + 0.02
                  ? 0.25
                  : 1));
          }
          return (
            d.setAttribute("color", new Te(g, 4)),
            d.computeBoundingSphere(),
            B3t(d, ro.waymo)
          );
        };
      n[h] = {
        geo: u(l.LOD0.index ? l.LOD0.toNonIndexed() : l.LOD0),
        geo1: l.LOD1 ? u(l.LOD1.index ? l.LOD1.toNonIndexed() : l.LOD1) : null,
        geo2: null,
        mat: c,
        livery: !0,
        V: f,
      };
    } catch (r) {
      (console.warn("the Waymo: the SUV with a sensor kit instead", r),
        n.suv &&
          (n.waymo = {
            geo: dM(n.suv.geo, kZ()),
            geo1: n.suv.geo1 ? dM(n.suv.geo1, kZ()) : null,
            geo2: null,
            mat: n.suv.mat,
            livery: !0,
            V: { ...Io.suv, H: Io.suv.H + 0.42 },
          }));
    }
    if (n.suv) {
      let r = n.suv,
        l = "police",
        c = new me({
          color: 16777215,
          map: r.mat.map,
          roughness: 1,
          metalness: 0,
          side: ls,
          vertexColors: !0,
        });
      ((c.userData = {
        ...r.mat.userData,
        mbAlbedo: L3t,
        mbWheels: uF(ro.police),
      }),
        (c.name = "car_" + l));
      let [h, f] = HZ(r);
      n[l] = { geo: h, geo1: f, geo2: null, mat: c, livery: !1, V: Io[l] };
    }
    for (let [r, l] of Object.entries(n)) {
      if (!ro[r]) {
        if (!Ux[r])
          for (let h of ["geo", "geo1"])
            l[h]?.attributes.position.array && uM(l[h]);
        continue;
      }
      let c = (d2[r] = Object.fromEntries(
        ["geo", "geo1"]
          .filter((h) => l[h] && (h === "geo" || l.geo1 !== l.geo))
          .map((h) => [h, mF(l[h], ro[r])]),
      ));
      if (Object.values(c).some((h) => h.bad)) {
        console.warn(
          "car wheels: stray tags, wheels kept still",
          r,
          JSON.stringify(c),
        );
        for (let h of ["geo", "geo1"]) l[h] && uM(l[h]);
      }
    }
    for (let [r, l] of Object.entries(n))
      ((l.base = l.geo),
        !(
          NZ() ||
          !Qz[r] ||
          !ro[r] ||
          Object.values(d2[r] || {}).some((c) => c.bad)
        ) && bF(r, l, l.geo));
    return (
      Object.assign(n, QJ(Dx)),
      yF(n, 0),
      i.length && gF.set(n, { names: i, base: o, loader: e }),
      n
    );
  } catch (e) {
    return (
      console.warn("car models: falling back to the lofted cars", e),
      null
    );
  }
}
