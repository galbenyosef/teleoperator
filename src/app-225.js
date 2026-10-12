// app 225 — math
// Lines 118262-118523 of readable/app.pretty.js (statement-aligned).
function d2t(i, t) {
  if (Ye.tollIslands && Ye.tollAt) return f2t(i, t);
  let e = Ye.tollAt || ((b) => Fh("gg", b)),
    s = Ye.tollHw ?? 11.5,
    n = t.G("ggPlaza", "gpaint"),
    o = t.G("ggPlaza", "glow"),
    a = t.G("ggPlaza", "wall"),
    r = (b, x, v) => [b.x - b.uz * x, v, b.z + b.ux * x],
    l = [0.82, 0.82, 0.8, 0.5],
    c = [0.35, 0.36, 0.37, 0.4],
    h = [0.03, 0.04, 0.05, 0.08],
    f = [0.8, 0.6, 0.05, 0.5],
    u = -98,
    d = e(u),
    p = d.ux,
    m = d.uz,
    g = d.y;
  (Ne(n, d.x, d.z, p, m, 7, s + 3.2, g + 6.2, g + 7, l, [1, 1, 1, 1, 1, 1]),
    Ne(
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
    for (let x of [-s + 1.8, -5.6, 5.6, s - 1.8]) {
      let v = r(e(u + b), x, g + 6.15);
      Ne(
        o,
        v[0],
        v[2],
        p,
        m,
        0.6,
        0.18,
        v[1],
        v[1] + 0.05,
        [1, 0.95, 0.85, 0.25],
        [0, 0, 0, 0, 0, 1],
      );
    }
  for (let b of Ye.tollIslands || [0, -(s + 1.1), s + 1.1]) {
    let x = e(u),
      v = r(x, b, x.y),
      y = b === 0 && !Ye.tollIslands;
    if (Ye.tollIslands) {
      let S = r(x, b, 0);
      (i.colliders.push({
        t: "obb",
        x: S[0],
        z: S[2],
        hx: 0.9,
        hz: 7.6,
        c: Math.cos(Math.atan2(p, m)),
        s: Math.sin(Math.atan2(p, m)),
      }),
        Ne(
          a,
          v[0],
          v[2],
          p,
          m,
          7.5,
          0.8,
          x.y,
          x.y + 0.22,
          [0.8, 0.78, 0.74, hi.granite],
          [1, 1, 1, 1, 1, 0],
        ));
    }
    if (y) {
      Ne(
        a,
        v[0],
        v[2],
        p,
        m,
        7.5,
        0.85,
        x.y,
        x.y + 0.22,
        [0.8, 0.78, 0.74, hi.granite],
        [1, 1, 1, 1, 1, 0],
      );
      for (let S of [-7.8, 7.8]) {
        let w = r(e(u + S), 0, x.y);
        Ne(
          n,
          w[0],
          w[2],
          p,
          m,
          0.3,
          0.6,
          x.y,
          x.y + 0.9,
          f,
          [1, 1, 1, 1, 1, 0],
        );
      }
      for (let S = -2.6; S <= 2.61; S += 1.3) {
        let w = u + S * 3,
          z = e(w),
          _ = r(z, 0, 0);
        i.colliders.push({
          t: "obb",
          x: _[0],
          z: _[2],
          hx: 0.88,
          hz: 1.6,
          c: Math.cos(Math.atan2(p, m)),
          s: Math.sin(Math.atan2(p, m)),
        });
      }
    }
    let M = y ? 0.68 : 0.85;
    (Ne(
      n,
      v[0],
      v[2],
      p,
      m,
      2.2,
      M,
      x.y + 0.2,
      x.y + 1.1,
      l,
      [1, 1, 1, 1, 0, 0],
    ),
      Ne(
        n,
        v[0],
        v[2],
        p,
        m,
        2.15,
        M - 0.05,
        x.y + 1.1,
        x.y + 2.35,
        h,
        [1, 1, 1, 1, 0, 0],
      ),
      Ne(
        n,
        v[0],
        v[2],
        p,
        m,
        2.3,
        M + 0.1,
        x.y + 2.35,
        x.y + 2.75,
        l,
        [1, 1, 1, 1, 1, 0],
      ),
      Ne(
        o,
        v[0],
        v[2],
        p,
        m,
        2.1,
        M - 0.07,
        x.y + 1.15,
        x.y + 2.3,
        [1, 0.85, 0.6, 0],
        [1, 1, 1, 1, 0, 0],
      ));
    for (let S of [-6.5, 6.5]) {
      let w = r(e(u + S), b, x.y);
      Ne(n, w[0], w[2], p, m, 0.3, 0.3, x.y, x.y + 6.3, c, [1, 1, 1, 1, 0, 0]);
    }
  }
  {
    let x = e(-132),
      v = x.y;
    for (let y of [-(s + 1.6), s + 1.6]) {
      let M = r(x, y, v);
      Ne(
        n,
        M[0],
        M[2],
        x.ux,
        x.uz,
        0.35,
        0.35,
        v,
        v + 8.2,
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
      let S = r(e(-132 + M), -(s + 1.6), v + y),
        w = r(e(-132 + M), s + 1.6, v + y);
      ii(n, S, w, 0.18, 0.18, c);
    }
    for (let y = -s - 1; y < s + 1; y += 1.6) {
      let M = r(e(-132.5), y, v + 7.2),
        S = r(e(-132 + 0.5), y + 0.8, v + 8.2);
      ii(n, M, S, 0.08, 0.08, c);
    }
    for (let y of [-9.4, -6.1, -2.8, 2.8, 6.1, 9.4]) {
      let M = r(e(-132.7), y, v + 6.6);
      Ne(
        n,
        M[0],
        M[2],
        x.ux,
        x.uz,
        0.25,
        0.3,
        M[1],
        M[1] + 0.45,
        [0.1, 0.1, 0.1, 0.3],
        [1, 1, 1, 1, 1, 1],
      );
    }
    for (let y of [-6.5, 0, 6.5]) {
      let M = r(e(-132.8), y, v + 8.4);
      Ne(
        n,
        M[0],
        M[2],
        x.ux,
        x.uz,
        0.08,
        2.6,
        M[1],
        M[1] + 2.2,
        [0.02, 0.2, 0.08, 0.3],
        [1, 1, 1, 1, 1, 1],
      );
      let S = r(e(-132 - 0.9), y, v + 8.4);
      Ne(
        n,
        S[0],
        S[2],
        x.ux,
        x.uz,
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
