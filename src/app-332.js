// app 332 — math
// Lines 161264-161483 of readable/app.pretty.js (statement-aligned).
function vQ(i, { yaw: t, pitch: e, fov: s, aspect: n, sx: o, sy: a, ly: r }) {
  let l = Gx(i),
    c = Math.hypot(Math.max(-l.min.x, l.max.x), Math.max(-l.min.z, l.max.z)),
    h = Math.tan(kc.degToRad(s) / 2),
    f = h * n,
    u = Math.cos(e),
    d = Math.sin(e),
    p = new xt(-Math.sin(t) * u, -d, -Math.cos(t) * u),
    m = new xt(Math.cos(t), 0, -Math.sin(t)),
    g = new xt().crossVectors(m, p),
    b = 0,
    x = new xt();
  for (let v = 0; v < 16; v++) {
    let y = (v / 16) * Math.PI * 2;
    for (let M of [Math.max(0, l.min.y), l.max.y]) {
      x.set(Math.sin(y) * c, M - r, Math.cos(y) * c);
      let S = x.dot(m),
        w = x.dot(g),
        z = x.dot(p);
      b = Math.max(b, -z + Math.abs(S) / (o * f), -z + Math.abs(w) / (a * h));
    }
  }
  return { d: b, rxz: c, h: l.max.y, near: Math.hypot(c, l.max.y) + 0.5 };
}
function xQ(i) {
  return new ln({ color: new $t(...i), fog: !1 });
}
function C3t() {
  let t = document.createElement("canvas");
  t.width = t.height = 256;
  let e = t.getContext("2d"),
    s = e.createImageData(256, 256),
    n = (r, l) => {
      let c = Math.sin(r * 127.1 + l * 311.7) * 43758.5453;
      return c - Math.floor(c);
    },
    o = (r, l, c) => {
      let h = Math.floor(r),
        f = Math.floor(l),
        u = r - h,
        d = l - f,
        p = u * u * (3 - 2 * u),
        m = d * d * (3 - 2 * d),
        g = (b) => ((b % c) + c) % c;
      return (
        (n(g(h), g(f)) * (1 - p) + n(g(h + 1), g(f)) * p) * (1 - m) +
        (n(g(h), g(f + 1)) * (1 - p) + n(g(h + 1), g(f + 1)) * p) * m
      );
    };
  for (let r = 0; r < 256; r++)
    for (let l = 0; l < 256; l++) {
      let c =
          0.6 * o(l / 64, r / 64, 4) +
          0.28 * o(l / 21.333, r / 21.333, 12) +
          0.12 * o(l / 6.4, r / 6.4, 40),
        h = 0.75 + 0.45 * Math.max(0, Math.min(1, (c - 0.3) * 1.6)),
        f = (r * 256 + l) * 4,
        u = Math.round(Math.min(1, h * 0.75) * 255);
      ((s.data[f] = u),
        (s.data[f + 1] = u),
        (s.data[f + 2] = u),
        (s.data[f + 3] = 255));
    }
  e.putImageData(s, 0, 0);
  let a = new Sn(t);
  return ((a.wrapS = a.wrapT = ti), (a.colorSpace = On), (a.anisotropy = 4), a);
}
function L3t(i, t, e, s) {
  let n = i / 2,
    o = new Uint16Array(i * n * 4),
    a = Ll.toHalfFloat,
    r = new xt(0, 0.7, 0),
    l = t
      .filter((h) => Math.abs(h.a.y - h.b.y) > 1)
      .map((h) => Math.atan2(h.a.x, h.a.z));
  for (let h = 0; h < n; h++) {
    let f = ((h + 0.5) / n) * Math.PI,
      u = Math.cos(f),
      d = Math.sin(f);
    for (let p = 0; p < i; p++) {
      let m = ((p + 0.5) / i - 0.5) * 2 * Math.PI,
        g = Math.cos(m) * d,
        b = Math.sin(m) * d,
        x = Math.atan2(g, b),
        v = e / Math.max(1e-4, Math.hypot(g, b)),
        y = r.y + u * v,
        M = 0;
      if (y > 0 && y < s) {
        let z = 0;
        for (let _ of l) {
          let R = Math.abs(x - _);
          ((R = Math.min(R, 2 * Math.PI - R)),
            (z += Math.exp(-R * R * 60) * 0.5 + Math.exp(-R * R * 2500) * 6));
        }
        M = 0.006 + z * 0.05 * Math.sin((Math.PI * y) / s) ** 0.6;
      } else if (u > 0) {
        let z = (3.9 - r.y) / u,
          _ = g * z,
          R = b * z,
          T = (E, A) => 1 - Math.min(1, Math.max(0, (Math.abs(E) - A) / 0.8));
        M = 0.004 + 1.6 * T(_, 1.3) * T(R, 2.4);
      } else M = 0.003;
      let S = (h * i + p) * 4,
        w = [M * 0.8, M * 0.93, M];
      ((o[S] = a(w[0])),
        (o[S + 1] = a(w[1])),
        (o[S + 2] = a(w[2])),
        (o[S + 3] = a(1)));
    }
  }
  let c = new Xi(o, i, n, no, aa);
  return ((c.mapping = Ph), (c.colorSpace = za), (c.needsUpdate = !0), c);
}
wm();
var tM = () => globalThis.mindblown || null,
  pF = new Set(),
  yQ = !1,
  wQ = null;
