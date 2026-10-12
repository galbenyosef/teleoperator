// app 184 — math
// Lines 105357-105601 of readable/app.pretty.js (statement-aligned).
function t$(i, t, e) {
  let s = t.rings[0],
    n = s.length / 2,
    o = [];
  for (let c = 0; c < n; c++)
    if (e[c] > 0) {
      let h = s[c * 2],
        f = s[c * 2 + 1],
        u = s[((c + 1) % n) * 2],
        d = s[((c + 1) % n) * 2 + 1],
        p = Math.hypot(u - h, d - f);
      o.push({ ax: h, az: f, ux: (u - h) / p, uz: (d - f) / p, l: p, y: e[c] });
    }
  let a = (c, h, f) => c.map((u, d) => u + (h[d] - u) * f),
    r = e.spans || [],
    l = (c, h, f, u, d, p, m, g, b, x) => {
      for (let v of r) {
        let y = (c[0] - v.ax) * -v.uz + (c[2] - v.az) * v.ux,
          M = (h[0] - v.ax) * -v.uz + (h[2] - v.az) * v.ux;
        if (Math.abs(y) > 0.07 || Math.abs(M) > 0.07) continue;
        let S = (c[0] - v.ax) * v.ux + (c[2] - v.az) * v.uz,
          w = (h[0] - v.ax) * v.ux + (h[2] - v.az) * v.uz;
        if (w <= S + 1e-4) continue;
        let z = Math.max(S, v.sa),
          _ = Math.min(w, v.sb);
        if (_ - z < 0.01) continue;
        let R = (C) => [a(c, h, C), a(u, f, C), a(d, p, C), a(g, m, C)],
          T = (z - S) / (w - S),
          E = (_ - S) / (w - S),
          A = (C, P, I) => {
            if (P - C < 1e-4) return;
            let [L, F, N, B] = R(C),
              [H, O, D, U] = R(P);
            if (I) {
              if (F[1] <= v.y + 0.01 && O[1] <= v.y + 0.01) return;
              let G = Math.max(0, (v.y - L[1]) / (F[1] - L[1])),
                q = Math.max(0, (v.y - H[1]) / (O[1] - H[1]));
              (G > 0 || q > 0) &&
                ((L = a(L, F, Math.min(1, G))),
                (N = a(N, B, Math.min(1, G))),
                (H = a(H, O, Math.min(1, q))),
                (D = a(D, U, Math.min(1, q))));
            }
            i.quad(L, H, O, F, N, D, U, B, b, x);
          };
        return (A(0, T, !1), A(T, E, !0), A(E, 1, !1), !0);
      }
      return !1;
    };
  return {
    get v() {
      return i.v;
    },
    get p() {
      return i.p;
    },
    get empty() {
      return i.empty;
    },
    vert: (...c) => i.vert(...c),
    tri: (...c) => i.tri(...c),
    quad(c, h, f, u, d, p, m, g, b, x = null) {
      if (
        Math.abs(c[0] - u[0]) + Math.abs(c[2] - u[2]) < 0.01 &&
        Math.abs(h[0] - f[0]) + Math.abs(h[2] - f[2]) < 0.01 &&
        u[1] > c[1] &&
        f[1] > h[1]
      )
        for (let v of o) {
          let y = (c[0] - v.ax) * -v.uz + (c[2] - v.az) * v.ux,
            M = (h[0] - v.ax) * -v.uz + (h[2] - v.az) * v.ux,
            S = (c[0] - v.ax) * v.ux + (c[2] - v.az) * v.uz,
            w = (h[0] - v.ax) * v.ux + (h[2] - v.az) * v.uz;
          if (
            Math.abs(y) > 0.04 ||
            Math.abs(M) > 0.04 ||
            Math.min(S, w) < -0.05 ||
            Math.max(S, w) > v.l + 0.05 ||
            w < S
          )
            continue;
          if (u[1] <= v.y + 0.01 && f[1] <= v.y + 0.01) return;
          let z = Math.max(0, (v.y - c[1]) / (u[1] - c[1])),
            _ = Math.max(0, (v.y - h[1]) / (f[1] - h[1]));
          (z > 0 || _ > 0) &&
            ((c = a(c, u, Math.min(1, z))),
            (d = a(d, g, Math.min(1, z))),
            (h = a(h, f, Math.min(1, _))),
            (p = a(p, m, Math.min(1, _))));
          break;
        }
      (r.length &&
        Math.abs(c[0] - u[0]) + Math.abs(c[2] - u[2]) < 0.01 &&
        Math.abs(h[0] - f[0]) + Math.abs(h[2] - f[2]) < 0.01 &&
        u[1] > c[1] &&
        f[1] > h[1] &&
        l(c, h, f, u, d, p, m, g, b, x)) ||
        i.quad(c, h, f, u, d, p, m, g, b, x);
    },
    wall(c, h, f, u, d, p, m, g, b, x = 0, v = 0) {
      let y = f - c,
        M = u - h,
        S = Math.hypot(y, M) || 1;
      this.quad(
        [c, d, h],
        [f, p, u],
        [f, g, u],
        [c, m, h],
        [x, d - v],
        [x + S, p - v],
        [x + S, g - v],
        [x, m - v],
        b,
        [-M / S, 0, y / S],
      );
    },
  };
}
function Lpt(i, t) {
  let e = Cpt(i),
    s = i.bld;
  return (n, o, a) => {
    let r = e.cells.get(
      (Math.floor(n / e.CS) + 4096) * 8192 + Math.floor(o / e.CS) + 4096,
    );
    if (!r) return !1;
    for (let l of r) {
      if (l === t.i) continue;
      let c = l * 4;
      if (
        n < e.box[c] - 0.2 ||
        n > e.box[c + 2] + 0.2 ||
        o < e.box[c + 1] - 0.2 ||
        o > e.box[c + 3] + 0.2
      )
        continue;
      let h = s.rStart[s.bRing[l]],
        f = s.rStart[s.bRing[l] + 1],
        u = !1,
        d = 1e9;
      if (!(
        a < s.bF[l * 3] - 0.5 ||
        a >
          s.bF[l * 3 + 1] +
            (s.pts[h * 2] < -7611 || s.pts[h * 2 + 1] < -2600 ? 3.5 : 0)
      )) {
        for (let p = h, m = f - 1; p < f; m = p++) {
          let g = s.pts[p * 2],
            b = s.pts[p * 2 + 1],
            x = s.pts[m * 2],
            v = s.pts[m * 2 + 1];
          b > o != v > o && n < ((x - g) * (o - b)) / (v - b) + g && (u = !u);
          let y = x - g,
            M = v - b,
            S = y * y + M * M || 1,
            w = Math.max(0, Math.min(1, ((n - g) * y + (o - b) * M) / S));
          d = Math.min(d, Math.hypot(g + y * w - n, b + M * w - o));
        }
        if (u && d > 0.03) return !0;
      }
    }
    return !1;
  };
}
var HV = new Set([
    ...nm,
    "northbeach",
    "chinatown",
    "wharf",
    "soma",
    "tenderloin",
  ]),
  Ipt = new Set([
    "marina",
    "cowhollow",
    "pacific",
    "western",
    "richmond",
    "hayes",
    "haight",
    "castro",
    "mission",
    "noe",
    "dolores",
    "russian",
    "nob",
    "telegraph",
  ]);
