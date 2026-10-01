"""Build the practitioner playbooks (/playbooks/) from _scripts/playbooks_data.py.

Run:  python3 _scripts/build_playbooks.py && python3 _scripts/sync_layout.py && python3 _scripts/check_links.py
Each playbook page has an interactive checklist (scripts/playbook.js) that saves progress in the
reader's browser only. Bump REVIEWED when the playbooks are re-checked.
"""
from html import escape
from pathlib import Path
from playbooks_data import PLAYBOOKS

ROOT = Path(__file__).resolve().parent.parent
REVIEWED = "1 October 2026"
TEMPLATE = (ROOT / "_scripts/page-template.html").read_text()
HEAD = TEMPLATE[:TEMPLATE.index("<title>")]


def esc(s):
    return escape(s, quote=False)


def page(title, desc, main, scripts=""):
    return (HEAD + f'<title>{esc(title)} | RiskLens Australia</title>\n<meta name="description" content="{escape(desc)}">\n'
            '<link rel="stylesheet" href="/styles.css">\n</head>\n<body>\n\n<!-- HEADER:START -->\n<!-- HEADER:END -->\n\n'
            + main + '\n\n<!-- FOOTER:START -->\n<!-- FOOTER:END -->\n\n' + scripts + '</body>\n</html>\n')


def lst(items):
    return "\n".join(f"      <li>{esc(i)}</li>" for i in items)


def playbook(p):
    url = f"/playbooks/{p['slug']}.html"
    steps = []
    for i, (title, actions, output, links) in enumerate(p["steps"], 1):
        more = (' <span class="pb-more">Read more: ' + ", ".join(f'<a href="{u}">{esc(l)}</a>' for u, l in links) + "</span>") if links else ""
        steps.append(f'''    <li class="pb-step" id="step-{i}">
      <div class="pb-check"><input type="checkbox" id="pb-{i}" data-step="{i}"><label for="pb-{i}"><span class="visually-hidden">Mark step {i} done: </span>Done</label></div>
      <h3><span class="pb-n">{i}</span> {esc(title)}</h3>
      <ul>
{chr(10).join(f"        <li>{esc(a)}</li>" for a in actions)}
      </ul>
      <p class="pb-out"><strong>Output:</strong> {esc(output)}.{more}</p>
    </li>''')
    clocks = ""
    if p["clocks"]:
        rows = "\n".join(f"        <tr><th scope=\"row\">{esc(r)}</th><td>{esc(e)}</td><td>{esc(t)}</td></tr>" for r, e, t in p["clocks"])
        clocks = f'''
  <h2>Deadlines that may apply</h2>
  <p>A summary only. Each regime has its own trigger and definitions, so check the linked guides and the official source.</p>
  <div class="table-wrap"><table>
    <thead><tr><th scope="col">Regulator and regime</th><th scope="col">What</th><th scope="col">Timeframe</th></tr></thead>
    <tbody>
{rows}
    </tbody>
  </table></div>
'''
    tools = "\n".join(f'    <a class="card" href="{u}"><h3>{esc(l)}</h3><p>Open</p></a>' for u, l in p["tools"])
    main = f'''<main id="main" class="article playbook">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/playbooks/">Playbooks</a></li><li>{esc(p["title"])}</li></ol></nav>

  <h1>{esc(p["title"])}</h1>
  <p class="summary">{esc(p["summary"])}</p>
  <div class="page-meta">
    <span class="level level-{p["level"].lower()}">{p["level"]}</span>
    <span>About {p["minutes"]} minutes</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Key takeaways</h2>
    <ul>
{lst(p["takeaways"])}
    </ul>
  </aside>

  <div class="pb-glance">
    <div><h2 class="pb-gh">Use this when</h2><ul>
{lst(p["when"])}
    </ul></div>
    <div><h2 class="pb-gh">You'll need</h2><ul>
{lst(p["need"])}
    </ul></div>
    <div><h2 class="pb-gh">Who's involved</h2><ul>
{lst(p["who"])}
    </ul></div>
  </div>

  <h2>The steps</h2>
  <div class="widget pb-progress" data-key="{url}">
    <p class="pb-bar-t" aria-live="polite"><strong class="pb-count">0 of {len(p["steps"])}</strong> steps done</p>
    <div class="pb-bar" aria-hidden="true"><span></span></div>
    <p class="pb-actions"><button type="button" class="secondary" data-pb="print">Print checklist</button> <button type="button" class="secondary" data-pb="reset">Clear ticks</button></p>
    <p class="small">Ticks are saved in this browser only. Use them as a working checklist; they are not a record.</p>
  </div>
  <ol class="pb-steps">
{chr(10).join(steps)}
  </ol>
{clocks}
  <h2>Templates and tools</h2>
  <div class="cards pb-tools">
{tools}
  </div>

  <h2>Common mistakes</h2>
  <ul>
{lst(p["mistakes"])}
  </ul>

  <div class="callout">
    <p><strong>General guidance only.</strong> This playbook summarises common good practice and the main requirements explained on this site. Your organisation's own policies, licence conditions and the official sources take priority, and complex matters need professional advice.</p>
  </div>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
{chr(10).join(f'      <li data-href="{u}" data-label="{escape(l)}"></li>' for u, l in p["related"])}
    </ul>
  </section>

  <section class="sources" aria-labelledby="sources-h">
    <h2 id="sources-h">Sources</h2>
    <ol>
{chr(10).join(f"      <li>{s}</li>" for s in p["sources"])}
    </ol>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>'''
    return page(p["title"], p["summary"], main, '<script src="/scripts/playbook.js"></script>\n')


def index():
    cards = "\n".join(f'''<!-- CARD href="/playbooks/{p["slug"]}.html" level="{p["level"]}" -->
<a class="card" href="/playbooks/{p["slug"]}.html">
  <h3>{esc(p["title"])}</h3>
  <p>{esc(p["short"])}</p>
  <span class="level level-{p["level"].lower()}">{p["level"]}</span>
</a>
<!-- /CARD -->''' for p in PLAYBOOKS)
    main = f'''<main id="main" class="article wide">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Playbooks</li></ol></nav>

  <h1>Playbooks</h1>
  <p class="summary">Step-by-step guides for the situations risk and compliance people actually face, with checklists, deadlines and templates in one place.</p>
  <div class="page-meta">
    <span>{len(PLAYBOOKS)} playbooks</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <div class="callout">
    <h2>How the playbooks work</h2>
    <p>Each playbook is a working checklist: when to use it, what you'll need, who's involved, the steps with what each should produce, the deadlines that may apply, templates, and common mistakes. Tick steps off as you go (ticks are saved in your browser only) or print the checklist. Every step links to the guide with the detail and sources.</p>
  </div>

  <h2>All playbooks</h2>
  <div class="cards">
{cards}
  </div>
<!-- CARDS:END -->

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>'''
    return page("Playbooks", "Step-by-step practitioner playbooks for Australian risk and compliance: responding to incidents, assessing breaches, remediation, onboarding service providers, disclosure review and control testing.", main)


def main():
    out = ROOT / "playbooks"
    out.mkdir(exist_ok=True)
    for p in PLAYBOOKS:
        (out / f"{p['slug']}.html").write_text(playbook(p), encoding="utf-8")
    (out / "index.html").write_text(index(), encoding="utf-8")
    print(f"playbooks: {len(PLAYBOOKS)} pages + index")


if __name__ == "__main__":
    main()
