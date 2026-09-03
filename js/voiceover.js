/* Shared "read aloud" control, built on the Web Speech API (speechSynthesis).
   No external service — uses whatever voice the browser/OS provides.

   Usage: after rendering an article's HTML, call Voiceover.mount(panelEl).
   panelEl must contain:
     - one `.voiceover` control (markup below) — its Play/Stop buttons
     - one or more `[data-va="…"]` elements, in reading order, whose
       attribute value is the exact text to speak for that element

   Control markup (emit this once per rendered article, wherever the button
   should sit):
     <div class="voiceover" hidden>
       <button class="va-toggle" type="button" aria-pressed="false" title="Uses your browser's built-in text-to-speech">
         <span class="va-icon" aria-hidden="true">&#9658;</span>
         <span class="va-label">Listen</span>
       </button>
       <button class="va-stop" type="button" hidden>Stop</button>
       <span class="va-status" aria-live="polite"></span>
     </div>

   mount() re-scans and re-wires every call, and always stops any speech
   left over from a previous mount first — safe to call on every re-render
   (framework switch, category page load, etc). */
window.Voiceover = (function () {
  "use strict";

  var supported = typeof window !== "undefined" &&
    "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
  var synth = supported ? window.speechSynthesis : null;

  var activeEl  = null;
  var segments  = [];
  var speaking  = false;
  var paused    = false;
  var els       = null; // { root, toggle, icon, label, stopBtn, status }

  function pickVoice() {
    if (!synth) return null;
    var voices = synth.getVoices() || [];
    if (!voices.length) return null;
    var english = voices.filter(function (v) { return /^en/i.test(v.lang); });
    return english[0] || voices[0];
  }

  function clearHighlight() {
    if (activeEl) activeEl.classList.remove("va-active");
    activeEl = null;
  }

  function setUI(mode) {
    // mode: "idle" | "speaking" | "paused"
    if (!els) return;
    els.root.dataset.state = mode;
    els.label.textContent = mode === "speaking" ? "Pause" : mode === "paused" ? "Resume" : "Listen";
    els.icon.innerHTML = mode === "speaking" ? "&#10074;&#10074;" : "&#9658;";
    els.toggle.setAttribute("aria-pressed", mode === "idle" ? "false" : "true");
    els.stopBtn.hidden = mode === "idle";
    els.status.textContent = mode === "speaking" ? "Reading…" : mode === "paused" ? "Paused" : "";
  }

  function stop() {
    if (supported) synth.cancel();
    clearHighlight();
    speaking = false;
    paused = false;
    setUI("idle");
  }

  function start() {
    if (!supported || !els || !segments.length) return;
    synth.cancel();
    clearHighlight();
    var voice = pickVoice();

    segments.forEach(function (seg, i) {
      var u = new SpeechSynthesisUtterance(seg.text);
      if (voice) u.voice = voice;
      u.rate = 0.97;
      u.onstart = function () {
        clearHighlight();
        activeEl = seg.el;
        activeEl.classList.add("va-active");
        if (activeEl.scrollIntoView) activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      };
      var isLast = i === segments.length - 1;
      u.onend = function () {
        if (activeEl === seg.el) clearHighlight();
        if (isLast) { speaking = false; paused = false; setUI("idle"); }
      };
      u.onerror = u.onend;
      synth.speak(u);
    });

    speaking = true;
    paused = false;
    setUI("speaking");
  }

  function toggle() {
    if (!supported) return;
    if (!speaking && !paused) { start(); return; }
    if (speaking && !paused) { synth.pause(); speaking = true; paused = true; setUI("paused"); return; }
    if (paused) { synth.resume(); speaking = true; paused = false; setUI("speaking"); return; }
  }

  function mount(panelEl) {
    stop(); // discard anything left speaking from a previous mount
    els = null;
    if (!panelEl) return;

    var root = panelEl.querySelector(".voiceover");
    if (!root) return;

    if (!supported) { root.hidden = true; return; }

    els = {
      root: root,
      toggle: root.querySelector(".va-toggle"),
      icon: root.querySelector(".va-icon"),
      label: root.querySelector(".va-label"),
      stopBtn: root.querySelector(".va-stop"),
      status: root.querySelector(".va-status")
    };
    if (!els.toggle || !els.stopBtn) { els = null; return; }

    segments = [];
    panelEl.querySelectorAll("[data-va]").forEach(function (el) {
      var text = (el.getAttribute("data-va") || "").trim();
      if (text) segments.push({ el: el, text: text });
    });

    if (!segments.length) { root.hidden = true; return; }

    root.hidden = false;
    els.toggle.onclick = toggle;
    els.stopBtn.onclick = stop;
    setUI("idle");
  }

  return {
    mount: mount,
    stop: stop,
    get supported() { return supported; }
  };
})();
