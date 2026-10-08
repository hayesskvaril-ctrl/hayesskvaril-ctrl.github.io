"""Fetch official documents as plain text, for checking facts and legal citations against the official text.

Runs on GitHub's free hosted runners (.github/workflows/fetch-docs.yml), which can read regulator and legislation
websites that Claude's sandbox can't. Results go to the unpublished watch-data branch, in fetched/:
  fetched/<name>.txt   the document's text (HTML pages also list their links at the end, to find PDFs)
  fetched/index.json   url, HTTP status, type, size and date for each document
Read them locally with:  git fetch origin watch-data && git show origin/watch-data:fetched/index.json

  python3 _scripts/watch/fetch_docs.py --out DIR URL [URL ...]
PDFs need pdftotext (poppler-utils); Word files are read directly. Standard library only otherwise.
"""
import argparse
import datetime
import html
import io
import json
import re
import subprocess
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path

UA = "Mozilla/5.0 (compatible; RiskLensSourceCheck/1.0; +https://hayesskvaril-ctrl.github.io; checks cited sources)"
MAX_CHARS = 1_500_000


def download(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*", "Accept-Language": "en-AU,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            return r.status, r.headers.get("Content-Type", ""), r.read(), r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, "", b"", url
    except Exception:
        pass
    # second attempt with curl (some government servers stall plain HTTP/1.1 requests from cloud servers)
    with tempfile.NamedTemporaryFile(delete=False) as f:
        tmp = f.name
    try:
        r = subprocess.run(["curl", "-sSL", "--compressed", "--max-time", "90", "-A", UA, "-o", tmp,
                            "-w", "%{http_code} %{content_type} %{url_effective}", url],
                           capture_output=True, text=True, timeout=100)
        parts = (r.stdout or "0").split(" ", 2)
        code = int(parts[0] or 0)
        return code, parts[1] if len(parts) > 1 else "", Path(tmp).read_bytes(), parts[2] if len(parts) > 2 else url
    except Exception as e:
        return 0, f"error: {type(e).__name__}", b"", url


def pdf_text(data):
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as f:
        f.write(data)
        p = f.name
    r = subprocess.run(["pdftotext", "-layout", p, "-"], capture_output=True, timeout=180)
    return r.stdout.decode("utf-8", "replace")


def docx_text(data):
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        xml = z.read("word/document.xml").decode("utf-8", "replace")
    xml = re.sub(r"</w:p>", "\n", xml)
    xml = re.sub(r"<w:tab/>", "\t", xml)
    return html.unescape(re.sub(r"<[^>]+>", "", xml))


def html_text(page, base):
    links = []
    for href, label in re.findall(r'(?is)<a[^>]+href="([^"#]+)"[^>]*>(.*?)</a>', page):
        label = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", label))).strip()
        links.append(f"{label[:120]} -> {urllib.parse.urljoin(base, html.unescape(href))}")
    page = re.sub(r"(?is)<(script|style|noscript|svg)[^>]*>.*?</\1>", " ", page)
    page = re.sub(r"(?i)<(br|/p|/li|/tr|/h\d|/div|/td|/th|/dt|/dd|/section|/article)[^>]*>", "\n", page)
    t = html.unescape(re.sub(r"<[^>]+>", " ", page)).replace("\xa0", " ")
    t = "\n".join(re.sub(r"[ \t]+", " ", line).strip() for line in t.splitlines())
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t + "\n\n==== LINKS ====\n" + "\n".join(dict.fromkeys(links))


def slug(url):
    s = re.sub(r"^https?://(www\.)?", "", url)
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s[:150]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("urls", nargs="+")
    a = ap.parse_args()
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    idx_file = out / "index.json"
    index = json.loads(idx_file.read_text()) if idx_file.exists() else {}
    urls = [u for arg in a.urls for u in re.split(r"[\s,]+", arg) if u.startswith("http")]
    for url in urls:
        code, ctype, data, final = download(url)
        kind, text = "none", ""
        try:
            if code == 200 and data:
                if "pdf" in ctype or data[:5] == b"%PDF-":
                    kind, text = "pdf", pdf_text(data)
                elif "officedocument.wordprocessingml" in ctype or (data[:2] == b"PK" and b"word/document.xml" in data[:200000]):
                    kind, text = "docx", docx_text(data)
                else:
                    kind, text = "html", html_text(data.decode("utf-8", "replace"), final)
        except Exception as e:
            kind, text = "error", f"{type(e).__name__}: {e}"
        name = slug(url) + ".txt"
        if text:
            (out / name).write_text(f"SOURCE: {url}\nFINAL URL: {final}\nFETCHED: {datetime.date.today()}\n\n" + text[:MAX_CHARS],
                                    encoding="utf-8")
        index[url] = {"status": code, "type": ctype[:80], "kind": kind, "chars": len(text), "file": name if text else "",
                      "final": final, "date": str(datetime.date.today())}
        print(f"{code} {kind:5} {len(text):>8} chars  {url}")
        time.sleep(2)
    idx_file.write_text(json.dumps(index, indent=1, sort_keys=True) + "\n")


if __name__ == "__main__":
    main()
