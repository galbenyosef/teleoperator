// app 247 — bearing
// Lines 126071-126405 of readable/app.pretty.js (statement-aligned).
var wvt = [-4829.3, -820.4],
  Xz = { at: [-2398.5, -1252], bearing: -10.6 },
  Kz = { at: [-1926.5, -1072], bearing: -90 },
  Nx = null;
function MJ(o) {
  if ((gvt(o.D), (Nx = bvt(o)), Nx)) {
    let { F: t, len: e } = Nx,
      s = [
        [Aa.xa, Aa.wNb - 0.3],
        [e - Aa.xbFromEnd, Aa.wNb - 0.3],
        [e - Aa.xbFromEnd, Aa.wSb + 0.3],
        [Aa.xa, Aa.wSb + 0.3],
      ].map(([n, i]) => t.fwd(n, i));
    o.claim({ name: "lombard", poly: s, buildings: !1 });
  }
  {
    let t = SJ(o),
      e = [];
    for (let s = 0; s < 48; s++) {
      let n = (s / 48) * Math.PI * 2;
      e.push(
        t.fwd(po.west(-122.4484) + Math.cos(n) * 172, 330 + Math.sin(n) * 110),
      );
    }
    o.claim({ name: "pfa", poly: e, ids: [288371295], frac: 0.5 });
  }
  o.claim({
    name: "stfyc",
    ids: [30610272],
    poly: o.rectPoly(-4678, -1305, 0, 100, 52),
    props: !0,
  });
  {
    let t = o.frame({ at: Xz.at, bearing: Xz.bearing });
    o.claim({
      name: "hyde",
      buildings: !1,
      poly: [
        [-9, -13],
        [4.5, -13],
        [4.5, 9],
        [-9, 9],
      ].map(([e, s]) => t.fwd(e, s)),
    });
  }
  {
    let t = o.frame({ at: Kz.at, bearing: Kz.bearing });
    o.claim({
      name: "taylor",
      buildings: !1,
      poly: [
        [-8, -9],
        [8, -9],
        [8, 6.5],
        [-8, 6.5],
      ].map(([e, s]) => t.fwd(e, s)),
    });
  }
}
function SJ(o) {
  return o.frame({ at: wvt, grid: [po.west(-122.4484), 355], bearing: 90 });
}
var vJ = (o, t, e) => {
  let s = new Map();
  return (n, i) => {
    let a = Math.round(n * 2) * 131071 + Math.round(i * 2),
      r = s.get(a);
    if (r === void 0) {
      let [l, c] = t.fwd(n, i),
        h = o.L.roadAt(l, c, e + 1);
      s.set(a, (r = !h || h.dd > e));
    }
    return r;
  };
};
function kJ(o, t) {
  let e = Ix(t),
    s = (n, i) => {
      let a = performance.now();
      (o.site(n, (r) => {
        e.frame = n.F;
        try {
          i(r);
        } finally {
          e.frame = null;
        }
      }),
        ((o.msLGG ||= {})[n.name] = Math.round(performance.now() - a)));
    };
  Nx && s({ name: "lombard", F: Nx.F, cull: 1800 }, (n) => yvt(n, e, Nx));
  {
    let n = SJ(o);
    s({ name: "pfa", F: n, cull: 3500 }, (i) => {
      ((i.clear = vJ(o, n, 2.5)), Oz(i, e));
    });
  }
  {
    let n = o.frame({ at: [0, 0], grid: [0, 0], rot: 0 });
    s({ name: "marina", F: n, cull: 3500 }, (i) => {
      ((i.clear = vJ(o, n, 2)), Bz(i, e, XY));
    });
  }
  {
    let n = o.frame({ at: Xz.at, bearing: Xz.bearing });
    s({ name: "hyde", F: n, cull: 1200 }, (i) =>
      Kw(i, e, {
        x: 0,
        tz: 0,
        zS: -12,
        zN: 8,
        wW: 9,
        wE: 4.3,
        rails: [n.inv(-2381.5, -1232), n.inv(-2379.5, -1222)],
      }),
    );
  }
  {
    let n = o.frame({ at: Kz.at, bearing: Kz.bearing });
    s({ name: "taylor", F: n, cull: 1200 }, (i) =>
      Kw(i, e, {
        x: 0,
        tz: 0,
        zS: -9,
        zN: 6.5,
        wW: 8,
        wE: 8,
        rails: [n.inv(-1914, -1064), n.inv(-1912.5, -1050)],
      }),
    );
  }
  return e;
}
var Svt = "lombard_gg",
  kvt = [
    [3, 3],
    [3, 4],
  ];
