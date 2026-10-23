/* ===========================================================
   TASK 0 — Select elements and update content (index.html)
   Select:  getElementById() for the input and the message,
            querySelector() for the button
   Event:   click on "Show welcome"
   Handler: reads and trims the name, then writes the message
            with textContent (never innerHTML, so typed HTML is
            shown as plain text and cannot run).
   =========================================================== */
(function () {
  'use strict';

  var nameInput = document.getElementById('visitor-name');
  var message = document.getElementById('welcome-message');
  var button = document.querySelector('#welcome-button');
  if (!nameInput || !message || !button) { return; }

  button.addEventListener('click', function () {
    var name = nameInput.value.trim();          // "   " becomes ""

    if (name === '') {
      // Empty or whitespace-only: explain what to do.
      message.textContent = 'Please type your name first, for example “Aigerim”.';
      message.classList.add('is-error');
      nameInput.setAttribute('aria-invalid', 'true');
      nameInput.focus();
      return;
    }

    message.textContent = 'Welcome to Bellure Clinic, ' + name + '! We are glad you are here.';
    message.classList.remove('is-error');
    nameInput.removeAttribute('aria-invalid');
  });
})();
