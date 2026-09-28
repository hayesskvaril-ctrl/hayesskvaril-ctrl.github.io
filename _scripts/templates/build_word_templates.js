// Builds two Word templates:
//   assets/templates/example-risk-appetite-statement.docx  (fictional super fund, worked example)
//   assets/templates/board-risk-report-template.docx
// Run from the repo root:  DOCX_MODULE=/path/to/node_modules/docx node _scripts/templates/build_word_templates.js
const { D, run, p, hint, h1, h2, bullet, gap, fieldTable, grid, blanks, save, NAVY } = require('./docx_common');
const { Paragraph } = D;

const title = (t, sub) => [
  new Paragraph({ spacing: { after: 60 }, children: [run(t, { bold: true, size: 40, color: NAVY })] }),
  new Paragraph({ spacing: { after: 200 }, children: [run(sub, { italics: true, color: '4A5568', size: 18 })] }),
];
const notice = (text) => grid(['Read this first'], [9638], [[text]]);

// ------------------------------------------------------------------ Risk appetite statement (example)
const M = [4000, 1880, 1879, 1879]; // metric table widths
const metrics = (rows) => grid(['Metric', 'Within appetite (green)', 'Trigger (amber)', 'Limit (red)'], M, rows);
function riskArea(name, level, statement, rows, notes) {
  const out = [h2(name), p(`Appetite: ${level}`, { run: { bold: true } }), p(statement)];
  if (notes) out.push(hint(notes));
  out.push(metrics(rows), gap());
  return out;
}

