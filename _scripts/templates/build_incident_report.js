// Builds assets/templates/incident-report-template.docx
// Run from the repo root:  node _scripts/templates/build_incident_report.js
// Needs the "docx" npm package (set DOCX_MODULE to its path if it isn't installed globally).
const path = require('path');
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  HeadingLevel, AlignmentType, BorderStyle, Footer, Header, PageNumber, LevelFormat, TabStopType,
} = require(process.env.DOCX_MODULE || 'docx');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'assets', 'templates', 'incident-report-template.docx');

const NAVY = '0F2942';
const GREY = 'EEF2F7';
const INPUT = 'FFF7D6';
const FONT = 'Arial';
const W = 9638; // A4 width minus 2 cm margins, in DXA
const border = { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E0' };
const borders = { top: border, bottom: border, left: border, right: border };

const run = (text, opts = {}) => new TextRun({ text, font: FONT, ...opts });
const p = (text, opts = {}) => new Paragraph({ spacing: { after: 100 }, ...opts, children: [run(text, opts.run || {})] });
const hint = (text) => new Paragraph({ spacing: { after: 80 }, children: [run(text, { italics: true, color: '4A5568', size: 18 })] });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 }, children: [run(text)] });
const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60 }, children: [run(text, { size: 20 })] });

function cell(content, width, { fill, bold, header, small, guide } = {}) {
  const paras = (Array.isArray(content) ? content : [content]).map((t) =>
    new Paragraph({ spacing: { after: 40 }, children: [run(t, { bold: bold || header, italics: !!guide, color: header ? 'FFFFFF' : guide ? '6B7280' : undefined, size: small ? 17 : 19 })] }));
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders,
    shading: fill ? { type: ShadingType.CLEAR, color: 'auto', fill } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: paras,
  });
}

// Two-column "label | fill in" table
// Pass tall = true for free-text sections that need writing space.
function fieldTable(rows, labelW = 3200, tall = false) {
  const inW = W - labelW;
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [labelW, inW],
    rows: rows.map(([label, help]) => new TableRow({
      cantSplit: true,
      height: tall ? { value: 1100, rule: 'atLeast' } : undefined,
      children: [cell(label, labelW, { fill: GREY, bold: true }),
                 cell(help ? [help] : [''], inW, { fill: INPUT, small: !!help, guide: !!help })],
    })),
  });
}

// Grid with a header row, then content rows (arrays) or blank rows
function grid(headers, widths, rows) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], { fill: NAVY, header: true })) }),
      ...rows.map((r) => new TableRow({
        cantSplit: true,
        children: r.map((v, i) => cell(v, widths[i], { fill: v === '' ? INPUT : undefined, small: true })),
      })),
    ],
  });
}
const blanks = (n, cols) => Array.from({ length: n }, () => Array(cols).fill(''));
const gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });

