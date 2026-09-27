#!/usr/bin/env python3
"""Check every internal link and page basics across the site.

Run:  python3 _scripts/check_links.py
Reports: internal links to pages/anchors that don't exist, href="#",
missing <title>, missing meta description, images without alt text.
Exit code 1 if anything is wrong.
"""
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.imgs_no_alt = [], set(), 0
        self.title = self.desc = False
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "a" and "href" in a:
            self.links.append(a["href"])
        if tag == "title":
            self._in_title = True
        if tag == "meta" and a.get("name") == "description" and a.get("content"):
            self.desc = True
        if tag == "img" and not a.get("alt") and a.get("alt") != "":
            self.imgs_no_alt += 1

    def handle_data(self, data):
        if self._in_title and data.strip():
            self.title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False


def resolve(url: str) -> Path:
    p = ROOT / url.lstrip("/")
    if url.endswith("/") or url == "":
        p = p / "index.html"
    return p


def main():
    pages = {}
    for f in ROOT.rglob("*.html"):
        rel = f.relative_to(ROOT).as_posix()
        if rel.startswith(("_", ".")):
            continue
        p = Page()
        p.feed(f.read_text(encoding="utf-8"))
        pages[f.resolve()] = (rel, p)

    problems = []
    for path, (rel, p) in pages.items():
        if not p.title:
            problems.append(f"{rel}: missing <title>")
        if not p.desc:
            problems.append(f"{rel}: missing meta description")
        if p.imgs_no_alt:
            problems.append(f"{rel}: {p.imgs_no_alt} image(s) without alt")
        for href in p.links:
            if href == "#":
                problems.append(f'{rel}: href="#"')
                continue
            if href.startswith(("http://", "https://", "mailto:", "tel:")):
                continue
            url, _, frag = href.partition("#")
            if url == "":
                target = path
            elif url.startswith("/"):
                target = resolve(url).resolve()
            else:
                problems.append(f"{rel}: relative link {href} (use root-relative)")
                continue
            if not target.exists():
                problems.append(f"{rel}: broken link {href}")
                continue
            if frag and target in pages and frag not in pages[target][1].ids:
                problems.append(f"{rel}: missing anchor {href}")

    for line in sorted(problems):
        print(line)
    print(f"{len(pages)} pages checked, {len(problems)} problem(s)")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
