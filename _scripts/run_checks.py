#!/usr/bin/env python3
"""Run every automated upkeep check in one go and print a short to-do list.

Checks:
  1. Links, titles and descriptions (check_links.py)
  2. Yearly review: pages overdue or due soon, and dates that have passed since a page was
     last reviewed (review_report.py)
  3. Regulatory tracker: items still marked "starts soon" or "proposed" whose latest
     date has passed, and whether the tracker's AS_AT date is older than 3 months
  4. News: whether anything has been published in the last 45 days
  5. Learning content: quiz, flashcard and scenario links point to pages that exist
  6. Videos: every explainer is rendered from its current scene file, has its files and transcript,
     and sits on its pages; official videos were confirmed in the last 3 months
  7. Research: citations and reference lists are up to date, and every Advanced page meets the
     university-level standard (3+ peer-reviewed sources and the required sections)
  8. Key facts register: facts due for a re-check, facts checked only through secondary sources, and the
     latest weekly regulator watch (facts not found on their official source, new announcements)

Run:  python3 _scripts/run_checks.py              (as at today)
      python3 _scripts/run_checks.py 2027-03-01   (as at another date)
Exit code is 1 if anything needs attention, so it can also be used in automation.
See _scripts/UPKEEP.md for what to do with the results.
"""
import datetime
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(HERE))
from review_common import DATE_RE, MONTHS, fmt, add_months, parse_date  # noqa: E402
import tracker_data  # noqa: E402
import build_videos  # noqa: E402

TODAY = datetime.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else datetime.date.today()
NEWS_DAYS = 45
TRACKER_MONTHS = 3
todo = []


def heading(t):
    print(f"\n=== {t} ===")


def run(script, *args):
    r = subprocess.run([sys.executable, str(HERE / script), *args], capture_output=True, text=True, cwd=ROOT)
    return r.stdout + r.stderr


def page_exists(url):
    p = ROOT / url.split("#")[0].lstrip("/")
    return (p / "index.html").exists() if url.split("#")[0].endswith("/") else p.exists()


def latest_date(text):
    """The latest date a piece of text refers to, reading full dates ("1 July 2026"),
    months ("March 2027"), quarters ("Q4 2026") and bare years ("early 2028") as their last day."""
    ds = [datetime.date(int(y), MONTHS.index(m) + 1, int(d)) for d, m, y in DATE_RE.findall(text)]
    for m, y in re.findall(r"\b(" + "|".join(MONTHS) + r") (20\d\d)\b", text):
        ds.append(add_months(datetime.date(int(y), MONTHS.index(m) + 1, 1), 1) - datetime.timedelta(days=1))
    for q, y in re.findall(r"\bQ([1-4]) (20\d\d)\b", text):
        ds.append(add_months(datetime.date(int(y), 3 * int(q) - 2, 1), 3) - datetime.timedelta(days=1))
    for y in re.findall(r"\b(20\d\d)\b", text):
        ds.append(datetime.date(int(y), 1, 1))  # a bare year counts from its start
    return max(ds) if ds else None


print(f"RiskLens Australia upkeep checks as at {fmt(TODAY)}")

# 1. Links
heading("1. Links, titles and descriptions")
out = run("check_links.py").strip()
print(out if len(out) < 3000 else out[-3000:])
m = re.search(r"(\d+) problem", out)
if not m or m.group(1) != "0":
    todo.append("Fix the broken links or missing titles/descriptions listed in section 1.")

# 2. Review report
heading("2. Yearly review")
out = run("review_report.py", TODAY.isoformat())
counts = {k: int(n) for k, n in re.findall(r"^(OVERDUE|DUE within \d+ days|DATES THAT HAVE PASSED)[^(]*\((\d+)", out, re.M)}
for k, n in counts.items():
    print(f"  {k}: {n}")
if counts.get("OVERDUE"):
    todo.append(f"Review the {counts['OVERDUE']} page(s) overdue for yearly review (run review_report.py for the list).")
