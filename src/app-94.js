// app 94 — push
// Lines 77288-77324 of readable/app.pretty.js (statement-aligned).
function Tpt(o) {
  let t = [],
    e = [],
    s = [];
  ((o?.fronts ? Object.keys(o.fronts) : []).forEach((a, r) => {
    for (let l = 0; l < 32; l++) {
      let c = o.fronts[a].cells.find((u) => u.cell === l),
        h = c?.dress?.erase || [],
        f = t.length;
      for (let u of h)
        (t.push(u.r[0], u.r[2], u.r[1], u.r[3]),
          e.push(u.d?.[0] || 0, u.d?.[1] || 0, u.streak ? 1 : 0, 0));
      for (let u of c?.dress?.fire || [])
        u.src &&
          (t.push(u.r[0] - 0.01, u.r[2] - 0.01, u.r[1] + 0.01, u.r[3] + 0.02),
          e.push(u.src, 0, 0, 0));
      s.push(f / 4 + ((t.length - f) / 4) * 65536);
    }
  }),
    t.length || (t.push(0, 0, 0, 0), e.push(0, 0, 0, 0)));
  let i = (a) => {
    let r = [];
    for (let l = 0; l < a.length; l += 4)
      r.push(
        `vec4f(${a
          .slice(l, l + 4)
          .map((c) => (+c).toFixed(4))
          .join(", ")})`,
      );
    return r.join(", ");
  };
  return `const SF_ERN = ${s.length}u;
const SF_ERI = array<u32, ${Math.max(1, s.length)}>(${s.length ? s.map((a) => a + "u").join(", ") : "0u"});
const SF_ERR = array<vec4f, ${t.length / 4}>(${i(t)});
const SF_ERD = array<vec4f, ${e.length / 4}>(${i(e)});
`;
}
