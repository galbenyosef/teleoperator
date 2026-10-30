// app 177 — math
// Lines 103831-104171 of readable/app.pretty.js (statement-aligned).
function D2t(o, t, e, s) {
  let n = o.E,
    i = o.seed + s * 13,
    a = o.g("dress");
  if (!o.gy || Math.abs(o.gy((t + e) / 2) - o.gF) > 0.7) return;
  let r = Math.min(e - t - 0.6, 4.6);
  if (r < 1.6) return;
  let l = (t + e) / 2 - r / 2,
    c = 0.48,
    h = Math.floor(r / c),
    f = oo.PAINT;
  {
    let m = Iw(o, (t + e) / 2) + 0.5;
    if (o.solid && ![l, l + r / 2, l + r].every((g) => hz(o, g, m, -99, 3)))
      return;
  }
  let u = Mo([0.06, 0.06, 0.06], oo.STEEL),
    d = Mo([0.42, 0.33, 0.22], f),
    p = Mo([0.52, 0.42, 0.3], f);
  for (let m = 0; m < h; m++) {
    let g = l + m * (r / h) + 0.02,
      b = l + (m + 1) * (r / h) - 0.02,
      v = Iw(o, l + r / 2);
    if (!(Math.abs(o.gy((g + b) / 2) - o.gF) > 0.7)) {
      for (let [x, y, M] of [
        [0.15, 0.68, 0.95],
        [0.68, 1.28, 0.72],
      ]) {
        let S = gX[Math.floor(Ui(i + m * 7, 230 + M * 10) * gX.length)],
          w = 0.9 + 0.2 * Ui(i + m, 231 + M * 10);
        (ol(
          a,
          n,
          g,
          b,
          v + M - 0.2,
          v + M - 0.04,
          x + 0.02,
          y - 0.02,
          p,
          !1,
          !1,
        ),
          ol(
            a,
            n,
            g + 0.03,
            b - 0.03,
            v + M - 0.04,
            v + M + 0.03 + 0.04 * Ui(i + m, 232),
            x + 0.05,
            y - 0.05,
            Mo([S[0] * w, S[1] * w, S[2] * w], f),
            !1,
            !1,
          ));
      }
      if (m === 0 || m === h - 1)
        for (let x of [0.25, 1.15])
          ol(
            a,
            n,
            (m === 0 ? g : b) - 0.04,
            (m === 0 ? g : b) + 0.04,
            v,
            v + 0.75,
            x - 0.04,
            x + 0.04,
            u,
          );
    }
  }
  if (
    (ol(
      a,
      n,
      l,
      l + r,
      Iw(o, l + r / 2) + 0.49,
      Iw(o, l + r / 2) + 0.52,
      0.12,
      1.3,
      d,
    ),
    Ui(i, 233) < 0.6)
  ) {
    let m = Ui(i, 234) < 0.5 ? l - 0.05 : l + r + 0.6,
      g = Iw(o, m);
    if (m - 0.55 > 0.05 && m < n.l - 0.05)
      for (let b = 0; b < 2 + Math.floor(Ui(i, 235) * 3); b++)
        ol(
          a,
          n,
          m - 0.55,
          m - 0.05,
          g + b * 0.32,
          g + b * 0.32 + 0.3,
          0.2 + 0.06 * (b % 2),
          0.75 + 0.06 * (b % 2),
          p,
        );
  }
}
var Iw = (o, t) => o.gy(t);
function U2t(o, t) {
  let e = o.E,
    s = o.seed,
    n = e.l / Math.max(0.001, o.uB - o.uA),
    i = o.gF;
  if (o.top - i < 5.5) return;
  let a = [0];
  for (let c = Math.ceil(o.uA + 0.001); c < o.uB - 0.001; c++)
    a.push((c - o.uA) * n);
  a.push(e.l);
  let r = 0;
  if (o.L && !o.flank) {
    let c = (o.ax + o.bx) / 2 + e.nx * 5,
      h = (o.az + o.bz) / 2 + e.nz * 5,
      f = o.L.roadAt(c, h, 14);
    r = (f && H2t[f.E.name]) || 0;
  }
  if (r)
    for (let c = 0; c + 1 < a.length; c++)
      a[c + 1] - a[c] >= 2.2 &&
        Ui(s + c * 13, 236) < r &&
        D2t(o, a[c], a[c + 1], c);
  let l = (t?.awnings?.length || 0) + (t?.eaves?.length || 0) > 0;
  for (let c = 0; c + 1 < a.length; c++) {
    let h = a[c],
      f = a[c + 1],
      u = f - h;
    if (u < 2.2) continue;
    if (Ui(s + c * 13, 201) < 0.85) {
      let p = Math.min(u - 0.5, 5.5),
        m = (h + f) / 2;
      N2t(
        o,
        m - p / 2,
        m + p / 2,
        i + 3,
        i + 3 + Math.min(0.95, p * 0.24),
        10 + Math.floor(Ui(s + c, 202) * 6),
      );
    }
    if (
      (!l &&
        Ui(s + c * 13, 203) < 0.75 &&
        KC(o, h + 0.3, f - 0.3, i + 2.3, i + 2.85, {
          lc: mX[Math.floor(Ui(s + c, 204) * mX.length)],
        }),
      Ui(s + c * 13, 205) < 0.6 && o.top - i > 7)
    ) {
      let p = 2.4 + 1 * Ui(s + c, 206);
      fz(
        o,
        (h + f) / 2 + (Ui(s + c, 207) - 0.5) * 1.2,
        i + 4,
        Math.min(p, o.top - i - 4.6),
        0.66,
        0.3,
        Math.floor(Ui(s + c, 208) * 10),
        oo.CSIGN,
      );
    }
  }
  for (let c = 1; c + 1 < a.length; c++)
    Ui(s + c * 17, 210) < 0.4 &&
      o.top - i > 10.5 &&
      fz(
        o,
        a[c],
        i + 7.3,
        2.4 + 0.6 * Ui(s + c, 211),
        0.6,
        0.3,
        Math.floor(Ui(s + c, 212) * 10),
        oo.CSIGN,
      );
}
var G2t = new Set(["chn"]),
  V2t = new Set(["mix", "nb", "chn"]);
