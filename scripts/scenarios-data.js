// Scenario simulations for /learn/scenarios.html (rendered by scenario-runner.js).
// Each scenario has steps. Each step has a situation and choices. Each choice has
// quality ("best", "ok" or "poor"), feedback, and optionally "next" (a step id);
// otherwise the scenario moves to the following step in the list.
// Steps with ending: true finish the scenario.
window.SCENARIOS = [
  {
    id: "fee-error",
    title: "The fee that shouldn't have been charged",
    level: "Intermediate",
    summary: "A super fund discovers members were overcharged. Work through breach assessment, reporting and remediation.",
    setting: "You are the Risk and Compliance Manager at a super fund (an RSE licensee that also holds an AFS licence). The fund outsources administration to a third-party administrator.",
    steps: [
      { id: "s1",
        text: "Monday morning. The administrator's operations lead emails you: during a routine check, they noticed that since a product change 18 months ago, an administration fee has been calculated on the wrong basis for about 3,000 members, some of whom have since left the fund. Early estimates suggest overcharges of $20 to $400 per member. What do you do first?",
        choices: [
          { label: "Log it in the incident register today, record today as the date the fund became aware, and ask the administrator to stop the error and preserve the data.", quality: "best",
            feedback: "Right. Recording the awareness date from day one is critical because reporting clocks run from awareness, not certainty. Containing the error stops the harm growing." },
          { label: "Ask the administrator to investigate fully and come back in a month before logging anything.", quality: "poor",
            feedback: "Risky. The fund is already aware of facts suggesting a breach. Waiting to log it doesn't stop the reporting clock and makes the fund's records look unreliable. The error also keeps happening meanwhile." },
          { label: "Have the administrator fix the calculation and quietly refund current members, with no need to involve compliance.", quality: "poor",
            feedback: "This skips breach assessment, reporting and fair remediation of former members. Quiet fixes are a classic regulator concern and may themselves breach obligations." }
        ] },
      { id: "s2",
        text: "The incident is logged. Now you need to assess whether it is a reportable situation for ASIC (as an AFS licensee) and a notifiable breach for APRA. The fee wasn't authorised by the PDS or governing rules as applied. How do you approach the assessment?",
        choices: [
          { label: "Assess it against the core obligations (for example, efficiently, honestly and fairly) and the deemed-significance tests, including whether it has caused or is likely to cause material loss or damage to members. Document the reasoning.", quality: "best",
            feedback: "Good. A breach causing, or likely to cause, material loss or damage to clients can be deemed significant. Documenting the reasoning either way is essential evidence." },
          { label: "It's only reportable if the total overcharge exceeds $1 million.", quality: "poor",
            feedback: "There is no dollar threshold in the reportable situations regime. Significance is assessed against the legal tests, and many small losses across many members can be material." },
          { label: "It was the administrator's error, so it's the administrator's breach to report, not the fund's.", quality: "poor",
            feedback: "Outsourcing doesn't transfer accountability. The trustee remains responsible for members' outcomes and for its own reporting obligations." }
        ] },
      { id: "s3",
        text: "You conclude there are reasonable grounds to believe a significant breach has occurred. Root-cause analysis and member-level calculations will take about three months. What about reporting?",
        choices: [
          { label: "Report within 30 calendar days of awareness using the known facts, say that the investigation is continuing, and update the regulators as facts firm up.", quality: "best",
            feedback: "Correct. Report on reasonable grounds within the timeframe, then update. For RSE licensees, a breach notification to APRA that includes all the information ASIC requires is taken to be lodged with ASIC too, so one report can cover both." },
          { label: "Wait until the investigation is finished so the report is complete and accurate.", quality: "poor",
            feedback: "The 30-day clock started when the fund became aware of reasonable grounds. Waiting three months would make the report late, which is a breach in itself." },
          { label: "Just tell the regulators informally in the next regular catch-up.", quality: "poor",
            feedback: "Informal conversations don't replace the prescribed notification, although a courtesy heads-up alongside the formal report can be good practice." }
        ] },
      { id: "s4",
        text: "Time to scope the remediation. Some records from the first few months are incomplete, and around 600 affected members have since left the fund. What approach do you recommend?",
        choices: [
          { label: "Include all affected members, current and former. Use beneficial assumptions where data is missing, and compensate for lost investment earnings as well as the fee itself.", quality: "best",
            feedback: "This reflects ASIC's RG 277 expectations: include everyone who was or may have been affected, use assumptions that favour consumers, and put people back where they would have been." },
          { label: "Refund current members only. Former members can complain if they notice.", quality: "poor",
            feedback: "RG 277 expects proactive remediation of everyone affected, without waiting for complaints. Excluding former members would be hard to justify as fair." },
          { label: "Refund the fee amounts but not investment earnings, to keep costs down.", quality: "ok",
            feedback: "Better than nothing, but in super, money taken from an account also misses out on investment returns. Remediation should generally cover that lost earnings too." }
        ] },
      { id: "s5",
        text: "Calculations show 140 former members are owed $5 or less each (including earnings). Locating them would cost more than they're owed. What are your options?",
        choices: [
          { label: "Consider the RG 277 options for small amounts owed to former customers, such as a residual remediation payment, and document the decision and the amounts.", quality: "best",
            feedback: "RG 277 sets out how low-value amounts owed to former customers can be handled, including residual payments, provided the conditions are met. Record the reasoning and the amounts." },
          { label: "Keep the money in the fund's general reserve.", quality: "poor",
            feedback: "Money owed to members shouldn't simply be retained. RG 277 sets out acceptable approaches for residual amounts." },
          { label: "Make every effort to find and pay all 140, whatever it costs.", quality: "ok",
            feedback: "Well intentioned, but RG 277 recognises that for very small amounts owed to former customers, other options can be reasonable. Also consider who bears the cost: it shouldn't fall unfairly on other members." }
        ] },
      { id: "s6",
        text: "Remediation payments are made. Before closing the incident, what else needs to happen?",
        choices: [
          { label: "Confirm the root cause is fixed. Add a control, such as an independent fee reconciliation after product changes, and test it. Update the regulators, report to the board risk committee, and share lessons with the change management team.", quality: "best",
            feedback: "Closure is about preventing a repeat. A detective control for fee calculations and better change management testing address the root cause, and board reporting closes the governance loop." },
          { label: "Close it. The members have been paid.", quality: "poor",
            feedback: "Without fixing the root cause and strengthening controls, the same error can recur. Regulators will ask what has changed." },
          { label: "Ask the administrator to confirm by email that it won't happen again.", quality: "ok",
            feedback: "A commitment is useful, but on its own it isn't a control. The fund should test the fix and add its own oversight of fee accuracy." }
        ] },
      { id: "end", ending: true,
        text: "The incident is closed with the root cause fixed, all affected members remediated, and regulators and the board kept informed.",
        learn: [
          { label: "Incident and breach management", href: "/risk-management/incident-and-breach-management.html" },
          { label: "RG 78 Breach reporting", href: "/standards/asic-rg-78.html" },
          { label: "RG 277 Consumer remediation", href: "/standards/asic-rg-277.html" },
          { label: "Superannuation: fee governance", href: "/sectors/superannuation.html" }
        ] }
    ]
  },
  {
    id: "provider-outage",
    title: "The administrator goes dark",
    level: "Intermediate",
    summary: "A material service provider suffers a major outage. Apply CPS 230 business continuity, notification and third-party thinking.",
    setting: "You are the Head of Operational Risk at an APRA-regulated super fund. Member administration is a critical operation, provided by an external administrator. The board-approved tolerance for this operation includes a maximum period of disruption to benefit payments.",
    steps: [
      { id: "s1",
        text: "8:30 am. The administrator reports that its core platform is down after a suspected cyber attack. Members can't log in, and benefit payments due today can't be processed. What is your first move?",
        choices: [
          { label: "Invoke the incident management and business continuity plans, stand up the crisis team, and get the administrator's recovery estimate and current status.", quality: "best",
            feedback: "Right. Pre-agreed plans and a clear command structure save time. You need facts on impact and recovery time to compare against tolerance." },
          { label: "Wait an hour to see if the administrator fixes it before escalating.", quality: "poor",
            feedback: "Early escalation is cheap and delay is expensive. Some notification clocks may already be running, and members are affected now." },
          { label: "Tell members on social media that the fund has been hacked.", quality: "poor",
            feedback: "Communication matters, but it needs to be accurate, coordinated and approved. Speculating about a cyber attack before the facts are known can cause harm and confusion." }
        ] },
      { id: "s2",
        text: "The administrator confirms unauthorised access to its systems and can't yet say whether member data was taken. Recovery is estimated at 3 to 5 days. Which notifications should you be considering?",
        choices: [
          { label: "APRA under CPS 234 (a material information security incident: as soon as possible, and no later than 72 hours) and under CPS 230. Also assess possible notifiable data breaches under the Privacy Act, and any ASIC reportable situation.", quality: "best",
            feedback: "One event can trigger several regimes. Map them all early, record the awareness time, and remember CPS 234 covers information assets managed by third parties." },
          { label: "None yet. It's the administrator's incident, not ours.", quality: "poor",
            feedback: "The fund's information assets and critical operation are affected. The fund keeps its own notification obligations when a service provider is involved." },
          { label: "Only the OAIC, because it might be a data breach.", quality: "ok",
            feedback: "Privacy notification may be needed, but APRA notification obligations under CPS 234 and CPS 230 are likely to be triggered on a shorter timeframe." }
        ] },
      { id: "s3",
        text: "Day 2. Recovery estimates are slipping. Benefit payments will clearly be delayed beyond the board-approved tolerance level. What does CPS 230 expect?",
        choices: [
          { label: "Notify APRA within 24 hours of the disruption going outside tolerance, run the continuity plan's workarounds (for example, manual processing of urgent hardship and death benefit payments), and keep the board informed.", quality: "best",
            feedback: "Correct. Disruption to a critical operation outside tolerance has a 24-hour notification. A credible plan should also include workarounds that prioritise the most vulnerable members." },
          { label: "Change the tolerance level to 7 days so the disruption is back within tolerance.", quality: "poor",
            feedback: "Tolerance levels are board-approved and set in advance for a reason. Moving the goalposts mid-incident defeats the purpose and would concern APRA." },
          { label: "Wait until service is restored and report everything together.", quality: "poor",
            feedback: "Operating outside tolerance has its own short notification timeframe. Waiting would breach it." }
        ] },
      { id: "s4",
        text: "Members are calling the fund's contact centre in large numbers. What communication approach is best?",
        choices: [
          { label: "Give regular, plain-English updates on the website, by SMS and email, and through the contact centre. Say what happened, what members can do, how urgent payments will be handled, and how to spot scams that exploit the outage.", quality: "best",
            feedback: "Clear, regular and honest updates reduce harm and complaints. Scam warnings matter: criminals often exploit high-profile incidents." },
          { label: "Say nothing until everything is fixed, to avoid alarming members.", quality: "poor",
            feedback: "Silence increases anxiety, complaints and the risk of members falling for scams, and may breach disclosure obligations." },
          { label: "Tell members everything is fine and payments will arrive tomorrow.", quality: "poor",
            feedback: "Over-promising when recovery is uncertain is misleading and damages trust when the date is missed." }
        ] },
      { id: "s5",
        text: "Day 6. Systems are restored and no evidence of data theft is found. What should the post-incident phase cover?",
        choices: [
          { label: "An independent post-incident review, remediation for members harmed by delays, updates to the risk profile, a reassessment of the provider arrangement (including contract rights, testing and exit options), and reporting to the board.", quality: "best",
            feedback: "Recovery isn't the end. CPS 230 expects entities to learn from incidents, test and update plans, and manage material service provider risk, including credible exit or contingency options." },
          { label: "Switch administrators immediately.", quality: "ok",
            feedback: "It may eventually be right, but a rushed transition creates its own major risks. Decide based on the review, and use the exit plan properly." },
          { label: "Send the administrator a strongly worded letter and move on.", quality: "poor",
            feedback: "Accountability stays with the fund. It needs evidence that the risk is now better managed, not just a letter." }
        ] },
      { id: "end", ending: true,
        text: "The fund came through the outage. Member harm was limited, regulators were notified on time, and the lessons are feeding into stronger resilience.",
        learn: [
          { label: "CPS 230 Operational Risk Management", href: "/standards/cps-230.html" },
          { label: "Business continuity", href: "/risk-management/business-continuity.html" },
          { label: "Third-party risk", href: "/risk-management/third-party-risk.html" },
          { label: "CPS 234 Information Security", href: "/standards/cps-234.html" }
        ] }
    ]
  },
  {
    id: "whistleblower",
    title: "An uncomfortable email",
    level: "Intermediate",
    summary: "An employee raises concerns about complaint records. Handle a whistleblower disclosure and the misconduct behind it.",
    setting: "You are the Head of Compliance (a senior manager) at a financial services company that is an AFS licensee.",
    steps: [
      { id: "s1",
        text: "An employee emails you privately. They say their team leader has been changing the \"received\" dates on complaints so that responses appear to meet the IDR timeframes. They ask you not to tell anyone they raised it. What is your first step?",
        choices: [
          { label: "Treat it as a possible protected whistleblower disclosure. Acknowledge it, explain how confidentiality and protection work under the company's whistleblower policy, and keep their identity confidential.", quality: "best",
            feedback: "Misconduct or an improper state of affairs, reported to a senior manager (an eligible recipient), may qualify for protection. Identity confidentiality is a legal obligation, not just good manners." },
          { label: "Forward the email to the team leader's manager and ask them to look into it.", quality: "poor",
            feedback: "This could reveal the whistleblower's identity without consent, which can be unlawful, and puts the investigation in the hands of people who may be conflicted." },
          { label: "Tell the employee it's an HR matter and to raise it with their manager.", quality: "poor",
            feedback: "This isn't a personal work-related grievance. It concerns possible misconduct affecting customers and regulatory reporting. Deflecting it misses the protections and the underlying risk." }
        ] },
      { id: "s2",
        text: "How should the allegation be investigated?",
        choices: [
          { label: "Appoint an independent investigator outside the team leader's reporting line. Preserve evidence, such as system audit logs of date changes, and plan how to protect the whistleblower from detriment.", quality: "best",
            feedback: "Independence, evidence and protection from detriment are the pillars of a sound investigation. System audit trails are often decisive for data alteration allegations." },
          { label: "Interview the team leader first and ask them directly whether they did it.", quality: "poor",
            feedback: "Going to the subject first can lead to evidence being destroyed, and may point to who raised the concern." },
          { label: "Ask the whistleblower to gather more evidence by copying records secretly.", quality: "poor",
            feedback: "Asking a whistleblower to investigate puts them at risk and can compromise the evidence. The organisation should investigate." }
        ] },
      { id: "s3",
        text: "Audit logs confirm that received dates were changed on about 250 complaints over 9 months. Beyond the conduct issue, what compliance questions does this raise?",
        choices: [
          { label: "Whether the IDR standards in RG 271 (including enforceable timeframes) and IDR data reporting to ASIC were breached, whether that is a reportable situation, and whether any customers were harmed and need remediation.", quality: "best",
            feedback: "The underlying conduct may breach enforceable IDR requirements and lead to inaccurate data reported to ASIC. Run a breach assessment, and check whether delayed complaints caused customer detriment." },
          { label: "None. It's an internal HR conduct matter only.", quality: "poor",
            feedback: "Falsifying complaint records can breach regulatory requirements and distort reported data. It is a compliance matter as well as a conduct matter." },
          { label: "Only whether the team leader should be dismissed.", quality: "ok",
            feedback: "Consequences for the individual matter, but so do regulatory reporting, customer harm and why controls didn't detect the changes." }
        ] },
      { id: "s4",
        text: "What should happen with the whistleblower and the organisation's controls?",
        choices: [
          { label: "Give the whistleblower appropriate feedback on progress and outcome (within confidentiality limits) and monitor for detriment. Fix the control gap, for example by locking received dates and reviewing audit logs, and report themes to the board.", quality: "best",
            feedback: "Closing the loop builds trust in speaking up. Fixing the control gap addresses the root cause, and board reporting supports oversight of culture." },
          { label: "Nothing more for the whistleblower. The matter is closed.", quality: "poor",
            feedback: "No feedback, and no monitoring for detriment, discourages future reports and risks them being victimised." },
          { label: "Publicly thank the whistleblower by name at the next town hall.", quality: "poor",
            feedback: "Well meant, but revealing their identity without consent may breach the confidentiality protections." }
        ] },
      { id: "end", ending: true,
        text: "The disclosure was protected, the misconduct investigated and addressed, customers checked for harm, and controls strengthened.",
        learn: [
          { label: "Whistleblower protections", href: "/governance/whistleblower-protections.html" },
          { label: "RG 271 Internal dispute resolution", href: "/standards/asic-rg-271.html" },
          { label: "Culture and conduct risk", href: "/governance/culture-and-conduct.html" },
          { label: "Breach and incident reporting obligations", href: "/compliance/breach-reporting.html" }
        ] }
    ]
  }
];
