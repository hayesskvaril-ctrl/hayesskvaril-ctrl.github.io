"""Build the Topics hub (/topics/index.html): every subject area on one page, with page counts and
popular starting points. Counts and summaries are read from each section, so rerun after adding pages:
  python3 _scripts/build_topics.py && python3 _scripts/sync_layout.py
"""
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REVIEWED = "1 October 2026"
# (folder, title, image, dark?, popular pages)
SECTIONS = [
    ("foundations", "Foundations", "foundations", False, ["/foundations/what-is-risk-management.html", "/foundations/what-is-compliance.html", "/foundations/three-lines-model.html", "/foundations/regulatory-landscape.html"]),
    ("risk-management", "Risk management", "risk-management", False, ["/risk-management/risk-appetite-and-tolerance.html", "/risk-management/operational-risk.html", "/risk-management/control-design-and-testing.html", "/risk-management/incident-and-breach-management.html"]),
    ("compliance", "Compliance", "compliance", False, ["/compliance/breach-reporting.html", "/compliance/disclosure-obligations.html", "/compliance/aml-ctf-fundamentals.html", "/compliance/privacy-law.html"]),
    ("governance", "Governance", "governance", False, ["/governance/financial-accountability-regime.html", "/governance/board-structure-and-accountability.html", "/governance/conflicts-of-interest.html", "/governance/board-risk-reporting.html"]),
    ("grc", "GRC systems", "grc", False, ["/grc/what-is-a-grc-system.html", "/grc/risk-taxonomy-and-hierarchy.html", "/grc/grc-data-model.html", "/grc/model-builder.html"]),
    ("standards", "Standards library", "standards", False, ["/standards/cps-230.html", "/standards/cps-220.html", "/standards/asic-rg-78.html", "/standards/iso-31000.html"]),
    ("sectors", "Sectors", "sectors", False, ["/sectors/superannuation.html", "/sectors/banking.html", "/sectors/insurance.html", "/sectors/managed-investment-schemes.html"]),
    ("case-studies", "Case studies", "case-studies", True, ["/case-studies/hayne-royal-commission.html", "/case-studies/apra-cba-prudential-inquiry.html", "/case-studies/optus-medibank-data-breaches.html", "/case-studies/austrac-cba-westpac.html"]),
]
PRACTICE = [
    ("/playbooks/", "Playbooks", "Step-by-step guides with checklists for real situations."),
    ("/obligations/", "Obligations library", "Plain-English obligations from 37 regimes, searchable and downloadable."),
    ("/tools/", "Tools and templates", "Registers, workpapers and calculators to download and adapt."),
    ("/glossary/", "Glossary", "Plain-English definitions of the terms used across the site."),
]


def title_of(url):
    p = ROOT / url.lstrip("/")
    if url.endswith("/"):
        p = p / "index.html"
    m = re.search(r"<h1[^>]*>(.*?)</h1>", p.read_text(encoding="utf-8"), re.S)
    return re.sub(r"<[^>]+>", "", m.group(1)).strip()


blocks = []
total = 0
for folder, title, img, dark, popular in SECTIONS:
    idx = (ROOT / folder / "index.html").read_text(encoding="utf-8")
    summary = re.sub(r"<[^>]+>", "", re.search(r'<p class="summary">(.*?)</p>', idx, re.S).group(1)).strip()
    n = len([p for p in (ROOT / folder).glob("*.html") if p.name != "index.html"])
    total += n
    links = "".join(f'<li><a href="{u}">{escape(title_of(u))}</a></li>' for u in popular if (ROOT / u.lstrip("/")).exists())
    blocks.append(f'''  <section class="topic-card{" dark" if dark else ""}" aria-labelledby="tp-{folder}">
    <img src="/assets/img/{img}-800.webp" width="800" height="500" alt="" loading="lazy">
    <div class="tc-body">
      <h2 id="tp-{folder}"><a href="/{folder}/">{escape(title)}</a></h2>
      <p class="tc-sum">{escape(summary)}</p>
      <p class="tc-count">{n} pages</p>
      <ul class="tc-pop">{links}</ul>
      <p><a class="button" href="/{folder}/">All {escape(title.lower())}</a></p>
    </div>
  </section>''')

practice = "\n".join(f'    <a class="card" href="{u}"><h3>{escape(t)}</h3><p>{escape(d)}</p></a>' for u, t, d in PRACTICE)
tpl = (ROOT / "_scripts/page-template.html").read_text()
head = tpl[:tpl.index("<title>")]
page = head + f'''<title>Topics | RiskLens Australia</title>
<meta name="description" content="Every subject on RiskLens Australia in one place: foundations, risk management, compliance, governance, GRC systems, standards, sectors and case studies.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article wide topics-page">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Topics</li></ol></nav>

  <h1>Topics</h1>
  <p class="summary">Every subject on the site in one place: {total} articles across eight areas, from first principles to university level.</p>
  <div class="page-meta">
    <span>{total} articles</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <p class="topics-start">New to the field? Begin with <a href="/start-here/">Start here</a>. Looking for something specific? <a href="/search/">Search the site</a>.</p>

  <div class="topic-grid">
{chr(10).join(blocks)}
  </div>

  <h2 class="topics-h">Put it into practice</h2>
  <div class="cards">
{practice}
  </div>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
'''
(ROOT / "topics").mkdir(exist_ok=True)
(ROOT / "topics/index.html").write_text(page, encoding="utf-8")
print(f"topics: {len(SECTIONS)} sections, {total} articles")
