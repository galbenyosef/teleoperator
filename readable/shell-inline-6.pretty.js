/* NO BACKTICKS IN HERE EITHER: this script is inside the same template literal
   the CSS above is in, and one in a comment ends the literal. The CSS block
   carries this warning and this one did not, so the next person to explain
   something in here reached for a code quote and the whole worker stopped
   parsing -- "Unexpected identifier 'load'", nowhere near the line. */
(function () {
  var splash = document.getElementById("mb-splash");
  /* THE GAME'S OWN FACE, once it has arrived.
   *
   * Both images are the SAME URL and therefore one fetch -- the browser serves
   * the second from the first's response. They are revealed together so the
   * blurred ground and the sharp mark never appear a frame apart.
   *
   * A LISTENER CAN BE TOO LATE. A 256px same-origin PNG can be in the cache and
   * complete before this script runs, and "load" does not fire again for an
   * image that has already finished -- so .complete is checked first, and the
   * listener is only for the case where it has not. Without that a warm cache
   * showed the plainest splash of all.
   *
   * ON ERROR IT IS TODAY'S SCREEN. A game published before the publish wrote an
   * icon 404s here, and what is left is the name, the blocks and our mark. */
  function dressUp() {
    var art = document.getElementById("mb-art");
    var face = document.getElementById("mb-face");
    if (!art || !face) return;
    function show() {
      art.className = "mb-on";
      face.className = "mb-on";
      if (splash) splash.className = "mb-lit";
    }
    function drop() {
      face.className = "mb-no";
    }
    if (face.complete) {
      (face.naturalWidth ? show : drop)();
      return;
    }
    face.addEventListener("load", show);
    face.addEventListener("error", drop);
    art.addEventListener("error", drop);
  }
  dressUp();
  function hideSplash() {
    if (!splash || splash.className.indexOf("mb-gone") >= 0) return;
    var wait = Math.max(0, 450 - (Date.now() - shown));
    setTimeout(function () {
      // KEPT, NOT REPLACED: mb-lit is what holds the house glow down, and
      // dropping it here made the orange bloom back in over the game's own
      // colours for the 320ms of the fade.
      splash.className = splash.className
        ? splash.className + " mb-gone"
        : "mb-gone";
      // OUT OF THE LAYOUT ONCE IT HAS FADED. An opacity of zero is still a
      // layer, and this one is over the game.
      setTimeout(function () {
        splash.style.display = "none";
      }, 400);
    }, wait);
  }
  var shown = Date.now();
  // A DOCUMENT'S LOAD EVENT WAITS FOR ITS CHILD FRAMES, so this is the shell
  // being told the first game finished -- no reaching into the frame, and no
  // race with a listener attached after the frame already loaded.
  if (document.readyState === "complete") hideSplash();
  else window.addEventListener("load", hideSplash);
  // And the failsafe, which is the whole reason this is safe to ship: a game
  // that never finishes loading must not leave somebody looking at a logo.
  setTimeout(hideSplash, 8000);

  // ---- there is no shelf under this game ---------------------------------
  //
  // IT WAS A REEL (Sasun, 2026-09-15: "feed games should not be fetched dude",
  // and on the scrolling: "Am I not clear that it should be disabled?").
  //
  // The page the link named was the first slide of a scroll snapping shelf, so
  // a two finger scroll -- which on a laptop is how somebody PLAYS -- snapped
  // to the next one and mounted a whole second game: its bundle, its fonts,
  // its models, its WebGL context. Measured on sky-to-city, 2026-09-15: one
  // wheel gesture and the frame was apex-city. Preloading had already been cut
  // to zero for the same complaint on 2026-09-13; the shelf itself was the
  // thing to remove, not its eagerness.
  //
  // The feed is not fetched here at all now, and no frame but the one above is
  // ever built. The ways onward are the rail's own arrows and the sheet at the
  // end of a run: both a deliberate reach, neither something a hand is already
  // doing while playing.
})();
