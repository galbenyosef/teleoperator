// app 392 — cat
// Lines 192564-193167 of readable/app.pretty.js (statement-aligned).
function Bet(i) {
  let {
      scene: t,
      camera: e,
      v: s,
      R: n,
      router: o,
      profile: a,
      map: r,
      stunts: l,
      boards: c,
      raceStarts: h,
      toast: f,
    } = i,
    u = [
      ...nv.map((j) => ({ x: j.gates[0].x, z: j.gates[0].z, cat: gN[j.kind] })),
      ...wM.map((j) => ({ x: j.x, z: j.z, cat: "collect" })),
      ...Lu.map((j) => ({ x: j.from[0], z: j.from[1], cat: "race" })),
    ],
    d = _et(n.data, n.layout, o(), { avoid: u });
  console.log(
    `challenges: ${d.length} placed in ${d.ms.toFixed(0)} ms (+ ${u.length} adopted)`,
  );
  let p = d.filter((j) => j.gates);
  if (l)
    for (let j of p)
      l.list.push({
        id: j.id,
        kind: j.kind,
        name: j.name,
        gates: j.gates,
        hw: j.hw,
        stars: j.stars,
        maxT: j.maxT,
        ch: j,
      });
  let m = new Map(d.map((j) => [j.id, j]));
  for (let j of nv)
    m.set(j.id, {
      id: j.id,
      cat: gN[j.kind],
      kind: j.kind,
      name: j.name,
      tier: j.kind === "drift" || j.stars[0] >= 150 ? 3 : 2,
      x: j.gates[0].x,
      z: j.gates[0].z,
      adopted: !0,
    });
  let g = Ip(),
    b = mN([...m.values()], g),
    x = {};
  try {
    x = JSON.parse(localStorage.getItem("sf-drive.challenges") || "{}") || {};
  } catch {
    x = {};
  }
  let v = (j) => (a?.ready ? a.chRec(j) : x[j] || null),
    y = (j) => b.has(j),
    M = (j) => Pet(j, v(j.id), y(j.id), g),
    S = new Set(PE);
  try {
    let j = JSON.parse(localStorage.getItem(Iet) || "null");
    Array.isArray(j) && (S = new Set(j));
  } catch {}
  let w = (j) => S.has(j.cat) && (!S.has("featured") || y(j.id)),
    z = (j, X, K) =>
      (j.d.cat === "food" || j.d.cat === "courier") && Wu().on
        ? Wu().handoff({ phase: K, S: X, v: s, bag: 3 })
        : null,
    _ = new IE({
      list: d,
      v: s,
      router: o,
      police: i.police,
      race: () => i.race || null,
      auto: i.auto,
      traffic: i.trafficOn,
      handoff: z,
      project: (j, X, K) => {
        let nt = new i.THREE.Vector3(j, X, K).project(e),
          Z = new i.THREE.Vector3(
            j - e.position.x,
            X - e.position.y,
            K - e.position.z,
          ),
          et = new i.THREE.Vector3();
        return (e.getWorldDirection(et), [nt.x, nt.y, Z.dot(et) > 0]);
      },
    });
  i.skills?.on((j) => _.skill(j));
  let R = new NE(
      t,
      d.filter((j) => fN.has(j.cat) || j.gates),
      {
        groundY: (j, X) => n.layout.driveHeight(j, X),
        rec: v,
        worth: M,
        featured: y,
      },
    ),
    T = new BE({ touch: i.touch });
  if (a && typeof document < "u") {
    let j = new OE(a);
    ((T.onWallet = () => j.toggle()),
      globalThis.window?.__sf && (window.__sf.walletLog = j));
  }
  let E = null,
    A = null,
    C = null,
    P = 0,
    I = null,
    L = i.police?.()?.busts ?? 0,
    F = 0,
    N = null;
  ((T.onGo = () => Q.start()),
    (T.onRetry = () => {
      let j = N;
      if (!j) return;
      let X = j.spot?.x ?? j.x,
        K = j.spot?.z ?? j.z;
      if (Math.hypot(X - s.pos.x, K - s.pos.z) < 30) {
        Q.start(j);
        return;
      }
      let nt = i.tele?.pick(X, K, 40);
      nt &&
        i.tele.go({ ...nt, quiet: !0 }) &&
        f(xi[j.cat].label + " \xB7 " + j.name, "At its start - E to go");
    }),
    (T.onGarage = () => i.openGarage?.()),
    (T.onFilter = (j) => {
      j === "all"
        ? (S = S.size > 1 ? new Set() : new Set(PE))
        : S.has(j)
          ? S.delete(j)
          : S.add(j);
      try {
        localStorage.setItem(Iet, JSON.stringify([...S]));
      } catch {}
      (r?.big?.dirty?.(), O());
    }),
    addEventListener("keydown", (j) => {
      j.code === "Enter" &&
        T.resultOn &&
        !j.repeat &&
        (j.preventDefault(), T.hideResult());
    }));
  let B = () => {
      let j = [...d.filter((X) => !X.gates)];
      for (let X of l?.list || []) j.push(X.ch || m.get(X.id));
      for (let X of wM) j.push({ id: "b:" + X.id, cat: "collect", board: X });
      for (let X of Lu) j.push({ id: "r:" + X.id, cat: "race", track: X });
      return j.filter(Boolean);
    },
    H = (j) =>
      j.board
        ? !!c?.got?.has(j.board.id)
        : j.track
          ? (i.race?.best?.(j.track.id) || 0) > 0
          : (j.adopted && !!l?.best?.[j.id]) || (v(j.id)?.s || 0) > 0;
  function O() {
    let j = PE.map((X) => {
      let K = B().filter((nt) => nt.cat === X);
      return { cat: X, n: K.length, done: K.filter(H).length };
    }).filter((X) => X.n);
    T.filters(j, S, b.size);
  }
  function D(j) {
    let X = j.d,
      K = v(X.id),
      nt = j.q ?? j.val,
      Z = Ret(K, j.stars, j.val, nt, g),
      et = y(X.id),
      tt = pN(X, j.stars, K, { featured: et, care: j.care, today: g }),
      it = 0;
    if (a?.ready)
      it = a.chResult(
        X.id,
        Z,
        tt.cash,
        xi[X.cat].label + (X.name ? " \xB7 " + X.name : ""),
      );
    else {
      x[X.id] = Z;
      try {
        localStorage.setItem("sf-drive.challenges", JSON.stringify(x));
      } catch {}
    }
    return (
      j.xp !== !1 && tt.xp && i.addXP?.(tt.xp, xi[X.cat].label),
      { pay: tt, got: it, newBest: !K || Z.q !== K.q || Z.s !== K.s, feat: et }
    );
  }
  let U = (j) => {
      let X = j.d;
      return X.cat === "race"
        ? ["1st", "2nd", "3rd"][j.place - 1] || j.place + "th"
        : X.cat === "nearmiss"
          ? String(j.val)
          : X.cat === "photo"
            ? j.val + " %"
            : m0(j.val);
    },
    G = (j) => {
      let X = j.d;
      return X.cat === "race"
        ? "of " + j.of + (j.ms ? " \xB7 " + m0(j.ms / 1e3) : "")
        : X.cat === "nearmiss"
          ? "near misses"
          : X.cat === "photo"
            ? "framed"
            : X.cat === "police"
              ? "to lose heat " + X.heat
              : j.par
                ? "3 stars by " + m0(j.par)
                : "";
    },
    q = () => {
      let j = eh(i.xp?.() || 0).level,
        X = a?.ready ? a.wallet() : 0,
        K = null;
      for (let nt in mi)
        for (let Z = 1; Z < mi[nt].lv.length; Z++) {
          let [et, tt, it] = mi[nt].lv[Z];
          it <= j &&
            (!K || tt < K.price) &&
            tt > X &&
            (K = { name: mi[nt].name + " " + Um[et].name, price: tt });
        }
      return K ? `${K.name} at ${Fet(K.price)}` : "";
    };
  function W(j) {
    if (j.type === "start") {
      ((N = j.d), T.hideResult(), i.sting?.("start"));
      let X = xi[j.d.cat];
      (j.d.cat !== "race" &&
        (i.faresOn?.() && ((C = !0), i.setFares?.(!1)), i.graceOff?.()),
        f(
          X.label,
          j.d.cat === "police"
            ? "Heat " + j.d.heat + " \xB7 lose them in " + j.d.secs + " s"
            : j.d.cat === "photo"
              ? "Press F - frame " + j.d.look.name
              : X.ask,
        ),
        (F = 0));
      return;
    }
    if (j.type === "stop") {
      i.sting?.("stop");
      let X = j.A,
        K = j.d;
      (j.n < j.of &&
        f(
          K.cat === "taxi"
            ? "Fare " + j.n + " dropped"
            : K.cat === "courier"
              ? "Parcel " + j.n + " delivered"
              : "Stop",
          K.cat === "taxi"
            ? "+" + Math.round(X.legs[X.i].par * 1.45) + " s on the clock"
            : j.of - j.n + " to go",
        ),
        (F = 0));
      return;
    }
    if (j.type === "cp") {
      (i.sting?.("cp"), (F = 0));
      return;
    }
    if (j.type === "spill") {
      j.k >= 0.1 &&
        f(
          j.d.cat === "food" ? "Spill!" : "Easy!",
          j.d.cat === "food"
            ? "Careful with the order"
            : "The VIP did not like that",
        );
      return;
    }
    if (j.type === "ask") {
      f("Abandon?", "E again to abandon " + xi[j.d.cat].label);
      return;
    }
    if (j.type !== "tick") {
      if (
        (C && (i.setFares?.(!0), (C = null)),
        r?.overlay?.challenge && (r.overlay = null),
        j.type === "result")
      ) {
        let X = D(j);
        (i.sting?.("result", j.stars),
          (E = {
            type: "result",
            d: j.d,
            stars: j.stars,
            valText: U(j),
            valSub: G(j),
            lines: X.pay.lines,
            cash: X.got || (a?.ready ? 0 : X.pay.cash),
            xp: X.pay.xp,
            newBest: X.newBest,
            featured: X.feat,
            l5: j.l5,
            wallet: a?.ready ? a.wallet() : null,
            next: q(),
          }),
          j.d.cat === "race" && i.race?.S ? (A = E) : T.result(E),
          O());
        return;
      }
      j.type === "fail" &&
        ((E = {
          type: "fail",
          d: j.d,
          whyText:
            (Net[j.why] || "Over") +
            (j.why === "place"
              ? ` - ${j.place}th of ${j.of}`
              : j.why === "few"
                ? ` (${j.n})`
                : "") +
            (j.why === "busted" ? " \xB7 the fine is the police's" : ""),
          wallet: a?.ready ? a.wallet() : null,
        }),
        j.why !== "abandoned" && j.why !== "teleport"
          ? T.result(E)
          : f(xi[j.d.cat].label, Net[j.why]));
    }
  }
  let V = i.stuntHud;
  if (V) {
    let j = V.onResult;
    V.onResult = (X) => {
      j?.(X);
      try {
        let K = X.s,
          nt = K.ch || m.get(K.id);
        if (
          !nt ||
          !(X.stars > 0) ||
          (!D({
            d: nt,
            stars: X.stars,
            val: X.val,
            q: X.val,
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
  if (i.race) {
    let j = i.race.onResult;
    i.race.onResult = (X) => {
      let K = j ? j(X) : 0;
      try {
        _.raceResult(X);
      } catch (nt) {
        console.warn("challenges race", nt);
      }
      return K;
    };
  }
  if (i.photo) {
    let j = i.photo.frame.bind(i.photo);
    i.photo.frame = (X) => {
      (j(X), _.photoFrame(X));
      for (let K of _.events.splice(0)) W(K);
      (T.objective(_.active, { photo: !0 }), T.tick(X));
    };
  }
  let Q = {
    get busy() {
      return !!_.active;
    },
    list: d,
    runner: _,
    marks: R,
    hud: T,
    featured: b,
    pois: (j) => {
      let X = [];
      for (let K of j || []) {
        let nt =
          gN[K.kind] ||
          (K.kind === "xpboard" || K.kind === "travel"
            ? "collect"
            : K.kind === "flag"
              ? "race"
              : null);
        if (!nt) {
          X.push(K);
          continue;
        }
        !S.has(nt) ||
          S.has("featured") ||
          X.push({
            ...K,
            cat: nt,
            kind:
              nt === "collect"
                ? K.kind
                : CE(nt, nt === "race" ? "race" : K.kind, K.stars || 0, !1),
            col: nt === "collect" ? K.col : xi[nt].col,
          });
      }
      for (let K of d) {
        if (K.gates || !w(K)) continue;
        let nt = v(K.id)?.s || 0,
          Z = y(K.id);
        X.push({
          x: K.spot?.x ?? K.x,
          z: K.spot?.z ?? K.z,
          cat: K.cat,
          kind: CE(K.cat, K.cat, nt, Z),
          col: xi[K.cat].col,
          name:
            (K.cat === "food" || K.cat === "race" || K.cat === "photo"
              ? xi[K.cat].short + " \xB7 "
              : "") +
            K.name +
            (Z ? " \xB7 \xD7" + dN : ""),
          stars: nt,
          ch: K.id,
        });
      }
      return X.map((K) => {
        let nt = l?.list?.find?.(
          (Z) => Z.gates?.[0]?.x === K.x && Z.gates?.[0]?.z === K.z,
        );
        return nt?.ch && y(nt.ch.id)
          ? { ...K, kind: CE(K.cat, nt.kind, K.stars || 0, !0) }
          : K;
      }).filter((K) => {
        let nt = K.cat && K.ch ? m.get(K.ch) : null;
        return !nt || w(nt);
      });
    },
    candidates: () =>
      d
        .filter((j) => !j.gates && w(j))
        .map((j) => ({
          id: "c:" + j.id,
          x: j.spot?.x ?? j.x,
          z: j.spot?.z ?? j.z,
          label: xi[j.cat].label + (y(j.id) ? " \xB7 Featured" : ""),
          name: j.name,
          col: xi[j.cat].col,
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
            }[j.cat] || "\u2022",
          w: 1 + M(j) / 2500,
          isDone: () => (v(j.id)?.s || 0) > 0,
        })),
    filtersDraw: O,
    poiItems: () =>
      d
        .filter((j) => !j.gates && w(j))
        .map((j) => ({
          id: "c:" + j.id,
          x: j.spot?.x ?? j.x,
          z: j.spot?.z ?? j.z,
          kind: Zm(j.cat),
          name: j.name,
          r: 150,
          label:
            xi[j.cat].label +
            " \xB7 " +
            ["", "Easy", "Medium", "Hard"][j.tier] +
            (y(j.id) ? " \xB7 Featured" : ""),
          stars: () => v(j.id)?.s || 0,
          line: () => `UP TO ${Fet(M(j))} \xB7 STOP HERE \xB7 E`,
        })),
    get near() {
      return _.near;
    },
    get active() {
      return _.active;
    },
    start(j = _.near) {
      if (!j) return !1;
      if (i.rideBusy?.())
        return (f(xi[j.cat].label, "Drop your passenger off first"), !1);
      let X = _.start(j);
      if (X) return (f(xi[j.cat].label, X), !1);
      for (let K of _.events.splice(0)) W(K);
      return !0;
    },
    inspect() {
      if (_.active) {
        _.abandon();
        for (let j of _.events.splice(0)) W(j);
        return !0;
      }
      return _.near ? this.start() : !1;
    },
    update(j, X, { hits: K = [], hide: nt = !1, playing: Z = !0 } = {}) {
      (Ip() !== g &&
        ((g = Ip()), (b = mN([...m.values()], g)), (Q.featured = b)),
        _.update(j, X, K),
        A && !i.race?.S && (T.result(A), (A = null)));
      for (let dt of _.events.splice(0)) W(dt);
      let et = _.active,
        tt = i.police?.(),
        it = !et && X && !T.resultOn ? _.near : null;
      (T.prompt(
        it,
        it
          ? {
              rec: v(it.id),
              worth: M(it),
              featured: y(it.id),
              why:
                _.why(it) ||
                (i.rideBusy?.() ? "Drop your passenger off first" : null),
            }
          : null,
      ),
        T.objective(et && !nt ? et : null, {
          pursuit: !!tt?.pursuit,
          cool: tt?.cool || 0,
          coolLeft: tt ? tt.evadeT() - tt.cool : 0,
          l5: et?.auto,
        }));
      let rt = _.target();
      if (et && rt && r && et.kind !== "race" && (F -= j) <= 0) {
        F = 3;
        let dt = rt.pts;
        if (et.kind === "stops" || et.kind === "photo")
          try {
            let ut = s.forward(),
              ot = rt.S || et.d.spot,
              at = ot
                ? o().routeTo(s.pos.x, s.pos.z, ut.x, ut.z, ot, !0)
                : null;
            at && !at.direct && (dt = at.pts);
          } catch {}
        r.overlay = {
          challenge: !0,
          route: dt || [
            [s.pos.x, s.pos.z],
            [rt.x, rt.z],
          ],
          target: { x: rt.x, z: rt.z, col: xi[et.d.cat].col, label: rt.label },
          others: rt.next
            ? [{ x: rt.next.x, z: rt.next.z, col: xi[et.d.cat].col, glyph: "" }]
            : [],
        };
      }
      R.update(e, {
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
      let lt = !!i.garage?.()?.isOpen;
      document.body.classList.toggle("chgarage", lt && !!a?.ready);
      let ct = a?.ready ? a.wallet() : null;
      (a?.onCash &&
        !Q._cashSub &&
        (Q._cashSub = a.onCash((dt) => {
          Math.abs(dt.a) >= 0.5 &&
            T.pop(
              dt.a,
              (dt.pend
                ? "pending \xB7 "
                : dt.released
                  ? "released \xB7 "
                  : "") + (dt.why || "Cash"),
            );
        })),
        T.wallet(!!a && Z, ct, (a?.ready && a.pendingCash?.()) || 0),
        T.tick(j),
        r?.open && !Q._fOpen && O(),
        (Q._fOpen = !!r?.open));
    },
    get filterOn() {
      return S;
    },
  };
  return (O(), Q);
}
