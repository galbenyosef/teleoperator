// app 20 — coat
// Lines 42597-42941 of readable/app.pretty.js (statement-aligned).
function $r(i, t) {
  let e = i?.paintKit;
  if (!e) return !1;
  let s = qa(t),
    n = e.mat;
  e.saved ||
    (e.saved = {
      hook: n.userData.mbAlbedo,
      cc: n.clearcoat || 0,
      ccr: n.clearcoatRoughness || 0,
    });
  let o = null,
    a = null;
  if (s?.w && i_(i)) {
    let r = TL(s.w);
    if ((!r.ready && s.w.p?.[0] && (a = s.w.p[0]), r.ready)) {
      let l = performance.now();
      ((i.wrapT0 ||= l),
        !CL || CL(fY(e, s.f || "gloss", s.w.m)) || l - i.wrapT0 > 3e4
          ? ((o = s.w.m), (n.userData.mbMap8 = r.tex), (i.wrapT0 = 0))
          : setTimeout(() => {
              i.paint === s && $r(i, s);
            }, 250));
    } else
      r.failed ||
        r.p.then((l) => {
          l && i.paint === s && $r(i, s);
        });
  }
  if (
    (!o && n.userData.mbMap8?.name === "wrap" && (n.userData.mbMap8 = null),
    !s || (!s.c && !s.f && !o && !a))
  )
    ((n.userData.mbAlbedo = e.saved.hook),
      e.base.copy(e.factory),
      e.coatOn === "material" &&
        ((n.clearcoat = e.saved.cc), (n.clearcoatRoughness = e.saved.ccr)));
  else {
    let r = s.f || (o ? "gloss" : "metallic");
    (e.base.copy(o ? obt : a ? l_.set(a) : s.c ? l_.set(s.c) : e.shown),
      (n.userData.mbAlbedo = fY(e, r, o)),
      e.coatOn === "material" &&
        ((n.clearcoat = PL[r].coat), (n.clearcoatRoughness = PL[r].coatRough)));
  }
  return (
    (e.wrapOn = !!o),
    e.tint(e.base),
    dY(e.calipers, (e.calSaved ||= uY(e.calipers)), s?.cal, null),
    (e.rimHex = s?.rim || null),
    dY(
      e.rims,
      (e.rimSaved ||= uY(e.rims)),
      s?.rim,
      e.rimFollows
        ? (o ? l_.setRGB(0.05, 0.05, 0.055) : l_.copy(e.base)).multiplyScalar(
            e.night,
          )
        : null,
      !0,
    ),
    (i.paint = s),
    !0
  );
}
function dY(i, t, e, s, n = !1) {
  if (i?.length)
    for (let o of t)
      if (e) {
        if ((o.m.color.set(e), n)) {
          let a = nbt[e] ?? 1;
          ((o.m.metalness = a ? 1 : 0.15), (o.m.roughness = a ? 0.28 : 0.3));
        }
      } else
        s
          ? (o.m.color.copy(s), (o.m.metalness = o.mt), (o.m.roughness = o.r))
          : (o.m.color.copy(o.c),
            (o.m.metalness = o.mt),
            (o.m.roughness = o.r));
}
function pl({
  mat: i,
  kind: t,
  factory: e,
  shown: s = e,
  hook: n,
  coatOn: o = "hook",
  calipers: a = [],
  rims: r = [],
  rimFollows: l = !1,
  wrap: c = !1,
}) {
  let h = {
    mat: i,
    kind: t,
    factory: e.clone(),
    shown: s.clone(),
    base: e.clone(),
    hook: n,
    coatOn: o,
    calipers: a,
    rims: r,
    rimFollows: l,
    wrap: c,
    night: 1,
  };
  return (
    (h.tint = (f) => {
      i.color.copy(f).multiplyScalar(h.night);
    }),
    (h.setNight = (f) => {
      ((h.night = f), h.tint(h.base));
    }),
    h
  );
}
var fp,
  PL,
  tf,
  hp,
  ax,
  ef,
  nbt,
  sf,
  ibt,
  cY,
  pw,
  c_,
  hY,
  l_,
  obt,
  CL,
  IL,
  uY,
  ml = Vi(() => {
    as();
    uw();
    wm();
    uw();
    ((fp = [
      {
        id: "gloss",
        key: "g",
        name: "Gloss",
        sub: "Solid colour, deep clear coat",
      },
      {
        id: "metallic",
        key: "m",
        name: "Metallic",
        sub: "Fine metal flake under the coat",
      },
      {
        id: "pearl",
        key: "p",
        name: "Pearl",
        sub: "Colour that shifts with the light",
      },
      { id: "satin", key: "s", name: "Satin", sub: "Soft sheen, low gloss" },
      { id: "matte", key: "t", name: "Matte", sub: "Flat, no clear coat" },
      { id: "chrome", key: "c", name: "Chrome", sub: "Mirror-polished colour" },
      {
        id: "candy",
        key: "y",
        name: "Candy",
        sub: "Deep tinted coat over bright flake \xB7 level 4",
        lvl: 4,
      },
      {
        id: "flip",
        key: "x",
        name: "Colour Flip",
        sub: "A strong pearl: the colour turns with the angle \xB7 level 8",
        lvl: 8,
      },
    ]),
      (PL = {
        gloss: {
          flakes: 0,
          flakeTilt: 0,
          flakeMetal: 0,
          flakeRough: 0.4,
          baseRough: 0.4,
          baseMetal: 0,
          depth: 0.7,
          coat: 1,
          coatRough: 0.025,
        },
        metallic: {
          flakes: 1,
          flakeScale: 1400,
          flakeTilt: 0.3,
          flakeMetal: 0.8,
          flakeRough: 0.2,
          baseRough: 0.36,
          baseMetal: 0.42,
          depth: 0.55,
          coat: 1,
          coatRough: 0.03,
        },
        pearl: {
          flakes: 1,
          flakeScale: 1800,
          flakeTilt: 0.22,
          flakeMetal: 0.55,
          flakeRough: 0.26,
          baseRough: 0.38,
          baseMetal: 0.25,
          depth: 0.6,
          pearl: 1,
          coat: 1,
          coatRough: 0.03,
        },
        satin: {
          flakes: 1,
          flakeScale: 1600,
          flakeTilt: 0.12,
          flakeMetal: 0.3,
          flakeRough: 0.5,
          baseRough: 0.55,
          baseMetal: 0.15,
          depth: 0.4,
          coat: 0.3,
          coatRough: 0.3,
        },
        matte: {
          flakes: 0,
          flakeTilt: 0,
          flakeMetal: 0,
          flakeRough: 0.8,
          baseRough: 0.8,
          baseMetal: 0,
          depth: 0.25,
          coat: 0,
          coatRough: 0.5,
        },
        candy: {
          flakes: 1,
          flakeScale: 2400,
          flakeTilt: 0.18,
          flakeMetal: 0.95,
          flakeRough: 0.12,
          baseRough: 0.3,
          baseMetal: 0.55,
          depth: 0.95,
          coat: 1,
          coatRough: 0.012,
        },
        flip: {
          flakes: 1,
          flakeScale: 2e3,
          flakeTilt: 0.26,
          flakeMetal: 0.6,
          flakeRough: 0.22,
          baseRough: 0.34,
          baseMetal: 0.3,
          depth: 0.65,
          pearl: 2.4,
          coat: 1,
          coatRough: 0.025,
        },
        chrome: {
          flakes: 0,
          flakeTilt: 0,
          flakeMetal: 1,
          flakeRough: 0.07,
          baseRough: 0.07,
          baseMetal: 1,
          depth: 0,
          coat: 0.5,
          coatRough: 0.02,
        },
      }),
      (tf = (i) => fp.find((t) => t.id === i) || null),
      (hp = [
        ["#c1121c", "Track Red"],
        ["#ff5a1f", "Lava Orange"],
        ["#ffc61a", "Solar Yellow"],
        ["#8bd61c", "Acid Lime"],
        ["#0f4d2c", "Racing Green"],
        ["#12a89c", "Lagoon Teal"],
        ["#1f6bff", "Electric Blue"],
        ["#0d1b3d", "Midnight Blue"],
        ["#6b2fd6", "Ultra Violet"],
        ["#e0287d", "Hot Magenta"],
        ["#cbbb99", "Champagne"],
        ["#8a5a32", "Burnt Bronze"],
        ["#b9bec4", "Liquid Silver"],
        ["#3b3e43", "Graphite"],
        ["#f2f1ec", "Glacier White"],
        ["#0b0b0d", "Jet Black"],
      ]),
      (ax = [
        ["#d0161b", "Red"],
        ["#f5c400", "Yellow"],
        ["#ff6a00", "Orange"],
        ["#1d5bd6", "Blue"],
        ["#8bd61c", "Lime"],
        ["#b8bcc2", "Silver"],
        ["#141416", "Black"],
      ]),
      (ef = [
        ["#c9ccd1", "Silver", 1],
        ["#5a5d63", "Gunmetal", 1],
        ["#0d0d0f", "Gloss Black", 0],
        ["#9a7a4a", "Bronze", 1],
        ["#d4b05a", "Gold", 1],
        ["#ececec", "White", 0],
      ]),
      (nbt = Object.fromEntries(ef.map((i) => [i[0], i[2]]))),
      (sf = (i, t = hp) =>
        (t.find((e) => e[0] === i) ||
          (t === hp ? Sm.find((e) => e[0] === i) : null) ||
          [])[1] || null),
      (ibt = /^#[0-9a-f]{6}$/));
    ((cY = (i) => (
      (i = qa(i)),
      i
        ? JSON.stringify([
            i.c,
            i.f,
            i.cal,
            i.rim,
            i.w?.u || null,
            i.w?.c || null,
            i.w?.m || null,
          ])
        : ""
    )),
      (pw = (i, t) => cY(i) === cY(t)));
    ((c_ = (i) => "#" + (i?.paintKit?.shown?.getHexString?.() || "ffffff")),
      (hY = new Map()));
    ((l_ = new $t()),
      (obt = new $t(1, 1, 1)),
      (CL = null),
      (IL = (i) => {
        CL = i;
      }));
    uY = (i) =>
      (i || []).map((t) => ({
        m: t,
        c: t.color.clone(),
        r: t.roughness,
        mt: t.metalness,
      }));
  });
