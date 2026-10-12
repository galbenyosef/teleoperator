// app 18 — len
// Lines 41936-42257 of readable/app.pretty.js (statement-aligned).
function Ac(i, t, e, s, n = 1) {
  let o = At([0.32, 0.22, 0.14], Tt.planks),
    a = At([0.05, 0.06, 0.06], Tt.metal),
    r = 3;
  t.box(i, e - 0.9, s - 0.22, e + 0.9, s + 0.22, r + 0.42, r + 0.47, o);
  let l = s - n * 0.24;
  t.box(i, e - 0.9, l - 0.03, e + 0.9, l + 0.03, r + 0.55, r + 0.85, o);
  for (let c of [-0.75, 0.75])
    t.box(i, e + c - 0.04, s - 0.25, e + c + 0.04, s + 0.22, r, r + 0.44, a);
}
function Dct(i, t, e, s) {
  let n = i.solid,
    o = 3,
    a = T0(At([0.42, 0.16, 0.1], Tt.paint)),
    r = At([0.72, 0.68, 0.6], Tt.stone),
    l = 14,
    c = 21,
    h = 4;
  for (let d of [-1, 1])
    e.box(
      n,
      2,
      d * (l / 2) - (d > 0 ? 3.5 : 0),
      2 + h,
      d * (l / 2) + (d > 0 ? 0 : 3.5),
      o,
      o + c,
      a,
    );
  e.box(n, 2, -l / 2 + 3.5, 2 + h, l / 2 - 3.5, o + 13, o + c - 2, a);
  for (let d = 0; d < 8; d++) {
    let p = (d + 0.5) / 8,
      m = -l / 2 + 3.5 + p * (l - 7),
      g = o + 9 + Math.sin(Math.PI * p) * 4;
    e.box(n, 1.9, m - 0.45, 2 + h + 0.1, m + 0.45, g, o + 13.1, a, { top: !1 });
  }
  (e.box(
    n,
    1.6,
    -l / 2 - 0.4,
    2 + h + 0.4,
    l / 2 + 0.4,
    o + c - 2,
    o + c - 1.2,
    r,
  ),
    e.box(
      n,
      1.8,
      -l / 2 - 0.2,
      2 + h + 0.2,
      l / 2 + 0.2,
      o + c - 1.2,
      o + c + 0.8,
      a,
    ));
  for (let d of [-1, 1]) {
    let p = e.P(4, o + c + 0.8, d * (l / 2 - 1.7));
    es(n, p[0], p[2], 1.4, p[1], p[1] + 1.2, 8, r, 1.1);
  }
  let f = t.word("PIER 43", {
      font: "bold 110px Georgia, serif",
      h: 130,
      spacing: 8,
    }),
    u = e.P(1.55, o + c - 1.6, 0);
  si(
    i.text,
    t,
    f,
    u[0],
    u[1],
    u[2],
    -e.out[0],
    -e.out[1],
    5.2,
    null,
    oo([0.92, 0.9, 0.82], !0),
  );
}
function Uct(i, t, e, s) {
  let n = i.solid,
    o = s.w / 2,
    a = 3;
  (e.box(n, 0, -o + 4, 8.9, o - 4, a, a + 13, At([0.1, 0.13, 0.15], Tt.glass)),
    e.box(
      n,
      -12,
      -o - 2,
      12,
      o + 2,
      a + 13,
      a + 14,
      At([0.82, 0.83, 0.82], Tt.metal),
      { bottom: !0 },
    ));
  for (let c = -o + 4; c <= o - 4; c += 6) {
    let h = e.P(-0.05, a, c);
    ss(n, h, [h[0], a + 13, h[2]], 0.25, 0.25, At([0.7, 0.7, 0.7], Tt.metal));
  }
  for (let c of [-o, o]) {
    let h = e.P(-10, a, c + (c < 0 ? 1 : -1));
    es(n, h[0], h[2], 0.35, a, a + 13, 8, At([0.75, 0.75, 0.75], Tt.metal));
  }
  let r = t.word("PIER 27", {
      font: "300 110px Arial, Helvetica, sans-serif",
      h: 130,
      spacing: 12,
    }),
    l = e.P(-12.05, a + 13.5, 0);
  si(
    i.text,
    t,
    r,
    l[0],
    l[1],
    l[2],
    -e.out[0],
    -e.out[1],
    7,
    null,
    oo([0.15, 0.15, 0.15], !1),
  );
}
var aS,
  dG,
  Ld = Vi(() => {
    En();
    Ol();
    Cd();
    aS = [
      { n: "29", side: "e", c: 10, w: 50, len: 230 },
      { n: "27", side: "e", c: 160, w: 70, len: 270, kind: "cruise" },
      { n: "23", side: "e", c: 305, w: 36, len: 150 },
      { n: "19", side: "e", c: 450, w: 55, len: 260 },
      { n: "17", side: "e", c: 600, w: 55, len: 260 },
      { n: "15", side: "e", c: 760, w: 60, len: 270, kind: "explo" },
      { n: "9", side: "e", c: 920, w: 50, len: 230 },
      { n: "7", side: "e", c: 1070, w: 13, len: 250, kind: "open" },
      { n: "5", side: "e", c: 1210, w: 45, len: 190 },
      { n: "3", side: "e", c: 1370, w: 55, len: 230 },
      { n: "1", side: "e", c: 1540, w: 60, len: 210 },
      { n: "14", side: "e", c: 1908, w: 9, len: 190, kind: "open", lamps: 14 },
      { n: "31", side: "n", c: 1520, w: 50, len: 250 },
      { n: "33", side: "n", c: 1320, w: 50, len: 250 },
      { n: "35", side: "n", c: 1120, w: 62, len: 300 },
      { n: "41", side: "n", c: 785, w: 26, len: 110, kind: "ferry" },
      { n: "43", side: "n", c: 745, w: 16, len: 40, kind: "arch" },
      { n: "45", side: "n", c: 560, w: 60, len: 320, kind: "fish" },
    ];
    dG = [
      [1, 1, 1],
      [0.96, 0.98, 1.02],
      [1.02, 1, 0.94],
      [0.95, 1, 0.96],
    ];
  });
