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
  }
};
