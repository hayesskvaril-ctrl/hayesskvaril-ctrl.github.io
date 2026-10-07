"""Deep review programme: every article checked line by line and expanded, one phase per page.

Shown on /about/roadmap.html (by track, with a progress bar) and as a compact panel on the home page.
When a page's deep review is finished, add it to DONE with the date and a one-line summary of what
changed, then run:
  python3 _scripts/build_site_roadmap.py && python3 _scripts/sync_layout.py
The phase in progress is the first page in TRACKS order that isn't in DONE.
build_site_roadmap.py checks that every educational article is in exactly one track.
"""

PROGRAM = "Deep review, October to November 2026"
INTRO = ("We're going through every article on the site with a fine-tooth comb, one at a time. Each "
         "phase takes one page, checks every statement against the current law and regulator "
         "material, fixes anything out of date, and adds far more depth: the requirements in "
         "detail, how they fit with related rules, what regulators have found in practice, worked "
         "examples, common mistakes and fuller sources. Specialist pages are then offered for "
         "expert review.")

# What every phase covers (shown on the roadmap page)
CHECKLIST = [
    "Every fact, date, threshold and deadline re-checked against the official source, and the sources list brought up to date.",
    "The requirements set out in full, section by section, in plain English.",
    "How the topic connects to related laws, standards and regulator guidance.",
    "What regulators have said and done in practice: letters, reviews, findings and enforcement.",
    "Worked examples, diagrams or tables that show how it works in a real organisation.",
    "Common mistakes, a practical checklist and answers to frequently asked questions.",
    "A history of key dates, so readers know what changed and when.",
]

