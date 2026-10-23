#!/usr/bin/env python3
"""Flat section illustrations for the page banners (assets/img/<name>.svg, 800 x 450).

Our own drawings in a friendly flat style: a solid subject colour, a large white object with navy detail
and one amber accent. sync_layout.py (IMAGES) places them under each page title.
Run:  python3 _scripts/graphics/flat/build_flat.py
Add a new picture by writing a motif function and listing it in ART below.
"""
import math
from pathlib import Path

OUT = Path(__file__).resolve().parents[3] / "assets" / "img"
W, A, N = "#ffffff", "#ffb020", "#0b2a4a"
CX, CY = 400, 225


def nav(op=0.28):
    return f'fill="{N}" fill-opacity="{op}"'


def line(x, y, w, op=0.28, h=12):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2}" {nav(op)}/>'


def arc(cx, cy, r, a0, a1, sw, col, op=1):
    """Arc from angle a0 to a1 (degrees, 0 = right, counter-clockwise on screen)."""
    p0 = (cx + r * math.cos(math.radians(a0)), cy - r * math.sin(math.radians(a0)))
    p1 = (cx + r * math.cos(math.radians(a1)), cy - r * math.sin(math.radians(a1)))
    large = 1 if abs(a1 - a0) > 180 else 0
    sweep = 0 if a1 > a0 else 1
    return (f'<path d="M{p0[0]:.1f} {p0[1]:.1f} A{r} {r} 0 {large} {sweep} {p1[0]:.1f} {p1[1]:.1f}" fill="none" '
            f'stroke="{col}" stroke-width="{sw}" stroke-linecap="round" stroke-opacity="{op}"/>')


def person(x, y, s=1.0, col=W, op=1):
    return (f'<circle cx="{x}" cy="{y}" r="{26*s}" fill="{col}" fill-opacity="{op}"/>'
            f'<path d="M{x-46*s} {y+92*s} C{x-46*s} {y+36*s} {x+46*s} {y+36*s} {x+46*s} {y+92*s} Z" fill="{col}" fill-opacity="{op}"/>')


# ---- motifs: each returns SVG for the middle of the canvas ----
def shield_tick():
    return (f'<path d="M400 70 L536 118 V222 C536 306 474 364 400 392 C326 364 264 306 264 222 V118 Z" fill="{W}"/>'
            f'<path d="M334 226 L384 276 L470 172" fill="none" stroke="{A}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>')


def shield_keyhole():
    return (f'<path d="M400 70 L536 118 V222 C536 306 474 364 400 392 C326 364 264 306 264 222 V118 Z" fill="{W}"/>'
            f'<circle cx="400" cy="214" r="38" fill="{A}"/><path d="M382 238 H418 L430 306 H370 Z" fill="{A}"/>'
            f'<circle cx="400" cy="214" r="14" fill="{N}" fill-opacity=".85"/>')


def shield_cycle():
    return (shield_tick().replace(f'stroke="{A}"', f'stroke="{N}" stroke-opacity=".35"') +
            arc(400, 235, 190, 200, 340, 18, A) + arc(400, 235, 190, 20, 160, 18, A) +
            f'<path d="M232 190 l-8 -34 l34 10 Z" fill="{A}"/><path d="M568 280 l8 34 l-34 -10 Z" fill="{A}"/>')


def gauge():
    s = arc(400, 300, 170, 180, 120, 44, W, 0.5) + arc(400, 300, 170, 120, 60, 44, W, 0.75) + arc(400, 300, 170, 60, 0, 44, W, 1)
    return s + f'<path d="M400 300 L478 196" stroke="{A}" stroke-width="16" stroke-linecap="round"/><circle cx="400" cy="300" r="26" fill="{A}"/><circle cx="400" cy="300" r="10" fill="{N}"/><rect x="250" y="338" width="300" height="14" rx="7" fill="{W}" fill-opacity=".35"/>'


