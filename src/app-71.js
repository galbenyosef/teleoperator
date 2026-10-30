// app 71 — math
// Lines 68820-69361 of readable/app.pretty.js (statement-aligned).
function qdt(o) {
  let t = Db[o],
    e = [],
    s = 3 + t.shin,
    n = s + t.thigh,
    i = n + t.pelvis,
    a = i + t.torso,
    r = a + t.neck,
    [l, c, h] = t.head,
    f = r + c,
    u = n - 1.5,
    d = a - 1.5,
    p = u * Fm,
    m = (E) => (e.push(E), E),
    g = (E) => Math.min(1, Math.max(0, (E / Fm - i) / (t.torso * 0.7)));
  for (let [E, R] of [
    [1, 1],
    [2, -1],
  ]) {
    let P = R * t.legX,
      C = [P, u, 0],
      I = (u - s) * Fm,
      L = (N) => m(new rc(E, C, N, null, s, I)),
      [F, O] = t.foot;
    L(null).column(
      0,
      3,
      () => [P, O / 2 - 3.2, F / 2, O / 2],
      (N, D, U, G) => (D === 0 || (G > 0.62 && D === 1) ? bs.sole : bs.shoes),
      3,
    );
    let B = (N) => (D) => {
      let U = (D - 3) / (n - 3),
        G =
          D < s
            ? mp(t.shinR * 0.8, t.shinR, (D - 3) / (t.shin * 0.6))
            : mp(t.shinR * 1.02, t.thighR, (D - s) / (t.thigh * 0.7)),
        W = N ? 1.12 : 1;
      return [P * (1 - 0.06 * U), D < s ? -0.3 : 0, G * W, G * W * 1.02];
    };
    L(["bottom", 0])
      .column(3, n + 1, B(!0), (N, D) => bs.bottom)
      .column(
        3,
        5,
        (N) => {
          let D = B(!0)(N);
          return [D[0], D[1], D[2] + 0.5, D[3] + 0.5];
        },
        bs.bottom,
      );
    let H = s + 3;
    (L(["bottom", 1]).column(
      3,
      n + 1,
      (N) => {
        let D = B(!1)(N);
        return N >= H ? [D[0], D[1], D[2] * 1.15, D[3] * 1.15] : D;
      },
      (N, D) => (D >= H ? bs.bottom : bs.legskin),
    ),
      L(["bottom", 2]).column(3, n + 1, B(!1), bs.tights));
  }
  let b = (E, R = null) => {
    let P = m(new rc(0, [0, u, 0], E, R));
    return ((P.spine = g), P);
  };
  for (let E = 0; E < 3; E++) {
    let R = b(["bottom", E]);
    (R.column(
      n - 3,
      i + 1,
      (P) => [
        0,
        0,
        mp(t.hipW[0] * 0.92, t.hipW[0], (P - n + 3) / 3) * (P >= i ? 0.98 : 1),
        t.hipW[1],
      ],
      (P, C, I, L) =>
        E < 2 && C >= i
          ? L > 0.8 && Math.abs(P + 0.5) < 1.2
            ? bs.metal
            : bs.belt
          : bs.bottom,
    ),
      E === 2 &&
        R.column(
          s + 3,
          i,
          (P) => {
            let C = (i - P) / (i - s - 3);
            return [
              0,
              0.2,
              t.hipW[0] * (1 + 0.32 * C) + 0.4,
              t.hipW[1] * (1 + 0.3 * C) + 0.4,
            ];
          },
          (P, C) => (C === s + 3 ? bs.topacc : bs.bottom),
          3,
        ));
  }
  let v = (E) => {
    let R = (E - i) / t.torso,
      P =
        R < 0.45
          ? mp(t.waist[0], t.chest[0], R / 0.45)
          : mp(t.chest[0], t.shoulder[0], (R - 0.45) / 0.4),
      C =
        R < 0.45
          ? mp(t.waist[1], t.chest[1], R / 0.45)
          : mp(t.chest[1], t.shoulder[1], (R - 0.45) / 0.5);
    return (
      E === a - 1 && ((P *= 0.86), (C *= 0.92)),
      E === a - 2 && (P *= 0.97),
      [0, 0.1, P, C]
    );
  };
  for (let E = 0; E < 4; E++) {
    let R = b(["top", E]),
      P = E >= 2 ? 0.5 : 0;
    if (
      (R.column(
        i - (E === 2 ? 1 : 0),
        a,
        (C) => {
          let I = v(C);
          return [I[0], I[1], I[2] + P, I[3] + P];
        },
        (C, I, L, F, O) => {
          let B = Math.abs(C + 0.5);
          return E === 0
            ? I >= a - 2 && F > 0.55 && B < 2.5
              ? I === a - 2
                ? bs.topacc
                : bs.hand
              : I === a - 1 && B < 3.5
                ? bs.topacc
                : bs.top
            : E === 1
              ? I < i + 2 || (I === a - 1 && B < 3.5)
                ? bs.topacc
                : bs.top
              : E === 2
                ? F > 0.75 && B < 1.6
                  ? (I >= a - 3 && B < 1, bs.top)
                  : F > 0.7 &&
                      I >= i + 1 &&
                      I <= i + 3 &&
                      B > 2.5 &&
                      B < 5.5 &&
                      I === i + 3
                    ? bs.topacc
                    : bs.jacket
                : F > 0.7 && I >= i + 1 && I <= i + 4 && B < 4
                  ? bs.topacc
                  : bs.top;
        },
      ),
      E === 2)
    )
      for (let C of [-1, 1])
        for (let I = a - 6; I < a; I++) {
          let L =
              C > 0
                ? 1 + Math.floor((a - I) / 3)
                : -2 - Math.floor((a - I) / 3),
            F = v(I);
          (R.set(L, I, Math.floor(F[1] + F[3] + 0.5), bs.jacket),
            R.set(L + C, I, Math.floor(F[1] + F[3] + 0.5), bs.jacket));
        }
    if (
      ((E === 1 || E === 2) &&
        R.column(
          a - 1,
          a + 1,
          () => [0, -0.4, 2.6, 2.4],
          (C, I, L, F) =>
            F > 0.3 && Math.abs(C + 0.5) < 1.5 ? null : bs.topacc,
        ),
      E === 3)
    ) {
      R.column(
        a - 3,
        a + 3,
        (C) => [0, -t.shoulder[1] - 0.6, 3.6 - Math.max(0, C - a) * 0.5, 1.8],
        bs.top,
      );
      for (let C of [-1, 1])
        R.box(
          C > 0 ? 1 : -2,
          C > 0 ? 2 : -1,
          a - 5,
          a - 1,
          Math.floor(v(a - 3)[3] + 0.5),
          Math.floor(v(a - 3)[3] + 1.5),
          bs.topacc,
        );
    }
    E === 3 &&
      R.box(
        -3.5,
        3.5,
        i + 1,
        i + 4,
        Math.floor(v(i + 2)[3] + 0.6),
        Math.floor(v(i + 2)[3] + 1.6),
        bs.topacc,
      );
  }
  m(new rc(0, [0, u, 0])).column(
    a - 1,
    r + 2,
    () => [0, -0.3, 1.9, 1.9],
    bs.hand,
  ).spine = g;
  for (let [E, R] of [
    [3, 1],
    [4, -1],
  ]) {
    let P = R * (t.shoulder[0] + t.armR - 0.4),
      C = [P, d, 0],
      I = a - 1 - t.upper,
      L = I - t.fore,
      F = (d - I) * Fm,
      O = (D) => m(new rc(E, C, D, null, I, F)),
      B = (D) => (U) => {
        let G = U >= I ? t.armR : mp(t.foreR * 0.85, t.foreR, (U - L) / t.fore);
        return [
          P - R * (U >= a - 2 ? (U - a + 3) * 0.5 : 0),
          0,
          (G + D) * (U >= a - 1 ? 0.8 : 1),
          G + D,
        ];
      };
    for (let D = 0; D < 4; D++) {
      let U = D >= 2 ? 0.45 : D === 1 ? 0.2 : 0,
        G = I + Math.round(t.upper * 0.45);
      O(["top", D]).column(
        L,
        a,
        (W) => B(D === 0 && W >= G ? 0.4 : U)(W),
        (W, V) =>
          D === 0
            ? V >= G
              ? V === G
                ? bs.topacc
                : bs.top
              : bs.hand
            : V < L + 2
              ? bs.topacc
              : D === 2
                ? bs.jacket
                : bs.top,
      );
    }
    let H = t.hand,
      N = O(null);
    if (
      (N.column(
        L - H,
        L + 1,
        (D) => [P, 0.3, t.foreR + 0.2, t.foreR * 1.25],
        bs.hand,
        2.4,
      ),
      N.box(
        P - R * 1 - (R > 0 ? 1 : 0),
        P - R * 1 - (R > 0 ? 0 : -1),
        L - 2,
        L,
        Math.ceil(t.foreR * 1.25 + 0.3),
        Math.ceil(t.foreR * 1.25 + 0.3) + 1,
        bs.hand,
      ),
      E === 4 &&
        O(["prop", 1]).box(
          P - 1.5,
          P + 1.5,
          L - H - 1,
          L + 1,
          Math.ceil(t.foreR * 1.25 + 0.3) + 1,
          Math.ceil(t.foreR * 1.25 + 0.3) + 2,
          bs.phone,
        ),
      E === 3)
    ) {
      let D = O(["bag", 3]);
      (D.box(P - 2.5, P + 2.5, L - H - 10, L - H - 1, -4, 5, bs.bag),
        D.box(P - 0.5, P + 0.5, L - H - 1, L - 1, -2, -1, bs.bagacc).box(
          P - 0.5,
          P + 0.5,
          L - H - 1,
          L - 1,
          2,
          3,
          bs.bagacc,
        ));
    }
  }
  {
    let E = -Math.ceil(t.chest[1] + 0.5),
      R = b(["bag", 1]);
    R.column(
      i,
      a - 1,
      () => [0, E - 2.2, t.chest[0] * 0.75, 2.4],
      (I, L, F, O) =>
        O < -0.5 && L < i + 5 && Math.abs(I + 0.5) < t.chest[0] * 0.5
          ? bs.bagacc
          : bs.bag,
      3,
    );
    for (let I of [-1, 1]) {
      let L = Math.round(I * t.chest[0] * 0.55) - (I < 0 ? 1 : 0);
      (R.box(
        L,
        L + 1,
        i + 3,
        a,
        Math.floor(v(a - 3)[3] + 0.6),
        Math.floor(v(a - 3)[3] + 1.6),
        bs.bagacc,
      ),
        R.box(L, L + 1, a - 1, a, E, Math.floor(v(a - 3)[3] + 1.6), bs.bagacc));
    }
    let P = b(["bag", 2]),
      C = t.torso + 2;
    for (let I = 0; I < C; I++) {
      let L = a - 1 - I,
        F = Math.round(
          -t.shoulder[0] * 0.7 +
            ((t.hipW[0] + t.shoulder[0] * 0.7) * I) / (C - 1),
        ),
        O = v(Math.max(i, L)),
        B = Math.floor(O[1] + O[3] + 0.5 + (L < i ? 0.6 : 0));
      (P.set(F, L, B, bs.bagacc), P.set(F + 1, L, B, bs.bagacc));
    }
    P.box(
      Math.ceil(t.hipW[0]),
      Math.ceil(t.hipW[0]) + 3,
      n - 4,
      n + 3,
      -4,
      4,
      (I, L) => (L === n + 2 ? bs.bagacc : bs.bag),
    );
  }
  let x = [0, r, 0],
    y = -l / 2,
    M = -h / 2,
    S = m(new rc(5, x));
  ((S.face = { x0: y, x1: y + l, y0: r, y1: f }),
    S.blob(0, r + c / 2, 0, l / 2, c / 2, h / 2, bs.head, 3.2));
  let w = (E, R, P) => S.has(E, R, P),
    _ = (E) => m(new rc(5, x, ["hair", E])),
    z = (E, R, P, C, { thick: I = 1, jag: L = 0, top: F = 0 } = {}) => {
      for (let O = y - I - 1; O <= y + l + I; O++)
        for (let B = M - I - 1; B <= M + h + I; B++)
          for (let H = r - 1; H <= f + I + F; H++) {
            if (w(O, H, B)) continue;
            let N = !1;
            for (let W = -I; W <= I && !N; W++)
              for (let V = -I; V <= I && !N; V++)
                for (let $ = -I; $ <= I && !N; $++)
                  w(O + W, H + V, B + $) && (N = !0);
            if (!N) continue;
            let D = (B - M + 0.5) / h,
              U = Math.abs(O + 0.5) / (l / 2),
              G =
                D > 0.72 ? R : D < 0.35 ? C : U > 0.8 ? P : Math.min(R, P) + 1;
            (L && D > 0.72 && (G -= (O * 7 + 13) % 3 === 0 ? L : 0),
              H - r >= G && E.set(O, H, B, bs.hair));
          }
    },
    A = M + h;
  {
    let E = _(1);
    z(E, c - 3, 6, 3, { jag: 1 });
  }
  {
    let E = _(2);
    (z(E, c - 3, 6, 3),
      E.blob(0.5, f + 1, 2.5, l / 2 - 1, 2.2, 3.5, bs.hair, 2.4));
  }
  {
    let E = _(3);
    (z(E, c - 4, 1, -1, { thick: 1, jag: 1 }),
      E.box(y, y + l, r - 6, r + 3, M - 2, M + 3, (R, P, C) =>
        w(R, P, C) ||
        (P < r - 3 && Math.abs(R + 0.5) > l / 2 - 1.5) ||
        (P === r - 6 && R & 1)
          ? null
          : bs.hair,
      ));
    for (let R of [-1, 1])
      E.box(
        R > 0 ? y + l : y - 1,
        R > 0 ? y + l + 1 : y,
        r - 3,
        r + 4,
        M,
        A - 3,
        (P, C, I) => (C < r - 1 + ((I * 3) % 3) ? null : bs.hair),
      );
    E.box(y + 1, y + l - 1, f - 4, f - 2, A, A + 1, (R, P) =>
      P === f - 4 && (R * 5) % 3 === 0 ? null : bs.hair,
    );
  }
  {
    let E = _(4);
    (z(E, c - 3, 5, 4), E.blob(0, f + 1.5, M + 3, 2.6, 2.4, 2.6, bs.hair));
  }
  {
    let E = _(5);
    z(E, c - 4, 4, 2, { thick: 2, top: 1 });
    for (let [R, P, C] of [...E.vox.values()])
      (R * 7 + P * 3 + C * 5) % 4 === 0 &&
        !w(R, P + 1, C) &&
        E.set(R, P + 1, C, bs.hair);
  }
  {
    let E = _(6);
    (z(E, c - 4, 2, 2, { thick: 1 }),
      E.box(y, y + l, f - 4, f - 2, A, A + 1, bs.hair));
  }
  {
    let E = _(7);
    (z(E, c - 3, 5, 4),
      E.box(-1, 1, f - 4, f - 2, M - 2, M - 1, bs.hatacc),
      E.column(
        r - 6,
        f - 3,
        (R) => [
          0,
          M - 2.2 - Math.max(0, f - 4 - R) * 0.12,
          1.4 - Math.max(0, r - R) * 0.12,
          1.3,
        ],
        bs.hair,
      ));
  }
  for (let E of e.filter((R) => R.part === 5 && R !== S)) E.occ = S;
  let T = (E) => {
    let R = m(new rc(5, x, ["hat", E]));
    return ((R.occ = S), (R.inflate = [0, (r + c / 2) * Fm, 0, 0.007]), R);
  };
  {
    let E = T(1);
    z(E, c - 4, c - 4, c - 4, { thick: 1, top: 1 });
    for (let R of E.vox.values()) R[3] = (R[1] >= f, bs.hat);
    (E.box(y + 1, y + l - 1, f - 4, f - 3, A, A + 5, bs.hatacc),
      E.box(-1, 1, f + 1, f + 2, -1, 1, bs.hatacc));
  }
  {
    let E = T(2);
    z(E, c - 5, c - 5, c - 5, { thick: 1, top: 1 });
    for (let R of E.vox.values()) R[1] < r + c - 3 && (R[3] = bs.hatacc);
    E.blob(0, f + 2.5, 0, 2, 2, 2, bs.hatacc);
  }
  {
    let E = T(3);
    (E.column(f - 3, f - 2, () => [0, 0, l / 2 + 4, h / 2 + 4], bs.hat, 2),
      E.column(
        f - 2,
        f + 2,
        () => [0, 0, l / 2 - 0.2, h / 2 - 0.2],
        (R, P) => (P === f - 2 ? bs.hatacc : bs.hat),
        3,
      ));
  }
  {
    let E = T(4);
    for (let R = 0; R <= 10; R++) {
      let P = -Math.PI / 2 + (Math.PI * R) / 10;
      (E.set(
        Math.round(Math.sin(P) * (l / 2 + 1)) - (P < 0 ? 1 : 0),
        Math.round(r + c / 2 + Math.cos(P) * (c / 2 + 1)),
        0,
        bs.hat,
      ),
        E.set(
          Math.round(Math.sin(P) * (l / 2 + 1)) - (P < 0 ? 1 : 0),
          Math.round(r + c / 2 + Math.cos(P) * (c / 2 + 1)),
          -1,
          bs.hat,
        ));
    }
    for (let R of [-1, 1])
      E.box(
        R > 0 ? y + l : y - 2,
        R > 0 ? y + l + 2 : y,
        r + 3,
        r + 8,
        -2,
        2,
        bs.hatacc,
      );
  }
  {
    let E = m(new rc(5, x, ["glasses", 1]));
    E.occ = S;
    let R = r + Math.round(c * 0.52);
    for (let P of [-1, 1])
      E.box(P > 0 ? 1 : -5, P > 0 ? 5 : -1, R, R + 3, A, A + 1, bs.lens);
    E.box(-1, 1, R + 2, R + 3, A, A + 1, bs.glasses);
    for (let P of [y - 0, y + l - 1])
      E.box(
        P + (P < 0 ? -1 : 1),
        P + (P < 0 ? 0 : 2),
        R + 2,
        R + 3,
        M + 3,
        A,
        bs.glasses,
      );
  }
  {
    let E = m(new rc(5, x, ["cloud", 1]));
    ((E.occ = S),
      E.column(f - 1, f + 4, () => [0, 0, 1.6, 1.6], bs.cloud),
      E.blob(0, f + 8, 0, 5.5, 4, 5, bs.cloud),
      E.blob(-5.5, f + 6.5, 0.5, 3.6, 3, 3.5, bs.cloud),
      E.blob(5.5, f + 7, -0.5, 3.8, 3.2, 3.6, bs.cloud),
      E.blob(0.5, f + 12, -0.5, 3.6, 3, 3.4, bs.cloud));
  }
  {
    let E = m(new rc(5, x, ["stars", 1]));
    for (let R = 0; R < 5; R++) {
      let P = (R / 5) * Math.PI * 2,
        C = Math.round(Math.sin(P) * (l / 2 + 2)),
        I = Math.round(Math.cos(P) * (h / 2 + 2)),
        L = f + 1 + (R % 2);
      E.set(C, L, I, bs.star)
        .set(C + 1, L, I, bs.star)
        .set(C - 1, L, I, bs.star)
        .set(C, L + 1, I, bs.star)
        .set(C, L - 1, I, bs.star);
    }
  }
  return { pieces: e, head: S, hip: p, B: t, HT: f };
}
