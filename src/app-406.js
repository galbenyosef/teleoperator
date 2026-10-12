// app 406 — math
// Lines 197986-198251 of readable/app.pretty.js (statement-aligned).
function lst(i, t, e, s) {
  let n = s * 2.6;
  (i.beginPath(),
    i.arc(t, e, n, 0, Math.PI * 2),
    (i.fillStyle = "#ff3b3b"),
    i.fill(),
    (i.lineWidth = Math.max(1, s * 0.7)),
    (i.strokeStyle = "#ffffff"),
    i.stroke(),
    i.beginPath(),
    i.moveTo(t - n * 1.5, e - n * 1.5),
    i.lineTo(t + n * 1.5, e + n * 1.5),
    i.moveTo(t + n * 1.5, e - n * 1.5),
    i.lineTo(t - n * 1.5, e + n * 1.5),
    i.stroke());
}
as();
function GMt(i) {
  let t = (i.sunEl * Math.PI) / 180,
    e = (i.sunAz * Math.PI) / 180;
  return [Math.sin(e) * Math.cos(t), Math.sin(t), -Math.cos(e) * Math.cos(t)];
}
function RN(i, t = 1024) {
  let e = t / 2,
    s = new Float32Array(t * e * 4),
    [n, o, a] = GMt(i),
    r = i.zen,
    l = i.hor,
    c = i.ground,
    h = t >= 2048 ? 7 : t >= 1024 ? 6 : 4,
    f = Math.hypot(n, a) || 1,
    u = (n / f) * 0.1,
    d = (a / f) * 0.1,
    p = i.sunI / 3.2,
    m = [
      r[0] * 0.5 + l[0] * 0.5,
      r[1] * 0.5 + l[1] * 0.5,
      r[2] * 0.5 + l[2] * 0.5,
    ];
  for (let x = 0; x < e; x++) {
    let v = ((x + 0.5) / e) * Math.PI,
      y = Math.cos(v),
      M = Math.sin(v);
    for (let S = 0; S < t; S++) {
      let w = ((S + 0.5) / t - 0.5) * 2 * Math.PI,
        z = Math.cos(w) * M,
        _ = Math.sin(w) * M,
        R = z * n + y * o + _ * a,
        T,
        E,
        A;
      if (y >= 0) {
        let P = Math.pow(1 - y, 3.2 - i.haze * 1.6);
        ((T = r[0] + (l[0] - r[0]) * P),
          (E = r[1] + (l[1] - r[1]) * P),
          (A = r[2] + (l[2] - r[2]) * P));
        let I = Math.max(0, R),
          L =
            (Math.pow(I, 8) * (0.6 + i.haze) * 0.8 + Math.pow(I, 64) * 1.8) *
              (i.glow ?? 1) +
            (R > 0.99985 ? 60 : 0) * (1 - i.haze * 0.9) * (i.disc ?? 1);
        if (
          ((T += i.sun[0] * L * p),
          (E += i.sun[1] * L * p),
          (A += i.sun[2] * L * p),
          i.twi)
        ) {
          let H = Math.max(0, (z * n + _ * a) / f),
            O = Math.exp(-y * 7),
            D = Math.exp(-y * (i.twiHi ?? 2.2)),
            U = i.twiK ?? 1,
            G = Math.pow(H, 3) * O * U,
            q = Math.pow(H, 2) * D * 0.35 * (i.twiPink ?? 1) * U,
            W =
              Math.pow(Math.max(0, -(z * n + _ * a)), 2) *
              Math.exp(-y * 9) *
              0.1;
          ((T += i.twi[0] * G + 0.5 * q + 0.35 * W),
            (E += i.twi[1] * G + 0.2 * q + 0.2 * W),
            (A += i.twi[2] * G + 0.32 * q + 0.28 * W));
        }
        if (i.lp) {
          let H = Math.exp(-y * 5.5);
          ((T += i.lp[0] * H), (E += i.lp[1] * H), (A += i.lp[2] * H));
        }
        if (i.stars && t >= 2048) {
          let H = Math.floor(((S + 0.5) / t) * 4096),
            O = Math.floor(((x + 0.5) / e) * 2048);
          if (r2(H * 0.7311 + 0.17, O * 1.3717 - 0.41) < 0.0035 * M) {
            let D = r2(H + 3.1, O - 7.7),
              U = Math.min(1, Math.max(0, (y - 0.06) / 0.3)),
              G = i.stars * (0.15 + 3 * D ** 7) * U * U * Math.min(1, t / 3072),
              q = r2(H - 1.3, O + 2.9);
            ((T += G * (0.85 + 0.25 * q)),
              (E += G * 0.92),
              (A += G * (1.1 - 0.2 * q)));
          }
        }
        if (i.moon) {
          let [H, O, D] = i.moon,
            U = (O * Math.PI) / 180,
            G = (H * Math.PI) / 180,
            q = Math.sin(G) * Math.cos(U),
            W = Math.sin(U),
            V = -Math.cos(G) * Math.cos(U),
            Y = Math.max(-1, Math.min(1, z * q + y * W + _ * V)),
            $ = Math.acos(Y),
            st = 0.0105,
            Q = D * (0.006 * Math.exp(-$ / 0.06) + 0.002 * Math.exp(-$ / 0.3));
          if (
            ((T += Q * 0.8), (E += Q * 0.88), (A += Q * 1.05), $ < st * 1.15)
          ) {
            let j = Math.min(1, (st * 1.15 - $) / (st * 0.15)),
              X =
                0.72 +
                0.28 *
                  Up(z * 900 + 3, (y + _) * 900) *
                  (0.6 + 0.4 * Up(z * 2400, _ * 2400 + 7)),
              K = 0.8 + 0.2 * Math.sqrt(Math.max(0, 1 - ($ / st) ** 2)),
              nt = D * j * X * K;
            ((T += (nt * 1 - T) * j),
              (E += (nt * 0.97 - E) * j),
              (A += (nt * 0.9 - A) * j));
          }
        }
        let F = Math.exp(-y * 18) * (0.25 + 0.6 * i.haze);
        ((T += i.fog[0] * F), (E += i.fog[1] * F), (A += i.fog[2] * F));
        let N =
            WMt(z / (y + 0.08), _ / (y + 0.08)) *
            Math.min(1, y * 5) *
            (1 - i.haze * 0.7) *
            (i.streaks ?? 1),
          B = 0.55 + 0.9 * I;
        if (
          ((T += N * (l[0] * B)),
          (E += N * (l[1] * B * 0.95)),
          (A += N * (l[2] * B * 0.92)),
          i.cumulus && y > 0.012)
        ) {
          let H = i.cloudScale ?? 1,
            O = (z / (y + 0.1)) * H,
            D = (_ / (y + 0.1)) * H,
            U = cst(O, D, i.cumulus, h);
          if (U > 0) {
            let G = cst(O + u, D + d, i.cumulus, Math.min(h, 4)),
              q = i.cloudEdge ?? 0.22,
              W =
                Math.min(1, U / q) ** 0.8 *
                Math.min(1, y * 12) *
                (1 - i.haze * 0.5),
              V = Math.exp(-G * 3.2),
              Y = Math.min(1, U * 1.6),
              $ = Math.pow(I, 5) * (1 - Math.min(1, U * 2.5)) * 2.2,
              st = 0.62 + 0.25 * (1 - Y),
              Q = (0.5 + 0.5 * V) * p,
              j =
                m[0] * st * 1.25 +
                (i.sun[0] * 0.95 * V + $ * i.sun[0]) *
                  p *
                  0.95 *
                  (1 - 0.3 * Y) +
                0.05 * Q,
              X =
                m[1] * st * 1.18 +
                (i.sun[1] * 0.95 * V + $ * i.sun[1]) *
                  p *
                  0.95 *
                  (1 - 0.3 * Y) +
                0.05 * Q,
              K =
                m[2] * st * 1.08 +
                (i.sun[2] * 0.95 * V + $ * i.sun[2]) *
                  p *
                  0.93 *
                  (1 - 0.3 * Y) +
                0.05 * Q,
              nt =
                i.cloudLp && i.lp
                  ? i.cloudLp *
                    (0.45 + 0.55 * Y) *
                    (0.5 + 0.5 * Math.exp(-y * 2.5))
                  : 0,
              Z = i.lp || [0, 0, 0],
              et = i.cloudK ?? 1;
            ((j *= et),
              (X *= et),
              (K *= et),
              (T += (j + Z[0] * nt - T) * W),
              (E += (X + Z[1] * nt - E) * W),
              (A += (K + Z[2] * nt - A) * W));
          }
        }
      } else {
        let P = Math.exp(y * 7);
        ((T = c[0] + (i.fog[0] * 0.8 - c[0]) * P),
          (E = c[1] + (i.fog[1] * 0.8 - c[1]) * P),
          (A = c[2] + (i.fog[2] * 0.8 - c[2]) * P));
        let I = ((Math.max(0, R) * i.sunI) / 3) * 0.04;
        ((T += i.sun[0] * I), (E += i.sun[1] * I), (A += i.sun[2] * I));
      }
      let C = (x * t + S) * 4;
      ((s[C] = T), (s[C + 1] = E), (s[C + 2] = A), (s[C + 3] = 1));
    }
  }
  let g = Math.floor(e / 2) - Math.max(1, Math.round(e / 90)),
    b = new Float32Array(t * 3);
  for (let x = 0; x < t; x++) {
    let v = (g * t + x) * 4;
    ((b[x * 3] = s[v]), (b[x * 3 + 1] = s[v + 1]), (b[x * 3 + 2] = s[v + 2]));
  }
  return { data: s, hz: b };
}
var r2 = (i, t) => {
  let e = Math.sin(i * 12.9898 + t * 78.233) * 43758.5453;
  return e - Math.floor(e);
};
function Up(i, t) {
  let e = Math.floor(i),
    s = Math.floor(t),
    n = i - e,
    o = t - s,
    a = n * n * (3 - 2 * n),
    r = o * o * (3 - 2 * o);
  return (
    (r2(e, s) * (1 - a) + r2(e + 1, s) * a) * (1 - r) +
    (r2(e, s + 1) * (1 - a) + r2(e + 1, s + 1) * a) * r
  );
}
function cst(i, t, e, s = 5) {
  let n = i + 0.35 * Up(i * 0.7 + 5.2, t * 0.7 - 1.3),
    o = t + 0.35 * Up(i * 0.7 - 7.7, t * 0.7 + 2.9),
    a = 0,
    r = 0.5,
    l = 1.1;
  for (let c = 0; c < s; c++) {
    let h = Up(n * l + c * 7.1, o * l - c * 3.7);
    ((a += (c < 2 ? h : 1 - Math.abs(2 * h - 1)) * r), (r *= 0.5), (l *= 2.13));
  }
  return Math.max(0, a - (0.8 - e * 0.45)) * 2.4;
}
function WMt(i, t) {
  let e =
    Up(i * 0.6, t * 2.2) * 0.6 +
    Up(i * 1.7, t * 5.1) * 0.3 +
    Up(i * 4, t * 11) * 0.1;
  return Math.max(0, e - 0.52) * 1.6;
}
var hst = new Float32Array(1),
  qMt = new Uint32Array(hst.buffer);
function jMt(i) {
  hst[0] = i;
  let t = qMt[0],
    e = (t >>> 16) & 32768,
    s = ((t >>> 23) & 255) - 112,
    n = t & 8388607;
  return s <= 0
    ? e
    : s >= 31
      ? e | 31743
      : e | Math.min(31743, (s << 10) + ((n + 4096) >>> 13));
}
function fst(i, t = 6e4) {
  let e = new Uint16Array(i.length);
  for (let s = 0; s < i.length; s++) e[s] = jMt(Math.min(i[s], t));
  return e;
}
