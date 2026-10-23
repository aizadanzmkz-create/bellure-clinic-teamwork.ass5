/* ===========================================================
   TASK 1 — Light / dark theme (every page)
   Select:  #theme-toggle (button) and <body>
   Event:   click
   Handler: classList.toggle('dark-theme') on <body>, then the
            button text is updated to the NEXT action.
   The theme is defined in css/features.css (.dark-theme tokens).
   The choice is remembered in localStorage so it carries over to
   the other pages; if storage is blocked the toggle still works.
   =========================================================== */
(function () {
  'use strict';

  var button = document.getElementById('theme-toggle');
  if (!button) { return; }

  var DARK_CLASS = 'dark-theme';
  var STORAGE_KEY = 'bellure-theme';

  // The button always names what a click will do next.
  function updateButtonText() {
    var isDark = document.body.classList.contains(DARK_CLASS);
    button.textContent = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  }

  // Restore the saved choice (if any) when the page opens.
  try {
    if (localStorage.getItem(STORAGE_KEY) === 'dark') {
      document.body.classList.add(DARK_CLASS);
    }
  } catch (error) { /* storage unavailable: start with the light theme */ }
  updateButtonText();

  button.addEventListener('click', function () {
    document.body.classList.toggle(DARK_CLASS);   // 1st click: dark, 2nd click: light again
    updateButtonText();
    try {
      localStorage.setItem(STORAGE_KEY,
        document.body.classList.contains(DARK_CLASS) ? 'dark' : 'light');
    } catch (error) { /* ignore */ }
  });
})();
