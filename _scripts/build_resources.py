"""Builds tools/resource-library.html: one index of every downloadable template, interactive tool,
self-check checklist and learning resource on the site.

Downloads are listed in DOWNLOADS (file sizes are read from disk). Interactive tools are found
automatically by scanning pages for the widget scripts in TOOLS. Self-check checklists are found
by scanning for "checklist-widget" blocks and reading their heading.
Run:  python3 _scripts/build_resources.py && python3 _scripts/sync_layout.py
"""
from pathlib import Path
from html import escape
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "tools" / "resource-library.html"
REVIEWED = "27 September 2026"

# (title, file, format, level, description, explainer page)
DOWNLOADS = [
    ("Risk assessment template", "/assets/templates/risk-assessment-template.xlsx", "Excel", "Beginner",
     "Risk register with inherent and residual ratings, appetite check and automatic heat maps.",
     "/tools/risk-assessment-template.html"),
    ("Incident report template", "/assets/templates/incident-report-template.docx", "Word", "Intermediate",
     "Record an incident from first report to closure, including a notification checklist.",
     "/tools/incident-report-template.html"),
    ("Breach register template", "/assets/templates/breach-register-template.xlsx", "Excel", "Intermediate",
     "Log breaches, track the ASIC 30-day deadline and other notifications, with a dashboard.",
     "/tools/breach-register-template.html"),
    ("Regulatory obligation checklists", "/assets/templates/obligation-checklists.xlsx", "Excel", "Intermediate",
     "Six checklists (CPS 230, breach reporting, IDR, DDO, whistleblower, privacy) with status, evidence and actions.",
     "/tools/obligation-checklists.html"),
]

# widget script -> (tool name, description, level)
TOOLS = {
    "risk-map-tool.js": ("Risk heat map and scoring tool", "Score your own risks, compare with appetite and download a CSV.", "Beginner"),
    "heatmap.js": ("Interactive 5×5 heat map", "See how likelihood and consequence combine into a rating.", "Beginner"),
    "kri-dashboard.js": ("KRI dashboard demo", "Change indicator values to see each status and required action against illustrative thresholds.", "Intermediate"),
    "regulator-finder.js": ("Regulator finder", "Find which regulators cover a type of organisation.", "Beginner"),
    "reporting-clock.js": ("Reporting deadline clock", "Enter an awareness date to see indicative deadlines across reporting regimes.", "Intermediate"),
    "breach-finder.js": ("Reporting regime finder", "Tick what describes the organisation and event to see which reporting regimes to assess.", "Intermediate"),
    "supplier-tiering.js": ("Supplier tiering tool", "Tier a service provider by criticality and risk.", "Intermediate"),
    "expected-loss.js": ("Expected credit loss calculator", "Try the PD × LGD × EAD calculation.", "Beginner"),
    "skills-matrix.js": ("Board skills matrix", "Tick which directors bring each skill to spot gaps and thin coverage.", "Intermediate"),
    "accountability-map.js": ("Accountability map explorer", "See who holds each responsibility in an example FAR map.", "Intermediate"),
    "deferral-calc.js": ("Remuneration deferral calculator", "See how deferral requirements apply to variable pay.", "Intermediate"),
    "oprisk-sim.js": ("Operational loss Monte Carlo simulator", "Simulate 10,000 years of losses and see expected loss, VaR and expected shortfall.", "Advanced"),
    "tolerance-builder.js": ("CPS 230 tolerance level builder", "Rate harm over time to find where disruption becomes intolerable.", "Advanced"),
    "aggregation-calc.js": ("Risk aggregation calculator", "Combine three risks with correlations and see the diversification benefit.", "Advanced"),
    "sampling-calc.js": ("Control testing sample size calculator", "Plan attribute samples and evaluate results as an upper deviation limit.", "Advanced"),
    "climate-group.js": ("Climate reporting group finder", "Work out which mandatory climate reporting group an entity falls into, and when it starts.", "Intermediate"),
    "ai-tiering.js": ("AI use case risk tiering", "Tick the characteristics of an AI use to see an illustrative risk tier and typical controls.", "Intermediate"),
    "culture-radar.js": ("Risk culture self-reflection", "A personal reflection tool: rate a team on risk culture dimensions and see the shape.", "Intermediate"),
}

LEARNING = [
    ("Topic quizzes", "/learn/quizzes.html", "Beginner", "Knowledge checks for every section, with explanations."),
    ("Scenario simulations", "/learn/scenarios.html", "Intermediate", "Fee error breach, provider outage and whistleblower scenarios."),
    ("Flashcards", "/learn/flashcards.html", "Beginner", "Glossary terms, key numbers and deadlines, and what each standard covers."),
    ("Learning pathways", "/learn/pathways.html", "Beginner", "Role-based reading orders with progress tracking."),
    ("Regulatory changes tracker", "/news/regulatory-tracker.html", "Intermediate", "Recent and upcoming changes with status and key dates."),
    ("News RSS feed", "/news/feed.xml", "Beginner", "Follow new articles in any free feed reader."),
]


def page_title(url):
    p = ROOT / url.lstrip("/")
    if url.endswith("/"):
        p = p / "index.html"
    s = p.read_text(encoding="utf-8")
    return re.sub(r"<[^>]+>", "", re.search(r"<h1>(.*?)</h1>", s, re.S).group(1)).strip()


