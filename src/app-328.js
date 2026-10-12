// app 328 — cars
// Lines 159880-159981 of readable/app.pretty.js (statement-aligned).
var fQ = "sf-drive.spendcap",
  uQ = "sf-drive.spend",
  dQ = "sf-drive.spend.session",
  Hm = (i, t = 0) => (Number.isFinite(+i) && +i >= 0 ? Math.floor(+i) : t),
  uF = new Set(),
  Yw = null,
  pQ = () => {
    for (let i of uF)
      try {
        i();
      } catch {}
  },
  pi = {
    on(i) {
      return (uF.add(i), () => uF.delete(i));
    },
    bindProfile(i) {
      Yw = i;
    },
    cap() {
      try {
        let i = localStorage.getItem(fQ);
        return i === null ? 5 : Math.max(0, Math.min(100, Hm(i, 5)));
      } catch {
        return 5;
      }
    },
    setCap(i) {
      try {
        localStorage.setItem(fQ, String(Math.max(0, Math.min(100, Hm(i, 5)))));
      } catch {}
      pQ();
    },
    session() {
      try {
        return Hm(sessionStorage.getItem(dQ));
      } catch {
        return pi._s || 0;
      }
    },
    lifetime() {
      let i = { pictures: 0, cars: 0 };
      try {
        let e = JSON.parse(localStorage.getItem(uQ) || "null");
        e && (i = { pictures: Hm(e.pictures), cars: Hm(e.cars) });
      } catch {}
      let t = Yw?.p?.spend;
      return (
        t &&
          (i = {
            pictures: Math.max(i.pictures, Hm(t.pictures)),
            cars: Math.max(i.cars, Hm(t.cars)),
          }),
        i
      );
    },
    record(i, t = 1) {
      let e = pi.lifetime();
      i === "car" ? (e.cars += t) : (e.pictures += t);
      try {
        localStorage.setItem(uQ, JSON.stringify(e));
      } catch {}
      let s = pi.session() + t;
      try {
        sessionStorage.setItem(dQ, String(s));
      } catch {
        pi._s = s;
      }
      (Yw?.p && ((Yw.p.spend = e), Yw.save?.(!0)), pQ());
    },
    over(i = 1) {
      return pi.session() + i > pi.cap();
    },
    tokens() {
      let i = pi.lifetime(),
        t = Ou("image", i.pictures),
        e = Ou("car", i.cars);
      return (i.pictures && !t) || (i.cars && !e)
        ? null
        : {
            pictures: i.pictures,
            cars: i.cars,
            text: [t, e].filter(Boolean).join(" + ") || "\u2248 0 tokens",
          };
    },
    lifeLine() {
      let i = pi.lifetime(),
        t = pi.tokens();
      return `${i.pictures} AI picture${i.pictures === 1 ? "" : "s"} \xB7 ${i.cars} AI car${i.cars === 1 ? "" : "s"}${t && (i.pictures || i.cars) ? " \xB7 " + t.text.replace(/ \+ /, " + ") + " (estimate)" : ""}`;
    },
  };
function Jw(i, t = 1, e = "") {
  let s = Ou(i, t),
    n = pi.session(),
    o = pi.cap(),
    a = n + t > o;
  return `<p><b>${e || (i === "car" ? "Create a car with AI?" : t > 1 ? `Make ${t} wrap designs?` : "Make a wrap design?")}</b></p>
    <p>This uses your mindblown tokens. After the free 10M a month, tokens cost real money. Estimated: ${s || "cost unknown"}.</p>
    <p class="sp-sess${a ? " over" : ""}">This session: ${n} of your limit of ${o} AI generation${o === 1 ? "" : "s"}${a ? " - this goes over it." : "."}</p>
    ${a ? '<label class="sp-over"><input type="checkbox" class="sp-go"> Go over my limit for this one</label>' : ""}`;
}
var Zw = (i, t = 1) => !pi.over(t) || !!i?.querySelector?.(".sp-go")?.checked;
