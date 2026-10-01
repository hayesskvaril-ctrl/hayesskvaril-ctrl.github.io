"""Builds the video parts of the site.

Explainer videos are made from the scene files in _scripts/video/specs/ by _scripts/video/render.js, which
writes the MP4 and poster to /assets/video/ and the details (title, level, pages, transcript) to
_scripts/video/manifest.json. Official videos from regulators are listed in EXTERNAL below.

This script then:
  * writes learn/videos.html, the Watch page: every explainer grouped by level, plus official videos
  * places a video block on every page a video belongs to (its "pages" list), between
    <!-- VIDEOS:START --> and <!-- VIDEOS:END --> markers. The first time, the block goes straight after
    the Key takeaways box (or before the first heading). Move the markers to move the block.

Run:  node _scripts/video/render.js [slug]   (needs the local server on port 8765)
      python3 _scripts/build_videos.py && python3 _scripts/sync_layout.py
"""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "_scripts" / "video" / "manifest.json"
OUT = ROOT / "learn" / "videos.html"
REVIEWED = "30 September 2026"
SECTION_ORDER = ["Foundations", "Risk management", "Compliance", "Governance", "Standards", "Sectors"]
LEVEL_ORDER = ["Beginner", "Intermediate", "Advanced"]
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

# Official videos, played from YouTube only when the reader presses play (privacy-enhanced mode).
# Only add a video after confirming it is the organisation's own (for example, linked from its website).
# "checked" is when it was last confirmed; run_checks.py lists entries not checked for over 3 months.
EXTERNAL = [
    {"id": "austrac-amlctf-reforms", "yt": "r5FrN8Bw_rs", "publisher": "AUSTRAC", "level": "Beginner",
     "title": "How anti-money laundering and counter-terrorism financing (AML/CTF) laws are changing",
     "desc": "AUSTRAC's video on how Australia's AML/CTF laws are changing under the 2024 reforms.",
     "source": "https://www.austrac.gov.au/amlctf-reform/about-reforms", "source_name": "AUSTRAC: About the reforms",
     "pages": ["/compliance/aml-ctf-fundamentals.html"], "checked": "2026-09-30"},
    {"id": "acnc-governance-standards", "list": "PLHyGI63YAEe3wv9eFxcYSeaUA_QdmgArS", "publisher": "ACNC", "level": "Beginner",
     "title": "ACNC Governance Standards (video series)",
     "desc": "The charity regulator's video guidance on the Governance Standards that registered charities must meet.",
     "source": "https://www.acnc.gov.au/for-charities/manage-your-charity/governance-hub/governance-standards",
     "source_name": "ACNC: Governance Standards",
     "pages": ["/sectors/not-for-profits-and-charities.html"], "checked": "2026-09-30"},
]

# Official video and online learning libraries, linked from the Watch page (not embedded).
LIBRARIES = [
    ("OAIC videos", "https://www.oaic.gov.au/updates/videos", "OAIC",
     "The privacy and freedom of information regulator's video library."),
    ("AUSTRAC education about the reforms", "https://www.austrac.gov.au/amlctf-reform/education-about-reforms", "AUSTRAC",
     "Webinars and on-demand AML/CTF essentials sessions for businesses newly regulated under the reforms."),
    ("ACNC online learning", "https://www.acnc.gov.au/tools/online-learning", "ACNC",
     "Free, self-paced courses on the Governance Standards and the External Conduct Standards, with a certificate on completion."),
    ("AFCA videos for diverse communities", "https://www.afca.org.au/make-a-complaint/do-you-speak-another-language/afca-launches-new-videos-for-diverse-communities",
     "AFCA", "AFCA staff explain, in a range of languages, how AFCA can help with a financial complaint."),
    ("The IIA's Three Lines Model video series", "https://internalauditor.theiia.org/en/video/2020/august/the-iias-new-three-lines-model-part-1-the-basics/",
     "The IIA", "A three-part series from 2020 on the basics of the model and what changed from the three lines of defence."),
]

MARK_RE = re.compile(r"\n?<!-- VIDEOS:START[^>]*-->.*?<!-- VIDEOS:END -->\n?", re.S)
PLAY_SVG = '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 5v14l11-7z"/></svg>'


def mmss(s):
    s = int(round(s))
    return f"{s // 60}:{s % 60:02d}"


def length(s):
    s = int(round(s))
    return f"{s // 60} min {s % 60} s" if s >= 60 else f"{s} s"


def checked_month(iso):
    y, m, _ = iso.split("-")
    return f"{MONTHS[int(m) - 1]} {y}"


def mb(b):
    return f"{b / 1048576:.1f} MB"


def page_file(url):
    p = ROOT / url.lstrip("/")
    return p / "index.html" if url.endswith("/") else p


