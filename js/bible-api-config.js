/* Bible-version API credentials — EDIT THIS FILE, not js/verse-versions.js.

   WEB and KJV need nothing: WEB is bundled locally (js/data.js / js/faith-data.js)
   and KJV is fetched from the free public-domain bible-api.com — both work out
   of the box.

   The other five (NKJV, ESV, NASB, NIV, CSB) are commercially licensed
   translations. Their publishers allow free quotation up to a generous verse
   count, but only through their own official APIs — this site does not (and
   should not) ship their text directly. To turn one on, get a free key and
   paste it in below.

   IMPORTANT: this is a static site with no server, so any key placed here is
   visible to every visitor (view source / the Network tab) and can be copied
   and reused elsewhere. That's fine for a low-traffic personal/ministry site
   using a free-tier key with modest rate limits — it is NOT a place to put a
   key you need to keep secret or that's tied to a paid plan. If that matters
   to you, the key needs to live behind a small server-side proxy instead (a
   Cloudflare Worker / Netlify function that holds the key and forwards the
   request) rather than here.

   ── ESV ──────────────────────────────────────────────────────────────────
   1. Create a free account + API key: https://api.esv.org/account/create/
   2. Paste the key below.

   ── NKJV / NASB / CSB / NIV (via api.bible) ─────────────────────────────
   1. Create a free account + API key: https://scripture.api.bible/
   2. Not every translation is available on every plan — check your
      dashboard's Bible catalog for which of these four you actually have
      access to before expecting them to work.
   3. Each translation also needs its own "Bible ID" (a long hex string, NOT
      the same as its abbreviation). Look yours up with:
        GET https://api.scripture.api.bible/v1/bibles?abbreviation=NIV
      (swap NIV for NASB / CSB / NKJV), using header `api-key: YOUR_KEY`.
      The ids below are commonly published examples for NIV/NASB/CSB — verify
      each one against your own account before relying on it; NKJV's is left
      blank because it isn't reliably documented anywhere I could confirm. */

window.BIBLE_API_CONFIG = {
  esvApiKey: "",       // https://api.esv.org/account/create/
  apiBibleKey: "",     // https://scripture.api.bible/

  apiBibleIds: {
    nkjv: "",                      // look this one up yourself — see note above
    niv:  "78a9f6124f344018-01",   // verify against your own account
    nasb: "a761ca71e0b3ddcf-01",   // verify against your own account
    csb:  "a556c5305ee15c3f-01"    // verify against your own account
  }
};