# (track name, one-line description, [page urls in review order])
TRACKS = [
    ("Superannuation", "Prudential standards, fees and member outcomes for super trustees.", [
        "/standards/sps-515.html", "/standards/sps-530.html", "/sectors/superannuation.html",
        "/standards/asic-rg-97.html", "/sectors/fund-mergers-and-successor-fund-transfers.html",
        "/sectors/unit-pricing.html", "/risk-management/super-liquidity-stress-testing.html",
        "/sectors/behavioural-economics-of-super.html"]),
    ("Incidents, breaches and remediation", "From the first sign of a problem to putting it right.", [
        "/risk-management/incident-and-breach-management.html", "/compliance/breach-reporting.html",
        "/standards/asic-rg-78.html", "/compliance/breach-significance-analysis.html",
        "/standards/asic-rg-277.html", "/compliance/remediation-calculations.html",
        "/risk-management/root-cause-analysis.html", "/risk-management/issue-and-action-management.html"]),
    ("Operational resilience and third parties", "CPS 230, critical operations, service providers and continuity.", [
        "/standards/cps-230.html", "/risk-management/setting-cps-230-tolerance-levels.html",
        "/risk-management/mapping-critical-operations.html", "/risk-management/third-party-risk.html",
        "/risk-management/service-provider-exit-and-concentration.html",
        "/risk-management/business-continuity.html", "/risk-management/operational-risk.html"]),
    ("Controls and risk assessment", "Designing, testing and reporting on risks and controls.", [
        "/risk-management/control-design-and-testing.html", "/risk-management/control-testing-sampling.html",
        "/risk-management/risk-assessment-methodologies.html", "/risk-management/risk-appetite-and-tolerance.html",
        "/risk-management/kri-design-and-thresholds.html", "/risk-management/assurance-mapping.html",
        "/compliance/compliance-monitoring-and-testing.html", "/risk-management/enterprise-risk-management.html"]),
    ("Disclosure and conduct", "What firms tell customers, product design and fair treatment.", [
        "/compliance/disclosure-obligations.html", "/compliance/misleading-or-deceptive-conduct.html",
        "/standards/asic-rg-274.html", "/compliance/consumer-protection.html", "/standards/asic-rg-271.html",
        "/compliance/financial-advice-regulation.html", "/standards/asic-rg-104-and-rg-105.html",
        "/standards/asic-rg-181.html", "/governance/conflicts-of-interest.html"]),
    ("APRA prudential standards", "Risk, cyber, governance, pay, recovery and capital.", [
        "/standards/cps-220.html", "/standards/cps-234.html", "/standards/cps-510-and-cps-520.html",
        "/standards/cps-511.html", "/standards/cps-190-and-cps-900.html",
        "/standards/aps-110-and-aps-210.html", "/standards/aps-115.html"]),
    ("Governance and accountability", "Boards, FAR, culture, pay, speaking up and audit.", [
        "/governance/financial-accountability-regime.html", "/governance/board-structure-and-accountability.html",
        "/governance/board-risk-reporting.html", "/governance/reasonable-steps-and-consequence-management.html",
        "/governance/remuneration-governance.html", "/governance/culture-and-conduct.html",
        "/governance/risk-culture-assessment.html", "/governance/whistleblower-protections.html",
        "/standards/asic-rg-270.html", "/governance/internal-audit.html",
        "/governance/directors-duties-case-law.html", "/governance/ai-governance.html"]),
    ("Financial crime and compliance programs", "AML/CTF, sanctions, bribery, fraud, privacy and running compliance.", [
        "/compliance/aml-ctf-fundamentals.html", "/compliance/sanctions-compliance.html",
        "/compliance/anti-bribery-and-corruption.html", "/risk-management/fraud-risk.html",
        "/compliance/privacy-law.html", "/compliance/modern-slavery.html",
        "/compliance/climate-related-financial-disclosures.html", "/compliance/licensing-basics.html",
        "/compliance/enforcement-and-penalties.html", "/compliance/designing-a-compliance-program.html",
        "/compliance/interpreting-legislation.html"]),
    ("Risk types", "Cyber, climate, financial, model and change risk, and measuring risk.", [
        "/risk-management/cyber-risk.html", "/risk-management/climate-risk.html",
        "/risk-management/credit-market-and-liquidity-risk.html", "/risk-management/model-risk.html",
        "/risk-management/change-project-and-reputational-risk.html",
        "/risk-management/scenario-analysis-and-stress-testing.html",
        "/risk-management/quantitative-operational-risk.html", "/risk-management/risk-aggregation-and-correlation.html"]),
    ("Frameworks and international standards", "ISO, COSO, the Essential Eight and audit standards.", [
        "/standards/iso-31000.html", "/standards/coso.html", "/standards/iso-37301.html",
        "/standards/iso-22301.html", "/standards/iso-27001.html", "/standards/essential-eight.html",
        "/standards/iso-37001.html", "/standards/iso-42001.html",
        "/standards/global-internal-audit-standards.html", "/standards/asic-regulatory-guides.html"]),
    ("Sectors", "How the rules apply in each part of the economy.", [
        "/sectors/banking.html", "/sectors/insurance.html", "/sectors/general-insurance.html",
        "/sectors/life-insurance.html", "/sectors/private-health-insurance.html", "/sectors/managed-investment-schemes.html",
        "/standards/asic-rg-259.html", "/sectors/financial-advice-licensees.html",
        "/sectors/credit-and-non-bank-lenders.html", "/sectors/payments-and-fintech.html",
        "/sectors/listed-companies.html", "/sectors/not-for-profits-and-charities.html",
        "/sectors/public-sector.html"]),
    ("GRC systems", "Designing and running an integrated GRC system.", [
        "/grc/what-is-a-grc-system.html", "/grc/establishing-a-grc-system.html",
        "/grc/obligations-architecture.html", "/grc/control-framework-architecture.html",
        "/grc/risk-taxonomy-and-hierarchy.html", "/grc/grc-data-model.html",
        "/grc/governance-and-operating-model.html", "/grc/grc-technology.html",
        "/grc/grc-for-complex-groups.html"]),
    ("Foundations", "The entry-level primers.", [
        "/foundations/what-is-risk-management.html", "/foundations/what-is-compliance.html",
        "/foundations/what-is-governance.html", "/foundations/regulatory-landscape.html",
        "/foundations/three-lines-model.html", "/foundations/core-frameworks-compared.html"]),
    ("Case studies", "What went wrong, and the lessons.", [
        "/case-studies/hayne-royal-commission.html", "/case-studies/apra-cba-prudential-inquiry.html",
        "/case-studies/austrac-cba-westpac.html", "/case-studies/optus-medibank-data-breaches.html",
        "/case-studies/asic-cyber-cases-ri-advice-and-fiig.html", "/case-studies/shield-and-first-guardian.html",
        "/case-studies/hih-insurance-collapse.html"]),
    ("Research and theory", "The university-level research pages.", [
        "/compliance/theories-of-regulation.html", "/governance/corporate-governance-theories.html",
        "/risk-management/theories-of-risk.html", "/risk-management/does-erm-work.html",
        "/governance/three-lines-research-and-critique.html", "/governance/internal-audit-effectiveness.html",
        "/governance/remuneration-incentives-and-risk-taking.html", "/governance/whistleblowing-research.html",
        "/compliance/misconduct-in-financial-services-research.html", "/compliance/aml-ctf-effectiveness.html",
        "/compliance/fraud-theory.html", "/risk-management/economics-of-cyber-risk.html",
        "/risk-management/climate-risk-research.html", "/risk-management/human-factors-and-bias.html"]),
]

