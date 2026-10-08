// Individual obligations with legal citations (obligations library stage 2), by regime and theme number.
// Each regime's items are plain-English summaries (not quotations) checked against the official text named in
// `source`, read in full (official documents can be fetched as text with .github/workflows/fetch-docs.yml).
// Theme numbers match the themes in scripts/grc-builder-data.js (theme 1 = OB-<CODE>-01). Rebuild the library
// with:  node _scripts/build_obligations.js && python3 _scripts/sync_layout.py
// Item: [obligation in plain English, citation]
window.GRC_OBLIGATION_DETAILS = {
  cps230: {
    source: [['Prudential Standard CPS 230 Operational Risk Management (F2026L00475, in force from 1 July 2026)', 'https://www.legislation.gov.au/F2026L00475/asmade/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['The Board is ultimately accountable for oversight of operational risk management, including business continuity and service provider arrangements', 'CPS 230 para 19'],
        ['The Board makes sure clear roles and responsibilities are set for senior managers for operational risk, business continuity and service providers', 'CPS 230 para 20'],
        ['The Board oversees operational risk management and key internal controls, gets regular updates on the operational risk profile, and makes sure senior management acts on concerns', 'CPS 230 para 21(a)'],
        ['The Board approves the business continuity plan (BCP) and tolerance levels, reviews testing results and oversees the follow-up', 'CPS 230 para 21(b)'],
        ['The Board approves the service provider management policy and reviews risk and performance reporting on material service providers', 'CPS 230 para 21(c)'],
        ['Senior management gives the Board clear and comprehensive information on the expected impact on critical operations when the Board makes decisions that could affect their resilience', 'CPS 230 para 22'],
        ['Senior management is responsible for operational risk management across end-to-end processes for all business operations', 'CPS 230 para 23']],
      2: [
        ['Identify, assess and manage operational risks from inadequate or failed processes or systems, people, and external drivers and events', 'CPS 230 para 12'],
        ['As part of the risk management framework, maintain governance arrangements, an operational risk profile with a defined appetite (indicators, limits and tolerance levels), effective internal controls, monitoring and escalation, BCPs and service provider processes', 'CPS 230 para 15'],
        ['Review operational risk management as part of the regular reviews of the risk management framework', 'CPS 230 para 16'],
        ['Integrate operational risk management into the overall risk management framework, and keep business continuity planning consistent with recovery and exit planning', 'CPS 230 para 17'],
        ['Manage the full range of operational risks, including legal, regulatory, compliance, conduct, technology, data and change management risk', 'CPS 230 para 23'],
        ['Maintain sound IT capability for current and projected needs, monitor the age and health of information assets, and meet CPS 234', 'CPS 230 para 24'],
        ['Assess the impact of business and strategic decisions, including new products, services, geographies and technologies, on the operational risk profile and resilience', 'CPS 230 para 25'],
        ['Maintain a comprehensive assessment of the operational risk profile: operational risk information systems, documented processes and resources for critical operations (with interdependencies, risks, obligations, key data and controls) and scenario analysis of severe events', 'CPS 230 para 26'],
        ['Carry out a comprehensive risk assessment before providing a material service to another party', 'CPS 230 para 27'],
        ['Design, implement and embed internal controls in line with risk appetite and compliance obligations', 'CPS 230 para 28'],
        ['Regularly monitor, review and test controls for design and operating effectiveness, as often as the risk warrants; report results to senior management and fix gaps in a timely manner', 'CPS 230 para 29'],
        ['Remediate material weaknesses with clear accountability and assurance, address root causes, and keep open gaps in the risk profile until fixed', 'CPS 230 para 30'],
        ['Identify, escalate, record and address operational risk incidents and near misses in a timely manner, and reflect them in the risk profile and control assessments', 'CPS 230 para 31']],
      3: [
        ['Define, identify and keep a register of critical operations', 'CPS 230 para 33(a)'],
        ['At a minimum, treat the operations listed for the industry as critical unless it can justify otherwise (for example claims processing for insurers, investment management and fund administration for super trustees, and customer enquiries and supporting systems for all)', 'CPS 230 para 35'],
        ['For each critical operation, set tolerance levels for the maximum period of disruption, the maximum data loss and the minimum service levels under alternative arrangements', 'CPS 230 para 37'],
        ['Monitor compliance with tolerance levels and report any failure to meet them, with a remediation plan, to the Board', 'CPS 230 para 40']],
      4: [
        ['Take reasonable steps to minimise the likelihood and impact of disruptions to critical operations', 'CPS 230 para 33(b)'],
        ['Maintain a credible BCP for keeping critical operations within tolerance through disruptions (including disaster recovery for critical information assets), activate it when needed and return to normal operations promptly', 'CPS 230 para 33(c)–(e)'],
        ['The BCP includes the register of critical operations and tolerances, activation triggers, the actions to stay within tolerance, an assessment of execution risks, resources and dependencies, and a communications strategy', 'CPS 230 para 39'],
        ['Maintain the people, resources and technology needed to execute the BCP', 'CPS 230 para 40'],
        ['Run a systematic BCP testing program covering all critical operations, including an annual business continuity exercise', 'CPS 230 para 42'],
        ['Tailor testing to material risks, with severe but plausible scenarios, including disruption to material service providers and scenarios that need contingency arrangements', 'CPS 230 para 43'],
        ['Update the BCP as needed each year for changes in structure, business mix, strategy or risk profile, and for shortcomings found in testing', 'CPS 230 para 44'],
        ['Internal audit periodically reviews the BCP and gives the Board assurance that it is credible and that testing is adequate', 'CPS 230 para 45']],
      5: [
        ['Do not rely on a service provider unless prudential obligations can still be met in full and the risks managed', 'CPS 230 para 14'],
        ['Maintain a service provider management policy covering how material service providers are identified, entered into, monitored, substituted and exited, and how their risks and fourth-party risks are managed', 'CPS 230 paras 46–47'],
        ['Identify and keep a register of material service providers and manage the material risks of using them', 'CPS 230 para 48'],
        ['At a minimum, treat providers of the listed services as material unless it can justify otherwise (including risk management, core technology services and internal audit for all entities)', 'CPS 230 para 49'],
        ['Before entering into or materially changing a material arrangement, carry out due diligence and assess financial and non-financial risks, including location and concentration', 'CPS 230 para 52'],
        ['Keep a formal legally binding agreement for every material arrangement, covering services and service levels, rights and responsibilities (including data, audit access and liability), compliance, sub-contracting, force majeure and termination', 'CPS 230 para 53'],
        ['The agreement gives APRA access to documentation and information and a right to visit the provider, and the provider agrees not to impede APRA', 'CPS 230 para 54'],
        ['For each material arrangement, manage risks to the provider’s ability to deliver and risks to the entity (such as step-in or contagion risk), and make sure the BCP can be executed and an orderly exit is possible', 'CPS 230 para 55'],
        ['Limited exemption: some contract, exit and monitoring requirements need not be met for listed categories of provider (such as government agencies, regulators, central banks, exchanges, clearing and settlement, payment systems and financial messaging) where the arrangement uses standardised terms or has no formal agreement', 'CPS 230 paras 57–58'],
        ['Monitor material arrangements, with reporting to senior management on performance against service levels, control effectiveness and both parties’ compliance with the agreement', 'CPS 230 para 59'],
        ['Internal audit reviews any proposed material arrangement to outsource a critical operation, and reports regularly to the Board or audit committee on compliance with the policy', 'CPS 230 para 61']],
      6: [
        ['Submit the register of material service providers to APRA every year', 'CPS 230 para 50']],
      7: [
        ['Notify APRA as soon as possible, and no later than {fact:cps230-incident-notice} after becoming aware, of an operational risk incident likely to have a material financial impact or a material impact on the ability to maintain critical operations (an incident already notified under CPS 234 need not be notified again)', 'CPS 230 para 32'],
        ['Notify APRA as soon as possible, and no later than {fact:cps230-disruption-notice}, after a disruption to a critical operation outside tolerance, covering the disruption, the action taken, the likely impact and the time to return to normal', 'CPS 230 para 41'],
        ['Notify APRA as soon as possible, and no more than {fact:cps230-msp-notice} after entering into or materially changing an agreement for a service relied on to undertake a critical operation', 'CPS 230 para 60(a)'],
        ['Notify APRA before entering into a material offshoring arrangement, or when a significant change to one is proposed, including where data or personnel will be offshore', 'CPS 230 para 60(b)']]
    }
  },
  cps234: {
    source: [['Prudential Standard CPS 234 Information Security (F2018L01745)', 'https://www.legislation.gov.au/F2018L01745/asmade/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['The Board is ultimately responsible for information security and must make sure it is maintained in proportion to the threats, so the entity can keep operating soundly', 'CPS 234 para 13'],
        ['Clearly define the information security roles and responsibilities of the Board, senior management, governing bodies and individuals', 'CPS 234 para 14'],
        ['Escalate and report to the Board or senior management any testing results showing control deficiencies that can’t be fixed in a timely manner', 'CPS 234 para 29']],
      2: [
        ['Classify information assets, including those managed by related parties and third parties, by criticality and sensitivity, reflecting the potential impact of an incident on the entity and its customers', 'CPS 234 para 20'],
        ['Maintain an information security capability in proportion to the threats, and keep it current as vulnerabilities, threats, assets and the business environment change', 'CPS 234 paras 15 and 17'],
        ['Assess the information security capability of related parties and third parties that manage its information assets', 'CPS 234 para 16'],
        ['Maintain an information security policy framework in proportion to its exposures, giving direction to everyone with information security responsibilities', 'CPS 234 paras 18–19']],
      3: [
        ['Implement information security controls in a timely manner, in proportion to vulnerabilities and threats, the criticality and sensitivity of the assets, their life-cycle stage and the potential consequences of an incident', 'CPS 234 para 21'],
        ['Evaluate the design of the controls that related parties and third parties use to protect its information assets', 'CPS 234 para 22'],
        ['Have robust mechanisms to detect and respond to information security incidents in a timely manner', 'CPS 234 para 23'],
        ['Maintain response plans for incidents that could plausibly occur, covering every stage from detection to post-incident review, and escalation to the Board', 'CPS 234 paras 24–25'],
        ['Review and test the response plans every year', 'CPS 234 para 26']],
      4: [
        ['Test control effectiveness through a systematic testing program, with nature and frequency matched to changing threats, criticality and sensitivity, consequences, untrusted environments and change', 'CPS 234 para 27'],
        ['Where it relies on a related or third party’s control testing, assess whether that testing is adequate', 'CPS 234 para 28'],
        ['Testing is done by appropriately skilled and functionally independent specialists', 'CPS 234 para 30'],
        ['Review the sufficiency of the testing program at least annually, or when assets or the business environment change materially', 'CPS 234 para 31'],
        ['Internal audit reviews the design and operating effectiveness of information security controls, including those of related and third parties, using appropriately skilled people', 'CPS 234 paras 32–33'],
        ['Internal audit assesses a related or third party’s control assurance where an incident could materially affect the entity and internal audit intends to rely on that assurance', 'CPS 234 para 34']],
      5: [
        ['Notify APRA as soon as possible, and no later than {fact:cps234-incident-notice} after becoming aware, of an information security incident that materially affected (or could have) the entity or its customers, or that has been notified to other regulators', 'CPS 234 para 35'],
        ['Notify APRA as soon as possible, and no later than {fact:cps234-weakness-notice} after becoming aware, of a material information security control weakness the entity expects it can’t remediate in a timely manner', 'CPS 234 para 36']]
    }
  },
  afsl: {
    source: [['Corporations Act 2001, ss 912A–912B (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Do all things necessary to ensure the financial services covered by the licence are provided efficiently, honestly and fairly', 'Corporations Act s 912A(1)(a)'],
        ['Comply with the conditions on the licence and with the financial services laws', 'Corporations Act s 912A(1)(b)–(c)'],
        ['Take reasonable steps to ensure representatives comply with the financial services laws', 'Corporations Act s 912A(1)(ca)'],
        ['Comply with the Reference Checking and Information Sharing Protocol (for representatives who give personal advice to retail clients about relevant financial products)', 'Corporations Act s 912A(1)(cc), (3A)'],
        ['If providing services to retail clients, have arrangements to compensate them for loss caused by breaches by the licensee or its representatives', 'Corporations Act s 912B'],
        ['Contravening most of the general obligations is a civil penalty provision', 'Corporations Act s 912A(5A)']],
      2: [
        ['Have adequate risk management systems (not required of APRA-regulated bodies, other than RSE licensees that are also responsible entities of registered schemes)', 'Corporations Act s 912A(1)(h), (5)'],
        ['Have adequate arrangements for managing conflicts of interest', 'Corporations Act s 912A(1)(aa)'],
        ['If providing services to retail clients, have a dispute resolution system (internal dispute resolution meeting ASIC’s standards, and AFCA membership) and give ASIC the IDR information it specifies', 'Corporations Act s 912A(1)(g), (2), (2A)']],
      3: [
        ['Maintain the competence to provide the financial services covered by the licence', 'Corporations Act s 912A(1)(e)']],
      4: [
        ['Have adequate financial, technological and human resources to provide the financial services and carry out supervisory arrangements (not required of APRA-regulated bodies, other than RSE licensees that are also responsible entities of registered schemes)', 'Corporations Act s 912A(1)(d), (4)'],
        ['Ensure representatives are adequately trained (including meeting continuing professional development requirements) and competent to provide the financial services', 'Corporations Act s 912A(1)(f)']]
    }
  },
  ddo: {
    source: [['Corporations Act 2001, Part 7.8A, ss 994B–994G (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Make a target market determination (TMD) before anyone distributes the product to retail clients, for products that need a Product Disclosure Statement or disclosure document (and some others); exclusions include MySuper products, margin lending and most ordinary shares', 'Corporations Act s 994B(1)–(3)'],
        ['The TMD is in writing and sets out the target market, distribution conditions, review triggers, maximum review periods, the complaints reporting period, and the information distributors must report and when', 'Corporations Act s 994B(5)–(6)'],
        ['The TMD must be appropriate: retail clients acquiring the product under the distribution conditions are likely to be in the target market, and the product is likely to suit the target market’s likely objectives, financial situation and needs', 'Corporations Act s 994B(8)–(8A)'],
        ['Make the TMD publicly available free of charge', 'Corporations Act s 994B(9)'],
        ['Distributors must not distribute a product that needs a TMD unless, after reasonable inquiries, they believe one has been made', 'Corporations Act s 994D'],
        ['Keep complete and accurate records of decisions about TMDs, review triggers and review periods, and the reasons for them', 'Corporations Act s 994F(1)']],
      2: [
        ['The issuer takes reasonable steps that will, or are reasonably likely to, result in distribution consistent with the TMD', 'Corporations Act s 994E(1)'],
        ['Distributors must also take reasonable steps for consistency with the TMD (not needed where the dealing implements personal advice to the client)', 'Corporations Act s 994E(3), (6)'],
        ['Reasonable steps take account of the likelihood of inconsistent distribution, the harm it could cause, what the person knows, and the ways available to reduce the likelihood and harm', 'Corporations Act s 994E(5)'],
        ['Distributors keep records of complaints, the reasonable steps they took and the information they must report to the issuer', 'Corporations Act s 994F(3)']],
      3: [
        ['Complete a review of the TMD within each review period while the product is on offer to retail clients', 'Corporations Act s 994C(2)'],
        ['After learning of a review trigger, or anything else suggesting the TMD is no longer appropriate, stop distributing within 10 business days unless the TMD has been reviewed (and replaced if needed)', 'Corporations Act s 994C(3)–(4)'],
        ['Within the same 10 business days, take reasonable steps to tell distributors to stop until the TMD has been reviewed; distributors must stop within 10 business days of knowing', 'Corporations Act s 994C(5)–(7)'],
        ['Distributors report complaint numbers and other specified information to the issuer within 10 business days after each reporting period, and significant dealings inconsistent with the TMD within 10 business days', 'Corporations Act s 994F(4)–(6)'],
        ['The issuer notifies ASIC in writing of a significant dealing inconsistent with the TMD as soon as practicable and within {fact:ddo-asic-notice} of becoming aware', 'Corporations Act s 994G']]
    }
  },
  advice: {
    source: [['Corporations Act 2001, Part 7.6 Divisions 8A–8C and Part 7.7A (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Act in the best interests of the client; the steps that show this include identifying the client’s objectives, financial situation and needs and the subject of the advice, making reasonable inquiries where information is incomplete or inaccurate, and declining to advise without the needed expertise', 'Corporations Act s 961B'],
        ['Give the advice only if it would be reasonable to conclude it is appropriate to the client', 'Corporations Act s 961G'],
        ['Warn the client, when the advice is given, if it is or may be based on incomplete or inaccurate information about their circumstances', 'Corporations Act s 961H'],
        ['Give priority to the client’s interests where there is a conflict with the interests of the adviser, the licensee or their associates', 'Corporations Act s 961J'],
        ['The licensee takes reasonable steps to ensure its representatives comply with these duties', 'Corporations Act s 961L']],
      2: [
        ['Conflicted remuneration is any benefit (other than from the client) that could reasonably be expected to influence the products recommended or the advice given to retail clients', 'Corporations Act s 963A'],
        ['Licensees must not accept conflicted remuneration and must take reasonable steps so their representatives don’t', 'Corporations Act ss 963E–963F'],
        ['Authorised and other representatives must not accept it; employers, product issuers and sellers must not give it', 'Corporations Act ss 963G–963K'],
        ['Volume-based benefits are presumed to be conflicted remuneration unless shown otherwise', 'Corporations Act s 963L'],
        ['Exceptions are limited, such as some benefits for general insurance and (subject to conditions) life risk insurance products', 'Corporations Act s 963B']],
      3: [
        ['Get the client’s signed, dated written consent before entering into or renewing an ongoing fee arrangement, after telling them in writing the services, fees, frequency, consent period and their right to end it', 'Corporations Act s 962G'],
        ['Consent lapses unless renewed in the window from 60 days before to 150 days after each anniversary (or an earlier date set in the consent), and the arrangement then ends', 'Corporations Act ss 962F, 962H'],
        ['The client may end an ongoing fee arrangement at any time', 'Corporations Act s 962J'],
        ['Do not deduct, or arrange or accept deduction of, ongoing fees from a client’s account without their written consent', 'Corporations Act ss 962R–962S'],
        ['Keep records that show compliance with the ongoing fee arrangement rules', 'Corporations Act s 962X']],
      4: [
        ['Relevant providers must not give personal advice to retail clients on relevant financial products unless registered with ASIC, and licensees must not keep authorising unregistered providers', 'Corporations Act ss 921Y–921Z'],
        ['Relevant providers must meet the education and training standards (qualification, exam, and work and training) and comply with the Code of Ethics', 'Corporations Act ss 921BA, 921E(3)'],
        ['Licensees notify ASIC when a person becomes a relevant provider, and of changes to their details, within 30 business days', 'Corporations Act ss 922D, 922H, 922L(2)']]
    }
  },
  whistle: {
    source: [['Corporations Act 2001, Part 9.4AAA, ss 1317AA–1317AI (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Public companies must have a whistleblower policy and make it available to officers and employees', 'Corporations Act s 1317AI(1)'],
        ['Large proprietary companies must have one from 6 months after the end of their first financial year as a large proprietary company; proprietary companies that are trustees of registrable superannuation entities must have one', 'Corporations Act s 1317AI(2)–(3)'],
        ['The policy must explain the protections available, to whom and how protected disclosures can be made, how the company will support and protect whistleblowers, how disclosures will be investigated, how people mentioned in disclosures will be treated fairly, and how the policy is made available', 'Corporations Act s 1317AI(5)'],
        ['Failing to have the policy is a strict liability offence', 'Corporations Act s 1317AI(4)']],
      2: [
        ['Disclosures qualify for protection when an eligible whistleblower (including current and former officers, employees, suppliers and their relatives) has reasonable grounds to suspect misconduct or an improper state of affairs, and discloses to ASIC, APRA, an eligible recipient or a lawyer; disclosers need not identify themselves', 'Corporations Act ss 1317AA, 1317AAA'],
        ['Eligible recipients include officers and senior managers, auditors, actuaries, people the entity authorises to receive disclosures and, for super funds, trustees and trustee directors', 'Corporations Act s 1317AAC'],
        ['Public interest and emergency disclosures to journalists or parliamentarians are protected only in limited circumstances, such as after a prior disclosure to a regulator and (for public interest disclosures) at least 90 days and written notice', 'Corporations Act s 1317AAD'],
        ['Disclosures about a personal work-related grievance are generally not protected, unless they concern victimisation or are made to a lawyer', 'Corporations Act s 1317AADA'],
        ['Do not disclose the whistleblower’s identity, or information likely to identify them, except as the law allows (for example to ASIC, APRA, the AFP, a lawyer, or with consent)', 'Corporations Act s 1317AAE'],
        ['Do not cause or threaten detriment to anyone because of a belief or suspicion that they made, or could make, a protected disclosure', 'Corporations Act s 1317AC'],
        ['A protected discloser is not subject to civil, criminal or administrative liability for making the disclosure, and contractual remedies cannot be enforced against them for it', 'Corporations Act s 1317AB']]
    }
  },
  privacy: {
    source: [['Privacy Act 1988 (compilation in force 4 June 2026), including Schedule 1 (Australian Privacy Principles)', 'https://www.legislation.gov.au/C2004A03712/latest/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Most businesses with annual turnover of {fact:privacy-small-business} or less are not covered (small business operators), with exceptions such as health service providers', 'Privacy Act s 6D'],
        ['APP entities must not breach the Australian Privacy Principles', 'Privacy Act s 15'],
        ['Take reasonable steps to put in place practices, procedures and systems that ensure compliance with the APPs and allow privacy inquiries and complaints to be handled', 'Privacy Act Sch 1, APP 1.2'],
        ['Have a clearly expressed, up-to-date privacy policy covering the kinds of information held, how it is collected and held, its purposes, access and correction, complaints, and likely overseas disclosures, and make it available free of charge', 'Privacy Act Sch 1, APP 1.3–1.5'],
        ['Collect, notify, use, disclose, send overseas, keep accurate, and give access to and correct personal information in line with APPs 3 to 13', 'Privacy Act Sch 1, APPs 3–13'],
        ['A serious interference with privacy is a civil penalty provision; for a company the maximum is the greatest of $50 million, three times the benefit obtained, or 30% of adjusted turnover in the breach period', 'Privacy Act s 13G']],
      2: [
        ['Take reasonable steps to protect personal information from misuse, interference and loss, and from unauthorised access, modification or disclosure', 'Privacy Act Sch 1, APP 11.1'],
        ['Destroy or de-identify personal information that is no longer needed (unless the law requires it to be kept)', 'Privacy Act Sch 1, APP 11.2'],
        ['Reasonable steps include technical and organisational measures', 'Privacy Act Sch 1, APP 11.3']],
      3: [
        ['An eligible data breach is unauthorised access to, disclosure or loss of personal information that a reasonable person would conclude is likely to result in serious harm to any of the individuals affected', 'Privacy Act s 26WE(2)'],
        ['It is not an eligible data breach if remedial action taken before serious harm results means serious harm is no longer likely', 'Privacy Act s 26WF'],
        ['Where there are reasonable grounds to suspect an eligible data breach, carry out a reasonable and expeditious assessment and take all reasonable steps to complete it within {fact:ndb-assessment}', 'Privacy Act s 26WH'],
        ['Where there are reasonable grounds to believe there has been an eligible data breach, prepare a statement (entity, description, kinds of information, recommended steps for individuals) and give it to the Commissioner as soon as practicable', 'Privacy Act s 26WK'],
        ['Notify the individuals affected or at risk (or, if that is not practicable, publish and publicise the statement) as soon as practicable after preparing it', 'Privacy Act s 26WL']]
    }
  },
  remed: {
    source: [['ASIC Regulatory Guide 277 Consumer remediation (September 2022, updated April 2026). RG 277 is guidance: it sets out how ASIC expects licensees to meet their legal obligations', 'https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-277-consumer-remediation/']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Have adequate systems and processes to identify misconduct or other failures when they occur, and to protect and compensate consumers for their loss', 'RG 277.3'],
        ['Initiate a remediation when misconduct or other failure in providing financial services or credit activities has caused, or may have caused, consumer loss, including failures by representatives, service providers and consultants', 'RG 277.22–277.23'],
        ['Misconduct or other failure includes breaches of financial services or credit laws, contractual failings, negligence or fraud, and failures to meet other regulatory requirements', 'RG 277.25'],
        ['Start promptly on becoming aware, rather than waiting for complaints, AFCA, ASIC or court proceedings', 'RG 277.24; RG 277 Table 1, principle 6'],
        ['Licensees giving personal advice to retail clients must also meet the statutory notify, investigate and remediate timeframes', 'Corporations Act ss 912EA–912EB; RG 277.310–277.314']],
      2: [
        ['Aim to identify everyone who has or may have suffered loss, by understanding the nature, extent and impact of the failure, including its root cause and when it first caused loss', 'RG 277 Table 1, principle 2; RG 277.45–277.53'],
        ['Include affected consumers automatically (no opt-in), don’t exclude them for not responding or lacking evidence of loss, and keep the remediation free for consumers', 'RG 277 Table 1, principle 7; RG 277.150–277.152']],
      3: [
        ['Aim to return consumers as closely as possible to the position they would have been in had the failure not occurred', 'RG 277 Table 1, principle 1; RG 277.61–277.63'],
        ['Account for foregone returns or interest, consider indirect financial loss, and don’t discount compensation for unrealisable benefits', 'RG 277.70–277.74'],
        ['Use assumptions only if they benefit consumers and are evidence based and documented', 'RG 277 Table 1, principle 3; RG 277.113–277.141'],
        ['Document and justify key decisions about scope and remedies, and keep records ASIC may ask to see', 'RG 277 Table 1, principle 4']],
      4: [
        ['Use reasonable endeavours to pay consumers, prioritising methods that need no action from them (such as EFT or PayID)', 'RG 277 Table 1, principle 5; RG 277.153–277.171'],
        ['Pay consumers with current payment details regardless of amount; for former customers owed $5 or less (after interest) with no current payment details, the amount may go to a residual remediation payment instead (super trustees and scheme operators using fund assets may keep such amounts in the fund for its members)', 'RG 277.160–277.163'],
        ['Do not profit from the failure: money that can’t be returned despite reasonable endeavours goes to an unclaimed money regime or a residual payment to an ACNC-registered charity', 'RG 277 Table 1, principle 8; RG 277.188–277.197'],
        ['Give remediations adequate resourcing and governance, with senior management commitment and, where appropriate, an independent expert', 'RG 277 Table 1, principle 9; RG 277.220–277.226']]
    }
  },
  conflicts: {
    source: [['Corporations Act 2001, s 912A(1)(aa) (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text'], ['ASIC Regulatory Guide 181 AFS licensing: Managing conflicts of interest (December 2025)', 'https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-181-licensing-managing-conflicts-of-interest/']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['AFS licensees must have adequate arrangements to manage conflicts of interest arising in providing financial services (a civil penalty provision)', 'Corporations Act s 912A(1)(aa), (5A); RG 181.48'],
        ['Take a proportionate, risk-based approach that reflects other legal requirements, the likelihood and seriousness of each conflict and the harm it could cause, and the nature, scale and complexity of the business', 'RG 181.50–181.59'],
        ['Other duties may require putting clients’ or members’ interests first or stronger arrangements, and some conflicts are prohibited outright (such as conflicted remuneration)', 'RG 181.54–181.55'],
        ['Have arrangements to identify, assess and respond to conflicts, and to check that responses stay effective', 'RG 181.60; RG 181 Table 2, steps 1–3'],
        ['Manage conflicts through a combination of avoiding, controlling and disclosing them; disclosure alone is often not enough', 'RG 181.64–181.65']],
      2: [
        ['Implement, monitor, maintain and review the arrangements, with senior management (and, where appropriate, board) approval, staff training, accountable people, compliance monitoring and disciplinary measures', 'RG 181.61; RG 181 Table 2, step 4'],
        ['Be able to show the arrangements are integrated into business operations; having a policy is not enough', 'RG 181 Table 2, step 4'],
        ['Document identified conflicts and actions taken (for example in a conflicts register), reports to senior management, and disclosures given to affected parties', 'RG 181.63']]
    }
  },
  capital: {
    source: [['Prudential Standard APS 110 Capital Adequacy (F2024L01518, in force from 1 January 2025). Banks (ADIs) only so far: insurers have their own capital standards (GPS, LPS and HPS 110), not yet itemised here', 'https://www.legislation.gov.au/F2024L01518/asmade/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['ADIs: the Board ensures capital is commensurate with the type, amount and concentration of risks, having regard to prospective changes in the risk profile', 'APS 110 para 12'],
        ['ADIs: maintain capital ratios above the prudential capital requirements at all times; the minimums are {fact:cet1-minimum} Common Equity Tier 1, 6.0% Tier 1 and 8.0% Total Capital, and APRA may set higher requirements (which must not be publicly disclosed)', 'APS 110 paras 24–25'],
        ['ADIs: hold a capital conservation buffer of Common Equity Tier 1 (2.5% for standardised ADIs, 3.75% for IRB ADIs, plus 1.0% for domestic systemically important banks), or face limits on distributions', 'APS 110 paras 27–28, 30'],
        ['ADIs: hold a countercyclical capital buffer of Common Equity Tier 1, calculated by jurisdiction', 'APS 110 para 32'],
        ['IRB ADIs: maintain a leverage ratio of at least 3.5%', 'APS 110 para 37'],
        ['ADIs: get APRA’s approval before any planned reduction in capital, and notify APRA of any breach or likely breach of the capital requirements and the remedial action', 'APS 110 paras 40, 44']],
      2: [
        ['ADIs: have an internal capital adequacy assessment process (ICAAP), documented, approved by the Board and appropriate to size, business mix and complexity', 'APS 110 paras 14–15'],
        ['ADIs: have the ICAAP reviewed by qualified, operationally independent people at least every three years', 'APS 110 para 19'],
        ['ADIs: prepare an annual ICAAP report, including current and three-year projected capital against requirements and targets, and give it to APRA within three months of the period end', 'APS 110 paras 20–21'],
        ['ADIs: the ICAAP report comes with a declaration approved by the Board and signed by the CEO on whether capital was managed in line with the ICAAP', 'APS 110 para 22']]
    }
  },
  modslav: {
    source: [['Modern Slavery Act 2018 (compilation in force 7 November 2024)', 'https://www.legislation.gov.au/C2018A00153/latest/text']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Reporting entities include entities based or operating in Australia with consolidated revenue of at least {fact:modslav-threshold} for the reporting period (others may volunteer)', 'Modern Slavery Act ss 5–6'],
        ['Give the Minister a modern slavery statement for each reporting period (alone or in a joint statement), in the approved form, within 6 months after the period ends', 'Modern Slavery Act ss 13(1), 13(2)(b) and (e), 14'],
        ['The statement is approved by the principal governing body and signed by a responsible member', 'Modern Slavery Act s 13(2)(c)–(d)'],
        ['Address the mandatory criteria: identify the entity; describe its structure, operations and supply chains, the modern slavery risks (including in entities it owns or controls), the actions taken to assess and address them (including due diligence and remediation), how effectiveness is assessed, and the consultation process; and include any other relevant information', 'Modern Slavery Act s 16(1)'],
        ['Include details of the governing body’s approval', 'Modern Slavery Act s 16(2)'],
        ['If an entity fails to comply, the Minister may ask for an explanation or remedial action within 28 days or more, and may publish details if the request is not met', 'Modern Slavery Act s 16A']]
    }
  },
  breach: {
    source: [['Corporations Act 2001, ss 912D–912EC (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text'], ['ASIC Regulatory Guide 78 Breach reporting by AFS licensees and credit licensees (December 2023, updated February 2026)', 'https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-78-breach-reporting-by-afs-licensees-and-credit-licensees/']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['A reportable situation is a significant breach, or likely significant breach, of a core obligation; an investigation into whether there is one that runs for more than 30 days (60 days under ASIC relief), and its outcome if it finds there is none; or gross negligence or serious fraud in providing a financial service', 'Corporations Act s 912D(1)–(2); National Credit Act s 50A'],
        ['Core obligations include the general obligations in s 912A (the duty to comply with financial services laws only for specified laws) and s 912B, and representatives’ obligations under specified financial services laws', 'Corporations Act s 912D(3); National Credit Act s 50A(3)'],
        ['Where there are reasonable grounds to believe a reportable situation has arisen, lodge a report with ASIC in the prescribed form', 'Corporations Act s 912DAA(1)–(2)'],
        ['Lodge the report within {fact:reportable-situations-deadline} after first knowing, or being reckless about whether, there are reasonable grounds to believe the reportable situation has arisen', 'Corporations Act s 912DAA(3); National Credit Act s 50B; RG 78.83'],
        ['A further reportable situation with the same or substantially similar underlying circumstances as one already reported may be reported within 90 days (ASIC relief)', 'ASIC Instrument 2024/620 s 7; RG 78.84'],
        ['Failing to report is a strict liability offence and a civil penalty provision', 'Corporations Act s 912DAA(1) note, (4) and (7)'],
        ['For APRA-regulated licensees, a report to APRA with all the required information counts as lodged with ASIC', 'Corporations Act s 912DAA(5)']],
      2: [
        ['The reporting clock starts when the licensee first knows, or is reckless about whether, there are reasonable grounds to believe a reportable situation has arisen (knowledge and recklessness have their Criminal Code meanings)', 'Corporations Act s 912DAA(3) and (8); RG 78.88–78.92'],
        ['Do not wait for board consideration, legal advice, rectification or (for a likely breach) the breach to happen if that would take the report past the deadline', 'RG 78.98'],
        ['Investigations are reportable only once they have run for more than 60 days (ASIC relief; the Act says 30), with the report due within 30 days after that', 'Corporations Act s 912D(1)(c); RG 78.102']],
      3: [
        ['A breach is deemed significant if it is an offence punishable by imprisonment of 3 months or more (dishonesty) or 12 months or more (other offences), a civil penalty contravention (unless excluded by regulation), misleading or deceptive conduct, or causes or is likely to cause material loss or damage to clients or members', 'Corporations Act s 912D(4); National Credit Act s 50A(4)'],
        ['Some breaches are excluded from deemed significance, including certain civil penalty provisions specified in regulations and, under ASIC relief, single breaches of RG 271’s enforceable paragraphs and some minor misleading conduct affecting one person', 'Corporations Regulations reg 7.6.02A(2); ASIC Instrument 2024/620 ss 5–6; RG 78.37–78.38'],
        ['Otherwise, decide significance having regard to the number or frequency of similar breaches, the impact on the ability to provide licensed services, and the extent to which the breach shows compliance arrangements are inadequate', 'Corporations Act s 912D(5); National Credit Act s 50A(5)'],
        ['Consider deemed significance first, and only then the significance factors', 'RG 78.31–78.32']],
      4: [
        ['Report to ASIC significant breaches, gross negligence or serious fraud by individual advisers of other licensees who give personal advice to retail clients on relevant financial products, within 30 days, and give the other licensee a copy (unless ASIC is already aware)', 'Corporations Act s 912DAB(1)–(5)'],
        ['Take reasonable steps to notify affected retail clients in writing within 30 days where they may have suffered loss they can recover from the licensee', 'Corporations Act s 912EA(1)–(2)'],
        ['Start an investigation within 30 days, identify the conduct and quantify the loss, and complete it as soon as reasonably practicable', 'Corporations Act s 912EB(1)–(4)'],
        ['Tell the affected client the outcome in writing within 10 days of completing the investigation', 'Corporations Act s 912EB(5)'],
        ['Take reasonable steps to pay the client’s loss or damage within 30 days of completing the investigation', 'Corporations Act s 912EB(8)'],
        ['Keep records that show compliance with these client notification and remediation obligations', 'Corporations Act s 912EC']]
    }
  },
  idr: {
    source: [['ASIC Regulatory Guide 271 Internal dispute resolution (enforceable paragraphs)', 'https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-271-internal-dispute-resolution']],
    checkedText: '8 October 2026',
    themes: {
      1: [
        ['Deal with every expression of dissatisfaction that meets the complaint definition (adopted from AS/NZS 10002:2014) through the IDR process', 'RG 271.27–271.28'],
        ['Posts on the firm’s own social media channels that meet the definition are complaints, where the author is identifiable and contactable', 'RG 271.32'],
        ['The IDR process must, at a minimum, deal with complaints by retail clients (including small businesses with fewer than 100 employees) and, for super funds, by members and beneficiaries eligible to go to AFCA', 'RG 271.36–271.38; RG 271.41–271.42'],
        ['The process must be free, easy to understand and use (including for people with disability or language difficulties), and supported by a public complaints policy and an internal procedure', 'RG 271.134; RG 271.141; RG 271.172'],
        ['Record all complaints in an effective system that tracks the progress of each one', 'RG 271.179'],
        ['Firms that outsource IDR must choose providers with care, monitor them, and deal with their failures', 'RG 271.48']],
      2: [
        ['Give an IDR response no later than {fact:idr-response} after receiving a standard complaint', 'RG 271.56; Table 2'],
        ['Superannuation trustee complaints (other than about death benefit distributions) and traditional trustee complaints: no later than {fact:idr-super-response}', 'RG 271.58–271.59; Table 2; RG 271.76–271.78'],
        ['Death benefit distribution complaints: no later than 90 calendar days after the 28-day objection period ends; credit complaints about default notices or hardship: no later than 21 calendar days', 'Table 2; RG 271.80–271.93'],
        ['Complaints about insurance in super: trustees, insurers and administrators must meet the timeframe wherever the complaint is first lodged', 'RG 271.79'],
        ['A firm may exceed the timeframe only if the complaint is particularly complex or delayed by circumstances beyond its control, and it sends an IDR delay notification (reasons, AFCA rights and contact details) before the timeframe ends', 'RG 271.64–271.66'],
        ['If a customer advocate review is offered, it must not be a mandatory step before AFCA, and the total time must stay within the maximum timeframe', 'RG 271.109–271.110'],
        ['Resource and staff the IDR function to resolve complaints fairly within the timeframes, including during spikes, and give staff the authority to resolve complaints', 'RG 271.142–271.143; RG 271.146–271.147']],
      3: [
        ['The IDR response is in writing and gives the final outcome (with reasons for any rejection), the right to go to AFCA and AFCA’s contact details', 'RG 271.53–271.54'],
        ['No IDR response is needed if the complaint is resolved, or an explanation or apology given, by the end of the fifth business day, unless the complainant asks for one or it is about hardship, a declined claim, a claim’s value, or a super trustee decision', 'RG 271.71; RG 271.75'],
        ['Implement complaint outcomes (refunds, fee waivers, corrections, compensation) in a timely manner', 'RG 271.165']],
      4: [
        ['The board sets clear accountabilities for complaints handling, including managing systemic issues identified through complaints', 'RG 271.118'],
        ['Reports to the board or executive committees include complaints metrics and analysis, including systemic issues', 'RG 271.119; RG 271.183'],
        ['Enable staff to escalate possible systemic issues, analyse complaints data regularly, escalate promptly for investigation, and report on outcomes', 'RG 271.120']]
    }
  }
};
