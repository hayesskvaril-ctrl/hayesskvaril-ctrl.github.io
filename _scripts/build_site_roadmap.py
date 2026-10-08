"""Build the public site roadmap (/about/roadmap.html) from _scripts/site_roadmap.py, and the
roadmap banner on the home page (between ROADMAP:START/END markers).
Run:  python3 _scripts/build_site_roadmap.py && python3 _scripts/sync_layout.py
"""
import re
from html import escape
from pathlib import Path
from site_roadmap import PROGRAM, INTRO, STAGES, CONSIDERING
import depth_roadmap as D

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

# ---- Deep review programme (depth_roadmap.py) ----
def h1(url):
    m = re.search(r"<h1[^>]*>(.*?)</h1>", (ROOT / url.lstrip("/")).read_text(encoding="utf-8"), re.S)
    return re.sub(r"<[^>]+>", "", m.group(1)).strip()

order = [u for _, _, urls in D.TRACKS for u in urls]
assert len(order) == len(set(order)), "a page is in two tracks"
LEVEL_DIRS = ["foundations", "risk-management", "compliance", "governance", "grc", "standards", "sectors", "case-studies"]
articles = {"/" + str(f.relative_to(ROOT)) for d in LEVEL_DIRS for f in (ROOT / d).glob("*.html") if f.name != "index.html"}
articles = {a for a in articles if a not in D.EXCLUDED and not any(a.startswith(x) for x in D.EXCLUDED_PREFIXES)}
missing, extra = articles - set(order), set(order) - articles
assert not missing and not extra, f"depth roadmap out of step: missing {sorted(missing)}, unknown {sorted(extra)}"
TITLE = {u: h1(u) for u in order}
d_total = len(order)
d_done = sum(1 for u in order if u in D.DONE)
d_pct = round(100 * d_done / d_total)
current = next((u for u in order if u not in D.DONE), None)
upnext = [u for u in order if u not in D.DONE and u != current][:3]
cur_n = order.index(current) + 1 if current else d_total
recent = sorted((u for u in order if u in D.DONE), key=lambda u: order.index(u))[-3:][::-1]

def track_html(i, name, desc, urls):
    n_done = sum(1 for u in urls if u in D.DONE)
    has_now = current in urls
    state = "done" if n_done == len(urls) else ("now" if has_now else "later")
    rows = []
    for u in urls:
        ph = order.index(u) + 1
        if u in D.DONE:
            when, what = D.DONE[u]
            rows.append(f'          <li class="dr-ph dr-ph-done"><span class="dr-n">{ph}</span><div><a href="{u}">{escape(TITLE[u])}</a> <span class="rm-pill rm-pill-done">Done</span> <span class="rm-date">{escape(when)}</span><p class="dr-what">{escape(what)}</p></div></li>')
        elif u == current:
            rows.append(f'          <li class="dr-ph dr-ph-now"><span class="dr-n">{ph}</span><div><a href="{u}">{escape(TITLE[u])}</a> <span class="rm-pill rm-pill-now">In progress</span></div></li>')
        else:
            rows.append(f'          <li class="dr-ph"><span class="dr-n">{ph}</span><div><a href="{u}">{escape(TITLE[u])}</a></div></li>')
    tp = round(100 * n_done / len(urls))
    return f'''    <details class="dr-track dr-{state}"{" open" if has_now else ""}>
      <summary><span class="dr-tn">Track {i}</span><span class="dr-tt">{escape(name)}</span><span class="dr-tc">{n_done} of {len(urls)} done</span><span class="pb-bar dr-tbar" aria-hidden="true"><span style="width:{tp}%"></span></span></summary>
      <div class="dr-tbody">
        <p class="dr-tdesc">{escape(desc)}</p>
        <ol class="dr-phases">
{chr(10).join(rows)}
        </ol>
      </div>
    </details>'''