function MQ() {
  if (yQ) return;
  let i = tM()?.viewer;
  i?.onchange &&
    ((yQ = !0),
    i.onchange((t) => {
      let e = !!t?.signedIn,
        s = wQ;
      if (((wQ = e), s !== null && e !== s))
        for (let n of [...pF])
          try {
            n(e, t);
          } catch (o) {
            console.warn("account", o);
          }
    }));
}
var Ro = {
    available: () => !!tM()?.viewer,
    signedIn: () => !!tM()?.viewer?.signedIn,
    name: () => tM()?.viewer?.username || "",
    on(i) {
      return (MQ(), pF.add(i), () => pF.delete(i));
    },
    after(i) {
      if (Ro.signedIn()) return (i(), () => {});
      let t = Ro.on((e) => {
        e && (t(), i());
      });
      return t;
    },
    signIn({ picked: i } = {}) {
      if ((MQ(), Ro.signedIn())) return Promise.resolve(!0);
      let t = tM();
      return typeof t?.items?.pick != "function"
        ? Promise.resolve(!1)
        : new Promise((e) => {
            let s = !1,
              n = (a) => {
                s || ((s = !0), o(), e(a));
              },
              o = Ro.on((a) => {
                a && n(!0);
              });
            Promise.resolve()
              .then(() => t.items.pick("car"))
              .then(
                (a) => {
                  (a?.picked && !a.picked.own && i?.(a.picked),
                    setTimeout(() => n(Ro.signedIn()), 400));
                },
                () => n(Ro.signedIn()),
              );
          });
    },
  },
  SQ = (i) =>
    String(i).replace(
      /[&<>"']/g,
      (t) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[t],
    );
function I3t() {
  return Ro.available()
    ? Ro.signedIn()
      ? `<span class="acChip in"><i aria-hidden="true">${SQ((Ro.name() || "?").slice(0, 1).toUpperCase())}</i><span>@${SQ(Ro.name() || "you")}<small>Signed in to mindblown \xB7 saved to your account</small></span></span>`
      : '<span class="acChip out"><i aria-hidden="true">?</i><span>Playing as a guest<small>Saved in this browser \xB7 sign in to keep it everywhere, generate, drive together</small></span><button type="button" class="acIn" data-signin="1">Sign in to mindblown</button></span>'
    : '<span class="acChip off"><i aria-hidden="true"></i><span>Not on mindblown<small>Sign-in, saves to an account and generating work on the published game</small></span></span>';
}
var kQ = !1;
function _Q(i) {
  let t = () => {
    for (let e of document.querySelectorAll("[data-acchip]"))
      e.innerHTML = I3t();
  };
  return (
    t(),
    kQ ||
      ((kQ = !0),
      Ro.on(t),
      document.addEventListener(
        "click",
        (e) => {
          let s = e.target.closest?.("[data-signin]");
          s &&
            (e.preventDefault(),
            e.stopPropagation(),
            (s.disabled = !0),
            (s.textContent = "Signing in\u2026"),
            Ro.signIn({ picked: i }).then(() => t()));
        },
        !0,
      )),
    t
  );
}
