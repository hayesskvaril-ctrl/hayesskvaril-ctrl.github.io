#!/usr/bin/env python3
"""Builds whats-new/index.html: a public changelog.

New pages come from git history (the date each page was first committed; pages not yet
committed count as today). Notable updates to existing pages come from changelog_data.py.
Run:  python3 _scripts/build_changelog.py && python3 _scripts/sync_layout.py
"""
import datetime
import re
import subprocess
import sys
from html import escape, unescape
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from changelog_data import UPDATES  # noqa: E402
from review_common import fmt  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "whats-new" / "index.html"
SKIP = {"404.html", "whats-new/index.html", "search/index.html"}
BIG_DAY = 12  # collapse a day's new pages into a summary when there are more than this


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True).stdout


def page_info(p):
    s = p.read_text(encoding="utf-8")
    h1 = re.search(r"<h1>(.*?)</h1>", s, re.S)
    title = unescape(re.sub(r"<[^>]+>", "", h1.group(1)).strip()) if h1 else p.stem
    lv = re.search(r'class="level level-[a-z]+">([A-Za-z]+)<', s)
    return title, (lv.group(1) if lv else "")


def url_of(rel):
    return "/" + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)


def section_of(url):
    first = url.strip("/").split("/")[0]
    return {"": "Home"}.get(first, first.replace("-", " ").capitalize())


added = {}  # date -> [(url, title, level)]
today = datetime.date.today()
for p in sorted(ROOT.rglob("*.html")):
    rel = p.relative_to(ROOT).as_posix()
    if rel.startswith(("_", ".")) or rel.split("/")[0] in {"assets", "scripts"} or rel in SKIP:
        continue
    dates = git("log", "--diff-filter=A", "--format=%cs", "--", rel).split()
    d = datetime.date.fromisoformat(dates[-1]) if dates else today
    title, level = page_info(p)
    added.setdefault(d, []).append((url_of(rel), title, level))

updates = {}
for iso, url, note in UPDATES:
    updates.setdefault(datetime.date.fromisoformat(iso), []).append((url, note))

blocks = []
for d in sorted(set(added) | set(updates), reverse=True):
    parts = [f'  <section class="changelog-day" aria-labelledby="d-{d.isoformat()}">\n    <h2 id="d-{d.isoformat()}">{fmt(d)}</h2>']
    if d in updates:
        items = []
        for url, note in updates[d]:
            if url and (ROOT / (url.lstrip("/") + ("index.html" if url.endswith("/") else ""))).exists():
                title, _ = page_info(ROOT / (url.lstrip("/") + ("index.html" if url.endswith("/") else "")))
                items.append(f'      <li><a href="{url}">{escape(title)}</a>: {escape(note)}</li>')
            else:
                items.append(f"      <li>{escape(note)}</li>")
        parts.append('    <h3>Updates</h3>\n    <ul>\n' + "\n".join(items) + "\n    </ul>")
    if d in added:
        pages = sorted(added[d], key=lambda x: (x[0].count("/") > 1, x[0]))
        lis = "\n".join(
            f'      <li><a href="{u}">{escape(t)}</a>'
            + (f' <span class="level level-{lv.lower()}">{lv}</span>' if lv else "") + "</li>" for u, t, lv in pages)
        heading = f"New pages ({len(pages)})"
        if len(pages) > BIG_DAY:
            by_sec = {}
            for u, _, _ in pages:
                by_sec[section_of(u)] = by_sec.get(section_of(u), 0) + 1
            summary = ", ".join(f"{k} {v}" for k, v in sorted(by_sec.items(), key=lambda kv: -kv[1]))
            parts.append(f'    <h3>{heading}</h3>\n    <p class="small">{escape(summary)}</p>\n'
                         f'    <details>\n      <summary>Show all {len(pages)} pages</summary>\n    <ul>\n{lis}\n    </ul>\n    </details>')
        else:
            parts.append(f'    <h3>{heading}</h3>\n    <ul>\n{lis}\n    </ul>')
    parts.append("  </section>")
    blocks.append("\n".join(parts))

html = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>What's new | RiskLens Australia</title>
<meta name="description" content="What's new on RiskLens Australia: new pages, notable updates and site improvements, newest first.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>What's new</li></ol></nav>

  <h1>What's new</h1>
  <p class="summary">New pages, notable updates and site improvements, newest first.</p>
  <div class="page-meta">
    <span>Last updated: {fmt(today)}</span>
  </div>

  <p>For regulatory news, see <a href="/news/">News</a> and the <a href="/news/regulatory-tracker.html">Regulatory changes tracker</a>. Every page is reviewed at least once a year; its "Last reviewed" date and next review date are shown at the bottom of the page. Pages checked by the site's subject-matter expert show an <span class="badge expert-badge">Expert reviewed</span> badge. Read more about <a href="/about/">how content is checked</a>.</p>

{chr(10).join(blocks)}

  <p class="last-reviewed">Last updated: {fmt(today)}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
'''
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(html, encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT)} ({sum(len(v) for v in added.values())} pages, {len(UPDATES)} updates)")

# "What's new" strip on the home page: the three most recent updates (between WHATSNEW markers).
import re as _re
home = ROOT / "index.html"
recent = sorted(UPDATES, key=lambda u: u[0], reverse=True)[:3]
items = []
for iso, url, note in recent:
    d = datetime.date.fromisoformat(iso)
    first = note.split(": ")[0] if ": " in note[:90] else note.split(". ")[0]
    link = url or "/whats-new/"
    items.append(f'      <li><span class="wn-date">{d.day} {fmt(d).split(" ", 1)[1]}</span><a href="{link}">{escape(first.rstrip("."))}</a></li>')
strip = ("<!-- WHATSNEW:START -->\n  <div class=\"whats-new-strip\">\n    <p class=\"wn-label\"><a href=\"/whats-new/\">What's new</a></p>\n    <ul>\n"
         + "\n".join(items) + "\n    </ul>\n  </div>\n<!-- WHATSNEW:END -->")
s = home.read_text(encoding="utf-8")
if "<!-- WHATSNEW:START -->" in s:
    s = _re.sub(r"<!-- WHATSNEW:START -->.*?<!-- WHATSNEW:END -->", lambda m: strip, s, flags=_re.S)
    home.write_text(s, encoding="utf-8")
