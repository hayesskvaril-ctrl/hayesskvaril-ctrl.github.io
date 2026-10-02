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
        "/sectors/banking.html", "/sectors/insurance.html", "/sectors/managed-investment-schemes.html",
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
}

# Pages excluded from the programme on purpose (short by design, or tools)
EXCLUDED = ["/governance/board-briefings.html", "/grc/model-builder.html"]
EXCLUDED_PREFIXES = ["/governance/briefing-"]
