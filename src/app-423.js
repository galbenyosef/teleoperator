// app 423 — math
// Lines 205872-206137 of readable/app.pretty.js (statement-aligned).
function wot(o, t, e, s) {
  let n = s * 2.6;
  (o.beginPath(),
    o.arc(t, e, n, 0, Math.PI * 2),
    (o.fillStyle = "#ff3b3b"),
    o.fill(),
    (o.lineWidth = Math.max(1, s * 0.7)),
    (o.strokeStyle = "#ffffff"),
    o.stroke(),
    o.beginPath(),
    o.moveTo(t - n * 1.5, e - n * 1.5),
    o.lineTo(t + n * 1.5, e + n * 1.5),
    o.moveTo(t + n * 1.5, e - n * 1.5),
    o.lineTo(t - n * 1.5, e + n * 1.5),
    o.stroke());
}
es();
function Fkt(o) {
  let t = (o.sunEl * Math.PI) / 180,
    e = (o.sunAz * Math.PI) / 180;
  return [Math.sin(e) * Math.cos(t), Math.sin(t), -Math.cos(e) * Math.cos(t)];
}
function PN(o, t = 1024) {
  let e = t / 2,
    s = new Float32Array(t * e * 4),
    [n, i, a] = Fkt(o),
    r = o.zen,
    l = o.hor,
    c = o.ground,
    h = t >= 2048 ? 7 : t >= 1024 ? 6 : 4,
    f = Math.hypot(n, a) || 1,
    u = (n / f) * 0.1,
    d = (a / f) * 0.1,
    p = o.sunI / 3.2,
    m = [
      r[0] * 0.5 + l[0] * 0.5,
      r[1] * 0.5 + l[1] * 0.5,
      r[2] * 0.5 + l[2] * 0.5,
    ];
  for (let v = 0; v < e; v++) {
    let x = ((v + 0.5) / e) * Math.PI,
      y = Math.cos(x),
      M = Math.sin(x);
    for (let S = 0; S < t; S++) {
      let w = ((S + 0.5) / t - 0.5) * 2 * Math.PI,
        _ = Math.cos(w) * M,
        z = Math.sin(w) * M,
        A = _ * n + y * i + z * a,
        T,
        E,
        R;
      if (y >= 0) {
        let C = Math.pow(1 - y, 3.2 - o.haze * 1.6);
        ((T = r[0] + (l[0] - r[0]) * C),
          (E = r[1] + (l[1] - r[1]) * C),
          (R = r[2] + (l[2] - r[2]) * C));
        let I = Math.max(0, A),
          L =
            (Math.pow(I, 8) * (0.6 + o.haze) * 0.8 + Math.pow(I, 64) * 1.8) *
              (o.glow ?? 1) +
            (A > 0.99985 ? 60 : 0) * (1 - o.haze * 0.9) * (o.disc ?? 1);
        if (
          ((T += o.sun[0] * L * p),
          (E += o.sun[1] * L * p),
          (R += o.sun[2] * L * p),
          o.twi)
        ) {
          let H = Math.max(0, (_ * n + z * a) / f),
            N = Math.exp(-y * 7),
            D = Math.exp(-y * (o.twiHi ?? 2.2)),
            U = o.twiK ?? 1,
            G = Math.pow(H, 3) * N * U,
            W = Math.pow(H, 2) * D * 0.35 * (o.twiPink ?? 1) * U,
            V =
              Math.pow(Math.max(0, -(_ * n + z * a)), 2) *
              Math.exp(-y * 9) *
              0.1;
          ((T += o.twi[0] * G + 0.5 * W + 0.35 * V),
            (E += o.twi[1] * G + 0.2 * W + 0.2 * V),
            (R += o.twi[2] * G + 0.32 * W + 0.28 * V));
        }
        if (o.lp) {
          let H = Math.exp(-y * 5.5);
          ((T += o.lp[0] * H), (E += o.lp[1] * H), (R += o.lp[2] * H));
        }
        if (o.stars && t >= 2048) {
          let H = Math.floor(((S + 0.5) / t) * 4096),
            N = Math.floor(((v + 0.5) / e) * 2048);
          if (Y2(H * 0.7311 + 0.17, N * 1.3717 - 0.41) < 0.0035 * M) {
            let D = Y2(H + 3.1, N - 7.7),
              U = Math.min(1, Math.max(0, (y - 0.06) / 0.3)),
              G = o.stars * (0.15 + 3 * D ** 7) * U * U * Math.min(1, t / 3072),
              W = Y2(H - 1.3, N + 2.9);
            ((T += G * (0.85 + 0.25 * W)),
              (E += G * 0.92),
              (R += G * (1.1 - 0.2 * W)));
          }
        }
        if (o.moon) {
          let [H, N, D] = o.moon,
            U = (N * Math.PI) / 180,
            G = (H * Math.PI) / 180,
            W = Math.sin(G) * Math.cos(U),
            V = Math.sin(U),
            $ = -Math.cos(G) * Math.cos(U),
            J = Math.max(-1, Math.min(1, _ * W + y * V + z * $)),
            X = Math.acos(J),
            tt = 0.0105,
            Z = D * (0.006 * Math.exp(-X / 0.06) + 0.002 * Math.exp(-X / 0.3));
          if (
            ((T += Z * 0.8), (E += Z * 0.88), (R += Z * 1.05), X < tt * 1.15)
          ) {
            let q = Math.min(1, (tt * 1.15 - X) / (tt * 0.15)),
              j =
                0.72 +
                0.28 *
                  S1(_ * 900 + 3, (y + z) * 900) *
                  (0.6 + 0.4 * S1(_ * 2400, z * 2400 + 7)),
              K = 0.8 + 0.2 * Math.sqrt(Math.max(0, 1 - (X / tt) ** 2)),
              nt = D * q * j * K;
            ((T += (nt * 1 - T) * q),
              (E += (nt * 0.97 - E) * q),
              (R += (nt * 0.9 - R) * q));
          }
        }
        let F = Math.exp(-y * 18) * (0.25 + 0.6 * o.haze);
        ((T += o.fog[0] * F), (E += o.fog[1] * F), (R += o.fog[2] * F));
        let O =
            Okt(_ / (y + 0.08), z / (y + 0.08)) *
            Math.min(1, y * 5) *
            (1 - o.haze * 0.7) *
            (o.streaks ?? 1),
          B = 0.55 + 0.9 * I;
        if (
          ((T += O * (l[0] * B)),
          (E += O * (l[1] * B * 0.95)),
          (R += O * (l[2] * B * 0.92)),
          o.cumulus && y > 0.012)
        ) {
          let H = o.cloudScale ?? 1,
            N = (_ / (y + 0.1)) * H,
            D = (z / (y + 0.1)) * H,
            U = Mot(N, D, o.cumulus, h);
          if (U > 0) {
            let G = Mot(N + u, D + d, o.cumulus, Math.min(h, 4)),
              W = o.cloudEdge ?? 0.22,
              V =
                Math.min(1, U / W) ** 0.8 *
                Math.min(1, y * 12) *
                (1 - o.haze * 0.5),
              $ = Math.exp(-G * 3.2),
              J = Math.min(1, U * 1.6),
              X = Math.pow(I, 5) * (1 - Math.min(1, U * 2.5)) * 2.2,
              tt = 0.62 + 0.25 * (1 - J),
              Z = (0.5 + 0.5 * $) * p,
              q =
                m[0] * tt * 1.25 +
                (o.sun[0] * 0.95 * $ + X * o.sun[0]) *
                  p *
                  0.95 *
                  (1 - 0.3 * J) +
                0.05 * Z,
              j =
                m[1] * tt * 1.18 +
                (o.sun[1] * 0.95 * $ + X * o.sun[1]) *
                  p *
                  0.95 *
                  (1 - 0.3 * J) +
                0.05 * Z,
              K =
                m[2] * tt * 1.08 +
                (o.sun[2] * 0.95 * $ + X * o.sun[2]) *
                  p *
                  0.93 *
                  (1 - 0.3 * J) +
                0.05 * Z,
              nt =
                o.cloudLp && o.lp
                  ? o.cloudLp *
                    (0.45 + 0.55 * J) *
                    (0.5 + 0.5 * Math.exp(-y * 2.5))
                  : 0,
              Q = o.lp || [0, 0, 0],
              et = o.cloudK ?? 1;
            ((q *= et),
              (j *= et),
              (K *= et),
              (T += (q + Q[0] * nt - T) * V),
              (E += (j + Q[1] * nt - E) * V),
              (R += (K + Q[2] * nt - R) * V));
          }
        }
      } else {
        let C = Math.exp(y * 7);
        ((T = c[0] + (o.fog[0] * 0.8 - c[0]) * C),
          (E = c[1] + (o.fog[1] * 0.8 - c[1]) * C),
          (R = c[2] + (o.fog[2] * 0.8 - c[2]) * C));
        let I = ((Math.max(0, A) * o.sunI) / 3) * 0.04;
        ((T += o.sun[0] * I), (E += o.sun[1] * I), (R += o.sun[2] * I));
      }
      let P = (v * t + S) * 4;
      ((s[P] = T), (s[P + 1] = E), (s[P + 2] = R), (s[P + 3] = 1));
    }
  }
  let g = Math.floor(e / 2) - Math.max(1, Math.round(e / 90)),
    b = new Float32Array(t * 3);
  for (let v = 0; v < t; v++) {
    let x = (g * t + v) * 4;
    ((b[v * 3] = s[x]), (b[v * 3 + 1] = s[x + 1]), (b[v * 3 + 2] = s[x + 2]));
  }
  return { data: s, hz: b };
}
var Y2 = (o, t) => {
  let e = Math.sin(o * 12.9898 + t * 78.233) * 43758.5453;
  return e - Math.floor(e);
};
function S1(o, t) {
  let e = Math.floor(o),
    s = Math.floor(t),
    n = o - e,
    i = t - s,
    a = n * n * (3 - 2 * n),
    r = i * i * (3 - 2 * i);
  return (
    (Y2(e, s) * (1 - a) + Y2(e + 1, s) * a) * (1 - r) +
    (Y2(e, s + 1) * (1 - a) + Y2(e + 1, s + 1) * a) * r
  );
}
function Mot(o, t, e, s = 5) {
  let n = o + 0.35 * S1(o * 0.7 + 5.2, t * 0.7 - 1.3),
    i = t + 0.35 * S1(o * 0.7 - 7.7, t * 0.7 + 2.9),
    a = 0,
    r = 0.5,
    l = 1.1;
  for (let c = 0; c < s; c++) {
    let h = S1(n * l + c * 7.1, i * l - c * 3.7);
    ((a += (c < 2 ? h : 1 - Math.abs(2 * h - 1)) * r), (r *= 0.5), (l *= 2.13));
  }
  return Math.max(0, a - (0.8 - e * 0.45)) * 2.4;
}
function Okt(o, t) {
  let e =
    S1(o * 0.6, t * 2.2) * 0.6 +
    S1(o * 1.7, t * 5.1) * 0.3 +
    S1(o * 4, t * 11) * 0.1;
  return Math.max(0, e - 0.52) * 1.6;
}
var Sot = new Float32Array(1),
  Bkt = new Uint32Array(Sot.buffer);
function Nkt(o) {
  Sot[0] = o;
  let t = Bkt[0],
    e = (t >>> 16) & 32768,
    s = ((t >>> 23) & 255) - 112,
    n = t & 8388607;
  return s <= 0
    ? e
    : s >= 31
      ? e | 31743
      : e | Math.min(31743, (s << 10) + ((n + 4096) >>> 13));
}
function kot(o, t = 6e4) {
  let e = new Uint16Array(o.length);
  for (let s = 0; s < o.length; s++) e[s] = Nkt(Math.min(o[s], t));
  return e;
}
