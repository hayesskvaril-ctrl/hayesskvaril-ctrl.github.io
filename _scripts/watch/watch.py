"""Weekly regulator watch. Runs on GitHub's free servers (.github/workflows/regulator-watch.yml),
which can reach regulator websites directly. Standard library only.

  python3 _scripts/watch/watch.py --state DIR [--site https://hayesskvaril-ctrl.github.io] [--offline]

1. Reads the official news and consultation pages in sources.json and lists announcements not seen before
   (state kept in DIR/seen.json), with the site pages each one may affect (from topics.json).
2. Looks for every fact in _scripts/facts/facts.json on its official source page, and records the results in
   DIR/auto_checks.json ("found", "not_found" or "error").
3. Writes DIR/latest_report.md, and DIR/issue_title.txt when there is something new for a person to look at.
"""
import argparse
import datetime
import gzip
import html
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
UA = "Mozilla/5.0 (compatible; RiskLensWatch/1.0; +https://hayesskvaril-ctrl.github.io; weekly check of public regulator pages)"
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
TODAY = datetime.date.today()


DEBUG = {}


def fetch(url, cache={}):
    if url in cache:
        return cache[url]
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                                               "Accept-Encoding": "gzip", "Accept-Language": "en-AU,en;q=0.9"})
    result = None
    for attempt in range(2):
        try:
            with urllib.request.urlopen(req, timeout=75) as r:
                body = r.read()
                if r.headers.get("Content-Encoding") == "gzip":
                    body = gzip.decompress(body)
                ctype = r.headers.get("Content-Type", "")
                result = (r.status, ctype, body.decode("utf-8", "replace") if "pdf" not in ctype else "")
                break
        except urllib.error.HTTPError as e:
            result = (e.code, "", "")
            if e.code in (403, 404, 410):
                break
        except Exception as e:  # network errors, timeouts
            result = (0, "", f"{type(e).__name__}: {e}")
        time.sleep(3)
    time.sleep(1.5)   # be polite
    cache[url] = result
    st, ctype, body = result
    t = re.search(r"(?is)<title[^>]*>(.*?)</title>", body or "")
    DEBUG[url] = {"status": st, "type": ctype, "length": len(body or ""),
                  "title": re.sub(r"\s+", " ", html.unescape(t.group(1))).strip()[:150] if t else "",
                  "text_start": text_of(body)[:600] if st == 200 else (body or "")[:200],
                  "hrefs": sorted(set(re.findall(r'href="([^"#]{8,200})"', body or "")))[:150],
                  "alternate": re.findall(r'<link[^>]+rel="alternate"[^>]*>', body or "")[:5]}
    return result


def text_of(page):
    page = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", page)
    t = html.unescape(re.sub(r"<[^>]+>", " ", page)).replace("\xa0", " ").replace("‑", "-")
    t = t.replace("–", "-").replace("—", "-")
    return re.sub(r"\s+", " ", t)


def variants(value):
    v = {value, value.replace("–", "-")}
    m = re.fullmatch(r"(\d{1,2}) ([A-Z][a-z]+) (\d{4})", value)
    if m and m.group(2) in MONTHS:
        d, mon, y = int(m.group(1)), m.group(2), m.group(3)
        mi = MONTHS.index(mon) + 1
        v |= {f"{d:02d} {mon} {y}", f"{d} {mon[:3]} {y}", f"{d:02d} {mon[:3]} {y}", f"{mon} {d}, {y}",
              f"{d}/{mi:02d}/{y}", f"{d:02d}/{mi:02d}/{y}", f"{y}-{mi:02d}-{d:02d}", f"{d} {mon}, {y}"}
    m = re.fullmatch(r"\$([\d.,]+) (million|billion)", value)
    if m:
        v |= {f"{m.group(1)} {m.group(2)}", f"${m.group(1)}{m.group(2)[0]}", f"${m.group(1)} {m.group(2)[0]}"}
    m = re.fullmatch(r"(\d+)%", value)
    if m:
        v |= {f"{m.group(1)} per cent", f"{m.group(1)} percent", f"{m.group(1)} %"}
    if value.startswith("$"):
        v.add(value[1:])
    return {x.lower() for x in v}


