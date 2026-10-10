# Expert review queue

Pages for the owner to review, most important first. These are the pages professionals are most
likely to rely on, in the owner's specialist areas. For each page: read it, note anything wrong or
missing, and tell Claude "signed off: <page>" (or the corrections). Claude then adds the page to
`_scripts/expert_reviews.py`, which shows the "Expert reviewed" badge on the page.

Roughly 15 to 30 minutes a page. Doing the first ten covers the site's highest-traffic specialist content.

## Round 1: the core (do these first)
1. /standards/cps-230.html (CPS 230 explained: requirement tables, SFI thresholds, notification clocks)
2. /compliance/breach-reporting.html (regime-by-regime reporting timeframes, especially super trustee lines)
3. /risk-management/incident-and-breach-management.html (incident lifecycle, awareness date, triage)
4. /standards/asic-rg-78.html (reportable situations, deemed significance)
5. /standards/asic-rg-277.html (consumer remediation)
6. /risk-management/control-design-and-testing.html
7. /risk-management/third-party-risk.html
8. /risk-management/operational-risk.html
9. /sectors/superannuation.html (covenants, SPS list, performance test, fee governance)
10. /standards/asic-rg-97.html (fees and costs disclosure)
11a. ~~/standards/sps-515.html~~ signed off 2 October 2026
11b. /standards/sps-530.html (deep review done 2 October 2026: valuation triggers example, liquidity, 2026 proposals; proposal dates corrected 8 October 2026 to the 30 September 2026 release)
11c. /standards/sps-250.html (new 10 October 2026, from the official SPS 250 text and SIS Act ss 68AAA to 68AAF: requirement table, connected insurer worked example, default cover rules)

- /sectors/fund-mergers-and-successor-fund-transfers.html (deep review done 2 October 2026: merger process table and common mistakes)
- /sectors/unit-pricing.html (deep review done 2 October 2026: worked error example and who bears the cost)
- /compliance/breach-significance-analysis.html (deep review done 2 October 2026: new Case 5 and the relief section)
- /compliance/remediation-calculations.html (deep review done 7 October 2026: special cases table)
- /risk-management/issue-and-action-management.html (deep review done 7 October 2026: worked example and risk acceptance)
- /risk-management/setting-cps-230-tolerance-levels.html (deep review done 7 October 2026: tolerance statement template)
- /risk-management/service-provider-exit-and-concentration.html (deep review done 7 October 2026: exit plan example)
- /risk-management/risk-assessment-methodologies.html (deep review done 7 October 2026: RCSA steps)
- /compliance/compliance-monitoring-and-testing.html (deep review done 7 October 2026: monitoring plan example)
- /compliance/disclosure-obligations.html (deep review done 7 October 2026: greenwashing penalties and disclosure duties)
- /standards/asic-rg-274.html (deep review done 7 October 2026: DDO stop order counts and penalty cases)
- /standards/asic-rg-271.html (deep review done 7 October 2026: IDR timeframes and data reporting dates)
- /governance/conflicts-of-interest.html (deep review done 7 October 2026: worked example of a director's conflict)
- /standards/cps-511.html (deep review done 8 October 2026: worked malus example and SFI thresholds)
- /standards/cps-190-and-cps-900.html (deep review done 8 October 2026: worked example of trustee recovery triggers)
- /sectors/financial-advice-licensees.html (deep review done 8 October 2026: CSLR levy figures and adviser monitoring example)
- /case-studies/shield-and-first-guardian.html (deep review done 8 October 2026: 2026 timeline of court actions and settlements)
## Round 2: deeper practice pages
11. /compliance/breach-significance-analysis.html (worked cases)
12. /compliance/remediation-calculations.html
13. /risk-management/setting-cps-230-tolerance-levels.html
14. /risk-management/mapping-critical-operations.html
15. /risk-management/service-provider-exit-and-concentration.html
16. /risk-management/control-testing-sampling.html
17. /compliance/disclosure-obligations.html (disclosure review process and checklist)
18. /risk-management/business-continuity.html
19. /risk-management/issue-and-action-management.html
20. /risk-management/assurance-mapping.html
21. /sectors/unit-pricing.html
22. /compliance/compliance-monitoring-and-testing.html
23. /risk-management/risk-assessment-methodologies.html

## Round 3: playbooks, tools and templates
24. Every page in /playbooks/ (step-by-step guides built from the pages above)
25. /grc/model-builder.html (regime defaults, obligation themes, clocks, example controls)
26. /obligations/ (obligations library). Since 9 October 2026 each theme lists individual obligations with legal citations (572, in `scripts/obligation-details.js`, open the "Individual obligations" drop-downs). Most worth an expert check, in your areas: CPS 230; breach reporting (RG 78); IDR (RG 271); remediation (RG 277); SPS 515 (fees, reserves, expenditure, outcomes); fee disclosure (RG 97); SIS Act covenants and the performance test; CPS 511 and FAR deferral; CPS 220/SPS 220; SPS 530; CPS 190/900.
    Also corrected on 9 October 2026 and worth a glance: SPS 220 risk management declaration (on /standards/cps-220.html), SPS 510 tenure and board composition (on /standards/cps-510-and-cps-520.html and /governance/board-structure-and-accountability.html), CPS 511 deferral detail (on /governance/remuneration-governance.html and /standards/cps-511.html).
27. Templates: incident report, breach register, remediation tracker, control testing workpaper,
    material service provider register, RCSA and risk assessment templates (/tools/)
28. /learn/scenarios.html (the "best" answers and feedback)
