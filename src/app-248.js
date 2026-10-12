// app 248 — bearing
// Lines 125812-126146 of readable/app.pretty.js (statement-aligned).
var J2t = [-4829.3, -820.4],
  Xk = { at: [-2398.5, -1252], bearing: -10.6 },
  Kk = { at: [-1926.5, -1072], bearing: -90 },
  Zb = null;
function vK(i) {
  if ((V2t(i.D), (Zb = $2t(i)), Zb)) {
    let { F: t, len: e } = Zb,
      s = [
        [ya.xa, ya.wNb - 0.3],
        [e - ya.xbFromEnd, ya.wNb - 0.3],
        [e - ya.xbFromEnd, ya.wSb + 0.3],
        [ya.xa, ya.wSb + 0.3],
      ].map(([n, o]) => t.fwd(n, o));
    i.claim({ name: "lombard", poly: s, buildings: !1 });
  }
  {
    let t = yK(i),
      e = [];
    for (let s = 0; s < 48; s++) {
      let n = (s / 48) * Math.PI * 2;
      e.push(
        t.fwd(to.west(-122.4484) + Math.cos(n) * 172, 330 + Math.sin(n) * 110),
      );
    }
    i.claim({ name: "pfa", poly: e, ids: [288371295], frac: 0.5 });
  }
  i.claim({
    name: "stfyc",
    ids: [30610272],
    poly: i.rectPoly(-4678, -1305, 0, 100, 52),
    props: !0,
  });
  {
    let t = i.frame({ at: Xk.at, bearing: Xk.bearing });
    i.claim({
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
    let t = i.frame({ at: Kk.at, bearing: Kk.bearing });
    i.claim({
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
function yK(i) {
  return i.frame({ at: J2t, grid: [to.west(-122.4484), 355], bearing: 90 });
}
var gK = (i, t, e) => {
  let s = new Map();
  return (n, o) => {
    let a = Math.round(n * 2) * 131071 + Math.round(o * 2),
      r = s.get(a);
    if (r === void 0) {
      let [l, c] = t.fwd(n, o),
        h = i.L.roadAt(l, c, e + 1);
      s.set(a, (r = !h || h.dd > e));
    }
    return r;
  };
};
function wK(i, t) {
  let e = Xb(t),
    s = (n, o) => {
      let a = performance.now();
      (i.site(n, (r) => {
        e.frame = n.F;
        try {
          o(r);
        } finally {
          e.frame = null;
        }
      }),
        ((i.msLGG ||= {})[n.name] = Math.round(performance.now() - a)));
    };
  Zb && s({ name: "lombard", F: Zb.F, cull: 1800 }, (n) => Y2t(n, e, Zb));
  {
    let n = yK(i);
    s({ name: "pfa", F: n, cull: 3500 }, (o) => {
      ((o.clear = gK(i, n, 2.5)), Nk(o, e));
    });
  }
  {
    let n = i.frame({ at: [0, 0], grid: [0, 0], rot: 0 });
    s({ name: "marina", F: n, cull: 3500 }, (o) => {
      ((o.clear = gK(i, n, 2)), Bk(o, e, jX));
    });
  }
  {
    let n = i.frame({ at: Xk.at, bearing: Xk.bearing });
    s({ name: "hyde", F: n, cull: 1200 }, (o) =>
      tw(o, e, {
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
    let n = i.frame({ at: Kk.at, bearing: Kk.bearing });
    s({ name: "taylor", F: n, cull: 1200 }, (o) =>
      tw(o, e, {
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
var Q2t = "lombard_gg",
  tgt = [
    [3, 3],
    [3, 4],
  ];
function egt(i) {
  let t = Xb(i);
  if (!(typeof location < "u" && /[?&]nolgg\b/.test(location.search))) {
    for (let [e, s] of [
      ["lombard", NX],
      ["gg", Ik],
      ["pfa", Nk],
      ["marina", Bk],
      ["hyde", tw],
    ])
      try {
        s(i, t);
      } catch (n) {
        console.error("lombard_gg:", e, n);
      }
    t.finish();
  }
}
var SK = () => typeof location < "u" && /[?&]nolgg\b/.test(location.search);
function sgt(i) {
  SK() || vK(i);
}
var MK = {
  lombard: [-2227, -730, 1300],
  pfa: [-4800, -830, 2800],
  marina: [-4e3, -1250, 2800],
  harbor: [-4450, -1250, 3e3],
  crissy: [-5800, -1300, 3e3],
  hyde: [-2398, -1252, 1200],
  boats: [-4450, -1220, 1600],
  hydecar: [-2398, -1252, 900],
};
function ngt(i) {
  if (SK()) return;
  let t = new ke();
  t.name = "lombard_gg";
  let e = wK(i, { night: i.night, group: t });
  if (i.headless) return;
  e.finish();
  let s = {};
  for (let n of t.children.slice()) {
    let o =
        Object.keys(MK).find(
          (r) => n.name.startsWith("lgg_" + r + "_") || n.name === "lgg_" + r,
        ) || "lombard",
      a = s[o];
    if (!a) {
      ((a = s[o] = new ke()), (a.name = "lgg_" + o), i.group.add(a));
      let [r, l, c] = MK[o];
      i.sites.push({ group: a, x: r, z: l, cull: c });
    }
    a.add(n);
  }
}
var kK = [vy, Ky, nw],
  LC = new Set(
    kK.flatMap((i) => (i.RESERVE || []).map(([t, e]) => `${t},${e}`)),
  );
function _K(i) {
  for (let t of kK)
    try {
      t.build?.(i);
    } catch (e) {
      console.error("landmarks:", t.NAME || "?", e);
    }
}
as();
En();
var igt = [
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
  ogt = new Set(["Ferry Building", ...hC]),
  zK = { test: (i) => ogt.has(i) },
  IC = (i, t) =>
    (cC || []).some((e) => {
      let [s, n, o, a] = Array.isArray(e) ? e : [e.x0, e.z0, e.x1, e.z1];
      return i > s && i < o && t > n && t < a;
    }),
  agt = {
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
function rgt(i) {
  if (!i) return null;
  if (((i = String(i).toLowerCase()), i[0] === "#" && i.length >= 7)) {
    let t = [1, 3, 5].map((s) => parseInt(i.slice(s, s + 2), 16) / 255),
      e = Math.max(...t, 0.2);
    return t.map((s) => Math.min(1.1, 0.35 + (0.75 * s) / e));
  }
  return agt[i] || null;
}
function lgt(i) {
  let t = i.name || "";
  for (let [a, r, l] of igt) if (a.test(t)) return { cell: r, tint: l };
  let e = Ws(i.id % 100003, (i.id / 100003) | 0, 17),
    s = (i.mat || "").toLowerCase(),
    n;
  /glass/.test(s)
    ? (n = e < 0.5 ? 4 : 5)
    : /concrete|plaster|cement/.test(s)
      ? (n = e < 0.5 ? 1 : 7)
      : /stone|granite|marble|sandstone/.test(s)
        ? (n = e < 0.5 ? 2 : 6)
        : /brick/.test(s)
          ? (n = 0)
          : i.h >= 120
            ? (n = [1, 4, 5, 7, 2, 5][Math.floor(e * 6)])
            : i.h >= 40
              ? (n = [0, 1, 2, 3, 6, 7, 4][Math.floor(e * 7)])
              : (n = [0, 2, 6, 7, 3, 0][Math.floor(e * 6)]);
  let o = 0.88 + 0.2 * Ws(i.id % 7919, 3, 5);
  return {
    cell: n,
    tint: rgt(i.col) || [o, o * (0.97 + 0.05 * e), o * (0.93 + 0.06 * e)],
  };
}
var FC = (i) => {
  let t = 0,
    e = 0;
  for (let s of i) ((t += s[0]), (e += s[1]));
  return [t / i.length, e / i.length];
};
function EK(i, t) {
  if (i < ae[0] || i > ae[mn - 1] || t < fe[0] || t > fe[ws - 1]) return null;
  let e = FT(i),
    s = NT(t),
    n = Ei(e, s);
  return i > n.x0 && i < n.x1 && t > n.z0 && t < n.z1 ? [e, s] : null;
}
function cgt(i, t) {
  let e = i,
    s = [
      [
        (n) => n[0] >= t.x0,
        (n, o) => [
          t.x0,
          n[1] + ((o[1] - n[1]) * (t.x0 - n[0])) / (o[0] - n[0]),
        ],
      ],
      [
        (n) => n[0] <= t.x1,
        (n, o) => [
          t.x1,
          n[1] + ((o[1] - n[1]) * (t.x1 - n[0])) / (o[0] - n[0]),
        ],
      ],
      [
        (n) => n[1] >= t.z0,
        (n, o) => [
          n[0] + ((o[0] - n[0]) * (t.z0 - n[1])) / (o[1] - n[1]),
          t.z0,
        ],
      ],
      [
        (n) => n[1] <= t.z1,
        (n, o) => [
          n[0] + ((o[0] - n[0]) * (t.z1 - n[1])) / (o[1] - n[1]),
          t.z1,
        ],
      ],
    ];
  for (let [n, o] of s) {
    let a = [];
    for (let r = 0; r < e.length; r++) {
      let l = e[r],
        c = e[(r + 1) % e.length],
        h = n(l),
        f = n(c);
      (h && a.push(l), h !== f && a.push(o(l, c)));
    }
    if (((e = a), e.length < 3)) return [];
  }
  return e;
}
