/* ===========================================================
   TASK 4 — Create and remove elements (about.html)
   "Questions for your doctor" list.
   Select:  #question-form, #question-input, #question-list,
            #list-count, #list-empty, #question-error
   Event:   submit on the form (Add button OR the Enter key)
   Handler: event.preventDefault() stops the page reload; an empty or
            whitespace-only text is rejected; otherwise createElement()
            builds <li><span>text</span><button>Remove</button></li>
            using textContent, and append() adds it to the list.
            The Remove button removes only its own <li>.
   The counter is recalculated from the real list after every change.
   =========================================================== */
(function () {
  'use strict';

  var form = document.getElementById('question-form');
  var input = document.getElementById('question-input');
  var list = document.getElementById('question-list');
  var counter = document.getElementById('list-count');
  var emptyNote = document.getElementById('list-empty');
  var error = document.getElementById('question-error');
  if (!form || !input || !list || !counter || !emptyNote || !error) { return; }

  // One function keeps the counter and the empty-state note correct.
  function updateCount() {
    var total = list.children.length;
    counter.textContent = 'Questions in your list: ' + total;
    emptyNote.hidden = total !== 0;
  }

  function showError(text) {
    error.textContent = text;
    error.hidden = false;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError() {
    error.textContent = '';
    error.hidden = true;
    input.removeAttribute('aria-invalid');
  }

  function addItem(text) {
    var item = document.createElement('li');

    var label = document.createElement('span');
    label.textContent = text;                       // textContent: no HTML injection

    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'btn btn-outline btn-small';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', 'Remove question: ' + text);

    // Each button removes only the <li> it was created with.
    remove.addEventListener('click', function () {
      item.remove();
      updateCount();
    });

    item.append(label, remove);
    list.append(item);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();                         // no page reload
    var text = input.value.trim();

    if (text === '') {
      showError('Please type a question before adding it.');
      input.focus();
      return;
    }

    clearError();
    addItem(text);
    updateCount();
    input.value = '';
    input.focus();                                  // ready for the next question
  });

  // Typing again hides the old error message.
  input.addEventListener('input', clearError);

  updateCount();
})();
