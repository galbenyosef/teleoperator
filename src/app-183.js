// app 183 — math
// Lines 105593-105837 of readable/app.pretty.js (statement-aligned).
function nK(o, t, e) {
  let s = t.rings[0],
    n = s.length / 2,
    i = [];
  for (let c = 0; c < n; c++)
    if (e[c] > 0) {
      let h = s[c * 2],
        f = s[c * 2 + 1],
        u = s[((c + 1) % n) * 2],
        d = s[((c + 1) % n) * 2 + 1],
        p = Math.hypot(u - h, d - f);
      i.push({ ax: h, az: f, ux: (u - h) / p, uz: (d - f) / p, l: p, y: e[c] });
    }
  let a = (c, h, f) => c.map((u, d) => u + (h[d] - u) * f),
    r = e.spans || [],
    l = (c, h, f, u, d, p, m, g, b, v) => {
      for (let x of r) {
        let y = (c[0] - x.ax) * -x.uz + (c[2] - x.az) * x.ux,
          M = (h[0] - x.ax) * -x.uz + (h[2] - x.az) * x.ux;
        if (Math.abs(y) > 0.07 || Math.abs(M) > 0.07) continue;
        let S = (c[0] - x.ax) * x.ux + (c[2] - x.az) * x.uz,
          w = (h[0] - x.ax) * x.ux + (h[2] - x.az) * x.uz;
        if (w <= S + 1e-4) continue;
        let _ = Math.max(S, x.sa),
          z = Math.min(w, x.sb);
        if (z - _ < 0.01) continue;
        let A = (P) => [a(c, h, P), a(u, f, P), a(d, p, P), a(g, m, P)],
          T = (_ - S) / (w - S),
          E = (z - S) / (w - S),
          R = (P, C, I) => {
            if (C - P < 1e-4) return;
            let [L, F, O, B] = A(P),
              [H, N, D, U] = A(C);
            if (I) {
              if (F[1] <= x.y + 0.01 && N[1] <= x.y + 0.01) return;
              let G = Math.max(0, (x.y - L[1]) / (F[1] - L[1])),
                W = Math.max(0, (x.y - H[1]) / (N[1] - H[1]));
              (G > 0 || W > 0) &&
                ((L = a(L, F, Math.min(1, G))),
                (O = a(O, B, Math.min(1, G))),
                (H = a(H, N, Math.min(1, W))),
                (D = a(D, U, Math.min(1, W))));
            }
            o.quad(L, H, N, F, O, D, U, B, b, v);
          };
        return (R(0, T, !1), R(T, E, !0), R(E, 1, !1), !0);
      }
      return !1;
    };
  return {
    get v() {
      return o.v;
    },
    get p() {
      return o.p;
    },
    get empty() {
      return o.empty;
    },
    vert: (...c) => o.vert(...c),
    tri: (...c) => o.tri(...c),
    quad(c, h, f, u, d, p, m, g, b, v = null) {
      if (
        Math.abs(c[0] - u[0]) + Math.abs(c[2] - u[2]) < 0.01 &&
        Math.abs(h[0] - f[0]) + Math.abs(h[2] - f[2]) < 0.01 &&
        u[1] > c[1] &&
        f[1] > h[1]
      )
        for (let x of i) {
          let y = (c[0] - x.ax) * -x.uz + (c[2] - x.az) * x.ux,
            M = (h[0] - x.ax) * -x.uz + (h[2] - x.az) * x.ux,
            S = (c[0] - x.ax) * x.ux + (c[2] - x.az) * x.uz,
            w = (h[0] - x.ax) * x.ux + (h[2] - x.az) * x.uz;
          if (
            Math.abs(y) > 0.04 ||
            Math.abs(M) > 0.04 ||
            Math.min(S, w) < -0.05 ||
            Math.max(S, w) > x.l + 0.05 ||
            w < S
          )
            continue;
          if (u[1] <= x.y + 0.01 && f[1] <= x.y + 0.01) return;
          let _ = Math.max(0, (x.y - c[1]) / (u[1] - c[1])),
            z = Math.max(0, (x.y - h[1]) / (f[1] - h[1]));
          (_ > 0 || z > 0) &&
            ((c = a(c, u, Math.min(1, _))),
            (d = a(d, g, Math.min(1, _))),
            (h = a(h, f, Math.min(1, z))),
            (p = a(p, m, Math.min(1, z))));
          break;
        }
      (r.length &&
        Math.abs(c[0] - u[0]) + Math.abs(c[2] - u[2]) < 0.01 &&
        Math.abs(h[0] - f[0]) + Math.abs(h[2] - f[2]) < 0.01 &&
        u[1] > c[1] &&
        f[1] > h[1] &&
        l(c, h, f, u, d, p, m, g, b, v)) ||
        o.quad(c, h, f, u, d, p, m, g, b, v);
    },
    wall(c, h, f, u, d, p, m, g, b, v = 0, x = 0) {
      let y = f - c,
        M = u - h,
        S = Math.hypot(y, M) || 1;
      this.quad(
        [c, d, h],
        [f, p, u],
        [f, g, u],
        [c, m, h],
        [v, d - x],
        [v + S, p - x],
        [v + S, g - x],
        [v, m - x],
        b,
        [-M / S, 0, y / S],
      );
    },
  };
}
function ngt(o, t) {
  let e = sgt(o),
    s = o.bld;
  return (n, i, a) => {
    let r = e.cells.get(
      (Math.floor(n / e.CS) + 4096) * 8192 + Math.floor(i / e.CS) + 4096,
    );
    if (!r) return !1;
    for (let l of r) {
      if (l === t.i) continue;
      let c = l * 4;
      if (
        n < e.box[c] - 0.2 ||
        n > e.box[c + 2] + 0.2 ||
        i < e.box[c + 1] - 0.2 ||
        i > e.box[c + 3] + 0.2
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
            v = s.pts[m * 2],
            x = s.pts[m * 2 + 1];
          b > i != x > i && n < ((v - g) * (i - b)) / (x - b) + g && (u = !u);
          let y = v - g,
            M = x - b,
            S = y * y + M * M || 1,
            w = Math.max(0, Math.min(1, ((n - g) * y + (i - b) * M) / S));
          d = Math.min(d, Math.hypot(g + y * w - n, b + M * w - i));
        }
        if (u && d > 0.03) return !0;
      }
    }
    return !1;
  };
}
var GX = new Set([
    ...jm,
    "northbeach",
    "chinatown",
    "wharf",
    "soma",
    "tenderloin",
  ]),
  igt = new Set([
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
function YC(o, t, e, s, n) {
  let i = Math.hypot(s - t, n - e) || 1,
    a = (t + s) / 2 - ((n - e) / i) * 4,
    r = (e + n) / 2 + ((s - t) / i) * 4,
    l = Di(a, r);
  if (!GX.has(l) && !igt.has(l)) return 0;
  let c = o.roadAt(a, r, 10);
  return !c || c.E.cls === "service" || c.E.cls === "motorway" || c.E.layer
    ? 0
    : Lp.has(c.E.name)
      ? 1
      : GX.has(l)
        ? 0.8
        : 0;
}
var VX = { walk: 1, road: 1 };
function JC(o, t, e, s, n, i, a, r = 1) {
  let l = Math.hypot(n - e, i - s);
  if (l < 2.2 || r <= 0 || Bn(a, 61) < 0.12) return;
  let c = (n - e) / l,
    h = (i - s) / l,
    f = -h,
    u = c,
    d = Math.min(1.3, l * 0.28),
    p = e + (c * l) / 2,
    m = s + (h * l) / 2;
  if (!VX[t.surfaceAt(p + f * 1.2, m + u * 1.2)]) return;
  let g = VX[t.surfaceAt(p + f * 3.6, m + u * 3.6)] ? 1 : 0,
    b = t.driveHeight(e + f * 1.6, s + u * 1.6) + 0.1,
    v = t.driveHeight(n + f * 1.6, i + u * 1.6) + 0.1,
    x = o("spill"),
    y = [0.2, d, l - d, l - 0.2],
    M = [0.12, 1.2, 3.6],
    S = [0, 1, 1, 0],
    w = [1, 0.5, 0],
    _ = r * (0.75 + 0.5 * Bn(a, 62)),
    z = Bn(a, 63) < 0.15 ? [0.95, 0.78, 0.55] : [1, 0.64, 0.34],
    A = x.v;
  M.forEach((T, E) =>
    y.forEach((R, P) => {
      let C = e + c * R + f * T,
        I = s + h * R + u * T,
        L = S[P] * w[E] * _ * (E === 1 && !g ? 0.6 : 1);
      x.vert(C, b + ((v - b) * R) / l, I, 0, 1, 0, 0, 0, [
        z[0] * L,
        z[1] * L,
        z[2] * L,
        1,
      ]);
    }),
  );
  for (let T = 0; T < 2; T++)
    for (let E = 0; E < 3; E++) {
      let R = A + T * 4 + E;
      (x.tri(R, R + 4, R + 5), x.tri(R, R + 5, R + 1));
    }
}