def columns():
    s = f'<path d="M250 150 L400 72 L550 150 Z" fill="{W}"/><circle cx="400" cy="124" r="14" fill="{A}"/>'
    for x in (278, 352, 426, 500):
        s += f'<rect x="{x}" y="166" width="44" height="170" rx="6" fill="{W}"/>'
    return s + f'<rect x="240" y="346" width="320" height="22" rx="8" fill="{W}" fill-opacity=".8"/><rect x="214" y="374" width="372" height="22" rx="8" fill="{W}" fill-opacity=".55"/>'


def docs():
    s = f'<rect x="420" y="86" width="190" height="260" rx="18" fill="{W}" fill-opacity=".4"/><rect x="354" y="104" width="190" height="260" rx="18" fill="{W}" fill-opacity=".7"/><rect x="236" y="86" width="210" height="290" rx="18" fill="{W}"/>'
    s += line(264, 130, 130) + line(264, 164, 150) + line(264, 198, 100) + line(264, 250, 150) + line(264, 284, 110)
    return s + f'<circle cx="480" cy="316" r="46" fill="{A}"/><path d="M458 316 l16 16 l30 -34" fill="none" stroke="{N}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>'


def checklist():
    s = f'<rect x="252" y="84" width="296" height="316" rx="22" fill="{W}"/><rect x="334" y="64" width="132" height="44" rx="14" fill="{A}"/>'
    for i, y in enumerate((160, 236, 312)):
        s += f'<path d="M290 {y} l16 16 l30 -34" fill="none" stroke="{A}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>' + line(358, y - 8, 150 - i * 20, 0.28, 16)
    return s


def obligations():
    s = f'<rect x="240" y="80" width="270" height="310" rx="20" fill="{W}"/>'
    for y in (140, 208, 276):
        s += f'<circle cx="286" cy="{y}" r="11" fill="{A}"/>' + line(314, y - 7, 150, 0.28, 14)
    return s + f'<circle cx="520" cy="296" r="64" fill="{W}" fill-opacity=".25" stroke="{W}" stroke-width="20"/><path d="M566 342 L614 390" stroke="{W}" stroke-width="24" stroke-linecap="round"/><circle cx="520" cy="296" r="22" fill="{A}"/>'


def network(dashed=False):
    pts = [(220, 110), (580, 110), (190, 330), (610, 330), (400, 392)]
    d = ' stroke-dasharray="14 12"' if dashed else ''
    s = ''.join(f'<path d="M400 225 L{x} {y}" stroke="{W}" stroke-width="9" stroke-opacity=".55"{d}/>' for x, y in pts)
    s += f'<circle cx="400" cy="225" r="62" fill="{A}"/><circle cx="400" cy="225" r="24" fill="{W}"/>'
    for i, (x, y) in enumerate(pts):
        s += f'<circle cx="{x}" cy="{y}" r="{38 if i < 4 else 30}" fill="{W}" fill-opacity="{1 if i != 3 else .8}"/>'
    return s


def org_chart():
    s = f'<path d="M400 150 V210 M400 210 H210 V268 M400 210 H590 V268 M400 210 V268" fill="none" stroke="{W}" stroke-width="9" stroke-opacity=".55"/>'
    s += f'<circle cx="400" cy="110" r="56" fill="{A}"/>' + person(400, 96, .62, W)
    for x in (210, 400, 590):
        s += f'<circle cx="{x}" cy="320" r="50" fill="{W}"/>' + person(x, 308, .55, N, .8)
    return s


