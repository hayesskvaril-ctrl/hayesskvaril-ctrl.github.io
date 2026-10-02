"""Pages Nick has reviewed and signed off as a subject-matter expert.

Only pages listed here show the "Expert reviewed" badge. To sign off a page, add a line:
    "/standards/cps-230.html": "14 October 2026",
using the page's root-relative URL and the date of the review. If a page is later changed
in substance, re-review it and update the date (or remove the line).
Then run:  python3 _scripts/sync_layout.py
"""

EXPERT_REVIEWS = {
    # "/standards/cps-230.html": "14 October 2026",
    "/standards/sps-515.html": "2 October 2026",
}