def feed_items(page, base):
    m = re.search(r'<link[^>]+type="application/(?:rss|atom)\+xml"[^>]*>', page, re.I)
    if not m:
        return None
    href = re.search(r'href="([^"]+)"', m.group(0))
    if not href:
        return None
    url = urllib.parse.urljoin(base, html.unescape(href.group(1)))
    st, _, body = fetch(url)
    if st != 200 or not body:
        return None
    items = []
    for block in re.findall(r"(?is)<(?:item|entry)\b.*?</(?:item|entry)>", body):
        t = re.search(r"(?is)<title[^>]*>(.*?)</title>", block)
        l = re.search(r"(?is)<link[^>]*>(.*?)</link>", block) or re.search(r'(?is)<link[^>]*href="([^"]+)"', block)
        if t and l:
            title = html.unescape(re.sub(r"<!\[CDATA\[|\]\]>|<[^>]+>", "", t.group(1))).strip()
            items.append((l.group(1).strip(), title))
    return items, url


def link_items(page, base, pattern):
    items = {}
    for href, inner in re.findall(r'(?is)<a\b[^>]*href="([^"#]+)"[^>]*>(.*?)</a>', page):
        url = urllib.parse.urljoin(base, html.unescape(href)).split("?")[0]
        if not re.match(pattern, url):
            continue
        title = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", inner))).strip()
        if len(title) < 12:     # "Read more" and similar: fall back to the address
            title = url.rstrip("/").rsplit("/", 1)[-1].replace("-", " ").capitalize()
        if url not in items or len(title) > len(items[url]):
            items[url] = title
    return list(items.items())


def kw_match(text, k):
    if sum(c.isupper() for c in k) >= 2:
        return re.search(r"(?<![A-Za-z0-9])" + re.escape(k) + r"(?![A-Za-z0-9])", text) is not None
    return k.lower() in text.lower()


