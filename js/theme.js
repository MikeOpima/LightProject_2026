/* Shared colour-theme toggle. Looks for #theme-toggle / #tt-label; no-ops if absent. */
(function () {
  "use strict";

  var root   = document.documentElement;
  var ttBtn  = document.getElementById("theme-toggle");
  var ttText = document.getElementById("tt-label");
  if (!ttBtn || !ttText) return;

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
})();
