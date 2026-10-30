// app 06 — next
// Lines 1500-1837 of readable/app.pretty.js (statement-aligned).
function hy(o, t, e, s, n, i, a) {
  if (!o) return;
  !a && i && Frt(o, s, n, i);
  let r = o;
  for (; o.prev !== o.next;) {
    let l = o.prev,
      c = o.next;
    if (i ? Ert(o, s, n, i) : _rt(o)) {
      (t.push(l.i, o.i, c.i), uy(o), (o = c.next), (r = c.next));
      continue;
    }
    if (((o = c), o === r)) {
      a
        ? a === 1
          ? ((o = Trt(fm(o), t)), hy(o, t, e, s, n, i, 2))
          : a === 2 && Rrt(o, t, e, s, n, i)
        : hy(fm(o), t, e, s, n, i, 1);
      break;
    }
  }
}
function _rt(o) {
  let t = o.prev,
    e = o,
    s = o.next;
  if (ea(t, e, s) >= 0) return !1;
  let n = t.x,
    i = e.x,
    a = s.x,
    r = t.y,
    l = e.y,
    c = s.y,
    h = Math.min(n, i, a),
    f = Math.min(r, l, c),
    u = Math.max(n, i, a),
    d = Math.max(r, l, c),
    p = s.next;
  for (; p !== t;) {
    if (
      p.x >= h &&
      p.x <= u &&
      p.y >= f &&
      p.y <= d &&
      N3(n, r, i, l, a, c, p.x, p.y) &&
      ea(p.prev, p, p.next) >= 0
    )
      return !1;
    p = p.next;
  }
  return !0;
}
function Ert(o, t, e, s) {
  let n = o.prev,
    i = o,
    a = o.next;
  if (ea(n, i, a) >= 0) return !1;
  let r = n.x,
    l = i.x,
    c = a.x,
    h = n.y,
    f = i.y,
    u = a.y,
    d = Math.min(r, l, c),
    p = Math.min(h, f, u),
    m = Math.max(r, l, c),
    g = Math.max(h, f, u),
    b = YR(d, p, t, e, s),
    v = YR(m, g, t, e, s),
    x = o.prevZ,
    y = o.nextZ;
  for (; x && x.z >= b && y && y.z <= v;) {
    if (
      (x.x >= d &&
        x.x <= m &&
        x.y >= p &&
        x.y <= g &&
        x !== n &&
        x !== a &&
        N3(r, h, l, f, c, u, x.x, x.y) &&
        ea(x.prev, x, x.next) >= 0) ||
      ((x = x.prevZ),
      y.x >= d &&
        y.x <= m &&
        y.y >= p &&
        y.y <= g &&
        y !== n &&
        y !== a &&
        N3(r, h, l, f, c, u, y.x, y.y) &&
        ea(y.prev, y, y.next) >= 0)
    )
      return !1;
    y = y.nextZ;
  }
  for (; x && x.z >= b;) {
    if (
      x.x >= d &&
      x.x <= m &&
      x.y >= p &&
      x.y <= g &&
      x !== n &&
      x !== a &&
      N3(r, h, l, f, c, u, x.x, x.y) &&
      ea(x.prev, x, x.next) >= 0
    )
      return !1;
    x = x.prevZ;
  }
  for (; y && y.z <= v;) {
    if (
      y.x >= d &&
      y.x <= m &&
      y.y >= p &&
      y.y <= g &&
      y !== n &&
      y !== a &&
      N3(r, h, l, f, c, u, y.x, y.y) &&
      ea(y.prev, y, y.next) >= 0
    )
      return !1;
    y = y.nextZ;
  }
  return !0;
}
function Trt(o, t) {
  let e = o;
  do {
    let s = e.prev,
      n = e.next.next;
    (!Vg(s, n) &&
      cG(s, e, e.next, n) &&
      fy(s, n) &&
      fy(n, s) &&
      (t.push(s.i, e.i, n.i), uy(e), uy(e.next), (e = o = n)),
      (e = e.next));
  } while (e !== o);
  return fm(e);
}
function Rrt(o, t, e, s, n, i) {
  let a = o;
  do {
    let r = a.next.next;
    for (; r !== a.prev;) {
      if (a.i !== r.i && Nrt(a, r)) {
        let l = hG(a, r);
        ((a = fm(a, a.next)),
          (l = fm(l, l.next)),
          hy(a, t, e, s, n, i, 0),
          hy(l, t, e, s, n, i, 0));
        return;
      }
      r = r.next;
    }
    a = a.next;
  } while (a !== o);
}
function Art(o, t, e, s) {
  let n = [];
  for (let i = 0, a = t.length; i < a; i++) {
    let r = t[i] * s,
      l = i < a - 1 ? t[i + 1] * s : o.length,
      c = rG(o, r, l, s, !1);
    (c === c.next && (c.steiner = !0), n.push(Brt(c)));
  }
  n.sort(Prt);
  for (let i = 0; i < n.length; i++) e = Crt(n[i], e);
  return e;
}
function Prt(o, t) {
  let e = o.x - t.x;
  if (e === 0 && ((e = o.y - t.y), e === 0)) {
    let s = (o.next.y - o.y) / (o.next.x - o.x),
      n = (t.next.y - t.y) / (t.next.x - t.x);
    e = s - n;
  }
  return e;
}
function Crt(o, t) {
  let e = Lrt(o, t);
  if (!e) return t;
  let s = hG(e, o);
  return (fm(s, s.next), fm(e, e.next));
}
function Lrt(o, t) {
  let e = t,
    s = o.x,
    n = o.y,
    i = -1 / 0,
    a;
  if (Vg(o, e)) return e;
  do {
    if (Vg(o, e.next)) return e.next;
    if (n <= e.y && n >= e.next.y && e.next.y !== e.y) {
      let f = e.x + ((n - e.y) * (e.next.x - e.x)) / (e.next.y - e.y);
      if (
        f <= s &&
        f > i &&
        ((i = f), (a = e.x < e.next.x ? e : e.next), f === s)
      )
        return a;
    }
    e = e.next;
  } while (e !== t);
  if (!a) return null;
  let r = a,
    l = a.x,
    c = a.y,
    h = 1 / 0;
  e = a;
  do {
    if (
      s >= e.x &&
      e.x >= l &&
      s !== e.x &&
      lG(n < c ? s : i, n, l, c, n < c ? i : s, n, e.x, e.y)
    ) {
      let f = Math.abs(n - e.y) / (s - e.x);
      fy(e, o) &&
        (f < h || (f === h && (e.x > a.x || (e.x === a.x && Irt(a, e))))) &&
        ((a = e), (h = f));
    }
    e = e.next;
  } while (e !== r);
  return a;
}
function Irt(o, t) {
  return ea(o.prev, o, t.prev) < 0 && ea(t.next, o, o.next) < 0;
}
function Frt(o, t, e, s) {
  let n = o;
  do
    (n.z === 0 && (n.z = YR(n.x, n.y, t, e, s)),
      (n.prevZ = n.prev),
      (n.nextZ = n.next),
      (n = n.next));
  while (n !== o);
  ((n.prevZ.nextZ = null), (n.prevZ = null), Ort(n));
}
function Ort(o) {
  let t,
    e = 1;
  do {
    let s = o,
      n;
    o = null;
    let i = null;
    for (t = 0; s;) {
      t++;
      let a = s,
        r = 0;
      for (let c = 0; c < e && (r++, (a = a.nextZ), !!a); c++);
      let l = e;
      for (; r > 0 || (l > 0 && a);)
        (r !== 0 && (l === 0 || !a || s.z <= a.z)
          ? ((n = s), (s = s.nextZ), r--)
          : ((n = a), (a = a.nextZ), l--),
          i ? (i.nextZ = n) : (o = n),
          (n.prevZ = i),
          (i = n));
      s = a;
    }
    ((i.nextZ = null), (e *= 2));
  } while (t > 1);
  return o;
}
function YR(o, t, e, s, n) {
  return (
    (o = ((o - e) * n) | 0),
    (t = ((t - s) * n) | 0),
    (o = (o | (o << 8)) & 16711935),
    (o = (o | (o << 4)) & 252645135),
    (o = (o | (o << 2)) & 858993459),
    (o = (o | (o << 1)) & 1431655765),
    (t = (t | (t << 8)) & 16711935),
    (t = (t | (t << 4)) & 252645135),
    (t = (t | (t << 2)) & 858993459),
    (t = (t | (t << 1)) & 1431655765),
    o | (t << 1)
  );
}
function Brt(o) {
  let t = o,
    e = o;
  do ((t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next));
  while (t !== o);
  return e;
}
function lG(o, t, e, s, n, i, a, r) {
  return (
    (n - a) * (t - r) >= (o - a) * (i - r) &&
    (o - a) * (s - r) >= (e - a) * (t - r) &&
    (e - a) * (i - r) >= (n - a) * (s - r)
  );
}
function N3(o, t, e, s, n, i, a, r) {
  return !(o === a && t === r) && lG(o, t, e, s, n, i, a, r);
}
function Nrt(o, t) {
  return (
    o.next.i !== t.i &&
    o.prev.i !== t.i &&
    !Hrt(o, t) &&
    ((fy(o, t) &&
      fy(t, o) &&
      Drt(o, t) &&
      (ea(o.prev, o, t.prev) || ea(o, t.prev, t))) ||
      (Vg(o, t) && ea(o.prev, o, o.next) > 0 && ea(t.prev, t, t.next) > 0))
  );
}
function ea(o, t, e) {
  return (t.y - o.y) * (e.x - t.x) - (t.x - o.x) * (e.y - t.y);
}
function Vg(o, t) {
  return o.x === t.x && o.y === t.y;
}
function cG(o, t, e, s) {
  let n = Q8(ea(o, t, e)),
    i = Q8(ea(o, t, s)),
    a = Q8(ea(e, s, o)),
    r = Q8(ea(e, s, t));
  return !!(
    (n !== i && a !== r) ||
    (n === 0 && Z8(o, e, t)) ||
    (i === 0 && Z8(o, s, t)) ||
    (a === 0 && Z8(e, o, s)) ||
    (r === 0 && Z8(e, t, s))
  );
}
function Z8(o, t, e) {
  return (
    t.x <= Math.max(o.x, e.x) &&
    t.x >= Math.min(o.x, e.x) &&
    t.y <= Math.max(o.y, e.y) &&
    t.y >= Math.min(o.y, e.y)
  );
}
function Q8(o) {
  return o > 0 ? 1 : o < 0 ? -1 : 0;
}
