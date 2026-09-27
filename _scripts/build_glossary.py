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
import json
import re
from html import unescape

ROOT = Path(__file__).resolve().parent.parent
LAST_REVIEWED = "27 September 2026"

# (slug, term, abbreviation or "", definition (HTML allowed), [(see label, url), ...])
TERMS = [
    ("accc", "Australian Competition and Consumer Commission", "ACCC",
     "The national regulator for competition, fair trading and consumer protection. It enforces the <em>Competition and Consumer Act 2010</em> (Cth), including the Australian Consumer Law, across most of the economy.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("accountable-person", "Accountable person", "",
     "Under the Financial Accountability Regime, a director or senior executive with actual or effective senior responsibility for a key part of a bank, insurer or super trustee. Accountable persons must be registered with APRA and meet specific accountability obligations.",
     [("Financial Accountability Regime", "/governance/financial-accountability-regime.html")]),
    ("afsl", "Australian financial services licence", "AFSL",
     "The licence a business needs from ASIC to carry on a financial services business in Australia, such as giving financial product advice or dealing in financial products. Licensees must meet ongoing general obligations, including acting efficiently, honestly and fairly.",
     [("Licensing basics", "/compliance/licensing-basics.html")]),
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
     [("What is governance?", "/foundations/what-is-governance.html"), ("Board structure and accountability", "/governance/board-structure-and-accountability.html")]),
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
     [("Operational risk", "/risk-management/operational-risk.html"), ("Culture and conduct risk", "/governance/culture-and-conduct.html")]),
    ("conflict-of-interest", "Conflict of interest", "",
     "A situation where a person's or organisation's own interests could influence, or be seen to influence, a decision they are meant to make in someone else's interest.",
     [("Conflicts of interest", "/governance/conflicts-of-interest.html")]),
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
     [("Core frameworks compared", "/foundations/core-frameworks-compared.html"), ("COSO ERM and Internal Control", "/standards/coso.html")]),
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
     [("Financial Accountability Regime", "/governance/financial-accountability-regime.html")]),
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
     [("Incident and breach management", "/risk-management/incident-and-breach-management.html"), ("Privacy law", "/compliance/privacy-law.html")]),
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
     [("Enterprise risk management", "/risk-management/enterprise-risk-management.html"), ("Culture and conduct risk", "/governance/culture-and-conduct.html")]),
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
     [("Licensing basics", "/compliance/licensing-basics.html"), ("Superannuation trustee governance", "/sectors/superannuation.html")]),
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
     [("What is governance?", "/foundations/what-is-governance.html"), ("Culture and conduct risk", "/governance/culture-and-conduct.html")]),
    ("twin-peaks", "Twin peaks", "",
     "The name for Australia's financial regulation model, which splits responsibilities between two main regulators: APRA for prudential soundness and ASIC for conduct and disclosure.",
     [("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("whistleblower", "Whistleblower", "",
     "A person who reports suspected wrongdoing inside an organisation. Australian law gives eligible whistleblowers legal protections, for example under Part 9.4AAA of the <em>Corporations Act 2001</em> (Cth).",
     [("Whistleblower protections", "/governance/whistleblower-protections.html")]),
    ("afca", "Australian Financial Complaints Authority", "AFCA",
     "The free, independent external dispute resolution scheme for consumers and small businesses who can't resolve a complaint with their financial firm. Financial firms must be members by law or licence condition.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("app", "Australian Privacy Principles", "APPs",
     "The 13 principles in the <em>Privacy Act 1988</em> (Cth) that govern how Australian Government agencies and most larger private organisations collect, use, disclose, store and secure personal information.",
     [("Privacy law", "/compliance/privacy-law.html")]),
    ("authorised-representative", "Authorised representative", "",
     "A person or company authorised by an AFS licensee to provide financial services on the licensee's behalf. The licensee remains responsible for its representatives' conduct.",
     [("Licensing basics", "/compliance/licensing-basics.html")]),
    ("best-interests-duty", "Best interests duty", "",
     "The obligation on financial advisers giving personal advice to retail clients to act in the client's best interests (Corporations Act s 961B), and related duties to give appropriate advice and prioritise the client's interests.",
     [("Disclosure obligations", "/compliance/disclosure-obligations.html")]),
    ("best-financial-interests-duty", "Best financial interests duty", "",
     "The covenant in the SIS Act (s 52(2)(c)) requiring super trustees to perform their duties and exercise their powers in the best financial interests of members. The word \"financial\" was added from 1 July 2021.",
     [("Superannuation trustee governance", "/sectors/superannuation.html")]),
    ("mysuper", "MySuper", "",
     "A simple, low-cost default super product with restrictions on fees and features. Members who don't choose a fund or investment option are generally placed in a MySuper product.",
     [("Superannuation trustee governance", "/sectors/superannuation.html")]),
    ("performance-test", "Performance test (super)", "",
     "APRA's annual test of MySuper and trustee-directed super products against benchmarks. Trustees of failing products must tell members, and a product that fails two years in a row can't take new members.",
     [("Superannuation trustee governance", "/sectors/superannuation.html")]),
    ("member-outcomes-assessment", "Member outcomes assessment", "",
     "The annual assessment super trustees must make under the SIS Act of whether they are promoting members' financial interests, covering matters such as fees, returns, investment risk and insurance. It must be published on the fund's website.",
     [("Superannuation trustee governance", "/sectors/superannuation.html")]),
    ("cdd", "Customer due diligence", "CDD",
     "Checking who a customer is and understanding the ML/TF risk they pose, before and during the relationship. Often called \"know your customer\" (KYC). A core AML/CTF obligation.",
     [("AML/CTF fundamentals", "/compliance/aml-ctf-fundamentals.html")]),
    ("core-obligation", "Core obligation", "",
     "Under ASIC's reportable situations regime, the set of key obligations (including the general licensee obligations and key financial services laws) whose significant breach must be reported.",
     [("Breach and incident reporting obligations", "/compliance/breach-reporting.html")]),
    ("credit-licence", "Australian credit licence", "ACL",
     "The licence a business needs from ASIC to engage in consumer credit activities, such as lending or broking, under the <em>National Consumer Credit Protection Act 2009</em> (Cth).",
     [("Licensing basics", "/compliance/licensing-basics.html")]),
    ("ddo", "Design and distribution obligations", "DDO",
     "Rules (Part 7.8A of the Corporations Act, from 5 October 2021) requiring issuers to design financial products for a defined target market and take reasonable steps so that products reach the right consumers.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("designated-service", "Designated service", "",
     "A service listed in the AML/CTF Act (such as opening an account, making a loan or, from 1 July 2026, certain legal, accounting and real estate services). Providing one makes a business a reporting entity.",
     [("AML/CTF fundamentals", "/compliance/aml-ctf-fundamentals.html")]),
    ("ehf", "Efficiently, honestly and fairly", "",
     "The overarching general obligation on AFS and credit licensees to do all things necessary to ensure their financial services are provided efficiently, honestly and fairly. It has been a civil penalty provision since 2019.",
     [("Licensing basics", "/compliance/licensing-basics.html")]),
    ("fsg", "Financial Services Guide", "FSG",
     "A document given to retail clients explaining who the provider is, what services they offer, how they are paid and how to complain.",
     [("Disclosure obligations", "/compliance/disclosure-obligations.html")]),
    ("idr", "Internal dispute resolution", "IDR",
     "A financial firm's own complaints handling process. ASIC's Regulatory Guide 271 sets standards and maximum response times.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("pds", "Product Disclosure Statement", "PDS",
     "A document that must generally be given to a retail client before they acquire a financial product, explaining its features, benefits, risks, fees and costs.",
     [("Disclosure obligations", "/compliance/disclosure-obligations.html")]),
    ("regulatory-change", "Regulatory change management", "",
     "The process for spotting new or changed obligations, assessing their impact, implementing the changes and confirming they were made.",
     [("Designing a compliance program", "/compliance/designing-a-compliance-program.html")]),
    ("reporting-entity", "Reporting entity", "",
     "A business that provides a designated service under the AML/CTF Act and so must enrol with AUSTRAC, maintain an AML/CTF program and report to AUSTRAC.",
     [("AML/CTF fundamentals", "/compliance/aml-ctf-fundamentals.html")]),
    ("smr", "Suspicious matter report", "SMR",
     "A report a reporting entity must give AUSTRAC when it forms a suspicion about a customer or transaction on certain grounds, such as possible money laundering. Due within 3 business days (24 hours for terrorism financing).",
     [("AML/CTF fundamentals", "/compliance/aml-ctf-fundamentals.html")]),
    ("soa", "Statement of Advice", "SOA",
     "The document an adviser must generally give a retail client when providing personal advice, setting out the advice, the basis for it, and fees and conflicts.",
     [("Disclosure obligations", "/compliance/disclosure-obligations.html")]),
    ("tmd", "Target market determination", "TMD",
     "A public document an issuer must make under the design and distribution obligations, describing the consumers a product is designed for and any conditions on how it can be distributed.",
     [("Disclosure obligations", "/compliance/disclosure-obligations.html")]),
    ("uct", "Unfair contract term", "",
     "A term in a standard form consumer or small business contract that causes a significant imbalance, isn't reasonably necessary to protect the business, and would cause detriment. Since 9 November 2023, using such terms can attract penalties.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("accountability-map", "Accountability map", "",
     "Under the Financial Accountability Regime, a document showing the key roles and responsibilities across an accountable entity and its group, and who is accountable for each.",
     [("Financial Accountability Regime", "/governance/financial-accountability-regime.html")]),
    ("accountability-statement", "Accountability statement", "",
     "Under the Financial Accountability Regime, a document describing the specific parts of the business an individual accountable person is responsible for.",
     [("Financial Accountability Regime", "/governance/financial-accountability-regime.html")]),
    ("clawback", "Clawback", "",
     "Recovering variable remuneration that has already been paid or vested, for example after later-discovered misconduct or risk failures. Compare malus.",
     [("Remuneration governance", "/governance/remuneration-governance.html")]),
    ("disclosable-matter", "Disclosable matter", "",
     "Under the Corporations Act whistleblower regime, information about misconduct or an improper state of affairs relating to a company, which qualifies a disclosure for protection.",
     [("Whistleblower protections", "/governance/whistleblower-protections.html")]),
    ("eligible-whistleblower", "Eligible whistleblower", "",
     "A person who can qualify for protection under the Corporations Act whistleblower regime, such as a current or former officer, employee, supplier or associate of the company, or their relatives or dependants.",
     [("Whistleblower protections", "/governance/whistleblower-protections.html")]),
    ("independent-director", "Independent director", "",
     "A non-executive director who is free of business or other relationships that could materially interfere with the exercise of their independent judgement.",
     [("Board structure and accountability", "/governance/board-structure-and-accountability.html")]),
    ("malus", "Malus", "",
     "Reducing or cancelling variable remuneration that has been awarded but not yet paid or vested, for example because of poor risk or conduct outcomes. Compare clawback.",
     [("Remuneration governance", "/governance/remuneration-governance.html")]),
    ("material-personal-interest", "Material personal interest", "",
     "A director's own interest in a matter being considered by the board that is significant enough to require disclosure under the Corporations Act, and in public companies generally prevents them voting on it.",
     [("Conflicts of interest", "/governance/conflicts-of-interest.html")]),
    ("non-executive-director", "Non-executive director", "NED",
     "A board member who is not part of the organisation's management. Non-executive directors provide oversight and challenge.",
     [("Board structure and accountability", "/governance/board-structure-and-accountability.html")]),
    ("psychological-safety", "Psychological safety", "",
     "A shared belief within a team that it is safe to speak up, ask questions, admit mistakes and challenge others without fear of punishment or embarrassment.",
     [("Culture and conduct risk", "/governance/culture-and-conduct.html")]),
    ("variable-remuneration", "Variable remuneration", "",
     "Pay that depends on performance or other conditions, such as bonuses and long-term incentives, as opposed to fixed salary.",
     [("Remuneration governance", "/governance/remuneration-governance.html")]),
    # --- Phase 9 additions ---
    ("adi", "Authorised deposit-taking institution", "ADI",
     "A bank, building society or credit union authorised by APRA under the <em>Banking Act 1959</em> (Cth) to take deposits from the public. ADIs must meet APRA's prudential standards on capital, liquidity, risk management and governance.",
     [("Banking and ADIs", "/sectors/banking.html")]),
    ("sfi", "Significant financial institution", "SFI",
     "APRA's label for larger regulated entities that must meet the full set of certain prudential requirements, including parts of CPS 230, CPS 511 and CPS 190. For example, an ADI with total assets over $20 billion, or an RSE licensee whose funds hold over $30 billion in total assets. APRA can also designate an entity as an SFI because of its complexity or group membership.",
     [("CPS 230 Operational Risk Management", "/standards/cps-230.html")]),
    ("responsible-entity", "Responsible entity", "RE",
     "The public company, holding an AFS licence, that operates a registered managed investment scheme and owes legal duties to its members, including acting in their best interests. It stays responsible for the scheme even when it outsources tasks such as custody or investment management.",
     [("Managed investment schemes", "/sectors/managed-investment-schemes.html"), ("RG 259 Risk management for fund operators", "/standards/asic-rg-259.html")]),
    ("managed-investment-scheme", "Managed investment scheme", "MIS",
     "An arrangement where people pool money to be invested or used for a common purpose, with the scheme run by someone else rather than the investors themselves. Managed funds and many property and credit funds are examples. Schemes offered to retail investors generally must be registered with ASIC.",
     [("Managed investment schemes", "/sectors/managed-investment-schemes.html")]),
    ("compliance-plan", "Compliance plan", "",
     "A document every registered managed investment scheme must have, setting out the measures the responsible entity will apply to make sure it complies with the Corporations Act and the scheme's constitution. It is lodged with ASIC and audited every year.",
     [("Managed investment schemes", "/sectors/managed-investment-schemes.html")]),
    ("compliance-committee", "Compliance committee", "",
     "A committee a responsible entity must have if fewer than half of its directors are external. Most members must be external. It monitors compliance with the compliance plan and reports breaches to the responsible entity (and to ASIC if not dealt with).",
     [("Managed investment schemes", "/sectors/managed-investment-schemes.html")]),
    ("deemed-significant-breach", "Deemed significant breach", "",
     "A breach of a core obligation that the law automatically treats as significant, and therefore reportable to ASIC, without a significance assessment. Examples include breaches of civil penalty provisions (unless excluded), serious offences, and breaches that cause or are likely to cause material loss or damage to clients.",
     [("RG 78 Breach reporting", "/standards/asic-rg-78.html"), ("Breach and incident reporting obligations", "/compliance/breach-reporting.html")]),
    ("awareness", "Awareness (reporting clock)", "",
     "The point from which most breach and incident reporting deadlines are counted. It is usually when the organisation first knows, or is reckless about, reasonable grounds to believe a reportable event has happened, not when an investigation is finished. Recording this date accurately is essential.",
     [("Breach and incident reporting obligations", "/compliance/breach-reporting.html"), ("Incident and breach management", "/risk-management/incident-and-breach-management.html")]),
    ("cps-511", "CPS 511 Remuneration", "",
     "APRA's prudential standard on remuneration for banks, insurers and super trustees. It requires remuneration frameworks to support sound risk management and long-term outcomes, gives risk and conduct real weight in variable pay, and sets deferral and clawback requirements for significant financial institutions.",
     [("Remuneration governance", "/governance/remuneration-governance.html")]),
    ("sps-515", "SPS 515 Strategic Planning and Member Outcomes", "",
     "APRA's prudential standard requiring super trustees to have a business plan and to assess each year whether they are delivering good outcomes for members, including by comparing fees, returns and services with other products.",
     [("Superannuation trustee governance", "/sectors/superannuation.html")]),
    ("isms", "Information security management system", "ISMS",
     "The set of policies, processes, roles and controls an organisation uses to manage information security risk in a structured, continually improving way. ISO/IEC 27001 is the international standard for building and certifying one.",
     [("ISO/IEC 27001", "/standards/iso-27001.html")]),
    ("information-asset", "Information asset", "",
     "Information, and the technology that stores or processes it, that has value to the organisation, such as customer data, systems and applications. Under CPS 234, entities must classify information assets by how critical and sensitive they are and protect them accordingly.",
     [("CPS 234 Information Security", "/standards/cps-234.html")]),
    ("lcr", "Liquidity Coverage Ratio", "LCR",
     "A bank liquidity measure: high-quality liquid assets divided by the net cash outflows expected over a 30-day severe stress. Larger ADIs must keep it at or above 100%, so they could survive a month of stress without outside help.",
     [("Credit, market and liquidity risk", "/risk-management/credit-market-and-liquidity-risk.html"), ("Banking and ADIs", "/sectors/banking.html")]),
    ("cet1", "Common Equity Tier 1 capital", "CET1",
     "The highest-quality form of bank capital, made up mainly of ordinary shares and retained earnings. It absorbs losses first while the bank keeps operating, and is the main focus of capital ratios.",
     [("Banking and ADIs", "/sectors/banking.html")]),
    ("at1", "Additional Tier 1 capital", "AT1",
     "Bank capital instruments, often called hybrids, that can be converted into shares or written off if a bank gets into trouble. APRA has decided to phase them out from 1 January 2027, replacing them mainly with CET1 and Tier 2 capital.",
     [("Banking and ADIs", "/sectors/banking.html")]),
    ("macroprudential-policy", "Macroprudential policy", "",
     "Rules aimed at the stability of the financial system as a whole rather than individual institutions, for example limits on risky types of home lending across all banks. In Australia APRA sets these, working with the other Council of Financial Regulators agencies.",
     [("Banking and ADIs", "/sectors/banking.html")]),
    ("dti-limit", "Debt-to-income limit", "DTI limit",
     "A macroprudential limit on how much new home lending a bank can do to borrowers whose total debt is high compared with their income. APRA's limit, from February 2026, caps new lending at a debt-to-income ratio of six or more at 20% of an ADI's new mortgage lending.",
     [("Banking and ADIs", "/sectors/banking.html")]),
    ("scams-prevention-framework", "Scams Prevention Framework", "SPF",
     "A law passed in 2025 that places obligations on businesses in designated sectors (starting with banks, telcos and digital platforms) to prevent, detect, report, disrupt and respond to scams, with external dispute resolution for consumers. Obligations apply as sectors are designated and codes are made.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("hawking", "Hawking", "",
     "Offering financial products to retail clients during an unsolicited contact, such as a cold call. It has been prohibited in most cases since October 2021.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("deferred-sales-model", "Deferred sales model", "",
     "The rules for add-on insurance sold alongside a car or other major purchase. The insurance generally cannot be sold until a waiting period has passed after the main sale, giving the customer time to consider whether they need it.",
     [("Consumer protection", "/compliance/consumer-protection.html"), ("Insurance", "/sectors/insurance.html")]),
    ("utmost-good-faith", "Utmost good faith", "",
     "A duty on both insurers and policyholders to act honestly and fairly with each other, implied into every insurance contract by the <em>Insurance Contracts Act 1984</em> (Cth). An insurer that breaches it, for example by unreasonably handling a claim, can face ASIC action.",
     [("Insurance", "/sectors/insurance.html")]),
    ("claims-handling", "Claims handling and settling services", "",
     "Helping a person make an insurance claim, or managing or settling claims on behalf of an insurer. Since 1 January 2022 this is a financial service that needs an AFS licence (with some exceptions), bringing claims conduct under ASIC's oversight.",
     [("Insurance", "/sectors/insurance.html"), ("Consumer protection", "/compliance/consumer-protection.html")]),
    ("distribution-condition", "Distribution condition", "",
     "A condition in a target market determination that limits how a product can be sold, such as only through certain channels or only after certain checks, to make it more likely it reaches the intended customers.",
     [("RG 274 Design and distribution", "/standards/asic-rg-274.html")]),
    ("review-trigger", "Review trigger", "",
     "An event or piece of information, set out in a target market determination, that means the issuer must review whether the TMD is still appropriate, such as a spike in complaints or significant dealings outside the target market.",
     [("RG 274 Design and distribution", "/standards/asic-rg-274.html")]),
    ("significant-dealing", "Significant dealing", "",
     "Under the design and distribution obligations, a dealing in a product that is not consistent with its target market determination and is significant (for example because of the number of customers or the harm involved). Issuers must notify ASIC within 10 business days of becoming aware.",
     [("RG 274 Design and distribution", "/standards/asic-rg-274.html")]),
    ("beneficial-assumption", "Beneficial assumption", "",
     "In remediation, an assumption made in the customer's favour where records are missing or incomplete, so gaps in data don't leave people under-compensated.",
     [("RG 277 Consumer remediation", "/standards/asic-rg-277.html")]),
    ("recovery-and-exit-planning", "Recovery and exit planning", "",
     "Planning in advance how an entity could recover from severe financial stress, or leave the market in an orderly way if it can't. APRA's CPS 190 requires this of significant financial institutions.",
     [("Banking and ADIs", "/sectors/banking.html")]),
    ("product-intervention-power", "Product intervention power", "",
     "ASIC's power to temporarily ban or restrict a financial or credit product, or how it is sold, where it has caused or is likely to cause significant consumer detriment. It has been used, for example, on short-term credit and some high-risk investment products.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("greenwashing", "Greenwashing", "",
     "Making a product or organisation look more environmentally friendly, sustainable or ethical than it really is. Misleading sustainability claims can breach the prohibitions on misleading conduct, and ASIC has taken several greenwashing cases to court.",
     [("Disclosure obligations", "/compliance/disclosure-obligations.html")]),
    ("financial-hardship", "Financial hardship", "",
     "When a customer can't meet their repayments or other financial obligations, for example because of illness, job loss or a disaster. Credit providers must respond to hardship notices under the National Credit Code, and industry codes set further expectations for banks and insurers.",
     [("Consumer protection", "/compliance/consumer-protection.html")]),
    ("vulnerable-customer", "Vulnerable customer", "",
     "A customer who, because of personal circumstances such as illness, disability, family violence, age, language or financial stress, is at greater risk of harm. Regulators and industry codes expect firms to identify vulnerability and adjust how they deal with these customers.",
     [("Consumer protection", "/compliance/consumer-protection.html"), ("Culture and conduct", "/governance/culture-and-conduct.html")]),
    ("sampling", "Sampling (control testing)", "",
     "Testing a selection of items from a population (for example 25 transactions out of thousands) to draw a conclusion about whether a control operated effectively across the whole period. Sample size usually depends on how often the control runs and how much assurance is needed.",
     [("Control design and testing", "/risk-management/control-design-and-testing.html")]),
    ("smsf", "Self-managed super fund", "SMSF",
     "A small super fund, with up to six members, where the members are also the trustees (or directors of the corporate trustee). SMSFs are regulated by the ATO rather than APRA.",
     [("Superannuation trustee governance", "/sectors/superannuation.html"), ("Regulatory landscape map", "/foundations/regulatory-landscape.html")]),
    ("key-function", "Key function (FAR)", "",
     "Under the Financial Accountability Regime, a business function listed in the rules (such as risk management or compliance) for which someone must hold accountable-person responsibility. The regulators have proposed removing the key functions requirements as part of simplifying FAR.",
     [("Financial Accountability Regime", "/governance/financial-accountability-regime.html")]),
    # --- Phase 10 additions ---
    ("var", "Value-at-risk", "VaR",
     "The loss that is expected to be exceeded only with a small, stated probability over a period. For example, a one-year 99% VaR of $10 million means losses are expected to be worse than $10 million in only about 1 year in 100. It says nothing about how bad those worst years are.",
     [("Quantitative operational risk", "/risk-management/quantitative-operational-risk.html")]),
    ("expected-shortfall", "Expected shortfall", "ES",
     "The average loss in the worst outcomes beyond a chosen confidence level. For example, 99% expected shortfall is the average of the worst 1% of years. Unlike VaR, it looks into the tail.",
     [("Quantitative operational risk", "/risk-management/quantitative-operational-risk.html")]),
    ("reverse-stress-testing", "Reverse stress testing", "",
     "Starting from an outcome the organisation could not accept, such as breaching minimum capital or running out of liquid assets, and working backwards to identify the scenarios that would cause it.",
     [("Scenario analysis and stress testing", "/risk-management/scenario-analysis-and-stress-testing.html")]),
    ("icaap", "Internal capital adequacy assessment process", "ICAAP",
     "The process a bank or insurer uses to assess how much capital it needs for its risks, now and in stress, and how it will maintain it. APRA's capital standards require it to include stress testing.",
     [("Scenario analysis and stress testing", "/risk-management/scenario-analysis-and-stress-testing.html")]),
    ("diversification-benefit", "Diversification benefit", "",
     "The amount by which a combined risk measure is lower than the simple sum of individual risks, because the risks are unlikely to all go wrong at once. It depends on correlation assumptions and can shrink sharply in a crisis.",
     [("Risk aggregation and correlation", "/risk-management/risk-aggregation-and-correlation.html")]),
    ("tolerable-deviation-rate", "Tolerable deviation rate", "",
     "In control testing, the highest rate at which a control can fail while still being relied on. Together with the confidence level, it sets the sample size.",
     [("Control testing: sampling and assurance", "/risk-management/control-testing-sampling.html")]),
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

    # Flashcard deck for /learn/flashcards.html, generated from the same terms.
    cards = [
        {"slug": slug, "term": term, "abbr": abbr,
         "def": unescape(re.sub(r"<[^>]+>", "", definition))}
        for slug, term, abbr, definition, see in terms
    ]
    js = ("// Generated by _scripts/build_glossary.py. Do not edit by hand.\n"
          "window.GLOSSARY_CARDS = " + json.dumps(cards, ensure_ascii=False, indent=0) + ";\n")
    cards_out = ROOT / "scripts" / "glossary-cards.js"
    cards_out.write_text(js, encoding="utf-8")
    print(f"wrote {cards_out.relative_to(ROOT)} ({len(cards)} cards)")


if __name__ == "__main__":
    build()
