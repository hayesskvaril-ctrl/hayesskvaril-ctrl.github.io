"""Builds news/regulatory-tracker.html from _scripts/tracker_data.py.
Run:  python3 _scripts/build_tracker.py && python3 _scripts/sync_layout.py
"""
from pathlib import Path
from html import escape
import sys

sys.path.insert(0, str(Path(__file__).parent))
from tracker_data import AS_AT, STATUSES, ENTRIES

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "news" / "regulatory-tracker.html"
SECTOR_NAMES = {"super": "Super", "bank": "Banking", "insurer": "Insurance", "afsl": "AFS licensees",
                "mis": "Managed funds", "listed": "Listed entities", "all": "All sectors"}
STATUS_CLASS = {s: "st-" + str(i) for i, s in enumerate(STATUSES)}

order = {s: i for i, s in enumerate(STATUSES)}
entries = sorted(ENTRIES, key=lambda e: (order[e[2]], e[1], e[0]))
regulators = sorted({e[1] for e in ENTRIES})

rows = []
for title, reg, status, when, sectors, summary, page, (src_label, src_url) in entries:
    link = f'<a class="xref" href="{page}">{escape(title)}</a>' if page else escape(title)
    sec = ", ".join(SECTOR_NAMES[s] for s in sectors)
    rows.append(f'''        <tr data-regulator="{escape(reg)}" data-status="{escape(status)}" data-sectors="{" ".join(sectors)}">
          <td><strong>{link}</strong><br><span class="small">{escape(summary)}</span></td>
          <td>{escape(reg)}</td>
          <td><span class="badge tracker-status {STATUS_CLASS[status]}">{escape(status)}</span></td>
          <td>{escape(when)}</td>
          <td>{escape(sec)}</td>
          <td><a href="{escape(src_url)}">{escape(src_label)}</a></td>
        </tr>''')

opt = lambda vals: "".join(f'<option value="{escape(v)}">{escape(v)}</option>' for v in vals)
sector_opts = "".join(f'<option value="{k}">{v}</option>' for k, v in SECTOR_NAMES.items() if k != "all")

html = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Regulatory changes tracker | RiskLens Australia</title>
<meta name="description" content="A plain-English tracker of recent and upcoming Australian regulatory changes for financial services: APRA, ASIC, AUSTRAC, OAIC, Treasury and industry codes, with status, key dates, affected sectors and official sources.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article wide">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/news/">News</a></li><li>Regulatory changes tracker</li></ol></nav>

  <h1>Regulatory changes tracker</h1>
  <p class="summary">Recent and upcoming changes that matter for risk and compliance in Australian financial services, in one place, with the key dates and a link to the official source.</p>
  <div class="page-meta">
    <span class="level level-intermediate">Intermediate</span>
    <span>{len(ENTRIES)} items</span>
    <span>Position as at {AS_AT}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">How to use the tracker</h2>
    <ul>
      <li>Filter by regulator, status or sector. Each title links to a RiskLens explainer, and the last column links to the official source.</li>
      <li><strong>Status</strong> shows whether a change is in force, finalised but not yet started, still proposed, under review, or a report or guidance that signals regulator expectations.</li>
      <li>Dates and proposals change. The tracker shows the position as at {AS_AT}. Always confirm with the official source before relying on it.</li>
    </ul>
  </aside>

  <div class="widget tracker-filter">
    <div class="controls">
      <div><label for="tf-reg">Regulator</label><select id="tf-reg"><option value="">All regulators</option>{opt(regulators)}</select></div>
      <div><label for="tf-status">Status</label><select id="tf-status"><option value="">All statuses</option>{opt(STATUSES)}</select></div>
      <div><label for="tf-sector">Sector</label><select id="tf-sector"><option value="">All sectors</option>{sector_opts}</select></div>
    </div>
    <p class="small tf-count" aria-live="polite"></p>
  </div>

  <div class="table-wrap">
    <table id="tracker">
      <thead><tr><th scope="col">Change</th><th scope="col">Regulator</th><th scope="col">Status</th><th scope="col">Key dates</th><th scope="col">Sectors</th><th scope="col">Official source</th></tr></thead>
      <tbody>
{chr(10).join(rows)}
      </tbody>
    </table>
  </div>

  <p>For the story behind recent changes, read the latest <a class="xref" href="/news/">news and roundups</a>.</p>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/news/2026-09-regulatory-roundup.html" data-label="Regulatory roundup: winter 2026"></li>
      <li data-href="/foundations/regulatory-landscape.html" data-label="Regulatory landscape map"></li>
      <li data-href="/standards/" data-label="Regulatory and standards library"></li>
    </ul>
  </section>

  <section class="sources" aria-labelledby="sources-h">
    <h2 id="sources-h">Sources</h2>
    <p>Each row links to its official source. Entries were checked against those sources and reputable summaries as at {AS_AT}.</p>
  </section>

  <p class="last-reviewed">Last reviewed: {AS_AT}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

<script src="/scripts/tracker-filter.js"></script>
</body>
</html>
'''
OUT.write_text(html, encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT)} ({len(ENTRIES)} entries)")
