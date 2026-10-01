// A small Excel (.xlsx) writer with no outside services or libraries, used by the GRC model builder.
// It supports text and number cells, a bold header row, wrapped text, column widths, a frozen header and
// filters. The workbook is a ZIP of XML files, stored without compression, built entirely in the browser.
// Usage: XLSXLite.workbook([{ name: 'Sheet', rows: [['Header', ...], [...]], widths: [30, 12], header: true }], { title: '...' })
// returns a Blob. A cell can also be { v: value, s: 'title' | 'bold' | 'head' | 'text' | 'plain' } ('plain' does not wrap).
(function () {
  'use strict';
  var TABLE = (function () {
    var t = [];
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(u8) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < u8.length; i++) c = TABLE[(c ^ u8[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  var enc = new TextEncoder();
  // characters that are not allowed in XML are dropped
  function x(s) {
    return String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function col(i) { var s = ''; i += 1; while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }
  var STYLE = { plain: 0, text: 2, head: 1, title: 3, bold: 4 };
  var NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  var RNS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  var HEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';

  function zip(files) {
    var parts = [], central = [], offset = 0, now = new Date();
    var time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
    var date = ((Math.max(now.getFullYear(), 1980) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
    files.forEach(function (f) {
      var name = enc.encode(f.name), data = enc.encode(f.text), crc = crc32(data), size = data.length;
      var h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint16(10, time, true); h.setUint16(12, date, true); h.setUint32(14, crc, true);
      h.setUint32(18, size, true); h.setUint32(22, size, true); h.setUint16(26, name.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), name, data);
      var c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true);
      c.setUint16(10, 0, true); c.setUint16(12, time, true); c.setUint16(14, date, true); c.setUint32(16, crc, true);
      c.setUint32(20, size, true); c.setUint32(24, size, true); c.setUint16(28, name.length, true);
      c.setUint16(30, 0, true); c.setUint16(32, 0, true); c.setUint16(34, 0, true); c.setUint16(36, 0, true);
      c.setUint32(38, 0, true); c.setUint32(42, offset, true);
      central.push(new Uint8Array(c.buffer), name);
      offset += 30 + name.length + size;
    });
    var cdSize = 0;
    central.forEach(function (p) { cdSize += p.length; });
    var e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(4, 0, true); e.setUint16(6, 0, true);
    e.setUint16(8, files.length, true); e.setUint16(10, files.length, true);
    e.setUint32(12, cdSize, true); e.setUint32(16, offset, true); e.setUint16(20, 0, true);
    return parts.concat(central, [new Uint8Array(e.buffer)]);
  }

  function sheetXml(sh, first) {
    var rows = sh.rows || [], ncol = 1, header = sh.header !== false && rows.length > 1;
    rows.forEach(function (r) { ncol = Math.max(ncol, r.length); });
    var last = col(ncol - 1) + Math.max(rows.length, 1);
    // column widths: given, or from the longest text in the column (between 10 and 60 characters)
    var widths = [];
    for (var j = 0; j < ncol; j++) {
      var w = sh.widths && sh.widths[j];
      if (!w) {
        w = 10;
        rows.forEach(function (r) { var v = r[j]; if (v && typeof v === 'object') v = v.v; if (v !== null && v !== undefined) w = Math.max(w, Math.min(60, String(v).length + 2)); });
      }
      widths.push(w);
    }
    var o = HEAD + '<worksheet xmlns="' + NS + '" xmlns:r="' + RNS + '">';
    o += '<dimension ref="A1:' + last + '"/>';
    o += '<sheetViews><sheetView workbookViewId="0"' + (first ? ' tabSelected="1"' : '') + '>';
    o += header ? '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/>' : '<selection activeCell="A1" sqref="A1"/>';
    o += '</sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>';
    widths.forEach(function (w, i) { o += '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>'; });
    o += '</cols><sheetData>';
    rows.forEach(function (r, i) {
      o += '<row r="' + (i + 1) + '">';
      r.forEach(function (cell, j) {
        var v = cell, s = (i === 0 && header) ? STYLE.head : STYLE.text;
        if (cell && typeof cell === 'object') { v = cell.v; if (Object.prototype.hasOwnProperty.call(STYLE, cell.s)) s = STYLE[cell.s]; }
        if (v === null || v === undefined || v === '') return;
        var ref = col(j) + (i + 1);
        if (typeof v === 'number' && isFinite(v)) o += '<c r="' + ref + '" s="' + s + '"><v>' + v + '</v></c>';
        else o += '<c r="' + ref + '" s="' + s + '" t="inlineStr"><is><t xml:space="preserve">' + x(String(v).slice(0, 32000)) + '</t></is></c>';
      });
      o += '</row>';
    });
    o += '</sheetData>';
    if (header) o += '<autoFilter ref="A1:' + last + '"/>';
    o += '<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>';
    o += '<pageSetup orientation="landscape" fitToHeight="0"/>';
    return { xml: o + '</worksheet>', last: last, header: header };
  }

  function names(sheets) {
    var used = {};
    return sheets.map(function (sh, i) {
      var n = String(sh.name || ('Sheet ' + (i + 1))).replace(/[\[\]:*?\/\\]/g, ' ').replace(/^'+|'+$/g, '').trim().slice(0, 31) || ('Sheet ' + (i + 1));
      var base = n, k = 2;
      while (used[n.toLowerCase()]) { var suf = ' ' + k++; n = base.slice(0, 31 - suf.length) + suf; }
      used[n.toLowerCase()] = true;
      return n;
    });
  }

  function workbook(sheets, props) {
    props = props || {};
    var nm = names(sheets), files = [], defs = '';
    var types = '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
      '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>';
    var wbSheets = '', wbRels = '';
    sheets.forEach(function (sh, i) {
      var r = sheetXml(sh, i === 0);
      files.push({ name: 'xl/worksheets/sheet' + (i + 1) + '.xml', text: r.xml });
      types += '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>';
      wbSheets += '<sheet name="' + x(nm[i]) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>';
      wbRels += '<Relationship Id="rId' + (i + 1) + '" Type="' + RNS + '/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>';
      if (r.header) {
        var ref = r.last.match(/^([A-Z]+)(\d+)$/);
        defs += '<definedName name="_xlnm._FilterDatabase" localSheetId="' + i + '" hidden="1">' + x("'" + nm[i].replace(/'/g, "''") + "'!$A$1:$" + ref[1] + '$' + ref[2]) + '</definedName>';
      }
    });
    types += '</Types>';
    wbRels += '<Relationship Id="rId' + (sheets.length + 1) + '" Type="' + RNS + '/styles" Target="styles.xml"/>';
    var wb = HEAD + '<workbook xmlns="' + NS + '" xmlns:r="' + RNS + '"><bookViews><workbookView activeTab="0"/></bookViews><sheets>' + wbSheets + '</sheets>' + (defs ? '<definedNames>' + defs + '</definedNames>' : '') + '</workbook>';
    var styles = HEAD + '<styleSheet xmlns="' + NS + '">' +
      '<fonts count="4"><font><sz val="11"/><name val="Calibri"/><family val="2"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font>' +
      '<font><b/><sz val="15"/><color rgb="FF0F2942"/><name val="Calibri"/><family val="2"/></font>' +
      '<font><b/><sz val="11"/><name val="Calibri"/><family val="2"/></font></fonts>' +
      '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FF1B3A5C"/><bgColor indexed="64"/></patternFill></fill></fills>' +
      '<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border>' +
      '<border><left/><right/><top/><bottom style="thin"><color rgb="FFD2D2D7"/></bottom><diagonal/></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
      '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>' +
      '<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs>' +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
    var stamp = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    var core = HEAD + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      '<dc:title>' + x(props.title || 'Workbook') + '</dc:title><dc:creator>' + x(props.creator || 'RiskLens Australia') + '</dc:creator>' +
      '<dcterms:created xsi:type="dcterms:W3CDTF">' + stamp + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + stamp + '</dcterms:modified></cp:coreProperties>';
    var app = HEAD + '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>' + x(props.creator || 'RiskLens Australia') + '</Application></Properties>';
    var all = [
      { name: '[Content_Types].xml', text: HEAD + types },
      { name: '_rels/.rels', text: HEAD + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="' + RNS + '/officeDocument" Target="xl/workbook.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
        '<Relationship Id="rId3" Type="' + RNS + '/extended-properties" Target="docProps/app.xml"/></Relationships>' },
      { name: 'docProps/core.xml', text: core },
      { name: 'docProps/app.xml', text: app },
      { name: 'xl/workbook.xml', text: wb },
      { name: 'xl/_rels/workbook.xml.rels', text: HEAD + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + wbRels + '</Relationships>' },
      { name: 'xl/styles.xml', text: styles }
    ].concat(files);
    return new Blob(zip(all), { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  window.XLSXLite = { workbook: workbook };
})();
