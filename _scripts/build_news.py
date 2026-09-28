"""Builds news/index.html (the news listing) and news/feed.xml (RSS) from the articles in /news/.

Each article is a page in /news/ made from _scripts/news-template.html, with
<meta name="rl:type">, <meta name="rl:date"> (YYYY-MM-DD) and optional <meta name="rl:tags">.
Pages without rl:date (e.g. index.html, regulatory-tracker.html) are not listed as articles.
Run:  python3 _scripts/build_news.py && python3 _scripts/sync_layout.py
"""
from pathlib import Path
from datetime import datetime, timezone
from html import escape, unescape
from email.utils import format_datetime
import re

ROOT = Path(__file__).resolve().parent.parent
NEWS = ROOT / "news"
SITE = "https://hayesskvaril-ctrl.github.io"


def meta(s, name):
    m = re.search(rf'<meta name="{re.escape(name)}" content="([^"]*)"', s)
    return m.group(1).strip() if m else ""


def text(fragment):
    return unescape(re.sub(r"<[^>]+>", "", fragment)).strip()


articles = []
for p in sorted(NEWS.glob("*.html")):
    s = p.read_text(encoding="utf-8")
    date = meta(s, "rl:date")
    if not date:
        continue
    articles.append({
        "url": f"/news/{p.name}",
        "title": text(re.search(r"<h1>(.*?)</h1>", s, re.S).group(1)),
        "summary": text(re.search(r'<p class="summary">(.*?)</p>', s, re.S).group(1)),
        "type": meta(s, "rl:type") or "Update",
        "tags": [t.strip() for t in meta(s, "rl:tags").split(",") if t.strip()],
        "date": datetime.strptime(date, "%Y-%m-%d"),
    })
articles.sort(key=lambda a: (a["date"], a["title"]), reverse=True)


def nice(d):
    return f"{d.day} {d.strftime('%B %Y')}"


items = []
for a in articles:
    tags = "".join(f'<span class="news-tag">{escape(t)}</span>' for t in a["tags"])
    items.append(f'''    <li class="news-item" data-type="{escape(a["type"].lower())}">
      <p class="news-kicker"><span class="badge news-type news-{escape(a["type"].lower())}">{escape(a["type"])}</span> <time datetime="{a["date"]:%Y-%m-%d}">{nice(a["date"])}</time></p>
      <h3><a href="{a["url"]}">{escape(a["title"])}</a></h3>
      <p>{escape(a["summary"])}</p>
      <p class="news-tags">{tags}</p>
    </li>''')

types = sorted({a["type"] for a in articles})
filter_buttons = "".join(
    f'<button type="button" class="secondary" data-filter="{escape(t.lower())}" aria-pressed="false">{escape(t)}</button>' for t in types)
latest = nice(articles[0]["date"]) if articles else "—"

html = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>News and regulatory updates | RiskLens Australia</title>
<meta name="description" content="Plain-English news and commentary on Australian risk, compliance and governance: APRA and ASIC updates, a regulatory changes tracker, monthly roundups and analysis of major developments.">
<link rel="alternate" type="application/rss+xml" title="RiskLens Australia news" href="/news/feed.xml">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>News</li></ol></nav>

  <h1>News and regulatory updates</h1>
  <p class="summary">What's changing in Australian risk, compliance and governance, explained in plain English, with links to the official sources.</p>
  <div class="page-meta">
    <span class="level level-beginner">Beginner</span>
    <span>Latest update: {latest}</span>
  </div>

  <h2 class="visually-hidden">Tracker</h2>
  <div class="cards">
<!-- CARD href="/news/regulatory-tracker.html" level="Intermediate" -->
<a class="card" href="/news/regulatory-tracker.html">
  <h3>Regulatory changes tracker</h3>
  <p>Recent and upcoming changes from APRA, ASIC and others, with status and key dates.</p>
  <span class="level level-intermediate">Intermediate</span>
</a>
<!-- /CARD -->
  </div>

  <div class="callout">
    <h2>News is general information</h2>
    <p>Articles summarise developments as at their publication date and are not advice. Proposals can change before they are finalised, so always check the official source. Commentary pieces are clearly labelled and reflect RiskLens Australia's analysis.</p>
  </div>

  <h2>Latest</h2>
  <div class="news-filter" role="group" aria-label="Filter by type">
    <button type="button" class="secondary" data-filter="all" aria-pressed="true">All</button>{filter_buttons}
  </div>
  <ol class="news-list">
{chr(10).join(items)}
  </ol>
  <p class="small">Follow new articles with the <a href="/news/feed.xml">RSS feed</a> in any free feed reader.</p>

  <p class="last-reviewed">Last updated: {latest}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

<script src="/scripts/news-filter.js"></script>
</body>
</html>
'''
(NEWS / "index.html").write_text(html, encoding="utf-8")

# Home page strip: the three latest articles, between <!-- NEWS:START --> and <!-- NEWS:END -->.
home = ROOT / "index.html"
h = home.read_text(encoding="utf-8")
cards = "\n".join(f'''    <a class="card news-card" href="{a["url"]}">
      <span class="news-kicker"><span class="badge news-type news-{escape(a["type"].lower())}">{escape(a["type"])}</span> <time datetime="{a["date"]:%Y-%m-%d}">{nice(a["date"])}</time></span>
      <h3>{escape(a["title"])}</h3>
      <p>{escape(a["summary"])}</p>
    </a>''' for a in articles[:3])
strip = ("<!-- NEWS:START -->\n  <div class=\"cards\">\n" + cards + "\n  </div>\n"
         '  <p><a href="/news/">All news</a> · <a href="/news/regulatory-tracker.html">Regulatory changes tracker</a></p>\n<!-- NEWS:END -->')
h = re.sub(r"<!-- NEWS:START -->.*?<!-- NEWS:END -->", lambda m: strip, h, flags=re.S)
home.write_text(h, encoding="utf-8")

now = format_datetime(datetime.now(timezone.utc))
rss_items = "\n".join(f'''    <item>
      <title>{escape(a["title"])}</title>
      <link>{SITE}{a["url"]}</link>
      <guid>{SITE}{a["url"]}</guid>
      <pubDate>{format_datetime(a["date"].replace(tzinfo=timezone.utc))}</pubDate>
      <category>{escape(a["type"])}</category>
      <description>{escape(a["summary"])}</description>
    </item>''' for a in articles)
rss = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RiskLens Australia: News and regulatory updates</title>
    <link>{SITE}/news/</link>
    <description>Plain-English news and commentary on Australian risk, compliance and governance.</description>
    <language>en-au</language>
    <lastBuildDate>{now}</lastBuildDate>
{rss_items}
  </channel>
</rss>
'''
(NEWS / "feed.xml").write_text(rss, encoding="utf-8")
print(f"wrote news/index.html and news/feed.xml ({len(articles)} articles)")
