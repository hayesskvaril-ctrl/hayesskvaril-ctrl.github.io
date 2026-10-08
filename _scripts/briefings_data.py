"""Board briefings (/governance/board-briefings.html and /governance/briefing-*.html).
Printable two-page briefings for directors and executives. Every fact must match the guide page it
links to (where the checked detail and official sources are). Questions are prompts, not requirements.
Run:  python3 _scripts/build_briefings.py && python3 _scripts/sync_layout.py
"""
from playbooks_data import APRA_230, APRA_NOTIFY, ASIC_RS, ASIC_RELIEF, CA_912D, AUSTRAC_SMR

FAR_SRC = 'Australian Prudential Regulation Authority and Australian Securities and Investments Commission, <a href="https://www.apra.gov.au/financial-accountability-regime">Financial Accountability Regime</a>; <em>Financial Accountability Regime Act 2023</em> (Cth), <a href="https://www.legislation.gov.au/C2023A00067/latest">Federal Register of Legislation</a>.'
CPS234_SRC = 'Australian Prudential Regulation Authority, <a href="https://www.apra.gov.au/standards/cps-234">Prudential Standard CPS 234 Information Security</a>.'
AUSTRAC_REFORM = 'AUSTRAC, <a href="https://www.austrac.gov.au/amlctf-reform/about-reforms">About the AML/CTF reforms</a>.'