# url -> (date finished, what changed)
DONE = {
    "/standards/sps-515.html": ("2 October 2026",
        "Rewritten requirement by requirement for the 2025 version: strategic objectives, the business plan, "
        "expenditure management, monitoring and triggers, the business performance review, the outcomes "
        "assessment, the retirement income strategy and transfer planning; APRA's expenditure crackdown and "
        "findings; a worked example; common mistakes; board questions; FAQs and a timeline."),
    "/standards/sps-530.html": ("2 October 2026",
        "Expanded requirement by requirement: the framework and its three-yearly independent review, objectives "
        "and the SIS Act investment covenant, due diligence, monitoring, the valuation policy, liquidity "
        "management and stress testing; APRA's Canva and unlisted valuation reviews; the June 2026 proposals "
        "after Shield and First Guardian; a revaluation trigger example; board questions and FAQs."),
    "/sectors/superannuation.html": ("2 October 2026",
        "Every claim re-checked; added insurance in super (inactive and low-balance rules, claims handling and ASIC's Report 831), recent enforcement (AustralianSuper, Cbus, Australian Ethical, Mercer, platform trustees), a key dates table, Payday Super and Division 296 updates, the June 2026 CPS 510 consultation, common weak spots, board questions and FAQs."),
    "/standards/asic-rg-97.html": ("2 October 2026",
        "Re-checked against ASIC's current material; added the SIS Act fee rules (exit fee ban, 3% cap, MySuper fees, advice fees), common mistakes, fee governance review questions, a key dates table, FAQs, and updated the stamp duty change (CS 39) and the 2026–27 RG 97 review."),
    "/sectors/fund-mergers-and-successor-fund-transfers.html": ("2 October 2026",
        "Re-checked; added the merger process stage by stage with risks and controls, merger tax relief (Division 310, permanent since 2020), combined performance test histories, the ACCC's 2026 merger regime and its exemption for member transfers, common mistakes, board questions and key dates."),
    "/sectors/unit-pricing.html": ("2 October 2026",
        'Re-checked (RG 94 updated April 2026); added a worked error calculation for joining, leaving and remaining members, how unit pricing is governed (RG 94 principles in our own words, outsourced pricing and CPS 230), breach reporting links, common mistakes, board questions, key dates and FAQs.'),
    "/risk-management/super-liquidity-stress-testing.html": ("2 October 2026",
        "Re-checked (early release figures, the 3-business-day rollover rule); added a worked 30-day liquidity coverage check, APRA's December 2024 liquidity findings and 2026 private markets data, common mistakes, board questions and key dates including Payday Super."),
    "/sectors/behavioural-economics-of-super.html": ("2 October 2026",
        'Re-checked; added how Australian super is built around defaults (the 12% guarantee, MySuper, stapling, the performance test, YourSuper, insurance defaults, the retirement income covenant), what it means for trustees, and key dates.'),
    "/risk-management/incident-and-breach-management.html": ("2 October 2026",
        "Re-checked every timeframe; added an example severity scale, what to record, what regulators have found (ASIC's 2025 review: 31% of breaches took over a year to identify; the 2026 Mercer Super penalty), the June 2025 ASIC relief, common mistakes, board questions and key dates."),
    "/compliance/breach-reporting.html": ("2 October 2026",
        "Every timeframe re-checked; added ASIC's June 2025 relief in detail (60-day investigations, minor breach exemption, one report for APRA and ASIC), the IFTI to IVTS transition, what a good breach assessment records, ASIC's findings and the Mercer Super penalty, common mistakes, key dates and FAQs."),
    "/standards/asic-rg-78.html": ("2 October 2026",
        'Doubled in depth: reasonable grounds, whose knowledge counts, likely breaches, material loss, what a report contains, a worked fee-overcharge example applying every test, common mistakes, key dates (including the 2025 relief and the 2026 Mercer penalty) and FAQs.'),
    "/compliance/breach-significance-analysis.html": ("2 October 2026",
        "Re-checked the tests; added how ASIC's June 2025 relief changes the analysis (minor breach conditions, 60-day investigations, APRA reports), a fifth worked case on an investigation that drifts past 60 days (drawing on the Mercer Super penalty), and two more common errors."),
    "/standards/asic-rg-277.html": ("7 October 2026",
        "Doubled in depth: foregone returns (actual, beneficial assumptions, the cash rate plus 6% example), review periods, finding and paying people, a worked super fee example, ASIC's findings from 2018 to 2026 (including the 2026 Cambridge Mercantile licence conditions), common mistakes, board questions, key dates and FAQs."),
    "/compliance/remediation-calculations.html": ("7 October 2026",
        'Re-checked against RG 277 and the RBA; tightened the cash rate plus 6% wording, updated the calculator to the 4.60% cash rate (from 30 September 2026), and added special cases (rollovers and preservation, retirees, deaths, switches, insurance, tax, small amounts), program oversight measures and common mistakes.'),
    "/risk-management/root-cause-analysis.html": ("7 October 2026",
        'Re-checked; added what Australian regulators expect (CPS 230, ASIC breach reporting findings, the CBA inquiry, RG 277), running an analysis step by step, a report structure, turning incidents into themes, common mistakes and board questions.'),
    "/risk-management/issue-and-action-management.html": ("7 October 2026",
        'Doubled in depth: why it matters to regulators (CPS 230, FAR reasonable steps, the IIA standards), what a good register records, a worked example from control test to validation, risk acceptance, reporting measures, common mistakes and board questions.'),
    "/standards/cps-230.html": ("7 October 2026",
        'Re-checked; added the 2026 non-traditional provider exemption in detail (categories, conditions, scope, register flag), minimum critical operations by entity type, a worked example from identifying a critical operation to testing and notification, how APRA supervises CPS 230, board questions and FAQs.'),
    "/risk-management/setting-cps-230-tolerance-levels.html": ("7 October 2026",
        'Re-checked; added how tolerance levels differ from RTOs, RPOs and UK impact tolerances, a tolerance statement template, board questions and FAQs.'),
    "/risk-management/mapping-critical-operations.html": ("7 October 2026",
        'Re-checked; added keeping maps current (update triggers, owners, links to registers), common mistakes, board questions and FAQs.'),
    "/risk-management/third-party-risk.html": ("7 October 2026",
        'Re-checked; added what to monitor for a material provider, common mistakes, board questions, FAQs (related parties, fourth parties, proportionality) and key dates for CPS 230.'),
    "/risk-management/service-provider-exit-and-concentration.html": ("7 October 2026",
        'Re-checked; added an illustrative exit plan on a page, common mistakes and board questions.'),
    "/risk-management/business-continuity.html": ("7 October 2026",
        'Re-checked (corrected the minimum critical operations for super to include fund administration); added roles, common mistakes, board questions and FAQs.'),
    "/risk-management/operational-risk.html": ("7 October 2026",
        'Re-checked; added example key risk indicators, common mistakes, board questions, FAQs and key dates for CPS 230.'),
    "/risk-management/control-design-and-testing.html": ("7 October 2026",
        'Re-checked; added a worked test of a daily reconciliation from design to conclusion, common mistakes, board questions and FAQs.'),
    "/risk-management/control-testing-sampling.html": ("7 October 2026",
        'Re-checked; added common sampling mistakes and board questions.'),
    "/risk-management/risk-assessment-methodologies.html": ("7 October 2026",
        'Re-checked; added how to run a risk and control self-assessment step by step, common mistakes, board questions and FAQs.'),
    "/risk-management/risk-appetite-and-tolerance.html": ("7 October 2026",
        'Re-checked; added a worked set of appetite metrics with triggers and limits for a super fund, board questions and FAQs.'),
    "/risk-management/kri-design-and-thresholds.html": ("7 October 2026",
        'Re-checked; added example KRI catalogue entries, common mistakes and board questions.'),
    "/risk-management/assurance-mapping.html": ("7 October 2026",
        'Re-checked; added how to rate the quality of assurance, common mistakes, board questions and FAQs (including the IIA standards on coordination and reliance).'),
    "/compliance/compliance-monitoring-and-testing.html": ("7 October 2026",
        'Re-checked; added an example extract from an annual monitoring plan, common mistakes and board questions.'),
    "/risk-management/enterprise-risk-management.html": ("7 October 2026",
        'Re-checked; added what CPS 220 and SPS 220 expect of the framework, common mistakes, board questions and FAQs.'),
    "/compliance/disclosure-obligations.html": ("7 October 2026",
        'Added recent greenwashing enforcement, common mistakes, board questions and key dates'),
    "/compliance/misleading-or-deceptive-conduct.html": ("7 October 2026",
        'Added the tests courts applied in greenwashing cases, board questions and FAQs'),
    "/standards/asic-rg-274.html": ("7 October 2026",
        "Added who must do what, ASIC's stop orders and penalties, common mistakes, board questions and FAQs"),
    "/compliance/consumer-protection.html": ("7 October 2026",
        'Added lessons from Shield and First Guardian, updated scams framework dates, board questions and FAQs'),
    "/standards/asic-rg-271.html": ("7 October 2026",
        'Added a table of maximum IDR timeframes, other key rules, IDR data reporting, what ASIC has found, common mistakes and board questions'),
    "/compliance/financial-advice-regulation.html": ("7 October 2026",
        'Added the general obligations in more detail, why they matter, common mistakes, FAQs and the August 2026 reform announcement'),
    "/standards/asic-rg-104-and-rg-105.html": ("7 October 2026",
        'Added the general obligations in more detail, common mistakes and FAQs'),
    "/standards/asic-rg-181.html": ("7 October 2026",
        'Added common conflicts in financial services, how the rules have tightened, common mistakes and FAQs'),
    "/governance/conflicts-of-interest.html": ("7 October 2026",
        "Added a worked example of a director's conflict, board questions and FAQs"),
}

# Pages excluded from the programme on purpose (short by design, or tools)
EXCLUDED = ["/governance/board-briefings.html", "/grc/model-builder.html"]
EXCLUDED_PREFIXES = ["/governance/briefing-"]
