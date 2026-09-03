/* Six Ways to Tell It — behaviour.
   Renders the framework rail, the selected framework, and the cross-reference table.
   Content lives in js/data.js. */

(function () {
  "use strict";

  var VERSES  = window.GOSPEL.VERSES;
  var GIST    = window.GOSPEL.GIST;
  var METHODS = window.GOSPEL.METHODS;

  var rail    = document.getElementById("rail");
  var panel   = document.getElementById("panel");
  var current = METHODS[0].id;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- theme ---------- */
  var root   = document.documentElement;
  var ttBtn  = document.getElementById("theme-toggle");
  var ttText = document.getElementById("tt-label");

  function stored(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode — fine */ }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function applyTheme(mode) {
    if (mode === "light" || mode === "dark") {
      root.setAttribute("data-theme", mode);
    } else {
      root.removeAttribute("data-theme");
    }
    var effective = mode === "system" ? (systemDark() ? "dark" : "light") : mode;
    ttText.textContent = effective === "dark" ? "Light" : "Dark";
    ttBtn.setAttribute("aria-label", "Switch to " + (effective === "dark" ? "light" : "dark") + " theme");
  }

  var theme = stored("gospel-theme") || "system";
  applyTheme(theme);

  ttBtn.addEventListener("click", function () {
    var effective = theme === "system" ? (systemDark() ? "dark" : "light") : theme;
    theme = effective === "dark" ? "light" : "dark";
    store("gospel-theme", theme);
    applyTheme(theme);
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (theme === "system") applyTheme("system");
    });
  }

  /* ---------- rail ---------- */
  function renderRail() {
    rail.innerHTML = METHODS.map(function (m) {
      return '<li role="presentation">' +
        '<button class="rail-btn" role="tab" type="button" data-id="' + esc(m.id) + '" ' +
        'aria-selected="' + (m.id === current) + '">' +
        '<span class="rb-name">' + esc(m.name) + '</span>' +
        '<span class="rb-sub">' + esc(m.sub) + '</span>' +
        '</button></li>';
    }).join("");

    // keep the active framework visible in the horizontal strip on narrow screens
    var active = rail.querySelector('[aria-selected="true"]');
    if (active && active.scrollIntoView) {
      active.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  /* ---------- framework panel ---------- */
  function renderPanel() {
    var m = METHODS.filter(function (x) { return x.id === current; })[0];

    var steps = m.steps.map(function (s, i) {
      var verses = s.refs.map(function (r) {
        return '<div class="verse">' +
          '<span class="vref">' + esc(r) + '</span>' +
          '<p class="vtext">' + esc(VERSES[r] || "") + '</p>' +
          '</div>';
      }).join("");

      return '<li class="step">' +
        '<div class="step-n">' + ("0" + (i + 1)).slice(-2) + '</div>' +
        '<div class="step-body">' +
          '<h3>' + esc(s.h) + '</h3>' +
          (s.draw ? '<p class="step-draw">✎ ' + esc(s.draw) + '</p>' : "") +
          '<p class="step-say">' + esc(s.say) + '</p>' +
          '<div class="verses">' + verses + '</div>' +
          '<button class="reveal" type="button">Reveal · ' + s.refs.length +
            ' verse' + (s.refs.length > 1 ? "s" : "") + '</button>' +
        '</div></li>';
    }).join("");

    var facts = m.facts.map(function (f) {
      return '<div class="fact"><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
    }).join("");

    panel.innerHTML =
      '<article class="method">' +
        '<div class="method-head">' +
          '<p class="method-kicker">' + esc(m.kicker) + '</p>' +
          '<h2>' + esc(m.title) + '</h2>' +
          '<p class="method-lede">' + esc(m.lede) + '</p>' +
          '<dl class="factbar">' + facts + '</dl>' +
        '</div>' +
        '<ol class="steps">' + steps + '</ol>' +
      '</article>';

    document.title = m.name + " · Six Ways to Tell It";
  }

  /* ---------- events ---------- */
  rail.addEventListener("click", function (e) {
    var b = e.target.closest(".rail-btn");
    if (!b) return;
    select(b.dataset.id);
  });

  rail.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    var ids = METHODS.map(function (m) { return m.id; });
    var i = ids.indexOf(current) + (e.key === "ArrowDown" ? 1 : -1);
    if (i < 0 || i >= ids.length) return;
    e.preventDefault();
    select(ids[i]);
    var next = rail.querySelector('[data-id="' + ids[i] + '"]');
    if (next) next.focus();
  });

  function select(id) {
    if (!id || id === current) return;
    current = id;
    renderRail();
    renderPanel();
    if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
  }

  panel.addEventListener("click", function (e) {
    var b = e.target.closest(".reveal");
    if (!b) return;
    b.closest(".step").classList.add("shown");
  });

  document.getElementById("practice").addEventListener("change", function (e) {
    document.body.classList.toggle("practice", e.target.checked);
    var shown = panel.querySelectorAll(".step.shown");
    for (var i = 0; i < shown.length; i++) shown[i].classList.remove("shown");
  });

  window.addEventListener("hashchange", function () {
    select(location.hash.slice(1));
  });

  /* ---------- cross-reference table ---------- */
  function renderMatrix() {
    var order = [];
    var map = {};

    METHODS.forEach(function (m) {
      m.steps.forEach(function (s) {
        s.refs.forEach(function (r) {
          if (!map[r]) { map[r] = {}; order.push(r); }
          map[r][m.id] = true;
        });
      });
    });

    var rows = order.map(function (r) {
      return { ref: r, ids: map[r], n: Object.keys(map[r]).length };
    }).sort(function (a, b) {
      return b.n - a.n || a.ref.localeCompare(b.ref);
    });

    document.getElementById("matrix-head").innerHTML =
      "<th>Passage</th><th>What it says</th>" +
      METHODS.map(function (m) {
        return '<th class="m">' + esc(m.short || m.name.replace(/^The /, "")) + "</th>";
      }).join("") +
      '<th class="m">Uses</th>';

    document.getElementById("matrix-body").innerHTML = rows.map(function (row) {
      var cells = METHODS.map(function (m) {
        var on = !!row.ids[m.id];
        return '<td class="m"><span class="dot' + (on ? " on" : "") + '" role="img" aria-label="' +
          (on ? "used in " : "not in ") + esc(m.name) + '"></span></td>';
      }).join("");
      return "<tr>" +
        '<td class="ref">' + esc(row.ref) + "</td>" +
        '<td class="gist">' + esc(GIST[row.ref] || "") + "</td>" +
        cells +
        '<td class="count">' + row.n + "</td>" +
        "</tr>";
    }).join("");
  }

  /* ---------- search ---------- */
  var searchInput   = document.getElementById("search-input");
  var searchResults = document.getElementById("search-results");

  var SEARCH_INDEX = [];
  METHODS.forEach(function (m) {
    m.steps.forEach(function (s, i) {
      var verseBits = s.refs.map(function (r) { return r + " " + (VERSES[r] || ""); }).join(" ");
      SEARCH_INDEX.push({
        methodId: m.id,
        methodName: m.name,
        stepIndex: i,
        heading: s.h,
        say: s.say,
        haystack: (m.name + " " + s.h + " " + s.say + " " + verseBits).toLowerCase()
      });
    });
  });

  function markMatch(text, terms) {
    var safe = esc(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      safe = safe.replace(re, "<mark>$1</mark>");
    });
    return safe;
  }

  function snippetAround(text, terms) {
    var lower = text.toLowerCase();
    var pos = -1;
    for (var i = 0; i < terms.length && pos === -1; i++) pos = lower.indexOf(terms[i]);
    if (pos === -1) return text.slice(0, 100) + (text.length > 100 ? "…" : "");
    var start = Math.max(0, pos - 40);
    var end = Math.min(text.length, pos + 70);
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  function runSearch(query) {
    var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return SEARCH_INDEX.filter(function (item) {
      return terms.every(function (t) { return item.haystack.indexOf(t) !== -1; });
    }).slice(0, 8).map(function (item) { return { item: item, terms: terms }; });
  }

  function renderResults(matches, query) {
    if (!matches.length) {
      searchResults.innerHTML = '<p class="search-empty">No matches for &ldquo;' + esc(query) + '&rdquo;.</p>';
      searchResults.hidden = false;
      return;
    }
    searchResults.innerHTML = matches.map(function (m) {
      var item = m.item;
      return '<button class="search-result" type="button" data-method="' + esc(item.methodId) +
        '" data-step="' + item.stepIndex + '">' +
        '<span class="sr-fw">' + esc(item.methodName) + '</span>' +
        '<span class="sr-h">' + markMatch(item.heading, m.terms) + '</span>' +
        '<span class="sr-snip">' + markMatch(snippetAround(item.say, m.terms), m.terms) + '</span>' +
        '</button>';
    }).join("");
    searchResults.hidden = false;
  }

  function closeSearch() {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
  }

  function goToResult(methodId, stepIndex) {
    select(methodId);
    var stepEl = panel.querySelectorAll(".step")[stepIndex];
    if (stepEl) {
      stepEl.classList.add("shown");
      stepEl.scrollIntoView({ behavior: "smooth", block: "center" });
      stepEl.classList.add("flash");
      setTimeout(function () { stepEl.classList.remove("flash"); }, 1600);
    }
    closeSearch();
    searchInput.value = "";
  }

  searchInput.addEventListener("input", function () {
    var q = searchInput.value;
    if (!q.trim()) { closeSearch(); return; }
    renderResults(runSearch(q), q);
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      searchInput.value = "";
      closeSearch();
      searchInput.blur();
    } else if (e.key === "Enter") {
      var first = searchResults.querySelector(".search-result");
      if (first) first.click();
    } else if (e.key === "ArrowDown") {
      var firstResult = searchResults.querySelector(".search-result");
      if (firstResult) { e.preventDefault(); firstResult.focus(); }
    }
  });

  searchResults.addEventListener("keydown", function (e) {
    var b = e.target.closest(".search-result");
    if (!b) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      var items = Array.prototype.slice.call(searchResults.querySelectorAll(".search-result"));
      var i = items.indexOf(b) + (e.key === "ArrowDown" ? 1 : -1);
      if (i >= 0 && i < items.length) items[i].focus();
      else if (i < 0) searchInput.focus();
    } else if (e.key === "Escape") {
      closeSearch();
      searchInput.focus();
    }
  });

  searchResults.addEventListener("click", function (e) {
    var b = e.target.closest(".search-result");
    if (!b) return;
    goToResult(b.dataset.method, parseInt(b.dataset.step, 10));
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search")) closeSearch();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    e.preventDefault();
    searchInput.focus();
  });

  /* ---------- boot ---------- */
  var fromHash = location.hash.slice(1);
  if (fromHash && METHODS.some(function (m) { return m.id === fromHash; })) current = fromHash;

  renderRail();
  renderPanel();
  renderMatrix();
})();
