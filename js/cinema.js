/* Home page cinematic hero: crossfading painting slideshow with a headline that
   changes per slide. Looks for #cine; no-ops if absent. */
(function () {
  "use strict";

  var root = document.getElementById("cine");
  if (!root) return;

  var slides   = Array.prototype.slice.call(root.querySelectorAll(".cine-slide"));
  var title    = document.getElementById("cine-title");
  var line1    = document.getElementById("ct-1");
  var line2    = document.getElementById("ct-2");
  var ref      = document.getElementById("ct-ref");
  var credit   = document.getElementById("cine-credit");
  var controls = document.getElementById("cine-controls");
  var pauseBtn = document.getElementById("cine-pause");
  var search   = document.getElementById("home-search-input");
  if (slides.length < 2 || !title || !controls) return;

  var DURATION = 7000;
  var reduced  = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current  = 0;
  var timer    = null;
  var paused   = false;   // user pressed pause
  var held     = false;   // search has focus, or tab is hidden
  var dots     = [];

  root.style.setProperty("--cine-dur", DURATION + "ms");

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function load(slide) {
    var img = slide.querySelector("img[data-src]");
    if (img) { img.src = img.getAttribute("data-src"); img.removeAttribute("data-src"); }
  }

  slides.forEach(function (slide, n) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "cine-dot";
    b.textContent = pad(n + 1);
    b.setAttribute("aria-label", "Show painting " + (n + 1) + " of " + slides.length);
    b.addEventListener("click", function () { go(n); schedule(); });
    controls.insertBefore(b, pauseBtn);
    dots.push(b);
  });

  function restartProgress(dot) {
    dot.removeAttribute("aria-current");
    void dot.offsetWidth;            // reflow so the CSS progress animation restarts
    dot.setAttribute("aria-current", "true");
  }

  function setText(slide) {
    line1.textContent = slide.getAttribute("data-line1");
    line2.textContent = slide.getAttribute("data-line2");
    ref.textContent   = slide.getAttribute("data-ref");
    if (credit) credit.innerHTML = slide.getAttribute("data-credit");
  }

  function go(n) {
    n = (n + slides.length) % slides.length;
    if (n === current) return;
    var next = slides[n];
    load(next);
    load(slides[(n + 1) % slides.length]);   // warm up the one after

    slides[current].classList.remove("is-active");
    next.classList.add("is-active");
    dots.forEach(function (d) { d.removeAttribute("aria-current"); });
    restartProgress(dots[n]);
    current = n;

    if (reduced) { setText(next); return; }
    title.classList.add("is-out");
    if (credit) credit.classList.add("is-out");
    setTimeout(function () {
      if (slides[current] !== next) return;   // user clicked again mid-transition
      setText(next);
      title.classList.remove("is-out");
      title.classList.add("is-pre");
      void title.offsetWidth;
      title.classList.remove("is-pre");
      if (credit) credit.classList.remove("is-out");
    }, 480);
  }

  function schedule() {
    clearTimeout(timer);
    if (paused || held) return;
    restartProgress(dots[current]);
    timer = setTimeout(function () { go(current + 1); schedule(); }, DURATION);
  }

  function setPaused(p) {
    paused = p;
    root.classList.toggle("is-paused", paused || held);
    pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false");
    pauseBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    schedule();
  }
  function setHeld(h) {
    held = h;
    root.classList.toggle("is-paused", paused || held);
    schedule();
  }

  pauseBtn.addEventListener("click", function () { setPaused(!paused); });
  if (search) {
    search.addEventListener("focus", function () { setHeld(true); });
    search.addEventListener("blur",  function () { setHeld(document.hidden); });
  }
  document.addEventListener("visibilitychange", function () {
    setHeld(document.hidden || document.activeElement === search);
  });

  var downLink = root.querySelector(".cine-down");
  if (downLink) {
    downLink.addEventListener("click", function (e) {
      var target = document.getElementById("questions");
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  }

  load(slides[1]);
  dots[0].setAttribute("aria-current", "true");
  // home.js focuses search on wide screens; let the slideshow play anyway until the user interacts.
  setHeld(false);
  setPaused(reduced);
})();
