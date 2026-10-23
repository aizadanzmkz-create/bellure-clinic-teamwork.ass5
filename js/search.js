/* ===========================================================
   TASK 3 — Filter content as the user types (services.html)
   Select:  #treatment-search, all .treatment-card articles,
            #search-count, #no-results
   Event:   input (fires on typing, pasting, deleting and the
            browser's "clear" button)
   Handler: compares the TITLE (<h3>) of each card with the trimmed,
            lower-case search text, hides non-matching cards with the
            `hidden` property, updates the counter and the
            "No results found" message. An empty search shows everything.
   =========================================================== */
(function () {
  'use strict';

  var input = document.getElementById('treatment-search');
  var cards = document.querySelectorAll('.treatment-card');
  var count = document.getElementById('search-count');
  var noResults = document.getElementById('no-results');
  var sections = document.querySelectorAll('[data-searchable]');
  if (!input || !count || !noResults) { return; }

  function filterCards() {
    var query = input.value.trim().toLowerCase();   // ignore case and outer spaces
    var shown = 0;

    cards.forEach(function (card) {
      var title = card.querySelector('h3').textContent.toLowerCase();
      var matches = title.includes(query);          // '' matches every title
      card.hidden = !matches;
      if (matches) { shown++; }
    });

    // Hide a category heading when none of its cards match.
    sections.forEach(function (section) {
      var visible = section.querySelectorAll('.treatment-card:not([hidden])').length;
      section.hidden = visible === 0;
    });

    // Counter
    if (query === '') {
      count.textContent = 'Showing all ' + cards.length + ' treatments.';
    } else {
      count.textContent = shown + ' of ' + cards.length + ' treatments match.';
    }

    // "No results found" message (textContent: the typed text is not parsed as HTML)
    noResults.hidden = shown !== 0;
    if (shown === 0) {
      noResults.textContent = 'No results found for “' + input.value.trim() +
        '”. Try another word, such as “peel” or “laser”.';
    }
  }

  input.addEventListener('input', filterCards);
  filterCards();   // show the initial count
})();
