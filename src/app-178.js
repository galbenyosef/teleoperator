// app 178 — math
// Lines 103595-103935 of readable/app.pretty.js (statement-aligned).
function gpt(i, t, e, s) {
  let n = i.E,
    o = i.seed + s * 13,
    a = i.g("dress");
  if (!i.gy || Math.abs(i.gy((t + e) / 2) - i.gF) > 0.7) return;
  let r = Math.min(e - t - 0.6, 4.6);
  if (r < 1.6) return;
  let l = (t + e) / 2 - r / 2,
    c = 0.48,
    h = Math.floor(r / c),
    f = Yi.PAINT;
  {
    let m = Dy(i, (t + e) / 2) + 0.5;
    if (i.solid && ![l, l + r / 2, l + r].every((g) => hk(i, g, m, -99, 3)))
      return;
  }
  let u = co([0.06, 0.06, 0.06], Yi.STEEL),
    d = co([0.42, 0.33, 0.22], f),
    p = co([0.52, 0.42, 0.3], f);
  for (let m = 0; m < h; m++) {
    let g = l + m * (r / h) + 0.02,
      b = l + (m + 1) * (r / h) - 0.02,
      x = Dy(i, l + r / 2);
    if (!(Math.abs(i.gy((g + b) / 2) - i.gF) > 0.7)) {
      for (let [v, y, M] of [
        [0.15, 0.68, 0.95],
        [0.68, 1.28, 0.72],
      ]) {
        let S = dV[Math.floor(Ri(o + m * 7, 230 + M * 10) * dV.length)],
          w = 0.9 + 0.2 * Ri(o + m, 231 + M * 10);
        (N0(
          a,
          n,
          g,
          b,
          x + M - 0.2,
          x + M - 0.04,
          v + 0.02,
          y - 0.02,
          p,
          !1,
          !1,
        ),
          N0(
            a,
            n,
            g + 0.03,
            b - 0.03,
            x + M - 0.04,
            x + M + 0.03 + 0.04 * Ri(o + m, 232),
            v + 0.05,
            y - 0.05,
            co([S[0] * w, S[1] * w, S[2] * w], f),
            !1,
            !1,
          ));
      }
      if (m === 0 || m === h - 1)
        for (let v of [0.25, 1.15])
          N0(
            a,
            n,
            (m === 0 ? g : b) - 0.04,
            (m === 0 ? g : b) + 0.04,
            x,
            x + 0.75,
            v - 0.04,
            v + 0.04,
            u,
          );
    }
  }
  if (
    (N0(
      a,
      n,
      l,
      l + r,
      Dy(i, l + r / 2) + 0.49,
      Dy(i, l + r / 2) + 0.52,
      0.12,
      1.3,
      d,
    ),
    Ri(o, 233) < 0.6)
  ) {
    let m = Ri(o, 234) < 0.5 ? l - 0.05 : l + r + 0.6,
      g = Dy(i, m);
    if (m - 0.55 > 0.05 && m < n.l - 0.05)
      for (let b = 0; b < 2 + Math.floor(Ri(o, 235) * 3); b++)
        N0(
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
var Dy = (i, t) => i.gy(t);
function bpt(i, t) {
  let e = i.E,
    s = i.seed,
    n = e.l / Math.max(0.001, i.uB - i.uA),
    o = i.gF;
  if (i.top - o < 5.5) return;
  let a = [0];
  for (let c = Math.ceil(i.uA + 0.001); c < i.uB - 0.001; c++)
    a.push((c - i.uA) * n);
  a.push(e.l);
  let r = 0;
  if (i.L && !i.flank) {
    let c = (i.ax + i.bx) / 2 + e.nx * 5,
      h = (i.az + i.bz) / 2 + e.nz * 5,
      f = i.L.roadAt(c, h, 14);
    r = (f && mpt[f.E.name]) || 0;
  }
  if (r)
    for (let c = 0; c + 1 < a.length; c++)
      a[c + 1] - a[c] >= 2.2 &&
        Ri(s + c * 13, 236) < r &&
        gpt(i, a[c], a[c + 1], c);
  let l = (t?.awnings?.length || 0) + (t?.eaves?.length || 0) > 0;
  for (let c = 0; c + 1 < a.length; c++) {
    let h = a[c],
      f = a[c + 1],
      u = f - h;
    if (u < 2.2) continue;
    if (Ri(s + c * 13, 201) < 0.85) {
      let p = Math.min(u - 0.5, 5.5),
        m = (h + f) / 2;
      ppt(
        i,
        m - p / 2,
        m + p / 2,
        o + 3,
        o + 3 + Math.min(0.95, p * 0.24),
        10 + Math.floor(Ri(s + c, 202) * 6),
      );
    }
    if (
      (!l &&
        Ri(s + c * 13, 203) < 0.75 &&
        xP(i, h + 0.3, f - 0.3, o + 2.3, o + 2.85, {
          lc: uV[Math.floor(Ri(s + c, 204) * uV.length)],
        }),
      Ri(s + c * 13, 205) < 0.6 && i.top - o > 7)
    ) {
      let p = 2.4 + 1 * Ri(s + c, 206);
      fk(
        i,
        (h + f) / 2 + (Ri(s + c, 207) - 0.5) * 1.2,
        o + 4,
        Math.min(p, i.top - o - 4.6),
        0.66,
        0.3,
        Math.floor(Ri(s + c, 208) * 10),
        Yi.CSIGN,
      );
    }
  }
  for (let c = 1; c + 1 < a.length; c++)
    Ri(s + c * 17, 210) < 0.4 &&
      i.top - o > 10.5 &&
      fk(
        i,
        a[c],
        o + 7.3,
        2.4 + 0.6 * Ri(s + c, 211),
        0.6,
        0.3,
        Math.floor(Ri(s + c, 212) * 10),
        Yi.CSIGN,
      );
}
var xpt = new Set(["chn"]),
  vpt = new Set(["mix", "nb", "chn"]);
function wV(i) {
  let t = i.cell.dress,
    e = (i.E = pV(i.ax, i.az, i.bx, i.bz)),
    s = xpt.has(i.cell.style),
    n = i.seed;
  i.dn = Ai((i.ax + i.bx) / 2, (i.az + i.bz) / 2);
  let o = !i.flank && !i.cut && i.dn === "chinatown";
  if (t) {
    t.cornice != null && i.cornice && rpt(i, t.cornice, t.cc);
    for (let r of t.bays || [])
      for (let [l, c] of om(i, r.r[0], r.r[1])) apt(i, l, c, r);
    let a = (r) => Math.max(0, i.gF + 2.3 - r[0]);
    for (let r of t.awnings || [])
      for (let [l, c] of om(i, r.r[0], r.r[1]))
        for (let h of Bb(i, r.r[2], r.r[3]))
          h[4] &&
            h[5] &&
            h[0] > i.gF + 1 &&
            xP(i, l, c, h[0] + a(h), h[1] + a(h), r);
    for (let r of t.eaves || [])
      for (let [l, c] of om(i, r.r[0], r.r[1]))
        for (let h of Bb(i, r.r[2], r.r[3]))
          h[4] &&
            h[5] &&
            h[0] > i.gF + 1 &&
            mV(i, l, c, h[0] + a(h), h[1] + a(h), r);
    for (let r of t.fire || [])
      for (let [l, c] of om(i, r.r[0], r.r[1])) lpt(i, l, c, r, s);
    for (let r of t.balc || [])
      for (let [l, c] of om(i, r.r[0], r.r[1]))
        cpt(i, l, c, r, s || (r.lc && r.lc[0] > 0.08 && r.lc[0] > 2 * r.lc[2]));
    for (let [r, l] of t.lanterns || [])
      for (let [c, , h] of om(i, r, r))
        for (let f of Xh(i, l))
          f > i.gF + 2.6 &&
            f < i.gF + 11 &&
            Ri(n + h * 7, Math.round(f * 3 + r * 50)) < 0.6 &&
            hpt(i, c, f, 0.45);
    if (t.wins && i.st !== 0 && i.st !== 1) {
      let r =
        i.cell.style === "pal" || i.cell.style === "bank"
          ? 0.02
          : s
            ? 0.1
            : 0.06;
      t.wins.forEach((l, c) => {
        for (let [h, f, u] of om(i, l[0], l[1]))
          for (let d of Xh(i, l[2]))
            d < i.gF + 4.5 ||
              d > i.top - 2 ||
              f - h < 0.55 ||
              Ri(n + u * 131 + Math.round(d), c) > r ||
              (t.fire || []).some(
                (p) =>
                  l[0] < p.r[1] &&
                  l[1] > p.r[0] &&
                  l[2] < p.r[3] &&
                  l[3] > p.r[2],
              ) ||
              fpt(i, (h + f) / 2, d + 0.02);
      });
    }
  }
  if (
    (o && bpt(i, t),
    (vpt.has(i.cell.style) || i.shop || o) && !i.flank && !i.cut)
  )
    for (let a = Math.ceil(i.uA + 0.001); a < i.uB - 0.001; a++) {
      let r = ((a - i.uA) / (i.uB - i.uA)) * e.l;
      if (
        r < 0.8 ||
        r > e.l - 0.8 ||
        Ri(n + a * 17, 77) >
          (o ? 0.85 : s ? 0.75 : (upt[i.dn] ?? (yV[i.dn] > 0.45 ? 0.62 : 0.45)))
      )
        continue;
      let l = Ri(n + a * 17, 78),
        c = t?.balc?.length > 0,
        h = s || o ? 2.2 + 0.8 * l : 1.1 + 0.6 * l,
        f = s || o ? 0.6 : 0.7 + 0.25 * l,
        u = i.gF + (s || o ? 3.8 : 3.3 + 0.4 * l) + (i.shop ? 2.2 : 0);
      if (u + h > i.top - 0.5) continue;
      let d = o
        ? Math.floor(Ri(n + a, 79) * 10)
        : s
          ? 8 + Math.floor(Ri(n + a, 79) * 7)
          : [0, 1, 2, 3, 4, 5, 6, 7, 15][Math.floor(Ri(n + a, 79) * 9)];
      fk(i, r, u, h, f, c ? 0.95 : 0.25, d, o ? Yi.CSIGN : Yi.SIGN);
    }
  if (i.pipe && i.st !== 0 && !i.cut) {
    let a = i.pipe > 0 ? 0.18 : e.l - 0.18;
    (qr(
      i.g("dress"),
      e.P(a, i.gF, 0.09),
      e.P(a, i.top - 0.15, 0.09),
      0.05,
      co(
        Ri(n, 90) < 0.5
          ? [0.05, 0.05, 0.05]
          : i.fcol.slice(0, 3).map((r) => r * 0.25),
        Yi.STEEL,
      ),
    ),
      N0(
        i.g("dress"),
        e,
        a - 0.12,
        a + 0.12,
        i.top - 0.45,
        i.top - 0.15,
        0,
        0.22,
        co([0.06, 0.06, 0.06], Yi.STEEL),
      ));
  }
  if (i.flag && !i.cut && (i.cell.style === "pal" || i.cell.style === "bank")) {
    let a = e.l / 2;
    i.top - i.gF > 12 && dpt(i, a, i.gF + 5.4, Math.floor(Ri(n, 91) * 4));
  }
}
function MV(i, t, e, s, n, o, a, r, l, c = null, h = null) {
  let f = a.dress,
    u = pV(t, e, s, n),
    d = {
      g: i,
      E: u,
      gy: c,
      solid: h,
      dn: Ai((t + s) / 2, (e + n) / 2),
      uA: 0,
      uB: 1,
      u0: 0,
      nm: 1,
      mirror: 0,
      secs: [[o, o + 4.8, 0, 1]],
      cell: a,
      gF: o,
      top: o + 4.8,
      st: 2,
      seed: r,
    };
  if (f) {
    for (let p of f.awnings || [])
      xP(d, p.r[0] * u.l, p.r[1] * u.l, o + p.r[2] * 4.8, o + p.r[3] * 4.8, p);
    for (let p of f.eaves || [])
      mV(d, p.r[0] * u.l, p.r[1] * u.l, o + p.r[2] * 4.8, o + p.r[3] * 4.8, p);
  }
  if (!l && Ri(r, 55) < 0.5) {
    let p = Ri(r, 56);
    fk(
      d,
      0,
      o + 3.4 + 0.3 * p,
      1.1 + 0.5 * p,
      0.75,
      0.25,
      [0, 1, 2, 3, 4, 5, 6, 7, 15][Math.floor(Ri(r, 57) * 9)],
    );
  }
}
