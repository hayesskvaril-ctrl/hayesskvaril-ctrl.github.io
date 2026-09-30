"""Builds research citations from the reference register (_scripts/references.py).

For every page it:
  * fills in each citation link, <a class="cite" href="#ref-KEY"></a>, as (Author, Year), or as
    Author (Year) for <a class="cite narrative" ...>, following APA 7th style
  * writes the page's References list (APA 7th, alphabetical, DOI links) between
    <!-- REFS:START --> and <!-- REFS:END --> markers, added before the Sources section the first time
  * fills each <ul class="further-reading" data-refs="KEY KEY"> list with full references and notes
It also writes learn/research-library.html, every source in the register grouped by topic.

Run:  python3 _scripts/build_references.py && python3 _scripts/sync_layout.py
      python3 _scripts/build_references.py --check   (report only; used by run_checks.py)
"""
from pathlib import Path
from html import escape
import datetime
import re
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(HERE))
from references import REFS, TOPICS  # noqa: E402

OUT = ROOT / "learn" / "research-library.html"
REVIEWED = "30 September 2026"
KINDS = {"article", "book", "chapter", "report"}
CITE_RE = re.compile(r'<a class="cite( narrative)?" href="#ref-([a-z0-9-]+)">(.*?)</a>', re.S)
BLOCK_RE = re.compile(r"<!-- REFS:START[^>]*-->.*?<!-- REFS:END -->", re.S)
FURTHER_RE = re.compile(r'(<ul class="further-reading" data-refs="([^"]*)">)(.*?)(</ul>)', re.S)
REQUIRED = ("Learning outcomes", "Theory and research", "Critical perspectives", "Seminar questions")


def validate():
    errs = []
    for k, r in REFS.items():
        if not re.fullmatch(r"[a-z0-9-]+", k):
            errs.append(f"{k}: key must be lowercase letters, digits and hyphens")
        if r.get("kind") not in KINDS:
            errs.append(f"{k}: kind must be one of {sorted(KINDS)}")
        for f in ("authors", "year", "title", "topics", "note", "checked"):
            if not r.get(f):
                errs.append(f"{k}: missing {f}")
        if "pr" not in r:
            errs.append(f"{k}: missing pr (peer-reviewed True/False)")
        if r.get("kind") == "article":
            for f in ("journal", "volume", "pages"):
                if not r.get(f):
                    errs.append(f"{k}: article missing {f}")
        if r.get("kind") in ("book", "report", "chapter") and not r.get("publisher"):
            errs.append(f"{k}: missing publisher")
        for t in r.get("topics", []):
            if t not in TOPICS:
                errs.append(f"{k}: unknown topic {t}")
        try:
            datetime.date.fromisoformat(r.get("checked", ""))
        except ValueError:
            errs.append(f"{k}: checked must be an ISO date")
        if r.get("doi", "").startswith("http"):
            errs.append(f"{k}: give the DOI without https://doi.org/")
    return errs


def esc(t):
    return escape(str(t), quote=False)


def surname(a):
    return a.split(",")[0].strip()


def year_label(r):
    return str(r.get("year_label") or r["year"])


def intext(key, narrative=False):
    r = REFS[key]
    names = [esc(surname(a)) for a in r["authors"]]
    y = year_label(r)
    if len(names) == 1:
        who_p = who_n = names[0]
    elif len(names) == 2:
        who_p, who_n = f"{names[0]} &amp; {names[1]}", f"{names[0]} and {names[1]}"
    else:
        who_p = who_n = f"{names[0]} et al."
    return f"{who_n} ({y})" if narrative else f"{who_p}, {y}"


def author_list(authors):
    a = [esc(x) for x in authors]
    if len(a) == 1:
        return a[0]
    if len(a) > 20:
        return ", ".join(a[:19]) + ", … " + a[-1]
    return ", ".join(a[:-1]) + ", &amp; " + a[-1]


def end(t):
    return t if t[-1:] in "?!." else t + "."


def link(r):
    if r.get("doi"):
        d = escape(r["doi"])
        return f' <a href="https://doi.org/{d}">https://doi.org/{d}</a>'
    if r.get("url"):
        u = escape(r["url"])
        return f' <a href="{u}">{u}</a>'
    return ""


