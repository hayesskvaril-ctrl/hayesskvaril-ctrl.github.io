"""Builds learn/by-level.html: the level rubric plus every content page grouped by level and section.
Levels, titles and summaries are read from each page, so the list stays current.
Run:  python3 _scripts/build_levels.py && python3 _scripts/sync_layout.py
"""
from pathlib import Path
from html import escape
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "learn" / "by-level.html"
REVIEWED = "28 September 2026"

SECTIONS = [("foundations", "Foundations"), ("risk-management", "Risk management"), ("compliance", "Compliance"),
            ("governance", "Governance"), ("grc", "GRC systems"), ("standards", "Standards library"), ("sectors", "Sectors"),
            ("case-studies", "Case studies"), ("playbooks", "Playbooks")]
LEVELS = [
    ("Beginner", "What is it, and why does it matter?",
     "No prior knowledge assumed. Explains the purpose, the big picture and the key vocabulary.",
     "Newcomers, students, people moving into a risk, compliance or governance role, and directors new to financial services."),
    ("Intermediate", "What does it require, and how do organisations do it?",
     "Assumes the Foundations. Covers specific obligations, processes, timeframes and practical tools.",
     "Working practitioners who need to apply requirements day to day."),
    ("Advanced", "How do you exercise judgement when it's hard?",
     "University level. Assumes working knowledge. Legal tests and case law, quantitative methods, design trade-offs, grey areas, interactions between regimes, and board and regulator perspectives. Every Advanced page has learning outcomes, a Theory and research section grounded in at least three peer-reviewed studies, critical perspectives, seminar questions and full APA references.",
     "Senior practitioners, specialists, board members, and undergraduate and postgraduate students."),
]


def pages():
    for folder, label in SECTIONS:
        for p in sorted((ROOT / folder).glob("*.html")):
            if p.name == "index.html":
                continue
            s = p.read_text(encoding="utf-8")
            lv = re.search(r'class="page-meta">\s*<span class="level level-[a-z]+">([A-Za-z]+)<', s)
            h1 = re.search(r"<h1>(.*?)</h1>", s, re.S)
            summ = re.search(r'<p class="summary">(.*?)</p>', s, re.S)
            if not (lv and h1):
                continue
            yield (lv.group(1), folder, label, f"/{folder}/{p.name}",
                   re.sub(r"<[^>]+>", "", h1.group(1)).strip(),
                   re.sub(r"<[^>]+>", "", summ.group(1)).strip() if summ else "")


def build():
    allp = list(pages())
    counts = {lv: sum(1 for x in allp if x[0] == lv) for lv, *_ in LEVELS}
    rubric = []
    for lv, q, what, who in LEVELS:
        rubric.append(f'''    <div class="level-card">
      <p><span class="level level-{lv.lower()}">{lv}</span> <span class="small">{counts[lv]} pages</span></p>
      <h3>{escape(q)}</h3>
      <p>{escape(what)}</p>
      <p class="small"><strong>Written for:</strong> {escape(who)}</p>
    </div>''')
    body = []
    for lv, *_ in LEVELS:
        body.append(f'  <h2 id="{lv.lower()}">{lv} <span class="small">({counts[lv]} pages)</span></h2>')
        for folder, label in SECTIONS:
            items = [x for x in allp if x[0] == lv and x[1] == folder]
            if not items:
                continue
            body.append(f"  <h3>{escape(label)}</h3>\n  <ul class=\"level-list\">")
            for _, _, _, url, title, summ in items:
                body.append(f'    <li><a href="{url}">{escape(title)}</a><br><span class="small">{escape(summ)}</span></li>')
            body.append("  </ul>")
    html = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Browse by level | RiskLens Australia</title>
<meta name="description" content="Every RiskLens Australia page grouped by level: Beginner, Intermediate and Advanced, with what each level means and who it is written for.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/learn/">Learn</a></li><li>Browse by level</li></ol></nav>

  <h1>Browse by level</h1>
  <p class="summary">Every article in the content sections carries a level tag. Here is what each level means, and every page grouped by level, so you can find material at the right depth.</p>
  <div class="page-meta">
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <h2>What the levels mean</h2>
  <div class="level-grid">
{chr(10).join(rubric)}
  </div>
  <p>A page is tagged by its entry level: the level you need to start reading it. Some pages include sections that go deeper, marked as such. Jump to <a href="#beginner">Beginner</a>, <a href="#intermediate">Intermediate</a> or <a href="#advanced">Advanced</a>.</p>

{chr(10).join(body)}

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/start-here/" data-label="Start here"></li>
      <li data-href="/learn/pathways.html" data-label="Learning pathways"></li>
      <li data-href="/learn/quizzes.html" data-label="Topic quizzes"></li>
    </ul>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
'''
    OUT.write_text(html, encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)} ({len(allp)} pages: {counts})")


if __name__ == "__main__":
    build()