BRIEFINGS = [
  dict(
    slug="cps-230", title="CPS 230 Operational Risk Management", guide="/standards/cps-230.html",
    short="Operational risk, critical operations, tolerance levels and service providers.",
    what="APRA's cross-industry standard for banks, insurers and super trustees on managing operational risk, staying resilient through severe disruption and controlling the risks of relying on service providers. It applies proportionately: significant financial institutions face the full set of requirements.",
    why=["The board is ultimately accountable for operational risk management, business continuity and the management of service providers.", "The board approves tolerance levels for critical operations: the maximum disruption the entity will accept.", "Serious events must be notified to APRA within tight deadlines, so the board needs early warning."],
    numbers=[("Material operational risk incident", "Notify APRA within {fact:cps230-incident-notice}"), ("Critical operation disrupted outside tolerance", "Notify APRA within {fact:cps230-disruption-notice}"), ("Entering or materially changing a material service provider arrangement", "Notify APRA within {fact:cps230-msp-notice}"), ("Material service provider register", "Submitted to APRA each year"), ("Business continuity plan", "Tested, including an annual exercise with severe but plausible scenarios")],
    questions=["Which of our operations are critical, and are we confident they are complete?", "What tolerance levels have we approved, and could we actually stay within them in a severe but plausible disruption?", "What did our last business continuity exercise show, and what has been fixed?", "Who are our material service providers, and do we have credible, tested exit plans for them?", "How quickly would we know, and notify APRA, if a critical operation went outside tolerance?", "Which control weaknesses are in our operational risk profile, and how long have they been open?"],
    flags=["Tolerance levels that have never been tested against a realistic scenario.", "A material service provider with no exit plan, or one that has never been tested.", "Incidents that reach the board weeks after they happen."],
    sources=[APRA_230],
  ),
  dict(
    slug="far", title="Financial Accountability Regime (FAR)", guide="/governance/financial-accountability-regime.html",
    short="Accountable persons, accountability statements and maps, and deferred pay.",
    what="The Financial Accountability Regime Act 2023 (Cth) makes directors and senior executives with senior responsibility for key parts of the business personally accountable. It applies to banks (from {fact:far-adi-start}) and to insurers and super trustees (from {fact:far-insurers-super-start}), replaced the Banking Executive Accountability Regime (BEAR), and is jointly administered by APRA and ASIC. In June 2026 APRA and ASIC announced changes to reduce its administrative burden, so check the current position.",
    why=["Directors and senior executives with senior responsibility are accountable persons and must be registered with the regulators.", "Each accountable person has an accountability statement, and the entity has an accountability map: gaps or overlaps are a governance failure.", "Accountable persons must act with honesty and integrity, with due skill, care and diligence, deal openly with APRA and ASIC, and take reasonable steps."],
    numbers=[("Banks", "In force from {fact:far-adi-start}"), ("Insurers and super trustees", "In force from {fact:far-insurers-super-start}"), ("Variable remuneration of accountable persons", "At least 40% deferred for at least four years"), ("Failures to meet obligations", "Deferred remuneration must be reduced")],
    questions=["Does our accountability map cover every key function without gaps or overlaps?", "Are accountability statements current after our last restructure?", "How does each accountable person evidence the reasonable steps they take?", "What information do accountable persons receive, and is it enough to take reasonable steps?", "How are deferral and remuneration adjustments applied when obligations are not met?"],
    flags=["Accountability statements that haven't been updated after organisational changes.", "Shared or unclear accountability for a key area such as outsourcing or remediation.", "No record of how reasonable steps were taken."],
    sources=[FAR_SRC],
  ),
  dict(
    slug="breach-reporting", title="Breach reporting to ASIC (RG 78)", guide="/standards/asic-rg-78.html",
    short="Reportable situations, deemed significance and the 30-day clock.",
    what="AFS licensees (including super trustees) and credit licensees must report reportable situations to ASIC: mainly significant breaches, or likely breaches, of core obligations. ASIC's Regulatory Guide 78 explains how. The same event may also need to be reported to APRA, the OAIC or clients.",
    why=["The clock starts when the licensee first knows, or is reckless about, reasonable grounds to believe a reportable situation has arisen, not when the investigation ends. ASIC may attribute staff knowledge to the licensee.", "Some breaches are deemed significant automatically, including misleading or deceptive conduct and breaches that cause material loss to clients.", "Late or missed reports, and patterns of similar breaches, are signs of weak compliance arrangements."],
    numbers=[("Reportable situation", "Report within {fact:reportable-situations-deadline}"), ("Investigation into a possible significant breach", "Reportable if it continues for more than 60 days (ASIC relief; the Act says 30)"), ("Super trustees (SIS Act s 29JA)", "As soon as practicable, and within 30 days of becoming aware")],
    questions=["How do we record the date we first became aware of a possible breach?", "How many reports were lodged late in the last year, and why?", "Who decides significance, and are similar breaches assessed consistently?", "What themes or common root causes are showing up across breaches?", "Are affected customers or members remediated promptly, and how do we know?"],
    flags=["Breach assessments that wait for investigations to finish.", "Many minor breaches with the same cause, each treated alone.", "Decisions not to report with no recorded reasons."],
    sources=[ASIC_RS, ASIC_RELIEF, CA_912D],
  ),
  dict(
    slug="cps-234", title="CPS 234 Information Security", guide="/standards/cps-234.html",
    short="Board responsibility for information security, testing and notification.",
    what="APRA's standard requiring regulated entities to maintain information security in proportion to the threats they face, including information assets managed by third parties.",
    why=["The board is ultimately responsible for information security.", "Entities must know their information assets, classify them by criticality and sensitivity, and protect them with controls proportionate to the threats.", "Controls must be tested through a systematic testing program, with internal audit review."],
    numbers=[("Material information security incident", "Notify APRA within {fact:cps234-incident-notice}"), ("Material control weakness that can't be fixed in a timely way", "Notify APRA within {fact:cps234-weakness-notice}")],
    questions=["Do we have a complete, classified register of our information assets, including those held by service providers?", "What did our last control testing find, and what is still open?", "When did we last test our incident response plan, and what did we learn?", "How do we assess the information security of our service providers?", "Would we be able to notify APRA within {fact:cps234-incident-notice} of a material incident?"],
    flags=["Incomplete asset classification.", "Weak assessment of third parties' security.", "Untested incident response plans. APRA's independent assessments from 2022 found these gaps were common."],
    sources=[CPS234_SRC, APRA_NOTIFY],
  ),
  dict(
    slug="aml-ctf", title="AML/CTF: the board's role", guide="/compliance/aml-ctf-fundamentals.html",
    short="ML/TF risk, the AML/CTF program, reporting to AUSTRAC and governing body oversight.",
    what="Businesses that provide designated services are reporting entities under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth), regulated by AUSTRAC. Major reforms changed obligations for existing reporting entities from {fact:aml-reformed-obligations-start}, and brought in lawyers, accountants, real estate professionals and others from {fact:aml-tranche2-start}.",
    why=["Core obligations: assess money laundering and terrorism financing risk, maintain AML/CTF policies (the program), know your customers, report to AUSTRAC, keep records and train staff.", "The governing body oversees the program, and an AML/CTF compliance officer reports to it at least every 12 months.", "Penalties can be very large: Westpac paid $1.3 billion in 2020, the largest civil penalty in Australian history at the time."],
    numbers=[("Suspicious matter report", "Within {fact:smr-deadline} ({fact:smr-tf-deadline} for terrorism financing)"), ("Threshold transaction report ({fact:ttr-threshold} or more in physical currency)", "Within {fact:ttr-deadline}"), ("International funds transfer instruction report", "Within 10 business days"), ("AML/CTF compliance officer report to the governing body", "At least every 12 months"), ("Independent evaluation of the program", "At least every 3 years")],
    questions=["When did we last update our ML/TF risk assessment, and what changed?", "What did the compliance officer's last report to us say?", "Are suspicious matter and threshold reports lodged on time, and how do we know?", "What did the last independent evaluation find, and what has been fixed?", "How have the 2026 reforms changed our obligations?"],
    flags=["Transaction monitoring alerts that are not reviewed on time.", "Late or missing reports to AUSTRAC.", "A risk assessment that hasn't changed while the business has."],
    sources=[AUSTRAC_SMR, AUSTRAC_REFORM],
  ),
]
