// app 308 — math
// Lines 149076-149271 of readable/app.pretty.js (statement-aligned).
function mO(o, t) {
  let e = 0,
    s = 0,
    n = 0,
    i = 0,
    a = {},
    r = {};
  for (let c = 0; c < o.length; c++) {
    let h = o[c],
      f = h.E;
    if (
      ((e += Math.abs(h.sb - h.sa)),
      (n = Math.max(n, pO(f))),
      Ot(f, h.sa, a),
      Ot(f, h.sb, r),
      (i += Math.max(0, r.y - a.y)),
      c)
    ) {
      let u = o[c - 1],
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
        v = p.z - d.z,
        x = g.x - m.x,
        y = g.z - m.z,
        M = (b * x + v * y) / (Math.hypot(b, v) * Math.hypot(x, y) || 1);
      M < 0.85 && (s += M < 0.3 ? 2 : 1);
    }
  }
  let l = Math.max(0.2, e / 1e3);
  return {
    cost:
      s / l +
      Math.max(0, n - 0.06) * 100 +
      (i / l) * 0.03 +
      (Math.max(0, t * 0.85 - e) / t) * 6,
    turns: s,
    gmax: +n.toFixed(3),
    climb: Math.round(i),
    L: Math.round(e),
  };
}
function Mtt(o, { seed: t, x: e, z: s, psi: n, len: i }, a = null) {
  let r = o.D,
    l = o.L.roadAt(e, s, 40);
  if (!l || !O_(l.E)) return null;
  let c = (S, w) => dO(S, a ? { ...a, L: a.L || o.L } : null, w),
    h = nwt(t),
    f = l.E,
    u = Ot(f, l.s, {}),
    d = -Math.sin(n),
    p = -Math.cos(n),
    m = u.dx * d + u.dz * p >= 0 ? 1 : -1;
  f.oneway && (m = 1);
  let g = Math.min(f.s1 - 1, Math.max(f.s0 + 1, l.s)),
    b = [{ E: f, dir: m, sa: g, sb: m > 0 ? f.s1 : f.s0 }],
    v = new Set([m > 0 ? f.ja : f.jb]),
    x = Math.abs(b[0].sb - g),
    y = f,
    M = [];
  for (; x < i;) {
    let S = r.juns[m > 0 ? y.jb : y.ja];
    if (!S || !S.tl) break;
    v.add(S.id);
    let w = m > 0 ? "b" : "a",
      _ = S.tl.find((P) => P.E === y && P.end === w);
    if (!_) break;
    let z = -_.hx,
      A = -_.hz,
      T = [];
    for (let P of S.tl) {
      let C = P.E;
      if ((C === y && P.end === w) || !O_(C)) continue;
      let I = P.end === "a" ? 1 : -1;
      if (C.oneway && I < 0) continue;
      let L = I > 0 ? C.jb : C.ja;
      if (v.has(L) || !c(C, I)) continue;
      let F = z * P.hx + A * P.hz;
      if (F < -0.2 || (x + (C.s1 - C.s0) < i && iwt(r.juns[L], C, c) === 0))
        continue;
      let O = pO(C),
        B = M.filter((H) => x - H < 350).length;
      T.push([
        (F > 0.85 ? 3 * (B >= 2 ? 2.5 : 1) : F > 0.4 ? 1.3 : 0.6) *
          (ytt.has(C.cls) ? 2.2 : 1) *
          (C.lanes > 1 ? 1.3 : 1) *
          (O > 0.15 ? 0.03 : O > 0.12 ? 0.12 : O > 0.08 ? 0.5 : 1),
        C,
        I,
        F,
      ]);
    }
    if (!T.length) break;
    let E = h() * T.reduce((P, C) => P + C[0], 0),
      R = T[0];
    for (let P of T)
      if ((E -= P[0]) <= 0) {
        R = P;
        break;
      }
    ((y = R[1]),
      (m = R[2]),
      R[3] < 0.85 && M.push(x),
      b.push({
        E: y,
        dir: m,
        sa: m > 0 ? y.s0 : y.s1,
        sb: m > 0 ? y.s1 : y.s0,
      }),
      (x += y.s1 - y.s0));
  }
  return x >= i * 0.6 ? b : null;
}
function Stt(o, t, e, s = null) {
  let n = ([a, r]) => {
      let l = null,
        c = 1e9;
      for (let h of o.D.juns) {
        if (!h.legs.length) continue;
        let f = Math.hypot(h.x - a, h.z - r);
        f < c && ((c = f), (l = h));
      }
      return l;
    },
    i = o.path(n(t), n(e));
  return !i ||
    !i.length ||
    (s && i.some(({ E: a, dir: r }) => !dO(a, { ...s, L: s.L || o.L }, r)))
    ? null
    : i.map(({ E: a, dir: r }) => ({
        E: a,
        dir: r,
        sa: r > 0 ? a.s0 : a.s1,
        sb: r > 0 ? a.s1 : a.s0,
      }));
}
function owt() {
  let o = document.createElement("canvas");
  ((o.width = 128), (o.height = 64));
  let t = o.getContext("2d");
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
  let e = new Sn(o);
  return ((e.colorSpace = Je), (e.wrapS = oi), e);
}
function vtt(o) {
  let t = document.createElement("canvas");
  ((t.width = 64), (t.height = 128));
  let e = t.getContext("2d");
  if (o)
    for (let n = 0; n < 8; n++)
      for (let i = 0; i < 4; i++)
        ((e.fillStyle =
          (i + n) % 2 ? "rgba(255,255,255,0.9)" : "rgba(10,10,10,0.75)"),
          e.fillRect(i * 16, n * 16, 16, 16));
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
  return ((s.colorSpace = Je), (s.wrapS = oi), s);
}