function zvt(o) {
  let t = Ix(o);
  if (!(typeof location < "u" && /[?&]nolgg\b/.test(location.search))) {
    for (let [e, s] of [
      ["lombard", HY],
      ["gg", Iz],
      ["pfa", Oz],
      ["marina", Bz],
      ["hyde", Kw],
    ])
      try {
        s(o, t);
      } catch (n) {
        console.error("lombard_gg:", e, n);
      }
    t.finish();
  }
}
var _J = () => typeof location < "u" && /[?&]nolgg\b/.test(location.search);
function _vt(o) {
  _J() || MJ(o);
}
var zJ = {
  lombard: [-2227, -730, 1300],
  pfa: [-4800, -830, 2800],
  marina: [-4e3, -1250, 2800],
  harbor: [-4450, -1250, 3e3],
  crissy: [-5800, -1300, 3e3],
  hyde: [-2398, -1252, 1200],
  boats: [-4450, -1220, 1600],
  hydecar: [-2398, -1252, 900],
};
function Evt(o) {
  if (_J()) return;
  let t = new le();
  t.name = "lombard_gg";
  let e = kJ(o, { night: o.night, group: t });
  if (o.headless) return;
  e.finish();
  let s = {};
  for (let n of t.children.slice()) {
    let i =
        Object.keys(zJ).find(
          (r) => n.name.startsWith("lgg_" + r + "_") || n.name === "lgg_" + r,
        ) || "lombard",
      a = s[i];
    if (!a) {
      ((a = s[i] = new le()), (a.name = "lgg_" + i), o.group.add(a));
      let [r, l, c] = zJ[i];
      o.sites.push({ group: a, x: r, z: l, cull: c });
    }
    a.add(n);
  }
}
var EJ = [dw, Ww, Zw],
  cI = new Set(
    EJ.flatMap((o) => (o.RESERVE || []).map(([t, e]) => `${t},${e}`)),
  );
function TJ(o) {
  for (let t of EJ)
    try {
      t.build?.(o);
    } catch (e) {
      console.error("landmarks:", t.NAME || "?", e);
    }
}
es();
Pn();
var Tvt = [
    [/555 California/, 5, [0.42, 0.36, 0.33]],
    [/Embarcadero Center/, 1, [1, 1, 0.98]],
    [/181 Fremont/, 5, [0.8, 0.85, 0.9]],
    [/Millennium Tower/, 4, [0.85, 0.9, 0.95]],
    [/Rincon/, 4, [0.8, 0.85, 0.85]],
    [/101 California/, 5, [0.7, 0.72, 0.75]],
    [
      /Russ Building|Shell Building|Hunter-Dulin|450 Sutter|Pacific Telephone/,
      6,
      [0.95, 0.9, 0.82],
    ],
    [
      /Chevron|McKesson|One Sansome|44 Montgomery|Wells Fargo/,
      7,
      [0.9, 0.9, 0.88],
    ],
    [/Bank of America|California Center/, 5, [0.5, 0.4, 0.38]],
    [/Four Seasons|Park Tower|50 Fremont|First Market/, 4, [0.9, 0.92, 0.95]],
  ],
  Rvt = new Set(["Ferry Building", ...DL]),
  RJ = { test: (o) => Rvt.has(o) },
  hI = (o, t) =>
    (HL || []).some((e) => {
      let [s, n, i, a] = Array.isArray(e) ? e : [e.x0, e.z0, e.x1, e.z1];
      return o > s && o < i && t > n && t < a;
    }),
  Avt = {
    white: [1, 1, 0.98],
    grey: [0.75, 0.75, 0.75],
    gray: [0.75, 0.75, 0.75],
    beige: [1, 0.93, 0.8],
    brown: [0.6, 0.45, 0.35],
    black: [0.3, 0.3, 0.32],
    red: [0.8, 0.45, 0.4],
    silver: [0.85, 0.87, 0.9],
    blue: [0.7, 0.8, 0.95],
  };
