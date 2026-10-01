"""Build the public site roadmap (/about/roadmap.html) from _scripts/site_roadmap.py, and the
roadmap banner on the home page (between ROADMAP:START/END markers).
Run:  python3 _scripts/build_site_roadmap.py && python3 _scripts/sync_layout.py
"""
import re
from html import escape
from pathlib import Path
from site_roadmap import PROGRAM, INTRO, STAGES, CONSIDERING

ROOT = Path(__file__).resolve().parent.parent
import datetime
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
t = datetime.date.today()
TODAY = f"{t.day} {MONTHS[t.month - 1]} {t.year}"
LABEL = {"done": "Done", "now": "In progress", "next": "Up next", "later": "Later"}

tpl = (ROOT / "_scripts/page-template.html").read_text()
head = tpl[:tpl.index("<title>")]
done = sum(1 for s in STAGES if s[0] == "done")
total = len(STAGES)
now = [s for s in STAGES if s[0] == "now"]
pct = round(100 * done / total)

items = []
for i, (st, title, what, link, when) in enumerate(STAGES, 1):
    more = f' <a href="{link}">See it</a>' if link and st == "done" else (f' <a href="{link}">Related page</a>' if link else "")
    date = f'<span class="rm-date">Finished {escape(when)}</span>' if when else ""
    items.append(f'''    <li class="rm-stage rm-{st}">
      <span class="rm-dot" aria-hidden="true">{"&#10003;" if st == "done" else i}</span>
      <div class="rm-body">
        <p class="rm-status"><span class="rm-pill rm-pill-{st}">{LABEL[st]}</span> Stage {i} of {total}{(" · " + date) if date else ""}</p>
        <h3>{escape(title)}</h3>
        <p>{escape(what)}{more}</p>
      </div>
    </li>''')

page = head + f'''<title>Site roadmap | RiskLens Australia</title>
<meta name="description" content="What we're improving on RiskLens Australia, stage by stage: what's done, what's in progress and what's next.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/about/">About</a></li><li>Site roadmap</li></ol></nav>

  <h1>Site roadmap</h1>
  <p class="summary">What we're improving, stage by stage: what's done, what's in progress and what's next.</p>
  <div class="page-meta">
    <span>{escape(PROGRAM)}</span>
    <span>Last updated: {TODAY}</span>
  </div>

  <div class="rm-overview">
    <p class="rm-big"><strong>{done} of {total}</strong> stages done{(": now working on <strong>" + escape(now[0][1].lower()) + "</strong>") if now else ""}.</p>
    <div class="pb-bar rm-bar" role="img" aria-label="{done} of {total} stages done"><span style="width:{pct}%"></span></div>
  </div>

  <h2>Why we're upgrading</h2>
  <p>{escape(INTRO)}</p>

  <h2>The stages</h2>
  <ol class="rm-list">
{chr(10).join(items)}
  </ol>

  <h2>Being considered</h2>
  <ul>
{chr(10).join(f"    <li>{escape(c)}</li>" for c in CONSIDERING)}
  </ul>
  <p>Have an idea, or found something that needs fixing? Use the <strong>Suggest a correction</strong> link at the bottom of any page. Finished changes are listed on <a href="/whats-new/">What's new</a>.</p>

  <p class="last-reviewed">Last updated: {TODAY}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
'''
(ROOT / "about/roadmap.html").write_text(page, encoding="utf-8")

# home page banner
banner = (f'<!-- ROADMAP:START -->\n  <p class="rm-banner"><span class="rm-pill rm-pill-now">Upgrading</span> '
          f'We\'re improving the site in stages: {done} of {total} done'
          + (f', now working on {escape(now[0][1].lower())}' if now else '')
          + '. <a href="/about/roadmap.html">See the roadmap</a></p>\n<!-- ROADMAP:END -->')
home = ROOT / "index.html"
s = home.read_text(encoding="utf-8")
if "<!-- ROADMAP:START -->" in s:
    s = re.sub(r"<!-- ROADMAP:START -->.*?<!-- ROADMAP:END -->", lambda m: banner, s, flags=re.S)
    home.write_text(s, encoding="utf-8")
print(f"site roadmap: {done} of {total} stages done")
