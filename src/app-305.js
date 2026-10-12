// app 305 — math
// Lines 147344-147539 of readable/app.pretty.js (statement-aligned).
function II(i, t) {
  let e = 0,
    s = 0,
    n = 0,
    o = 0,
    a = {},
    r = {};
  for (let c = 0; c < i.length; c++) {
    let h = i[c],
      f = h.E;
    if (
      ((e += Math.abs(h.sb - h.sa)),
      (n = Math.max(n, LI(f))),
      Ot(f, h.sa, a),
      Ot(f, h.sb, r),
      (o += Math.max(0, r.y - a.y)),
      c)
    ) {
      let u = i[c - 1],
        d = {},
        p = {},
        m = {},
        g = {};
      (Ot(
        u.E,
        u.sb - (u.sb > u.sa ? 1 : -1) * Math.min(8, Math.abs(u.sb - u.sa)),
        d,
      ),
        Ot(u.E, u.sb, p),
        Ot(f, h.sa, m),
        Ot(
          f,
          h.sa + (h.sb > h.sa ? 1 : -1) * Math.min(8, Math.abs(h.sb - h.sa)),
          g,
        ));
      let b = p.x - d.x,
        x = p.z - d.z,
        v = g.x - m.x,
        y = g.z - m.z,
        M = (b * v + x * y) / (Math.hypot(b, x) * Math.hypot(v, y) || 1);
      M < 0.85 && (s += M < 0.3 ? 2 : 1);
    }
  }
  let l = Math.max(0.2, e / 1e3);
  return {
    cost:
      s / l +
      Math.max(0, n - 0.06) * 100 +
      (o / l) * 0.03 +
      (Math.max(0, t * 0.85 - e) / t) * 6,
    turns: s,
    gmax: +n.toFixed(3),
    climb: Math.round(o),
    L: Math.round(e),
  };
}
function cZ(i, { seed: t, x: e, z: s, psi: n, len: o }, a = null) {
  let r = i.D,
    l = i.L.roadAt(e, s, 40);
  if (!l || !L_(l.E)) return null;
  let c = (S, w) => CI(S, a ? { ...a, L: a.L || i.L } : null, w),
    h = gvt(t),
    f = l.E,
    u = Ot(f, l.s, {}),
    d = -Math.sin(n),
    p = -Math.cos(n),
    m = u.dx * d + u.dz * p >= 0 ? 1 : -1;
  f.oneway && (m = 1);
  let g = Math.min(f.s1 - 1, Math.max(f.s0 + 1, l.s)),
    b = [{ E: f, dir: m, sa: g, sb: m > 0 ? f.s1 : f.s0 }],
    x = new Set([m > 0 ? f.ja : f.jb]),
    v = Math.abs(b[0].sb - g),
    y = f,
    M = [];
  for (; v < o;) {
    let S = r.juns[m > 0 ? y.jb : y.ja];
    if (!S || !S.tl) break;
    x.add(S.id);
    let w = m > 0 ? "b" : "a",
      z = S.tl.find((C) => C.E === y && C.end === w);
    if (!z) break;
    let _ = -z.hx,
      R = -z.hz,
      T = [];
    for (let C of S.tl) {
      let P = C.E;
      if ((P === y && C.end === w) || !L_(P)) continue;
      let I = C.end === "a" ? 1 : -1;
      if (P.oneway && I < 0) continue;
      let L = I > 0 ? P.jb : P.ja;
      if (x.has(L) || !c(P, I)) continue;
      let F = _ * C.hx + R * C.hz;
      if (F < -0.2 || (v + (P.s1 - P.s0) < o && bvt(r.juns[L], P, c) === 0))
        continue;
      let N = LI(P),
        B = M.filter((H) => v - H < 350).length;
      T.push([
        (F > 0.85 ? 3 * (B >= 2 ? 2.5 : 1) : F > 0.4 ? 1.3 : 0.6) *
          (rZ.has(P.cls) ? 2.2 : 1) *
          (P.lanes > 1 ? 1.3 : 1) *
          (N > 0.15 ? 0.03 : N > 0.12 ? 0.12 : N > 0.08 ? 0.5 : 1),
        P,
        I,
        F,
      ]);
    }
    if (!T.length) break;
    let E = h() * T.reduce((C, P) => C + P[0], 0),
      A = T[0];
    for (let C of T)
      if ((E -= C[0]) <= 0) {
        A = C;
        break;
      }
    ((y = A[1]),
      (m = A[2]),
      A[3] < 0.85 && M.push(v),
      b.push({
        E: y,
        dir: m,
        sa: m > 0 ? y.s0 : y.s1,
        sb: m > 0 ? y.s1 : y.s0,
      }),
      (v += y.s1 - y.s0));
  }
  return v >= o * 0.6 ? b : null;
}
function hZ(i, t, e, s = null) {
  let n = ([a, r]) => {
      let l = null,
        c = 1e9;
      for (let h of i.D.juns) {
        if (!h.legs.length) continue;
        let f = Math.hypot(h.x - a, h.z - r);
        f < c && ((c = f), (l = h));
      }
      return l;
    },
    o = i.path(n(t), n(e));
  return !o ||
    !o.length ||
    (s && o.some(({ E: a, dir: r }) => !CI(a, { ...s, L: s.L || i.L }, r)))
    ? null
    : o.map(({ E: a, dir: r }) => ({
        E: a,
        dir: r,
        sa: r > 0 ? a.s0 : a.s1,
        sb: r > 0 ? a.s1 : a.s0,
      }));
}
function xvt() {
  let i = document.createElement("canvas");
  ((i.width = 128), (i.height = 64));
  let t = i.getContext("2d");
  ((t.fillStyle = "rgba(20,24,30,0.22)"),
    t.fillRect(0, 0, 128, 64),
    (t.fillStyle = "rgba(255,150,40,0.85)"));
  for (let s of [8, 72])
    (t.beginPath(),
      t.moveTo(s, 6),
      t.lineTo(s + 22, 6),
      t.lineTo(s + 48, 32),
      t.lineTo(s + 22, 58),
      t.lineTo(s, 58),
      t.lineTo(s + 26, 32),
      t.closePath(),
      t.fill());
  ((t.fillStyle = "rgba(255,255,255,0.8)"),
    t.fillRect(0, 0, 128, 3),
    t.fillRect(0, 61, 128, 3));
  let e = new Sn(i);
  return ((e.colorSpace = is), (e.wrapS = ti), e);
}
function aZ(i) {
  let t = document.createElement("canvas");
  ((t.width = 64), (t.height = 128));
  let e = t.getContext("2d");
  if (i)
    for (let n = 0; n < 8; n++)
      for (let o = 0; o < 4; o++)
        ((e.fillStyle =
          (o + n) % 2 ? "rgba(255,255,255,0.9)" : "rgba(10,10,10,0.75)"),
          e.fillRect(o * 16, n * 16, 16, 16));
  else {
    let n = e.createLinearGradient(0, 128, 0, 0);
    (n.addColorStop(0, "rgba(80,220,255,0.75)"),
      n.addColorStop(0.5, "rgba(80,220,255,0.25)"),
      n.addColorStop(1, "rgba(80,220,255,0)"),
      (e.fillStyle = n),
      e.fillRect(0, 0, 64, 128),
      (e.fillStyle = "rgba(200,250,255,0.9)"),
      e.fillRect(0, 124, 64, 4));
  }
  let s = new Sn(t);
  return ((s.colorSpace = is), (s.wrapS = ti), s);
}
