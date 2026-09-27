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
     ("/standards/coso.html", "COSO's ERM and internal control frameworks.")]),
   ("Apply it", [
     ("/learn/risk-heat-map.html", "Build and score your own mini risk register."),
     ("/learn/scenarios.html", "Try \"The administrator goes dark\" (CPS 230 outage)."),
     ("/learn/quizzes.html", "Take the Risk management and Standards quizzes.")])]),
 ("compliance", "Compliance professional",
  "For compliance officers, analysts and anyone who handles breaches, disclosure or regulatory change.",
  [("Beginner", [
     ("/foundations/what-is-compliance.html", "Refresh the fundamentals."),
     ("/compliance/licensing-basics.html", "AFS, credit and APRA licences, and licensee obligations."),
     ("/compliance/privacy-law.html", "The Privacy Act, the APPs and data breaches."),
     ("/compliance/aml-ctf-fundamentals.html", "Money laundering and terrorism financing obligations.")]),
   ("Intermediate", [
     ("/compliance/designing-a-compliance-program.html", "Build a program around an obligations register."),
     ("/compliance/disclosure-obligations.html", "What customers must be told, and when."),
     ("/compliance/consumer-protection.html", "Protections across the product life cycle."),
     ("/risk-management/incident-and-breach-management.html", "The incident and breach life cycle."),
     ("/compliance/breach-reporting.html", "Every reporting regime and deadline in one place."),
     ("/standards/asic-rg-78.html", "ASIC's breach reporting guidance."),
     ("/standards/asic-rg-271.html", "Complaints handling standards."),
     ("/standards/asic-rg-274.html", "Design and distribution obligations."),
     ("/standards/asic-rg-277.html", "Putting things right for customers.")]),
   ("Apply it", [
     ("/learn/scenarios.html", "Try \"The fee that shouldn't have been charged\"."),
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
     ("/governance/culture-and-conduct.html", "Culture, risk culture and conduct risk."),
     ("/risk-management/risk-appetite-and-tolerance.html", "The board's role in setting risk appetite."),
     ("/standards/coso.html", "The COSO frameworks behind many control environments.")]),
   ("Apply it", [
     ("/learn/scenarios.html", "Try \"An uncomfortable email\" (whistleblower disclosure)."),
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
     ("/standards/asic-rg-277.html", "Remediating members, including lost earnings."),
     ("/standards/asic-rg-271.html", "Complaints, including the 45-day super timeframe."),
     ("/governance/financial-accountability-regime.html", "FAR for super trustees since 15 March 2025."),
     ("/sectors/managed-investment-schemes.html", "Platforms, investment options and the Shield and First Guardian lessons.")]),
   ("Apply it", [
     ("/learn/scenarios.html", "Try \"The fee that shouldn't have been charged\" and \"The administrator goes dark\"."),
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
     ("/compliance/breach-reporting.html", "Overlapping notification clocks after a cyber incident.")]),
   ("Apply it", [
     ("/learn/scenarios.html", "Try \"The administrator goes dark\"."),
     ("/learn/flashcards.html", "Practise the \"Key numbers and deadlines\" deck.")])]),
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
<meta name="description" content="Suggested reading orders through RiskLens Australia for risk, compliance, governance, superannuation and cyber roles, from beginner to intermediate and practice, with progress tracking in your browser.">
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
    <span>Last reviewed: 27 September 2026</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">How pathways work</h2>
    <ul>
      <li>Each pathway moves through <strong>Beginner</strong> pages, then <strong>Intermediate</strong> pages, then <strong>Apply it</strong>: scenarios, tools and quizzes.</li>
      <li>Tick off pages as you finish them. Your progress is saved only in this browser, and a page ticked in one pathway is ticked in all of them.</li>
      <li>Advanced deep-dives are still being written and will be added to these pathways as they go live.</li>
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

  <p class="last-reviewed">Last reviewed: 27 September 2026</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

<script src="/scripts/pathways.js"></script>
</body>
</html>
'''
(ROOT / 'learn' / 'pathways.html').write_text(page)
print('ok', sum(sum(len(s) for _, s in st) for _,_,_,st in P), 'steps')