const children = [
  new Paragraph({ spacing: { after: 60 }, children: [run('Incident report', { bold: true, size: 40, color: NAVY })] }),
  new Paragraph({ spacing: { after: 200 }, children: [run('[Organisation name] · Confidential · Template version 1.0 (September 2026)', { italics: true, color: '4A5568', size: 18 })] }),
  hint('How to use: complete each section as facts become available. Record facts, not opinions or blame. Pale yellow boxes are for your entries. Keep this report with your incident register entry and update the version history as the incident progresses. Delete these grey instructions when you use the template.'),

  h1('1. Incident details'),
  fieldTable([
    ['Incident ID', 'Your incident register reference'],
    ['Incident title', 'Short, factual description'],
    ['Date and time the incident occurred', 'Or the period over which it occurred'],
    ['Date and time identified', ''],
    ['Date and time the organisation became aware', 'Critical: many reporting clocks run from awareness, not from the end of the investigation'],
    ['Identified by (name, role)', ''],
    ['How it was identified', 'e.g. control, complaint, audit, staff report, service provider'],
    ['Business unit(s) affected', ''],
    ['Service provider(s) involved', 'Name any third parties involved'],
    ['Incident owner', 'Accountable executive or manager'],
    ['Reported to Risk / Compliance (date, time)', ''],
  ]),

  h1('2. Description of the incident'),
  hint('What happened, in plain English and in time order? What processes, systems, products and customers or members are involved? What is still unknown?'),
  fieldTable([['What happened', ''], ['Timeline of key events', ''], ['What is still unknown', '']], 3200, true),

  h1('3. Impact assessment'),
  hint('Rate each impact using your organisation\'s consequence scale. Update the assessment as facts firm up.'),
  grid(['Impact area', 'Assessment (facts and estimates)', 'Rating'], [2600, 5238, 1800], [
    ['Customers / members (number and type affected, nature of harm)', '', ''],
    ['Financial (estimated loss, costs, remediation)', '', ''],
    ['Operations (critical operation affected? within tolerance?)', '', ''],
    ['Data and privacy (personal information involved?)', '', ''],
    ['Regulatory (obligations potentially breached)', '', ''],
    ['Reputation and stakeholders', '', ''],
    ['Overall severity', '', ''],
  ]),

  h1('4. Immediate actions and containment'),
  grid(['Action taken to contain or limit harm', 'Owner', 'Date', 'Status'], [4638, 1900, 1400, 1700], blanks(4, 4)),

  h1('5. Breach and notification assessment'),
  hint('Check every regime that may apply. One incident can trigger several notifications with different tests and deadlines. Timeframes below are a summary as at September 2026. Always confirm the current requirements and your own licences and policies, and seek advice where needed.'),
  grid(['Regime (who it applies to)', 'Key test and deadline (summary)', 'Applies? Y / N / Unsure', 'Decision, date and by whom'], [2300, 3638, 1500, 2200], [
    ['ASIC reportable situation (AFS and credit licensees)', 'Significant breach or likely significant breach of a core obligation, and some other situations: within 30 calendar days of awareness. Long-running investigations are also reportable.', '', ''],
    ['APRA CPS 230 (APRA-regulated entities)', 'Disruption to a critical operation outside tolerance: 24 hours. Material operational risk incident: 72 hours.', '', ''],
    ['APRA CPS 234 (APRA-regulated entities)', 'Material information security incident: 72 hours. Material control weakness not remediated in time: 10 business days.', '', ''],
    ['APRA, SIS Act s 29JA (super trustees)', 'Significant breach of RSE licensee law and certain other matters: in writing within 30 days (some matters immediately).', '', ''],
    ['OAIC Notifiable Data Breaches scheme', 'Reasonable grounds to suspect an eligible data breach: assess, generally within 30 days. Eligible breach: notify the OAIC and affected individuals as soon as practicable.', '', ''],
    ['AUSTRAC (reporting entities)', 'Suspicious matter report: 3 business days (24 hours for terrorism financing). Don\'t tip off the customer.', '', ''],
    ['Affected customers or members', 'Consider disclosure and remediation obligations, e.g. s 912EA for personal advice licensees and ASIC RG 277 on remediation.', '', ''],
    ['Other (board, auditor, insurer, contracts, other regulators)', 'e.g. board reporting policy, professional indemnity insurer notification, service provider contract terms.', '', ''],
  ]),
  gap(),
  fieldTable([
    ['Is this a breach of an obligation? Which one?', ''],
    ['Significance assessment and reasoning', 'Record the reasoning, especially if you decide a matter is NOT reportable'],
    ['Reference numbers of notifications lodged', ''],
  ]),

  h1('6. Root cause analysis'),
  hint('Ask "why" until you reach causes you can fix. Distinguish the root cause from contributing factors. For each failed control, say whether it failed in design (it wouldn\'t work even if performed) or in operation (it wasn\'t performed as designed).'),
  fieldTable([
    ['Root cause(s)', ''],
    ['Contributing factors', ''],
    ['Controls that failed (design or operating failure)', ''],
    ['Could this happen elsewhere? (similar products, processes, systems)', ''],
  ], 3200, true),

  h1('7. Remediation'),
  fieldTable([
    ['Customer / member remediation needed?', 'Y / N. If yes: scope, method, beneficial assumptions, interest or earnings, estimated cost, timeframe'],
    ['Who bears the cost?', 'e.g. the organisation, a service provider, insurance. For super trustees, consider members\' best financial interests'],
  ]),
  gap(),
  grid(['Action to fix the root cause and strengthen controls', 'Owner', 'Due date', 'Status'], [4638, 1900, 1400, 1700], blanks(4, 4)),

  h1('8. Lessons learned'),
  fieldTable([['What worked well', ''], ['What should change', ''], ['Who needs to know (training, other teams, risk register updates)', '']], 3200, true),

  h1('9. Review, approval and closure'),
  p('Close the incident only when:', { run: { bold: true, size: 20 } }),
  bullet('all required notifications have been made and regulators updated'),
  bullet('customer or member remediation is complete, or tracked as a separate program'),
  bullet('the root cause is fixed and new or improved controls are in place and tested'),
  bullet('the risk register and control library have been updated'),
  bullet('the incident has been reported to the appropriate committee or board.'),
  gap(),
  grid(['Role', 'Name', 'Signature', 'Date'], [2800, 2600, 2438, 1800], [
    ['Prepared by', '', '', ''],
    ['Reviewed by (Risk / Compliance)', '', '', ''],
    ['Approved by (Incident owner)', '', '', ''],
    ['Closed (date)', '', '', ''],
  ]),

  h1('Version history'),
  grid(['Version', 'Date', 'Changes', 'By'], [1200, 1600, 5038, 1800], blanks(3, 4)),
];

const doc = new Document({
  creator: 'RiskLens Australia',
  title: 'Incident report template',
  description: 'Free incident report template from RiskLens Australia',
  styles: {
    default: { document: { run: { font: FONT, size: 20 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: FONT, size: 28, bold: true, color: NAVY }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 0 } },
    ],
  },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run('CONFIDENTIAL · Incident report', { size: 16, color: '4A5568' })] })] }) },
    footers: { default: new Footer({ children: [
      new Paragraph({ children: [run('Template from RiskLens Australia (general educational information only; not legal, financial or compliance advice). Adapt to your organisation\'s policies and obligations.', { size: 14, color: '4A5568' })] }),
      new Paragraph({ alignment: AlignmentType.RIGHT, children: [run('Page ', { size: 16 }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16 }), run(' of ', { size: 16 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 16 })] }),
    ] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, buf);
  console.log('wrote', path.relative(ROOT, OUT));
});
