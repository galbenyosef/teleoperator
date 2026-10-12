// app 409 — math
// Lines 198788-204118 of readable/app.pretty.js (statement-aligned).
try {
  let Dn = function (J, ht) {
      let mt = Hn[Xs] || Hn.noon,
        Et = NM(ht);
      (Object.assign(J.params, {
        haze: 2.5 + 5 * ht.haze,
        wind: mt.wind,
        fetch: 3e4,
        choppiness: 1.15,
        gain: (ht.oceanGain ?? 1.8) * (xn && ht.night > 0.5 ? 0.45 : 1),
        coverage: 0.3,
        waterColor: mt.water,
        foam: mt.foam,
        shoreFoam: mt.shore ?? (mt.foam > 1 ? 1 : mt.foam + 0.1),
        glitter: mt.glitter ?? 1,
      }),
        (J.scene = je.has("physsea")
          ? null
          : {
              on: !0,
              sun: ht.sun.map((Ht) => Ht * ht.sunI * (ht.sunEl > 0 ? 1 : 0)),
              dir: [Et.x, Et.y, Et.z],
            }),
        (J.skip = J.scene ? { clouds: !0, env: !0 } : null),
        ot &&
          kR() &&
          ((J.bayLights ||= { ...kR() }),
          (J.bayLights.on = ht.night > 0.3),
          (J.bayLights.gain = 18 * ht.night)));
    },
    St = function () {
      if (
        (Ge.attach(zt),
        zt.root.traverse((ht) => {
          ht.isMesh && (ht.userData.mbMover = !0);
        }),
        ai && ot && zt.materials)
      )
        for (let ht of Object.values(zt.materials))
          ht.userData.mbSkyVis === void 0 && (ht.userData.mbSkyVis = 2);
      let J = zt.fleet?.hl || [0.62, 0.62, -2.05];
      kt.forEach((ht, mt) => {
        let Et = (mt ? 1 : -1) * J[0];
        (ht.position.set(Et, J[1], J[2]),
          ht.target.position.set(Et * 0.4, 0, -22),
          zt.model.add(ht, ht.target));
      });
    },
    Rt = function (J) {
      if (J < 0.5) {
        Gt && (Gt.visible = !1);
        return;
      }
      if (!Gt) {
        let ht = wt.filter((fs) => fs.k > 0.6),
          mt = ht.length,
          Et = new Float32Array(mt * 18 * 3),
          Ht = new Float32Array(mt * 18 * 4),
          oe = [
            [1, 0, 0],
            [-0.5, 0, 0.866],
            [-0.5, 0, -0.866],
            [0, 1, 0],
            [0, -1, 0],
          ],
          He = [
            [0, 3, 1],
            [1, 3, 2],
            [2, 3, 0],
            [1, 4, 0],
            [2, 4, 1],
            [0, 4, 2],
          ],
          ve = 0,
          ts = 0;
        for (let fs of ht) {
          let Bn = Math.abs(
              (Math.sin(fs.x * 12.9898 + fs.z * 78.233) * 43758.5453) % 1,
            ),
            Zi = fs.k < 1 ? pt : Bn < 0.35 ? ge : Qt,
            Eo = 0.7 + 0.5 * fs.k;
          for (let qo of He)
            for (let Er of qo) {
              let Xa = oe[Er];
              ((Et[ve++] = fs.x + Xa[0] * Eo),
                (Et[ve++] = fs.y + Xa[1] * Eo * 0.7),
                (Et[ve++] = fs.z + Xa[2] * Eo),
                (Ht[ts++] = Zi.r),
                (Ht[ts++] = Zi.g),
                (Ht[ts++] = Zi.b),
                (Ht[ts++] = 1));
            }
        }
        let ds = new De();
        (ds.setAttribute("position", new Te(Et, 3)),
          ds.setAttribute("color", new Te(Ht, 4)),
          ds.computeVertexNormals(),
          ds.computeBoundingSphere());
        let Me = new Xi(new Uint8Array([255, 255, 255, 255]), 1, 1);
        Me.needsUpdate = !0;
        let ms = new Ee({
          color: new $t(0, 0, 1),
          map: Me,
          vertexColors: !0,
          alphaTest: 0.5,
          roughness: 1,
        });
        ((ms.userData.mbAlbedo = Bt),
          (Gt = new _e(ds, ms)),
          (Gt.name = "farLamps"),
          (Gt.userData.mbNoReflect = !0),
          (Gt.castShadow = Gt.receiveShadow = !1),
          (Gt.frustumCulled = !1),
          Nt.add(Gt));
      }
      (Gt.material.color.setRGB(0, 0, J), (Gt.visible = !!_._hookPipe(Bt)));
    },
    Pe = function (J) {
      ((Vt = J), Rt(J));
      for (let ht of _t) ht.visible = J > 0.2;
      for (let ht of kt) ((ht.visible = J > 0.2), (ht.intensity = J * 60));
      for (let ht of Ft) ht.visible = !1;
    },
    bs = function () {
      if (Vt < 0.2) return;
      {
        let Ht = zt.model.matrixWorld.elements,
          oe = Math.hypot(Ht[8], Ht[9], Ht[10]) || 1,
          He = Math.asin(Math.max(-1, Math.min(1, -Ht[9] / oe)));
        for (let ve of kt) ve.userData.mbBeamPitch = He;
      }
      let J = Ue.position.x,
        ht = Ue.position.z,
        mt = [];
      for (let Ht of we.cars) {
        if (Ht.wreck || Ht.cable) continue;
        let oe = -Math.sin(Ht.heading),
          He = -Math.cos(Ht.heading),
          ve = Math.hypot(Ht.x + oe * 10 - J, Ht.z + He * 10 - ht);
        ve < 80 && mt.push([ve, Ht]);
      }
      mt.sort((Ht, oe) => Ht[0] - oe[0]);
      let Et = mt[Ft.length]?.[0] ?? 80;
      Ft.forEach((Ht, oe) => {
        let He = mt[oe];
        if (((Ht.visible = !!He), !He)) return;
        let ve = He[1],
          ts = -Math.sin(ve.heading),
          ds = -Math.cos(ve.heading),
          Me = (ve.y ?? 0) + 0.75,
          ms = ve.V.L / 2 + 0.1,
          fs = Math.tan(ve.pitch || 0);
        (Ht.position.set(ve.x + ts * ms, Me + ms * fs, ve.z + ds * ms),
          Ht.target.position.set(
            ve.x + ts * (ms + 18) - ds * 1.6,
            Me - 1.9 + (ms + 18) * fs,
            ve.z + ds * (ms + 18) + ts * 1.6,
          ),
          Ht.target.updateMatrixWorld(),
          (Ht.userData.mbBeamPitch = ve.pitch || 0));
        let Bn = Jt.pos.x - Ht.position.x,
          Zi = Jt.pos.z - Ht.position.z,
          Eo = Bn * ts + Zi * ds,
          qo = Math.abs(Bn * ds - Zi * ts),
          Er =
            Eo > -1 && Eo < 22 && qo < 2.2 + 0.06 * Math.max(0, Eo)
              ? Math.min(1, Math.max(0.08, (Eo - 1.5) / 20))
              : 1,
          Xa =
            Math.min(1, Math.max(0, (Et - He[0]) / 10)) *
            (1 - Math.min(1, Math.max(0, (He[0] - 55) / 25)));
        Ht.intensity = 30 * Vt * Er * Xa;
      });
    },
    Xe = function (J) {
      Se();
      let ht = ha[Xs].glowFill;
      if (Vt < 0.2 || !ht?.h) {
        _.glowFall = null;
        return;
      }
      let mt = ot ? ot.layout.driveHeight(Ue.position.x, Ue.position.z) : 0;
      ((Ts =
        Ts === null || Math.abs(mt - Ts) > 40
          ? mt
          : Ts + (mt - Ts) * Math.min(1, J * 1.5)),
        (_.glowFall = { y: Ts, h: ht.h, floor: ht.floor ?? 0 }));
    },
    pn = function () {
      if (Vt < 0.2) return;
      let J = Ue.position.x,
        ht = Ue.position.z,
        mt = Ue.getWorldDirection(le),
        Et = wt
          .filter(
            (ds) =>
              !ds.prop.broken &&
              Math.abs(ds.x - J) < 220 &&
              Math.abs(ds.z - ht) < 220,
          )
          .map((ds) => {
            let Me = ds.x - J,
              ms = ds.z - ht,
              fs = Me * Me + ms * ms,
              Bn = Me * mt.x + ms * mt.z;
            return [ds, fs * (Bn < -12 ? 3 : 1) * (ds.k < 0.6 ? 1.6 : 1)];
          })
          .sort((ds, Me) => ds[1] - Me[1])
          .slice(0, ie),
        Ht = Et.length >= ie ? Math.sqrt(Et[Et.length - 1][1]) : 1e9;
      Et.forEach(([ds, Me], ms) => {
        let fs = _t[ms],
          Bn = (Math.sin(ds.x * 12.9898 + ds.z * 78.233) * 43758.5453) % 1;
        (fs.position.copy(ds),
          fs.target.position.set(ds.x, ds.y - 8, ds.z),
          fs.target.updateMatrixWorld());
        let Zi = Math.min(1, Math.max(0, (Ht - Math.sqrt(Me)) / (0.3 * Ht)));
        (fs.color.copy(ds.k < 1 ? pt : Math.abs(Bn) < 0.35 ? ge : Qt),
          (fs.intensity = te.i * Vt * ds.k * Zi * Zi * (3 - 2 * Zi)),
          (fs.visible = fs.intensity > 0),
          (fs.distance = ds.k < 1 ? 28 : 38),
          (fs.userData.mbStreetLamp = ds.arm
            ? {
                k: te.bw,
                shield:
                  Math.atan2(Math.cos(ds.prop.rot), Math.sin(ds.prop.rot)) ||
                  1e-4,
              }
            : { k: te.bw * 0.6, shield: 0 }));
      });
      for (let ds = Et.length; ds < _t.length; ds++)
        ((_t[ds].intensity = 0), (_t[ds].visible = !1));
      let oe = -1,
        He = -1,
        ve = 1225,
        ts = 1225;
      (!xn &&
        !Mf &&
        E !== "perf" &&
        !je.has("nolampsh") &&
        Et.forEach(([ds], Me) => {
          if (ds.k < 0.6 || _t[Me].intensity < te.i * Vt * 0.3) return;
          let ms = (ds.x - Jt.pos.x) ** 2 + (ds.z - Jt.pos.z) ** 2;
          ms < ve
            ? ((ts = ve), (He = oe), (ve = ms), (oe = Me))
            : ms < ts && ((ts = ms), (He = Me));
        }),
        _t.forEach((ds, Me) => {
          ds.castShadow = Me === oe || (Me === He && E === "ultra");
        }));
    },
    lr = function () {
      let J = innerWidth,
        ht = innerHeight,
        mt = J,
        Et = ht,
        Ht = H;
      (je.has("size") &&
        (([mt, Et] = je.get("size").split("x").map(Number)), (Ht = 1)),
        _.setDrawingBufferSize(mt, Et, Ht),
        (Ue.aspect = mt / Et),
        Ue.updateProjectionMatrix());
    },
    kst = function (J) {
      let ht = ta ? Jt.kmh / 1.609 : Jt.kmh;
      if (
        (gv("spd", String(Math.round(ht)).padStart(3, "0")),
        gv("unit", ta ? "MPH" : "KM/H"),
        ai && !jw.has(Jn))
      ) {
        gv("gear", Jt.reverse ? "R" : "D");
        let oe = Jt.S,
          He = oe.torque
            ? Math.min(
                1,
                (Jt.throttle *
                  oe.torque(Math.max(Jt.rpm, 1)) *
                  Math.max(Jt.rpm, 1)) /
                  9.5493 /
                  31e4,
              )
            : 0,
          ve = Jt.reverse
            ? 0
            : Math.min(
                1,
                ((1 - Jt.throttle) * Math.min(1, Jt.kmh / 35) * 0.75 +
                  Jt.brake * 0.25) *
                  (Jt.speed > 1 ? 1 : 0),
              );
        ((rT += (He - rT) * Math.min(1, J * 10)),
          (aT += (ve - aT) * Math.min(1, J * 8)),
          DM("rpm", (100 - rT * 100).toFixed(1)),
          DM("nos", (100 - aT * 100).toFixed(1)));
      } else
        (gv("gear", Jt.reverse ? "R" : Jt.gear),
          DM("rpm", (100 - Math.min(1, Jt.rpm / oT) * 100).toFixed(1)),
          DM("nos", (100 - Jt.nitro * 100).toFixed(1)),
          jp("hud").classList.toggle("hot", Jt.rpm > 8e3 && !Jt.reverse));
      let mt = Jt.forward(),
        Et,
        Ht = "";
      if (ot) {
        if ((BN -= J) <= 0) {
          BN = 0.25;
          let oe = ot.layout.streetInfo(
            Jt.pos.x,
            Jt.pos.z,
            mt.x,
            mt.z,
            Jt.pos.y,
          );
          ((ON = yI(oe.name)),
            (HN = oe.next ? "NEXT \xB7 " + yI(oe.next) : ""));
          let He = Qet(Jt.pos.x, Jt.pos.z)
            .toLowerCase()
            .replace(/(^|[\s-])\S/g, (ve) => ve.toUpperCase())
            .replace(/\bSoma\b/, "SoMa")
            .replace(/\bNopa\b/, "NoPa");
          He !== DN && ((DN = He), (Js("wHood").textContent = He));
        }
        ((Et = ON), (Ht = HN));
      } else {
        let oe = g4(Jt.pos.x),
          He = b4(Jt.pos.z),
          ve = Math.abs(Jt.pos.x - ae[oe]),
          ts = Math.abs(Jt.pos.z - fe[He]),
          ds = ve < ts,
          Me = Hi(Jt.pos.x, Jt.pos.z),
          ms = Me ? yN(Me, mt.x, mt.z) : null;
        if (((Et = ms ? ms[0] : ds ? ls[oe].name : Qe[He].name), ms))
          Ht = ms[1];
        else if (ds) {
          let fs =
            mt.z < 0
              ? [...fe.keys()].reverse().find((Bn) => fe[Bn] < Jt.pos.z - 2)
              : [...fe.keys()].find((Bn) => fe[Bn] > Jt.pos.z + 2);
          fs != null && (Ht = "NEXT \xB7 " + Qe[fs].name);
        } else {
          let fs =
            mt.x > 0
              ? [...ae.keys()].find((Bn) => ae[Bn] > Jt.pos.x + 2)
              : [...ae.keys()].reverse().find((Bn) => ae[Bn] < Jt.pos.x - 2);
          fs != null && (Ht = "NEXT \xB7 " + ls[fs].name);
        }
      }
      (Et !== NN && ((NN = Et), (Js("wSt").textContent = Et)),
        gv("wX", Ht),
        jp("drift").classList.toggle("on", Jt.drift > 0.4 && Jt.speed > 12));
      {
        let oe =
          Ns.mode !== "manual" &&
          Ns.mode !== "l5" &&
          Ns.cue?.state === "brake" &&
          document.body.classList.contains("play");
        Qu.brake !== oe &&
          ((Qu.brake = oe), jp("brakeCue")?.classList.toggle("on", oe));
      }
      {
        let oe = Ns.mode,
          He = oe !== "manual",
          ve = !!Ns.takeover,
          ts = oe === "l5",
          ds = He && !ts && Ns.active > 0.25,
          Me = ts && Ns.state === "driving",
          ms = ts && !!Ns.boost,
          fs =
            oe +
            (ds ? "a" : "") +
            (Me ? "d" : "") +
            (ve ? "t" : "") +
            (Ns.profile || "") +
            (ms ? "B" : "");
        if (Qu.da !== fs) {
          Qu.da = fs;
          let Bn = ts && Ns.profile === "madmax",
            Zi = He
              ? oe.toUpperCase() + (ms ? " BOOST" : Bn ? " MAX" : "")
              : "MAN",
            Eo = ve
              ? "Taken over: I or a tap - L5 again"
              : (Fm[oe]?.name || "") +
                (ts
                  ? " \xB7 " +
                    (ms
                      ? "Boost (the gas held: faster, still avoiding)"
                      : Ns.prof?.name || "Mad Max") +
                    (Me ? " \xB7 driving" : " \xB7 waiting")
                  : ds
                    ? " \xB7 guiding"
                    : "");
          for (let [qo, Er] of [
            ["aDA", "aDAl"],
            ["tDA", "tDAl"],
          ]) {
            let Xa = jp(qo);
            if (!Xa) continue;
            (Xa.classList.toggle("on", He),
              Xa.classList.toggle("boost", ms),
              Xa.classList.toggle("act", ds),
              Xa.classList.toggle("drive", Me),
              Xa.classList.toggle("take", ve),
              (Xa.title = Eo));
            let id = jp(Er);
            id && (id.textContent = Zi);
          }
        }
      }
      if (
        (In.hud() && Zn("Downshift blocked", "It would over-rev"),
        xn && ++Mst & 1 ? (lT += J) : (ri.update(J + lT), (lT = 0)),
        Yu)
      ) {
        let oe = String(Math.round(ht));
        _f.s !== oe && ((_f.s = oe), (Js("tSpdV").textContent = oe));
        let He = ta ? "MPH" : "KM/H";
        _f.u !== He && ((_f.u = He), (Js("tSpdU").textContent = He));
        let ve = Jt.reverse
          ? "R"
          : (Jt.S.gears?.length || 1) < 2
            ? "D"
            : String(Jt.gear);
        _f.g !== ve && ((_f.g = ve), (Js("tGear").textContent = ve));
        let ts = _f.d ? Jt.kmh > 4 : Jt.kmh > 9;
        ts !== _f.d &&
          ((_f.d = ts), document.body.classList.toggle("driving", ts));
      }
    },
    _st = function () {
      if (!Yu || ki) return;
      let J = 0;
      try {
        ((J = +localStorage.getItem("sf-drive.gestureHint") || 0),
          localStorage.setItem("sf-drive.gestureHint", String(J + 1)));
      } catch {}
      if (J >= 2) return;
      let ht = Js("gHint");
      (setTimeout(() => ht.classList.add("on"), 600),
        setTimeout(() => ht.classList.remove("on"), 6500));
    },
    WM = function (J) {
      if (J === "custom" && cs.custom?.ride) {
        let ht = ec[cT(cs.custom.ride)];
        return {
          id: ht.audio,
          virt: ht.ice,
          ice: ht.ice,
          snd: cT(cs.custom.ride),
        };
      }
      return { id: J || "ferrari", virt: !1, ice: jw.has(J) };
    },
    XN = function (J, ht = !1) {
      let mt = cs.custom;
      if (Jn !== "custom" || !mt?.ride) return;
      let Et = { ...mt.ride };
      if (
        (J && ec[J] ? (Et.snd = J) : delete Et.snd,
        Et.snd === mt.ride.snd || ((mt.ride = Et), hT(), !ht))
      )
        return;
      let Ht = (oe) => {
        if (oe?.sha !== Et.sha) return oe;
        let He = { ...oe };
        return (Et.snd ? (He.snd = Et.snd) : delete He.snd, He);
      };
      if (bh()?.sha === Et.sha) {
        let oe = Ht(bh());
        try {
          localStorage.setItem(qM, JSON.stringify(oe));
        } catch {}
        Ks?.setRide?.(oe);
      }
      Pa().some((oe) => oe.ride?.sha === Et.sha) &&
        ed(
          Pa().map((oe) =>
            oe.ride?.sha === Et.sha ? { ...oe, ride: Ht(oe.ride) } : oe,
          ),
        );
      for (let oe of Nn.list())
        oe.ride?.sha === Et.sha && Nn.update(oe.id, { ride: Ht(oe.ride) });
    },
    f2 = function (J) {
      return (
        (J = vl(J)),
        J
          ? ((cs.custom = zz(J, null)), Wo?.setCustom?.(cs.custom), cs.custom)
          : null
      );
    },
    Fst = function (J) {
      let ht = Af(d2, {});
      if (J.startsWith("m:")) {
        let Ht = Pa().find((ve) => ve.id === J.slice(2));
        if (!Ht) return null;
        let oe = Ht.base !== "custom" ? cs[Ht.base] : null,
          He = null;
        try {
          He = oe
            ? ic($p(Ht.base), Ht.tune, Ht.base)
            : Ht.ride
              ? ic($x(Ht.ride.vehicle), Ht.tune, "custom")
              : null;
        } catch {}
        return {
          key: J,
          name: Ht.name,
          tag: Ht.base === "custom" ? "Made with AI" : "Your build",
          sub: oe
            ? "on the " + oe.name
            : Ht.ride?.name || "Made with mindblown",
          thumb: ht[Ht.id] || Ht.ride?.icon || null,
          F: oe,
          stats: JM(He),
          acc: "#b98cff",
        };
      }
      if (J.startsWith("b:")) {
        let Ht = Nn.get(J.slice(2));
        if (!Ht?.ride || !(Ht.status === "ready" || Ht.status === "driven"))
          return null;
        let oe = null;
        try {
          oe = ic($x(Ht.ride.vehicle), null, "custom");
        } catch {}
        return {
          key: J,
          name: Ht.name || Ht.ride.name,
          tag: "Made with AI",
          sub: "Made with mindblown",
          thumb: Ht.item?.files?.icon?.url || Ht.ride.icon || Ht.thumb || null,
          stats: JM(oe),
          acc: "#b98cff",
        };
      }
      if (J === "custom") {
        let Ht = cs.custom?.ride;
        if (!Ht) return null;
        let oe = null;
        try {
          oe = ic($x(Ht.vehicle), U0.get($M("custom", Ht.sha)), "custom");
        } catch {}
        return {
          key: J,
          name: Ht.name,
          tag: Ht.own ? "Your mindblown car" : "From mindblown",
          sub: "Made with mindblown",
          thumb: Ht.icon || null,
          stats: JM(oe),
          acc: "#b98cff",
        };
      }
      let mt = cs[J];
      if (!mt || J === "custom") return null;
      let Et = null;
      try {
        Et = ic($p(J), U0.get(J), J);
      } catch {}
      return {
        key: J,
        name: mt.name,
        tag: mt.maker,
        sub: mt.model,
        F: mt,
        stats: JM(Et),
        acc: mt.accent,
      };
    },
    Nst = function () {
      let J = [],
        ht = new Set(),
        mt = (Et) => {
          if (!Et || ht.has(Et) || J.length >= 3) return;
          let Ht = Fst(Et);
          Ht && (J.push(Ht), ht.add(Et));
        };
      mt(cB());
      for (let Et of Af(YM, [])) mt(Et);
      for (let Et of Pa().slice().reverse()) mt("m:" + Et.id);
      for (let Et of ["waymo", "ferrari", "cybertruck", "cybercab", "corvette"])
        mt(Et);
      return J;
    },
    cB = function () {
      if (!ZN) return Jn;
      let J = XM(),
        ht = J && Pa().find((mt) => mt.id === J);
      if (
        ht &&
        ht.base === Jn &&
        (Jn !== "custom" || ht.ride?.sha === zt?.rideSha)
      )
        return "m:" + ht.id;
      if (Jn === "custom") {
        let mt = Nn.list().find(
          (Et) =>
            Et.ride?.sha === zt?.rideSha &&
            (Et.status === "ready" || Et.status === "driven"),
        );
        return mt ? "b:" + mt.id : "custom";
      }
      return Jn;
    },
    Ost = function (J) {
      if ((pT(J), J.startsWith("m:"))) {
        let ht = Pa().find((mt) => mt.id === J.slice(2));
        ht && sd.drive({ kind: "mine", c: ht });
        return;
      }
      if (J.startsWith("b:")) {
        let ht = Nn.get(J.slice(2));
        ht?.ride &&
          (Nn.update(ht.id, { status: "driven" }),
          sd.drive({ kind: "ride", ride: ht.ride }));
        return;
      }
      sd.drive(
        J === "custom" && cs.custom?.ride
          ? { kind: "ride", ride: cs.custom.ride }
          : { kind: "fleet", id: J },
      );
    },
    gB = function () {
      ((n4.on = W0.rumble !== "off"), n4.on || n4.stop());
      let J = (ht, mt) => (Number.isFinite(+ht) ? +ht : mt);
      ((Ln.padCurve =
        2.2 - (1.6 * Math.max(0, Math.min(100, J(W0.steerSens, 50)))) / 100),
        (Ln.padDZ = Math.max(0, Math.min(0.3, J(W0.deadzone, 12) / 100))),
        (Ci.fovAdd = Math.max(-10, Math.min(20, J(W0.fovAdd, 0)))));
    },
    EB = function () {
      if (hn) return hn;
      let J = WM(Jn);
      ((hn = new $z("assets/", {
        mobile: xn,
        ev: ai && !J.ice,
        vehicle: J.id,
        virt: J.virt,
      })),
        (window.__sf.audio = hn),
        window.__sf.tuneCar?.());
      let ht = re.onProp;
      return (
        ht &&
          (re.onProp = (mt, Et, Ht) => {
            let oe = ht(mt, Et, Ht);
            return (
              oe &&
                hn.prop(
                  mt.prop.kind,
                  mt.x,
                  Et.pos.y,
                  mt.z,
                  Math.min(1, Math.hypot(Et.vel.x, Et.vel.z) / 25),
                ),
              oe
            );
          }),
        hn
      );
    },
    TB = function (J) {
      let ht = Kst[J] || B;
      ((E = Yst[J] || E),
        (B = ht),
        (globalThis.SF_Q = E),
        (P = F(ht, E)),
        (H = N(ht, E, P)),
        (ci = qn = 0),
        (_.ssr = E === "perf" || je.has("nossr") ? !1 : void 0),
        (_.ssrDistance = E === "ultra" ? 160 : 90));
      let mt =
        ht === "safe"
          ? 512
          : ht === "mobile"
            ? 1024
            : E === "perf"
              ? 2048
              : 4096;
      if (
        ((globalThis.MB_SHADOW_RES = mt),
        _.setShadowRes?.(mt),
        (ns.castShadow =
          ht !== "safe" && !je.has("noshadow") && ha[Xs].sunEl > 0),
        I(ht !== "desktop"),
        lr(),
        (x2 = 0),
        (we.cablePer = ht === "desktop" ? 4 : 2),
        !je.has("notraffic"))
      ) {
        we.max = pe(ht);
        let Ht = Ue.position.x,
          oe = Ue.position.z,
          He = we.cars
            .filter((ve) => !ve.cable && !ve.bus && !ve.net)
            .sort(
              (ve, ts) =>
                Math.hypot(ts.x - Ht, ts.z - oe) -
                Math.hypot(ve.x - Ht, ve.z - oe),
            );
        for (
          let ve = 0, ts = we.cars.length - we.max;
          ve < ts && ve < He.length;
          ve++
        )
          we.cars.splice(we.cars.indexOf(He[ve]), 1);
      }
      zT = 0;
      let Et = !1;
      try {
        Et =
          JSON.parse(localStorage.getItem("sf-drive.settings") || "{}").fps !=
          null;
      } catch {}
      return (
        !Et &&
          !je.has("fps") &&
          (globalThis.SF_FPS = ht === "desktop" ? 60 : 30),
        xn || Kt(Xs, !0),
        ht !== globalThis.SF_TIER
      );
    },
    FB = function (J) {
      if (iT || (requestAnimationFrame(FB), window.__sf.freeze)) return;
      {
        let Me = J - LB;
        ((LB = J),
          Me > 2 &&
            Me < 70 &&
            (yh =
              !yh || Me < yh * 0.8
                ? Me
                : Me < yh * 1.25
                  ? yh + (Me - yh) * 0.05
                  : yh));
      }
      let ht = globalThis.SF_FPS | 0;
      if (
        ht > 0 &&
        yh > 0 &&
        J - IB < (Math.max(1, Math.floor(1e3 / ht / yh + 0.25)) - 0.5) * yh
      )
        return;
      if (((IB = J), Qs.length)) {
        let Me = performance.now();
        do {
          let ms = Qs.pop();
          try {
            _._texture(ms);
          } catch {}
        } while (Qs.length && performance.now() - Me < 3);
      }
      let mt = Math.min(0.05, Jst.step((J - ST) / 1e3));
      if (
        ((ST = J),
        Ln.take("pause") && !Wo?.isOpen && !vi?.isOpen && In.toggle(),
        Ln.take("photo") &&
          !In.paused &&
          !ri.open &&
          !Wo?.isOpen &&
          document.body.classList.contains("play") &&
          (Gn?.active
            ? Zn("Photo mode", "Not during a race")
            : (vh.open(), Tl?.aim())),
        vh.on)
      ) {
        (vh.frame(mt), _.render(Nt, Ue));
        return;
      }
      if (In.paused || ri.open) return;
      let Et = Zr.step(mt);
      if (
        (Ln.take("shiftUp") && Jt.shift(1),
        Ln.take("shiftDown") && Jt.shift(-1),
        Gn?.active && Ln.take("reset"))
      )
        Gn.reset();
      else if (ot && Ln.take("reset")) {
        let Me = ot.layout.roadAt(Jt.pos.x, Jt.pos.z, 150, Jt.pos.y),
          ms = Jt.forward();
        if (Me) {
          let fs = zx(
            ot.data,
            ot.layout,
            Me.E.name,
            Jt.pos.x,
            Jt.pos.z,
            ms.x,
            ms.z,
          );
          (Jt.place(fs[0], fs[1], fs[2]),
            Zn("Back on the road", "", "", { key: "road" }));
        }
      } else if (Ln.take("reset")) {
        let Me = g4(Jt.pos.x),
          ms = b4(Jt.pos.z);
        (Math.abs(Jt.pos.x - ae[Me]) < Math.abs(Jt.pos.z - fe[ms])
          ? Jt.place(
              ae[Me] + 2.5,
              Jt.pos.z,
              Math.round(Jt.psi / Math.PI) * Math.PI,
            )
          : Jt.place(
              Jt.pos.x,
              fe[ms] + 2.5,
              Jt.psi > 0 ? Math.PI / 2 : -Math.PI / 2,
            ),
          Zn("Back on the road"));
      }
      if (
        (Ln.take("camera") &&
          (Ns.mode === "l5" && !Ns.takeover
            ? (xT(!nd),
              Zn(
                nd ? "Cinematic camera" : Ci.modeName,
                nd ? "C: back to " + Ci.modeName : "",
                "",
                { key: "cam" },
              ))
            : (Ci.next(), Zn(Ci.modeName, "", "", { key: "cam" }))),
        Ln.take("help") && document.body.classList.toggle("help"),
        Ln.take("mute") && hn && hn.mute(!hn.muted),
        Ln.take("music") && hn && hn.next(),
        Ln.take("radio") && hn)
      ) {
        let Me = hn.cycleStation();
        (Me === "Off" || !hn.driving) &&
          Zn(
            Me === "Off" ? "Radio off" : Me,
            Me === "Off"
              ? "the city's own sound \xB7 L: back on"
              : "Radio \xB7 L: next station",
            ai ? "music" : "",
            { key: "music" },
          );
      }
      if (
        (Ln.take("units") && ((ta = !ta), bE(ta ? "mph" : "kmh")),
        Ln.take("assist"))
      ) {
        let Me = Ns.takeover,
          ms = In.cycleAssist();
        Me || rr(ms);
      }
      (Ln.take("time") && Kt(Gp[(Gp.indexOf(Xs) + 1) % Gp.length]),
        (Ln.kmh = Jt.kmh));
      let Ht = _T.on && _T.input ? _T.input : Ln.read();
      (document.body.classList.contains("play") ||
        ((Ht.throttle = 0), (Ht.brake = 0), (Ht.steer = 0)),
        po?.hold > 0 &&
          ((Ht.throttle = 0), (Ht.brake = 1), (Ht.steer = 0), (Ht.nitro = 0)),
        Gn && (Gn.rawThr = Ht.throttle || 0),
        Gn?.frozen &&
          ((Ht.throttle = 0),
          (Ht.brake = 0),
          (Ht.steer = 0),
          (Ht.handbrake = 1)),
        we.update(mt, Jt, re, document.body.classList.contains("play") || ki),
        (re.dynamic = Qn ? Qn.merge(we.colliders) : we.colliders),
        Gn && (re.dynamic = Gn.merge(re.dynamic)),
        (Jt.holdStop = !!(
          vt &&
          cr &&
          (vt.state === "boarding" || vt.state === "alighting")
        )),
        (zv += mt));
      let oe = document.body.classList.contains("play") || ki,
        He = fB.update(
          mt,
          !!Ht.rewind,
          oe && !Gn?.active && !Et && !(po?.hold > 0) && !Wo?.isOpen,
          oe && !Et,
        );
      for (He && (zv = 0); zv >= r4;)
        (Jt.step(r4, Et ? Zr.input : Ht, re), Et && Zr.pin(), (zv -= r4));
      (_r?.update(mt, Kp && oe && !Gn?.active && !Et && !He && !(po?.hold > 0)),
        Wst(mt, oe && !Gn?.active && !Et && !He));
      {
        let Me = Ns.mode === "l5" && !Ns.takeover,
          ms =
            ((Ht.throttle || 0) > 0.3 && !Me) || (Me && (Ns.stuckT || 0) > 0.5),
          fs = () => {
            let Bn = Jt.forward();
            for (let Zi of we?.cars || []) {
              let Eo = Zi.x - Jt.pos.x,
                qo = Zi.z - Jt.pos.z,
                Er = Eo * Bn.x + qo * Bn.z;
              if (
                Er > 0 &&
                Er < 9 &&
                Math.abs(Eo * Bn.z - qo * Bn.x) < 2 &&
                Math.abs((Zi.y ?? Jt.pos.y) - Jt.pos.y) < 2.5
              )
                return !0;
            }
            return !1;
          };
        ((kv =
          oe &&
          !Gn?.frozen &&
          !Et &&
          !He &&
          !(po?.hold > 0) &&
          ms &&
          Jt.speed < 0.8 &&
          (Me || !fs())
            ? kv + mt
            : 0),
          m2.classList.toggle("on", kv > Vst && !Me),
          Me &&
            kv > 6 &&
            ((kv = 0),
            Ln.actions.add("reset"),
            Zn("Level 5", "Held up - back on the road")));
      }
      (_v >= 0 &&
        (_v -= mt) < 0 &&
        (Ks && !Ks.ready && MB < 6
          ? ((_v = 0.5), (MB += 0.5))
          : (!ki || je.has("intro")) && o4.start()),
        o4.update(mt),
        xh?.update(Jt));
      {
        let Me =
            oe && !Gn?.active && !Et && !He && !In.paused && !ri.open && !vh.on,
          ms = Tl?.update(Me);
        (Al?.update(Me && !ms),
          zr?.update(mt, Me && !ms && !Al?.near && !Zr.on, {
            hits: re.hits,
            hide: !!Gn?.active,
            playing: oe,
          }),
          Ln.take("inspect") &&
            (Tl?.car ? Tl.inspect() : Al?.near ? Al.start() : zr?.inspect()));
      }
      (yT.update(
        mt,
        oe &&
          !Gn?.active &&
          !(ai && cr && (!zr || wB())) &&
          !zr?.active &&
          !vh.on &&
          W0.guide !== "off" &&
          (!ki || je.has("nextup")),
      ),
        jst.update(
          mt,
          oe &&
            !Gn?.active &&
            !zr?.active &&
            !zr?.near &&
            !vh.on &&
            !In.paused &&
            !ri.open &&
            !document.body.classList.contains("stLive") &&
            !Js("taxiCard")?.classList.contains("on") &&
            !Js("taxiTrip")?.classList.contains("on"),
        ),
        Sv.update(
          mt,
          Jt,
          re.hits,
          oe && !Gn?.active && !Et && !He && !(po?.hold > 0),
          Ns.mode === "l5" && !Ns.takeover,
        ),
        g2 > 0 && po && (po.heat = 0),
        po?.update(
          mt,
          (document.body.classList.contains("play") || ki) &&
            !Gn?.active &&
            !Et,
        ),
        g2 > 0 &&
          document.body.classList.contains("play") &&
          ((g2 -= mt), po && (po.heat = 0)),
        (MT || (g2 > SB - 40 && kB)) &&
          !Et &&
          !Zr.on &&
          document.body.classList.contains("play") &&
          ((MT = !1), _B()),
        (kB = Et));
      for (let Me of Ns.events.splice(0))
        Me.type === "takeover"
          ? (Zn(
              "Takeover",
              Me.why === "blocked"
                ? "Level 5 is held up - you have the wheel \xB7 I: L5 again"
                : "You have the wheel (L3) \xB7 I or the chip: L5 again",
            ),
            In.sync())
          : Me.type === "engaged"
            ? (Zn(
                "Level 5",
                Ns.dest
                  ? "Driving to the pin"
                  : vt && cr
                    ? "Driving the fares"
                    : "Cruising the city",
              ),
              In.sync())
            : Me.type === "arrived" &&
              Zn("Arrived", "Level 5 holds at the kerb");
      let ve =
        W0.brakeLine === "always" &&
        Ns.mode === "manual" &&
        !Gn?.active &&
        !!ot;
      if (
        (ve && Ns.pathStep(mt, Jt, Ht),
        Sa.update(
          mt,
          Ns,
          ot?.layout,
          document.body.classList.contains("play") || ki,
          ve,
        ),
        lc &&
          cr &&
          (document.body.classList.contains("play") || ki) &&
          !(_v >= 0 || o4.on) &&
          lc.update(mt, Jt, re.hits, Ue),
        re.parked.moved.size)
      ) {
        for (let Me of re.parked.moved) {
          Wt.userData.moveParked(Me);
          for (let ms of zf) ms.userData.moveParked(Me);
        }
        re.parked.moved.clear();
      }
      (tc(zt, Jt.renderPose(zv / r4)),
        vi?.isOpen && vi.frame(mt, zt),
        zt.root.updateMatrixWorld(!0),
        Qn?.update(mt, document.body.classList.contains("play")),
        Gn?.update(mt, document.body.classList.contains("play")),
        Ks?.update(mt, document.body.classList.contains("play")),
        CB.copy(zt.body.matrixWorld).invert(),
        (_.carFrameInv = CB));
      {
        let Me = Qn?.spectate?.();
        Me ? Ci.update(mt, Me.v, Me.car, {}) : Ci.update(mt, Jt, zt, Ht);
      }
      if ((nd && !(Ns.mode === "l5" && !Ns.takeover) && xT(!1), nd))
        mB.update(mt, Jt);
      else if (Ci.mode < 2 && Ls && !je.has("noleaf")) {
        Yr.length = 0;
        let Me = Ue.position;
        for (let ms of re.near(Me.x, Me.z, 9)) {
          let fs = ms.prop;
          if (!fs || ms.dead || (fs.kind !== "tree" && fs.kind !== "palm"))
            continue;
          let Bn = Ls.treeK(fs);
          Bn && Yr.push(dZ(Bn, fs.x, fs.y, fs.z, null, fs.scale || 1));
        }
        for (let ms of Ls.debris)
          !ms.K?.wood ||
            ms.K.pts?.length !== 6 ||
            Math.abs(ms.x.x - Me.x) > 20 ||
            Math.abs(ms.x.z - Me.z) > 20 ||
            (Lo.set(0, (ms.K.pts[2][1] - ms.K.com) * ms.s.y, 0)
              .applyQuaternion(ms.q)
              .add(ms.x),
            Yr.push([
              Lo.x,
              Lo.y,
              Lo.z,
              Math.max(Math.abs(ms.K.pts[2][0]), ms.K.pts[1][1] * 0.12) *
                ms.s.y,
            ]));
        Sf.update(Ue, Ci._l || Jt.pos, Yr, mt);
      } else
        (document.body.classList.contains("play") || ki) &&
          !je.has("novibe") &&
          ((ro.on = W0.vibe !== "off"),
          ro.apply(
            Ue,
            mt,
            Jt,
            ot ? ot.layout.surfaceAt(Jt.pos.x, Jt.pos.z) : "road",
            Ci.mode >= 2,
          ));
      if ((bT?.update(Ue), Yp)) {
        for (let Me of Yp.items) Yp.show(Me, !Gn?.active);
        Yp.update(Ue);
      }
      if (
        (Mv.update(mt, _r || { events: [], live: null }, ta),
        Mv.rewind(He, fB.seconds),
        dB.update(
          mt,
          Sv,
          Xp(),
          !!(vt && cr && vt.ride?.style === "street" && vt.state === "ride"),
        ),
        $st.update(mt, Jt),
        vT?.update(mt, Ue),
        n4.update(mt, Jt, re.hits, Ln.lastDevice === "pad" && oe && !In.paused),
        !document.body.classList.contains("play") && !ki)
      ) {
        ET += mt;
        let Me = zt.fleet?.orbit || { R: 6.4, h: 1.5, look: 0.55 },
          ms = 2.2 + ET * 0.13,
          fs = Wo?.isOpen ? 1 : 0,
          Bn = Me.R * (1 + 0.5 * fs),
          Zi = Me.look - 1.9 * fs;
        (Ue.position.set(
          Jt.pos.x + Math.sin(ms) * Bn,
          Jt.pos.y + Me.h + 1.1 * fs + 0.4 * Math.sin(ET * 0.21),
          Jt.pos.z + Math.cos(ms) * Bn,
        ),
          Ue.lookAt(Jt.pos.x, Jt.pos.y + Zi, Jt.pos.z));
        let Eo = 42 + 26 * Math.max(0, Math.min(1, (1.1 - Ue.aspect) / 0.6));
        Ue.fov !== Eo && ((Ue.fov = Eo), Ue.updateProjectionMatrix());
      }
      (vi?.isOpen && vi.view(mt, Ue),
        Ge.update(mt, Jt, zt, ha[Xs].sunI / 3, re.hits, Ue, ha[Xs].wet || 0),
        !$e &&
          !je.has("nodebris") &&
          ($e = window.__sf.debris =
            new O_(Nt, {
              ground: (Me, ms, fs) =>
                ot ? ot.layout.driveHeight(Me, ms, null, fs) : eo(Me, ms),
              paint: () => (Es !== zt && ((Es = zt), (Ds = Fe(zt))), Ds),
            })),
        $e?.update(mt, re.hits, Jt),
        Ls.update(mt, Jt, ha[Xs].sunI / 3),
        (_.shadowEpoch =
          (_.shadowEpoch | 0) +
          ((!_.smMove && we.cars.length) || Ls.live || re.parked.awake.length
            ? 1
            : 0)));
      let ts = Wt.userData.step();
      (!ts && zf.length && zf[(WN = (WN + 1) % zf.length)].userData.step(),
        !ts && !qt?.userData.step() && Zt?.userData.step());
      let ds = window.__sf._fc || fh;
      if (
        (ds
          ? (Ue.position.set(ds[0], ds[1], ds[2]),
            Ue.lookAt(ds[3], ds[4], ds[5]),
            ds[6] &&
              Ue.fov !== ds[6] &&
              ((Ue.fov = ds[6]), Ue.updateProjectionMatrix()))
          : fh &&
            (Ue.position.set(fh[0], fh[1], fh[2]),
            Ue.lookAt(fh[3], fh[4], fh[5]),
            fh[6] && ((Ue.fov = fh[6]), Ue.updateProjectionMatrix())),
        (zT -= mt) < 0)
      ) {
        ((zT = 0.4),
          Wt.userData.cull(
            Ue.position.x,
            Ue.position.z,
            B === "safe" ? 130 : B === "mobile" ? 160 : 420,
            Ue.position.y,
          ),
          os?.update(
            Ue.position.x,
            Ue.position.z,
            Qn?.remotes
              ? [...Qn.remotes.values()]
                  .filter((Me) => Me.T)
                  .map((Me) => [Me.T.x, Me.T.z])
              : null,
          ));
        for (let Me of zf)
          Me.userData.cull(
            Ue.position.x,
            Ue.position.z,
            B === "safe" ? 130 : B === "mobile" ? 160 : 420,
            Ue.position.y,
          );
        if (ot && xn)
          for (let [Me, ms] of Object.entries(h0)) {
            let fs = ms.bounds;
            !h2.has(Me) &&
              Math.hypot(
                Math.max(0, fs.x0 - Ue.position.x, Ue.position.x - fs.x1),
                Math.max(0, fs.z0 - Ue.position.z, Ue.position.z - fs.z1),
              ) < 2500 &&
              GM(Me);
          }
        (qt?.userData.cull(Ue.position.x, Ue.position.z, 420, Ue.position.y),
          Zt?.userData.cull(Ue.position.x, Ue.position.z, 300, Ue.position.y),
          Ct?.userData.cull(Ue.position.x, Ue.position.z));
        for (let Me of Xt) Me.userData.cull(Ue.position.x, Ue.position.z);
        (xe?.update(Ue.position.x, Ue.position.z), pn(), (ts = !0));
      }
      ce?.update(Ue.position.x, Ue.position.z);
      {
        let Me = ha[Xs].night > 0.3 || !!ha[Xs].wet;
        Bu(zt, {
          tail: Jt.brake > 0.1 ? (Me ? 1.6 : 1) : Me ? 1 : 0.7,
          head: Me ? 1 : 0,
          signal: 0,
        });
      }
      (dn &&
        _._so?.params &&
        !_._so.params.__sf &&
        (Dn(_._so, dn), (_._so.params.__sf = 1)),
        Un &&
          _._so?.isReady &&
          !_._so.shore &&
          (_._so.setShore(Un), xn && (Un.data = null)));
      {
        let Me = !xn && Ue.position.z < -2600 ? 15e3 : 9e3;
        Ue.far !== Me &&
          ((Ue.far = Me),
          Ue.updateProjectionMatrix(),
          Zs.scale.set(Me / 9e3, 1, Me / 9e3));
        let ms = Nt.fog,
          fs = ms?.d0;
        if (fs && !xn) {
          let Bn =
            fs < 0.001
              ? Math.min(1, Math.max(0, (-Ue.position.z - 2e3) / 1500))
              : 0;
          ms.density = fs * (1 - 0.72 * Bn);
        }
      }
      (Zs.position.set(Ue.position.x, 0, Ue.position.z),
        Zs.updateMatrixWorld(),
        bs(),
        Xe(mt),
        ot &&
          ot.update(Ue.position.x, Ue.position.z, mt, Et ? 14 : ts ? 0.5 : 2.5),
        rs?.update(we.t, mt, Ue.position.x, Ue.position.z),
        KG(Jt));
      for (let Me of bM) Me.update(mt, Ue);
      {
        let Me = WR.cars;
        if (((Me.length = 0), Qn && Qn.peopleCars(Me), Gn?.S?.bots))
          for (let ms of Gn.S.bots) {
            let fs = ms.T;
            if (!fs || !ms.col) continue;
            let Bn = -Math.sin(fs.heading),
              Zi = -Math.cos(fs.heading),
              Eo = fs.wreck?.vx ?? Bn * fs.v,
              qo = fs.wreck?.vz ?? Zi * fs.v;
            Me.push({
              x: fs.x,
              z: fs.z,
              fx: Bn,
              fz: Zi,
              hl: fs.V.L / 2,
              hw: fs.V.bw / 2,
              vx: Eo,
              vz: qo,
              sp: Math.hypot(Eo, qo),
              player: !1,
              remote: "bot",
            });
          }
      }
      if (we.roads) {
        let Me = !!(Qn?.ch && Qn.offC !== null);
        ((we.roads.tOff = Me ? (performance.now() - Qn.offC) / 1e3 - we.t : 0),
          (we.roads.synced = Me || !!Qn?.ch));
      }
      (gt &&
        Qn &&
        (gt.sync =
          Qn.ch && Qn.offC !== null
            ? gt.sync?.seed === Qn.roomSeed()
              ? gt.sync
              : { seed: Qn.roomSeed(), now: () => performance.now() - Qn.offC }
            : null),
        gt?.update(mt, Jt, Ue, we.t, we),
        Wu().update(mt, Jt, Ue, we),
        P0.update(mt, Jt, Ue),
        Dd.update(mt, Ue),
        we.yieldTo || (we.yieldTo = (Me) => dl.yieldTo(Me)),
        dl.update(mt, Ue, we));
      {
        let Me = W0.blur === "forza",
          ms = Math.max(
            0,
            Math.min(1, (Jt.kmh - (Me ? 80 : 130)) / (Me ? 170 : 200)),
          );
        ((_.motionBlur = 0),
          (_.radialBlur =
            A > 0
              ? Me
                ? 0.1 * Math.pow(ms, 1.25) +
                  (Jt.nitroOn ? 0.02 : 0) * Math.min(1, Jt.kmh / 100)
                : 0.05 * Math.pow(ms, 1.6) +
                  (Jt.nitroOn ? 0.01 : 0) * Math.min(1, Jt.kmh / 120)
              : 0));
      }
      (_.render(Nt, Ue),
        hn && Qn && hn.remotes(Tst(), Jt.vel.x, Jt.vel.z),
        hn &&
          hn.update(Jt, {
            dt: mt,
            camera: Ue,
            inside: Ci.mode >= 2,
            world: re,
            hits: re.hits,
            jets: Ls.jets,
            traffic: we,
            police: po,
            wet: ha[Xs].wet || 0,
            waterAt: zl,
            pier39: P0,
            ...yt,
          }),
        kst(mt));
      {
        let Me = performance.now();
        (Ps === null && (Ps = Me),
          (mh = (Me - Ps) / 1e3 - tn),
          mh > 0 && Bi++,
          PB.tick(Me));
      }
      if (PB.benching) ((Ps = performance.now()), (tn = 0), (Bi = 0));
      else if (
        !globalThis.SF_IOS &&
        mh > (B === "desktop" ? 1 : 1.5) &&
        E !== "ultra" &&
        !je.has("res") &&
        !je.has("size")
      ) {
        let Me = mh / Math.max(1, Bi),
          ms = H,
          fs = (globalThis.SF_FPS | 0) > 0 ? 1 / globalThis.SF_FPS : 0,
          Bn = Math.max(1 / 42, fs * 1.2),
          Zi = _.info.gpuTimeMs || 0,
          Eo = Zi > 0 && Zi < Me * 500;
        if (
          ((ci = Me > Bn && !Eo ? ci + (Me > Bn * 2 ? 2 : 1) : 0),
          (qn =
            Me < Math.max(1 / 58, fs * 1.05) &&
            Zi < Math.max(9, 620 * (fs || 1 / 60))
              ? qn + 1
              : 0),
          B !== "desktop" && (_.info.gpuTimeMs || 0) > 0)
        ) {
          let qo = _.info.gpuTimeMs * 1.15,
            Er = 0.4 * 1e3 * (fs || 1 / 60);
          (qo > Er || Me > Math.max(1 / 28, fs * 1.25)
            ? (H = Math.max(
                Math.min(P, 0.2 * L),
                H * (qo > Er * 1.5 ? 0.8 : 0.9),
              ))
            : qo < Er * 0.6 &&
              Me < Math.max(1 / 58, fs * 1.05) &&
              (H = Math.min(P, H * 1.08)),
            (ci = qn = 0));
        } else
          ci >= 2
            ? (E !== "perf" && x2 < 2
                ? RB(x2 + 1)
                : (H = Math.max(
                    AB(),
                    H * Math.max(0.6, Math.min(0.9, Math.sqrt(Bn / Me) * 1.05)),
                  )),
              (ci = 0))
            : qn >= 4 && H < P - 0.01
              ? ((H = Math.min(P, H * 1.1)), (qn = 0))
              : qn >= 8 && x2 > 0 && (RB(x2 - 1), (qn = 0));
        (Math.abs(H - ms) > 0.01 && lr(),
          (Ps = performance.now()),
          (tn = 0),
          (Bi = 0));
      }
      (kT++,
        (l4 += mt),
        l4 > 0.5 &&
          ((Js("fps").textContent =
            `${(kT / l4).toFixed(0)} fps \xB7 ${(_.info.gpuTimeMs || 0).toFixed(1)} ms`),
          (kT = 0),
          (l4 = 0)));
    };
  if (!navigator.gpu)
    throw new Error("This needs WebGPU (Chrome, Edge, or Safari 26+).");
  let i = globalThis.SF_WORKERS || {};
  globalThis.MB_LOD_WORKER = Yf("lod");
  let t = jD(
      Yf("img"),
      xn
        ? 2
        : Math.max(2, Math.min(8, (navigator.hardwareConcurrency || 4) - 2)),
      i.img,
    ),
    e = je.has("nosky") || Mf,
    s = !e && (globalThis.SF_DIST || je.has("latesky")) && !je.has("nolatesky");
  if (!dh)
    for (let J of [
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
      O5("assets/real/" + J, "high");
  let n = [],
    o = dh
      ? null
      : X7((J) => {
          let ht = io(J);
          return (n.push(ht), ht);
        }),
    a = o ? Promise.all(n) : null;
  (o?.catch(() => {}), a?.catch(() => {}));
  let r = (globalThis.SF_DIST || je.has("hold")) && !je.has("nohold") && o;
  r && UA(/\/sky\.bin$/, a);
  let l = s ? io("assets/real/sky.bin") : null;
  l?.catch(() => {});
  let c = r ? (l ? Promise.all([o, l.catch(() => {})]) : o) : null;
  (r && UA(/assets\/(cars|waymo|cybercab|car|corvette|cybertruck)\//, c),
    r &&
      !je.has("nogate") &&
      (globalThis.SF_DIST || je.has("texdefer")) &&
      !je.has("notexdefer") &&
      JD(c));
  let h = IN + (xn || je.has("lite") ? "scene_plain.glb" : "scene_subd.glb"),
    f = h.replace("scene_", "ao_").replace(".glb", ".bin");
  if (!ai) (O5(h), O5(f));
  else {
    let J = cs[Jn];
    O5(J.dir + J.glb, "high");
    for (let ht of J.tex) Ed(J.dir + ht + ".webp").catch(() => {});
  }
  let u = i.car || null;
  if (ai) (u?.terminate?.(), (u = null));
  else if (!u)
    try {
      u = new Worker(Yf("car"), { type: "module" });
    } catch {}
  let d = ai ? Promise.resolve() : Tg(u),
    p = (J) => Nl(J, { read: (ht) => ht.json() }),
    m = p(ai ? cs[Jn].dir + cs[Jn].meta : IN + "scene.json"),
    g = ai
      ? Promise.resolve(null)
      : new go().loadAsync(IN + "tire.webp").catch(() => null);
  m.catch(() => {});
  let b = je.has("proc")
    ? Promise.resolve(null)
    : fetch("assets/tex/tex.json", { priority: "high" })
        .then((J) => (J.ok ? J.json() : null))
        .catch(() => null);
  b.then((J) => {
    if (!J) return;
    let ht = xn ? "_lo" : "";
    for (let mt of [
      ...Object.keys(J.fronts).flatMap((Et) => [
        "fronts_" + Et + ht,
        "fronts_" + Et + "_mask",
      ]),
      "office" + ht,
      "office_mask",
      "stucco",
      "brick",
      "siding",
      "concrete",
      "roof",
      "sidewalk_c",
      "asphalt_hd" + ht,
      "asphalt_hd_n",
      "asphalt_old" + ht,
      "decals",
      "decals_n",
      ...(dh ? [] : ["ground_a", "ground_b", "ground_a_n", "ground_b_n"]),
      "leaves",
      "furniture",
      "foliage",
      "bark",
      "twigs",
      "palms",
      "shrubs",
      ...(uv && !Or() ? ["peds"] : []),
      ...(LN ? ["dress_signs", "dress_grate", "dress_rail"] : []),
      ...["bark_cyp", "bark_euc", "bark_palm", "bark_head", "bark_fan"].flatMap(
        (Et) => [Et, Et + "_n"],
      ),
    ])
      Ed(`assets/tex/${mt}.webp`).catch(() => {});
  });
  let x = (globalThis.SF_DIST || je.has("texdefer")) && !je.has("notexdefer"),
    v = /\/assets\/tex\/.*\.webp/;
  if (
    (x && XD((J) => v.test(J) && !/\.lq\.webp/.test(J)), !dh && !je.has("nolm"))
  )
    for (let J of [
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
      Ed(`assets/tex/lm/${J}.webp`).catch(() => {});
  let y = je.get("time") && ha[je.get("time")] ? je.get("time") : "noon";
  (gst(i.sky), bst(FM(ha[y]), xn ? 512 : 1024, Yf("sky")));
  let M =
      xn || Mf || dh || je.has("nohero")
        ? Promise.resolve(null)
        : io("assets/veg/trees.bin")
            .then((J) => eJ(J))
            .catch((J) => (console.warn("trees.bin:", J), null)),
    S =
      !xn &&
      (globalThis.SF_DIST || je.has("latecars")) &&
      !je.has("nolatecars"),
    w = je.has("proccars") ? Promise.resolve(null) : BY(void 0, { late: S });
  if ((Wp("Starting the renderer", 0.05), globalThis.SF_TIER_NOTE)) {
    let J = Js("tierNote");
    (J && (J.textContent = globalThis.SF_TIER_NOTE),
      console.warn("tier:", globalThis.SF_TIER_NOTE));
  }
  let z = Js("c"),
    _ = new Z6({
      canvas: z,
      powerPreference: "high-performance",
      antialias: "fxaa",
      f16: je.get("f16") !== "0",
      depthPrepass: !0,
      planarMips: xn ? 5 : 99,
      bloomLevels: xn ? 4 : 6,
      cullBackFaces: !0,
    });
  je.has("nofull") && (_.fullMaterials = !1);
  let R = "sf-drive.compat",
    T = null;
  try {
    T = JSON.parse(localStorage.getItem(R) || "null");
  } catch {}
  if (
    T &&
    /unresolved value 'NaN'/.test(T.why) &&
    /transpose\(cofactor\(m\)\)/.test(T.why)
  ) {
    T = null;
    try {
      localStorage.removeItem(R);
    } catch {}
  }
  (T &&
    Date.now() - T.t < 7 * 864e5 &&
    !je.has("full") &&
    ((_.fullMaterials = !1),
    console.warn("gpu: the compact material path (" + T.why + ")")),
    await _.init());
  {
    let J = 0,
      ht = performance.now();
    _.device.addEventListener?.("uncapturederror", (mt) => {
      let Et = String(mt.error?.message || mt.error);
      if ((J++ < 5 && console.error("WebGPU:", Et), Bg(mt.error))) {
        BM(mt.error);
        return;
      }
      if (_.fullMat && performance.now() - ht < 6e4 && !je.has("full") && !ki)
        try {
          localStorage.setItem(
            R,
            JSON.stringify({ t: Date.now(), why: Et.slice(0, 160) }),
          );
        } catch {}
    });
  }
  {
    let J = _.adapterInfo || {},
      ht = [J.vendor, J.architecture, J.description, J.device].join(" ");
    globalThis.SF_TIER === "desktop" &&
      !globalThis.SF_TIER_FORCED &&
      !(navigator.deviceMemory >= 8) &&
      (/qualcomm|adreno|\barm\b|mali|imagination|powervr|samsung|xclipse|mediatek/i.test(
        ht,
      ) ||
        (/apple/i.test(ht) && navigator.maxTouchPoints > 1)) &&
      (console.warn("tier: a mobile GPU (" + ht.trim() + "): the mobile tier"),
      globalThis.SF_BOOT?.lower("mobile"),
      location.reload(),
      await new Promise(() => {}));
  }
  (_.device.lost?.then((J) => {
    J.reason !== "destroyed" &&
      BM(new Error("GPU device lost: " + (J.message || J.reason)));
  }),
    xn &&
      ((_.maxTextureSize = globalThis.SF_TEXMAX || 1024),
      (_.dropCpuGeometry = !0),
      (_.reflectionLod = !1),
      (_.onTextureUploaded = WD)),
    (B5.arrived = (J) => {
      try {
        _._texture(J);
      } catch {}
    }),
    _.compileAsync(new y0()).catch((J) => console.warn("compile", J)),
    (_.toneMapping = ug),
    (_.viewShadows = !0),
    (_.noProbeBox = !0),
    (_.bloom = 0.075),
    (_.vignette = 0.28),
    (_.gi = je.has("gi")));
  let E = globalThis.SF_Q || "high";
  ((_.ssrDistance = 90),
    (_.ssrThickness = 1.2),
    E === "ultra" ? (_.ssrDistance = 160) : E === "perf" && (_.ssr = !1),
    (_.aoRadius = 1.6),
    (_.aoIntensity = 0.85),
    je.has("nossr") && (_.ssr = !1),
    je.has("noao") && (_.ao = !1),
    je.has("notaa") && (_.taa = !1));
  let A = je.has("nomb") ? 0 : 0.35;
  ((_.motionBlur = 0),
    (_.motionBlurMax = 0.014),
    (_.grade = j5({
      saturation: 0.18,
      contrast: 0.16,
      warmth: 0.02,
      lift: -0.005,
    })));
  let C = je.has("oldlow");
  globalThis.SF_OLDLOW = C;
  let P = 1,
    I = (J) => {
      ((_.depthPrepass = !J),
        (_.ao = J || je.has("noao") ? !1 : void 0),
        (_.taa = J || je.has("notaa") ? !1 : void 0),
        (_.nearShadow = J ? !1 : void 0),
        (_.sunCacheMs = J ? 500 : 0),
        (_.planarEnabled = J ? !1 : void 0),
        (_.specularAA = J && !C ? 2 : void 0),
        (_.upscale =
          J && !C ? Math.min(window.devicePixelRatio || 1, 2, 2.5 * P) : 0));
    },
    L = window.devicePixelRatio || 1,
    F = (J, ht) =>
      Math.min(
        L,
        J === "safe"
          ? Math.min(C ? 0.6 : 0.58, Math.max(0.2 * L, C ? 0 : 0.4))
          : J === "mobile"
            ? Math.min(C ? 1.25 : 1.2, Math.max(0.42 * L, C ? 0 : 0.5))
            : ht === "ultra"
              ? 2
              : ht === "perf"
                ? 1
                : 1.75,
      ) * +(je.get("res") || 1),
    N = (J, ht, mt) =>
      je.has("res") || ht === "ultra" || (J === "desktop" && ht === "high")
        ? mt
        : J === "mobile"
          ? Math.min(mt, Math.max(0.33 * L, C ? 0 : 0.5))
          : Math.min(mt, ht === "perf" ? 0.85 : 1.25);
  P = F(globalThis.SF_TIER, E);
  let B = globalThis.SF_TIER;
  I(xn);
  let H = N(B, E, P);
  Wp("Loading San Francisco", 0.18, 1.2);
  let O = !1,
    D,
    U = new Promise((J) => (D = J));
  ai && D();
  let G = {},
    q = new Map(),
    W = (J) => {
      if (!xn) return;
      let ht = new Set();
      J.root.traverse((mt) => {
        mt.geometry && ht.add(mt.geometry);
      });
      for (let [mt, Et] of q)
        if (Et.car !== J) {
          (G[mt] === Et.promise && delete G[mt], q.delete(mt));
          for (let Ht of Et.geometry) ht.has(Ht) || Ht.dispose();
        }
    },
    V = async (J) => {
      for (let ht = 0; ht < 3; ht++) {
        try {
          let mt = await fetch(rF(J));
          if (mt.ok) return new Uint8Array(await mt.arrayBuffer());
          let Et =
            "custom car " +
            J.name +
            ": its model did not load (HTTP " +
            mt.status +
            ") - a stand-in body";
          if (
            (console.warn(Et),
            (window.__sf.wrapLog ||= []).push({
              t: Math.round(performance.now()),
              msg: Et,
            }),
            mt.status < 500)
          )
            return null;
        } catch (mt) {
          console.warn("custom car", mt);
        }
        await new Promise((mt) => setTimeout(mt, ht ? 3e3 : 1e3));
      }
      return null;
    },
    Y = async (J) => {
      let ht = await GQ(await V(J), J);
      return (
        (ht.fleet = zz(J, null)),
        (ht.id = "custom"),
        (ht.rideSha = J.sha),
        ht
      );
    },
    $ = (J, ht = !1) => {
      let mt = J === "custom" ? "custom:" + cs.custom?.ride?.sha : J;
      if (G[mt]) return G[mt];
      let Et = (G[mt] = (async () => {
        let Ht = cs[J],
          oe = async (ds) => {
            let Me = new y0();
            Me.add(ds.root);
            let ms = _.compileAsync(Me).catch((fs) => {
              if ((console.warn("compile", fs), Bg(fs) && (BM(fs), ht)))
                throw fs;
            });
            ht && (await ms);
          };
        if (Ht.item) {
          let ds = await Y(Ht.ride);
          return ((ds.fleet = Ht), await oe(ds), ds);
        }
        let [He, ve] = await Promise.all([
            io(Ht.dir + Ht.glb).then((ds) => ((O = !0), ds)),
            J === Jn ? m : p(Ht.dir + Ht.meta),
          ]),
          ts = await Ht.load(He, ve);
        return ((ts.fleet = Ht), (ts.id = J), await oe(ts), ts);
      })());
      return (
        Et.then(
          (Ht) => {
            let oe = new Set();
            (Ht.root.traverse((He) => {
              He.geometry && oe.add(He.geometry);
            }),
              q.set(mt, { car: Ht, promise: Et, geometry: oe }));
          },
          () => {},
        ),
        Et.catch(() => {
          G[mt] === Et && delete G[mt];
        }),
        Et.catch((Ht) => {
          Bg(Ht) && BM(Ht);
        }),
        Et
      );
    },
    st = async (J, ht) => {
      let mt = J === "custom" ? oz(ht) : null;
      J === "custom" && !mt && (J = "waymo");
      let Et = cs[J] || cs.waymo,
        Ht = mt
          ? await Y(mt)
          : await (async () => {
              let [oe, He] = await Promise.all([
                  io(Et.dir + Et.glb),
                  p(Et.dir + Et.meta),
                ]),
                ve = await Et.load(oe, He);
              return ((ve.fleet = Et), (ve.id = J), ve);
            })();
      if (
        (Ht.root.traverse((oe) => {
          oe.isMesh && (oe.userData.mbMover = !0);
        }),
        ot && Ht.materials)
      )
        for (let oe of Object.values(Ht.materials))
          oe.userData.mbSkyVis === void 0 && (oe.userData.mbSkyVis = 2);
      {
        let oe = new y0();
        (oe.add(Ht.root),
          await _.compileAsync(oe).catch((He) => console.warn("compile", He)),
          oe.remove(Ht.root));
      }
      return (xn && setTimeout(() => _.dropCpu(Ht.root), 1500), Ht);
    },
    Q = ai
      ? $(Jn)
      : (async () => {
          let [J, ht, mt, Et] = await Promise.all([
              io(h).then((oe) => ((O = !0), oe)),
              m,
              g,
              io(f).catch((oe) => (console.warn("car AO:", oe), null)),
            ]),
            Ht = await sz(J, ht, mt, u || Yf("car"), D, Et);
          {
            let oe = new y0();
            (oe.add(Ht.root),
              _.compileAsync(oe).catch((He) => console.warn("compile", He)));
          }
          return Ht;
        })();
  await new Promise((J) => setTimeout(J, 0));
  let j = pI(256, 33),
    X = (J, ht, mt = {}) => {
      let Et = new Ee({
        color: 16777215,
        roughness: 0.9,
        metalness: 0,
        vertexColors: !0,
        map: ht,
        ...mt,
      });
      return ((Et.userData.mbAlbedo = J), Et);
    },
    K = {
      road: X(gW, null),
      walk: X(bW, null),
      facade: X(xW, j),
      roof: X(vW, null),
    };
  K.facade.userData.mbVertexFallback = K.roof.userData.mbVertexFallback = !0;
  let nt = await b;
  if (nt) {
    let J = xn ? "_lo" : "",
      ht = (oe, He, ve = !1) =>
        Fr(`assets/tex/${oe}.webp`, (ts) => {
          ((ts.colorSpace = ve ? On : is),
            (ts.flipY = !1),
            (ts.anisotropy = 8),
            (ts.wrapS = ts.wrapT = He ? ti : $i));
        }),
      mt = Object.keys(nt.fronts),
      Et = QR(LN ? nt : null);
    for (let oe of mt)
      ((K["f_" + oe] = X(Et, ht("fronts_" + oe + J), { roughness: 0.8 })),
        (K["f_" + oe].userData.mbExtraMap = ht(
          "fronts_" + oe + "_mask",
          !1,
          !0,
        )));
    if (LN) {
      K.dress = X(zW, ht("dress_signs"), { roughness: 0.7 });
      let oe = (He) =>
        Fr(`assets/tex/${He}.webp`, (ve) => {
          ((ve.colorSpace = is),
            (ve.flipY = !1),
            (ve.wrapS = ve.wrapT = ti),
            (ve.minFilter = yi),
            (ve.generateMipmaps = !1));
        });
      ((K.spill = new ln({
        color: 0,
        vertexColors: !0,
        transparent: !0,
        depthWrite: !1,
        blending: da,
        fog: !1,
        visible: !1,
      })),
        (K.fe_grate = X(t7, oe("dress_grate"), { alphaTest: 0.5 })),
        (K.fe_rail = X(t7, oe("dress_rail"), { alphaTest: 0.5 })));
    }
    ((K.office = X(MW, ht("office" + J))),
      (K.office.userData.mbExtraMap = ht("office_mask", !1, !0)));
    for (let [oe, He] of [
      ["w_stucco", "stucco"],
      ["w_brick", "brick"],
      ["w_siding", "siding"],
      ["w_concrete", "concrete"],
      ["roofT", "roof"],
    ])
      K[oe] = X(oe === "roofT" ? kW : SW, ht(He, 1));
    let Ht = K.road;
    ((Ht.map = ht("asphalt_hd" + J, 1)),
      Object.assign(Ht.userData, {
        mbExtraMap: ht("asphalt_hd_n", 1, !0),
        mbMap8: ht("asphalt_old" + J, 1),
        mbMap1: ht("decals"),
        mbMap3: ht("decals_n", !1, !0),
      }),
      (K.walk.map = ht("sidewalk_c", 1)));
  }
  if (
    (K.road.map || (K.road.map = EJ(512)),
    K.walk.map || (K.walk.map = pI(512, 21)),
    (K.terrain = X(_W, K.walk.map)),
    (K.distant = K.terrain),
    !dh)
  ) {
    let J = (ht, mt) => {
      let Et = X(ht.userData.mbAlbedo, ht.map);
      return ((Et.userData = { ...ht.userData, mbSkyVis: mt }), Et);
    };
    ((K.roadDeck = J(K.road, 0)),
      (K.walkDeck = J(K.walk, 1)),
      (K.roadTun = J(K.road, 1)));
    for (let [ht, mt] of Object.entries(K))
      !mt.userData.mbSkyVis &&
        ht !== "roadDeck" &&
        ht !== "walkDeck" &&
        ht !== "roadTun" &&
        (mt.userData.mbSkyVis =
          ht === "road" || ht === "walk" || ht === "terrain" ? 2 : 1);
  }
  let Z =
      nt && !dh
        ? await aJ({
            mats: K,
            mb: _,
            hook: X,
            code: p7(xn ? (Mf ? 900 : 1300) : 0),
            fetchBytes: io,
            lazy: Fr,
          }).catch((J) => (console.warn("ground:", J), null))
        : null,
    et = {};
  if (nt) {
    let J = (ht, mt) =>
      Fr(`assets/tex/${ht}.webp`, (Et) => {
        ((Et.colorSpace = is),
          (Et.flipY = !1),
          (Et.userData.photo = !0),
          mt && (Et.wrapS = Et.wrapT = ti));
      });
    et = {
      leaves: J("leaves"),
      furn: J("furniture"),
      foliage: J("foliage"),
      bark: J("bark", !0),
      soil: K.terrain.userData.mbMap1 ? K.terrain.map : null,
      ...(await XY("assets/tex/", Fr)),
    };
  }
  let tt = QY(et);
  (_.prewarm(Object.values(tt)),
    w
      .then((J) => J && _.prewarm(Object.values(J).map((ht) => ht.mat)))
      .catch(() => {}));
  let it = performance.now(),
    rt = je.get("at") ? je.get("at").split(",").map(Number) : null,
    lt = null,
    ct = null,
    dt,
    ut = null,
    ot = null,
    at = null,
    yt = {};
  if (dh) {
    let J =
      je.has("noosm") || !nt
        ? null
        : await fetch("assets/osm/downtown.json")
            .then((ht) => (ht.ok ? ht.json() : null))
            .catch(() => null);
    ((dt = OK({ mats: K, tex: nt, osm: J })),
      (ut = xG({ mats: K })),
      dt.colliders.push(...ut.colliders),
      dt.inst.push(...ut.inst),
      (dt.osm = J));
  } else {
    let J = await o,
      ht = null,
      mt = e
        ? null
        : s
          ? {}
          : await io("assets/real/sky.bin")
              .then((ve) => sR(ga(ve)))
              .catch((ve) => (console.warn("sky.bin:", ve), null));
    (s &&
      (ht = ct =
        l
          .then((ve) => {
            Object.assign(mt, sR(ga(ve)));
          })
          .catch((ve) => console.warn("sky.bin:", ve))),
      mt &&
        (mt.field ? _.setSkyField(nR(mt)) : (lt = mt),
        (_.skyVis = {
          strength: +(je.get("skyk") ?? 1),
          contrast: +(je.get("skyc") ?? 1),
          car: 0.6,
          debug: +(je.get("skydbg") ?? 0),
        })),
      nt && (nt.btags = await io("assets/real/btags.bin").catch(() => null)));
    let Et = XJ(J);
    (XB(Et), yst());
    {
      let ve = KJ(J);
      ((globalThis.MB_SEA_FNS = ve.fns), (globalThis.MB_SEA_MASK = ve.body));
    }
    at = rt
      ? [rt[0], rt[1], rt[2] || 0]
      : ki
        ? zx(J, Et, "California Street", -1371, 385, 1, -0.08, { plateau: !0 })
        : QJ(J, Et);
    let Ht = (ve) => 0.2 + 0.62 * ve;
    (Wp("Building San Francisco", Ht(0.15), 0.8),
      await new Promise((ve) => requestAnimationFrame(() => setTimeout(ve, 0))),
      await Promise.race([
        Promise.all([t, d, mst()]),
        new Promise((ve) => setTimeout(ve, 500)),
      ]),
      O && (await Promise.race([U, Q])),
      _.prewarm(Object.values(K)));
    let oe = "",
      He = (ve, ts, ds, Me = ve, ms = 100) => (
        Wp(ts, Ht(Me), ms / 1e3),
        ds && ts !== oe && ((oe = ts), _.prewarm(ds)),
        new Promise((fs) => setTimeout(fs, 0))
      );
    (fq(xn ? 8 : 4),
      (dt = ot =
        await YJ({
          D: J,
          L: Et,
          mats: K,
          tex: nt,
          spawn: at,
          mobile: xn,
          safe: Mf,
          ground: Z,
          upload: (ve) => _.upload(ve),
          sky: mt,
          skyReady: ht,
          billboards: !je.has("nobb") && !Mf,
          pause: He,
        })),
      (yt = {
        tunnelAt: qU(J),
        skyAt: mt ? (ve, ts) => Og(mt, ve, ts) : null,
      }));
  }
  (Wp("Placing the traffic", 0.9, 0.5),
    await new Promise((J) => setTimeout(J, 0)));
  let vt =
    ai && ot
      ? new Bw(ot.data, ot.layout, {
          seed: (Date.now() % 1e5) + 7,
          style: vM().rideStyle,
        })
      : null;
  vt &&
    console.log(
      `taxi: ${vt.spots.length} spots, ${KI(vt.spots, dt.inst, dt.colliders)} parked cars cleared from their loading zones`,
    );
  let Pt = await w;
  YY(await M);
  let jt = ot
      ? (J, ht, mt) => {
          let Et = null;
          if (mt !== void 0)
            for (let Ht of ot.layout.probe(J, ht).all)
              (Et === null || Math.abs(Ht.y - mt) < Math.abs(Et - mt)) &&
                (Et = Ht.y);
          return Et !== null && Math.abs(Et - mt) < 1
            ? Et
            : ot.layout.driveHeight(J, ht, null, mt);
        }
      : void 0,
    Wt = mx(dt.inst, tt, Pt, jt);
  B !== "desktop" && Wt.userData.carTiers && (Wt.userData.carTiers[1] = 60);
  let Ct = null,
    qt = null,
    Zt = null,
    he = [],
    ee = null,
    Xt = [];
  _.upload(Wt);
  {
    let J = at || [ae[7] + 25, fe[16] + 2.5];
    Wt.userData.refineBlobs(J[0], J[1], 450, 1 / 0);
  }
  let me = ot ? new ke() : UK(K, dt.osm ? AK(dt.osm) : null);
  (console.log(
    `city: ${dt.group.children.length} meshes, ${dt.inst.length} props, ${dt.colliders.length} colliders, ${(performance.now() - it).toFixed(0)} ms`,
  ),
    WL(dt.inst, dt.colliders, !!Pt));
  let re = new V_(dt.colliders),
    os =
      xn && Pt && (globalThis.SF_MP || je.has("mp"))
        ? (window.__sf.extraParked = new S_({ world: re, models: Pt, hf: jt }))
        : null;
  (ot &&
    (re.heightAt = (J, ht, mt) => ot.layout.driveHeight(J, ht, mt, Jt.pos.y)),
    ot && (re.speedCap = (J, ht) => ot.layout.zoneCap(J, ht)),
    dt.lateColliders?.length &&
      dt.lateColliders.forEach((J, ht) =>
        setTimeout(
          () => {
            for (let mt of J()) re.index(mt);
          },
          2500 + 70 * ht,
        ),
      ));
  let Dt = new Ee({ color: 16711680, roughness: 0.3, vertexColors: !0 });
  Dt.userData.mbAlbedo = Oh;
  let qe = new Ee({
    color: 16777215,
    roughness: 0.45,
    metalness: 0.05,
    vertexColors: !0,
  });
  if (
    (ot &&
      Wt.traverse((J) => {
        J.material?.userData &&
          /_lod\d$/.test(J.material.name) &&
          J.material.userData.mbSkyVis === void 0 &&
          (J.material.userData.mbSkyVis = 2);
      }),
    ot)
  )
    for (let J of [
      ...Object.values(tt),
      ...Object.values(Pt || {}).map((ht) => ht.mat),
      wL(),
      qe,
      Dt,
    ])
      J?.isMaterial &&
        J.userData.mbSkyVis === void 0 &&
        (J.userData.mbSkyVis = 2);
  let pe = (J) =>
      je.has("notraffic")
        ? 0
        : je.has("traffic")
          ? +je.get("traffic")
          : ot
            ? J === "safe"
              ? 12
              : J === "mobile"
                ? 24
                : 132
            : J === "desktop"
              ? 70
              : 24,
    we = new Xz(
      null,
      { car: tt.car, tire: tt.tire, tlamp: Dt, cable: qe },
      {
        max: pe(B),
        models: Pt,
        roads: ot ? new hE(ot.data, ot.layout) : null,
        extra: ai && (globalThis.SF_MP || je.has("mp")) ? 48 : 0,
      },
    );
  ((we.cablePer = B === "desktop" ? 4 : 2),
    (re.onShove = (J, ht, mt, Et, Ht) =>
      J.bot
        ? window.__sf.race?.shoved(J.bot, ht, mt, Et, Ht)
        : J.remote
          ? window.__sf.mp?.hit(J, ht, mt, Et, Ht)
          : we.shove(J, ht, mt, Et, Ht)));
  let rs = ot ? $tt(dt.inst, tt, we.roads) : null,
    Le = [];
  if (ot) {
    let J = ot.landmarks.sites.find(
        (mt) => Math.abs(mt.x + 1236) < 2 && Math.abs(mt.z - 843) < 2,
      ),
      ht = null;
    if (
      (J?.group.traverse((mt) => {
        mt.isMesh && !ht && (ht = mt);
      }),
      ht)
    ) {
      ht.updateMatrixWorld(!0);
      let mt = new Ti().setFromObject(ht);
      Le.push({
        mesh: ht,
        x0: mt.min.x,
        z0: mt.min.z,
        x1: mt.max.x,
        z1: mt.max.z,
        cx: (mt.min.x + mt.max.x) / 2,
        cz: (mt.min.z + mt.max.z) / 2,
        want: xn ? 14 : 36,
      });
    }
  }
  let de =
      uv &&
      !Or() &&
      Fr("assets/tex/peds.webp", (J) => {
        ((J.colorSpace = is), (J.flipY = !1), (J.anisotropy = 8));
      }),
    ps = ot
      ? [
          ["Ferry Building", -122.3935, 37.7955, 45, 34],
          ["Pier 39", -122.4098, 37.8087, 40, 26],
          ["Union Square", -122.4075, 37.788, 50, 24],
          ["Painted Ladies", -122.433, 37.7762, 35, 22],
          ["Golden Gate vista", -122.4752, 37.8077, 40, 24],
          ["Fisherman's Wharf", -122.4169, 37.8081, 45, 26],
          ["Lombard Street", -122.4187, 37.8021, 35, 22],
        ].map(([J, ht, mt, Et, Ht]) => {
          let [oe, He] = Gi(ht, mt);
          return {
            name: J,
            x: oe,
            z: He,
            r: Et,
            want: xn ? Math.round(Ht * 0.4) : Ht,
            stand: 0.45,
          };
        })
      : [];
  ot &&
    ps.push({
      name: "Car meet",
      x: Si.x - 10,
      z: Si.z + 40,
      r: 45,
      want: xn ? 10 : 26,
      stand: 0.7,
    });
  let gt =
    ot && uv
      ? Ktt(ot.data, ot.layout, {
          max: xn ? 50 : 180,
          roads: we.roads,
          inst: dt.inst,
          plazas: Le,
          hotspots: ps,
          map: de,
          world: re,
        })
      : null;
  (_.prewarm(dt.group), _.prewarm(Wt));
  let se = performance.now(),
    Nt = new y0();
  (os && Nt.add(os.group),
    Nt.add(dt.group, Wt, me),
    ut && Nt.add(ut.group),
    gt && Nt.add(gt.group),
    ot && Wu().attach({ scene: Nt, world: re, L: ot.layout, peds: gt }));
  let xe = null,
    ce = null;
  Nt.matrixAutoUpdate = !1;
  for (let J of [dt.group, Wt, me]) Ku(J);
  Nt.add(...we.objects);
  let Ge = new fE(Nt, { rain: xn ? 1600 : 4200, skids: xn ? 1600 : 3200 }),
    Fe = (J) => {
      let ht = null,
        mt = -1;
      return (
        J?.root?.traverse?.((Et) => {
          for (let Ht of [].concat(Et.material || [])) {
            let oe = Ht?.color;
            if (!oe) continue;
            let He = Math.max(oe.r, oe.g, oe.b),
              ve =
                He -
                Math.min(oe.r, oe.g, oe.b) +
                (/paint|body/i.test(Ht.name || "") ? 1 : 0);
            ve > mt && ((mt = ve), (ht = [oe.r, oe.g, oe.b]));
          }
        }),
        ht
      );
    },
    $e = null,
    Ds = null,
    Es = null,
    Ls = new uE(Wt, dt.inst, dt.colliders, re, Ge),
    Os;
  (!je.has("flatbay") && !Mf
    ? ((Os = new Q6(new $n(4e4, 4e4), {
        textureWidth: 4,
        textureHeight: 4,
        waterNormals: new ei(),
        sunDirection: new xt(0, 1, 0),
        sunColor: 16777215,
        waterColor: 730672,
        distortionScale: 2.2,
        fog: !1,
      })),
      (Os.rotation.x = -Math.PI / 2))
    : (Os = new _e(
        new $n(4e4, 4e4).rotateX(-Math.PI / 2),
        new Ee({
          color: new $t(0.018, 0.035, 0.04),
          roughness: 0.07,
          metalness: 0,
        }),
      )),
    (Os.position.y = m4),
    (Os.name = "Bay"),
    Nt.add(Os));
  let hs = new ks(8e3, 8e3, 1600, 64, 8, !0);
  {
    let J = hs.attributes.position,
      ht = new Float32Array(J.count * 4);
    for (let mt = 0; mt < J.count; mt++) {
      let Et = J.getY(mt) + 800,
        Ht = Math.max(0, 1 - Et / 1280);
      ht.set([1, 1, 1, Math.pow(Ht, 1.6)], mt * 4);
    }
    (hs.setAttribute("color", new Te(ht, 4)), hs.translate(0, 693, 0));
  }
  let Zs = new _e(
    hs,
    new ln({
      color: 16777215,
      transparent: !0,
      depthWrite: !1,
      vertexColors: !0,
      fog: !1,
      side: Ss,
    }),
  );
  ((Zs.name = "Haze"), (Zs.renderOrder = -1), Nt.add(Zs));
  let Is = je.has("physky") ? new V5() : null;
  (Is && (Is.scale.setScalar(1e4), Nt.add(Is), (_.physicalSky = !0)),
    Nt.add(ZMt()));
  let ns = new Wf(16777215, 3);
  ((ns.isSunLight = !0),
    (ns.castShadow = !0),
    (ns.shadow.camera.far = xn ? 90 : 150),
    (je.has("noshadow") || Mf) && (ns.castShadow = !1),
    (_.sunFitSlack = 0.15),
    (_.shadowBiasM = 0.05),
    Nt.add(ns));
  let rn = new P1(16777215, 4473924, 0);
  Nt.add(rn);
  let dn = null,
    Hn = {
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
    Un = null,
    Xs = y,
    _i = null,
    Mt = (J) => {
      if (!ot?.data?.bld || je.has("nosunfield")) return;
      let ht = performance.now(),
        mt = pq(fb(ot.data), NM(J), _i);
      (mt && (_i = mt.data),
        _.setSunField(mt),
        (window.__sf.sunFieldMs = performance.now() - ht));
    };
  async function Kt(J, ht = !1) {
    Xs = J;
    let mt = ha[J],
      Et = NM(mt);
    (ns.position.copy(Et).multiplyScalar(100),
      ns.color.setRGB(...mt.sun),
      (ns.intensity = mt.sunI),
      (ns.castShadow = B !== "safe" && !je.has("noshadow") && mt.sunEl > 0),
      Mt(mt),
      Is && Is.material.uniforms.sunPosition.value.copy(Et),
      Os.isWater &&
        (Os.material.uniforms.sunDirection.value.copy(
          NM({ ...mt, sunEl: Math.max(mt.sunEl, 5) }),
        ),
        (dn = mt),
        _._so && Dn(_._so, mt)));
    let Ht = await xst(FM(mt), xn ? 512 : 1024);
    (FM(mt) !== mt && ust(mt),
      (Nt.background = Ht),
      (Nt.environment = Ht),
      (Nt.environmentIntensity = mt.env ?? 1));
    let oe = xn
      ? FM(mt) !== mt
        ? 512
        : 0
      : E === "ultra"
        ? 4096
        : E === "perf"
          ? 2048
          : 3072;
    (oe &&
      CN(mt, oe, Yf("sky")).then((ts) => {
        if (ts)
          if (Xs === J && Nt.environment === Ht) {
            let ds = Nt.background;
            ((Nt.background = ts), ds !== Ht && ds?.dispose?.());
          } else ts.dispose();
      }),
      (Nt.fog = new x1(new $t(...mt.fog), mt.fogD * (xn ? 1.35 : 1))),
      (Nt.fog.d0 = Nt.fog.density),
      (_.toneMappingExposure = mt.exposure),
      _.skyVis && (_.skyVis.floor = +(je.get("skyf") ?? mt.skyFloor ?? 0.25)),
      (_.grade = j5(mt.grade)),
      (_.bloom = mt.bloom ?? 0.075),
      (_._composerThr = ((mt.bloomK ?? 1.4) * 0.6) / mt.exposure),
      (_.flare =
        mt.flare && mt.sunEl > 0
          ? { dir: [Et.x, Et.y, Et.z], strength: mt.flare, color: mt.sun }
          : null),
      (_.keepDepth = !0),
      (_.shafts =
        mt.shafts && mt.sunEl > 0 && !xn
          ? {
              dir: [Et.x, Et.y, Et.z],
              strength: +(je.get("shafts") ?? mt.shafts),
              color: mt.shaftC || mt.fog,
            }
          : null),
      (_.carWet = +(je.get("carwet") ?? (mt.wet ? 1 : mt.bank ? 0.3 : 0))));
    {
      let ts = PN(nT(mt, Et.x, Et.z), mt.exposure),
        ds = PN(nT(mt, -Et.x, -Et.z), mt.exposure),
        Me = mt.fog,
        ms = (qo, Er, Xa) => qo.map((id, od) => id * (1 - Xa) + Er[od] * Xa),
        fs = mt.night > 0.5 ? 0.3 : 1;
      _.fogScatter = {
        sun: ms(Me, ts, 0.55 * fs),
        away: ms(Me, ds, 0.45 * fs),
        falloff: mt.fall ?? 0,
        base: m4,
        reach: mt.aerial ?? 1500,
        power: 3,
        linear: mt.fogLin ?? 0,
        elev: mt.fall && !mt.bank ? [90, 250] : null,
      };
      let Bn = hs.attributes.color,
        Zi = hs.attributes.position,
        Eo = 0.75 + 0.25 * mt.haze;
      for (let qo = 0; qo < Zi.count; qo++) {
        let Er = Zi.getX(qo),
          Xa = Zi.getZ(qo),
          id = nT(mt, Er, Xa),
          od = 0.35;
        Bn.setXYZ(
          qo,
          (id[0] * (1 - od) + Me[0] * od) * Eo,
          (id[1] * (1 - od) + Me[1] * od) * Eo,
          (id[2] * (1 - od) + Me[2] * od) * Eo,
        );
      }
      ((Bn.needsUpdate = !0), Zs.material.color.setRGB(1, 1, 1));
    }
    let He = mt.night;
    for (let ts of Object.values(K))
      ts.color.setRGB(
        ts === K.road || ts === K.roadDeck || ts === K.roadTun
          ? mt.damp || -(mt.patches || 0)
          : 1,
        mt.wet || 0,
        He,
      );
    if (K.spill) {
      let ts = (XMt ?? mt.spill ?? 0.42) * He * (mt.wet ? 1.25 : 1);
      (K.spill.color.setRGB(ts, ts, ts), (K.spill.visible = He > 0.05));
    }
    for (let ts of dt.night || [])
      ts.color.setRGB(ts.userData.dayGlow ?? 0, mt.wet || 0, He);
    (P0.setNight(He, mt.wet || 0),
      Dd.setNight(He, mt.wet || 0),
      tt.lamp.color.setRGB(0, 0, He),
      tt.furn.color.setRGB(1, mt.wet || 0, He),
      tt.carlamp.color.setRGB(0, 0, 0),
      Dt.color.setRGB(1, 0, He),
      qL(Pt, He),
      Pe(He));
    let ve = mt.glowFill || {};
    ((rn.intensity = He > 0.3 ? (mt.cityGlow ?? 0.5) * He : 0),
      rn.color.setRGB(...(ve.sky || [0.2, 0.22, 0.3])),
      rn.groundColor.setRGB(...(ve.ground || [0.62, 0.42, 0.24])),
      (te = { i: 230, ang: 1.18, pen: 0.85, bw: 0, ...mt.lamps }));
    for (let ts of _t) ((ts.angle = te.ang), (ts.penumbra = te.pen));
    {
      let ts = He > 0.3 || !!mt.wet;
      Bu(zt, { tail: ts ? 1 : 0.35, head: ts ? 1 : 0, signal: 0 });
    }
    (zt.waymo &&
      !zt.paintKit &&
      zt.materials.Body.color.setScalar(1 - 0.15 * He),
      zt.onNight?.(He),
      ht || Zn(mt.name));
  }
  let bt = {
      lamp: [2.55, 8.1, 1],
      lamp2: [0, 5.85, 0.8],
      plamp: [0, 4.2, 0.45],
      dlamp: [0, 4.4, 0.5],
    },
    wt = dt.inst
      .filter((J) => bt[J.kind])
      .map((J) => {
        let ht = bt[J.kind];
        return Object.assign(
          new xt(
            J.x + Math.sin(J.rot) * ht[0],
            J.y + ht[1],
            J.z + Math.cos(J.rot) * ht[0],
          ),
          { prop: J, k: ht[2], arm: ht[0] > 0 },
        );
      }),
    _t = [],
    ie = Mf ? 2 : xn ? 4 : 32;
  for (let J = 0; J < ie; J++) {
    let ht = new Mc(new $t(1, 0.72, 0.42), 0, 34, 1.18, 0.85, 2);
    ((ht.visible = !1),
      (ht.userData.mbNear = 0.3),
      (ht.shadow.camera.near = 0.6),
      (ht.shadow.camera.far = 40),
      (ht.shadow.bias = -4e-4),
      (ht.shadow.normalBias = 0.04),
      Nt.add(ht, ht.target),
      _t.push(ht));
  }
  let te = { i: 230, ang: 1.18, pen: 0.85, bw: 0 },
    Qt = new $t(1, 0.86, 0.68),
    ge = new $t(1, 0.58, 0.26),
    pt = new $t(1, 0.74, 0.46),
    le = new xt(),
    Ut = performance.now(),
    zt = await Q,
    ft = performance.now();
  (Nt.add(zt.root), (Wu().carDoors = () => zt?.doors || null));
  let kt = [-1, 1].map((J) => {
    let ht = new Mc(new $t(0.9, 0.95, 1), 0, 90, 0.52, 0.92, 1.6);
    return (
      (ht.castShadow = J < 0 && !xn),
      (ht.visible = !1),
      (ht.userData.mbLowBeam = !0),
      (ht.userData.mbNear = 0.9),
      ht
    );
  });
  St();
  let Ft = Array.from({ length: xn ? 1 : 5 }, () => {
      let J = new Mc(new $t(0.92, 0.95, 1), 0, 55, 0.5, 0.9, 1.7);
      return (
        (J.visible = !1),
        (J.userData.mbLowBeam = !0),
        (J.userData.mbNear = 0.9),
        Nt.add(J, J.target),
        J
      );
    }),
    Gt = null,
    Bt = `
fn mbAlbedo(uv: vec2f, wp: vec3f, col: vec4f, bc: vec4f) -> vec4f {
  let d = length(F.camPos.xyz - wp);
  gHE = col.rgb * bc.b * 9.0 * clamp(d / 650.0, 1.0, 4.0);
  gHK = vec4f(1.0, 0.0, 0.0, 1.0);
  return vec4f(vec3f(0.0), smoothstep(360.0, 460.0, d) * step(0.3, bc.b));
}`;
  _.prewarm([{ userData: { mbAlbedo: Bt }, alphaTest: 0.5 }]);
  let Se = () => {
      Gt && Vt >= 0.5 && !Gt.visible && _._hookPipe(Bt) && (Gt.visible = !0);
    },
    Vt = 0,
    Ts = null,
    Qs = [],
    Jt = new Ax(ai ? cs[Jn].spec : th),
    Ns = (Jt.da = new J_(Gw(ai ? Jn : "free"))),
    Sa = new ez(Nt);
  ((Ns.env.L = ot?.layout || null),
    (Ns.env.roads = we.roads?.laneV ? we.roads : null),
    gt && Ns.env.peds.push(gt.peds),
    (Ns.env.traffic = we.roads ? we : null),
    (Ns.env.route = () =>
      vt && cr && (vt.state === "offer" || vt.state === "ride")
        ? vt.route
        : null),
    (Ns.env.rides = () => (vt && cr ? vt : null)));
  let kl = null,
    _l = () => vt || (kl ||= ot ? new Bw(ot.data, ot.layout) : null);
  Ns.env.router = ot
    ? {
        routeTo: (...J) => _l().routeTo(...J),
        _route: (...J) => _l()._route(...J),
      }
    : null;
  let rr = (J) =>
    Zn(
      "Driving level \xB7 " +
        (Fm[J]?.short || J) +
        (J === "l5" && Ns.prof?.name ? " \xB7 " + Ns.prof.name : ""),
      Fm[J]?.sub || "",
      "",
      { key: "level" },
    );
  (ot &&
    at &&
    !rt &&
    !ki &&
    (os?.update(at[0], at[1], null),
    (at = tZ(ot.data, ot.layout, re, at) || at)),
    rt
      ? Jt.place(rt[0], rt[1], rt[2] || 0)
      : at
        ? Jt.place(...at)
        : Jt.place(ae[7] + 25, fe[16] + 2.5, -Math.PI / 2));
  let Ue = new Di(60, innerWidth / innerHeight, 0.3, 9e3);
  we.cam = Ue;
  let Ci = new qz(Ue, re),
    ro = new D_(),
    Sf = new U_(),
    Lo = new xt(),
    Yr = [];
  ai && Ci.setScale(cs[Jn].cam);
  let Ln = new Vz();
  if ((Ln.bindTouch(document.body), Yu)) {
    Ln.bindGestures(Js("view"));
    for (let J of ["gesturestart", "gesturechange"])
      document.addEventListener(J, (ht) => ht.preventDefault(), {
        passive: !1,
      });
    (Js("view").addEventListener(
      "touchstart",
      (J) => {
        document.body.classList.contains("play") && J.preventDefault();
      },
      { passive: !1 },
    ),
      Js("view").addEventListener("touchmove", (J) => J.preventDefault(), {
        passive: !1,
      }));
  }
  let hn = null,
    zl = ot
      ? (J, ht) => (ot.layout.coverAt(J, ht) & 8) !== 0
      : (J, ht) => J > Ve.x || ht < Ve.z,
    qp;
  (addEventListener("resize", () => {
    if (!globalThis.SF_IOS) {
      lr();
      return;
    }
    (clearTimeout(qp), (qp = setTimeout(lr, 200)));
  }),
    lr());
  let mh = 0,
    Ps = null,
    tn = 4,
    Bi = 0,
    ci = 0,
    qn = 0;
  (tc(zt, Jt),
    Ci.update(1 / 60, Jt, zt, { lookBack: !1 }),
    Wp("Lighting the city", 0.93, 0.2),
    _.prewarm(Nt));
  let Hs = performance.now();
  await Kt(Xs);
  let Qo = performance.now();
  Wp("Compiling shaders", 0.98, 0.4);
  let Ju = performance.now();
  await QD();
  let l2 = performance.now(),
    El = performance.now();
  await _.compileAsync(Nt);
  let Zu = performance.now(),
    dv = _.prepareMaterials(Nt);
  (!uh || ki ? await dv : dv.catch((J) => console.warn("materials", J)),
    _.render(Nt, Ue));
  let OM = performance.now(),
    HM = _.finish?.();
  Qs = _.pendingTextures(Nt);
  let ta = xE(),
    In = new mE(Jt, {
      onPause: () => {
        (Ln.releaseGestures?.(), hn?.suspend());
      },
      onResume: () => hn?.resume(),
      audio: () => hn,
      carId: () => (ai ? Jn : "free"),
    });
  document.addEventListener("visibilitychange", () => {
    document.hidden &&
      document.body.classList.contains("play") &&
      !ki &&
      !ri?.open &&
      In.set(!0);
  });
  let ri = new eT({
      v: Jt,
      traffic: we,
      real: ot,
      mobile: xn,
      onOpen: () => {
        (Ln.releaseGestures?.(), hn?.suspend());
      },
      onClose: () => hn?.resume(),
    }),
    lc = null;
  if (vt) {
    let J = Or()
      ? null
      : Fr("assets/tex/peds.webp", (ht) => {
          ((ht.colorSpace = is), (ht.flipY = !1), (ht.anisotropy = 8));
        });
    ((lc = new Wz({
      rides: vt,
      scene: Nt,
      map: ri,
      audio: () => hn,
      pedTex: J,
      L: ot.layout,
      mph: () => ta,
      carName: () => cs[Jn]?.name || "Waymo",
    })),
      _.prewarm(lc.group));
  }
  let NN = "",
    BN = 0,
    ON = "",
    HN = "",
    DN = "",
    oT = 9e3,
    c2 = -135,
    pv = 135,
    kf = (J, ht) =>
      [
        120 + J * Math.sin((ht * Math.PI) / 180),
        120 - J * Math.cos((ht * Math.PI) / 180),
      ].map((mt) => mt.toFixed(2)),
    mv = (J, ht, mt) => {
      let Et = kf(J, ht),
        Ht = kf(J, mt);
      return `M${Et[0]} ${Et[1]}A${J} ${J} 0 ${mt - ht > 180 ? 1 : 0} 1 ${Ht[0]} ${Ht[1]}`;
    },
    UN = (J) => c2 + ((pv - c2) * J) / oT,
    GN = () => {
      (Js("rpmT").setAttribute("d", mv(86, c2, pv)),
        Js("rpm").setAttribute("d", mv(86, c2, pv)),
        Js("red").setAttribute("d", mv(86, UN(8e3), pv)),
        Js("nosT").setAttribute("d", mv(110, -160, -95)),
        Js("nos").setAttribute("d", mv(110, -160, -95)));
      let J = "";
      if (ai && !jw.has(Jn))
        for (let mt = 0; mt <= 100; mt += 5) {
          let Et = c2 + ((pv - c2) * mt) / 100,
            Ht = mt % 25 === 0,
            oe = kf(Ht ? 74 : 78, Et),
            He = kf(81, Et);
          if (
            ((J += `<line class="tick${Ht ? "" : " min"}" x1="${oe[0]}" y1="${oe[1]}" x2="${He[0]}" y2="${He[1]}"/>`),
            Ht)
          ) {
            let ve = kf(63, Et);
            J += `<text class="num" x="${ve[0]}" y="${ve[1]}">${mt}</text>`;
          }
        }
      else
        for (let mt = 0; mt <= oT; mt += 500) {
          let Et = UN(mt),
            Ht = mt % 1e3 === 0,
            oe = kf(Ht ? 74 : 77, Et),
            He = kf(81, Et);
          if (
            ((J += `<line class="tick${Ht ? "" : " min"}" x1="${oe[0]}" y1="${oe[1]}" x2="${He[0]}" y2="${He[1]}"/>`),
            Ht)
          ) {
            let ve = kf(64, Et);
            J += `<text class="num${mt >= 8e3 ? " r" : ""}" x="${ve[0]}" y="${ve[1]}">${mt / 1e3}</text>`;
          }
        }
      let ht = kf(110, -165);
      ((J += `<circle class="nosI" cx="${ht[0]}" cy="${ht[1]}" r="3.2"/>`),
        (Js("ticks").innerHTML = J),
        document.body.classList.toggle("ice", ai && jw.has(Jn)));
    };
  GN();
  let aT = 0,
    rT = 0,
    Mst = 0,
    lT = 0,
    Qu = {},
    Sst = {},
    jp = (J) => (Sst[J] ||= Js(J)),
    gv = (J, ht) => {
      ((ht = String(ht)),
        Qu[J] !== ht && ((Qu[J] = ht), (jp(J).textContent = ht)));
    },
    DM = (J, ht) => {
      Qu["d" + J] !== ht &&
        ((Qu["d" + J] = ht), (jp(J).style.strokeDashoffset = ht));
    },
    _f = { s: "", u: "", g: "", d: !1 };
  (await HM, Wp("Ready", 1));
  {
    let J = 0;
    wq((ht) =>
      setTimeout(
        () => {
          try {
            ht();
          } catch (mt) {
            console.warn("late:", mt);
          }
        },
        500 + 350 * J++,
      ),
    );
  }
  (ot?.plantLater &&
    !xn &&
    !je.has("nounder") &&
    setTimeout(() => {
      let J = performance.now();
      for (
        qt = mx(
          ot.plantLater(),
          tt,
          null,
          (ht, mt) => ot.layout.driveHeight(ht, mt),
          Wt.userData.K,
        ),
          qt.name = "Understory",
          qt.userData.cull(Ue.position.x, Ue.position.z, 420, Ue.position.y);
        qt.userData.step();
      );
      (Ku(qt),
        Nt.add(qt),
        _.upload(qt),
        (window.__sf.plantsRoot = qt),
        je.has("nograss") ||
          ((xe = bJ(ot.layout, tt.shrubleaf)),
          xe.update(Ue.position.x, Ue.position.z, !0),
          Nt.add(xe.mesh),
          (window.__sf.grass = xe)),
        Z?.grassAt &&
          !je.has("noblades") &&
          ((ce = xJ(ot.layout, Z)),
          ce.update(Ue.position.x, Ue.position.z, !0),
          Nt.add(ce.mesh),
          (window.__sf.blades = ce)),
        console.log(
          `understory: ${JSON.stringify(ot.stats.understory)}, ${(performance.now() - J).toFixed(0)} ms`,
        ));
    }, 700),
    ot?.claimedAt &&
      !xn &&
      !Mf &&
      !je.has("noyards") &&
      setTimeout(
        () =>
          io("assets/veg/yards.bin")
            .then((J) => {
              let ht = performance.now(),
                mt = (he = uJ(J).filter((Et) => !ot.claimedAt(Et.x, Et.z)));
              for (
                Zt = mx(
                  mt,
                  tt,
                  null,
                  (Et, Ht) => ot.layout.driveHeight(Et, Ht),
                  Wt.userData.K,
                ),
                  Zt.name = "Yards",
                  Zt.userData.cull(
                    Ue.position.x,
                    Ue.position.z,
                    420,
                    Ue.position.y,
                  );
                Zt.userData.step();
              );
              (Ku(Zt),
                Nt.add(Zt),
                _.upload(Zt),
                (window.__sf.yardsRoot = Zt),
                console.log(
                  `front yards: ${mt.length} plants, ${(performance.now() - ht).toFixed(0)} ms`,
                ));
            })
            .catch((J) => console.warn("yards:", J)),
        1500,
      ),
    ot &&
      !xn &&
      !je.has("nofar") &&
      setTimeout(
        () =>
          fetch("assets/tex/impostors.json")
            .then((J) => J.json())
            .then(async (J) => {
              ((ee = J),
                (Ct = await lI(
                  dt.inst,
                  Wt.userData.treeKind,
                  J,
                  YL(tt.impostorTex),
                )),
                Ct.userData.cull(Ue.position.x, Ue.position.z),
                Ku(Ct),
                Nt.add(Ct),
                _.upload(Ct),
                (window.__sf.farTrees = Ct),
                console.log(
                  `far trees: ${Ct.userData.trees} in ${Ct.userData.chunks} chunks, ${Ct.userData.ms} ms`,
                ));
            })
            .catch((J) => console.warn("far trees:", J)),
        1200,
      ));
  let zf = [],
    h2 = new Map(),
    WN = 0,
    UM = () =>
      new Promise((J) => requestAnimationFrame(() => setTimeout(J, 0))),
    zst = async (J, ht = 5) => {
      for (;;) {
        let mt = performance.now();
        for (; performance.now() - mt < ht;) if (J.next().done) return;
        await UM();
      }
    },
    GM = (J) => {
      if (!ot || !h0[J] || h2.has(J)) return h2.get(J);
      let ht = performance.now(),
        mt = Pj(ot.data, J, io)
          .then(async (Et) => {
            if (!Et) return;
            let Ht = { colliders: [], inst: [] };
            (await zst(ot.addRegionSteps(Et, Ht)),
              vt && KI(vt.spots, Ht.inst, Ht.colliders),
              WL(Ht.inst, Ht.colliders, !!Pt));
            for (let ve of Ht.colliders)
              ve.parked && re.parkedOff ? re.parkedOff.push(ve) : re.index(ve);
            await UM();
            let oe = (ve) =>
                Math.floor(ve.x / 256) * 65536 + Math.floor(ve.z / 256),
              He = Ht.inst.slice().sort((ve, ts) => oe(ve) - oe(ts));
            for (let ve = 0; ve < He.length; ve += 4e3) {
              let ts = Math.min(He.length, ve + 4e3);
              for (; ts < He.length && oe(He[ts]) === oe(He[ts - 1]);) ts++;
              let ds = He.slice(ve, ts);
              ve = ts - 4e3;
              let Me = mx(ds, tt, Pt, jt, Wt.userData.K);
              for (
                Me.name = "Props_" + J + "_" + zf.length,
                  Me.userData.cull(
                    Ue.position.x,
                    Ue.position.z,
                    B === "safe" ? 130 : B === "mobile" ? 160 : 420,
                    Ue.position.y,
                  );
                Me.userData.step();
              );
              (Jr || Me.userData.setParked(!1),
                Ku(Me),
                _.prewarm?.(Me),
                Nt.add(Me),
                _.upload(Me),
                zf.push(Me),
                await UM());
            }
            (Ls.link(Ht.inst, Ht.colliders),
              ot.ground &&
                ((Et.ground || Et.green) && aI(Et.ground, Et.green, ot.ground),
                x_(ot.ground, Ht.inst)),
              await UM(),
              ri?.refresh?.(Et.green),
              J === "marin" &&
                io("assets/real/marin/docks.bin")
                  .then((ve) => {
                    if (!ve) return;
                    let ts = sZ(ve, { mobile: xn });
                    (Ku(ts), _.prewarm?.(ts), Nt.add(ts), _.upload(ts));
                  })
                  .catch((ve) => console.warn("docks", ve)),
              ee &&
                !xn &&
                lI(Ht.inst, Wt.userData.treeKind, ee, YL(tt.impostorTex)).then(
                  (ve) => {
                    (ve.userData.cull(Ue.position.x, Ue.position.z),
                      Ku(ve),
                      Nt.add(ve),
                      _.upload(ve),
                      Xt.push(ve));
                  },
                ),
              console.log(
                `region ${J}: ${Et.b1 - Et.b0} buildings, ${Ht.inst.length} props, ${(performance.now() - ht).toFixed(0)} ms (its steps ${ot.stats.regions?.[J]?.ms} ms of work)`,
              ));
          })
          .catch((Et) => console.warn("region " + J, Et));
      return (h2.set(J, mt), mt);
    };
  (ot &&
    ((ot.needRegion = GM),
    (window.__sf.loadRegion = GM),
    (window.__sf.regionLoads = h2),
    (!xn || ki || je.has("regions")) &&
      setTimeout(
        async () => {
          for (let J of Object.keys(h0)) await GM(J);
        },
        ki ? 300 : 2600,
      )),
    console.log(
      `load: ready at ${performance.now().toFixed(0)} ms; after the city: scene ${(Ut - se).toFixed(0)} ms, car's wait ${(ft - Ut).toFixed(0)} ms, lighting ${(Qo - Hs).toFixed(0)} ms, textures' wait ${(l2 - Ju).toFixed(0)} ms + upload ${(El - l2).toFixed(0)} ms, compile's wait ${(Zu - El).toFixed(0)} ms, first frame ${(OM - Qo).toFixed(0)} ms + GPU ${(performance.now() - OM).toFixed(0)} ms`,
    ));
  let qN = Js("go");
  if (
    ((!uh || ki) && qN.classList.add("on"),
    Js("title").classList.add("ready"),
    globalThis.SF_BOOT?.ready(),
    xn)
  ) {
    let J =
      _.dropCpu(dt.group) +
      _.dropCpu(zt.root) +
      _.dropCpu(Wt) +
      we.objects.reduce((ht, mt) => ht + _.dropCpu(mt), 0);
    console.log(`phones: ${J} meshes' CPU copies let go`);
  }
  {
    let J = () => {
      !xn && Pt && !je.has("no2k") && HY(Pt);
    };
    S && Pt
      ? setTimeout(
          () =>
            OY(Pt, (ht, mt) => {
              (we?.swapModel?.(ht, mt), Wt.userData.swapCar?.(ht, mt));
              for (let Et of zf) Et.userData.swapCar?.(ht, mt);
            }).then((ht) => {
              (console.log(`cars: ${ht} full meshes in after the load`),
                (window.__sf.carsFull = ht),
                J());
            }),
          300,
        )
      : setTimeout(J, 1500);
  }
  let Est = null,
    jN = null,
    VN = (J) =>
      J === Jn && (J !== "custom" || zt?.rideSha === cs.custom?.ride?.sha);
  async function gh(J) {
    if (ai && J === "custom" && !cs.custom) {
      let ds = bh();
      ds && f2(ds);
    }
    if (!ai || !cs[J] || ((jN = J), VN(J))) return zt;
    let ht = cs[J].ride?.sha,
      mt = await (Est = $(J, !0));
    if (VN(J) || J !== jN || (ht && cs[J]?.ride?.sha !== ht))
      return (W(zt), zt);
    let Et = cs[J],
      Ht = Jt.pos.x,
      oe = Jt.pos.z,
      He = Jt.pos.y,
      ve = Jt.psi;
    if (zt?.custom && zt !== mt) {
      let ds = zt;
      setTimeout(() => ds.root.traverse((Me) => Me.geometry?.dispose?.()), 0);
      for (let Me of Object.keys(G))
        Me.startsWith("custom:") &&
          Me !== "custom:" + mt.rideSha &&
          delete G[Me];
    }
    (Nt.remove(zt.root),
      (Jn = J),
      (zt = mt),
      Nt.add(zt.root),
      St(),
      G0(),
      xn && setTimeout(() => _.dropCpu(mt.root), 1500),
      (Jt.S = Et.spec),
      (Jt.nitro = Et.spec.nitroMax ?? 1),
      Jt.place(Ht, oe, ve, He),
      Jt.da?.setMode(Gw(J)),
      window.__sf.tuneCar?.(),
      Ci.setScale(Et.cam),
      tc(zt, Jt),
      zt.root.updateMatrixWorld(!0),
      GN(),
      In.sync());
    let ts = ha[Xs];
    (zt.onNight?.(ts.night),
      zt.waymo &&
        !zt.paintKit &&
        zt.materials.Body.color.setScalar(1 - 0.15 * ts.night),
      (document.body.dataset.car = J),
      (window.__sf.car = zt),
      (window.__sf.carId = J));
    {
      let ds = WM(J);
      hn?.setVehicle?.(ds.id, { virt: ds.virt });
    }
    (YN(), vi?.carChanged(), W(zt));
    try {
      localStorage.setItem("teleop.car", J);
    } catch {}
    return zt;
  }
  let $N = (J) => {
      try {
        return Nn.list().find((ht) => ht.ride?.sha === J?.sha)?.prompt || "";
      } catch {
        return "";
      }
    },
    cT = (J) => iz(J, $N(J));
  window.__sf.audFor = WM;
  let hT = () => {
      let J = WM(Jn);
      hn?.setVehicle?.(J.id, { virt: J.virt });
    },
    KN = () => {
      let J = cs.custom?.ride;
      return J ? iz({ ...J, snd: null }, $N(J)) : "flat6";
    },
    Tst = () => {
      let J = [];
      for (let ht of Qn.remotes.values()) {
        if (!ht.drawn || !ht.id) continue;
        if (ht._rdA !== ht.rd || ht._idA !== ht.id) {
          ((ht._rdA = ht.rd), (ht._idA = ht.id));
          let Ht = ht.id === "custom" ? oz(ht.rd) : null;
          ((ht.snd = Ht ? iz(Ht) : null),
            (ht.aud = Ht ? ec[ht.snd].audio : cs[ht.id]?.sound || "waymo"));
        }
        let mt = ht.pose,
          Et = mt.speed || 0;
        J.push({
          key: ht.seat,
          aud: ht.aud,
          x: mt.pos.x,
          y: mt.pos.y,
          z: mt.pos.z,
          vx: -Math.sin(mt.psi) * Et,
          vz: -Math.cos(mt.psi) * Et,
          speed: Et,
        });
      }
      return J;
    },
    YN = () => {
      let J = Js("vehicleBtn")?.querySelector("b");
      J && Jn && (J.textContent = cs[Jn]?.name || "Car");
    },
    qM = "sf-drive.ride",
    bh = () => {
      let J = Ks?.ride?.();
      if (J) return J;
      try {
        return vl(JSON.parse(localStorage.getItem(qM) || "null"));
      } catch {
        return null;
      }
    },
    bv = ai
      ? {
          preview: async (J) => {
            let ht = lf(J);
            if (!ht) return !1;
            f2(ht);
            let mt = await gh("custom");
            return !!mt?.custom && mt.rideSha === ht.sha;
          },
          drive: (J) => {
            let ht = lf(J) || cs.custom?.ride;
            if (ht) {
              cs.custom?.ride?.sha === ht.sha &&
                cs.custom.ride.snd &&
                (ht.snd = cs.custom.ride.snd);
              try {
                localStorage.setItem(qM, JSON.stringify(ht));
              } catch {}
              (Ks?.setRide?.(ht), cQ(J?.id));
            }
          },
          revert: (J) => {
            let ht = bh();
            return (
              ht && f2(ht),
              gh(J && (J !== "custom" || ht) ? J : "waymo")
            );
          },
        }
      : null;
  ((window.__sf.ride = bv),
    (document.body.dataset.car = Jn || "ferrari"),
    YN());
  let cr = !0;
  try {
    cr = localStorage.getItem("teleop.fares") !== "off";
  } catch {}
  let JN = (J) => {
    ((cr = J),
      document.body.classList.toggle("freeroam", !J),
      lc && ((lc.group.visible = J), !J && ri && (ri.overlay = null)));
    let ht = Js("faresBtn")?.querySelector("b");
    (ht && (ht.textContent = J ? "ON" : "OFF"),
      Js("faresBtn")?.setAttribute("aria-pressed", String(J)));
    try {
      localStorage.setItem("teleop.fares", J ? "on" : "off");
    } catch {}
  };
  (uh ? JN(cr) : (cr = !0),
    Js("faresBtn")?.addEventListener("click", () => JN(!cr)));
  let H0 = !0,
    Jr = !0;
  if (!ki)
    try {
      ((H0 = localStorage.getItem("sf-drive.traffic") !== "off"),
        (Jr = localStorage.getItem("sf-drive.parked") !== "off"));
    } catch {}
  let fT = (J, ht) => {
      let mt = Js(J);
      mt &&
        ((mt.querySelector("b").textContent = ht ? "ON" : "OFF"),
        mt.setAttribute("aria-pressed", String(ht)));
    },
    Vp = (J, ht = !0) => {
      if (
        ((H0 = !!J),
        we.setEnabled(H0),
        (re.dynamic = we.colliders),
        (_.shadowEpoch = (_.shadowEpoch | 0) + 1),
        fT("trafficBtn", H0),
        ht)
      )
        try {
          localStorage.setItem("sf-drive.traffic", H0 ? "on" : "off");
        } catch {}
      return H0;
    },
    xv = (J, ht = !0) => {
      ((Jr = !!J), Wt.userData.setParked(Jr), os?.setParked(Jr));
      for (let mt of zf) mt.userData.setParked(Jr);
      if (
        (re.setParked(Jr),
        (_.shadowEpoch = (_.shadowEpoch | 0) + 1),
        fT("parkedBtn", Jr),
        ht)
      )
        try {
          localStorage.setItem("sf-drive.parked", Jr ? "on" : "off");
        } catch {}
      return Jr;
    };
  (Vp(H0, !1),
    xv(Jr, !1),
    Js("trafficBtn")?.addEventListener("click", () => Vp(!H0)),
    Js("parkedBtn")?.addEventListener("click", () => xv(!Jr)));
  let po =
      ot && we.roads
        ? new Jz({
            traffic: we,
            world: re,
            v: Jt,
            camera: Ue,
            toast: Zn,
            scene: Nt,
            mobile: xn,
            night: () => ha[Xs].night || 0,
            heights: ot.data?.bld ? () => fb(ot.data) : null,
          })
        : null,
    D0 = !je.has("nopolice");
  if (!ki && D0)
    try {
      D0 = localStorage.getItem("sf-drive.police") !== "off";
    } catch {}
  let jM = (J, ht = !0) => {
    if (((D0 = !!J), po?.setEnabled(D0), fT("policeBtn", D0), ht))
      try {
        localStorage.setItem("sf-drive.police", D0 ? "on" : "off");
      } catch {}
    return D0;
  };
  (jM(D0, !1),
    po || Js("policeBtn")?.remove(),
    Js("policeBtn")?.addEventListener("click", () => jM(!D0)),
    Object.assign(window.__sf, {
      setTraffic: Vp,
      setParked: xv,
      setPolice: jM,
      police: po,
    }));
  let Zr = (window.__sf.tele = new z_({
    map: ri,
    v: Jt,
    R: ot,
    world: re,
    traffic: we,
    cc: Ci,
    rides: () => vt,
    taxi: () => lc,
    fares: () => cr,
    toast: Zn,
  }));
  (ri &&
    ot &&
    (ri.onPickDrive = (J) => {
      let [ht, mt] = $5(J.x, J.z),
        Et = _l()?._snap("Pin", "Pin", ht, mt, J.E?.name || null);
      if (!Et) {
        ri.setPick?.(null, "No kerb here - tap a street");
        return;
      }
      (Ns.setDest(Et),
        Ns.mode !== "l5" && Ns.setMode("l5"),
        (Ns.takeover = !1),
        In.sync(),
        ri.setPick?.(null),
        ri.open && ri.toggle(!1),
        Zn("Level 5", "Driving to " + (J.name || "the pin")));
    }),
    Js("tDA")?.addEventListener("click", (J) => {
      J.stopPropagation();
      let ht = Ns.takeover,
        mt = In.cycleAssist();
      ht || rr(mt);
    }));
  let cc = !uh || ki,
    ZN = !1,
    Wo = uh
      ? new pz({
          current: () => cB(),
          select: (J) => Bst(J),
          list: () => Nst(),
          garage: () => td("picker"),
          confirm: (J) => {
            Ost(J);
            let ht = !cc;
            ((cc = !0),
              ht ? b2() : (document.body.classList.add("play"), hn?.resume()));
          },
          cancel: () => {
            cc && (document.body.classList.add("play"), hn?.resume());
          },
        })
      : null;
  (Wo && (window.__sf.picker = Wo),
    Wo &&
      !ki &&
      setTimeout(() => {
        (Js("title").classList.add("gone"), td("start"));
      }, 700),
    Js("vehicleBtn")?.addEventListener("click", () => {
      Wo &&
        (In.set(!1),
        hn?.suspend(),
        document.body.classList.remove("play"),
        td("picker"));
    }));
  let Qn =
    ai && (globalThis.SF_MP || je.has("mp"))
      ? (window.__sf.mp = new Fz({
          scene: Nt,
          camera: Ue,
          v: Jt,
          world: re,
          carId: () => Jn,
          loadCar: st,
          paint: () => LL(Tf.get(Ef())),
          ride: () =>
            Jn === "custom" && cs.custom
              ? lF({ ...cs.custom.ride, snd: cT(cs.custom.ride) })
              : "",
          night: () => ha[Xs].night || 0,
          toast: Zn,
          map: ri,
          groundAt: ot
            ? (J, ht, mt) => ot.layout.driveHeight(J, ht, null, mt)
            : null,
          worldGet: () => ({
            tr: H0 ? 1 : 0,
            pk: Jr ? 1 : 0,
            tod: Gp.indexOf(Xs),
          }),
          worldSet: (J, ht) => {
            (!ht && J.tr !== (H0 ? 1 : 0) && Vp(!!J.tr, !1),
              J.pk !== (Jr ? 1 : 0) && xv(!!J.pk, !1),
              J.tod >= 0 && Gp[J.tod] && Gp[J.tod] !== Xs && Kt(Gp[J.tod]));
          },
          teleport: (J, ht) => {
            if (!ot || !ri?.P) return !1;
            let mt = Zr.pick(J, ht, 60);
            return !!mt && Zr.go(mt);
          },
          el: { panel: Js("mpPanel"), chip: Js("mpChip"), tags: Js("mpTags") },
        }))
      : null;
  Qn?.enabled && ot && Qn.attachTraffic(we);
  let VM = null,
    uT = (J) => {
      ((cr = J),
        document.body.classList.toggle("freeroam", !J),
        lc && ((lc.group.visible = J), !J && ri && (ri.overlay = null)));
    },
    Gn =
      ai && ot && we.roads && (globalThis.SF_MP || je.has("race"))
        ? (window.__sf.race = new Bz({
            scene: Nt,
            camera: Ue,
            v: Jt,
            world: re,
            roads: we.roads,
            loadCar: st,
            carId: () => Jn,
            toast: Zn,
            map: ri,
            mp: Qn,
            place: (J) => Zr.go({ ...J, quiet: !0 }),
            held: () => Zr.on,
            env: {
              focus() {
                (Wo?.isOpen && (Wo.close(), cc || ((cc = !0), b2())),
                  In.paused && In.set(!1),
                  ri?.open && ri.toggle(!1),
                  document.body.classList.add("play"),
                  hn?.resume?.());
              },
              begin() {
                ((VM = { fares: cr, trafficOn: H0, lvl: Ns.mode }),
                  uh && uT(!1),
                  Vp(!1, !1),
                  Ns.setMode("manual"),
                  In.sync());
              },
              end() {
                if (!VM) return;
                let J = VM;
                ((VM = null),
                  Vp(J.trafficOn, !1),
                  uh && uT(J.fares),
                  J.lvl !== "manual" && Ns.setMode(J.lvl),
                  In.sync(),
                  Qn && (Qn.worldV = void 0));
              },
            },
          }))
        : null;
  Qn &&
    gt &&
    ((gt.onKnock = (J) => Qn.knockSend(J)),
    (Qn.onPeopleKnock = (J) => gt.knockFrom(J)));
  let Ks =
    ai && (globalThis.SF_MP || je.has("mp") || je.has("race"))
      ? (window.__sf.profile = new Dz({
          rides: vt,
          police: po,
          v: Jt,
          carId: () => Jn,
          swapCar: (J) => gh(J),
          place: (J) =>
            ot ? Zr.go({ ...J, quiet: !0 }) : (Jt.place(J.x, J.z, J.psi), !0),
          toast: Zn,
          taxi: () => lc,
          noPos: () => !!Gn?.active || !!Zr.on,
          mph: () => ta,
        }))
      : null;
  (Ks && (Ks.onRide = (J) => f2(J)),
    Ks &&
      (window.__sf.board = new Gz(Ks, {
        tabs: [...document.querySelectorAll("[data-lb]")],
        list: Js("lbList"),
        note: Js("lbNote"),
        more: Js("lbMore"),
      })),
    Ks && !ki && (Ks.load(), Gn && (Gn.onResult = (J) => Ks.raceResult(J))),
    _._hookPipe &&
      IL((J) => {
        try {
          return !!_._hookPipe(J) && !!_._hookPipe(J, !0);
        } catch {
          return !0;
        }
      }));
  let $M = (J, ht) => (J === "custom" && ht ? "c" + ht.slice(0, 24) : J),
    vv = () => null,
    QN = () => null,
    dT = () => {},
    yv,
    Ast = () => {
      let J = yv !== void 0 ? yv : QN(),
        ht = J && vv(J),
        mt = Jn || "ferrari";
      return ht &&
        ht.base === mt &&
        (mt !== "custom" || ht.ride?.sha === zt?.rideSha)
        ? ht
        : null;
    },
    Rst = () => {
      let J = Ast();
      return J ? "m:" + J.id : $M(Jn || "ferrari", zt?.rideSha);
    },
    u2 = "sf-drive.custom",
    Ef = Rst,
    Pst = () => {
      let J = window.__sf.home,
        ht = window.__sf.garage;
      if (!ht?.isOpen || ht.mode !== "home" || !J?.sel?.startsWith("m:"))
        return null;
      let mt = J.selected();
      return mt && J.isCurrent?.(mt) ? J.sel : null;
    },
    Tf = {
      get(J) {
        if (J?.startsWith("m:")) {
          let mt = vv(J.slice(2));
          return mt ? qa(mt.paint) : null;
        }
        let ht = Ks?.custom(J);
        if (ht !== void 0) return ht;
        try {
          return JSON.parse(localStorage.getItem(u2) || "{}")[J]?.paint || null;
        } catch {
          return null;
        }
      },
      set(J, ht) {
        if (((ht = qa(ht)), J?.startsWith("m:"))) {
          (dT(J.slice(2), { paint: ht }), Qn?.paintChanged?.());
          return;
        }
        try {
          let mt = JSON.parse(localStorage.getItem(u2) || "{}");
          ((mt[J] = { ...(mt[J] || {}), paint: ht, t: Date.now() }),
            localStorage.setItem(u2, JSON.stringify(mt)));
        } catch {}
        (Ks && Ks.setCustom(J, ht), Qn?.paintChanged?.());
      },
    },
    tB = new Map(),
    eB = (J) => {
      if (cs.custom?.ride?.sha === J.sha) return cs.custom.spec;
      let ht = tB.get(J.sha);
      return (ht || tB.set(J.sha, (ht = zz(J, null).spec)), ht);
    },
    Cst = (J) =>
      [cs.custom?.ride, ...sB(), ...Nn.list().map((ht) => ht.ride), bh()].find(
        (ht) => ht?.sha?.startsWith(J),
      ) || null,
    sB = () => [],
    $p = (J) => {
      if (!ai) return th;
      if (J?.startsWith("m:")) {
        let ht = vv(J.slice(2));
        return ht
          ? ht.base === "custom"
            ? ht.ride
              ? eB(ht.ride)
              : th
            : $p(ht.base)
          : th;
      }
      if (/^c[0-9a-f]{24}$/.test(J)) {
        let ht = Cst(J.slice(1));
        return ht ? eB(ht) : cs.custom?.spec || th;
      }
      return cs[J]?.spec || th;
    },
    U0 = {
      get(J) {
        if (J?.startsWith("m:")) {
          let mt = vv(J.slice(2));
          return mt ? Uo(mt.tune) : null;
        }
        let ht = Ks?.tune?.(J);
        if (ht !== void 0) return Uo(ht);
        try {
          return Uo(JSON.parse(localStorage.getItem(u2) || "{}")[J]?.tune);
        } catch {
          return null;
        }
      },
      set(J, ht) {
        if (((ht = Uo(ht)), J?.startsWith("m:"))) {
          (dT(J.slice(2), { tune: ht }), Qn?.paintChanged?.());
          return;
        }
        try {
          let mt = JSON.parse(localStorage.getItem(u2) || "{}");
          ((mt[J] = { ...(mt[J] || {}), tune: ht, t: Date.now() }),
            localStorage.setItem(u2, JSON.stringify(mt)));
        } catch {}
        (Ks && Ks.setTune(J, ht), Qn?.paintChanged?.());
      },
    },
    nB = (J, ht = !1) => {
      let mt = Ef();
      if (((J = Uo(J)), !ht)) {
        let oe = gF($p(mt), J);
        ((Jt.S = oe),
          Jt.nitro > (oe.nitroMax ?? 1) && (Jt.nitro = oe.nitroMax ?? 1),
          hn?.setExhaust?.(FQ[Va(J, "exhaust")]));
      }
      let Et = sM(J),
        Ht =
          !Et.rim &&
          !Et.size &&
          !Et.side &&
          !Et.dh &&
          !Et.camF &&
          !Et.camR &&
          !Et.wing &&
          !Et.width;
      try {
        nM(
          zt,
          Ht ? null : Et,
          (window.__sf.garage?.isOpen
            ? window.__sf.garage.draft?.rim
            : Tf.get(mt)?.rim) || null,
        );
      } catch (oe) {
        console.warn("tune look", oe);
      }
    },
    iB = (window.__sf.tuneCar = () => nB(U0.get(Ef()))),
    G0 = () => {
      ($r(zt, Tf.get(Ef())), iB());
    };
  ((window.__sf.paintCar = G0),
    G0(),
    Ks &&
      (Ks.onCustom = () => {
        (vi?.isOpen || G0(), Qn?.paintChanged?.());
      }));
  let oB = !1,
    vi = (window.__sf.garage = new gz({
      engine: {
        get: () => cs.custom?.ride?.snd || null,
        auto: () => KN(),
        list: () => nz.map((J) => [J, ec[J].label]),
        set: (J) => XN(J, !0),
      },
      mb: _,
      scene: Nt,
      camera: Ue,
      v: Jt,
      car: () => zt,
      carId: () => Pst() || Ef(),
      store: Tf,
      toast: Zn,
      night: () => ha[Xs].night || 0,
      ride: bv,
      pick: Wo
        ? () => {
            (vi.close(), Wo.open({ first: !cc }));
          }
        : null,
      exit: (J) => {
        if (J === "drive") {
          (G0(),
            Wo?.isOpen && Wo.close(),
            cc
              ? (document.body.classList.add("play"),
                In.set(!1),
                hn?.resume?.())
              : ((cc = !0), b2()));
          return;
        }
        (J === "start" && !cc) ||
          (J === "picker"
            ? (document.body.classList.add("play"), In.set(!1), hn?.resume?.())
            : (oB && document.body.classList.add("play"), In.set(!0)));
      },
    })),
    td = (J, ht = "home") => {
      ((oB = J === "pause" ? !0 : document.body.classList.contains("play")),
        J === "pause" && (In.set(!1), hn?.suspend()),
        vi.open({ from: J, mode: ht }));
    };
  ((window.__sf.openGarage = td),
    (vi.fleetOf = () => cs[Jn || "ferrari"] || null));
  let Lst = (window.__sf.tuning = new Ez({
      garage: vi,
      base: $p,
      store: U0,
      toast: Zn,
      level: () => vi.level?.() ?? 99,
      live: (J, ht) => nB(J, ht),
      wallet: () => (Ks?.ready ? Ks.wallet() : null),
      spend: (J, ht) => !!Ks?.spend(J, ht),
      savePaint: () => {
        if (!vi.draft && !vi.saved) return;
        let J = qa(vi.draft);
        JSON.stringify(J) !== JSON.stringify(vi.saved) &&
          ((vi.saved = J), Tf.set(Ef(), J));
      },
      drive: () => {
        (document.body.classList.add("play"), In.set(!1), hn?.resume?.());
      },
      reopen: (J) => td(J === "picker" ? "picker" : "pause", "edit"),
      keyOf: (J) =>
        J === "custom"
          ? cs.custom?.ride?.sha
            ? "c" + cs.custom.ride.sha.slice(0, 24)
            : null
          : J.startsWith("b:")
            ? ((ht) => (ht?.sha ? "c" + ht.sha.slice(0, 24) : null))(
                Nn.get(J.slice(2))?.ride,
              )
            : J,
    })),
    aB = "sf-drive.cars",
    d2 = "sf-drive.thumbs",
    rB = "sf-drive.mine",
    Af = (J, ht) => {
      try {
        return JSON.parse(localStorage.getItem(J) || "null") ?? ht;
      } catch {
        return ht;
      }
    },
    wv = (J, ht) => {
      try {
        localStorage.setItem(J, JSON.stringify(ht));
      } catch {}
    },
    Pa = () => (Ks?.ready ? Ks.cars() : cM(Af(aB, []))),
    XM = () => (Ks?.ready ? Ks.p.mine : Af(rB, null)),
    ed = (J, ht) => {
      ((J = cM(J)),
        wv(aB, J),
        ht !== void 0 && wv(rB, ht),
        Ks?.ready && Ks.setCars(J, ht));
    };
  ((vv = (J) => Pa().find((ht) => ht.id === J) || null),
    (QN = XM),
    (sB = () => Pa().map((J) => J.ride)),
    (dT = (J, ht) =>
      ed(
        Pa().map((mt) => (mt.id === J ? { ...mt, ...ht, t: Date.now() } : mt)),
      )));
  let lB = (J) =>
      J
        ? J.kind === "fleet"
          ? J.id
          : J.kind === "mine"
            ? "m:" + J.c.id
            : ((ht) => (ht?.sha ? "c" + ht.sha.slice(0, 24) : null))(
                J.ride || lf(J.item),
              )
        : null,
    Ist = (J, ht) => {
      $r(zt, J);
      let mt = sM(ht),
        Et =
          !mt.rim &&
          !mt.size &&
          !mt.side &&
          !mt.dh &&
          !mt.camF &&
          !mt.camR &&
          !mt.wing &&
          !mt.width;
      try {
        nM(zt, Et ? null : mt, J?.rim || null);
      } catch (Ht) {
        console.warn("look", Ht);
      }
    },
    KM = async (J) => {
      if (((J = vl(J)), !J)) return !1;
      f2(J);
      let ht = await gh("custom");
      return (hT(), !!ht?.custom && ht.rideSha === J.sha);
    },
    YM = "sf-drive.recent",
    pT = (J) => {
      if (!J) return;
      let ht = Af(YM, []).filter((mt) => typeof mt == "string" && mt !== J);
      (ht.unshift(J), wv(YM, ht.slice(0, 12)));
    },
    JM = (J) =>
      J
        ? [
            [J.t100.toFixed(1) + " s", "0-100 km/h"],
            [String(Math.round(J.top)), "km/h top"],
            [J.g.toFixed(2) + " g", "grip"],
          ]
        : [];
  async function Bst(J) {
    if (J.startsWith("m:")) {
      let ht = Pa().find((mt) => mt.id === J.slice(2));
      ht && (await sd.preview({ kind: "mine", c: ht }));
      return;
    }
    if (J.startsWith("b:")) {
      let ht = Nn.get(J.slice(2));
      (ht?.ride && (await KM(ht.ride)), G0());
      return;
    }
    (await gh(J), G0(), window.__sf.tuneCar?.());
  }
  ((ZN = !0), (vi.started = () => cc));
  let sd = {
    recent: () => {
      let J = Af(YM, []),
        ht = [];
      for (let mt of J)
        if (
          (mt.startsWith("m:") || mt.startsWith("b:")
            ? ht.push(mt)
            : mt === "custom"
              ? cs.custom?.ride && ht.push("r:" + cs.custom.ride.sha)
              : ht.push("f:" + mt),
          mt.startsWith("b:"))
        ) {
          let Et = Nn.get(mt.slice(2));
          Et?.ride && ht.push("r:" + Et.ride.sha);
        }
      return ht;
    },
    renameMine(J, ht) {
      let mt = String(ht || "")
        .replace(/[\u0000-\u001f<>]/g, "")
        .trim()
        .slice(0, 28);
      mt && ed(Pa().map((Et) => (Et.id === J ? { ...Et, name: mt } : Et)));
    },
    setEngine: XN,
    engineAuto: KN,
    engine: () => (Jn === "custom" ? cs.custom?.ride?.snd || null : void 0),
    current: () => ({ id: Jn, sha: zt?.rideSha || null, mine: XM() }),
    mine: Pa,
    thumb: (J) => Af(d2, {})[J] || null,
    wallet: () => (Ks?.ready ? Ks.wallet() : null),
    spend: (J, ht) => (Ks ? !!Ks.spend(J, ht) : !0),
    level: () => vi.level?.() ?? 99,
    car: () => zt,
    tuneOf: (J) => U0.get(J),
    toast: Zn,
    look: Ist,
    baseTune: (J) =>
      U0.get(
        J?.kind === "fleet"
          ? J.id
          : lB({ kind: "ride", ride: J?.ride, item: J?.item }),
      ),
    stats: (J, ht, mt) => {
      try {
        let Et = mt ? lB(mt) : J;
        return !Et || Et === "custom"
          ? null
          : ic($p(Et), mt ? U0.get(Et) : (ht ?? U0.get(Et)), Et);
      } catch {
        return null;
      }
    },
    async preview(J) {
      if (((yv = J.kind === "mine" ? J.c.id : null), J.kind === "fleet"))
        return (await gh(J.id), G0(), Jn === J.id);
      if (J.kind === "mine") {
        let ht = J.c,
          mt =
            ht.base === "custom"
              ? await KM(ht.ride)
              : (await gh(ht.base), Jn === ht.base);
        return (mt && G0(), mt);
      }
      if (J.kind === "ride") {
        let ht = J.item ? await bv.preview(J.item) : await KM(J.ride);
        return (ht && G0(), ht);
      }
      return !1;
    },
    drive(J) {
      if (
        ((yv = void 0),
        pT(
          J.kind === "mine"
            ? "m:" + J.c.id
            : J.kind === "fleet"
              ? J.id
              : (() => {
                  let ht = J.ride?.sha || J.item?.files?.glb?.sha256,
                    mt = ht && Nn.list().find((Et) => Et.ride?.sha === ht);
                  return mt ? "b:" + mt.id : "custom";
                })(),
        ),
        J.kind === "mine")
      ) {
        let ht = J.c;
        (ht.base === "custom" && bv.drive(ht.ride),
          ed(
            Pa().map((Et) => (Et.id === ht.id ? { ...Et, driven: !0 } : Et)),
            ht.id,
          ),
          G0());
        return;
      }
      (ed(Pa(), null), J.kind === "ride" && bv.drive(J.item || J.ride), iB());
    },
    async retry(J) {
      return (
        zt?.placeholder &&
          zt.rideSha &&
          (delete G["custom:" + zt.rideSha], (zt.rideSha = null)),
        sd.preview(J)
      );
    },
    async revert(J) {
      yv = void 0;
      let ht = J.id === "custom" ? await KM(bh()) : (await gh(J.id), !0);
      return (ht && G0(), ht);
    },
    saveMine(J) {
      let ht = "b" + Date.now().toString(36),
        mt = {
          id: ht,
          name: J.name,
          base: J.base,
          ride:
            J.base === "custom"
              ? ((Et) => {
                  if (!Et || !("snd" in J)) return Et;
                  let Ht = { ...Et };
                  return (delete Ht.snd, ec[J.snd] && (Ht.snd = J.snd), Ht);
                })(J.ride || lf(J.item))
              : null,
          paint: J.paint,
          tune: J.tune,
          t: Date.now(),
          driven: !1,
        };
      (ed([...Pa(), mt]), pT("m:" + ht));
      try {
        let Et = window.__sf.capture?.();
        if (Et) {
          let Ht = new Image();
          ((Ht.onload = () => {
            let oe = document.createElement("canvas"),
              He = 480,
              ve = 300,
              ts = Math.min(Ht.width / 1.6, Ht.height) * 0.62,
              ds =
                Ht.width / 2 -
                ts * 0.8 +
                (innerWidth > 760 ? -Ht.width * 0.08 : 0),
              Me = Ht.height * 0.42 - ts / 2;
            ((oe.width = He),
              (oe.height = ve),
              oe
                .getContext("2d")
                .drawImage(Ht, ds, Me, ts * 1.6, ts, 0, 0, He, ve));
            let ms = Af(d2, {});
            ms[ht] = oe.toDataURL("image/jpeg", 0.78);
            let fs = Object.keys(ms);
            for (let Bn of fs.slice(0, Math.max(0, fs.length - 24)))
              delete ms[Bn];
            (wv(d2, ms), vi.isOpen && vi.render());
          }),
            (Ht.src = Et));
        }
      } catch {}
      return mt;
    },
    removeMine(J) {
      let ht = Af(d2, {});
      (delete ht[J],
        wv(d2, ht),
        ed(
          Pa().filter((mt) => mt.id !== J),
          XM() === J ? null : void 0,
        ));
    },
    editedMine() {},
  };
  ((window.__sf.home = new dz(vi, sd)), (window.__sf.creator = new kz(vi, sd)));
  let hB = (J) => {
      let ht = Nn.making().filter((Ht) => Ht.prev !== J.id),
        mt = ht[ht.length - 1];
      if (!mt) return null;
      let Et = lf(J);
      return (
        Nn.update(mt.id, {
          status: "ready",
          t1: Date.now(),
          ride: Et,
          item: {
            id: J.id || "",
            name: J.name || mt.name,
            sha: Et?.sha || null,
            icon: Et?.icon || null,
          },
        }),
        Zn(
          "Your " + (J.name || mt.name) + " is ready",
          "Drive it - it is in your Garage",
        ),
        mt
      );
    },
    mT = (J) => {
      if (!J || J.own || !J.vehicle || !J.files?.glb) return;
      let ht = hB(J);
      if (ht) {
        window.__sf.home.latest = J;
        let mt = window.__sf.home;
        vi.isOpen && vi.mode === "home" && ((mt.sec = "mine"), mt.render());
      } else window.__sf.home.offer(J);
      (window.__sf.creator.offer(J),
        !vi.isOpen &&
          !ht &&
          Zn(
            "Your mindblown car",
            (J.name || "A new car") + " \xB7 in the Garage, mindblown row",
          ));
    };
  sd.offerCar = mT;
  {
    let J = Js("spendCap"),
      ht = Js("spendLife"),
      mt = () => {
        (J && (J.value = String(pi.cap())),
          ht &&
            (ht.textContent =
              "AI on this game: " +
              pi.lifeLine() +
              " \xB7 this session " +
              pi.session() +
              " of " +
              pi.cap() +
              ". mindblown does not show games your balance; it is on mindblown.ai."));
      };
    (J?.addEventListener("change", () => pi.setCap(+J.value)), pi.on(mt), mt());
  }
  (Ks && (Nn.bindProfile(Ks), pi.bindProfile(Ks)),
    (window.__sf.builds = Nn),
    (window.__sf.spend = pi));
  {
    let J = document.createElement("button");
    ((J.type = "button"),
      (J.id = "buildChip"),
      (J.className = "ds-panel"),
      Jo("tl", J, 9));
    let ht = () => {
      let mt = Nn.open(),
        Et = mt.find((oe) => oe.status === "ready") || mt[mt.length - 1];
      if (((J.hidden = !Et), !Et)) return;
      let Ht = Et.status === "ready";
      (J.classList.toggle("ready", Ht),
        (J.innerHTML = `<i aria-hidden="true"></i><span><b>${Ht ? "Your " + vst(Et.name) + " is ready" : "Building your car"}</b><small>${Ht ? "Drive it" : vst(Kw(Et.t0)) + " \xB7 Creating with mindblown\u2026"}</small></span>`));
    };
    (J.addEventListener("click", (mt) => {
      mt.stopPropagation();
      let Et = Nn.open(),
        Ht = Et.find((oe) => oe.status === "ready") || Et[Et.length - 1];
      (td("pause"),
        Ht &&
          ((window.__sf.home.sec = "mine"),
          window.__sf.home.pick("b:" + Ht.id)));
    }),
      Nn.on(ht),
      setInterval(ht, 2e4),
      ht(),
      (window.__sf.buildChip = J));
  }
  ((window.__sf.account = Ro), _Q(mT), lQ());
  let Hst = () =>
      [
        cs.custom?.ride,
        bh(),
        ...Pa().map((J) => J.ride),
        ...Nn.list().map((J) => J.ride),
      ].filter(Boolean),
    gT = null;
  async function ZM(J) {
    if (!ai || !J?.id || !J.vehicle || !J.files?.glb) return !1;
    let ht = lf(J);
    if (!ht) return !1;
    let mt = Hst().find((Et) => Et.id === J.id && Et.sha !== ht.sha);
    if (!mt || gT === ht.sha) return !!mt;
    gT = ht.sha;
    try {
      mt.snd && !ht.snd && (ht.snd = mt.snd);
      let Et = $M("custom", mt.sha),
        Ht = $M("custom", ht.sha);
      (!Tf.get(Ht) && Tf.get(Et) && Tf.set(Ht, Tf.get(Et)),
        !U0.get(Ht) && U0.get(Et) && U0.set(Ht, U0.get(Et)));
      let oe = (ve) =>
        ve?.sha === mt.sha ? { ...ve, ...ht, own: ve.own ?? ht.own } : ve;
      Pa().some((ve) => ve.ride?.sha === mt.sha) &&
        ed(
          Pa().map((ve) =>
            ve.ride?.sha === mt.sha ? { ...ve, ride: oe(ve.ride) } : ve,
          ),
        );
      for (let ve of Nn.list())
        ve.ride?.sha === mt.sha &&
          Nn.update(ve.id, { ride: oe(ve.ride), item: J });
      if (bh()?.sha === mt.sha) {
        try {
          localStorage.setItem(qM, JSON.stringify(oe(bh())));
        } catch {}
        Ks?.setRide?.(oe(bh()));
      }
      let He = Jn === "custom" && zt?.rideSha === mt.sha;
      if ((cs.custom?.ride?.sha === mt.sha && f2(oe(cs.custom.ride)), He)) {
        let ve = { x: Jt.vel.x, y: Jt.vel.y, z: Jt.vel.z },
          ts = Jt.r;
        (await gh("custom"),
          zt?.rideSha === ht.sha &&
            ((Jt.vel.x = ve.x),
            (Jt.vel.y = ve.y),
            (Jt.vel.z = ve.z),
            (Jt.r = ts),
            G0(),
            hT()));
      }
      (vi.isOpen && vi.render(),
        Wo?.isOpen && Wo.render(),
        Zn(
          "Your " + (ht.name || "car") + " was updated",
          "The new model from mindblown is in",
        ),
        (window.__sf.updates ||= []).push({
          id: J.id,
          from: mt.sha,
          to: ht.sha,
          driving: He,
        }));
    } finally {
      gT = null;
    }
    return !0;
  }
  window.__sf.itemUpdated = ZM;
  {
    let J = window.mindblown?.items;
    if (J?.on)
      try {
        J.on("car", async (ht) => {
          ht && !ht.own && !(await ZM(ht)) && mT(ht);
        });
      } catch {}
    if (
      (J?.get &&
        J.get("car").then(
          async (ht) => {
            ht &&
              !ht.own &&
              ht.vehicle &&
              !(await ZM(ht)) &&
              ((window.__sf.home.latest = ht), hB(ht));
          },
          () => {},
        ),
      J?.get)
    ) {
      let ht = () => {
        document.hidden ||
          J.get("car").then(
            (mt) => ZM(mt),
            () => {},
          );
      };
      (setInterval(ht, 2e4),
        addEventListener("visibilitychange", () => {
          document.hidden || ht();
        }),
        addEventListener("focus", ht),
        (window.__sf.checkItems = ht));
    }
  }
  if (
    (Ro.on((J) => {
      (J
        ? Zn(
            "Signed in to mindblown",
            "@" +
              (Ro.name() || "you") +
              " \xB7 your progress follows your account",
          )
        : Zn(
            "Signed out of mindblown",
            "Playing as a guest \xB7 saved in this browser",
          ),
        vi.isOpen && vi.render());
    }),
    Qn &&
      (Qn.tuneVis = () => {
        let J = U0.get(Ef());
        return J ? BQ(J, ic($p(Ef()), J, Ef()).k) : "";
      }),
    Wo)
  ) {
    let J = Wo.open.bind(Wo);
    Wo.open = (ht) => {
      (J(ht), Lst.badges(Wo.el));
    };
  }
  (Js("garageBtn")?.addEventListener("click", () => td("pause")),
    po &&
      ((po.snap = (J, ht) =>
        Lw(ot.data, ot.layout, J, ht, { r: 60, world: re })),
      (po.onBusted = ({ fine: J, spot: ht }) => {
        let mt = Ks
          ? Ks.fine(J)
          : (() => {
              let Et = Math.min(po.bounty, J);
              return ((po.bounty -= Et), Et);
            })();
        return (
          (Jt.impact = 0),
          (Jt.impactT = 0),
          (Jt.vel.x = Jt.vel.z = 0),
          (Jt.r = 0),
          (Jt.nitro = Jt.S?.nitroMax ?? Jt.nitro),
          ht && !Gn?.active && Zr.go({ ...ht, quiet: !0 }),
          mt
        );
      })));
  let fB = (window.__sf.rewind = new Qz(Jt)),
    uB = null;
  try {
    (!ki || je.has("stuntstore")) && (uB = localStorage);
  } catch {}
  let _r =
      ot && !je.has("nostunts")
        ? (window.__sf.stunts = new tE(Jt, { store: uB }).snap(
            (J, ht, mt) => ot.layout.roadAt(J, ht, mt),
            Ot,
            ot.data.edges,
          ))
        : null,
    bT = _r
      ? (window.__sf.stuntMarks = new sE(Nt, _r, (J, ht) =>
          ot.layout.driveHeight(J, ht),
        ))
      : null,
    Mv = (window.__sf.stuntHud = new oE());
  (ri && _r && (ri.pois = () => _r.markers()),
    (Mv.onDiscover = (J, ht) =>
      Zn(Ml[J.kind].label + " ahead", J.name + "   " + ht)));
  let Sv = (window.__sf.skills = new Ix({
    L: ot?.layout || null,
    cars: () => we?.cars || null,
    police: () => (po && D0 ? po : null),
  }));
  vt && vt.useChain(Sv);
  let dB = (window.__sf.skillHud = new vE()),
    QM = 0;
  try {
    QM = Math.max(0, +localStorage.getItem("sf-drive.xp") || 0);
  } catch {}
  let Xp = () => (Ks?.ready ? Ks.p.xp || 0 : QM),
    t4 = (window.__sf.wheelspin = new zE()),
    e4 = (window.__sf.sting = {
      n: 0,
      stunt(J) {
        let ht = hn;
        if (ht) {
          if ((this.n++, !J.stars)) {
            ht.ui1("ui_click", 0.5);
            return;
          }
          (ht.ui1("fare_ding", 0.45 + 0.12 * J.stars, 0.94 + 0.08 * J.stars),
            J.newBest &&
              J.old &&
              setTimeout(() => hn?.ui1("taxi_done", 0.55), 380));
        }
      },
      board(J) {
        let ht = hn;
        ht &&
          (this.n++,
          ht.at(
            J.x,
            (J.y ?? Jt.pos.y) + 1.2,
            J.z,
            ht.pickName("crack"),
            1,
            0.9 + Math.random() * 0.15,
            12,
          ),
          ht.at(
            J.x,
            (J.y ?? Jt.pos.y) + 1,
            J.z,
            ht.pickName("whoosh"),
            0.7,
            1.1,
            10,
          ),
          setTimeout(() => hn?.ui1("fare_ding", 0.6, 1.05), 220));
      },
      level() {
        let J = hn;
        J && (this.n++, J.ui1(J.pickName("bell"), 0.5));
      },
      landed(J) {
        let ht = hn;
        ht &&
          (this.n++,
          ht.ui1(
            J.unlock ? "taxi_done" : "fare_ding",
            J.unlock ? 0.7 : 0.6,
            J.unlock ? 1 : 1.12,
          ));
      },
    });
  ((t4.onStart = () => e4.level()),
    (t4.onLand = (J) => e4.landed(J)),
    (t4.busy = () => {
      try {
        return !!(
          po?.pursuit ||
          Gn?.S ||
          zr?.busy ||
          Math.hypot(Jt.vel.x, Jt.vel.z) > 22
        );
      } catch {
        return !1;
      }
    }),
    (vi.level = () => eh(Xp()).level));
  let p2 = (J, ht) => {
    if (!(J > 0)) return;
    let mt = eh(Xp()).level;
    if (Ks?.ready) Ks.addXP(J);
    else {
      QM += J;
      try {
        (!ki || je.has("stuntstore")) &&
          localStorage.setItem("sf-drive.xp", String(Math.round(QM)));
      } catch {}
    }
    let Et = eh(Xp()).level;
    for (let Ht = mt + 1; Ht <= Et; Ht++) {
      let oe = lY(Ht),
        He = !!Ks?.ready;
      (He && oe.cash && Ks.prize(oe.cash, "Level " + Ht + " wheelspin"),
        t4.show(oe, { cashOK: He, next: rY(Ht) }));
    }
    Et > mt && vi?.isOpen && vi.render();
  };
  ((window.__sf.xp = Xp),
    (window.__sf.addXP = p2),
    (window.__sf.toast = Zn),
    (window.__sf.notify = Cu),
    Sv.on((J) => {
      (J.type === "bank" && p2(J.pts, "skill chain"), dB.event(J, Xp()));
    }));
  let Dst = 500;
  Mv.onResult = (J) => {
    let ht = J.stars - rc(J.s, J.old || 0);
    (ht > 0 && p2(ht * Dst, Ml[J.s.kind].label), e4.stunt(J));
  };
  let W0 = In.prefs || yM(),
    pB = (J) => {
      (document.body.classList.toggle("hud-min", J === "min"),
        document.body.classList.toggle("hud-off", J === "off"));
    },
    s4 = (J) => {
      ((Kp = !!J),
        bT && (bT.group.visible = Kp),
        ri && (ri.pois = _r && Kp ? () => _r.markers() : null),
        Kp || _r?.cancel?.("off"));
    },
    Kp = !0;
  (pB(W0.hud),
    s4(W0.stunts !== "off"),
    Gn && (Gn.brakeLine = W0.brakeLine !== "off"),
    (In.hooks.onPref = (J, ht) => {
      ((W0 = { ...W0, [J]: ht }),
        J === "hud"
          ? pB(ht)
          : J === "stunts"
            ? s4(ht !== "off")
            : J === "brakeLine"
              ? Gn && (Gn.brakeLine = ht !== "off")
              : J === "peds"
                ? Zn(
                    "Pedestrians " + (ht === "off" ? "off" : "on"),
                    "On the next start",
                  )
                : gB());
    }),
    (window.__sf.setPref = (J, ht) => In.setPref(J, ht)));
  let xh =
    ot && !je.has("nomeet")
      ? (window.__sf.meet = new E_({
          scene: Nt,
          world: re,
          L: ot.layout,
          sampleAt: Ot,
          loadCar: st,
          applyPaint: $r,
          poseCar: tc,
          setLamps: Bu,
          inst: () => [dt.inst, he],
        }))
      : null;
  xh &&
    (xh.onSlots = (J) => {
      let ht = ps.find((mt) => mt.name === "Car meet");
      ht && ((ht.x = J.x), (ht.z = J.z));
    });
  let mB = (window.__sf.cine = new _E(Ue, Ci)),
    nd = !1,
    xT = (J) => {
      ((nd = !!J),
        document.body.classList.toggle("cine", nd),
        nd ? mB.reset() : (Ci.init = !1));
    };
  window.__sf.setCine = xT;
  let vh = (window.__sf.photo = new TE({
    camera: Ue,
    v: Jt,
    view: Js("view"),
    canvas: z,
    capture: () => NB(),
    groundY: (J, ht, mt) =>
      ot ? ot.layout.driveHeight(J, ht, null, mt) : eo(J, ht),
    onOpen: () => {
      (hn?.suspend(), Ln.releaseGestures?.());
    },
    onClose: () => {
      (hn?.resume(), (ST = performance.now()));
    },
  }));
  Js("photoBtn")?.addEventListener("click", () => {
    (In.set(!1),
      Gn?.active ? Zn("Photo mode", "Not during a race") : vh.open());
  });
  let Tl = xh
    ? (window.__sf.meetUi = new P_({
        meet: xh,
        v: Jt,
        fleet: cs,
        photo: vh,
        addXP: p2,
        toast: Zn,
        touch: Yu,
      }))
    : null;
  (Tl &&
    (Tl.onPhoto = () => {
      Gn?.active || (vh.open(), Tl.aim());
    }),
    Tl &&
      ((Tl.mph = () => ta),
      (Tl.events = () => {
        let J = [];
        for (let ht of yT?.list() || []) {
          if (ht.isDone() || ht.id === "meet") continue;
          let mt = Math.hypot(ht.x - Jt.pos.x, ht.z - Jt.pos.z);
          if (mt < 60) continue;
          let Et = ht.id.startsWith("r:") ? Gn?.best?.(ht.id.slice(2)) : 0;
          J.push({
            ...ht,
            d: mt,
            best: Et
              ? Math.floor(Et / 6e4) +
                ":" +
                ((Et % 6e4) / 1e3).toFixed(2).padStart(5, "0")
              : "",
          });
        }
        return J.sort((ht, mt) => ht.d - mt.d);
      }),
      (Tl.onEvent = (J) => {
        if (J.id.startsWith("r:") && Al) {
          let ht = Zr.pick(J.x, J.z, 40);
          if (ht) {
            (Zr.go({ ...ht, quiet: !0 }),
              Zn("Road race \xB7 " + J.name, "At its start - E to race"));
            return;
          }
        }
        (yT?.focus(J),
          Zn(
            "What's next \xB7 " + J.name,
            J.label + " - its route on the map",
          ));
      })));
  let Al = Gn
      ? (window.__sf.raceStarts = new N_({ v: Jt, race: Gn, touch: Yu }))
      : null,
    n4 = (window.__sf.rumble = new kE());
  gB();
  let bB = (J) => {
      if (ki && !je.has("stuntstore")) return null;
      try {
        return JSON.parse(localStorage.getItem(J) || "null");
      } catch {
        return null;
      }
    },
    xB = (J, ht) => {
      if (!(ki && !je.has("stuntstore")))
        try {
          localStorage.setItem(J, JSON.stringify(ht));
        } catch {}
    },
    ea = ot ? (window.__sf.discovery = new wE(ot.data, ot.layout)) : null;
  ea && !Ks && ea.merge(bB("sf-drive.roads"));
  let fa = ot
      ? (window.__sf.boards = new ME(Jt, {
          got: Ks ? [] : bB("sf-drive.boards") || [],
        }).snap((J, ht, mt) => ot.layout.roadAt(J, ht, mt), Ot))
      : null,
    vT = fa
      ? (window.__sf.boardMarks = new SE(Nt, fa, (J, ht) =>
          ot.layout.driveHeight(J, ht),
        ))
      : null,
    zr = null,
    i4 = () => [
      ...(_r && Kp ? _r.markers() : []),
      ...(fa ? fa.markers() : []),
      ...(xh ? [xh.marker()] : []),
      ...(Al ? Al.markers() : []),
    ];
  ri &&
    ((ri.discovery = ea),
    (ri.discLabel = () =>
      ea
        ? `${ea.pct.toFixed(1)} % of the roads discovered` +
          (fa ? ` \xB7 boards ${fa.count} / ${fa.total}` : "")
        : ""),
    (ri.pois = () => (zr ? zr.pois(i4()) : i4())));
  let Ust = s4;
  s4 = (J) => {
    (Ust(J), ri && (ri.pois = () => (zr ? zr.pois(i4()) : i4())));
  };
  let vB = !Ks,
    yB = 0,
    Gst = () => {
      if (!ea) return;
      let J = Js("discRoadsV"),
        ht = Js("discBoardsV"),
        mt = Js("discRoadsS");
      (J && (J.textContent = ea.pct.toFixed(1) + " %"),
        mt &&
          (mt.textContent = `${ea.km.toFixed(1)} of ${ea.totalKm.toFixed(0)} km \xB7 ${ea.doneN} of ${ea.count} streets \xB7 the map traces them`),
        ht && fa && (ht.textContent = `${fa.count} / ${fa.total}`));
    };
  {
    let J = In.onPause;
    In.onPause = () => {
      (J?.(), Gst());
    };
  }
  let Wst = (J, ht) => {
      if (ea) {
        if (!vB && Ks?.ready) {
          ((vB = !0), ea.merge(Ks.p.roads), fa?.add(Ks.p.boards));
          for (let mt of fa?.got || []) {
            let Et = vT?.items.get(mt);
            Et && (Et.G.visible = !1);
          }
        }
        ea.update(J, Jt, ht);
        for (let mt of ea.events.splice(0))
          ea.doneN % 25 === 0 &&
            Zn(
              "Roads discovered",
              `${ea.pct.toFixed(1)} % \xB7 ${ea.doneN} streets`,
            );
        if (
          ((yB -= J) <= 0 &&
            ea.dirty &&
            ((yB = 10),
            (ea.dirty = !1),
            Ks?.ready
              ? Ks.setRoads(ea.pack())
              : Ks || xB("sf-drive.roads", ea.pack())),
          fa)
        ) {
          fa.update(J, ht);
          for (let mt of fa.events.splice(0))
            (vT?.smash(mt.b, Jt.vel.x, Jt.vel.z),
              e4.board(mt.b),
              p2(
                mt.xp,
                mt.b.kind === "travel" ? "Fast-travel board" : "XP board",
              ),
              Zn(
                (mt.b.kind === "travel" ? "Fast-travel board" : "XP board") +
                  " \xB7 " +
                  mt.b.name,
                `+${mt.xp.toLocaleString()} XP \xB7 ${mt.n} of ${mt.of} boards`,
                "",
                { pri: 2, col: Cp[mt.b.kind] },
              ),
              Ks?.ready
                ? Ks.addBoard(mt.b.id)
                : Ks || xB("sf-drive.boards", [...fa.got]));
        }
      }
    },
    yT = (window.__sf.nextUp = new AE({
      v: Jt,
      stunts: _r,
      boards: fa,
      router: _l,
      unproject: $5,
      map: ri,
      KINDS: Ml,
      COLS: Cp,
      mph: () => ta,
      extra: () => [
        ...(Al ? Al.candidates() : []),
        ...(xh
          ? [
              {
                id: "meet",
                x: Si.x,
                z: Si.z,
                kind: "meet",
                label: "Car meet",
                name: Si.name,
                col: "#ff2fa0",
                glyph: "\u2605",
                isDone: () => !!Tl?.paid,
              },
            ]
          : []),
        ...(zr ? zr.candidates() : []),
      ],
    })),
    Yp = ot ? new vf(Nt, "PoiBeacons") : null;
  if (Yp) {
    for (let J of Al?.list || [])
      J.bc = Yp.add({
        x: J.x,
        y: ot.layout.driveHeight(J.x, J.z),
        z: J.z,
        kind: "race",
        h: 60,
      });
    xh &&
      Yp.add({
        x: Si.x,
        y: ot.layout.driveHeight(Si.x, Si.z),
        z: Si.z,
        kind: "meet",
        h: 60,
      });
  }
  let wT = (J, ht) => {
      let mt = Ml[J.kind];
      return mt.unit === "km/h" && ta
        ? Math.round(ht / 1.609344) + " MPH"
        : String(eE(J, ht)).replace(/\.0$/, "") + " " + mt.unit.toUpperCase();
    },
    qst = () => {
      let J = [];
      if (_r && Kp)
        for (let ht of _r.list) {
          let mt = ht.gates[0],
            Et = _r.best[ht.id] || 0;
          J.push({
            id: "s:" + ht.id,
            x: mt.x,
            z: mt.z,
            kind: ht.kind,
            name: ht.name,
            r: ht.kind === "jump" ? 220 : 180,
            stars: () => (Et ? rc(ht, Et) : 0),
            line: () =>
              Et
                ? "BEST " + wT(ht, Et)
                : "STARS AT " +
                  ht.stars
                    .map((Ht) => wT(ht, Ht).split(" ")[0])
                    .join(" \xB7 ") +
                  " " +
                  wT(ht, ht.stars[0]).split(" ")[1],
          });
        }
      if (fa)
        for (let ht of fa.list)
          fa.got.has(ht.id) ||
            J.push({
              id: "b:" + ht.id,
              x: ht.x,
              z: ht.z,
              kind: ht.kind,
              name: ht.name,
              r: 150,
              line: () =>
                ht.kind === "travel"
                  ? "SMASH IT \xB7 FAST TRAVEL HERE LATER"
                  : "SMASH IT \xB7 +1,500 XP",
            });
      for (let ht of Al?.list || []) {
        let mt = Gn?.best?.(ht.id);
        J.push({
          id: "r:" + ht.id,
          x: ht.x,
          z: ht.z,
          kind: "race",
          name: ht.name,
          r: 130,
          line: () =>
            mt
              ? "BEST " +
                (Math.floor(mt / 6e4) +
                  ":" +
                  ((mt % 6e4) / 1e3).toFixed(2).padStart(5, "0"))
              : "STOP AT THE START TO RACE",
        });
      }
      return (
        xh &&
          J.push({
            id: "meet",
            x: Si.x,
            z: Si.z,
            kind: "meet",
            name: Si.name,
            r: 130,
            line: () => "STOP BY A SHOW CAR \xB7 INSPECT \xB7 PHOTO",
          }),
        zr && J.push(...zr.poiItems()),
        J
      );
    },
    jst = (window.__sf.poiCard = new nE({
      v: Jt,
      camera: Ue,
      mph: () => ta,
      list: qst,
    })),
    wB = () =>
      !!(vt && cr && ["ride", "boarding", "alighting"].includes(vt.state));
  if (ot && ai && (Ks || je.has("challenges")) && !je.has("nochallenges"))
    try {
      zr = window.__sf.challenges = Bet({
        THREE: gs,
        scene: Nt,
        camera: Ue,
        v: Jt,
        R: ot,
        router: _l,
        profile: Ks,
        map: ri,
        stunts: _r,
        stuntHud: Mv,
        boards: fa,
        raceStarts: Al,
        race: Gn,
        skills: Sv,
        photo: vh,
        tele: Zr,
        toast: Zn,
        touch: Yu,
        police: () => (po && D0 ? po : null),
        trafficOn: () => H0,
        auto: () => Ns.mode === "l5" && !Ns.takeover,
        garage: () => vi,
        openGarage: () => td("pause"),
        faresOn: () => !!(uh && cr),
        setFares: (J) => uT(J),
        rideBusy: wB,
        rides: () => vt,
        graceOff: () => {
          g2 = 0;
        },
        addXP: (J, ht) => p2(J, ht),
        xp: () => Xp(),
        sting: (J, ht = 0) => {
          let mt = hn;
          mt &&
            (J === "result"
              ? (mt.ui1("fare_ding", 0.5 + 0.1 * ht, 0.94 + 0.08 * ht),
                ht === 3 && setTimeout(() => hn?.ui1("taxi_done", 0.55), 380))
              : J === "stop" || J === "cp"
                ? mt.ui1("fare_ding", 0.35, 1.25)
                : mt.ui1("ui_click", 0.6));
        },
      });
    } catch (J) {
      console.warn("challenges", J);
    }
  let Vst = 2.5,
    m2 = document.createElement("div");
  ((m2.id = "stuckHint"),
    (m2.className = "ds-panel ds-prompt ds-pop"),
    m2.style.setProperty("--c", "var(--warn)"),
    Jo("bc", m2, 2));
  let kv = 0;
  Cu._toastEl();
  for (let [J, ht] of [
    ["brakeCue", -1],
    ["drift", 4],
    ["taxiPen", 5],
  ])
    Js(J) && Jo("lane", Js(J), ht);
  m2.innerHTML = Yu
    ? '<span class="ds-eyebrow">Stuck?</span><span>Menu: back on the road</span><span>Hold \u27F2 to rewind</span>'
    : '<span class="ds-eyebrow">Stuck?</span><span><span class="ds-key">R</span> back on the road</span><span><span class="ds-key">Backspace</span> hold to rewind</span>';
  let $st = (window.__sf.radar = new yE(() => {
    let J = [];
    if (po && D0) {
      for (let mt of we.cars)
        mt.cop &&
          J.push({
            x: mt.x,
            z: mt.z,
            psi: Math.atan2(-(mt.fx || 0), -(mt.fz || 0)),
            kind: "cop",
          });
      let ht = we.heliMark;
      ht && J.push({ x: ht.x, z: ht.z, kind: "heli" });
    }
    for (let ht of Gn?.S?.bots || [])
      ht.car &&
        ht.pose &&
        J.push({
          x: ht.pose.pos.x,
          z: ht.pose.pos.z,
          psi: ht.pose.psi,
          kind: "rival",
        });
    if (Qn?.remotes)
      for (let ht of Qn.remotes.values())
        ht.drawn &&
          J.push({
            x: ht.pose.pos.x,
            z: ht.pose.pos.z,
            psi: ht.pose.psi,
            kind: Gn?.active ? "rival" : "mate",
            col: ht.col,
          });
    return J;
  }));
  Js("tRw")?.addEventListener("pointerdown", (J) => {
    (J.preventDefault(), (Ln.touch.rw = 1));
  });
  for (let J of ["pointerup", "pointercancel", "pointerleave"])
    Js("tRw")?.addEventListener(J, () => {
      Ln.touch.rw = 0;
    });
  let o4 = (window.__sf.intro = new DE({
      touch: Yu,
      taxi: ai,
      done: () => (In.prefs || yM()).introDone === "1",
      setDone: () => In.setPref("introDone", "1"),
    })),
    _v = -1,
    MB = 0;
  Js("introBtn")?.addEventListener("click", () => {
    (In.set(!1), o4.start(!0));
  });
  let Xst = 45,
    SB = 120,
    g2 = 0,
    MT = !1,
    kB = !1,
    _B = () => {
      if (!we?.cars) return 0;
      let J = 0;
      for (let ht = we.cars.length - 1; ht >= 0; ht--) {
        let mt = we.cars[ht];
        mt.cop ||
          mt.cable ||
          mt.net ||
          mt.remote ||
          (Math.hypot(mt.x - Jt.pos.x, mt.z - Jt.pos.z) < Xst &&
            (we.cars.splice(ht, 1), J++));
      }
      return J;
    },
    zB = () => {
      (ki && !je.has("fresh")) || (_B(), (MT = !0), (g2 = SB));
    };
  window.__sf.startFresh = zB;
  let b2 = () => {
      (Js("title").classList.add("gone"), document.body.classList.add("play"));
      try {
        (EB(), hn.drive());
      } catch (J) {
        console.warn(J);
      }
      (ai
        ? Zn(cs[Jn].name + " \xB7 Taxi", "Your first fare is waiting")
        : Zn(ha[Xs].name, "California St \xB7 Nob Hill"),
        _st(),
        Ks?.arrive({ skipPlace: !0, skipCar: !0 }),
        zB(),
        (_v = 2.5));
    },
    a4 = () => {
      if (!document.body.classList.contains("play"))
        try {
          EB().title();
        } catch (J) {
          console.warn(J);
        }
      (removeEventListener("pointerdown", a4),
        removeEventListener("keydown", a4));
    };
  (addEventListener("pointerdown", a4),
    addEventListener("keydown", a4),
    addEventListener(
      "touchend",
      () => {
        hn && hn.ctx.state !== "running" && hn.ctx.resume().catch(() => {});
      },
      { passive: !0 },
    ),
    qN.addEventListener("click", b2),
    addEventListener("keydown", (J) => {
      cc &&
        !Wo?.isOpen &&
        !document.body.classList.contains("play") &&
        (J.code === "Enter" || J.code === "Space" || J.code === "KeyW") &&
        b2();
    }),
    Js("tMenu")?.addEventListener("click", () => {
      (Ln.releaseGestures?.(), In.set(!0));
    }));
  for (let J of document.querySelectorAll("#pause [data-act]"))
    J.addEventListener("click", () => {
      (In.set(!1), Ln.actions.add(J.dataset.act));
    });
  ((In.hooks = {
    ...In.hooks,
    tod: () => Xs,
    setTod: (J) => {
      ha[J] && J !== Xs && Kt(J);
    },
    mph: () => ta,
    setMph: (J) => {
      ((ta = !!J), bE(ta ? "mph" : "kmh"));
    },
    units: () => oN(),
    setUnits: (J) => {
      (bE(J), (ta = xE()));
    },
    mp: () => Qn,
    cam: () => Ci.mode,
    setCam: (J) => {
      ((Ci.mode = J), (Ci.init = !1));
    },
  }),
    vt &&
      ((vt.env = { cars: () => we?.cars || null, police: () => po || null }),
      (In.hooks.rideStyle = () => vt.style),
      (In.hooks.setRideStyle = (J) => {
        (vt.setStyle(J),
          gE(J),
          Ks &&
            ((Ks.p.settings = { ...Ks.p.settings, rideStyle: vt.style }),
            Ks.save(!0)));
      }),
      (window.__sf.setRideStyle = (J) => (
        In.hooks.setRideStyle(J),
        In.sync(),
        vt.style
      ))),
    Ks &&
      (Ks.onSettings = (J) => {
        (J.rideStyle && vt && (vt.setStyle(J.rideStyle), gE(vt.style)),
          J.store?.["sf-drive.units"] !== void 0 || typeof J.mph != "boolean"
            ? (ta = xE())
            : (ta = J.mph));
        let ht = vM();
        (Object.assign(Jt.assists, ht.assists), (Jt.manual = ht.manual));
        try {
          let Et = +JSON.parse(
            localStorage.getItem("sf-drive.settings") || "{}",
          )?.fps;
          Et && (globalThis.SF_FPS = Et);
        } catch {}
        let mt = (Et) =>
          J.store?.[Et] === void 0 ? null : J.store[Et] !== "off";
        if (!ki && !Gn?.active && !Qn?.inRoom) {
          let Et = mt("sf-drive.traffic"),
            Ht = mt("sf-drive.parked");
          (Et !== null && Et !== H0 && Vp(Et, !1),
            Ht !== null && Ht !== Jr && xv(Ht, !1));
        }
        if (!ki) {
          let Et = mt("sf-drive.police");
          Et !== null && Et !== D0 && jM(Et, !1);
        }
        In.sync();
      }),
    (Js("help").onclick = () => document.body.classList.remove("help")),
    ki && b2());
  let Kst = {
      saver: "safe",
      mobile: "mobile",
      perf: "desktop",
      high: "desktop",
      ultra: "desktop",
    },
    Yst = {
      saver: "perf",
      mobile: "perf",
      perf: "perf",
      high: "high",
      ultra: "ultra",
    };
  window.__sf.applyGfx = TB;
  let AB = () =>
      B === "desktop"
        ? E === "perf"
          ? 0.55
          : Math.max(0.55, 0.85 * P)
        : Math.min(P, 0.2 * L),
    x2 = 0,
    RB = (J) => {
      ((x2 = J),
        (_.ssr = J >= 1 || E === "perf" || je.has("nossr") ? !1 : void 0),
        (_.planarEnabled = J >= 1 ? !1 : void 0),
        (_.nearShadow = J >= 2 ? !1 : void 0),
        (_.ao = J >= 2 || je.has("noao") ? !1 : void 0));
    },
    PB = (window.__sf.autoGfx = new aE({
      mb: _,
      apply: (J) => {
        let ht = TB(J);
        return (In.syncGfx?.(), ht);
      },
      toast: (J, ht) => Zn(J, ht),
      atFloor: () => H <= AB() * 1.05 || je.has("res") || je.has("size"),
      playing: () =>
        document.body.classList.contains("play") && !In.paused && !ri?.open,
      test: ki,
      force: je.has("autogfx"),
      noBench: je.has("nobench"),
    })),
    r4 = 1 / 120,
    Jst = new jz(),
    zv = 0,
    ST = performance.now(),
    kT = 0,
    l4 = 0,
    _T = (window.__sf.auto = { on: !1, input: null }),
    CB = new ye(),
    zT = 0,
    ET = 0,
    yh = 0,
    LB = 0,
    IB = -1e9;
  (requestAnimationFrame(FB),
    ot && (_.reflectFilter = YMt(ot.data.terrain.sea, m4)),
    ot &&
      !je.has("noshore") &&
      setTimeout(() => {
        ((Un = fG(ot.data, xn ? { cell: 6 } : void 0)),
          Un && console.log(`shore field ${Un.w}x${Un.h} in ${Un.ms} ms`));
      }, 300));
  let NB = () => (_.render(Nt, Ue), z.toDataURL("image/jpeg", 0.9));
  if (x) {
    let J = {
        lombard_gg: [-122.4187, 37.8021],
        waterfront: [-122.4169, 37.8081],
        pier39: [-122.4098, 37.8087],
        fortmason: [-122.4316, 37.8066],
      },
      ht = {};
    for (let [oe, [He, ve]] of Object.entries(J)) ht[oe] = Gi(He, ve);
    let mt = [
        /\/(asphalt|sidewalk|decals)/,
        /\/(fronts_|office)/,
        /\/(ground_|stucco|brick|siding|concrete|roof)/,
        /\/tex\/lm\/skyline\//,
      ],
      Et = (oe) => {
        let He = (oe.match(/\/tex\/lm\/([^/]+)\//) || [])[1],
          ve = ht[He],
          ts = mt.findIndex((ds) => ds.test(oe));
        return ts >= 0
          ? ts * 1e6 + (/_(n|mask)\./.test(oe) ? 5e5 : 0)
          : He
            ? ve
              ? 5e6 + Math.hypot(ve[0] - Jt.pos.x, ve[1] - Jt.pos.z)
              : 9e6
            : 4e6;
      },
      Ht = performance.now();
    (YD(Et).then(() =>
      console.log(
        `deferred images in: ${DA().done} in ${Math.round(performance.now() - Ht)} ms after READY`,
      ),
    ),
      (window.__sf.deferAt = ht));
  }
  if (
    ((window.__sf.chars = ba),
    (ba.onBump = (J, ht) => {
      if (ht.player) {
        let mt = 0.97 - 0.05 * J;
        ((Jt.vel.x *= mt), (Jt.vel.z *= mt));
      }
      if (hn && Math.hypot(ht.x - Jt.pos.x, ht.z - Jt.pos.z) < 60) {
        let mt = ["ev_bump", "cc_bump", "ct_bump"].find((Et) => hn.buf?.[Et]);
        mt
          ? hn.var(
              mt,
              (0.16 + 0.3 * J) * (ht.player ? 1 : 0.5),
              0.8 + Math.random() * 0.15,
            )
          : hn.fetch1?.("ev_bump");
      }
    }),
    (window.__sf.charsLineup = (J) => {
      let ht = Ytt(J);
      return (Nt.add(ht.group), _.prewarm?.(ht.group), ht);
    }),
    (window.__sf.deferStats = DA),
    (window.__sf.camVibe = ro),
    (window.__sf.camLeaf = Sf),
    (window.__sf.imagesRequested = $D),
    Object.assign(window.__sf, {
      da: Ns,
      guide: Sa,
      PRESETS: ha,
      setLamps: Bu,
      poseCar: tc,
      loadFleetCar: ai ? $ : null,
      mb: _,
      scene: Nt,
      camera: Ue,
      v: Jt,
      car: zt,
      carId: Jn,
      swapCar: gh,
      world: re,
      cc: Ci,
      city: dt,
      real: ot,
      spawnOn: zx,
      setTime: Kt,
      input: Ln,
      capture: NB,
      traffic: we,
      pm: In,
      map: ri,
      brk: Ls,
      props: Wt,
      peds: gt,
      taxi: lc,
      rides: vt,
      mode: ai ? "waymo" : "free",
      variant: uh ? "taxi" : "sfdrive",
      ready: !0,
    }),
    ot &&
      !je.has("nolm") &&
      !je.has("nowf") &&
      !je.has("nop39") &&
      setTimeout(() => {
        try {
          if (
            (P0.start({
              D: ot.data,
              L: ot.layout,
              scene: Nt,
              mobile: B !== "desktop",
              mb: _,
              pedTex: Or()
                ? null
                : Fr("assets/tex/peds.webp", (J) => {
                    ((J.colorSpace = is), (J.flipY = !1), (J.anisotropy = 8));
                  }),
            }),
            P0.near)
          )
            for (let J of [P0.near, P0.far, P0.crowd.group])
              (_.prewarm?.(J), _.upload?.(J));
          ((window.__sf.pier39 = P0),
            P0.crowd && !uv
              ? (P0.crowd.group.visible = !1)
              : P0.crowd && Ns.env.peds.push(P0.crowd.people));
        } catch (J) {
          console.error("pier 39:", J);
        }
      }, 600),
    ot &&
      !je.has("nolm") &&
      !je.has("nowf") &&
      !je.has("nofm") &&
      setTimeout(() => {
        try {
          if (
            (Dd.start({
              D: ot.data,
              L: ot.layout,
              scene: Nt,
              mobile: B !== "desktop",
              mb: _,
            }),
            Dd.near)
          )
            for (let J of [Dd.near, Dd.far]) (_.prewarm?.(J), _.upload?.(J));
          window.__sf.fortMason = Dd;
        } catch (J) {
          console.error("fort mason:", J);
        }
      }, 750),
    ot &&
      !je.has("nolm") &&
      !je.has("nolw") &&
      setTimeout(() => {
        try {
          dl.start({
            scene: Nt,
            mobile: B !== "desktop",
            mb: _,
            pedTex: Or()
              ? null
              : Fr("assets/tex/peds.webp", (J) => {
                  ((J.colorSpace = is), (J.flipY = !1), (J.anisotropy = 8));
                }),
            buildPlants: (J) => {
              let ht = mx(
                J,
                tt,
                null,
                (mt, Et) => ot.layout.driveHeight(mt, Et),
                Wt.userData.K,
              );
              for (
                ht.userData.cull(
                  Ue.position.x,
                  Ue.position.z,
                  420,
                  Ue.position.y,
                );
                ht.userData.step();
              );
              return (Ku(ht), ht);
            },
          });
          for (let J of [dl.near, dl.far, dl.plantsRoot, dl.crowd?.group])
            J && (_.prewarm?.(J), _.upload?.(J));
          (!uv && dl.crowd?.group && (dl.crowd.group.visible = !1),
            (window.__sf.lombardWalks = dl));
        } catch (J) {
          console.error("lombard walks:", J);
        }
      }, 900),
    lt &&
      setTimeout(
        () =>
          Promise.all([io("assets/real/sky_field.bin"), ct])
            .then(([J]) => {
              if (!lt.meta) return;
              (GU(lt, ga(J)), _.setSkyField(nR(lt)));
              let ht = ot?.skyFieldIn?.() || 0;
              console.log("sky field in: " + ht + " chunks' roads to refine");
            })
            .catch((J) => console.warn("sky_field.bin:", J)),
        50,
      ),
    ot && !je.has("nodress2"))
  ) {
    let J = (Et) => {
        let Ht = Et.P[0],
          oe = Et.P[1];
        for (let [He, ve] of Object.entries(h0)) {
          let ts = ve.bounds;
          if (Ht >= ts.x0 && Ht <= ts.x1 && oe >= ts.z0 && oe <= ts.z1)
            return He;
        }
        return "";
      },
      ht = new Map();
    for (let Et of ot.data.edges)
      if (Et.name && Det.has(Et.name) && Et.car !== !1 && !Et.inner) {
        let Ht = J(Et);
        (ht.get(Ht) || ht.set(Ht, []).get(Ht)).push(Et);
      }
    let mt = (Et) => {
      let Ht = Uet(ht.get(Et) || [], (oe, He) => ot.layout.terrainAt(oe, He), {
        mobile: xn,
      });
      if (Ht.group.children.length) {
        for (let oe of Ht.colliders) re.index(oe);
        (Ku(Ht.group),
          _.prewarm?.(Ht.group),
          Nt.add(Ht.group),
          _.upload?.(Ht.group),
          (window.__sf.roadDress ||= []).push({
            region: Et || "city",
            ...Ht.stats,
            colliders: Ht.colliders.length,
          }),
          console.log(
            `road dressing ${Et || "city"}: ${Ht.stats.roads} roads, ${Math.round(Ht.stats.railM)} m of guardrail, ${Ht.stats.chevrons} chevrons, ${Ht.stats.delineators} delineators`,
          ));
      }
    };
    setTimeout(
      () => {
        mt("");
        for (let Et of ht.keys())
          if (Et) {
            let Ht = () => {
              let oe = h2.get(Et);
              oe ? oe.then(() => mt(Et)) : setTimeout(Ht, 1500);
            };
            Ht();
          }
      },
      ki ? 200 : 2500,
    );
  }
  ot?.billboards &&
    setTimeout(
      () =>
        ot.billboards.load("assets/tex/", (J) => {
          try {
            _._texture(J);
          } catch {}
        }),
      400,
    );
} catch (i) {
  BM(i);
}