def apa(key):
    r = REFS[key]
    head = f"{author_list(r['authors'])} ({year_label(r)}). "
    kind = r["kind"]
    if kind == "article":
        vol = f"<em>{esc(r['volume'])}</em>" + (f"({esc(r['issue'])})" if r.get("issue") else "")
        body = f"{esc(end(r['title']))} <em>{esc(r['journal'])}</em>, {vol}, {esc(r['pages'])}."
    elif kind == "chapter":
        eds = r.get("editors", [])
        ed = (" &amp; ".join(esc(e) for e in eds) + (" (Eds.), " if len(eds) > 1 else " (Ed.), ")) if eds else ""
        pp = f" (pp. {esc(r['pages'])})" if r.get("pages") else ""
        body = f"{esc(end(r['title']))} In {ed}<em>{esc(r['book'])}</em>{pp}. {esc(r['publisher'])}."
    else:
        extra = f" ({esc(r['edition'])} ed.)" if r.get("edition") else ""
        extra += f" ({esc(r['number'])})" if r.get("number") else ""
        title = r["title"]
        body = f"<em>{esc(title)}</em>{extra}. {esc(r['publisher'])}." if title[-1:] not in "?!" else \
            f"<em>{esc(title)}</em>{extra} {esc(r['publisher'])}."
    return head + body + link(r)


def sort_key(k):
    r = REFS[k]
    return (re.sub(r"[^a-z]", "", surname(r["authors"][0]).lower()), [surname(a).lower() for a in r["authors"][1:]], str(r["year"]), r["title"].lower())


def pr_tag(k):
    return ' <span class="ref-pr">Peer-reviewed</span>' if REFS[k]["pr"] else ""


def ref_block(keys):
    items = "\n".join(f'      <li id="ref-{k}">{apa(k)}{pr_tag(k)}</li>' for k in sorted(keys, key=sort_key))
    return ('<!-- REFS:START (built by _scripts/build_references.py from references.py: do not edit by hand) -->\n'
            '  <section class="references" aria-labelledby="refs-h">\n'
            '    <h2 id="refs-h">References</h2>\n'
            '    <p class="small">Research cited on this page, in APA 7th style. Articles marked peer-reviewed were published in peer-reviewed journals. '
            'More in the <a href="/learn/research-library.html">Research library</a>.</p>\n'
            f'    <ul class="ref-list">\n{items}\n    </ul>\n  </section>\n  <!-- REFS:END -->')


def further(keys):
    return "\n" + "\n".join(f'    <li>{apa(k)}{pr_tag(k)}<br><span class="small">{esc(REFS[k]["note"])}</span></li>' for k in keys) + "\n  "


def page_url(p):
    rel = p.relative_to(ROOT).as_posix()
    return "/" + (rel[:-len("index.html")] if rel.endswith("index.html") else rel)


def pages():
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT).as_posix()
        if rel.split("/")[0] in {"_scripts", "assets"} or p == OUT:
            continue
        yield p


def process(html, url, problems):
    cited = []

    def fill(m):
        narrative, key = bool(m.group(1)), m.group(2)
        if key not in REFS:
            problems.append(f"{url}: cites unknown reference '{key}'")
            return m.group(0)
        if key not in cited:
            cited.append(key)
        return f'<a class="cite{" narrative" if narrative else ""}" href="#ref-{key}">{intext(key, narrative)}</a>'

    html = CITE_RE.sub(fill, html)

    def fr(m):
        keys = m.group(2).split()
        bad = [k for k in keys if k not in REFS]
        if bad:
            problems.append(f"{url}: further reading lists unknown reference(s) {', '.join(bad)}")
            return m.group(0)
        return m.group(1) + further(keys) + m.group(4)

    html = FURTHER_RE.sub(fr, html)
    blk = ref_block(cited) if cited else ""
    if BLOCK_RE.search(html):
        html = BLOCK_RE.sub(lambda m: blk, html, count=1)
    elif blk:
        for anchor in ('<section class="sources"', '<section class="related"', '<p class="last-reviewed"'):
            i = html.find(anchor)
            if i != -1:
                line = html.rfind("\n", 0, i) + 1
                html = html[:line] + "  " + blk + "\n\n" + html[line:]
                break
        else:
            problems.append(f"{url}: nowhere to put the reference list")
    return html, cited


def level_of(html):
    m = re.search(r'<div class="page-meta">\s*<span class="level level-(\w+)">', html)
    return m.group(1) if m else ""


def audit(texts):
    """Problems with Advanced pages: fewer than three peer-reviewed sources, or missing sections."""
    out = []
    for url, html in texts.items():
        if level_of(html) != "advanced":
            continue
        keys = {m.group(2) for m in CITE_RE.finditer(html) if m.group(2) in REFS}
        n = sum(1 for k in keys if REFS[k]["pr"])
        missing = [s for s in REQUIRED if not re.search(r"<h2[^>]*>\s*" + re.escape(s), html)]
        if n < 3 or missing:
            why = []
            if n < 3:
                why.append(f"{n} peer-reviewed source{'s' if n != 1 else ''} cited (needs 3)")
            if missing:
                why.append("missing " + ", ".join(missing))
            out.append(f"{url}: " + "; ".join(why))
    return out


