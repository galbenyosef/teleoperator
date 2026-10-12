(function () {
  "use strict";
  var mb;
  try {
    mb = window.mindblown = window.mindblown || {};
  } catch (e) {
    return;
  }
  if (mb.load || mb.__queuedSaves) return;
  var queued = [];
  function later(op) {
    return function () {
      var args = arguments;
      return new Promise(function (resolve, reject) {
        queued.push([op, args, resolve, reject]);
      });
    };
  }
  mb.load = later("load");
  mb.save = later("save");
  mb.remove = later("remove");
  mb.__queuedSaves = queued;
  setTimeout(function () {
    if (mb.__queuedSaves !== queued) return;
    function refuse() {
      var e = new Error(
        "the mindblown script did not load, so saves are unavailable",
      );
      e.reason = "STORAGE_UNAVAILABLE";
      e.status = 503;
      return e;
    }
    delete mb.__queuedSaves;
    mb.load =
      mb.save =
      mb.remove =
        function () {
          return Promise.reject(refuse());
        };
    queued.splice(0).forEach(function (c) {
      c[3](refuse());
    });
  }, 20000);
})();
