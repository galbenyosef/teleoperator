// app 348 — math
// Lines 167569-167788 of readable/app.pretty.js (statement-aligned).
function xst(o, { yaw: t, pitch: e, fov: s, aspect: n, sx: i, sy: a, ly: r }) {
  let l = Cv(o),
    c = Math.hypot(Math.max(-l.min.x, l.max.x), Math.max(-l.min.z, l.max.z)),
    h = Math.tan(Qc.degToRad(s) / 2),
    f = h * n,
    u = Math.cos(e),
    d = Math.sin(e),
    p = new dt(-Math.sin(t) * u, -d, -Math.cos(t) * u),
    m = new dt(Math.cos(t), 0, -Math.sin(t)),
    g = new dt().crossVectors(m, p),
    b = 0,
    v = new dt();
  for (let x = 0; x < 16; x++) {
    let y = (x / 16) * Math.PI * 2;
    for (let M of [Math.max(0, l.min.y), l.max.y]) {
      v.set(Math.sin(y) * c, M - r, Math.cos(y) * c);
      let S = v.dot(m),
        w = v.dot(g),
        _ = v.dot(p);
      b = Math.max(b, -_ + Math.abs(S) / (i * f), -_ + Math.abs(w) / (a * h));
    }
  }
  return { d: b, rxz: c, h: l.max.y, near: Math.hypot(c, l.max.y) + 0.5 };
}
function bst(o) {
  return new Ys({ color: new It(...o), fog: !1 });
}
function c4t() {
  let t = document.createElement("canvas");
  t.width = t.height = 256;
  let e = t.getContext("2d"),
    s = e.createImageData(256, 256),
    n = (r, l) => {
      let c = Math.sin(r * 127.1 + l * 311.7) * 43758.5453;
      return c - Math.floor(c);
    },
    i = (r, l, c) => {
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
          0.6 * i(l / 64, r / 64, 4) +
          0.28 * i(l / 21.333, r / 21.333, 12) +
          0.12 * i(l / 6.4, r / 6.4, 40),
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
  return ((a.wrapS = a.wrapT = oi), (a.colorSpace = Nn), (a.anisotropy = 4), a);
}
function h4t(o, t, e, s) {
  let n = o / 2,
    i = new Uint16Array(o * n * 4),
    a = Ql.toHalfFloat,
    r = new dt(0, 0.7, 0),
    l = t
      .filter((h) => Math.abs(h.a.y - h.b.y) > 1)
      .map((h) => Math.atan2(h.a.x, h.a.z));
  for (let h = 0; h < n; h++) {
    let f = ((h + 0.5) / n) * Math.PI,
      u = Math.cos(f),
      d = Math.sin(f);
    for (let p = 0; p < o; p++) {
      let m = ((p + 0.5) / o - 0.5) * 2 * Math.PI,
        g = Math.cos(m) * d,
        b = Math.sin(m) * d,
        v = Math.atan2(g, b),
        x = e / Math.max(1e-4, Math.hypot(g, b)),
        y = r.y + u * x,
        M = 0;
      if (y > 0 && y < s) {
        let _ = 0;
        for (let z of l) {
          let A = Math.abs(v - z);
          ((A = Math.min(A, 2 * Math.PI - A)),
            (_ += Math.exp(-A * A * 60) * 0.5 + Math.exp(-A * A * 2500) * 6));
        }
        M = 0.006 + _ * 0.05 * Math.sin((Math.PI * y) / s) ** 0.6;
      } else if (u > 0) {
        let _ = (3.9 - r.y) / u,
          z = g * _,
          A = b * _,
          T = (E, R) => 1 - Math.min(1, Math.max(0, (Math.abs(E) - R) / 0.8));
        M = 0.004 + 1.6 * T(z, 1.3) * T(A, 2.4);
      } else M = 0.003;
      let S = (h * o + p) * 4,
        w = [M * 0.8, M * 0.93, M];
      ((i[S] = a(w[0])),
        (i[S + 1] = a(w[1])),
        (i[S + 2] = a(w[2])),
        (i[S + 3] = a(1)));
    }
  }
  let c = new no(i, o, n, go, ga);
  return ((c.mapping = af), (c.colorSpace = Ba), (c.needsUpdate = !0), c);
}
h2();
var e4 = () => globalThis.mindblown || null,
  fB = new Set(),
  vst = !1,
  yst = null;
function wst() {
  if (vst) return;
  let o = e4()?.viewer;
  o?.onchange &&
    ((vst = !0),
    o.onchange((t) => {
      let e = !!t?.signedIn,
        s = yst;
      if (((yst = e), s !== null && e !== s))
        for (let n of [...fB])
          try {
            n(e, t);
          } catch (i) {
            console.warn("account", i);
          }
    }));
}
var Do = {
    available: () => !!e4()?.viewer,
    signedIn: () => !!e4()?.viewer?.signedIn,
    name: () => e4()?.viewer?.username || "",
    on(o) {
      return (wst(), fB.add(o), () => fB.delete(o));
    },
    after(o) {
      if (Do.signedIn()) return (o(), () => {});
      let t = Do.on((e) => {
        e && (t(), o());
      });
      return t;
    },
    signIn({ picked: o } = {}) {
      if ((wst(), Do.signedIn())) return Promise.resolve(!0);
      let t = e4();
      return typeof t?.items?.pick != "function"
        ? Promise.resolve(!1)
        : new Promise((e) => {
            let s = !1,
              n = (a) => {
                s || ((s = !0), i(), e(a));
              },
              i = Do.on((a) => {
                a && n(!0);
              });
            Promise.resolve()
              .then(() => t.items.pick("car"))
              .then(
                (a) => {
                  (a?.picked && !a.picked.own && o?.(a.picked),
                    setTimeout(() => n(Do.signedIn()), 400));
                },
                () => n(Do.signedIn()),
              );
          });
    },
  },
  Mst = (o) =>
    String(o).replace(
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
function f4t() {
  return Do.available()
    ? Do.signedIn()
      ? `<span class="acChip in"><i aria-hidden="true">${Mst((Do.name() || "?").slice(0, 1).toUpperCase())}</i><span>@${Mst(Do.name() || "you")}<small>Signed in to mindblown \xB7 saved to your account</small></span></span>`
      : '<span class="acChip out"><i aria-hidden="true">?</i><span>Playing as a guest<small>Saved in this browser \xB7 sign in to keep it everywhere, generate, drive together</small></span><button type="button" class="acIn" data-signin="1">Sign in to mindblown</button></span>'
    : '<span class="acChip off"><i aria-hidden="true"></i><span>Not on mindblown<small>Sign-in, saves to an account and generating work on the published game</small></span></span>';
}
var Sst = !1;
function kst(o) {
  let t = () => {
    for (let e of document.querySelectorAll("[data-acchip]"))
      e.innerHTML = f4t();
  };
  return (
    t(),
    Sst ||
      ((Sst = !0),
      Do.on(t),
      document.addEventListener(
        "click",
        (e) => {
          let s = e.target.closest?.("[data-signin]");
          s &&
            (e.preventDefault(),
            e.stopPropagation(),
            (s.disabled = !0),
            (s.textContent = "Signing in\u2026"),
            Do.signIn({ picked: o }).then(() => t()));
        },
        !0,
      )),
    t
  );
}
