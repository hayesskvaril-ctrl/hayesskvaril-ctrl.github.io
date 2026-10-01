"""Notable updates for the public "What's new" page (/whats-new/).

New pages are found automatically from git history, so only list UPDATES here:
substantive changes to existing pages, and site-wide changes (url = "").
Newest first is not required; the page sorts by date.
Run:  python3 _scripts/build_changelog.py && python3 _scripts/sync_layout.py
"""

# (ISO date, root-relative URL or "", what changed)
UPDATES = [
    ("2026-10-01", "/governance/board-briefings.html", "New board briefings: printable two-page briefings for directors on CPS 230, FAR, breach reporting, CPS 234 and AML/CTF, with questions to ask management."),
    ("2026-10-01", "/about/roadmap.html", "New site roadmap: see what we are improving, stage by stage. Also a simpler menu, a new Topics page and a new home page."),
    ("2026-10-01", "/learn/my-learning.html", "Learning pathways now work like courses: a Mark as read button and step-by-step next links on every page in a pathway, and a new My learning page with your progress and a printable record of learning."),
    ("2026-10-01", "/obligations/", "New Obligations library: 117 plain-English obligation summaries from 37 Australian regimes, with control objectives, evidence, related risks and notification deadlines. Search, filter by organisation type and download as Excel or CSV."),
    ("2026-10-01", "/playbooks/", "New Playbooks section: step-by-step guides for responding to an incident, assessing a breach, running a remediation, onboarding a material service provider, reviewing disclosure, testing a control and your first 90 days, each with a tickable checklist."),
    ("2026-10-01", "/about/editorial-standards.html", "Every content page now shows its review status (Checked against sources, or Expert reviewed) and has a Suggest a correction link. New page explaining how we check content."),
    ("2026-10-01", "/grc/model-builder.html", "GRC model builder rebuilt: a five-step wizard (or six ready-made examples) that produces a fully linked model: obligations from 37 regimes tied to risks, controls and KRIs, notification clocks, committees and roles, the data model, a maturity radar and roadmap, consistency checks, and an Excel workbook with about 20 sheets."),
    ("2026-10-01", "/grc/", "New GRC systems section: how complex organisations design and establish an integrated governance, risk and compliance system, the risk hierarchy from enterprise to Level 3, obligations and control architecture, an interactive map of how everything links, the operating model, technology, and a GRC model builder tool."),
    ("2026-10-01", "", "New artwork and a better desktop layout: all 27 graphics redone as abstract studio pieces in glass, aluminium and ceramic; wider pages on large screens, larger text, diagrams and tables that step out of the text column, and an \"On this page\" sidebar on wide screens."),
    ("2026-10-01", "", "Design polish: 11 new 3D graphics on 23 key topic pages (from CPS 230 to privacy and super), smooth fade-in as you scroll, an \"On this page\" bar on longer articles, and a \"by the numbers\" section on the home page."),
    ("2026-10-01", "/news/regulatory-tracker.html", "RBA card surcharging and interchange changes moved to In force (from 1 October 2026)."),
    ("2026-09-30", "", "New look for the whole site: a clean, light design with large tiles, our own high-definition 3D graphics for every section, a new icon, and all 14 explainer videos re-made to match."),
    ("2026-09-30", "/learn/advanced-study-program.html", "New Advanced study program: a free 12-module, university-style course built from the Advanced pages, with learning outcomes, required peer-reviewed readings, seminar questions and essay questions."),
    ("2026-09-30", "", "14 new university-level pages on the research behind risk, compliance and governance: theories of risk and regulation, governance theories, whether ERM works, the three lines, internal audit, misconduct, pay and risk-taking, whistleblowing, fraud theory, super behaviour, and the economics of cyber, climate and AML/CTF."),
    ("2026-09-30", "/learn/quizzes.html", "New University-level research quiz, a Research flashcard deck, 12 new glossary terms, and the new pages added to the learning pathways."),
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
