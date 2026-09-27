#!/usr/bin/env python3
"""Yearly review report: which pages are due or overdue for review, and which pages mention
dates that have passed since the page was last reviewed (e.g. a commencement date that has now
arrived, so the page may still describe it as "upcoming").

Every page is due for review 12 months after its "Last reviewed" date (news articles are
dated snapshots and are skipped; the news listing and regulatory tracker are included).

Run:  python3 _scripts/review_report.py            (report on today's date)
      python3 _scripts/review_report.py 2027-03-01  (report as at another date)
"""
import datetime
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from review_common import DATE_RE, MONTHS, fmt, last_reviewed, review_due, under_review, add_months  # noqa: E402
from expert_reviews import EXPERT_REVIEWS  # noqa: E402
import re  # noqa: E402
from html import unescape  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SOON_DAYS = 60


def pages():
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT).as_posix()
        if rel.startswith(("_", ".")) or rel.split("/")[0] in {"assets", "scripts"} or rel == "404.html":
            continue
        yield "/" + (rel[: -len("index.html")] if rel.endswith("index.html") else rel), p.read_text(encoding="utf-8")


def visible_text(html):
    html = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", html, flags=re.S)
    html = re.sub(r'<section class="sources".*?</section>', " ", html, flags=re.S)
    html = re.sub(r'<p class="last-reviewed">.*?</p>|<div class="page-meta">.*?</div>', " ", html, flags=re.S)
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", " ", html)))


def main():
    today = datetime.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else datetime.date.today()
    overdue, soon, missing, passed = [], [], [], []
    for url, html in pages():
        if not under_review(url):
            continue
        lr, due = last_reviewed(html), review_due(html)
        if not lr:
            missing.append(url)
            continue
        if due <= today:
            overdue.append((due, url, lr))
        elif (due - today).days <= SOON_DAYS:
            soon.append((due, url, lr))
        text = visible_text(html)
        hits = []
        for m in DATE_RE.finditer(text):
            d = datetime.date(int(m.group(3)), MONTHS.index(m.group(2)) + 1, int(m.group(1)))
            if lr < d <= today:
                ctx = text[max(0, m.start() - 70): m.end() + 40].strip()
                hits.append((d, ctx))
        if hits:
            passed.append((url, lr, hits))

    print(f"RiskLens Australia review report as at {fmt(today)}\n")
    print(f"OVERDUE for yearly review ({len(overdue)})")
    for due, url, lr in sorted(overdue):
        print(f"  {url}  (last reviewed {fmt(lr)}, due {fmt(due)})")
    print(f"\nDUE within {SOON_DAYS} days ({len(soon)})")
    for due, url, lr in sorted(soon):
        print(f"  {url}  (due {fmt(due)})")
    print(f"\nDATES THAT HAVE PASSED since the page was last reviewed ({len(passed)} pages)")
    print("  Check the page still describes these correctly (e.g. no longer 'upcoming' or 'proposed').")
    for url, lr, hits in passed:
        print(f"  {url}  (last reviewed {fmt(lr)})")
        seen = set()
        for d, ctx in sorted(hits):
            if (d, ctx) in seen:
                continue
            seen.add((d, ctx))
            print(f"    - {fmt(d)}: ...{ctx}...")
    if missing:
        print(f"\nNO 'Last reviewed' DATE ({len(missing)})")
        for url in missing:
            print(f"  {url}")
    print(f"\nExpert reviewed: {len(EXPERT_REVIEWS)} page(s) signed off (list in _scripts/expert_reviews.py)")
    stale = [u for u, d in EXPERT_REVIEWS.items() if add_months(datetime.date(int(d.split()[2]), MONTHS.index(d.split()[1]) + 1, int(d.split()[0])), 12) <= today]
    for u in stale:
        print(f"  expert sign-off more than 12 months old: {u}")


if __name__ == "__main__":
    main()
