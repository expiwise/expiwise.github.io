#!/usr/bin/env python3
"""Draws the simplified app screens shown in the scrolling phone on the site.
They are illustrations of the real screens (same layout and wording, cleaner
type) and use the same demo data as tools/make_demo_backup.py.
Run:  python3 scripts/make-screens.py   (writes public/screens/*.svg)"""
import os

W, H = 1080, 2340
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'screens')
os.makedirs(OUT, exist_ok=True)

BG1, BG2 = '#0f1c1d', '#0a1213'
TEXT, MUTED = '#eaf4f3', '#8da4a3'
TEAL, TEAL2 = '#0f7a78', '#2dd4bf'
RED, AMBER, GREEN = '#ff6b6b', '#f5a524', '#34d399'


def e(s):
    return s.replace('&', '&amp;').replace('<', '&lt;')


def t(x, y, s, size=44, fill=TEXT, weight=500, anchor='start'):
    return (f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" '
            f'fill="{fill}" text-anchor="{anchor}">{e(s)}</text>')


def rect(x, y, w, h, r=36, fill='#ffffff', op=.05, stroke=None, sop=.1, sw=3, dash=None):
    s = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" fill-opacity="{op}"'
    if stroke:
        s += f' stroke="{stroke}" stroke-opacity="{sop}" stroke-width="{sw}"'
        if dash:
            s += f' stroke-dasharray="{dash}"'
    return s + '/>'


def pill(x, y, w, h, label, col, size=34):
    return rect(x, y, w, h, h / 2, col, .17) + t(x + w / 2, y + h / 2 + size * .35, label, size, col, 650, 'middle')


def chip(x, y, w, label, sel=False, h=96):
    if sel:
        return rect(x, y, w, h, 30, TEAL2, .22, TEAL2, .5) + t(x + w / 2, y + 62, label, 38, TEXT, 600, 'middle')
    return rect(x, y, w, h, 30, '#fff', .03, '#fff', .18) + t(x + w / 2, y + 62, label, 38, TEXT, 500, 'middle')


def field(y, label, value, h=170, x=48, w=984):
    return (rect(x, y, w, h, 34, '#fff', .04, '#fff', .12) + t(x + 40, y + 56, label, 30, MUTED)
            + t(x + 40, y + 124, value, 48, TEXT, 550))


def toggle(x, y, on):
    return (rect(x, y, 150, 76, 38, TEAL2 if on else '#fff', .9 if on else .16)
            + f'<circle cx="{x + (112 if on else 38)}" cy="{y + 38}" r="26" fill="{"#06302f" if on else "#9bb0af"}"/>')


def nav(active):
    labels = ['Items', 'Locations', 'Stats', 'Settings']
    out = rect(0, 2120, W, 220, 0, '#0c1516', 1)
    for i, lab in enumerate(labels):
        cx = 135 + i * 270
        if i == active:
            out += rect(cx - 95, 2150, 190, 84, 42, TEAL, .9)
        out += f'<circle cx="{cx}" cy="2192" r="18" fill="none" stroke="{TEXT if i == active else MUTED}" stroke-width="5"/>'
        out += t(cx, 2290, lab, 30, TEXT if i == active else MUTED, 600 if i == active else 500, 'middle')
    return out


def fab():
    return (rect(850, 1890, 170, 170, 52, TEAL2, .9)
            + f'<path d="M935 1945v60M905 1975h60" stroke="#06302f" stroke-width="10" stroke-linecap="round"/>')