def page_title(url):
    s = page_file(url).read_text(encoding="utf-8")
    return re.sub(r"<[^>]+>", "", re.search(r"<h1[^>]*>(.*?)</h1>", s, re.S).group(1)).strip()


def transcript(v):
    rows = []
    for sc in v["transcript"]:
        said = " ".join(escape(c) for c in sc["captions"])
        rows.append(f'<li><time>{mmss(sc["start"])}</time> <span class="on-screen">On screen: {escape(sc["visual"])}</span>'
                    + (f" {said}" if said else "") + "</li>")
    return ('<details class="transcript"><summary>Transcript and description</summary>\n'
            '<p class="small">The video has no sound. This lists what appears on screen and the captions, in order.</p>\n<ol>\n'
            + "\n".join(rows) + "\n</ol>\n</details>")


def explainer(v, lazy=False, read_link=False):
    slug = v["slug"]
    poster = f"/assets/video/{slug}-poster.jpg"
    mp4 = f"/assets/video/{slug}.mp4"
    pattr = f'data-poster="{poster}"' if lazy else f'poster="{poster}"'
    links = [f'<a href="{mp4}" download>Download (MP4, {mb(v["bytes"])})</a>']
    if read_link:
        links.append(f'<a href="{v["pages"][0]}">Read the page: {escape(page_title(v["pages"][0]))}</a>')
    return f'''<figure class="video" id="video-{slug}">
<div class="video-frame">
<video controls preload="none" playsinline {pattr} width="1280" height="720" aria-label="Video: {escape(v["title"])}">
<source src="{mp4}" type="video/mp4">
Your browser can't play this video. <a href="{mp4}">Download it</a> instead.
</video>
</div>
<figcaption>
<span class="video-meta">Explainer · {length(v["duration"])} · Silent, with captions</span>
<span class="video-title">{escape(v["title"])}</span>
<span class="video-desc">{escape(v["desc"])}</span>
<span class="video-links">{" ".join(links)}</span>
{transcript(v)}
</figcaption>
</figure>'''


def external(x):
    watch = (f"https://www.youtube.com/playlist?list={x['list']}" if x.get("list")
             else f"https://www.youtube.com/watch?v={x['yt']}")
    data = f'data-list="{x["list"]}"' if x.get("list") else f'data-yt="{x["yt"]}"'
    return f'''<figure class="video ext" id="video-{x["id"]}">
<div class="video-frame yt-facade" {data} data-title="{escape(x["title"])}">
<a class="yt-play" href="{watch}"><span class="yt-icon" aria-hidden="true">{PLAY_SVG}</span><span class="yt-title">{escape(x["title"])}</span><span class="yt-source">{escape(x["publisher"])} · plays from YouTube</span><span class="visually-hidden"> (play video)</span></a>
</div>
<figcaption>
<span class="video-meta">Official video · {escape(x["publisher"])} · checked {checked_month(x["checked"])}</span>
<span class="video-desc">{escape(x["desc"])}</span>
<span class="video-links"><a href="{watch}">Watch on YouTube</a> <a href="{x["source"]}">{escape(x["source_name"])}</a></span>
<p class="small">Nothing loads from YouTube until you press play. It then plays in YouTube's privacy-enhanced mode.</p>
</figcaption>
</figure>'''


def block(figs, has_ext):
    row = "video-row two" if len(figs) > 1 else "video-row"
    label = "Videos" if len(figs) > 1 else "Video"
    script = '\n<script src="/scripts/video-embed.js" defer></script>' if has_ext else ""
    return (f'<!-- VIDEOS:START (built by _scripts/build_videos.py: edit the video list, not this block) -->\n'
            f'<section class="video-block" aria-label="{label}">\n<div class="{row}">\n' + "\n".join(figs)
            + f"\n</div>\n</section>{script}\n<!-- VIDEOS:END -->")


def place(html, blk):
    if MARK_RE.search(html):
        return MARK_RE.sub(("\n" + blk + "\n") if blk else "\n", html, count=1)
    if not blk:
        return html
    main = html.index("<main")
    first_h2 = html.find("<h2", main)
    tk = html.find('<aside class="takeaways"', main)
    if tk != -1 and tk < first_h2:
        end = html.index("</aside>", tk) + len("</aside>")
        return html[:end] + "\n\n  " + blk + html[end:]
    line = html.rfind("\n", 0, first_h2) + 1
    return html[:line] + "  " + blk + "\n\n" + html[line:]


