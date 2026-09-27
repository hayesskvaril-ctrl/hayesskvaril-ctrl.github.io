"""Notable updates for the public "What's new" page (/whats-new/).

New pages are found automatically from git history, so only list UPDATES here:
substantive changes to existing pages, and site-wide changes (url = "").
Newest first is not required; the page sorts by date.
Run:  python3 _scripts/build_changelog.py && python3 _scripts/sync_layout.py
"""

# (ISO date, root-relative URL or "", what changed)
UPDATES = [
    ("2026-09-27", "", "New look: the whole site moved to a dark, futuristic design, with fonts hosted on the site itself so no third-party requests are made."),
    ("2026-09-27", "/governance/financial-accountability-regime.html", "Added the regulators' proposed simplifications to the Financial Accountability Regime."),
    ("2026-09-27", "/compliance/consumer-protection.html", "Updated the Scams Prevention Framework timetable."),
    ("2026-09-27", "/glossary/", "Added 34 terms, including ADI, responsible entity, CET1, hawking, significant dealing and SMSF, and linked them from the pages that use them."),
    ("2026-09-27", "", "Added link previews for sharing, a browser-tab icon, a sitemap and a friendly page-not-found page, and made the faintest text easier to read."),
    ("2026-09-27", "", "Yearly review system: every page now shows when its next review is due, and pages checked by the site's subject-matter expert will carry an \"Expert reviewed\" badge."),
]
