/* Search the Scriptures — home page search.
   Combines js/data.js (gospel frameworks) and js/faith-data.js (FAQ categories)
   into one index and links straight to the matching page/step. */

(function () {
  "use strict";

  var GOSPEL = window.GOSPEL;
  var FAITH  = window.FAITH;

  var input   = document.getElementById("home-search-input");
  var results = document.getElementById("home-search-results");
  if (!input || !results || !GOSPEL || !FAITH) return;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var INDEX = [];

  GOSPEL.METHODS.forEach(function (m) {
    m.steps.forEach(function (s, i) {
      var verseBits = s.refs.map(function (r) { return r + " " + (GOSPEL.VERSES[r] || ""); }).join(" ");
      INDEX.push({
        section: "Six Ways to Tell It",
        group: m.name,
        heading: s.h,
        say: s.say,
        url: "gospel.html#" + m.id + ":" + i,
        haystack: (m.name + " " + s.h + " " + s.say + " " + verseBits).toLowerCase()
      });
    });
  });

  FAITH.CATEGORIES.forEach(function (c) {
    c.steps.forEach(function (s, i) {
      var verseBits = s.refs.map(function (r) { return r + " " + (FAITH.VERSES[r] || ""); }).join(" ");
      INDEX.push({
        section: "Questions About Faith",
        group: c.name,
        heading: s.h,
        say: s.say,
        url: "questions/" + c.id + ".html#q" + (i + 1),
        haystack: (c.name + " " + s.h + " " + s.say + " " + verseBits).toLowerCase()
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
    if (pos === -1) return text.slice(0, 110) + (text.length > 110 ? "…" : "");
    var start = Math.max(0, pos - 40);
    var end = Math.min(text.length, pos + 80);
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  function runSearch(query) {
    var terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return INDEX.filter(function (item) {
      return terms.every(function (t) { return item.haystack.indexOf(t) !== -1; });
    }).slice(0, 10).map(function (item) { return { item: item, terms: terms }; });
  }

  function render(matches, query) {
    if (!matches.length) {
      results.innerHTML = '<p class="search-empty">No matches for &ldquo;' + esc(query) + '&rdquo;.</p>';
      results.hidden = false;
      return;
    }
    var lastSection = null;
    var html = "";
    matches.forEach(function (m) {
      var item = m.item;
      if (item.section !== lastSection) {
        html += '<p class="search-lg-group">' + esc(item.section) + '</p>';
        lastSection = item.section;
      }
      html += '<a class="search-result" href="' + esc(item.url) + '">' +
        '<span class="sr-fw">' + esc(item.group) + '</span>' +
        '<span class="sr-h">' + markMatch(item.heading, m.terms) + '</span>' +
        '<span class="sr-snip">' + markMatch(snippetAround(item.say, m.terms), m.terms) + '</span>' +
        '</a>';
    });
    results.innerHTML = html;
    results.hidden = false;
  }

  function close() {
    results.hidden = true;
    results.innerHTML = "";
  }

  input.addEventListener("input", function () {
    var q = input.value;
    if (!q.trim()) { close(); return; }
    render(runSearch(q), q);
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      input.value = "";
      close();
      input.blur();
    } else if (e.key === "Enter") {
      var first = results.querySelector(".search-result");
      if (first) location.href = first.getAttribute("href");
    } else if (e.key === "ArrowDown") {
      var firstResult = results.querySelector(".search-result");
      if (firstResult) { e.preventDefault(); firstResult.focus(); }
    }
  });

  results.addEventListener("keydown", function (e) {
    var a = e.target.closest(".search-result");
    if (!a) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      var items = Array.prototype.slice.call(results.querySelectorAll(".search-result"));
      var i = items.indexOf(a) + (e.key === "ArrowDown" ? 1 : -1);
      if (i >= 0 && i < items.length) items[i].focus();
      else if (i < 0) input.focus();
    } else if (e.key === "Escape") {
      close();
      input.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-lg")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    e.preventDefault();
    input.focus();
  });

  if (window.matchMedia && window.matchMedia("(min-width: 900px)").matches) {
    input.focus();
  }
})();
