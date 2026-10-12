// app 251 — math
// Lines 126756-126989 of readable/app.pretty.js (statement-aligned).
function CK(i, t, e, s, n, o, a) {
  let r = e - 0.3;
  if (r <= 0.2) return;
  for (let u = 0; u + 1 < t.length; u++) {
    let [d, p] = t[u],
      [m, g] = t[u + 1],
      b = Yt(d, p) + Ke,
      x = Yt(m, g) + Ke,
      v = n === "grass" ? [0.1, 0.18, 0.05, 1] : [0.45, 0.43, 0.4, 0];
    s === "x"
      ? i.quad(
          [d, b, p + r],
          [m, x, g + r],
          [m, x, g - r],
          [d, b, p - r],
          [d, p + r],
          [m, g + r],
          [m, g - r],
          [d, p - r],
          v,
        )
      : i.quad(
          [d - r, b, p],
          [d + r, b, p],
          [m + r, x, g],
          [m - r, x, g],
          [d - r, p],
          [d + r, p],
          [m + r, g],
          [m - r, g],
          v,
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
    for (let [M, S, w, z] of y)
      i.wall(
        M,
        S,
        w,
        z,
        Yt(M, S) - 0.02,
        Yt(w, z) - 0.02,
        Yt(M, S) + Ke,
        Yt(w, z) + Ke,
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
    (o.push({
      kind: n === "palm" ? "palm" : "tree",
      x: p,
      y: Yt(p, m) + Ke,
      z: m,
      rot: Ws(p, m) * 6.28,
      scale: 0.85 + 0.3 * Ws(m, p),
    }),
      a.push({ t: "circ", x: p, z: m, r: n === "palm" ? 0.45 : 0.35 }));
  }
}
function dgt(i, t, e, { west: s, south: n }) {
  let o = ka(Math.floor(e * 1e9)),
    a = [],
    r = i.x1 - i.x0,
    l = i.z1 - i.z0;
  if (t === zi.FIDI || t === zi.DOWNTOWN) {
    let y = o() < 0.7,
      M = o() < 0.75,
      S = y ? [i.x0, i.x0 + r * (0.4 + 0.2 * o()), i.x1] : [i.x0, i.x1],
      w = M ? [i.z0, i.z0 + l * (0.4 + 0.2 * o()), i.z1] : [i.z0, i.z1];
    for (let z = 0; z + 1 < S.length; z++)
      for (let _ = 0; _ + 1 < w.length; _++) {
        let R = {
            x0: S[z],
            x1: S[z + 1],
            z0: w[_],
            z1: w[_ + 1],
            front: _ === 0 ? "n" : "s",
            seed: o(),
          },
          T = t === zi.FIDI,
          E = o();
        R.style = T
          ? E < 0.45
            ? Rs.CUR
            : E < 0.75
              ? Rs.OFF
              : Rs.RIB
          : E < 0.4
            ? Rs.OFF
            : E < 0.6
              ? Rs.RIB
              : E < 0.8
                ? Rs.MIX
                : Rs.CUR;
        let A = T
          ? 30 + Math.pow(o(), 1.6) * 170
          : 16 + Math.pow(o(), 1.8) * 70;
        ((R.h = A),
          (R.color = R.style === Rs.CUR ? _u(ugt, o()) : _u(BK, o())),
          a.push(R));
      }
    return a;
  }
  let c =
      t === zi.APARTMENTS
        ? [12, 26]
        : t === zi.WATERFRONT
          ? [20, 42]
          : t === zi.NORTHBEACH || t === zi.CHINATOWN
            ? [7.6, 16]
            : [7.6, 7.6],
    h =
      t === zi.WATERFRONT
        ? Math.min(l / 2, 30)
        : Math.min(l / 2 - 3, 20 + o() * 8),
    f = (y) => {
      switch (t) {
        case zi.VICTORIAN:
          return y < 0.62 ? Rs.VIC : y < 0.85 ? Rs.EDW : Rs.APT;
        case zi.APARTMENTS:
          return y < 0.7 ? Rs.APT : y < 0.85 ? Rs.EDW : Rs.VIC;
        case zi.NORTHBEACH:
          return y < 0.55 ? Rs.MIX : y < 0.8 ? Rs.EDW : Rs.BRK;
        case zi.CHINATOWN:
          return y < 0.75 ? Rs.CHN : Rs.MIX;
        case zi.WATERFRONT:
          return y < 0.6 ? Rs.BRK : y < 0.85 ? Rs.OFF : Rs.APT;
        default:
          return Rs.APT;
      }
    },
    u = (y) => {
      switch (y) {
        case Rs.VIC:
          return 2.9 + 3.5 * (o() < 0.7 ? 2 : 3) + 1.2;
        case Rs.EDW:
          return 3 + 3.4 * (2 + Math.floor(o() * 2)) + 1;
        case Rs.APT:
          return 3.4 + 3 * (3 + Math.floor(o() * 4)) + 1;
        case Rs.MIX:
        case Rs.CHN:
          return 4.3 + 3.3 * (2 + Math.floor(o() * 3)) + 1;
        case Rs.BRK:
          return 4 + 4 * (2 + Math.floor(o() * 3)) + 1.2;
        default:
          return 5 + 3.8 * (3 + Math.floor(o() * 8));
      }
    },
    d = (y, M) =>
      y === Rs.VIC
        ? _u(NC, M)
        : y === Rs.EDW
          ? M < 0.5
            ? _u(NC, M * 2)
            : _u(Yk, M)
          : y === Rs.BRK
            ? _u(fgt, M)
            : y === Rs.MIX || y === Rs.CHN
              ? _u(Yk.concat(NC.slice(0, 6)), M)
              : _u(Yk, M),
    p = {
      [Rs.VIC]: [7.6, 11.4],
      [Rs.EDW]: [7.6, 11.4],
      [Rs.APT]: [12, 18],
      [Rs.MIX]: [8, 12],
      [Rs.CHN]: [8, 12],
      [Rs.BRK]: [12, 12],
    },
    m = (y, M, S) => {
      let w = y;
      for (; M - w > 0.5;) {
        let z = f(o()),
          _;
        (mm && p[z]
          ? ((_ =
              p[z][0] *
              (o() < (z === Rs.APT || z === Rs.BRK ? 0.35 : 0.12) ? 2 : 1)),
            M - w - _ < 5 && (_ = M - w))
          : ((_ = c[0] + o() * (c[1] - c[0])),
            c[0] === c[1] && o() < 0.15 && (_ *= 2),
            M - w - _ < c[0] * 0.7 && (_ = M - w)),
          S(w, w + _, z),
          (w += _));
      }
    },
    g = (y, M, S, w, z, _) => {
      let R = mm && p[_] ? p[_][1] * (0.97 + 0.1 * o()) : u(_),
        T = {
          x0: y,
          z0: M,
          x1: S,
          z1: w,
          front: z,
          style: _,
          h: R,
          color: d(_, o()),
          seed: o(),
        };
      ((T.street = {
        n: M <= i.z0 + 0.01,
        s: w >= i.z1 - 0.01,
        w: y <= i.x0 + 0.01,
        e: S >= i.x1 - 0.01,
      }),
        a.push(T));
    };
  (m(i.x0, i.x1, (y, M, S) => g(y, i.z0, M, i.z0 + h, "n", S)),
    n || m(i.x0, i.x1, (y, M, S) => g(y, i.z1 - h, M, i.z1, "s", S)));
  let b = i.z0 + h,
    x = n ? i.z1 : i.z1 - h,
    v = Math.min(r / 2 - 2, 22);
  return (
    x - b > 6 &&
      (m(b, x, (y, M, S) => g(i.x0, y, i.x0 + v, M, "w", S)),
      s || m(b, x, (y, M, S) => g(i.x1 - v, y, i.x1, M, "e", S))),
    a
  );
}
var OC = { n: 0 };
