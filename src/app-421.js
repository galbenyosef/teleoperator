// app 421 — math
// Lines 204325-204668 of readable/app.pretty.js (statement-aligned).
var O4 = -5,
  AN = 4,
  SN = 512,
  n3 = 4,
  w9 = class o {
    constructor(t, e) {
      ((this.P = t),
        (this.max = this.base = e),
        (this.m = new Map()),
        (this.q = new Map()),
        (this.tick = 0),
        (this.idle = 0),
        (this.onReady = null));
    }
    static size(t) {
      return SN / 2 ** t;
    }
    get(t, e, s) {
      let n = this.m.get(`${t},${e},${s}`);
      return (n && (n.used = this.tick), n || null);
    }
    peek(t, e, s) {
      return this.m.get(`${t},${e},${s}`) || null;
    }
    want(t, e, s, n) {
      let i = `${t},${e},${s}`;
      if (this.m.has(i)) return;
      let a = this.q.get(i);
      (!a || a.pri > n) && this.q.set(i, { z: t, i: e, j: s, pri: n });
    }
    render(t, e, s) {
      let n = this.start(t, e, s);
      for (; !n.it.next().done;);
      return this.finish(n);
    }
    start(t, e, s) {
      let n = `${t},${e},${s}`,
        i = null;
      if (this.m.size >= this.max) {
        let u = null,
          d = 1 / 0;
        for (let [p, m] of this.m)
          m.z > O4 &&
            m.used < d &&
            m.used < this.tick &&
            ((d = m.used), (u = p));
        u && ((i = this.m.get(u).c), this.m.delete(u));
      }
      i ||
        ((i = document.createElement("canvas")),
        (i.width = i.height = SN + 2 * n3));
      let a = 2 ** t,
        r = SN / a,
        l = e * r - n3 / a,
        c = s * r - n3 / a,
        h = i.getContext("2d");
      this.q.delete(n);
      let f = function* () {
        (h.setTransform(1, 0, 0, 1, 0, 0),
          h.clearRect(0, 0, i.width, i.height),
          h.setTransform(a, 0, 0, a, -l * a, -c * a),
          yield* Ckt(h, this.P, a, [
            l,
            c,
            l + r + (2 * n3) / a,
            c + r + (2 * n3) / a,
          ]),
          h.setTransform(1, 0, 0, 1, 0, 0));
      }.call(this);
      return {
        k: n,
        it: f,
        t: {
          c: i,
          z: t,
          i: e,
          j: s,
          x0: l,
          z0: c,
          w: r + (2 * n3) / a,
          used: this.tick,
        },
      };
    }
    finish(t) {
      return ((t.t.used = this.tick), this.m.set(t.k, t.t), t.t);
    }
    work(t) {
      let e = performance.now(),
        s = 0;
      for (; (this.job || this.q.size) && performance.now() - e < t;) {
        if (!this.job) {
          let n = null;
          for (let i of this.q.values()) (!n || i.pri < n.pri) && (n = i);
          if (this.m.has(`${n.z},${n.i},${n.j}`)) {
            this.q.delete(`${n.z},${n.i},${n.j}`);
            continue;
          }
          this.job = this.start(n.z, n.i, n.j);
        }
        for (; performance.now() - e < t;)
          if (this.job.it.next().done) {
            (this.finish(this.job), (this.job = null), s++);
            break;
          }
      }
      return (s && this.onReady && this.onReady(), s);
    }
    schedule() {
      if (this.idle || (!this.q.size && !this.job)) return;
      let t = (e) => {
        ((this.idle = 0),
          this.work(
            e && e.timeRemaining
              ? Math.max(2, Math.min(8, e.timeRemaining()))
              : 3,
          ),
          (this.q.size || this.job) && this.schedule());
      };
      this.idle =
        typeof requestIdleCallback == "function"
          ? requestIdleCallback(t, { timeout: 250 })
          : setTimeout(t, 40);
    }
    draw(t, e, s, n = 0, i = 0) {
      let a = o.size(e),
        r = Math.floor(s[0] / a),
        l = Math.floor(s[2] / a),
        c = Math.floor(s[1] / a),
        h = Math.floor(s[3] / a),
        f = [],
        u = new Map(),
        d = [],
        p = 0,
        m = (s[0] + s[2]) / 2,
        g = (s[1] + s[3]) / 2,
        b = (l - r + 1 + 2 * i) * (h - c + 1 + 2 * i);
      b * 2 + 8 > this.max &&
        (this.max = Math.min(400, Math.max(this.base, b * 2 + 8)));
      for (let v = r; v <= l; v++)
        for (let x = c; x <= h; x++) {
          let y = this.get(e, v, x);
          if (y) {
            f.push(y);
            continue;
          }
          if (
            (p++,
            this.want(
              e,
              v,
              x,
              n + Math.hypot((v + 0.5) * a - m, (x + 0.5) * a - g) / a,
            ),
            e < AN)
          ) {
            let M = [
              this.peek(e + 1, 2 * v, 2 * x),
              this.peek(e + 1, 2 * v + 1, 2 * x),
              this.peek(e + 1, 2 * v, 2 * x + 1),
              this.peek(e + 1, 2 * v + 1, 2 * x + 1),
            ];
            if (M.every(Boolean)) {
              for (let S of M) ((S.used = this.tick), d.push(S));
              continue;
            }
          }
          for (let M = e - 1, S = v, w = x; M >= O4; M--) {
            ((S = Math.floor(S / 2)), (w = Math.floor(w / 2)));
            let _ = this.get(M, S, w);
            if (_) {
              u.set(_, 1);
              break;
            }
            M === O4 && this.want(M, S, w, -1);
          }
        }
      if (i && !p)
        for (let v = r - i; v <= l + i; v++)
          for (let x = c - i; x <= h + i; x++)
            (v < r || v > l || x < c || x > h) &&
              (this.get(e, v, x) ||
                this.want(
                  e,
                  v,
                  x,
                  n +
                    100 +
                    Math.hypot((v + 0.5) * a - m, (x + 0.5) * a - g) / a,
                ));
      for (let v of [...u.keys()].sort((x, y) => x.z - y.z))
        t.drawImage(v.c, v.x0, v.z0, v.w, v.w);
      for (let v of d) t.drawImage(v.c, v.x0, v.z0, v.w, v.w);
      for (let v of f) t.drawImage(v.c, v.x0, v.z0, v.w, v.w);
      return p;
    }
  },
  hl = (o, t, e, s, n, i) => ({
    cx: o,
    cy: t,
    ux: e,
    uy: s,
    hw: n,
    hh: i,
    r: Math.hypot(n, i),
  });