var nY = {};
wh(nY, {
  WRAP_MODES: () => Eu,
  aliasWrap: () => Zgt,
  cleanWrap: () => ym,
  itemPng: () => s_,
  packWrap: () => _L,
  safeUrl: () => tY,
  shaOf: () => n_,
  unpackWrap: () => zL,
  unpackWrapOld: () => EL,
  wrapBox: () => i_,
  wrapKey: () => sY,
  wrapLog: () => fw,
  wrapTexture: () => TL,
  wrapWGSL: () => kL,
});
function kL({ mode: i = "f", box: t }, e = 1400) {
  if (!SL(t) || !Number.isFinite(e) || e <= 0)
    throw new Error("Invalid car-wrap projection bounds");
  let [s, n, o, a, r, l] = t,
    c = Math.max(l - o, 0.5),
    h = [(s + a) / 2, (n + r) / 2, (o + l) / 2],
    f = i === "t" ? 2 : 1;
  return i !== "t"
    ? jgt(t, e)
    : `
fn wrapUV(u: vec2f) -> vec2f { return ${i === "t" ? "fract(u)" : "clamp(u, vec2f(0.002), vec2f(0.998))"}; }
fn wrapCol(wp: vec3f, bc: vec3f, fw: f32) -> vec3f {
  let m = mat3x3f(O.model[0].xyz, O.model[1].xyz, O.model[2].xyz);
  let det = dot(m[0], cross(m[1], m[2]));
  let p = transpose(cofactor(m)) * (wp - O.model[3].xyz) / det - vec3f(${p0(h[0])}, ${p0(h[1])}, ${p0(h[2])});   // (the body's frame, from its centre)
  let n = normalize(transpose(m) * gNw);
  let dim = vec2f(textureDimensions(matEmit, 0)); let A = dim.x / max(dim.y, 1.0);
  let k = ${p0(f / c)};
  let lod = clamp(log2(max(fw / ${p0(e)} * k * dim.x, 1e-4)), 0.0, 10.0);
  // each face's UV: the picture upright, read the right way round from outside (the right side's front at its right)
  let us = vec2f(select(p.z, -p.z, n.x > 0.0) * k, -p.y * k * A) + 0.5;
  let ut = vec2f(-p.z * k, p.x * k * A) + 0.5;
  let uf = vec2f(select(-p.x, p.x, n.z > 0.0) * k, -p.y * k * A) + 0.5;
  let a = pow(abs(n), vec3f(5.0)); let w = a / max(a.x + a.y + a.z, 1e-4);
  let c = textureSampleLevel(matEmit, matSamp, wrapUV(us), lod).rgb * w.x + textureSampleLevel(matEmit, matSamp, wrapUV(ut), lod).rgb * w.y
    + textureSampleLevel(matEmit, matSamp, wrapUV(uf), lod).rgb * w.z;
  return c * bc;
}
`;
}
function jgt(i, t) {
  let [e, s, n, o, a, r] = i,
    l = i[6] ?? s + (a - s) * 0.58,
    c = Math.max(r - n, 0.5) * 1.02,
    h = [(e + o) / 2, (s + a) / 2, (n + r) / 2],
    f = s + (l - s) * 0.08,
    u = (f + l) / 2 - h[1];
  return `
fn wrapCol(wp: vec3f, bc: vec3f, fw: f32) -> vec3f {
  let m = mat3x3f(O.model[0].xyz, O.model[1].xyz, O.model[2].xyz);
  let det = dot(m[0], cross(m[1], m[2]));
  let p = transpose(cofactor(m)) * (wp - O.model[3].xyz) / det - vec3f(${p0(h[0])}, ${p0(h[1])}, ${p0(h[2])});
  let n = normalize(transpose(m) * gNw);
  let dim = vec2f(textureDimensions(matEmit, 0)); let A = dim.x / max(dim.y, 1.0);
  let lod = clamp(log2(max(fw / ${p0(t)} / ${p0(c)} * dim.x, 1e-4)), 0.0, 10.0);
  let u = select(p.z, -p.z, n.x > 0.0) / ${p0(c)} + 0.5;
  let v = 0.5 - (p.y - ${p0(u)}) * A / ${p0(c)};
  let side = textureSampleLevel(matEmit, matSamp, clamp(vec2f(u, v), vec2f(0.002), vec2f(0.998)), lod).rgb;
  let bg = 0.5 * (textureSampleLevel(matEmit, matSamp, vec2f(0.5, 0.04), 6.0).rgb + textureSampleLevel(matEmit, matSamp, vec2f(0.5, 0.96), 6.0).rgb);
  let ws = smoothstep(0.42, 0.68, abs(n.x)) * (1.0 - smoothstep(${p0(l - h[1] - 0.03)}, ${p0(l - h[1] + 0.02)}, p.y)) * smoothstep(0.0, 0.02, 0.5 - abs(u - 0.5));
  return mix(bg, side, ws) * bc;
}
`;
}
function tY(i) {
  if (typeof i != "string" || !i) return null;
  if (i.startsWith("data:"))
    return i.length < 3e6 &&
      /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(i)
      ? i
      : null;
  if (i.length > 400) return null;
  if (/^\/(?!\/)[A-Za-z0-9_\-./%~]+$/.test(i) && !i.includes("..")) return i;
  try {
    let t = new URL(i);
    if (t.origin === location.origin && !t.username)
      return t.pathname + t.search;
  } catch {}
  return null;
}
function ym(i) {
  if (!i || typeof i != "object") return null;
  let t = tY(i.u) || (Vgt.test(i.s || "") ? s_(i.s) : null),
    e = typeof i.c == "string" && $gt.test(i.c) ? i.c : null,
    s = Array.isArray(i.p)
      ? i.p.filter((o) => typeof o == "string" && Xgt.test(o)).slice(0, 3)
      : [];
  if (!t && !e && !s.length) return null;
  let n = {
    u: t,
    m: i.m === "t" ? "t" : "f",
    n:
      typeof i.n == "string"
        ? i.n.replace(/[\u0000-\u001f<>]/g, "").slice(0, 60)
        : "",
  };
  return (e && (n.c = e), s.length && (n.p = s), n);
}
function _L(i) {
  if (((i = ym(i)), !i)) return "";
  let t = n_(i.u),
    e = [t ? "h" + t : "", i.c ? "c" + i.c : ""].filter(Boolean).join(",");
  return !e && !i.p
    ? ""
    : (e || "-") +
        "." +
        i.m +
        (i.p ? "." + i.p.map((s) => s.slice(1)).join("") : "");
}
function zL(i) {
  let t =
    /^((?:h[0-9a-f]{64})?(?:,?c[A-Za-z0-9_-]{4,64})?|-)\.([ft])(?:\.((?:[0-9a-f]{6}){1,3}))?$/.exec(
      i || "",
    );
  if (!t) return null;
  let e = t[1] === "-" ? [] : t[1].split(","),
    s = e.find((o) => o[0] === "h"),
    n = e.find((o) => o[0] === "c");
  return ym({
    u: s ? s_(s.slice(1)) : null,
    c: n ? n.slice(1) : null,
    m: t[2],
    p: t[3] ? t[3].match(/.{6}/g).map((o) => "#" + o) : [],
    n: "",
  });
}
async function Ygt(i) {
  for (let t = 0; ; t++)
    try {
      let e = await fetch(i);
      if (e.ok) return await e.blob();
      let s = new Error("HTTP " + e.status);
      throw ((s.status = e.status), s);
    } catch (e) {
      if ((e.status && e.status < 500) || t >= 2) throw e;
      await eY(t ? 3e3 : 1e3);
    }
}
async function Jgt(i) {
  let t = globalThis.mindblown;
  if (typeof t?.creations?.get != "function")
    throw new Error("no creations here");
  for (let e = 0; ; e++)
    try {
      let s = await t.creations.get(i),
        n = s?.value?.img;
      if (
        s?.kind !== "wrap" ||
        typeof n != "string" ||
        !/^data:image\/(jpeg|png|webp);base64,/.test(n)
      )
        throw Object.assign(new Error("not a wrap"), { status: 422 });
      return await (await fetch(n)).blob();
    } catch (s) {
      if (s.status || s.reason === "NOT_FOUND" || e >= 2) throw s;
      await eY(e ? 3e3 : 1e3);
    }
}