now_txt = (f' Now on phase {cur_n}: <a href="{current}">{escape(TITLE[current])}</a>.') if current else ' The deep review is complete.'
tracks_html = "\n".join(track_html(i, *t) for i, t in enumerate(D.TRACKS, 1))

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
  <p class="summary">What we're improving, phase by phase: what's done, what's in progress and what's next.</p>
  <div class="page-meta">
    <span>{escape(PROGRAM)}</span>
    <span>Last updated: {TODAY}</span>
  </div>

  <h2>Deep review of every article</h2>
  <p>{escape(D.INTRO)}</p>
  <div class="rm-overview dr-overview">
    <p class="dr-pct"><strong>{d_pct}%</strong> complete</p>
    <div class="pb-bar rm-bar" role="img" aria-label="{d_done} of {d_total} phases done, {d_pct}% complete"><span style="width:{max(d_pct, 1)}%"></span></div>
    <p class="rm-big"><strong>{d_done} of {d_total}</strong> phases done.{now_txt}</p>
    <p class="small">{escape(D.PROGRAM)}. One phase is one article. Tracks are worked through in order, starting with the specialist areas readers use most.</p>
  </div>

  <h3>What every phase covers</h3>
  <ul class="dr-check">
{chr(10).join(f"    <li>{escape(c)}</li>" for c in D.CHECKLIST)}
  </ul>

  <h3>The {len(D.TRACKS)} tracks</h3>
  <div class="dr-tracks">
{tracks_html}
  </div>

  <h2>Earlier upgrade: finding your way around</h2>
  <div class="rm-overview">
    <p class="rm-big"><strong>{done} of {total}</strong> stages done{(": now working on <strong>" + escape(now[0][1].lower()) + "</strong>") if now else ""}.</p>
    <div class="pb-bar rm-bar" role="img" aria-label="{done} of {total} stages done"><span style="width:{pct}%"></span></div>
  </div>

  <h3>Why we upgraded</h3>
  <p>{escape(INTRO)}</p>

  <h3>The stages</h3>
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

# home page panel
recent_li = "".join(f'<li><a href="{u}">{escape(TITLE[u])}</a></li>' for u in recent)
next_li = "".join(f'<li><a href="{u}">{escape(TITLE[u])}</a></li>' for u in upnext)
now_p = (f'<p class="dr-now"><span>Now:</span> <a href="{current}">{escape(TITLE[current])}</a></p>') if current else ""
recent_d = (f'<div><p class="dr-lh">Just finished</p><ul>{recent_li}</ul></div>') if recent else ""
next_d = (f'<div><p class="dr-lh">Up next</p><ul>{next_li}</ul></div>') if upnext else ""
complete = d_done == d_total
last_date = max((D.DONE[u][0] for u in order), key=lambda x: __import__("datetime").datetime.strptime(x, "%d %B %Y")) if complete else ""
intro_home = (f"We've re-checked every page against the current law and regulator guidance and added much more depth: all {d_total} phases, finished {last_date}. Each page is still reviewed at least yearly." if complete
              else "We're re-checking every page against the current law and regulator guidance, and adding much more depth. One article per phase.")
banner = f'''<!-- ROADMAP:START -->
  <div class="dr-home" aria-labelledby="dr-home-h">
    <div class="dr-home-main">
      <p class="dr-k"><span class="rm-pill rm-pill-{"done" if complete else "now"}">{"Complete" if complete else "In progress"}</span> Deep review</p>
      <h2 id="dr-home-h">Every article, checked line by line</h2>
      <p>{intro_home}</p>
      <p class="dr-links"><a href="/about/roadmap.html">See the full roadmap</a></p>
    </div>
    <div class="dr-home-progress">
      <p class="dr-pct"><strong>{d_pct}%</strong> complete <span>· phase {cur_n} of {d_total}</span></p>
      <div class="pb-bar dr-bar" role="img" aria-label="{d_done} of {d_total} phases done, {d_pct}% complete"><span style="width:{max(d_pct, 1)}%"></span></div>
      {now_p}
      <div class="dr-lists">
        {recent_d}
        {next_d}
      </div>
    </div>
  </div>
<!-- ROADMAP:END -->'''
home = ROOT / "index.html"
s = home.read_text(encoding="utf-8")
if "<!-- ROADMAP:START -->" in s:
    s = re.sub(r"<!-- ROADMAP:START -->.*?<!-- ROADMAP:END -->", lambda m: banner, s, flags=re.S)
    home.write_text(s, encoding="utf-8")
print(f"site roadmap: {done} of {total} stages done; deep review {d_done} of {d_total} phases ({d_pct}%), now: {current}")