function kX(o) {
  let t = o.cell.dress,
    e = (o.E = bX(o.ax, o.az, o.bx, o.bz)),
    s = G2t.has(o.cell.style),
    n = o.seed;
  o.dn = Di((o.ax + o.bx) / 2, (o.az + o.bz) / 2);
  let i = !o.flank && !o.cut && o.dn === "chinatown";
  if (t) {
    t.cornice != null && o.cornice && P2t(o, t.cornice, t.cc);
    for (let r of t.bays || [])
      for (let [l, c] of Xm(o, r.r[0], r.r[1])) A2t(o, l, c, r);
    let a = (r) => Math.max(0, o.gF + 2.3 - r[0]);
    for (let r of t.awnings || [])
      for (let [l, c] of Xm(o, r.r[0], r.r[1]))
        for (let h of Sx(o, r.r[2], r.r[3]))
          h[4] &&
            h[5] &&
            h[0] > o.gF + 1 &&
            KC(o, l, c, h[0] + a(h), h[1] + a(h), r);
    for (let r of t.eaves || [])
      for (let [l, c] of Xm(o, r.r[0], r.r[1]))
        for (let h of Sx(o, r.r[2], r.r[3]))
          h[4] &&
            h[5] &&
            h[0] > o.gF + 1 &&
            xX(o, l, c, h[0] + a(h), h[1] + a(h), r);
    for (let r of t.fire || [])
      for (let [l, c] of Xm(o, r.r[0], r.r[1])) C2t(o, l, c, r, s);
    for (let r of t.balc || [])
      for (let [l, c] of Xm(o, r.r[0], r.r[1]))
        L2t(o, l, c, r, s || (r.lc && r.lc[0] > 0.08 && r.lc[0] > 2 * r.lc[2]));
    for (let [r, l] of t.lanterns || [])
      for (let [c, , h] of Xm(o, r, r))
        for (let f of _f(o, l))
          f > o.gF + 2.6 &&
            f < o.gF + 11 &&
            Ui(n + h * 7, Math.round(f * 3 + r * 50)) < 0.6 &&
            I2t(o, c, f, 0.45);
    if (t.wins && o.st !== 0 && o.st !== 1) {
      let r =
        o.cell.style === "pal" || o.cell.style === "bank"
          ? 0.02
          : s
            ? 0.1
            : 0.06;
      t.wins.forEach((l, c) => {
        for (let [h, f, u] of Xm(o, l[0], l[1]))
          for (let d of _f(o, l[2]))
            d < o.gF + 4.5 ||
              d > o.top - 2 ||
              f - h < 0.55 ||
              Ui(n + u * 131 + Math.round(d), c) > r ||
              (t.fire || []).some(
                (p) =>
                  l[0] < p.r[1] &&
                  l[1] > p.r[0] &&
                  l[2] < p.r[3] &&
                  l[3] > p.r[2],
              ) ||
              F2t(o, (h + f) / 2, d + 0.02);
      });
    }
  }
  if (
    (i && U2t(o, t),
    (V2t.has(o.cell.style) || o.shop || i) && !o.flank && !o.cut)
  )
    for (let a = Math.ceil(o.uA + 0.001); a < o.uB - 0.001; a++) {
      let r = ((a - o.uA) / (o.uB - o.uA)) * e.l;
      if (
        r < 0.8 ||
        r > e.l - 0.8 ||
        Ui(n + a * 17, 77) >
          (i ? 0.85 : s ? 0.75 : (O2t[o.dn] ?? (SX[o.dn] > 0.45 ? 0.62 : 0.45)))
      )
        continue;
      let l = Ui(n + a * 17, 78),
        c = t?.balc?.length > 0,
        h = s || i ? 2.2 + 0.8 * l : 1.1 + 0.6 * l,
        f = s || i ? 0.6 : 0.7 + 0.25 * l,
        u = o.gF + (s || i ? 3.8 : 3.3 + 0.4 * l) + (o.shop ? 2.2 : 0);
      if (u + h > o.top - 0.5) continue;
      let d = i
        ? Math.floor(Ui(n + a, 79) * 10)
        : s
          ? 8 + Math.floor(Ui(n + a, 79) * 7)
          : [0, 1, 2, 3, 4, 5, 6, 7, 15][Math.floor(Ui(n + a, 79) * 9)];
      fz(o, r, u, h, f, c ? 0.95 : 0.25, d, i ? oo.CSIGN : oo.SIGN);
    }
  if (o.pipe && o.st !== 0 && !o.cut) {
    let a = o.pipe > 0 ? 0.18 : e.l - 0.18;
    (r0(
      o.g("dress"),
      e.P(a, o.gF, 0.09),
      e.P(a, o.top - 0.15, 0.09),
      0.05,
      Mo(
        Ui(n, 90) < 0.5
          ? [0.05, 0.05, 0.05]
          : o.fcol.slice(0, 3).map((r) => r * 0.25),
        oo.STEEL,
      ),
    ),
      ol(
        o.g("dress"),
        e,
        a - 0.12,
        a + 0.12,
        o.top - 0.45,
        o.top - 0.15,
        0,
        0.22,
        Mo([0.06, 0.06, 0.06], oo.STEEL),
      ));
  }
  if (o.flag && !o.cut && (o.cell.style === "pal" || o.cell.style === "bank")) {
    let a = e.l / 2;
    o.top - o.gF > 12 && B2t(o, a, o.gF + 5.4, Math.floor(Ui(n, 91) * 4));
  }
}
function zX(o, t, e, s, n, i, a, r, l, c = null, h = null) {
  let f = a.dress,
    u = bX(t, e, s, n),
    d = {
      g: o,
      E: u,
      gy: c,
      solid: h,
      dn: Di((t + s) / 2, (e + n) / 2),
      uA: 0,
      uB: 1,
      u0: 0,
      nm: 1,
      mirror: 0,
      secs: [[i, i + 4.8, 0, 1]],
      cell: a,
      gF: i,
      top: i + 4.8,
      st: 2,
      seed: r,
    };
  if (f) {
    for (let p of f.awnings || [])
      KC(d, p.r[0] * u.l, p.r[1] * u.l, i + p.r[2] * 4.8, i + p.r[3] * 4.8, p);
    for (let p of f.eaves || [])
      xX(d, p.r[0] * u.l, p.r[1] * u.l, i + p.r[2] * 4.8, i + p.r[3] * 4.8, p);
  }
  if (!l && Ui(r, 55) < 0.5) {
    let p = Ui(r, 56);
    fz(
      d,
      0,
      i + 3.4 + 0.3 * p,
      1.1 + 0.5 * p,
      0.75,
      0.25,
      [0, 1, 2, 3, 4, 5, 6, 7, 15][Math.floor(Ui(r, 57) * 9)],
    );
  }
}
