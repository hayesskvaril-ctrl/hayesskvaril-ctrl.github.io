"""Build the board briefings from _scripts/briefings_data.py:
/governance/board-briefings.html (hub) and /governance/briefing-<slug>.html (one per regime).
Run:  python3 _scripts/build_briefings.py && python3 _scripts/sync_layout.py && python3 _scripts/check_links.py
"""
import re
from html import escape
from pathlib import Path
from briefings_data import BRIEFINGS

ROOT = Path(__file__).resolve().parent.parent
REVIEWED = "1 October 2026"
tpl = (ROOT / "_scripts/page-template.html").read_text()
HEAD = tpl[:tpl.index("<title>")]
DISCLAIMER = ("General educational information only, not legal or compliance advice. "
              "Check the official sources and get professional advice for your organisation.")


def e(s):
    return escape(s, quote=False)


def wrap(title, desc, crumb, main_cls, body):
    return (HEAD + f'<title>{e(title)} | RiskLens Australia</title>\n<meta name="description" content="{escape(desc)}">\n'
            '<link rel="stylesheet" href="/styles.css">\n</head>\n<body>\n\n<!-- HEADER:START -->\n<!-- HEADER:END -->\n\n'
            f'<main id="main" class="{main_cls}">\n  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>'
            f'<li><a href="/governance/">Governance</a></li>{crumb}</ol></nav>\n' + body +
            '\n</main>\n\n<!-- FOOTER:START -->\n<!-- FOOTER:END -->\n\n</body>\n</html>\n')


def briefing(b):
    rows = "\n".join(f'        <tr><th scope="row">{e(a)}</th><td>{e(t)}</td></tr>' for a, t in b["numbers"])
    body = f'''
  <h1>Board briefing: {e(b["title"])}</h1>
  <p class="summary">A two-page briefing for directors and executives: what it is, why it matters to the board, the key numbers, and questions to ask management.</p>
  <div class="page-meta">
    <span class="level level-intermediate">Intermediate</span>
    <span>About 5 minutes</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <p class="bf-print"><button type="button" class="btn" onclick="window.print()">Print or save as PDF</button> <span class="small">Prints on two pages. For the full detail, read the <a href="{b["guide"]}">guide</a>.</span></p>

  <article class="briefing">
    <header class="bf-head"><p class="bf-kicker">RiskLens Australia · Board briefing</p><h2 class="bf-title">{e(b["title"])}</h2></header>
    <section class="bf-sec"><h3>What it is</h3><p>{e(b["what"])}</p></section>
    <section class="bf-sec"><h3>Why it matters to the board</h3><ul>
{chr(10).join(f"      <li>{e(w)}</li>" for w in b["why"])}
    </ul></section>
    <section class="bf-sec"><h3>Key numbers and deadlines</h3>
      <div class="table-wrap"><table>
        <thead><tr><th scope="col">What</th><th scope="col">Requirement</th></tr></thead>
        <tbody>
{rows}
        </tbody>
      </table></div>
    </section>
    <section class="bf-sec bf-q"><h3>Questions to ask management</h3><ol>
{chr(10).join(f"      <li>{e(q)}</li>" for q in b["questions"])}
    </ol></section>
    <section class="bf-sec bf-flags"><h3>Red flags</h3><ul>
{chr(10).join(f"      <li>{e(f)}</li>" for f in b["flags"])}
    </ul></section>
    <footer class="bf-foot"><p>{DISCLAIMER} Last reviewed {REVIEWED}. Full guide and sources: {e("hayesskvaril-ctrl.github.io" + b["guide"])}</p></footer>
  </article>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="{b["guide"]}" data-label="The full guide"></li>
      <li data-href="/governance/board-briefings.html" data-label="All board briefings"></li>
      <li data-href="/governance/board-risk-reporting.html" data-label="Board risk reporting"></li>
      <li data-href="/governance/board-structure-and-accountability.html" data-label="Board structure and accountability"></li>
    </ul>
  </section>

  <section class="sources" aria-labelledby="sources-h">
    <h2 id="sources-h">Sources</h2>
    <ol>
{chr(10).join(f"      <li>{s}</li>" for s in b["sources"])}
    </ol>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>'''
    return wrap(f'Board briefing: {b["title"]}', f'A printable two-page board briefing on {b["title"]}: what it is, why it matters to the board, key numbers and deadlines, questions to ask management and red flags.',
                f'<li><a href="/governance/board-briefings.html">Board briefings</a></li><li>{e(b["title"])}</li>', "article", body)


def hub():
    cards = "\n".join(f'''<!-- CARD href="/governance/briefing-{b["slug"]}.html" level="Intermediate" -->
<a class="card" href="/governance/briefing-{b["slug"]}.html">
  <h3>{e(b["title"])}</h3>
  <p>{e(b["short"])}</p>
  <span class="level level-intermediate">Intermediate</span>
</a>
<!-- /CARD -->''' for b in BRIEFINGS)
    body = f'''
  <h1>Board briefings</h1>
  <p class="summary">Printable two-page briefings for directors and executives on the regimes boards are most often asked about: what each is, why it matters, the key numbers, and the questions to ask management.</p>
  <div class="page-meta">
    <span class="level level-intermediate">Intermediate</span>
    <span>{len(BRIEFINGS)} briefings</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Key takeaways</h2>
    <ul>
      <li>Each briefing fits on two printed pages, for a board pack or induction.</li>
      <li>The questions are prompts for discussion, not legal requirements.</li>
      <li>Each briefing links to the full guide, where the detail and official sources are.</li>
    </ul>
  </aside>

  <h2>All briefings</h2>
  <div class="cards">
{cards}
  </div>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/governance/" data-label="Governance"></li>
      <li data-href="/governance/board-risk-reporting.html" data-label="Board risk reporting"></li>
      <li data-href="/playbooks/" data-label="Playbooks"></li>
    </ul>
  </section>

  <section class="sources" aria-labelledby="sources-h">
    <h2 id="sources-h">Sources</h2>
    <ol>
      <li>Each briefing lists the official sources it summarises.</li>
    </ol>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>'''
    return wrap("Board briefings", "Printable two-page board briefings on CPS 230, FAR, breach reporting, CPS 234 and AML/CTF, with questions directors can ask management.",
                "<li>Board briefings</li>", "article", body)


for b in BRIEFINGS:
    (ROOT / f"governance/briefing-{b['slug']}.html").write_text(briefing(b), encoding="utf-8")
(ROOT / "governance/board-briefings.html").write_text(hub(), encoding="utf-8")

# card on the Governance landing page
gi = ROOT / "governance/index.html"
s = gi.read_text(encoding="utf-8")
if 'CARD href="/governance/board-briefings.html"' not in s:
    card = '''<!-- CARD href="/governance/board-briefings.html" level="Intermediate" -->
<a class="card" href="/governance/board-briefings.html">
  <h3>Board briefings</h3>
  <p>Printable two-page briefings for directors on CPS 230, FAR, breach reporting, CPS 234 and AML/CTF.</p>
  <span class="level level-intermediate">Intermediate</span>
</a>
<!-- /CARD -->
'''
    s = s.replace('  <h2>All topics</h2>\n  <div class="cards">\n', '  <h2>All topics</h2>\n  <div class="cards">\n' + card, 1)
    gi.write_text(s, encoding="utf-8")
print(f"board briefings: {len(BRIEFINGS)} + hub")