def library(cited_on):
    total = len(REFS)
    prn = sum(1 for r in REFS.values() if r["pr"])
    sections = []
    for tk, tname in TOPICS.items():
        keys = sorted([k for k, r in REFS.items() if r["topics"][0] == tk], key=sort_key)
        if not keys:
            continue
        lis = []
        for k in keys:
            r = REFS[k]
            also = [TOPICS[t] for t in r["topics"][1:]]
            where = cited_on.get(k, [])
            cited = ("<br><span class=\"small\">Cited on: " + ", ".join(f'<a href="{u}">{escape(t)}</a>' for u, t in where) + "</span>") if where else ""
            also_s = f'<br><span class="small">Also relevant to: {escape("; ".join(also))}</span>' if also else ""
            lis.append(f'      <li id="ref-{k}">{apa(k)}{pr_tag(k)}<br><span class="ref-note">{esc(r["note"])}</span>{also_s}{cited}</li>')
        sections.append(f'  <h2 id="{tk}">{escape(tname)}</h2>\n    <ul class="ref-list library">\n' + "\n".join(lis) + "\n    </ul>")
    jump = " · ".join(f'<a href="#{tk}">{escape(t)}</a>' for tk, t in TOPICS.items() if any(r["topics"][0] == tk for r in REFS.values()))
    return f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Research library | RiskLens Australia</title>
<meta name="description" content="An annotated reading list of the peer-reviewed research and scholarly books behind RiskLens Australia's Advanced pages, grouped by topic, with plain-English summaries and DOI links.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/learn/">Learn</a></li><li>Research library</li></ol></nav>

  <h1>Research library</h1>
  <p class="summary">The research behind the Advanced pages: {total} sources, {prn} of them peer-reviewed journal articles, each with a short summary in plain English.</p>
  <div class="page-meta">
    <span class="level level-advanced">Advanced</span>
    <span>{total} sources</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">How to use this list</h2>
    <ul>
      <li>Every source here is cited on at least one page, or recommended as further reading. Each was checked to exist, with its details confirmed against the publisher or an index such as PubMed, before it was added.</li>
      <li>References follow APA 7th style. The DOI link goes to the publisher's page. Many articles are paywalled, but university and state libraries often give free access, and authors often share accepted versions on their own or their university's website.</li>
      <li>The summaries are our own short descriptions, not the authors' abstracts. Read the original before relying on a finding.</li>
      <li>Peer review is a quality filter, not a guarantee. Look at how each study was done, where and when, and whether later research agrees.</li>
    </ul>
  </aside>

  <p>Topics: {jump}</p>

{chr(10).join(sections)}

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li><a href="/learn/by-level.html">Browse by level</a></li>
      <li><a href="/learn/pathways.html">Learning pathways</a></li>
      <li><a href="/tools/resource-library.html">Resource library</a></li>
    </ul>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->
</body>
</html>
'''


def main(check=False):
    errs = validate()
    if errs:
        print("Reference register problems:\n  " + "\n  ".join(errs))
        return 1
    problems, changed, cited_on, texts = [], [], {}, {}
    for p in pages():
        url = page_url(p)
        html = p.read_text(encoding="utf-8")
        new, cited = process(html, url, problems)
        texts[url] = new
        title = re.sub(r"<[^>]+>", "", (re.search(r"<h1[^>]*>(.*?)</h1>", new, re.S) or [None, url])[1]).strip()
        for k in cited:
            cited_on.setdefault(k, []).append((url, title))
        for m in FURTHER_RE.finditer(new):
            for k in m.group(2).split():
                if k in REFS and (url, title) not in cited_on.setdefault(k, []):
                    cited_on[k].append((url, title))
        if new != html:
            changed.append(url)
            if not check:
                p.write_text(new, encoding="utf-8")
    lib = library(cited_on)
    lib_changed = not OUT.exists() or _entries(OUT.read_text(encoding="utf-8")) != _entries(lib)
    if lib_changed and not check:
        OUT.write_text(lib, encoding="utf-8")
    unused = sorted(k for k in REFS if k not in cited_on)
    if check:
        for u in changed:
            problems.append(f"{u}: citations or reference list out of date (run build_references.py)")
        if lib_changed:
            problems.append("learn/research-library.html is out of date (run build_references.py)")
        problems += audit(texts)
        for p in problems:
            print(p)
        return 1 if problems else 0
    for p in problems:
        print("PROBLEM:", p)
    print(f"{len(REFS)} sources ({sum(1 for r in REFS.values() if r['pr'])} peer-reviewed); "
          f"{len(changed)} page(s) updated; research library {'rebuilt' if lib_changed else 'unchanged'}"
          + (f"; not yet cited anywhere: {', '.join(unused)}" if unused else ""))
    return 1 if problems else 0


def _entries(s):
    """The generated part of the Research library page (the summary and the lists)."""
    a, b = s.find('<p class="summary">'), s.find('<section class="related"')
    return re.sub(r"<span class=\"review-due\">.*?</span>", "", s[a:b])


if __name__ == "__main__":
    sys.exit(main(check="--check" in sys.argv))
