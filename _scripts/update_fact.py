"""Update, re-confirm or add a key fact in one step.

  python3 _scripts/update_fact.py list [--due]           every fact (or only those due for a re-check)
  python3 _scripts/update_fact.py show ID                details, where it appears, and plain mentions not yet linked
  python3 _scripts/update_fact.py set ID "NEW VALUE" --how official --note "what changed and where you checked"
                                                         [--status proposed|finalised|in force|estimate|report]
                                                         [--source-url URL --source-label LABEL] [--recheck YYYY-MM-DD]
  python3 _scripts/update_fact.py confirm ID --how official --note "re-checked on the source; unchanged"
  python3 _scripts/update_fact.py add ID --topic T --fact "plain-English description" --value V --status S
                                     --context "keyword, keyword" --source-url URL --source-label LABEL --how H

--how is how the fact was checked: official (read on the official source), expert (confirmed by the site's
expert reviewer), secondary (law firm summaries, news or search results only; an official check is still due).

"set" records the old value in the fact's history, stamps the new value on every page that shows the fact,
and then lists any other places that still mention the OLD value (pages where it isn't linked, dated news,
and generator data files such as tracker_data.py), so they can be rewritten. Then run sync_layout.py,
check_links.py and run_checks.py as usual.
"""
import argparse
import datetime
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import facts_lib as L
import build_facts

TODAY = datetime.date.today()


def other_mentions(value, keywords):
    pages = []
    for path, url in L.published_pages():
        if url == "/about/fact-register.html":
            continue
        hits = L.find_mentions(path.read_text(encoding="utf-8"), value, keywords)
        for h in hits:
            pages.append(f"{url}: ...{h}...")
    return pages, L.data_mentions(value, keywords)


def print_mentions(value, keywords, label):
    pages, data = other_mentions(value, keywords)
    if not pages and not data:
        print(f"No other mentions of {label} found.")
        return
    print(f"Other mentions of {label} to check and rewrite by hand:")
    for p in pages:
        print("  page  ", p)
    for d in data:
        print("  data  ", d)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("action", choices=["list", "show", "set", "confirm", "add"])
    ap.add_argument("id", nargs="?")
    ap.add_argument("value", nargs="?")
    ap.add_argument("--due", action="store_true")
    ap.add_argument("--how", choices=["official", "expert", "secondary"])
    ap.add_argument("--note", default="")
    ap.add_argument("--status", choices=list(L.STATUS_LABEL))
    ap.add_argument("--source-url")
    ap.add_argument("--source-label")
    ap.add_argument("--recheck")
    ap.add_argument("--topic")
    ap.add_argument("--fact")
    ap.add_argument("--context")
    a = ap.parse_args()

    data = L.load()
    facts = L.by_id(data)

    if a.action == "list":
        for f in data["facts"]:
            due = L.recheck_due(f)
            if a.due and due > TODAY:
                continue
            flag = "DUE " if due <= TODAY else "    "
            print(f"{flag}{f['id']:34} {f['value']:20} {f['status']:10} checked {f['checked']['date']} ({f['checked']['how']}), next check {due}")
        return

    if a.action != "add" and a.id not in facts:
        sys.exit(f"Unknown fact '{a.id}'. Use: update_fact.py list")

    if a.action == "show":
        f = facts[a.id]
        print(f"{f['id']}: {f['fact']}\n  value:   {f['value']}\n  status:  {f['status']}\n  source:  {f['source']['label']} <{f['source']['url']}>")
        print(f"  checked: {f['checked']['date']} ({L.HOW_LABEL[f['checked']['how']]}) {f['checked'].get('note', '')}")
        print(f"  next check due: {L.recheck_due(f)}")
        auto = L.load_auto().get(f["id"])
        if auto:
            print(f"  weekly watch: {auto.get('result')} on {auto.get('date')} {auto.get('detail', '')}")
        build_facts.main()
        import json
        where = json.loads((L.ROOT / "_scripts/facts/where_used.json").read_text()).get(f["id"], [])
        print("  shown on: " + (", ".join(where) or "no pages yet"))
        print_mentions(f["value"], f["context"], f"'{f['value']}' that are not linked to this fact")
        for h in f.get("history", []):
            print(f"  history: {h['date']}: {h['old']} -> {h['new']} ({h['how']}) {h.get('note', '')}")
        return

    if a.action in ("set", "confirm", "add") and not a.how:
        sys.exit("Say how the fact was checked: --how official, expert or secondary")

    if a.action == "add":
        if a.id in facts:
            sys.exit(f"Fact '{a.id}' already exists")
        missing = [k for k in ("topic", "fact", "value", "status", "context", "source_url", "source_label") if not getattr(a, k)]
        if missing:
            sys.exit("Missing: " + ", ".join("--" + m.replace("_", "-") for m in missing))
        data["facts"].append({
            "id": a.id, "topic": a.topic, "fact": a.fact, "value": a.value, "status": a.status,
            "context": [k.strip() for k in a.context.split(",") if k.strip()],
            "source": {"label": a.source_label, "url": a.source_url},
            "checked": {"date": TODAY.isoformat(), "how": a.how, "note": a.note}, "history": []})
        if a.recheck:
            data["facts"][-1]["recheck"] = a.recheck
        L.save(data)
        print(f"Added {a.id}. To show it on a page, wrap it: <span class=\"fact\" data-fact=\"{a.id}\">{a.value}</span>")
        print("or run: python3 _scripts/build_facts.py --wrap  (links plain mentions automatically)")
        return

    f = facts[a.id]
    old = f["value"]
    if a.action == "set":
        if not a.value:
            sys.exit("Give the new value")
        f.setdefault("history", []).append({"date": TODAY.isoformat(), "old": old, "new": a.value, "how": a.how, "note": a.note})
        f["value"] = a.value
    else:
        f.setdefault("history", []).append({"date": TODAY.isoformat(), "old": old, "new": old, "how": a.how, "note": a.note or "re-confirmed"})
    f["checked"] = {"date": TODAY.isoformat(), "how": a.how, "note": a.note}
    if a.status:
        f["status"] = a.status
    if a.source_url:
        f["source"]["url"] = a.source_url
    if a.source_label:
        f["source"]["label"] = a.source_label
    if a.recheck:
        f["recheck"] = a.recheck
    elif "recheck" in f and L.parse_iso(f["recheck"]) <= TODAY:
        del f["recheck"]
    L.save(data)
    build_facts.main()
    if a.action == "set":
        print(f"{a.id}: {old} -> {f['value']} (stamped on every page that shows it)")
        print_mentions(old, f["context"], f"the OLD value '{old}'")
        print("Also check whether the change alters other wording (for example a status such as 'proposed').")
    else:
        print(f"{a.id}: re-confirmed {old} ({a.how})")
    print("Next: python3 _scripts/sync_layout.py && python3 _scripts/check_links.py && python3 _scripts/run_checks.py")


if __name__ == "__main__":
    main()