const ras = [
  ...title('Risk appetite statement', 'Harbourside Super (a fictional fund) · Example for learning · Template version 1.0 (September 2026)'),
  notice('This is a fictional, simplified example written for education by RiskLens Australia. Harbourside Super does not exist. The metrics and thresholds are illustrative, not benchmarks or recommendations. A real statement must be built from the organisation\'s own strategy, risk profile, data and obligations (for APRA-regulated super trustees, including SPS 220 Risk Management) and approved by its board. Background: https://hayesskvaril-ctrl.github.io/risk-management/risk-appetite-and-tolerance.html'),

  h1('1. Purpose'),
  p('This statement sets out the types and amount of risk the Board of Harbourside Super\'s trustee is willing to accept in pursuing the fund\'s strategy, always in the best financial interests of members. It sets a risk tolerance, expressed as measurable limits, for each material risk, and explains how the Board and management monitor the risk profile and respond when a limit is breached.'),
  p('It applies to the trustee, the fund and all activities performed on the fund\'s behalf, including by service providers.'),

  h1('2. Strategy and context'),
  p('Harbourside Super is a profit-to-member fund with about 180,000 members and $22 billion in assets (fictional figures). Its strategy over the next three years is to:'),
  bullet('deliver strong long-term net returns against each investment option\'s objective'),
  bullet('improve retirement outcomes, including better help for members approaching and in retirement'),
  bullet('modernise member administration and digital services through a new administration platform'),
  bullet('maintain low, fair fees, and scale through organic growth and a possible merger.'),
  p('To achieve this strategy the Board accepts investment risk, and a measured level of change and project risk. It has little or no appetite for risks that could harm members through error, misconduct, disruption or loss of their information.'),

  h1('3. Risk capacity'),
  p('The trustee\'s risk capacity is the most risk it could bear before it could no longer protect members\' interests or meet its obligations. Examples include: being unable to pay benefits, rollovers or switches when due; operational risk losses exceeding the operational risk financial requirement (ORFR) reserve; failing the annual performance test for a MySuper product; or losing a licence condition. Tolerances in this statement are set well inside that capacity.'),

  h1('4. Overall principles'),
  bullet('Members first: we take risk only where it is in members\' best financial interests.'),
  bullet('No appetite for deliberate or reckless breaches of the law, or for conduct that is dishonest or unfair to members.'),
  bullet('Low appetite for errors, disruption and data loss, recognising they cannot be eliminated. We aim to prevent them, find them quickly and fix them fully, including remediating affected members.'),
  bullet('Risks we accept must be understood, owned, measured and within limits.'),
  bullet('A limit breach is escalated and acted on, never ignored or quietly redefined.'),

  h1('5. Appetite for each material risk'),
  hint('Scale used in this example: None (we will not accept it) · Low · Moderate · High. Each metric has a green zone (within appetite), an amber trigger (early warning; management action) and a red limit (the Board\'s tolerance; escalation required).'),
  ...riskArea('5.1 Investment', 'Moderate to High (by option)',
    'We accept investment market risk to deliver long-term returns in line with each option\'s return objective and risk level. We have low appetite for investment decisions that are not supported by evidence, diversification and value for members.',
    [['Rolling 10-year net return vs option objective', 'At or above objective', 'Up to 0.5% p.a. below', 'More than 1.0% p.a. below'],
     ['MySuper product: projected margin above the annual performance test failure threshold', 'More than 0.5% p.a. above', '0 to 0.5% p.a. above', 'Below the threshold (projected fail)'],
     ['Unlisted assets as % of each diversified option', 'Within strategic range', 'Within 2 points of range limit', 'Outside the range']]),
  ...riskArea('5.2 Liquidity', 'Low',
    'We must always be able to pay benefits, rollovers and switches when due, including in severe but plausible stress, without forced sales that harm remaining members.',
    [['Liquid assets under severe stress scenario vs projected 90-day outflows', 'At or above 150%', '120% to 150%', 'Below 120%'],
     ['Days to fund projected rollovers from cash and cash-equivalent assets', 'More than 30', '15 to 30', 'Fewer than 15']]),
  ...riskArea('5.3 Member administration and operations', 'Low',
    'We have low appetite for errors or delays that affect members\' balances, payments or insurance, and no appetite for leaving known errors unremediated.',
    [['Unallocated contributions older than 3 business days', 'Fewer than 200', '200 to 500', 'More than 500'],
     ['Benefit payments made outside service standard', 'Below 2%', '2% to 5%', 'Above 5%'],
     ['Open member-impacting incidents older than 90 days without an agreed remediation plan', '0', '1 to 2', '3 or more']]),
  ...riskArea('5.4 Compliance and conduct', 'None for deliberate breaches; Low for others',
    'We have no appetite for deliberate or reckless breaches of the law or of our duties to members. We have low tolerance for any breach that harms members, and we report breaches to regulators on time.',
    [['Reportable situations lodged with ASIC after the deadline', '0', 'Any at risk of being late', '1 or more late'],
     ['Significant breaches in the rolling 12 months', '0 to 2', '3 to 4', '5 or more'],
     ['Complaints not resolved within the maximum IDR timeframe', 'Below 2%', '2% to 5%', 'Above 5%'],
     ['Marketing materials issued without compliance review', '0', 'Not used (any is a breach)', '1 or more']],
    'Where a metric has no amber zone, any occurrence goes straight to red.'),
  ...riskArea('5.5 Operational resilience and critical operations (CPS 230)', 'Low',
    'We have low appetite for disruption to critical operations. We will not operate outside the tolerance levels the Board has approved for each critical operation.',
    [['Disruption to a critical operation vs its approved tolerance level', 'No disruption beyond 50% of tolerance', 'Disruption beyond 50% of tolerance', 'Tolerance level breached'],
     ['Business continuity plan tests completed on schedule', '100%', '90% to 99%', 'Below 90%']]),
  ...riskArea('5.6 Cyber and information security', 'Very low',
    'We have very low appetite for loss, theft or misuse of member data, or for loss of critical systems.',
    [['Critical security patches overdue', '5 or fewer', '6 to 10', 'More than 10, or any over 30 days'],
     ['Staff completing phishing simulation without reporting (click rate)', 'Below 5%', '5% to 10%', 'Above 10%'],
     ['Material information security incidents', '0', 'Not used (any is red)', '1 or more']]),
  ...riskArea('5.7 Service providers', 'Low',
    'We use service providers where this benefits members, but we remain accountable. We have low appetite for provider failures that disrupt critical operations or harm members.',
    [['Material service providers outside agreed service levels for 2 or more months', '0', '1', '2 or more'],
     ['Material arrangements without a current review (more than 12 months)', '0', '1', '2 or more']]),
  ...riskArea('5.8 Change and projects', 'Moderate',
    'We accept the risk that comes with modernising our platforms and pursuing a merger, provided changes are well governed and member impacts are managed.',
    [['Major projects rated red for schedule, cost or benefits', '0', '1', '2 or more'],
     ['Post-implementation incidents affecting members from major change', '0', '1 to 2', '3 or more']]),
  ...riskArea('5.9 People and culture', 'Low',
    'We want a culture where people speak up and risk is everyone\'s business. We have low appetite for losing key capability or for behaviour that is inconsistent with our values.',
    [['Voluntary turnover in key roles (rolling 12 months)', 'Below 12%', '12% to 18%', 'Above 18%'],
     ['Mandatory compliance training overdue', 'Below 5%', '5% to 10%', 'Above 10%']]),
  ...riskArea('5.10 Financial resilience of the trustee', 'Low',
    'We maintain financial resources to absorb operational risk losses and run the trustee\'s business sustainably.',
    [['ORFR reserve vs the Board-approved target amount', 'At or above target', 'Up to 10% below target', 'More than 10% below target']]),

  h1('6. Monitoring, escalation and breaches'),
  grid(['Status', 'What it means', 'Required response'], [1500, 3200, 4938], [
    ['Green', 'Within appetite.', 'Business as usual monitoring by the metric owner.'],
    ['Amber', 'Trigger reached: early warning.', 'Metric owner reports to the relevant executive within 5 business days with an action plan. Reported to the Risk Committee in the next quarterly report.'],
    ['Red', 'Limit (tolerance) breached.', 'Reported to the CRO immediately and to the Chair of the Risk Committee within 2 business days. Action plan to return within tolerance, or a formal proposal to accept the risk for a set period, presented to the Risk Committee. Consider whether a regulatory notification is required.'],
  ]),
  gap(),
  p('The CRO reports the full risk profile against this statement to the Risk Committee each quarter and to the Board at least twice a year. A limit may only be changed by the Board, and never to hide a breach after it has happened.'),

  h1('7. Roles'),
  grid(['Who', 'Role'], [2600, 7038], [
    ['Board', 'Approves this statement and each tolerance; oversees the risk profile; decides on red breaches and risk acceptances escalated to it.'],
    ['Risk Committee', 'Reviews the statement annually and recommends it to the Board; monitors the profile and breaches quarterly.'],
    ['CEO and executives', 'Run the fund within appetite; own the metrics and actions in their areas; cascade appetite into business limits and decisions.'],
    ['Chief Risk Officer', 'Maintains the statement; independently monitors and reports the profile; challenges management; escalates breaches.'],
    ['Internal audit', 'Periodically gives independent assurance over the risk appetite framework and its use.'],
  ]),

  h1('8. Review and approval'),
  p('This statement is reviewed at least annually, and sooner if strategy, the operating environment or the risk profile changes materially (for example a merger, a new administration platform or a major incident).'),
  grid(['Version', 'Date', 'Changes', 'Approved by'], [1200, 1600, 5038, 1800], [
    ['1.0', 'Example', 'First version (fictional example).', 'Board'],
    ...blanks(2, 4),
  ]),
];

