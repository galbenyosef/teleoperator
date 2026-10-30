// app 103 — math
// Lines 79939-79980 of readable/app.pretty.js (statement-aligned).
function FP(o, t, e) {
  let s = [
    [t.v0, e - 0.4],
    [t.v0, e + (o.tn.shape === "box" ? Gu(o.tn) : ch(o.tn))],
  ];
  if (o.tn.shape === "box") s.push([t.v1, e + Gu(o.tn)]);
  else {
    let n = (t.v0 + t.v1) / 2,
      i = (t.v1 - t.v0) / 2;
    for (let a = 1; a < 10; a++) {
      let r = Math.PI - (Math.PI * a) / 10;
      s.push([n + i * Math.cos(r), e + ch(o.tn) + hc(o.tn) * Math.sin(r)]);
    }
    s.push([t.v1, e + ch(o.tn)]);
  }
  return (s.push([t.v1, e - 0.4]), s);
}
function Ypt(o, t, e, s) {
  let n = FP(o, t, s),
    i = e.v0 + wo,
    a = e.v1 - wo,
    r = !(Math.abs((t.v0 + i) / 2) < 1.5 || i - t.v0 < 0.2),
    l = !(Math.abs((a + t.v1) / 2) < 1.5 || t.v1 - a < 0.2);
  return (
    (n[0] = [t.v0, s + (r ? 0.25 : -0.06)]),
    (n[n.length - 1] = [t.v1, s + (l ? 0.25 : -0.06)]),
    l && n.push([a, s + 0.25], [a, s - 0.06]),
    r && n.push([i, s - 0.06], [i, s + 0.25]),
    n
  );
}
var Jpt = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let ds = (fract(uv.x / 8.0) - 0.5) * 8.0;
  let pool = exp(-ds * ds / 6.0) * smoothstep(0.0, 4.5, uv.y) + 0.45;
  let tile = 0.93 + 0.07 * step(0.04, fract(uv.x / 0.3)) * step(0.04, fract(uv.y / 0.15));
  let c = col.rgb * tile;
  gHE = c * vec3f(GLOW_RGB) * (0.065 * pool) * mix(1.0, 0.6, bc.b);   // (round 21: 0.11 blew the bores out to white at dusk)
  gHK = vec4f(0.35, 0.0, 0.0, 1.0);
  return vec4f(c, 1.0);
}
`;
