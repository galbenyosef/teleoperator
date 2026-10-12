// app 06 — next
// Lines 1467-1804 of readable/app.pretty.js (statement-aligned).
function p3(i, t, e, s, n, o, a) {
  if (!i) return;
  !a && o && mit(i, s, n, o);
  let r = i;
  for (; i.prev !== i.next;) {
    let l = i.prev,
      c = i.next;
    if (o ? rit(i, s, n, o) : ait(i)) {
      (t.push(l.i, i.i, c.i), g3(i), (i = c.next), (r = c.next));
      continue;
    }
    if (((i = c), i === r)) {
      a
        ? a === 1
          ? ((i = lit(E1(i), t)), p3(i, t, e, s, n, o, 2))
          : a === 2 && cit(i, t, e, s, n, o)
        : p3(E1(i), t, e, s, n, o, 1);
      break;
    }
  }
}
function ait(i) {
  let t = i.prev,
    e = i,
    s = i.next;
  if (jo(t, e, s) >= 0) return !1;
  let n = t.x,
    o = e.x,
    a = s.x,
    r = t.y,
    l = e.y,
    c = s.y,
    h = Math.min(n, o, a),
    f = Math.min(r, l, c),
    u = Math.max(n, o, a),
    d = Math.max(r, l, c),
    p = s.next;
  for (; p !== t;) {
    if (
      p.x >= h &&
      p.x <= u &&
      p.y >= f &&
      p.y <= d &&
      Gv(n, r, o, l, a, c, p.x, p.y) &&
      jo(p.prev, p, p.next) >= 0
    )
      return !1;
    p = p.next;
  }
  return !0;
}
function rit(i, t, e, s) {
  let n = i.prev,
    o = i,
    a = i.next;
  if (jo(n, o, a) >= 0) return !1;
  let r = n.x,
    l = o.x,
    c = a.x,
    h = n.y,
    f = o.y,
    u = a.y,
    d = Math.min(r, l, c),
    p = Math.min(h, f, u),
    m = Math.max(r, l, c),
    g = Math.max(h, f, u),
    b = S9(d, p, t, e, s),
    x = S9(m, g, t, e, s),
    v = i.prevZ,
    y = i.nextZ;
  for (; v && v.z >= b && y && y.z <= x;) {
    if (
      (v.x >= d &&
        v.x <= m &&
        v.y >= p &&
        v.y <= g &&
        v !== n &&
        v !== a &&
        Gv(r, h, l, f, c, u, v.x, v.y) &&
        jo(v.prev, v, v.next) >= 0) ||
      ((v = v.prevZ),
      y.x >= d &&
        y.x <= m &&
        y.y >= p &&
        y.y <= g &&
        y !== n &&
        y !== a &&
        Gv(r, h, l, f, c, u, y.x, y.y) &&
        jo(y.prev, y, y.next) >= 0)
    )
      return !1;
    y = y.nextZ;
  }
  for (; v && v.z >= b;) {
    if (
      v.x >= d &&
      v.x <= m &&
      v.y >= p &&
      v.y <= g &&
      v !== n &&
      v !== a &&
      Gv(r, h, l, f, c, u, v.x, v.y) &&
      jo(v.prev, v, v.next) >= 0
    )
      return !1;
    v = v.prevZ;
  }
  for (; y && y.z <= x;) {
    if (
      y.x >= d &&
      y.x <= m &&
      y.y >= p &&
      y.y <= g &&
      y !== n &&
      y !== a &&
      Gv(r, h, l, f, c, u, y.x, y.y) &&
      jo(y.prev, y, y.next) >= 0
    )
      return !1;
    y = y.nextZ;
  }
  return !0;
}
function lit(i, t) {
  let e = i;
  do {
    let s = e.prev,
      n = e.next.next;
    (!Q2(s, n) &&
      aD(s, e, e.next, n) &&
      m3(s, n) &&
      m3(n, s) &&
      (t.push(s.i, e.i, n.i), g3(e), g3(e.next), (e = i = n)),
      (e = e.next));
  } while (e !== i);
  return E1(e);
}
function cit(i, t, e, s, n, o) {
  let a = i;
  do {
    let r = a.next.next;
    for (; r !== a.prev;) {
      if (a.i !== r.i && xit(a, r)) {
        let l = rD(a, r);
        ((a = E1(a, a.next)),
          (l = E1(l, l.next)),
          p3(a, t, e, s, n, o, 0),
          p3(l, t, e, s, n, o, 0));
        return;
      }
      r = r.next;
    }
    a = a.next;
  } while (a !== i);
}
function hit(i, t, e, s) {
  let n = [];
  for (let o = 0, a = t.length; o < a; o++) {
    let r = t[o] * s,
      l = o < a - 1 ? t[o + 1] * s : i.length,
      c = iD(i, r, l, s, !1);
    (c === c.next && (c.steiner = !0), n.push(bit(c)));
  }
  n.sort(fit);
  for (let o = 0; o < n.length; o++) e = uit(n[o], e);
  return e;
}
function fit(i, t) {
  let e = i.x - t.x;
  if (e === 0 && ((e = i.y - t.y), e === 0)) {
    let s = (i.next.y - i.y) / (i.next.x - i.x),
      n = (t.next.y - t.y) / (t.next.x - t.x);
    e = s - n;
  }
  return e;
}
function uit(i, t) {
  let e = dit(i, t);
  if (!e) return t;
  let s = rD(e, i);
  return (E1(s, s.next), E1(e, e.next));
}
function dit(i, t) {
  let e = t,
    s = i.x,
    n = i.y,
    o = -1 / 0,
    a;
  if (Q2(i, e)) return e;
  do {
    if (Q2(i, e.next)) return e.next;
    if (n <= e.y && n >= e.next.y && e.next.y !== e.y) {
      let f = e.x + ((n - e.y) * (e.next.x - e.x)) / (e.next.y - e.y);
      if (
        f <= s &&
        f > o &&
        ((o = f), (a = e.x < e.next.x ? e : e.next), f === s)
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
      oD(n < c ? s : o, n, l, c, n < c ? o : s, n, e.x, e.y)
    ) {
      let f = Math.abs(n - e.y) / (s - e.x);
      m3(e, i) &&
        (f < h || (f === h && (e.x > a.x || (e.x === a.x && pit(a, e))))) &&
        ((a = e), (h = f));
    }
    e = e.next;
  } while (e !== r);
  return a;
}
function pit(i, t) {
  return jo(i.prev, i, t.prev) < 0 && jo(t.next, i, i.next) < 0;
}
function mit(i, t, e, s) {
  let n = i;
  do
    (n.z === 0 && (n.z = S9(n.x, n.y, t, e, s)),
      (n.prevZ = n.prev),
      (n.nextZ = n.next),
      (n = n.next));
  while (n !== i);
  ((n.prevZ.nextZ = null), (n.prevZ = null), git(n));
}
function git(i) {
  let t,
    e = 1;
  do {
    let s = i,
      n;
    i = null;
    let o = null;
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
          o ? (o.nextZ = n) : (i = n),
          (n.prevZ = o),
          (o = n));
      s = a;
    }
    ((o.nextZ = null), (e *= 2));
  } while (t > 1);
  return i;
}
function S9(i, t, e, s, n) {
  return (
    (i = ((i - e) * n) | 0),
    (t = ((t - s) * n) | 0),
    (i = (i | (i << 8)) & 16711935),
    (i = (i | (i << 4)) & 252645135),
    (i = (i | (i << 2)) & 858993459),
    (i = (i | (i << 1)) & 1431655765),
    (t = (t | (t << 8)) & 16711935),
    (t = (t | (t << 4)) & 252645135),
    (t = (t | (t << 2)) & 858993459),
    (t = (t | (t << 1)) & 1431655765),
    i | (t << 1)
  );
}
function bit(i) {
  let t = i,
    e = i;
  do ((t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next));
  while (t !== i);
  return e;
}
function oD(i, t, e, s, n, o, a, r) {
  return (
    (n - a) * (t - r) >= (i - a) * (o - r) &&
    (i - a) * (s - r) >= (e - a) * (t - r) &&
    (e - a) * (o - r) >= (n - a) * (s - r)
  );
}
function Gv(i, t, e, s, n, o, a, r) {
  return !(i === a && t === r) && oD(i, t, e, s, n, o, a, r);
}
function xit(i, t) {
  return (
    i.next.i !== t.i &&
    i.prev.i !== t.i &&
    !vit(i, t) &&
    ((m3(i, t) &&
      m3(t, i) &&
      yit(i, t) &&
      (jo(i.prev, i, t.prev) || jo(i, t.prev, t))) ||
      (Q2(i, t) && jo(i.prev, i, i.next) > 0 && jo(t.prev, t, t.next) > 0))
  );
}
function jo(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function Q2(i, t) {
  return i.x === t.x && i.y === t.y;
}
function aD(i, t, e, s) {
  let n = J4(jo(i, t, e)),
    o = J4(jo(i, t, s)),
    a = J4(jo(e, s, i)),
    r = J4(jo(e, s, t));
  return !!(
    (n !== o && a !== r) ||
    (n === 0 && Y4(i, e, t)) ||
    (o === 0 && Y4(i, s, t)) ||
    (a === 0 && Y4(e, i, s)) ||
    (r === 0 && Y4(e, t, s))
  );
}
function Y4(i, t, e) {
  return (
    t.x <= Math.max(i.x, e.x) &&
    t.x >= Math.min(i.x, e.x) &&
    t.y <= Math.max(i.y, e.y) &&
    t.y >= Math.min(i.y, e.y)
  );
}
function J4(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
