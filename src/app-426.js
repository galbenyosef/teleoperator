// app 426 — math
// Lines 206752-212528 of readable/app.pretty.js (statement-aligned).
try {
  let xt = function (Y, ct) {
      let gt = Xt[_t] || Xt.noon,
        St = D4(ct);
      (Object.assign(Y.params, {
        haze: 2.5 + 5 * ct.haze,
        wind: gt.wind,
        fetch: 3e4,
        choppiness: 1.15,
        gain: (ct.oceanGain ?? 1.8) * (bn && ct.night > 0.5 ? 0.45 : 1),
        coverage: 0.3,
        waterColor: gt.water,
        foam: gt.foam,
        shoreFoam: gt.shore ?? (gt.foam > 1 ? 1 : gt.foam + 0.1),
        glitter: gt.glitter ?? 1,
      }),
        (Y.scene = Ve.has("physsea")
          ? null
          : {
              on: !0,
              sun: ct.sun.map((Bt) => Bt * ct.sunI * (ct.sunEl > 0 ? 1 : 0)),
              dir: [St.x, St.y, St.z],
            }),
        (Y.skip = Y.scene ? { clouds: !0, env: !0 } : null),
        it &&
          tP() &&
          ((Y.bayLights ||= { ...tP() }),
          (Y.bayLights.on = ct.night > 0.3),
          (Y.bayLights.gain = 18 * ct.night)));
    },
    ze = function () {
      if (
        (Oe.attach(Et),
        Et.root.traverse((ct) => {
          ct.isMesh && (ct.userData.mbMover = !0);
        }),
        $n && it && Et.materials)
      )
        for (let ct of Object.values(Et.materials))
          ct.userData.mbSkyVis === void 0 && (ct.userData.mbSkyVis = 2);
      let Y = Et.fleet?.hl || [0.62, 0.62, -2.05];
      de.forEach((ct, gt) => {
        let St = (gt ? 1 : -1) * Y[0];
        (ct.position.set(St, Y[1], Y[2]),
          ct.target.position.set(St * 0.4, 0, -22),
          Et.model.add(ct, ct.target));
      });
    },
    gs = function (Y) {
      if (Y < 0.5) {
        ke && (ke.visible = !1);
        return;
      }
      if (!ke) {
        let ct = mt.filter((Cn) => Cn.k > 0.6),
          gt = ct.length,
          St = new Float32Array(gt * 18 * 3),
          Bt = new Float32Array(gt * 18 * 4),
          Qt = [
            [1, 0, 0],
            [-0.5, 0, 0.866],
            [-0.5, 0, -0.866],
            [0, 1, 0],
            [0, -1, 0],
          ],
          Ie = [
            [0, 3, 1],
            [1, 3, 2],
            [2, 3, 0],
            [1, 4, 0],
            [2, 4, 1],
            [0, 4, 2],
          ],
          Ee = 0,
          Ue = 0;
        for (let Cn of ct) {
          let Ae = Math.abs(
              (Math.sin(Cn.x * 12.9898 + Cn.z * 78.233) * 43758.5453) % 1,
            ),
            Us = Cn.k < 1 ? kt : Ae < 0.35 ? zt : ft,
            Ks = 0.7 + 0.5 * Cn.k;
          for (let Oi of Ie)
            for (let ta of Oi) {
              let fo = Qt[ta];
              ((St[Ee++] = Cn.x + fo[0] * Ks),
                (St[Ee++] = Cn.y + fo[1] * Ks * 0.7),
                (St[Ee++] = Cn.z + fo[2] * Ks),
                (Bt[Ue++] = Us.r),
                (Bt[Ue++] = Us.g),
                (Bt[Ue++] = Us.b),
                (Bt[Ue++] = 1));
            }
        }
        let ws = new Le();
        (ws.setAttribute("position", new Te(St, 3)),
          ws.setAttribute("color", new Te(Bt, 4)),
          ws.computeVertexNormals(),
          ws.computeBoundingSphere());
        let fn = new no(new Uint8Array([255, 255, 255, 255]), 1, 1);
        fn.needsUpdate = !0;
        let kn = new me({
          color: new It(0, 0, 1),
          map: fn,
          vertexColors: !0,
          alphaTest: 0.5,
          roughness: 1,
        });
        ((kn.userData.mbAlbedo = As),
          (ke = new ye(ws, kn)),
          (ke.name = "farLamps"),
          (ke.userData.mbNoReflect = !0),
          (ke.castShadow = ke.receiveShadow = !1),
          (ke.frustumCulled = !1),
          Yt.add(ke));
      }
      (ke.material.color.setRGB(0, 0, Y), (ke.visible = !!z._hookPipe(As)));
    },
    on = function (Y) {
      ((_s = Y), gs(Y));
      for (let ct of ie) ct.visible = Y > 0.2;
      for (let ct of de) ((ct.visible = Y > 0.2), (ct.intensity = Y * 60));
      for (let ct of Wt) ct.visible = !1;
    },
    fi = function () {
      if (_s < 0.2) return;
      {
        let Bt = Et.model.matrixWorld.elements,
          Qt = Math.hypot(Bt[8], Bt[9], Bt[10]) || 1,
          Ie = Math.asin(Math.max(-1, Math.min(1, -Bt[9] / Qt)));
        for (let Ee of de) Ee.userData.mbBeamPitch = Ie;
      }
      let Y = Ne.position.x,
        ct = Ne.position.z,
        gt = [];
      for (let Bt of Se.cars) {
        if (Bt.wreck || Bt.cable) continue;
        let Qt = -Math.sin(Bt.heading),
          Ie = -Math.cos(Bt.heading),
          Ee = Math.hypot(Bt.x + Qt * 10 - Y, Bt.z + Ie * 10 - ct);
        Ee < 80 && gt.push([Ee, Bt]);
      }
      gt.sort((Bt, Qt) => Bt[0] - Qt[0]);
      let St = gt[Wt.length]?.[0] ?? 80;
      Wt.forEach((Bt, Qt) => {
        let Ie = gt[Qt];
        if (((Bt.visible = !!Ie), !Ie)) return;
        let Ee = Ie[1],
          Ue = -Math.sin(Ee.heading),
          ws = -Math.cos(Ee.heading),
          fn = (Ee.y ?? 0) + 0.75,
          kn = Ee.V.L / 2 + 0.1,
          Cn = Math.tan(Ee.pitch || 0);
        (Bt.position.set(Ee.x + Ue * kn, fn + kn * Cn, Ee.z + ws * kn),
          Bt.target.position.set(
            Ee.x + Ue * (kn + 18) - ws * 1.6,
            fn - 1.9 + (kn + 18) * Cn,
            Ee.z + ws * (kn + 18) + Ue * 1.6,
          ),
          Bt.target.updateMatrixWorld(),
          (Bt.userData.mbBeamPitch = Ee.pitch || 0));
        let Ae = Zt.pos.x - Bt.position.x,
          Us = Zt.pos.z - Bt.position.z,
          Ks = Ae * Ue + Us * ws,
          Oi = Math.abs(Ae * ws - Us * Ue),
          ta =
            Ks > -1 && Ks < 22 && Oi < 2.2 + 0.06 * Math.max(0, Ks)
              ? Math.min(1, Math.max(0.08, (Ks - 1.5) / 20))
              : 1,
          fo =
            Math.min(1, Math.max(0, (St - Ie[0]) / 10)) *
            (1 - Math.min(1, Math.max(0, (Ie[0] - 55) / 25)));
        Bt.intensity = 30 * _s * ta * fo;
      });
    },
    I0 = function (Y) {
      je();
      let ct = ca[_t].glowFill;
      if (_s < 0.2 || !ct?.h) {
        z.glowFall = null;
        return;
      }
      let gt = it ? it.layout.driveHeight(Ne.position.x, Ne.position.z) : 0;
      ((co =
        co === null || Math.abs(gt - co) > 40
          ? gt
          : co + (gt - co) * Math.min(1, Y * 1.5)),
        (z.glowFall = { y: co, h: ct.h, floor: ct.floor ?? 0 }));
    },
    Ld = function () {
      if (_s < 0.2) return;
      let Y = Ne.position.x,
        ct = Ne.position.z,
        gt = Ne.getWorldDirection(Ft),
        St = mt
          .filter(
            (ws) =>
              !ws.prop.broken &&
              Math.abs(ws.x - Y) < 220 &&
              Math.abs(ws.z - ct) < 220,
          )
          .map((ws) => {
            let fn = ws.x - Y,
              kn = ws.z - ct,
              Cn = fn * fn + kn * kn,
              Ae = fn * gt.x + kn * gt.z;
            return [ws, Cn * (Ae < -12 ? 3 : 1) * (ws.k < 0.6 ? 1.6 : 1)];
          })
          .sort((ws, fn) => ws[1] - fn[1])
          .slice(0, Dt),
        Bt = St.length >= Dt ? Math.sqrt(St[St.length - 1][1]) : 1e9;
      St.forEach(([ws, fn], kn) => {
        let Cn = ie[kn],
          Ae = (Math.sin(ws.x * 12.9898 + ws.z * 78.233) * 43758.5453) % 1;
        (Cn.position.copy(ws),
          Cn.target.position.set(ws.x, ws.y - 8, ws.z),
          Cn.target.updateMatrixWorld());
        let Us = Math.min(1, Math.max(0, (Bt - Math.sqrt(fn)) / (0.3 * Bt)));
        (Cn.color.copy(ws.k < 1 ? kt : Math.abs(Ae) < 0.35 ? zt : ft),
          (Cn.intensity = Ht.i * _s * ws.k * Us * Us * (3 - 2 * Us)),
          (Cn.visible = Cn.intensity > 0),
          (Cn.distance = ws.k < 1 ? 28 : 38),
          (Cn.userData.mbStreetLamp = ws.arm
            ? {
                k: Ht.bw,
                shield:
                  Math.atan2(Math.cos(ws.prop.rot), Math.sin(ws.prop.rot)) ||
                  1e-4,
              }
            : { k: Ht.bw * 0.6, shield: 0 }));
      });
      for (let ws = St.length; ws < ie.length; ws++)
        ((ie[ws].intensity = 0), (ie[ws].visible = !1));
      let Qt = -1,
        Ie = -1,
        Ee = 1225,
        Ue = 1225;
      (!bn &&
        !su &&
        E !== "perf" &&
        !Ve.has("nolampsh") &&
        St.forEach(([ws], fn) => {
          if (ws.k < 0.6 || ie[fn].intensity < Ht.i * _s * 0.3) return;
          let kn = (ws.x - Zt.pos.x) ** 2 + (ws.z - Zt.pos.z) ** 2;
          kn < Ee
            ? ((Ue = Ee), (Ie = Qt), (Ee = kn), (Qt = fn))
            : kn < Ue && ((Ue = kn), (Ie = fn));
        }),
        ie.forEach((ws, fn) => {
          ws.castShadow = fn === Qt || (fn === Ie && E === "ultra");
        }));
    },
    Si = function () {
      let Y = innerWidth,
        ct = innerHeight,
        gt = Y,
        St = ct,
        Bt = H;
      (Ve.has("size") &&
        (([gt, St] = Ve.get("size").split("x").map(Number)), (Bt = 1)),
        z.setDrawingBufferSize(gt, St, Bt),
        (Ne.aspect = gt / St),
        Ne.updateProjectionMatrix());
    },
    Uot = function (Y) {
      let ct = La ? Zt.kmh / 1.609 : Zt.kmh;
      if (
        (f3("spd", String(Math.round(ct)).padStart(3, "0")),
        f3("unit", La ? "MPH" : "KM/H"),
        $n && !Ev.has(Dn))
      ) {
        f3("gear", Zt.reverse ? "R" : "D");
        let Qt = Zt.S,
          Ie = Qt.torque
            ? Math.min(
                1,
                (Zt.throttle *
                  Qt.torque(Math.max(Zt.rpm, 1)) *
                  Math.max(Zt.rpm, 1)) /
                  9.5493 /
                  31e4,
              )
            : 0,
          Ee = Zt.reverse
            ? 0
            : Math.min(
                1,
                ((1 - Zt.throttle) * Math.min(1, Zt.kmh / 35) * 0.75 +
                  Zt.brake * 0.25) *
                  (Zt.speed > 1 ? 1 : 0),
              );
        ((A9 += (Ie - A9) * Math.min(1, Y * 10)),
          (R9 += (Ee - R9) * Math.min(1, Y * 8)),
          V4("rpm", (100 - A9 * 100).toFixed(1)),
          V4("nos", (100 - (Qt.thrusters ? Zt.nitro : R9) * 100).toFixed(1)));
      } else
        (f3("gear", Zt.reverse ? "R" : Zt.gear),
          V4("rpm", (100 - Math.min(1, Zt.rpm / T9) * 100).toFixed(1)),
          V4("nos", (100 - Zt.nitro * 100).toFixed(1)),
          R1("hud").classList.toggle("hot", Zt.rpm > 8e3 && !Zt.reverse));
      let gt = Zt.forward(),
        St,
        Bt = "";
      if (it) {
        if ((HN -= Y) <= 0) {
          HN = 0.25;
          let Qt = it.layout.streetInfo(
            Zt.pos.x,
            Zt.pos.z,
            gt.x,
            gt.z,
            Zt.pos.y,
          );
          ((DN = YF(Qt.name)),
            (UN = Qt.next ? "NEXT \xB7 " + YF(Qt.next) : ""));
          let Ie = uot(Zt.pos.x, Zt.pos.z)
            .toLowerCase()
            .replace(/(^|[\s-])\S/g, (Ee) => Ee.toUpperCase())
            .replace(/\bSoma\b/, "SoMa")
            .replace(/\bNopa\b/, "NoPa");
          Ie !== GN && ((GN = Ie), (Ns("wHood").textContent = Ie));
        }
        ((St = DN), (Bt = UN));
      } else {
        let Qt = x8(Zt.pos.x),
          Ie = v8(Zt.pos.z),
          Ee = Math.abs(Zt.pos.x - he[Qt]),
          Ue = Math.abs(Zt.pos.z - pe[Ie]),
          ws = Ee < Ue,
          fn = Ni(Zt.pos.x, Zt.pos.z),
          kn = fn ? wN(fn, gt.x, gt.z) : null;
        if (((St = kn ? kn[0] : ws ? ps[Qt].name : ns[Ie].name), kn))
          Bt = kn[1];
        else if (ws) {
          let Cn =
            gt.z < 0
              ? [...pe.keys()].reverse().find((Ae) => pe[Ae] < Zt.pos.z - 2)
              : [...pe.keys()].find((Ae) => pe[Ae] > Zt.pos.z + 2);
          Cn != null && (Bt = "NEXT \xB7 " + ns[Cn].name);
        } else {
          let Cn =
            gt.x > 0
              ? [...he.keys()].find((Ae) => he[Ae] > Zt.pos.x + 2)
              : [...he.keys()].reverse().find((Ae) => he[Ae] < Zt.pos.x - 2);
          Cn != null && (Bt = "NEXT \xB7 " + ps[Cn].name);
        }
      }
      (St !== NN && ((NN = St), (Ns("wSt").textContent = St)),
        f3("wX", Bt),
        R1("drift").classList.toggle("on", Zt.drift > 0.4 && Zt.speed > 12));
      {
        let Qt =
          Mn.mode !== "manual" &&
          Mn.mode !== "l5" &&
          Mn.cue?.state === "brake" &&
          document.body.classList.contains("play");
        Id.brake !== Qt &&
          ((Id.brake = Qt), R1("brakeCue")?.classList.toggle("on", Qt));
      }
      {
        let Qt = Mn.mode,
          Ie = Qt !== "manual",
          Ee = !!Mn.takeover,
          Ue = Qt === "l5",
          ws = Ie && !Ue && Mn.active > 0.25,
          fn = Ue && Mn.state === "driving",
          kn = Ue && !!Mn.boost,
          Cn =
            Qt +
            (ws ? "a" : "") +
            (fn ? "d" : "") +
            (Ee ? "t" : "") +
            (Mn.profile || "") +
            (kn ? "B" : "");
        if (Id.da !== Cn) {
          Id.da = Cn;
          let Ae = Ue && Mn.profile === "madmax",
            Us = Ie
              ? Qt.toUpperCase() + (kn ? " BOOST" : Ae ? " MAX" : "")
              : "MAN",
            Ks = Ee
              ? "Taken over: I or a tap - L5 again"
              : (z2[Qt]?.name || "") +
                (Ue
                  ? " \xB7 " +
                    (kn
                      ? "Boost (the gas held: faster, still avoiding)"
                      : Mn.prof?.name || "Mad Max") +
                    (fn ? " \xB7 driving" : " \xB7 waiting")
                  : ws
                    ? " \xB7 guiding"
                    : "");
          for (let [Oi, ta] of [
            ["aDA", "aDAl"],
            ["tDA", "tDAl"],
          ]) {
            let fo = R1(Oi);
            if (!fo) continue;
            (fo.classList.toggle("on", Ie),
              fo.classList.toggle("boost", kn),
              fo.classList.toggle("act", ws),
              fo.classList.toggle("drive", fn),
              fo.classList.toggle("take", Ee),
              (fo.title = Ks));
            let qr = R1(ta);
            qr && (qr.textContent = Us);
          }
        }
      }
      if (
        (Hn.hud() && qn("Downshift blocked", "It would over-rev"),
        bn && ++Hot & 1 ? (P9 += Y) : (pi.update(Y + P9), (P9 = 0)),
        Cd)
      ) {
        let Qt = String(Math.round(ct));
        ou.s !== Qt && ((ou.s = Qt), (Ns("tSpdV").textContent = Qt));
        let Ie = La ? "MPH" : "KM/H";
        ou.u !== Ie && ((ou.u = Ie), (Ns("tSpdU").textContent = Ie));
        let Ee = Zt.reverse
          ? "R"
          : (Zt.S.gears?.length || 1) < 2
            ? "D"
            : String(Zt.gear);
        ou.g !== Ee && ((ou.g = Ee), (Ns("tGear").textContent = Ee));
        let Ue = ou.d ? Zt.kmh > 4 : Zt.kmh > 9;
        Ue !== ou.d &&
          ((ou.d = Ue), document.body.classList.toggle("driving", Ue));
      }
    },
    Got = function () {
      if (!Cd || Zn) return;
      let Y = 0;
      try {
        ((Y = +localStorage.getItem("sf-drive.gestureHint") || 0),
          localStorage.setItem("sf-drive.gestureHint", String(Y + 1)));
      } catch {}
      if (Y >= 2) return;
      let ct = Ns("gHint");
      (setTimeout(() => ct.classList.add("on"), 600),
        setTimeout(() => ct.classList.remove("on"), 6500));
    },
    j4 = function (Y) {
      if (Y === "custom" && us.custom?.ride) {
        let ct = Tc[C9(us.custom.ride)];
        return {
          id: ct.audio,
          virt: ct.ice,
          ice: ct.ice,
          snd: C9(us.custom.ride),
        };
      }
      return { id: Y || "ferrari", virt: !1, ice: Ev.has(Y) };
    },
    YN = function (Y, ct = !1) {
      let gt = us.custom;
      if (Dn !== "custom" || !gt?.ride) return;
      let St = { ...gt.ride };
      if (
        (Y && Tc[Y] ? (St.snd = Y) : delete St.snd,
        St.snd === gt.ride.snd || ((gt.ride = St), L9(), !ct))
      )
        return;
      let Bt = (Qt) => {
        if (Qt?.sha !== St.sha) return Qt;
        let Ie = { ...Qt };
        return (St.snd ? (Ie.snd = St.snd) : delete Ie.snd, Ie);
      };
      if (qh()?.sha === St.sha) {
        let Qt = Bt(qh());
        try {
          localStorage.setItem($4, JSON.stringify(Qt));
        } catch {}
        Xs?.setRide?.(Qt);
      }
      Va().some((Qt) => Qt.ride?.sha === St.sha) &&
        Od(
          Va().map((Qt) =>
            Qt.ride?.sha === St.sha ? { ...Qt, ride: Bt(Qt.ride) } : Qt,
          ),
        );
      for (let Qt of Vn.list())
        Qt.ride?.sha === St.sha && Vn.update(Qt.id, { ride: Bt(Qt.ride) });
    },
    tg = function (Y) {
      return (
        (Y = Ul(Y)),
        Y
          ? ((us.custom = VE(Y, null)), Qo?.setCustom?.(us.custom), us.custom)
          : null
      );
    },
    Zot = function (Y) {
      let ct = cu(sg, {});
      if (Y.startsWith("m:")) {
        let Bt = Va().find((Ee) => Ee.id === Y.slice(2));
        if (!Bt) return null;
        let Qt = Bt.base !== "custom" ? us[Bt.base] : null,
          Ie = null;
        try {
          Ie = Qt
            ? Pc(P1(Bt.base), Bt.tune, Bt.base)
            : Bt.ride
              ? Pc(Bv(Bt.ride.vehicle), Bt.tune, "custom")
              : null;
        } catch {}
        return {
          key: Y,
          name: Bt.name,
          tag: Bt.base === "custom" ? "Made with AI" : "Your build",
          sub: Qt
            ? "on the " + Qt.name
            : Bt.ride?.name || "Made with mindblown",
          thumb: ct[Bt.id] || Bt.ride?.icon || null,
          F: Qt,
          stats: t8(Ie),
          acc: "#b98cff",
        };
      }
      if (Y.startsWith("b:")) {
        let Bt = Vn.get(Y.slice(2));
        if (!Bt?.ride || !(Bt.status === "ready" || Bt.status === "driven"))
          return null;
        let Qt = null;
        try {
          Qt = Pc(Bv(Bt.ride.vehicle), null, "custom");
        } catch {}
        return {
          key: Y,
          name: Bt.name || Bt.ride.name,
          tag: "Made with AI",
          sub: "Made with mindblown",
          thumb: Bt.item?.files?.icon?.url || Bt.ride.icon || Bt.thumb || null,
          stats: t8(Qt),
          acc: "#b98cff",
        };
      }
      if (Y === "custom") {
        let Bt = us.custom?.ride;
        if (!Bt) return null;
        let Qt = null;
        try {
          Qt = Pc(Bv(Bt.vehicle), ul.get(Y4("custom", Bt.sha)), "custom");
        } catch {}
        return {
          key: Y,
          name: Bt.name,
          tag: Bt.own ? "Your mindblown car" : "From mindblown",
          sub: "Made with mindblown",
          thumb: Bt.icon || null,
          stats: t8(Qt),
          acc: "#b98cff",
        };
      }
      let gt = us[Y];
      if (!gt || Y === "custom") return null;
      let St = null;
      try {
        St = Pc(P1(Y), ul.get(Y), Y);
      } catch {}
      return {
        key: Y,
        name: gt.name,
        tag: gt.maker,
        sub: gt.model,
        F: gt,
        stats: t8(St),
        acc: gt.accent,
      };
    },
    Qot = function () {
      let Y = [],
        ct = new Set(),
        gt = (St) => {
          if (!St || ct.has(St) || Y.length >= 3) return;
          let Bt = Zot(St);
          Bt && (Y.push(Bt), ct.add(St));
        };
      gt(fH());
      for (let St of cu(Q4, [])) gt(St);
      for (let St of Va().slice().reverse()) gt("m:" + St.id);
      for (let St of [
        "waymo",
        "ferrari",
        "roadster",
        "missions",
        "cybertruck",
        "cybercab",
        "corvette",
      ])
        gt(St);
      return Y;
    },
    fH = function () {
      if (!tH) return Dn;
      let Y = J4(),
        ct = Y && Va().find((gt) => gt.id === Y);
      if (
        ct &&
        ct.base === Dn &&
        (Dn !== "custom" || ct.ride?.sha === Et?.rideSha)
      )
        return "m:" + ct.id;
      if (Dn === "custom") {
        let gt = Vn.list().find(
          (St) =>
            St.ride?.sha === Et?.rideSha &&
            (St.status === "ready" || St.status === "driven"),
        );
        return gt ? "b:" + gt.id : "custom";
      }
      return Dn;
    },
    eat = function (Y) {
      if ((B9(Y), Y.startsWith("m:"))) {
        let ct = Va().find((gt) => gt.id === Y.slice(2));
        ct && Bd.drive({ kind: "mine", c: ct });
        return;
      }
      if (Y.startsWith("b:")) {
        let ct = Vn.get(Y.slice(2));
        ct?.ride &&
          (Vn.update(ct.id, { status: "driven" }),
          Bd.drive({ kind: "ride", ride: ct.ride }));
        return;
      }
      Bd.drive(
        Y === "custom" && us.custom?.ride
          ? { kind: "ride", ride: us.custom.ride }
          : { kind: "fleet", id: Y },
      );
    },
    bH = function () {
      ((a8.on = pl.rumble !== "off"), a8.on || a8.stop());
      let Y = (ct, gt) => (Number.isFinite(+ct) ? +ct : gt);
      ((fs.padCurve =
        2.2 - (1.6 * Math.max(0, Math.min(100, Y(pl.steerSens, 50)))) / 100),
        (fs.padDZ = Math.max(0, Math.min(0.3, Y(pl.deadzone, 12) / 100))),
        (ui.fovAdd = Math.max(-10, Math.min(20, Y(pl.fovAdd, 0)))));
    },
    TH = function () {
      if (Ts) return Ts;
      let Y = j4(Dn);
      ((Ts = new hT("assets/", {
        mobile: bn,
        ev: $n && !Y.ice,
        vehicle: Y.id,
        virt: Y.virt,
      })),
        (window.__sf.audio = Ts),
        window.__sf.tuneCar?.());
      let ct = re.onProp;
      return (
        ct &&
          (re.onProp = (gt, St, Bt) => {
            let Qt = ct(gt, St, Bt);
            return (
              Qt &&
                Ts.prop(
                  gt.prop.kind,
                  gt.x,
                  St.pos.y,
                  gt.z,
                  Math.min(1, Math.hypot(St.vel.x, St.vel.z) / 25),
                ),
              Qt
            );
          }),
        Ts
      );
    },
    RH = function (Y) {
      let ct = uat[Y] || B;
      ((E = dat[Y] || E),
        (B = ct),
        (globalThis.SF_Q = E),
        (C = F(ct, E)),
        (H = O(ct, E, C)),
        ($l = N0 = 0),
        (z.ssr = E === "perf" || Ve.has("nossr") ? !1 : void 0),
        (z.ssrDistance = E === "ultra" ? 160 : 90));
      let gt =
        ct === "safe"
          ? 512
          : ct === "mobile"
            ? 1024
            : E === "perf"
              ? 2048
              : 4096;
      if (
        ((globalThis.MB_SHADOW_RES = gt),
        z.setShadowRes?.(gt),
        (An.castShadow =
          ct !== "safe" && !Ve.has("noshadow") && ca[_t].sunEl > 0),
        I(ct !== "desktop"),
        Si(),
        (rg = 0),
        (Se.cablePer = ct === "desktop" ? 4 : 2),
        !Ve.has("notraffic"))
      ) {
        Se.max = as(ct);
        let Bt = Ne.position.x,
          Qt = Ne.position.z,
          Ie = Se.cars
            .filter((Ee) => !Ee.cable && !Ee.bus && !Ee.net)
            .sort(
              (Ee, Ue) =>
                Math.hypot(Ue.x - Bt, Ue.z - Qt) -
                Math.hypot(Ee.x - Bt, Ee.z - Qt),
            );
        for (
          let Ee = 0, Ue = Se.cars.length - Se.max;
          Ee < Ue && Ee < Ie.length;
          Ee++
        )
          Se.cars.splice(Se.cars.indexOf(Ie[Ee]), 1);
      }
      J9 = 0;
      let St = !1;
      try {
        St =
          JSON.parse(localStorage.getItem("sf-drive.settings") || "{}").fps !=
          null;
      } catch {}
      return (
        !St &&
          !Ve.has("fps") &&
          (globalThis.SF_FPS = ct === "desktop" ? 60 : 30),
        bn || Jt(_t, !0),
        ct !== globalThis.SF_TIER
      );
    },
    NH = function (Y) {
      try {
        gat(Y);
      } catch (ct) {
        if (!J2 && Iu(ct)) _1(ct);
        else throw mat(ct);
      }
    },
    mat = function (Y) {
      if (!Y || typeof Y != "object" || Y.sfAt) return Y;
      let ct = String(Y.stack || "")
        .split(
          `
`,
        )
        .map((St) => St.match(/([\w.-]+\.js):(\d+):(\d+)/))
        .filter(Boolean)
        .slice(0, 3)
        .map((St) => St[1] + ":" + St[2] + ":" + St[3]);
      try {
        ((Y.sfAt = ct[0] || "?"),
          ct.length &&
            (Y.message +=
              " @ " +
              ct
                .map((St) => St.replace(/:(\d+):(\d+)$/, " line $1 col $2"))
                .join(" < ")));
      } catch {}
      let gt = String(Y.name) + ct[0];
      return (
        BH.has(gt) ||
          (BH.add(gt),
          Dr.event("js_error", {
            name: String(Y.name || "Error").slice(0, 40),
            msg: String(Y.message).slice(0, 120),
            at: ct.join(" < ").slice(0, 120),
          })),
        Y
      );
    },
    gat = function (Y) {
      if (J2 || (requestAnimationFrame(NH), window.__sf.freeze)) return;
      {
        let Ae = Y - IH;
        ((IH = Y),
          Ae > 2 &&
            Ae < 70 &&
            (Xh =
              !Xh || Ae < Xh * 0.8
                ? Ae
                : Ae < Xh * 1.25
                  ? Xh + (Ae - Xh) * 0.05
                  : Xh));
      }
      let ct =
          !Zn &&
          (!document.body.classList.contains("play") ||
            y3.on ||
            Pi?.isOpen ||
            !document.hasFocus() ||
            (globalThis.SF_FPS_AUTO && OH)),
        gt =
          ct && !((globalThis.SF_FPS | 0) > 0 && (globalThis.SF_FPS | 0) <= 30)
            ? 30
            : globalThis.SF_FPS | 0;
      if (
        ((f8 = ct),
        gt > 0 &&
          Xh > 0 &&
          Y - FH < (Math.max(1, Math.floor(1e3 / gt / Xh + 0.25)) - 0.5) * Xh)
      )
        return;
      if (((FH = Y), wa.length)) {
        let Ae = performance.now();
        do {
          let Us = wa.pop();
          try {
            z._texture(Us);
          } catch {}
        } while (wa.length && performance.now() - Ae < 3);
      }
      let St = Math.min(0.05, pat.step((Y - X9) / 1e3));
      X9 = Y;
      let Bt = St;
      if (
        (Hn.paused || (St *= De.scale(St) * di.scale(St)),
        fs.take("pause") && !Qo?.isOpen && !Pi?.isOpen && Hn.toggle(),
        fs.take("photo") &&
          !Hn.paused &&
          !pi.open &&
          !Qo?.isOpen &&
          document.body.classList.contains("play") &&
          (Un?.active
            ? qn("Photo mode", "Not during a race")
            : ($h.open(), Xl?.aim())),
        $h.on)
      ) {
        ($h.frame(St), z.render(Yt, Ne));
        return;
      }
      if (Hn.paused || pi.open) return;
      let Qt = Ga.step(St);
      if (
        (fs.take("shiftUp") && Zt.shift(1),
        fs.take("shiftDown") && Zt.shift(-1),
        fs.actions.has("reset") &&
          (Dr.reset(Un?.active ? "race" : $9 || "manual", Zt.kmh), ($9 = null)),
        Un?.active && fs.take("reset"))
      )
        Un.reset();
      else if (it && fs.take("reset")) {
        let Ae = it.layout.roadAt(Zt.pos.x, Zt.pos.z, 150, Zt.pos.y),
          Us = Zt.forward();
        if (Ae) {
          let Ks = Yp(
            it.data,
            it.layout,
            Ae.E.name,
            Zt.pos.x,
            Zt.pos.z,
            Us.x,
            Us.z,
          );
          (Zt.place(Ks[0], Ks[1], Ks[2]),
            qn("Back on the road", "", "", { key: "road" }));
        }
      } else if (fs.take("reset")) {
        let Ae = x8(Zt.pos.x),
          Us = v8(Zt.pos.z);
        (Math.abs(Zt.pos.x - he[Ae]) < Math.abs(Zt.pos.z - pe[Us])
          ? Zt.place(
              he[Ae] + 2.5,
              Zt.pos.z,
              Math.round(Zt.psi / Math.PI) * Math.PI,
            )
          : Zt.place(
              Zt.pos.x,
              pe[Us] + 2.5,
              Zt.psi > 0 ? Math.PI / 2 : -Math.PI / 2,
            ),
          qn("Back on the road"));
      }
      if (
        (fs.take("camera") &&
          (Mn.mode === "l5" && !Mn.takeover
            ? (G9(!Nd),
              qn(
                Nd ? "Cinematic camera" : ui.modeName,
                Nd ? "C: back to " + ui.modeName : "",
                "",
                { key: "cam" },
              ))
            : (ui.next(), qn(ui.modeName, "", "", { key: "cam" }))),
        fs.take("help") && document.body.classList.toggle("help"),
        fs.take("mute") && Ts && Ts.mute(!Ts.muted),
        fs.take("music") && Ts && Ts.next(),
        fs.take("radio") && Ts)
      ) {
        let Ae = Ts.cycleStation();
        (Ae === "Off" || !Ts.driving) &&
          qn(
            Ae === "Off" ? "Radio off" : Ae,
            Ae === "Off"
              ? "the city's own sound \xB7 L: back on"
              : "Radio \xB7 L: next station",
            $n ? "music" : "",
            { key: "music" },
          );
      }
      if (
        (fs.take("units") && ((La = !La), BT(La ? "mph" : "kmh")),
        fs.take("assist"))
      ) {
        let Ae = Mn.takeover,
          Us = Hn.cycleAssist();
        Ae || Oc(Us);
      }
      (fs.take("time") && Jt(k1[(k1.indexOf(_t) + 1) % k1.length]),
        fs.take("fans") &&
          Zt.S.fanKg &&
          ((Zt.fanOn = !Zt.fanOn),
          qn(
            Zt.fanOn ? "Fans on" : "Fans off",
            Zt.fanOn ? "Their suction holds it to the road" : "Q: on again",
            "",
            { key: "fans" },
          )),
        (fs.kmh = Zt.kmh));
      let Ie = Y9.on && Y9.input ? Y9.input : fs.read();
      (document.body.classList.contains("play") ||
        ((Ie.throttle = 0), (Ie.brake = 0), (Ie.steer = 0)),
        ki?.hold > 0 &&
          ((Ie.throttle = 0), (Ie.brake = 1), (Ie.steer = 0), (Ie.nitro = 0)),
        Un && (Un.rawThr = Ie.throttle || 0),
        Un?.frozen &&
          ((Ie.throttle = 0),
          (Ie.brake = 0),
          (Ie.steer = 0),
          (Ie.handbrake = 1)),
        Se.update(St, Zt, re, document.body.classList.contains("play") || Zn),
        (re.dynamic = Qn ? Qn.merge(Se.colliders) : Se.colliders),
        Un && (re.dynamic = Un.merge(re.dynamic)),
        (Zt.holdStop = !!(
          vt &&
          Sr &&
          (vt.state === "boarding" || vt.state === "alighting")
        )),
        (lg += St));
      let Ee = document.body.classList.contains("play") || Zn,
        Ue = D9.update(
          St,
          !!Ie.rewind && !di.on,
          Ee && !di.on && !Un?.active && !Qt && !(ki?.hold > 0) && !Qo?.isOpen,
          Ee && !Qt,
        );
      for (Ue && (lg = 0), di.on && ((lg = 0), di.update(St, Bt)); lg >= c8;)
        (Zt.step(c8, Qt ? Ga.input : Ie, re), Qt && Ga.pin(), (lg -= c8));
      (Vr?.update(St, L1 && Ee && !Un?.active && !Qt && !Ue && !(ki?.hold > 0)),
        aat(St, Ee && !Un?.active && !Qt && !Ue));
      {
        let Ae = Mn.mode === "l5" && !Mn.takeover,
          Us =
            ((Ie.throttle || 0) > 0.3 && !Ae) || (Ae && (Mn.stuckT || 0) > 0.5),
          Ks = () => {
            let Oi = Zt.forward();
            for (let ta of Se?.cars || []) {
              let fo = ta.x - Zt.pos.x,
                qr = ta.z - Zt.pos.z,
                p0 = fo * Oi.x + qr * Oi.z;
              if (
                p0 > 0 &&
                p0 < 9 &&
                Math.abs(fo * Oi.z - qr * Oi.x) < 2 &&
                Math.abs((ta.y ?? Zt.pos.y) - Zt.pos.y) < 2.5
              )
                return !0;
            }
            return !1;
          };
        ((v3 =
          Ee &&
          !Un?.frozen &&
          !Qt &&
          !Ue &&
          !(ki?.hold > 0) &&
          Us &&
          Zt.speed < 0.8 &&
          (Ae || !Ks())
            ? v3 + St
            : 0),
          ig.classList.toggle("on", v3 > cat && !Ae),
          Ae &&
            v3 > 6 &&
            ((v3 = 0),
            ($9 = "l5_stuck"),
            fs.actions.add("reset"),
            qn("Level 5", "Held up - back on the road")));
      }
      (w3 >= 0 &&
        (w3 -= St) < 0 &&
        (Xs && !Xs.ready && SH < 6
          ? ((w3 = 0.5), (SH += 0.5))
          : (!Zn || Ve.has("intro")) && y3.start()),
        y3.update(St),
        jh?.update(Zt));
      {
        let Ae =
            Ee && !Un?.active && !Qt && !Ue && !Hn.paused && !pi.open && !$h.on,
          Us = Xl?.update(Ae);
        (Kl?.update(Ae && !Us),
          Wr?.update(St, Ae && !Us && !Kl?.near && !Ga.on, {
            hits: re.hits,
            hide: !!Un?.active,
            playing: Ee,
          }),
          fs.take("inspect") &&
            (Xl?.car ? Xl.inspect() : Kl?.near ? Kl.start() : Wr?.inspect()));
      }
      (W9.update(
        St,
        Ee &&
          !Un?.active &&
          !($n && Sr && (!Wr || MH())) &&
          !Wr?.active &&
          !$h.on &&
          pl.guide !== "off" &&
          (!Zn || Ve.has("nextup")),
      ),
        lat.update(
          St,
          Ee &&
            !Un?.active &&
            !Wr?.active &&
            !Wr?.near &&
            !$h.on &&
            !Hn.paused &&
            !pi.open &&
            !document.body.classList.contains("stLive") &&
            !Ns("taxiCard")?.classList.contains("on") &&
            !Ns("taxiTrip")?.classList.contains("on"),
        ),
        x3.update(
          St,
          Zt,
          re.hits,
          Ee && !Un?.active && !Qt && !Ue && !(ki?.hold > 0),
          Mn.mode === "l5" && !Mn.takeover,
        ),
        og > 0 && ki && (ki.heat = 0),
        ki?.update(
          St,
          (document.body.classList.contains("play") || Zn) &&
            !Un?.active &&
            !Qt,
        ),
        og > 0 &&
          document.body.classList.contains("play") &&
          ((og -= St), ki && (ki.heat = 0)),
        (j9 || (og > kH - 40 && zH)) &&
          !Qt &&
          !Ga.on &&
          document.body.classList.contains("play") &&
          ((j9 = !1), _H()),
        (zH = Qt));
      for (let Ae of Mn.events.splice(0))
        Ae.type === "takeover"
          ? (qn(
              "Takeover",
              Ae.why === "blocked"
                ? "Level 5 is held up - you have the wheel \xB7 I: L5 again"
                : "You have the wheel (L3) \xB7 I or the chip: L5 again",
            ),
            Hn.sync())
          : Ae.type === "engaged"
            ? (qn(
                "Level 5",
                Mn.dest
                  ? "Driving to the pin"
                  : vt && Sr
                    ? "Driving the fares"
                    : "Cruising the city",
              ),
              Hn.sync())
            : Ae.type === "arrived" &&
              qn("Arrived", "Level 5 holds at the kerb");
      let ws =
        pl.brakeLine === "always" &&
        Mn.mode === "manual" &&
        !Un?.active &&
        !!it;
      if (
        (ws && Mn.pathStep(St, Zt, Ie),
        fl.update(
          St,
          Mn,
          it?.layout,
          document.body.classList.contains("play") || Zn,
          ws,
        ),
        Bc &&
          Sr &&
          (document.body.classList.contains("play") || Zn) &&
          !(w3 >= 0 || y3.on) &&
          Bc.update(St, Zt, re.hits, Ne),
        re.parked.moved.size)
      ) {
        for (let Ae of re.parked.moved) {
          Gt.userData.moveParked(Ae);
          for (let Us of au) Us.userData.moveParked(Ae);
        }
        re.parked.moved.clear();
      }
      (Et._under === void 0 &&
        (Et.root.updateMatrixWorld(!0),
        (Et._under =
          (Et.id || Dn) === "roadster"
            ? null
            : Ktt(Et, {
                ev: !Ev.has(Et.id || Dn || "ferrari"),
                front:
                  (Et.id || Dn) === "roadster" ||
                  (Et.id || Dn) === "cybertruck",
              }))),
        Se.drawDue && ((Se.drawDue = !1), Se.draw()),
        Ec(Et, Zt.renderPose(lg / c8)),
        di.pose(Et, Zt),
        Pi?.isOpen && Pi.frame(St, Et),
        Et.root.updateMatrixWorld(!0),
        Qn?.update(St, document.body.classList.contains("play")),
        Un?.update(St, document.body.classList.contains("play")),
        Xs?.update(St, document.body.classList.contains("play")),
        LH.copy(Et.body.matrixWorld).invert(),
        (z.carFrameInv = LH));
      {
        let Ae = Qn?.spectate?.();
        Ae ? ui.update(St, Ae.v, Ae.car, {}) : ui.update(St, Zt, Et, Ie);
      }
      Nd && !(Mn.mode === "l5" && !Mn.takeover) && G9(!1);
      for (let Ae of re.hits) {
        if (Ae.t <= Ds) continue;
        Ds = Ae.t;
        let Us = document.body.classList.contains("play") || (Zn && !di.off);
        if (
          Us &&
          !di.on &&
          !Qt &&
          !Un?.frozen &&
          !Ae.C?.prop &&
          !Ae.C?.traffic?.wreck?.air &&
          Ae.v > (Ae.car ? 30 : 25) &&
          performance.now() - di.lastT > 2e4 &&
          di.start(Zt, Et, Ae)
        ) {
          De.on = !1;
          continue;
        }
        (Ae.v > 12 && Us && !Ae.spike && Dr.crash(Ae),
          Ae.v > 9 &&
            document.body.classList.contains("play") &&
            De.stop(Math.min(0.09, 0.025 + (Ae.v - 9) * 0.004)));
      }
      if (Nd) gH.update(St, Zt);
      else if (ui.mode < 2 && hs && !Ve.has("noleaf")) {
        Os.length = 0;
        let Ae = Ne.position;
        for (let Us of re.near(Ae.x, Ae.z, 9)) {
          let Ks = Us.prop;
          if (!Ks || Us.dead || (Ks.kind !== "tree" && Ks.kind !== "palm"))
            continue;
          let Oi = hs.treeK(Ks);
          Oi && Os.push(Jtt(Oi, Ks.x, Ks.y, Ks.z, null, Ks.scale || 1));
        }
        for (let Us of hs.debris)
          !Us.K?.wood ||
            Us.K.pts?.length !== 6 ||
            Math.abs(Us.x.x - Ae.x) > 20 ||
            Math.abs(Us.x.z - Ae.z) > 20 ||
            (O0.set(0, (Us.K.pts[2][1] - Us.K.com) * Us.s.y, 0)
              .applyQuaternion(Us.q)
              .add(Us.x),
            Os.push([
              O0.x,
              O0.y,
              O0.z,
              Math.max(Math.abs(Us.K.pts[2][0]), Us.K.pts[1][1] * 0.12) *
                Us.s.y,
            ]));
        E1.update(Ne, ui._l || Zt.pos, Os, St);
      } else
        (document.body.classList.contains("play") || Zn) &&
          !Ve.has("novibe") &&
          ((Gh.on = pl.vibe !== "off"),
          Gh.apply(
            Ne,
            St,
            Zt,
            it ? it.layout.surfaceAt(Zt.pos.x, Zt.pos.z) : "road",
            ui.mode >= 2,
          ));
      if ((U9?.update(Ne), I1)) {
        for (let Ae of I1.items) I1.show(Ae, !Un?.active);
        I1.update(Ne);
      }
      if (
        (b3.update(St, Vr || { events: [], live: null }, La),
        b3.rewind(Ue, D9.seconds),
        pH.update(
          St,
          x3,
          C1(),
          !!(vt && Sr && vt.ride?.style === "street" && vt.state === "ride"),
        ),
        hat.update(St, Zt),
        V9?.update(St, Ne),
        a8.update(St, Zt, re.hits, fs.lastDevice === "pad" && Ee && !Hn.paused),
        !document.body.classList.contains("play") && !Zn)
      ) {
        Z9 += St;
        let Ae = Et.fleet?.orbit || { R: 6.4, h: 1.5, look: 0.55 },
          Us = 2.2 + Z9 * 0.13,
          Ks = Qo?.isOpen ? 1 : 0,
          Oi = Ae.R * (1 + 0.5 * Ks),
          ta = Ae.look - 1.9 * Ks;
        (Ne.position.set(
          Zt.pos.x + Math.sin(Us) * Oi,
          Zt.pos.y + Ae.h + 1.1 * Ks + 0.4 * Math.sin(Z9 * 0.21),
          Zt.pos.z + Math.cos(Us) * Oi,
        ),
          Ne.lookAt(Zt.pos.x, Zt.pos.y + ta, Zt.pos.z));
        let fo = 42 + 26 * Math.max(0, Math.min(1, (1.1 - Ne.aspect) / 0.6));
        Ne.fov !== fo && ((Ne.fov = fo), Ne.updateProjectionMatrix());
      }
      if (
        (Pi?.isOpen && Pi.view(St, Ne),
        Oe.update(St, Zt, Et, ca[_t].sunI / 3, re.hits, Ne, ca[_t].wet || 0),
        Ke.update(St, Zt, Et, {
          lit: ca[_t].sunI / 3,
          audio: Ts,
          metric: !La,
          on: document.body.classList.contains("play") || Zn,
        }),
        !Rs &&
          !Ve.has("nodebris") &&
          (Rs = window.__sf.debris =
            new D_(Yt, {
              ground: (Ae, Us, Ks) =>
                it ? it.layout.driveHeight(Ae, Us, null, Ks) : Wi(Ae, Us),
              paint: () => (xs !== Et && ((xs = Et), (Qs = qs(Et))), Qs),
            })),
        Rs?.update(St, re.hits, Zt),
        !Ps &&
          !Ve.has("nodamage") &&
          (Ps = window.__sf.dents =
            new $_({
              prep: !bn,
              scene: Yt,
              panels: Ve.has("panels"),
              ground: (Ae, Us, Ks) =>
                it ? it.layout.driveHeight(Ae, Us, null, Ks) : Wi(Ae, Us),
            })),
        Ps?.update(re.hits, Zt, Et, St),
        Ps?.wheelOff && !di.on && !De.on)
      ) {
        let Ae = performance.now() - Ps.wheelOff;
        (Ae > 1500 &&
          !Ps.wheelSaid &&
          ((Ps.wheelSaid = !0),
          qn("Wheel lost", "R to repair", "", { key: "wheel" })),
          Ae > 1e4 && (Ps.wheelsBack(), (Ps.wheelSaid = !1)));
      }
      (hs.update(St, Zt, ca[_t].sunI / 3),
        (z.shadowEpoch =
          (z.shadowEpoch | 0) +
          ((!z.smMove && Se.cars.length) || hs.live || re.parked.awake.length
            ? 1
            : 0)));
      let fn = Gt.userData.step();
      (!fn && au.length && au[(qN = (qN + 1) % au.length)].userData.step(),
        !fn && !Vt?.userData.step() && Kt?.userData.step(),
        di.apply(Ne, Bt) || De.apply(Ne, Bt));
      let kn = window.__sf._fc || Dh;
      if (
        (kn
          ? (Ne.position.set(kn[0], kn[1], kn[2]),
            Ne.lookAt(kn[3], kn[4], kn[5]),
            kn[6] &&
              Ne.fov !== kn[6] &&
              ((Ne.fov = kn[6]), Ne.updateProjectionMatrix()))
          : Dh &&
            (Ne.position.set(Dh[0], Dh[1], Dh[2]),
            Ne.lookAt(Dh[3], Dh[4], Dh[5]),
            Dh[6] && ((Ne.fov = Dh[6]), Ne.updateProjectionMatrix())),
        (J9 -= St) < 0)
      ) {
        ((J9 = 0.4),
          Gt.userData.cull(
            Ne.position.x,
            Ne.position.z,
            B === "safe" ? 130 : B === "mobile" ? 160 : 420,
            Ne.position.y,
          ),
          ds?.update(
            Ne.position.x,
            Ne.position.z,
            Qn?.remotes
              ? [...Qn.remotes.values()]
                  .filter((Ae) => Ae.T)
                  .map((Ae) => [Ae.T.x, Ae.T.z])
              : null,
          ));
        for (let Ae of au)
          Ae.userData.cull(
            Ne.position.x,
            Ne.position.z,
            B === "safe" ? 130 : B === "mobile" ? 160 : 420,
            Ne.position.y,
          );
        if (it && bn)
          for (let [Ae, Us] of Object.entries(z0)) {
            let Ks = Us.bounds;
            !Q2.has(Ae) &&
              Math.hypot(
                Math.max(0, Ks.x0 - Ne.position.x, Ne.position.x - Ks.x1),
                Math.max(0, Ks.z0 - Ne.position.z, Ne.position.z - Ks.z1),
              ) < 2500 &&
              q4(Ae);
          }
        (Vt?.userData.cull(Ne.position.x, Ne.position.z, 420, Ne.position.y),
          Kt?.userData.cull(Ne.position.x, Ne.position.z, 300, Ne.position.y),
          Pt?.userData.cull(Ne.position.x, Ne.position.z));
        for (let Ae of jt) Ae.userData.cull(Ne.position.x, Ne.position.z);
        (ce?.update(Ne.position.x, Ne.position.z), Ld(), (fn = !0));
      }
      Xe?.update(Ne.position.x, Ne.position.z);
      {
        let Ae = ca[_t].night > 0.3 || !!ca[_t].wet;
        xd(Et, {
          tail: Zt.brake > 0.1 ? (Ae ? 1.6 : 1) : Ae ? 1 : 0.7,
          head: Ae ? 1 : 0,
          signal: 0,
        });
      }
      (Mt &&
        z._so?.params &&
        !z._so.params.__sf &&
        (xt(z._so, Mt), (z._so.params.__sf = 1)),
        wt &&
          z._so?.isReady &&
          !z._so.shore &&
          (z._so.setShore(wt), bn && (wt.data = null)));
      {
        let Ae = !bn && On("distant") && Ne.position.z < -2600 ? 15e3 : 9e3;
        Ne.far !== Ae &&
          ((Ne.far = Ae),
          Ne.updateProjectionMatrix(),
          Wn.scale.set(Ae / 9e3, 1, Ae / 9e3));
        let Us = Yt.fog,
          Ks = Us?.d0;
        if (Ks && !bn) {
          let Oi =
            Ks < 0.001 && On("distant")
              ? Math.min(1, Math.max(0, (-Ne.position.z - 2e3) / 1500))
              : 0;
          Us.density = Ks * (1 - 0.72 * Oi);
        }
      }
      (Wn.position.set(Ne.position.x, 0, Ne.position.z),
        Wn.updateMatrixWorld(),
        fi(),
        I0(St),
        it &&
          it.update(Ne.position.x, Ne.position.z, St, Qt ? 14 : fn ? 0.5 : 2.5),
        Fe?.update(Se.t, St, Ne.position.x, Ne.position.z),
        JW(Zt));
      for (let Ae of w4) Ae.update(St, Ne);
      {
        let Ae = vP.cars;
        if (((Ae.length = 0), Qn && Qn.peopleCars(Ae), Un?.S?.bots))
          for (let Us of Un.S.bots) {
            let Ks = Us.T;
            if (!Ks || !Us.col) continue;
            let Oi = -Math.sin(Ks.heading),
              ta = -Math.cos(Ks.heading),
              fo = Ks.wreck?.vx ?? Oi * Ks.v,
              qr = Ks.wreck?.vz ?? ta * Ks.v;
            Ae.push({
              x: Ks.x,
              z: Ks.z,
              fx: Oi,
              fz: ta,
              hl: Ks.V.L / 2,
              hw: Ks.V.bw / 2,
              vx: fo,
              vz: qr,
              sp: Math.hypot(fo, qr),
              player: !1,
              remote: "bot",
            });
          }
      }
      if (Se.roads) {
        let Ae = !!(Qn?.ch && Qn.offC !== null);
        ((Se.roads.tOff = Ae ? (performance.now() - Qn.offC) / 1e3 - Se.t : 0),
          (Se.roads.synced = Ae || !!Qn?.ch));
      }
      te &&
        Qn &&
        (te.sync =
          Qn.ch && Qn.offC !== null
            ? te.sync?.seed === Qn.roomSeed()
              ? te.sync
              : { seed: Qn.roomSeed(), now: () => performance.now() - Qn.offC }
            : null);
      let Cn = di.on ? di.asCar() : Zt;
      (te?.update(St, Cn, Ne, Se.t, Se),
        kd().update(St, Cn, Ne, Se),
        tl.update(St, Zt, Ne),
        vp.update(St, Ne),
        Se.yieldTo || (Se.yieldTo = (Ae) => Fl.yieldTo(Ae)),
        Fl.update(St, Ne, Se));
      {
        let Ae = pl.blur === "forza",
          Us = Math.max(
            0,
            Math.min(1, (Zt.kmh - (Ae ? 80 : 130)) / (Ae ? 170 : 200)),
          );
        ((z.motionBlur = 0),
          (z.radialBlur =
            R > 0
              ? Ae
                ? 0.1 * Math.pow(Us, 1.25) +
                  (Zt.nitroOn ? 0.02 : 0) * Math.min(1, Zt.kmh / 100)
                : 0.05 * Math.pow(Us, 1.6) +
                  (Zt.nitroOn ? 0.01 : 0) * Math.min(1, Zt.kmh / 120)
              : 0));
      }
      (z.render(Yt, Ne),
        Ts && Qn && Ts.remotes(qot(), Zt.vel.x, Zt.vel.z),
        Ts &&
          Ts.update(Zt, {
            dt: St,
            camera: Ne,
            inside: ui.mode >= 2,
            world: re,
            hits: re.hits,
            jets: hs.jets,
            traffic: Se,
            police: ki,
            wet: ca[_t].wet || 0,
            waterAt: Vi,
            pier39: tl,
            ...yt,
          }),
        Uot(St));
      {
        let Ae = performance.now();
        (B0 === null && (B0 = Ae),
          (Po = (Ae - B0) / 1e3 - T1),
          Po > 0 && Vh++,
          CH.tick(Ae));
      }
      if (CH.benching || f8)
        ((B0 = performance.now()), (T1 = f8 ? 1 : 0), (Vh = 0));
      else if (
        !globalThis.SF_IOS &&
        !f8 &&
        Po > (B === "desktop" ? 1 : 1.5) &&
        E !== "ultra" &&
        !Ve.has("res") &&
        !Ve.has("size")
      ) {
        let Ae = Po / Math.max(1, Vh),
          Us = H,
          Ks = (globalThis.SF_FPS | 0) > 0 ? 1 / globalThis.SF_FPS : 0,
          Oi = Math.max(1 / 42, Ks * 1.2),
          ta = z.info.gpuTimeMs || 0,
          fo = ta > 0 && ta < Ae * 500,
          qr = B === "desktop" && ta > 0.85 * 1e3 * (Ks || 1 / 60);
        if (
          (($l = (Ae > Oi && !fo) || qr ? $l + (Ae > Oi * 2 ? 2 : 1) : 0),
          (N0 =
            Ae < Math.max(1 / 58, Ks * 1.05) &&
            ta < Math.max(9, 620 * (Ks || 1 / 60))
              ? N0 + 1
              : 0),
          B !== "desktop" && (z.info.gpuTimeMs || 0) > 0)
        ) {
          let p0 = z.info.gpuTimeMs * 1.15,
            Q9 = 0.4 * 1e3 * (Ks || 1 / 60);
          (p0 > Q9 || Ae > Math.max(1 / 28, Ks * 1.25)
            ? (H = Math.max(
                Math.min(C, 0.2 * L),
                H * (p0 > Q9 * 1.5 ? 0.8 : 0.9),
              ))
            : p0 < Q9 * 0.6 &&
              Ae < Math.max(1 / 58, Ks * 1.05) &&
              (H = Math.min(C, H * 1.08)),
            ($l = N0 = 0));
        } else
          $l >= 2
            ? (E !== "perf" && rg < 2
                ? PH(rg + 1)
                : (H = Math.max(
                    AH(),
                    H * Math.max(0.6, Math.min(0.9, Math.sqrt(Oi / Ae) * 1.05)),
                  )),
              ($l = 0))
            : N0 >= 4 && H < C - 0.01
              ? ((H = Math.min(C, H * 1.1)), (N0 = 0))
              : N0 >= 8 && rg > 0 && (PH(rg - 1), (N0 = 0));
        (Math.abs(H - Us) > 0.01 && Si(),
          (B0 = performance.now()),
          (T1 = 0),
          (Vh = 0));
      }
      (Dr.frame(
        Bt,
        document.body.classList.contains("play") && !Qt && !Ga.on,
        Zt.kmh,
        () => ({
          kmh: Zt.kmh,
          police:
            ki && D0
              ? {
                  pursuit: ki.pursuit,
                  level: ki.level,
                  reason: ki.reason,
                  escapes: ki.escapes,
                  busts: ki.busts,
                  pops: ki.stats?.pops || 0,
                  blockHits: ki.stats?.blockHits || 0,
                }
              : null,
          tyres: !!ki?.tyres?.n,
          wreckN: di.n,
          handed: di.handed || 0,
          wheelOff: !!Ps?.woff?.size,
          car: $n ? Dn : _t,
          quality: E,
          tier: B,
          assist: Mn.mode,
          traffic: H0,
          rewind: !!D9.on,
        }),
      ),
        K9++,
        (h8 += St),
        h8 > 0.5 &&
          ((Ns("fps").textContent =
            `${(K9 / h8).toFixed(0)} fps \xB7 ${(z.info.gpuTimeMs || 0).toFixed(1)} ms`),
          (K9 = 0),
          (h8 = 0)));
    };
  if (!navigator.gpu)
    throw new Error("This needs WebGPU (Chrome, Edge, or Safari 26+).");
  let o = globalThis.SF_WORKERS || {};
  globalThis.MB_LOD_WORKER = Pu("lod");
  let t = XG(
      Pu("img"),
      bn
        ? 2
        : Math.max(2, Math.min(8, (navigator.hardwareConcurrency || 4) - 2)),
      o.img,
    ),
    e = Ve.has("nosky") || su,
    s = !e && (globalThis.SF_DIST || Ve.has("latesky")) && !Ve.has("nolatesky");
  if (!Uh)
    for (let Y of [
      "terrain.bin",
      "roads.bin",
      "buildings.bin",
      "props.bin",
      "coast.bin",
      "ground.bin",
      "green.bin",
      "btags.bin",
      ...(e || s ? [] : ["sky.bin"]),
    ])
      I5("assets/real/" + Y, "high");
  let n = [],
    i = Uh
      ? null
      : zC((Y) => {
          let ct = bo(Y);
          return (n.push(ct), ct);
        }),
    a = i ? Promise.all(n) : null;
  (i?.catch(() => {}), a?.catch(() => {}));
  let r = (globalThis.SF_DIST || Ve.has("hold")) && !Ve.has("nohold") && i;
  r && p7(/\/sky\.bin$/, a);
  let l = s ? bo("assets/real/sky.bin") : null;
  l?.catch(() => {});
  let c = r ? (l ? Promise.all([i, l.catch(() => {})]) : i) : null;
  (r &&
    p7(
      /assets\/(cars|waymo|cybercab|car|corvette|cybertruck|roadster|missions)\//,
      c,
    ),
    r &&
      !Ve.has("nogate") &&
      (globalThis.SF_DIST || Ve.has("texdefer")) &&
      !Ve.has("notexdefer") &&
      tV(c));
  let h =
      FN +
      (bn || Ve.has("lite") || (globalThis.SF_Q !== "ultra" && !Ve.has("subd"))
        ? "scene_plain.glb"
        : "scene_subd.glb"),
    f = h.replace("scene_", "ao_").replace(".glb", ".bin");
  if (!$n) (I5(h), I5(f));
  else {
    let Y = us[Dn];
    I5(Y.dir + Y.glb, "high");
    for (let ct of Y.tex) ap(Y.dir + ct + ".webp").catch(() => {});
  }
  let u = o.car || null;
  if ($n) (u?.terminate?.(), (u = null));
  else if (!u)
    try {
      u = new Worker(Pu("car"), { type: "module" });
    } catch {}
  let d = $n ? Promise.resolve() : xb(u),
    p = (Y) => sc(Y, { read: (ct) => ct.json() }),
    m = p($n ? us[Dn].dir + us[Dn].meta : FN + "scene.json"),
    g = $n
      ? Promise.resolve(null)
      : new ko().loadAsync(FN + "tire.webp").catch(() => null);
  m.catch(() => {});
  let b = Ve.has("proc")
    ? Promise.resolve(null)
    : fetch("assets/tex/tex.json", { priority: "high" })
        .then((Y) => (Y.ok ? Y.json() : null))
        .catch(() => null);
  b.then((Y) => {
    if (!Y) return;
    let ct = bn ? "_lo" : "";
    for (let gt of [
      ...Object.keys(Y.fronts).flatMap((St) => [
        "fronts_" + St + ct,
        "fronts_" + St + "_mask",
      ]),
      "office" + ct,
      "office_mask",
      "stucco",
      "brick",
      "siding",
      "concrete",
      "roof",
      "sidewalk_c",
      "asphalt_hd" + ct,
      "asphalt_hd_n",
      "asphalt_old" + ct,
      "decals",
      "decals_n",
      ...(Uh ? [] : ["ground_a", "ground_b", "ground_a_n", "ground_b_n"]),
      "leaves",
      "furniture",
      "foliage",
      "bark",
      "twigs",
      "palms",
      "shrubs",
      ...(o3 && !i0() ? ["peds"] : []),
      ...(IN ? ["dress_signs", "dress_grate", "dress_rail"] : []),
      ...["bark_cyp", "bark_euc", "bark_palm", "bark_head", "bark_fan"].flatMap(
        (St) => [St, St + "_n"],
      ),
    ])
      ap(`assets/tex/${gt}.webp`).catch(() => {});
  });
  let v = (globalThis.SF_DIST || Ve.has("texdefer")) && !Ve.has("notexdefer"),
    x = /\/assets\/tex\/.*\.webp/;
  if (
    (v && JG((Y) => x.test(Y) && !/\.lq\.webp/.test(Y)),
    !Uh && !Ve.has("nolm") && On("landmarks"))
  )
    for (let Y of [
      "lombard_gg/ground",
      "lombard_gg/ground_n",
      "lombard_gg/wall",
      "lombard_gg/wall_n",
      "lombard_gg/foliage",
      "lombard_gg/elev",
      "skyline/tiles",
      "skyline/elev",
      "waterfront/facades",
      "waterfront/facades_mask",
      "waterfront/tiles",
    ])
      ap(`assets/tex/lm/${Y}.webp`).catch(() => {});
  let y = Ve.get("time") && ca[Ve.get("time")] ? Ve.get("time") : "noon";
  (Rot(o.sky), Aot(H4(ca[y]), bn ? 512 : 1024, Pu("sky")));
  let M =
      bn || su || Uh || Ve.has("nohero")
        ? Promise.resolve(null)
        : bo("assets/veg/trees.bin")
            .then((Y) => iQ(Y))
            .catch((Y) => (console.warn("trees.bin:", Y), null)),
    S =
      !bn &&
      (globalThis.SF_DIST || Ve.has("latecars")) &&
      !Ve.has("nolatecars"),
    w = Ve.has("proccars") ? Promise.resolve(null) : DZ(void 0, { late: S });
  if ((z1("Starting the renderer", 0.05), globalThis.SF_NOMEM)) {
    let Y = Ns("nogpu");
    ((Y.querySelector("h2").textContent = "Not enough memory on this phone"),
      (Y.querySelector("p").textContent =
        "The last two starts ran out of memory while loading, even at the lightest graphics. Close other apps and Safari tabs, then try again - or play on a computer."),
      (Y.querySelector("small").textContent = ""),
      (Y.querySelector("button").textContent = "Try again"),
      (Y.querySelector("button").onclick = () => {
        try {
          localStorage.removeItem("sf-drive.nomem");
        } catch {}
        location.reload();
      }),
      _9(),
      await new Promise(() => {}));
  }
  if (globalThis.SF_TIER_NOTE) {
    let Y = Ns("tierNote");
    (Y && (Y.textContent = globalThis.SF_TIER_NOTE),
      console.warn("tier:", globalThis.SF_TIER_NOTE));
  }
  let _ = Ns("c"),
    z = new tk({
      canvas: _,
      powerPreference: "high-performance",
      antialias: "fxaa",
      f16: Ve.get("f16") !== "0",
      depthPrepass: !0,
      planarMips: bn ? 5 : 99,
      bloomLevels: bn ? 4 : 6,
      cullBackFaces: !0,
    });
  Ve.has("nofull") && (z.fullMaterials = !1);
  let A = "sf-drive.compat",
    T = null;
  try {
    T = JSON.parse(localStorage.getItem(A) || "null");
  } catch {}
  if (
    T &&
    /unresolved value 'NaN'/.test(T.why) &&
    /transpose\(cofactor\(m\)\)/.test(T.why)
  ) {
    T = null;
    try {
      localStorage.removeItem(A);
    } catch {}
  }
  (T &&
    Date.now() - T.t < 7 * 864e5 &&
    !Ve.has("full") &&
    ((z.fullMaterials = !1),
    console.warn("gpu: the compact material path (" + T.why + ")")),
    await z.init());
  {
    let Y = 0,
      ct = performance.now();
    z.device.addEventListener?.("uncapturederror", (gt) => {
      let St = String(gt.error?.message || gt.error);
      if ((Y++ < 5 && console.error("WebGPU:", St), Iu(gt.error))) {
        _1(gt.error);
        return;
      }
      if (z.fullMat && performance.now() - ct < 6e4 && !Ve.has("full") && !Zn)
        try {
          localStorage.setItem(
            A,
            JSON.stringify({ t: Date.now(), why: St.slice(0, 160) }),
          );
        } catch {}
    });
  }
  {
    let Y = z.adapterInfo || {},
      ct = [Y.vendor, Y.architecture, Y.description, Y.device].join(" ");
    globalThis.SF_TIER === "desktop" &&
      !globalThis.SF_TIER_FORCED &&
      !(navigator.deviceMemory >= 8) &&
      (/qualcomm|adreno|\barm\b|mali|imagination|powervr|samsung|xclipse|mediatek/i.test(
        ct,
      ) ||
        (/apple/i.test(ct) && navigator.maxTouchPoints > 1)) &&
      (console.warn("tier: a mobile GPU (" + ct.trim() + "): the mobile tier"),
      globalThis.SF_BOOT?.lower("mobile"),
      location.reload(),
      await new Promise(() => {}));
  }
  (z.device.lost?.then((Y) => {
    Y.reason !== "destroyed" &&
      _1(new Error("GPU device lost: " + (Y.message || Y.reason)));
  }),
    bn &&
      ((z.maxTextureSize = globalThis.SF_TEXMAX || 1024),
      (z.dropCpuGeometry = !0),
      (z.reflectionLod = !1),
      (z.onTextureUploaded = jG)),
    (L5.arrived = (Y) => {
      try {
        z._texture(Y);
      } catch {}
    }),
    z.compileAsync(new q0()).catch((Y) => console.warn("compile", Y)),
    (z.toneMapping = sb),
    (z.viewShadows = !0),
    (z.noProbeBox = !0),
    (z.bloom = 0.075),
    (z.vignette = 0.28),
    (z.gi = Ve.has("gi")));
  let E = globalThis.SF_Q || "high";
  ((z.ssrDistance = 90),
    (z.ssrThickness = 1.2),
    E === "ultra" ? (z.ssrDistance = 160) : E === "perf" && (z.ssr = !1),
    (z.aoRadius = 1.6),
    (z.aoIntensity = 0.85),
    Ve.has("nossr") && (z.ssr = !1),
    Ve.has("noao") && (z.ao = !1),
    Ve.has("notaa") && (z.taa = !1));
  let R = Ve.has("nomb") ? 0 : 0.35;
  ((z.motionBlur = 0),
    (z.motionBlurMax = 0.014),
    (z.grade = D5({
      saturation: 0.18,
      contrast: 0.16,
      warmth: 0.02,
      lift: -0.005,
    })));
  let P = Ve.has("oldlow");
  globalThis.SF_OLDLOW = P;
  let C = 1,
    I = (Y) => {
      ((z.depthPrepass = !Y),
        (z.ao = Y || Ve.has("noao") ? !1 : void 0),
        (z.taa = Y || Ve.has("notaa") ? !1 : void 0),
        (z.nearShadow = Y ? !1 : void 0),
        (z.sunCacheMs = Y ? 500 : 0),
        (z.planarEnabled = Y ? !1 : void 0),
        (z.specularAA = Y && !P ? 2 : void 0),
        (z.upscale =
          Y && !P ? Math.min(window.devicePixelRatio || 1, 2, 2.5 * C) : 0));
    },
    L = window.devicePixelRatio || 1,
    F = (Y, ct) =>
      Math.min(
        L,
        Y === "safe"
          ? Math.min(P ? 0.6 : 0.58, Math.max(0.2 * L, P ? 0 : 0.4))
          : Y === "mobile"
            ? Math.min(P ? 1.25 : 1.2, Math.max(0.42 * L, P ? 0 : 0.5))
            : ct === "ultra"
              ? 2
              : ct === "perf"
                ? 1
                : 1.75,
      ) * +(Ve.get("res") || 1),
    O = (Y, ct, gt) =>
      Ve.has("res") || ct === "ultra" || (Y === "desktop" && ct === "high")
        ? gt
        : Y === "mobile"
          ? Math.min(gt, Math.max(0.33 * L, P ? 0 : 0.5))
          : Math.min(gt, ct === "perf" ? 0.85 : 1.25);
  C = F(globalThis.SF_TIER, E);
  let B = globalThis.SF_TIER;
  I(bn);
  let H = O(B, E, C);
  z1("Loading " + bi.name, 0.18, 1.2);
  let N = !1,
    D,
    U = new Promise((Y) => (D = Y));
  $n && D();
  let G = {},
    W = new Map(),
    V = (Y) => {
      if (!bn) return;
      let ct = new Set();
      Y.root.traverse((gt) => {
        gt.geometry && ct.add(gt.geometry);
      });
      for (let [gt, St] of W)
        if (St.car !== Y) {
          (G[gt] === St.promise && delete G[gt], W.delete(gt));
          for (let Bt of St.geometry) ct.has(Bt) || Bt.dispose();
        }
    },
    $ = async (Y) => {
      for (let ct = 0; ct < 3; ct++) {
        try {
          let gt = await fetch(iB(Y));
          if (gt.ok) return new Uint8Array(await gt.arrayBuffer());
          let St =
            "custom car " +
            Y.name +
            ": its model did not load (HTTP " +
            gt.status +
            ") - a stand-in body";
          if (
            (console.warn(St),
            (window.__sf.wrapLog ||= []).push({
              t: Math.round(performance.now()),
              msg: St,
            }),
            gt.status < 500)
          )
            return null;
        } catch (gt) {
          console.warn("custom car", gt);
        }
        await new Promise((gt) => setTimeout(gt, ct ? 3e3 : 1e3));
      }
      return null;
    },
    J = async (Y) => {
      let ct = await Ust(await $(Y), Y);
      return (
        (ct.fleet = VE(Y, null)),
        (ct.id = "custom"),
        (ct.rideSha = Y.sha),
        ct
      );
    },
    X = (Y, ct = !1) => {
      let gt = Y === "custom" ? "custom:" + us.custom?.ride?.sha : Y;
      if (G[gt]) return G[gt];
      let St = (G[gt] = (async () => {
        let Bt = us[Y],
          Qt = async (ws) => {
            let fn = new q0();
            fn.add(ws.root);
            let kn = z.compileAsync(fn).catch((Cn) => {
              if ((console.warn("compile", Cn), Iu(Cn) && (_1(Cn), ct)))
                throw Cn;
            });
            ct && (await kn);
          };
        if (Bt.item) {
          let ws = await J(Bt.ride);
          return ((ws.fleet = Bt), await Qt(ws), ws);
        }
        let [Ie, Ee] = await Promise.all([
            bo(Bt.dir + Bt.glb).then((ws) => ((N = !0), ws)),
            Y === Dn ? m : p(Bt.dir + Bt.meta),
          ]),
          Ue = await Bt.load(Ie, Ee);
        return ((Ue.fleet = Bt), (Ue.id = Y), await Qt(Ue), Ue);
      })());
      return (
        St.then(
          (Bt) => {
            let Qt = new Set();
            (Bt.root.traverse((Ie) => {
              Ie.geometry && Qt.add(Ie.geometry);
            }),
              W.set(gt, { car: Bt, promise: St, geometry: Qt }));
          },
          () => {},
        ),
        St.catch(() => {
          G[gt] === St && delete G[gt];
        }),
        St.catch((Bt) => {
          Iu(Bt) && _1(Bt);
        }),
        St
      );
    },
    tt = async (Y, ct) => {
      let gt = Y === "custom" ? ME(ct) : null;
      Y === "custom" && !gt && (Y = "waymo");
      let St = us[Y] || us.waymo,
        Bt = gt
          ? await J(gt)
          : await (async () => {
              let [Qt, Ie] = await Promise.all([
                  bo(St.dir + St.glb),
                  p(St.dir + St.meta),
                ]),
                Ee = await St.load(Qt, Ie);
              return ((Ee.fleet = St), (Ee.id = Y), Ee);
            })();
      if (
        (Bt.root.traverse((Qt) => {
          Qt.isMesh && (Qt.userData.mbMover = !0);
        }),
        it && Bt.materials)
      )
        for (let Qt of Object.values(Bt.materials))
          Qt.userData.mbSkyVis === void 0 && (Qt.userData.mbSkyVis = 2);
      {
        let Qt = new q0();
        (Qt.add(Bt.root),
          await z.compileAsync(Qt).catch((Ie) => console.warn("compile", Ie)),
          Qt.remove(Bt.root));
      }
      return (bn && setTimeout(() => z.dropCpu(Bt.root), 1500), Bt);
    },
    Z = $n
      ? X(Dn)
      : (async () => {
          let [Y, ct, gt, St] = await Promise.all([
              bo(h).then((Qt) => ((N = !0), Qt)),
              m,
              g,
              bo(f).catch((Qt) => (console.warn("car AO:", Qt), null)),
            ]),
            Bt = await vE(Y, ct, gt, u || Pu("car"), D, St);
          {
            let Qt = new q0();
            (Qt.add(Bt.root),
              z.compileAsync(Qt).catch((Ie) => console.warn("compile", Ie)));
          }
          return Bt;
        })();
  await new Promise((Y) => setTimeout(Y, 0));
  let q = WF(256, 33),
    j = (Y, ct, gt = {}) => {
      let St = new me({
        color: 16777215,
        roughness: 0.9,
        metalness: 0,
        vertexColors: !0,
        map: ct,
        ...gt,
      });
      return ((St.userData.mbAlbedo = Y), St);
    },
    K = {
      road: j(xq, null),
      walk: j(vq, null),
      facade: j(yq, q),
      roof: j(wq, null),
    };
  K.facade.userData.mbVertexFallback = K.roof.userData.mbVertexFallback = !0;
  let nt = await b;
  if (nt) {
    let Y = bn ? "_lo" : "",
      ct = (Qt, Ie, Ee = !1) =>
        e0(`assets/tex/${Qt}.webp`, (Ue) => {
          ((Ue.colorSpace = Ee ? Nn : Je),
            (Ue.flipY = !1),
            (Ue.anisotropy = 8),
            (Ue.wrapS = Ue.wrapT = Ie ? oi : so));
        }),
      gt = Object.keys(nt.fronts),
      St = RP(IN ? nt : null);
    for (let Qt of gt)
      ((K["f_" + Qt] = j(St, ct("fronts_" + Qt + Y), { roughness: 0.8 })),
        (K["f_" + Qt].userData.mbExtraMap = ct(
          "fronts_" + Qt + "_mask",
          !1,
          !0,
        )));
    if (IN) {
      K.dress = j(Tq, ct("dress_signs"), { roughness: 0.7 });
      let Qt = (Ie) =>
        e0(`assets/tex/${Ie}.webp`, (Ee) => {
          ((Ee.colorSpace = Je),
            (Ee.flipY = !1),
            (Ee.wrapS = Ee.wrapT = oi),
            (Ee.minFilter = Ii),
            (Ee.generateMipmaps = !1));
        });
      ((K.spill = new Ys({
        color: 0,
        vertexColors: !0,
        transparent: !0,
        depthWrite: !1,
        blending: $o,
        fog: !1,
        visible: !1,
      })),
        (K.fe_grate = j(AP, Qt("dress_grate"), { alphaTest: 0.5 })),
        (K.fe_rail = j(AP, Qt("dress_rail"), { alphaTest: 0.5 })));
    }
    ((K.office = j(kq, ct("office" + Y))),
      (K.office.userData.mbExtraMap = ct("office_mask", !1, !0)));
    for (let [Qt, Ie] of [
      ["w_stucco", "stucco"],
      ["w_brick", "brick"],
      ["w_siding", "siding"],
      ["w_concrete", "concrete"],
      ["roofT", "roof"],
    ])
      K[Qt] = j(Qt === "roofT" ? _q : zq, ct(Ie, 1));
    let Bt = K.road;
    ((Bt.map = ct("asphalt_hd" + Y, 1)),
      Object.assign(Bt.userData, {
        mbExtraMap: ct("asphalt_hd_n", 1, !0),
        mbMap8: ct("asphalt_old" + Y, 1),
        mbMap1: ct("decals"),
        mbMap3: ct("decals_n", !1, !0),
      }),
      (K.walk.map = ct("sidewalk_c", 1)));
  }
  if (
    (K.road.map || (K.road.map = AQ(512)),
    K.walk.map || (K.walk.map = WF(512, 21)),
    (K.terrain = j(Eq, K.walk.map)),
    (K.distant = K.terrain),
    !Uh)
  ) {
    let Y = (ct, gt) => {
      let St = j(ct.userData.mbAlbedo, ct.map);
      return ((St.userData = { ...ct.userData, mbSkyVis: gt }), St);
    };
    ((K.roadDeck = Y(K.road, 0)),
      (K.walkDeck = Y(K.walk, 1)),
      (K.roadTun = Y(K.road, 1)));
    for (let [ct, gt] of Object.entries(K))
      !gt.userData.mbSkyVis &&
        ct !== "roadDeck" &&
        ct !== "walkDeck" &&
        ct !== "roadTun" &&
        (gt.userData.mbSkyVis =
          ct === "road" || ct === "walk" || ct === "terrain" ? 2 : 1);
  }
  let Q =
      nt && !Uh
        ? await cQ({
            mats: K,
            mb: z,
            hook: j,
            code: qP(bn ? (su ? 900 : 1300) : 0),
            fetchBytes: bo,
            lazy: e0,
          }).catch((Y) => (console.warn("ground:", Y), null))
        : null,
    et = {};
  if (nt) {
    let Y = (ct, gt) =>
      e0(`assets/tex/${ct}.webp`, (St) => {
        ((St.colorSpace = Je),
          (St.flipY = !1),
          (St.userData.photo = !0),
          gt && (St.wrapS = St.wrapT = oi));
      });
    et = {
      leaves: Y("leaves"),
      furn: Y("furniture"),
      foliage: Y("foliage"),
      bark: Y("bark", !0),
      soil: K.terrain.userData.mbMap1 ? K.terrain.map : null,
      ...(await JZ("assets/tex/", e0)),
    };
  }
  let st = sQ(et);
  (z.prewarm(Object.values(st)),
    w
      .then((Y) => Y && z.prewarm(Object.values(Y).map((ct) => ct.mat)))
      .catch(() => {}));
  let ot = performance.now(),
    rt = Ve.get("at") ? Ve.get("at").split(",").map(Number) : null,
    lt = null,
    ht = null,
    pt,
    ut = null,
    it = null,
    at = null,
    yt = {};
  if (Uh) {
    let Y =
      Ve.has("noosm") || !nt
        ? null
        : await fetch("assets/osm/downtown.json")
            .then((ct) => (ct.ok ? ct.json() : null))
            .catch(() => null);
    ((pt = UJ({ mats: K, tex: nt, osm: Y })),
      (ut = yW({ mats: K })),
      pt.colliders.push(...ut.colliders),
      pt.inst.push(...ut.inst),
      (pt.osm = Y));
  } else {
    let Y = await i,
      ct = null,
      gt = e
        ? null
        : s
          ? {}
          : await bo("assets/real/sky.bin")
              .then((Ue) => A7(_a(Ue)))
              .catch((Ue) => (console.warn("sky.bin:", Ue), null));
    (s &&
      (ct = ht =
        l
          .then((Ue) => {
            Object.assign(gt, A7(_a(Ue)));
          })
          .catch((Ue) => console.warn("sky.bin:", Ue))),
      gt &&
        (gt.field ? z.setSkyField(P7(gt)) : (lt = gt),
        (z.skyVis = {
          strength: +(Ve.get("skyk") ?? 1),
          contrast: +(Ve.get("skyc") ?? 1),
          car: 0.6,
          debug: +(Ve.get("skydbg") ?? 0),
        })),
      nt && (nt.btags = await bo("assets/real/btags.bin").catch(() => null)));
    let St = JQ(Y);
    (JH(St), Fot());
    {
      let Ue = ZQ(Y);
      ((globalThis.MB_SEA_FNS = Ue.fns), (globalThis.MB_SEA_MASK = Ue.body));
    }
    let Bt = bi.content ? Ia("spawn", null) : null;
    at = rt
      ? [rt[0], rt[1], rt[2] || 0]
      : Bt
        ? Yp(Y, St, Bt.street || "", Bt.x, Bt.z, Bt.hx, Bt.hz, { plateau: !0 })
        : Zn
          ? Yp(Y, St, "California Street", -1371, 385, 1, -0.08, {
              plateau: !0,
            })
          : stt(Y, St);
    let Qt = (Ue) => 0.2 + 0.62 * Ue;
    (z1("Building " + bi.name, Qt(0.15), 0.8),
      await Lot(),
      await Promise.race([
        Promise.all([t, d, Tot()]),
        new Promise((Ue) => setTimeout(Ue, 500)),
      ]),
      N && (await Promise.race([U, Z])),
      z.prewarm(Object.values(K)));
    let Ie = "",
      Ee = (Ue, ws, fn, kn = Ue, Cn = 100) => (
        z1(ws, Qt(kn), Cn / 1e3),
        fn && ws !== Ie && ((Ie = ws), z.prewarm(fn)),
        new Promise((Ae) => setTimeout(Ae, 0))
      );
    (dj(bn ? 8 : 4),
      utt(Y),
      sO(Y),
      nO(Y, St),
      (pt = it =
        await QQ({
          D: Y,
          L: St,
          mats: K,
          tex: nt,
          spawn: at,
          mobile: bn,
          safe: su,
          ground: Q,
          upload: (Ue) => z.upload(Ue),
          sky: gt,
          skyReady: ct,
          billboards: !Ve.has("nobb") && !su,
          pause: Ee,
        })));
    {
      let Ue = dtt(Y, St);
      Ue && (it.group.add(Ue.group), it.colliders.push(...Ue.colliders));
    }
    yt = { tunnelAt: jV(Y), skyAt: gt ? (Ue, ws) => Eb(gt, Ue, ws) : null };
  }
  (z1("Placing the traffic", 0.9, 0.5),
    await new Promise((Y) => setTimeout(Y, 0)));
  let vt =
    $n && it
      ? new HM(it.data, it.layout, {
          seed: (Date.now() % 1e5) + 7,
          style: k4().rideStyle,
        })
      : null;
  vt &&
    console.log(
      `taxi: ${vt.spots.length} spots, ${WO(vt.spots, pt.inst, pt.colliders)} parked cars cleared from their loading zones`,
    );
  let At = await w;
  QZ(await M);
  let Ut = it
      ? (Y, ct, gt) => {
          let St = null;
          if (gt !== void 0)
            for (let Bt of it.layout.probe(Y, ct).all)
              (St === null || Math.abs(Bt.y - gt) < Math.abs(St - gt)) &&
                (St = Bt.y);
          return St !== null && Math.abs(St - gt) < 1
            ? St
            : it.layout.driveHeight(Y, ct, null, gt);
        }
      : void 0,
    Gt = ev(pt.inst, st, At, Ut);
  B !== "desktop" && Gt.userData.carTiers && (Gt.userData.carTiers[1] = 60);
  let Pt = null,
    Vt = null,
    Kt = null,
    ue = [],
    ne = null,
    jt = [];
  z.upload(Gt);
  {
    let Y = at || [he[7] + 25, pe[16] + 2.5];
    Gt.userData.refineBlobs(Y[0], Y[1], 450, 1 / 0);
  }
  let be = it ? new le() : WJ(K, pt.osm ? CJ(pt.osm) : null);
  (console.log(
    `city: ${pt.group.children.length} meshes, ${pt.inst.length} props, ${pt.colliders.length} colliders, ${(performance.now() - ot).toFixed(0)} ms`,
  ),
    vF(pt.inst, pt.colliders, !!At));
  let re = new cE(pt.colliders),
    ds =
      bn && At && (globalThis.SF_MP || Ve.has("mp"))
        ? (window.__sf.extraParked = new S_({ world: re, models: At, hf: Ut }))
        : null;
  (it &&
    (re.heightAt = (Y, ct, gt) => it.layout.driveHeight(Y, ct, gt, Zt.pos.y)),
    it && (re.speedCap = (Y, ct) => it.layout.zoneCap(Y, ct)),
    it?.data?.bld && (re.heights = () => Vm(it.data)));
  let Nt = null;
  if (it && !bi.content && !Ve.has("noloop")) {
    let gt = new R_({
      x: -3950,
      z: -1226,
      y: it.layout.driveHeight(-3950, -1226) + 0.06,
      psi: Math.PI / 2,
    });
    re.loops = [gt];
    let St = re.muAt.bind(re);
    ((re.muAt = (Bt, Qt) => (gt.onApron(Bt, Qt) ? 1 : St(Bt, Qt))),
      (Nt = window.__sf.loop = gt));
  }
  pt.lateColliders?.length &&
    pt.lateColliders.forEach((Y, ct) =>
      setTimeout(
        () => {
          for (let gt of Y()) re.index(gt);
        },
        2500 + 70 * ct,
      ),
    );
  let $e = new me({ color: 16711680, roughness: 0.3, vertexColors: !0 });
  $e.userData.mbAlbedo = pf;
  let ve = new me({
    color: 16777215,
    roughness: 0.45,
    metalness: 0.05,
    vertexColors: !0,
  });
  if (
    (it &&
      Gt.traverse((Y) => {
        Y.material?.userData &&
          /_lod\d$/.test(Y.material.name) &&
          Y.material.userData.mbSkyVis === void 0 &&
          (Y.material.userData.mbSkyVis = 2);
      }),
    it)
  )
    for (let Y of [
      ...Object.values(st),
      ...Object.values(At || {}).map((ct) => ct.mat),
      JI(),
      ve,
      $e,
    ])
      Y?.isMaterial &&
        Y.userData.mbSkyVis === void 0 &&
        (Y.userData.mbSkyVis = 2);
  let as = (Y) =>
      Ve.has("notraffic")
        ? 0
        : Ve.has("traffic")
          ? +Ve.get("traffic")
          : it
            ? Y === "safe"
              ? 12
              : Y === "mobile"
                ? 24
                : 66
            : Y === "desktop"
              ? 70
              : 24,
    Se = new fT(
      null,
      { car: st.car, tire: st.tire, tlamp: $e, cable: ve },
      {
        max: as(B),
        models: At,
        roads: it ? new uv(it.data, it.layout) : null,
        extra: $n && (globalThis.SF_MP || Ve.has("mp")) ? 48 : 0,
      },
    );
  ((Se.deferDraw = !0),
    (Se.cablePer = B === "desktop" ? 4 : 2),
    (re.onShove = (Y, ct, gt, St, Bt) =>
      Y.bot
        ? window.__sf.race?.shoved(Y.bot, ct, gt, St, Bt)
        : Y.remote
          ? window.__sf.mp?.hit(Y, ct, gt, St, Bt)
          : ((Se.byPlayer = !0),
            Se.shove(Y, ct, gt, St, Bt),
            (Se.byPlayer = !1))));
  let Fe = it ? oit(pt.inst, st, Se.roads) : null,
    xe = [];
  if (it) {
    let Y = it.landmarks.sites.find(
        (gt) => Math.abs(gt.x + 1236) < 2 && Math.abs(gt.z - 843) < 2,
      ),
      ct = null;
    if (
      (Y?.group.traverse((gt) => {
        gt.isMesh && !ct && (ct = gt);
      }),
      ct)
    ) {
      ct.updateMatrixWorld(!0);
      let gt = new xi().setFromObject(ct);
      xe.push({
        mesh: ct,
        x0: gt.min.x,
        z0: gt.min.z,
        x1: gt.max.x,
        z1: gt.max.z,
        cx: (gt.min.x + gt.max.x) / 2,
        cz: (gt.min.z + gt.max.z) / 2,
        want: bn ? 14 : 36,
      });
    }
  }
  let He =
      o3 &&
      !i0() &&
      e0("assets/tex/peds.webp", (Y) => {
        ((Y.colorSpace = Je), (Y.flipY = !1), (Y.anisotropy = 8));
      }),
    bt = it
      ? Ia("hotspots", [
          ["Ferry Building", -122.3935, 37.7955, 45, 34],
          ["Pier 39", -122.4098, 37.8087, 40, 26],
          ["Union Square", -122.4075, 37.788, 50, 24],
          ["Painted Ladies", -122.433, 37.7762, 35, 22],
          ["Golden Gate vista", -122.4752, 37.8077, 40, 24],
          ["Fisherman's Wharf", -122.4169, 37.8081, 45, 26],
          ["Lombard Street", -122.4187, 37.8021, 35, 22],
        ]).map(([Y, ct, gt, St, Bt]) => {
          let [Qt, Ie] = ji(ct, gt);
          return {
            name: Y,
            x: Qt,
            z: Ie,
            r: St,
            want: bn ? Math.round(Bt * 0.4) : Bt,
            stand: 0.45,
          };
        })
      : [];
  it &&
    Ci &&
    bt.push({
      name: "Car meet",
      x: Ci.x - 10,
      z: Ci.z + 40,
      r: 45,
      want: bn ? 10 : 26,
      stand: 0.7,
    });
  let te =
    it && o3
      ? rit(it.data, it.layout, {
          max: bn ? 50 : 180,
          roads: Se.roads,
          inst: pt.inst,
          plazas: xe,
          hotspots: bt,
          map: He,
          world: re,
        })
      : null;
  ((window.__sf.peds = te), z.prewarm(pt.group), z.prewarm(Gt));
  let ee = performance.now(),
    Yt = new q0();
  if ((ds && Yt.add(ds.group), Nt)) {
    let Y = Nt.build();
    (Yt.add(Y), z.upload?.(Y));
  }
  (Yt.add(pt.group, Gt, be),
    ut && Yt.add(ut.group),
    te && Yt.add(te.group),
    it && kd().attach({ scene: Yt, world: re, L: it.layout, peds: te }));
  let ce = null,
    Xe = null;
  Yt.matrixAutoUpdate = !1;
  for (let Y of [pt.group, Gt, be]) Pd(Y);
  (Yt.add(...Se.objects),
    (Se.crushed = Ve.has("nodamage")
      ? null
      : new K_(Yt, {
          max: bn ? 2 : 6,
          wheels: ro,
          ground: (Y, ct, gt) =>
            it ? it.layout.driveHeight(Y, ct, null, gt) : Wi(Y, ct),
        })));
  let Oe = new TT(Yt, { rain: bn ? 1600 : 4200, skids: bn ? 1600 : 3200 }),
    Ke = new PT(Yt, { mobile: bn }),
    qs = (Y) => {
      let ct = null,
        gt = -1;
      return (
        Y?.root?.traverse?.((St) => {
          for (let Bt of [].concat(St.material || [])) {
            let Qt = Bt?.color;
            if (!Qt) continue;
            let Ie = Math.max(Qt.r, Qt.g, Qt.b),
              Ee =
                Ie -
                Math.min(Qt.r, Qt.g, Qt.b) +
                (/paint|body/i.test(Bt.name || "") ? 1 : 0);
            Ee > gt && ((gt = Ee), (ct = [Qt.r, Qt.g, Qt.b]));
          }
        }),
        ct
      );
    },
    Rs = null,
    Ps = null,
    Qs = null,
    xs = null,
    an = document.createElement("div");
  ((an.style.cssText =
    "position:fixed;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:5;mix-blend-mode:screen"),
    document.body.appendChild(an));
  let De = (window.__sf.crashCam = new J_({ flash: an }));
  De.off = Ve.has("nocrashcam") || (Zn && !Ve.has("crashcam"));
  let Ds = performance.now();
  Se.onLaunch = (Y, ct) => {
    Se.byPlayer &&
      !di.on &&
      (document.body.classList.contains("play") || Zn) &&
      De.trigger(() => Y, { x: Y.x, y: Y.y, z: Y.z }, Zt, ct);
  };
  let hs = new CT(Gt, pt.inst, pt.colliders, re, Oe),
    nn;
  (!Ve.has("flatbay") && !su
    ? ((nn = new ek(new Yn(4e4, 4e4), {
        textureWidth: 4,
        textureHeight: 4,
        waterNormals: new ai(),
        sunDirection: new dt(0, 1, 0),
        sunColor: 16777215,
        waterColor: 730672,
        distortionScale: 2.2,
        fog: !1,
      })),
      (nn.rotation.x = -Math.PI / 2))
    : (nn = new ye(
        new Yn(4e4, 4e4).rotateX(-Math.PI / 2),
        new me({
          color: new It(0.018, 0.035, 0.04),
          roughness: 0.07,
          metalness: 0,
        }),
      )),
    (nn.position.y = M3),
    (nn.name = "Bay"),
    Yt.add(nn),
    (z.onOceanFailed = () => {
      nn.visible = !1;
      let Y = new ye(
        new Yn(4e4, 4e4).rotateX(-Math.PI / 2),
        new me({
          color: new It(0.018, 0.035, 0.04),
          roughness: 0.07,
          metalness: 0,
        }),
      );
      ((Y.position.y = M3), (Y.name = "Bay"), Yt.add(Y));
    }));
  let dn = new vs(8e3, 8e3, 1600, 64, 8, !0);
  {
    let Y = dn.attributes.position,
      ct = new Float32Array(Y.count * 4);
    for (let gt = 0; gt < Y.count; gt++) {
      let St = Y.getY(gt) + 800,
        Bt = Math.max(0, 1 - St / 1280);
      ct.set([1, 1, 1, Math.pow(Bt, 1.6)], gt * 4);
    }
    (dn.setAttribute("color", new Te(ct, 4)), dn.translate(0, 693, 0));
  }
  let Wn = new ye(
    dn,
    new Ys({
      color: 16777215,
      transparent: !0,
      depthWrite: !1,
      vertexColors: !0,
      fog: !1,
      side: ls,
    }),
  );
  ((Wn.name = "Haze"), (Wn.renderOrder = -1), Yt.add(Wn));
  let ni = Ve.has("physky") ? new U5() : null;
  (ni && (ni.scale.setScalar(1e4), Yt.add(ni), (z.physicalSky = !0)),
    Yt.add(Wkt()));
  let An = new ku(16777215, 3);
  ((An.isSunLight = !0),
    (An.castShadow = !0),
    (An.shadow.camera.far = bn ? 90 : 150),
    (Ve.has("noshadow") || su) && (An.castShadow = !1),
    (z.sunFitSlack = 0.15),
    (z.shadowBiasM = 0.05),
    Yt.add(An));
  let ii = new pm(16777215, 4473924, 0);
  Yt.add(ii);
  let Mt = null,
    Xt = {
      noon: {
        wind: 8.5,
        water: [0.07, 0.097, 0.1],
        foam: 0.95,
        shore: 0.55,
        glitter: 0.4,
      },
      golden: {
        wind: 8.5,
        water: [0.07, 0.1, 0.092],
        foam: 1.05,
        glitter: 0.6,
      },
      fog: { wind: 6, water: [0.065, 0.09, 0.088], foam: 0.9, glitter: 0.12 },
      rain: { wind: 9, water: [0.055, 0.075, 0.074], foam: 1.1, glitter: 0.15 },
      dusk: { wind: 5.5, water: [0.05, 0.08, 0.08], foam: 0.7 },
      night: { wind: 5, water: [0.04, 0.065, 0.065], foam: 0.6 },
    },
    wt = null,
    _t = y,
    ae = null,
    se = (Y) => {
      if (!it?.data?.bld || Ve.has("nosunfield")) return;
      let ct = performance.now(),
        gt = gj(Vm(it.data), D4(Y), ae);
      (gt && (ae = gt.data),
        z.setSunField(gt),
        (window.__sf.sunFieldMs = performance.now() - ct));
    };
  async function Jt(Y, ct = !1) {
    _t = Y;
    let gt = ca[Y],
      St = D4(gt);
    (An.position.copy(St).multiplyScalar(100),
      An.color.setRGB(...gt.sun),
      (An.intensity = gt.sunI),
      (An.castShadow = B !== "safe" && !Ve.has("noshadow") && gt.sunEl > 0),
      se(gt),
      ni && ni.material.uniforms.sunPosition.value.copy(St),
      nn.isWater &&
        (nn.material.uniforms.sunDirection.value.copy(
          D4({ ...gt, sunEl: Math.max(gt.sunEl, 5) }),
        ),
        (Mt = gt),
        z._so && xt(z._so, gt)));
    let Bt = await Pot(H4(gt), bn ? 512 : 1024);
    (H4(gt) !== gt && zot(gt),
      (Yt.background = Bt),
      (Yt.environment = Bt),
      (Yt.environmentIntensity = gt.env ?? 1));
    let Qt = bn
      ? H4(gt) !== gt
        ? 512
        : 0
      : E === "ultra"
        ? 4096
        : E === "perf"
          ? 2048
          : 3072;
    (Qt &&
      LN(gt, Qt, Pu("sky")).then((Ue) => {
        if (Ue)
          if (_t === Y && Yt.environment === Bt) {
            let ws = Yt.background;
            ((Yt.background = Ue), ws !== Bt && ws?.dispose?.());
          } else Ue.dispose();
      }),
      (Yt.fog = new sm(new It(...gt.fog), gt.fogD * (bn ? 1.35 : 1))),
      (Yt.fog.d0 = Yt.fog.density),
      (z.toneMappingExposure = gt.exposure),
      z.skyVis && (z.skyVis.floor = +(Ve.get("skyf") ?? gt.skyFloor ?? 0.25)),
      (z.grade = D5(gt.grade)),
      (z.bloom = gt.bloom ?? 0.075),
      (z._composerThr = ((gt.bloomK ?? 1.4) * 0.6) / gt.exposure),
      (z.flare =
        gt.flare && gt.sunEl > 0
          ? { dir: [St.x, St.y, St.z], strength: gt.flare, color: gt.sun }
          : null),
      (z.keepDepth = !0),
      (z.shafts =
        gt.shafts && gt.sunEl > 0 && !bn
          ? {
              dir: [St.x, St.y, St.z],
              strength: +(Ve.get("shafts") ?? gt.shafts),
              color: gt.shaftC || gt.fog,
            }
          : null),
      (z.carWet = +(Ve.get("carwet") ?? (gt.wet ? 1 : gt.bank ? 0.3 : 0))));
    {
      let Ue = CN(k9(gt, St.x, St.z), gt.exposure),
        ws = CN(k9(gt, -St.x, -St.z), gt.exposure),
        fn = gt.fog,
        kn = (Oi, ta, fo) => Oi.map((qr, p0) => qr * (1 - fo) + ta[p0] * fo),
        Cn = gt.night > 0.5 ? 0.3 : 1;
      z.fogScatter = {
        sun: kn(fn, Ue, 0.55 * Cn),
        away: kn(fn, ws, 0.45 * Cn),
        falloff: gt.fall ?? 0,
        base: M3,
        reach: gt.aerial ?? 1500,
        power: 3,
        linear: gt.fogLin ?? 0,
        elev: gt.fall && !gt.bank ? [90, 250] : null,
      };
      let Ae = dn.attributes.color,
        Us = dn.attributes.position,
        Ks = 0.75 + 0.25 * gt.haze;
      for (let Oi = 0; Oi < Us.count; Oi++) {
        let ta = Us.getX(Oi),
          fo = Us.getZ(Oi),
          qr = k9(gt, ta, fo),
          p0 = 0.35;
        Ae.setXYZ(
          Oi,
          (qr[0] * (1 - p0) + fn[0] * p0) * Ks,
          (qr[1] * (1 - p0) + fn[1] * p0) * Ks,
          (qr[2] * (1 - p0) + fn[2] * p0) * Ks,
        );
      }
      ((Ae.needsUpdate = !0), Wn.material.color.setRGB(1, 1, 1));
    }
    let Ie = gt.night;
    for (let Ue of Object.values(K))
      Ue.color.setRGB(
        Ue === K.road || Ue === K.roadDeck || Ue === K.roadTun
          ? gt.damp || -(gt.patches || 0)
          : 1,
        gt.wet || 0,
        Ie,
      );
    if (K.spill) {
      let Ue = (Ukt ?? gt.spill ?? 0.42) * Ie * (gt.wet ? 1.25 : 1);
      (K.spill.color.setRGB(Ue, Ue, Ue), (K.spill.visible = Ie > 0.05));
    }
    for (let Ue of pt.night || [])
      Ue.color.setRGB(Ue.userData.dayGlow ?? 0, gt.wet || 0, Ie);
    (tl.setNight(Ie, gt.wet || 0),
      vp.setNight(Ie, gt.wet || 0),
      st.lamp.color.setRGB(0, 0, Ie),
      st.furn.color.setRGB(1, gt.wet || 0, Ie),
      st.carlamp.color.setRGB(0, 0, 0),
      $e.color.setRGB(1, 0, Ie),
      yF(At, Ie),
      on(Ie));
    let Ee = gt.glowFill || {};
    ((ii.intensity = Ie > 0.3 ? (gt.cityGlow ?? 0.5) * Ie : 0),
      ii.color.setRGB(...(Ee.sky || [0.2, 0.22, 0.3])),
      ii.groundColor.setRGB(...(Ee.ground || [0.62, 0.42, 0.24])),
      (Ht = { i: 230, ang: 1.18, pen: 0.85, bw: 0, ...gt.lamps }));
    for (let Ue of ie) ((Ue.angle = Ht.ang), (Ue.penumbra = Ht.pen));
    {
      let Ue = Ie > 0.3 || !!gt.wet;
      xd(Et, { tail: Ue ? 1 : 0.35, head: Ue ? 1 : 0, signal: 0 });
    }
    (Et.waymo &&
      !Et.paintKit &&
      Et.materials.Body.color.setScalar(1 - 0.15 * Ie),
      Et.onNight?.(Ie),
      ct || qn(gt.name));
  }
  let _e = {
      lamp: [2.55, 8.1, 1],
      lamp2: [0, 5.85, 0.8],
      plamp: [0, 4.2, 0.45],
      dlamp: [0, 4.4, 0.5],
    },
    mt = pt.inst
      .filter((Y) => _e[Y.kind])
      .map((Y) => {
        let ct = _e[Y.kind];
        return Object.assign(
          new dt(
            Y.x + Math.sin(Y.rot) * ct[0],
            Y.y + ct[1],
            Y.z + Math.cos(Y.rot) * ct[0],
          ),
          { prop: Y, k: ct[2], arm: ct[0] > 0 },
        );
      }),
    ie = [],
    Dt = su ? 2 : bn ? 4 : 32;
  for (let Y = 0; Y < Dt; Y++) {
    let ct = new Jc(new It(1, 0.72, 0.42), 0, 34, 1.18, 0.85, 2);
    ((ct.visible = !1),
      (ct.userData.mbNear = 0.3),
      (ct.shadow.camera.near = 0.6),
      (ct.shadow.camera.far = 40),
      (ct.shadow.bias = -4e-4),
      (ct.shadow.normalBias = 0.04),
      Yt.add(ct, ct.target),
      ie.push(ct));
  }
  let Ht = { i: 230, ang: 1.18, pen: 0.85, bw: 0 },
    ft = new It(1, 0.86, 0.68),
    zt = new It(1, 0.58, 0.26),
    kt = new It(1, 0.74, 0.46),
    Ft = new dt(),
    qt = performance.now(),
    Et = await Z,
    Me = performance.now();
  (Yt.add(Et.root), (kd().carDoors = () => Et?.doors || null));
  let de = [-1, 1].map((Y) => {
    let ct = new Jc(new It(0.9, 0.95, 1), 0, 90, 0.52, 0.92, 1.6);
    return (
      (ct.castShadow = Y < 0 && !bn),
      (ct.visible = !1),
      (ct.userData.mbLowBeam = !0),
      (ct.userData.mbNear = 0.9),
      ct
    );
  });
  ze();
  let Wt = Array.from({ length: bn ? 1 : 5 }, () => {
      let Y = new Jc(new It(0.92, 0.95, 1), 0, 55, 0.5, 0.9, 1.7);
      return (
        (Y.visible = !1),
        (Y.userData.mbLowBeam = !0),
        (Y.userData.mbNear = 0.9),
        Yt.add(Y, Y.target),
        Y
      );
    }),
    ke = null,
    As = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let d = length(F.camPos.xyz - wp);
  gHE = col.rgb * bc.b * 9.0 * clamp(d / 650.0, 1.0, 4.0);
  gHK = vec4f(1.0, 0.0, 0.0, 1.0);
  return vec4f(vec3f(0.0), smoothstep(360.0, 460.0, d) * step(0.3, bc.b));
}`;
  z.prewarm([{ userData: { mbAlbedo: As }, alphaTest: 0.5 }]);
  let je = () => {
      ke && _s >= 0.5 && !ke.visible && z._hookPipe(As) && (ke.visible = !0);
    },
    _s = 0,
    co = null,
    wa = [],
    Zt = new n1($n ? us[Dn].spec : _c),
    Mn = (Zt.da = new pE(WM($n ? Dn : "free"))),
    fl = new xE(Yt);
  if (
    ((Mn.env.L = it?.layout || null),
    (Mn.env.roads = Se.roads?.laneV ? Se.roads : null),
    te && Mn.env.peds.push(te.peds),
    (Mn.env.traffic = Se.roads ? Se : null),
    (Mn.env.route = () =>
      vt && Sr && (vt.state === "offer" || vt.state === "ride")
        ? vt.route
        : null),
    (Mn.env.rides = () => (vt && Sr ? vt : null)),
    vt)
  ) {
    let Y = vt.emit.bind(vt);
    vt.emit = (ct, gt = {}) => {
      Y(ct, gt);
      try {
        Dr.ride(ct, gt, vt);
      } catch {}
    };
  }
  let ho = null,
    F0 = () => vt || (ho ||= it ? new HM(it.data, it.layout) : null);
  Mn.env.router = it
    ? {
        routeTo: (...Y) => F0().routeTo(...Y),
        _route: (...Y) => F0()._route(...Y),
      }
    : null;
  let Oc = (Y) =>
    qn(
      "Driving level \xB7 " +
        (z2[Y]?.short || Y) +
        (Y === "l5" && Mn.prof?.name ? " \xB7 " + Mn.prof.name : ""),
      z2[Y]?.sub || "",
      "",
      { key: "level" },
    );
  (it &&
    at &&
    !rt &&
    !Zn &&
    (ds?.update(at[0], at[1], null),
    (at = ntt(it.data, it.layout, re, at) || at)),
    rt
      ? Zt.place(rt[0], rt[1], rt[2] || 0)
      : at
        ? Zt.place(...at)
        : Zt.place(he[7] + 25, pe[16] + 2.5, -Math.PI / 2));
  let Ne = new Ji(60, innerWidth / innerHeight, 0.3, 9e3);
  Se.cam = Ne;
  let ui = new rT(Ne, re),
    di = (window.__sf.wreck = new tE({
      world: re,
      fx: Oe,
      ground: (Y, ct, gt) =>
        it ? it.layout.driveHeight(Y, ct, null, gt) : Wi(Y, ct),
      debris: () => Rs,
      audio: () => Ts,
      clear: (...Y) => ui.clear(...Y),
      blockers: (Y) => {
        let ct = [];
        for (let gt of hs?.debris || []) {
          if (Math.abs(gt.x.x - Y.x) > 30 || Math.abs(gt.x.z - Y.z) > 30)
            continue;
          let St = new dt(0, 1, 0).applyQuaternion(gt.q),
            Bt = gt.x.clone().addScaledVector(St, -(gt.K?.com ?? 1) * gt.s.y),
            Qt = Bt.clone().addScaledVector(
              St,
              (gt.K?.pts?.[2]?.[1] ?? 2 * (gt.K?.com ?? 1)) * gt.s.y,
            );
          (ct.push({ a: Bt, b: Qt, r: 0.6 }),
            gt.K?.wood &&
              ct.push({
                a: Qt.clone().addScaledVector(St, -1.5),
                b: Qt.clone().addScaledVector(St, 1.5),
                r: 2.6,
              }));
        }
        return ct;
      },
      onReset: (Y) => {
        Dr.reset("wreck", Y.v0?.s * 3.6);
        let ct = it?.layout.roadAt(Zt.pos.x, Zt.pos.z, 150, Zt.pos.y),
          gt = { x: -Math.sin(Y.v0.psi), z: -Math.cos(Y.v0.psi) };
        if (ct) {
          let Qt = Yp(
            it.data,
            it.layout,
            ct.E.name,
            Zt.pos.x,
            Zt.pos.z,
            gt.x,
            gt.z,
          );
          Zt.place(Qt[0], Qt[1], Qt[2]);
        } else Zt.place(Zt.pos.x, Zt.pos.z, Y.v0.psi);
        let St = Zt.forward(),
          Bt = Math.min(19, Y.v0.s * 0.55);
        ((Zt.vel.x = St.x * Bt),
          (Zt.vel.z = St.z * Bt),
          (ui.init = !1),
          (De.on = !1));
      },
    }));
  ((De.blocked = (Y, ct) => {
    let gt = Y.x - ct.x,
      St = Y.y - ct.y,
      Bt = Y.z - ct.z,
      Qt = Math.hypot(gt, St, Bt) || 1;
    return (
      ui.clear(ct.x, ct.y, ct.z, gt / Qt, St / Qt, Bt / Qt, Qt, ct.y) <
        Qt * 0.95 || di.blocked(Y, ct)
    );
  }),
    (di.onGround = (Y, ct, gt, St) => Ps?.ground(Y, ct, gt, St)),
    (di.onHand = () => {
      ((ui.init = !1), (De.on = !1));
    }),
    (di.off = Ve.has("nowreck") || (Zn && !Ve.has("wreck"))));
  let Gh = new nE(),
    E1 = new iE(),
    O0 = new dt(),
    Os = [];
  $n && ui.setScale(us[Dn].cam);
  let fs = new cT();
  if ((fs.bindTouch(document.body), Cd)) {
    fs.bindGestures(Ns("view"));
    for (let Y of ["gesturestart", "gesturechange"])
      document.addEventListener(Y, (ct) => ct.preventDefault(), {
        passive: !1,
      });
    (Ns("view").addEventListener(
      "touchstart",
      (Y) => {
        document.body.classList.contains("play") && Y.preventDefault();
      },
      { passive: !1 },
    ),
      Ns("view").addEventListener("touchmove", (Y) => Y.preventDefault(), {
        passive: !1,
      }));
  }
  let Ts = null,
    Vi = it
      ? (Y, ct) => (it.layout.coverAt(Y, ct) & 8) !== 0
      : (Y, ct) => Y > Ye.x || ct < Ye.z,
    Gs;
  (addEventListener("resize", () => {
    if (!globalThis.SF_IOS) {
      Si();
      return;
    }
    (clearTimeout(Gs), (Gs = setTimeout(Si, 200)));
  }),
    Si());
  let Po = 0,
    B0 = null,
    T1 = 4,
    Vh = 0,
    $l = 0,
    N0 = 0;
  (Ec(Et, Zt),
    ui.update(1 / 60, Zt, Et, { lookBack: !1 }),
    z1("Lighting the city", 0.93, 0.2),
    z.prewarm(Yt));
  let a3 = performance.now();
  await Jt(_t);
  let r3 = performance.now();
  z1("Compiling shaders", 0.98, 0.4);
  let E9 = Zn ? 6e5 : +(Ve.get("texwait") ?? 6e3),
    G4 = performance.now();
  await Promise.race([sV(), new Promise((Y) => setTimeout(Y, E9))]);
  let l3 = performance.now(),
    ON = performance.now();
  await z.compileAsync(Yt);
  let Bot = performance.now();
  (await z.prepareMaterials(Yt), z.render(Yt, Ne));
  let BN = performance.now(),
    Not = z.finish?.();
  wa = z.pendingTextures(Yt);
  let La = NT(),
    Hn = new FT(Zt, {
      onPause: () => {
        (fs.releaseGestures?.(), Ts?.suspend(), Dr.pause("menu", !0));
      },
      onResume: () => {
        (Ts?.resume(), Dr.pause("menu", !1));
      },
      audio: () => Ts,
      carId: () => ($n ? Dn : "free"),
    });
  document.addEventListener("visibilitychange", () => {
    document.hidden &&
      document.body.classList.contains("play") &&
      !Zn &&
      !pi?.open &&
      Hn.set(!0);
  });
  let pi = new M9({
      v: Zt,
      traffic: Se,
      real: it,
      mobile: bn,
      onOpen: () => {
        (fs.releaseGestures?.(), Ts?.suspend());
      },
      onClose: () => Ts?.resume(),
    }),
    Bc = null;
  if (vt) {
    let Y = i0()
      ? null
      : e0("assets/tex/peds.webp", (ct) => {
          ((ct.colorSpace = Je), (ct.flipY = !1), (ct.anisotropy = 8));
        });
    ((Bc = new aT({
      rides: vt,
      scene: Yt,
      map: pi,
      audio: () => Ts,
      pedTex: Y,
      L: it.layout,
      mph: () => La,
      carName: () => us[Dn]?.name || "Waymo",
    })),
      z.prewarm(Bc.group));
  }
  let NN = "",
    HN = 0,
    DN = "",
    UN = "",
    GN = "",
    T9 = 9e3,
    Z2 = -135,
    c3 = 135,
    iu = (Y, ct) =>
      [
        120 + Y * Math.sin((ct * Math.PI) / 180),
        120 - Y * Math.cos((ct * Math.PI) / 180),
      ].map((gt) => gt.toFixed(2)),
    h3 = (Y, ct, gt) => {
      let St = iu(Y, ct),
        Bt = iu(Y, gt);
      return `M${St[0]} ${St[1]}A${Y} ${Y} 0 ${gt - ct > 180 ? 1 : 0} 1 ${Bt[0]} ${Bt[1]}`;
    },
    VN = (Y) => Z2 + ((c3 - Z2) * Y) / T9,
    WN = () => {
      (Ns("rpmT").setAttribute("d", h3(86, Z2, c3)),
        Ns("rpm").setAttribute("d", h3(86, Z2, c3)),
        Ns("red").setAttribute("d", h3(86, VN(8e3), c3)),
        Ns("nosT").setAttribute("d", h3(110, -160, -95)),
        Ns("nos").setAttribute("d", h3(110, -160, -95)));
      let Y = "";
      if ($n && !Ev.has(Dn))
        for (let gt = 0; gt <= 100; gt += 5) {
          let St = Z2 + ((c3 - Z2) * gt) / 100,
            Bt = gt % 25 === 0,
            Qt = iu(Bt ? 74 : 78, St),
            Ie = iu(81, St);
          if (
            ((Y += `<line class="tick${Bt ? "" : " min"}" x1="${Qt[0]}" y1="${Qt[1]}" x2="${Ie[0]}" y2="${Ie[1]}"/>`),
            Bt)
          ) {
            let Ee = iu(63, St);
            Y += `<text class="num" x="${Ee[0]}" y="${Ee[1]}">${gt}</text>`;
          }
        }
      else
        for (let gt = 0; gt <= T9; gt += 500) {
          let St = VN(gt),
            Bt = gt % 1e3 === 0,
            Qt = iu(Bt ? 74 : 77, St),
            Ie = iu(81, St);
          if (
            ((Y += `<line class="tick${Bt ? "" : " min"}" x1="${Qt[0]}" y1="${Qt[1]}" x2="${Ie[0]}" y2="${Ie[1]}"/>`),
            Bt)
          ) {
            let Ee = iu(64, St);
            Y += `<text class="num${gt >= 8e3 ? " r" : ""}" x="${Ee[0]}" y="${Ee[1]}">${gt / 1e3}</text>`;
          }
        }
      let ct = iu(110, -165);
      ((Y += `<circle class="nosI" cx="${ct[0]}" cy="${ct[1]}" r="3.2"/>`),
        (Ns("ticks").innerHTML = Y),
        document.body.classList.toggle("ice", $n && Ev.has(Dn)));
    };
  WN();
  let R9 = 0,
    A9 = 0,
    Hot = 0,
    P9 = 0,
    Id = {},
    Dot = {},
    R1 = (Y) => (Dot[Y] ||= Ns(Y)),
    f3 = (Y, ct) => {
      ((ct = String(ct)),
        Id[Y] !== ct && ((Id[Y] = ct), (R1(Y).textContent = ct)));
    },
    V4 = (Y, ct) => {
      Id["d" + Y] !== ct &&
        ((Id["d" + Y] = ct), (R1(Y).style.strokeDashoffset = ct));
    },
    ou = { s: "", u: "", g: "", d: !1 };
  (await Not, z1("Ready", 1));
  {
    let Y = 0;
    Sj((ct) =>
      setTimeout(
        () => {
          try {
            ct();
          } catch (gt) {
            console.warn("late:", gt);
          }
        },
        500 + 350 * Y++,
      ),
    );
  }
  (it?.plantLater &&
    !bn &&
    !Ve.has("nounder") &&
    setTimeout(() => {
      let Y = performance.now();
      for (
        Vt = ev(
          it.plantLater(),
          st,
          null,
          (ct, gt) => it.layout.driveHeight(ct, gt),
          Gt.userData.K,
        ),
          Vt.name = "Understory",
          Vt.userData.cull(Ne.position.x, Ne.position.z, 420, Ne.position.y);
        Vt.userData.step();
      );
      (Pd(Vt),
        Yt.add(Vt),
        z.upload(Vt),
        (window.__sf.plantsRoot = Vt),
        Ve.has("nograss") ||
          ((ce = yQ(it.layout, st.shrubleaf)),
          ce.update(Ne.position.x, Ne.position.z, !0),
          Yt.add(ce.mesh),
          (window.__sf.grass = ce)),
        Q?.grassAt &&
          !Ve.has("noblades") &&
          ((Xe = wQ(it.layout, Q)),
          Xe.update(Ne.position.x, Ne.position.z, !0),
          Yt.add(Xe.mesh),
          (window.__sf.blades = Xe)),
        console.log(
          `understory: ${JSON.stringify(it.stats.understory)}, ${(performance.now() - Y).toFixed(0)} ms`,
        ));
    }, 700),
    it?.claimedAt &&
      !bn &&
      !su &&
      !Ve.has("noyards") &&
      setTimeout(
        () =>
          bo("assets/real/yards.bin")
            .then((Y) => {
              let ct = performance.now(),
                gt = (ue = mQ(Y).filter((St) => !it.claimedAt(St.x, St.z)));
              for (
                Kt = ev(
                  gt,
                  st,
                  null,
                  (St, Bt) => it.layout.driveHeight(St, Bt),
                  Gt.userData.K,
                ),
                  Kt.name = "Yards",
                  Kt.userData.cull(
                    Ne.position.x,
                    Ne.position.z,
                    420,
                    Ne.position.y,
                  );
                Kt.userData.step();
              );
              (Pd(Kt),
                Yt.add(Kt),
                z.upload(Kt),
                (window.__sf.yardsRoot = Kt),
                console.log(
                  `front yards: ${gt.length} plants, ${(performance.now() - ct).toFixed(0)} ms`,
                ));
            })
            .catch((Y) => console.warn("yards:", Y)),
        1500,
      ),
    it &&
      !bn &&
      !Ve.has("nofar") &&
      setTimeout(
        () =>
          fetch("assets/tex/impostors.json")
            .then((Y) => Y.json())
            .then(async (Y) => {
              ((ne = Y),
                (Pt = await NF(
                  pt.inst,
                  Gt.userData.treeKind,
                  Y,
                  _F(st.impostorTex),
                )),
                Pt.userData.cull(Ne.position.x, Ne.position.z),
                Pd(Pt),
                Yt.add(Pt),
                z.upload(Pt),
                (window.__sf.farTrees = Pt),
                console.log(
                  `far trees: ${Pt.userData.trees} in ${Pt.userData.chunks} chunks, ${Pt.userData.ms} ms`,
                ));
            })
            .catch((Y) => console.warn("far trees:", Y)),
        1200,
      ));
  let au = [],
    Q2 = new Map(),
    qN = 0,
    W4 = Lot,
    Vot = async (Y, ct = 5) => {
      for (;;) {
        let gt = performance.now();
        for (; performance.now() - gt < ct;) if (Y.next().done) return;
        await W4();
      }
    },
    q4 = (Y) => {
      if (!it || !z0[Y] || Q2.has(Y)) return Q2.get(Y);
      let ct = performance.now(),
        gt = L$(it.data, Y, bo)
          .then(async (St) => {
            if (!St) return;
            let Bt = { colliders: [], inst: [] };
            (sO(it.data, St.p0, St.p1),
              nO(it.data, it.layout, St.p0, St.p1),
              await Vot(it.addRegionSteps(St, Bt)),
              vt && WO(vt.spots, Bt.inst, Bt.colliders),
              vF(Bt.inst, Bt.colliders, !!At));
            for (let Ee of Bt.colliders)
              Ee.parked && re.parkedOff ? re.parkedOff.push(Ee) : re.index(Ee);
            await W4();
            let Qt = (Ee) =>
                Math.floor(Ee.x / 256) * 65536 + Math.floor(Ee.z / 256),
              Ie = Bt.inst.slice().sort((Ee, Ue) => Qt(Ee) - Qt(Ue));
            for (let Ee = 0; Ee < Ie.length; Ee += 4e3) {
              let Ue = Math.min(Ie.length, Ee + 4e3);
              for (; Ue < Ie.length && Qt(Ie[Ue]) === Qt(Ie[Ue - 1]);) Ue++;
              let ws = Ie.slice(Ee, Ue);
              Ee = Ue - 4e3;
              let fn = ev(ws, st, At, Ut, Gt.userData.K);
              for (
                fn.name = "Props_" + Y + "_" + au.length,
                  fn.userData.cull(
                    Ne.position.x,
                    Ne.position.z,
                    B === "safe" ? 130 : B === "mobile" ? 160 : 420,
                    Ne.position.y,
                  );
                fn.userData.step();
              );
              (d0 || fn.userData.setParked(!1),
                Pd(fn),
                z.prewarm?.(fn),
                Yt.add(fn),
                z.upload(fn),
                au.push(fn),
                await W4());
            }
            (hs.link(Bt.inst, Bt.colliders),
              it.ground &&
                ((St.ground || St.green) && OF(St.ground, St.green, it.ground),
                x_(it.ground, Bt.inst)),
              await W4(),
              pi?.refresh?.(St.green),
              Y === "marin" &&
                bo("assets/real/marin/docks.bin")
                  .then((Ee) => {
                    if (!Ee) return;
                    let Ue = rtt(Ee, { mobile: bn });
                    (Pd(Ue), z.prewarm?.(Ue), Yt.add(Ue), z.upload(Ue));
                  })
                  .catch((Ee) => console.warn("docks", Ee)),
              ne &&
                !bn &&
                NF(Bt.inst, Gt.userData.treeKind, ne, _F(st.impostorTex)).then(
                  (Ee) => {
                    (Ee.userData.cull(Ne.position.x, Ne.position.z),
                      Pd(Ee),
                      Yt.add(Ee),
                      z.upload(Ee),
                      jt.push(Ee));
                  },
                ),
              console.log(
                `region ${Y}: ${St.b1 - St.b0} buildings, ${Bt.inst.length} props, ${(performance.now() - ct).toFixed(0)} ms (its steps ${it.stats.regions?.[Y]?.ms} ms of work)`,
              ));
          })
          .catch((St) => console.warn("region " + Y, St));
      return (Q2.set(Y, gt), gt);
    };
  (it &&
    ((it.needRegion = q4),
    (window.__sf.loadRegion = q4),
    (window.__sf.regionLoads = Q2),
    (!bn || Zn || Ve.has("regions")) &&
      setTimeout(
        async () => {
          for (let Y of Object.keys(z0)) await q4(Y);
        },
        Zn ? 300 : 2600,
      )),
    console.log(
      `load: ready at ${performance.now().toFixed(0)} ms; after the city: scene ${(qt - ee).toFixed(0)} ms, car's wait ${(Me - qt).toFixed(0)} ms, lighting ${(r3 - a3).toFixed(0)} ms, textures' wait ${(l3 - G4).toFixed(0)} ms + upload ${(ON - l3).toFixed(0)} ms, compile's wait ${(Bot - ON).toFixed(0)} ms, first frame ${(BN - r3).toFixed(0)} ms + GPU ${(performance.now() - BN).toFixed(0)} ms`,
    ));
  let jN = Ns("go");
  if (
    ((!nu || Zn) && jN.classList.add("on"),
    Ns("title").classList.add("ready"),
    globalThis.SF_BOOT?.ready(),
    bn)
  ) {
    let Y =
      z.dropCpu(pt.group) +
      z.dropCpu(Et.root) +
      z.dropCpu(Gt) +
      Se.objects.reduce((ct, gt) => ct + z.dropCpu(gt), 0);
    console.log(`phones: ${Y} meshes' CPU copies let go`);
  }
  {
    let Y = () => {
      !bn && At && !Ve.has("no2k") && GZ(At);
    };
    S && At
      ? setTimeout(
          () =>
            UZ(At, (ct, gt) => {
              (Se?.swapModel?.(ct, gt), Gt.userData.swapCar?.(ct, gt));
              for (let St of au) St.userData.swapCar?.(ct, gt);
            }).then((ct) => {
              (console.log(`cars: ${ct} full meshes in after the load`),
                (window.__sf.carsFull = ct),
                Y());
            }),
          300,
        )
      : setTimeout(Y, 1500);
  }
  let Wot = null,
    $N = null,
    XN = (Y) =>
      Y === Dn && (Y !== "custom" || Et?.rideSha === us.custom?.ride?.sha);
  async function Wh(Y) {
    if ($n && Y === "custom" && !us.custom) {
      let ws = qh();
      ws && tg(ws);
    }
    if (!$n || !us[Y] || (($N = Y), XN(Y))) return Et;
    let ct = us[Y].ride?.sha,
      gt = await (Wot = X(Y, !0));
    if (XN(Y) || Y !== $N || (ct && us[Y]?.ride?.sha !== ct))
      return (V(Et), Et);
    let St = us[Y],
      Bt = Zt.pos.x,
      Qt = Zt.pos.z,
      Ie = Zt.pos.y,
      Ee = Zt.psi;
    if (Et?.custom && Et !== gt) {
      let ws = Et;
      setTimeout(() => ws.root.traverse((fn) => fn.geometry?.dispose?.()), 0);
      for (let fn of Object.keys(G))
        fn.startsWith("custom:") &&
          fn !== "custom:" + gt.rideSha &&
          delete G[fn];
    }
    (Yt.remove(Et.root),
      (Dn = Y),
      (Et = gt),
      Yt.add(Et.root),
      ze(),
      dl(),
      bn && setTimeout(() => z.dropCpu(gt.root), 1500),
      (Zt.S = St.spec),
      (Zt.nitro = St.spec.nitroMax ?? 1),
      Zt.place(Bt, Qt, Ee, Ie),
      Zt.da?.setMode(WM(Y)),
      window.__sf.tuneCar?.(),
      ui.setScale(St.cam),
      Ec(Et, Zt),
      Et.root.updateMatrixWorld(!0),
      WN(),
      Hn.sync());
    let Ue = ca[_t];
    (Et.onNight?.(Ue.night),
      Et.waymo &&
        !Et.paintKit &&
        Et.materials.Body.color.setScalar(1 - 0.15 * Ue.night),
      (document.body.dataset.car = Y),
      (window.__sf.car = Et),
      (window.__sf.carId = Y));
    {
      let ws = j4(Y);
      Ts?.setVehicle?.(ws.id, { virt: ws.virt });
    }
    (ZN(),
      Pi?.carChanged(),
      St.spec.liftA &&
        qn(
          "Tesla Roadster",
          bn
            ? "Hold LIFT to fly \xB7 FLIP in the air"
            : "J (hold): fly \xB7 Space in the air: flip \xB7 Shift: thrusters \xB7 Q: fans \xB7 the reveal's loop: Marina Green",
          "",
          { key: "roadster" },
        ),
      V(Et));
    try {
      localStorage.setItem("teleop.car", Y);
    } catch {}
    return Et;
  }
  let KN = (Y) => {
      try {
        return Vn.list().find((ct) => ct.ride?.sha === Y?.sha)?.prompt || "";
      } catch {
        return "";
      }
    },
    C9 = (Y) => wE(Y, KN(Y));
  window.__sf.audFor = j4;
  let L9 = () => {
      let Y = j4(Dn);
      Ts?.setVehicle?.(Y.id, { virt: Y.virt });
    },
    JN = () => {
      let Y = us.custom?.ride;
      return Y ? wE({ ...Y, snd: null }, KN(Y)) : "flat6";
    },
    qot = () => {
      let Y = [];
      for (let ct of Qn.remotes.values()) {
        if (!ct.drawn || !ct.id) continue;
        if (ct._rdA !== ct.rd || ct._idA !== ct.id) {
          ((ct._rdA = ct.rd), (ct._idA = ct.id));
          let Bt = ct.id === "custom" ? ME(ct.rd) : null;
          ((ct.snd = Bt ? wE(Bt) : null),
            (ct.aud = Bt ? Tc[ct.snd].audio : us[ct.id]?.sound || "waymo"));
        }
        let gt = ct.pose,
          St = gt.speed || 0;
        Y.push({
          key: ct.seat,
          aud: ct.aud,
          x: gt.pos.x,
          y: gt.pos.y,
          z: gt.pos.z,
          vx: -Math.sin(gt.psi) * St,
          vz: -Math.cos(gt.psi) * St,
          speed: St,
        });
      }
      return Y;
    },
    ZN = () => {
      let Y = Ns("vehicleBtn")?.querySelector("b");
      Y && Dn && (Y.textContent = us[Dn]?.name || "Car");
    },
    $4 = "sf-drive.ride",
    qh = () => {
      let Y = Xs?.ride?.();
      if (Y) return Y;
      try {
        return Ul(JSON.parse(localStorage.getItem($4) || "null"));
      } catch {
        return null;
      }
    },
    u3 = $n
      ? {
          preview: async (Y) => {
            let ct = Wf(Y);
            if (!ct) return !1;
            tg(ct);
            let gt = await Wh("custom");
            return !!gt?.custom && gt.rideSha === ct.sha;
          },
          drive: (Y) => {
            let ct = Wf(Y) || us.custom?.ride;
            if (ct) {
              us.custom?.ride?.sha === ct.sha &&
                us.custom.ride.snd &&
                (ct.snd = us.custom.ride.snd);
              try {
                localStorage.setItem($4, JSON.stringify(ct));
              } catch {}
              (Xs?.setRide?.(ct), lst(Y?.id));
            }
          },
          revert: (Y) => {
            let ct = qh();
            return (
              ct && tg(ct),
              Wh(Y && (Y !== "custom" || ct) ? Y : "waymo")
            );
          },
        }
      : null;
  ((window.__sf.ride = u3),
    (document.body.dataset.car = Dn || "ferrari"),
    ZN());
  let Sr = !0;
  try {
    Sr = localStorage.getItem("teleop.fares") !== "off";
  } catch {}
  let QN = (Y) => {
    ((Sr = Y),
      document.body.classList.toggle("freeroam", !Y),
      Bc && ((Bc.group.visible = Y), !Y && pi && (pi.overlay = null)));
    let ct = Ns("faresBtn")?.querySelector("b");
    (ct && (ct.textContent = Y ? "ON" : "OFF"),
      Ns("faresBtn")?.setAttribute("aria-pressed", String(Y)));
    try {
      localStorage.setItem("teleop.fares", Y ? "on" : "off");
    } catch {}
  };
  (nu ? QN(Sr) : (Sr = !0),
    Ns("faresBtn")?.addEventListener("click", () => QN(!Sr)));
  let H0 = !0,
    d0 = !0;
  if (!Zn)
    try {
      ((H0 = localStorage.getItem("sf-drive.traffic") !== "off"),
        (d0 = localStorage.getItem("sf-drive.parked") !== "off"));
    } catch {}
  let I9 = (Y, ct) => {
      let gt = Ns(Y);
      gt &&
        ((gt.querySelector("b").textContent = ct ? "ON" : "OFF"),
        gt.setAttribute("aria-pressed", String(ct)));
    },
    A1 = (Y, ct = !0) => {
      if (
        ((H0 = !!Y),
        Se.setEnabled(H0),
        (re.dynamic = Se.colliders),
        (z.shadowEpoch = (z.shadowEpoch | 0) + 1),
        I9("trafficBtn", H0),
        ct)
      )
        try {
          localStorage.setItem("sf-drive.traffic", H0 ? "on" : "off");
        } catch {}
      return H0;
    },
    d3 = (Y, ct = !0) => {
      ((d0 = !!Y), Gt.userData.setParked(d0), ds?.setParked(d0));
      for (let gt of au) gt.userData.setParked(d0);
      if (
        (re.setParked(d0),
        (z.shadowEpoch = (z.shadowEpoch | 0) + 1),
        I9("parkedBtn", d0),
        ct)
      )
        try {
          localStorage.setItem("sf-drive.parked", d0 ? "on" : "off");
        } catch {}
      return d0;
    };
  (A1(H0, !1),
    d3(d0, !1),
    Ns("trafficBtn")?.addEventListener("click", () => A1(!H0)),
    Ns("parkedBtn")?.addEventListener("click", () => d3(!d0)));
  let ki =
      it && Se.roads
        ? new gT({
            traffic: Se,
            world: re,
            v: Zt,
            camera: Ne,
            toast: qn,
            scene: Yt,
            mobile: bn,
            night: () => ca[_t].night || 0,
            heights: it.data?.bld ? () => Vm(it.data) : null,
          })
        : null,
    D0 = !Ve.has("nopolice");
  if (!Zn && D0)
    try {
      D0 = localStorage.getItem("sf-drive.police") !== "off";
    } catch {}
  let X4 = (Y, ct = !0) => {
    if (((D0 = !!Y), ki?.setEnabled(D0), I9("policeBtn", D0), ct))
      try {
        localStorage.setItem("sf-drive.police", D0 ? "on" : "off");
      } catch {}
    return D0;
  };
  (X4(D0, !1),
    ki || Ns("policeBtn")?.remove(),
    Ns("policeBtn")?.addEventListener("click", () => X4(!D0)),
    Object.assign(window.__sf, {
      setTraffic: A1,
      setParked: d3,
      setPolice: X4,
      police: ki,
      world: re,
    }));
  let Ga = (window.__sf.tele = new __({
    map: pi,
    v: Zt,
    R: it,
    world: re,
    traffic: Se,
    cc: ui,
    rides: () => vt,
    taxi: () => Bc,
    fares: () => Sr,
    toast: qn,
  }));
  {
    let Y = Ga.go.bind(Ga);
    Ga.go = (ct) => {
      let gt = Y(ct);
      return (
        gt &&
          !ct?.quiet &&
          Dr.event("teleport", {
            street: String(ct?.E?.name || ct?.name || ""),
            km:
              Math.round(
                Math.hypot((ct?.x ?? 0) - Zt.pos.x, (ct?.z ?? 0) - Zt.pos.z),
              ) / 1e3,
          }),
        gt
      );
    };
  }
  (pi &&
    it &&
    (pi.onPickDrive = (Y) => {
      let [ct, gt] = G5(Y.x, Y.z),
        St = F0()?._snap("Pin", "Pin", ct, gt, Y.E?.name || null);
      if (!St) {
        pi.setPick?.(null, "No kerb here - tap a street");
        return;
      }
      (Mn.setDest(St),
        Mn.mode !== "l5" && Mn.setMode("l5"),
        (Mn.takeover = !1),
        Hn.sync(),
        pi.setPick?.(null),
        pi.open && pi.toggle(!1),
        qn("Level 5", "Driving to " + (Y.name || "the pin")),
        Dr.event("map_destination", {
          street: String(Y.E?.name || Y.name || ""),
        }));
    }),
    Ns("tDA")?.addEventListener("click", (Y) => {
      Y.stopPropagation();
      let ct = Mn.takeover,
        gt = Hn.cycleAssist();
      ct || Oc(gt);
    }));
  let Nc = !nu || Zn,
    tH = !1,
    Qo = nu
      ? new PE({
          current: () => fH(),
          select: (Y) => tat(Y),
          list: () => Qot(),
          garage: () => Fd("picker"),
          confirm: (Y) => {
            eat(Y);
            let ct = !Nc;
            ((Nc = !0),
              ct ? ag() : (document.body.classList.add("play"), Ts?.resume()));
          },
          cancel: () => {
            Nc && (document.body.classList.add("play"), Ts?.resume());
          },
        })
      : null;
  (Qo && (window.__sf.picker = Qo),
    Qo &&
      !Zn &&
      setTimeout(() => {
        if (!J2)
          try {
            (Ns("title").classList.add("gone"), Fd("start"));
          } catch (Y) {
            console.warn("garage", Y);
          }
      }, 700),
    Ns("vehicleBtn")?.addEventListener("click", () => {
      Qo &&
        (Hn.set(!1),
        Ts?.suspend(),
        document.body.classList.remove("play"),
        Fd("picker"));
    }));
  let Qn =
    $n && (globalThis.SF_MP || Ve.has("mp"))
      ? (window.__sf.mp = new ZE({
          scene: Yt,
          camera: Ne,
          v: Zt,
          world: re,
          carId: () => Dn,
          loadCar: tt,
          paint: () => cF(lu.get(ru())),
          ride: () =>
            Dn === "custom" && us.custom
              ? oB({ ...us.custom.ride, snd: C9(us.custom.ride) })
              : "",
          night: () => ca[_t].night || 0,
          toast: qn,
          map: pi,
          groundAt: it
            ? (Y, ct, gt) => it.layout.driveHeight(Y, ct, null, gt)
            : null,
          worldGet: () => ({
            tr: H0 ? 1 : 0,
            pk: d0 ? 1 : 0,
            tod: k1.indexOf(_t),
          }),
          worldSet: (Y, ct) => {
            (!ct && Y.tr !== (H0 ? 1 : 0) && A1(!!Y.tr, !1),
              Y.pk !== (d0 ? 1 : 0) && d3(!!Y.pk, !1),
              Y.tod >= 0 && k1[Y.tod] && k1[Y.tod] !== _t && Jt(k1[Y.tod]));
          },
          teleport: (Y, ct) => {
            if (!it || !pi?.P) return !1;
            let gt = Ga.pick(Y, ct, 60);
            return !!gt && Ga.go(gt);
          },
          el: { panel: Ns("mpPanel"), chip: Ns("mpChip"), tags: Ns("mpTags") },
        }))
      : null;
  Qn?.enabled && it && Qn.attachTraffic(Se);
  let K4 = null,
    F9 = (Y) => {
      ((Sr = Y),
        document.body.classList.toggle("freeroam", !Y),
        Bc && ((Bc.group.visible = Y), !Y && pi && (pi.overlay = null)));
    },
    Un =
      $n && it && Se.roads && (globalThis.SF_MP || Ve.has("race"))
        ? (window.__sf.race = new tT({
            scene: Yt,
            camera: Ne,
            v: Zt,
            world: re,
            roads: Se.roads,
            loadCar: tt,
            carId: () => Dn,
            toast: qn,
            map: pi,
            mp: Qn,
            place: (Y) => Ga.go({ ...Y, quiet: !0 }),
            held: () => Ga.on,
            env: {
              focus() {
                (Qo?.isOpen && (Qo.close(), Nc || ((Nc = !0), ag())),
                  Hn.paused && Hn.set(!1),
                  pi?.open && pi.toggle(!1),
                  document.body.classList.add("play"),
                  Ts?.resume?.());
              },
              begin() {
                ((K4 = { fares: Sr, trafficOn: H0, lvl: Mn.mode }),
                  nu && F9(!1),
                  A1(!1, !1),
                  Mn.setMode("manual"),
                  Hn.sync());
              },
              end() {
                if (!K4) return;
                let Y = K4;
                ((K4 = null),
                  A1(Y.trafficOn, !1),
                  nu && F9(Y.fares),
                  Y.lvl !== "manual" && Mn.setMode(Y.lvl),
                  Hn.sync(),
                  Qn && (Qn.worldV = void 0));
              },
            },
          }))
        : null;
  Qn &&
    te &&
    ((te.onKnock = (Y) => Qn.knockSend(Y)),
    (Qn.onPeopleKnock = (Y) => te.knockFrom(Y)));
  let Xs =
    $n && (globalThis.SF_MP || Ve.has("mp") || Ve.has("race"))
      ? (window.__sf.profile = new nT({
          rides: vt,
          police: ki,
          v: Zt,
          carId: () => Dn,
          swapCar: (Y) => Wh(Y),
          place: (Y) =>
            it ? Ga.go({ ...Y, quiet: !0 }) : (Zt.place(Y.x, Y.z, Y.psi), !0),
          toast: qn,
          taxi: () => Bc,
          noPos: () => !!Un?.active || !!Ga.on,
          mph: () => La,
        }))
      : null;
  (Xs && (Xs.onRide = (Y) => tg(Y)),
    Xs &&
      (window.__sf.board = new oT(Xs, {
        tabs: [...document.querySelectorAll("[data-lb]")],
        list: Ns("lbList"),
        note: Ns("lbNote"),
        more: Ns("lbMore"),
      })),
    Xs && !Zn && (Xs.load(), Un && (Un.onResult = (Y) => Xs.raceResult(Y))),
    z._hookPipe &&
      hF((Y) => {
        try {
          return !!z._hookPipe(Y) && !!z._hookPipe(Y, !0);
        } catch {
          return !0;
        }
      }));
  let Y4 = (Y, ct) => (Y === "custom" && ct ? "c" + ct.slice(0, 24) : Y),
    p3 = () => null,
    eH = () => null,
    O9 = () => {},
    m3,
    jot = () => {
      let Y = m3 !== void 0 ? m3 : eH(),
        ct = Y && p3(Y),
        gt = Dn || "ferrari";
      return ct &&
        ct.base === gt &&
        (gt !== "custom" || ct.ride?.sha === Et?.rideSha)
        ? ct
        : null;
    },
    $ot = () => {
      let Y = jot();
      return Y ? "m:" + Y.id : Y4(Dn || "ferrari", Et?.rideSha);
    },
    eg = "sf-drive.custom",
    ru = $ot,
    Xot = () => {
      let Y = window.__sf.home,
        ct = window.__sf.garage;
      if (!ct?.isOpen || ct.mode !== "home" || !Y?.sel?.startsWith("m:"))
        return null;
      let gt = Y.selected();
      return gt && Y.isCurrent?.(gt) ? Y.sel : null;
    },
    lu = {
      get(Y) {
        if (Y?.startsWith("m:")) {
          let gt = p3(Y.slice(2));
          return gt ? or(gt.paint) : null;
        }
        let ct = Xs?.custom(Y);
        if (ct !== void 0) return ct;
        try {
          return JSON.parse(localStorage.getItem(eg) || "{}")[Y]?.paint || null;
        } catch {
          return null;
        }
      },
      set(Y, ct) {
        if (((ct = or(ct)), Y?.startsWith("m:"))) {
          (O9(Y.slice(2), { paint: ct }), Qn?.paintChanged?.());
          return;
        }
        try {
          let gt = JSON.parse(localStorage.getItem(eg) || "{}");
          ((gt[Y] = { ...(gt[Y] || {}), paint: ct, t: Date.now() }),
            localStorage.setItem(eg, JSON.stringify(gt)));
        } catch {}
        (Xs && Xs.setCustom(Y, ct), Qn?.paintChanged?.());
      },
    },
    sH = new Map(),
    nH = (Y) => {
      if (us.custom?.ride?.sha === Y.sha) return us.custom.spec;
      let ct = sH.get(Y.sha);
      return (ct || sH.set(Y.sha, (ct = VE(Y, null).spec)), ct);
    },
    Kot = (Y) =>
      [us.custom?.ride, ...iH(), ...Vn.list().map((ct) => ct.ride), qh()].find(
        (ct) => ct?.sha?.startsWith(Y),
      ) || null,
    iH = () => [],
    P1 = (Y) => {
      if (!$n) return _c;
      if (Y?.startsWith("m:")) {
        let ct = p3(Y.slice(2));
        return ct
          ? ct.base === "custom"
            ? ct.ride
              ? nH(ct.ride)
              : _c
            : P1(ct.base)
          : _c;
      }
      if (/^c[0-9a-f]{24}$/.test(Y)) {
        let ct = Kot(Y.slice(1));
        return ct ? nH(ct) : us.custom?.spec || _c;
      }
      return us[Y]?.spec || _c;
    },
    ul = {
      get(Y) {
        if (Y?.startsWith("m:")) {
          let gt = p3(Y.slice(2));
          return gt ? Jo(gt.tune) : null;
        }
        let ct = Xs?.tune?.(Y);
        if (ct !== void 0) return Jo(ct);
        try {
          return Jo(JSON.parse(localStorage.getItem(eg) || "{}")[Y]?.tune);
        } catch {
          return null;
        }
      },
      set(Y, ct) {
        if (((ct = Jo(ct)), Y?.startsWith("m:"))) {
          (O9(Y.slice(2), { tune: ct }), Qn?.paintChanged?.());
          return;
        }
        try {
          let gt = JSON.parse(localStorage.getItem(eg) || "{}");
          ((gt[Y] = { ...(gt[Y] || {}), tune: ct, t: Date.now() }),
            localStorage.setItem(eg, JSON.stringify(gt)));
        } catch {}
        (Xs && Xs.setTune(Y, ct), Qn?.paintChanged?.());
      },
    },
    oH = (Y, ct = !1) => {
      let gt = ru();
      if (((Y = Jo(Y)), !ct)) {
        let Qt = dB(P1(gt), Y);
        ((Zt.S = Qt),
          Zt.nitro > (Qt.nitroMax ?? 1) && (Zt.nitro = Qt.nitroMax ?? 1),
          Ts?.setExhaust?.(Ist[lr(Y, "exhaust")]));
      }
      let St = n4(Y),
        Bt =
          !St.rim &&
          !St.size &&
          !St.side &&
          !St.dh &&
          !St.camF &&
          !St.camR &&
          !St.wing &&
          !St.width;
      try {
        i4(
          Et,
          Bt ? null : St,
          (window.__sf.garage?.isOpen
            ? window.__sf.garage.draft?.rim
            : lu.get(gt)?.rim) || null,
        );
      } catch (Qt) {
        console.warn("tune look", Qt);
      }
    },
    aH = (window.__sf.tuneCar = () => oH(ul.get(ru()))),
    dl = () => {
      (c0(Et, lu.get(ru())), aH());
    };
  ((window.__sf.paintCar = dl),
    dl(),
    Xs &&
      (Xs.onCustom = () => {
        (Pi?.isOpen || dl(), Qn?.paintChanged?.());
      }));
  let rH = !1,
    Pi = (window.__sf.garage = new LE({
      engine: {
        get: () => us.custom?.ride?.snd || null,
        auto: () => JN(),
        list: () => yE.map((Y) => [Y, Tc[Y].label]),
        set: (Y) => YN(Y, !0),
      },
      mb: z,
      scene: Yt,
      camera: Ne,
      v: Zt,
      car: () => Et,
      carId: () => Xot() || ru(),
      store: lu,
      toast: qn,
      night: () => ca[_t].night || 0,
      ride: u3,
      pick: Qo
        ? () => {
            (Pi.close(), Qo.open({ first: !Nc }));
          }
        : null,
      exit: (Y) => {
        if (Y === "drive") {
          (dl(),
            Qo?.isOpen && Qo.close(),
            Nc
              ? (document.body.classList.add("play"),
                Hn.set(!1),
                Ts?.resume?.())
              : ((Nc = !0), ag()));
          return;
        }
        (Y === "start" && !Nc) ||
          (Y === "picker"
            ? (document.body.classList.add("play"), Hn.set(!1), Ts?.resume?.())
            : (rH && document.body.classList.add("play"), Hn.set(!0)));
      },
    })),
    Fd = (Y, ct = "home") => {
      (Dr.event("garage_open", { from: String(Y || ""), mode: String(ct) }),
        (rH = Y === "pause" ? !0 : document.body.classList.contains("play")),
        Y === "pause" && (Hn.set(!1), Ts?.suspend()),
        Pi.open({ from: Y, mode: ct }));
    };
  ((window.__sf.openGarage = Fd),
    (Pi.fleetOf = () => us[Dn || "ferrari"] || null));
  let Yot = (window.__sf.tuning = new WE({
      garage: Pi,
      base: P1,
      store: ul,
      toast: qn,
      level: () => Pi.level?.() ?? 99,
      live: (Y, ct) => oH(Y, ct),
      wallet: () => (Xs?.ready ? Xs.wallet() : null),
      spend: (Y, ct) => !!Xs?.spend(Y, ct),
      savePaint: () => {
        if (!Pi.draft && !Pi.saved) return;
        let Y = or(Pi.draft);
        JSON.stringify(Y) !== JSON.stringify(Pi.saved) &&
          ((Pi.saved = Y), lu.set(ru(), Y));
      },
      drive: () => {
        (document.body.classList.add("play"), Hn.set(!1), Ts?.resume?.());
      },
      reopen: (Y) => Fd(Y === "picker" ? "picker" : "pause", "edit"),
      keyOf: (Y) =>
        Y === "custom"
          ? us.custom?.ride?.sha
            ? "c" + us.custom.ride.sha.slice(0, 24)
            : null
          : Y.startsWith("b:")
            ? ((ct) => (ct?.sha ? "c" + ct.sha.slice(0, 24) : null))(
                Vn.get(Y.slice(2))?.ride,
              )
            : Y,
    })),
    lH = "sf-drive.cars",
    sg = "sf-drive.thumbs",
    cH = "sf-drive.mine",
    cu = (Y, ct) => {
      try {
        return JSON.parse(localStorage.getItem(Y) || "null") ?? ct;
      } catch {
        return ct;
      }
    },
    g3 = (Y, ct) => {
      try {
        localStorage.setItem(Y, JSON.stringify(ct));
      } catch {}
    },
    Va = () => (Xs?.ready ? Xs.cars() : h4(cu(lH, []))),
    J4 = () => (Xs?.ready ? Xs.p.mine : cu(cH, null)),
    Od = (Y, ct) => {
      ((Y = h4(Y)),
        g3(lH, Y),
        ct !== void 0 && g3(cH, ct),
        Xs?.ready && Xs.setCars(Y, ct));
    };
  ((p3 = (Y) => Va().find((ct) => ct.id === Y) || null),
    (eH = J4),
    (iH = () => Va().map((Y) => Y.ride)),
    (O9 = (Y, ct) =>
      Od(
        Va().map((gt) => (gt.id === Y ? { ...gt, ...ct, t: Date.now() } : gt)),
      )));
  let hH = (Y) =>
      Y
        ? Y.kind === "fleet"
          ? Y.id
          : Y.kind === "mine"
            ? "m:" + Y.c.id
            : ((ct) => (ct?.sha ? "c" + ct.sha.slice(0, 24) : null))(
                Y.ride || Wf(Y.item),
              )
        : null,
    Jot = (Y, ct) => {
      c0(Et, Y);
      let gt = n4(ct),
        St =
          !gt.rim &&
          !gt.size &&
          !gt.side &&
          !gt.dh &&
          !gt.camF &&
          !gt.camR &&
          !gt.wing &&
          !gt.width;
      try {
        i4(Et, St ? null : gt, Y?.rim || null);
      } catch (Bt) {
        console.warn("look", Bt);
      }
    },
    Z4 = async (Y) => {
      if (((Y = Ul(Y)), !Y)) return !1;
      tg(Y);
      let ct = await Wh("custom");
      return (L9(), !!ct?.custom && ct.rideSha === Y.sha);
    },
    Q4 = "sf-drive.recent",
    B9 = (Y) => {
      if (!Y) return;
      let ct = cu(Q4, []).filter((gt) => typeof gt == "string" && gt !== Y);
      (ct.unshift(Y), g3(Q4, ct.slice(0, 12)));
    },
    t8 = (Y) =>
      Y
        ? [
            [Y.t100.toFixed(1) + " s", "0-100 km/h"],
            [String(Math.round(Y.top)), "km/h top"],
            [Y.g.toFixed(2) + " g", "grip"],
          ]
        : [];
  async function tat(Y) {
    if (Y.startsWith("m:")) {
      let ct = Va().find((gt) => gt.id === Y.slice(2));
      ct && (await Bd.preview({ kind: "mine", c: ct }));
      return;
    }
    if (Y.startsWith("b:")) {
      let ct = Vn.get(Y.slice(2));
      (ct?.ride && (await Z4(ct.ride)), dl());
      return;
    }
    (await Wh(Y), dl(), window.__sf.tuneCar?.());
  }
  ((tH = !0), (Pi.started = () => Nc));
  let Bd = {
    recent: () => {
      let Y = cu(Q4, []),
        ct = [];
      for (let gt of Y)
        if (
          (gt.startsWith("m:") || gt.startsWith("b:")
            ? ct.push(gt)
            : gt === "custom"
              ? us.custom?.ride && ct.push("r:" + us.custom.ride.sha)
              : ct.push("f:" + gt),
          gt.startsWith("b:"))
        ) {
          let St = Vn.get(gt.slice(2));
          St?.ride && ct.push("r:" + St.ride.sha);
        }
      return ct;
    },
    renameMine(Y, ct) {
      let gt = String(ct || "")
        .replace(/[\u0000-\u001f<>]/g, "")
        .trim()
        .slice(0, 28);
      gt && Od(Va().map((St) => (St.id === Y ? { ...St, name: gt } : St)));
    },
    setEngine: YN,
    engineAuto: JN,
    engine: () => (Dn === "custom" ? us.custom?.ride?.snd || null : void 0),
    current: () => ({ id: Dn, sha: Et?.rideSha || null, mine: J4() }),
    mine: Va,
    thumb: (Y) => cu(sg, {})[Y] || null,
    wallet: () => (Xs?.ready ? Xs.wallet() : null),
    spend: (Y, ct) => (Xs ? !!Xs.spend(Y, ct) : !0),
    level: () => Pi.level?.() ?? 99,
    car: () => Et,
    tuneOf: (Y) => ul.get(Y),
    toast: qn,
    look: Jot,
    baseTune: (Y) =>
      ul.get(
        Y?.kind === "fleet"
          ? Y.id
          : hH({ kind: "ride", ride: Y?.ride, item: Y?.item }),
      ),
    stats: (Y, ct, gt) => {
      try {
        let St = gt ? hH(gt) : Y;
        return !St || St === "custom"
          ? null
          : Pc(P1(St), gt ? ul.get(St) : (ct ?? ul.get(St)), St);
      } catch {
        return null;
      }
    },
    async preview(Y) {
      if (((m3 = Y.kind === "mine" ? Y.c.id : null), Y.kind === "fleet"))
        return (await Wh(Y.id), dl(), Dn === Y.id);
      if (Y.kind === "mine") {
        let ct = Y.c,
          gt =
            ct.base === "custom"
              ? await Z4(ct.ride)
              : (await Wh(ct.base), Dn === ct.base);
        return (gt && dl(), gt);
      }
      if (Y.kind === "ride") {
        let ct = Y.item ? await u3.preview(Y.item) : await Z4(Y.ride);
        return (ct && dl(), ct);
      }
      return !1;
    },
    drive(Y) {
      if (
        ((m3 = void 0),
        B9(
          Y.kind === "mine"
            ? "m:" + Y.c.id
            : Y.kind === "fleet"
              ? Y.id
              : (() => {
                  let ct = Y.ride?.sha || Y.item?.files?.glb?.sha256,
                    gt = ct && Vn.list().find((St) => St.ride?.sha === ct);
                  return gt ? "b:" + gt.id : "custom";
                })(),
        ),
        Y.kind === "mine")
      ) {
        let ct = Y.c;
        (ct.base === "custom" && u3.drive(ct.ride),
          Od(
            Va().map((St) => (St.id === ct.id ? { ...St, driven: !0 } : St)),
            ct.id,
          ),
          dl());
        return;
      }
      (Od(Va(), null), Y.kind === "ride" && u3.drive(Y.item || Y.ride), aH());
    },
    async retry(Y) {
      return (
        Et?.placeholder &&
          Et.rideSha &&
          (delete G["custom:" + Et.rideSha], (Et.rideSha = null)),
        Bd.preview(Y)
      );
    },
    async revert(Y) {
      m3 = void 0;
      let ct = Y.id === "custom" ? await Z4(qh()) : (await Wh(Y.id), !0);
      return (ct && dl(), ct);
    },
    saveMine(Y) {
      let ct = "b" + Date.now().toString(36),
        gt = {
          id: ct,
          name: Y.name,
          base: Y.base,
          ride:
            Y.base === "custom"
              ? ((St) => {
                  if (!St || !("snd" in Y)) return St;
                  let Bt = { ...St };
                  return (delete Bt.snd, Tc[Y.snd] && (Bt.snd = Y.snd), Bt);
                })(Y.ride || Wf(Y.item))
              : null,
          paint: Y.paint,
          tune: Y.tune,
          t: Date.now(),
          driven: !1,
        };
      (Od([...Va(), gt]), B9("m:" + ct));
      try {
        let St = window.__sf.capture?.();
        if (St) {
          let Bt = new Image();
          ((Bt.onload = () => {
            let Qt = document.createElement("canvas"),
              Ie = 480,
              Ee = 300,
              Ue = Math.min(Bt.width / 1.6, Bt.height) * 0.62,
              ws =
                Bt.width / 2 -
                Ue * 0.8 +
                (innerWidth > 760 ? -Bt.width * 0.08 : 0),
              fn = Bt.height * 0.42 - Ue / 2;
            ((Qt.width = Ie),
              (Qt.height = Ee),
              Qt.getContext("2d").drawImage(
                Bt,
                ws,
                fn,
                Ue * 1.6,
                Ue,
                0,
                0,
                Ie,
                Ee,
              ));
            let kn = cu(sg, {});
            kn[ct] = Qt.toDataURL("image/jpeg", 0.78);
            let Cn = Object.keys(kn);
            for (let Ae of Cn.slice(0, Math.max(0, Cn.length - 24)))
              delete kn[Ae];
            (g3(sg, kn), Pi.isOpen && Pi.render());
          }),
            (Bt.src = St));
        }
      } catch {}
      return gt;
    },
    removeMine(Y) {
      let ct = cu(sg, {});
      (delete ct[Y],
        g3(sg, ct),
        Od(
          Va().filter((gt) => gt.id !== Y),
          J4() === Y ? null : void 0,
        ));
    },
    editedMine() {},
  };
  ((window.__sf.home = new AE(Pi, Bd)), (window.__sf.creator = new UE(Pi, Bd)));
  let uH = (Y) => {
      let ct = Vn.making().filter((Bt) => Bt.prev !== Y.id),
        gt = ct[ct.length - 1];
      if (!gt) return null;
      let St = Wf(Y);
      return (
        Vn.update(gt.id, {
          status: "ready",
          t1: Date.now(),
          ride: St,
          item: {
            id: Y.id || "",
            name: Y.name || gt.name,
            sha: St?.sha || null,
            icon: St?.icon || null,
          },
        }),
        qn(
          "Your " + (Y.name || gt.name) + " is ready",
          "Drive it - it is in your Garage",
        ),
        gt
      );
    },
    N9 = (Y) => {
      if (!Y || Y.own || !Y.vehicle || !Y.files?.glb) return;
      let ct = uH(Y);
      if (ct) {
        window.__sf.home.latest = Y;
        let gt = window.__sf.home;
        Pi.isOpen && Pi.mode === "home" && ((gt.sec = "mine"), gt.render());
      } else window.__sf.home.offer(Y);
      (window.__sf.creator.offer(Y),
        !Pi.isOpen &&
          !ct &&
          qn(
            "Your mindblown car",
            (Y.name || "A new car") + " \xB7 in the Garage, mindblown row",
          ));
    };
  Bd.offerCar = N9;
  {
    let Y = Ns("spendCap"),
      ct = Ns("spendLife"),
      gt = () => {
        (Y && (Y.value = String(Ti.cap())),
          ct &&
            (ct.textContent =
              "AI on this game: " +
              Ti.lifeLine() +
              " \xB7 this session " +
              Ti.session() +
              " of " +
              Ti.cap() +
              ". mindblown does not show games your balance; it is on mindblown.ai."));
      };
    (Y?.addEventListener("change", () => Ti.setCap(+Y.value)), Ti.on(gt), gt());
  }
  (Xs && (Vn.bindProfile(Xs), Ti.bindProfile(Xs)),
    (window.__sf.builds = Vn),
    (window.__sf.spend = Ti));
  {
    let Y = document.createElement("button");
    ((Y.type = "button"),
      (Y.id = "buildChip"),
      (Y.className = "ds-panel"),
      aa("tl", Y, 9));
    let ct = () => {
      let gt = Vn.open(),
        St = gt.find((Qt) => Qt.status === "ready") || gt[gt.length - 1];
      if (((Y.hidden = !St), !St)) return;
      let Bt = St.status === "ready";
      (Y.classList.toggle("ready", Bt),
        (Y.innerHTML = `<i aria-hidden="true"></i><span><b>${Bt ? "Your " + Cot(St.name) + " is ready" : "Building your car"}</b><small>${Bt ? "Drive it" : Cot(YM(St.t0)) + " \xB7 Creating with mindblown\u2026"}</small></span>`));
    };
    (Y.addEventListener("click", (gt) => {
      gt.stopPropagation();
      let St = Vn.open(),
        Bt = St.find((Qt) => Qt.status === "ready") || St[St.length - 1];
      (Fd("pause"),
        Bt &&
          ((window.__sf.home.sec = "mine"),
          window.__sf.home.pick("b:" + Bt.id)));
    }),
      Vn.on(ct),
      setInterval(ct, 2e4),
      ct(),
      (window.__sf.buildChip = Y));
  }
  ((window.__sf.account = Do), kst(N9), rst());
  let sat = () =>
      [
        us.custom?.ride,
        qh(),
        ...Va().map((Y) => Y.ride),
        ...Vn.list().map((Y) => Y.ride),
      ].filter(Boolean),
    H9 = null;
  async function e8(Y) {
    if (!$n || !Y?.id || !Y.vehicle || !Y.files?.glb) return !1;
    let ct = Wf(Y);
    if (!ct) return !1;
    let gt = sat().find((St) => St.id === Y.id && St.sha !== ct.sha);
    if (!gt || H9 === ct.sha) return !!gt;
    H9 = ct.sha;
    try {
      gt.snd && !ct.snd && (ct.snd = gt.snd);
      let St = Y4("custom", gt.sha),
        Bt = Y4("custom", ct.sha);
      (!lu.get(Bt) && lu.get(St) && lu.set(Bt, lu.get(St)),
        !ul.get(Bt) && ul.get(St) && ul.set(Bt, ul.get(St)));
      let Qt = (Ee) =>
        Ee?.sha === gt.sha ? { ...Ee, ...ct, own: Ee.own ?? ct.own } : Ee;
      Va().some((Ee) => Ee.ride?.sha === gt.sha) &&
        Od(
          Va().map((Ee) =>
            Ee.ride?.sha === gt.sha ? { ...Ee, ride: Qt(Ee.ride) } : Ee,
          ),
        );
      for (let Ee of Vn.list())
        Ee.ride?.sha === gt.sha &&
          Vn.update(Ee.id, { ride: Qt(Ee.ride), item: Y });
      if (qh()?.sha === gt.sha) {
        try {
          localStorage.setItem($4, JSON.stringify(Qt(qh())));
        } catch {}
        Xs?.setRide?.(Qt(qh()));
      }
      let Ie = Dn === "custom" && Et?.rideSha === gt.sha;
      if ((us.custom?.ride?.sha === gt.sha && tg(Qt(us.custom.ride)), Ie)) {
        let Ee = { x: Zt.vel.x, y: Zt.vel.y, z: Zt.vel.z },
          Ue = Zt.r;
        (await Wh("custom"),
          Et?.rideSha === ct.sha &&
            ((Zt.vel.x = Ee.x),
            (Zt.vel.y = Ee.y),
            (Zt.vel.z = Ee.z),
            (Zt.r = Ue),
            dl(),
            L9()));
      }
      (Pi.isOpen && Pi.render(),
        Qo?.isOpen && Qo.render(),
        qn(
          "Your " + (ct.name || "car") + " was updated",
          "The new model from mindblown is in",
        ),
        (window.__sf.updates ||= []).push({
          id: Y.id,
          from: gt.sha,
          to: ct.sha,
          driving: Ie,
        }));
    } finally {
      H9 = null;
    }
    return !0;
  }
  window.__sf.itemUpdated = e8;
  {
    let Y = window.mindblown?.items;
    if (Y?.on)
      try {
        Y.on("car", async (ct) => {
          ct && !ct.own && !(await e8(ct)) && N9(ct);
        });
      } catch {}
    if (
      (Y?.get &&
        Y.get("car").then(
          async (ct) => {
            ct &&
              !ct.own &&
              ct.vehicle &&
              !(await e8(ct)) &&
              ((window.__sf.home.latest = ct), uH(ct));
          },
          () => {},
        ),
      Y?.get)
    ) {
      let ct = () => {
        document.hidden ||
          Y.get("car").then(
            (gt) => e8(gt),
            () => {},
          );
      };
      (setInterval(ct, 2e4),
        addEventListener("visibilitychange", () => {
          document.hidden || ct();
        }),
        addEventListener("focus", ct),
        (window.__sf.checkItems = ct));
    }
  }
  if (
    (Do.on((Y) => {
      (Y
        ? qn(
            "Signed in to mindblown",
            "@" +
              (Do.name() || "you") +
              " \xB7 your progress follows your account",
          )
        : qn(
            "Signed out of mindblown",
            "Playing as a guest \xB7 saved in this browser",
          ),
        Pi.isOpen && Pi.render());
    }),
    Qn &&
      (Qn.tuneVis = () => {
        let Y = ul.get(ru());
        return Y ? Ost(Y, Pc(P1(ru()), Y, ru()).k) : "";
      }),
    Qo)
  ) {
    let Y = Qo.open.bind(Qo);
    Qo.open = (ct) => {
      (Y(ct), Yot.badges(Qo.el));
    };
  }
  (Ns("garageBtn")?.addEventListener("click", () => Fd("pause")),
    ki &&
      ((ki.snap = (Y, ct) =>
        TM(it.data, it.layout, Y, ct, { r: 60, world: re })),
      (ki.onBusted = ({ fine: Y, spot: ct }) => {
        let gt = Xs
          ? Xs.fine(Y)
          : (() => {
              let St = Math.min(ki.bounty, Y);
              return ((ki.bounty -= St), St);
            })();
        return (
          (Zt.impact = 0),
          (Zt.impactT = 0),
          (Zt.vel.x = Zt.vel.z = 0),
          (Zt.r = 0),
          (Zt.nitro = Zt.S?.nitroMax ?? Zt.nitro),
          ct && !Un?.active && Ga.go({ ...ct, quiet: !0 }),
          gt
        );
      })));
  let D9 = (window.__sf.rewind = new xT(Zt)),
    dH = null;
  try {
    (!Zn || Ve.has("stuntstore")) && (dH = localStorage);
  } catch {}
  let Vr =
      it && !Ve.has("nostunts")
        ? (window.__sf.stunts = new vT(Zt, { store: dH }).snap(
            (Y, ct, gt) => it.layout.roadAt(Y, ct, gt),
            Ot,
            it.data.edges,
          ))
        : null,
    U9 = Vr
      ? (window.__sf.stuntMarks = new wT(Yt, Vr, (Y, ct) =>
          it.layout.driveHeight(Y, ct),
        ))
      : null,
    b3 = (window.__sf.stuntHud = new kT());
  (pi && Vr && (pi.pois = () => Vr.markers()),
    (b3.onDiscover = (Y, ct) =>
      qn(ql[Y.kind].label + " ahead", Y.name + "   " + ct)));
  let x3 = (window.__sf.skills = new Sv({
    L: it?.layout || null,
    cars: () => Se?.cars || null,
    police: () => (ki && D0 ? ki : null),
  }));
  vt && vt.useChain(x3);
  let pH = (window.__sf.skillHud = new HT()),
    s8 = 0;
  try {
    s8 = Math.max(0, +localStorage.getItem("sf-drive.xp") || 0);
  } catch {}
  let C1 = () => (Xs?.ready ? Xs.p.xp || 0 : s8),
    n8 = (window.__sf.wheelspin = new $T()),
    i8 = (window.__sf.sting = {
      n: 0,
      stunt(Y) {
        let ct = Ts;
        if (ct) {
          if ((this.n++, !Y.stars)) {
            ct.ui1("ui_click", 0.5);
            return;
          }
          (ct.ui1("fare_ding", 0.45 + 0.12 * Y.stars, 0.94 + 0.08 * Y.stars),
            Y.newBest &&
              Y.old &&
              setTimeout(() => Ts?.ui1("taxi_done", 0.55), 380));
        }
      },
      board(Y) {
        let ct = Ts;
        ct &&
          (this.n++,
          ct.at(
            Y.x,
            (Y.y ?? Zt.pos.y) + 1.2,
            Y.z,
            ct.pickName("crack"),
            1,
            0.9 + Math.random() * 0.15,
            12,
          ),
          ct.at(
            Y.x,
            (Y.y ?? Zt.pos.y) + 1,
            Y.z,
            ct.pickName("whoosh"),
            0.7,
            1.1,
            10,
          ),
          setTimeout(() => Ts?.ui1("fare_ding", 0.6, 1.05), 220));
      },
      level() {
        let Y = Ts;
        Y && (this.n++, Y.ui1(Y.pickName("bell"), 0.5));
      },
      landed(Y) {
        let ct = Ts;
        ct &&
          (this.n++,
          ct.ui1(
            Y.unlock ? "taxi_done" : "fare_ding",
            Y.unlock ? 0.7 : 0.6,
            Y.unlock ? 1 : 1.12,
          ));
      },
    });
  ((n8.onStart = () => i8.level()),
    (n8.onLand = (Y) => i8.landed(Y)),
    (n8.busy = () => {
      try {
        return !!(
          ki?.pursuit ||
          Un?.S ||
          Wr?.busy ||
          Math.hypot(Zt.vel.x, Zt.vel.z) > 22
        );
      } catch {
        return !1;
      }
    }),
    (Pi.level = () => Ah(C1()).level));
  let ng = (Y, ct) => {
    if (!(Y > 0)) return;
    let gt = Ah(C1()).level;
    if (Xs?.ready) Xs.addXP(Y);
    else {
      s8 += Y;
      try {
        (!Zn || Ve.has("stuntstore")) &&
          localStorage.setItem("sf-drive.xp", String(Math.round(s8)));
      } catch {}
    }
    let St = Ah(C1()).level;
    for (let Bt = gt + 1; Bt <= St; Bt++) {
      let Qt = fZ(Bt),
        Ie = !!Xs?.ready;
      (Ie && Qt.cash && Xs.prize(Qt.cash, "Level " + Bt + " wheelspin"),
        n8.show(Qt, { cashOK: Ie, next: hZ(Bt) }));
    }
    St > gt && Pi?.isOpen && Pi.render();
  };
  ((window.__sf.xp = C1),
    (window.__sf.addXP = ng),
    (window.__sf.toast = qn),
    (window.__sf.notify = dd),
    x3.on((Y) => {
      (Y.type === "bank" && ng(Y.pts, "skill chain"), pH.event(Y, C1()));
    }));
  let nat = 500;
  b3.onResult = (Y) => {
    let ct = Y.stars - Fc(Y.s, Y.old || 0);
    (ct > 0 && ng(ct * nat, ql[Y.s.kind].label), i8.stunt(Y));
  };
  let pl = Hn.prefs || z4(),
    mH = (Y) => {
      (document.body.classList.toggle("hud-min", Y === "min"),
        document.body.classList.toggle("hud-off", Y === "off"));
    },
    o8 = (Y) => {
      ((L1 = !!Y),
        U9 && (U9.group.visible = L1),
        pi && (pi.pois = Vr && L1 ? () => Vr.markers() : null),
        L1 || Vr?.cancel?.("off"));
    },
    L1 = !0;
  (mH(pl.hud),
    o8(pl.stunts !== "off"),
    Un && (Un.brakeLine = pl.brakeLine !== "off"),
    (Hn.hooks.onPref = (Y, ct) => {
      ((pl = { ...pl, [Y]: ct }),
        Y === "hud"
          ? mH(ct)
          : Y === "stunts"
            ? o8(ct !== "off")
            : Y === "brakeLine"
              ? Un && (Un.brakeLine = ct !== "off")
              : Y === "peds"
                ? qn(
                    "Pedestrians " + (ct === "off" ? "off" : "on"),
                    "On the next start",
                  )
                : bH());
    }),
    (window.__sf.setPref = (Y, ct) => Hn.setPref(Y, ct)));
  let jh =
    it && Ci && !Ve.has("nomeet")
      ? (window.__sf.meet = new A_({
          scene: Yt,
          world: re,
          L: it.layout,
          sampleAt: Ot,
          loadCar: tt,
          applyPaint: c0,
          poseCar: Ec,
          setLamps: xd,
          inst: () => [pt.inst, ue],
        }))
      : null;
  jh &&
    (jh.onSlots = (Y) => {
      let ct = bt.find((gt) => gt.name === "Car meet");
      ct && ((ct.x = Y.x), (ct.z = Y.z));
    });
  let gH = (window.__sf.cine = new jT(Ne, ui)),
    Nd = !1,
    G9 = (Y) => {
      ((Nd = !!Y),
        document.body.classList.toggle("cine", Nd),
        Nd ? gH.reset() : (ui.init = !1));
    };
  window.__sf.setCine = G9;
  let $h = (window.__sf.photo = new KT({
    camera: Ne,
    v: Zt,
    view: Ns("view"),
    canvas: _,
    capture: () => HH(),
    groundY: (Y, ct, gt) =>
      it ? it.layout.driveHeight(Y, ct, null, gt) : Wi(Y, ct),
    onOpen: () => {
      (Ts?.suspend(), fs.releaseGestures?.());
    },
    onClose: () => {
      (Ts?.resume(), (X9 = performance.now()));
    },
  }));
  Ns("photoBtn")?.addEventListener("click", () => {
    (Hn.set(!1),
      Un?.active ? qn("Photo mode", "Not during a race") : $h.open());
  });
  let Xl = jh
    ? (window.__sf.meetUi = new I_({
        meet: jh,
        v: Zt,
        fleet: us,
        photo: $h,
        addXP: ng,
        toast: qn,
        touch: Cd,
      }))
    : null;
  (Xl &&
    (Xl.onPhoto = () => {
      Un?.active || ($h.open(), Xl.aim());
    }),
    Xl &&
      ((Xl.mph = () => La),
      (Xl.events = () => {
        let Y = [];
        for (let ct of W9?.list() || []) {
          if (ct.isDone() || ct.id === "meet") continue;
          let gt = Math.hypot(ct.x - Zt.pos.x, ct.z - Zt.pos.z);
          if (gt < 60) continue;
          let St = ct.id.startsWith("r:") ? Un?.best?.(ct.id.slice(2)) : 0;
          Y.push({
            ...ct,
            d: gt,
            best: St
              ? Math.floor(St / 6e4) +
                ":" +
                ((St % 6e4) / 1e3).toFixed(2).padStart(5, "0")
              : "",
          });
        }
        return Y.sort((ct, gt) => ct.d - gt.d);
      }),
      (Xl.onEvent = (Y) => {
        if (Y.id.startsWith("r:") && Kl) {
          let ct = Ga.pick(Y.x, Y.z, 40);
          if (ct) {
            (Ga.go({ ...ct, quiet: !0 }),
              qn("Road race \xB7 " + Y.name, "At its start - E to race"));
            return;
          }
        }
        (W9?.focus(Y),
          qn(
            "What's next \xB7 " + Y.name,
            Y.label + " - its route on the map",
          ));
      })));
  let Kl = Un
      ? (window.__sf.raceStarts = new H_({ v: Zt, race: Un, touch: Cd }))
      : null,
    a8 = (window.__sf.rumble = new qT());
  bH();
  let xH = (Y) => {
      if (Zn && !Ve.has("stuntstore")) return null;
      try {
        return JSON.parse(localStorage.getItem(Y) || "null");
      } catch {
        return null;
      }
    },
    vH = (Y, ct) => {
      if (!(Zn && !Ve.has("stuntstore")))
        try {
          localStorage.setItem(Y, JSON.stringify(ct));
        } catch {}
    },
    ha = it ? (window.__sf.discovery = new UT(it.data, it.layout)) : null;
  ha && !Xs && ha.merge(xH("sf-drive.roads"));
  let Ma = it
      ? (window.__sf.boards = new GT(Zt, {
          got: Xs ? [] : xH("sf-drive.boards") || [],
        }).snap((Y, ct, gt) => it.layout.roadAt(Y, ct, gt), Ot))
      : null,
    V9 = Ma
      ? (window.__sf.boardMarks = new WT(Yt, Ma, (Y, ct) =>
          it.layout.driveHeight(Y, ct),
        ))
      : null,
    Wr = null,
    r8 = () => [
      ...(Nt
        ? [
            {
              x: Nt.x,
              z: Nt.z,
              kind: "loop",
              col: "#e0262b",
              name: "Roadster ramp",
              stars: 0,
            },
          ]
        : []),
      ...(Vr && L1 ? Vr.markers() : []),
      ...(Ma ? Ma.markers() : []),
      ...(jh ? [jh.marker()] : []),
      ...(Kl ? Kl.markers() : []),
    ];
  pi &&
    ((pi.discovery = ha),
    (pi.discLabel = () =>
      ha
        ? `${ha.pct.toFixed(1)} % of the roads discovered` +
          (Ma ? ` \xB7 boards ${Ma.count} / ${Ma.total}` : "")
        : ""),
    (pi.pois = () => (Wr ? Wr.pois(r8()) : r8())));
  let iat = o8;
  o8 = (Y) => {
    (iat(Y), pi && (pi.pois = () => (Wr ? Wr.pois(r8()) : r8())));
  };
  let yH = !Xs,
    wH = 0,
    oat = () => {
      if (!ha) return;
      let Y = Ns("discRoadsV"),
        ct = Ns("discBoardsV"),
        gt = Ns("discRoadsS");
      (Y && (Y.textContent = ha.pct.toFixed(1) + " %"),
        gt &&
          (gt.textContent = `${ha.km.toFixed(1)} of ${ha.totalKm.toFixed(0)} km \xB7 ${ha.doneN} of ${ha.count} streets \xB7 the map traces them`),
        ct && Ma && (ct.textContent = `${Ma.count} / ${Ma.total}`));
    };
  {
    let Y = Hn.onPause;
    Hn.onPause = () => {
      (Y?.(), oat());
    };
  }
  let aat = (Y, ct) => {
      if (ha) {
        if (!yH && Xs?.ready) {
          ((yH = !0), ha.merge(Xs.p.roads), Ma?.add(Xs.p.boards));
          for (let gt of Ma?.got || []) {
            let St = V9?.items.get(gt);
            St && (St.G.visible = !1);
          }
        }
        ha.update(Y, Zt, ct);
        for (let gt of ha.events.splice(0))
          ha.doneN % 25 === 0 &&
            qn(
              "Roads discovered",
              `${ha.pct.toFixed(1)} % \xB7 ${ha.doneN} streets`,
            );
        if (
          ((wH -= Y) <= 0 &&
            ha.dirty &&
            ((wH = 10),
            (ha.dirty = !1),
            Xs?.ready
              ? Xs.setRoads(ha.pack())
              : Xs || vH("sf-drive.roads", ha.pack())),
          Ma)
        ) {
          Ma.update(Y, ct);
          for (let gt of Ma.events.splice(0))
            (V9?.smash(gt.b, Zt.vel.x, Zt.vel.z),
              i8.board(gt.b),
              ng(
                gt.xp,
                gt.b.kind === "travel" ? "Fast-travel board" : "XP board",
              ),
              qn(
                (gt.b.kind === "travel" ? "Fast-travel board" : "XP board") +
                  " \xB7 " +
                  gt.b.name,
                `+${gt.xp.toLocaleString()} XP \xB7 ${gt.n} of ${gt.of} boards`,
                "",
                { pri: 2, col: p1[gt.b.kind] },
              ),
              Xs?.ready
                ? Xs.addBoard(gt.b.id)
                : Xs || vH("sf-drive.boards", [...Ma.got]));
        }
      }
    },
    W9 = (window.__sf.nextUp = new YT({
      v: Zt,
      stunts: Vr,
      boards: Ma,
      router: F0,
      unproject: G5,
      map: pi,
      KINDS: ql,
      COLS: p1,
      mph: () => La,
      extra: () => [
        ...(Kl ? Kl.candidates() : []),
        ...(jh
          ? [
              {
                id: "meet",
                x: Ci.x,
                z: Ci.z,
                kind: "meet",
                label: "Car meet",
                name: Ci.name,
                col: "#ff2fa0",
                glyph: "\u2605",
                isDone: () => !!Xl?.paid,
              },
            ]
          : []),
        ...(Wr ? Wr.candidates() : []),
      ],
    })),
    I1 = it ? new Qf(Yt, "PoiBeacons") : null;
  if (I1) {
    for (let Y of Kl?.list || [])
      Y.bc = I1.add({
        x: Y.x,
        y: it.layout.driveHeight(Y.x, Y.z),
        z: Y.z,
        kind: "race",
        h: 60,
      });
    jh &&
      I1.add({
        x: Ci.x,
        y: it.layout.driveHeight(Ci.x, Ci.z),
        z: Ci.z,
        kind: "meet",
        h: 60,
      });
  }
  let q9 = (Y, ct) => {
      let gt = ql[Y.kind];
      return gt.unit === "km/h" && La
        ? Math.round(ct / 1.609344) + " MPH"
        : String(yT(Y, ct)).replace(/\.0$/, "") + " " + gt.unit.toUpperCase();
    },
    rat = () => {
      let Y = [];
      if (Vr && L1)
        for (let ct of Vr.list) {
          let gt = ct.gates[0],
            St = Vr.best[ct.id] || 0;
          Y.push({
            id: "s:" + ct.id,
            x: gt.x,
            z: gt.z,
            kind: ct.kind,
            name: ct.name,
            r: ct.kind === "jump" ? 220 : 180,
            stars: () => (St ? Fc(ct, St) : 0),
            line: () =>
              St
                ? "BEST " + q9(ct, St)
                : "STARS AT " +
                  ct.stars
                    .map((Bt) => q9(ct, Bt).split(" ")[0])
                    .join(" \xB7 ") +
                  " " +
                  q9(ct, ct.stars[0]).split(" ")[1],
          });
        }
      if (Ma)
        for (let ct of Ma.list)
          Ma.got.has(ct.id) ||
            Y.push({
              id: "b:" + ct.id,
              x: ct.x,
              z: ct.z,
              kind: ct.kind,
              name: ct.name,
              r: 150,
              line: () =>
                ct.kind === "travel"
                  ? "SMASH IT \xB7 FAST TRAVEL HERE LATER"
                  : "SMASH IT \xB7 +1,500 XP",
            });
      for (let ct of Kl?.list || []) {
        let gt = Un?.best?.(ct.id);
        Y.push({
          id: "r:" + ct.id,
          x: ct.x,
          z: ct.z,
          kind: "race",
          name: ct.name,
          r: 130,
          line: () =>
            gt
              ? "BEST " +
                (Math.floor(gt / 6e4) +
                  ":" +
                  ((gt % 6e4) / 1e3).toFixed(2).padStart(5, "0"))
              : "STOP AT THE START TO RACE",
        });
      }
      return (
        jh &&
          Y.push({
            id: "meet",
            x: Ci.x,
            z: Ci.z,
            kind: "meet",
            name: Ci.name,
            r: 130,
            line: () => "STOP BY A SHOW CAR \xB7 INSPECT \xB7 PHOTO",
          }),
        Wr && Y.push(...Wr.poiItems()),
        Y
      );
    },
    lat = (window.__sf.poiCard = new MT({
      v: Zt,
      camera: Ne,
      mph: () => La,
      list: rat,
    })),
    MH = () =>
      !!(vt && Sr && ["ride", "boarding", "alighting"].includes(vt.state));
  if (it && $n && (Xs || Ve.has("challenges")) && !Ve.has("nochallenges"))
    try {
      Wr = window.__sf.challenges = Kit({
        THREE: cs,
        scene: Yt,
        camera: Ne,
        v: Zt,
        R: it,
        router: F0,
        profile: Xs,
        map: pi,
        stunts: Vr,
        stuntHud: b3,
        boards: Ma,
        raceStarts: Kl,
        race: Un,
        skills: x3,
        photo: $h,
        tele: Ga,
        toast: qn,
        touch: Cd,
        police: () => (ki && D0 ? ki : null),
        trafficOn: () => H0,
        auto: () => Mn.mode === "l5" && !Mn.takeover,
        garage: () => Pi,
        openGarage: () => Fd("pause"),
        faresOn: () => !!(nu && Sr),
        setFares: (Y) => F9(Y),
        rideBusy: MH,
        rides: () => vt,
        graceOff: () => {
          og = 0;
        },
        addXP: (Y, ct) => ng(Y, ct),
        xp: () => C1(),
        sting: (Y, ct = 0) => {
          let gt = Ts;
          gt &&
            (Y === "result"
              ? (gt.ui1("fare_ding", 0.5 + 0.1 * ct, 0.94 + 0.08 * ct),
                ct === 3 && setTimeout(() => Ts?.ui1("taxi_done", 0.55), 380))
              : Y === "stop" || Y === "cp"
                ? gt.ui1("fare_ding", 0.35, 1.25)
                : gt.ui1("ui_click", 0.6));
        },
      });
    } catch (Y) {
      console.warn("challenges", Y);
    }
  let cat = 2.5,
    ig = document.createElement("div");
  ((ig.id = "stuckHint"),
    (ig.className = "ds-panel ds-prompt ds-pop"),
    ig.style.setProperty("--c", "var(--warn)"),
    aa("bc", ig, 2));
  let v3 = 0;
  dd._toastEl();
  for (let [Y, ct] of [
    ["brakeCue", -1],
    ["drift", 4],
    ["taxiPen", 5],
  ])
    Ns(Y) && aa("lane", Ns(Y), ct);
  ig.innerHTML = Cd
    ? '<span class="ds-eyebrow">Stuck?</span><span>Menu: back on the road</span><span>Hold \u27F2 to rewind</span>'
    : '<span class="ds-eyebrow">Stuck?</span><span><span class="ds-key">R</span> back on the road</span><span><span class="ds-key">Backspace</span> hold to rewind</span>';
  let hat = (window.__sf.radar = new DT(() => {
    let Y = [];
    if (ki && D0) {
      for (let gt of Se.cars)
        gt.cop &&
          Y.push({
            x: gt.x,
            z: gt.z,
            psi: Math.atan2(-(gt.fx || 0), -(gt.fz || 0)),
            kind: "cop",
          });
      let ct = Se.heliMark;
      ct && Y.push({ x: ct.x, z: ct.z, kind: "heli" });
    }
    for (let ct of Un?.S?.bots || [])
      ct.car &&
        ct.pose &&
        Y.push({
          x: ct.pose.pos.x,
          z: ct.pose.pos.z,
          psi: ct.pose.psi,
          kind: "rival",
        });
    if (Qn?.remotes)
      for (let ct of Qn.remotes.values())
        ct.drawn &&
          Y.push({
            x: ct.pose.pos.x,
            z: ct.pose.pos.z,
            psi: ct.pose.psi,
            kind: Un?.active ? "rival" : "mate",
            col: ct.col,
          });
    return Y;
  }));
  (Ns("tRw")?.addEventListener("pointerdown", (Y) => {
    (Y.preventDefault(), (fs.touch.rw = 1));
  }),
    Ns("tLift")?.addEventListener("pointerdown", (Y) => {
      (Y.preventDefault(), Y.stopPropagation(), (fs.touch.lift = 1));
    }));
  for (let Y of ["pointerup", "pointercancel", "pointerleave"])
    Ns("tLift")?.addEventListener(Y, () => {
      fs.touch.lift = 0;
    });
  Ns("tFlip")?.addEventListener("pointerdown", (Y) => {
    (Y.preventDefault(), Y.stopPropagation(), (fs.touch.flip = 1));
  });
  for (let Y of ["pointerup", "pointercancel", "pointerleave"])
    Ns("tFlip")?.addEventListener(Y, () => {
      fs.touch.flip = 0;
    });
  for (let Y of ["pointerup", "pointercancel", "pointerleave"])
    Ns("tRw")?.addEventListener(Y, () => {
      fs.touch.rw = 0;
    });
  let y3 = (window.__sf.intro = new r9({
      touch: Cd,
      taxi: $n,
      done: () => (Hn.prefs || z4()).introDone === "1",
      setDone: () => Hn.setPref("introDone", "1"),
    })),
    w3 = -1,
    SH = 0;
  Ns("introBtn")?.addEventListener("click", () => {
    (Hn.set(!1), y3.start(!0));
  });
  let fat = 45,
    kH = 120,
    og = 0,
    j9 = !1,
    zH = !1,
    _H = () => {
      if (!Se?.cars) return 0;
      let Y = 0;
      for (let ct = Se.cars.length - 1; ct >= 0; ct--) {
        let gt = Se.cars[ct];
        gt.cop ||
          gt.cable ||
          gt.net ||
          gt.remote ||
          (Math.hypot(gt.x - Zt.pos.x, gt.z - Zt.pos.z) < fat &&
            (Se.cars.splice(ct, 1), Y++));
      }
      return Y;
    },
    EH = () => {
      (Zn && !Ve.has("fresh")) || (_H(), (j9 = !0), (og = kH));
    };
  window.__sf.startFresh = EH;
  let ag = () => {
      (Ns("title").classList.add("gone"), document.body.classList.add("play"));
      try {
        (TH(), Ts.drive());
      } catch (Y) {
        console.warn(Y);
      }
      ($n
        ? qn(us[Dn].name + " \xB7 Taxi", "Your first fare is waiting")
        : qn(ca[_t].name, "California St \xB7 Nob Hill"),
        Got(),
        Xs?.arrive({ skipPlace: !0, skipCar: !0 }),
        EH(),
        (w3 = 2.5),
        Dr.start({
          device: bn
            ? "mobile"
            : matchMedia?.("(pointer: coarse)").matches
              ? "touch"
              : "desktop",
          quality: E,
          tier: B,
          car: $n ? Dn : _t,
          mode: $n ? "taxi" : "free",
          mp: !!Qn,
          width: innerWidth,
          returning: !!Xs?.ready,
        }));
    },
    l8 = () => {
      if (!document.body.classList.contains("play"))
        try {
          TH().title();
        } catch (Y) {
          console.warn(Y);
        }
      (removeEventListener("pointerdown", l8),
        removeEventListener("keydown", l8));
    };
  (addEventListener("pointerdown", l8),
    addEventListener("keydown", l8),
    addEventListener(
      "touchend",
      () => {
        Ts && Ts.ctx.state !== "running" && Ts.ctx.resume().catch(() => {});
      },
      { passive: !0 },
    ),
    jN.addEventListener("click", ag),
    addEventListener("keydown", (Y) => {
      Nc &&
        !Qo?.isOpen &&
        !document.body.classList.contains("play") &&
        (Y.code === "Enter" || Y.code === "Space" || Y.code === "KeyW") &&
        ag();
    }),
    Ns("tMenu")?.addEventListener("click", () => {
      (fs.releaseGestures?.(), Hn.set(!0));
    }));
  for (let Y of document.querySelectorAll("#pause [data-act]"))
    Y.addEventListener("click", () => {
      (Hn.set(!1), fs.actions.add(Y.dataset.act));
    });
  ((Hn.hooks = {
    ...Hn.hooks,
    tod: () => _t,
    setTod: (Y) => {
      ca[Y] && Y !== _t && Jt(Y);
    },
    mph: () => La,
    setMph: (Y) => {
      ((La = !!Y), BT(La ? "mph" : "kmh"));
    },
    units: () => aN(),
    setUnits: (Y) => {
      (BT(Y), (La = NT()));
    },
    mp: () => Qn,
    cam: () => ui.mode,
    setCam: (Y) => {
      ((ui.mode = Y), (ui.init = !1));
    },
  }),
    vt &&
      ((vt.env = { cars: () => Se?.cars || null, police: () => ki || null }),
      (Hn.hooks.rideStyle = () => vt.style),
      (Hn.hooks.setRideStyle = (Y) => {
        (vt.setStyle(Y),
          OT(Y),
          Xs &&
            ((Xs.p.settings = { ...Xs.p.settings, rideStyle: vt.style }),
            Xs.save(!0)));
      }),
      (window.__sf.setRideStyle = (Y) => (
        Hn.hooks.setRideStyle(Y),
        Hn.sync(),
        vt.style
      ))),
    Xs &&
      (Xs.onSettings = (Y) => {
        (Y.rideStyle && vt && (vt.setStyle(Y.rideStyle), OT(vt.style)),
          Y.store?.["sf-drive.units"] !== void 0 || typeof Y.mph != "boolean"
            ? (La = NT())
            : (La = Y.mph));
        let ct = k4();
        (Object.assign(Zt.assists, ct.assists), (Zt.manual = ct.manual));
        try {
          let St = +JSON.parse(
            localStorage.getItem("sf-drive.settings") || "{}",
          )?.fps;
          St && (globalThis.SF_FPS = St);
        } catch {}
        let gt = (St) =>
          Y.store?.[St] === void 0 ? null : Y.store[St] !== "off";
        if (!Zn && !Un?.active && !Qn?.inRoom) {
          let St = gt("sf-drive.traffic"),
            Bt = gt("sf-drive.parked");
          (St !== null && St !== H0 && A1(St, !1),
            Bt !== null && Bt !== d0 && d3(Bt, !1));
        }
        if (!Zn) {
          let St = gt("sf-drive.police");
          St !== null && St !== D0 && X4(St, !1);
        }
        Hn.sync();
      }),
    (Ns("help").onclick = () => document.body.classList.remove("help")),
    Zn && ag());
  let uat = {
      saver: "safe",
      mobile: "mobile",
      perf: "desktop",
      high: "desktop",
      ultra: "desktop",
    },
    dat = {
      saver: "perf",
      mobile: "perf",
      perf: "perf",
      high: "high",
      ultra: "ultra",
    };
  window.__sf.applyGfx = RH;
  let AH = () =>
      B === "desktop"
        ? E === "perf"
          ? 0.55
          : Math.max(0.55, 0.85 * C)
        : Math.min(C, 0.2 * L),
    rg = 0,
    PH = (Y) => {
      ((rg = Y),
        (z.ssr = Y >= 1 || E === "perf" || Ve.has("nossr") ? !1 : void 0),
        (z.planarEnabled = Y >= 1 ? !1 : void 0),
        (z.nearShadow = Y >= 2 ? !1 : void 0),
        (z.ao = Y >= 2 || Ve.has("noao") ? !1 : void 0));
    },
    CH = (window.__sf.autoGfx = new zT({
      mb: z,
      apply: (Y) => {
        let ct = RH(Y);
        return (Hn.syncGfx?.(), ct);
      },
      toast: (Y, ct) => qn(Y, ct),
      atFloor: () => H <= AH() * 1.05 || Ve.has("res") || Ve.has("size"),
      playing: () =>
        document.body.classList.contains("play") && !Hn.paused && !pi?.open,
      test: Zn,
      force: Ve.has("autogfx"),
      noBench: Ve.has("nobench"),
    }));
  window.__sf.analytics = Dr;
  let $9 = null,
    c8 = 1 / 120,
    pat = new lT(),
    lg = 0,
    X9 = performance.now(),
    K9 = 0,
    h8 = 0,
    Y9 = (window.__sf.auto = { on: !1, input: null }),
    LH = new fe(),
    J9 = 0,
    Z9 = 0,
    Xh = 0,
    IH = 0,
    FH = -1e9,
    f8 = !1,
    OH = !1;
  navigator
    .getBattery?.()
    .then((Y) => {
      let ct = () => {
        OH = !Y.charging;
      };
      (ct(), Y.addEventListener("chargingchange", ct));
    })
    .catch(() => {});
  let BH = new Set();
  (requestAnimationFrame(NH),
    it && (z.reflectFilter = Gkt(it.data.terrain.sea, M3)),
    it &&
      !Ve.has("noshore") &&
      setTimeout(() => {
        ((wt = dW(it.data, bn ? { cell: 6 } : void 0)),
          wt && console.log(`shore field ${wt.w}x${wt.h} in ${wt.ms} ms`));
      }, 300));
  let HH = () => (z.render(Yt, Ne), _.toDataURL("image/jpeg", 0.9));
  if (v) {
    let Y = {
        lombard_gg: [-122.4187, 37.8021],
        waterfront: [-122.4169, 37.8081],
        pier39: [-122.4098, 37.8087],
        fortmason: [-122.4316, 37.8066],
      },
      ct = {};
    for (let [Qt, [Ie, Ee]] of Object.entries(Y)) ct[Qt] = ji(Ie, Ee);
    let gt = [
        /\/(asphalt|sidewalk|decals)/,
        /\/(fronts_|office)/,
        /\/(ground_|stucco|brick|siding|concrete|roof)/,
        /\/tex\/lm\/skyline\//,
      ],
      St = (Qt) => {
        let Ie = (Qt.match(/\/tex\/lm\/([^/]+)\//) || [])[1],
          Ee = ct[Ie],
          Ue = gt.findIndex((ws) => ws.test(Qt));
        return Ue >= 0
          ? Ue * 1e6 + (/_(n|mask)\./.test(Qt) ? 5e5 : 0)
          : Ie
            ? Ee
              ? 5e6 + Math.hypot(Ee[0] - Zt.pos.x, Ee[1] - Zt.pos.z)
              : 9e6
            : 4e6;
      },
      Bt = performance.now();
    (QG(St).then(() =>
      console.log(
        `deferred images in: ${d7().done} in ${Math.round(performance.now() - Bt)} ms after READY`,
      ),
    ),
      (window.__sf.deferAt = ct));
  }
  if (
    ((window.__sf.chars = Ea),
    (Ea.onBump = (Y, ct) => {
      if (ct.player) {
        let gt = 0.97 - 0.05 * Y;
        ((Zt.vel.x *= gt), (Zt.vel.z *= gt));
      }
      if (Ts && Math.hypot(ct.x - Zt.pos.x, ct.z - Zt.pos.z) < 60) {
        let gt = ["ev_bump", "cc_bump", "ct_bump"].find((St) => Ts.buf?.[St]);
        gt
          ? Ts.var(
              gt,
              (0.16 + 0.3 * Y) * (ct.player ? 1 : 0.5),
              0.8 + Math.random() * 0.15,
            )
          : Ts.fetch1?.("ev_bump");
      }
    }),
    (window.__sf.charsLineup = (Y) => {
      let ct = lit(Y);
      return (Yt.add(ct.group), z.prewarm?.(ct.group), ct);
    }),
    (window.__sf.deferStats = d7),
    (window.__sf.camVibe = Gh),
    (window.__sf.camLeaf = E1),
    (window.__sf.imagesRequested = YG),
    Object.assign(window.__sf, {
      da: Mn,
      guide: fl,
      PRESETS: ca,
      setLamps: xd,
      poseCar: Ec,
      loadFleetCar: $n ? X : null,
      mb: z,
      scene: Yt,
      camera: Ne,
      v: Zt,
      car: Et,
      carId: Dn,
      swapCar: Wh,
      world: re,
      cc: ui,
      city: pt,
      real: it,
      spawnOn: Yp,
      setTime: Jt,
      input: fs,
      capture: HH,
      traffic: Se,
      pm: Hn,
      map: pi,
      brk: hs,
      props: Gt,
      peds: te,
      taxi: Bc,
      rides: vt,
      mode: $n ? "waymo" : "free",
      variant: nu ? "taxi" : "sfdrive",
      ready: !0,
    }),
    it &&
      On("landmarks") &&
      !Ve.has("nolm") &&
      !Ve.has("nowf") &&
      !Ve.has("nop39") &&
      setTimeout(() => {
        try {
          if (
            (tl.start({
              D: it.data,
              L: it.layout,
              scene: Yt,
              mobile: B !== "desktop",
              mb: z,
              pedTex: i0()
                ? null
                : e0("assets/tex/peds.webp", (Y) => {
                    ((Y.colorSpace = Je), (Y.flipY = !1), (Y.anisotropy = 8));
                  }),
            }),
            tl.near)
          )
            for (let Y of [tl.near, tl.far, tl.crowd.group])
              (z.prewarm?.(Y), z.upload?.(Y));
          ((window.__sf.pier39 = tl),
            tl.crowd && !o3
              ? (tl.crowd.group.visible = !1)
              : tl.crowd && Mn.env.peds.push(tl.crowd.people));
        } catch (Y) {
          console.error("pier 39:", Y);
        }
      }, 600),
    it &&
      On("landmarks") &&
      !Ve.has("nolm") &&
      !Ve.has("nowf") &&
      !Ve.has("nofm") &&
      setTimeout(() => {
        try {
          if (
            (vp.start({
              D: it.data,
              L: it.layout,
              scene: Yt,
              mobile: B !== "desktop",
              mb: z,
            }),
            vp.near)
          )
            for (let Y of [vp.near, vp.far]) (z.prewarm?.(Y), z.upload?.(Y));
          window.__sf.fortMason = vp;
        } catch (Y) {
          console.error("fort mason:", Y);
        }
      }, 750),
    it &&
      On("landmarks") &&
      !Ve.has("nolm") &&
      !Ve.has("nolw") &&
      setTimeout(() => {
        try {
          Fl.start({
            scene: Yt,
            mobile: B !== "desktop",
            mb: z,
            pedTex: i0()
              ? null
              : e0("assets/tex/peds.webp", (Y) => {
                  ((Y.colorSpace = Je), (Y.flipY = !1), (Y.anisotropy = 8));
                }),
            buildPlants: (Y) => {
              let ct = ev(
                Y,
                st,
                null,
                (gt, St) => it.layout.driveHeight(gt, St),
                Gt.userData.K,
              );
              for (
                ct.userData.cull(
                  Ne.position.x,
                  Ne.position.z,
                  420,
                  Ne.position.y,
                );
                ct.userData.step();
              );
              return (Pd(ct), ct);
            },
          });
          for (let Y of [Fl.near, Fl.far, Fl.plantsRoot, Fl.crowd?.group])
            Y && (z.prewarm?.(Y), z.upload?.(Y));
          (!o3 && Fl.crowd?.group && (Fl.crowd.group.visible = !1),
            (window.__sf.lombardWalks = Fl));
        } catch (Y) {
          console.error("lombard walks:", Y);
        }
      }, 900),
    lt &&
      setTimeout(
        () =>
          Promise.all([bo("assets/real/sky_field.bin"), ht])
            .then(([Y]) => {
              if (!lt.meta) return;
              (WV(lt, _a(Y)), z.setSkyField(P7(lt)));
              let ct = it?.skyFieldIn?.() || 0;
              console.log("sky field in: " + ct + " chunks' roads to refine");
            })
            .catch((Y) => console.warn("sky_field.bin:", Y)),
        50,
      ),
    it && !Ve.has("nodress2"))
  ) {
    let Y = (St) => {
        let Bt = St.P[0],
          Qt = St.P[1];
        for (let [Ie, Ee] of Object.entries(z0)) {
          let Ue = Ee.bounds;
          if (Bt >= Ue.x0 && Bt <= Ue.x1 && Qt >= Ue.z0 && Qt <= Ue.z1)
            return Ie;
        }
        return "";
      },
      ct = new Map();
    for (let St of it.data.edges)
      if (St.name && Zit.has(St.name) && St.car !== !1 && !St.inner) {
        let Bt = Y(St);
        (ct.get(Bt) || ct.set(Bt, []).get(Bt)).push(St);
      }
    let gt = (St) => {
      let Bt = Qit(ct.get(St) || [], (Qt, Ie) => it.layout.terrainAt(Qt, Ie), {
        mobile: bn,
      });
      if (Bt.group.children.length) {
        for (let Qt of Bt.colliders) re.index(Qt);
        (Pd(Bt.group),
          z.prewarm?.(Bt.group),
          Yt.add(Bt.group),
          z.upload?.(Bt.group),
          (window.__sf.roadDress ||= []).push({
            region: St || "city",
            ...Bt.stats,
            colliders: Bt.colliders.length,
          }),
          console.log(
            `road dressing ${St || "city"}: ${Bt.stats.roads} roads, ${Math.round(Bt.stats.railM)} m of guardrail, ${Bt.stats.chevrons} chevrons, ${Bt.stats.delineators} delineators`,
          ));
      }
    };
    setTimeout(
      () => {
        gt("");
        for (let St of ct.keys())
          if (St) {
            let Bt = () => {
              let Qt = Q2.get(St);
              Qt ? Qt.then(() => gt(St)) : setTimeout(Bt, 1500);
            };
            Bt();
          }
      },
      Zn ? 200 : 2500,
    );
  }
  it?.billboards &&
    setTimeout(
      () =>
        it.billboards.load("assets/tex/", (Y) => {
          try {
            z._texture(Y);
          } catch {}
        }),
      400,
    );
} catch (o) {
  _1(o);
}
