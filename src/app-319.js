// app 319 — math
// Lines 157342-157546 of readable/app.pretty.js (statement-aligned).
function Fx(i, t) {
  return i <= 0 ? 0 : Math.sqrt(2 * t * i) * Math.min(1, 0.45 + i / 6);
}
function FZ(i, t, e) {
  return i * t < 0 && e > 0.1
    ? 0
    : i * t > 0
      ? 1
      : $s(1 - (e - 0.12) / 0.28, 0, 1);
}
function Hw() {
  return {
    on: !1,
    gap: 0,
    areq: 0,
    ttc: 99,
    vo: 0,
    kind: "",
    d0: 0,
    y: 0,
    alt: 0,
    c: null,
    dMin: 0,
  };
}
function Dw(i, t, e, s, n, o, a, r, l, c = 0) {
  ((i.on = !0),
    (i.gap = t),
    (i.areq = e),
    (i.ttc = s),
    (i.vo = n),
    (i.kind = o),
    (i.d0 = a),
    (i.y = r),
    (i.c = l),
    (i.dMin = c));
}
function n3t(i, t, e, s) {
  return Math.hypot(t - i, s - e);
}
var sh = new Float64Array(8);
function Y_(i, t, e, s, n, o, a) {
  let r = i.t;
  if (r === "circ") {
    let f = i.x - t,
      u = i.z - e,
      d = Math.abs(f * -n + u * s) - o,
      p = Math.abs(f * s + u * n) - a,
      m = d > 0 ? d : 0,
      g = p > 0 ? p : 0;
    return m * m + g * g < i.r * i.r;
  }
  let l = sh,
    c = 4;
  if (r === "poly") ((l = i.pts), (c = l.length / 2));
  else if (r === "box")
    ((sh[0] = i.x0),
      (sh[1] = i.z0),
      (sh[2] = i.x1),
      (sh[3] = i.z0),
      (sh[4] = i.x1),
      (sh[5] = i.z1),
      (sh[6] = i.x0),
      (sh[7] = i.z1));
  else {
    let f = i.c,
      u = -i.s,
      d = i.s,
      p = i.c,
      m = 0;
    for (let g = -1; g <= 1; g += 2)
      for (let b = -1; b <= 1; b += 2) {
        let x = g,
          v = g * b;
        ((sh[m++] = i.x + f * i.hx * x + d * i.hz * v),
          (sh[m++] = i.z + u * i.hx * x + p * i.hz * v));
      }
  }
  let h = !1;
  for (let f = 0, u = c - 1; f < c; u = f++) {
    let d = l[f * 2],
      p = l[f * 2 + 1],
      m = l[u * 2],
      g = l[u * 2 + 1];
    p > e != g > e && t < ((m - d) * (e - p)) / (g - p) + d && (h = !h);
    let b = (m - t) * -n + (g - e) * s,
      x = (m - t) * s + (g - e) * n,
      v = (d - t) * -n + (p - e) * s,
      y = (d - t) * s + (p - e) * n;
    if (i3t(b, x, v, y, o, a)) return !0;
  }
  return h;
}
function i3t(i, t, e, s, n, o) {
  let a = 0,
    r = 1,
    l,
    c,
    h,
    f = e - i,
    u = s - t;
  if (((l = -f), (c = i + n), l === 0)) {
    if (c < 0) return !1;
  } else if (((h = c / l), l < 0)) {
    if (h > r) return !1;
    h > a && (a = h);
  } else {
    if (h < a) return !1;
    h < r && (r = h);
  }
  if (((l = f), (c = n - i), l === 0)) {
    if (c < 0) return !1;
  } else if (((h = c / l), l < 0)) {
    if (h > r) return !1;
    h > a && (a = h);
  } else {
    if (h < a) return !1;
    h < r && (r = h);
  }
  if (((l = -u), (c = t + o), l === 0)) {
    if (c < 0) return !1;
  } else if (((h = c / l), l < 0)) {
    if (h > r) return !1;
    h > a && (a = h);
  } else {
    if (h < a) return !1;
    h < r && (r = h);
  }
  if (((l = u), (c = o - t), l === 0)) {
    if (c < 0) return !1;
  } else if (((h = c / l), l < 0)) {
    if (h > r) return !1;
    h > a && (a = h);
  } else {
    if (h < a) return !1;
    h < r && (r = h);
  }
  return a <= r;
}
as();
var wp = 36,
  HZ = 1.8,
  Z_ = 5,
  o3t = 22,
  a3t = 75,
  DZ = 14,
  r3t = {
    green: new $t("#1fe07a"),
    orange: new $t("#ffa12e"),
    red: new $t("#ff3a3a"),
    brake: new $t("#ff3a3a"),
  },
  eF = 1.2,
  Q_ = 1.3,
  Ww = 0.7,
  tz = 0.6,
  Bx = (Ww + tz) / 2,
  l3t = [-Q_, 0, -Q_, 0, Q_, Q_],
  c3t = [Bx - Ww, Bx, Bx - Ww - tz, Bx - tz, Bx - Ww, Bx - Ww - tz],
  h3t = [0, 1, 2, 2, 1, 3, 4, 5, 1, 5, 3, 1],
  f3t = 0.04;
function u3t(i) {
  if (typeof document > "u") return null;
  let t = 128,
    e = document.createElement("canvas");
  e.width = e.height = t;
  let s = e.getContext("2d"),
    n = t / 2,
    o = s.createRadialGradient(n, n, t * 0.3, n, n, t * 0.5);
  (o.addColorStop(0, "rgba(61,255,160,0.85)"),
    o.addColorStop(0.35, "rgba(61,255,160,0.35)"),
    o.addColorStop(1, "rgba(61,255,160,0)"),
    (s.fillStyle = o),
    s.fillRect(0, 0, t, t),
    s.beginPath(),
    s.arc(n, n, t * 0.31, 0, Math.PI * 2),
    (s.fillStyle = "#ffffff"),
    s.fill(),
    (s.lineWidth = t * 0.025),
    (s.strokeStyle = "rgba(61,255,160,1)"),
    s.stroke(),
    s.save(),
    s.translate(n, n),
    s.scale(i, 1),
    (s.strokeStyle = "#163a2a"),
    (s.fillStyle = "#163a2a"),
    (s.lineWidth = t * 0.075),
    (s.lineCap = "round"),
    (s.lineJoin = "round"),
    s.beginPath(),
    s.moveTo(-t * 0.1, t * 0.2),
    s.lineTo(-t * 0.1, -t * 0.02),
    s.quadraticCurveTo(-t * 0.1, -t * 0.08, -t * 0.04, -t * 0.08),
    s.lineTo(t * 0.06, -t * 0.08),
    s.stroke(),
    s.beginPath(),
    s.moveTo(t * 0.17, -t * 0.08),
    s.lineTo(t * 0.04, -t * 0.19),
    s.lineTo(t * 0.04, t * 0.03),
    s.closePath(),
    s.fill(),
    s.restore());
  let a = new Sn(e);
  return ((a.colorSpace = is), a);
}