def suggest_pages(title, url, topics):
    text = f" {title} {url.rsplit('/', 1)[-1].replace('-', ' ')} "
    score = {}
    for k, pages in topics.items():
        if kw_match(text, k):
            for p in pages:
                score[p] = score.get(p, 0) + (2 if sum(c.isupper() for c in k) >= 2 else 1)
    return [p for p, _ in sorted(score.items(), key=lambda x: -x[1])][:5]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--state", required=True)
    ap.add_argument("--site", default="https://hayesskvaril-ctrl.github.io")
    ap.add_argument("--offline", action="store_true", help="test run without network access")
    a = ap.parse_args()
    state = Path(a.state)
    state.mkdir(parents=True, exist_ok=True)
    (state / "issue_title.txt").unlink(missing_ok=True)
    sources = json.loads((HERE / "sources.json").read_text())["sources"]
    topics = json.loads((HERE / "topics.json").read_text())
    facts = json.loads((ROOT / "_scripts/facts/facts.json").read_text())["facts"]
    seen = json.loads((state / "seen.json").read_text()) if (state / "seen.json").exists() else {}
    prev = json.loads((state / "auto_checks.json").read_text()).get("facts", {}) if (state / "auto_checks.json").exists() else {}
    if a.offline:
        global fetch
        fetch = lambda url, cache={}: (0, "", "offline")

    # 1. announcements
    new, baseline, unreadable, counts = {}, [], [], {}
    for src in sources:
        name, found, used = src["name"], {}, []
        for page_url in src["pages"]:
            st, ctype, page = fetch(page_url)
            if st != 200 or not page:
                used.append(f"{page_url} ({st or page[:60]})")
                continue
            fi = feed_items(page, page_url)
            items = fi[0] if fi else link_items(page, page_url, src["pattern"])
            used.append(f"{page_url} ({'feed ' + fi[1] if fi else 'links'}: {len(items)})")
            for u, t in items:
                found.setdefault(u, t)
        counts[name] = (len(found), used)
        if not found:
            unreadable.append(f"{name}: nothing found ({'; '.join(used)})")
            continue
        if name not in seen:
            baseline.append(f"{name}: {len(found)} current items recorded as the starting point")
            seen[name] = list(found)
            continue
        fresh = [(u, t) for u, t in found.items() if u not in set(seen[name])]
        if fresh:
            new[name] = fresh
        seen[name] = (list(found) + [u for u in seen[name] if u not in found])[:600]

    # 2. facts on their official sources
    results = {}
    for f in facts:
        url = f["source"]["url"]
        if url.lower().endswith(".pdf"):
            results[f["id"]] = {"date": TODAY.isoformat(), "result": "skipped", "detail": "PDF source: check by hand", "url": url}
            continue
        st, ctype, page = fetch(url)
        if st != 200 or not page:
            results[f["id"]] = {"date": TODAY.isoformat(), "result": "error", "detail": f"could not read the source ({st or page[:80]})", "url": url}
            continue
        t = text_of(page).lower()
        ok = any(v in t for v in variants(f["value"]))
        if not ok:
            m = re.search(r"([A-Z][a-z]+ \d{4})$", f["value"])
            key = (m.group(1) if m else f["value"]).lower()
            near = [text_of(page)[max(0, i - 90): i + 90] for i in [mm.start() for mm in re.finditer(re.escape(key), t)][:4]]
            DEBUG.setdefault(url, {})["near_" + f["id"]] = near
        results[f["id"]] = {"date": TODAY.isoformat(), "result": "found" if ok else "not_found",
                            "detail": "" if ok else f"'{f['value']}' does not appear on the source page", "url": url}

    # 3. report
    by_id = {f["id"]: f for f in facts}
    not_found = [k for k, r in results.items() if r["result"] == "not_found"]
    newly = [k for k in not_found if prev.get(k, {}).get("result") != "not_found"]
    errors = [k for k, r in results.items() if r["result"] == "error"]
    found = [k for k, r in results.items() if r["result"] == "found"]
    n_new = sum(len(v) for v in new.values())
    L = [f"# Regulator watch, {TODAY.day} {MONTHS[TODAY.month - 1]} {TODAY.year}", ""]
    L += ["Automatic weekly check of official announcements and of the key facts register. "
          "To act on it, ask Claude to \"process the regulator watch issue\": each item is checked against the "
          "official source, pages are updated if needed, and the issue is closed with a note of what changed.", ""]
    L += [f"## New announcements ({n_new})", ""]
    if not new:
        L += ["None since the last check.", ""]
    for name, items in new.items():
        L += [f"### {name}", ""]
        for u, t in items[:40]:
            pages = suggest_pages(t, u, topics)
            pl = ", ".join(f"[{p}]({a.site}{p})" for p in pages)
            L.append(f"- [ ] [{t}]({u})" + (f"  \n  May affect: {pl}" if pl else "  \n  No obvious page match"))
        L.append("")
    L += [f"## Key facts not found on their official source ({len(not_found)}, {len(newly)} new this week)", ""]
    if not not_found:
        L += ["None.", ""]
    else:
        L += ["The value below did not appear on the fact's source page. The fact may have changed, the page may word it "
              "differently, or the source page may have moved. Check by hand, then run update_fact.py.", ""]
        for k in sorted(not_found, key=lambda k: k not in newly):
            f = by_id[k]
            L.append(f"- [ ] {'**New:** ' if k in newly else ''}`{k}`: {f['fact']}: **{f['value']}** ([source]({f['source']['url']}))")
        L.append("")
    if errors:
        L += [f"## Fact sources that could not be read ({len(errors)})", ""]
        for k in errors:
            L.append(f"- `{k}`: {results[k]['detail']} ({results[k]['url']})")
        L.append("")
    L += [f"## Confirmed on the official source: {len(found)} of {len(facts)} facts", ""]
    if baseline:
        L += ["## First run for these sources", ""] + [f"- {b}" for b in baseline] + [""]
    if unreadable:
        L += ["## Sources where nothing was found", "", "The page or its link pattern in `_scripts/watch/sources.json` may need updating.", ""]
        L += [f"- {u}" for u in unreadable] + [""]
    L += ["<details><summary>Sources read</summary>", ""]
    for name, (n, used) in counts.items():
        L.append(f"- {name}: {n} items from {'; '.join(used)}")
    L += ["", "</details>", ""]
    report = "\n".join(L)
    if len(report) > 60000:
        report = report[:60000] + "\n\n(Report shortened; see latest_report.md on the watch-data branch.)\n"

    (state / "seen.json").write_text(json.dumps(seen, indent=1) + "\n")
    (state / "auto_checks.json").write_text(json.dumps({"run": TODAY.isoformat(), "facts": results}, indent=1) + "\n")
    (state / "latest_report.md").write_text(report)
    (state / "debug.json").write_text(json.dumps(DEBUG, indent=1) + "\n")
    if n_new or newly:
        bits = []
        if n_new:
            bits.append(f"{n_new} new announcement{'s' if n_new != 1 else ''}")
        if newly:
            bits.append(f"{len(newly)} fact{'s' if len(newly) != 1 else ''} to check")
        (state / "issue_title.txt").write_text(f"Regulator watch {TODAY.isoformat()}: " + ", ".join(bits))
    print(f"new announcements: {n_new}; facts found {len(found)}, not found {len(not_found)} ({len(newly)} new), errors {len(errors)}")
    for name, (n, used) in counts.items():
        print(f"  {name}: {n} ({'; '.join(used)})")


if __name__ == "__main__":
    main()
