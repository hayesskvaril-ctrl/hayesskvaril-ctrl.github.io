// Shared helpers for the RiskLens Word templates (docx npm package).
const path = require('path');
const fs = require('fs');
const D = require(process.env.DOCX_MODULE || 'docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  HeadingLevel, AlignmentType, BorderStyle, Footer, Header, PageNumber, LevelFormat,
} = D;

const ROOT = path.resolve(__dirname, '..', '..');
const NAVY = '0F2942';
const GREY = 'EEF2F7';
const INPUT = 'FFF7D6';
const RAG = { Green: 'BFE5CB', Amber: 'FDE68A', Red: 'FCA5A5' };
const FONT = 'Arial';
const W = 9638; // A4 width minus 2 cm margins, in DXA
const border = { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E0' };
const borders = { top: border, bottom: border, left: border, right: border };

const run = (text, opts = {}) => new TextRun({ text, font: FONT, ...opts });
const p = (text, opts = {}) => new Paragraph({ spacing: { after: 100 }, ...opts, children: [run(text, opts.run || {})] });
const hint = (text) => new Paragraph({ spacing: { after: 80 }, children: [run(text, { italics: true, color: '4A5568', size: 18 })] });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 }, children: [run(text)] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 80 }, children: [run(text)] });
const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60 }, children: [run(text, { size: 20 })] });
const gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });

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

// Two-column "label | content" table. Guidance text (help) shows in grey italics.
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

// Grid with a header row. Empty strings are shaded as input cells; 'Green'/'Amber'/'Red' are coloured.
function grid(headers, widths, rows, { guide = false } = {}) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], { fill: NAVY, header: true })) }),
      ...rows.map((r) => new TableRow({
        cantSplit: true,
        children: r.map((v, i) => cell(v, widths[i], { fill: v === '' ? INPUT : RAG[v], small: true, guide: guide && v !== '' && i > 0 })),
      })),
    ],
  });
}
const blanks = (n, cols) => Array.from({ length: n }, () => Array(cols).fill(''));

function save(file, title, headerText, children) {
  const doc = new Document({
    creator: 'RiskLens Australia',
    title,
    description: `Free ${title.toLowerCase()} from RiskLens Australia`,
    styles: {
      default: { document: { run: { font: FONT, size: 20 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: FONT, size: 28, bold: true, color: NAVY }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: FONT, size: 23, bold: true, color: NAVY }, paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 1 } },
      ],
    },
    numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(headerText, { size: 16, color: '4A5568' })] })] }) },
      footers: { default: new Footer({ children: [
        new Paragraph({ children: [run('Template from RiskLens Australia (general educational information only; not legal, financial or compliance advice). Adapt to your organisation\'s policies and obligations.', { size: 14, color: '4A5568' })] }),
        new Paragraph({ alignment: AlignmentType.RIGHT, children: [run('Page ', { size: 16 }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16 }), run(' of ', { size: 16 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 16 })] }),
      ] }) },
      children,
    }],
  });
  const out = path.join(ROOT, 'assets', 'templates', file);
  return Packer.toBuffer(doc).then((buf) => {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, buf);
    console.log('wrote', path.relative(ROOT, out));
  });
}

module.exports = { D, run, p, hint, h1, h2, bullet, gap, cell, fieldTable, grid, blanks, save, NAVY, GREY, INPUT, W };
