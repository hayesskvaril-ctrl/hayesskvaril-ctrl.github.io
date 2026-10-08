"""Key facts register: keep every copy of a fact identical, and publish the register.

  python3 _scripts/build_facts.py          stamp every <span class="fact" data-fact="ID"> with the value in
                                           _scripts/facts/facts.json, write the where-used index, the public
                                           page /about/fact-register.html and the watch topics file
  python3 _scripts/build_facts.py --wrap   also wrap plain mentions of each fact (where the surrounding
                                           sentence or cell mentions one of the fact's context words) in a
                                           fact span, so future updates reach them automatically

sync_layout.py runs the default mode on every sync. Edit facts with update_fact.py.
"""
import datetime
import html
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import facts_lib as L

ROOT = L.ROOT
TODAY = datetime.date.today()


def wrap_page(page_html, facts):
    """Wrap unwrapped mentions of each fact in a fact span. A mention is wrapped only when exactly one
    fact with that value matches the surrounding block's context; ambiguous ones are reported.
    Returns (new_html, {id: count}, [ambiguous snippets])."""
    counts, ambiguous = {}, []
    by_value = {}
    for f in facts:
        by_value.setdefault(f["value"], []).append(f)
    for value, group in by_value.items():
        pat = L.value_pattern(value)
        toks = L.tokens(page_html)
        btext = L.block_texts(toks)
        # the page's own title counts as context, so a CPS 230 page's dates can link to CPS 230 facts
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", page_html, re.S)
        page_ctx = " " + html.unescape(re.sub(r"<[^>]+>", "", h1.group(1))) if h1 else ""
        if not re.fullmatch(r"\d{1,2} [A-Z][a-z]+ \d{4}", value):
            page_ctx = ""   # only full dates borrow the page title as context; amounts and durations are too generic
        out, in_fact, changed = [], False, False
        for kind, s, b, skip in toks:
            if kind == "tag":
                if s.startswith('<span class="fact"'):
                    in_fact = True
                elif in_fact and s == "</span>":
                    in_fact = False
                out.append(s)
                continue
            if skip or in_fact or not pat.search(s):
                out.append(s)
                continue
            ctx = btext.get(b, "") + page_ctx
            low = ctx.lower()
            cands = [f for f in group if L.in_context(ctx, f["context"])
                     and not any(x.lower() in low for x in f.get("exclude", []))]
            if len(cands) == 1:
                fid = cands[0]["id"]
                new, k = pat.subn(lambda m: f'<span class="fact" data-fact="{fid}">{m.group(0)}</span>', s)
                counts[fid] = counts.get(fid, 0) + k
                out.append(new)
                changed = True
            else:
                if len(cands) > 1:
                    ambiguous.append(f"{value} could be {' or '.join(c['id'] for c in cands)}: {re.sub(chr(10), ' ', ctx)[:120]}")
                out.append(s)
        if changed:
            page_html = "".join(out)
    return page_html, counts, ambiguous


