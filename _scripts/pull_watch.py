"""Copy the latest weekly regulator watch results from the watch-data branch into the working copy:
  _scripts/facts/auto_checks.json   which facts were found on their official source (shown on /about/fact-register.html)
  _scripts/watch/latest_report.md   the latest weekly report (also posted as a GitHub issue when there is news)
Run:  python3 _scripts/pull_watch.py        (run_checks.py runs it automatically)
"""
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def pull(quiet=False):
    r = subprocess.run(["git", "fetch", "-q", "origin", "watch-data"], cwd=ROOT, capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        if not quiet:
            print("Could not fetch the watch-data branch:", r.stderr.strip()[:200])
        return False
    got = []
    for src, dest in (("auto_checks.json", "_scripts/facts/auto_checks.json"), ("latest_report.md", "_scripts/watch/latest_report.md")):
        r = subprocess.run(["git", "show", f"origin/watch-data:{src}"], cwd=ROOT, capture_output=True, text=True)
        if r.returncode == 0 and r.stdout:
            (ROOT / dest).write_text(r.stdout, encoding="utf-8")
            got.append(dest)
    if not quiet:
        print("pulled: " + (", ".join(got) or "nothing yet (the weekly watch has not run)"))
    return bool(got)


if __name__ == "__main__":
    pull()