if any(n for k, n in counts.items() if k.startswith("DATES")):
    todo.append("Check pages mentioning dates that have now passed (run review_report.py for details).")
due_soon = sum(n for k, n in counts.items() if k.startswith("DUE"))
if due_soon:
    print(f"  (plan ahead: {due_soon} page(s) due within 60 days)")

# 3. Tracker
heading("3. Regulatory tracker")
as_at = parse_date(tracker_data.AS_AT)
print(f"  AS_AT: {tracker_data.AS_AT}")
if as_at and add_months(as_at, TRACKER_MONTHS) <= TODAY:
    todo.append(f"Quarterly tracker refresh is due (AS_AT is more than {TRACKER_MONTHS} months old).")
    print("  -> quarterly refresh due")
OPEN_ENDED = ("to follow", "not yet", "after Royal Assent", "to be confirmed", "no date")
stale, open_ended = [], []
for e in tracker_data.ENTRIES:
    title, regulator, status, when = e[0], e[1], e[2], e[3]
    if status not in ("Finalised, starts soon", "Proposed or consultation"):
        continue
    last = latest_date(when)
    if last and last <= TODAY:
        (open_ended if any(w in when for w in OPEN_ENDED) else stale).append((title, status, when, last))
for title, status, when, d in stale:
    print(f"  - {title} [{status}]: {when}  (latest date {fmt(d)} has passed)")
if stale:
    todo.append(f"Update {len(stale)} tracker item(s) whose dates have passed (move to 'In force', or note the outcome of consultations).")
else:
    print("  No tracker items with passed dates.")
if open_ended:
    print("  No fixed next date (check at the quarterly refresh):")
    for title, status, when, d in open_ended:
        print(f"    - {title} [{status}]: {when}")

# 4. News
heading("4. News")
latest = None
for p in (ROOT / "news").glob("*.html"):
    m = re.search(r'<meta name="rl:date" content="(\d{4}-\d{2}-\d{2})"', p.read_text(encoding="utf-8"))
    if m:
        d = datetime.date.fromisoformat(m.group(1))
        latest = max(latest, d) if latest else d
if latest:
    age = (TODAY - latest).days
    print(f"  Latest article: {fmt(latest)} ({age} days ago)")
    if age > NEWS_DAYS:
        todo.append(f"No news for {age} days: publish a roundup or update if there have been material developments.")

# 5. Learning content links
heading("5. Learning content links")
bad = []
for js in ("quiz-bank.js", "flashcards-data.js", "scenarios-data.js"):
    s = (ROOT / "scripts" / js).read_text(encoding="utf-8")
    for url in set(re.findall(r'(?:page|link|href): "(/[^"]*)"', s)):
        if not page_exists(url):
            bad.append(f"{js}: {url}")
s = (ROOT / "scripts" / "quiz-bank.js").read_text(encoding="utf-8")
listed = set(re.findall(r'^\s*"(/[^"]+)":', s, re.M))
for url in set(re.findall(r'page: "(/[^"]*)"', s)) - listed:
    bad.append(f"quiz-bank.js: {url} is missing from QUIZ_PAGES")
for b in sorted(bad):
    print(f"  - {b}")
if bad:
    todo.append("Fix the learning content links listed in section 5.")
else:
    print("  All quiz, flashcard and scenario links point to existing pages.")

# 6. Videos
heading("6. Videos")
vbad = []
man_path = ROOT / "_scripts" / "video" / "manifest.json"
man = json.loads(man_path.read_text(encoding="utf-8")) if man_path.exists() else {}
for spec in sorted((ROOT / "_scripts" / "video" / "specs").glob("*.js")):
    slug = spec.stem
    v = man.get(slug)
    if not v:
        vbad.append(f"{slug}: not rendered yet (node _scripts/video/render.js {slug})")
        continue
    if v.get("specHash") != hashlib.sha1(spec.read_bytes()).hexdigest()[:12]:
        vbad.append(f"{slug}: scene file changed since the video was rendered (node _scripts/video/render.js {slug})")
    for f in (f"assets/video/{slug}.mp4", f"assets/video/{slug}-poster.jpg"):
        if not (ROOT / f).exists():
            vbad.append(f"{slug}: {f} is missing")
    if not v.get("transcript") or not any(sc["captions"] for sc in v["transcript"]):
        vbad.append(f"{slug}: transcript is missing")
    for u in v.get("pages", []):
        p = ROOT / u.lstrip("/")
        p = p / "index.html" if u.endswith("/") else p
        if not p.exists() or f'id="video-{slug}"' not in p.read_text(encoding="utf-8"):
            vbad.append(f"{slug}: not on {u} (python3 _scripts/build_videos.py)")
