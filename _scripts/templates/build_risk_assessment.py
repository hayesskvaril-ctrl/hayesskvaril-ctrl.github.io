"""Builds assets/templates/risk-assessment-template.xlsx.

Run from the repo root:  python3 _scripts/templates/build_risk_assessment.py
Then recalculate with LibreOffice so formula results are cached (see README in this folder).
"""
from pathlib import Path
import sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, PatternFill
from openpyxl.formatting.rule import FormulaRule, CellIsRule
from openpyxl.worksheet.table import Table  # noqa: F401  (kept simple: no Excel tables, for LibreOffice/Sheets compatibility)

sys.path.insert(0, str(Path(__file__).parent))
from xlsx_common import (f, header_row, style_cell, list_validation, rating_colours, title_block,
                         INPUT_FILL, CALC_FILL, EXAMPLE_FILL, BORDER, RATING_COLOURS, DISCLAIMER, NAVY,
                         print_setup)

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "templates" / "risk-assessment-template.xlsx"
ROWS = 60  # number of blank register rows prepared with formulas

wb = Workbook()

# ---------------------------------------------------------------- Read me
ws = wb.active
ws.title = "Read me"
title_block(ws, "Risk assessment template", "RiskLens Australia · free template · version 1.0 (September 2026)")
lines = [
    ("What this is", "A simple risk register for identifying, rating and treating risks. It follows the common likelihood × consequence approach explained at https://hayesskvaril-ctrl.github.io/risk-management/risk-assessment-methodologies.html"),
    ("How to use it", "1. Review the 'Scales' tab and adjust the descriptions to suit your organisation (and your approved risk management framework).\n"
                      "2. In 'Risk assessment', describe each risk (cause, event, consequence), rate it before controls (inherent), list key controls, then rate it with current controls (residual).\n"
                      "3. Decide on treatment for risks outside appetite, and record actions, owners and due dates.\n"
                      "4. The 'Heat map' tab updates automatically from the residual and inherent ratings."),
    ("Colour key", "Pale yellow cells: fill these in (many have drop-down lists).\nGrey-blue cells: calculated automatically; don't type over them.\nGreen row: a worked example. Replace or delete it."),
    ("Appetite setting", "The 'Scales' tab has one cell for the highest residual score treated as within appetite (default 9 = top of Medium). Change it to match your risk appetite statement."),
    ("Tips", "Describe risks as cause → event → consequence. Rate the most likely credible impact, not the worst imaginable one (use scenario analysis for extremes). Record evidence for control effectiveness, such as recent control testing."),
    ("Important", DISCLAIMER),
]
r = 4
for k, v in lines:
    ws.cell(row=r, column=1, value=k).font = f(11, True, NAVY)
    c = ws.cell(row=r, column=2, value=v)
    c.font = f(10)
    c.alignment = Alignment(wrap_text=True, vertical="top")
    ws.cell(row=r, column=1).alignment = Alignment(vertical="top")
    ws.row_dimensions[r].height = max(30, 15 * (v.count("\n") + 1 + len(v) // 95))
    r += 1
ws.column_dimensions["A"].width = 20
ws.column_dimensions["B"].width = 100
# legend swatches
for i, (label, fill) in enumerate([("Fill in", INPUT_FILL), ("Calculated", CALC_FILL), ("Example", EXAMPLE_FILL)]):
    c = ws.cell(row=r + 1 + i, column=1, value=label)
    style_cell(c, fill)

# ---------------------------------------------------------------- Scales
sc = wb.create_sheet("Scales")
title_block(sc, "Rating scales", "Examples only. Replace with the scales in your organisation's approved risk management framework.")
header_row(sc, 4, ["Rating", "Likelihood", "Description (example)"])
LIK = [(1, "Rare", "May occur only in exceptional circumstances (e.g. less than once in 20 years)"),
       (2, "Unlikely", "Could occur at some time (e.g. once in 5–20 years)"),
       (3, "Possible", "Might occur (e.g. once in 1–5 years)"),
       (4, "Likely", "Will probably occur (e.g. about once a year)"),
       (5, "Almost certain", "Expected to occur (e.g. several times a year)")]
for i, row in enumerate(LIK):
    for j, v in enumerate(row):
        c = sc.cell(row=5 + i, column=1 + j, value=v)
        style_cell(c, INPUT_FILL if j else None, center=(j == 0))

header_row(sc, 11, ["Rating", "Consequence", "Members / customers", "Financial (example)", "Regulatory", "Operations"])
CON = [(1, "Insignificant", "Negligible impact", "Under $10k", "No breach, or minor breach not reportable", "No noticeable disruption"),
       (2, "Minor", "Small number affected, quickly fixed", "$10k–$100k", "Minor breach; internal reporting only", "Brief disruption within tolerance"),
       (3, "Moderate", "Noticeable harm to a group of members", "$100k–$1m", "Possible reportable breach", "Disruption close to tolerance"),
       (4, "Major", "Significant harm to many members", "$1m–$10m", "Reportable breach; regulator scrutiny", "Critical operation outside tolerance"),
       (5, "Severe", "Widespread or lasting harm", "Over $10m", "Enforcement action; licence at risk", "Prolonged failure of critical operations")]
for i, row in enumerate(CON):
    for j, v in enumerate(row):
        c = sc.cell(row=12 + i, column=1 + j, value=v)
        style_cell(c, INPUT_FILL if j else None, center=(j == 0))

header_row(sc, 18, ["Minimum score", "Rating", "Typical response (example)"])
BANDS = [(1, "Low", "Manage through routine procedures; review periodically."),
         (5, "Medium", "Management attention; confirm controls are effective and monitor."),
         (10, "High", "Senior management attention; treatment plan with owner and due date."),
         (15, "Extreme", "Immediate executive and board attention; act now to reduce the risk.")]
for i, row in enumerate(BANDS):
    for j, v in enumerate(row):
        c = sc.cell(row=19 + i, column=1 + j, value=v)
        style_cell(c, INPUT_FILL if j == 2 else None, center=(j == 0))
    sc.cell(row=19 + i, column=2).fill = PatternFill("solid", fgColor=RATING_COLOURS[row[1]])

sc["A24"] = "Highest residual score within appetite"
sc["A24"].font = f(10, True)
sc["C24"] = 9
style_cell(sc["C24"], INPUT_FILL, center=True)
sc["D24"] = "Default 9 = top of the Medium band. Change to match your risk appetite statement."
sc["D24"].font = f(9, italic=True, color="4A5568")

header_row(sc, 26, ["Control effectiveness", "Meaning (example)"])
CE = [("Effective", "Well designed and tested as operating reliably."),
      ("Partially effective", "Some design or operating gaps; reduces the risk but not fully."),
      ("Ineffective", "Not designed well or not operating; little reduction in risk."),
      ("Not tested", "No recent evidence of effectiveness.")]
for i, row in enumerate(CE):
    for j, v in enumerate(row):
        style_cell(sc.cell(row=27 + i, column=1 + j, value=v), INPUT_FILL if j else None)

LISTS = {  # hidden helper lists for drop-downs, column H onwards
    "H": ("Categories", ["Strategic", "Operational", "Compliance", "Conduct", "Technology and cyber", "Third party",
                          "People", "Financial", "Investment", "Insurance", "Reputational", "Other"]),
    "I": ("Control type", ["Preventive", "Detective", "Corrective", "Directive"]),
    "J": ("Treatment", ["Accept", "Reduce", "Share or transfer", "Avoid"]),
    "K": ("Status", ["Open", "In progress", "Complete", "Overdue", "Closed"]),
}
for col, (name, vals) in LISTS.items():
    sc[f"{col}4"] = name
    sc[f"{col}4"].font = f(10, True)
    for i, v in enumerate(vals):
        sc[f"{col}{5 + i}"] = v
        sc[f"{col}{5 + i}"].font = f(10)
    sc.column_dimensions[col].width = 20
sc["H2"] = "Drop-down list values (edit to suit)"
sc["H2"].font = f(9, italic=True, color="4A5568")
for col, w in zip("ABCDEF", [14, 18, 44, 22, 32, 30]):
    sc.column_dimensions[col].width = w

# ---------------------------------------------------------------- Risk assessment
ra = wb.create_sheet("Risk assessment")
title_block(ra, "Risk assessment", "Fill in the pale yellow cells. Scores, ratings and appetite checks calculate automatically.")
HEAD = ["Risk ID", "Risk title", "Description (cause → event → consequence)", "Category", "Risk owner",
        "Inherent likelihood (1–5)", "Inherent consequence (1–5)", "Inherent score", "Inherent rating",
        "Key controls", "Control type", "Control effectiveness", "Residual likelihood (1–5)", "Residual consequence (1–5)",
        "Residual score", "Residual rating", "Within appetite?", "Treatment decision", "Treatment actions",
        "Action owner", "Due date", "Target likelihood (1–5)", "Target consequence (1–5)", "Target score",
        "Action status", "Last reviewed", "Notes / evidence"]
WIDTHS = [9, 24, 42, 16, 16, 11, 12, 9, 11, 36, 13, 15, 11, 12, 9, 11, 12, 14, 36, 16, 12, 11, 12, 9, 13, 12, 30]
HR = 4
header_row(ra, HR, HEAD, WIDTHS, height=46)
CALC_COLS = {8, 9, 15, 16, 17, 24}
first, last = HR + 1, HR + ROWS

EXAMPLE = ["R001", "Fee calculation error",
           "Cause: product or system changes not tested for fee impacts. Event: fees calculated incorrectly. "
           "Consequence: members overcharged, remediation cost, reportable breach.",
           "Operational", "Head of Operations", 4, 3, None, None,
           "Change testing checklist includes fee scenarios; monthly independent fee reconciliation; administrator SLA reporting.",
           "Detective", "Partially effective", 2, 3, None, None, None, "Reduce",
           "Automate fee reconciliation; add fee sign-off to product change process.", "Product Manager",
           None, 1, 3, None, "In progress", None, "Reconciliation tested Q2: 1 exception found."]

for r in range(first, last + 1):
    for col in range(1, len(HEAD) + 1):
        c = ra.cell(row=r, column=col)
        style_cell(c, CALC_FILL if col in CALC_COLS else INPUT_FILL)
    # formulas
    ra.cell(row=r, column=8, value=f'=IF(AND(ISNUMBER(F{r}),ISNUMBER(G{r})),F{r}*G{r},"")')
    ra.cell(row=r, column=9, value=f'=IF(H{r}="","",LOOKUP(H{r},Scales!$A$19:$A$22,Scales!$B$19:$B$22))')
    ra.cell(row=r, column=15, value=f'=IF(AND(ISNUMBER(M{r}),ISNUMBER(N{r})),M{r}*N{r},"")')
    ra.cell(row=r, column=16, value=f'=IF(O{r}="","",LOOKUP(O{r},Scales!$A$19:$A$22,Scales!$B$19:$B$22))')
    ra.cell(row=r, column=17, value=f'=IF(O{r}="","",IF(O{r}<=Scales!$C$24,"Within","Outside"))')
    ra.cell(row=r, column=24, value=f'=IF(AND(ISNUMBER(V{r}),ISNUMBER(W{r})),V{r}*W{r},"")')
    for col in (8, 15, 24):
        ra.cell(row=r, column=col).alignment = Alignment(horizontal="center", vertical="top")
    for col in (21, 26):
        ra.cell(row=r, column=col).number_format = "DD/MM/YYYY"

# example row values (row `first`)
import datetime
for col, v in enumerate(EXAMPLE, start=1):
    if v is not None:
        ra.cell(row=first, column=col, value=v)
ra.cell(row=first, column=21, value=datetime.date(2026, 12, 31))
ra.cell(row=first, column=26, value=datetime.date(2026, 9, 27))
for col in range(1, len(HEAD) + 1):
    if col not in CALC_COLS:
        ra.cell(row=first, column=col).fill = EXAMPLE_FILL
ra.row_dimensions[first].height = 75

rng = lambda col: f"{col}{first}:{col}{last}"
num_msg = "Enter a whole number from 1 to 5 (see the Scales tab)."
from openpyxl.worksheet.datavalidation import DataValidation
dv = DataValidation(type="whole", operator="between", formula1="1", formula2="5", allow_blank=True)
dv.error = num_msg; dv.showErrorMessage = True; dv.prompt = num_msg; dv.showInputMessage = True
ra.add_data_validation(dv)
for col in ("F", "G", "M", "N", "V", "W"):
    dv.add(rng(col))
list_validation(ra, "=Scales!$H$5:$H$16", rng("D"))
list_validation(ra, "=Scales!$I$5:$I$8", rng("K"))
list_validation(ra, "=Scales!$A$27:$A$30", rng("L"))
list_validation(ra, "=Scales!$J$5:$J$8", rng("R"))
list_validation(ra, "=Scales!$K$5:$K$9", rng("Y"))
rating_colours(ra, rng("I"))
rating_colours(ra, rng("P"))
ra.conditional_formatting.add(rng("Q"), FormulaRule(formula=[f'Q{first}="Outside"'],
                                                    fill=PatternFill("solid", fgColor="FCA5A5"), font=f(10, True)))
ra.freeze_panes = ra.cell(row=first, column=3)
from openpyxl.utils import get_column_letter
ra.auto_filter.ref = f"A{HR}:{get_column_letter(len(HEAD))}{last}"

# ---------------------------------------------------------------- Heat map
hm = wb.create_sheet("Heat map")
title_block(hm, "Heat maps", "Counts of risks in each cell. These update automatically from the Risk assessment tab.")
LIKN = [x[1] for x in LIK]
CONN = [x[1] for x in CON]


def draw_map(top, label, lcol, ccol):
    hm.cell(row=top, column=1, value=label).font = f(12, True, NAVY)
    for i, l in enumerate(range(5, 0, -1)):
        rr = top + 1 + i
        c = hm.cell(row=rr, column=1, value=f"{l} {LIKN[l - 1]}")
        c.font = f(10, True); c.alignment = Alignment(horizontal="right", vertical="center")
        for j, cc in enumerate(range(1, 6)):
            cell = hm.cell(row=rr, column=2 + j,
                           value=f"=COUNTIFS('Risk assessment'!${lcol}${first}:${lcol}${last},{l},"
                                 f"'Risk assessment'!${ccol}${first}:${ccol}${last},{cc})")
            s = l * cc
            name = "Extreme" if s >= 15 else "High" if s >= 10 else "Medium" if s >= 5 else "Low"
            cell.fill = PatternFill("solid", fgColor=RATING_COLOURS[name])
            cell.font = f(12, True)
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = BORDER
            cell.number_format = '0;-0;""'
        hm.row_dimensions[rr].height = 34
    for j, cc in enumerate(range(1, 6)):
        c = hm.cell(row=top + 6, column=2 + j, value=f"{cc} {CONN[cc - 1]}")
        c.font = f(10, True); c.alignment = Alignment(horizontal="center", wrap_text=True)
    hm.cell(row=top + 7, column=2, value="Likelihood (rows) × consequence (columns). Blank cells have no risks.").font = f(9, italic=True, color="4A5568")


draw_map(4, "Residual risk (with current controls)", "M", "N")
draw_map(14, "Inherent risk (before controls)", "F", "G")
hm.column_dimensions["A"].width = 18
for col in "BCDEF":
    hm.column_dimensions[col].width = 15

hm["H5"] = "Summary"
hm["H5"].font = f(12, True, NAVY)
summary = [("Risks recorded", f"=COUNTA('Risk assessment'!$B${first}:$B${last})"),
           ("Residual Extreme", f"=COUNTIF('Risk assessment'!$P${first}:$P${last},\"Extreme\")"),
           ("Residual High", f"=COUNTIF('Risk assessment'!$P${first}:$P${last},\"High\")"),
           ("Residual Medium", f"=COUNTIF('Risk assessment'!$P${first}:$P${last},\"Medium\")"),
           ("Residual Low", f"=COUNTIF('Risk assessment'!$P${first}:$P${last},\"Low\")"),
           ("Outside appetite", f"=COUNTIF('Risk assessment'!$Q${first}:$Q${last},\"Outside\")")]
for i, (k, v) in enumerate(summary):
    a = hm.cell(row=6 + i, column=8, value=k); style_cell(a)
    b = hm.cell(row=6 + i, column=9, value=v); style_cell(b, CALC_FILL, center=True)
hm.column_dimensions["H"].width = 20
hm.column_dimensions["I"].width = 10

for sheet in wb.worksheets:
    sheet.sheet_view.showGridLines = sheet.title in ("Risk assessment",)
print_setup(wb)
wb.active = 0
OUT.parent.mkdir(parents=True, exist_ok=True)
wb.save(OUT)
print("wrote", OUT.relative_to(ROOT))
