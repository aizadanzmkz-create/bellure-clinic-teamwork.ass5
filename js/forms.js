/* ===========================================================
   Bellure Clinic — form validation (contact + register)

   How it works
   1. The HTML attributes (required, type="email", minlength, maxlength)
      describe the rules. Every <form> has novalidate, so the browser
      does not show its own bubbles and Bootstrap feedback is used instead.
   2. This script reads the same rules from the fields, decides what is
      wrong, and then
        - adds .is-valid or .is-invalid to the field (Bootstrap classes),
        - writes the matching text into the field's .invalid-feedback.
      The feedback is recalculated from the real value every time, so it
      is never permanently "valid" or "invalid".
   3. Password confirmation is the only rule that HTML cannot express:
      the field with data-match="password" must equal the field with that id.
   =========================================================== */
(function () {
  'use strict';

  /* ---------- 1. Decide what is wrong with one field ---------- */

  // Custom text per rule comes from data-msg-* attributes on the field.
  function message(field, key, fallback) {
    return field.getAttribute('data-msg-' + key) || fallback;
  }

  // Returns an error text, or '' when the value is acceptable.
  function getError(field) {
    var value = field.value;
    var trimmed = value.trim();

    // required: empty, or only spaces (select: the empty first option)
    if (field.required && trimmed === '') {
      return message(field, 'missing', 'This field is required.');
    }

    // Optional and empty: nothing to check.
    if (trimmed === '') { return ''; }

    // type="email": native check plus a "name@domain.tld" shape.
    if (field.type === 'email') {
      var shape = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (field.validity.typeMismatch || !shape.test(value)) {
        return message(field, 'type', 'Enter an email address like name@example.com.');
      }
    }

    // minlength / maxlength: same numbers as the HTML attributes.
    // (field.minLength is -1 when the attribute is absent.)
    if (field.minLength > 0 && trimmed.length < field.minLength) {
      return message(field, 'short', 'Enter at least ' + field.minLength + ' characters.');
    }
    if (field.maxLength > 0 && value.length > field.maxLength) {
      return message(field, 'long', 'Use no more than ' + field.maxLength + ' characters.');
    }

    // Password confirmation: compare with the field named in data-match.
    var otherId = field.getAttribute('data-match');
    if (otherId) {
      var other = document.getElementById(otherId);
      if (other && value !== other.value) {
        return message(field, 'match', 'The two values do not match.');
      }
    }

    return '';
  }

  /* ---------- 2. Show the result on one field ---------- */

  function feedbackFor(field) {
    // .invalid-feedback is a later sibling of the field inside the same column.
    return field.parentNode.querySelector('.invalid-feedback');
  }

  function clearState(field) {
    field.classList.remove('is-valid', 'is-invalid');
    field.removeAttribute('aria-invalid');
    field.setCustomValidity('');
  }

  // Validates one field and updates its look. Returns true when it is fine.
  function check(field) {
    var error = getError(field);

    // Keep the browser's own validity state in sync with our decision.
    field.setCustomValidity(error);

    // An optional field left empty is neither valid nor invalid.
    if (!error && field.value.trim() === '' && !field.required) {
      clearState(field);
      return true;
    }

    if (error) {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      var fb = feedbackFor(field);
      if (fb) { fb.textContent = error; }
    } else {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      field.removeAttribute('aria-invalid');
      var old = feedbackFor(field);
      if (old) { old.textContent = ''; }   // no stale error text left behind
    }
    return !error;
  }

  /* ---------- 3. Wire up a whole form ---------- */

  function initForm(form) {
    var fields = Array.prototype.slice.call(
      form.querySelectorAll('.form-control, .form-select')
    );
    // The success alert sits just above the form, inside the same column.
    var success = form.parentNode.querySelector('[data-success]');
    var counters = form.querySelectorAll('[data-count-for]');

    function updateCounters() {
      Array.prototype.forEach.call(counters, function (counter) {
        var target = document.getElementById(counter.getAttribute('data-count-for'));
        counter.textContent = target.value.length + ' / ' + target.maxLength;
      });
    }

    fields.forEach(function (field) {
      var touched = false;

      // Show feedback when the user leaves the field...
      field.addEventListener('blur', function () {
        touched = true;
        check(field);
      });

      // ...and keep it up to date while typing once feedback is visible.
      field.addEventListener('input', function () {
        if (touched || field.classList.contains('is-invalid') || field.classList.contains('is-valid')) {
          check(field);
        }
        // If another field depends on this one, re-check it too.
        // This is what clears the "do not match" error after correction.
        fields.forEach(function (dependent) {
          if (dependent.getAttribute('data-match') === field.id &&
              (dependent.classList.contains('is-invalid') || dependent.classList.contains('is-valid'))) {
            check(dependent);
          }
        });
        updateCounters();
      });

      // <select> fires change instead of input in some browsers.
      field.addEventListener('change', function () {
        touched = true;
        check(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();               // never leave the page: demo only
      var firstInvalid = null;

      fields.forEach(function (field) {
        if (!check(field) && !firstInvalid) { firstInvalid = field; }
      });

      if (firstInvalid) {
        if (success) { success.classList.add('d-none'); }
        firstInvalid.focus();
        return;                              // invalid input: stop here
      }

      // All fields valid: show the demonstration message.
      if (success) {
        var name = form.querySelector('[data-greet]');
        var slot = success.querySelector('[data-greet-slot]');
        if (name && slot) { slot.textContent = name.value.trim(); }
        success.classList.remove('d-none');
        success.focus();
      }
    });

    // Reset: native reset clears the values, we clear the feedback too.
    form.addEventListener('reset', function () {
      fields.forEach(clearState);
      if (success) { success.classList.add('d-none'); }
      // Counters read the value, which is emptied right after this event.
      setTimeout(updateCounters, 0);
    });

    updateCounters();
  }

  Array.prototype.forEach.call(
    document.querySelectorAll('form[data-validate]'),
    initForm
  );
})();
