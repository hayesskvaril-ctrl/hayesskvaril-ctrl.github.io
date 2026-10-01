#!/usr/bin/env python3
"""Stamp the shared header, navigation and footer onto every HTML page.

Run from anywhere:  python3 _scripts/sync_layout.py

Each page marks where the shared blocks go:
    <!-- HEADER:START --> ... <!-- HEADER:END -->
    <!-- FOOTER:START --> ... <!-- FOOTER:END -->
Everything between the markers is replaced. Nav items are only included when
the page they point to exists, so the nav never has dead links. The current
section gets aria-current="page".

It also writes a <!-- META --> block into each page's <head> (link-preview tags,
icons, RSS link), and regenerates sitemap.xml and robots.txt.

This folder starts with "_" so GitHub Pages does not publish it.
"""
from pathlib import Path
from html import escape, unescape
import datetime
import re
import sys
import subprocess

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
FOOTER_EXTRA = [("Start here", "/start-here/"), ("Case studies", "/case-studies/"), ("Resource library", "/tools/resource-library.html"), ("Search", "/search/"), ("What's new", "/whats-new/"), ("About", "/about/")]
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
        '<script src="/scripts/site.js" defer></script>\n'
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


SITE = "https://hayesskvaril-ctrl.github.io"
SHARE_IMAGE = "/assets/brand/share-card.png"
META_RE = re.compile(r"\n?<!-- META:START -->.*?<!-- META:END -->", re.S)
NOINDEX = {"/404.html"}


def page_url(rel: str) -> str:
    return "/" + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)


def meta_html(text: str, url: str) -> str:
    t = re.search(r"<title>(.*?)</title>", text, re.S)
    d = re.search(r'<meta name="description" content="([^"]*)"', text)
    title = unescape(t.group(1).strip()) if t else "RiskLens Australia"
    title = re.sub(r"\s*\|\s*RiskLens Australia$", "", title)
    desc = unescape(d.group(1)) if d else ""
    q = lambda v: escape(v, quote=True)
    lines = []
    if url not in NOINDEX:
        lines.append(f'<link rel="canonical" href="{SITE}{url}">')
    lines += [
        '<meta property="og:site_name" content="RiskLens Australia">',
        f'<meta property="og:type" content="{"website" if url == "/" else "article"}">',
        f'<meta property="og:title" content="{q(title)}">',
        f'<meta property="og:description" content="{q(desc)}">',
    ]
    if url not in NOINDEX:
        lines.append(f'<meta property="og:url" content="{SITE}{url}">')
    lines += [
        f'<meta property="og:image" content="{SITE}{SHARE_IMAGE}">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:image:alt" content="RiskLens Australia: risk, compliance and governance, explained">',
        '<meta property="og:locale" content="en_AU">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="theme-color" content="#ffffff">',
        '<link rel="icon" href="/favicon.ico" sizes="48x48">',
        '<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">',
        '<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">',
    ]
    if (ROOT / "news" / "feed.xml").exists():
        lines.append('<link rel="alternate" type="application/rss+xml" title="RiskLens Australia news" href="/news/feed.xml">')
    return "<!-- META:START -->\n" + "\n".join(lines) + "\n<!-- META:END -->"


def apply_meta(text: str, url: str) -> str:
    text = META_RE.sub("", text)
    anchor = '<link rel="stylesheet" href="/styles.css">'
    if anchor not in text:
        return text
    return text.replace(anchor, meta_html(text, url) + "\n" + anchor, 1)


def last_modified(page: Path) -> str:
    rel = page.relative_to(ROOT).as_posix()
    dirty = subprocess.run(["git", "status", "--porcelain", "--", rel], cwd=ROOT, capture_output=True, text=True).stdout.strip()
    if not dirty:
        d = subprocess.run(["git", "log", "-1", "--format=%cs", "--", rel], cwd=ROOT, capture_output=True, text=True).stdout.strip()
        if d:
            return d
    return datetime.date.today().isoformat()


