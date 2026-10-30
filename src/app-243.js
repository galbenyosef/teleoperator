// app 243 — math
// Lines 124676-124933 of readable/app.pretty.js (statement-aligned).
function gJ(o, { d: t, front: e, ground: s, xa: n, xb: i, clear: a = null }) {
  let r = [],
    l = o,
    c = l.F,
    h = (u, d) => Math.atan2(u, d),
    f = (u, d, p) => {
      (a && a(d, p) < (u.kind === "tree" ? 1.6 : 1.1)) ||
        r.push({ ...u, u: d, w: p, y: s(d, p) });
    };
  for (let u of l.sides) {
    let d = u.sd < 0;
    for (let p of u.runs) {
      for (let m = p.u0 + 0.3; m < p.u1 - 1.2; m += 2.45) {
        let g = Math.min(p.u1 - 0.3, m + 2.55),
          b = (m + g) / 2,
          [v, x] = u.at(b),
          [y] = u.at(m),
          [M] = u.at(g),
          S = Math.hypot(g - m, M - y),
          w = h((g - m) / S, (M - y) / S),
          _ = (S / 2) * 1.05,
          z = d ? 0.72 + 0.12 * Lr(b, 1) : 0.85 + 0.15 * Lr(b, 2),
          A = v - u.sd * (x + 0.36);
        t(b, A) > 3.15 &&
          t(m, A) > 3.05 &&
          t(g, A) > 3.05 &&
          f(
            {
              kind: "fhedge",
              rot: w,
              scale: z,
              sx: z * 1,
              sz: _,
              shy: 0,
              cell: gn.box,
            },
            b,
            A,
          );
        let T = e(b, u.sd),
          E = v + u.sd * (x + 0.4);
        d &&
          T - Math.abs(E) > 0.45 &&
          f(
            {
              kind: "fhedge",
              rot: w,
              scale: 1.25 + 0.35 * Lr(b, 3),
              sx: 1.1,
              sz: _,
              shy: 0,
              cell: gn.box,
            },
            b,
            E,
          );
      }
      for (let m = p.u0 + 0.8; m < p.u1 - 0.5; m += d ? 2.3 : 6.5) {
        let [g, b] = u.at(m),
          v = e(m, u.sd),
          x = g + u.sd * (b + (d ? 1.2 : 0.55));
        v - Math.abs(x) < (d ? 0.7 : 0.5) ||
          f(
            {
              kind: "shrub",
              cell: Lr(m, 4) < 0.6 ? gn.pitto : gn.escal,
              rot: Lr(m, 5) * 6.28,
              scale: d ? 1 + 0.4 * Lr(m, 6) : 0.6,
            },
            m,
            x,
          );
      }
    }
    if (d) {
      let p = [];
      for (let m = 0; m < aI.length; m += 2) {
        let [g, b] = c.inv(...ji(aI[m], aI[m + 1]));
        b < 0 && g > n + 2 && g < i - 1 && p.push([g, b]);
      }
      for (let m = n + 22; m < i - 3; m += 8.5)
        if (!p.some((g) => Math.abs(g[0] - m) < 5)) {
          let [g, b] = u.at(m);
          p.push([m, g - u.sd * (b + 1.1)]);
        }
      for (let [m, g] of p) {
        let b = g;
        for (let y = 0; y < 30 && t(m, b) < 3.9; y++) b += u.sd * 0.1;
        let [v, x] = u.at(m);
        Math.abs(b - v) < x + 0.3 ||
          f(
            {
              kind: "tree",
              sp: "tree0",
              rot: Lr(m, 7) * 6.28,
              scale: 0.72 + 0.2 * Lr(m, 8),
            },
            m,
            b,
          );
      }
      for (let m = n + 3; m < i - 1; m += m > 100 ? 3.8 : 11) {
        let [g, b] = u.at(m),
          v = e(m, u.sd),
          x = g + u.sd * (b + 2.4);
        if (
          !(v - Math.abs(x) < 0.9) &&
          (f(
            {
              kind: "tree",
              sp: m > 118 ? "cypress" : "tree1",
              rot: Lr(m, 9) * 6.28,
              scale: (m > 100 ? 0.95 : 0.75) + 0.3 * Lr(m, 10),
              extra: m <= 100,
            },
            m,
            x,
          ),
          m > 108)
        )
          for (let y = 1; y < 2; y++) {
            let M = x + u.sd * y * 3.2;
            if (v - Math.abs(M) < 1.5) break;
            (f(
              {
                kind: "tree",
                sp:
                  m <= 118 ? "tree1" : Lr(m, 20 + y) < 0.3 ? "pine" : "cypress",
                rot: Lr(m, 12 + y) * 6.28,
                scale: 0.85 + 0.3 * Lr(m, 30 + y),
                extra: !0,
              },
              m + (Lr(m, 40 + y) - 0.5) * 2,
              M,
            ),
              f(
                {
                  kind: "shrub",
                  cell: gn.pitto,
                  rot: Lr(m, 50 + y) * 6.28,
                  scale: 1.3,
                },
                m + 1.4,
                M - u.sd * 1.5,
              ));
          }
      }
    } else
      for (let p of [41]) {
        let [m, g] = u.at(p),
          b = m - u.sd * (g + 1.4);
        for (let v = 0; v < 30 && t(p, b) < 4.3; v++) b += u.sd * 0.1;
        Math.abs(b - m) > g + 0.6 &&
          f({ kind: "palm", rot: Lr(p, 11) * 6.28, scale: 0.85 }, p, b);
      }
  }
  for (let u of r) {
    let [d, p] = c.fwd(u.u, u.w);
    ((u.x = d), (u.z = p), (u.rot = c.prot(u.rot || 0)));
  }
  return r;
}
function avt(o) {
  let t = [];
  for (let e of o.sides)
    for (let s of e.runs)
      for (let n of s.treads)
        if (n.land && n.u1 - n.u0 > 1.2) {
          let i = (n.u0 + n.u1) / 2,
            [a, r] = e.at(i);
          t.push({ side: e, u: i, w: a - e.sd * (r - 0.45), y: n.y });
        }
  return t;
}
var rvt = [0.6, 0.55, 0.57],
  lvt = [0.74, 0.73, 0.72],
  fJ = [0.035, 0.035, 0.037, 0];