def clock():
    s = f'<circle cx="400" cy="225" r="150" fill="{W}"/><path d="M400 225 L400 95 A130 130 0 0 1 513 160 Z" fill="{A}"/>'
    for a in range(0, 360, 30):
        x1, y1 = 400 + 124 * math.sin(math.radians(a)), 225 - 124 * math.cos(math.radians(a))
        x2, y2 = 400 + 140 * math.sin(math.radians(a)), 225 - 140 * math.cos(math.radians(a))
        s += f'<path d="M{x1:.1f} {y1:.1f} L{x2:.1f} {y2:.1f}" stroke="{N}" stroke-opacity=".4" stroke-width="7" stroke-linecap="round"/>'
    return s + f'<path d="M400 225 V130 M400 225 L458 262" stroke="{N}" stroke-width="14" stroke-linecap="round"/><circle cx="400" cy="225" r="14" fill="{N}"/>'


def incident():
    s = ''.join(f'<circle cx="400" cy="240" r="{r}" fill="none" stroke="{W}" stroke-width="6" stroke-opacity="{o}"/>' for r, o in ((190, .2), (160, .3)))
    return s + f'<path d="M400 90 L536 336 H264 Z" fill="{A}" stroke="{W}" stroke-width="14" stroke-linejoin="round"/><rect x="388" y="168" width="24" height="86" rx="12" fill="{N}"/><circle cx="400" cy="290" r="14" fill="{N}"/>'


def coins():
    s = ''
    for cx, n in ((270, 2), (400, 4), (530, 3)):
        for i in range(n):
            y = 360 - i * 38
            s += f'<rect x="{cx-62}" y="{y}" width="124" height="30" rx="15" fill="{W}" fill-opacity="{1 if i else .85}"/><rect x="{cx-62}" y="{y+8}" width="124" height="8" fill="{N}" fill-opacity=".12"/>'
        s += f'<ellipse cx="{cx}" cy="{360-(n-1)*38}" rx="62" ry="16" fill="{A}"/>'
    return f'<g transform="translate(-120 -150) scale(1.3)">{s}</g>'


def super_growth():
    return coins() + f'<path d="M230 120 L330 90 L400 112 L560 50" fill="none" stroke="{W}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".8"/><path d="M560 50 l-40 4 M560 50 l-6 40" stroke="{W}" stroke-width="12" stroke-linecap="round" stroke-opacity=".8"/>'


def laptop_lock():
    s = f'<rect x="214" y="96" width="372" height="236" rx="20" fill="{W}"/><rect x="236" y="118" width="328" height="192" rx="10" fill="{N}" fill-opacity=".16"/><path d="M170 346 H630 L604 372 H196 Z" fill="{W}" fill-opacity=".75"/>'
    return s + f'<rect x="352" y="196" width="96" height="78" rx="14" fill="{A}"/><path d="M370 196 V176 a30 30 0 0 1 60 0 V196" fill="none" stroke="{A}" stroke-width="14"/><circle cx="400" cy="232" r="10" fill="{N}"/>'


def globe_leaf():
    s = f'<circle cx="400" cy="235" r="150" fill="{W}"/>'
    s += ''.join(f'<ellipse cx="400" cy="235" rx="{rx}" ry="150" fill="none" stroke="{N}" stroke-opacity=".2" stroke-width="7"/>' for rx in (60, 110))
    s += f'<path d="M250 235 H550 M270 170 H530 M270 300 H530" stroke="{N}" stroke-opacity=".2" stroke-width="7"/>'
    return s + f'<path d="M430 150 C540 120 600 190 560 290 C470 300 410 250 430 150 Z" fill="{A}"/><path d="M440 160 C480 210 520 250 556 286" fill="none" stroke="{N}" stroke-opacity=".35" stroke-width="7" stroke-linecap="round"/>'


def megaphone():
    s = f'<path d="M230 190 L470 96 V354 L230 260 Z" fill="{W}"/><rect x="190" y="180" width="60" height="90" rx="16" fill="{W}" fill-opacity=".85"/><path d="M270 270 L300 372 H350 L330 292 Z" fill="{W}" fill-opacity=".7"/>'
    return s + arc(470, 225, 70, -40, 40, 16, A) + arc(470, 225, 120, -45, 45, 16, A, .8) + arc(470, 225, 170, -48, 48, 16, A, .6)