// ------------------------------------------------------------------ Board risk report template
const report = [
  ...title('Board risk report', '[Organisation name] · Chief Risk Officer\'s report to the Board Risk Committee · Template version 1.0 (September 2026)'),
  hint('How to use: grey italic text is guidance. Replace it with your content and delete what you don\'t need. Aim for a short front section the committee can read in ten minutes, with detail in appendices. Lead with insight and the CRO\'s view, not a list of everything that happened. Background: https://hayesskvaril-ctrl.github.io/governance/board-risk-reporting.html'),
  fieldTable([
    ['Meeting and date', ''],
    ['Reporting period', ''],
    ['Prepared by', 'Chief Risk Officer (name)'],
    ['Purpose', 'For noting / For discussion / For decision (state which)'],
    ['Decisions requested', 'List each decision the committee is asked to make, e.g. approve a risk acceptance, approve a change to a tolerance'],
  ]),

  h1('1. CRO summary'),
  hint('Three to five key messages in plain English: overall risk profile against appetite, what has changed since last time and why, the matters that most need the committee\'s attention, and the CRO\'s independent view. Say what you are worried about.'),
  fieldTable([['Overall view', 'e.g. "The risk profile is within appetite overall, but operational risk has moved to amber because…"'],
              ['Key messages', ''],
              ['Matters requiring attention', '']], 2600, true),

  h1('2. Risk profile against appetite'),
  hint('One row per material risk in the risk appetite statement. Use arrows for the trend since the last report (↑ worsening, → stable, ↓ improving). The status should match the metrics, not a general impression.'),
  grid(['Material risk', 'Appetite', 'Status', 'Trend', 'Commentary (why, and what is being done)'], [2000, 1300, 1100, 900, 4338], [
    ['Strategic', '', '', '', ''], ['Investment', '', '', '', ''], ['Liquidity', '', '', '', ''],
    ['Operational', '', '', '', ''], ['Compliance and conduct', '', '', '', ''], ['Cyber and information security', '', '', '', ''],
    ['Service providers', '', '', '', ''], ['People and culture', '', '', '', ''], ['Other', '', '', '', ''],
  ]),

  h1('3. Metrics outside appetite'),
  hint('Every amber and red metric, with the action being taken. For red breaches, say whether management proposes to bring the risk back within tolerance or seeks a formal, time-limited risk acceptance.'),
  grid(['Metric', 'Limit', 'Current', 'Status', 'Action, owner and date to return within appetite'], [2500, 1200, 1200, 1100, 3638], blanks(4, 5)),

  h1('4. Key and emerging risks'),
  hint('The few risks the CRO considers most significant now, and emerging risks that may not yet be in the register (e.g. regulatory change, technology, market or climate developments). Explain the potential impact and what is being done to understand it.'),
  grid(['Risk', 'Why it matters now', 'Response'], [2600, 3800, 3238], blanks(4, 3)),

  h1('5. Incidents, breaches and remediation'),
  hint('Material incidents in the period, breaches reported to regulators (with dates and whether lodged on time), and the status of customer or member remediation programs. Focus on themes and root causes, not just counts.'),
  grid(['Matter', 'Summary and impact', 'Reported to (date)', 'Status and next steps'], [2000, 3700, 1700, 2238], blanks(4, 4)),
  gap(),
  fieldTable([['Themes and root causes', 'e.g. repeat causes across incidents, controls that failed, lessons applied elsewhere']], 2600, true),

  h1('6. Operational resilience and service providers'),
  hint('For APRA-regulated entities under CPS 230: any disruption to critical operations and whether it stayed within tolerance levels, business continuity plan testing, and significant matters with material service providers (performance, new or changed arrangements, notifications to APRA).'),
  fieldTable([['Critical operations disruptions', ''], ['Business continuity testing results', ''], ['Material service provider matters', '']], 2600, true),

  h1('7. Issues, actions and risk acceptances'),
  hint('Overdue high-rated actions (from audits, reviews, incidents and regulators) and any risk acceptances that are active or expiring. Show ageing and repeat extensions.'),
  grid(['Issue or action', 'Source', 'Rating', 'Original due', 'Current due', 'Owner and status'], [2600, 1200, 1000, 1200, 1200, 2438], blanks(4, 6)),

  h1('8. Regulatory matters'),
  hint('Significant regulator engagement, requests and reviews; and regulatory change affecting the organisation, with implementation status.'),
  grid(['Matter', 'Regulator', 'Summary', 'Status and key dates'], [2200, 1300, 3800, 2338], blanks(3, 4)),

  h1('9. Assurance and risk culture'),
  hint('Key findings from internal audit, the second line and external reviews; and any insight on risk culture (e.g. speak-up data, survey results, behaviour observed in incidents).'),
  fieldTable([['Assurance findings', ''], ['Risk culture observations', '']], 2600, true),

  h1('Appendices'),
  hint('Suggested: full metric dashboard; risk register extract (high and extreme risks); incident and breach register extract; action tracker; glossary of terms used.'),
  gap(),
  p('Checklist before issuing this report', { run: { bold: true } }),
  bullet('Does the summary give the CRO\'s own view, including concerns?'),
  bullet('Is every red and amber metric explained, with an owner and date?'),
  bullet('Are decisions requested clearly stated at the front?'),
  bullet('Would a director reading only the first two pages know what matters most?'),
  bullet('Are data sources and any data quality limitations noted?'),
];

save('example-risk-appetite-statement.docx', 'Example risk appetite statement', 'EXAMPLE ONLY · Harbourside Super (fictional) · Risk appetite statement', ras)
  .then(() => save('board-risk-report-template.docx', 'Board risk report template', 'CONFIDENTIAL · Board risk report', report));