for x in build_videos.EXTERNAL:
    checked = datetime.date.fromisoformat(x["checked"])
    if add_months(checked, 3) <= TODAY:
        vbad.append(f"Official video '{x['title']}' ({x['publisher']}) last confirmed {fmt(checked)}: check it still plays, then update 'checked' in build_videos.py")
for b in vbad:
    print(f"  - {b}")
if vbad:
    todo.append("Deal with the video items listed in section 6.")
else:
    print(f"  {len(man)} explainers rendered and placed; {len(build_videos.EXTERNAL)} official videos confirmed within 3 months.")

# 7. Research references
heading("7. Research references")
out = run("build_references.py", "--check").strip()
if out:
    print("  " + out.replace("\n", "\n  "))
    todo.append("Deal with the research reference items listed in section 7.")
else:
    print("  All citations current; every Advanced page meets the university-level standard.")

# 8. Key facts register and the weekly regulator watch
heading("8. Key facts register and regulator watch")
import facts_lib  # noqa: E402
import pull_watch  # noqa: E402
pulled = pull_watch.pull(quiet=True)
fdata = facts_lib.load()["facts"]
due = [f for f in fdata if facts_lib.recheck_due(f) <= TODAY]
secondary = [f for f in fdata if f["checked"]["how"] == "secondary"]
auto = facts_lib.load_auto()
confirmed = {k for k, r in auto.items() if r.get("result") == "found"}
manual = {f["id"] for f in fdata if f.get("autocheck") is False}
not_found = [k for k, r in auto.items() if r.get("result") == "not_found" and k not in manual]
unconfirmed = [f for f in secondary if f["id"] not in confirmed]
print(f"  {len(fdata)} facts; {len(confirmed)} found on their official source by the weekly watch"
      + ("" if pulled else " (watch results not available yet)"))
for f in due:
    print(f"  - re-check due: {f['id']} ({f['value']}), last checked {f['checked']['date']}")
if due:
    todo.append(f"Re-check {len(due)} key fact(s) (update_fact.py confirm or set; see section 8).")
for k in not_found:
    print(f"  - not found on its official source by the weekly watch: {k}")
if not_found:
    todo.append(f"Check {len(not_found)} key fact(s) the weekly watch could not find on their official source (section 8).")
if unconfirmed:
    print(f"  {len(unconfirmed)} fact(s) checked only through secondary sources and not yet found on an official source: "
          + ", ".join(f["id"] for f in unconfirmed[:12]) + (" ..." if len(unconfirmed) > 12 else ""))
rep = HERE / "watch/latest_report.md"
if pulled and rep.exists():
    m = re.search(r"## New announcements \((\d+)\)", rep.read_text(encoding="utf-8"))
    if m and int(m.group(1)):
        print(f"  Latest weekly watch listed {m.group(1)} new announcement(s): see the open 'regulator-watch' issue on GitHub.")
        todo.append("Process the open regulator watch issue on GitHub (new announcements to check against the site).")
out = run("build_facts.py").strip()
if "PROBLEM" in out:
    print("  " + "\n  ".join(l for l in out.splitlines() if "PROBLEM" in l))
    todo.append("Fix the key facts register problems listed in section 8.")

heading("TO DO")
if todo:
    for i, t in enumerate(todo, 1):
        print(f"  {i}. {t}")
else:
    print("  Nothing needs attention.")
sys.exit(1 if todo else 0)
