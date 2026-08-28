/* Fades sections in as they come into view. Slow and one-way — nothing
   re-animates on scroll back up, so the page never feels twitchy. */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  function showAll() {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('is-visible');
    }
  }

  // Respect the OS setting, and don't animate at all without IntersectionObserver.
  var stillness = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (stillness.matches || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    // start the fade a little before the element reaches the fold
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.05
  });

  for (var i = 0; i < items.length; i++) {
    observer.observe(items[i]);
  }

  // If the user turns motion off mid-visit, reveal whatever is left.
  var onChange = function () {
    if (stillness.matches) {
      observer.disconnect();
      showAll();
    }
  };
  if (stillness.addEventListener) {
    stillness.addEventListener('change', onChange);
  } else if (stillness.addListener) {
    stillness.addListener(onChange);
  }
})();
