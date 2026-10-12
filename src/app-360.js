// app 360 — fillrect
// Lines 179048-179088 of readable/app.pretty.js (statement-aligned).
as();
as();
var qF = 50,
  jF = 80,
  _yt = 260,
  Kz = 25,
  xf = (i, t, e) => (i < t ? t : i > e ? e : i),
  Ltt = (i) => Math.atan2(Math.sin(i), Math.cos(i));
function zyt() {
  if (typeof document > "u") return null;
  let i = document.createElement("canvas");
  ((i.width = 512), (i.height = 128));
  let t = i.getContext("2d");
  ((t.fillStyle = "#f4f6f8"),
    t.fillRect(0, 0, 512, 128),
    (t.fillStyle = "#0d1420"),
    (t.font = "900 82px Arial, Helvetica, sans-serif"),
    (t.textAlign = "center"),
    (t.textBaseline = "middle"),
    t.fillText("POLICE", 256, 70),
    (t.fillStyle = "#c9a227"),
    t.fillRect(0, 8, 512, 8),
    t.fillRect(0, 112, 512, 8));
  let e = new Sn(i);
  return ((e.colorSpace = is), (e.anisotropy = 4), e);
}
function Eyt() {
  if (typeof document > "u") return null;
  let i = document.createElement("canvas");
  i.width = i.height = 128;
  let t = i.getContext("2d"),
    e = t.createRadialGradient(64, 64, 0, 64, 64, 64);
  return (
    e.addColorStop(0, "rgba(255,250,235,1)"),
    e.addColorStop(0.45, "rgba(255,246,225,.55)"),
    e.addColorStop(1, "rgba(255,240,220,0)"),
    (t.fillStyle = e),
    t.fillRect(0, 0, 128, 128),
    new Sn(i)
  );
}
