# Six Ways to Tell It

A static reference site for six gospel presentation frameworks: the Romans Road,
the Four Spiritual Laws, the Bridge to Life, 3 Circles, the Wordless Book, and
GotQuestions' Plan of Salvation.

Each framework shows its steps in order, what to say at each one, drawing
instructions where the framework is meant to be sketched, and the full text of
every verse it uses. A cross-reference table at the bottom shows which passages
the frameworks share.

## Running it

No build step, no dependencies. Open `index.html` in a browser.

If you want it served over HTTP (fonts and relative paths behave the same either
way, but some browsers are stricter about `file://`):

    python -m http.server 8000

then visit <http://localhost:8000>.

## Files

    index.html        page structure and all prose copy
    css/style.css     design tokens, layout, light and dark themes
    js/data.js        all content: verse text, one-line gists, the six frameworks
    js/app.js         rendering, framework switching, practice mode, theme toggle

## Editing the content

Everything you'd normally want to change lives in `js/data.js`.

**Change a verse translation** — edit the string in `VERSES`. Keys must match the
reference strings used in `METHODS[].steps[].refs` exactly (note the en dashes in
ranges: `Ephesians 2:8–9`, not `2:8-9`).

**Add a framework** — append an object to `METHODS`:

```js
{
  id:     "unique-slug",        // also used as the URL hash
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

Any reference you use in `refs` needs a matching entry in `VERSES`, and ideally
one in `GIST` so it reads well in the cross-reference table. Add nothing else —
the rail, the panel and the table all rebuild themselves from this array.

## Notes

- Scripture is the **World English Bible**, which is in the public domain, so the
  site can be published without permissions. Verse text was pulled per-verse from
  bible-api.com rather than typed from memory.
- Fonts (Newsreader, IBM Plex Sans, IBM Plex Mono) load from Google Fonts. If you
  need the site to work offline, download them and swap the `<link>` in
  `index.html` for local `@font-face` rules.
- Light and dark themes both ship. The page follows the OS setting by default; the
  toggle in the top right overrides it and remembers the choice in localStorage.
- Practice mode hides the wording and verse text so you can recall each step, then
  reveal it one step at a time.
- Deep links work: `index.html#bridge` opens straight to the Bridge to Life.

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
- Verse text: World English Bible via [bible-api.com](https://bible-api.com)