function Pvt(o) {
  if (!o) return null;
  if (((o = String(o).toLowerCase()), o[0] === "#" && o.length >= 7)) {
    let t = [1, 3, 5].map((s) => parseInt(o.slice(s, s + 2), 16) / 255),
      e = Math.max(...t, 0.2);
    return t.map((s) => Math.min(1.1, 0.35 + (0.75 * s) / e));
  }
  return Avt[o] || null;
}
function Cvt(o) {
  let t = o.name || "";
  for (let [a, r, l] of Tvt) if (a.test(t)) return { cell: r, tint: l };
  let e = js(o.id % 100003, (o.id / 100003) | 0, 17),
    s = (o.mat || "").toLowerCase(),
    n;
  /glass/.test(s)
    ? (n = e < 0.5 ? 4 : 5)
    : /concrete|plaster|cement/.test(s)
      ? (n = e < 0.5 ? 1 : 7)
      : /stone|granite|marble|sandstone/.test(s)
        ? (n = e < 0.5 ? 2 : 6)
        : /brick/.test(s)
          ? (n = 0)
          : o.h >= 120
            ? (n = [1, 4, 5, 7, 2, 5][Math.floor(e * 6)])
            : o.h >= 40
              ? (n = [0, 1, 2, 3, 6, 7, 4][Math.floor(e * 7)])
              : (n = [0, 2, 6, 7, 3, 0][Math.floor(e * 6)]);
  let i = 0.88 + 0.2 * js(o.id % 7919, 3, 5);
  return {
    cell: n,
    tint: Pvt(o.col) || [i, i * (0.97 + 0.05 * e), i * (0.93 + 0.06 * e)],
  };
}
var fI = (o) => {
  let t = 0,
    e = 0;
  for (let s of o) ((t += s[0]), (e += s[1]));
  return [t / o.length, e / o.length];
};
function AJ(o, t) {
  if (o < he[0] || o > he[xn - 1] || t < pe[0] || t > pe[ks - 1]) return null;
  let e = lR(o),
    s = cR(t),
    n = Hi(e, s);
  return o > n.x0 && o < n.x1 && t > n.z0 && t < n.z1 ? [e, s] : null;
}
function Lvt(o, t) {
  let e = o,
    s = [
      [
        (n) => n[0] >= t.x0,
        (n, i) => [
          t.x0,
          n[1] + ((i[1] - n[1]) * (t.x0 - n[0])) / (i[0] - n[0]),
        ],
      ],
      [
        (n) => n[0] <= t.x1,
        (n, i) => [
          t.x1,
          n[1] + ((i[1] - n[1]) * (t.x1 - n[0])) / (i[0] - n[0]),
        ],
      ],
      [
        (n) => n[1] >= t.z0,
        (n, i) => [
          n[0] + ((i[0] - n[0]) * (t.z0 - n[1])) / (i[1] - n[1]),
          t.z0,
        ],
      ],
      [
        (n) => n[1] <= t.z1,
        (n, i) => [
          n[0] + ((i[0] - n[0]) * (t.z1 - n[1])) / (i[1] - n[1]),
          t.z1,
        ],
      ],
    ];
  for (let [n, i] of s) {
    let a = [];
    for (let r = 0; r < e.length; r++) {
      let l = e[r],
        c = e[(r + 1) % e.length],
        h = n(l),
        f = n(c);
      (h && a.push(l), h !== f && a.push(i(l, c)));
    }
    if (((e = a), e.length < 3)) return [];
  }
  return e;
}
