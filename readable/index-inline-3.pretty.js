(function () {
  var m;
  try {
    m = window.mindblown = window.mindblown || {};
  } catch (e) {
    return;
  }
  if (!m.event)
    m.event = function (n, p) {
      if (!m.events || !m.events.push) m.events = [];
      m.events.push(p === undefined ? [n] : [n, p]);
    };
  if (!m.run) {
    var s = function (n) {
      return function (p) {
        m.event(n, p);
      };
    };
    m.run = {
      start: s("game_start"),
      pause: s("game_pause"),
      resume: s("game_resume"),
      end: s("game_end"),
    };
  }
  if (!m.measure)
    m.measure = function (l) {
      if (!m.__queuedMeasure) m.__queuedMeasure = l;
    };
})();
