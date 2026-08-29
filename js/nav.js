/* Mobile navbar. The menu is a plain list until the viewport drops below
   1180px — from there it collapses behind the toggle and slides down as a
   panel. Without JS the CSS leaves it open and stacked, so nothing is lost.
   The width below must match the navbar breakpoint in style.css. */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  var wide = window.matchMedia('(min-width: 1181px)');

  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  toggle.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  // Tapping a link scrolls to the section — the panel shouldn't stay over it.
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });

  // Anywhere outside the bar closes it.
  document.addEventListener('click', function (event) {
    if (!isOpen() || event.target.closest('.navbar')) return;
    setOpen(false);
  });

  // Rotating to landscape can cross the breakpoint while the panel is open;
  // the desktop layout ignores .is-open, so clear it to keep state honest.
  var onWide = function () {
    if (wide.matches) setOpen(false);
  };
  if (wide.addEventListener) {
    wide.addEventListener('change', onWide);
  } else if (wide.addListener) {
    wide.addListener(onWide);
  }
})();
