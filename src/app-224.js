// app 224 — math
// Lines 118518-118779 of readable/app.pretty.js (statement-aligned).
function Bxt(o, t) {
  if (Qe.tollIslands && Qe.tollAt) return Fxt(o, t);
  let e = Qe.tollAt || ((b) => ff("gg", b)),
    s = Qe.tollHw ?? 11.5,
    n = t.G("ggPlaza", "gpaint"),
    i = t.G("ggPlaza", "glow"),
    a = t.G("ggPlaza", "wall"),
    r = (b, v, x) => [b.x - b.uz * v, x, b.z + b.ux * v],
    l = [0.82, 0.82, 0.8, 0.5],
    c = [0.35, 0.36, 0.37, 0.4],
    h = [0.03, 0.04, 0.05, 0.08],
    f = [0.8, 0.6, 0.05, 0.5],
    u = -98,
    d = e(u),
    p = d.ux,
    m = d.uz,
    g = d.y;
  (Ge(n, d.x, d.z, p, m, 7, s + 3.2, g + 6.2, g + 7, l, [1, 1, 1, 1, 1, 1]),
    Ge(
      n,
      d.x,
      d.z,
      p,
      m,
      7.3,
      s + 3.5,
      g + 6.9,
      g + 7.4,
      [0.6, 0.1, 0.04, 0.5],
      [1, 1, 1, 1, 1, 0],
    ));
  for (let b = -5.5; b <= 5.6; b += 2.75)
    for (let v of [-s + 1.8, -5.6, 5.6, s - 1.8]) {
      let x = r(e(u + b), v, g + 6.15);
      Ge(
        i,
        x[0],
        x[2],
        p,
        m,
        0.6,
        0.18,
        x[1],
        x[1] + 0.05,
        [1, 0.95, 0.85, 0.25],
        [0, 0, 0, 0, 0, 1],
      );
    }
  for (let b of Qe.tollIslands || [0, -(s + 1.1), s + 1.1]) {
    let v = e(u),
      x = r(v, b, v.y),
      y = b === 0 && !Qe.tollIslands;
    if (Qe.tollIslands) {
      let S = r(v, b, 0);
      (o.colliders.push({
        t: "obb",
        x: S[0],
        z: S[2],
        hx: 0.9,
        hz: 7.6,
        c: Math.cos(Math.atan2(p, m)),
        s: Math.sin(Math.atan2(p, m)),
      }),
        Ge(
          a,
          x[0],
          x[2],
          p,
          m,
          7.5,
          0.8,
          v.y,
          v.y + 0.22,
          [0.8, 0.78, 0.74, yi.granite],
          [1, 1, 1, 1, 1, 0],
        ));
    }
    if (y) {
      Ge(
        a,
        x[0],
        x[2],
        p,
        m,
        7.5,
        0.85,
        v.y,
        v.y + 0.22,
        [0.8, 0.78, 0.74, yi.granite],
        [1, 1, 1, 1, 1, 0],
      );
      for (let S of [-7.8, 7.8]) {
        let w = r(e(u + S), 0, v.y);
        Ge(
          n,
          w[0],
          w[2],
          p,
          m,
          0.3,
          0.6,
          v.y,
          v.y + 0.9,
          f,
          [1, 1, 1, 1, 1, 0],
        );
      }
      for (let S = -2.6; S <= 2.61; S += 1.3) {
        let w = u + S * 3,
          _ = e(w),
          z = r(_, 0, 0);
        o.colliders.push({
          t: "obb",
          x: z[0],
          z: z[2],
          hx: 0.88,
          hz: 1.6,
          c: Math.cos(Math.atan2(p, m)),
          s: Math.sin(Math.atan2(p, m)),
        });
      }
    }
    let M = y ? 0.68 : 0.85;
    (Ge(
      n,
      x[0],
      x[2],
      p,
      m,
      2.2,
      M,
      v.y + 0.2,
      v.y + 1.1,
      l,
      [1, 1, 1, 1, 0, 0],
    ),
      Ge(
        n,
        x[0],
        x[2],
        p,
        m,
        2.15,
        M - 0.05,
        v.y + 1.1,
        v.y + 2.35,
        h,
        [1, 1, 1, 1, 0, 0],
      ),
      Ge(
        n,
        x[0],
        x[2],
        p,
        m,
        2.3,
        M + 0.1,
        v.y + 2.35,
        v.y + 2.75,
        l,
        [1, 1, 1, 1, 1, 0],
      ),
      Ge(
        i,
        x[0],
        x[2],
        p,
        m,
        2.1,
        M - 0.07,
        v.y + 1.15,
        v.y + 2.3,
        [1, 0.85, 0.6, 0],
        [1, 1, 1, 1, 0, 0],
      ));
    for (let S of [-6.5, 6.5]) {
      let w = r(e(u + S), b, v.y);
      Ge(n, w[0], w[2], p, m, 0.3, 0.3, v.y, v.y + 6.3, c, [1, 1, 1, 1, 0, 0]);
    }
  }
  {
    let v = e(-132),
      x = v.y;
    for (let y of [-(s + 1.6), s + 1.6]) {
      let M = r(v, y, x);
      Ge(
        n,
        M[0],
        M[2],
        v.ux,
        v.uz,
        0.35,
        0.35,
        x,
        x + 8.2,
        c,
        [1, 1, 1, 1, 1, 0],
      );
    }
    for (let [y, M] of [
      [7.2, -0.5],
      [8.2, -0.5],
      [7.2, 0.5],
      [8.2, 0.5],
    ]) {
      let S = r(e(-132 + M), -(s + 1.6), x + y),
        w = r(e(-132 + M), s + 1.6, x + y);
      ci(n, S, w, 0.18, 0.18, c);
    }
    for (let y = -s - 1; y < s + 1; y += 1.6) {
      let M = r(e(-132.5), y, x + 7.2),
        S = r(e(-132 + 0.5), y + 0.8, x + 8.2);
      ci(n, M, S, 0.08, 0.08, c);
    }
    for (let y of [-9.4, -6.1, -2.8, 2.8, 6.1, 9.4]) {
      let M = r(e(-132.7), y, x + 6.6);
      Ge(
        n,
        M[0],
        M[2],
        v.ux,
        v.uz,
        0.25,
        0.3,
        M[1],
        M[1] + 0.45,
        [0.1, 0.1, 0.1, 0.3],
        [1, 1, 1, 1, 1, 1],
      );
    }
    for (let y of [-6.5, 0, 6.5]) {
      let M = r(e(-132.8), y, x + 8.4);
      Ge(
        n,
        M[0],
        M[2],
        v.ux,
        v.uz,
        0.08,
        2.6,
        M[1],
        M[1] + 2.2,
        [0.02, 0.2, 0.08, 0.3],
        [1, 1, 1, 1, 1, 1],
      );
      let S = r(e(-132 - 0.9), y, x + 8.4);
      Ge(
        n,
        S[0],
        S[2],
        v.ux,
        v.uz,
        0.02,
        2.3,
        S[1] + 1.1,
        S[1] + 1.35,
        [0.85, 0.85, 0.82, 0.3],
        [1, 0, 0, 0, 0, 0],
      );
    }
  }
}
