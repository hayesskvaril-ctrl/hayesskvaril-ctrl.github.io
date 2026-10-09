"""Public site roadmap (/about/roadmap.html): the stages of the current site upgrade, for readers.

Update the status of each stage as work progresses ("done", "now", "next" or "later"), then run:
  python3 _scripts/build_site_roadmap.py && python3 _scripts/sync_layout.py
Keep in step with ROADMAP.md (the internal build checklist). Use plain English: this page is for readers.
"""

PROGRAM = "Site upgrade, October 2026"
INTRO = ("An outside review of the site found it broad and polished, but harder than it should be to find "
         "your way around, too anonymous to fully trust, and organised like a textbook rather than around "
         "the work people actually do. This upgrade fixes that, in stages. Each stage goes live as soon as it is ready.")

# (status, title, what it means for readers, link or "", date finished or "")
STAGES = [
    ("done", "Trust: review labels and corrections",
     "Every article now shows whether it has been checked against its sources or expert reviewed, and every page has a link to suggest a correction.",
     "/about/editorial-standards.html", "1 October 2026"),
    ("done", "Practitioner playbooks",
     "Step-by-step guides with checklists for real situations: responding to an incident, assessing a breach, running a remediation, onboarding a service provider, reviewing disclosure, testing a control and your first 90 days.",
     "/playbooks/", "1 October 2026"),
    ("done", "Obligations library",
     "117 plain-English obligation summaries from 37 regimes, searchable, filterable by organisation type and downloadable.",
     "/obligations/", "1 October 2026"),
    ("done", "Courses with progress",
     "Learning pathways now work like courses: mark pages as read, follow the next step, and print a record of learning.",
     "/learn/my-learning.html", "1 October 2026"),
    ("done", "A simpler menu and home page",
     "A shorter menu, a single Topics page, a home page that asks who you are and points you to the right place, a what's-new strip and this roadmap.",
     "/topics/", "1 October 2026"),
    ("now", "Expert review of specialist pages",
     "The site's creator, a risk and compliance professional, reviews the most-used specialist pages (CPS 230, breach reporting, incidents, remediation, controls, third-party risk and super) and signs them off.",
     "/about/editorial-standards.html", ""),
    ("done", "Board briefings",
     "Printable two-page briefings on CPS 230, FAR, breach reporting, CPS 234 and AML/CTF, written for directors and executives.",
     "/governance/board-briefings.html", "1 October 2026"),
    ("done", "Automatic checks of outside links",
     "A monthly automated check that links to regulators, legislation and research still work, so broken source links are found and fixed quickly.",
     "", "1 October 2026"),
    ("done", "Content tidy-up and regular news",
     "A check of every article for overlap found no duplicates, so guides now link directly to their playbook and board briefing instead. News moves to a monthly regulatory roundup, published in the first week of each month.",
     "/news/", "1 October 2026"),
    ("done", "Keeping facts current",
     "Key dates, amounts and limits now live in one register with their official source and when they were last checked, and every page takes them from it. A weekly automatic check reads new regulator announcements and looks for each fact on its official source.",
     "/about/fact-register.html", "8 October 2026"),
    ("done", "Obligations library, stage 2",
     "Breaking each obligation summary into the individual obligations in the law, with citations: 572 obligations across all 39 regimes, each checked against the official text (October 2026).",
     "/obligations/", "9 October 2026"),
]

# Ideas being considered, not yet committed
CONSIDERING = [
    "Email updates for people who prefer them to the RSS feed.",
    "A dedicated web address for the site.",
]
