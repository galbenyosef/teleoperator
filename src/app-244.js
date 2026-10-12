// app 244 — math
// Lines 124417-124674 of readable/app.pretty.js (statement-aligned).
function dK(i, { d: t, front: e, ground: s, xa: n, xb: o, clear: a = null }) {
  let r = [],
    l = i,
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
          [x, v] = u.at(b),
          [y] = u.at(m),
          [M] = u.at(g),
          S = Math.hypot(g - m, M - y),
          w = h((g - m) / S, (M - y) / S),
          z = (S / 2) * 1.05,
          _ = d ? 0.72 + 0.12 * xr(b, 1) : 0.85 + 0.15 * xr(b, 2),
          R = x - u.sd * (v + 0.36);
        t(b, R) > 3.15 &&
          t(m, R) > 3.05 &&
          t(g, R) > 3.05 &&
          f(
            {
              kind: "fhedge",
              rot: w,
              scale: _,
              sx: _ * 1,
              sz: z,
              shy: 0,
              cell: un.box,
            },
            b,
            R,
          );
        let T = e(b, u.sd),
          E = x + u.sd * (v + 0.4);
        d &&
          T - Math.abs(E) > 0.45 &&
          f(
            {
              kind: "fhedge",
              rot: w,
              scale: 1.25 + 0.35 * xr(b, 3),
              sx: 1.1,
              sz: z,
              shy: 0,
              cell: un.box,
            },
            b,
            E,
          );
      }
      for (let m = p.u0 + 0.8; m < p.u1 - 0.5; m += d ? 2.3 : 6.5) {
        let [g, b] = u.at(m),
          x = e(m, u.sd),
          v = g + u.sd * (b + (d ? 1.2 : 0.55));
        x - Math.abs(v) < (d ? 0.7 : 0.5) ||
          f(
            {
              kind: "shrub",
              cell: xr(m, 4) < 0.6 ? un.pitto : un.escal,
              rot: xr(m, 5) * 6.28,
              scale: d ? 1 + 0.4 * xr(m, 6) : 0.6,
            },
            m,
            v,
          );
      }
    }
    if (d) {
      let p = [];
      for (let m = 0; m < RC.length; m += 2) {
        let [g, b] = c.inv(...Gi(RC[m], RC[m + 1]));
        b < 0 && g > n + 2 && g < o - 1 && p.push([g, b]);
      }
      for (let m = n + 22; m < o - 3; m += 8.5)
        if (!p.some((g) => Math.abs(g[0] - m) < 5)) {
          let [g, b] = u.at(m);
          p.push([m, g - u.sd * (b + 1.1)]);
        }
      for (let [m, g] of p) {
        let b = g;
        for (let y = 0; y < 30 && t(m, b) < 3.9; y++) b += u.sd * 0.1;
        let [x, v] = u.at(m);
        Math.abs(b - x) < v + 0.3 ||
          f(
            {
              kind: "tree",
              sp: "tree0",
              rot: xr(m, 7) * 6.28,
              scale: 0.72 + 0.2 * xr(m, 8),
            },
            m,
            b,
          );
      }
      for (let m = n + 3; m < o - 1; m += m > 100 ? 3.8 : 11) {
        let [g, b] = u.at(m),
          x = e(m, u.sd),
          v = g + u.sd * (b + 2.4);
        if (
          !(x - Math.abs(v) < 0.9) &&
          (f(
            {
              kind: "tree",
              sp: m > 118 ? "cypress" : "tree1",
              rot: xr(m, 9) * 6.28,
              scale: (m > 100 ? 0.95 : 0.75) + 0.3 * xr(m, 10),
              extra: m <= 100,
            },
            m,
            v,
          ),
          m > 108)
        )
          for (let y = 1; y < 2; y++) {
            let M = v + u.sd * y * 3.2;
            if (x - Math.abs(M) < 1.5) break;
            (f(
              {
                kind: "tree",
                sp:
                  m <= 118 ? "tree1" : xr(m, 20 + y) < 0.3 ? "pine" : "cypress",
                rot: xr(m, 12 + y) * 6.28,
                scale: 0.85 + 0.3 * xr(m, 30 + y),
                extra: !0,
              },
              m + (xr(m, 40 + y) - 0.5) * 2,
              M,
            ),
              f(
                {
                  kind: "shrub",
                  cell: un.pitto,
                  rot: xr(m, 50 + y) * 6.28,
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
        for (let x = 0; x < 30 && t(p, b) < 4.3; x++) b += u.sd * 0.1;
        Math.abs(b - m) > g + 0.6 &&
          f({ kind: "palm", rot: xr(p, 11) * 6.28, scale: 0.85 }, p, b);
      }
  }
  for (let u of r) {
    let [d, p] = c.fwd(u.u, u.w);
    ((u.x = d), (u.z = p), (u.rot = c.prot(u.rot || 0)));
  }
  return r;
}
function N2t(i) {
  let t = [];
  for (let e of i.sides)
    for (let s of e.runs)
      for (let n of s.treads)
        if (n.land && n.u1 - n.u0 > 1.2) {
          let o = (n.u0 + n.u1) / 2,
            [a, r] = e.at(o);
          t.push({ side: e, u: o, w: a - e.sd * (r - 0.45), y: n.y });
        }
  return t;
}
var B2t = [0.6, 0.55, 0.57],
  O2t = [0.74, 0.73, 0.72],
  lK = [0.035, 0.035, 0.037, 0];
function cK(i, t) {
  let e = new Ce(),
    s = t ? null : new Ce();
  for (let n of i.sides)
    for (let o of n.runs) {
      let a = o.treads[0]?.y ?? 0;
      if (
        (o.treads.forEach((l, c) => {
          let h = (l.u0 + l.u1) / 2,
            [f] = n.at(l.u0),
            [u] = n.at(l.u1),
            [d, p] = n.at(h),
            m = Math.hypot(l.u1 - l.u0, u - f),
            g = (l.u1 - l.u0) / m,
            b = (u - f) / m,
            x = l.land && (a - l.y < 0.4 || o.flights === 0),
            v = 0.9 + 0.18 * xr(l.u0, n.sd),
            y = x ? O2t : B2t,
            M = [y[0] * v, y[1] * v, y[2] * v, x ? hi.granite : hi.stone];
          t
            ? Ne(
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
            : Ne(e, h, d, g, b, m / 2 + 0.005, p, l.g - 0.15, l.y, M, [
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
      n.sd > 0 && o.u0 < 50 && r.push(-n.sd);
      for (let l of r) {
        let c = null,
          h = l === n.sd ? o.u1 - 0.3 : Math.min(o.u1, 57);
        for (
          let f = o.u0 + 0.3;
          f <= h + 0.001;
          f += Math.min(2.4, Math.max(0.5, h - f))
        ) {
          let [u, d] = n.at(f),
            p = u - l * (d - 0.09),
            m = 0,
            g = 0;
          for (let x = -0.5; x <= 0.5; x += 0.25) {
            let v = n.yAt(Math.max(o.u0, Math.min(o.u1 - 0.01, f + x)));
            v !== null && ((m += v), g++);
          }
          m = g ? m / g : 0;
          let b = n.yAt(Math.max(o.u0, Math.min(o.u1 - 0.01, f))) ?? m;
          if (
            (ii(s, [f, b - 0.02, p], [f, m + 0.9, p], 0.045, 0.045, lK),
            c &&
              ii(s, [c[0], c[1] + 0.9, c[2]], [f, m + 0.9, p], 0.05, 0.05, lK),
            (c = [f, m, p]),
            f >= h - 0.001)
          )
            break;
        }
      }
    }
  return { g: e, gm: s };
}
var H2t = 35,
  hK = 160,
  PC = 260;