def gavel():
    s = f'<g transform="rotate(-35 400 200)"><rect x="300" y="110" width="200" height="90" rx="22" fill="{W}"/><rect x="380" y="190" width="40" height="190" rx="18" fill="{W}" fill-opacity=".85"/></g>'
    return s + f'<rect x="230" y="372" width="340" height="34" rx="14" fill="{A}"/><rect x="290" y="340" width="220" height="34" rx="12" fill="{W}" fill-opacity=".7"/>'


def magnifier_doc():
    s = f'<rect x="220" y="76" width="250" height="310" rx="20" fill="{W}"/>' + line(250, 124, 150) + line(250, 158, 170) + line(250, 192, 110)
    return s + f'<circle cx="480" cy="270" r="84" fill="{W}" fill-opacity=".25" stroke="{W}" stroke-width="24"/><path d="M542 332 L610 400" stroke="{W}" stroke-width="28" stroke-linecap="round"/><path d="M480 220 L528 308 H432 Z" fill="{A}" stroke="{A}" stroke-width="8" stroke-linejoin="round"/><rect x="474" y="244" width="12" height="30" rx="6" fill="{N}"/><circle cx="480" cy="292" r="7" fill="{N}"/>'


def open_book():
    s = f'<path d="M400 120 C340 80 250 78 190 100 V350 C250 330 340 332 400 372 Z" fill="{W}"/><path d="M400 120 C460 80 550 78 610 100 V350 C550 330 460 332 400 372 Z" fill="{W}" fill-opacity=".75"/>'
    return s + line(226, 150, 130) + line(226, 184, 130) + line(226, 218, 100) + f'<circle cx="540" cy="190" r="34" fill="{A}"/><path d="M540 172 L546 186 L561 188 L550 198 L553 213 L540 205 L527 213 L530 198 L519 188 L534 186 Z" fill="{N}" fill-opacity=".8"/>'


def grad_cap():
    return (f'<path d="M400 90 L650 200 L400 310 L150 200 Z" fill="{W}"/><path d="M250 262 V340 C250 390 550 390 550 340 V262 L400 328 Z" fill="{W}" fill-opacity=".8"/>'
            f'<path d="M610 218 V320" stroke="{A}" stroke-width="12" stroke-linecap="round"/><circle cx="610" cy="334" r="22" fill="{A}"/>')


def play_screen():
    return (f'<rect x="170" y="86" width="460" height="290" rx="26" fill="{W}"/><rect x="198" y="114" width="404" height="234" rx="14" fill="{N}" fill-opacity=".16"/>'
            f'<circle cx="400" cy="231" r="64" fill="{A}"/><path d="M380 196 L438 231 L380 266 Z" fill="{N}"/><rect x="300" y="396" width="200" height="16" rx="8" fill="{W}" fill-opacity=".7"/>')


def tools():
    s = f'<rect x="200" y="80" width="360" height="290" rx="22" fill="{W}"/><path d="M200 102 a22 22 0 0 1 22 -22 H538 a22 22 0 0 1 22 22 V140 H200 Z" fill="{A}"/>'
    for x in (230, 346, 462):
        for y in (170, 230, 290):
            s += f'<rect x="{x}" y="{y}" width="88" height="40" rx="8" {nav(.2)}/>'
    return s + f'<circle cx="560" cy="340" r="62" fill="{A}"/><path d="M560 310 V370 M530 340 H590" stroke="{N}" stroke-width="16" stroke-linecap="round"/>'


def newspaper():
    s = f'<rect x="170" y="86" width="400" height="320" rx="22" fill="{W}"/><rect x="200" y="116" width="170" height="90" rx="10" fill="{A}"/>'
    s += line(392, 120, 140) + line(392, 154, 120) + line(392, 188, 100)
    for y in (240, 282, 324, 366):
        s += line(200, y, 330 if y != 366 else 220, .25, 14)
    return s + f'<rect x="540" y="120" width="110" height="290" rx="22" fill="{W}" fill-opacity=".55"/>' + line(560, 160, 70, .3) + line(560, 200, 60, .3)


