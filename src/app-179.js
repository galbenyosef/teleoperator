// app 179 — wall
// Lines 104415-104678 of readable/app.pretty.js (statement-aligned).
function X2t(o, t, e, s) {
  let n = s & 7,
    i = s >> 8;
  switch (o) {
    case 0:
      return [["vic", "vic", 1]];
    case 1:
      return t === "marina"
        ? [
            ["edw", "mar", 1],
            ["edw", "edw", 0.35],
          ]
        : t === "cowhollow"
          ? [
              ["edw", "edw", 1],
              ["edw", "mar", 0.7],
            ]
          : t === "presidio"
            ? [["edw", "mar", 1]]
            : t === "richmond"
              ? [
                  ["edw", "edw", 1],
                  ["edw", "mar", 0.75],
                ]
              : t === "seacliff"
                ? [["edw", "mar", 1]]
                : t === "sausalito"
                  ? [
                      ["edw", "edw", 1],
                      ["edw", "mar", 0.3],
                    ]
                  : t === "pacific" ||
                      t === "western" ||
                      t === "hayes" ||
                      t === "castro" ||
                      t === "noe" ||
                      t === "dolores" ||
                      t === "haight" ||
                      t === "mission"
                    ? [
                        ["edw", "edw", 1],
                        ["edw", "mar", 0.25],
                      ]
                    : [["edw", "edw", 1]];
    case 2:
      return t === "union" && e >= 14 && (i || n >= 3)
        ? [
            ["apt", "pal", 1],
            ["apt", "apt", 0.3],
          ]
        : (t === "fidi" || t === "jackson") && e < 24
          ? [
              ["apt", "bank", 1],
              ["apt", "pal", 0.8],
            ]
          : t === "fidi" || t === "jackson"
            ? [
                ["apt", "pal", 1],
                ["apt", "bank", 0.5],
                ["apt", "apt", 0.35],
              ]
            : [["apt", "apt", 1]];
    case 3:
      return t === "chinatown"
        ? [["mix", "chn", 1]]
        : t === "northbeach" || t === "telegraph"
          ? [
              ["mix", "nb", 1],
              ["mix", "mix", 0.6],
            ]
          : t === "union" && e >= 14
            ? [["apt", "pal", 1]]
            : [
                ["mix", "mix", 1],
                ["mix", "nb", 0.3],
              ];
    case 4:
      return [["mix", "chn", 1]];
    case 5:
      return t === "jackson"
        ? [
            ["brk", "jsq", 1],
            ["brk", "brk", 0.3],
          ]
        : t === "fidi"
          ? e < 14
            ? [
                ["brk", "jsq", 1],
                ["apt", "bank", 0.7],
              ]
            : [
                ["apt", "bank", 1],
                ["apt", "pal", 0.7],
              ]
          : t === "wharf"
            ? [
                ["brk", "wrf", 1],
                ["brk", "brk", 0.8],
              ]
            : t === "union" || t === "tenderloin" || t === "nob"
              ? [
                  ["apt", "apt", 1],
                  ["brk", "brk", 0.6],
                ]
              : [["brk", "brk", 1]];
    case 7:
      return [
        ["brk", "wrf", 1],
        ["brk", "brk", 0.4],
      ];
  }
  return null;
}
var CX = new WeakMap(),
  sL = {
    261412887: 11,
    261412899: 18,
    261412879: 10,
    261412894: 15,
    261412900: 11,
    261412895: 18,
    261412896: 10,
  },
  Ku = {
    32947069: {
      g: "apt",
      cell: 15,
      hue: [0.74, 0.56, 0.43],
      wall: [0.3, 0.2, 0.14],
    },
    1361492526: { office: 8, wall: [0.72, 0.66, 0.54] },
    1361492527: { office: 8, wall: [0.72, 0.66, 0.54] },
    1361492528: { office: 8, wall: [0.72, 0.66, 0.54] },
    32858754: { hue: [1.12, 0.8, 0.76] },
    59562320: {
      g: "apt",
      cell: 18,
      hue: [1.02, 1.02, 1],
      wall: [0.74, 0.72, 0.66],
    },
    494810791: {
      g: "apt",
      cell: 18,
      hue: [1.02, 1.02, 1],
      wall: [0.74, 0.72, 0.66],
    },
    494810794: {
      g: "apt",
      cell: 18,
      hue: [1.02, 1.02, 1],
      wall: [0.74, 0.72, 0.66],
    },
    32650566: { g: "edw", cell: 12, hue: [1.08, 1.06, 1.02] },
    193054136: {
      g: "brk",
      cell: 10,
      hue: [1.06, 0.92, 0.88],
      wall: [0.42, 0.17, 0.12],
    },
    256442760: {
      g: "edw",
      cell: 12,
      hue: [1.1, 1.08, 1.04],
      wall: [0.86, 0.84, 0.78],
    },
    256442765: {
      g: "edw",
      cell: 10,
      hue: [1.1, 1.07, 1],
      wall: [0.86, 0.83, 0.76],
    },
    262552506: {
      g: "edw",
      cell: 15,
      hue: [1.06, 1.05, 1.03],
      wall: [0.8, 0.79, 0.74],
    },
    262552510: {
      g: "edw",
      cell: 0,
      hue: [1.2, 0.9, 0.82],
      wall: [0.72, 0.5, 0.42],
    },
    262552532: {
      g: "edw",
      cell: 1,
      hue: [1.08, 0.72, 0.62],
      wall: [0.5, 0.24, 0.18],
    },
    262552519: {
      g: "edw",
      cell: 16,
      hue: [0.84, 0.88, 0.66],
      wall: [0.42, 0.42, 0.3],
    },
    262552561: {
      g: "edw",
      cell: 12,
      hue: [0.9, 0.92, 0.74],
      wall: [0.5, 0.5, 0.38],
    },
    262552539: {
      g: "edw",
      cell: 16,
      hue: [0.82, 0.86, 0.64],
      wall: [0.42, 0.42, 0.3],
    },
    262552553: {
      g: "edw",
      cell: 17,
      hue: [1.12, 1.1, 0.95],
      wall: [0.45, 0.44, 0.33],
    },
    262552557: {
      g: "edw",
      cell: 12,
      hue: [0.86, 0.89, 0.7],
      wall: [0.46, 0.46, 0.34],
    },
    262552541: {
      g: "edw",
      cell: 16,
      hue: [0.8, 0.84, 0.62],
      wall: [0.4, 0.41, 0.29],
    },
    262550699: {
      g: "edw",
      cell: 17,
      hue: [1.25, 1.25, 1.25],
      wall: [0.55, 0.56, 0.56],
    },
    262550702: {
      g: "edw",
      cell: 13,
      hue: [0.82, 0.92, 1.2],
      wall: [0.35, 0.42, 0.58],
    },
    262548814: {
      g: "edw",
      cell: 4,
      hue: [1.02, 1.02, 1.02],
      wall: [0.8, 0.8, 0.77],
    },
    262548811: { g: "edw", cell: 12, hue: [1, 1, 1], wall: [0.75, 0.75, 0.72] },
    262548810: {
      g: "edw",
      cell: 10,
      hue: [1.04, 0.98, 0.9],
      wall: [0.66, 0.58, 0.46],
    },
    262548808: {
      g: "edw",
      cell: 14,
      hue: [0.98, 0.92, 0.84],
      wall: [0.62, 0.52, 0.4],
    },
    262548809: {
      g: "edw",
      cell: 2,
      hue: [1, 0.97, 0.92],
      wall: [0.7, 0.65, 0.55],
    },
  },
  pc = null;
