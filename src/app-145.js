// app 145 — math
// Lines 92866-92997 of readable/app.pretty.js (statement-aligned).
function Iut(i, t) {
  let e = qi,
    s = Iy(i, 275.3, 1005.2),
    n = Iy(i, 243.7, 1035.7);
  if (!s || !n) {
    console.warn("highways: Bay Bridge ends not found");
    return;
  }
  let o = oj(i, s, "b"),
    a = e.lower(22);
  if (o) {
    let H = o.P[2];
    for (let O = 0; O < o.n; O++) {
      let D = o.S[O] / o.L;
      o.P[O * 3 + 2] =
        H + (a - H) * D * D * (3 - 2 * D) * 0.35 + (a - H) * D * 0.65;
    }
    ((o.flags |= 67),
      (o.elev = !0),
      (o.layered = !0),
      (o.layer = 1),
      (s.y = a));
  }
  let r = e.portal - 60,
    l = (H, O, D = 12) => {
      let U = [],
        G = Math.ceil(Math.abs(O - H) / D);
      for (let q = 0; q <= G; q++) U.push(e.at(H + ((O - H) * q) / G));
      return U;
    },
    c = (H) => e.upper(e.s(H[0], H[1])),
    h = (H) => e.lower(e.s(H[0], H[1])),
    f = {
      lanes: 5,
      laneW: 3.6,
      name: "San Francisco\u2013Oakland Bay Bridge",
      rank: o?.rank ?? 8,
      maxspeed: 50,
      dist: "towers",
      custom: "bb",
      way: 661905446,
    },
    u = $S(i, { ...ej(e.at(r)), y: e.lower(r) }),
    d = $S(i, { ...ej(e.at(r)), y: e.upper(r) }),
    p = wb(
      [[275.3, 1005.2], ...l(e.s(275.3, 1005.2) + 12, r).slice(0)],
      h,
      a,
      null,
      60,
    ),
    m = cu(i, { ...f, pts: p, w: 9, ja: s.id, jb: u.id, layer: 1 }),
    g = [...l(r, 22), [243.7, 1035.7]],
    b = wb(g, c, null, n.y, 60),
    x = cu(i, {
      ...f,
      pts: b,
      w: 9,
      ja: d.id,
      jb: n.id,
      layer: 2,
      way: 8921938,
    });
  (s.type === "end" && (s.type = "j"), n.type === "end" && (n.type = "j"));
  let v = 88,
    y = 36,
    M = Math.asin(y / v),
    S = Math.sqrt(v * v - y * y),
    w = [S * Math.cos(M), S * Math.sin(M)],
    z = Math.atan2(w[1], w[0] - v),
    _ = [[-60, 0], [-30, 0], [0, 0], w];
  for (let H = 1; H < 24; H++) {
    let O = z - (2 * z * H) / 24;
    _.push([v + y * Math.cos(O), y * Math.sin(O)]);
  }
  _.push([w[0], -w[1]], [0, 0], [-30, 0], [-60, 0]);
  for (let H = 0; H < 4; H++) {
    let O = [_[0]];
    for (let D = 0; D + 1 < _.length; D++) {
      let U = _[D],
        G = _[D + 1];
      O.push(
        [U[0] * 0.75 + G[0] * 0.25, U[1] * 0.75 + G[1] * 0.25],
        [U[0] * 0.25 + G[0] * 0.75, U[1] * 0.25 + G[1] * 0.75],
      );
    }
    (O.push(_[_.length - 1]), (_ = O));
  }
  let R = yb(
      _.map(([H, O]) => e.at(e.portal + H, O)),
      6,
    ),
    T = e.lower(r),
    E = e.upper(r),
    A = 0,
    C = [0];
  for (let H = 1; H < R.length; H++)
    C.push((A += Math.hypot(R[H][0] - R[H - 1][0], R[H][1] - R[H - 1][1])));
  let P = R.map((H, O) => [H[0], H[1], T + (E - T) * (C[O] / A)]),
    I = P.length >> 1,
    L = (H) => {
      let O = Math.min(C[H], A - C[H]);
      return 9 - 1.8 * Math.min(1, Math.max(0, (O - 60) / 40));
    },
    F = $S(i, { x: P[I][0], z: P[I][1], y: P[I][2] }),
    N = cu(i, {
      ...f,
      pts: P.slice(0, I + 1),
      w: (H) => L(H),
      lanes: 4,
      name: "Yerba Buena Tunnel",
      ja: u.id,
      jb: F.id,
      layer: 1,
      custom: "loop",
    }),
    B = cu(i, {
      ...f,
      pts: P.slice(I),
      w: (H) => L(H + I),
      lanes: 4,
      name: "Yerba Buena Tunnel",
      ja: F.id,
      jb: d.id,
      layer: 1,
      custom: "loop",
    });
  ((N.covered = [62, N.L + 1]),
    (B.covered = [-1, B.L - 62]),
    (t.bb = { axis: e, eb: m, wb: x, loop: N, loop2: B, e1: o }));
}
var ej = ([i, t]) => ({ x: i, z: t });
