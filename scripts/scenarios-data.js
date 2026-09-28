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
            feedback: "There is no general dollar threshold. Significance is assessed against the legal tests, and many small losses across many members can be material. (ASIC relief removes the need to report some minor breaches affecting only a few customers, but it wouldn't cover losses across 3,000 members.)" },
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
  },
  {
    id: "privacy-breach",
    title: "The spreadsheet sent to the wrong person",
    level: "Intermediate",
    summary: "Member data goes to the wrong email address. Contain it, assess it under the Notifiable Data Breaches scheme and decide who to tell.",
    setting: "You are the Privacy Officer at an APRA-regulated super fund. The fund is covered by the Privacy Act 1988 and CPS 234.",
    steps: [
      { id: "s1",
        text: "3 pm Thursday. A member services officer tells you they emailed a spreadsheet to a personal Gmail address instead of an employer contact with a similar name. It holds 1,200 members' names, dates of birth, tax file numbers and account balances. What do you do first?",
        choices: [
          { label: "Contain it: try to recall the email, contact the recipient to ask them to delete it and confirm in writing, and record the time the fund became aware. Start the data breach response plan.", quality: "best",
            feedback: "Right. Containment comes first because quick action can reduce, or even prevent, harm. Recording the awareness time matters because assessment and notification timeframes run from it." },
          { label: "Tell the officer not to worry. It was an honest mistake and one email is unlikely to matter.", quality: "poor",
            feedback: "Intent doesn't decide whether a breach is notifiable. Tax file numbers and dates of birth are exactly the data used for identity fraud. The fund must assess it." },
          { label: "Email all 1,200 members straight away to tell them their data was exposed.", quality: "ok",
            feedback: "Transparency is good, but acting before containment and assessment can cause unnecessary alarm and get the facts wrong. Contain first, assess quickly, then notify with accurate information and practical steps." }
        ] },
      { id: "s2",
        text: "The recipient hasn't responded to two emails or a phone message. The recall failed. How do you assess whether this is an eligible data breach?",
        choices: [
          { label: "Ask whether the unauthorised disclosure is likely to result in serious harm to any affected individual, considering the sensitivity of the data (TFNs, dates of birth, balances), who holds it, and whether remedial action has prevented the likely harm. Document the assessment.", quality: "best",
            feedback: "That is the test. Because the recipient is unknown and unresponsive, remedial action hasn't removed the risk, and TFNs with dates of birth create a real risk of identity fraud. Serious harm is likely, so this looks like an eligible data breach." },
          { label: "It's only notifiable if you have evidence the data has been misused.", quality: "poor",
            feedback: "The test is whether serious harm is likely, not whether misuse has been proven. Waiting for evidence of fraud defeats the purpose of the scheme." },
          { label: "Take the full 30 days to assess, since the Act allows it.", quality: "ok",
            feedback: "The 30-day period is a maximum for assessing a suspected breach, not a target. Here the facts are clear enough to conclude quickly, and delay leaves members exposed." }
        ] },
      { id: "s3",
        text: "You conclude it is an eligible data breach. Who needs to be notified?",
        choices: [
          { label: "Notify the OAIC and the affected members as soon as practicable, with what happened, the data involved and steps they can take. Also consider whether it is a material information security incident that must be notified to APRA under CPS 234 within 72 hours, and brief the executive and board.", quality: "best",
            feedback: "Good. The Notifiable Data Breaches scheme requires notice to the OAIC and affected individuals. An APRA-regulated entity also needs to consider its CPS 234 notification obligations, which have their own tests and timeframes." },
          { label: "Notify the OAIC only. Telling members would damage the fund's reputation.", quality: "poor",
            feedback: "For an eligible data breach, affected individuals must also be notified so they can protect themselves. Reputation is not a reason to withhold notice." },
          { label: "Notify only the members, since they are the ones at risk.", quality: "poor",
            feedback: "The OAIC must be notified too, through a statement about the breach." }
        ] },
      { id: "s4",
        text: "The notifications are made. What should the fund do to support members and prevent a repeat?",
        choices: [
          { label: "Offer practical support (for example, extra identity checks on affected accounts and guidance on protecting themselves), watch affected accounts for suspicious changes and withdrawals, and fix the root cause: block sending member data files to personal email domains, use secure file transfer, and retrain staff.", quality: "best",
            feedback: "Monitoring affected accounts guards against fraudulent withdrawals, a real risk for super. Technical controls such as data loss prevention address the cause better than training alone." },
          { label: "Discipline the officer and close the matter.", quality: "poor",
            feedback: "Blaming one person doesn't fix the process that let a file of TFNs be emailed externally. It also discourages staff from reporting mistakes quickly, which was what made containment possible." },
          { label: "Send a reminder email to all staff about double-checking addresses.", quality: "ok",
            feedback: "Helpful, but reminders are weak controls. Pair them with technical controls and account monitoring." }
        ] },
      { id: "end", ending: true,
        text: "The breach was contained as far as possible, assessed promptly, notified to the OAIC, members and (where required) APRA, and the root cause fixed.",
        learn: [
          { label: "Privacy law", href: "/compliance/privacy-law.html" },
          { label: "CPS 234 Information security", href: "/standards/cps-234.html" },
          { label: "Breach and incident reporting obligations", href: "/compliance/breach-reporting.html" },
          { label: "Optus and Medibank data breaches", href: "/case-studies/optus-medibank-data-breaches.html" }
        ] }
    ]
  },
  {
    id: "marketing-review",
    title: "The campaign that promised too much",
    level: "Intermediate",
    summary: "Marketing wants sign-off on a new super campaign by tomorrow. Review it for misleading claims and target market issues.",
    setting: "You are a Compliance Adviser at a super fund. All member communications and advertising must be reviewed by Compliance before release.",
    steps: [
      { id: "s1",
        text: "Marketing sends a social media ad for review: \"Australia's top performing fund! 11.2% returns. Join today and your money grows faster.\" The 11.2% was the Balanced option's return in one strong year. They need sign-off by tomorrow. What is your first concern?",
        choices: [
          { label: "The claims may be misleading: \"top performing\" needs a clear, current basis (which survey, category and period), a single year's return is highlighted without context, and \"your money grows faster\" implies a guaranteed future outcome.", quality: "best",
            feedback: "Right. Misleading or deceptive conduct is prohibited, and ASIC's RG 234 good practice guidance warns against selective past performance, unqualified \"best\" claims and implied promises about future returns." },
          { label: "The font size of the disclaimer.", quality: "poor",
            feedback: "Disclaimers matter, but they can't fix a misleading headline. ASIC's guidance is that the overall impression of an ad must be accurate, and fine print can't correct a misleading main message." },
          { label: "Nothing. All the numbers are true.", quality: "poor",
            feedback: "A statement can be literally true and still misleading if it creates a false overall impression, for example by cherry-picking one strong year." }
        ] },
      { id: "s2",
        text: "Marketing pushes back: \"Everyone uses 'top performing'. Can't you just add 'past performance is not a reliable indicator of future performance' at the bottom?\" How do you respond?",
        choices: [
          { label: "Explain that the warning helps but doesn't cure a misleading headline. Suggest alternatives: show returns over a longer period that matches the option's objective, compare fairly and name the source and date of any ranking, and remove the promise about growth.", quality: "best",
            feedback: "Offering workable alternatives keeps the relationship constructive and gets to a compliant ad. Longer-term, balanced performance information is more meaningful for a long-term product like super." },
          { label: "Approve it with the warning added, to meet the deadline.", quality: "poor",
            feedback: "Deadline pressure is a classic reason for poor sign-offs. If the ad is misleading, the warning doesn't make it compliant." },
          { label: "Refuse to review anything else from Marketing until they complete compliance training.", quality: "poor",
            feedback: "That escalates conflict without solving the problem. Compliance works best when it helps the business get to a compliant outcome." }
        ] },
      { id: "s3",
        text: "The revised ad is better. Marketing now plans to target it at people aged 18 to 25 through a gaming platform, with a \"switch in two minutes\" button. What else should you consider?",
        choices: [
          { label: "Whether the targeting is consistent with the product's design and distribution obligations (target market determination), whether a \"switch now\" prompt without information about insurance and fees could cause harm, and whether the ad is balanced for that audience.", quality: "best",
            feedback: "Good. Advertising is part of distribution. Encouraging quick switches without prompting people to check insurance and fees in their current fund could lead to poor outcomes, especially for younger members." },
          { label: "Nothing else. Compliance reviews content, not targeting.", quality: "poor",
            feedback: "How and to whom an ad is distributed can create compliance issues too, including under the design and distribution obligations." },
          { label: "Ban advertising to young people entirely.", quality: "ok",
            feedback: "There is no general ban, and young people also benefit from choosing a good fund. The question is whether the targeting and message are appropriate." }
        ] },
      { id: "s4",
        text: "The final version is approved. What records should you keep?",
        choices: [
          { label: "The final approved version, the evidence behind every claim (data sources and dates), the review comments and changes, the approval date and approver, and the intended channels and audience. Set a review or expiry date for time-sensitive claims.", quality: "best",
            feedback: "Good records show how the fund met its obligations and let it withdraw or update ads when the underlying data changes, for example when a ranking becomes out of date." },
          { label: "Just the approval email.", quality: "ok",
            feedback: "Better than nothing, but without the evidence for each claim it's hard to show the review was meaningful or to update the ad later." },
          { label: "No records. The ad is public, so anyone can see it.", quality: "poor",
            feedback: "The public ad doesn't show why claims were considered accurate or who approved them." }
        ] },
      { id: "end", ending: true,
        text: "The campaign went out with accurate, balanced claims, appropriate targeting and a clear audit trail.",
        learn: [
          { label: "Disclosure obligations", href: "/compliance/disclosure-obligations.html" },
          { label: "Consumer protection", href: "/compliance/consumer-protection.html" },
          { label: "RG 274 Design and distribution obligations", href: "/standards/asic-rg-274.html" },
          { label: "Superannuation", href: "/sectors/superannuation.html" }
        ] }
    ]
  },
  {
    id: "related-party",
    title: "The director's other company",
    level: "Advanced",
    summary: "A super trustee is choosing a new technology provider, and one bidder is linked to a director. Manage the conflict.",
    setting: "You are the Company Secretary and Head of Governance at a super fund trustee. The trustee has a conflicts management policy and a register of relevant duties and interests, as SPS 521 requires.",
    steps: [
      { id: "s1",
        text: "A tender for a new member portal has three bidders. Reading the shortlist, you notice one bidder's chair is married to a trustee director, who sits on the committee choosing the provider. The director hasn't mentioned it. What do you do?",
        choices: [
          { label: "Raise it with the director and the Board Chair promptly and privately, check the register of interests, and make sure the interest is formally disclosed before the committee considers the bids.", quality: "best",
            feedback: "Right. Conflicts should be identified, disclosed and recorded before decisions are made. Raising it privately first is fair to the director, who may simply not have realised." },
          { label: "Say nothing. The director is experienced and will act properly.", quality: "poor",
            feedback: "Good character doesn't remove a conflict. The trustee must be able to show the conflict was identified and managed, and the members' interests given priority." },
          { label: "Remove that bidder from the tender to avoid any appearance of a conflict.", quality: "ok",
            feedback: "Cautious, but excluding a bidder that might be best for members could itself fail members. A conflict usually needs to be managed, not avoided at any cost." }
        ] },
      { id: "s2",
        text: "The director discloses the interest. How should the conflict be managed in the selection process?",
        choices: [
          { label: "Record it in the register, have the director leave the room and not receive bid papers or vote on this decision, and document the arrangements in the minutes. Apply the same objective criteria to all bidders.", quality: "best",
            feedback: "Good. Separating the conflicted person from the decision is a common and effective control. The minutes are the evidence that it happened." },
          { label: "Let the director stay and vote, since they've disclosed it.", quality: "poor",
            feedback: "Disclosure alone is usually not enough for a significant conflict. The conflicted director should not influence the decision." },
          { label: "Let the director stay for the discussion but not vote.", quality: "ok",
            feedback: "Better, but a director present in the discussion can still influence colleagues. Stepping out of both is the stronger control." }
        ] },
      { id: "s3",
        text: "The linked company scores highest on the evaluation. Some directors are uncomfortable. What gives the board confidence the decision is in members' best interests?",
        choices: [
          { label: "Evidence that the process was arm's length: pre-set criteria, independent scoring, price benchmarked against the other bids and the market, and due diligence as for any material service provider. If it's still the best option for members, it can be chosen, with the reasoning documented.", quality: "best",
            feedback: "A related party isn't automatically disqualified. The question is whether the terms are at least as good as arm's length and in members' best financial interests. Strong evidence protects both the members and the board." },
          { label: "Choose the second-ranked bidder to avoid criticism.", quality: "poor",
            feedback: "Deliberately choosing a worse option for members to protect the board's reputation puts the board's interests ahead of members'." },
          { label: "Ask the conflicted director what they think of the other bidders.", quality: "poor",
            feedback: "That would undo the conflict controls. The director should have no role in this decision." }
        ] },
      { id: "s4",
        text: "The contract is signed with the linked company. What ongoing controls are needed?",
        choices: [
          { label: "Keep the conflicted director out of decisions about this contract (renewals, disputes, performance issues), have independent staff monitor performance, review the register regularly, and consider disclosing the relationship where the law or good practice requires.", quality: "best",
            feedback: "A conflict doesn't end when the contract is signed. Renewals and disputes are also points where influence could matter." },
          { label: "None. The conflict was managed at the tender.", quality: "poor",
            feedback: "The relationship continues for the life of the contract, and so does the conflict." },
          { label: "Ask the director to resign.", quality: "ok",
            feedback: "Rarely necessary where the conflict can be managed. It may be appropriate if conflicts are frequent or so significant that the director can't do the role." }
        ] },
      { id: "end", ending: true,
        text: "The conflict was disclosed, the director separated from the decision, and the choice made on evidence in members' best interests.",
        learn: [
          { label: "Conflicts of interest", href: "/governance/conflicts-of-interest.html" },
          { label: "Superannuation", href: "/sectors/superannuation.html" },
          { label: "Third-party and outsourcing risk", href: "/risk-management/third-party-risk.html" },
          { label: "Board structure and accountability", href: "/governance/board-structure-and-accountability.html" }
        ] }
    ]
  },
  {
    id: "tolerance-breach",
    title: "The payments that didn't go out",
    level: "Advanced",
    summary: "A failed payment run pushes a critical operation towards its tolerance level. Manage the disruption and the CPS 230 obligations.",
    setting: "You are the Chief Risk Officer of an APRA-regulated super fund. Paying benefits is a critical operation. The board has approved a tolerance level of no more than 2 business days' delay to benefit payments, affecting no more than 500 members.",
    steps: [
      { id: "s1",
        text: "Tuesday 9 am. The overnight payment file failed after a software update. About 1,800 benefit payments, including hardship and death benefit payments, did not go out. IT expects a fix \"later this week\". What do you do?",
        choices: [
          { label: "Treat it as a disruption to a critical operation: invoke the business continuity plan, compare the impact against the tolerance level now (1,800 members already exceeds the 500-member limit), and escalate to the CEO and the Board Risk Committee chair.", quality: "best",
            feedback: "Right. The member-numbers dimension of the tolerance is already exceeded, even though the time dimension hasn't been reached yet. Tolerance levels exist so this is clear early." },
          { label: "Wait until Thursday. The tolerance is 2 business days, so there's still time.", quality: "poor",
            feedback: "The tolerance has more than one dimension. The number of members affected is already outside it. Waiting also wastes time you could spend on workarounds." },
          { label: "Leave it to IT. It's a technology problem.", quality: "poor",
            feedback: "The critical operation is paying members, not the software. Risk, operations and communications all have roles, and the board-approved tolerance must be managed." }
        ] },
      { id: "s2",
        text: "The disruption is outside tolerance. What about APRA?",
        choices: [
          { label: "Notify APRA within the CPS 230 timeframe for a disruption to a critical operation outside tolerance (24 hours), with what is known, and keep APRA updated. Also assess whether it is a material operational risk incident and any breach reporting obligations.", quality: "best",
            feedback: "Correct. The notification timeframe is short so APRA hears early. Notify on what is known and update as facts develop, then assess the other regimes that may apply." },
          { label: "Notify APRA after the fix, so the report is complete.", quality: "poor",
            feedback: "That would likely miss the notification deadline. Early notification with updates is expected." },
          { label: "Only notify APRA if the payments are still stuck after 2 business days.", quality: "poor",
            feedback: "The tolerance was breached on member numbers, not just time. Notification is tied to being outside tolerance on any dimension." }
        ] },
      { id: "s3",
        text: "The business continuity plan includes a manual payment workaround, but it can only handle about 150 payments a day. How do you use it?",
        choices: [
          { label: "Prioritise by member harm: hardship, terminal illness and death benefit payments first, then members who have told you of urgent need. Communicate proactively with all affected members about timing and what the fund will do about any costs caused by the delay.", quality: "best",
            feedback: "Prioritising by harm is what tolerance-setting is about. Proactive communication reduces distress and complaints, and a commitment to cover costs caused by the delay supports fair outcomes." },
          { label: "Process payments in the order they were due.", quality: "ok",
            feedback: "Fair on its face, but it ignores that some members face much greater harm from delay than others." },
          { label: "Don't use the workaround. Manual payments increase the risk of error.", quality: "poor",
            feedback: "Manual workarounds do carry risk, which is why they need checks. Refusing to use a planned workaround leaves vulnerable members without money." }
        ] },
      { id: "s4",
        text: "Payments are restored on Friday. At the post-incident review, a manager suggests raising the tolerance to 2,000 members \"to be realistic\". What is your view?",
        choices: [
          { label: "Tolerance levels should reflect the point at which harm to members becomes unacceptable, not what the fund can currently achieve. Keep the tolerance unless the harm analysis supports a change, and fix the capability gap instead: change testing, rollback plans and a bigger manual capacity.", quality: "best",
            feedback: "Right. Moving the tolerance to fit a failure is moving the goalposts. CPS 230 expects entities to build the capability to stay within tolerance and to test it." },
          { label: "Agree. The current tolerance is clearly unachievable.", quality: "poor",
            feedback: "If tolerance is set by what's easy rather than by harm, it stops protecting members. Any change must come from a genuine reassessment of harm and be approved by the board." },
          { label: "Lower the tolerance to 100 members to show the fund takes it seriously.", quality: "ok",
            feedback: "Tightening can be right if the harm analysis supports it, but changes should be evidence-based, not symbolic." }
        ] },
      { id: "end", ending: true,
        text: "Members were prioritised by harm, APRA was notified on time, and the fund fixed its capability rather than its tolerance.",
        learn: [
          { label: "Setting CPS 230 tolerance levels", href: "/risk-management/setting-cps-230-tolerance-levels.html" },
          { label: "CPS 230 Operational risk management", href: "/standards/cps-230.html" },
          { label: "Business continuity", href: "/risk-management/business-continuity.html" },
          { label: "Change, project and reputational risk", href: "/risk-management/change-project-and-reputational-risk.html" }
        ] }
    ]
  },
  {
    id: "aml-suspicion",
    title: "The deposits just under $10,000",
    level: "Intermediate",
    summary: "A branch notices a pattern of cash deposits. Work through escalation, suspicious matter reporting and tipping off.",
    setting: "You are the AML/CTF Compliance Officer at a mutual bank, which is a reporting entity under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006.",
    steps: [
      { id: "s1",
        text: "A branch manager calls. A customer has made seven cash deposits of $9,000 to $9,800 at different branches over two weeks. When a teller asked about the source of funds, the customer became evasive. What should the branch do?",
        choices: [
          { label: "Escalate internally through the bank's unusual activity process straight away, record the facts observed, and not question the customer further or mention reporting.", quality: "best",
            feedback: "Right. Front-line staff escalate; the AML team assesses. Deposits kept just under the $10,000 cash reporting threshold are a classic sign of structuring." },
          { label: "Ask the customer directly whether they are trying to avoid the $10,000 reporting rule.", quality: "poor",
            feedback: "That risks tipping off the customer, and it isn't the teller's role to investigate. Escalate instead." },
          { label: "Refuse any further deposits from the customer.", quality: "ok",
            feedback: "Decisions about the relationship should be made by the AML team after assessment. Acting alone at the branch could also tip off the customer." }
        ] },
      { id: "s2",
        text: "Your team reviews the account. The deposits don't match the customer's stated occupation and are moved out within days to several third parties. Do you have to report?",
        choices: [
          { label: "Yes. If you form a suspicion on reasonable grounds, lodge a suspicious matter report (SMR) with AUSTRAC within 3 business days of forming it. Record how and when the suspicion was formed.", quality: "best",
            feedback: "Correct. The test is reasonable grounds for suspicion, not proof. The clock runs from when the suspicion is formed, so record the date and the reasoning." },
          { label: "No. None of the deposits were $10,000 or more, so there's nothing to report.", quality: "poor",
            feedback: "Threshold transaction reports and suspicious matter reports are separate obligations. Structuring to avoid the threshold is itself a reason for suspicion, and structuring is an offence." },
          { label: "Only after the bank has proof the money came from crime.", quality: "poor",
            feedback: "Reporting entities report suspicions. Investigating and proving crime is for law enforcement." }
        ] },
      { id: "s3",
        text: "The SMR is lodged. The customer calls the branch asking why their last deposit was \"questioned\". What can staff say?",
        choices: [
          { label: "Handle it normally without mentioning the report or the suspicion, for example by explaining that the bank asks about the source of funds as part of its standard checks. Tell the AML team about the call.", quality: "best",
            feedback: "Right. Disclosing that an SMR has been made, or information from which that could be inferred, can be a tipping-off offence. Routine customer due diligence explanations are fine." },
          { label: "Reassure the customer that the bank has reported it to AUSTRAC, so everything will be sorted out properly.", quality: "poor",
            feedback: "That would be tipping off, which is an offence." },
          { label: "Refuse to speak to the customer at all.", quality: "ok",
            feedback: "Avoids tipping off, but an unusual refusal could itself alert the customer. Normal service with care is better." }
        ] },
      { id: "s4",
        text: "What should happen with the customer relationship and the bank's controls?",
        choices: [
          { label: "Apply enhanced customer due diligence, update the customer's risk rating, decide under the bank's policy whether to continue the relationship, consider further SMRs for new suspicious activity, and check whether transaction monitoring should have flagged the pattern earlier.", quality: "best",
            feedback: "An SMR isn't the end. Ongoing due diligence, a documented relationship decision and a look at why monitoring didn't catch it all strengthen the program." },
          { label: "Close the account immediately and tell the customer why.", quality: "poor",
            feedback: "Exiting may be appropriate, but explaining that it's because of suspected money laundering would be tipping off." },
          { label: "Nothing more. AUSTRAC will take it from here.", quality: "poor",
            feedback: "The bank keeps its own obligations, including ongoing customer due diligence and reporting any further suspicious matters." }
        ] },
      { id: "end", ending: true,
        text: "The suspicion was escalated, reported to AUSTRAC on time without tipping off the customer, and the bank's monitoring improved.",
        learn: [
          { label: "AML/CTF fundamentals", href: "/compliance/aml-ctf-fundamentals.html" },
          { label: "AUSTRAC v CBA and Westpac", href: "/case-studies/austrac-cba-westpac.html" },
          { label: "Sanctions compliance", href: "/compliance/sanctions-compliance.html" },
          { label: "Fraud risk", href: "/risk-management/fraud-risk.html" }
        ] }
    ]
  },
  {
    id: "advice-review",
    title: "The file that didn't add up",
    level: "Advanced",
    summary: "A routine review of a financial adviser's file finds a problem rollover. Assess the advice, the client harm and what the licensee must do.",
    setting: "You are the Head of Advice Assurance at an Australian financial services licensee that provides personal advice to retail clients.",
    steps: [
      { id: "s1",
        text: "Reviewing a sample of files, you find advice to a 58-year-old client to roll her super from an industry fund into a platform the adviser often uses. The new product has higher fees, and her existing insurance cover lapsed. The statement of advice says the switch gives \"more investment choice\", but her fact find shows no interest in choosing investments. What are the main concerns?",
        choices: [
          { label: "Whether the adviser met the best interests duty and the appropriate advice requirement: the file doesn't show why the switch was better for her given higher fees and lost insurance. Also check that the replacement product disclosure covered the costs and lost benefits, and whether there was a conflict.", quality: "best",
            feedback: "Right. The file needs to show the client's needs, the reasonable investigation of her existing product and why the new one leaves her better off. Loss of insurance is a significant harm to consider." },
          { label: "The statement of advice is well formatted and signed, so it passes.", quality: "poor",
            feedback: "Form isn't substance. A file review tests whether the advice was in the client's best interests and appropriate, not only whether documents exist." },
          { label: "The client signed an authority to proceed, so she accepted the risks.", quality: "poor",
            feedback: "A client's signature doesn't make inappropriate advice compliant. The duties sit with the adviser and the licensee." }
        ] },
      { id: "s2",
        text: "The adviser says the client \"wanted a change\" but there's no record of that. What do you conclude about the file?",
        choices: [
          { label: "Rate it as non-compliant: the advice isn't supported by the file, and the client appears to have been harmed through higher fees and lost insurance. Log it as a potential breach and start an assessment.", quality: "best",
            feedback: "Good. File reviews rely on evidence. An undocumented reason can't support the advice, and possible client harm means this goes into the breach process." },
          { label: "Accept the adviser's explanation and rate it as compliant with a note to improve record keeping.", quality: "poor",
            feedback: "That treats a possible best interests failure and client harm as an admin issue. The explanation also doesn't address the lost insurance or higher fees." },
          { label: "Rate it as needing improvement and move on to the next file.", quality: "ok",
            feedback: "Softer ratings often hide serious issues. With apparent client harm, it needs a breach assessment and remediation consideration." }
        ] },
      { id: "s3",
        text: "You're concerned this may not be a one-off. What next?",
        choices: [
          { label: "Extend the review: look at more of this adviser's files, especially other rollovers into the same platform. Assess whether there is a significant breach to report to ASIC as a reportable situation, and plan remediation for affected clients.", quality: "best",
            feedback: "Right. One bad file can signal a pattern. A targeted lookback finds the extent, supports the breach assessment and identifies every client needing remediation." },
          { label: "Deal with this one client and keep the lookback quiet to avoid alarming the adviser.", quality: "poor",
            feedback: "If there's a pattern, other clients are harmed too. The licensee must understand the extent of the problem." },
          { label: "Terminate the adviser immediately.", quality: "ok",
            feedback: "Consequences may follow, but first establish the facts. Supervision, restrictions or pre-vetting of the adviser's advice can protect clients while you investigate." }
        ] },
      { id: "s4",
        text: "The lookback finds 14 similar rollovers. What does good remediation and closure look like?",
        choices: [
          { label: "Remediate every affected client in line with RG 277 (fee differences with earnings and, where insurance was lost, addressing that harm), report to ASIC as required, apply consequences to the adviser under the licensee's framework, and strengthen controls such as pre-vetting of rollover advice and conflict checks on product recommendations.", quality: "best",
            feedback: "A complete response covers the clients, the regulator, the individual and the system. Lost insurance can be the most serious harm, so the remediation needs to deal with it specifically." },
          { label: "Refund the extra fees and close it.", quality: "ok",
            feedback: "A start, but it ignores lost earnings, the insurance harm and the control failures that let 14 rollovers through." },
          { label: "Ask the platform provider to pay the remediation, since it gained from the rollovers.", quality: "poor",
            feedback: "The licensee is responsible for its advisers' advice. Any cost-recovery arrangement shouldn't delay remediating clients." }
        ] },
      { id: "end", ending: true,
        text: "The advice failures were found, their extent measured, affected clients remediated, ASIC informed and the controls strengthened.",
        learn: [
          { label: "Financial advice regulation", href: "/compliance/financial-advice-regulation.html" },
          { label: "Financial advice licensees", href: "/sectors/financial-advice-licensees.html" },
          { label: "RG 277 Consumer remediation", href: "/standards/asic-rg-277.html" },
          { label: "Breach significance analysis", href: "/compliance/breach-significance-analysis.html" }
        ] }
    ]
  }
];
