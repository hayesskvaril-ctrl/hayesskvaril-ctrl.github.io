# RiskLens Australia — Project Brief for Claude

Read this first, every session. It is the source of truth for what this site is, who it's for, and how to work on it. The build checklist lives in `ROADMAP.md`. Work through it in order and tick items off as you finish them.

---

## 1. What this site is

**RiskLens Australia** is a free public library about Australian **risk management, compliance and governance**.

- **Free information for everyone.** No login, no paywall, no sign-up walls. It is an educational resource, not a tool or software product for organisations.
- **Goal: the one-stop shop.** Cover every part of risk, compliance and governance. Start with the basics a newcomer needs and build up to advanced, university-level depth in places.
- **Australian focus.** Use Australian regulators (APRA, ASIC, AUSTRAC, OAIC, ACCC), Australian legislation and prudential standards, and Australian spelling (organisation, licence (noun) / license (verb), behaviour, programme only in proper names).
- **Rich and visual.** Use lots of diagrams and models, and add interactive training, working charts and heat maps where they help people learn.
- **Evidence-based.** Articles should draw on primary sources (legislation, regulator guidance) and peer-reviewed research where relevant, with the sources listed on the page.

## 2. The owner

The owner is **Nick**, a risk and compliance professional in the Australian superannuation industry. He is an expert in the *subject matter* but has **zero web development, GitHub or hosting experience.**

- When you explain anything technical, use plain beginner language and define any jargon. Never assume he knows what a branch, commit, build or deploy is.
- You handle all the git work yourself (commit and push). Don't ask him to run commands.
- Keep progress summaries short and focused on outcomes, e.g. "Added the Glossary page, live at …". Don't write long technical write-ups.
- His subject expertise is especially strong in: incident management, breach assessment, disclosure reviews, remediation, CPS 230, APRA risk uplift, risk assessment, control testing/design, fee governance and third-party/outsourcing risk. When content in these areas is ready, flag it for his review. He's the best reviewer for it.

## 3. Hard constraints

- **$0 budget.** No paid services, hosting, plugins, fonts or APIs. Free tiers only, and only if they need no payment details.
- **Hosting: GitHub Pages.** Repo `hayesskvaril-ctrl/hayesskvaril-ctrl.github.io`, branch `main`. Anything pushed to `main` goes live at **https://hayesskvaril-ctrl.github.io** within a minute or two.
- **Static site only.** Plain HTML, CSS and JavaScript. No build step, no frameworks that need compiling, no server, no database. Free libraries loaded from a CDN (e.g. cdnjs, jsDelivr) are fine for charts and diagrams.
- **Later, not now:** a custom domain, Google Ads and branding may come later. Don't add ad slots or tracking yet, but keep layouts flexible enough that they could be added.
- **Copyright:** The Governance Institute of Australia's course categories are used as *inspiration for the topic structure of training only*. Never copy or closely paraphrase their content, or any other paid course, textbook or standard. ISO standards are copyrighted: explain them in your own words and don't reproduce their text. Summarise legislation and regulator guidance in plain English and link to the official source.

## 4. Content standards (every article page)

Each content page should have:

1. **Title and one-line summary.**
2. **Level tag:** `Beginner`, `Intermediate` or `Advanced`. One page can have sections at different levels, but tag the page by its entry level.
3. **Plain-English explanation first**, then the detail. Define terms the first time they're used and link them to the Glossary.
4. **At least one diagram, model, table or worked example** where it helps. Build diagrams as inline SVG or HTML/CSS so they stay sharp and editable.
5. **"Key takeaways"** box near the top or bottom.
6. **"Related topics"** links to other pages on the site.
7. **Sources** section: legislation, regulator documents (APRA prudential standards and guides, ASIC Regulatory Guides, etc.) and peer-reviewed research where used, linked to the official or original source.
8. **"Last reviewed"** date.
9. The standard **footer disclaimer** (see §5).

Accuracy rules:

