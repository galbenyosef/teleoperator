// app 33 — symbol
// Lines 48295-48335 of readable/app.pretty.js (statement-aligned).
var _U = Symbol("mbCache"),
  zU = Symbol("mbUid"),
  U5 = Symbol("mbSlot"),
  Ag = 4096,
  Ig = 16,
  Ya = 768,
  Rg = 4096,
  rct = 4,
  LU = globalThis.MB_SHADOW_RES || 2048,
  lct = (2 * Math.PI) / 180,
  Y6 = 128,
  J6 = 4,
  Fg = Math.min(2048, LU),
  Pg = 256,
  zc = { x: 16, y: 9, z: 24, max: 48 },
  Ng = 2,
  K6 = globalThis.MB_POINT_RES || 1024,
  q5 = 4,
  IU = 4 + 16 * J6,
  FU = IU + 16 * q5,
  G5 = FU + 96 * Ng,
  $1 = 20,
  EU = 4 * (G5 + $1 * Y6),
  cct = new ye().elements,
  V1 = new ye().set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
  W5 = 296 + Ig * 12;
function TU(i, t) {
  let e = t.elements;
  ((i[W5] = -(e[10] + e[11]) * 0.5),
    (i[W5 + 1] = e[14] * 0.5),
    (i[W5 + 2] =
      e[2] === 0 &&
      e[6] === 0 &&
      e[3] === 0 &&
      e[7] === 0 &&
      e[11] === -1 &&
      e[15] === 0
        ? 1
        : 0),
    (i[W5 + 3] = 0));
}