def write_sitemap(pages):
    urls = []
    for page in pages:
        url = page_url(page.relative_to(ROOT).as_posix())
        if url in NOINDEX:
            continue
        urls.append(f"  <url><loc>{SITE}{url}</loc><lastmod>{last_modified(page)}</lastmod></url>")
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n")
    (ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
    return len(urls)


from review_common import review_due, under_review, MONTHS
from expert_reviews import EXPERT_REVIEWS

DUE_RE = re.compile(r'(<p class="last-reviewed">Last reviewed: [^<]*?)(?:<span class="review-due">.*?</span>)?</p>')
BADGE_RE = re.compile(r'\s*<span class="badge expert-badge" data-stamped[^>]*>.*?</span>')


def apply_review(text: str, url: str) -> str:
    """Next-review-due note under each page, and the Expert reviewed badge for signed-off pages."""
    due = review_due(text) if under_review(url) else None
    note = f'<span class="review-due"> · Next review due: {MONTHS[due.month - 1]} {due.year}</span>' if due else ""
    text = DUE_RE.sub(lambda m: m.group(1) + note + "</p>", text, count=1)
    text = BADGE_RE.sub("", text)
    signed = EXPERT_REVIEWS.get(url)
    if signed:
        badge = (f'\n    <span class="badge expert-badge" data-stamped title="Checked by the site\'s risk and compliance professional on {signed}">'
                 f'Expert reviewed {signed.split(" ", 1)[1]}</span>')
        text = re.sub(r'(<div class="page-meta">.*?)(\n?\s*</div>)', lambda m: m.group(1) + badge + m.group(2), text, count=1, flags=re.S)
    return text


# Section artwork: our own 3D renders in /assets/img/ (source: _scripts/graphics/).
# url -> (image name, dark background?). Stamped after the page's "page-meta" line.
IMAGES = {
    "/foundations/": ("foundations", False),
    "/risk-management/": ("risk-management", False),
    "/compliance/": ("compliance", False),
    "/governance/": ("governance", False),
    "/standards/": ("standards", False),
    "/sectors/": ("sectors", False),
    "/case-studies/": ("case-studies", True),
    "/learn/": ("learn", False),
    "/start-here/": ("foundations", False),
    "/learn/videos.html": ("videos", True),
    "/tools/": ("tools", True),
    "/news/": ("news", False),
    "/glossary/": ("glossary", False),
    "/about/": ("about", False),
    "/risk-management/cyber-risk.html": ("cyber", True),
    "/standards/cps-234.html": ("cyber", True),
    "/standards/essential-eight.html": ("cyber", True),
    "/risk-management/climate-risk.html": ("climate", False),
    "/risk-management/climate-risk-research.html": ("climate", False),
    "/compliance/climate-related-financial-disclosures.html": ("climate", False),
    "/compliance/breach-reporting.html": ("breach-clock", False),
    "/risk-management/incident-and-breach-management.html": ("incident", False),
    "/compliance/breach-significance-analysis.html": ("incident", False),
    "/risk-management/third-party-risk.html": ("third-party", False),
    "/risk-management/service-provider-exit-and-concentration.html": ("third-party", False),
    "/risk-management/risk-appetite-and-tolerance.html": ("appetite", False),
    "/governance/conflicts-of-interest.html": ("appetite", False),
    "/compliance/aml-ctf-fundamentals.html": ("coins", False),
    "/compliance/remediation-calculations.html": ("coins", False),
    "/standards/asic-rg-97.html": ("coins", False),
    "/compliance/privacy-law.html": ("privacy", False),
    "/standards/cps-230.html": ("resilience", False),
    "/risk-management/business-continuity.html": ("resilience", False),
    "/standards/iso-22301.html": ("resilience", False),
    "/governance/whistleblower-protections.html": ("speak-up", False),
    "/governance/whistleblowing-research.html": ("speak-up", False),
    "/compliance/enforcement-and-penalties.html": ("enforcement", False),
    "/governance/directors-duties-case-law.html": ("enforcement", False),
    "/foundations/regulatory-landscape.html": ("regulators", False),
    "/compliance/licensing-basics.html": ("regulators", False),
    "/sectors/superannuation.html": ("super", False),
    "/sectors/behavioural-economics-of-super.html": ("super", False),
}
ART_RE = re.compile(r"\n?<!-- ART:START -->.*?<!-- ART:END -->", re.S)
META_LINE_RE = re.compile(r'(<div class="page-meta">.*?</div>)', re.S)


def art_html(name: str, dark: bool) -> str:
    cls = "section-art dark" if dark else "section-art"
    return (f'\n<!-- ART:START -->\n<figure class="{cls}"><img src="/assets/img/{name}-1600.webp" '
            f'srcset="/assets/img/{name}-800.webp 800w, /assets/img/{name}-1600.webp 1600w" '
            f'sizes="(max-width: 1024px) 100vw, 980px" width="1600" height="1000" alt="" fetchpriority="high"></figure>\n<!-- ART:END -->')


def apply_art(text: str, url: str) -> str:
    text = ART_RE.sub("", text)
    if url not in IMAGES or not (ROOT / "assets" / "img" / f"{IMAGES[url][0]}-1600.webp").exists():
        return text
    return META_LINE_RE.sub(lambda m: m.group(1) + art_html(*IMAGES[url]), text, count=1)



# Home page "by the numbers" strip, between <!-- STATS:START --> and <!-- STATS:END -->.
STATS_RE = re.compile(r"<!-- STATS:START -->.*?<!-- STATS:END -->", re.S)


def stats_html(pages) -> str:
    import json
    articles = sum(1 for p in pages if 'class="page-meta"' in p.read_text(encoding="utf-8"))
    gl = ROOT / "glossary" / "index.html"
    terms = gl.read_text(encoding="utf-8").count('class="entry"') if gl.exists() else 0
    man = ROOT / "_scripts" / "video" / "manifest.json"
    videos = len(json.loads(man.read_text())) if man.exists() else 0
    try:
        sys.path.insert(0, str(ROOT / "_scripts"))
        from references import REFS
        research = sum(1 for r in REFS.values() if r.get("pr"))
    except Exception:
        research = 0
    rl = ROOT / "tools" / "resource-library.html"
    m = re.search(r"(\d+) resources", rl.read_text(encoding="utf-8")) if rl.exists() else None
    resources = int(m.group(1)) if m else 0
    items = [(articles, "pages, from beginner to university level"), (terms, "glossary terms in plain English"),
             (resources, "free tools, templates and self-checks"), (videos, "explainer videos with transcripts"),
             (research, "peer-reviewed research sources")]
    lis = "\n".join(f'      <li><span class="num">{n}</span><span class="lbl">{lbl}</span></li>' for n, lbl in items if n)
    return f'<!-- STATS:START -->\n    <ul class="stats">\n{lis}\n    </ul>\n<!-- STATS:END -->'

HEADER_RE = re.compile(r"<!-- HEADER:START -->.*?<!-- HEADER:END -->", re.S)
FOOTER_RE = re.compile(r"<!-- FOOTER:START -->.*?<!-- FOOTER:END -->", re.S)


def main():
    changed = 0
    published = []
    for page in sorted(ROOT.rglob("*.html")):
        rel = page.relative_to(ROOT).as_posix()
        if rel.startswith(("_", ".")):
            continue
        text = page.read_text(encoding="utf-8")
        if "<!-- HEADER:START -->" not in text or "<!-- FOOTER:START -->" not in text:
            print(f"WARNING: {rel} has no layout markers, skipped")
            continue
        published.append(page)
        new = apply_meta(text, page_url(rel))
        new = apply_review(new, page_url(rel))
        new = apply_art(new, page_url(rel))
        new = HEADER_RE.sub(lambda m: header_html(section_of(page)), new)
        new = FOOTER_RE.sub(lambda m: footer_html(), new)
        new = REL_RE.sub(render_rel, new)
        new = CARD_RE.sub(render_card, new)
        # keep "N topics" on section landing pages in step with their topic cards
        if re.search(r"<span>\d+ topics</span>", new) and "<!-- CARD href=" in new:
            n_cards = len(re.findall(r"<!-- CARD href=", new))
            new = re.sub(r"<span>\d+ topics</span>", f"<span>{n_cards} topics</span>", new, count=1)
        new = XREF_RE.sub(render_xref, new)
        if new != text:
            page.write_text(new, encoding="utf-8")
            changed += 1
            print(f"updated {rel}")
    home = ROOT / "index.html"
    ht = home.read_text(encoding="utf-8")
    if "<!-- STATS:START -->" in ht:
        nt = STATS_RE.sub(lambda m: stats_html(published), ht)
        if nt != ht:
            home.write_text(nt, encoding="utf-8"); changed += 1
    print(f"{changed} page(s) updated")
    print(f"sitemap.xml: {write_sitemap(published)} URLs")
    # keep the site search index in step with the pages
    import build_search_index
    n, size = build_search_index.build()
    print(f"search index: {n} entries, {size // 1024} KB")


if __name__ == "__main__":
    main()
