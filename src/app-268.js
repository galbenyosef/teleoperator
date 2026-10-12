// app 268 — geo
// Lines 133918-134254 of readable/app.pretty.js (statement-aligned).
function EY(i, t) {
  zY(i);
  let e = i.attributes.position,
    s = new Uint32Array(e.array.buffer, e.array.byteOffset, e.array.length),
    n = new Uint8Array(e.count);
  for (let o = 0; o < e.count; o++) n[o] = s[o * 3] & 7;
  i.scale(...t);
  for (let o = 0; o < e.count; o++) s[o * 3] = (s[o * 3] & -8) | n[o];
}
var vY = ["sedan", "hatch", "suv", "pickup", "van"],
  pbt = ["taxi", "bus"],
  mbt = { bus: 1, cablecar: 1, waymo: 1 },
  TY = { bus: 1, cablecar: 1 },
  AY = { bus: [0.74, 1, 1] },
  gbt = [
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
  Yc = [];
for (let [i, t] of gbt) for (let e = 0; e < t * 2; e++) Yc.push(new $t(i));
var fx = new $t(1, 1, 1);
function ux(i) {
  let t = Math.abs(Math.sin(i.x * 12.9898 + i.z * 78.233) * 43758.5453) % 1,
    e = ["sedan", "hatch", "suv", "van"][i.type] || "sedan";
  return e === "sedan" && t < 0.22 ? "pickup" : e;
}
var u_ = (i) => Yc[Math.floor(i * Yc.length) % Yc.length],
  RY = {
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
for (let i = 0; i < 4; i++) RY["streetcar" + i] = 17e3;
var zm = (i) => RY[i] || 1500,
  PY = ["sedan", "hatch", "suv", "van"];
function WL(i, t, e = !0) {
  let s = (o, a) => Math.round(o * 100) * 4e6 + Math.round(a * 100),
    n = new Map();
  for (let o of i) o.kind === "car" && n.set(s(o.x, o.z), o);
  for (let o of t) {
    if (!o.parked) continue;
    let a = n.get(s(o.x, o.z));
    if (a && ((o.p = a), (o.kind = ux(a)), e)) {
      let r = Ko[o.kind];
      ((o.hx = r.bw / 2), (o.hz = r.L / 2));
    }
  }
}
var CY = (i) => {
  for (let t of Object.keys(i.attributes))
    ["position", "normal", "uv"].includes(t) || i.deleteAttribute(t);
  return (i.computeBoundingSphere(), i);
};
function LY(i, t) {
  let e = ho[i] && t.index ? t.toNonIndexed() : t,
    s = e.attributes.position,
    n = e.attributes.normal,
    o = Ko[i],
    a = new Float32Array(s.count * 4);
  for (let r = 0; r < s.count; r++) {
    let l = Math.abs(s.getX(r)),
      c = s.getY(r),
      h = s.getZ(r),
      f =
        !TY[i] &&
        h > o.L / 2 - 0.55 &&
        (!n || n.getZ(r) > 0.25) &&
        c > 0.5 &&
        c < 1.08 &&
        l > o.bw * 0.2 &&
        l < o.bw / 2 + 0.02;
    ((a[r * 4] = a[r * 4 + 1] = a[r * 4 + 2] = 1),
      (a[r * 4 + 3] = f ? 0.25 : 1));
  }
  if (ho[i])
    for (let r = 0; r < s.count; r++)
      ubt(ho[i], s.getX(r), s.getY(r), s.getZ(r), 0.03) && (a[r * 4 + 3] = 1.5);
  return (e.setAttribute("color", new Te(a, 4)), e);
}
var IY = (i, t) => async (e) => {
    let s = await i.parseAsync(await io(t + e), t),
      n = null;
    if (
      (s.scene.traverse((o) => {
        o.isMesh && !n && (n = o);
      }),
      !n)
    )
      throw new Error(e + ": no mesh");
    return (zY(n.geometry), n);
  },
  FY = () => {
    try {
      return new URLSearchParams(location.search).has("oldwheels");
    } catch {
      return !1;
    }
  },
  DL = new WeakMap(),
  NY = (i) => {
    let t = (n) => {
        let o = xbt(n);
        return wbt(bw(o, kbt(o)), ybt());
      },
      e = t(i.geo),
      s = i.geo1 && i.geo1 !== i.geo ? t(i.geo1) : i.geo1 ? e : null;
    return [e, s];
  };
function UL(i, t, e) {
  if (
    FY() ||
    !Qk[i] ||
    !ho[i] ||
    Object.values(_m[i] || {}).some((n) => n.bad)
  ) {
    ((t.geo = e), (t.geoP = void 0));
    return;
  }
  let s = !globalThis.SF_LITE;
  ((t.geo = mL(e, pL(i, ho[i], s ? 0 : 2), ho[i])),
    (t.geoP = s ? mL(e, pL(i, ho[i], 1), ho[i]) : t.geo));
}
async function BY(i = "assets/cars/", { late: t = !1 } = {}) {
  try {
    let e = new Vr(),
      s = IY(e, i),
      n = {},
      o = [],
      a = io(lx + "waymo_traffic.glb");
    (a.catch(() => {}),
      await Promise.all(
        hbt.map(async (r) => {
          let l = vY.includes(r) || pbt.includes(r),
            c = (!!globalThis.SF_LITE || t) && l;
          c && !globalThis.SF_LITE && o.push(r);
          let [h, f] = await Promise.all([
              c ? null : s(r + ".glb"),
              l ? s(r + "_lod1.glb") : null,
            ]),
            u = (h || f).material,
            d = new Ee({
              color: 16777215,
              map: u.map,
              roughness: 1,
              metalness: 0,
              side: Ss,
              vertexColors: !0,
            });
          ((d.userData.mbAlbedo = tx),
            (d.userData.mbTrafficFallback = !0),
            (u.metalnessMap || u.roughnessMap) &&
              (d.userData.mbExtraMap = u.metalnessMap || u.roughnessMap),
            (d.userData.carLamps = !TY[r]),
            (d.userData.masked = !!fbt[r]),
            (d.name = "car_" + r),
            ho[r] && (d.userData.mbWheels = NL(ho[r])),
            u.map && (u.map.anisotropy = 8));
          let p = CY,
            m = (x) => LY(r, x),
            g = AY[r];
          if (g)
            for (let x of [h, f])
              x && (EY(x.geometry, g), x.geometry.computeBoundingSphere());
          let b = f ? m(p(f.geometry)) : null;
          if (
            ((n[r] = {
              geo: h ? m(p(h.geometry)) : b,
              geo1: b,
              geo2: f && vY.includes(r) ? _bt(r) : null,
              mat: d,
              livery: !!mbt[r],
              V: Ko[r],
            }),
            r === "bus")
          ) {
            for (let x of h ? ["geo", "geo1"] : ["geo"])
              n.bus[x] && (n.bus[x] = bw(n.bus[x], DY(n.bus.geo)));
            h || (n.bus.geo1 = n.bus.geo);
          }
        }),
      ));
    try {
      let r = await e.parseAsync(await a, lx),
        l = {};
      r.scene.traverse((d) => {
        d.isMesh && (l[d.name] = d.geometry);
      });
      let c = new Ee({
        color: 16777215,
        map: h_("waymo_albedo.webp", !0),
        roughness: 1,
        metalness: 0,
        side: Ss,
        vertexColors: !0,
      });
      ((c.userData.mbAlbedo = tx),
        (c.userData.mbTrafficFallback = !0),
        (c.userData.mbExtraMap = h_("waymo_orm.webp", !1)),
        (c.userData.carLamps = !0),
        (c.userData.waymo = !0),
        (c.name = "car_waymo"),
        (c.userData.mbWheels = NL(ho.waymo)));
      let h = "waymo",
        f = Ko.waymo,
        u = (d) => {
          let p = d.attributes.position,
            m = d.attributes.normal,
            g = new Float32Array(p.count * 4);
          for (let b = 0; b < p.count; b++) {
            let x = Math.abs(p.getX(b)),
              v = p.getY(b),
              y = p.getZ(b);
            ((g[b * 4] = g[b * 4 + 1] = g[b * 4 + 2] = 1),
              (g[b * 4 + 3] =
                y > f.L / 2 - 0.45 &&
                m.getZ(b) > 0.25 &&
                v > 0.6 &&
                v < 0.95 &&
                x > 0.45 &&
                x < f.bw / 2 + 0.02
                  ? 0.25
                  : 1));
          }
          return (
            d.setAttribute("color", new Te(g, 4)),
            d.computeBoundingSphere(),
            dbt(d, ho.waymo)
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
            geo: bw(n.suv.geo, wY()),
            geo1: n.suv.geo1 ? bw(n.suv.geo1, wY()) : null,
            geo2: null,
            mat: n.suv.mat,
            livery: !0,
            V: { ...Ko.suv, H: Ko.suv.H + 0.42 },
          }));
    }
    if (n.suv) {
      let r = n.suv,
        l = "police",
        c = new Ee({
          color: 16777215,
          map: r.mat.map,
          roughness: 1,
          metalness: 0,
          side: Ss,
          vertexColors: !0,
        });
      ((c.userData = {
        ...r.mat.userData,
        mbAlbedo: cbt,
        mbWheels: NL(ho.police),
      }),
        (c.name = "car_" + l));
      let [h, f] = NY(r);
      n[l] = { geo: h, geo1: f, geo2: null, mat: c, livery: !1, V: Ko[l] };
    }
    for (let [r, l] of Object.entries(n)) {
      if (!ho[r]) {
        if (!ex[r])
          for (let h of ["geo", "geo1"])
            l[h]?.attributes.position.array && gw(l[h]);
        continue;
      }
      let c = (_m[r] = Object.fromEntries(
        ["geo", "geo1"]
          .filter((h) => l[h] && (h === "geo" || l.geo1 !== l.geo))
          .map((h) => [h, HL(l[h], ho[r])]),
      ));
      if (Object.values(c).some((h) => h.bad)) {
        console.warn(
          "car wheels: stray tags, wheels kept still",
          r,
          JSON.stringify(c),
        );
        for (let h of ["geo", "geo1"]) l[h] && gw(l[h]);
      }
    }
    for (let [r, l] of Object.entries(n))
      ((l.base = l.geo),
        !(
          FY() ||
          !Qk[r] ||
          !ho[r] ||
          Object.values(_m[r] || {}).some((c) => c.bad)
        ) && UL(r, l, l.geo));
    return (
      Object.assign(n, YK(tx)),
      qL(n, 0),
      o.length && DL.set(n, { names: o, base: i, loader: e }),
      n
    );
  } catch (e) {
    return (
      console.warn("car models: falling back to the lofted cars", e),
      null
    );
  }
}
