#!/usr/bin/env python3
"""Stamp the shared header, navigation and footer onto every HTML page.

Run from anywhere:  python3 _scripts/sync_layout.py

Each page marks where the shared blocks go:
    <!-- HEADER:START --> ... <!-- HEADER:END -->
    <!-- FOOTER:START --> ... <!-- FOOTER:END -->
Everything between the markers is replaced. Nav items are only included when
the page they point to exists, so the nav never has dead links. The current
section gets aria-current="page".

This folder starts with "_" so GitHub Pages does not publish it.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent

# (label, root-relative URL). Order = order shown in nav and footer.
# The header skips "Home" (the brand links home) and uses HEADER_LABELS where given,
# so all sections fit on one line; the footer shows every link with full labels.
HEADER_SKIP = {"/"}
HEADER_LABELS = {"/risk-management/": "Risk"}
NAV = [
    ("Home", "/"),
    ("Foundations", "/foundations/"),
    ("Risk Management", "/risk-management/"),
    ("Compliance", "/compliance/"),
    ("Governance", "/governance/"),
    ("Standards", "/standards/"),
    ("Sectors", "/sectors/"),
    ("Learn", "/learn/"),
    ("Tools", "/tools/"),
    ("News", "/news/"),
    ("Glossary", "/glossary/"),
]

# Extra footer-only links (shown once the page exists).
FOOTER_EXTRA = [("Start here", "/start-here/"), ("Resource library", "/tools/resource-library.html"), ("Search", "/search/"), ("About", "/about/")]
SEARCH_ICON = ('<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" '
               'stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></svg>')

DISCLAIMER = (
    "RiskLens Australia provides general educational information only. It is not "
    "legal, financial or compliance advice and does not take into account your "
    "circumstances. Always refer to the official legislation and regulator "
    "guidance, and seek professional advice where appropriate."
)


def target_exists(url: str) -> bool:
    p = ROOT / url.lstrip("/")
    if url.endswith("/") or url == "":
        p = p / "index.html"
    return p.exists()


def live_nav():
    return [(label, url) for label, url in NAV if target_exists(url)]


def section_of(page: Path) -> str:
    rel = page.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    return "/" + rel.split("/")[0] + "/"


def header_html(current: str) -> str:
    items = []
    for label, url in live_nav():
        if url in HEADER_SKIP:
            continue
        cur = ' aria-current="page"' if url == current else ""
        label = HEADER_LABELS.get(url, label)
        items.append(f'        <li><a href="{url}"{cur}>{label}</a></li>')
    if target_exists("/search/"):
        cur = ' aria-current="page"' if current == "/search/" else ""
        items.append('        <li><a class="nav-search" href="/search/"' + cur + ' title="Search">' + SEARCH_ICON + '<span class="nav-search-label">Search</span></a></li>')
    return (
        "<!-- HEADER:START -->\n"
        '<a class="skip-link" href="#main">Skip to content</a>\n'
        '<header class="site-header">\n'
        '  <div class="inner">\n'
        '    <a class="brand" href="/">RiskLens <span>Australia</span></a>\n'
        '    <nav class="site-nav" aria-label="Main">\n'
        "      <ul>\n" + "\n".join(items) + "\n      </ul>\n"
        "    </nav>\n"
        "  </div>\n"
        "</header>\n"
        "<!-- HEADER:END -->"
    )


def footer_html() -> str:
    links = "\n".join(
        f'      <li><a href="{url}">{label}</a></li>'
        for label, url in live_nav() + [(l, u) for l, u in FOOTER_EXTRA if target_exists(u)]
    )
    return (
        "<!-- FOOTER:START -->\n"
        '<footer class="site-footer">\n'
        '  <div class="inner">\n'
        '    <ul class="footer-links">\n' + links + "\n    </ul>\n"
        f'    <p class="disclaimer">{DISCLAIMER}</p>\n'
        '    <p class="copyright">&copy; 2026 RiskLens Australia. Free to read, no login, no paywall.</p>\n'
        "  </div>\n"
        "</footer>\n"
        "<!-- FOOTER:END -->"
    )


# Related-topic links to pages that may not exist yet:
#   <li data-href="/risk-management/operational-risk.html" data-label="Operational risk"></li>
# becomes a real link once the page exists, or a "coming soon" label until then.
REL_RE = re.compile(r'<li data-href="([^"]+)" data-label="([^"]+)">.*?</li>', re.S)


def render_rel(m):
    url, label = m.group(1), m.group(2)
    if target_exists(url.partition("#")[0]):
        inner = f'<a href="{url}">{label}</a>'
    else:
        inner = f'{label} <span class="soon">(coming soon)</span>'
    return f'<li data-href="{url}" data-label="{label}">{inner}</li>'


# Topic cards on landing pages:
#   <!-- CARD href="/x/" level="Beginner" --> <h3>..</h3> <p>..</p> <!-- /CARD -->
# Renders as a clickable card if the page exists, else a "Coming soon" card.
CARD_RE = re.compile(r'(<!-- CARD href="([^"]+)" level="([^"]*)" -->)(.*?)(<!-- /CARD -->)', re.S)


def render_card(m):
    start, url, level, inner, end = m.groups()
    h3 = re.search(r"<h3>.*?</h3>", inner, re.S).group(0)
    p = re.search(r"<p>.*?</p>", inner, re.S).group(0)
    if target_exists(url.partition("#")[0]):
        tag = f'<span class="level level-{level.lower()}">{level}</span>' if level else ""
        body = f'<a class="card" href="{url}">\n  {h3}\n  {p}\n  {tag}\n</a>'
    else:
        body = f'<div class="card coming-soon">\n  {h3}\n  {p}\n  <span class="badge">Coming soon</span>\n</div>'
    return f"{start}\n{body}\n{end}"


# In-text cross-links to pages that may not exist yet. Write either form:
#   <a class="xref" href="/x.html">text</a>   or   <span class="xref" data-href="/x.html">text</span>
# It becomes a link when the page exists, and plain text until then.
XREF_RE = re.compile(r'<(a|span) class="xref" (?:href|data-href)="([^"]+)">(.*?)</\1>', re.S)


def render_xref(m):
    _, url, text = m.groups()
    if target_exists(url.partition("#")[0]):
        return f'<a class="xref" href="{url}">{text}</a>'
    return f'<span class="xref" data-href="{url}">{text}</span>'


HEADER_RE = re.compile(r"<!-- HEADER:START -->.*?<!-- HEADER:END -->", re.S)
FOOTER_RE = re.compile(r"<!-- FOOTER:START -->.*?<!-- FOOTER:END -->", re.S)


def main():
    changed = 0
    for page in sorted(ROOT.rglob("*.html")):
        rel = page.relative_to(ROOT).as_posix()
        if rel.startswith(("_", ".")):
            continue
        text = page.read_text(encoding="utf-8")
        if "<!-- HEADER:START -->" not in text or "<!-- FOOTER:START -->" not in text:
            print(f"WARNING: {rel} has no layout markers, skipped")
            continue
        new = HEADER_RE.sub(lambda m: header_html(section_of(page)), text)
        new = FOOTER_RE.sub(lambda m: footer_html(), new)
        new = REL_RE.sub(render_rel, new)
        new = CARD_RE.sub(render_card, new)
        new = XREF_RE.sub(render_xref, new)
        if new != text:
            page.write_text(new, encoding="utf-8")
            changed += 1
            print(f"updated {rel}")
    print(f"{changed} page(s) updated")
    # keep the site search index in step with the pages
    import build_search_index
    n, size = build_search_index.build()
    print(f"search index: {n} entries, {size // 1024} KB")


if __name__ == "__main__":
    main()
