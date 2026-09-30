"""Notable updates for the public "What's new" page (/whats-new/).

New pages are found automatically from git history, so only list UPDATES here:
substantive changes to existing pages, and site-wide changes (url = "").
Newest first is not required; the page sorts by date.
Run:  python3 _scripts/build_changelog.py && python3 _scripts/sync_layout.py
"""

# (ISO date, root-relative URL or "", what changed)
UPDATES = [
    ("2026-09-30", "", "All 25 Advanced pages upgraded to university level: learning outcomes, a Theory and research section grounded in peer-reviewed studies, critical perspectives, seminar questions, further reading and APA references."),
    ("2026-09-30", "/learn/research-library.html", "New Research library: over 100 checked research sources behind the Advanced pages, grouped by topic with plain-English summaries."),
    ("2026-09-30", "/learn/videos.html", "New Videos page: 14 short explainer videos with captions and full transcripts, from the risk management loop and the Three Lines model to misleading conduct, root causes, unit pricing errors and the denominator effect, plus official videos from AUSTRAC and the ACNC."),
    ("2026-09-30", "", "Explainer videos added to 33 topic pages, next to the detail they explain. Each video can be downloaded for training, and official regulator videos only load from YouTube when you press play."),
    ("2026-09-28", "/learn/by-level.html", "New Browse by level page, with a clear definition of Beginner, Intermediate and Advanced, and every page grouped by level."),
    ("2026-09-28", "", "A new Advanced track: 17 new Advanced pages and case studies, from the legal tests for misleading conduct and directors' duties cases to APS 115 capital, KRI thresholds, root cause analysis, unit pricing and fund mergers, most with interactive calculators or simulators."),
    ("2026-09-28", "/learn/quizzes.html", "New Advanced topics quiz, two multi-regime Advanced scenarios, seven new glossary terms and 13 new Advanced flashcards."),
    ("2026-09-28", "/learn/pathways.html", "Added Advanced stages for the new pages to every learning pathway, and 'Going deeper' links from 19 Intermediate pages."),
    ("2026-09-28", "/compliance/breach-reporting.html", "Corrected the super trustee breach reporting timeframe (SIS Act s 29JA) to \"as soon as practicable, and within 30 days\" across the site and the incident report template."),
    ("2026-09-28", "", "Site-wide review: accessibility fixes (heading order and table headers), updated section descriptions, and consistency checks of regulatory deadlines across pages."),
    ("2026-09-28", "/learn/pathways.html", "Refreshed the learning pathways with the new standards, templates, case studies and scenarios, and added a pathway for banking, insurance and other sectors."),
    ("2026-09-28", "/learn/flashcards.html", "Three new flashcard decks: newer glossary terms, advanced concepts, and key dates for new and changing regimes. The standards deck now covers 32 standards and guides."),
    ("2026-09-28", "/learn/quizzes.html", "Added 55 quiz questions covering every page added since the last quiz update, plus a new News and current affairs quiz."),
    ("2026-09-28", "/learn/scenarios.html", "Six new scenario simulations: a privacy data breach, a marketing campaign review, a related-party conflict, a CPS 230 tolerance breach, an AML suspicion and an advice file review."),
    ("2026-09-28", "/tools/", "Added eight free templates: obligations register, control testing workpaper, RCSA, KRI library, example risk appetite statement, board risk report, material service provider register and remediation program tracker."),
    ("2026-09-28", "/sectors/", "Added six sector pages: credit and non-bank lenders, financial advice licensees, payments and fintech, listed companies, the Commonwealth public sector, and not-for-profits and charities."),
    ("2026-09-28", "/case-studies/", "New Case studies section: the Hayne Royal Commission, APRA's inquiry into CBA, AUSTRAC v CBA and Westpac, Optus and Medibank, HIH Insurance, and Shield and First Guardian, each with a timeline, lessons and a quiz."),
    ("2026-09-27", "/standards/", "Added 15 new explainers, including CPS 511, SPS 515, SPS 530, CPS 190 and CPS 900, RG 181, RG 270, ISO 22301, ISO 37301, ISO/IEC 42001 and the Essential Eight."),
    ("2026-09-27", "/learn/pathways.html", "Added the new risk, governance, cyber and standards pages to the learning pathways."),
    ("2026-09-27", "/governance/ai-governance.html", "Added APRA's April 2026 letter to industry on AI risk management."),
    ("2026-09-27", "/news/regulatory-tracker.html", "Added mandatory climate reporting, further financial advice reforms, the proposed modern slavery offence and the foreign bribery failure to prevent offence."),
    ("2026-09-27", "/learn/pathways.html", "Added an Advanced stage to the risk, compliance, governance and superannuation pathways."),
    ("2026-09-27", "/start-here/", "Added a \"Go deeper\" route through the seven new Advanced topics."),
    ("2026-09-27", "/glossary/", "Added VaR, expected shortfall, reverse stress testing, ICAAP, diversification benefit and tolerable deviation rate."),
    ("2026-09-27", "", "New look: the whole site moved to a dark, futuristic design, with fonts hosted on the site itself so no third-party requests are made."),
    ("2026-09-27", "/governance/financial-accountability-regime.html", "Added the regulators' proposed simplifications to the Financial Accountability Regime."),
    ("2026-09-27", "/compliance/consumer-protection.html", "Updated the Scams Prevention Framework timetable."),
    ("2026-09-27", "/glossary/", "Added 34 terms, including ADI, responsible entity, CET1, hawking, significant dealing and SMSF, and linked them from the pages that use them."),
    ("2026-09-27", "", "Added link previews for sharing, a browser-tab icon, a sitemap and a friendly page-not-found page, and made the faintest text easier to read."),
    ("2026-09-27", "", "Yearly review system: every page now shows when its next review is due, and pages checked by the site's subject-matter expert will carry an \"Expert reviewed\" badge."),
]