def main():
    man = json.loads(MANIFEST.read_text(encoding="utf-8"))
    vids = sorted(man.values(), key=lambda v: (LEVEL_ORDER.index(v["level"]), SECTION_ORDER.index(v["section"]), v["title"]))
    for v in vids:
        for f in (f"assets/video/{v['slug']}.mp4", f"assets/video/{v['slug']}-poster.jpg"):
            if not (ROOT / f).exists():
                raise SystemExit(f"Missing {f}: render it with node _scripts/video/render.js {v['slug']}")

    # blocks on topic pages
    by_page = {}
    for v in sorted(man.values(), key=lambda v: v["slug"]):
        for u in v["pages"]:
            by_page.setdefault(u, []).append(("own", v))
    for x in EXTERNAL:
        for u in x["pages"]:
            by_page.setdefault(u, []).append(("ext", x))
    touched = 0
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT).as_posix()
        if rel.split("/")[0] in {"_scripts", "assets"} or p == OUT:
            continue
        url = "/" + (rel[:-len("index.html")] if rel.endswith("index.html") else rel)
        items = by_page.get(url, [])
        html = p.read_text(encoding="utf-8")
        if not items and "<!-- VIDEOS:START" not in html:
            continue
        figs = [explainer(v, read_link=url != v["pages"][0]) if kind == "own" else external(v) for kind, v in items]
        new = place(html, block(figs, any(k == "ext" for k, _ in items)) if figs else "")
        if new != html:
            p.write_text(new, encoding="utf-8")
            touched += 1
    missing = [u for u in by_page if not page_file(u).exists()]
    if missing:
        raise SystemExit("Video pages not found: " + ", ".join(missing))

    # Watch page
    total = sum(v["duration"] for v in vids)
    groups = []
    for lv in LEVEL_ORDER:
        vs = [v for v in vids if v["level"] == lv]
        if not vs:
            continue
        groups.append(f'''  <h2 id="{lv.lower()}">{lv} <span class="level level-{lv.lower()}">{len(vs)} video{"s" if len(vs) != 1 else ""}</span></h2>
  <div class="video-grid">
{chr(10).join(explainer(v, lazy=True, read_link=True) for v in vs)}
  </div>''')
    ext = "\n".join(external(x) for x in EXTERNAL)
    libs = "\n".join(f'    <li><a href="{u}">{escape(t)}</a> <span class="small">({escape(pub)})</span><br>{escape(d)}</li>'
                     for t, u, pub, d in LIBRARIES)
    jump = " · ".join(f'<a href="#{lv.lower()}">{lv}</a>' for lv in LEVEL_ORDER if any(v["level"] == lv for v in vids))
    html = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Videos | RiskLens Australia</title>
<meta name="description" content="Short, free explainer videos on Australian risk, compliance and governance, with captions and full transcripts, plus official videos from Australian regulators.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article wide">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/learn/">Learn</a></li><li>Videos</li></ol></nav>

  <h1>Videos</h1>
  <p class="summary">Short explainer videos that bring the site's diagrams to life, plus official videos from Australian regulators.</p>
  <div class="page-meta">
    <span>{len(vids)} explainers, {round(total / 60)} minutes in total</span>
    <span>Last reviewed: {REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Good to know</h2>
    <ul>
      <li>Each explainer runs one to two minutes. It has no sound: the captions are part of the picture, so you can watch anywhere.</li>
      <li>Every video has a full transcript that describes what appears on screen, and a download link so you can watch offline or use it in training.</li>
      <li>Each video also sits on the page it belongs to, next to the detail, sources and links to the legislation.</li>
      <li>Official videos from regulators play from YouTube, but only after you press play.</li>
    </ul>
  </aside>

  <p>Jump to: {jump} · <a href="#official">Official videos</a> · <a href="#libraries">More from regulators</a></p>

{chr(10).join(groups)}

  <h2 id="official">Official videos from regulators</h2>
  <p>Videos made by Australian regulators, chosen because they add something to the topic pages. They are the regulators' own content, played from their YouTube channels.</p>
  <div class="video-grid">
{ext}
  </div>

  <h2 id="libraries">More from regulators and standard setters</h2>
  <p>These official libraries have more videos, webinars and free online courses.</p>
  <ul class="video-libraries">
{libs}
  </ul>

  <h2>About these explainers</h2>
  <p>RiskLens Australia makes these explainers from the same diagrams and examples used on its pages, using free, open-source tools. They are general education, not advice, and are reviewed along with the page they belong to. Details such as penalties, deadlines and thresholds are current at the date the page was last reviewed. Always check the official legislation and regulator guidance.</p>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li><a href="/learn/">Interactive learning</a></li>
      <li><a href="/learn/by-level.html">Browse by level</a></li>
      <li><a href="/learn/pathways.html">Learning pathways</a></li>
      <li><a href="/tools/resource-library.html">Resource library</a></li>
    </ul>
  </section>

  <p class="last-reviewed">Last reviewed: {REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->
<script src="/scripts/video-embed.js" defer></script>
</body>
</html>
'''
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}: {len(vids)} explainers, {len(EXTERNAL)} official videos; video blocks updated on {touched} pages")


if __name__ == "__main__":
    main()
