// app 409 — cat
// Lines 200393-200998 of readable/app.pretty.js (statement-aligned).
function Kit(o) {
  let {
      scene: t,
      camera: e,
      v: s,
      R: n,
      router: i,
      profile: a,
      map: r,
      stunts: l,
      boards: c,
      raceStarts: h,
      toast: f,
    } = o,
    u = [
      ...x4.map((q) => ({ x: q.gates[0].x, z: q.gates[0].z, cat: bN[q.kind] })),
      ...VT.map((q) => ({ x: q.x, z: q.z, cat: "collect" })),
      ...t1.map((q) => ({ x: q.from[0], z: q.from[1], cat: "race" })),
    ],
    d = Bit(n.data, n.layout, i(), { avoid: u });
  console.log(
    `challenges: ${d.length} placed in ${d.ms.toFixed(0)} ms (+ ${u.length} adopted)`,
  );
  let p = d.filter((q) => q.gates);
  if (l)
    for (let q of p)
      l.list.push({
        id: q.id,
        kind: q.kind,
        name: q.name,
        gates: q.gates,
        hw: q.hw,
        stars: q.stars,
        maxT: q.maxT,
        ch: q,
      });
  let m = new Map(d.map((q) => [q.id, q]));
  for (let q of x4)
    m.set(q.id, {
      id: q.id,
      cat: bN[q.kind],
      kind: q.kind,
      name: q.name,
      tier: q.kind === "drift" || q.stars[0] >= 150 ? 3 : 2,
      x: q.gates[0].x,
      z: q.gates[0].z,
      adopted: !0,
    });
  let g = g1(),
    b = gN([...m.values()], g),
    v = {};
  try {
    v = JSON.parse(localStorage.getItem("sf-drive.challenges") || "{}") || {};
  } catch {
    v = {};
  }
  let x = (q) => (a?.ready ? a.chRec(q) : v[q] || null),
    y = (q) => b.has(q),
    M = (q) => Vit(q, x(q.id), y(q.id), g),
    S = new Set(ZT);
  try {
    let q = JSON.parse(localStorage.getItem(jit) || "null");
    Array.isArray(q) && (S = new Set(q));
  } catch {}
  let w = (q) => S.has(q.cat) && (!S.has("featured") || y(q.id)),
    _ = (q, j, K) =>
      (q.d.cat === "food" || q.d.cat === "courier") && kd().on
        ? kd().handoff({ phase: K, S: j, v: s, bag: 3 })
        : null,
    z = new e9({
      list: d,
      v: s,
      router: i,
      police: o.police,
      race: () => o.race || null,
      auto: o.auto,
      traffic: o.trafficOn,
      handoff: _,
      project: (q, j, K) => {
        let nt = new o.THREE.Vector3(q, j, K).project(e),
          Q = new o.THREE.Vector3(
            q - e.position.x,
            j - e.position.y,
            K - e.position.z,
          ),
          et = new o.THREE.Vector3();
        return (e.getWorldDirection(et), [nt.x, nt.y, Q.dot(et) > 0]);
      },
    });
  o.skills?.on((q) => z.skill(q));
  let A = new n9(
      t,
      d.filter((q) => uN.has(q.cat) || q.gates),
      {
        groundY: (q, j) => n.layout.driveHeight(q, j),
        rec: x,
        worth: M,
        featured: y,
      },
    ),
    T = new i9({ touch: o.touch });
  if (a && typeof document < "u") {
    let q = new o9(a);
    ((T.onWallet = () => q.toggle()),
      globalThis.window?.__sf && (window.__sf.walletLog = q));
  }
  let E = null,
    R = null,
    P = null,
    C = 0,
    I = null,
    L = o.police?.()?.busts ?? 0,
    F = 0,
    O = null;
  ((T.onGo = () => Z.start()),
    (T.onRetry = () => {
      let q = O;
      if (!q) return;
      let j = q.spot?.x ?? q.x,
        K = q.spot?.z ?? q.z;
      if (Math.hypot(j - s.pos.x, K - s.pos.z) < 30) {
        Z.start(q);
        return;
      }
      let nt = o.tele?.pick(j, K, 40);
      nt &&
        o.tele.go({ ...nt, quiet: !0 }) &&
        f(Li[q.cat].label + " \xB7 " + q.name, "At its start - E to go");
    }),
    (T.onGarage = () => o.openGarage?.()),
    (T.onFilter = (q) => {
      q === "all"
        ? (S = S.size > 1 ? new Set() : new Set(ZT))
        : S.has(q)
          ? S.delete(q)
          : S.add(q);
      try {
        localStorage.setItem(jit, JSON.stringify([...S]));
      } catch {}
      (r?.big?.dirty?.(), N());
    }),
    addEventListener("keydown", (q) => {
      q.code === "Enter" &&
        T.resultOn &&
        !q.repeat &&
        (q.preventDefault(), T.hideResult());
    }));
  let B = () => {
      let q = [...d.filter((j) => !j.gates)];
      for (let j of l?.list || []) q.push(j.ch || m.get(j.id));
      for (let j of VT) q.push({ id: "b:" + j.id, cat: "collect", board: j });
      for (let j of t1) q.push({ id: "r:" + j.id, cat: "race", track: j });
      return q.filter(Boolean);
    },
    H = (q) =>
      q.board
        ? !!c?.got?.has(q.board.id)
        : q.track
          ? (o.race?.best?.(q.track.id) || 0) > 0
          : (q.adopted && !!l?.best?.[q.id]) || (x(q.id)?.s || 0) > 0;
  function N() {
    let q = ZT.map((j) => {
      let K = B().filter((nt) => nt.cat === j);
      return { cat: j, n: K.length, done: K.filter(H).length };
    }).filter((j) => j.n);
    T.filters(q, S, b.size);
  }
  function D(q) {
    let j = q.d,
      K = x(j.id),
      nt = q.q ?? q.val,
      Q = Git(K, q.stars, q.val, nt, g),
      et = y(j.id),
      st = mN(j, q.stars, K, { featured: et, care: q.care, today: g }),
      ot = 0;
    if (a?.ready)
      ot = a.chResult(
        j.id,
        Q,
        st.cash,
        Li[j.cat].label + (j.name ? " \xB7 " + j.name : ""),
      );
    else {
      v[j.id] = Q;
      try {
        localStorage.setItem("sf-drive.challenges", JSON.stringify(v));
      } catch {}
    }
    return (
      q.xp !== !1 && st.xp && o.addXP?.(st.xp, Li[j.cat].label),
      { pay: st, got: ot, newBest: !K || Q.q !== K.q || Q.s !== K.s, feat: et }
    );
  }
  let U = (q) => {
      let j = q.d;
      return j.cat === "race"
        ? ["1st", "2nd", "3rd"][q.place - 1] || q.place + "th"
        : j.cat === "nearmiss"
          ? String(q.val)
          : j.cat === "photo"
            ? q.val + " %"
            : L0(q.val);
    },
    G = (q) => {
      let j = q.d;
      return j.cat === "race"
        ? "of " + q.of + (q.ms ? " \xB7 " + L0(q.ms / 1e3) : "")
        : j.cat === "nearmiss"
          ? "near misses"
          : j.cat === "photo"
            ? "framed"
            : j.cat === "police"
              ? "to lose heat " + j.heat
              : q.par
                ? "3 stars by " + L0(q.par)
                : "";
    },
    W = () => {
      let q = Ah(o.xp?.() || 0).level,
        j = a?.ready ? a.wallet() : 0,
        K = null;
      for (let nt in Ri)
        for (let Q = 1; Q < Ri[nt].lv.length; Q++) {
          let [et, st, ot] = Ri[nt].lv[Q];
          ot <= q &&
            (!K || st < K.price) &&
            st > j &&
            (K = { name: Ri[nt].name + " " + P2[et].name, price: st });
        }
      return K ? `${K.name} at ${$it(K.price)}` : "";
    };
  function V(q) {
    if (q.type === "start") {
      ((O = q.d), T.hideResult(), o.sting?.("start"));
      let j = Li[q.d.cat];
      (q.d.cat !== "race" &&
        (o.faresOn?.() && ((P = !0), o.setFares?.(!1)), o.graceOff?.()),
        f(
          j.label,
          q.d.cat === "police"
            ? "Heat " + q.d.heat + " \xB7 lose them in " + q.d.secs + " s"
            : q.d.cat === "photo"
              ? "Press F - frame " + q.d.look.name
              : j.ask,
        ),
        (F = 0));
      return;
    }
    if (q.type === "stop") {
      o.sting?.("stop");
      let j = q.A,
        K = q.d;
      (q.n < q.of &&
        f(
          K.cat === "taxi"
            ? "Fare " + q.n + " dropped"
            : K.cat === "courier"
              ? "Parcel " + q.n + " delivered"
              : "Stop",
          K.cat === "taxi"
            ? "+" + Math.round(j.legs[j.i].par * 1.45) + " s on the clock"
            : q.of - q.n + " to go",
        ),
        (F = 0));
      return;
    }
    if (q.type === "cp") {
      (o.sting?.("cp"), (F = 0));
      return;
    }
    if (q.type === "spill") {
      q.k >= 0.1 &&
        f(
          q.d.cat === "food" ? "Spill!" : "Easy!",
          q.d.cat === "food"
            ? "Careful with the order"
            : "The VIP did not like that",
        );
      return;
    }
    if (q.type === "ask") {
      f("Abandon?", "E again to abandon " + Li[q.d.cat].label);
      return;
    }
    if (q.type !== "tick") {
      if (
        (P && (o.setFares?.(!0), (P = null)),
        r?.overlay?.challenge && (r.overlay = null),
        q.type === "result")
      ) {
        let j = D(q);
        (o.sting?.("result", q.stars),
          (E = {
            type: "result",
            d: q.d,
            stars: q.stars,
            valText: U(q),
            valSub: G(q),
            lines: j.pay.lines,
            cash: j.got || (a?.ready ? 0 : j.pay.cash),
            xp: j.pay.xp,
            newBest: j.newBest,
            featured: j.feat,
            l5: q.l5,
            wallet: a?.ready ? a.wallet() : null,
            next: W(),
          }),
          q.d.cat === "race" && o.race?.S ? (R = E) : T.result(E),
          N());
        return;
      }
      q.type === "fail" &&
        ((E = {
          type: "fail",
          d: q.d,
          whyText:
            (Xit[q.why] || "Over") +
            (q.why === "place"
              ? ` - ${q.place}th of ${q.of}`
              : q.why === "few"
                ? ` (${q.n})`
                : "") +
            (q.why === "busted" ? " \xB7 the fine is the police's" : ""),
          wallet: a?.ready ? a.wallet() : null,
        }),
        q.why !== "abandoned" && q.why !== "teleport"
          ? T.result(E)
          : f(Li[q.d.cat].label, Xit[q.why]));
    }
  }
  let $ = o.stuntHud;
  if ($) {
    let q = $.onResult;
    $.onResult = (j) => {
      q?.(j);
      try {
        let K = j.s,
          nt = K.ch || m.get(K.id);
        if (
          !nt ||
          !(j.stars > 0) ||
          (!D({
            d: nt,
            stars: j.stars,
            val: j.val,
            q: j.val,
            care: null,
            xp: !1,
          }).got &&
            !a)
        )
          return;
      } catch (K) {
        console.warn("challenges stunt", K);
      }
    };
  }
  if (o.race) {
    let q = o.race.onResult;
    o.race.onResult = (j) => {
      let K = q ? q(j) : 0;
      try {
        z.raceResult(j);
      } catch (nt) {
        console.warn("challenges race", nt);
      }
      return K;
    };
  }
  if (o.photo) {
    let q = o.photo.frame.bind(o.photo);
    o.photo.frame = (j) => {
      (q(j), z.photoFrame(j));
      for (let K of z.events.splice(0)) V(K);
      (T.objective(z.active, { photo: !0 }), T.tick(j));
    };
  }
  let Z = {
    get busy() {
      return !!z.active;
    },
    list: d,
    runner: z,
    marks: A,
    hud: T,
    featured: b,
    pois: (q) => {
      let j = [];
      for (let K of q || []) {
        let nt =
          bN[K.kind] ||
          (K.kind === "xpboard" || K.kind === "travel"
            ? "collect"
            : K.kind === "flag"
              ? "race"
              : null);
        if (!nt) {
          j.push(K);
          continue;
        }
        !S.has(nt) ||
          S.has("featured") ||
          j.push({
            ...K,
            cat: nt,
            kind:
              nt === "collect"
                ? K.kind
                : QT(nt, nt === "race" ? "race" : K.kind, K.stars || 0, !1),
            col: nt === "collect" ? K.col : Li[nt].col,
          });
      }
      for (let K of d) {
        if (K.gates || !w(K)) continue;
        let nt = x(K.id)?.s || 0,
          Q = y(K.id);
        j.push({
          x: K.spot?.x ?? K.x,
          z: K.spot?.z ?? K.z,
          cat: K.cat,
          kind: QT(K.cat, K.cat, nt, Q),
          col: Li[K.cat].col,
          name:
            (K.cat === "food" || K.cat === "race" || K.cat === "photo"
              ? Li[K.cat].short + " \xB7 "
              : "") +
            K.name +
            (Q ? " \xB7 \xD7" + pN : ""),
          stars: nt,
          ch: K.id,
        });
      }
      return j
        .map((K) => {
          let nt = l?.list?.find?.(
            (Q) => Q.gates?.[0]?.x === K.x && Q.gates?.[0]?.z === K.z,
          );
          return nt?.ch && y(nt.ch.id)
            ? { ...K, kind: QT(K.cat, nt.kind, K.stars || 0, !0) }
            : K;
        })
        .filter((K) => {
          let nt = K.cat && K.ch ? m.get(K.ch) : null;
          return !nt || w(nt);
        });
    },
    candidates: () =>
      d
        .filter((q) => !q.gates && w(q))
        .map((q) => ({
          id: "c:" + q.id,
          x: q.spot?.x ?? q.x,
          z: q.spot?.z ?? q.z,
          label: Li[q.cat].label + (y(q.id) ? " \xB7 Featured" : ""),
          name: q.name,
          col: Li[q.cat].col,
          glyph:
            {
              race: "\u2691",
              police: "\u26A0",
              taxi: "T",
              food: "F",
              courier: "C",
              vip: "\u265B",
              trial: "\u23F1",
              nearmiss: "\u21C5",
              photo: "\u25CE",
            }[q.cat] || "\u2022",
          w: 1 + M(q) / 2500,
          isDone: () => (x(q.id)?.s || 0) > 0,
        })),
    filtersDraw: N,
    poiItems: () =>
      d
        .filter((q) => !q.gates && w(q))
        .map((q) => ({
          id: "c:" + q.id,
          x: q.spot?.x ?? q.x,
          z: q.spot?.z ?? q.z,
          kind: G2(q.cat),
          name: q.name,
          r: 150,
          label:
            Li[q.cat].label +
            " \xB7 " +
            ["", "Easy", "Medium", "Hard"][q.tier] +
            (y(q.id) ? " \xB7 Featured" : ""),
          stars: () => x(q.id)?.s || 0,
          line: () => `UP TO ${$it(M(q))} \xB7 STOP HERE \xB7 E`,
        })),
    get near() {
      return z.near;
    },
    get active() {
      return z.active;
    },
    start(q = z.near) {
      if (!q) return !1;
      if (o.rideBusy?.())
        return (f(Li[q.cat].label, "Drop your passenger off first"), !1);
      let j = z.start(q);
      if (j) return (f(Li[q.cat].label, j), !1);
      for (let K of z.events.splice(0)) V(K);
      return !0;
    },
    inspect() {
      if (z.active) {
        z.abandon();
        for (let q of z.events.splice(0)) V(q);
        return !0;
      }
      return z.near ? this.start() : !1;
    },
    update(q, j, { hits: K = [], hide: nt = !1, playing: Q = !0 } = {}) {
      (g1() !== g &&
        ((g = g1()), (b = gN([...m.values()], g)), (Z.featured = b)),
        z.update(q, j, K),
        R && !o.race?.S && (T.result(R), (R = null)));
      for (let pt of z.events.splice(0)) V(pt);
      let et = z.active,
        st = o.police?.(),
        ot = !et && j && !T.resultOn ? z.near : null;
      (T.prompt(
        ot,
        ot
          ? {
              rec: x(ot.id),
              worth: M(ot),
              featured: y(ot.id),
              why:
                z.why(ot) ||
                (o.rideBusy?.() ? "Drop your passenger off first" : null),
            }
          : null,
      ),
        T.objective(et && !nt ? et : null, {
          pursuit: !!st?.pursuit,
          cool: st?.cool || 0,
          coolLeft: st ? st.evadeT() - st.cool : 0,
          l5: et?.auto,
        }));
      let rt = z.target();
      if (et && rt && r && et.kind !== "race" && (F -= q) <= 0) {
        F = 3;
        let pt = rt.pts;
        if (et.kind === "stops" || et.kind === "photo")
          try {
            let ut = s.forward(),
              it = rt.S || et.d.spot,
              at = it
                ? i().routeTo(s.pos.x, s.pos.z, ut.x, ut.z, it, !0)
                : null;
            at && !at.direct && (pt = at.pts);
          } catch {}
        r.overlay = {
          challenge: !0,
          route: pt || [
            [s.pos.x, s.pos.z],
            [rt.x, rt.z],
          ],
          target: { x: rt.x, z: rt.z, col: Li[et.d.cat].col, label: rt.label },
          others: rt.next
            ? [{ x: rt.next.x, z: rt.next.z, col: Li[et.d.cat].col, glyph: "" }]
            : [],
        };
      }
      A.update(e, {
        active: et?.d || null,
        target:
          et &&
          et.kind !== "race" &&
          et.kind !== "police" &&
          et.kind !== "nearmiss" &&
          et.kind !== "photo"
            ? rt
            : null,
        hide: nt,
        vis: w,
      });
      let lt = !!o.garage?.()?.isOpen;
      document.body.classList.toggle("chgarage", lt && !!a?.ready);
      let ht = a?.ready ? a.wallet() : null;
      (a?.onCash &&
        !Z._cashSub &&
        (Z._cashSub = a.onCash((pt) => {
          Math.abs(pt.a) >= 0.5 &&
            T.pop(
              pt.a,
              (pt.pend
                ? "pending \xB7 "
                : pt.released
                  ? "released \xB7 "
                  : "") + (pt.why || "Cash"),
            );
        })),
        T.wallet(!!a && Q, ht, (a?.ready && a.pendingCash?.()) || 0),
        T.tick(q),
        r?.open && !Z._fOpen && N(),
        (Z._fOpen = !!r?.open));
    },
    get filterOn() {
      return S;
    },
  };
  return (N(), Z);
}
