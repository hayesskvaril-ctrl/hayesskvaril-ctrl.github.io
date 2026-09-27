#!/usr/bin/env python3
"""Build /glossary/index.html from the TERMS list below.

Run:  python3 _scripts/build_glossary.py  (then sync_layout.py)

Each term gets a stable anchor (#slug) so articles can link to
/glossary/#risk-appetite. Don't change a slug once published, because
articles link to it. "See" links are only shown if the target page exists.
Definitions are our own plain-English wording.
"""
from pathlib import Path
from html import escape
import string

ROOT = Path(__file__).resolve().parent.parent
LAST_REVIEWED = "27 September 2026"

# (slug, term, abbreviation or "", definition (HTML allowed), [(see label, url), ...])
TERMS = [
    ("accc", "Australian Competition and Consumer Commission", "ACCC",
     "The national regulator for competition, fair trading and consumer protection. It enforces the <em>Competition and Consumer Act 2010</em> (Cth), including the Australian Consumer Law, across most of the economy.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("accountable-person", "Accountable person", "",
     "Under the Financial Accountability Regime, a director or senior executive with actual or effective senior responsibility for a key part of a bank, insurer or super trustee. Accountable persons must be registered with APRA and meet specific accountability obligations.",
     [("Financial Accountability Regime", "/glossary/#far")]),
    ("afsl", "Australian financial services licence", "AFSL",
     "The licence a business needs from ASIC to carry on a financial services business in Australia, such as giving financial product advice or dealing in financial products. Licensees must meet ongoing general obligations, including acting efficiently, honestly and fairly.",
     []),
    ("aml-ctf", "Anti-money laundering and counter-terrorism financing", "AML/CTF",
     "The laws and controls that stop criminals using legitimate businesses to hide the proceeds of crime or fund terrorism. In Australia the main law is the <em>Anti-Money Laundering and Counter-Terrorism Financing Act 2006</em> (Cth), administered by AUSTRAC.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("apra", "Australian Prudential Regulation Authority", "APRA",
     "The \"prudential\" regulator. APRA supervises banks and other authorised deposit-taking institutions, insurers, friendly societies and most superannuation funds, with a focus on keeping them financially sound so they can meet their promises to depositors, policyholders and members.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("asic", "Australian Securities and Investments Commission", "ASIC",
     "The corporate, markets, financial services and consumer credit regulator. ASIC focuses on conduct: whether companies and licensees treat consumers and investors fairly and obey the law.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("assurance", "Assurance", "",
     "An objective check that gives decision-makers confidence that something (a control, a process, a report) is working as intended. Internal audit provides independent assurance; management and second-line functions can also provide assurance.",
     [("The Three Lines model", "/foundations/three-lines-model.html")]),
    ("austrac", "Australian Transaction Reports and Analysis Centre", "AUSTRAC",
     "Australia's financial intelligence agency and AML/CTF regulator. Businesses that provide \"designated services\" must enrol with AUSTRAC, run an AML/CTF program and report certain transactions and suspicious matters.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("bia", "Business impact analysis", "BIA",
     "A structured look at what would happen if a business process or service were disrupted: how quickly harm builds up, what the process depends on, and how fast it must be restored. It is the starting point for business continuity planning.",
     [("Business continuity", "/risk-management/business-continuity.html")]),
    ("board", "Board", "",
     "The group of directors elected to oversee a company or trustee. The board sets direction and risk appetite, appoints and monitors senior management, and is ultimately accountable for the organisation. Also called the governing body.",
     [("What is governance?", "/foundations/what-is-governance.html")]),
    ("board-risk-committee", "Board risk committee", "",
     "A committee of the board that oversees the risk management framework and risk profile in more detail than the full board can. APRA requires larger regulated entities to have one.",
     []),
    ("bow-tie-analysis", "Bow-tie analysis", "",
     "A diagram that puts a risk event in the middle, its causes on the left and its consequences on the right. Preventive controls sit between causes and event; mitigating controls sit between event and consequences. The shape looks like a bow tie.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("breach", "Breach", "",
     "A failure to comply with an obligation, such as a law, licence condition, regulatory standard or internal policy. Some breaches must be reported to a regulator.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("breach-register", "Breach register", "",
     "A log of actual and possible breaches, recording what happened, the assessment, whether it was reportable, and how it was fixed. It helps an organisation spot patterns and show regulators how breaches were handled.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("bcp", "Business continuity plan", "BCP",
     "A documented plan for keeping important services running, or getting them back quickly, when something disrupts normal operations (for example a cyber attack, system outage, pandemic or loss of a key supplier).",
     [("Business continuity", "/risk-management/business-continuity.html")]),
    ("compliance", "Compliance", "",
     "Meeting your obligations: the laws, regulations, licence conditions, industry codes, contracts and internal policies that apply to you. A compliance function helps the business identify its obligations, build them into how it works, and check they are being met.",
     [("What is compliance?", "/foundations/what-is-compliance.html")]),
    ("compliance-obligation", "Compliance obligation", "",
     "A specific requirement the organisation must (or has chosen to) meet, for example a section of an Act, a clause of a prudential standard or a commitment in an industry code.",
     [("What is compliance?", "/foundations/what-is-compliance.html")]),
    ("compliance-risk", "Compliance risk", "",
     "The risk of legal or regulatory penalties, financial loss or damage to reputation because the organisation fails to meet its obligations.",
     [("What is compliance?", "/foundations/what-is-compliance.html")]),
    ("concentration-risk", "Concentration risk", "",
     "The risk that comes from relying too heavily on one thing, such as one borrower, industry, supplier or system, so that a single failure has an outsized impact.",
     []),
    ("conduct-risk", "Conduct risk", "",
     "The risk that the way an organisation or its people behave leads to poor outcomes for customers or members, or harms market integrity.",
     [("Operational risk", "/risk-management/operational-risk.html")]),
    ("conflict-of-interest", "Conflict of interest", "",
     "A situation where a person's or organisation's own interests could influence, or be seen to influence, a decision they are meant to make in someone else's interest.",
     []),
    ("consequence", "Consequence", "",
     "The outcome of an event and how much it affects objectives, for example financial loss, harm to customers, regulatory action or reputational damage. Often called impact or severity.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("control", "Control", "",
     "Any measure that changes a risk: a process, policy, system setting, check or approval that makes a bad event less likely or reduces its impact.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("control-design-effectiveness", "Control design effectiveness", "",
     "Whether a control, if it works as described, is actually capable of managing the risk it is meant to manage. A well-designed control targets the right cause, at the right time, with the right coverage.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("control-environment", "Control environment", "",
     "The overall attitude, structures and standards that shape how seriously controls are taken across an organisation, including tone from leaders, accountability and competence. It is the foundation component of the COSO internal control framework.",
     [("Core frameworks compared", "/foundations/core-frameworks-compared.html")]),
    ("control-operating-effectiveness", "Control operating effectiveness", "",
     "Whether a control actually operated as designed, consistently, over a period of time. Tested by checking evidence from a sample of occasions the control should have run.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("control-owner", "Control owner", "",
     "The person accountable for making sure a control is designed properly, performed and evidenced.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("control-testing", "Control testing", "",
     "Checking whether controls are well designed and working in practice, using methods such as walkthroughs, inspection of evidence, re-performance and data analysis.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("coso", "COSO", "",
     "The Committee of Sponsoring Organizations of the Treadway Commission, a US private-sector body. It publishes two widely used frameworks: <em>Internal Control – Integrated Framework</em> (2013) and <em>Enterprise Risk Management – Integrating with Strategy and Performance</em> (2017).",
     [("Core frameworks compared", "/foundations/core-frameworks-compared.html")]),
    ("credit-risk", "Credit risk", "",
     "The risk of loss because a borrower or counterparty does not pay what it owes, in full or on time.",
     [("Credit, market and liquidity risk", "/risk-management/credit-market-and-liquidity-risk.html")]),
    ("critical-operation", "Critical operation", "",
     "Under APRA's CPS 230, a process or service that, if disrupted beyond tolerance, would have a material adverse impact on depositors, policyholders, members or the entity's role in the financial system. Regulated entities must identify them and set tolerance levels for them.",
     [("Business continuity", "/risk-management/business-continuity.html")]),
    ("cps-230", "CPS 230", "",
     "APRA's cross-industry prudential standard on operational risk management, in force from 1 July 2025. It covers operational risk, business continuity and management of service providers, and replaced earlier standards on outsourcing and business continuity.",
     [("Operational risk", "/risk-management/operational-risk.html")]),
    ("detective-control", "Detective control", "",
     "A control that finds a problem after it has happened, such as a reconciliation, exception report or review. Compare preventive control.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("due-diligence", "Due diligence", "",
     "Reasonable investigation before a decision, for example checking a potential service provider's financial health, security and track record before signing a contract.",
     [("Third-party risk", "/risk-management/third-party-risk.html")]),
    ("emerging-risk", "Emerging risk", "",
     "A new or changing risk that is not yet well understood or measured, such as a new technology, regulatory direction or climate-related change.",
     [("Enterprise risk management", "/risk-management/enterprise-risk-management.html")]),
    ("erm", "Enterprise risk management", "ERM",
     "Managing risk across the whole organisation in a joined-up way, linked to strategy, rather than in separate silos. ERM looks at how risks interact and at the organisation's total risk profile.",
     [("Enterprise risk management", "/risk-management/enterprise-risk-management.html")]),
    ("far", "Financial Accountability Regime", "FAR",
     "A law that sets accountability obligations for banks, insurers and superannuation trustees and their directors and most senior executives (accountable persons). It is jointly administered by APRA and ASIC. It started for banks on 15 March 2024 and for insurers and super trustees on 15 March 2025.",
     []),
    ("first-line", "First line", "",
     "In the Three Lines model, the people and teams who deliver products and services and own and manage the risks in their day-to-day work.",
     [("The Three Lines model", "/foundations/three-lines-model.html")]),
    ("fourth-party", "Fourth party", "",
     "A supplier's supplier: a company that your service provider relies on (a subcontractor). Problems at a fourth party can disrupt you even though you have no contract with them.",
     [("Third-party risk", "/risk-management/third-party-risk.html")]),
    ("governance", "Governance", "",
     "The system by which an organisation is directed, controlled and held to account: who decides what, how decisions are made and checked, and how those in charge answer for results.",
     [("What is governance?", "/foundations/what-is-governance.html")]),
    ("heat-map", "Heat map", "",
     "A colour-coded chart that plots risks by likelihood and consequence so the most serious ones stand out (usually red). A visual form of risk matrix.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("incident", "Incident", "",
     "An event that has caused, or could have caused, loss, harm or disruption, for example a system outage, processing error, fraud or data breach. Not every incident is a breach of an obligation, and not every breach starts as an obvious incident.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("inherent-risk", "Inherent risk", "",
     "The level of a risk before taking account of controls (or assuming the controls fail). Different organisations define it slightly differently, so check the definition in use.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("internal-audit", "Internal audit", "",
     "An independent function, reporting to the board or audit committee, that gives objective assurance and advice on whether governance, risk management and controls are working. The third line in the Three Lines model.",
     [("The Three Lines model", "/foundations/three-lines-model.html")]),
    ("internal-control", "Internal control", "",
     "The processes an organisation puts in place to give reasonable confidence that it will achieve its objectives for operations, reporting and compliance.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("iso-31000", "ISO 31000", "",
     "The international guideline on risk management, published by the International Organization for Standardization. The current edition is ISO 31000:2018. It sets out principles, a framework and a process. It is guidance, so organisations cannot be certified against it.",
     [("Core frameworks compared", "/foundations/core-frameworks-compared.html")]),
    ("key-control", "Key control", "",
     "A control that, on its own or with a few others, is essential to managing a significant risk. Key controls usually get the most testing attention.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("kri", "Key risk indicator", "KRI",
     "A measure that gives early warning that a risk is rising, for example staff turnover in a critical team, system downtime or the number of overdue complaints. KRIs usually have thresholds that trigger escalation.",
     [("Risk appetite and tolerance", "/risk-management/risk-appetite-and-tolerance.html")]),
    ("likelihood", "Likelihood", "",
     "How probable it is that an event will happen within a set time period. It can be described in words (\"rare\", \"likely\"), as a frequency or as a probability.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("liquidity-risk", "Liquidity risk", "",
     "The risk that an organisation cannot pay its obligations when they fall due, or can only do so at excessive cost, because it cannot get cash quickly enough.",
     [("Credit, market and liquidity risk", "/risk-management/credit-market-and-liquidity-risk.html")]),
    ("market-risk", "Market risk", "",
     "The risk of loss from movements in market prices such as interest rates, exchange rates, share prices and commodity prices.",
     [("Credit, market and liquidity risk", "/risk-management/credit-market-and-liquidity-risk.html")]),
    ("material-service-provider", "Material service provider", "",
     "Under APRA's CPS 230, a service provider that an entity relies on to carry out a critical operation, or that exposes it to material operational risk. These arrangements attract extra requirements such as formal agreements and notifying APRA.",
     [("Third-party risk", "/risk-management/third-party-risk.html")]),
    ("materiality", "Materiality", "",
     "Whether something is significant enough to matter to a decision, a report or a regulator. Many reporting obligations only apply to \"material\" or \"significant\" matters, which requires judgement.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("near-miss", "Near miss", "",
     "An event that could have caused loss or harm but didn't, often through luck or a last-minute catch. Near misses are valuable warning signs and are usually recorded like incidents.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("ndb", "Notifiable data breach", "NDB",
     "Under the <em>Privacy Act 1988</em> (Cth), a data breach involving personal information that is likely to result in serious harm to an individual. The organisation must notify affected individuals and the OAIC.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("oaic", "Office of the Australian Information Commissioner", "OAIC",
     "The regulator for privacy and freedom of information. It oversees the <em>Privacy Act 1988</em> (Cth) and the Notifiable Data Breaches scheme.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("obligations-register", "Obligations register", "",
     "A list of the compliance obligations that apply to an organisation, usually mapped to the owners, processes and controls that make sure each one is met.",
     [("What is compliance?", "/foundations/what-is-compliance.html")]),
    ("operational-resilience", "Operational resilience", "",
     "The ability to keep delivering critical services through a disruption, and to recover quickly, rather than only trying to prevent disruption in the first place.",
     [("Business continuity", "/risk-management/business-continuity.html")]),
    ("operational-risk", "Operational risk", "",
     "The risk of loss or harm from inadequate or failed internal processes, people or systems, or from external events. It includes things like fraud, errors, IT failures, legal and compliance failures, and supplier problems.",
     [("Operational risk", "/risk-management/operational-risk.html")]),
    ("outsourcing", "Outsourcing", "",
     "Using another company to perform an activity the organisation would otherwise do itself. The organisation stays responsible for the outcome even though someone else does the work.",
     [("Third-party risk", "/risk-management/third-party-risk.html")]),
    ("policy", "Policy", "",
     "A formal statement of the principles and rules an organisation has decided to follow on a topic. Procedures then set out the step-by-step way to carry the policy out.",
     []),
    ("preventive-control", "Preventive control", "",
     "A control that stops a problem happening in the first place, such as an approval, a system restriction or segregation of duties. Compare detective control.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("prudential-standard", "Prudential standard", "",
     "A legally binding rule made by APRA that regulated entities must follow, for example CPS 220 Risk Management or CPS 230 Operational Risk Management. APRA also issues non-binding prudential practice guides (such as CPG 230) that explain its expectations.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("rcsa", "Risk and control self-assessment", "RCSA",
     "A process where the business (first line) regularly assesses its own risks and how well its controls are working, usually with support and challenge from the risk function.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("remediation", "Remediation", "",
     "Fixing a problem and its effects: correcting the cause so it doesn't happen again, and putting affected customers or members back in the position they should have been in (for example through refunds with interest).",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("reportable-situation", "Reportable situation", "",
     "Under the Corporations Act and the National Consumer Credit Protection Act, a category of breaches and other matters that financial services and credit licensees must report to ASIC. Most must be reported within 30 calendar days.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("residual-risk", "Residual risk", "",
     "The level of risk that remains after taking account of the controls in place. It is compared with risk appetite to decide whether more action is needed.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("risk", "Risk", "",
     "Uncertainty about what will happen and how it will affect what you are trying to achieve. ISO 31000 describes risk as the effect of uncertainty on objectives, which can be negative or positive. In everyday use, \"a risk\" usually means something that could go wrong.",
     [("What is risk management?", "/foundations/what-is-risk-management.html")]),
    ("risk-acceptance", "Risk acceptance", "",
     "A deliberate, documented decision by someone with the right authority to live with a risk rather than reduce it further, usually for a set period.",
     [("Risk appetite and tolerance", "/risk-management/risk-appetite-and-tolerance.html")]),
    ("risk-appetite", "Risk appetite", "",
     "The amount and types of risk an organisation is willing to take on to achieve its objectives. It is set by the board and guides everyday decisions.",
     [("Risk appetite and tolerance", "/risk-management/risk-appetite-and-tolerance.html")]),
    ("risk-appetite-statement", "Risk appetite statement", "RAS",
     "The written, board-approved document that sets out risk appetite, usually with qualitative statements and measurable limits for each major risk category. APRA-regulated entities must have one.",
     [("Risk appetite and tolerance", "/risk-management/risk-appetite-and-tolerance.html")]),
    ("risk-assessment", "Risk assessment", "",
     "The overall process of identifying risks, analysing how likely and severe they are, and evaluating which need action.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("risk-capacity", "Risk capacity", "",
     "The maximum amount of risk an organisation could absorb before it failed, breached its regulatory minimums or could no longer meet its obligations. Risk appetite should sit well inside risk capacity.",
     [("Risk appetite and tolerance", "/risk-management/risk-appetite-and-tolerance.html")]),
    ("risk-culture", "Risk culture", "",
     "The shared values, beliefs and behaviours that shape how people in an organisation think about and handle risk, for example whether people speak up about problems and whether bad news travels upward.",
     [("Enterprise risk management", "/risk-management/enterprise-risk-management.html")]),
    ("risk-management", "Risk management", "",
     "Coordinated activities to direct and control an organisation with regard to risk: identifying what could affect objectives, deciding what to do about it, and monitoring the results.",
     [("What is risk management?", "/foundations/what-is-risk-management.html")]),
    ("risk-management-framework", "Risk management framework", "RMF",
     "The full set of structures, policies, processes, people and systems an organisation uses to manage risk. Under APRA's CPS 220 it includes the risk appetite statement and risk management strategy.",
     [("Enterprise risk management", "/risk-management/enterprise-risk-management.html")]),
    ("risk-matrix", "Risk matrix", "",
     "A grid with likelihood on one axis and consequence on the other, used to give each risk a rating such as low, medium, high or extreme.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("risk-owner", "Risk owner", "",
     "The person accountable for managing a particular risk, including making sure controls and actions are in place.",
     [("What is risk management?", "/foundations/what-is-risk-management.html")]),
    ("risk-profile", "Risk profile", "",
     "A description of all the risks an organisation (or part of it) currently faces and their levels, at a point in time.",
     [("Enterprise risk management", "/risk-management/enterprise-risk-management.html")]),
    ("risk-register", "Risk register", "",
     "A record of identified risks, with their causes, consequences, ratings, controls, owners and any actions.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("risk-tolerance", "Risk tolerance", "",
     "The acceptable amount of variation around risk appetite, usually expressed as measurable limits or thresholds that trigger escalation when crossed. The terms are used differently by different frameworks.",
     [("Risk appetite and tolerance", "/risk-management/risk-appetite-and-tolerance.html")]),
    ("risk-treatment", "Risk treatment", "",
     "What you decide to do about a risk: avoid it, reduce it (with controls), share or transfer it (for example with insurance), or accept it. Taking on more risk to pursue an opportunity is also a treatment option.",
     [("What is risk management?", "/foundations/what-is-risk-management.html")]),
    ("root-cause-analysis", "Root cause analysis", "",
     "Working out the underlying reason something went wrong, not just the immediate trigger, so the fix stops it from happening again. The \"5 whys\" and fishbone diagrams are common techniques.",
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("rse-licensee", "RSE licensee", "",
     "A registrable superannuation entity licensee: the trustee company licensed by APRA to operate one or more APRA-regulated super funds.",
     []),
    ("rto", "Recovery time objective", "RTO",
     "The target maximum time to restore a process or system after a disruption.",
     [("Business continuity", "/risk-management/business-continuity.html")]),
    ("rpo", "Recovery point objective", "RPO",
     "The maximum amount of data (measured in time) you can afford to lose. An RPO of one hour means backups must be no more than an hour old.",
     [("Business continuity", "/risk-management/business-continuity.html")]),
    ("scenario-analysis", "Scenario analysis", "",
     "Exploring \"what if\" situations, usually severe but plausible, to understand how an organisation would be affected and whether it could cope.",
     [("Risk assessment methodologies", "/risk-management/risk-assessment-methodologies.html")]),
    ("second-line", "Second line", "",
     "In the Three Lines model, specialist functions such as risk management and compliance that set frameworks, give expert advice, and monitor and challenge how the first line manages risk.",
     [("The Three Lines model", "/foundations/three-lines-model.html")]),
    ("segregation-of-duties", "Segregation of duties", "",
     "Splitting key steps of a task between different people so no single person can both make and hide an error or fraud, for example one person sets up a payment and another approves it.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("strategic-risk", "Strategic risk", "",
     "The risk that an organisation's strategy is wrong, poorly executed or overtaken by changes in its environment.",
     [("Enterprise risk management", "/risk-management/enterprise-risk-management.html")]),
    ("stress-testing", "Stress testing", "",
     "Testing how an organisation's finances or operations would hold up under extreme but plausible conditions, such as a sharp rise in unemployment or a market crash.",
     [("Credit, market and liquidity risk", "/risk-management/credit-market-and-liquidity-risk.html")]),
    ("third-line", "Third line", "",
     "In the Three Lines model, internal audit: the independent function that gives assurance and advice to the board on how well the first and second lines are working.",
     [("The Three Lines model", "/foundations/three-lines-model.html")]),
    ("third-party-risk", "Third-party risk", "",
     "The risk that comes from relying on other organisations, such as suppliers, outsourcers, administrators and technology providers, to deliver part of your service.",
     [("Third-party risk", "/risk-management/third-party-risk.html")]),
    ("three-lines-model", "Three Lines model", "",
     "A model published by the Institute of Internal Auditors describing how the governing body, management (first and second line roles) and internal audit (third line) work together on governance and risk. Updated in 2020 from the earlier \"three lines of defence\".",
     [("The Three Lines model", "/foundations/three-lines-model.html")]),
    ("tolerance-level", "Tolerance level (CPS 230)", "",
     "Under APRA's CPS 230, the board-approved maximum level of disruption to a critical operation the entity is prepared to accept, including the maximum period of disruption, data loss and minimum service levels.",
     [("Business continuity", "/risk-management/business-continuity.html")]),
    ("tone-at-the-top", "Tone at the top", "",
     "The example set by the board and senior leaders through what they say, reward and tolerate. It strongly shapes culture and whether controls are respected.",
     [("What is governance?", "/foundations/what-is-governance.html")]),
    ("twin-peaks", "Twin peaks", "",
     "The name for Australia's financial regulation model, which splits responsibilities between two main regulators: APRA for prudential soundness and ASIC for conduct and disclosure.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("whistleblower", "Whistleblower", "",
     "A person who reports suspected wrongdoing inside an organisation. Australian law gives eligible whistleblowers legal protections, for example under Part 9.4AAA of the <em>Corporations Act 2001</em> (Cth).",
     []),
]


def page_exists(url: str) -> bool:
    path, _, _ = url.partition("#")
    p = ROOT / path.lstrip("/")
    if path.endswith("/"):
        p = p / "index.html"
    return p.exists()


def build():
    terms = sorted(TERMS, key=lambda t: t[1].lower())
    slugs = [t[0] for t in terms]
    assert len(slugs) == len(set(slugs)), "duplicate slug"
    by_letter = {}
    for t in terms:
        by_letter.setdefault(t[1][0].upper(), []).append(t)

    nav = []
    for L in string.ascii_uppercase:
        if L in by_letter:
            nav.append(f'<a href="#letter-{L.lower()}">{L}</a>')
        else:
            nav.append(f'<span aria-hidden="true">{L}</span>')

    sections = []
    for L in sorted(by_letter):
        entries = []
        for slug, term, abbr, definition, see in by_letter[L]:
            abbr_html = f' <span class="abbr">({escape(abbr)})</span>' if abbr else ""
            see_links = [f'<a href="{u}">{escape(lbl)}</a>' for lbl, u in see if page_exists(u)]
            see_html = f'<br><span class="see">See: {", ".join(see_links)}</span>' if see_links else ""
            entries.append(
                f'    <div class="entry" id="{slug}">\n'
                f'      <dt>{escape(term)}{abbr_html}</dt>\n'
                f'      <dd>{definition}{see_html}</dd>\n'
                f'    </div>'
            )
        sections.append(
            f'  <section aria-labelledby="letter-{L.lower()}">\n'
            f'  <h2 class="glossary-letter" id="letter-{L.lower()}">{L}</h2>\n'
            f'  <dl>\n' + "\n".join(entries) + "\n  </dl>\n  </section>"
        )

    html = f"""<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Glossary of risk, compliance and governance terms | RiskLens Australia</title>
<meta name="description" content="A–Z plain-English definitions of core Australian risk management, compliance and governance terms, from risk appetite to reportable situations.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Glossary</li></ol></nav>

  <h1>Glossary</h1>
  <p class="summary">Plain-English definitions of the core terms used in Australian risk management, compliance and governance.</p>
  <div class="page-meta">
    <span class="level level-beginner">Beginner</span>
    <span>{len(terms)} terms</span>
    <span>Last reviewed: {LAST_REVIEWED}</span>
  </div>

  <p>Definitions are written in our own words to be easy to understand. Some terms have precise legal meanings in specific laws or standards. Where that matters, the definition says so and you should check the official source.</p>

  <div class="glossary-filter">
    <label for="glossary-search">Filter terms</label>
    <input type="search" id="glossary-search" placeholder="Type to filter, e.g. appetite" autocomplete="off">
    <p class="small" id="glossary-count" aria-live="polite"></p>
  </div>

  <nav class="az-nav" aria-label="Jump to letter">
    {" ".join(nav)}
  </nav>

  <div class="glossary">
{chr(10).join(sections)}
  </div>

  <p class="last-reviewed">Last reviewed: {LAST_REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

<script src="/scripts/glossary.js"></script>
</body>
</html>
"""
    out = ROOT / "glossary" / "index.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"wrote {out.relative_to(ROOT)} ({len(terms)} terms)")


if __name__ == "__main__":
    build()
