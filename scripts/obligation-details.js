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
    source: [['Corporations Act 2001, s 912A(1)(aa) (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text'], ['ASIC Regulatory Guide 181 AFS licensing: Managing conflicts of interest (December 2025)', 'https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-181-licensing-managing-conflicts-of-interest/'], ['Prudential Standard SPS 521 Conflicts of Interest (F2012L02230, in force from 1 July 2013) for super trustees', 'https://www.legislation.gov.au/F2012L02230/asmade/text']],
    checkedText: '9 October 2026',
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
        ['Document identified conflicts and actions taken (for example in a conflicts register), reports to senior management, and disclosures given to affected parties', 'RG 181.63']],
      3: [
        ['Have a Board-approved conflicts management framework, proportionate to the business, so that all potential and actual conflicts are identified and avoided or prudently managed; the Board is ultimately responsible for it', 'SPS 521 paras 8–10, 14'],
        ['The framework includes a Board-approved conflicts management policy, defined roles and resources, and up-to-date registers of relevant duties and relevant interests, with a process for deciding what is relevant', 'SPS 521 paras 15–16'],
        ['The policy covers identifying and monitoring conflicts, avoiding them where required, managing them so that members’ duties and interests get priority (SIS Act ss 52(2)(d) and 52A(2)(d)), escalation, and minuting each conflict and the action taken', 'SPS 521 para 18'],
        ['Regularly and thoroughly look for conflicts arising from relationships with existing or prospective service providers and advisers', 'SPS 521 para 19'],
        ['Make sure responsible persons and staff understand conflicts and the framework, and that incoming responsible persons disclose their relevant duties and interests before appointment', 'SPS 521 paras 11–12'],
        ['Review the framework every year and report to the Board, with an operationally independent comprehensive review at least every three years', 'SPS 521 paras 20–23']]
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
  aml: {
    source: [['Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (compilation in force 1 July 2026, after the 2024 reforms). Detailed requirements are also in the AML/CTF Rules, not itemised here', 'https://www.legislation.gov.au/C2006A00169/latest/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Undertake an ML/TF risk assessment of the money laundering, terrorism financing and proliferation financing risks reasonably faced in providing designated services, proportionate to the business and considering services, customers, delivery channels, countries and AUSTRAC information', 'AML/CTF Act s 26C'],
        ['Review the risk assessment after a significant change or new risk information from AUSTRAC, and at least every 3 years, and update it to address what the review finds', 'AML/CTF Act s 26D'],
        ['Do not start providing a designated service without a risk assessment that meets these requirements', 'AML/CTF Act s 26E']],
      2: [
        ['Develop and maintain AML/CTF policies (procedures, systems and controls) that manage and mitigate the risks, ensure compliance and suit the nature, size and complexity of the business', 'AML/CTF Act s 26F(1)'],
        ['The policies cover significant changes, customer due diligence, reviews (at least every 3 years), keeping the governing body informed, the compliance officer, senior manager approvals, due diligence on and training of relevant staff, and independent evaluations at least every 3 years', 'AML/CTF Act s 26F(3)–(4)'],
        ['Comply with the AML/CTF policies (and, in a reporting group, the lead entity’s policies that apply)', 'AML/CTF Act s 26G'],
        ['The governing body exercises ongoing oversight of the risk assessment and compliance, and takes reasonable steps to ensure risks are managed and obligations met', 'AML/CTF Act s 26H'],
        ['Designate an AML/CTF compliance officer at management level with enough authority, independence and resources, who is fit and proper (and an Australian resident where services are provided in Australia), within 28 days of starting to provide designated services', 'AML/CTF Act ss 26J–26K'],
        ['A senior manager approves the risk assessment and the policies; updates to the risk assessment are notified to the governing body as soon as practicable', 'AML/CTF Act s 26P'],
        ['Document the AML/CTF program', 'AML/CTF Act s 26N']],
      3: [
        ['Before providing a designated service, establish on reasonable grounds who the customer is, who acts for them or on whose behalf they act, their beneficial owners, whether any of them is a politically exposed person or designated for targeted financial sanctions, and the nature and purpose of the relationship or transaction', 'AML/CTF Act s 28'],
        ['Monitor customers on an ongoing basis, including for unusual transactions and behaviour that may lead to a suspicious matter report', 'AML/CTF Act s 30'],
        ['Apply enhanced due diligence where the customer’s risk is high, where service continues after a suspicious matter arises, or where a foreign politically exposed person is involved (among other cases)', 'AML/CTF Act s 32']],
      4: [
        ['Report suspicious matters to AUSTRAC within {fact:smr-deadline} of forming the suspicion ({fact:smr-tf-deadline} for terrorism financing; 5 business days where some of the information may be privileged)', 'AML/CTF Act s 41(2)'],
        ['Report threshold transactions (transfers of physical currency of {fact:ttr-threshold} or more) within {fact:ttr-deadline}', 'AML/CTF Act ss 5, 43(2)'],
        ['Report international value transfer services within 10 business days of passing on or receiving the transfer message (AUSTRAC’s transitional rules keep the earlier IFTI reporting in place until each entity moves across)', 'AML/CTF Act s 46'],
        ['Give AUSTRAC an AML/CTF compliance report for each reporting period set by the AML/CTF Rules', 'AML/CTF Act s 47']],
      5: [
        ['Keep records that allow individual transactions to be reconstructed, for 7 years', 'AML/CTF Act s 107'],
        ['Keep customer due diligence records, including data collected and risk decisions, for 7 years after the relationship ends', 'AML/CTF Act s 111'],
        ['Keep records showing compliance with the AML/CTF program obligations for 7 years after they stop being relevant', 'AML/CTF Act s 116'],
        ['Train relevant staff and have the program independently evaluated at least every 3 years, as set out in the policies', 'AML/CTF Act s 26F(4)(e)–(f)']]
    }
  },
  cps220: {
    source: [['Prudential Standard CPS 220 Risk Management (F2019L00669, in force from 1 July 2019) for banks and insurers', 'https://www.legislation.gov.au/F2019L00669/asmade/text'], ['Prudential Standard SPS 220 Risk Management (F2019L01578, in force from 1 January 2020) for super trustees, shown as “Super (SPS 220)”', 'https://www.legislation.gov.au/F2019L01578/asmade/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Maintain a risk management framework that gives the Board an institution-wide view of material risks and allows strategies, policies, procedures and controls to manage them', 'CPS 220 paras 19–20'],
        ['The framework is consistent with the business plan and provides a structure for identifying and managing each material risk, suited to size, business mix and complexity', 'CPS 220 paras 21–22'],
        ['At a minimum, the framework includes a risk appetite statement, a risk management strategy and a business plan, among other elements', 'CPS 220 para 23'],
        ['At a minimum, it addresses credit, market and investment, liquidity, insurance and operational risk, risks from strategic objectives and business plans, and any other material risks', 'CPS 220 para 26'],
        ['Notify APRA within 10 business days of becoming aware of a significant breach of, or material deviation from, the framework, or that it did not adequately address a material risk', 'CPS 220 para 53'],
        ['Notify APRA within 10 business days of material or prospective material changes to size, business mix and complexity', 'CPS 220 para 54'],
        ['Super (SPS 220): keep a risk management framework at all times covering all material financial and non-financial risks, assessed against the business as a whole, each fund and the obligations to members', 'SPS 220 paras 5–6, 10–11'],
        ['Super (SPS 220): cover at least governance, investment governance, liquidity (including investment options), operational, insurance and strategic risks, and contagion risk from any non-super business', 'SPS 220 paras 12–13'],
        ['Super (SPS 220): the framework includes the risk appetite statement, risk management strategy, risk management function, policies and controls for each material risk, defined roles, an adequate management information system and a review process', 'SPS 220 para 16'],
        ['Super (SPS 220): the Board is ultimately responsible for the framework, for solvency and for adequate resources', 'SPS 220 paras 7–8'],
        ['Super (SPS 220): notify APRA within 10 business days of a significant breach of, or material deviation from, the framework, or finding it did not address a material risk; and as soon as practicable of material changes to size, business mix and complexity', 'SPS 220 paras 35–36']],
      2: [
        ['The Board is ultimately responsible for the risk management framework and its oversight, sets the risk appetite and approves the risk appetite statement and risk management strategy', 'CPS 220 paras 9(a), 27, 29'],
        ['The risk appetite statement sets out the risk appetite, a risk tolerance (limit) for each material risk, how tolerances are set and monitored, what happens if one is breached, and when they are reviewed', 'CPS 220 para 28'],
        ['The Board makes sure senior management manage material risks within appetite, the structure supports risk management, risk-taking policies match the strategy, and enough resources go to risk management', 'CPS 220 para 9(c)–(f)'],
        ['Submit the risk appetite statement, business plan and risk management strategy to APRA on adoption and after material revisions, within 10 business days of Board approval', 'CPS 220 para 52'],
        ['Super (SPS 220): keep an up-to-date, Board-approved risk appetite statement with a risk tolerance for each material risk, how tolerances are set and monitored, what happens on a breach, and when they are reviewed', 'SPS 220 paras 19–20'],
        ['Super (SPS 220): keep an up-to-date, Board-approved risk management strategy describing each material risk, the key risk policies and their review dates, roles, and how risk culture is instilled', 'SPS 220 paras 21–22']],
      3: [
        ['The Board forms a view of the risk culture, how far it supports operating within appetite, identifies desirable changes and makes sure they are addressed', 'CPS 220 para 9(b)']],
      4: [
        ['Have a designated risk management function that is operationally independent, appropriately resourced, has access to all sources of material risk and tells the Board of significant breaches of or deviations from the framework', 'CPS 220 para 37'],
        ['Designate a Chief Risk Officer who can effectively challenge decisions affecting the risk profile, is independent of business lines and finance, and is not the CEO, CFO, Appointed Actuary or Head of Internal Audit', 'CPS 220 paras 38–39'],
        ['The CRO reports directly to the CEO and has regular and unfettered access to the Board and Board Risk Committee', 'CPS 220 para 40'],
        ['Have a designated compliance function, adequately staffed, with enough authority and a reporting line independent of business lines', 'CPS 220 para 43'],
        ['Super (SPS 220): have a designated risk management function that is operationally independent, properly resourced, has access to all sources of material risk and tells the Board of material deviations or breaches (it may sit in the group or with an external provider if it meets these tests)', 'SPS 220 paras 24–26']],
      5: [
        ['Internal or external audit reviews compliance with, and the effectiveness of, the framework at least annually, reporting to the Board Audit Committee', 'CPS 220 para 44'],
        ['Operationally independent, competent people carry out a comprehensive review of the framework at least every three years, reporting to the Board Risk Committee', 'CPS 220 paras 45–47'],
        ['Super (SPS 220): an operationally independent comprehensive review at least every three years, and a review of the framework in each other year', 'SPS 220 paras 27–29'],
        ['Super (SPS 220): have internal audit procedures and external audit arrangements that check compliance with the framework', 'SPS 220 para 30']],
      6: [
        ['The Board makes an annual risk management declaration to APRA, signed by the Board chair and the Board Risk Committee chair', 'CPS 220 para 49; Attachment A'],
        ['Qualify the declaration if there has been a significant breach of, or material deviation from, the framework, explaining the cause and the remedy', 'CPS 220 para 50'],
        ['Submit it within three months of the annual balance date (four months for ADIs that are not disclosing entities, and for Level 3 heads), unless APRA approves otherwise', 'CPS 220 para 51'],
        ['Super (SPS 220): the Board gives APRA an annual risk management declaration signed by two directors, on or before the day annual information is due under APRA’s reporting standards, and explains any qualification', 'SPS 220 paras 32–34; Attachment A']]
    }
  },
  sps515: {
    source: [['Prudential Standard SPS 515 Strategic Planning and Member Outcomes (F2024L00940, in force from 1 July 2025)', 'https://www.legislation.gov.au/F2024L00940/asmade/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Set specific strategic objectives for the sound and prudent management of the business that support the outcomes sought for members, approved by the Board', 'SPS 515 para 8'],
        ['Inform the objectives by the outcomes sought, likely improvements, the risk appetite statement, the SIS Act strategies (including the retirement income strategy), operational risk resources, the latest business performance review, the best financial interests duty and the sole purpose test', 'SPS 515 para 9'],
        ['Review the retirement income strategy’s appropriateness, effectiveness and adequacy at least every three years', 'SPS 515 para 10'],
        ['Keep a written, Board-approved rolling business plan of at least three years covering the whole business, with key initiatives and each one’s expected cost, funding and results', 'SPS 515 paras 11–12'],
        ['Show how the business plan reflects current and expected financial resources, using financial projections under different scenarios and key assumptions linked to material risks', 'SPS 515 para 13'],
        ['Update the business plan annually, having regard to the latest business performance review and monitoring', 'SPS 515 para 14']],
      2: [
        ['Have a robust approach to managing the financial resources available to achieve member outcomes and sound and prudent management', 'SPS 515 para 15'],
        ['Set each fee prudently and transparently, showing that charging it complies with legal duties and that it is appropriate and proportionate (for example against arm’s length value and comparable funds)', 'SPS 515 para 16'],
        ['The Board approves the use of any new fee power, or an existing power used for the first time', 'SPS 515 para 17'],
        ['Show the need for and purpose of each reserve, with a target amount or range and how it is built and replenished fairly between cohorts of members, and review each reserve regularly', 'SPS 515 paras 18–19'],
        ['Control financial resources held at trustee company level, including at least a capital management plan', 'SPS 515 para 20'],
        ['Make expenditure decisions only for sound and prudent management and consistent with legal duties, including the best financial interests duty and the sole purpose test', 'SPS 515 para 21'],
        ['For each expenditure decision, positively demonstrate its purpose and contribution to strategic objectives and member outcomes, why any incidental benefits to others are still consistent with legal duties, how it is funded, and how it will be monitored', 'SPS 515 para 22']],
      3: [
        ['Monitor progress against strategic objectives and the business plan with key performance indicators and triggers, to prompt remedial action or transfer planning', 'SPS 515 para 23'],
        ['Triggers include, at a minimum, failing or expecting to fail APRA’s annual performance test', 'SPS 515 para 24'],
        ['Review performance against strategic objectives every year and use the results to improve the business; the review covers outcomes for different member cohorts (including those in or near retirement), benchmarks and the outcomes assessments', 'SPS 515 paras 25–26'],
        ['Document the methodology for the annual outcomes assessment under SIS Act s 52(9), including how factors were balanced and how comparison products were chosen, and calculate MySuper comparison factors using the set reporting standards', 'SPS 515 paras 27–28'],
        ['Also assess whether members are disadvantaged by scale, whether operating costs harm their financial interests, and whether the basis for setting fees is appropriate', 'SPS 515 para 29'],
        ['Take timely remedial action when expected outcomes are not being achieved, and prepare for a possible transfer of members out of or into the fund', 'SPS 515 paras 30–31'],
        ['After failing the performance test, document a plan to respond in a timely manner, and notify APRA if the plan is activated', 'SPS 515 para 32'],
        ['If a MySuper authority is, or may be, cancelled: prepare a MySuper assets transfer plan nominating a receiving product, carry out the transfer, and notify APRA within 10 business days once it is complete', 'SPS 515 paras 33–43']]
    }
  },
  cps511: {
    source: [['Prudential Standard CPS 511 Remuneration (F2023L01348, in force from 1 January 2024). Paragraphs 21–73 apply to significant financial institutions (SFIs) and 74–98 to everyone else; the numbers below give both where a rule applies to all', 'https://www.legislation.gov.au/F2023L01348/asmade/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Keep a remuneration framework that aligns with the business plan, strategy and risk management framework, promotes management of financial and non-financial risks and long-term soundness (for super trustees, members’ best financial interests), and helps prevent conduct risk', 'CPS 511 paras 21, 74'],
        ['Document a remuneration policy covering how the framework meets those aims, the structure of remuneration arrangements (including staff of related service companies), conflicts from third-party service provider pay, and the supporting systems', 'CPS 511 paras 22, 75'],
        ['The Board is ultimately responsible for the framework and its effective application, and approves the remuneration policy', 'CPS 511 paras 23–24, 76–77'],
        ['Design variable pay to reflect financial and non-financial risks, with payout and vesting schedules matched to the time horizon of risk', 'CPS 511 paras 33(a)–(b), 78(a)–(b)'],
        ['The Board approves variable pay outcomes individually for senior managers and executive directors, and by cohort for material risk-takers and risk and financial control staff', 'CPS 511 paras 52, 87'],
        ['Do not pay remuneration through vehicles that undermine the standard: no indemnity or insurance against its consequences, and a documented ban on hedging unvested equity-linked pay', 'CPS 511 paras 61, 89'],
        ['Publish remuneration disclosures on the website each financial year, no more than six months after the year ends', 'CPS 511 paras 63–66, 91–94'],
        ['Assess and mitigate conflicts of interest in the design of remuneration arrangements, including from service contracts', 'CPS 511 paras 40, 83']],
      2: [
        ['Build in adjustment tools (Board discretion, in-period adjustment, malus and, where appropriate, clawback) with a downward-adjustment process that has clear triggers and can reduce pay to nil', 'CPS 511 paras 33(c), 78(c)'],
        ['All variable remuneration is subject to malus', 'CPS 511 paras 35, 79'],
        ['Set criteria for using the tools, at least: misconduct with significant adverse outcomes, significant risk management failures, significant breaches of accountability, fit and proper or compliance obligations, significant errors or misstatements, and significant adverse outcomes for customers, members or counterparties', 'CPS 511 paras 37, 80'],
        ['Take reasonable steps to reduce variable pay when a criterion is met, in proportion to the severity of the outcome', 'CPS 511 paras 38, 81'],
        ['Variable pay of someone under investigation for one of those criteria must not vest until the investigation closes', 'CPS 511 paras 39, 82'],
        ['Variable pay outcomes align with performance and risk outcomes and reflect the use of the adjustment tools', 'CPS 511 paras 44, 85'],
        ['Do not accelerate vesting for people in specified roles who leave, except for death or serious incapacity, disability or illness', 'CPS 511 paras 47, 86']],
      3: [
        ['Establish a Board Remuneration Committee of at least three non-executive directors with a written charter. Outside super it needs a majority of independent members and an independent chair; a super trustee’s Board chair may be a member but may chair it only if they are the Board’s only independent director', 'CPS 511 paras 25–29'],
        ['The committee consults the Board Risk Committee and the Chief Risk Officer under a documented process, gets comprehensive reporting, and has free access to other committees and to risk and financial control staff', 'CPS 511 paras 30–32'],
        ['Give material weight to non-financial measures in performance-related variable pay; no component may depend entirely on share price or profit', 'CPS 511 para 34 and footnote 12'],
        ['Clawback applies to senior managers, executive directors and highly paid material risk-takers for at least two years after payment or vesting, even after they leave', 'CPS 511 para 36'],
        ['Defer at least 60% of the CEO’s variable pay over at least six years, and at least 40% for other senior managers and executive directors over five years (vesting pro rata, only after four years), and for highly paid material risk-takers over four years (only after two)', 'CPS 511 para 41'],
        ['Deferral does not apply to anyone with deferred variable pay of less than $50,000 in a financial year', 'CPS 511 para 43'],
        ['Pay or vest variable remuneration only if justified by the effectiveness of risk management and by individual, business unit and entity performance', 'CPS 511 para 45'],
        ['The committee recommends specified roles’ arrangements and outcomes to the Board each year, and pay for risk and financial control staff is not unduly influenced by the businesses they control', 'CPS 511 paras 49–53'],
        ['Review the framework’s compliance at least annually and its effectiveness, independently, at least every three years, reporting results to the committee', 'CPS 511 paras 54–57'],
        ['Publish the detailed disclosure tables, with Tables 2 to 4 in a machine-readable format such as CSV', 'CPS 511 paras 64, 67–73']]
    }
  },
  cps190: {
    source: [['Prudential Standard CPS 190 Recovery and Exit Planning (F2023L01380; applies from 1 January 2024, and to super trustees from 1 January 2025)', 'https://www.legislation.gov.au/F2023L01380/asmade/text'], ['Prudential Standard CPS 900 Resolution Planning (F2023L01384, in force from 1 January 2024; applies to SFIs, and to other entities APRA decides provide critical functions, once APRA notifies them)', 'https://www.legislation.gov.au/F2023L01384/asmade/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Keep a recovery and exit plan showing how the entity could recover its financial resilience under a stress that threatens its viability, or exit regulated activity in an orderly and solvent way if recovery fails', 'CPS 190 para 13'],
        ['Make the plan proportionate and integrate it with the risk management framework, capital and liquidity management (not super), and for super trustees the business plan and business performance review', 'CPS 190 paras 14–15'],
        ['Do not assume extraordinary public sector support', 'CPS 190 para 16'],
        ['The Board approves the plan, oversees its reviews and any execution; an SFI’s Board also forms a view on whether recovery capacity is sufficient', 'CPS 190 paras 17–18'],
        ['The plan includes a standalone summary, a trigger framework with early warning indicators, governance with senior executive roles, credible recovery and exit actions, and a communication strategy', 'CPS 190 para 19'],
        ['SFIs add scenario analysis with at least two scenarios severe enough to threaten viability (one systemic, one idiosyncratic), a quantified recovery capacity, and for each action a timeline, barriers, preparatory measures and estimated impact', 'CPS 190 paras 20–21'],
        ['Maintain the capabilities, preparatory steps and financial resources needed to execute the plan, and monitor the stress indicators regularly', 'CPS 190 paras 24–27'],
        ['Review and update the plan at least annually (SFIs) or every three years (others), and after significant changes in structure, business mix, strategy or risk profile', 'CPS 190 paras 28–29'],
        ['SFIs have an independent comprehensive review at least every three years, including operational testing that simulates using the plan', 'CPS 190 paras 30–31'],
        ['Give APRA a copy of the plan within three months of Board approval after each review, and notify APRA if the plan is activated', 'CPS 190 paras 32–33']],
      2: [
        ['Support APRA in developing and maintaining a resolution plan (including cross-border parts for entities with overseas operations)', 'CPS 900 paras 13–15'],
        ['The Board supports resolution planning, is ultimately responsible for meeting the standard, sets clear senior executive roles, and approves any resolvability assessment and pre-positioning plan', 'CPS 900 paras 16–17'],
        ['If APRA requires it, analyse critical functions and the shared services, including third-party services, they depend on', 'CPS 900 paras 18–19'],
        ['If APRA requires it, assess resolvability: for each resolution option, the barriers, timelines, execution risks and pre-positioning needed, possibly with independent review', 'CPS 900 paras 20–22'],
        ['If APRA requires it, develop and implement a pre-positioning plan to remove barriers (for example structure changes, renegotiating third-party contracts, wind-down plans and operational continuity)', 'CPS 900 paras 23–25'],
        ['Maintain the financial resources and capabilities (governance, operations, financial management, data and systems) needed to support the resolution plan; APRA may require extra loss-absorbing capacity outside super', 'CPS 900 paras 26–29'],
        ['Review the critical functions analysis and resolvability assessment independently at least every three years and report to APRA, and notify APRA of material changes that may create a barrier to resolution', 'CPS 900 paras 32–34']]
    }
  },
  liquidity: {
    source: [['Prudential Standard APS 210 Liquidity (F2025L00653, in force from 1 July 2025)', 'https://www.legislation.gov.au/F2025L00653/asmade/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Maintain enough liquidity at all times to meet obligations as they fall due, hold enough liquid assets to survive a severe liquidity stress, and fund activities with stable sources', 'APS 210 paras 12–13'],
        ['APRA classifies each locally incorporated ADI as a Liquidity Coverage Ratio (LCR) ADI or a Minimum Liquidity Holdings (MLH) ADI, and the ADI meets its minimum requirements continuously, absent financial stress', 'APS 210 paras 52–54'],
        ['LCR ADIs hold enough unencumbered high-quality liquid assets for 30 days of severe stress: an Australian dollar LCR and an all-currencies LCR of at least 100% (40% all currencies for foreign ADIs)', 'APS 210 para 55; Attachment A'],
        ['Locally incorporated LCR ADIs maintain a Net Stable Funding Ratio of at least 100% at all times', 'APS 210 paras 59–60; Attachment C'],
        ['MLH ADIs hold at least 9% of their liabilities in specified liquid assets', 'APS 210 para 57; Attachment B'],
        ['APRA may set a higher minimum LCR, MLH or NSFR if it has concerns about the ADI’s liquidity risk profile or management', 'APS 210 paras 56, 58, 61'],
        ['Tell APRA as soon as possible of any concerns about the current or future liquidity position, and immediately if there is a severe liquidity stress, with the action being taken', 'APS 210 para 14']],
      2: [
        ['The Board is ultimately responsible for liquidity risk, and the framework includes a Board-approved liquidity risk tolerance, liquidity management strategy and policy, and funding strategy, plus operating standards and a contingency funding plan', 'APS 210 paras 15–16'],
        ['The Board makes sure the framework is documented and reviewed at least annually, and reviews regular reports on the liquidity position', 'APS 210 paras 17–18'],
        ['Review the liquidity risk tolerance at least annually; it must let the ADI withstand a prolonged period of stress', 'APS 210 paras 21–24'],
        ['The liquidity risk oversight function is operationally independent and able to challenge treasury', 'APS 210 para 28'],
        ['Project cash flows over suitable horizons, set and review liquidity limits (with an action plan when one is breached), manage collateral and intraday liquidity, and use early warning indicators', 'APS 210 paras 36–41'],
        ['Keep a documented three-year funding strategy, approved by the Board at least annually, and tell APRA of material changes', 'APS 210 paras 44–46'],
        ['Keep a formal contingency funding plan with funding sources, escalation procedures and lead times, linked to stress test results; ADIs with retail deposits plan for a retail deposit run without closing distribution channels', 'APS 210 paras 47–50'],
        ['Review and test the contingency funding plan at least annually, with Board approval', 'APS 210 para 51'],
        ['LCR ADIs run regular stress tests (short and prolonged, institution-specific and market-wide), report results to the Board and APRA, and use them in limits and planning', 'APS 210 paras 62–66'],
        ['Foreign ADIs assess at least annually whether they can operate locally for at least three business days without help from offshore staff', 'APS 210 paras 67–68']]
    }
  },
  sps530: {
    source: [['Prudential Standard SPS 530 Investment Governance (F2022L01492, in force from 1 January 2023)', 'https://www.legislation.gov.au/F2022L01492/asmade/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['The trustee is ultimately responsible for the sound and prudent management of each fund’s investments', 'SPS 530 para 7'],
        ['Have an investment governance framework at all times, appropriate to size, business mix and complexity; the Board is ultimately responsible for establishing, overseeing and maintaining it', 'SPS 530 paras 10–12, 14'],
        ['The framework includes, at a minimum, investment objectives for each option, a method for reporting measures, the investment strategies, Board investment policies, role statements, processes for performance, risk, stress testing, valuation and reporting, and a review process', 'SPS 530 para 13'],
        ['Make sure everyone in investment roles knows the framework, with processes and controls to monitor compliance', 'SPS 530 para 15'],
        ['Have the framework comprehensively reviewed by operationally independent, competent people at least every three years', 'SPS 530 paras 16–17'],
        ['If group policies or functions are used, the Board approves their use and makes sure they suit the trustee’s business', 'SPS 530 para 9']],
      2: [
        ['The Board approves investment objectives for each option and an investment strategy for each fund and each option, monitors whether objectives are met, and acts on investment reports', 'SPS 530 para 8'],
        ['Set specific, measurable objectives for each option, including at least a return objective and a risk objective', 'SPS 530 para 18'],
        ['Document how each strategy has regard to the SIS Act s 52(6) factors, and set diversification by identifying risk factors, sources of return and target exposures', 'SPS 530 paras 19–20'],
        ['For multi-asset options, set asset allocation targets and ranges, the basis for changing them, and a policy to keep allocations within range', 'SPS 530 para 21'],
        ['For MySuper strategies, also document diversification, compliance with s 52(13) and compliance with the fee rules', 'SPS 530 para 22'],
        ['Review each strategy against its objectives at least annually under a Board-approved review policy with triggers for interim reviews, and justify any change', 'SPS 530 paras 28–29']],
      3: [
        ['Have an investment selection process with due diligence proportionate to the investment, done before it is selected', 'SPS 530 para 23'],
        ['Before selecting, understand the investment, the factors that could affect the option’s objectives, how it performs under stress scenarios, and whether it suits the option', 'SPS 530 para 24'],
        ['Set performance measures and benchmarks for each MySuper product, option and investment (Board approved, except benchmarks for individual investments)', 'SPS 530 para 25'],
        ['Report each option’s and MySuper product’s performance regularly to the Board and senior management, explaining out- and under-performance against benchmarks', 'SPS 530 para 26'],
        ['People assessing performance are operationally independent from those making the investments', 'SPS 530 para 27']],
      4: [
        ['Have a comprehensive, Board-approved investment stress testing program integrated into the framework, with adverse scenarios for each option’s strategy', 'SPS 530 paras 30–31'],
        ['Stress test before implementing a strategy, and at least annually to confirm strategies and allocation ranges remain appropriate and to assess each option’s actual allocation', 'SPS 530 para 32'],
        ['Document the program’s objectives, methods, assumptions, roles, outputs, review, ad hoc triggers and data quality, and have the Board review results and record how they are used', 'SPS 530 paras 33–35'],
        ['Have a Board-approved liquidity management plan for each fund covering every option, stress scenarios, what counts as a liquidity event, the action to take, roles and key metrics', 'SPS 530 paras 36–37'],
        ['Include liquidity stress testing in the stress testing program and the liquidity management plan', 'SPS 530 para 38'],
        ['Have a valuation governance framework with a Board-approved valuation policy covering roles, reporting, methods for each asset class, independent external valuations, frequency, interim valuation triggers, validation and back-testing, and disputed valuations', 'SPS 530 paras 39–41']]
    }
  },
  far: {
    source: [['Financial Accountability Regime Act 2023 (compilation in force from 21 February 2025)', 'https://www.legislation.gov.au/C2023A00067/latest/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Make sure accountable persons’ responsibilities together cover all parts of the group’s operations and each prescribed responsibility', 'FAR Act s 23(1)(a)'],
        ['Make sure no one acts as an accountable person unless registered with the regulator (with grace periods, for example 90 days for a temporary or unforeseen vacancy) and not disqualified', 'FAR Act ss 23(1)(b), 24'],
        ['Notify the regulator within 30 days (or as the Regulator rules provide) when an accountable person leaves, is dismissed or suspended, or has variable pay reduced for failing their obligations, or when there are reasonable grounds to believe the entity or a person has failed to comply, and of material changes to registered information', 'FAR Act ss 31(1), (6), 32'],
        ['Entities above the enhanced notification threshold give the regulator an accountability statement for each accountable person (with the person’s declaration that it is accurate) and an accountability map of names, reporting lines and responsibilities, and notify material changes', 'FAR Act ss 31(2), 33–34']],
      2: [
        ['The entity takes reasonable steps to conduct its business with honesty, integrity, due skill, care and diligence, to deal with the regulators openly and cooperatively, and to prevent matters that would harm its prudential standing or reputation', 'FAR Act s 20(a)–(c)'],
        ['The entity takes reasonable steps to make sure each accountable person meets their obligations, and that significant related entities do the same', 'FAR Act s 20(d)–(e)'],
        ['Accountable persons act with honesty, integrity, due skill, care and diligence, deal with the regulators openly and cooperatively, and take reasonable steps to prevent harm to prudential standing and material breaches of the financial sector laws', 'FAR Act s 21(1)'],
        ['Where two or more accountable persons share a responsibility, each is fully accountable for it', 'FAR Act s 21(2)'],
        ['Reasonable steps include appropriate governance, control and risk management, safeguards against inappropriate delegation, procedures to find and fix problems, and action on non-compliance', 'FAR Act s 22']],
      3: [
        ['Defer at least 40% of each accountable person’s variable remuneration for at least four years', 'FAR Act ss 25(1)(a), 27(1), 28'],
        ['Have a remuneration policy that reduces an accountable person’s variable remuneration in proportion to any failure to meet their obligations (possibly to zero), and do not pay the reduced amount', 'FAR Act s 25(1)(b)–(c), (2)'],
        ['Deferral is not required where the amount to be deferred for the year is less than $50,000 (or any amount set by the Minister rules)', 'FAR Act s 29']]
    }
  },
  ransom: {
    source: [['Cyber Security Act 2024, Part 3 Ransomware reporting obligations (as made)', 'https://www.legislation.gov.au/C2024A00098/latest/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['The duty applies when a cyber security incident affects a reporting business entity, someone makes a demand to benefit from it, and the entity (or someone on its behalf) makes a payment or gives a benefit directly related to the demand', 'Cyber Security Act s 26(1)'],
        ['Reporting business entities are businesses carrying on business in Australia with annual turnover above the threshold set in the rules (not Commonwealth or State bodies), and responsible entities for critical infrastructure assets covered by Part 2B of the Security of Critical Infrastructure Act 2018', 'Cyber Security Act s 26(2)–(3)'],
        ['Report to the designated Commonwealth body within {fact:ransomware-report} of making the payment or becoming aware it was made', 'Cyber Security Act s 27(1)'],
        ['Include what the entity knows or can find out by reasonable enquiry about who paid, the incident and its impact, the demand, the payment, and communications with the extorting entity, in the approved form', 'Cyber Security Act s 27(2), (4)'],
        ['Failing to report is a civil penalty provision (60 penalty units)', 'Cyber Security Act s 27(5)']]
    }
  },
  insurance: {
    source: [['Corporations Act 2001, ss 766A, 766G, 912A and 992A (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text'], ['Insurance Contracts Act 1984 (compilation in force 1 March 2024)', 'https://www.legislation.gov.au/C2004A02944/latest/text'], ['ASIC Act 2001, s 12BF and Part 2 Division 2 Subdivision DA (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00819/latest/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Providing a claims handling and settling service is a financial service, so it needs an AFS licence (or an exemption)', 'Corporations Act s 766A(1)(eb)'],
        ['Claims handling and settling includes assisting with or deciding a claim, assessing or quantifying the insurer’s liability, and offering to settle or paying it', 'Corporations Act s 766G(1)'],
        ['Licensees must do all things necessary to ensure their financial services, including claims handling, are provided efficiently, honestly and fairly', 'Corporations Act s 912A(1)(a)']],
      2: [
        ['Every insurance contract implies a duty on each party to act towards the other with the utmost good faith in any matter arising under or in relation to it; an insurer’s breach is a civil penalty provision', 'Insurance Contracts Act s 13(1)–(2A)'],
        ['A party cannot rely on a contract term if doing so would fail to act with the utmost good faith', 'Insurance Contracts Act s 14'],
        ['ASIC can vary, suspend or cancel an insurer’s AFS licence, or ban people, for failing the utmost good faith duty in handling or settling claims', 'Insurance Contracts Act s 14A'],
        ['For consumer insurance contracts, the insured’s duty is to take reasonable care not to make a misrepresentation, judged with regard to things like how clear the insurer’s questions were', 'Insurance Contracts Act ss 20A–20B'],
        ['For other contracts, the insurer must clearly tell the insured in writing about the duty of disclosure before the contract is entered into, or it cannot rely on non-disclosure (unless fraudulent)', 'Insurance Contracts Act ss 21–22']],
      3: [
        ['Do not offer or invite a retail client to buy a financial product, including insurance, in or because of unsolicited real-time contact such as a phone call or meeting, unless an exception applies', 'Corporations Act s 992A(1)–(2)'],
        ['Consent to contact must be positive, voluntary, clear and recent (within six weeks, or up to 12 weeks where a medical check is needed), and hawked products can be returned for a refund', 'Corporations Act ss 992A(5), 992AA'],
        ['Add-on insurance (deferred sales model): do not sell an add-on insurance product until the deferral period ends, which runs to the end of four days after the customer commits to the main product and is given the prescribed information', 'ASIC Act ss 12DP, 12DQ'],
        ['Do not offer add-on insurance other than in writing during the deferral period and six weeks after it starts, unless the customer initiated the contact (some exceptions, such as comprehensive motor vehicle insurance)', 'ASIC Act ss 12DR, 12DW'],
        ['Unfair terms in standard form consumer and small business insurance contracts are void, and proposing or relying on one is a contravention', 'ASIC Act s 12BF(1), (2A), (2C); Insurance Contracts Act s 15(2)(d)']]
    }
  },
  lifeact: {
    source: [['Life Insurance Act 1995 (compilation in force from 21 February 2025)', 'https://www.legislation.gov.au/C2004A04860/latest/text'], ['Corporations Act 2001, ss 963B, 963BA and 963BB (compilation in force 19 September 2026)', 'https://www.legislation.gov.au/C2004A00818/latest/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Have at least one statutory fund for life insurance business, with separate funds for investment-linked business and (generally) for business outside Australia', 'Life Insurance Act s 31'],
        ['Credit premiums, investment income and other money received for a fund’s business to that fund, and keep its assets separate from other funds and the company’s other assets', 'Life Insurance Act ss 34(3), 36'],
        ['Use a fund’s assets only for its liabilities and expenses, permitted investments and authorised distributions, and do not charge them except as allowed', 'Life Insurance Act s 38'],
        ['In managing a statutory fund, give priority to the interests of owners and prospective owners of its policies; directors must take reasonable care to see that the company does so and can be personally liable for losses', 'Life Insurance Act ss 32, 48'],
        ['Each policy document names the statutory fund or funds the policy belongs to', 'Life Insurance Act s 35'],
        ['Statutory funds cannot be restructured or terminated without APRA’s approval', 'Life Insurance Act ss 30(e), 46'],
        ['Appoint an auditor and an appointed actuary who meet APRA’s eligibility criteria, replacing an actuary within six weeks; the actuary must raise problems with the company and tell APRA immediately of significant suspected contraventions', 'Life Insurance Act ss 83–85, 93–94, 98']],
      2: [
        ['Commissions on life risk insurance given to advice licensees are not banned conflicted remuneration only if they are level, or meet ASIC’s benefit ratio limits and clawback requirements (group cover in super and default MySuper members excluded)', 'Corporations Act s 963B(1)(b), (2)'],
        ['ASIC sets the acceptable benefit ratio for each year by legislative instrument', 'Corporations Act s 963BA(1)–(2)'],
        ['The arrangement must require repayment of commission if the policy is cancelled, not continued or reduced within two years of first issue (other than because of a claim), in at least the amount ASIC sets', 'Corporations Act s 963BA(3)–(4)'],
        ['Where personal advice is given, the client must consent before the product is issued to the commission, after being told the insurer, the commission rate as a percentage of the policy cost, any services, and that consent is required by law and irrevocable', 'Corporations Act s 963BB']]
    }
  },
  phiact: {
    source: [['Private Health Insurance Act 2007 (compilation in force from 19 September 2026). Product tiers (Gold, Silver, Bronze, Basic) and the content of information statements are set in the Private Health Insurance (Complying Product) Rules, not itemised here', 'https://www.legislation.gov.au/C2007A00031/latest/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['Do not take any action, or make any decision, that improperly discriminates between people who are or want to be insured under a complying health insurance policy', 'PHI Act s 55-5(1)'],
        ['Improper discrimination includes discrimination based on a medical condition, gender, race, sexual orientation, religious belief, age or where someone lives (except as the Act allows), characteristics likely to increase the need for treatment, or how often someone needs treatment or claims', 'PHI Act s 55-5(2)']],
      2: [
        ['Premiums must match the amount approved by the Minister for the product subgroup, apart from Lifetime Health Cover loadings and allowed discounts offered on the same basis across the product', 'PHI Act s 66-5'],
        ['Apply to the Minister for approval before changing premiums or making a designated change to a product; within the approved application period the Minister approves unless an increase is contrary to the public interest', 'PHI Act s 66-10']],
      3: [
        ['Keep an accurate, up-to-date private health information statement for every product subgroup offered or held (an offence of strict liability if missing or out of date)', 'PHI Act s 93-1'],
        ['Make information statements available and give up-to-date copies to the Department or the Private Health Insurance Ombudsman on request', 'PHI Act ss 93-10, 96-1']],
      4: [
        ['Waiting periods for people who have not transferred can be no longer than 12 months for obstetrics and pre-existing conditions, and 2 months for psychiatric care, rehabilitation, palliative care and other hospital treatment', 'PHI Act s 75-1'],
        ['A pre-existing condition is one whose signs or symptoms existed in the six months before joining, in the opinion of the insurer’s appointed medical practitioner', 'PHI Act s 75-15'],
        ['Portability: someone transferring from another complying policy (within 7 days or longer if allowed) serves no new waiting period for hospital treatment covered under the old policy, only any unexpired balance', 'PHI Act ss 75-10, 78-1']],
      5: [
        ['Tell an adult insured person a reasonable time in advance about any proposed rule change that is or might be detrimental to their interests (failing to do so is an offence)', 'PHI Act ss 93-25, 93-30']],
      6: [
        ['Increase hospital cover premiums by the Lifetime Health Cover loading for adults who did not have hospital cover by their base day, or who later drop cover', 'PHI Act ss 34-1, 34-5'],
        ['Stop the loading after 10 years of continuous hospital cover, and never let it exceed 70% of the base rate', 'PHI Act ss 34-10, 37-15']]
    }
  },
  cps510: {
    source: [['Prudential Standard CPS 510 Governance (F2023L01535, in force from 1 January 2024)', 'https://www.legislation.gov.au/F2023L01535/asmade/text'], ['Prudential Standard CPS 520 Fit and Proper (F2018L01390, in force from 1 July 2019). Banks and insurers. APRA has proposed one consolidated governance standard', 'https://www.legislation.gov.au/F2018L01390/asmade/text'], ['Prudential Standards SPS 510 Governance (F2024L00637) and SPS 520 Fit and Proper (F2024L00638), both in force from 30 June 2024, for super trustees, shown as “Super”', 'https://www.legislation.gov.au/F2024L00637/asmade/text']],
    checkedText: '9 October 2026',
    themes: {
      1: [
        ['The Board is ultimately responsible for oversight of the sound and prudent management of the institution, and has a formal charter', 'CPS 510 paras 16–17'],
        ['Have at least five directors and a majority of independent directors, with an independent chair, and a majority of non-executive directors at every meeting (some exceptions for subsidiaries)', 'CPS 510 paras 26–29'],
        ['The chair cannot have been CEO in the previous three years (an interim CEO role over 90 days needs APRA approval)', 'CPS 510 para 30'],
        ['Assess the Board’s performance, and each director’s, at least annually', 'CPS 510 para 44'],
        ['Have a formal Board renewal policy that considers whether long tenure could interfere with acting in the institution’s best interests, and covers appointing, re-appointing and removing directors', 'CPS 510 para 45'],
        ['Have a Board Audit Committee of at least three non-executive directors, a majority independent, with an independent chair who is not the Board chair', 'CPS 510 paras 51–55'],
        ['Have a Board Risk Committee with an independent chair (not the Board chair) to oversee the risk management framework', 'CPS 510 paras 79–83'],
        ['Have an independent, adequately resourced internal audit function (or an APRA-approved alternative)', 'CPS 510 para 68'],
        ['Super (SPS 510): the Board is ultimately responsible for sound and prudent management, documents and monitors delegations, and makes sure directors and senior management collectively have the skills needed', 'SPS 510 paras 8–10'],
        ['Super (SPS 510): keep a governance framework including a Board charter, voting procedures, and policies on Board size and composition, renewal, and nominating, appointing and removing directors with defined terms and maximum tenure', 'SPS 510 paras 16–18, 22–23'],
        ['Super (SPS 510): the Board chair is a director, a majority of directors and all senior management are ordinarily resident in Australia, and only a director chairs a committee that could materially affect members', 'SPS 510 paras 11–12, 19–20'],
        ['Super (SPS 510): assess the Board’s and each director’s performance at least annually', 'SPS 510 para 21'],
        ['Super (SPS 510): have a Board Audit Committee of at least three non-executive directors (the Board chair may chair it only if they are the only independent director), which reviews the RSE auditor’s independence each year and audit plans and findings, and runs a confidential channel for staff concerns', 'SPS 510 paras 24–36'],
        ['Super (SPS 510): have an independent, adequately resourced internal audit function (or seek an APRA exemption), obtain an independence declaration from the RSE auditor, and observe the cooling-off and rotation rules for auditors', 'SPS 510 paras 37–47'],
        ['Super (SPS 510): do not stop anyone, by confidentiality clauses or otherwise, from giving information to APRA', 'SPS 510 paras 48–49']],
      2: [
        ['Fit and proper means it would be prudent to conclude the person has the competence, character, diligence, honesty, integrity and judgement for the role, is not disqualified, and has no material conflict of interest', 'CPS 520 para 30'],
        ['Complete a fit and proper assessment before a person takes a responsible person position (within 28 days where they are appointed by members’ resolution or APRA determination)', 'CPS 520 para 41'],
        ['Interim appointments without a full assessment are allowed for up to 90 days, after reasonable checks', 'CPS 520 para 42'],
        ['Assess every responsible person at least annually (or as close as practicable), making all reasonable enquiries', 'CPS 520 paras 43–44'],
        ['If someone is not fit and proper, take all reasonable steps to make sure they are not appointed, or do not continue', 'CPS 520 para 54'],
        ['Super (SPS 520): responsible persons include directors, the secretary, senior managers, the RSE auditor and actuary, and people in connected entities who could materially affect the business; define the competencies for each position', 'SPS 520 paras 12–18'],
        ['Super (SPS 520): a person is fit and proper if it is prudent to conclude they have the competence, character, diligence, experience, honesty, integrity, judgement and qualifications for the role, are not disqualified under the SIS Act, and have no conflict that creates a material risk', 'SPS 520 para 19'],
        ['Super (SPS 520): RSE auditors and actuaries meet extra criteria, including at least five years’ relevant experience and living in Australia', 'SPS 520 paras 20–25'],
        ['Super (SPS 520): assess before appointment (interim appointments up to 90 days after reasonable checks), at least annually, and again if new information raises a concern', 'SPS 520 paras 29–33'],
        ['Super (SPS 520): take all reasonable steps to stop someone assessed as not fit and proper from being appointed or continuing, and check no responsible person is a disqualified person', 'SPS 520 paras 42, 48']],
      3: [
        ['Maintain a Board-approved Fit and Proper Policy, as part of the risk management framework, and make sure responsible persons understand it', 'CPS 520 paras 12–15'],
        ['Tell APRA each responsible person’s title, name, date of birth, responsibilities and assessment status, and update it within 28 days of any change or appointment', 'CPS 520 paras 55–56'],
        ['Notify APRA within 10 business days of assessing that a responsible person is not fit and proper, with reasons if they stay in the role', 'CPS 520 para 57'],
        ['Super (SPS 520): keep a Board-approved Fit and Proper Policy, part of the risk management framework, covering who assesses, what information is gathered, how decisions are made, and what happens if someone fails', 'SPS 520 paras 7–10, 26–28'],
        ['Super (SPS 520): the policy allows whistleblowing to the assessor or APRA about a responsible person, protects people who disclose in good faith, and the trustee must not restrict such disclosures', 'SPS 520 paras 36–41'],
        ['Super (SPS 520): give APRA each responsible person’s details and keep them correct, and promptly tell APRA in writing if someone stays in a role despite being assessed as not fit and proper', 'SPS 520 paras 43–45'],
        ['Super (SPS 520): keep enough records of each assessment to show the fitness and propriety of current and recent responsible persons', 'SPS 520 para 35']]
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
