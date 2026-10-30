// app 144 — math
// Lines 93135-93266 of readable/app.pretty.js (statement-aligned).
function smt(o, t) {
  let e = to,
    s = Tw(o, 275.3, 1005.2),
    n = Tw(o, 243.7, 1035.7);
  if (!s || !n) {
    console.warn("highways: Bay Bridge ends not found");
    return;
  }
  let i = r$(o, s, "b"),
    a = e.lower(22);
  if (i) {
    let H = i.P[2];
    for (let N = 0; N < i.n; N++) {
      let D = i.S[N] / i.L;
      i.P[N * 3 + 2] =
        H + (a - H) * D * D * (3 - 2 * D) * 0.35 + (a - H) * D * 0.65;
    }
    ((i.flags |= 67),
      (i.elev = !0),
      (i.layered = !0),
      (i.layer = 1),
      (s.y = a));
  }
  let r = e.portal - 60,
    l = (H, N, D = 12) => {
      let U = [],
        G = Math.ceil(Math.abs(N - H) / D);
      for (let W = 0; W <= G; W++) U.push(e.at(H + ((N - H) * W) / G));
      return U;
    },
    c = (H) => e.upper(e.s(H[0], H[1])),
    h = (H) => e.lower(e.s(H[0], H[1])),
    f = {
      lanes: 5,
      laneW: 3.6,
      name: "San Francisco\u2013Oakland Bay Bridge",
      rank: i?.rank ?? 8,
      maxspeed: 50,
      dist: "towers",
      custom: "bb",
      way: 661905446,
    },
    u = $k(o, { ...n$(e.at(r)), y: e.lower(r) }),
    d = $k(o, { ...n$(e.at(r)), y: e.upper(r) }),
    p = rx(
      [[275.3, 1005.2], ...l(e.s(275.3, 1005.2) + 12, r).slice(0)],
      h,
      a,
      null,
      60,
    ),
    m = qu(o, { ...f, pts: p, w: 9, ja: s.id, jb: u.id, layer: 1 }),
    g = [...l(r, 22), [243.7, 1035.7]],
    b = rx(g, c, null, n.y, 60),
    v = qu(o, {
      ...f,
      pts: b,
      w: 9,
      ja: d.id,
      jb: n.id,
      layer: 2,
      way: 8921938,
    });
  (s.type === "end" && (s.type = "j"), n.type === "end" && (n.type = "j"));
  let x = 88,
    y = 36,
    M = Math.asin(y / x),
    S = Math.sqrt(x * x - y * y),
    w = [S * Math.cos(M), S * Math.sin(M)],
    _ = Math.atan2(w[1], w[0] - x),
    z = [[-60, 0], [-30, 0], [0, 0], w];
  for (let H = 1; H < 24; H++) {
    let N = _ - (2 * _ * H) / 24;
    z.push([x + y * Math.cos(N), y * Math.sin(N)]);
  }
  z.push([w[0], -w[1]], [0, 0], [-30, 0], [-60, 0]);
  for (let H = 0; H < 4; H++) {
    let N = [z[0]];
    for (let D = 0; D + 1 < z.length; D++) {
      let U = z[D],
        G = z[D + 1];
      N.push(
        [U[0] * 0.75 + G[0] * 0.25, U[1] * 0.75 + G[1] * 0.25],
        [U[0] * 0.25 + G[0] * 0.75, U[1] * 0.25 + G[1] * 0.75],
      );
    }
    (N.push(z[z.length - 1]), (z = N));
  }
  let A = ax(
      z.map(([H, N]) => e.at(e.portal + H, N)),
      6,
    ),
    T = e.lower(r),
    E = e.upper(r),
    R = 0,
    P = [0];
  for (let H = 1; H < A.length; H++)
    P.push((R += Math.hypot(A[H][0] - A[H - 1][0], A[H][1] - A[H - 1][1])));
  let C = A.map((H, N) => [H[0], H[1], T + (E - T) * (P[N] / R)]),
    I = C.length >> 1,
    L = (H) => {
      let N = Math.min(P[H], R - P[H]);
      return 9 - 1.8 * Math.min(1, Math.max(0, (N - 60) / 40));
    },
    F = $k(o, { x: C[I][0], z: C[I][1], y: C[I][2] }),
    O = qu(o, {
      ...f,
      pts: C.slice(0, I + 1),
      w: (H) => L(H),
      lanes: 4,
      name: "Yerba Buena Tunnel",
      ja: u.id,
      jb: F.id,
      layer: 1,
      custom: "loop",
    }),
    B = qu(o, {
      ...f,
      pts: C.slice(I),
      w: (H) => L(H + I),
      lanes: 4,
      name: "Yerba Buena Tunnel",
      ja: F.id,
      jb: d.id,
      layer: 1,
      custom: "loop",
    });
  ((O.covered = [62, O.L + 1]),
    (B.covered = [-1, B.L - 62]),
    (t.bb = { axis: e, eb: m, wb: v, loop: O, loop2: B, e1: i }));
}
var n$ = ([o, t]) => ({ x: o, z: t });
