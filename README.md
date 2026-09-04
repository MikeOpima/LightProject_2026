# Search the Scriptures

A static reference site in three parts:

- **Home** (`index.html`) — a search-first landing page. Type a word, a question,
  or a reference and it looks across the whole site.
- **Six Ways to Tell It** (`gospel.html`) — six gospel presentation frameworks:
  the Romans Road, the Four Spiritual Laws, the Bridge to Life, 3 Circles, the
  Wordless Book, and GotQuestions' Plan of Salvation. Each shows its steps in
  order, what to say at each one, drawing instructions where the framework is
  meant to be sketched, and the full text of every verse it uses, plus a
  cross-reference table of which passages the frameworks share.
- **Questions About Faith** (`questions/*.html`) — six categories, twenty-nine
  questions believers and skeptics both ask (doubt, suffering, the Bible,
  judgment, other religions, living it out), each with a plain answer and its
  supporting verses.

## Running it

No build step, no dependencies. Open `index.html` in a browser.

If you want it served over HTTP (fonts and relative paths behave the same either
way, but some browsers are stricter about `file://`):

    python -m http.server 8000

then visit <http://localhost:8000>.

## Files

    index.html          home page: hero art, site-wide search, FAQ rail, start cards
    gospel.html          the six gospel frameworks (rail + panel + cross-reference table)
    questions/
      doubt.html          )
      suffering.html       )  one page per FAQ category — thin shells that render
      bible.html            )  via js/faq-app.js; the rail on each links to the rest
      judgment.html        )
      religions.html       )
      living.html         )
    css/style.css        design tokens, layout, light and dark themes, all page types
    js/theme.js           colour-theme toggle, shared by every page
    js/voiceover.js        "Listen" read-aloud control, shared by gospel.html + questions/*.html
    js/bible-api-config.js  YOUR API keys for the paid translations — edit this one
    js/verse-versions.js    the version dropdown + live verse fetching, shared by every page
    js/data.js             gospel content: verse text, gists, the six frameworks
    js/app.js               gospel page: rail, panel, practice mode, in-page search
    js/faith-data.js        FAQ content: verse text, gists, the six categories
    js/faq-app.js            FAQ page: renders one category + the cross-page rail
    js/home.js               home page: site-wide search across data.js + faith-data.js

## Editing the content

**Gospel frameworks** live in `js/data.js` — see `VERSES`, `GIST`, `METHODS`.
Keys in `VERSES` must match the reference strings used in `refs` exactly (note
the en dashes in ranges: `Ephesians 2:8–9`, not `2:8-9`).

Append an object to `METHODS` to add a framework:

```js
{
  id:     "unique-slug",        // also used as the URL hash on gospel.html
  name:   "Rail label",
  sub:    "5 stops · drawn",    // small caps line under the rail label
  kicker: "Framework 07 · Origin",
  title:  "Heading",
  lede:   "One paragraph of introduction.",
  facts:  [["Shape","…"], ["Opens with","…"], ["Best for","…"], ["Needs","…"]],
  steps:  [
    { h: "Step heading",
      draw: "Optional — drawing instruction, shown in gold",
      say: "What you actually say here.",
      refs: ["Romans 3:23"] }
  ]
}
```

**FAQ categories** live in `js/faith-data.js` — same shape (`VERSES`, `GIST`,
`CATEGORIES`), but each `steps[]` entry has no `draw` field and its `h` is a
literal question. To add a **new category**, append to `CATEGORIES` and then
add one HTML file in `questions/` (copy an existing one — only the `<title>`,
the two `og:*` meta tags, and `data-category="…"` on `<body>` need to change;
everything else, including the rail, renders itself).

Any reference used in `refs` needs a matching entry in that file's `VERSES`,
and ideally one in `GIST` so it reads well in search snippets / the
cross-reference table.

Whichever file you edit, don't touch `index.html`'s FAQ rail links or the
`start-cards` by hand if you rename a category `id` — update them to match.

## Bible versions

Every verse on the site can be shown in **WEB, KJV, NKJV, ESV, NASB, NIV, or CSB**,
picked from the dropdown in the top bar (persists across pages via
`localStorage`). Two work immediately; five need a one-time setup step because
they're commercially licensed translations this site can't ship text for
directly — it fetches it live, on demand, from each publisher's own API.

**Work out of the box:**
- **WEB** — bundled locally in `data.js`/`faith-data.js`, public domain.
- **KJV** — fetched from the free [bible-api.com](https://bible-api.com), public domain.

**Need a free API key** (edit `js/bible-api-config.js` — every step is
documented in comments at the top of that file):
- **ESV** — key from [api.esv.org](https://api.esv.org/account/create/).
- **NKJV, NASB, NIV, CSB** — one shared key from
  [scripture.api.bible](https://scripture.api.bible/), plus each translation's
  own "Bible ID" looked up from your account (the file has the lookup command).
  Not every plan includes every translation — check your dashboard.

Until a version's key is filled in (or its fetch fails for any reason — offline,
rate-limited, an unrecognized reference), every verse using it quietly falls
back to WEB and a small banner above the article says so. Nothing breaks either
way.

**Two things worth knowing before you rely on this in front of people:**
1. **API keys pasted into `bible-api-config.js` are public.** This is a
   client-side static site with no server to hide them behind, so anyone can
   read a key out of the page source or the Network tab. Fine for a free-tier
   key on a small site; if that ever matters more, the fix is routing these
   fetches through a small server-side proxy (a Cloudflare Worker / Netlify
   function) instead of calling the APIs directly from the browser — ask if
   you want that built.
2. **CORS is unverified.** I couldn't confirm from documentation alone whether
   `api.esv.org` and `api.scripture.api.bible` allow direct browser requests
   from an arbitrary origin (some APIs expect server-side calls only). If a
   version silently falls back to WEB even with a correct key filled in, open
   the browser console — a CORS error there means that API needs the proxy
   approach above rather than a client-side fix.
3. Each licensed translation's required copyright notice is already in the
   footer of `gospel.html` and every `questions/*.html` page. Worth a quick
   check against each publisher's current permissions page before this goes
   fully public, since exact required wording can change.

## Notes

- Gospel-page verse text is the **World English Bible**, pulled per-verse from
  bible-api.com. FAQ-page verse text is also WEB, but typed from memory rather
  than pulled from the API — worth spot-checking against a real Bible before
  treating it as citation-accurate.
- Fonts (Newsreader, IBM Plex Sans, IBM Plex Mono) load from Google Fonts. If you
  need the site to work offline, download them and swap the `<link>` on each
  page for local `@font-face` rules.
- Light and dark themes both ship on every page. The page follows the OS setting
  by default; the toggle in the top right overrides it and remembers the choice
  in `localStorage` (shared across the whole site — `js/theme.js`).
- `gospel.html` has practice mode (hides wording/verses until revealed) and its
  own in-page search. FAQ pages show answers directly and have no practice mode.
- Every framework/category has a **Listen** button (`js/voiceover.js`, using the
  browser's built-in `speechSynthesis` — no external service or API key). It
  reads the title, lede, and each step's heading, drawing instruction (if any),
  answer, and verse text in order, highlighting whichever piece is currently
  being read and auto-scrolling to it. Play/Pause/Stop only; voice and rate use
  sensible fixed defaults, so quality depends on what voices the visitor's
  browser/OS ships with. The control hides itself if the browser has no speech
  synthesis support.
- Deep links work everywhere:
  - `gospel.html#bridge` opens straight to the Bridge to Life.
  - `gospel.html#bridge:1` also scrolls to and flashes its second step (0-based).
  - `questions/judgment.html#q4` scrolls to and flashes that category's 4th
    question (1-based). This is the format the home page's search links to.
- The hero art on `index.html` (Calvary, and an open wounded hand) is original
  inline SVG using the site's existing colour tokens — no external images.
- `questionsaboutfaith.zip` at the project root is a superseded single-page
  draft of the FAQ content; safe to delete now that it's split into
  `questions/*.html`.

## Sources

- GotQuestions.org — [gospel presentations index](https://www.gotquestions.org/Gospel-presentations.html),
  [the Romans Road](https://www.gotquestions.org/Romans-road-salvation.html),
  [the sinner's prayer](https://www.gotquestions.org/sinners-prayer.html),
  [the plan of salvation](https://www.gotquestions.org/plan-of-salvation.html)
- The Navigators — [The Bridge to Life](https://www.navigators.org/resource/the-bridge-to-life/)
- Compelling Truth — [the four spiritual laws](https://www.compellingtruth.org/four-spiritual-laws.html)
  (originally Bill Bright, Cru, 1952)
- [3 Circles: Life Conversation Guide](https://multiplyingdisciples.us/the-three-circles-gospel-presentation-step-by-step/)
- Child Evangelism Fellowship — [The Wordless Book](https://www.cefonline.com/articles/the-wordless-book-discover-its-rich-heritage/)
- Gospel-page verse text: World English Bible via [bible-api.com](https://bible-api.com)
- Questions About Faith content (categories, answers, verse selection) was
  composed for this site rather than drawn from a single source.
