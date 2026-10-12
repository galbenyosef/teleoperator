// app 38 — slice
// Lines 49882-49933 of readable/app.pretty.js (statement-aligned).
function uct(i) {
  let t = Ec,
    e = (s, n) => {
      let o = t.indexOf(s);
      if (o < 0) throw new Error("leanCommon: " + s);
      t = t.slice(0, o) + n + t.slice(o + s.length);
    };
  return (
    e(
      `  @location(3) col: vec4f,
  @location(4) uv2: vec2f,   // light-map channel
};`,
      i
        ? `  @location(4) uv2: vec2f,   // the detail normal map's uv
};`
        : "};",
    ),
    e(
      `  @location(0) p: vec3f, @location(1) n: vec3f, @location(2) uv: vec4f, @location(3) j: vec4u, @location(4) jw: vec4f,
  @location(5) col: vec4f,                                                   // vertex colour (zeros when absent)
  @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f,   // instance matrix
  @location(10) icol: vec3f,                                                 // instance colour (ones when absent)
};`,
      `  @location(0) p: vec3f, @location(1) n: vec3f, @location(2) uv: vec4f,
  @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f,
};`,
    ),
    e(
      `  if (O.skin.x > 0.5) { let M = skinMat(v.j, v.jw); w = M * vec4f(v.p, 1.0); wn = (M * vec4f(v.n, 0.0)).xyz; }
`,
      "",
    ),
    e(NU, ""),
    e(BU, ""),
    e("sfWalkJ(v.p, v.j, v.jw, ", "sfWalkJ(v.p, vec4u(0u), vec4f(0.0), "),
    e(
      `  o.uv = v.uv.xy; o.uv2 = v.uv.zw;
  o.col = select(vec4f(1.0), v.col, O.mflags2.x > 0.5) * vec4f(select(vec3f(1.0), v.icol, O.mflags2.w > 0.5), 1.0);`,
      i ? "  o.uv = v.uv.xy; o.uv2 = v.uv.zw;" : "  o.uv = v.uv.xy;",
    ),
    t
  );
}
var dct = `
struct VInD { @location(0) p: vec3f, @location(6) i0: vec4f, @location(7) i1: vec4f, @location(8) i2: vec4f, @location(9) i3: vec4f };
struct VOutD { @invariant @builtin(position) pos: vec4f };
@vertex fn vsDepth(v: VInD) -> VOutD {
  let IM = mat4x4f(v.i0, v.i1, v.i2, v.i3);
  var w = O.model * (IM * vec4f(v.p, 1.0));
  var o: VOutD; o.pos = stableClip(F.viewProj * w); return o;
}
`;
