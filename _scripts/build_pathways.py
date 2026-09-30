# Generates learn/pathways.html from the pathway lists below (titles are read from each page's <h1>).
# Run: python3 _scripts/build_pathways.py && python3 _scripts/sync_layout.py
import re, html
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
def info(url):
    p = ROOT / url.lstrip('/')
    if url.endswith('/'): p = p / 'index.html'
    s = p.read_text()
    t = re.search(r'<h1>(.*?)</h1>', s, re.S).group(1).strip()
    lv = re.search(r'class="level level-[a-z]+">([A-Za-z]+)', s)
    return t, (lv.group(1) if lv else '')

P = [
 ("essentials", "Start here: risk and compliance essentials",
  "For anyone new to the field, or moving into a risk, compliance or governance role.",
  [("Beginner", [
     ("/foundations/what-is-risk-management.html", "The core idea: risk, objectives and the risk management loop."),
     ("/foundations/what-is-compliance.html", "What obligations are and how a compliance program works."),
     ("/foundations/what-is-governance.html", "Who directs and who manages, and why it matters."),
     ("/foundations/three-lines-model.html", "Who does what: the business, risk and compliance, and internal audit."),
     ("/foundations/regulatory-landscape.html", "Who regulates what in Australia."),
     ("/foundations/core-frameworks-compared.html", "ISO 31000, COSO and Three Lines side by side.")]),
   ("Apply it", [
     ("/learn/flashcards.html", "Lock in the vocabulary with the 20-card glossary deck."),
     ("/learn/quizzes.html", "Take the Foundations quiz.")])]),
 ("risk", "Risk management practitioner",
  "For risk analysts, operational risk and second-line risk teams.",
  [("Beginner", [
     ("/foundations/what-is-risk-management.html", "Refresh the fundamentals."),
     ("/standards/iso-31000.html", "The international risk management guidance, in plain English."),
     ("/risk-management/credit-market-and-liquidity-risk.html", "The financial risks every institution faces.")]),
   ("Intermediate", [
     ("/risk-management/risk-appetite-and-tolerance.html", "How much risk to take, and how to set limits."),
     ("/risk-management/risk-assessment-methodologies.html", "Identify, analyse and evaluate risks."),
     ("/risk-management/control-design-and-testing.html", "Design controls well and test that they work."),
     ("/risk-management/operational-risk.html", "People, process, systems and external events."),
     ("/risk-management/enterprise-risk-management.html", "Seeing risk across the whole organisation."),
     ("/standards/cps-220.html", "APRA's risk management requirements."),
     ("/standards/cps-230.html", "APRA's operational risk, continuity and service provider requirements."),
     ("/risk-management/business-continuity.html", "Staying within tolerance through disruption."),
     ("/risk-management/third-party-risk.html", "Managing reliance on service providers."),
     ("/standards/coso.html", "COSO's ERM and internal control frameworks."),
     ("/standards/iso-22301.html", "The business continuity management standard."),
     ("/risk-management/climate-risk.html", "Physical and transition risk, and APRA's CPG 229."),
     ("/risk-management/cyber-risk.html", "Threats, the Essential Eight and incident response."),
     ("/risk-management/fraud-risk.html", "Preventing and detecting fraud."),
     ("/risk-management/model-risk.html", "Managing the risk of models, including AI."),
     ("/risk-management/issue-and-action-management.html", "Making sure identified weaknesses actually get fixed."),
     ("/risk-management/assurance-mapping.html", "Who checks what across the three lines."),
     ("/risk-management/change-project-and-reputational-risk.html", "Managing risk through change.")]),
   ("Advanced", [
     ("/risk-management/quantitative-operational-risk.html", "Loss distributions, VaR and expected shortfall."),
     ("/risk-management/scenario-analysis-and-stress-testing.html", "Severe but plausible scenarios and reverse stress tests."),
     ("/risk-management/setting-cps-230-tolerance-levels.html", "A method for setting tolerance levels."),
     ("/risk-management/risk-aggregation-and-correlation.html", "From many risks to one enterprise risk profile."),
     ("/risk-management/control-testing-sampling.html", "Sample sizes, confidence and evidence."),
     ("/standards/cps-190-and-cps-900.html", "Recovery, exit and resolution planning."),
     ("/risk-management/kri-design-and-thresholds.html", "Indicators that predict, and thresholds that mean something."),
     ("/risk-management/root-cause-analysis.html", "5 whys, bow-tie and fault trees."),
     ("/risk-management/human-factors-and-bias.html", "How bias distorts risk judgements, and how to counter it."),
     ("/risk-management/mapping-critical-operations.html", "CPS 230 process and resource mapping."),
     ("/risk-management/service-provider-exit-and-concentration.html", "Fourth parties, concentration and exit plans."),
     ("/standards/aps-115.html", "How banks hold capital for operational risk."),
     ("/risk-management/theories-of-risk.html", "Why people perceive risk differently, and why some systems fail."),
     ("/risk-management/does-erm-work.html", "What the evidence says about whether ERM adds value."),
     ("/risk-management/climate-risk-research.html", "Whether markets price climate risk, and how it could spread."),
     ("/learn/advanced-study-program.html", "Go further with the 12-module university-style course.")]),
   ("Apply it", [
     ("/learn/risk-heat-map.html", "Build and score your own mini risk register."),
     ("/tools/rcsa-template.html", "Run a risk and control self-assessment."),
     ("/tools/control-testing-workpaper.html", "Test a control from plan to conclusion."),
     ("/tools/kri-library.html", "Choose key risk indicators and set thresholds."),
     ("/case-studies/apra-cba-prudential-inquiry.html", "What happens when non-financial risk is neglected."),
     ("/learn/scenarios.html", "Try \"The administrator goes dark\" and \"The payments that didn't go out\"."),
     ("/learn/quizzes.html", "Take the Risk management and Standards quizzes.")])]),
 ("compliance", "Compliance professional",
  "For compliance officers, analysts and anyone who handles breaches, disclosure or regulatory change.",
  [("Beginner", [
     ("/foundations/what-is-compliance.html", "Refresh the fundamentals."),
     ("/compliance/licensing-basics.html", "AFS, credit and APRA licences, and licensee obligations."),
     ("/compliance/privacy-law.html", "The Privacy Act, the APPs and data breaches."),
     ("/compliance/aml-ctf-fundamentals.html", "Money laundering and terrorism financing obligations."),
     ("/standards/asic-regulatory-guides.html", "What ASIC's regulatory guides are and how to use them."),
     ("/standards/asic-rg-104-and-rg-105.html", "Licensees' general obligations and competence.")]),
   ("Intermediate", [
     ("/compliance/designing-a-compliance-program.html", "Build a program around an obligations register."),
     ("/compliance/disclosure-obligations.html", "What customers must be told, and when."),
     ("/compliance/consumer-protection.html", "Protections across the product life cycle."),
     ("/risk-management/incident-and-breach-management.html", "The incident and breach life cycle."),
     ("/compliance/breach-reporting.html", "Every reporting regime and deadline in one place."),
     ("/standards/asic-rg-78.html", "ASIC's breach reporting guidance."),
     ("/standards/asic-rg-271.html", "Complaints handling standards."),
     ("/standards/asic-rg-274.html", "Design and distribution obligations."),
     ("/standards/asic-rg-277.html", "Putting things right for customers."),
     ("/compliance/financial-advice-regulation.html", "Best interests, conflicted remuneration and adviser standards."),
     ("/compliance/anti-bribery-and-corruption.html", "Bribery offences and the failure to prevent offence."),
     ("/compliance/sanctions-compliance.html", "Sanctions laws, screening and alert handling."),
     ("/compliance/modern-slavery.html", "Modern slavery statements and supply-chain risk."),
     ("/compliance/climate-related-financial-disclosures.html", "Mandatory climate reporting."),
     ("/standards/asic-rg-181.html", "ASIC's conflicts of interest guidance."),
     ("/standards/iso-37301.html", "The compliance management system standard."),
     ("/standards/iso-37001.html", "The anti-bribery management system standard.")]),
   ("Advanced", [
     ("/compliance/breach-significance-analysis.html", "Applying the significance tests to real-world style cases."),
     ("/risk-management/control-testing-sampling.html", "How much compliance testing is enough."),
     ("/compliance/compliance-monitoring-and-testing.html", "Designing a risk-based monitoring and testing program."),
     ("/compliance/interpreting-legislation.html", "Reading obligations the way courts do."),
     ("/compliance/misleading-or-deceptive-conduct.html", "The legal tests behind disclosure review."),
     ("/compliance/enforcement-and-penalties.html", "How regulators respond and penalties are set."),
     ("/compliance/remediation-calculations.html", "Calculating what affected people are owed."),
     ("/compliance/theories-of-regulation.html", "Why regulators regulate the way they do."),
     ("/compliance/misconduct-in-financial-services-research.html", "What research shows about who commits misconduct, and why."),
     ("/compliance/fraud-theory.html", "The fraud triangle, its extensions and its critics."),
     ("/compliance/aml-ctf-effectiveness.html", "The debate over whether AML/CTF works.")]),
   ("Apply it", [
     ("/tools/obligations-register-template.html", "Start an obligations register."),
     ("/tools/breach-register-template.html", "Log and track breaches and deadlines."),
     ("/tools/remediation-program-tracker.html", "Track remediation to closure."),
     ("/case-studies/austrac-cba-westpac.html", "How AML/CTF failures led to record penalties."),
     ("/learn/scenarios.html", "Try the fee error, privacy breach, marketing review, AML and advice file scenarios."),
     ("/learn/flashcards.html", "Practise the \"Key numbers and deadlines\" deck."),
     ("/learn/quizzes.html", "Take the Compliance quiz.")])]),
 ("governance", "Governance and accountability",
  "For directors, company secretaries, executives and governance teams.",
  [("Beginner", [
     ("/foundations/what-is-governance.html", "Refresh the fundamentals."),
     ("/governance/board-structure-and-accountability.html", "Boards, committees and directors' duties."),
     ("/governance/conflicts-of-interest.html", "Identifying and managing conflicts."),
     ("/governance/whistleblower-protections.html", "Protected disclosures and whistleblower policies.")]),
   ("Intermediate", [
     ("/governance/financial-accountability-regime.html", "Accountable persons, maps and statements."),
     ("/governance/remuneration-governance.html", "Incentives that support good outcomes."),
     ("/standards/cps-511.html", "APRA's remuneration standard."),
     ("/standards/asic-rg-270.html", "ASIC's guidance on whistleblower policies."),
     ("/standards/global-internal-audit-standards.html", "The IIA's internal audit standards."),
     ("/governance/culture-and-conduct.html", "Culture, risk culture and conduct risk."),
     ("/governance/ai-governance.html", "Overseeing the use of artificial intelligence."),
     ("/governance/internal-audit.html", "The third line and the audit committee."),
     ("/standards/cps-510-and-cps-520.html", "APRA's governance and fit and proper standards."),
     ("/risk-management/risk-appetite-and-tolerance.html", "The board's role in setting risk appetite."),
     ("/standards/coso.html", "The COSO frameworks behind many control environments.")]),
   ("Advanced", [
     ("/governance/board-risk-reporting.html", "What good board risk reporting looks like."),
     ("/governance/risk-culture-assessment.html", "Assessing and changing risk culture."),
     ("/risk-management/risk-aggregation-and-correlation.html", "How the enterprise risk profile is built."),
     ("/governance/directors-duties-case-law.html", "What the courts say directors' and officers' duties require."),
     ("/governance/reasonable-steps-and-consequence-management.html", "Evidencing reasonable steps and deciding consequences fairly."),
     ("/governance/corporate-governance-theories.html", "Agency, stewardship and stakeholder theories."),
     ("/governance/three-lines-research-and-critique.html", "What the research says about the three lines model."),
     ("/governance/internal-audit-effectiveness.html", "What makes internal audit effective."),
     ("/governance/remuneration-incentives-and-risk-taking.html", "How pay shapes risk-taking."),
     ("/governance/whistleblowing-research.html", "Who speaks up, and why.")]),
   ("Apply it", [
     ("/tools/example-risk-appetite-statement.html", "See a complete (fictional) risk appetite statement."),
     ("/tools/board-risk-report-template.html", "A template for the CRO's board report."),
     ("/case-studies/hih-insurance-collapse.html", "Governance lessons from Australia's largest corporate collapse."),
     ("/case-studies/hayne-royal-commission.html", "The Royal Commission's lessons for boards."),
     ("/learn/scenarios.html", "Try \"An uncomfortable email\" and \"The director's other company\"."),
     ("/learn/quizzes.html", "Take the Governance quiz.")])]),
 ("super", "Superannuation specialist",
  "For people working in or with APRA-regulated super funds.",
  [("Beginner", [
     ("/foundations/regulatory-landscape.html", "The regulators a super fund deals with."),
     ("/compliance/licensing-basics.html", "RSE licences and AFS licences.")]),
   ("Intermediate", [
     ("/sectors/superannuation.html", "Trustee covenants, APRA standards, member outcomes and fee governance."),
     ("/standards/cps-230.html", "Operational risk, critical operations and service providers."),
     ("/risk-management/third-party-risk.html", "Overseeing administrators and other providers."),
     ("/risk-management/incident-and-breach-management.html", "Incidents and breaches, including s 29JA."),
     ("/compliance/disclosure-obligations.html", "PDSs, periodic statements and fees and costs."),
     ("/standards/asic-rg-97.html", "How fees and costs must be disclosed."),
     ("/standards/asic-rg-277.html", "Remediating members, including lost earnings."),
     ("/standards/asic-rg-271.html", "Complaints, including the 45-day super timeframe."),
     ("/governance/financial-accountability-regime.html", "FAR for super trustees since 15 March 2025."),
     ("/sectors/managed-investment-schemes.html", "Platforms, investment options and the Shield and First Guardian lessons."),
     ("/compliance/financial-advice-regulation.html", "Advice rules, including advice fees paid from super."),
     ("/compliance/climate-related-financial-disclosures.html", "Climate reporting for funds with $5 billion or more."),
     ("/standards/sps-515.html", "Strategy, spending and the annual outcomes assessment."),
     ("/standards/sps-530.html", "Investment governance, valuation and liquidity.")]),
   ("Advanced", [
     ("/risk-management/setting-cps-230-tolerance-levels.html", "Tolerance levels, with a super fund example."),
     ("/compliance/breach-significance-analysis.html", "Significance analysis, including a fee error case."),
     ("/risk-management/scenario-analysis-and-stress-testing.html", "Liquidity and operational stress testing for funds."),
     ("/risk-management/super-liquidity-stress-testing.html", "Switching, hedging, unlisted assets and the denominator effect."),
     ("/sectors/unit-pricing.html", "Unit pricing and unit pricing errors."),
     ("/sectors/fund-mergers-and-successor-fund-transfers.html", "Successor fund transfers and merger risk."),
     ("/compliance/remediation-calculations.html", "Remediation calculations for members."),
     ("/sectors/behavioural-economics-of-super.html", "Defaults, inertia and choice in super.")]),
   ("Apply it", [
     ("/tools/material-service-provider-register.html", "Track material service providers."),
     ("/tools/remediation-program-tracker.html", "Track member remediation programs."),
     ("/case-studies/shield-and-first-guardian.html", "Lessons for platform trustees."),
     ("/learn/scenarios.html", "Try the fee error, provider outage, tolerance breach and related-party scenarios."),
     ("/learn/quizzes.html", "Take the Sectors and Standards quizzes.")])]),
 ("cyber", "Technology, cyber and data risk",
  "For technology risk, information security and privacy professionals.",
  [("Beginner", [
     ("/compliance/privacy-law.html", "Privacy obligations and notifiable data breaches.")]),
   ("Intermediate", [
     ("/standards/cps-234.html", "APRA's information security requirements."),
     ("/standards/iso-27001.html", "Information security management systems."),
     ("/risk-management/business-continuity.html", "Resilience, RTOs and RPOs."),
     ("/risk-management/third-party-risk.html", "Cloud and technology providers."),
     ("/standards/cps-230.html", "Operational resilience and critical operations."),
     ("/compliance/breach-reporting.html", "Overlapping notification clocks after a cyber incident."),
     ("/risk-management/cyber-risk.html", "Cyber risk management end to end."),
     ("/standards/essential-eight.html", "The ASD Essential Eight and its maturity levels."),
     ("/governance/ai-governance.html", "AI risks and governance."),
     ("/standards/iso-42001.html", "The AI management system standard.")]),
   ("Advanced", [
     ("/case-studies/asic-cyber-cases-ri-advice-and-fiig.html", "How weak cyber security became a licensee breach."),
     ("/risk-management/service-provider-exit-and-concentration.html", "Concentration in technology providers, and exit."),
     ("/risk-management/economics-of-cyber-risk.html", "Incentives, security investment and cyber insurance.")]),
   ("Apply it", [
     ("/case-studies/optus-medibank-data-breaches.html", "What the 2022 data breaches taught everyone."),
     ("/learn/scenarios.html", "Try \"The spreadsheet sent to the wrong person\" and \"The administrator goes dark\"."),
     ("/learn/flashcards.html", "Practise the \"Key numbers and deadlines\" deck.")])]),
 ("sectors", "Banking, insurance and other sectors",
  "For people working outside super, or who want to see how the rules differ across industries.",
  [("Intermediate", [
     ("/sectors/banking.html", "Banks and ADIs: prudential rules and key risks."),
     ("/standards/aps-110-and-aps-210.html", "Capital and liquidity basics."),
     ("/sectors/insurance.html", "General and life insurers."),
     ("/sectors/managed-investment-schemes.html", "Responsible entities and fund operators."),
     ("/standards/asic-rg-259.html", "ASIC's risk management expectations for fund operators."),
     ("/sectors/credit-and-non-bank-lenders.html", "Credit licensing, responsible lending and hardship."),
     ("/sectors/payments-and-fintech.html", "Payments licensing, surcharging and digital assets."),
     ("/sectors/financial-advice-licensees.html", "Supervising advisers and remediating clients."),
     ("/sectors/listed-companies.html", "Directors' duties, continuous disclosure and the ASX Principles."),
     ("/sectors/not-for-profits-and-charities.html", "ACNC standards and proportionate risk management."),
     ("/sectors/public-sector.html", "The PGPA Act and the Commonwealth Risk Management Policy.")]),
   ("Advanced", [
     ("/standards/aps-115.html", "Operational risk capital for banks."),
     ("/governance/directors-duties-case-law.html", "Directors' duties through the cases.")]),
   ("Apply it", [
     ("/case-studies/", "Work through the case studies."),
     ("/learn/quizzes.html", "Take the Sectors quiz.")])]),
]

