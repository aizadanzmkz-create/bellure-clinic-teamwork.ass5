# Bellure Clinic — Team Website

**Assignment #5 — JavaScript Basics: DOM Manipulation & Events (Part 1, teamwork)** · Group MT-2504

**Topic:** medical cosmetology clinic in Astana
**Live website:** https://aikonzhenisovvova-ops.github.io/bellure.clinic3/

## Team

| Member | GitHub | Page |
|---|---|---|
| Nurakysheva Ayaulym | `aikonzhenisovvova-ops` | `index.html` |
| Bekbolat Adina | `adinabek` | `services.html` |
| Nazymkyzy Aizada | `Aizzadamsn` | `about.html` |
| Khabibullina Aigerim | `aigerim-kh` | `contact.html` |

Each member's contribution is described in her own section of the report and in her commits.

## How to open

Extract the ZIP and open `contact.html` or `register.html` in any browser. No server or internet is needed: all paths are relative and Bootstrap 5.3.3 is stored in `vendor/bootstrap/`.


## Assignment 5 — interactive features (Part 1)

All scripts are plain JavaScript in `js/`, connected with `defer`, using `addEventListener()` only. No jQuery, no frameworks, no Bootstrap JavaScript. Each feature has a visible "Task N" label on the page and a comment block at the top of its script.

| Task | Page | Script | Select | Event | Visible DOM change |
|---|---|---|---|---|---|
| 0 Welcome message | `index.html` (#welcome) | `js/welcome.js` | `getElementById`, `querySelector` | `click` | Personal greeting written with `textContent`; helpful message for empty / spaces-only input |
| 1 Light / dark theme | every page (header button) | `js/theme.js` | `getElementById`, `body` | `click` | `classList.toggle('dark-theme')`; button text names the next action; choice kept in `localStorage` |
| 2 FAQ | `contact.html` (#faq) | `js/faq.js` | `querySelectorAll` + loop | `click` (Enter / Space work on buttons) | Answer shown / hidden with `hidden`; `aria-expanded` matches |
| 3 Live search | `services.html` | `js/search.js` | `getElementById`, `querySelectorAll` | `input` | Cards filtered by title (case and outer spaces ignored); counter; "No results found" |
| 4 Question list | `about.html` (#questions) | `js/questions.js` | `getElementById` | `submit` (`preventDefault`) and `click` on Remove | `createElement` / `append` adds an item, Remove deletes only that item, counter updated |

Theme colours live in `css/features.css` (`.dark-theme` redefines the colour tokens from `css/style.css`).

### Test log (Assignment 5)

Tested in Chromium at 1280px and 375px with an automated script (33 checks, 0 failures, no console errors).

| Task | Input | Expected | Actual |
|---|---|---|---|
| 0 | empty / `   ` | Helpful message, input focused | As expected |
| 0 | `  Aigerim  ` | "Welcome to Bellure Clinic, Aigerim! ..." (trimmed) | As expected |
| 0 | `<b>x</b>` | Shown as plain text, no bold element created | As expected |
| 1 | click, click again, open another page | Dark, then original light theme; dark persists across pages | As expected |
| 2 | click questions 1 and 3, then 1 again | Each answer works independently, `aria-expanded` matches | As expected |
| 2 | Tab to a question, Enter / Space | Answer opens / closes | As expected |
| 3 | `  PEEL ` | 1 of 9 treatments match, empty categories hidden | As expected |
| 3 | `zzz` / clear the field | "No results found" and 0 of 9 / all 9 shown again | As expected |
| 4 | empty, spaces, then Enter | Rejected with a message, no reload | As expected |
| 4 | add 3 questions, remove the middle one | Count 3, then 2; only that item removed | As expected |
| 4 | `<i>x</i>` | Shown as text, no HTML created | As expected |
| All | 375px, all 5 pages | No sideways scrolling | As expected |

### Team contributions (Assignment 5)

| Member | Page | Feature |
|---|---|---|
| Nurakysheva Ayaulym | `index.html` | Task 0 welcome message |
| Bekbolat Adina | `services.html` | Task 3 live search |
| Nazymkyzy Aizada | `about.html` | Task 4 question list |
| Khabibullina Aigerim | `contact.html` | Task 2 FAQ buttons; Task 1 theme toggle (all pages) |

## Forms (Assignment 4)

| Page | Form | Rules |
|---|---|---|
| `contact.html` | Name, Email, Message, Submit | all `required`; `type="email"`; name `minlength="2"`; message `minlength="10"` and `maxlength="500"` |
| `register.html` | First name, Last name, Email, Password, Confirm password, Gender (optional), Interests (optional), Country, Submit, Reset | names `minlength="2"`; email `type="email"`; passwords `minlength="8"` and must match; country `required` with an empty default option |

- **Styling:** Bootstrap classes `form-label`, `form-control`, `form-select`, `form-text`, `form-check`, the grid (`row`, `col-md-6`) and `valid-feedback` / `invalid-feedback`.
- **Feedback:** `js/forms.js` checks the real value of each field and toggles `.is-valid` / `.is-invalid` on blur, while typing and on submit, with a message that matches the problem. The forms use `novalidate`, so Bootstrap feedback replaces the browser's pop-ups.
- **Password match:** HTML cannot compare two fields, so `forms.js` compares them and clears the error as soon as they agree.
- **Submit and Reset:** invalid input stops submission; valid input shows a demonstration message (nothing is sent or stored); Reset clears the data and all feedback.

## Test log

Tested in Chromium at 1280px and 375px; screenshots are in `screenshots/`.

| Case | Input | Expected | Actual |
|---|---|---|---|
| Empty required fields | Submit empty form | Required fields red, each with its own message, no success message | As expected |
| Invalid email | `aigerim@` | "Enter an email address like name@example.com." | As expected |
| Message length | `Hi there` (8) / 10 / 500 / 501 characters | 8 red; 10 and 500 green; 501 red | As expected (typing stops at 500; 501 tested by script) |
| Password too short | `short` | "Your password needs at least 8 characters." | As expected |
| Passwords differ | `password123` / `password124` | "The passwords do not match."; turns green when fixed | As expected |
| No country | Country left empty | "Please choose your country." | As expected |
| All valid | Sample valid data | All green, demonstration message shown | As expected |
| Reset after errors | Press "Reset form" | Empty form, no marks, no message | As expected |
| Mobile / desktop | 375px / 1280px | One column on phone, two columns on desktop, no sideways scrolling | As expected |

## Structure

```
index.html  services.html  about.html  contact.html  register.html
css/       style.css  responsive.css  forms.css  features.css
js/        forms.js  theme.js  welcome.js  faq.js  search.js  questions.js
vendor/    bootstrap/
images/  fonts/  screenshots/
```

The forms and the lists are a demonstration only: no data is sent, stored or used to create an account.
