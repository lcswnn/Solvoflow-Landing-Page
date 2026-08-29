/* Theme toggle. The <head> script has already applied any saved choice before
   paint; this only wires the button and keeps its label truthful.
   With no saved choice the page follows the OS, so the button reports whatever
   the media query is currently resolving to. */
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  var root = document.documentElement;
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  var KEY = 'solvoflow-theme';

  function current() {
    var set = root.getAttribute('data-theme');
    if (set === 'dark' || set === 'light') return set;
    return dark.matches ? 'dark' : 'light';
  }

  function label() {
    var next = current() === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  toggle.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch (err) {
      /* private mode — the choice just won't survive a reload */
    }
    label();
  });

  // Someone flipping their OS theme while the page is open, with no explicit
  // choice of their own, should see the label follow along.
  var onScheme = function () {
    if (!root.getAttribute('data-theme')) label();
  };
  if (dark.addEventListener) {
    dark.addEventListener('change', onScheme);
  } else if (dark.addListener) {
    dark.addListener(onScheme);
  }

  label();
})();