- Regulatory detail changes. **Before writing about any specific standard, law, threshold, deadline or commencement date, check the current position on the official source** (apra.gov.au, asic.gov.au, legislation.gov.au, etc.). Don't rely on memory, and cite what you checked.
- If something is uncertain or contested, say so on the page. Don't present it as settled.
- Never invent citations, case names, statistics or research papers. If you can't find a real source, leave the claim out.
- This is general education, never advice. Don't tell readers what *they* should do in their specific situation.

## 5. Site structure and technical conventions

**Folder layout** (grow into this; create folders as sections are built):

```
/index.html                  Home page
/styles.css                  One shared stylesheet for the whole site
/scripts/                    Shared JavaScript (nav, interactive widgets)
/glossary/index.html         Glossary
/foundations/                Entry-level primers
/risk-management/            Pillar: landing page index.html + one file per topic
/compliance/                 Pillar
/governance/                 Pillar
/standards/                  Regulatory & standards library (e.g. cps-230.html)
/sectors/                    Sector deep-dives (superannuation, banking, insurance, MIS)
/learn/                      Interactive learning (quizzes, scenarios, flashcards, pathways)
/tools/                      Templates and interactive tools (heat maps, risk scoring)
/news/                       News & regulatory updates
/assets/                     Images, downloadable templates (PDF/XLSX/DOCX)
```

**Conventions:**

- Use one shared `styles.css` and don't put large `<style>` blocks in pages. Move the current inline styles on `index.html` into it when the structure is built.
- Every page gets the **same header, navigation and footer**. Nav should only link to pages that exist. Add sections to the nav as they go live, and never leave dead links or `href="#"`.
- **Shared header/nav/footer:** every page has `<!-- HEADER:START/END -->` and `<!-- FOOTER:START/END -->` markers. After adding or changing pages, run `python3 _scripts/sync_layout.py` (stamps the identical header/footer on every page; nav only lists sections whose landing page exists) and `python3 _scripts/check_links.py` (finds broken links, missing titles/descriptions). `_scripts/` is not published. Use `_scripts/page-template.html` as the starting point for new article pages.
- **Generated content (edit the source, then rebuild):** glossary → `_scripts/build_glossary.py` (also writes flashcard data); news listing, RSS feed and home-page news strip → `_scripts/build_news.py` (new articles start from `_scripts/news-template.html`); regulatory tracker → `_scripts/tracker_data.py` + `build_tracker.py`; learning pathways → `_scripts/build_pathways.py`; templates and checklists → `_scripts/templates/` (see its README). Run `sync_layout.py` and `check_links.py` afterwards.
- Use **root-relative links** (`/risk-management/`) so links work from any folder.
- Pages must work on phones (responsive layout, no sideways scrolling), have readable contrast and meet basic accessibility: alt text on images, proper heading order, and labels on form inputs.
- Each page needs `<title>` and `<meta name="description">`.
- Lowercase, hyphenated file names: `risk-appetite-and-tolerance.html`.
- Keep the look consistent: the current navy/blue palette and clean card layout are the starting design. Refine it if you like, but apply any change site-wide.

**Standard footer disclaimer** (on every page):

> RiskLens Australia provides general educational information only. It is not legal, financial or compliance advice and does not take into account your circumstances. Always refer to the official legislation and regulator guidance, and seek professional advice where appropriate.

## 6. How to work

1. At the start of a session, read `ROADMAP.md` and pick up the **next unticked item** (unless Nick asks for something specific).
2. Build in small, complete chunks. Each commit should leave the site working, with no half-finished pages linked from the nav.
3. Commit directly to `main` with a clear message (e.g. `Add Risk Appetite & Tolerance page`), then push.
4. After pushing, check the live page loads and looks right.
5. Tick the item off in `ROADMAP.md` (and add any new ideas under "Ideas / backlog") in the same or next commit.
6. Tell Nick in 1–3 plain sentences what's now live, with the link, and anything he should review.
