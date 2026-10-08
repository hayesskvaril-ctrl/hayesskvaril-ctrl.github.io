"""Check every outside link on the site. Run monthly by .github/workflows/link-check.yml on GitHub's
free servers (this sandbox can't reach most outside sites). Standard library only.

  python3 _scripts/check_external.py --out report.md

Uses plain HTTP/1.1 requests (several government sites reject the HTTP/2 used by common link checkers),
checks each website's links one at a time with a pause, and sorts results into:
  broken   404 or 410 (the page has gone): fix or replace the link
  failing  server errors or no connection, twice: check by hand, may be temporary
  blocked  401, 403 or 429 (the site refuses automated checks): not counted as broken
Writes the report, and report.md.broken (a flag file) when anything is broken or failing.
Internal links are checked locally by check_links.py.
"""
import argparse
import collections
import concurrent.futures as cf
import html
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (compatible; RiskLensLinkCheck/1.0; +https://hayesskvaril-ctrl.github.io; monthly check of cited sources)"
SKIP_HOSTS = ("hayesskvaril-ctrl.github.io", "github.com", "fonts.googleapis.com", "fonts.gstatic.com",
              "www.youtube-nocookie.com", "www.youtube.com", "youtu.be", "goatcounter.com")


def collect():
    links = collections.defaultdict(set)
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT).as_posix()
        if rel.startswith(("_scripts/", ".github/", "node_modules/")):
            continue
        for u in re.findall(r'href="(https?://[^"]+)"', p.read_text(encoding="utf-8")):
            u = html.unescape(u).split("#")[0]
            host = urllib.parse.urlsplit(u).hostname or ""
            if any(host == h or host.endswith("." + h) for h in SKIP_HOSTS):
                continue
            links[u].add("/" + rel.replace("index.html", ""))
    return links


def request(url, method):
    req = urllib.request.Request(urllib.parse.quote(url, safe=":/?&=%#+,;@~!$'()*"), method=method,
                                 headers={"User-Agent": UA, "Accept": "text/html,application/pdf,*/*;q=0.8", "Accept-Language": "en-AU,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=45) as r:
            if method == "GET":
                r.read(2048)
            return r.status, r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, url
    except Exception as e:
        return 0, f"{type(e).__name__}: {str(e)[:80]}"


def check(url):
    st, final = request(url, "HEAD")
    if st in (0, 400, 403, 404, 405, 429, 500, 501, 502, 503) or st == 0:
        time.sleep(1)
        st, final = request(url, "GET")
    if st == 0 or st >= 500:
        time.sleep(20)
        st, final = request(url, "GET")
    if st == 0 or st >= 500:
        st2 = curl_status(url)   # a different client: some government servers stall plain HTTP/1.1 requests
        if st2:
            st, final = st2, url
    return st, final


def curl_status(url):
    import subprocess
    try:
        r = subprocess.run(["curl", "-sL", "-o", "/dev/null", "--max-time", "60", "-A", UA, "-w", "%{http_code}", url],
                           capture_output=True, text=True, timeout=75)
        return int(r.stdout.strip() or 0)
    except Exception:
        return 0


def check_host(urls):
    out = {}
    for u in urls:
        out[u] = check(u)
        time.sleep(1.0)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="external-links-report.md")
    a = ap.parse_args()
    links = collect()
    by_host = collections.defaultdict(list)
    for u in links:
        by_host[urllib.parse.urlsplit(u).hostname].append(u)
    results = {}
    with cf.ThreadPoolExecutor(max_workers=10) as ex:
        for r in ex.map(check_host, by_host.values()):
            results.update(r)
    broken = {u: r for u, r in results.items() if r[0] in (404, 410)}
    # Sites where no link got any response at all usually block automated checks from cloud servers
    # (several Australian government sites do). List those sites once instead of every link as failing.
    silent = {h for h, us in by_host.items() if all(results[u][0] == 0 for u in us)}
    failing = {u: r for u, r in results.items()
               if (r[0] == 0 or r[0] >= 500) and urllib.parse.urlsplit(u).hostname not in silent}
    blocked = {u: r for u, r in results.items() if r[0] in (401, 403, 429)}
    n_silent = sum(len(by_host[h]) for h in silent)
    ok = len(results) - len(broken) - len(failing) - len(blocked) - n_silent

    def lines(d, why):
        out = []
        for u in sorted(d):
            pages = sorted(links[u])
            pl = ", ".join(pages[:6]) + (f" and {len(pages) - 6} more" if len(pages) > 6 else "")
            st, detail = d[u]
            out.append(f"- [ ] <{u}> ({why(st, detail)})  \n  on: {pl}")
        return out

    L = ["# Outside link check", "",
         f"{len(results)} outside links on {len({p for ps in links.values() for p in ps})} pages: {ok} working, "
         f"{len(broken)} broken, {len(failing)} failing, {len(blocked)} refused by sites that block automated checks, "
         f"{n_silent} on {len(silent)} sites that didn't respond to automated checks at all.", "",
         "Fix or replace broken links (find the document's new address on the official site), check failing ones by hand, "
         "then close this issue. Ask Claude to \"fix the broken links issue\".", ""]
    L += [f"## Broken ({len(broken)})", ""] + (lines(broken, lambda s, d: f"{s}") or ["None."]) + [""]
    L += [f"## Failing: server error or no connection, twice ({len(failing)})", ""] + (lines(failing, lambda s, d: d if s == 0 else f"{s}") or ["None."]) + [""]
    if silent:
        L += [f"## Sites that didn't respond to automated checks ({len(silent)})", "",
              "These sites usually block checks from cloud servers, so their links can't be tested automatically. "
              "Spot-check a few by hand each quarter.", ""]
        L += [f"- {h} ({len(by_host[h])} links)" for h in sorted(silent)] + [""]
    L += ["<details><summary>Links refused by sites that block automated checks (not counted as broken)</summary>", ""]
    L += [f"- <{u}> ({r[0]})" for u, r in sorted(blocked.items())] + ["", "</details>", ""]
    report = "\n".join(L)
    if len(report) > 60000:
        report = report[:60000] + "\n\n(Report shortened.)\n"
    Path(a.out).write_text(report, encoding="utf-8")
    flag = Path(a.out + ".broken")
    if broken or failing:
        flag.write_text("1")
    elif flag.exists():
        flag.unlink()
    print(f"{len(results)} links: {ok} ok, {len(broken)} broken, {len(failing)} failing, {len(blocked)} blocked")


if __name__ == "__main__":
    main()
