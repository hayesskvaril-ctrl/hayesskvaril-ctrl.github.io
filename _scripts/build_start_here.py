"""Builds start-here/index.html: short "start here" routes for newcomers, practitioners and
board members. Titles, levels and reading times are read from each linked page.
Run:  python3 _scripts/build_start_here.py && python3 _scripts/sync_layout.py
"""
from pathlib import Path
from html import escape
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "start-here" / "index.html"
REVIEWED = "27 September 2026"


def info(url):
    p = ROOT / url.lstrip("/").split("#")[0]
    if url.endswith("/"):
        p = p / "index.html"
    s = p.read_text(encoding="utf-8")
    title = re.sub(r"<[^>]+>", "", re.search(r"<h1>(.*?)</h1>", s, re.S).group(1)).strip()
    lv = re.search(r'class="level level-[a-z]+">([A-Za-z]+)<', s)
    mins = re.search(r"About (\d+) minutes", s)
    return title, (lv.group(1) if lv else ""), (int(mins.group(1)) if mins else 0)


ROUTES = [
    ("newcomer", "I'm new to risk and compliance",
     "Starting a new role, studying, or just curious. Build the foundations step by step, then check what you've learned.",
     [
         ("/foundations/what-is-risk-management.html", "What risk is, and the loop every risk process follows."),
         ("/foundations/what-is-compliance.html", "Obligations, and how organisations make sure they meet them."),
         ("/foundations/what-is-governance.html", "Who sets direction, who manages, and how accountability works."),
         ("/foundations/three-lines-model.html", "Who does what: the business, risk and compliance, and internal audit."),
         ("/foundations/regulatory-landscape.html", "Which regulator looks after what, including an interactive finder."),
         ("/learn/flashcards.html", "Learn the vocabulary with the 20-card glossary deck."),
         ("/learn/quizzes.html", "Check what you've learned with the Foundations quiz."),
     ],
     ("/learn/pathways.html#essentials", "Next: the full essentials pathway")),
    ("practitioner", "I already work in risk or compliance",
     "Jump straight to the reference material, deadlines, templates and practice exercises.",
     [
         ("/news/regulatory-tracker.html", "What's changing, what's in force and the key dates."),
         ("/compliance/breach-reporting.html", "Every breach and incident reporting regime and deadline in one place."),
         ("/standards/", "Plain-English explainers of APRA standards, ASIC guides and ISO/COSO frameworks."),
         ("/tools/resource-library.html", "All the downloadable templates, checklists and interactive tools."),
         ("/learn/scenarios.html", "Test your judgement on a breach, an outage and a whistleblower case."),
         ("/learn/flashcards.html", "Refresh the \"Key numbers and deadlines\" deck."),
     ],
     ("/learn/pathways.html", "Next: pathways for risk, compliance, super and cyber roles")),
    ("board", "I'm on a board or in a leadership role",
     "The essentials of accountability, oversight and risk appetite for directors and executives.",
     [
         ("/foundations/what-is-governance.html", "The board's role compared with management's."),
         ("/governance/board-structure-and-accountability.html", "Directors' duties, board committees and APRA's requirements."),
         ("/governance/financial-accountability-regime.html", "Accountable persons, accountability maps and consequences."),
         ("/risk-management/risk-appetite-and-tolerance.html", "Setting and overseeing how much risk the organisation takes."),
         ("/governance/culture-and-conduct.html", "Why culture drives outcomes, and how boards can assess it."),
         ("/news/draft-cps-510-governance-overhaul.html", "What APRA's proposed governance standard would change."),
     ],
     ("/learn/pathways.html#governance", "Next: the governance and accountability pathway")),
    ("advanced", "I want to go deeper",
     "Advanced, practitioner-level topics that build on the core pages: quantification, stress testing, tolerance setting, significance analysis and assurance.",
     [
         ("/risk-management/setting-cps-230-tolerance-levels.html", "A method for setting CPS 230 tolerance levels, with an interactive builder."),
         ("/compliance/breach-significance-analysis.html", "The significance tests applied to worked cases."),
         ("/risk-management/scenario-analysis-and-stress-testing.html", "Severe but plausible scenarios and reverse stress testing."),
         ("/risk-management/quantitative-operational-risk.html", "Loss distributions, VaR and a Monte Carlo simulator."),
         ("/risk-management/risk-aggregation-and-correlation.html", "Building the enterprise risk profile."),
         ("/risk-management/control-testing-sampling.html", "Sample sizes, confidence and evidence standards."),
         ("/governance/board-risk-reporting.html", "Designing risk reporting for boards."),
     ],
     ("/learn/pathways.html#risk", "Next: the risk practitioner pathway")),
]

cards = []
sections = []
for rid, title, blurb, steps, (next_url, next_label) in ROUTES:
    total = sum(info(u)[2] for u, _ in steps)
    cards.append(f'''    <a class="card start-card" href="#{rid}">
      <h3>{escape(title)}</h3>
      <p>{escape(blurb)}</p>
      <span class="badge">{len(steps)} steps{f" · about {round(total / 5) * 5 if total >= 10 else total} minutes of reading" if total else ""}</span>
    </a>''')
    li = []
    for i, (url, why) in enumerate(steps, 1):
        t, lv, mins = info(url)
        meta = " · ".join(x for x in [lv, f"{mins} min" if mins else ""] if x)
        li.append(f'''      <li>
        <span class="start-num" aria-hidden="true">{i}</span>
        <div><a href="{url}">{escape(t)}</a>{f' <span class="small">({escape(meta)})</span>' if meta else ""}<br><span class="small">{escape(why)}</span></div>
      </li>''')
    sections.append(f'''  <section class="start-route" id="{rid}" aria-labelledby="{rid}-h">
    <h2 id="{rid}-h">{escape(title)}</h2>
    <p>{escape(blurb)}</p>
    <ol class="start-steps">
{chr(10).join(li)}
    </ol>
    <p class="start-next"><a class="button secondary" href="{next_url}">{escape(next_label)}</a></p>
  </section>''')

html = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Start here | RiskLens Australia</title>
<meta name="description" content="New to RiskLens Australia? Pick a short route: foundations for newcomers, quick reference for risk and compliance practitioners, or the governance essentials for boards and executives.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Start here</li></ol></nav>

  <h1>Start here</h1>
  <p class="summary">RiskLens Australia has over 80 pages, tools and templates. Pick the route that fits you and follow the steps in order.</p>
  <div class="page-meta">
    <span class="level level-beginner">Beginner</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <h2>Which describes you?</h2>
  <div class="cards">
{chr(10).join(cards)}
  </div>

{chr(10).join(sections)}

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Tips for getting the most out of the site</h2>
    <ul>
      <li>Every page has a level tag (Beginner, Intermediate or Advanced) and a "Last reviewed" date.</li>
      <li>Underlined terms link to the <a href="/glossary/">Glossary</a> for a plain-English definition.</li>
      <li>Use <a href="/search/">Search</a> to find a topic, standard or term quickly.</li>
      <li>For longer, role-based reading lists with progress tracking, see <a href="/learn/pathways.html">Learning pathways</a>.</li>
    </ul>
  </aside>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
'''
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(html, encoding="utf-8")
print("wrote", OUT.relative_to(ROOT))
