"""Shared helpers for the yearly review system (used by sync_layout.py and review_report.py)."""
import datetime
import re

MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]
DATE_RE = re.compile(r"\b(\d{1,2}) (" + "|".join(MONTHS) + r") (20\d\d)\b")
LAST_REVIEWED_RE = re.compile(r'<p class="last-reviewed">Last (?:reviewed|updated): (\d{1,2} [A-Z][a-z]+ 20\d\d)')
REVIEW_MONTHS = 12

# News articles are dated snapshots and are not re-reviewed; the listing and tracker are.
NOT_REVIEWED_PREFIX = "/news/"
REVIEWED_NEWS = {"/news/", "/news/regulatory-tracker.html"}
# Pages with no content of their own to review (they are rebuilt from other pages).
NO_REVIEW = {"/", "/search/", "/404.html", "/whats-new/"}


def parse_date(text):
    m = DATE_RE.search(text)
    if not m:
        return None
    return datetime.date(int(m.group(3)), MONTHS.index(m.group(2)) + 1, int(m.group(1)))


def add_months(d, n):
    y, m = divmod(d.month - 1 + n, 12)
    y += d.year
    m += 1
    last = [31, 29 if y % 4 == 0 and (y % 100 or y % 400 == 0) else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]
    return datetime.date(y, m, min(d.day, last))


def fmt(d):
    return f"{d.day} {MONTHS[d.month - 1]} {d.year}"


def under_review(url):
    if url in NO_REVIEW:
        return False
    return not url.startswith(NOT_REVIEWED_PREFIX) or url in REVIEWED_NEWS


def last_reviewed(html):
    m = LAST_REVIEWED_RE.search(html)
    return parse_date(m.group(1)) if m else None


def review_due(html):
    d = last_reviewed(html)
    return add_months(d, REVIEW_MONTHS) if d else None