function uJ(o, t) {
  let e = new Be(),
    s = t ? null : new Be();
  for (let n of o.sides)
    for (let i of n.runs) {
      let a = i.treads[0]?.y ?? 0;
      if (
        (i.treads.forEach((l, c) => {
          let h = (l.u0 + l.u1) / 2,
            [f] = n.at(l.u0),
            [u] = n.at(l.u1),
            [d, p] = n.at(h),
            m = Math.hypot(l.u1 - l.u0, u - f),
            g = (l.u1 - l.u0) / m,
            b = (u - f) / m,
            v = l.land && (a - l.y < 0.4 || i.flights === 0),
            x = 0.9 + 0.18 * Lr(l.u0, n.sd),
            y = v ? lvt : rvt,
            M = [y[0] * x, y[1] * x, y[2] * x, v ? yi.granite : yi.stone];
          t
            ? Ge(
                e,
                h,
                d,
                g,
                b,
                m / 2 + 0.01,
                p,
                l.y - 0.3,
                l.y,
                M,
                [0, 1, 0, 0, 1, 0],
              )
            : Ge(e, h, d, g, b, m / 2 + 0.005, p, l.g - 0.15, l.y, M, [
                c === 0 ? 1 : 0,
                1,
                1,
                1,
                1,
                0,
              ]);
        }),
        t)
      )
        continue;
      let r = [n.sd];
      n.sd > 0 && i.u0 < 50 && r.push(-n.sd);
      for (let l of r) {
        let c = null,
          h = l === n.sd ? i.u1 - 0.3 : Math.min(i.u1, 57);
        for (
          let f = i.u0 + 0.3;
          f <= h + 0.001;
          f += Math.min(2.4, Math.max(0.5, h - f))
        ) {
          let [u, d] = n.at(f),
            p = u - l * (d - 0.09),
            m = 0,
            g = 0;
          for (let v = -0.5; v <= 0.5; v += 0.25) {
            let x = n.yAt(Math.max(i.u0, Math.min(i.u1 - 0.01, f + v)));
            x !== null && ((m += x), g++);
          }
          m = g ? m / g : 0;
          let b = n.yAt(Math.max(i.u0, Math.min(i.u1 - 0.01, f))) ?? m;
          if (
            (ci(s, [f, b - 0.02, p], [f, m + 0.9, p], 0.045, 0.045, fJ),
            c &&
              ci(s, [c[0], c[1] + 0.9, c[2]], [f, m + 0.9, p], 0.05, 0.05, fJ),
            (c = [f, m, p]),
            f >= h - 0.001)
          )
            break;
        }
      }
    }
  return { g: e, gm: s };
}
var cvt = 35,
  dJ = 160,
  rI = 260;
