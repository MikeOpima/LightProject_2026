/* Questions About Faith — per-category page behaviour.
   Reads window.FAITH (js/faith-data.js) and this page's <body data-category="…">
   to render the cross-page category rail and this page's own questions.
   Colour-theme toggle lives in js/theme.js (load it first). */

(function () {
  "use strict";

  var VERSES     = window.FAITH.VERSES;
  var CATEGORIES = window.FAITH.CATEGORIES;
  var currentId  = document.body.getAttribute("data-category");
  var current    = CATEGORIES.filter(function (c) { return c.id === currentId; })[0];

  var rail  = document.getElementById("rail");
  var panel = document.getElementById("panel");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderRail() {
    rail.innerHTML = CATEGORIES.map(function (c) {
      var isCurrent = c.id === currentId;
      return '<li role="presentation">' +
        '<a class="rail-btn" href="' + esc(c.id) + '.html"' +
        (isCurrent ? ' aria-current="page"' : '') + '>' +
        '<span class="rb-name">' + esc(c.name) + '</span>' +
        '<span class="rb-sub">' + esc(c.sub) + '</span>' +
        '</a></li>';
    }).join("");
  }

  /* speech-friendly rendering of a reference like "Revelation 21:3-4" */
  function speakableRef(r) {
    return r.replace(/:/g, " verse ").replace(/-/g, " to ");
  }

  function renderPanel() {
    if (!current) {
      panel.innerHTML = "<p>That category doesn&rsquo;t exist yet.</p>";
      return;
    }

    var steps = current.steps.map(function (s, i) {
      var verses = s.refs.map(function (r) {
        var spoken = speakableRef(r) + ". " + (VERSES[r] || "");
        return '<div class="verse" data-va="' + esc(spoken) + '">' +
          '<span class="vref">' + esc(r) + '</span>' +
          '<p class="vtext">' + esc(VERSES[r] || "") + '</p>' +
          '</div>';
      }).join("");

      return '<li class="step" id="q' + (i + 1) + '">' +
        '<div class="step-n">' + ("0" + (i + 1)).slice(-2) + '</div>' +
        '<div class="step-body">' +
          '<h3 data-va="' + esc(s.h) + '">' + esc(s.h) + '</h3>' +
          '<p class="step-say" data-va="' + esc(s.say) + '">' + esc(s.say) + '</p>' +
          '<div class="verses">' + verses + '</div>' +
        '</div></li>';
    }).join("");

    var facts = current.facts.map(function (f) {
      return '<div class="fact"><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
    }).join("");

    panel.innerHTML =
      '<article class="method">' +
        '<div class="method-head">' +
          '<p class="method-kicker">' + esc(current.kicker) + '</p>' +
          '<h2 data-va="' + esc(current.title) + '">' + esc(current.title) + '</h2>' +
          '<p class="method-lede" data-va="' + esc(current.lede) + '">' + esc(current.lede) + '</p>' +
          '<div class="voiceover" hidden>' +
            '<button class="va-toggle" type="button" aria-pressed="false" title="Uses your browser’s built-in text-to-speech">' +
              '<span class="va-icon" aria-hidden="true">&#9658;</span>' +
              '<span class="va-label">Listen</span>' +
            '</button>' +
            '<button class="va-stop" type="button" hidden>Stop</button>' +
            '<span class="va-status" aria-live="polite"></span>' +
          '</div>' +
          '<dl class="factbar">' + facts + '</dl>' +
        '</div>' +
        '<ol class="steps">' + steps + '</ol>' +
      '</article>';

    if (window.Voiceover) window.Voiceover.mount(panel);
  }

  function scrollFlash(stepEl) {
    if (!stepEl) return;
    stepEl.scrollIntoView({ behavior: "smooth", block: "center" });
    stepEl.classList.add("flash");
    setTimeout(function () { stepEl.classList.remove("flash"); }, 1600);
  }

  function jumpToHash() {
    var m = location.hash.match(/^#q?(\d+)$/);
    if (m) scrollFlash(document.getElementById("q" + m[1]));
  }

  renderRail();
  renderPanel();
  if (location.hash) jumpToHash();
  window.addEventListener("hashchange", jumpToHash);
})();
