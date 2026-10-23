/* ===========================================================
   TASK 2 — Show and hide information (contact.html, FAQ)
   Select:  querySelectorAll('.faq-button') and a loop
   Event:   click on each question button. A <button> also reacts
            to Enter and Space, so keyboard use works with no extra code.
   Handler: toggles the `hidden` property of ITS OWN answer and keeps
            aria-expanded equal to the real state. Items are independent.
   =========================================================== */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('.faq-button');

  buttons.forEach(function (button) {
    // aria-controls points to the id of the answer this button owns.
    var answer = document.getElementById(button.getAttribute('aria-controls'));
    if (!answer) { return; }

    button.addEventListener('click', function () {
      var willOpen = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(willOpen));
      answer.hidden = !willOpen;
    });
  });
})();