out = []
toc = []
for pid, title, who, stages in P:
    n = sum(len(s) for _, s in stages)
    toc.append(f'      <li><a href="#{pid}">{html.escape(title)}</a> <span class="small">({n} steps)</span></li>')
    parts = [f'  <section class="pathway" id="{pid}" aria-labelledby="{pid}-h">',
             f'    <h2 id="{pid}-h">{html.escape(title)}</h2>',
             f'    <p class="pathway-who">{html.escape(who)}</p>',
             f'    <p class="pathway-progress small" aria-live="polite"></p>']
    for stage, steps in stages:
        cls = stage.lower().replace(' ', '-')
        parts.append(f'    <h3 class="pathway-stage stage-{cls}">{stage}</h3>')
        parts.append('    <ol class="pathway-steps">')
        for url, why in steps:
            t, lv = info(url)
            tag = ''
            parts.append(f'      <li data-url="{url}"><a href="{url}">{html.escape(t)}</a>{tag}<br><span class="small">{html.escape(why)}</span></li>')
        parts.append('    </ol>')
    parts.append('  </section>')
    out.append('\n'.join(parts))

page = f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Learning pathways | RiskLens Australia</title>
<meta name="description" content="Suggested reading orders through RiskLens Australia for risk, compliance, governance, superannuation, cyber and other sector roles, from beginner to advanced and practice, with progress tracking in your browser.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/learn/">Learn</a></li><li>Learning pathways</li></ol></nav>

  <h1>Learning pathways</h1>
  <p class="summary">Not sure where to start? Pick the pathway closest to your role and work through it in order, from the basics to putting it into practice.</p>
  <div class="page-meta">
    <span class="level level-beginner">Beginner</span>
    <span>Last reviewed: 30 September 2026</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">How pathways work</h2>
    <ul>
      <li>Each pathway moves through <strong>Beginner</strong> pages, then <strong>Intermediate</strong> and, where available, <strong>Advanced</strong> pages, then <strong>Apply it</strong>: scenarios, tools and quizzes.</li>
      <li>Tick off pages as you finish them. Your progress is saved only in this browser, and a page ticked in one pathway is ticked in all of them.</li>
      <li>For university-level study, the <a href="/learn/advanced-study-program.html">Advanced study program</a> groups the Advanced pages into 12 modules with readings and seminar questions.</li>
    </ul>
  </aside>

  <nav class="pathway-toc" aria-label="Pathways">
    <h2>Choose a pathway</h2>
    <ul>
{chr(10).join(toc)}
    </ul>
  </nav>

{chr(10).join(out)}

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/learn/quizzes.html" data-label="Topic quizzes"></li>
      <li data-href="/learn/scenarios.html" data-label="Scenario simulations"></li>
      <li data-href="/glossary/" data-label="Glossary"></li>
    </ul>
  </section>

  <p class="last-reviewed">Last reviewed: 30 September 2026</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

<script src="/scripts/pathways.js"></script>
</body>
</html>
'''
(ROOT / 'learn' / 'pathways.html').write_text(page)
print('ok', sum(sum(len(s) for _, s in st) for _,_,_,st in P), 'steps')
