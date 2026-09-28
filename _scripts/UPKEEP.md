# Upkeep checklist

How to keep RiskLens Australia accurate and current once it's built. Start every upkeep session with:

```
python3 _scripts/run_checks.py
```

It runs every automated check (links, yearly review dates, dates that have passed, tracker items past their dates, news freshness and learning-content links) and ends with a numbered **TO DO** list. Add a date to see what will be due later, e.g. `python3 _scripts/run_checks.py 2027-03-01`.

After changing any page, always finish with:

```
python3 _scripts/sync_layout.py && python3 _scripts/check_links.py
```

Then commit, push to `main`, and check the live page.

---

## Monthly

- [ ] Run `run_checks.py` and work through its TO DO list.
- [ ] Scan official sources for material developments (APRA, ASIC, AUSTRAC, OAIC, ACCC, Treasury, legislation.gov.au, RBA, ASX). Check each regulator's media releases, consultations and "what's new" pages.
- [ ] If there is something material: write a news item or roundup from `_scripts/news-template.html`, then run `python3 _scripts/build_news.py`.
- [ ] Move tracker items whose start dates have passed to "In force" (`_scripts/tracker_data.py`, then `python3 _scripts/build_tracker.py`).
- [ ] Update every page affected by a change the same week (see "When regulations change" below).

## Quarterly

- [ ] Full tracker refresh: re-check every entry against its official source, update statuses and dates, and set `AS_AT` to the date checked. Rebuild with `build_tracker.py`. `run_checks.py` flags this when `AS_AT` is more than 3 months old.
- [ ] Publish a quarterly roundup news article.
- [ ] Run `python3 _scripts/review_report.py` and plan reviews for pages due in the next quarter.
- [ ] Check the "watch" items in the ROADMAP backlog (court outcomes, consultations awaiting final decisions).
- [ ] Check the "No fixed next date" tracker items listed by `run_checks.py`.
- [ ] Add a news quiz question or flashcard for any major new development (`scripts/quiz-bank.js`, `scripts/flashcards-data.js`).

## Yearly (for each page, within 12 months of its "Last reviewed" date)

- [ ] Re-verify every regulatory fact (standards, sections, thresholds, deadlines, commencement dates) against the official source. Never rely on memory.
- [ ] Check every source link still works and points to the current version.
- [ ] Update wording that has become out of date ("proposed", "from next year", "upcoming").
- [ ] Update the "Last reviewed" date. `sync_layout.py` stamps the new "Next review due" date.
- [ ] Update related quiz questions, flashcards and scenarios so they match the page.
- [ ] Check downloadable templates that relate to the page (see `_scripts/templates/README.md`), rebuild them and recalculate them with LibreOffice.
- [ ] If Nick has signed off the page, add it to `_scripts/expert_reviews.py` with the date. Expert sign-offs older than 12 months are flagged by `review_report.py`.

## When regulations change

1. Use the site search (`/search/`) and `grep -rl "<term>" --include=*.html .` to find every page, template, quiz question and flashcard that mentions the changed rule.
2. Update them all in the same week. Check the glossary (`_scripts/build_glossary.py`) too.
3. Update the tracker entry.
4. Record the change in `_scripts/changelog_data.py` and run `python3 _scripts/build_changelog.py` so it appears on "What's new".
5. Flag changes in Nick's specialist areas for his review (see CLAUDE.md §2).

## Generated files: what to rebuild after editing

| You edited | Run |
|---|---|
| Glossary terms (`build_glossary.py`) | `python3 _scripts/build_glossary.py` (also rebuilds glossary flashcards) |
| A news article | `python3 _scripts/build_news.py` |
| Tracker (`tracker_data.py`) | `python3 _scripts/build_tracker.py` |
| Learning pathways | `python3 _scripts/build_pathways.py` |
| Start here routes | `python3 _scripts/build_start_here.py` |
| A page's level, or a new page | `python3 _scripts/build_levels.py` (Browse by level) |
| Resource library list, or a new tool or self-check | `python3 _scripts/build_resources.py` |
| What's new entries | `python3 _scripts/build_changelog.py` |
| A spreadsheet or Word template | see `_scripts/templates/README.md` |
| Anything | `python3 _scripts/sync_layout.py && python3 _scripts/check_links.py` |

## What the automated checks don't do

They can't tell whether a fact is still true. They only point to where to look: pages due for review, dates that have passed and tracker items that look stale. Checking the substance against official sources is always a manual step.