def main():
    wrap = "--wrap" in sys.argv
    data = L.load()
    facts = data["facts"]
    ids = L.by_id(data)
    problems = []
    seen_ids = set()
    for f in facts:
        if f["id"] in seen_ids:
            problems.append(f"duplicate fact id {f['id']}")
        seen_ids.add(f["id"])
        for k in ("id", "topic", "fact", "value", "status", "context", "source", "checked"):
            if k not in f:
                problems.append(f"{f.get('id')}: missing {k}")
        if f.get("checked", {}).get("how") not in L.HOW_LABEL:
            problems.append(f"{f['id']}: checked.how must be one of {', '.join(L.HOW_LABEL)}")
        if f.get("status") not in L.STATUS_LABEL:
            problems.append(f"{f['id']}: status must be one of {', '.join(L.STATUS_LABEL)}")

    where = {f["id"]: [] for f in facts}
    wrapped_total = {}
    for path, url in L.published_pages():
        if url == "/about/fact-register.html":
            continue
        s = path.read_text(encoding="utf-8")
        orig = s
        if wrap and "<main" in s and L.wrappable(url):
            i, j = s.index("<main"), s.index("</main>") if "</main>" in s else len(s)
            body, counts, amb = wrap_page(s[i:j], facts)
            s = s[:i] + body + s[j:]
            for k, v in counts.items():
                wrapped_total.setdefault(k, []).append((url, v))
            for a in amb:
                print(f"  AMBIGUOUS on {url}: {a}")

        def stamp(m):
            fid = m.group(1)
            if fid not in ids:
                problems.append(f"{url}: unknown fact id '{fid}'")
                return m.group(0)
            where[fid].append(url)
            return f'<span class="fact" data-fact="{fid}">{html.escape(ids[fid]["value"], quote=False)}</span>'
        s = L.SPAN_RE.sub(stamp, s)
        if s != orig:
            path.write_text(s, encoding="utf-8")

    where = {k: sorted(set(v)) for k, v in where.items()}
    (ROOT / "_scripts/facts/where_used.json").write_text(json.dumps(where, indent=1) + "\n", encoding="utf-8")
    write_public_page(facts, where)
    write_topics(facts)

    if wrap:
        for fid, lst in sorted(wrapped_total.items()):
            print(f"  wrapped {fid}: " + ", ".join(f"{u} ({n})" for u, n in lst))
    used = sum(1 for v in where.values() if v)
    print(f"facts register: {len(facts)} facts, {used} shown on pages, {sum(len(v) for v in where.values())} page uses")
    for p in problems:
        print("  PROBLEM:", p)
    return len(problems)


def write_topics(facts):
    """Keywords the weekly regulator watch uses to suggest which pages an announcement may affect."""
    topics = {}
    where = json.loads((ROOT / "_scripts/facts/where_used.json").read_text())
    for f in facts:
        for k in f["context"]:
            if len(k) >= 3:
                topics.setdefault(k, set()).update(where.get(f["id"], []))
    # Standards and regulatory guides: their short names map to their own page
    for p in sorted((ROOT / "standards").glob("*.html")):
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", p.read_text(encoding="utf-8"), re.S)
        if not h1:
            continue
        t = html.unescape(re.sub(r"<[^>]+>", "", h1.group(1)))
        for code in re.findall(r"\b((?:CPS|SPS|APS|GPS|LPS|HPS|CPG|SPG)\s?\d{3}|RG\s?\d{1,3}|ISO(?:/IEC)? \d{4,5})\b", t):
            topics.setdefault(code, set()).add("/standards/" + p.name)
    extra = json.loads((ROOT / "_scripts/watch/extra_topics.json").read_text())
    for k, pages in extra.items():
        topics.setdefault(k, set()).update(pages)
    out = {k: sorted(v) for k, v in sorted(topics.items()) if v}
    (ROOT / "_scripts/watch/topics.json").write_text(json.dumps(out, indent=1) + "\n", encoding="utf-8")