function vP(i, t, e, s, n) {
  let o = Math.hypot(s - t, n - e) || 1,
    a = (t + s) / 2 - ((n - e) / o) * 4,
    r = (e + n) / 2 + ((s - t) / o) * 4,
    l = Ai(a, r);
  if (!HV.has(l) && !Ipt.has(l)) return 0;
  let c = i.roadAt(a, r, 10);
  return !c || c.E.cls === "service" || c.E.cls === "motorway" || c.E.layer
    ? 0
    : ep.has(c.E.name)
      ? 1
      : HV.has(l)
        ? 0.8
        : 0;
}
var DV = { walk: 1, road: 1 };
function yP(i, t, e, s, n, o, a, r = 1) {
  let l = Math.hypot(n - e, o - s);
  if (l < 2.2 || r <= 0 || Cn(a, 61) < 0.12) return;
  let c = (n - e) / l,
    h = (o - s) / l,
    f = -h,
    u = c,
    d = Math.min(1.3, l * 0.28),
    p = e + (c * l) / 2,
    m = s + (h * l) / 2;
  if (!DV[t.surfaceAt(p + f * 1.2, m + u * 1.2)]) return;
  let g = DV[t.surfaceAt(p + f * 3.6, m + u * 3.6)] ? 1 : 0,
    b = t.driveHeight(e + f * 1.6, s + u * 1.6) + 0.1,
    x = t.driveHeight(n + f * 1.6, o + u * 1.6) + 0.1,
    v = i("spill"),
    y = [0.2, d, l - d, l - 0.2],
    M = [0.12, 1.2, 3.6],
    S = [0, 1, 1, 0],
    w = [1, 0.5, 0],
    z = r * (0.75 + 0.5 * Cn(a, 62)),
    _ = Cn(a, 63) < 0.15 ? [0.95, 0.78, 0.55] : [1, 0.64, 0.34],
    R = v.v;
  M.forEach((T, E) =>
    y.forEach((A, C) => {
      let P = e + c * A + f * T,
        I = s + h * A + u * T,
        L = S[C] * w[E] * z * (E === 1 && !g ? 0.6 : 1);
      v.vert(P, b + ((x - b) * A) / l, I, 0, 1, 0, 0, 0, [
        _[0] * L,
        _[1] * L,
        _[2] * L,
        1,
      ]);
    }),
  );
  for (let T = 0; T < 2; T++)
    for (let E = 0; E < 3; E++) {
      let A = R + T * 4 + E;
      (v.tri(A, A + 4, A + 5), v.tri(A, A + 5, A + 1));
    }
}
