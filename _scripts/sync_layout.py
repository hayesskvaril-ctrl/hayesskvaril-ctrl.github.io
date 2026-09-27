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

# (label, root-relative URL). Order = order shown in nav.
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

DISCLAIMER = (
    "RiskLens Australia provides general educational information only. It is not "
    "legal, financial or compliance advice and does not take into account your "
    "circumstances. Always refer to the official legislation and regulator "
    "guidance, and seek professional advice where appropriate."
)


def target_exists(url: str) -> bool:
    p = ROOT / url.lstrip("/")
    if url.endswith("/"):
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
        cur = ' aria-current="page"' if url == current else ""
        items.append(f'        <li><a href="{url}"{cur}>{label}</a></li>')
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
        f'      <li><a href="{url}">{label}</a></li>' for label, url in live_nav()
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
        if new != text:
            page.write_text(new, encoding="utf-8")
            changed += 1
            print(f"updated {rel}")
    print(f"{changed} page(s) updated")


if __name__ == "__main__":
    main()
