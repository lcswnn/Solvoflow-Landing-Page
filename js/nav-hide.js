/* Hide the bar on the way down, bring it back on the way up. The header is
   sticky and we only move it with a transform, so the page keeps its flow —
   no fixed positioning, no compensating padding, no layout shift. */
(function () {
  var header = document.querySelector('.site-header');
  var navbar = document.querySelector('.navbar');
  if (!header || !navbar) return;

  var lastY = window.pageYOffset;
  var ticking = false;

  // Near the top the bar always shows — hiding it there reads as a glitch.
  function revealZone() {
    return navbar.offsetHeight * 1.5;
  }

  function reveal() {
    header.classList.remove('is-hidden');
  }

  function update() {
    ticking = false;

    // Rubber-band scrolling reports positions past both ends of the page.
    var y = Math.max(0, window.pageYOffset);
    var delta = y - lastY;

    // Swallow sub-pixel drift and a trackpad settling, but keep lastY put so
    // small moves in one direction still accumulate into a real gesture.
    if (Math.abs(delta) < 6) return;

    var menuOpen = !!document.querySelector('.navbar-menu.is-open');

    if (delta < 0 || y < revealZone() || menuOpen) {
      reveal();
    } else {
      header.classList.add('is-hidden');
    }

    lastY = y;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  // Tabbing into a bar that's translated off-screen would strand the focus
  // ring somewhere the user can't see.
  document.addEventListener('focusin', function (event) {
    if (navbar.contains(event.target)) reveal();
  });
})();
