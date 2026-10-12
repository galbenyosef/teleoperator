// app 72 — math
// Lines 68589-69130 of readable/app.pretty.js (statement-aligned).
function kht(i) {
  let t = Jg[i],
    e = [],
    s = 3 + t.shin,
    n = s + t.thigh,
    o = n + t.pelvis,
    a = o + t.torso,
    r = a + t.neck,
    [l, c, h] = t.head,
    f = r + c,
    u = n - 1.5,
    d = a - 1.5,
    p = u * J1,
    m = (E) => (e.push(E), E),
    g = (E) => Math.min(1, Math.max(0, (E / J1 - o) / (t.torso * 0.7)));
  for (let [E, A] of [
    [1, 1],
    [2, -1],
  ]) {
    let C = A * t.legX,
      P = [C, u, 0],
      I = (u - s) * J1,
      L = (O) => m(new Dl(E, P, O, null, s, I)),
      [F, N] = t.foot;
    L(null).column(
      0,
      3,
      () => [C, N / 2 - 3.2, F / 2, N / 2],
      (O, D, U, G) => (D === 0 || (G > 0.62 && D === 1) ? us.sole : us.shoes),
      3,
    );
    let B = (O) => (D) => {
      let U = (D - 3) / (n - 3),
        G =
          D < s
            ? Nd(t.shinR * 0.8, t.shinR, (D - 3) / (t.shin * 0.6))
            : Nd(t.shinR * 1.02, t.thighR, (D - s) / (t.thigh * 0.7)),
        q = O ? 1.12 : 1;
      return [C * (1 - 0.06 * U), D < s ? -0.3 : 0, G * q, G * q * 1.02];
    };
    L(["bottom", 0])
      .column(3, n + 1, B(!0), (O, D) => us.bottom)
      .column(
        3,
        5,
        (O) => {
          let D = B(!0)(O);
          return [D[0], D[1], D[2] + 0.5, D[3] + 0.5];
        },
        us.bottom,
      );
    let H = s + 3;
    (L(["bottom", 1]).column(
      3,
      n + 1,
      (O) => {
        let D = B(!1)(O);
        return O >= H ? [D[0], D[1], D[2] * 1.15, D[3] * 1.15] : D;
      },
      (O, D) => (D >= H ? us.bottom : us.legskin),
    ),
      L(["bottom", 2]).column(3, n + 1, B(!1), us.tights));
  }
  let b = (E, A = null) => {
    let C = m(new Dl(0, [0, u, 0], E, A));
    return ((C.spine = g), C);
  };
  for (let E = 0; E < 3; E++) {
    let A = b(["bottom", E]);
    (A.column(
      n - 3,
      o + 1,
      (C) => [
        0,
        0,
        Nd(t.hipW[0] * 0.92, t.hipW[0], (C - n + 3) / 3) * (C >= o ? 0.98 : 1),
        t.hipW[1],
      ],
      (C, P, I, L) =>
        E < 2 && P >= o
          ? L > 0.8 && Math.abs(C + 0.5) < 1.2
            ? us.metal
            : us.belt
          : us.bottom,
    ),
      E === 2 &&
        A.column(
          s + 3,
          o,
          (C) => {
            let P = (o - C) / (o - s - 3);
            return [
              0,
              0.2,
              t.hipW[0] * (1 + 0.32 * P) + 0.4,
              t.hipW[1] * (1 + 0.3 * P) + 0.4,
            ];
          },
          (C, P) => (P === s + 3 ? us.topacc : us.bottom),
          3,
        ));
  }
  let x = (E) => {
    let A = (E - o) / t.torso,
      C =
        A < 0.45
          ? Nd(t.waist[0], t.chest[0], A / 0.45)
          : Nd(t.chest[0], t.shoulder[0], (A - 0.45) / 0.4),
      P =
        A < 0.45
          ? Nd(t.waist[1], t.chest[1], A / 0.45)
          : Nd(t.chest[1], t.shoulder[1], (A - 0.45) / 0.5);
    return (
      E === a - 1 && ((C *= 0.86), (P *= 0.92)),
      E === a - 2 && (C *= 0.97),
      [0, 0.1, C, P]
    );
  };
  for (let E = 0; E < 4; E++) {
    let A = b(["top", E]),
      C = E >= 2 ? 0.5 : 0;
    if (
      (A.column(
        o - (E === 2 ? 1 : 0),
        a,
        (P) => {
          let I = x(P);
          return [I[0], I[1], I[2] + C, I[3] + C];
        },
        (P, I, L, F, N) => {
          let B = Math.abs(P + 0.5);
          return E === 0
            ? I >= a - 2 && F > 0.55 && B < 2.5
              ? I === a - 2
                ? us.topacc
                : us.hand
              : I === a - 1 && B < 3.5
                ? us.topacc
                : us.top
            : E === 1
              ? I < o + 2 || (I === a - 1 && B < 3.5)
                ? us.topacc
                : us.top
              : E === 2
                ? F > 0.75 && B < 1.6
                  ? (I >= a - 3 && B < 1, us.top)
                  : F > 0.7 &&
                      I >= o + 1 &&
                      I <= o + 3 &&
                      B > 2.5 &&
                      B < 5.5 &&
                      I === o + 3
                    ? us.topacc
                    : us.jacket
                : F > 0.7 && I >= o + 1 && I <= o + 4 && B < 4
                  ? us.topacc
                  : us.top;
        },
      ),
      E === 2)
    )
      for (let P of [-1, 1])
        for (let I = a - 6; I < a; I++) {
          let L =
              P > 0
                ? 1 + Math.floor((a - I) / 3)
                : -2 - Math.floor((a - I) / 3),
            F = x(I);
          (A.set(L, I, Math.floor(F[1] + F[3] + 0.5), us.jacket),
            A.set(L + P, I, Math.floor(F[1] + F[3] + 0.5), us.jacket));
        }
    if (
      ((E === 1 || E === 2) &&
        A.column(
          a - 1,
          a + 1,
          () => [0, -0.4, 2.6, 2.4],
          (P, I, L, F) =>
            F > 0.3 && Math.abs(P + 0.5) < 1.5 ? null : us.topacc,
        ),
      E === 3)
    ) {
      A.column(
        a - 3,
        a + 3,
        (P) => [0, -t.shoulder[1] - 0.6, 3.6 - Math.max(0, P - a) * 0.5, 1.8],
        us.top,
      );
      for (let P of [-1, 1])
        A.box(
          P > 0 ? 1 : -2,
          P > 0 ? 2 : -1,
          a - 5,
          a - 1,
          Math.floor(x(a - 3)[3] + 0.5),
          Math.floor(x(a - 3)[3] + 1.5),
          us.topacc,
        );
    }
    E === 3 &&
      A.box(
        -3.5,
        3.5,
        o + 1,
        o + 4,
        Math.floor(x(o + 2)[3] + 0.6),
        Math.floor(x(o + 2)[3] + 1.6),
        us.topacc,
      );
  }
  m(new Dl(0, [0, u, 0])).column(
    a - 1,
    r + 2,
    () => [0, -0.3, 1.9, 1.9],
    us.hand,
  ).spine = g;
  for (let [E, A] of [
    [3, 1],
    [4, -1],
  ]) {
    let C = A * (t.shoulder[0] + t.armR - 0.4),
      P = [C, d, 0],
      I = a - 1 - t.upper,
      L = I - t.fore,
      F = (d - I) * J1,
      N = (D) => m(new Dl(E, P, D, null, I, F)),
      B = (D) => (U) => {
        let G = U >= I ? t.armR : Nd(t.foreR * 0.85, t.foreR, (U - L) / t.fore);
        return [
          C - A * (U >= a - 2 ? (U - a + 3) * 0.5 : 0),
          0,
          (G + D) * (U >= a - 1 ? 0.8 : 1),
          G + D,
        ];
      };
    for (let D = 0; D < 4; D++) {
      let U = D >= 2 ? 0.45 : D === 1 ? 0.2 : 0,
        G = I + Math.round(t.upper * 0.45);
      N(["top", D]).column(
        L,
        a,
        (q) => B(D === 0 && q >= G ? 0.4 : U)(q),
        (q, W) =>
          D === 0
            ? W >= G
              ? W === G
                ? us.topacc
                : us.top
              : us.hand
            : W < L + 2
              ? us.topacc
              : D === 2
                ? us.jacket
                : us.top,
      );
    }
    let H = t.hand,
      O = N(null);
    if (
      (O.column(
        L - H,
        L + 1,
        (D) => [C, 0.3, t.foreR + 0.2, t.foreR * 1.25],
        us.hand,
        2.4,
      ),
      O.box(
        C - A * 1 - (A > 0 ? 1 : 0),
        C - A * 1 - (A > 0 ? 0 : -1),
        L - 2,
        L,
        Math.ceil(t.foreR * 1.25 + 0.3),
        Math.ceil(t.foreR * 1.25 + 0.3) + 1,
        us.hand,
      ),
      E === 4 &&
        N(["prop", 1]).box(
          C - 1.5,
          C + 1.5,
          L - H - 1,
          L + 1,
          Math.ceil(t.foreR * 1.25 + 0.3) + 1,
          Math.ceil(t.foreR * 1.25 + 0.3) + 2,
          us.phone,
        ),
      E === 3)
    ) {
      let D = N(["bag", 3]);
      (D.box(C - 2.5, C + 2.5, L - H - 10, L - H - 1, -4, 5, us.bag),
        D.box(C - 0.5, C + 0.5, L - H - 1, L - 1, -2, -1, us.bagacc).box(
          C - 0.5,
          C + 0.5,
          L - H - 1,
          L - 1,
          2,
          3,
          us.bagacc,
        ));
    }
  }
  {
    let E = -Math.ceil(t.chest[1] + 0.5),
      A = b(["bag", 1]);
    A.column(
      o,
      a - 1,
      () => [0, E - 2.2, t.chest[0] * 0.75, 2.4],
      (I, L, F, N) =>
        N < -0.5 && L < o + 5 && Math.abs(I + 0.5) < t.chest[0] * 0.5
          ? us.bagacc
          : us.bag,
      3,
    );
    for (let I of [-1, 1]) {
      let L = Math.round(I * t.chest[0] * 0.55) - (I < 0 ? 1 : 0);
      (A.box(
        L,
        L + 1,
        o + 3,
        a,
        Math.floor(x(a - 3)[3] + 0.6),
        Math.floor(x(a - 3)[3] + 1.6),
        us.bagacc,
      ),
        A.box(L, L + 1, a - 1, a, E, Math.floor(x(a - 3)[3] + 1.6), us.bagacc));
    }
    let C = b(["bag", 2]),
      P = t.torso + 2;
    for (let I = 0; I < P; I++) {
      let L = a - 1 - I,
        F = Math.round(
          -t.shoulder[0] * 0.7 +
            ((t.hipW[0] + t.shoulder[0] * 0.7) * I) / (P - 1),
        ),
        N = x(Math.max(o, L)),
        B = Math.floor(N[1] + N[3] + 0.5 + (L < o ? 0.6 : 0));
      (C.set(F, L, B, us.bagacc), C.set(F + 1, L, B, us.bagacc));
    }
    C.box(
      Math.ceil(t.hipW[0]),
      Math.ceil(t.hipW[0]) + 3,
      n - 4,
      n + 3,
      -4,
      4,
      (I, L) => (L === n + 2 ? us.bagacc : us.bag),
    );
  }
  let v = [0, r, 0],
    y = -l / 2,
    M = -h / 2,
    S = m(new Dl(5, v));
  ((S.face = { x0: y, x1: y + l, y0: r, y1: f }),
    S.blob(0, r + c / 2, 0, l / 2, c / 2, h / 2, us.head, 3.2));
  let w = (E, A, C) => S.has(E, A, C),
    z = (E) => m(new Dl(5, v, ["hair", E])),
    _ = (E, A, C, P, { thick: I = 1, jag: L = 0, top: F = 0 } = {}) => {
      for (let N = y - I - 1; N <= y + l + I; N++)
        for (let B = M - I - 1; B <= M + h + I; B++)
          for (let H = r - 1; H <= f + I + F; H++) {
            if (w(N, H, B)) continue;
            let O = !1;
            for (let q = -I; q <= I && !O; q++)
              for (let W = -I; W <= I && !O; W++)
                for (let V = -I; V <= I && !O; V++)
                  w(N + q, H + W, B + V) && (O = !0);
            if (!O) continue;
            let D = (B - M + 0.5) / h,
              U = Math.abs(N + 0.5) / (l / 2),
              G =
                D > 0.72 ? A : D < 0.35 ? P : U > 0.8 ? C : Math.min(A, C) + 1;
            (L && D > 0.72 && (G -= (N * 7 + 13) % 3 === 0 ? L : 0),
              H - r >= G && E.set(N, H, B, us.hair));
          }
    },
    R = M + h;
  {
    let E = z(1);
    _(E, c - 3, 6, 3, { jag: 1 });
  }
  {
    let E = z(2);
    (_(E, c - 3, 6, 3),
      E.blob(0.5, f + 1, 2.5, l / 2 - 1, 2.2, 3.5, us.hair, 2.4));
  }
  {
    let E = z(3);
    (_(E, c - 4, 1, -1, { thick: 1, jag: 1 }),
      E.box(y, y + l, r - 6, r + 3, M - 2, M + 3, (A, C, P) =>
        w(A, C, P) ||
        (C < r - 3 && Math.abs(A + 0.5) > l / 2 - 1.5) ||
        (C === r - 6 && A & 1)
          ? null
          : us.hair,
      ));
    for (let A of [-1, 1])
      E.box(
        A > 0 ? y + l : y - 1,
        A > 0 ? y + l + 1 : y,
        r - 3,
        r + 4,
        M,
        R - 3,
        (C, P, I) => (P < r - 1 + ((I * 3) % 3) ? null : us.hair),
      );
    E.box(y + 1, y + l - 1, f - 4, f - 2, R, R + 1, (A, C) =>
      C === f - 4 && (A * 5) % 3 === 0 ? null : us.hair,
    );
  }
  {
    let E = z(4);
    (_(E, c - 3, 5, 4), E.blob(0, f + 1.5, M + 3, 2.6, 2.4, 2.6, us.hair));
  }
  {
    let E = z(5);
    _(E, c - 4, 4, 2, { thick: 2, top: 1 });
    for (let [A, C, P] of [...E.vox.values()])
      (A * 7 + C * 3 + P * 5) % 4 === 0 &&
        !w(A, C + 1, P) &&
        E.set(A, C + 1, P, us.hair);
  }
  {
    let E = z(6);
    (_(E, c - 4, 2, 2, { thick: 1 }),
      E.box(y, y + l, f - 4, f - 2, R, R + 1, us.hair));
  }
  {
    let E = z(7);
    (_(E, c - 3, 5, 4),
      E.box(-1, 1, f - 4, f - 2, M - 2, M - 1, us.hatacc),
      E.column(
        r - 6,
        f - 3,
        (A) => [
          0,
          M - 2.2 - Math.max(0, f - 4 - A) * 0.12,
          1.4 - Math.max(0, r - A) * 0.12,
          1.3,
        ],
        us.hair,
      ));
  }
  for (let E of e.filter((A) => A.part === 5 && A !== S)) E.occ = S;
  let T = (E) => {
    let A = m(new Dl(5, v, ["hat", E]));
    return ((A.occ = S), (A.inflate = [0, (r + c / 2) * J1, 0, 0.007]), A);
  };
  {
    let E = T(1);
    _(E, c - 4, c - 4, c - 4, { thick: 1, top: 1 });
    for (let A of E.vox.values()) A[3] = (A[1] >= f, us.hat);
    (E.box(y + 1, y + l - 1, f - 4, f - 3, R, R + 5, us.hatacc),
      E.box(-1, 1, f + 1, f + 2, -1, 1, us.hatacc));
  }
  {
    let E = T(2);
    _(E, c - 5, c - 5, c - 5, { thick: 1, top: 1 });
    for (let A of E.vox.values()) A[1] < r + c - 3 && (A[3] = us.hatacc);
    E.blob(0, f + 2.5, 0, 2, 2, 2, us.hatacc);
  }
  {
    let E = T(3);
    (E.column(f - 3, f - 2, () => [0, 0, l / 2 + 4, h / 2 + 4], us.hat, 2),
      E.column(
        f - 2,
        f + 2,
        () => [0, 0, l / 2 - 0.2, h / 2 - 0.2],
        (A, C) => (C === f - 2 ? us.hatacc : us.hat),
        3,
      ));
  }
  {
    let E = T(4);
    for (let A = 0; A <= 10; A++) {
      let C = -Math.PI / 2 + (Math.PI * A) / 10;
      (E.set(
        Math.round(Math.sin(C) * (l / 2 + 1)) - (C < 0 ? 1 : 0),
        Math.round(r + c / 2 + Math.cos(C) * (c / 2 + 1)),
        0,
        us.hat,
      ),
        E.set(
          Math.round(Math.sin(C) * (l / 2 + 1)) - (C < 0 ? 1 : 0),
          Math.round(r + c / 2 + Math.cos(C) * (c / 2 + 1)),
          -1,
          us.hat,
        ));
    }
    for (let A of [-1, 1])
      E.box(
        A > 0 ? y + l : y - 2,
        A > 0 ? y + l + 2 : y,
        r + 3,
        r + 8,
        -2,
        2,
        us.hatacc,
      );
  }
  {
    let E = m(new Dl(5, v, ["glasses", 1]));
    E.occ = S;
    let A = r + Math.round(c * 0.52);
    for (let C of [-1, 1])
      E.box(C > 0 ? 1 : -5, C > 0 ? 5 : -1, A, A + 3, R, R + 1, us.lens);
    E.box(-1, 1, A + 2, A + 3, R, R + 1, us.glasses);
    for (let C of [y - 0, y + l - 1])
      E.box(
        C + (C < 0 ? -1 : 1),
        C + (C < 0 ? 0 : 2),
        A + 2,
        A + 3,
        M + 3,
        R,
        us.glasses,
      );
  }
  {
    let E = m(new Dl(5, v, ["cloud", 1]));
    ((E.occ = S),
      E.column(f - 1, f + 4, () => [0, 0, 1.6, 1.6], us.cloud),
      E.blob(0, f + 8, 0, 5.5, 4, 5, us.cloud),
      E.blob(-5.5, f + 6.5, 0.5, 3.6, 3, 3.5, us.cloud),
      E.blob(5.5, f + 7, -0.5, 3.8, 3.2, 3.6, us.cloud),
      E.blob(0.5, f + 12, -0.5, 3.6, 3, 3.4, us.cloud));
  }
  {
    let E = m(new Dl(5, v, ["stars", 1]));
    for (let A = 0; A < 5; A++) {
      let C = (A / 5) * Math.PI * 2,
        P = Math.round(Math.sin(C) * (l / 2 + 2)),
        I = Math.round(Math.cos(C) * (h / 2 + 2)),
        L = f + 1 + (A % 2);
      E.set(P, L, I, us.star)
        .set(P + 1, L, I, us.star)
        .set(P - 1, L, I, us.star)
        .set(P, L + 1, I, us.star)
        .set(P, L - 1, I, us.star);
    }
  }
  return { pieces: e, head: S, hip: p, B: t, HT: f };
}
