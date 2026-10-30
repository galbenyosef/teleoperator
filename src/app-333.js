// app 333 — math
// Lines 162991-163195 of readable/app.pretty.js (statement-aligned).
function kv(o, t) {
  return o <= 0 ? 0 : Math.sqrt(2 * t * o) * Math.min(1, 0.45 + o / 6);
}
function Tet(o, t, e) {
  return o * t < 0 && e > 0.1
    ? 0
    : o * t > 0
      ? 1
      : Zs(1 - (e - 0.12) / 0.28, 0, 1);
}
function UM() {
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
function GM(o, t, e, s, n, i, a, r, l, c = 0) {
  ((o.on = !0),
    (o.gap = t),
    (o.areq = e),
    (o.ttc = s),
    (o.vo = n),
    (o.kind = i),
    (o.d0 = a),
    (o.y = r),
    (o.c = l),
    (o.dMin = c));
}
function _Mt(o, t, e, s) {
  return Math.hypot(t - o, s - e);
}
var Ph = new Float64Array(8);
function dE(o, t, e, s, n, i, a) {
  let r = o.t;
  if (r === "circ") {
    let f = o.x - t,
      u = o.z - e,
      d = Math.abs(f * -n + u * s) - i,
      p = Math.abs(f * s + u * n) - a,
      m = d > 0 ? d : 0,
      g = p > 0 ? p : 0;
    return m * m + g * g < o.r * o.r;
  }
  let l = Ph,
    c = 4;
  if (r === "poly") ((l = o.pts), (c = l.length / 2));
  else if (r === "box")
    ((Ph[0] = o.x0),
      (Ph[1] = o.z0),
      (Ph[2] = o.x1),
      (Ph[3] = o.z0),
      (Ph[4] = o.x1),
      (Ph[5] = o.z1),
      (Ph[6] = o.x0),
      (Ph[7] = o.z1));
  else {
    let f = o.c,
      u = -o.s,
      d = o.s,
      p = o.c,
      m = 0;
    for (let g = -1; g <= 1; g += 2)
      for (let b = -1; b <= 1; b += 2) {
        let v = g,
          x = g * b;
        ((Ph[m++] = o.x + f * o.hx * v + d * o.hz * x),
          (Ph[m++] = o.z + u * o.hx * v + p * o.hz * x));
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
      v = (m - t) * s + (g - e) * n,
      x = (d - t) * -n + (p - e) * s,
      y = (d - t) * s + (p - e) * n;
    if (EMt(b, v, x, y, i, a)) return !0;
  }
  return h;
}
function EMt(o, t, e, s, n, i) {
  let a = 0,
    r = 1,
    l,
    c,
    h,
    f = e - o,
    u = s - t;
  if (((l = -f), (c = o + n), l === 0)) {
    if (c < 0) return !1;
  } else if (((h = c / l), l < 0)) {
    if (h > r) return !1;
    h > a && (a = h);
  } else {
    if (h < a) return !1;
    h < r && (r = h);
  }
  if (((l = f), (c = n - o), l === 0)) {
    if (c < 0) return !1;
  } else if (((h = c / l), l < 0)) {
    if (h > r) return !1;
    h > a && (a = h);
  } else {
    if (h < a) return !1;
    h < r && (r = h);
  }
  if (((l = -u), (c = t + i), l === 0)) {
    if (c < 0) return !1;
  } else if (((h = c / l), l < 0)) {
    if (h > r) return !1;
    h > a && (a = h);
  } else {
    if (h < a) return !1;
    h < r && (r = h);
  }
  if (((l = u), (c = i - t), l === 0)) {
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
es();
var o1 = 36,
  Cet = 1.8,
  mE = 5,
  TMt = 22,
  RMt = 75,
  Let = 14,
  AMt = {
    green: new It("#1fe07a"),
    orange: new It("#ffa12e"),
    red: new It("#ff3a3a"),
    brake: new It("#ff3a3a"),
  },
  YO = 1.2,
  gE = 1.3,
  qM = 0.7,
  bE = 0.6,
  _v = (qM + bE) / 2,
  PMt = [-gE, 0, -gE, 0, gE, gE],
  CMt = [_v - qM, _v, _v - qM - bE, _v - bE, _v - qM, _v - qM - bE],
  LMt = [0, 1, 2, 2, 1, 3, 4, 5, 1, 5, 3, 1],
  IMt = 0.04;
function FMt(o) {
  if (typeof document > "u") return null;
  let t = 128,
    e = document.createElement("canvas");
  e.width = e.height = t;
  let s = e.getContext("2d"),
    n = t / 2,
    i = s.createRadialGradient(n, n, t * 0.3, n, n, t * 0.5);
  (i.addColorStop(0, "rgba(61,255,160,0.85)"),
    i.addColorStop(0.35, "rgba(61,255,160,0.35)"),
    i.addColorStop(1, "rgba(61,255,160,0)"),
    (s.fillStyle = i),
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
    s.scale(o, 1),
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
  return ((a.colorSpace = Je), a);
}