def skyline():
    s = ''
    for x, h, w, o in ((160, 150, 90, .75), (262, 230, 100, 1), (374, 300, 110, 1), (498, 200, 100, 1), (610, 130, 80, .75)):
        s += f'<rect x="{x}" y="{400-h}" width="{w}" height="{h}" rx="8" fill="{W}" fill-opacity="{o}"/>'
        for wy in range(400 - h + 24, 372, 44):
            for wx in range(x + 18, x + w - 26, 34):
                s += f'<rect x="{wx}" y="{wy}" width="16" height="22" rx="3" {nav(.2)}/>'
    return s + f'<circle cx="560" cy="96" r="34" fill="{A}"/>'


def glossary():
    s = f'<rect x="230" y="70" width="340" height="340" rx="26" fill="{W}"/><rect x="230" y="70" width="46" height="340" rx="14" fill="{A}"/>'
    s += f'<text x="420" y="270" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="170" fill="{N}" fill-opacity=".85">Aa</text>'
    return s + line(318, 330, 200, .25, 14)


def people():
    return person(250, 150, 1.5, W, .75) + person(550, 150, 1.5, W, .75) + f'<circle cx="400" cy="140" r="46" fill="{A}"/><path d="M296 340 C296 244 504 244 504 340 Z" fill="{A}"/>'


# name -> (background colour, motif)
ART = {
    "foundations": ("#1d6fd1", open_book), "risk-management": ("#b04e08", gauge), "compliance": ("#0b7a6b", shield_tick),
    "governance": ("#6b3fb8", columns), "standards": ("#3c5a78", docs), "grc": ("#a82a6e", network),
    "grc-builder": ("#a82a6e", org_chart), "sectors": ("#0b6e99", skyline), "case-studies": ("#8a2c2c", magnifier_doc),
    "learn": ("#1d6fd1", grad_cap), "videos": ("#6b3fb8", play_screen), "tools": ("#0b6e99", tools),
    "news": ("#3b6b2a", newspaper), "glossary": ("#3c5a78", glossary), "about": ("#0b2a4a", people),
    "cyber": ("#0b2a4a", laptop_lock), "climate": ("#2f7d3a", globe_leaf), "breach-clock": ("#8a2c2c", clock),
    "incident": ("#b04e08", incident), "third-party": ("#a82a6e", lambda: network(True)), "appetite": ("#b04e08", gauge),
    "coins": ("#0b7a6b", coins), "privacy": ("#6b3fb8", shield_keyhole), "resilience": ("#0b6e99", shield_cycle),
    "speak-up": ("#a82a6e", megaphone), "enforcement": ("#8a2c2c", gavel), "regulators": ("#3c5a78", columns),
    "super": ("#1d6fd1", super_growth), "obligations": ("#0b7a6b", obligations), "playbooks": ("#b04e08", checklist),
    "accountability": ("#6b3fb8", org_chart),
}


def build(name, bg, motif):
    deco = (f'<circle cx="90" cy="80" r="46" fill="{W}" fill-opacity=".12"/><circle cx="720" cy="390" r="70" fill="{W}" fill-opacity=".1"/>'
            f'<circle cx="700" cy="70" r="16" fill="{W}" fill-opacity=".22"/><circle cx="110" cy="380" r="22" fill="{W}" fill-opacity=".16"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450" role="img" aria-hidden="true">'
            f'<rect width="800" height="450" fill="{bg}"/>{deco}{motif()}</svg>\n')


if __name__ == "__main__":
    for name, (bg, motif) in ART.items():
        (OUT / f"flat-{name}.svg").write_text(build(name, bg, motif), encoding="utf-8")
    print(len(ART), "illustrations written to", OUT)