function Lkt(o, t) {
  let e = t.cx - o.cx,
    s = t.cy - o.cy;
  if (e * e + s * s > (o.r + t.r) ** 2) return !1;
  for (let n = 0; n < 4; n++) {
    let i = n === 0 ? o.ux : n === 1 ? -o.uy : n === 2 ? t.ux : -t.uy,
      a = n === 0 ? o.uy : n === 1 ? o.ux : n === 2 ? t.uy : t.ux,
      r =
        o.hw * Math.abs(o.ux * i + o.uy * a) +
        o.hh * Math.abs(-o.uy * i + o.ux * a),
      l =
        t.hw * Math.abs(t.ux * i + t.uy * a) +
        t.hh * Math.abs(-t.uy * i + t.ux * a);
    if (Math.abs(e * i + s * a) > r + l) return !1;
  }
  return !0;
}
var M1 = (o, t) => {
  for (let e of o) if (Lkt(e, t)) return !0;
  return !1;
};
function bot(o, t, e) {
  (o.setTransform(e.ux, e.uy, -e.uy, e.ux, e.cx, e.cy),
    o.drawImage(t, -t.width / 2, -t.height / 2),
    o.setTransform(1, 0, 0, 1, 0, 0));
}
var kN = (o, t) =>
    Math.abs(o) < 0.26
      ? t > 0
        ? [-o, -t]
        : [o, t]
      : o < 0
        ? [-o, -t]
        : [o, t],
  xot = (o, t, e, s) =>
    Mr(o.names[t], s, {
      color:
        o.nameCol[t] ||
        (e <= 1 ? Es.labelHwy : e <= 3 ? Es.labelMajor : Es.label),
      weight: e <= 3 ? 700 : 600,
      halo: Es.halo,
      haloW: Math.max(2, s * 0.24),
    }),
  Ikt = `
#mini { pointer-events: auto; cursor: pointer; box-shadow: 0 4px 24px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,0,0,.4); }
body.touch #mini { display: block; left: auto; right: max(10px, 2.5vw); top: max(30px, 4vh); bottom: auto; width: 88px; height: 88px; }
@media (max-width: 520px) { body.touch #where { top: 150px; left: 0; right: 0; text-align: center; } }
#bigmap { position: fixed; inset: 0; z-index: 14; display: none; background: ${Es.water}; touch-action: none; cursor: grab; }
body.bigmap #bigmap { display: block; }
#bigmap canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
#bigmap::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 110px; background: linear-gradient(rgba(7,9,11,.7), rgba(7,9,11,0)); pointer-events: none; }
#bigmap .ttl, #bigmap .bar { z-index: 1; }
#bigmap .bar { position: absolute; right: max(14px, 2vw); top: max(14px, 2vh); display: flex; gap: 6px; }
#bigmap button { background: rgba(8,10,12,.75); color: var(--ink, #eee); border: 1px solid rgba(255,255,255,.2); border-radius: 3px; min-width: 38px; height: 38px; font: 800 16px ${Gr}; cursor: pointer; }
#bigmap button:hover { border-color: var(--acc, #ff5a1f); }
#bigmap button.mini { display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1; padding: 0 6px; }
#bigmap button.mini small { font: 700 7px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .1em; opacity: .7; margin-bottom: 2px; }
#bigmap .ttl { position: absolute; left: max(16px, 2.5vw); top: max(14px, 2vh); font: 800 20px ${Gr}; font-stretch: 118%; letter-spacing: .16em; text-transform: uppercase; text-shadow: 0 1px 10px rgba(0,0,0,.7); pointer-events: none; }
#bigmap .ttl small { display: block; font: 600 10px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .2em; color: rgba(243,244,241,.6); margin-top: 4px; }
#bigmap .hint { position: absolute; left: 50%; bottom: max(14px, 2vh); transform: translateX(-50%); font: 600 10px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .16em; color: rgba(243,244,241,.6); white-space: nowrap; pointer-events: none; text-transform: uppercase; }
@media (max-width: 520px) { #bigmap .ttl { display: none; } #bigmap .hint { bottom: 64px; } }
#bigmap .tp { position: absolute; z-index: 2; transform: translate(-50%, 14px); display: none; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: center; max-width: min(300px, 92vw); }
#bigmap .tp.on { display: flex; }
#bigmap .tp .tpGo { background: var(--acc, #ff5a1f); color: #0b0c0e; border: 0; padding: 0 16px; font: 800 13px ${Gr}; letter-spacing: .12em; text-transform: uppercase; height: 40px; white-space: nowrap; border-radius: 3px; box-shadow: 0 4px 18px rgba(0,0,0,.5); }
#bigmap .tp .tpDrive { background: #3fd6c6; color: #06221f; border: 0; padding: 0 14px; font: 800 13px ${Gr}; letter-spacing: .12em; text-transform: uppercase; height: 40px; white-space: nowrap; border-radius: 3px; box-shadow: 0 4px 18px rgba(0,0,0,.5); }
#bigmap .tp small { flex-basis: 100%; text-align: center; font: 600 10px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .12em; color: #f3f4f1; text-shadow: 0 1px 6px #000; text-transform: uppercase; }
#bigmap .tp small:empty { display: none; }
#bigmap .tpMsg { position: absolute; left: 50%; top: 72px; transform: translateX(-50%); z-index: 2; background: rgba(8,10,12,.82); color: #f3f4f1; padding: 8px 14px; border-radius: 3px; font: 600 11px "JetBrains Mono", ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; opacity: 0; transition: opacity .2s; pointer-events: none; }
#bigmap .tpMsg.on { opacity: 1; }
/* (credits70) the map data's attribution, as the ODbL asks: the full map's corner, under the minimap's rim */
#bigmap .osm { position: absolute; right: max(10px, 1.2vw); bottom: 3px; z-index: 1; font: 600 10px/12px var(--font, sans-serif); letter-spacing: .02em; color: rgba(243,244,241,.72); text-decoration: none; text-shadow: 0 1px 4px #000; }
#bigmap .osm:hover { color: #fff; text-decoration: underline; }
#miniOsm { position: fixed; z-index: 6; display: none; left: calc(var(--safe-l) + clamp(150px, 15vw, 210px) / 2 - clamp(140px, 13.5vw, 190px) / 2); bottom: calc(max(10px, 2vh) + 52px + 8px); width: clamp(140px, 13.5vw, 190px); text-align: center; font: 600 8px/10px var(--font, sans-serif); letter-spacing: .02em; color: rgba(243,244,241,.75); text-decoration: none; text-shadow: 0 0 3px #000, 0 1px 2px #000; white-space: nowrap; }
body.play #miniOsm { display: block; }
body.touch.play #miniOsm { left: auto; right: calc(var(--sr) + 10px); top: calc(var(--st) + 84px); bottom: auto; width: auto; text-align: right; font-size: 7.5px; }
body.touch:not(.play) #miniOsm, body.hud-off #miniOsm, body.cine #miniOsm, body.photo #miniOsm, body.picking #miniOsm, body.garage #miniOsm, body.bigmap #miniOsm { display: none; }
`;
function vot(o, t, e, s, n) {
  if (!(!t || t.length < 2)) {
    o.lineJoin = o.lineCap = "round";
    for (let [i, a] of [
      [s * 1.9, "rgba(6,10,14,.75)"],
      [s, n],
    ])
      (o.beginPath(),
        t.forEach((r, l) => {
          let [c, h] = e(r[0], r[1]);
          l ? o.lineTo(c, h) : o.moveTo(c, h);
        }),
        (o.lineWidth = i),
        (o.strokeStyle = a),
        o.stroke());
  }
}
function yot(o, t, e, s, n, i) {
  (o.save(),
    o.translate(t, e),
    (o.shadowColor = "rgba(0,0,0,.7)"),
    (o.shadowBlur = s * 0.8),
    (o.fillStyle = "rgba(8,10,12,.92)"),
    o.beginPath(),
    o.arc(0, 0, s * 1.15, 0, 7),
    o.fill(),
    (o.shadowBlur = 0),
    o.rotate(n + Math.PI / 2),
    (o.fillStyle = i),
    o.beginPath(),
    o.moveTo(0, -s),
    o.lineTo(s * 0.78, s * 0.72),
    o.lineTo(0, s * 0.3),
    o.lineTo(-s * 0.78, s * 0.72),
    o.closePath(),
    o.fill(),
    o.restore());
}
function B4(o, t, e, s, n, i = "") {
  (o.save(),
    (o.shadowColor = "rgba(0,0,0,.6)"),
    (o.shadowBlur = s * 0.6),
    (o.fillStyle = n),
    o.beginPath(),
    o.arc(t, e - s * 1.25, s, Math.PI * 0.82, Math.PI * 0.18),
    o.lineTo(t, e),
    o.closePath(),
    o.fill(),
    (o.shadowBlur = 0),
    (o.fillStyle = "rgba(8,10,12,.9)"),
    o.beginPath(),
    o.arc(t, e - s * 1.25, s * 0.48, 0, 7),
    o.fill(),
    i &&
      ((o.fillStyle = n),
      (o.font = `800 ${s * 0.8}px ${Gr}`),
      (o.textAlign = "center"),
      (o.textBaseline = "middle"),
      o.fillText(i, t, e - s * 1.22)),
    o.restore());
}