def pages():
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT).as_posix()
        if rel.split("/")[0] in {"_scripts", "assets"}:
            continue
        yield "/" + (rel[:-len("index.html")] if rel.endswith("index.html") else rel), p.read_text(encoding="utf-8")


def size(url):
    b = (ROOT / url.lstrip("/")).stat().st_size
    return f"{max(1, round(b / 1024))} KB"


items = []


def item(kind, title, url, desc, level="", fmt="", found=None):
    lv = f' <span class="level level-{level.lower()}">{escape(level)}</span>' if level else ""
    fm = f' <span class="news-tag">{escape(fmt)}</span>' if fmt else ""
    fnd = ""
    if found:
        links = ", ".join(f'<a href="{u}">{escape(t)}</a>' for u, t in found)
        fnd = f'\n      <p class="small">{"Explained on" if kind == "Download" else "Found on"}: {links}</p>'
    dl = " download" if kind == "Download" else ""
    items.append(f'''    <li class="news-item" data-type="{kind.lower().replace(" ", "-")}">
      <p class="news-kicker"><span class="badge res-{kind.lower().replace(" ", "-")}">{escape(kind)}</span>{lv}{fm}</p>
      <h3><a href="{url}"{dl}>{escape(title)}</a></h3>
      <p>{escape(desc)}</p>{fnd}
    </li>''')


for title, f, fmt, level, desc, page in DOWNLOADS:
    item("Download", title, f, desc, level, f"{fmt} · {size(f)}", [(page, page_title(page))])

all_pages = list(pages())
for script, (name, desc, level) in TOOLS.items():
    found = [(u, page_title(u)) for u, s in all_pages if f"/scripts/{script}" in s]
    if found:
        item("Interactive tool", name, found[0][0], desc, level, "In your browser", found)

for u, s in all_pages:
    if u == "/tools/obligation-checklists.html":
        continue
    for m in re.finditer(r'class="widget checklist-widget"[^>]*>\s*<h3>(.*?)</h3>', s, re.S):
        name = re.sub(r"<[^>]+>", "", m.group(1)).strip()
        n = s[m.end():].split("</div>", 1)[0].count('type="checkbox"')
        item("Self-check", name, u, f"A {n}-item interactive self-check on this topic.", "", "In your browser", [(u, page_title(u))])
item("Self-check", "Regulatory obligation checklists (six checklists)", "/tools/obligation-checklists.html",
     "CPS 230, breach reporting, complaints, DDO, whistleblower and privacy self-checks, with a spreadsheet version.", "Intermediate", "In your browser")

quiz_pages = [(u, page_title(u)) for u, s in all_pages if "/scripts/quiz.js" in s]
for title, url, level, desc in LEARNING:
    item("Learning", title, url, desc, level, "RSS" if url.endswith(".xml") else "")
if quiz_pages:
    item("Learning", f"Knowledge checks on {len(quiz_pages)} topic pages", quiz_pages[0][0],
         "Short quizzes built into topic pages.", "", "", quiz_pages)

counts = {}
for k in ("Download", "Interactive tool", "Self-check", "Learning"):
    counts[k] = sum(1 for i in items if f'data-type="{k.lower().replace(" ", "-")}"' in i)
PLURAL = {"Download": "Downloads", "Interactive tool": "Interactive tools", "Self-check": "Self-checks", "Learning": "Learning"}
buttons = "".join(f'<button type="button" class="secondary" data-filter="{k.lower().replace(" ", "-")}" aria-pressed="false">{PLURAL[k]} ({n})</button>'
                  for k, n in counts.items())

html = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Resource library | RiskLens Australia</title>
<meta name="description" content="Every free RiskLens Australia resource in one place: downloadable Excel and Word templates, interactive risk and compliance tools, self-check checklists and learning resources.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/tools/">Tools</a></li><li>Resource library</li></ol></nav>

  <h1>Resource library</h1>
  <p class="summary">Every free template, interactive tool, self-check and learning resource on RiskLens Australia, in one list.</p>
  <div class="page-meta">
    <span class="level level-beginner">Beginner</span>
    <span>{len(items)} resources</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Good to know</h2>
    <ul>
      <li><strong>Downloads</strong> are Excel and Word files that work in Microsoft Office, Google Sheets and Docs, and LibreOffice. They are free to use and adapt within your organisation.</li>
      <li><strong>Interactive tools and self-checks</strong> run in your browser. Nothing you enter is sent anywhere.</li>
      <li>Everything here is a learning aid or starting point, not advice. Adapt it to your organisation's own frameworks and obligations. See the <a href="/about/#disclaimer">full disclaimer</a>.</li>
    </ul>
  </aside>

  <div class="news-filter" role="group" aria-label="Filter by type">
    <button type="button" class="secondary" data-filter="all" aria-pressed="true">All ({len(items)})</button>{buttons}
  </div>
  <ol class="news-list">
{chr(10).join(items)}
  </ol>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/tools/" data-label="Tools and templates"></li>
      <li data-href="/learn/" data-label="Interactive learning"></li>
      <li data-href="/start-here/" data-label="Start here"></li>
    </ul>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

<script src="/scripts/news-filter.js"></script>
</body>
</html>
'''
OUT.write_text(html, encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT)} ({len(items)} resources: {counts})")
