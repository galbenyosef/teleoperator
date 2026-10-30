// app 250 — math
// Lines 127015-127248 of readable/app.pretty.js (statement-aligned).
function FJ(o, t, e, s, n, i, a) {
  let r = e - 0.3;
  if (r <= 0.2) return;
  for (let u = 0; u + 1 < t.length; u++) {
    let [d, p] = t[u],
      [m, g] = t[u + 1],
      b = $t(d, p) + Ze,
      v = $t(m, g) + Ze,
      x = n === "grass" ? [0.1, 0.18, 0.05, 1] : [0.45, 0.43, 0.4, 0];
    s === "x"
      ? o.quad(
          [d, b, p + r],
          [m, v, g + r],
          [m, v, g - r],
          [d, b, p - r],
          [d, p + r],
          [m, g + r],
          [m, g - r],
          [d, p - r],
          x,
        )
      : o.quad(
          [d - r, b, p],
          [d + r, b, p],
          [m + r, v, g],
          [m - r, v, g],
          [d - r, p],
          [d + r, p],
          [m + r, g],
          [m - r, g],
          x,
        );
    let y =
      s === "x"
        ? [
            [d, p - r, m, g - r],
            [m, g + r, d, p + r],
          ]
        : [
            [d + r, p, m + r, g],
            [m - r, g, d - r, p],
          ];
    for (let [M, S, w, _] of y)
      o.wall(
        M,
        S,
        w,
        _,
        $t(M, S) - 0.02,
        $t(w, _) - 0.02,
        $t(M, S) + Ze,
        $t(w, _) + Ze,
        [0.5, 0.49, 0.46, 0.5],
      );
  }
  let l = t[0],
    c = t[t.length - 1],
    h = Math.hypot(c[0] - l[0], c[1] - l[1]),
    f = n === "palm" ? 14 : 22;
  for (let u = f / 2; u < h - 4; u += f) {
    let d = u / h,
      p = l[0] + (c[0] - l[0]) * d,
      m = l[1] + (c[1] - l[1]) * d;
    (i.push({
      kind: n === "palm" ? "palm" : "tree",
      x: p,
      y: $t(p, m) + Ze,
      z: m,
      rot: js(p, m) * 6.28,
      scale: 0.85 + 0.3 * js(m, p),
    }),
      a.push({ t: "circ", x: p, z: m, r: n === "palm" ? 0.45 : 0.35 }));
  }
}
function Bvt(o, t, e, { west: s, south: n }) {
  let i = Fa(Math.floor(e * 1e9)),
    a = [],
    r = o.x1 - o.x0,
    l = o.z1 - o.z0;
  if (t === Bi.FIDI || t === Bi.DOWNTOWN) {
    let y = i() < 0.7,
      M = i() < 0.75,
      S = y ? [o.x0, o.x0 + r * (0.4 + 0.2 * i()), o.x1] : [o.x0, o.x1],
      w = M ? [o.z0, o.z0 + l * (0.4 + 0.2 * i()), o.z1] : [o.z0, o.z1];
    for (let _ = 0; _ + 1 < S.length; _++)
      for (let z = 0; z + 1 < w.length; z++) {
        let A = {
            x0: S[_],
            x1: S[_ + 1],
            z0: w[z],
            z1: w[z + 1],
            front: z === 0 ? "n" : "s",
            seed: i(),
          },
          T = t === Bi.FIDI,
          E = i();
        A.style = T
          ? E < 0.45
            ? Ls.CUR
            : E < 0.75
              ? Ls.OFF
              : Ls.RIB
          : E < 0.4
            ? Ls.OFF
            : E < 0.6
              ? Ls.RIB
              : E < 0.8
                ? Ls.MIX
                : Ls.CUR;
        let R = T
          ? 30 + Math.pow(i(), 1.6) * 170
          : 16 + Math.pow(i(), 1.8) * 70;
        ((A.h = R),
          (A.color = A.style === Ls.CUR ? ad(Ovt, i()) : ad(DJ, i())),
          a.push(A));
      }
    return a;
  }
  let c =
      t === Bi.APARTMENTS
        ? [12, 26]
        : t === Bi.WATERFRONT
          ? [20, 42]
          : t === Bi.NORTHBEACH || t === Bi.CHINATOWN
            ? [7.6, 16]
            : [7.6, 7.6],
    h =
      t === Bi.WATERFRONT
        ? Math.min(l / 2, 30)
        : Math.min(l / 2 - 3, 20 + i() * 8),
    f = (y) => {
      switch (t) {
        case Bi.VICTORIAN:
          return y < 0.62 ? Ls.VIC : y < 0.85 ? Ls.EDW : Ls.APT;
        case Bi.APARTMENTS:
          return y < 0.7 ? Ls.APT : y < 0.85 ? Ls.EDW : Ls.VIC;
        case Bi.NORTHBEACH:
          return y < 0.55 ? Ls.MIX : y < 0.8 ? Ls.EDW : Ls.BRK;
        case Bi.CHINATOWN:
          return y < 0.75 ? Ls.CHN : Ls.MIX;
        case Bi.WATERFRONT:
          return y < 0.6 ? Ls.BRK : y < 0.85 ? Ls.OFF : Ls.APT;
        default:
          return Ls.APT;
      }
    },
    u = (y) => {
      switch (y) {
        case Ls.VIC:
          return 2.9 + 3.5 * (i() < 0.7 ? 2 : 3) + 1.2;
        case Ls.EDW:
          return 3 + 3.4 * (2 + Math.floor(i() * 2)) + 1;
        case Ls.APT:
          return 3.4 + 3 * (3 + Math.floor(i() * 4)) + 1;
        case Ls.MIX:
        case Ls.CHN:
          return 4.3 + 3.3 * (2 + Math.floor(i() * 3)) + 1;
        case Ls.BRK:
          return 4 + 4 * (2 + Math.floor(i() * 3)) + 1.2;
        default:
          return 5 + 3.8 * (3 + Math.floor(i() * 8));
      }
    },
    d = (y, M) =>
      y === Ls.VIC
        ? ad(uI, M)
        : y === Ls.EDW
          ? M < 0.5
            ? ad(uI, M * 2)
            : ad(Yz, M)
          : y === Ls.BRK
            ? ad(Fvt, M)
            : y === Ls.MIX || y === Ls.CHN
              ? ad(Yz.concat(uI.slice(0, 6)), M)
              : ad(Yz, M),
    p = {
      [Ls.VIC]: [7.6, 11.4],
      [Ls.EDW]: [7.6, 11.4],
      [Ls.APT]: [12, 18],
      [Ls.MIX]: [8, 12],
      [Ls.CHN]: [8, 12],
      [Ls.BRK]: [12, 12],
    },
    m = (y, M, S) => {
      let w = y;
      for (; M - w > 0.5;) {
        let _ = f(i()),
          z;
        (i2 && p[_]
          ? ((z =
              p[_][0] *
              (i() < (_ === Ls.APT || _ === Ls.BRK ? 0.35 : 0.12) ? 2 : 1)),
            M - w - z < 5 && (z = M - w))
          : ((z = c[0] + i() * (c[1] - c[0])),
            c[0] === c[1] && i() < 0.15 && (z *= 2),
            M - w - z < c[0] * 0.7 && (z = M - w)),
          S(w, w + z, _),
          (w += z));
      }
    },
    g = (y, M, S, w, _, z) => {
      let A = i2 && p[z] ? p[z][1] * (0.97 + 0.1 * i()) : u(z),
        T = {
          x0: y,
          z0: M,
          x1: S,
          z1: w,
          front: _,
          style: z,
          h: A,
          color: d(z, i()),
          seed: i(),
        };
      ((T.street = {
        n: M <= o.z0 + 0.01,
        s: w >= o.z1 - 0.01,
        w: y <= o.x0 + 0.01,
        e: S >= o.x1 - 0.01,
      }),
        a.push(T));
    };
  (m(o.x0, o.x1, (y, M, S) => g(y, o.z0, M, o.z0 + h, "n", S)),
    n || m(o.x0, o.x1, (y, M, S) => g(y, o.z1 - h, M, o.z1, "s", S)));
  let b = o.z0 + h,
    v = n ? o.z1 : o.z1 - h,
    x = Math.min(r / 2 - 2, 22);
  return (
    v - b > 6 &&
      (m(b, v, (y, M, S) => g(o.x0, y, o.x0 + x, M, "w", S)),
      s || m(b, v, (y, M, S) => g(o.x1 - x, y, o.x1, M, "e", S))),
    a
  );
}
var pI = { n: 0 };