def screen(title, body, name, with_nav=None, with_fab=False):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="Inter,Helvetica,Arial,sans-serif">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{BG1}"/><stop offset="1" stop-color="{BG2}"/></linearGradient></defs>
<rect width="{W}" height="{H}" fill="url(#bg)"/>
{t(48, 250, title, 78, TEXT, 800) if title else ''}
{body}
{fab() if with_fab else ''}
{nav(with_nav) if with_nav is not None else ''}
</svg>'''
    open(os.path.join(OUT, name), 'w').write(svg)


# ---------- 01 add ----------
b = ''
b += rect(48, 330, 470, 110, 36, '#000', 0, TEAL2, .55, 3) + t(283, 400, 'Scan barcode', 38, TEAL2, 600, 'middle')
b += rect(562, 330, 470, 110, 36, '#000', 0, TEAL2, .55, 3) + t(797, 400, 'Scan expiry date', 38, TEAL2, 600, 'middle')
b += rect(48, 490, 984, 140, 38, '#fff', .04, TEAL2, .9, 5) + t(88, 535, 'Name', 28, TEAL2) + t(88, 600, 'Whole milk', 50, TEXT, 550)
b += t(48, 720, 'Category', 38, MUTED, 600)
b += chip(48, 750, 230, 'Food', True) + chip(300, 750, 270, 'Medicine') + chip(592, 750, 300, 'Cosmetics')
b += chip(48, 870, 440, 'Household chemicals') + chip(510, 870, 330, 'Documents')
b += field(1010, 'Location', 'Kitchen › Fridge › Top shelf', 150)
b += field(1190, 'Expiry date', 'Oct 21, 2026', 150)
b += chip(48, 1370, 300, 'Best before') + chip(370, 1370, 260, '✓ Use by', True)
b += chip(48, 1510, 260, '+1 week') + chip(330, 1510, 290, '+1 month') + chip(642, 1510, 250, '+1 year')
b += t(48, 1700, 'Month and year only', 44, TEXT, 500) + toggle(880, 1650, False)
b += rect(48, 1800, 984, 130, 38, '#fff', .04, '#fff', .1) + t(120, 1882, 'More details', 44, TEXT, 500)
b += rect(48, 1970, 984, 130, 65, TEAL, .95) + t(540, 2052, 'Save', 48, '#fff', 700, 'middle')
screen('Add item', b, '01-add.svg')

# ---------- 02 items ----------
b = ''
b += rect(48, 320, 984, 110, 55, '#fff', .04, '#fff', .12) + t(150, 390, 'Search items', 40, MUTED)
for i, (lab, w) in enumerate([('Category', 250), ('Location', 250), ('Use by', 210)]):
    x = 150 + i * 270
    b += chip(x, 460, w, lab, False, 84) if False else rect(x, 460, w, 84, 28, '#fff', .03, '#fff', .18) + t(x + w / 2, 515, lab, 34, TEXT, 500, 'middle')
cards = [('All', '24', TEAL, TEAL2, 'All'), ('Expired', '3', '#5a1d1d', RED, 'Expired'),
         ('Within 7 days', '4', '#4a3406', AMBER, 'Within 7 days'), ('Later', '17', '#0e3d2c', GREEN, 'Later')]
for i, (lab, n, bgc, fg, _) in enumerate(cards):
    x = 48 + i * 252
    b += rect(x, 600, 228, 250, 40, bgc, .9, TEAL2 if i == 0 else None, .9, 5)
    b += t(x + 34, 740, n, 82, fg, 800) + t(x + 34, 800, lab if i != 2 else 'Within 7', 30, fg, 600)
    if i == 2:
        b += t(x + 34, 836, 'days', 30, fg, 600)
b += f'<circle cx="62" cy="935" r="12" fill="{RED}"/>' + t(92, 950, 'Expired', 40, TEXT, 700) + t(285, 950, '3', 40, MUTED, 500)
items = [('Sandwich bread', 'Food · Kitchen › Pantry', 'Expired 3 days ago', RED, 'Best before · Oct 15'),
         ('Chicken breast', 'Food · Kitchen › Freezer', 'Expired 2 days ago', RED, 'Use by · Oct 16'),
         ('Greek yogurt', 'Food · Kitchen › Fridge › Top shelf', 'Expired yesterday', RED, 'Best before · Oct 17')]
for i, (n, sub, st, col, dt_) in enumerate(items):
    y = 990 + i * 300
    b += rect(48, y, 984, 270, 40, '#fff', .05, '#fff', .07)
    b += rect(84, y + 36, 130, 130, 36, '#6b4a1f', .9) + f'<path d="M122 {y+74}v54M149 {y+74}v54M176 {y+74}v54" stroke="#f5a524" stroke-width="9" stroke-linecap="round"/>'
    b += t(250, y + 84, n, 54, TEXT, 650) + t(250, y + 136, sub, 34, MUTED)
    b += pill(250, y + 170, 400, 70, st, col, 33) + t(690, y + 218, dt_, 32, MUTED)
screen('My items', b, '02-items.svg', 0, True)

# ---------- 03 reminders ----------
b = ''
b += t(48, 360, 'Reminders', 50, TEXT, 700)
b += t(48, 470, 'Use category default', 52, TEXT, 600) + t(48, 530, 'Default: 3, 1 days before expiry', 34, MUTED) + toggle(880, 430, False)
b += t(48, 680, 'Remind me before expiry:', 40, MUTED, 600)
rows = [[('On the day', 300, False), ('1 day', 220, True), ('2 days', 240, False), ('3 days', 240, True)],
        [('5 days', 240, False), ('7 days', 240, True), ('14 days', 270, False), ('30 days', 270, False)],
        [('60 days', 270, False), ('90 days', 270, False)]]
for r, row in enumerate(rows):
    x = 48
    for lab, w, sel in row:
        b += chip(x, 730 + r * 130, w, lab, sel)
        x += w + 22
b += rect(48, 1190, 984, 360, 40, TEAL2, .09, TEAL2, .3, 3)
b += t(88, 1280, 'Tip', 42, TEAL2, 700) + t(88, 1350, 'Keep milk on a middle shelf, not in the', 38, '#c3d5d4') + t(88, 1406, 'door. It stays colder and lasts longer.', 38, '#c3d5d4')
b += rect(48, 1620, 984, 250, 40, '#fff', .04, '#fff', .1) + t(88, 1705, 'Notes (optional)', 44, MUTED)
b += t(88, 1820, 'Do not enter ID, passport, card or account numbers.', 30, MUTED)
b += rect(48, 1970, 984, 130, 65, TEAL, .95) + t(540, 2052, 'Save', 48, '#fff', 700, 'middle')
screen('Item details', b, '03-reminders.svg')

# ---------- 04 locations ----------
rows = [(0, 'Bathroom', '4', 1), (1, 'Cabinet', '4', 0), (0, 'Bedroom', '7', 1), (1, 'Desk drawer', '3', 0), (1, 'Medicine box', '4', 0),
        (0, 'Kitchen', '11', 1), (1, 'Freezer', '2', 0), (1, 'Fridge', '5', 1), (2, 'Door', '2', 0), (2, 'Top shelf', '3', 0)]
b = ''
for i, (d, n, c, ch) in enumerate(rows):
    y = 320 + i * 176
    x = 48 + d * 64
    if ch:
        b += f'<path d="M{x+12} {y+70}l22 22l22-22" fill="none" stroke="{MUTED}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
    b += rect(x + 80, y + 14, 112, 112, 34, TEAL, .85)
    b += f'<path d="M{x+136} {y+42}a24 24 0 0 1 24 24c0 22-24 44-24 44s-24-22-24-44a24 24 0 0 1 24-24z" fill="none" stroke="{TEAL2}" stroke-width="7"/><circle cx="{x+136}" cy="{y+66}" r="8" fill="{TEAL2}"/>'
    b += t(x + 222, y + 66, n, 48, TEXT, 600) + t(x + 222, y + 112, f'{c} items', 34, MUTED)
    b += f'<rect x="780" y="{y+36}" width="64" height="52" rx="12" fill="none" stroke="{MUTED}" stroke-width="6"/><circle cx="812" cy="{y+62}" r="13" fill="none" stroke="{MUTED}" stroke-width="6"/>'
    b += f'<circle cx="940" cy="{y+40}" r="6" fill="{MUTED}"/><circle cx="940" cy="{y+63}" r="6" fill="{MUTED}"/><circle cx="940" cy="{y+86}" r="6" fill="{MUTED}"/>'
screen('Locations', b, '04-locations.svg', 1, True)

# ---------- 05 stats ----------
b = ''
b += rect(48, 330, 984, 330, 44, '#fff', .05, '#fff', .07)
import math
r = 120; cx, cy = 210, 495; C = 2 * math.pi * r
b += f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{RED}" stroke-width="30" stroke-opacity=".75"/>'
b += f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{TEAL2}" stroke-width="30" stroke-linecap="round" stroke-dasharray="{C*.67:.1f} {C:.1f}" transform="rotate(-90 {cx} {cy})"/>'
b += t(cx, cy + 22, '67%', 62, TEXT, 700, 'middle')
b += t(400, 440, '67% used', 54, TEXT, 700) + t(400, 508, '12 used · 6 wasted', 40, MUTED) + t(400, 574, '5 days without waste', 40, TEAL2, 600)
b += rect(48, 700, 984, 190, 44, '#fff', .05, '#fff', .07)
b += t(88, 770, 'Saved (used)', 34, TEXT, 600) + t(88, 850, '¥5,294', 66, TEAL2, 700)
b += t(560, 770, 'Lost (wasted)', 34, TEXT, 600) + t(560, 850, '¥3,012', 66, '#ffa59e', 700)
b += rect(48, 930, 984, 700, 44, '#fff', .05, '#fff', .07) + t(88, 1030, 'Per month', 50, TEXT, 650)
b += rect(600, 975, 190, 74, 37, '#fff', .12) + t(695, 1025, '6 months', 32, TEXT, 600, 'middle') + t(895, 1025, '12 months', 32, MUTED, 500, 'middle')
b += f'<circle cx="100" cy="1110" r="14" fill="{TEAL2}"/>' + t(130, 1122, 'Used', 32, MUTED) + f'<circle cx="300" cy="1110" r="14" fill="#ffa59e"/>' + t(330, 1122, 'Wasted', 32, MUTED)
months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
used = [0, 0, 0, 90, 390, 260]; waste = [0, 0, 0, 0, 220, 190]
for i, m in enumerate(months):
    x = 120 + i * 150
    b += rect(x, 1530 - used[i], 44, max(used[i], 0), 14, TEAL2, .9) if used[i] else ''
    b += rect(x + 54, 1530 - waste[i], 44, waste[i], 14, '#ffa59e', .9) if waste[i] else ''
    b += t(x + 49, 1590, m, 32, MUTED, 500, 'middle')
b += rect(48, 1670, 984, 400, 44, '#fff', .05, '#fff', .07) + t(88, 1750, 'By category', 50, TEXT, 650)
b += t(88, 1840, 'Food', 42, TEXT, 600) + t(990, 1840, '8 used · 5 wasted', 38, MUTED, 500, 'end')
b += t(88, 1930, 'Medicine', 42, TEXT, 600) + t(990, 1930, '1 used · 1 wasted', 38, MUTED, 500, 'end')
b += t(88, 2020, 'Cosmetics', 42, TEXT, 600) + t(990, 2020, '2 used', 38, MUTED, 500, 'end')
screen('Stats', b, '05-stats.svg', 2)
print('wrote', sorted(os.listdir(OUT)))
