/* Bible version switcher — WEB (bundled) + KJV (bible-api.com, public domain)
   work with no setup. NKJV/ESV/NASB/NIV/CSB fetch from their own official
   APIs using the keys in js/bible-api-config.js (load that file first).

   Public API (window.VerseVersions):
     .list                         — [{id, label, pd}] in dropdown order
     .getCurrent() / .setCurrent(id)
     .speakableRef(ref)            — "Romans 8:38–39" -> "Romans 8 verse 38 to 39"
                                      (used by app.js / faq-app.js for the Listen feature)
     .applyTo(panelEl)             — (re)fetches and fills in every
                                      `.verse[data-ref]` inside panelEl for the
                                      current version, with a WEB fallback on
                                      any failure

   Expects, on any page that wants live verse switching:
     - a `<select id="version-select">` (the dropdown mounts itself into it)
     - a `#version-banner` element (shown when a fetch falls back to WEB)
     - each `.verse` element carrying `data-ref="Romans 3:23"` and
       `data-web-text="…"` (set at render time in app.js / faq-app.js) */
window.VerseVersions = (function () {
  "use strict";

  var LIST = [
    { id: "web",  label: "WEB",  pd: true  },
    { id: "kjv",  label: "KJV",  pd: true  },
    { id: "nkjv", label: "NKJV", pd: false },
    { id: "esv",  label: "ESV",  pd: false },
    { id: "nasb", label: "NASB", pd: false },
    { id: "niv",  label: "NIV",  pd: false },
    { id: "csb",  label: "CSB",  pd: false }
  ];
  var BY_ID = {};
  LIST.forEach(function (v) { BY_ID[v.id] = v; });

  var STORE_KEY = "bible-version";

  function getCurrent() {
    var v;
    try { v = localStorage.getItem(STORE_KEY); } catch (e) { v = null; }
    return (v && BY_ID[v]) ? v : "web";
  }
  function setCurrent(id) {
    try { localStorage.setItem(STORE_KEY, id); } catch (e) { /* private mode — fine */ }
  }

  function speakableRef(ref) {
    return ref.replace(/:/g, " verse ").replace(/[–-]/g, " to ");
  }

  /* ---------- reference -> book-code parsing (for api.bible) ---------- */
  var BOOK_CODES = {
    "genesis":"GEN","exodus":"EXO","leviticus":"LEV","numbers":"NUM","deuteronomy":"DEU",
    "joshua":"JOS","judges":"JDG","ruth":"RUT","1 samuel":"1SA","2 samuel":"2SA",
    "1 kings":"1KI","2 kings":"2KI","1 chronicles":"1CH","2 chronicles":"2CH",
    "ezra":"EZR","nehemiah":"NEH","esther":"EST","job":"JOB","psalm":"PSA","psalms":"PSA",
    "proverbs":"PRO","ecclesiastes":"ECC","song of solomon":"SNG","song of songs":"SNG",
    "isaiah":"ISA","jeremiah":"JER","lamentations":"LAM","ezekiel":"EZK","daniel":"DAN",
    "hosea":"HOS","joel":"JOL","amos":"AMO","obadiah":"OBA","jonah":"JON","micah":"MIC",
    "nahum":"NAM","habakkuk":"HAB","zephaniah":"ZEP","haggai":"HAG","zechariah":"ZEC","malachi":"MAL",
    "matthew":"MAT","mark":"MRK","luke":"LUK","john":"JHN","acts":"ACT","romans":"ROM",
    "1 corinthians":"1CO","2 corinthians":"2CO","galatians":"GAL","ephesians":"EPH",
    "philippians":"PHP","colossians":"COL","1 thessalonians":"1TH","2 thessalonians":"2TH",
    "1 timothy":"1TI","2 timothy":"2TI","titus":"TIT","philemon":"PHM","hebrews":"HEB",
    "james":"JAS","1 peter":"1PE","2 peter":"2PE","1 john":"1JN","2 john":"2JN","3 john":"3JN",
    "jude":"JUD","revelation":"REV"
  };

  function refToPassageId(ref) {
    var m = ref.match(/^(.+?)\s+(\d+):(\d+)(?:[–-](\d+))?$/);
    if (!m) return null;
    var code = BOOK_CODES[m[1].trim().toLowerCase()];
    if (!code) return null;
    var ch = m[2], v1 = m[3], v2 = m[4] || m[3];
    return code + "." + ch + "." + v1 + "-" + code + "." + ch + "." + v2;
  }

  /* ---------- fetch adapters ---------- */
  function fetchKJV(ref) {
    var normalized = ref.replace(/[–—]/g, "-"); // bible-api.com wants "38-39", not an en dash
    return fetch("https://bible-api.com/" + encodeURIComponent(normalized) + "?translation=kjv")
      .then(function (r) { if (!r.ok) throw new Error("bible-api.com " + r.status); return r.json(); })
      .then(function (j) { return (j.text || "").replace(/\s+/g, " ").trim(); });
  }

  function fetchESV(ref) {
    var key = (window.BIBLE_API_CONFIG || {}).esvApiKey;
    if (!key) return Promise.reject(new Error("ESV: no API key configured"));
    var url = "https://api.esv.org/v3/passage/text/?q=" + encodeURIComponent(ref) +
      "&include-headings=false&include-footnotes=false&include-verse-numbers=false" +
      "&include-short-copyright=false&include-passage-references=false";
    return fetch(url, { headers: { "Authorization": "Token " + key } })
      .then(function (r) { if (!r.ok) throw new Error("api.esv.org " + r.status); return r.json(); })
      .then(function (j) { return ((j.passages && j.passages[0]) || "").trim(); });
  }

  function fetchApiBible(ref, versionId) {
    var cfg = window.BIBLE_API_CONFIG || {};
    var key = cfg.apiBibleKey;
    var bibleId = (cfg.apiBibleIds || {})[versionId];
    if (!key) return Promise.reject(new Error(versionId.toUpperCase() + ": no api.bible key configured"));
    if (!bibleId) return Promise.reject(new Error(versionId.toUpperCase() + ": no Bible ID configured"));
    var passageId = refToPassageId(ref);
    if (!passageId) return Promise.reject(new Error("couldn't parse reference: " + ref));
    var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/passages/" + passageId +
      "?content-type=text&include-notes=false&include-titles=false" +
      "&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false";
    return fetch(url, { headers: { "api-key": key } })
      .then(function (r) { if (!r.ok) throw new Error("api.bible " + r.status); return r.json(); })
      .then(function (j) { return ((j.data && j.data.content) || "").replace(/\s+/g, " ").trim(); });
  }

  /* ---------- caching + resolution ---------- */
  var memCache = {}; // "versionId|ref" -> Promise<{text, fallback}>

  function cacheKey(versionId, ref) { return versionId + "|" + ref; }
  function readLocalCache(versionId, ref) {
    try { return localStorage.getItem("verse-cache:" + cacheKey(versionId, ref)); } catch (e) { return null; }
  }
  function writeLocalCache(versionId, ref, text) {
    try { localStorage.setItem("verse-cache:" + cacheKey(versionId, ref), text); } catch (e) { /* fine */ }
  }

  function resolveVerseText(ref, versionId, webText) {
    if (!versionId || versionId === "web") return Promise.resolve({ text: webText, fallback: false });

    var key = cacheKey(versionId, ref);
    if (memCache[key]) return memCache[key];

    var cached = readLocalCache(versionId, ref);
    if (cached) {
      memCache[key] = Promise.resolve({ text: cached, fallback: false });
      return memCache[key];
    }

    var p;
    if (versionId === "kjv") p = fetchKJV(ref);
    else if (versionId === "esv") p = fetchESV(ref);
    else if (versionId === "nkjv" || versionId === "nasb" || versionId === "niv" || versionId === "csb") {
      p = fetchApiBible(ref, versionId);
    } else {
      p = Promise.reject(new Error("unknown version: " + versionId));
    }

    var wrapped = p.then(function (text) {
      if (!text) throw new Error("empty response");
      writeLocalCache(versionId, ref, text);
      return { text: text, fallback: false };
    }).catch(function (err) {
      if (window.console && console.warn) console.warn("[VerseVersions]", ref, err && err.message);
      return { text: webText, fallback: true };
    });

    memCache[key] = wrapped;
    return wrapped;
  }

  /* ---------- wiring a rendered panel ---------- */
  function labelFor(versionId) { return (BY_ID[versionId] || {}).label || versionId; }

  function showBanner(versionId, anyFallback) {
    var banner = document.getElementById("version-banner");
    if (!banner) return;
    if (versionId === "web" || !anyFallback) {
      banner.hidden = true;
      banner.textContent = "";
      return;
    }
    banner.hidden = false;
    banner.textContent = labelFor(versionId) + " isn't available for one or more verses on this page " +
      "(no API key configured yet, or the request failed) — showing WEB text instead. " +
      "See README.md to set it up.";
  }

  function applyTo(panelEl) {
    if (!panelEl) return;
    var versionId = getCurrent();
    var verses = panelEl.querySelectorAll(".verse[data-ref]");
    if (!verses.length) return;

    var anyFallback = false;
    var pending = [];

    verses.forEach(function (el) {
      var ref = el.getAttribute("data-ref");
      var webText = el.getAttribute("data-web-text") || "";
      var vtext = el.querySelector(".vtext");
      if (!ref || !vtext) return;

      if (versionId !== "web") {
        vtext.classList.add("vtext-loading");
        vtext.textContent = "Loading " + labelFor(versionId) + "…";
      }

      pending.push(resolveVerseText(ref, versionId, webText).then(function (res) {
        vtext.classList.remove("vtext-loading");
        vtext.textContent = res.text;
        el.setAttribute("data-va", speakableRef(ref) + ". " + res.text);
        if (res.fallback) anyFallback = true;
      }));
    });

    Promise.all(pending).then(function () {
      showBanner(versionId, anyFallback);
      if (window.Voiceover) window.Voiceover.mount(panelEl);
    });
  }

  /* ---------- global dropdown (present on every page's sitebar) ---------- */
  function mountSelect() {
    var sel = document.getElementById("version-select");
    if (!sel) return;
    LIST.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v.id;
      opt.textContent = v.label;
      sel.appendChild(opt);
    });
    sel.value = getCurrent();
    sel.addEventListener("change", function () {
      setCurrent(sel.value);
      var panel = document.getElementById("panel");
      if (panel) applyTo(panel);
    });
  }
  mountSelect();

  return {
    list: LIST,
    getCurrent: getCurrent,
    setCurrent: setCurrent,
    speakableRef: speakableRef,
    applyTo: applyTo
  };
})();