def write_public_page(facts, where):
    auto = L.load_auto()
    tpl = (ROOT / "_scripts/page-template.html").read_text()
    head = tpl[:tpl.index("<title>")]
    topics = []
    for f in facts:
        if f["topic"] not in topics:
            topics.append(f["topic"])
    counts = {}
    for f in facts:
        counts[f["checked"]["how"]] = counts.get(f["checked"]["how"], 0) + 1
    sections = []
    for t in topics:
        rows = []
        for f in [x for x in facts if x["topic"] == t]:
            checked = L.parse_iso(f["checked"]["date"])
            how = L.HOW_LABEL[f["checked"]["how"]]
            a = auto.get(f["id"])
            if a and a.get("result") == "found" and L.parse_iso(a["date"]) and L.parse_iso(a["date"]) >= checked \
                    and f["checked"]["how"] in ("secondary", "auto"):
                checked, how = L.parse_iso(a["date"]), L.HOW_LABEL["auto"]
            pages = where.get(f["id"], [])
            used = ", ".join(f'<a href="{u}">{html.escape(page_title(u))}</a>' for u in pages[:4])
            if len(pages) > 4:
                used += f" and {len(pages) - 4} more"
            rows.append(
                f'        <tr><td>{html.escape(f["fact"])}</td><td><strong>{html.escape(f["value"])}</strong></td>'
                f'<td>{L.STATUS_LABEL[f["status"]]}</td><td>{L.human(checked)}<br><span class="small">{html.escape(how)}</span></td>'
                f'<td><a href="{html.escape(f["source"]["url"])}">{html.escape(f["source"]["label"])}</a></td>'
                f'<td>{used or "&nbsp;"}</td></tr>')
        sections.append(f'''  <h2>{html.escape(t)}</h2>
  <div class="table-wrap" tabindex="0">
    <table class="fact-table">
      <thead><tr><th scope="col">Fact</th><th scope="col">Current position</th><th scope="col">Status</th><th scope="col">Last checked</th><th scope="col">Source</th><th scope="col">Shown on</th></tr></thead>
      <tbody>
{chr(10).join(rows)}
      </tbody>
    </table>
  </div>
''')
    today = L.human(TODAY)
    summary_bits = ", ".join(f"{n} {L.HOW_LABEL[k].split(';')[0].split(' (')[0].lower()}" for k, n in sorted(counts.items()))
    page = head + f'''<title>Key facts register | RiskLens Australia</title>
<meta name="description" content="The key regulatory dates, amounts and limits used across RiskLens Australia, with their official source and when and how each was last checked.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/about/">About</a></li><li>Key facts register</li></ol></nav>

  <h1>Key facts register</h1>
  <p class="summary">The regulatory dates, amounts and limits that appear across this site, each with its official source and when and how it was last checked.</p>
  <div class="page-meta">
    <span>{len(facts)} facts</span>
    <span>Last updated: {today}</span>
  </div>

  <h2>How this works</h2>
  <p>Key facts such as commencement dates, consultation deadlines, thresholds and penalty amounts are kept in one register. Every page that mentions a fact takes it from the register, so when something changes it is updated once and every page changes together.</p>
  <ul>
    <li><strong>Watching for change:</strong> every week an automatic check reads the latest announcements from APRA, ASIC, AUSTRAC, the OAIC, the ACCC and Treasury and flags anything that may affect a page.</li>
    <li><strong>Checking against the source:</strong> the same weekly check looks for each fact on its official source page. Facts it can't find there are checked by hand.</li>
    <li><strong>Re-checking on a timetable:</strong> proposals and consultations are re-checked at least monthly, and facts that are in force at least yearly.</li>
  </ul>
  <p>Each fact shows how it was last checked: <strong>Official source</strong> (read on the regulator's or legislation website), <strong>Found on official source (automatic check)</strong>, <strong>Expert reviewed</strong>, or <strong>Secondary sources; official check pending</strong> (confirmed through reliable secondary sources such as law firm summaries, and waiting for an official-source check).</p>
  <p class="small">Currently: {html.escape(summary_bits)}.</p>
  <p>Spotted something out of date? <a href="https://github.com/hayesskvaril-ctrl/hayesskvaril-ctrl.github.io/issues/new?template=regulatory-change.yml">Report a regulatory change</a> (free GitHub account needed). See also <a href="/about/editorial-standards.html">how we check content</a> and the <a href="/news/regulatory-tracker.html">regulatory tracker</a>.</p>

{chr(10).join(sections)}
  <p class="last-reviewed">Last updated: {today}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
'''
    (ROOT / "about/fact-register.html").write_text(page, encoding="utf-8")


_titles = {}


def page_title(url):
    if url not in _titles:
        p = ROOT / (url.lstrip("/") + ("index.html" if url.endswith("/") else ""))
        t = ""
        try:
            m = re.search(r"<h1[^>]*>(.*?)</h1>", p.read_text(encoding="utf-8"), re.S)
            t = html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else url
        except OSError:
            t = url
        _titles[url] = t
    return _titles[url]


if __name__ == "__main__":
    sys.exit(1 if main() else 0)
