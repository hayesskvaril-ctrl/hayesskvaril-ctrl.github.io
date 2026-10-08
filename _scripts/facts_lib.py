"""Shared helpers for the key facts register (_scripts/facts/facts.json).

Used by build_facts.py (stamping, where-used, public page), update_fact.py (one-step updates)
and run_checks.py (re-check reminders). No outside libraries.
"""
import datetime
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FACTS_FILE = ROOT / "_scripts/facts/facts.json"
AUTO_FILE = ROOT / "_scripts/facts/auto_checks.json"   # copied from the watch-data branch by pull_watch.py
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August",
          "September", "October", "November", "December"]
HOW_LABEL = {
    "official": "Official source",
    "auto": "Found on official source (automatic check)",
    "expert": "Expert reviewed",
    "secondary": "Secondary sources; official check pending",
}
STATUS_LABEL = {"in force": "In force", "finalised": "Finalised, starts soon", "proposed": "Proposed or consultation",
                "estimate": "Estimate", "report": "Report or guidance"}
# How long a fact can go before it is checked again, by status (days)
RECHECK_DAYS = {"proposed": 30, "estimate": 60, "finalised": 90, "report": 365, "in force": 365}

# Block-level elements that bound the "context" of a fact on a page
BLOCKS = ("p", "li", "td", "th", "dd", "dt", "summary", "h1", "h2", "h3", "h4", "figcaption", "caption", "blockquote",
          "div", "section", "aside", "details", "label", "button", "figure")
# Elements whose text must never be wrapped or changed automatically (review dates, breadcrumbs,
# video transcripts that must match the video, correction notes)
NO_FACT_CLASSES = ("no-fact", "page-meta", "last-reviewed", "breadcrumb", "transcript", "review-due", "course-bar")
SKIP = ("script", "style", "svg", "title", "head")
SPAN_RE = re.compile(r'<span class="fact" data-fact="([a-z0-9-]+)">(.*?)</span>', re.S)


def load():
    data = json.loads(FACTS_FILE.read_text(encoding="utf-8"))
    return data


def save(data):
    FACTS_FILE.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")


def by_id(data):
    return {f["id"]: f for f in data["facts"]}


def parse_iso(s):
    return datetime.date.fromisoformat(s) if s else None


def human(d):
    return f"{d.day} {MONTHS[d.month - 1]} {d.year}" if d else ""


def recheck_due(f):
    if f.get("recheck"):
        return parse_iso(f["recheck"])
    d = parse_iso(f["checked"]["date"])
    return d + datetime.timedelta(days=RECHECK_DAYS.get(f["status"], 180))


def load_auto():
    try:
        return json.loads(AUTO_FILE.read_text(encoding="utf-8")).get("facts", {})
    except (OSError, ValueError):
        return {}


def value_pattern(value):
    """Regex for a fact value as it appears in text: not part of a longer number or date."""
    v = re.escape(html.escape(value, quote=False))
    return re.compile(r"(?<![\w$.])" + v + r"(?![\d%])")


def tokens(page_html):
    """Split HTML into tags and text, recording for each text token the id of its enclosing block
    and whether it sits somewhere we must not touch (scripts, SVG, or inside an element with class
    "no-fact", used for correction notes and other text that must stay exactly as written)."""
    parts = re.split(r"(<[^>]+>)", page_html)
    stack, block_stack, out, bid = [], [], [], 0
    for p in parts:
        if p.startswith("<"):
            m = re.match(r"<(/?)([a-zA-Z0-9]+)", p)
            if m:
                closing, name = m.group(1) == "/", m.group(2).lower()
                if not closing and not p.endswith("/>") and name not in ("br", "img", "input", "meta", "link", "hr", "source", "wbr"):
                    cls = re.search(r'class="([^"]*)"', p)
                    nofact = bool(cls) and any(c in NO_FACT_CLASSES for c in cls.group(1).split())
                    stack.append((name, nofact))
                    if name in BLOCKS:
                        bid += 1
                        block_stack.append(bid)
                elif closing:
                    if any(n == name for n, _ in stack):
                        while stack and stack.pop()[0] != name:
                            pass
                    if name in BLOCKS and block_stack:
                        block_stack.pop()
            out.append(("tag", p, None, False))
        else:
            skip = any(n in SKIP or nf for n, nf in stack) or not block_stack
            out.append(("text", p, block_stack[-1] if block_stack else 0, skip))
    return out


def block_texts(toks):
    texts = {}
    for kind, s, b, _ in toks:
        if kind == "text":
            texts[b] = texts.get(b, "") + s
    return {b: html.unescape(t) for b, t in texts.items()}


def _kw_match(text, k):
    """Acronym-style keywords (two or more capitals, e.g. FAR, CPS 230, AML/CTF) match case-sensitively
    as whole words; other keywords match case-insensitively anywhere."""
    if sum(c.isupper() for c in k) >= 2:
        return re.search(r"(?<![A-Za-z0-9])" + re.escape(k) + r"(?![A-Za-z0-9])", text) is not None
    return k.lower() in text.lower()


def in_context(text, keywords):
    return any(_kw_match(text, k) for k in keywords)


def find_mentions(page_html, value, keywords):
    """Plain (unwrapped) mentions of a value in a page, where the surrounding block mentions a keyword.
    Returns a list of short snippets."""
    pat = value_pattern(value)
    toks = tokens(page_html)
    btext = block_texts(toks)
    found = []
    in_fact = False
    for kind, s, b, skip in toks:
        if kind == "tag":
            if s.startswith('<span class="fact"'):
                in_fact = True
            elif in_fact and s == "</span>":
                in_fact = False
            continue
        if skip or in_fact:
            continue
        if pat.search(s) and in_context(btext.get(b, ""), keywords):
            t = re.sub(r"\s+", " ", btext.get(b, "")).strip()
            i = t.find(html.unescape(value))
            found.append(t[max(0, i - 70): i + len(value) + 70])
    return found


# Pages rebuilt by a generator from a data file (update the data file instead), and dated news
# articles (a record of what was true when published). Facts are not wrapped automatically here.
NO_WRAP = ("/news/", "/obligations/", "/whats-new/", "/glossary/", "/learn/", "/playbooks/", "/topics/",
           "/governance/briefing-", "/governance/board-briefings.html", "/about/", "/levels/", "/start-here/",
           "/tools/", "/search/", "/resources/", "/404.html", "/index.html")


def published_pages():
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT).as_posix()
        if rel.startswith(("_scripts/", ".github/", "node_modules/")):
            continue
        yield p, "/" + rel.replace("index.html", "")


def wrappable(url):
    return url != "/" and not url.startswith(NO_WRAP)


DATA_FILES = ["_scripts/tracker_data.py", "_scripts/playbooks_data.py", "_scripts/briefings_data.py",
              "_scripts/changelog_data.py", "scripts/grc-builder-data.js", "_scripts/glossary_data.py"]


def data_mentions(value, keywords):
    """Mentions of a value in generator data files (these are not stamped automatically)."""
    out = []
    pat = re.compile(r"(?<![\w$.])" + re.escape(value) + r"(?![\d%])")
    for rel in DATA_FILES:
        p = ROOT / rel
        if not p.exists():
            continue
        for n, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            if pat.search(line) and in_context(line, keywords):
                out.append(f"{rel}:{n}")
    return out
