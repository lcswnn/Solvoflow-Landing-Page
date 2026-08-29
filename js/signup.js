/* Front-end validation for the email capture. The form is marked `novalidate`
   so we own the messaging: the browser's native bubble is not announced
   reliably and disappears on the next keystroke.

   There is no backend yet — on success this only confirms to the visitor.
   Wire the fetch() below to a real endpoint before launch. */
(function () {
  var form = document.getElementById('signup-form');
  if (!form) return;

  var input = document.getElementById('signup-email');
  var status = document.getElementById('signup-status');

  function say(message, invalid) {
    status.textContent = message;
    input.setAttribute('aria-invalid', invalid ? 'true' : 'false');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = input.value.trim();

    if (!value) {
      say('Please enter your email address.', true);
      input.focus();
      return;
    }

    // Deliberately loose: anything with a single @ and a dot after it. Strict
    // patterns reject valid addresses far more often than they catch typos.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      say('That address looks incomplete — check for a typo.', true);
      input.focus();
      return;
    }

    say('Thanks — check your inbox for the link.', false);
    form.reset();
  });

  // Clear a stale error as soon as they start fixing it.
  input.addEventListener('input', function () {
    if (input.getAttribute('aria-invalid') === 'true') say('', false);
  });
})();
